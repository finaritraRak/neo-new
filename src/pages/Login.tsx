import React, { useState } from 'react';
import { Sun, Mail, Lock, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { theme } from '../styles/theme';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Email ou mot de passe incorrect');
    }
  };

  const demoAccounts = [
    { email: 'admin@neo-solar.com', role: 'Admin', password: 'password123' },
    { email: 'tech1@neo-solar.com', role: 'Technicien', password: 'password123' },
    { email: 'client1@entreprise-a.com', role: 'Client', password: 'password123' },
  ];

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: theme.colors.lightBg }}>
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div 
              className="mx-auto h-16 w-16 flex items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <Sun className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Bienvenue sur NEO
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Plateforme de supervision solaire et hybride
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: theme.colors.primary }}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>

      {/* Right side - Demo accounts */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center" style={{ backgroundColor: theme.colors.sidebar }}>
        <div className="max-w-md text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Comptes de démonstration
          </h3>
          <div className="space-y-4">
            {demoAccounts.map((account, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4 text-white">
                <div className="font-semibold">{account.role}</div>
                <div className="text-sm opacity-90">{account.email}</div>
                <div className="text-xs opacity-75 mt-1">Mot de passe: {account.password}</div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-300 mt-6">
            Utilisez ces comptes pour explorer les différentes interfaces selon votre rôle.
          </p>
        </div>
      </div>
    </div>
  );
};