import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Sparkles,
  Bot,
  Coins,
  ShieldCheck,
  Flame,
  ArrowRight,
  Layers,
  Zap,
  Globe2,
  PhoneCall,
  ExternalLink,
  Award,
  Cpu
} from 'lucide-react';
import { FOUNDER_BRANDING } from '../../lib/baaLibraryData';

interface BaaLibrary4DBannerProps {
  onOpenFlagship?: () => void;
  onOpenSwarmModal?: () => void;
  onOpenCoverStudio?: () => void;
  onOpenSwarmPipeline?: () => void;
  onExploreFlagship?: () => void;
  totalBooksCount?: number;
}

export const BaaLibrary4DBanner: React.FC<BaaLibrary4DBannerProps> = ({
  onOpenFlagship,
  onOpenSwarmModal,
  onOpenCoverStudio,
  onOpenSwarmPipeline,
  onExploreFlagship,
  totalBooksCount = 250
}) => {
  const handleFlagshipAction = onOpenFlagship || onExploreFlagship || (() => {});
  const handleSwarmAction = onOpenSwarmModal || onOpenSwarmPipeline || (() => {});
  const handleCoverAction = onOpenCoverStudio || (() => {});
  const bannerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rY = ((x - centerX) / centerX) * 9;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative w-full py-4 select-none"
      style={{ perspective: '1400px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 4D Tilting Wrapper */}
      <div
        ref={bannerRef}
        className="relative w-full rounded-3xl overflow-hidden border border-[#FFD700]/40 transition-transform duration-200 ease-out shadow-[0_20px_70px_rgba(255,215,0,0.18)]"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale3d(1.008, 1.008, 1.008)' : 'scale3d(1, 1, 1)'}`,
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(ellipse at 50% -20%, #1a1500 0%, #080808 65%, #000000 100%)'
        }}
      >
        {/* Dynamic 4D Holographic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.35 : 0.15,
            background: `radial-gradient(circle 500px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 215, 0, 0.4), transparent 70%)`
          }}
        />

        {/* Animated Cyber Grid Matrix */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 215, 0, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 212, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'translateZ(-40px)'
          }}
        />

        {/* Floating Animated Geometric Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FFD700]/25 to-amber-600/10 blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-tl from-[#00D4FF]/25 to-emerald-600/10 blur-3xl pointer-events-none animate-pulse" />

        {/* Inner Content Grid */}
        <div className="relative z-20 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Bold 4D Headline & Founder Attribution */}
          <div className="flex-1 space-y-6 text-center lg:text-left" style={{ transform: 'translateZ(30px)' }}>
            
            {/* Top Badges Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/50 text-[#FFD700] text-xs font-mono font-bold tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                <span>4D DIGITAL LIBRARY EMPIRE</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D4FF]/15 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-mono font-bold tracking-wider">
                <Bot className="w-3.5 h-3.5" />
                <span>30 AUTONOMOUS PUBLISHING AGENTS</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>BASE L2 VERIFIED</span>
              </span>
            </div>

            {/* Giant Bold 4D Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-[1.08]">
                BAA AUTONOMOUS PUBLISHING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#00D4FF] drop-shadow-[0_4px_25px_rgba(255,215,0,0.35)]">
                  &amp; KNOWLEDGE EMPIRE
                </span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-sans max-w-2xl leading-relaxed">
                A sovereign 24/7 digital publishing matrix. Generating masterwork e-books in controlled, manageable batches with complete manuscripts, verified front/back covers, in-book AI tutors, interactive audio, and companion courses.
              </p>
            </div>

            {/* Founder & Author Permanent Branding Badge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/75 border border-zinc-700/80 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 text-xs font-mono">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-amber-700 text-black flex items-center justify-center font-bold text-lg shrink-0 shadow-lg shadow-[#FFD700]/20">
                EBJ
              </div>
              <div className="space-y-1 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#FFD700] tracking-wider">
                    FOUNDER &amp; MASTER AUTHOR:
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700">
                    Titowise (DeOrbitMan)
                  </span>
                </div>
                <h3 className="font-heading font-black text-white text-sm sm:text-base tracking-wide">
                  {FOUNDER_BRANDING.name}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-zinc-400 text-[11px] pt-1">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <PhoneCall className="w-3.5 h-3.5" />
                    Official Contact: {FOUNDER_BRANDING.contact}
                  </span>
                  <span>•</span>
                  <a
                    href={FOUNDER_BRANDING.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#00D4FF] hover:underline"
                  >
                    <span>{FOUNDER_BRANDING.website.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleFlagshipAction}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-xl shadow-[#FFD700]/25 flex items-center gap-2 group"
              >
                <BookOpen className="w-4 h-4 fill-current" />
                <span>Read Flagship Manuscript</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSwarmAction}
                className="px-5 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-700 hover:border-[#00D4FF] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-[#00D4FF]" />
                <span>Publishing Swarm (30 Agents)</span>
              </button>

              <button
                onClick={handleCoverAction}
                className="px-4 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-700 hover:border-[#FFD700] text-zinc-300 hover:text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-[#FFD700]" />
                <span>Cover Studio</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4D Floating Book Holographic Showcase */}
          <div
            className="w-full lg:w-96 shrink-0 flex flex-col items-center justify-center"
            style={{ transform: 'translateZ(60px)' }}
          >
            {/* 3D Book Visual Object */}
            <div
              onClick={handleFlagshipAction}
              className="relative w-64 h-84 rounded-2xl p-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border-2 border-[#FFD700] shadow-[0_25px_60px_rgba(255,215,0,0.3)] cursor-pointer group hover:border-amber-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              style={{
                transform: `rotateY(${rotateY * 0.8}deg) rotateX(${rotateX * 0.8}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Gold Foil Accent Corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFD700]/30 to-transparent pointer-events-none" />
              
              {/* Holographic Book Header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#FFD700]">
                  <span>VOL. 001 • MASTERWORK</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">PUBLISHED</span>
                </div>
                <h4 className="font-heading font-black text-white text-base leading-snug group-hover:text-[#FFD700] transition">
                  Autonomous Multi-Agent AI Systems
                </h4>
                <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                  24/7 Sovereign Digital Enterprises
                </p>
              </div>

              {/* Book Center Artwork Preview */}
              <div className="my-3 relative rounded-xl overflow-hidden aspect-[4/3] border border-zinc-800">
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
                  alt="Autonomous AI"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono font-bold text-white bg-black/80 px-2 py-0.5 rounded">
                  6 Full Chapters • Inscribed
                </span>
              </div>

              {/* Book Spine Author Strip */}
              <div className="pt-2 border-t border-zinc-800/80 font-mono text-[10px] text-zinc-400 space-y-0.5">
                <div className="text-white font-bold truncate">
                  {FOUNDER_BRANDING.name}
                </div>
                <div className="text-emerald-400 text-[9px]">
                  {FOUNDER_BRANDING.contact}
                </div>
              </div>
            </div>

            {/* Quick 4D Telemetry Metrics Under Book */}
            <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <span className="text-[9px] text-zinc-500 block">CATALOGUE</span>
                <span className="font-bold text-[#FFD700]">{totalBooksCount} Titles</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <span className="text-[9px] text-zinc-500 block">CATEGORIES</span>
                <span className="font-bold text-[#00D4FF]">25 Disciplines</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800">
                <span className="text-[9px] text-zinc-500 block">DISCOUNT</span>
                <span className="font-bold text-emerald-400">15% BaaCoin</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
