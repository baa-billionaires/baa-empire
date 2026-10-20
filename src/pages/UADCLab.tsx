import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { PaystackButton } from '../components/PaystackButton';
import {
  Cpu,
  Zap,
  Activity,
  Shield,
  Layers,
  Sparkles,
  Bot,
  Brain,
  TrendingUp,
  RefreshCw,
  Coins,
  CheckCircle2,
  Copy,
  Sliders,
  DollarSign,
  Radio,
  Flame,
  Award,
  Globe2,
  Share2,
  ExternalLink,
  ChevronRight,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  Square,
  Mic,
  MicOff,
  Clock,
  BatteryCharging,
  Recycle,
  Users,
  Compass,
  ArrowRight,
  Check,
  Server
} from 'lucide-react';
import { UADCLeaderboard } from '../components/UADCLeaderboard';
import { FounderEcosystemShowcase } from '../components/FounderEcosystemShowcase';
import { PhoneEntangleHowItWorks } from '../components/PhoneEntangleHowItWorks';
import { LiveNodeHealthDashboard } from '../components/LiveNodeHealthDashboard';

export const UADCLab: React.FC = () => {
  const { profile, updateProfile } = useEcosystem();

  // Top Live Counters
  const [computeMined, setComputeMined] = useState(12450.84);
  const [activeDevices, setActiveDevices] = useState(4892);
  const [myDataDividend, setMyDataDividend] = useState(47.30);
  const [treasury, setTreasury] = useState(1248900);

  // Module 1: Self-Replicating AI Workers
  const [workers, setWorkers] = useState([
    {
      id: 'w-1',
      name: 'Sales Closer AI',
      role: 'Autonomous WhatsApp & Direct DM Outreach',
      active: true,
      todayEarnings: 12.40,
      tasksDone: 47,
      rentalPrice: 29
    },
    {
      id: 'w-2',
      name: 'Content Mining AI',
      role: 'TikTok & Reels Viral Script Engine',
      active: true,
      todayEarnings: 18.90,
      tasksDone: 62,
      rentalPrice: 35
    },
    {
      id: 'w-3',
      name: 'Lead Hunter AI',
      role: 'Google Maps & LinkedIn B2B Scraping',
      active: false,
      todayEarnings: 24.10,
      tasksDone: 88,
      rentalPrice: 42
    }
  ]);

  // Module 1: Business Cloning state
  const [cloningStatus, setCloningStatus] = useState<'idle' | 'cloning' | 'cloned'>('idle');

  // Module 2: Data Dividend Mining state
  const [vaultGB, setVaultGB] = useState(2.3);
  const [vaultRate, setVaultRate] = useState(0.42);
  const [dividendClaimed, setDividendClaimed] = useState(false);

  // Module 2: Compute Staking slider
  const [stakeAmount, setStakeAmount] = useState(250);
  const [stakedTotal, setStakedTotal] = useState(500);

  // Module 2: Attention Futures
  const [futures, setFutures] = useState([
    { id: 'f-1', brand: 'Dangote Cement', bid: 3, duration: '30 sec', accepted: false },
    { id: 'f-2', brand: 'Paystack Nigeria', bid: 5, duration: '30 sec', accepted: false },
    { id: 'f-3', brand: 'MTN Broadband', bid: 4, duration: '30 sec', accepted: false }
  ]);

  // Module 3: Device Entanglement
  const [isDeviceEntangled, setIsDeviceEntangled] = useState(true);
  const [selectedCityNode, setSelectedCityNode] = useState('Lagos');

  // Module 3: Parasitic Mining Plugins
  const [plugins, setPlugins] = useState([
    { id: 'gmail', name: 'Gmail Autonomous Extractor', active: true, price: '$5/mo' },
    { id: 'whatsapp', name: 'WhatsApp Business Auto-Harvest', active: true, price: '$5/mo' },
    { id: 'instagram', name: 'Instagram DM Radar', active: false, price: '$5/mo' }
  ]);

  // Module 4: Thought-to-Cash
  const [thoughtInput, setThoughtInput] = useState('');
  const [isMintingIdea, setIsMintingIdea] = useState(false);
  const [ideaMinted, setIdeaMinted] = useState(false);

  // Module 4: Dream Mining Voice Journal
  const [isRecordingDream, setIsRecordingDream] = useState(false);
  const [dreamSeconds, setDreamSeconds] = useState(0);
  const [dreamReady, setDreamReady] = useState(false);

  // Module 4: AI Twins
  const [twins, setTwins] = useState([
    {
      id: 'twin-1',
      name: 'Twin 1 (Sales)',
      role: 'Selling on WhatsApp',
      status: 'Active',
      earningsToday: 34.00,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'twin-2',
      name: 'Twin 2 (Education)',
      role: 'Teaching Micro-Course',
      status: 'Active',
      earningsToday: 58.50,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'twin-3',
      name: 'Twin 3 (Support)',
      role: '24/7 VIP Concierge',
      status: 'Active',
      earningsToday: 19.20,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  // Live ticker ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setComputeMined(prev => Number((prev + 0.05).toFixed(2)));
      setMyDataDividend(prev => Number((prev + 0.002).toFixed(3)));
      if (Math.random() > 0.7) {
        setActiveDevices(prev => prev + (Math.random() > 0.4 ? 1 : -1));
      }
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Voice Dream Recorder timer
  useEffect(() => {
    let interval: any = null;
    if (isRecordingDream) {
      interval = setInterval(() => {
        setDreamSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecordingDream]);

  // APY Calculation (12% to 42% based on slider)
  const currentAPY = Math.round(12 + (stakeAmount / 5000) * 30);
  const dailyYield = ((stakeAmount * (currentAPY / 100)) / 365).toFixed(2);

  // Worker toggle
  const toggleWorker = (id: string) => {
    setWorkers(prev =>
      prev.map(w => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  // Claim Data Dividend
  const handleClaimDividend = () => {
    if (dividendClaimed) return;
    updateProfile({
      baacoin_balance: Number((profile.baacoin_balance + myDataDividend).toFixed(2))
    });
    setDividendClaimed(true);
    setTimeout(() => setDividendClaimed(false), 8000);
  };

  // Stake Compute
  const handleStakeCompute = () => {
    setStakedTotal(prev => prev + stakeAmount);
    alert(`Successfully staked $${stakeAmount} BAA-COMPUTE at ${currentAPY}% APY! Daily yield of $${dailyYield} will be streamed directly into your wallet.`);
  };

  // Accept Attention Future
  const handleAcceptFuture = (id: string, bid: number) => {
    setFutures(prev =>
      prev.map(f => (f.id === id ? { ...f, accepted: true } : f))
    );
    setMyDataDividend(prev => Number((prev + bid).toFixed(2)));
  };

  // Clone Business-in-a-Box
  const handleCloneBusiness = () => {
    setCloningStatus('cloning');
    setTimeout(() => {
      setCloningStatus('cloned');
    }, 1500);
  };

  // Mint Idea
  const handleMintIdea = () => {
    if (!thoughtInput.trim()) return;
    setIsMintingIdea(true);
    setTimeout(() => {
      setIsMintingIdea(false);
      setIdeaMinted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans pb-20 selection:bg-[#00FF88] selection:text-black">
      {/* GLOWING LAB BACKGROUND MATRIX */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#00FF88]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#FFD700]/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF8808_1px,transparent_1px),linear-gradient(to_bottom,#00FF8808_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* HEADER: WAKANDA / STARK LAB TITLE & AUTONOMOUS LIVE COUNTERS */}
        <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00FF88]/20 via-[#FFD700]/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#00FF88] uppercase bg-[#00FF88]/10 px-2.5 py-1 rounded-md border border-[#00FF88]/30">
                  UADC EMPIRE CORE • 15 MONETIZATION ENGINES ACTIVE
                </span>
                <span className="text-xs font-mono text-zinc-500 hidden sm:inline">•</span>
                <span className="text-xs font-mono text-[#FFD700] hidden sm:inline font-bold">
                  AUTONOMOUS REVENUE SUITE
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white flex items-center gap-3">
                <span>Universal Autonomous Data Center</span>
                <span className="text-xl px-2.5 py-0.5 rounded-lg bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40 font-mono">
                  LAB 🧠
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans">
                Turn idle smartphones, decentralized African nodes, and cognitive compute into multi-stream billionaire wealth. Built for students, builders, and sovereign data shareholders.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300">
                Mode Digital &amp; Rossyst (BN: UY/009049)
              </span>
            </div>
          </div>

          {/* 4-STEP PHONE PLUG VISUAL: PI NETWORK + GRASS.IO MINING SECTION */}
          <PhoneEntangleHowItWorks />

          {/* 4 LIVE HERO COUNTERS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Total Compute Mined
              </span>
              <span className="text-xl sm:text-2xl font-heading font-black text-[#00FF88] block mt-1">
                ${computeMined.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Network Hashrate
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Active Entangled Devices
              </span>
              <span className="text-xl sm:text-2xl font-heading font-black text-white block mt-1">
                {activeDevices.toLocaleString()}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                Across Nigeria &amp; Africa
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00FF88]/15 via-zinc-900 to-zinc-950 border border-[#00FF88]/40 text-left">
              <span className="text-[10px] font-mono text-[#00FF88] uppercase tracking-wider font-bold block">
                My Data Dividend Today
              </span>
              <span className="text-xl sm:text-2xl font-heading font-black text-[#00FF88] block mt-1">
                ${myDataDividend.toFixed(2)}
              </span>
              <span className="text-[10px] font-mono text-cyan-300">
                Earning $0.42/hr Live
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-[#FFD700]/30 text-left">
              <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-wider font-bold block">
                Community Treasury
              </span>
              <span className="text-xl sm:text-2xl font-heading font-black text-[#FFD700] block mt-1">
                ${(treasury / 1000000).toFixed(2)}M
              </span>
              <span className="text-[10px] font-mono text-amber-300">
                40% Auto-Regenerative Fund
              </span>
            </div>
          </div>
        </div>

        {/* LIVE NODE HEALTH DASHBOARD: D3.JS RADIAL BAR CHART & TELEMETRY */}
        <LiveNodeHealthDashboard />

        {/* =========================================================================
            MODULE 1: AUTONOMOUS (Workers, Business Cloning, Self-Healing)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#00FF88]/20 text-[#00FF88] flex items-center justify-center font-mono font-bold text-xs border border-[#00FF88]/40">
                M1
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                MODULE 1: AUTONOMOUS MONETIZATION
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Zero-Human-Labor Infrastructure</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Feature 1: Self-Replicating AI Workers (7 Cols) */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#00FF88]" />
                  <h3 className="font-heading font-bold text-base text-white">
                    1. Self-Replicating AI Workers (Fleet of 3)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Autonomous Replicators</span>
              </div>

              <div className="space-y-3">
                {workers.map(worker => (
                  <div
                    key={worker.id}
                    className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-black text-sm text-white">{worker.name}</span>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                            worker.active
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {worker.active ? 'ACTIVE' : 'STANDBY'}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-sans">{worker.role}</p>
                      <div className="flex items-center gap-4 text-xs font-mono pt-1 text-zinc-300">
                        <span className="text-[#00FF88] font-bold">Today: ${worker.todayEarnings}</span>
                        <span>• Tasks Done: {worker.tasksDone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* ON/OFF Switch */}
                      <button
                        onClick={() => toggleWorker(worker.id)}
                        className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                          worker.active ? 'bg-[#00FF88]' : 'bg-zinc-800'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-black transition-transform ${
                            worker.active ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>

                      {/* Rent Worker Button */}
                      <button
                        onClick={() => alert(`Renting ${worker.name} for $${worker.rentalPrice}/mo via Paystack. Automated revenue sharing ready!`)}
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-[#FFD700] hover:text-black text-xs font-mono font-bold text-zinc-200 transition"
                      >
                        Rent ${worker.rentalPrice}/mo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 2 & 3: Business Cloning & Self-Healing Revenue Repair (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Feature 2: Autonomous Business Cloning */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-[#FFD700]" />
                    <h3 className="font-heading font-bold text-sm text-white">
                      2. Autonomous Business Cloning
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFD700]/10 text-[#FFD700] font-bold">
                    PROVEN $4K/MO
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Top Turnkey Blueprint:</span>
                  <h4 className="text-base font-heading font-black text-white">
                    "Plantain Export to UK &amp; Diaspora"
                  </h4>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Includes: Automated Paystack store, London freight broker API, WhatsApp order bot, and supplier directory in Edo/Ondo states.
                  </p>
                  <div className="flex items-center justify-between pt-2 text-xs font-mono">
                    <span className="text-emerald-400 font-bold">Net Margin: $4,120 / month</span>
                    <span className="text-zinc-500">1-Click Deploy</span>
                  </div>
                </div>

                <button
                  onClick={handleCloneBusiness}
                  disabled={cloningStatus !== 'idle'}
                  className="w-full py-3 rounded-xl bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#FFD700]/20"
                >
                  <Copy className="w-4 h-4" />
                  <span>
                    {cloningStatus === 'idle' && 'Clone as Business-in-a-Box $49'}
                    {cloningStatus === 'cloning' && 'Synthesizing Architecture...'}
                    {cloningStatus === 'cloned' && '✓ Cloned! Check Dashboard'}
                  </span>
                </button>
              </div>

              {/* Feature 3: Self-Healing Revenue Repair */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00FF88]" />
                    <h3 className="font-heading font-bold text-sm text-white">
                      3. Self-Healing Revenue Repair
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">Revenue Health:</span>
                    <span className="text-xs font-mono text-[#00FF88] font-bold">98% Optimal</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00FF88] w-[98%]" />
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Status: 3 backup monetization apps on standby. If any course or payment gateway drops by 5%, traffic auto-routes to WhatsApp closer bot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MODULE 2: ECONOMIC (Data Dividend, Compute Staking, Attention Futures)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center font-mono font-bold text-xs border border-[#FFD700]/40">
                M2
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                MODULE 2: ECONOMIC &amp; CAPITAL HARVESTING
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Supabase: uadc_data_vault &amp; uadc_stakes</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 4: Data Dividend Mining */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#00FF88] uppercase tracking-wider flex items-center gap-1.5">
                    <DatabaseIcon className="w-4 h-4" /> 4. Data Dividend Mining
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300">uadc_data_vault</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Your Data Vault:</span>
                    <span className="text-white font-bold">{vaultGB} GB Staked</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Live Velocity:</span>
                    <span className="text-[#00FF88] font-bold">Earning ${vaultRate}/hr LIVE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-800">
                    <span className="text-zinc-400">Available Yield:</span>
                    <span className="text-lg font-black text-[#FFD700]">${myDataDividend.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleClaimDividend}
                  className="w-full py-3 rounded-xl bg-[#00FF88] hover:bg-[#00e67a] text-black font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#00FF88]/20"
                >
                  <Coins className="w-4 h-4" />
                  <span>{dividendClaimed ? '✓ Claimed to Wallet!' : `CLAIM $${myDataDividend.toFixed(2)}`}</span>
                </button>

                <button
                  onClick={() => setVaultGB(prev => Number((prev + 1.0).toFixed(1)))}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition"
                >
                  + Stake More Data (Add 1.0 GB)
                </button>
              </div>
            </div>

            {/* Feature 5: Compute Staking */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> 5. Compute Staking
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300">uadc_stakes</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Stake Amount:</span>
                    <span className="text-[#FFD700] font-bold text-base">${stakeAmount} USD</span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="5000"
                    step="50"
                    value={stakeAmount}
                    onChange={e => setStakeAmount(Number(e.target.value))}
                    className="w-full accent-[#FFD700] cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span>$10 (Min)</span>
                    <span className="text-emerald-400 font-bold">{currentAPY}% APY</span>
                    <span>$5,000 (Whale)</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs font-mono flex items-center justify-between">
                    <span className="text-zinc-400">Daily Yield:</span>
                    <span className="text-emerald-400 font-bold">+${dailyYield} / day</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStakeCompute}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Stake BAA-COMPUTE</span>
              </button>
            </div>

            {/* Feature 6: Attention Futures Market */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4" /> 6. Attention Futures Market
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">3 Live Bids</span>
                </div>

                <div className="space-y-2.5">
                  {futures.map(fut => (
                    <div
                      key={fut.id}
                      className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-2"
                    >
                      <div className="text-xs space-y-0.5">
                        <span className="font-bold text-white block">{fut.brand}</span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Bidding <strong className="text-[#00FF88]">${fut.bid}</strong> for {fut.duration} attention
                        </span>
                      </div>

                      <button
                        onClick={() => handleAcceptFuture(fut.id, fut.bid)}
                        disabled={fut.accepted}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition shrink-0 ${
                          fut.accepted
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-[#00D4FF] hover:bg-[#00b8e6] text-black shadow-md'
                        }`}
                      >
                        {fut.accepted ? 'Accepted ✓' : 'ACCEPT NOW'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 text-center block pt-1">
                Zero spam. Micro-ads run in background while solving code.
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MODULE 3: ENTANGLED (Device Mesh, Knowledge Share, Parasitic Mining)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#00D4FF]/20 text-[#00D4FF] flex items-center justify-center font-mono font-bold text-xs border border-[#00D4FF]/40">
                M3
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                MODULE 3: ENTANGLED ECOSYSTEM MESH
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Cross-Device African Network</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Feature 7: Device Entanglement Mesh with Animated Nigeria Map (6 Cols) */}
            <div className="lg:col-span-6 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#00FF88]" />
                  <h3 className="font-heading font-bold text-base text-white">
                    7. Device Entanglement Mesh
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#00FF88] font-bold">
                  {activeDevices.toLocaleString()} Devices Active
                </span>
              </div>

              {/* Animated Interactive SVG Nigeria Map with Pulsing City Nodes */}
              <div className="relative h-56 bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                <svg viewBox="0 0 400 240" className="w-full h-full opacity-60">
                  {/* Nigeria Outline Abstract Polygon */}
                  <polygon
                    points="60,140 120,40 260,30 360,70 380,150 310,210 210,230 130,220 80,180"
                    fill="none"
                    stroke="#00FF88"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                  {/* Mesh Connections */}
                  <line x1="120" y1="190" x2="220" y2="120" stroke="#00FF88" strokeWidth="0.8" opacity="0.4" />
                  <line x1="220" y1="120" x2="240" y2="200" stroke="#00FF88" strokeWidth="0.8" opacity="0.4" />
                  <line x1="220" y1="120" x2="280" y2="60" stroke="#00FF88" strokeWidth="0.8" opacity="0.4" />
                  <line x1="120" y1="190" x2="240" y2="200" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />

                  {/* Pulsing City Nodes */}
                  {/* Lagos */}
                  <circle cx="120" cy="190" r="5" fill="#00FF88" className="animate-ping" />
                  <circle cx="120" cy="190" r="4" fill="#00FF88" />
                  <text x="125" y="195" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Lagos (2,140 nodes)</text>

                  {/* Port Harcourt */}
                  <circle cx="240" cy="200" r="5" fill="#FFD700" className="animate-ping" />
                  <circle cx="240" cy="200" r="4" fill="#FFD700" />
                  <text x="248" y="205" fill="#FFD700" fontSize="9" fontFamily="monospace">Port Harcourt (HQ)</text>

                  {/* Abuja */}
                  <circle cx="220" cy="120" r="4" fill="#00D4FF" />
                  <text x="228" y="125" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Abuja (840 nodes)</text>

                  {/* Kano */}
                  <circle cx="280" cy="60" r="4" fill="#00FF88" />
                  <text x="288" y="65" fill="#FFFFFF" fontSize="9" fontFamily="monospace">Kano (612 nodes)</text>
                </svg>

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-xl border border-zinc-700 text-[11px] font-mono text-zinc-300">
                  Mesh Status: <strong className="text-emerald-400">Optimal 14ms Peer Latency</strong>
                </div>
              </div>

              {/* Entangle Device Action */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Idle CPU Yield Last Night:</span>
                  <span className="text-[#00FF88] font-bold">+$5.20 earned while sleeping</span>
                </div>
                <button
                  onClick={() => setIsDeviceEntangled(!isDeviceEntangled)}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                    isDeviceEntangled
                      ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-400'
                      : 'bg-[#00FF88] text-black shadow-lg shadow-[#00FF88]/20'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>
                    {isDeviceEntangled
                      ? '✓ This Device is Entangled (Earning $5.20/night)'
                      : 'Entangle This Device -> Earn while sleeping'}
                  </span>
                </button>
              </div>
            </div>

            {/* Feature 8 & 9: Knowledge Entanglement & Parasitic Mining (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Feature 8: Knowledge Entanglement Feed */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#FFD700]" />
                    <h3 className="font-heading font-bold text-sm text-white">
                      8. Knowledge Entanglement
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">LIVE REVENUE SHARE</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      $10k
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="text-white font-medium">
                        &ldquo;Bola just closed $10k deal &rarr; 10,000 members receiving capsule now.&rdquo;
                      </p>
                      <p className="text-emerald-400 font-mono font-bold">
                        You earned $0.10 as knowledge shareholder.
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 block pt-1 border-t border-zinc-800">
                    When one student wins, the entire African mesh profits automatically.
                  </span>
                </div>
              </div>

              {/* Feature 9: Cross-Platform Parasitic Mining */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#00FF88]" />
                    <h3 className="font-heading font-bold text-sm text-white">
                      9. Cross-Platform Parasitic Mining
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Auto-Lead Generation</span>
                </div>

                <div className="space-y-2">
                  {plugins.map(plug => (
                    <div
                      key={plug.id}
                      className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{plug.name}</span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          {plug.price} per plugin • Generates leads automatically
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          setPlugins(prev =>
                            prev.map(p => (p.id === plug.id ? { ...p, active: !p.active } : p))
                          )
                        }
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
                          plug.active
                            ? 'bg-[#00FF88] text-black'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {plug.active ? 'ON ✓' : 'OFF'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MODULE 4: COGNITIVE (Thought-to-Cash, Dream Mining, AI Twins)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center font-mono font-bold text-xs border border-[#FFD700]/40">
                M4
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                MODULE 4: COGNITIVE CAPITAL &amp; TWIN HARVESTING
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Idea Minting &amp; Voice Synthesis</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Feature 10: Thought-to-Cash Engine (HUGE Textarea) (7 Cols) */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#FFD700]" />
                  <h3 className="font-heading font-bold text-base text-white">
                    10. Thought-to-Cash Engine (Minting Core)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#00FF88] font-bold">Deploy in 60s</span>
              </div>

              <p className="text-xs text-zinc-400 font-sans">
                Type any business idea or raw thought. The engine automatically synthesizes a logo, 10-page business plan, Shopify layout, and viral TikTok scripts.
              </p>

              <textarea
                rows={4}
                value={thoughtInput}
                onChange={e => setThoughtInput(e.target.value)}
                placeholder="I have an idea: An autonomous drone dispatch service for delivering fresh roasted cashew nuts across Port Harcourt and Victoria Island..."
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-[#00FF88] text-sm text-white placeholder-zinc-500 font-sans outline-none resize-none leading-relaxed"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-mono text-zinc-400">
                  Synthesizes: Logo • Business Plan • Shopify • 5 TikToks
                </span>
                <button
                  onClick={handleMintIdea}
                  disabled={isMintingIdea || !thoughtInput.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>{isMintingIdea ? 'MINTING IN PROGRESS...' : 'MINT NOW $29'}</span>
                </button>
              </div>

              {/* Live Preview if Minted */}
              {ideaMinted && (
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 space-y-3 animate-fade-in text-xs font-mono">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>✓ Thought-to-Cash Mint Complete!</span>
                    <span>Token: #THOUGHT-8492</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="text-[#FFD700] block font-bold">Logo SVG</span>
                      <span className="text-[10px] text-zinc-400">Generated</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="text-[#00FF88] block font-bold">Shopify Store</span>
                      <span className="text-[10px] text-zinc-400">Ready to Launch</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="text-[#00D4FF] block font-bold">5 TikTok Hooks</span>
                      <span className="text-[10px] text-zinc-400">Viral Formatted</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/60 border border-zinc-800">
                      <span className="text-white block font-bold">Paystack Gate</span>
                      <span className="text-[10px] text-zinc-400">Mode Digital</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Feature 11 & 12: Dream Mining & AI Twin Workers (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Feature 11: Dream Mining */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-[#00FF88]" />
                    <h3 className="font-heading font-bold text-sm text-white">
                      11. Dream Mining (Sleep Journal)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400">60% OPEN RATE</span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <span className="text-xs text-zinc-300 font-sans block">
                    Record a 5-min Voice Journal before sleep. Your personalized micro-course will be synthesized and ready at 6:00 AM.
                  </span>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        setIsRecordingDream(!isRecordingDream);
                        if (isRecordingDream) setDreamReady(true);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition ${
                        isRecordingDream
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-[#00FF88] text-black'
                      }`}
                    >
                      {isRecordingDream ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      <span>{isRecordingDream ? `Recording ${dreamSeconds}s` : 'Start Voice Journal'}</span>
                    </button>

                    <span className="text-[11px] font-mono text-zinc-400">
                      {dreamReady ? 'Course compiled for 6AM ✓' : 'Ready for bed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature 12: AI Twin Workers */}
              <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#FFD700]" />
                    <h3 className="font-heading font-bold text-sm text-white">
                      12. AI Twin Workers (Fleet of 3)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">uadc_twins</span>
                </div>

                <div className="space-y-2">
                  {twins.map(twin => (
                    <div
                      key={twin.id}
                      className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={twin.avatar}
                          alt={twin.name}
                          className="w-10 h-10 rounded-xl object-cover border border-zinc-700"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-white block">{twin.name}</span>
                          <span className="text-[10px] text-zinc-400">{twin.role}</span>
                        </div>
                      </div>

                      <div className="text-right text-xs font-mono">
                        <span className="text-[#00FF88] font-bold block">+${twin.earningsToday.toFixed(2)}</span>
                        <span className="text-[10px] text-emerald-400">Active</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => alert('Minting new AI Twin ($19/mo). Your voice and facial avatar will be cloned to close sales 24/7.')}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#FFD700]/40 text-[#FFD700] text-xs font-mono font-bold transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Mint New Twin $19/mo</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MODULE 5: REGENERATIVE (Energy Mining, Failure Repair, Community Treasury)
           ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#00FF88]/20 text-[#00FF88] flex items-center justify-center font-mono font-bold text-xs border border-[#00FF88]/40">
                M5
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                MODULE 5: REGENERATIVE POWER &amp; TREASURY
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-400">Circular Wealth &amp; Waste Monetization</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 13: Energy Regeneration Mining */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00FF88] uppercase tracking-wider flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4" /> 13. Energy Regeneration
                </span>
                <span className="text-[10px] font-mono text-emerald-400">SOLAR EDGE</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <p className="text-xs text-white font-medium leading-relaxed">
                  "BAA Box deployed in 12 salons across Lagos — Generating decentralized power + WiFi for student phones."
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Carbon Credits Sold:</span>
                    <span className="text-[#00FF88] font-bold">$234 sold to EU this week</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Solar Capacity:</span>
                    <span className="text-white">14.8 kWh Autonomous</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 14: Failure Regeneration */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                  <Recycle className="w-4 h-4" /> 14. Failure Regeneration
                </span>
                <span className="text-[10px] font-mono text-amber-300">AUTO-HARVEST</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Zero transaction is wasted. Failed payments and abandoned checkouts are immediately monetized as algorithmic training intelligence.
                </p>
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">12 Failed Paystack Txs:</span>
                    <span className="text-emerald-400 font-bold">Converted to $24 Intelligence</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">3 Abandoned Carts:</span>
                    <span className="text-[#FFD700] font-bold">Retargeted &rarr; $18 Yield</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 15: Community Regenerative Treasury */}
            <div className="bg-zinc-950 border border-zinc-800/80 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> 15. Community Treasury
                </span>
                <span className="text-lg font-black text-[#FFD700]">$1.2M</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-400">Regenerative Allocation:</span>
                    <span className="text-[#00FF88] font-bold">40% of All UADC Revenue</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00FF88] via-[#FFD700] to-[#00D4FF] w-[40%]" />
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  "40% of all UADC revenue funds new billionaires. <strong className="text-emerald-400 font-mono">You funded 3 new members this month.</strong>"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERBOARD COMPONENT: TOP BILLIONAIRES UADC EARNINGS */}
        <section className="space-y-4">
          <UADCLeaderboard />
        </section>

        {/* FOUNDER & VISIONARY ARCHITECT: EMMANUEL BASSEY JOE & 11 PLATFORMS */}
        <section className="space-y-4">
          <FounderEcosystemShowcase />
        </section>

        {/* BOTTOM LEGAL ENTITY & AUDIT PROOF BANNER */}
        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-center sm:text-left">
          <div>
            <span className="text-white font-bold block">
              Universal Autonomous Data Center (UADC) Operational Registry
            </span>
            <span>
              Mode Digital Creations Limited &amp; Rossyst Enterprises Limited (BN: UY/009049) • Port Harcourt &amp; Lagos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 font-bold">
              15 ENGINES LIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Database icon helper
function DatabaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

export default UADCLab;
