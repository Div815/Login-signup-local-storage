import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../index.css';
import { useTheme } from '../context/ThemeContext';
import Logo from '../Assets/Logo';
import NavBars from './NavBars';
import { useTranslation } from 'react-i18next';

// Firebase Imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [role, setRole] = useState("user"); // 🟢 Kept for your UI toggle buttons
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleInput = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    const togglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginLoader = toast.loading("Logging in...");

        try {
            // 1. Log the user in with Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            const user = userCredential.user;

            const userDocRef = doc(database, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let assignedRole = "user";
            if (userDocSnap.exists()) {
                assignedRole = userDocSnap.data().role;
            }

            // 🟢 CRITICAL: Update your global state provider here if you use one!
            // Example: if you have a custom context hook like `const { login } = useAuth();`
            // login(user, assignedRole); 

            toast.dismiss(loginLoader);
            toast.success(`Logged in successfully!`);

            setTimeout(() => {
                navigate(assignedRole === "admin" ? "/admin" : "/home");
            }, 1000);
        } catch (error) {
            toast.dismiss(loginLoader);
            console.error("Login Error:", error);
            toast.error(error.message || "Invalid email or password.");
        }
    };

    const handleForgot = () => {
        navigate('/forgot-password');
    };

    return (
        <div className={`h-screen w-full flex flex-col antialiased transition-colors duration-500 overflow-hidden relative
            ${isDark ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'}`}>
            <Toaster />
            <NavBars />

            <div className={`flex-1 w-full flex items-center justify-center py-10 px-4 relative z-10 transition-colors duration-500
                ${isDark ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'}`}>
                <div className={`w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-hidden rounded-2xl max-h-[80vh] items-stretch border
                    ${isDark ? 'bg-[#111726] border-slate-800/80 shadow-black/20' : 'bg-white border-slate-200'}`}>
                    
                    {/* Left Column: Login Form */}
                    <div className={`p-8 md:p-16 flex flex-col justify-center overflow-y-auto transition-colors duration-500
                        ${isDark ? 'bg-[#111726] text-slate-100' : 'bg-white text-slate-800'}`}>
                        <div className="mb-10">
                            <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {t('welcome_back')}
                            </h1>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {t('log_in_to_access_services')}
                            </p>
                        </div>

                        {/* Role Toggle */}
                        <div className="flex gap-4 mb-8">
                            <button 
                                type="button" 
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer border
                                    ${role === 'user' 
                                        ? (isDark 
                                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-sm' 
                                            : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 shadow-sm') 
                                        : (isDark 
                                            ? 'border-slate-800 text-slate-500 hover:text-slate-400' 
                                            : 'border-slate-200 text-slate-400 hover:text-slate-500')
                                    }`}
                                onClick={() => setRole('user')}
                            >
                                {t('user')}
                            </button>
                            <button 
                                type="button" 
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer border
                                    ${role === 'admin' 
                                        ? (isDark 
                                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-sm' 
                                            : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 shadow-sm') 
                                        : (isDark 
                                            ? 'border-slate-800 text-slate-500 hover:text-slate-400' 
                                            : 'border-slate-200 text-slate-400 hover:text-slate-500')
                                    }`}
                                onClick={() => setRole('admin')}
                            >
                                {t('admin')}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className={`text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {t('email')}
                                </label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className={`w-full p-3.5 border text-sm rounded-xl outline-none transition-all duration-300
                                        ${isDark 
                                            ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                            : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`}
                                    onChange={handleInput} 
                                    required 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className={`text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {t('password')}
                                </label>
                                <div className={`flex items-center rounded-xl border transition-all duration-300 px-4 
                                    ${isDark 
                                        ? 'bg-[#0f1322] border-slate-800 focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-cyan-500/10 text-white' 
                                        : 'bg-slate-50 border-slate-200 focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/10 text-slate-800'}`}
                                >
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        className="w-full py-3.5 outline-none bg-transparent text-sm"
                                        onChange={handleInput} 
                                        required 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={togglePassword} 
                                        className={`transition-colors cursor-pointer flex-shrink-0 
                                            ${isDark ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-emerald-500'}`}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>

                                <div className="text-end">
                                    <button 
                                        type="button" 
                                        onClick={handleForgot} 
                                        className={`text-xs font-semibold inline-block mt-1 cursor-pointer transition-colors
                                            ${isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-emerald-600 hover:text-emerald-500'}`}
                                    >
                                        {t('forgot_password')}  
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className={`self-center font-extrabold text-base py-4 rounded-xl transition-all duration-300 mt-4 shadow-md w-full cursor-pointer hover:scale-[1.01] active:scale-[0.99]
                                    ${isDark 
                                        ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/5' 
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/5'}`}
                            >
                                {t('log_in')}
                            </button>
                        </form>
                        
                        <p className={`mt-6 text-sm self-center text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t('new_user')}? <button onClick={() => navigate('/signup')} className={`font-bold hover:underline ml-1 cursor-pointer ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`}>{t('register')}</button>
                        </p>
                    </div>

                    {/* Right Column: Image Panel */}
                    <div className={`hidden md:flex bg-cover bg-center text-white p-12 flex-col justify-between h-full relative transition-all duration-500
                        ${isDark ? "bg-[url('/images/dark-blue-signup.jpg')]" : "bg-[url('/images/light-green-signup.jpg')]"}`}>
                        
                        {/* Overlay element to enhance modern readability */}
                        <div className={`absolute inset-0 z-0 opacity-40 mix-blend-multiply ${isDark ? 'bg-slate-950' : 'bg-emerald-950'}`}></div>

                        <div className="flex justify-between items-center text-3xl font-bold relative z-10">
                            <div className="flex items-center gap-2">
                                <Logo />
                            </div>
                        </div>

                        <div className="max-w-md pb-8 relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4 tracking-tight text-white">
                                {t('explore_ai_services')}
                            </h2>
                            <p className="text-slate-200/90 text-base font-medium leading-relaxed">
                                {t('scalable_solutions')}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;