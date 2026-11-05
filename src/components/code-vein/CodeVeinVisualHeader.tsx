import React from 'react';
import {
  Code2,
  DollarSign,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Bot,
  AlertTriangle,
  Wallet,
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';
import { CodeVeinState } from '../../types/codeVein';

interface CodeVeinVisualHeaderProps {
  state: CodeVeinState;
  onOpenPayout: () => void;
  onOpenAgents: () => void;
  onOpenApprovals: () => void;
  onOpenLedger: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const CodeVeinVisualHeader: React.FC<CodeVeinVisualHeaderProps> = ({
  state,
  onOpenPayout,
  onOpenAgents,
  onOpenApprovals,
  onOpenLedger,
  onRefresh,
  isRefreshing
}) => {
  const pendingApprovalsCount = state.approvals.filter(a => a.status === 'PENDING').length;

  return (
    <div className="bg-[#05050A] border-b border-[#2A2A38] text-white">
      {/* Top Telemetry Marquee & Breadcrumb */}
      <div className="bg-[#0A0A14] border-b border-[#1A1A28] px-4 py-1.5 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#A855F7] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse"></span>
            UA-AIDC MODULE 2 // CODE VEIN V13
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">CODE LANDLORD WEALTH OS</span>
          <span className="text-zinc-600">|</span>
          <span className="text-[#00FF88] flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> 15 COLONIES ONLINE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-amber-400">PAYSTACK: {state.config.paystackMode}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-zinc-400">
            SPLIT: <strong className="text-[#00FF88]">70% DEVELOPER</strong> / <span className="text-zinc-300">30% PLATFORM</span>
          </span>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition disabled:opacity-50"
            title="Refresh State"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#A855F7]' : ''}`} />
            <span>SYNC</span>
          </button>
        </div>
      </div>

      {/* Main Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#A855F7]/10 border border-[#A855F7]/30 text-[#A855F7] text-xs font-mono font-medium">
              <Code2 className="w-3.5 h-3.5" />
              <span>AUTONOMOUS SOURCE-TO-WEALTH REFINERY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>CODE VEIN V13</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-[#00FF88] border border-emerald-500/40 font-normal">
                ENTERPRISE ACTIVE
              </span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl font-light">
              Transforming raw repositories, micro-APIs, and developer intelligence into verified commercial assets.
              Zero arbitrary execution &bull; Guaranteed private code isolation &bull; Mandatory human approval gates.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenApprovals}
              className={`relative px-3.5 py-2 rounded text-xs font-mono font-medium border transition flex items-center gap-2 ${
                pendingApprovalsCount > 0
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>APPROVAL QUEUE</span>
              {pendingApprovalsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-bold text-[10px]">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAgents}
              className="px-3.5 py-2 rounded text-xs font-mono font-medium bg-[#A855F7]/10 border border-[#A855F7]/40 text-purple-300 hover:bg-[#A855F7]/20 transition flex items-center gap-2"
            >
              <Bot className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>18 AGENTS SWARM</span>
            </button>

            <button
              onClick={onOpenLedger}
              className="px-3.5 py-2 rounded text-xs font-mono font-medium bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-zinc-400" />
              <span>LEDGER AUDIT</span>
            </button>

            <button
              onClick={onOpenPayout}
              className="px-4 py-2 rounded text-xs font-mono font-bold bg-[#00FF88] text-black hover:bg-[#00e57a] transition flex items-center gap-2 shadow-lg shadow-[#00FF88]/20"
            >
              <Wallet className="w-3.5 h-3.5 text-black" />
              <span>PAYOUT (70% NET)</span>
            </button>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          <div className="bg-[#0B0B14] border border-[#1E1E2E] rounded p-3">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Gross Sales</div>
            <div className="text-lg font-bold text-white mt-1">
              ${state.metrics.totalGrossRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">All 15 Colonies</div>
          </div>

          <div className="bg-[#0B0B14] border border-[#00FF88]/30 rounded p-3 relative overflow-hidden">
            <div className="text-[11px] font-mono text-[#00FF88] uppercase tracking-wider font-semibold">
              Developer Net (70%)
            </div>
            <div className="text-lg font-bold text-[#00FF88] mt-1">
              ${state.metrics.developerNetEarningsUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
              &asymp; &#8358;{(state.metrics.developerNetEarningsUsd * state.config.ngnExchangeRate).toLocaleString()} NGN
            </div>
          </div>

          <div className="bg-[#0B0B14] border border-[#1E1E2E] rounded p-3">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Platform Share (30%)</div>
            <div className="text-lg font-bold text-zinc-300 mt-1">
              ${state.metrics.platformNetEarningsUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">Autonomous Ops</div>
          </div>

          <div className="bg-[#0B0B14] border border-[#FFD700]/30 rounded p-3">
            <div className="text-[11px] font-mono text-[#FFD700] uppercase tracking-wider font-semibold">
              Withdrawable
            </div>
            <div className="text-lg font-bold text-[#FFD700] mt-1">
              ${state.metrics.availableWithdrawableUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-amber-400 font-mono mt-0.5">
              &#8358;{state.metrics.availableWithdrawableNgn.toLocaleString()} NGN
            </div>
          </div>

          <div className="bg-[#0B0B14] border border-[#1E1E2E] rounded p-3">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Active Micro-APIs</div>
            <div className="text-lg font-bold text-[#00D4FF] mt-1">
              {state.metrics.totalActiveMicroApis} Live
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              {(state.metrics.totalApiCallsMetered / 1000000).toFixed(2)}M Calls Metered
            </div>
          </div>

          <div className="bg-[#0B0B14] border border-[#1E1E2E] rounded p-3">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">DNA Verified Repos</div>
            <div className="text-lg font-bold text-[#A855F7] mt-1">
              {state.metrics.totalDnaVerified} Clean
            </div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
              {state.metrics.totalReposScanned} Repos Scanned
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
