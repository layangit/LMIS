import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-react';

interface RuleConfigurationProps {
  email: string;
  onLogout: () => void;
}

interface Rule {
  id: string;
  itemType: string;
  authorizedZone: string;
  timeWindow: string;
  authorizedHandler: string;
  severity: 'critical' | 'warning' | 'info';
  stakeholders: string[];
  status: 'active' | 'inactive';
}

export default function RuleConfiguration({ email, onLogout }: RuleConfigurationProps) {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: 'RULE-001',
      itemType: 'Steel Beams',
      authorizedZone: 'Zone A-1, Zone A-2',
      timeWindow: '06:00 - 18:00',
      authorizedHandler: 'Crane Operator, Site Manager',
      severity: 'critical',
      stakeholders: ['Site Manager', 'Security Officer', 'Admin'],
      status: 'active',
    },
    {
      id: 'RULE-002',
      itemType: 'Concrete Mix',
      authorizedZone: 'Zone B-1, Delivery Zone',
      timeWindow: '05:00 - 20:00',
      authorizedHandler: 'Delivery Personnel, Site Manager',
      severity: 'warning',
      stakeholders: ['Site Manager', 'Admin'],
      status: 'active',
    },
    {
      id: 'RULE-003',
      itemType: 'Excavator Parts',
      authorizedZone: 'Zone C (Restricted)',
      timeWindow: '08:00 - 17:00',
      authorizedHandler: 'Admin Only',
      severity: 'critical',
      stakeholders: ['Admin', 'Security Officer'],
      status: 'active',
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'warning': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'info': return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <DashboardLayout role="admin" email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">Rule Configuration</h1>
            <p className="text-sm text-gray-400">Define movement rules and alert parameters</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Rule</span>
          </button>
        </div>

        {/* Rule List */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <div key={rule.id} className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg text-white font-semibold">{rule.itemType}</h3>
                    <span className={`text-xs px-3 py-1 rounded border ${getSeverityColor(rule.severity)}`}>
                      {rule.severity.toUpperCase()}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      rule.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Rule ID: {rule.id}</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Authorized Zone</label>
                    <p className="text-sm text-white">{rule.authorizedZone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Allowed Time Window</label>
                    <p className="text-sm text-white">{rule.timeWindow}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Authorized Handler/Vehicle</label>
                    <p className="text-sm text-white">{rule.authorizedHandler}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide mb-1 block">Stakeholders to Notify</label>
                    <div className="flex flex-wrap gap-2">
                      {rule.stakeholders.map((stakeholder, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-[#1a1f2e] text-gray-300 rounded">
                          {stakeholder}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Card */}
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-400 mb-1">Rule Priority</h3>
              <p className="text-sm text-gray-300">
                Rules are evaluated in order. If an item matches multiple rules, the first matching rule takes precedence.
                Critical severity rules trigger immediate notifications to all stakeholders.
              </p>
            </div>
          </div>
        </div>

        {/* Create Rule Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
            <div className="bg-[#0f1419] border border-[#1e2735] rounded-xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-xl font-semibold text-white mb-6">Create New Rule</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Item Type</label>
                    <input
                      type="text"
                      className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                      placeholder="e.g., Steel Beams, Concrete Mix"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Alert Severity Level</label>
                    <select className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white">
                      <option value="critical">Critical</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Authorized Zone(s)</label>
                  <input
                    type="text"
                    className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., Zone A-1, Zone A-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Allowed Time Window</label>
                    <input
                      type="text"
                      className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                      placeholder="06:00 - 18:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Authorized Handler/Vehicle</label>
                    <input
                      type="text"
                      className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg px-4 py-2 text-white"
                      placeholder="e.g., Crane Operator, Site Manager"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Stakeholders to Notify</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 p-3 bg-[#1a1f2e] rounded-lg cursor-pointer hover:bg-[#2a3441]">
                      <input type="checkbox" className="w-4 h-4 text-[#3b82f6]" defaultChecked />
                      <span className="text-sm text-white">Admin</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 bg-[#1a1f2e] rounded-lg cursor-pointer hover:bg-[#2a3441]">
                      <input type="checkbox" className="w-4 h-4 text-[#3b82f6]" defaultChecked />
                      <span className="text-sm text-white">Site Manager</span>
                    </label>
                    <label className="flex items-center space-x-2 p-3 bg-[#1a1f2e] rounded-lg cursor-pointer hover:bg-[#2a3441]">
                      <input type="checkbox" className="w-4 h-4 text-[#3b82f6]" />
                      <span className="text-sm text-white">Security Officer</span>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-lg transition-colors"
                  >
                    Create Rule
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
