import { User } from "../models/user.model.js"

let waitingUsers = []
let retryTimers = new Map();

export const addUserToQueue = async (userId) => {
    const user = await User.findById(userId)
    if (!user) {
        console.log(`User not found: ${userId}`);
        return;
    }
    console.log(`User added to queue: ${userId}`);

    waitingUsers.push(user)
}

export const findMatch = async (userId, io, callback) => {
    const user = await User.findById(userId);

    let checkingCount = 0
    let maxChecking = 6

    const checkingTimer = setInterval(async () => {
        console.log("trying to match with peer time :", checkingCount + 1);

        checkingCount++

        const userIndex = waitingUsers.findIndex(user => user._id.toString() === userId.toString());
        if (userIndex === -1) {
            console.log(`User ${userId} not in queue, stopping match attempt.`);
            clearInterval(checkingTimer);
            return;
        }

        const matchedUser = waitingUsers.find((user) => user._id.toString() !== userId.toString())

        if (matchedUser) {
            clearInterval(checkingTimer);
            retryTimers.delete(userId);

            console.log(`✅ Match found! ${userId} and ${matchedUser._id}`);

            // Remove both users using their socketId
            removeUserFromQueue(user._id);
            removeUserFromQueue(matchedUser._id);

            callback(matchedUser)
            return
        }

        if (checkingCount >= maxChecking) {
            clearInterval(checkingTimer);
            retryTimers.delete(userId);
            console.log("No match found...");
            removeUserFromQueue(user._id);

            // Notify user
            io.to(user.socketId).emit("no-match-found");

            callback(null)
        }
    }, 5000);

    retryTimers.set(userId, checkingTimer);
}

export const connectUsers = async (userId, matchedUser, io) => {
    const user = await User.findById(userId)
    if (!user || !matchedUser) return;

    const roomId = `${userId}-${matchedUser._id}`

    // Notify both users
    io.to(user.socketId).emit("match-found", { roomId, matchedWith: matchedUser });
    io.to(matchedUser.socketId).emit("match-found", { roomId, matchedWith: user });


    io.to(user.socketId).emit("join-room", { roomId });
    io.to(matchedUser.socketId).emit("join-room", { roomId });

    console.log(`✅ Users ${userId} and ${matchedUser._id} joined room: ${roomId}`);

}

export const removeUserFromQueue = (userId) => {
    if (!userId) return;
    waitingUsers = waitingUsers.filter(user => user._id.toString() !== userId.toString());

    console.log(`User with userId ${userId} removed from queue`);
    console.log("waiting user list :", waitingUsers);
};

