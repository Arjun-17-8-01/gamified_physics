import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, CheckCircle } from 'lucide-react';

interface CircuitBuilderProps {
  onComplete: (score: number) => void;
}

const CircuitBuilder: React.FC<CircuitBuilderProps> = ({ onComplete }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>([]);

  const challenges = [
    {
      id: 1,
      title: "Simple LED Circuit",
      description: "Create a basic LED circuit with current limiting resistor",
      components: ["LED", "220Ω Resistor", "9V Battery", "Wires"],
      objective: "Make LED light up safely",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Voltage Divider",
      description: "Build a voltage divider that outputs 5V from 10V input",
      components: ["Two 1kΩ Resistors", "10V Supply", "Multimeter"],
      objective: "Achieve 5V output",
      difficulty: "Easy"
    },
    {
      id: 3,
      title: "RC Timer Circuit",
      description: "Create a timing circuit with 1-second delay",
      components: ["Resistor", "Capacitor", "LED", "Switch"],
      objective: "1-second charging time",
      difficulty: "Medium"
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentChallenge(0);
    setCompletedChallenges(new Array(challenges.length).fill(false));
  };

  const completeChallenge = () => {
    const newCompleted = [...completedChallenges];
    newCompleted[currentChallenge] = true;
    setCompletedChallenges(newCompleted);
    setScore(score + 1);

    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
    } else {
      onComplete(score + 1);
    }
  };

  if (!gameStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Circuit Builder Simulator</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">🔧</div>
          <div className="space-y-2">
            <p className="text-lg">Build working circuits using virtual components!</p>
            <p className="text-muted-foreground">
              Complete circuit challenges by connecting components correctly.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg text-left space-y-2">
            <h4 className="font-semibold">Available Challenges:</h4>
            <ul className="text-sm space-y-1">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Badge variant="outline">{challenge.difficulty}</Badge>
                  <span>{challenge.title}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2">
            <Zap className="w-5 h-5" />
            Start Building
          </Button>
        </CardContent>
      </Card>
    );
  }

  const challenge = challenges[currentChallenge];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {challenge.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Challenge {currentChallenge + 1} of {challenges.length}
              </Badge>
              <Badge className="bg-primary">
                Score: {score}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Challenge Description:</h4>
                <p className="text-muted-foreground">{challenge.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold">Objective:</h4>
                <p className="text-primary">{challenge.objective}</p>
              </div>

              <div>
                <h4 className="font-semibold">Available Components:</h4>
                <div className="flex flex-wrap gap-2">
                  {challenge.components.map((component, index) => (
                    <Badge key={index} variant="secondary">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted p-6 rounded-lg text-center min-h-48 flex items-center justify-center">
                <div className="space-y-4">
                  <div className="text-4xl">🔌</div>
                  <div className="text-sm text-muted-foreground">
                    Circuit Workspace
                  </div>
                  <div className="text-xs text-muted-foreground">
                    (Drag components here to build your circuit)
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={completeChallenge} className="flex-1 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Test Circuit
                </Button>
                <Button variant="outline">
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Challenge Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((chall, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  completedChallenges[index] ? 'bg-success/10 border-success' :
                  index === currentChallenge ? 'bg-primary/10 border-primary' :
                  'bg-muted border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{chall.title}</div>
                    <div className="text-sm text-muted-foreground">{chall.difficulty}</div>
                  </div>
                  {completedChallenges[index] && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {index === currentChallenge && !completedChallenges[index] && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitBuilder;