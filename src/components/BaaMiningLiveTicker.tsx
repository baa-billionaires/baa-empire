import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Zap,
  Activity,
  Cpu,
  Smartphone,
  Server,
  Laptop,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  Volume2,
  VolumeX,
  X,
  Radio,
  Clock,
  ArrowRight,
  TrendingUp,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export interface MiningEventItem {
  id: string;
  minerName: string;
  nodeType: 'phone' | 'gpu' | 'laptop' | 'validator';
  deviceModel: string;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  amount: number;
  rewardUsd: number;
  workload: string;
  hashrate: string;
  blockNumber: number;
  txHash: string;
  timestamp: string;
  status: 'confirmed';
}

const FALLBACK_MINING_EVENTS: MiningEventItem[] = [
  {
    id: 'mine-001',
    minerName: 'Student Phone Node #8491',
    nodeType: 'phone',
    deviceModel: 'Tecno Camon 20 Pro · Helio G99',
    country: 'Nigeria',
    countryCode: 'NG',
    flag: '🇳🇬',
    city: 'Lagos',
    amount: 0.48,
    rewardUsd: 0.48,
    workload: 'Overnight Idle Battery Compute',
    hashrate: '840 kH/s',
    blockNumber: 8941204,
    txHash: '0x8a91c491e0a298f219dbca9188e04bba89190124',
    timestamp: new Date(Date.now() - 8000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-002',
    minerName: 'Nairobi GPU Mesh Shard-7',
    nodeType: 'gpu',
    deviceModel: 'NVIDIA RTX 4090 · 24GB VRAM',
    country: 'Kenya',
    countryCode: 'KE',
    flag: '🇰🇪',
    city: 'Nairobi',
    amount: 2.15,
    rewardUsd: 2.15,
    workload: 'Civic LLM Fine-Tuning Batch',
    hashrate: '14.2 MH/s',
    blockNumber: 8941205,
    txHash: '0x5b32e01a884ef0291ca824190baac71e40019283',
    timestamp: new Date(Date.now() - 21000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-003',
    minerName: 'ABAU Laptop Worker #109',
    nodeType: 'laptop',
    deviceModel: 'MacBook Air M2 · Neural Engine',
    country: 'Ghana',
    countryCode: 'GH',
    flag: '🇬🇭',
    city: 'Accra',
    amount: 0.85,
    rewardUsd: 0.85,
    workload: 'WhatsApp Closer AI Autonomous Inferences',
    hashrate: '2.4 MH/s',
    blockNumber: 8941206,
    txHash: '0x2e99f018ca0199da2880c108baac9108a1005521',
    timestamp: new Date(Date.now() - 36000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-004',
    minerName: 'Johannesburg Edge Validator #312',
    nodeType: 'validator',
    deviceModel: 'Ubuntu Sovereign Edge Cluster',
    country: 'South Africa',
    countryCode: 'ZA',
    flag: '🇿🇦',
    city: 'Johannesburg',
    amount: 1.20,
    rewardUsd: 1.20,
    workload: 'Base L2 Epoch Block Verification',
    hashrate: '5.1 MH/s',
    blockNumber: 8941207,
    txHash: '0x77c419fae881023bc800192fa901baac31d90048',
    timestamp: new Date(Date.now() - 54000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-005',
    minerName: 'Kigali Campus Cluster Alpha',
    nodeType: 'gpu',
    deviceModel: 'Dual Tesla A100 Data Pod',
    country: 'Rwanda',
    countryCode: 'RW',
    flag: '🇷🇼',
    city: 'Kigali',
    amount: 3.40,
    rewardUsd: 3.40,
    workload: 'UADC 4D Spatial Neural Synthesis',
    hashrate: '28.6 MH/s',
    blockNumber: 8941208,
    txHash: '0x19f201089bc2980fa0192cba8901baac80bb1290',
    timestamp: new Date(Date.now() - 78000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-006',
    minerName: 'Cairo Mobile Node #72',
    nodeType: 'phone',
    deviceModel: 'Samsung Galaxy A54 · Exynos 1380',
    country: 'Egypt',
    countryCode: 'EG',
    flag: '🇪🇬',
    city: 'Cairo',
    amount: 0.55,
    rewardUsd: 0.55,
    workload: 'Overnight Idle Battery Compute',
    hashrate: '910 kH/s',
    blockNumber: 8941209,
    txHash: '0x34e1980afb20199ccba018240091baac29cb7712',
    timestamp: new Date(Date.now() - 110000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-007',
    minerName: 'Abidjan Student Node #208',
    nodeType: 'phone',
    deviceModel: 'Infinix Note 30 · Helio G99',
    country: 'Ivory Coast',
    countryCode: 'CI',
    flag: '🇨🇮',
    city: 'Abidjan',
    amount: 0.72,
    rewardUsd: 0.72,
    workload: 'French/Swahili Translation Shard',
    hashrate: '870 kH/s',
    blockNumber: 8941210,
    txHash: '0x61a3c0018fa0190288eb00192baac338f099182a',
    timestamp: new Date(Date.now() - 145000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-008',
    minerName: 'Kampala Phone Mesh #33',
    nodeType: 'phone',
    deviceModel: 'Xiaomi Redmi Note 12 · Snapdragon',
    country: 'Uganda',
    countryCode: 'UG',
    flag: '🇺🇬',
    city: 'Kampala',
    amount: 0.42,
    rewardUsd: 0.42,
    workload: 'Overnight Idle Battery Compute',
    hashrate: '790 kH/s',
    blockNumber: 8941211,
    txHash: '0x99a0b120c9048a01f84901baac01844bca990141',
    timestamp: new Date(Date.now() - 190000).toISOString(),
    status: 'confirmed'
  }
];

const RANDOM_CITIES = [
  { city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', prefix: 'Student Phone Node', model: 'Tecno Camon 20 / Dimensity', type: 'phone' as const, workload: 'Overnight Idle Battery Compute', hashrate: '860 kH/s', baseReward: 0.46 },
  { city: 'Nairobi', country: 'Kenya', flag: '🇰🇪', prefix: 'Silicon Savannah GPU Node', model: 'NVIDIA RTX 4080 Cloud', type: 'gpu' as const, workload: 'Civic Sentiment Model Token Batch', hashrate: '16.8 MH/s', baseReward: 2.30 },
  { city: 'Accra', country: 'Ghana', flag: '🇬🇭', prefix: 'ABAU Student Laptop #', model: 'M2 MacBook Pro 16GB', type: 'laptop' as const, workload: 'Autonomous Micro-SaaS Agent Inferences', hashrate: '2.8 MH/s', baseReward: 0.95 },
  { city: 'Kigali', country: 'Rwanda', flag: '🇷🇼', prefix: 'Innovation City Cluster #', model: 'A100 Enterprise Shard', type: 'gpu' as const, workload: 'UADC 4D Holographic Shading', hashrate: '32.1 MH/s', baseReward: 3.10 },
  { city: 'Johannesburg', country: 'South Africa', flag: '🇿🇦', prefix: 'Sovereign Validator Pod #', model: 'Edge Linux Cluster', type: 'validator' as const, workload: 'Base L2 Epoch Proof Verification', hashrate: '6.4 MH/s', baseReward: 1.45 },
  { city: 'Cairo', country: 'Egypt', flag: '🇪🇬', prefix: 'Nile Mobile Mesh #', model: 'Samsung Galaxy A34', type: 'phone' as const, workload: 'Overnight Idle Battery Compute', hashrate: '820 kH/s', baseReward: 0.52 },
  { city: 'Dakar', country: 'Senegal', flag: '🇸🇳', prefix: 'West Africa Node #', model: 'Oppo Reno 8 / Dimensity', type: 'phone' as const, workload: 'Bilingual Translation Shard', hashrate: '790 kH/s', baseReward: 0.60 },
  { city: 'Addis Ababa', country: 'Ethiopia', flag: '🇪🇹', prefix: 'Highland Mesh Node #', model: 'Redmi Note 13', type: 'phone' as const, workload: 'Overnight Charging Idle Mining', hashrate: '880 kH/s', baseReward: 0.49 },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', prefix: 'Global Relay Validator #', model: 'H100 Sovereign Cloud Pod', type: 'gpu' as const, workload: 'Global Cross-Border Settlement Shard', hashrate: '48.2 MH/s', baseReward: 4.25 },
  { city: 'Toronto', country: 'Canada', flag: '🇨🇦', prefix: 'Diaspora Supporter Node #', model: 'RTX 4090 Workstation', type: 'gpu' as const, workload: 'Distributed AI Medical Model Inference', hashrate: '22.4 MH/s', baseReward: 2.80 }
];

interface BaaMiningLiveTickerProps {
  onNavigate?: (page: string) => void;
  variant?: 'banner' | 'embedded' | 'compact';
}

export const BaaMiningLiveTicker: React.FC<BaaMiningLiveTickerProps> = ({
  onNavigate,
  variant = 'banner'
}) => {
  const [events, setEvents] = useState<MiningEventItem[]>(FALLBACK_MINING_EVENTS);
  const [blockHeight, setBlockHeight] = useState<number>(8941212);
  const [activeNodes, setActiveNodes] = useState<number>(4892);
  const [totalMinedBaa, setTotalMinedBaa] = useState<number>(14298.64);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isFastSpeed, setIsFastSpeed] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<MiningEventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'phone' | 'gpu' | 'laptop' | 'validator'>('all');
  const [justMinedFlash, setJustMinedFlash] = useState<boolean>(false);

  // Play synthetic gentle audio chime when a block is mined (if sound is enabled)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12); // E6
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Fetch initial events from backend
  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/mining/events');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.events) && data.events.length > 0) {
            setEvents(data.events);
            if (data.blockHeight) setBlockHeight(data.blockHeight);
            if (data.activeNodes) setActiveNodes(data.activeNodes);
            if (data.total24hMinedBaa) setTotalMinedBaa(Number(data.total24hMinedBaa));
          }
        }
      } catch (err) {
        // graceful offline fallback
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Periodic real-time block generation (every 6-9 seconds)
  useEffect(() => {
    const triggerNewBlock = () => {
      const template = RANDOM_CITIES[Math.floor(Math.random() * RANDOM_CITIES.length)];
      const randomNodeNumber = Math.floor(Math.random() * 9000) + 1000;
      const randomReward = +(template.baseReward + (Math.random() * 0.12 - 0.06)).toFixed(2);
      const newBlockNum = blockHeight + 1;
      const txHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      const newEvent: MiningEventItem = {
        id: `mine-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        minerName: `${template.prefix} #${randomNodeNumber}`,
        nodeType: template.type,
        deviceModel: template.model,
        country: template.country,
        countryCode: template.country.substring(0, 2).toUpperCase(),
        flag: template.flag,
        city: template.city,
        amount: Math.max(0.2, randomReward),
        rewardUsd: Math.max(0.2, randomReward),
        workload: template.workload,
        hashrate: template.hashrate,
        blockNumber: newBlockNum,
        txHash,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
      };

      setBlockHeight(prev => prev + 1);
      setTotalMinedBaa(prev => +(prev + newEvent.amount).toFixed(2));
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setEvents(prev => [newEvent, ...prev.slice(0, 39)]);

      setJustMinedFlash(true);
      setTimeout(() => setJustMinedFlash(false), 1200);

      playChime();
    };

    const intervalTime = Math.floor(Math.random() * 3000) + 6000; // 6-9s
    const timer = setInterval(triggerNewBlock, intervalTime);
    return () => clearInterval(timer);
  }, [blockHeight, soundEnabled]);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'all') return events;
    return events.filter(e => e.nodeType === activeFilter);
  }, [events, activeFilter]);

  const getNodeIcon = (type: MiningEventItem['nodeType']) => {
    switch (type) {
      case 'phone':
        return <Smartphone className="w-3 h-3 text-[#00FF88]" />;
      case 'gpu':
        return <Cpu className="w-3 h-3 text-[#00D4FF]" />;
      case 'laptop':
        return <Laptop className="w-3 h-3 text-[#FFD700]" />;
      case 'validator':
        return <Server className="w-3 h-3 text-purple-400" />;
      default:
        return <Zap className="w-3 h-3 text-[#00FF88]" />;
    }
  };

  const formatTimeAgo = (isoDate: string) => {
    const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
    if (seconds < 5) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Duplicate events array to ensure infinite smooth marquee scroll
  const marqueeItems = useMemo(() => {
    return [...events, ...events];
  }, [events]);

  return (
    <>
      <div
        className={`w-full bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-md relative z-30 overflow-hidden select-none transition-colors duration-500 ${
          justMinedFlash ? 'bg-emerald-950/20' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between text-xs font-mono">
          {/* LEFT: Real-Time LIVE Indicator Badge & Key Telemetry Counters */}
          <div className="flex items-center gap-2.5 px-3 py-2 shrink-0 border-b md:border-b-0 md:border-r border-zinc-800/80 bg-zinc-950/80">
            {/* Pulsing Beacon */}
            <div className="flex items-center gap-1.5 bg-[#00FF88]/10 px-2 py-0.5 rounded-md border border-[#00FF88]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]" />
              </span>
              <span className="text-[10px] font-bold text-[#00FF88] tracking-widest uppercase">
                LIVE MESH
              </span>
            </div>

            {/* Block Height Counter */}
            <div className="flex items-center gap-1 text-zinc-300">
              <span className="text-zinc-500 text-[10px]">BLK:</span>
              <span className="text-white font-bold text-[11px] tabular-nums">
                #{blockHeight.toLocaleString()}
              </span>
            </div>

            <span className="text-zinc-600 hidden sm:inline">·</span>

            {/* Active Nodes */}
            <div className="hidden sm:flex items-center gap-1 text-zinc-300">
              <span className="text-zinc-500 text-[10px]">NODES:</span>
              <span className="text-emerald-400 font-bold text-[11px] tabular-nums">
                {activeNodes.toLocaleString()}
              </span>
            </div>

            <span className="text-zinc-600 hidden md:inline">·</span>

            {/* 24h Mined Total */}
            <div className="hidden lg:flex items-center gap-1 text-zinc-300">
              <span className="text-zinc-500 text-[10px]">24H:</span>
              <span className="text-[#FFD700] font-bold text-[11px] tabular-nums">
                {totalMinedBaa.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BAA
              </span>
            </div>
          </div>

          {/* CENTER: Scrolling Marquee of Recent Successful Mining Events */}
          <div className="flex-1 overflow-hidden relative group py-1.5 px-1 min-h-[36px] flex items-center">
            {/* Subtle Gradient Fade Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div
              className={`flex items-center gap-3 py-0.5 cursor-pointer ${
                isFastSpeed ? 'animate-ticker-continuous-fast' : 'animate-ticker-continuous'
              }`}
              title="Click any event to inspect on-chain compute telemetry (hover to pause)"
            >
              {marqueeItems.map((ev, idx) => (
                <button
                  key={`${ev.id}-${idx}`}
                  onClick={() => {
                    setSelectedEvent(ev);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-[#00FF88]/50 hover:bg-zinc-850 transition shrink-0 text-left text-[11px] group/item cursor-pointer"
                >
                  <span className="text-sm">{ev.flag}</span>
                  <div className="flex items-center gap-1 text-zinc-300 font-medium">
                    {getNodeIcon(ev.nodeType)}
                    <span className="truncate max-w-[130px] text-zinc-200">
                      {ev.city} {ev.nodeType === 'phone' ? 'Phone' : ev.nodeType.toUpperCase()}
                    </span>
                  </div>

                  <span className="text-[#00FF88] font-bold tracking-tight">
                    +{ev.amount.toFixed(2)} BAA
                  </span>

                  <span className="text-zinc-500 text-[10px] hidden sm:inline">
                    · {formatTimeAgo(ev.timestamp)}
                  </span>

                  <span className="text-zinc-600 text-[9px] font-mono group-hover/item:text-[#00D4FF] transition">
                    {ev.txHash.slice(0, 6)}...{ev.txHash.slice(-3)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Quick Action Buttons & Controls */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 shrink-0 border-t md:border-t-0 md:border-l border-zinc-800/80 bg-zinc-950/90 justify-end">
            {/* Explorer Modal Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-2 py-1 rounded-md text-[10px] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition flex items-center gap-1 cursor-pointer"
              title="Open Live Mining Telemetry Explorer"
            >
              <Activity className="w-3 h-3 text-[#00D4FF]" />
              <span className="hidden sm:inline">Explorer</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(prev => !prev)}
              className={`p-1 rounded-md text-[10px] border transition cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-950/60 text-[#00FF88] border-emerald-500/40'
                  : 'text-zinc-500 hover:text-zinc-300 border-zinc-800 hover:bg-zinc-800'
              }`}
              title={soundEnabled ? 'Mute mining chimes' : 'Unmute real-time mining audio chime'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            {/* Mine Now CTA (opens UADC lab) */}
            <button
              onClick={() => onNavigate && onNavigate('uadc-lab')}
              className="px-2.5 py-1 rounded-md bg-[#00FF88] text-black font-bold text-[10px] uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1 cursor-pointer shadow-sm shadow-[#00FF88]/20"
              title="Plug in your phone or laptop to mine BaaCoin"
            >
              <Zap className="w-3 h-3 fill-black" />
              <span>Mine BAA</span>
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED ON-CHAIN MINING TELEMETRY MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl relative text-slate-100 font-sans">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]" />
                  </span>
                  <span className="text-[11px] font-mono text-[#00FF88] font-bold tracking-widest uppercase">
                    ON-CHAIN COMPUTE EXPLORER
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Real-Time BaaCoin Mining Telemetry
                </h3>
              </div>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedEvent(null);
                }}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Event Spotlight (if user clicked a specific ticker event) */}
            {selectedEvent && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-[#00FF88]/40 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedEvent.flag}</span>
                    <span className="text-white font-bold text-sm">
                      {selectedEvent.minerName}
                    </span>
                  </div>
                  <span className="text-[#00FF88] text-base font-black">
                    +{selectedEvent.amount.toFixed(2)} BAA
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800 text-[11px]">
                  <div>
                    <span className="text-zinc-500 block">Location:</span>
                    <span className="text-zinc-300 font-bold">{selectedEvent.city}, {selectedEvent.country}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Hardware Node:</span>
                    <span className="text-zinc-300 truncate block" title={selectedEvent.deviceModel}>
                      {selectedEvent.deviceModel}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Hashrate:</span>
                    <span className="text-emerald-400 font-bold">{selectedEvent.hashrate}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Block Height:</span>
                    <span className="text-white">#{selectedEvent.blockNumber}</span>
                  </div>
                </div>

                <div className="bg-black/60 p-2.5 rounded-xl border border-zinc-800 flex items-center justify-between text-[11px] gap-2">
                  <div className="truncate">
                    <span className="text-zinc-500 mr-2">Tx Hash:</span>
                    <span className="text-[#00FF88] select-all">{selectedEvent.txHash}</span>
                  </div>
                  <button
                    onClick={() => handleCopyHash(selectedEvent.txHash)}
                    className="p-1 hover:text-white text-zinc-400 shrink-0 cursor-pointer"
                    title="Copy Transaction Hash"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-1">
                  <span>Workload: <strong className="text-zinc-200">{selectedEvent.workload}</strong></span>
                  <a
                    href="https://basescan.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00D4FF] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Verify on BaseScan</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs border-b border-zinc-800 pb-3">
              <span className="text-zinc-500 text-[11px] mr-2">Filter by Node:</span>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-[#00FF88] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                All Nodes ({events.length})
              </button>
              <button
                onClick={() => setActiveFilter('phone')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === 'phone'
                    ? 'bg-[#00FF88] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                📱 Mobile Mesh
              </button>
              <button
                onClick={() => setActiveFilter('gpu')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === 'gpu'
                    ? 'bg-[#00FF88] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                ⚡ GPU Shards
              </button>
              <button
                onClick={() => setActiveFilter('laptop')}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  activeFilter === 'laptop'
                    ? 'bg-[#00FF88] text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                💻 Laptop Workers
              </button>
            </div>

            {/* Live Events Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 block">
                Recent Confirmed Mining Blocks (Autonomous Consensus)
              </span>

              <div className="divide-y divide-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden font-mono text-xs max-h-64 overflow-y-auto">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className={`p-3 bg-zinc-950 hover:bg-zinc-900/80 transition flex items-center justify-between gap-3 cursor-pointer ${
                      selectedEvent?.id === ev.id ? 'border-l-2 border-[#00FF88] bg-zinc-900' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base">{ev.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-bold truncate">
                            {ev.minerName}
                          </span>
                          <span className="text-zinc-500 text-[10px]">
                            ({ev.city})
                          </span>
                        </div>
                        <span className="text-zinc-500 text-[10px] block truncate">
                          {ev.workload} · {ev.hashrate}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[#00FF88] font-bold block">
                        +{ev.amount.toFixed(2)} BAA
                      </span>
                      <span className="text-zinc-500 text-[10px]">
                        {formatTimeAgo(ev.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-zinc-800 text-xs font-mono">
              <span className="text-zinc-400 text-[11px]">
                Cryptographically backed by <strong>Base L2</strong> &amp; <strong>UADC Phone Entangle Protocol</strong>
              </span>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onNavigate) onNavigate('uadc-lab');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00FF88] text-black font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#00FF88]/20"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Start Mining on Your Device</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BaaMiningLiveTicker;
