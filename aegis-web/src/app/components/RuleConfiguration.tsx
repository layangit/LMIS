import { useState } from 'react';
import { Plus, Play, Pause, Edit, Trash2, Copy, AlertCircle } from 'lucide-react';
import { mockRules, type Rule, type AlertSeverity } from '../data/mockData';

export function RuleConfiguration() {
  const [rules, setRules] = useState<Rule[]>(mockRules);
  const [isCreatingRule, setIsCreatingRule] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2" style={{ color: '#ffffff' }}>
            Rule Configuration & Automation
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Define movement rules, violation detection, and automated responses
          </p>
        </div>
        <button
          onClick={() => setIsCreatingRule(!isCreatingRule)}
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
          style={{
            background: '#00d4ff',
            color: '#0B1220'
          }}
        >
          <Plus className="w-4 h-4" />
          Create New Rule
        </button>
      </div>

      {/* Rule Builder (Visible when creating) */}
      {isCreatingRule && (
        <div 
          className="p-6 rounded-xl border backdrop-blur-md"
          style={{
            background: 'rgba(20, 29, 43, 0.6)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 212, 255, 0.2)'
          }}
        >
          <h3 className="text-lg mb-4" style={{ color: '#ffffff' }}>
            Rule Builder
          </h3>

          <div className="space-y-6">
            {/* Rule Name */}
            <div>
              <label className="block text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Rule Name
              </label>
              <input
                type="text"
                placeholder="e.g., Equipment Movement Authorization"
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  background: 'rgba(11, 18, 32, 0.6)',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  color: '#ffffff'
                }}
              />
            </div>

            {/* IF Conditions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="px-3 py-1 rounded text-sm"
                  style={{
                    background: 'rgba(0, 212, 255, 0.2)',
                    color: '#00d4ff'
                  }}
                >
                  IF
                </div>
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Define conditions that trigger this rule
                </span>
              </div>

              <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: 'rgba(0, 212, 255, 0.3)' }}>
                {/* Item Type Condition */}
                <div className="grid grid-cols-3 gap-3">
                  <select
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(11, 18, 32, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      color: '#ffffff'
                    }}
                  >
                    <option value="">Select Property</option>
                    <option value="itemType">Item Type</option>
                    <option value="zone">Zone</option>
                    <option value="handler">Handler</option>
                    <option value="time">Time Window</option>
                  </select>

                  <select
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(11, 18, 32, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      color: '#ffffff'
                    }}
                  >
                    <option value="equals">Equals</option>
                    <option value="not_equals">Not Equals</option>
                    <option value="contains">Contains</option>
                    <option value="outside">Outside</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Value"
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(11, 18, 32, 0.6)',
                      border: '1px solid rgba(0, 212, 255, 0.2)',
                      color: '#ffffff'
                    }}
                  />
                </div>

                <button
                  className="px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 transition-all"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#00d4ff',
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                  }}
                >
                  <Plus className="w-3 h-3" />
                  Add Condition (AND)
                </button>
              </div>
            </div>

            {/* THEN Actions */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="px-3 py-1 rounded text-sm"
                  style={{
                    background: 'rgba(255, 184, 0, 0.2)',
                    color: '#ffb800'
                  }}
                >
                  THEN
                </div>
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Define actions to execute
                </span>
              </div>

              <div className="space-y-3 pl-4 border-l-2" style={{ borderColor: 'rgba(255, 184, 0, 0.3)' }}>
                {/* Alert Level */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Alert Level
                  </label>
                  <div className="flex gap-2">
                    {(['low', 'medium', 'high', 'critical'] as AlertSeverity[]).map((level) => (
                      <button
                        key={level}
                        className="px-3 py-1.5 rounded-lg text-xs transition-all"
                        style={{
                          background: 
                            level === 'critical' ? 'rgba(255, 59, 92, 0.2)' :
                            level === 'high' ? 'rgba(255, 184, 0, 0.2)' :
                            level === 'medium' ? 'rgba(0, 212, 255, 0.2)' :
                            'rgba(255, 255, 255, 0.1)',
                          color: 
                            level === 'critical' ? '#ff3b5c' :
                            level === 'high' ? '#ffb800' :
                            level === 'medium' ? '#00d4ff' :
                            'rgba(255, 255, 255, 0.7)',
                          border: '1px solid',
                          borderColor:
                            level === 'critical' ? 'rgba(255, 59, 92, 0.3)' :
                            level === 'high' ? 'rgba(255, 184, 0, 0.3)' :
                            level === 'medium' ? 'rgba(0, 212, 255, 0.3)' :
                            'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {level.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notify */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Notify
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Admin', 'Site Manager', 'Security'].map((role) => (
                      <label 
                        key={role}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer"
                        style={{
                          background: 'rgba(11, 18, 32, 0.6)',
                          border: '1px solid rgba(0, 212, 255, 0.2)'
                        }}
                      >
                        <input type="checkbox" className="w-3 h-3" />
                        <span className="text-xs" style={{ color: '#ffffff' }}>{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <button
                className="flex-1 px-4 py-2 rounded-lg transition-all"
                style={{
                  background: '#00d4ff',
                  color: '#0B1220'
                }}
              >
                Create Rule
              </button>
              <button
                onClick={() => setIsCreatingRule(false)}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Rules List */}
      <div className="space-y-3">
        <h3 className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Active Rules ({rules.filter(r => r.enabled).length} of {rules.length})
        </h3>

        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-xl border backdrop-blur-md"
            style={{
              background: 'rgba(20, 29, 43, 0.6)',
              borderColor: rule.enabled ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-sm" style={{ color: '#ffffff' }}>
                    {rule.name}
                  </h4>
                  <span 
                    className="text-xs px-2 py-0.5 rounded"
                    style={{
                      background: rule.enabled ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      color: rule.enabled ? '#00ff88' : 'rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {rule.enabled ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {rule.id}
                </p>

                {/* Rule Logic Display */}
                <div className="flex items-start gap-3">
                  {/* IF Section */}
                  <div className="flex-1">
                    <div 
                      className="inline-block px-2 py-0.5 rounded text-xs mb-2"
                      style={{
                        background: 'rgba(0, 212, 255, 0.2)',
                        color: '#00d4ff'
                      }}
                    >
                      IF
                    </div>
                    <div className="space-y-1">
                      {rule.conditions.itemType && (
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          • Item Type = <span style={{ color: '#00d4ff' }}>{rule.conditions.itemType}</span>
                        </div>
                      )}
                      {rule.conditions.zone && (
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          • Zone ≠ <span style={{ color: '#00d4ff' }}>{rule.conditions.zone}</span>
                        </div>
                      )}
                      {rule.conditions.timeWindow && (
                        <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          • Time Outside <span style={{ color: '#00d4ff' }}>{rule.conditions.timeWindow}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="pt-4">
                    <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>→</span>
                  </div>

                  {/* THEN Section */}
                  <div className="flex-1">
                    <div 
                      className="inline-block px-2 py-0.5 rounded text-xs mb-2"
                      style={{
                        background: 'rgba(255, 184, 0, 0.2)',
                        color: '#ffb800'
                      }}
                    >
                      THEN
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        • Alert Level: <span 
                          style={{ 
                            color: 
                              rule.actions.alertLevel === 'critical' ? '#ff3b5c' :
                              rule.actions.alertLevel === 'high' ? '#ffb800' :
                              '#00d4ff'
                          }}
                        >
                          {rule.actions.alertLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        • Notify: <span style={{ color: '#00d4ff' }}>{rule.actions.notify.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                <button 
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#00d4ff'
                  }}
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: 'rgba(0, 212, 255, 0.1)',
                    color: '#00d4ff'
                  }}
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: rule.enabled ? 'rgba(255, 184, 0, 0.1)' : 'rgba(0, 255, 136, 0.1)',
                    color: rule.enabled ? '#ffb800' : '#00ff88'
                  }}
                  title={rule.enabled ? 'Disable' : 'Enable'}
                >
                  {rule.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button 
                  className="p-2 rounded-lg transition-all"
                  style={{
                    background: 'rgba(255, 59, 92, 0.1)',
                    color: '#ff3b5c'
                  }}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rule Stats */}
            <div className="flex items-center gap-6 pt-3 border-t text-xs" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Triggered: <span style={{ color: '#00d4ff' }}>24 times</span>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Last 24h: <span style={{ color: '#00d4ff' }}>3 alerts</span>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Accuracy: <span style={{ color: '#00ff88' }}>94%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rule Templates */}
      <div 
        className="p-5 rounded-xl border backdrop-blur-md"
        style={{
          background: 'rgba(20, 29, 43, 0.6)',
          borderColor: 'rgba(0, 212, 255, 0.2)'
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-5 h-5" style={{ color: '#00d4ff' }} />
          <h3 className="text-sm" style={{ color: '#ffffff' }}>
            Recommended Rule Templates
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            className="p-3 rounded-lg text-left transition-all"
            style={{
              background: 'rgba(11, 18, 32, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="text-sm mb-1" style={{ color: '#ffffff' }}>
              Night Movement Alert
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Detect after-hours activity
            </div>
          </button>
          <button
            className="p-3 rounded-lg text-left transition-all"
            style={{
              background: 'rgba(11, 18, 32, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="text-sm mb-1" style={{ color: '#ffffff' }}>
              High-Value Asset Protection
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Track expensive equipment
            </div>
          </button>
          <button
            className="p-3 rounded-lg text-left transition-all"
            style={{
              background: 'rgba(11, 18, 32, 0.6)',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}
          >
            <div className="text-sm mb-1" style={{ color: '#ffffff' }}>
              Delivery Window Compliance
            </div>
            <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Ensure timely deliveries
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
