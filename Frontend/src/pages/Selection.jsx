import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaCalendarAlt, FaRocket } from "react-icons/fa";
import { getMe } from "../apiManager/auth"
import useUserStore from "../store/user.store"
import axios from "axios";

const SelectionCard = ({ icon, title, description, onClick }) => (
    <div
        className="bg-gray-800 p-8 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 transition-transform"
        onClick={onClick}
    >
        <div className="text-4xl mb-4 text-yellow-400">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

const InterviewSelectionPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUserStore()

    const getUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/v1/auth/get-me", { withCredentials: true });
            console.log(response);
            setUser(response?.data?.user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-10">
            <h1 className="text-5xl font-bold text-yellow-400 my-12">Start Your Interview</h1>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                <SelectionCard
                    icon={<FaUserTie />}
                    title="Become an Interviewer"
                    description="Host an interview and help others prepare. Set your own criteria and difficulty level."
                    onClick={() => navigate("/become-interviewer")}
                />

                <SelectionCard
                    icon={<FaCalendarAlt />}
                    title="Schedule an Interview"
                    description="Plan your interview for a later time. Choose a mentor or peer and get ready."
                    onClick={() => navigate("/schedule-interview")}
                />

                <SelectionCard
                    icon={<FaRocket />}
                    title="Instant Interview"
                    description="Start an interview right now with a peer or AI. Real-time coding + video call."
                    onClick={() => navigate("/instant-interview")}
                />
            </div>
        </div>
    );
};

export default InterviewSelectionPage;
