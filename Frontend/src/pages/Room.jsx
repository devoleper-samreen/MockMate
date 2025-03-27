// import React from 'react'
// import VideoCall from "../components/VideoCall"
// import CodeEditor from "../components/Editor"

// function Room() {
//     return (
//         <div className='flex w-[100vw] h-[100vh] '>
//             <VideoCall /> //60% width
//             <CodeEditor /> //40% width
//         </div>
//     )
// }

// export default Room

import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import VideoCall from "../components/VideoCall";
import CodeEditor from "../components/Editor";

function Room() {
    return (
        <PanelGroup direction="horizontal" className="w-full h-screen">
            {/* Video Call Panel */}
            <Panel defaultSize={50} minSize={10}>
                <VideoCall />
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="w-3 bg-gray-600 hover:bg-gray-400 cursor-col-resize" />

            {/* Code Editor Panel */}
            <Panel defaultSize={40} minSize={0}>
                <CodeEditor />
            </Panel>
        </PanelGroup>
    );
}

export default Room;

