import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Clock,
  Briefcase,
  DollarSign,
  Building2,
  FileText,
  Award,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { DealRoomDashboardMetrics, SourceConnector } from '../../types/dealRoom';

interface DealRoomLiveDashboardProps {
  metrics: DealRoomDashboardMetrics;
  connectors: SourceConnector[];
  onTriggerSync?: () => void;
  isSyncing?: boolean;
}

export const DealRoomLiveDashboard: React.FC<DealRoomLiveDashboardProps> = ({
  metrics,
  connectors,
  onTriggerSync,
  isSyncing = false
}) => {
  return (
    <div className="space-y-6">
      {/* TOP EXECUTIVE BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 border border-zinc-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>BAA Deal Intelligence OS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-mono flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>100% Verified Sources</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              BAA GLOBAL DEAL ROOM & AI FUNDING EXCHANGE™
            </h1>
            <p className="text-sm text-zinc-300 max-w-2xl font-normal leading-relaxed">
              <span className="text-[#FFD700] font-semibold">Discover Opportunities. Build Relationships. Secure Real Deals.</span>{' '}
              Autonomous multilateral RFP discovery, direct institutional engagement, and project finance pipeline.
            </p>
          </div>

          {/* REAL OUTCOMES STAT BOX */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-emerald-500/30 text-left min-w-[170px] shadow-lg">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Actual Funding Secured</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                ${metrics.actualFundingSecuredUsd.toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                Confirmed Grants & Credits
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-[#FFD700]/30 text-left min-w-[170px] shadow-lg">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#FFD700] font-semibold flex items-center gap-1">
                <Award className="w-3 h-3" />
                <span>Actual Revenue Earned</span>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                ${metrics.actualRevenueEarnedUsd.toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-400 mt-0.5">
                Delivered Contract Invoices
              </div>
            </div>

            {onTriggerSync && (
              <button
                onClick={onTriggerSync}
                disabled={isSyncing}
                className={`p-3 rounded-xl border font-mono text-xs font-bold transition flex items-center gap-2 ${
                  isSyncing
                    ? 'bg-zinc-800 text-zinc-400 border-zinc-700 cursor-not-allowed'
                    : 'bg-[#FFD700] hover:bg-[#FFE033] text-black border-[#FFD700] shadow-md shadow-[#FFD700]/20 cursor-pointer'
                }`}
                title="Synchronize connected official procurement feeds"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync Feeds'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 12-POINT LIVE TELEMETRY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Discovered</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">{metrics.newOpportunitiesDiscovered}</div>
          <p className="text-[10px] text-zinc-500">Active Listings</p>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Verified</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400">{metrics.opportunitiesVerified}</div>
          <p className="text-[10px] text-zinc-500">Official Gazettes</p>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Matches</span>
            <Zap className="w-3.5 h-3.5 text-[#FFD700]" />
          </div>
          <div className="text-xl font-bold text-white">{metrics.potentialMatches}</div>
          <p className="text-[10px] text-zinc-500">Member & BAA Projects</p>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Approaching</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-400">{metrics.deadlinesApproaching}</div>
          <p className="text-[10px] text-zinc-500">&lt; 30 Days Left</p>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">In Review</span>
            <FileText className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white">{metrics.contractsUnderReview}</div>
          <p className="text-[10px] text-zinc-500">Contracts & Bids</p>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-[11px] font-mono uppercase">Active Convos</span>
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white">{metrics.institutionalConversations}</div>
          <p className="text-[10px] text-zinc-500">{metrics.confirmedReplies} Confirmed Replies</p>
        </div>
      </div>

      {/* CONNECTOR HEALTH & EVIDENCE BAR */}
      <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-zinc-400 font-semibold uppercase text-[11px] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>Authorized Connector Grid:</span>
          </span>
          {connectors.map(c => (
            <span
              key={c.id}
              className={`px-2.5 py-1 rounded-lg border font-mono text-[10px] flex items-center gap-1.5 ${
                c.connectionStatus === 'connected_live'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                  : c.connectionStatus === 'credentials_required'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                c.connectionStatus === 'connected_live' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`} />
              <span>{c.name}</span>
              <span className="text-zinc-500">({c.recordsIngested})</span>
            </span>
          ))}
        </div>

        <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-2 shrink-0">
          <span>Last Sync: {metrics.lastSyncTimestamp}</span>
          <span className="text-zinc-700">•</span>
          <span className="text-emerald-400 font-semibold">Zero Fake Metrics Protocol</span>
        </div>
      </div>
    </div>
  );
};
