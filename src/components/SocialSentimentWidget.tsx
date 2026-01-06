import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SocialSentimentWidgetProps {
  sentiment: 'Bullish' | 'Neutral' | 'Bearish';
  socialVolume: number;
  positivePercent: number;
  negativePercent: number;
}

export default function SocialSentimentWidget({
  sentiment,
  socialVolume,
  positivePercent,
  negativePercent,
}: SocialSentimentWidgetProps) {
  const getSentimentConfig = () => {
    switch (sentiment) {
      case 'Bullish':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: TrendingUp,
        };
      case 'Bearish':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          icon: TrendingDown,
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: Minus,
        };
    }
  };

  const config = getSentimentConfig();
  const SentimentIcon = config.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4">Social Sentiment (24h)</h3>

      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
          <SentimentIcon className={`w-5 h-5 ${config.color}`} />
        </div>
        <div>
          <div className={`text-lg ${config.color}`}>{sentiment}</div>
          <div className="text-sm text-gray-600">Overall market mood</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Social volume</span>
          <span className={socialVolume >= 0 ? 'text-green-600' : 'text-red-600'}>
            {socialVolume >= 0 ? '+' : ''}{socialVolume}%
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Sentiment split</span>
            <span>{positivePercent}% · {negativePercent}%</span>
          </div>
          
          {/* Sentiment bar */}
          <div className="flex h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-600"
              style={{ width: `${positivePercent}%` }}
            />
            <div
              className="bg-red-600"
              style={{ width: `${negativePercent}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Positive</span>
            <span>Negative</span>
          </div>
        </div>
      </div>
    </div>
  );
}
