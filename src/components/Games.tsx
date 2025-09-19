import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Trophy, Clock, Target, Star } from 'lucide-react';
import { games } from '../data/gameData';
import ResistorColorGame from './games/ResistorColorGame';
import ComponentDetective from './games/ComponentDetective';
import CircuitBuilder from './games/CircuitBuilder';

const Games: React.FC = () => {
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [completedGames, setCompletedGames] = useState<number[]>([]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'simulation': return '🔧';
      case 'puzzle': return '🧩';
      case 'memory': return '🧠';
      case 'timing': return '⏱️';
      default: return '🎮';
    }
  };

  const handleGameComplete = (gameId: number, score?: number) => {
    if (!completedGames.includes(gameId)) {
      setCompletedGames([...completedGames, gameId]);
    }
    setActiveGame(null);
  };

  const renderGame = (gameId: number) => {
    switch (gameId) {
      case 1:
        return <ResistorColorGame onComplete={(score) => handleGameComplete(gameId, score)} />;
      case 3:
        return <ComponentDetective onComplete={(score) => handleGameComplete(gameId, score)} />;
      case 2:
        return <CircuitBuilder onComplete={(score) => handleGameComplete(gameId, score)} />;
      default:
        return (
          <div className="text-center py-8 space-y-4">
            <div className="text-6xl">🎮</div>
            <h3 className="text-xl font-semibold">Coming Soon!</h3>
            <p className="text-muted-foreground">This game is under development.</p>
            <Button onClick={() => setActiveGame(null)}>Back to Games</Button>
          </div>
        );
    }
  };

  if (activeGame) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{games.find(g => g.id === activeGame)?.title}</h2>
          <Button variant="outline" onClick={() => setActiveGame(null)}>
            Back to Games
          </Button>
        </div>
        {renderGame(activeGame)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Educational Games</h2>
        <p className="text-muted-foreground">
          Learn electronics principles through fun, interactive games
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-success" />
            <span>{completedGames.length} / {games.length} Games Completed</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className="h-full hover:shadow-hover transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{game.title}</CardTitle>
                {completedGames.includes(game.id) && (
                  <Trophy className="w-5 h-5 text-success flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getDifficultyColor(game.difficulty)}>
                  {game.difficulty}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  {getTypeIcon(game.type)} {game.type}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {game.estimatedTime}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{game.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Target className="w-4 h-4" />
                  Objective
                </div>
                <p className="text-sm text-muted-foreground">{game.objective}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => setActiveGame(game.id)}
                  className="flex-1 gap-2"
                >
                  <Play className="w-4 h-4" />
                  Play Game
                </Button>
                
                {(game.id === 4 || game.id === 5 || game.id === 6) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Star className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Game Preview</DialogTitle>
                      </DialogHeader>
                      <div className="text-center py-8 space-y-4">
                        <div className="text-6xl">{getTypeIcon(game.type)}</div>
                        <h3 className="text-xl font-semibold">{game.title}</h3>
                        <p className="text-muted-foreground">{game.description}</p>
                        <Badge className={getDifficultyColor(game.difficulty)}>
                          Coming Soon - {game.difficulty} level
                        </Badge>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Games;