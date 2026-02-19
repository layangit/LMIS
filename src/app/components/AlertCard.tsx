import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, AlertCircle, Info, Clock } from 'lucide-react';

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  type: string;
  severity: AlertSeverity;
  message: string;
  location: string;
  timestamp: string;
  itemId?: string;
}

interface AlertCardProps {
  alert: Alert;
  onClick?: () => void;
}

export default function AlertCard({ alert, onClick }: AlertCardProps) {
  const navigate = useNavigate();

  const severityConfig = {
    critical: {
      icon: AlertTriangle,
      bg: 'bg-red-600/10',
      border: 'border-red-600/30',
      text: 'text-red-400',
      iconBg: 'bg-red-600/20',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-amber-600/10',
      border: 'border-amber-600/30',
      text: 'text-amber-400',
      iconBg: 'bg-amber-600/20',
    },
    info: {
      icon: Info,
      bg: 'bg-blue-600/10',
      border: 'border-blue-600/30',
      text: 'text-blue-400',
      iconBg: 'bg-blue-600/20',
    },
  };

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/alert/${alert.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${config.bg} ${config.border} border rounded-lg p-4 cursor-pointer hover:bg-opacity-20 transition-all`}
    >
      <div className="flex items-start space-x-3">
        <div className={`${config.iconBg} p-2 rounded-lg`}>
          <Icon className={`w-4 h-4 ${config.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs uppercase tracking-wide ${config.text}`}>
              {alert.severity}
            </span>
            <span className="text-xs text-gray-400 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {alert.timestamp}
            </span>
          </div>
          <div className="text-sm text-white mb-1">{alert.type}</div>
          <div className="text-xs text-gray-400 mb-2">{alert.message}</div>
          <div className="text-xs text-gray-500">Location: {alert.location}</div>
        </div>
      </div>
    </div>
  );
}
