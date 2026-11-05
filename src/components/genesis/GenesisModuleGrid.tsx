import React from 'react';
import {
  Radio,
  GitBranch,
  Network,
  Maximize2,
  Database,
  Bot,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { GenesisModuleId } from '../../types/mindHiveGenesis';
import { GENESIS_MODULES_METADATA } from '../../data/genesisData';

interface GenesisModuleGridProps {
  selectedModuleId: GenesisModuleId;
  onSelectModule: (id: GenesisModuleId) => void;
}

const MODULE_ICONS: Record<string, React.ElementType> = {
  Radio,
  GitBranch,
  Network,
  Maximize2,
  Database,
  Bot,
  ShieldCheck,
  TrendingUp
};

export const GenesisModuleGrid: React.FC<GenesisModuleGridProps> = ({
  selectedModuleId,
  onSelectModule
}) => {
  const modules = Object.values(GENESIS_MODULES_METADATA);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              The 8 Genesis Intelligence Modules
            </span>
            <span className="text-xs text-slate-400">
              Autonomous Systems A through H
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Venture Creation, Evolution & Fusion Grid
          </h2>
        </div>
        <div className="text-xs text-slate-400">
          Click any intelligence module below to view active workbenches and live operations.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {modules.map((mod) => {
          const isSelected = selectedModuleId === mod.id;
          const IconComponent = MODULE_ICONS[mod.icon] || Sparkles;

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40 -translate-y-1'
                  : 'bg-slate-950/80 border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900/60'
              }`}
            >
              {/* Module Visual Image Card */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src={mod.heroImage}
                  alt={mod.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-950/85 text-cyan-400 border border-cyan-500/30 backdrop-blur-md">
                    Module {mod.codeLetter}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                    style={{ backgroundColor: mod.accentColor }}
                  >
                    {mod.badge}
                  </span>
                </div>

                {/* Metric Preview on image */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-300">
                    {mod.metricsPreview.label}
                  </span>
                  <span className="text-xs font-bold text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                    {mod.metricsPreview.value}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="p-1.5 rounded-lg border text-white"
                      style={{
                        backgroundColor: `${mod.accentColor}20`,
                        borderColor: `${mod.accentColor}50`
                      }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: mod.accentColor }} />
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {mod.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {mod.tagline}
                  </p>
                </div>

                <div>
                  {/* Target Colony linkages */}
                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    {mod.targetColonies.map((colony) => (
                      <span
                        key={colony}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {colony.replace('_V12', '').replace('_V13', '').replace('_V17', '')}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">
                      {mod.subtitle}
                    </span>
                    <button
                      className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                        isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Active Module' : 'Inspect'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
