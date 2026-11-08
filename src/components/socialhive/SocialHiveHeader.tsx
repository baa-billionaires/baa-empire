import React from 'react';
import {
  Share2,
  Sparkles,
  Link2,
  Database,
  Layers,
  Building2,
  Globe,
  Coins,
  ShieldCheck,
  TrendingUp,
  Radio,
  Cpu
} from 'lucide-react';
import { SocialHiveState } from '../../types/socialHive';

interface SocialHiveHeaderProps {
  state: SocialHiveState;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigateToColony?: (colony: string) => void;
}

export const SocialHiveHeader: React.FC<SocialHiveHeaderProps> = ({
  state,
  activeTab,
  onTabChange,
  onNavigateToColony
}) => {
  const tabs = [
    { id: 'overview', label: 'Social Command HUD', icon: Sparkles },
    { id: 'intake', label: '1. Universal Mining Portal', icon: Link2, badge: state.socialAssets.length },
    { id: 'genome', label: '2. Social Asset Genome', icon: Database, badge: state.socialAssets.length },
    { id: 'colonies', label: '3. 14 Mining Colonies', icon: Radio, badge: state.colonies.length },
    { id: 'multiplication', label: '4. Multiplication Reactor', icon: Layers, badge: state.derivatives.length },
    { id: 'enterprise', label: '5. Social-to-Enterprise', icon: Building2, badge: state.enterpriseProducts.length },
    { id: 'buyers', label: '6. Buyer-Hunting Legions', icon: Globe, badge: state.buyerOpportunities.length },
    { id: 'accounts', label: '7. Connected Accounts', icon: Share2, badge: state.connectedAccounts.length },
    { id: 'revenue', label: '8. 12 Revenue Channels & Paystack', icon: Coins }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#060b18] via-[#09152b] to-[#040810] border-2 border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Pill Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40">
                MIND HIVE V21 EXTENSION • SOCIAL HIVE
              </span>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-emerald-400 hidden sm:inline">
                14 Specialist Social Colonies Online
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
                  Mind Hive V20 (Knowledge)
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
                  onClick={() => onNavigateToColony('aurum-colony')}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                >
                  Aurum Colony (Assets)
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

          {/* Title & Core Vision */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white flex items-center gap-3">
              <span>SOCIAL HIVE</span>
              <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                The Universal Social Media Minting &amp; Monetization Engine
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-mono text-cyan-300/90 font-black tracking-wider uppercase">
              "{state.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-4xl font-sans leading-relaxed">
              One social link can become a knowledge asset. One creator portfolio can become a commercial ecosystem. One authorized content library can power multiple AI products, living ebooks, courses, enterprise assistants, and direct Paystack royalties.
            </p>
          </div>

          {/* Key Metric Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono">
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Registered Social Assets</span>
              <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>{state.summaryStats.totalRegisteredSocialAssets} Minted</span>
              </div>
              <span className="text-[10px] text-zinc-400">{state.summaryStats.processedSocialLinksCount.toLocaleString()} Links Scanned</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Multiplied Derivatives</span>
              <div className="text-xl sm:text-2xl font-bold text-[#00FF88] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00FF88]" />
                <span>{state.summaryStats.totalDerivativesCreated} Products</span>
              </div>
              <span className="text-[10px] text-zinc-400">eBooks, Courses, Podcasts</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase block">Connected Accounts</span>
              <div className="text-xl sm:text-2xl font-bold text-[#00D4FF] flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#00D4FF]" />
                <span>{state.summaryStats.connectedAccountsCount} Accounts</span>
              </div>
              <span className="text-[10px] text-zinc-400">OAuth Read-Only Verified</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-amber-500/40 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold block">Creator Royalties (70%)</span>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>${state.summaryStats.creatorRoyaltiesPaidUsd.toLocaleString()}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold block">
                ₦{state.summaryStats.creatorRoyaltiesPaidNgn.toLocaleString()} NGN Paid
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
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black text-cyan-400 font-bold' : 'bg-zinc-800 text-zinc-300'
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
