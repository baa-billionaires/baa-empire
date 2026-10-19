import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { INITIAL_TV_CHANNELS } from '../lib/seed-tv';
import {
  Tv,
  Sparkles,
  Upload,
  Layers,
  ArrowLeft,
  CheckCircle,
  Play,
  Zap,
  Film,
  Coins
} from 'lucide-react';

export const TVStudioPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { profile, recordInteraction } = useEcosystem();

  const [mode, setMode] = useState<'ai' | 'upload' | 'hybrid'>('ai');
  const [topic, setTopic] = useState('How African Techies are Earning $10,000/Month Remotely with AI');
  const [channelId, setChannelId] = useState(INITIAL_TV_CHANNELS[0].id);
  const [showType, setShowType] = useState<'news' | 'education' | 'entertainment'>('education');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedSuccess(true);

      // Reward creator with +5 BaaCoin & +50 XP
      recordInteraction({
        courseId: 'tv-creation',
        type: 'research_submit',
        promptData: `CREATED AI TV SHOW: "${topic}" on channel ${channelId}`,
        customReward: { xp: 50, baacoin: 5 }
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AI TV Channels</span>
        </button>

        <div className="border-b border-zinc-800 pb-6">
          <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Tv className="w-4 h-4 text-[#00D4FF]" />
            AI TV Creator Studio
          </span>
          <h1 className="text-3xl font-heading font-black text-white mt-1">
            Produce &amp; Broadcast Your Own Show
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Choose from 3 production modes: Full Autonomous AI, Scholar Video Upload, or Hybrid Script Synthesis. Earn BaaCoin per viewer stream.
          </p>
        </div>

        {/* 3 Modes Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setMode('ai')}
            className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              mode === 'ai'
                ? 'bg-zinc-900 border-[#FFD700] shadow-lg shadow-[#FFD700]/10'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">1. AI Auto TV</h4>
              <span className="text-[10px] text-zinc-400 font-mono">100% Autonomous Generation</span>
            </div>
          </button>

          <button
            onClick={() => setMode('upload')}
            className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              mode === 'upload'
                ? 'bg-zinc-900 border-[#00D4FF] shadow-lg shadow-[#00D4FF]/10'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">2. Scholar Upload</h4>
              <span className="text-[10px] text-zinc-400 font-mono">Upload Finished Video File</span>
            </div>
          </button>

          <button
            onClick={() => setMode('hybrid')}
            className={`p-4 rounded-2xl border text-left transition flex items-center gap-3 ${
              mode === 'hybrid'
                ? 'bg-zinc-900 border-purple-500 shadow-lg shadow-purple-500/10'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">3. Hybrid Script</h4>
              <span className="text-[10px] text-zinc-400 font-mono">Your Script + AI Avatar Host</span>
            </div>
          </button>
        </div>

        {/* Creation Form */}
        <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-5 shadow-2xl">
          <form onSubmit={handleGenerate} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-zinc-400 uppercase mb-1">
                {mode === 'ai' ? 'Show Topic / Prompt Directive' : 'Episode Title'}
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Breaking news on sovereign AI compute..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Target Channel</label>
                <select
                  value={channelId}
                  onChange={(e) => setChannelId(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FFD700]"
                >
                  {INITIAL_TV_CHANNELS.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Content Category</label>
                <select
                  value={showType}
                  onChange={(e) => setShowType(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FFD700]"
                >
                  <option value="education">Education &amp; Code</option>
                  <option value="news">Breaking News &amp; Yields</option>
                  <option value="entertainment">Nollywood Drama</option>
                </select>
              </div>
            </div>

            {mode === 'upload' && (
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Video File URL (MP4 / WebM)</label>
                <input
                  type="url"
                  placeholder="https://commondatastorage.googleapis.com/.../video.mp4"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#00D4FF]"
                />
              </div>
            )}

            {mode === 'hybrid' && (
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Script Dialogue for AI Avatar Host</label>
                <textarea
                  rows={4}
                  placeholder="Enter script text for avatar to voice..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white outline-none focus:border-purple-400 resize-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>{isGenerating ? 'Synthesizing Avatar & Encoding Video...' : 'Publish to 24/7 TV Schedule (+5 BaaCoin)'}</span>
            </button>
          </form>

          {generatedSuccess && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1">
              <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-xs font-mono font-bold text-emerald-400">
                Show Scheduled on BAA TV Network!
              </div>
              <div className="text-[11px] text-zinc-300">
                +5 BaaCoin &amp; +50 XP credited to your profile. Viewers can now stream and tip your show.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TVStudioPage;
