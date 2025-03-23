import { Server } from "socket.io"
import { User } from "../models/user.model.js"
import { addUserToQueue, findMatch, connectUsers, removeUserFromQueue } from "../helper/matchManager.js"

export const makeConnection = async (server) => {
    const io = new Server(server, { cors: { origin: '*' } })

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('instant-interview', async ({ userId }) => {
            console.log("instant trigger...");

            await User.findByIdAndUpdate(userId, { socketId: socket.id })
            addUserToQueue(userId)

            findMatch(userId, (matchedUser) => {
                if (matchedUser) {
                    connectUsers(userId, matchedUser, io)
                    removeUserFromQueue(userId);
                    removeUserFromQueue(matchedUser._id);
                }
            });

        })

        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id}`)
            // removeUserFromQueue(socket.id)
            await User.findOneAndUpdate(
                { socketId: socket.id },
                { $unset: { socketId: 1 } }
            )
        })

    })
}