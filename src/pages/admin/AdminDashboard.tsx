import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import { ChatBot } from '../../components/common/ChatBot';
import { useUser } from '../../context/UserContext';
import { mockSites, mockAlerts } from '../../data/mockData';
import { theme } from '../../styles/theme';
import { AlertTriangle } from 'lucide-react';
import { MetricCard } from '../../components/common/MetricCard';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user } = useUser();

  if (!user) return null;

  const totalSites = mockSites.length;
  const onlineSites = mockSites.filter(site => site.status === 'online').length;
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Sites Installés"
          value={totalSites}
          icon={StatusIndicator}
        />
        <MetricCard
          title="Sites En Ligne"
          value={`${onlineSites}/${totalSites}`}
          icon={StatusIndicator}
          status={onlineSites === totalSites ? 'online' : 'warning'}
        />
        <MetricCard
          title="Alertes Actives"
          value={activeAlerts}
          icon={AlertTriangle}
          status={activeAlerts > 0 ? 'warning' : 'online'}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Liste des Sites</h2>
        {mockSites.length === 0 ? (
          <p className="text-gray-600">Aucun site enregistré.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSites.map((site) => (
              <div key={site.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{site.name}</h3>
                  <StatusIndicator status={site.status} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mb-1">{site.location}</p>
                <p className="text-sm text-gray-500">Capacité : {site.capacity} kW</p>
                <p className="text-xs text-gray-400 mt-2">
                  Client : {site.clientName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres administrateur</h1>
      <p className="text-gray-600">Configuration et gestion des comptes à venir...</p>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: theme.colors.lightBg }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
