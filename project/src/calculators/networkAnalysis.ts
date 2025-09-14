import { Calculation } from '../types';

interface Complex {
  real: number;
  imag: number;
}

interface YBusResult {
  magnitude: number[][];
  angle: number[][];
}

function complexToPolar(z: Complex): { magnitude: number; angle: number } {
  const magnitude = Math.sqrt(z.real * z.real + z.imag * z.imag);
  const angle = (Math.atan2(z.imag, z.real) * 180) / Math.PI;
  return { magnitude, angle };
}

export const networkAnalysisCalculations: Calculation[] = [
  {
    id: 'ybus-formation',
    name: 'Y-Bus Formation',
    description: 'Calculates Y-bus matrix for power system analysis',
    formula: 'Ybus[i,j] = -y[i,j], Ybus[i,i] = Σy[i,k]',
    inputs: [
      { id: 'busCount', name: 'Number of Buses', unit: '' },
      { id: 'lineData', name: 'Line Data (CSV format)', unit: 'from,to,R,X,B' },
    ],
    resultUnit: 'matrix',
    defaultResult: '[[0]]',
    calculate: (inputs: Record<string, any>) => {
      const n = inputs.busCount;
      const lines = inputs.lineData.split('\n').map(line => {
        const [from, to, r, x, b] = line.split(',').map(Number);
        return { from: from - 1, to: to - 1, r, x, b };
      });

      // Initialize Y-bus matrix
      const ybus: Complex[][] = Array(n).fill(0).map(() => 
        Array(n).fill(0).map(() => ({ real: 0, imag: 0 }))
      );

      // Fill Y-bus matrix
      lines.forEach(line => {
        const { from, to, r, x, b } = line;
        const y = {
          real: r / (r * r + x * x),
          imag: -x / (r * r + x * x)
        };

        // Off-diagonal elements
        ybus[from][to] = {
          real: -y.real,
          imag: -y.imag
        };
        ybus[to][from] = {
          real: -y.real,
          imag: -y.imag
        };

        // Diagonal elements
        ybus[from][from].real += y.real;
        ybus[from][from].imag += y.imag + b/2;
        ybus[to][to].real += y.real;
        ybus[to][to].imag += y.imag + b/2;
      });

      // Convert to polar form
      const result: YBusResult = {
        magnitude: Array(n).fill(0).map(() => Array(n).fill(0)),
        angle: Array(n).fill(0).map(() => Array(n).fill(0))
      };

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          const polar = complexToPolar(ybus[i][j]);
          result.magnitude[i][j] = polar.magnitude;
          result.angle[i][j] = polar.angle;
        }
      }

      return result;
    },
  },
  {
    id: 'thevenin-voltage',
    name: 'Thevenin Voltage',
    description: 'Calculates Thevenin equivalent voltage',
    formula: 'Vth = Voc',
    inputs: [
      { id: 'openCircuitVoltage', name: 'Open Circuit Voltage', unit: 'V' },
    ],
    resultUnit: 'V',
    calculate: (inputs) => {
      return inputs.openCircuitVoltage;
    },
  },
  {
    id: 'norton-current',
    name: 'Norton Current',
    description: 'Calculates Norton equivalent current',
    formula: 'In = Isc',
    inputs: [
      { id: 'shortCircuitCurrent', name: 'Short Circuit Current', unit: 'A' },
    ],
    resultUnit: 'A',
    calculate: (inputs) => {
      return inputs.shortCircuitCurrent;
    },
  },
  {
    id: 'superposition',
    name: 'Superposition Analysis',
    description: 'Calculates current using superposition principle',
    formula: 'I = ΣIi',
    inputs: [
      { id: 'numSources', name: 'Number of Sources', unit: '' },
    ],
    resultUnit: 'A',
    calculate: (inputs) => {
      return inputs.numSources;
    },
  },
];