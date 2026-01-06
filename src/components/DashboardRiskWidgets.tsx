import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface DashboardRiskWidgetsProps {
  totalValue: number;
  totalChange: number;
  totalChangePercent: number;
  holdings: any[];
}

export default function DashboardRiskWidgets({
  totalValue,
  totalChange,
  totalChangePercent,
  holdings,
}: DashboardRiskWidgetsProps) {
  const [btcScenario, setBtcScenario] = useState(0); // -20 to +20

  // Calculate BTC exposure
  const btcHolding = holdings.find(h => h.symbol === 'BTC');
  const btcValue = btcHolding ? btcHolding.quantity * btcHolding.currentPrice : 0;
  const btcExposure = totalValue > 0 ? (btcValue / totalValue) * 100 : 0;

  // Calculate portfolio impact from BTC scenario
  const btcImpact = (btcExposure / 100) * btcScenario;
  const portfolioImpact = (totalValue * btcImpact) / 100;

  // Risk vs Return positioning
  const getRiskReturnZone = () => {
    const volatilityScore = holdings.reduce((acc, h) => {
      const coins = ['BTC', 'ETH', 'SOL', 'AVAX'];
      const weight = (h.quantity * h.currentPrice) / totalValue;
      const volatility = coins.includes(h.symbol) ? 1 : 0.5;
      return acc + (weight * volatility);
    }, 0);

    const returnPotential = totalChangePercent;

    if (volatilityScore > 0.7 && returnPotential > 10) return { zone: 'Aggressive', color: 'text-red-600', bg: 'bg-red-100' };
    if (volatilityScore > 0.5 || returnPotential > 5) return { zone: 'Balanced', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { zone: 'Defensive', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const riskZone = getRiskReturnZone();

  return (
    <div className="space-y-6">
      {/* Risk vs Return Widget */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Risk vs Return</h3>
        
        <div className="flex items-center justify-center mb-6">
          {/* Simple 2D representation */}
          <div className="relative w-full h-48 bg-gray-50 rounded-lg border-2 border-gray-200">
            {/* Quadrant labels */}
            <div className="absolute top-2 left-2 text-xs text-gray-500">High Return</div>
            <div className="absolute bottom-2 left-2 text-xs text-gray-500">Low Return</div>
            <div className="absolute top-2 right-2 text-xs text-gray-500">High Risk</div>
            <div className="absolute bottom-2 right-16 text-xs text-gray-500">Low Risk</div>

            {/* Center lines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-300" />

            {/* Zone markers */}
            <div className="absolute top-4 right-4 px-2 py-1 bg-red-100 text-red-600 rounded text-xs">
              Aggressive
            </div>
            <div className="absolute top-1/2 right-1/2 transform translate-x-8 -translate-y-4 px-2 py-1 bg-yellow-100 text-yellow-600 rounded text-xs">
              Balanced
            </div>
            <div className="absolute bottom-4 left-4 px-2 py-1 bg-green-100 text-green-600 rounded text-xs">
              Defensive
            </div>

            {/* User's position */}
            <div
              className={`absolute w-4 h-4 rounded-full ${riskZone.bg} ${riskZone.color} border-2 border-current transform -translate-x-1/2 -translate-y-1/2`}
              style={{
                left: `${50 + (totalChangePercent > 0 ? Math.min(totalChangePercent * 2, 40) : Math.max(totalChangePercent * 2, -40))}%`,
                top: `${50 - (btcExposure > 50 ? 30 : btcExposure > 30 ? 15 : -15)}%`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm text-gray-600 mb-1">Your Portfolio Zone</div>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm ${riskZone.bg} ${riskZone.color}`}>
              {riskZone.zone}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Current Return</div>
            <div className={totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
              {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-4">
          {riskZone.zone === 'Aggressive' && 'Your portfolio has high exposure to volatile assets. Consider diversifying to reduce risk.'}
          {riskZone.zone === 'Balanced' && 'Your portfolio has a balanced mix of risk and reward. Continue monitoring market conditions.'}
          {riskZone.zone === 'Defensive' && 'Your portfolio is conservative with lower volatility. Consider higher-growth assets if comfortable with more risk.'}
        </p>
      </div>

      {/* What-if BTC Scenario Slider */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">BTC Impact Scenario</h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">BTC Price Change</span>
            <span className={`text-sm ${btcScenario === 0 ? 'text-gray-900' : btcScenario > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {btcScenario > 0 ? '+' : ''}{btcScenario}%
            </span>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="-20"
              max="20"
              value={btcScenario}
              onChange={(e) => setBtcScenario(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: btcScenario === 0
                  ? '#e5e7eb'
                  : btcScenario > 0
                  ? `linear-gradient(to right, #e5e7eb 0%, #e5e7eb 50%, #10b981 50%, #10b981 ${50 + (btcScenario / 40) * 100}%)`
                  : `linear-gradient(to right, #ef4444 ${50 + (btcScenario / 40) * 100}%, #ef4444 50%, #e5e7eb 50%, #e5e7eb 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-20%</span>
              <span>0%</span>
              <span>+20%</span>
            </div>
          </div>
        </div>

        {/* Impact Display */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">BTC Exposure</span>
              <span className="text-gray-900">{btcExposure.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Estimated Portfolio Impact</span>
              <div className="text-right">
                <div className={btcImpact >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {btcImpact >= 0 ? '+' : ''}{btcImpact.toFixed(2)}%
                </div>
                <div className={`text-sm ${btcImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {btcImpact >= 0 ? '+' : ''}₹{portfolioImpact.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>

          {/* Concentration Risk Warning */}
          {btcExposure > 40 && (
            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-900">
                <p className="mb-1">
                  <strong>High BTC Concentration</strong>
                </p>
                <p className="text-yellow-700">
                  {btcExposure.toFixed(0)}% of your portfolio is in Bitcoin. 
                  A {Math.abs(btcScenario)}% {btcScenario > 0 ? 'increase' : 'decrease'} in BTC would significantly impact your total value.
                  Consider diversifying to reduce concentration risk.
                </p>
              </div>
            </div>
          )}

          {btcExposure <= 40 && (
            <div className="text-sm text-gray-600 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p>
                Your BTC exposure is {btcExposure.toFixed(0)}%. 
                Move the slider to see how BTC price changes would affect your portfolio value.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
