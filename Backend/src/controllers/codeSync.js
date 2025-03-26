// import { Server } from "socket.io"

// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
// });

// let codeData = {};

// io.on("connection", (socket) => {
//     socket.on("joinRoom", (room) => {
//         socket.join(room);
//         if (codeData[room]) {
//             socket.emit("codeUpdate", codeData[room]);
//         }
//     });

//     socket.on("codeChange", ({ room, code }) => {
//         codeData[room] = code;
//         socket.to(room).emit("codeUpdate", code);
//     });
// });