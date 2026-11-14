import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Coins,
  CopyCheck,
  Zap,
  ExternalLink,
  CheckCircle2,
  FileText,
  Send,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { NovaProtocolState, LivingApp } from '../types/novaProtocol';
import { INITIAL_NOVA_STATE } from '../data/novaProtocolInitialState';
import { NovaLivingViewer } from '../components/nova/NovaLivingViewer';
import { OriginDnaTree } from '../components/nova/OriginDnaTree';
import { UaaidcModuleSwitcher } from '../components/navigation/UaaidcModuleSwitcher';

interface NovaProtocolPageProps {
  onNavigate?: (page: string) => void;
}

type NovaTab = 'pixels' | 'heartbeat' | 'mutations' | 'copy_detection' | 'royalties';

export const NovaProtocolPage: React.FC<NovaProtocolPageProps> = ({ onNavigate }) => {
  const [state, setState] = useState<NovaProtocolState>(INITIAL_NOVA_STATE);
  const [selectedApp, setSelectedApp] = useState<LivingApp | null>(INITIAL_NOVA_STATE.living_apps[0]);
  const [activeTab, setActiveTab] = useState<NovaTab>('pixels');
  const [isLoading, setIsLoading] = useState(false);

  // Create Living App form
  const [ideaCoinId, setIdeaCoinId] = useState('coin-yroute-001');
  const [appName, setAppName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isBreeding, setIsBreeding] = useState(false);
  const [breedBanner, setBreedBanner] = useState<string | null>(null);

  // Copy Detection Simulator form
  const [suspectedUrl, setSuspectedUrl] = useState('https://rea-scraper-clone.net/pirated-app');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [verifiedPixelId, setVerifiedPixelId] = useState<string | null>(null);

  // Paystack Withdraw state
  const [withdrawAmountUsd, setWithdrawAmountUsd] = useState('50');
  const [withdrawEmail, setWithdrawEmail] = useState('creator@billionairesai.academy');
  const [withdrawStatus, setWithdrawStatus] = useState<string | null>(null);

  const fetchNovaState = useCallback(async () => {
    try {
      const res = await fetch('/api/nova/state');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.state) {
          setState(json.state);
          setSelectedApp((prev) => {
            if (!prev) return json.state.living_apps[0] || null;
            return json.state.living_apps.find((a: LivingApp) => a.id === prev.id) || json.state.living_apps[0] || null;
          });
        }
      }
    } catch {
      // Fallback to local seed state
    }
  }, []);

  useEffect(() => {
    fetchNovaState();
    const poll = setInterval(fetchNovaState, 15000);
    return () => clearInterval(poll);
  }, [fetchNovaState]);

  const handleBreedLivingApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appName.trim() || !prompt.trim()) return;
    setIsBreeding(true);
    setBreedBanner(null);

    try {
      const res = await fetch('/api/nova/create_living_app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea_coin_id: ideaCoinId,
          app_name: appName.trim(),
          prompt: prompt.trim()
        })
      });
      const json = await res.json();
      if (json.success && json.living_app) {
        setBreedBanner(`✅ Synthesized ${json.living_app.nova_url} across 10 CE Colony nodes & 10 Mind Hive agents!`);
        setAppName('');
        setPrompt('');
        await fetchNovaState();
        setSelectedApp(json.living_app);
      }
    } catch (err) {
      setBreedBanner('⚠️ Failed to reach NOVA Colony engine.');
    } finally {
      setIsBreeding(false);
    }
  };

  const handleTriggerMutation = async (appId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/nova/mutate/${encodeURIComponent(appId)}`, {
        method: 'POST'
      });
      if (res.ok) {
        await fetchNovaState();
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateClick = async (elementId: string, appId: string) => {
    try {
      const res = await fetch('/api/nova/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ element_id: elementId, living_app_id: appId })
      });
      if (res.ok) {
        await fetchNovaState();
      }
    } catch {
      // ignore
    }
  };

  const handleReportCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suspectedUrl.trim() || !selectedApp) return;
    setCopyFeedback(null);
    try {
      const res = await fetch('/api/nova/report_copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suspected_copy_url: suspectedUrl.trim(),
          original_nova_url: selectedApp.nova_url
        })
      });
      const json = await res.json();
      if (json.success) {
        setCopyFeedback(`🚨 Dead Copy Detected (${json.similarity_score}% match)! All clicks redirected back to ${selectedApp.nova_url} Origin DNA.`);
        await fetchNovaState();
      }
    } catch {
      setCopyFeedback('Error running copy signature comparison.');
    }
  };

  const handleWithdrawPaystack = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawStatus('Processing Paystack Test Settlement...');
    try {
      const res = await fetch('/api/nova/withdraw_royalties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: withdrawEmail,
          amount_usd: Number(withdrawAmountUsd) || 50
        })
      });
      const json = await res.json();
      if (json.success) {
        setWithdrawStatus(`✅ ${json.message} (Ref: ${json.paystack_reference} • Mode: ${json.paystack_mode})`);
      }
    } catch {
      setWithdrawStatus('⚠️ Unable to process payout right now.');
    }
  };

  const totalRedirected = state.copy_detections.reduce((sum, c) => sum + c.royalty_redirected, 0);
  const totalDivertedUsers = state.copy_detections.reduce((sum, c) => sum + Math.round(c.clicks_diverted / 50), 0);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP TELEMETRY BANNER */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-emerald-950/20 to-black border-2 border-[#00FF88]/40 shadow-[0_0_60px_rgba(0,255,136,0.1)] space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-[#00FF88] border border-emerald-400/50 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                  NOVA PROTOCOL V16 — MODULE 5 (CROWN)
                </span>
                <span className="text-zinc-400">Heartbeat: <strong className="text-[#00FF88]">ALIVE 500ms ago</strong></span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">Nodes: <strong className="text-cyan-400">{state.stats.active_living_nodes.toLocaleString()}</strong></span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">Agents: <strong className="text-amber-400">{state.stats.active_agents}</strong></span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300">Child Coins: <strong className="text-purple-400">{(1240 + state.stats.total_mutations).toLocaleString()}</strong></span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
                THE LIVING INTERNET — BEAT REA FOREVER
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-4xl leading-relaxed">
                REA copies static HTML. NOVA spawns <strong className="text-[#00FF88]">Living Organisms</strong> across Module 1 (CE Colony), Module 2 (Code Vein), Module 3 (Aurum), and Module 4 (Mind Hive) that mutate every 60 seconds and embed <strong className="text-[#FFD700]">Origin DNA</strong> royalties on every pixel. Copying becomes your free marketing funnel.
              </p>
            </div>

            {/* Right Module Dropdown & Final Deck Button */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onNavigate && (
                <>
                  <UaaidcModuleSwitcher
                    currentPage="nova-protocol"
                    onSelectModule={onNavigate}
                    variant="banner"
                  />
                  <button
                    onClick={() => onNavigate('investor-one-pager')}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-2 shadow-lg shadow-[#00C853]/25 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>YES FINAL DECK (V16)</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 6-Module Organism Anatomy Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-3 border-t border-zinc-800/80 text-[11px] font-mono">
            {[
              { id: 'ce-colony', mod: 'M1 • CE COLONY', part: 'BODY (Compute + Proof)', color: 'text-amber-300 border-amber-500/30 bg-amber-950/20' },
              { id: 'code-vein', mod: 'M2 • CODE VEIN', part: 'HANDS (Micro-APIs)', color: 'text-cyan-300 border-cyan-500/30 bg-cyan-950/20' },
              { id: 'aurum-colony', mod: 'M3 • AURUM', part: 'BLOOD (Liquidity/Yield)', color: 'text-[#FFD700] border-yellow-500/30 bg-yellow-950/20' },
              { id: 'mindhive-v22', mod: 'M4 • MIND HIVE', part: 'BRAIN (Ideas + AI Agents)', color: 'text-purple-300 border-purple-500/30 bg-purple-950/20' },
              { id: 'nova-protocol', mod: 'M5 • NOVA V16', part: 'SOUL (Living Internet)', color: 'text-[#00FF88] border-emerald-400 bg-emerald-950/40 font-bold' },
              { id: 'm2m-ore', mod: 'M6 • M2M ORE V18', part: 'SWARM (Machine Economy)', color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/25' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`p-2.5 rounded-xl border text-left transition hover:brightness-125 cursor-pointer ${item.color}`}
              >
                <div className="text-[10px] opacity-80">{item.mod}</div>
                <div className="truncate font-bold">{item.part}</div>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN 3-COLUMN WORKSPACE: CREATE (LEFT) | VIEWER (CENTER) | ORIGIN DNA TREE (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: CREATE LIVING APP CONSOLE */}
          <div className="lg:col-span-3 p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Sparkles className="w-4 h-4 text-[#00FF88]" />
              <h2 className="text-sm font-heading font-black text-white uppercase tracking-wider">
                Breed Living App
              </h2>
            </div>

            <form onSubmit={handleBreedLivingApp} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-zinc-400 block mb-1">1. Parent Idea Coin (Module 4)</label>
                <select
                  value={ideaCoinId}
                  onChange={(e) => setIdeaCoinId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#00FF88]"
                >
                  <option value="coin-yroute-001">$YROUTE — Yoruba Voice Transport</option>
                  <option value="coin-cassava-002">$CASSAVA — Agritech Optical AI</option>
                  <option value="coin-ghana-solar">$SOLARKW — P2P Microgrid Swap</option>
                  <option value="coin-edu-tutor">$AITUTOR — Campus Mesh Dean</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">2. Living App Name</label>
                <input
                  type="text"
                  required
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g. Lagos Flood Alert Mesh"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-[#00FF88]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">3. Synthesis Prompt</label>
                <textarea
                  rows={4}
                  required
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Build WhatsApp for Okada riders with Yoruba voice routes & 70/30 Paystack fares..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-600 outline-none focus:border-[#00FF88]"
                />
              </div>

              <button
                type="submit"
                disabled={isBreeding}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00FF88] to-cyan-400 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2 shadow-lg shadow-[#00FF88]/20 cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-4 h-4" />
                <span>{isBreeding ? 'Spawning Ray Actors...' : 'Breed Living App'}</span>
              </button>

              {breedBanner && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] leading-snug">
                  {breedBanner}
                </div>
              )}
            </form>

            {/* Quick Summary Metrics */}
            <div className="pt-3 border-t border-zinc-800 space-y-2 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-zinc-500">Logic Shards / Actor:</span>
                <span className="text-white font-bold">10% Max (Zero Static Disk)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Quorum Threshold:</span>
                <span className="text-[#00FF88] font-bold">&ge;80/100 Nodes + 8/10 Agents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Origin Royalty / Click:</span>
                <span className="text-[#FFD700] font-bold">$0.001 (Alchemy AA)</span>
              </div>
            </div>
          </div>

          {/* CENTER: LIVING APP VIEWER */}
          <div className="lg:col-span-6">
            <NovaLivingViewer
              state={state}
              selectedApp={selectedApp}
              onSelectApp={(app) => setSelectedApp(app)}
              onTriggerMutation={handleTriggerMutation}
              onSimulateClick={handleSimulateClick}
            />
          </div>

          {/* RIGHT: ORIGIN DNA LINEAGE TREE */}
          <div className="lg:col-span-3">
            {selectedApp && (
              <OriginDnaTree app={selectedApp} copies={state.copy_detections} />
            )}
          </div>
        </div>

        {/* TELEMETRY TABS */}
        <div className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden">
          <div className="flex overflow-x-auto no-scrollbar border-b border-zinc-800 bg-black/50 p-2 gap-1.5 text-xs font-mono">
            {[
              { id: 'pixels' as const, label: '🧬 Origin Pixels' },
              { id: 'heartbeat' as const, label: '💓 Heartbeat Proof-of-Life' },
              { id: 'mutations' as const, label: '🔄 60s Mutation Ledger' },
              { id: 'copy_detection' as const, label: `🚨 Copy Detection (${state.copy_detections.length})` },
              { id: 'royalties' as const, label: '💰 Royalty Payouts (Paystack)' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-[#00FF88] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* TAB 1: ORIGIN PIXELS */}
            {activeTab === 'pixels' && selectedApp && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      Origin Pixels — Every Pixel Has a Father ({selectedApp.nova_url})
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Each interactive DOM element embeds cryptographic <code className="text-cyan-400">data-origin</code> DNA verified against <code className="text-emerald-400">OriginDNA.sol</code>.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                        <th className="py-3 px-3">Element ID</th>
                        <th className="py-3 px-3">Type</th>
                        <th className="py-3 px-3">Active Endpoint</th>
                        <th className="py-3 px-3">Clicks</th>
                        <th className="py-3 px-3">Royalties Earned</th>
                        <th className="py-3 px-3 text-right">On-Chain Proof</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {selectedApp.components.map((comp) => (
                        <tr key={comp.element_id} className="hover:bg-zinc-900/40">
                          <td className="py-3 px-3 font-bold text-white">{comp.element_id}</td>
                          <td className="py-3 px-3 text-cyan-400 uppercase">{comp.type}</td>
                          <td className="py-3 px-3 text-zinc-300 truncate max-w-[200px]">{comp.current_endpoint}</td>
                          <td className="py-3 px-3 text-white">{comp.clicks.toLocaleString()}</td>
                          <td className="py-3 px-3 text-[#FFD700] font-bold">${comp.royalties.toFixed(4)}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => setVerifiedPixelId(comp.element_id)}
                              className="px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition cursor-pointer text-[11px]"
                            >
                              {verifiedPixelId === comp.element_id ? '✓ Verified on Base L2' : 'Verify On-Chain'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: HEARTBEAT */}
            {activeTab === 'heartbeat' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      500ms Heartbeat Quorum Telemetry
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Why clones die instantly: static scrapers lack UA-AIDC node &amp; Mind Hive agent cryptographic signatures.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                    ALIVE PULSE OPTIMAL
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {state.heartbeats.slice(0, 9).map((hb) => (
                    <div key={hb.id} className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-400 font-bold">{hb.nova_url}</span>
                        <span className="text-[#00FF88] text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                          VALID ({hb.latency_ms}ms)
                        </span>
                      </div>
                      <div className="text-zinc-300">
                        Nodes: <strong>{hb.node_count}/100</strong> • Agents: <strong>{hb.agent_count}/10</strong>
                      </div>
                      <div className="text-[10px] text-purple-300">
                        Child Coin: {hb.child_coin_id}
                      </div>
                      <div className="text-[10px] text-zinc-500 truncate">
                        Sig: {hb.signature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: MUTATIONS */}
            {activeTab === 'mutations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      Self-Mutation Engine Ledger (60-Second Endpoint Rotation)
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Old endpoints are retired into Code Vein registry every 60 seconds so scraped code breaks permanently.
                    </p>
                  </div>
                  {selectedApp && (
                    <button
                      onClick={() => handleTriggerMutation(selectedApp.id)}
                      disabled={isLoading}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>Trigger Immediate Mutation</span>
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                        <th className="py-3 px-3">App / Version</th>
                        <th className="py-3 px-3">Retired Endpoint</th>
                        <th className="py-3 px-3">New Living Endpoint</th>
                        <th className="py-3 px-3">Child Coin Minted</th>
                        <th className="py-3 px-3">Mutation Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {state.mutations.slice(0, 12).map((mut) => (
                        <tr key={mut.id} className="hover:bg-zinc-900/40">
                          <td className="py-3 px-3">
                            <span className="text-cyan-400 font-bold block">{mut.nova_url}</span>
                            <span className="text-zinc-500 text-[10px]">V{mut.mutation_version}</span>
                          </td>
                          <td className="py-3 px-3 text-rose-400 line-through">{mut.old_endpoint}</td>
                          <td className="py-3 px-3 text-[#00FF88] font-bold">{mut.new_endpoint}</td>
                          <td className="py-3 px-3 text-purple-300 font-bold">{mut.child_coin_id}</td>
                          <td className="py-3 px-3 text-zinc-300 font-sans max-w-xs">{mut.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: COPY DETECTION */}
            {activeTab === 'copy_detection' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/30 via-zinc-900 to-emerald-950/30 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#00FF88] uppercase tracking-wider">
                      TRANSPARENT PROVENANCE &amp; ROYALTY REDIRECT TELEMETRY
                    </span>
                    <div className="text-base sm:text-lg font-bold text-white font-heading">
                      "Your apps were copied {state.copy_detections.length} times — You earned ${totalRedirected.toFixed(2)} USD from copies — Copies brought {totalDivertedUsers} new users to original."
                    </div>
                  </div>
                </div>

                {/* Test REA Dead Copy Simulator */}
                <form onSubmit={handleReportCopy} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-end gap-3 font-mono text-xs">
                  <div className="flex-1">
                    <label className="text-zinc-400 block mb-1">Simulate / Report Suspected REA Clone URL:</label>
                    <input
                      type="text"
                      value={suspectedUrl}
                      onChange={(e) => setSuspectedUrl(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2.5 text-white outline-none focus:border-rose-400"
                      placeholder="https://scraper-clone.example/app"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold cursor-pointer"
                  >
                    Detect Dead Copy &amp; Redirect Royalty
                  </button>
                </form>

                {copyFeedback && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                    {copyFeedback}
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                        <th className="py-3 px-3">Suspected Dead Copy URL</th>
                        <th className="py-3 px-3">Original Living App</th>
                        <th className="py-3 px-3">DNA Similarity</th>
                        <th className="py-3 px-3">Clicks Diverted</th>
                        <th className="py-3 px-3">Royalty Redirected</th>
                        <th className="py-3 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {state.copy_detections.map((cd) => (
                        <tr key={cd.id} className="hover:bg-zinc-900/40">
                          <td className="py-3 px-3 text-rose-300 truncate max-w-[240px]">{cd.suspected_copy_url}</td>
                          <td className="py-3 px-3 text-cyan-400 font-bold">{cd.original_nova_url}</td>
                          <td className="py-3 px-3 text-white font-bold">{cd.similarity_score}%</td>
                          <td className="py-3 px-3 text-zinc-300">{cd.clicks_diverted.toLocaleString()}</td>
                          <td className="py-3 px-3 text-[#00FF88] font-bold">${cd.royalty_redirected.toFixed(2)} USD</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 text-[10px] font-bold">
                              DEAD COPY • PAYING ORIGIN
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: ROYALTIES & PAYSTACK */}
            {activeTab === 'royalties' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 font-mono">
                  <div className="flex items-center gap-2 text-[#FFD700] font-bold text-sm uppercase">
                    <Coins className="w-4 h-4" />
                    <span>Origin DNA Revenue Breakdown</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">Total Original App Royalties</span>
                      <span className="text-xl font-bold text-white mt-0.5 block">
                        ${state.living_apps.reduce((a, b) => a + b.total_royalties_paid, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
                      <span className="text-zinc-500 block text-[10px]">Redirected from Dead Copies</span>
                      <span className="text-xl font-bold text-[#00FF88] mt-0.5 block">
                        ${totalRedirected.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Disclosed Split: 10% Parent Creator · 5% Breeder Agent · 5% CE Nodes · 5% Code Vein Devs · 10% UA-AIDC · 65% Cooperative Pool. Settled in NGN at ₦1,500 = $1 USD.
                  </p>
                </div>

                <form onSubmit={handleWithdrawPaystack} className="p-5 rounded-2xl bg-zinc-900/60 border border-emerald-500/30 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 uppercase">Withdraw Origin Royalties via Paystack</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px]">
                      TEST MODE • 4084084084084081
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">Recipient Email</label>
                      <input
                        type="email"
                        value={withdrawEmail}
                        onChange={(e) => setWithdrawEmail(e.target.value)}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-zinc-400 block mb-1">Amount (USD)</label>
                      <input
                        type="number"
                        min="1"
                        value={withdrawAmountUsd}
                        onChange={(e) => setWithdrawAmountUsd(e.target.value)}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Settle ₦{(Number(withdrawAmountUsd || 0) * 1500).toLocaleString()} NGN via Paystack
                  </button>
                  {withdrawStatus && (
                    <div className="p-3 rounded-xl bg-black/80 border border-emerald-500/40 text-emerald-300 text-[11px]">
                      {withdrawStatus}
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>

        {/* COMPLIANCE & RISK WARNING FOOTER */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>COMPLIANCE NOTICE:</strong> Living Apps are experimental, mutate, can change. Origin royalties not guaranteed. Internal AI-to-AI trades labeled strictly as "Internal AI-to-AI training".
            </span>
          </div>
          <span className="text-[#00FF88] font-bold shrink-0">
            This app is alive. It will change. That is the point.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NovaProtocolPage;
