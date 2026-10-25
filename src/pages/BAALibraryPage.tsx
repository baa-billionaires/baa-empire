import React, { useState, useMemo, useEffect } from 'react';
import { 
  BAA_LIBRARY_CATALOGUE, 
  BAA_25_CATEGORIES, 
  BAA_PUBLISHING_SWARM_AGENTS 
} from '../lib/baaLibraryData';
import { getAllCatalogueBooks, generateAutonomousBook } from '../lib/autonomousBookGenerator';
import { BAABook, BookPublicationStatus } from '../types/library';
import { BaaLibrary4DBanner } from '../components/library/BaaLibrary4DBanner';
import { BookReaderModal } from '../components/library/BookReaderModal';
import { CoverStudioModal } from '../components/library/CoverStudioModal';
import { PublishingSwarmModal } from '../components/library/PublishingSwarmModal';
import { BookDownloadModal } from '../components/library/BookDownloadModal';
import { OnlineReader } from '../components/library/OnlineReader';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  Bot, 
  Eye, 
  Download, 
  Layers, 
  ShieldCheck, 
  Coins, 
  Flame, 
  CheckCircle2, 
  Sliders,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Zap,
  Loader2,
  Clapperboard,
  Film
} from 'lucide-react';
import { AttractiveBookCover } from '../components/library/AttractiveBookCover';
import { BookToVideoPlayerModal } from '../components/library/BookToVideoPlayerModal';
import { useViewMode } from '../context/ViewModeContext';

interface BAALibraryPageProps {
  onNavigateToCourse?: (courseId: string) => void;
  onNavigateToAcademy?: () => void;
}

export const BAALibraryPage: React.FC<BAALibraryPageProps> = ({
  onNavigateToCourse,
  onNavigateToAcademy
}) => {
  const [booksList, setBooksList] = useState<BAABook[]>(() => getAllCatalogueBooks());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryNumber, setSelectedCategoryNumber] = useState<number | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'published' | 'pipeline'>('all');
  const [filterOnlyStories, setFilterOnlyStories] = useState(false);
  const [isCompilingBook, setIsCompilingBook] = useState(false);
  const [compilationSuccessMessage, setCompilationSuccessMessage] = useState<string | null>(null);

  const { setSelectedBook, setViewMode, setIsAssistantOpen } = useViewMode();

  const handleStudyWithAssistant = (book: BAABook) => {
    setSelectedBook(book);
    setViewMode('desktop');
    setIsAssistantOpen(true);
  };

  // Modals state
  const [activeOnlineReaderBook, setActiveOnlineReaderBook] = useState<BAABook | null>(null);
  const [activeVideoBook, setActiveVideoBook] = useState<BAABook | null>(null);
  const [activeReaderBook, setActiveReaderBook] = useState<BAABook | null>(null);
  const [activeCoverBook, setActiveCoverBook] = useState<BAABook | null>(null);
  const [activeDownloadBook, setActiveDownloadBook] = useState<BAABook | null>(null);
  const [isSwarmModalOpen, setIsSwarmModalOpen] = useState(false);
  const [companionCourseModalBook, setCompanionCourseModalBook] = useState<BAABook | null>(null);

  // Synchronize with autonomously generated books and reader redirect requests
  useEffect(() => {
    const handleBookGenerated = (e: any) => {
      const newBook: BAABook | undefined = e.detail?.book;
      const allUpdated = getAllCatalogueBooks();
      setBooksList(allUpdated);
      if (newBook) {
        setCompilationSuccessMessage(`Autonomously synthesized and published "${newBook.title}"!`);
        setTimeout(() => setCompilationSuccessMessage(null), 6000);
      }
    };

    const handleOpenBookInReader = (e: any) => {
      const book: BAABook | undefined = e.detail?.book;
      const bookId: string | undefined = e.detail?.bookId;
      const allUpdated = getAllCatalogueBooks();
      setBooksList(allUpdated);
      if (book) {
        setActiveOnlineReaderBook(book);
      } else if (bookId) {
        const found = allUpdated.find(b => b.id === bookId);
        if (found) setActiveOnlineReaderBook(found);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#read-')) {
        const bookId = hash.replace('#read-', '');
        const all = getAllCatalogueBooks();
        const found = all.find(b => b.id === bookId);
        if (found) {
          setActiveOnlineReaderBook(found);
        }
      }
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener('baa_book_autonomously_generated', handleBookGenerated);
    window.addEventListener('baa_open_book_in_reader', handleOpenBookInReader);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('baa_book_autonomously_generated', handleBookGenerated);
      window.removeEventListener('baa_open_book_in_reader', handleOpenBookInReader);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAutonomousCompileFromSearch = (topicTitle: string) => {
    if (!topicTitle.trim()) return;
    setIsCompilingBook(true);
    try {
      const newBook = generateAutonomousBook(topicTitle.trim());
      const updated = getAllCatalogueBooks();
      setBooksList(updated);
      setSearchQuery('');
      setCompilationSuccessMessage(`Successfully published "${newBook.title}" to BAA Library!`);
      // Automatically redirect/open to the generated book
      setActiveOnlineReaderBook(newBook);
    } catch (err) {
      console.error('Failed to autonomously compile book:', err);
    } finally {
      setIsCompilingBook(false);
    }
  };

  // Flagship book
  const flagshipBook = useMemo(() => {
    return booksList.find(b => b.isFlagship) || booksList[0];
  }, [booksList]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return booksList.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorAlias.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        selectedCategoryNumber === 'all' || 
        book.categoryNumber === selectedCategoryNumber;

      const matchesCollection = 
        selectedCollection === 'all' ||
        (selectedCollection === 'A' && book.collection.includes('Collection A')) ||
        (selectedCollection === 'B' && book.collection.includes('Collection B')) ||
        (selectedCollection === 'C' && book.collection.includes('Collection C'));

      const matchesStatus = 
        selectedStatus === 'all' ||
        (selectedStatus === 'published' && book.publicationStatus === 'published') ||
        (selectedStatus === 'pipeline' && book.publicationStatus !== 'published');

      const matchesStories = !filterOnlyStories || book.isStoryBook || book.categoryNumber === 26;

      return matchesSearch && matchesCategory && matchesCollection && matchesStatus && matchesStories;
    });
  }, [booksList, searchQuery, selectedCategoryNumber, selectedCollection, selectedStatus, filterOnlyStories]);

  // Update book publication status (from Swarm Modal)
  const handleUpdateBookStatus = (bookId: string, newStatus: BookPublicationStatus) => {
    setBooksList(prev => prev.map(b => {
      if (b.id === bookId) {
        return { ...b, publicationStatus: newStatus };
      }
      return b;
    }));
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* 4D Digital Interactive Holographic Banner */}
      <BaaLibrary4DBanner
        onOpenSwarmPipeline={() => setIsSwarmModalOpen(true)}
        onExploreFlagship={() => setActiveOnlineReaderBook(flagshipBook)}
      />

      {/* MILESTONE 1 VERIFIED PROOF SHOWCASE CARD */}
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-zinc-950 via-slate-950 to-zinc-900 border-2 border-[#FFD700]/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Subtle Cyber Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D4FF]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Cover Preview Column - High-Fidelity Attractive Book Cover */}
            <div className="lg:col-span-4 flex justify-center">
              <div 
                onClick={() => setActiveCoverBook(flagshipBook)}
                className="cursor-pointer transition-all duration-500 hover:scale-105 w-64 max-w-full drop-shadow-[0_0_35px_rgba(255,215,0,0.3)]"
                title="Click to inspect 3D front & back covers in Studio"
              >
                <AttractiveBookCover book={flagshipBook} />
              </div>
            </div>

            {/* Right Milestone Details Column */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-[#FFD700] border border-[#FFD700]/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>MILESTONE 1 VERIFIED PROOF</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Original Complete Manuscript Working End-to-End</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-amber-300 border border-red-500/40 flex items-center gap-1.5">
                  <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cinematic Film Adaptation Available</span>
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
                  {flagshipBook.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  {flagshipBook.subtitle} Complete original technical monograph including formal autonomous system architecture, tokenomic game loops, production Solidity contracts, and Python multi-agent orchestration code.
                </p>
              </div>

              {/* Author & Verification Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono bg-black/60 p-4 rounded-2xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 block text-[10px]">OFFICIAL AUTHOR &amp; FOUNDER</span>
                  <strong className="text-white text-xs">{flagshipBook.authorName}</strong>
                  <div className="text-[#FFD700]">{flagshipBook.authorAlias}</div>
                  <div className="text-zinc-400 text-[11px]">Direct Line: {flagshipBook.contactNumber}</div>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px]">SMART CONTRACT &amp; ISBN</span>
                  <div className="text-emerald-400 truncate">Base L2: {flagshipBook.baseL2Hash}</div>
                  <div className="text-zinc-300">ISBN: {flagshipBook.isbn}</div>
                  <div className="text-[#00D4FF] text-[11px] truncate">Portal: https://baa-empire.vercel.app</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveVideoBook(flagshipBook)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-[#FFD700] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-2xl flex items-center gap-2 border border-amber-300/50"
                  title="Watch book as a clean visual documentary film"
                >
                  <Clapperboard className="w-4 h-4 fill-black text-black" />
                  <span>Watch as AI Film (Book-to-Video)</span>
                </button>

                <button
                  onClick={() => setActiveOnlineReaderBook(flagshipBook)}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#E5A800] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-xl flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 fill-black text-black" />
                  <span>Online Paginated Reader</span>
                </button>

                <button
                  onClick={() => handleStudyWithAssistant(flagshipBook)}
                  className="px-4 py-3 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/40 font-mono text-xs font-bold transition flex items-center gap-2 shadow"
                  title="Open Smart Reading Assistant docked for this book"
                >
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Smart Reading AI</span>
                </button>

                <button
                  onClick={() => setActiveReaderBook(flagshipBook)}
                  className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono text-xs font-bold transition flex items-center gap-2"
                >
                  <Bot className="w-4 h-4 text-[#00D4FF]" />
                  <span>AI Study Mode &amp; Chat</span>
                </button>

                <button
                  onClick={() => setActiveCoverBook(flagshipBook)}
                  className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono text-xs font-bold transition flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#00D4FF]" />
                  <span>3D Front &amp; Back Covers</span>
                </button>

                <button
                  onClick={() => setActiveDownloadBook(flagshipBook)}
                  className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono text-xs font-bold transition flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download E-Book (EPUB / PDF)</span>
                </button>

                <button
                  onClick={() => setCompanionCourseModalBook(flagshipBook)}
                  className="px-4 py-3 rounded-xl bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40 font-mono text-xs font-bold transition flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#00D4FF]" />
                  <span>Companion Course</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CATALOGUE FILTERS & BATCH ORCHESTRATION TRIGGER */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#FFD700] uppercase font-bold tracking-widest flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FFD700]" />
                250-BOOK MASTER PUBLISHING EMPIRE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-[#00D4FF] border border-[#00D4FF]/30">
                25 Disciplines
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              Autonomous Digital Bookshelf
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Showing {filteredBooks.length} titles. Batch-produced with human editorial review gates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search titles, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 focus:border-[#FFD700] rounded-xl text-xs text-white placeholder-zinc-500 font-mono outline-none"
              />
            </div>

            {/* Launch Swarm Button */}
            <button
              onClick={() => setIsSwarmModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-mono text-xs font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-2 shadow-lg"
            >
              <Bot className="w-4 h-4 text-[#00D4FF]" />
              <span>Swarm Controller (30 Agents)</span>
            </button>
          </div>
        </div>

        {/* Collection & Status Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {/* Collections Tabs */}
          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Collections (250 Books)' },
              { id: 'A', label: 'Collection A (AI & Engineering)' },
              { id: 'B', label: 'Collection B (Digital Economy)' },
              { id: 'C', label: 'Collection C (Advanced Tech & Society)' }
            ].map(col => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-bold ${
                  selectedCollection === col.id
                    ? 'bg-[#FFD700] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedStatus === 'all' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Statuses
            </button>
            <button
              onClick={() => setSelectedStatus('published')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedStatus === 'published' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Published Only
            </button>
            <button
              onClick={() => setSelectedStatus('pipeline')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedStatus === 'pipeline' ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Production Pipeline
            </button>
          </div>
        </div>

        {/* 25 Category & Story Quick Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-[11px] font-mono">
          {/* Quick Filter for BAA AI Stories & Sagas */}
          <button
            onClick={() => {
              setFilterOnlyStories(!filterOnlyStories);
              setSelectedCategoryNumber('all');
            }}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap border transition font-bold flex items-center gap-1.5 shadow ${
              filterOnlyStories
                ? 'bg-gradient-to-r from-red-600 via-amber-500 to-[#FFD700] text-black border-amber-300'
                : 'bg-zinc-900/90 text-amber-300 border-amber-500/40 hover:bg-zinc-800'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5" />
            <span>★ AI Stories &amp; Sagas (6 Bestsellers)</span>
          </button>

          <button
            onClick={() => {
              setSelectedCategoryNumber('all');
              setFilterOnlyStories(false);
            }}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
              selectedCategoryNumber === 'all' && !filterOnlyStories
                ? 'bg-[#00D4FF] text-black border-[#00D4FF] font-bold'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            All 250 Books
          </button>
          {BAA_25_CATEGORIES.map((cat: any) => (
            <button
              key={cat.number}
              onClick={() => {
                setSelectedCategoryNumber(cat.number);
                setFilterOnlyStories(false);
              }}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
                selectedCategoryNumber === cat.number && !filterOnlyStories
                  ? 'bg-[#00D4FF] text-black border-[#00D4FF] font-bold'
                  : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              #{cat.number} {cat.name}
            </button>
          ))}
        </div>

        {/* Compilation Success Notification Banner */}
        {compilationSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{compilationSuccessMessage}</span>
            </div>
            <button
              onClick={() => setCompilationSuccessMessage(null)}
              className="text-emerald-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>
        )}

        {/* 250 BOOKS GRID OR ZERO-RESULT AUTONOMOUS COMPILATION TRIGGER */}
        {filteredBooks.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-dashed border-[#00D4FF]/40 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center mx-auto text-[#00D4FF]">
              <Bot className="w-8 h-8" />
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <span className="text-[11px] font-mono text-[#FFD700] uppercase font-bold tracking-widest">
                BAA Autonomous Book Synthesizer • On-Demand Publication
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                "{searchQuery}" is not yet in our master archive
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                The BAA Publishing Swarm AI can immediately draft, peer-verify, render 4D covers, and anchor a complete 5-chapter operational manuscript on Base L2 right now under the authorship of <strong>Ambassador Emmanuel Bassey Joe</strong>.
              </p>
            </div>

            <div className="inline-flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleAutonomousCompileFromSearch(searchQuery)}
                disabled={isCompilingBook}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#00D4FF] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_25px_rgba(255,215,0,0.3)] flex items-center gap-2.5 disabled:opacity-50"
              >
                {isCompilingBook ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Synthesizing Manuscript &amp; 4D Covers...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-black" />
                    <span>Autonomously Compile &amp; Read "{searchQuery}" Now</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition"
              >
                Clear Search Filter
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>5 Comprehensive Chapters</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Solidity &amp; Python Snippets</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Live News Stream Wire</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-2">
            {filteredBooks.map((book) => {
              const hasCompleteManuscript = book.chapters.length > 0;
              const isPublished = book.publicationStatus === 'published';

              return (
                <div
                  key={book.id}
                  className={`group rounded-2xl bg-zinc-950 border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1.5 ${
                    book.isFlagship
                      ? 'border-[#FFD700] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]'
                      : book.isStoryBook
                      ? 'border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,212,255,0.35)]'
                      : 'border-zinc-800 hover:border-[#00D4FF]/60 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)]'
                  }`}
                >
                  {/* High-Fidelity Attractive Book Cover Container */}
                  <div className="relative w-full overflow-hidden">
                    <AttractiveBookCover book={book} />

                    {/* Hover Overlay Quick Actions */}
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 z-30">
                      {/* Video Film Button */}
                      <button
                        onClick={() => setActiveVideoBook(book)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-[#FFD700] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow-xl active:scale-95"
                        title="Watch book as an AI film with scene visuals and narration"
                      >
                        <Clapperboard className="w-3.5 h-3.5 fill-black text-black" />
                        <span>Watch as AI Film</span>
                      </button>

                      {hasCompleteManuscript ? (
                        <button
                          onClick={() => setActiveOnlineReaderBook(book)}
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow"
                        >
                          <BookOpen className="w-3.5 h-3.5 fill-black text-black" />
                          <span>Read Manuscript (Online)</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsSwarmModalOpen(true)}
                          className="w-full py-2 px-3 rounded-xl bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40 font-mono font-bold text-xs hover:bg-[#00D4FF]/30 transition flex items-center justify-center gap-1.5"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Dispatch Swarm Batch</span>
                        </button>
                      )}

                      <button
                        onClick={() => setActiveCoverBook(book)}
                        className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#00D4FF]" />
                        <span>3D Cover Studio</span>
                      </button>

                      <button
                        onClick={() => handleStudyWithAssistant(book)}
                        className="w-full py-2 px-3 rounded-xl bg-purple-950/90 hover:bg-purple-900 text-purple-200 border border-purple-500/40 font-mono font-bold text-xs transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <Bot className="w-3.5 h-3.5 text-purple-400" />
                        <span>Smart Reading AI</span>
                      </button>

                      <button
                        onClick={() => setActiveDownloadBook(book)}
                        className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-mono text-xs font-bold transition flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Download Edition</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Bottom Info Bar */}
                  <div className="p-3.5 space-y-2.5 bg-zinc-950 border-t border-zinc-900">
                    <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                      <span className="truncate">Author: <strong className="text-white">{book.authorAlias}</strong></span>
                      <span className="text-[#FFD700] font-bold">${book.priceUsd} USD</span>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-900 text-xs font-mono">
                      <button
                        onClick={() => setActiveVideoBook(book)}
                        className="py-1.5 px-2.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-amber-300 border border-red-500/30 transition flex items-center gap-1 text-[11px] font-bold"
                        title="Watch as AI Film"
                      >
                        <Clapperboard className="w-3 h-3 text-amber-400" />
                        <span>Film</span>
                      </button>

                      <button
                        onClick={() => setActiveOnlineReaderBook(book)}
                        className="flex-1 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 transition text-center font-bold text-[11px]"
                      >
                        {hasCompleteManuscript ? '📖 Read' : '📋 Pipeline'}
                      </button>

                      <button
                        onClick={() => setActiveCoverBook(book)}
                        className="px-2 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[#00D4FF] transition"
                        title="Cover Studio"
                      >
                        <Eye className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleStudyWithAssistant(book)}
                        className="px-2 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-purple-400 hover:text-white transition"
                        title="Study with Computer Smart Reading Assistant"
                      >
                        <Bot className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => setActiveDownloadBook(book)}
                        className="px-2 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-400 transition"
                        title="Download E-Book"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COMPANION COURSE MODAL */}
      {companionCourseModalBook && companionCourseModalBook.companionCourse && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                    Official Companion Course
                  </span>
                  <h3 className="text-base font-heading font-black text-white">
                    {companionCourseModalBook.companionCourse.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setCompanionCourseModalBook(null)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800 space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Curriculum Modules:</span>
                  <strong className="text-white">{companionCourseModalBook.companionCourse.modulesCount} Core Modules</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Interactive Lessons:</span>
                  <strong className="text-white">{companionCourseModalBook.companionCourse.lessonsCount} Video &amp; Code Labs</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Certification NFT:</span>
                  <strong className="text-[#FFD700]">{companionCourseModalBook.companionCourse.certificationTitle}</strong>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Study-to-Earn Rewards:</span>
                  <strong className="text-emerald-400">+{companionCourseModalBook.companionCourse.baacoinReward} BAA / +{companionCourseModalBook.companionCourse.xpReward} XP</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const courseId = companionCourseModalBook.companionCourse?.courseId;
                  setCompanionCourseModalBook(null);
                  if (onNavigateToCourse && courseId) {
                    onNavigateToCourse(courseId);
                  } else if (onNavigateToAcademy) {
                    onNavigateToAcademy();
                  }
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-mono text-xs font-bold hover:brightness-110 transition shadow flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Launch Course in BAA Academy</span>
              </button>
              <button
                onClick={() => setCompanionCourseModalBook(null)}
                className="py-3 px-4 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-mono text-xs transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOUNTED MODALS */}
      {activeOnlineReaderBook && (
        <OnlineReader
          book={activeOnlineReaderBook}
          onClose={() => setActiveOnlineReaderBook(null)}
        />
      )}

      {activeReaderBook && (
        <BookReaderModal
          book={activeReaderBook}
          onClose={() => setActiveReaderBook(null)}
          onOpenCoverStudio={() => {
            const b = activeReaderBook;
            setActiveReaderBook(null);
            setActiveCoverBook(b);
          }}
          onOpenDownload={() => {
            const b = activeReaderBook;
            setActiveReaderBook(null);
            setActiveDownloadBook(b);
          }}
        />
      )}

      {activeCoverBook && (
        <CoverStudioModal
          book={activeCoverBook}
          onClose={() => setActiveCoverBook(null)}
        />
      )}

      {activeDownloadBook && (
        <BookDownloadModal
          book={activeDownloadBook}
          onClose={() => setActiveDownloadBook(null)}
          onOpenReader={() => setActiveReaderBook(activeDownloadBook)}
          onOpenCompanionCourse={() => setCompanionCourseModalBook(activeDownloadBook)}
        />
      )}

      {/* CINEMATIC BOOK-TO-VIDEO PLAYER MODAL */}
      {activeVideoBook && (
        <BookToVideoPlayerModal
          book={activeVideoBook}
          onClose={() => setActiveVideoBook(null)}
          onSwitchToReader={() => {
            const b = activeVideoBook;
            setActiveVideoBook(null);
            setActiveOnlineReaderBook(b);
          }}
        />
      )}

      {isSwarmModalOpen && (
        <PublishingSwarmModal
          books={booksList}
          onUpdateBookStatus={handleUpdateBookStatus}
          onClose={() => setIsSwarmModalOpen(false)}
        />
      )}
    </div>
  );
};
