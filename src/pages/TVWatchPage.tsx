import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { INITIAL_TV_SHOWS } from '../lib/seed-tv';
import {
  ArrowLeft,
  Heart,
  Share2,
  Coins,
  Copy,
  Check,
  Send,
  Sparkles,
  Bot,
  Radio,
  Eye,
  CheckCircle2
} from 'lucide-react';

interface TVWatchPageProps {
  showId: string;
  onBack: () => void;
  onCloneShow: (showTitle: string) => void;
}

export const TVWatchPage: React.FC<TVWatchPageProps> = ({ showId, onBack, onCloneShow }) => {
  const { wallet, recordInteraction } = useEcosystem();
  const show = INITIAL_TV_SHOWS.find(s => s.id === showId) || INITIAL_TV_SHOWS[0];

  const [likes, setLikes] = useState(show.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [tippedSuccess, setTippedSuccess] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Emeka L.', text: 'This explanation of GPU hydro clustering is mind-blowing 🔥' },
    { sender: 'Zainab B.', text: 'Notice how the BaaCoin networth integrates with the prompt?' },
    { sender: 'Kwame A.', text: 'Greetings from Accra! Proud of African autonomous tech.' }
  ]);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleTip = () => {
    setTippedSuccess(true);
    recordInteraction({
      courseId: 'tv-tip',
      type: 'assignment_complete',
      promptData: `Tipped 5 BaaCoin to creator of show: ${show.title}`,
      customReward: { xp: 10, baacoin: 1 }
    });
    setTimeout(() => setTippedSuccess(false), 2500);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { sender: 'You', text: chatInput.trim() }]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to AI TV Channels</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Video Stream Player (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
            <video
              src={show.video_url}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
            {show.status === 'live' && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse">
                <Radio className="w-3.5 h-3.5" />
                <span>LIVE BROADCAST</span>
              </div>
            )}
          </div>

          {/* Show Title & Interaction Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-black text-white">{show.title}</h1>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
                  <span>Creator: <strong className="text-white">{show.creator_name}</strong></span>
                  <span>•</span>
                  <span>{show.views.toLocaleString()} Views</span>
                  <span>•</span>
                  <span className="text-[#FFD700]">+{show.baacoin_earned} BaaCoin Earned</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition border ${
                    hasLiked
                      ? 'bg-red-950 text-red-400 border-red-500/50'
                      : 'bg-zinc-900 text-zinc-300 hover:text-white border-zinc-700'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-red-400' : ''}`} />
                  <span>{likes}</span>
                </button>

                <button
                  onClick={handleTip}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20"
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>{tippedSuccess ? 'Tipped 5 BaaCoin!' : 'Tip Creator 5 BaaCoin'}</span>
                </button>

                <button
                  onClick={() => onCloneShow(show.title)}
                  className="px-4 py-2 rounded-xl bg-[#00D4FF] hover:bg-cyan-400 text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>Clone Show</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
              {show.description}
            </p>
          </div>
        </div>

        {/* Live Audience Chat Stream (4 Cols) */}
        <div className="lg:col-span-4 bg-zinc-950 rounded-3xl border border-zinc-800 flex flex-col h-[560px] shadow-2xl overflow-hidden">
          <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-xs font-mono font-bold text-white">Live Audience Chat</h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">1,420 watching</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-sans">
            {chatMessages.map((m, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-[#00D4FF] block">{m.sender}</span>
                <p className="text-zinc-200">{m.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 border-t border-zinc-800 bg-zinc-900/60 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Chat live with African scholars..."
              className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#FFD700]"
            />
            <button
              type="submit"
              className="p-2 bg-[#FFD700] text-black rounded-xl hover:brightness-110 active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TVWatchPage;
