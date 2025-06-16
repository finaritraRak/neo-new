import { v4 as uuidv4 } from 'uuid';
import { User, SolarSite, ProductionData, Alert, MaintenanceTask, SystemHealth } from '../types';

// Users data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@neo-solar.com',
    firstName: 'Sophie',
    lastName: 'Martin',
    role: 'admin',
    position: 'Directrice Technique',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    email: 'tech1@neo-solar.com',
    firstName: 'Pierre',
    lastName: 'Dubois',
    role: 'technician',
    position: 'Technicien Senior',
    createdAt: '2024-02-01T08:00:00Z',
  },
  {
    id: '3',
    email: 'tech2@neo-solar.com',
    firstName: 'Marie',
    lastName: 'Leroy',
    role: 'technician',
    position: 'Technicienne',
    createdAt: '2024-02-15T08:00:00Z',
  },
  {
    id: '4',
    email: 'client1@entreprise-a.com',
    firstName: 'Jean',
    lastName: 'Dupont',
    role: 'client',
    position: 'Responsable Énergie',
    createdAt: '2024-03-01T08:00:00Z',
  },
  {
    id: '5',
    email: 'client2@entreprise-b.com',
    firstName: 'Lucie',
    lastName: 'Bernard',
    role: 'client',
    position: 'Directrice Développement Durable',
    createdAt: '2024-03-15T08:00:00Z',
  },
  {
    id: '6',
    email: 'client3@entreprise-c.com',
    firstName: 'Thomas',
    lastName: 'Moreau',
    role: 'client',
    position: 'Ingénieur Énergétique',
    createdAt: '2024-04-01T08:00:00Z',
  },
  {
    id: '7',
    email: 'contact@somacou.com',
    firstName: 'Andry',
    lastName: 'Rakoto',
    role: 'client',
    position: 'Responsable Énergie',
    createdAt: '2024-04-10T08:00:00Z',
  },
  {
    id: '8',
    email: 'contact@toa.mg',
    firstName: 'Nirina',
    lastName: 'Andrianarisoa',
    role: 'client',
    position: 'Responsable Infrastructures',
    createdAt: '2024-04-15T08:00:00Z',
  },
  {
    id: '9',
    email: 'client@jovena.mg',
    firstName: 'Mickael',
    lastName: 'Andriamihaja',
    role: 'client',
    position: 'Chef de Station',
    createdAt: '2024-04-20T08:00:00Z',
  },
];

// Solar sites data
export const mockSites: SolarSite[] = [
  
  {
    id: 'site-4',
    name: 'Somacou',
    location: 'Antananarivo, Madagascar',
    capacity: 200,
    status: 'online',
    clientId: '7',
    installDate: '2024-01-10T08:00:00Z',
  },
  {
    id: 'site-5',
    name: '6ha',
    location: 'Antananarivo, Madagascar',
    capacity: 150,
    status: 'online',
    clientId: '8',
    installDate: '2024-01-15T08:00:00Z',
  },
  {
    id: 'site-6',
    name: 'Station Antsapanana',
    location: 'Antsapanana, Madagascar',
    capacity: 180,
    status: 'warning',
    clientId: '9',
    installDate: '2024-01-20T08:00:00Z',
  },
];


export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    siteId: 'site-4', // Somacou
    title: 'Surtension détectée',
    description: 'Le site a enregistré une surtension dépassant les seuils de sécurité.',
    severity: 'high',
    timestamp: new Date().toISOString(),
    aiRecommendation: 'Vérifiez les convertisseurs de tension et redémarrez le système si nécessaire.',
    status: 'active'
  },
  {
    id: 'alert-2',
    siteId: 'site-5', // 6ha
    title: 'Batterie faible',
    description: 'Le niveau de charge de la batterie est passé sous le seuil de 20%.',
    severity: 'medium',
    timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
    aiRecommendation: 'Envisagez une recharge ou un remplacement de la batterie.',
    status: 'active'
  },
  {
    id: 'alert-3',
    siteId: 'site-6', // Antsapanana
    title: 'Température anormale',
    description: 'Le capteur a détecté une température interne de 85°C.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    aiRecommendation: 'Arrêtez immédiatement le système et contrôlez la ventilation.',
    status: 'active'
  },
  {
    id: 'alert-4',
    siteId: 'site-4',
    title: 'Production basse',
    description: 'La production moyenne est inférieure à la normale depuis 3 jours.',
    severity: 'low',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    aiRecommendation: 'Inspectez les panneaux pour vérifier s’ils sont propres et non obstrués.',
    status: 'active'
  }
];



// Générateur de données de production
export const generateProductionData = (siteId: string): ProductionData[] => {
  const data: ProductionData[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    for (let hour = 0; hour < 24; hour++) {
      const timestamp = new Date(date);
      timestamp.setHours(hour);

      const solarFactor = Math.max(0, Math.sin((hour - 6) * Math.PI / 12));
      const baseProduction = 20 + Math.random() * 15;
      const production = baseProduction * solarFactor * (0.8 + Math.random() * 0.4);

      const baseConsumption = 18 + Math.random() * 10;
      const consumptionFactor = hour >= 8 && hour <= 18 ? 1.2 : 0.6;
      const consumption = baseConsumption * consumptionFactor * (0.9 + Math.random() * 0.2);

      const batteryLevel = 60 + 30 * Math.sin((hour - 12) * Math.PI / 12) + Math.random() * 10;

      const solarUsage = Math.min(production, consumption);
      const remainingConsumption = Math.max(0, consumption - solarUsage);
      const batteryUsage = Math.min(remainingConsumption * 0.7, batteryLevel * 0.1);
      const gridUsage = Math.max(0, remainingConsumption - batteryUsage);

      data.push({
        timestamp: timestamp.toISOString(),
        production: Math.round(production * 100) / 100,
        consumption: Math.round(consumption * 100) / 100,
        batteryLevel: Math.round(Math.max(0, Math.min(100, batteryLevel))),
        gridUsage: Math.round(gridUsage * 100) / 100,
        solarUsage: Math.round(solarUsage * 100) / 100,
        batteryUsage: Math.round(batteryUsage * 100) / 100,
      });
    }
  }

  return data;
};



// Maintenance tasks (inchangé)
export const mockMaintenanceTasks: MaintenanceTask[] = [ /* ... inchangé ... */ ];

// System health (inchangé)
export const mockSystemHealth: SystemHealth[] = [ /* ... inchangé ... */ ];

// Production data pour tous les sites
export const mockProductionData = {
  'site-1': generateProductionData('site-1'),
  'site-2': generateProductionData('site-2'),
  'site-3': generateProductionData('site-3'),
  'site-4': generateProductionData('site-4'),
  'site-5': generateProductionData('site-5'),
  'site-6': generateProductionData('site-6'),
};
