import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Utils/auth';
import { Eye, EyeOff } from 'lucide-react';
import '../index.css';
import { useTheme } from '../context/ThemeContext';
import Logo from '../Assets/Logo';
import NavBars from './NavBars';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const { theme } = useTheme();
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [role, setRole] = useState("user");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const handleForgot = () => {
        navigate('/forgot-password');
    }

    return (
        <div className="h-screen w-full flex flex-col bg-primary transition-colors duration-500 overflow-hidden relative">
            <Toaster />
            <NavBars />

            {/* Main Content Area */}
            <div className={`flex-1 w-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-primary text-black'} transition-colors duration-500 flex items-center justify-center py-10 px-4 relative z-10`}>
                
                {/* Login Glass Block Card */}
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-hidden rounded-2xl max-h-[80vh] items-stretch">
                    
                    {/* --- Left Column: Login Form --- */}
                    <div className={`p-8 md:p-16 flex flex-col justify-center overflow-y-auto transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-black'}`}>
                        <div className="mb-10">
                            <h1 className="text-4xl font-extrabold mb-2">{t('welcome_back')}</h1>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{t('log_in_to_access_services')}</p>
                        </div>

                        {/* Role Toggle */}
                        <div className="flex gap-4 mb-8">
                            <button 
                                type="button" 
                                className={`px-6 py-2 rounded-full transition cursor-pointer ${role === 'user' ? (theme === 'dark' ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold') : 'border border-gray-600 text-gray-400'}`}
                                onClick={() => setRole('user')}
                            >{t('user')}</button>
                            <button 
                                type="button" 
                                className={`px-6 py-2 rounded-full transition cursor-pointer ${role === 'admin' ? (theme === 'dark' ? 'bg-white text-black font-bold' : 'bg-black text-white font-bold') : 'border border-gray-600 text-gray-400'}`}
                                onClick={() => setRole('admin')}
                            >{t('admin')}</button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>{t('email')}</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    className={`p-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition ${theme === 'dark' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-gray-100 text-black'}`}
                                    onChange={handleInput} 
                                    required 
                                />
                            </div>

                            {/* UPDATED PASSWORD CONTAINER BLOCK */}
                            <div className="flex flex-col gap-2">
                                <label className={theme === 'dark' ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>{t('password')}</label>
                                
                                {/* The container wrapper now handles the visual field background, rounded corners, and focus ring states */}
                                <div className={`flex items-center rounded-xl focus-within:ring-2 focus-within:ring-emerald-500 transition px-4
                                    ${theme === 'dark' ? 'bg-slate-800 border border-slate-700 text-white' : 'bg-gray-100 text-black'}`}
                                >
                                    {/* The input element is made transparent and borderless to blend fully */}
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        className="w-full py-4 outline-none bg-transparent"
                                        onChange={handleInput} 
                                        required 
                                    />
                                    
                                    {/* The toggle button sits natively inside the row, making cross-boundary leakage layout-wise impossible */}
                                    <button 
                                        type="button" 
                                        onClick={togglePassword} 
                                        className="text-gray-400 hover:text-emerald-600 transition-colors cursor-pointer flex-shrink-0"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                <div className="text-end">
                                    <button type="button" onClick={handleForgot} className={`text-sm inline-block mt-1 cursor-pointer ${theme === 'dark' ? 'text-cyan-400 hover:text-cyan-300' : 'text-emerald-500 hover:text-emerald-400'} transition-colors`}>
                                        {t('forgot_password')}  
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className={`self-center font-questrial font-extrabold text-xl py-4 rounded-2xl transition mt-4 shadow-lg w-full cursor-pointer ${theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                                {t('log_in')}
                            </button>
                        </form>
                        
                        <p className={`mt-4 self-center text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {t('new_user')}? <a href="/signup" className={`font-bold hover:underline ml-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t('register')}</a>
                        </p>
                    </div>

                    {/* --- Right Column: Image Panel --- */}
                    <div className={`hidden md:flex ${theme === 'dark' ? "bg-[url('/images/dark-blue-signup.jpg')]" : "bg-[url('/images/light-green-signup.jpg')]"} bg-cover bg-center text-white p-12 flex-col justify-between h-full relative transition-all duration-500`}>
                        <div className="flex justify-between items-center text-3xl font-bold">
                            <div className="flex items-center gap-2">
                                <Logo />
                            </div>
                        </div>

                        <div className="max-w-md pb-8">
                            <h2 className="text-4xl font-extrabold leading-tight mb-4">
                                {t('explore_ai_services')}
                            </h2>
                            <p className="text-gray-200 text-lg font-medium leading-relaxed">
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