import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Compass,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Store,
  ShoppingCart,
  School,
  Gift,
  Zap,
  Bot,
  Cpu,
  Server,
  Layers,
  Radio,
  Wrench,
  Coins,
  TrendingUp,
  Flame,
  Users,
  FileText,
  Award,
  Tv,
  Video,
  Film,
  Shield,
  Target,
  Share2,
  MessageSquare,
  Send,
  Contact,
  Globe,
  PlaySquare,
  Sparkles,
  Info,
  Handshake,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useNavigation, PageMetadata } from '../../context/NavigationContext';
import { useEcosystem } from '../../context/EcosystemContext';

// Map icon names to Lucide icons
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Store,
  ShoppingCart,
  School,
  Gift,
  Zap,
  Bot,
  Cpu,
  Server,
  Layers,
  Radio,
  Wrench,
  Coins,
  TrendingUp,
  Flame,
  Users,
  FileText,
  Award,
  Tv,
  Video,
  Film,
  Shield,
  Target,
  Share2,
  MessageSquare,
  Send,
  Contact,
  Globe,
  PlaySquare,
  Sparkles,
  Info,
  Handshake
};

export const AllPagesDirectoryModal: React.FC = () => {
  const { isAllPagesModalOpen, closeAllPagesModal, allPages, navigateTo, currentPage } = useNavigation();
  const { isAdmin } = useEcosystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Pages' },
    { id: 'core', label: 'Core Portals' },
    { id: 'ai_autonomous', label: 'Autonomous AI' },
    { id: 'web3_finance', label: 'Web3 & Finance' },
    { id: 'media', label: 'Media Network' },
    { id: 'admin_command', label: 'Admin Command' },
    { id: 'community', label: 'Ecosystem' }
  ];

  const filteredPages = useMemo(() => {
    return allPages.filter(page => {
      // If admin only and user is not admin, hide or show with lock
      if (page.adminOnly && !isAdmin && searchQuery === '') {
        // still show but indicate requires admin
      }

      const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
      const matchesSearch =
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allPages, selectedCategory, searchQuery, isAdmin]);

  if (!isAllPagesModalOpen) return null;

  const handleSelectPage = (pageId: string) => {
    navigateTo(pageId);
    closeAllPagesModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-4xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER & SEARCH BAR */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/60 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <span className="p-2 rounded-xl bg-[#FFD700]/15 border border-[#FFD700]/30 text-[#FFD700]">
                <Compass className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Universal Page Directory & Navigator</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {allPages.length} Pages
                  </span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Instant portal switcher — jump directly to any page, hub, studio, or dashboard across the entire ecosystem.
                </p>
              </div>
            </div>

            <button
              onClick={closeAllPagesModal}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, feature (e.g. 'Dashboard', 'Books', 'Mining', 'Wallet', 'MAFIA')..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FFD700] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-zinc-300 font-mono"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition font-medium text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-[#FFD700] text-black font-bold shadow-md shadow-[#FFD700]/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* PAGES GRID */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredPages.map(page => {
                const IconComponent = ICON_MAP[page.iconName] || Compass;
                const isCurrent = currentPage === page.id;

                return (
                  <button
                    key={page.id}
                    onClick={() => handleSelectPage(page.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between group cursor-pointer ${
                      isCurrent
                        ? 'bg-[#FFD700]/10 border-[#FFD700]/60 ring-1 ring-[#FFD700]/40 shadow-lg shadow-[#FFD700]/10'
                        : 'bg-zinc-900/80 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className={`p-2 rounded-lg transition ${
                            isCurrent
                              ? 'bg-[#FFD700] text-black font-bold'
                              : 'bg-zinc-800 text-zinc-300 group-hover:text-[#00D4FF] group-hover:bg-zinc-700'
                          }`}>
                            <IconComponent className="w-4 h-4" />
                          </span>
                          <span className="font-bold text-sm text-zinc-100 group-hover:text-white">
                            {page.shortTitle}
                          </span>
                        </div>

                        {isCurrent ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFD700] text-black font-bold">
                            Current
                          </span>
                        ) : page.badge ? (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/30 font-semibold">
                            {page.badge}
                          </span>
                        ) : null}
                      </div>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {page.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="font-mono text-[10px] text-zinc-400">{page.categoryLabel}</span>
                      <span className="flex items-center gap-1 text-[#FFD700] group-hover:translate-x-1 transition-transform font-medium">
                        <span>Open</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <Compass className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm font-semibold text-zinc-300">No pages found matching "{searchQuery}"</p>
              <p className="text-xs text-zinc-500">Try searching for keywords like "Dashboard", "Market", "Mining", "Admin", etc.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 sm:p-4 border-t border-zinc-800/80 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous routing active • Click any tile to navigate immediately</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectPage('home')}
              className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-[11px]"
            >
              Go to Home
            </button>
            <button
              onClick={() => handleSelectPage('dashboard')}
              className="px-2.5 py-1 rounded bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/30 text-[11px] font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
