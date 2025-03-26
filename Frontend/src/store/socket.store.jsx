import { create } from "zustand";
import io from "socket.io-client";

const useSocketStore = create((set, get) => {
    let socket = get()?.socket;

    if (!socket) {
        socket = io("http://localhost:5000", {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
            transports: ["websocket", "polling"],
            autoConnect: false
        });

        set({ socket });
    }



    return {
        socket,
        connect: () => {
            if (!get().socket.connected) {
                get().socket.connect();
            }
        },
        disconnect: () => {
            if (get().socket.connected) {
                get().socket.disconnect();
            }
        },
    };
});

export default useSocketStore;
