import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom"
import useAuthStore from "../store/user.store"
import { useRef, useEffect } from "react";

function VideoCall() {
    const navigate = useNavigate();
    const appId = import.meta.env.VITE_APP_ID
    const secret = import.meta.env.VITE_SERVER_SECRET

    const { roomId } = useParams()
    const videoContainerRef = useRef(null);
    const { user } = useAuthStore()

    useEffect(() => {
        const appID = Number(appId)
        const serverSecret = String(secret)

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            `${user?.name || "dummy"}`
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            videoQuality: 1,
            container: videoContainerRef.current,
            scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
            onLeaveRoom: () => {
                zp.destroy()
                window.location.replace('/')
            },

            // Extra Features:
            turnOnMicrophoneWhenJoining: false,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 5,
            layout: "Auto",
            showLayoutButton: false,
            showPreJoinView: false,

        });

        return () => {
            zp.destroy()
        }

    }, []);

    return (
        <div ref={videoContainerRef} className="w-full h-screen" />

    );
}

export default VideoCall;
