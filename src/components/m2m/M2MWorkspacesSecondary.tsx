import React, { useState } from 'react';
import {
  AlertOctagon,
  Award,
  BarChart3,
  CheckCircle2,
  Download,
  GitBranch,
  Globe,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { M2MWorkspaceSharedProps } from './M2MWorkspacesPrimary';
import { M2MBreedingRequest } from '../../types/m2mOre';

export const M2MWorkspacesSecondary: React.FC<M2MWorkspaceSharedProps> = ({
  state,
  activeWorkspace,
  busyKey,
  onSelectWorkspace,
  onSelectMachine,
  onApiPost,
  onUpdateMachineStatus
}) => {
  // Discovery Protocol tester state
  const [discCat, setDiscCat] = useState('');
  const [discCap, setDiscCap] = useState('');
  const [discResponse, setDiscResponse] = useState<string | null>(null);
  const [extName, setExtName] = useState('');
  const [extEmail, setExtEmail] = useState('partner@lagos-compute.ng');
  const [extCap, setExtCap] = useState('edge_ocr_verification');
  const [extEndpoint, setExtEndpoint] = useState('https://api.lagos-compute.ng/m2m/ocr');
  const [extPrice, setExtPrice] = useState('20');
  const [extApiKey, setExtApiKey] = useState('m2m-partner-demo-key-2026');

  // Economic Digital Twin simulation state
  const [simName, setSimName] = useState('4-Node Translation Scaling Scenario');
  const [simInstances, setSimInstances] = useState('4');
  const [simPrice, setSimPrice] = useState('35');

  // Passport search state
  const [passportQuery, setPassportQuery] = useState('');

  // Breeding & Evolution form state
  const [breedParentId, setBreedParentId] = useState(
    () => state.machines.find((m) => m.category === 'Mother Bot')?.id || state.machines[0]?.id || ''
  );
  const [breedType, setBreedType] = useState<M2MBreedingRequest['evolutionType']>('Specialization');
  const [breedSpec, setBreedSpec] = useState('Swahili Market Price Auditor');
  const [breedDemandJob, setBreedDemandJob] = useState(state.jobs[0]?.id || 'job-m2m-002');
  const [breedProvCost, setBreedProvCost] = useState('12');
  const [breedOpCost, setBreedOpCost] = useState('15');
  const [breedEvidence, setBreedEvidence] = useState(
    'Verified East Africa NOVA living app translation backlog exceeding 80% SLA threshold'
  );
  const [breedRequireApproval, setBreedRequireApproval] = useState(true);

  // Kill Switch reason state
  const [killReason, setKillReason] = useState('Scheduled owner safety inspection');

  // Customer Acquisition quotation state
  const [quoteNote, setQuoteNote] = useState<string | null>(null);

  // 13. GLOBAL MACHINE DISCOVERY PROTOCOL
  if (activeWorkspace === 'discovery') {
    const handleProbeDiscovery = async () => {
      const qs = new URLSearchParams();
      if (discCat.trim()) qs.set('category', discCat.trim());
      if (discCap.trim()) qs.set('capability', discCap.trim());
      try {
        const res = await fetch(`/api/m2m/discovery/services?${qs.toString()}`);
        const json = await res.json();
        setDiscResponse(JSON.stringify(json, null, 2));
      } catch (err) {
        setDiscResponse(`Error probing discovery API: ${String(err)}`);
      }
    };

    const handleRegisterExternal = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!extName.trim()) return;
      try {
        const res = await fetch('/api/m2m/discovery/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-M2M-API-KEY': extApiKey
          },
          body: JSON.stringify({
            machineName: extName.trim(),
            ownerEmail: extEmail.trim(),
            capabilityKey: extCap.trim(),
            endpointUrl: extEndpoint.trim(),
            priceUsd: Number(extPrice) || 20
          })
        });
        const json = await res.json();
        setDiscResponse(JSON.stringify(json, null, 2));
        if (res.ok) {
          setExtName('');
          await onApiPost('/api/m2m/discovery/services', undefined, undefined).catch(() => {});
          // Refresh full state cleanly via state probe
          onSelectWorkspace('marketplace');
        }
      } catch (err) {
        setDiscResponse(`Error: ${String(err)}`);
      }
    };

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <span>Global Machine Discovery Protocol (M2M-ORE-DISCOVERY-V18)</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Authenticated HTTP discovery endpoint for external developers, partner AI agents, and service buyers. Rate limit: 60 req/min per API identity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Query Tester */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white">Query GET /api/m2m/discovery/services</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <input
                value={discCat}
                onChange={(e) => setDiscCat(e.target.value)}
                placeholder="Filter category (e.g. Translation)"
                className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              />
              <input
                value={discCap}
                onChange={(e) => setDiscCap(e.target.value)}
                placeholder="Filter capability (e.g. verification)"
                className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
            <button
              type="button"
              onClick={handleProbeDiscovery}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              Execute Live Discovery Query
            </button>
            {discResponse && (
              <pre className="p-3 rounded-lg bg-black border border-zinc-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-72">
                {discResponse}
              </pre>
            )}
          </div>

          {/* Register External Partner Service */}
          <form onSubmit={handleRegisterExternal} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-heading font-bold text-white">
              POST /api/m2m/discovery/register (External Partner Machine)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input
                value={extName}
                onChange={(e) => setExtName(e.target.value)}
                placeholder="External Machine Name"
                className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
              <input
                value={extEmail}
                onChange={(e) => setExtEmail(e.target.value)}
                placeholder="Partner Owner Email"
                className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
              <input
                value={extCap}
                onChange={(e) => setExtCap(e.target.value)}
                placeholder="Capability Key"
                className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                required
              />
              <input
                value={extPrice}
                onChange={(e) => setExtPrice(e.target.value)}
                type="number"
                placeholder="Price ($)"
                className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
              <input
                value={extEndpoint}
                onChange={(e) => setExtEndpoint(e.target.value)}
                placeholder="HTTPS Callback Endpoint"
                className="sm:col-span-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
              <input
                value={extApiKey}
                onChange={(e) => setExtApiKey(e.target.value)}
                placeholder="X-M2M-API-KEY header"
                className="sm:col-span-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              Register External Capability Listing
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 14. MACHINE REPUTATION
  if (activeWorkspace === 'reputation') {
    const sorted = [...state.machines].sort((a, b) => b.reputationScore - a.reputationScore);
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Machine Reputation &amp; Anti-Wash-Trading Monitor</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Reputation increments only after independent verifier clearance and settled work. Circular owner-to-owner self-dealing is blocked at match time.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 font-mono text-[11px] text-zinc-400 uppercase">
                <th className="py-3 px-4">Machine</th>
                <th className="py-3 px-4">Reputation</th>
                <th className="py-3 px-4">Reliability</th>
                <th className="py-3 px-4">Completed</th>
                <th className="py-3 px-4">Failed / Disputed</th>
                <th className="py-3 px-4">Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900 font-mono tabular-nums">
              {sorted.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-900/40">
                  <td className="py-3 px-4 font-sans font-semibold text-white">
                    <button type="button" onClick={() => onSelectMachine(m)} className="hover:text-emerald-400 cursor-pointer">
                      {m.machineCode} · {m.name}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{m.reputationScore}</td>
                  <td className="py-3 px-4 text-zinc-200">{m.reliabilityRating}%</td>
                  <td className="py-3 px-4 text-zinc-200">{m.completedJobsCount}</td>
                  <td className="py-3 px-4 text-rose-400">
                    {m.failedJobsCount} / {m.disputedJobsCount}
                  </td>
                  <td className="py-3 px-4 text-emerald-400 uppercase">{m.passport.securityStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // 15. ECONOMIC INTELLIGENCE (ACCOUNTING + DIGITAL TWIN SIMULATION)
  if (activeWorkspace === 'economic-intel') {
    const grossSettled = state.jobs
      .filter((j) => j.status === 'SETTLED')
      .reduce((acc, j) => acc + j.proposedPriceUsd, 0);
    const totalExpenses = state.machines.reduce((acc, m) => acc + m.operatingExpensesUsd, 0);
    const totalPlatformFees = state.ledgerEntries
      .filter((l) => l.category === 'platform_fee')
      .reduce((acc, l) => acc + l.amountUsd, 0);
    const totalRoyalties = state.ledgerEntries
      .filter((l) => l.category === 'parent_royalty' || l.category === 'idea_asset_royalty')
      .reduce((acc, l) => acc + l.amountUsd, 0);
    const netResult = +(grossSettled - totalExpenses).toFixed(2);

    const handleDownloadCsv = () => {
      const headers = ['EntryRef', 'JobId', 'Category', 'Debit', 'Credit', 'AmountUsd', 'AssetType', 'State', 'Timestamp'];
      const rows = state.ledgerEntries.map((r) => [
        r.entryRef,
        r.jobId,
        r.category,
        r.debitAccount,
        r.creditAccount,
        r.amountUsd.toFixed(2),
        r.assetType,
        r.settlementState,
        r.createdAt
      ]);
      const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `m2m_ore_ledger_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const handleSimulateTwin = async (e: React.FormEvent) => {
      e.preventDefault();
      await onApiPost(
        '/api/m2m/economic-twin/simulate',
        {
          scenarioName: simName,
          simulatedInstances: Number(simInstances) || 4,
          simulatedPriceUsd: Number(simPrice) || 35
        },
        'simulate-twin'
      );
    };

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Economic Intelligence · Recorded Operations vs Economic Digital Twin</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Separates verified settled ledger performance from projected Digital Twin modeling runs.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-emerald-400 text-xs font-mono text-white flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Verified Ledger CSV</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono tabular-nums">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-400">Settled Gross Revenue</div>
            <div className="text-lg font-bold text-emerald-400 mt-1">${grossSettled.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-400">Operating Expenses</div>
            <div className="text-lg font-bold text-rose-300 mt-1">${totalExpenses.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-400">Platform Fees</div>
            <div className="text-lg font-bold text-amber-300 mt-1">${totalPlatformFees.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-400">Royalties Distributed</div>
            <div className="text-lg font-bold text-purple-300 mt-1">${totalRoyalties.toFixed(2)}</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] text-zinc-400">Net Operating Result</div>
            <div className="text-lg font-bold text-white mt-1">${netResult.toFixed(2)}</div>
          </div>
        </div>

        {/* Economic Digital Twin Simulator */}
        <form onSubmit={handleSimulateTwin} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-heading font-bold text-white">Economic Digital Twin Stress Test</h3>
            <span className="font-mono text-[11px] font-bold text-amber-400">
              SIMULATION ONLY — NOT REAL REVENUE
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <input
              value={simName}
              onChange={(e) => setSimName(e.target.value)}
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
            />
            <input
              value={simInstances}
              onChange={(e) => setSimInstances(e.target.value)}
              type="number"
              min="1"
              max="50"
              placeholder="Simulated child instances"
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
            />
            <input
              value={simPrice}
              onChange={(e) => setSimPrice(e.target.value)}
              type="number"
              min="1"
              placeholder="Simulated unit price ($)"
              className="px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
            />
          </div>
          <button
            type="submit"
            disabled={busyKey === 'simulate-twin'}
            className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            Run Non-Production Projection
          </button>

          {state.digitalTwinRuns.length > 0 && (
            <div className="divide-y divide-zinc-900 border-t border-zinc-900 pt-2">
              {state.digitalTwinRuns.slice(0, 5).map((run) => (
                <div key={run.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div>
                    <span className="text-amber-300 font-bold">{run.label}</span>
                    <span className="text-zinc-600 mx-2">·</span>
                    <span className="text-white">{run.scenarioName}</span>
                  </div>
                  <div className="text-zinc-300 tabular-nums">
                    Projected Gross ${run.projectedGrossUsd.toFixed(2)} · Net ${run.projectedNetUsd.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }

  // 16. MACHINE DIGITAL PASSPORTS
  if (activeWorkspace === 'passports') {
    const matches = state.machines.filter((m) => {
      if (!passportQuery.trim()) return true;
      const q = passportQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.machineCode.toLowerCase().includes(q) ||
        m.passport.passportSerial.toLowerCase().includes(q)
      );
    });

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Machine Digital Passports · Verifiable Cryptographic Identity</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Every machine carries a verifiable serial, owner binding, software/hardware manifest, and SHA-256 verification digest.
            </p>
          </div>
          <input
            value={passportQuery}
            onChange={(e) => setPassportQuery(e.target.value)}
            placeholder="Lookup serial or machine code..."
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m) => (
            <div key={m.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-mono text-emerald-400 font-bold">{m.passport.passportSerial}</div>
                  <h3 className="text-base font-heading font-bold text-white mt-0.5">{m.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectMachine(m)}
                  className="px-3 py-1 rounded bg-zinc-900 border border-zinc-700 hover:border-emerald-400 font-mono text-[11px] text-white cursor-pointer"
                >
                  Inspect Full Passport
                </button>
              </div>
              <div className="font-mono text-zinc-400 text-[11px] break-all">
                Digest: {m.passport.verificationHash}
              </div>
              <div className="font-mono text-zinc-300">
                SLA {m.passport.slaTargetAvailabilityPct}% · Response &le;{m.passport.slaMaxResponseSec}s · Owner: {m.passport.ownerEmail}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 17. EVIDENCE-BASED SWARM EVOLUTION & BREEDING
  if (activeWorkspace === 'evolution') {
    const mothers = state.machines.filter((m) => m.category === 'Mother Bot');
    const handleBreeding = async (e: React.FormEvent) => {
      e.preventDefault();
      const ok = await onApiPost(
        '/api/m2m/breeding/request',
        {
          parentMachineId: breedParentId,
          evolutionType: breedType,
          requestedSpecialization: breedSpec.trim(),
          verifiedDemandJobId: breedDemandJob,
          provisioningCostUsd: Number(breedProvCost) || 12,
          expectedOperatingCostUsd: Number(breedOpCost) || 15,
          evidenceSummary: breedEvidence.trim(),
          requireOwnerApproval: breedRequireApproval
        },
        'request-breeding'
      );
      if (ok && breedRequireApproval) {
        onSelectWorkspace('approvals');
      }
    };

    return (
      <div className="space-y-6">
        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-emerald-400" />
            <span>Evidence-Based Swarm Evolution &amp; Child Breeding</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Machines can only breed when customer demand evidence, parent budget, swarm max-child limit, and governance clearance are all verified. Unjustified cloning is rejected.
          </p>
        </div>

        <form onSubmit={handleBreeding} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white">Submit Evidence-Backed Child Spawn Proposal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Parent Mother Bot</label>
              <select
                value={breedParentId}
                onChange={(e) => setBreedParentId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                {(mothers.length > 0 ? mothers : state.machines).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.machineCode} — {m.name} (Cap {m.maxChildren})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Evolution Type</label>
              <select
                value={breedType}
                onChange={(e) => setBreedType(e.target.value as M2MBreedingRequest['evolutionType'])}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
              >
                <option value="Specialization">Specialization</option>
                <option value="Capacity Expansion">Capacity Expansion</option>
                <option value="Capability Expansion">Capability Expansion</option>
                <option value="Colony Formation">Colony Formation</option>
                <option value="Service Replication">Service Replication</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Requested Child Specialization</label>
              <input
                value={breedSpec}
                onChange={(e) => setBreedSpec(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Provisioning Cost ($)</label>
              <input
                value={breedProvCost}
                onChange={(e) => setBreedProvCost(e.target.value)}
                type="number"
                min="5"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Initial Operating Reserve ($)</label>
              <input
                value={breedOpCost}
                onChange={(e) => setBreedOpCost(e.target.value)}
                type="number"
                min="5"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-mono text-zinc-400">Reference Funded Job</label>
              <select
                value={breedDemandJob}
                onChange={(e) => setBreedDemandJob(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
              >
                {state.jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.jobCode} — {j.title.slice(0, 32)}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1 md:col-span-3">
              <label className="font-mono text-zinc-400">Verified Demand Evidence (&ge;10 chars)</label>
              <input
                value={breedEvidence}
                onChange={(e) => setBreedEvidence(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={breedRequireApproval}
              onChange={(e) => setBreedRequireApproval(e.target.checked)}
              className="rounded border-zinc-700 bg-zinc-900"
            />
            <span>Route through Level 4 Owner Approval Center before provisioning resources</span>
          </label>

          <button
            type="submit"
            disabled={busyKey === 'request-breeding'}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            Submit Evidence-Based Evolution Request
          </button>
        </form>

        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <h3 className="text-sm font-heading font-bold text-white">Evolution History</h3>
          {state.breedingRequests.length === 0 ? (
            <div className="text-xs text-zinc-500 font-mono">No swarm expansion requests submitted yet.</div>
          ) : (
            <div className="divide-y divide-zinc-900">
              {state.breedingRequests.map((br) => (
                <div key={br.id} className="py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="text-white font-semibold">{br.requestedSpecialization} ({br.evolutionType})</div>
                    <div className="text-zinc-400 font-mono text-[11px]">{br.evidenceSummary}</div>
                  </div>
                  <span className="font-mono font-bold uppercase text-emerald-400">{br.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 18. MACHINE RESURRECTION
  if (activeWorkspace === 'resurrection') {
    const flagged = state.machines.filter(
      (m) =>
        m.operationalStatus === 'paused' ||
        m.operationalStatus === 'offline' ||
        m.operationalStatus === 'failed' ||
        m.failedJobsCount > 0 ||
        m.completedJobsCount === 0
    );

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-amber-400" />
            <span>Machine Resurrection · Idle, Paused &amp; Underutilized Node Recovery</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Re-assigns dormant or paused machines only with explicit owner confirmation. Unresponsive nodes may be retired cleanly.
          </p>
        </div>

        <div className="space-y-3">
          {flagged.map((m) => (
            <div key={m.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <div className="text-white font-semibold">{m.machineCode} · {m.name}</div>
                <div className="font-mono text-zinc-400 text-[11px]">
                  Status: {m.operationalStatus} · Completed: {m.completedJobsCount} · Failures: {m.failedJobsCount}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {m.operationalStatus !== 'retired' && (
                  <>
                    <button
                      type="button"
                      onClick={() => onUpdateMachineStatus(m.id, 'idle')}
                      className="px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold cursor-pointer"
                    >
                      Approve Resume
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateMachineStatus(m.id, 'retired')}
                      className="px-3 py-1.5 rounded bg-zinc-900 border border-rose-500/40 text-rose-300 font-mono cursor-pointer"
                    >
                      Retire Node
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 19. CUSTOMER ACQUISITION ENGINE
  if (activeWorkspace === 'acquisition') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white">
            Customer Acquisition Engine (Human-Approved B2B Outreach)
          </h2>
          <p className="text-xs text-zinc-400">
            Prepares capability-matched service quotations for external buyers. Outbound outreach remains strictly human-approved (Level 4).
          </p>
        </div>

        {quoteNote && (
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono text-emerald-300">
            {quoteNote}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.acquisitionProspects.map((p) => (
            <div key={p.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-cyan-400">{p.sector}</span>
                <span className="font-mono uppercase text-amber-300">{p.qualificationStatus.replace(/_/g, ' ')}</span>
              </div>
              <h3 className="text-base font-heading font-bold text-white">{p.organization}</h3>
              <p className="text-zinc-400">{p.neededService}</p>
              <div className="flex items-center justify-between pt-3 border-t border-zinc-900 font-mono">
                <span className="text-emerald-400 tabular-nums">Est. ${p.estimatedMonthlyUsd.toFixed(2)}/mo</span>
                <button
                  type="button"
                  onClick={() =>
                    setQuoteNote(
                      `Prepared M2M Quotation for ${p.organization}: Matched to ${p.matchedMachineId} · $${p.estimatedMonthlyUsd}/mo · Awaiting Human Outreach Approval.`
                    )
                  }
                  className="px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700 hover:border-emerald-400 text-white cursor-pointer"
                >
                  Prepare Quotation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 20. AGENT WORKFORCE
  if (activeWorkspace === 'workforce') {
    const roles = [
      { role: 'Machine Operations Manager Agent', level: 'Level 3', scope: 'Monitor heartbeats, latency & failover alerts' },
      { role: 'Job Discovery & Qualification Agent', level: 'Level 2', scope: 'Screen inbound M2M & NOVA service demand' },
      { role: 'Capability Matching & Negotiation Agent', level: 'Level 3', scope: 'Bind non-self-dealing specialist providers' },
      { role: 'Escrow & Treasury Controller Agent', level: 'Level 4 Guarded', scope: 'Hold reservations & verify settlement invariants' },
      { role: 'Independent Output Verification Agent', level: 'Level 3', scope: 'Enforce acceptance criteria & block empty results' },
      { role: 'Privacy & Sensor Compliance Auditor', level: 'Level 5 Strict', scope: 'Reject PII submissions & enforce GPS OFF default' }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <span>M2M Agent Coordinator Workforce</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Role-segregated governance coordinators enforcing separation between execution, independent verification, and escrow release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((r) => (
            <div key={r.role} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-emerald-400 font-bold">{r.level}</span>
                <span className="text-zinc-500">ACTIVE</span>
              </div>
              <div className="text-sm font-heading font-bold text-white">{r.role}</div>
              <div className="text-zinc-400">{r.scope}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 21. LEVEL 4 OWNER APPROVAL CENTER
  if (activeWorkspace === 'approvals') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white">
            Level 4 Approval Center · Human Owner Authorization Gate
          </h2>
          <p className="text-xs text-zinc-400">
            Swarm expansions, child machine spawns, and elevated financial commitments wait here until explicitly approved by the human owner.
          </p>
        </div>

        {state.approvalRequests.length === 0 ? (
          <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400">
            No Level 4 approval requests queued. Submit an evidence-backed expansion request in Workspace 17 (Machine Evolution) to test the owner gate.
          </div>
        ) : (
          <div className="space-y-3">
            {state.approvalRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="font-mono text-amber-300">
                    LEVEL {req.governanceLevel} · {req.requestType} · Exposure ${req.financialExposureUsd.toFixed(2)}
                  </div>
                  <div className="text-sm font-semibold text-white">{req.summary}</div>
                  <div className="font-mono text-zinc-500 text-[11px]">
                    Machine: {req.machineName} · Requested {new Date(req.requestedAt).toLocaleString()}
                  </div>
                </div>
                {req.status === 'pending' ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      disabled={busyKey === `appr-${req.id}`}
                      onClick={() => onApiPost(`/api/m2m/approvals/${req.id}/resolve`, { approved: true }, `appr-${req.id}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold cursor-pointer"
                    >
                      Approve &amp; Provision
                    </button>
                    <button
                      type="button"
                      disabled={busyKey === `rej-${req.id}`}
                      onClick={() => onApiPost(`/api/m2m/approvals/${req.id}/resolve`, { approved: false }, `rej-${req.id}`)}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-rose-500/40 text-rose-300 font-mono cursor-pointer"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className={`font-mono font-bold uppercase ${req.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {req.status} ({req.resolvedBy})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 22. SECURITY, GOVERNANCE & GLOBAL KILL SWITCH
  if (activeWorkspace === 'security') {
    return (
      <div className="space-y-6">
        <div className={`p-6 rounded-xl border space-y-4 ${state.globalKillSwitchActive ? 'bg-rose-950/30 border-rose-500/60' : 'bg-zinc-950 border-zinc-800'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <AlertOctagon className={`w-5 h-5 ${state.globalKillSwitchActive ? 'text-rose-400' : 'text-amber-400'}`} />
                <span>Emergency Global Kill Switch &amp; Level 1–5 Governance</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Activating the Kill Switch immediately pauses every active machine &amp; colony and halts new job creation or breeding.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                value={killReason}
                onChange={(e) => setKillReason(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
              />
              <button
                type="button"
                disabled={busyKey === 'kill-switch'}
                onClick={() =>
                  onApiPost(
                    '/api/m2m/governance/kill-switch',
                    { active: !state.globalKillSwitchActive, reason: killReason },
                    'kill-switch'
                  )
                }
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold whitespace-nowrap cursor-pointer ${
                  state.globalKillSwitchActive
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {state.globalKillSwitchActive ? 'Release Kill Switch (Resume)' : 'Activate Global Kill Switch'}
              </button>
            </div>
          </div>
        </div>

        {/* Governance 5 Levels & Internal Risk Reserve */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
            <h3 className="text-sm font-heading font-bold text-white">5-Level Autonomous Governance Policy</h3>
            {[
              'Level 1 Observe: Telemetry, heartbeats & capability health scanning.',
              'Level 2 Prepare: Draft quotations, capability matches & non-binding proposals.',
              'Level 3 Execute Bounded: Pre-budgeted child jobs within daily spend caps.',
              'Level 4 Owner Approval: Swarm expansion, new Mother Bots & elevated withdrawals.',
              'Level 5 Strictly Restricted: PII leakage, self-dealing & unverified settlement — BLOCKED.'
            ].map((line) => (
              <div key={line} className="py-1.5 border-b border-zinc-900 last:border-b-0 text-zinc-300 font-mono text-[11px]">
                {line}
              </div>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <h3 className="text-sm font-heading font-bold text-white">{state.riskReserve.reserveLabel}</h3>
            <div className="grid grid-cols-3 gap-3 font-mono tabular-nums pt-2">
              <div>
                <div className="text-zinc-500 text-[10px]">Reserve Pool</div>
                <div className="text-lg font-bold text-emerald-400">${state.riskReserve.totalReserveUsd.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px]">Active Escrow Risk</div>
                <div className="text-lg font-bold text-amber-300">${state.riskReserve.jobFailureExposureUsd.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-zinc-500 text-[10px]">Dispute Exposure</div>
                <div className="text-lg font-bold text-rose-400">${state.riskReserve.disputeExposureUsd.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 23. ANALYTICS
  if (activeWorkspace === 'analytics') {
    const chartData = state.machines.map((m) => ({
      code: m.machineCode,
      earningsUsd: m.totalEarningsUsd,
      reputation: m.reputationScore
    }));

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <span>M2M Pilot Performance &amp; Settlement Analytics</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Real settled USD-equivalent earnings and live reputation scores across registered pilot nodes.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="text-xs font-mono text-zinc-400">Settled Earnings by Machine Code ($ PLATFORM_CREDIT)</div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="code" stroke="#a1a1aa" fontSize={11} />
                <YAxis stroke="#a1a1aa" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', fontSize: '12px' }}
                />
                <Bar dataKey="earningsUsd" name="Settled Earnings ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  // 24. SETTINGS & PILOT BASELINE CONTROLS
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-zinc-300" />
          <span>M2M ORE Module 6 Settings &amp; Pilot Reset</span>
        </h2>
        <p className="text-xs text-zinc-400">
          Inspect live integration configuration status and reset the persisted `/data/m2m_ore_state.json` store back to the canonical pilot baseline when testing.
        </p>
      </div>

      <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-semibold text-white">Reset to Clean Pilot Baseline</div>
            <div className="text-xs text-zinc-400">
              Restores 1 Authorized Mother Bot, 3 Specialist Children, 1 Consented Robot Miner, JOB-M2M-001 (Settled $45), and JOB-M2M-002 (Open Funded $35).
            </div>
          </div>
          <button
            type="button"
            disabled={busyKey === 'reset-pilot'}
            onClick={() => onApiPost('/api/m2m/pilot/reset', {}, 'reset-pilot')}
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-300 font-mono text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            Reset Pilot Baseline State
          </button>
        </div>

        <div className="pt-4 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          {state.adapters.map((a) => (
            <div key={a.moduleId} className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-between gap-2">
              <div>
                <div className="text-white font-bold">{a.moduleName}</div>
                <div className="text-[11px] text-zinc-500">{a.detail}</div>
              </div>
              <span className={a.status === 'not_configured' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                {a.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
