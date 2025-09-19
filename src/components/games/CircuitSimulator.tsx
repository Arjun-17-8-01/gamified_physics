import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap, RotateCcw, CheckCircle, Lightbulb, Settings } from 'lucide-react';
import { circuitLevels, CircuitLevel } from '../../data/circuitLevels';
import Resistor from '../electronics/Resistor';
import Capacitor from '../electronics/Capacitor';

interface PlacedComponent {
  id: string;
  slotId: string;
  type: 'resistor' | 'capacitor';
  value: number;
  unit?: 'pF' | 'nF' | 'μF';
}

const CircuitSimulator: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([]);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const [isCircuitComplete, setIsCircuitComplete] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  
  const level = circuitLevels.find(l => l.id === currentLevel) || circuitLevels[0];

  const handleDragStart = (e: React.DragEvent, component: any) => {
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, slotId: string) => {
    e.preventDefault();
    if (!draggedComponent) return;

    // Remove existing component from this slot
    const newPlaced = placedComponents.filter(c => c.slotId !== slotId);
    
    // Add new component
    const newComponent: PlacedComponent = {
      id: `${slotId}-${Date.now()}`,
      slotId,
      type: draggedComponent.type,
      value: draggedComponent.value,
      unit: draggedComponent.unit
    };

    setPlacedComponents([...newPlaced, newComponent]);
    setDraggedComponent(null);
  };

  const checkSolution = () => {
    const solutions = level.solutions;
    
    for (const solution of solutions) {
      const isCorrect = solution.every(solutionComponent => {
        const placedComponent = placedComponents.find(pc => pc.slotId === solutionComponent.slotId);
        return placedComponent && 
               placedComponent.type === solutionComponent.componentType &&
               placedComponent.value === solutionComponent.value;
      });

      if (isCorrect && placedComponents.length === solution.length) {
        setIsCircuitComplete(true);
        if (!completedLevels.includes(currentLevel)) {
          setCompletedLevels([...completedLevels, currentLevel]);
        }
        return;
      }
    }
    setIsCircuitComplete(false);
  };

  const resetLevel = () => {
    setPlacedComponents([]);
    setIsCircuitComplete(false);
  };

  const nextLevel = () => {
    if (currentLevel < circuitLevels.length) {
      setCurrentLevel(currentLevel + 1);
      resetLevel();
    }
  };

  const renderComponent = (type: 'resistor' | 'capacitor', value: number, unit?: string) => {
    if (type === 'resistor') {
      return <Resistor value={value} />;
    } else {
      return <Capacitor value={value} unit={unit as 'pF' | 'nF' | 'μF'} />;
    }
  };

  React.useEffect(() => {
    if (placedComponents.length > 0) {
      checkSolution();
    }
  }, [placedComponents]);

  if (showLevelSelect) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Electronic Circuit Simulator</h2>
          <Button variant="outline" onClick={() => setShowLevelSelect(false)}>
            Back to Game
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {circuitLevels.map((levelData) => (
            <Card 
              key={levelData.id}
              className={`cursor-pointer transition-all hover:shadow-hover ${
                completedLevels.includes(levelData.id) ? 'ring-2 ring-success' : ''
              } ${currentLevel === levelData.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => {
                setCurrentLevel(levelData.id);
                setShowLevelSelect(false);
                resetLevel();
              }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold mb-2">{levelData.id}</div>
                {completedLevels.includes(levelData.id) && (
                  <CheckCircle className="w-5 h-5 text-success mx-auto mb-2" />
                )}
                <div className="text-sm font-medium truncate">{levelData.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Electronic Circuit Simulator</h2>
          <p className="text-muted-foreground">Level {currentLevel} of {circuitLevels.length}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowLevelSelect(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Levels
          </Button>
          <Button variant="outline" onClick={resetLevel}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedLevels.length} / {circuitLevels.length} completed
            </span>
          </div>
          <Progress value={(completedLevels.length / circuitLevels.length) * 100} />
        </CardContent>
      </Card>

      {/* Level Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            {level.title}
            {isCircuitComplete && <CheckCircle className="w-5 h-5 text-success" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{level.description}</p>
          {isCircuitComplete && (
            <div className="flex items-center gap-4 p-4 bg-success/10 border border-success/20 rounded-lg">
              <Trophy className="w-6 h-6 text-success" />
              <div>
                <div className="font-semibold text-success">Circuit Complete!</div>
                <div className="text-sm text-muted-foreground">Both the light bulb and motor are working correctly.</div>
              </div>
              {currentLevel < circuitLevels.length && (
                <Button onClick={nextLevel} className="ml-auto">
                  Next Level
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Component Toolbox */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Component Toolbox</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Resistors */}
            {level.availableComponents.resistors.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Resistors
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {level.availableComponents.resistors.map((value) => (
                    <div
                      key={value}
                      draggable
                      onDragStart={(e) => handleDragStart(e, { type: 'resistor', value })}
                      className="p-2 border rounded cursor-grab hover:shadow-hover transition-all bg-card"
                    >
                      <Resistor value={value} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capacitors */}
            {level.availableComponents.capacitors.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Capacitors
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {level.availableComponents.capacitors.map((cap, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, { type: 'capacitor', value: cap.value, unit: cap.unit })}
                      className="p-2 border rounded cursor-grab hover:shadow-hover transition-all bg-card"
                    >
                      <Capacitor value={cap.value} unit={cap.unit} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Circuit Diagram */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Circuit Diagram</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/30 rounded-lg p-6 min-h-96">
              <svg
                width={level.diagram.width}
                height={level.diagram.height}
                className="mx-auto"
              >
                {/* Draw connections */}
                {level.diagram.connections.map((conn, index) => (
                  <line
                    key={index}
                    x1={conn.from.x}
                    y1={conn.from.y}
                    x2={conn.to.x}
                    y2={conn.to.y}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                  />
                ))}
                
                {/* Draw component slots */}
                {level.diagram.slots.map((slot) => {
                  const placedComponent = placedComponents.find(pc => pc.slotId === slot.id);
                  return (
                    <g key={slot.id}>
                      <rect
                        x={slot.x - 25}
                        y={slot.y - 15}
                        width="50"
                        height="30"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="text-muted-foreground"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, slot.id)}
                      />
                      {placedComponent && (
                        <foreignObject
                          x={slot.x - 25}
                          y={slot.y - 15}
                          width="50"
                          height="30"
                        >
                          <div className="flex items-center justify-center h-full">
                            {renderComponent(placedComponent.type, placedComponent.value, placedComponent.unit)}
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  );
                })}

                {/* Draw fixed components */}
                <g>
                  {/* Battery */}
                  <rect
                    x={level.diagram.battery.x - 15}
                    y={level.diagram.battery.y - 20}
                    width="30"
                    height="40"
                    fill="currentColor"
                    className="text-primary"
                  />
                  <text
                    x={level.diagram.battery.x}
                    y={level.diagram.battery.y + 5}
                    textAnchor="middle"
                    className="text-xs fill-primary-foreground"
                  >
                    9V
                  </text>

                  {/* Light Bulb */}
                  <circle
                    cx={level.diagram.lightBulb.x}
                    cy={level.diagram.lightBulb.y}
                    r="15"
                    fill={isCircuitComplete ? "yellow" : "transparent"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                  />
                  {isCircuitComplete && (
                    <text
                      x={level.diagram.lightBulb.x}
                      y={level.diagram.lightBulb.y + 3}
                      textAnchor="middle"
                      className="text-xs"
                    >
                      💡
                    </text>
                  )}

                  {/* Motor */}
                  <rect
                    x={level.diagram.motor.x - 15}
                    y={level.diagram.motor.y - 15}
                    width="30"
                    height="30"
                    fill={isCircuitComplete ? "hsl(var(--success))" : "transparent"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                  />
                  <text
                    x={level.diagram.motor.x}
                    y={level.diagram.motor.y + 3}
                    textAnchor="middle"
                    className="text-xs"
                  >
                    {isCircuitComplete ? "⚡" : "M"}
                  </text>
                </g>
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CircuitSimulator;