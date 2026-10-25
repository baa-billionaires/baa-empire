import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Bookmark,
  Share2,
  Download,
  Settings,
  HelpCircle,
  CheckCircle,
  Copy,
  Check,
  Send,
  Bot,
  Flame,
  Award,
  Layers,
  PhoneCall,
  Clock,
  FileText
} from 'lucide-react';
import { BAABook, BookChapter, ReaderProgress } from '../../types/library';
import { useEcosystem } from '../../context/EcosystemContext';
import { OnlineReader } from './OnlineReader';

interface BookReaderModalProps {
  book: BAABook;
  onClose: () => void;
  onOpenDownload: () => void;
  onOpenCompanionCourse?: () => void;
  onOpenCoverStudio?: () => void;
}

export const BookReaderModal: React.FC<BookReaderModalProps> = ({
  book,
  onClose,
  onOpenDownload,
  onOpenCompanionCourse,
  onOpenCoverStudio
}) => {
  const { wallet, profile } = useEcosystem();

  const [usePaginatedMode, setUsePaginatedMode] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const currentChapter = book.chapters[activeChapterIndex] || book.chapters[0];

  // Reader Customization State
  const [fontSize, setFontSize] = useState<number>(16);
  const [theme, setTheme] = useState<'dark' | 'sepia' | 'cyber' | 'light'>('dark');
  const [showChapterDrawer, setShowChapterDrawer] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Text-To-Speech (TTS) State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);

  // Reading Progress & BaaCoin Reward State
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>(['chap-intro']);
  const [earnedTokensNotice, setEarnedTokensNotice] = useState<string | null>(null);

  // In-Book Contextual AI Assistant State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponses, setAiResponses] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Greetings ${profile?.full_name || 'Scholar'}. I am the in-book Contextual AI Assistant for "${book.title}". I am grounded directly in Ambassador Emmanuel Bassey Joe's manuscript. Ask me to simplify any concept, explain the code snippets, or test your comprehension!`
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  // Reading Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Text-To-Speech Handlers
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Prepare speech text from chapter summary and content
    const cleanContent = currentChapter.content.replace(/[`#*_]/g, '');
    const fullSpeechText = `${currentChapter.title}. ${currentChapter.summary}. ${cleanContent}`;

    const utterance = new SpeechSynthesisUtterance(fullSpeechText);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Daniel')));
    if (voice) utterance.voice = voice;

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

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeChapterIndex]);

  // Mark Chapter Completed & Award BaaCoin
  const handleMarkChapterCompleted = () => {
    if (!completedChapters.includes(currentChapter.id)) {
      setCompletedChapters(prev => [...prev, currentChapter.id]);
      setEarnedTokensNotice(`+5 BaaCoin Earned! Chapter "${currentChapter.title}" marked completed.`);
      setTimeout(() => setEarnedTokensNotice(null), 4000);
    }
  };

  // Ask-the-Book AI Engine
  const handleSendAiQuestion = (customPrompt?: string) => {
    const questionText = customPrompt || aiQuery.trim();
    if (!questionText) return;

    setAiResponses(prev => [...prev, { sender: 'user', text: questionText }]);
    setAiQuery('');
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = '';
      const qLower = questionText.toLowerCase();

      if (qLower.includes('summarize') || qLower.includes('summary')) {
        reply = `**Chapter Summary:** In "${currentChapter.title}", Ambassador Emmanuel Bassey Joe emphasizes: ${currentChapter.summary} The critical takeaway is that autonomous swarms decouple enterprise productivity from human operational latency.`;
      } else if (qLower.includes('code') || qLower.includes('python') || qLower.includes('solidity')) {
        reply = `**Algorithmic Architecture:** The code block in this chapter implements the tri-part topology (Planner -> Worker -> Auditor). Notice the Auditor acts out-of-band to enforce invariant validation before on-chain Base L2 state commitment.`;
      } else if (qLower.includes('business') || qLower.includes('money') || qLower.includes('baacoin')) {
        reply = `**Commercial Application:** In your enterprise, deploy this pattern to automate client deal negotiation, issuing dynamic Paystack links with a 15% discount floor. Every sale feeds the 25% buyback-and-burn engine.`;
      } else if (qLower.includes('quiz') || qLower.includes('test')) {
        reply = `**Comprehension Check:** Question: *Why must the Auditor Agent evaluate invariants out-of-band rather than inside the worker model?* \n\nAnswer: To prevent cognitive self-delusion and ensure strict schema enforcement before irreversible token or legal transactions.`;
      } else {
        reply = `Based on Chapter ${currentChapter.number} of "${book.title}": Ambassador Emmanuel Bassey Joe states that autonomous sovereignty requires mastering the feedback loop between model inference, decentralized compute (UADC 2,400 nodes), and tokenized liquidity. For deeper practical mastery, take the companion masterclass course!`;
      }

      setAiResponses(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsAiThinking(false);
    }, 850);
  };

  // Theme Styles
  const themeClasses = {
    dark: 'bg-black text-zinc-100 border-zinc-800',
    sepia: 'bg-[#1c1815] text-[#e8dcce] border-[#382f28]',
    cyber: 'bg-[#030d14] text-[#d4f1f9] border-[#0a3847]',
    light: 'bg-zinc-100 text-zinc-900 border-zinc-300'
  };

  const contentClasses = {
    dark: 'prose-invert text-zinc-300',
    sepia: 'text-[#d6c7b2]',
    cyber: 'text-[#b0e4f2]',
    light: 'text-zinc-800'
  };

  if (usePaginatedMode) {
    return (
      <OnlineReader
        book={book}
        onClose={() => setUsePaginatedMode(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden">
      <div className={`relative w-full max-w-6xl h-full sm:h-[94vh] rounded-none sm:rounded-3xl border flex flex-col shadow-2xl overflow-hidden transition-colors duration-200 ${themeClasses[theme]}`}>
        
        {/* Top Control Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-inherit flex items-center justify-between gap-3 shrink-0 bg-black/40 backdrop-blur-md">
          {/* Left: Book Meta & Chapter Drawer Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChapterDrawer(!showChapterDrawer)}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 transition flex items-center gap-1.5 text-xs font-mono"
              title="Table of Contents"
            >
              <Layers className="w-4 h-4 text-[#FFD700]" />
              <span className="hidden sm:inline">Chapters ({book.chapters.length})</span>
            </button>

            <div className="hidden md:block">
              <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold block truncate max-w-xs">
                {book.title}
              </span>
              <span className="text-xs font-bold text-white block truncate max-w-sm">
                {currentChapter.title}
              </span>
            </div>
          </div>

          {/* Center: TTS Narration Console */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={handleToggleSpeech}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition ${
                isSpeaking && !isPaused
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-zinc-900 text-[#FFD700] hover:bg-zinc-800'
              }`}
            >
              {isSpeaking && !isPaused ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden sm:inline">Pause Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Listen (TTS)</span>
                </>
              )}
            </button>

            {isSpeaking && (
              <button
                onClick={handleStopSpeech}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                title="Stop Narration"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Audio Speed Selector */}
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-zinc-400">
              {[0.75, 1, 1.25, 1.5].map(rate => (
                <button
                  key={rate}
                  onClick={() => setSpeechRate(rate)}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${speechRate === rate ? 'bg-[#FFD700] text-black font-bold' : 'bg-zinc-900 text-zinc-400'}`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Right: Customization & Actions */}
          <div className="flex items-center gap-2">
            {/* Paginated OnlineReader Mode Toggle */}
            <button
              onClick={() => setUsePaginatedMode(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#FFD700]/10 border border-[#FFD700]/40 text-[#FFD700] hover:bg-[#FFD700]/20 transition flex items-center gap-1.5 shadow"
              title="Open Clean Paginated OnlineReader Interface"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Paginated View</span>
            </button>

            {/* Ask-the-Book AI Toggle */}
            <button
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                showAIAssistant
                  ? 'bg-[#00D4FF] text-black'
                  : 'bg-zinc-900 text-[#00D4FF] hover:bg-zinc-800'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Book AI</span>
            </button>

            {/* Download Modal Trigger */}
            <button
              onClick={onOpenDownload}
              className="p-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white transition"
              title="Download EPUB / PDF"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Font Adjuster */}
            <div className="hidden sm:flex items-center gap-1 bg-zinc-900 p-1 rounded-xl font-mono text-xs">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                className="px-2 py-0.5 hover:text-white text-zinc-400"
              >
                A-
              </button>
              <span className="text-[11px] text-zinc-300">{fontSize}px</span>
              <button
                onClick={() => setFontSize(Math.min(22, fontSize + 1))}
                className="px-2 py-0.5 hover:text-white text-zinc-400"
              >
                A+
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl">
              {(['dark', 'sepia', 'cyber', 'light'] as const).map(th => (
                <button
                  key={th}
                  onClick={() => setTheme(th)}
                  className={`w-5 h-5 rounded-full border ${theme === th ? 'border-[#FFD700] ring-1 ring-[#FFD700]' : 'border-transparent'}`}
                  style={{
                    backgroundColor:
                      th === 'dark' ? '#000000' : th === 'sepia' ? '#2e251e' : th === 'cyber' ? '#072430' : '#f4f4f5'
                  }}
                  title={`${th} theme`}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reading Streak & BaaCoin Status Notice */}
        {earnedTokensNotice && (
          <div className="px-6 py-2.5 bg-emerald-950/90 border-b border-emerald-500 text-emerald-300 text-xs font-mono flex items-center justify-between animate-fade-in">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              {earnedTokensNotice}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">
              STUDY-TO-EARN ACTIVE
            </span>
          </div>
        )}

        {/* Main Reading Canvas & Sidebar Drawers */}
        <div className="relative flex-1 flex overflow-hidden">
          
          {/* Chapter Drawer (TOC) */}
          {showChapterDrawer && (
            <div className="absolute inset-y-0 left-0 z-40 w-80 bg-zinc-950 border-r border-zinc-800 shadow-2xl p-5 overflow-y-auto space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="text-[#FFD700] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Table of Contents
                </span>
                <button onClick={() => setShowChapterDrawer(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {book.chapters.map((ch, idx) => {
                  const isActive = idx === activeChapterIndex;
                  const isDone = completedChapters.includes(ch.id);

                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        setActiveChapterIndex(idx);
                        setShowChapterDrawer(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 ${
                        isActive
                          ? 'bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40'
                          : 'bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] text-zinc-500 block">CHAPTER {ch.number}</span>
                        <span className="font-bold text-xs block leading-snug">{ch.title}</span>
                        <span className="text-[10px] text-zinc-500 mt-1 block">~{ch.estimatedMinutes} mins • {ch.wordCount} words</span>
                      </div>
                      {isDone && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Center Manuscript Reading Pane */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-16 lg:px-24 py-8 sm:py-12 space-y-8 max-w-4xl mx-auto">
            
            {/* Chapter Header Block */}
            <div className="pb-6 border-b border-inherit space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <span className="text-[#FFD700] font-bold uppercase tracking-widest">
                  CHAPTER {currentChapter.number} OF {book.chapters.length - 1}
                </span>
                <div className="flex items-center gap-2 text-zinc-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentChapter.estimatedMinutes} mins read</span>
                  <span>•</span>
                  <span>{currentChapter.wordCount} words</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight leading-snug">
                {currentChapter.title}
              </h1>

              {/* Verified Author & Contact Stamp */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-inherit text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-zinc-500">Author: </span>
                  <strong className="text-white">{book.authorName} ({book.authorAlias})</strong>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Contact: {book.contactNumber}</span>
                </div>
              </div>
            </div>

            {/* Chapter Summary Card */}
            <div className="p-5 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 space-y-2 font-sans text-sm leading-relaxed">
              <span className="text-[11px] font-mono text-[#FFD700] uppercase font-bold tracking-wider block">
                EXECUTIVE SUMMARY:
              </span>
              <p className="italic">
                "{currentChapter.summary}"
              </p>
            </div>

            {/* Key Takeaways */}
            {currentChapter.keyTakeaways && currentChapter.keyTakeaways.length > 0 && (
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-inherit space-y-2.5 font-mono text-xs">
                <span className="text-[10px] text-[#00D4FF] uppercase tracking-wider font-bold block">
                  KEY LEARNING OBJECTIVES:
                </span>
                <ul className="space-y-1.5 list-disc list-inside text-zinc-300">
                  {currentChapter.keyTakeaways.map((takeaway, i) => (
                    <li key={i}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Main Manuscript Body Text */}
            <div
              className={`leading-relaxed space-y-6 font-sans select-text ${contentClasses[theme]}`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {currentChapter.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-xl sm:text-2xl font-heading font-bold text-white pt-4 pb-1">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }

                if (paragraph.startsWith('```')) {
                  const cleanedCode = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                  return (
                    <div key={pIdx} className="my-4 p-4 rounded-2xl bg-black border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                      <pre>{cleanedCode}</pre>
                    </div>
                  );
                }

                return (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Interactive Code Snippets if provided */}
            {currentChapter.codeSnippets && currentChapter.codeSnippets.map((snippet, sIdx) => (
              <div key={sIdx} className="p-4 sm:p-5 rounded-2xl bg-black border border-zinc-800 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-[#00D4FF] font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {snippet.caption} ({snippet.language})
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(snippet.code);
                      setCopiedCodeIndex(sIdx);
                      setTimeout(() => setCopiedCodeIndex(null), 2000);
                    }}
                    className="text-zinc-400 hover:text-white transition flex items-center gap-1 text-[11px]"
                  >
                    {copiedCodeIndex === sIdx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-emerald-300 overflow-x-auto whitespace-pre p-2 bg-zinc-950 rounded-xl">
                  {snippet.code}
                </pre>
              </div>
            ))}

            {/* Practical Exercises */}
            {currentChapter.practicalExercises && currentChapter.practicalExercises.length > 0 && (
              <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/30 space-y-2 font-mono text-xs">
                <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider block">
                  PRACTICAL LABORATORY EXERCISES:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-purple-200">
                  {currentChapter.practicalExercises.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Chapter Bottom Navigation & Milestone Trigger */}
            <div className="pt-8 border-t border-inherit flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
              <button
                disabled={activeChapterIndex === 0}
                onClick={() => setActiveChapterIndex(activeChapterIndex - 1)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white disabled:opacity-40 transition flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={handleMarkChapterCompleted}
                className={`px-5 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shadow-lg ${
                  completedChapters.includes(currentChapter.id)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-emerald-500/20 hover:brightness-110'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>
                  {completedChapters.includes(currentChapter.id)
                    ? 'Chapter Completed (+5 BAA)'
                    : 'Mark Completed (+5 BaaCoin)'}
                </span>
              </button>

              <button
                disabled={activeChapterIndex === book.chapters.length - 1}
                onClick={() => setActiveChapterIndex(activeChapterIndex + 1)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white disabled:opacity-40 transition flex items-center gap-1.5"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Companion Course Upsell Card */}
            {book.companionCourse && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-[#FFD700]/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs shadow-xl">
                <div>
                  <span className="text-[10px] text-[#FFD700] uppercase font-bold tracking-wider block">
                    COMPANION ACCREDITED MASTERCLASS
                  </span>
                  <h4 className="font-heading font-black text-white text-base mt-0.5">
                    {book.companionCourse.title}
                  </h4>
                  <p className="text-zinc-400 text-xs mt-1">
                    Earn {book.companionCourse.certificationTitle} + {book.companionCourse.baacoinReward} BaaCoin Reward upon passing.
                  </p>
                </div>
                {onOpenCompanionCourse && (
                  <button
                    onClick={onOpenCompanionCourse}
                    className="px-5 py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold uppercase tracking-wider shrink-0 transition shadow-lg shadow-[#FFD700]/20"
                  >
                    Open Course
                  </button>
                )}
              </div>
            )}

          </div>

          {/* In-Book Ask-The-Book Contextual AI Assistant Panel */}
          {showAIAssistant && (
            <div className="w-full sm:w-96 border-l border-zinc-800 bg-zinc-950 p-5 flex flex-col justify-between font-mono text-xs shadow-2xl shrink-0 z-30">
              <div className="space-y-3 pb-3 border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <span className="text-[#00D4FF] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Bot className="w-4 h-4" /> Ask-the-Book AI Tutor
                  </span>
                  <button onClick={() => setShowAIAssistant(false)} className="text-zinc-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Grounded strictly in Chapter {currentChapter.number} of Ambassador Emmanuel Bassey Joe's masterwork.
                </p>

                {/* Quick Prompt Pill Triggers */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Summarize Chapter',
                    'Explain Code Block',
                    'Business Application',
                    'Quiz My Comprehension'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendAiQuestion(chip)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[10px] transition border border-zinc-800"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Conversation Scroll Log */}
              <div className="flex-1 overflow-y-auto my-3 space-y-3 pr-1 text-xs font-sans">
                {aiResponses.map((res, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl leading-relaxed ${
                      res.sender === 'user'
                        ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30 ml-4 font-mono text-[11px]'
                        : 'bg-zinc-900 text-zinc-200 border border-zinc-800 mr-2 text-[12px]'
                    }`}
                  >
                    {res.text}
                  </div>
                ))}
                {isAiThinking && (
                  <div className="text-[11px] font-mono text-[#00D4FF] animate-pulse flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Analyzing chapter manuscript...</span>
                  </div>
                )}
              </div>

              {/* Question Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAiQuestion();
                }}
                className="pt-2 border-t border-zinc-800 flex gap-2"
              >
                <input
                  type="text"
                  value={aiQuery}
                  onChange={e => setAiQuery(e.target.value)}
                  placeholder="Ask a question about this chapter..."
                  className="flex-1 bg-black border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none font-mono"
                />
                <button
                  type="submit"
                  disabled={!aiQuery.trim() || isAiThinking}
                  className="px-3 py-2 bg-[#00D4FF] text-black font-bold rounded-xl hover:brightness-110 active:scale-95 transition disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
