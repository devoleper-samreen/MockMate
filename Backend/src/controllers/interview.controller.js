import { Server } from "socket.io";
import { User } from "../models/user.model.js";

let waitingUsers = []; // Users ki queue store karega

export const setupInterviewSockets = (server) => {
    const io = new Server(
        server,
        { cors: { origin: "*" } }
    );

    io.on("connection", (socket) => {
        console.log("New User Connected:", socket.id);

        // Jab user Instant Interview pe click kare
        socket.on("instant-interview", async ({ userId }) => {
            const user = await User.findById(userId);
            if (!user) return;

            user.socketId = socket.id;
            await user.save();
            waitingUsers.push(user);

            // Match dhoondho (same skills wale)
            let matchIndex = waitingUsers.findIndex(u =>
                u._id.toString() !== userId &&
                u.profile.skills.some(skill => user.profile.skills.includes(skill))
            );

            if (matchIndex !== -1) {
                const matchedUser = waitingUsers.splice(matchIndex, 1)[0];
                waitingUsers = waitingUsers.filter(u => u._id.toString() !== userId);

                const roomId = `${user._id}-${matchedUser._id}`;

                io.to(user.socketId).emit("match-found", { roomId, matchedWith: matchedUser });
                io.to(matchedUser.socketId).emit("match-found", { roomId, matchedWith: user });

                socket.join(roomId);
                io.to(roomId).emit("user-joined", { userId, roomId });
            }
        });

        // Jab user disconnect ho
        socket.on("disconnect", async () => {
            console.log("User Disconnected:", socket.id);
            waitingUsers = waitingUsers.filter(user => user.socketId !== socket.id);

            await User.updateOne(
                { socketId: socket.id },
                {
                    $unset: { socketId: 1 }
                }
            );
        });
    });
};
