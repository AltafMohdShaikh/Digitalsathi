import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from './ThemeContext';
import '../styles/colors.css'
import lightLogo from '../assets/icons/Digital-logo(light).png';
import darkLogo from '../assets/icons/Digital-logo(Dark).png';

const MobileThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] text-[var(--color-text)] w-full text-left"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      <span className="font-medium">
        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </span>
    </button>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClasses = "block px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:translate-x-2 hover:shadow-lg group border border-transparent hover:border-[var(--color-primary)]/20 text-[var(--color-text)]";
  const activeClasses = "bg-gradient-to-r from-blue-400 to-blue-500 font-bold text-white shadow-xl transform translate-x-2 border-blue-400/30";

  return (
    <>
      <nav className="bg-[var(--color-card)] px-4 py-2 lg:px-6 lg:py-4 sticky top-0 z-50 border-b-2 border-[var(--color-primary)]">
        <div className="flex items-center justify-between">
          
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-[var(--color-hover-light)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} className="text-[var(--color-text)]" /> : <Menu size={20} className="text-[var(--color-text)]" />}
            </button>
            
            <Link to="/" className="transition-all duration-300 transform hover:scale-105">
              <img 
                src={theme === 'light' ? lightLogo : darkLogo}
                alt="Digital Sathi"
                className="h-8 lg:h-10 w-auto"
              />
            </Link>
            <Link to="/blog" className="relative text-[var(--color-text)] font-medium hidden md:block hover:text-[var(--color-primary)] transition-colors group">
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Center Search - Hidden on mobile */}
          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search tutorials, schemes, events..."
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 border border-[var(--color-border)] transition-all duration-200 text-[var(--color-text)]"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-[var(--color-hover-light)] transition-colors text-[var(--color-text)]" 
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="relative bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] px-4 py-2 rounded-md font-medium text-[var(--color-card)] transition-colors group overflow-hidden">
              <span className="relative">
                Login
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed left-0 top-0 h-full w-64 bg-[var(--color-card)] shadow-xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden">
            {/* Mobile Search */}
            <div className="p-6 mt-16 border-b border-[var(--color-border)]">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 border border-[var(--color-border)] transition-all duration-200 text-[var(--color-text)]"
                />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <NavLink to="/" end className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Home</span>
              </NavLink>
              <NavLink to="/platforms" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Digital Platforms</span>
              </NavLink>
              <NavLink to="/events" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Events</span>
              </NavLink>
              <NavLink to="/videos" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Videos</span>
              </NavLink>
              <NavLink to="/schemes" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Government Schemes</span>
              </NavLink>
              <NavLink to="/history" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">History</span>
              </NavLink>
              <NavLink to="/blog" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Blog</span>
              </NavLink>
              <NavLink to="/needhelp" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="group-hover:font-medium transition-all duration-300">Need Help?</span>
              </NavLink>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
