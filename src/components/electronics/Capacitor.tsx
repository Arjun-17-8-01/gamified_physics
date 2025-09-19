import React from 'react';
import { cn } from '@/lib/utils';

interface CapacitorProps {
  value: number;
  unit: 'pF' | 'nF' | 'μF' | 'mF';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Capacitor: React.FC<CapacitorProps> = ({ value, unit, className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-8',
    md: 'w-16 h-10',
    lg: 'w-20 h-12'
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Capacitor body */}
      <div className="w-full h-full bg-capacitor-body rounded border border-border shadow-component flex">
        {/* Left plate */}
        <div className="w-1/2 h-full border-r-2 border-capacitor-stripe" />
        {/* Right plate */}
        <div className="w-1/2 h-full" />
      </div>
      
      {/* Leads */}
      <div className="absolute -left-2 top-1/2 w-4 h-0.5 bg-capacitor-lead transform -translate-y-1/2" />
      <div className="absolute -right-2 top-1/2 w-4 h-0.5 bg-capacitor-lead transform -translate-y-1/2" />
      
      {/* Value label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-muted-foreground">
        {value}{unit}
      </div>
    </div>
  );
};

export default Capacitor;