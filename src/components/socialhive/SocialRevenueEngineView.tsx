import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Building2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { SocialRevenueChannel } from '../../types/socialHive';

interface SocialRevenueEngineViewProps {
  channels: SocialRevenueChannel[];
  actualSettledUsd: number;
  actualSettledNgn: number;
  pendingUsd: number;
  estimatedUsd: number;
  creatorEarningsUsd: number;
  creatorEarningsNgn: number;
  onInitiatePayout: (payload: any) => Promise<any>;
}

export const SocialRevenueEngineView: React.FC<SocialRevenueEngineViewProps> = ({
  channels,
  actualSettledUsd,
  actualSettledNgn,
  pendingUsd,
  estimatedUsd,
  creatorEarningsUsd,
  creatorEarningsNgn,
  onInitiatePayout
}) => {
  const [showPayoutModal, setShowPayoutModal] = useState<boolean>(false);
  const [payoutAmountNgn, setPayoutAmountNgn] = useState<number>(200000);
  const [accountNumber, setAccountNumber] = useState('0123456789');
  const [accountName, setAccountName] = useState('Engr. Damilola Adebayo');
  const [bankName, setBankName] = useState('Wema Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [payoutMsg, setPayoutMsg] = useState<string | null>(null);

  const handlePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPayoutMsg(null);

    try {
      const res = await onInitiatePayout({
        amountNgn: payoutAmountNgn,
        accountNumber,
        accountName,
        bankName
      });

      setPayoutMsg(res?.message || `Payout of ₦${payoutAmountNgn.toLocaleString()} dispatched!`);
      setTimeout(() => {
        setShowPayoutModal(false);
        setPayoutMsg(null);
      }, 4000);
    } catch (err: any) {
      alert(err.message || 'Payout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Coins className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                12-CHANNEL SOCIAL REVENUE ENGINE
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-heading font-black text-white">
              Actual vs Pending vs Estimated Pipeline
            </h2>

            <p className="text-xs text-zinc-300 font-sans max-w-2xl leading-relaxed">
              Every social link mined, living ebook sold, dataset licensed, and sponsorship deal secured automatically disburses 70% net royalties directly to creators via Paystack bank settlement.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPayoutModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-mono font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Withdraw 70% Royalties to Bank</span>
            </button>
          </div>
        </div>

        {/* 4 Revenue Telemetry Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">1. Actual Settled</span>
            <div className="text-xl sm:text-2xl font-black text-[#00FF88]">
              ${actualSettledUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400 block font-sans">
              ₦{actualSettledNgn.toLocaleString()} NGN
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/30 space-y-1">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">2. Creator 70% Share</span>
            <div className="text-xl sm:text-2xl font-black text-amber-300">
              ${creatorEarningsUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 block font-semibold">
              ₦{creatorEarningsNgn.toLocaleString()} NGN Paid
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">3. Pending Invoices</span>
            <div className="text-xl sm:text-2xl font-bold text-cyan-300">
              ${pendingUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400 block font-sans">
              ₦{(pendingUsd * 1500).toLocaleString()} NGN
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">4. Estimated Pipeline</span>
            <div className="text-xl sm:text-2xl font-bold text-white">
              ${estimatedUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400 block font-sans">
              ₦{(estimatedUsd * 1500).toLocaleString()} NGN
            </span>
          </div>
        </div>
      </div>

      {/* 12 Channels Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Active Commercial Revenue Streams ({channels.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">Live Dual-Currency Attribution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {channels.map((chan) => (
            <div
              key={chan.channelId}
              className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                  {chan.category}
                </span>
                <span className="text-[10px] text-zinc-500">70/30 Verified</span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm font-sans">{chan.name}</h4>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-zinc-400">
                  <span>Actual Settled:</span>
                  <span className="text-[#00FF88] font-bold">${chan.actualSettledUsd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Pending Invoices:</span>
                  <span className="text-cyan-300 font-bold">${chan.pendingInvoicesUsd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Estimated Deals:</span>
                  <span className="text-white font-bold">${chan.estimatedPipelineUsd.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-[11px]">
                <span className="text-amber-400">Creator Net:</span>
                <span className="font-bold text-amber-300">
                  ${chan.creatorShareUsd.toLocaleString()} USD (₦{chan.creatorShareNgn.toLocaleString()} NGN)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Paystack Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownLeft className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-heading">
                  Withdraw Social Royalties (Paystack)
                </h3>
              </div>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs font-mono text-amber-300">
              Paystack Mode: <strong>TEST</strong> · Test Card: <strong>4084084084084081</strong> · 100% Guaranteed 70% Creator Net
            </div>

            <form onSubmit={handlePayout} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Payout Amount (₦ NGN):</label>
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  value={payoutAmountNgn}
                  onChange={(e) => setPayoutAmountNgn(Number(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-bold text-sm focus:border-amber-400 outline-none"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  USD Equivalent: <strong className="text-white">${(payoutAmountNgn / 1500).toFixed(2)} USD</strong>
                </span>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Account Holder Name:</label>
                <input
                  type="text"
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Account Number (10 Digits):</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Bank Name:</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:border-amber-400 outline-none cursor-pointer"
                >
                  <option value="Wema Bank">Wema Bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">GTBank (Guaranty Trust Bank)</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="First Bank">First Bank of Nigeria</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="Kuda Bank">Kuda Microfinance Bank</option>
                  <option value="Opay">OPay Digital Services</option>
                  <option value="Palmpay">PalmPay</option>
                </select>
              </div>

              {payoutMsg ? (
                <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{payoutMsg}</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Dispatching Paystack Transfer API...</span>
                    </>
                  ) : (
                    <span>Confirm ₦{payoutAmountNgn.toLocaleString()} Bank Payout</span>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
