import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { theme } from '../../styles/theme';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'online' | 'warning' | 'offline';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  status,
  className = '',
}) => {
  const getStatusColor = () => {
    if (!status) return theme.colors.primary;
    
    switch (status) {
      case 'online':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'offline':
        return theme.colors.status.error;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${getStatusColor()}15` }}
        >
          <Icon 
            className="h-6 w-6" 
            style={{ color: getStatusColor() }}
          />
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {unit && <span className="text-sm text-gray-500">{unit}</span>}
        </div>
      </div>
    </div>
  );
};