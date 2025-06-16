import React, { useState } from 'react';
import { Sidebar } from '../../components/sidebar/Sidebar';
import { ChatBot } from '../../components/common/ChatBot';
import { theme } from '../../styles/theme';

import Home from './Home';
import Performance from './Performance';
import Alerts from './Alerts';
import Maintenance from './Maintenance';
import Settings from './Settings';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Home />;
      case 'performance':
        return <Performance />;
      case 'alerts':
        return <Alerts />;
      case 'maintenance':
        return <Maintenance />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: theme.colors.lightBg }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default AdminDashboard;
