import React, { useState } from 'react';
import { Shield, Lock, Mail, Radio, CheckCircle2, Layers } from 'lucide-react';
import { UserRole } from '../App';

interface LoginScreenProps {
  onLogin: (email: string, role: UserRole) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [mfaEnabled, setMfaEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && role) {
      onLogin(email, role);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e17] px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3b82f6] rounded-xl mb-4">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Logistics Monitoring Intelligence System</h1>
          <p className="text-sm text-gray-400">Secure Enterprise Access Portal</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#0f1419] border border-[#1e2735] rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
                  placeholder="admin@lmis.io"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">Select Role</label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={role || ''}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-[#1a1f2e] border border-[#2a3441] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#3b82f6] transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="site-manager">Site Manager</option>
                  <option value="security-officer">Security Officer</option>
                </select>
              </div>
            </div>

            {/* MFA Indicator */}
            <div className="flex items-center justify-between p-4 bg-[#1a1f2e] border border-[#2a3441] rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-sm text-white">Multi-Factor Authentication</div>
                  <div className="text-xs text-gray-400">Enhanced security enabled</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${mfaEnabled ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-400">{mfaEnabled ? 'Active' : 'Inactive'}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-lg transition-colors font-medium"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Secure System Footer */}
        <div className="mt-8 p-4 bg-[#0f1419]/50 border border-[#1e2735] rounded-lg">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Radio className="w-4 h-4 text-green-400" />
              <span>System Status: Operational</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span>SSL Encrypted</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>VPN Required</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>SOC 2 Type II</span>
          </div>
        </div>
      </div>
    </div>
  );
}