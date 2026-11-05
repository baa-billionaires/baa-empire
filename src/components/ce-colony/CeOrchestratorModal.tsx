import React, { useState } from 'react';
import {
  X,
  Bot,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Activity,
  Layers,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Cpu
} from 'lucide-react';
import { CeOrchestratorState } from '../../types/ceColony';

interface CeOrchestratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  orchestrator: CeOrchestratorState | null;
  onRefresh: () => void;
}

export const CeOrchestratorModal: React.FC<CeOrchestratorModalProps> = ({
  isOpen,
  onClose,
  orchestrator,
  onRefresh
}) => {
  const [optimizing, setOptimizing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunOptimization = async () => {
    setOptimizing(true);
    setSuccessMsg(null);
    try {
      const res = await fetch('/api/ce-colony/orchestrator/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('12-Colony optimization cycle completed! Workloads dynamically rebalanced.');
        onRefresh();
      }
    } catch (err) {
      console.error('Optimization error:', err);
    } finally {
      setOptimizing(false);
    }
  };

  const subAgents = [
    { name: 'Compute Dispatcher Agent', role: 'Matches incoming LLM & Ray batches to cold GPU nodes', status: 'active', load: '84%' },
    { name: 'Network Telemetry Agent', role: 'Dispatches ping/jitter probes to ISP routers', status: 'active', load: '62%' },
    { name: 'Document OCR Agent', role: 'Batches physical invoices into privacy-sanitizing workers', status: 'active', load: '91%' },
    { name: 'Ghost Knowledge Agent', role: 'Indexes master technician repair audio & videos into RAG', status: 'active', load: '45%' },
    { name: 'Diagnostic Neural Agent', role: 'Computes motherboard component failure probabilities', status: 'active', load: '78%' },
    { name: 'Hardware Escrow Agent', role: 'Verifies stress test benchmark passports before fund release', status: 'active', load: '55%' },
    { name: 'Router Provisioner Agent', role: 'Generates hardened RouterOS & pfSense config scripts', status: 'active', load: '40%' },
    { name: 'Curriculum Licensing Agent', role: 'Tracks student module completion for polytechnic royalties', status: 'active', load: '68%' },
    { name: 'Endpoint SOC Agent', role: 'Monitors client workstations for missing security CVE patches', status: 'active', load: '72%' },
    { name: 'Edge Appliance Agent', role: 'Coordinates private air-gapped LLM deployments for clinics', status: 'active', load: '50%' },
    { name: 'Hardware R&D Agent', role: 'Pools community reverse-engineering bounties and imports', status: 'active', load: '38%' },
    { name: 'Commercial Tender Matcher', role: 'Scans institutional IT tenders and auto-generates proposals', status: 'active', load: '88%' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-orange-500/40 bg-[#070B16] text-slate-100 p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded border border-orange-500/30">
                  CENTRAL INTELLIGENCE
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  12 Sub-Agents Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                Autonomous Engineer Wealth Orchestrator
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 space-y-1">
            <div className="text-zinc-500">DISPATCHED (24H)</div>
            <div className="text-lg font-bold text-white">{orchestrator?.dispatchedJobsLast24h ?? 68} Jobs</div>
          </div>
          <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 space-y-1">
            <div className="text-zinc-500">MATCH RATE</div>
            <div className="text-lg font-bold text-emerald-400">{orchestrator?.matchedNodeRatePercent ?? 98.2}%</div>
          </div>
          <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 space-y-1">
            <div className="text-zinc-500">HOURLY VELOCITY</div>
            <div className="text-lg font-bold text-[#FFD700]">${orchestrator?.averageHourlyRevenueUsd ?? 34.80}/hr</div>
          </div>
          <div className="bg-black/60 border border-zinc-800 rounded-xl p-3 space-y-1">
            <div className="text-zinc-500">WORKLOAD QUEUE</div>
            <div className="text-lg font-bold text-sky-400">{orchestrator?.queuedJobs ?? 5} Queued</div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl">
          <div className="space-y-1 text-xs font-mono">
            <div className="text-orange-400 font-bold">AUTONOMOUS WORKLOAD BALANCER</div>
            <div className="text-zinc-300">
              Evaluates shop bandwidth, GPU idle periods, and technician skills to route maximum paying contracts.
            </div>
          </div>
          <button
            onClick={handleRunOptimization}
            disabled={optimizing}
            className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center justify-center gap-2 transition disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${optimizing ? 'animate-spin' : ''}`} />
            <span>{optimizing ? 'Optimizing Colonies...' : 'Trigger Optimization Cycle'}</span>
          </button>
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Active Sub-Agents Matrix */}
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
            12 Specialized Colony Sub-Agents
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {subAgents.map((agent, i) => (
              <div
                key={i}
                className="bg-black/60 border border-zinc-800/90 rounded-xl p-3 flex items-center justify-between text-xs font-mono hover:border-orange-500/40 transition"
              >
                <div className="space-y-0.5 pr-2">
                  <div className="text-white font-bold">{agent.name}</div>
                  <div className="text-[11px] text-zinc-400 leading-tight">{agent.role}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {agent.load} LOAD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Recommendations */}
        <div className="space-y-2 bg-black/80 border border-zinc-800 rounded-2xl p-4 text-xs font-mono">
          <div className="text-amber-400 font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>Orchestrator Real-Time Recommendations</span>
          </div>
          <ul className="space-y-1.5 text-zinc-300">
            {(orchestrator?.recommendations ?? [
              'Router latency probes in West Africa yielding peak ₦38,000/day commercial monitoring revenue.',
              'OCR queue for logistics receipts spiked 350%; allocate idle RTX 4090 node workers.',
              'Ghost skill "Dell Latitude Power Rail Short Detection" generated 42 paid queries this week.'
            ]).map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
