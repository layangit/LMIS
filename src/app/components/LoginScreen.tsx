import { useState } from 'react';
import { Shield, Lock, Mail, ChevronDown } from 'lucide-react';
import type { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      onLogin(role);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1707623256271-8a11c2ea9336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwbmlnaHQlMjBkcm9uZXxlbnwxfHx8fDE3NzE0NDYxOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="absolute inset-0 bg-[#0B1220]/90 backdrop-blur-md" />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--aegis-electric-blue) 1px, transparent 1px),
            linear-gradient(90deg, var(--aegis-electric-blue) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/50 mb-4">
            <Shield className="w-8 h-8 text-[#00d4ff]" />
          </div>
          <h1 className="text-3xl tracking-tight mb-2" style={{ color: '#ffffff' }}>
            Aegis Site Intelligence
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Enterprise Construction Surveillance Platform
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div 
            className="backdrop-blur-xl rounded-2xl p-8 border shadow-2xl"
            style={{ 
              background: 'rgba(26, 35, 50, 0.6)',
              borderColor: 'rgba(0, 212, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(0, 212, 255, 0.5)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aegis.io"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(11, 18, 32, 0.6)',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    color: '#ffffff'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(0, 212, 255, 0.5)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: 'rgba(11, 18, 32, 0.6)',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    color: '#ffffff'
                  }}
                  required
                />
              </div>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Access Role
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 appearance-none cursor-pointer transition-all"
                  style={{
                    background: 'rgba(11, 18, 32, 0.6)',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    color: '#ffffff'
                  }}
                >
                  <option value="admin">Administrator - Full Access</option>
                  <option value="site-manager">Site Manager - Operations</option>
                  <option value="security">Security Officer Officer - Surveillance</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: 'rgba(0, 212, 255, 0.5)' }} />
              </div>
            </div>

            {/* MFA Indicator */}
            <div className="mb-6 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(0, 255, 136, 0.1)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#00ff88' }} />
              <span className="text-xs" style={{ color: 'rgba(0, 255, 136, 0.9)' }}>
                Multi-Factor Authentication: Okta Verified
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg transition-all duration-300 relative overflow-hidden"
              style={{
                background: isLoading ? 'rgba(0, 212, 255, 0.3)' : '#00d4ff',
                color: '#0B1220',
                boxShadow: isLoading ? 'none' : '0 4px 20px rgba(0, 212, 255, 0.4)'
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#0B1220]/30 border-t-[#0B1220] rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                'Access Platform'
              )}
            </button>
          </div>
        </form>

        {/* Security Officer Status Footer */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
            <span>System Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
            <span>VPN Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
            <span>All Drones Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
