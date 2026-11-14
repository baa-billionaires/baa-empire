import React from 'react';
import { GitFork, Cpu, Smartphone, ShieldCheck } from 'lucide-react';
import { M2MMachine, M2MSwarmColony } from '../../types/m2mOre';

interface M2MGenealogyTreeProps {
  machines: M2MMachine[];
  colonies: M2MSwarmColony[];
  onSelectMachine: (machine: M2MMachine) => void;
}

export const M2MGenealogyTree: React.FC<M2MGenealogyTreeProps> = ({
  machines,
  colonies,
  onSelectMachine
}) => {
  const mothers = machines.filter((m) => m.category === 'Mother Bot');
  const independent = machines.filter((m) => m.category !== 'Mother Bot' && !m.parentMachineId);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
            <GitFork className="w-4 h-4 text-emerald-400" />
            <span>Registered Machine Genealogy Tree</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Displays actual registered parent Mother Bots, provisioned Child Specialists, and independent devices. Click any node to open its Digital Passport.
          </p>
        </div>
        <div className="text-xs font-mono text-zinc-400 tabular-nums">
          {mothers.length} Mother · {machines.filter((m) => Boolean(m.parentMachineId)).length} Children · {colonies.length} Colonies
        </div>
      </div>

      {/* Mother -> Child Trees */}
      <div className="space-y-6">
        {mothers.map((mother) => {
          const children = machines.filter((m) => m.parentMachineId === mother.id);
          const colony = colonies.find((c) => c.id === mother.colonyId);

          return (
            <div key={mother.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5">
              {/* Root Mother Bot Node */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <button
                  type="button"
                  onClick={() => onSelectMachine(mother)}
                  className="text-left group cursor-pointer space-y-1"
                >
                  <div className="text-[11px] font-mono text-emerald-400">
                    Mother Bot Root · {mother.machineCode} · Cap {children.length}/{mother.maxChildren}
                  </div>
                  <div className="text-lg font-heading font-bold text-white group-hover:text-emerald-400 transition flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{mother.name}</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    {mother.specialization} · Colony: {colony?.name || 'Unassigned'} · Status: {mother.operationalStatus}
                  </div>
                </button>

                <div className="flex items-center gap-6 font-mono text-xs tabular-nums">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Reputation</span>
                    <span className="text-white font-semibold">{mother.reputationScore}/100</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">Parent Royalties</span>
                    <span className="text-emerald-400 font-semibold">${mother.totalEarningsUsd.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[10px]">OpEx</span>
                    <span className="text-zinc-300">${mother.operatingExpensesUsd.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Child Nodes Grid with Visual Tree Stem */}
              {children.length === 0 ? (
                <div className="text-xs font-mono text-zinc-500 py-4 text-center">
                  No child machines provisioned under {mother.machineCode} yet. Submit an evidence-based breeding request when demand warrants expansion.
                </div>
              ) : (
                <div className="pl-4 sm:pl-8 space-y-3 border-l border-zinc-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {children.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => onSelectMachine(child)}
                        className="text-left p-4 rounded-xl bg-black/70 border border-zinc-800 hover:border-cyan-500/60 transition cursor-pointer space-y-2"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-cyan-400 font-semibold">{child.machineCode}</span>
                          <span
                            className={
                              child.operationalStatus === 'paused' || child.operationalStatus === 'retired'
                                ? 'text-amber-400 uppercase'
                                : 'text-emerald-400 uppercase'
                            }
                          >
                            {child.operationalStatus}
                          </span>
                        </div>

                        <div className="font-heading font-bold text-sm text-white truncate" title={child.name}>
                          {child.name}
                        </div>

                        <div className="text-[11px] font-mono text-zinc-400 truncate">
                          {child.specialization}
                        </div>

                        <div className="pt-2 border-t border-zinc-900 grid grid-cols-3 gap-2 text-[11px] font-mono tabular-nums">
                          <div>
                            <span className="text-zinc-500 block text-[9px]">Earned</span>
                            <span className="text-emerald-400 font-semibold">${child.totalEarningsUsd.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[9px]">Rep</span>
                            <span className="text-white">{child.reputationScore}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block text-[9px]">Jobs</span>
                            <span className="text-zinc-300">{child.completedJobsCount}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Independent / Robot Miner Devices */}
        {independent.length > 0 && (
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="text-xs font-mono text-zinc-400 uppercase">
              Independent &amp; Consented Robot Miner Nodes ({independent.length})
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {independent.map((dev) => (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => onSelectMachine(dev)}
                  className="text-left p-4 rounded-xl bg-black/70 border border-zinc-800 hover:border-emerald-500/50 transition cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-300 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                      {dev.machineCode}
                    </span>
                    <span className="text-emerald-400 uppercase">{dev.operationalStatus}</span>
                  </div>
                  <div className="font-heading font-bold text-sm text-white">{dev.name}</div>
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{dev.passport.passportSerial}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
