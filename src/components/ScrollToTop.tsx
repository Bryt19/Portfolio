import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const { scrollYProgress, scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsAtTop(latest < 100);
    });
  }, [scrollY]);

  const handleScroll = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: shouldReduceMotion ? "auto" : "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={handleScroll}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center p-2 text-dark-900 bg-white dark:bg-dark-800 dark:text-white rounded-full shadow-xl border border-dark-100 dark:border-dark-700 transition-colors duration-200 group focus:outline-none focus:ring-4 focus:ring-primary-500/50 hover:border-primary-500/50"
        title={isAtTop ? "Scroll to bottom" : "Scroll to top"}
      >
        {/* Progress Ring */}
        {!shouldReduceMotion && (
          <svg
            className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none"
            viewBox="0 0 100 100"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              strokeWidth="4"
              className="stroke-primary-500"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
        )}

        {isAtTop ? (
          <ChevronDown className="w-5 h-5 group-hover:translate-y-[2px] transition-transform duration-200 relative z-10" />
        ) : (
          <ChevronUp className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform duration-200 relative z-10" />
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default ScrollToTop;