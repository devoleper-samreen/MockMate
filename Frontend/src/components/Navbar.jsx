import React from 'react'
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/user.store"
import { Dropdown, Menu } from "antd"

function Navbar() {
    const navigate = useNavigate()
    const { user } = useAuthStore()

    const menuItems = [
        {
            key: "profile",
            label: "Profile",
            onClick: () => navigate("/profile"),
        },
        {
            key: "interview",
            label: "Interview",
            onClick: () => navigate("/select-interview"),
        },
    ];


    return (
        <nav className="px-[2%] md:px-[5%] w-full flex justify-between items-center py-5 bg-gray-900 shadow-lg">
            <h1 className="text-2xl font-bold text-yellow-400 cursor-pointer" onClick={() => navigate('/')}>MockMate</h1>
            {
                !user && <button
                    onClick={() => navigate("/login")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 font-semibold px-6 py-3 rounded shadow-md transition transform cursor-pointer"
                >
                    Login
                </button>
            }
            {
                user && <Dropdown menu={{ items: menuItems }} trigger={["hover"]}>
                    <p className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 font-bold rounded-full shadow-md transition transform cursor-pointer h-12 w-12 flex items-center justify-center text-2xl">
                        {user.name.charAt(0)}
                    </p>
                </Dropdown>
            }
        </nav>
    )
}

export default Navbar