import type { OPMAssumptions } from '../types';

interface AssumptionsInputProps {
  assumptions: OPMAssumptions;
  onAssumptionsChange: (assumptions: OPMAssumptions) => void;
}

export function AssumptionsInput({ assumptions, onAssumptionsChange }: AssumptionsInputProps) {
  const updateAssumption = (key: keyof OPMAssumptions, value: number) => {
    onAssumptionsChange({ ...assumptions, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">OPM Assumptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Equity Value ($)
          </label>
          <input
            type="number"
            value={assumptions.equityValue}
            onChange={(e) => updateAssumption('equityValue', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            step="100000"
          />
          <p className="text-xs text-gray-500 mt-1">
            The total estimated value of the company's equity
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Volatility (%)
          </label>
          <input
            type="number"
            value={assumptions.volatility * 100}
            onChange={(e) => updateAssumption('volatility', Number(e.target.value) / 100)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="200"
            step="1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Expected volatility of equity value (typically 30-70%)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk-Free Rate (%)
          </label>
          <input
            type="number"
            value={assumptions.riskFreeRate * 100}
            onChange={(e) => updateAssumption('riskFreeRate', Number(e.target.value) / 100)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0"
            max="20"
            step="0.1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Current risk-free interest rate (e.g., 10-year Treasury rate)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time to Exit (years)
          </label>
          <input
            type="number"
            value={assumptions.timeToExit}
            onChange={(e) => updateAssumption('timeToExit', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="0.1"
            max="20"
            step="0.5"
          />
          <p className="text-xs text-gray-500 mt-1">
            Expected time until liquidity event (IPO or acquisition)
          </p>
        </div>
      </div>
    </div>
  );
}
