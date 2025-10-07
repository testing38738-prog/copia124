import React from 'react';
import { User, LogOut, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const getOverallProgress = () => {
    const progressData = localStorage.getItem('userProgress');
    if (!progressData) return 0;
    
    const progress = JSON.parse(progressData);
    let totalVideos = 0;
    let completedVideos = 0;
    
    Object.values(progress).forEach((categoryProgress: any) => {
      totalVideos += categoryProgress.length;
      completedVideos += categoryProgress.filter((p: boolean) => p).length;
    });
    
    return totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
  };

  const userEmail = user?.email || 'usuário@arc7hive.com';
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4">
      {/* Progress Circle */}
      <div className="relative w-12 h-12">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#333"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            strokeDasharray={`${getOverallProgress()}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{getOverallProgress()}%</span>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{userInitial}</span>
        </div>
        <div className="hidden md:block">
          <p className="text-white font-medium truncate max-w-[120px]">{userEmail.split('@')[0]}</p>
          <p className="text-gray-400 text-sm">{getOverallProgress()}% concluído</p>
        </div>
      </div>

      {/* Stats Button */}
      <button className="p-2 text-gray-400 hover:text-white transition-colors">
        <BarChart3 size={20} />
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Sair"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
};

export default UserProfile;