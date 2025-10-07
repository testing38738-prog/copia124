import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar credenciais
    if (password === '8845' || password === '4975') {
      // Salvar estado de login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', password === '8845' ? 'Yago' : 'Victor');
      
      // Redirecionar para dashboard
      navigate('/dashboard');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-2">ARC7HIVE</h1>
          <p className="text-gray-400">Plataforma de aprendizado exclusiva</p>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-800">
          <div className="text-center mb-6">
            <div className="mx-auto bg-red-600 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Digite sua senha"
              />
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02]"
            >
              Acessar Plataforma
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Senhas:</p>
            <p className="mt-1">Yago: 8845 | Victor: 4975</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;