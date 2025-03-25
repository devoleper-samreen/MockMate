import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email", { required: "Email is required" })}
                        type="email" placeholder="Email" className="w-full p-3 mb-3 border rounded-md bg-gray-700 border-gray-600 text-white" />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

                    <input {...register("password", { required: "Password is required" })}
                        type="password" placeholder="Password" className="w-full p-3 mb-3 border rounded-md bg-gray-700 border-gray-600 text-white" />
                    {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

                    <button type="submit" className="w-full bg-blue-600 p-3 rounded-md hover:bg-blue-700 mt-3">Login</button>
                </form>
                <button className="w-full flex items-center justify-center mt-3 border p-3 rounded-md bg-gray-700 hover:bg-gray-600">
                    <FcGoogle className="mr-2" /> Login with Google
                </button>
                <p className="text-sm text-center mt-3">Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login