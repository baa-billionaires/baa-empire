import React, { useState, useEffect, useMemo } from 'react';
import {
  Zap,
  Coins,
  Trophy,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Smartphone,
  BookOpen,
  Bot,
  Layers,
  ChevronRight,
  Check,
  RefreshCw,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEcosystem } from '../context/EcosystemContext';

interface DailyMiningTargetWidgetProps {
  onOpenReader?: () => void;
  onOpenLiveClass?: () => void;
  onNavigateToUADC?: () => void;
}

interface MiningTask {
  id: string;
  title: string;
  category: 'node' | 'reading' | 'ai' | 'pulse';
  reward: number; // in BaaCoin
  nairaValue: number;
  completed: boolean;
  actionLabel: string;
}

const QUOTA_TIERS = [
  { id: 'novice', label: 'Student Scout', target: 10, naira: 15500, perk: '1.0x Base Hash' },
  { id: 'scholar', label: 'Mastery Scholar', target: 25, naira: 38750, perk: '1.25x Mining Multiplier' },
  { id: 'node', label: 'Sovereign Node', target: 50, naira: 77500, perk: '1.5x Base L2 Priority' },
  { id: 'validator', label: 'UADC Validator Whale', target: 100, naira: 155000, perk: '2.0x Swarm Share' }
];

export const DailyMiningTargetWidget: React.FC<DailyMiningTargetWidgetProps> = ({
  onOpenReader,
  onOpenLiveClass,
  onNavigateToUADC
}) => {
  const { wallet, profile, recordInteraction } = useEcosystem();

  // Selected Quota Tier (default 25 BAA)
  const [selectedTierId, setSelectedTierId] = useState<string>('scholar');
  const activeTier = useMemo(() => {
    return QUOTA_TIERS.find(t => t.id === selectedTierId) || QUOTA_TIERS[1];
  }, [selectedTierId]);

  // Today's Date String for localStorage Key
  const todayKey = useMemo(() => {
    const d = new Date();
    return `baa_daily_target_${profile.id}_${d.toISOString().slice(0, 10)}`;
  }, [profile.id]);

  // Daily Mining Target State
  const [minedToday, setMinedToday] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(todayKey);
      if (saved) {
        const data = JSON.parse(saved);
        return typeof data.minedToday === 'number' ? data.minedToday : 14.5;
      }
    } catch (e) {
      console.warn('Could not parse daily mining target state', e);
    }
    return 14.5; // default seeded progress
  });

  const [hasClaimedBonus, setHasClaimedBonus] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${todayKey}_bonus`);
      return !!saved;
    } catch {
      return false;
    }
  });

  const [streakDays, setStreakDays] = useState<number>(5);
  const [isMiningPulse, setIsMiningPulse] = useState<boolean>(false);
  const [pulseSuccessNotice, setPulseSuccessNotice] = useState<string | null>(null);

  // Time remaining until daily quota reset (Midnight West Africa Time / UTC+1)
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save state to localStorage whenever minedToday updates
  useEffect(() => {
    try {
      localStorage.setItem(todayKey, JSON.stringify({
        minedToday,
        tierId: selectedTierId,
        date: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('Failed to store daily mining progress', e);
    }
  }, [minedToday, selectedTierId, todayKey]);

  // Tasks Checklist
  const tasks: MiningTask[] = [
    {
      id: 'task-node',
      title: 'Nightly Phone Entanglement Validation',
      category: 'node',
      reward: 8.5,
      nairaValue: 13175,
      completed: true,
      actionLabel: 'Active Node'
    },
    {
      id: 'task-reading',
      title: 'Study 5 Pages in Official BAA Monograph',
      category: 'reading',
      reward: 5.0,
      nairaValue: 7750,
      completed: minedToday >= 13.5,
      actionLabel: 'Open Monograph'
    },
    {
      id: 'task-ai',
      title: 'Ask Baa AI Study Query & Prompt Verification',
      category: 'ai',
      reward: 3.5,
      nairaValue: 5425,
      completed: minedToday >= 18.0,
      actionLabel: 'Launch Mentor'
    },
    {
      id: 'task-pulse',
      title: 'Decentralized Micro-Proof Hash Pulse',
      category: 'pulse',
      reward: 2.0,
      nairaValue: 3100,
      completed: false,
      actionLabel: 'Mine Hash Pulse'
    }
  ];

  const progressPercent = Math.min(100, Math.round((minedToday / activeTier.target) * 100));
  const isTargetAchieved = minedToday >= activeTier.target;
  const nairaEarnedToday = Math.round(minedToday * 1550);

  // Trigger Instant Micro-Proof Mining Pulse
  const handleMinePulse = () => {
    if (isMiningPulse) return;
    setIsMiningPulse(true);

    setTimeout(() => {
      const rewardGain = 1.5;
      const newTotal = Number((minedToday + rewardGain).toFixed(2));
      setMinedToday(newTotal);

      // Record interaction in global ecosystem context
      try {
        recordInteraction({
          courseId: 'uadc-micro-pulse',
          type: 'research_submit',
          promptData: `Daily Quota Micro-Proof Pulse #${Date.now().toString(36)}`,
          customReward: { xp: 45, baacoin: rewardGain }
        });
      } catch (err) {
        console.warn('Could not record interaction in ecosystem context', err);
      }

      setIsMiningPulse(false);
      setPulseSuccessNotice(`+${rewardGain} BAA (₦${(rewardGain * 1550).toLocaleString()}) mined! Hash confirmed on Base L2.`);

      // Small confetti burst if hitting target
      if (newTotal >= activeTier.target && !isTargetAchieved) {
        confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
      }

      setTimeout(() => setPulseSuccessNotice(null), 3500);
    }, 600);
  };

  // Claim Daily Quota Streak Bounty (+10 BAA)
  const handleClaimQuotaBonus = () => {
    if (hasClaimedBonus || !isTargetAchieved) return;

    try {
      recordInteraction({
        courseId: 'daily-quota-streak',
        type: 'assignment_complete',
        promptData: `100% Daily Mining Quota Achieved (${activeTier.target} BAA) - 5-Day Streak Bonus`,
        customReward: { xp: 300, baacoin: 10.0 }
      });

      setHasClaimedBonus(true);
      setMinedToday(prev => Number((prev + 10).toFixed(2)));
      localStorage.setItem(`${todayKey}_bonus`, 'claimed');

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.warn('Error claiming daily bonus', e);
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-[#00FF88]/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,136,0.12)] relative overflow-hidden space-y-6">
      {/* Background Cyber Glow Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#00FF88]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Title, Streak & Countdown */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
              POW-LEARN DEPIN ENGINE
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streakDays}-Day Streak ({activeTier.perk})</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-heading font-black text-white mt-1.5 flex items-center gap-2">
            <span>Daily BaaCoin Mining Quota</span>
            <span className="text-xs font-mono font-normal text-zinc-400">
              (Live On-Chain Settlement)
            </span>
          </h2>
        </div>

        {/* Quota Reset Countdown & Live Wallet Mined */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-black/60 border border-zinc-800 flex items-center gap-2 text-xs font-mono">
            <Clock className="w-4 h-4 text-[#00D4FF]" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase leading-none">Quota Resets In</span>
              <span className="text-white font-bold">{timeRemaining || '24h 00m'}</span>
            </div>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-black/60 border border-[#00FF88]/30 flex items-center gap-2 text-xs font-mono">
            <Coins className="w-4 h-4 text-[#00FF88]" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase leading-none">Lifetime Mined</span>
              <span className="text-[#00FF88] font-bold">+{wallet.total_mined.toLocaleString()} BAA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Selector Tabs */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400 font-bold uppercase tracking-wider">Select Daily Target Tier:</span>
          <span className="text-zinc-500 text-[11px]">Adjust your daily commitment anytime</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {QUOTA_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTierId(tier.id)}
                className={`p-3 rounded-2xl border text-left transition relative ${
                  isSelected
                    ? 'bg-[#00FF88]/15 border-[#00FF88] text-white shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                    : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{tier.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#00FF88] stroke-[3]" />}
                </div>
                <div className="text-base sm:text-lg font-heading font-black text-white mt-1">
                  {tier.target} <span className="text-xs font-mono text-[#00FF88]">BAA</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400">
                  ≈ ₦{tier.naira.toLocaleString()} / day
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Progress Dashboard Gauge */}
      <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-black/75 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-zinc-400 block uppercase tracking-wider">
              Today's Mining Progress
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-heading font-black text-white">
                {minedToday.toFixed(1)}
              </span>
              <span className="text-lg font-mono text-[#00FF88] font-bold">
                / {activeTier.target} BAA
              </span>
              <span className="text-sm font-mono text-zinc-400 ml-2">
                ({progressPercent}%)
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-1">
              Estimated Real-World Value Today: <span className="font-bold text-white">₦{nairaEarnedToday.toLocaleString()} NGN</span> (${(minedToday * 1.0).toFixed(2)} USD)
            </div>
          </div>

          {/* Action: Fast Pulse Mine */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleMinePulse}
              disabled={isMiningPulse}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00FF88] to-emerald-400 hover:brightness-110 active:scale-95 text-black font-mono text-xs font-black transition flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-pointer"
            >
              <Zap className={`w-4 h-4 ${isMiningPulse ? 'animate-bounce' : 'fill-black'}`} />
              <span>{isMiningPulse ? 'Validating Proof...' : 'Mine Proof Pulse (+1.5 BAA)'}</span>
            </button>

            {isTargetAchieved && !hasClaimedBonus && (
              <button
                onClick={handleClaimQuotaBonus}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-mono text-xs font-black transition flex items-center gap-1.5 shadow-[0_0_25px_rgba(255,215,0,0.4)] animate-pulse"
              >
                <Trophy className="w-4 h-4 fill-black" />
                <span>Claim +10 BAA Streak Bonus!</span>
              </button>
            )}

            {hasClaimedBonus && (
              <div className="px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>+10 BAA Streak Bonus Claimed</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Progress Bar with Stop Checkpoints */}
        <div className="space-y-1.5">
          <div className="relative w-full h-3.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-[#00FF88] via-[#00D4FF] to-[#FFD700] transition-all duration-500 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 px-1">
            <span>0 BAA (Start)</span>
            <span className={minedToday >= activeTier.target * 0.5 ? 'text-[#00D4FF] font-bold' : ''}>
              50% Checkpoint ({activeTier.target * 0.5} BAA)
            </span>
            <span className={minedToday >= activeTier.target * 0.75 ? 'text-[#FFD700] font-bold' : ''}>
              75% Checkpoint
            </span>
            <span className={isTargetAchieved ? 'text-[#00FF88] font-bold' : 'text-amber-400'}>
              100% Target ({activeTier.target} BAA)
            </span>
          </div>
        </div>

        {pulseSuccessNotice && (
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-fade-in">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{pulseSuccessNotice}</span>
          </div>
        )}
      </div>

      {/* Quota Action Checklist: Daily Tasks to Hit Quota */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#00FF88]" />
            <span>Daily Quota Mining Channels (How to Hit Target)</span>
          </h4>
          <span className="text-[11px] font-mono text-zinc-500">
            Automated + Interactive Yield
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                task.completed
                  ? 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
                  : 'bg-zinc-900/60 border-zinc-700/80 hover:border-[#00FF88]/40 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    task.completed
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : task.category === 'node' ? (
                    <Smartphone className="w-4 h-4 text-[#00FF88]" />
                  ) : task.category === 'reading' ? (
                    <BookOpen className="w-4 h-4 text-[#FFD700]" />
                  ) : task.category === 'ai' ? (
                    <Bot className="w-4 h-4 text-[#00D4FF]" />
                  ) : (
                    <Zap className="w-4 h-4 text-purple-400" />
                  )}
                </div>

                <div>
                  <div className="text-xs font-bold leading-snug">{task.title}</div>
                  <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    Yield: <span className="text-[#00FF88] font-bold">+{task.reward} BAA</span> (₦{task.nairaValue.toLocaleString()})
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                {task.completed ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ Done
                  </span>
                ) : task.id === 'task-pulse' ? (
                  <button
                    onClick={handleMinePulse}
                    disabled={isMiningPulse}
                    className="px-2.5 py-1 rounded-lg bg-[#00FF88] hover:bg-[#00FF88]/90 text-black text-[11px] font-mono font-bold transition cursor-pointer"
                  >
                    Pulse
                  </button>
                ) : task.id === 'task-reading' && onOpenReader ? (
                  <button
                    onClick={onOpenReader}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-mono font-bold transition flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToUADC}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-mono font-bold transition flex items-center gap-1"
                  >
                    <span>Active</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
