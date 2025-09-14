import React from 'react';

interface DynamicInputsProps {
  count: number;
  label: string;
  unit: string;
  values: number[];
  onChange: (values: number[]) => void;
}

const DynamicInputs: React.FC<DynamicInputsProps> = ({
  count,
  label,
  unit,
  values,
  onChange,
}) => {
  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = Number(value);
    onChange(newValues);
  };

  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 min-w-[100px]">
            {label} {index + 1}
          </label>
          <input
            type="number"
            value={values[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={`Enter value for ${label.toLowerCase()} ${index + 1}`}
          />
          <span className="text-sm text-gray-500 min-w-[30px]">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default DynamicInputs;