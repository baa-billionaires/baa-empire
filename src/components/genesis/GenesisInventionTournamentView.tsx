import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Plus,
  Play,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { InventionTournament, MindHiveGenesisState } from '../../types/mindHiveGenesis';

interface GenesisInventionTournamentViewProps {
  state: MindHiveGenesisState;
  onRefresh: () => void;
}

export const GenesisInventionTournamentView: React.FC<GenesisInventionTournamentViewProps> = ({
  state,
  onRefresh
}) => {
  const { tournaments } = state;
  const [activeTournamentId, setActiveTournamentId] = useState<string>(tournaments[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [probTitle, setProbTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [domain, setDomain] = useState('Sub-Zero Cold Chain & IoT');
  const [prizePool, setPrizePool] = useState('8000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeTournament = tournaments.find((t) => t.id === activeTournamentId) || tournaments[0];

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!probTitle || !brief) {
      alert('Please fill out problem title and brief');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/genesis/tournaments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: probTitle,
          challengeBrief: brief,
          targetDomain: domain,
          prizePoolUsd: prizePool,
          candidateNames: ['Candidate Alpha Swarm', 'Candidate Beta Mesh']
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        setShowCreateModal(false);
        setProbTitle('');
        setBrief('');
      } else {
        alert(data.error || 'Failed to create tournament');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 mb-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Evolution Lab Benchmarks
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Controlled Competitive Prototyping
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Invention Tournament Arena
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Allowing multiple competing solutions to solve the same problem under transparent, equalized testing conditions.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Launch New Tournament
        </button>
      </div>

      {/* Active Tournament Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto my-4 pb-2">
        {tournaments.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTournamentId(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTournament?.id === t.id
                ? 'bg-purple-500/20 border border-purple-500 text-purple-300'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t.problemTitle}
          </button>
        ))}
      </div>

      {activeTournament && (
        <div className="space-y-6">
          {/* Tournament Overview Card */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-purple-400 font-bold uppercase">{activeTournament.targetDomain}</div>
              <h4 className="text-base font-bold text-white mt-0.5">{activeTournament.problemTitle}</h4>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{activeTournament.challengeBrief}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-400">Prize Pool & Grant:</span>
              <div className="text-lg font-black text-amber-300 font-mono">
                ${activeTournament.prizePoolUsd.toLocaleString()} USD
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                {activeTournament.status}
              </span>
            </div>
          </div>

          {/* Competing Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeTournament.candidates.map((cand) => (
              <div
                key={cand.candidateId}
                className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold flex items-center justify-center border border-purple-500/30">
                          #{cand.rank}
                        </span>
                        <h5 className="text-sm font-bold text-white">{cand.ventureName}</h5>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Contributor: {cand.contributorName}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      Score: {cand.overallWeightedScore}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    {cand.approachSummary}
                  </p>

                  {/* Objective Evidence Scoring Bars */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                        <span>Technical Reliability:</span>
                        <span className="text-white font-mono">{cand.technicalReliabilityScore}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${cand.technicalReliabilityScore}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                        <span>Customer Feedback Score:</span>
                        <span className="text-white font-mono">{cand.customerFeedbackScore}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${cand.customerFeedbackScore}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                        <span>Unit Cost Efficiency:</span>
                        <span className="text-white font-mono">{cand.unitCostScore}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: `${cand.unitCostScore}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                        <span>Verified Demand Evidence:</span>
                        <span className="text-white font-mono">{cand.demandEvidenceScore ?? cand.verifiedDemandEvidenceScore}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-400 h-full rounded-full" style={{ width: `${cand.demandEvidenceScore ?? cand.verifiedDemandEvidenceScore}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Controlled Budget: ${cand.controlledBudgetAllocatedUsd.toFixed(2)}</span>
                  <span className="text-emerald-400 font-bold">Transparent Conditions Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for creating a new tournament */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-purple-500/40 p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Launch Invention Tournament</h4>
            <p className="text-xs text-slate-400 mb-4">Set defined problem parameters and budget for competing candidate swarms.</p>

            <form onSubmit={handleCreateTournament} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Problem Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sub-Zero Cold Chain Monitoring"
                  value={probTitle}
                  onChange={(e) => setProbTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Challenge Brief</label>
                <textarea
                  rows={3}
                  placeholder="Describe technical objectives and testing conditions..."
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Domain</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Prize Pool ($)</label>
                  <input
                    type="number"
                    value={prizePool}
                    onChange={(e) => setPrizePool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  {isSubmitting ? 'Launching...' : 'Deploy Tournament'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
