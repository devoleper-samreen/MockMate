import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { signup } from "../apiManager/auth"
import { authenticate } from "../apiManager/auth"

const Signup = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const response = await signup(data)
        reset()
        console.log(response);

    };

    const handleLogin = async () => {
        authenticate()
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Name"
                        className="w-full p-3 mb-3 border border-gray-700 bg-gray-700 text-white rounded-md" />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}

                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 mb-3 border border-gray-700 bg-gray-700 text-white rounded-md" />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

                    <input
                        {...register("password",
                            { required: "Password is required" })} type="password"
                        placeholder="Password"
                        className="w-full p-3 mb-3 border border-gray-700 bg-gray-700 text-white rounded-md" />
                    {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition mt-3">Sign Up</button>
                </form>
                <button className="w-full flex items-center justify-center mt-3 border border-gray-700 p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition" onClick={handleLogin}>
                    <FcGoogle className="mr-2" /> Sign up with Google
                </button>
                <p className="text-sm text-center mt-3">Already have an account? <Link to="/login" className="text-blue-400">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;