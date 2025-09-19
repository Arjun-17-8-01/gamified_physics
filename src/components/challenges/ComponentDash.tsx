import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Trophy, Zap, RotateCcw } from 'lucide-react';
import { componentSymbols } from '../../data/challengeActivities';

interface ComponentDashProps {
  onComplete: (score: number) => void;
}

const ComponentDash: React.FC<ComponentDashProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(90);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledSymbols, setShuffledSymbols] = useState<typeof componentSymbols>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const totalQuestions = 15;

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateQuestion = () => {
    if (currentQuestion >= totalQuestions) {
      finishGame();
      return;
    }

    const currentSymbol = shuffledSymbols[currentQuestion];
    const wrongAnswers = componentSymbols
      .filter(s => s.id !== currentSymbol.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(s => s.name);
    
    const allOptions = shuffleArray([...wrongAnswers, currentSymbol.name]);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(90);
    setCurrentQuestion(0);
    setScore(0);
    setShuffledSymbols(shuffleArray(componentSymbols));
  };

  const finishGame = () => {
    setGameState('finished');
    onComplete(score);
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const currentSymbol = shuffledSymbols[currentQuestion];
    const isCorrect = answer === currentSymbol.name;
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setTimeout(() => generateQuestion(), 100);
    }, 1500);
  };

  const resetGame = () => {
    setGameState('ready');
    setTimeLeft(90);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && timeLeft === 0) {
      finishGame();
    }
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === 'playing' && shuffledSymbols.length > 0) {
      generateQuestion();
    }
  }, [gameState, shuffledSymbols, currentQuestion]);

  if (gameState === 'ready') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Zap className="w-6 h-6" />
            Component Dash
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">⚡</div>
          <div className="space-y-2">
            <p className="text-lg font-medium">Rapid-Fire Component Identification</p>
            <p className="text-muted-foreground">
              Identify 15 electronic component symbols as quickly as possible!
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Timer className="w-4 h-4" />
              <span className="font-semibold">90 seconds</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>15 questions</span>
            </div>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2">
            <Zap className="w-5 h-5" />
            Start Challenge
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'finished') {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Challenge Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{score} / {totalQuestions}</div>
            <div className="text-lg text-muted-foreground">{percentage}% Correct</div>
          </div>
          <div className="space-y-2">
            <Progress value={percentage} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
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

  const currentSymbol = shuffledSymbols[currentQuestion];
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Game Header */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-2">
                <Timer className="w-4 h-4" />
                {timeLeft}s
              </Badge>
              <Badge className="gap-2">
                <Trophy className="w-4 h-4" />
                {score} / {totalQuestions}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>What is this component?</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-8xl bg-muted/30 p-8 rounded-lg inline-block">
            {currentSymbol?.emoji}
          </div>
          <div className="text-2xl font-mono">
            {currentSymbol?.symbol}
          </div>
          
          {feedback && (
            <div className={`p-4 rounded-lg ${
              feedback === 'correct' 
                ? 'bg-success/10 border border-success/20 text-success' 
                : 'bg-destructive/10 border border-destructive/20 text-destructive'
            }`}>
              <div className="font-semibold">
                {feedback === 'correct' ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              <div className="text-sm">
                {currentSymbol?.name} - {currentSymbol?.description}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {options.map((option) => (
              <Button
                key={option}
                variant={
                  selectedAnswer === option 
                    ? (feedback === 'correct' ? 'default' : 'destructive')
                    : selectedAnswer 
                      ? 'outline' 
                      : 'outline'
                }
                onClick={() => handleAnswer(option)}
                disabled={!!selectedAnswer}
                className="h-12"
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentDash;