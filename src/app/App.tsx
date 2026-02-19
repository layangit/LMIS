import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import SiteManagerDashboard from './screens/SiteManagerDashboard';
import SecurityOfficerDashboard from './screens/SecurityOfficerDashboard';
import ZoneManagement from './screens/ZoneManagement';
import RuleConfiguration from './screens/RuleConfiguration';
import AlertDetails from './screens/AlertDetails';
import HistoricalAnalytics from './screens/HistoricalAnalytics';
import SystemLogs from './screens/SystemLogs';
import type { UserRole } from './types';

export interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  email: string;
}

function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    email: '',
  });

  const handleLogin = (email: string, role: UserRole) => {
    setAuth({
      isAuthenticated: true,
      role,
      email,
    });
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      role: null,
      email: '',
    });
  };

  return (
    <div className="dark min-h-screen bg-[#0a0e17] text-foreground">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              auth.isAuthenticated ? (
                <Navigate to={`/${auth.role}`} replace />
              ) : (
                <LoginScreen onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/admin"
            element={
              auth.isAuthenticated && auth.role === 'admin' ? (
                <AdminDashboard onLogout={handleLogout} email={auth.email} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/site-manager"
            element={
              auth.isAuthenticated && auth.role === 'site-manager' ? (
                <SiteManagerDashboard onLogout={handleLogout} email={auth.email} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/security-officer"
            element={
              auth.isAuthenticated && auth.role === 'security-officer' ? (
                <SecurityOfficerDashboard onLogout={handleLogout} email={auth.email} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/zone-management"
            element={
              auth.isAuthenticated && auth.role === 'admin' ? (
                <ZoneManagement onLogout={handleLogout} email={auth.email} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/rule-configuration"
            element={
              auth.isAuthenticated && auth.role === 'admin' ? (
                <RuleConfiguration onLogout={handleLogout} email={auth.email} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/alert/:id"
            element={
              auth.isAuthenticated ? (
                <AlertDetails onLogout={handleLogout} email={auth.email} role={auth.role!} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/analytics"
            element={
              auth.isAuthenticated ? (
                <HistoricalAnalytics onLogout={handleLogout} email={auth.email} role={auth.role!} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/system-logs"
            element={
              auth.isAuthenticated && auth.role === 'admin' ? (
                <SystemLogs onLogout={handleLogout} email={auth.email} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;