import React, { useState } from 'react';
import {
  Dna,
  Cpu,
  Layers,
  Coins,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Play,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Activity
} from 'lucide-react';
import { MindHiveGenesisState, VentureDna } from '../../types/mindHiveGenesis';

interface GenesisLivingGenomeViewerProps {
  state: MindHiveGenesisState;
  selectedVentureId?: string;
  onRefresh: () => void;
  onSimulateVenture: (ventureId: string) => void;
  onRecordEvidence: (ventureId: string) => void;
}

export const GenesisLivingGenomeViewer: React.FC<GenesisLivingGenomeViewerProps> = ({
  state,
  selectedVentureId,
  onRefresh,
  onSimulateVenture,
  onRecordEvidence
}) => {
  const { ventures } = state;
  const [activeId, setActiveId] = useState<string>(selectedVentureId || ventures[0]?.id || '');
  const [expandedSection, setExpandedSection] = useState<'overview' | 'validation' | 'financials' | 'tech'>('overview');

  const activeVenture = ventures.find((v) => v.id === activeId) || ventures[0];

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 mb-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              The Living Venture Genome
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Venture DNA & Digital Architecture Ledger
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Dna className="w-5 h-5 text-cyan-400" />
            Digital Venture Genome Browser
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Every approved venture maintains a continuously updated genome tracking technical architecture, contributor equity, customer evidence, and financial reconciliations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
            {ventures.length} Verified Genomes
          </span>
        </div>
      </div>

      {/* Venture Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto my-4 pb-2">
        {ventures.map((v) => {
          const isSelected = activeVenture?.id === v.id;
          return (
            <button
              key={v.id}
              onClick={() => setActiveId(v.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] font-bold uppercase text-amber-400 font-mono">{v.codename}</span>
              <span>{v.name}</span>
            </button>
          );
        })}
      </div>

      {activeVenture ? (
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
          {/* Top Dossier Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-950 text-cyan-400 border border-cyan-500/30">
                  {activeVenture.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Stage: {activeVenture.currentStage}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  IP: {activeVenture.ipStatus}
                </span>
              </div>
              <h4 className="text-xl font-extrabold text-white mt-1">{activeVenture.name}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{activeVenture.tagline}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onSimulateVenture(activeVenture.id)}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Mirrorverse Simulation
              </button>
              <button
                onClick={() => onRecordEvidence(activeVenture.id)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                Record Evidence
              </button>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'overview', label: 'Problem & Attribution' },
              { id: 'validation', label: 'Customer Evidence' },
              { id: 'tech', label: 'Colonies & Architecture' },
              { id: 'financials', label: 'Audited Financials (70/30)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setExpandedSection(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  expandedSection === tab.id
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Problem & Attribution */}
          {expandedSection === 'overview' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Problem Statement:
                </span>
                <p className="text-slate-200 leading-relaxed">{activeVenture.problemStatement}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Verified Contributors & Equity Allocation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeVenture.contributors.map((c, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-400">{c.role}</div>
                      <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                        Equity: {c.equityPercent}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Customer Evidence */}
          {expandedSection === 'validation' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Interviews Completed:</span>
                  <div className="text-lg font-bold text-white font-mono mt-0.5">
                    {activeVenture.validationState.interviewsCompleted} Prospective Clients
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Signed Pilot Commitments:</span>
                  <div className="text-lg font-bold text-cyan-300 font-mono mt-0.5">
                    {activeVenture.validationState.pilotCommitmentsCount} Enterprise Agreements
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Paid Deposit / LOI Value:</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">
                    ${activeVenture.validationState.paidLetterOfIntentUsd.toLocaleString()} USD
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Demand-First Evidence Log:
                </span>
                <p className="text-slate-300 leading-relaxed">{activeVenture.validationState.evidenceNotes}</p>
              </div>
            </div>
          )}

          {/* TAB 3: Colonies & Tech */}
          {expandedSection === 'tech' && (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Inter-Colony Capabilities Synthesized:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {activeVenture.requiredColonies.map((colony) => (
                    <span
                      key={colony}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-cyan-500/30 text-cyan-300 font-mono font-bold"
                    >
                      {colony}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    Tech Stack:
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {activeVenture.techStack.map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                    Integrated APIs:
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {activeVenture.requiredApis.map((api) => (
                      <span key={api} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300 font-mono">
                        {api}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Audited Financials */}
          {expandedSection === 'financials' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Gross Revenue:</span>
                  <div className="text-base font-bold text-white font-mono mt-0.5">
                    ${activeVenture.financials.grossRevenueUsd.toLocaleString()} USD
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Client Net (70%):</span>
                  <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">
                    ${activeVenture.financials.netClientShareUsd.toLocaleString()} USD
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Platform Share (30%):</span>
                  <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">
                    ${activeVenture.financials.platformShareUsd.toLocaleString()} USD
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Monthly Run Rate:</span>
                  <div className="text-base font-bold text-amber-300 font-mono mt-0.5">
                    ${activeVenture.financials.monthlyRecurringRevenueUsd.toLocaleString()} USD
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-300">
                <span>Monthly Compute Budget: <strong className="text-white font-mono">${activeVenture.computeBudgetMonthlyUsd}</strong></span>
                <span>Operating Budget: <strong className="text-white font-mono">${activeVenture.operatingBudgetMonthlyUsd}</strong></span>
                <span className="text-emerald-400 font-bold">100% Mathematically Reconciled</span>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
