export interface CircuitLevel {
  id: number;
  title: string;
  description: string;
  diagram: {
    width: number;
    height: number;
    connections: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
    }>;
    slots: Array<{
      id: string;
      x: number;
      y: number;
      type: 'resistor' | 'capacitor';
      requiredValue?: number;
    }>;
    lightBulb: { x: number; y: number };
    motor: { x: number; y: number };
    battery: { x: number; y: number };
  };
  solutions: Array<{
    slotId: string;
    componentType: 'resistor' | 'capacitor';
    value: number;
  }[]>;
  availableComponents: {
    resistors: number[];
    capacitors: Array<{ value: number; unit: 'pF' | 'nF' | 'μF' }>;
  };
}

export const circuitLevels: CircuitLevel[] = [
  {
    id: 1,
    title: "Basic LED Circuit",
    description: "Connect a resistor to light up the LED and spin the motor safely.",
    diagram: {
      width: 400,
      height: 300,
      connections: [
        { from: { x: 50, y: 150 }, to: { x: 150, y: 150 } },
        { from: { x: 200, y: 150 }, to: { x: 300, y: 150 } },
        { from: { x: 300, y: 150 }, to: { x: 300, y: 200 } },
        { from: { x: 300, y: 200 }, to: { x: 50, y: 200 } },
        { from: { x: 50, y: 200 }, to: { x: 50, y: 150 } }
      ],
      slots: [
        { id: 'slot1', x: 175, y: 150, type: 'resistor' }
      ],
      lightBulb: { x: 300, y: 175 },
      motor: { x: 300, y: 225 },
      battery: { x: 50, y: 175 }
    },
    solutions: [
      [{ slotId: 'slot1', componentType: 'resistor', value: 220 }],
      [{ slotId: 'slot1', componentType: 'resistor', value: 470 }]
    ],
    availableComponents: {
      resistors: [100, 220, 470, 1000],
      capacitors: []
    }
  },
  {
    id: 2,
    title: "Voltage Divider",
    description: "Use two resistors to create a voltage divider for the LED and motor.",
    diagram: {
      width: 400,
      height: 350,
      connections: [
        { from: { x: 50, y: 100 }, to: { x: 150, y: 100 } },
        { from: { x: 200, y: 100 }, to: { x: 250, y: 100 } },
        { from: { x: 250, y: 100 }, to: { x: 300, y: 100 } },
        { from: { x: 250, y: 100 }, to: { x: 250, y: 150 } },
        { from: { x: 200, y: 150 }, to: { x: 300, y: 150 } },
        { from: { x: 300, y: 150 }, to: { x: 300, y: 250 } },
        { from: { x: 300, y: 250 }, to: { x: 50, y: 250 } },
        { from: { x: 50, y: 250 }, to: { x: 50, y: 100 } }
      ],
      slots: [
        { id: 'slot1', x: 175, y: 100, type: 'resistor' },
        { id: 'slot2', x: 225, y: 150, type: 'resistor' }
      ],
      lightBulb: { x: 300, y: 125 },
      motor: { x: 300, y: 200 },
      battery: { x: 50, y: 175 }
    },
    solutions: [
      [
        { slotId: 'slot1', componentType: 'resistor', value: 1000 },
        { slotId: 'slot2', componentType: 'resistor', value: 1000 }
      ],
      [
        { slotId: 'slot1', componentType: 'resistor', value: 2200 },
        { slotId: 'slot2', componentType: 'resistor', value: 2200 }
      ]
    ],
    availableComponents: {
      resistors: [470, 1000, 2200, 4700],
      capacitors: []
    }
  },
  {
    id: 3,
    title: "RC Filter Circuit",
    description: "Add a capacitor to filter the signal for smooth motor operation.",
    diagram: {
      width: 450,
      height: 300,
      connections: [
        { from: { x: 50, y: 150 }, to: { x: 120, y: 150 } },
        { from: { x: 170, y: 150 }, to: { x: 220, y: 150 } },
        { from: { x: 220, y: 150 }, to: { x: 220, y: 100 } },
        { from: { x: 220, y: 200 }, to: { x: 270, y: 200 } },
        { from: { x: 270, y: 200 }, to: { x: 350, y: 200 } },
        { from: { x: 350, y: 200 }, to: { x: 350, y: 250 } },
        { from: { x: 350, y: 250 }, to: { x: 50, y: 250 } },
        { from: { x: 50, y: 250 }, to: { x: 50, y: 150 } }
      ],
      slots: [
        { id: 'slot1', x: 145, y: 150, type: 'resistor' },
        { id: 'slot2', x: 220, y: 175, type: 'capacitor' }
      ],
      lightBulb: { x: 220, y: 75 },
      motor: { x: 350, y: 175 },
      battery: { x: 50, y: 200 }
    },
    solutions: [
      [
        { slotId: 'slot1', componentType: 'resistor', value: 1000 },
        { slotId: 'slot2', componentType: 'capacitor', value: 100 }
      ],
      [
        { slotId: 'slot1', componentType: 'resistor', value: 2200 },
        { slotId: 'slot2', componentType: 'capacitor', value: 47 }
      ]
    ],
    availableComponents: {
      resistors: [470, 1000, 2200],
      capacitors: [{ value: 47, unit: 'nF' }, { value: 100, unit: 'nF' }]
    }
  }
  // Add more levels following the same pattern...
];

// Generate additional levels (simplified for brevity)
for (let i = 4; i <= 15; i++) {
  circuitLevels.push({
    id: i,
    title: `Advanced Circuit ${i}`,
    description: `Complex circuit challenge with multiple components for level ${i}.`,
    diagram: {
      width: 500,
      height: 350,
      connections: [
        { from: { x: 50, y: 175 }, to: { x: 150, y: 175 } },
        { from: { x: 200, y: 175 }, to: { x: 300, y: 175 } },
        { from: { x: 300, y: 175 }, to: { x: 400, y: 175 } },
        { from: { x: 400, y: 175 }, to: { x: 400, y: 275 } },
        { from: { x: 400, y: 275 }, to: { x: 50, y: 275 } },
        { from: { x: 50, y: 275 }, to: { x: 50, y: 175 } }
      ],
      slots: [
        { id: 'slot1', x: 175, y: 175, type: i % 2 === 0 ? 'resistor' : 'capacitor' },
        { id: 'slot2', x: 250, y: 175, type: i % 3 === 0 ? 'capacitor' : 'resistor' },
        { id: 'slot3', x: 325, y: 175, type: 'resistor' }
      ],
      lightBulb: { x: 400, y: 150 },
      motor: { x: 400, y: 200 },
      battery: { x: 50, y: 225 }
    },
    solutions: [
      [
        { slotId: 'slot1', componentType: 'resistor', value: 1000 + (i * 100) },
        { slotId: 'slot2', componentType: 'resistor', value: 2200 },
        { slotId: 'slot3', componentType: 'resistor', value: 470 }
      ],
      [
        { slotId: 'slot1', componentType: 'resistor', value: 2200 },
        { slotId: 'slot2', componentType: 'resistor', value: 1000 + (i * 100) },
        { slotId: 'slot3', componentType: 'resistor', value: 1000 }
      ]
    ],
    availableComponents: {
      resistors: [220, 470, 1000, 2200, 4700, 10000],
      capacitors: [
        { value: 10, unit: 'pF' },
        { value: 100, unit: 'pF' },
        { value: 1, unit: 'nF' },
        { value: 10, unit: 'nF' }
      ]
    }
  });
}