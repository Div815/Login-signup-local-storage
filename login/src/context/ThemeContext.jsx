import React, { createContext, useContext, useEffect, useState } from 'react';
import i18n from 'i18next'; // Import i18n

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  // New: Language state
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Theme Logic
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);

    // New: RTL/Language Logic
    const dir = (language === 'ar' || language === 'he') ? 'rtl' : 'ltr';
    root.dir = dir;
    root.lang = language;
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [theme, language]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const changeLanguage = (lng) => setLanguage(lng);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, changeLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);