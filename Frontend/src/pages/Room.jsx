import React from 'react'
import VideoCall from "../components/VideoCall"
import CodeEditor from "../components/Editor"

function Room() {
    return (
        <div style={{ display: "flex", width: "100vw", height: "100vh", gap: "120px" }}>
            <VideoCall />
            <CodeEditor />
        </div>
    )
}

export default Room
