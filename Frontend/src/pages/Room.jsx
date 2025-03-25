import React, { useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams, useNavigate } from "react-router-dom"
import useAuthStore from "../store/user.store"

function Room() {
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
                navigate("/select-interview");
            },

            // Extra Features:
            turnOnMicrophoneWhenJoining: false,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 2,
            layout: "Auto",
            showLayoutButton: true,
            showPreJoinView: false,

        });

    }, [roomId, user.name]);

    return (
        <div ref={videoContainerRef} style={{ width: "100vw", height: "100vh" }} />
    );
}

export default Room;
