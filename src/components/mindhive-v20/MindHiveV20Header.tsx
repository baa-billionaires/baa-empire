import React from 'react';
import {
  Sparkles,
  Database,
  Cpu,
  Layers,
  Coins,
  ShieldCheck,
  TrendingUp,
  Brain,
  Globe,
  ArrowRight,
  Upload
} from 'lucide-react';
import { MindHiveV20State } from '../../types/mindHiveV20';

interface MindHiveV20HeaderProps {
  state: MindHiveV20State;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigateToColony?: (colony: string) => void;
}

export const MindHiveV20Header: React.FC<MindHiveV20HeaderProps> = ({
  state,
  activeTab,
  onTabChange,
  onNavigateToColony
}) => {
  const tabs = [
    { id: 'overview', label: 'Civilization HUD', icon: Sparkles },
    { id: 'genome', label: '1. Content Genome', icon: Database, badge: state.assets.length },
    { id: 'register', label: 'Mint / Register Asset', icon: Upload },
    { id: 'multiplier', label: '2. Multiplication Factory', icon: Layers, badge: state.derivatives.length },
    { id: 'mining', label: '3. Mining Reactor (JSONL)', icon: Brain, badge: state.miningJobs.length },
    { id: 'training', label: '4. Global AI Training Engine', icon: Cpu, badge: state.trainingListings.length },
    { id: 'forge', label: '5. Model Forge (Lv 1–6)', icon: TrendingUp, badge: state.modelForgeProjects.length },
    { id: 'buyers', label: '6. 8 Buyer-Hunting Legions', icon: Globe, badge: state.buyerLeads.length },
    { id: 'royalties', label: '7. 70/30 Royalty Ledger & Paystack', icon: Coins }
  ];

  return (
    <div className="space-y-6">
      {/* Top Ambient Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#030914] via-[#061224] to-[#02050b] border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl shadow-amber-500/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Pill Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                UA-AIDC MODULE 5 • MIND HIVE V20
              </span>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-emerald-400 hidden sm:inline">
                {state.activeAgentsCount} Sovereign Swarm Agents Active
              </span>
            </div>

            {/* Inter-Colony Quick Jumps */}
            {onNavigateToColony && (
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                <span className="text-zinc-500">UA-AIDC GRID:</span>
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
                  onClick={() => onNavigateToColony('aurum-colony')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  Aurum Colony (Digital Assets)
                </button>
                <button
                  onClick={() => onNavigateToColony('genesis')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  Genesis (Ventures)
                </button>
                <button
                  onClick={() => onNavigateToColony('social-hive')}
                  className="px-2.5 py-1 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 hover:text-white border border-purple-800/60 transition cursor-pointer flex items-center gap-1 font-bold"
                >
                  <span>Social Hive V21</span>
                  <span className="text-[9px] bg-purple-500/20 px-1 py-0.2 rounded text-purple-200">NEW</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Title & Mission */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white flex items-center gap-3">
              <span>MIND HIVE V20</span>
              <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Global Knowledge &amp; AI Wealth Civilization
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-mono text-amber-300/90 font-bold tracking-wide uppercase">
              "{state.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-4xl font-sans leading-relaxed">
              Transform authorized human knowledge and digital content into useful intelligence, AI products, commercial opportunities, licensed knowledge assets and verifiable revenue. Featuring full Content Genome provenance, automatic multi-format derivation, Level 1–6 AI Model Forge, 8 buyer-hunting legions, and a strict 70/30 creator royalty engine settled via Paystack.
            </p>
          </div>

          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Content Genome Assets</span>
              <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span>{state.stats.totalRegisteredAssets} Registered</span>
              </div>
              <span className="text-[10px] text-zinc-400">SHA-256 Verified Provenance</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Multiplied Derivatives</span>
              <div className="text-xl sm:text-2xl font-bold text-[#00FF88] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00FF88]" />
                <span>{state.stats.totalDerivativesCreated} Products</span>
              </div>
              <span className="text-[10px] text-zinc-400">eBooks, Courses, Podcasts</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Mined Q&amp;A Pairs (JSONL)</span>
              <div className="text-xl sm:text-2xl font-bold text-[#00D4FF] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#00D4FF]" />
                <span>{state.stats.totalMinedQaPairs.toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-zinc-400">&lt;0.1% Hallucination Risk</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-amber-500/40 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold block">Creator Royalties (70%)</span>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>${state.stats.creatorRoyaltiesPaidUsd.toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                ₦{state.stats.creatorRoyaltiesPaidNgn.toLocaleString()} NGN Paid
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black text-amber-400 font-bold' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
