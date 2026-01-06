import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Lock } from 'lucide-react';
import Navigation from './Navigation';
import { useApp } from '../App';

export default function Payments() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, setUser } = useApp();
  const navigate = useNavigate();

  const handleContinueToPayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      if (user) {
        setUser({ ...user, isSubscribed: true });
      }
      setIsProcessing(false);
      navigate('/trades');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/trades"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Trades
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-3">Unlock live trades</h1>
          <p className="text-gray-600 text-lg">
            Get live entries, exits, and updates for your crypto portfolio.
          </p>
        </div>

        {/* Pricing Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-xl border-2 border-blue-600 shadow-lg overflow-hidden">
            {/* Popular Badge */}
            <div className="bg-blue-600 text-white text-center py-2 text-sm">
              Most Popular
            </div>

            <div className="p-8">
              <h2 className="text-gray-900 mb-2">Pro Subscription</h2>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl text-gray-900">₹999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Cancel anytime. No hidden fees.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Access all live trades & signals</div>
                    <p className="text-sm text-gray-600">
                      Real-time entries, stop losses, and take profit levels
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Full trade history and stats</div>
                    <p className="text-sm text-gray-600">
                      Track performance and learn from past trades
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Priority updates on key market moves</div>
                    <p className="text-sm text-gray-600">
                      Stay informed with timely alerts and analysis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Risk-managed position sizing</div>
                    <p className="text-sm text-gray-600">
                      Clear stop loss and take profit levels for every trade
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1">Built for Indian traders</div>
                    <p className="text-sm text-gray-600">
                      Prices in ₹, tax considerations, and local market insights
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinueToPayment}
                disabled={isProcessing}
                className={`w-full px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Continue to payment
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Payment Form Placeholder */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-gray-600" />
              <h3 className="text-gray-900">Secure payment</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Payment gateway integration</p>
                <p className="text-sm text-gray-500">
                  Stripe or Razorpay integration will be added here
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="text-gray-400">
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="currentColor">
                    <rect width="40" height="24" rx="4" fill="#f3f4f6"/>
                    <text x="20" y="16" textAnchor="middle" fontSize="8" fill="#6b7280">VISA</text>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <svg className="w-10 h-6" viewBox="0 0 40 24" fill="currentColor">
                    <rect width="40" height="24" rx="4" fill="#f3f4f6"/>
                    <circle cx="15" cy="12" r="6" fill="#eb001b" opacity="0.5"/>
                    <circle cx="25" cy="12" r="6" fill="#f79e1b" opacity="0.5"/>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <svg className="w-10 h-6" viewBox="0 0 40 24">
                    <rect width="40" height="24" rx="4" fill="#f3f4f6"/>
                    <text x="20" y="16" textAnchor="middle" fontSize="6" fill="#6b7280">UPI</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-md mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-900 text-center">
              <strong>Important:</strong> This subscription provides educational trade ideas and analysis only. 
              It is not investment or tax advice. Trade at your own risk.
            </p>
          </div>

          <div className="text-center mt-6">
            <Link to="/trades" className="text-sm text-gray-600 hover:text-gray-900">
              Maybe later
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-md mx-auto mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">Secure payments</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Cancel anytime</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">No hidden fees</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
