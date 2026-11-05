import React, { useState } from 'react';
import {
  CheckCircle2,
  Shield,
  ArrowRight,
  Activity,
  UserCheck,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { GENESIS_LIFECYCLE_STAGES, LifecycleStageMeta } from '../../data/genesisData';
import { MindHiveGenesisState } from '../../types/mindHiveGenesis';

interface GenesisLifecycleTrackerProps {
  state: MindHiveGenesisState;
  onSelectVenture?: (ventureId: string) => void;
}

export const GenesisLifecycleTracker: React.FC<GenesisLifecycleTrackerProps> = ({
  state,
  onSelectVenture
}) => {
  const [selectedStage, setSelectedStage] = useState<LifecycleStageMeta>(GENESIS_LIFECYCLE_STAGES[0]);

  // Find ventures currently at this stage
  const venturesAtStage = state.ventures.filter((v) => v.currentStage === selectedStage.stage);

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800/80 p-6 mb-8 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Autonomous Venture Lifecycle
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              10 Verifiable Creation Gates
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            The Living Venture Pipeline
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every venture begins with real demand and progresses through simulations, pilot validation, human approval, and commercial evolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-300">Stage 07:</span> Mandatory Human Consent Gate
          </div>
        </div>
      </div>

      {/* Horizontal Lifecycle Track */}
      <div className="mt-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="flex items-center min-w-[950px] gap-2">
          {GENESIS_LIFECYCLE_STAGES.map((stg, idx) => {
            const isSelected = selectedStage.stage === stg.stage;
            const count = state.ventures.filter((v) => v.currentStage === stg.stage).length;
            const isApproveGate = stg.stage === 'APPROVE';
            const isLaunch = stg.stage === 'LAUNCH' || stg.stage === 'MEASURE';

            return (
              <React.Fragment key={stg.stage}>
                <button
                  onClick={() => setSelectedStage(stg)}
                  className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/30'
                      : isApproveGate
                      ? 'bg-amber-950/20 border-amber-600/30 hover:border-amber-500/40'
                      : isLaunch
                      ? 'bg-emerald-950/20 border-emerald-600/30 hover:border-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        isApproveGate
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : isLaunch
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Stage {stg.stageNumber < 10 ? `0${stg.stageNumber}` : stg.stageNumber}
                    </span>
                    {count > 0 ? (
                      <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center border border-cyan-500/40">
                        {count}
                      </span>
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-slate-600" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white truncate">{stg.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1 truncate">{count} Active Ventures</div>
                </button>
                {idx < GENESIS_LIFECYCLE_STAGES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Inspector Drawer */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                Stage 0{selectedStage.stageNumber}: {selectedStage.label}
              </span>
              <span className="text-xs text-slate-500">[{selectedStage.primaryModule.toUpperCase()}]</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              {selectedStage.shortDesc}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400">Current Ventures in this Stage:</span>
              {venturesAtStage.length === 0 ? (
                <span className="text-[11px] text-slate-500 italic">None at this stage</span>
              ) : (
                venturesAtStage.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => onSelectVenture?.(v.id)}
                    className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer transition-colors"
                  >
                    {v.name}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 shrink-0 md:max-w-xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            Verification Gate
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            {selectedStage.verificationGate}
          </div>
        </div>
      </div>
    </div>
  );
};
