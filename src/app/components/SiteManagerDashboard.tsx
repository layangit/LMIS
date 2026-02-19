import { TrendingUp, TrendingDown, Clock, Package, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';
import { SiteMap } from './SiteMap';
import { mockMovementEvents, mockAlerts, analyticsData } from '../data/mockData';

export function SiteManagerDashboard() {
  const recentMovements = mockMovementEvents.slice(0, 10);
  const missingItems = mockAlerts.filter(a => a.violationType === 'Missing Item');
  
  const deliveryStats = analyticsData.deliveryMetrics;
  const totalDeliveries = deliveryStats.onTime + deliveryStats.delayed + deliveryStats.missing;

  return (
    <div className="space-y-6">
      {/* Delivery Status Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-5 h-5" style={{ color: '#00ff88' }} />
            <TrendingUp className="w-4 h-4" style={{ color: '#00ff88' }} />
          </div>
          <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
            {deliveryStats.onTime}
          </div>
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            On-Time Deliveries
          </div>
          <div className="text-xs" style={{ color: '#00ff88' }}>
            {((deliveryStats.onTime / totalDeliveries) * 100).toFixed(1)}% success rate
          </div>
        </div>

        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-5 h-5" style={{ color: '#ffb800' }} />
            <TrendingDown className="w-4 h-4" style={{ color: '#ffb800' }} />
          </div>
          <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
            {deliveryStats.delayed}
          </div>
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Delayed Deliveries
          </div>
          <div className="text-xs" style={{ color: '#ffb800' }}>
            Avg {deliveryStats.averageDelay}h delay
          </div>
        </div>

        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <AlertCircle className="w-5 h-5" style={{ color: '#ff3b5c' }} />
          </div>
          <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
            {deliveryStats.missing}
          </div>
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Missing Items
          </div>
          <div className="text-xs" style={{ color: '#ff3b5c' }}>
            Immediate attention required
          </div>
        </div>

        <div
          className="p-4 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <Package className="w-5 h-5" style={{ color: '#00d4ff' }} />
          </div>
          <div className="text-2xl mb-1" style={{ color: '#ffffff' }}>
            {totalDeliveries}
          </div>
          <div className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Total Tracked
          </div>
          <div className="text-xs" style={{ color: '#00d4ff' }}>
            This week
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Site Map */}
        <div className="col-span-7">
          <h3 className="text-lg mb-4" style={{ color: '#ffffff' }}>
            Live Site Operations
          </h3>
          <SiteMap showDrones showAssets interactive height="500px" />
        </div>

        {/* Activity Feed */}
        <div className="col-span-5">
          <h3 className="text-lg mb-4" style={{ color: '#ffffff' }}>
            Movement Activity Feed
          </h3>
          <div 
            className="rounded-xl border backdrop-blur-md"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)',
              maxHeight: '500px'
            }}
          >
            <div className="p-4 space-y-3 overflow-y-auto" style={{ maxHeight: '500px' }}>
              {recentMovements.map((movement, index) => (
                <div
                  key={movement.id}
                  className="p-3 rounded-lg border"
                  style={{
                    background: 'rgba(11, 18, 32, 0.6)',
                    borderColor: movement.authorized 
                      ? 'rgba(0, 255, 136, 0.2)' 
                      : 'rgba(255, 59, 92, 0.3)'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          background: movement.authorized ? '#00ff88' : '#ff3b5c' 
                        }}
                      />
                      <span className="text-xs" style={{ color: '#ffffff' }}>
                        {movement.assetId}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {Math.floor((Date.now() - movement.timestamp.getTime()) / 60000)}m ago
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <span>{movement.fromZone}</span>
                    <span>→</span>
                    <span>{movement.toZone}</span>
                  </div>
                  <div className="mt-2 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Handler: {movement.handler}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations & Missing Items */}
      <div className="grid grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <div
          className="p-5 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(0, 212, 255, 0.2)' }}
            >
              <Lightbulb className="w-5 h-5" style={{ color: '#00d4ff' }} />
            </div>
            <div>
              <h3 className="text-sm" style={{ color: '#ffffff' }}>
                AI-Powered Recommendations
              </h3>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Optimization insights
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div 
              className="p-3 rounded-lg border"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                borderColor: 'rgba(0, 212, 255, 0.2)'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#00d4ff' }} />
                <div className="flex-1">
                  <p className="text-sm mb-1" style={{ color: '#ffffff' }}>
                    Storage Layout Optimization
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Based on historical data, reorganizing Zone B storage layout may reduce misplacement by <span style={{ color: '#00ff88' }}>18%</span>
                  </p>
                </div>
              </div>
              <div className="text-xs pt-2 border-t" style={{ 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.5)' 
              }}>
                Confidence: 87% • Impact: High
              </div>
            </div>

            <div 
              className="p-3 rounded-lg border"
              style={{
                background: 'rgba(0, 212, 255, 0.05)',
                borderColor: 'rgba(0, 212, 255, 0.2)'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#00d4ff' }} />
                <div className="flex-1">
                  <p className="text-sm mb-1" style={{ color: '#ffffff' }}>
                    Delivery Schedule Adjustment
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Shifting concrete deliveries to 7:00 AM could improve efficiency by <span style={{ color: '#00ff88' }}>23%</span> based on traffic patterns
                  </p>
                </div>
              </div>
              <div className="text-xs pt-2 border-t" style={{ 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.5)' 
              }}>
                Confidence: 92% • Impact: Medium
              </div>
            </div>

            <div 
              className="p-3 rounded-lg border"
              style={{
                background: 'rgba(255, 184, 0, 0.05)',
                borderColor: 'rgba(255, 184, 0, 0.2)'
              }}
            >
              <div className="flex items-start gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#ffb800' }} />
                <div className="flex-1">
                  <p className="text-sm mb-1" style={{ color: '#ffffff' }}>
                    Resource Allocation Alert
                  </p>
                  <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Zone C is approaching capacity. Consider redistributing materials to Zone A to prevent bottlenecks
                  </p>
                </div>
              </div>
              <div className="text-xs pt-2 border-t" style={{ 
                borderColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.5)' 
              }}>
                Confidence: 78% • Impact: High
              </div>
            </div>
          </div>
        </div>

        {/* Missing Items Alert */}
        <div
          className="p-5 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(255, 59, 92, 0.3)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255, 59, 92, 0.2)' }}
            >
              <AlertCircle className="w-5 h-5" style={{ color: '#ff3b5c' }} />
            </div>
            <div>
              <h3 className="text-sm" style={{ color: '#ffffff' }}>
                Missing Items Tracker
              </h3>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {missingItems.length} items require attention
              </p>
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '280px' }}>
            {missingItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border"
                style={{
                  background: 'rgba(255, 59, 92, 0.05)',
                  borderColor: 'rgba(255, 59, 92, 0.2)'
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm" style={{ color: '#ffffff' }}>
                    {item.itemId}
                  </span>
                  <span 
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: 'rgba(255, 59, 92, 0.2)',
                      color: '#ff3b5c'
                    }}
                  >
                    ${(item.costImpact / 1000).toFixed(0)}K
                  </span>
                </div>
                <p className="text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  <span>Last seen: {item.zone}</span>
                  <span>{Math.floor((Date.now() - item.timestamp.getTime()) / 60000)}m ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
