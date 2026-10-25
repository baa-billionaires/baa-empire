import React, { useState } from 'react';
import { useViewMode, ViewMode } from '../../context/ViewModeContext';
import { Smartphone, Tablet, Monitor, Sparkles, BookOpen, ChevronRight, RotateCw, ZoomIn, X, Minimize2 } from 'lucide-react';

interface ViewModeSwitcherBarProps {
  variant?: 'floating' | 'navbar' | 'compact';
  onNavigateToLibrary?: () => void;
}

export const ViewModeSwitcherBar: React.FC<ViewModeSwitcherBarProps> = ({
  variant = 'floating',
  onNavigateToLibrary
}) => {
  const {
    viewMode,
    setViewMode,
    orientation,
    toggleOrientation,
    isAssistantOpen,
    toggleAssistant,
    readingEarningsBAA
  } = useViewMode();

  const [isBarMinimized, setIsBarMinimized] = useState(() => {
    return localStorage.getItem('baa_switcher_bar_min') === 'true';
  });

  const modes: Array<{
    id: ViewMode;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    badge?: string;
  }> = [
    {
      id: 'mobile',
      label: 'Mobile Phone',
      sublabel: 'iPhone & Android Frame',
      icon: Smartphone,
      badge: '390px'
    },
    {
      id: 'tablet',
      label: 'IPAD',
      sublabel: 'iPad Pro & Tablet Canvas',
      icon: Tablet,
      badge: '834px'
    },
    {
      id: 'desktop',
      label: 'Computer',
      sublabel: 'Smart Reading Assistant',
      icon: Monitor,
      badge: 'AI COPILOT'
    }
  ];

  if (variant === 'navbar') {
    return (
      <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
        <span className="text-[10px] text-zinc-500 uppercase px-1.5 hidden md:inline">View On:</span>
        {modes.map(mode => {
          const Icon = mode.icon;
          const isActive = viewMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition text-xs font-bold ${
                isActive
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-md shadow-[#FFD700]/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
              title={`Switch view to ${mode.label} (${mode.sublabel})`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.label}</span>
              {mode.id === 'desktop' && isAssistantOpen && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // If minimized by user, render a sleek small pill that doesn't disturb the homepage
  if (isBarMinimized) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 animate-fade-in">
        <button
          onClick={() => {
            setIsBarMinimized(false);
            localStorage.setItem('baa_switcher_bar_min', 'false');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/90 border border-zinc-700 hover:border-[#FFD700] text-zinc-300 hover:text-white shadow-xl backdrop-blur-md text-xs font-mono transition"
          title="Click to expand device view selector (Phone / IPAD / PC)"
        >
          <Monitor className="w-3.5 h-3.5 text-[#00D4FF]" />
          <span>View Mode: <strong className="text-[#FFD700] uppercase">{viewMode}</strong></span>
          <ChevronRight className="w-3 h-3 text-zinc-500" />
        </button>
      </div>
    );
  }

  // Floating Bar rendered across the page
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[95%] sm:w-auto animate-fade-in">
      <div className="bg-zinc-950/95 backdrop-blur-xl border-2 border-zinc-700/80 hover:border-[#FFD700]/60 p-1.5 sm:p-2 rounded-2xl shadow-2xl shadow-black/80 flex items-center justify-between gap-1.5 sm:gap-3 transition duration-300">
        
        {/* Label */}
        <div className="hidden lg:flex items-center gap-2 pl-2 pr-1 border-r border-zinc-800 text-xs font-mono text-zinc-400">
          <Sparkles className="w-4 h-4 text-[#FFD700] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-bold text-white tracking-wider uppercase text-[10px]">
            Device View:
          </span>
        </div>

        {/* 3 Interactive Mode Buttons: Mobile Phone, IPAD, Computer Smart Reading Assistant */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-1 sm:flex-none">
          {modes.map(mode => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition font-mono ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FFD700] via-[#FFC700] to-[#E5A800] text-black shadow-lg shadow-[#FFD700]/30 scale-[1.02]'
                    : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
                title={`View site on ${mode.label} - ${mode.sublabel}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#00D4FF]'}`} />
                <span className="whitespace-nowrap">{mode.label}</span>
                {mode.id === 'desktop' && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-sans uppercase font-extrabold hidden sm:inline ${
                    isActive ? 'bg-black text-[#FFD700]' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                  }`}>
                    Assistant
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Controls based on active mode */}
        <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-2">
          {viewMode !== 'desktop' ? (
            <button
              onClick={toggleOrientation}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono transition"
              title={`Rotate to ${orientation === 'portrait' ? 'Landscape' : 'Portrait'}`}
            >
              <RotateCw className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="hidden md:inline capitalize">{orientation}</span>
            </button>
          ) : (
            <button
              onClick={toggleAssistant}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-mono font-bold transition border ${
                isAssistantOpen
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-950/50'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-[#00D4FF] border-zinc-800'
              }`}
              title="Toggle Computer Smart Reading Assistant Drawer"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">
                {isAssistantOpen ? 'Assistant Open' : 'Open Assistant'}
              </span>
              <span className="text-[10px] text-amber-400 font-bold hidden xl:inline">
                (+{readingEarningsBAA} BAA)
              </span>
            </button>
          )}

          {/* Quick Return to Desktop Button if in mobile/tablet mode */}
          {viewMode !== 'desktop' && (
            <button
              onClick={() => setViewMode('desktop')}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition"
              title="Return to standard Computer desktop view"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Minimize bar to prevent disturbing homepage */}
          <button
            onClick={() => {
              setIsBarMinimized(true);
              localStorage.setItem('baa_switcher_bar_min', 'true');
            }}
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white transition"
            title="Minimize device switcher bar (keeps homepage clear)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
