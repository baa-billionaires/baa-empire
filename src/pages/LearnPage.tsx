import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Certificate } from '../components/Certificate';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle,
  Cpu,
  Coins,
  Send,
  Sparkles,
  ArrowLeft,
  Award,
  Zap,
  Bot,
  FileCode,
  Terminal,
  Check,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

interface LearnPageProps {
  courseId: string;
  onBack: () => void;
  onNavigateToMarketplace: () => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  courseId,
  onBack,
  onNavigateToMarketplace
}) => {
  const {
    courses,
    enrollments,
    recordInteraction,
    completeCourse,
    certificates,
    latestMiningBlock
  } = useEcosystem();

  const course = courses.find(c => c.id === courseId) || courses[0];
  const enrollment = enrollments.find(e => e.course_id === course.id);

  // Active module & lesson tracking
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  // Interactive AI Tutor state
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorChat, setTutorChat] = useState<Array<{ sender: 'user' | 'tutor'; text: string }>>([
    {
      sender: 'tutor',
      text: `Greetings scholar! I am your AI Mentor assigned to "${course.title}". Every question you ask and research you test mines live BaaCoin and compiles into your 60/40 Mastery Prompt package.`
    }
  ]);
  const [isTutorThinking, setIsTutorThinking] = useState(false);

  // Practical Assignment state
  const [assignmentCode, setAssignmentCode] = useState(
    `// Deploying Autonomous Pipeline for: ${course.title}\nconst pipeline = new AutonomousAgent({\n  niche: "${course.title}",\n  miningToken: "BAACOIN",\n  royaltyShare: "60/40"\n});\npipeline.execute();`
  );
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  // Capstone Research state
  const [researchTitle, setResearchTitle] = useState(`${course.title} - Autonomous Synthesis & Yield Framework`);
  const [researchData, setResearchData] = useState(
    `RESEARCH SYNTHESIS:\n- Identified automated revenue bottleneck in legacy setups.\n- Implemented multi-agent prompt cascade with deterministic outputs.\n- Enforced 10x BaaCoin locked liquidity reserve.\n- Designed zero-shot prompt prompts package for public marketplace distribution.`
  );
  const [researchSubmitted, setResearchSubmitted] = useState(false);

  // Mining animation state
  const [isMiningActive, setIsMiningActive] = useState(false);
  const [miningLog, setMiningLog] = useState<string[]>([]);
  const [videoTimer, setVideoTimer] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Graduation Modal state
  const [graduatedCertificate, setGraduatedCertificate] = useState<any>(null);

  // Check if course already completed
  const isCompleted = enrollment?.completed || (enrollment?.progress || 0) >= 100;
  const existingCert = certificates.find(c => c.course_id === course.id);

  // Simulated Video Watch Miner (Every 12s simulated represents 1 min lecture tick -> +5 XP, +0.5 BaaCoin)
  useEffect(() => {
    let interval: any;
    if (isVideoPlaying) {
      interval = setInterval(() => {
        setVideoTimer(prev => {
          const next = prev + 1;
          if (next % 6 === 0) {
            triggerMineAction('video_watch', `Watched lecture segment on "${course.title}"`);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVideoPlaying, course]);

  const triggerMineAction = (
    type: 'video_watch' | 'ai_tutor_query' | 'assignment_complete' | 'research_submit',
    promptData: string
  ) => {
    setIsMiningActive(true);
    const { xp, baacoin, block } = recordInteraction({
      courseId: course.id,
      type,
      promptData
    });

    const logEntry = `[${new Date().toLocaleTimeString()}] MINED +${baacoin} BaaCoin (+${xp} XP) | Block ${block.hash.substring(0, 10)}... | Nonce: ${block.nonce}`;
    setMiningLog(prev => [logEntry, ...prev.slice(0, 7)]);

    setTimeout(() => {
      setIsMiningActive(false);
    }, 1200);

    return { xp, baacoin };
  };

  // Handle Asking AI Tutor
  const handleAskTutor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim() || isTutorThinking) return;

    const userText = tutorQuery;
    setTutorChat(prev => [...prev, { sender: 'user', text: userText }]);
    setTutorQuery('');
    setIsTutorThinking(true);

    setTimeout(() => {
      let tutorAnswer = `EXPERT ANALYSIS: In ${course.title}, executing "${userText}" requires structuring deterministic multi-shot parameters. 1) Define state boundaries. 2) Anchor tokenized yield triggers. 3) Output formatted in 60/40 royalty prompt schema.`;

      if (userText.toLowerCase().includes('baacoin') || userText.toLowerCase().includes('networth')) {
        tutorAnswer = `BAACOIN 10X NETWORTH INSIGHT: Your enrollment credited ${course.baacoin_value} BaaCoin to your networth. As you interact in this portal, you are mining live BaaCoin. Upon reaching 100% progress, 20% of your networth instantly unlocks to your spendable wallet!`;
      }

      setTutorChat(prev => [...prev, { sender: 'tutor', text: tutorAnswer }]);
      setIsTutorThinking(false);

      // Trigger Learn-to-Mine: +10 XP, +1 BaaCoin
      triggerMineAction('ai_tutor_query', `Q: ${userText} | A: ${tutorAnswer}`);
    }, 900);
  };

  // Handle Practical Assignment Submission
  const handleSubmitAssignment = () => {
    if (assignmentSubmitted) return;
    setAssignmentSubmitted(true);
    triggerMineAction('assignment_complete', `ASSIGNMENT CODE:\n${assignmentCode}`);
  };

  // Handle Capstone Research Submission & Final Graduation
  const handleSubmitResearch = () => {
    if (researchSubmitted) return;
    setResearchSubmitted(true);
    triggerMineAction('research_submit', `CAPSTONE RESEARCH:\n${researchTitle}\n\n${researchData}`);

    // Trigger full graduation & unlock logic!
    setTimeout(() => {
      const cert = completeCourse(course.id);
      setGraduatedCertificate(cert);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#00D4FF', '#FFFFFF']
      });
    }, 800);
  };

  const progress = enrollment?.progress || 0;
  const totalMined = enrollment?.total_mined || 0;

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FFD700] transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        {/* Live Mining Status Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-[#FFD700]/30 text-xs font-mono">
            <Coins className="w-4 h-4 text-[#FFD700]" />
            <span className="text-zinc-400">Course Mined:</span>
            <span className="text-[#FFD700] font-bold">{totalMined} BaaCoin</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-[#00D4FF]/30 text-xs font-mono">
            <TrendingUp className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-zinc-400">Progress:</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          {(isCompleted || existingCert) && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-xs font-mono text-emerald-400 font-bold">
              <Award className="w-4 h-4" />
              <span>GRADUATED</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Learning Workspace (Left 8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Course Banner & Video Simulator */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-zinc-900 flex items-center justify-center overflow-hidden">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoPlaying ? 'opacity-30' : 'opacity-60'
                }`}
              />

              {/* Video Play Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 text-center">
                {!isVideoPlaying ? (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black flex items-center justify-center shadow-2xl shadow-[#FFD700]/40 hover:scale-105 active:scale-95 transition"
                  >
                    <Play className="w-8 h-8 fill-black translate-x-0.5" />
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>LEARN-TO-MINE STREAMING (+0.5 BaaCoin/min)</span>
                    </div>
                    <span className="text-3xl font-mono font-bold text-white tracking-widest">
                      {Math.floor(videoTimer / 60)}:{(videoTimer % 60).toString().padStart(2, '0')}
                    </span>
                    <button
                      onClick={() => setIsVideoPlaying(false)}
                      className="text-xs text-zinc-400 hover:text-white underline font-mono"
                    >
                      Pause Stream
                    </button>
                  </div>
                )}
                <h2 className="mt-4 text-xl font-heading font-bold text-white max-w-xl">
                  {course.title}
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Instructor: {course.instructor}
                </p>
              </div>

              {/* Real-time Mining Pulse Bar */}
              {isMiningActive && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#FFD700] py-1 text-black font-mono text-[11px] font-bold text-center tracking-wider animate-pulse">
                  ⚡ MINING BAACOIN HASH VERIFIED • REWARD CREDITED TO ENROLLMENT ⚡
                </div>
              )}
            </div>

            {/* Course Module Tabs */}
            <div className="p-6 border-t border-zinc-800/80">
              <h3 className="text-base font-bold text-white mb-2 font-heading">
                Course Syllabus &amp; Interactive Milestones
              </h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Complete assignments, consult your AI Tutor, and submit capstone research to hit 100% progress. This unlocks your 10x BaaCoin Networth and generates your tradable NFT Certificate with engraved Chip.
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-900 rounded-full h-3 p-0.5 border border-zinc-800 mb-6">
                <div
                  className="bg-gradient-to-r from-[#FFD700] to-[#00D4FF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Interactive Milestones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Milestone 1: Lecture Watch */}
                <div
                  onClick={() => setIsVideoPlaying(true)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    videoTimer > 10
                      ? 'bg-zinc-900/90 border-[#00D4FF]/40'
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[#00D4FF] font-bold uppercase">
                      Milestone 1
                    </span>
                    <Coins className="w-3.5 h-3.5 text-[#FFD700]" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Watch Core Video</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">Mines +0.5 BaaCoin &amp; +5 XP continuously</p>
                </div>

                {/* Milestone 2: Assignment */}
                <div
                  className={`p-3.5 rounded-xl border transition ${
                    assignmentSubmitted
                      ? 'bg-emerald-950/40 border-emerald-500/40'
                      : 'bg-zinc-900/40 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-[#FFD700] font-bold uppercase">
                      Milestone 2
                    </span>
                    {assignmentSubmitted ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white">Live Code Lab</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {assignmentSubmitted ? 'Completed (+10 BaaCoin)' : '+10 BaaCoin & +50 XP'}
                  </p>
                </div>

                {/* Milestone 3: Capstone Research */}
                <div
                  className={`p-3.5 rounded-xl border transition ${
                    researchSubmitted
                      ? 'bg-emerald-950/40 border-emerald-500/40'
                      : 'bg-zinc-900/40 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                      Capstone
                    </span>
                    <Award className="w-3.5 h-3.5 text-[#FFD700]" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Graduate &amp; Mint NFT</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    {isCompleted ? '100% Unlocked!' : '+20 BaaCoin & Unlock Networth'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Assignment Editor */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Practical Milestone: Autonomous Pipeline Code
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                +10 BAACOIN REWARD
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-3">
              Configure and test your execution script for this course. Submitting updates your learning interactions and mines block verification.
            </p>
            <textarea
              value={assignmentCode}
              onChange={(e) => setAssignmentCode(e.target.value)}
              rows={5}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl p-3 text-xs font-mono text-amber-200 outline-none transition resize-none"
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSubmitAssignment}
                disabled={assignmentSubmitted}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  assignmentSubmitted
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black hover:brightness-110 active:scale-95'
                }`}
              >
                {assignmentSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Assignment Deployed &amp; Mined</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Deploy &amp; Mine +10 BaaCoin</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Capstone Research Submission (Triggers Graduation & 60/40 Prompt Compilation) */}
          <div className="bg-zinc-950 rounded-2xl border border-[#FFD700]/30 p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Capstone Research &amp; Prompt Compilation
                </h3>
              </div>
              <span className="text-xs font-mono text-[#FFD700] bg-[#FFD700]/10 px-2.5 py-0.5 rounded border border-[#FFD700]/30 font-bold">
                GRADUATION GATEWAY
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Submitting this final synthesis completes the course 100%. Our AI summarizer will compile your answers into a high-value Mastery Prompt listed in the Marketplace (60% sales revenue to your wallet), and generate your NFT Certificate with an engraved BaaCoin Chip.
            </p>

            <input
              type="text"
              value={researchTitle}
              onChange={(e) => setResearchTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-mono text-white mb-2 outline-none"
              placeholder="Research Title"
            />
            <textarea
              value={researchData}
              onChange={(e) => setResearchData(e.target.value)}
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl p-3 text-xs font-mono text-cyan-200 outline-none transition resize-none"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-zinc-400">
                Reward: <span className="text-emerald-400 font-bold">+20 BaaCoin</span> • <span className="text-[#FFD700] font-bold">100% Graduation</span>
              </div>
              <button
                onClick={handleSubmitResearch}
                disabled={researchSubmitted || isCompleted}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                  researchSubmitted || isCompleted
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black hover:brightness-110 active:scale-95 shadow-lg shadow-[#00D4FF]/25'
                }`}
              >
                {researchSubmitted || isCompleted ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Graduation Capstone Verified</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-black" />
                    <span>Submit, Unlock Networth &amp; Mint NFT</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Tutor Sidecar & Live Mining Terminal (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Live AI Tutor Sidecar Chat */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col h-[520px] shadow-2xl overflow-hidden">
            <div className="p-4 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono">Autonomous AI Tutor</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • +1 BaaCoin / Query
                  </span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {tutorChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <span className="text-[10px] font-mono text-zinc-500 mb-0.5">
                    {msg.sender === 'user' ? 'You (Student)' : 'AI Mentor'}
                  </span>
                  <div
                    className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#FFD700] text-black font-medium'
                        : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTutorThinking && (
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
                  <Bot className="w-3.5 h-3.5 text-[#00D4FF] animate-spin" />
                  <span>Synthesizing response &amp; mining block...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleAskTutor} className="p-3 bg-zinc-900/90 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={tutorQuery}
                onChange={(e) => setTutorQuery(e.target.value)}
                placeholder="Ask technical question (+1 BaaCoin)..."
                className="flex-1 bg-zinc-950 border border-zinc-700 focus:border-[#FFD700] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none transition"
              />
              <button
                type="submit"
                disabled={!tutorQuery.trim() || isTutorThinking}
                className="px-3.5 py-2 bg-[#FFD700] text-black rounded-xl hover:brightness-110 active:scale-95 disabled:opacity-40 transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Real-time Mining Terminal */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF]">
                <Terminal className="w-3.5 h-3.5" />
                <span>BAACOIN MINING TERMINAL</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">POW-LEARN</span>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] text-zinc-400 max-h-48 overflow-y-auto">
              <div className="text-zinc-500">Hash Rate: 42.8 MH/s | Algorithm: SHA-Learn</div>
              {miningLog.length === 0 ? (
                <div className="text-zinc-600 italic">No mining transactions yet. Interact to mine blocks!</div>
              ) : (
                miningLog.map((log, i) => (
                  <div key={i} className="text-[#FFD700]/90 border-l border-[#FFD700]/30 pl-2">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Graduation & NFT Certificate Modal */}
      {(graduatedCertificate || (isCompleted && existingCert)) && (
        <div className="max-w-7xl mx-auto mt-12 bg-zinc-950 rounded-3xl border border-[#FFD700]/40 p-6 sm:p-10 shadow-2xl shadow-[#FFD700]/10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 font-mono text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" /> 100% CAPSTONE GRADUATION ACHIEVED
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Your BaaCoin Networth is Unlocked!
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              20% of your <span className="text-[#FFD700] font-bold">{course.baacoin_value} BaaCoin</span> has been immediately deposited into your spendable balance. Your NFT Certificate with physical/digital Chip is minted and tradable for life!
            </p>
          </div>

          {/* Render Certificate Component */}
          <Certificate certificate={graduatedCertificate || existingCert} showActions={true} />

          {/* Post Graduation CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToMarketplace}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/25 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>View My Listed 60/40 Prompt in Marketplace</span>
            </button>

            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition"
            >
              Explore Next Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LearnPage;
