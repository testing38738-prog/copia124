import React, { useState } from 'react';
import { categories } from '@/data/videos';
import CategorySection from '@/components/CategorySection';
import VideoPlayer from '@/components/VideoPlayer';
import UserProfile from '@/components/UserProfile';
import ProgressStats from '@/components/ProgressStats';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState<{id: string, title: string} | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<string, boolean[]>>(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    
    const initialProgress: Record<string, boolean[]> = {};
    categories.forEach(category => {
      initialProgress[category.id] = new Array(category.videos.length).fill(false);
    });
    return initialProgress;
  });

  const handleVideoSelect = (videoId: string, categoryTitle: string) => {
    const category = categories.find(cat => cat.title === categoryTitle);
    if (category) {
      const video = category.videos.find(v => v.id === videoId);
      if (video) {
        setSelectedVideo({ id: videoId, title: video.title });
      }
    }
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleVideoComplete = (videoId: string, categoryId: string) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      const categoryIndex = categories.findIndex(cat => cat.id === categoryId);
      if (categoryIndex !== -1) {
        const videoIndex = categories[categoryIndex].videos.findIndex(v => v.id === videoId);
        if (videoIndex !== -1) {
          newProgress[categoryId][videoIndex] = true;
        }
      }
      
      localStorage.setItem('userProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const calculateCategoryProgress = (categoryId: string) => {
    const progressArray = userProgress[categoryId] || [];
    if (progressArray.length === 0) return 0;
    const completed = progressArray.filter(Boolean).length;
    return Math.round((completed / progressArray.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ARC7HIVE
          </motion.h1>
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowStats(true)}
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Estatísticas
            </motion.button>
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1677442135722-5f11e06a4e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" 
          }}
        />
        <motion.div 
          className="relative z-20 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Bem-vindo ao ARC7HIVE
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Sua jornada de aprendizado em IA, Marketing Digital e Mercado Financeiro
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <CategorySection
              title={category.title}
              videos={category.videos.map((video, idx) => ({
                ...video,
                completed: userProgress[category.id]?.[idx] || false
              }))}
              onVideoSelect={(videoId) => handleVideoSelect(videoId, category.title)}
              progress={calculateCategoryProgress(category.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={handleClosePlayer}
          onNextVideo={() => {
            const category = categories.find(cat => 
              cat.videos.some(v => v.id === selectedVideo.id)
            );
            if (category) {
              const videoIndex = category.videos.findIndex(v => v.id === selectedVideo.id);
              if (videoIndex !== -1) {
                handleVideoComplete(selectedVideo.id, category.id);
              }
            }
            handleClosePlayer();
          }}
        />
      )}

      {/* Progress Stats Modal */}
      <ProgressStats 
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />
    </div>
  );
};

export default Dashboard;