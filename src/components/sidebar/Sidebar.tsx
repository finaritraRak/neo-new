import React from 'react';
import { 
  Home, 
  BarChart3, 
  AlertTriangle, 
  Wrench, 
  Users, 
  Settings, 
  LogOut,
  Sun,
  Battery,
  Zap
 

} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { theme } from '../../styles/theme';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: ('admin' | 'technician' | 'client')[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Accueil', icon: Home, roles: ['admin', 'technician', 'client'] },
  { id: 'performance', label: 'Performances', icon: BarChart3, roles: ['admin', 'technician', 'client'] },
  { id: 'alerts', label: 'Alarmes', icon: AlertTriangle, roles: ['admin', 'technician', 'client'] },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, roles: ['admin', 'technician', 'client'] },
  { id: 'users', label: 'Utilisateurs', icon: Users, roles: ['admin'] },
  { id: 'settings', label: 'Paramètres', icon: Settings, roles: ['admin', 'technician'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useUser();

  if (!user) return null;

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div 
      className="h-screen w-64 flex flex-col shadow-lg"
      style={{ backgroundColor: theme.colors.sidebar }}
    >
      {/* Logo and brand */}
      <div className="p-6 border-b border-opacity-20 border-white">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: theme.colors.primary }}
          >
            <Sun className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">NEO</h1>
            <p className="text-sm text-gray-300">Supervision Solaire</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-opacity-20 border-white">
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: theme.colors.primary }}
          >
            {user.firstName?.[0] || '?'}{user.lastName?.[0] || '?'}

          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-300 truncate capitalize">
              {user.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive 
                  ? 'text-white shadow-md' 
                  : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
              }`}
              style={isActive ? { backgroundColor: theme.colors.primary } : {}}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Status indicators */}
      <div className="px-4 py-4 border-t border-opacity-20 border-white">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Battery className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Batterie</span>
            </div>
            <span className="text-green-400 font-semibold">85%</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-gray-300">Production</span>
            </div>
            <span className="text-yellow-400 font-semibold">24.5 kW</span>
          </div>
        </div>
      </div>

      {/* Logout button */}
      <div className="p-4 border-t border-opacity-20 border-white">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};