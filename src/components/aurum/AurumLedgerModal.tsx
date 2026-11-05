import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  CreditCard,
  Building,
  CheckCircle2,
  DollarSign,
  ArrowDownToLine,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { AurumState, AurumLedgerEntry } from '../../types/aurum';

interface AurumLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AurumState;
  onRefreshState: () => void;
}

const NIGERIAN_BANKS = [
  { code: '058', name: 'Guaranty Trust Bank (GTBank)' },
  { code: '011', name: 'First Bank of Nigeria' },
  { code: '033', name: 'United Bank for Africa (UBA)' },
  { code: '044', name: 'Access Bank' },
  { code: '057', name: 'Zenith Bank' },
  { code: '999', name: 'Paystack Test Bank (Immediate Settlement)' }
];

export const AurumLedgerModal: React.FC<AurumLedgerModalProps> = ({
  isOpen,
  onClose,
  state,
  onRefreshState
}) => {
  const { metrics, config } = state;

  const [payoutAmountUsd, setPayoutAmountUsd] = useState('');
  const [bankCode, setBankCode] = useState('058');
  const [accountNumber, setAccountNumber] = useState('0123456789');
  const [accountName, setAccountName] = useState('BAA Autonomous Engineer');
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);
  const [payoutErrorMsg, setPayoutErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const parsedAmount = Number(payoutAmountUsd) || 0;
  const calculatedNgn = Math.round(parsedAmount * config.ngnExchangeRate);

  const handleExecutePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmount <= 0) {
      setPayoutErrorMsg('Please enter a valid payout amount.');
      return;
    }
    if (parsedAmount > metrics.availableWithdrawableUsd) {
      setPayoutErrorMsg(`Requested amount exceeds available balance ($${metrics.availableWithdrawableUsd.toFixed(2)})`);
      return;
    }

    setPayoutErrorMsg(null);
    setPayoutSuccessMsg(null);
    setIsProcessingPayout(true);

    try {
      const res = await fetch('/api/aurum/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUsd: parsedAmount,
          bankCode,
          accountNumber,
          accountName,
          recipientEmail: config.adminEmail
        })
      });
      const data = await res.json();
      if (data.success) {
        setPayoutSuccessMsg(data.message);
        setPayoutAmountUsd('');
        onRefreshState();
      } else {
        setPayoutErrorMsg(data.error || 'Payout processing failed');
      }
    } catch (err: any) {
      setPayoutErrorMsg(err.message || 'Payout request failed');
    } finally {
      setIsProcessingPayout(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl p-6 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Earnings Pulse & Paystack Direct Withdrawal</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  70/30 Split Enforced
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Transparent revenue ledger verified across on-chain transactions and Paystack Test Gateway.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Two-Column Layout */}
        <div className="my-4 overflow-y-auto space-y-6 pr-1 flex-1">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30">
              <div className="text-[11px] text-slate-400 font-medium">Available Withdrawable</div>
              <div className="text-xl font-black text-amber-300 mt-0.5">
                ${metrics.availableWithdrawableUsd.toFixed(2)} USD
              </div>
              <div className="text-xs text-amber-400/80 font-medium mt-0.5">
                ≈ ₦{metrics.availableWithdrawableNgn.toLocaleString()} NGN
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Client Net Earnings (70%)</div>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">
                ${metrics.clientNetEarningsUsd.toFixed(2)} USD
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Total Withdrawn: ${metrics.totalWithdrawnUsd.toFixed(2)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Platform Infrastructure (30%)</div>
              <div className="text-xl font-bold text-slate-200 mt-0.5">
                ${metrics.platformNetEarningsUsd.toFixed(2)} USD
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Gross: ${metrics.totalGrossRecoveredUsd.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Paystack Withdrawal Console */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-emerald-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  Paystack Direct Bank Payout Console
                </h4>
                <p className="text-xs text-slate-400">
                  Instant NGN settlement to any Nigerian commercial bank account.
                </p>
              </div>
              <div className="text-xs bg-slate-900 px-3 py-1 rounded-full border border-slate-800 text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Mode: <span className="font-bold text-emerald-400">TEST (pk_test)</span>
              </div>
            </div>

            <form onSubmit={handleExecutePayout} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Withdrawal Amount ($ USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="10"
                    placeholder="e.g. 500"
                    value={payoutAmountUsd}
                    onChange={(e) => setPayoutAmountUsd(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  {parsedAmount > 0 && (
                    <span className="absolute right-2 top-2 text-[10px] text-emerald-400 font-mono">
                      ≈ ₦{calculatedNgn.toLocaleString()} NGN
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Select Bank</label>
                <select
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {NIGERIAN_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">
                  Account Number (NUBAN)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isProcessingPayout || parsedAmount <= 0}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  {isProcessingPayout ? 'Verifying Webhook...' : 'Process Bank Payout'}
                </button>
              </div>
            </form>

            {/* Test card info notice */}
            <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                Test Card Mode: <span className="font-mono text-slate-200">4084084084084081</span> · Webhook auto-verifies 200 OK
              </span>
            </div>

            {payoutSuccessMsg && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{payoutSuccessMsg}</span>
              </div>
            )}

            {payoutErrorMsg && (
              <div className="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{payoutErrorMsg}</span>
              </div>
            )}
          </div>

          {/* Ledger History Table */}
          <div>
            <h4 className="text-sm font-bold text-white mb-2">Historical Settlement Ledger</h4>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Gross USD</th>
                    <th className="p-3">Client Share (70%)</th>
                    <th className="p-3">NGN Settlement</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-950/40 font-mono">
                  {state.ledger.map((entry) => (
                    <tr key={entry.id} className="hover:bg-slate-900/50">
                      <td className="p-3 text-slate-300 font-bold">{entry.txRef}</td>
                      <td className="p-3 font-sans text-slate-200 max-w-xs truncate">{entry.description}</td>
                      <td className="p-3 text-white font-bold">${entry.grossUsd.toFixed(2)}</td>
                      <td className="p-3 text-emerald-400 font-bold">${entry.clientShareUsd.toFixed(2)}</td>
                      <td className="p-3 text-amber-300">₦{entry.clientShareNgn.toLocaleString()}</td>
                      <td className="p-3 font-sans text-[10px] text-slate-400">{entry.paymentMethod}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>DATA_DIR: /data · Paystack Webhook Verified</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
