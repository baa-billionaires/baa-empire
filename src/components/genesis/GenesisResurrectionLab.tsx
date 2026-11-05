import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Cpu,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Search,
  Plus
} from 'lucide-react';
import { BusinessResurrectionReview, MindHiveGenesisState } from '../../types/mindHiveGenesis';

interface GenesisResurrectionLabProps {
  state: MindHiveGenesisState;
  onRefresh: () => void;
}

export const GenesisResurrectionLab: React.FC<GenesisResurrectionLabProps> = ({
  state,
  onRefresh
}) => {
  const { resurrectionReviews } = state;
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Review form states
  const [assetName, setAssetName] = useState('');
  const [creator, setCreator] = useState('');
  const [reason, setReason] = useState<'HIGH_SERVER_COST' | 'MARKETING_DROPOFF' | 'MISSING_API_INTEGRATION' | 'UNPROFITABLE_UNIT_ECONOMICS'>('HIGH_SERVER_COST');
  const [codeLines, setCodeLines] = useState('15000');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName) {
      alert('Asset name is required');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/genesis/resurrection/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetName,
          originalCreator: creator || 'Independent Developer',
          stalledReason: reason,
          codeLines
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        setShowReviewModal(false);
        setAssetName('');
        setCreator('');
      } else {
        alert(data.error || 'Failed to submit resurrection review');
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
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Autonomous Software Asset Recovery
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Due-Diligence & Codebase Diagnostic
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-400" />
            Autonomous Business Resurrection Laboratory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluating stalled or underperforming products to salvage valuable source code, re-architect unit economics, and relaunch with colony infrastructure.
          </p>
        </div>

        <button
          onClick={() => setShowReviewModal(true)}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Review Stalled Asset
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {resurrectionReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">{rev.assetName}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {rev.recommendation.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mb-3">
                Original Author: {rev.originalCreator} · Bottleneck: {rev.stalledReason.replace(/_/g, ' ')}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-3 text-xs">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Source Lines:</span>
                  <div className="font-bold text-white font-mono">{rev.availableSourceCodeLines.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Condition Score:</span>
                  <div className="font-bold text-cyan-300 font-mono">{rev.technicalConditionScore}/100</div>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Residual Traffic:</span>
                  <div className="font-bold text-emerald-400 font-mono">{rev.activeResidualTraffic} users/mo</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex justify-between items-center text-slate-300">
                <span>Relaunch Cost: <strong className="text-rose-400 font-mono">${rev.estimatedRelaunchCostUsd}</strong></span>
                <span>Projected Recovery: <strong className="text-emerald-400 font-mono">${rev.projectedRecoverableRevenueUsd.toLocaleString()} USD</strong></span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Ownership Rights Clear
              </span>
              <span className="text-xs font-semibold text-amber-400">
                Requires Stage 7 Consent for Acquisition
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-amber-500/40 p-6 shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Review Stalled Asset</h4>
            <p className="text-xs text-slate-400 mb-4">Diagnostic appraisal of existing codebases for repair, micro-API conversion, or fusion.</p>

            <form onSubmit={handleCreateReview} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Asset / Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. EstateShield Visitor App"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Original Creator / Guild</label>
                <input
                  type="text"
                  placeholder="e.g. UrbanTech Studio"
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Stalled Bottleneck</label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="HIGH_SERVER_COST">High Server Cost</option>
                    <option value="MARKETING_DROPOFF">Marketing Dropoff</option>
                    <option value="MISSING_API_INTEGRATION">Missing Integration</option>
                    <option value="UNPROFITABLE_UNIT_ECONOMICS">Unit Economics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Source Code Lines</label>
                  <input
                    type="number"
                    value={codeLines}
                    onChange={(e) => setCodeLines(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  {isSubmitting ? 'Evaluating...' : 'Generate Appraisal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
