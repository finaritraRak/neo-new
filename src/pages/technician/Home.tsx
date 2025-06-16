import React, { useState } from 'react';
import {
  Clock, AlertTriangle, CheckCircle, Activity, MapPin, Users
} from 'lucide-react';
import { MetricCard } from '../../components/common/MetricCard';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import {
  mockMaintenanceTasks,
  mockAlerts,
  mockSites,
  mockSystemHealth,
  mockProductionData,
  mockUsers
} from '../../data/mockData';
import { theme } from '../../styles/theme';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const Home: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(mockSites[0]?.id || null);

  const myTasks = mockMaintenanceTasks.filter(task =>
    task.technician === 'Pierre Dubois' || task.technician === 'Marie Leroy'
  );
  const pendingTasks = myTasks.filter(task => task.status === 'scheduled').length;
  const activeAlerts = mockAlerts.filter(alert => alert.status === 'active').length;
  const completedTasks = myTasks.filter(task => task.status === 'completed').length;

  const selectedSite = mockSites.find(site => site.id === selectedSiteId);
  const selectedHealth = mockSystemHealth.find(h => h.siteId === selectedSiteId);
  const selectedClient = mockUsers.find(user => user.id === selectedSite?.clientId);
  const selectedData = selectedSiteId ? mockProductionData[selectedSiteId] || [] : [];

  const chartData = selectedData
    .filter(data => new Date(data.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000))
    .slice(-12)
    .map(data => ({
      time: new Date(data.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      production: data.production,
      consumption: data.consumption,
    }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord technicien</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Tâches en attente" value={pendingTasks} icon={Clock} status={pendingTasks > 0 ? 'warning' : 'online'} />
        <MetricCard title="Alertes actives" value={activeAlerts} icon={AlertTriangle} status={activeAlerts > 0 ? 'warning' : 'online'} />
        <MetricCard title="Tâches terminées" value={completedTasks} icon={CheckCircle} trend={{ value: 15.3, isPositive: true }} />
        <MetricCard title="Sites assignés" value={mockSites.length} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des sites */}
        <div className="col-span-1 bg-white rounded-xl p-4 shadow border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sites assignés</h2>
          <ul className="space-y-3">
            {mockSites.map(site => {
              const client = mockUsers.find(u => u.id === site.clientId);
              const isSelected = site.id === selectedSiteId;

              return (
                <li
                  key={site.id}
                  onClick={() => setSelectedSiteId(site.id)}
                  className={`cursor-pointer p-4 rounded-lg border transition-all duration-150 ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-800">{site.name}</p>
                      <p className="text-xs text-gray-500">{site.location}</p>
                    </div>
                    <StatusIndicator status={site.status} size="sm" />
                  </div>
                  {client && (
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{client.firstName} {client.lastName}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Détails + graphique */}
        <div className="col-span-2 bg-white rounded-xl p-6 shadow border border-gray-100">
          {selectedSite ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedSite.name}</h2>
                <p className="text-sm text-gray-600">{selectedSite.location} — {selectedClient?.firstName} {selectedClient?.lastName}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                <div>
                  <span className="font-medium">Capacité :</span> {selectedSite.capacity} kW
                </div>
                <div>
                  <span className="font-medium">Installé le :</span> {new Date(selectedSite.installDate).toLocaleDateString('fr-FR')}
                </div>
                <div>
                  <span className="font-medium">État système :</span> {selectedHealth ? `${selectedHealth.overallScore}/100` : '—'}
                </div>
                <div>
                  <span className="font-medium">Client :</span> {selectedClient?.firstName} {selectedClient?.lastName}
                </div>
              </div>

              <h3 className="text-md font-semibold text-gray-800 mb-2">Production vs Consommation (24h)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="production" stroke={theme.colors.status.success} strokeWidth={2} name="Production (kW)" />
                    <Line type="monotone" dataKey="consumption" stroke={theme.colors.status.warning} strokeWidth={2} name="Consommation (kW)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Aucun site sélectionné.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
