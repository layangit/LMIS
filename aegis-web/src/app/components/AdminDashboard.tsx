import { useState } from 'react';
import { Activity, Package, TrendingUp, Shield, AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import { SiteMap } from './SiteMap';
import { mockAlerts, systemMetrics } from '../data/mockData';

interface AdminDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const kpis = [
    {
      icon: Shield,
      label: 'Active Zones',
      value: systemMetrics.activeZones.toString(),
      change: '+2 this week',
      color: '#00d4ff'
    },
    {
      icon: Package,
      label: 'Total Assets',
      value: systemMetrics.totalAssets.toLocaleString(),
      change: '+147 today',
      color: '#00ff88'
    },
    {
      icon: Activity,
      label: 'Movement Events/Min',
      value: systemMetrics.movementEventsPerMin.toString(),
      change: 'Normal range',
      color: '#00d4ff'
    },
    {
      icon: TrendingUp,
      label: 'System Health',
      value: '98.4%',
      change: '+0.3% improvement',
      color: '#00ff88'
    }
  ];

  const priorityAlerts = mockAlerts
    .filter(a => a.status === 'active')
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      {/* KPI Bar */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="p-4 rounded-xl border backdrop-blur-md"
              style={{
                background: 'rgba(20, 29, 43, 0.6)',
                borderColor: 'rgba(0, 212, 255, 0.2)'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: kpi.color + '20' }}
                >
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <span className="text-xs px-2 py-1 rounded" style={{ 
                  background: 'rgba(0, 255, 136, 0.1)',
                  color: '#00ff88' 
                }}>
                  {kpi.change}
                </span>
              </div>
              <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
                {kpi.value}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {kpi.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Site Map - Takes 8 columns */}
        <div className="col-span-8 space-y-4">
          {/* Map Controls */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg" style={{ color: '#ffffff' }}>
              Live Site Monitoring
            </h3>
            <div className="flex items-center gap-2">
              <button 
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{ 
                  background: selectedTimeRange === '24h' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                  color: selectedTimeRange === '24h' ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
                onClick={() => setSelectedTimeRange('24h')}
              >
                24H
              </button>
              <button 
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{ 
                  background: selectedTimeRange === '7d' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                  color: selectedTimeRange === '7d' ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
                onClick={() => setSelectedTimeRange('7d')}
              >
                7D
              </button>
              <button 
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{ 
                  background: selectedTimeRange === '30d' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                  color: selectedTimeRange === '30d' ? '#00d4ff' : 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
                onClick={() => setSelectedTimeRange('30d')}
              >
                30D
              </button>
            </div>
          </div>

          <SiteMap showDrones showAssets interactive height="550px" />

          {/* Admin Controls */}
          <div 
            className="p-4 rounded-xl border backdrop-blur-md"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)'
            }}
          >
            <h4 className="text-sm mb-3" style={{ color: '#ffffff' }}>
              Quick Admin Controls
            </h4>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onNavigate('rules')}
                className="px-4 py-2 rounded-lg text-xs transition-all"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
              >
                Define Movement Rules
              </button>
              <button
                onClick={() => onNavigate('zones')}
                className="px-4 py-2 rounded-lg text-xs transition-all"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
              >
                Manage Zones
              </button>
              <button
                className="px-4 py-2 rounded-lg text-xs transition-all"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00d4ff',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
              >
                User Permissions
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Alerts - Takes 4 columns */}
        <div className="col-span-4">
          <div 
            className="rounded-xl border backdrop-blur-md h-full"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'rgba(0, 212, 255, 0.2)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm" style={{ color: '#ffffff' }}>
                  Priority Alerts
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#ff3b5c' }} />
                  <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {priorityAlerts.length} Active
                  </span>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Sorted by risk score
              </p>
            </div>

            <div className="p-2 space-y-2 overflow-y-auto" style={{ maxHeight: '680px' }}>
              {priorityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    background: 'rgba(11, 18, 32, 0.6)',
                    borderColor: 
                      alert.severity === 'critical' ? 'rgba(255, 59, 92, 0.3)' :
                      alert.severity === 'high' ? 'rgba(255, 184, 0, 0.3)' :
                      'rgba(0, 212, 255, 0.2)'
                  }}
                  onClick={() => onNavigate('alerts', { alertId: alert.id })}
                >
                  {/* Alert Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle 
                        className="w-4 h-4" 
                        style={{ 
                          color: 
                            alert.severity === 'critical' ? '#ff3b5c' :
                            alert.severity === 'high' ? '#ffb800' :
                            '#00d4ff'
                        }} 
                      />
                      <span className="text-xs" style={{ color: '#ffffff' }}>
                        {alert.id}
                      </span>
                    </div>
                    <div 
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: 
                          alert.severity === 'critical' ? 'rgba(255, 59, 92, 0.2)' :
                          alert.severity === 'high' ? 'rgba(255, 184, 0, 0.2)' :
                          'rgba(0, 212, 255, 0.2)',
                        color: 
                          alert.severity === 'critical' ? '#ff3b5c' :
                          alert.severity === 'high' ? '#ffb800' :
                          '#00d4ff'
                      }}
                    >
                      Risk: {alert.riskScore}
                    </div>
                  </div>

                  {/* Alert Info */}
                  <div className="space-y-1 mb-2">
                    <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {alert.violationType}
                    </p>
                    <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {alert.description}
                    </p>
                  </div>

                  {/* Alert Meta */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      <Clock className="w-3 h-3" />
                      <span>{Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago</span>
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {alert.zone}
                    </div>
                  </div>

                  {/* Cost Impact */}
                  <div className="mt-2 pt-2 border-t flex items-center justify-between" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      Cost Impact
                    </span>
                    <span className="text-xs" style={{ color: '#ff3b5c' }}>
                      ${(alert.costImpact / 1000).toFixed(0)}K
                    </span>
                  </div>

                  {/* Investigate Button */}
                  <button
                    className="w-full mt-2 px-3 py-1.5 rounded text-xs flex items-center justify-center gap-1 transition-all"
                    style={{
                      background: 'rgba(0, 212, 255, 0.1)',
                      color: '#00d4ff',
                      border: '1px solid rgba(0, 212, 255, 0.3)'
                    }}
                  >
                    Investigate
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
