import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { useTopCoins, useWhaleTracker, useLiquidations } from '../../hooks/useMarkets';

const COIN_COLORS: { [key: string]: string } = {
  BTC: 'bg-orange-100 text-orange-600',
  ETH: 'bg-blue-100 text-blue-600',
  SOL: 'bg-purple-100 text-purple-600',
  BNB: 'bg-yellow-100 text-yellow-600',
  XRP: 'bg-blue-100 text-blue-700',
  USDT: 'bg-green-100 text-green-600',
  USDC: 'bg-blue-100 text-blue-600',
  ADA: 'bg-blue-100 text-blue-700',
  AVAX: 'bg-red-100 text-red-600',
  DOT: 'bg-pink-100 text-pink-600',
};

export default function MarketsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'coins' | 'whales' | 'liquidations'>('coins');
  const [liquidationWindow, setLiquidationWindow] = useState<'1h' | '24h'>('1h');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const { data: coins, loading: coinsLoading, error: coinsError } = useTopCoins();
  const { data: whales, loading: whalesLoading, error: whalesError } = useWhaleTracker();
  const { data: liquidations, loading: liquidationsLoading, error: liquidationsError } = useLiquidations(liquidationWindow);

  const formatCurrency = (value: number, curr: 'INR' | 'USD') => {
    if (curr === 'INR') {
      return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Markets</h1>
          <p className="text-gray-600">
            Track live data for the top 10 market cap coins
          </p>
        </div>

        {/* Main Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('coins')}
              className={`pb-3 px-4 transition-colors ${
                activeTab === 'coins'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Top Coins
            </button>
            <button
              onClick={() => setActiveTab('whales')}
              className={`pb-3 px-4 transition-colors ${
                activeTab === 'whales'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Whale Tracker
            </button>
            <button
              onClick={() => setActiveTab('liquidations')}
              className={`pb-3 px-4 transition-colors ${
                activeTab === 'liquidations'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Liquidations
            </button>
          </div>

          {/* Currency Toggle */}
          {activeTab === 'coins' && (
            <div className="flex gap-2">
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  currency === 'INR'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                INR (₹)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  currency === 'USD'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                }`}
              >
                USD ($)
              </button>
            </div>
          )}
        </div>

        {/* Top Coins Tab */}
        {activeTab === 'coins' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {coinsLoading ? (
              <div className="p-12 text-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600">Loading market data...</p>
              </div>
            ) : coinsError ? (
              <div className="p-12 text-center">
                <p className="text-red-600">{coinsError}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm text-gray-600">Rank</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-600">Coin</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Price</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">24h Change</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Market Cap</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">24h Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coins.map((coin) => (
                      <tr
                        key={coin.symbol}
                        onClick={() => navigate(`/markets/${coin.symbol.toLowerCase()}`)}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4 text-gray-600">
                          #{coin.rank}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                                COIN_COLORS[coin.symbol] || 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {coin.symbol.substring(0, 2)}
                            </div>
                            <div>
                              <div className="text-gray-900">{coin.name}</div>
                              <div className="text-sm text-gray-500">{coin.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900">
                          {formatCurrency(currency === 'INR' ? coin.price : coin.priceUsd, currency)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`inline-flex items-center gap-1 ${
                              coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {coin.change24h >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900">
                          {formatCurrency(coin.marketCap, currency)}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900">
                          {formatCurrency(coin.volume24h, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Whale Tracker Tab */}
        {activeTab === 'whales' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-gray-900">Hyperliquid Whale Tracker</h2>
              <p className="text-sm text-gray-600 mt-1">
                Notable large trades and positions on Hyperliquid
              </p>
            </div>

            {whalesLoading ? (
              <div className="p-12 text-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600">Loading whale activity...</p>
              </div>
            ) : whalesError ? (
              <div className="p-12 text-center">
                <p className="text-red-600">{whalesError}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm text-gray-600">Coin</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-600">Direction</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Size (Notional)</th>
                      <th className="px-6 py-3 text-left text-sm text-gray-600">Exchange</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {whales.map((whale) => (
                      <tr key={whale.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                COIN_COLORS[whale.symbol] || 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {whale.symbol.substring(0, 2)}
                            </div>
                            <span className="text-gray-900">{whale.coin}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                              whale.direction === 'Long'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {whale.direction === 'Long' ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {whale.direction}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-900">
                          ₹{whale.size.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {whale.exchange}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600 text-sm">
                          {formatTime(whale.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Liquidations Tab */}
        {activeTab === 'liquidations' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-gray-900">Liquidations Tracker</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Total liquidations across top coins
                </p>
              </div>

              {/* Time Window Pills */}
              <div className="flex gap-2">
                <button
                  onClick={() => setLiquidationWindow('1h')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    liquidationWindow === '1h'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  1h
                </button>
                <button
                  onClick={() => setLiquidationWindow('24h')}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    liquidationWindow === '24h'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  24h
                </button>
              </div>
            </div>

            {liquidationsLoading ? (
              <div className="p-12 text-center">
                <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600">Loading liquidations data...</p>
              </div>
            ) : liquidationsError ? (
              <div className="p-12 text-center">
                <p className="text-red-600">{liquidationsError}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm text-gray-600">Coin</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Long Liquidations</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Short Liquidations</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Biggest Liquidation</th>
                      <th className="px-6 py-3 text-right text-sm text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liquidations.map((liq) => {
                      const total = liq.longLiquidations + liq.shortLiquidations;
                      return (
                        <tr key={liq.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                  COIN_COLORS[liq.symbol] || 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {liq.symbol.substring(0, 2)}
                              </div>
                              <span className="text-gray-900">{liq.coin}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-green-600">
                            ₹{liq.longLiquidations.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right text-red-600">
                            ₹{liq.shortLiquidations.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900">
                            ₹{liq.biggestLiquidation.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 text-right text-gray-900">
                            ₹{total.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
