import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/colors.css'

const Sidebar = () => {

  const linkClasses =
    "block px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:translate-x-1 hover:shadow-sm group";

  // (kept same) active still uses your palette
  const activeClasses =
    "bg-[var(--color-primary-light)] font-semibold text-[var(--color-card)] shadow-md transform translate-x-1";

  return (
    <div className="w-64 h-screen bg-[var(--color-card)] border-r border-[var(--color-border)] flex flex-col justify-between shadow-lg overflow-hidden lg:flex hidden">
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
          <span className="group-hover:font-medium transition-all duration-300">Government Schemes</span>
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
        <NavLink to="/settings" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)}>
          <span className="group-hover:font-medium transition-all duration-300">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;