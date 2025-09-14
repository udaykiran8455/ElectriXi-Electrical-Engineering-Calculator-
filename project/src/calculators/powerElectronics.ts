import { Calculation } from '../types';

export const powerElectronicsCalculations: Calculation[] = [
  {
    id: 'rectifier-average',
    name: 'Rectifier Average Output',
    description: 'Calculates the average output voltage of a rectifier',
    formula: 'Vdc = (2Vm/π) for half-wave, Vdc = (2Vm/π) for full-wave',
    inputs: [
      { id: 'peakVoltage', name: 'Peak Input Voltage', unit: 'V' },
      { id: 'rectifierType', name: 'Rectifier Type (1: half-wave, 2: full-wave)', unit: '' },
    ],
    resultUnit: 'V',
    calculate: (inputs) => {
      return inputs.rectifierType === 1 ? 
        (inputs.peakVoltage / Math.PI) : 
        (2 * inputs.peakVoltage / Math.PI);
    },
  },
  {
    id: 'inverter-rms',
    name: 'Inverter RMS Output',
    description: 'Calculates the RMS output voltage of an inverter',
    formula: 'Vrms = Vdc/√2 for square wave',
    inputs: [
      { id: 'dcVoltage', name: 'DC Input Voltage', unit: 'V' },
      { id: 'modulationIndex', name: 'Modulation Index', unit: '' },
    ],
    resultUnit: 'V',
    calculate: (inputs) => {
      return (inputs.dcVoltage * inputs.modulationIndex) / Math.sqrt(2);
    },
  },
  {
    id: 'duty-cycle',
    name: 'Duty Cycle Calculation',
    description: 'Calculates the output voltage based on duty cycle',
    formula: 'Vout = D × Vin',
    inputs: [
      { id: 'inputVoltage', name: 'Input Voltage', unit: 'V' },
      { id: 'dutyCycle', name: 'Duty Cycle', unit: '%' },
    ],
    resultUnit: 'V',
    calculate: (inputs) => {
      return inputs.inputVoltage * (inputs.dutyCycle / 100);
    },
  },
];