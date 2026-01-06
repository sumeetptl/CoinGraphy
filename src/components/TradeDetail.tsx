import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Lock, BarChart2, Share2, Users } from 'lucide-react';
import Navigation from './Navigation';
import { useApp } from '../App';

// Trade data - same as in Trades.tsx
const CLOSED_TRADES_DATA: any = {
  'closed-1': {
    pair: 'BTC/USDT',
    symbol: 'BTC',
    direction: 'Buy',
    entryPrice: 6850000,
    exitPrice: 7125000,
    stopLoss: 6650000,
    takeProfit: 7200000,
    result: 275000,
    resultPercent: 4.01,
    dateClosed: '2024-01-15',
    dateOpened: '2024-01-10',
    timeframe: 'Medium-term (1-2 weeks)',
    rationale: 'BTC showed strong support at ₹68L with increasing volume. RSI oversold on daily chart, and we observed bullish divergence. Target aligned with previous resistance level. Risk-to-reward of 1:2.5 made this an attractive setup.',
  },
  'closed-2': {
    pair: 'ETH/USDT',
    symbol: 'ETH',
    direction: 'Sell',
    entryPrice: 285000,
    exitPrice: 272000,
    stopLoss: 295000,
    takeProfit: 270000,
    result: 13000,
    resultPercent: 4.56,
    dateClosed: '2024-01-12',
    dateOpened: '2024-01-09',
    timeframe: 'Short-term (3-5 days)',
    rationale: 'ETH rejected at ₹2.9L resistance multiple times with decreasing volume. Market showing weakness, and BTC correlation suggested downside. Took short position with tight stop above recent high.',
  },
};

const LIVE_TRADES_DATA: any = {
  'live-1': {
    pair: 'BTC/USDT',
    symbol: 'BTC',
    direction: 'Buy',
    entryZone: '₹84,00,000 - ₹86,00,000',
    entryPrice: 8500000,
    stopLoss: 8100000,
    takeProfit: 9200000,
    timeframe: 'Medium-term (2-4 weeks)',
    status: 'Open',
    dateOpened: '2024-01-20',
    rationale: 'Bitcoin consolidating in a tight range after recent correction. Strong accumulation visible on-chain. Once we break ₹86L with volume, next target is ₹92L. This offers 2.75:1 R:R. Invalidation below ₹81L.',
  },
  'live-2': {
    pair: 'ETH/USDT',
    symbol: 'ETH',
    direction: 'Buy',
    entryZone: '₹3,35,000 - ₹3,42,000',
    entryPrice: 338000,
    stopLoss: 320000,
    takeProfit: 380000,
    timeframe: 'Short-term (1-2 weeks)',
    status: 'Open',
    dateOpened: '2024-01-18',
    rationale: 'ETH showing strength relative to BTC. Key level at ₹3.4L acting as support. Expecting bounce to ₹3.8L if BTC remains stable. Stop loss below recent swing low.',
  },
};

const COIN_COLORS: { [key: string]: string } = {
  BTC: 'bg-orange-100 text-orange-600',
  ETH: 'bg-blue-100 text-blue-600',
  SOL: 'bg-purple-100 text-purple-600',
  MATIC: 'bg-indigo-100 text-indigo-600',
};

export default function TradeDetail() {
  const { tradeId } = useParams<{ tradeId: string }>();
  const { user } = useApp();
  const navigate = useNavigate();
  const isSubscribed = user?.isSubscribed || false;

  const isLiveTrade = tradeId?.startsWith('live-');
  const trade = isLiveTrade ? LIVE_TRADES_DATA[tradeId || ''] : CLOSED_TRADES_DATA[tradeId || ''];

  if (!trade) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600 mb-4">Trade not found</p>
          <Link to="/trades" className="text-blue-600 hover:text-blue-700">
            ← Back to Trades
          </Link>
        </div>
      </div>
    );
  }

  const showBlurred = isLiveTrade && !isSubscribed;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/trades"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trades
        </Link>

        {/* Trade Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  COIN_COLORS[trade.symbol] || 'bg-gray-100 text-gray-600'
                }`}
              >
                <span className="text-lg">{trade.symbol.substring(0, 2)}</span>
              </div>
              <div>
                <h1 className="text-gray-900 mb-1">{trade.pair}</h1>
                <p className="text-gray-600">{trade.timeframe}</p>
              </div>
            </div>

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                trade.direction === 'Buy'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {trade.direction === 'Buy' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trade.direction}
            </span>
          </div>

          {trade.status && (
            <div>
              <span className="text-sm text-gray-600 mr-2">Status:</span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  trade.status === 'Open'
                    ? 'bg-blue-100 text-blue-700'
                    : trade.status === 'Hit TP'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {trade.status}
              </span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trade Levels */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
              {showBlurred && (
                <>
                  <div className="filter blur-sm select-none">
                    <h2 className="text-gray-900 mb-4">Trade Levels</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Entry</div>
                        <div className="text-gray-900">₹88,88,888</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Stop Loss</div>
                        <div className="text-red-600">₹88,88,888</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Take Profit</div>
                        <div className="text-green-600">₹88,88,888</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Risk:Reward</div>
                        <div className="text-gray-900">1:2.5</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-95">
                    <div className="text-center max-w-xs p-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Lock className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-gray-900 mb-2">Subscribe to see full levels</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get access to entry zones, stop loss, and take profit targets.
                      </p>
                      <button
                        onClick={() => navigate('/payments')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Unlock now
                      </button>
                    </div>
                  </div>
                </>
              )}

              {!showBlurred && (
                <>
                  <h2 className="text-gray-900 mb-4">Trade Levels</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">
                        {isLiveTrade ? 'Entry Zone' : 'Entry Price'}
                      </div>
                      <div className="text-gray-900">
                        {isLiveTrade && trade.entryZone ? trade.entryZone : `₹${trade.entryPrice?.toLocaleString('en-IN')}`}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Stop Loss</div>
                      <div className="text-red-600">₹{trade.stopLoss.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Take Profit</div>
                      <div className="text-green-600">₹{trade.takeProfit.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Risk:Reward</div>
                      <div className="text-gray-900">
                        1:{((trade.takeProfit - trade.entryPrice) / (trade.entryPrice - trade.stopLoss)).toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {!isLiveTrade && trade.exitPrice && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Exit Price</div>
                        <div className="text-gray-900">₹{trade.exitPrice.toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Rationale */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Trade Rationale</h2>
              <p className="text-gray-700 leading-relaxed">{trade.rationale}</p>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Price Chart</h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-12 text-center border border-blue-100">
                <BarChart2 className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Interactive chart placeholder</p>
                <p className="text-sm text-gray-500">
                  TradingView or chart integration would go here
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-600 mb-1">Opened</div>
                  <div className="text-gray-900">
                    {new Date(trade.dateOpened).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                {trade.dateClosed && (
                  <div>
                    <div className="text-gray-600 mb-1">Closed</div>
                    <div className="text-gray-900">
                      {new Date(trade.dateClosed).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Result (for closed trades) */}
            {!isLiveTrade && trade.result !== undefined && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Result</h3>
                <div className={`text-2xl mb-2 ${trade.result >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trade.result >= 0 ? '+' : ''}₹{trade.result.toLocaleString('en-IN')}
                </div>
                <div className={`text-sm ${trade.result >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {trade.result >= 0 ? '+' : ''}{trade.resultPercent.toFixed(2)}% return
                </div>
              </div>
            )}

            {/* Share to Community (for closed trades) */}
            {!isLiveTrade && trade.result !== undefined && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Share Your Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share your trade setup and analysis with the community to help others learn.
                </p>
                <button
                  onClick={() => navigate('/community-trade-ideas')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share to Community
                </button>
              </div>
            )}

            {/* Risk Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900">
                <strong>Risk management:</strong> Always use proper position sizing. Never risk more than 1-2% of your portfolio on a single trade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
