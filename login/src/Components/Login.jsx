import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Utils/auth';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [role, setRole] = useState("user");
    const navigate = useNavigate();

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = loginUser(credentials.email, credentials.password, role);

        if (result.success) {
            toast.success(`Logged in as ${result.role}`);
            setTimeout(() => {
                navigate(result.role === "admin" ? "/admin" : "/home");
            }, 1000);
        } else {
            toast.error(result.message || "Invalid Credentials");
        }
    };

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center font-questrial overflow-hidden p-4">
            <Toaster />
            
            {/* Main Card Container */}
            <div className="w-full max-w-6xl h-full max-h-[85vh] grid grid-cols-1 md:grid-cols-2 shadow-xl overflow-hidden ">
                
                {/* --- Left Column: Login Form --- */}
                <div className="p-8 md:p-16 flex flex-col justify-center bg-black text-white h-full">
                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold mb-2">Welcome Back!</h1>
                        <p className="text-gray-400">Log in to access your services.</p>
                    </div>

                    {/* Role Selection (Kept from your original code) */}
                    <div className="flex gap-4 mb-8">
                        <button 
                            type="button" 
                            className={`px-6 py-2 rounded-full transition ${role === 'user' ? 'bg-white text-black font-bold' : 'border border-gray-600 text-gray-400'}`}
                            onClick={() => setRole('user')}
                        >
                            User
                        </button>
                        <button 
                            type="button" 
                            className={`px-6 py-2 rounded-full transition ${role === 'admin' ? 'bg-white text-black font-bold' : 'border border-gray-600 text-gray-400'}`}
                            onClick={() => setRole('admin')}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400 text-sm">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="bg-[#064e3b] text-white p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition" 
                                onChange={handleInput} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-400 text-sm">Password</label>
                            <div className="relative">
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="bg-[#064e3b] text-white p-4 rounded-xl outline-none w-full focus:ring-2 focus:ring-emerald-500 transition" 
                                    onChange={handleInput} 
                                    required 
                                />
                                
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-500" />
                                <span className="text-gray-400">Remember Me</span>
                            </label>
                            <a href="#" className="text-blue-500 hover:underline">Forgot Password</a>
                        </div>

                        <button 
                            type="submit" 
                            className="bg-white text-black font-extrabold text-xl py-4 rounded-2xl transition hover:bg-gray-200 mt-4 shadow-lg w-full max-w-xs mx-auto md:mx-0"
                        >
                            Log In
                        </button>
                    </form>
                    
                    <p className="mt-8 text-gray-400 text-center md:text-left">
                        New User? <a href="/" className="text-white font-bold hover:underline ml-1">Register</a>
                    </p>
                </div>

                {/* --- Right Column: Image Panel --- */}
                <div className="hidden md:flex bg-[url('/images/green-signup.png')] bg-cover bg-center text-white p-12 flex-col justify-between h-full relative  m-2">
                    <div className="flex justify-between items-center text-2xl font-bold">
                        <div>Logo</div>
                        <span>@</span>
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-extrabold leading-tight mb-4">
                            Explore AI Services Faster, Smoother and Easier
                        </h2>
                        <p className="text-gray-300 text-lg opacity-80 leading-relaxed">
                            Explore the various AI services and easily scalable solutions at the lowest cost possible.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;