import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MetricCard from '../components/MetricCard';
import AlertCard, { Alert } from '../components/AlertCard';
import { MapPin, Package, Activity, Radio, Plane, RefreshCw, Settings } from 'lucide-react';

interface AdminDashboardProps {
  email: string;
  onLogout: () => void;
}

export default function AdminDashboard({ email, onLogout }: AdminDashboardProps) {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mockAlerts: Alert[] = [
    {
      id: 'ALR-001',
      type: 'Unauthorized Movement',
      severity: 'critical',
      message: 'Steel beams moved outside authorized zone during non-scheduled hours',
      location: 'Zone A - Storage Area 3',
      timestamp: '2 min ago',
      itemId: 'STL-8847',
    },
    {
      id: 'ALR-002',
      type: 'Delivery Delay',
      severity: 'warning',
      message: 'Concrete delivery 45 minutes behind schedule',
      location: 'Main Entrance',
      timestamp: '12 min ago',
      itemId: 'CON-2234',
    },
    {
      id: 'ALR-003',
      type: 'Unusual Pattern Detected',
      severity: 'warning',
      message: 'Frequent movement of equipment outside normal hours',
      location: 'Zone B - Equipment Storage',
      timestamp: '28 min ago',
    },
    {
      id: 'ALR-004',
      type: 'Zone Breach',
      severity: 'critical',
      message: 'Unauthorized vehicle detected in restricted area',
      location: 'Zone C - High Security',
      timestamp: '35 min ago',
    },
  ];

  const zones = [
    { id: 'zone-a', name: 'Storage Area A', x: 15, y: 20, status: 'active', items: 34 },
    { id: 'zone-b', name: 'Storage Area B', x: 55, y: 25, status: 'active', items: 28 },
    { id: 'zone-c', name: 'Restricted Zone', x: 75, y: 60, status: 'warning', items: 12 },
    { id: 'zone-d', name: 'Delivery Zone', x: 25, y: 70, status: 'active', items: 8 },
  ];

  const drones = [
    { id: 'drone-1', x: 30, y: 35, battery: 85 },
    { id: 'drone-2', x: 65, y: 50, battery: 72 },
    { id: 'drone-3', x: 45, y: 65, battery: 91 },
  ];

  const movingAssets = [
    { id: 'asset-1', x: 40, y: 40 },
    { id: 'asset-2', x: 60, y: 55 },
  ];

  return (
    <DashboardLayout role="admin" email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Admin Dashboard</h1>
            <p className="text-sm text-gray-400">Real-time logistics and asset monitoring control</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
            <span>Last update: {lastRefresh.toLocaleTimeString()}</span>
            <span className="text-green-400">(~2s refresh)</span>
          </div>
        </div>

        {/* Top Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <MetricCard icon={MapPin} label="Active Zones" value="12" trend={{ value: 2, isPositive: true }} />
          <MetricCard icon={Package} label="Total Tracked Assets" value="847" />
          <MetricCard icon={Activity} label="Movement Events/min" value="23" trend={{ value: -5, isPositive: false }} />
          <MetricCard icon={Radio} label="System Availability" value="99.5%" trend={{ value: 0.2, isPositive: true }} />
          <MetricCard icon={Plane} label="Active Drones" value="3/5" />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Site Map */}
          <div className="lg:col-span-2">
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Live Site Map</h2>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-gray-400">Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <span className="text-gray-400">Warning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span className="text-gray-400">Drone</span>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative w-full h-96 bg-[#1a1f2e] border border-[#2a3441] rounded-lg overflow-hidden">
                {/* Grid Background */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#2a3441 1px, transparent 1px), linear-gradient(90deg, #2a3441 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}></div>

                {/* Zones */}
                {zones.map((zone) => (
                  <div
                    key={zone.id}
                    className={`absolute w-32 h-24 rounded-lg border-2 flex items-center justify-center ${
                      zone.status === 'active' ? 'border-green-400/50 bg-green-400/5' : 'border-amber-400/50 bg-amber-400/5'
                    }`}
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                  >
                    <div className="text-center">
                      <div className="text-xs text-white font-medium">{zone.name}</div>
                      <div className="text-xs text-gray-400">{zone.items} items</div>
                    </div>
                  </div>
                ))}

                {/* Drones */}
                {drones.map((drone) => (
                  <div
                    key={drone.id}
                    className="absolute w-8 h-8 -ml-4 -mt-4"
                    style={{ left: `${drone.x}%`, top: `${drone.y}%` }}
                  >
                    <div className="relative">
                      <Plane className="w-8 h-8 text-blue-400 animate-pulse" />
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-blue-400">
                        {drone.battery}%
                      </div>
                    </div>
                  </div>
                ))}

                {/* Moving Assets */}
                {movingAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="absolute w-4 h-4 -ml-2 -mt-2 bg-red-500 rounded-full animate-pulse"
                    style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Alerts */}
          <div className="space-y-6">
            {/* Alert List */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
                <button className="text-xs text-[#3b82f6] hover:underline">View All</button>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admin Controls Section */}
        <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Admin Controls</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-6 bg-[#1a1f2e] hover:bg-[#2a3441] border border-[#2a3441] rounded-lg transition-colors group">
              <MapPin className="w-8 h-8 text-[#3b82f6] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white">Define Zones</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-[#1a1f2e] hover:bg-[#2a3441] border border-[#2a3441] rounded-lg transition-colors group">
              <Settings className="w-8 h-8 text-[#3b82f6] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white">Movement Rules</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-[#1a1f2e] hover:bg-[#2a3441] border border-[#2a3441] rounded-lg transition-colors group">
              <Activity className="w-8 h-8 text-[#3b82f6] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white">Alert Priorities</span>
            </button>
            <button className="flex flex-col items-center justify-center p-6 bg-[#1a1f2e] hover:bg-[#2a3441] border border-[#2a3441] rounded-lg transition-colors group">
              <Package className="w-8 h-8 text-[#3b82f6] mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white">User Permissions</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}