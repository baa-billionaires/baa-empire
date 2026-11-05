import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  Shield,
  DollarSign,
  Share2
} from 'lucide-react';
import { ColonyFusionProposal, MindHiveGenesisState } from '../../types/mindHiveGenesis';

interface GenesisColonyFusionReactorProps {
  state: MindHiveGenesisState;
  onRefresh: () => void;
  onOpenApprovals: () => void;
}

export const GenesisColonyFusionReactor: React.FC<GenesisColonyFusionReactorProps> = ({
  state,
  onRefresh,
  onOpenApprovals
}) => {
  const { fusionProposals } = state;
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Compose form states
  const [fusionName, setFusionName] = useState('');
  const [description, setDescription] = useState('');
  const [targetMarket, setTargetMarket] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateFusion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fusionName || !description) {
      alert('Fusion name and description are required');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/genesis/fusion/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fusionName,
          description,
          targetMarket: targetMarket || 'Cross-Colony Enterprise Market'
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        setShowComposeModal(false);
        setFusionName('');
        setDescription('');
        onOpenApprovals();
      } else {
        alert(data.error || 'Failed to submit fusion proposal');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 mb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Symbiosis Colony Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Cross-Colony Capability Synthesizer
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            Colony Fusion Reactor
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Combining validated capabilities from CE Colony, Code Vein, Aurum Colony, and Mind Hive without destroying original contributor attribution.
          </p>
        </div>

        <button
          onClick={() => setShowComposeModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Propose Colony Fusion
        </button>
      </div>

      {/* Active Fusion Proposals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {fusionProposals.map((prop) => (
          <div
            key={prop.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Compatibility: {prop.compatibilityScore}%
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {prop.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-1">{prop.fusionName}</h4>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">{prop.description}</p>
              <div className="text-[11px] text-slate-400 mb-3">Target: {prop.targetMarket}</div>

              {/* Source Colonies Capabilities */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Synthesized Colonies & Capabilities:
                </span>
                {prop.sourceCapabilities.map((sc, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-slate-950 border border-slate-800 text-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        {sc.colony.replace('_V12', '').replace('_V13', '').replace('_V17', '')}
                      </span>
                      <span className="text-slate-200">{sc.assetName}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Rights Verified
                    </span>
                  </div>
                ))}
              </div>

              {/* Revenue Sharing Splits */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                  Agreed Contributor Revenue Splits:
                </span>
                <div className="space-y-1">
                  {prop.revenueSharingAgreement.map((rsa, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>{rsa.partyName}:</span>
                      <span className="font-bold text-emerald-400 font-mono">{rsa.sharePercent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[10px]">Zero erasure of original provenance</span>
              {prop.status === 'AWAITING_APPROVAL' && (
                <button
                  onClick={onOpenApprovals}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                >
                  Review in Stage 7 Gate <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for creating a new fusion proposal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-emerald-500/40 p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Propose Colony Fusion</h4>
            <p className="text-xs text-slate-400 mb-4">Combine existing capabilities across all four UA-AIDC modules into a new venture.</p>

            <form onSubmit={handleCreateFusion} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Fusion Name</label>
                <input
                  type="text"
                  placeholder="e.g. BioFreight Cold-Pharma Swarm"
                  value={fusionName}
                  onChange={(e) => setFusionName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Description & Integration Angle</label>
                <textarea
                  rows={3}
                  placeholder="Describe how CE Colony compute, Code Vein APIs, and Aurum rails combine..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Market</label>
                <input
                  type="text"
                  placeholder="e.g. Specialized Medical Logistics"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-2.5 rounded bg-slate-950 text-[10px] text-slate-400 leading-relaxed border border-slate-800">
                🔒 Contributor terms draft with 50% primary inventor / 20% node host / 30% grid reserve split.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
