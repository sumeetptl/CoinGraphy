import { useState } from 'react';
import { ChevronDown, ChevronUp, Send, MessageCircle } from 'lucide-react';
import Navigation from './Navigation';

interface FAQ {
  question: string;
  answer: string;
}

const FAQS: FAQ[] = [
  {
    question: 'Is this investment or tax advice?',
    answer: 'No. The Real Crypto G provides educational trade ideas and portfolio tracking tools. This is not personalized investment, financial, or tax advice. Always consult qualified professionals for advice specific to your situation.',
  },
  {
    question: 'How is P&L calculated?',
    answer: 'Profit and Loss (P&L) is calculated as: (Exit Price - Entry Price) × Quantity. For your portfolio, we use current market prices to calculate unrealized P&L. All values are shown in Indian Rupees (₹) for your convenience.',
  },
  {
    question: 'What are the India crypto tax basics?',
    answer: 'In India, crypto gains are taxed at a flat 30% rate under Section 115BBH. Additionally, 1% TDS (Tax Deducted at Source) applies to transactions above ₹10,000 in a financial year. Losses cannot be set off against other income. This is general information only—consult a tax professional for personalized guidance.',
  },
  {
    question: 'How do I add my crypto holdings?',
    answer: 'Go to your Dashboard and click "Add coin". You\'ll enter the coin name, quantity, and optionally your average buy price. We don\'t require exchange API keys—all data is entered manually to protect your privacy.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes! You can cancel your Pro subscription at any time from the Billing page. You\'ll retain access until the end of your current billing period, with no hidden fees or penalties.',
  },
  {
    question: 'What is Risk:Reward (R:R) ratio?',
    answer: 'Risk:Reward ratio measures the potential profit compared to potential loss. For example, 1:2 R:R means you risk ₹1 to potentially make ₹2. We include R:R in every trade signal to help you make informed decisions.',
  },
  {
    question: 'Do you guarantee profits from trade signals?',
    answer: 'No. Trading crypto involves substantial risk, and past performance does not guarantee future results. Our signals are educational ideas based on technical analysis. Always use proper risk management and never invest more than you can afford to lose.',
  },
  {
    question: 'How often are live trades posted?',
    answer: 'We post live trade signals based on market opportunities, typically 2-5 signals per week. Quality over quantity is our approach. You\'ll receive notifications when new trades are posted.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. Your portfolio data is stored locally in your browser. We don\'t collect or share personal trading information with third parties. Your email is used only for account access and notifications.',
  },
  {
    question: 'Can I use this for tax filing?',
    answer: 'Our tools can help you track holdings and calculate basic P&L, but we don\'t provide official tax filing services. You should maintain separate records and consult a tax professional for accurate filing.',
  },
];

export default function Support() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setContactForm({ subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Support & Help</h1>
          <p className="text-gray-600">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === index && (
                  <div className="px-6 pb-4 border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Contact Support</h2>
              <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
            </div>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Message sent!</h3>
              <p className="text-gray-600">
                Thank you for contacting us. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Community Link Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 text-center">
          <h3 className="text-gray-900 mb-2">Join the Community</h3>
          <p className="text-gray-600 mb-6">
            Connect with other traders, share insights, and get real-time updates
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              Telegram Community (Coming Soon)
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
              Discord Server (Coming Soon)
            </button>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">Need immediate help?</p>
          <a
            href="mailto:support@therealcryptog.com"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            support@therealcryptog.com
          </a>
        </div>
      </div>
    </div>
  );
}
