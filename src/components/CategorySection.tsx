import React from 'react';
import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  completed: boolean;
}

interface CategorySectionProps {
  title: string;
  videos: Video[];
  onVideoSelect: (videoId: string) => void;
  progress: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  videos, 
  onVideoSelect,
  progress
}) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center">
          <span className="text-red-500 font-medium mr-2">{progress}%</span>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
            duration={video.duration}
            views={video.views}
            completed={video.completed}
            onClick={() => onVideoSelect(video.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;