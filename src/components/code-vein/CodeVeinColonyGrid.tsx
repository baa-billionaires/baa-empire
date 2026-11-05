import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  Terminal,
  TrendingUp,
  GitPullRequest,
  RefreshCw,
  Lock,
  Cpu,
  DollarSign,
  Boxes,
  Key,
  Users,
  Server,
  Layers,
  Sparkles,
  ArrowRight,
  Activity
} from 'lucide-react';
import { CODE_VEIN_COLONIES } from '../../data/codeVeinData';
import { CodeVeinColonyId } from '../../types/codeVein';

interface CodeVeinColonyGridProps {
  onSelectColony: (colonyId: CodeVeinColonyId) => void;
  activeColonyId?: CodeVeinColonyId;
}

export const CodeVeinColonyGrid: React.FC<CodeVeinColonyGridProps> = ({
  onSelectColony,
  activeColonyId
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = [
    'All',
    'Intelligence & Audit',
    'Refinery & Code Production',
    'Marketplace & Commercial',
    'Enterprise & Infrastructure'
  ];

  const filteredColonies = filterCategory === 'All'
    ? CODE_VEIN_COLONIES
    : CODE_VEIN_COLONIES.filter(c => c.category === filterCategory);

  const renderIcon = (iconName: string, color: string) => {
    const props = { className: 'w-5 h-5', style: { color } };
    switch (iconName) {
      case 'Search': return <Search {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'GitPullRequest': return <GitPullRequest {...props} />;
      case 'RefreshCw': return <RefreshCw {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'DollarSign': return <DollarSign {...props} />;
      case 'Boxes': return <Boxes {...props} />;
      case 'Key': return <Key {...props} />;
      case 'Users': return <Users {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      default: return <Terminal {...props} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span>THE 15 AUTONOMOUS SOURCE-TO-WEALTH COLONIES</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">
              V13 INFRASTRUCTURE
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Select any colony to open its dedicated live workbench, code refiner, and revenue engine.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0A0A14] p-1.5 rounded-lg border border-[#1E1E2E]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition ${
                filterCategory === cat
                  ? 'bg-[#A855F7] text-white font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 15 Colonies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredColonies.map(colony => {
          const isActive = activeColonyId === colony.id;

          return (
            <div
              key={colony.id}
              className={`bg-[#07070E] border rounded-xl p-5 transition flex flex-col justify-between group hover:border-[#A855F7]/60 hover:shadow-xl relative overflow-hidden ${
                isActive
                  ? 'border-[#A855F7] ring-1 ring-[#A855F7]/40 shadow-lg shadow-[#A855F7]/10'
                  : 'border-[#1C1C2C]'
              }`}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-70"
                style={{ backgroundColor: colony.accentColor }}
              />

              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="p-2.5 rounded-lg bg-black border border-white/10 group-hover:scale-105 transition"
                      style={{ borderColor: `${colony.accentColor}40` }}
                    >
                      {renderIcon(colony.icon, colony.accentColor)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">
                          COLONY {String(colony.colonyNumber).padStart(2, '0')}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                          {colony.category.split(' ')[0]}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition line-clamp-1">
                        {colony.name}
                      </h3>
                    </div>
                  </div>

                  {/* Primary Metric Badge */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-[10px] font-mono text-zinc-400">
                      {colony.primaryMetricLabel}
                    </div>
                    <div
                      className="text-xs font-mono font-bold mt-0.5"
                      style={{ color: colony.accentColor }}
                    >
                      {colony.primaryMetricValue}
                    </div>
                  </div>
                </div>

                {/* Tagline & Description */}
                <p className="text-xs font-mono text-zinc-300 font-medium mb-2">
                  {colony.tagline}
                </p>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {colony.description}
                </p>

                {/* Revenue Model Strip */}
                <div className="bg-[#0B0B14] border border-[#181826] rounded px-3 py-2 text-[11px] font-mono text-zinc-300 mb-4 flex items-center justify-between">
                  <span className="text-zinc-500">REVENUE:</span>
                  <span className="text-[#00FF88] font-semibold text-right line-clamp-1">
                    {colony.revenueModel}
                  </span>
                </div>
              </div>

              {/* Bottom Footer & Action */}
              <div className="pt-3 border-t border-[#161622] flex items-center justify-between">
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#00FF88]" />
                  <span className="truncate max-w-[170px]">{colony.agentRole}</span>
                </div>

                <button
                  onClick={() => onSelectColony(colony.id)}
                  className="px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#131320] border border-[#2E2E42] text-white hover:bg-[#A855F7] hover:border-[#A855F7] transition flex items-center gap-1 group/btn"
                >
                  <span>WORKBENCH</span>
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
