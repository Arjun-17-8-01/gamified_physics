import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Trophy, Battery, CheckCircle, Target, RotateCcw } from 'lucide-react';
import { powerSaverChallenges } from '../../data/challengeActivities';

interface PowerSaverProps {
  onComplete: (score: number) => void;
}

const PowerSaver: React.FC<PowerSaverProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [totalPower, setTotalPower] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionFound, setSolutionFound] = useState(false);

  const totalChallenges = 3;

  const startGame = () => {
    setGameState('playing');
    setCurrentChallenge(0);
    setScore(0);
    setSelectedComponents([]);
    setTotalPower(0);
    setShowSolution(false);
    setSolutionFound(false);
  };

  const finishGame = () => {
    setGameState('finished');
    onComplete(score);
  };

  const challenge = powerSaverChallenges[currentChallenge];

  const toggleComponent = (componentType: string) => {
    if (showSolution) return;

    const isSelected = selectedComponents.includes(componentType);
    let newSelected;
    
    if (isSelected) {
      newSelected = selectedComponents.filter(c => c !== componentType);
    } else {
      if (selectedComponents.length >= challenge.maxComponents) return;
      newSelected = [...selectedComponents, componentType];
    }
    
    setSelectedComponents(newSelected);
    
    // Calculate total power
    const newTotalPower = newSelected.reduce((total, compType) => {
      const component = challenge.availableComponents.find(c => c.type === compType);
      return total + (component?.powerConsumption || 0);
    }, 0);
    
    setTotalPower(newTotalPower);
  };

  const checkSolution = () => {
    // Check if current selection matches any of the solutions
    const matchesSolution = challenge.solutions.some(solution => {
      return solution.components.length === selectedComponents.length &&
             solution.components.every(comp => selectedComponents.includes(comp)) &&
             selectedComponents.every(comp => solution.components.includes(comp));
    });

    if (matchesSolution) {
      setScore(score + 1);
      setSolutionFound(true);
      setTimeout(() => {
        if (currentChallenge < totalChallenges - 1) {
          nextChallenge();
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      setShowSolution(true);
    }
  };

  const nextChallenge = () => {
    setCurrentChallenge(currentChallenge + 1);
    setSelectedComponents([]);
    setTotalPower(0);
    setShowSolution(false);
    setSolutionFound(false);
  };

  const resetGame = () => {
    setGameState('ready');
    setCurrentChallenge(0);
    setScore(0);
    setSelectedComponents([]);
    setTotalPower(0);
    setShowSolution(false);
    setSolutionFound(false);
  };

  if (gameState === 'ready') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Battery className="w-6 h-6" />
            Power Saver
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">🔋</div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Build Energy-Efficient Circuits</p>
            <p className="text-muted-foreground">
              Complete circuit objectives using the minimum power consumption!
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Target className="w-4 h-4" />
              <span className="font-semibold">3 challenges</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Battery className="w-4 h-4" />
              <span>Minimize power usage</span>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2">
            <Battery className="w-5 h-5" />
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / totalChallenges) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Power Challenge Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{score} / {totalChallenges}</div>
            <div className="text-lg text-muted-foreground">Efficient Solutions</div>
          </div>
          <div className="space-y-2">
            <Progress value={percentage} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {percentage >= 80 ? 'Energy Expert!' : percentage >= 60 ? 'Good Efficiency!' : 'Keep Optimizing!'}
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Button onClick={resetGame} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
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

  const progress = (currentChallenge / totalChallenges) * 100;
  const canSubmit = selectedComponents.length > 0;
  const isOptimal = challenge.solutions.some(solution => 
    solution.totalPower === totalPower && 
    solution.components.length === selectedComponents.length &&
    solution.components.every(comp => selectedComponents.includes(comp))
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Badge className="gap-2">
                <Target className="w-4 h-4" />
                {score} / {totalChallenges}
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Battery className="w-4 h-4" />
                {totalPower}W
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Challenge {currentChallenge + 1} of {totalChallenges}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Challenge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="w-5 h-5" />
            {challenge.title}
            {solutionFound && <CheckCircle className="w-5 h-5 text-success" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Objective:</h4>
              <p className="text-muted-foreground">{challenge.objective}</p>
            </div>
            
            <div>
              <h4 className="font-semibold">Target Function:</h4>
              <p className="text-muted-foreground">{challenge.targetFunction}</p>
            </div>

            <div>
              <h4 className="font-semibold">Constraints:</h4>
              <p className="text-muted-foreground">
                Maximum {challenge.maxComponents} components | Minimize power consumption
              </p>
            </div>
          </div>

          {/* Component Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold">Available Components:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {challenge.availableComponents.map((component, index) => {
                const isSelected = selectedComponents.includes(component.type);
                const isDisabled = !isSelected && selectedComponents.length >= challenge.maxComponents;
                
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-primary bg-primary/5' : 
                      isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-hover'
                    }`}
                    onClick={() => !isDisabled && toggleComponent(component.type)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{component.type}</div>
                          <div className="text-sm text-muted-foreground">
                            Qty: {component.quantity} | {component.powerConsumption}W
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Current Selection */}
          {selectedComponents.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold">Current Circuit:</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedComponents.map((comp, index) => (
                    <Badge key={index} variant="secondary">
                      {comp}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    Components: {selectedComponents.length} / {challenge.maxComponents}
                  </div>
                  <div className={`text-sm font-medium ${isOptimal ? 'text-success' : ''}`}>
                    Total Power: {totalPower}W {isOptimal && '✨ Optimal!'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {solutionFound && (
            <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 font-semibold text-success">
                <CheckCircle className="w-4 h-4" />
                Perfect Solution!
              </div>
              <div className="text-sm text-muted-foreground">
                You found an optimal power-efficient solution!
              </div>
            </div>
          )}

          {showSolution && !solutionFound && (
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg space-y-2">
              <div className="font-semibold text-warning">
                Not quite optimal. Here are the best solutions:
              </div>
              {challenge.solutions.map((solution, index) => (
                <div key={index} className="text-sm">
                  <strong>Solution {index + 1}:</strong> {solution.components.join(', ')} 
                  <span className="text-success ml-2">({solution.totalPower}W)</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={checkSolution}
              disabled={!canSubmit || solutionFound}
              className="flex-1"
            >
              {solutionFound ? 'Solution Found!' : 'Test Circuit'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedComponents([]);
                setTotalPower(0);
                setShowSolution(false);
              }}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PowerSaver;