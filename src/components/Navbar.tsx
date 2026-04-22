import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Home, User, FolderOpen, BookOpen, Mail } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Dock from "./Dock";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  const dockItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <User size={20} />, label: 'About', path: '/about' },
    { icon: <FolderOpen size={20} />, label: 'Projects', path: '/projects' },
    { icon: <BookOpen size={20} />, label: 'Blog', path: '/blog' },
    { icon: <Mail size={20} />, label: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-0.5 select-none">
            {/* Left bracket */}
            <span className="text-xl font-black font-mono text-dark-300 dark:text-dark-600 transition-colors duration-300 group-hover:text-primary-400">{'<'}</span>
            {/* Wordmark */}
            <span className="font-mono font-black text-xl tracking-tight">
              <span className="bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">$</span>
              <span className="text-dark-900 dark:text-white">.dev</span>
            </span>
            {/* Right bracket with slash */}
            <span className="text-xl font-black font-mono text-dark-300 dark:text-dark-600 transition-colors duration-300 group-hover:text-primary-400">{'/>'}</span>
          </Link>

          {/* Desktop Navigation - Dock */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <Dock 
              items={dockItems}
              panelHeight={56}
              baseItemSize={44}
              magnification={56}
              className="mx-4"
            />
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-[28px] w-[47px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isDark ? "bg-[#34C759]" : "bg-[#E9E9EA] dark:bg-dark-700"
              }`}
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle dark mode"
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`pointer-events-none relative inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)] ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                  isDark ? "translate-x-[20px]" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <Moon className="h-3.5 w-3.5 text-[#34C759]" />
                ) : (
                  <Sun className="h-3.5 w-3.5 text-gray-500" />
                )}
              </span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-dark-100 dark:bg-dark-800 hover:bg-dark-200 dark:hover:bg-dark-700 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Floating Card Menu */}
        <AnimatePresence>
          {isOpen && (
            <div className="md:hidden absolute top-16 right-4 w-56 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-dark-100/50 dark:border-dark-800/50 overflow-hidden"
              >
                <div className="p-2 space-y-1">
                  {dockItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                          location.pathname === item.path
                            ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20"
                            : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800"
                        }`}
                      >
                        <span className={`transition-colors duration-300 ${
                          location.pathname === item.path ? "text-white" : "text-dark-400 dark:text-dark-500 group-hover:text-primary-500"
                        }`}>
                          {item.icon}
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-[0.15em]">
                          {item.label}
                        </span>
                        
                        {location.pathname === item.path && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="ml-auto w-1 h-4 bg-white/40 rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Minimal Footer */}
                <div className="px-5 py-3 bg-dark-50/50 dark:bg-dark-800/50 border-t border-dark-100/30 dark:border-dark-700/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-dark-400 dark:text-dark-500 uppercase tracking-widest">Navigation</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-primary-500/30" />
                      <div className="w-1 h-1 rounded-full bg-primary-500/50" />
                      <div className="w-1 h-1 rounded-full bg-primary-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
