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

export const findMatch = async (userId, callback) => {
    let checkingCount = 0
    let maxChecking = 6

    const checkingTimer = setInterval(async () => {
        checkingCount++

        const userIndex = waitingUsers.findIndex(user => user._id.toString() === userId);
        if (userIndex === -1) {
            console.log(`User ${userId} not in queue, stopping match attempt.`);
            clearInterval(checkingTimer);
            return;
        }

        const matchedUser = waitingUsers.find((user) => user._id.toString() !== userId)

        if (matchedUser) {
            clearInterval(checkingTimer);
            retryTimers.delete(userId);

            const user = await User.findById(userId);
            if (!user || !matchedUser) return;

            console.log(`✅ Match found! ${userId} and ${matchedUser._id}`);

            // Remove both users using their socketId
            // removeUserFromQueue(user.socketId);
            // removeUserFromQueue(matchedUser.socketId);

            callback(matchedUser)
            return
        }

        if (checkingCount >= maxChecking) {
            clearInterval(checkingTimer);
            retryTimers.delete(userId);
            console.log("No match found...");

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

    //join room
    // io.sockets.sockets.get(user.socketId)?.join(roomId);
    // io.sockets.sockets.get(matchedUser.socketId)?.join(roomId);

    // io.to(roomId).emit("user-joined", { userId, roomId });

    io.to(user.socketId).emit("join-room", { roomId });
    io.to(matchedUser.socketId).emit("join-room", { roomId });

    console.log(`✅ Users ${userId} and ${matchedUser._id} joined room: ${roomId}`);

}

export const removeUserFromQueue = (socketId) => {
    if (!socketId) return;
    waitingUsers = waitingUsers.filter(user => user.socketId !== socketId);
    console.log(`User with socketId ${socketId} removed from queue`);
};
