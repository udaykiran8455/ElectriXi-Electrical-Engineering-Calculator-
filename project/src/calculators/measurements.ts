import { Calculation } from '../types';

export const measurementsCalculations: Calculation[] = [
  {
    id: 'meter-constant',
    name: 'Energy Meter Constant',
    description: 'Calculates energy meter constant',
    formula: 'K = (3600 × N)/(Eh × t)',
    inputs: [
      { id: 'revolutions', name: 'Number of Revolutions', unit: '' },
      { id: 'energy', name: 'Energy per Hour', unit: 'Wh' },
      { id: 'time', name: 'Time', unit: 's' },
    ],
    resultUnit: 'rev/kWh',
    calculate: (inputs) => {
      return (3600 * inputs.revolutions) / (inputs.energy * inputs.time);
    },
  },
  {
    id: 'shunt-resistance',
    name: 'Ammeter Shunt',
    description: 'Calculates shunt resistance for ammeter',
    formula: 'Rs = (Rm × Im)/(I - Im)',
    inputs: [
      { id: 'meterResistance', name: 'Meter Resistance', unit: 'Ω' },
      { id: 'meterCurrent', name: 'Meter Full Scale Current', unit: 'A' },
      { id: 'totalCurrent', name: 'Total Current', unit: 'A' },
    ],
    resultUnit: 'Ω',
    calculate: (inputs) => {
      return (inputs.meterResistance * inputs.meterCurrent) / 
             (inputs.totalCurrent - inputs.meterCurrent);
    },
  },
  {
    id: 'multiplier-resistance',
    name: 'Voltmeter Multiplier',
    description: 'Calculates multiplier resistance for voltmeter',
    formula: 'Rm = ((V/Im) - Ri)',
    inputs: [
      { id: 'voltage', name: 'Voltage Range', unit: 'V' },
      { id: 'current', name: 'Full Scale Current', unit: 'A' },
      { id: 'internalResistance', name: 'Internal Resistance', unit: 'Ω' },
    ],
    resultUnit: 'Ω',
    calculate: (inputs) => {
      return (inputs.voltage / inputs.current) - inputs.internalResistance;
    },
  },
];