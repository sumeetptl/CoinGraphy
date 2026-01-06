import { useMemo } from 'react';
import { ChartDataPoint } from '../../services/marketApi';

interface PriceChartProps {
  data: ChartDataPoint[];
  currency: 'INR' | 'USD';
  isPositive: boolean;
}

export default function PriceChart({ data, currency, isPositive }: PriceChartProps) {
  const { minPrice, maxPrice, points } = useMemo(() => {
    if (data.length === 0) return { minPrice: 0, maxPrice: 0, points: '' };

    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice;

    // Create SVG path
    const width = 100;
    const height = 100;
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d.price - minPrice) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return { minPrice, maxPrice, points };
  }, [data]);

  if (data.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-64"
      >
        {/* Gradient fill */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={isPositive ? '#10b981' : '#ef4444'}
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor={isPositive ? '#10b981' : '#ef4444'}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <polygon
          points={`0,100 ${points} 100,100`}
          fill="url(#chartGradient)"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? '#10b981' : '#ef4444'}
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
