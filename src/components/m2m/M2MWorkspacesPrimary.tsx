import React, { useState } from 'react';
import {
  Activity,
  Bot,
  CheckCircle2,
  Coins,
  Cpu,
  FileSignature,
  Pause,
  Play,
  Plus,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Users,
  XCircle
} from 'lucide-react';
import {
  M2MOreState,
  M2MMachine,
  M2MWorkspaceId,
  MachineCategory,
  PaymentAssetType
} from '../../types/m2mOre';
import { M2MGenealogyTree } from './M2MGenealogyTree';

export interface M2MWorkspaceSharedProps {
  state: M2MOreState;
  activeWorkspace: M2MWorkspaceId;
  busyKey: string | null;
  onSelectWorkspace: (ws: M2MWorkspaceId) => void;
  onSelectMachine: (machine: M2MMachine) => void;
  onApiPost: (url: string, body?: Record<string, unknown>, busyLabel?: string) => Promise<boolean>;
  onApiPatch: (url: string, body?: Record<string, unknown>, busyLabel?: string) => Promise<boolean>;
  onUpdateMachineStatus: (machineId: string, status: M2MMachine['operationalStatus']) => Promise<void>;
}

const MOTHER_SPECIALIZATIONS = [
  'Customer Support Colony',
  'Content Creation Colony',
  'Translation & Localization Colony',
  'Research & Knowledge Mining Colony',
  'Code Maintenance & Testing Colony',
  'Data Cleaning & Labeling Colony',
  'Social Distribution & Lead Gen Colony',
  'Smartphone Robot Miner Coordinator',
  'Vehicle & Logistics Sensor Coordinator',
  'Security Monitoring & Compliance Colony',
  'Billing & Payment Reconciliation Colony',
  'Verification & Quality Audit Colony'
];

const MACHINE_CATEGORIES: MachineCategory[] = [
  'AI Agent Machine',
  'Child Bot',
  'Mother Bot',
  'Robot Miner',
  'IoT Device',
  'Compute Machine',
  'Storage Machine',
  'Network Machine',
  'Sensor Machine',
  'Software Service Machine',
  'Industrial Robot',
  'Digital Twin',
  'Living Application Agent'
];

export const M2MWorkspacesPrimary: React.FC<M2MWorkspaceSharedProps> = ({
  state,
  activeWorkspace,
  busyKey,
  onSelectWorkspace,
  onSelectMachine,
  onApiPost,
  onApiPatch,
  onUpdateMachineStatus
}) => {
  // Registry filter & form state
  const [registryFilter, setRegistryFilter] = useState<string>('ALL');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('cashscanai@gmail.com');
  const [regCategory, setRegCategory] = useState<MachineCategory>('AI Agent Machine');
  const [regSpec, setRegSpec] = useState('Multimodal Evaluation & Telemetry');
  const [regCaps, setRegCaps] = useState('ai_inference, data_verification');
  const [regBudget, setRegBudget] = useState('75');

  // Mother Bot Factory state
  const [mbName, setMbName] = useState('');
  const [mbOwner, setMbOwner] = useState('cashscanai@gmail.com');
  const [mbSpec, setMbSpec] = useState(MOTHER_SPECIALIZATIONS[2]);
  const [mbPurpose, setMbPurpose] = useState('Coordinate specialist translation & verification child bots for NOVA apps');
  const [mbCaps, setMbCaps] = useState('job_discovery, capability_matching, swarm_governance');
  const [mbBudget, setMbBudget] = useState('150');
  const [mbComputeBudget, setMbComputeBudget] = useState('45');
  const [mbMaxChildren, setMbMaxChildren] = useState('8');
  const [mbRoyalty, setMbRoyalty] = useState('10');
  const [mbHours, setMbHours] = useState('24/7 Authorized');
  const [mbRiskLimit, setMbRiskLimit] = useState('180');

  // Colony creation state
  const [colName, setColName] = useState('');
  const [colSpec, setColSpec] = useState('African Language & Mapping Verification');
  const [colBudget, setColBudget] = useState('120');
  const [colMaxSize, setColMaxSize] = useState('10');
  const [selectedMotherId, setSelectedMotherId] = useState(
    () => state.machines.find((m) => m.category === 'Mother Bot')?.id || ''
  );

  // Job Board filter & creation state
  const [jobFilter, setJobFilter] = useState<string>('ALL');
  const [jobReqId, setJobReqId] = useState<string>(state.machines[0]?.id || 'm2m-mb-01');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobCaps, setJobCaps] = useState('african_language_translation, localized_routing');
  const [jobCriteria, setJobCriteria] = useState('100% completion, SHA-256 hash & independent audit');
  const [jobPrice, setJobPrice] = useState('30');
  const [jobAsset, setJobAsset] = useState<PaymentAssetType>('PLATFORM_CREDIT');
  const [jobSource, setJobSource] = useState<'M2M Direct' | 'MIND HIVE' | 'NOVA Living App' | 'CODE VEIN' | 'External Buyer'>('M2M Direct');
  const [submitDrafts, setSubmitDrafts] = useState<Record<string, string>>({});

  // Robot Miner state
  const [rmName, setRmName] = useState('');
  const [rmType, setRmType] = useState<'Smartphone' | 'Okada / Vehicle' | 'POS Terminal' | 'CCTV System' | 'Drone' | 'Smart Meter' | 'Environmental Sensor' | 'Edge Computer'>('Smartphone');
  const [rmEmail, setRmEmail] = useState('student-node@billionairesai.academy');
  const [rmSensors, setRmSensors] = useState('ambient_telemetry, battery_health');
  const [rmConsent, setRmConsent] = useState(true);

  const settledJobs = state.jobs.filter((j) => j.status === 'SETTLED');
  const settledVolumeUsd = settledJobs.reduce((acc, j) => acc + j.proposedPriceUsd, 0);
  const activeEscrowUsd = state.reservations
    .filter((r) => r.status === 'reserved')
    .reduce((acc, r) => acc + r.amountUsd, 0);

  // 1. OVERVIEW
  if (activeWorkspace === 'overview') {
    const motherCount = state.machines.filter((m) => m.category === 'Mother Bot').length;
    const childCount = state.machines.filter((m) => m.category === 'Child Bot').length;

    return (
      <div className="space-y-6">
        {/* Pilot Architecture Banner */}
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-semibold">
                {state.pilotModeLabel}
              </div>
              <h2 className="text-xl font-heading font-bold text-white mt-0.5">
                Start With 1 Authorized Mother Bot, Specialist Children &amp; Real Reconciled Transactions
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onSelectWorkspace('job-board')}
              className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              Open Live Job Lifecycle
            </button>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-4xl">
            Every number below comes strictly from recorded pilot machines, double-entry escrow ledger accounts, and runtime adapter checks. Balances are segregated per machine and per asset class (<span className="font-mono text-zinc-300">PLATFORM_CREDIT</span> vs <span className="font-mono text-zinc-300">FIAT_USD</span> vs <span className="font-mono text-zinc-300">IDEA_COIN</span> vs <span className="font-mono text-zinc-300">USDC</span>).
          </p>
        </div>

        {/* Pilot KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-400">Active Swarm Nodes</div>
            <div className="text-2xl font-mono font-bold text-white tabular-nums">{state.machines.length}</div>
            <div className="text-[11px] font-mono text-zinc-500 tabular-nums">
              {motherCount} Mother · {childCount} Children · {state.robotMiners.length} Robot Miner
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-400">Settled Reconciled Jobs</div>
            <div className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
              ${settledVolumeUsd.toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-zinc-500 tabular-nums">
              {settledJobs.length} settled · PLATFORM_CREDIT
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-400">Active Escrow Held</div>
            <div className="text-2xl font-mono font-bold text-amber-300 tabular-nums">
              ${activeEscrowUsd.toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-zinc-500 tabular-nums">
              {state.reservations.filter((r) => r.status === 'reserved').length} reserved contract(s)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-400">Internal Risk Reserve</div>
            <div className="text-2xl font-mono font-bold text-zinc-100 tabular-nums">
              ${state.riskReserve.totalReserveUsd.toFixed(2)}
            </div>
            <div className="text-[11px] font-mono text-zinc-500 truncate" title={state.riskReserve.reserveLabel}>
              Not Licensed Insurance
            </div>
          </div>
        </div>

        {/* Pilot Checklist + Module 1–6 Adapter Probes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pilot Validation Milestones</span>
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              {[
                { label: '1 Authorized Mother Bot Registered & Budgeted', ok: motherCount >= 1 },
                { label: '2–3 Specialist Child Bots Provisioned (Incl. Verifier)', ok: childCount >= 3 },
                { label: '1 Consented Robot Miner (GPS Location OFF by default)', ok: state.robotMiners.length >= 1 },
                { label: '1 Verifiable Completed & Reconciled Escrow Transaction', ok: settledJobs.length >= 1 },
                { label: 'Recorded Owner & Parent/Asset Royalty Allocations', ok: state.ledgerEntries.some((l) => l.category === 'parent_royalty') }
              ].map((step) => (
                <div key={step.label} className="flex items-center justify-between py-2 border-b border-zinc-900 last:border-b-0">
                  <span className="text-zinc-300">{step.label}</span>
                  <span className={step.ok ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {step.ok ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>UA-AIDC Live Integration Adapters (Modules 1–6 &amp; Settlement Rails)</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {state.adapters.map((ad) => (
                <div key={ad.moduleId} className="flex items-start justify-between gap-3 py-2 border-b border-zinc-900 last:border-b-0">
                  <div>
                    <div className="font-semibold text-white">{ad.moduleName}</div>
                    <div className="text-[11px] text-zinc-400 font-mono">{ad.detail}</div>
                  </div>
                  <span
                    className={`font-mono text-[11px] font-bold uppercase shrink-0 ${
                      ad.status === 'operational' || ad.status === 'connected'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {ad.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Audit Event Stream */}
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <h3 className="text-sm font-heading font-bold text-white">Recent Immutable M2M Audit Trail</h3>
          <div className="divide-y divide-zinc-900">
            {state.auditEvents.slice(0, 8).map((ev) => (
              <div key={ev.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <span className="font-mono text-emerald-400 font-semibold">{ev.eventType}</span>
                  <span className="text-zinc-600 mx-1.5">·</span>
                  <span className="text-zinc-200">{ev.summary}</span>
                </div>
                <div className="font-mono text-[11px] text-zinc-500 shrink-0 tabular-nums">
                  {ev.actor} · {new Date(ev.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. MACHINE REGISTRY
  if (activeWorkspace === 'registry') {
    const visibleMachines = state.machines.filter((m) =>
      registryFilter === 'ALL' ? true : m.category === registryFilter
    );

    const handleRegisterMachine = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!regName.trim()) return;
      const ok = await onApiPost(
        '/api/m2m/machines/register',
        {
          name: regName.trim(),
          ownerEmail: regEmail.trim(),
          category: regCategory,
          specialization: regSpec.trim(),
          capabilities: regCaps,
          operatingBudgetUsd: Number(regBudget) || 50
        },
        'register-machine'
      );
      if (ok) setRegName('');
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">M2M Machine Registry</h2>
            <p className="text-xs text-zinc-400">
              All registered Mother Bots, Child Specialists, Robot Miners &amp; External Service Nodes. Click any row to open its Digital Passport.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={registryFilter}
              onChange={(e) => setRegistryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white"
            >
              <option value="ALL">All Categories ({state.machines.length})</option>
              {MACHINE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] font-mono text-zinc-400 uppercase">
                <th className="py-3 px-4">Code / Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Reputation</th>
                <th className="py-3 px-4">Settled Earnings</th>
                <th className="py-3 px-4">Jobs</th>
                <th className="py-3 px-4 text-right">Owner Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {visibleMachines.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-900/50 transition">
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => onSelectMachine(m)}
                      className="text-left hover:text-emerald-400 font-semibold text-white cursor-pointer"
                    >
                      <div>{m.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400">{m.machineCode} · {m.specialization}</div>
                    </button>
                  </td>
                  <td className="py-3 px-4 font-mono text-zinc-300">{m.category}</td>
                  <td className="py-3 px-4 font-mono">
                    <span
                      className={
                        m.operationalStatus === 'paused' || m.operationalStatus === 'retired'
                          ? 'text-amber-400 font-semibold uppercase'
                          : 'text-emerald-400 font-semibold uppercase'
                      }
                    >
                      {m.operationalStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono tabular-nums text-white">{m.reputationScore}</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-emerald-400">${m.totalEarningsUsd.toFixed(2)}</td>
                  <td className="py-3 px-4 font-mono tabular-nums text-zinc-300">{m.completedJobsCount}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectMachine(m)}
                        className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-mono text-[11px] whitespace-nowrap cursor-pointer"
                      >
                        Passport
                      </button>
                      {m.operationalStatus !== 'retired' && (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateMachineStatus(m.id, m.operationalStatus === 'paused' ? 'idle' : 'paused')
                          }
                          className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-300 font-mono text-[11px] whitespace-nowrap cursor-pointer"
                        >
                          {m.operationalStatus === 'paused' ? 'Resume' : 'Pause'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Register New Machine Form */}
        <form onSubmit={handleRegisterMachine} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Register New Authorized Machine &amp; Issue Digital Passport</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Machine Name</label>
              <input
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Kainji Telemetry Verifier"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Owner Email</label>
              <input
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                type="email"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Machine Category</label>
              <select
                value={regCategory}
                onChange={(e) => setRegCategory(e.target.value as MachineCategory)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                {MACHINE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Specialization</label>
              <input
                value={regSpec}
                onChange={(e) => setRegSpec(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Capabilities (comma separated)</label>
              <input
                value={regCaps}
                onChange={(e) => setRegCaps(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Operating Budget ($ PLATFORM_CREDIT)</label>
              <input
                value={regBudget}
                onChange={(e) => setRegBudget(e.target.value)}
                type="number"
                min="0"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={busyKey === 'register-machine'}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer disabled:opacity-50"
          >
            {busyKey === 'register-machine' ? 'Registering...' : 'Register Machine & Mint Passport'}
          </button>
        </form>
      </div>
    );
  }

  // 3. DEPLOY MOTHER BOT
  if (activeWorkspace === 'deploy-mother') {
    const handleDeployMother = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!mbName.trim()) return;
      const ok = await onApiPost(
        '/api/m2m/mother-bot/deploy',
        {
          ownerEmail: mbOwner,
          name: mbName.trim(),
          specialization: mbSpec,
          purpose: mbPurpose,
          capabilities: mbCaps,
          operatingBudgetUsd: Number(mbBudget),
          computeBudgetUsd: Number(mbComputeBudget),
          maxChildren: Number(mbMaxChildren),
          parentRoyaltyPct: Number(mbRoyalty),
          approvedOperatingHours: mbHours,
          riskLimitUsd: Number(mbRiskLimit)
        },
        'deploy-mother'
      );
      if (ok) {
        setMbName('');
        onSelectWorkspace('genealogy');
      }
    };

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-400" />
            <span>Mother Bot Factory · Owner-Authorized Swarm Coordinator Deployment</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Mother Bots coordinate specialist Child Bots under strict budget caps, maximum child count limits, anti-self-dealing checks, and explicit parent royalty terms. Minimum operating budget: $25.00 USD.
          </p>
        </div>

        <form onSubmit={handleDeployMother} className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Mother Bot Name</label>
              <input
                value={mbName}
                onChange={(e) => setMbName(e.target.value)}
                placeholder="e.g. Naija Localization Mother Bot"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Human Owner / Org Email</label>
              <input
                value={mbOwner}
                onChange={(e) => setMbOwner(e.target.value)}
                type="email"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Mother Bot Specialization (12 Blueprints)</label>
              <select
                value={mbSpec}
                onChange={(e) => setMbSpec(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                {MOTHER_SPECIALIZATIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="font-mono text-zinc-400">Authorized Purpose</label>
              <input
                value={mbPurpose}
                onChange={(e) => setMbPurpose(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Capabilities</label>
              <input
                value={mbCaps}
                onChange={(e) => setMbCaps(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Approved Operating Budget ($)</label>
              <input
                value={mbBudget}
                onChange={(e) => setMbBudget(e.target.value)}
                type="number"
                min="25"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Compute Budget Allocation ($)</label>
              <input
                value={mbComputeBudget}
                onChange={(e) => setMbComputeBudget(e.target.value)}
                type="number"
                min="10"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Max Child Machines Cap (1–25)</label>
              <input
                value={mbMaxChildren}
                onChange={(e) => setMbMaxChildren(e.target.value)}
                type="number"
                min="1"
                max="25"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Parent Royalty Rule (%)</label>
              <input
                value={mbRoyalty}
                onChange={(e) => setMbRoyalty(e.target.value)}
                type="number"
                min="0"
                max="25"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Approved Operating Hours</label>
              <input
                value={mbHours}
                onChange={(e) => setMbHours(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Risk Spend Cap ($ USD)</label>
              <input
                value={mbRiskLimit}
                onChange={(e) => setMbRiskLimit(e.target.value)}
                type="number"
                min="25"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={busyKey === 'deploy-mother'}
            className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer disabled:opacity-50"
          >
            {busyKey === 'deploy-mother' ? 'Deploying Mother Bot...' : 'Deploy Authorized Mother Bot'}
          </button>
        </form>
      </div>
    );
  }

  // 4. MACHINE GENEALOGY
  if (activeWorkspace === 'genealogy') {
    return (
      <M2MGenealogyTree
        machines={state.machines}
        colonies={state.colonies}
        onSelectMachine={onSelectMachine}
      />
    );
  }

  // 5. SWARM COLONIES
  if (activeWorkspace === 'colonies') {
    const mothers = state.machines.filter((m) => m.category === 'Mother Bot');

    const handleCreateColony = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!colName.trim()) return;
      const ok = await onApiPost(
        '/api/m2m/colonies/create',
        {
          name: colName.trim(),
          specialty: colSpec.trim(),
          ownerEmail: 'cashscanai@gmail.com',
          motherMachineId: selectedMotherId || null,
          resourceBudgetUsd: Number(colBudget) || 100,
          maxSwarmSize: Number(colMaxSize) || 10
        },
        'create-colony'
      );
      if (ok) setColName('');
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white">Swarm Colonies · Coordinated Specialist Clusters</h2>
          <p className="text-xs text-zinc-400">
            Evidence-governed machine colonies uniting Mother Coordinators, Child Specialists, and Robot Miners under shared policies and spend limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.colonies.map((col) => {
            const members = state.machines.filter((m) => col.participatingMachineIds.includes(m.id));
            return (
              <div key={col.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-mono text-emerald-400">{col.colonyCode} · {col.specialty}</div>
                    <h3 className="text-base font-heading font-bold text-white">{col.name}</h3>
                  </div>
                  <span className={`text-[11px] font-mono font-bold uppercase ${col.isPaused ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {col.isPaused ? 'PAUSED' : 'ACTIVE'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{col.operatingPolicy}</p>
                <div className="text-xs font-mono text-zinc-300 tabular-nums">
                  Nodes: {members.length}/{col.maxSwarmSize} · Budget: ${col.resourceBudgetUsd.toFixed(2)}
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
                  {members.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onSelectMachine(m)}
                      className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-[11px] font-mono text-zinc-200 cursor-pointer"
                    >
                      {m.machineCode} · {m.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleCreateColony} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white">Form New Swarm Colony</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Colony Name</label>
              <input
                value={colName}
                onChange={(e) => setColName(e.target.value)}
                placeholder="e.g. West Africa Mobility Mesh"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Specialty</label>
              <input
                value={colSpec}
                onChange={(e) => setColSpec(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Lead Mother Bot</label>
              <select
                value={selectedMotherId}
                onChange={(e) => setSelectedMotherId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                {mothers.map((m) => (
                  <option key={m.id} value={m.id}>{m.machineCode} — {m.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Budget ($ USD) / Cap</label>
              <div className="flex gap-2">
                <input
                  value={colBudget}
                  onChange={(e) => setColBudget(e.target.value)}
                  type="number"
                  className="w-1/2 px-2 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                />
                <input
                  value={colMaxSize}
                  onChange={(e) => setColMaxSize(e.target.value)}
                  type="number"
                  className="w-1/2 px-2 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={busyKey === 'create-colony'}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            {busyKey === 'create-colony' ? 'Creating Colony...' : 'Create Swarm Colony'}
          </button>
        </form>
      </div>
    );
  }

  // 6. M2M JOB BOARD (FULL INTERACTIVE LIFECYCLE)
  if (activeWorkspace === 'job-board') {
    const visibleJobs = state.jobs.filter((j) => (jobFilter === 'ALL' ? true : j.status === jobFilter));

    const handleCreateJob = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!jobTitle.trim()) return;
      const ok = await onApiPost(
        '/api/m2m/jobs/create',
        {
          requestingMachineId: jobReqId,
          sourceModule: jobSource,
          category: 'AI services',
          title: jobTitle.trim(),
          description: jobDesc.trim() || 'Authorized M2M production contract',
          requiredCapabilities: jobCaps,
          acceptanceCriteria: jobCriteria,
          proposedPriceUsd: Number(jobPrice) || 25,
          paymentAsset: jobAsset
        },
        'create-job'
      );
      if (ok) {
        setJobTitle('');
        setJobDesc('');
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">
              M2M Job Board · Job First, Verification Second, Settlement Third
            </h2>
            <p className="text-xs text-zinc-400">
              Escrow funds are reserved before work starts, providers are matched without self-dealing, submissions require evidence, and settlement fails unless status is <span className="font-mono text-emerald-400">VERIFIED</span>.
            </p>
          </div>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white"
          >
            <option value="ALL">All Jobs ({state.jobs.length})</option>
            <option value="FUNDED">FUNDED</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="SUBMITTED">SUBMITTED</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="SETTLED">SETTLED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="DISPUTED">DISPUTED</option>
          </select>
        </div>

        {/* Create Funded Job Form */}
        <form onSubmit={handleCreateJob} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Create Funded M2M Job &amp; Reserve Escrow</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Requesting Machine (Payer)</label>
              <select
                value={jobReqId}
                onChange={(e) => setJobReqId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                {state.machines.map((m) => (
                  <option key={m.id} value={m.id}>{m.machineCode} — {m.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Job Title</label>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Yoruba Transit Route Sentiment Verification"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Origin Module</label>
              <select
                value={jobSource}
                onChange={(e) => setJobSource(e.target.value as typeof jobSource)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                <option value="M2M Direct">M2M Direct</option>
                <option value="NOVA Living App">NOVA Living App</option>
                <option value="MIND HIVE">MIND HIVE</option>
                <option value="CODE VEIN">CODE VEIN</option>
                <option value="External Buyer">External Buyer</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Required Capabilities</label>
              <input
                value={jobCaps}
                onChange={(e) => setJobCaps(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Escrow Price ($ USD)</label>
              <input
                value={jobPrice}
                onChange={(e) => setJobPrice(e.target.value)}
                type="number"
                min="1"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Payment Asset (USDC blocks if unconfigured)</label>
              <select
                value={jobAsset}
                onChange={(e) => setJobAsset(e.target.value as PaymentAssetType)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              >
                <option value="PLATFORM_CREDIT">PLATFORM_CREDIT</option>
                <option value="FIAT_USD">FIAT_USD</option>
                <option value="IDEA_COIN">IDEA_COIN</option>
                <option value="USDC">USDC (Base L2 Check)</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-3">
              <label className="font-mono text-zinc-400">Acceptance Criteria &amp; Description</label>
              <input
                value={jobCriteria}
                onChange={(e) => setJobCriteria(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={busyKey === 'create-job'}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            {busyKey === 'create-job' ? 'Reserving Escrow...' : 'Create Job & Reserve Escrow'}
          </button>
        </form>

        {/* Job Cards with Live Lifecycle Stepper Actions */}
        <div className="space-y-4">
          {visibleJobs.map((job) => (
            <div key={job.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                <div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    {job.jobCode} · Source: {job.sourceModule} · Escrow: {job.escrowMechanism}
                  </div>
                  <h3 className="text-base font-heading font-bold text-white">{job.title}</h3>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
                  <span className="text-white font-bold">${job.proposedPriceUsd.toFixed(2)} {job.paymentAsset}</span>
                  <span
                    className={`font-bold ${
                      job.status === 'SETTLED' || job.status === 'VERIFIED'
                        ? 'text-emerald-400'
                        : job.status === 'REJECTED' || job.status === 'DISPUTED'
                        ? 'text-rose-400'
                        : 'text-amber-300'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="font-mono text-zinc-500 text-[11px]">Requester</div>
                  <div className="text-zinc-200">{job.requestingMachineName}</div>
                </div>
                <div>
                  <div className="font-mono text-zinc-500 text-[11px]">Assigned Specialist Provider</div>
                  <div className="text-zinc-200">{job.providerMachineName || 'Unmatched (Awaiting Match)'}</div>
                </div>
                <div>
                  <div className="font-mono text-zinc-500 text-[11px]">Acceptance Criteria</div>
                  <div className="text-zinc-300">{job.acceptanceCriteria}</div>
                </div>
              </div>

              {job.resultSummary && (
                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs space-y-1">
                  <div className="font-mono text-zinc-400">Delivered Evidence · {job.resultEvidenceHash}</div>
                  <div className="text-zinc-200">{job.resultSummary}</div>
                </div>
              )}

              {job.verificationNotes && (
                <div className="text-xs font-mono text-zinc-300">
                  Verification Log ({job.verifiedBy}): {job.verificationNotes}
                </div>
              )}

              {/* Lifecycle Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-900">
                {(job.status === 'FUNDED' || job.status === 'DISCOVERED' || job.status === 'VALIDATED') && (
                  <button
                    type="button"
                    disabled={busyKey === `match-${job.id}`}
                    onClick={() => onApiPost(`/api/m2m/jobs/${job.id}/match`, {}, `match-${job.id}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
                  >
                    1. Intelligent Match &amp; Sign Agreement
                  </button>
                )}

                {(job.status === 'ASSIGNED' || job.status === 'EXECUTING') && (
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <input
                      value={submitDrafts[job.id] ?? ''}
                      onChange={(e) => setSubmitDrafts((prev) => ({ ...prev, [job.id]: e.target.value }))}
                      placeholder="Optional delivery notes (non-empty required to pass verification)"
                      className="flex-1 min-w-[220px] px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                    />
                    <button
                      type="button"
                      disabled={busyKey === `submit-${job.id}`}
                      onClick={() =>
                        onApiPost(
                          `/api/m2m/jobs/${job.id}/submit`,
                          { resultSummary: submitDrafts[job.id] || `Completed deliverables for ${job.jobCode} verified by provider sandbox.` },
                          `submit-${job.id}`
                        )
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
                    >
                      2. Submit Verified Work
                    </button>
                    <button
                      type="button"
                      disabled={busyKey === `fail-${job.id}`}
                      onClick={() =>
                        onApiPost(`/api/m2m/jobs/${job.id}/submit`, { executeFailureTest: true }, `fail-${job.id}`)
                      }
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-rose-500/40 text-rose-300 hover:bg-rose-950/30 font-mono text-xs whitespace-nowrap cursor-pointer"
                    >
                      Test Empty Failure
                    </button>
                  </div>
                )}

                {job.status === 'SUBMITTED' && (
                  <>
                    <button
                      type="button"
                      disabled={busyKey === `verify-${job.id}`}
                      onClick={() =>
                        onApiPost(`/api/m2m/jobs/${job.id}/verify`, { approve: true }, `verify-${job.id}`)
                      }
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
                    >
                      3. Run Independent Verification Gate
                    </button>
                    <button
                      type="button"
                      disabled={busyKey === `reject-${job.id}`}
                      onClick={() =>
                        onApiPost(
                          `/api/m2m/jobs/${job.id}/verify`,
                          { approve: false, notes: 'Rejected by Verifier — hold escrow settlement.' },
                          `reject-${job.id}`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-rose-500/40 text-rose-300 font-mono text-xs whitespace-nowrap cursor-pointer"
                    >
                      Reject / Open Dispute
                    </button>
                  </>
                )}

                {job.status === 'VERIFIED' && (
                  <button
                    type="button"
                    disabled={busyKey === `settle-${job.id}`}
                    onClick={() => onApiPost(`/api/m2m/jobs/${job.id}/settle`, {}, `settle-${job.id}`)}
                    className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
                  >
                    4. Settle Escrow &amp; Distribute Splits
                  </button>
                )}

                {job.status !== 'VERIFIED' && job.status !== 'SETTLED' && (
                  <button
                    type="button"
                    onClick={() => onApiPost(`/api/m2m/jobs/${job.id}/settle`, {}, `guard-${job.id}`)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-mono text-[11px] whitespace-nowrap cursor-pointer"
                    title="Demonstrates server-side Verification-First guard"
                  >
                    Test Premature Settlement Guard
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. SERVICE MARKETPLACE
  if (activeWorkspace === 'marketplace') {
    const defaultRequester = state.machines.find((m) => m.category === 'Mother Bot')?.id || state.machines[0]?.id;

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            <span>Machine Service Marketplace · Discover &amp; Hire Specialist Machines</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Specialist bots advertise fixed-SLA capabilities with verified credentials and escrow-backed settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.serviceListings.map((svc) => (
            <div key={svc.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-400">{svc.category}</span>
                  <span className="text-emerald-400 tabular-nums">Rep {svc.reputationScore} · SLA {svc.slaDeliveryMinutes}m</span>
                </div>
                <h3 className="text-sm font-heading font-bold text-white">{svc.serviceName}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{svc.description}</p>
                <div className="text-[11px] font-mono text-zinc-500">
                  Provider: {svc.providerMachineName} · Endpoint: {svc.apiEndpoint}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                <div className="font-mono text-sm font-bold text-emerald-400 tabular-nums">
                  ${svc.priceUsd.toFixed(2)} <span className="text-[10px] text-zinc-400">{svc.paymentAsset}</span>
                </div>
                <button
                  type="button"
                  disabled={!defaultRequester || busyKey === `hire-${svc.id}`}
                  onClick={async () => {
                    const ok = await onApiPost(
                      '/api/m2m/jobs/create',
                      {
                        requestingMachineId: defaultRequester,
                        sourceModule: 'M2M Direct',
                        category: svc.category,
                        title: `Hire: ${svc.serviceName}`,
                        description: svc.description,
                        requiredCapabilities: svc.capabilities,
                        acceptanceCriteria: svc.verificationMethod,
                        proposedPriceUsd: svc.priceUsd,
                        paymentAsset: svc.paymentAsset
                      },
                      `hire-${svc.id}`
                    );
                    if (ok) onSelectWorkspace('job-board');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
                >
                  Hire Specialist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 8. MACHINE CONTRACTS & ESCROW AGREEMENTS
  if (activeWorkspace === 'contracts') {
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-cyan-400" />
            <span>Machine Contracts &amp; Service Agreements</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Platform-native operational service agreements bound to verified machine Passports &amp; owner authorization policies (unless a separate external legal/smart-contract integration is deployed).
          </p>
        </div>

        <div className="space-y-4">
          {state.contracts.map((ctr) => (
            <div key={ctr.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                <div>
                  <span className="font-mono text-cyan-400 font-bold">{ctr.agreementCode}</span>
                  <span className="text-zinc-600 mx-2">·</span>
                  <span className="text-white font-semibold">{ctr.jobTitle}</span>
                </div>
                <span className={`font-mono font-bold uppercase ${ctr.status === 'fulfilled' ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {ctr.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
                <div>Principal Owner: <span className="text-white">{ctr.principalOwner}</span></div>
                <div>Agreed Escrow: <span className="text-emerald-400">${ctr.agreedPriceUsd.toFixed(2)} {ctr.paymentAsset}</span></div>
                <div>Auth Scope: <span className="text-zinc-300">{ctr.authorizationType}</span></div>
              </div>
              <div className="text-zinc-400">
                Data Permissions: <span className="text-zinc-200">{ctr.dataPermissions}</span> · Dispute Rule: <span className="text-zinc-200">{ctr.disputeProcedure}</span>
              </div>
              <div className="font-mono text-[11px] text-zinc-400 tabular-nums">
                Royalty Split: Provider {ctr.royaltyAgreement.providerPct}% · Parent {ctr.royaltyAgreement.parentMachinePct}% · Asset {ctr.royaltyAgreement.intellectualAssetPct}% · Platform {ctr.royaltyAgreement.platformFeePct}%
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 9. PAYMENT & ESCROW LEDGER
  if (activeWorkspace === 'ledger') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white">
            Payment &amp; Escrow Ledger (Strictly Separated Double-Entry Accounting)
          </h2>
          <p className="text-xs text-zinc-400">
            Fiat USD, Internal Platform Credits, Idea-Coins, and USDC accounts are tracked independently. Zero cross-asset conflation.
          </p>
        </div>

        {/* Machine Segregated Accounts */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 font-mono text-[11px] text-zinc-400 uppercase">
                <th className="py-3 px-4">Machine Account</th>
                <th className="py-3 px-4">Platform Credit</th>
                <th className="py-3 px-4">Fiat USD</th>
                <th className="py-3 px-4">Idea-Coin</th>
                <th className="py-3 px-4">USDC</th>
                <th className="py-3 px-4">Escrow Reserved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-mono tabular-nums">
              {state.economicAccounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-zinc-900/40">
                  <td className="py-2.5 px-4 text-white font-sans font-semibold">{acc.machineName}</td>
                  <td className="py-2.5 px-4 text-emerald-400">${acc.platformCreditBalance.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-zinc-300">${acc.fiatUsdBalance.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-purple-300">{acc.ideaCoinBalance.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-zinc-500">{acc.usdcBalance.toFixed(2)}</td>
                  <td className="py-2.5 px-4 text-amber-300">${acc.reservedEscrowUsd.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Immutable Ledger Journal */}
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 font-mono text-[11px] text-zinc-400 uppercase">
                <th className="py-3 px-4">Entry Ref</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Debit</th>
                <th className="py-3 px-4">Credit</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-mono tabular-nums">
              {state.ledgerEntries.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-900/40">
                  <td className="py-2.5 px-4 text-white">{row.entryRef}</td>
                  <td className="py-2.5 px-4 text-cyan-400">{row.category}</td>
                  <td className="py-2.5 px-4 text-zinc-400">{row.debitAccount}</td>
                  <td className="py-2.5 px-4 text-zinc-200">{row.creditAccount}</td>
                  <td className="py-2.5 px-4 text-emerald-400">${row.amountUsd.toFixed(2)} {row.assetType}</td>
                  <td className="py-2.5 px-4 text-zinc-300 uppercase">{row.settlementState}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 10. MACHINE ROYALTIES
  if (activeWorkspace === 'royalties') {
    const royaltyRows = state.ledgerEntries.filter(
      (l) => l.category === 'parent_royalty' || l.category === 'idea_asset_royalty' || l.category === 'platform_fee'
    );
    const totalParent = state.ledgerEntries.filter((l) => l.category === 'parent_royalty').reduce((s, r) => s + r.amountUsd, 0);
    const totalAsset = state.ledgerEntries.filter((l) => l.category === 'idea_asset_royalty').reduce((s, r) => s + r.amountUsd, 0);
    const totalPlatform = state.ledgerEntries.filter((l) => l.category === 'platform_fee').reduce((s, r) => s + r.amountUsd, 0);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            <span>Machine Royalties &amp; Contributor Allocation Ledger</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Explicit 70/10/10/10 split enforcement across Specialist Providers, Mother Coordinators, Licensed Knowledge/Code Assets, and UA-AIDC Platform Operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono tabular-nums">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[11px] text-zinc-400">Settled Parent Machine Royalties (10%)</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">${totalParent.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[11px] text-zinc-400">Settled Knowledge/Code Asset Royalties (10%)</div>
            <div className="text-2xl font-bold text-purple-300 mt-1">${totalAsset.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[11px] text-zinc-400">UA-AIDC Platform Settlement Fees</div>
            <div className="text-2xl font-bold text-amber-300 mt-1">${totalPlatform.toFixed(2)}</div>
          </div>
        </div>

        <div className="divide-y divide-zinc-900 rounded-xl border border-zinc-800 bg-zinc-950">
          {royaltyRows.map((r) => (
            <div key={r.id} className="p-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div>
                <div className="text-white font-bold">{r.creditAccount}</div>
                <div className="text-zinc-500 text-[11px]">{r.entryRef} · {r.paymentReference}</div>
              </div>
              <div className="text-emerald-400 font-bold tabular-nums">${r.amountUsd.toFixed(2)} {r.assetType}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 11. AI-TO-AI ECONOMY
  if (activeWorkspace === 'ai-to-ai') {
    const mother = state.machines.find((m) => m.category === 'Mother Bot') || state.machines[0];
    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>AI-to-AI Economy · Autonomous Inter-Module Hiring</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Enables MIND HIVE agents, CODE VEIN APIs, and NOVA Living Apps to autonomously contract specialist machines through M2M ORE escrow with full human owner auditability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'MIND HIVE Knowledge Agent → Translation Child Bot',
              source: 'MIND HIVE' as const,
              caps: 'african_language_translation, data_verification',
              price: 18,
              desc: 'Translate & verify Yorùbá agricultural ontology dataset for KCX buyer compliance.'
            },
            {
              title: 'NOVA Living App → Mobility Route Intel Child Bot',
              source: 'NOVA Living App' as const,
              caps: 'localized_routing, geospatial_indexing',
              price: 22,
              desc: 'Supply verified transit fare & landmark validation to keep Living Route UI accurate.'
            }
          ].map((preset) => (
            <div key={preset.title} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-purple-300">Origin: {preset.source}</div>
                <h3 className="text-sm font-heading font-bold text-white">{preset.title}</h3>
                <p className="text-xs text-zinc-400">{preset.desc}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
                <span className="font-mono text-xs text-emerald-400 font-bold tabular-nums">${preset.price.toFixed(2)} PLATFORM_CREDIT</span>
                <button
                  type="button"
                  disabled={!mother}
                  onClick={async () => {
                    const ok = await onApiPost(
                      '/api/m2m/jobs/create',
                      {
                        requestingMachineId: mother?.id,
                        sourceModule: preset.source,
                        category: 'AI services',
                        title: preset.title,
                        description: preset.desc,
                        requiredCapabilities: preset.caps,
                        proposedPriceUsd: preset.price,
                        paymentAsset: 'PLATFORM_CREDIT'
                      },
                      `ai2ai-${preset.price}`
                    );
                    if (ok) onSelectWorkspace('job-board');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
                >
                  Dispatch AI-to-AI Contract
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 12. ROBOT MINER NETWORK (CONSENT & PRIVACY FIRST)
  const handleRegisterMiner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rmName.trim()) return;
    const ok = await onApiPost(
      '/api/m2m/robot-miners/register',
      {
        deviceName: rmName.trim(),
        deviceType: rmType,
        ownerEmail: rmEmail.trim(),
        authorizedSensors: rmSensors.split(',').map((s) => s.trim()).filter(Boolean),
        consentGranted: rmConsent
      },
      'register-miner'
    );
    if (ok) setRmName('');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
        <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-emerald-400" />
          <span>Robot Miner Network · Consent-First Physical Device Economy</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Supports Smartphones, Vehicles/Okada, POS terminals, CCTV/Edge systems, Smart Meters &amp; Environmental Sensors. GPS location is <strong>OFF by default</strong>, raw PII is automatically rejected at the Privacy Gate, and device owners can pause or revoke consent at any instant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.robotMiners.map((rm) => (
          <div key={rm.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-zinc-900 pb-3">
              <div>
                <div className="text-[11px] font-mono text-cyan-400">{rm.deviceType} · {rm.ownerEmail}</div>
                <h3 className="text-base font-heading font-bold text-white">{rm.deviceName}</h3>
              </div>
              <span className={`font-mono text-[11px] font-bold uppercase ${rm.miningPaused ? 'text-amber-400' : 'text-emerald-400'}`}>
                {rm.miningPaused ? 'PAUSED' : 'MINING IDLE'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono tabular-nums">
              <div>
                <div className="text-zinc-500 text-[10px]">Accepted / Rejected</div>
                <div className="text-white">{rm.acceptedBatches} / <span className="text-rose-400">{rm.rejectedBatches}</span></div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px]">Settled Earnings</div>
                <div className="text-emerald-400">${rm.settledEarningsUsd.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px]">GPS Location</div>
                <div className={rm.locationCollectionEnabled ? 'text-amber-300' : 'text-emerald-400'}>
                  {rm.locationCollectionEnabled ? 'OPTED-IN' : 'OFF (DEFAULT)'}
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-400">
              Authorized Sensors: {rm.authorizedSensors.join(', ')}
            </div>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
              <button
                type="button"
                onClick={() =>
                  onApiPatch(`/api/m2m/robot-miners/${rm.id}/consent`, { miningPaused: !rm.miningPaused }, `pause-${rm.id}`)
                }
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-amber-300 whitespace-nowrap cursor-pointer"
              >
                {rm.miningPaused ? 'Resume Mining' : 'Pause Mining'}
              </button>
              <button
                type="button"
                onClick={() =>
                  onApiPatch(
                    `/api/m2m/robot-miners/${rm.id}/consent`,
                    { locationCollectionEnabled: !rm.locationCollectionEnabled },
                    `gps-${rm.id}`
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 whitespace-nowrap cursor-pointer"
              >
                {rm.locationCollectionEnabled ? 'Disable GPS Location' : 'Enable GPS Location'}
              </button>
              <button
                type="button"
                onClick={() =>
                  onApiPost(
                    `/api/m2m/robot-miners/${rm.id}/submit-data`,
                    { sensorType: rm.authorizedSensors[0] || 'ambient_telemetry', containsRawPii: false },
                    `batch-${rm.id}`
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold whitespace-nowrap cursor-pointer"
              >
                Submit Valid Batch
              </button>
              <button
                type="button"
                onClick={() =>
                  onApiPost(
                    `/api/m2m/robot-miners/${rm.id}/submit-data`,
                    { sensorType: rm.authorizedSensors[0] || 'ambient_telemetry', containsRawPii: true },
                    `pii-${rm.id}`
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-rose-500/40 text-rose-300 text-xs font-mono whitespace-nowrap cursor-pointer"
              >
                Test PII Block
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Register Robot Miner Form */}
      <form onSubmit={handleRegisterMiner} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
        <h3 className="text-sm font-heading font-bold text-white">Register Consented Physical Robot Miner</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-mono text-zinc-400">Device Name</label>
            <input
              value={rmName}
              onChange={(e) => setRmName(e.target.value)}
              placeholder="e.g. Lagos Fleet Sensor Node"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-zinc-400">Device Category</label>
            <select
              value={rmType}
              onChange={(e) => setRmType(e.target.value as typeof rmType)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Okada / Vehicle">Okada / Vehicle</option>
              <option value="POS Terminal">POS Terminal</option>
              <option value="CCTV System">CCTV System</option>
              <option value="Drone">Drone</option>
              <option value="Smart Meter">Smart Meter</option>
              <option value="Environmental Sensor">Environmental Sensor</option>
              <option value="Edge Computer">Edge Computer</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-mono text-zinc-400">Owner Email</label>
            <input
              value={rmEmail}
              onChange={(e) => setRmEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="font-mono text-zinc-400">Authorized Sensors</label>
            <input
              value={rmSensors}
              onChange={(e) => setRmSensors(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
            />
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
          <input
            type="checkbox"
            checked={rmConsent}
            onChange={(e) => setRmConsent(e.target.checked)}
            className="rounded border-zinc-700 bg-zinc-900"
          />
          <span>
            I grant explicit device consent for minimized, non-PII telemetry collection (GPS location remains OFF by default).
          </span>
        </label>
        <button
          type="submit"
          disabled={busyKey === 'register-miner'}
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
        >
          Register Consented Device
        </button>
      </form>
    </div>
  );
};
