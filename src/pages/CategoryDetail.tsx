import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { categories, Video } from '@/data/videos';
import VideoCard from '@/components/VideoCard';
import { Search, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const category = categories.find(cat => cat.id === categoryId);

  useEffect(() => {
    if (!category) {
      navigate('/dashboard');
      return;
    }

    setFilteredVideos(category.videos);
  }, [categoryId, category, navigate]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredVideos(category?.videos || []);
      setAiSuggestions([]);
      return;
    }

    // Simular busca por IA
    setIsSearching(true);
    
    // Filtrar vídeos com base na consulta
    const filtered = category?.videos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase())
    ) || [];
    
    setFilteredVideos(filtered);
    
    // Simular sugestões da IA
    setTimeout(() => {
      const suggestions = [
        `Melhores vídeos sobre "${query}"`,
        `Tutoriais avançados de ${category?.title}`,
        `Conceitos fundamentais de ${query}`,
        `Aplicações práticas de ${query}`
      ];
      setAiSuggestions(suggestions);
      setIsSearching(false);
    }, 800);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Categoria não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <div className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
              {category.title}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-400">
              Olá, {user?.email?.split('@')[0] || 'usuário'}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <Search className="text-gray-500" size={20} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={`Buscar vídeos em ${category.title}...`}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <Sparkles className="text-orange-500" size={20} />
            </div>
          </div>

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-orange-500" size={16} />
                <span className="text-sm text-gray-400">Sugestões da IA:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    className="px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-700 transition-colors"
                    onClick={() => handleSearch(suggestion)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {isSearching && (
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-600 border-t-orange-500 rounded-full animate-spin"></div>
                <span>Buscando com IA...</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os vídeos'}
            <span className="text-gray-500 text-lg font-normal ml-2">
              ({filteredVideos.length} vídeos)
            </span>
          </h2>

          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhum vídeo encontrado para "{searchQuery}"
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilteredVideos(category.videos);
                }}
                className="mt-4 text-red-500 hover:text-red-400 transition-colors"
              >
                Ver todos os vídeos
              </button>
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
                  onClick={() => console.log('Play video:', video.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;