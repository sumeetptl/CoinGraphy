import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from './Navigation';

const ARTICLE_CONTENT: { [key: string]: { title: string; content: string[] } } = {
  'india-tax': {
    title: 'How crypto is taxed in India',
    content: [
      'Cryptocurrency taxation in India has specific rules that every investor should understand.',
      'As of 2022, the Indian government introduced a flat 30% tax on profits from the transfer of virtual digital assets (VDAs), which includes cryptocurrencies. This tax applies to any gains you make when selling, trading, or transferring crypto.',
      'Additionally, there is a 1% Tax Deducted at Source (TDS) on every crypto transaction above ₹10,000 in a financial year. This means when you sell crypto on an Indian exchange, 1% is automatically deducted and sent to the government.',
      'Important points to remember:',
      '• No deductions are allowed except the cost of acquisition',
      '• Losses from crypto cannot be set off against other income',
      '• Gifts of crypto above ₹50,000 are taxable in the hands of the receiver',
      '• You must maintain detailed records of all transactions for tax filing',
      'Always consult a qualified tax professional for advice specific to your situation, as tax laws continue to evolve.',
    ],
  },
  'spot-vs-futures': {
    title: 'Spot vs Futures',
    content: [
      'Understanding the difference between spot and futures trading is crucial for crypto investors.',
      'Spot trading involves buying or selling cryptocurrency for immediate delivery. When you buy Bitcoin in the spot market, you own the actual Bitcoin immediately.',
      'Futures trading involves contracts to buy or sell crypto at a predetermined price on a future date. You don\'t own the underlying asset, but rather a contract.',
      'Key differences:',
      '• Spot: Simple ownership, suitable for beginners and long-term holders',
      '• Futures: Leveraged positions, higher risk and complexity',
      '• Spot: Limited to your capital',
      '• Futures: Can trade with leverage (borrow money), amplifying both gains and losses',
      'For most Indian retail investors, especially beginners, spot trading is recommended. Futures can lead to significant losses if not understood properly.',
      'Remember: leverage magnifies both profits AND losses. Many traders have lost their entire capital through leveraged futures trading.',
    ],
  },
  'avoiding-scams': {
    title: 'Avoiding scams',
    content: [
      'The crypto space in India has seen its share of scams. Here\'s how to protect yourself.',
      'Common scam types:',
      '• Ponzi schemes: Promises of guaranteed high returns (like 10% monthly). If it sounds too good to be true, it probably is.',
      '• Fake exchanges: Websites that look legitimate but steal your funds when you deposit.',
      '• Phishing attacks: Fake emails or messages pretending to be from exchanges.',
      '• Pump and dump groups: Telegram groups promising "insider tips" that manipulate prices.',
      'Protection measures:',
      '• Only use well-known, regulated Indian exchanges (WazirX, CoinDCX, etc.)',
      '• Never share your private keys or seed phrases with anyone',
      '• Enable two-factor authentication (2FA) on all accounts',
      '• Verify URLs carefully before logging in',
      '• Be skeptical of unsolicited investment advice',
      '• Never invest based on Telegram or WhatsApp group tips',
      'If an opportunity requires recruiting others to make money, it\'s likely a pyramid scheme. Stay away.',
    ],
  },
  'tds-impact': {
    title: 'Why over‑trading hurts under TDS',
    content: [
      'The 1% TDS on crypto transactions in India significantly impacts frequent traders.',
      'Here\'s how TDS affects your returns:',
      'If you trade ₹1,00,000 worth of crypto, ₹1,000 is deducted as TDS. If you make 10 such trades in a month, that\'s ₹10,000 deducted, even if you made zero profit overall.',
      'The TDS is not a final tax—you can claim it back when filing returns. However, it locks up your capital until then, reducing your trading power.',
      'Example scenario:',
      '• Starting capital: ₹1,00,000',
      '• After 50 trades: ~₹50,000 deducted as TDS',
      '• Available for trading: Only ₹50,000',
      'This "capital drag" makes frequent trading far less profitable than long-term holding for most retail investors.',
      'Strategy recommendations:',
      '• Reduce trading frequency—buy and hold instead',
      '• Make larger, more considered trades rather than many small ones',
      '• Keep detailed records to claim TDS refunds during tax filing',
      'For most people, the optimal strategy in India\'s current tax environment is to invest with a long-term perspective rather than day trading.',
    ],
  },
};

export default function LearnDetail() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articleId ? ARTICLE_CONTENT[articleId] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-gray-600 mb-4">Article not found</p>
          <Link to="/learn" className="text-blue-600 hover:text-blue-700">
            ← Back to Learn
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          to="/learn"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Learn
        </Link>

        {/* Article */}
        <article className="bg-white rounded-xl border border-gray-200 p-8 md:p-12">
          <h1 className="text-gray-900 mb-8">{article.title}</h1>

          <div className="prose prose-gray max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Disclaimer:</strong> This article is for educational purposes only and does not constitute professional financial, legal, or tax advice. 
                Always consult qualified professionals for guidance specific to your situation.
              </p>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/learn"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            Browse more articles
          </Link>
        </div>
      </div>
    </div>
  );
}
