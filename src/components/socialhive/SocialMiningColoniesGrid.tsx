import React, { useState } from 'react';
import {
  Radio,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  RefreshCw,
  Search,
  Sliders,
  Play
} from 'lucide-react';
import { SocialMiningColony } from '../../types/socialHive';

interface SocialMiningColoniesGridProps {
  colonies: SocialMiningColony[];
}

export const SocialMiningColoniesGrid: React.FC<SocialMiningColoniesGridProps> = ({
  colonies
}) => {
  const [runningColonyId, setRunningColonyId] = useState<string | null>(null);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const handleRunColonyCycle = (colony: SocialMiningColony) => {
    setRunningColonyId(colony.id);
    setTimeout(() => {
      setRunningColonyId(null);
      setSuccessNote(`Cycle complete: ${colony.name} executed 12 intelligence extraction passes.`);
      setTimeout(() => setSuccessNote(null), 4000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-zinc-950 border border-zinc-800">
        <div>
          <h2 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" />
            <span>The 14 Autonomous Social Mining Colonies</span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Specialized multi-agent colonies operating 24/7 across ingestion, analytics, multiplication, partnerships, and revenue.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
          ● ALL 14 COLONIES SYNCHRONIZED
        </span>
      </div>

      {successNote && (
        <div className="p-3.5 rounded-2xl bg-cyan-950 border border-cyan-500 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Grid of 14 Colonies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 font-mono text-xs">
        {colonies.map((colony) => {
          const isRunning = runningColonyId === colony.id;

          return (
            <div
              key={colony.id}
              className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 transition space-y-3 flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    {colony.division}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    {colony.efficiencyScore}% Opt.
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-white text-sm font-sans">{colony.name}</h4>
                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed mt-1">
                    {colony.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex justify-between text-[10px] text-zinc-500">
                  <span>Tasks Completed (24h):</span>
                  <span className="text-zinc-300 font-bold">{colony.tasksCompleted24h}</span>
                </div>

                <button
                  onClick={() => handleRunColonyCycle(colony)}
                  disabled={isRunning}
                  className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-cyan-300 hover:text-white border border-zinc-800 hover:border-cyan-500/30 text-[10px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                      <span>Running Colony Cycle...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>Trigger Colony Run</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
