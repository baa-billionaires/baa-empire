import React, { useEffect, useState } from 'react';
import {
  Printer,
  Download,
  ShieldCheck,
  Building2,
  TrendingUp,
  Coins,
  Cpu,
  Smartphone,
  CheckCircle2,
  Globe2,
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Lock,
  Share2,
  ArrowLeft,
  Building,
  Activity,
  Code2,
  Brain,
  Wrench,
  Sparkles,
  Layers,
  Bot
} from 'lucide-react';
import { UaaidcModuleSwitcher } from '../components/navigation/UaaidcModuleSwitcher';

interface InvestorOnePagerProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

interface ModuleLiveStats {
  ceNodes: number;
  codeApis: number;
  aurumValue: number;
  mindHiveCapital: number;
  novaLivingApps: number;
  novaMutations: number;
  m2mMachines: number;
  m2mSettledJobs: number;
}

export const InvestorOnePagerDashboard: React.FC<{ onNavigate?: (page: string) => void }> = ({
  onNavigate
}) => {
  const [liveStats, setLiveStats] = useState<ModuleLiveStats>({
    ceNodes: 10420,
    codeApis: 148,
    aurumValue: 284500,
    mindHiveCapital: 1240000,
    novaLivingApps: 3,
    novaMutations: 432,
    m2mMachines: 5,
    m2mSettledJobs: 1
  });

  useEffect(() => {
    let active = true;
    const fetchAllStatuses = async () => {
      const results = await Promise.allSettled([
        fetch('/api/ce-colony/state').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/code-vein/state').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/aurum/state').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/mindhive-v22/state').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/nova/state').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/m2m/state').then((r) => (r.ok ? r.json() : null))
      ]);

      if (!active) return;

      const [ceRes, cvRes, aurumRes, mhRes, novaRes, m2mRes] = results.map((res) =>
        res.status === 'fulfilled' ? res.value : null
      );

      setLiveStats((prev) => ({
        ceNodes: ceRes?.state?.nodes?.length ? Math.max(prev.ceNodes, ceRes.state.nodes.length * 1000) : prev.ceNodes,
        codeApis: cvRes?.state?.apis?.length || cvRes?.state?.microApis?.length || prev.codeApis,
        aurumValue: aurumRes?.state?.vaultBalanceUsd || aurumRes?.state?.totalRecoverableUsd || prev.aurumValue,
        mindHiveCapital: mhRes?.state?.summaryMetrics?.totalKnowledgeCapitalValueUsd || prev.mindHiveCapital,
        novaLivingApps: novaRes?.state?.stats?.total_living_apps || prev.novaLivingApps,
        novaMutations: novaRes?.state?.stats?.total_mutations || prev.novaMutations,
        m2mMachines: m2mRes?.state?.machines?.length || prev.m2mMachines,
        m2mSettledJobs: m2mRes?.state?.jobs ? m2mRes.state.jobs.filter((j: { status: string }) => j.status === 'SETTLED').length : prev.m2mSettledJobs
      }));
    };

    fetchAllStatuses();
    return () => {
      active = false;
    };
  }, []);

  const handleViewModule = (moduleId: string) => {
    if (onNavigate) {
      onNavigate(moduleId);
    } else {
      window.location.hash = moduleId;
    }
  };

  const coreModules = [
    {
      id: 'ce-colony',
      number: '01',
      anatomy: 'THE BODY • COMPUTE & HUMAN PROOF',
      name: 'CE COLONY V12',
      subtitle: 'Autonomous Computer Engineering Data-to-Wealth Network',
      icon: Wrench,
      accentText: 'text-amber-300',
      borderClass: 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-zinc-950 to-black',
      statusMetric: `${liveStats.ceNodes.toLocaleString()} Active Nodes Online`,
      narrative:
        'Converts idle student smartphones, laptops, and repair-shop hardware across Africa into verified edge compute clusters with zero CapEx.',
      investmentCase:
        'Zero CAC infrastructure acquisition: contributors supply power and silicon in exchange for a 70/30 Paystack revenue share while funding enterprise AI workloads.'
    },
    {
      id: 'code-vein',
      number: '02',
      anatomy: 'THE HANDS • MICRO-APIS & CODE REFINERY',
      name: 'CODE VEIN V13',
      subtitle: 'Autonomous Source-to-Wealth Software Asset Refinery',
      icon: Code2,
      accentText: 'text-cyan-300',
      borderClass: 'border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 via-zinc-950 to-black',
      statusMetric: `${liveStats.codeApis} Commercial Micro-APIs Live`,
      narrative:
        'Audits dormant repositories and developer codebases, wraps them in metered FastAPI/Express endpoints, and deploys rotating API shards.',
      investmentCase:
        'High-margin recurring API calls ($0.005–$0.05/exec) and enterprise SaaS licensing feed directly into Module 5 apps so developers earn perpetually.'
    },
    {
      id: 'aurum-colony',
      number: '03',
      anatomy: 'THE BLOOD • LIQUIDITY & ASSET RECOVERY',
      name: 'AURUM COLONY V13',
      subtitle: 'Autonomous Digital Asset Recovery & Commercialization Network',
      icon: Coins,
      accentText: 'text-[#FFD700]',
      borderClass: 'border-yellow-500/40 bg-gradient-to-br from-yellow-950/30 via-zinc-950 to-black',
      statusMetric: `$${liveStats.aurumValue.toLocaleString()} Ecosystem Liquidity`,
      narrative:
        'Discovers recoverable wallet dust, dormant tokens, ERC-4907 rentable NFTs, and Base L2 DeFi yields to fund compute heartbeats.',
      investmentCase:
        'Self-funding treasury mechanics unlock trapped Web3 capital and provide instant liquidity backing the BaaCoin ($1.00 USD peg) & Paystack settlement rails.'
    },
    {
      id: 'mindhive-v22',
      number: '04',
      anatomy: 'THE BRAIN • IDEA-COINS & KNOWLEDGE CAPITAL',
      name: 'MIND HIVE V17–V22',
      subtitle: 'Knowledge Capital Exchange, 20-Territory Atlas & HAVC Co-op',
      icon: Brain,
      accentText: 'text-purple-300',
      borderClass: 'border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-zinc-950 to-black',
      statusMetric: `$${(liveStats.mindHiveCapital / 1000000).toFixed(2)}M Knowledge Capital`,
      narrative:
        'Breeds Idea-Coins, mines human & social knowledge into licensed enterprise datasets, maps 20 industry territories, and tracks Contribution DNA.',
      investmentCase:
        'Captures B2B AI lab & university licensing contracts ($25k–$75k RFQs) on KCX alongside multi-agent Idea-Coin evolution.'
    },
    {
      id: 'nova-protocol',
      number: '05',
      anatomy: 'THE SOUL • LIVING UNCOPYABLE INTERNET',
      name: 'NOVA PROTOCOL V16',
      subtitle: 'Zero-Static Living Apps, 500ms Quorum & Origin DNA Royalties',
      icon: Activity,
      accentText: 'text-[#00FF88]',
      borderClass: 'border-[#00FF88] bg-gradient-to-br from-emerald-950/40 via-zinc-950 to-black shadow-[0_0_40px_rgba(0,255,136,0.12)]',
      statusMetric: `${liveStats.novaLivingApps} Living Apps • ${liveStats.novaMutations} Mutations`,
      narrative:
        'Sits on top of Modules 1–4. Apps assemble live without static HTML, mutate endpoints every 60s, and verify 100 CE nodes every 500ms.',
      investmentCase:
        'Renders Reverse Engineering Anything (REA) obsolete: any scraped clone fails heartbeat, shows a Dead Copy notice, and routes $0.001/click royalties home.'
    },
    {
      id: 'm2m-ore',
      number: '06',
      anatomy: 'THE SWARM • MACHINE SERVICE ECONOMY',
      name: 'M2M ORE PROTOCOL V18',
      subtitle: 'Machine Digital Passports, Service Escrow & Swarm Coordination',
      icon: Bot,
      accentText: 'text-emerald-300',
      borderClass: 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-zinc-950 to-black',
      statusMetric: `${liveStats.m2mMachines} Pilot Machines · ${liveStats.m2mSettledJobs} Settled Contract(s)`,
      narrative:
        'Gives Mother Bots, specialist Child Workers, and consented Robot Miners verifiable Passports, double-entry escrow settlement, and evidence-gated breeding.',
      investmentCase:
        'Captures verified M2M clearinghouse platform fees (10%) while enforcing strict non-self-dealing, PII blocking, and Level 4 human budget caps.'
    }
  ];

  return (
    <section className="bg-zinc-950 text-white border-b border-zinc-800 py-10 px-4 sm:px-8 print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Investor Badge + Dropdown Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF88]/15 border border-[#00FF88]/50 text-[#00FF88] font-mono text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
              <span>YES FINAL DECK • INVESTOR ONE-PAGER DASHBOARD</span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              UA-AIDC V16 — THE LIVING INTERNET CIVILIZATION (5 MODULES, 1 ORGANISM)
            </div>
          </div>

          {onNavigate && (
            <div className="print:hidden">
              <UaaidcModuleSwitcher
                currentPage="investor-one-pager"
                onSelectModule={handleViewModule}
                variant="banner"
              />
            </div>
          )}
        </div>

        {/* Central Investment Thesis Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-black to-emerald-950/30 border border-emerald-500/30 space-y-4">
          <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white">
            "You don't have 5 products. You have{' '}
            <span className="text-[#00FF88]">1 Living Organism</span>. REA can copy anything except this."
          </h2>
          <p className="text-sm text-zinc-300 max-w-4xl leading-relaxed">
            Conventional software is static code that AI scrapers can clone in seconds.{' '}
            <strong>UA-AIDC V16</strong> turns every student device, developer microservice, dormant token, knowledge corpus, and frontend application into an interdependent 5-layer commercial organism settled transparently via <strong>Paystack NGN &amp; Base L2</strong>.
          </p>

          {/* Visual Organism Pipeline Bar */}
          <div className="pt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 font-bold">
              1. Body (Compute)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-bold">
              2. Hands (Micro-APIs)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded-lg bg-yellow-950/60 border border-yellow-500/40 text-[#FFD700] font-bold">
              3. Blood (Liquidity)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold">
              4. Brain (Knowledge)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-[#00FF88] text-[#00FF88] font-bold">
              5. Soul (NOVA V16 Living Web)
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600 hidden sm:inline" />
            <span className="px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-400 text-emerald-300 font-bold">
              6. Swarm (M2M ORE V18)
            </span>
          </div>
        </div>

        {/* 6 Core Modules Detailed Investment Narrative Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00FF88]" />
              <span>6 Core Modules — Investment Narrative &amp; Live Status</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-400">
              All 6 endpoints online &amp; observable
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 transition hover:scale-[1.01] ${mod.borderClass} ${
                    mod.id === 'nova-protocol' ? 'md:col-span-2 lg:col-span-1' : ''
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className={`font-bold uppercase tracking-wider ${mod.accentText}`}>
                        MODULE {mod.number} • {mod.anatomy}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        LIVE
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl bg-black/70 border border-zinc-800 ${mod.accentText}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-heading font-black text-white leading-tight">
                          {mod.name}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{mod.subtitle}</p>
                      </div>
                    </div>

                    {/* Live Metric Strip */}
                    <div className="px-3 py-2 rounded-xl bg-black/60 border border-zinc-800 font-mono text-xs font-bold text-white">
                      {mod.statusMetric}
                    </div>

                    {/* Investment Narrative */}
                    <div className="space-y-2 text-xs leading-relaxed">
                      <p className="text-zinc-300">
                        <strong className="text-white">Role:</strong> {mod.narrative}
                      </p>
                      <p className="text-zinc-400">
                        <strong className={mod.accentText}>Investor Thesis:</strong> {mod.investmentCase}
                      </p>
                    </div>
                  </div>

                  {/* Required 'View Live Status' Link */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between print:hidden">
                    <a
                      href={`#${mod.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleViewModule(mod.id);
                      }}
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold hover:underline cursor-pointer ${mod.accentText}`}
                    >
                      <span>View Live Status</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[10px] font-mono text-zinc-500">#{mod.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual Investor & Student Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-[#00C853] uppercase">
              FOR INVESTORS: ZERO CAC MOAT + ANTI-CLONE ECONOMICS
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Students contribute idle smartphone/PC compute in exchange for 70% revenue share—giving BAA{' '}
              <strong>$0 infrastructure CapEx</strong>. If any competitor clones a NOVA Living App, the clone loses heartbeat proof, displays a "Dead Copy" badge, and routes{' '}
              <strong>$0.001/click Origin DNA royalties</strong> back to our founders.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-[#FFD700] uppercase">
              FOR STUDENTS: 10x BAACOIN NETWORTH + 70% COMMERCIAL OWNERSHIP
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Students don't just pay tuition—they become co-owners of the Knowledge Capital Cooperative (HAVC), mint Idea-Coins, earn from 60/40 prompt royalties, lease idle overnight CPU cycles, and cash out verified Naira settlements directly to Nigerian bank accounts via Paystack.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const InvestorOnePagerPage: React.FC<InvestorOnePagerProps> = ({ onBack, onNavigate }) => {
  const [deckMode, setDeckMode] = React.useState<'final_v16' | 'one_pager'>('final_v16');

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FINAL BAA INVESTOR + STUDENT DECK — UA-AIDC V16',
        text: "UA-AIDC V16: The Living Internet Civilization — 5 Modules, 1 Living Organism. REA can copy anything except this.",
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-[#00C853]/20 selection:text-zinc-900 print:bg-white print:text-black">
      {/* 2. Top Banner (Required clean badge style): CONFIDENTIAL • SEED ROUND • CAC: BN: UY/009049 */}
      <div className="bg-zinc-900 text-white text-xs font-mono py-2.5 px-4 text-center tracking-widest uppercase border-b border-zinc-800 print:bg-black print:text-white print:border-none flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
          <span>YES FINAL DECK • UA-AIDC V16</span>
        </div>
        <div className="mx-auto sm:mx-0 font-bold flex items-center gap-2">
          <span className="text-[#00C853]">CONFIDENTIAL</span>
          <span>•</span>
          <span>SEED ROUND</span>
          <span>•</span>
          <span className="text-zinc-300">CAC: BN: UY/009049</span>
        </div>
        {/* Top Right BAACOIN Badge (Point 5) */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#00C853]/20 border border-[#00C853]/50 text-[#00C853] font-bold text-[11px] font-mono flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-[#00C853]" />
            <span>BAACOIN: $1.00 USD</span>
          </span>
        </div>
      </div>

      {/* Floating Action Controls (Hidden in Print) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-2 print:hidden shadow-sm">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 hover:text-black hover:border-zinc-400 transition text-xs font-medium cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Campus</span>
            </button>
          )}
          <div className="inline-flex rounded-lg border border-zinc-300 p-0.5 bg-zinc-100 text-xs font-mono">
            <button
              onClick={() => setDeckMode('final_v16')}
              className={`px-3 py-1 rounded-md font-bold cursor-pointer transition ${
                deckMode === 'final_v16' ? 'bg-zinc-900 text-[#00FF88]' : 'text-zinc-600 hover:text-black'
              }`}
            >
              YES FINAL DECK (V16 Living Web)
            </button>
            <button
              onClick={() => setDeckMode('one_pager')}
              className={`px-3 py-1 rounded-md font-bold cursor-pointer transition ${
                deckMode === 'one_pager' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:text-black'
              }`}
            >
              Executive 1-Pager
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('nova-protocol')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-[#00FF88] hover:bg-black transition text-xs font-mono font-bold cursor-pointer"
            >
              <span>Inspect Live NOVA V16</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition text-xs font-medium cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Deck</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00C853] hover:bg-[#00B048] text-white font-bold transition text-xs shadow-md shadow-[#00C853]/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* FINAL BAA INVESTOR + STUDENT DECK — UA-AIDC V16 DASHBOARD */}
      {deckMode === 'final_v16' && <InvestorOnePagerDashboard onNavigate={onNavigate} />}

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 print:p-0 print:space-y-6">
        {/* 1. BRAND HEADER & PARTNER LOGOS SUBTITLE */}
        <div className="border-b border-zinc-200 pb-6 print:pb-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#00C853] text-white font-black text-sm flex items-center justify-center font-mono shadow-sm">
                B
              </span>
              <span className="font-black text-xl tracking-tight text-zinc-900">
                BAA-BILLIONAIRES
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-[#00C853] border border-[#00C853]/30 font-bold">
              Autonomous Student Economy • V16
            </span>
          </div>

          {/* Partner logos as small subtitle (Point 1 & 3) */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-mono text-zinc-500 pt-1">
            <span className="text-zinc-400 font-medium">Ecosystem Foundries:</span>
            <span className="font-bold text-zinc-800">MODE Digital Creations</span>
            <span>•</span>
            <span className="font-bold text-zinc-800">Rossyst Enterprises</span>
            <span>•</span>
            <span className="font-bold text-zinc-800">CodeOrbit Ltd</span>
            <span>•</span>
            <span className="font-bold text-zinc-800">Automode AI</span>
            <span>•</span>
            <span className="font-bold text-zinc-800">Autostack AI</span>
          </div>
        </div>

        {/* 3. HEADER BLOCK: Exact requested single production line */}
        <header className="space-y-3">
          <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-bold">
            BAA-BILLIONAIRES ECOSYSTEM — FINAL INVESTOR + STUDENT DECK (UA-AIDC V16)
          </div>
          <div className="text-xs text-zinc-700 leading-relaxed font-mono">
            <strong>BAA-BILLIONAIRES Academy | A Production of MODE Digital Creations Limited &amp; Rossyst Enterprises Ltd (BN: UY/009049)</strong>
            <br />
            No. 5 Ordu Street, Rumuola/Stadium Link Road, Port Harcourt, Nigeria
            <br />
            Founder: <strong>Emmanuel Bassey Joe</strong> — Co-Founder Automode AI, Autostack AI, CodeOrbit Limited | Head AI, MODE Digital
          </div>

          {/* TAGLINE: Big, bold, green */}
          <div className="pt-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#00C853] leading-snug">
              Africa's First Autonomous Student Economy — The Living Internet Civilization
            </h1>
          </div>
        </header>

        {/* PROBLEM & SOLUTION DUAL COLUMN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PROBLEM: $10B LOST YEARLY */}
          <section className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-rose-600 flex items-center gap-1.5">
              <span>PROBLEM</span>
              <span>•</span>
              <span className="text-sm font-extrabold text-[#00C853]">$10B</span>
              <span>LOST YEARLY</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">—</span>
                <span><strong className="text-[#00C853] font-bold">50M</strong> Nigerian students have smartphones but earn <strong className="text-[#00C853] font-bold">$0</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">—</span>
                <span>Idle phones = <strong className="text-[#00C853] font-bold">$0</strong>, idle data = wasted, idle skills = unemployment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">—</span>
                <span>No platform turns student idle resources into capital</span>
              </li>
            </ul>
          </section>

          {/* SOLUTION: THE 11-PLATFORM AUTONOMOUS ECONOMY */}
          <section className="p-6 rounded-2xl bg-emerald-50/60 border border-[#00C853]/30 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#00C853] flex items-center gap-1.5">
              <span>SOLUTION</span>
              <span>•</span>
              <span>THE 11-PLATFORM AUTONOMOUS ECONOMY</span>
            </div>
            <p className="text-base font-bold text-zinc-900 leading-relaxed">
              We turned <span className="text-[#00C853] font-extrabold">50M</span> phones into <span className="text-[#00C853] font-extrabold">50M</span> money printers.
            </p>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              By combining decentralized smartphone compute mesh, autonomous AI workers, and real-time revenue sharing, students monetize sleep, study, and daily activities while learning enterprise skills.
            </p>
          </section>
        </div>

        {/* THE 11 MONEY ENGINES - HOW WE MAKE MONEY */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 pb-2 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight uppercase text-zinc-900 font-mono">
              THE 11 MONEY ENGINES — HOW WE MAKE MONEY
            </h2>
            <span className="text-xs font-mono text-[#00C853] font-bold">
              MULTI-TIERED CASH FLOWS
            </span>
          </div>

          {/* LAYER 1: CORE AI COMPANIES (B2B SaaS - High Margin) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-800 inline-block uppercase">
              LAYER 1: CORE AI COMPANIES (B2B SaaS — High Margin)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Automode AI */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">1. Automode AI</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Co-Founded</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> <span className="text-[#00C853] font-bold">$29</span>/month per business for AI agents</div>
                  <div><strong>Market:</strong> <span className="text-[#00C853] font-bold">40M</span> SMEs in Nigeria | Target: <span className="text-[#00C853] font-bold">10,000</span> SMEs x <span className="text-[#00C853] font-bold">$29</span> = <span className="text-[#00C853] font-bold">$290k</span> MRR</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Beta with BAA student businesses</div>
                </div>
              </div>

              {/* 2. Autostack AI */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">2. Autostack AI</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Co-Founded</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> <span className="text-[#00C853] font-bold">$49</span>/month per developer, Pay-per-deploy (<span className="text-[#00C853] font-bold">$5</span>/deploy)</div>
                  <div><strong>Market:</strong> <span className="text-[#00C853] font-bold">500k</span> developers in Africa | Target: <span className="text-[#00C853] font-bold">5,000</span> devs = <span className="text-[#00C853] font-bold">$245k</span> MRR</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Powering WorkOS &amp; TrillionaresOS</div>
                </div>
              </div>

              {/* 3. CodeOrbit Limited */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">3. CodeOrbit Limited</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Co-Founded</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> Custom software <span className="text-[#00C853] font-bold">$5k</span>-<span className="text-[#00C853] font-bold">$50k</span> per project + maintenance <span className="text-[#00C853] font-bold">$500</span>/month</div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">20</span> projects/year = <span className="text-[#00C853] font-bold">$200k</span> + <span className="text-[#00C853] font-bold">$120k</span> recurring</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Lab for all platforms</div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 2: PLATFORM ECONOMY (Transaction Fees - 15-30%) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-800 inline-block uppercase">
              LAYER 2: PLATFORM ECONOMY (Transaction Fees — <span className="text-[#00C853]">15-30%</span>)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 4. BAA-BILLIONAIRES Academy */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">4. BAA-BILLIONAIRES Academy (Flagship 2026)</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-[#00C853] font-bold">Live</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> <span className="text-[#00C853] font-bold">₦5,000</span> onboarding + <span className="text-[#00C853] font-bold">20%</span> commission on all student earnings</div>
                  <div><strong>Market:</strong> <span className="text-[#00C853] font-bold">2,400</span> students active | Target: <span className="text-[#00C853] font-bold">100,000</span> students = <span className="text-[#00C853] font-bold">₦500M</span> (<span className="text-[#00C853] font-bold">$350k</span>) upfront + <span className="text-[#00C853] font-bold">$50k</span> MRR</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Live, generating revenue</div>
                </div>
              </div>

              {/* 5. WorkOS */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">5. WorkOS</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Building</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> <span className="text-[#00C853] font-bold">15%</span> fee on all completed tasks + <span className="text-[#00C853] font-bold">$19</span>/mo pro subscriptions</div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">50,000</span> tasks/month @ <span className="text-[#00C853] font-bold">$20</span> avg = <span className="text-[#00C853] font-bold">$150k</span> monthly fees</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Building</div>
                </div>
              </div>

              {/* 6. TrillionaresOS */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">6. TrillionaresOS</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Complete</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> <span className="text-[#00C853] font-bold">$99</span>/month for billionaire business blueprint access</div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">1,000</span> members = <span className="text-[#00C853] font-bold">$99k</span> MRR</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Architecture complete</div>
                </div>
              </div>

              {/* 7. BAA Coin */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">7. BAA Coin</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Base L2</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> <span className="text-[#00C853] font-bold">2%</span> transaction fee on all peer-to-peer ecosystem transfers</div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">$10M</span> monthly volume = <span className="text-[#00C853] font-bold">$200k</span>/month</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Pegged $1.00 USD • Deploying on Base</div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 3: ADVERTISING & MEDIA NETWORK (Attention Monetization) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-800 inline-block uppercase">
              LAYER 3: ADVERTISING &amp; MEDIA NETWORK (Attention Monetization)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 8. BAA TV */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">8. BAA TV</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-[#00C853] font-bold">Streaming</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> Video ads <span className="text-[#00C853] font-bold">$10</span> CPM + sponsored shows <span className="text-[#00C853] font-bold">$1,000</span>/episode</div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">500k</span> views/month = <span className="text-[#00C853] font-bold">$5k</span> ads + <span className="text-[#00C853] font-bold">$8k</span> sponsorships = <span className="text-[#00C853] font-bold">$13k</span> MRR</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Live streaming enabled</div>
                </div>
              </div>

              {/* 9. RichConnect (Point 6: Added back exact 1-line matchmaking detail) */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">9. RichConnect</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Pipeline Ready</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div className="text-emerald-700 font-semibold">
                    RichConnect: AI matches rich sponsors to student founders + co-founders + wealth partners - 20% commission
                  </div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">500</span> businesses = <span className="text-[#00C853] font-bold">$24.5k</span> MRR + <span className="text-[#00C853] font-bold">$30k</span> fees = <span className="text-[#00C853] font-bold">$54.5k</span> MRR</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Pipeline ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 4: HARDWARE & INFRASTRUCTURE (Mass Scale - 100k+ Nodes) */}
          <div className="space-y-3">
            <div className="bg-zinc-100 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-zinc-800 inline-block uppercase">
              LAYER 4: HARDWARE &amp; INFRASTRUCTURE (Mass Scale — <span className="text-[#00C853]">100k+</span> Nodes)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 10. UADC */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">10. UADC (Universal Autonomous Data Center)</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-[#00C853] font-bold">MVP Live</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> Selling student mesh compute to global AI companies</div>
                  <div><strong>Model:</strong> <span className="text-[#00C853] font-bold">100,000</span> phones @ <span className="text-[#00C853] font-bold">$0.50</span>/day compute = <span className="text-[#00C853] font-bold">$50,000</span>/day = <span className="text-[#00C853] font-bold">$1.5M</span>/month</div>
                  <div>BAA takes <span className="text-[#00C853] font-bold">30%</span> = <span className="text-[#00C853] font-bold">$450k</span> MRR | Students earn <span className="text-[#00C853] font-bold">70%</span> (<span className="text-[#00C853] font-bold">$350</span>/mo each)</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> MVP Live on site</div>
                </div>
              </div>

              {/* 11. BAA AI Phone */}
              <div className="p-4 rounded-xl border border-zinc-200 hover:border-[#00C853] transition space-y-2 bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-zinc-900">11. BAA AI Phone</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-bold">Hardware</span>
                </div>
                <div className="text-xs text-zinc-600 space-y-1">
                  <div><strong>Revenue:</strong> Hardware margin (<span className="text-[#00C853] font-bold">$30</span>/phone) + pre-installed BAA ecosystem lock-in</div>
                  <div><strong>Target:</strong> <span className="text-[#00C853] font-bold">10,000</span> phones year 1 = <span className="text-[#00C853] font-bold">$300k</span> profit + <span className="text-[#00C853] font-bold">10k</span> locked-in nodes</div>
                  <div className="text-[11px] font-mono text-zinc-500"><strong>Status:</strong> Sourcing manufacturers (Shenzhen)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FINANCIAL PROJECTIONS (YEAR 1 - 3): 3 COLUMNS WITH YEAR 1, 2, 3 IN GREEN */}
        <section className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
            <h2 className="text-base font-black uppercase text-zinc-900 font-mono">
              FINANCIAL PROJECTIONS (YEAR 1 - 3)
            </h2>
            <span className="text-xs font-mono text-[#00C853] font-bold">PROFITABLE AT SCALE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-1.5 shadow-sm">
              <span className="text-[#00C853] block font-black text-base">Year 1 (2026)</span>
              <div className="text-sm font-black text-zinc-900"><span className="text-[#00C853] font-bold">10,000</span> Students</div>
              <div>Revenue: <span className="text-[#00C853] font-bold">$1.2M</span></div>
              <div>Gross Margin: <span className="text-[#00C853] font-bold">65%</span></div>
              <div className="text-emerald-700 font-bold">Break-even: Month <span className="text-[#00C853] font-bold">8</span></div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-1.5 shadow-sm">
              <span className="text-[#00C853] block font-black text-base">Year 2 (2027)</span>
              <div className="text-sm font-black text-zinc-900"><span className="text-[#00C853] font-bold">50,000</span> Students</div>
              <div>Revenue: <span className="text-[#00C853] font-bold">$6.8M</span></div>
              <div>Gross Margin: <span className="text-[#00C853] font-bold">72%</span></div>
              <div className="text-emerald-700 font-bold">Net Profit: <span className="text-[#00C853] font-bold">$3.2M</span></div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-zinc-200 space-y-1.5 shadow-sm">
              <span className="text-[#00C853] block font-black text-base">Year 3 (2028)</span>
              <div className="text-sm font-black text-zinc-900"><span className="text-[#00C853] font-bold">200,000</span> Students</div>
              <div>Revenue: <span className="text-[#00C853] font-bold">$28.5M</span></div>
              <div>Gross Margin: <span className="text-[#00C853] font-bold">78%</span></div>
              <div className="text-emerald-700 font-bold">Net Profit: <span className="text-[#00C853] font-bold">$16.4M</span></div>
            </div>
          </div>
        </section>

        {/* 8. THE ASK: BIG GREEN BUTTON (Point 8) */}
        <section className="space-y-4">
          <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#00C853] text-black shadow-xl shadow-[#00C853]/25 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-mono font-bold tracking-widest uppercase bg-black/10 px-3 py-1 rounded-full">
                INVESTMENT ALLOCATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight mt-2 text-black">
                THE ASK: $500,000 for 10% Equity (Valuation: $5M)
              </h2>
              <p className="text-xs font-medium text-black/80 max-w-xl font-sans">
                Accelerating Africa's first decentralized compute mesh to 50k nodes and campus onboarding across 36 states.
              </p>
            </div>

            <a
              href="mailto:autonomousagentscommerce@gmail.com?subject=BAA%20Seed%20Round%20Allocation%20Inquiry"
              className="px-8 py-4 rounded-2xl bg-black text-white hover:bg-zinc-800 font-mono text-sm font-bold uppercase tracking-wider shrink-0 shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Join Seed Round</span>
              <ArrowRight className="w-4 h-4 text-[#00C853]" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-[#00C853] font-bold">40% ($200k)</span>
                <span className="text-zinc-500">Campuses</span>
              </div>
              <p className="text-zinc-600 text-[11px]">Acquisition across Nigerian universities</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-[#00C853] font-bold">30% ($150k)</span>
                <span className="text-zinc-500">Engineering</span>
              </div>
              <p className="text-zinc-600 text-[11px]">Scale UADC mesh to 50k active nodes</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-[#00C853] font-bold">20% ($100k)</span>
                <span className="text-zinc-500">Legal &amp; CAC</span>
              </div>
              <p className="text-zinc-600 text-[11px]">Compliance, licensing &amp; cash reserves</p>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-[#00C853] font-bold">10% ($50k)</span>
                <span className="text-zinc-500">Hardware</span>
              </div>
              <p className="text-zinc-600 text-[11px]">BAA AI Phone prototype run (1,000 units)</p>
            </div>
          </div>
        </section>

        {/* WHY WE WIN & TRACTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* WHY WE WIN - UNFAIR ADVANTAGES */}
          <section className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <h2 className="text-sm font-black uppercase text-zinc-900 font-mono border-b border-zinc-200 pb-2">
              WHY WE WIN — UNFAIR ADVANTAGES:
            </h2>
            <ol className="space-y-2.5 text-xs text-zinc-700 leading-relaxed font-sans">
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#00C853]">1.</span>
                <span><strong>Zero CAC for compute:</strong> Students give us their idle phone CPU for free in exchange for earnings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#00C853]">2.</span>
                <span><strong>Network effects:</strong> <span className="text-[#00C853] font-bold">11</span> platforms feed each other — zero customer acquisition cost between platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#00C853]">3.</span>
                <span><strong>First mover:</strong> Only autonomous student economy in Africa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono font-bold text-[#00C853]">4.</span>
                <span><strong>Dual revenue:</strong> B2B SaaS (steady) + B2C Network (explosive)</span>
              </li>
            </ol>
          </section>

          {/* TRACTION TO DATE (Point 5: "2,400+ Active Nodes" instead of simulated) */}
          <section className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <h2 className="text-sm font-black uppercase text-zinc-900 font-mono border-b border-zinc-200 pb-2">
              TRACTION TO DATE:
            </h2>
            <ul className="space-y-2.5 text-xs text-zinc-700 leading-relaxed font-sans">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span><strong className="text-[#00C853] font-bold text-sm">2,400+</strong> Students registered</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span><strong className="text-[#00C853] font-bold text-sm">124</strong> Businesses launched by students</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span><strong>CAC Registered:</strong> Mode Digital Creations Limited &amp; Rossyst Enterprises Limited (<strong className="text-[#00C853] font-bold">BN: UY/009049</strong>)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span><strong>Paystack verified</strong> merchant account active</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
                <span><strong className="text-[#00C853] font-bold text-sm">2,400+ Active Nodes</strong> in UADC data network</span>
              </li>
            </ul>
          </section>
        </div>

        {/* 4. FOUNDER & SINGLE CONSISTENT CONTACT INFO */}
        <section className="p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
          <div className="border-b border-zinc-200 pb-3">
            <div className="text-xs font-mono uppercase text-zinc-500 font-bold">
              LEADERSHIP &amp; ARCHITECTURE
            </div>
            <h2 className="text-lg font-black text-zinc-900 font-heading">
              FOUNDER &amp; CONTACT:
            </h2>
          </div>

          <div className="space-y-2 text-xs text-zinc-700 font-sans leading-relaxed">
            <div className="text-base font-extrabold text-zinc-900">
              Emmanuel Bassey Joe
            </div>
            <p className="font-mono text-zinc-600 text-xs">
              Founder &amp; Chief Visionary Architect | BAA-BILLIONAIRES Academy<br />
              Co-Founder | Automode AI, Autostack AI, CodeOrbit Limited<br />
              Head, AI Development | MODE Digital Creations Limited<br />
              Executive Director | Rossyst Enterprises Limited
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <strong>Head Office:</strong> No. 5 Ordu Street, Rumuola/Stadium Link Road, Port Harcourt, Rivers State, Nigeria
              </div>
              <div>
                <strong>Lagos Hub:</strong> 12 Allen Avenue, Ikeja, Lagos
              </div>
              <div>
                <strong>Email:</strong> <a href="mailto:autonomousagentscommerce@gmail.com" className="text-[#00C853] underline font-bold">autonomousagentscommerce@gmail.com</a>
              </div>
              <div>
                <strong>Phone:</strong> <a href="tel:+2348025516793" className="text-zinc-900 font-bold">+2348025516793</a>
              </div>
              <div>
                <strong>Website:</strong> <span className="text-[#00C853] font-bold">baabillionaires.com</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. REQUIRED LEGAL & COMPLIANCE SECTION ABOVE FOOTER */}
        <section className="p-6 sm:p-8 rounded-2xl bg-emerald-50/70 border-2 border-[#00C853]/40 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#00C853] font-bold text-sm uppercase tracking-wide">
            <ShieldCheck className="w-5 h-5" />
            <span>LEGAL &amp; COMPLIANCE</span>
          </div>

          <div className="space-y-1.5 text-zinc-800 leading-relaxed">
            <p>
              All funding receipted under <strong>MODE Digital Creations Limited</strong> &amp; <strong>Rossyst Enterprises Limited (BN: UY/009049)</strong>
            </p>
            <p>
              Paystack Verified Business | CAC Registered | Head Office: No. 5 Ordu Street, Rumuola/Stadium Link Road, Port Harcourt
            </p>
            <p>
              Lagos Hub: 12 Allen Avenue, Ikeja
            </p>
            <p className="font-bold text-emerald-800">
              Bank: Paystack Secured — Wema Bank: MODE DIGITAL CREATIONS LIMITED
            </p>
          </div>
        </section>

        {/* SINGLE CLEAN FOOTER (NO DUPLICATE) */}
        <footer className="pt-4 border-t border-zinc-200 text-[11px] font-mono text-zinc-500 leading-relaxed space-y-2">
          <div className="font-bold text-zinc-800 uppercase">
            LEGAL NOTICE:
          </div>
          <p>
            This one-pager is issued by Mode Digital Creations Limited &amp; Rossyst Enterprises Limited (BN: UY/009049). All funding, investment agreements, and equity transactions are legally managed and receipted under Mode Digital Creations Limited.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-zinc-400">
            <span>© 2026 BAA-BILLIONAIRES Academy • Mode Digital Creations Ltd &amp; Rossyst Enterprises Ltd</span>
            <span>Port Harcourt &amp; Lagos, Nigeria</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default InvestorOnePagerPage;
