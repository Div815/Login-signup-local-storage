import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className={`p-2 rounded-full ${theme === 'dark' ? 'bg-cyan-500 text-cyan-800' : 'bg-emerald-500 text-emerald-800'} transition-all duration-300 shadow-md hover:scale-110`}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;