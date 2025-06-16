import React from 'react';
import { StatusIndicator } from '../../components/common/StatusIndicator';
import { useUser } from '../../context/UserContext';

const Alerts: React.FC = () => {
  const { user } = useUser();

  if (!user) return null;

  // 🔧 Données simulées directement ici
  const clientSites = [
    {
      id: 'site-4',
      name: 'Somacou',
      location: 'Antananarivo',
      clientId: '7',
    },
    {
      id: 'site-5',
      name: '6ha',
      location: 'Antananarivo',
      clientId: '8',
    },
  ];

  const alerts = [
    {
      id: 'alert-1',
      siteId: 'site-4',
      title: 'Surtension détectée',
      description: 'Le site a enregistré une surtension dépassant les seuils de sécurité.',
      severity: 'high',
      timestamp: '2025-06-15T10:30:00',
      aiRecommendation: 'Vérifiez les convertisseurs de tension et redémarrez le système.',
    },
    {
      id: 'alert-2',
      siteId: 'site-5',
      title: 'Batterie faible',
      description: 'Le niveau de charge est passé sous le seuil critique.',
      severity: 'medium',
      timestamp: '2025-06-14T08:15:00',
      aiRecommendation: 'Prévoir un remplacement ou une recharge urgente de la batterie.',
    },
  ];

  // 🔍 Filtrer les alertes selon les sites du client
  const userSiteIds = clientSites.filter(s => s.clientId === user.id).map(s => s.id);
  const userAlerts = alerts.filter(alert => userSiteIds.includes(alert.siteId));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Alertes de vos sites</h1>

      {userAlerts.length === 0 ? (
        <p className="text-gray-600">Aucune alerte détectée pour vos sites actuellement.</p>
      ) : (
        <div className="space-y-4">
          {userAlerts.map(alert => {
            const site = clientSites.find(s => s.id === alert.siteId);
            return (
              <div key={alert.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{alert.title}</h3>
                    <p className="text-sm text-gray-500">{site?.name} — {site?.location}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(alert.timestamp).toLocaleString('fr-FR')}</p>
                  </div>
                  <StatusIndicator status={alert.severity} size="sm" />
                </div>
                <p className="text-sm text-gray-700">{alert.description}</p>
                {alert.aiRecommendation && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">💡 {alert.aiRecommendation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Alerts;
