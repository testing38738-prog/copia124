import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { X, Play, Pause, Volume2, VolumeX, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { title, categoryId } = location.state || {};
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Marcar vídeo como concluído
          if (videoId && categoryId) {
            const progressData = localStorage.getItem('userProgress');
            let userProgress = progressData ? JSON.parse(progressData) : {};
            
            if (!userProgress[categoryId]) {
              userProgress[categoryId] = [];
            }
            
            // Encontrar índice do vídeo na categoria
            const categoriesData = [
              {
                id: 'ia',
                title: 'Inteligência Artificial',
                videos: [
                  {
                    id: 'dQw4w9WgXcQ',
                    title: 'Introdução à Inteligência Artificial - Conceitos Fundamentais',
                    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
                    duration: '15:22',
                    views: '12K visualizações',
                    completed: false
                  },
                  {
                    id: 'jNQXAC9IVRw',
                    title: 'Como a IA está Transformando o Mundo Digital',
                    thumbnail: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg',
                    duration: '22:18',
                    views: '8.5K visualizações',
                    completed: false
                  },
                  {
                    id: 'M7lc1UVf-VE',
                    title: 'Machine Learning para Iniciantes - Tutorial Completo',
                    thumbnail: 'https://i.ytimg.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    duration: '35:45',
                    views: '15.3K visualizações',
                    completed: false
                  },
                  {
                    id: 'aircAruvnKk',
                    title: 'Redes Neurais Artificiais - Como Funcionam na Prática',
                    thumbnail: 'https://i.ytimg.com/vi/aircAruvnKk/hqdefault.jpg',
                    duration: '18:33',
                    views: '9.7K visualizações',
                    completed: false
                  }
                ]
              },
              {
                id: 'marketing',
                title: 'Marketing Digital',
                videos: [
                  {
                    id: '8pDqJVdNa4Y',
                    title: 'Estratégias de Marketing Digital para 2024',
                    thumbnail: 'https://i.ytimg.com/vi/8pDqJVdNa4Y/hqdefault.jpg',
                    duration: '28:15',
                    views: '22K visualizações',
                    completed: false
                  },
                  {
                    id: 'b1xx9CzVaDE',
                    title: 'Como Criar uma Estratégia de Inbound Marketing Eficaz',
                    thumbnail: 'https://i.ytimg.com/vi/b1xx9CzVaDE/hqdefault.jpg',
                    duration: '19:42',
                    views: '14.7K visualizações',
                    completed: false
                  },
                  {
                    id: '0FxWS7OiF7Y',
                    title: 'Marketing de Conteúdo: Do Planejamento à Execução',
                    thumbnail: 'https://i.ytimg.com/vi/0FxWS7OiF7Y/hqdefault.jpg',
                    duration: '32:10',
                    views: '18.2K visualizações',
                    completed: false
                  }
                ]
              },
              {
                id: 'financas',
                title: 'Mercado Financeiro',
                videos: [
                  {
                    id: '4ZUkA3iMhXU',
                    title: 'Fundamentos do Mercado Financeiro para Iniciantes',
                    thumbnail: 'https://i.ytimg.com/vi/4ZUkA3iMhXU/hqdefault.jpg',
                    duration: '25:30',
                    views: '31K visualizações',
                    completed: false
                  },
                  {
                    id: 'CQJy45q9540',
                    title: 'Análise Técnica: Como Ler Gráficos e Tendências',
                    thumbnail: 'https://i.ytimg.com/vi/CQJy45q9540/hqdefault.jpg',
                    duration: '42:15',
                    views: '19.8K visualizações',
                    completed: false
                  },
                  {
                    id: 'b1xx9CzVaDE',
                    title: 'Investimentos em Ações: Estratégias para Iniciantes',
                    thumbnail: 'https://i.ytimg.com/vi/b1xx9CzVaDE/hqdefault.jpg',
                    duration: '38:22',
                    views: '27.4K visualizações',
                    completed: false
                  }
                ]
              }
            ];
            
            const category = categoriesData.find(cat => cat.id === categoryId);
            if (category) {
              const videoIndex = category.videos.findIndex(v => v.id === videoId);
              if (videoIndex !== -1) {
                userProgress[categoryId][videoIndex] = true;
                localStorage.setItem('userProgress', JSON.stringify(userProgress));
              }
            }
          }
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [videoId, categoryId]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleBack = () => {
    if (categoryId) {
      navigate(`/categories/${categoryId}`);
    } else {
      navigate('/dashboard');
    }
  };

  if (!videoId || !title) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Vídeo não encontrado</h2>
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
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900/80 backdrop-blur-md">
        <button 
          onClick={handleBack}
          className="text-white hover:text-red-500 transition-colors flex items-center"
        >
          <ChevronLeft size={24} className="mr-2" />
          Voltar
        </button>
        <h2 className="text-white text-xl font-bold truncate max-w-2xl">{title}</h2>
        <button 
          onClick={handleBack}
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
      <div className="flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md">
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

export default VideoPlayerPage;