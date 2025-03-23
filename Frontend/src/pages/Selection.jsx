import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaCalendarAlt, FaRocket } from "react-icons/fa";
import useUserStore from "../store/user.store";
import socket from "../apiManager/socket";
import { Modal, Spin } from "antd";

const InterviewSelectionPage = () => {
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [socketConnected, setSocketConnected] = useState(false);
    const [isMatching, setIsMatching] = useState(false);
    const [matchFailed, setMatchFailed] = useState(false);
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        socket.on("connect", () => {
            setSocketConnected(true);
        });
        socket.on("disconnect", () => {
            setSocketConnected(false);
        });
        socket.on("match-found", ({ roomId, matchedWith }) => {
            setIsMatching(false);
            Modal.destroyAll();
            console.log(`Matched with ${matchedWith.name}! Redirecting...`);
            //navigate(`/interview-room/${roomId}`);
        });
        socket.on("no-match-found", () => {
            console.log("No Match Found, closing modal...");
            setIsMatching(false);
            setMatchFailed(true);
        });
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("match-found");
            socket.off("no-match-found");
        };
    }, []);

    const handleInstantInterview = () => {
        setIsMatching(true);
        setMatchFailed(false);
        setTimer(0);
        socket.emit("instant-interview", { userId: user._id });

    };

    useEffect(() => {
        let interval;
        if (isMatching) {
            setTimer(30); // Start from 30
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isMatching]);


    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
            <h1 className="text-5xl font-bold text-yellow-400 my-12">Start Your Interview</h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                <SelectionCard icon={<FaUserTie />} title="Become an Interviewer" description="Host an interview and help others prepare." onClick={() => navigate("/become-interviewer")} />
                <SelectionCard icon={<FaCalendarAlt />} title="Schedule an Interview" description="Plan your interview for later." onClick={() => navigate("/schedule-interview")} />
                <SelectionCard icon={<FaRocket />} title="Instant Interview" description="Start an interview now."
                    onClick={handleInstantInterview}
                />
            </div>

            <Modal open={isMatching} footer={null} onCancel={() => setIsMatching(false)} centered>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-yellow-400">Matching in Progress...</h2>
                    <p className="text-gray-400 my-6">Searching for an interview match...</p>
                    <Spin size="large" className="my-16" />
                    <p className="text-lg font-bold my-8">⏳ {timer}s</p>
                </div>
            </Modal>

            <Modal open={matchFailed} footer={null} onCancel={() => setMatchFailed(false)} centered>
                <div className="text-center py-6">
                    <h2 className="text-2xl font-bold text-red-500 mb-8">No Match Found</h2>
                    <p className="text-gray-400 mt-2">No match found within 30 seconds. Try again later.</p>
                </div>
            </Modal>
        </div>
    );
};

const SelectionCard = ({ icon, title, description, onClick }) => (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 transition-transform" onClick={onClick}>
        <div className="text-4xl mb-4 text-yellow-400">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

export default InterviewSelectionPage;

