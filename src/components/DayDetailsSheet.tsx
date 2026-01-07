import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { DayData, TradeData } from './TradingCalendar';
import { Link } from 'react-router-dom';

interface DayDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dayData: DayData;
  type: 'futures' | 'trades';
  currency?: string;
}

export default function DayDetailsSheet({
  open,
  onOpenChange,
  dayData,
  type,
  currency = '₹',
}: DayDetailsSheetProps) {
  const dateStr = dayData.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const winRate = dayData.winRate ?? (dayData.tradeList 
    ? (dayData.tradeList.filter(t => t.pnl > 0).length / dayData.tradeList.length) * 100
    : 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Day Details</SheetTitle>
          <SheetDescription>{dateStr}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {dayData.trades === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">No trades on this day</p>
            </div>
          ) : (
            <>
              {/* Summary Stats */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total P&L</span>
                  <span className={`text-lg font-semibold ${dayData.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {dayData.pnl >= 0 ? '+' : ''}{currency}{Math.abs(dayData.pnl).toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Number of Trades</span>
                  <span className="text-lg font-semibold text-gray-900">{dayData.trades}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Win Rate</span>
                  <span className="text-lg font-semibold text-gray-900">{winRate.toFixed(1)}%</span>
                </div>

            {dayData.grossPnL !== undefined && dayData.netPnL !== undefined && (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Gross P&L</span>
                    <span className={`text-sm font-medium ${dayData.grossPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dayData.grossPnL >= 0 ? '+' : ''}{currency}{Math.abs(dayData.grossPnL).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Net P&L</span>
                    <span className={`text-sm font-medium ${dayData.netPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dayData.netPnL >= 0 ? '+' : ''}{currency}{Math.abs(dayData.netPnL).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Futures-specific stats */}
            {type === 'futures' && (
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                {dayData.futuresPnL !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Futures P&L</span>
                    <span className={`text-sm font-medium ${dayData.futuresPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {dayData.futuresPnL >= 0 ? '+' : ''}{currency}{Math.abs(dayData.futuresPnL).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {dayData.tdsEstimate !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">TDS Estimate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {currency}{dayData.tdsEstimate.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                {dayData.futuresTrades !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Futures Trades</span>
                    <span className="text-sm font-medium text-gray-900">{dayData.futuresTrades}</span>
                  </div>
                )}
              </div>
            )}
              </div>

              {/* Trade List */}
              {dayData.tradeList && dayData.tradeList.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Trades</h3>
                  <div className="space-y-2">
                    {dayData.tradeList.map((trade) => (
                      <div
                        key={trade.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-gray-900">{trade.pair}</span>
                              {trade.isFutures && (
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                  Futures
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                                  trade.direction === 'Buy' || trade.direction === 'Long'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {trade.direction === 'Buy' || trade.direction === 'Long' ? (
                                  <TrendingUp className="w-3 h-3" />
                                ) : (
                                  <TrendingDown className="w-3 h-3" />
                                )}
                                {trade.direction}
                              </span>
                              {trade.tags && trade.tags.length > 0 && (
                                <div className="flex items-center gap-1">
                                  {trade.tags.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={`text-sm font-semibold ${trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trade.pnl >= 0 ? '+' : ''}{currency}{Math.abs(trade.pnl).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Link to Full Journal */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to={type === 'futures' ? '/dashboard' : '/trades'}
                  className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>Open full day in Journal table</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

