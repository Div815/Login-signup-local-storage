import React, { useState, useRef, useEffect } from 'react'; // Added useRef and useEffect
import { logout } from '../Utils/auth'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Imported i18next hook

function NavBar2() {
  const { theme, language, changeLanguage } = useTheme(); 
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // States for your dropdown components
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Language list with labels in their native text format
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
    { code: 'he', label: 'עברית' }
  ];

  const currentLabel = languages.find(l => l.code === language)?.label || 'English';

  // Automatically close language dropdown if clicking outside of its bounds
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsAboutOpen(false); 
  };

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  return (
    <nav className={`w-full font-questrial sticky top-0 z-50 transition-all duration-800 
      ${theme === 'dark' ? 'bg-slate-900 text-white border-b-2 border-cyan-900' : 'bg-white/90 text-black border-b-2 border-emerald-200'} 
      backdrop-blur-md`}>
      
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        <div className={`logo text-2xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-emerald-500'} cursor-pointer`} 
             onClick={() => navigate('/home')}>
          RealEstate.io
        </div> 

        {/* Replaced 'space-x-8' with a flexible gap model to align smoothly across LTR/RTL viewports */}
        <div className='flex items-center gap-8'>
          <ul className='nav-links flex items-center gap-8 font-medium'>
            
            {/* --- ABOUT DROPDOWN --- */}
            <li 
              className="relative" 
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="flex items-center gap-1 hover:underline cursor-pointer transition">
                Home
                <svg className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isAboutOpen && (
                <div className={`absolute left-0 rtl:right-0 rtl:left-auto mt-0 w-40 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50
                  ${theme === 'dark' ? 'bg-slate-800 border border-cyan-900' : 'bg-white border border-emerald-100'}`}>
                  <div className="py-2">
                    <button 
                      onClick={() => handleNavigation('/home1')}
                      className={`block w-full text-start px-4 py-2 text-sm transition
                        ${theme === 'dark' ? 'hover:bg-cyan-900/30 text-gray-200' : 'hover:bg-emerald-50 text-gray-700'}`}>
                      Home 1
                    </button>
                    <button 
                      onClick={() => handleNavigation('/home2')}
                      className={`block w-full text-start px-4 py-2 text-sm transition
                        ${theme === 'dark' ? 'hover:bg-cyan-900/30 text-gray-200' : 'hover:bg-emerald-50 text-gray-700'}`}>
                      Home 2
                    </button>
                  </div>
                </div>
              )}
            </li>

            <li className="hover:underline cursor-pointer transition">Contact</li>
            <li className="hover:underline cursor-pointer transition">Services</li>
            <li className="hover:underline cursor-pointer transition">About</li>
            <li className="hover:underline cursor-pointer transition">Blog</li>
            <li>
              <button onClick={handleLogout} className="text-red-400 hover:underline cursor-pointer transition text-sm">Logout</button>
            </li>
          </ul>
          
          {/* Controls Side Panel Wrapper */}
          <div className="border-inline-start border-gray-700 padding-inline-start-6 flex items-center gap-3" ref={langDropdownRef}>
            
            {/* --- LANGUAGE SWITCHER DROPDOWN --- */}
            <div className="relative inline-block text-start">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`w-28 px-3 py-1.5 text-xs rounded-xl border transition-all flex items-center justify-between cursor-pointer font-medium
                  ${theme === 'dark' 
                    ? 'text-cyan-400 border-cyan-900 bg-slate-800 hover:bg-slate-700' 
                    : 'text-emerald-600 border-emerald-200 bg-white hover:bg-emerald-50'
                  }`}
              >
                <span>{currentLabel}</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLangOpen && (
                <div 
                  className={`absolute mt-2 w-28 rounded-xl shadow-xl z-50 overflow-hidden border p-1 space-y-1 backdrop-blur-md left-0 rtl:right-0 rtl:left-auto
                    ${theme === 'dark' 
                      ? 'bg-slate-900/90 border-cyan-900 text-cyan-400' 
                      : 'bg-white/90 border-emerald-200 text-emerald-600'
                    }`}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`block w-full text-start px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer
                        ${language === lang.code 
                          ? (theme === 'dark' ? 'bg-cyan-950 border-cyan-500 font-bold' : 'bg-emerald-50 border-emerald-500 font-bold')
                          : (theme === 'dark' ? 'border-transparent hover:bg-cyan-900/40' : 'border-transparent hover:bg-emerald-50/60')
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ThemeToggle />
          </div>
        </div>
      
      </div>
    </nav>
  );
}

export default NavBar2;