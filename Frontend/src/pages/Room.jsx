// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useParams, useNavigate } from "react-router-dom"
// import useAuthStore from "../store/user.store"
// import Editor from "@monaco-editor/react"

// function Room() {
//     const navigate = useNavigate();
//     const appId = import.meta.env.VITE_APP_ID
//     const secret = import.meta.env.VITE_SERVER_SECRET

//     const { roomId } = useParams()
//     const videoContainerRef = useRef(null);
//     const { user } = useAuthStore()
//     const [code, setCode] = useState("// Start coding...");

//     useEffect(() => {
//         const appID = Number(appId)
//         const serverSecret = String(secret)

//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             roomId,
//             Date.now().toString(),
//             `${user?.name || "dummy"}`
//         );

//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//         zp.joinRoom({
//             videoQuality: 1,
//             container: videoContainerRef.current,
//             scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
//             onLeaveRoom: () => {
//                 window.location.reload();
//             },

//             // Extra Features:
//             turnOnMicrophoneWhenJoining: true,
//             turnOnCameraWhenJoining: true,
//             showMyCameraToggleButton: true,
//             showMyMicrophoneToggleButton: true,
//             showScreenSharingButton: true,
//             showTextChat: true,
//             showUserList: false,
//             maxUsers: 2,
//             layout: "Auto",
//             showLayoutButton: false,
//             showPreJoinView: false,

//         });

//     }, [roomId, user.name]);

//     return (
//         // <div ref={videoContainerRef} style={{ width: "40vw", height: "100vh" }} />
//         <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
//             {/*  Video Call */}
//             <div ref={videoContainerRef} style={{ width: "40%", height: "100vh" }} />

//             {/* Code Editor */}
//             <div style={{ width: "60%", height: "100vh" }}>
//                 <Editor
//                     height="100vh"
//                     width="100%"
//                     theme="vs-dark"
//                     language="javascript"
//                     value={code}
//                     onChange={handleCodeChange}
//                     options={{
//                         fontSize: 16,
//                         minimap: { enabled: false },
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }

// export default Room;

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
