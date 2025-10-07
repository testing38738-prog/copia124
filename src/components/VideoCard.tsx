import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  onClick: () => void;
  completed?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ 
  title, 
  thumbnail, 
  duration, 
  views, 
  onClick,
  completed = false
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={onClick}
          >
            {/* Thumbnail */}
            <div className="relative">
              <img 
                src={thumbnail} 
                alt={title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="text-white fill-white" size={24} />
                </div>
              </div>
              
              {/* Duration badge */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                <Clock size={12} className="mr-1" />
                {duration}
              </div>
              
              {/* Completed indicator */}
              {completed && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Eye size={12} className="mr-1" />
                  Assistido
                </div>
              )}
            </div>
            
            {/* Video info */}
            <div className="bg-gray-900 p-3">
              <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{title}</h3>
              <p className="text-gray-400 text-xs flex items-center">
                <Eye size={12} className="mr-1" />
                {views}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm max-w-xs">{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VideoCard;