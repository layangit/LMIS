import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, AlertTriangle, Package, MapPin, Brain } from 'lucide-react';
import type { UserRole } from '../types';

interface HistoricalAnalyticsProps {
  email: string;
  role: UserRole;
  onLogout: () => void;
}

export default function HistoricalAnalytics({ email, role, onLogout }: HistoricalAnalyticsProps) {
  // Movement Trend Data
  const movementTrendData = [
    { date: '02/11', movements: 145, unauthorized: 3 },
    { date: '02/12', movements: 132, unauthorized: 2 },
    { date: '02/13', movements: 158, unauthorized: 5 },
    { date: '02/14', movements: 142, unauthorized: 1 },
    { date: '02/15', movements: 167, unauthorized: 4 },
    { date: '02/16', movements: 151, unauthorized: 2 },
    { date: '02/17', movements: 139, unauthorized: 3 },
    { date: '02/18', movements: 162, unauthorized: 6 },
  ];

  // Violation Heatmap Data
  const violationHeatmapData = [
    { zone: 'Zone A-1', violations: 12 },
    { zone: 'Zone A-2', violations: 8 },
    { zone: 'Zone A-3', violations: 15 },
    { zone: 'Zone B-1', violations: 6 },
    { zone: 'Zone B-2', violations: 4 },
    { zone: 'Zone C', violations: 22 },
    { zone: 'Delivery', violations: 3 },
  ];

  // Missing Items Data
  const missingItemsData = [
    { category: 'Steel', count: 3, value: 45000 },
    { category: 'Concrete', count: 1, value: 8000 },
    { category: 'Equipment', count: 2, value: 32000 },
    { category: 'Materials', count: 5, value: 12000 },
  ];

  // Storage Utilization
  const storageUtilization = [
    { zone: 'Zone A', utilization: 68 },
    { zone: 'Zone B', utilization: 75 },
    { zone: 'Zone C', utilization: 45 },
    { zone: 'Zone D', utilization: 92 },
  ];

  const getColor = (value: number) => {
    if (value > 15) return '#ef4444';
    if (value > 8) return '#f59e0b';
    return '#3b82f6';
  };

  return (
    <DashboardLayout role={role} email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Historical Analytics</h1>
          <p className="text-sm text-gray-400">Analyze trends, violations, and optimize operations</p>
        </div>

        {/* Movement Trends */}
        <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Movement Trend Analysis</h2>
              <p className="text-sm text-gray-400">Total and unauthorized movements over time</p>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#3b82f6] rounded"></div>
                <span className="text-gray-400">Total Movements</span>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400">Unauthorized</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={movementTrendData}>
              <defs>
                <linearGradient id="colorMovements" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUnauthorized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid #2a3441',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Area type="monotone" dataKey="movements" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMovements)" />
              <Area type="monotone" dataKey="unauthorized" stroke="#ef4444" fillOpacity={1} fill="url(#colorUnauthorized)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Violation Heatmap & Missing Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Violation Heatmap */}
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Frequent Violation Heatmap</h2>
              <p className="text-sm text-gray-400">Violations by zone (last 30 days)</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={violationHeatmapData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="zone" type="category" stroke="#6b7280" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1f2e',
                    border: '1px solid #2a3441',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="violations" radius={[0, 4, 4, 0]}>
                  {violationHeatmapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.violations)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Missing Items Analysis */}
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-1">Missing Item Analysis</h2>
              <p className="text-sm text-gray-400">Items reported missing (last 30 days)</p>
            </div>
            <div className="space-y-4">
              {missingItemsData.map((item, index) => (
                <div key={index} className="bg-[#1a1f2e] border border-[#2a3441] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-red-400" />
                      <span className="text-white font-medium">{item.category}</span>
                    </div>
                    <span className="text-sm text-gray-400">{item.count} items</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">Estimated Value</div>
                    <div className="text-lg text-red-400 font-semibold">${item.value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Total Impact</span>
                  <span className="text-xl text-red-400 font-semibold">
                    ${missingItemsData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Optimization & Predictive Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Storage Optimization */}
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-[#3b82f6]/10 rounded-lg">
                <MapPin className="w-6 h-6 text-[#3b82f6]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Storage Optimization Insights</h2>
                <p className="text-sm text-gray-400">Zone utilization recommendations</p>
              </div>
            </div>

            <div className="space-y-4">
              {storageUtilization.map((zone, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{zone.zone}</span>
                    <span className="text-sm text-gray-400">{zone.utilization}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#1a1f2e] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        zone.utilization > 85 ? 'bg-red-500' :
                        zone.utilization > 70 ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${zone.utilization}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <strong className="text-blue-400">Recommendation:</strong> Zone D is nearing capacity (92%).
                  Consider redistributing items to Zone C (45% utilization) to optimize space usage.
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Pattern Detection */}
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-600/10 rounded-lg">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Predictive Pattern Detection</h2>
                <p className="text-sm text-gray-400">AI-powered insights</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-600/10 border border-amber-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-amber-400 mb-1">After-Hours Pattern Detected</div>
                    <div className="text-sm text-gray-300">
                      Unusual spike in movements between 02:00-04:00 AM over the past 3 days.
                      Recommend increased monitoring during these hours.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-blue-400 mb-1">Delivery Trend Forecast</div>
                    <div className="text-sm text-gray-300">
                      Based on historical data, expect 15% increase in deliveries next week.
                      Delivery zone may need additional capacity.
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-green-400 mb-1">Efficiency Improvement</div>
                    <div className="text-sm text-gray-300">
                      Item movement efficiency improved by 12% this week compared to last week.
                      Current workflow optimizations showing positive results.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
