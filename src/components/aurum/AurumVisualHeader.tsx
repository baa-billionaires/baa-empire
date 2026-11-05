import React from 'react';
import {
  Coins,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  Wallet
} from 'lucide-react';
import { AurumState } from '../../types/aurum';

interface AurumVisualHeaderProps {
  state: AurumState;
  onOpenScanModal: () => void;
  onOpenApprovalModal: () => void;
  onOpenLedgerModal: () => void;
  onOpenRulesModal: () => void;
}

export const AurumVisualHeader: React.FC<AurumVisualHeaderProps> = ({
  state,
  onOpenScanModal,
  onOpenApprovalModal,
  onOpenLedgerModal,
  onOpenRulesModal
}) => {
  const { metrics, config } = state;
  const pendingCount = metrics.pendingApprovalsCount;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0B0F19] via-[#05070E] to-[#020307] border border-amber-500/20 shadow-2xl p-6 md:p-8 mb-8">
      {/* Decorative Gold & Violet Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/15">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Coins className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                UA-AIDC Module 3
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Paystack {config.paystackMode} Mode
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400" />
                Zero Private Keys
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
              AURUM COLONY <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">V13</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              Autonomous Digital Asset Recovery & Commercialization Network · The Digital Asset Refinery
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenScanModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs md:text-sm shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
          >
            <Wallet className="w-4 h-4" />
            Scan Wallet (Read-Only)
          </button>

          <button
            onClick={onOpenApprovalModal}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
              pendingCount > 0
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] animate-pulse'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Approvals Gate
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenLedgerModal}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Ledger & Payout
          </button>

          <button
            onClick={onOpenRulesModal}
            className="px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Charter
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mt-6">
        {/* Metric 1: Available Withdrawable USD */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/25 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Withdrawable Balance</span>
            <span className="text-amber-400 font-bold">70% Net</span>
          </div>
          <div className="text-lg md:text-xl font-black text-amber-300 tracking-tight">
            ${metrics.availableWithdrawableUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-amber-400/80 font-medium mt-0.5">
            ≈ ₦{metrics.availableWithdrawableNgn.toLocaleString()} NGN
          </div>
        </div>

        {/* Metric 2: Gross Recovered USD */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Gross Asset Value</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            ${metrics.totalGrossRecoveredUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Client: ${metrics.clientNetEarningsUsd.toFixed(0)} | Plat: ${metrics.platformNetEarningsUsd.toFixed(0)}
          </div>
        </div>

        {/* Metric 3: Scanned Wallets & Classified Dust */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Dust Classified</span>
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.dustTokensClassified} <span className="text-xs font-normal text-slate-400">Tokens</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Across {metrics.walletsScannedCount} scanned wallets
          </div>
        </div>

        {/* Metric 4: Dormant Contracts Audited */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Dormant Audited</span>
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.dormantTokensAudited} <span className="text-xs font-normal text-slate-400">Contracts</span>
          </div>
          <div className="text-[11px] text-purple-400/80 mt-0.5 font-medium">
            Slither AST Verified
          </div>
        </div>

        {/* Metric 5: Refined NFTs & Rentals */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Refined NFTs</span>
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.nftsRefinedCount} <span className="text-xs font-normal text-slate-400">Items</span>
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5 font-medium">
            ERC-4907 Utility Active
          </div>
        </div>

        {/* Metric 6: Autonomous Agents */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Autonomous Grid</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.activeAgentsCount} / 24 <span className="text-xs font-normal text-slate-400">Agents</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            8 Wealth Colonies Active
          </div>
        </div>
      </div>
    </div>
  );
};
