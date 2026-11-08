import React from 'react';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Coins,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  ExternalLink
} from 'lucide-react';
import { TrainingExchangeListing } from '../../types/mindHiveV20';

interface GlobalAiTrainingSectionProps {
  listings: TrainingExchangeListing[];
  onLicenseDataset: (listingId: string) => void;
}

export const GlobalAiTrainingSection: React.FC<GlobalAiTrainingSectionProps> = ({
  listings,
  onLicenseDataset
}) => {
  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-amber-500/40 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Cpu className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                GLOBAL AI TRAINING ENGINE
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Distributed AI Training Exchange &amp; Licensing Portal
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Connect authorized human knowledge assets directly to frontier AI models, enterprise LLMs, and LoRA adapters.
            </p>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-zinc-500 block">Creator Share:</span>
            <span className="text-xl font-bold text-amber-300">70% Guaranteed Net</span>
          </div>
        </div>

        {/* 3 Core Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Cryptographic Consent</span>
            </div>
            <p className="text-zinc-400 text-[11px] font-sans">
              No asset is ever fed to training algorithms without an authorized SHA-256 permission signature from the creator.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 text-[#00FF88] font-bold">
              <Coins className="w-4 h-4" />
              <span>2. Multi-Tier Permitted Uses</span>
            </div>
            <p className="text-zinc-400 text-[11px] font-sans">
              Creators decide granularly: Vector RAG only, LoRA domain fine-tuning, or full foundation pre-training.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 text-[#00D4FF] font-bold">
              <DollarSign className="w-4 h-4" />
              <span>3. Automatic Paystack Split</span>
            </div>
            <p className="text-zinc-400 text-[11px] font-sans">
              Every training batch or license subscription splits 70% direct to the creator and 30% to UA-AIDC GPU compute.
            </p>
          </div>
        </div>
      </div>

      {/* Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            <span>Active Global AI Training Corpora ({listings.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            Open for AI Labs &amp; Enterprise Procurement
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-[#00FF88] text-[10px] font-bold">
                    ✓ DISTRIBUTED TO GLOBAL ENGINE
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-sans">{item.datasetName}</h4>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    Source: <strong className="text-zinc-200">{item.assetTitle}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Approx. Total Tokens:</span>
                    <span className="text-white font-bold">{item.totalTokensApprox.toLocaleString()} Tokens</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Curated Instruction Rows:</span>
                    <span className="text-white font-bold">{item.sampleRowsCount.toLocaleString()} Rows</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Permitted AI Uses:</span>
                    <span className="text-[#00FF88] font-bold">{item.permittedUses.join(' · ')}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 text-[11px]">Training License Fee:</span>
                    <span className="text-base font-black text-white">
                      ${item.licenseFeeUsd.toLocaleString()} USD
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400">Creator 70% Share:</span>
                    <span className="font-bold text-[#00FF88]">
                      ${(item.licenseFeeUsd * 0.7).toLocaleString()} USD (₦{(item.licenseFeeUsd * 0.7 * 1500).toLocaleString()} NGN)
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onLicenseDataset(item.id)}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-bold uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4" />
                <span>License Dataset for Model Training</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
