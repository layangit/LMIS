import { TrendingUp, AlertTriangle, Package, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyticsData } from '../data/mockData';

export function Analytics() {
  const pieColors = ['#ff3b5c', '#ffb800', '#00d4ff', '#00ff88', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl mb-2" style={{ color: '#ffffff' }}>
          Analytics & Historical Insights
        </h2>
        <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Data-driven insights for construction intelligence
        </p>
      </div>

      {/* Predictive Analytics Card */}
      <div 
        className="p-6 rounded-xl border backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(138, 92, 246, 0.1))',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 212, 255, 0.2)'
        }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(0, 212, 255, 0.2)' }}
          >
            <TrendingUp className="w-6 h-6" style={{ color: '#00d4ff' }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg mb-2" style={{ color: '#ffffff' }}>
              Predictive Analytics Insight
            </h3>
            <p className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Predicted <span style={{ color: '#ffb800' }}>12% increase</span> in material misplacement next week in Zone C based on activity pattern analysis.
            </p>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              <div>
                Confidence: <span style={{ color: '#00ff88' }}>89%</span>
              </div>
              <div>
                Impact: <span style={{ color: '#ff3b5c' }}>High</span>
              </div>
              <div>
                Recommended Action: Redistribute materials to Zone A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Violation Trends */}
        <div 
          className="p-5 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <h3 className="text-sm mb-4" style={{ color: '#ffffff' }}>
            Violation Trends & Cost Impact
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analyticsData.violationTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="rgba(255, 255, 255, 0.5)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'rgba(20, 29, 43, 0.95)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#ff3b5c" 
                strokeWidth={2}
                dot={{ fill: '#ff3b5c', r: 4 }}
                name="Violations"
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#ffb800" 
                strokeWidth={2}
                dot={{ fill: '#ffb800', r: 4 }}
                name="Cost ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Most Misplaced Asset Types */}
        <div 
          className="p-5 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <h3 className="text-sm mb-4" style={{ color: '#ffffff' }}>
            Most Misplaced Asset Types
          </h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData.misplacedAssetTypes}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {analyticsData.misplacedAssetTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(20, 29, 43, 0.95)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {analyticsData.misplacedAssetTypes.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ background: pieColors[index % pieColors.length] }}
                    />
                    <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {item.type}
                    </span>
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone Activity Analysis */}
      <div 
        className="p-5 rounded-xl border backdrop-blur-md"
        style={{
          background: 'rgba(20, 29, 43, 0.6)',
          borderColor: 'rgba(0, 212, 255, 0.2)'
        }}
      >
        <h3 className="text-sm mb-4" style={{ color: '#ffffff' }}>
          Zone Activity & Violations
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={analyticsData.zoneActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="zone" 
              stroke="rgba(255, 255, 255, 0.5)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255, 255, 255, 0.5)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                background: 'rgba(20, 29, 43, 0.95)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px',
                color: '#ffffff'
              }}
            />
            <Bar dataKey="movements" fill="#00d4ff" radius={[8, 8, 0, 0]} name="Total Movements" />
            <Bar dataKey="violations" fill="#ff3b5c" radius={[8, 8, 0, 0]} name="Violations" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Delivery Metrics & Storage Optimization */}
      <div className="grid grid-cols-2 gap-6">
        {/* Delivery Performance */}
        <div 
          className="p-5 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <h3 className="text-sm mb-4" style={{ color: '#ffffff' }}>
            Delivery Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" style={{ color: '#00ff88' }} />
                <div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    On-Time Deliveries
                  </div>
                  <div className="text-xl" style={{ color: '#ffffff' }}>
                    {analyticsData.deliveryMetrics.onTime}
                  </div>
                </div>
              </div>
              <div className="text-2xl" style={{ color: '#00ff88' }}>
                85%
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255, 184, 0, 0.1)' }}>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" style={{ color: '#ffb800' }} />
                <div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Delayed Deliveries
                  </div>
                  <div className="text-xl" style={{ color: '#ffffff' }}>
                    {analyticsData.deliveryMetrics.delayed}
                  </div>
                </div>
              </div>
              <div className="text-sm" style={{ color: '#ffb800' }}>
                Avg {analyticsData.deliveryMetrics.averageDelay}h delay
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(255, 59, 92, 0.1)' }}>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" style={{ color: '#ff3b5c' }} />
                <div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Missing Items
                  </div>
                  <div className="text-xl" style={{ color: '#ffffff' }}>
                    {analyticsData.deliveryMetrics.missing}
                  </div>
                </div>
              </div>
              <div className="text-sm" style={{ color: '#ff3b5c' }}>
                Critical
              </div>
            </div>
          </div>
        </div>

        {/* Storage Optimization Simulation */}
        <div 
          className="p-5 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <h3 className="text-sm mb-4" style={{ color: '#ffffff' }}>
            Storage Optimization Simulation
          </h3>
          <div className="space-y-4">
            <div 
              className="p-4 rounded-lg border"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                borderColor: 'rgba(0, 212, 255, 0.2)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: '#ffffff' }}>
                  Current Layout Efficiency
                </span>
                <span className="text-lg" style={{ color: '#ffb800' }}>
                  72%
                </span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div 
                  className="h-full rounded-full"
                  style={{ width: '72%', background: '#ffb800' }}
                />
              </div>
            </div>

            <div 
              className="p-4 rounded-lg border"
              style={{
                background: 'rgba(0, 255, 136, 0.05)',
                borderColor: 'rgba(0, 255, 136, 0.2)'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm" style={{ color: '#ffffff' }}>
                  Optimized Layout Projection
                </span>
                <span className="text-lg" style={{ color: '#00ff88' }}>
                  91%
                </span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <div 
                  className="h-full rounded-full"
                  style={{ width: '91%', background: '#00ff88' }}
                />
              </div>
            </div>

            <div 
              className="p-3 rounded-lg"
              style={{ background: 'rgba(0, 212, 255, 0.1)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4" style={{ color: '#00d4ff' }} />
                <span className="text-xs" style={{ color: '#ffffff' }}>
                  Projected Savings
                </span>
              </div>
              <div className="text-2xl" style={{ color: '#00ff88' }}>
                $24,500/week
              </div>
              <div className="text-xs mt-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                19% efficiency improvement
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Heat Map Analysis */}
      <div 
        className="p-5 rounded-xl border backdrop-blur-md"
        style={{
          background: 'rgba(20, 29, 43, 0.6)',
          borderColor: 'rgba(0, 212, 255, 0.2)'
        }}
      >
        <h3 className="text-sm mb-4" style={{ color: '#ffffff' }}>
          Violation Heatmap - High Activity Zones
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {analyticsData.zoneActivity.map((zone, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border"
              style={{
                background: 
                  zone.violations > 15 ? 'rgba(255, 59, 92, 0.1)' :
                  zone.violations > 10 ? 'rgba(255, 184, 0, 0.1)' :
                  'rgba(0, 212, 255, 0.05)',
                borderColor:
                  zone.violations > 15 ? 'rgba(255, 59, 92, 0.3)' :
                  zone.violations > 10 ? 'rgba(255, 184, 0, 0.3)' :
                  'rgba(0, 212, 255, 0.2)'
              }}
            >
              <div className="text-sm mb-2" style={{ color: '#ffffff' }}>
                {zone.zone}
              </div>
              <div className="text-2xl mb-1" style={{ 
                color: 
                  zone.violations > 15 ? '#ff3b5c' :
                  zone.violations > 10 ? '#ffb800' :
                  '#00d4ff'
              }}>
                {zone.violations}
              </div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                violations
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
