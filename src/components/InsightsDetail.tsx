import { useState } from 'react';
import { AlertCircle, Info, TrendingDown, TrendingUp, PieChart } from 'lucide-react';
import Navigation from './Navigation';
import { useApp } from '../App';

type InsightCategory = 'All' | 'Risk' | 'Tax' | 'Performance';

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'Risk' | 'Tax' | 'Performance';
  priority: 'High' | 'Medium' | 'Low';
  icon: 'alert' | 'info' | 'trending-down' | 'trending-up';
}

const MOCK_INSIGHTS: Insight[] = [
  {
    id: '1',
    title: 'Concentration risk',
    description: 'Over 60% of your portfolio is concentrated in one or two coins. This increases your exposure to single-asset volatility. Consider rebalancing to spread risk across more holdings.',
    category: 'Risk',
    priority: 'High',
    icon: 'alert',
  },
  {
    id: '2',
    title: 'High volatility exposure',
    description: 'Your top holdings (BTC, ETH, SOL) are highly volatile assets. Review your position sizing to ensure it aligns with your risk tolerance.',
    category: 'Risk',
    priority: 'Medium',
    icon: 'trending-down',
  },
  {
    id: '3',
    title: 'Unrealised gains alert',
    description: 'You have significant unrealised gains this financial year. Remember that crypto gains in India are taxed at ~30%. Plan your exit strategy accordingly.',
    category: 'Tax',
    priority: 'High',
    icon: 'info',
  },
  {
    id: '4',
    title: 'TDS implications',
    description: 'When selling on Indian exchanges, 1% TDS is deducted at source. Factor this into your trading decisions, especially for frequent trades.',
    category: 'Tax',
    priority: 'Medium',
    icon: 'info',
  },
  {
    id: '5',
    title: 'Portfolio up 15% this quarter',
    description: 'Your portfolio has gained 15% in the last 3 months, outperforming the broader crypto market. Strong performance from ETH and SOL.',
    category: 'Performance',
    priority: 'Low',
    icon: 'trending-up',
  },
  {
    id: '6',
    title: 'Cost basis tracking',
    description: 'Make sure to track your cost basis for each purchase. This is critical for accurate tax reporting when you sell your holdings.',
    category: 'Tax',
    priority: 'Medium',
    icon: 'info',
  },
  {
    id: '7',
    title: 'Diversification opportunity',
    description: 'Consider adding mid-cap coins to your portfolio for better diversification. Current portfolio is heavily weighted toward large-cap assets.',
    category: 'Risk',
    priority: 'Low',
    icon: 'alert',
  },
];

export default function InsightsDetail() {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>('All');
  const { holdings } = useApp();

  const categories: InsightCategory[] = ['All', 'Risk', 'Tax', 'Performance'];

  const filteredInsights = selectedCategory === 'All'
    ? MOCK_INSIGHTS
    : MOCK_INSIGHTS.filter(i => i.category === selectedCategory);

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'alert': return AlertCircle;
      case 'trending-down': return TrendingDown;
      case 'trending-up': return TrendingUp;
      default: return Info;
    }
  };

  const getIconColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-600';
      case 'Medium': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  // Calculate allocation data for chart
  const totalValue = holdings.reduce((sum, h) => sum + h.quantity * h.currentPrice, 0);
  const allocationData = holdings.map(h => ({
    coin: h.symbol,
    percentage: totalValue > 0 ? ((h.quantity * h.currentPrice) / totalValue * 100).toFixed(1) : '0',
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-gray-900 mb-6">Insights</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Insights Cards */}
            <div className="space-y-4">
              {filteredInsights.map((insight) => {
                const Icon = getIconComponent(insight.icon);
                return (
                  <div key={insight.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(insight.priority)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-gray-900">{insight.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            insight.priority === 'High' ? 'bg-red-100 text-red-700' :
                            insight.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {insight.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {insight.description}
                        </p>
                        <div className="mt-3">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {insight.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Allocation Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-gray-600" />
                <h3 className="text-gray-900">Portfolio allocation</h3>
              </div>

              <div className="space-y-3">
                {allocationData.map((item, index) => {
                  const colors = [
                    'bg-blue-600',
                    'bg-purple-600',
                    'bg-orange-600',
                    'bg-green-600',
                    'bg-pink-600',
                  ];
                  return (
                    <div key={item.coin}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-700">{item.coin}</span>
                        <span className="text-gray-900">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${colors[index % colors.length]} h-2 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-4">Insight summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High priority</span>
                  <span className="text-sm text-red-600">
                    {MOCK_INSIGHTS.filter(i => i.priority === 'High').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medium priority</span>
                  <span className="text-sm text-yellow-600">
                    {MOCK_INSIGHTS.filter(i => i.priority === 'Medium').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low priority</span>
                  <span className="text-sm text-gray-600">
                    {MOCK_INSIGHTS.filter(i => i.priority === 'Low').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Tax Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="mb-2">
                    These insights are educational only and not professional tax or investment advice.
                  </p>
                  <p className="text-blue-700">
                    Consult a qualified professional for personalized guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
