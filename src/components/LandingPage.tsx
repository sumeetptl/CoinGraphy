import { Link } from 'react-router-dom';
import { TrendingUp, Shield, FileText, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-gray-900">The Real Crypto G</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-gray-900 mb-6">
                See your entire crypto portfolio, risk, and India tax impact in one clean dashboard.
              </h1>
              
              <p className="text-gray-600 mb-8 text-lg">
                Built for Indian crypto holders who want clarity, not hype.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get early access
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  See demo screenshots
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-600 text-sm">Your portfolio</span>
                  <span className="text-xs text-gray-500">Last 24h</span>
                </div>
                <div className="mb-2">
                  <div className="text-3xl text-gray-900 mb-1">₹4,32,840</div>
                  <div className="text-green-600 text-sm">+₹12,450 (2.97%)</div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-xs">₿</div>
                      <div>
                        <div className="text-sm text-gray-900">Bitcoin</div>
                        <div className="text-xs text-gray-500">0.025 BTC</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900">₹2,15,320</div>
                      <div className="text-xs text-green-600">+3.2%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs">Ξ</div>
                      <div>
                        <div className="text-sm text-gray-900">Ethereum</div>
                        <div className="text-xs text-gray-500">1.5 ETH</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900">₹1,85,120</div>
                      <div className="text-xs text-green-600">+2.1%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Outcome Strip */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-lg mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <div className="text-gray-500 mb-2">Scattered holdings</div>
              <ArrowRight className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-900">One portfolio view</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-gray-500 mb-2">No idea of risk</div>
              <ArrowRight className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-900">Clear risk score</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-lg mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-gray-500 mb-2">Tax confusion</div>
              <ArrowRight className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-gray-900">Simple India tax summary</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-600">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg mb-4">
                  1
                </div>
                <h3 className="text-gray-900 mb-2">Add your coins</h3>
                <p className="text-gray-600">
                  Manually add your holdings. No exchange keys needed—your privacy matters.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg mb-4">
                  2
                </div>
                <h3 className="text-gray-900 mb-2">Get instant portfolio view</h3>
                <p className="text-gray-600">
                  See your total value, allocation, and personalized risk score instantly.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg mb-4">
                  3
                </div>
                <h3 className="text-gray-900 mb-2">Simple India tax insights</h3>
                <p className="text-gray-600">
                  Get clear summaries of your tax implications and actionable next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder / Trust Section */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
              RG
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                Built by an Indian full‑stack developer who previously ran Real Crypto G signals for paying subscribers. 
                This tool brings the same clarity and no‑hype approach to portfolio management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture Footer */}
      <section className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-gray-900 mb-4">Join the first 100 users</h2>
          <p className="text-gray-600 mb-8">
            Get early access and help shape the future of The Real Crypto G
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Get invite
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span>Thank you! We'll be in touch soon.</span>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span>The Real Crypto G</span>
            </div>
            <div>
              <p>Not investment or tax advice. For educational purposes only.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
