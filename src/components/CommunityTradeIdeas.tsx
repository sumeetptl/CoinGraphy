import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Heart, MessageCircle, BookmarkPlus, Share2, X, Upload, Image as ImageIcon } from 'lucide-react';
import Navigation from './Navigation';
import CopilotAssistant from './CopilotAssistant';

interface TradeIdea {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  pair: string;
  direction: 'Long' | 'Short';
  chartImage: string;
  reasoning: string;
  tags: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const MOCK_TRADE_IDEAS: TradeIdea[] = [
  {
    id: '1',
    user: {
      name: 'Rajesh Kumar',
      avatar: 'RK',
    },
    timestamp: '2 hours ago',
    pair: 'BTC/USDT',
    direction: 'Long',
    chartImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    reasoning: 'Clean breakout above 85k resistance with strong volume. RSI cooling off from overbought, looking for continuation. Target 88k, SL at 84k.',
    tags: ['Breakout', '4H', 'Swing'],
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: '2',
    user: {
      name: 'Priya Sharma',
      avatar: 'PS',
    },
    timestamp: '5 hours ago',
    pair: 'ETH/USDT',
    direction: 'Short',
    chartImage: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800',
    reasoning: 'Double top forming at 3500. Volume declining on second test. Looking for reversal play. Entry 3480, target 3300, tight SL at 3520.',
    tags: ['Reversal', '1H', 'Day Trade'],
    likes: 18,
    comments: 5,
    isLiked: true,
  },
  {
    id: '3',
    user: {
      name: 'Amit Patel',
      avatar: 'AP',
    },
    timestamp: '8 hours ago',
    pair: 'SOL/USDT',
    direction: 'Long',
    chartImage: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
    reasoning: 'Strong support at 250 level holding. Looking for bounce play here. Good R:R with tight stop below 248. Target 265-270 zone.',
    tags: ['Support', '15M', 'Scalp'],
    likes: 31,
    comments: 12,
  },
];

export default function CommunityTradeIdeas() {
  const [ideas, setIdeas] = useState<TradeIdea[]>(MOCK_TRADE_IDEAS);
  const [showNewIdeaModal, setShowNewIdeaModal] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<TradeIdea | null>(null);

  const handleLike = (ideaId: string) => {
    setIdeas(ideas.map(idea => {
      if (idea.id === ideaId) {
        return {
          ...idea,
          isLiked: !idea.isLiked,
          likes: idea.isLiked ? idea.likes - 1 : idea.likes + 1,
        };
      }
      return idea;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-gray-900">Community Trade Ideas</h1>
            <button
              onClick={() => setShowNewIdeaModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New idea
            </button>
          </div>
          <p className="text-gray-600">
            Share and discover trade setups. Not financial advice – for educational discussion only.
          </p>
        </div>

        {/* Trade Ideas Feed */}
        <div className="space-y-4">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-600 transition-colors"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {idea.user.avatar}
                    </div>
                    <div>
                      <div className="text-gray-900">{idea.user.name}</div>
                      <div className="text-sm text-gray-500">{idea.timestamp}</div>
                    </div>
                  </div>
                  <Share2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg text-sm">
                    {idea.pair}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                      idea.direction === 'Long'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {idea.direction === 'Long' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {idea.direction}
                  </span>
                </div>
              </div>

              {/* Chart Image */}
              <div
                className="relative cursor-pointer group"
                onClick={() => setSelectedIdea(idea)}
              >
                <img
                  src={idea.chartImage}
                  alt="Chart"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-3">
                    <ImageIcon className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {idea.reasoning}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {idea.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(idea.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        idea.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${idea.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{idea.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{idea.comments}</span>
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <BookmarkPlus className="w-4 h-4" />
                    Save to journal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-900">
            <strong>Important:</strong> This is NOT copy-trading. Ideas shared here are for educational discussion only. 
            Always do your own research and never risk more than you can afford to lose.
          </p>
        </div>
      </div>

      {/* New Idea Modal */}
      {showNewIdeaModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowNewIdeaModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-gray-900">Share Trade Idea</h2>
              <button
                onClick={() => setShowNewIdeaModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Pair Selection */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Pair</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>BTC/USDT</option>
                  <option>ETH/USDT</option>
                  <option>SOL/USDT</option>
                  <option>BNB/USDT</option>
                </select>
              </div>

              {/* Direction */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Direction</label>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    <TrendingUp className="w-4 h-4" />
                    Long
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                    <TrendingDown className="w-4 h-4" />
                    Short
                  </button>
                </div>
              </div>

              {/* Chart Upload */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Chart Screenshot</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-600 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Reasoning */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Your reasoning</label>
                <textarea
                  rows={4}
                  placeholder="Explain your setup, entry, target, stop loss..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm text-gray-600 mb-2">Tags (optional)</label>
                <input
                  type="text"
                  placeholder="e.g., Breakout, 4H, Swing"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowNewIdeaModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Share idea
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Post Detail Modal */}
      {selectedIdea && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedIdea(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {selectedIdea.user.avatar}
                </div>
                <div>
                  <div className="text-gray-900">{selectedIdea.user.name}</div>
                  <div className="text-sm text-gray-500">{selectedIdea.timestamp}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedIdea(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Pair & Direction */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg">
                  {selectedIdea.pair}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg ${
                    selectedIdea.direction === 'Long'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {selectedIdea.direction === 'Long' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {selectedIdea.direction}
                </span>
              </div>

              {/* Chart Image */}
              <img
                src={selectedIdea.chartImage}
                alt="Chart"
                className="w-full rounded-lg"
              />

              {/* Reasoning */}
              <div>
                <h3 className="text-gray-900 mb-2">Analysis</h3>
                <p className="text-gray-700 leading-relaxed">{selectedIdea.reasoning}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedIdea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-gray-900 mb-4">Comments ({selectedIdea.comments})</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                      SK
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-900">Sanjay Kumar</span>
                        <span className="text-xs text-gray-500">1 hour ago</span>
                      </div>
                      <p className="text-sm text-gray-700">Good setup! I'm also watching this level. What's your target?</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">
                      NK
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-900">Neha Kapoor</span>
                        <span className="text-xs text-gray-500">45 min ago</span>
                      </div>
                      <p className="text-sm text-gray-700">Volume looks good here. Thanks for sharing!</p>
                    </div>
                  </div>
                </div>

                {/* Add Comment */}
                <div className="mt-4 flex gap-3">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Post
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(selectedIdea.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      selectedIdea.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${selectedIdea.isLiked ? 'fill-current' : ''}`} />
                    <span>{selectedIdea.likes}</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <BookmarkPlus className="w-4 h-4" />
                  Log as journal trade
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <CopilotAssistant />
    </div>
  );
}
