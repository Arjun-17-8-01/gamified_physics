import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Resistor from './electronics/Resistor';
import Capacitor from './electronics/Capacitor';

const ComponentToolbox: React.FC = () => {
  const resistorValues = [100, 220, 470, 1000, 2200, 4700, 10000];
  const capacitorValues = [
    { value: 10, unit: 'pF' as const },
    { value: 100, unit: 'pF' as const },
    { value: 1, unit: 'nF' as const },
    { value: 10, unit: 'nF' as const },
    { value: 100, unit: 'nF' as const },
    { value: 1, unit: 'μF' as const },
    { value: 10, unit: 'μF' as const }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Resistors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {resistorValues.map((value) => (
              <div 
                key={value} 
                className="flex flex-col items-center p-4 rounded-lg border bg-card hover:shadow-hover transition-all duration-200 cursor-pointer"
              >
                <Resistor value={value} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            Capacitors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {capacitorValues.map((cap, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-4 rounded-lg border bg-card hover:shadow-hover transition-all duration-200 cursor-pointer"
              >
                <Capacitor value={cap.value} unit={cap.unit} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentToolbox;