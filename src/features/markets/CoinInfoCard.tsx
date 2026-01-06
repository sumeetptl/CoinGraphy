interface CoinInfoCardProps {
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  volume24h: number;
  treasuryHoldings: number | null;
  currency: 'INR' | 'USD';
}

export default function CoinInfoCard({
  marketCap,
  circulatingSupply,
  totalSupply,
  maxSupply,
  volume24h,
  treasuryHoldings,
  currency,
}: CoinInfoCardProps) {
  const formatCurrency = (value: number) => {
    if (currency === 'INR') {
      return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    }
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  const formatSupply = (value: number) => {
    if (value === 0) return 'Unlimited';
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    return value.toLocaleString('en-US');
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-gray-900 mb-4">Market Stats</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-600">Market Cap</span>
          <span className="text-gray-900">{formatCurrency(marketCap)}</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-600">24h Trading Volume</span>
          <span className="text-gray-900">{formatCurrency(volume24h)}</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-600">Circulating Supply</span>
          <span className="text-gray-900">{formatSupply(circulatingSupply)}</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-600">Total Supply</span>
          <span className="text-gray-900">{formatSupply(totalSupply)}</span>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-sm text-gray-600">Max Supply</span>
          <span className="text-gray-900">{formatSupply(maxSupply)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Treasury Holdings</span>
          <span className="text-gray-900">
            {treasuryHoldings !== null ? formatCurrency(treasuryHoldings) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}
