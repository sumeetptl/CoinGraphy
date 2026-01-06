import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import DayDetailCard from './DayDetailCard';
import { generateCalendarData } from '../utils/calendarData';

export interface DayData {
  date: Date;
  pnl: number;
  trades: number;
  winRate?: number;
  grossPnL?: number;
  netPnL?: number;
  tradeList?: TradeData[];
  futuresPnL?: number;
  tdsEstimate?: number;
  futuresTrades?: number;
}

export interface TradeData {
  id: string;
  pair: string;
  direction: 'Buy' | 'Sell' | 'Long' | 'Short';
  pnl: number;
  tags?: string[];
  isFutures?: boolean;
}

interface TradingCalendarProps {
  type: 'futures' | 'trades';
  dailyData?: DayData[]; // Optional - if not provided, will generate dummy data
  currency?: string;
  onDayClick?: (day: DayData) => void;
  filters?: {
    pair?: string;
    strategy?: string;
    tradeType?: 'own' | 'copied' | 'all';
    marketType?: 'futures' | 'spot' | 'all';
  };
  onFiltersChange?: (filters: TradingCalendarProps['filters']) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function TradingCalendar({
  type,
  dailyData,
  currency = '₹',
  onDayClick,
  filters,
  onFiltersChange,
}: TradingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate calendar data for the currently viewed month if not provided
  const calendarDataForMonth = useMemo(() => {
    if (dailyData && dailyData.length > 0) {
      // Filter data for the current month being viewed
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      return dailyData.filter(day => {
        const dayYear = day.date.getFullYear();
        const dayMonth = day.date.getMonth();
        return dayYear === year && dayMonth === month;
      });
    } else {
      // Generate dummy data for the current month
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      return generateCalendarData(year, month, type);
    }
  }, [dailyData, currentDate, type]);

  // Get the first day of the month and calculate the calendar grid
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Calculate how many days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;
    
    // Calculate total days in current month
    const daysInMonth = lastDay.getDate();
    
    // Calculate how many days from next month to show (to fill 35 cells)
    const totalCells = 35;
    const daysFromNextMonth = totalCells - daysFromPrevMonth - daysInMonth;
    
    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];
    
    // Add previous month days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Add next month days
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    return days;
  }, [currentDate]);

  // Create a map of date strings to day data for quick lookup
  const dataMap = useMemo(() => {
    const map = new Map<string, DayData>();
    calendarDataForMonth.forEach((day) => {
      const dateKey = day.date.toISOString().split('T')[0];
      map.set(dateKey, day);
    });
    return map;
  }, [calendarDataForMonth]);

  const getDayData = (date: Date): DayData | null => {
    const dateKey = date.toISOString().split('T')[0];
    return dataMap.get(dateKey) || null;
  };

  const handleDayClick = (day: { date: Date; isCurrentMonth: boolean }) => {
    const dayData = getDayData(day.date);
    // Create a DayData object even if there's no data for this day
    const dayDataToShow: DayData = dayData || {
      date: day.date,
      pnl: 0,
      trades: 0,
    };
    setSelectedDay(dayDataToShow);
    if (onDayClick && dayData) {
      onDayClick(dayData);
    }
  };

  const handleCloseCard = () => {
    setSelectedDay(null);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date): boolean => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="w-full">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 text-xl font-semibold">
          {type === 'futures' ? 'Futures' : 'Trades'} Calendar – {monthName}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-200" />
          <span>Winning day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-200" />
          <span>Losing day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border border-gray-200" />
          <span>No trades</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <div className="overflow-x-auto">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 min-w-[700px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-600 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 min-w-[700px]" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
          {calendarDays.map((day, index) => {
            const dayData = getDayData(day.date);
            const isTodayDate = isToday(day.date);
            const pnl = dayData?.pnl || 0;
            const trades = dayData?.trades || 0;
            
            // Determine background color based on P&L
            let bgColor = 'bg-gray-50';
            let borderColor = 'border-gray-200';
            if (trades > 0) {
              if (pnl > 0) {
                bgColor = 'bg-green-50';
                borderColor = 'border-green-200';
              } else if (pnl < 0) {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-200';
              }
            }

            return (
              <Tooltip key={`${day.date.toISOString()}-${index}`}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleDayClick(day)}
                    className={`
                      relative w-full min-h-[80px] md:min-h-[100px] p-2 rounded-lg border-2 transition-all
                      ${day.isCurrentMonth ? 'opacity-100' : 'opacity-40'}
                      ${bgColor} ${borderColor}
                      hover:shadow-md hover:scale-[1.02] cursor-pointer
                      ${isTodayDate ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                    `}
                    style={{ aspectRatio: '1' }}
                  >
                    {/* Date Number */}
                    <div className="text-left text-sm font-medium text-gray-700 mb-1">
                      {day.date.getDate()}
                    </div>

                    {/* P&L */}
                    {dayData && trades > 0 && (
                      <div className={`
                        text-center text-xs md:text-sm font-semibold mb-1
                        ${pnl > 0 ? 'text-green-700' : pnl < 0 ? 'text-red-700' : 'text-gray-700'}
                      `}>
                        {pnl > 0 ? '+' : ''}{currency}{Math.abs(pnl).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    )}

                    {/* Trade Count */}
                    {dayData && trades > 0 && (
                      <div className="text-xs text-gray-600 text-left">
                        Trades: {trades}
                      </div>
                    )}
                  </button>
                </TooltipTrigger>
                {dayData && trades > 0 && (
                  <TooltipContent>
                    <div className="text-xs space-y-1">
                      <div className="font-semibold">
                        {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div>
                        P&L: {pnl > 0 ? '+' : ''}{currency}{Math.abs(pnl).toLocaleString('en-IN')}
                      </div>
                      <div>Trades: {trades}</div>
                      {dayData.winRate !== undefined && (
                        <div>Win Rate: {dayData.winRate.toFixed(1)}%</div>
                      )}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
          </div>
        </div>
      </div>

      {/* Day Details Card */}
      {selectedDay && (
        <DayDetailCard
          dayData={selectedDay}
          type={type}
          currency={currency}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}

