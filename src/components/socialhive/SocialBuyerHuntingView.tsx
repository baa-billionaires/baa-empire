import React, { useState } from 'react';
import {
  Globe,
  Briefcase,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Zap,
  RefreshCw,
  Handshake,
  Coins
} from 'lucide-react';
import { SocialBuyerOpportunity } from '../../types/socialHive';

interface SocialBuyerHuntingViewProps {
  opportunities: SocialBuyerOpportunity[];
  onAdvanceDeal: (opportunityId: string, nextStage: string) => Promise<void>;
}

export const SocialBuyerHuntingView: React.FC<SocialBuyerHuntingViewProps> = ({
  opportunities,
  onAdvanceDeal
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [advancingId, setAdvancingId] = useState<string | null>(null);

  const handleAdvance = async (opp: SocialBuyerOpportunity) => {
    let next = 'Proposal Sent';
    if (opp.dealStage === 'Matched') next = 'Proposal Sent';
    else if (opp.dealStage === 'Proposal Sent') next = 'In Negotiation';
    else if (opp.dealStage === 'In Negotiation') next = 'Signed Agreement';
    else if (opp.dealStage === 'Signed Agreement') next = 'Settled via Paystack';
    else return;

    setAdvancingId(opp.id);
    try {
      await onAdvanceDeal(opp.id, next);
    } catch (err: any) {
      alert(err.message || 'Error updating deal');
    } finally {
      setAdvancingId(null);
    }
  };

  const filteredOpps = opportunities.filter((o) => {
    return filterType === 'all' || o.buyerType === filterType;
  });

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Settled via Paystack':
      case 'Signed Agreement':
        return 'bg-emerald-950 text-[#00FF88] border-emerald-500/40';
      case 'In Negotiation':
        return 'bg-amber-950 text-amber-300 border-amber-500/40';
      case 'Proposal Sent':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-heading font-black text-white">
              Global Social Buyer-Hunting System
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Autonomous matchmaker routing brands, AI labs, publishers, and enterprises directly to creator assets.
          </p>
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 outline-none focus:border-cyan-400 cursor-pointer"
        >
          <option value="all">All Buyer Mandates</option>
          <option value="AI Training Labs">AI Training Labs</option>
          <option value="Enterprise Assistant">Enterprise Assistant</option>
          <option value="Publishing House">Publishing House</option>
          <option value="Content Licensing">Content Licensing</option>
          <option value="Brand Sponsorship">Brand Sponsorship</option>
        </select>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
        {filteredOpps.map((opp) => {
          const isBusy = advancingId === opp.id;
          const isSettled = opp.dealStage === 'Settled via Paystack';

          return (
            <div
              key={opp.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {opp.buyerType}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStageBadge(opp.dealStage)}`}>
                    {opp.dealStage}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-sans">{opp.organizationName}</h4>
                  <span className="text-[11px] text-zinc-400 font-mono block mt-0.5">
                    Targeted Platform: <strong className="text-white uppercase">{opp.targetedPlatform}</strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Target Asset:</span>
                    <span className="text-white font-bold truncate max-w-[200px]">{opp.matchedAssetTitle}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Procurement Budget:</span>
                    <span className="text-emerald-400 font-bold">
                      ${opp.budgetUsd.toLocaleString()} USD (₦{opp.budgetNgn.toLocaleString()} NGN)
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Matchmaker Fit:</span>
                    <span className="text-amber-400 font-bold">{opp.matchScore} / 100</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-[11px] text-zinc-400 font-sans leading-relaxed">
                  <strong className="text-zinc-300 font-mono">Status Note: </strong>
                  {opp.lastAction}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <button
                  onClick={() => handleAdvance(opp)}
                  disabled={isBusy || isSettled}
                  className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer ${
                    isSettled
                      ? 'bg-emerald-950/80 text-[#00FF88] border border-emerald-500/40 cursor-default'
                      : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:brightness-110 active:scale-95 text-black shadow-lg shadow-cyan-500/20'
                  }`}
                >
                  {isBusy ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Updating Deal Pipeline...</span>
                    </>
                  ) : isSettled ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Settled via Paystack (70% Paid)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>
                        Advance: {opp.dealStage === 'Matched' ? 'Send Proposal' : opp.dealStage === 'Proposal Sent' ? 'Enter Negotiation' : 'Sign & Settle via Paystack'}
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
  );
};
