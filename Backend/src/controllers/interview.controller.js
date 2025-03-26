import { User } from "../models/user.model.js"
import { addUserToQueue, findMatch, connectUsers, removeUserFromQueue } from "../helper/matchManager.js"

export const makeConnection = async (io) => {

    io.on("connection", (socket) => {
        console.log(`User connected with socket id: ${socket.id}`);

        socket.on('instant-interview', async ({ userId }) => {

            await User.findByIdAndUpdate(userId, { socketId: socket.id })
            addUserToQueue(userId)

            findMatch(userId, io, (matchedUser) => {
                if (matchedUser) {
                    connectUsers(userId, matchedUser, io)
                }
            });

            socket.on("joined-room", ({ roomId }) => {
                console.log(`✅ User confirmed joining: ${roomId}`);
            });

        })

        socket.on('disconnect', async (reason) => {
            console.log(`User disconnected: ${socket.id}`)
            console.log("disconnect reason : ", reason);


            const user = await User.findOne({ socketId: socket.id });

            if (user) {
                removeUserFromQueue(user._id);
                console.log(`Preventing user ${user._id} from being matched again.`);
            }
        })

    })
}