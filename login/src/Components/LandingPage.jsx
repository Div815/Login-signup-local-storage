import React from "react";
import "./Home.css";
import { logout } from "../Utils/auth";
import NavBar from "./NavBar";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";

function LandingPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className={`min-h-screen font-sans relative overflow-hidden antialiased transition-colors duration-500
      ${isDark ? "bg-[#0b0f19]" : "bg-[#f8fafc]"}`}
    >
      {/* Dynamic Background Blur Accents */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-500
        ${isDark ? "bg-cyan-500/10" : "bg-emerald-500/10"}`}
      ></div>
      <div
        className={`absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] transition-all duration-500
        ${isDark ? "bg-blue-600/10" : "bg-teal-400/10"}`}
      ></div>

      <NavBar />

      {/* Main Glass Workspace Card */}
      <main className="relative z-10 flex items-center justify-center pt-24 px-4">
        <section
          className={`flex flex-col gap-6 max-w-3xl w-full p-8 md:p-12 rounded-3xl border transition-all duration-500
          ${
            isDark
              ? "bg-[#111726]/60 backdrop-blur-xl border-slate-800/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] text-slate-100"
              : "bg-white/80 backdrop-blur-xl border-slate-200 shadow-[0_8px_32px_0_rgba(15,23,42,0.04)] text-slate-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <Sparkles
              className={`transition-colors duration-300 ${
                isDark ? "text-cyan-400" : "text-emerald-500"
              }`}
              size={32}
            />
            <h1
              className={`text-3xl md:text-5xl font-black tracking-tight leading-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Welcome to{" "}
              <span className={isDark ? "text-cyan-400" : "text-emerald-600"}>
                RealEstate.io
              </span>
            </h1>
          </div>

          <p
            className={`text-base md:text-lg leading-relaxed font-medium transition-colors duration-300
            ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Your one-stop solution for all your real estate needs. Explore
            properties, connect with agents, and find your dream home today!
            <span
              className={`block mt-2 font-bold ${
                isDark ? "text-cyan-400/80" : "text-emerald-600/80"
              }`}
            >
              Elevating the way you find space.
            </span>
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleLogin}
              className={`px-8 py-3.5 font-extrabold text-sm rounded-xl transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99]
                ${
                  isDark
                    ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/10"
                    : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/10"
                }`}
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className={`px-8 py-3.5 font-bold text-sm rounded-xl transition-all duration-300 border cursor-pointer hover:scale-[1.01] active:scale-[0.99]
                ${
                  isDark
                    ? "bg-slate-800/40 border-slate-700/60 text-slate-200 hover:bg-slate-800/80 hover:border-slate-600"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                }`}
            >
              Sign Up
            </button>
            {/* Kept theme controls container safe without breaking template properties */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;