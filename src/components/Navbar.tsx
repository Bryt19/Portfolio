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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

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

        {/* Mobile Navigation - Staggered Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden bg-white dark:bg-dark-800 rounded-xl mt-2 shadow-2xl border border-dark-100 dark:border-dark-700 overflow-hidden backdrop-blur-xl"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="px-3 py-3 space-y-1"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ 
                      opacity: 0, 
                      x: -20, 
                      scale: 0.9 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      scale: 1 
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: -20, 
                      scale: 0.9 
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: "easeOut" 
                    }}
                    whileHover={{ 
                      x: 5, 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-xs font-black tracking-widest uppercase transition-all duration-300 group ${
                        location.pathname === item.path
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-sm"
                          : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 hover:shadow-sm"
                      }`}
                    >
                      <motion.span
                        className="flex items-center justify-between"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>{item.name}</span>
                        <motion.div
                          className={`w-2 h-2 rounded-full ${
                            location.pathname === item.path
                              ? "bg-primary-600 dark:bg-primary-400"
                              : "bg-transparent group-hover:bg-dark-400 dark:group-hover:bg-dark-500"
                          }`}
                          animate={{
                            scale: location.pathname === item.path ? [1, 1.2, 1] : 0,
                            opacity: location.pathname === item.path ? 1 : 0
                          }}
                          transition={{ 
                            duration: 0.3, 
                            repeat: location.pathname === item.path ? Infinity : 0,
                            repeatDelay: 2
                          }}
                        />
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Menu Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 + 0.2, duration: 0.3 }}
                  className="pt-3 mt-3 border-t border-dark-100 dark:border-dark-700"
                >
                  <div className="text-xs text-dark-500 dark:text-dark-400 text-center">
                    Navigation Menu
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
