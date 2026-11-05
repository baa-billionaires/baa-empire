import React, { useState } from 'react';
import {
  Code2,
  ShieldCheck,
  Lock,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Server,
  Users,
  DollarSign,
  Wallet,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { PIPELINE_STAGES } from '../../data/codeVeinData';

interface StageDetail {
  id: string;
  name: string;
  colonies: string;
  agent: string;
  securityRule: string;
  status: 'ONLINE' | 'ACTIVE' | 'ENFORCING' | 'PASSING';
  highlight: string;
}

const STAGE_DETAILS: Record<string, StageDetail> = {
  source: {
    id: 'source',
    name: 'AUTHORIZED SOURCE',
    colonies: 'Colony 1: GitHub Asset Intelligence Miner',
    agent: 'Repository Discovery Agent',
    securityRule: 'Read-only token scope. Zero write access without explicit developer grant.',
    status: 'ONLINE',
    highlight: 'Scans public repos & personal authorized repositories for commercial viability.'
  },
  dna: {
    id: 'dna',
    name: 'CODE DNA & PROVENANCE',
    colonies: 'Colony 2: Code Asset DNA & Ownership Registry',
    agent: 'Code DNA Analyst',
    securityRule: 'Immutable SHA-256 fingerprinting. Attribution and author identity preserved.',
    status: 'PASSING',
    highlight: 'Audits open-source licenses (MIT, Apache, BSD) and detects copyleft restrictions.'
  },
  security: {
    id: 'security',
    name: 'SECURITY REVIEW',
    colonies: 'Colony 2 & 7: Ownership Guardian & Smart Contract Factory',
    agent: 'Security & Vulnerability Auditor',
    securityRule: 'Zero arbitrary code execution. Quarantined sandboxes for private developer code.',
    status: 'ENFORCING',
    highlight: 'Static analysis (Slither, Bandit, Semgrep) prevents injection, secrets leak, and reentrancy.'
  },
  refinery: {
    id: 'refinery',
    name: 'REFINERY & PRODUCTION',
    colonies: 'Colony 3, 6 & 8: Micro-API, Code Revival & LoRA Forge',
    agent: 'Micro-API Architect & LoRA Specialist',
    securityRule: 'Containerized build isolation. Resource limits & thermal safeguards enforced.',
    status: 'ACTIVE',
    highlight: 'Extracts modular FastAPI/Express endpoints, Pydantic schemas, and Dockerfiles.'
  },
  testing: {
    id: 'testing',
    name: 'TESTING & SIMULATION',
    colonies: 'Colony 3 & 5: Micro-API Sandbox & Bounty Swarm',
    agent: 'Test Synthesis & Verification Agent',
    securityRule: 'Automated test suite execution in ephemeral Docker containers.',
    status: 'PASSING',
    highlight: 'Generates unit tests, boundary fuzzing, and OpenAPI schema compliance checks.'
  },
  approval: {
    id: 'approval',
    name: 'HUMAN APPROVAL GATE',
    colonies: 'Colony 5, 11 & Governance Institute',
    agent: 'Human-in-the-Loop Consensus Gate',
    securityRule: 'MANDATORY CONSENT for PR pushes, production deployments, and financial withdrawals.',
    status: 'ENFORCING',
    highlight: 'No autonomous agent can publish code or move money without developer approval.'
  },
  deployment: {
    id: 'deployment',
    name: 'DEPLOYMENT & GATEWAY',
    colonies: 'Colony 11 & 13: API Gateway & CE Colony Compute Bridge',
    agent: 'API Gateway & Metering Sentinel',
    securityRule: 'Cryptographic API keys, rate limit tiers, DDoS throttling, and CE GPU binding.',
    status: 'ONLINE',
    highlight: 'Sub-millisecond routing with per-request metered accounting and 99.99% uptime.'
  },
  customer: {
    id: 'customer',
    name: 'CUSTOMER & DEMAND',
    colonies: 'Colony 4 & 12: Global Demand Hunter & Client Hunter',
    agent: 'Demand Signal Hunter & Client Acquisition Agent',
    securityRule: 'Real commercial customers only. No speculative income claims.',
    status: 'ACTIVE',
    highlight: 'Matches live enterprise RFPs, GitHub bounties, and B2B client contracts.'
  },
  payment: {
    id: 'payment',
    name: 'PAYMENT & SETTLEMENT',
    colonies: 'Colony 9 & Paystack Settlement Gateway',
    agent: 'Payment Verification Sentinel',
    securityRule: 'Webhook 200 OK verification. Idempotent accounting & ledger reconciliation.',
    status: 'ONLINE',
    highlight: 'Processes fiat (NGN/USD via Paystack) and BaaCoin tokens with verified webhooks.'
  },
  revenue: {
    id: 'revenue',
    name: 'DEVELOPER REVENUE (70%)',
    colonies: 'Colony 14 & 15: Portfolio Manager & Wealth Intelligence',
    agent: 'Portfolio & Wealth Strategist',
    securityRule: 'Guaranteed 70% developer revenue split. 30% platform infrastructure share.',
    status: 'ONLINE',
    highlight: 'Instant settlement to Nigerian bank accounts (NGN) or global sovereign vaults.'
  }
};

export const CodeVeinRefineryCore: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('approval');

  const activeStage = STAGE_DETAILS[selectedStageId] || STAGE_DETAILS.approval;

  const stageIcons: Record<string, React.ReactNode> = {
    source: <Code2 className="w-4 h-4 text-purple-400" />,
    dna: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    security: <Lock className="w-4 h-4 text-rose-400" />,
    refinery: <Terminal className="w-4 h-4 text-cyan-400" />,
    testing: <CheckCircle2 className="w-4 h-4 text-teal-400" />,
    approval: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    deployment: <Server className="w-4 h-4 text-blue-400" />,
    customer: <Users className="w-4 h-4 text-yellow-400" />,
    payment: <DollarSign className="w-4 h-4 text-emerald-300" />,
    revenue: <Wallet className="w-4 h-4 text-[#00FF88]" />
  };

  return (
    <div className="bg-[#05050A] border border-[#242436] rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CENTRAL ARCHITECTURAL PIPELINE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 flex items-center gap-3">
            <span>THE CODE VEIN REFINERY CORE</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30 font-semibold">
              9-STAGE SOVEREIGN VALUE CHAIN
            </span>
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            Click any stage along the flow to inspect active agents, safety boundaries, and revenue mechanisms.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0C0C16] border border-[#1E1E2E] px-3 py-1.5 rounded text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
          <span>PIPELINE VELOCITY: <strong>1.4M REQ/HR</strong></span>
        </div>
      </div>

      {/* 9-Stage Pipeline Scrollable Strip */}
      <div className="relative z-10 overflow-x-auto pb-4 pt-2">
        <div className="flex items-center gap-2 min-w-[1100px]">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = selectedStageId === stage.id;
            const isApprovalGate = stage.id === 'approval';
            const isRevenueEnd = stage.id === 'revenue';

            return (
              <React.Fragment key={stage.id}>
                <button
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`flex-1 p-3 rounded-lg border text-left transition relative flex flex-col justify-between h-28 group ${
                    isSelected
                      ? isApprovalGate
                        ? 'bg-amber-500/10 border-amber-400/80 shadow-lg shadow-amber-500/20'
                        : isRevenueEnd
                        ? 'bg-emerald-500/10 border-[#00FF88] shadow-lg shadow-[#00FF88]/20'
                        : 'bg-[#A855F7]/10 border-[#A855F7] shadow-lg shadow-[#A855F7]/20'
                      : 'bg-[#0B0B14] border-[#1C1C2C] hover:border-[#383850]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono text-zinc-500 font-bold">
                      0{idx + 1}
                    </span>
                    <div className="p-1.5 rounded bg-black/60 border border-white/5">
                      {stageIcons[stage.id] || <Code2 className="w-4 h-4 text-zinc-400" />}
                    </div>
                  </div>

                  <div className="mt-2">
                    <div
                      className={`text-xs font-mono font-bold uppercase tracking-tight ${
                        isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                      }`}
                    >
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                      {stage.description}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-white shadow-glow" />
                  )}
                </button>

                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="text-zinc-600 flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Inspector Box */}
      <div className="mt-4 bg-[#0A0A14] border border-[#222234] rounded-lg p-5 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1A1A28]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-black border border-[#2E2E44]">
              {stageIcons[activeStage.id]}
            </div>
            <div>
              <div className="text-xs font-mono text-[#A855F7] font-semibold flex items-center gap-2">
                <span>INSPECTOR // {activeStage.name}</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[#00FF88] text-[9px] border border-emerald-500/40 font-mono">
                  {activeStage.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                {activeStage.highlight}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="px-3 py-1.5 rounded bg-black/60 border border-[#242436] text-zinc-300">
              <span className="text-zinc-500 mr-1">COLONY:</span>
              <strong className="text-[#A855F7]">{activeStage.colonies}</strong>
            </div>
            <div className="px-3 py-1.5 rounded bg-black/60 border border-[#242436] text-zinc-300">
              <span className="text-zinc-500 mr-1">AGENT:</span>
              <strong className="text-white">{activeStage.agent}</strong>
            </div>
          </div>
        </div>

        {/* Security Rule & Enforcement Details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#05050A] border border-[#1A1A28] rounded p-3 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-semibold uppercase text-[11px] mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Security Constitution & Boundary Rule</span>
            </div>
            <p className="text-zinc-300 font-mono leading-relaxed">
              {activeStage.securityRule}
            </p>
          </div>

          <div className="bg-[#05050A] border border-[#1A1A28] rounded p-3 text-xs">
            <div className="flex items-center gap-1.5 text-[#00FF88] font-mono font-semibold uppercase text-[11px] mb-1">
              <Wallet className="w-3.5 h-3.5" />
              <span>Autonomous Revenue Mechanism</span>
            </div>
            <p className="text-zinc-300 font-mono leading-relaxed">
              Commercial proceeds are audited via append-only ledger on every transaction. 70% net value allocated directly to the verified software creator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
