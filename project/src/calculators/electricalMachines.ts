import { Calculation } from '../types';

export const electricalMachinesCalculations: Calculation[] = [
  {
    id: 'dc-motor-torque',
    name: 'DC Motor Torque',
    description: 'Calculates the torque produced by a DC motor',
    formula: 'T = kΦIa',
    inputs: [
      { id: 'fluxConstant', name: 'Flux Constant (kΦ)', unit: 'N⋅m/A' },
      { id: 'armatureCurrent', name: 'Armature Current', unit: 'A' },
    ],
    resultUnit: 'N⋅m',
    defaultResult: '0.00 N⋅m',
    calculate: (inputs) => {
      return inputs.fluxConstant * inputs.armatureCurrent;
    },
  },
  {
    id: 'induction-motor-slip',
    name: 'Induction Motor Slip',
    description: 'Calculates the slip of an induction motor',
    formula: 's = (Ns - Nr)/Ns × 100%',
    inputs: [
      { id: 'syncSpeed', name: 'Synchronous Speed', unit: 'rpm' },
      { id: 'rotorSpeed', name: 'Rotor Speed', unit: 'rpm' },
    ],
    resultUnit: '%',
    defaultResult: '0.00 %',
    calculate: (inputs) => {
      return ((inputs.syncSpeed - inputs.rotorSpeed) / inputs.syncSpeed) * 100;
    },
  },
  {
    id: 'synchronous-speed',
    name: 'Synchronous Speed',
    description: 'Calculates the synchronous speed of an AC machine',
    formula: 'Ns = (120 × f)/P',
    inputs: [
      { id: 'frequency', name: 'Frequency', unit: 'Hz' },
      { id: 'poles', name: 'Number of Poles', unit: '' },
    ],
    resultUnit: 'rpm',
    defaultResult: '0 rpm',
    calculate: (inputs) => {
      return (120 * inputs.frequency) / inputs.poles;
    },
  },
  {
    id: 'rotor-resistance',
    name: 'Rotor Resistance',
    description: 'Calculates the referred rotor resistance',
    formula: 'R2\' = R2 × (N1/N2)²',
    inputs: [
      { id: 'rotorResistance', name: 'Actual Rotor Resistance', unit: 'Ω' },
      { id: 'turnsRatio', name: 'Turns Ratio (N1/N2)', unit: '' },
    ],
    resultUnit: 'Ω',
    defaultResult: '0.00 Ω',
    calculate: (inputs) => {
      return inputs.rotorResistance * Math.pow(inputs.turnsRatio, 2);
    },
  },
  {
    id: 'starting-torque',
    name: 'Starting Torque',
    description: 'Calculates the starting torque of an induction motor',
    formula: 'Tst = (3 × V² × R2\')/(ωs × (R1 + R2\')²)',
    inputs: [
      { id: 'voltage', name: 'Applied Voltage', unit: 'V' },
      { id: 'rotorResistance', name: 'Referred Rotor Resistance', unit: 'Ω' },
      { id: 'statorResistance', name: 'Stator Resistance', unit: 'Ω' },
      { id: 'syncSpeed', name: 'Synchronous Speed', unit: 'rad/s' },
    ],
    resultUnit: 'N⋅m',
    defaultResult: '0.00 N⋅m',
    calculate: (inputs) => {
      return (3 * Math.pow(inputs.voltage, 2) * inputs.rotorResistance) / 
             (inputs.syncSpeed * Math.pow(inputs.statorResistance + inputs.rotorResistance, 2));
    },
  },
];