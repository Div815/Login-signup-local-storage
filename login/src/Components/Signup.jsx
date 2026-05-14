import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Utils/auth'; 
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // 1. Import useTheme
import ThemeToggle from './ThemeToggle'; // 2. Import Toggle
import Logo from '../Assets/Logo';
import NavBar from './NavBar';

function Signup() {
    const { theme } = useTheme(); // 3. Access current theme
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const userData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password
        };

        const success = registerUser(userData);

        if (success) {
            toast.success("Registration successful! Please log in.");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            toast.error("Registration failed. Email might already exist.");
        }
    };

    return (
        // 4. Use dynamic background for the screen
        <div className='h-screen flex flex-col'>
        <NavBar/>      
        <div className={`flex-1  w-screen  items-center justify-center font-questrial overflow-hidden p-4 transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-800' : 'bg-primary text-black'} transition-colors duration-500`}>
           
            <Toaster position="top-center" /> 
            
            <div className="signup-card w-full max-w-6xl ml-30 rounded-2xl h-full max-h-[85vh] grid grid-cols-1 md:grid-cols-2 shadow-xl overflow-hidden  relative">
                
                {/* --- Left Column: Side Panel --- */}
                {/* 5. Dynamic background image swap */}
                <div className={`signup-info ${theme === 'dark' ? "bg-[url('/images/dark-blue-signup.jpg')]" : "bg-[url('/images/light-green-signup.jpg')]"} bg-cover bg-center text-white p-8 md:p-12 relative flex flex-col justify-between h-full transition-all duration-500`}>
                    <div className="flex justify-between items-center text-2xl">
                        <h2 className={`font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-white'}`}><Logo /></h2>
                        <span>@</span>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2 max-w-sm text-white">
                            Get Started<br />with Us
                        </h1>
                        <p className={`text-base max-w-xs ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-emerald-50'}`}>
                            Complete these easy steps to register your account
                        </p>
                    </div>

                    <div className="flex justify-start gap-3 mt-4">
                        {/* Step 1 */}
                        <div className={`w-28 h-28 rounded-2xl p-4 flex flex-col justify-between shadow-lg transition-colors ${theme === 'dark' ? 'bg-white text-black' : 'bg-white text-black'}`}>
                            <span className="font-bold">1</span>
                            <p className="text-sm font-bold leading-tight">Sign up your account</p>
                        </div>
                        {/* Step 2 */}
                        <div className={`w-28 h-28 rounded-2xl p-4 flex flex-col justify-between opacity-80 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-emerald-700 text-white'}`}>
                            <span className="text-white/70">2</span>
                            <span className="text-sm font-medium leading-tight">Set up workspace</span>
                        </div>
                        {/* Step 3 */}
                        <div className={`w-28 h-28 rounded-2xl p-4 flex flex-col justify-between opacity-80 transition-colors ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-emerald-700 text-white'}`}>
                            <span className="text-white/70">3</span>
                            <span className="text-sm font-medium leading-tight">Set up Profile</span>
                        </div>
                    </div>
                </div>


                {/* --- Right Column: Form --- */}
                {/* 6. Dynamic background and text color */}
                <div className={`signup-form p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
                    <h2 className={`text-3xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Sign Up Account</h2>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={`block mb-1 text-sm font-medium ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-gray-600'}`}>First name</label>
                                <input 
                                    className={`w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-black'}`} 
                                    type="text" name="firstName" placeholder="eg John" value={formData.firstName} onChange={handleInput} required 
                                />
                            </div>
                            <div>
                                <label className={`block mb-1 text-sm font-medium ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-gray-600'}`}>Last name</label>
                                <input 
                                    className={`w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-black'}`} 
                                    type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInput} required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className={`block mb-1 text-sm font-medium ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-gray-600'}`}>Email</label>
                            <input 
                                className={`w-full p-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-black'}`} 
                                type="email" name="email" placeholder="johndoe@example.com" value={formData.email} onChange={handleInput} required 
                            />
                        </div>

                        <div>
                            <label className={`block mb-1 text-sm font-medium ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-gray-600'}`}>Create password</label>
                            <div className="relative">
                                <input 
                                    className={`w-full p-3 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-black'}`} 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleInput} 
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={togglePassword}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-cyan-600' : 'text-gray-400 hover:text-emerald-600'}`}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        
                        <div>
                            <label className={`block mb-1 text-sm font-medium ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-gray-600'}`}>Re-enter password</label>
                            <div className="relative">
                                <input 
                                    className={`w-full p-3 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-black'}`} 
                                    type={showPassword ? "text" : "password"} 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleInput} 
                                    required 
                                />
                            </div>
                        </div>
  
                        <button 
                            type="submit" 
                            className={`font-extrabold text-lg py-4 rounded-xl transition shadow-md mt-2 active:scale-95 ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'}`}
                        >
                            Sign up
                        </button>
                    </form>
                    
                    <p className={`text-center text-sm mt-6 ${theme === 'dark' ? 'text-[#a4b5aa]' : 'text-gray-600'}`}>
                        Already a user? <button onClick={() => navigate('/login')} className={`font-semibold hover:underline ${theme === 'dark' ? 'text-white' : 'text-emerald-700'}`}>Log in</button>
                    </p>
                </div>
            </div>
           
        </div>
         </div>
    );
}

export default Signup;