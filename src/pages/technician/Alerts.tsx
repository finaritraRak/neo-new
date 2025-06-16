import React, { useState } from 'react';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import { Filter } from 'lucide-react';

const severityLabels = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  critical: 'Critique',
};

const allAlerts = [
  {
    id: 'a1',
    title: 'Surtension détectée',
    description: 'Le site a enregistré une surtension dépassant les seuils de sécurité.',
    severity: 'high',
    timestamp: '2025-06-15T09:15:00Z',
    site: 'Somacou',
    location: 'Antananarivo',
    aiRecommendation: 'Vérifiez les convertisseurs de tension et redémarrez le système si nécessaire.',
  },
  {
    id: 'a2',
    title: 'Batterie faible',
    description: 'Le niveau de charge de la batterie est passé sous le seuil de 20%.',
    severity: 'medium',
    timestamp: '2025-06-14T14:45:00Z',
    site: '6ha',
    location: 'Antananarivo',
    aiRecommendation: 'Envisagez une recharge ou un remplacement de la batterie.',
  },
  {
    id: 'a3',
    title: 'Température anormale',
    description: 'Le capteur a détecté une température interne de 85°C.',
    severity: 'critical',
    timestamp: '2025-06-13T12:30:00Z',
    site: 'Station Antsapanana',
    location: 'Antsapanana',
    aiRecommendation: 'Arrêtez immédiatement le système et contrôlez la ventilation.',
  },
  {
    id: 'a4',
    title: 'Signal réseau faible',
    description: 'Le système a détecté une instabilité de connexion sur le réseau GSM.',
    severity: 'low',
    timestamp: '2025-06-12T11:00:00Z',
    site: '6ha',
    location: 'Antananarivo',
    aiRecommendation: 'Redémarrez le routeur ou vérifiez la carte SIM.',
  },
];

const Alerts: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredAlerts = filter === 'all'
    ? allAlerts
    : allAlerts.filter(alert => alert.severity === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Alertes et diagnostics</h1>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-500 h-5 w-5" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-md text-sm px-3 py-1"
          >
            <option value="all">Toutes les alertes</option>
            <option value="low">Gravité : Faible</option>
            <option value="medium">Gravité : Moyenne</option>
            <option value="high">Gravité : Élevée</option>
            <option value="critical">Gravité : Critique</option>
          </select>
        </div>
      </div>

      {/* Liste des alertes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Alertes {filter !== 'all' && `– ${severityLabels[filter]}`}
          </h2>
          <span className="text-sm text-gray-500">{filteredAlerts.length} alerte(s)</span>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="p-6 text-gray-500">Aucune alerte trouvée pour ce niveau de gravité.</div>
        ) : (
          <div className="p-6 space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-white transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <StatusIndicator status={alert.severity} size="sm" />
                    <div>
                      <h3 className="font-medium text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-600">{alert.site} — {alert.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(alert.timestamp).toLocaleString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{alert.description}</p>
                {alert.aiRecommendation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-blue-900 mb-1">🤖 Recommandation IA</h4>
                    <p className="text-sm text-blue-800">{alert.aiRecommendation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
