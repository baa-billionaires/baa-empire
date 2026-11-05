import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Shield,
  TrendingUp,
  DollarSign,
  Download,
  ExternalLink,
  Layers
} from 'lucide-react';
import { CeColonyState } from '../../types/ceColony';

interface CeLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CeColonyState | null;
  onRefresh: () => void;
}

export const CeLedgerModal: React.FC<CeLedgerModalProps> = ({
  isOpen,
  onClose,
  state,
  onRefresh
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState('250');
  const [payoutMethod, setPayoutMethod] = useState<'paystack_bank' | 'baacoin_wallet' | 'crypto_usdt'>('paystack_bank');
  const [bankName, setBankName] = useState('Access Bank Plc');
  const [accountNumber, setAccountNumber] = useState('0123456789');
  const [accountName, setAccountName] = useState('Adeyemi Computer Works');
  const [submitting, setSubmitting] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const pendingUsd = state?.ledger.currentPendingBalanceUsd ?? 3715.0;
  const pendingNgn = state?.ledger.currentPendingBalanceNgn ?? 5572500;
  const grossRev = state?.ledger.totalGrossRevenueUsd ?? 18450.0;
  const engEarnings = state?.ledger.totalEngineerEarningsUsd ?? 12915.0;
  const platformShare = state?.ledger.totalPlatformShareUsd ?? 5535.0;
  const entries = state?.ledger.entries ?? [];

  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setPayoutSuccess(null);

    const amount = Number(withdrawAmount);
    if (!amount || amount <= 0 || amount > pendingUsd) {
      alert(`Invalid amount. You have $${pendingUsd.toFixed(2)} USD withdrawable.`);
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/ce-colony/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUsd: amount,
          payoutMethod: payoutMethod === 'paystack_bank' ? `Paystack Bank (${bankName} - ${accountNumber})` : 'BaaCoin Wallet Base L2',
          destinationAccount: `${accountName} (${accountNumber})`
        })
      });

      const data = await res.json();
      if (data.success) {
        setPayoutSuccess(data.message);
        onRefresh();
      } else {
        alert(data.error || 'Payout failed');
      }
    } catch (err) {
      console.error('Payout error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-orange-500/40 bg-[#070B16] text-slate-100 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded border border-orange-500/30">
                  FINANCIAL LEDGER & PAYOUT
                </span>
                <span className="text-[10px] font-mono text-[#FFD700] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  PAYSTACK TEST MODE
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                Engineer Earnings & Settlement Console
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 70/30 Revenue Split Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-black/70 border border-zinc-800 rounded-2xl p-4 space-y-1">
            <div className="text-zinc-500">TOTAL GROSS REVENUE</div>
            <div className="text-2xl font-black font-heading text-white">${grossRev.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-[10px] text-zinc-400">100% Verified Commercial Workloads</div>
          </div>

          <div className="bg-black/70 border border-orange-500/40 rounded-2xl p-4 space-y-1">
            <div className="text-orange-400 font-bold">ENGINEER NET EARNINGS (70%)</div>
            <div className="text-2xl font-black font-heading text-[#FFD700]">${engEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-[10px] text-zinc-400">Direct to Technician Wallets</div>
          </div>

          <div className="bg-black/70 border border-zinc-800 rounded-2xl p-4 space-y-1">
            <div className="text-zinc-500">PLATFORM TREASURY (30%)</div>
            <div className="text-2xl font-black font-heading text-zinc-300">${platformShare.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div className="text-[10px] text-zinc-400">R&D, Escrow Insurance & Nodes</div>
          </div>
        </div>

        {/* Available for Withdrawal & Paystack Form */}
        <div className="p-5 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-black border border-orange-500/30 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div>
              <div className="text-xs font-mono text-zinc-400">AVAILABLE WITHDRAWABLE BALANCE</div>
              <div className="text-3xl font-black font-heading text-emerald-400">
                ${pendingUsd.toFixed(2)} USD <span className="text-lg text-emerald-300 font-normal">≈ ₦{pendingNgn.toLocaleString()} NGN</span>
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-400 text-right">
              <div>Conversion Rate: $1 USD = ₦1,500 NGN</div>
              <div className="text-emerald-400 font-bold">Instant Paystack Ramp Active</div>
            </div>
          </div>

          {payoutSuccess && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{payoutSuccess}</span>
            </div>
          )}

          <form onSubmit={handleRequestPayout} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-zinc-400 block mb-1">WITHDRAWAL AMOUNT ($ USD)</label>
                <input
                  type="number"
                  min="5"
                  max={pendingUsd}
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">PAYOUT DESTINATION</label>
                <select
                  value={payoutMethod}
                  onChange={e => setPayoutMethod(e.target.value as any)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="paystack_bank">Paystack Direct Bank Transfer (NGN)</option>
                  <option value="baacoin_wallet">BaaCoin Sovereign Vault (Base L2)</option>
                  <option value="crypto_usdt">USDT Stablecoin (Polygon/Base)</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">BANK NAME</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={e => setBankName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-400 block mb-1">ACCOUNT NUMBER</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-zinc-400 block mb-1">ACCOUNT HOLDER NAME</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={e => setAccountName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-zinc-500">
                Rule: Webhook verifies at <code className="text-amber-300">/api/webhooks/paystack</code> (HTTP 200 OK). Test Card: 4084084084084081.
              </div>
              <button
                type="submit"
                disabled={submitting || Number(withdrawAmount) > pendingUsd}
                className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-black flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
              >
                <ArrowUpRight className="w-4 h-4 text-black" />
                <span>{submitting ? 'Processing Payout...' : `Confirm & Withdraw $${withdrawAmount} USD`}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Append-Only Transactions Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-zinc-400 uppercase tracking-wider">
              Append-Only Cryptographic Earnings Ledger
            </span>
            <span className="text-zinc-500">{entries.length} Settled Transactions</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {entries.length === 0 ? (
              <div className="py-8 text-center text-zinc-600 text-xs font-mono">
                No ledger transactions recorded yet. Run a compute or refinery job to credit earnings.
              </div>
            ) : (
              entries.map(entry => (
                <div
                  key={entry.id}
                  className="p-3 bg-black/60 border border-zinc-800/80 rounded-xl flex items-center justify-between text-xs font-mono hover:border-zinc-700 transition"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-orange-500/15 text-orange-400 border border-orange-500/30">
                        {entry.colonyId.replace('_', ' ')}
                      </span>
                      <span className="text-white font-medium">{entry.title}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Customer: {entry.customer} • Tx: {entry.txHash.substring(0, 12)}...
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`font-bold ${entry.engineerNetUsd >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {entry.engineerNetUsd >= 0 ? `+$${entry.engineerNetUsd.toFixed(2)}` : `-$${Math.abs(entry.engineerNetUsd).toFixed(2)}`} USD
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
