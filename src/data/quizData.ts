export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the unit of electrical resistance?",
    options: ["Ampere", "Volt", "Ohm", "Watt"],
    correctAnswer: 2,
    explanation: "The ohm (Ω) is the unit of electrical resistance, named after Georg Ohm.",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "According to Ohm's law, if voltage increases and resistance stays constant, what happens to current?",
    options: ["Decreases", "Increases", "Stays the same", "Becomes zero"],
    correctAnswer: 1,
    explanation: "According to Ohm's law (V = I × R), if voltage increases and resistance is constant, current must increase proportionally.",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What does the first color band on a resistor represent?",
    options: ["Tolerance", "Multiplier", "Second digit", "First digit"],
    correctAnswer: 3,
    explanation: "The first color band represents the first significant digit of the resistance value.",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "A capacitor stores energy in the form of:",
    options: ["Magnetic field", "Electric field", "Heat", "Light"],
    correctAnswer: 1,
    explanation: "Capacitors store electrical energy in an electric field between their plates.",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "What is the total resistance of two 100Ω resistors connected in series?",
    options: ["50Ω", "100Ω", "200Ω", "400Ω"],
    correctAnswer: 2,
    explanation: "In series connection, total resistance equals the sum of individual resistances: 100Ω + 100Ω = 200Ω",
    difficulty: "medium"
  },
  {
    id: 6,
    question: "What is the total resistance of two 100Ω resistors connected in parallel?",
    options: ["25Ω", "50Ω", "100Ω", "200Ω"],
    correctAnswer: 1,
    explanation: "In parallel: 1/Rtotal = 1/R1 + 1/R2 = 1/100 + 1/100 = 2/100, so Rtotal = 50Ω",
    difficulty: "medium"
  },
  {
    id: 7,
    question: "What does LED stand for?",
    options: ["Light Emitting Diode", "Low Energy Device", "Linear Electronic Display", "Liquid Electric Display"],
    correctAnswer: 0,
    explanation: "LED stands for Light Emitting Diode - a semiconductor device that emits light when current passes through it.",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "Which component allows current to flow in only one direction?",
    options: ["Resistor", "Capacitor", "Diode", "Inductor"],
    correctAnswer: 2,
    explanation: "A diode is a semiconductor device that allows current to flow in only one direction.",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "What is the typical voltage of a standard AA battery?",
    options: ["1.2V", "1.5V", "3V", "9V"],
    correctAnswer: 1,
    explanation: "A standard alkaline AA battery provides approximately 1.5 volts.",
    difficulty: "easy"
  },
  {
    id: 10,
    question: "In a transistor, what are the three terminals called?",
    options: ["Anode, Cathode, Grid", "Base, Collector, Emitter", "Source, Drain, Gate", "Positive, Negative, Ground"],
    correctAnswer: 1,
    explanation: "A bipolar transistor has three terminals: Base, Collector, and Emitter.",
    difficulty: "medium"
  },
  {
    id: 11,
    question: "What happens to the total capacitance when capacitors are connected in parallel?",
    options: ["Decreases", "Increases", "Stays the same", "Becomes zero"],
    correctAnswer: 1,
    explanation: "In parallel connection, total capacitance is the sum of individual capacitances, so it increases.",
    difficulty: "medium"
  },
  {
    id: 12,
    question: "What is the power dissipated by a 100Ω resistor with 2A current flowing through it?",
    options: ["200W", "400W", "50W", "100W"],
    correctAnswer: 1,
    explanation: "Power = I²R = (2A)² × 100Ω = 4 × 100 = 400W",
    difficulty: "hard"
  },
  {
    id: 13,
    question: "What does PWM stand for in electronics?",
    options: ["Power Wave Modulation", "Pulse Width Modulation", "Phase Wave Management", "Positive Wave Motion"],
    correctAnswer: 1,
    explanation: "PWM stands for Pulse Width Modulation - a technique for controlling power delivery.",
    difficulty: "medium"
  },
  {
    id: 14,
    question: "Which law states that the sum of currents entering a node equals the sum leaving?",
    options: ["Ohm's Law", "Kirchhoff's Current Law", "Faraday's Law", "Lenz's Law"],
    correctAnswer: 1,
    explanation: "Kirchhoff's Current Law (KCL) states that the algebraic sum of currents at any node is zero.",
    difficulty: "medium"
  },
  {
    id: 15,
    question: "What is the impedance of a pure capacitor at zero frequency (DC)?",
    options: ["Zero", "Infinite", "Equal to capacitance", "Equal to 1/C"],
    correctAnswer: 1,
    explanation: "At DC (zero frequency), a capacitor acts as an open circuit, so impedance is infinite.",
    difficulty: "hard"
  },
  {
    id: 16,
    question: "What is the frequency of AC mains power in most countries?",
    options: ["50Hz", "60Hz", "Both 50Hz and 60Hz", "100Hz"],
    correctAnswer: 2,
    explanation: "Most countries use either 50Hz (Europe, Asia, Africa) or 60Hz (North America, parts of South America).",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "What does IC stand for in electronics?",
    options: ["Internal Circuit", "Integrated Circuit", "Individual Component", "Insulated Conductor"],
    correctAnswer: 1,
    explanation: "IC stands for Integrated Circuit - a semiconductor device containing multiple electronic components.",
    difficulty: "easy"
  },
  {
    id: 18,
    question: "In which configuration do operational amplifiers have the highest input impedance?",
    options: ["Inverting", "Non-inverting", "Differential", "Common mode"],
    correctAnswer: 1,
    explanation: "Non-inverting configuration has higher input impedance because the input signal is applied to the positive terminal.",
    difficulty: "hard"
  },
  {
    id: 19,
    question: "What is the typical forward voltage drop across a silicon diode?",
    options: ["0.3V", "0.7V", "1.2V", "3.3V"],
    correctAnswer: 1,
    explanation: "A silicon diode typically has a forward voltage drop of approximately 0.7V when conducting.",
    difficulty: "medium"
  },
  {
    id: 20,
    question: "Which component is used to step up or step down AC voltage?",
    options: ["Resistor", "Capacitor", "Transformer", "Inductor"],
    correctAnswer: 2,
    explanation: "A transformer uses electromagnetic induction to step up or step down AC voltage levels.",
    difficulty: "easy"
  }
];