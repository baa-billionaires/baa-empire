import React, { useState } from 'react';
import {
  X,
  Bot,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { CodeVeinState } from '../../types/codeVein';

interface CodeVeinAgentSwarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CodeVeinState;
  onRefresh: () => void;
}

export const CodeVeinAgentSwarmModal: React.FC<CodeVeinAgentSwarmModalProps> = ({
  isOpen,
  onClose,
  state,
  onRefresh
}) => {
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionMessage, setResolutionMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const pendingApprovals = state.approvals.filter(a => a.status === 'PENDING');

  const handleResolve = async (id: string, action: 'APPROVE' | 'REJECT') => {
    setResolvingId(id);
    setResolutionMessage(null);

    try {
      const res = await fetch(`/api/code-vein/approvals/${id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (data.success) {
        setResolutionMessage(data.message);
        onRefresh();
      }
    } catch (err: any) {
      setResolutionMessage(err.message || 'Failed to resolve approval');
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#07070E] border border-[#2A2A3E] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B0B14] border-b border-[#1E1E2E] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/30 text-[#A855F7]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  18 AUTONOMOUS AGENTS SWARM
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#00FF88] border border-emerald-500/30">
                  ALL OPERATIONAL
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Mandatory human consent gates enforced for all code merges, deploys, and payouts.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {resolutionMessage && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-[#00FF88] p-3 rounded text-xs font-mono">
              {resolutionMessage}
            </div>
          )}

          {/* HUMAN APPROVAL QUEUE */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Human Approval Queue ({pendingApprovals.length} Pending)</span>
              </h4>
              <span className="text-[10px] font-mono text-zinc-400">
                Human consent is required before action executes
              </span>
            </div>

            {pendingApprovals.length === 0 ? (
              <div className="bg-[#0B0B14] border border-[#1C1C2C] rounded-lg p-5 text-center text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-6 h-6 text-[#00FF88] mx-auto mb-2" />
                Zero pending actions awaiting approval. All autonomous systems running smoothly.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.map(appr => (
                  <div
                    key={appr.id}
                    className="bg-[#0B0B14] border border-amber-500/30 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold uppercase">
                          {appr.actionType}
                        </span>
                        <span className="text-xs font-mono font-bold text-white">
                          {appr.targetResource}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-mono mt-1">
                        {appr.details}
                      </p>
                      <div className="text-[10px] font-mono text-zinc-500 mt-1">
                        Requested by: {appr.agentName} &bull; {new Date(appr.requestedAt).toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleResolve(appr.id, 'REJECT')}
                        disabled={resolvingId === appr.id}
                        className="px-3 py-1.5 rounded text-xs font-mono text-zinc-400 border border-zinc-700 hover:text-white hover:border-zinc-500 transition disabled:opacity-50"
                      >
                        REJECT
                      </button>
                      <button
                        onClick={() => handleResolve(appr.id, 'APPROVE')}
                        disabled={resolvingId === appr.id}
                        className="px-4 py-1.5 rounded text-xs font-mono font-bold bg-[#00FF88] text-black hover:bg-[#00e57a] transition disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {resolvingId === appr.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                        <span>GRANT APPROVAL</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 18 AGENTS STATUS GRID */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold">
                Active Autonomous Swarm ({state.agents.length} Agents)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {state.agents.map(agent => (
                <div
                  key={agent.id}
                  className="bg-[#0B0B14] border border-[#1A1A28] rounded-lg p-3.5 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                        <span>{agent.agentName}</span>
                        {agent.status === 'RUNNING' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">{agent.role}</div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[10px] text-zinc-400 font-bold">{agent.confidenceScore}%</span>
                      <div className="text-[9px] text-zinc-500">CONFIDENCE</div>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-zinc-800/80 p-2 rounded text-[11px] font-mono text-zinc-300">
                    <span className="text-zinc-500 mr-1.5">TASK:</span>
                    <span>{agent.currentAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#0B0B14] border-t border-[#1E1E2E] p-4 flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
            <span>Autonomous Constitution: Article 12 (Zero Unauthorized Execution)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-zinc-800 text-white hover:bg-zinc-700 transition"
          >
            Close Console
          </button>
        </div>
      </div>
    </div>
  );
};
