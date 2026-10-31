import React, { useState } from 'react';
import {
  Code,
  Sparkles,
  Shield,
  FileCheck,
  CheckCircle,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Play,
  RotateCcw,
  Sliders,
  DollarSign,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AgentConstitution } from '../../types/governance';

interface AgentConstitutionCompilerProps {
  constitutions: AgentConstitution[];
  onSaveConstitution?: (constitution: AgentConstitution) => void;
  onSendToDigitalTwin?: (constitution: AgentConstitution) => void;
}

export const AgentConstitutionCompiler: React.FC<AgentConstitutionCompilerProps> = ({
  constitutions,
  onSaveConstitution,
  onSendToDigitalTwin
}) => {
  const [selectedPreset, setSelectedPreset] = useState<AgentConstitution>(constitutions[0]);
  const [agentName, setAgentName] = useState(constitutions[0]?.agentName || 'NewAutonomousAgent');
  const [purpose, setPurpose] = useState(constitutions[0]?.purpose || 'Autonomous commercial opportunity discovery and contract drafting.');
  const [scope, setScope] = useState(constitutions[0]?.scope || 'Public procurement portals, verified feeds, and Base L2 smart contracts.');
  const [maxSpendSingle, setMaxSpendSingle] = useState<number>(constitutions[0]?.permissionBoundaries.maxSingleTransactionUsd || 100);
  const [maxSpendDaily, setMaxSpendDaily] = useState<number>(constitutions[0]?.permissionBoundaries.maxDailyBudgetUsd || 500);
  const [requireHumanApproval, setRequireHumanApproval] = useState<boolean>(true);
  const [enforceW3CDid, setEnforceW3CDid] = useState<boolean>(true);

  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledResult, setCompiledResult] = useState<AgentConstitution | null>(constitutions[0]);
  const [copiedJson, setCopiedJson] = useState(false);

  const PRESETS = [
    { id: 'deal_hunter', label: 'Tender & Deal Hunter', desc: 'Read-only discovery with zero-spend & admin approval checkpoints' },
    { id: 'closer_bot', label: 'Commercial Closer Bot', desc: 'Payment link generation with strict Paystack webhook verification' },
    { id: 'multilingual_tutor', label: 'AI University Dean', desc: 'Educational lecture generation with cryptographic NFT proof' }
  ];

  const handleSelectPreset = (presetId: string) => {
    if (presetId === 'deal_hunter') {
      const c = constitutions[0];
      setSelectedPreset(c);
      setAgentName(c.agentName);
      setPurpose(c.purpose);
      setScope(c.scope);
      setMaxSpendSingle(c.permissionBoundaries.maxSingleTransactionUsd);
      setMaxSpendDaily(c.permissionBoundaries.maxDailyBudgetUsd);
      setCompiledResult(c);
    } else if (presetId === 'closer_bot' && constitutions[1]) {
      const c = constitutions[1];
      setSelectedPreset(c);
      setAgentName(c.agentName);
      setPurpose(c.purpose);
      setScope(c.scope);
      setMaxSpendSingle(c.permissionBoundaries.maxSingleTransactionUsd);
      setMaxSpendDaily(c.permissionBoundaries.maxDailyBudgetUsd);
      setCompiledResult(c);
    } else {
      setAgentName('PanAfrican_AITutor_Dean_v1');
      setPurpose('Autonomous curriculum instruction, multi-lingual translations, and decentralized lecture NFT minting.');
      setScope('Billionaires AI Academy student portal and Base L2 blockchain.');
      setMaxSpendSingle(50);
      setMaxSpendDaily(250);
    }
  };

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);

    setTimeout(() => {
      const generatedSchema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "title": `AgentConstitution_${agentName.replace(/[^a-zA-Z0-9]/g, '_')}`,
        "description": "Compiled under BAA Principles of Verifiable Autonomous Intelligence & Digital Cooperation (PVAIDC)",
        "version": "1.0.0",
        "agent_metadata": {
          "name": agentName,
          "did": `did:key:z6Mk${agentName.replace(/[^a-zA-Z0-9]/g, '')}BAA2026`,
          "purpose": purpose,
          "scope": scope
        },
        "permission_boundaries": {
          "max_single_transaction_usd": maxSpendSingle,
          "max_daily_budget_usd": maxSpendDaily,
          "requires_human_signoff": requireHumanApproval,
          "enforce_w3c_did_signature": enforceW3CDid,
          "circuit_breaker": {
            "max_consecutive_errors": 3,
            "freeze_duration_minutes": 60
          }
        },
        "compliance_matrices": {
          "eu_ai_act": "Risk-Managed Annex III Ready",
          "nist_ai_rmf": "Govern 1.1 / Measure 2.2 Compliant",
          "w3c_vc": "W3C VC 2.0 Supported"
        }
      };

      const newConstitution: AgentConstitution = {
        id: `const-${Date.now()}`,
        agentName,
        version: '1.0.0',
        purpose,
        scope,
        allowedActions: [
          `Execute verified tasks aligned with: ${purpose.substring(0, 50)}...`,
          'Query authorized external endpoints with authenticated headers',
          'Log every action to tamper-evident cryptographic audit ledger'
        ],
        prohibitedActions: [
          `Transactions exceeding $${maxSpendSingle} USD single or $${maxSpendDaily} USD daily cap`,
          'Binding contract commitments without human approval checkpoint sign-off',
          'Unencrypted transmission of student PII or sensitive enterprise credentials',
          'Bypassing portal paywalls, CAPTCHAs, or terms of service'
        ],
        permissionBoundaries: {
          maxSingleTransactionUsd: maxSpendSingle,
          maxDailyBudgetUsd: maxSpendDaily,
          allowedDomains: ['billionairesai.academy', 'api.paystack.co', 'base.org'],
          allowedChains: ['base-mainnet'],
          canInitiateExternalComm: true
        },
        humanApprovalCheckpoints: [
          'Outbound term sheet commitments > $1,000 USD',
          'Disbursements to newly registered vendor addresses',
          'External API credential modifications'
        ],
        identityAuthRequirements: [
          `W3C Decentralized Identifier: did:key:z6Mk${agentName.replace(/[^a-zA-Z0-9]/g, '')}BAA2026`,
          'ECDSA Secp256k1 signature validation on all action packets'
        ],
        dataProtectionRules: [
          'Automated regex scrubbing of confidential PII before processing',
          'AES-256 local storage encryption'
        ],
        loggingAuditRequirements: [
          'Chained SHA-256 state ledger with 36-month retention',
          'Searchable export in standard JSON schema'
        ],
        failureRecoveryProcedures: [
          'Automatic rollback of pending multi-step transactions on exception',
          'Alert notification dispatched to Admin Command Vault'
        ],
        cyberThreatMitigations: [
          'Strict prompt injection sanitization before LLM reasoning',
          'mTLS channel encryption'
        ],
        applicableStandards: ['PVAIDC 1-12', 'NIST AI RMF 1.0', 'EU AI Act Article 50'],
        testSuitesPlanned: ['Budget breach simulation', 'Credential leak stress test'],
        generatedPolicySchemaJson: JSON.stringify(generatedSchema, null, 2),
        readinessScore: 97,
        status: 'compiled_ready',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
      };

      setCompiledResult(newConstitution);
      setIsCompiling(false);
      if (onSaveConstitution) {
        onSaveConstitution(newConstitution);
      }
    }, 850);
  };

  const handleCopyJson = () => {
    if (!compiledResult) return;
    navigator.clipboard.writeText(compiledResult.generatedPolicySchemaJson);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleDownloadJson = () => {
    if (!compiledResult) return;
    const blob = new Blob([compiledResult.generatedPolicySchemaJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${compiledResult.agentName}_constitution.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-cyan-800/40 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold mb-2">
              <Code className="w-3.5 h-3.5" />
              <span>MODULE 3 • AUTONOMOUS AGENT CONSTITUTION COMPILER</span>
            </div>
            <h2 className="text-2xl font-heading font-black text-white">
              Autonomous Policy-to-Implementation Compiler
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed mt-1">
              Translate plain-language agent concepts into machine-enforceable governance packages: permissions, spend limits, human checkpoints, and downloadable JSON policy schemas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Presets:</span>
            {PRESETS.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className="px-2.5 py-1 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:text-white transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* COMPILER WORKBENCH SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: COMPILER INPUT FORM (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <form onSubmit={handleCompile} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-heading font-black text-white text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FFD700]" />
                <span>Agent Governance Parameters</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">PVAIDC COMPLIANT</span>
            </div>

            {/* Agent Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Agent Technical Identifier
              </label>
              <input
                type="text"
                value={agentName}
                onChange={e => setAgentName(e.target.value)}
                placeholder="e.g. EnterpriseDealHunter_v3"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                required
              />
            </div>

            {/* Purpose */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Primary Agent Objective / Purpose
              </label>
              <textarea
                rows={2}
                value={purpose}
                onChange={e => setPurpose(e.target.value)}
                placeholder="e.g. Discovers business opportunities, negotiates service contracts, and requests payment..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                required
              />
            </div>

            {/* Scope */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Permitted Operating Environment / Scope
              </label>
              <input
                type="text"
                value={scope}
                onChange={e => setScope(e.target.value)}
                placeholder="e.g. Public procurement portals, Base L2, WhatsApp API"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                required
              />
            </div>

            {/* Spending Limits */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-emerald-400" />
                  <span>Max Single Tx ($)</span>
                </label>
                <input
                  type="number"
                  value={maxSpendSingle}
                  onChange={e => setMaxSpendSingle(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                  min={0}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-[#FFD700]" />
                  <span>Max Daily Budget ($)</span>
                </label>
                <input
                  type="number"
                  value={maxSpendDaily}
                  onChange={e => setMaxSpendDaily(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-[#FFD700]"
                  min={0}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-zinc-300">Mandatory Human Sign-off on Term Sheets</span>
                <input
                  type="checkbox"
                  checked={requireHumanApproval}
                  onChange={e => setRequireHumanApproval(e.target.checked)}
                  className="rounded bg-zinc-950 border-zinc-700 text-[#FFD700] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-zinc-300">Enforce W3C DID Cryptographic Proof</span>
                <input
                  type="checkbox"
                  checked={enforceW3CDid}
                  onChange={e => setEnforceW3CDid(e.target.checked)}
                  className="rounded bg-zinc-950 border-zinc-700 text-[#FFD700] focus:ring-0"
                />
              </label>
            </div>

            {/* Compile Trigger Button */}
            <button
              type="submit"
              disabled={isCompiling}
              className="w-full py-3 bg-[#FFD700] hover:bg-[#FFE033] text-black font-heading font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              <Sparkles className={`w-4 h-4 ${isCompiling ? 'animate-spin' : ''}`} />
              <span>{isCompiling ? 'Compiling Agent Constitution...' : 'Compile Agent Constitution'}</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: COMPILED CONSTITUTION DOSSIER (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {compiledResult ? (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5 text-xs">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      READINESS SCORE: {compiledResult.readinessScore}%
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      v{compiledResult.version} • Status: {compiledResult.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-black text-white mt-1">
                    {compiledResult.agentName}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyJson}
                    className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700] text-zinc-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-400 text-zinc-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Download</span>
                  </button>

                  {onSendToDigitalTwin && (
                    <button
                      onClick={() => onSendToDigitalTwin(compiledResult)}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold font-mono text-xs flex items-center gap-1 shadow-md shadow-cyan-950"
                    >
                      <span>Simulate in Digital Twin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Allowed vs Prohibited Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Allowed Machine Actions</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300">
                    {compiledResult.allowedActions.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-red-400 font-bold block flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Prohibited Machine Actions</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300">
                    {compiledResult.prohibitedActions.map((a, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Human Approval Checkpoints */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                  Human-in-the-Loop Approval Checkpoints (PVAIDC Principle 3)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 font-mono text-[11px]">
                  {compiledResult.humanApprovalCheckpoints.map((cp, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Machine-Readable JSON Schema Output */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                  Machine-Readable JSON Governance Specification
                </span>
                <pre className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto max-h-48 no-scrollbar">
                  {compiledResult.generatedPolicySchemaJson}
                </pre>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500">
              <Sparkles className="w-8 h-8 mx-auto text-zinc-600 mb-2" />
              <p className="text-xs">Compile an agent constitution to generate the governance package.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
