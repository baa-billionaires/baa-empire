import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { AIWorkforceAgent } from '../types';
import {
  Bot,
  Sparkles,
  Zap,
  Terminal,
  ShieldCheck,
  CheckCircle,
  Plus,
  Play,
  Users,
  Search,
  Filter,
  DollarSign,
  Coins,
  ArrowRight,
  X,
  Activity,
  Cpu,
  Layers,
  Car,
  ShoppingBag,
  Share2
} from 'lucide-react';
import { COMMERCE_AGENT_PRESETS } from '../lib/autonomousData';

export const AIWorkforcePage: React.FC = () => {
  const { aiWorkforce, hireAgent, createAgent, profile, baacoinPrice } = useEcosystem();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewAgent, setPreviewAgent] = useState<AIWorkforceAgent | null>(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Agent Builder Form State
  const [builderForm, setBuilderForm] = useState({
    name: '',
    tagline: '',
    category: 'Personal Assistants' as AIWorkforceAgent['category'],
    description: '',
    hourly_rate_baacoin: 15,
    monthly_rate_usd: 29,
    capabilities: 'Autonomous Sales, Multi-Channel Outreach, Paystack Billing',
    system_core: 'Gemini 2.5 Flash Autonomous Kernel',
    system_loop: 'Scrape leads -> Evaluate intent -> Send tailored proposal -> Confirm payment',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    creator_name: profile.full_name || 'Autonomous Student Creator'
  });

  const categories = [
    'All',
    'Personal Assistants',
    'Industry Swarms',
    'Strategic Legions',
    'Corporate Colonies'
  ];

  const filteredAgents = aiWorkforce.filter(agent => {
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyPreset = (preset: typeof COMMERCE_AGENT_PRESETS[0]) => {
    setBuilderForm({
      name: preset.name,
      tagline: preset.tagline,
      category: preset.category,
      description: preset.description,
      hourly_rate_baacoin: preset.hourly_rate_baacoin,
      monthly_rate_usd: preset.monthly_rate_usd,
      capabilities: preset.capabilities.join(', '),
      system_core: preset.system_core,
      system_loop: preset.system_loop,
      avatar_url: preset.id === 'preset-car-arbitrage'
        ? 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300'
        : preset.id === 'preset-global-shopper'
        ? 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
      creator_name: profile.full_name || 'Autonomous BAA Creator'
    });
    setToastMessage(`Preset "${preset.name}" loaded into Foundry!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleHireClick = (agent: AIWorkforceAgent) => {
    const res = hireAgent(agent.id);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCreateAgentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderForm.name || !builderForm.description) return;

    createAgent({
      name: builderForm.name,
      tagline: builderForm.tagline,
      category: builderForm.category,
      description: builderForm.description,
      hourly_rate_baacoin: Number(builderForm.hourly_rate_baacoin) || 15,
      monthly_rate_usd: Number(builderForm.monthly_rate_usd) || 29,
      avatar_url: builderForm.avatar_url,
      capabilities: builderForm.capabilities.split(',').map(c => c.trim()).filter(Boolean),
      autonomous_loop_preview: builderForm.system_loop.split('->').map((step, idx) => `Step ${idx + 1}: ${step.trim()}`),
      system_core: builderForm.system_core,
      creator_name: builderForm.creator_name
    });

    setIsBuilderOpen(false);
    setToastMessage(`Custom Agent "${builderForm.name}" successfully deployed to marketplace!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 max-w-md bg-emerald-950 border border-emerald-500/80 rounded-2xl p-4 shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-bounce-once">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-emerald-200 font-mono">{toastMessage}</p>
        </div>
      )}

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-zinc-800 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold uppercase mb-3">
            <Bot className="w-3.5 h-3.5" />
            24/7 Autonomous Workforce Protocol
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
            🤖 AI Workforce &amp; Legions Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            Hire autonomous AI agents, enterprise swarms, and corporate colonies that run 24/7 on Africa’s sovereign decentralized compute grid. Every agent earns in <span className="text-[#FFD700] font-bold">$BAA Coin ($1.00 USD base)</span> and executes self-governing business operations.
          </p>
        </div>

        {/* Global Stats & Deploy CTA */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-2xl font-mono text-xs flex items-center gap-4">
            <div>
              <span className="text-zinc-500 block text-[10px]">ACTIVE LOOPS</span>
              <span className="text-emerald-400 font-bold text-sm">1,476 Running</span>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            <div>
              <span className="text-zinc-500 block text-[10px]">UPTIME SLA</span>
              <span className="text-white font-bold text-sm">99.98%</span>
            </div>
          </div>

          <button
            onClick={() => setIsBuilderOpen(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-2 shadow-lg shadow-[#FFD700]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Build &amp; List Custom Agent</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Category Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FFD700] text-black shadow-md'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search 24/7 agents & swarms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
            />
          </div>
        </div>

        {/* 4 Pillars Category Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CATEGORY 1</span>
            <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#FFD700]" />
              Personal Assistants
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">Autonomous 1-on-1 deal closers, WhatsApp AI receptionists, and revenue pulse managers.</p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CATEGORY 2</span>
            <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00D4FF]" />
              Industry Swarms
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">Coordinated multi-agent clusters executing FinTech underwriting, AgroDrone scans & Nollywood voice cloning.</p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CATEGORY 3</span>
            <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Strategic Legions
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">High-level advisory legions for venture capital pitches, Base L2 arbitrage, and full-stack software synthesis.</p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">CATEGORY 4</span>
            <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              Corporate Colonies
            </h4>
            <p className="text-[11px] text-zinc-400 mt-1">Complete autonomous organizations running end-to-end e-commerce, customer support, and treasury.</p>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              className="bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-black/50 group"
            >
              <div>
                {/* Top Badge & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {agent.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                    <span>★</span>
                    <span>{agent.rating.toFixed(2)}</span>
                    <span className="text-zinc-500">({agent.active_deployments} deployed)</span>
                  </div>
                </div>

                {/* Avatar & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={agent.avatar_url}
                    alt={agent.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-zinc-700 shrink-0 group-hover:scale-105 transition"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5 leading-snug">
                      <span>{agent.name}</span>
                      {agent.is_verified && (
                        <span title="Sovereign Verified">
                          <ShieldCheck className="w-4 h-4 text-[#00D4FF] shrink-0" />
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{agent.tagline}</p>
                    <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                      Creator: {agent.creator_name}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-4">
                  {agent.description}
                </p>

                {/* Capabilities Badges */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Capabilities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 font-sans"
                      >
                        ✓ {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">RATE</span>
                    <span className="text-[#FFD700] font-bold text-sm">
                      {agent.hourly_rate_baacoin} BAA<span className="text-zinc-400 text-xs">/hr</span>
                    </span>
                    <span className="text-[10px] text-zinc-500 block">(${(agent.hourly_rate_baacoin * (baacoinPrice || 1.00)).toFixed(2)} USD)</span>
                  </div>

                  <div className="text-right">
                    <span className="text-zinc-500 block text-[10px]">MONTHLY PASS</span>
                    <span className="text-white font-bold text-sm">
                      ${agent.monthly_rate_usd}<span className="text-zinc-400 text-xs">/mo</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 block font-bold">24/7 Autopilot</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPreviewAgent(agent)}
                    className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>View Loop</span>
                  </button>

                  <button
                    onClick={() => handleHireClick(agent)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black text-xs font-bold font-mono uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5 shadow-md shadow-[#FFD700]/10"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Hire 24/7</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Loop Preview Modal */}
      {previewAgent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setPreviewAgent(null)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{previewAgent.name} - Autonomous Loop</h3>
                <span className="text-xs font-mono text-zinc-400">{previewAgent.system_core}</span>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-2xl p-4 font-mono text-xs space-y-2.5 text-zinc-300 overflow-y-auto max-h-72">
              <div className="text-emerald-400 text-[11px] pb-1 border-b border-zinc-900 flex items-center justify-between">
                <span>[LIVE EXECUTION SIMULATOR]</span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  STATE: RUNNING
                </span>
              </div>
              {previewAgent.autonomous_loop_preview.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-zinc-600 select-none">&gt;</span>
                  <span className={idx === previewAgent.autonomous_loop_preview.length - 1 ? 'text-emerald-300 font-bold' : ''}>
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-zinc-400 font-mono">
                Charges {previewAgent.hourly_rate_baacoin} BAA/hr from your spendable wallet
              </span>
              <button
                onClick={() => {
                  handleHireClick(previewAgent);
                  setPreviewAgent(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold font-mono text-xs uppercase"
              >
                Confirm &amp; Deploy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customized AI Agent Builder Modal */}
      {isBuilderOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setIsBuilderOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-widest font-bold">
                NO-CODE AGENT FOUNDRY
              </span>
              <h2 className="text-2xl font-heading font-black text-white mt-1">
                Deploy Your Custom Autonomous Worker
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Construct your 24/7 autonomous agent. Set pricing in BaaCoin ($1.00 USD baseline) and list it instantly to earn 60% recurring royalties from other entrepreneurs.
              </p>
            </div>

            {/* Three Suggested Commerce & Deal Presets */}
            <div className="space-y-2 p-3.5 bg-black/80 rounded-2xl border border-zinc-800">
              <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-wider font-bold block">
                ⚡ 1-CLICK COMMERCE &amp; SHOPPING PRESETS (CLICK TO LOAD)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {COMMERCE_AGENT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700/80 hover:border-[#FFD700] text-left transition hover:bg-zinc-800 group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-[#FFD700] leading-tight">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5 font-sans">
                      {preset.tagline}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 mt-1 block font-bold">
                      {preset.hourly_rate_baacoin} BAA/hr (${preset.monthly_rate_usd}/mo)
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateAgentSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">AGENT NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos Real Estate Wholesaler"
                    value={builderForm.name}
                    onChange={(e) => setBuilderForm({ ...builderForm, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">CATEGORY</label>
                  <select
                    value={builderForm.category}
                    onChange={(e) => setBuilderForm({ ...builderForm, category: e.target.value as AIWorkforceAgent['category'] })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Personal Assistants">Personal Assistants</option>
                    <option value="Industry Swarms">Industry Swarms</option>
                    <option value="Strategic Legions">Strategic Legions</option>
                    <option value="Corporate Colonies">Corporate Colonies</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">TAGLINE (ONE-LINER)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous property deal finder with instant WhatsApp landlord outreach"
                  value={builderForm.tagline}
                  onChange={(e) => setBuilderForm({ ...builderForm, tagline: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">DESCRIPTION &amp; VALUE PROPOSITION</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe what the agent accomplishes while the owner sleeps..."
                  value={builderForm.description}
                  onChange={(e) => setBuilderForm({ ...builderForm, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">HOURLY RATE (BAACOIN)</label>
                  <input
                    type="number"
                    min="1"
                    value={builderForm.hourly_rate_baacoin}
                    onChange={(e) => setBuilderForm({ ...builderForm, hourly_rate_baacoin: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                  <span className="text-[10px] text-zinc-500 mt-1 block">
                    ≈ ${builderForm.hourly_rate_baacoin * (baacoinPrice || 1.00)} USD
                  </span>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">MONTHLY RATE (USD)</label>
                  <input
                    type="number"
                    min="5"
                    value={builderForm.monthly_rate_usd}
                    onChange={(e) => setBuilderForm({ ...builderForm, monthly_rate_usd: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">KEY CAPABILITIES (COMMA-SEPARATED)</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Scraping, Paystack Checkout, WhatsApp Auto-Reply"
                  value={builderForm.capabilities}
                  onChange={(e) => setBuilderForm({ ...builderForm, capabilities: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">AUTONOMOUS STEP LOOP (SEPARATE BY -&gt;)</label>
                <input
                  type="text"
                  placeholder="e.g. Monitor market -> Identify arbitrage -> Execute smart contract -> Notify client"
                  value={builderForm.system_loop}
                  onChange={(e) => setBuilderForm({ ...builderForm, system_loop: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">
                  Royalty: 60% to your BAA Wallet, 40% to Sovereign Compute Mesh
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
                >
                  Publish 24/7 Worker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
