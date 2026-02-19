import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MetricCard from '../components/MetricCard';
import AlertCard, { type Alert } from '../components/AlertCard';
import { Shield, AlertTriangle, Eye, CheckCircle, RefreshCw, Video, Image as ImageIcon } from 'lucide-react';

interface SecurityOfficerDashboardProps {
  email: string;
  onLogout: () => void;
}

export default function SecurityOfficerDashboard({ email, onLogout }: SecurityOfficerDashboardProps) {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mockAlerts: Alert[] = [
    {
      id: 'SEC-001',
      type: 'Zone Breach',
      severity: 'critical',
      message: 'Unauthorized vehicle detected in restricted area',
      location: 'Zone C - High Security',
      timestamp: '5 min ago',
    },
    {
      id: 'SEC-002',
      type: 'Unauthorized Movement',
      severity: 'critical',
      message: 'Steel beams moved outside authorized zone during non-scheduled hours',
      location: 'Zone A - Storage Area 3',
      timestamp: '12 min ago',
    },
    {
      id: 'SEC-003',
      type: 'Suspicious Activity',
      severity: 'warning',
      message: 'Unusual pattern detected - Multiple movements after hours',
      location: 'Zone B - Equipment Storage',
      timestamp: '28 min ago',
    },
  ];

  const incidents = [
    {
      id: 'INC-001',
      type: 'Zone Breach',
      severity: 'critical',
      timestamp: '2026-02-18 08:45:23',
      location: 'Zone C - High Security',
      description: 'Unauthorized vehicle (Plate: ABC-1234) detected in restricted zone',
      status: 'under-review',
      evidence: { images: 3, videos: 1 },
    },
    {
      id: 'INC-002',
      type: 'After-Hours Movement',
      severity: 'critical',
      timestamp: '2026-02-18 07:32:11',
      location: 'Zone A - Storage Area 3',
      description: 'Steel beams (STL-8847) moved at 02:15 AM without authorization',
      status: 'under-review',
      evidence: { images: 5, videos: 2 },
    },
    {
      id: 'INC-003',
      type: 'Unauthorized Access',
      severity: 'warning',
      timestamp: '2026-02-17 22:18:45',
      location: 'Zone B - Equipment Storage',
      description: 'Unknown personnel detected near equipment storage',
      status: 'resolved',
      evidence: { images: 2, videos: 0 },
    },
  ];

  const handleIncidentAction = (id: string, action: 'resolve' | 'escalate') => {
    console.log(`${action} incident ${id}`);
  };

  return (
    <DashboardLayout role="security-officer" email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Security Officer Dashboard</h1>
            <p className="text-sm text-gray-400">Monitor security incidents and unauthorized activities</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
            <span>Last update: {lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard icon={Shield} label="Active Monitors" value="12" />
          <MetricCard icon={AlertTriangle} label="Active Alerts" value="3" trend={{ value: -2, isPositive: true }} />
          <MetricCard icon={Eye} label="Incidents Today" value="7" />
          <MetricCard icon={CheckCircle} label="Resolved Today" value="4" trend={{ value: 1, isPositive: true }} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Monitoring Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Live Monitoring Feed</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((feed) => (
                  <div key={feed} className="relative bg-[#1a1f2e] border border-[#2a3441] rounded-lg overflow-hidden aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="w-12 h-12 text-gray-600" />
                    </div>
                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      Camera {feed}
                    </div>
                    <div className="absolute top-2 right-2 flex items-center space-x-1 bg-red-600/80 px-2 py-1 rounded">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      <span className="text-xs text-white">REC</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {lastRefresh.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incident Review Panel */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Incident Review</h2>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div key={incident.id} className="bg-[#1a1f2e] border border-[#2a3441] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`text-xs px-2 py-1 rounded uppercase ${
                            incident.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {incident.severity}
                          </span>
                          <span className="text-sm text-white font-medium">{incident.type}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{incident.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span>{incident.timestamp}</span>
                          <span>•</span>
                          <span>{incident.location}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        incident.status === 'resolved' ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {incident.status}
                      </span>
                    </div>

                    {/* Evidence */}
                    <div className="flex items-center space-x-4 mb-3 p-3 bg-[#0f1419] rounded">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-400">{incident.evidence.images} Images</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Video className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-400">{incident.evidence.videos} Videos</span>
                      </div>
                    </div>

                    {/* Actions */}
                    {incident.status === 'under-review' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleIncidentAction(incident.id, 'resolve')}
                          className="flex-1 px-4 py-2 bg-green-600/10 hover:bg-green-600/20 text-green-400 rounded transition-colors text-sm"
                        >
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => handleIncidentAction(incident.id, 'escalate')}
                          className="flex-1 px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded transition-colors text-sm"
                        >
                          Escalate
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Unauthorized Movement Alerts */}
          <div className="space-y-6">
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Unauthorized Movements</h2>
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Today's Summary</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded">
                  <span className="text-sm text-gray-400">Total Incidents</span>
                  <span className="text-lg text-white font-semibold">7</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded">
                  <span className="text-sm text-gray-400">Critical</span>
                  <span className="text-lg text-red-400 font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded">
                  <span className="text-sm text-gray-400">Warnings</span>
                  <span className="text-lg text-amber-400 font-semibold">4</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded">
                  <span className="text-sm text-gray-400">Resolved</span>
                  <span className="text-lg text-green-400 font-semibold">4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
