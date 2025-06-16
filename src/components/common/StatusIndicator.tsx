import React from 'react';
import { Circle } from 'lucide-react';

type Status = 'online' | 'offline' | 'warning' | 'critical' | 'low' | 'medium' | 'high';

interface Props {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
}

const statusStyles: Record<Status, { color: string; label: string }> = {
  online: { color: 'text-green-500', label: 'En ligne' },
  offline: { color: 'text-gray-400', label: 'Hors ligne' },
  warning: { color: 'text-yellow-500', label: 'Avertissement' },
  critical: { color: 'text-red-600', label: 'Critique' },
  low: { color: 'text-green-500', label: 'Faible' },
  medium: { color: 'text-yellow-500', label: 'Moyenne' },
  high: { color: 'text-orange-500', label: 'Élevée' },
};

export const StatusIndicator: React.FC<Props> = ({ status, size = 'md' }) => {
  const style = statusStyles[status] || { color: 'text-gray-400', label: 'Inconnu' };

  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center space-x-1">
      <Circle className={`${style.color} ${sizeMap[size]}`} fill="currentColor" strokeWidth={0} />
      <span className="text-sm text-gray-700">{style.label}</span>
    </div>
  );
};
