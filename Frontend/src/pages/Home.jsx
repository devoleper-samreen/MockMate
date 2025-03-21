import React, { useEffect } from "react";
import { FaVideo, FaCalendarCheck, FaClock, FaUsers } from "react-icons/fa";
import { authenticate, getMe } from "../apiManager/auth"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/user.store"

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

const ReviewCard = ({ name, review }) => (
    <div className="bg-gray-700 p-6 rounded-lg max-w-xs shadow-lg">
        <p className="text-gray-300 mb-4">"{review}"</p>
        <h4 className="text-lg font-bold text-yellow-400">- {name}</h4>
    </div>
);

const HomePage = () => {
    const navigate = useNavigate()
    const { user, setUser } = useAuthStore()

    const handleLogin = async () => {
        authenticate()
    };

    const getUserInfo = async () => {
        try {
            const response = await getMe();
            console.log(response);
            setUser(response?.data?.user);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    useEffect(() => {
        if (user) {
            getUserInfo();
        }
    }, [user])

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            {/* Navbar */}
            <nav className="px-[5%] w-full flex justify-between items-center py-5 bg-gray-800 shadow-lg">
                <h1 className="text-2xl font-bold text-blue-400">MockMate</h1>

                <button
                    onClick={handleLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded shadow-md transition cursor-pointer"
                >
                    Sign in with Google
                </button>
            </nav>

            <div className="w-full min-h-screen bg-gray-900 text-white">
                {/* Hero Section */}
                <div className="px-[10%] relative flex flex-col items-center justify-center text-center h-[90vh] bg-gradient-to-r from-blue-400 to-purple-800 p-8">
                    <h1 className="text-5xl font-extrabold mb-6">
                        MockMate - Your Ultimate Interview Practice Platform
                    </h1>
                    <p className="text-lg max-w-2xl">
                        Get real interview experience with live video calling, code editor, timers, and structured practice sessions.
                    </p>
                    <button className="mt-6 px-6 py-3 text-lg bg-purple-600 hover:bg-purple-800 rounded-lg shadow-lg cursor-pointer" onClick={() => navigate('/select-interview')}>
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

export default HomePage;
