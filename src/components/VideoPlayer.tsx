import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  onClose: () => void;
  onNextVideo?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoId, 
  title, 
  onClose,
  onNextVideo
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onNextVideo) {
            onNextVideo();
          }
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onNextVideo]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900">
        <h2 className="text-white text-xl font-bold truncate max-w-2xl">{title}</h2>
        <button 
          onClick={onClose}
          className="text-white hover:text-red-500 transition-colors"
        >
          <X size={32} />
        </button>
      </div>
      
      {/* Video container */}
      <div className="flex-grow flex items-center justify-center relative">
        <div className="w-full h-full max-w-6xl max-h-[70vh]">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <div 
            className="h-full bg-red-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center p-4 bg-gray-900">
        <button 
          onClick={togglePlay}
          className="text-white mr-6 hover:text-red-500 transition-colors"
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        
        <button 
          onClick={toggleMute}
          className="text-white hover:text-red-500 transition-colors"
        >
          {isMuted ? <VolumeX size={32} /> : <Volume2 size={32} />}
        </button>
        
        <div className="ml-6 w-64">
          <div className="text-white text-sm mb-1">
            Progresso: {Math.round(progress)}%
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-red-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;