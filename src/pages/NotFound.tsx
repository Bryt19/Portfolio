import React from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import Button from "../components/Button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-[12rem] md:text-[18rem] font-black text-dark-900 dark:text-white leading-none tracking-tighter mb-4"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            404
          </motion.h1>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-dark-900 dark:text-white tracking-tighter uppercase">
            Page Not Found
          </h2>
          <p className="text-xl text-dark-600 dark:text-dark-400 font-light mb-12 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="primary" size="lg" href="/" className="rounded-full px-10 py-5">
              <Home className="mr-2 w-5 h-5" />
              Go Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="rounded-full px-10 py-5"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

