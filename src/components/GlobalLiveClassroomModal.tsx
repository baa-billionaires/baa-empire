import React, { useState, useEffect } from 'react';
import { useAmbience } from '../context/AmbienceContext';
import { useEcosystem } from '../context/EcosystemContext';
import {
  X,
  Tv,
  Globe2,
  Users,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Maximize2,
  Minimize2,
  Sparkles,
  MessageSquare,
  Coins,
  Send,
  Radio,
  Share2,
  Award,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bot,
  UserCheck
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './LanguageChip';
import { MULTILINGUAL_TUTOR_SCRIPTS } from '../lib/autonomousData';

export const GlobalLiveClassroomModal: React.FC = () => {
  const { isLiveClassOpen, closeLiveClass, primaryAccent } = useAmbience();
  const { profile, language, setLanguage, baacoinPrice } = useEcosystem();

  const [screenMode, setScreenMode] = useState<'dual' | 'human' | 'ai'>('dual');
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSpeechText, setActiveSpeechText] = useState<string>('');
  const [chatMessage, setChatMessage] = useState<string>('');

  // Live class student interaction ledger
  const [liveQuestions, setLiveQuestions] = useState<
    { id: string; student: string; city: string; question: string; synthesizedPrompt?: string; rewardBaa: number }[]
  >([
    {
      id: 'q-1',
      student: 'Kofi Mensah',
      city: 'Accra, Ghana',
      question: 'How do we connect local cocoa cooperative sensor feeds to our Base L2 smart contract escrow?',
      synthesizedPrompt: 'Autonomous Agro-Commodity IoT Smart Contract Escrow Compiler',
      rewardBaa: 120
    },
    {
      id: 'q-2',
      student: 'Amina Bello',
      city: 'Kano, Nigeria',
      question: 'Can the UADC mobile mesh run decentralized quantized DeepSeek-R1 inference overnight?',
      synthesizedPrompt: 'Mobile Thermal-Managed Quantized Node Inference Pipeline',
      rewardBaa: 95
    }
  ]);

  // Dynamic live transcription based on active language
  useEffect(() => {
    const scripts = MULTILINGUAL_TUTOR_SCRIPTS[language] || MULTILINGUAL_TUTOR_SCRIPTS['en'];
    const sentences = [
      scripts.welcome,
      scripts.s2e_explanation,
      scripts.money_engine,
      scripts.trainer_guidance
    ];

    let index = 0;
    setActiveSpeechText(sentences[0]);

    const interval = setInterval(() => {
      index = (index + 1) % sentences.length;
      setActiveSpeechText(sentences[index]);
    }, 7000);

    return () => clearInterval(interval);
  }, [language]);

  if (!isLiveClassOpen) return null;

  const handleSendLiveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newQ = {
      id: `q-${Date.now()}`,
      student: profile.full_name || 'Autonomous Scholar',
      city: 'Port Harcourt Hub',
      question: chatMessage.trim(),
      synthesizedPrompt: `AI Agent Module: ${chatMessage.slice(0, 40)}...`,
      rewardBaa: 50
    };

    setLiveQuestions([newQ, ...liveQuestions]);
    setChatMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto p-3 sm:p-6 font-mono text-xs">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800 gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/50 text-red-400 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>GLOBAL LIVE CLASSROOM &bull; BIG SCREEN AUDITORIUM</span>
          </div>

          <span className="text-zinc-500 hidden md:inline">|</span>

          <span className="text-white font-heading font-black text-sm hidden md:inline">
            Billionaires AI Academy &amp; Africa Blockchain University
          </span>
        </div>

        {/* Controls: Language, Screen Layout, Cinema & Close */}
        <div className="flex items-center gap-2">
          {/* Multi-Lingual Switcher */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFD700]"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} ({lang.native})
                </option>
              ))}
            </select>
          </div>

          {/* Screen Layout Switcher */}
          <div className="hidden sm:flex p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
            <button
              onClick={() => setScreenMode('dual')}
              className={`px-2.5 py-1 rounded-lg transition ${
                screenMode === 'dual' ? 'bg-[#FFD700] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dual Stage
            </button>
            <button
              onClick={() => setScreenMode('human')}
              className={`px-2.5 py-1 rounded-lg transition ${
                screenMode === 'human' ? 'bg-[#00D4FF] text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dean Stage
            </button>
            <button
              onClick={() => setScreenMode('ai')}
              className={`px-2.5 py-1 rounded-lg transition ${
                screenMode === 'ai' ? 'bg-purple-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              AI Tutor Stage
            </button>
          </div>

          <button
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition"
            title="Toggle Cinema Mode"
          >
            {isCinemaMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={closeLiveClass}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Big Screen Theater Area */}
      <div className="my-4 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
        {/* Left/Center: Cinema Screens (Human Faculty + AI Tutor) */}
        <div className={`space-y-4 flex flex-col justify-between ${isCinemaMode ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {/* SCREEN 1: HUMAN FACULTY DEAN BIG SCREEN */}
            {(screenMode === 'dual' || screenMode === 'human') && (
              <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between shadow-2xl group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                  alt="Dr. Chukwuma Sterling"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

                {/* Top Overlay Badge */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#FFD700]/40 text-[#FFD700] text-[10px] font-bold">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>HUMAN DEAN: Dr. Chukwuma Sterling</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">
                    4K LIVE FEED
                  </span>
                </div>

                {/* Bottom Speaker Info */}
                <div className="relative z-10 p-4 space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                    TOPIC: SOVEREIGN AGENT COMMERCE &amp; EVM MONETIZATION
                  </span>
                  <div className="text-white font-bold text-sm">
                    "Every prompt compiled in this room earns its creator 60% marketplace royalties for life."
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 2: MULTI-LINGUAL AI TUTOR NEURAL SCREEN */}
            {(screenMode === 'dual' || screenMode === 'ai') && (
              <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between shadow-2xl group min-h-[300px]">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
                  alt="Autonomous AI Neural Core"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

                {/* Top Overlay Badge */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00D4FF]/40 text-[#00D4FF] text-[10px] font-bold">
                    <Bot className="w-3.5 h-3.5" />
                    <span>AUTONOMOUS AI TUTOR (9 LANGUAGES)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[9px] font-bold">
                    NEURAL AGENT
                  </span>
                </div>

                {/* Bottom Speaker Info */}
                <div className="relative z-10 p-4 space-y-1">
                  <span className="text-[10px] text-[#00D4FF] uppercase tracking-wider block">
                    REAL-TIME NEURAL TRANSLATION: {language.toUpperCase()}
                  </span>
                  <div className="text-zinc-200 font-bold text-xs line-clamp-2">
                    {activeSpeechText}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Subtitle & Live Audio Stream Bar */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 text-[#FFD700] font-bold">
                <Volume2 className="w-3.5 h-3.5" />
                <span>AI TRANSCRIPTION &amp; LIVE SUBTITLES ({language.toUpperCase()}):</span>
              </span>
              <span className="text-zinc-500">Latency: 28ms via Base L2 Relay</span>
            </div>

            <div className="p-3 rounded-xl bg-black border border-zinc-800/80 text-white font-sans text-xs sm:text-sm leading-relaxed">
              "{activeSpeechText}"
            </div>
          </div>
        </div>

        {/* Right: Live Prompt Synthesis Board & Student Participants */}
        {!isCinemaMode && (
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            {/* Live Questions & Prompt Synthesis */}
            <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 flex-1 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FFD700]" />
                    <span className="font-bold text-white text-xs">LIVE PROMPT SYNTHESIS</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">
                    +60% Student Share
                  </span>
                </div>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {liveQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-white font-bold">{q.student}</span>
                        <span className="text-zinc-500">{q.city}</span>
                      </div>
                      <p className="text-zinc-300 text-xs font-sans">"{q.question}"</p>
                      {q.synthesizedPrompt && (
                        <div className="p-2 rounded-lg bg-black/60 border border-[#FFD700]/30 text-[10px] text-[#FFD700] flex items-center justify-between">
                          <span className="truncate pr-2">Module: {q.synthesizedPrompt}</span>
                          <span className="text-emerald-400 font-bold shrink-0">+{q.rewardBaa} BAA</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat / Question Input */}
              <form onSubmit={handleSendLiveQuestion} className="pt-3 border-t border-zinc-900 flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask human Dean or AI Tutor..."
                  className="flex-1 px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#FFE234] text-black font-bold shrink-0 flex items-center gap-1 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask</span>
                </button>
              </form>
            </div>

            {/* Live African Student Matrix */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span className="font-bold uppercase text-white">LIVE CONNECTED HUBS:</span>
                <span className="text-emerald-400 font-bold">● 2,418 Active Scholars</span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {['Lagos', 'Nairobi', 'Accra', 'Port Harcourt', 'Cairo', 'Johannesburg', 'Kigali'].map((city) => (
                  <span
                    key={city}
                    className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar: Action & Return */}
      <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 shrink-0">
        <div className="flex items-center gap-2">
          <span>Current BaaCoin Valuation:</span>
          <span className="text-[#FFD700] font-bold">${(baacoinPrice || 1.0).toFixed(2)} USD</span>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">100% Backed by Real-World Tuition Escrow</span>
        </div>

        <button
          onClick={closeLiveClass}
          className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition"
        >
          Exit Theater
        </button>
      </div>
    </div>
  );
};

export default GlobalLiveClassroomModal;
