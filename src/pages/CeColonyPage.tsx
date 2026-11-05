import React, { useState, useEffect, useCallback } from 'react';
import {
  Cpu,
  Layers,
  Sparkles,
  Bot,
  CreditCard,
  Download,
  Shield,
  Activity,
  ArrowLeft,
  RefreshCw,
  Globe2,
  DollarSign,
  Code2,
  Coins
} from 'lucide-react';
import { CE_COLONIES_METADATA } from '../data/ceColonyData';
import { CeColonyId, CeColonyState } from '../types/ceColony';
import { CeColonyVisualHeader } from '../components/ce-colony/CeColonyVisualHeader';
import { CeColonyCardGrid } from '../components/ce-colony/CeColonyCardGrid';
import { CeColonyWorkspace } from '../components/ce-colony/CeColonyWorkspace';
import { CeOrchestratorModal } from '../components/ce-colony/CeOrchestratorModal';
import { CeNodeInstallerModal } from '../components/ce-colony/CeNodeInstallerModal';
import { CeLedgerModal } from '../components/ce-colony/CeLedgerModal';

interface CeColonyPageProps {
  onNavigate?: (page: string) => void;
  initialColonyId?: CeColonyId;
}

export const CeColonyPage: React.FC<CeColonyPageProps> = ({
  onNavigate,
  initialColonyId = 'compute'
}) => {
  const [selectedColonyId, setSelectedColonyId] = useState<CeColonyId>(initialColonyId);
  const [state, setState] = useState<CeColonyState | null>(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isInstallerOpen, setIsInstallerOpen] = useState(false);
  const [isOrchestratorOpen, setIsOrchestratorOpen] = useState(false);
  const [isLedgerOpen, setIsLedgerOpen] = useState(false);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/ce-colony/state');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.state) {
          setState(data.state);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch CE colony state:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const selectedColony =
    CE_COLONIES_METADATA.find(c => c.id === selectedColonyId) ?? CE_COLONIES_METADATA[0];

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans pb-24 selection:bg-orange-500 selection:text-black">
      {/* Background Matrix & Neon Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-25">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#FFD700]/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff6b0008_1px,transparent_1px),linear-gradient(to_bottom,#ff6b0008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('uadc-lab')}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-orange-400 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to UADC Lab</span>
              </button>
            )}
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
              BAA UA-AIDC · COMPUTER ENGINEERING DIVISION
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate?.('uaaig')}
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition"
            >
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>UAAIG Master Grid</span>
            </button>

            <button
              onClick={() => onNavigate?.('code-vein')}
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 transition"
            >
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>CODE VEIN V13</span>
            </button>

            <button
              onClick={() => onNavigate?.('aurum-colony')}
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>AURUM V13</span>
            </button>

            <button
              onClick={() => onNavigate?.('genesis')}
              className="px-3 py-1.5 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>GENESIS V17</span>
            </button>

            <button
              onClick={fetchState}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
              title="Refresh State"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* 1. VISUAL HEADER HERO WITH METRICS & QUICK ACTIONS */}
        <CeColonyVisualHeader
          state={state}
          onOpenInstaller={() => setIsInstallerOpen(true)}
          onOpenOrchestrator={() => setIsOrchestratorOpen(true)}
          onOpenLedger={() => setIsLedgerOpen(true)}
          activeColonyCount={CE_COLONIES_METADATA.length}
        />

        {/* 2. THE TWELVE WEALTH COLONIES INTERACTIVE SELECTOR GRID */}
        <CeColonyCardGrid
          colonies={CE_COLONIES_METADATA}
          selectedColonyId={selectedColonyId}
          onSelectColony={id => {
            setSelectedColonyId(id);
            // Smooth scroll to workspace
            const elem = document.getElementById('ce-workspace-section');
            if (elem) {
              elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          summaryData={state?.coloniesSummary}
        />

        {/* 3. DEDICATED FUNCTIONAL WORKSPACE FOR ACTIVE COLONY */}
        <div id="ce-workspace-section">
          <CeColonyWorkspace
            colony={selectedColony}
            state={state}
            onRefreshState={fetchState}
            onOpenLedger={() => setIsLedgerOpen(true)}
            onOpenInstaller={() => setIsInstallerOpen(true)}
          />
        </div>
      </div>

      {/* MODALS */}
      <CeOrchestratorModal
        isOpen={isOrchestratorOpen}
        onClose={() => setIsOrchestratorOpen(false)}
        orchestrator={state?.orchestrator ?? null}
        onRefresh={fetchState}
      />

      <CeNodeInstallerModal
        isOpen={isInstallerOpen}
        onClose={() => setIsInstallerOpen(false)}
        onNodeRegistered={fetchState}
      />

      <CeLedgerModal
        isOpen={isLedgerOpen}
        onClose={() => setIsLedgerOpen(false)}
        state={state}
        onRefresh={fetchState}
      />
    </div>
  );
};
