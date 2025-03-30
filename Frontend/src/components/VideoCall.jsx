import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../store/user.store";
import { useRef, useEffect, useState } from "react";

function VideoCall() {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const { user } = useAuthStore();
    const videoContainerRef = useRef(null);
    const [zpInstance, setZpInstance] = useState(null);

    useEffect(() => {
        const appID = Number(import.meta.env.VITE_APP_ID);
        const serverSecret = String(import.meta.env.VITE_SERVER_SECRET);

        if (!roomId || !appID || !serverSecret) {
            console.error("Missing required room details or API credentials");
            return;
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomId,
            Date.now().toString(),
            user?.name || "Guest"
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        setZpInstance(zp);

        zp.joinRoom({
            videoQuality: 2, // Balanced video quality
            container: videoContainerRef.current,
            scenario: { mode: ZegoUIKitPrebuilt.VideoConference },
            onLeaveRoom: () => {
                handleLeaveCall();
            },
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
            zp.destroy();
            setZpInstance(null);
        };
    }, [roomId, user?.name]);

    const handleLeaveCall = () => {
        if (zpInstance) {
            zpInstance.destroy();
            setZpInstance(null);
        }
        navigate("/");
    };

    return (
        <div className="w-full h-screen relative">
            <div ref={videoContainerRef} className="w-full h-full" />
        </div>
    );
}

export default VideoCall;


