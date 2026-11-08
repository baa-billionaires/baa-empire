import React, { useState } from 'react';
import {
  Globe,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Send,
  Zap,
  Sparkles,
  RefreshCw,
  FileText
} from 'lucide-react';
import { BuyerLeadProspect, BuyerLegionType } from '../../types/mindHiveV20';

interface BuyerLegionsSectionProps {
  buyerLeads: BuyerLeadProspect[];
  onAdvanceDeal: (leadId: string, nextStage: string) => Promise<void>;
}

export const BuyerLegionsSection: React.FC<BuyerLegionsSectionProps> = ({
  buyerLeads,
  onAdvanceDeal
}) => {
  const [selectedLegion, setSelectedLegion] = useState<string>('all');
  const [isAdvancingId, setIsAdvancingId] = useState<string | null>(null);

  const legionsList = [
    { type: 'all', name: 'All 8 Legions' },
    { type: 'ai_labs', name: '1. AI Labs & Frontier Research' },
    { type: 'enterprise_training', name: '2. Corporate Enterprise Training' },
    { type: 'universities', name: '3. Global Higher Ed & Universities' },
    { type: 'publishing', name: '4. Publishing Houses & Audio' },
    { type: 'think_tanks', name: '5. Specialized Think Tanks' },
    { type: 'advisory_consulting', name: '6. HNW Advisory & Consulting' },
    { type: 'edtech', name: '7. EdTech & Certifications' },
    { type: 'autonomous_procurement', name: '8. Autonomous AI Agent Procurement' }
  ];

  const handleAdvance = async (lead: BuyerLeadProspect) => {
    let next = 'Pitch Sent';
    if (lead.dealStage === 'Matched') next = 'Pitch Sent';
    else if (lead.dealStage === 'Pitch Sent') next = 'Negotiating';
    else if (lead.dealStage === 'Negotiating') next = 'Contract Closed';
    else if (lead.dealStage === 'Contract Closed') next = 'Escrow Funded';
    else return;

    setIsAdvancingId(lead.id);
    try {
      await onAdvanceDeal(lead.id, next);
    } catch (err) {
      console.error(err);
      alert('Failed to advance deal.');
    } finally {
      setIsAdvancingId(null);
    }
  };

  const filteredLeads = buyerLeads.filter((lead) => {
    return selectedLegion === 'all' || lead.legionType === selectedLegion;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Contract Closed':
      case 'Escrow Funded':
        return 'bg-emerald-950 text-[#00FF88] border-emerald-500/40';
      case 'Negotiating':
        return 'bg-amber-950 text-amber-300 border-amber-500/40';
      case 'Pitch Sent':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <Globe className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-blue-400 uppercase bg-blue-950/60 px-3 py-1 rounded-full border border-blue-500/40">
                8 BUYER-HUNTING LEGIONS
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Autonomous Deal Discovery &amp; Commercial Pipeline
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              "Never wait for buyers. Deploy 8 autonomous legions that hunt, match, negotiate, and close."
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 font-bold">
              ● Matchmaker Algorithm Active
            </span>
          </div>
        </div>

        {/* Legion Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {legionsList.map((leg) => {
            const isSelected = selectedLegion === leg.type;
            return (
              <button
                key={leg.type}
                onClick={() => setSelectedLegion(leg.type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-blue-500 text-black shadow-lg shadow-blue-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {leg.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Pipeline Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            <span>Active Buyer Mandates ({filteredLeads.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            Real-Time Verified Purchase Demand
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {filteredLeads.map((lead) => {
            const isBusy = isAdvancingId === lead.id;
            const isCompleted = lead.dealStage === 'Contract Closed' || lead.dealStage === 'Escrow Funded';

            return (
              <div
                key={lead.id}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-blue-500/40 transition space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <span>{lead.flag}</span>
                      <span>{lead.country}</span>
                    </span>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStageColor(
                        lead.dealStage
                      )}`}
                    >
                      {lead.dealStage}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white font-sans">
                      {lead.organizationName}
                    </h4>
                    <span className="text-[11px] text-blue-300 font-mono block mt-0.5">
                      {lead.legionName}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-[11px]">
                    <div className="flex justify-between text-zinc-400">
                      <span>Targeted Category:</span>
                      <span className="text-white font-bold">{lead.targetedAssetCategory}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Verified Acquisition Budget:</span>
                      <span className="text-emerald-400 font-bold">
                        ${lead.budgetUsd.toLocaleString()} USD (₦{lead.budgetNgn.toLocaleString()} NGN)
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Matchmaker Score:</span>
                      <span className="text-amber-400 font-bold">{lead.matchScore} / 100</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Urgency:</span>
                      <span className="text-cyan-300 font-bold">{lead.urgency}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-[11px] text-zinc-400 font-sans leading-relaxed">
                    <strong className="text-zinc-300 font-mono">Latest Action:</strong> {lead.lastAction}
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => handleAdvance(lead)}
                    disabled={isBusy || isCompleted}
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-950/80 text-[#00FF88] border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:brightness-110 active:scale-95 text-white shadow-lg shadow-blue-500/20'
                    }`}
                  >
                    {isBusy ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>Closing Deal with Paystack Escrow...</span>
                      </>
                    ) : isCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Contract Closed &amp; 70% Royalties Deposited</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>
                          Advance to{' '}
                          {lead.dealStage === 'Matched'
                            ? 'Pitch Sent'
                            : lead.dealStage === 'Pitch Sent'
                            ? 'Negotiating'
                            : 'Close Contract ($' + lead.budgetUsd.toLocaleString() + ')'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
