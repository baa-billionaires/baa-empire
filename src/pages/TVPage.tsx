import React, { useState } from 'react';
import { INITIAL_TV_CHANNELS, INITIAL_TV_SHOWS, INITIAL_TV_SCHEDULE, TVShow, TVChannel } from '../lib/seed-tv';
import {
  Tv,
  Play,
  Radio,
  Eye,
  Heart,
  Sparkles,
  Plus,
  Coins,
  Clock,
  Flame,
  ArrowRight
} from 'lucide-react';

interface TVPageProps {
  onWatchShow: (showId: string) => void;
  onOpenLive: () => void;
  onOpenStudio: () => void;
}

export const TVPage: React.FC<TVPageProps> = ({ onWatchShow, onOpenLive, onOpenStudio }) => {
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [channels] = useState<TVChannel[]>(INITIAL_TV_CHANNELS);
  const [shows] = useState<TVShow[]>(INITIAL_TV_SHOWS);
  const [liveViewers] = useState<number>(1420);

  const heroShow = shows[0];

  const filteredShows = selectedChannel === 'all'
    ? shows
    : shows.filter(s => s.channel_id === selectedChannel);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Banner Navigation & Live Controls */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>AI TV NETWORK</span>
              <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-mono uppercase font-bold flex items-center gap-1 animate-pulse">
                <Radio className="w-3 h-3" /> LIVE 24/7
              </span>
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Human + AI Autonomous Broadcast • 5 Channels • Earn BaaCoin per View
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenLive}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Radio className="w-4 h-4 animate-spin-slow" />
            <span>24/7 Live Stream ({liveViewers} Viewers)</span>
          </button>

          <button
            onClick={onOpenStudio}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-mono flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4 text-[#FFD700]" />
            <span>Create AI Show</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Netflix-Style Hero Live Feature */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] min-h-[340px] bg-zinc-900 border border-zinc-800 shadow-2xl flex items-end">
          <img
            src={heroShow.thumbnail_url}
            alt={heroShow.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="relative p-6 sm:p-10 max-w-2xl space-y-3 z-10">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] uppercase flex items-center gap-1">
                <Radio className="w-3 h-3" /> Live Feature
              </span>
              <span className="text-[#00D4FF] font-bold">BAA TV SOVEREIGN BROADCAST</span>
              <span className="text-zinc-400">• {heroShow.views.toLocaleString()} watching</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white leading-tight">
              {heroShow.title}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans line-clamp-2">
              {heroShow.description}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onWatchShow(heroShow.id)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/25 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Watch Broadcast Now</span>
              </button>

              <button
                onClick={onOpenLive}
                className="px-5 py-3 rounded-xl bg-zinc-900/80 border border-zinc-700 text-white text-xs font-mono hover:bg-zinc-800 transition"
              >
                Open Multi-Stream
              </button>
            </div>
          </div>
        </div>

        {/* Channels Horizontal Row */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white font-heading">Sovereign TV Channels</h3>
            <span className="text-xs font-mono text-zinc-400">Select channel to filter</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <button
              onClick={() => setSelectedChannel('all')}
              className={`p-4 rounded-2xl border text-left transition ${
                selectedChannel === 'all'
                  ? 'bg-zinc-900 border-[#FFD700] shadow-lg shadow-[#FFD700]/10'
                  : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] mb-2">
                <Tv className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white font-mono">All Channels</h4>
              <span className="text-[10px] text-zinc-500 font-mono">5 Networks Combined</span>
            </button>

            {channels.map(chan => (
              <button
                key={chan.id}
                onClick={() => setSelectedChannel(chan.id)}
                className={`p-4 rounded-2xl border text-left transition relative overflow-hidden ${
                  selectedChannel === chan.id
                    ? 'bg-zinc-900 border-[#00D4FF] shadow-lg shadow-[#00D4FF]/10'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {chan.is_live && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-red-600 text-[8px] font-mono text-white font-bold">
                    LIVE
                  </span>
                )}
                <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] mb-2">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white font-mono truncate">{chan.name}</h4>
                <span className="text-[10px] text-zinc-400 font-mono">{chan.viewers} viewers</span>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Now / Next Bar */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#FFD700]">
            <Clock className="w-4 h-4" />
            <span className="font-bold">LIVE BROADCAST SCHEDULE:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-zinc-300">
            {INITIAL_TV_SCHEDULE.slice(0, 3).map(item => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span className="text-zinc-500">{item.time_slot}:</span>
                <span className="text-white font-medium">{item.show_title}</span>
                {item.is_ai_hosted && (
                  <span className="text-[9px] bg-[#00D4FF]/20 text-[#00D4FF] px-1 rounded">AI Host</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Shows Catalog Grid */}
        <div>
          <h3 className="text-lg font-bold text-white font-heading mb-4">Trending Shows &amp; Episodes</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShows.map(show => (
              <div
                key={show.id}
                onClick={() => onWatchShow(show.id)}
                className="group bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#FFD700]/50 overflow-hidden cursor-pointer transition shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                  <img
                    src={show.thumbnail_url}
                    alt={show.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-zinc-700 text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                    {show.ai_generated ? <Sparkles className="w-3 h-3 text-[#FFD700]" /> : null}
                    <span>{show.ai_generated ? 'AI Generated' : 'Scholar Produced'}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded font-mono text-[10px] text-white">
                    {show.duration_minutes} mins
                  </div>

                  {show.status === 'live' && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full font-mono text-[9px] font-bold animate-pulse">
                      LIVE
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-heading font-bold text-white text-base leading-snug group-hover:text-[#FFD700] transition">
                      {show.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {show.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="truncate max-w-[150px]">{show.creator_name}</span>
                    <span className="flex items-center gap-1 text-[#FFD700]">
                      <Coins className="w-3.5 h-3.5" /> +{show.baacoin_earned} BaaCoin
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVPage;
