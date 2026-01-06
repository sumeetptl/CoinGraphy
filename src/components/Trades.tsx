import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, TrendingUp, TrendingDown, CheckCircle, XCircle, Info, BarChart3 } from 'lucide-react';
import Navigation from './Navigation';
import { useApp } from '../App';

interface ClosedTrade {
  id: string;
  pair: string;
  symbol: string;
  direction: 'Buy' | 'Sell';
  entryPrice: number;
  exitPrice: number;
  result: number;
  resultPercent: number;
  dateClosed: string;
}

interface LiveTrade {
  id: string;
  pair: string;
  symbol: string;
  direction: 'Buy' | 'Sell';
  entryZone: string;
  stopLoss: number;
  takeProfit: number;
  timeframe: string;
  status: 'Open' | 'Hit TP' | 'Hit SL';
}

const CLOSED_TRADES: ClosedTrade[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    symbol: 'BTC',
    direction: 'Buy',
    entryPrice: 6850000,
    exitPrice: 7125000,
    result: 275000,
    resultPercent: 4.01,
    dateClosed: '2024-01-15',
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    symbol: 'ETH',
    direction: 'Sell',
    entryPrice: 285000,
    exitPrice: 272000,
    result: 13000,
    resultPercent: 4.56,
    dateClosed: '2024-01-12',
  },
  {
    id: '3',
    pair: 'SOL/USDT',
    symbol: 'SOL',
    direction: 'Buy',
    entryPrice: 22400,
    exitPrice: 21100,
    result: -1300,
    resultPercent: -5.80,
    dateClosed: '2024-01-08',
  },
  {
    id: '4',
    pair: 'MATIC/USDT',
    symbol: 'MATIC',
    direction: 'Buy',
    entryPrice: 128,
    exitPrice: 145,
    result: 17,
    resultPercent: 13.28,
    dateClosed: '2024-01-05',
  },
  {
    id: '5',
    pair: 'BTC/USDT',
    symbol: 'BTC',
    direction: 'Buy',
    entryPrice: 7200000,
    exitPrice: 7560000,
    result: 360000,
    resultPercent: 5.00,
    dateClosed: '2023-12-28',
  },
];

const LIVE_TRADES: LiveTrade[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    symbol: 'BTC',
    direction: 'Buy',
    entryZone: '₹84,00,000 - ₹86,00,000',
    stopLoss: 8100000,
    takeProfit: 9200000,
    timeframe: 'Medium-term (2-4 weeks)',
    status: 'Open',
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    symbol: 'ETH',
    direction: 'Buy',
    entryZone: '₹3,35,000 - ₹3,42,000',
    stopLoss: 320000,
    takeProfit: 380000,
    timeframe: 'Short-term (1-2 weeks)',
    status: 'Open',
  },
  {
    id: '3',
    pair: 'SOL/USDT',
    symbol: 'SOL',
    direction: 'Sell',
    entryZone: '₹26,000 - ₹26,500',
    stopLoss: 27500,
    takeProfit: 23000,
    timeframe: 'Short-term (3-7 days)',
    status: 'Hit TP',
  },
];

const COIN_COLORS: { [key: string]: string } = {
  BTC: 'bg-orange-100 text-orange-600',
  ETH: 'bg-blue-100 text-blue-600',
  SOL: 'bg-purple-100 text-purple-600',
  MATIC: 'bg-indigo-100 text-indigo-600',
};

export default function Trades() {
  const [activeTab, setActiveTab] = useState<'closed' | 'live'>('closed');
  const { user } = useApp();
  const navigate = useNavigate();
  const isSubscribed = user?.isSubscribed || false;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 mb-2">Trades & Signals</h1>
            <p className="text-gray-600">
              Track past performance and access live trade ideas.
            </p>
          </div>
          <Link
            to="/trades/stats"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            View Stats
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('closed')}
            className={`pb-3 px-1 transition-colors ${
              activeTab === 'closed'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Closed trades
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`pb-3 px-1 transition-colors flex items-center gap-2 ${
              activeTab === 'live'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Live trades
            {!isSubscribed && <Lock className="w-4 h-4" />}
          </button>
        </div>

        {/* Closed Trades */}
        {activeTab === 'closed' && (
          <div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Closed trades show historical performance only, not current advice.
                </p>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm text-gray-600">Pair</th>
                    <th className="px-6 py-3 text-left text-sm text-gray-600">Direction</th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">Entry price</th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">Exit price</th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">Result</th>
                    <th className="px-6 py-3 text-right text-sm text-gray-600">Date closed</th>
                  </tr>
                </thead>
                <tbody>
                  {CLOSED_TRADES.map((trade) => (
                    <tr 
                      key={trade.id} 
                      onClick={() => navigate(`/trades/closed-${trade.id}`)}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                              COIN_COLORS[trade.symbol] || 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {trade.symbol.substring(0, 2)}
                          </div>
                          <span className="text-gray-900">{trade.pair}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                            trade.direction === 'Buy'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {trade.direction === 'Buy' ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {trade.direction}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        ₹{trade.entryPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-900">
                        ₹{trade.exitPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={trade.result >= 0 ? 'text-green-600' : 'text-red-600'}>
                          <div>
                            {trade.result >= 0 ? '+' : ''}₹{trade.result.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm">
                            {trade.result >= 0 ? '+' : ''}{trade.resultPercent.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-600 text-sm">
                        {new Date(trade.dateClosed).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {CLOSED_TRADES.map((trade) => (
                <div 
                  key={trade.id} 
                  onClick={() => navigate(`/trades/closed-${trade.id}`)}
                  className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                          COIN_COLORS[trade.symbol] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {trade.symbol.substring(0, 2)}
                      </div>
                      <span className="text-gray-900">{trade.pair}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        trade.direction === 'Buy'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {trade.direction === 'Buy' ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {trade.direction}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Entry</div>
                      <div className="text-gray-900">₹{trade.entryPrice.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Exit</div>
                      <div className="text-gray-900">₹{trade.exitPrice.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Result</div>
                      <div className={trade.result >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {trade.result >= 0 ? '+' : ''}₹{trade.result.toLocaleString('en-IN')} (
                        {trade.result >= 0 ? '+' : ''}{trade.resultPercent.toFixed(2)}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Date</div>
                      <div className="text-gray-900">
                        {new Date(trade.dateClosed).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Trades */}
        {activeTab === 'live' && (
          <div className="relative">
            {!isSubscribed && (
              <>
                {/* Blurred content */}
                <div className="filter blur-sm pointer-events-none select-none">
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div className="h-4 bg-gray-200 rounded w-32" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-3 bg-gray-200 rounded" />
                            <div className="h-3 bg-gray-200 rounded" />
                            <div className="h-3 bg-gray-200 rounded" />
                            <div className="h-3 bg-gray-200 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Locked Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 max-w-md mx-4 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-gray-900 mb-3">Live trades are for subscribers only</h3>
                    <ul className="text-left space-y-2 mb-6">
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Real‑time entries and exits</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Risk‑managed levels</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Built for Indian traders</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => navigate('/payments')}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Unlock live trades
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Actual Live Trades (for subscribers) */}
            {isSubscribed && (
              <div className="space-y-6">
                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm text-gray-600">Pair</th>
                        <th className="px-6 py-3 text-left text-sm text-gray-600">Direction</th>
                        <th className="px-6 py-3 text-left text-sm text-gray-600">Entry zone</th>
                        <th className="px-6 py-3 text-right text-sm text-gray-600">Stop loss</th>
                        <th className="px-6 py-3 text-right text-sm text-gray-600">Take profit</th>
                        <th className="px-6 py-3 text-left text-sm text-gray-600">Timeframe</th>
                        <th className="px-6 py-3 text-left text-sm text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LIVE_TRADES.map((trade) => (
                        <tr 
                          key={trade.id} 
                          onClick={() => navigate(`/trades/live-${trade.id}`)}
                          className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                                  COIN_COLORS[trade.symbol] || 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {trade.symbol.substring(0, 2)}
                              </div>
                              <span className="text-gray-900">{trade.pair}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                                trade.direction === 'Buy'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {trade.direction === 'Buy' ? (
                                <TrendingUp className="w-3 h-3" />
                              ) : (
                                <TrendingDown className="w-3 h-3" />
                              )}
                              {trade.direction}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-900">{trade.entryZone}</td>
                          <td className="px-6 py-4 text-right text-gray-900">
                            ₹{trade.stopLoss.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900">
                            ₹{trade.takeProfit.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-gray-700 text-sm">{trade.timeframe}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                                trade.status === 'Open'
                                  ? 'bg-blue-100 text-blue-700'
                                  : trade.status === 'Hit TP'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {trade.status === 'Hit TP' && <CheckCircle className="w-3 h-3" />}
                              {trade.status === 'Hit SL' && <XCircle className="w-3 h-3" />}
                              {trade.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {LIVE_TRADES.map((trade) => (
                    <div key={trade.id} className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                              COIN_COLORS[trade.symbol] || 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {trade.symbol.substring(0, 2)}
                          </div>
                          <span className="text-gray-900">{trade.pair}</span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                            trade.direction === 'Buy'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {trade.direction === 'Buy' ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {trade.direction}
                        </span>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <div className="text-gray-600 mb-1">Entry zone</div>
                          <div className="text-gray-900">{trade.entryZone}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-gray-600 mb-1">Stop loss</div>
                            <div className="text-gray-900">₹{trade.stopLoss.toLocaleString('en-IN')}</div>
                          </div>
                          <div>
                            <div className="text-gray-600 mb-1">Take profit</div>
                            <div className="text-gray-900">₹{trade.takeProfit.toLocaleString('en-IN')}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Timeframe</div>
                          <div className="text-gray-900">{trade.timeframe}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Status</div>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                              trade.status === 'Open'
                                ? 'bg-blue-100 text-blue-700'
                                : trade.status === 'Hit TP'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {trade.status === 'Hit TP' && <CheckCircle className="w-3 h-3" />}
                            {trade.status === 'Hit SL' && <XCircle className="w-3 h-3" />}
                            {trade.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}