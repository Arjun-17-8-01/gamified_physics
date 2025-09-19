export interface Game {
  id: number;
  title: string;
  description: string;
  objective: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'simulation' | 'puzzle' | 'memory' | 'timing';
  estimatedTime: string;
}

export const games: Game[] = [
  {
    id: 1,
    title: "Resistor Color Code Master",
    description: "Match resistor color bands to their resistance values in this fast-paced memory game. Test your knowledge of the resistor color code system.",
    objective: "Correctly identify 20 resistor values within 2 minutes",
    difficulty: "easy",
    type: "memory",
    estimatedTime: "3-5 minutes"
  },
  {
    id: 2,
    title: "Circuit Builder Simulator",
    description: "Build working circuits by dragging and dropping components. Your circuits must meet specific requirements and pass virtual testing.",
    objective: "Complete 10 circuit challenges using provided components",
    difficulty: "medium",
    type: "simulation",
    estimatedTime: "15-20 minutes"
  },
  {
    id: 3,
    title: "Component Detective",
    description: "Identify mystery electronic components from their symbols, photos, and characteristics. Become an expert at component recognition.",
    objective: "Identify 50 different components correctly",
    difficulty: "medium",
    type: "puzzle",
    estimatedTime: "10-15 minutes"
  },
  {
    id: 4,
    title: "Voltage Drop Racer",
    description: "Race against time to calculate voltage drops across resistors in series circuits. Speed and accuracy determine your score.",
    objective: "Solve 15 voltage drop problems as quickly as possible",
    difficulty: "hard",
    type: "timing",
    estimatedTime: "5-8 minutes"
  },
  {
    id: 5,
    title: "Capacitor Charging Challenge",
    description: "Predict how capacitors charge and discharge in RC circuits. Adjust time constants to match target waveforms.",
    objective: "Match 10 charging curves by selecting correct R and C values",
    difficulty: "hard",
    type: "simulation",
    estimatedTime: "12-18 minutes"
  },
  {
    id: 6,
    title: "Electronic Symbol Bingo",
    description: "Match electronic symbols to their names and functions in this educational bingo game. Perfect for learning schematic symbols.",
    objective: "Complete 5 bingo cards by matching symbols correctly",
    difficulty: "easy",
    type: "memory",
    estimatedTime: "8-12 minutes"
  }
];

export interface GameContent {
  resistorColorGame: {
    colors: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    generateQuestion: () => {
      resistance: number;
      bands: string[];
      options: number[];
    };
  };
  componentSymbols: Array<{
    id: number;
    name: string;
    symbol: string;
    description: string;
    category: 'passive' | 'active' | 'power' | 'logic';
  }>;
}

export const gameContent: GameContent = {
  resistorColorGame: {
    colors: [
      { name: 'Black', value: 0, color: '#000000' },
      { name: 'Brown', value: 1, color: '#8B4513' },
      { name: 'Red', value: 2, color: '#FF0000' },
      { name: 'Orange', value: 3, color: '#FFA500' },
      { name: 'Yellow', value: 4, color: '#FFFF00' },
      { name: 'Green', value: 5, color: '#008000' },
      { name: 'Blue', value: 6, color: '#0000FF' },
      { name: 'Violet', value: 7, color: '#800080' },
      { name: 'Grey', value: 8, color: '#808080' },
      { name: 'White', value: 9, color: '#FFFFFF' },
    ],
    generateQuestion: () => {
      const colors = gameContent.resistorColorGame.colors;
      const digit1 = Math.floor(Math.random() * 9) + 1; // 1-9
      const digit2 = Math.floor(Math.random() * 10); // 0-9
      const multiplier = Math.floor(Math.random() * 4); // 0-3
      
      const resistance = (digit1 * 10 + digit2) * Math.pow(10, multiplier);
      const bands = [colors[digit1].name, colors[digit2].name, colors[multiplier].name];
      
      // Generate wrong options
      const options = [resistance];
      while (options.length < 4) {
        const wrongValue = (Math.floor(Math.random() * 90) + 10) * Math.pow(10, Math.floor(Math.random() * 4));
        if (!options.includes(wrongValue)) {
          options.push(wrongValue);
        }
      }
      
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      return { resistance, bands, options };
    }
  },
  componentSymbols: [
    {
      id: 1,
      name: 'Resistor',
      symbol: '⚡',
      description: 'Limits electrical current flow',
      category: 'passive'
    },
    {
      id: 2,
      name: 'Capacitor',
      symbol: '||',
      description: 'Stores electrical energy',
      category: 'passive'
    },
    {
      id: 3,
      name: 'Inductor',
      symbol: '🌀',
      description: 'Stores energy in magnetic field',
      category: 'passive'
    },
    {
      id: 4,
      name: 'Diode',
      symbol: '▶|',
      description: 'Allows current in one direction',
      category: 'active'
    },
    {
      id: 5,
      name: 'LED',
      symbol: '💡',
      description: 'Light emitting diode',
      category: 'active'
    },
    {
      id: 6,
      name: 'Transistor (NPN)',
      symbol: '🔺',
      description: 'Amplifies or switches signals',
      category: 'active'
    },
    {
      id: 7,
      name: 'Op-Amp',
      symbol: '🔺',
      description: 'Operational amplifier',
      category: 'active'
    },
    {
      id: 8,
      name: 'Battery',
      symbol: '🔋',
      description: 'DC voltage source',
      category: 'power'
    },
    {
      id: 9,
      name: 'Ground',
      symbol: '⏚',
      description: 'Reference point (0V)',
      category: 'power'
    },
    {
      id: 10,
      name: 'Switch',
      symbol: '⏻',
      description: 'Opens/closes circuit path',
      category: 'logic'
    }
  ]
};