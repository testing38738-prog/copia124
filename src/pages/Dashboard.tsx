import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/videos';
import UserProfile from '@/components/UserProfile';
import ProgressStats from '@/components/ProgressStats';
import { motion } from 'framer-motion';
import { Play, Users, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
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

  const calculateCategoryProgress = (categoryId: string) => {
    const progressArray = userProgress[categoryId] || [];
    if (progressArray.length === 0) return 0;
    const completed = progressArray.filter(Boolean).length;
    return Math.round((completed / progressArray.length) * 100);
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'ia': return <Play className="text-blue-400" size={24} />;
      case 'marketing': return <TrendingUp className="text-green-400" size={24} />;
      case 'financas': return <DollarSign className="text-yellow-400" size={24} />;
      default: return <Play className="text-purple-400" size={24} />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'ia': return 'from-blue-600 to-blue-800';
      case 'marketing': return 'from-green-600 to-green-800';
      case 'financas': return 'from-yellow-600 to-yellow-800';
      default: return 'from-purple-600 to-purple-800';
    }
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

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.h2 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Categorias de Aprendizado
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const progress = calculateCategoryProgress(category.id);
            
            return (
              <motion.div
                key={category.id}
                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/categories/${category.id}`)}
              >
                <div className={`bg-gradient-to-r ${getCategoryColor(category.id)} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="bg-black/20 p-3 rounded-full">
                      {getCategoryIcon(category.id)}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{progress}%</div>
                      <div className="text-sm opacity-80">Concluído</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mt-4">{category.title}</h3>
                  <p className="mt-2 opacity-90">
                    {category.videos.length} vídeos disponíveis
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getCategoryColor(category.id)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                  
                  <button className="mt-6 w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center">
                    <Play size={16} className="mr-2" />
                    Explorar Categoria
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Stats Modal */}
      <ProgressStats 
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />
    </div>
  );
};

export default Dashboard;