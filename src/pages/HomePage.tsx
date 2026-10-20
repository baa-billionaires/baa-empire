import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { HeroSphere } from '../components/HeroSphere';
import { Baa4DEcosystemHero } from '../components/Baa4DEcosystemHero';
import {
  Coins,
  Radar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  GraduationCap,
  BookOpen,
  Award,
  Zap,
  TrendingUp,
  Globe2,
  Users,
  ChevronRight,
  Flame,
  Star,
  Orbit
} from 'lucide-react';

import { InternalAdRenderer } from '../components/InternalAdRenderer';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentPage, onSelectCourse }) => {
  const { courses, enrollInCourse, scoutStats } = useEcosystem();
  const [selectedPillar, setSelectedPillar] = useState<'academy' | 'university' | 'datacenter'>('academy');
  const [calcPrice, setCalcPrice] = useState(99);

  // Featured 6 courses for homepage carousel/grid
  const featuredCourses = courses.slice(0, 6);

  const handleEnrollNow = (courseId: string) => {
    enrollInCourse(courseId);
    onSelectCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 overflow-hidden">
      {/* Top Internal Promotional Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <InternalAdRenderer
          position="homepage_hero"
          onCtaClick={() => setCurrentPage('academy')}
        />
      </div>

      {/* 1. HERO SECTION WITH 4D WEBGL SHADER SOLAR SYSTEM & LIVE TELEMETRY */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 cyber-grid">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Top Hero Headline & Quick Value Props */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-8 space-y-5 text-left">
              {/* Autonomous Status Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-[#FFD700]/40 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono text-[#FFD700] font-bold">
                  AI Scout Active: {scoutStats.discovered.toLocaleString()} Leads Discovered Today
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight text-white leading-[1.08]">
                The Trillion-Dollar{' '}
                <span className="bg-gradient-to-r from-[#FFF275] via-[#FFD700] to-[#E5A800] bg-clip-text text-transparent">
                  Autonomous
                </span>{' '}
                AI &amp; Blockchain University
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl font-sans">
                Learn-to-Mine with our <span className="text-[#FFD700] font-bold">10x BaaCoin Networth System</span>. Enroll for $99, instantly receive 990 BaaCoin ($990 networth), mine cryptocurrency as you learn, and command Africa's sovereign 4D autonomous data center.
              </p>

              {/* BaaCoin 10x Networth Quick Calculation Banner */}
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-[#FFD700]/30 shadow-lg shadow-[#FFD700]/5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                    <Coins className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Autonomous Guarantee
                    </span>
                    <span className="text-sm font-bold text-white">
                      $99 Tuition = <span className="text-[#FFD700]">990 BaaCoin Networth</span> (10x Value)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-1 rounded-full border border-[#00D4FF]/30">
                    Unlocked on Graduation
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => setCurrentPage('academy')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-xl shadow-[#FFD700]/20 flex items-center gap-2"
                >
                  <span>Explore 100 Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('uadc-lab')}
                  className="px-6 py-3.5 rounded-xl bg-[#00FF88]/15 border border-[#00FF88]/50 hover:bg-[#00FF88]/25 text-[#00FF88] font-mono text-xs uppercase tracking-wider font-bold transition flex items-center gap-2 shadow-lg shadow-[#00FF88]/10"
                >
                  <Cpu className="w-4 h-4 text-[#00FF88]" />
                  <span>Enter UADC Lab 🧠</span>
                </button>

                <button
                  onClick={() => setCurrentPage('investor-one-pager')}
                  className="px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00C853] text-white font-mono text-xs uppercase tracking-wider hover:bg-zinc-800 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#00C853]" />
                  <span>Investor Deck ($500k)</span>
                </button>
              </div>
            </div>

            {/* Quick Micro Telemetry */}
            <div className="lg:col-span-4 bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Ecosystem Telemetry
                </span>
                <span className="text-[10px] font-mono text-zinc-500">4D LIVE</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Total Courses:</span>
                  <span className="text-white font-bold text-sm">100 Master Classes</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Networth / Student:</span>
                  <span className="text-[#FFD700] font-bold text-sm">$990 (990 BaaCoin)</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Mesh Idle CPUs:</span>
                  <span className="text-[#00FF88] font-bold text-sm">4,892 Phones Staked</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <span className="text-zinc-400">Legal Entity:</span>
                  <span className="text-zinc-300 font-bold text-[11px]">BN: UY/009049</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4D-STYLE ANIMATED HERO BANNER COMPONENT */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <Orbit className="w-4 h-4 text-[#00FF88]" />
                <span className="text-white font-bold uppercase tracking-wider">
                  Interactive 4D Planetary Engine
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-emerald-400">Rotate &amp; Inspect Any of the 11 Solar Bodies</span>
              </div>
              <span className="text-[11px] font-mono text-[#FFD700] hidden sm:inline">
                Three.js + GLSL WebGL Shaders + Framer Motion
              </span>
            </div>

            <Baa4DEcosystemHero
              onNavigate={setCurrentPage}
              onSelectCourse={onSelectCourse}
            />
          </div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS OF THE ECOSYSTEM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#FFD700] tracking-widest uppercase font-bold">
              Autonomous Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-white mt-2">
              Three Pillars of Sovereign African AI
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              An interconnected ecosystem combining consumer wealth creation, accredited university degrees, and sovereign continental AI compute.
            </p>

            {/* Pillar Selector Tabs */}
            <div className="flex justify-center mt-6">
              <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
                <button
                  onClick={() => setSelectedPillar('academy')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    selectedPillar === 'academy'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>I. Billionaires AI Academy</span>
                </button>

                <button
                  onClick={() => setSelectedPillar('university')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    selectedPillar === 'university'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>II. Africa Blockchain University</span>
                </button>

                <button
                  onClick={() => setSelectedPillar('datacenter')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    selectedPillar === 'datacenter'
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>III. Autonomous Data Center</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Pillar Showcase */}
          {selectedPillar === 'academy' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#FFD700]/50 transition">
                <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] mb-4">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">BaaCoin 10x Networth</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Students don't just spend tuition—they invest in their balance sheet. Every $99 enrolled grants 990 BaaCoin networth. 20% unlocks immediately on capstone graduation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#00D4FF]/50 transition">
                <div className="w-12 h-12 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Learn-to-Mine Architecture</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Every interaction—watching video lectures, asking AI tutors questions, and completing assignments—acts as a proof-of-work mining node generating live BaaCoin.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/50 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">NFT Certificate with Chip</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Graduates receive an on-chain canvas-rendered NFT Certificate featuring an engraved BaaCoin Chip, IPFS provenance hash, and lifetime 10% referral royalties.
                </p>
              </div>
            </div>
          )}

          {selectedPillar === 'university' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-lg font-bold text-white font-heading">B.Sc. &amp; M.Sc. in Autonomous AI</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Formal academic accreditation covering neural systems, agentic architectures, multi-modal workflows, and sovereign African models.
                </p>
                <button
                  onClick={() => setCurrentPage('university')}
                  className="mt-4 text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1"
                >
                  View University Curriculum <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-lg font-bold text-white font-heading">School of Cryptography &amp; DeFi</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Deep-dive research into cross-border African remittances, non-custodial liquidity protocols, and sovereign CBDC integrations.
                </p>
                <button
                  onClick={() => setCurrentPage('university')}
                  className="mt-4 text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1"
                >
                  View Research Labs <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-lg font-bold text-white font-heading">Plug &amp; Play AI Tutors</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Over 20 autonomous AI professors embeddable into any African school portal via iframe for $99/mo, delivering 24/7 student mentoring.
                </p>
                <button
                  onClick={() => setCurrentPage('marketplace')}
                  className="mt-4 text-xs font-mono text-[#FFD700] hover:underline flex items-center gap-1"
                >
                  Hire AI Tutors for Schools <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {selectedPillar === 'datacenter' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-lg font-bold text-white font-heading">100% Renewable Green Grid</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Co-located with Kainji hydroelectric and Sahara solar grids to provide ultra-low carbon compute at 1.08 PUE efficiency.
                </p>
                <button
                  onClick={() => setCurrentPage('datacenter')}
                  className="mt-4 text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                >
                  Inspect Power Grid <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-lg font-bold text-white font-heading">H100 &amp; B200 Autonomous Clusters</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Self-healing hardware nodes with AI automated failover, dynamic load rebalancing, and direct on-chain compute leasing.
                </p>
                <button
                  onClick={() => setCurrentPage('datacenter')}
                  className="mt-4 text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1"
                >
                  Live Cluster Telemetry <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <h3 className="text-lg font-bold text-white font-heading">Institutional Investor Allocations</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Seed infrastructure notes offering 24% projected IRR backed by physical African infrastructure and sovereign data guarantees.
                </p>
                <button
                  onClick={() => setCurrentPage('datacenter')}
                  className="mt-4 text-xs font-mono text-[#FFD700] hover:underline flex items-center gap-1"
                >
                  Download Executive Deck <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. FEATURED COURSES CAROUSEL / GRID (FROM 100 SEEDED COURSES) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono text-[#FFD700] tracking-widest uppercase font-bold">
                100 Seeded Courses
              </span>
              <h2 className="text-3xl font-heading font-black text-white mt-1">
                Elite High-Income Masterclasses
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Every course is paired with 10x BaaCoin Networth, live Learn-to-Mine, and 60/40 Marketplace monetization.
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('academy')}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#FFD700] text-xs font-mono text-zinc-300 hover:text-white transition flex items-center gap-2 shrink-0"
            >
              <span>View All 100 Courses</span>
              <ArrowRight className="w-4 h-4 text-[#FFD700]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((c) => (
              <div
                key={c.id}
                className="group relative bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#FFD700]/50 overflow-hidden transition-all duration-300 flex flex-col shadow-xl"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                  <img
                    src={c.thumbnail_url}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono text-zinc-300">
                    {c.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-[#FFD700] text-black px-2.5 py-1 rounded-full font-mono font-bold text-[11px]">
                    ${c.price}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-[#FFD700] transition">
                      {c.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-zinc-900 space-y-3">
                    {/* 10x Networth Highlight */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">Networth Value:</span>
                      <span className="text-[#FFD700] font-bold">
                        +{c.baacoin_value} BaaCoin (${c.baacoin_value})
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEnrollNow(c.id)}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition text-center"
                      >
                        Enroll &amp; Mine
                      </button>

                      <button
                        onClick={() => onSelectCourse(c.id)}
                        className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono"
                        title="View Course Details"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE BAACOIN 10X NETWORTH CALCULATOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-4xl mx-auto bg-zinc-950 border border-[#FFD700]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-mono text-[#00D4FF] font-bold uppercase tracking-wider">
              Tokenomics Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              Calculate Your Instant 10x BaaCoin Networth
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              See exactly how your tuition multiplies by 10 into BaaCoin collateral, and what unlocks upon graduation.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-zinc-400">Select Tuition Amount:</span>
                <span className="text-[#FFD700] font-bold text-base">${calcPrice} USD</span>
              </div>
              <input
                type="range"
                min="49"
                max="299"
                step="50"
                value={calcPrice}
                onChange={(e) => setCalcPrice(Number(e.target.value))}
                className="w-full accent-[#FFD700] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                <span>$49 (Starter)</span>
                <span>$99 (Popular)</span>
                <span>$199 (Advanced)</span>
                <span>$299 (Executive)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">You Invest</span>
                <span className="text-xl font-bold text-white block mt-1">${calcPrice}</span>
                <span className="text-[10px] text-zinc-500">100 Courses Available</span>
              </div>

              <div className="p-4 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/40 text-center">
                <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">10x Networth Granted</span>
                <span className="text-2xl font-black text-[#FFD700] block mt-1">
                  {calcPrice * 10} BaaCoin
                </span>
                <span className="text-[10px] text-amber-300 font-mono">(${calcPrice * 10} Collateral Value)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-center">
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase font-bold">Graduation 20% Liquid</span>
                <span className="text-xl font-bold text-white block mt-1">
                  {(calcPrice * 10 * 0.2).toFixed(0)} BaaCoin
                </span>
                <span className="text-[10px] text-cyan-300 font-mono">Immediate Spendable + Daily Vest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS & SOVEREIGN IMPACT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#FFD700] tracking-widest uppercase font-bold">
              Autonomous Proof
            </span>
            <h2 className="text-3xl font-heading font-black text-white mt-1">
              From Non-Code to AI Millionaires
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1 text-[#FFD700] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "The BaaCoin 10x Networth system completely changed my financial reality. When I graduated from the 'AI Instagram Millionaire' course, my prompt package sold 180 times in the Marketplace! I make 60% royalty every single day."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFD700]/20 flex items-center justify-center font-bold text-[#FFD700] text-xs">
                  TB
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Tunde Bakare</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">Lagos, Nigeria • Graduate #042</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1 text-[#FFD700] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "We hired Prof. Adaeze AI Tutor for our university's computer science department. For $99/mo, 1,200 students get 24/7 personalized code reviews and Solidity auditing. It's truly autonomous."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00D4FF]/20 flex items-center justify-center font-bold text-[#00D4FF] text-xs">
                  KD
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Prof. Kwame Danquah</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">Accra, Ghana • Dean of Computing</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800">
              <div className="flex items-center gap-1 text-[#FFD700] mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFD700]" />
                ))}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed italic">
                "The NFT Certificate with the BaaCoin Chip is genius. I showed my on-chain verified hash to an international client and closed a $5,000/month autonomous consulting contract instantly."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400 text-xs">
                  FO
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Fatima Oumar</h4>
                  <span className="text-[10px] text-zinc-400 font-mono">Nairobi, Kenya • Web3 Consultant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-black via-zinc-950 to-black relative">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-xs font-mono text-[#FFD700]">
            <Flame className="w-4 h-4 text-[#FFD700]" />
            <span>Autonomous Cohort 2026 Open</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Claim Your 10x BaaCoin Networth &amp; Begin Mining Today
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Join thousands of African and global builders unlocking high-income AI skills, autonomous agents, and lifetime royalty prompt packages.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('academy')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-2xl shadow-[#FFD700]/25"
            >
              Browse 100 Courses Now
            </button>

            <button
              onClick={() => setCurrentPage('free')}
              className="px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-xs uppercase tracking-wider hover:bg-zinc-800 transition"
            >
              Download Free Resources
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
