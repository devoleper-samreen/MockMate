import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react"
import { useParams } from "react-router-dom"
import useSocketStore from "../store/socket.store"


function CodeEditor() {
    const { socket } = useSocketStore()
    const { roomId } = useParams()
    const [code, setCode] = useState("// Start coding with javascript...")

    const handleCodeChange = (newValue) => {
        setCode(newValue);
        socket.emit("code:change", { room: roomId, code: newValue });
    };

    useEffect(() => {

        socket.emit("join:room", roomId);
        socket.on("code:update", (newCode) => {
            setCode(newCode);
        });

        return () => {
            socket.emit("leave:room", roomId)
            setCode("// Start coding with javascript...")
            socket.off("code:update")
            socket.disconnect()
            window.location.replace('/')
        }

    }, [])

    return (
        <div className='w-full h-screen'>
            <Editor
                theme="vs-dark"
                language="javascript"
                value={code}
                onChange={handleCodeChange}
                options={{
                    fontSize: 20,
                    minimap: { enabled: false },
                    wordWrap: "on",
                    autoIndent: "full",
                    matchBrackets: "always",
                    tabSize: 2,
                    insertSpaces: 'true'
                }}
            />
        </div>
    )
}

export default CodeEditor