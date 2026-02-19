import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { ArrowLeft, AlertTriangle, MapPin, Clock, Package, DollarSign, Video, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { UserRole } from '../App';

interface AlertDetailsProps {
  email: string;
  role: UserRole;
  onLogout: () => void;
}

export default function AlertDetails({ email, role, onLogout }: AlertDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const alertData = {
    id: id || 'ALR-001',
    type: 'Unauthorized Movement',
    severity: 'critical' as const,
    itemId: 'STL-8847',
    itemName: 'Steel Beams (Grade A)',
    violationType: 'Zone Breach & After-Hours Movement',
    timestamp: '2026-02-18 02:15:34',
    location: 'Zone A - Storage Area 3',
    coordinates: '34.0522° N, 118.2437° W',
    riskScore: 87,
    costImpact: 15000,
    description: 'High-value steel beams were detected moving from Zone A-1 to Zone A-3 outside authorized hours (06:00-18:00). Movement was not authorized and no personnel badge scans were detected.',
    evidence: {
      images: 5,
      videos: 2,
    },
    movementHistory: [
      { time: '02:15:34', location: 'Zone A-1', event: 'Movement started', status: 'unauthorized' },
      { time: '02:18:22', location: 'Transit Path', event: 'Moving north', status: 'unauthorized' },
      { time: '02:22:11', location: 'Zone A-3', event: 'Movement completed', status: 'unauthorized' },
      { time: '02:22:45', location: 'Zone A-3', event: 'Alert triggered', status: 'alert' },
    ],
    recommendedActions: [
      'Immediate site inspection required',
      'Review security camera footage',
      'Verify item location and condition',
      'Contact authorized personnel for verification',
      'File incident report',
    ],
  };

  return (
    <DashboardLayout role={role} email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#1a1f2e] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-white mb-1">Alert Details</h1>
            <p className="text-sm text-gray-400">Alert ID: {alertData.id}</p>
          </div>
        </div>

        {loading ? (
          /* Loading State */
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-12 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-400">Loading alert details...</p>
            <p className="text-xs text-gray-500 mt-2">Target: {'<'}2 seconds</p>
          </div>
        ) : (
          <>
            {/* Alert Summary */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-red-600/10 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-xl text-white font-semibold">{alertData.type}</h2>
                    <span className="text-xs px-3 py-1 rounded bg-red-600/20 text-red-400 border border-red-600/30 uppercase">
                      {alertData.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{alertData.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Item ID</div>
                        <div className="text-sm text-white">{alertData.itemId}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Timestamp</div>
                        <div className="text-sm text-white">{alertData.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Location</div>
                        <div className="text-sm text-white">{alertData.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-400">Violation Type</div>
                        <div className="text-sm text-white">{alertData.violationType}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#2a3441]">
                <div className="bg-[#1a1f2e] border border-[#2a3441] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Risk Score</span>
                    <span className="text-2xl font-semibold text-red-400">{alertData.riskScore}/100</span>
                  </div>
                  <div className="w-full h-2 bg-[#0f1419] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500"
                      style={{ width: `${alertData.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#1a1f2e] border border-[#2a3441] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Estimated Cost Impact</span>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-amber-400" />
                      <span className="text-2xl font-semibold text-amber-400">
                        ${alertData.costImpact.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Movement History Timeline */}
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Movement History Timeline</h3>
              <div className="space-y-4">
                {alertData.movementHistory.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.status === 'alert' ? 'bg-red-600/20 border-2 border-red-600' :
                        event.status === 'unauthorized' ? 'bg-amber-600/20 border-2 border-amber-600' :
                        'bg-green-600/20 border-2 border-green-600'
                      }`}>
                        {event.status === 'alert' ? (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        ) : (
                          <MapPin className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      {index < alertData.movementHistory.length - 1 && (
                        <div className="w-0.5 h-12 bg-[#2a3441] my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{event.event}</span>
                        <span className="text-xs text-gray-400">{event.time}</span>
                      </div>
                      <div className="text-sm text-gray-400">{event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence & Recommended Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Evidence */}
              <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Video/Image Evidence</h3>
                <div className="space-y-4">
                  <div className="bg-[#1a1f2e] border border-[#2a3441] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Video className="w-5 h-5 text-[#3b82f6]" />
                        <span className="text-sm text-white">Video Recordings</span>
                      </div>
                      <span className="text-sm text-gray-400">{alertData.evidence.videos} files</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[#0f1419] aspect-video rounded flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="bg-[#0f1419] aspect-video rounded flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1a1f2e] border border-[#2a3441] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="w-5 h-5 text-[#3b82f6]" />
                        <span className="text-sm text-white">Image Captures</span>
                      </div>
                      <span className="text-sm text-gray-400">{alertData.evidence.images} files</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="bg-[#0f1419] aspect-square rounded flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  {alertData.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-[#1a1f2e] rounded-lg hover:bg-[#2a3441] transition-colors cursor-pointer">
                      <CheckCircle className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{action}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#2a3441]">
                  <button className="w-full px-4 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors font-medium">
                    Acknowledge & Take Action
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
