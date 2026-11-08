import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  CheckCircle2,
  ArrowDownLeft,
  DollarSign,
  RefreshCw,
  ExternalLink,
  Lock,
  Building2,
  Wallet
} from 'lucide-react';
import { RoyaltyLedgerTransaction } from '../../types/mindHiveV20';

interface RoyaltyLedgerSectionProps {
  transactions: RoyaltyLedgerTransaction[];
  totalEarningsUsd: number;
  totalEarningsNgn: number;
  creatorEarningsUsd: number;
  creatorEarningsNgn: number;
  onInitiatePayout: (payoutData: any) => Promise<any>;
}

export const RoyaltyLedgerSection: React.FC<RoyaltyLedgerSectionProps> = ({
  transactions,
  totalEarningsUsd,
  totalEarningsNgn,
  creatorEarningsUsd,
  creatorEarningsNgn,
  onInitiatePayout
}) => {
  const [showPayoutModal, setShowPayoutModal] = useState<boolean>(false);
  const [payoutAmountNgn, setPayoutAmountNgn] = useState<number>(300000);
  const [bankName, setBankName] = useState<string>('Wema Bank');
  const [accountNumber, setAccountNumber] = useState<string>('0123456789');
  const [accountName, setAccountName] = useState<string>('Dr. Damilola Adebayo');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [payoutResult, setPayoutResult] = useState<string | null>(null);

  const handlePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPayoutResult(null);

    try {
      const res = await onInitiatePayout({
        amountNgn: payoutAmountNgn,
        bankName,
        accountNumber,
        accountName
      });
      setPayoutResult(res?.message || `Payout of ₦${payoutAmountNgn.toLocaleString()} dispatched!`);
      setTimeout(() => {
        setShowPayoutModal(false);
        setPayoutResult(null);
      }, 3500);
    } catch (err) {
      console.error(err);
      alert('Payout failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: 70/30 Architecture */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Coins className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                70/30 ROYALTY ENGINE • PAYSTACK SETTLED
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-heading font-black text-white">
              Transparent Creator Royalties &amp; Bank Settlement
            </h2>

            <p className="text-xs text-zinc-300 font-sans max-w-2xl leading-relaxed">
              Every knowledge asset sale, living ebook subscription, and AI model training license automatically executes a strict 70% net payment directly to the author, with 30% reinvested into distributed GPU compute and network infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPayoutModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-mono font-bold text-xs uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Withdraw to Bank via Paystack</span>
            </button>
          </div>
        </div>

        {/* 4 Financial Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Total Gross Inflow</span>
            <div className="text-xl sm:text-2xl font-black text-white">
              ${totalEarningsUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-400 block">₦{totalEarningsNgn.toLocaleString()} NGN</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/30 space-y-1">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">Creator 70% Share</span>
            <div className="text-xl sm:text-2xl font-black text-amber-300">
              ${creatorEarningsUsd.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 block font-semibold">
              ₦{creatorEarningsNgn.toLocaleString()} NGN
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Platform 30% GPU Pool</span>
            <div className="text-xl sm:text-2xl font-black text-zinc-300">
              ${(totalEarningsUsd * 0.3).toLocaleString()}
            </div>
            <span className="text-[10px] text-zinc-500 block">
              ₦{(totalEarningsNgn * 0.3).toLocaleString()} NGN
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-400 uppercase block font-bold">Peg / Exchange Rate</span>
            <div className="text-xl sm:text-2xl font-black text-[#00FF88]">
              ₦1,500 = $1.00
            </div>
            <span className="text-[10px] text-emerald-400 block">Paystack Verified</span>
          </div>
        </div>
      </div>

      {/* Transactions Ledger Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-white font-heading">
            CRYPTOGRAPHIC USAGE &amp; ROYALTY LEDGER
          </h3>
          <span className="text-xs font-mono text-zinc-500">Live Dual-Currency Ledger</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-800/80">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Asset &amp; License</th>
                <th className="py-3 px-4">Buyer Entity</th>
                <th className="py-3 px-4">Gross Inflow</th>
                <th className="py-3 px-4 text-amber-300">Creator 70% Share</th>
                <th className="py-3 px-4">Paystack Ref</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 text-zinc-300">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-900/40 transition">
                  <td className="py-3.5 px-4 text-zinc-400">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white font-sans text-xs">{tx.assetTitle}</div>
                    <div className="text-[10px] text-zinc-500">{tx.licenseType}</div>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300 font-sans">{tx.buyerName}</td>
                  <td className="py-3.5 px-4 font-bold text-white">
                    ${tx.grossAmountUsd.toLocaleString()}{' '}
                    <span className="text-[10px] text-zinc-500 block">
                      (₦{tx.grossAmountNgn.toLocaleString()})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-amber-300">
                    +${tx.creatorShareUsd.toLocaleString()}{' '}
                    <span className="text-[10px] text-emerald-400 block font-normal">
                      +₦{tx.creatorShareNgn.toLocaleString()} NGN
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-500 text-[11px]">{tx.paystackRef}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.payoutStatus === 'settled_bank'
                          ? 'bg-emerald-950 text-[#00FF88] border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {tx.payoutStatus === 'settled_bank' ? 'Settled Bank' : 'Escrow Holding'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                  Creator Royalties Bank Payout
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

              {payoutResult ? (
                <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{payoutResult}</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Dispatching Paystack Transfer...</span>
                    </>
                  ) : (
                    <span>Confirm ₦{payoutAmountNgn.toLocaleString()} Payout</span>
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
