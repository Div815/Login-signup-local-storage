import React from 'react'
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.success("You have been logged out.");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    
    <div >
      <Toaster />
      <div className='bg-black text-white h-screen flex items-center justify-center font-questrial text-3xl'>
      Welcome to your Home Page!

      <button onClick={handleLogout} className='ml-6 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition shadow-lg shadow-emerald-500/20'>
        Logout 
      </button>
    </div>
      </div>
  )
}

export default Home