import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react"
import { useParams } from "react-router-dom"
import useSocketStore from "../store/socket.store"


function CodeEditor() {
    const { socket, connect } = useSocketStore()
    const { roomId } = useParams()
    const [code, setCode] = useState("// Start coding...")

    const handleCodeChange = (newValue) => {
        console.log("handlecode change:", newValue);

        setCode(newValue);
        socket.emit("code:change", { room: roomId, code: newValue });
    };

    useEffect(() => {

        socket.emit("join:room", roomId);
        socket.on("code:update", (newCode) => {
            console.log("got new code from sever:", newCode);

            setCode(newCode);
        });

    }, [])

    return (
        <div style={{
            width: "50vw",
            height: "100vh",
            float: "right"
        }}>
            <Editor
                height="100vh"
                width="100%"
                theme="vs-dark"
                language="javascript"
                value={code}
                onChange={handleCodeChange}
                options={{
                    fontSize: 20,
                    minimap: { enabled: false },
                }}
            />
        </div>
    )
}

export default CodeEditor