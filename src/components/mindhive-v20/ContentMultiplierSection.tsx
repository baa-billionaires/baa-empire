import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  BookOpen,
  FileText,
  PlaySquare,
  Headphones,
  Award,
  DollarSign,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ContentGenomeAsset, ContentDerivative, DerivativeType } from '../../types/mindHiveV20';

interface ContentMultiplierSectionProps {
  assets: ContentGenomeAsset[];
  derivatives: ContentDerivative[];
  onGenerateDerivative: (assetId: string, type: DerivativeType, title?: string) => Promise<void>;
}

export const ContentMultiplierSection: React.FC<ContentMultiplierSectionProps> = ({
  assets,
  derivatives,
  onGenerateDerivative
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [selectedType, setSelectedType] = useState<DerivativeType>('living_ebook');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activePreview, setActivePreview] = useState<ContentDerivative | null>(null);

  const derivativeTypes: Array<{
    type: DerivativeType;
    title: string;
    description: string;
    multiplierFactor: string;
    icon: any;
    recommendedPriceUsd: number;
  }> = [
    {
      type: 'living_ebook',
      title: 'Living eBook Studio',
      description: 'Dynamic publication with embedded conversational AI tutor and real-time interactive evaluation inside every chapter.',
      multiplierFactor: '1 Manuscript → 1 Dynamic App Publication',
      icon: BookOpen,
      recommendedPriceUsd: 95
    },
    {
      type: 'article_series',
      title: '10-Part Master Technical Series',
      description: 'Ten syndication-ready long-form whitepapers formatted for Substack, Medium, and technical press.',
      multiplierFactor: '1 Manuscript → 10 Syndicated Articles',
      icon: FileText,
      recommendedPriceUsd: 250
    },
    {
      type: 'modular_course',
      title: '6-Module Video Course Factory',
      description: 'Full lecture curriculum with slide decks, terminal guides, quizzes, and NFT certification criteria.',
      multiplierFactor: '1 Manuscript → 6 Video Lecture Units',
      icon: PlaySquare,
      recommendedPriceUsd: 299
    },
    {
      type: 'podcast_audio',
      title: 'Executive Audio Digest & Podcast',
      description: 'Eight 15-minute studio-grade audio synthesis episodes with synchronized transcriptions for executive listening.',
      multiplierFactor: '1 Manuscript → 8 Audio Podcast Episodes',
      icon: Headphones,
      recommendedPriceUsd: 79
    },
    {
      type: 'battlecard_memo',
      title: 'Decision-Maker Strategy Battlecard',
      description: 'High-density one-page architectural memorandum with trade-offs, financial models, and strategic takeaways.',
      multiplierFactor: '1 Manuscript → 1 C-Suite Decision Memo',
      icon: Award,
      recommendedPriceUsd: 150
    }
  ];

  const handleMultiply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId) {
      alert('Please select a parent asset to multiply.');
      return;
    }

    setIsGenerating(true);
    try {
      await onGenerateDerivative(selectedAssetId, selectedType, customTitle || undefined);
      setCustomTitle('');
    } catch (err) {
      console.error(err);
      alert('Multiplication failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  return (
    <div className="space-y-8">
      {/* Factory Generator Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                CONTENT MULTIPLICATION ECONOMY
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Autonomous Derivative Synthesis &amp; Living eBook Studio
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              "Create Once. Multiply Knowledge into 10+ Commercial Products."
            </p>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-zinc-500 block">Total Derivatives Minted:</span>
            <span className="text-xl font-bold text-[#00FF88]">{derivatives.length} Products</span>
          </div>
        </div>

        <form onSubmit={handleMultiply} className="space-y-6">
          {/* Step 1: Select Parent Manuscript */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
              1. Choose Registered Parent Asset:
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-amber-400 cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} ({a.format} · By {a.author} · {a.wordCount.toLocaleString()} words)
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Choose Multiplication Target */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
              2. Select Multiplication Target Format:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {derivativeTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedType === item.type;
                return (
                  <div
                    key={item.type}
                    onClick={() => setSelectedType(item.type)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-900 border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2 rounded-xl ${
                            isSelected ? 'bg-amber-400 text-black' : 'bg-zinc-900 text-amber-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                          ${item.recommendedPriceUsd} USD
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs">{item.title}</h4>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-zinc-800/80 text-[10px] font-mono text-amber-400/80">
                      {item.multiplierFactor}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Custom Title (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
              3. Custom Product Title (Optional):
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Leave blank for automatic agent generation"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-amber-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-widest transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Autonomous Swarm Synthesizing Derivative...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  Synthesize {derivativeTypes.find((d) => d.type === selectedType)?.title} Now
                </span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Catalog of Multiplied Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>Commercial Derivatives Catalog</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            {derivatives.length} Active Multiplied Products
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {derivatives.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {item.derivativeType.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Parent: {item.parentAssetTitle}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-sans">{item.title}</h4>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Commercial Price:</span>
                  <span className="text-sm font-bold text-white">
                    ${item.salesPriceUsd} USD{' '}
                    <span className="text-[11px] text-zinc-400">
                      (₦{item.salesPriceNgn.toLocaleString()} NGN)
                    </span>
                  </span>
                </div>

                <button
                  onClick={() => setActivePreview(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/40 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Interactive Preview</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Preview Modal */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-heading font-black text-white">
                  Living Product Preview
                </h3>
              </div>
              <button
                onClick={() => setActivePreview(null)}
                className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase block">Product Title</span>
                <span className="text-sm font-bold text-white font-sans">{activePreview.title}</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#040d16] border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-cyan-400 font-bold text-[11px]">
                  <span>Embedded In-Text AI Tutor &amp; Interactive Blocks</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[9px]">ACTIVE</span>
                </div>
                <p className="text-zinc-300 text-xs font-sans leading-relaxed">
                  {activePreview.contentPayload}
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-[11px] text-emerald-400">
                  &gt; [AI Tutor]: "Welcome to this living curriculum module. You can query any equation or architectural diagram directly in this terminal interface. Try asking: 'Explain the thermodynamic cooling equations'."
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-400">Published License Terms:</span>
                <span className="text-amber-300 font-bold">
                  70% Creator Share · 30% Infrastructure
                </span>
              </div>

              <button
                onClick={() => {
                  alert(`Licensed! Product link generated for: ${activePreview.title}`);
                  setActivePreview(null);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold uppercase tracking-wider hover:brightness-110 transition cursor-pointer"
              >
                Deploy Commercial Edition to Store (${activePreview.salesPriceUsd} USD)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
