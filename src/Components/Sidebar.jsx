import React from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, Shield } from "lucide-react";
import { useTheme } from './ThemeContext';
import { useUserRole } from '../hooks/useUserRole';
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
  const { isAdmin } = useUserRole();

  const linkClasses =
    "block px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:translate-x-2 hover:shadow-lg group border border-transparent hover:border-[var(--color-primary)]/20 text-[var(--color-text)]";

  // (kept same) active still uses your palette
  const activeClasses =
    "bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white shadow-xl transform translate-x-2 border-blue-400/30";

  const adminClasses =
    "bg-gradient-to-r from-yellow-400 to-yellow-500 font-bold text-white shadow-xl transform translate-x-2 border-yellow-400/30";

  return (
    <div className="fixed left-0 top-[64px] w-64 h-[calc(100vh-64px)] bg-[var(--color-card)] shadow-2xl lg:flex hidden flex-shrink-0 z-40">
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
        <NavLink to="/needhelp" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Need Help?</span>
        </NavLink>
        
        {isAdmin && (
          <NavLink to="/master" className={({ isActive }) => (isActive ? `${linkClasses} ${adminClasses}` : `${linkClasses} border-yellow-400/20 hover:border-yellow-400/40`)}>
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-yellow-500" />
              <span className="group-hover:font-medium transition-all duration-300">Master</span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;