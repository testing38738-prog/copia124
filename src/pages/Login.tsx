import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se usuário já está logado
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.session) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
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
            <h2 className="text-2xl font-bold text-white mb-2">Acesso à Plataforma</h2>
            <p className="text-gray-400">Entre com suas credenciais</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent backdrop-blur-sm"
                placeholder="seu@email.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent backdrop-blur-sm pr-12"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: !loading ? 1.02 : 1 }}
              whileTap={{ scale: !loading ? 0.98 : 1 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processando...
                </div>
              ) : (
                "Acessar Plataforma"
              )}
            </motion.button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center gap-2">
              <User size={14} />
              Acesso restrito a usuários autorizados
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;