import React from 'react';
import { MapPin, Wrench, CheckCircle, Clock } from 'lucide-react';

const maintenanceTasks = [
  {
    id: 'mt1',
    title: 'Remplacement onduleur principal',
    description: 'Remplacer l’onduleur du site suite à panne critique.',
    site: 'Somacou',
    location: 'Antananarivo',
    technician: 'Pierre Dubois',
    status: 'scheduled',
    scheduledDate: '2025-06-20',
  },
  {
    id: 'mt2',
    title: 'Nettoyage des panneaux solaires',
    description: 'Maintenance préventive – nettoyage mensuel des panneaux.',
    site: '6ha',
    location: 'Antananarivo',
    technician: 'Marie Leroy',
    status: 'completed',
    completedDate: '2025-06-10',
  },
  {
    id: 'mt3',
    title: 'Contrôle du système de surveillance',
    description: 'Vérification du bon fonctionnement des capteurs.',
    site: 'Station Antsapanana',
    location: 'Antsapanana',
    technician: 'Pierre Dubois',
    status: 'scheduled',
    scheduledDate: '2025-06-22',
  },
];

const systemHealth = [
  {
    site: 'Somacou',
    components: {
      onduleur: 92,
      batterie: 77,
      capteurs: 89,
      réseau: 100,
    },
  },
  {
    site: '6ha',
    components: {
      onduleur: 81,
      batterie: 68,
      capteurs: 94,
      réseau: 95,
    },
  },
  {
    site: 'Station Antsapanana',
    components: {
      onduleur: 55,
      batterie: 40,
      capteurs: 79,
      réseau: 90,
    },
  },
];

const Maintenance: React.FC = () => {
  const upcomingTasks = maintenanceTasks.filter(t => t.status === 'scheduled');
  const completedTasks = maintenanceTasks.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Maintenance et interventions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interventions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes interventions</h2>

          {upcomingTasks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>À venir</span>
              </h3>
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <div key={task.id} className="border border-blue-100 bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-blue-900">{task.title}</h4>
                      <span className="text-xs text-blue-700">
                        {new Date(task.scheduledDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">{task.description}</p>
                    <div className="text-xs text-blue-700 mt-2 flex items-center space-x-2">
                      <MapPin className="w-3 h-3" />
                      <span>{task.site} — {task.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Terminées</span>
              </h3>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <div key={task.id} className="border border-green-100 bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-green-900">{task.title}</h4>
                      <span className="text-xs text-green-700">
                        {new Date(task.completedDate!).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-sm text-green-800">{task.description}</p>
                    <div className="text-xs text-green-700 mt-2 flex items-center space-x-2">
                      <MapPin className="w-3 h-3" />
                      <span>{task.site} — {task.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Santé des systèmes */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Santé des systèmes</h2>
          <div className="space-y-4">
            {systemHealth.map((health) => (
              <div key={health.site} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">{health.site}</h3>
                <ul className="text-sm space-y-1">
                  {Object.entries(health.components).map(([key, val]) => (
                    <li key={key} className="flex justify-between">
                      <span className="capitalize text-gray-600">{key}</span>
                      <span className={`font-medium ${
                        val < 50 ? 'text-red-600' : val < 80 ? 'text-yellow-600' : 'text-green-700'
                      }`}>
                        {val}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
