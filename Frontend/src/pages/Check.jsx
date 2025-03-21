import React, { useEffect, useState } from "react";
import socket from "../apiManager/socket";

const InterviewPage = () => {
    const userId = '67dd0006ae5fdfb6e0cb3d1f'
    const [matchedUser, setMatchedUser] = useState(null);

    useEffect(() => {
        // Jab match mil jaye to ye run hoga
        socket.on("match-found", (data) => {
            console.log("Matched with:", data);
            setMatchedUser(data);
        });

        return () => {
            socket.off("match-found"); // Clean up event listener
        };
    }, []);

    const handleInstantInterview = () => {
        console.log("Instant Interview requested...");
        socket.emit("instant-interview", { userId });
    };

    return (
        <div>
            <h2>Instant Interview</h2>
            <button onClick={handleInstantInterview}>Start Interview</button>

            {matchedUser && (
                <div>
                    <h3>Matched with: {matchedUser.matchedWith.name}</h3>
                    <p>Room ID: {matchedUser.roomId}</p>
                </div>
            )}
        </div>
    );
};

export default InterviewPage;
