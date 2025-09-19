import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Timer, Zap, Bug, Battery } from 'lucide-react';
import ComponentDash from './challenges/ComponentDash';
import BugHunter from './challenges/BugHunter';
import PowerSaver from './challenges/PowerSaver';

const Challenges: React.FC = () => {
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  const handleChallengeComplete = (challengeId: string, score: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
    setActiveChallenge(null);
  };

  const timedChallenges = [
    {
      id: 'component-dash',
      title: 'Component Dash',
      description: 'Rapid-fire component identification challenge',
      icon: '⚡',
      time: '90 seconds',
      objective: 'Identify 15 electronic components correctly'
    },
    {
      id: 'bug-hunter',
      title: 'Bug Hunter',
      description: 'Find and fix circuit errors quickly',
      icon: '🔍',
      time: '3 minutes',
      objective: 'Find bugs in 5 different circuits'
    },
    {
      id: 'power-saver',
      title: 'Power Saver',
      description: 'Build energy-efficient circuits',
      icon: '🔋',
      time: 'No time limit',
      objective: 'Minimize power consumption in 3 challenges'
    }
  ];

  if (activeChallenge === 'component-dash') {
    return <ComponentDash onComplete={(score) => handleChallengeComplete('component-dash', score)} />;
  }

  if (activeChallenge === 'bug-hunter') {
    return <BugHunter onComplete={(score) => handleChallengeComplete('bug-hunter', score)} />;
  }

  if (activeChallenge === 'power-saver') {
    return <PowerSaver onComplete={(score) => handleChallengeComplete('power-saver', score)} />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Timed Challenges</h2>
        <p className="text-muted-foreground">
          Test your speed and accuracy with these exciting challenges
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-success" />
            <span>{completedChallenges.length} / {timedChallenges.length} Completed</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {timedChallenges.map((challenge) => (
          <Card key={challenge.id} className="h-full hover:shadow-hover transition-all duration-200">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{challenge.icon}</div>
              <CardTitle className="flex items-center justify-center gap-2">
                {challenge.title}
                {completedChallenges.includes(challenge.id) && (
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    ✓
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">{challenge.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Timer className="w-4 h-4" />
                  <span>{challenge.time}</span>
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {challenge.objective}
                </div>
              </div>

              <Button 
                onClick={() => setActiveChallenge(challenge.id)}
                className="w-full gap-2"
              >
                {completedChallenges.includes(challenge.id) ? 'Play Again' : 'Start Challenge'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Challenges;