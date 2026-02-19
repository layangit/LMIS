import { Activity, Radio, Database, Zap } from 'lucide-react';
import { systemMetrics } from '../data/mockData';

export function SystemStatus() {
  const metrics = [
    {
      icon: Database,
      label: 'Data Availability',
      value: `${systemMetrics.dataAvailability}%`,
      color: '#00ff88'
    },
    {
      icon: Radio,
      label: 'Drone Connectivity',
      value: `${systemMetrics.activeDrones}/${systemMetrics.totalDrones} Active`,
      color: '#00d4ff'
    },
    {
      icon: Activity,
      label: 'Event Processing Rate',
      value: `${systemMetrics.eventProcessingRate.toLocaleString()}/min`,
      color: '#00d4ff'
    },
    {
      icon: Zap,
      label: 'Latency',
      value: `${systemMetrics.latency} sec`,
      color: '#00ff88'
    }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 px-6 py-3 border-t backdrop-blur-md"
      style={{
        background: 'rgba(20, 29, 43, 0.95)',
        borderColor: 'rgba(0, 212, 255, 0.2)'
      }}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00ff88' }} />
          <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            System Operational
          </span>
        </div>

        <div className="flex items-center gap-8 flex-1 justify-end">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
              <div className="flex flex-col">
                <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {metric.label}
                </span>
                <span className="text-xs" style={{ color: metric.color }}>
                  {metric.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
