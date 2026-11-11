import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Globe,
  Coins,
  Database,
  Users,
  ShieldCheck,
  Scale,
  Brain,
  ArrowRight,
  Layers,
  Cpu,
  Landmark,
  Share2,
  CheckCircle2,
  Lock,
  Compass
} from 'lucide-react';
import { MindHiveV22State } from '../../types/mindHiveV22';

interface MindHiveV22MasterHubProps {
  state: MindHiveV22State;
  activeSystem: 'hub' | 'kcx' | 'gka' | 'havc';
  onSelectSystem: (system: 'hub' | 'kcx' | 'gka' | 'havc') => void;
  onNavigateToColony?: (colony: string) => void;
}

export const MindHiveV22MasterHub: React.FC<MindHiveV22MasterHubProps> = ({
  state,
  activeSystem,
  onSelectSystem,
  onNavigateToColony
}) => {
  return (
    <div className="space-y-8">
      {/* Top Sovereign Ambient Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#020617] via-[#0b1329] to-[#010309] border-2 border-indigo-500/40 p-6 sm:p-8 shadow-2xl shadow-indigo-950/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#6366f112_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Pill Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-indigo-300 uppercase bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/40">
                UA-AIDC MASTER MODULE • MIND HIVE V22
              </span>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-emerald-400 hidden sm:inline">
                Global Knowledge Capital &amp; Human–AI Value Civilization
              </span>
            </div>

            {/* Inter-Colony Quick Jumps */}
            {onNavigateToColony && (
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                <span className="text-zinc-500">UA-AIDC GRID:</span>
                <button
                  onClick={() => onNavigateToColony('mindhive-v20')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-300 hover:text-white border border-amber-500/30 transition cursor-pointer"
                >
                  V20 (Content Compounding)
                </button>
                <button
                  onClick={() => onNavigateToColony('social-hive')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-300 hover:text-white border border-cyan-500/30 transition cursor-pointer"
                >
                  V21 (Social Hive)
                </button>
                <button
                  onClick={() => onNavigateToColony('ce-colony')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  CE Colony (Hardware)
                </button>
                <button
                  onClick={() => onNavigateToColony('code-vein')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  Code Vein (Software)
                </button>
                <button
                  onClick={() => onNavigateToColony('genesis')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  Genesis (Ventures)
                </button>
              </div>
            )}
          </div>

          {/* Main Title & Mission */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white flex flex-wrap items-center gap-3">
              <span>MIND HIVE V22</span>
              <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                The Global Knowledge Capital &amp; Intelligence Atlas
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-mono text-amber-300 font-bold tracking-wide uppercase">
              "{state.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-4xl font-sans leading-relaxed">
              Build a globally connected intelligence and commercial ecosystem that enables people, creators, researchers, educators, businesses, institutions and authorized AI agents to discover, preserve, organize, multiply, license and commercialize knowledge while ensuring transparent attribution and fair participation in the value created.
            </p>
          </div>

          {/* Master Telemetry Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 font-mono">
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Total Capital Value</span>
              <div className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400 shrink-0" />
                <span>${(state.summaryMetrics.totalKnowledgeCapitalValueUsd / 1000000).toFixed(2)}M</span>
              </div>
              <span className="text-[9px] text-zinc-400">Algorithmic Valuation</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Registered Assets</span>
              <div className="text-lg sm:text-xl font-bold text-white flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{state.summaryMetrics.totalRegisteredAssets}</span>
              </div>
              <span className="text-[9px] text-zinc-400">Verified IP / Content</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Active Licenses</span>
              <div className="text-lg sm:text-xl font-bold text-[#00FF88] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00FF88] shrink-0" />
                <span>{state.summaryMetrics.activeLicensesCount} SLAs</span>
              </div>
              <span className="text-[9px] text-zinc-400">Enterprise &amp; Academic</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Settled Revenue</span>
              <div className="text-lg sm:text-xl font-bold text-emerald-300 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>${(state.summaryMetrics.totalSettledRevenueUsd / 1000).toFixed(1)}k</span>
              </div>
              <span className="text-[9px] text-emerald-400">₦{(state.summaryMetrics.totalSettledRevenueNgn / 1000000).toFixed(1)}M NGN</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Knowledge Territories</span>
              <div className="text-lg sm:text-xl font-bold text-cyan-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{state.summaryMetrics.globalTerritoriesCount} / 20</span>
              </div>
              <span className="text-[9px] text-zinc-400">100% Active Coverage</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Cooperative Members</span>
              <div className="text-lg sm:text-xl font-bold text-purple-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{state.summaryMetrics.verifiedContributorsCount}</span>
              </div>
              <span className="text-[9px] text-zinc-400">70/30 Shared Value</span>
            </div>
          </div>
        </div>
      </div>

      {/* THREE STRATEGIC SYSTEMS SELECTOR STRIP */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {[
          { id: 'hub', label: 'Master Command Hub', icon: Compass, badge: 'V22 HQ' },
          { id: 'kcx', label: 'System 1: Knowledge Capital Exchange (KCX)', icon: Coins, badge: `${state.kcx.assets.length} Assets` },
          { id: 'gka', label: 'System 2: Global Knowledge Atlas (GKA)', icon: Globe, badge: '20 Territories' },
          { id: 'havc', label: 'System 3: Human–AI Value Cooperative (HAVC)', icon: Users, badge: '70% Royalty' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSystem === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectSystem(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-black/40 text-white font-bold' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* PART 3: THREE VISUALLY DISTINCT, LARGE CLICKABLE DASHBOARD CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CARD 1: KNOWLEDGE CAPITAL EXCHANGE */}
        <div
          onClick={() => onSelectSystem('kcx')}
          className="group relative rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border-2 border-amber-500/30 hover:border-amber-400 p-6 sm:p-7 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                SYSTEM 1 • MARKETPLACE
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-heading font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                <span>Knowledge Capital Exchange</span>
                <span className="text-xs font-mono text-zinc-500">(KCX)</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Discover, value, license and commercialize knowledge. The global marketplace for intellectual capital connecting creators with AI labs, universities, publishers and enterprises.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Eligible Assets</span>
                <span className="text-sm font-bold text-white">{state.kcx.assets.length} Verified</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Active Licenses</span>
                <span className="text-sm font-bold text-amber-300">{state.kcx.agreements.length} Live SLAs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Buyer Requests</span>
                <span className="text-sm font-bold text-cyan-300">{state.kcx.buyerRequests.length} Open RFQs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Verified Earnings</span>
                <span className="text-sm font-bold text-emerald-400">${(state.summaryMetrics.totalSettledRevenueUsd / 1000).toFixed(1)}k USD</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Launch KCX Marketplace &amp; Valuation &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 2: GLOBAL KNOWLEDGE ATLAS */}
        <div
          onClick={() => onSelectSystem('gka')}
          className="group relative rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border-2 border-cyan-500/30 hover:border-cyan-400 p-6 sm:p-7 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                SYSTEM 2 • INTELLIGENCE
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-heading font-black text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>Global Knowledge Atlas</span>
                <span className="text-xs font-mono text-zinc-500">(GKA)</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Explore global knowledge, industries, languages and opportunities. A living intelligence map connecting 20 territories, research discoveries, unresolved problems and opportunity gravity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Territories</span>
                <span className="text-sm font-bold text-white">20 Mapped</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Verified Discoveries</span>
                <span className="text-sm font-bold text-cyan-300">{state.gka.knowledgeGaps.length} Gaps</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Gravity Nodes</span>
                <span className="text-sm font-bold text-purple-300">{state.gka.gravityNodes.length} Linked</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Research Activity</span>
                <span className="text-sm font-bold text-emerald-400">10 AI Agents</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Explore Global Atlas &amp; Territories &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 3: HUMAN–AI VALUE COOPERATIVE */}
        <div
          onClick={() => onSelectSystem('havc')}
          className="group relative rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border-2 border-purple-500/30 hover:border-purple-400 p-6 sm:p-7 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                SYSTEM 3 • COOPERATIVE
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-heading font-black text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                <span>Human–AI Value Cooperative</span>
                <span className="text-xs font-mono text-zinc-500">(HAVC)</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Collaborate, track contributions and share verified commercial value. Granular Contribution DNA, multi-role workspaces, and transparent Paystack shared value distribution.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Active Contributors</span>
                <span className="text-sm font-bold text-white">{state.havc.contributors.length} Verified</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Active Projects</span>
                <span className="text-sm font-bold text-purple-300">{state.havc.projects.length} Teams</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Contribution DNA</span>
                <span className="text-sm font-bold text-amber-300">{state.havc.dnaRecords.length} Provenances</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">Settled Splits</span>
                <span className="text-sm font-bold text-emerald-400">{state.havc.distributions.length} Paystack</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-purple-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Enter Cooperative &amp; Shared Value &rarr;</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
