import { Calculation } from '../types';

export const electromagneticCalculations: Calculation[] = [
  {
    id: 'magnetic-field',
    name: 'Magnetic Field (N Conductors)',
    description: 'Calculates magnetic field strength from N current-carrying conductors',
    formula: 'B = (μ₀/2π) × Σ(In/rn)',
    inputs: [
      { id: 'numConductors', name: 'Number of Conductors', unit: '' },
    ],
    resultUnit: 'T',
    calculate: (inputs) => {
      // Placeholder
      return 0;
    },
  },
  {
    id: 'mutual-inductance',
    name: 'Mutual Inductance',
    description: 'Calculates mutual inductance between N coils',
    formula: 'M = k × √(L₁L₂)',
    inputs: [
      { id: 'numCoils', name: 'Number of Coils', unit: '' },
    ],
    resultUnit: 'H',
    calculate: (inputs) => {
      // Placeholder
      return 0;
    },
  },
];