import React from 'react'
import { logout } from '../Utils/auth'; 
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

function NavBar2() {
  const { theme } = useTheme(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate('/login'); 
    }, 1500);
  };

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/signup');

  return (
    /* 1. Outer Wrapper: Stretches edge-to-edge (w-full) and handles the background/border */
    <nav className={`w-full font-questrial sticky top-0 z-50 transition-all duration-800 
      ${theme === 'dark' ? 'bg-slate-900 text-white border-b-2 border-cyan-900' : 'bg-white/90 text-black border-b-2 border-emerald-200'} 
      backdrop-blur-md`}>
      
      {/* 2. Inner Container: Centers the content and provides horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className={`logo text-2xl font-bold ${theme === 'dark' ? 'text-cyan-400' : 'text-emerald-500'} cursor-pointer`} 
             onClick={() => navigate('/home')}>
          RealEstate.io
        </div> 

        {/* Links and Toggle Section */}
        <div className='flex items-center space-x-8'>
          <ul className='nav-links flex space-x-8 items-center font-medium'>
            <li className="hover:underline cursor-pointer transition">About</li>
            <li className="hover:underline cursor-pointer transition">Contact</li>
            <li>
              <button onClick={handleLogin} className="hover:underline cursor-pointer transition">Login</button>
            </li>
            <li>
              <button onClick={handleSignup} 
                className={`px-5 py-2 rounded-lg  hover:underline cursor-pointer transition
                `}>
                Signup
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="text-red-400 hover:underline cursor-pointer transition text-sm">Logout</button>
            </li>
          </ul>
          
          <div className="border-l border-gray-700 pl-6">
            <ThemeToggle />
          </div>
        </div>
      
      </div>
    </nav>
  )
}

export default NavBar2 