import React from 'react';
import {
  Cpu,
  Wifi,
  FileSpreadsheet,
  BrainCircuit,
  Wrench,
  ShoppingBag,
  Network,
  GraduationCap,
  ShieldCheck,
  Server,
  Sparkles,
  Briefcase,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { CeColonyId, CeColonyMeta } from '../../types/ceColony';

interface CeColonyCardGridProps {
  colonies: CeColonyMeta[];
  selectedColonyId: CeColonyId;
  onSelectColony: (colonyId: CeColonyId) => void;
  summaryData?: Record<string, any>;
}

export const CeColonyCardGrid: React.FC<CeColonyCardGridProps> = ({
  colonies,
  selectedColonyId,
  onSelectColony,
  summaryData
}) => {
  const getColonyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Wifi':
        return <Wifi className="w-5 h-5" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Server':
        return <Server className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/30">
            THE TWELVE WEALTH COLONIES
          </span>
          <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
            12 Independent Autonomous Revenue Divisions
          </span>
        </div>
        <div className="text-xs font-mono text-zinc-400">
          Click any colony to enter its live workbench
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {colonies.map(colony => {
          const isSelected = selectedColonyId === colony.id;
          const summary = summaryData?.[colony.id];

          return (
            <div
              key={colony.id}
              onClick={() => onSelectColony(colony.id)}
              className={`group relative rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1A1208] via-[#0C0905] to-black border-orange-500 shadow-xl shadow-orange-500/20 ring-1 ring-orange-400'
                  : 'bg-zinc-950/80 hover:bg-zinc-900/90 border-zinc-800/80 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10'
              }`}
            >
              {/* Subtle accent backdrop */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full pointer-events-none transition-opacity duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent opacity-100'
                    : 'bg-gradient-to-bl from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100'
                }`}
              />

              <div className="space-y-3 relative z-10">
                {/* Header with Order Number and Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2.5 rounded-xl transition ${
                        isSelected
                          ? 'bg-orange-500 text-black shadow-md shadow-orange-500/30 font-bold'
                          : 'bg-zinc-900 text-orange-400 border border-orange-500/30 group-hover:border-orange-400 group-hover:text-orange-300'
                      }`}
                    >
                      {getColonyIcon(colony.iconName)}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold text-orange-400 tracking-wider">
                        COLONY {String(colony.orderNumber).padStart(2, '0')}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition">
                        {colony.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase font-bold ${
                      isSelected
                        ? 'bg-orange-500/20 text-orange-300 border-orange-500/50'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 group-hover:text-amber-300 group-hover:border-amber-500/30'
                    }`}
                  >
                    {colony.badge}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs font-mono text-amber-300 font-medium line-clamp-1">
                  {colony.tagline}
                </p>

                {/* Short Description */}
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {colony.shortDesc}
                </p>

                {/* Revenue Metric Pill */}
                <div className="bg-black/60 border border-zinc-800 rounded-xl p-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-400">{colony.primaryMetric.label}</span>
                    <span className="text-[#FFD700] font-bold">
                      {summary?.dailyRevenueUsd
                        ? `$${summary.dailyRevenueUsd.toFixed(2)}/day`
                        : colony.primaryMetric.value}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 truncate">
                    {colony.revenueModel}
                  </div>
                </div>
              </div>

              {/* Bottom Action bar */}
              <div className="pt-3 mt-3 border-t border-zinc-800/80 flex items-center justify-between relative z-10 text-xs font-mono">
                <span
                  className={
                    isSelected
                      ? 'text-orange-400 font-bold'
                      : 'text-zinc-500 group-hover:text-zinc-300 transition'
                  }
                >
                  {isSelected ? 'Active Workspace' : 'Launch Module'}
                </span>
                <span
                  className={`p-1 rounded-full transition ${
                    isSelected
                      ? 'bg-orange-500 text-black'
                      : 'bg-zinc-900 text-zinc-400 group-hover:text-white group-hover:bg-orange-500 group-hover:text-black'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
