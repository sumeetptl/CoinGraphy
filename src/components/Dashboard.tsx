import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Plus, Edit2, AlertCircle, Info, TrendingDown, BarChart3 } from 'lucide-react';
import { useApp, Holding } from '../App';
import Navigation from './Navigation';
import AddHoldingModal from './AddHoldingModal';
import AddFuturesModal from './AddFuturesModal';
import DashboardRiskWidgets from './DashboardRiskWidgets';
import CopilotAssistant from './CopilotAssistant';
import IndiaTaxPreview from './IndiaTaxPreview';
import TradingCalendar from './TradingCalendar';
import { generateCalendarData } from '../utils/calendarData';

const MOCK_PRICES: { [key: string]: number } = {
  BTC: 8628480,
  ETH: 338784,
  SOL: 25344,
  MATIC: 152,
  ADA: 120,
};

const COIN_COLORS: { [key: string]: string } = {
  BTC: 'bg-orange-100 text-orange-600',
  ETH: 'bg-blue-100 text-blue-600',
  SOL: 'bg-purple-100 text-purple-600',
  MATIC: 'bg-indigo-100 text-indigo-600',
  ADA: 'bg-green-100 text-green-600',
};

export interface FuturesPosition {
  id: string;
  pair: string;
  direction: 'Long' | 'Short';
  size: number; // notional in ₹
  entryPrice: number;
  markPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  notes?: string;
  openDate: string;
  closeDate?: string;
  exitPrice?: number;
  pnl?: number;
  pnlPercent?: number;
}

export default function Dashboard() {
  const { holdings, setHoldings } = useApp();
  const [mainTab, setMainTab] = useState<'spot' | 'futures'>('spot');
  const [futuresTab, setFuturesTab] = useState<'open' | 'closed' | 'calendar'>('open');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFuturesModalOpen, setIsFuturesModalOpen] = useState(false);
  const [editingHolding, setEditingHolding] = useState<Holding | null>(null);
  const [editingFutures, setEditingFutures] = useState<FuturesPosition | null>(null);
  const [futuresPositions, setFuturesPositions] = useState<FuturesPosition[]>([]);
  
  // Generate calendar data for current month
  const calendarData = useMemo(() => {
    const now = new Date();
    return generateCalendarData(now.getFullYear(), now.getMonth(), 'futures');
  }, []);

  // Initialize with some mock data if empty
  useEffect(() => {
    if (holdings.length === 0) {
      setHoldings([
        {
          id: '1',
          coin: 'Bitcoin',
          symbol: 'BTC',
          quantity: 0.05,
          averageBuyPrice: 8200000,
          currentPrice: MOCK_PRICES.BTC,
        },
        {
          id: '2',
          coin: 'Ethereum',
          symbol: 'ETH',
          quantity: 2,
          averageBuyPrice: 320000,
          currentPrice: MOCK_PRICES.ETH,
        },
        {
          id: '3',
          coin: 'Solana',
          symbol: 'SOL',
          quantity: 10,
          averageBuyPrice: 24000,
          currentPrice: MOCK_PRICES.SOL,
        },
      ]);
    }
  }, [holdings.length, setHoldings]);

  // Initialize futures positions with mock data
  useEffect(() => {
    if (futuresPositions.length === 0) {
      setFuturesPositions([
        {
          id: '1',
          pair: 'BTC/USDT Perp',
          direction: 'Long',
          size: 100000,
          entryPrice: 8400000,
          markPrice: 8628480,
          stopLoss: 8200000,
          takeProfit: 8800000,
          notes: 'Bullish momentum, expecting breakout above 86L',
          openDate: '2024-01-20',
        },
        {
          id: '2',
          pair: 'ETH/USDT Perp',
          direction: 'Short',
          size: 50000,
          entryPrice: 345000,
          markPrice: 338784,
          stopLoss: 355000,
          takeProfit: 320000,
          notes: 'Resistance rejection at 3.5L, short-term bearish',
          openDate: '2024-01-18',
        },
        {
          id: '3',
          pair: 'BTC/USDT Perp',
          direction: 'Long',
          size: 80000,
          entryPrice: 8100000,
          exitPrice: 8350000,
          pnl: 2469,
          pnlPercent: 3.09,
          openDate: '2024-01-10',
          closeDate: '2024-01-15',
          notes: 'Clean breakout trade, closed at resistance',
        },
        {
          id: '4',
          pair: 'SOL/USDT Perp',
          direction: 'Short',
          size: 30000,
          entryPrice: 26000,
          exitPrice: 23500,
          pnl: 2885,
          pnlPercent: 9.62,
          openDate: '2024-01-05',
          closeDate: '2024-01-12',
          notes: 'Market weakness, hit TP perfectly',
        },
      ]);
    }
  }, [futuresPositions.length]);

  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.quantity * h.averageBuyPrice, 0);
  const totalChange = totalValue - totalCost;
  const totalChangePercent = totalCost > 0 ? (totalChange / totalCost) * 100 : 0;

  // Calculate concentration risk
  const largestHolding = holdings.length > 0
    ? Math.max(...holdings.map(h => (h.quantity * h.currentPrice / totalValue) * 100))
    : 0;

  // Calculate futures metrics
  const openPositions = futuresPositions.filter(p => !p.closeDate);
  const closedPositions = futuresPositions.filter(p => p.closeDate);

  const openPnL = openPositions.reduce((sum, p) => {
    if (!p.markPrice) return sum;
    const contracts = p.size / p.entryPrice;
    const pnl = p.direction === 'Long'
      ? contracts * (p.markPrice - p.entryPrice)
      : contracts * (p.entryPrice - p.markPrice);
    return sum + pnl;
  }, 0);

  const closedPnL = closedPositions.reduce((sum, p) => sum + (p.pnl || 0), 0);
  const futuresWinRate = closedPositions.length > 0
    ? (closedPositions.filter(p => (p.pnl || 0) > 0).length / closedPositions.length) * 100
    : 0;

  const handleEdit = (holding: Holding) => {
    setEditingHolding(holding);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingHolding(null);
  };

  const handleEditFutures = (position: FuturesPosition) => {
    setEditingFutures(position);
    setIsFuturesModalOpen(true);
  };

  const handleCloseFuturesModal = () => {
    setIsFuturesModalOpen(false);
    setEditingFutures(null);
  };

  const getRiskLevel = () => {
    if (largestHolding > 60) return { label: 'High', color: 'text-red-600 bg-red-100' };
    if (largestHolding > 40) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-100' };
    return { label: 'Low', color: 'text-green-600 bg-green-100' };
  };

  const risk = getRiskLevel();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Main Tabs */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-6">Your portfolio</h1>

          {/* Main Tab Switcher */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setMainTab('spot')}
              className={`pb-3 px-4 transition-colors ${
                mainTab === 'spot'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Holdings (Spot)
            </button>
            <button
              onClick={() => setMainTab('futures')}
              className={`pb-3 px-4 transition-colors ${
                mainTab === 'futures'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Futures Journal
            </button>
          </div>

          {/* Spot Holdings Summary */}
          {mainTab === 'spot' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Total value</div>
                <div className="text-3xl text-gray-900 mb-1">
                  ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className={`text-sm ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalChange >= 0 ? '+' : ''}₹{totalChange.toLocaleString('en-IN', { maximumFractionDigits: 0 })} (
                  {totalChange >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%)
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">24h change</div>
                <div className="text-3xl text-green-600 mb-1">+2.4%</div>
                <div className="text-sm text-gray-600">
                  +₹10,240
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Risk level</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm ${risk.color}`}>
                    {risk.label}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Based on concentration and volatility
                </div>
              </div>
            </div>
          )}

          {/* Futures Summary */}
          {mainTab === 'futures' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Open positions P&L</div>
                <div className={`text-3xl mb-1 ${openPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {openPnL >= 0 ? '+' : ''}₹{openPnL.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600">
                  {openPositions.length} open position{openPositions.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Closed futures P&L</div>
                <div className={`text-3xl mb-1 ${closedPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {closedPnL >= 0 ? '+' : ''}₹{closedPnL.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600">
                  {closedPositions.length} closed trade{closedPositions.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-sm text-gray-600 mb-2">Win rate</div>
                <div className="text-3xl text-gray-900 mb-1">
                  {futuresWinRate.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">
                  {closedPositions.filter(p => (p.pnl || 0) > 0).length} wins / {closedPositions.length} trades
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Spot Holdings */}
            {mainTab === 'spot' && (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-gray-900">Holdings</h2>
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add coin
                  </button>
                </div>

                {holdings.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <TrendingUp className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-600 mb-4">No holdings yet</p>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Add your first coin
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-6 py-3 text-left text-sm text-gray-600">Coin</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">Quantity</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">Current value</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">24h change</th>
                          <th className="px-6 py-3 text-right text-sm text-gray-600">Allocation</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map((holding) => {
                          const value = holding.quantity * holding.currentPrice;
                          const allocation = totalValue > 0 ? (value / totalValue) * 100 : 0;
                          const change24h = Math.random() * 10 - 3; // Mock 24h change

                          return (
                            <tr key={holding.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                                      COIN_COLORS[holding.symbol] || 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {holding.symbol.substring(0, 2)}
                                  </div>
                                  <div>
                                    <div className="text-gray-900">{holding.coin}</div>
                                    <div className="text-sm text-gray-500">{holding.symbol}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right text-gray-900">
                                {holding.quantity.toLocaleString('en-IN', { maximumFractionDigits: 4 })}
                              </td>
                              <td className="px-6 py-4 text-right text-gray-900">
                                ₹{value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className={change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                                  {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right text-gray-900">
                                {allocation.toFixed(1)}%
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleEdit(holding)}
                                  className="text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
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

            {/* Futures Journal */}
            {mainTab === 'futures' && (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h2 className="text-gray-900">Futures Journal</h2>
                    <div className="flex items-center gap-3">
                      <Link
                        to="/futures-stats"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-gray-300 transition-colors text-sm"
                      >
                        <BarChart3 className="w-4 h-4" />
                        Stats
                      </Link>
                      <button
                        onClick={() => setIsFuturesModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add position
                      </button>
                    </div>
                  </div>

                  {/* Sub Tabs */}
                  <div className="flex gap-4 border-b border-gray-200 -mb-6">
                    <button
                      onClick={() => setFuturesTab('open')}
                      className={`pb-3 px-1 transition-colors ${
                        futuresTab === 'open'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Open positions
                    </button>
                    <button
                      onClick={() => setFuturesTab('closed')}
                      className={`pb-3 px-1 transition-colors ${
                        futuresTab === 'closed'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Closed trades
                    </button>
                    <button
                      onClick={() => setFuturesTab('calendar')}
                      className={`pb-3 px-1 transition-colors ${
                        futuresTab === 'calendar'
                          ? 'border-b-2 border-blue-600 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Calendar
                    </button>
                  </div>
                </div>

                {/* Open Positions Table */}
                {futuresTab === 'open' && (
                  <div className="overflow-x-auto">
                    {openPositions.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-gray-600 mb-4">No open positions</p>
                        <button
                          onClick={() => setIsFuturesModalOpen(true)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Add your first position
                        </button>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm text-gray-600">Pair</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-600">Direction</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Size</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Entry</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Mark</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Unrealised P&L</th>
                            <th className="px-6 py-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {openPositions.map((position) => {
                            const contracts = position.size / position.entryPrice;
                            const pnl = position.markPrice
                              ? position.direction === 'Long'
                                ? contracts * (position.markPrice - position.entryPrice)
                                : contracts * (position.entryPrice - position.markPrice)
                              : 0;
                            const pnlPercent = ((pnl / position.size) * 100);

                            return (
                              <tr key={position.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4">
                                  <div className="text-gray-900">{position.pair}</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(position.openDate).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                    })}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                                      position.direction === 'Long'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}
                                  >
                                    {position.direction === 'Long' ? (
                                      <TrendingUp className="w-3 h-3" />
                                    ) : (
                                      <TrendingDown className="w-3 h-3" />
                                    )}
                                    {position.direction}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right text-gray-900">
                                  ₹{position.size.toLocaleString('en-IN')}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-900">
                                  ₹{position.entryPrice.toLocaleString('en-IN')}
                                </td>
                                <td className="px-6 py-4 text-right text-gray-900">
                                  ₹{position.markPrice?.toLocaleString('en-IN') || '—'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className={pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                                    <div>
                                      {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-sm">
                                      {pnl >= 0 ? '+' : ''}{pnlPercent.toFixed(2)}%
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <button
                                    onClick={() => handleEditFutures(position)}
                                    className="text-gray-400 hover:text-blue-600 transition-colors"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Closed Trades Table */}
                {futuresTab === 'closed' && (
                  <div className="overflow-x-auto">
                    {closedPositions.length === 0 ? (
                      <div className="p-12 text-center">
                        <p className="text-gray-600">No closed trades yet</p>
                      </div>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm text-gray-600">Pair</th>
                            <th className="px-6 py-3 text-left text-sm text-gray-600">Direction</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Entry</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Exit</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">P&L</th>
                            <th className="px-6 py-3 text-right text-sm text-gray-600">Date closed</th>
                          </tr>
                        </thead>
                        <tbody>
                          {closedPositions.map((position) => (
                            <tr key={position.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="px-6 py-4 text-gray-900">{position.pair}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                                    position.direction === 'Long'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {position.direction === 'Long' ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {position.direction}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right text-gray-900">
                                ₹{position.entryPrice.toLocaleString('en-IN')}
                              </td>
                              <td className="px-6 py-4 text-right text-gray-900">
                                ₹{position.exitPrice?.toLocaleString('en-IN')}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className={(position.pnl || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
                                  <div>
                                    {(position.pnl || 0) >= 0 ? '+' : ''}₹{position.pnl?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                  </div>
                                  <div className="text-sm">
                                    {(position.pnl || 0) >= 0 ? '+' : ''}{position.pnlPercent?.toFixed(2)}%
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right text-gray-600 text-sm">
                                {position.closeDate && new Date(position.closeDate).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Calendar View */}
                {futuresTab === 'calendar' && (
                  <div className="p-6">
                    <TradingCalendar
                      type="futures"
                      dailyData={calendarData}
                      currency="₹"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            {/* Risk Widgets - Only show on spot tab */}
            {mainTab === 'spot' && (
              <DashboardRiskWidgets
                totalValue={totalValue}
                totalChange={totalChange}
                totalChangePercent={totalChangePercent}
                holdings={holdings}
              />
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900">Insights</h2>
                <Link to="/insights" className="text-sm text-blue-600 hover:text-blue-700">
                  View all
                </Link>
              </div>

              <div className="space-y-4">
                {mainTab === 'spot' && largestHolding > 50 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 mb-1">Concentration risk</div>
                        <p className="text-sm text-gray-600">
                          {largestHolding.toFixed(0)}% of your portfolio is in one coin. Consider diversifying.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {mainTab === 'futures' && openPositions.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 mb-1">Open positions</div>
                        <p className="text-sm text-gray-600">
                          You have {openPositions.length} open futures position{openPositions.length !== 1 ? 's' : ''}. Monitor your risk levels.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 mb-1">Volatility alert</div>
                      <p className="text-sm text-gray-600">
                        Your top holdings are highly volatile. Review position sizing.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 mb-1">Tax reminder</div>
                      <p className="text-sm text-gray-600">
                        You have unrealised gains this year. Review before selling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* India Tax Banner */}
            <IndiaTaxPreview />
          </div>
        </div>
      </div>

      {/* Add/Edit Holding Modal */}
      {isAddModalOpen && (
        <AddHoldingModal
          holding={editingHolding}
          onClose={handleCloseModal}
        />
      )}

      {/* Add/Edit Futures Modal */}
      {isFuturesModalOpen && (
        <AddFuturesModal
          position={editingFutures}
          onClose={handleCloseFuturesModal}
          onSave={(position) => {
            if (editingFutures) {
              setFuturesPositions(futuresPositions.map(p => 
                p.id === position.id ? position : p
              ));
            } else {
              setFuturesPositions([...futuresPositions, { ...position, id: Date.now().toString() }]);
            }
            handleCloseFuturesModal();
          }}
        />
      )}

      {/* Copilot Assistant */}
      <CopilotAssistant />
    </div>
  );
}