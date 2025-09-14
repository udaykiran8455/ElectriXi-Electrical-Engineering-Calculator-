import { Calculation } from '../types';

export const capacitanceCalculations: Calculation[] = [
  {
    id: 'capacitance',
    name: 'Capacitance',
    description: 'Calculates capacitance using charge and voltage',
    formula: 'C = Q / V',
    inputs: [
      { id: 'charge', name: 'Charge', unit: 'C' },
      { id: 'voltage', name: 'Voltage', unit: 'V' },
    ],
    resultUnit: 'F',
    defaultResult: '0.00 F',
    calculate: (inputs) => {
      return inputs.charge / inputs.voltage;
    },
  },
  {
    id: 'capacitors-series',
    name: 'N Capacitors in Series',
    description: 'Calculates the total capacitance of N capacitors in series',
    formula: '1/Ctotal = Σ(1/Ci)',
    inputs: [
      { id: 'numCapacitors', name: 'Number of Capacitors', unit: '' },
    ],
    resultUnit: 'F',
    defaultResult: '0.00 F',
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
    id: 'capacitors-parallel',
    name: 'N Capacitors in Parallel',
    description: 'Calculates the total capacitance of N capacitors in parallel',
    formula: 'Ctotal = ΣCi',
    inputs: [
      { id: 'numCapacitors', name: 'Number of Capacitors', unit: '' },
    ],
    resultUnit: 'F',
    defaultResult: '0.00 F',
    isDynamic: true,
    calculate: (inputs) => {
      return inputs.values.reduce((sum, value) => sum + value, 0);
    },
  },
  {
    id: 'capacitive-reactance',
    name: 'Capacitive Reactance',
    description: 'Calculates capacitive reactance using frequency and capacitance',
    formula: 'Xc = 1 / (2πfC)',
    inputs: [
      { id: 'frequency', name: 'Frequency', unit: 'Hz' },
      { id: 'capacitance', name: 'Capacitance', unit: 'F' },
    ],
    resultUnit: 'Ω',
    defaultResult: '0.00 Ω',
    calculate: (inputs) => {
      return 1 / (2 * Math.PI * inputs.frequency * inputs.capacitance);
    },
  },
  {
    id: 'energy-capacitor',
    name: 'Energy Stored',
    description: 'Calculates energy stored in a capacitor',
    formula: 'E = 0.5 × C × V²',
    inputs: [
      { id: 'capacitance', name: 'Capacitance', unit: 'F' },
      { id: 'voltage', name: 'Voltage', unit: 'V' },
    ],
    resultUnit: 'J',
    defaultResult: '0.00 J',
    calculate: (inputs) => {
      return 0.5 * inputs.capacitance * Math.pow(inputs.voltage, 2);
    },
  },
  {
    id: 'charging-time',
    name: 'Charging Time',
    description: 'Calculates time to reach a specific voltage in RC circuit',
    formula: 't = -RC × ln(1 - V/Vs)',
    inputs: [
      { id: 'resistance', name: 'Resistance', unit: 'Ω' },
      { id: 'capacitance', name: 'Capacitance', unit: 'F' },
      { id: 'finalVoltage', name: 'Final Voltage', unit: 'V' },
      { id: 'sourceVoltage', name: 'Source Voltage', unit: 'V' },
    ],
    resultUnit: 's',
    defaultResult: '0.00 s',
    calculate: (inputs) => {
      return -inputs.resistance * inputs.capacitance * 
             Math.log(1 - inputs.finalVoltage/inputs.sourceVoltage);
    },
  },
];