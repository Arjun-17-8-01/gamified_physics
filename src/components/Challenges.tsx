import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, Trophy, Lightbulb, Target, Clock } from 'lucide-react';
import { challenges, Challenge } from '../data/challengeData';

const Challenges: React.FC = () => {
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  const markAsCompleted = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  const easyChanges = challenges.filter(c => c.difficulty === 'easy');
  const mediumChallenges = challenges.filter(c => c.difficulty === 'medium');
  const hardChallenges = challenges.filter(c => c.difficulty === 'hard');

  const ChallengeCard = ({ challenge }: { challenge: Challenge }) => (
    <Card className="h-full hover:shadow-hover transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{challenge.title}</CardTitle>
          {completedChallenges.includes(challenge.id) && (
            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {getDifficultyIcon(challenge.difficulty)} {challenge.difficulty}
          </Badge>
          {challenge.targetValue && (
            <Badge variant="outline" className="gap-1">
              <Target className="w-3 h-3" />
              {challenge.targetValue}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{challenge.description}</p>
        <div className="space-y-2">
          <div className="text-sm font-medium">Required Components:</div>
          <div className="flex flex-wrap gap-1">
            {challenge.requiredComponents.map((component, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {component}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSelectedChallenge(challenge)}
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {challenge.title}
                  <Badge className={getDifficultyColor(challenge.difficulty)}>
                    {challenge.difficulty}
                  </Badge>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Objective
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">{challenge.objective}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Description</h4>
                  <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Required Components</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {challenge.requiredComponents.map((component, index) => (
                      <Badge key={index} variant="secondary">
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Hints
                  </h4>
                  <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                    {challenge.hints.map((hint, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4" />
                    Solution
                  </h4>
                  <p className="text-sm">{challenge.solution}</p>
                </div>

                <Button 
                  onClick={() => markAsCompleted(challenge.id)}
                  disabled={completedChallenges.includes(challenge.id)}
                  className="w-full"
                >
                  {completedChallenges.includes(challenge.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    'Mark as Completed'
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            size="sm" 
            onClick={() => markAsCompleted(challenge.id)}
            disabled={completedChallenges.includes(challenge.id)}
          >
            {completedChallenges.includes(challenge.id) ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              'Start'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Electronics Challenges</h2>
        <p className="text-muted-foreground">
          Test your skills with hands-on circuit building challenges
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-success" />
            <span>{completedChallenges.length} / {challenges.length} Completed</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="easy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="easy" className="gap-2">
            ⭐ Easy ({easyChanges.length})
          </TabsTrigger>
          <TabsTrigger value="medium" className="gap-2">
            ⭐⭐ Medium ({mediumChallenges.length})
          </TabsTrigger>
          <TabsTrigger value="hard" className="gap-2">
            ⭐⭐⭐ Hard ({hardChallenges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="easy" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {easyChanges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediumChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hard" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hardChallenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Challenges;