import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { mockSites, mockSystemHealth, mockProductionData, mockUsers } from '../../data/mockData';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import { Calendar, Gauge, Sun, Zap } from 'lucide-react';

const calculateSitePerformance = (siteId: string) => {
  const data = mockProductionData[siteId] || [];
  const last7Days = data.filter(entry =>
    new Date(entry.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  const totalProd = last7Days.reduce((sum, d) => sum + d.production, 0);
  const avgProd = totalProd / last7Days.length;

  const totalCons = last7Days.reduce((sum, d) => sum + d.consumption, 0);
  const avgCons = totalCons / last7Days.length;

  return {
    avgProd: Math.round(avgProd * 100) / 100,
    avgCons: Math.round(avgCons * 100) / 100
  };
};

const Performance: React.FC = () => {
  const dataChart = mockSites.map(site => {
    const perf = calculateSitePerformance(site.id);
    return {
      name: site.name,
      production: perf.avgProd,
      consumption: perf.avgCons
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Performance des sites</h1>

      {/* Tableau résumé */}
      <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Données générales</h2>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Site</th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">Client</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Production Moy. (kW)</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Conso Moy. (kW)</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">État</th>
                <th className="px-4 py-2 text-center font-semibold text-gray-700">Installé le</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockSites.map(site => {
                const perf = calculateSitePerformance(site.id);
                const health = mockSystemHealth.find(h => h.siteId === site.id);
                const client = mockUsers.find(u => u.id === site.clientId);
                return (
                  <tr key={site.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{site.name}</td>
                    <td className="px-4 py-3 text-gray-700">{client?.firstName} {client?.lastName}</td>
                    <td className="px-4 py-3 text-center text-blue-700 font-semibold">{perf.avgProd}</td>
                    <td className="px-4 py-3 text-center text-red-600 font-semibold">{perf.avgCons}</td>
                    <td className="px-4 py-3 text-center">
                      <StatusIndicator status={site.status} size="sm" />
                      <span className="ml-2 text-gray-700">{health?.overallScore}/100</span>
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {new Date(site.installDate).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphique comparatif */}
      <div className="bg-white rounded-xl p-6 shadow border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Production & Consommation moyenne (7 derniers jours)</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="production" fill="#34D399" name="Production (kW)" />
              <Bar dataKey="consumption" fill="#F59E0B" name="Consommation (kW)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Performance;
