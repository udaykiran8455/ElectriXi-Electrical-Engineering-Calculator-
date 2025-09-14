import React, { useState } from 'react';
import CalculatorForm from './CalculatorForm';
import { Calculation } from '../types';

interface SubjectPanelProps {
  subject: {
    id: string;
    name: string;
    icon: React.ReactNode;
    calculations: Calculation[];
  };
}

const SubjectPanel: React.FC<SubjectPanelProps> = ({ subject }) => {
  const [activeCalculation, setActiveCalculation] = useState<Calculation | null>(
    subject.calculations.length > 0 ? subject.calculations[0] : null
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="text-indigo-600">{subject.icon}</div>
        <h2 className="text-2xl font-bold text-gray-800">{subject.name} Calculations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-700 mb-3">Available Calculations</h3>
            <div className="space-y-2">
              {subject.calculations.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculation(calc)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    activeCalculation?.id === calc.id
                      ? 'bg-indigo-600 text-white'
                      : 'hover:bg-indigo-100 text-gray-700'
                  }`}
                >
                  {calc.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {activeCalculation && (
            <CalculatorForm calculation={activeCalculation} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPanel;