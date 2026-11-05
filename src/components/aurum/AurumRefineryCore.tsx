import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Activity,
  UserCheck,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { AURUM_VALUE_CHAIN_STAGES, ValueChainStage } from '../../data/aurumData';

export const AurumRefineryCore: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<ValueChainStage>(AURUM_VALUE_CHAIN_STAGES[0]);

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800/80 p-6 mb-8 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              10-Stage Value Chain
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Automated Pipeline with Human Gate
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Autonomous Digital Asset Refinery Core
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every token, NFT, and dormant balance travels through verifiable verification stages before settlement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-300">Stage 7:</span> Human Approval Gate Enforced
          </div>
        </div>
      </div>

      {/* Pipeline Visual Horizontal Track */}
      <div className="mt-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="flex items-center min-w-[900px] gap-2">
          {AURUM_VALUE_CHAIN_STAGES.map((stg, idx) => {
            const isSelected = selectedStage.stage === stg.stage;
            const isHumanGate = stg.stage === 7;
            const isRevenue = stg.stage === 10;

            return (
              <React.Fragment key={stg.stage}>
                <button
                  onClick={() => setSelectedStage(stg)}
                  className={`flex-1 min-w-[130px] p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : isHumanGate
                      ? 'bg-amber-950/20 border-amber-600/30 hover:border-amber-500/40'
                      : isRevenue
                      ? 'bg-emerald-950/20 border-emerald-600/30 hover:border-emerald-500/40'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded ${
                        isHumanGate
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : isRevenue
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Stage 0{stg.stage}
                    </span>
                    {isHumanGate ? (
                      <Shield className="w-3 h-3 text-amber-400 animate-pulse" />
                    ) : (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white truncate">{stg.name}</div>
                  <div className="text-[10px] text-slate-400 mt-1 truncate">{stg.statusText}</div>
                </button>
                {idx < AURUM_VALUE_CHAIN_STAGES.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Inspector Drawer */}
      <div className="mt-4 p-4 rounded-xl bg-slate-900/70 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                Stage {selectedStage.stage}: {selectedStage.name}
              </span>
              <span className="text-xs text-slate-500">[{selectedStage.code}]</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
              {selectedStage.description}
            </p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400">Responsible Agents:</span>
              {selectedStage.responsibleAgents.map((ag) => (
                <span
                  key={ag}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {ag}
                </span>
              ))}
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
