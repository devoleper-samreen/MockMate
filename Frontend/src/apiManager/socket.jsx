import { io } from "socket.io-client";

const socket = io("http://localhost:5000/api/v1");

export default socket;
