import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Globe2,
  TrendingUp,
  Smartphone,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowRight,
  Coins,
  CheckCircle2,
  Activity,
  DollarSign,
  Sun,
  Wifi,
  Sprout,
  Film
} from 'lucide-react';

export interface MonetizationModel {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  category: 'depin' | 'ai-sharding' | 'fintech' | 'green-energy' | 'bandwidth' | 'agritech';
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  nightlyYieldNaira: string;
  monthlyYieldNaira: string;
  tokenYieldBaa: string;
  howItWorks: string;
  enterpriseClients: string[];
  activeNodesCount: number;
  highlightColor: string;
  isNew?: boolean;
}

export const UADC_MONETIZATION_MODELS: MonetizationModel[] = [
  {
    id: 'washard',
    badge: 'WORLD FIRST • AI SHARDING',
    title: 'WhatsApp & Telegram AI Inference Sharding (WAShard)',
    tagline: 'Turn your idle phone into a distributed neural engine for Nigerian merchant bots.',
    category: 'ai-sharding',
    icon: MessageSquare,
    nightlyYieldNaira: '₦2,500 - ₦6,500',
    monthlyYieldNaira: '₦75,000 - ₦195,000',
    tokenYieldBaa: '45 - 120 BAA / wk',
    howItWorks: 'Connected phones run quantized 1.5B/3B AI model weights locally. When African e-commerce sellers receive inquiries in Pidgin, Hausa, Yoruba, or Igbo, your phone processes the voice synthesis and automated sales close, depositing instant micro-commissions.',
    enterpriseClients: ['Alaba International Merchants', 'Paystack Sellers Swarm', 'Shopify Africa'],
    activeNodesCount: 1842,
    highlightColor: '#00FF88',
    isNew: true
  },
  {
    id: 'zk-relay',
    badge: 'BASE L2 SETTLEMENT',
    title: 'Zero-Knowledge Financial Proof Relay (ZK-Relay)',
    tagline: 'Cryptographic state compression for sub-second fintech escrow finality.',
    category: 'fintech',
    icon: ShieldCheck,
    nightlyYieldNaira: '₦3,000 - ₦8,000',
    monthlyYieldNaira: '₦90,000 - ₦240,000',
    tokenYieldBaa: '60 - 150 BAA / wk',
    howItWorks: 'Instead of expensive AWS servers, mobile nodes execute zero-knowledge SNARK proof verification for student course micro-enrollments and FX escrows. Nodes verify mathematical consistency while keeping user identity 100% private.',
    enterpriseClients: ['Base L2 Ecosystem', 'Coinbase Cloud', 'Rossyst FX Escrow'],
    activeNodesCount: 2190,
    highlightColor: '#00D4FF',
    isNew: true
  },
  {
    id: 'edgerender',
    badge: 'CREATIVE METAVERSE',
    title: 'Overnight Neural Edge-Rendering (EdgeRender)',
    tagline: 'Rent sleeping NPU/GPU cycles to 4D video producers and game studios.',
    category: 'depin',
    icon: Film,
    nightlyYieldNaira: '₦4,500 - ₦12,000',
    monthlyYieldNaira: '₦135,000 - ₦360,000',
    tokenYieldBaa: '80 - 220 BAA / wk',
    howItWorks: '3D book covers, BAA video clips, and game textures are split into discrete ray-tracing tiles. Your smartphone renders 50 to 100 frames while plugged in at night, using less than 15% thermal headroom with automatic overheat cut-offs.',
    enterpriseClients: ['Nollywood AI Studios', 'BAA Publishing Swarm', 'Epic Unreal Mobile'],
    activeNodesCount: 1450,
    highlightColor: '#FFD700',
    isNew: true
  },
  {
    id: 'ecomesh',
    badge: 'GREEN POWER ARBITRAGE',
    title: 'Solar & Inverter Micro-Grid Green Staking (EcoMesh)',
    tagline: 'Synchronize computation with clean daytime solar and inverter battery surplus.',
    category: 'green-energy',
    icon: Sun,
    nightlyYieldNaira: '₦2,000 - ₦5,500',
    monthlyYieldNaira: '₦60,000 - ₦165,000 + $50 Carbon NFT',
    tokenYieldBaa: '2.5x Mining Multiplier',
    howItWorks: 'Devices plugged into solar inverters or daytime solar power automatically detect clean energy availability and scale up task processing. Miners earn standard BaaCoin plus audited Green Carbon Offset NFT credits tradable on international exchanges.',
    enterpriseClients: ['Sahara Solar Ring', 'Kainji Hydro Hub', 'UN Green Climate DePIN'],
    activeNodesCount: 3120,
    highlightColor: '#10B981',
    isNew: true
  },
  {
    id: 'baamesh',
    badge: 'DEPIN BANDWIDTH',
    title: 'Decentralized WiFi & Starlink Bandwidth Aggregator (BaaMesh)',
    tagline: 'Monetize excess night-time bandwidth into secure decentralized VPN tunnels.',
    category: 'bandwidth',
    icon: Wifi,
    nightlyYieldNaira: '₦1,800 - ₦4,500',
    monthlyYieldNaira: '₦54,000 - ₦135,000',
    tokenYieldBaa: '35 - 90 BAA / wk',
    howItWorks: 'While you sleep, your home broadband or Starlink connection has 90% unused capacity. BaaMesh shares 200MB - 1GB of encrypted bandwidth for verified academic research crawling and secure web scraping, paying you ₦850 per GB.',
    enterpriseClients: ['Grass.io Network', 'Academic Research Meshes', 'HuggingFace Africa'],
    activeNodesCount: 4210,
    highlightColor: '#00D4FF'
  },
  {
    id: 'agroedge',
    badge: 'AGRI-COMMODITY INTEL',
    title: 'Federated Agro & Cold-Chain Sensor Processing (AgroEdge)',
    tagline: 'Process offline crop disease images and regional market prices for African farmers.',
    category: 'agritech',
    icon: Sprout,
    nightlyYieldNaira: '₦2,200 - ₦6,000',
    monthlyYieldNaira: '₦66,000 - ₦180,000',
    tokenYieldBaa: '40 - 110 BAA / wk',
    howItWorks: 'Agricultural cooperatives in rural areas upload compressed crop leaf photos and cocoa bean telemetry. Your phone performs on-device computer vision classification, predicting blight and calculating fair commodity spot prices.',
    enterpriseClients: ['West Africa Cocoa Board', 'AgroMall Alliance', 'African Development Bank'],
    activeNodesCount: 1680,
    highlightColor: '#22C55E',
    isNew: true
  }
];

export const UADCMonetizationModels: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModel, setSelectedModel] = useState<MonetizationModel | null>(null);
  const [enrolledModels, setEnrolledModels] = useState<string[]>(['washard', 'zk-relay']);

  const filteredModels = UADC_MONETIZATION_MODELS.filter(m => {
    if (activeCategory === 'all') return true;
    return m.category === activeCategory;
  });

  const handleToggleEnroll = (modelId: string) => {
    setEnrolledModels(prev => 
      prev.includes(modelId) ? prev.filter(id => id !== modelId) : [...prev, modelId]
    );
  };

  return (
    <div className="space-y-8">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/40 text-[#00FF88] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
              NEW 2026-2030 REVENUE PIPELINE
            </span>
            <span className="text-zinc-500 text-xs">•</span>
            <span className="text-zinc-400 text-xs font-mono">Universal Autonomous Data Center (UADC)</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1.5">
            Next-Gen Sovereign Monetization Models
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Revolutionary decentralized compute streams turning regular African smartphones and micro-grids into high-yield financial infrastructure. Select active streams to compound your nightly payouts.
          </p>
        </div>

        {/* Aggregate Network Yield Counter */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-4 shrink-0 font-mono text-xs">
          <div>
            <span className="text-zinc-500 text-[10px] block uppercase">Network Daily Payout</span>
            <span className="text-lg font-heading font-black text-[#00FF88]">₦18,450,000 / day</span>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div>
            <span className="text-zinc-500 text-[10px] block uppercase">Global Active Nodes</span>
            <span className="text-lg font-heading font-black text-[#00D4FF]">14,492 Phones</span>
          </div>
        </div>
      </div>

      {/* FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-mono">
        {[
          { id: 'all', label: 'All Revenue Streams (6)' },
          { id: 'ai-sharding', label: 'AI Sharding' },
          { id: 'fintech', label: 'Fintech ZK-Relay' },
          { id: 'depin', label: '3D/Video Rendering' },
          { id: 'green-energy', label: 'Solar EcoMesh' },
          { id: 'bandwidth', label: 'Bandwidth DePIN' },
          { id: 'agritech', label: 'Agri-Sensor Compute' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl border whitespace-nowrap transition cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#00FF88] text-black font-bold border-[#00FF88] shadow-md shadow-[#00FF88]/20'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 6-CARD GRID OF MONETIZATION MODELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const IconComponent = model.icon;
          const isEnrolled = enrolledModels.includes(model.id);

          return (
            <div
              key={model.id}
              className="rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-xl hover:shadow-2xl"
            >
              {/* Top Accent Gradient Border */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                style={{ backgroundColor: model.highlightColor }}
              />

              <div className="space-y-4">
                {/* Badge & Active Nodes */}
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span 
                    className="px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                    style={{ 
                      backgroundColor: `${model.highlightColor}20`,
                      color: model.highlightColor,
                      border: `1px solid ${model.highlightColor}40`
                    }}
                  >
                    {model.badge}
                  </span>
                  <span className="text-zinc-500">
                    {model.activeNodesCount.toLocaleString()} Active Nodes
                  </span>
                </div>

                {/* Title & Icon */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition group-hover:scale-105"
                    style={{ 
                      backgroundColor: `${model.highlightColor}15`,
                      borderColor: `${model.highlightColor}40`
                    }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: model.highlightColor }} />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base leading-snug">
                      {model.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 font-sans">
                      {model.tagline}
                    </p>
                  </div>
                </div>

                {/* Real-World Earnings Metric Card */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800/80 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="border-r border-zinc-800 pr-2">
                    <span className="text-[10px] text-zinc-500 uppercase block">Nightly Yield</span>
                    <span className="text-sm sm:text-base font-black text-[#00FF88] block mt-0.5">
                      {model.nightlyYieldNaira}
                    </span>
                  </div>
                  <div className="pl-2">
                    <span className="text-[10px] text-zinc-500 uppercase block">Monthly Potential</span>
                    <span className="text-xs sm:text-sm font-bold text-[#FFD700] block mt-0.5">
                      {model.monthlyYieldNaira}
                    </span>
                  </div>
                </div>

                {/* How It Works Explainer */}
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {model.howItWorks}
                </p>

                {/* Enterprise Clients Tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                    Institutional Demand Backers:
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                    {model.enterpriseClients.map((client, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-zinc-400">
                        {client}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Toggle Button */}
              <div className="pt-4 border-t border-zinc-800/80">
                <button
                  onClick={() => handleToggleEnroll(model.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                    isEnrolled
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-700 hover:border-zinc-500'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Active Revenue Stream (Mining Live)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-[#00FF88]" />
                      <span>Activate This Monetization Stream</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
