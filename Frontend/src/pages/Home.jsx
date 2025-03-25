import React, { useEffect, useState } from "react";
import { FaVideo, FaCalendarCheck, FaClock, FaUsers } from "react-icons/fa";
import { getMe } from "../apiManager/auth"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/user.store"


const HomePage = () => {
    const navigate = useNavigate()
    const { user, setUser } = useAuthStore()

    const getUserInfo = async () => {
        try {
            if (!user) {
                const response = await getMe()
                console.log(response.user);

                setUser(response?.user);
            }

        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);


    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            {/* Navbar */}
            <nav className="px-[2%] md:px-[5%] w-full flex justify-between items-center py-5 bg-gray-900 shadow-lg">
                <h1 className="text-2xl font-bold text-yellow-400">MockMate</h1>

                <button
                    onClick={() => navigate("/signup")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 font-semibold px-6 py-3 rounded shadow-md transition transform cursor-pointer"
                >
                    <span className="hidden sm:inline">Signup</span>

                </button>
            </nav>

            <div className="w-full md:min-h-screen bg-gray-900 text-white">
                {/* Hero Section */}
                <div className="px-[4%] lg:px-[10%] relative flex flex-col items-center justify-center text-center md:h-[90vh] h-[70vh] bg-gradient-to-r from-blue-400 to-purple-800 p-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        MockMate - Your Ultimate Interview Practice Platform
                    </h1>
                    <p className="text-lg max-w-2xl">
                        Get real interview experience with live video calling, code editor, timers, and structured practice sessions.
                    </p>
                    <button className="mt-16 md:mt-6 px-6 py-3 text-lg bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg cursor-pointer font-semibold" onClick={() => navigate('/select-interview')}>
                        Start Your First Interview
                    </button>
                </div>

                {/* Features Section */}
                <div className="py-20 px-6 max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-16 text-yellow-400">Why Choose MockMate?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <FeatureCard
                            icon={<FaVideo size={40} className="text-blue-500" />}
                            title="Live Video Interviews"
                            description="Experience real-time interview simulations with video calling and a shared code editor."
                        />
                        <FeatureCard
                            icon={<FaCalendarCheck size={40} className="text-green-500" />}
                            title="Schedule or Instant Interviews"
                            description="Book structured interviews with mentors or start an instant interview anytime."
                        />
                        <FeatureCard
                            icon={<FaClock size={40} className="text-red-500" />}
                            title="Real-Time Timer"
                            description="Keep track of your interview performance with a live countdown timer."
                        />
                        <FeatureCard
                            icon={<FaUsers size={40} className="text-purple-500" />}
                            title="Peer & Expert Feedback"
                            description="Receive detailed feedback from industry professionals and peers after every session."
                        />
                    </div>
                </div>

                {/* Student Reviews */}
                <div className="py-20 bg-gray-800 text-center">
                    <h2 className="text-4xl font-bold text-yellow-400 mb-12">What Students Say</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        <ReviewCard
                            name="Aman Gupta"
                            review="MockMate helped me ace my FAANG interviews! The live video + code editor combo is a game-changer."
                        />
                        <ReviewCard
                            name="Pooja Sharma"
                            review="The instant interview feature gave me the confidence to face real interviews without fear."
                        />
                        <ReviewCard
                            name="Rahul Verma"
                            review="The best platform for mock interviews! The structured scheduling and peer feedback helped me improve tremendously."
                        />
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-10 bg-gray-900 text-center text-gray-400">
                    <p>&copy; 2025 MockMate | All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

const ReviewCard = ({ name, review }) => (
    <div className="bg-gray-700 p-6 rounded-lg max-w-xs shadow-lg hover:scale-105 transition-transform">
        <p className="text-gray-300 mb-4">"{review}"</p>
        <h4 className="text-lg font-bold text-yellow-400">- {name}</h4>
    </div>
);

export default HomePage;
