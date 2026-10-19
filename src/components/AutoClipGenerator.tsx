import React, { useState } from 'react';
import { Film, Scissors, Sparkles, Check, Download, Share2, Play } from 'lucide-react';

interface AutoClipGeneratorProps {
  sourceTitle: string;
  sourceVideoUrl?: string;
}

export const AutoClipGenerator: React.FC<AutoClipGeneratorProps> = ({
  sourceTitle,
  sourceVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
}) => {
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [hookText, setHookText] = useState('How I Made ₦150k in 48 Hours with AI');
  const [isRendering, setIsRendering] = useState(false);
  const [renderedClip, setRenderedClip] = useState(false);

  const handleRenderClip = () => {
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
      setRenderedClip(true);
    }, 1200);
  };

  return (
    <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-mono text-[#00D4FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Scissors className="w-4 h-4 text-[#00D4FF]" />
            Viral AI Clip Generator
          </span>
          <h3 className="text-lg font-heading font-black text-white mt-1">
            Auto-Cut 30-Second Shorts from: {sourceTitle}
          </h3>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono">
          {(['9:16', '1:1', '16:9'] as const).map(ratio => (
            <button
              key={ratio}
              onClick={() => setAspectRatio(ratio)}
              className={`px-3 py-1 rounded-lg transition ${
                aspectRatio === ratio
                  ? 'bg-[#00D4FF] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Preview Frame */}
        <div className="md:col-span-5 flex justify-center">
          <div
            className={`relative rounded-2xl overflow-hidden bg-black border-2 border-[#00D4FF]/40 shadow-xl flex items-center justify-center ${
              aspectRatio === '9:16'
                ? 'w-48 aspect-[9/16]'
                : aspectRatio === '1:1'
                ? 'w-56 aspect-square'
                : 'w-full aspect-video'
            }`}
          >
            <video
              src={sourceVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Top Hook Overlay */}
            <div className="absolute top-4 inset-x-2 bg-black/85 backdrop-blur-sm p-2 rounded-xl text-center border border-[#FFD700]/50 shadow-lg">
              <span className="text-[10px] font-heading font-black text-[#FFD700] uppercase tracking-wide block">
                {hookText}
              </span>
            </div>

            {/* Watermark Logo */}
            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-300 border border-cyan-800">
              ⚡ Billionaires AI
            </div>
          </div>
        </div>

        {/* Settings & Render Form */}
        <div className="md:col-span-7 space-y-4 font-mono text-xs">
          <div>
            <label className="block text-zinc-400 uppercase mb-1">Viral Top Hook Caption</label>
            <input
              type="text"
              value={hookText}
              onChange={(e) => setHookText(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
            />
          </div>

          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1 text-zinc-400 text-[11px]">
            <div>• Dynamic Word-by-Word Subtitles: <strong className="text-emerald-400">Enabled</strong></div>
            <div>• Auto Royalty CTA Watermark: <strong className="text-[#FFD700]">Attached</strong></div>
            <div>• Target Platforms: <strong>TikTok, Instagram Reels, YouTube Shorts</strong></div>
          </div>

          <button
            onClick={handleRenderClip}
            disabled={isRendering}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>{isRendering ? 'Rendering 9:16 Viral Short...' : 'Render & Auto-Syndicate Clip'}</span>
          </button>

          {renderedClip && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Clip rendered &amp; scheduled across TikTok and Reels!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AutoClipGenerator;
