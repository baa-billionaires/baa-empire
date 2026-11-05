import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Lock,
  ExternalLink,
  Cpu,
  Coins
} from 'lucide-react';
import { AurumApprovalRequest, AurumState } from '../../types/aurum';

interface AurumTransactionApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AurumState;
  onRefreshState: () => void;
}

export const AurumTransactionApprovalModal: React.FC<AurumTransactionApprovalModalProps> = ({
  isOpen,
  onClose,
  state,
  onRefreshState
}) => {
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [lastTxHash, setLastTxHash] = useState<{ id: string; txHash: string } | null>(null);

  if (!isOpen) return null;

  const pendingApprovals = state.approvals.filter((a) => a.status === 'PENDING');

  const handleResolve = async (id: string, decision: 'APPROVED' | 'REJECTED') => {
    setResolvingId(id);
    try {
      const res = await fetch(`/api/aurum/approvals/${id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision })
      });
      const data = await res.json();
      if (data.success) {
        if (data.txHash) {
          setLastTxHash({ id, txHash: data.txHash });
        }
        onRefreshState();
      } else {
        alert(data.error || 'Failed to resolve approval');
      }
    } catch (err: any) {
      alert(err.message || 'Error resolving approval');
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Stage 7: Mandatory Human Approval Gate</h3>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {pendingApprovals.length} Pending
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Zero autonomous execution of funds or outreach. Explicit human signature required.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Pending Approvals */}
        <div className="my-4 overflow-y-auto space-y-4 pr-1 flex-1">
          {pendingApprovals.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/50 rounded-xl border border-slate-800/80">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2 opacity-80" />
              <h4 className="text-sm font-bold text-white">All Clear — No Pending Approvals</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Autonomous agents are monitoring networks and pipelines. New transactions requiring your signature will appear here.
              </p>
            </div>
          ) : (
            pendingApprovals.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/25 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {req.actionType}
                    </span>
                    <span className="text-xs font-bold text-white">{req.targetResource}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Agent: <span className="text-slate-200 font-semibold">{req.agentName}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {req.details}
                </p>

                {req.payloadPreview && (
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-amber-400/90 truncate mb-3">
                    Payload: {req.payloadPreview}
                  </div>
                )}

                {req.estimatedFeeUsd !== undefined && (
                  <div className="text-xs text-slate-400 mb-3 flex items-center justify-between">
                    <span>Estimated Gas Fee:</span>
                    <span className="text-white font-mono font-bold">${req.estimatedFeeUsd.toFixed(2)} USD</span>
                  </div>
                )}

                {lastTxHash && lastTxHash.id === req.id && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-3 flex items-center justify-between">
                    <span>Confirmed Tx Hash: {lastTxHash.txHash.slice(0, 16)}...</span>
                    <span className="font-bold text-[10px] uppercase">Broadcasting</span>
                  </div>
                )}

                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    onClick={() => handleResolve(req.id, 'REJECTED')}
                    disabled={resolvingId === req.id}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleResolve(req.id, 'APPROVED')}
                    disabled={resolvingId === req.id}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {resolvingId === req.id ? 'Authorizing...' : 'Authorize & Broadcast'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Security Protocol: BAA Universal Autonomous AI Infrastructure Grid</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
