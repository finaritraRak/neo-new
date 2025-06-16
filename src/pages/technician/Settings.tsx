import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres technicien</h1>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Notifications</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Recevoir les alertes critiques en temps réel</span>
          <input
            type="checkbox"
            checked={notifEnabled}
            onChange={() => setNotifEnabled(!notifEnabled)}
            className="h-5 w-5 text-blue-600 rounded"
          />
        </div>
      </div>

      {/* Thème */}
      <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Apparence</h2>
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
              className="text-blue-600"
            />
            <span>Clair</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
              className="text-blue-600"
            />
            <span>Sombre</span>
          </label>
        </div>
      </div>

      {/* Synchronisation */}
      <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Synchronisation</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Activer la synchronisation automatique des données</span>
          <input
            type="checkbox"
            checked={autoSync}
            onChange={() => setAutoSync(!autoSync)}
            className="h-5 w-5 text-blue-600 rounded"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 mt-8">
        Les paramètres sont appliqués localement pour cette session. Une synchronisation avec le serveur sera disponible prochainement.
      </div>
    </div>
  );
};

export default Settings;
