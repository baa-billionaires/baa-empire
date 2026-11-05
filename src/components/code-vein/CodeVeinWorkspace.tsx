import React, { useState } from 'react';
import {
  Code2,
  ShieldCheck,
  Terminal,
  TrendingUp,
  GitPullRequest,
  Lock,
  Cpu,
  DollarSign,
  Key,
  Users,
  Server,
  Layers,
  Sparkles,
  RefreshCw,
  Plus,
  Play
} from 'lucide-react';
import { CodeVeinColonyId, CodeVeinState } from '../../types/codeVein';
import { CODE_VEIN_COLONIES } from '../../data/codeVeinData';

interface CodeVeinWorkspaceProps {
  state: CodeVeinState;
  activeColonyId: CodeVeinColonyId;
  onSelectColony: (colonyId: CodeVeinColonyId) => void;
  onRefresh: () => void;
}

export const CodeVeinWorkspace: React.FC<CodeVeinWorkspaceProps> = ({
  state,
  activeColonyId,
  onSelectColony,
  onRefresh
}) => {
  const currentColony = CODE_VEIN_COLONIES.find(c => c.id === activeColonyId) || CODE_VEIN_COLONIES[0];

  // Local interaction states
  const [scanUrl, setScanUrl] = useState('');
  const [isPrivateScan, setIsPrivateScan] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Micro-API generation state
  const [apiName, setApiName] = useState('');
  const [apiFramework, setApiFramework] = useState<'fastapi' | 'express'>('fastapi');
  const [apiCategory, setApiCategory] = useState('Enterprise AI');
  const [apiPrice, setApiPrice] = useState('0.004');
  const [isGeneratingApi, setIsGeneratingApi] = useState(false);
  const [apiCodeTab, setApiCodeTab] = useState<'code' | 'openapi' | 'docker'>('code');

  // Bounty patch state
  const [patchingBountyId, setPatchingBountyId] = useState<string | null>(null);
  const [patchMessage, setPatchMessage] = useState<string | null>(null);

  // Purchase state
  const [purchasingProductId, setPurchasingProductId] = useState<string | null>(null);
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  // B2B proposal state
  const [b2bCompany, setB2bCompany] = useState('');
  const [b2bContact, setB2bContact] = useState('');
  const [b2bValue, setB2bValue] = useState('5000');
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);

  // CE Bridge dispatch state
  const [isDispatchingCe, setIsDispatchingCe] = useState(false);
  const [ceMessage, setCeMessage] = useState<string | null>(null);

  // Handlers
  const handleScanRepo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanUrl.trim()) return;
    setIsScanning(true);
    setScanMessage(null);

    try {
      const res = await fetch('/api/code-vein/repos/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoUrl: scanUrl.trim(),
          isPrivate: isPrivateScan
        })
      });
      const data = await res.json();
      if (data.success) {
        setScanMessage(data.message);
        setScanUrl('');
        onRefresh();
      } else {
        setScanMessage(data.error || 'Scan failed');
      }
    } catch (err: any) {
      setScanMessage(err.message || 'Network error scanning repository');
    } finally {
      setIsScanning(false);
    }
  };

  const handleGenerateApi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiName.trim()) return;
    setIsGeneratingApi(true);

    try {
      const res = await fetch('/api/code-vein/micro-apis/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: apiName.trim(),
          framework: apiFramework,
          category: apiCategory,
          pricingPerCallUsd: parseFloat(apiPrice) || 0.004
        })
      });
      const data = await res.json();
      if (data.success) {
        setApiName('');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingApi(false);
    }
  };

  const handleSynthesizePatch = async (bountyId: string) => {
    setPatchingBountyId(bountyId);
    setPatchMessage(null);

    try {
      const res = await fetch('/api/code-vein/bounties/patch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bountyId })
      });
      const data = await res.json();
      if (data.success) {
        setPatchMessage(`Surgical patch compiled for bounty! Awaiting human consent to open PR draft.`);
        onRefresh();
      }
    } catch (err: any) {
      setPatchMessage('Failed to synthesize patch');
    } finally {
      setPatchingBountyId(null);
    }
  };

  const handlePurchaseProduct = async (productId: string) => {
    setPurchasingProductId(productId);
    setPurchaseMessage(null);

    try {
      const res = await fetch('/api/code-vein/products/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          buyerEmail: 'client_enterprise@corp.com',
          testCardNumber: '4084084084084081'
        })
      });
      const data = await res.json();
      if (data.success) {
        setPurchaseMessage(`Payment verified via Paystack webhook 200 OK! 70% credited to developer ledger.`);
        onRefresh();
      }
    } catch (err: any) {
      setPurchaseMessage('Failed to complete purchase');
    } finally {
      setPurchasingProductId(null);
    }
  };

  const handleGenerateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!b2bCompany.trim()) return;
    setIsGeneratingProposal(true);

    try {
      const res = await fetch('/api/code-vein/clients/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: b2bCompany.trim(),
          contactPerson: b2bContact.trim() || 'CTO & Head of Tech',
          estimatedDealValueUsd: parseFloat(b2bValue) || 5000
        })
      });
      const data = await res.json();
      if (data.success) {
        setB2bCompany('');
        setB2bContact('');
        onRefresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const handleDispatchCe = async () => {
    setIsDispatchingCe(true);
    setCeMessage(null);

    try {
      const res = await fetch('/api/code-vein/ce-bridge/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: 'Quantize Model to GGUF-Q4_K_M on West-Africa RTX 4090 Node',
          targetColony: 'Colony 8 Model Forge'
        })
      });
      const data = await res.json();
      if (data.success) {
        setCeMessage('Workload dispatched to CE Colony hardware node. Thermal safeguards active!');
        onRefresh();
      }
    } catch (err: any) {
      setCeMessage('Failed to dispatch to CE Colony');
    } finally {
      setIsDispatchingCe(false);
    }
  };

  return (
    <div className="bg-[#05050A] border border-[#222234] rounded-xl overflow-hidden shadow-2xl">
      {/* Workbench Top Bar with Colony Selector */}
      <div className="bg-[#0A0A14] border-b border-[#1E1E2E] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentColony.accentColor }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 font-bold uppercase">
                COLONY {String(currentColony.colonyNumber).padStart(2, '0')} WORKBENCH
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {currentColony.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              {currentColony.name}
            </h2>
          </div>
        </div>

        {/* Colony Quick Switch Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-500 hidden sm:inline">SWITCH:</span>
          <select
            value={activeColonyId}
            onChange={(e) => onSelectColony(e.target.value as CodeVeinColonyId)}
            aria-label="Select Autonomous Colony Workbench"
            className="bg-[#0F0F1A] border border-[#2A2A3E] text-white text-xs font-mono rounded px-3 py-1.5 focus:outline-none focus:border-[#A855F7]"
          >
            {CODE_VEIN_COLONIES.map(c => (
              <option key={c.id} value={c.id}>
                Colony {String(c.colonyNumber).padStart(2, '0')}: {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="p-6">
        {/* COLONY 1: GITHUB MINER */}
        {activeColonyId === 'github_miner' && (
          <div className="space-y-6">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#A855F7]" />
                <span>Scan New Repository for Commercial Potential</span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mb-4">
                Enter any public GitHub URL or authorized private repo. The agent evaluates documentation, dependency health, and commercial suitability score.
              </p>

              <form onSubmit={handleScanRepo} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="https://github.com/developer/fast-ocr-parser"
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  className="flex-1 bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2.5 rounded focus:outline-none focus:border-[#A855F7]"
                />
                <label className="flex items-center gap-2 text-xs font-mono text-zinc-300 px-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrivateScan}
                    onChange={(e) => setIsPrivateScan(e.target.checked)}
                    className="rounded border-zinc-700 text-[#A855F7]"
                  />
                  <span>Private Repo (Quarantined)</span>
                </label>
                <button
                  type="submit"
                  disabled={isScanning || !scanUrl.trim()}
                  className="px-4 py-2.5 rounded text-xs font-mono font-bold bg-[#A855F7] text-white hover:bg-[#9333ea] transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isScanning ? 'ANALYZING...' : 'SCAN ASSET'}</span>
                </button>
              </form>

              {scanMessage && (
                <div className="mt-3 text-xs font-mono text-[#00FF88] bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded">
                  {scanMessage}
                </div>
              )}
            </div>

            {/* Scanned Repositories Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                  Cataloged Repositories ({state.repos.length})
                </h4>
                <span className="text-[10px] font-mono text-zinc-500">
                  Read-Only Verification Boundary Active
                </span>
              </div>

              <div className="space-y-3">
                {state.repos.map(repo => (
                  <div
                    key={repo.id}
                    className="bg-[#0A0A14] border border-[#1C1C2C] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#A855F7]/40 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">{repo.name}</span>
                        {repo.isPrivate ? (
                          <span className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[9px] font-mono">
                            PRIVATE QUARANTINE
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-[#00FF88] border border-emerald-500/30 text-[9px] font-mono">
                            PUBLIC VERIFIED
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-zinc-500">
                          {repo.language} &bull; {repo.license}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-1 flex flex-wrap gap-1.5">
                        {repo.tags.map(t => (
                          <span key={t} className="px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px]">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right font-mono">
                        <div className="text-[10px] text-zinc-500 uppercase">Commercial Score</div>
                        <div className="text-sm font-bold text-[#00FF88]">{repo.commercialSuitabilityScore} / 100</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-[10px] text-zinc-500 uppercase">Est. Value</div>
                        <div className="text-sm font-bold text-white">${repo.estimatedCommercialValueUsd}</div>
                      </div>
                      <button
                        onClick={() => onSelectColony('micro_api_refinery')}
                        className="px-3 py-1.5 rounded text-xs font-mono font-medium bg-[#1A1A28] border border-[#2E2E44] text-white hover:bg-[#A855F7] transition"
                      >
                        Refine to API &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COLONY 2: DNA REGISTRY */}
        {activeColonyId === 'dna_registry' && (
          <div className="space-y-6">
            <div className="bg-[#0A0A14] border border-emerald-500/30 rounded-lg p-5">
              <div className="flex items-center gap-2 text-[#00FF88] font-mono text-xs font-semibold uppercase mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-Leak Private Code Quarantine Enforced</span>
              </div>
              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                All private developer assets are quarantined in air-gapped sandboxes. Under no circumstances will raw private code be transmitted, fine-tuned on public models, or displayed without explicit cryptographic signature from the repository owner.
              </p>
            </div>

            <div className="space-y-3">
              {state.dnaRecords.map(dna => (
                <div key={dna.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#161624]">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">{dna.repoName}</div>
                      <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                        Commit: {dna.commitHash} &bull; Author: {dna.authorIdentity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#00FF88] border border-emerald-500/30 text-xs font-mono">
                        Audit Score: {dna.securityAuditScore}/100
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono">
                        Status: {dna.quarantineStatus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs font-mono">
                    <div className="bg-black/40 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">COMMERCIAL RIGHT</span>
                      <span className="text-[#00FF88] font-semibold">
                        {dna.licensePermissions.canCommercialize ? 'AUTHORIZED' : 'RESTRICTED'}
                      </span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">COPYLEFT RESTRICTION</span>
                      <span className="text-white font-semibold">
                        {dna.licensePermissions.copyleftRestrictions ? 'DETECTED' : 'CLEAN'}
                      </span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">PATENT GRANT</span>
                      <span className="text-emerald-400 font-semibold">
                        {dna.licensePermissions.patentGrant ? 'VERIFIED' : 'NONE'}
                      </span>
                    </div>
                    <div className="bg-black/40 p-2 rounded border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">FINGERPRINT</span>
                      <span className="text-purple-300 font-semibold truncate block" title={dna.fingerprintHash}>
                        {dna.fingerprintHash.substring(0, 16)}...
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 3: MICRO-API REFINERY */}
        {activeColonyId === 'micro_api_refinery' && (
          <div className="space-y-6">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00D4FF]" />
                <span>Synthesize New Micro-API Service</span>
              </h3>
              <form onSubmit={handleGenerateApi} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">API Service Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Identity KYC Verifier"
                    value={apiName}
                    onChange={(e) => setApiName(e.target.value)}
                    className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Framework</label>
                  <select
                    value={apiFramework}
                    onChange={(e) => setApiFramework(e.target.value as any)}
                    className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="fastapi">Python 3.11 / FastAPI (Async)</option>
                    <option value="express">Node.js 20 / Express (REST)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Price Per Call (USD)</label>
                  <input
                    type="text"
                    value={apiPrice}
                    onChange={(e) => setApiPrice(e.target.value)}
                    className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isGeneratingApi || !apiName.trim()}
                    className="w-full py-2 rounded text-xs font-mono font-bold bg-[#00D4FF] text-black hover:bg-[#38e1ff] transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {isGeneratingApi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>GENERATE API</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Active Micro-APIs List */}
            <div className="space-y-4">
              {state.microApis.map(api => (
                <div key={api.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#161624]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{api.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                          api.lifecycleStatus === 'LIVE'
                            ? 'bg-emerald-500/10 text-[#00FF88] border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}>
                          {api.lifecycleStatus}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400">
                          {api.framework.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-1">{api.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-right font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-zinc-500">PRICING</div>
                        <div className="font-bold text-[#00FF88]">${api.pricingPerCallUsd} / call</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500">MONTHLY CALLS</div>
                        <div className="font-bold text-white">{api.monthlyCalls.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500">MONTHLY REVENUE</div>
                        <div className="font-bold text-white">${api.monthlyRevenueUsd.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Code Snippet Tabs */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => setApiCodeTab('code')}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                          apiCodeTab === 'code' ? 'bg-[#00D4FF] text-black font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Source Code
                      </button>
                      <button
                        onClick={() => setApiCodeTab('docker')}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                          apiCodeTab === 'docker' ? 'bg-[#00D4FF] text-black font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Dockerfile
                      </button>
                      <button
                        onClick={() => setApiCodeTab('openapi')}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono transition ${
                          apiCodeTab === 'openapi' ? 'bg-[#00D4FF] text-black font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        OpenAPI Spec
                      </button>
                    </div>

                    <pre className="bg-black border border-zinc-800 p-3 rounded text-[11px] font-mono text-zinc-300 overflow-x-auto max-h-48">
                      {apiCodeTab === 'code' && api.baseCode}
                      {apiCodeTab === 'docker' && api.dockerfile}
                      {apiCodeTab === 'openapi' && api.openApiSpec}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 4: DEMAND HUNTER */}
        {activeColonyId === 'demand_hunter' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Live Enterprise Demand Signals</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Crawling RFPs and bounties to match paid commercial requirements with internal repositories.
                </p>
              </div>
              <div className="text-xs font-mono text-[#FFD700] px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30">
                ACTIVE RADAR POOL: $5,150 USD
              </div>
            </div>

            <div className="space-y-3">
              {state.demandSignals.map(d => (
                <div key={d.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">{d.title}</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[9px] font-mono">
                          {d.source}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-1">
                        Requires: {d.technicalRequirements.join(', ')}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-[#00FF88]">${d.budgetUsd} USD</div>
                      <div className="text-[10px] text-zinc-400">&#8358;{d.budgetNgn.toLocaleString()} NGN</div>
                    </div>
                  </div>

                  {d.matchedAssetName && (
                    <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded text-xs font-mono flex items-center justify-between">
                      <span className="text-zinc-300">
                        MATCHED ASSET: <strong className="text-[#00FF88]">{d.matchedAssetName}</strong> ({d.matchConfidence}% confidence)
                      </span>
                      <button
                        onClick={() => onSelectColony('client_hunter')}
                        className="text-xs font-mono text-[#00FF88] underline hover:text-white"
                      >
                        Draft Commercial Proposal &rarr;
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 5: BOUNTY SWARM */}
        {activeColonyId === 'bounty_swarm' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Funded GitHub Bug Bounties</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Autonomous agents triage funded GitHub issues, synthesize surgical fixes with automated tests, and submit reviewable draft PRs.
                </p>
              </div>
              <div className="text-xs font-mono text-[#F97316] px-3 py-1 rounded bg-orange-500/10 border border-orange-500/30 font-bold">
                19 CLAIMED ($8,200 SETTLED)
              </div>
            </div>

            {patchMessage && (
              <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 p-3 rounded">
                {patchMessage}
              </div>
            )}

            <div className="space-y-3">
              {state.bounties.map(b => (
                <div key={b.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#161624]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">{b.repoName}</span>
                        <span className="text-xs font-mono text-zinc-500">#{b.issueNumber}</span>
                        <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono">
                          {b.difficulty}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-zinc-200 mt-1">{b.issueTitle}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right font-mono">
                        <div className="text-sm font-bold text-[#00FF88]">+${b.rewardUsd} USD</div>
                        <div className="text-[10px] text-zinc-400">&#8358;{b.rewardNgn.toLocaleString()} NGN</div>
                      </div>

                      {b.patchGenerated ? (
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                            PR DRAFT READY (Awaiting Approval)
                          </span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleSynthesizePatch(b.id)}
                          disabled={patchingBountyId === b.id}
                          className="px-3.5 py-1.5 rounded text-xs font-mono font-bold bg-[#F97316] text-black hover:bg-[#ea580c] transition disabled:opacity-50"
                        >
                          {patchingBountyId === b.id ? 'SYNTHESIZING...' : 'SYNTHESIZE PATCH'}
                        </button>
                      )}
                    </div>
                  </div>

                  {b.patchCode && (
                    <div className="mt-3">
                      <div className="text-[10px] font-mono text-zinc-400 mb-1">SURGICAL CODE FIX (TEST PASS RATE: 100%)</div>
                      <pre className="bg-black border border-zinc-800 p-2.5 rounded text-[11px] font-mono text-emerald-400 overflow-x-auto">
                        {b.patchCode}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 7: SMART CONTRACT FACTORY */}
        {activeColonyId === 'smart_contract_factory' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
              <h3 className="text-sm font-bold text-white mb-1">Slither Static Analysis & Base L2 Testnet</h3>
              <p className="text-xs text-zinc-400 font-mono">
                Static analysis prevents reentrancy, integer anomalies, and unchecked low-level calls.
              </p>
            </div>

            <div className="space-y-3">
              {state.smartContracts.map(sc => (
                <div key={sc.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">{sc.name}</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
                          {sc.standard}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-1">
                        Network: {sc.network} &bull; Solidity: {sc.solidityVersion}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right font-mono">
                      <div>
                        <div className="text-[10px] text-zinc-500">SLITHER SCORE</div>
                        <div className="text-sm font-bold text-[#00FF88]">{sc.slitherScore}/100</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-zinc-500">GAS RATING</div>
                        <div className="text-sm font-bold text-white">{sc.gasEfficiencyRating}</div>
                      </div>
                    </div>
                  </div>

                  {sc.testnetDeployTx && (
                    <div className="mt-3 bg-black/40 border border-zinc-800 p-2.5 rounded text-xs font-mono text-zinc-400 truncate">
                      TESTNET DEPLOY TX: <span className="text-indigo-400">{sc.testnetDeployTx}</span> ({sc.testnetNetwork})
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 8: MODEL FORGE */}
        {activeColonyId === 'model_lora_forge' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white">GGUF 4-Bit Quantization & Ollama Binding</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Deploy quantized specialized LLM weights to local CE Colony distributed nodes.
                </p>
              </div>
              <button
                onClick={handleDispatchCe}
                disabled={isDispatchingCe}
                className="px-3.5 py-2 rounded text-xs font-mono font-bold bg-[#8B5CF6] text-white hover:bg-[#7c3aed] transition disabled:opacity-50"
              >
                {isDispatchingCe ? 'DISPATCHING...' : 'DISPATCH TO CE NODE'}
              </button>
            </div>

            {ceMessage && (
              <div className="text-xs font-mono text-[#00FF88] bg-emerald-500/10 border border-emerald-500/30 p-3 rounded">
                {ceMessage}
              </div>
            )}

            <div className="space-y-3">
              {state.models.map(m => (
                <div key={m.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">{m.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        Format: {m.quantizationFormat} ({m.sizeGb} GB) &bull; Bound Node: {m.ceColonyNodeName}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-[#00FF88]">{m.inferenceSpeedTokensPerSec} tok/sec</div>
                      <div className="text-[10px] text-zinc-500">LOCAL INFERENCE SPEED</div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] font-mono text-zinc-400 mb-1">OLLAMA MODELFILE</div>
                    <pre className="bg-black border border-zinc-800 p-2.5 rounded text-[11px] font-mono text-purple-300 overflow-x-auto">
                      {m.ollamaModelfile}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 9: LICENSING EXCHANGE */}
        {activeColonyId === 'licensing_exchange' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Commercial Software License Exchange</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Verified commercial assets with test-card purchase simulation (Paystack 70% developer split).
                </p>
              </div>
              <div className="text-xs font-mono text-[#00FF88] px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 font-bold">
                PAYSTACK TEST CARD: 4084084084084081
              </div>
            </div>

            {purchaseMessage && (
              <div className="text-xs font-mono text-[#00FF88] bg-emerald-500/10 border border-emerald-500/30 p-3 rounded">
                {purchaseMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {state.products.map(p => (
                <div key={p.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase">
                      {p.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2 mb-1">{p.title}</h4>
                    <p className="text-xs text-zinc-400 font-mono mb-2">Terms: {p.licenseTerms}</p>
                    <div className="text-[10px] text-zinc-500 font-mono mb-4">Refund: {p.refundPolicy}</div>
                  </div>

                  <div className="pt-3 border-t border-[#181826] flex items-center justify-between">
                    <div className="font-mono">
                      <div className="text-sm font-bold text-white">${p.priceUsd} USD</div>
                      <div className="text-[10px] text-zinc-400">&#8358;{p.priceNgn.toLocaleString()} NGN</div>
                    </div>
                    <button
                      onClick={() => handlePurchaseProduct(p.id)}
                      disabled={purchasingProductId === p.id}
                      className="px-3 py-1.5 rounded text-xs font-mono font-bold bg-[#00FF88] text-black hover:bg-[#00e57a] transition disabled:opacity-50"
                    >
                      {purchasingProductId === p.id ? 'VERIFYING...' : 'TEST BUY'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 11: API GATEWAY */}
        {activeColonyId === 'api_gateway' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Cryptographic API Key Metering Sentinel</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Rate limits and real-time usage meters preventing traffic spikes and accounting every sub-cent.
                </p>
              </div>
              <div className="text-xs font-mono text-[#3B82F6] px-3 py-1 rounded bg-blue-500/10 border border-blue-500/30">
                1.42M REQUESTS METERED
              </div>
            </div>

            <div className="space-y-3">
              {state.apiKeys.map(k => (
                <div key={k.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{k.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase">
                        {k.tier}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-1">
                      Key Prefix: <code className="text-zinc-200">{k.keyPrefix}...</code> &bull; Quota: {k.quotaRequestsPerMin} req/min
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right font-mono">
                    <div>
                      <div className="text-[10px] text-zinc-500">CALLS METERED</div>
                      <div className="text-sm font-bold text-white">{k.totalCalls.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500">ACCRUED VALUE</div>
                      <div className="text-sm font-bold text-[#00FF88]">${k.revenueAccruedUsd.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 12: CLIENT HUNTER */}
        {activeColonyId === 'client_hunter' && (
          <div className="space-y-6">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-5">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#EAB308]" />
                <span>Compile New B2B Enterprise Proposal</span>
              </h3>
              <form onSubmit={handleGenerateProposal} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sterling Logistics Hub"
                    value={b2bCompany}
                    onChange={(e) => setB2bCompany(e.target.value)}
                    className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-zinc-400 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. David Eze (CTO)"
                    value={b2bContact}
                    onChange={(e) => setB2bContact(e.target.value)}
                    className="w-full bg-black border border-[#2A2A3E] text-white text-xs font-mono px-3 py-2 rounded focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isGeneratingProposal || !b2bCompany.trim()}
                    className="w-full py-2 rounded text-xs font-mono font-bold bg-[#EAB308] text-black hover:bg-[#ca8a04] transition disabled:opacity-50"
                  >
                    {isGeneratingProposal ? 'COMPILING...' : 'GENERATE PROPOSAL'}
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3">
              {state.clients.map(c => (
                <div key={c.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#161624]">
                    <div>
                      <div className="text-xs font-mono font-bold text-white">{c.companyName}</div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        Contact: {c.contactPerson} &bull; Industry: {c.industry}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-sm font-bold text-[#00FF88]">${c.estimatedDealValueUsd} USD</div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-300 border border-yellow-500/30 uppercase">
                        {c.leadStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-[10px] font-mono text-zinc-400 mb-1">EXECUTIVE PROPOSAL DRAFT</div>
                    <pre className="bg-black border border-zinc-800 p-2.5 rounded text-[11px] font-mono text-zinc-300 whitespace-pre-wrap">
                      {c.proposalDraft}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COLONY 13: CE COMPUTE BRIDGE */}
        {activeColonyId === 'ce_compute_bridge' && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-emerald-500/30 rounded-lg p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#00FF88]" />
                  <span>UA-AIDC CE Colony V12 Hardware Binding</span>
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Offload heavy compilation, Docker test suites, and model quantizations directly to registered CE Colony technician nodes.
                </p>
              </div>
              <div className="text-xs font-mono text-[#00FF88] px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
                THERMAL CAP: &le; 75&deg;C ENFORCED
              </div>
            </div>

            <div className="space-y-3">
              {state.ceComputeJobs.map(job => (
                <div key={job.id} className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{job.jobTitle}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#00FF88] border border-emerald-500/30 uppercase">
                        {job.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-1">
                      Node: <strong className="text-zinc-200">{job.ceNodeName}</strong> ({job.hardwareSpecs})
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-right font-mono">
                    <div>
                      <div className="text-[10px] text-zinc-500">THERMALS</div>
                      <div className="text-sm font-bold text-emerald-400">{job.thermalReadingCelsius}&deg;C</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500">COMPUTE COST</div>
                      <div className="text-sm font-bold text-white">${job.computeCostUsd.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK FOR REMAINING COLONIES (6, 10, 14, 15) */}
        {['code_revival', 'microsaas_factory', 'portfolio_manager', 'wealth_intelligence'].includes(activeColonyId) && (
          <div className="space-y-4">
            <div className="bg-[#0A0A14] border border-[#1E1E2E] rounded-lg p-5">
              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A855F7]" />
                <span>{currentColony.name}</span>
              </h3>
              <p className="text-xs text-zinc-300 font-mono mb-4">{currentColony.description}</p>
              
              <div className="bg-black/50 border border-zinc-800 p-4 rounded text-xs font-mono text-zinc-300 space-y-2">
                <div className="text-zinc-500 uppercase text-[10px]">Autonomous Operations Telemetry:</div>
                <div className="text-[#00FF88]">&bull; Revenue Model: {currentColony.revenueModel}</div>
                <div className="text-white">&bull; Primary Metric: {currentColony.primaryMetricLabel} &mdash; <strong>{currentColony.primaryMetricValue}</strong></div>
                <div className="text-purple-300">&bull; Assigned Agent: {currentColony.agentRole}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
