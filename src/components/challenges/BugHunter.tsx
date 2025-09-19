import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Trophy, Bug, CheckCircle, AlertTriangle, RotateCcw } from 'lucide-react';
import { buggyCircuits } from '../../data/challengeActivities';

interface BugHunterProps {
  onComplete: (score: number) => void;
}

const BugHunter: React.FC<BugHunterProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [currentCircuit, setCurrentCircuit] = useState(0);
  const [score, setScore] = useState(0);
  const [foundBugs, setFoundBugs] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  const totalCircuits = 5;

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(180);
    setCurrentCircuit(0);
    setScore(0);
    setFoundBugs([]);
    setSelectedComponent(null);
    setShowSolution(false);
  };

  const finishGame = () => {
    setGameState('finished');
    onComplete(score);
  };

  const handleComponentClick = (componentId: string) => {
    if (showSolution || foundBugs.includes(componentId)) return;
    
    setSelectedComponent(componentId);
    const circuit = buggyCircuits[currentCircuit];
    const component = circuit.components.find(c => c.id === componentId);
    
    if (component && !component.isCorrect) {
      // Found the bug!
      setFoundBugs([...foundBugs, componentId]);
      setScore(score + 1);
      setShowSolution(true);
      
      setTimeout(() => {
        if (currentCircuit < totalCircuits - 1) {
          nextCircuit();
        } else {
          finishGame();
        }
      }, 3000);
    } else {
      // Wrong component clicked
      setTimeout(() => setSelectedComponent(null), 1000);
    }
  };

  const nextCircuit = () => {
    setCurrentCircuit(currentCircuit + 1);
    setFoundBugs([]);
    setSelectedComponent(null);
    setShowSolution(false);
  };

  const resetGame = () => {
    setGameState('ready');
    setTimeLeft(180);
    setCurrentCircuit(0);
    setScore(0);
    setFoundBugs([]);
    setSelectedComponent(null);
    setShowSolution(false);
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      finishGame();
    }
  }, [gameState, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'ready') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Bug className="w-6 h-6" />
            Bug Hunter
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">🔍</div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Find and Fix Circuit Errors</p>
            <p className="text-muted-foreground">
              Each circuit has one error. Find it before time runs out!
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="font-semibold">3 minutes</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Bug className="w-4 h-4" />
              <span>5 buggy circuits</span>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2">
            <Bug className="w-5 h-5" />
            Start Hunting
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / totalCircuits) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Bug Hunt Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{score} / {totalCircuits}</div>
            <div className="text-lg text-muted-foreground">Bugs Found</div>
          </div>
          <div className="space-y-2">
            <Progress value={percentage} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {percentage >= 80 ? 'Expert Debugger!' : percentage >= 60 ? 'Good Detective Work!' : 'Keep Practicing!'}
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Button onClick={resetGame} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Hunt Again
            </Button>
            <Button onClick={() => onComplete(score)} className="gap-2">
              <Trophy className="w-4 h-4" />
              Finish
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const circuit = buggyCircuits[currentCircuit];
  const progress = (currentCircuit / totalCircuits) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <Timer className="w-4 h-4" />
                {formatTime(timeLeft)}
              </Badge>
              <Badge className="gap-2">
                <Bug className="w-4 h-4" />
                {score} / {totalCircuits}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Circuit {currentCircuit + 1} of {totalCircuits}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Circuit */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            {circuit.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{circuit.description}</p>
          
          {/* Circuit Diagram */}
          <div className="bg-muted/30 p-8 rounded-lg">
            <svg width="400" height="300" className="mx-auto">
              {/* Draw connections */}
              <line x1="50" y1="150" x2="150" y2="150" stroke="currentColor" strokeWidth="2" />
              <line x1="200" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="2" />
              <line x1="300" y1="150" x2="350" y2="150" stroke="currentColor" strokeWidth="2" />
              <line x1="350" y1="150" x2="350" y2="200" stroke="currentColor" strokeWidth="2" />
              <line x1="350" y1="200" x2="50" y2="200" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="200" x2="50" y2="150" stroke="currentColor" strokeWidth="2" />
              
              {/* Components */}
              {circuit.components.map((component) => {
                const isSelected = selectedComponent === component.id;
                const isBuggy = !component.isCorrect;
                const isFound = foundBugs.includes(component.id);
                
                return (
                  <g key={component.id}>
                    <rect
                      x={component.position.x - 25}
                      y={component.position.y - 15}
                      width="50"
                      height="30"
                      fill={
                        isFound ? "hsl(var(--success))" :
                        isSelected && isBuggy ? "hsl(var(--success))" :
                        isSelected && !isBuggy ? "hsl(var(--destructive))" :
                        isBuggy && showSolution ? "hsl(var(--warning))" :
                        "hsl(var(--muted))"
                      }
                      stroke="currentColor"
                      strokeWidth="2"
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleComponentClick(component.id)}
                    />
                    <text
                      x={component.position.x}
                      y={component.position.y - 20}
                      textAnchor="middle"
                      className="text-xs font-medium"
                    >
                      {component.type}
                    </text>
                    <text
                      x={component.position.x}
                      y={component.position.y + 5}
                      textAnchor="middle"
                      className="text-xs"
                    >
                      {component.value}
                    </text>
                    {isFound && (
                      <text
                        x={component.position.x}
                        y={component.position.y + 25}
                        textAnchor="middle"
                        className="text-xs"
                      >
                        ✅
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {showSolution && (
            <div className="bg-success/10 border border-success/20 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 font-semibold text-success">
                <CheckCircle className="w-4 h-4" />
                Bug Found!
              </div>
              <div className="space-y-1">
                <div className="font-medium">Problem:</div>
                <div className="text-sm text-muted-foreground">{circuit.bugDescription}</div>
                <div className="font-medium">Solution:</div>
                <div className="text-sm text-muted-foreground">{circuit.solution}</div>
              </div>
            </div>
          )}

          {selectedComponent && !showSolution && (
            <div className="text-center">
              <div className="text-sm text-muted-foreground">
                {circuit.components.find(c => c.id === selectedComponent)?.isCorrect 
                  ? "❌ Not the bug. Try another component!"
                  : "🔍 Checking component..."
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BugHunter;