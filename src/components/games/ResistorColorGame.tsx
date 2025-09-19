import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Timer, Trophy } from 'lucide-react';
import { gameContent } from '../../data/gameData';
import Resistor from '../electronics/Resistor';

interface ResistorColorGameProps {
  onComplete: (score: number) => void;
}

const ResistorColorGame: React.FC<ResistorColorGameProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const totalQuestions = 20;

  useEffect(() => {
    // Generate questions when game starts
    if (gameStarted && questions.length === 0) {
      const newQuestions = [];
      for (let i = 0; i < totalQuestions; i++) {
        newQuestions.push(gameContent.resistorColorGame.generateQuestion());
      }
      setQuestions(newQuestions);
    }
  }, [gameStarted, questions.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameEnded && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted, gameEnded]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(120);
    setScore(0);
    setCurrentQuestion(0);
    setGameEnded(false);
    setQuestions([]);
  };

  const endGame = () => {
    setGameEnded(true);
    onComplete(score);
  };

  const handleAnswerSelect = (answerValue: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerValue);
    setShowResult(true);

    const correct = answerValue === questions[currentQuestion].resistance;
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
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Resistor Color Code Master</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl">🎯</div>
          <div className="space-y-2">
            <p className="text-lg">Match resistor color bands to their resistance values!</p>
            <p className="text-muted-foreground">
              You have 2 minutes to answer 20 questions correctly.
            </p>
          </div>
          <div className="bg-muted p-4 rounded-lg text-left space-y-2">
            <h4 className="font-semibold">How to play:</h4>
            <ul className="text-sm space-y-1">
              <li>• Look at the resistor color bands</li>
              <li>• Calculate the resistance value</li>
              <li>• Select the correct answer</li>
              <li>• Score points for correct answers</li>
            </ul>
          </div>
          <Button onClick={startGame} size="lg" className="gap-2">
            <Timer className="w-5 h-5" />
            Start Game
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
            Game Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary">
            {score}/{totalQuestions}
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-semibold">{percentage}% Accuracy</div>
            <p className="text-muted-foreground">
              {percentage >= 80 ? "Excellent work! You're a color code master!" : 
               percentage >= 60 ? "Good job! Keep practicing to improve." : 
               "Keep studying the color codes and try again!"}
            </p>
          </div>
          <Button onClick={startGame} className="gap-2">
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <div className="text-lg">Loading questions...</div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Timer className="w-3 h-3" />
                {formatTime(timeLeft)}
              </Badge>
              <Badge variant="outline">
                Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">What is the resistance value?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Resistor value={question.resistance} size="lg" />
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
                <div className="text-xs text-muted-foreground">Color bands:</div>
                <div className="flex gap-1 justify-center mt-1">
                  {question.bands.map((band: string, index: number) => (
                    <div key={index} className="text-xs px-2 py-1 bg-muted rounded">
                      {band}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-12">
            {question.options.map((option: number, index: number) => {
              let buttonClass = "";
              let icon = null;

              if (showResult) {
                if (option === question.resistance) {
                  buttonClass = "bg-success hover:bg-success text-success-foreground";
                  icon = <CheckCircle className="w-4 h-4" />;
                } else if (option === selectedAnswer) {
                  buttonClass = "bg-destructive hover:bg-destructive text-destructive-foreground";
                  icon = <XCircle className="w-4 h-4" />;
                }
              }

              return (
                <Button
                  key={index}
                  variant={selectedAnswer === option && !showResult ? "secondary" : "outline"}
                  className={`h-12 text-lg ${buttonClass}`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-2">
                    <span>{option}Ω</span>
                    {icon}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResistorColorGame;