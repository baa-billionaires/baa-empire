import React, { useState, useEffect, useRef } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { PaystackButton } from '../components/PaystackButton';
import { CertificateNFT } from '../types';
import {
  ArrowLeft,
  Bot,
  Code2,
  Copy,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  School,
  ExternalLink,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Video,
  Radio,
  Coins,
  Award,
  Layers,
  FileText,
  Download,
  Share2,
  Eye,
  Users,
  Mic,
  Maximize2,
  Cpu,
  Flame,
  CheckCircle2,
  Lock,
  MessageSquare,
  CheckCheck,
  Paperclip,
  Calendar,
  BadgeCheck,
  FileCode,
  Clock
} from 'lucide-react';

interface TutorDetailPageProps {
  tutorId: string;
  onBack: () => void;
  onViewCertificate?: (cert: CertificateNFT) => void;
}

interface LectureModule {
  id: string;
  title: string;
  duration: string;
  summary: string;
  codeSnippet: string;
  whiteboardNotes: string[];
}

export const TutorDetailPage: React.FC<TutorDetailPageProps> = ({
  tutorId,
  onBack,
  onViewCertificate
}) => {
  const { aiTutors, profile, wallet, mintLectureNFTAndMine } = useEcosystem();
  const tutor = aiTutors.find(t => t.id === tutorId) || aiTutors[0];

  // Classroom Mode: 'live-video' | 'chat-simulator' | 'whiteboard' | 'mentor-chat'
  const [activeTab, setActiveTab] = useState<'live-video' | 'chat-simulator' | 'whiteboard' | 'mentor-chat'>('live-video');

  // Faculty Mentor Profile Configuration
  const facultyMentor = {
    name: tutor.name.includes('Joe')
      ? 'Dr. Emmanuel Bassey Joe'
      : tutor.name.includes('Chioma')
      ? 'Chioma Adeyemi (Lead Fellow)'
      : tutor.name.includes('Fatima')
      ? 'Dr. Fatima Al-Mansoor (NLP Chair)'
      : `Dr. Chukwuma Sterling (Dean of ${tutor.subject})`,
    role: `Senior Academic Mentor & Chair of ${tutor.subject}`,
    credentials: 'PhD Distributed Systems (MIT) • ABAU Senior Fellow • Base L2 Security Auditor',
    avatar: tutor.avatar_url,
    responseTime: '< 2 mins',
    encryptionKey: '0x9f82d1947b1029c83a1029481b0a9f129c8120fa',
    cacStatus: 'CAC Verified Faculty Fellow (BN: UY/009049)'
  };

  // Mentor-Mentee Direct Secure Chat State
  const [mentorMessages, setMentorMessages] = useState<Array<{
    id: string;
    sender: 'mentee' | 'mentor' | 'system';
    text: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    codeSnippet?: string;
    isEncrypted: boolean;
  }>>([
    {
      id: 'mm-0',
      sender: 'system',
      text: '🔒 End-to-End Encrypted Session Initialized • 256-bit AES + Base L2 Sovereign Identity Verified (Key: 0x9f82...20fa). Confidential student-faculty channel.',
      timestamp: 'Session Active',
      status: 'read',
      isEncrypted: true
    },
    {
      id: 'mm-1',
      sender: 'mentor',
      text: `Greetings ${profile?.full_name || 'Scholar'}. I am ${tutor.name.includes('Joe') ? 'Dr. Emmanuel Bassey Joe' : tutor.name.includes('Chioma') ? 'Chioma Adeyemi' : 'Dr. Chukwuma Sterling'}, your assigned Faculty Mentor for ${tutor.subject}. I have been tracking your lecture completion, prompt minting, and venture milestone milestones. What specific architectural challenge, smart contract bug, or funding proposal would you like to review in this session?`,
      timestamp: '10:14 AM',
      status: 'read',
      isEncrypted: true
    }
  ]);

  const [mentorInput, setMentorInput] = useState('');
  const [mentorCodeSnippet, setMentorCodeSnippet] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isMentorTyping, setIsMentorTyping] = useState(false);
  const [showOfficeHoursModal, setShowOfficeHoursModal] = useState(false);
  const [bookedOfficeHour, setBookedOfficeHour] = useState<string | null>(null);
  const [mentorCopiedId, setMentorCopiedId] = useState<string | null>(null);

  // Embed and School Subscription
  const [copied, setCopied] = useState(false);
  const [schoolSubscribed, setSchoolSubscribed] = useState(true);

  // Chat State
  const [chat, setChat] = useState<Array<{ sender: 'user' | 'tutor'; text: string; timestamp: string }>>([
    {
      sender: 'tutor',
      text: tutor.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Text-To-Speech (TTS) State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const [activeLectureIndex, setActiveLectureIndex] = useState(0);

  // Video Player Simulation State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [liveViewers, setLiveViewers] = useState(1480);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Lecture Minting & Mining State
  const [isMintingModalOpen, setIsMintingModalOpen] = useState(false);
  const [mintStatus, setMintStatus] = useState<'idle' | 'verifying' | 'mining' | 'minted'>('idle');
  const [mintedCert, setMintedCert] = useState<CertificateNFT | null>(null);
  const [minedReward, setMinedReward] = useState<number>(150);
  const [txHash, setTxHash] = useState('');

  // Rich Lecture Modules tailored to tutor subject
  const lectureModules: LectureModule[] = [
    {
      id: 'mod-1',
      title: `Masterclass: Foundations of ${tutor.subject}`,
      duration: '14 mins',
      summary: `In this masterclass session with ${tutor.name}, we analyze the core algorithmic primitives of ${tutor.subject}. We begin by establishing mathematical state constraints, decoupling inference from raw compute, and formalizing how autonomous multi-agent pipelines interact with decentralized smart contracts. Pay specific attention to zero-shot latency reduction and cryptographic verification matrices.`,
      codeSnippet: `// Africa Blockchain & AI University Autonomous Ledger Contract\ncontract SovereignMastery {\n    address public immutable tutor = ${tutor.id ? '0x' + tutor.id.replace(/[^a-f0-9]/gi, '').padEnd(40, '0').slice(0, 42) : '0x71C8A392... '};\n    uint256 public constant MINING_YIELD = 150 * 10**18;\n\n    event LectureCompleted(address indexed student, uint256 blockTimestamp);\n\n    function verifyProofOfAttention(bytes32 proofHash) external returns (bool) {\n        require(proofHash != bytes32(0), "Invalid cryptographic attention proof");\n        emit LectureCompleted(msg.sender, block.timestamp);\n        return true;\n    }\n}`,
      whiteboardNotes: [
        `Tutor: ${tutor.name} (${tutor.subject})`,
        'Decentralized Model Weight Storage on IPFS + Filecoin',
        'State-machine validation with 0-knowledge zero-token waste',
        'Direct automated BaaCoin minting pipeline upon lecture completion'
      ]
    },
    {
      id: 'mod-2',
      title: 'Advanced Agent Architecture & Yield Orchestration',
      duration: '18 mins',
      summary: `Moving to tier-2 autonomous architecture: how ${tutor.name} deploys self-reflecting feedback loops. When an agent receives an ambiguous task, it generates parallel candidate trajectories, filters via consensus evaluation, and commits the finalized transaction to the on-chain registry. This eliminates human latency while safeguarding system invariants.`,
      codeSnippet: `async function orchestrateAutonomousAgentBatch(promptPayload) {\n    const agent = new SovereignAIAgent({\n        tutorId: "${tutor.id}",\n        role: "${tutor.subject}",\n        consensusThreshold: 0.94\n    });\n    const executionResult = await agent.runReflectiveLoop(promptPayload);\n    return executionResult.payoutBaaCoin();\n}`,
      whiteboardNotes: [
        'Multi-Agent Hierarchical Trees (Planner -> Executor -> Auditor)',
        'Paystack API Webhook Synchronization with 30-day epoch renewal',
        'Vesting unlocks 20% instant BaaCoin; remaining 80% streamed continuously'
      ]
    },
    {
      id: 'mod-3',
      title: 'Monetization, Iframe Embedding & White-Label Scaling',
      duration: '12 mins',
      summary: `The economic layer of AI education. Learn how schools embed this exact AI tutor via standard iframes, automatically remitting $${tutor.price_monthly}/month via Paystack. As a student or campus developer, you retain 60% prompt marketplace royalties and mint proof-of-mastery NFTs directly to your Web3 wallet.`,
      codeSnippet: `<iframe\n  src="https://billionairesai.academy/embed/tutor/${tutor.id}"\n  width="100%"\n  height="680"\n  allow="clipboard-write; microphone"\n></iframe>`,
      whiteboardNotes: [
        `School License Fee: $${tutor.price_monthly} USD / mo via Paystack Auto-Cut`,
        'Autonomous API Gate: shuts down query processing if subscription lapses',
        'Student Mining Yield: +150 BaaCoin directly minted to your balance'
      ]
    }
  ];

  const currentLecture = lectureModules[activeLectureIndex];

  // Dynamic live viewers simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 7) - 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Web Speech API Text-to-Speech Engine
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis API is not supported in this browser.');
      return;
    }

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Start fresh speech
    window.speechSynthesis.cancel();
    const textToSpeak = `Welcome to the live masterclass with ${tutor.name}. Today's topic is ${currentLecture.title}. ${currentLecture.summary}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Pick English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (englishVoice) utterance.voice = englishVoice;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Copy Iframe code
  const embedCode = `<iframe src="https://billionairesai.academy/embed/tutor/${tutor.id}" width="100%" height="680" frameborder="0" allow="clipboard-write; microphone"></iframe>`;
  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Live Chat Simulator Submission
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isThinking) return;

    const userText = query;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChat(prev => [...prev, { sender: 'user', text: userText, timestamp: timeStr }]);
    setQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setChat(prev => [
        ...prev,
        {
          sender: 'tutor',
          text: `[${tutor.name}]: Regarding "${userText}" — in our ${tutor.subject} framework, this connects directly to "${currentLecture.title}". Remember: always enforce zero-shot boundary constraints and verify your hash on-chain before executing state transitions. Let's mint this milestone!`,
          timestamp: responseTime
        }
      ]);
      setIsThinking(false);
    }, 750);
  };

  // Mentor-Mentee Secure Messaging Handlers
  const handleSendMentorMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorInput.trim() && !mentorCodeSnippet.trim()) return;

    const messageText = mentorInput.trim();
    const codePayload = mentorCodeSnippet.trim() ? mentorCodeSnippet.trim() : undefined;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = `mentee-${Date.now()}`;

    // Append mentee message
    setMentorMessages(prev => [
      ...prev,
      {
        id: msgId,
        sender: 'mentee',
        text: messageText || 'Please review this attached code snippet and verify the architecture against our curriculum standard.',
        timestamp: timeStr,
        status: 'sent',
        codeSnippet: codePayload,
        isEncrypted: true
      }
    ]);

    setMentorInput('');
    setMentorCodeSnippet('');
    setShowCodeInput(false);
    setIsMentorTyping(true);

    // Simulate network delivery and read receipt
    setTimeout(() => {
      setMentorMessages(prev =>
        prev.map(m => m.id === msgId ? { ...m, status: 'read' } : m)
      );
    }, 400);

    // Dynamic mentor response generation
    setTimeout(() => {
      const lower = messageText.toLowerCase();
      let responseText = '';

      if (codePayload) {
        responseText = `Excellent submission, ${profile?.full_name || 'Scholar'}. I have audited the snippet you submitted. Notice that in Base L2 contracts, storing dynamic byte arrays incurs non-linear gas costs under high throughput; consider replacing it with an immutable cryptographic leaf hash verified off-chain via your neural agent swarm. Keep this pattern for your Capstone defense!`;
      } else if (lower.includes('funding') || lower.includes('proposal') || lower.includes('grant') || lower.includes('investor') || lower.includes('angel')) {
        responseText = `Regarding venture funding: You are in an ideal position. Our ecosystem currently has 130,700 BAA (~$133,314 USD) in capital backed across 4 micro-startups in 6 African hubs, with 343 verified Angels participating. For your proposal to pass CAC & Wema Bank audit criteria, make sure your milestone roadmap explicitly details your customer acquisition CAC ratio and Base L2 smart contract escrow address. I'll personally co-sign your proposal!`;
      } else if (lower.includes('cac') || lower.includes('wema') || lower.includes('bank') || lower.includes('legal')) {
        responseText = `For CAC & Wema Bank corporate account verification: Ensure your RC or BN registration documents match your founder identity on the Academy registry. Two ventures have already received formal funding approval through this audited pipeline (LegalEase Africa AI and UADC Hydro-Solar Grid). Once registered, the Admin portal unlocks direct capital tranche disbursements!`;
      } else if (lower.includes('smart contract') || lower.includes('solidity') || lower.includes('erc') || lower.includes('token') || lower.includes('base') || lower.includes('baacoin')) {
        responseText = `On the blockchain side: Base L2 gives us sub-cent gas transactions and instant settlement with Paystack. Your BaaCoin earnings are secured by automated liquidity reserves. When writing your deployment scripts, ensure your owner keys are multi-sig guarded and that event logs mirror your off-chain AI agent decisions.`;
      } else if (lower.includes('agent') || lower.includes('prompt') || lower.includes('model') || lower.includes('neural') || lower.includes('python')) {
        responseText = `On autonomous AI swarm design: Focus on hierarchical agent colonies rather than single prompts. Designate one agent as the Planner (task decomposition), three as Parallel Workers (retrieval & generation), and one as the Auditor (schema & invariant validator). This achieves 99.4% zero-hallucination accuracy.`;
      } else {
        responseText = `Thank you for sharing, ${profile?.full_name || 'Scholar'}. That is a critical observation. In ${tutor.subject}, mastering the feedback loop between model inference, decentralized compute, and monetization is the key differentiator between a casual coder and an African tech billionaire. Let's schedule our 1:1 office hours if you'd like to do a live architecture walkthrough on video!`;
      }

      const mentorReplyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMentorMessages(prev => [
        ...prev,
        {
          id: `mentor-${Date.now()}`,
          sender: 'mentor',
          text: responseText,
          timestamp: mentorReplyTime,
          status: 'read',
          isEncrypted: true
        }
      ]);
      setIsMentorTyping(false);
    }, 1200);
  };

  const handleBookOfficeHour = (slot: string) => {
    setBookedOfficeHour(slot);
    setShowOfficeHoursModal(false);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMentorMessages(prev => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'system',
        text: `📅 1-on-1 Mentorship Office Hours Booked with ${facultyMentor.name} for: "${slot}". Google Meet + Base L2 verified access link generated. Check your student email (${profile?.email || 'scholar@billionairesai.academy'}) for calendar invite.`,
        timestamp: timeStr,
        status: 'read',
        isEncrypted: true
      }
    ]);
  };

  // Lecture Mining & NFT Minting Engine
  const handleStartLectureMining = () => {
    setIsMintingModalOpen(true);
    setMintStatus('verifying');

    // Simulate multi-step cryptographic verification and mining
    setTimeout(() => {
      setMintStatus('mining');

      setTimeout(() => {
        const result = mintLectureNFTAndMine({
          tutorId: tutor.id,
          tutorName: tutor.name,
          topic: currentLecture.title,
          summary: currentLecture.summary,
          baacoinReward: 150
        });

        setMinedReward(result.baacoinAwarded);
        setTxHash(result.certificate.transaction_hash);
        setMintedCert(result.certificate);
        setMintStatus('minted');
      }, 1400);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#00D4FF] transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Mine & Mint Lecture Button */}
          <button
            onClick={handleStartLectureMining}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
          >
            <Coins className="w-4 h-4 fill-current animate-spin-slow" />
            <span>Mine &amp; Mint Lecture (+150 BaaCoin)</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Column: AI Live Video Classroom + Interactive Audio Player (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tutor Bio & Status Badge */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0">
              <img
                src={tutor.avatar_url}
                alt={tutor.name}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-[#00D4FF]"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[9px] font-mono font-bold uppercase flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                LIVE
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider font-bold bg-[#00D4FF]/10 px-2 py-0.5 rounded-md border border-[#00D4FF]/20">
                  {tutor.subject}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {liveViewers.toLocaleString()} Students in Live Classroom
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">{tutor.name}</h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{tutor.description}</p>
              
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono">
                <span className="text-[#FFD700] font-bold">Hired by {tutor.hired_by_schools} Universities</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">License: ${tutor.price_monthly}/mo Paystack</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Video Screen */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl relative">
            {/* Live Video Header */}
            <div className="px-5 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono font-bold text-white tracking-wide">
                  AI LIVE VIDEO LECTURE STREAM
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 hidden sm:inline">
                  1080p60 • Ultra-Low Latency
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-zinc-800 text-xs">
                <button
                  onClick={() => setActiveTab('live-video')}
                  className={`px-3 py-1 rounded-lg font-mono font-semibold transition ${
                    activeTab === 'live-video'
                      ? 'bg-[#00D4FF] text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Video Feed
                </button>
                <button
                  onClick={() => setActiveTab('whiteboard')}
                  className={`px-3 py-1 rounded-lg font-mono font-semibold transition ${
                    activeTab === 'whiteboard'
                      ? 'bg-[#00D4FF] text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Whiteboard
                </button>
                <button
                  onClick={() => setActiveTab('chat-simulator')}
                  className={`px-3 py-1 rounded-lg font-mono font-semibold transition ${
                    activeTab === 'chat-simulator'
                      ? 'bg-[#00D4FF] text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Live Q&amp;A
                </button>
                <button
                  onClick={() => setActiveTab('mentor-chat')}
                  className={`px-3 py-1 rounded-lg font-mono font-semibold transition flex items-center gap-1.5 ${
                    activeTab === 'mentor-chat'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-black shadow-lg shadow-emerald-400/20'
                      : 'text-emerald-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Mentor-Mentee</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              </div>
            </div>

            {/* Video Stage / Whiteboard View */}
            {activeTab === 'live-video' && (
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                {/* Simulated Tutor Video Broadcast */}
                <video
                  ref={videoRef}
                  src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-85"
                />

                {/* Live Avatar Picture-in-Picture with animated lip-sync audio halo */}
                <div className="absolute top-4 left-4 flex items-center gap-3 p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-zinc-700 shadow-xl">
                  <div className="relative">
                    <img
                      src={tutor.avatar_url}
                      alt={tutor.name}
                      className={`w-12 h-12 rounded-xl object-cover border-2 ${
                        isSpeaking ? 'border-[#00D4FF] animate-pulse' : 'border-zinc-700'
                      }`}
                    />
                    {isSpeaking && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <div className="pr-2">
                    <span className="text-[10px] font-mono text-[#00D4FF] font-bold block">
                      {tutor.name}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">
                      {isSpeaking ? 'Speaking Live...' : 'Synthesizing Audio'}
                    </span>
                  </div>
                </div>

                {/* Subtitle / Teleprompter Live Transcript Banner */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-zinc-700 text-xs text-white leading-relaxed font-sans shadow-2xl">
                  <span className="text-[10px] font-mono text-[#FFD700] font-bold block mb-1">
                    LIVE LECTURE TRANSCRIPTION:
                  </span>
                  <p className="line-clamp-2 italic">
                    "{currentLecture.summary}"
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'whiteboard' && (
              <div className="p-6 bg-zinc-950 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-[#00D4FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Live Lecture Whiteboard &amp; Code Architecture
                  </span>
                  <span className="text-zinc-500">{currentLecture.title}</span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Algorithmic Key Points:</span>
                  <ul className="space-y-1.5 list-disc list-inside text-zinc-300">
                    {currentLecture.whiteboardNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#FFD700] uppercase tracking-wider">Live Executable Code Hook:</span>
                  <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-400 overflow-x-auto whitespace-pre font-mono text-[11px]">
                    {currentLecture.codeSnippet}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'chat-simulator' && (
              <div className="p-6 bg-zinc-950 flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
                  {chat.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[9px] font-mono text-zinc-500 mb-0.5">
                        {msg.sender === 'user' ? 'You (Student)' : tutor.name} • {msg.timestamp}
                      </span>
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#00D4FF] text-black font-semibold'
                            : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="text-[11px] font-mono text-[#00D4FF] animate-pulse">
                      {tutor.name} is compiling live response...
                    </div>
                  )}
                </div>

                <form onSubmit={handleSendChat} className="pt-3 border-t border-zinc-800 flex gap-2">
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={`Ask ${tutor.name} a question during live lecture...`}
                    className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!query.trim() || isThinking}
                    className="px-4 py-2.5 bg-[#00D4FF] text-black rounded-xl font-bold text-xs hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* Mentor-Mentee Direct Secure Messaging Interface */}
            {activeTab === 'mentor-chat' && (
              <div className="bg-zinc-950 flex flex-col min-h-[500px]">
                {/* Faculty Mentor Header Bar */}
                <div className="p-4 sm:p-5 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={facultyMentor.avatar}
                        alt={facultyMentor.name}
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400"
                      />
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-black text-white text-sm sm:text-base">
                          {facultyMentor.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                          <BadgeCheck className="w-3 h-3" />
                          Faculty Verified
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        {facultyMentor.role}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-500">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Lock className="w-3 h-3" />
                          E2EE Secured (Base L2 Key: 0x9f82...20fa)
                        </span>
                        <span>•</span>
                        <span>Avg response: &lt; 2 mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Mentorship Action Controls */}
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <button
                      onClick={() => setShowOfficeHoursModal(true)}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition flex items-center gap-1.5 text-[11px] font-bold"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{bookedOfficeHour ? 'Office Hour Booked' : 'Book 1:1 Slot'}</span>
                    </button>
                    <button
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className={`px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 text-[11px] font-bold ${
                        showCodeInput
                          ? 'bg-[#00D4FF] text-black border-[#00D4FF]'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:text-white'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      <span>{showCodeInput ? 'Hide Code Input' : 'Attach Code'}</span>
                    </button>
                  </div>
                </div>

                {/* Authenticated Mentee Status Banner */}
                <div className="px-5 py-2 bg-black/60 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Authenticated Scholar:</span>
                    <strong className="text-white">{profile?.full_name || 'Active Scholar'}</strong>
                    <span className="text-zinc-600">({profile?.email || 'student@billionairesai.academy'})</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <span className="text-[#FFD700]">BaaCoin Balance: {wallet.balance} BAA</span>
                    <span>•</span>
                    <span className="text-zinc-400">Base L2 Student ID: BAA-STU-8821</span>
                  </div>
                </div>

                {/* Chat Messages Feed */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs font-mono max-h-[460px]">
                  {mentorMessages.map((msg) => {
                    if (msg.sender === 'system') {
                      return (
                        <div
                          key={msg.id}
                          className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 text-center leading-relaxed text-[11px]"
                        >
                          {msg.text}
                        </div>
                      );
                    }

                    const isMentee = msg.sender === 'mentee';

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMentee ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-center gap-2 mb-1 text-[10px] text-zinc-500">
                          <span>
                            {isMentee ? 'You (Scholar)' : facultyMentor.name} • {msg.timestamp}
                          </span>
                          {msg.isEncrypted && (
                            <span className="flex items-center gap-0.5 text-emerald-400" title="End-to-End Encrypted">
                              <Lock className="w-2.5 h-2.5" />
                              E2EE
                            </span>
                          )}
                        </div>

                        <div
                          className={`p-4 rounded-3xl max-w-[85%] leading-relaxed shadow-lg ${
                            isMentee
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-tr-none'
                              : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none'
                          }`}
                        >
                          <p className="whitespace-pre-line text-xs font-sans sm:text-[13px]">
                            {msg.text}
                          </p>

                          {/* Code Snippet Attachment Preview */}
                          {msg.codeSnippet && (
                            <div className="mt-3 p-3 rounded-xl bg-black/80 border border-zinc-700/80 font-mono text-[11px] text-emerald-300 overflow-x-auto space-y-2">
                              <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1 border-b border-zinc-800">
                                <span className="flex items-center gap-1 text-[#00D4FF]">
                                  <Code2 className="w-3.5 h-3.5" />
                                  Attached Code / Prompt Architecture
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(msg.codeSnippet || '');
                                    setMentorCopiedId(msg.id);
                                    setTimeout(() => setMentorCopiedId(null), 2000);
                                  }}
                                  className="text-zinc-400 hover:text-white transition flex items-center gap-1"
                                >
                                  {mentorCopiedId === msg.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="whitespace-pre overflow-x-auto text-zinc-300">
                                {msg.codeSnippet}
                              </pre>
                            </div>
                          )}

                          {/* Status delivery ticks */}
                          <div className={`mt-2 flex items-center justify-end gap-1 text-[10px] ${
                            isMentee ? 'text-emerald-200' : 'text-zinc-500'
                          }`}>
                            <span>{msg.timestamp}</span>
                            {isMentee && (
                              <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Mentor formulated thought typing simulation */}
                  {isMentorTyping && (
                    <div className="flex items-center gap-2 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-[11px] text-[#00D4FF] animate-pulse w-fit">
                      <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
                      <span>{facultyMentor.name} is auditing your inquiry &amp; formulating advice...</span>
                    </div>
                  )}
                </div>

                {/* Expandable Code / Prompt Snippet Attachment Form */}
                {showCodeInput && (
                  <div className="p-4 bg-zinc-900 border-t border-zinc-800 space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-[#00D4FF] font-bold flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5" />
                        Attach Solidity Contract, Python Agent, or Capstone Prompt:
                      </span>
                      <button
                        onClick={() => {
                          setMentorCodeSnippet('');
                          setShowCodeInput(false);
                        }}
                        className="text-zinc-500 hover:text-white text-[10px]"
                      >
                        Cancel
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      value={mentorCodeSnippet}
                      onChange={e => setMentorCodeSnippet(e.target.value)}
                      placeholder="// Paste code or prompt here for live Faculty Mentor audit...&#10;contract SovereignAgentVault { ... }"
                      className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-xs text-emerald-300 font-mono outline-none focus:border-emerald-400"
                    />
                  </div>
                )}

                {/* Message Input Form */}
                <form
                  onSubmit={handleSendMentorMessage}
                  className="p-4 bg-zinc-900/95 border-t border-zinc-800 flex flex-col sm:flex-row items-center gap-2.5"
                >
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      value={mentorInput}
                      onChange={e => setMentorInput(e.target.value)}
                      placeholder={`Confidential message to ${facultyMentor.name}... (e.g., funding proposal, smart contract bug, agent swarm)`}
                      className="w-full bg-black border border-zinc-800 focus:border-emerald-400 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 outline-none pr-10 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCodeInput(!showCodeInput)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-emerald-400 transition"
                      title="Attach Code"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setShowOfficeHoursModal(true)}
                      className="p-3 bg-zinc-800 hover:bg-zinc-700 text-purple-300 rounded-2xl transition flex items-center justify-center"
                      title="Book 1:1 Office Hours"
                    >
                      <Calendar className="w-4 h-4" />
                    </button>

                    <button
                      type="submit"
                      disabled={(!mentorInput.trim() && !mentorCodeSnippet.trim()) || isMentorTyping}
                      className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black rounded-2xl font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Secure</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Office Hours Booking Modal */}
            {showOfficeHoursModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                <div className="relative w-full max-w-md bg-zinc-950 border border-purple-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in font-mono text-xs">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto">
                    <Calendar className="w-6 h-6" />
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                      1-ON-1 FACULTY MENTORSHIP
                    </span>
                    <h3 className="text-xl font-heading font-black text-white">
                      Book Office Hours with {facultyMentor.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Reserve a confidential 30-minute architectural, security, or venture funding review session.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        label: 'Tomorrow • 2:00 PM - 2:30 PM (GMT+1)',
                        hub: 'Port Harcourt & Lagos Hub (Virtual Meet)',
                        type: 'Venture & Seed Funding Review'
                      },
                      {
                        label: 'Friday • 4:30 PM - 5:00 PM (GMT+1)',
                        hub: 'Nairobi & Johannesburg Room',
                        type: 'Base L2 Smart Contract & Gas Audit'
                      },
                      {
                        label: 'Saturday • 11:00 AM - 11:30 AM (GMT+1)',
                        hub: 'Accra & Global WebRTC Mesh',
                        type: 'Autonomous Agent Swarm Architecture'
                      },
                      {
                        label: 'Monday • 5:00 PM - 5:30 PM (GMT+1)',
                        hub: 'Executive Dean Direct Office',
                        type: 'Capstone Defense & Angel Match'
                      }
                    ].map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleBookOfficeHour(slot.label)}
                        className="w-full text-left p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-400 hover:bg-zinc-850 transition group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold group-hover:text-purple-300 transition">
                            {slot.label}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-[10px] text-purple-300 border border-purple-800">
                            Slot Open
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-1">
                          <span>{slot.type}</span>
                          <span className="text-zinc-500">{slot.hub}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowOfficeHoursModal(false)}
                    className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition text-xs font-bold"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}

            {/* AI Text-To-Speech (TTS) Voice Engine Control Console */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleToggleSpeech}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition w-full sm:w-auto ${
                    isSpeaking && !isPaused
                      ? 'bg-amber-500 text-black animate-pulse'
                      : 'bg-[#FFD700] hover:bg-[#e6c200] text-black shadow-lg shadow-[#FFD700]/20'
                  }`}
                >
                  {isSpeaking && !isPaused ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Speech</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Listen to Lecture Audio (TTS)</span>
                    </>
                  )}
                </button>

                {isSpeaking && (
                  <button
                    onClick={handleStopSpeech}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition"
                    title="Stop Audio"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                )}

                {/* Animated Speech Soundwave Bars */}
                <div className="flex items-center gap-1 h-6">
                  {[20, 12, 28, 16, 24, 14, 30, 18].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full bg-[#00D4FF] transition-all duration-150 ${
                        isSpeaking && !isPaused ? 'animate-pulse' : 'opacity-30'
                      }`}
                      style={{ height: isSpeaking && !isPaused ? `${h}px` : '4px' }}
                    />
                  ))}
                </div>
              </div>

              {/* Speech Controls & Speed */}
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span>Speed:</span>
                {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setSpeechRate(speed)}
                    className={`px-2 py-0.5 rounded text-[11px] transition ${
                      speechRate === speed
                        ? 'bg-[#00D4FF] text-black font-bold'
                        : 'bg-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lecture Modules Playlist */}
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FFD700]" />
                Lecture Syllabus &amp; Audio Summaries (3 Modules)
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                100% On-Chain Mintable
              </span>
            </div>

            <div className="space-y-3">
              {lectureModules.map((module, idx) => (
                <div
                  key={module.id}
                  onClick={() => {
                    handleStopSpeech();
                    setActiveLectureIndex(idx);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    activeLectureIndex === idx
                      ? 'bg-zinc-900 border-[#FFD700]/60 shadow-lg shadow-[#FFD700]/5'
                      : 'bg-zinc-950 hover:bg-zinc-900/50 border-zinc-800/80'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-[#00D4FF] font-bold">
                        MODULE 0{idx + 1}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-mono text-zinc-400">{module.duration}</span>
                      {activeLectureIndex === idx && (
                        <span className="px-1.5 py-0.5 rounded bg-[#FFD700]/10 text-[#FFD700] text-[9px] font-mono font-bold border border-[#FFD700]/30">
                          Now Playing
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white font-sans">{module.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
                      {module.summary}
                    </p>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setActiveLectureIndex(idx);
                      handleToggleSpeech();
                    }}
                    className="shrink-0 p-2.5 rounded-xl bg-zinc-800 hover:bg-[#FFD700] text-zinc-300 hover:text-black transition self-start sm:self-center"
                    title="Play Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: School Licensing, Iframe Generator, Paystack & NFT Vault (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mine & Mint Lecture CTA Card */}
          <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl border-2 border-[#FFD700]/40 p-6 sm:p-7 space-y-4 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" /> SOVEREIGN LECTURE NFT MINTING
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                +150 BaaCoin
              </span>
            </div>

            <h2 className="text-lg font-heading font-black text-white">
              Attend &amp; Inscribe Proof-of-Mastery
            </h2>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Listening to this lecture qualifies you to mine <strong>150 BaaCoin ($150 USD)</strong> directly to your student wallet and inscribe a Soulbound NFT Certificate on the Africa Blockchain &amp; AI University ledger.
            </p>

            <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Mining Reward:</span>
                <span className="text-emerald-400 font-bold">+150.00 BaaCoin</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>XP Gain:</span>
                <span className="text-[#00D4FF] font-bold">+250 XP</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Smart Contract Subnet:</span>
                <span className="text-white">BAA-Univ-01</span>
              </div>
            </div>

            <button
              onClick={handleStartLectureMining}
              className="w-full py-3.5 bg-gradient-to-r from-[#FFD700] via-[#E5A800] to-[#FFD700] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Verify &amp; Mint Lecture NFT Now</span>
            </button>
          </div>

          {/* Embed Iframe Code Box */}
          <div className="bg-zinc-950 rounded-3xl border border-[#00D4FF]/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] font-bold">
                <Code2 className="w-4 h-4" />
                <span>PLUG &amp; PLAY IFRAME EMBED CODE</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-mono font-bold transition border border-[#00D4FF]/30"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Code Copied!' : 'Copy Iframe'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Paste this snippet into any school, university portal, LMS (Moodle, Blackboard, Canvas) or custom website. The AI tutor runs autonomously 24/7.
            </p>

            <pre className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap">
              {embedCode}
            </pre>

            {/* Autonomous Billing Verification Notice */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Autonomous School License:</span>
                <span className="text-[#FFD700] font-bold">${tutor.price_monthly} USD / month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Paystack / Card Billing Check:</span>
                <span className="text-emerald-400 font-bold">
                  {schoolSubscribed ? 'Active (Auto-Renewing)' : 'Suspended'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                Full autonomy rule: If the school cancels or card fails, the tutor auto-stops serving queries until payment clears.
              </p>

              <div className="pt-2">
                <PaystackButton
                  amount={tutor.price_monthly}
                  type="tutor_hire"
                  tutorId={tutor.id}
                  tutorName={tutor.name}
                  label={`Hire ${tutor.name} ($${tutor.price_monthly}/mo Paystack Subscription)`}
                  onSuccess={() => {
                    setSchoolSubscribed(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lecture NFT Minting Modal */}
      {isMintingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="text-center space-y-2">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center">
                <Award className="w-8 h-8 text-[#FFD700]" />
              </div>
              <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-bold">
                Africa Blockchain &amp; AI University
              </span>
              <h2 className="text-xl font-heading font-black text-white">
                Lecture Proof-of-Mastery Minting
              </h2>
            </div>

            {/* Stepper Status */}
            {mintStatus === 'verifying' && (
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-zinc-300">
                  Verifying student attendance signature &amp; audio comprehension proofs...
                </p>
              </div>
            )}

            {mintStatus === 'mining' && (
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-[#FFD700] font-bold">
                  Mining cryptographic block on Africa Blockchain subnet...
                </p>
                <p className="text-[11px] font-mono text-zinc-400">
                  Allocating +150 BaaCoin directly to wallet balance
                </p>
              </div>
            )}

            {mintStatus === 'minted' && mintedCert && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-base font-bold text-white font-heading">
                    Mastery Inscribed Successfully!
                  </h3>
                  <p className="text-xs text-emerald-300 font-mono">
                    +150 BaaCoin Credited • Verified On-Chain
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono space-y-2">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>NFT Token ID:</span>
                    <span className="text-[#00D4FF] font-bold truncate max-w-[200px]">
                      {mintedCert.nft_id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Tutor Signature:</span>
                    <span className="text-white truncate max-w-[200px]">{tutor.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Transaction Hash:</span>
                    <span className="text-emerald-400 truncate max-w-[200px]">
                      {txHash}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsMintingModalOpen(false);
                      if (onViewCertificate && mintedCert) {
                        onViewCertificate(mintedCert);
                      }
                    }}
                    className="flex-1 py-3 bg-[#FFD700] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#e6c200] transition text-center"
                  >
                    View Verifiable Certificate
                  </button>
                  <button
                    onClick={() => setIsMintingModalOpen(false)}
                    className="px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs rounded-xl hover:text-white transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TutorDetailPage;
