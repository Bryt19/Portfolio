import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  // Raw scroll position as a motion value
  const scrollY = useMotionValue(0);

  // Smooth it so rapid scroll doesn't look jumpy
  const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 24, restDelta: 0.001 });

  // Interpolated values — 0px = fully blended, 120px = fully solid
  //   bg opacity:  0.05 → 0.88
  //   blur:        4px  → 20px
  //   border:      0.08 → 0.7
  //   shadow:      0    → 1
  const bgOpacity   = useTransform(smoothScrollY, [0, 120], [0.05, 0.88]);
  const blurAmount  = useTransform(smoothScrollY, [0, 120], [4, 20]);
  const borderOp    = useTransform(smoothScrollY, [0, 120], [0.08, 0.7]);
  const shadowOp    = useTransform(smoothScrollY, [0, 120], [0, 0.14]);

  // Compose CSS strings from the motion values
  const bgLight  = useTransform(bgOpacity,  (v) => `rgba(255,255,255,${v})`);
  const bgDark   = useTransform(bgOpacity,  (v) => `rgba(10,10,18,${v})`);
  const blur     = useTransform(blurAmount, (v) => `blur(${v}px)`);
  const border   = useTransform(borderOp,   (v) =>
    isDark
      ? `1px solid rgba(255,255,255,${v * 0.25})`
      : `1px solid rgba(0,0,0,${v * 0.12})`
  );
  const shadow   = useTransform(shadowOp,   (v) =>
    `0 8px 40px rgba(0,0,0,${v}), 0 2px 8px rgba(0,0,0,${v * 0.5})`
  );

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Sync real window scroll into the motion value
  useEffect(() => {
    const update = () => scrollY.set(window.scrollY);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [scrollY]);

  const navItems = [
    { label: "Home",     path: "/" },
    { label: "About",    path: "/about" },
    { label: "Projects", path: "/projects" },
    { label: "Blog",     path: "/blog" },
    { label: "Contact",  path: "/contact" },
  ];

  const logo = (
    <Link to="/" className="group flex items-center gap-0.5 select-none shrink-0">
      <span className="text-xl font-black font-mono text-dark-300 dark:text-dark-600 transition-colors duration-300 group-hover:text-primary-400">{"<"}</span>
      <span className="font-mono font-black text-xl tracking-tight">
        <span className="bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent">$</span>
        <span className="text-dark-900 dark:text-white">.dev</span>
      </span>
      <span className="text-xl font-black font-mono text-dark-300 dark:text-dark-600 transition-colors duration-300 group-hover:text-primary-400">{"/"+">"}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5 pointer-events-none">
      <div className="relative w-full max-w-3xl pointer-events-auto">

        {/* ── Capsule ── */}
        <motion.div
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 26, delay: 0.08 }}
          style={{
            background: isDark ? bgDark : bgLight,
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
            border,
            boxShadow: shadow,
          }}
          className="flex items-center justify-between gap-4 pl-5 pr-2.5 h-14 rounded-full"
        >
          {logo}

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`px-3.5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-dark-900 text-white dark:bg-white dark:text-dark-900 shadow-sm"
                    : "text-dark-500 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-900/5 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-dark-100/70 dark:bg-dark-800/70 hover:bg-dark-200/90 dark:hover:bg-dark-700/90 hover:scale-105 active:scale-95 transition-all duration-200"
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-dark-100/70 dark:bg-dark-800/70 hover:bg-dark-200/90 dark:hover:bg-dark-700/90 transition-all duration-200"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: 90,    opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: -90,   opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1,    y: 0,  filter: "blur(0px)" }}
              exit={{ opacity: 0,   scale: 0.95, y: -8,  filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 bg-white/95 dark:bg-dark-900/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-dark-100/60 dark:border-dark-800/60 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 + 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                        location.pathname === item.path
                          ? "bg-dark-900 text-white dark:bg-white dark:text-dark-900 shadow-sm"
                          : "text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800"
                      }`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="w-1 h-4 bg-white/40 dark:bg-dark-900/40 rounded-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer strip */}
              <div className="px-5 py-3 bg-dark-50/60 dark:bg-dark-800/60 border-t border-dark-100/30 dark:border-dark-700/30">
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
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
