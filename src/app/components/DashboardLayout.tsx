import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Settings,
  BarChart3,
  FileText,
  Shield,
  LogOut,
  Radio,
  Layers,
} from 'lucide-react';
import type { UserRole } from '../types';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  roles: UserRole[];
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  email: string;
  onLogout: () => void;
}

export default function DashboardLayout({ children, role, email, onLogout }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      path: `/${role}`,
      roles: ['admin', 'site-manager', 'security-officer'],
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Zone Management',
      path: '/zone-management',
      roles: ['admin'],
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Rule Configuration',
      path: '/rule-configuration',
      roles: ['admin'],
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Analytics',
      path: '/analytics',
      roles: ['admin', 'site-manager', 'security-officer'],
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'System Logs',
      path: '/system-logs',
      roles: ['admin'],
    },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex h-screen bg-[#0a0e17]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0f1419] border-r border-[#1e2735] flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#1e2735]">
          <Layers className="w-6 h-6 text-[#3b82f6] mr-3" />
          <div>
            <div className="text-sm font-medium text-white">LMIS</div>
            <div className="text-xs text-gray-400">Logistics Monitor</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#3b82f6] text-white'
                    : 'text-gray-400 hover:bg-[#1a1f2e] hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="border-t border-[#1e2735] p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white truncate">{email}</div>
                <div className="text-xs text-gray-400 capitalize">{role?.replace('-', ' ')}</div>
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center px-3 py-2 bg-red-600/10 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0f1419] border-b border-[#1e2735] flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Radio className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-sm text-gray-400">System Status: Online</span>
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div>Uptime: 99.5%</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>Secure Connection</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}