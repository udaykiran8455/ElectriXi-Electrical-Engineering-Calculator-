import { Calculation } from '../types';

export const powerCalculations: Calculation[] = [
  {
    id: 'power-vi',
    name: 'Power (V×I)',
    description: 'Calculates power using voltage and current',
    formula: 'P = V × I',
    inputs: [
      { id: 'voltage', name: 'Voltage', unit: 'V' },
      { id: 'current', name: 'Current', unit: 'A' },
    ],
    resultUnit: 'W',
    calculate: (inputs) => {
      return inputs.voltage * inputs.current;
    },
  },
  {
    id: 'power-i2r',
    name: 'Power (I²R)',
    description: 'Calculates power using current and resistance',
    formula: 'P = I² × R',
    inputs: [
      { id: 'current', name: 'Current', unit: 'A' },
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
    ],
    resultUnit: 'W',
    calculate: (inputs) => {
      return Math.pow(inputs.current, 2) * inputs.resistance;
    },
  },
  {
    id: 'power-v2r',
    name: 'Power (V²/R)',
    description: 'Calculates power using voltage and resistance',
    formula: 'P = V² / R',
    inputs: [
      { id: 'voltage', name: 'Voltage', unit: 'V' },
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
    ],
    resultUnit: 'W',
    calculate: (inputs) => {
      return Math.pow(inputs.voltage, 2) / inputs.resistance;
    },
  },
  {
    id: 'energy',
    name: 'Energy Consumption',
    description: 'Calculates energy consumption using power and time',
    formula: 'E = P × t',
    inputs: [
      { id: 'power', name: 'Power', unit: 'W' },
      { id: 'time', name: 'Time', unit: 'h' },
    ],
    resultUnit: 'Wh',
    calculate: (inputs) => {
      return inputs.power * inputs.time;
    },
  },
  {
    id: 'efficiency',
    name: 'Efficiency',
    description: 'Calculates efficiency using output power and input power',
    formula: 'η = (Pout / Pin) × 100%',
    inputs: [
      { id: 'powerOut', name: 'Output Power', unit: 'W' },
      { id: 'powerIn', name: 'Input Power', unit: 'W' },
    ],
    resultUnit: '%',
    calculate: (inputs) => {
      return (inputs.powerOut / inputs.powerIn) * 100;
    },
  },
];