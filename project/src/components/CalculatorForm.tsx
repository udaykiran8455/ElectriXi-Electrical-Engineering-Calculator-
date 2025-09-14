import React, { useState, useEffect } from 'react';
import { Calculation, CalculationInput, YBusResult } from '../types';
import { Info, Plus, Minus } from 'lucide-react';
import DynamicInputs from './DynamicInputs';

interface CalculatorFormProps {
  calculation: Calculation;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ calculation }) => {
  const [inputs, setInputs] = useState<Record<string, number | string>>({});
  const [dynamicInputs, setDynamicInputs] = useState<number[]>([]);
  const [elementCount, setElementCount] = useState(2);
  const [result, setResult] = useState<number | YBusResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  useEffect(() => {
    setInputs({});
    setDynamicInputs([]);
    setElementCount(2);
    setResult(null);
    setError(null);
    setShowFormula(false);
  }, [calculation]);

  const handleInputChange = (input: CalculationInput, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [input.id]: value,
    }));
    setResult(null);
    setError(null);
  };

  const handleElementCountChange = (increment: boolean) => {
    const newCount = increment ? elementCount + 1 : Math.max(2, elementCount - 1);
    setElementCount(newCount);
    setDynamicInputs(dynamicInputs.slice(0, newCount));
  };

  const handleDynamicInputsChange = (values: number[]) => {
    setDynamicInputs(values);
    setResult(null);
    setError(null);
  };

  const renderYBusResult = (result: YBusResult) => {
    return (
      <div className="mt-4">
        <h4 className="font-medium text-gray-700 mb-2">Y-Bus Matrix</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-50">Bus</th>
                {Array.from({ length: result.magnitude[0].length }, (_, i) => (
                  <th key={i} className="px-4 py-2 bg-gray-50">Bus {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {result.magnitude.map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 font-medium">Bus {i + 1}</td>
                  {row.map((mag, j) => (
                    <td key={j} className="px-4 py-2">
                      {mag.toFixed(4)} ∠ {result.angle[i][j].toFixed(2)}°
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const handleCalculate = () => {
    try {
      const numericInputs: Record<string, any> = {};
      let missingInputs = false;

      if (calculation.isDynamic) {
        if (dynamicInputs.length === 0) {
          setError("Please add values for all elements");
          return;
        }
        numericInputs.values = dynamicInputs;
      } else {
        calculation.inputs.forEach((input) => {
          if (!inputs[input.id] && inputs[input.id] !== 0) {
            missingInputs = true;
            return;
          }
          
          if (input.id === 'lineData') {
            numericInputs[input.id] = inputs[input.id];
          } else {
            const value = Number(inputs[input.id]);
            if (isNaN(value)) {
              throw new Error(`Invalid value for ${input.name}`);
            }
            numericInputs[input.id] = value;
          }
        });
      }

      if (missingInputs) {
        setError("Please fill in all required fields");
        return;
      }

      const calculatedResult = calculation.calculate(numericInputs);
      setResult(calculatedResult);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation error");
      setResult(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{calculation.name}</h3>
        <button 
          onClick={() => setShowFormula(!showFormula)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <Info size={16} className="mr-1" />
          {showFormula ? 'Hide Formula' : 'Show Formula'}
        </button>
      </div>

      {showFormula && (
        <div className="bg-indigo-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-gray-800">{calculation.formula}</p>
          <p className="text-sm text-gray-600 mt-2">{calculation.description}</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {!calculation.isDynamic && calculation.inputs.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.name} {input.unit && `(${input.unit})`}
            </label>
            {input.id === 'lineData' ? (
              <textarea
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
                placeholder="Enter line data (from,to,R,X,B)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows={5}
              />
            ) : (
              <input
                type="number"
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
                placeholder={`Enter ${input.name.toLowerCase()}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          </div>
        ))}

        {calculation.isDynamic && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Number of Elements: {elementCount}</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleElementCountChange(false)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={() => handleElementCountChange(true)}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <DynamicInputs
              count={elementCount}
              label={calculation.id.includes('inductor') ? 'Inductor' : 'Capacitor'}
              unit={calculation.id.includes('inductor') ? 'H' : 'F'}
              values={dynamicInputs}
              onChange={handleDynamicInputsChange}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <button
          onClick={handleCalculate}
          className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
        >
          Calculate
        </button>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
      </div>

      {result && (
        typeof result === 'number' ? (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md px-4 py-3">
            <span className="font-medium text-gray-800">Result: </span>
            <span className="font-bold text-indigo-700">
              {result.toFixed(4)} {calculation.resultUnit}
            </span>
          </div>
        ) : (
          renderYBusResult(result)
        )
      )}
    </div>
  );
};

export default CalculatorForm;