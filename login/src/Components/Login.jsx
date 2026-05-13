import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Utils/auth';
import ForgotPassword from './ForgotPassword';
import { Eye, EyeOff } from 'lucide-react';
import '../index.css';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext'; // 1. Import useTheme
import NavBar from './NavBar';
import Logo from '../Assets/Logo';

const Login = () => {
    const { theme } = useTheme(); // 2. Get the current theme
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [role, setRole] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const togglePassword = () => setShowPassword(!showPassword);

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
        // 3. Added transition-colors for smooth swap
        <div>
        <NavBar/>
        <div className={`h-screen w-full ${theme === 'dark' ? 'bg-primary-dark ' : 'bg-primary text-black'} transition-colors duration-500 flex items-center justify-center font-questrial overflow-hidden p-4`}>
            <Toaster />
            
            <div className="w-full max-w-6xl  max-h-[85vh] grid grid-cols-1 md:grid-cols-2 shadow-xl overflow-hidden ">
                
                {/* --- Left Column: Login Form --- */}
                {/* 4. Made background and text color dynamic */}
                <div className={`p-8 md:p-16 flex flex-col justify-center transition-colors duration-500 h-full ${theme === 'dark' ? 'bg-primary-dark text-white' : 'bg-white text-black'}`}>
                    <div className="mb-10">
                        <h1 className="text-4xl font-extrabold mb-2">Welcome Back!</h1>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Log in to access your services.</p>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <button 
                            type="button" 
                            className={`px-6 py-2 rounded-full transition ${role === 'user' ? (theme === 'dark' ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold') : 'border border-gray-600 text-gray-400'}`}
                            onClick={() => setRole('user')}
                        >
                            User
                        </button>
                        <button 
                            type="button" 
                            className={`px-6 py-2 rounded-full transition ${role === 'admin' ? (theme === 'dark' ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold') : 'border border-gray-600 text-gray-400'}`}
                            onClick={() => setRole('admin')}
                        >
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                // 5. Made input background dynamic
                                className={`p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition ${theme === 'dark' ? 'bg-[#064e3b] text-white' : 'bg-gray-100 text-black'}`}
                                onChange={handleInput} 
                                required 
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    className={`p-4 pr-12 rounded-xl outline-none w-full focus:ring-2 focus:ring-emerald-500 transition ${theme === 'dark' ? 'bg-[#064e3b] text-white' : 'bg-gray-100 text-black'}`}
                                    onChange={handleInput} 
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-emerald-500" />
                                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Remember Me</span>
                            </label>
                            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot Password</a>
                        </div>

                        <button 
                            type="submit" 
                            className={`font-extrabold text-xl py-4 rounded-2xl transition mt-4 shadow-lg w-full max-w-xs mx-auto md:mx-0 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                        >
                            Log In
                        </button>
                    </form>
                    
                    <p className={`mt-8 text-center md:text-left ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        New User? <a href="/signup" className={`font-bold hover:underline ml-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Register</a>
                    </p>
                </div>

                {/* --- Right Column: Image Panel --- */}
                {/* 6. Swap background image based on theme */}
                <div className={`hidden md:flex ${theme === 'dark' ? "bg-[url('/images/dark-green-signup.png')]" : "bg-[url('/images/light-green-signup.png')]"} bg-cover bg-center text-white p-12 flex-col justify-between h-full relative m-2 transition-all duration-500`}>
                    <div className="flex justify-between items-center text-3xl font-bold">
                        <div><Logo /></div>
                        <span>@</span>
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-extrabold leading-tight mb-4">
                            Explore AI Services Faster, Smoother and Easier
                        </h2>
                        <p className="text-gray-100 text-lg font-bold leading-relaxed">
                            Explore the various AI services and easily scalable solutions at the lowest cost possible.
                        </p>
                    </div>
                </div>

            </div>
            
        </div>
        </div>
    );
};

export default Login;