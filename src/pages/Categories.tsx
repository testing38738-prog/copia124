import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, X, ChevronLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories } from '@/data/videos';
import VideoCard from '@/components/VideoCard';
import UserProfile from '@/components/UserProfile';

const Categories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
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

  const currentCategory = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (currentCategory) {
      setFilteredVideos(
        currentCategory.videos.map((video, index) => ({
          ...video,
          completed: userProgress[currentCategory.id]?.[index] || false
        }))
      );
    }
  }, [categoryId, userProgress, currentCategory]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      if (currentCategory) {
        setFilteredVideos(
          currentCategory.videos.map((video, index) => ({
            ...video,
            completed: userProgress[currentCategory.id]?.[index] || false
          }))
        );
      }
      return;
    }

    setIsSearching(true);
    
    // Simulando busca por IA (em uma implementação real, isso seria uma chamada para uma API)
    setTimeout(() => {
      if (currentCategory) {
        const results = currentCategory.videos.filter(video =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setFilteredVideos(
          results.map((video, index) => ({
            ...video,
            completed: userProgress[currentCategory.id]?.[index] || false
          }))
        );
      }
      setIsSearching(false);
    }, 800);
  };

  const handleVideoSelect = (videoId: string) => {
    if (currentCategory) {
      const video = currentCategory.videos.find(v => v.id === videoId);
      if (video) {
        navigate(`/video/${videoId}`, { 
          state: { 
            title: video.title,
            categoryId: currentCategory.id
          } 
        });
      }
    }
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Categoria não encontrada</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-red-500 hover:text-red-400 flex items-center justify-center"
          >
            <ChevronLeft className="mr-2" />
            Voltar para o dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {currentCategory.title}
            </h1>
          </div>
          <UserProfile />
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-500" size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-10 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent backdrop-blur-sm"
              placeholder="Buscar vídeos por IA..."
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  if (currentCategory) {
                    setFilteredVideos(
                      currentCategory.videos.map((video, index) => ({
                        ...video,
                        completed: userProgress[currentCategory.id]?.[index] || false
                      }))
                    );
                  }
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-red-500 hover:text-red-400 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles size={20} />
              )}
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Use palavras-chave para encontrar vídeos relevantes com nossa busca por IA
          </p>
        </div>

        {/* Video Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-6 flex items-center">
            {searchQuery ? `Resultados para: "${searchQuery}"` : 'Todos os vídeos'}
            <Sparkles className="ml-2 text-red-500" size={20} />
          </h2>
          
          {isSearching ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Buscando vídeos com IA...</p>
              </div>
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-900/50 rounded-xl p-8 max-w-md mx-auto">
                <Search className="mx-auto text-gray-600 mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">Nenhum vídeo encontrado</h3>
                <p className="text-gray-500">
                  Não encontramos vídeos que correspondam à sua busca. Tente outros termos.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  views={video.views}
                  completed={video.completed}
                  onClick={() => handleVideoSelect(video.id)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;