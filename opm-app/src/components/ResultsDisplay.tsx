import type { OPMResults } from '../types';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';

interface ResultsDisplayProps {
  results: OPMResults | null;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Results</h2>
        <div className="text-center py-12 text-gray-500">
          Enter your cap table and assumptions, then click "Calculate" to see results.
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Valuation Results</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <DollarSign size={20} />
            <h3 className="font-semibold">Total Equity Value</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">
            {formatCurrency(results.totalEquityValue)}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 text-green-700 mb-2">
            <TrendingUp size={20} />
            <h3 className="font-semibold">Common Stock Value</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">
            {formatCurrency(results.commonStockValue)}
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-2 text-purple-700 mb-2">
            <PieChart size={20} />
            <h3 className="font-semibold">Preferred Stock Value</h3>
          </div>
          <p className="text-2xl font-bold text-purple-900">
            {formatCurrency(results.preferredStockValue)}
          </p>
        </div>
      </div>

      {/* Detailed Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Security</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Shares</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Value/Share</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Value</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">% of Total</th>
            </tr>
          </thead>
          <tbody>
            {results.securities.map((security, index) => (
              <tr
                key={security.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
              >
                <td className="py-3 px-4 font-medium text-gray-900">{security.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      security.type === 'common'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {security.type.charAt(0).toUpperCase() + security.type.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {security.shares.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {formatCurrency(security.valuePerShare)}
                </td>
                <td className="py-3 px-4 text-right font-semibold text-gray-900">
                  {formatCurrency(security.totalValue)}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  {formatPercentage(security.percentageOfTotal)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-300 bg-gray-100">
              <td colSpan={4} className="py-3 px-4 font-bold text-gray-900">
                Total
              </td>
              <td className="py-3 px-4 text-right font-bold text-gray-900">
                {formatCurrency(results.totalEquityValue)}
              </td>
              <td className="py-3 px-4 text-right font-bold text-gray-900">100.00%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Methodology Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Methodology</h4>
        <p className="text-sm text-blue-800">
          Values are calculated using the Option Pricing Model (OPM) with Black-Scholes formula.
          The OPM treats each class of stock as a call option on the company's equity value,
          providing a market-based approach to equity allocation that accounts for liquidation
          preferences and capital structure.
        </p>
      </div>
    </div>
  );
}
