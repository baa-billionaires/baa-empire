import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Grid,
  Home,
  BookOpen,
  GraduationCap,
  Zap,
  Coins,
  Shield,
  Layers,
  Compass,
  Building2,
  Scale,
  Radar
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useEcosystem } from '../../context/EcosystemContext';

export const UniversalPageNavigator: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    previousPage,
    nextPage,
    currentPageMeta,
    openAllPagesModal,
    allPages
  } = useNavigation();

  const { isAdmin } = useEcosystem();

  return (
    <div className="w-full bg-zinc-950/95 border-b border-zinc-800/80 backdrop-blur-md sticky top-[73px] z-40 px-3 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        {/* LEFT: BACK, FORWARD & DASHBOARD BUTTONS */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* BACK BUTTON */}
          <button
            onClick={goBack}
            disabled={!canGoBack}
            title={previousPage ? `Back to: ${previousPage.shortTitle}` : 'Go Back'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
              canGoBack
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 hover:text-white border-zinc-700/80 hover:border-[#FFD700]/60 shadow-sm cursor-pointer'
                : 'bg-zinc-950/60 text-zinc-600 border-zinc-900 cursor-not-allowed opacity-50'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-[#FFD700]" />
            <span className="hidden sm:inline">Back</span>
            {previousPage && canGoBack && (
              <span className="hidden md:inline text-[10px] text-zinc-400 font-normal truncate max-w-[100px]">
                ({previousPage.shortTitle})
              </span>
            )}
          </button>

          {/* FORWARD BUTTON */}
          <button
            onClick={goForward}
            disabled={!canGoForward}
            title={nextPage ? `Forward to: ${nextPage.shortTitle}` : 'Go Forward'}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border ${
              canGoForward
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 hover:text-white border-zinc-700/80 hover:border-[#00D4FF]/60 shadow-sm cursor-pointer'
                : 'bg-zinc-950/60 text-zinc-600 border-zinc-900 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="hidden sm:inline">Forward</span>
            {nextPage && canGoForward && (
              <span className="hidden md:inline text-[10px] text-zinc-400 font-normal truncate max-w-[100px]">
                ({nextPage.shortTitle})
              </span>
            )}
            <ChevronRight className="w-4 h-4 text-[#00D4FF]" />
          </button>

          {/* HOME SHORTCUT */}
          <button
            onClick={() => navigateTo('home')}
            title="Go to Homepage"
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium transition border flex items-center gap-1.5 ${
              currentPage === 'home'
                ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Home</span>
          </button>

          {/* DASHBOARD BUTTON */}
          <button
            onClick={() => navigateTo('dashboard')}
            title="Go to Student Portal & Daily BaaCoin Mining Dashboard"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition border ${
              currentPage === 'dashboard'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black border-[#FFD700] shadow-md shadow-[#FFD700]/20'
                : 'bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/30 hover:border-[#FFD700]/60'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </button>
        </div>

        {/* CENTER / BREADCRUMB INDICATOR */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs shrink-0 max-w-sm truncate">
          <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-ping" />
          <span className="text-zinc-500 font-mono text-[11px]">Location:</span>
          <span className="font-semibold text-zinc-200 truncate">
            {currentPageMeta.title}
          </span>
          {currentPageMeta.badge && (
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-[#FFD700] border border-zinc-700">
              {currentPageMeta.badge}
            </span>
          )}
        </div>

        {/* RIGHT: ALL PAGES EXPLORER & QUICK HUBS */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Hub Jump: Global Deal Room */}
          <button
            onClick={() => navigateTo('deal-room')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              currentPage === 'deal-room'
                ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-sm'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-[#FFD700] hover:text-white border-[#FFD700]/30 hover:border-[#FFD700]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">Deal Room</span>
          </button>

          {/* Quick Hub Jump: Governance Institute */}
          <button
            onClick={() => navigateTo('governance')}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              currentPage === 'governance'
                ? 'bg-purple-900 text-purple-200 border-purple-500 shadow-sm'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-purple-300 hover:text-white border-purple-500/30 hover:border-purple-500'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px]">Governance</span>
          </button>

          {/* Quick Hub Jump: AI Recruiter Radar */}
          <button
            onClick={() => navigateTo('recruiter')}
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition border ${
              currentPage === 'recruiter'
                ? 'bg-cyan-900 text-cyan-200 border-cyan-500 shadow-sm'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-cyan-300 hover:text-white border-cyan-500/30 hover:border-cyan-500'
            }`}
          >
            <Radar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">Recruiter</span>
          </button>

          {/* Quick Hub Jump: Growth OS / MAFIA */}
          <button
            onClick={() => navigateTo('growth-mafia')}
            className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition border ${
              currentPage === 'growth-mafia'
                ? 'bg-cyan-950 text-cyan-300 border-cyan-700'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800'
            }`}
          >
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="text-[11px]">MAFIA™</span>
          </button>

          {/* Quick Hub Jump: Library */}
          <button
            onClick={() => navigateTo('ebooks')}
            className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition border ${
              currentPage === 'ebooks'
                ? 'bg-amber-950 text-amber-300 border-amber-700'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800'
            }`}
          >
            <BookOpen className="w-3 h-3 text-amber-400" />
            <span className="text-[11px]">4D Library</span>
          </button>

          {/* Quick Hub Jump: Wallet */}
          <button
            onClick={() => navigateTo('wallet')}
            className={`hidden md:flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition border ${
              currentPage === 'wallet'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800'
            }`}
          >
            <Coins className="w-3 h-3 text-emerald-400" />
            <span className="text-[11px]">Wallet</span>
          </button>

          {/* Admin Vault if admin */}
          {isAdmin && (
            <button
              onClick={() => navigateTo('admin')}
              className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono transition border ${
                currentPage === 'admin'
                  ? 'bg-emerald-900/60 text-emerald-300 border-emerald-500'
                  : 'bg-zinc-900 text-emerald-400 border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span className="text-[11px]">Admin</span>
            </button>
          )}

          {/* ALL PAGES BUTTON (OPENS SEARCHABLE DIRECTORY) */}
          <button
            onClick={openAllPagesModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-[#FFD700] text-zinc-200 hover:text-white text-xs font-bold transition shadow-sm cursor-pointer"
            title="Open Directory of All Pages & Modules"
          >
            <Grid className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>All Pages</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              {allPages.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
