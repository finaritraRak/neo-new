import React from 'react';
import { CalendarCheck, MapPin, Info } from 'lucide-react';

const maintenanceTasks = [
  {
    id: 'mnt-001',
    title: 'Inspection des panneaux solaires',
    date: '2025-06-20T09:00:00',
    description: 'Vérification des modules photovoltaïques pour détection de poussière ou microfissures.',
    site: 'Somacou',
    location: 'Antananarivo, Madagascar',
    status: 'planifiée',
  },
  {
    id: 'mnt-002',
    title: 'Mise à jour du firmware onduleur',
    date: '2025-06-25T14:30:00',
    description: 'Installation de la dernière version logicielle pour l’onduleur principal.',
    site: 'Station Antsapanana',
    location: 'Antsapanana, Madagascar',
    status: 'confirmée',
  },
  {
    id: 'mnt-003',
    title: 'Nettoyage des capteurs solaires',
    date: '2025-07-01T08:00:00',
    description: 'Nettoyage préventif pour assurer une performance optimale des capteurs.',
    site: '6ha',
    location: 'Antananarivo, Madagascar',
    status: 'en attente',
  },
];

const statusColors: Record<string, string> = {
  planifiée: 'bg-yellow-100 text-yellow-800',
  confirmée: 'bg-green-100 text-green-800',
  'en attente': 'bg-gray-100 text-gray-700',
};

const Maintenance: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">🛠️ Suivi des maintenances</h1>
      <p className="text-gray-600 text-sm">Planification intelligente des opérations techniques à venir sur vos installations.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {maintenanceTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white hover:shadow-md transition-shadow duration-200 border border-gray-200 rounded-lg p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-md font-semibold text-gray-900">{task.title}</h2>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
                {task.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-blue-500" />
                {new Date(task.date).toLocaleString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{task.site} – {task.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-2">
                <Info className="w-4 h-4 text-gray-400" />
                ID tâche : {task.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
