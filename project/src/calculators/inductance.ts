import { Calculation } from '../types';

export const inductanceCalculations: Calculation[] = [
  {
    id: 'inductance',
    name: 'Inductance',
    description: 'Calculates inductance using magnetic flux and current',
    formula: 'L = Φ / I',
    inputs: [
      { id: 'flux', name: 'Magnetic Flux', unit: 'Wb' },
      { id: 'current', name: 'Current', unit: 'A' },
    ],
    resultUnit: 'H',
    defaultResult: '0.00 H',
    calculate: (inputs) => {
      return inputs.flux / inputs.current;
    },
  },
  {
    id: 'inductors-series',
    name: 'N Inductors in Series',
    description: 'Calculates the total inductance of N inductors in series',
    formula: 'Ltotal = ΣLi',
    inputs: [
      { id: 'numInductors', name: 'Number of Inductors', unit: '' },
    ],
    resultUnit: 'H',
    defaultResult: '0.00 H',
    isDynamic: true,
    calculate: (inputs) => {
      return inputs.values.reduce((sum, value) => sum + value, 0);
    },
  },
  {
    id: 'inductors-parallel',
    name: 'N Inductors in Parallel',
    description: 'Calculates the total inductance of N inductors in parallel',
    formula: '1/Ltotal = Σ(1/Li)',
    inputs: [
      { id: 'numInductors', name: 'Number of Inductors', unit: '' },
    ],
    resultUnit: 'H',
    defaultResult: '0.00 H',
    isDynamic: true,
    calculate: (inputs) => {
      let sum = 0;
      for (let i = 0; i < inputs.values.length; i++) {
        sum += 1/inputs.values[i];
      }
      return 1/sum;
    },
  },
  {
    id: 'inductive-reactance',
    name: 'Inductive Reactance',
    description: 'Calculates inductive reactance using frequency and inductance',
    formula: 'XL = 2πfL',
    inputs: [
      { id: 'frequency', name: 'Frequency', unit: 'Hz' },
      { id: 'inductance', name: 'Inductance', unit: 'H' },
    ],
    resultUnit: 'Ω',
    defaultResult: '0.00 Ω',
    calculate: (inputs) => {
      return 2 * Math.PI * inputs.frequency * inputs.inductance;
    },
  },
  {
    id: 'energy-inductor',
    name: 'Energy Stored',
    description: 'Calculates energy stored in an inductor',
    formula: 'E = 0.5 × L × I²',
    inputs: [
      { id: 'inductance', name: 'Inductance', unit: 'H' },
      { id: 'current', name: 'Current', unit: 'A' },
    ],
    resultUnit: 'J',
    defaultResult: '0.00 J',
    calculate: (inputs) => {
      return 0.5 * inputs.inductance * Math.pow(inputs.current, 2);
    },
  },
  {
    id: 'mutual-inductance',
    name: 'Mutual Inductance',
    description: 'Calculates mutual inductance between two coils',
    formula: 'M = k × √(L1L2)',
    inputs: [
      { id: 'inductance1', name: 'Inductance of Coil 1', unit: 'H' },
      { id: 'inductance2', name: 'Inductance of Coil 2', unit: 'H' },
      { id: 'couplingCoeff', name: 'Coupling Coefficient', unit: '' },
    ],
    resultUnit: 'H',
    defaultResult: '0.00 H',
    calculate: (inputs) => {
      return inputs.couplingCoeff * Math.sqrt(inputs.inductance1 * inputs.inductance2);
    },
  },
];