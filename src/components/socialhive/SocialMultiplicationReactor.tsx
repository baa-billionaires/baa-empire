import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  BookOpen,
  PlaySquare,
  Headphones,
  FileText,
  FileCode,
  DollarSign,
  Coins,
  RefreshCw,
  Award
} from 'lucide-react';
import { SocialAssetGenome, SocialDerivative, SocialDerivativeFormat } from '../../types/socialHive';

interface SocialMultiplicationReactorProps {
  assets: SocialAssetGenome[];
  derivatives: SocialDerivative[];
  onMultiplyAsset: (assetId: string, format: SocialDerivativeFormat, title?: string) => Promise<void>;
}

export const SocialMultiplicationReactor: React.FC<SocialMultiplicationReactorProps> = ({
  assets,
  derivatives,
  onMultiplyAsset
}) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [selectedFormat, setSelectedFormat] = useState<SocialDerivativeFormat>('ebook');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);

  const formats: Array<{
    format: SocialDerivativeFormat;
    label: string;
    description: string;
    defaultPriceUsd: number;
    icon: any;
  }> = [
    {
      format: 'ebook',
      label: 'Living Interactive eBook',
      description: 'HTML5 digital publication with embedded in-text conversational AI tutor and exercises.',
      defaultPriceUsd: 79,
      icon: BookOpen
    },
    {
      format: 'course',
      label: '5-Module Video Course',
      description: 'Structured video curriculum with slide decks, quizzes, and NFT certification criteria.',
      defaultPriceUsd: 149,
      icon: PlaySquare
    },
    {
      format: 'podcast',
      label: 'Executive Audio Digest',
      description: 'Studio-grade audio synthesis lecture with synchronized transcriptions.',
      defaultPriceUsd: 39,
      icon: Headphones
    },
    {
      format: 'qa_instruction_dataset',
      label: 'AI Fine-Tuning Dataset (.jsonl)',
      description: 'Multi-turn Q&A instruction dataset for Llama-3 and OpenAI fine-tuning.',
      defaultPriceUsd: 850,
      icon: FileCode
    },
    {
      format: 'article',
      label: 'Technical Whitepaper Series',
      description: 'Syndication-ready technical essay with verified diagrams and citations.',
      defaultPriceUsd: 45,
      icon: FileText
    },
    {
      format: 'presentation_slides',
      label: 'Executive Presentation Deck',
      description: '20-slide visual keynote deck for C-level briefings and investor meetings.',
      defaultPriceUsd: 95,
      icon: Award
    }
  ];

  const handleSynthesize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId) return;

    setIsSynthesizing(true);
    try {
      await onMultiplyAsset(selectedAssetId, selectedFormat, customTitle || undefined);
      setCustomTitle('');
    } catch (err: any) {
      alert(err.message || 'Synthesis failed');
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Multiplier Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Layers className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40">
                SOCIAL MULTIPLICATION REACTOR
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Multiply 1 Social Video $\rightarrow$ 14 Commercial Products
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Maintains full creator attribution, source URL provenance, and 70/30 creator royalty terms.
            </p>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-zinc-500 block">Total Synthesized Products:</span>
            <span className="text-xl font-bold text-[#00FF88]">{derivatives.length} Products</span>
          </div>
        </div>

        <form onSubmit={handleSynthesize} className="space-y-6">
          {/* Step 1: Select Social Asset */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
              1. Choose Parent Social Asset:
            </label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-cyan-400 cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.id} — {a.title} ({a.platform.toUpperCase()} · By {a.creatorName})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Select Format */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
              2. Select Multiplication Target Format:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {formats.map((f) => {
                const Icon = f.icon;
                const isSelected = selectedFormat === f.format;

                return (
                  <div
                    key={f.format}
                    onClick={() => setSelectedFormat(f.format)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-900 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-400 text-black' : 'bg-zinc-900 text-cyan-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400">
                          ${f.defaultPriceUsd} USD
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs">{f.label}</h4>
                      <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Custom Title */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-zinc-400 uppercase font-bold block">
              3. Custom Product Title (Optional):
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Leave blank for automatic generation"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            disabled={isSynthesizing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-widest transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSynthesizing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Multiplication Reactor Synthesizing Commercial Units...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Trigger Multiplication Reactor Now</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Catalog of Multiplied Products */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Commercial Social Derivatives ({derivatives.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            Published to Empire Marketplace
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
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {item.derivativeFormat.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-zinc-500 truncate max-w-[200px]">
                    Creator: {item.creatorAttribution}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-sans">{item.title}</h4>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Retail Price:</span>
                  <span className="text-sm font-bold text-white">
                    ${item.priceUsd} USD{' '}
                    <span className="text-[11px] text-zinc-400">
                      (₦{item.priceNgn.toLocaleString()} NGN)
                    </span>
                  </span>
                </div>

                <span className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-emerald-400 font-bold">
                  70% Creator Share
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
