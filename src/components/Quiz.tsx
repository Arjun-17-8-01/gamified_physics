import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { quizQuestions, QuizQuestion } from '../data/quizData';
import { useToast } from '@/hooks/use-toast';

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "Choose one of the options before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setIsFinished(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'hard': return 'bg-destructive';
      default: return 'bg-primary';
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary">
            {percentage}%
          </div>
          <div className="text-xl">
            You scored {score} out of {quizQuestions.length} questions correctly!
          </div>
          <div className="text-muted-foreground">
            {percentage >= 80 ? "Excellent work!" : 
             percentage >= 60 ? "Good job!" : 
             "Keep studying and try again!"}
          </div>
          <Button onClick={resetQuiz} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty.toUpperCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.options.map((option, index) => {
            let buttonVariant: "default" | "outline" | "destructive" | "secondary" = "outline";
            let buttonClass = "";

            if (showResult) {
              if (index === question.correctAnswer) {
                buttonVariant = "default";
                buttonClass = "bg-success hover:bg-success";
              } else if (index === selectedAnswer && index !== question.correctAnswer) {
                buttonVariant = "destructive";
              }
            } else if (selectedAnswer === index) {
              buttonVariant = "secondary";
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={`w-full justify-start text-left h-auto p-4 ${buttonClass}`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-success-foreground ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-destructive-foreground ml-auto" />
                  )}
                </div>
              </Button>
            );
          })}

          {showResult && (
            <Card className="mt-6 bg-muted">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Explanation:</strong> {question.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {!showResult && (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full mt-6"
              disabled={selectedAnswer === null}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;