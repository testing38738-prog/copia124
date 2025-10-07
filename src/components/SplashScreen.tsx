import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 500);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 0.3
          }}
          className="relative mb-8"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-red-600"
            style={{ 
              fontFamily: 'Bebas Neue, sans-serif',
              textShadow: '0 0 20px rgba(239, 68, 68, 0.7)'
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(239, 68, 68, 0.7)',
                '0 0 30px rgba(239, 68, 68, 0.9)',
                '0 0 20px rgba(239, 68, 68, 0.7)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ARC7HIVE
          </motion.h1>
          
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-600"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: 1.5, 
              opacity: 0 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-600"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ 
              scale: 2, 
              opacity: 0 
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: 0.5
            }}
          />
        </motion.div>
        
        {/* TUDUM effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            className="text-red-600 font-bold text-2xl mb-4"
            animate={{
              scale: [1, 1.2, 1],
              textShadow: [
                '0 0 10px rgba(239, 68, 68, 0.5)',
                '0 0 20px rgba(239, 68, 68, 0.8)',
                '0 0 10px rgba(239, 68, 68, 0.5)'
              ]
            }}
            transition={{
              duration: 0.5,
              repeat: 3,
              repeatType: "reverse"
            }}
          >
            TUDUM
          </motion.div>
        </motion.div>
        
        {/* Loading bar */}
        <motion.div
          className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-12 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="h-full bg-red-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 2 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;