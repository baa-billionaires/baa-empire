import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { AITool } from '../types';
import {
  Sparkles,
  Search,
  ExternalLink,
  Cpu,
  CheckCircle,
  Play,
  Terminal,
  Zap,
  ArrowRight,
  X
} from 'lucide-react';

export const ToolsPage: React.FC = () => {
  const { aiTools } = useEcosystem();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeToolSandbox, setActiveToolSandbox] = useState<AITool | null>(null);
  const [sandboxInput, setSandboxInput] = useState('');
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [subscribeModalTool, setSubscribeModalTool] = useState<AITool | null>(null);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);

  const categories = ['All', 'Enterprise Automation', 'Blockchain Tools', 'Generative AI', 'Prompt Engineering', 'Audio & Music', 'Video Automation'];

  const filteredTools = aiTools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleLaunchSandbox = (tool: AITool) => {
    setActiveToolSandbox(tool);
    setSandboxInput('');
    setSandboxOutput(tool.demo_output);
  };

  const handleRunExecution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeToolSandbox) return;
    setIsProcessing(true);
    setSandboxOutput(null);

    setTimeout(() => {
      setIsProcessing(false);
      setSandboxOutput(
        `[SUCCESS: AUTONOMOUS RUNTIME]\nExecuted on Kainji GPU Node #H100-04\nInput: "${sandboxInput || 'Default parameters'}"\nOutput:\n${activeToolSandbox.demo_output}\n\nExecution Time: 184ms | Tokens: 312 | Status: 200 OK`
      );
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4 text-[#00D4FF]" />
            30 High-Velocity Autonomous Micro-Apps
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            AI Tools Library
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Plug-and-play autonomous AI software built for African commerce, media production, and blockchain security. Launch instant live sandboxes or license for your enterprise.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search 30 AI tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-[#00D4FF] rounded-xl text-xs text-white placeholder-zinc-500 font-mono outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#00D4FF] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 30 AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#00D4FF]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FFD700]">
                    ${tool.price_monthly}/mo
                  </span>
                </div>

                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  {tool.category}
                </span>
                <h3 className="text-base font-heading font-bold text-white mt-1 group-hover:text-[#00D4FF] transition">
                  {tool.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {tool.description}
                </p>

                <div className="mt-4 space-y-1.5">
                  {tool.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
                      <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex gap-2">
                <button
                  onClick={() => handleLaunchSandbox(tool)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Launch Live</span>
                </button>

                <button
                  onClick={() => {
                    setSubscribeModalTool(tool);
                    setSubscriptionSuccess(false);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono"
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Tool Sandbox Modal */}
      {activeToolSandbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-[#00D4FF]/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveToolSandbox(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white">
                  {activeToolSandbox.name} - Live Sandbox
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">
                  Executing via Kainji GPU Node • Paystack / BaaCoin Ready
                </span>
              </div>
            </div>

            <form onSubmit={handleRunExecution} className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Test Prompt / Input Directive
                </label>
                <input
                  type="text"
                  placeholder="Enter prompt or test parameter..."
                  value={sandboxInput}
                  onChange={(e) => setSandboxInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-4 py-2.5 text-xs text-white outline-none font-mono"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-5 py-2 rounded-xl bg-[#00D4FF] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>{isProcessing ? 'Processing via GPU...' : 'Execute Micro-App'}</span>
                </button>
              </div>
            </form>

            {/* Sandbox Console Output */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 uppercase mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Standard Output</span>
              </label>
              <pre className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-emerald-300 overflow-x-auto max-h-48 whitespace-pre-wrap">
                {sandboxOutput || 'Awaiting execution command...'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Paywall Modal (Paystack mock) */}
      {subscribeModalTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-zinc-950 border border-[#FFD700]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setSubscribeModalTool(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-heading font-black text-white">
              Subscribe to {subscribeModalTool.name}
            </h3>
            <p className="text-xs text-zinc-400">
              License this autonomous tool for your business or university portal.
            </p>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 block font-mono">Monthly License</span>
                <span className="text-xl font-bold text-white">${subscribeModalTool.price_monthly} USD / mo</span>
              </div>
              <span className="text-xs font-mono text-[#FFD700] bg-[#FFD700]/10 px-2.5 py-1 rounded-full border border-[#FFD700]/30 font-bold">
                BaaCoin Accepted
              </span>
            </div>

            {subscriptionSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1">
                <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
                <span className="text-xs font-bold text-emerald-400 block">Subscription Active!</span>
                <span className="text-[11px] text-zinc-300">API Key &amp; webhook access sent to your email.</span>
              </div>
            ) : (
              <button
                onClick={() => setSubscriptionSuccess(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
              >
                Confirm via Paystack / Card ($ {subscribeModalTool.price_monthly})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ToolsPage;
