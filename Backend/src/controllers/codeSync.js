let codeData = {};

export const handleCodeSync = (io) => {
    io.on("connection", (socket) => {
        socket.on("join:room", (room) => {
            console.log("got room id for editor:", room);
            socket.join(room);
            if (codeData[room]) {
                socket.emit("code:update", codeData[room]);
            }
        });

        socket.on("code:change", ({ room, code }) => {
            codeData[room] = code;
            socket.to(room).emit("code:update", code);
        });
    });
};
