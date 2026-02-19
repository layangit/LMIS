import { Shield, LayoutDashboard, Map, Settings, Bell, BarChart3, User, LogOut } from 'lucide-react';
import type { UserRole } from '../types';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: UserRole;
  onLogout: () => void;
}

export function Navigation({ currentPage, onNavigate, userRole, onLogout }: NavigationProps) {
  const roleLabels = {
    admin: 'Administrator',
    'site-manager': 'Site Manager',
    'security-officer': 'Security Officer'
  };

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
    ];

    if (userRole === 'admin') {
      return [
        ...baseItems,
        { id: 'zones', label: 'Zone Management', icon: Map },
        { id: 'rules', label: 'Rules & Config', icon: Settings },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ];
    }

    if (userRole === 'site-manager') {
      return [
        ...baseItems,
        { id: 'analytics', label: 'Analytics', icon: BarChart3 }
      ];
    }

    if (userRole === 'security-officer') {
      return [
        ...baseItems,
        { id: 'alerts', label: 'Alert Investigation', icon: Bell }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div 
      className="w-64 h-screen fixed left-0 top-0 border-r flex flex-col"
      style={{
        background: '#0B1220',
        borderColor: 'rgba(0, 212, 255, 0.2)'
      }}
    >
      {/* Logo Header */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(0, 212, 255, 0.2)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center border"
            style={{ 
              background: 'rgba(0, 212, 255, 0.1)',
              borderColor: 'rgba(0, 212, 255, 0.3)'
            }}
          >
            <Shield className="w-5 h-5" style={{ color: '#00d4ff' }} />
          </div>
          <div>
            <h2 className="text-sm" style={{ color: '#ffffff' }}>Aegis Intelligence</h2>
            <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>v2.4.1</p>
          </div>
        </div>

        {/* User Role Badge */}
        <div 
          className="px-3 py-2 rounded-lg flex items-center gap-2"
          style={{ background: 'rgba(0, 212, 255, 0.1)' }}
        >
          <User className="w-4 h-4" style={{ color: '#00d4ff' }} />
          <span className="text-xs" style={{ color: '#00d4ff' }}>{roleLabels[userRole]}</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
              style={{
                background: isActive ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                color: isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)',
                borderLeft: isActive ? '3px solid #00d4ff' : '3px solid transparent'
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t" style={{ borderColor: 'rgba(0, 212, 255, 0.2)' }}>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
