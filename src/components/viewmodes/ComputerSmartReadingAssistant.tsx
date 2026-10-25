import React, { useState, useEffect, useRef } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import { useEcosystem } from '../../context/EcosystemContext';
import { FLAGSHIP_BOOK, BAA_STORY_BOOKS, generateMasterCatalogue } from '../../lib/baaLibraryData';
import { BAABook, BookChapter } from '../../types/library';
import {
  BookOpen,
  Sparkles,
  Bot,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Coins,
  FileText,
  Copy,
  Check,
  Download,
  X,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Minimize2,
  Send,
  HelpCircle,
  TrendingUp,
  Smartphone,
  Tablet,
  Monitor,
  Flame,
  Award,
  GripVertical,
  Move,
  Sidebar,
  EyeOff,
  LayoutGrid
} from 'lucide-react';

export const ComputerSmartReadingAssistant: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    isAssistantOpen,
    setIsAssistantOpen,
    assistantTab,
    setAssistantTab,
    selectedBook,
    setSelectedBook,
    readingSeconds,
    readingEarningsBAA,
    speedWpm,
    setSpeedWpm
  } = useViewMode();

  const { profile, wallet } = useEcosystem();

  // Assistant UI & Docking States
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [bookDropdownOpen, setBookDropdownOpen] = useState(false);

  // Placement & Movability States (Floating vs Docked Right)
  const [dockMode, setDockMode] = useState<'floating' | 'docked-right'>(() => {
    return (localStorage.getItem('baa_assistant_dock_mode') as any) || 'floating';
  });

  const [windowPos, setWindowPos] = useState<{ x: number; y: number } | null>(() => {
    try {
      const saved = localStorage.getItem('baa_assistant_win_pos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [pillPos, setPillPos] = useState<{ x: number; y: number } | null>(() => {
    try {
      const saved = localStorage.getItem('baa_assistant_pill_pos');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // User preference: Hide floating pill on homepage to avoid disturbance
  const [isPillDismissed, setIsPillDismissed] = useState(false);

  const [isDraggingWin, setIsDraggingWin] = useState(false);
  const [isDraggingPill, setIsDraggingPill] = useState(false);

  const winDragRef = useRef<{ startX: number; startY: number; initX: number; initY: number; moved: boolean }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
    moved: false
  });

  const pillDragRef = useRef<{ startX: number; startY: number; initX: number; initY: number; moved: boolean }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
    moved: false
  });

  // Speed Reader (RSVP) State
  const [isSpeedReading, setIsSpeedReading] = useState(false);
  const [speedWordIndex, setSpeedWordIndex] = useState(0);
  const speedIntervalRef = useRef<any>(null);

  // Text-To-Speech (TTS) Voice State
  const [isNarrating, setIsNarrating] = useState(false);
  const [narrationRate, setNarrationRate] = useState<number>(1);

  // AI Chat & Comprehension State
  const [aiInput, setAiInput] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Greetings ${profile.full_name || 'Scholar'}. I am your Computer Smart Reading Assistant, synchronized with Ambassador Emmanuel Bassey Joe's literary archive. I can synthesize chapters, speed-read text at up to 700 WPM, and stream your reading yield directly to your Earnings Pulse.`
    }
  ]);

  // Notes State
  const [notesText, setNotesText] = useState(() => {
    return localStorage.getItem('baa_reading_notes') || `# Reading Notes - ${selectedBook.title}\n\n- Key Invariant: Autonomous agent swarms decouple latency.\n- Base L2 Contract: Verified.\n`;
  });
  const [copiedNotes, setCopiedNotes] = useState(false);

  const allAvailableBooks: BAABook[] = [
    FLAGSHIP_BOOK,
    ...BAA_STORY_BOOKS,
    ...generateMasterCatalogue().slice(0, 8)
  ];

  const currentChapter: BookChapter = selectedBook.chapters[selectedChapterIndex] || selectedBook.chapters[0] || {
    id: 'intro',
    number: 1,
    title: 'Introduction & Foundations',
    summary: 'Core principles of autonomous architecture.',
    content: selectedBook.description || 'Comprehensive reading text.'
  };

  // Prepare words for Speed Reader
  const chapterWords = (currentChapter.content || selectedBook.description || '')
    .replace(/[#*`_]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  // RSVP Speed Reading Loop
  useEffect(() => {
    if (isSpeedReading) {
      const delay = Math.round((60 / speedWpm) * 1000);
      speedIntervalRef.current = setInterval(() => {
        setSpeedWordIndex(prev => {
          if (prev >= chapterWords.length - 1) {
            setIsSpeedReading(false);
            clearInterval(speedIntervalRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    }

    return () => {
      if (speedIntervalRef.current) clearInterval(speedIntervalRef.current);
    };
  }, [isSpeedReading, speedWpm, chapterWords.length]);

  // Text-To-Speech Handler
  const handleToggleNarration = () => {
    if (!('speechSynthesis' in window)) return;

    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${currentChapter.title}. ${currentChapter.summary}. ${currentChapter.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = narrationRate;
      utterance.onend = () => setIsNarrating(false);
      utterance.onerror = () => setIsNarrating(false);
      window.speechSynthesis.speak(utterance);
      setIsNarrating(true);
    }
  };

  // AI Assistant Ask Handler
  const handleSendAiQuery = (customPrompt?: string) => {
    const query = customPrompt || aiInput;
    if (!query.trim() || aiThinking) return;

    setAiConversation(prev => [...prev, { sender: 'user', text: query }]);
    if (!customPrompt) setAiInput('');
    setAiThinking(true);

    setTimeout(() => {
      let response = '';
      const q = query.toLowerCase();

      if (q.includes('summary') || q.includes('summarize')) {
        response = `**Executive Summary of "${currentChapter.title}":**\n\n1. **Core Thesis:** Ambassador Emmanuel Bassey Joe reveals how autonomous AI agents replace traditional human middle-management bottlenecks.\n2. **Engineering Layer:** Decoupled node clusters validate cryptographic proofs before committing state to the Base L2 blockchain.\n3. **Monetization Invariant:** Reading, validating, and sharing academy books feeds the automated buyback-and-burn engine for BaaCoin.`;
      } else if (q.includes('simple') || q.includes('explain')) {
        response = `**Plain English Breakdown:**\nImagine you have 10,000 smart assistants working for you while you sleep. They write articles, negotiate deals, and process data for clients worldwide. Every time a deal finishes, money is converted and deposited straight into your Earnings Pulse.`;
      } else if (q.includes('quote') || q.includes('takeaway')) {
        response = `**Ambassador's Key Quote:** *"The next generation of billionaires will not manage human employees; they will deploy autonomous swarms of specialized cognitive nodes operating at zero marginal cost."* — Ambassador/Engr Emmanuel Bassey Joe`;
      } else {
        response = `**Assistant Analysis for "${selectedBook.title}":** In Chapter ${currentChapter.number}, the focus is on scaling cognitive sovereignty. You have spent ${Math.floor(readingSeconds / 60)} minutes reading this session, which has added +${readingEarningsBAA} BAA to your verified balance.`;
      }

      setAiConversation(prev => [...prev, { sender: 'assistant', text: response }]);
      setAiThinking(false);
    }, 750);
  };

  // Save Notes to localStorage
  const handleSaveNotes = (val: string) => {
    setNotesText(val);
    localStorage.setItem('baa_reading_notes', val);
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(notesText);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  // Window Drag Handler
  const handleWindowPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (dockMode === 'docked-right') return;
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('select')) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const currentX = windowPos?.x ?? Math.max(20, window.innerWidth - (isExpanded ? 640 : 460));
    const currentY = windowPos?.y ?? Math.max(60, window.innerHeight - (isExpanded ? 700 : 660));

    winDragRef.current = {
      startX: clientX,
      startY: clientY,
      initX: currentX,
      initY: currentY,
      moved: false
    };

    const handlePointerMove = (moveEvt: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvt ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const moveY = 'touches' in moveEvt ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const deltaX = moveX - winDragRef.current.startX;
      const deltaY = moveY - winDragRef.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        winDragRef.current.moved = true;
        setIsDraggingWin(true);
      }

      if (winDragRef.current.moved) {
        const winW = isExpanded ? 620 : 440;
        const nextX = Math.max(10, Math.min(window.innerWidth - winW - 10, winDragRef.current.initX + deltaX));
        const nextY = Math.max(50, Math.min(window.innerHeight - 200, winDragRef.current.initY + deltaY));
        setWindowPos({ x: nextX, y: nextY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      setTimeout(() => setIsDraggingWin(false), 50);

      setWindowPos(latest => {
        if (latest) {
          localStorage.setItem('baa_assistant_win_pos', JSON.stringify(latest));
        }
        return latest;
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  };

  // Pill Drag Handler
  const handlePillPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button[data-action="dismiss"]')) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const currentX = pillPos?.x ?? Math.max(20, window.innerWidth - 290);
    const currentY = pillPos?.y ?? Math.max(80, window.innerHeight - 100);

    pillDragRef.current = {
      startX: clientX,
      startY: clientY,
      initX: currentX,
      initY: currentY,
      moved: false
    };

    const handlePointerMove = (moveEvt: MouseEvent | TouchEvent) => {
      const moveX = 'touches' in moveEvt ? moveEvt.touches[0].clientX : moveEvt.clientX;
      const moveY = 'touches' in moveEvt ? moveEvt.touches[0].clientY : moveEvt.clientY;

      const deltaX = moveX - pillDragRef.current.startX;
      const deltaY = moveY - pillDragRef.current.startY;

      if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
        pillDragRef.current.moved = true;
        setIsDraggingPill(true);
      }

      if (pillDragRef.current.moved) {
        const nextX = Math.max(10, Math.min(window.innerWidth - 280, pillDragRef.current.initX + deltaX));
        const nextY = Math.max(60, Math.min(window.innerHeight - 70, pillDragRef.current.initY + deltaY));
        setPillPos({ x: nextX, y: nextY });
      }
    };

    const handlePointerUp = () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      setTimeout(() => setIsDraggingPill(false), 50);

      setPillPos(latest => {
        if (latest) {
          localStorage.setItem('baa_assistant_pill_pos', JSON.stringify(latest));
        }
        return latest;
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);
  };

  const handlePillClick = (e: React.MouseEvent) => {
    if (pillDragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsAssistantOpen(true);
  };

  const toggleDockMode = (mode: 'floating' | 'docked-right') => {
    setDockMode(mode);
    localStorage.setItem('baa_assistant_dock_mode', mode);
  };

  const resetWindowPosition = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWindowPos(null);
    localStorage.removeItem('baa_assistant_win_pos');
  };

  // Format active RSVP word with center focus letter
  const currentWord = chapterWords[speedWordIndex] || 'Ready';
  const middleIndex = Math.floor(currentWord.length / 2);
  const wordPrefix = currentWord.slice(0, middleIndex);
  const wordFocus = currentWord.charAt(middleIndex);
  const wordSuffix = currentWord.slice(middleIndex + 1);

  // Minimized floating launcher button (rendered when closed in desktop mode)
  if (!isAssistantOpen) {
    if (isPillDismissed) {
      return null;
    }

    return (
      <div
        style={
          pillPos
            ? {
                left: `${pillPos.x}px`,
                top: `${pillPos.y}px`,
                position: 'fixed',
                zIndex: 40
              }
            : {
                bottom: '80px',
                right: '24px',
                position: 'fixed',
                zIndex: 40
              }
        }
        className={`group/pill flex items-center shadow-2xl transition-shadow ${
          isDraggingPill ? 'cursor-grabbing select-none scale-105' : ''
        }`}
      >
        {/* Grip handle to move pill */}
        <div
          onMouseDown={handlePillPointerDown}
          onTouchStart={handlePillPointerDown}
          className="p-2.5 bg-black/90 hover:bg-zinc-900 text-zinc-400 hover:text-[#FFD700] rounded-l-2xl border-y-2 border-l-2 border-[#FFD700]/70 cursor-grab active:cursor-grabbing flex items-center justify-center transition shadow"
          title="Click & Drag to move Assistant button anywhere on screen"
        >
          <GripVertical className="w-3.5 h-3.5" />
        </div>

        {/* Clickable body */}
        <button
          onClick={handlePillClick}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-r-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-y-2 border-r-2 border-[#FFD700]/70 hover:border-[#FFD700] text-white shadow-2xl shadow-black/80 hover:brightness-110 transition-all font-mono text-xs"
          title="Open Computer Smart Reading Assistant (Drag left handle to move)"
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FFD700] to-[#FFA500] flex items-center justify-center text-black font-black shadow-md">
              <Bot className="w-4 h-4 text-black" />
            </div>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full animate-ping" />
          </div>

          <div className="text-left">
            <div className="text-[10px] text-[#00D4FF] font-bold uppercase tracking-wider flex items-center gap-1">
              <span>Reading AI</span>
              <span className="text-emerald-400 font-normal">● LIVE</span>
            </div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Assistant</span>
              <span className="text-[#FFD700] font-mono text-[11px]">(+{readingEarningsBAA} BAA)</span>
            </div>
          </div>
        </button>

        {/* Dismiss / Hide from Homepage button */}
        <button
          data-action="dismiss"
          onClick={(e) => {
            e.stopPropagation();
            setIsPillDismissed(true);
          }}
          className="ml-1 p-1.5 rounded-full bg-zinc-900/90 border border-zinc-700 text-zinc-400 hover:text-white opacity-0 group-hover/pill:opacity-100 transition shadow"
          title="Hide from Homepage (Re-open anytime from Navbar)"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      style={
        dockMode === 'docked-right'
          ? undefined
          : windowPos
          ? {
              left: `${windowPos.x}px`,
              top: `${windowPos.y}px`,
              position: 'fixed',
              zIndex: 50
            }
          : {
              bottom: '24px',
              right: '24px',
              position: 'fixed',
              zIndex: 50
            }
      }
      className={`transition-shadow shadow-2xl shadow-black/90 flex flex-col bg-zinc-950 font-sans ${
        dockMode === 'docked-right'
          ? 'fixed top-0 bottom-0 right-0 w-[430px] max-w-full z-50 border-l-2 border-zinc-700 animate-slide-in-right'
          : `border-2 border-zinc-700/80 rounded-2xl overflow-hidden ${
              isDraggingWin ? 'cursor-grabbing select-none scale-[1.01]' : ''
            } ${
              isExpanded
                ? 'w-[94vw] sm:w-[620px] h-[88vh]'
                : 'w-[94vw] sm:w-[440px] h-[640px] max-h-[88vh]'
            }`
      }`}
    >
      {/* Top Header with Drag Handle & Dock Switcher */}
      <div
        onMouseDown={handleWindowPointerDown}
        onTouchStart={handleWindowPointerDown}
        className={`px-4 py-3 bg-gradient-to-r from-black via-zinc-900 to-black border-b border-zinc-800 flex items-center justify-between gap-2 shrink-0 ${
          dockMode === 'floating' ? 'cursor-grab active:cursor-grabbing select-none' : ''
        }`}
        title={dockMode === 'floating' ? 'Click & Drag header to move assistant window anywhere' : 'Smart Reading Assistant'}
      >
        {/* Left: Drag Handle, Branding & Status */}
        <div className="flex items-center gap-2">
          {dockMode === 'floating' && (
            <div className="text-zinc-500 hover:text-white p-0.5">
              <GripVertical className="w-4 h-4 text-zinc-400" />
            </div>
          )}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow">
            <Bot className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Smart Reading Assistant</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 font-mono border border-emerald-500/40">
                {dockMode === 'docked-right' ? 'DOCKED SIDEBAR' : 'MOVABLE'}
              </span>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2">
              <span className="text-[#FFD700]">+{readingEarningsBAA} BAA Earned</span>
            </div>
          </div>
        </div>

        {/* Right: Dock Mode, Expand & Close Controls */}
        <div className="flex items-center gap-1">
          {/* Dock vs Move Mode Toggle (Direct answer to finding another place on platform) */}
          <button
            onClick={() => toggleDockMode(dockMode === 'floating' ? 'docked-right' : 'floating')}
            className={`px-2 py-1 rounded-lg border transition text-xs font-mono flex items-center gap-1 ${
              dockMode === 'docked-right'
                ? 'bg-[#FFD700]/15 text-[#FFD700] border-[#FFD700]/40'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title={dockMode === 'floating' ? 'Dock neatly to Right Sidebar (keeps homepage center clear)' : 'Detach into Moveable Window'}
          >
            <Sidebar className="w-3.5 h-3.5" />
            <span className="text-[10px] hidden sm:inline">{dockMode === 'floating' ? 'Dock' : 'Detach'}</span>
          </button>

          {/* Reset position button if moved */}
          {dockMode === 'floating' && windowPos && (
            <button
              onClick={resetWindowPosition}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Reset window position to default bottom-right"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {dockMode === 'floating' && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          <button
            onClick={() => setIsAssistantOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            title="Minimize Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Embedded View Switcher Bar (Mobile Phone, IPAD, Computer) */}
      <div className="px-3 py-2 bg-black/60 border-b border-zinc-800/80 flex items-center justify-between gap-1 text-[11px] font-mono">
        <span className="text-[10px] text-zinc-400 uppercase hidden sm:inline">Switch View:</span>
        <div className="flex items-center gap-1 bg-zinc-900/90 p-0.5 rounded-lg border border-zinc-800 flex-1 sm:flex-none justify-center">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition ${
              viewMode === 'mobile' ? 'bg-[#FFD700] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="View site inside Mobile Phone frame"
          >
            <Smartphone className="w-3 h-3" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setViewMode('tablet')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition ${
              viewMode === 'tablet' ? 'bg-[#FFD700] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="View site inside IPAD frame"
          >
            <Tablet className="w-3 h-3" />
            <span>IPAD</span>
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition ${
              viewMode === 'desktop' ? 'bg-[#FFD700] text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
            title="Computer Full Desktop + Smart Reading Assistant"
          >
            <Monitor className="w-3 h-3" />
            <span>Computer</span>
          </button>
        </div>
      </div>

      {/* Book Selector Bar */}
      <div className="px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex-1 relative">
          <button
            onClick={() => setBookDropdownOpen(!bookDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-black border border-zinc-800 hover:border-[#FFD700]/50 text-left transition font-mono"
          >
            <div className="truncate">
              <span className="text-[10px] text-[#00D4FF] font-bold block uppercase">
                Active Book:
              </span>
              <span className="text-white font-bold truncate block">
                {selectedBook.title}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
          </button>

          {/* Book Dropdown Menu */}
          {bookDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-zinc-950 border border-zinc-700 rounded-xl shadow-2xl p-2 z-50 max-h-64 overflow-y-auto font-mono text-xs space-y-1">
              <div className="text-[10px] text-zinc-400 uppercase px-2 py-1 font-bold">
                Select Book to Study with AI
              </div>
              {allAvailableBooks.map(bk => (
                <button
                  key={bk.id}
                  onClick={() => {
                    setSelectedBook(bk);
                    setSelectedChapterIndex(0);
                    setBookDropdownOpen(false);
                    setSpeedWordIndex(0);
                  }}
                  className={`w-full text-left p-2 rounded-lg transition flex items-center justify-between ${
                    selectedBook.id === bk.id
                      ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 font-bold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <span className="truncate pr-2">{bk.title}</span>
                  {bk.isStoryBook && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                      STORY
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chapter Indicator */}
        <div className="text-[10px] font-mono text-zinc-400 bg-black/40 px-2 py-1.5 rounded-lg border border-zinc-800 shrink-0">
          Chap {selectedChapterIndex + 1}/{selectedBook.chapters.length || 1}
        </div>
      </div>

      {/* Assistant Feature Tabs */}
      <div className="flex items-center justify-around border-b border-zinc-800 bg-black/80 px-2 text-xs font-mono">
        <button
          onClick={() => setAssistantTab('ai')}
          className={`py-2 px-2.5 flex items-center gap-1.5 border-b-2 transition ${
            assistantTab === 'ai'
              ? 'border-[#00D4FF] text-[#00D4FF] font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AI Copilot</span>
        </button>

        <button
          onClick={() => setAssistantTab('speed')}
          className={`py-2 px-2.5 flex items-center gap-1.5 border-b-2 transition ${
            assistantTab === 'speed'
              ? 'border-[#FFD700] text-[#FFD700] font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Speed Read</span>
        </button>

        <button
          onClick={() => setAssistantTab('audio')}
          className={`py-2 px-2.5 flex items-center gap-1.5 border-b-2 transition ${
            assistantTab === 'audio'
              ? 'border-emerald-400 text-emerald-400 font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Audio Voice</span>
        </button>

        <button
          onClick={() => setAssistantTab('mining')}
          className={`py-2 px-2.5 flex items-center gap-1.5 border-b-2 transition ${
            assistantTab === 'mining'
              ? 'border-amber-400 text-amber-400 font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Mining Yield</span>
        </button>

        <button
          onClick={() => setAssistantTab('notes')}
          className={`py-2 px-2.5 flex items-center gap-1.5 border-b-2 transition ${
            assistantTab === 'notes'
              ? 'border-purple-400 text-purple-400 font-bold'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notes</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans bg-zinc-950/70">
        
        {/* TAB 1: AI COPILOT */}
        {assistantTab === 'ai' && (
          <div className="space-y-3 flex flex-col h-full justify-between">
            {/* Quick Action Prompts */}
            <div className="flex flex-wrap gap-1.5 shrink-0">
              <button
                onClick={() => handleSendAiQuery('Summarize this chapter into 3 key takeaways')}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-[11px] transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#FFD700]" />
                <span>3-Point Summary</span>
              </button>
              <button
                onClick={() => handleSendAiQuery('Explain this chapter in simple plain English')}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-[11px] transition flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3 text-[#00D4FF]" />
                <span>Explain Like I'm 5</span>
              </button>
              <button
                onClick={() => handleSendAiQuery("What is Ambassador Emmanuel Joe's key quote?")}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-mono text-[11px] transition flex items-center gap-1"
              >
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Key Quote</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="space-y-2.5 flex-1 overflow-y-auto pr-1 max-h-[340px]">
              {aiConversation.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-zinc-900/90 text-white border-zinc-700 ml-6 text-right'
                      : 'bg-black/80 text-zinc-200 border-zinc-800 mr-4'
                  }`}
                >
                  <div className="text-[10px] font-mono text-zinc-400 mb-1 flex items-center gap-1.5">
                    {msg.sender === 'assistant' ? (
                      <>
                        <Bot className="w-3 h-3 text-[#00D4FF]" />
                        <span className="text-[#00D4FF] font-bold">BAA Smart Assistant</span>
                      </>
                    ) : (
                      <>
                        <span className="text-zinc-300 font-bold">You</span>
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              ))}
              {aiThinking && (
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-zinc-400 font-mono text-[11px] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
                  <span>Analyzing manuscript weights & axioms...</span>
                </div>
              )}
            </div>

            {/* Query Input */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendAiQuery();
              }}
              className="flex items-center gap-2 pt-2 border-t border-zinc-800 shrink-0"
            >
              <input
                type="text"
                value={aiInput}
                onChange={e => setAiInput(e.target.value)}
                placeholder="Ask about this chapter, concept, or code..."
                className="flex-1 bg-black border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none font-mono"
              />
              <button
                type="submit"
                disabled={!aiInput.trim() || aiThinking}
                className="p-2 bg-[#00D4FF] text-black font-bold rounded-xl hover:brightness-110 active:scale-95 transition disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: SPEED READ (RSVP) */}
        {assistantTab === 'speed' && (
          <div className="space-y-4 text-center py-4">
            <div className="text-xs font-mono text-zinc-400">
              RAPID SERIAL VISUAL PRESENTATION (RSVP) SPEED READER
            </div>

            {/* RSVP Word Display Canvas */}
            <div className="bg-black border-2 border-[#FFD700]/50 rounded-2xl h-36 flex items-center justify-center p-4 shadow-inner relative overflow-hidden">
              <div className="absolute top-2 left-3 text-[10px] font-mono text-zinc-500">
                Word {speedWordIndex + 1} of {chapterWords.length}
              </div>
              <div className="absolute top-2 right-3 text-[10px] font-mono text-[#FFD700] font-bold">
                {speedWpm} WPM
              </div>

              {/* Optical Focal Point Guide Marks */}
              <div className="absolute top-6 bottom-6 w-[2px] bg-red-500/30 left-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="text-3xl sm:text-4xl font-heading font-black tracking-wide text-white select-none">
                <span className="text-zinc-400">{wordPrefix}</span>
                <span className="text-red-500 underline decoration-2">{wordFocus}</span>
                <span className="text-zinc-200">{wordSuffix}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setSpeedWordIndex(Math.max(0, speedWordIndex - 20))}
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition"
                title="Rewind 20 words"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsSpeedReading(!isSpeedReading)}
                className={`px-6 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition ${
                  isSpeedReading
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                    : 'bg-[#FFD700] text-black shadow-lg shadow-[#FFD700]/30 hover:scale-105'
                }`}
              >
                {isSpeedReading ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Speed Reading</span>
                  </>
                )}
              </button>
            </div>

            {/* WPM Selector Slider */}
            <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 space-y-2 font-mono text-xs text-left">
              <div className="flex items-center justify-between text-zinc-300">
                <span>Reading Pace:</span>
                <span className="font-bold text-[#FFD700]">{speedWpm} Words / Min</span>
              </div>
              <input
                type="range"
                min="200"
                max="800"
                step="25"
                value={speedWpm}
                onChange={e => setSpeedWpm(Number(e.target.value))}
                className="w-full accent-[#FFD700] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>200 (Beginner)</span>
                <span>350 (Executive)</span>
                <span>800 (Super-Human)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AUDIO VOICE ASSISTANT */}
        {assistantTab === 'audio' && (
          <div className="space-y-4 py-2">
            <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 space-y-3 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Volume2 className={`w-7 h-7 ${isNarrating ? 'animate-pulse' : ''}`} />
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">{currentChapter.title}</h4>
                <p className="text-zinc-400 text-xs mt-1 line-clamp-2">{currentChapter.summary}</p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleToggleNarration}
                  className={`px-5 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center gap-2 transition ${
                    isNarrating
                      ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
                      : 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 hover:scale-105'
                  }`}
                >
                  {isNarrating ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>Stop Voice Narration</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Read Chapter Aloud</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Speech Rate Controls */}
            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800 flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-400">Narration Speed:</span>
              <div className="flex items-center gap-1.5">
                {[0.75, 1, 1.25, 1.5].map(rate => (
                  <button
                    key={rate}
                    onClick={() => setNarrationRate(rate)}
                    className={`px-2 py-1 rounded text-xs transition ${
                      narrationRate === rate
                        ? 'bg-emerald-400 text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MINING YIELD & EARNINGS PULSE */}
        {assistantTab === 'mining' && (
          <div className="space-y-4 py-2 font-mono">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-black border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <Coins className="w-4 h-4" />
                  <span>Smart Reading Yield</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                  1.5X DESKTOP BOOST
                </span>
              </div>

              <div className="text-center py-2">
                <div className="text-3xl font-heading font-black text-[#FFD700]">
                  +{readingEarningsBAA} BAA
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  Saved automatically to your <strong>Earnings Pulse</strong>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="flex justify-between text-[11px]">
                  <span>Daily Reading Quota:</span>
                  <span className="text-emerald-400 font-bold">
                    {Math.min(100, Math.round((readingSeconds / 1800) * 100))}% (
                    {Math.floor(readingSeconds / 60)}/30 Mins)
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FFD700] to-emerald-400 h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (readingSeconds / 1800) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-black/60 p-3 rounded-xl border border-zinc-800 space-y-2 text-xs text-zinc-400">
              <div className="text-white font-bold text-[11px]">How Desktop Mining Works:</div>
              <p className="text-[11px] leading-relaxed">
                While you read on your computer, your browser acts as an active validation node on the
                Universal Autonomous Data Center (UADC). Every 30 seconds of active reading generates
                cryptographic study proofs, crediting BaaCoin directly to your balance.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: SMART NOTES */}
        {assistantTab === 'notes' && (
          <div className="space-y-3 flex flex-col h-full">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Auto-saved to Browser LocalStorage</span>
              <button
                onClick={handleCopyNotes}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 font-bold"
              >
                {copiedNotes ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNotes ? 'Copied!' : 'Copy Notes'}</span>
              </button>
            </div>

            <textarea
              value={notesText}
              onChange={e => handleSaveNotes(e.target.value)}
              rows={12}
              className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:border-purple-400 outline-none font-mono resize-none leading-relaxed"
              placeholder="Jot down notes, code snippets, or takeaways..."
            />
          </div>
        )}

      </div>

      {/* Assistant Footer */}
      <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-500 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>BAA Node Sync Active</span>
        </div>
        <div className="text-[#FFD700]">
          Total Time: {Math.floor(readingSeconds / 60)}m {readingSeconds % 60}s
        </div>
      </div>
    </div>
  );
};
