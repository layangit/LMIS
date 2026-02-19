import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function MetricCard({ icon: Icon, label, value, trend, className = '' }: MetricCardProps) {
  return (
    <div className={`bg-[#0f1419] border border-[#1e2735] rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-[#3b82f6]/10 rounded-lg">
          <Icon className="w-5 h-5 text-[#3b82f6]" />
        </div>
        {trend && (
          <div className={`text-xs px-2 py-1 rounded ${trend.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      <div className="text-2xl font-semibold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
