import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Utils/auth'; // Import your utility function

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Basic Validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // 2. Format the data to match your Auth/Dashboard needs
        const userData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password
        };

        // 3. Use the centralized register function from auth.jsx
        // This function handles existing user checks and localStorage keys correctly
        const success = registerUser(userData);

        if (success) {
            alert("Registration Successful!");
            navigate('/login');
        } else {
            alert("Registration failed. Email might already exist.");
        }
    };

    return (
        <div className="h-screen w-full bg-black flex items-center justify-center font-questrial overflow-hidden p-4">
            <div className="signup-card w-full max-w-6xl h-full max-h-[85vh] grid grid-cols-1 md:grid-cols-2 shadow-xl overflow-hidden ml-0">
                
                {/* --- Left Column --- */}
                <div className="signup-info bg-[url('../public/images/green-signup.png')] bg-cover bg-center text-white p-8 md:p-12 relative flex flex-col justify-between h-full ">
                    <div className="flex justify-between items-center text-2xl">
                        <h2 className='font-bold text-emerald-400'>Logo</h2>
                        <span>@</span>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 max-w-sm">
                            Get Started<br />with Us
                        </h1>
                        <p className="text-[#a4b5aa] text-base max-w-xs">
                            Complete these easy steps to register your account
                        </p>
                    </div>

                    <div className="flex justify-start gap-3 mt-4">
                        <div className="bg-white text-black w-28 h-28 rounded-2xl p-4 flex flex-col justify-between shadow-lg">
                            <span className="font-bold">1</span>
                            <p className="text-sm font-bold leading-tight">Sign up your account</p>
                        </div>
                        <div className="bg-[#1f4835] w-28 h-28 rounded-2xl p-4 flex flex-col justify-between opacity-80">
                            <span className="text-white/70">2</span>
                            <span className="text-sm text-white/90 font-medium leading-tight">Set up workspace</span>
                        </div>
                        <div className="bg-[#1f4835] w-28 h-28 rounded-2xl p-4 flex flex-col justify-between opacity-80">
                            <span className="text-white/70">3</span>
                            <span className="text-sm text-white/90 font-medium leading-tight">Set up Profile</span>
                        </div>
                    </div>
                </div>

                {/* --- Right Column --- */}
                <div className="signup-form p-8 md:p-12 flex flex-col justify-center bg-black h-full overflow-y-auto">
                    <h2 className="text-3xl font-extrabold text-white mb-6">Sign Up Account</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[#a4b5aa] block mb-1 text-sm font-medium">First name</label>
                                <input className="bg-[#064e3b] text-white placeholder-[#3d8a6a] w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" type="text" name="firstName" placeholder="eg John" value={formData.firstName} onChange={handleInput} required />
                            </div>
                            <div>
                                <label className="text-[#a4b5aa] block mb-1 text-sm font-medium">Last name</label>
                                <input className="bg-[#064e3b] text-white placeholder-[#3d8a6a] w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInput} required />
                            </div>
                        </div>

                        <div>
                            <label className="text-[#a4b5aa] block mb-1 text-sm font-medium">Email</label>
                            <input className="bg-[#064e3b] text-white placeholder-[#3d8a6a] w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" type="email" name="email" placeholder="johndoe@example.com" value={formData.email} onChange={handleInput} required />
                        </div>

                        <div>
                            <label className="text-[#a4b5aa] block mb-1 text-sm font-medium">Create password</label>
                            <input className="bg-[#064e3b] text-white w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" type="password" name="password" value={formData.password} onChange={handleInput} required />
                        </div>
                        
                        <div>
                            <label className="text-[#a4b5aa] block mb-1 text-sm font-medium">Re-enter password</label>
                            <input className="bg-[#064e3b] text-white w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInput} required />
                        </div>
  
                        <button type="submit" className="bg-white hover:bg-gray-100 text-black font-extrabold text-lg py-4 rounded-xl transition shadow-md mt-2 active:scale-95">
                            Sign up
                        </button>
                    </form>
                    
                    <p className="text-center text-[#a4b5aa] text-sm mt-6">
                        Already a user? <button onClick={() => navigate('/login')} className="text-white font-semibold hover:underline">Log in</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;