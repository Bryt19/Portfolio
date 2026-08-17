import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Near the bottom -> show the "up" button; near the top -> show the "down"
      // button. Never show both at the same time.
      const atBottom = maxScroll - scrollY < 100;
      const atTop = scrollY < 100;

      setShowUp(atBottom && !atTop);
      setShowDown(atTop && !atBottom);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>
        {showUp && (
          <motion.button
            key="up"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-200 group"
            title="Scroll to Top"
          >
            <ChevronUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDown && (
          <motion.button
            key="down"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToBottom}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-3 bg-dark-600 hover:bg-dark-700 dark:bg-dark-700 dark:hover:bg-dark-600 text-white rounded-full shadow-lg transition-all duration-200 group"
            title="Scroll to Bottom"
          >
            <ChevronDown className="w-6 h-6 group-hover:translate-y-[2px] transition-transform duration-200" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
