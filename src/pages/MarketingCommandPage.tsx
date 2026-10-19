import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { AUDIENCE_PRESETS } from '../lib/audiences';
import {
  Sparkles,
  Zap,
  Target,
  DollarSign,
  Play,
  CheckCircle,
  TrendingUp,
  Layers,
  ArrowLeft,
  ChevronDown,
  Terminal,
  Clock
} from 'lucide-react';

interface CampaignItem {
  id: string;
  name: string;
  objective: string;
  revenue_target: number;
  revenue_actual: number;
  status: 'running' | 'completed';
  platforms: string[];
  views: number;
  conversions: number;
  roi_percent: number;
  creatives: Array<{ title: string; cta: string }>;
  created_at: string;
}

export const MarketingCommandPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { courses } = useEcosystem();

  const [prompt, setPrompt] = useState('Today market 5 courses to global students and make $1000');
  const [revenueTarget, setRevenueTarget] = useState(1000);
  const [selectedAudience, setSelectedAudience] = useState(AUDIENCE_PRESETS[0].id);
  const [duration, setDuration] = useState('Today');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Internal Ads', 'TikTok', 'Instagram', 'WhatsApp']);

  // Execution states
  const [isExecuting, setIsExecuting] = useState(false);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);
  const [activeRevenueCounter, setActiveRevenueCounter] = useState(0);

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: "camp-1",
      name: "Global Gen-Z TikTok Rush",
      objective: "Market ChatGPT ATM & Instagram Millionaire",
      revenue_target: 1000,
      revenue_actual: 780,
      status: "running",
      platforms: ["TikTok", "Instagram", "Internal"],
      views: 89400,
      conversions: 8,
      roi_percent: 390,
      creatives: [
        { title: "Make $1,000 in 7 Days with ChatGPT", cta: "Enroll & Mine 990 BaaCoin" },
        { title: "Lagos Student Earns $9k in 2 Weeks", cta: "Claim Scholarship" }
      ],
      created_at: new Date(Date.now() - 3600000 * 6).toISOString()
    }
  ]);

  const quickCommands = [
    { label: "Market 5 hottest courses Nigeria Make $1000", prompt: "Market 5 hottest courses in Nigeria with WhatsApp sales agent and make $1000 today", target: 1000 },
    { label: "Find investors LinkedIn pitch data center", prompt: "Identify 20 UK/US venture angels on LinkedIn and dispatch executive data center pitch for seed notes", target: 5000 },
    { label: "Promote Bounties Lagos", prompt: "Broadcast ₦150,000 developer bounties across Nigerian tech Telegram & WhatsApp groups", target: 500 },
    { label: "Sell White Label 10 churches", prompt: "Pitch autonomous sermon generators & church tithe AI to 10 prominent ministries across Africa", target: 2000 },
    { label: "Make 10 viral TikTok clips", prompt: "Auto-clip top 10 masterclasses into 9:16 vertical shorts with high curiosity hooks and post immediately", target: 800 }
  ];

  const handleApplyQuick = (item: typeof quickCommands[0]) => {
    setPrompt(item.prompt);
    setRevenueTarget(item.target);
  };

  const handleExecuteCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecuting(true);
    setLiveLogs([]);
    setActiveRevenueCounter(0);

    const steps = [
      "1. Parsing natural language directive with AI Governor...",
      "2. Synthesizing 5 ad creative variations with dynamic gold borders...",
      "3. Matching target preset audience: " + selectedAudience + "...",
      "4. Dispatching multi-platform hooks to TikTok, Instagram & WhatsApp Closer...",
      "5. Activating internal hero and dashboard promotional banners...",
      "6. First student lead converted! +$99 tuition registered.",
      "7. Second conversion! +$99 tuition registered.",
      "8. WhatsApp closer closed 3 enterprise leads! +$297 registered.",
      "9. Campaign running autonomously at target trajectory!"
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx >= steps.length) {
        clearInterval(interval);
        setIsExecuting(false);

        const newCamp: CampaignItem = {
          id: `camp-${Date.now()}`,
          name: prompt.substring(0, 36) + "...",
          objective: prompt,
          revenue_target: revenueTarget,
          revenue_actual: Math.floor(revenueTarget * 0.49),
          status: 'running',
          platforms: selectedPlatforms,
          views: 34500,
          conversions: 5,
          roi_percent: 245,
          creatives: [
            { title: "Sovereign 10x BaaCoin Networth", cta: "Unlock on Graduation" },
            { title: "Autonomous Digital Agency in 14 Days", cta: "Start Mining" }
          ],
          created_at: new Date().toISOString()
        };
        setCampaigns(prev => [newCamp, ...prev]);
        return;
      }

      setLiveLogs(prev => [...prev, steps[stepIdx]]);
      if (stepIdx >= 5) {
        setActiveRevenueCounter(prev => prev + 99);
      }
      stepIdx++;
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Vault</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-[#FFD700] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#FFD700]" />
              Autonomous Revenue Directive
            </span>
            <h1 className="text-3xl font-heading font-black text-white mt-1">
              Marketing Command Center
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Issue ChatGPT-style directives: "Today market 5 courses and make $1000". AI generates ads, syndicates multi-platform, and tracks conversions.
            </p>
          </div>
        </div>

        {/* Quick Command Buttons */}
        <div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
            1-Click Preset Commands
          </span>
          <div className="flex flex-wrap gap-2">
            {quickCommands.map((cmd, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleApplyQuick(cmd)}
                className="px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700] text-xs font-mono text-zinc-300 hover:text-white transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>{cmd.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Command Center: Prompt Form (Left) & Real-time Execution Log (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prompt Directive Form (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-heading">Command Directive</h3>

            <form onSubmit={handleExecuteCampaign} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Natural Language Campaign Instruction</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white outline-none focus:border-[#FFD700] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Target Revenue ($ USD)</label>
                  <input
                    type="number"
                    value={revenueTarget}
                    onChange={(e) => setRevenueTarget(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase mb-1">Duration Window</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FFD700]"
                  >
                    <option>Today (24 Hours)</option>
                    <option>This Week (7 Days)</option>
                    <option>This Month (30 Days)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Audience Preset</label>
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FFD700]"
                >
                  {AUDIENCE_PRESETS.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.pain_points.substring(0, 45)}...)</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isExecuting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-xl shadow-[#FFD700]/25 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>{isExecuting ? 'Executing Autonomous Campaign...' : `Launch Campaign (Target: $${revenueTarget})`}</span>
              </button>
            </form>
          </div>

          {/* Live Execution Log (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00D4FF]" />
                  <span className="text-xs font-mono font-bold text-white">Live Execution Terminal</span>
                </div>
                {isExecuting && (
                  <span className="text-[10px] font-mono text-emerald-400 animate-pulse">Running</span>
                )}
              </div>

              <div className="space-y-2 font-mono text-[11px] max-h-64 overflow-y-auto">
                {liveLogs.length === 0 ? (
                  <span className="text-zinc-600 italic">Enter directive &amp; click Launch to view real-time AI orchestration steps...</span>
                ) : (
                  liveLogs.map((log, i) => (
                    <div key={i} className="text-zinc-300 flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Realtime Revenue Progress Counter */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Live Campaign Revenue:</span>
                <span className="text-[#FFD700] font-bold text-base">${activeRevenueCounter} / ${revenueTarget}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#FFD700] to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((activeRevenueCounter / revenueTarget) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns Table */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4 shadow-2xl">
          <h4 className="text-base font-bold text-white font-heading">Active &amp; Historical Marketing Campaigns</h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Campaign Directive</th>
                  <th className="py-2.5 px-3">Target vs Actual</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Views</th>
                  <th className="py-2.5 px-3">Sales</th>
                  <th className="py-2.5 px-3">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {campaigns.map(c => (
                  <tr key={c.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-3 max-w-sm truncate text-white font-sans">{c.name}</td>
                    <td className="py-3 px-3">
                      <span className="text-emerald-400 font-bold">${c.revenue_actual}</span>
                      <span className="text-zinc-500"> / ${c.revenue_target}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-300">{c.views.toLocaleString()}</td>
                    <td className="py-3 px-3 text-[#FFD700] font-bold">{c.conversions} enrollments</td>
                    <td className="py-3 px-3 text-[#00D4FF] font-bold">+{c.roi_percent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarketingCommandPage;
