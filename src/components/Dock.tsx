import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick?: () => void;
}

interface DockProps {
  items: DockItem[];
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  className?: string;
}

const Dock: React.FC<DockProps> = ({
  items,
  panelHeight = 68,
  baseItemSize = 50,
  magnification = 70,
  className = '',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: DockItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div
      className={`relative flex items-end justify-center ${className}`}
      style={{ height: panelHeight }}
    >
      {/* Dock Background */}
      <motion.div
        className="absolute inset-0 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-dark-700/50 shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Dock Items */}
      <div 
        ref={dockRef}
        className="relative flex items-end justify-center space-x-0.5 px-2 py-2"
      >
        {items.map((item, index) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredIndex === index;
          
          // Use magnification if hovered
          const currentSize = isHovered ? magnification : baseItemSize;
          
          return (
            <motion.div
              key={index}
              className="relative flex flex-col items-center cursor-pointer"
              animate={{ width: currentSize, height: currentSize }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileTap={{ scale: 0.95 }}
            >
              {/* Tooltip Label */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute -top-10 px-2 py-1 text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap rounded-md bg-dark-900/90 dark:bg-dark-700/90 text-white shadow-lg pointer-events-none z-50 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Item Background */}
              <div
                className="absolute inset-0 rounded-xl transition-colors duration-300"
                style={{
                  backgroundColor: isActive 
                    ? 'rgba(59, 130, 246, 0.15)' 
                    : isHovered
                      ? 'rgba(156, 163, 175, 0.1)'
                      : 'transparent'
                }}
              />

              {/* Icon Container */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-dark-600 dark:text-dark-300'
                }`}>
                  {item.icon}
                </div>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
