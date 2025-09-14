import { Calculation } from '../types';

export const powerSystemsCalculations: Calculation[] = [
  {
    id: 'power-flow',
    name: 'Power Flow',
    description: 'Calculates active and reactive power flow between two buses',
    formula: 'P = (V1V2/X)sin(δ)',
    inputs: [
      { id: 'voltage1', name: 'Bus 1 Voltage', unit: 'kV' },
      { id: 'voltage2', name: 'Bus 2 Voltage', unit: 'kV' },
      { id: 'reactance', name: 'Line Reactance', unit: 'Ω' },
      { id: 'angle', name: 'Power Angle', unit: 'degrees' },
    ],
    resultUnit: 'MW',
    calculate: (inputs) => {
      return (inputs.voltage1 * inputs.voltage2 / inputs.reactance) * 
             Math.sin((inputs.angle * Math.PI) / 180);
    },
  },
  {
    id: 'fault-current',
    name: 'Fault Current',
    description: 'Calculates three-phase fault current',
    formula: 'If = V/(√3 × Z)',
    inputs: [
      { id: 'voltage', name: 'Line Voltage', unit: 'kV' },
      { id: 'impedance', name: 'Fault Impedance', unit: 'Ω' },
    ],
    resultUnit: 'kA',
    calculate: (inputs) => {
      return (inputs.voltage * 1000) / (Math.sqrt(3) * inputs.impedance);
    },
  },
  {
    id: 'voltage-regulation',
    name: 'Voltage Regulation',
    description: 'Calculates voltage regulation of a transmission line',
    formula: 'VR = ((Vs - Vr)/Vr) × 100%',
    inputs: [
      { id: 'sendingVoltage', name: 'Sending End Voltage', unit: 'kV' },
      { id: 'receivingVoltage', name: 'Receiving End Voltage', unit: 'kV' },
    ],
    resultUnit: '%',
    calculate: (inputs) => {
      return ((inputs.sendingVoltage - inputs.receivingVoltage) / inputs.receivingVoltage) * 100;
    },
  },
];