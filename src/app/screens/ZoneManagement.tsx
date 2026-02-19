import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Edit2, Trash2, MapPin, Clock, Shield } from 'lucide-react';

interface ZoneManagementProps {
  email: string;
  onLogout: () => void;
}

interface Zone {
  id: string;
  name: string;
  type: 'storage' | 'delivery' | 'restricted' | 'equipment';
  capacity: number;
  currentItems: number;
  authorizedPersonnel: string[];
  scheduleWindow: string;
  status: 'active' | 'inactive';
}

export default function ZoneManagement({ email, onLogout }: ZoneManagementProps) {
  const [zones, setZones] = useState<Zone[]>([
    {
      id: 'ZONE-A1',
      name: 'Storage Area A-1',
      type: 'storage',
      capacity: 50,
      currentItems: 34,
      authorizedPersonnel: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      scheduleWindow: '06:00 - 18:00',
      status: 'active',
    },
    {
      id: 'ZONE-B2',
      name: 'Storage Area B-2',
      type: 'storage',
      capacity: 40,
      currentItems: 28,
      authorizedPersonnel: ['Sarah Williams', 'Tom Brown'],
      scheduleWindow: '06:00 - 18:00',
      status: 'active',
    },
    {
      id: 'ZONE-C1',
      name: 'Restricted Zone C-1',
      type: 'restricted',
      capacity: 20,
      currentItems: 12,
      authorizedPersonnel: ['Admin Only'],
      scheduleWindow: '08:00 - 17:00',
      status: 'active',
    },
    {
      id: 'ZONE-D1',
      name: 'Delivery Zone',
      type: 'delivery',
      capacity: 15,
      currentItems: 8,
      authorizedPersonnel: ['All Personnel'],
      scheduleWindow: '05:00 - 20:00',
      status: 'active',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'storage': return 'bg-blue-500/10 text-blue-400';
      case 'delivery': return 'bg-green-500/10 text-green-400';
      case 'restricted': return 'bg-red-500/10 text-red-400';
      case 'equipment': return 'bg-amber-500/10 text-amber-400';
      default: return 'bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <DashboardLayout role="admin" email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Zone Management</h1>
            <p className="text-sm text-gray-400">Create, edit, and manage monitored zones</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Zone</span>
          </button>
        </div>

        {/* Zone List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg text-white font-semibold">{zone.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${getTypeColor(zone.type)}`}>
                      {zone.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Zone ID: {zone.id}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-[#1a1f2e] rounded transition-colors">
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-red-600/10 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Capacity */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Capacity</span>
                  <span className="text-white">{zone.currentItems} / {zone.capacity}</span>
                </div>
                <div className="w-full h-2 bg-[#1a1f2e] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      (zone.currentItems / zone.capacity) > 0.9 ? 'bg-red-500' :
                      (zone.currentItems / zone.capacity) > 0.7 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(zone.currentItems / zone.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Schedule Window */}
              <div className="mb-4 p-3 bg-[#1a1f2e] rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Schedule Window</span>
                </div>
                <p className="text-sm text-white ml-6">{zone.scheduleWindow}</p>
              </div>

              {/* Authorized Personnel */}
              <div className="mb-4 p-3 bg-[#1a1f2e] rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Authorized Personnel</span>
                </div>
                <div className="ml-6 space-y-1">
                  {zone.authorizedPersonnel.map((person, index) => (
                    <div key={index} className="text-sm text-white">• {person}</div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${zone.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-white capitalize">{zone.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create Zone Form (Modal Placeholder) */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-xl p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold text-white mb-6">Create New Zone</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Zone Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                      placeholder="e.g., Storage Area E-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Zone Type</label>
                    <select className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white">
                      <option>Storage</option>
                      <option>Delivery</option>
                      <option>Restricted</option>
                      <option>Equipment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Capacity</label>
                    <input
                      type="number"
                      className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Schedule Window</label>
                    <input
                      type="text"
                      className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                      placeholder="06:00 - 18:00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Authorized Locations</label>
                  <textarea
                    className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                    rows={3}
                    placeholder="Define authorized storage locations..."
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
                  >
                    Create Zone
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-[#1a1f2e] hover:bg-[#2a3441] text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
