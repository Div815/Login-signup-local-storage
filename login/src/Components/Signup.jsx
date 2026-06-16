import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; 
import Logo from '../Assets/Logo';
import NavBars from './NavBars';
import { useTranslation } from 'react-i18next';

// Firebase Imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from '../firebaseConfig'; // Ensure your config exports auth and database

function Signup() {
    const { theme } = useTheme(); 
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
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

        const signupLoader = toast.loading("Creating your account...");

        try {
            // 1. Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // 2. Store additional user profile metrics into Firestore
            await setDoc(doc(database, "users", user.uid), {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                role: "user", 
                createdAt: new Date().toISOString()
            });

            toast.dismiss(signupLoader);
            toast.success("Registration successful! Please log in.");
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            toast.dismiss(signupLoader);
            console.error("Signup Error:", error);
            
            if (error.code === 'auth/email-already-in-use') {
                toast.error("This email is already registered.");
            } else {
                toast.error(error.message || "Registration failed.");
            }
        }
    };

    return (
        <div className={`h-screen w-full flex flex-col antialiased transition-colors duration-500 overflow-hidden relative
            ${isDark ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'}`}>
            <NavBars/>      
            <div className={`flex-1 flex w-screen items-center justify-center font-questrial overflow-hidden p-4 transition-colors duration-500 
                ${isDark ? 'bg-[#0b0f19]' : 'bg-[#f8fafc]'}`}>
               
                <Toaster position="top-center" /> 
                
                <div className={`signup-card w-full max-w-6xl rounded-2xl h-full max-h-[85vh] grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-hidden relative border
                    ${isDark ? 'bg-[#111726] border-slate-800/80 shadow-black/20' : 'bg-white border-slate-200'}`}>
                    
                    {/* --- Left Column: Side Panel --- */}
                    <div className={`signup-info bg-cover bg-center text-white p-8 md:p-12 relative flex flex-col justify-between h-full transition-all duration-500
                        ${isDark ? "bg-[url('/images/dark-blue-signup.jpg')]" : "bg-[url('/images/light-green-signup.jpg')]"}`}>
                        
                        {/* Smooth visual background mask */}
                        <div className={`absolute inset-0 z-0 opacity-40 mix-blend-multiply ${isDark ? 'bg-slate-950' : 'bg-emerald-950'}`}></div>

                        <div className="flex justify-between items-center text-2xl relative z-10">
                            <h2 className={`font-bold ${isDark ? 'text-cyan-400' : 'text-white'}`}><Logo /></h2>
                        </div>

                        <div className="flex flex-col justify-center relative z-10">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3 text-white">
                                {t('get_started')}<br />{t('with_us')}
                            </h1>
                            <p className={`text-sm max-w-xs font-medium leading-relaxed ${isDark ? 'text-slate-300' : 'text-emerald-50/90'}`}>
                                {t('steps_to_register')}
                            </p>
                        </div>

                        <div className="flex justify-start gap-3 mt-4 relative z-10">
                            {/* Step 1 */}
                            <div className={`w-28 h-28 rounded-xl p-4 flex flex-col justify-between shadow-lg border backdrop-blur-md transition-all
                                ${isDark ? 'bg-slate-900/60 border-slate-700/40 text-white' : 'bg-white/85 text-slate-800 border-slate-100'}`}>
                                <span className={`text-xs font-black ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`}>01</span>
                                <p className="text-xs font-bold leading-tight tracking-tight">{t('signup_account')}</p>
                            </div>
                            {/* Step 2 */}
                            <div className={`w-28 h-28 rounded-xl p-4 flex flex-col justify-between border backdrop-blur-md opacity-60 transition-all
                                ${isDark ? 'bg-slate-900/30 border-slate-800/40 text-slate-400' : 'bg-emerald-800/40 text-emerald-50 border-emerald-700/20'}`}>
                                <span className="text-xs font-bold opacity-60">02</span>
                                <span className="text-xs font-medium leading-tight tracking-tight">{t('step_2')}</span>
                            </div>
                            {/* Step 3 */}
                            <div className={`w-28 h-28 rounded-xl p-4 flex flex-col justify-between border backdrop-blur-md opacity-60 transition-all
                                ${isDark ? 'bg-slate-900/30 border-slate-800/40 text-slate-400' : 'bg-emerald-800/40 text-emerald-50 border-emerald-700/20'}`}>
                                <span className="text-xs font-bold opacity-60">03</span>
                                <span className="text-xs font-medium leading-tight tracking-tight">{t('step_3')}</span>
                            </div>
                        </div>
                    </div>

                    {/* --- Right Column: Form --- */}
                    <div className={`signup-form p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto transition-colors duration-500 
                        ${isDark ? 'bg-[#111726] text-slate-100' : 'bg-white text-slate-800'}`}>
                        <h2 className={`text-2xl md:text-3xl font-black tracking-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('signup_account')}</h2>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={`block mb-1 text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('first_name')}</label>
                                    <input 
                                        className={`w-full p-3.5 border text-sm rounded-xl outline-none transition-all duration-300
                                            ${isDark 
                                                ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`} 
                                        type="text" name="firstName" placeholder="eg John" value={formData.firstName} onChange={handleInput} required 
                                    />
                                </div>
                                <div>
                                    <label className={`block mb-1 text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('last_name')}</label>
                                    <input 
                                        className={`w-full p-3.5 border text-sm rounded-xl outline-none transition-all duration-300
                                            ${isDark 
                                                ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`} 
                                        type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInput} required 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={`block mb-1 text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('email')}</label>
                                <input 
                                    className={`w-full p-3.5 border text-sm rounded-xl outline-none transition-all duration-300
                                        ${isDark 
                                            ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                            : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`} 
                                    type="email" name="email" placeholder="johndoe@example.com" value={formData.email} onChange={handleInput} required 
                                />
                            </div>

                            <div>
                                <label className={`block mb-1 text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('create_password')}</label>
                                <div className="relative">
                                    <input 
                                        className={`w-full p-3.5 pr-12 border text-sm rounded-xl outline-none transition-all duration-300
                                            ${isDark 
                                                ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`} 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleInput} 
                                        required 
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer
                                            ${isDark ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-emerald-500'}`}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className={`block mb-1 text-xs font-bold tracking-tight uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t('confirm_password')}</label>
                                <div className="relative">
                                    <input 
                                        className={`w-full p-3.5 pr-12 border text-sm rounded-xl outline-none transition-all duration-300
                                            ${isDark 
                                                ? 'bg-[#0f1322] border-slate-800 text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/10' 
                                                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10'}`} 
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
                                className={`font-extrabold text-base py-4 rounded-xl transition-all duration-300 shadow-md mt-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99]
                                    ${isDark 
                                        ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/5' 
                                        : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/5'}`}
                            >
                                {t('signup')}
                            </button>
                        </form>
                        
                        <p className={`text-center text-sm mt-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {t('already_have_account')} <button onClick={() => navigate('/login')} className={`font-bold hover:underline ml-1 cursor-pointer ${isDark ? 'text-cyan-400' : 'text-emerald-600'}`}>{t('log_in')}</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;