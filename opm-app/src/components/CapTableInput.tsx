import { Plus, Trash2 } from 'lucide-react';
import type { Security, SecurityType } from '../types';

interface CapTableInputProps {
  securities: Security[];
  onSecuritiesChange: (securities: Security[]) => void;
}

export function CapTableInput({ securities, onSecuritiesChange }: CapTableInputProps) {
  const addSecurity = () => {
    const newSecurity: Security = {
      id: crypto.randomUUID(),
      name: `Security ${securities.length + 1}`,
      type: 'common',
      shares: 0,
    };
    onSecuritiesChange([...securities, newSecurity]);
  };

  const removeSecurity = (id: string) => {
    onSecuritiesChange(securities.filter(s => s.id !== id));
  };

  const updateSecurity = (id: string, updates: Partial<Security>) => {
    onSecuritiesChange(
      securities.map(s => s.id === id ? { ...s, ...updates } : s)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Cap Table</h2>
        <button
          onClick={addSecurity}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Security
        </button>
      </div>

      <div className="space-y-4">
        {securities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No securities added yet. Click "Add Security" to get started.
          </div>
        ) : (
          securities.map((security) => (
            <div key={security.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={security.name}
                    onChange={(e) => updateSecurity(security.id, { name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={security.type}
                    onChange={(e) =>
                      updateSecurity(security.id, {
                        type: e.target.value as SecurityType,
                        liquidationPreference: e.target.value === 'preferred' ? 1.0 : undefined,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="common">Common</option>
                    <option value="preferred">Preferred</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shares
                  </label>
                  <input
                    type="number"
                    value={security.shares}
                    onChange={(e) =>
                      updateSecurity(security.id, { shares: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>

                {security.type === 'preferred' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Liquidation Preference ($)
                    </label>
                    <input
                      type="number"
                      value={security.liquidationPreference || 0}
                      onChange={(e) =>
                        updateSecurity(security.id, {
                          liquidationPreference: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                <div className="flex items-end">
                  <button
                    onClick={() => removeSecurity(security.id)}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
