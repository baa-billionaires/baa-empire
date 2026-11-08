import React, { useState } from 'react';
import {
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Server,
  Zap,
  CheckCircle2,
  ExternalLink,
  Plus,
  RefreshCw,
  Activity
} from 'lucide-react';
import { ModelForgeProject } from '../../types/mindHiveV20';

interface ModelForgeSectionProps {
  projects: ModelForgeProject[];
  onCreateProject: (projectData: any) => Promise<void>;
}

export const ModelForgeSection: React.FC<ModelForgeSectionProps> = ({
  projects,
  onCreateProject
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [targetLevel, setTargetLevel] = useState<number>(3);
  const [baseModel, setBaseModel] = useState<string>('Meta-Llama-3.1-8B-Instruct');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const levels = [
    { level: 1, name: 'Level 1: Contextual RAG Knowledge Agent', desc: 'Vector embeddings, chunking, and semantic retrieval.' },
    { level: 2, name: 'Level 2: Task-Specific Prompt & Tool Orchestrator', desc: 'Function calling, deterministic workflows & tool integration.' },
    { level: 3, name: 'Level 3: Domain-Specialized LoRA Adapter', desc: '16-rank QLoRA parameter-efficient fine-tuning on GPU clusters.' },
    { level: 4, name: 'Level 4: Full Domain Specialized Model', desc: 'Full-weight checkpoint fine-tuning with multi-epoch reinforcement.' },
    { level: 5, name: 'Level 5: Autonomous Multi-Agent Swarm Colony', desc: 'Hierarchical multi-agent coordinator delegating workloads.' },
    { level: 6, name: 'Level 6: Sovereign Self-Evolving Autonomous Engine', desc: 'Self-improving synthetic feedback loops with zero human intervention.' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setIsSubmitting(true);
    try {
      await onCreateProject({
        name,
        targetLevel,
        baseFoundationModel: baseModel,
        description
      });
      setShowCreateModal(false);
      setName('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Failed to create forge project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/40">
                MODEL FORGE STUDIO (LEVELS 1–6)
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Autonomous AI System Architecture &amp; Serving Pipeline
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              From lightweight RAG embeddings to domain-fine-tuned LoRAs and full autonomous swarm colonies.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 text-white font-mono font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Deploy New Model Forge Project</span>
          </button>
        </div>

        {/* 6 Level Architecture Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono text-[10px]">
          {levels.map((lvl) => (
            <div
              key={lvl.level}
              className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1"
            >
              <span className="text-purple-400 font-bold block">LVL {lvl.level}</span>
              <div className="font-bold text-white line-clamp-1">{lvl.name.split(':')[1]}</div>
              <p className="text-zinc-500 font-sans leading-tight line-clamp-2">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Model Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-400" />
            <span>Serving Model Forge Endpoints ({projects.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">Live Federated Inference Endpoints</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    {proj.levelName}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>SERVING ACTIVE</span>
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-sans">{proj.name}</h4>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Base Foundation:</span>
                    <span className="text-white font-bold">{proj.baseFoundationModel}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Compute Cluster:</span>
                    <span className="text-zinc-300">{proj.computeNodeCluster}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Evaluation Accuracy:</span>
                    <span className="text-[#00FF88] font-bold">{proj.evalAccuracyScore}%</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Inference Latency:</span>
                    <span className="text-[#00D4FF] font-bold">{proj.latencyMs} ms</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Cost / Hour:</span>
                    <span className="text-white font-bold">${proj.costPerHourUsd} USD</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-[10px] text-zinc-400 truncate select-all">
                  Endpoint: {proj.deployedEndpoint}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <button
                  onClick={() => alert(`Endpoint copied: ${proj.deployedEndpoint}\nToken: Bearer btk_mh20_live_${proj.id}`)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-purple-300 border border-purple-500/40 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Call Inference Endpoint</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-heading font-black text-white">
                  Create Model Forge Project
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Model Project Name:</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. BAA-Fintech-Llama3-16Rank"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Target Architecture Level:</label>
                <select
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value={1}>Level 1: Contextual RAG Knowledge Agent</option>
                  <option value={2}>Level 2: Task-Specific Prompt &amp; Tool Orchestrator</option>
                  <option value={3}>Level 3: Domain-Specialized LoRA Adapter</option>
                  <option value={4}>Level 4: Full Domain Fine-Tuned Model</option>
                  <option value={5}>Level 5: Autonomous Multi-Agent Swarm Colony</option>
                  <option value={6}>Level 6: Sovereign Self-Evolving Autonomous Engine</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Base Model Foundation:</label>
                <select
                  value={baseModel}
                  onChange={(e) => setBaseModel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-purple-400 cursor-pointer"
                >
                  <option value="Meta-Llama-3.1-8B-Instruct">Meta-Llama-3.1-8B-Instruct</option>
                  <option value="Mistral-Small-24B-Instruct">Mistral-Small-24B-Instruct</option>
                  <option value="Qwen-2.5-72B-Instruct">Qwen-2.5-72B-Instruct</option>
                  <option value="DeepSeek-R1-Distill-Llama-8B">DeepSeek-R1-Distill-Llama-8B</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Description / Purpose:</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain domain focus, target queries, and operational parameters..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400 font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:brightness-110 active:scale-95 text-white font-bold uppercase tracking-wider transition shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Allocating CE Colony Compute...</span>
                  </>
                ) : (
                  <span>Deploy to Model Forge</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
