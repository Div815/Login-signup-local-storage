import "./Home.css"
import { logout } from '../Utils/auth';
import NavBar from './NavBar'
import { Sparkles } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };
  const handleSignup = () => {
    navigate('/signup');
  };
  return (
    
    <div className="min-h-screen bg-black font-sans relative overflow-hidden">
      
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]"></div>

      <NavBar />
      
      {/* 3. The Glass Card */}
      <main className="relative z-10 flex items-center justify-center pt-20 px-4">
        <section className="
          flex flex-col gap-6 max-w-3xl w-full p-10
          /* Glassmorphism Core Classes */
          bg-white/5 backdrop-blur-xl 
          border border-white/10 
          shadow-[0_8px_32px_0_rgba(0,0,0,0.7)]
          rounded-3xl
          text-zinc-100
        ">
          <div className="flex items-center gap-3">
            <Sparkles className="text-emerald-400" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Welcome to <span className="text-emerald-400">RealEstate.io</span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-light">
            Your one-stop solution for all your real estate needs. Explore properties, 
            connect with agents, and find your dream home today! 
            <span className="block mt-4 text-emerald-500/80 font-medium">
              Elevating the way you find space.
            </span>
          </p>

          <div className="flex gap-4 mt-4">
            <button onClick={handleLogin} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition shadow-lg shadow-emerald-500/20">
              Login
            </button>
            <button onClick={handleSignup} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition">
              Sign Up
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage;