import React from 'react';
import { X, BarChart3, Play, CheckCircle } from 'lucide-react';
import { categories } from '@/data/videos';

interface ProgressStatsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const getProgressData = (): Record<string, boolean[]> => {
    const progressData = localStorage.getItem('userProgress');
    if (!progressData) return {};
    return JSON.parse(progressData);
  };

  const progressData = getProgressData();
  const totalVideos: number = categories.reduce((total, category) => total + category.videos.length, 0);
  const completedVideos: number = Object.values(progressData).reduce((total: number, categoryProgress: boolean[]) => {
    return total + categoryProgress.filter((p: boolean) => p).length;
  }, 0);

  // Ensure we don't divide by zero
  const progressPercentage: number = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <BarChart3 className="text-red-600" size={24} />
            <h2 className="text-2xl font-bold text-white">Estatísticas de Progresso</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Overall Stats */}
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Visão Geral</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">{completedVideos.toString()}</div>
              <p className="text-gray-400 text-sm">Vídeos Concluídos</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-3xl font-bold text-white mb-2">{totalVideos.toString()}</div>
              <p className="text-gray-400 text-sm">Total de Vídeos</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {progressPercentage.toString()}%
              </div>
              <p className="text-gray-400 text-sm">Progresso Total</p>
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Progresso por Categoria</h3>
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryProgress = progressData[category.id] || [];
              const completed = categoryProgress.filter((p: boolean) => p).length;
              const total = category.videos.length;
              const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={category.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-white">{category.title}</h4>
                    <span className="text-red-600 font-semibold">{percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-400 text-sm">
                      {completed} de {total} vídeos
                    </span>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-green-500 text-sm">{completed}</span>
                      <Play size={14} className="text-gray-400" />
                      <span className="text-gray-400 text-sm">{total - completed}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;