export interface CalculationInput {
  id: string;
  name: string;
  unit?: string;
}

export interface Complex {
  real: number;
  imag: number;
}

export interface YBusResult {
  magnitude: number[][];
  angle: number[][];
}

export interface Calculation {
  id: string;
  name: string;
  description: string;
  formula: string;
  inputs: CalculationInput[];
  resultUnit?: string;
  defaultResult?: string;
  isDynamic?: boolean;
  calculate: (inputs: Record<string, any>) => number | YBusResult;
}