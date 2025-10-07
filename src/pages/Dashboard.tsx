import React, { useState } from 'react';
import { categories } from '@/data/videos';
import CategorySection from '@/components/CategorySection';
import VideoPlayer from '@/components/VideoPlayer';
import { Video } from '@/data/videos';

const Dashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState<{id: string, title: string} | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, boolean[]>>(() => {
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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1677442135722-5f11e06a4e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')" 
          }}
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
            ARC7HIVE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Plataforma de aprendizado em IA, Marketing Digital e Mercado Financeiro
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            title={category.title}
            videos={category.videos.map((video, index) => ({
              ...video,
              completed: userProgress[category.id]?.[index] || false
            }))}
            onVideoSelect={(videoId) => handleVideoSelect(videoId, category.title)}
            progress={calculateCategoryProgress(category.id)}
          />
        ))}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          videoId={selectedVideo.id}
          title={selectedVideo.title}
          onClose={handleClosePlayer}
          onNextVideo={() => {
            // Mark current video as completed
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
    </div>
  );
};

export default Dashboard;