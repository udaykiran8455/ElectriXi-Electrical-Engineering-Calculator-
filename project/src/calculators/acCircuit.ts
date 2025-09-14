import { Calculation } from '../types';

export const acCircuitCalculations: Calculation[] = [
  {
    id: 'impedance',
    name: 'Impedance',
    description: 'Calculates impedance in an AC circuit with resistance and reactance',
    formula: 'Z = √(R² + X²)',
    inputs: [
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
      { id: 'reactance', name: 'Reactance', unit: 'Ω' },
    ],
    resultUnit: 'Ω',
    calculate: (inputs) => {
      return Math.sqrt(Math.pow(inputs.resistance, 2) + Math.pow(inputs.reactance, 2));
    },
  },
  {
    id: 'phase-angle',
    name: 'Phase Angle',
    description: 'Calculates phase angle in an AC circuit',
    formula: 'φ = tan⁻¹(X / R)',
    inputs: [
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
      { id: 'reactance', name: 'Reactance', unit: 'Ω' },
    ],
    resultUnit: 'degrees',
    calculate: (inputs) => {
      return (Math.atan(inputs.reactance / inputs.resistance) * 180) / Math.PI;
    },
  },
  {
    id: 'power-factor',
    name: 'Power Factor',
    description: 'Calculates power factor in an AC circuit',
    formula: 'PF = cos(φ) = R / Z',
    inputs: [
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
      { id: 'impedance', name: 'Impedance', unit: 'Ω' },
    ],
    resultUnit: '',
    calculate: (inputs) => {
      return inputs.resistance / inputs.impedance;
    },
  },
  {
    id: 'apparent-power',
    name: 'Apparent Power',
    description: 'Calculates apparent power in an AC circuit',
    formula: 'S = V × I',
    inputs: [
      { id: 'voltage', name: 'Voltage (RMS)', unit: 'V' },
      { id: 'current', name: 'Current (RMS)', unit: 'A' },
    ],
    resultUnit: 'VA',
    calculate: (inputs) => {
      return inputs.voltage * inputs.current;
    },
  },
  {
    id: 'real-power',
    name: 'Real Power',
    description: 'Calculates real power in an AC circuit',
    formula: 'P = V × I × cos(φ)',
    inputs: [
      { id: 'voltage', name: 'Voltage (RMS)', unit: 'V' },
      { id: 'current', name: 'Current (RMS)', unit: 'A' },
      { id: 'powerFactor', name: 'Power Factor', unit: 'cos(φ)' },
    ],
    resultUnit: 'W',
    calculate: (inputs) => {
      return inputs.voltage * inputs.current * inputs.powerFactor;
    },
  },
  {
    id: 'reactive-power',
    name: 'Reactive Power',
    description: 'Calculates reactive power in an AC circuit',
    formula: 'Q = V × I × sin(φ)',
    inputs: [
      { id: 'voltage', name: 'Voltage (RMS)', unit: 'V' },
      { id: 'current', name: 'Current (RMS)', unit: 'A' },
      { id: 'sinPhi', name: 'sin(φ)', unit: '' },
    ],
    resultUnit: 'VAR',
    calculate: (inputs) => {
      return inputs.voltage * inputs.current * inputs.sinPhi;
    },
  },
  {
    id: 'resonant-frequency',
    name: 'Resonant Frequency',
    description: 'Calculates resonant frequency in an LC circuit',
    formula: 'f = 1 / (2π√(LC))',
    inputs: [
      { id: 'inductance', name: 'Inductance', unit: 'H' },
      { id: 'capacitance', name: 'Capacitance', unit: 'F' },
    ],
    resultUnit: 'Hz',
    calculate: (inputs) => {
      return 1 / (2 * Math.PI * Math.sqrt(inputs.inductance * inputs.capacitance));
    },
  },
];