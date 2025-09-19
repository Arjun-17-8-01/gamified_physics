import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Eye, Trophy } from 'lucide-react';
import { gameContent } from '../../data/gameData';

interface ComponentDetectiveProps {
  onComplete: (score: number) => void;
}

const ComponentDetective: React.FC<ComponentDetectiveProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledComponents, setShuffledComponents] = useState<any[]>([]);

  const totalQuestions = 10;

  useEffect(() => {
    if (gameStarted && shuffledComponents.length === 0) {
      // Shuffle components for random order
      const shuffled = [...gameContent.componentSymbols].sort(() => Math.random() - 0.5);
      setShuffledComponents(shuffled.slice(0, totalQuestions));
    }
  }, [gameStarted, shuffledComponents.length]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentQuestion(0);
    setGameEnded(false);
    setShuffledComponents([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const endGame = () => {
    setGameEnded(true);
    onComplete(score);
  };

  const generateOptions = (correctComponent: any) => {
    const allComponents = gameContent.componentSymbols;
    const wrongOptions = allComponents
      .filter(comp => comp.id !== correctComponent.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctComponent, ...wrongOptions]
      .sort(() => Math.random() - 0.5);
    
    return options;
  };

  const handleAnswerSelect = (componentName: string) => {
    if (showResult) return;
    
    setSelectedAnswer(componentName);
    setShowResult(true);

    const correct = componentName === shuffledComponents[currentQuestion].name;
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        endGame();
      }
    }, 2000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'passive': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'power': return 'bg-red-500';
      case 'logic': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (!gameStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Component Detective</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">🔍</div>
          <div className="space-y-2">
            <p className="text-lg">Identify electronic components from their symbols and descriptions!</p>
            <p className="text-muted-foreground">
              Test your knowledge of common electronic components.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg text-left space-y-2">
            <h4 className="font-semibold">Component Categories:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500">Passive</Badge>
              <Badge className="bg-green-500">Active</Badge>
              <Badge className="bg-red-500">Power</Badge>
              <Badge className="bg-purple-500">Logic</Badge>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2">
            <Eye className="w-5 h-5" />
            Start Detection
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameEnded) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-success" />
            Detection Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary">
            {score}/{totalQuestions}
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-semibold">{percentage}% Accuracy</div>
            <p className="text-muted-foreground">
              {percentage >= 80 ? "Outstanding! You're a component identification expert!" : 
               percentage >= 60 ? "Good work! You have solid component knowledge." : 
               "Keep studying component symbols and try again!"}
            </p>
          </div>
          <Button onClick={startGame} className="gap-2">
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (shuffledComponents.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <div className="text-lg">Preparing components...</div>
        </CardContent>
      </Card>
    );
  }

  const currentComponent = shuffledComponents[currentQuestion];
  const options = generateOptions(currentComponent);
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="outline">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Component {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Identify this component:</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-8xl">{currentComponent.symbol}</div>
            <div className="space-y-2">
              <Badge className={getCategoryColor(currentComponent.category)}>
                {currentComponent.category}
              </Badge>
              <p className="text-muted-foreground italic">
                "{currentComponent.description}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {options.map((option, index) => {
              let buttonClass = "";
              let icon = null;

              if (showResult) {
                if (option.name === currentComponent.name) {
                  buttonClass = "bg-success hover:bg-success text-success-foreground";
                  icon = <CheckCircle className="w-4 h-4" />;
                } else if (option.name === selectedAnswer) {
                  buttonClass = "bg-destructive hover:bg-destructive text-destructive-foreground";
                  icon = <XCircle className="w-4 h-4" />;
                }
              }

              return (
                <Button
                  key={index}
                  variant={selectedAnswer === option.name && !showResult ? "secondary" : "outline"}
                  className={`h-12 justify-between ${buttonClass}`}
                  onClick={() => handleAnswerSelect(option.name)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.symbol}</span>
                    <span className="text-lg">{option.name}</span>
                  </div>
                  {icon}
                </Button>
              );
            })}
          </div>

          {showResult && (
            <Card className="bg-muted">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <h4 className="font-semibold">{currentComponent.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {currentComponent.description}
                  </p>
                  <Badge className={getCategoryColor(currentComponent.category)}>
                    {currentComponent.category} component
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentDetective;