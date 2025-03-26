import { User } from "../models/user.model.js"
import { addUserToQueue, findMatch, connectUsers, removeUserFromQueue } from "../helper/matchManager.js"

export const makeConnection = async (io) => {

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('instant-interview', async ({ userId }) => {
            console.log("instant trigger...");

            await User.findByIdAndUpdate(userId, { socketId: socket.id })
            addUserToQueue(userId)

            findMatch(userId, io, (matchedUser) => {
                if (matchedUser) {
                    connectUsers(userId, matchedUser, io)

                    setTimeout(() => {
                        removeUserFromQueue(userId);
                        removeUserFromQueue(matchedUser._id);
                    }, 3000)
                }
            });

        })

        socket.on('disconnect', async () => {
            console.log(`User disconnected: ${socket.id}`)

            const user = await User.findOneAndUpdate(
                { socketId: socket.id },
                { $unset: { socketId: 1 } }
            )

            if (user) {
                removeUserFromQueue(user._id);
            }
        })

    })
}