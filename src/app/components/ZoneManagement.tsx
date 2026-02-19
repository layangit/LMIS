import { useState } from 'react';
import { Map, Plus, Edit, Trash2, Save, Settings } from 'lucide-react';
import { mockZones, type Zone } from '../data/mockData';

export function ZoneManagement() {
  const [zones, setZones] = useState<Zone[]>(mockZones);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [highSensitivityMode, setHighSensitivityMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2" style={{ color: '#ffffff' }}>
            Zone Management & Configuration
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Define zones, assign rules, and configure access control
          </p>
        </div>
        <button
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          style={{
            background: '#00d4ff',
            color: '#0B1220'
          }}
        >
          <Plus className="w-4 h-4" />
          Create New Zone
        </button>
      </div>

      {/* High Sensitivity Toggle */}
      <div 
        className="p-4 rounded-xl border backdrop-blur-md flex items-center justify-between"
        style={{
          background: highSensitivityMode ? 'rgba(255, 59, 92, 0.1)' : 'rgba(20, 29, 43, 0.6)',
          borderColor: highSensitivityMode ? 'rgba(255, 59, 92, 0.3)' : 'rgba(0, 212, 255, 0.2)'
        }}
      >
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5" style={{ color: highSensitivityMode ? '#ff3b5c' : '#00d4ff' }} />
          <div>
            <h4 className="text-sm mb-1" style={{ color: '#ffffff' }}>
              High Sensitivity Mode
            </h4>
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Increase alert threshold for all zones
            </p>
          </div>
        </div>
        <button
          onClick={() => setHighSensitivityMode(!highSensitivityMode)}
          className="relative w-14 h-7 rounded-full transition-all"
          style={{
            background: highSensitivityMode ? '#ff3b5c' : 'rgba(255, 255, 255, 0.2)'
          }}
        >
          <div 
            className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
            style={{
              left: highSensitivityMode ? '32px' : '4px'
            }}
          />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Interactive Site Blueprint */}
        <div className="col-span-8">
          <div 
            className="rounded-xl border backdrop-blur-md p-4"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm" style={{ color: '#ffffff' }}>
                Site Blueprint Editor
              </h3>
              <div className="flex items-center gap-2">
                <button 
                  className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#00d4ff',
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <Edit className="w-3 h-3" />
                  Edit Mode
                </button>
                <button 
                  className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
                  style={{
                    background: 'rgba(0, 255, 136, 0.1)',
                    color: '#00ff88',
                    border: '1px solid rgba(0, 255, 136, 0.3)'
                  }}
                >
                  <Save className="w-3 h-3" />
                  Save Changes
                </button>
              </div>
            </div>

            {/* SVG Blueprint */}
            <div 
              className="relative rounded-lg border overflow-hidden"
              style={{
                background: '#0B1220',
                borderColor: 'rgba(0, 212, 255, 0.2)',
                height: '600px'
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

              <svg viewBox="0 0 800 600" className="w-full h-full">
                {zones.map((zone) => (
                  <g 
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={zone.coordinates.x}
                      y={zone.coordinates.y}
                      width={zone.coordinates.width}
                      height={zone.coordinates.height}
                      fill={selectedZone?.id === zone.id ? zone.color + '40' : zone.color + '20'}
                      stroke={zone.color}
                      strokeWidth={selectedZone?.id === zone.id ? '3' : '2'}
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
                      {zone.name}
                    </text>

                    {/* Zone Type Badge */}
                    <text
                      x={zone.coordinates.x + zone.coordinates.width / 2}
                      y={zone.coordinates.y + 50}
                      textAnchor="middle"
                      fill="rgba(255, 255, 255, 0.6)"
                      fontSize="10"
                    >
                      {zone.type.toUpperCase()}
                    </text>

                    {/* Resize Handles (when selected) */}
                    {selectedZone?.id === zone.id && (
                      <>
                        <circle
                          cx={zone.coordinates.x + zone.coordinates.width}
                          cy={zone.coordinates.y + zone.coordinates.height}
                          r="6"
                          fill={zone.color}
                          style={{ cursor: 'nwse-resize' }}
                        />
                        <circle
                          cx={zone.coordinates.x + zone.coordinates.width}
                          cy={zone.coordinates.y}
                          r="6"
                          fill={zone.color}
                          style={{ cursor: 'nesw-resize' }}
                        />
                        <circle
                          cx={zone.coordinates.x}
                          cy={zone.coordinates.y + zone.coordinates.height}
                          r="6"
                          fill={zone.color}
                          style={{ cursor: 'nesw-resize' }}
                        />
                        <circle
                          cx={zone.coordinates.x}
                          cy={zone.coordinates.y}
                          r="6"
                          fill={zone.color}
                          style={{ cursor: 'nwse-resize' }}
                        />
                      </>
                    )}
                  </g>
                ))}
              </svg>

              {/* Instructions */}
              <div 
                className="absolute bottom-4 left-4 px-3 py-2 rounded-lg backdrop-blur-md"
                style={{
                  background: 'rgba(20, 29, 43, 0.9)',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                  border: '1px solid'
                }}
              >
                <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Click zones to select • Drag handles to resize • Right-click to configure
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Configuration Panel */}
        <div className="col-span-4">
          <div 
            className="rounded-xl border backdrop-blur-md"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'rgba(0, 212, 255, 0.2)' }}>
              <h3 className="text-sm" style={{ color: '#ffffff' }}>
                {selectedZone ? 'Zone Configuration' : 'Select a Zone'}
              </h3>
            </div>

            {selectedZone ? (
              <div className="p-4 space-y-4">
                {/* Zone Name */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Zone Name
                  </label>
                  <input
                    type="text"
                    value={selectedZone.name}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(11, 18, 32, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#ffffff'
                    }}
                  />
                </div>

                {/* Zone Type */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Zone Type
                  </label>
                  <select
                    value={selectedZone.type}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(11, 18, 32, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#ffffff'
                    }}
                  >
                    <option value="storage">Storage</option>
                    <option value="construction">Construction</option>
                    <option value="restricted">Restricted</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Access Schedule
                  </label>
                  <input
                    type="text"
                    value={selectedZone.schedule}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(11, 18, 32, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.3)',
                      color: '#ffffff'
                    }}
                  />
                </div>

                {/* Authorized Vehicles */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Authorized Vehicles
                  </label>
                  <div className="space-y-2">
                    {selectedZone.authorizedVehicles.map((vehicle, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between px-3 py-2 rounded-lg"
                        style={{
                          background: 'rgba(11, 18, 32, 0.6)',
                          border: '1px solid rgba(0, 212, 255, 0.2)'
                        }}
                      >
                        <span className="text-xs" style={{ color: '#ffffff' }}>
                          {vehicle}
                        </span>
                        <button>
                          <Trash2 className="w-3 h-3" style={{ color: '#ff3b5c' }} />
                        </button>
                      </div>
                    ))}
                    <button
                      className="w-full px-3 py-2 rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
                      style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        color: '#00d4ff',
                        border: '1px solid rgba(0, 212, 255, 0.3)'
                      }}
                    >
                      <Plus className="w-3 h-3" />
                      Add Vehicle
                    </button>
                  </div>
                </div>

                {/* Color Picker */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Zone Color
                  </label>
                  <div className="flex gap-2">
                    {['#00ff88', '#00d4ff', '#ffb800', '#ff3b5c'].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-lg border-2 transition-all"
                        style={{
                          background: color,
                          borderColor: selectedZone.color === color ? '#ffffff' : 'transparent'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Delete Zone */}
                <button
                  className="w-full px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: 'rgba(255, 59, 92, 0.1)',
                    color: '#ff3b5c',
                    border: '1px solid rgba(255, 59, 92, 0.3)'
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Zone
                </button>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Map className="w-12 h-12 mx-auto mb-3" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  Click on a zone in the blueprint to configure its settings
                </p>
              </div>
            )}
          </div>

          {/* Zone Stats */}
          <div 
            className="mt-4 p-4 rounded-xl border backdrop-blur-md"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)'
            }}
          >
            <h4 className="text-sm mb-3" style={{ color: '#ffffff' }}>
              Zone Statistics
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total Zones</span>
                <span style={{ color: '#00d4ff' }}>{zones.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Storage Zones</span>
                <span style={{ color: '#00ff88' }}>{zones.filter(z => z.type === 'storage').length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Restricted Zones</span>
                <span style={{ color: '#ff3b5c' }}>{zones.filter(z => z.type === 'restricted').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
