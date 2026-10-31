import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  Play,
  Pause,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Code,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { DiscoveryAgent, SourceConnector } from '../../types/dealRoom';

interface AutonomousDiscoverySwarmConsoleProps {
  agents: DiscoveryAgent[];
  connectors: SourceConnector[];
  onTriggerAgentRun: (agentId: string) => void;
  onTriggerSwarmCycle: () => void;
  isSwarmRunning?: boolean;
}

export const AutonomousDiscoverySwarmConsole: React.FC<AutonomousDiscoverySwarmConsoleProps> = ({
  agents,
  connectors,
  onTriggerAgentRun,
  onTriggerSwarmCycle,
  isSwarmRunning = false
}) => {
  const [selectedAgent, setSelectedAgent] = useState<DiscoveryAgent>(agents[0]);
  const [filterMode, setFilterMode] = useState<'all' | 'flagship' | 'capital' | 'audit'>('all');

  const FLAGSHIP_IDS = ['GlobalOpportunityScanner', 'AIContractHunter', 'GrantAndInnovationScout'];
  const CAPITAL_IDS = ['ProjectLoanFinder', 'InvestorDiscoveryAgent', 'ComputeCreditScout', 'PartnershipHunter'];
  const AUDIT_IDS = ['OpportunityVerificationAgent', 'EligibilityMatchingAgent', 'DeadlineMonitor', 'ProposalPreparationAgent', 'DealPipelineCoordinator'];

  const filteredAgents = agents.filter(a => {
    if (filterMode === 'flagship') return FLAGSHIP_IDS.includes(a.id);
    if (filterMode === 'capital') return CAPITAL_IDS.includes(a.id);
    if (filterMode === 'audit') return AUDIT_IDS.includes(a.id);
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER & GLOBAL RUN TRIGGER */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#FFD700]" />
            <span>Autonomous Opportunity Discovery Swarm (12 Cooperating Agents)</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Coordinated multi-agent intelligence continuously harvesting, deduplicating, verifying, and matching authorized opportunities.
          </p>
        </div>

        <button
          onClick={onTriggerSwarmCycle}
          disabled={isSwarmRunning}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
            isSwarmRunning
              ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
              : 'bg-[#FFD700] hover:bg-[#FFE033] text-black border border-[#FFD700] shadow-md shadow-[#FFD700]/20 cursor-pointer'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isSwarmRunning ? 'animate-spin' : ''}`} />
          <span>{isSwarmRunning ? 'Swarm Executing Cycle...' : 'Run Autonomous Swarm Cycle'}</span>
        </button>
      </div>

      {/* SWARM MONITOR & DETAILS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 12 AGENTS ROSTER (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase text-zinc-400 block font-semibold">
              Active Agent Directory ({filteredAgents.length}/{agents.length}):
            </span>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterMode === 'all'
                    ? 'bg-zinc-700 text-white font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                All (12)
              </button>
              <button
                onClick={() => setFilterMode('flagship')}
                className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1 ${
                  filterMode === 'flagship'
                    ? 'bg-[#FFD700] text-black font-bold'
                    : 'bg-zinc-900 text-[#FFD700] hover:bg-zinc-800'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Flagship (3)</span>
              </button>
              <button
                onClick={() => setFilterMode('capital')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterMode === 'capital'
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Capital &amp; Credits (4)
              </button>
              <button
                onClick={() => setFilterMode('audit')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterMode === 'audit'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Audit &amp; Matching (5)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredAgents.map(agent => {
              const isSelected = selectedAgent.id === agent.id;
              const isRunning = agent.executionStatus === 'running' || isSwarmRunning;
              const isFlagship = FLAGSHIP_IDS.includes(agent.id);

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-zinc-800/90 border-[#FFD700]/60 ring-1 ring-[#FFD700]/40 shadow-lg'
                      : isFlagship
                      ? 'bg-zinc-900/90 border-[#FFD700]/30 hover:border-[#FFD700]/60'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg ${
                        isRunning
                          ? 'bg-cyan-950 text-cyan-400 animate-spin-slow'
                          : isFlagship
                          ? 'bg-[#FFD700]/20 text-[#FFD700]'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        <Bot className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-white text-xs">{agent.name}</h4>
                          {isFlagship && (
                            <span className="px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
                              CORE
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 block">{agent.role}</span>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                      isRunning
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-800 animate-pulse'
                        : agent.executionStatus === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    }`}>
                      {isRunning ? 'RUNNING' : agent.executionStatus.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                    {agent.purpose}
                  </p>

                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>Found: <strong className="text-zinc-200">{agent.itemsFoundCount}</strong> items</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerAgentRun(agent.id);
                      }}
                      disabled={isRunning}
                      className="text-cyan-400 hover:text-cyan-300 font-bold disabled:text-zinc-600 disabled:cursor-not-allowed"
                    >
                      {isRunning ? 'Scanning...' : 'Run Agent →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SELECTED AGENT DOSSIER & CONNECTORS (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 text-xs">
            <div className="flex items-start justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#FFD700] font-semibold">Agent Technical Specification</span>
                <h3 className="text-base font-bold text-white">{selectedAgent.name}</h3>
                <p className="text-zinc-400 text-xs">{selectedAgent.role}</p>
              </div>

              <button
                onClick={() => onTriggerAgentRun(selectedAgent.id)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs font-semibold"
              >
                Execute
              </button>
            </div>

            {/* Purpose */}
            <div className="space-y-1">
              <span className="font-bold text-zinc-300 block">Operational Purpose:</span>
              <p className="text-zinc-400 leading-relaxed bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
                {selectedAgent.purpose}
              </p>
            </div>

            {/* Approved Sources */}
            <div className="space-y-1.5">
              <span className="font-bold text-zinc-300 block">Approved Authorized Sources:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedAgent.approvedSources.map((src, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-cyan-400 font-mono text-[11px]">
                    {src}
                  </span>
                ))}
              </div>
            </div>

            {/* Input & Output Schema Preview */}
            <div className="space-y-2 font-mono text-[10px]">
              <div>
                <span className="text-zinc-500 uppercase block mb-1">Input Schema:</span>
                <pre className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 overflow-x-auto">
                  {selectedAgent.inputSchema}
                </pre>
              </div>

              <div>
                <span className="text-zinc-500 uppercase block mb-1">Output Schema:</span>
                <pre className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400 overflow-x-auto">
                  {selectedAgent.outputSchema}
                </pre>
              </div>
            </div>

            {/* Telemetry info */}
            <div className="pt-2 border-t border-zinc-800 flex justify-between text-[11px] font-mono text-zinc-500">
              <span>Last Run: {selectedAgent.lastRunTimestamp}</span>
              <span className="text-emerald-400">Status: {selectedAgent.executionStatus}</span>
            </div>
          </div>

          {/* AUTHORIZED SOURCE CONNECTOR STATUS */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>External Procurement Feeds & Connectors</span>
            </h4>

            <div className="space-y-2">
              {connectors.map(c => (
                <div key={c.id} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-200">{c.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      c.connectionStatus === 'connected_live'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : c.connectionStatus === 'credentials_required'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {c.connectionStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400">{c.requirementsNote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
