import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Grid,
  ArrowUp,
  Compass,
  ChevronDown,
  ChevronUp,
  Home
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const FloatingNavDock: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    previousPage,
    nextPage,
    openAllPagesModal,
    allPages
  } = useNavigation();

  const [isMinimized, setIsMinimized] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-fadeIn">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950/90 hover:bg-black text-[#FFD700] border border-[#FFD700]/40 rounded-full shadow-2xl backdrop-blur-xl text-xs font-bold transition hover:scale-105 cursor-pointer"
          title="Expand Universal Navigation Dock"
        >
          <Compass className="w-4 h-4 text-[#FFD700] animate-spin-slow" />
          <span>Nav Dock</span>
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] animate-fadeIn">
      <div className="bg-zinc-950/90 border border-zinc-700/80 rounded-2xl p-1.5 shadow-2xl backdrop-blur-2xl flex items-center gap-1 text-xs">
        {/* BACK BUTTON */}
        <button
          onClick={goBack}
          disabled={!canGoBack}
          title={previousPage ? `Back to: ${previousPage.shortTitle}` : 'Go Back'}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl font-semibold transition ${
            canGoBack
              ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 hover:text-white border border-zinc-700 hover:border-[#FFD700]/60 cursor-pointer shadow-sm'
              : 'bg-zinc-950/40 text-zinc-600 border border-zinc-900 cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4 text-[#FFD700]" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* FORWARD BUTTON */}
        <button
          onClick={goForward}
          disabled={!canGoForward}
          title={nextPage ? `Forward to: ${nextPage.shortTitle}` : 'Go Forward'}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl font-semibold transition ${
            canGoForward
              ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100 hover:text-white border border-zinc-700 hover:border-[#00D4FF]/60 cursor-pointer shadow-sm'
              : 'bg-zinc-950/40 text-zinc-600 border border-zinc-900 cursor-not-allowed opacity-50'
          }`}
        >
          <span className="hidden sm:inline">Forward</span>
          <ChevronRight className="w-4 h-4 text-[#00D4FF]" />
        </button>

        <div className="w-[1px] h-6 bg-zinc-800 mx-0.5" />

        {/* HOME BUTTON */}
        <button
          onClick={() => navigateTo('home')}
          title="Go to Homepage"
          className={`p-2 rounded-xl transition border flex items-center justify-center ${
            currentPage === 'home'
              ? 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/40'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800'
          }`}
        >
          <Home className="w-4 h-4" />
        </button>

        {/* DASHBOARD BUTTON */}
        <button
          onClick={() => navigateTo('dashboard')}
          title="Go to Student Portal & Daily BaaCoin Mining Dashboard"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition border ${
            currentPage === 'dashboard'
              ? 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black border-[#FFD700] shadow-md shadow-[#FFD700]/30'
              : 'bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700]/60'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </button>

        <div className="w-[1px] h-6 bg-zinc-800 mx-0.5" />

        {/* ALL PAGES DIRECTORY BUTTON */}
        <button
          onClick={openAllPagesModal}
          title="Open Directory of All Pages & Modules"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-100 hover:text-white border border-zinc-700 hover:border-[#FFD700] font-bold transition shadow-sm cursor-pointer"
        >
          <Grid className="w-4 h-4 text-[#FFD700]" />
          <span>All Pages</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 hidden sm:inline">
            {allPages.length}
          </span>
        </button>

        {/* SCROLL TO TOP */}
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* MINIMIZE BUTTON */}
        <button
          onClick={() => setIsMinimized(true)}
          title="Minimize Dock"
          className="p-1.5 text-zinc-500 hover:text-zinc-300 transition"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
