import React from 'react'

import { logout } from '../Utils/auth'; // Import the logout function
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';

function NavBar() {
  const { theme } = useTheme(); // Get the current theme
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate('/login'); // Redirect to login page after logout
    }, 1500);
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };
  return (
    <div className={`navbar font-questrial ${theme === 'dark' ? 'bg-primary-dark text-white' : 'bg-primary text-black'}  mx-auto p-4 flex justify-between items-center`}>
        <div className='logo text-2xl font-bold text-emerald-400'>RealEstate.io</div> 
        <div className='flex space-x-50 justify-end items-end'>
        <ul className='nav-links flex space-x-6 justify-end items-center'>
            
            <li>About</li>
            <li>Contact</li>
            <li><button onClick={handleLogin} className="logout-btn">Login</button></li>
            <li><button onClick={handleSignup} className="logout-btn">Signup</button></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>

        </ul>
        <ThemeToggle />
        </div>
    </div>
  )
}

export default NavBar