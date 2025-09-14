import { Calculation } from '../types';
import { evaluate } from 'mathjs';

export const controlSystemsCalculations: Calculation[] = [
  {
    id: 'transfer-function',
    name: 'Transfer Function',
    description: 'Calculates the transfer function gain for a given frequency',
    formula: 'G(s) = Output(s)/Input(s)',
    inputs: [
      { id: 'numerator', name: 'Numerator Coefficient', unit: '' },
      { id: 'denominator', name: 'Denominator Coefficient', unit: '' },
      { id: 'frequency', name: 'Frequency', unit: 'rad/s' },
    ],
    resultUnit: '',
    calculate: (inputs) => {
      return inputs.numerator / (inputs.denominator * inputs.frequency);
    },
  },
  {
    id: 'damping-ratio',
    name: 'Damping Ratio',
    description: 'Calculates the damping ratio of a second-order system',
    formula: 'ζ = c/(2√(km))',
    inputs: [
      { id: 'dampingCoeff', name: 'Damping Coefficient (c)', unit: 'N⋅s/m' },
      { id: 'springConst', name: 'Spring Constant (k)', unit: 'N/m' },
      { id: 'mass', name: 'Mass (m)', unit: 'kg' },
    ],
    resultUnit: '',
    calculate: (inputs) => {
      return inputs.dampingCoeff / (2 * Math.sqrt(inputs.springConst * inputs.mass));
    },
  },
  {
    id: 'natural-frequency',
    name: 'Natural Frequency',
    description: 'Calculates the natural frequency of a system',
    formula: 'ωn = √(k/m)',
    inputs: [
      { id: 'springConst', name: 'Spring Constant (k)', unit: 'N/m' },
      { id: 'mass', name: 'Mass (m)', unit: 'kg' },
    ],
    resultUnit: 'rad/s',
    calculate: (inputs) => {
      return Math.sqrt(inputs.springConst / inputs.mass);
    },
  },
  {
    id: 'phase-margin',
    name: 'Phase Margin',
    description: 'Calculates the phase margin of a system',
    formula: 'PM = 180° + ∠G(jωc)',
    inputs: [
      { id: 'phaseAngle', name: 'Phase Angle at Crossover', unit: 'degrees' },
    ],
    resultUnit: 'degrees',
    calculate: (inputs) => {
      return 180 + inputs.phaseAngle;
    },
  },
];