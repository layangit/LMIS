import { useState } from 'react';
import { Camera, AlertTriangle, Shield, Activity, Eye, PlayCircle } from 'lucide-react';
import { mockAlerts, mockDrones } from '../data/mockData';

interface SecurityDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export function SecurityDashboard({ onNavigate }: SecurityDashboardProps) {
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  
  const securityAlerts = mockAlerts
    .filter(a => 
      a.violationType === 'Unauthorized Movement' || 
      a.violationType === 'Zone Violation' ||
      a.violationType === 'Failed Access Attempt'
    )
    .sort((a, b) => b.riskScore - a.riskScore);

  const activeDrones = mockDrones.filter(d => d.status === 'active').slice(0, 6);

  // Detect suspicious behavior
  const suspiciousBehavior = securityAlerts.filter(a => 
    a.violationType === 'Failed Access Attempt'
  ).length > 3;

  return (
    <div className="space-y-6">
      {/* Security Status Bar */}
      <div className="grid grid-cols-4 gap-4">
        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5" style={{ color: '#00ff88' }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Security Status
            </span>
          </div>
          <div className="text-2xl mb-1" style={{ color: '#00ff88' }}>
            SECURE
          </div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            All zones monitored
          </div>
        </div>

        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Camera className="w-5 h-5" style={{ color: '#00d4ff' }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Active Surveillance
            </span>
          </div>
          <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
            {activeDrones.length}
          </div>
          <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            Drones deployed
          </div>
        </div>

        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: securityAlerts.filter(a => a.severity === 'critical').length > 0 
              ? 'rgba(255, 59, 92, 0.3)' 
              : 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle 
              className="w-5 h-5" 
              style={{ 
                color: securityAlerts.filter(a => a.severity === 'critical').length > 0 
                  ? '#ff3b5c' 
                  : '#ffb800' 
              }} 
            />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Security Incidents
            </span>
          </div>
          <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
            {securityAlerts.length}
          </div>
          <div className="text-xs" style={{ 
            color: securityAlerts.filter(a => a.severity === 'critical').length > 0 
              ? '#ff3b5c' 
              : '#ffb800' 
          }}>
            {securityAlerts.filter(a => a.severity === 'critical').length} critical
          </div>
        </div>

        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: suspiciousBehavior ? 'rgba(255, 59, 92, 0.1)' : 'rgba(20, 29, 43, 0.6)',
            borderColor: suspiciousBehavior ? 'rgba(255, 59, 92, 0.5)' : 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Eye 
              className="w-5 h-5" 
              style={{ color: suspiciousBehavior ? '#ff3b5c' : '#00d4ff' }} 
            />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Threat Level
            </span>
          </div>
          <div className="text-2xl mb-1" style={{ 
            color: suspiciousBehavior ? '#ff3b5c' : '#00ff88' 
          }}>
            {suspiciousBehavior ? 'ELEVATED' : 'NORMAL'}
          </div>
          {suspiciousBehavior && (
            <div className="text-xs animate-pulse" style={{ color: '#ff3b5c' }}>
              Multiple access attempts detected
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Live Drone Feeds Grid */}
        <div className="col-span-8">
          <h3 className="text-lg mb-4" style={{ color: '#ffffff' }}>
            Live Drone Surveillance Feeds
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {activeDrones.map((drone, index) => (
              <div
                key={drone.id}
                onClick={() => setSelectedFeed(drone.id)}
                className="relative aspect-video rounded-lg border cursor-pointer overflow-hidden transition-all hover:scale-105"
                style={{
                  background: '#000000',
                  borderColor: selectedFeed === drone.id 
                    ? '#00d4ff' 
                    : 'rgba(0, 212, 255, 0.2)',
                  borderWidth: selectedFeed === drone.id ? '2px' : '1px'
                }}
              >
                {/* Simulated Video Feed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at ${50 + index * 10}% ${50 + index * 5}%, rgba(0, 212, 255, 0.1), transparent)`,
                      animation: 'pulse 2s infinite'
                    }}
                  />
                  <Camera className="w-8 h-8" style={{ color: 'rgba(0, 212, 255, 0.3)' }} />
                </div>

                {/* Feed Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
                
                {/* Top Info */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs" style={{ color: '#ff3b5c' }}>REC</span>
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {drone.id}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-xs mb-1" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {drone.currentZone}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Battery: {Math.floor(drone.battery)}%
                    </div>
                    <PlayCircle className="w-4 h-4" style={{ color: '#00d4ff' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Feed - Larger View */}
          {selectedFeed && (
            <div
              className="relative aspect-video rounded-xl border overflow-hidden"
              style={{
                background: '#000000',
                borderColor: 'rgba(0, 212, 255, 0.3)'
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle at 60% 40%, rgba(0, 212, 255, 0.15), transparent)',
                    animation: 'pulse 3s infinite'
                  }}
                />
                <Camera className="w-20 h-20" style={{ color: 'rgba(0, 212, 255, 0.3)' }} />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
              
              {/* HUD Elements */}
              <div className="absolute top-4 left-4 right-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm" style={{ color: '#ff3b5c' }}>LIVE RECORDING</span>
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    {selectedFeed}
                  </span>
                </div>
                
                {/* Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-[#00d4ff] opacity-50">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-px h-4 bg-[#00d4ff]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-px h-4 bg-[#00d4ff]" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-4 h-px bg-[#00d4ff]" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-4 h-px bg-[#00d4ff]" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm mb-1" style={{ color: '#ffffff' }}>
                      {mockDrones.find(d => d.id === selectedFeed)?.currentZone}
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Altitude: 45m • Speed: 12 km/h
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Battery: {Math.floor(mockDrones.find(d => d.id === selectedFeed)?.battery || 0)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Incident Stream */}
        <div className="col-span-4">
          <h3 className="text-lg mb-4" style={{ color: '#ffffff' }}>
            Security Incident Stream
          </h3>
          <div 
            className="rounded-xl border backdrop-blur-md"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="p-2 space-y-2 overflow-y-auto" style={{ maxHeight: '780px' }}>
              {securityAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => onNavigate('alerts', { alertId: alert.id })}
                  className="p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    background: alert.severity === 'critical' 
                      ? 'rgba(255, 59, 92, 0.1)' 
                      : 'rgba(11, 18, 32, 0.6)',
                    borderColor: alert.severity === 'critical' 
                      ? 'rgba(255, 59, 92, 0.4)' 
                      : 'rgba(255, 184, 0, 0.3)'
                  }}
                >
                  {/* Alert Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle 
                        className="w-4 h-4" 
                        style={{ 
                          color: alert.severity === 'critical' ? '#ff3b5c' : '#ffb800' 
                        }} 
                      />
                      <span className="text-xs" style={{ color: '#ffffff' }}>
                        {alert.id}
                      </span>
                    </div>
                    <span 
                      className="text-xs px-2 py-0.5 rounded animate-pulse"
                      style={{
                        background: alert.severity === 'critical' 
                          ? 'rgba(255, 59, 92, 0.3)' 
                          : 'rgba(255, 184, 0, 0.3)',
                        color: alert.severity === 'critical' ? '#ff3b5c' : '#ffb800'
                      }}
                    >
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>

                  {/* Alert Type */}
                  <div className="text-sm mb-2" style={{ color: '#ffffff' }}>
                    {alert.violationType}
                  </div>

                  {/* Description */}
                  <p className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {alert.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs pt-2 border-t" style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)' 
                  }}>
                    <span>{alert.zone}</span>
                    <span>{Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago</span>
                  </div>

                  {/* Risk Score */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                      <div 
                        className="h-full rounded-full"
                        style={{ 
                          width: `${alert.riskScore}%`,
                          background: alert.riskScore > 80 ? '#ff3b5c' : '#ffb800'
                        }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Risk: {alert.riskScore}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="mt-2 flex gap-2">
                    <button
                      className="flex-1 px-2 py-1.5 rounded text-xs transition-all"
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        color: '#00d4ff',
                        border: '1px solid rgba(0, 212, 255, 0.3)'
                      }}
                    >
                      Review
                    </button>
                    <button
                      className="flex-1 px-2 py-1.5 rounded text-xs transition-all"
                      style={{
                        background: 'rgba(255, 59, 92, 0.1)',
                        color: '#ff3b5c',
                        border: '1px solid rgba(255, 59, 92, 0.3)'
                      }}
                    >
                      Escalate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
