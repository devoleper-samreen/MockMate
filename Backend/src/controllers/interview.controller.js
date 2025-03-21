import { Server } from "socket.io";
import { addUserToQueue, removeUserFromQueue } from "../helper/matchManager.js";
import { User } from "../models/user.model.js";

export const setupInterviewSockets = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        console.log(`New User Connected: ${socket.id}`);

        socket.on("instant-interview", async ({ userId }) => {
            console.log(`User ${userId} requested an Instant Interview`);
            addUserToQueue(userId, socket.id, io);
        });

        socket.on("disconnect", async () => {
            console.log(`User Disconnected: ${socket.id}`);
            removeUserFromQueue(socket.id);

            // Remove socketId from DB
            await User.findOneAndUpdate(
                { socketId: socket.id },
                { $unset: { socketId: 1 } }
            );

            console.log(`Removed socketId from DB for disconnected user: ${socket.id}`);
        });
    });
};
