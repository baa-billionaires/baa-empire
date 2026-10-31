import React, { useState } from 'react';
import {
  Kanban,
  CheckCircle,
  Clock,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Calendar,
  AlertTriangle,
  Award,
  Filter,
  ExternalLink,
  Plus,
  ArrowRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { DealRecord, PipelineStage } from '../../types/dealRoom';

interface UnifiedDealPipelineCRMProps {
  deals: DealRecord[];
  onAdvanceDealStage: (dealId: string, nextStage: PipelineStage) => void;
  onUpdateActualRevenue: (dealId: string, amount: number, evidenceUrl?: string) => void;
  isAdmin?: boolean;
}

export const PIPELINE_STAGES: Array<{ id: PipelineStage; label: string; color: string }> = [
  { id: 'discovered', label: '1. Discovered', color: 'border-zinc-700 bg-zinc-900/60' },
  { id: 'source_verified', label: '2. Verified Source', color: 'border-cyan-800 bg-cyan-950/30' },
  { id: 'eligibility_checked', label: '3. Eligibility Passed', color: 'border-blue-800 bg-blue-950/30' },
  { id: 'matched', label: '4. Matched', color: 'border-indigo-800 bg-indigo-950/30' },
  { id: 'under_review', label: '5. Under Review', color: 'border-purple-800 bg-purple-950/30' },
  { id: 'contact_drafted', label: '6. Drafted', color: 'border-amber-800 bg-amber-950/30' },
  { id: 'approved', label: '7. Approved', color: 'border-emerald-800 bg-emerald-950/30' },
  { id: 'contacted', label: '8. Contacted', color: 'border-teal-800 bg-teal-950/30' },
  { id: 'response_received', label: '9. Response In', color: 'border-blue-800 bg-blue-950/30' },
  { id: 'proposal_in_progress', label: '10. Proposal Prep', color: 'border-amber-800 bg-amber-950/30' },
  { id: 'submitted', label: '11. Submitted', color: 'border-cyan-800 bg-cyan-950/30' },
  { id: 'negotiation', label: '12. Negotiation', color: 'border-purple-800 bg-purple-950/30' },
  { id: 'won', label: '13. WON / Awarded', color: 'border-emerald-600 bg-emerald-950/60 ring-1 ring-emerald-500/50' },
  { id: 'lost', label: '14. Concluded / Other', color: 'border-zinc-800 bg-zinc-950/40' }
];

export const UnifiedDealPipelineCRM: React.FC<UnifiedDealPipelineCRMProps> = ({
  deals,
  onAdvanceDealStage,
  onUpdateActualRevenue,
  isAdmin = false
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeDealModal, setActiveDealModal] = useState<DealRecord | null>(null);

  // Revenue Update Modal State
  const [revenueModalDeal, setRevenueModalDeal] = useState<DealRecord | null>(null);
  const [revenueInput, setRevenueInput] = useState<number>(0);
  const [evidenceInput, setEvidenceInput] = useState<string>('');

  const filteredDeals = deals.filter(d => {
    return selectedCategoryFilter === 'all' || d.opportunityCategory === selectedCategoryFilter;
  });

  const totalEstimatedPipeline = filteredDeals.reduce((sum, d) => sum + d.estimatedValueUsd, 0);
  const totalActualWonRevenue = filteredDeals
    .filter(d => d.stage === 'won')
    .reduce((sum, d) => sum + d.confirmedActualRevenueUsd, 0);

  const handleStageStep = (dealId: string, currentStage: PipelineStage, direction: 'next' | 'prev') => {
    const currentIdx = PIPELINE_STAGES.findIndex(s => s.id === currentStage);
    if (currentIdx === -1) return;

    if (direction === 'next' && currentIdx < PIPELINE_STAGES.length - 1) {
      onAdvanceDealStage(dealId, PIPELINE_STAGES[currentIdx + 1].id);
    } else if (direction === 'prev' && currentIdx > 0) {
      onAdvanceDealStage(dealId, PIPELINE_STAGES[currentIdx - 1].id);
    }
  };

  const handleSaveConfirmedRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revenueModalDeal) return;

    onUpdateActualRevenue(revenueModalDeal.id, Number(revenueInput), evidenceInput.trim());
    setRevenueModalDeal(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & VALUE SEPARATION BAR */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Unified 14-Stage Deal Pipeline & CRM</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
              {filteredDeals.length} Deals
            </span>
          </h2>
          <p className="text-xs text-zinc-400">
            From initial discovery to proposal, formal tender review, negotiation, and confirmed revenue execution.
          </p>
        </div>

        {/* Financial Discipline Banner (Strict Separation of Estimated vs Actual) */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 min-w-[150px]">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block">Estimated Pipeline</span>
            <span className="text-lg font-black text-cyan-400">
              ${totalEstimatedPipeline.toLocaleString()}
            </span>
            <span className="text-[9px] text-zinc-500 block">Forecast Value</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 min-w-[150px]">
            <span className="text-[10px] font-mono uppercase text-emerald-400 block font-semibold">Confirmed Won Revenue</span>
            <span className="text-lg font-black text-emerald-300">
              ${totalActualWonRevenue.toLocaleString()}
            </span>
            <span className="text-[9px] text-zinc-400 block">Audited & Invoiced</span>
          </div>
        </div>
      </div>

      {/* PIPELINE KANBAN VIEW */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>14-Stage Lifecycle Progression (Click arrows to transition stages):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {filteredDeals.map(deal => {
            const currentStageObj = PIPELINE_STAGES.find(s => s.id === deal.stage) || PIPELINE_STAGES[0];
            const isWon = deal.stage === 'won';

            return (
              <div
                key={deal.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3.5 shadow-lg ${
                  isWon ? 'bg-gradient-to-b from-emerald-950/40 to-zinc-900 border-emerald-600/60 ring-1 ring-emerald-500/30' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="space-y-2">
                  {/* Top Category Badge */}
                  <div className="flex items-start justify-between gap-1 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 capitalize truncate">
                      {deal.opportunityCategory.replace('_', ' ')}
                    </span>
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      isWon ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-[#FFD700]'
                    }`}>
                      {currentStageObj.label.split('. ')[1]}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-white text-xs line-clamp-2 leading-snug">
                    {deal.title}
                  </h4>

                  {/* Estimated vs Confirmed Value */}
                  <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Est. Value:</span>
                      <span className="text-cyan-400 font-bold">${deal.estimatedValueUsd.toLocaleString()}</span>
                    </div>
                    {deal.confirmedActualRevenueUsd > 0 && (
                      <div className="flex justify-between text-emerald-400 font-bold border-t border-zinc-800 pt-1">
                        <span>Actual Confirmed:</span>
                        <span>${deal.confirmedActualRevenueUsd.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Operational Telemetry */}
                  <div className="text-[10px] text-zinc-400 font-mono space-y-0.5">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Staff Effort:</span>
                      <span>{deal.staffHoursLogged} hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">App Cost:</span>
                      <span>${deal.applicationCostUsd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Deadline:</span>
                      <span className="text-amber-400">{deal.submissionDeadline}</span>
                    </div>
                  </div>

                  {/* Next Action Box */}
                  <div className="p-2 rounded-lg bg-zinc-950/60 border border-zinc-800 text-[10px] text-zinc-300">
                    <span className="text-zinc-500 uppercase text-[9px] block">Next Action:</span>
                    <p className="line-clamp-2 text-zinc-300">{deal.nextActionDescription}</p>
                  </div>
                </div>

                {/* Stage Advancement Controls */}
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleStageStep(deal.id, deal.stage, 'prev')}
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    title="Previous Stage"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {/* Record confirmed revenue button */}
                    {isWon ? (
                      <button
                        onClick={() => {
                          setRevenueModalDeal(deal);
                          setRevenueInput(deal.confirmedActualRevenueUsd || deal.estimatedValueUsd);
                          setEvidenceInput(deal.verifiedEvidenceLink || '');
                        }}
                        className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-mono hover:bg-emerald-900"
                        title="Update confirmed actual contract or funding revenue"
                      >
                        Log Revenue
                      </button>
                    ) : (
                      <button
                        onClick={() => setActiveDealModal(deal)}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono hover:bg-zinc-700"
                      >
                        Inspect
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleStageStep(deal.id, deal.stage, 'next')}
                    className="p-1 rounded bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold"
                    title="Advance to Next Stage"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CONFIRMED REVENUE RECORDING MODAL */}
      {revenueModalDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-4 text-xs text-slate-100">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Record Confirmed Actual Revenue</span>
            </h3>
            <p className="text-zinc-400">
              For deal: <span className="text-white font-semibold">{revenueModalDeal.title}</span>.
              Only record funding actually credited or contracts officially executed.
            </p>

            <form onSubmit={handleSaveConfirmedRevenue} className="space-y-3">
              <div>
                <label className="text-zinc-400 block mb-1 font-mono">Confirmed Revenue Amount ($ USD) *</label>
                <input
                  type="number"
                  required
                  value={revenueInput}
                  onChange={(e) => setRevenueInput(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 font-mono">Verification Evidence Link (Public Receipt / Contract Link)</label>
                <input
                  type="url"
                  value={evidenceInput}
                  onChange={(e) => setEvidenceInput(e.target.value)}
                  placeholder="https://base.org/grants/receipt/..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setRevenueModalDeal(null)}
                  className="px-3 py-1.5 bg-zinc-800 text-zinc-400 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg"
                >
                  Save Confirmed Revenue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
