import React from 'react';
import {
  Sparkles,
  Database,
  Layers,
  Brain,
  Cpu,
  TrendingUp,
  Globe,
  Coins,
  ShieldCheck,
  Zap,
  ArrowRight,
  Activity,
  Bot
} from 'lucide-react';
import { MindHiveV20State } from '../../types/mindHiveV20';

interface MindHiveV20OverviewProps {
  state: MindHiveV20State;
  onNavigateTab: (tab: string) => void;
}

export const MindHiveV20Overview: React.FC<MindHiveV20OverviewProps> = ({
  state,
  onNavigateTab
}) => {
  const economies = [
    {
      id: 'genome',
      title: '1. Content Asset Economy',
      description: 'Universal Content Genome registry with SHA-256 cryptographic provenance and verification shields.',
      metric: `${state.assets.length} Registered Assets`,
      color: 'amber',
      action: 'Register & Browse Assets'
    },
    {
      id: 'multiplier',
      title: '2. Content Multiplication Economy',
      description: 'Living eBook studio, 10-part technical series, 6-module course factory & audio podcasts.',
      metric: `${state.derivatives.length} Commercial Products`,
      color: 'emerald',
      action: 'Multiply 1 → 10'
    },
    {
      id: 'mining',
      title: '3. AI Knowledge Mining Reactor',
      description: 'OCR multi-format parsing, semantic axiom extraction, instruction synthesis, and JSONL exports.',
      metric: `${state.stats.totalMinedQaPairs.toLocaleString()} Q&A Pairs`,
      color: 'cyan',
      action: 'Extract Instruction Datasets'
    },
    {
      id: 'training',
      title: '4. Global AI Training Engine',
      description: '"DISTRIBUTE TO GLOBAL AI TRAINING ENGINE" portal connecting verified corpora to frontier models.',
      metric: `${state.trainingListings.length} Active Training Corpora`,
      color: 'purple',
      action: 'License AI Training Data'
    },
    {
      id: 'forge',
      title: '5. Model Forge (Levels 1–6)',
      description: 'From RAG knowledge agents and domain LoRAs to Level 5 autonomous swarm colonies.',
      metric: `${state.modelForgeProjects.length} Deployed AI Endpoints`,
      color: 'indigo',
      action: 'Deploy Model Endpoints'
    },
    {
      id: 'buyers',
      title: '6. 8 Buyer-Hunting Legions',
      description: 'Autonomous deal closer hunting AI labs, enterprise training mandates, and university campus licenses.',
      metric: `${state.buyerLeads.length} Verified Buyer Leads`,
      color: 'blue',
      action: 'View Hunting Radar'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 5 Connected Economies Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
            <span>THE 5 CONNECTED KNOWLEDGE ECONOMIES</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              V20 MASTER ARCHITECTURE
            </span>
          </h2>
          <span className="text-xs font-mono text-zinc-500">Autonomous Value Creation Loop</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {economies.map((eco) => (
            <div
              key={eco.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition space-y-4 shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {eco.metric}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
                </div>

                <h3 className="text-base font-bold text-white font-heading">{eco.title}</h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {eco.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800">
                <button
                  onClick={() => onNavigateTab(eco.id)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{eco.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 27 Specialist Swarm Agents Telemetry */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <span>27 Autonomous Specialist Swarm Agents</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Continuous 24/7 background execution across Acquisition, Multiplication, Mining, Training, and Commercialization
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
              ● ALL AGENTS SYNCHRONIZED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
          {state.agents.map((agent) => (
            <div
              key={agent.id}
              className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{agent.name}</span>
                <span className="text-[10px] text-emerald-400 font-bold">
                  {agent.efficiencyScore}%
                </span>
              </div>
              <div className="text-[10px] text-amber-400/90">{agent.division}</div>
              <p className="text-[10px] text-zinc-400 font-sans leading-tight line-clamp-2">
                {agent.role}
              </p>
              <div className="text-[9px] text-zinc-500 pt-1 border-t border-zinc-800/60 flex justify-between">
                <span>Actions 24h:</span>
                <span className="text-zinc-300 font-bold">{agent.actionsCompleted24h}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
