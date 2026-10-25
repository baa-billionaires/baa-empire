import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { NFTCertificatePreviewModal } from './NFTCertificatePreviewModal';
import { CertificateNFT } from '../types';
import {
  Sparkles,
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  ExternalLink,
  Award,
  Users,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Coins,
  ChevronRight,
  GraduationCap,
  Building2,
  CheckCircle,
  Video,
  Flame,
  Globe,
  Bell,
  Eye,
  GripVertical,
  Move,
  RotateCcw
} from 'lucide-react';
import { BREAKING_NEWS_ITEMS, NewsItem } from './BaaLiveNewsHeader';

interface SpotlightNewsDrawerProps {
  onNavigate: (page: string) => void;
}

export const SpotlightNewsDrawer: React.FC<SpotlightNewsDrawerProps> = ({ onNavigate }) => {
  const { studentSpotlights, topStakers, projectProposals, certificates } = useEcosystem();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'students' | 'projects' | 'stakers' | 'partners'>('video');
  const [selectedVideoNews, setSelectedVideoNews] = useState<NewsItem>(BREAKING_NEWS_ITEMS[0]);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedStudentCert, setSelectedStudentCert] = useState<CertificateNFT | null>(null);

  // Time-to-time news pop-up notification state
  const [toastNotification, setToastNotification] = useState<{
    id: string;
    title: string;
    subtitle: string;
    category: string;
  } | null>(null);

  // Periodic automatic popup notification (simulates live breaking news every 45 seconds)
  useEffect(() => {
    const notifications = [
      {
        id: 'toast-1',
        title: '🎓 Student Spotlight: Chioma scored 98/100 in Autonomous Fuzzing!',
        subtitle: 'Secured ₦150k Paystack bug bounty & unlocked 4,850 BAA Networth.',
        category: 'Student Star'
      },
      {
        id: 'toast-2',
        title: '⚡ 2,417 Smartphones Entangled in UADC Compute Cluster',
        subtitle: 'Earning students ₦100–₦500 daily passive income while charging overnight.',
        category: 'UADC Telemetry'
      },
      {
        id: 'toast-3',
        title: '🚀 Seed Round Milestone: LegalEase AI reached 86% Funding Goal',
        subtitle: '21,500 BAA backed by 64 angel investors across Port Harcourt & Lagos.',
        category: 'Venture Pipeline'
      },
      {
        id: 'toast-4',
        title: '🚗 Student Babatunde brokered 2024 Mercedes GLE 450 with 1-Click Escrow',
        subtitle: 'Used Car Dealership Legion preset to earn ₦420,000 commission.',
        category: 'Commerce Legion'
      }
    ];

    let index = 0;
    const interval = setInterval(() => {
      // Only show if drawer is currently closed
      if (!isOpen) {
        setToastNotification(notifications[index % notifications.length]);
        index++;
        // Dismiss toast after 7 seconds
        setTimeout(() => {
          setToastNotification(null);
        }, 7000);
      }
    }, 45000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleOpenSpotlight = (tab: 'video' | 'students' | 'projects' | 'stakers' | 'partners' = 'video') => {
    setActiveTab(tab);
    setIsOpen(true);
    setToastNotification(null);
  };

  // Moveable Spotlight Button position state
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number } | null>(() => {
    try {
      const saved = localStorage.getItem('baa_spotlight_btn_pos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [isDraggingSpotlight, setIsDraggingSpotlight] = useState(false);
  const dragStartRef = React.useRef<{
    startX: number;
    startY: number;
    initX: number;
    initY: number;
    moved: boolean;
  }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
    moved: false
  });

  const handleSpotlightPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const currentX = spotlightPos?.x ?? (window.innerWidth - 180);
    const currentY = spotlightPos?.y ?? (window.innerHeight * 0.45);

    dragStartRef.current = {
      startX: clientX,
      startY: clientY,
      initX: currentX,
      initY: currentY,
      moved: false
    };

    const handlePointerMove = (moveEvt: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvt ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const moveY = 'touches' in moveEvt ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const deltaX = moveX - dragStartRef.current.startX;
      const deltaY = moveY - dragStartRef.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        dragStartRef.current.moved = true;
        setIsDraggingSpotlight(true);
      }

      if (dragStartRef.current.moved) {
        const nextX = Math.max(10, Math.min(window.innerWidth - 170, dragStartRef.current.initX + deltaX));
        const nextY = Math.max(70, Math.min(window.innerHeight - 80, dragStartRef.current.initY + deltaY));
        setSpotlightPos({ x: nextX, y: nextY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      setTimeout(() => {
        setIsDraggingSpotlight(false);
      }, 50);

      setSpotlightPos(latest => {
        if (latest) {
          localStorage.setItem('baa_spotlight_btn_pos', JSON.stringify(latest));
        }
        return latest;
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  };

  const handleSpotlightClick = (e: React.MouseEvent) => {
    if (dragStartRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    handleOpenSpotlight('video');
  };

  const resetSpotlightPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpotlightPos(null);
    localStorage.removeItem('baa_spotlight_btn_pos');
  };

  return (
    <>
      {/* 1. Periodic Subtle Pop-up Toast in Bottom-Right */}
      {toastNotification && !isOpen && (
        <div className="fixed bottom-24 right-4 z-40 max-w-sm w-full bg-zinc-950/95 backdrop-blur-xl border border-[#FFD700]/60 rounded-2xl p-4 shadow-2xl shadow-black/80 animate-bounce-short text-xs font-mono">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-[#FFD700] font-bold text-[10px] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-ping" />
              <span>{toastNotification.category}</span>
            </div>
            <button
              onClick={() => setToastNotification(null)}
              className="text-zinc-500 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h5 className="font-heading font-bold text-white text-sm mt-1 leading-snug">
            {toastNotification.title}
          </h5>
          <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
            {toastNotification.subtitle}
          </p>

          <div className="mt-3 pt-2 border-t border-zinc-800/80 flex justify-between items-center">
            <span className="text-[10px] text-zinc-500">Live Spotlight Mesh</span>
            <button
              onClick={() => handleOpenSpotlight(toastNotification.category.includes('Student') ? 'students' : 'video')}
              className="px-3 py-1 rounded-lg bg-[#FFD700] text-black font-heading font-black text-[10px] uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1 shadow-md shadow-[#FFD700]/20"
            >
              <span>Watch Story</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* 2. Floating Movable Spotlight Button */}
      <div
        style={
          spotlightPos
            ? {
                left: `${spotlightPos.x}px`,
                top: `${spotlightPos.y}px`,
                position: 'fixed',
                zIndex: 40
              }
            : {
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                position: 'fixed',
                zIndex: 40
              }
        }
        className={`transition-shadow ${isDraggingSpotlight ? 'cursor-grabbing select-none scale-105' : ''}`}
      >
        <div className="relative group/spotlight flex items-center shadow-2xl">
          {/* Drag Handle */}
          <div
            onMouseDown={handleSpotlightPointerDown}
            onTouchStart={handleSpotlightPointerDown}
            className="p-1.5 bg-black/90 text-zinc-400 hover:text-[#FFD700] rounded-l-xl border-y border-l border-zinc-700 cursor-grab active:cursor-grabbing flex items-center justify-center hover:bg-zinc-900 transition shadow"
            title="Click & Drag to move Spotlight button anywhere"
          >
            <GripVertical className="w-3.5 h-3.5" />
          </div>

          <button
            onClick={handleSpotlightClick}
            className="group relative flex items-center gap-2 py-2.5 px-3 bg-zinc-950 hover:bg-black text-[#FFD700] border-y border-r border-[#FFD700] rounded-r-2xl shadow-2xl shadow-[#FFD700]/25 transition-all hover:pr-4 cursor-pointer backdrop-blur-xl"
            title="Open Video News, Student Stories & Top Stakers Spotlight (Drag handle to reposition)"
          >
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-ping absolute" />
              <Radio className="w-4 h-4 text-[#FFD700] relative" />
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[9px] font-mono text-[#00D4FF] font-bold tracking-widest uppercase flex items-center gap-1">
                <span>● SPOTLIGHT</span>
              </span>
              <span className="font-heading font-black text-white text-xs whitespace-nowrap">
                News &amp; Stars
              </span>
            </div>

            <div className="w-5 h-5 rounded-full bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700]">
              <Play className="w-3 h-3 fill-[#FFD700]" />
            </div>
          </button>

          {/* Reset Position badge when custom placed */}
          {spotlightPos && (
            <button
              onClick={resetSpotlightPosition}
              className="absolute -top-3 -right-2 p-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white opacity-0 group-hover/spotlight:opacity-100 transition shadow"
              title="Reset Spotlight button to default right edge"
            >
              <RotateCcw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Full Rich Spotlight Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold mb-1">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>BAA GLOBAL SPOTLIGHT &amp; BROADCAST RADAR</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                  Industry News, Student Stars &amp; Staker Telemetry
                </h2>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar font-mono text-xs border-b border-zinc-900 pb-2">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'video'
                    ? 'bg-[#FFD700] text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>🎬 Video News</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'students'
                    ? 'bg-emerald-400 text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>🎓 Student Stories &amp; Scores</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-[#00D4FF] text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>🚀 Project Leads &amp; Funding</span>
              </button>

              <button
                onClick={() => setActiveTab('stakers')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'stakers'
                    ? 'bg-purple-400 text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>💎 Top Stakers &amp; Nodes</span>
              </button>

              <button
                onClick={() => setActiveTab('partners')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'partners'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>🤝 Partners &amp; Investors</span>
              </button>
            </div>

            {/* TAB 1: VIDEO NEWS */}
            {activeTab === 'video' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: Video Player */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-black border border-zinc-800">
                      {selectedVideoNews.videoUrl ? (
                        <video
                          src={selectedVideoNews.videoUrl}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs">
                          Live Autonomous Stream
                        </div>
                      )}

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#FFD700] font-bold border border-[#FFD700]/30 flex items-center gap-1.5">
                        <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                        <span>LIVE INDUSTRY RADAR • {selectedVideoNews.category}</span>
                      </div>

                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 rounded-xl bg-black/80 backdrop-blur-md text-white hover:text-[#FFD700] border border-zinc-700"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <span className="text-[#00D4FF] font-bold">{selectedVideoNews.sourceName}</span>
                        <span>• {selectedVideoNews.sourceOrg}</span>
                        <span>• {selectedVideoNews.timestamp}</span>
                      </div>
                      <h3 className="font-heading font-black text-white text-lg mt-1">
                        {selectedVideoNews.headline}
                      </h3>
                      <p className="text-xs text-zinc-300 italic mt-2 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800">
                        {selectedVideoNews.fullQuote}
                      </p>
                      <p className="text-xs text-zinc-400 mt-2">
                        {selectedVideoNews.analysis}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate(selectedVideoNews.relatedActionPage);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-2"
                    >
                      <span>{selectedVideoNews.relatedActionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right: Quick News Reel Selection */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                      MORE INDUSTRY STORIES:
                    </span>
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {BREAKING_NEWS_ITEMS.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedVideoNews(item)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${
                            selectedVideoNews.id === item.id
                              ? 'bg-zinc-900 border-[#FFD700] text-white'
                              : 'bg-black/50 border-zinc-900 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1">
                            <span className="text-[#00D4FF]">{item.sourceName}</span>
                            <span>{item.timestamp}</span>
                          </div>
                          <h5 className="font-heading font-bold text-white text-xs line-clamp-2">
                            {item.headline}
                          </h5>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: STUDENT STORIES & PROGRESS & SCORES */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {studentSpotlights.map((s) => (
                    <div
                      key={s.id}
                      className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 flex flex-col justify-between transition space-y-4 shadow-xl"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.avatar_url}
                            alt={s.name}
                            className="w-12 h-12 rounded-xl object-cover border border-emerald-500/40"
                          />
                          <div>
                            <h4 className="font-heading font-bold text-white text-base">{s.name}</h4>
                            <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                              {s.graduation_status}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">{s.cohort}</span>
                          </div>
                        </div>

                        {/* Verified Activity Scores */}
                        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1.5 font-mono text-[11px]">
                          <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-1">
                            VERIFIED ACTIVITY SCORES:
                          </span>
                          {s.scores.map((sc, i) => (
                            <div key={i} className="flex justify-between text-zinc-300">
                              <span>{sc.activity}:</span>
                              <span className="text-[#FFD700] font-bold">{sc.score}/100</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <span className="text-[10px] font-mono text-[#00D4FF] uppercase font-bold block">
                            PROJECT LEAD:
                          </span>
                          <p className="text-xs font-bold text-white mt-0.5">{s.project_lead_title}</p>
                        </div>

                        <p className="text-xs text-zinc-400 italic bg-black/40 p-2.5 rounded-lg border border-zinc-900">
                          "{s.quote}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-900 flex justify-between items-center font-mono text-xs gap-2">
                        <div>
                          <span className="text-[10px] text-zinc-500 block">BaaCoin Networth</span>
                          <span className="text-[#FFD700] font-black">{s.baacoin_earned.toLocaleString()} BAA</span>
                        </div>
                        <button
                          onClick={() => {
                            const matched = certificates.find((c) =>
                              c.student_name.toLowerCase().includes(s.name.toLowerCase())
                            );
                            if (matched) {
                              setSelectedStudentCert(matched);
                            } else {
                              setSelectedStudentCert({
                                id: `cert-${s.id}`,
                                user_id: `usr-${s.id}`,
                                student_name: s.name,
                                course_id: `course-${s.id}`,
                                course_title: s.project_lead_title + ' Fellowship',
                                nft_id: `0xBAAC-990-SOVEREIGN-${s.name.split(' ')[0].toUpperCase()}-2026`,
                                baacoin_engraved: 990,
                                ipfs_url: `ipfs://bafybeicsovereigncert${s.id}/metadata.json`,
                                qr_data: `https://billionairesai.academy/verify/0xBAAC-990-${s.id}?ref=SOVEREIGN`,
                                is_tradable: true,
                                issue_date: 'October 2026',
                                transaction_hash: `0x7f9a8b1c4d${s.id}938217bbcc44e55`,
                                referral_code: 'SOVEREIGN-2026'
                              });
                            }
                          }}
                          className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5 transition shadow-sm hover:scale-105"
                          title="View on-chain NFT certificate"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>NFT Certificate</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROJECT LEADS & FUNDING */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectProposals.slice(0, 4).map((proj) => {
                    const fundedPct = Math.min(100, Math.round((proj.total_funded_baacoin / proj.funding_ask_baacoin) * 100));

                    return (
                      <div
                        key={proj.id}
                        className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#00D4FF]/50 transition flex flex-col justify-between space-y-4 shadow-xl"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[10px] font-bold border border-[#00D4FF]/30">
                              {proj.category}
                            </span>
                            <span className="text-emerald-400 text-[10px] font-bold">
                              {proj.development_phase}
                            </span>
                          </div>

                          <h4 className="font-heading font-black text-white text-base leading-snug">
                            {proj.title}
                          </h4>

                          <p className="text-xs text-zinc-400 line-clamp-2">
                            {proj.description}
                          </p>

                          {/* Progress */}
                          <div className="space-y-1.5 font-mono text-xs">
                            <div className="flex justify-between text-[11px] text-zinc-400">
                              <span>Funded: {proj.total_funded_baacoin.toLocaleString()} BAA</span>
                              <span className="text-[#FFD700] font-bold">{fundedPct}% of Goal</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#00D4FF] to-blue-500 rounded-full"
                                style={{ width: `${fundedPct}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-zinc-900 flex justify-between items-center">
                          <span className="text-[11px] font-mono text-zinc-400">
                            {proj.backers_count} Backers • {proj.equity_offered_percent}% Equity
                          </span>

                          <button
                            onClick={() => {
                              setIsOpen(false);
                              onNavigate('projects');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 hover:bg-[#00D4FF]/20 text-xs font-mono font-bold transition flex items-center gap-1"
                          >
                            <span>Inspect &amp; Back</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('projects');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold transition"
                  >
                    View All Venture Projects &amp; Funding Approvals →
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: TOP STAKERS & MOBILE NODES */}
            {activeTab === 'stakers' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-purple-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-black text-white text-base">Top BaaCoin Stakers &amp; Node Hosts</h4>
                    <p className="text-xs text-zinc-400">Leaderboard of active participants securing the UADC African compute mesh</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('exchange');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-500 text-white font-heading font-black text-xs uppercase hover:brightness-110 transition"
                  >
                    Join Staking Pool
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                        <th className="py-2.5 px-3">Rank</th>
                        <th className="py-2.5 px-3">Staker &amp; Node ID</th>
                        <th className="py-2.5 px-3">Tier</th>
                        <th className="py-2.5 px-3">Staked BAA</th>
                        <th className="py-2.5 px-3">Daily Yield</th>
                        <th className="py-2.5 px-3">Uptime</th>
                        <th className="py-2.5 px-3">Health</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {topStakers.map((ts) => (
                        <tr key={ts.rank} className="hover:bg-zinc-900/50 transition">
                          <td className="py-3 px-3">
                            <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-[11px] ${
                              ts.rank === 1 ? 'bg-[#FFD700] text-black' : ts.rank === 2 ? 'bg-zinc-300 text-black' : ts.rank === 3 ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400'
                            }`}>
                              #{ts.rank}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <img src={ts.avatar_url} alt={ts.name} className="w-7 h-7 rounded-full object-cover" />
                              <div>
                                <span className="text-white font-bold block">{ts.name}</span>
                                <span className="text-[10px] text-zinc-500">{ts.node_id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-purple-300 font-bold">{ts.tier}</td>
                          <td className="py-3 px-3 text-[#FFD700] font-black">{ts.staked_baacoin.toLocaleString()} BAA</td>
                          <td className="py-3 px-3 text-emerald-400">+{ts.daily_yield_baacoin} BAA/day</td>
                          <td className="py-3 px-3 text-zinc-300">{ts.uptime_percent}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/30">
                              ● {ts.node_health}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 5: PARTNERS & INVESTORS */}
            {activeTab === 'partners' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    CORPORATE &amp; LEGAL GOVERNANCE
                  </span>
                  <h3 className="text-xl font-heading font-black text-white">
                    MODE Digital Creations Limited &amp; Rossyst Enterprises Limited
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    All funding, tokenized assets, and student certifications are issued under MODE Digital Creations Limited (BN: UY/009049), CAC Registered in Nigeria, and verified with Paystack &amp; Wema Bank.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">HEADQUARTERS</span>
                      <span className="text-white font-bold">No. 5 Ordu Street, Port Harcourt</span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">LAGOS INNOVATION HUB</span>
                      <span className="text-white font-bold">12 Allen Avenue, Ikeja, Lagos</span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">PAYSTACK VERIFIED BANK</span>
                      <span className="text-emerald-400 font-bold">Wema Bank: MODE DIGITAL CREATIONS</span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 block">INVESTOR CONTACT</span>
                      <span className="text-[#00D4FF] font-bold">autonomousagentscommerce@gmail.com</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate('investor-one-pager');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition"
                    >
                      View Investor Pitch Deck ($500k Seed Ask)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NFT Certificate Preview Modal for Spotlighted Students */}
      <NFTCertificatePreviewModal
        certificate={selectedStudentCert}
        isOpen={!!selectedStudentCert}
        onClose={() => setSelectedStudentCert(null)}
      />
    </>
  );
};
export default SpotlightNewsDrawer;
