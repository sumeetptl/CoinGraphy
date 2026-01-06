import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function CopilotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your Markets Copilot. I can help you understand your trades, analyze market data, or explain any metrics. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();

  const getContextualShortcuts = () => {
    const path = location.pathname;
    
    if (path.includes('/markets')) {
      return [
        "Explain today's Fear & Greed",
        "Summarize funding & OI for BTC",
        "What do liquidations mean?",
      ];
    } else if (path.includes('/futures') || path.includes('/journal')) {
      return [
        "Show me my worst day",
        "When do I oversize?",
        "Which pair loses the most?",
      ];
    } else if (path.includes('/trades') || path.includes('/closed')) {
      return [
        "Show me my worst day",
        "When do I oversize?",
        "Which pair loses the most?",
      ];
    } else if (path.includes('/calendar')) {
      return [
        "Show me my worst day",
        "When do I oversize?",
        "Which pair loses the most?",
      ];
    } else if (path.includes('/dashboard')) {
      return [
        "Review my last 10 trades",
        "Explain my win rate and drawdown",
        "How can I improve my execution?",
      ];
    }
    
    return [
      "Explain crypto market basics",
      "What is risk management?",
      "How do I read charts?",
    ];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAssistantResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 500);
  };

  const getAssistantResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('worst day')) {
      return "Your worst trading day was January 8th, 2025, where you had 4 consecutive losses totaling ₹12,450. The main issue was overtrading during volatile market conditions. You took trades on SOL, DOGE, and ADA without proper setup confirmation. Consider reducing trade frequency during high volatility periods.";
    } else if (lowerQuery.includes('oversize')) {
      return "You tend to oversize positions on SOL/USDT and meme coins. Your average position size on SOL is 3.2x your normal risk, which has contributed to 67% of your largest losses. Your risk per trade should ideally be 1-2% of your portfolio. I recommend setting strict position size limits for altcoin trades.";
    } else if (lowerQuery.includes('pair loses') || lowerQuery.includes('which pair')) {
      return "Based on your trading history, DOGE/USDT has been your worst performing pair with a -42% ROI and 31% win rate. You've lost ₹18,230 on DOGE trades over the past 3 months. The main issue appears to be timing entries during hype cycles without proper technical confirmation.";
    } else if (lowerQuery.includes('fear') || lowerQuery.includes('greed')) {
      return "The Fear & Greed Index measures market sentiment from 0 (Extreme Fear) to 100 (Extreme Greed). Currently, the market is showing moderate sentiment. This is calculated using volatility, market momentum, social media trends, and trading volumes. A low score suggests overselling (potential buy opportunity), while a high score indicates overbought conditions (potential sell signal).";
    } else if (lowerQuery.includes('funding')) {
      return "Funding rates show the cost of holding leveraged positions. Positive rates mean longs pay shorts (bullish bias), negative rates mean shorts pay longs (bearish bias). High positive funding suggests overleveraged longs and potential correction. You can see current funding rates in the Derivatives tab on the Markets page.";
    } else if (lowerQuery.includes('win rate') || lowerQuery.includes('drawdown')) {
      return "Your win rate shows the percentage of profitable trades. A 60%+ win rate is generally solid. Max drawdown measures your largest peak-to-trough loss - aim to keep this under 20%. Your current stats suggest you're managing risk well, but consider tightening stop losses on losing trades to reduce average loss size.";
    } else if (lowerQuery.includes('liquidation')) {
      return "Liquidations occur when leveraged positions are forcibly closed because they can't maintain margin requirements. High liquidation volumes indicate high leverage in the market and can cause cascading price moves. The Liquidations tab shows you which coins have the most forced closures, helping you gauge market stress.";
    }
    
    return "I can help you with trade analysis, market explanations, or metric interpretations. Try asking about specific features like 'What is the Fear & Greed Index?' or 'How do I improve my win rate?'";
  };

  const handleShortcutClick = (shortcut: string) => {
    setInputValue(shortcut);
    handleSendMessage();
  };

  const shortcuts = getContextualShortcuts();

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center z-50 group"
          aria-label="Open Copilot"
        >
          <Sparkles className="w-6 h-6" />
          <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Copilot
          </span>
        </button>
      )}

      {/* Assistant Panel */}
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed bottom-0 md:bottom-6 right-0 md:right-6 w-full md:w-96 h-[80vh] md:h-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900">Markets Copilot</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contextual Shortcuts */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="text-xs text-gray-600 mb-2">Quick actions:</div>
              <div className="flex flex-wrap gap-2">
                {shortcuts.map((shortcut, index) => (
                  <button
                    key={index}
                    onClick={() => handleShortcutClick(shortcut)}
                    className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    {shortcut}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about your trades, markets, or metrics..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}