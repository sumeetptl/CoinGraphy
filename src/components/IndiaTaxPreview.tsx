import { Info } from "lucide-react";

interface IndiaTaxPreviewProps {
  realizedGains: number;
  futuresTds?: number;
}

export default function IndiaTaxPreview({
  realizedGains,
  futuresTds = 0,
}: IndiaTaxPreviewProps) {
  // Handle undefined or null realizedGains
  const safeRealizedGains = realizedGains || 0;
  const estimatedTax = safeRealizedGains * 0.3;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-900">Tax Preview (India)</h3>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
            🇮🇳 India only
          </span>
        </div>
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-400 cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-64 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <p className="mb-2">
              <strong>India Crypto Tax Rules:</strong>
            </p>
            <p className="mb-1">• Gains taxed at flat 30%</p>
            <p className="mb-1">• 1% TDS on futures trades</p>
            <p>• No loss offset allowed</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Realized gains this FY
          </span>
          <span className="text-gray-900">
            ₹
            {safeRealizedGains.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Estimated tax (30%)
          </span>
          <span className="text-red-600">₹{estimatedTax.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}</span>
        </div>

        {futuresTds > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              TDS deducted (futures)
            </span>
            <span className="text-gray-700">₹{futuresTds.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
            })}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          This is for educational purposes only and not tax
          advice. Consult a tax professional for accurate
          filing.
        </p>
      </div>
    </div>
  );
}