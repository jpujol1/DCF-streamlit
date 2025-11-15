import { useState } from 'react';
import { Calculator, FolderOpen } from 'lucide-react';
import type { Security, OPMAssumptions, OPMResults } from './types';
import { CapTableInput } from './components/CapTableInput';
import { AssumptionsInput } from './components/AssumptionsInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { calculateOPM } from './utils/opmCalculator';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  // Default securities with examples
  const defaultSecurities: Security[] = [
    {
      id: crypto.randomUUID(),
      name: 'Common Stock',
      type: 'common',
      shares: 10000000,
    },
    {
      id: crypto.randomUUID(),
      name: 'Series A Preferred',
      type: 'preferred',
      shares: 2000000,
      liquidationPreference: 1.0,
      isParticipating: false,
    },
  ];

  const defaultAssumptions: OPMAssumptions = {
    equityValue: 50000000,
    volatility: 0.5,
    riskFreeRate: 0.04,
    timeToExit: 3,
  };

  const [securities, setSecurities] = useLocalStorage<Security[]>(
    'opm-securities',
    defaultSecurities
  );
  const [assumptions, setAssumptions] = useLocalStorage<OPMAssumptions>(
    'opm-assumptions',
    defaultAssumptions
  );
  const [results, setResults] = useState<OPMResults | null>(null);

  const handleCalculate = () => {
    if (securities.length === 0) {
      alert('Please add at least one security to the cap table.');
      return;
    }

    const calculatedResults = calculateOPM(securities, assumptions);
    setResults(calculatedResults);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default values?')) {
      setSecurities(defaultSecurities);
      setAssumptions(defaultAssumptions);
      setResults(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  OPM Equity Valuation
                </h1>
                <p className="text-sm text-gray-600">
                  Option Pricing Model for Cap Table Valuation
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FolderOpen size={18} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Cap Table Input */}
          <CapTableInput securities={securities} onSecuritiesChange={setSecurities} />

          {/* Assumptions Input */}
          <AssumptionsInput
            assumptions={assumptions}
            onAssumptionsChange={setAssumptions}
          />

          {/* Calculate Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCalculate}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Calculator size={24} />
              Calculate Valuation
            </button>
          </div>

          {/* Results */}
          <ResultsDisplay results={results} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Built with React, TypeScript, and Tailwind CSS. All calculations run locally in your
            browser.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
