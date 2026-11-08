import React, { useState, useEffect } from 'react';
import {
  Coins,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Lock,
  Wallet,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';
import { AurumState, AurumColonyId } from '../types/aurum';
import { INITIAL_AURUM_STATE } from '../data/aurumInitialState';
import { AurumVisualHeader } from '../components/aurum/AurumVisualHeader';
import { AurumRefineryCore } from '../components/aurum/AurumRefineryCore';
import { AurumColonyGrid } from '../components/aurum/AurumColonyGrid';
import { AurumWorkspace } from '../components/aurum/AurumWorkspace';
import { AurumWalletScanModal } from '../components/aurum/AurumWalletScanModal';
import { AurumTransactionApprovalModal } from '../components/aurum/AurumTransactionApprovalModal';
import { AurumLedgerModal } from '../components/aurum/AurumLedgerModal';
import { AurumCharterModal } from '../components/aurum/AurumCharterModal';
import { useNavigation } from '../context/NavigationContext';

export const AurumColonyPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [state, setState] = useState<AurumState>(INITIAL_AURUM_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColonyId, setSelectedColonyId] = useState<AurumColonyId>('dust_furnace');

  // Modals state
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false);

  // Fetch state from server
  const fetchState = async () => {
    try {
      const res = await fetch('/api/aurum/state');
      if (res.ok) {
        const data = await res.json();
        if (data.state) {
          setState(data.state);
        }
      }
    } catch (err) {
      console.warn('Could not load /api/aurum/state, using local fallback state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <div className="min-h-screen bg-[#030509] text-slate-100 font-sans pb-24">
      {/* Top UA-AIDC Module Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#050811]/90 backdrop-blur-md border-b border-amber-500/20 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950">
              UA-AIDC
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Module 03 // AURUM COLONY V13
            </span>
          </div>

          {/* Module Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => navigateTo('ce-colony')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              Module 01: CE Colony V12
            </button>

            <button
              onClick={() => navigateTo('code-vein')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Module 02: Code Vein V13
            </button>

            <div className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 whitespace-nowrap flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Module 03: Aurum Colony V13 (Active)
            </div>

            <button
              onClick={() => navigateTo('genesis')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Module 04: Genesis Engine V17
            </button>

            <button
              onClick={() => navigateTo('mindhive-v20')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Module 05: Mind Hive V20
            </button>

            <button
              onClick={() => navigateTo('uadc-lab')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Sovereign Grid LAB
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        {/* Visual Header HUD */}
        <AurumVisualHeader
          state={state}
          onOpenScanModal={() => setIsScanModalOpen(true)}
          onOpenApprovalModal={() => setIsApprovalModalOpen(true)}
          onOpenLedgerModal={() => setIsLedgerModalOpen(true)}
          onOpenRulesModal={() => setIsCharterModalOpen(true)}
        />

        {/* 10-Stage Refinery Core */}
        <AurumRefineryCore />

        {/* 8 Wealth Colonies Grid */}
        <AurumColonyGrid
          selectedColonyId={selectedColonyId}
          onSelectColony={(id) => {
            setSelectedColonyId(id);
            const el = document.getElementById('aurum-workspace-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive Colony Workbench */}
        <div id="aurum-workspace-section">
          <AurumWorkspace
            colonyId={selectedColonyId}
            state={state}
            onRefreshState={fetchState}
            onOpenApprovalModal={() => setIsApprovalModalOpen(true)}
            onOpenLedgerModal={() => setIsLedgerModalOpen(true)}
          />
        </div>

        {/* Autonomous Agents Telemetry Roster */}
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                24 Autonomous Agents Telemetry & Confidence Grid
              </h3>
              <p className="text-xs text-slate-400">
                Continuous on-chain monitoring, static analysis, and market crawling.
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-mono">100% Operational Grid</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {state.agents.map((ag) => (
              <div
                key={ag.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white truncate">{ag.agentName}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-amber-400/90 font-medium truncate mb-1">
                  {ag.role}
                </div>
                <div className="text-[10px] text-slate-400 line-clamp-2 mb-2">
                  {ag.currentTask}
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1.5 border-t border-slate-800 font-mono">
                  <span className="text-slate-500">Confidence:</span>
                  <span className="text-emerald-400 font-bold">{ag.confidenceScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Read-Only Wallets Row */}
        <div className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              Connected Read-Only Addresses ({state.connectedWallets.length})
            </h4>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {state.connectedWallets.map((w, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5"
                >
                  <span className="text-[10px] uppercase font-bold text-amber-400">{w.chain}:</span>
                  <span>{w.address.slice(0, 6)}...{w.address.slice(-4)}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsScanModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Wallet className="w-4 h-4" />
            Add Another Address (Read-Only)
          </button>
        </div>
      </div>

      {/* MODALS */}
      <AurumWalletScanModal
        isOpen={isScanModalOpen}
        onClose={() => setIsScanModalOpen(false)}
        onScanComplete={fetchState}
      />

      <AurumTransactionApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        state={state}
        onRefreshState={fetchState}
      />

      <AurumLedgerModal
        isOpen={isLedgerModalOpen}
        onClose={() => setIsLedgerModalOpen(false)}
        state={state}
        onRefreshState={fetchState}
      />

      <AurumCharterModal
        isOpen={isCharterModalOpen}
        onClose={() => setIsCharterModalOpen(false)}
      />
    </div>
  );
};
