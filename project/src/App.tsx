import React, { useState } from 'react';
import { 
  Calculator, Zap, Lightbulb, Battery, Cpu, Radio, Gauge, 
  BrainCircuit as Circuit, Magnet, Sliders, Power, Settings,
  Workflow, Plug, Ruler, Network, Search
} from 'lucide-react';
import SubjectPanel from './components/SubjectPanel';
import { 
  ohmsLawCalculations,
  powerCalculations,
  capacitanceCalculations,
  inductanceCalculations,
  transformerCalculations,
  acCircuitCalculations,
  circuitAnalysisCalculations,
  electromagneticCalculations,
  controlSystemsCalculations,
  powerSystemsCalculations,
  electricalMachinesCalculations,
  powerElectronicsCalculations,
  measurementsCalculations,
  networkAnalysisCalculations
} from './calculators';

function App() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    { id: 'ohmsLaw', name: 'Ohm\'s Law', icon: <Zap size={24} />, calculations: ohmsLawCalculations },
    { id: 'power', name: 'Power', icon: <Lightbulb size={24} />, calculations: powerCalculations },
    { id: 'capacitance', name: 'Capacitance', icon: <Battery size={24} />, calculations: capacitanceCalculations },
    { id: 'inductance', name: 'Inductance', icon: <Cpu size={24} />, calculations: inductanceCalculations },
    { id: 'transformer', name: 'Transformer', icon: <Radio size={24} />, calculations: transformerCalculations },
    { id: 'acCircuit', name: 'AC Circuits', icon: <Gauge size={24} />, calculations: acCircuitCalculations },
    { id: 'circuitAnalysis', name: 'Circuit Analysis', icon: <Circuit size={24} />, calculations: circuitAnalysisCalculations },
    { id: 'electromagnetic', name: 'Electromagnetic', icon: <Magnet size={24} />, calculations: electromagneticCalculations },
    { id: 'controlSystems', name: 'Control Systems', icon: <Sliders size={24} />, calculations: controlSystemsCalculations },
    { id: 'powerSystems', name: 'Power Systems', icon: <Power size={24} />, calculations: powerSystemsCalculations },
    { id: 'electricalMachines', name: 'Electrical Machines', icon: <Settings size={24} />, calculations: electricalMachinesCalculations },
    { id: 'powerElectronics', name: 'Power Electronics', icon: <Workflow size={24} />, calculations: powerElectronicsCalculations },
    { id: 'measurements', name: 'Measurements', icon: <Ruler size={24} />, calculations: measurementsCalculations },
    { id: 'networkAnalysis', name: 'Network Analysis', icon: <Network size={24} />, calculations: networkAnalysisCalculations },
  ];

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.calculations.some(calc => 
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator size={28} />
            <h1 className="text-2xl font-bold">ElectriXi</h1>
          </div>
          <p className="text-indigo-100">Advanced Electrical Engineering Calculator</p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Select a Subject</h2>
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search calculations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredSubjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setActiveSubject(subject.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  activeSubject === subject.id
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-800 shadow hover:shadow-md hover:bg-indigo-50'
                }`}
              >
                <div className="mb-2">{subject.icon}</div>
                <span className="font-medium text-center">{subject.name}</span>
              </button>
            ))}
          </div>
        </div>

        {activeSubject && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <SubjectPanel 
              subject={subjects.find(s => s.id === activeSubject)!} 
            />
          </div>
        )}

        {!activeSubject && filteredSubjects.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <Search size={48} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h2>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all subjects above.
            </p>
          </div>
        )}

        {!activeSubject && filteredSubjects.length > 0 && !searchQuery && (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <Calculator size={48} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to ElectriXi</h2>
            <p className="text-gray-600">
              Select a subject above to start calculating electrical parameters.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2025 ElectriXi | Advanced Electrical Engineering Calculator</p>
        </div>
      </footer>
    </div>
  );
}

export default App;