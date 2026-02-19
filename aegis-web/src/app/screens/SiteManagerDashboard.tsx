import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MetricCard from '../components/MetricCard';
import AlertCard, { Alert } from '../components/AlertCard';
import { Package, AlertTriangle, TruckIcon, Clock, MapPin, RefreshCw } from 'lucide-react';

interface SiteManagerDashboardProps {
  email: string;
  onLogout: () => void;
}

export default function SiteManagerDashboard({ email, onLogout }: SiteManagerDashboardProps) {
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
      message: 'Steel beams moved outside authorized zone',
      location: 'Zone A - Storage Area 3',
      timestamp: '2 min ago',
    },
    {
      id: 'ALR-002',
      type: 'Delivery Delay',
      severity: 'warning',
      message: 'Concrete delivery 45 minutes behind schedule',
      location: 'Main Entrance',
      timestamp: '12 min ago',
    },
  ];

  const trackedItems = [
    { id: 'STL-8847', name: 'Steel Beams (Grade A)', location: 'Zone A-3', status: 'normal', lastMoved: '2h ago' },
    { id: 'CON-2234', name: 'Concrete Mix (Type II)', location: 'Zone B-1', status: 'warning', lastMoved: '15m ago' },
    { id: 'EQP-5521', name: 'Excavator Parts', location: 'Zone C-2', status: 'normal', lastMoved: '4h ago' },
    { id: 'MAT-9981', name: 'Insulation Materials', location: 'Zone A-1', status: 'normal', lastMoved: '1h ago' },
  ];

  const deliveries = [
    { id: 'DEL-001', item: 'Concrete Mix', scheduled: '09:00 AM', actual: '09:45 AM', status: 'delayed' },
    { id: 'DEL-002', item: 'Steel Rebar', scheduled: '10:30 AM', actual: '10:25 AM', status: 'on-time' },
    { id: 'DEL-003', item: 'Lumber', scheduled: '02:00 PM', actual: '-', status: 'pending' },
    { id: 'DEL-004', item: 'Electrical Wiring', scheduled: '03:30 PM', actual: '-', status: 'pending' },
  ];

  const movements = [
    { id: 'MOV-001', item: 'STL-8847', from: 'Zone A-1', to: 'Zone A-3', time: '2h ago', status: 'unauthorized' },
    { id: 'MOV-002', item: 'CON-2234', from: 'Delivery', to: 'Zone B-1', time: '15m ago', status: 'authorized' },
    { id: 'MOV-003', item: 'EQP-5521', from: 'Zone C-1', to: 'Zone C-2', time: '4h ago', status: 'authorized' },
  ];

  return (
    <DashboardLayout role="site-manager" email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Site Manager Dashboard</h1>
            <p className="text-sm text-gray-400">Track items, deliveries, and movement events</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin text-green-400" />
            <span>Last update: {lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard icon={Package} label="Tracked Items" value="847" />
          <MetricCard icon={AlertTriangle} label="Unauthorized Movements" value="3" trend={{ value: -2, isPositive: true }} />
          <MetricCard icon={TruckIcon} label="Deliveries Today" value="12" />
          <MetricCard icon={Clock} label="On-Time Rate" value="87%" trend={{ value: 5, isPositive: true }} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Live Monitored Zones</h2>
              <div className="relative w-full h-80 bg-[#1a1f2e] border border-[#2a3441] rounded-lg overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#2a3441 1px, transparent 1px), linear-gradient(90deg, #2a3441 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }}></div>
                
                {/* Zones */}
                <div className="absolute w-32 h-24 left-[15%] top-[20%] rounded-lg border-2 border-green-400/50 bg-green-400/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-white">Zone A</div>
                    <div className="text-xs text-gray-400">34 items</div>
                  </div>
                </div>
                <div className="absolute w-32 h-24 left-[55%] top-[25%] rounded-lg border-2 border-green-400/50 bg-green-400/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-white">Zone B</div>
                    <div className="text-xs text-gray-400">28 items</div>
                  </div>
                </div>
                <div className="absolute w-32 h-24 left-[25%] top-[60%] rounded-lg border-2 border-amber-400/50 bg-amber-400/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-white">Delivery</div>
                    <div className="text-xs text-gray-400">8 items</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item Location Tracking */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Item Location Tracking</h2>
              <div className="space-y-3">
                {trackedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-[#1a1f2e] rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-[#3b82f6]" />
                      <div>
                        <div className="text-sm text-white">{item.name}</div>
                        <div className="text-xs text-gray-400">ID: {item.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white">{item.location}</div>
                      <div className="text-xs text-gray-400">Last moved: {item.lastMoved}</div>
                    </div>
                    <div className={`px-3 py-1 rounded text-xs ${
                      item.status === 'normal' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Active Alerts</h2>
              <div className="space-y-3">
                {mockAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Delivery Status */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Delivery Status</h2>
              <div className="space-y-3">
                {deliveries.map((delivery) => (
                  <div key={delivery.id} className="p-3 bg-[#1a1f2e] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">{delivery.item}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        delivery.status === 'on-time' ? 'bg-green-500/10 text-green-400' :
                        delivery.status === 'delayed' ? 'bg-red-500/10 text-red-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {delivery.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Scheduled: {delivery.scheduled} | Actual: {delivery.actual}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Historical Movement View */}
        <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Movement History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a3441]">
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Movement ID</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Item</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">From</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">To</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Time</th>
                  <th className="text-left py-3 px-4 text-sm text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((movement) => (
                  <tr key={movement.id} className="border-b border-[#2a3441] hover:bg-[#1a1f2e]">
                    <td className="py-3 px-4 text-sm text-white">{movement.id}</td>
                    <td className="py-3 px-4 text-sm text-white">{movement.item}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{movement.from}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{movement.to}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{movement.time}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        movement.status === 'authorized' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {movement.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
