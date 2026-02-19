import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { mockZones, mockAssets, mockDrones } from '../data/mockData';

interface SiteMapProps {
  showDrones?: boolean;
  showAssets?: boolean;
  showHeatmap?: boolean;
  interactive?: boolean;
  height?: string;
}

export function SiteMap({ 
  showDrones = true, 
  showAssets = true, 
  showHeatmap = false,
  interactive = true,
  height = '600px'
}: SiteMapProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [time, setTime] = useState(0);

  // Animate drones moving
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="relative rounded-xl border overflow-hidden"
      style={{ 
        height,
        background: '#0B1220',
        borderColor: 'rgba(0, 212, 255, 0.2)'
      }}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* SVG Container */}
      <svg 
        viewBox="0 0 800 600" 
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        {/* Heatmap Overlay (if enabled) */}
        {showHeatmap && (
          <g opacity="0.3">
            <circle cx="200" cy="150" r="80" fill="#ff3b5c" filter="blur(40px)" />
            <circle cx="550" cy="200" r="60" fill="#ffb800" filter="blur(40px)" />
            <circle cx="200" cy="450" r="70" fill="#00d4ff" filter="blur(40px)" />
          </g>
        )}

        {/* Zones */}
        {mockZones.map((zone) => (
          <g 
            key={zone.id}
            onMouseEnter={() => interactive && setHoveredZone(zone.id)}
            onMouseLeave={() => interactive && setHoveredZone(null)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            {/* Zone Rectangle */}
            <rect
              x={zone.coordinates.x}
              y={zone.coordinates.y}
              width={zone.coordinates.width}
              height={zone.coordinates.height}
              fill={hoveredZone === zone.id ? zone.color + '40' : zone.color + '20'}
              stroke={zone.color}
              strokeWidth="2"
              strokeDasharray={zone.type === 'restricted' ? '5,5' : 'none'}
              rx="8"
              className="transition-all duration-300"
            />

            {/* Zone Label */}
            <text
              x={zone.coordinates.x + zone.coordinates.width / 2}
              y={zone.coordinates.y + 30}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="600"
            >
              {zone.name.split(' - ')[0]}
            </text>
            
            {/* Zone Type Badge */}
            <text
              x={zone.coordinates.x + zone.coordinates.width / 2}
              y={zone.coordinates.y + 50}
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.6)"
              fontSize="10"
            >
              {zone.schedule}
            </text>
          </g>
        ))}

        {/* Assets */}
        {showAssets && mockAssets.slice(0, 50).map((asset) => (
          <g key={asset.id}>
            <circle
              cx={asset.position.x}
              cy={asset.position.y}
              r="4"
              fill={
                asset.status === 'critical' ? '#ff3b5c' :
                asset.status === 'warning' ? '#ffb800' :
                '#00ff88'
              }
              opacity="0.8"
            />
            {asset.status !== 'normal' && (
              <circle
                cx={asset.position.x}
                cy={asset.position.y}
                r="8"
                fill="none"
                stroke={asset.status === 'critical' ? '#ff3b5c' : '#ffb800'}
                strokeWidth="1"
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="8"
                  to="12"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}

        {/* Drones */}
        {showDrones && mockDrones.map((drone, index) => {
          // Animate drone movement
          const offsetX = Math.sin((time + index * 10) * 0.05) * 20;
          const offsetY = Math.cos((time + index * 10) * 0.05) * 15;
          
          return (
            <g key={drone.id}>
              {/* Drone Icon */}
              <g transform={`translate(${drone.position.x + offsetX}, ${drone.position.y + offsetY})`}>
                {/* Propeller effect */}
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate
                    attributeName="r"
                    from="12"
                    to="16"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Drone body */}
                <path
                  d="M -6,-6 L 6,-6 L 6,6 L -6,6 Z M -8,-8 L -4,-4 M 8,-8 L 4,-4 M 8,8 L 4,4 M -8,8 L -4,4"
                  fill="#00d4ff"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                
                {/* Status indicator */}
                <circle
                  cx="0"
                  cy="0"
                  r="2"
                  fill={drone.status === 'active' ? '#00ff88' : '#ffb800'}
                />
              </g>

              {/* Drone ID Label */}
              <text
                x={drone.position.x + offsetX}
                y={drone.position.y + offsetY + 20}
                textAnchor="middle"
                fill="#00d4ff"
                fontSize="8"
                opacity="0.7"
              >
                {drone.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Zone Info Tooltip */}
      {hoveredZone && interactive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 px-4 py-3 rounded-lg border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.95)',
            borderColor: 'rgba(0, 212, 255, 0.3)'
          }}
        >
          {mockZones.find(z => z.id === hoveredZone) && (
            <div className="space-y-1">
              <h4 className="text-sm" style={{ color: '#00d4ff' }}>
                {mockZones.find(z => z.id === hoveredZone)?.name}
              </h4>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Type: {mockZones.find(z => z.id === hoveredZone)?.type}
              </p>
              <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Schedule: {mockZones.find(z => z.id === hoveredZone)?.schedule}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Legend */}
      <div 
        className="absolute bottom-4 left-4 px-4 py-3 rounded-lg border backdrop-blur-md"
        style={{
          background: 'rgba(20, 29, 43, 0.95)',
          borderColor: 'rgba(0, 212, 255, 0.3)'
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: '#00d4ff' }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Drones ({mockDrones.filter(d => d.status === 'active').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: '#00ff88' }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Normal Assets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ffb800' }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ff3b5c' }} />
            <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
}
