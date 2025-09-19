export interface Challenge {
  id: number;
  title: string;
  description: string;
  objective: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requiredComponents: string[];
  targetValue?: string;
  hints: string[];
  solution: string;
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Basic Series Resistance",
    description: "Create a total resistance of 330Ω using two resistors in series.",
    objective: "Combine resistors to achieve exactly 330Ω",
    difficulty: "easy",
    requiredComponents: ["100Ω resistor", "220Ω resistor", "470Ω resistor"],
    targetValue: "330Ω",
    hints: ["In series, resistances add up", "R_total = R1 + R2"],
    solution: "Use 100Ω + 220Ω = 320Ω (closest to target) or find exact combinations"
  },
  {
    id: 2,
    title: "Parallel Resistance Challenge",
    description: "Achieve a total resistance of 50Ω using two identical resistors in parallel.",
    objective: "Find the correct resistor value for parallel connection",
    difficulty: "easy",
    requiredComponents: ["Various resistors"],
    targetValue: "50Ω",
    hints: ["In parallel: 1/R_total = 1/R1 + 1/R2", "For identical resistors: R_total = R/2"],
    solution: "Use two 100Ω resistors in parallel: 100Ω/2 = 50Ω"
  },
  {
    id: 3,
    title: "Voltage Divider Design",
    description: "Design a voltage divider that outputs 2.5V from a 5V input.",
    objective: "Create a 50% voltage divider",
    difficulty: "medium",
    requiredComponents: ["220Ω resistor", "470Ω resistor", "1kΩ resistor"],
    targetValue: "2.5V",
    hints: ["Vout = Vin × (R2/(R1+R2))", "Use equal resistors for 50% division"],
    solution: "Use two equal resistors (any value) - voltage will be exactly half"
  },
  {
    id: 4,
    title: "LED Current Limiting",
    description: "Calculate the resistor needed to limit LED current to 20mA with 5V supply.",
    objective: "Protect LED from overcurrent",
    difficulty: "medium",
    requiredComponents: ["LED (2V forward drop)", "Various resistors"],
    targetValue: "20mA current",
    hints: ["LED drops ~2V", "Ohm's law: R = V/I", "Resistor voltage = Supply - LED voltage"],
    solution: "R = (5V - 2V) / 0.02A = 150Ω"
  },
  {
    id: 5,
    title: "Complex Series-Parallel",
    description: "Build a network with 100Ω total resistance using four resistors.",
    objective: "Combine series and parallel techniques",
    difficulty: "hard",
    requiredComponents: ["100Ω (×2)", "200Ω (×2)"],
    targetValue: "100Ω",
    hints: ["Mix series and parallel connections", "Calculate step by step"],
    solution: "Multiple solutions possible - one is: 200Ω || 200Ω = 100Ω, then in series with 100Ω - 100Ω = 100Ω"
  },
  {
    id: 6,
    title: "Capacitor Time Constant",
    description: "Design an RC circuit with a 1-second time constant.",
    objective: "Achieve τ = RC = 1 second",
    difficulty: "medium",
    requiredComponents: ["1kΩ resistor", "100μF capacitor", "1000μF capacitor"],
    targetValue: "1 second",
    hints: ["τ = R × C", "1 second = 1000ms"],
    solution: "Use 1kΩ × 1000μF = 1 second, or 10kΩ × 100μF = 1 second"
  },
  {
    id: 7,
    title: "Power Calculation Challenge",
    description: "Find the component that dissipates exactly 1W in the circuit.",
    objective: "Calculate power dissipation",
    difficulty: "medium",
    requiredComponents: ["Various resistors", "12V supply"],
    targetValue: "1W",
    hints: ["P = V²/R = I²R = VI", "Work backwards from power requirement"],
    solution: "For 12V supply: R = V²/P = 144/1 = 144Ω"
  },
  {
    id: 8,
    title: "Bridge Rectifier Design",
    description: "Design a full-wave bridge rectifier for AC to DC conversion.",
    objective: "Convert AC to pulsating DC",
    difficulty: "hard",
    requiredComponents: ["4 diodes", "Load resistor", "Filter capacitor"],
    targetValue: "DC output",
    hints: ["Use 4 diodes in bridge configuration", "Add filter capacitor"],
    solution: "Connect diodes in bridge, add filter capacitor across output"
  },
  {
    id: 9,
    title: "Oscillator Frequency",
    description: "Design an RC oscillator to generate a 1kHz signal.",
    objective: "Create 1kHz oscillation",
    difficulty: "hard",
    requiredComponents: ["Op-amp", "Resistors", "Capacitors"],
    targetValue: "1kHz",
    hints: ["f = 1/(2πRC) for simple RC oscillator", "Adjust R or C to get desired frequency"],
    solution: "For 1kHz: Use R=1.6kΩ, C=100nF gives f ≈ 1kHz"
  },
  {
    id: 10,
    title: "Amplifier Gain Setting",
    description: "Set up a non-inverting amplifier with gain of 10.",
    objective: "Achieve 10x amplification",
    difficulty: "medium",
    requiredComponents: ["Op-amp", "1kΩ resistor", "9kΩ resistor"],
    targetValue: "Gain = 10",
    hints: ["Gain = 1 + (Rf/Rin)", "Need Rf = 9 × Rin"],
    solution: "Use Rf = 9kΩ, Rin = 1kΩ for gain = 1 + 9 = 10"
  },
  {
    id: 11,
    title: "Filter Cutoff Frequency",
    description: "Design a low-pass filter with cutoff at 1kHz.",
    objective: "Create 1kHz low-pass filter",
    difficulty: "medium",
    requiredComponents: ["Resistors", "Capacitors"],
    targetValue: "fc = 1kHz",
    hints: ["fc = 1/(2πRC)", "Choose convenient R and C values"],
    solution: "Use R=1.6kΩ, C=100nF: fc = 1/(2π×1600×100×10⁻⁹) ≈ 1kHz"
  },
  {
    id: 12,
    title: "Transistor Biasing",
    description: "Bias a transistor for linear operation with Ic = 1mA.",
    objective: "Set collector current to 1mA",
    difficulty: "hard",
    requiredComponents: ["NPN transistor", "Various resistors", "9V supply"],
    targetValue: "Ic = 1mA",
    hints: ["Use voltage divider biasing", "Ic ≈ Ie for small signal transistors"],
    solution: "Set base voltage to ~2.7V, emitter resistor ~2kΩ"
  },
  {
    id: 13,
    title: "Zener Voltage Regulation",
    description: "Create a 5V regulated supply from 12V input using a Zener diode.",
    objective: "Regulate voltage to 5V",
    difficulty: "medium",
    requiredComponents: ["5.1V Zener diode", "Current limiting resistor", "Load"],
    targetValue: "5V output",
    hints: ["Zener works in reverse bias", "Need series resistor for current limiting"],
    solution: "Use 5.1V Zener with appropriate series resistor based on load current"
  },
  {
    id: 14,
    title: "Schmitt Trigger Design",
    description: "Design a Schmitt trigger with 2V and 3V switching thresholds.",
    objective: "Create hysteresis switching",
    difficulty: "hard",
    requiredComponents: ["Op-amp", "Resistors for feedback"],
    targetValue: "2V/3V thresholds",
    hints: ["Use positive feedback", "Threshold = ±Vout × R1/(R1+R2)"],
    solution: "Set feedback ratio to achieve desired switching points"
  },
  {
    id: 15,
    title: "Motor Speed Control",
    description: "Design a PWM circuit to control DC motor speed at 50% duty cycle.",
    objective: "50% duty cycle PWM",
    difficulty: "hard",
    requiredComponents: ["555 timer", "Resistors", "Capacitors", "Diode"],
    targetValue: "50% duty cycle",
    hints: ["Use 555 in astable mode", "Duty cycle = (Ra + Rb)/(Ra + 2Rb)"],
    solution: "For 50%: make Ra negligible, or use diode steering"
  },
  {
    id: 16,
    title: "Current Mirror Design",
    description: "Create a current mirror that copies 2mA reference current.",
    objective: "Mirror 2mA current",
    difficulty: "hard",
    requiredComponents: ["Matched transistors", "Reference resistor"],
    targetValue: "2mA",
    hints: ["Use matched transistor pair", "Reference current sets mirror current"],
    solution: "Set reference current with resistor, mirror transistor copies it"
  },
  {
    id: 17,
    title: "Peak Detector Circuit",
    description: "Build a peak detector to capture maximum input voltage.",
    objective: "Detect and hold peak voltage",
    difficulty: "medium",
    requiredComponents: ["Diode", "Capacitor", "Op-amp buffer"],
    targetValue: "Peak detection",
    hints: ["Diode charges capacitor to peak", "Buffer prevents discharge"],
    solution: "Diode-capacitor combo with op-amp buffer to prevent loading"
  },
  {
    id: 18,
    title: "Crystal Oscillator",
    description: "Design a crystal oscillator for precise 32.768kHz timing.",
    objective: "Generate 32.768kHz clock",
    difficulty: "hard",
    requiredComponents: ["32.768kHz crystal", "Inverter", "Feedback resistor", "Load capacitors"],
    targetValue: "32.768kHz",
    hints: ["Use Pierce oscillator topology", "Load capacitors determine frequency"],
    solution: "Pierce oscillator with appropriate load capacitors for crystal"
  },
  {
    id: 19,
    title: "Temperature Sensor Interface",
    description: "Interface a thermistor to produce 10mV/°C output.",
    objective: "Linear temperature conversion",
    difficulty: "hard",
    requiredComponents: ["Thermistor", "Op-amp", "Reference resistors"],
    targetValue: "10mV/°C",
    hints: ["Linearize thermistor response", "Use op-amp for scaling"],
    solution: "Voltage divider with thermistor, op-amp scaling for linear output"
  },
  {
    id: 20,
    title: "Power Supply Ripple Reduction",
    description: "Reduce power supply ripple from 100mV to 10mV.",
    objective: "90% ripple reduction",
    difficulty: "medium",
    requiredComponents: ["Filter capacitors", "Inductor", "Load resistor"],
    targetValue: "10mV ripple",
    hints: ["Use LC or RC filtering", "Multiple stages increase attenuation"],
    solution: "LC filter or multiple RC stages to achieve 20dB attenuation"
  }
];