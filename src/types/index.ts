export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'technician' | 'client';
  position?: string;
  createdAt: string;
}

export interface SolarSite {
  id: string;
  name: string;
  location: string;
  capacity: number; // kW
  status: 'online' | 'warning' | 'offline';
  clientId: string;
  installDate: string;
}

export interface ProductionData {
  timestamp: string;
  production: number; // kWh
  consumption: number; // kWh
  batteryLevel: number; // %
  gridUsage: number; // kWh
  solarUsage: number; // kWh
  batteryUsage: number; // kWh
}

export interface Alert {
  id: string;
  siteId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  aiRecommendation?: string;
}

export interface MaintenanceTask {
  id: string;
  siteId: string;
  title: string;
  description: string;
  scheduledDate: string;
  completedDate?: string;
  technician?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface SystemHealth {
  siteId: string;
  overallScore: number; // 0-100
  components: {
    inverter: number;
    battery: number;
    panels: number;
    monitoring: number;
  };
  lastUpdate: string;
}