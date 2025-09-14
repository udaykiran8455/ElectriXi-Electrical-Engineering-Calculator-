import { Calculation } from '../types';

export const ohmsLawCalculations: Calculation[] = [
  {
    id: 'voltage',
    name: 'Calculate Voltage',
    description: 'Calculates voltage using current and resistance',
    formula: 'V = I × R',
    inputs: [
      { id: 'current', name: 'Current', unit: 'A' },
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
    ],
    resultUnit: 'V',
    calculate: (inputs) => {
      return inputs.current * inputs.resistance;
    },
  },
  {
    id: 'current',
    name: 'Calculate Current',
    description: 'Calculates current using voltage and resistance',
    formula: 'I = V / R',
    inputs: [
      { id: 'voltage', name: 'Voltage', unit: 'V' },
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
    ],
    resultUnit: 'A',
    calculate: (inputs) => {
      return inputs.voltage / inputs.resistance;
    },
  },
  {
    id: 'resistance',
    name: 'Calculate Resistance',
    description: 'Calculates resistance using voltage and current',
    formula: 'R = V / I',
    inputs: [
      { id: 'voltage', name: 'Voltage', unit: 'V' },
      { id: 'current', name: 'Current', unit: 'A' },
    ],
    resultUnit: 'Ω',
    calculate: (inputs) => {
      return inputs.voltage / inputs.current;
    },
  },
  {
    id: 'resistors-series',
    name: 'Resistors in Series',
    description: 'Calculates the total resistance of resistors connected in series',
    formula: 'Rtotal = R1 + R2 + R3',
    inputs: [
      { id: 'r1', name: 'Resistor 1', unit: 'Ω' },
      { id: 'r2', name: 'Resistor 2', unit: 'Ω' },
      { id: 'r3', name: 'Resistor 3 (optional)', unit: 'Ω' },
    ],
    resultUnit: 'Ω',
    calculate: (inputs) => {
      return inputs.r1 + inputs.r2 + (inputs.r3 || 0);
    },
  },
  {
    id: 'resistors-parallel',
    name: 'Resistors in Parallel',
    description: 'Calculates the total resistance of resistors connected in parallel',
    formula: '1/Rtotal = 1/R1 + 1/R2 + 1/R3',
    inputs: [
      { id: 'r1', name: 'Resistor 1', unit: 'Ω' },
      { id: 'r2', name: 'Resistor 2', unit: 'Ω' },
      { id: 'r3', name: 'Resistor 3 (optional)', unit: 'Ω' },
    ],
    resultUnit: 'Ω',
    calculate: (inputs) => {
      let sum = 1/inputs.r1 + 1/inputs.r2;
      if (inputs.r3) {
        sum += 1/inputs.r3;
      }
      return 1/sum;
    },
  },
];