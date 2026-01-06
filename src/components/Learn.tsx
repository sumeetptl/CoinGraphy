import { Link } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';

const ARTICLES = [
  {
    id: 'india-tax',
    title: 'How crypto is taxed in India',
    description: 'Understand the 30% tax on gains, 1% TDS, and what you need to know for filing.',
    category: 'Tax',
  },
  {
    id: 'spot-vs-futures',
    title: 'Spot vs Futures',
    description: 'Learn the key differences between spot trading and futures contracts.',
    category: 'Trading',
  },
  {
    id: 'avoiding-scams',
    title: 'Avoiding scams',
    description: 'Common crypto scams in India and how to protect yourself from fraud.',
    category: 'Security',
  },
  {
    id: 'tds-impact',
    title: 'Why over‑trading hurts under TDS',
    description: 'How 1% TDS on every trade affects your returns and why frequency matters.',
    category: 'Tax',
  },
  {
    id: 'portfolio-diversification',
    title: 'Portfolio diversification basics',
    description: 'Why you shouldn\'t put all your eggs in one basket and how to spread risk.',
    category: 'Strategy',
  },
  {
    id: 'risk-management',
    title: 'Risk management for beginners',
    description: 'Position sizing, stop losses, and protecting your capital in volatile markets.',
    category: 'Strategy',
  },
  {
    id: 'wallet-security',
    title: 'Securing your crypto wallet',
    description: 'Best practices for keeping your private keys and holdings safe.',
    category: 'Security',
  },
  {
    id: 'reading-charts',
    title: 'Reading price charts',
    description: 'Introduction to candlestick patterns, support/resistance, and basic technical analysis.',
    category: 'Trading',
  },
  {
    id: 'long-term-holding',
    title: 'Long-term holding vs trading',
    description: 'The pros and cons of HODLing versus active trading strategies.',
    category: 'Strategy',
  },
];

const CATEGORIES = ['All', 'Tax', 'Trading', 'Security', 'Strategy'];

export default function Learn() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-3">Learn the basics</h1>
          <p className="text-gray-600 text-lg">
            Short guides for Indian crypto holders
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              to={`/learn/${article.id}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {article.category}
                </span>
              </div>

              <h3 className="text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {article.description}
              </p>

              <div className="flex items-center text-blue-600 text-sm group-hover:gap-2 transition-all">
                <span>Read article</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-sm text-blue-900">
            <strong>Educational content only:</strong> These articles are for learning purposes and do not constitute investment, legal, or tax advice. 
            Always consult qualified professionals for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
