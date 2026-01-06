import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Loader, Info, AlertTriangle, Activity } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { useTopCoins, useWhaleTracker, useLiquidations } from '../../hooks/useMarkets';
import CopilotAssistant from '../../components/CopilotAssistant';
import SocialSentimentWidget from '../../components/SocialSentimentWidget';

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

// Mock data for new features
const FEAR_GREED_INDEX = {
  value: 68,
  label: 'Greed',
  color: 'text-green-600',
  bgColor: 'bg-green-100',
  sparkline: [45, 48, 52, 55, 58, 62, 65, 68],
};

const GLOBAL_MARKET_DATA = {
  totalMarketCap: 3240000000000,
  volume24h: 128000000000,
  btcDominance: 42.5,
  topGainer: { symbol: 'SOL', change: 12.4 },
  topLoser: { symbol: 'ADA', change: -5.2 },
};

const FUNDING_RATES = [
  { coin: 'BTC', symbol: 'BTC', rate: 0.0125, status: 'Positive', source: 'Binance' },
  { coin: 'ETH', symbol: 'ETH', rate: -0.0045, status: 'Negative', source: 'Bybit' },
  { coin: 'SOL', symbol: 'SOL', rate: 0.0285, status: 'High Positive', source: 'OKX' },
  { coin: 'BNB', symbol: 'BNB', rate: 0.0015, status: 'Neutral', source: 'Binance' },
  { coin: 'XRP', symbol: 'XRP', rate: -0.0125, status: 'High Negative', source: 'Bybit' },
];

const OPEN_INTEREST_DATA = [
  { coin: 'BTC', symbol: 'BTC', openInterest: 15200000000, oiChange: 5.2, volume: 28500000000, volumeChange: 12.4 },
  { coin: 'ETH', symbol: 'ETH', openInterest: 8400000000, oiChange: -2.1, volume: 15200000000, volumeChange: -3.5 },
  { coin: 'SOL', symbol: 'SOL', openInterest: 1850000000, oiChange: 18.5, volume: 4850000000, volumeChange: 25.8 },
  { coin: 'BNB', symbol: 'BNB', openInterest: 980000000, oiChange: 3.2, volume: 1920000000, volumeChange: 5.1 },
];

const ON_CHAIN_HEALTH = {
  BTC: {
    hodlPercentage: 68.5,
    shortTermHolders: 31.5,
    mvrvZone: 'Neutral',
    mvrvColor: 'text-yellow-600',
    mvrvBg: 'bg-yellow-100',
    explanation: 'MVRV ratio suggests fair valuation',
  },
  ETH: {
    hodlPercentage: 58.2,
    shortTermHolders: 41.8,
    mvrvZone: 'Undervalued',
    mvrvColor: 'text-green-600',
    mvrvBg: 'bg-green-100',
    explanation: 'MVRV indicates potential upside',
  },
};

export default function MarketsPageEnhanced() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'coins' | 'whales' | 'liquidations' | 'derivatives'>('coins');
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

  const formatLargeNumber = (value: number) => {
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(2)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    return `$${value.toLocaleString('en-US')}`;
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

  const getFundingColor = (rate: number) => {
    if (rate > 0.02) return 'text-green-700 bg-green-100';
    if (rate > 0) return 'text-green-600';
    if (rate < -0.02) return 'text-red-700 bg-red-100';
    return 'text-red-600';
  };

  const getFundingStatusColor = (status: string) => {
    if (status.includes('High Positive')) return 'bg-green-600 text-white';
    if (status === 'Positive') return 'bg-green-100 text-green-700';
    if (status === 'Neutral') return 'bg-gray-100 text-gray-700';
    if (status === 'Negative') return 'bg-red-100 text-red-700';
    if (status.includes('High Negative')) return 'bg-red-600 text-white';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Global Market Bar */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <h1 className="text-gray-900">Markets</h1>
            
            {/* Global Market Bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Market Cap:</span>
                <span className="text-gray-900">{formatLargeNumber(GLOBAL_MARKET_DATA.totalMarketCap)}</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-gray-600">24h Vol:</span>
                <span className="text-gray-900">{formatLargeNumber(GLOBAL_MARKET_DATA.volume24h)}</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-gray-600">BTC Dom:</span>
                <span className="text-gray-900">{GLOBAL_MARKET_DATA.btcDominance}%</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <span className="text-green-600">↑ {GLOBAL_MARKET_DATA.topGainer.symbol} +{GLOBAL_MARKET_DATA.topGainer.change}%</span>
                <span className="text-gray-400">/</span>
                <span className="text-red-600">↓ {GLOBAL_MARKET_DATA.topLoser.symbol} {GLOBAL_MARKET_DATA.topLoser.change}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fear & Greed Index Card */}
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl text-gray-900 mb-2">{FEAR_GREED_INDEX.value}</div>
                <span className={`inline-flex px-4 py-1.5 rounded-full text-sm ${FEAR_GREED_INDEX.bgColor} ${FEAR_GREED_INDEX.color}`}>
                  {FEAR_GREED_INDEX.label}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 mb-2">Crypto Fear & Greed Index</h3>
                <p className="text-sm text-gray-600">
                  Current market sentiment: 0 = Extreme Fear, 100 = Extreme Greed
                </p>
              </div>
            </div>
            
            {/* 30-day Sparkline */}
            <div className="flex items-end gap-1 h-16">
              {FEAR_GREED_INDEX.sparkline.map((value, index) => (
                <div
                  key={index}
                  className="w-2 bg-blue-600 rounded-t"
                  style={{ height: `${(value / 100) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Main Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
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
                Hyperliquid Whales
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
              <button
                onClick={() => setActiveTab('derivatives')}
                className={`pb-3 px-4 transition-colors ${
                  activeTab === 'derivatives'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Derivatives
              </button>
            </div>

            {/* Currency Toggle */}
            {activeTab === 'coins' && (
              <div className="flex gap-2 mb-6">
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

            {/* Derivatives Tab */}
            {activeTab === 'derivatives' && (
              <div className="space-y-6">
                {/* Funding Rates Section */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-gray-900">Funding Rates</h2>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Periodic fee between longs and shorts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-6 py-3 text-left text-sm text-gray-600">Coin</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">Funding Rate</th>
                          <th className="px-6 py-3 text-left text-sm text-gray-600">Status</th>
                          <th className="px-6 py-3 text-left text-sm text-gray-600">Source</th>
                        </tr>
                      </thead>
                      <tbody>
                        {FUNDING_RATES.map((item) => (
                          <tr key={item.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                    COIN_COLORS[item.symbol] || 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {item.symbol.substring(0, 2)}
                                </div>
                                <span className="text-gray-900">{item.coin}</span>
                              </div>
                            </td>
                            <td className={`px-6 py-4 text-right ${getFundingColor(item.rate)}`}>
                              {item.rate >= 0 ? '+' : ''}{(item.rate * 100).toFixed(3)}%
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getFundingStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">
                              {item.source}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Open Interest & Volume Section */}
                <div className="bg-white rounded-xl border border-gray-200">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-gray-900">Open Interest & Volume</h2>
                      <div className="group relative">
                        <Info className="w-4 h-4 text-gray-400 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Total value of active derivative contracts
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-6 py-3 text-left text-sm text-gray-600">Coin</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">Open Interest</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">24h OI Change</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">24h Volume</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">24h Vol Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {OPEN_INTEREST_DATA.map((item) => (
                          <tr key={item.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                    COIN_COLORS[item.symbol] || 'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {item.symbol.substring(0, 2)}
                                </div>
                                <span className="text-gray-900">{item.coin}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-gray-900">
                              {formatLargeNumber(item.openInterest)}
                            </td>
                            <td className={`px-6 py-4 text-right ${item.oiChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.oiChange >= 0 ? '+' : ''}{item.oiChange.toFixed(1)}%
                            </td>
                            <td className="px-6 py-4 text-right text-gray-900">
                              {formatLargeNumber(item.volume)}
                            </td>
                            <td className={`px-6 py-4 text-right ${item.volumeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.volumeChange >= 0 ? '+' : ''}{item.volumeChange.toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* On-Chain Health Panel */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">On-Chain Health</h3>
              
              {/* BTC */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm">
                    BT
                  </div>
                  <span className="text-gray-900">Bitcoin</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">HODL %</span>
                    <span className="text-gray-900">{ON_CHAIN_HEALTH.BTC.hodlPercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Short-term holders</span>
                    <span className="text-gray-900">{ON_CHAIN_HEALTH.BTC.shortTermHolders}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">MVRV Zone</span>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs ${ON_CHAIN_HEALTH.BTC.mvrvBg} ${ON_CHAIN_HEALTH.BTC.mvrvColor}`}>
                      {ON_CHAIN_HEALTH.BTC.mvrvZone}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                    {ON_CHAIN_HEALTH.BTC.explanation}
                  </p>
                </div>
              </div>

              {/* ETH */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">
                    ET
                  </div>
                  <span className="text-gray-900">Ethereum</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">HODL %</span>
                    <span className="text-gray-900">{ON_CHAIN_HEALTH.ETH.hodlPercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Short-term holders</span>
                    <span className="text-gray-900">{ON_CHAIN_HEALTH.ETH.shortTermHolders}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">MVRV Zone</span>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs ${ON_CHAIN_HEALTH.ETH.mvrvBg} ${ON_CHAIN_HEALTH.ETH.mvrvColor}`}>
                      {ON_CHAIN_HEALTH.ETH.mvrvZone}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                    {ON_CHAIN_HEALTH.ETH.explanation}
                  </p>
                </div>
              </div>
            </div>

            {/* Today's Insight Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-blue-900">Today's Insight</h3>
              </div>
              <p className="text-sm text-blue-900 leading-relaxed">
                Market sentiment is showing mild greed (68/100) with positive BTC funding rates indicating bullish bias. 
                Open interest increased 5.2% suggesting new leveraged positions entering. 
                On-chain metrics for ETH show undervaluation, potentially offering good entry points.
              </p>
            </div>

            {/* Social Sentiment Widget */}
            <SocialSentimentWidget
              sentiment="Bullish"
              socialVolume={23}
              positivePercent={62}
              negativePercent={38}
            />
          </div>
        </div>
      </div>

      {/* Copilot Assistant */}
      <CopilotAssistant />
    </div>
  );
}