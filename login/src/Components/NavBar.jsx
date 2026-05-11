import React from 'react'

import { logout } from '../Utils/auth'; // Import the logout function
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
function NavBar() {
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
    navigate('/');
  };
  return (
    <div className='navbar font-questrial max-w-screen-lg mx-auto p-4 flex justify-between items-center'>
        <div className='logo text-2xl font-bold text-emerald-400'>RealEstate.io</div> 
        <ul className='nav-links flex space-x-6 justify-end items-center'>
            
            <li>About</li>
            <li>Contact</li>
            <li><button onClick={handleLogin} className="logout-btn">Login</button></li>
            <li><button onClick={handleSignup} className="logout-btn">Signup</button></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>

        </ul>
    </div>
  )
}

export default NavBar