import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Cpu,
  Globe2,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  X,
  Tv,
  Share2,
  Eye,
  Maximize2
} from 'lucide-react';

export interface NewsItem {
  id: string;
  sourceName: string;
  sourceRole: string;
  sourceOrg: string;
  category: 'Tech Giants' | 'Robotics & AI' | 'Government Policy' | 'Student Stars' | 'AI TV Live';
  headline: string;
  fullQuote: string;
  analysis: string;
  avatarUrl: string;
  videoUrl?: string;
  timestamp: string;
  views: number;
  featuredTopic: string;
  relatedActionText: string;
  relatedActionPage: string;
}

export const BREAKING_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'elon-optimus-2026',
    sourceName: 'Elon Musk',
    sourceRole: 'Founder & CEO',
    sourceOrg: 'Tesla & xAI',
    category: 'Robotics & AI',
    headline: 'Optimus humanoid robots will surpass human population and redefine global production — decentralized compute is the new oil.',
    fullQuote: '“Optimus will ultimately be worth more than the rest of Tesla combined. We are looking at a world where humanoid robotics paired with autonomous AI agents will create an economy of infinite abundance. But it requires decentralized, low-cost sovereign solar compute clusters.”',
    analysis: 'Elon Musk highlighted that industrial robotics combined with end-to-end neural vision models will automate 80% of manufacturing by 2029, urging engineers to learn autonomous agent orchestration.',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-robot-head-moving-41444-large.mp4',
    timestamp: '8m ago',
    views: 48920,
    featuredTopic: 'Autonomous Humanoid Robotics',
    relatedActionText: 'Study Robotics AI Course',
    relatedActionPage: 'academy'
  },
  {
    id: 'mark-zuck-llama',
    sourceName: 'Mark Zuckerberg',
    sourceRole: 'Founder & CEO',
    sourceOrg: 'Meta AI',
    category: 'Tech Giants',
    headline: 'Llama 4 and open-weights intelligence empower 200M sovereign builders in Africa and emerging markets to bypass cloud monopolies.',
    fullQuote: '“Open-source AI is the single most leveling technology in human history. By making frontier intelligence freely downloadable, developers in Lagos, Nairobi, and Cairo can build sovereign multi-million dollar agent companies without paying massive cloud tolls.”',
    analysis: 'Zuckerberg reiterated Meta’s commitment to open-source foundation models, predicting that decentralized fine-tuned models will power specialized sovereign applications across finance and healthcare.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-data-31911-large.mp4',
    timestamp: '19m ago',
    views: 34100,
    featuredTopic: 'Open Source Foundation Models',
    relatedActionText: 'Launch AI Agent on Marketplace',
    relatedActionPage: 'marketplace'
  },
  {
    id: 'jensen-huang-nvda',
    sourceName: 'Jensen Huang',
    sourceRole: 'Founder & CEO',
    sourceOrg: 'NVIDIA',
    category: 'Tech Giants',
    headline: 'Every country and university must own its data and manufacture its own intelligence — sovereign AI data centers are the modern power grid.',
    fullQuote: '“You cannot allow other countries to process your language, your culture, and your economy. Sovereign AI isn’t just national pride — it’s national infrastructure. Token generation is the new electricity.”',
    analysis: 'Jensen Huang delivered a landmark address urging African and developing economies to invest in domestic GPU clouds, directly validating the Universal Autonomous AI Data Center architecture.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blinking-lights-and-cables-42777-large.mp4',
    timestamp: '32m ago',
    views: 52400,
    featuredTopic: 'Sovereign GPU Infrastructure',
    relatedActionText: 'Co-Own Data Center Shares',
    relatedActionPage: 'datacenter'
  },
  {
    id: 'sam-altman-agents',
    sourceName: 'Sam Altman',
    sourceRole: 'CEO',
    sourceOrg: 'OpenAI',
    category: 'Tech Giants',
    headline: 'Autonomous multi-agent swarms will run complete corporations in 2026 — prompt literacy is sovereign wealth.',
    fullQuote: '“We are moving from conversational chatbots to autonomous agents that execute multi-step economic tasks across weeks without supervision. One disciplined engineer with an agent fleet can now out-produce a 50-person agency.”',
    analysis: 'Sam Altman outlined the roadmap towards full agentic autonomy, reinforcing the Billionaires AI Academy curriculum of multi-agent orchestration and prompt royalty monetization.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-in-a-dark-room-43180-large.mp4',
    timestamp: '45m ago',
    views: 61800,
    featuredTopic: 'Multi-Agent Autonomous Fleets',
    relatedActionText: 'Explore 100 AI Courses',
    relatedActionPage: 'academy'
  },
  {
    id: 'bosun-tijani-africa',
    sourceName: 'Dr. Bosun Tijani & AU Taskforce',
    sourceRole: 'Minister of Tech & African Union',
    sourceOrg: 'Pan-African Sovereign AI Alliance',
    category: 'Government Policy',
    headline: 'African Union deploys 50,000 GPU Sovereign Grid across Nigeria, Kenya, Rwanda, and South Africa for native multilingual LLMs.',
    fullQuote: '“Africa will not remain a consumer of Western cognition. With 70% of our population under 30, our youth will train foundational models in Yoruba, Swahili, Hausa, Zulu, and Igbo to drive sovereign African GDP.”',
    analysis: 'The landmark $1.2B initiative establishes cross-border fiber and sovereign data hubs, directly integrating with university-accredited blockchain credentialing.',
    avatarUrl: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42409-large.mp4',
    timestamp: '1h ago',
    views: 41250,
    featuredTopic: 'Pan-African Sovereign Data Grid',
    relatedActionText: 'View University Curriculum',
    relatedActionPage: 'university'
  },
  {
    id: 'ai-anchor-nova-tv',
    sourceName: 'AI Anchor Nova & Sophia',
    sourceRole: 'Autonomous Broadcast Anchors',
    sourceOrg: 'BAA AI TV 24/7',
    category: 'AI TV Live',
    headline: 'BAA Live Wire: Over ₦184,000,000 in BaaCoin minted today! 1,377 autonomous recruiter leads closed, 2,400 smart contracts verified.',
    fullQuote: '“Good evening builders. Autonomous metrics just crossed a new all-time high on the Africa Blockchain & AI University subnet. 840 students completed their capstone NFTs in the last 6 hours, streaming 10x tuition back into verified wallets.”',
    analysis: 'BAA AI TV broadcasts continuous autonomous market analysis, technical deep dives, and student graduation ceremonies 24 hours a day on the decentralized broadcast network.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    timestamp: 'Just now',
    views: 79200,
    featuredTopic: 'BaaCoin Sovereign Mining Yield',
    relatedActionText: 'Watch AI TV Live 24/7',
    relatedActionPage: 'tv'
  },
  {
    id: 'student-chioma-bounty',
    sourceName: 'Chioma Adeyemi',
    sourceRole: 'Academy Graduate & Blockchain Fellow',
    sourceOrg: 'Africa Blockchain & AI University',
    category: 'Student Stars',
    headline: 'Student Chioma minted on-chain Smart Contract Auditor NFT, claimed ₦150,000 fintech bounty, and unlocked 1,200 BaaCoin networth.',
    fullQuote: '“I joined the Academy 3 weeks ago with zero blockchain coding background. The AI Tutor Dr. Chike Obi guided my smart contract fuzzing, and yesterday I won the Paystack verification security bounty on the platform!”',
    analysis: 'Chioma’s capstone auditor NFT certificate has been permanently inscribed on the decentralized ledger, qualifying her for automatic placement in top fintech engineering cohorts.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-with-headphones-on-a-laptop-42994-large.mp4',
    timestamp: '2h ago',
    views: 38900,
    featuredTopic: 'Learn-to-Own Bounty Victory',
    relatedActionText: 'Claim ₦150k Open Bounties',
    relatedActionPage: 'bounties'
  },
  {
    id: 'demis-hassabis-science',
    sourceName: 'Sir Demis Hassabis',
    sourceRole: 'CEO & Nobel Laureate',
    sourceOrg: 'Google DeepMind',
    category: 'Tech Giants',
    headline: 'Generative AI will discover clean nuclear fusion catalysts and design customized vaccines in minutes before 2030.',
    fullQuote: '“AI is not just about language or code — it is the ultimate tool for accelerating the scientific method itself. We are entering an era of automated scientific discovery that will compress a century of biology into five years.”',
    analysis: 'DeepMind’s recent breakthroughs in structural biology highlight how algorithmic synthesis can solve critical human health and environmental sustainability challenges.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-with-glowing-lines-41443-large.mp4',
    timestamp: '3h ago',
    views: 29400,
    featuredTopic: 'Scientific Generative AI',
    relatedActionText: 'Explore Science AI Tools',
    relatedActionPage: 'tools'
  }
];

interface BaaLiveNewsHeaderProps {
  onNavigate: (page: string) => void;
}

export const BaaLiveNewsHeader: React.FC<BaaLiveNewsHeaderProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStory, setSelectedStory] = useState<NewsItem | null>(null);
  const [isPlayingMarquee, setIsPlayingMarquee] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic news list supporting autonomous book release bulletins
  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    let storedNews: NewsItem[] = [];
    try {
      const raw = localStorage.getItem('baa_autonomous_books_v1');
      if (raw) {
        const books = JSON.parse(raw);
        storedNews = books.map((b: any) => ({
          id: `auto-news-${b.id}`,
          sourceName: b.authorAlias || 'Ambassador Emmanuel Bassey Joe',
          sourceRole: 'Founder & Master Architect',
          sourceOrg: 'BAA Autonomous Publishing Swarm',
          category: 'Tech Giants' as const,
          headline: `⚡ BREAKING RELEASE: "${b.title}" autonomously synthesized & published live in BAA Library with full manuscript & interactive study modules.`,
          fullQuote: `“Knowledge democratization has reached escape velocity. The BAA Swarm compiled and minted '${b.title}' with on-chain Base L2 hash: ${b.baseL2Hash}.”`,
          analysis: `Autonomous AI Book Creator engine synthesized this comprehensive 5-chapter manuscript upon live user demand. Verified by Ambassador Emmanuel Bassey Joe.`,
          avatarUrl: b.frontCover?.artworkUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          timestamp: 'Live release',
          views: 9420,
          featuredTopic: b.category,
          relatedActionText: `Read "${b.title.slice(0, 24)}..." in Library`,
          relatedActionPage: 'library'
        }));
      }
    } catch (e) {
      console.warn(e);
    }
    return [...storedNews, ...BREAKING_NEWS_ITEMS];
  });

  // Listen for real-time autonomous book compilation events
  useEffect(() => {
    const handleAutoBook = (e: any) => {
      const b = e.detail?.book;
      if (!b) return;
      const newStory: NewsItem = {
        id: `auto-news-${b.id}-${Date.now()}`,
        sourceName: b.authorAlias || 'Ambassador Emmanuel Bassey Joe',
        sourceRole: 'Founder & Master Architect',
        sourceOrg: 'BAA Autonomous Publishing Swarm',
        category: 'Tech Giants',
        headline: `⚡ BREAKING RELEASE: "${b.title}" autonomously synthesized & published live in BAA Library with full manuscript & interactive study modules.`,
        fullQuote: `“Knowledge democratization has reached escape velocity. The BAA Swarm compiled and minted '${b.title}' with on-chain Base L2 hash: ${b.baseL2Hash}.”`,
        analysis: `Autonomous AI Book Creator engine synthesized this comprehensive 5-chapter manuscript upon live user demand. Verified by Ambassador Emmanuel Bassey Joe.`,
        avatarUrl: b.frontCover?.artworkUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        timestamp: 'Just now',
        views: 120,
        featuredTopic: b.category,
        relatedActionText: `Read "${b.title.slice(0, 24)}..." in Library`,
        relatedActionPage: 'library'
      };
      setNewsList(prev => [newStory, ...prev.filter(item => item.id !== newStory.id)]);
    };

    window.addEventListener('baa_book_autonomously_generated', handleAutoBook);
    return () => window.removeEventListener('baa_book_autonomously_generated', handleAutoBook);
  }, []);

  const categories = ['All', 'Tech Giants', 'Robotics & AI', 'Government Policy', 'Student Stars', 'AI TV Live'];

  const filteredNews = activeCategory === 'All'
    ? newsList
    : newsList.filter(item => item.category === activeCategory);

  // Auto-scroll ticker smoothly
  useEffect(() => {
    if (!isPlayingMarquee || !scrollRef.current) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 5
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 35);
    return () => clearInterval(interval);
  }, [isPlayingMarquee]);

  // Text-To-Speech for Story
  const handleToggleSpeech = (story: NewsItem) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis not supported by your browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `BAA Breaking AI Wire. From ${story.sourceName}, ${story.sourceRole} at ${story.sourceOrg}. ${story.headline} Analysis: ${story.analysis} Quote: ${story.fullQuote}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Pick a natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleOpenStory = (story: NewsItem) => {
    setSelectedStory(story);
    stopSpeech();
  };

  const handleCloseModal = () => {
    stopSpeech();
    setSelectedStory(null);
  };

  return (
    <div className="w-full bg-black border-b border-zinc-800/90 text-slate-100 select-none relative z-40">
      {/* Top Ticker Status Bar */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-3 sm:px-6 py-1.5 flex items-center justify-between border-b border-zinc-800/70 text-[10px] font-mono">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40 font-bold uppercase tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            BAA LIVE AI WIRE
          </span>
          <span className="text-zinc-500 hidden md:inline">•</span>
          <span className="text-zinc-400 hidden md:inline flex items-center gap-1">
            <Globe2 className="w-3 h-3 text-[#00D4FF]" />
            Autonomous Crawler: 4,920 global intelligence feeds live
          </span>
        </div>

        {/* Category Pills & Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-0.5 rounded-md transition text-[9px] font-semibold whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#FFD700] text-black font-bold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="pl-2 border-l border-zinc-800 flex items-center gap-1">
            <button
              onClick={() => setIsPlayingMarquee(!isPlayingMarquee)}
              className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
              title={isPlayingMarquee ? 'Pause scrolling' : 'Resume scrolling'}
            >
              {isPlayingMarquee ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling Interactive News Cards Marquee */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPlayingMarquee(false)}
        onMouseLeave={() => setIsPlayingMarquee(true)}
        className="flex items-center gap-3 px-3 py-2.5 overflow-x-auto no-scrollbar scroll-smooth bg-gradient-to-b from-black to-zinc-950"
      >
        {filteredNews.map(item => (
          <div
            key={item.id}
            onClick={() => handleOpenStory(item)}
            className="group shrink-0 flex items-center gap-3 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-[#FFD700]/50 transition-all cursor-pointer max-w-sm sm:max-w-md shadow-md hover:shadow-lg hover:shadow-[#FFD700]/5"
          >
            {/* Source Photo with Glow */}
            <div className="relative shrink-0">
              <img
                src={item.avatarUrl}
                alt={item.sourceName}
                className="w-11 h-11 rounded-xl object-cover border border-zinc-700 group-hover:border-[#FFD700] transition"
              />
              <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded bg-black/90 text-[8px] font-mono font-bold text-[#00D4FF] border border-zinc-700">
                LIVE
              </span>
            </div>

            {/* Story Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold text-white group-hover:text-[#FFD700] transition truncate font-sans">
                  {item.sourceName}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-[9px] font-mono text-zinc-400 truncate">
                {item.sourceRole} • {item.sourceOrg}
              </p>
              <p className="text-[11px] text-zinc-200 line-clamp-1 font-sans mt-0.5 leading-tight group-hover:text-white">
                {item.headline}
              </p>
            </div>

            {/* Video Play Icon indicator */}
            <div className="shrink-0 p-1.5 rounded-lg bg-zinc-800 group-hover:bg-[#FFD700] text-zinc-400 group-hover:text-black transition">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        ))}
      </div>

      {/* Story Video & AI News Caster Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#FFD700]/10 flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-gradient-to-r from-zinc-900 via-zinc-950 to-black">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStory.avatarUrl}
                  alt={selectedStory.sourceName}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#FFD700]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider">
                      {selectedStory.category}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {selectedStory.views.toLocaleString()} watching
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-heading">
                    {selectedStory.sourceName}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    {selectedStory.sourceRole} — {selectedStory.sourceOrg}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Broadcast & Animated Anchor Area */}
            <div className="relative bg-black aspect-video w-full overflow-hidden border-b border-zinc-800 flex items-center justify-center">
              {/* If video URL available, play loop, else animated soundwave studio */}
              {selectedStory.videoUrl ? (
                <video
                  src={selectedStory.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-85"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-3">
                  <Tv className="w-12 h-12 text-[#FFD700] animate-pulse" />
                  <span className="text-xs font-mono text-zinc-400">BAA AI Television Live Satellite Link</span>
                </div>
              )}

              {/* Broadcast Live Overlays */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  LIVE BROADCAST
                </span>
                <span className="px-2 py-1 rounded-md bg-black/70 backdrop-blur text-white font-mono text-[10px] border border-zinc-700">
                  {selectedStory.featuredTopic}
                </span>
              </div>

              {/* AI Voice Narration Overlay Bar */}
              <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-zinc-700/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => handleToggleSpeech(selectedStory)}
                    className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                      isSpeaking
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-[#FFD700] hover:bg-[#e6c200] text-black'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>Pause AI Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to AI Anchor</span>
                      </>
                    )}
                  </button>

                  {/* Audio Visualizer Waves */}
                  <div className="flex items-center gap-1 h-6">
                    {[16, 24, 12, 28, 20, 14, 26, 18].map((h, i) => (
                      <span
                        key={i}
                        className={`w-1 rounded-full bg-[#00D4FF] transition-all duration-150 ${
                          isSpeaking ? 'animate-pulse' : 'opacity-40'
                        }`}
                        style={{ height: isSpeaking ? `${h}px` : '4px' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Speed Toggle */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                  <span>Speed:</span>
                  {[1, 1.25, 1.5].map(rate => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`px-1.5 py-0.5 rounded transition ${
                        speechRate === rate ? 'bg-[#00D4FF] text-black font-bold' : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body: Full Story & Direct Impact */}
            <div className="p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="text-xl font-heading font-black text-white leading-snug">
                  {selectedStory.headline}
                </h2>
                <div className="mt-3 p-4 rounded-2xl bg-zinc-900 border-l-4 border-[#FFD700] text-sm text-zinc-200 italic font-serif leading-relaxed">
                  {selectedStory.fullQuote}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#00D4FF] font-bold uppercase tracking-wider">
                  Sovereign Intelligence Analysis
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {selectedStory.analysis}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => {
                    handleCloseModal();
                    onNavigate(selectedStory.relatedActionPage);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{selectedStory.relatedActionText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span>Inscribed on BAA Wire Ledger • 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BaaLiveNewsHeader;
