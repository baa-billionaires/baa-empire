import React, { useState, useEffect } from 'react';
import { INITIAL_TV_SHOWS, INITIAL_TV_CHANNELS } from '../lib/seed-tv';
import { Radio, Eye, MessageCircle, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export const TVLivePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [viewers, setViewers] = useState(1420);
  const [currentShowIdx, setCurrentShowIdx] = useState(0);

  const breakingNews = [
    "BREAKING NEWS: Student Chinedu earned ₦150k on Lagos WhatsApp sales agent bounty!",
    "GOVERNOR TELEMETRY: $1,000 daily GPU dividend distributed to 84 Learn-to-Own shareholders.",
    "ACADEMY UPDATE: New cohort of 100 courses unlocked with 10x BaaCoin Networth.",
    "PAN-AFRICA COMPUTE: Kainji Hydroelectric Data Center hits 99.999% uptime at 1.08 PUE."
  ];

  const [newsIdx, setNewsIdx] = useState(0);

  useEffect(() => {
    const vInterval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 9) - 4);
    }, 3000);

    const nInterval = setInterval(() => {
      setNewsIdx(prev => (prev + 1) % breakingNews.length);
    }, 7000);

    return () => {
      clearInterval(vInterval);
      clearInterval(nInterval);
    };
  }, [breakingNews.length]);

  const currentShow = INITIAL_TV_SHOWS[currentShowIdx % INITIAL_TV_SHOWS.length];

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Channels</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{viewers.toLocaleString()} Scholars Streaming Live</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Live Stream Screen */}
        <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-red-600/50 shadow-2xl shadow-red-600/10">
          <video
            src={currentShow.video_url}
            controls
            autoPlay
            loop
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>24/7 CONTINUOUS STREAM</span>
          </div>
        </div>

        {/* Breaking News Ticker */}
        <div className="bg-red-950/80 border border-red-500/50 rounded-2xl p-3 px-4 flex items-center gap-3 overflow-hidden shadow-lg">
          <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-black uppercase shrink-0">
            BREAKING
          </span>
          <div className="text-xs font-mono text-red-200 truncate">
            {breakingNews[newsIdx]}
          </div>
        </div>

        {/* Live Channel Details */}
        <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-heading font-black text-white">{currentShow.title}</h2>
            <p className="text-xs text-zinc-400 mt-1 font-mono">
              Host: AI Governor • Channel: BAA TV (Sovereign Network)
            </p>
          </div>

          <button
            onClick={() => setCurrentShowIdx(prev => prev + 1)}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition"
          >
            Switch to Next Stream Segment
          </button>
        </div>
      </div>
    </div>
  );
};
export default TVLivePage;
