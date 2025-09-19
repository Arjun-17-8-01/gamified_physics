import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Brain, Trophy, Gamepad2, Cpu, Book } from 'lucide-react';
import ComponentToolbox from '../components/ComponentToolbox';
import Quiz from '../components/Quiz';
import Challenges from '../components/Challenges';
import Games from '../components/Games';

const Index = () => {
  const [activeSectionId, setActiveSectionId] = useState('circuits');

  const sections = [
    {
      id: 'circuits',
      title: 'Circuits',
      icon: Zap,
      description: 'Interactive electronic circuit simulator with resistors, capacitors, and real-time feedback',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      component: <ComponentToolbox />
    },
    {
      id: 'quiz',
      title: 'Quiz',
      icon: Brain,
      description: 'Test your knowledge with interactive quizzes on various electronics topics',
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      component: <Quiz />
    },
    {
      id: 'challenges',
      title: 'Challenges',
      icon: Trophy,
      description: 'Timed challenges and advanced puzzles to test your circuit-building skills',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      component: <Challenges />
    },
    {
      id: 'games',
      title: 'Games',
      icon: Gamepad2,
      description: 'Fun educational games that make learning electronics engaging and interactive',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      component: <Games />
    }
  ];

  const currentSection = sections.find(s => s.id === activeSectionId);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cpu className="w-12 h-12" />
            <h1 className="text-4xl md:text-6xl font-bold">Electronics Learning Platform</h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Master electronics through interactive simulations, engaging quizzes, and hands-on challenges. 
            Learn at your own pace with our comprehensive educational tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button size="lg" variant="secondary" className="gap-2">
              <Book className="w-5 h-5" />
              Start Learning
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card 
                  key={section.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-hover ${
                    activeSectionId === section.id ? 'ring-2 ring-primary shadow-hover' : ''
                  }`}
                  onClick={() => setActiveSectionId(section.id)}
                >
                  <CardHeader className={`${section.bgColor} rounded-t-lg`}>
                    <CardTitle className="flex items-center gap-3">
                      <Icon className={`w-6 h-6 ${section.color}`} />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {section.description}
                    </p>
                    <Button 
                      variant={activeSectionId === section.id ? "default" : "outline"}
                      size="sm" 
                      className="w-full mt-4 gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {activeSectionId === section.id ? 'Active' : 'Start Learning'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Active Section Content */}
          <div className="min-h-96">
            {currentSection?.component}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Interactive Learning</h3>
              <p className="text-muted-foreground">
                Hands-on simulations and real-time feedback make learning electronics intuitive and engaging.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Progressive Difficulty</h3>
              <p className="text-muted-foreground">
                Start with basic concepts and gradually advance to complex circuit analysis and design.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto">
                <Book className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold">Comprehensive Content</h3>
              <p className="text-muted-foreground">
                Learn everything from Ohm's law to advanced circuit analysis with our structured curriculum.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;