import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useApp, Holding } from '../App';

const AVAILABLE_COINS = [
  { name: 'Bitcoin', symbol: 'BTC', price: 8628480 },
  { name: 'Ethereum', symbol: 'ETH', price: 338784 },
  { name: 'Solana', symbol: 'SOL', price: 25344 },
  { name: 'Polygon', symbol: 'MATIC', price: 152 },
  { name: 'Cardano', symbol: 'ADA', price: 120 },
  { name: 'Ripple', symbol: 'XRP', price: 88 },
  { name: 'Polkadot', symbol: 'DOT', price: 920 },
];

interface AddHoldingModalProps {
  holding: Holding | null;
  onClose: () => void;
}

export default function AddHoldingModal({ holding, onClose }: AddHoldingModalProps) {
  const { holdings, setHoldings } = useApp();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [quantity, setQuantity] = useState('');
  const [averageBuyPrice, setAverageBuyPrice] = useState('');

  useEffect(() => {
    if (holding) {
      setSelectedCoin(holding.symbol);
      setQuantity(holding.quantity.toString());
      setAverageBuyPrice(holding.averageBuyPrice.toString());
    } else {
      // Set default price for selected coin
      const coin = AVAILABLE_COINS.find(c => c.symbol === selectedCoin);
      if (coin && !averageBuyPrice) {
        setAverageBuyPrice(coin.price.toString());
      }
    }
  }, [holding, selectedCoin, averageBuyPrice]);

  const handleCoinChange = (symbol: string) => {
    setSelectedCoin(symbol);
    const coin = AVAILABLE_COINS.find(c => c.symbol === symbol);
    if (coin) {
      setAverageBuyPrice(coin.price.toString());
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const coin = AVAILABLE_COINS.find(c => c.symbol === selectedCoin);
    if (!coin) return;

    const newHolding: Holding = {
      id: holding?.id || Date.now().toString(),
      coin: coin.name,
      symbol: coin.symbol,
      quantity: parseFloat(quantity),
      averageBuyPrice: parseFloat(averageBuyPrice) || coin.price,
      currentPrice: coin.price,
    };

    if (holding) {
      // Edit existing
      setHoldings(holdings.map(h => h.id === holding.id ? newHolding : h));
    } else {
      // Add new
      setHoldings([...holdings, newHolding]);
    }

    onClose();
  };

  const handleDelete = () => {
    if (holding && confirm('Are you sure you want to delete this holding?')) {
      setHoldings(holdings.filter(h => h.id !== holding.id));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900">{holding ? 'Edit holding' : 'Add holding'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div>
            <label htmlFor="coin" className="block text-sm text-gray-700 mb-2">
              Coin
            </label>
            <select
              id="coin"
              value={selectedCoin}
              onChange={(e) => handleCoinChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {AVAILABLE_COINS.map((coin) => (
                <option key={coin.symbol} value={coin.symbol}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm text-gray-700 mb-2">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label htmlFor="avgPrice" className="block text-sm text-gray-700 mb-2">
              Average buy price (₹) <span className="text-gray-500">— optional</span>
            </label>
            <input
              id="avgPrice"
              type="number"
              step="any"
              value={averageBuyPrice}
              onChange={(e) => setAverageBuyPrice(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
            <p className="text-xs text-gray-500 mt-1">
              Current price: ₹{AVAILABLE_COINS.find(c => c.symbol === selectedCoin)?.price.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            {holding && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            )}
            <div className="flex-1" />
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
