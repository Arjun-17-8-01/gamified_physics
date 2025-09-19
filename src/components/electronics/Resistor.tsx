import React from 'react';
import { cn } from '@/lib/utils';

interface ResistorProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Resistor: React.FC<ResistorProps> = ({ value, className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-6',
    md: 'w-20 h-8',
    lg: 'w-24 h-10'
  };

  const getColorBands = (resistance: number) => {
    const colors = [
      '#000000', // 0 - black
      '#8B4513', // 1 - brown
      '#FF0000', // 2 - red
      '#FFA500', // 3 - orange
      '#FFFF00', // 4 - yellow
      '#008000', // 5 - green
      '#0000FF', // 6 - blue
      '#800080', // 7 - violet
      '#808080', // 8 - grey
      '#FFFFFF', // 9 - white
    ];

    let val = resistance;
    const digits = [];
    
    while (val > 0) {
      digits.unshift(val % 10);
      val = Math.floor(val / 10);
    }
    
    if (digits.length < 2) digits.unshift(0);
    
    return {
      first: colors[digits[0]] || colors[1],
      second: colors[digits[1]] || colors[0],
      multiplier: colors[Math.max(0, digits.length - 2)] || colors[0]
    };
  };

  const bands = getColorBands(value);

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Resistor body */}
      <div className="w-full h-full bg-resistor-body rounded-sm border border-border shadow-component">
        {/* Color bands */}
        <div className="absolute left-1/4 top-0 bottom-0 w-1" style={{ backgroundColor: bands.first }} />
        <div className="absolute left-1/2 top-0 bottom-0 w-1" style={{ backgroundColor: bands.second }} />
        <div className="absolute right-1/4 top-0 bottom-0 w-1" style={{ backgroundColor: bands.multiplier }} />
      </div>
      
      {/* Leads */}
      <div className="absolute -left-2 top-1/2 w-4 h-0.5 bg-resistor-lead transform -translate-y-1/2" />
      <div className="absolute -right-2 top-1/2 w-4 h-0.5 bg-resistor-lead transform -translate-y-1/2" />
      
      {/* Value label */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-muted-foreground">
        {value}Ω
      </div>
    </div>
  );
};

export default Resistor;