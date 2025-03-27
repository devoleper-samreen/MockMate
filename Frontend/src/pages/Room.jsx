import React from 'react'
import VideoCall from "../components/VideoCall"
import CodeEditor from "../components/Editor"

function Room() {
    return (
        <div className='flex w-[100vw] h-[100vh] gap-[120px]'>
            <VideoCall />
            <CodeEditor />
        </div>
    )
}

export default Room
