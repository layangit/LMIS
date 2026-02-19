import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { AlertTriangle, Info, XCircle, Shield, Clock, Filter, Download } from 'lucide-react';

interface SystemLogsProps {
  email: string;
  onLogout: () => void;
}

type LogType = 'error' | 'security' | 'info' | 'all';
type LogSeverity = 'critical' | 'warning' | 'info';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'error' | 'security';
  severity: LogSeverity;
  message: string;
  details: string;
  source: string;
  retention: number;
}

export default function SystemLogs({ email, onLogout }: SystemLogsProps) {
  const [filterType, setFilterType] = useState<LogType>('all');
  const [filterSeverity, setFilterSeverity] = useState<LogSeverity | 'all'>('all');

  const logs: LogEntry[] = [
    {
      id: 'LOG-001',
      timestamp: '2026-02-18 09:15:34',
      type: 'security',
      severity: 'critical',
      message: 'Unauthorized access attempt detected',
      details: 'Multiple failed login attempts from IP 192.168.1.105',
      source: 'Authentication System',
      retention: 200,
    },
    {
      id: 'LOG-002',
      timestamp: '2026-02-18 09:12:22',
      type: 'error',
      severity: 'warning',
      message: 'Drone communication timeout',
      details: 'Drone-2 lost connection for 15 seconds, reconnected successfully',
      source: 'Drone Management',
      retention: 90,
    },
    {
      id: 'LOG-003',
      timestamp: '2026-02-18 09:08:11',
      type: 'security',
      severity: 'warning',
      message: 'Unusual movement pattern detected',
      details: 'Item STL-8847 moved 3 times within 10 minutes',
      source: 'Movement Monitor',
      retention: 200,
    },
    {
      id: 'LOG-004',
      timestamp: '2026-02-18 08:55:47',
      type: 'error',
      severity: 'critical',
      message: 'Database connection failed',
      details: 'Primary database connection lost, failover to backup successful',
      source: 'Database System',
      retention: 90,
    },
    {
      id: 'LOG-005',
      timestamp: '2026-02-18 08:42:15',
      type: 'security',
      severity: 'critical',
      message: 'Zone breach alert',
      details: 'Unauthorized vehicle detected in restricted Zone C',
      source: 'Zone Monitor',
      retention: 200,
    },
    {
      id: 'LOG-006',
      timestamp: '2026-02-18 08:30:08',
      type: 'error',
      severity: 'info',
      message: 'Scheduled maintenance started',
      details: 'System backup initiated - expected duration 30 minutes',
      source: 'Maintenance System',
      retention: 90,
    },
    {
      id: 'LOG-007',
      timestamp: '2026-02-18 08:15:33',
      type: 'security',
      severity: 'warning',
      message: 'Session timeout adjusted',
      details: 'User admin@lmis.io session extended due to active monitoring',
      source: 'Session Manager',
      retention: 200,
    },
    {
      id: 'LOG-008',
      timestamp: '2026-02-18 07:58:21',
      type: 'error',
      severity: 'warning',
      message: 'Camera feed quality degraded',
      details: 'Camera 3 experiencing low bandwidth, quality reduced to maintain connection',
      source: 'Video Surveillance',
      retention: 90,
    },
  ];

  const filteredLogs = logs.filter(log => {
    const typeMatch = filterType === 'all' || log.type === filterType;
    const severityMatch = filterSeverity === 'all' || log.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

  const getSeverityConfig = (severity: LogSeverity) => {
    switch (severity) {
      case 'critical':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-600/10', border: 'border-red-600/30' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-600/10', border: 'border-amber-600/30' };
      case 'info':
        return { icon: Info, color: 'text-blue-400', bg: 'bg-blue-600/10', border: 'border-blue-600/30' };
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'security' ? 'text-purple-400' : 'text-gray-400';
  };

  return (
    <DashboardLayout role="admin" email={email} onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">System Logs & Audit Trail</h1>
            <p className="text-sm text-gray-400">Monitor system events and security logs</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#1a1f2e] hover:bg-[#2a3441] border border-[#2a3441] text-white rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Logs</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-400">Type:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as LogType)}
                  className="bg-[#1a1f2e] border border-[#2a3441] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#3b82f6]"
                >
                  <option value="all">All</option>
                  <option value="error">Error</option>
                  <option value="security">Security</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-400">Severity:</label>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value as LogSeverity | 'all')}
                  className="bg-[#1a1f2e] border border-[#2a3441] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#3b82f6]"
                >
                  <option value="all">All</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
            </div>

            <div className="flex-1"></div>

            <div className="text-sm text-gray-400">
              Showing {filteredLogs.length} of {logs.length} logs
            </div>
          </div>
        </div>

        {/* Retention Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <XCircle className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-sm text-white font-medium">Error Logs Retention</div>
                <div className="text-xs text-gray-400">90 days retention period</div>
              </div>
            </div>
          </div>
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-sm text-white font-medium">Security Logs Retention</div>
                <div className="text-xs text-gray-400">200 days retention period (compliance)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Log Entries */}
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const config = getSeverityConfig(log.severity);
            const Icon = config.icon;

            return (
              <div
                key={log.id}
                className={`bg-[#0f1419] border ${config.border} rounded-lg p-5 hover:bg-[#1a1f2e] transition-colors`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${config.bg} p-2.5 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className={`text-xs uppercase tracking-wide font-medium ${config.color}`}>
                            {log.severity}
                          </span>
                          <span className={`text-xs uppercase tracking-wide ${getTypeColor(log.type)}`}>
                            {log.type}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{log.id}</span>
                        </div>
                        <h3 className="text-white font-medium mb-1">{log.message}</h3>
                        <p className="text-sm text-gray-400 mb-2">{log.details}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{log.timestamp}</span>
                        </div>
                        <span>•</span>
                        <span>Source: {log.source}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Retention: {log.retention} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLogs.length === 0 && (
          <div className="bg-[#0f1419] border border-[#1e2735] rounded-lg p-12 text-center">
            <Info className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No logs match the selected filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}