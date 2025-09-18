import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from './ThemeContext';
import '../styles/colors.css'

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

  const linkClasses = "block px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:translate-x-1 hover:shadow-sm text-[var(--color-text)]";
  const activeClasses = "bg-[var(--color-primary-light)] font-semibold text-[var(--color-card)] shadow-md transform translate-x-1";

  return (
    <>
      <nav className="bg-[var(--color-card)] border-b border-[var(--color-border)] px-6 py-4 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-[var(--color-hover-light)] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link to="/">
                <span className="text-xl font-bold text-white tracking-wide">
                  Digital Sathi
                </span>
              </Link>
            </div>
            <Link to="/blog" className="text-[var(--color-text)] font-medium hidden md:block hover:text-[var(--color-primary)] transition-colors">
              Blog
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
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 border border-[var(--color-border)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Section */}
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] px-4 py-2 rounded-md font-medium text-[var(--color-card)] transition-colors">
            Log in
          </button>
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
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 border border-[var(--color-border)] transition-all duration-200"
                />
              </div>
            </div>
            <div className="p-6 space-y-3">
              <NavLink to="/" end className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Home</span>
              </NavLink>
              <NavLink to="/platforms" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Digital Platforms</span>
              </NavLink>
              <NavLink to="/events" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Events</span>
              </NavLink>
              <NavLink to="/videos" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Videos</span>
              </NavLink>
              <NavLink to="/schemes" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Government Schemes</span>
              </NavLink>
              <NavLink to="/history" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>History</span>
              </NavLink>
              <NavLink to="/blog" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                <span>Blog</span>
              </NavLink>
              <div className="border-t border-[var(--color-border)] pt-4 mt-6">
                <NavLink to="/needhelp" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Need Help?</span>
                </NavLink>
                <MobileThemeToggle />
                <NavLink to="/settings" className={({ isActive }) => (isActive ? `${linkClasses} ${activeClasses}` : linkClasses)} onClick={() => setIsMobileMenuOpen(false)}>
                  <span>Settings</span>
                </NavLink>
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
