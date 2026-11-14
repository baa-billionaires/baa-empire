import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  AlertOctagon,
  Award,
  BarChart3,
  Bot,
  Briefcase,
  CheckCircle2,
  Coins,
  Cpu,
  FileSignature,
  GitBranch,
  GitFork,
  Globe,
  Layers,
  Lock,
  RefreshCw,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  TrendingUp,
  Users
} from 'lucide-react';
import { M2MMachine, M2MOreState, M2MWorkspaceId } from '../types/m2mOre';
import { INITIAL_M2M_ORE_STATE } from '../data/m2mOreInitialState';
import { M2MWorkspacesPrimary } from '../components/m2m/M2MWorkspacesPrimary';
import { M2MWorkspacesSecondary } from '../components/m2m/M2MWorkspacesSecondary';
import { M2MPassportModal } from '../components/m2m/M2MPassportModal';
import { UaaidcModuleSwitcher } from '../components/navigation/UaaidcModuleSwitcher';

interface M2MOrePageProps {
  onNavigate?: (page: string) => void;
}

interface WorkspaceNavItem {
  id: M2MWorkspaceId;
  label: string;
  group: 'Command & Swarm' | 'Commerce & Ledger' | 'Intelligence & Devices' | 'Governance & System';
  icon: React.ComponentType<{ className?: string }>;
}

const WORKSPACES: WorkspaceNavItem[] = [
  { id: 'overview', label: '1. Overview', group: 'Command & Swarm', icon: Activity },
  { id: 'registry', label: '2. Machine Registry', group: 'Command & Swarm', icon: Cpu },
  { id: 'deploy-mother', label: '3. Deploy Mother Bot', group: 'Command & Swarm', icon: Bot },
  { id: 'genealogy', label: '4. Machine Genealogy', group: 'Command & Swarm', icon: GitFork },
  { id: 'colonies', label: '5. Swarm Colonies', group: 'Command & Swarm', icon: Layers },
  { id: 'job-board', label: '6. M2M Job Board', group: 'Commerce & Ledger', icon: Briefcase },
  { id: 'marketplace', label: '7. Service Marketplace', group: 'Commerce & Ledger', icon: Store },
  { id: 'contracts', label: '8. Machine Contracts', group: 'Commerce & Ledger', icon: FileSignature },
  { id: 'ledger', label: '9. Escrow Ledger', group: 'Commerce & Ledger', icon: Lock },
  { id: 'royalties', label: '10. Machine Royalties', group: 'Commerce & Ledger', icon: Coins },
  { id: 'ai-to-ai', label: '11. AI-to-AI Economy', group: 'Commerce & Ledger', icon: Sparkles },
  { id: 'robot-miners', label: '12. Robot Miner Network', group: 'Intelligence & Devices', icon: Smartphone },
  { id: 'discovery', label: '13. Machine Discovery', group: 'Intelligence & Devices', icon: Globe },
  { id: 'reputation', label: '14. Machine Reputation', group: 'Intelligence & Devices', icon: Award },
  { id: 'economic-intel', label: '15. Economic Intel & Twin', group: 'Intelligence & Devices', icon: TrendingUp },
  { id: 'passports', label: '16. Digital Passports', group: 'Intelligence & Devices', icon: ShieldCheck },
  { id: 'evolution', label: '17. Machine Evolution', group: 'Intelligence & Devices', icon: GitBranch },
  { id: 'resurrection', label: '18. Machine Resurrection', group: 'Intelligence & Devices', icon: RefreshCw },
  { id: 'acquisition', label: '19. Customer Acquisition', group: 'Governance & System', icon: Users },
  { id: 'workforce', label: '20. Agent Workforce', group: 'Governance & System', icon: Users },
  { id: 'approvals', label: '21. Approval Center', group: 'Governance & System', icon: CheckCircle2 },
  { id: 'security', label: '22. Kill Switch & Security', group: 'Governance & System', icon: AlertOctagon },
  { id: 'analytics', label: '23. Analytics', group: 'Governance & System', icon: BarChart3 },
  { id: 'settings', label: '24. Settings & Reset', group: 'Governance & System', icon: Settings }
];

const PRIMARY_SET = new Set<M2MWorkspaceId>([
  'overview',
  'registry',
  'deploy-mother',
  'genealogy',
  'colonies',
  'job-board',
  'marketplace',
  'contracts',
  'ledger',
  'royalties',
  'ai-to-ai',
  'robot-miners'
]);

export const M2MOrePage: React.FC<M2MOrePageProps> = ({ onNavigate }) => {
  const [state, setState] = useState<M2MOreState>(INITIAL_M2M_ORE_STATE);
  const [activeWorkspace, setActiveWorkspace] = useState<M2MWorkspaceId>('overview');
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/m2m/state');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.state) {
          setState(json.state);
        }
      }
    } catch {
      // Fallback safely to initial pilot state
    }
  }, []);

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  const handleApiPost = async (
    url: string,
    body?: Record<string, unknown>,
    busyLabel?: string
  ): Promise<boolean> => {
    if (busyLabel) setBusyKey(busyLabel);
    setBanner(null);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : '{}'
      });
      const json = await res.json();
      if (res.ok && json.success) {
        if (json.state) setState(json.state);
        else await fetchState();
        setBanner({
          type: 'ok',
          text: json.message || 'Operation verified and persisted to /data/m2m_ore_state.json'
        });
        return true;
      } else {
        setBanner({
          type: 'err',
          text: json.error || `Request blocked (${res.status})`
        });
        return false;
      }
    } catch (err) {
      setBanner({ type: 'err', text: `Network error: ${String(err)}` });
      return false;
    } finally {
      setBusyKey(null);
    }
  };

  const handleApiPatch = async (
    url: string,
    body?: Record<string, unknown>,
    busyLabel?: string
  ): Promise<boolean> => {
    if (busyLabel) setBusyKey(busyLabel);
    setBanner(null);
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : '{}'
      });
      const json = await res.json();
      if (res.ok && json.success) {
        if (json.state) setState(json.state);
        else await fetchState();
        setBanner({ type: 'ok', text: 'Updated machine governance policy successfully.' });
        return true;
      } else {
        setBanner({ type: 'err', text: json.error || `Request blocked (${res.status})` });
        return false;
      }
    } catch (err) {
      setBanner({ type: 'err', text: `Network error: ${String(err)}` });
      return false;
    } finally {
      setBusyKey(null);
    }
  };

  const handleUpdateMachineStatus = async (
    machineId: string,
    operationalStatus: M2MMachine['operationalStatus']
  ) => {
    await handleApiPatch(
      `/api/m2m/machines/${encodeURIComponent(machineId)}/status`,
      { operationalStatus },
      `status-${machineId}`
    );
  };

  const pendingApprovalsCount = state.approvalRequests.filter((a) => a.status === 'pending').length;
  const selectedMachine = selectedMachineId
    ? state.machines.find((m) => m.id === selectedMachineId) || null
    : null;
  const selectedAccount = selectedMachine
    ? state.economicAccounts.find((a) => a.machineId === selectedMachine.id)
    : undefined;
  const selectedParent =
    selectedMachine?.parentMachineId
      ? state.machines.find((m) => m.id === selectedMachine.parentMachineId) || null
      : null;

  const groups: WorkspaceNavItem['group'][] = [
    'Command & Swarm',
    'Commerce & Ledger',
    'Intelligence & Devices',
    'Governance & System'
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Module Header Bar */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-emerald-400 font-bold">MODULE 6 · M2M ORE PROTOCOL V18</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">Autonomous Machine-to-Machine Service Economy</span>
              {state.globalKillSwitchActive && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="text-rose-400 font-bold">GLOBAL KILL SWITCH ACTIVE</span>
                </>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
              UA-AIDC Machine Swarm, Escrow Contracts &amp; Service Clearinghouse
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onNavigate && (
              <UaaidcModuleSwitcher
                currentPage="m2m-ore"
                onSelectModule={onNavigate}
                variant="banner"
              />
            )}
            <button
              type="button"
              onClick={fetchState}
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono text-zinc-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sync</span>
            </button>
          </div>
        </div>

        {/* Live Action Status Banner */}
        {banner && (
          <div
            className={`px-4 py-3 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
              banner.type === 'ok'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
            }`}
          >
            <span>{banner.text}</span>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Sidebar + Active Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 24-Workspace Navigation Sidebar */}
          <aside className="lg:col-span-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-5">
            {groups.map((grp) => (
              <div key={grp} className="space-y-1">
                <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                  {grp}
                </div>
                {WORKSPACES.filter((w) => w.group === grp).map((ws) => {
                  const Icon = ws.icon;
                  const active = activeWorkspace === ws.id;
                  return (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => setActiveWorkspace(ws.id)}
                      className={`w-full px-2.5 py-2 rounded-lg text-left text-xs font-mono transition flex items-center justify-between gap-2 cursor-pointer ${
                        active
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-bold'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{ws.label}</span>
                      </span>
                      {ws.id === 'approvals' && pendingApprovalsCount > 0 && (
                        <span className="text-[10px] font-bold text-amber-300 tabular-nums">
                          {pendingApprovalsCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </aside>

          {/* Active Workspace Content */}
          <main className="lg:col-span-9 min-w-0">
            {PRIMARY_SET.has(activeWorkspace) ? (
              <M2MWorkspacesPrimary
                state={state}
                activeWorkspace={activeWorkspace}
                busyKey={busyKey}
                onSelectWorkspace={setActiveWorkspace}
                onSelectMachine={(m) => setSelectedMachineId(m.id)}
                onApiPost={handleApiPost}
                onApiPatch={handleApiPatch}
                onUpdateMachineStatus={handleUpdateMachineStatus}
              />
            ) : (
              <M2MWorkspacesSecondary
                state={state}
                activeWorkspace={activeWorkspace}
                busyKey={busyKey}
                onSelectWorkspace={setActiveWorkspace}
                onSelectMachine={(m) => setSelectedMachineId(m.id)}
                onApiPost={handleApiPost}
                onApiPatch={handleApiPatch}
                onUpdateMachineStatus={handleUpdateMachineStatus}
              />
            )}
          </main>
        </div>
      </div>

      {/* Machine Digital Passport Inspector Modal */}
      <M2MPassportModal
        machine={selectedMachine}
        account={selectedAccount}
        parentMachine={selectedParent}
        onClose={() => setSelectedMachineId(null)}
        onUpdateStatus={handleUpdateMachineStatus}
      />
    </div>
  );
};
export default M2MOrePage;
