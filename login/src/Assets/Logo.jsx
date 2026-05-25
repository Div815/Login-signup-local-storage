import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Logo = ({ className = "w-12 h-12" }) => {
  const { theme } = useTheme();

  return (
    <div className="relative inline-flex items-center gap-3 select-none" dir="ltr">
      {/* The Icon */}
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Roof Silhouette */}
        <path 
          d="M20 55L50 25L80 55" 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}
        />
        {/* Digital 'IO' Pulse / Floor line */}
        <path 
          d="M25 70H40L45 60L55 80L60 70H75" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}
        />
        {/* The '.io' Dot / Chimney */}
        <circle cx="70" cy="35" r="5" className={`${theme === 'dark' ? 'text-white' : 'text-white'} animate-pulse`} />
      </svg>

      {/* The Typography */}
      <div className="flex flex-col leading-none">
        <span className={`${theme === 'dark' ? 'text-white' : 'text-white'} `}>
          RealEstate<span className={`${theme === 'dark' ? 'text-white' : 'text-white'}`}>.io</span>
        </span>
        <span className={`${theme === 'dark' ? 'text-white' : 'text-white'} text-[10px] `}>
          Digital Assets
        </span>
      </div>
    </div>
  );
};

export default Logo;