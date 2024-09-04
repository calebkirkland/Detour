import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-switch" onClick={toggleTheme}>
      <div className={`icon ${theme === 'light' ? 'active' : ''}`}>☀️</div>
      <div className={`icon ${theme === 'dark' ? 'active' : ''}`}>🌙</div>
    </div>
  );
};

export default ThemeSwitch;