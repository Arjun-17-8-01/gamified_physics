export interface ComponentSymbol {
  id: number;
  name: string;
  symbol: string;
  category: 'resistor' | 'capacitor' | 'inductor' | 'diode' | 'transistor' | 'logic' | 'power';
  emoji: string;
  description: string;
}

export interface BuggyCircuit {
  id: number;
  title: string;
  description: string;
  components: Array<{
    id: string;
    type: string;
    value?: string;
    position: { x: number; y: number };
    isCorrect: boolean;
    correctValue?: string;
  }>;
  bugDescription: string;
  solution: string;
}

export interface PowerSaverChallenge {
  id: number;
  title: string;
  objective: string;
  targetFunction: string;
  availableComponents: Array<{
    type: string;
    value?: string;
    quantity: number;
    powerConsumption: number;
  }>;
  maxComponents: number;
  solutions: Array<{
    components: string[];
    totalPower: number;
  }>;
}

export const componentSymbols: ComponentSymbol[] = [
  { id: 1, name: 'Resistor', symbol: '⚡', emoji: '🔲', category: 'resistor', description: 'Limits current flow' },
  { id: 2, name: 'Capacitor', symbol: '||', emoji: '⚡', category: 'capacitor', description: 'Stores electrical energy' },
  { id: 3, name: 'Inductor', symbol: '🌀', emoji: '🔄', category: 'inductor', description: 'Stores magnetic energy' },
  { id: 4, name: 'Diode', symbol: '▶|', emoji: '🔺', category: 'diode', description: 'One-way current flow' },
  { id: 5, name: 'LED', symbol: '💡', emoji: '💡', category: 'diode', description: 'Light emitting diode' },
  { id: 6, name: 'Zener Diode', symbol: '▶|◀', emoji: '⚡', category: 'diode', description: 'Voltage regulator' },
  { id: 7, name: 'NPN Transistor', symbol: '🔺', emoji: '📡', category: 'transistor', description: 'Current amplifier/switch' },
  { id: 8, name: 'PNP Transistor', symbol: '🔻', emoji: '📡', category: 'transistor', description: 'Current amplifier/switch' },
  { id: 9, name: 'MOSFET', symbol: '🔲', emoji: '🎛️', category: 'transistor', description: 'Voltage controlled switch' },
  { id: 10, name: 'Op-Amp', symbol: '🔺', emoji: '📈', category: 'logic', description: 'Operational amplifier' },
  { id: 11, name: 'AND Gate', symbol: '&', emoji: '🔗', category: 'logic', description: 'Logic AND operation' },
  { id: 12, name: 'OR Gate', symbol: '≥1', emoji: '🔀', category: 'logic', description: 'Logic OR operation' },
  { id: 13, name: 'NOT Gate', symbol: '¬', emoji: '🚫', category: 'logic', description: 'Logic NOT (inverter)' },
  { id: 14, name: 'Battery', symbol: '🔋', emoji: '🔋', category: 'power', description: 'DC power source' },
  { id: 15, name: 'Ground', symbol: '⏚', emoji: '🌍', category: 'power', description: 'Reference point (0V)' }
];

export const buggyCircuits: BuggyCircuit[] = [
  {
    id: 1,
    title: "LED Circuit with Wrong Resistor",
    description: "This LED circuit has a resistor that's too small, causing excessive current.",
    components: [
      { id: 'r1', type: 'resistor', value: '10Ω', position: { x: 100, y: 100 }, isCorrect: false, correctValue: '220Ω' },
      { id: 'led1', type: 'led', position: { x: 200, y: 100 }, isCorrect: true },
      { id: 'bat1', type: 'battery', value: '9V', position: { x: 50, y: 150 }, isCorrect: true }
    ],
    bugDescription: "The 10Ω resistor is too small and will cause the LED to burn out.",
    solution: "Replace the 10Ω resistor with a 220Ω resistor for safe LED operation."
  },
  {
    id: 2,
    title: "Reversed Capacitor",
    description: "This power supply circuit has a polarized capacitor connected backwards.",
    components: [
      { id: 'c1', type: 'capacitor', value: '1000μF', position: { x: 150, y: 100 }, isCorrect: false, correctValue: '1000μF (reversed)' },
      { id: 'r1', type: 'resistor', value: '1kΩ', position: { x: 100, y: 100 }, isCorrect: true },
      { id: 'bat1', type: 'battery', value: '12V', position: { x: 50, y: 150 }, isCorrect: true }
    ],
    bugDescription: "The electrolytic capacitor is connected with reversed polarity.",
    solution: "Flip the capacitor so the positive terminal connects to the positive voltage."
  },
  {
    id: 3,
    title: "Missing Current Limiting Resistor",
    description: "This transistor circuit is missing a base current limiting resistor.",
    components: [
      { id: 't1', type: 'transistor', value: 'NPN', position: { x: 150, y: 150 }, isCorrect: true },
      { id: 'r1', type: 'resistor', value: '1kΩ', position: { x: 200, y: 100 }, isCorrect: true },
      { id: 'bat1', type: 'battery', value: '5V', position: { x: 50, y: 150 }, isCorrect: true }
    ],
    bugDescription: "Direct connection to transistor base without current limiting resistor.",
    solution: "Add a 10kΩ resistor between the input signal and the transistor base."
  },
  {
    id: 4,
    title: "Incorrect Op-Amp Connections",
    description: "This op-amp circuit has the inverting and non-inverting inputs swapped.",
    components: [
      { id: 'op1', type: 'opamp', position: { x: 150, y: 150 }, isCorrect: false, correctValue: 'inputs swapped' },
      { id: 'r1', type: 'resistor', value: '10kΩ', position: { x: 100, y: 120 }, isCorrect: true },
      { id: 'r2', type: 'resistor', value: '20kΩ', position: { x: 150, y: 100 }, isCorrect: true }
    ],
    bugDescription: "The inverting (-) and non-inverting (+) inputs are connected incorrectly.",
    solution: "Swap the connections to the op-amp inputs for proper amplification."
  },
  {
    id: 5,
    title: "Wrong Diode Orientation",
    description: "This rectifier circuit has a diode installed backwards.",
    components: [
      { id: 'd1', type: 'diode', position: { x: 150, y: 100 }, isCorrect: false, correctValue: 'reversed' },
      { id: 'r1', type: 'resistor', value: '1kΩ', position: { x: 200, y: 100 }, isCorrect: true },
      { id: 'ac1', type: 'ac_source', value: '12VAC', position: { x: 50, y: 150 }, isCorrect: true }
    ],
    bugDescription: "The diode is installed backwards, blocking all current flow.",
    solution: "Flip the diode so current can flow in the forward direction."
  }
];

export const powerSaverChallenges: PowerSaverChallenge[] = [
  {
    id: 1,
    title: "Efficient LED Driver",
    objective: "Light an LED with minimum power consumption",
    targetFunction: "Illuminate LED at safe brightness",
    availableComponents: [
      { type: 'LED', quantity: 1, powerConsumption: 20 },
      { type: '220Ω Resistor', quantity: 2, powerConsumption: 5 },
      { type: '470Ω Resistor', quantity: 2, powerConsumption: 3 },
      { type: '1kΩ Resistor', quantity: 2, powerConsumption: 2 },
      { type: '9V Battery', quantity: 1, powerConsumption: 0 }
    ],
    maxComponents: 3,
    solutions: [
      { components: ['LED', '470Ω Resistor', '9V Battery'], totalPower: 23 },
      { components: ['LED', '1kΩ Resistor', '9V Battery'], totalPower: 22 }
    ]
  },
  {
    id: 2,
    title: "Low Power Amplifier",
    objective: "Create a simple amplifier using minimal components",
    targetFunction: "Amplify audio signal with low power consumption",
    availableComponents: [
      { type: 'NPN Transistor', quantity: 1, powerConsumption: 15 },
      { type: '1kΩ Resistor', quantity: 3, powerConsumption: 2 },
      { type: '10kΩ Resistor', quantity: 2, powerConsumption: 1 },
      { type: '100μF Capacitor', quantity: 2, powerConsumption: 1 },
      { type: '12V Battery', quantity: 1, powerConsumption: 0 }
    ],
    maxComponents: 5,
    solutions: [
      { components: ['NPN Transistor', '10kΩ Resistor', '1kΩ Resistor', '100μF Capacitor', '12V Battery'], totalPower: 19 }
    ]
  },
  {
    id: 3,
    title: "Voltage Divider Challenge",
    objective: "Create 5V output from 12V input with minimal power loss",
    targetFunction: "Output exactly 5V with lowest current draw",
    availableComponents: [
      { type: '1kΩ Resistor', quantity: 3, powerConsumption: 12 },
      { type: '2.2kΩ Resistor', quantity: 2, powerConsumption: 5 },
      { type: '4.7kΩ Resistor', quantity: 2, powerConsumption: 3 },
      { type: '10kΩ Resistor', quantity: 2, powerConsumption: 1 },
      { type: '12V Battery', quantity: 1, powerConsumption: 0 }
    ],
    maxComponents: 3,
    solutions: [
      { components: ['10kΩ Resistor', '10kΩ Resistor', '12V Battery'], totalPower: 2 },
      { components: ['4.7kΩ Resistor', '4.7kΩ Resistor', '12V Battery'], totalPower: 6 }
    ]
  }
];