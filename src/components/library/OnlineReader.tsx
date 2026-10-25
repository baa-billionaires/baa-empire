import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  Save, 
  Check, 
  Settings, 
  Columns, 
  Square, 
  Copy, 
  CheckCheck, 
  X, 
  Sparkles, 
  Clock, 
  List, 
  Volume2, 
  VolumeX,
  Bot,
  Coins,
  Award,
  Send,
  Trophy,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BAABook, ReaderProgress } from '../../types/library';
import { useEcosystem } from '../../context/EcosystemContext';
import { askBaaAi, ChatMessage, AskBaaContext } from '../../lib/askBaaService';
import { getAllCatalogueBooks } from '../../lib/autonomousBookGenerator';

export interface BookmarkItem {
  id: string;
  page: number;
  title: string;
  note: string;
  timestamp: string;
}

export interface OnlineReaderProps {
  manuscriptMarkdown?: string;
  book?: BAABook;
  initialPage?: number;
  onClose?: () => void;
  onSaveProgress?: (progress: ReaderProgress) => void;
}

interface ParsedPage {
  pageNumber: number;
  chapterTitle: string;
  rawMarkdown: string;
}

export const OnlineReader: React.FC<OnlineReaderProps> = ({
  manuscriptMarkdown,
  book,
  initialPage = 1,
  onClose,
  onSaveProgress
}) => {
  const [currentBook, setCurrentBook] = useState<BAABook | undefined>(book);

  useEffect(() => {
    setCurrentBook(book);
  }, [book]);

  useEffect(() => {
    const handleOpenEvent = (e: any) => {
      const b: BAABook | undefined = e.detail?.book;
      const bId: string | undefined = e.detail?.bookId;
      if (b) {
        setCurrentBook(b);
        setCurrentPage(1);
      } else if (bId) {
        const all = getAllCatalogueBooks();
        const target = all.find(item => item.id === bId);
        if (target) {
          setCurrentBook(target);
          setCurrentPage(1);
        }
      }
    };
    window.addEventListener('baa_open_book_in_reader', handleOpenEvent);
    return () => window.removeEventListener('baa_open_book_in_reader', handleOpenEvent);
  }, []);

  const activeBook = currentBook || book;

  // Ecosystem Context for BaaCoin Rewards
  const { wallet, profile, claimReadingReward } = useEcosystem();

  // Storage key
  const storageKey = useMemo(() => {
    return `baa_reader_progress_${activeBook?.id || 'manuscript_default'}`;
  }, [activeBook?.id]);

  const claimStorageKey = useMemo(() => {
    return `baa_reward_claimed_${activeBook?.id || 'manuscript_default'}_${profile.id}`;
  }, [activeBook?.id, profile.id]);

  // Reader Settings
  const [theme, setTheme] = useState<'paper' | 'sepia' | 'dark' | 'cyber'>('dark');
  const [fontSize, setFontSize] = useState<number>(17);
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans' | 'mono'>('serif');
  const [viewMode, setViewMode] = useState<'single' | 'spread'>('single');
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showTocDrawer, setShowTocDrawer] = useState(false);

  // Pagination & Progress State
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [readingSeconds, setReadingSeconds] = useState<number>(0);
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [newBookmarkNote, setNewBookmarkNote] = useState('');
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);

  // Text-To-Speech
  const [isSpeaking, setIsSpeaking] = useState(false);

  // BaaCoin Milestone & Reward Claims
  const [hasClaimedReward, setHasClaimedReward] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(claimStorageKey);
    } catch {
      return false;
    }
  });
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardDetails, setRewardDetails] = useState<{ amount: number; message: string; txHash?: string } | null>(null);

  // "Ask Baa" AI Study Companion State
  const [showAskBaaDrawer, setShowAskBaaDrawer] = useState(false);
  const [askBaaQuery, setAskBaaQuery] = useState('');
  const [isAskBaaLoading, setIsAskBaaLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [askBaaMessages, setAskBaaMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Greetings Scholar! I am **Ask Baa**, your resident AI Study Companion and Sovereign Architect at Billionaires AI Academy. Ask me any question about **${book?.title || 'this manuscript'}**, request code implementations, or ask for chapter breakdowns.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Construct full Markdown if book is provided but manuscriptMarkdown is not
  const rawManuscript = useMemo(() => {
    if (manuscriptMarkdown && manuscriptMarkdown.trim().length > 0) {
      return manuscriptMarkdown;
    }

    if (activeBook) {
      let md = `---
title: "${activeBook.title}"
subtitle: "${activeBook.subtitle}"
author: "${activeBook.authorName} (${activeBook.authorAlias})"
contact: "${activeBook.contactNumber}"
edition: "${activeBook.frontCover?.edition || '1st Edition'}"
isbn: "${activeBook.isbn || '978-978-794-001-2'}"
base_l2_hash: "${activeBook.baseL2Hash || '0xbaa77a94f10c49b01234'}"
---

# ${activeBook.title}
## ${activeBook.subtitle}

**Author:** ${activeBook.authorName} — aka ${activeBook.authorAlias}  
**Contact:** ${activeBook.contactNumber}  
**Publisher:** ${activeBook.backCover?.publisherName || 'Billionaires AI Academy (BAA)'}  
**ISBN:** ${activeBook.isbn || '978-978-794-001-2'}  
**Base L2 Smart Contract Anchor:** \`${activeBook.baseL2Hash || '0xbaa77a94f10c49b01234'}\`

---

## SYNOPSIS & EXECUTIVE SUMMARY
${activeBook.backCover?.synopsis || activeBook.description}

### Curriculum & Mastery Outcomes
${activeBook.backCover?.learningOutcomes ? activeBook.backCover.learningOutcomes.map(item => `- ${item}`).join('\n') : '- Comprehensive Mastery of Autonomous Systems'}

---
`;

      activeBook.chapters.forEach(ch => {
        md += `
# Chapter ${ch.number}: ${ch.title}
*Estimated Study Time: ${ch.estimatedMinutes} minutes | Word Count: ${ch.wordCount} words*

> **Chapter Synthesis:** ${ch.summary}

${ch.content}

### Key Takeaways
${ch.keyTakeaways.map(t => `- ${t}`).join('\n')}

${ch.codeSnippets && ch.codeSnippets.length > 0 ? `
### Code Reference Implementation: ${ch.codeSnippets[0].caption}
\`\`\`${ch.codeSnippets[0].language}
${ch.codeSnippets[0].code}
\`\`\`
` : ''}

${ch.practicalExercises && ch.practicalExercises.length > 0 ? `
### Practical Laboratory Exercises
${ch.practicalExercises.map(e => `1. ${e}`).join('\n')}
` : ''}

---
`;
      });

      md += `
## AUTHOR & PROVENANCE
${activeBook.backCover?.authorBio || 'Ambassador/Engineer Emmanuel Bassey Joe is the founder of Billionaires AI Academy.'}

Official Publisher: Billionaires AI Academy (BAA)  
Digital Infrastructure: https://baa-empire.vercel.app  
Direct Author Contact: ${activeBook.contactNumber}
`;

      return md;
    }

    return '# Empty Manuscript\n\nNo manuscript content provided.';
  }, [manuscriptMarkdown, activeBook]);

  // Break manuscript into logical pages (~450-600 words per page or chapter headings)
  const pages: ParsedPage[] = useMemo(() => {
    const sections = rawManuscript.split(/\n(?=(?:# Chapter|# |---|\pagebreak|<!-- pagebreak -->))/g);
    const parsedPages: ParsedPage[] = [];
    let currentChapter = 'Prologue & Title';

    sections.forEach((section) => {
      const trimmed = section.trim();
      if (!trimmed) return;

      // Detect chapter title if present
      const chapterMatch = trimmed.match(/^# (?:Chapter \d+: )?([^\n]+)/m);
      if (chapterMatch) {
        currentChapter = chapterMatch[1].trim();
      }

      // Check section length. If section is large (> 3500 chars), subdivide nicely by paragraphs
      if (trimmed.length > 3500) {
        const paragraphs = trimmed.split(/\n\n+/);
        let buffer = '';
        paragraphs.forEach((p) => {
          if ((buffer + p).length > 3200 && buffer.trim().length > 0) {
            parsedPages.push({
              pageNumber: parsedPages.length + 1,
              chapterTitle: currentChapter,
              rawMarkdown: buffer.trim()
            });
            buffer = p + '\n\n';
          } else {
            buffer += p + '\n\n';
          }
        });
        if (buffer.trim().length > 0) {
          parsedPages.push({
            pageNumber: parsedPages.length + 1,
            chapterTitle: currentChapter,
            rawMarkdown: buffer.trim()
          });
        }
      } else {
        parsedPages.push({
          pageNumber: parsedPages.length + 1,
          chapterTitle: currentChapter,
          rawMarkdown: trimmed
        });
      }
    });

    return parsedPages.length > 0 ? parsedPages : [{ pageNumber: 1, chapterTitle: 'Overview', rawMarkdown: rawManuscript }];
  }, [rawManuscript]);

  const totalPages = pages.length;

  // Restore saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.currentPage && data.currentPage >= 1 && data.currentPage <= totalPages) {
          setCurrentPage(data.currentPage);
        }
        if (data.readingSeconds) {
          setReadingSeconds(data.readingSeconds);
        }
        if (data.bookmarks && Array.isArray(data.bookmarks)) {
          setBookmarks(data.bookmarks);
        }
        if (data.lastSavedTime) {
          setLastSavedTime(data.lastSavedTime);
        }
      }
    } catch (e) {
      console.warn('Could not read saved reading progress', e);
    }
  }, [storageKey, totalPages]);

  // Reading Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setReadingSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save Progress Action
  const handleSaveProgress = (pageToSave = currentPage) => {
    setSaveStatus('saving');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSavedTime(timeString);

    const progressData: ReaderProgress = {
      bookId: book?.id || 'manuscript_custom',
      currentChapterId: pages[pageToSave - 1]?.chapterTitle || 'Chapter 1',
      scrollPercentage: Math.round((pageToSave / totalPages) * 100),
      completedChapterIds: [pages[pageToSave - 1]?.chapterTitle || 'Chapter 1'],
      totalMinutesRead: Math.floor(readingSeconds / 60),
      streakDays: 1,
      lastReadTimestamp: now.toISOString(),
      bookmarks: bookmarks.map(b => ({
        chapterId: b.title,
        note: b.note,
        timestamp: b.timestamp
      })),
      baacoinEarned: hasClaimedReward ? 100 : Math.min(90, Math.floor((pageToSave / totalPages) * 100))
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify({
        currentPage: pageToSave,
        totalPages,
        readingSeconds,
        bookmarks,
        lastSavedTime: timeString,
        percentage: Math.round((pageToSave / totalPages) * 100)
      }));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }

    if (onSaveProgress) {
      onSaveProgress(progressData);
    }

    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }, 400);
  };

  // Turn page actions
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = viewMode === 'spread' && currentPage + 1 < totalPages ? currentPage + 2 : currentPage + 1;
      const target = Math.min(nextPage, totalPages);
      setCurrentPage(target);
      handleSaveProgress(target);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      const prevPage = viewMode === 'spread' && currentPage - 2 >= 1 ? currentPage - 2 : currentPage - 1;
      const target = Math.max(prevPage, 1);
      setCurrentPage(target);
      handleSaveProgress(target);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Bookmark actions
  const isCurrentPageBookmarked = bookmarks.some(b => b.page === currentPage);

  const toggleBookmark = () => {
    if (isCurrentPageBookmarked) {
      const updated = bookmarks.filter(b => b.page !== currentPage);
      setBookmarks(updated);
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const data = JSON.parse(saved);
          data.bookmarks = updated;
          localStorage.setItem(storageKey, JSON.stringify(data));
        }
      } catch (e) {
        console.warn(e);
      }
    } else {
      setIsAddingBookmark(true);
    }
  };

  const confirmAddBookmark = () => {
    const newBm: BookmarkItem = {
      id: `bm-${Date.now()}`,
      page: currentPage,
      title: pages[currentPage - 1]?.chapterTitle || `Page ${currentPage}`,
      note: newBookmarkNote.trim() || 'Bookmarked reference',
      timestamp: new Date().toLocaleDateString()
    };
    const updated = [...bookmarks, newBm];
    setBookmarks(updated);
    setNewBookmarkNote('');
    setIsAddingBookmark(false);

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        data.bookmarks = updated;
        localStorage.setItem(storageKey, JSON.stringify(data));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // TTS Handler
  const toggleTTS = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const currentPageText = pages[currentPage - 1]?.rawMarkdown.replace(/[#*`_>-]/g, '') || '';
    const utterance = new SpeechSynthesisUtterance(currentPageText);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Claim BaaCoin Completion Reward (+100 BAA)
  const handleClaimReward = () => {
    setIsClaimingReward(true);
    try {
      const bookTitle = activeBook?.title || 'Autonomous Manuscript Edition';
      const bookId = activeBook?.id || 'book-baa-mastery';
      const res = claimReadingReward(bookId, bookTitle, 100);

      const txHash = '0xbaaread' + Array.from({ length: 28 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setRewardDetails({
        amount: res.rewardAmount || 100,
        message: res.message,
        txHash
      });
      setHasClaimedReward(true);
      setShowRewardModal(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch (e) {
      console.error('Failed to claim reading reward:', e);
    } finally {
      setIsClaimingReward(false);
    }
  };

  // Ask Baa Query Handler
  const handleSendAskBaa = async (customPrompt?: string) => {
    const textToSend = customPrompt || askBaaQuery;
    if (!textToSend.trim() || isAskBaaLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAskBaaMessages(prev => [...prev, userMsg]);
    setAskBaaQuery('');
    setIsAskBaaLoading(true);

    // Scroll chat
    setTimeout(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);

    const context: AskBaaContext = {
      bookTitle: activeBook?.title || 'Autonomous Manuscript',
      subtitle: activeBook?.subtitle,
      chapterTitle: pages[currentPage - 1]?.chapterTitle || 'Chapter Overview',
      pageNumber: currentPage,
      totalPages,
      pageMarkdown: pages[currentPage - 1]?.rawMarkdown || '',
      authorName: activeBook?.authorName || 'Ambassador Emmanuel Bassey Joe',
      authorAlias: activeBook?.authorAlias || 'Titowise',
      contactNumber: activeBook?.contactNumber || '+2348025516793'
    };

    try {
      const responseText = await askBaaAi(textToSend, context, askBaaMessages);
      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAskBaaMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error querying Ask Baa:', err);
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an interruption accessing neural nodes. However, according to Ambassador Emmanuel Bassey Joe's core thesis in *${context.bookTitle}*, focus on verifying the cryptographic state transition on this page and anchoring your agents to Base L2.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setAskBaaMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAskBaaLoading(false);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  // Render Theme Styles
  const themeClasses = {
    paper: {
      bg: 'bg-[#F9F6F0]',
      card: 'bg-[#FFFDF9] text-[#1E2022] border-[#E8E2D5] shadow-xl',
      border: 'border-[#E8E2D5]',
      accent: 'text-[#8B4513]',
      code: 'bg-[#F2EDE4] text-[#2C3E50] border-[#DFD7CA]',
      quote: 'border-l-4 border-[#8B4513] bg-[#F7F2EA] text-[#4A3B32]',
      subtext: 'text-[#6B7280]'
    },
    sepia: {
      bg: 'bg-[#F4ECD8]',
      card: 'bg-[#EFE6CE] text-[#3D3028] border-[#DFCFA8] shadow-xl',
      border: 'border-[#DFCFA8]',
      accent: 'text-[#9C5D24]',
      code: 'bg-[#E4D8B8] text-[#2F241D] border-[#D4C49E]',
      quote: 'border-l-4 border-[#9C5D24] bg-[#E9DCBB] text-[#4A3525]',
      subtext: 'text-[#7D6B58]'
    },
    dark: {
      bg: 'bg-[#0B0F17]',
      card: 'bg-[#121824] text-[#E2E8F0] border-[#1F293D] shadow-2xl',
      border: 'border-[#1F293D]',
      accent: 'text-[#FFD700]',
      code: 'bg-[#070A0F] text-[#38BDF8] border-[#1E293B]',
      quote: 'border-l-4 border-[#FFD700] bg-[#172033] text-[#CBD5E1]',
      subtext: 'text-[#94A3B8]'
    },
    cyber: {
      bg: 'bg-[#050811]',
      card: 'bg-[#090E1A] text-[#E0E7FF] border-[#00D4FF]/30 shadow-[0_0_50px_rgba(0,212,255,0.08)]',
      border: 'border-[#00D4FF]/30',
      accent: 'text-[#00D4FF]',
      code: 'bg-[#020408] text-[#10B981] border-[#00D4FF]/20',
      quote: 'border-l-4 border-[#00D4FF] bg-[#0E172A] text-[#93C5FD]',
      subtext: 'text-[#64748B]'
    }
  }[theme];

  const fontStyle = {
    serif: 'font-serif tracking-normal leading-relaxed',
    sans: 'font-sans tracking-wide leading-relaxed',
    mono: 'font-mono text-sm leading-normal'
  }[fontFamily];

  // Helper to render Markdown lines cleanly
  const renderMarkdownPage = (raw: string, pageNum: number) => {
    const lines = raw.split('\n');
    let insideCodeBlock = false;
    let codeLanguage = '';
    let codeBuffer: string[] = [];

    const elements: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      // Code block start/end
      if (line.trim().startsWith('```')) {
        if (!insideCodeBlock) {
          insideCodeBlock = true;
          codeLanguage = line.trim().replace('```', '') || 'code';
          codeBuffer = [];
        } else {
          insideCodeBlock = false;
          const fullCode = codeBuffer.join('\n');
          const codeId = `p${pageNum}-c${idx}`;
          elements.push(
            <div key={idx} className="my-5 rounded-xl overflow-hidden border border-zinc-800 bg-black/60 shadow-lg">
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-zinc-900/90 text-xs font-mono text-zinc-400 border-b border-zinc-800">
                <span className="uppercase text-[10px] tracking-wider font-bold text-[#00D4FF]">
                  {codeLanguage}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(fullCode);
                    setCopiedCodeIndex(codeId);
                    setTimeout(() => setCopiedCodeIndex(null), 2000);
                  }}
                  className="flex items-center gap-1 text-[11px] hover:text-white transition"
                >
                  {copiedCodeIndex === codeId ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
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
              <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-slate-200">
                <code>{fullCode}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (insideCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      const trimmed = line.trim();

      // Horizontal rule / Page separator
      if (trimmed === '---') {
        elements.push(<hr key={idx} className={`my-6 opacity-30 ${themeClasses.border}`} />);
        return;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        elements.push(
          <h1 key={idx} className="text-2xl sm:text-3xl font-heading font-black mt-6 mb-3 leading-tight tracking-tight">
            {trimmed.replace('# ', '')}
          </h1>
        );
        return;
      }
      if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={idx} className="text-xl sm:text-2xl font-heading font-bold mt-5 mb-2.5 leading-snug">
            {trimmed.replace('## ', '')}
          </h2>
        );
        return;
      }
      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={idx} className={`text-base sm:text-lg font-heading font-bold mt-4 mb-2 ${themeClasses.accent}`}>
            {trimmed.replace('### ', '')}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={idx} className={`my-4 p-4 rounded-xl text-sm italic ${themeClasses.quote}`}>
            {trimmed.replace('> ', '')}
          </blockquote>
        );
        return;
      }

      // Bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        elements.push(
          <li key={idx} className="ml-5 list-disc text-sm sm:text-base my-1">
            {trimmed.replace(/^[-*]\s+/, '')}
          </li>
        );
        return;
      }

      // Numbered lists
      if (/^\d+\.\s+/.test(trimmed)) {
        elements.push(
          <li key={idx} className="ml-5 list-decimal text-sm sm:text-base my-1">
            {trimmed.replace(/^\d+\.\s+/, '')}
          </li>
        );
        return;
      }

      // Regular paragraph (skipping empty lines)
      if (trimmed.length > 0) {
        elements.push(
          <p key={idx} className="my-3 text-sm sm:text-base leading-relaxed">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  const progressPercentage = Math.round((currentPage / totalPages) * 100);
  const isCompleted = currentPage >= totalPages || progressPercentage === 100;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${themeClasses.bg} select-text transition-colors duration-300`}>
      {/* TOP HEADER CONTROLS BAR */}
      <header className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between gap-3 backdrop-blur-md ${theme === 'dark' || theme === 'cyber' ? 'bg-black/85 border-zinc-800' : 'bg-white/85 border-zinc-200'} shrink-0 z-30`}>
        {/* Left: Book Meta & TOC trigger */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setShowTocDrawer(!showTocDrawer)}
            className="p-2 rounded-xl border border-zinc-700/60 hover:border-zinc-500 transition flex items-center gap-1.5 text-xs font-mono"
            title="Table of Contents"
          >
            <List className="w-4 h-4 text-[#00D4FF]" />
            <span className="hidden sm:inline">Index</span>
          </button>

          <div className="truncate">
            <h1 className="text-xs sm:text-sm font-heading font-black truncate max-w-xs sm:max-w-md">
              {book?.title || 'Autonomous Manuscript Edition'}
            </h1>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono opacity-70 truncate">
              <span>{pages[currentPage - 1]?.chapterTitle || 'Chapter Overview'}</span>
              <span>•</span>
              <span>p. {currentPage} / {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Center: BaaCoin Wallet & Reading Progress Tracker */}
        <div className="hidden lg:flex items-center gap-2.5 font-mono text-xs">
          {/* Active Wallet Balance */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Coins className="w-3.5 h-3.5" />
            <span className="font-bold">{wallet.balance.toLocaleString()} BAA</span>
          </div>

          {/* Reading Time */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>{Math.floor(readingSeconds / 60)}m read</span>
          </div>

          {/* Progress Indicator with Reward status */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-800/60 border border-zinc-700/40">
            <Trophy className={`w-3.5 h-3.5 ${hasClaimedReward ? 'text-emerald-400' : isCompleted ? 'text-[#FFD700] animate-bounce' : 'text-zinc-500'}`} />
            <span className="font-bold text-[#FFD700]">{progressPercentage}%</span>
            <span className="opacity-60 text-[11px]">
              {hasClaimedReward ? 'Reward Claimed' : isCompleted ? 'Earn +100 BAA' : 'Progress'}
            </span>
          </div>
        </div>

        {/* Right: Actions, Ask Baa & Tools */}
        <div className="flex items-center gap-2 shrink-0">
          {/* ASK BAA BUTTON */}
          <button
            onClick={() => setShowAskBaaDrawer(true)}
            className="px-3 py-1.5 rounded-xl border border-[#00D4FF]/40 bg-gradient-to-r from-[#00D4FF]/15 to-[#0088FF]/15 hover:border-[#00D4FF] text-[#00D4FF] hover:text-white font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,212,255,0.15)] active:scale-95"
            title="Ask questions about this manuscript and autonomous intelligence with Ask Baa"
          >
            <Bot className="w-4 h-4 text-[#00D4FF] animate-pulse" />
            <span className="tracking-wide">Ask Baa</span>
            <span className="hidden sm:inline px-1 py-0.2 text-[9px] bg-[#00D4FF]/20 rounded text-[#00D4FF]">AI</span>
          </button>

          {/* 100% Milestone Claim Button (if completed and not claimed) */}
          {isCompleted && !hasClaimedReward && (
            <button
              onClick={handleClaimReward}
              disabled={isClaimingReward}
              className="px-3 py-1.5 rounded-xl font-mono text-xs font-black bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 shadow-[0_0_20px_rgba(255,215,0,0.4)] animate-pulse"
              title="Claim your +100 BaaCoin reading reward"
            >
              <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Claim +100 BAA</span>
            </button>
          )}

          {/* TTS Audio Narration */}
          <button
            onClick={toggleTTS}
            className={`p-2 rounded-xl border transition ${
              isSpeaking ? 'bg-[#FFD700] text-black border-[#FFD700]' : 'border-zinc-700/60 hover:border-zinc-500'
            }`}
            title={isSpeaking ? 'Mute Audio Narration' : 'Listen to this page (TTS)'}
          >
            {isSpeaking ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Bookmark Toggle */}
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-mono ${
              isCurrentPageBookmarked 
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                : 'border-zinc-700/60 hover:border-zinc-500'
            }`}
            title="Bookmark this page"
          >
            {isCurrentPageBookmarked ? (
              <BookmarkCheck className="w-4 h-4 fill-current" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            <span className="hidden lg:inline">{bookmarks.length > 0 ? `(${bookmarks.length})` : ''}</span>
          </button>

          {/* Save Progress Button */}
          <button
            onClick={() => handleSaveProgress()}
            disabled={saveStatus === 'saving'}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 shadow ${
              saveStatus === 'saved'
                ? 'bg-emerald-500 text-white'
                : 'bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 border border-zinc-700'
            }`}
            title="Save reading progress to local storage and BAA ledger"
          >
            {saveStatus === 'saved' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Saved</span>
              </>
            ) : saveStatus === 'saving' ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#FFD700]" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save</span>
              </>
            )}
          </button>

          {/* Reader Preferences Modal Trigger */}
          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="p-2 rounded-xl border border-zinc-700/60 hover:border-zinc-500 transition"
            title="Reading Preferences (Font, Theme, Layout)"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Exit / Close */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* VISUAL READING PROGRESS BAR WITH MILESTONES & BAACOIN REWARDS */}
      <div className="w-full bg-zinc-950/90 border-b border-zinc-800/80 px-4 sm:px-6 py-2 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Progress stats */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-zinc-400">Reading Progress:</span>
            <span className="font-bold text-[#FFD700]">{progressPercentage}%</span>
            <span className="text-zinc-500">({currentPage} / {totalPages} pages)</span>
          </div>

          {/* Milestone Markers Bar */}
          <div className="flex-1 max-w-2xl w-full px-2">
            <div className="relative w-full h-2.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/50">
              <div 
                className="h-full bg-gradient-to-r from-[#00D4FF] via-[#FFD700] to-emerald-400 transition-all duration-300 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>

            {/* Checkpoint indicators: 25%, 50%, 75%, 100% */}
            <div className="flex justify-between items-center text-[10px] font-mono mt-1 text-zinc-400">
              <span className={progressPercentage >= 25 ? 'text-[#00D4FF] font-semibold' : ''}>
                25% • Foundation
              </span>
              <span className={progressPercentage >= 50 ? 'text-[#00D4FF] font-semibold' : ''}>
                50% • Synthesis
              </span>
              <span className={progressPercentage >= 75 ? 'text-[#FFD700] font-semibold' : ''}>
                75% • Advanced
              </span>
              <span className={`flex items-center gap-1 ${progressPercentage >= 100 ? 'text-emerald-400 font-bold' : 'text-amber-400'}`}>
                <Coins className="w-3 h-3 fill-current" />
                100% • +100 BAA
              </span>
            </div>
          </div>

          {/* Quick claim pill if reached */}
          <div className="shrink-0">
            {hasClaimedReward ? (
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>+100 BAA Claimed</span>
              </div>
            ) : isCompleted ? (
              <button
                onClick={handleClaimReward}
                disabled={isClaimingReward}
                className="flex items-center gap-1 text-xs font-mono font-bold bg-[#FFD700] text-black px-3 py-1 rounded-xl hover:brightness-110 active:scale-95 shadow"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Claim +100 BAA</span>
              </button>
            ) : (
              <div className="text-[11px] font-mono text-zinc-500">
                Finish manuscript to unlock +100 BAA
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN PAGINATED READING VIEWPORT */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-8 flex justify-center items-start relative">
        <div className={`w-full ${viewMode === 'spread' ? 'max-w-6xl' : 'max-w-3xl'} mx-auto transition-all duration-300 space-y-6`}>
          {/* TWO-PAGE SPREAD OR SINGLE PAGE */}
          {viewMode === 'spread' && currentPage + 1 <= totalPages ? (
            /* TWO-PAGE SPREAD */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Page */}
              <article 
                className={`p-6 sm:p-10 rounded-2xl border ${themeClasses.card} transition-all duration-300 min-h-[580px] flex flex-col justify-between shadow-xl`}
                style={{ fontSize: `${fontSize}px` }}
              >
                <div className={fontStyle}>
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-60 border-b pb-2 mb-4">
                    <span>{pages[currentPage - 1]?.chapterTitle}</span>
                    <span>BAA MONOGRAPH</span>
                  </div>
                  {renderMarkdownPage(pages[currentPage - 1]?.rawMarkdown || '', currentPage)}
                </div>
                <div className="pt-4 border-t mt-6 flex justify-between text-xs font-mono opacity-50">
                  <span>Page {currentPage}</span>
                  <span>{book?.isbn || '978-978-794-001-2'}</span>
                </div>
              </article>

              {/* Right Page */}
              <article 
                className={`p-6 sm:p-10 rounded-2xl border ${themeClasses.card} transition-all duration-300 min-h-[580px] flex flex-col justify-between shadow-xl`}
                style={{ fontSize: `${fontSize}px` }}
              >
                <div className={fontStyle}>
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-60 border-b pb-2 mb-4">
                    <span>{pages[currentPage]?.chapterTitle}</span>
                    <span>AUTHENTICATED MANUSCRIPT</span>
                  </div>
                  {renderMarkdownPage(pages[currentPage]?.rawMarkdown || '', currentPage + 1)}
                </div>
                <div className="pt-4 border-t mt-6 flex justify-between text-xs font-mono opacity-50">
                  <span>Page {currentPage + 1}</span>
                  <span>{progressPercentage}% Completed</span>
                </div>
              </article>
            </div>
          ) : (
            /* SINGLE PAGE VIEW */
            <article 
              className={`p-6 sm:p-12 rounded-3xl border ${themeClasses.card} transition-all duration-300 min-h-[620px] flex flex-col justify-between relative shadow-2xl`}
              style={{ fontSize: `${fontSize}px` }}
            >
              <div className={fontStyle}>
                {/* Header within page */}
                <div className="flex items-center justify-between text-[11px] font-mono opacity-60 border-b pb-2 mb-6">
                  <span className="font-bold uppercase tracking-wider">{pages[currentPage - 1]?.chapterTitle}</span>
                  <span>PAGE {currentPage} OF {totalPages}</span>
                </div>

                {/* Markdown Elements */}
                {renderMarkdownPage(pages[currentPage - 1]?.rawMarkdown || '', currentPage)}
              </div>

              {/* Page Bottom Details */}
              <footer className="pt-6 border-t mt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono opacity-60">
                <div>
                  Ambassador Emmanuel Bassey Joe • {book?.contactNumber || '+2348025516793'}
                </div>
                <div className="flex items-center gap-2">
                  <span>{progressPercentage}% Read</span>
                  {lastSavedTime && <span>(Saved {lastSavedTime})</span>}
                </div>
              </footer>
            </article>
          )}

          {/* 100% COMPLETION & REWARD BANNER CARD */}
          {isCompleted && (
            <div className="p-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-[#00D4FF]/10 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Trophy className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-white text-base">
                      {hasClaimedReward ? 'Manuscript Verified & BaaCoin Rewarded!' : 'Congratulations! You Completed the Entire Manuscript!'}
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono mt-0.5">
                      {hasClaimedReward 
                        ? 'Your reading completion proof is recorded on the BAA Base L2 Ledger with +100 BaaCoin.' 
                        : 'Claim your official +100 BaaCoin completion bounty to boost your student networth.'}
                    </p>
                  </div>
                </div>

                {hasClaimedReward ? (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reward Credited to Wallet</span>
                  </div>
                ) : (
                  <button
                    onClick={handleClaimReward}
                    disabled={isClaimingReward}
                    className="px-5 py-2.5 rounded-xl font-mono text-xs font-black bg-gradient-to-r from-[#FFD700] to-amber-500 text-black hover:brightness-110 active:scale-95 transition shadow-lg flex items-center gap-2"
                  >
                    <Coins className="w-4 h-4" />
                    <span>Claim +100 BaaCoin Now</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* BOTTOM PAGINATION CONTROLS & SCRUBBER */}
      <footer className={`px-4 sm:px-8 py-3 border-t flex flex-wrap items-center justify-between gap-4 backdrop-blur-md ${theme === 'dark' || theme === 'cyber' ? 'bg-black/90 border-zinc-800' : 'bg-white/90 border-zinc-200'} shrink-0 z-30`}>
        {/* Previous Button */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 disabled:opacity-40 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Center Page Scrubber Range Slider */}
        <div className="flex-1 max-w-lg flex items-center gap-3 font-mono text-xs">
          <span className="opacity-70 whitespace-nowrap">Page {currentPage}</span>
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentPage(val);
              handleSaveProgress(val);
            }}
            className="w-full accent-[#FFD700] cursor-pointer h-2 bg-zinc-700 rounded-lg"
          />
          <span className="opacity-70 whitespace-nowrap">{totalPages} Pages</span>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 rounded-xl bg-[#FFD700] text-black hover:bg-amber-400 disabled:opacity-40 text-xs font-mono font-bold transition flex items-center gap-1.5 shadow"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* "ASK BAA" AI STUDY ASSISTANT DRAWER */}
      {showAskBaaDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-zinc-950 border-l border-zinc-800 shadow-2xl flex flex-col justify-between text-slate-100">
          {/* Drawer Header */}
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div>
                <h3 className="font-heading font-black text-sm text-white flex items-center gap-2">
                  <span>Ask Baa</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 font-mono">
                    AI Study Companion
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono truncate max-w-xs">
                  Context: p.{currentPage} • {pages[currentPage - 1]?.chapterTitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAskBaaDrawer(false)}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Close Ask Baa"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-3 border-b border-zinc-800/80 bg-zinc-950/80 flex items-center gap-2 overflow-x-auto text-[11px] font-mono no-scrollbar">
            {[
              { label: 'Explain this page', prompt: 'Explain the core thesis and key insights on this page in simple terms.' },
              { label: 'Key principles', prompt: 'What are the main principles and autonomous formulas on this page?' },
              { label: 'Code implementation', prompt: 'Can you show a practical Solidity or Python code implementation of this concept?' },
              { label: 'Quiz questions', prompt: 'Generate 3 comprehension quiz questions to test my understanding of this chapter.' },
              { label: "Author's perspective", prompt: "What is Ambassador Emmanuel Bassey Joe's philosophical perspective on this?" }
            ].map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSendAskBaa(qp.prompt)}
                disabled={isAskBaaLoading}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white whitespace-nowrap transition"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
            {askBaaMessages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 mb-1 px-1">
                  <span>{msg.role === 'user' ? 'Scholar' : 'Ask Baa'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-[92%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-white rounded-tr-none border border-zinc-700'
                      : 'bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 text-zinc-200 rounded-tl-none border border-zinc-800/90 shadow-md'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed">
                    {msg.content}
                  </div>

                  {msg.role === 'assistant' && msg.content.includes('#read-') && (
                    <div className="mt-3 pt-2.5 border-t border-zinc-800">
                      <button
                        onClick={() => {
                          const match = msg.content.match(/#read-([a-zA-Z0-9_-]+)/);
                          if (match && match[1]) {
                            const targetId = match[1];
                            const all = getAllCatalogueBooks();
                            const targetBook = all.find(b => b.id === targetId);
                            if (targetBook) {
                              setCurrentBook(targetBook);
                              setCurrentPage(1);
                              setShowAskBaaDrawer(false);
                            }
                          }
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#00D4FF] text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 shadow transition"
                      >
                        <BookOpen className="w-3.5 h-3.5 fill-black" />
                        <span>Open &amp; Read In Online Reader Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {msg.role === 'assistant' && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="text-[10px] text-[#00D4FF]">Grounded in BAA Monograph</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(msg.content);
                          setCopiedMessageId(msg.id);
                          setTimeout(() => setCopiedMessageId(null), 2000);
                        }}
                        className="flex items-center gap-1 hover:text-white transition"
                      >
                        {copiedMessageId === msg.id ? (
                          <>
                            <CheckCheck className="w-3 h-3 text-emerald-400" />
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
                  )}
                </div>
              </div>
            ))}

            {isAskBaaLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Ask Baa is synthesizing manuscript insights...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-950">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAskBaa();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask any question about this manuscript..."
                value={askBaaQuery}
                onChange={(e) => setAskBaaQuery(e.target.value)}
                disabled={isAskBaaLoading}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#00D4FF] font-sans"
              />
              <button
                type="submit"
                disabled={!askBaaQuery.trim() || isAskBaaLoading}
                className="p-2.5 rounded-xl bg-[#00D4FF] text-black hover:bg-cyan-400 disabled:opacity-40 transition"
                title="Send to Ask Baa"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REWARD CELEBRATION MODAL */}
      {showRewardModal && rewardDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-amber-500/50 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-5 text-center shadow-[0_0_50px_rgba(255,215,0,0.2)]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-black flex items-center justify-center mx-auto shadow-xl">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-heading font-black text-white text-xl">
                BaaCoin Reward Claimed!
              </h3>
              <p className="text-xs text-zinc-300 font-mono">
                {rewardDetails.message}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Tokens Awarded:</span>
                <span className="text-[#FFD700] font-bold">+{rewardDetails.amount} BAA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Updated Wallet Balance:</span>
                <span className="text-white font-bold">{wallet.balance.toLocaleString()} BAA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Student XP Gained:</span>
                <span className="text-[#00D4FF] font-bold">+250 XP</span>
              </div>
              {rewardDetails.txHash && (
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400">Ledger Hash:</span>
                  <span className="text-zinc-300 text-[10px] truncate max-w-[150px]">
                    {rewardDetails.txHash}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowRewardModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-black font-mono text-xs font-bold hover:brightness-110 shadow-lg"
            >
              Continue Reading &amp; Exploring
            </button>
          </div>
        </div>
      )}

      {/* SETTINGS DRAWER */}
      {showSettingsDrawer && (
        <div className="fixed inset-y-0 right-0 z-50 w-80 bg-zinc-950 border-l border-zinc-800 shadow-2xl p-6 flex flex-col justify-between text-slate-100">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="font-heading font-black text-sm text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#FFD700]" />
                <span>Reading Preferences</span>
              </h3>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Themes */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block">THEME AMBIENCE</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {[
                  { id: 'dark', label: 'OLED Dark' },
                  { id: 'cyber', label: 'Cyber Matrix' },
                  { id: 'sepia', label: 'Warm Sepia' },
                  { id: 'paper', label: 'Clean Paper' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      theme === t.id ? 'bg-[#FFD700] text-black font-bold border-[#FFD700]' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Family */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block">FONT FAMILY</label>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                {(['serif', 'sans', 'mono'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFontFamily(f)}
                    className={`py-2 px-1 rounded-xl border text-center uppercase transition ${
                      fontFamily === f ? 'bg-[#00D4FF] text-black font-bold border-[#00D4FF]' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Adjuster */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>FONT SIZE</span>
                <span className="text-[#FFD700]">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 font-bold"
                >
                  A-
                </button>
                <input
                  type="range"
                  min={14}
                  max={24}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-[#FFD700]"
                />
                <button
                  onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 font-bold"
                >
                  A+
                </button>
              </div>
            </div>

            {/* View Mode Layout */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block">PAGE SPREAD LAYOUT</label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => setViewMode('single')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                    viewMode === 'single' ? 'bg-[#FFD700] text-black font-bold border-[#FFD700]' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>Single Page</span>
                </button>
                <button
                  onClick={() => setViewMode('spread')}
                  className={`p-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition ${
                    viewMode === 'spread' ? 'bg-[#FFD700] text-black font-bold border-[#FFD700]' : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Book Spread</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 text-xs font-mono text-zinc-400 space-y-2">
            <button
              onClick={() => handleSaveProgress()}
              className="w-full py-2.5 rounded-xl bg-[#FFD700] text-black font-bold flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Reading State</span>
            </button>
            <p className="text-[11px] text-zinc-500 text-center">
              Auto-saves to browser memory &amp; BAA Ledger
            </p>
          </div>
        </div>
      )}

      {/* TABLE OF CONTENTS DRAWER */}
      {showTocDrawer && (
        <div className="fixed inset-y-0 left-0 z-50 w-84 bg-zinc-950 border-r border-zinc-800 shadow-2xl p-6 flex flex-col justify-between text-slate-100">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-heading font-black text-sm text-white flex items-center gap-2">
                <List className="w-4 h-4 text-[#00D4FF]" />
                <span>Table of Contents</span>
              </h3>
              <button
                onClick={() => setShowTocDrawer(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              {pages.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(p.pageNumber);
                    handleSaveProgress(p.pageNumber);
                    setShowTocDrawer(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between ${
                    currentPage === p.pageNumber
                      ? 'bg-[#FFD700] text-black font-bold'
                      : 'hover:bg-zinc-900 text-zinc-300'
                  }`}
                >
                  <span className="truncate pr-2">{p.chapterTitle}</span>
                  <span className="opacity-60 text-[10px]">p.{p.pageNumber}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 text-center">
            {totalPages} Total Validated Pages
          </div>
        </div>
      )}

      {/* BOOKMARK NOTE PROMPT MODAL */}
      {isAddingBookmark && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-white text-sm flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#FFD700]" />
                <span>Bookmark Page {currentPage}</span>
              </h4>
              <button onClick={() => setIsAddingBookmark(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400">
              Add a note or reference insight for this page to resume or quote later:
            </p>
            <input
              type="text"
              placeholder="e.g. Key proof on zero-shot consensus latency..."
              value={newBookmarkNote}
              onChange={(e) => setNewBookmarkNote(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#FFD700] font-mono"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') confirmAddBookmark();
              }}
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingBookmark(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddBookmark}
                className="px-4 py-1.5 rounded-xl bg-[#FFD700] text-black font-mono text-xs font-bold hover:brightness-110"
              >
                Pin Bookmark
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
