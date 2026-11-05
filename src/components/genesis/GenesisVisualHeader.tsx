import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Bot,
  Lock,
  Plus,
  Radio,
  FileCode,
  DollarSign
} from 'lucide-react';
import { MindHiveGenesisState } from '../../types/mindHiveGenesis';

interface GenesisVisualHeaderProps {
  state: MindHiveGenesisState;
  onOpenNewVenture: () => void;
  onOpenApprovals: () => void;
  onOpenPayout: () => void;
  onOpenCharter: () => void;
  onOpenSqlSchema: () => void;
}

export const GenesisVisualHeader: React.FC<GenesisVisualHeaderProps> = ({
  state,
  onOpenNewVenture,
  onOpenApprovals,
  onOpenPayout,
  onOpenCharter,
  onOpenSqlSchema
}) => {
  const { metrics, config } = state;
  const pendingCount = metrics.pendingApprovalsCount;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#090D18] via-[#050811] to-[#020409] border border-cyan-500/20 shadow-2xl p-6 md:p-8 mb-8">
      {/* Decorative Cyan, Violet & Emerald Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top Banner Row */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/15">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-400/20 via-cyan-500/10 to-transparent border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                UA-AIDC Module 04
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Paystack {config.paystackMode} Mode
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/60 text-slate-300 border border-slate-700/50 flex items-center gap-1">
                <Lock className="w-3 h-3 text-cyan-400" />
                Evidence-Driven Studio
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
              MIND HIVE GENESIS <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">V17</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              Autonomous Venture Creation, Evolution & Colony Fusion Engine · The Living Invention Civilization
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenNewVenture}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs md:text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all transform active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Venture Wizard
          </button>

          <button
            onClick={onOpenApprovals}
            className={`px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
              pendingCount > 0
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)] animate-pulse'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Stage 7 Gate
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenPayout}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold text-xs md:text-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Ledger & Payout
          </button>

          <button
            onClick={onOpenSqlSchema}
            className="px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition-all cursor-pointer"
            title="View PostgreSQL / Supabase Schema"
          >
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            SQL Schema
          </button>

          <button
            onClick={onOpenCharter}
            className="px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs flex items-center gap-1 transition-all cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            Charter
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3.5 mt-6">
        {/* Metric 1: Withdrawable Balance USD & NGN */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/25 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Withdrawable Balance</span>
            <span className="text-cyan-400 font-bold">70% Net</span>
          </div>
          <div className="text-lg md:text-xl font-black text-cyan-300 tracking-tight">
            ${metrics.availableWithdrawableUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-cyan-400/80 font-medium mt-0.5">
            ≈ ₦{metrics.availableWithdrawableNgn.toLocaleString()} NGN
          </div>
        </div>

        {/* Metric 2: Commercial Gross Revenue */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Commercial Revenue</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            ${metrics.totalGrossCommercialRevenueUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Client: ${metrics.clientNetEarningsUsd.toFixed(0)} | Plat: ${metrics.platformNetEarningsUsd.toFixed(0)}
          </div>
        </div>

        {/* Metric 3: Active Ventures */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Active Ventures</span>
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.totalActiveVentures} <span className="text-xs font-normal text-slate-400">Ventures</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Across 10 lifecycle stages
          </div>
        </div>

        {/* Metric 4: Fusions & Tournaments */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Fusions & Contests</span>
            <Layers className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.totalFusionsActive} / {metrics.totalTournamentsCompleted}
          </div>
          <div className="text-[11px] text-purple-400/80 mt-0.5 font-medium">
            Cross-Colony Combinations
          </div>
        </div>

        {/* Metric 5: Mirrorverse Simulations */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Digital Twins</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.totalSimulationsRun} <span className="text-xs font-normal text-slate-400">Twins</span>
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5 font-medium">
            Stress & Cost Tested
          </div>
        </div>

        {/* Metric 6: Swarm Foundry Specialists */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-[11px] font-medium mb-1">
            <span>Swarm Foundry</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-lg md:text-xl font-bold text-white tracking-tight">
            {metrics.activeSwarmAgentsCount} <span className="text-xs font-normal text-slate-400">Specialists</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Budget-capped & audited
          </div>
        </div>
      </div>
    </div>
  );
};
