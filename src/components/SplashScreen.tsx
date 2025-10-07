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
        {/* Logo com efeito de fogo */}
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
              textShadow: '0 0 20px rgba(239, 68, 68, 0.7)',
              background: 'linear-gradient(45deg, #ff6b6b, #ff0000, #ff8c00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 107, 107, 0.7)',
                '0 0 30px rgba(255, 0, 0, 0.9)',
                '0 0 40px rgba(255, 140, 0, 0.8)',
                '0 0 20px rgba(255, 107, 107, 0.7)'
              ],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ARC7HIVE
          </motion.h1>
          
          {/* Efeito de fogo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-orange-500 to-red-600 opacity-30 blur-md"
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Partículas de fogo */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                bottom: '-10px'
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-64 h-1 bg-gray-800 rounded-full mx-auto mt-12 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
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