import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState(""); 
    const navigate = useNavigate();

    const handleReset = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
            toast.success("Password updated successfully!");
            setTimeout(() => navigate("/login"), 1500);
        } else {
            toast.error("Email not found");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-questrial selection:bg-emerald-500/30">
            <Toaster />
            
            {/* Navbar */}
            <nav className="flex justify-between items-center px-10 py-6">
                <div className="text-2xl font-bold tracking-tight">Logo</div>
                <div className="flex gap-8 items-center text-gray-300">
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                    <a href="/services" className="hover:text-white transition-colors">Services</a>
                    <div className="text-xl cursor-pointer hover:text-white">@</div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-[85vh] px-6 lg:px-20 gap-16">
                
                {/* Left Side: Illustration */}
                <div className="flex-1 flex flex-col items-center text-center max-w-lg">
                    <div className="relative w-full">
                        <img 
                            src="../images/forgot-password-image.png" 
                            alt="Forgot Password Illustration" 
                            className="w-full h-auto drop-shadow-2xl"
                        />
                    </div>
                    <h1 className="text-5xl font-bold mt-8 tracking-tight">Forgot Your Password</h1>
                    <p className="text-gray-400 mt-4 text-lg">Reset your password in a few easy steps!</p>
                </div>

                {/* Right Side: Enhanced Form Card */}
                <div className="flex-1 w-full max-w-xl h-full"> {/* Increased max-w for more width */}
                    <div 
                        className="relative overflow-hidden p-12 lg:p-16 bg-cover bg-center shadow-2xl min-h-[700px] min-w-[650px] flex flex-col justify-center" // Added min-h and more padding for height
                        style={{ backgroundImage: "url('/images/green-signup.png')" }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>

                        {/* Content Container */}
                        <div className="relative z-10 w-full">
                            <h2 className="text-4xl font-bold mb-3 tracking-tight">Forgot password?</h2>
                            <p className="text-gray-100/90 mb-10 text-lg font-light">No worries, we'll send you reset instructions</p>
                            
                            <form onSubmit={handleReset} className="space-y-8">
                                <div>
                                    <label className="block text-sm font-semibold mb-3 text-white uppercase tracking-wider">Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="Enter Registered Email" 
                                        className="input input-bordered w-full bg-[#064e3b] border-white border-1 focus:border-white focus:outline-none h-14 text-white rounded-2xl placeholder:text-gray-400 text-lg px-6"
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-3 text-white uppercase tracking-wider">New Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="Enter New Password" 
                                        className="input input-bordered w-full bg-[#064e3b] border-white border-1 focus:border-white focus:outline-none h-14 text-white rounded-2xl placeholder:text-gray-400 text-lg px-6"
                                        onChange={(e) => setNewPassword(e.target.value)} 
                                        required 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn border-none w-full bg-white text-black hover:bg-gray-100 font-black rounded-2xl h-14 mt-6 shadow-xl transition-all active:scale-[0.98] text-lg uppercase tracking-widest"
                                >
                                    Reset password
                                </button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default ForgotPassword;