import React from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from './ThemeContext';
import '../styles/colors.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:translate-x-2 hover:shadow-lg group border border-transparent hover:border-[var(--color-primary)]/20 w-full text-left text-[var(--color-text)]"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      <span className="group-hover:font-medium transition-all duration-300">
        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </span>
    </button>
  );
};

const Sidebar = () => {

  const linkClasses =
    "block px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:translate-x-2 hover:shadow-lg group border border-transparent hover:border-[var(--color-primary)]/20 text-[var(--color-text)]";

  // (kept same) active still uses your palette
  const activeClasses =
    "bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white shadow-xl transform translate-x-2 border-blue-400/30";

  return (
    <div className="w-64 min-h-[calc(100vh-80px)] bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col justify-between shadow-2xl lg:flex hidden flex-shrink-0">
      {/* Top Menu */}
      <div className="p-6 space-y-3">
        <NavLink to="/" end className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Home</span>
        </NavLink>
        <NavLink to="/platforms" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Digital Platforms</span>
        </NavLink>
        <NavLink to="/events" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Events</span>
        </NavLink>
        <NavLink to="/videos" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Videos</span>
        </NavLink>
        <NavLink to="/schemes" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-small transition-all duration-300">Government Schemes</span>
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">History</span>
        </NavLink>
      </div>

      {/* Bottom Menu */}
      <div className="p-6 space-y-3 border-t border-[var(--color-border)] mb-6">
        <NavLink to="/needhelp" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Need Help?</span>
        </NavLink>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;