import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { ChatBot } from '../../components/common/ChatBot';
import { useUser } from '../../context/UserContext';
import { theme } from '../../styles/theme';
import Dashboard from './Dashboard';
import Performance from './Performance';
import Alerts from './Alerts';
import Maintenance from './Maintenance';
import Settings from './Settings';

const ClientDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user } = useUser();

  if (!user) return null;

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'performance':
        return <Performance />;
      case 'alerts':
        return <Alerts />;
      case 'maintenance':
        return <Maintenance />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
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

export default ClientDashboard;
