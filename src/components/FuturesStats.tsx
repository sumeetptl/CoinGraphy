import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import Navigation from './Navigation';

export default function FuturesStats() {
  // Mock statistics for futures trading
  const stats = {
    totalTrades: 18,
    winningTrades: 12,
    losingTrades: 6,
    winRate: 66.7,
    totalPnL: 38650,
    totalPnLPercent: 15.2,
    averageWin: 4125,
    averageLoss: -2850,
    averageRR: 1.8,
    maxDrawdown: -8.5,
    bestTrade: 8500,
    worstTrade: -5200,
    longTrades: 11,
    shortTrades: 7,
    longWinRate: 63.6,
    shortWinRate: 71.4,
  };

  const pnLByPair = [
    { pair: 'BTC/USDT Perp', trades: 6, pnl: 18500, winRate: 66.7, avgHoldTime: '4.2 days' },
    { pair: 'ETH/USDT Perp', trades: 5, pnl: 12200, winRate: 80, avgHoldTime: '3.1 days' },
    { pair: 'SOL/USDT Perp', trades: 4, pnl: 5850, winRate: 50, avgHoldTime: '2.5 days' },
    { pair: 'MATIC/USDT Perp', trades: 2, pnl: 1400, winRate: 50, avgHoldTime: '5.0 days' },
    { pair: 'ADA/USDT Perp', trades: 1, pnl: 700, winRate: 100, avgHoldTime: '1.5 days' },
  ];

  const monthlyData = [
    { month: 'Sep', trades: 3, pnl: 4200, winRate: 66.7 },
    { month: 'Oct', trades: 4, pnl: 7800, winRate: 75 },
    { month: 'Nov', trades: 5, pnl: 12400, winRate: 60 },
    { month: 'Dec', trades: 4, pnl: 8900, winRate: 50 },
    { month: 'Jan', trades: 2, pnl: 5350, winRate: 100 },
  ];

  const timeOfDayStats = [
    { period: 'Morning (6-12)', trades: 5, pnl: 8500, winRate: 60 },
    { period: 'Afternoon (12-18)', trades: 7, pnl: 18200, winRate: 71.4 },
    { period: 'Evening (18-24)', trades: 4, pnl: 9800, winRate: 75 },
    { period: 'Night (0-6)', trades: 2, pnl: 2150, winRate: 50 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Futures Journal Stats</h1>
          <p className="text-gray-600">
            Performance metrics and insights from your futures trading
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Total P&L</div>
            <div className="text-3xl text-green-600 mb-1">
              +₹{stats.totalPnL.toLocaleString('en-IN')}
            </div>
            <p className="text-sm text-gray-600">+{stats.totalPnLPercent}% return</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-1">Win Rate</div>
            <div className="text-3xl text-gray-900 mb-1">{stats.winRate}%</div>
            <p className="text-sm text-gray-600">
              {stats.winningTrades} wins / {stats.totalTrades} trades
            </p>
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

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Performance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Monthly Performance</h2>
            <div className="space-y-4">
              {monthlyData.map((data, index) => {
                const maxPnL = Math.max(...monthlyData.map(d => d.pnl));
                const widthPercent = (data.pnl / maxPnL) * 100;
                return (
                  <div key={data.month}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div>
                        <span className="text-gray-900">{data.month}</span>
                        <span className="text-gray-500 ml-2">({data.trades} trades)</span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600">+₹{data.pnl.toLocaleString('en-IN')}</div>
                        <div className="text-xs text-gray-500">{data.winRate}% win rate</div>
                      </div>
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
                <div key={pair.pair}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-gray-900">{pair.pair}</div>
                      <div className="text-xs text-gray-500">
                        {pair.trades} trades • {pair.winRate}% win rate • Avg hold: {pair.avgHoldTime}
                      </div>
                    </div>
                    <span className={pair.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {pair.pnl >= 0 ? '+' : ''}₹{pair.pnl.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Long vs Short Performance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Long vs Short Performance</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-900">Long positions</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.longTrades} trades</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Win rate</span>
                    <span className="text-gray-900">{stats.longWinRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${stats.longWinRate}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-900">Short positions</span>
                  </div>
                  <span className="text-sm text-gray-600">{stats.shortTrades} trades</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Win rate</span>
                    <span className="text-gray-900">{stats.shortWinRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full"
                      style={{ width: `${stats.shortWinRate}%` }}
                    />
                  </div>
                </div>
              </div>
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
                <p className="text-sm text-gray-600 mt-1">ETH/USDT Perp Short • Dec 2024</p>
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
                <p className="text-sm text-gray-600 mt-1">BTC/USDT Perp Long • Nov 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Time of Day Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-6">Performance by Time of Day</h2>
            <div className="space-y-4">
              {timeOfDayStats.map((stat) => (
                <div key={stat.period}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-gray-900">{stat.period}</div>
                      <div className="text-xs text-gray-500">
                        {stat.trades} trades • {stat.winRate}% win rate
                      </div>
                    </div>
                    <span className={stat.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {stat.pnl >= 0 ? '+' : ''}₹{stat.pnl.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
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
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Profit Factor</span>
                  <span className="text-gray-900">
                    {((stats.averageWin * stats.winningTrades) / (Math.abs(stats.averageLoss) * stats.losingTrades)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <p className="text-sm text-blue-900 text-center">
            <strong>Journal note:</strong> These stats are from your personal futures trading journal. 
            Use them to identify patterns, improve your strategy, and manage risk effectively. 
            Remember to always use proper position sizing and risk management.
          </p>
        </div>
      </div>
    </div>
  );
}
