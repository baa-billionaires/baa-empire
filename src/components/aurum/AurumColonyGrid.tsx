import React from 'react';
import {
  Flame,
  Sparkles,
  Layers,
  Cpu,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
  Target,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { AurumColonyId } from '../../types/aurum';
import { AURUM_COLONIES_METADATA, ColonyMetadata } from '../../data/aurumData';

interface AurumColonyGridProps {
  selectedColonyId: AurumColonyId;
  onSelectColony: (id: AurumColonyId) => void;
}

const COLONY_ICONS: Record<string, React.ElementType> = {
  Flame,
  Sparkles,
  Layers,
  Cpu,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
  Target
};

export const AurumColonyGrid: React.FC<AurumColonyGridProps> = ({
  selectedColonyId,
  onSelectColony
}) => {
  const coloniesList = Object.values(AURUM_COLONIES_METADATA);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              The 8 Wealth Colonies
            </span>
            <span className="text-xs text-slate-400">
              Autonomous Digital Asset Recovery Divisions
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
            Universal Autonomous Digital Asset Infrastructure
          </h2>
        </div>
        <div className="text-xs text-slate-400">
          Click any colony below to launch its interactive functional workbench.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coloniesList.map((colony) => {
          const isSelected = selectedColonyId === colony.id;
          const IconComponent = COLONY_ICONS[colony.icon] || Sparkles;

          return (
            <div
              key={colony.id}
              onClick={() => onSelectColony(colony.id)}
              className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900/95 border-amber-400 shadow-[0_0_25px_rgba(255,215,0,0.25)] ring-1 ring-amber-400/40 -translate-y-1'
                  : 'bg-slate-950/80 border-slate-800/80 hover:border-amber-500/30 hover:bg-slate-900/60'
              }`}
            >
              {/* Colony Visual Image Card */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                <img
                  src={colony.heroImage}
                  alt={colony.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Floating Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                    Colony {colony.numericCode}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-sm"
                    style={{ backgroundColor: colony.accentColor }}
                  >
                    {colony.badge}
                  </span>
                </div>

                {/* Metric Preview on image */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-300">
                    {colony.metricsPreview.label}
                  </span>
                  <span className="text-xs font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
                    {colony.metricsPreview.value}
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
                        backgroundColor: `${colony.accentColor}20`,
                        borderColor: `${colony.accentColor}50`
                      }}
                    >
                      <IconComponent className="w-4 h-4" style={{ color: colony.accentColor }} />
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {colony.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {colony.tagline}
                  </p>
                </div>

                {/* Supported chains pill row */}
                <div>
                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    {colony.supportedChains.slice(0, 3).map((chain) => (
                      <span
                        key={chain}
                        className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {chain}
                      </span>
                    ))}
                    {colony.supportedChains.length > 3 && (
                      <span className="text-[9px] text-slate-500 font-medium">
                        +{colony.supportedChains.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">
                      {colony.agentIds.length} Autonomous Agents
                    </span>
                    <button
                      className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                        isSelected ? 'text-amber-400' : 'text-slate-400 group-hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Active Colony' : 'Open Workbench'}
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
