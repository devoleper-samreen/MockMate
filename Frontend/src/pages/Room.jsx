import React, { useEffect } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import VideoCall from "../components/VideoCall";
import CodeEditor from "../components/Editor";

function Room() {
    // useEffect(() => {
    //     return () => {
    //         window.location.replace('/')
    //     }
    // })

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

