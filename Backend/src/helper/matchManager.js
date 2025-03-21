import { User } from "../models/user.model.js";

let waitingUsers = [];
let retryTimers = new Map();

export const addUserToQueue = async (userId, socketId, io) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log(`❌ User not found: ${userId}`);
            return;
        }

        user.socketId = socketId;
        await user.save();
        waitingUsers.push(user);
        console.log(`✅ User ${userId} added to queue`);

        // Start matching process
        findMatch(userId, io);
    } catch (error) {
        console.error("❌ Error in addUserToQueue:", error);
    }
};

const findMatch = (userId, io) => {
    let retryCount = 0;
    let maxRetries = 12; // 1 minute tak match try karega

    const retryTimer = setInterval(() => {
        retryCount++;

        if (waitingUsers.length > 1) {
            const matchedUser = waitingUsers.find(u => u._id.toString() !== userId);
            if (matchedUser) {
                matchUsers(userId, matchedUser, io);
                clearInterval(retryTimer);
                retryTimers.delete(userId);
                retryTimers.delete(matchedUser._id.toString());
                return;
            }
        }

        // Agar 1 minute tak match nahi mila
        if (retryCount >= maxRetries) {
            console.log(`⏳ No match found for ${userId}, removing from queue`);
            waitingUsers = waitingUsers.filter(u => u._id.toString() !== userId);
            clearInterval(retryTimer);
            retryTimers.delete(userId);
            io.to(io.sockets.sockets.get(userId)?.id).emit("no-match-found", { message: "No match found, try again later!" });
        }

    }, 5000); // Har 5 second baad check karega

    retryTimers.set(userId, retryTimer);
};

const matchUsers = async (userId, matchedUser, io) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log(`❌ User not found: ${userId}`);
            return;
        }

        console.log(`✅ Match found! ${userId} matched with ${matchedUser._id.toString()}`);

        // Remove both users from queue
        waitingUsers = waitingUsers.filter(u => u._id.toString() !== userId && u._id.toString() !== matchedUser._id.toString());

        const roomId = `${userId}-${matchedUser._id}`;
        console.log(`🏠 Room Created: ${roomId}`);

        // Notify both users
        io.to(user.socketId).emit("match-found", { roomId, matchedWith: matchedUser });
        io.to(matchedUser.socketId).emit("match-found", { roomId, matchedWith: user });

        // Join room
        io.sockets.sockets.get(user.socketId)?.join(roomId);
        io.sockets.sockets.get(matchedUser.socketId)?.join(roomId);
        console.log(`👥 Users ${userId} & ${matchedUser._id.toString()} joined room: ${roomId}`);

        io.to(roomId).emit("user-joined", { userId, roomId });

    } catch (error) {
        console.error("❌ Error in matchUsers:", error);
    }
};

export const removeUserFromQueue = (socketId) => {
    waitingUsers = waitingUsers.filter(user => user.socketId !== socketId);
    console.log(`🚀 User with socketId ${socketId} removed from queue`);
};
