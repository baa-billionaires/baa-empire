import React, { useState } from 'react';
import {
  Brain,
  Cpu,
  Layers,
  Sparkles,
  Award,
  Globe2,
  ShieldCheck,
  Building2,
  Heart,
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Zap,
  Code2,
  ExternalLink,
  ChevronRight,
  Orbit,
  Star,
  Quote,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export interface ProjectDetail {
  id: string;
  name: string;
  category: 'Co-Founded Tech' | 'Flagship Platform';
  role: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics?: string;
  linkText?: string;
  features?: string[];
  color: string;
}

export const ECOSYSTEM_PROJECTS: ProjectDetail[] = [
  // CO-FOUNDED CORE TECH
  {
    id: 'automode',
    name: '1. Automode AI',
    category: 'Co-Founded Tech',
    role: 'Co-Founder & Chief AI Architect',
    tagline: 'Autonomous AI Agents | Business Automation',
    description: 'Africa\'s first autonomous business automation AI. Automode AI automates entire businesses — from customer service to sales to accounting — using autonomous AI agents. Powering BAA student businesses to run on autopilot.',
    tags: ['Autonomous AI Agents', 'Business Automation', 'Autopilot Enterprise'],
    metrics: 'Powers 120+ Student Autonomous Businesses',
    color: '#00FF88'
  },
  {
    id: 'autostack',
    name: '2. Autostack AI',
    category: 'Co-Founded Tech',
    role: 'Co-Founder & CTO',
    tagline: 'No-Code AI Stack | Developer Platform',
    description: 'The full-stack AI development platform. Autostack allows anyone to build AI apps without coding — drag, drop, deploy. The tech stack behind WorkOS and TrillionaresOS.',
    tags: ['No-Code AI Stack', 'Developer Platform', 'Drag & Drop AI'],
    metrics: 'Full-Stack Foundation for WorkOS & TrillionaresOS',
    color: '#00D4FF'
  },
  {
    id: 'codeorbit',
    name: '3. CodeOrbit Limited',
    category: 'Co-Founded Tech',
    role: 'Co-Founder & Head of Innovation',
    tagline: 'Software Foundry | Enterprise Tech',
    description: 'Orbiting code around Africa. CodeOrbit is a software foundry building enterprise-grade solutions for African businesses. Parent tech lab for MODE Digital Creations projects.',
    tags: ['Software Foundry', 'Enterprise Tech', 'African Software Lab'],
    metrics: 'Parent Lab for MODE Digital Creations Engineering',
    color: '#FFD700'
  },

  // FLAGSHIP ECOSYSTEM PROJECTS
  {
    id: 'baa',
    name: '4. BAA-BILLIONAIRES Academy',
    category: 'Flagship Platform',
    role: 'Founder & Chief Visionary Architect (Flagship 2026)',
    tagline: 'Africa\'s First Autonomous Data Center for Student Businesses',
    description: 'Africa\'s First Autonomous Data Center for student businesses. 2,400+ students, 124 businesses launched. Live at baabillionaires.com',
    tags: ['10x BaaCoin Networth', 'Autonomous Data Center', 'Flagship 2026'],
    metrics: '2,400+ Students • 124 Businesses Launched',
    color: '#FFD700'
  },
  {
    id: 'workos',
    name: '5. WorkOS',
    category: 'Flagship Platform',
    role: 'Founder & Chief Architect',
    tagline: 'Africa\'s Work Operating System',
    description: 'Africa\'s Work Operating System — Skills become sellable micro-services, on-chain resume, and autonomous freelancer fulfillment pipeline.',
    tags: ['Work Operating System', 'Sellable Micro-Services', 'On-Chain Resume'],
    metrics: 'Autonomous Freelance Fulfillment Mesh',
    color: '#00D4FF'
  },
  {
    id: 'trillionaresos',
    name: '6. TrillionaresOS (Trillionaires Operating System)',
    category: 'Flagship Platform',
    role: 'Founder & System Designer',
    tagline: 'The OS for Building Trillion-Naira Economies',
    description: 'The OS for building trillion-naira economies. AI-powered business simulation that turns ideas into fundable businesses in 7 days.',
    tags: ['Trillion-Naira Economy', '7-Day Business Simulation', 'AI Capital Scaling'],
    metrics: '7-Day Zero-to-Funded Pipeline',
    color: '#00FF88'
  },
  {
    id: 'rich-connect',
    name: '7. Rich Connect + Rich Matchmaking',
    category: 'Flagship Platform',
    role: 'Founder & Lead Innovator (UPDATED)',
    tagline: 'AI Matchmaking | Sponsor Marketplace | Co-Founder Matching | Wealth Networking',
    description: 'Africa\'s first AI-powered Rich Matchmaking & Wealth-Connection Engine. "LinkedIn + Paystack + Tinder for wealth building — We match you to your money and your destiny partner."',
    tags: ['AI Matchmaking', 'Sponsor Marketplace', 'Wealth Networking', 'Co-Founder Matching'],
    features: [
      'a) Business Matchmaking: AI matches student founders to sponsors, funders, and customers based on business DNA.',
      'b) Rich Matchmaking: Matches rich mentors, investors, and billionaires to student prodigies (like a dating app but for wealth transfer).',
      'c) Love & Wealth Connect: AI connects compatible co-founders, partners, and power couples who build together.'
    ],
    color: '#FF69B4'
  },
  {
    id: 'abau',
    name: '8. Africa Blockchain and AI University (ABAU)',
    category: 'Flagship Platform',
    role: 'Founder & Chancellor',
    tagline: 'Decentralized Blockchain & AI University on Subnet',
    description: 'Decentralized university on-chain teaching Blockchain + AI Engineering to 100,000 African youths with verifiable NFT certificates.',
    tags: ['Blockchain University', 'AI Engineering', '100,000 Youths'],
    metrics: '100,000 Youths Target • On-Chain Accreditation',
    color: '#FFD700'
  },
  {
    id: 'uadc-protocol',
    name: '9. Universal Autonomous Data Center (UADC) Protocol',
    category: 'Flagship Platform',
    role: 'Chief Architect & Inventor',
    tagline: 'Patent-Pending Autonomous Distributed Supercomputer',
    description: 'Core protocol turning idle phones across Africa into a single autonomous supercomputer. 15 Monetization Engines live on BAA-EMPIRE.',
    tags: ['UADC Protocol', 'Idle Phone Mesh', 'Patent-Pending'],
    metrics: '4,892 Entangled Devices • $1.2M Treasury',
    color: '#00FF88'
  },
  {
    id: 'nyaie',
    name: '10. Nigeria Youth AI Engineering Training (NYAIE)',
    category: 'Flagship Platform',
    role: 'National Coordinator',
    tagline: 'National AI Workforce Pipeline',
    description: 'Training 50,000 Nigerian youths in AI Engineering, prompt engineering, agent architecture, and enterprise software synthesis.',
    tags: ['National Coordinator', '50,000 Nigerian Youths', 'AI Engineering'],
    metrics: '50,000 Nigerian Youths Trained Nationwide',
    color: '#00D4FF'
  },
  {
    id: 'gkap',
    name: '11. Global Kids AI Program (GKAP)',
    category: 'Flagship Platform',
    role: 'Founder & Global Director',
    tagline: 'Teaching AI to Kids 8–16 Worldwide',
    description: 'Teaching AI to kids ages 8 to 16 worldwide. 12 schools already onboarded across Nigeria and international hubs.',
    tags: ['Global Director', 'Ages 8-16', '12 Partner Schools'],
    metrics: '12 Partner Schools Active • Early STEM Cognition',
    color: '#FFD700'
  }
];

export const FounderEcosystemShowcase: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('baa');
  const activeProject = ECOSYSTEM_PROJECTS.find(p => p.id === selectedProjectId) || ECOSYSTEM_PROJECTS[3];

  return (
    <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-10 relative overflow-hidden font-sans">
      {/* Background Matrix Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* FOUNDER EXECUTIVE HEADER */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 pb-8 border-b border-zinc-800/80">
        {/* Founder Portrait & Verified Hologram Ring */}
        <div className="relative shrink-0">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-[#FFD700] p-1.5 bg-gradient-to-br from-zinc-900 to-black shadow-2xl shadow-[#FFD700]/15">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
              alt="Emmanuel Bassey Joe"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition duration-500"
            />
          </div>
          <span className="absolute -bottom-2 inset-x-0 mx-auto w-max px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            11x ARCHITECT
          </span>
        </div>

        {/* Founder Bio, Titles & Badges */}
        <div className="space-y-4 text-center lg:text-left flex-1">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider bg-[#FFD700]/10 px-2.5 py-0.5 rounded-md border border-[#FFD700]/30">
                AFRICA'S AUTONOMOUS ECONOMY ARCHITECT
              </span>
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                11 Interconnected Platforms
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Emmanuel Bassey Joe
            </h1>

            <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-snug">
              Founder &amp; Chief Visionary Architect | <strong className="text-[#FFD700]">BAA-BILLIONAIRES Academy</strong><br className="hidden sm:inline" />
              Co-Founder | <strong className="text-[#00FF88]">Automode AI</strong>, <strong className="text-[#00D4FF]">Autostack AI</strong>, <strong className="text-[#FFD700]">CodeOrbit Limited</strong><br className="hidden sm:inline" />
              Head, AI Development | <strong>MODE Digital Creations Limited</strong><br className="hidden sm:inline" />
              Executive Director | <strong>Rossyst Enterprises Limited (BN: UY/009049)</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl font-sans">
            Emmanuel Bassey Joe is a Nigerian AI leader, serial founder, and architect of Africa's first Autonomous Student Economy. He has founded and co-founded 11 interlinked platforms that turn phones into money printers, skills into capital, and students into billionaires.
          </p>

          {/* 5 OFFICIAL BADGES UNDER NAME */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono text-[11px]">
            <span className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold">
              Co-Founder of 3 AI Companies
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold">
              Founder of 8 Platforms
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/40 text-[#00FF88] font-bold">
              11x Builder
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-[#00D4FF]/10 border border-[#00D4FF]/40 text-[#00D4FF] font-bold">
              UADC Inventor
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/40 text-[#FFD700] font-bold">
              CAC Registered BN: UY/009049
            </span>
          </div>

          <div className="pt-2 flex justify-center lg:justify-start">
            <button
              onClick={() => {
                window.location.hash = 'investor-one-pager';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00C853] hover:bg-[#00B048] text-white font-mono text-xs font-bold transition shadow-lg shadow-[#00C853]/25 cursor-pointer"
            >
              <span>📄 View Official Investor One-Pager Deck ($500k Seed Round)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* VISION QUOTE CARD */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border-2 border-[#FFD700]/40 shadow-2xl">
        <Quote className="w-10 h-10 text-[#FFD700]/20 absolute top-4 right-4" />
        <div className="space-y-3 relative z-10">
          <span className="text-[11px] font-mono font-bold text-[#FFD700] uppercase tracking-wider block">
            VISION ARCHITECTURE DIRECTIVE
          </span>
          <p className="text-base sm:text-lg text-white font-serif italic leading-relaxed">
            &ldquo;I don't build apps. I build economies. Automode AI automates, Autostack AI builds, CodeOrbit orbits code around Africa. Rich Connect matches you to your riches, WorkOS puts you to work, TrillionaresOS makes you a trillionaire. 11 platforms, one mission: Africa must build its own operating system.&rdquo;
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs font-mono text-zinc-400">
            <span className="text-white font-bold">— Emmanuel Bassey Joe</span>
            <span>• Chief Visionary Architect &amp; UADC Protocol Inventor</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE ECOSYSTEM MAP VISUAL: SOLAR SYSTEM */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Orbit className="w-5 h-5 text-[#00FF88]" />
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                THE 11 INTERCONNECTED PLATFORMS — SOLAR SYSTEM ORBIT
              </h2>
            </div>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Click any node in the planetary orbit below to inspect its architecture, corporate legal backing, and technical role.
            </p>
          </div>
          <span className="text-xs font-mono text-[#00FF88] px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30 shrink-0">
            Interactive Orbit Visualizer
          </span>
        </div>

        {/* Solar System SVG Canvas */}
        <div className="relative h-80 sm:h-96 w-full bg-black/90 border border-zinc-800 rounded-3xl overflow-hidden flex items-center justify-center p-4">
          <svg viewBox="0 0 600 400" className="w-full h-full">
            {/* Background Orbits */}
            <circle cx="300" cy="200" r="85" fill="none" stroke="#00FF88" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />
            <circle cx="300" cy="200" r="160" fill="none" stroke="#FFD700" strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />

            {/* Orbit Glows */}
            <circle cx="300" cy="200" r="100" fill="url(#sunGlow)" opacity="0.15" />

            {/* Radial Gradient Defs */}
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Center Star: BAA-BILLIONAIRES */}
            <g
              onClick={() => setSelectedProjectId('baa')}
              className="cursor-pointer group"
            >
              <circle cx="300" cy="200" r="28" fill="#FFD700" className="transition group-hover:scale-110" />
              <circle cx="300" cy="200" r="34" fill="none" stroke="#FFD700" strokeWidth="2" className="animate-ping" opacity="0.4" />
              <text x="300" y="196" fill="#000000" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">BAA</text>
              <text x="300" y="207" fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ACADEMY</text>
              <text x="300" y="240" fill="#FFD700" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">FLAGSHIP CORE 2026</text>
            </g>

            {/* INNER RING: CO-FOUNDED CORE TECH (Radius 85) */}
            {/* 1. Automode AI (Top-Left) */}
            <g onClick={() => setSelectedProjectId('automode')} className="cursor-pointer group">
              <line x1="300" y1="200" x2="230" y2="140" stroke="#00FF88" strokeWidth="1" opacity="0.5" />
              <circle cx="230" cy="140" r="16" fill="#00FF88" className="transition group-hover:scale-125" />
              <text x="230" y="143" fill="#000000" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Automode</text>
              <text x="230" y="120" fill="#00FF88" fontSize="8" fontFamily="monospace" textAnchor="middle">Automode AI</text>
            </g>

            {/* 2. Autostack AI (Top-Right) */}
            <g onClick={() => setSelectedProjectId('autostack')} className="cursor-pointer group">
              <line x1="300" y1="200" x2="370" y2="140" stroke="#00D4FF" strokeWidth="1" opacity="0.5" />
              <circle cx="370" cy="140" r="16" fill="#00D4FF" className="transition group-hover:scale-125" />
              <text x="370" y="143" fill="#000000" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Autostack</text>
              <text x="370" y="120" fill="#00D4FF" fontSize="8" fontFamily="monospace" textAnchor="middle">Autostack AI</text>
            </g>

            {/* 3. CodeOrbit Limited (Bottom) */}
            <g onClick={() => setSelectedProjectId('codeorbit')} className="cursor-pointer group">
              <line x1="300" y1="200" x2="300" y2="285" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
              <circle cx="300" cy="285" r="16" fill="#FFD700" className="transition group-hover:scale-125" />
              <text x="300" y="288" fill="#000000" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CodeOrbit</text>
              <text x="300" y="312" fill="#FFD700" fontSize="8" fontFamily="monospace" textAnchor="middle">CodeOrbit Ltd</text>
            </g>

            {/* OUTER RING: 7 PLATFORMS (Radius 160) */}
            {/* 5. WorkOS */}
            <g onClick={() => setSelectedProjectId('workos')} className="cursor-pointer group">
              <circle cx="150" cy="140" r="13" fill="#00D4FF" className="transition group-hover:scale-125" />
              <text x="150" y="144" fill="#000000" fontSize="6" fontWeight="bold" textAnchor="middle">WorkOS</text>
            </g>

            {/* 6. TrillionaresOS */}
            <g onClick={() => setSelectedProjectId('trillionaresos')} className="cursor-pointer group">
              <circle cx="180" cy="290" r="13" fill="#00FF88" className="transition group-hover:scale-125" />
              <text x="180" y="293" fill="#000000" fontSize="5.5" fontWeight="bold" textAnchor="middle">TrillionOS</text>
            </g>

            {/* 7. Rich Connect & Matchmaking */}
            <g onClick={() => setSelectedProjectId('rich-connect')} className="cursor-pointer group">
              <circle cx="450" cy="140" r="15" fill="#FF69B4" className="transition group-hover:scale-125" />
              <circle cx="450" cy="140" r="20" fill="none" stroke="#FF69B4" strokeWidth="1" className="animate-ping" opacity="0.3" />
              <text x="450" y="143" fill="#000000" fontSize="5.5" fontWeight="bold" textAnchor="middle">Matchmaking</text>
              <text x="450" y="168" fill="#FF69B4" fontSize="8" fontFamily="monospace" textAnchor="middle">Rich Connect</text>
            </g>

            {/* 8. ABAU */}
            <g onClick={() => setSelectedProjectId('abau')} className="cursor-pointer group">
              <circle cx="420" cy="290" r="13" fill="#FFD700" className="transition group-hover:scale-125" />
              <text x="420" y="293" fill="#000000" fontSize="6" fontWeight="bold" textAnchor="middle">ABAU</text>
            </g>

            {/* 9. UADC Protocol */}
            <g onClick={() => setSelectedProjectId('uadc-protocol')} className="cursor-pointer group">
              <circle cx="300" cy="40" r="14" fill="#00FF88" className="transition group-hover:scale-125" />
              <text x="300" y="44" fill="#000000" fontSize="6" fontWeight="bold" textAnchor="middle">UADC</text>
              <text x="300" y="22" fill="#00FF88" fontSize="8" fontFamily="monospace" textAnchor="middle">UADC Protocol</text>
            </g>

            {/* 10. NYAIE */}
            <g onClick={() => setSelectedProjectId('nyaie')} className="cursor-pointer group">
              <circle cx="140" cy="210" r="12" fill="#00D4FF" className="transition group-hover:scale-125" />
              <text x="140" y="213" fill="#000000" fontSize="5.5" fontWeight="bold" textAnchor="middle">NYAIE</text>
            </g>

            {/* 11. GKAP */}
            <g onClick={() => setSelectedProjectId('gkap')} className="cursor-pointer group">
              <circle cx="460" cy="210" r="12" fill="#FFD700" className="transition group-hover:scale-125" />
              <text x="460" y="213" fill="#000000" fontSize="5.5" fontWeight="bold" textAnchor="middle">GKAP</text>
            </g>
          </svg>

          {/* Quick instructions floating badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur px-3 py-1.5 rounded-xl border border-zinc-700 text-[10px] font-mono text-zinc-400">
            Click any project to view technical architecture
          </div>
        </div>
      </div>

      {/* SELECTED PROJECT DETAIL SPOTLIGHT */}
      <div className="p-6 sm:p-7 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
          <div>
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
              style={{ backgroundColor: `${activeProject.color}20`, color: activeProject.color }}
            >
              {activeProject.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
              {activeProject.name}
            </h3>
            <span className="text-xs font-mono text-zinc-300">
              Role: <strong className="text-white">{activeProject.role}</strong>
            </span>
          </div>

          {activeProject.metrics && (
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-black/80 border border-zinc-700 text-emerald-400 font-bold self-start sm:self-auto">
              {activeProject.metrics}
            </span>
          )}
        </div>

        <p className="text-sm text-zinc-200 leading-relaxed font-sans">
          {activeProject.description}
        </p>

        {/* If Rich Connect, render the 3 matchmaking modes */}
        {activeProject.features && (
          <div className="p-4 rounded-2xl bg-black/60 border border-pink-500/30 space-y-2 text-xs font-sans">
            <span className="text-[11px] font-mono text-pink-400 font-bold uppercase tracking-wider block">
              RICH MATCHMAKING ENGINE — 3 WEALTH TRANSFER MODES:
            </span>
            <ul className="space-y-1.5 text-zinc-300">
              {activeProject.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {activeProject.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* FULL CATALOG GRID: 11 PROJECTS */}
      <div className="space-y-6 pt-4 border-t border-zinc-800/80">
        <div>
          <h3 className="text-lg font-heading font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FFD700]" />
            <span>Complete 11-Platform Catalog Matrix</span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            Categorized by Core Tech Holdings and Flagship Ecosystem Platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ECOSYSTEM_PROJECTS.map(proj => (
            <div
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                selectedProjectId === proj.id
                  ? 'bg-zinc-900 border-[#FFD700] shadow-xl shadow-[#FFD700]/10 scale-[1.01]'
                  : 'bg-zinc-950/80 border-zinc-800/80 hover:bg-zinc-900/50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${proj.color}20`, color: proj.color }}
                  >
                    {proj.category}
                  </span>
                  {selectedProjectId === proj.id && (
                    <span className="text-[9px] font-mono text-[#FFD700] font-bold">Selected</span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white font-heading">{proj.name}</h4>
                <p className="text-[11px] font-mono text-zinc-400">{proj.role}</p>
                <p className="text-xs text-zinc-300 line-clamp-3 leading-relaxed font-sans">
                  {proj.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="truncate max-w-[180px]">{proj.tagline}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER & CORPORATE HOLDINGS LEGALITY */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs text-zinc-400 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <span className="text-white font-bold">
            All 11 projects are interconnected and legally operated under:
          </span>
          <span className="text-emerald-400 font-bold">
            CAC Registered: BN: UY/009049
          </span>
        </div>

        <p className="text-[11px] leading-relaxed text-zinc-300">
          MODE Digital Creations Limited &amp; Rossyst Enterprises Limited (BN: UY/009049) in partnership with CodeOrbit Limited, Automode AI, Autostack AI.<br />
          Headquarters: No. 5 Ordu Street, Rumuola/Stadium Link Road, Port Harcourt, Rivers State, Nigeria.
        </p>

        <div className="pt-2 text-[11px] text-zinc-500 border-t border-zinc-900">
          Partnerships via MODE Digital Creations Limited | Co-Founder Holdings: Automode AI, Autostack AI, CodeOrbit Limited | Address: No.5 Ordu Street, PH
        </div>
      </div>
    </div>
  );
};
export default FounderEcosystemShowcase;
