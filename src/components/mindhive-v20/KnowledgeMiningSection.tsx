import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Download,
  Copy,
  Check,
  RefreshCw,
  FileCode,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowRight
} from 'lucide-react';
import { ContentGenomeAsset, MiningJob } from '../../types/mindHiveV20';

interface KnowledgeMiningSectionProps {
  assets: ContentGenomeAsset[];
  miningJobs: MiningJob[];
  onTriggerMining: (assetId: string) => Promise<void>;
}

export const KnowledgeMiningSection: React.FC<KnowledgeMiningSectionProps> = ({
  assets,
  miningJobs,
  onTriggerMining
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [isMining, setIsMining] = useState<boolean>(false);
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  const handleStartMining = async () => {
    if (!selectedAssetId) return;
    setIsMining(true);
    try {
      await onTriggerMining(selectedAssetId);
    } catch (err) {
      console.error(err);
      alert('Mining reactor error');
    } finally {
      setIsMining(false);
    }
  };

  const handleCopyJsonl = (sample: string, id: string) => {
    navigator.clipboard.writeText(sample);
    setCopiedJobId(id);
    setTimeout(() => setCopiedJobId(null), 2500);
  };

  const handleDownloadDataset = (job: MiningJob) => {
    const element = document.createElement('a');
    const file = new Blob([job.jsonlSample], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${job.assetTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-dataset.jsonl`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Pipeline Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
                <Brain className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#00D4FF] uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40">
                AI KNOWLEDGE MINING REACTOR
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Knowledge Extraction &amp; Instruction Dataset Forge
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Transforms unstructured human manuscripts into fine-tuning-ready JSONL instruction datasets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              Format: Standard OpenAI / Anthropic / Llama-3 JSONL
            </span>
          </div>
        </div>

        {/* 5 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 block">STAGE 1</span>
            <div className="font-bold text-white">OCR &amp; Ingestion</div>
            <p className="text-[10px] text-zinc-400 font-sans">Multi-format parser for PDF, EPUB &amp; audio.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 block">STAGE 2</span>
            <div className="font-bold text-white">Semantic Mining</div>
            <p className="text-[10px] text-zinc-400 font-sans">Extracts axioms, formulas and core logic.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 block">STAGE 3</span>
            <div className="font-bold text-white">Instruction Pairs</div>
            <p className="text-[10px] text-zinc-400 font-sans">Constructs multi-turn reasoning chains.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] text-emerald-400 block font-bold">STAGE 4</span>
            <div className="font-bold text-[#00FF88]">Anti-Hallucination</div>
            <p className="text-[10px] text-zinc-400 font-sans">&lt;0.1% hallucination verification audit.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-cyan-500/30 space-y-1">
            <span className="text-[10px] text-cyan-400 block font-bold">STAGE 5</span>
            <div className="font-bold text-[#00D4FF]">JSONL Export</div>
            <p className="text-[10px] text-zinc-400 font-sans">De-duplicated corpus ready for training.</p>
          </div>
        </div>

        {/* Trigger Mining Action Form */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex-1 space-y-1">
            <label className="text-zinc-400 block uppercase font-bold text-[11px]">
              Select Asset to Mine with Knowledge Reactor:
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-[#00D4FF] cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} ({a.format} · {a.wordCount.toLocaleString()} words)
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartMining}
            disabled={isMining}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-blue-500 hover:brightness-110 active:scale-95 text-black font-bold uppercase tracking-wider transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isMining ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Extracting Knowledge &amp; JSONL...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Launch Mining Reactor</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extracted Datasets List & Code Viewer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#00D4FF]" />
            <span>Completed Knowledge Datasets ({miningJobs.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            OpenAI &amp; Llama-3 Compliant Format
          </span>
        </div>

        <div className="space-y-5">
          {miningJobs.map((job) => {
            const isCopied = copiedJobId === job.id;

            return (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      SOURCE ASSET
                    </span>
                    <h4 className="text-base font-bold text-white font-sans">{job.assetTitle}</h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      {job.hallucinationRisk}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                      {job.qaPairsCount.toLocaleString()} Q&amp;A Pairs
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      {job.dedupIndex}% Unique
                    </span>
                  </div>
                </div>

                {/* JSONL Sample Viewer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <FileCode className="w-3.5 h-3.5 text-[#00D4FF]" />
                      <span>Dataset Record Sample (.jsonl):</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyJsonl(job.jsonlSample, job.id)}
                        className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center gap-1 text-[11px] cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy JSONL</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleDownloadDataset(job)}
                        className="px-3 py-1 rounded-lg bg-[#00D4FF]/20 hover:bg-[#00D4FF]/30 text-[#00D4FF] border border-[#00D4FF]/40 transition flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download .JSONL</span>
                      </button>
                    </div>
                  </div>

                  <pre className="p-4 rounded-2xl bg-black border border-zinc-800 text-[#00FF88] font-mono text-[11px] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48 scrollbar-thin">
                    {job.jsonlSample}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
