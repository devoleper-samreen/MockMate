import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js"
import "./config/passport.js"
import { connectDB } from "./DB/db.js"
import http from "http"
import { makeConnection } from "./controllers/interview.controller.js"
import cookieParser from "cookie-parser";
import { Server } from "socket.io"

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(passport.initialize());

// Routes
app.use("/api/v1", routes);

app.get("/", (req, res) => {
    res.send("MockMate Server Running!");
});

const port = process.env.PORT || 5000

connectDB()

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
});


// Call Matching & Interview Logic
makeConnection(io);



let codeData = {};

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


server.listen(port, () => console.log(`Server started on http://localhost:${port}`));
