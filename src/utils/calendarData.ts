import { DayData, TradeData } from '../components/TradingCalendar';

const PAIRS = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'MATIC/USDT', 'ADA/USDT', 'BTC/USDT Perp', 'ETH/USDT Perp'];
const STRATEGIES = ['Breakout', 'Reversal', 'Trend Following', 'Scalping', 'Swing'];
const DIRECTIONS = ['Buy', 'Sell', 'Long', 'Short'] as const;

/**
 * Generate realistic dummy data for a calendar month
 */
export function generateCalendarData(
  year: number,
  month: number,
  type: 'futures' | 'trades'
): DayData[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: DayData[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    
    // Randomly decide if this day has trades (70% chance)
    const hasTrades = Math.random() > 0.3;
    
    if (!hasTrades) {
      data.push({
        date,
        pnl: 0,
        trades: 0,
      });
      continue;
    }

    // Generate number of trades (1-5)
    const numTrades = Math.floor(Math.random() * 5) + 1;
    const tradeList: TradeData[] = [];
    let totalPnL = 0;
    let winningTrades = 0;

    for (let i = 0; i < numTrades; i++) {
      const pair = PAIRS[Math.floor(Math.random() * PAIRS.length)];
      const direction = type === 'futures' 
        ? (Math.random() > 0.5 ? 'Long' : 'Short')
        : (Math.random() > 0.5 ? 'Buy' : 'Sell');
      
      // Generate P&L (more likely to be positive for better UX)
      const isWin = Math.random() > 0.4; // 60% win rate
      const pnl = isWin
        ? Math.random() * 50000 + 1000 // 1k to 50k profit
        : -(Math.random() * 30000 + 500); // -500 to -30k loss

      if (isWin) winningTrades++;

      totalPnL += pnl;

      tradeList.push({
        id: `${date.toISOString()}-${i}`,
        pair,
        direction,
        pnl,
        tags: Math.random() > 0.5 ? [STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)]] : undefined,
        isFutures: type === 'futures' || pair.includes('Perp'),
      });
    }

    const winRate = (winningTrades / numTrades) * 100;
    
    // For futures, add additional fields
    if (type === 'futures') {
      const futuresPnL = totalPnL;
      const tdsEstimate = futuresPnL > 0 ? futuresPnL * 0.01 : 0; // 1% TDS estimate
      
      data.push({
        date,
        pnl: totalPnL,
        trades: numTrades,
        winRate,
        grossPnL: totalPnL * 1.05, // Slightly higher gross
        netPnL: totalPnL * 0.95, // Slightly lower net (after fees)
        tradeList,
        futuresPnL,
        tdsEstimate,
        futuresTrades: numTrades,
      });
    } else {
      data.push({
        date,
        pnl: totalPnL,
        trades: numTrades,
        winRate,
        grossPnL: totalPnL * 1.02,
        netPnL: totalPnL * 0.98,
        tradeList,
      });
    }
  }

  return data;
}

/**
 * Filter calendar data based on filters
 */
export function filterCalendarData(
  data: DayData[],
  filters: {
    pair?: string;
    strategy?: string;
    tradeType?: 'own' | 'copied' | 'all';
    marketType?: 'futures' | 'spot' | 'all';
  }
): DayData[] {
  if (!filters || Object.keys(filters).length === 0) {
    return data;
  }

  return data.map((day) => {
    if (!day.tradeList || day.tradeList.length === 0) {
      return day;
    }

    const filteredTrades = day.tradeList.filter((trade) => {
      // Filter by pair
      if (filters.pair && trade.pair !== filters.pair) {
        return false;
      }

      // Filter by strategy (tags)
      if (filters.strategy && (!trade.tags || !trade.tags.includes(filters.strategy))) {
        return false;
      }

      // Filter by market type
      if (filters.marketType) {
        if (filters.marketType === 'futures' && !trade.isFutures) {
          return false;
        }
        if (filters.marketType === 'spot' && trade.isFutures) {
          return false;
        }
      }

      // Note: tradeType (own vs copied) would need additional data structure
      return true;
    });

    if (filteredTrades.length === 0) {
      return {
        ...day,
        pnl: 0,
        trades: 0,
        tradeList: [],
      };
    }

    const filteredPnL = filteredTrades.reduce((sum, t) => sum + t.pnl, 0);
    const winningTrades = filteredTrades.filter((t) => t.pnl > 0).length;
    const winRate = (winningTrades / filteredTrades.length) * 100;

    return {
      ...day,
      pnl: filteredPnL,
      trades: filteredTrades.length,
      winRate,
      tradeList: filteredTrades,
    };
  });
}

