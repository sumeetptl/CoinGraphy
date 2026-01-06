import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FuturesPosition } from './Dashboard';

interface AddFuturesModalProps {
  position: FuturesPosition | null;
  onClose: () => void;
  onSave: (position: FuturesPosition) => void;
}

const PAIRS = [
  'BTC/USDT Perp',
  'ETH/USDT Perp',
  'SOL/USDT Perp',
  'MATIC/USDT Perp',
  'ADA/USDT Perp',
  'AVAX/USDT Perp',
  'DOT/USDT Perp',
  'LINK/USDT Perp',
];

export default function AddFuturesModal({ position, onClose, onSave }: AddFuturesModalProps) {
  const [formData, setFormData] = useState<Partial<FuturesPosition>>({
    pair: '',
    direction: 'Long',
    size: 0,
    entryPrice: 0,
    stopLoss: undefined,
    takeProfit: undefined,
    notes: '',
    openDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (position) {
      setFormData(position);
    }
  }, [position]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pair || !formData.size || !formData.entryPrice) {
      return;
    }

    onSave(formData as FuturesPosition);
  };

  const handleChange = (field: keyof FuturesPosition, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-gray-900">
            {position ? 'Edit futures trade' : 'Add futures trade'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Pair Selection */}
            <div>
              <label htmlFor="pair" className="block text-sm text-gray-700 mb-2">
                Pair <span className="text-red-600">*</span>
              </label>
              <select
                id="pair"
                value={formData.pair}
                onChange={(e) => handleChange('pair', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select pair</option>
                {PAIRS.map(pair => (
                  <option key={pair} value={pair}>{pair}</option>
                ))}
              </select>
            </div>

            {/* Direction */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Direction <span className="text-red-600">*</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleChange('direction', 'Long')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                    formData.direction === 'Long'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Long
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('direction', 'Short')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors ${
                    formData.direction === 'Short'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Short
                </button>
              </div>
            </div>

            {/* Size & Entry Price */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="size" className="block text-sm text-gray-700 mb-2">
                  Size (notional ₹) <span className="text-red-600">*</span>
                </label>
                <input
                  id="size"
                  type="number"
                  value={formData.size || ''}
                  onChange={(e) => handleChange('size', parseFloat(e.target.value))}
                  required
                  min="0"
                  step="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 100000"
                />
                <p className="text-xs text-gray-500 mt-1">Total position value in rupees</p>
              </div>

              <div>
                <label htmlFor="entryPrice" className="block text-sm text-gray-700 mb-2">
                  Entry price (₹) <span className="text-red-600">*</span>
                </label>
                <input
                  id="entryPrice"
                  type="number"
                  value={formData.entryPrice || ''}
                  onChange={(e) => handleChange('entryPrice', parseFloat(e.target.value))}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 8400000"
                />
              </div>
            </div>

            {/* Stop Loss & Take Profit */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="stopLoss" className="block text-sm text-gray-700 mb-2">
                  Stop loss (₹) <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  id="stopLoss"
                  type="number"
                  value={formData.stopLoss || ''}
                  onChange={(e) => handleChange('stopLoss', parseFloat(e.target.value) || undefined)}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 8200000"
                />
              </div>

              <div>
                <label htmlFor="takeProfit" className="block text-sm text-gray-700 mb-2">
                  Take profit (₹) <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  id="takeProfit"
                  type="number"
                  value={formData.takeProfit || ''}
                  onChange={(e) => handleChange('takeProfit', parseFloat(e.target.value) || undefined)}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 8800000"
                />
              </div>
            </div>

            {/* Open Date */}
            <div>
              <label htmlFor="openDate" className="block text-sm text-gray-700 mb-2">
                Open date <span className="text-red-600">*</span>
              </label>
              <input
                id="openDate"
                type="date"
                value={formData.openDate || ''}
                onChange={(e) => handleChange('openDate', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm text-gray-700 mb-2">
                Notes / Strategy <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Document your trade rationale, setup, or strategy notes..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Keep track of why you took this trade to review later
              </p>
            </div>

            {/* Risk Calculation Display */}
            {formData.entryPrice && formData.stopLoss && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm text-blue-900">
                  <div className="flex items-center justify-between mb-2">
                    <span>Risk per position:</span>
                    <span className="font-semibold">
                      ₹{Math.abs(
                        ((formData.size || 0) / (formData.entryPrice || 1)) * 
                        ((formData.entryPrice || 0) - (formData.stopLoss || 0))
                      ).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  {formData.takeProfit && (
                    <div className="flex items-center justify-between">
                      <span>Risk:Reward ratio:</span>
                      <span className="font-semibold">
                        1:{(
                          Math.abs((formData.takeProfit || 0) - (formData.entryPrice || 0)) /
                          Math.abs((formData.entryPrice || 0) - (formData.stopLoss || 0))
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {position ? 'Update trade' : 'Save trade'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
