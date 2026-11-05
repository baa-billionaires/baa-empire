import React from 'react';
import {
  Cpu,
  Zap,
  Activity,
  ShieldCheck,
  TrendingUp,
  Download,
  Bot,
  CreditCard,
  Layers,
  Sparkles,
  Server,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import { CeColonyState } from '../../types/ceColony';

interface CeColonyVisualHeaderProps {
  state: CeColonyState | null;
  onOpenInstaller: () => void;
  onOpenOrchestrator: () => void;
  onOpenLedger: () => void;
  activeColonyCount: number;
}

export const CeColonyVisualHeader: React.FC<CeColonyVisualHeaderProps> = ({
  state,
  onOpenInstaller,
  onOpenOrchestrator,
  onOpenLedger,
  activeColonyCount
}) => {
  const grossRev = state?.ledger.totalGrossRevenueUsd ?? 18450.0;
  const engEarnings = state?.ledger.totalEngineerEarningsUsd ?? 12915.0;
  const pendingUsd = state?.ledger.currentPendingBalanceUsd ?? 3715.0;
  const pendingNgn = state?.ledger.currentPendingBalanceNgn ?? 5572500;
  const nodesCount = state?.nodes.length ?? 3;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-b from-[#0B132B] via-[#050814] to-black p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Visual Ambient Glows */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-orange-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#FFD700]/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff6b0008_1px,transparent_1px),linear-gradient(to_bottom,#ff6b0008_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top Badges and Division Branding */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-orange-500/20">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/40">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
              CE COLONY V12 · COMPUTER ENGINEERING WEALTH OS
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30">
              70% ENGINEER / 30% NETWORK
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
              PAYSTACK VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Autonomous Grid Online</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300 font-semibold">{nodesCount} Workstations Active</span>
          </div>
        </div>

        {/* Hero Title & Vision Statement */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white flex items-center gap-3">
              <span>Universal CE Colony</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-[#FFD700]">
                V12 Lab
              </span>
            </h1>
            <p className="text-sm sm:text-base font-semibold text-orange-400 font-mono">
              From Computer Repairer to Autonomous Data Infrastructure Entrepreneur.
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Monetize workshop compute, router telemetry, digitized paper records, master repair intuition,
              refurbished hardware, and local private AI appliances. Zero untrusted host execution — 100% sandboxed,
              sovereign wealth.
            </p>
          </div>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenInstaller}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-black hover:opacity-95 shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Connect Shop Node</span>
            </button>

            <button
              onClick={onOpenOrchestrator}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 bg-zinc-900/90 text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 shadow-md cursor-pointer active:scale-95"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span>12-Agent Orchestrator</span>
            </button>

            <button
              onClick={onOpenLedger}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 bg-[#0A192F] text-sky-300 hover:text-white border border-sky-500/40 hover:border-sky-400 shadow-md cursor-pointer active:scale-95"
            >
              <CreditCard className="w-4 h-4 text-sky-400" />
              <span>Financial Ledger & Payout</span>
            </button>
          </div>
        </div>

        {/* Live Telemetry & Revenue KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-zinc-950/70 border border-orange-500/20 rounded-2xl p-4 relative overflow-hidden group hover:border-orange-500/50 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span>Gross Grid Revenue</span>
              <DollarSign className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-heading text-white">
              ${grossRev.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+24.8% vs last cycle</span>
            </div>
          </div>

          <div className="bg-zinc-950/70 border border-amber-500/20 rounded-2xl p-4 relative overflow-hidden group hover:border-amber-500/50 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span>Engineer Net (70%)</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-heading text-[#FFD700]">
              ${engEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] font-mono text-zinc-400 mt-1">
              Direct to Shop Owners
            </div>
          </div>

          <div className="bg-zinc-950/70 border border-emerald-500/20 rounded-2xl p-4 relative overflow-hidden group hover:border-emerald-500/50 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span>Available Withdrawable</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-heading text-emerald-400">
              ${pendingUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] font-mono text-emerald-300 mt-1">
              ≈ ₦{pendingNgn.toLocaleString()} NGN
            </div>
          </div>

          <div className="bg-zinc-950/70 border border-blue-500/20 rounded-2xl p-4 relative overflow-hidden group hover:border-blue-500/50 transition">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-1">
              <span>Colony Divisions</span>
              <Layers className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black font-heading text-white">
              {activeColonyCount} / 12
            </div>
            <div className="text-[11px] font-mono text-sky-400 mt-1">
              Full Multi-Pillar Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
