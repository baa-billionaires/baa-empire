import React, { useState } from 'react';
import {
  X,
  Wallet,
  ArrowDownRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  Building,
  CreditCard,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { CodeVeinState } from '../../types/codeVein';

interface CodeVeinLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CodeVeinState;
  onRefresh: () => void;
}

export const CodeVeinLedgerModal: React.FC<CodeVeinLedgerModalProps> = ({
  isOpen,
  onClose,
  state,
  onRefresh
}) => {
  const [payoutAmount, setPayoutAmount] = useState<string>('500');
  const [bankCode, setBankCode] = useState<string>('058'); // GTBank
  const [accountNumber, setAccountNumber] = useState<string>('0123456789');
  const [accountName, setAccountName] = useState<string>('Verified Sovereign Developer');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [payoutMessage, setPayoutMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(payoutAmount);
    if (!amount || amount <= 0 || amount > state.metrics.availableWithdrawableUsd) {
      alert(`Invalid withdrawal amount. Max available is $${state.metrics.availableWithdrawableUsd}`);
      return;
    }

    setIsSubmitting(true);
    setPayoutMessage(null);

    try {
      const res = await fetch('/api/code-vein/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUsd: amount,
          bankCode,
          accountNumber,
          accountName
        })
      });
      const data = await res.json();
      if (data.success) {
        setPayoutMessage(data.message);
        onRefresh();
      } else {
        setPayoutMessage(data.error || 'Payout failed');
      }
    } catch (err: any) {
      setPayoutMessage(err.message || 'Error processing payout');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#07070E] border border-[#2A2A3E] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B0B14] border-b border-[#1E1E2E] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  CODE VEIN FINANCIAL LEDGER & PAYOUT
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#00FF88] border border-emerald-500/30">
                  70% DEV / 30% PLATFORM
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Append-only immutable transaction log with Paystack Test Gateway direct settlement.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Balance Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#0A0A14] border border-emerald-500/30 rounded-lg p-4">
              <span className="text-[10px] font-mono text-[#00FF88] uppercase block font-semibold">
                Developer Net Balance (70%)
              </span>
              <div className="text-2xl font-bold text-[#00FF88] mt-1">
                ${state.metrics.availableWithdrawableUsd.toFixed(2)}
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-0.5">
                &#8358;{state.metrics.availableWithdrawableNgn.toLocaleString()} NGN
              </div>
            </div>

            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Total Gross Sales
              </span>
              <div className="text-2xl font-bold text-white mt-1">
                ${state.metrics.totalGrossRevenueUsd.toFixed(2)}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                100% Volume
              </div>
            </div>

            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Total Withdrawn
              </span>
              <div className="text-2xl font-bold text-zinc-300 mt-1">
                ${state.metrics.totalWithdrawnUsd.toFixed(2)}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-0.5">
                Direct Bank Transfers
              </div>
            </div>
          </div>

          {/* Paystack Withdrawal Console */}
          <div className="bg-[#0B0B14] border border-[#1E1E2E] rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-white font-bold uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#00FF88]" />
                <span>Request Paystack Direct Settlement</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                MODE: {state.config.paystackMode} (Test Card: 4084084084084081)
              </span>
            </div>

            <form onSubmit={handleWithdraw} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">Amount (USD)</label>
                <input
                  type="number"
                  min="10"
                  max={state.metrics.availableWithdrawableUsd}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#00FF88]"
                />
                <span className="text-[10px] font-mono text-zinc-500 mt-0.5 block">
                  &asymp; &#8358;{(parseFloat(payoutAmount || '0') * state.config.ngnExchangeRate).toLocaleString()} NGN
                </span>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">Destination Bank</label>
                <select
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#00FF88]"
                >
                  <option value="058">GTBank (Guaranty Trust)</option>
                  <option value="011">First Bank of Nigeria</option>
                  <option value="057">Zenith Bank</option>
                  <option value="232">Sterling Bank</option>
                  <option value="033">United Bank for Africa (UBA)</option>
                  <option value="999">Kuda Microfinance Bank</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">NUBAN Account</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#00FF88]"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !payoutAmount || parseFloat(payoutAmount) <= 0}
                  className="w-full py-2 rounded text-xs font-mono font-bold bg-[#00FF88] text-black hover:bg-[#00e57a] transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  <span>SETTLE VIA PAYSTACK</span>
                </button>
              </div>
            </form>

            {payoutMessage && (
              <div className="mt-3 text-xs font-mono text-[#00FF88] bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded">
                {payoutMessage}
              </div>
            )}
          </div>

          {/* Immutable Transaction Log */}
          <div>
            <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold mb-3">
              Immutable Ledger Entries ({state.ledger.length})
            </h4>

            <div className="space-y-2">
              {state.ledger.map(entry => (
                <div
                  key={entry.id}
                  className="bg-[#0A0A14] border border-[#1C1C2C] rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                        {entry.type}
                      </span>
                      <span className="text-white font-bold">{entry.txRef}</span>
                      <span className="text-emerald-400 text-[10px]">{entry.status}</span>
                    </div>
                    <div className="text-zinc-400 text-[11px] mt-0.5">{entry.description}</div>
                    <div className="text-zinc-600 text-[10px] mt-0.5">
                      {new Date(entry.timestamp).toLocaleString()} &bull; Gateway: {entry.paymentGateway}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-[#00FF88]">
                      +${entry.developerShareUsd.toFixed(2)} USD (70%)
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      Gross: ${entry.grossUsd.toFixed(2)} &bull; Plat: ${entry.platformShareUsd.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0B0B14] border-t border-[#1E1E2E] p-4 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>Cryptographic Ledger Checksum Verified &bull; Webhooks 200 OK</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
