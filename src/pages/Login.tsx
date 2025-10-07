import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar credenciais
    if (password === '8845' || password === '4975' || password === '9921') {
      // Salvar estado de login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', 
        password === '8845' ? 'Yago' : 
        password === '4975' ? 'Victor' : 'Gustavo'
      );
      
      // Redirecionar para dashboard
      navigate('/dashboard');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <motion.h1 
            className="text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #ff0000, #ff8c00)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ARC7HIVE
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Plataforma de aprendizado exclusiva
          </motion.p>
        </div>
        
        <motion.div 
          className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <div className="mx-auto bg-gradient-to-br from-red-600 to-orange-500 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
            <p className="text-gray-400">Digite sua senha para acessar</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent backdrop-blur-sm"
                placeholder="Digite sua senha"
              />
            </div>
            
            {error && (
              <motion.div 
                className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
            
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Acessar Plataforma
            </motion.button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              <User size={14} />
              Usuários cadastrados
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <span className="bg-gray-800/50 rounded px-2 py-1">Yago: 8845</span>
              <span className="bg-gray-800/50 rounded px-2 py-1">Victor: 4975</span>
              <span className="bg-gray-800/50 rounded px-2 py-1">Gustavo: 9921</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;