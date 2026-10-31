import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Zap,
  Coins,
  Cpu,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Pause,
  RefreshCw,
  Award,
  Terminal,
  ShieldCheck,
  Flame,
  ArrowRight,
  Database,
  Sliders,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEcosystem } from '../context/EcosystemContext';

interface LearnToMineWidgetProps {
  onNavigateToCourse?: (courseId: string) => void;
  onNavigateToAcademy?: () => void;
  onNavigateToWallet?: () => void;
  className?: string;
}

export const LearnToMineWidget: React.FC<LearnToMineWidgetProps> = ({
  onNavigateToCourse,
  onNavigateToAcademy,
  onNavigateToWallet,
  className = ''
}) => {
  const {
    profile,
    wallet,
    courses,
    enrollments,
    recordInteraction,
    latestMiningBlock,
    baacoinPrice
  } = useEcosystem();

  // Active Session Mining State
  const [isMiningActive, setIsMiningActive] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<'reading' | 'video' | 'prompt_lab' | 'capstone'>('prompt_lab');
  
  // Real-time accumulating tokens in current session
  const [accumulatedSessionTokens, setAccumulatedSessionTokens] = useState<number>(() => {
    try {
      const saved = sessionStorage.getItem('baa_session_accumulated');
      return saved ? parseFloat(saved) : 0.0450;
    } catch {
      return 0.0450;
    }
  });

  // Active Session Dwell Time (Seconds)
  const [sessionSeconds, setSessionSeconds] = useState<number>(142);
  const [hashrate, setHashrate] = useState<number>(48.6);
  const [currentNonce, setCurrentNonce] = useState<number>(419203);
  const [claimedNotice, setClaimedNotice] = useState<string | null>(null);
  const [miningBlocksHistory, setMiningBlocksHistory] = useState<Array<{
    hash: string;
    reward: number;
    activity: string;
    timestamp: string;
  }>>([
    {
      hash: '0x8f2a...90bc',
      reward: 1.5,
      activity: 'AI Tutor Neural Test',
      timestamp: '2 mins ago'
    },
    {
      hash: '0x3c11...44aa',
      reward: 0.5,
      activity: 'Video Lecture Stream',
      timestamp: '6 mins ago'
    },
    {
      hash: '0x99dd...01ef',
      reward: 2.0,
      activity: 'Manuscript Reading Proof',
      timestamp: '14 mins ago'
    }
  ]);

  // Mode Multipliers
  const modeConfig = useMemo(() => {
    switch (activeMode) {
      case 'reading':
        return { label: 'Reading & Research', multiplier: 1.0, ratePerSec: 0.00012, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
      case 'video':
        return { label: 'Video Lecture Study', multiplier: 1.5, ratePerSec: 0.00018, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' };
      case 'prompt_lab':
        return { label: 'AI Tutor Prompt Lab', multiplier: 2.5, ratePerSec: 0.00030, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' };
      case 'capstone':
        return { label: 'Capstone Architecture', multiplier: 4.0, ratePerSec: 0.00048, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10 border-[#FFD700]/30' };
    }
  }, [activeMode]);

  // Real-time Accumulator Clock: increments accumulated tokens every 500ms when active
  useEffect(() => {
    if (!isMiningActive) return;

    const interval = setInterval(() => {
      // Small jitter for realistic PoW-Learn hashrate
      setHashrate(prev => +(prev + (Math.random() * 1.6 - 0.8)).toFixed(2));
      setCurrentNonce(prev => prev + Math.floor(Math.random() * 24) + 1);

      // Increment dwell time and token accumulator
      setSessionSeconds(prev => prev + 1);
      setAccumulatedSessionTokens(prev => {
        const increment = modeConfig.ratePerSec * (1 + (profile.level * 0.05));
        const next = +(prev + increment).toFixed(5);
        try {
          sessionStorage.setItem('baa_session_accumulated', next.toString());
        } catch {
          // ignore
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isMiningActive, modeConfig, profile.level]);

  // Format HH:MM:SS
  const formattedDwellTime = useMemo(() => {
    const hrs = Math.floor(sessionSeconds / 3600);
    const mins = Math.floor((sessionSeconds % 3600) / 60);
    const secs = sessionSeconds % 60;
    return `${hrs > 0 ? `${hrs}h ` : ''}${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  }, [sessionSeconds]);

  // Claim accumulated tokens to liquid wallet
  const handleClaimTokens = () => {
    if (accumulatedSessionTokens <= 0) return;

    const claimedAmount = parseFloat(accumulatedSessionTokens.toFixed(3));
    const activeCourseId = enrollments.length > 0 ? enrollments[0].course_id : (courses[0]?.id || 'course-1');

    // Commit interaction to ecosystem context
    const res = recordInteraction({
      courseId: activeCourseId,
      type: 'research_submit',
      customReward: {
        xp: Math.floor(claimedAmount * 25),
        baacoin: claimedAmount
      },
      promptData: `Learn-to-Mine verified proof of study for ${formattedDwellTime} in ${modeConfig.label}`
    });

    // Add to local visual mining blocks
    setMiningBlocksHistory(prev => [
      {
        hash: res.block.hash,
        reward: claimedAmount,
        activity: modeConfig.label,
        timestamp: 'Just now'
      },
      ...prev.slice(0, 4)
    ]);

    // Reset session tokens
    setAccumulatedSessionTokens(0.0000);
    try {
      sessionStorage.setItem('baa_session_accumulated', '0');
    } catch {
      // ignore
    }

    // Confetti celebration
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#00D4FF', '#00FF88']
      });
    } catch {
      // ignore
    }

    setClaimedNotice(`+${claimedAmount.toFixed(3)} BaaCoin ($${(claimedAmount * (baacoinPrice || 1.0)).toFixed(2)} USD) credited directly to your Spendable Wallet!`);
    setTimeout(() => setClaimedNotice(null), 5000);
  };

  // Instant Interactive Boost Triggers
  const handleInteractiveBoost = (boostType: 'tutor' | 'prompt' | 'code' | 'node', boostReward: number) => {
    setAccumulatedSessionTokens(prev => +(prev + boostReward).toFixed(5));
    
    // Quick Hashrate spike animation
    setHashrate(prev => +(prev + 12.5).toFixed(1));
    setTimeout(() => setHashrate(prev => +(prev - 12.5).toFixed(1)), 1500);

    const labels = {
      tutor: 'AI Tutor Query Executed',
      prompt: 'Prompt Test Benchmark Complete',
      code: 'Smart Contract Fuzz Tested',
      node: 'Background Sleeping Validator Tick'
    };

    setClaimedNotice(`⚡ Instant Mining Boost: +${boostReward.toFixed(2)} BAA mined from ${labels[boostType]}!`);
    setTimeout(() => setClaimedNotice(null), 3500);
  };

  return (
    <div className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-zinc-950 border-2 border-[#FFD700]/50 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Background ambient gold & cyan glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* TOP HEADER: STATUS & PULSE */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/15 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700] shadow-lg shadow-[#FFD700]/20 relative">
            <Coins className={`w-6 h-6 ${isMiningActive ? 'animate-spin-slow' : ''}`} />
            {isMiningActive && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-heading font-black text-white tracking-wide">
                Learn-to-Mine BaaCoin™
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 text-[10px] font-mono font-bold text-[#FFD700]">
                PoW-LEARN L2
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-2">
              <span>Status: <strong className={isMiningActive ? 'text-emerald-400' : 'text-zinc-500'}>{isMiningActive ? 'MINING LIVE' : 'PAUSED'}</strong></span>
              <span>•</span>
              <span>Session: <strong className="text-zinc-200">{formattedDwellTime}</strong></span>
              <span>•</span>
              <span className="hidden md:inline">Difficulty: <strong className="text-purple-400">0x000F...</strong></span>
            </p>
          </div>
        </div>

        {/* CONTROLS & PAUSE/RESUME */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsMiningActive(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              isMiningActive
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border-emerald-500/50 shadow-md shadow-emerald-950'
            }`}
          >
            {isMiningActive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Mining</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Mining</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CLAIM SUCCESS NOTICE */}
      {claimedNotice && (
        <div className="relative z-10 mt-4 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center justify-between gap-3 animate-fade-in shadow-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{claimedNotice}</span>
          </div>
          <button
            onClick={() => setClaimedNotice(null)}
            className="text-emerald-400 hover:text-white text-xs underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* MAIN METRIC CORRIDOR: ACCUMULATED TOKENS & HASHRATE */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* BIG REAL-TIME TOKEN ACCUMULATOR COUNTER (6 COLS) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-black/60 border border-zinc-800/90 shadow-inner space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Session Accumulated BaaCoin</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              +{modeConfig.multiplier}x Multiplier Active
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
            <div className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight flex items-baseline gap-1.5">
              <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] font-mono">
                {accumulatedSessionTokens.toFixed(4)}
              </span>
              <span className="text-lg sm:text-xl font-mono text-zinc-400 font-bold">
                BAA
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              ≈ ${(accumulatedSessionTokens * (baacoinPrice || 1.0)).toFixed(2)} USD
              <span className="text-emerald-400 font-bold ml-1.5">(@ $1.00 Pegged)</span>
            </div>
          </div>

          {/* DWELL TIME ACCUMULATION PROGRESS BAR */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#00D4FF]" />
                Active Study Dwell: <strong className="text-white">{formattedDwellTime}</strong>
              </span>
              <span className="text-emerald-400 font-bold">
                Mining Stream: +{(modeConfig.ratePerSec * 60).toFixed(3)} BAA / min
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (sessionSeconds % 300) / 3)}%` }}
              />
            </div>
          </div>

          {/* ACTION BUTTONS: CLAIM & WALLET */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch gap-3">
            <button
              onClick={handleClaimTokens}
              disabled={accumulatedSessionTokens <= 0.0001}
              className={`flex-1 py-3 px-5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer ${
                accumulatedSessionTokens > 0.0001
                  ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-black hover:brightness-110 shadow-[#FFD700]/25'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Coins className="w-4 h-4 text-black" />
              <span>Claim {accumulatedSessionTokens.toFixed(3)} BAA to Wallet</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>

            {onNavigateToWallet && (
              <button
                onClick={onNavigateToWallet}
                className="py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Wallet ({wallet.total_mined.toFixed(1)} Mined)</span>
              </button>
            )}
          </div>
        </div>

        {/* TELEMETRY, HASHRATE & BLOCK NONCE (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> PoW-Learn Hashrate:
              </span>
              <span className="text-white font-bold text-sm font-mono">
                {hashrate.toFixed(1)} MH/s
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Activity className="w-3.5 h-3.5 text-[#00D4FF]" /> Block Nonce:
              </span>
              <span className="text-[#00D4FF] font-bold font-mono">
                #{currentNonce.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Sovereign Gas Fee:
              </span>
              <span className="text-emerald-400 font-bold font-mono">
                0.000 Gwei (Base L2 Subsidized)
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-900">
              <span className="text-zinc-500">Student Proof Level:</span>
              <span className="text-[#FFD700] font-bold">
                Level {profile.level} (+{(profile.level * 5)}% Boost)
              </span>
            </div>
          </div>

          {/* ACTIVE LEARNING MODE SELECTOR */}
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Select Active Dwell Channel:</span>
              <span className="text-[#FFD700] font-bold">{modeConfig.label}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <button
                onClick={() => setActiveMode('reading')}
                className={`p-2 rounded-xl border text-left transition ${
                  activeMode === 'reading'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                📖 Reading (1.0x)
              </button>
              <button
                onClick={() => setActiveMode('video')}
                className={`p-2 rounded-xl border text-left transition ${
                  activeMode === 'video'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                🎬 Video (1.5x)
              </button>
              <button
                onClick={() => setActiveMode('prompt_lab')}
                className={`p-2 rounded-xl border text-left transition ${
                  activeMode === 'prompt_lab'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/60 font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                🤖 AI Lab (2.5x)
              </button>
              <button
                onClick={() => setActiveMode('capstone')}
                className={`p-2 rounded-xl border text-left transition ${
                  activeMode === 'capstone'
                    ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/60 font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                }`}
              >
                👑 Capstone (4.0x)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK INSTANT MINING BOOSTS (INTERACTIVE USER ACTIVITY ACCELERATORS) */}
      <div className="relative z-10 mt-6 pt-5 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 font-bold">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Interactive Mining Triggers (Execute Tasks to Earn Instantly)</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Live Verification Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => handleInteractiveBoost('tutor', 1.0)}
            className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-purple-500/50 text-left transition group cursor-pointer active:scale-95"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-purple-400 font-bold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> AI Mentor Query
              </span>
              <span className="text-[#FFD700] font-bold">+1.00 BAA</span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Stress-test prompt parameters with Dean AI</p>
          </button>

          <button
            onClick={() => handleInteractiveBoost('prompt', 1.5)}
            className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-[#00D4FF]/50 text-left transition group cursor-pointer active:scale-95"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-[#00D4FF] font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Prompt Benchmark
              </span>
              <span className="text-[#FFD700] font-bold">+1.50 BAA</span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Validate 60/40 marketplace prompt package</p>
          </button>

          <button
            onClick={() => handleInteractiveBoost('code', 5.0)}
            className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-emerald-500/50 text-left transition group cursor-pointer active:scale-95"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Code Capstone Test
              </span>
              <span className="text-[#FFD700] font-bold">+5.00 BAA</span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Execute Base L2 smart contract fuzzer</p>
          </button>

          <button
            onClick={() => handleInteractiveBoost('node', 0.5)}
            className="p-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-amber-500/50 text-left transition group cursor-pointer active:scale-95"
          >
            <div className="flex items-center justify-between text-xs font-mono mb-1">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> Sleeping Node Tick
              </span>
              <span className="text-[#FFD700] font-bold">+0.50 BAA</span>
            </div>
            <p className="text-[11px] text-zinc-400 line-clamp-1">Ping distributed UADC mobile node cluster</p>
          </button>
        </div>
      </div>

      {/* RECENT MINING BLOCK LEDGER */}
      <div className="relative z-10 mt-6 pt-5 border-t border-zinc-800/80">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 font-bold text-zinc-300">
            <Activity className="w-3.5 h-3.5 text-[#00D4FF]" />
            Recent Proof-of-Learning Blocks Mined
          </span>
          <span className="text-[10px] text-emerald-400">100% On-Chain Verifiable</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {miningBlocksHistory.map((b, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 flex items-center justify-between text-xs font-mono"
            >
              <div>
                <span className="text-[#00D4FF] font-bold block">{b.hash}</span>
                <span className="text-[10px] text-zinc-400">{b.activity}</span>
              </div>
              <div className="text-right">
                <span className="text-[#FFD700] font-bold block">+{b.reward.toFixed(2)} BAA</span>
                <span className="text-[10px] text-zinc-500">{b.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LearnToMineWidget;
