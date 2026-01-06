import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import Navigation from './Navigation';
import AIWeeklyReview from './AIWeeklyReview';

export default function TradeStats() {
  // Mock statistics
  const stats = {
    totalTrades: 25,
    winningTrades: 17,
    losingTrades: 8,
    winRate: 68.0,
    totalPnL: 452000,
    averageWin: 32500,
    averageLoss: -18200,
    averageRR: 2.1,
    maxDrawdown: -12.5,
    bestTrade: 85000,
    worstTrade: -35000,
  };

  const pnLByPair = [
    { pair: 'BTC/USDT', trades: 8, pnl: 245000, winRate: 75 },
    { pair: 'ETH/USDT', trades: 7, pnl: 125000, winRate: 71.4 },
    { pair: 'SOL/USDT', trades: 5, pnl: 45000, winRate: 60 },
    { pair: 'MATIC/USDT', trades: 3, pnl: 22000, winRate: 66.7 },
    { pair: 'ADA/USDT', trades: 2, pnl: 15000, winRate: 50 },
  ];

  const monthlyData = [
    { month: 'Sep', pnl: 65000 },
    { month: 'Oct', pnl: 89000 },
    { month: 'Nov', pnl: 125000 },
    { month: 'Dec', pnl: 173000 },
    { month: 'Jan', pnl: 452000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/trades"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trades
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Performance & Stats</h1>
          <p className="text-gray-600">
            Historical performance metrics from closed trades
          </p>
        </div>

        {/* AI Weekly Review */}
        <div className="mb-8">
          <AIWeeklyReview weekStart="Jan 6, 2025" weekEnd="Jan 12, 2025" />
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Win Rate</div>
            <div className="text-3xl text-gray-900 mb-1">{stats.winRate}%</div>
            <p className="text-sm text-gray-600">
              {stats.winningTrades} wins / {stats.totalTrades} trades
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Total P&L</div>
            <div className="text-3xl text-green-600 mb-1">
              +₹{stats.totalPnL.toLocaleString('en-IN')}
            </div>
            <p className="text-sm text-gray-600">Closed trades only</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Average R:R</div>
            <div className="text-3xl text-gray-900 mb-1">1:{stats.averageRR}</div>
            <p className="text-sm text-gray-600">Risk-to-reward ratio</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Max Drawdown</div>
            <div className="text-3xl text-red-600 mb-1">{stats.maxDrawdown}%</div>
            <p className="text-sm text-gray-600">Largest peak-to-trough</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cumulative P&L */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Cumulative P&L</h2>
            <div className="space-y-4">
              {monthlyData.map((data, index) => {
                const maxPnL = Math.max(...monthlyData.map(d => d.pnl));
                const widthPercent = (data.pnl / maxPnL) * 100;
                return (
                  <div key={data.month}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">{data.month}</span>
                      <span className="text-green-600">+₹{data.pnl.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-600 h-3 rounded-full transition-all"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* P&L by Pair */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">P&L by Pair</h2>
            <div className="space-y-4">
              {pnLByPair.map((pair) => (
                <div key={pair.pair} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-900">{pair.pair}</span>
                      <span className={pair.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {pair.pnl >= 0 ? '+' : ''}₹{pair.pnl.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{pair.trades} trades</span>
                      <span>•</span>
                      <span>{pair.winRate}% win rate</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best & Worst Trades */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Best & Worst Trades</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">Best Trade</span>
                </div>
                <div className="text-2xl text-green-600">
                  +₹{stats.bestTrade.toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600 mt-1">BTC/USDT • Jan 2024</p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm text-gray-600">Worst Trade</span>
                </div>
                <div className="text-2xl text-red-600">
                  -₹{Math.abs(stats.worstTrade).toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600 mt-1">SOL/USDT • Dec 2023</p>
              </div>
            </div>
          </div>

          {/* Trade Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Trade Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Winning Trades</span>
                  <span className="text-green-600">{stats.winningTrades}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${stats.winRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Losing Trades</span>
                  <span className="text-red-600">{stats.losingTrades}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-600 h-3 rounded-full"
                    style={{ width: `${100 - stats.winRate}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Win</span>
                  <span className="text-green-600">+₹{stats.averageWin.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Loss</span>
                  <span className="text-red-600">₹{Math.abs(stats.averageLoss).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Win/Loss Ratio</span>
                  <span className="text-gray-900">{(stats.averageWin / Math.abs(stats.averageLoss)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-blue-900 text-center">
            <strong>Transparency note:</strong> These statistics reflect actual closed trades from our signals. 
            Past performance is not indicative of future results. Always use proper risk management.
          </p>
        </div>
      </div>
    </div>
  );
}
