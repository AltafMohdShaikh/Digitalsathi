import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Sun, Moon, Search, Mail, Lock } from "lucide-react";
import { useTheme } from './ThemeContext';
import '../styles/colors.css'
import lightLogo from '../assets/icons/Digital-logo(light).png';
import darkLogo from '../assets/icons/Digital-Logo(Dark).png';

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
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
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
            <button 
              onClick={() => setIsLoginModalOpen(true)}
              className="relative bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] px-4 py-2 rounded-md font-medium text-[var(--color-card)] transition-colors group overflow-hidden"
            >
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
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

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--color-card)] rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">{isSignupMode ? "Create Account" : "Welcome Back"}</h2>
              <button 
                onClick={() => setIsLoginModalOpen(false)}
                className="p-2 hover:bg-[var(--color-hover-light)] rounded-lg transition-colors"
              >
                <X size={20} className="text-[var(--color-text)]" />
              </button>
            </div>

            <form className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 border border-[var(--color-border)] transition-all duration-200 text-[var(--color-text)]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-30 border border-[var(--color-border)] transition-all duration-200 text-[var(--color-text)]"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {isSignupMode ? "Create Account" : "Sign In"}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-card)] text-[var(--color-text-secondary)]">Or continue with</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold border border-gray-300 transition-all duration-300 transform hover:scale-105">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
              {isSignupMode ? "Already have an account?" : "Don't have an account?"} 
              <span 
                onClick={() => setIsSignupMode(!isSignupMode)}
                className="text-[var(--color-primary)] cursor-pointer hover:underline ml-1"
              >
                {isSignupMode ? "Sign in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
