import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Loader, Tag } from 'lucide-react';
import Navigation from '../../components/Navigation';
import { useCoinDetails, useCoinChart } from '../../hooks/useMarkets';
import CoinInfoCard from './CoinInfoCard';
import PriceChart from './PriceChart';
import CopilotAssistant from '../../components/CopilotAssistant';

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

type TimeRange = '24h' | '7d' | '1m' | '1y';

export default function CoinDetailPage() {
  const { symbol } = useParams<{ symbol: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'info'>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const { data: coinDetails, loading: detailsLoading, error: detailsError } = useCoinDetails(symbol || '');
  const { data: chartData, loading: chartLoading } = useCoinChart(symbol || '', timeRange);

  // Key metrics for info tab
  const keyMetrics = [
    { label: 'Layer 1', color: 'bg-purple-100 text-purple-700' },
    { label: 'Smart Contracts', color: 'bg-blue-100 text-blue-700' },
    { label: 'DeFi', color: 'bg-green-100 text-green-700' },
  ];

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading coin details...</p>
          </div>
        </div>
        <CopilotAssistant />
      </div>
    );
  }

  if (detailsError || !coinDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-red-600 mb-4">{detailsError || 'Coin not found'}</p>
            <Link to="/markets" className="text-blue-600 hover:text-blue-700">
              ← Back to Markets
            </Link>
          </div>
        </div>
        <CopilotAssistant />
      </div>
    );
  }

  const formatCurrency = (value: number, curr: 'INR' | 'USD') => {
    if (curr === 'INR') {
      return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
    }
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  const displayPrice = currency === 'INR' ? coinDetails.price : coinDetails.priceUsd;
  const isPositive = coinDetails.change24h >= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/markets"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>

        {/* Coin Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl ${
                  COIN_COLORS[coinDetails.symbol] || 'bg-gray-100 text-gray-600'
                }`}
              >
                {coinDetails.symbol.substring(0, 2)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-gray-900">{coinDetails.name}</h1>
                  <span className="text-gray-500">{coinDetails.symbol}</span>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm ${
                    currency === 'INR' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {currency}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl text-gray-900">
                    {formatCurrency(displayPrice, currency)}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {isPositive ? '+' : ''}{coinDetails.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Currency Toggle */}
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
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-1 transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-3 px-1 transition-colors ${
                activeTab === 'info'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Info
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {/* TradingView-Style Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-gray-900">Price Chart</h2>

                  {/* Timeframe Pills */}
                  <div className="flex gap-2">
                    {(['24h', '7d', '1m', '1y'] as TimeRange[]).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          timeRange === range
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {chartLoading ? (
                  <div className="h-96 flex items-center justify-center">
                    <Loader className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                ) : (
                  <div className="h-96">
                    <PriceChart
                      data={chartData}
                      currency={currency}
                      isPositive={isPositive}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Coin Info Card */}
            <div>
              <CoinInfoCard
                marketCap={currency === 'INR' ? coinDetails.marketCap : coinDetails.marketCap / 83.28}
                circulatingSupply={coinDetails.circulatingSupply}
                totalSupply={coinDetails.totalSupply}
                maxSupply={coinDetails.maxSupply}
                volume24h={currency === 'INR' ? coinDetails.volume24h : coinDetails.volume24h / 83.28}
                treasuryHoldings={coinDetails.treasuryHoldings}
                currency={currency}
              />
            </div>
          </div>
        )}

        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Key Metrics */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <h3 className="text-gray-900">Key Metrics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keyMetrics.map((metric, index) => (
                    <span
                      key={index}
                      className={`inline-flex px-3 py-1.5 rounded-lg text-sm ${metric.color}`}
                    >
                      {metric.label}
                    </span>
                  ))}
                  <span className="inline-flex px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-700">
                    {coinDetails.symbol} Dominance: {((coinDetails.marketCap / 3240000000000) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-gray-900 mb-4">About {coinDetails.name}</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {coinDetails.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Coin Info Card */}
            <div>
              <CoinInfoCard
                marketCap={currency === 'INR' ? coinDetails.marketCap : coinDetails.marketCap / 83.28}
                circulatingSupply={coinDetails.circulatingSupply}
                totalSupply={coinDetails.totalSupply}
                maxSupply={coinDetails.maxSupply}
                volume24h={currency === 'INR' ? coinDetails.volume24h : coinDetails.volume24h / 83.28}
                treasuryHoldings={coinDetails.treasuryHoldings}
                currency={currency}
              />
            </div>
          </div>
        )}
      </div>

      {/* Copilot Assistant */}
      <CopilotAssistant />
    </div>
  );
}