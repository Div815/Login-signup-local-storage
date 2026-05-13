import React from 'react';

const Logo = ({ className = "w-12 h-12" }) => {
  return (
    <div className="flex items-center gap-3 select-none">
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
          className="text-black"
        />
        {/* Digital 'IO' Pulse / Floor line */}
        <path 
          d="M25 70H40L45 60L55 80L60 70H75" 
          stroke="currentColor" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-black opacity-80"
        />
        {/* The '.io' Dot / Chimney */}
        <circle cx="70" cy="35" r="5" className="fill-black animate-pulse" />
      </svg>

      {/* The Typography */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-extrabold tracking-tighter text-black font-questrial">
          RealEstate<span className="text-black">.io</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-black font-medium">
          Digital Assets
        </span>
      </div>
    </div>
  );
};

export default Logo;