import React, { useState } from 'react'; // Added useState
import { logout } from '../Utils/auth'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';


function NavBar2() {
   
  const navigate = useNavigate();
  const { theme, language, changeLanguage } = useTheme();

  

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close dropdown after clicking
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

        <div className='flex items-center space-x-8'>
          <ul className='nav-links flex space-x-8 items-center font-medium'>
            
            {/* --- DROPDOWN START --- */}
            <li 
              className="relative" 
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:underline cursor-pointer transition">
                Home
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className={`absolute left-0 mt-0 w-40 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-50
                  ${theme === 'dark' ? 'bg-slate-800 border border-cyan-900' : 'bg-white border border-emerald-100'}`}>
                  <div className="py-2">
                    <button 
                      onClick={() => handleNavigation('/home1')}
                      className={`block w-full text-left px-4 py-2 text-sm transition
                        ${theme === 'dark' ? 'hover:bg-cyan-900/30 text-gray-200' : 'hover:bg-emerald-50 text-gray-700'}`}>
                      Home 1
                    </button>
                    <button 
                      onClick={() => handleNavigation('/home2')}
                      className={`block w-full text-left px-4 py-2 text-sm transition
                        ${theme === 'dark' ? 'hover:bg-cyan-900/30 text-gray-200' : 'hover:bg-emerald-50 text-gray-700'}`}>
                      Home 2
                    </button>
                  </div>
                </div>
              )}
            </li>
            {/* --- DROPDOWN END --- */}

            <li className="hover:underline cursor-pointer transition">Contact</li>
            <li>
              <button onClick={handleLogin} className="hover:underline cursor-pointer transition">Login</button>
            </li>
            <li>
              <button onClick={handleSignup} className="px-5 py-2 rounded-lg hover:underline cursor-pointer transition">
                Signup
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="text-red-400 hover:underline cursor-pointer transition text-sm">Logout</button>
            </li>
          </ul>
          
         <div className="border-inline-start border-gray-700 padding-inline-start-6 flex gap-2">
  <select 
    value={language} 
    onChange={(e) => changeLanguage(e.target.value)}
    className={`${theme === 'dark' ? 'text-cyan-400 border-2' : 'text-emerald-500 border-2' }  rounded px-2 text-sm`}
  >
    <option className={`${theme === 'dark' ? 'bg-slate-800 text-cyan-400' : 'bg-white text-emerald-500' }`} value="en">English</option>
    <option className={`${theme === 'dark' ? 'bg-slate-800 text-cyan-400' : 'bg-white text-emerald-500' }`} value="ar">العربية (Arabic)</option>
    <option className={`${theme === 'dark' ? 'bg-slate-800 text-cyan-400' : 'bg-white text-emerald-500' }`} value="he">עברית (Hebrew)</option>
  </select>
  <ThemeToggle />
  </div>
        </div>
      
      </div>
    </nav>
  )
}

export default NavBar