import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Coins,
  Bot,
  RefreshCw,
  ExternalLink,
  Lock,
  Radio,
  FileCode,
  Activity,
  Award
} from 'lucide-react';
import { MindHiveGenesisState, GenesisModuleId } from '../types/mindHiveGenesis';
import { INITIAL_GENESIS_STATE } from '../data/genesisInitialState';
import { GenesisVisualHeader } from '../components/genesis/GenesisVisualHeader';
import { GenesisLifecycleTracker } from '../components/genesis/GenesisLifecycleTracker';
import { GenesisModuleGrid } from '../components/genesis/GenesisModuleGrid';
import { GenesisOpportunityGravityMap } from '../components/genesis/GenesisOpportunityGravityMap';
import { GenesisInventionTournamentView } from '../components/genesis/GenesisInventionTournamentView';
import { GenesisColonyFusionReactor } from '../components/genesis/GenesisColonyFusionReactor';
import { GenesisResurrectionLab } from '../components/genesis/GenesisResurrectionLab';
import { GenesisLivingGenomeViewer } from '../components/genesis/GenesisLivingGenomeViewer';
import { GenesisApprovalsModal } from '../components/genesis/GenesisApprovalsModal';
import { GenesisNewVentureModal } from '../components/genesis/GenesisNewVentureModal';
import { GenesisPayoutModal } from '../components/genesis/GenesisPayoutModal';
import { GenesisSqlSchemaModal } from '../components/genesis/GenesisSqlSchemaModal';
import { GenesisCharterModal } from '../components/genesis/GenesisCharterModal';
import { useNavigation } from '../context/NavigationContext';

export const GenesisCommandPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [state, setState] = useState<MindHiveGenesisState>(INITIAL_GENESIS_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState<GenesisModuleId>('oracle_colony');
  const [targetVentureId, setTargetVentureId] = useState<string | undefined>(undefined);

  // Modals state
  const [isNewVentureOpen, setIsNewVentureOpen] = useState(false);
  const [isApprovalsOpen, setIsApprovalsOpen] = useState(false);
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);
  const [isSqlSchemaOpen, setIsSqlSchemaOpen] = useState(false);
  const [isCharterOpen, setIsCharterOpen] = useState(false);

  // Fetch state from server
  const fetchState = async () => {
    try {
      const res = await fetch('/api/genesis/state');
      if (res.ok) {
        const data = await res.json();
        if (data.state) {
          setState(data.state);
        }
      }
    } catch (err) {
      console.warn('Could not load /api/genesis/state, using local fallback state:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  const handleSimulateVenture = async (ventureId: string) => {
    try {
      const res = await fetch('/api/genesis/mirrorverse/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ventureId, userAgentCount: 1500 })
      });
      const data = await res.json();
      if (data.success) {
        fetchState();
        alert(`Mirrorverse digital twin simulation executed! Check the simulation chambers below.`);
      }
    } catch (err: any) {
      alert(err.message || 'Simulation error');
    }
  };

  const handleRecordEvidence = async (ventureId: string) => {
    const org = prompt('Enter prospect organization name:');
    if (!org) return;
    const amount = prompt('Enter validated deposit or LOI value in USD (e.g. 5000):', '5000');
    try {
      const res = await fetch('/api/genesis/validation/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ventureId,
          prospectOrg: org,
          amountUsd: amount,
          notes: `Verified customer interest recorded from direct interview with ${org}.`
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchState();
        alert('Customer validation evidence successfully recorded to Venture Genome!');
      }
    } catch (err: any) {
      alert(err.message || 'Error recording evidence');
    }
  };

  return (
    <div className="min-h-screen bg-[#020408] text-slate-100 font-sans pb-24">
      {/* Top UA-AIDC Module Navigation Switcher Bar */}
      <div className="sticky top-0 z-30 bg-[#050811]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500 text-slate-950">
              UA-AIDC
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Module 04 // MIND HIVE GENESIS V17
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
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Module 02: Code Vein V13
            </button>

            <button
              onClick={() => navigateTo('aurum-colony')}
              className="px-3 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              Module 03: Aurum Colony V13
            </button>

            <div className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 whitespace-nowrap flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Module 04: Genesis Engine V17 (Active)
            </div>

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
        <GenesisVisualHeader
          state={state}
          onOpenNewVenture={() => setIsNewVentureOpen(true)}
          onOpenApprovals={() => setIsApprovalsOpen(true)}
          onOpenPayout={() => setIsPayoutOpen(true)}
          onOpenCharter={() => setIsCharterOpen(true)}
          onOpenSqlSchema={() => setIsSqlSchemaOpen(true)}
        />

        {/* 10-Stage Living Venture Lifecycle Tracker */}
        <GenesisLifecycleTracker
          state={state}
          onSelectVenture={(id) => {
            setTargetVentureId(id);
            const el = document.getElementById('genesis-genome-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8 Genesis Intelligence Modules Grid (A through H) */}
        <GenesisModuleGrid
          selectedModuleId={selectedModuleId}
          onSelectModule={(id) => {
            setSelectedModuleId(id);
            const sectionMap: Record<string, string> = {
              oracle_colony: 'genesis-gravity-section',
              evolution_lab: 'genesis-tournament-section',
              symbiosis_colony: 'genesis-fusion-section',
              mirrorverse: 'genesis-genome-section',
              nexus_memory: 'genesis-genome-section',
              swarm_foundry: 'genesis-swarm-section',
              provenance_vault: 'genesis-genome-section',
              empire_exchange: 'genesis-payout-section'
            };
            const targetSection = sectionMap[id] || 'genesis-gravity-section';
            const el = document.getElementById(targetSection);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Opportunity Gravity Map */}
        <div id="genesis-gravity-section">
          <GenesisOpportunityGravityMap
            state={state}
            onInitiateVentureFromIntersection={() => setIsNewVentureOpen(true)}
          />
        </div>

        {/* Living Venture Genome Viewer */}
        <div id="genesis-genome-section">
          <GenesisLivingGenomeViewer
            state={state}
            selectedVentureId={targetVentureId}
            onRefresh={fetchState}
            onSimulateVenture={handleSimulateVenture}
            onRecordEvidence={handleRecordEvidence}
          />
        </div>

        {/* Evolution Lab Invention Tournament */}
        <div id="genesis-tournament-section">
          <GenesisInventionTournamentView
            state={state}
            onRefresh={fetchState}
          />
        </div>

        {/* Symbiosis Colony Fusion Reactor */}
        <div id="genesis-fusion-section">
          <GenesisColonyFusionReactor
            state={state}
            onRefresh={fetchState}
            onOpenApprovals={() => setIsApprovalsOpen(true)}
          />
        </div>

        {/* Autonomous Business Resurrection Laboratory */}
        <GenesisResurrectionLab
          state={state}
          onRefresh={fetchState}
        />

        {/* Swarm Foundry Active Specialists Section */}
        <div id="genesis-swarm-section" className="rounded-2xl bg-slate-950/80 border border-slate-800 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-cyan-400" />
                Swarm Foundry Specialist Agents ({state.swarmAgents.length})
              </h3>
              <p className="text-xs text-slate-400">
                Task-specific ephemeral agents with scoped compute budgets and automated credential retirement.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              Compute Caps Enforced
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {state.swarmAgents.map((ag) => (
              <div key={ag.id} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{ag.agentName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                    {ag.status}
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400/90 font-medium mb-1.5">{ag.specialistRole}</div>
                <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800 pt-2 font-mono">
                  <div className="flex justify-between">
                    <span>Allocated GPU:</span>
                    <span className="text-white">{ag.allocatedComputeGpuHours} hrs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consumed / Cost:</span>
                    <span className="text-emerald-400">{ag.actualComputeConsumedGpuHours} hrs (${ag.actualCostUsd.toFixed(2)})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revocation Date:</span>
                    <span className="text-slate-500 text-[10px]">{ag.credentialRevocationDate.split('T')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <GenesisNewVentureModal
        isOpen={isNewVentureOpen}
        onClose={() => setIsNewVentureOpen(false)}
        onRefresh={fetchState}
      />

      <GenesisApprovalsModal
        isOpen={isApprovalsOpen}
        onClose={() => setIsApprovalsOpen(false)}
        state={state}
        onRefresh={fetchState}
      />

      <GenesisPayoutModal
        isOpen={isPayoutOpen}
        onClose={() => setIsPayoutOpen(false)}
        state={state}
        onRefresh={fetchState}
      />

      <GenesisSqlSchemaModal
        isOpen={isSqlSchemaOpen}
        onClose={() => setIsSqlSchemaOpen(false)}
      />

      <GenesisCharterModal
        isOpen={isCharterOpen}
        onClose={() => setIsCharterOpen(false)}
      />
    </div>
  );
};
