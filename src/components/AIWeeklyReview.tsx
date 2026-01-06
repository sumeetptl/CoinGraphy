import { Sparkles } from 'lucide-react';

interface AIWeeklyReviewProps {
  weekStart: string;
  weekEnd: string;
}

export default function AIWeeklyReview({ weekStart, weekEnd }: AIWeeklyReviewProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-900 mb-1">AI Weekly Review</h3>
          <p className="text-xs text-gray-600">
            {weekStart} - {weekEnd} • Generated from your trades and notes
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white bg-opacity-60 rounded-lg p-4">
          <p className="text-gray-900 leading-relaxed">
            <strong>Performance Summary:</strong> You executed 15 trades this week with a 73% win rate, 
            generating a net P&L of ₹21,139. Your best day was January 10th with ₹7,390 profit across 
            3 trades. Your discipline improved compared to last week, with better adherence to stop losses.
          </p>
        </div>

        <div className="bg-white bg-opacity-60 rounded-lg p-4">
          <p className="text-gray-900 leading-relaxed">
            <strong>Key Patterns:</strong> You perform best on BTC/USDT and ETH/USDT pairs with an average 
            R:R of 2.1. Breakout setups on the 4H timeframe showed the highest win rate (85%). However, 
            you tend to oversize positions on SOL/USDT, which contributed to your largest loss this week.
          </p>
        </div>

        <div className="bg-white bg-opacity-60 rounded-lg p-4">
          <p className="text-gray-900 leading-relaxed">
            <strong>Recommendations:</strong> Consider reducing position size on altcoin trades by 30%. 
            Your execution is strongest during the 9 AM - 3 PM window. Focus on your proven 4H breakout 
            strategy on major pairs, and avoid trading late evenings when your win rate drops to 40%.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-600">
          This AI-generated analysis is for educational purposes. Always validate insights with your own research.
        </p>
      </div>
    </div>
  );
}
