import { Calculation } from '../types';

export const transformerCalculations: Calculation[] = [
  {
    id: 'transformer-voltage',
    name: 'Transformer Voltage',
    description: 'Calculates secondary voltage using primary voltage and turns ratio',
    formula: 'Vs = Vp × (Ns / Np)',
    inputs: [
      { id: 'primaryVoltage', name: 'Primary Voltage', unit: 'V' },
      { id: 'primaryTurns', name: 'Primary Turns', unit: 'turns' },
      { id: 'secondaryTurns', name: 'Secondary Turns', unit: 'turns' },
    ],
    resultUnit: 'V',
    calculate: (inputs) => {
      return inputs.primaryVoltage * (inputs.secondaryTurns / inputs.primaryTurns);
    },
  },
  {
    id: 'transformer-current',
    name: 'Transformer Current',
    description: 'Calculates secondary current using primary current and turns ratio',
    formula: 'Is = Ip × (Np / Ns)',
    inputs: [
      { id: 'primaryCurrent', name: 'Primary Current', unit: 'A' },
      { id: 'primaryTurns', name: 'Primary Turns', unit: 'turns' },
      { id: 'secondaryTurns', name: 'Secondary Turns', unit: 'turns' },
    ],
    resultUnit: 'A',
    calculate: (inputs) => {
      return inputs.primaryCurrent * (inputs.primaryTurns / inputs.secondaryTurns);
    },
  },
  {
    id: 'transformer-turns-ratio',
    name: 'Transformer Turns Ratio',
    description: 'Calculates turns ratio using primary and secondary voltages',
    formula: 'a = Np / Ns = Vs / Vp',
    inputs: [
      { id: 'primaryVoltage', name: 'Primary Voltage', unit: 'V' },
      { id: 'secondaryVoltage', name: 'Secondary Voltage', unit: 'V' },
    ],
    resultUnit: '',
    calculate: (inputs) => {
      return inputs.primaryVoltage / inputs.secondaryVoltage;
    },
  },
  {
    id: 'transformer-efficiency',
    name: 'Transformer Efficiency',
    description: 'Calculates transformer efficiency using output and input power',
    formula: 'η = (Pout / Pin) × 100%',
    inputs: [
      { id: 'outputPower', name: 'Output Power', unit: 'W' },
      { id: 'inputPower', name: 'Input Power', unit: 'W' },
    ],
    resultUnit: '%',
    calculate: (inputs) => {
      return (inputs.outputPower / inputs.inputPower) * 100;
    },
  },
  {
    id: 'transformer-power',
    name: 'Transformer Power',
    description: 'Calculates transformer power using voltage and current',
    formula: 'P = V × I × cosφ',
    inputs: [
      { id: 'voltage', name: 'Voltage', unit: 'V' },
      { id: 'current', name: 'Current', unit: 'A' },
      { id: 'powerFactor', name: 'Power Factor', unit: 'cosφ' },
    ],
    resultUnit: 'W',
    calculate: (inputs) => {
      return inputs.voltage * inputs.current * inputs.powerFactor;
    },
  },
];