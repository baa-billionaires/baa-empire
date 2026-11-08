import React, { useState, useEffect, useCallback } from 'react';
import {
  Code2,
  Layers,
  Terminal,
  TrendingUp,
  Cpu,
  Bot,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Wallet,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Coins
} from 'lucide-react';
import { CodeVeinColonyId, CodeVeinState } from '../types/codeVein';
import { CodeVeinVisualHeader } from '../components/code-vein/CodeVeinVisualHeader';
import { CodeVeinRefineryCore } from '../components/code-vein/CodeVeinRefineryCore';
import { CodeVeinColonyGrid } from '../components/code-vein/CodeVeinColonyGrid';
import { CodeVeinWorkspace } from '../components/code-vein/CodeVeinWorkspace';
import { CodeVeinAgentSwarmModal } from '../components/code-vein/CodeVeinAgentSwarmModal';
import { CodeVeinLedgerModal } from '../components/code-vein/CodeVeinLedgerModal';

interface CodeVeinPageProps {
  onNavigate?: (pageId: string) => void;
  initialColony?: CodeVeinColonyId;
}

export const CodeVeinPage: React.FC<CodeVeinPageProps> = ({
  onNavigate,
  initialColony = 'github_miner'
}) => {
  const [state, setState] = useState<CodeVeinState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'refinery' | 'colonies' | 'workbench' | 'portfolio'>('refinery');
  const [activeColonyId, setActiveColonyId] = useState<CodeVeinColonyId>(initialColony);

  // Modal controls
  const [isAgentsModalOpen, setIsAgentsModalOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [isApprovalsModalOpen, setIsApprovalsModalOpen] = useState(false);

  // Fetch state from backend API
  const fetchState = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/code-vein/state');
      if (res.ok) {
        const data = await res.json();
        if (data.state) {
          setState(data.state);
        }
      }
    } catch (err) {
      console.error('Failed to fetch Code Vein state:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const handleSelectColony = (colonyId: CodeVeinColonyId) => {
    setActiveColonyId(colonyId);
    setActiveTab('workbench');
  };

  if (isLoading || !state) {
    return (
      <div className="min-h-screen bg-[#05050A] text-white flex flex-col items-center justify-center p-6 font-mono">
        <RefreshCw className="w-8 h-8 text-[#A855F7] animate-spin mb-4" />
        <div className="text-sm text-zinc-300">INITIALIZING CODE VEIN V13 REFINERY...</div>
        <div className="text-xs text-zinc-500 mt-1">Quarantining Private Code &bull; Syncing 15 Colonies &bull; Checking Paystack Gateway</div>
      </div>
    );
  }

  const pendingApprovalsCount = state.approvals.filter(a => a.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#05050A] text-slate-100 flex flex-col selection:bg-[#A855F7] selection:text-white pb-20">
      {/* Visual Header HUD */}
      <CodeVeinVisualHeader
        state={state}
        onOpenPayout={() => setIsLedgerModalOpen(true)}
        onOpenAgents={() => setIsAgentsModalOpen(true)}
        onOpenApprovals={() => setIsApprovalsModalOpen(true)}
        onOpenLedger={() => setIsLedgerModalOpen(true)}
        onRefresh={fetchState}
        isRefreshing={isRefreshing}
      />

      {/* Navigation & Section Tabs Bar */}
      <div className="bg-[#0A0A14] border-b border-[#1C1C2C] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('uadc-lab')}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition px-2 py-1 rounded hover:bg-zinc-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to UADC Lab</span>
              </button>
            )}

            <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

            <div className="flex items-center gap-1 bg-[#05050A] p-1 rounded-lg border border-[#222234]">
              <button
                onClick={() => setActiveTab('refinery')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'refinery'
                    ? 'bg-[#A855F7] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Refinery Core</span>
              </button>

              <button
                onClick={() => setActiveTab('colonies')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'colonies'
                    ? 'bg-[#A855F7] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>15 Colonies</span>
              </button>

              <button
                onClick={() => setActiveTab('workbench')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'workbench'
                    ? 'bg-[#A855F7] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Live Workbenches</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  activeTab === 'portfolio'
                    ? 'bg-[#A855F7] text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Wealth Statement</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingApprovalsCount > 0 && (
              <button
                onClick={() => setIsApprovalsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono animate-pulse"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{pendingApprovalsCount} Consent Required</span>
              </button>
            )}

            <button
              onClick={() => onNavigate && onNavigate('ce-colony')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono transition"
            >
              <Cpu className="w-3.5 h-3.5 text-[#00FF88]" />
              <span>Bridge CE Colony V12</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('aurum-colony')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-mono transition"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>AURUM COLONY V13</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('genesis')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-mono transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>GENESIS ENGINE V17</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('mindhive-v20')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:text-white text-xs font-mono transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>MIND HIVE V20</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* TAB 1: REFINERY CORE (Default Master Diagram) */}
        {activeTab === 'refinery' && (
          <div className="space-y-8">
            <CodeVeinRefineryCore />
            <CodeVeinColonyGrid
              onSelectColony={handleSelectColony}
              activeColonyId={activeColonyId}
            />
          </div>
        )}

        {/* TAB 2: 15 COLONIES GRID */}
        {activeTab === 'colonies' && (
          <CodeVeinColonyGrid
            onSelectColony={handleSelectColony}
            activeColonyId={activeColonyId}
          />
        )}

        {/* TAB 3: LIVE WORKBENCH */}
        {activeTab === 'workbench' && (
          <CodeVeinWorkspace
            state={state}
            activeColonyId={activeColonyId}
            onSelectColony={setActiveColonyId}
            onRefresh={fetchState}
          />
        )}

        {/* TAB 4: CODE LANDLORD WEALTH STATEMENT */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="bg-[#07070E] border border-[#222234] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E1E2E]">
                <div>
                  <span className="text-xs font-mono text-[#00FF88] uppercase tracking-wider font-semibold">
                    CODE LANDLORD WEALTH STATEMENT // VERIFIED REVENUE
                  </span>
                  <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                    Universal Autonomous Software Portfolio
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Total net revenue from micro-APIs, bug bounties, template licenses, and client retainers.
                  </p>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs text-zinc-500 uppercase">Total Net Balance</div>
                  <div className="text-3xl font-black text-[#00FF88]">
                    ${state.metrics.developerNetEarningsUsd.toFixed(2)} USD
                  </div>
                  <div className="text-xs text-emerald-400">
                    &asymp; &#8358;{(state.metrics.developerNetEarningsUsd * state.config.ngnExchangeRate).toLocaleString()} NGN
                  </div>
                </div>
              </div>

              {/* 70/30 Split Audit Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-black/40 border border-zinc-800 p-4 rounded-lg">
                  <div className="text-xs font-mono text-zinc-500 uppercase">Developer Share (70%)</div>
                  <div className="text-xl font-bold text-[#00FF88] mt-1">
                    ${state.metrics.developerNetEarningsUsd.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">
                    Withdrawable immediately via Paystack
                  </div>
                </div>

                <div className="bg-black/40 border border-zinc-800 p-4 rounded-lg">
                  <div className="text-xs font-mono text-zinc-500 uppercase">Platform Infrastructure (30%)</div>
                  <div className="text-xl font-bold text-zinc-300 mt-1">
                    ${state.metrics.platformNetEarningsUsd.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-1">
                    Covers CE compute, LLM tokens &amp; sandbox nodes
                  </div>
                </div>

                <div className="bg-black/40 border border-zinc-800 p-4 rounded-lg">
                  <div className="text-xs font-mono text-zinc-500 uppercase">Withdrawable Net Cash</div>
                  <div className="text-xl font-bold text-[#FFD700] mt-1">
                    ${state.metrics.availableWithdrawableUsd.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-amber-400 font-mono mt-1">
                    &#8358;{state.metrics.availableWithdrawableNgn.toLocaleString()} NGN Available
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsLedgerModalOpen(true)}
                  className="px-5 py-2.5 rounded text-xs font-mono font-bold bg-[#00FF88] text-black hover:bg-[#00e57a] transition flex items-center gap-2 shadow-lg shadow-[#00FF88]/20"
                >
                  <Wallet className="w-4 h-4 text-black" />
                  <span>WITHDRAW DEVELOPER REVENUE VIA PAYSTACK</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALS */}
      <CodeVeinAgentSwarmModal
        isOpen={isAgentsModalOpen || isApprovalsModalOpen}
        onClose={() => {
          setIsAgentsModalOpen(false);
          setIsApprovalsModalOpen(false);
        }}
        state={state}
        onRefresh={fetchState}
      />

      <CodeVeinLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        state={state}
        onRefresh={fetchState}
      />
    </div>
  );
};
