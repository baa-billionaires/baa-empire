import React, { useState } from 'react';
import {
  Database,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Cpu,
  RefreshCw,
  Search,
  ExternalLink,
  Layers,
  Brain,
  FileText
} from 'lucide-react';
import { ContentGenomeAsset, VerificationShieldTier } from '../../types/mindHiveV20';
import { ContentRegistrationForm } from './ContentRegistrationForm';

interface ContentGenomeSectionProps {
  assets: ContentGenomeAsset[];
  onRegisterAsset: (assetData: any) => Promise<void>;
  onDistributeToGlobalEngine: (assetId: string) => Promise<void>;
  onTriggerMultiply: (assetId: string) => void;
  onTriggerMining: (assetId: string) => void;
  onNavigateToRegister?: () => void;
}

export const ContentGenomeSection: React.FC<ContentGenomeSectionProps> = ({
  assets,
  onRegisterAsset,
  onDistributeToGlobalEngine,
  onTriggerMultiply,
  onTriggerMining
}) => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || asset.format === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  const getShieldBadge = (shield: VerificationShieldTier) => {
    switch (shield) {
      case 'academy_certified':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Academy Certified</span>
          </span>
        );
      case 'human_expert':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Human Expert</span>
          </span>
        );
      case 'institutional':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Institutional Research</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Synthetic Lab Data
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950 border border-zinc-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search content genome by title, author, domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-white outline-none focus:border-amber-400 w-64 sm:w-80"
            />
          </div>

          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">All Formats</option>
            <option value="ebook">eBooks &amp; Manuscripts</option>
            <option value="research_paper">Research Papers</option>
            <option value="video_course">Video Courses</option>
            <option value="dataset">Datasets</option>
            <option value="prompt_library">Prompt Libraries</option>
            <option value="code_repo">Code Repos</option>
          </select>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-mono font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Content Asset</span>
        </button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => {
          const isCopied = copiedHash === asset.contentHashSha256;
          const isDistributed = asset.aiTrainingPermissions.distributedToGlobalEngine;

          return (
            <div
              key={asset.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition relative group shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  {getShieldBadge(asset.verificationShield)}
                  <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {asset.format}
                  </span>
                </div>

                {/* Title & Author */}
                <div>
                  <h3 className="text-base font-heading font-black text-white line-clamp-2">
                    {asset.title}
                  </h3>
                  <p className="text-xs font-mono text-amber-300 mt-0.5">
                    By {asset.author}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-300 line-clamp-3 font-sans leading-relaxed">
                  {asset.summary}
                </p>

                {/* SHA-256 Provenance Fingerprint */}
                <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span>SHA-256 Content Fingerprint:</span>
                    <button
                      onClick={() => handleCopy(asset.contentHashSha256)}
                      className="text-zinc-400 hover:text-amber-400 transition"
                      title="Copy Hash"
                    >
                      {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="truncate text-zinc-400 select-all font-mono">
                    {asset.contentHashSha256}
                  </div>
                </div>

                {/* AI Permissions Strip */}
                <div className="space-y-1.5 font-mono text-[10px]">
                  <span className="text-zinc-500 block uppercase font-bold">AI Training Permissions:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        asset.aiTrainingPermissions.ragAllowed
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-900 text-zinc-600'
                      }`}
                    >
                      RAG Vector: {asset.aiTrainingPermissions.ragAllowed ? 'YES' : 'NO'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        asset.aiTrainingPermissions.fineTuningAllowed
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                          : 'bg-zinc-900 text-zinc-600'
                      }`}
                    >
                      LoRA / Fine-Tuning: {asset.aiTrainingPermissions.fineTuningAllowed ? 'YES' : 'NO'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded ${
                        asset.aiTrainingPermissions.preTrainingAllowed
                          ? 'bg-purple-950 text-purple-400 border border-purple-500/30'
                          : 'bg-zinc-900 text-zinc-600'
                      }`}
                    >
                      Pre-Training: {asset.aiTrainingPermissions.preTrainingAllowed ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>

                {/* Earnings & Commercial Valuation */}
                <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Total Gross Revenue</span>
                    <span className="font-bold text-white">${asset.metrics.totalGrossUsd.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-amber-400 block font-bold">Creator 70% Share</span>
                    <span className="font-bold text-amber-300">
                      ₦{asset.metrics.creatorEarningsNgn.toLocaleString()} NGN
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <button
                  onClick={() => onDistributeToGlobalEngine(asset.id)}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    isDistributed
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900/80'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-black shadow-lg shadow-amber-500/20'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>
                    {isDistributed
                      ? '✓ Distributed to Global AI Engine'
                      : 'DISTRIBUTE TO GLOBAL AI TRAINING ENGINE'}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <button
                    onClick={() => onTriggerMultiply(asset.id)}
                    className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Multiply (1→10)</span>
                  </button>

                  <button
                    onClick={() => onTriggerMining(asset.id)}
                    className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Brain className="w-3.5 h-3.5 text-[#00D4FF]" />
                    <span>Mine Q&amp;A</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Register Asset Modal with ContentRegistrationForm */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-5xl w-full max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl relative">
            <ContentRegistrationForm
              isModal={true}
              onClose={() => setShowRegisterModal(false)}
              onAssetRegistered={async (asset) => {
                if (onRegisterAsset) await onRegisterAsset(asset);
                setShowRegisterModal(false);
              }}
              onNavigateTab={(tab) => {
                setShowRegisterModal(false);
                if (onTriggerMultiply && tab === 'multiplier') onTriggerMultiply(assets[0]?.id || '');
                if (onTriggerMining && tab === 'mining') onTriggerMining(assets[0]?.id || '');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
