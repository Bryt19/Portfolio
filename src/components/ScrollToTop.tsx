import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
        setIsScrolling(true);

        // Clear existing timeout
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }

        // Set new timeout to hide button after 3 seconds of inactivity
        const timeout = setTimeout(() => {
          setIsScrolling(false);
        }, 3000);

        setHideTimeout(timeout);
      } else {
        setIsVisible(false);
        setIsScrolling(false);
        if (hideTimeout) {
          clearTimeout(hideTimeout);
        }
      }
    };

    const handleScroll = () => {
      toggleVisibility();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: isScrolling ? 1 : 0.7, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="flex flex-col gap-3">
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-200 group"
              title="Scroll to Top"
            >
              <ChevronUp className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform duration-200" />
            </motion.button>

            {/* Scroll to Bottom Button */}
            <motion.button
              onClick={scrollToBottom}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-dark-600 hover:bg-dark-700 dark:bg-dark-700 dark:hover:bg-dark-600 text-white rounded-full shadow-lg transition-all duration-200 group"
              title="Scroll to Bottom"
            >
              <ChevronDown className="w-6 h-6 group-hover:translate-y-[2px] transition-transform duration-200" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
