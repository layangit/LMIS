import type { UserRole } from '../types';
// Mock data for Aegis Site Intelligence Platform

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';

export interface Alert {
  id: string;
  itemId: string;
  zone: string;
  timestamp: Date;
  violationType: string;
  severity: AlertSeverity;
  costImpact: number;
  riskScore: number;
  description: string;
  handler?: string;
  status: 'active' | 'investigating' | 'resolved';
  images?: string[];
}

export interface Asset {
  id: string;
  type: string;
  zone: string;
  position: { x: number; y: number };
  status: 'normal' | 'warning' | 'critical';
  lastMoved: Date;
}

export interface Drone {
  id: string;
  position: { x: number; y: number };
  battery: number;
  status: 'active' | 'charging' | 'maintenance';
  currentZone: string;
}

export interface Zone {
  id: string;
  name: string;
  type: 'storage' | 'construction' | 'restricted' | 'delivery';
  coordinates: { x: number; y: number; width: number; height: number };
  authorizedVehicles: string[];
  schedule: string;
  color: string;
}

export interface MovementEvent {
  id: string;
  assetId: string;
  fromZone: string;
  toZone: string;
  timestamp: Date;
  handler: string;
  authorized: boolean;
}

export interface Rule {
  id: string;
  name: string;
  conditions: {
    itemType?: string;
    zone?: string;
    timeWindow?: string;
  };
  actions: {
    alertLevel: AlertSeverity;
    notify: string[];
  };
  enabled: boolean;
}

// Generate mock alerts
export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    itemId: 'AST-2847',
    zone: 'Zone C',
    timestamp: new Date(Date.now() - 5 * 60000),
    violationType: 'Unauthorized Movement',
    severity: 'critical',
    costImpact: 45000,
    riskScore: 92,
    description: 'Steel beams moved outside authorized schedule window',
    handler: 'Unknown',
    status: 'active',
    images: ['drone-capture-1.jpg']
  },
  {
    id: 'ALT-002',
    itemId: 'AST-3921',
    zone: 'Zone A',
    timestamp: new Date(Date.now() - 12 * 60000),
    violationType: 'Missing Item',
    severity: 'high',
    costImpact: 28000,
    riskScore: 78,
    description: 'Concrete mixer not detected in designated storage area',
    handler: 'J. Patterson',
    status: 'investigating',
  },
  {
    id: 'ALT-003',
    itemId: 'AST-1205',
    zone: 'Zone B',
    timestamp: new Date(Date.now() - 25 * 60000),
    violationType: 'Delivery Delay',
    severity: 'medium',
    costImpact: 12000,
    riskScore: 54,
    description: 'Material delivery 2.5 hours behind schedule',
    handler: 'M. Rodriguez',
    status: 'active',
  },
  {
    id: 'ALT-004',
    itemId: 'AST-5673',
    zone: 'Zone D',
    timestamp: new Date(Date.now() - 45 * 60000),
    violationType: 'Zone Violation',
    severity: 'high',
    costImpact: 31000,
    riskScore: 81,
    description: 'Unauthorized access to restricted construction zone',
    status: 'active',
  },
  {
    id: 'ALT-005',
    itemId: 'AST-8234',
    zone: 'Zone A',
    timestamp: new Date(Date.now() - 60 * 60000),
    violationType: 'Storage Optimization',
    severity: 'low',
    costImpact: 3000,
    riskScore: 22,
    description: 'Inefficient material placement detected',
    handler: 'System',
    status: 'resolved',
  },
  {
    id: 'ALT-006',
    itemId: 'AST-4521',
    zone: 'Zone C',
    timestamp: new Date(Date.now() - 90 * 60000),
    violationType: 'Failed Access Attempt',
    severity: 'critical',
    costImpact: 52000,
    riskScore: 95,
    description: 'Multiple unauthorized access attempts detected',
    status: 'investigating',
  }
];

// Generate mock assets
export const mockAssets: Asset[] = Array.from({ length: 150 }, (_, i) => ({
  id: `AST-${1000 + i}`,
  type: ['Steel Beams', 'Concrete Mix', 'Rebar', 'Equipment', 'Tools'][Math.floor(Math.random() * 5)],
  zone: ['Zone A', 'Zone B', 'Zone C', 'Zone D'][Math.floor(Math.random() * 4)],
  position: {
    x: Math.random() * 800,
    y: Math.random() * 600
  },
  status: Math.random() > 0.9 ? 'critical' : Math.random() > 0.7 ? 'warning' : 'normal',
  lastMoved: new Date(Date.now() - Math.random() * 86400000)
}));

// Generate mock drones
export const mockDrones: Drone[] = Array.from({ length: 20 }, (_, i) => ({
  id: `DRN-${100 + i}`,
  position: {
    x: Math.random() * 800,
    y: Math.random() * 600
  },
  battery: 60 + Math.random() * 40,
  status: Math.random() > 0.95 ? 'charging' : Math.random() > 0.98 ? 'maintenance' : 'active',
  currentZone: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Transit'][Math.floor(Math.random() * 5)]
}));

// Mock zones
export const mockZones: Zone[] = [
  {
    id: 'zone-a',
    name: 'Zone A - Primary Storage',
    type: 'storage',
    coordinates: { x: 50, y: 50, width: 300, height: 250 },
    authorizedVehicles: ['TRK-001', 'TRK-003', 'FLT-002'],
    schedule: '6:00 AM - 6:00 PM',
    color: '#00ff88'
  },
  {
    id: 'zone-b',
    name: 'Zone B - Active Construction',
    type: 'construction',
    coordinates: { x: 380, y: 50, width: 350, height: 250 },
    authorizedVehicles: ['TRK-002', 'CRN-001', 'EXC-001'],
    schedule: '24/7',
    color: '#00d4ff'
  },
  {
    id: 'zone-c',
    name: 'Zone C - Equipment Storage',
    type: 'storage',
    coordinates: { x: 50, y: 330, width: 300, height: 240 },
    authorizedVehicles: ['TRK-001', 'FLT-001', 'FLT-002'],
    schedule: '6:00 AM - 8:00 PM',
    color: '#00ff88'
  },
  {
    id: 'zone-d',
    name: 'Zone D - Restricted Area',
    type: 'restricted',
    coordinates: { x: 380, y: 330, width: 350, height: 240 },
    authorizedVehicles: ['SEC-001', 'SEC-002'],
    schedule: 'Restricted Access',
    color: '#ff3b5c'
  }
];

// Mock movement events
export const mockMovementEvents: MovementEvent[] = Array.from({ length: 50 }, (_, i) => ({
  id: `MOV-${5000 + i}`,
  assetId: `AST-${1000 + Math.floor(Math.random() * 150)}`,
  fromZone: ['Zone A', 'Zone B', 'Zone C', 'Zone D'][Math.floor(Math.random() * 4)],
  toZone: ['Zone A', 'Zone B', 'Zone C', 'Zone D'][Math.floor(Math.random() * 4)],
  timestamp: new Date(Date.now() - Math.random() * 3600000 * 24),
  handler: ['J. Patterson', 'M. Rodriguez', 'K. Chen', 'A. Williams', 'Unknown'][Math.floor(Math.random() * 5)],
  authorized: Math.random() > 0.15
}));

// Mock rules
export const mockRules: Rule[] = [
  {
    id: 'rule-001',
    name: 'Steel Beams Storage Authorization',
    conditions: {
      itemType: 'Steel Beams',
      zone: 'Zone A',
      timeWindow: '6:00 AM - 6:00 PM'
    },
    actions: {
      alertLevel: 'high',
      notify: ['Site Manager', 'Security']
    },
    enabled: true
  },
  {
    id: 'rule-002',
    name: 'Restricted Zone Access Control',
    conditions: {
      zone: 'Zone D'
    },
    actions: {
      alertLevel: 'critical',
      notify: ['Admin', 'Security', 'Site Manager']
    },
    enabled: true
  },
  {
    id: 'rule-003',
    name: 'After Hours Movement Detection',
    conditions: {
      timeWindow: '8:00 PM - 6:00 AM'
    },
    actions: {
      alertLevel: 'medium',
      notify: ['Security']
    },
    enabled: true
  }
];

// Analytics data
export const analyticsData = {
  violationTrends: [
    { date: '2/11', count: 12, cost: 124000 },
    { date: '2/12', count: 8, cost: 89000 },
    { date: '2/13', count: 15, cost: 156000 },
    { date: '2/14', count: 11, cost: 98000 },
    { date: '2/15', count: 6, cost: 67000 },
    { date: '2/16', count: 9, cost: 102000 },
    { date: '2/17', count: 14, cost: 143000 },
    { date: '2/18', count: 7, cost: 78000 }
  ],
  misplacedAssetTypes: [
    { type: 'Steel Beams', count: 23, percentage: 32 },
    { type: 'Concrete Mix', count: 18, percentage: 25 },
    { type: 'Rebar', count: 15, percentage: 21 },
    { type: 'Equipment', count: 10, percentage: 14 },
    { type: 'Tools', count: 6, percentage: 8 }
  ],
  zoneActivity: [
    { zone: 'Zone A', movements: 245, violations: 12 },
    { zone: 'Zone B', movements: 432, violations: 8 },
    { zone: 'Zone C', movements: 198, violations: 15 },
    { zone: 'Zone D', movements: 67, violations: 22 }
  ],
  deliveryMetrics: {
    onTime: 156,
    delayed: 23,
    missing: 4,
    averageDelay: 2.3
  }
};

// System metrics
export const systemMetrics = {
  dataAvailability: 99.7,
  activeDrones: 20,
  totalDrones: 20,
  eventProcessingRate: 5200,
  latency: 1.8,
  activeZones: 12,
  totalAssets: 8742,
  movementEventsPerMin: 47
};