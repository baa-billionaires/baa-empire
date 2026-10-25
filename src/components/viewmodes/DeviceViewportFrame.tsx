import React from 'react';
import { useViewMode, ViewMode } from '../../context/ViewModeContext';
import {
  Smartphone,
  Tablet,
  Monitor,
  RotateCw,
  ZoomIn,
  ZoomOut,
  X,
  ExternalLink,
  Wifi,
  Battery,
  Signal,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface DeviceViewportFrameProps {
  children: React.ReactNode;
}

export const DeviceViewportFrame: React.FC<DeviceViewportFrameProps> = ({ children }) => {
  const {
    viewMode,
    setViewMode,
    orientation,
    toggleOrientation,
    scale,
    setScale,
    readingEarningsBAA
  } = useViewMode();

  // If in desktop mode, render standard responsive layout without simulator wrapper
  if (viewMode === 'desktop') {
    return <>{children}</>;
  }

  const isMobile = viewMode === 'mobile';
  const isLandscape = orientation === 'landscape';

  // Device dimensions
  let frameWidth = '393px'; // iPhone 16 Pro portrait
  let frameHeight = '852px';

  if (isMobile) {
    if (isLandscape) {
      frameWidth = '852px';
      frameHeight = '420px';
    } else {
      frameWidth = '393px';
      frameHeight = '840px';
    }
  } else {
    // iPad
    if (isLandscape) {
      frameWidth = '1180px';
      frameHeight = '820px';
    } else {
      frameWidth = '834px';
      frameHeight = '960px';
    }
  }

  const scaleValues = [
    { label: '100%', val: 1 },
    { label: '90%', val: 0.9 },
    { label: '80%', val: 0.8 },
    { label: '70%', val: 0.7 }
  ];

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-start text-white selection:bg-[#FFD700] selection:text-black">
      
      {/* Top Device Simulator Control Bar */}
      <div className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 font-mono text-xs shadow-2xl">
        
        {/* Left: Device Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-zinc-800">
          <span className="text-[10px] text-zinc-500 uppercase px-2 font-bold hidden sm:inline">
            Active Simulator:
          </span>

          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
              viewMode === 'mobile'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Phone</span>
          </button>

          <button
            onClick={() => setViewMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
              viewMode === 'tablet'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>IPAD</span>
          </button>

          <button
            onClick={() => setViewMode('desktop')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            title="Switch to Computer Full View + Smart Reading Assistant"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Computer Assistant</span>
          </button>
        </div>

        {/* Center: Orientation, Scale, and Address */}
        <div className="flex items-center gap-2">
          {/* Rotate Orientation Button */}
          <button
            onClick={toggleOrientation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition"
            title={`Rotate device to ${isLandscape ? 'Portrait' : 'Landscape'}`}
          >
            <RotateCw className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span className="capitalize">{orientation}</span>
          </button>

          {/* Scale Selector */}
          <div className="hidden md:flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-zinc-800">
            {scaleValues.map(s => (
              <button
                key={s.label}
                onClick={() => setScale(s.val)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                  scale === s.val ? 'bg-zinc-800 text-[#FFD700]' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Device Dimension Info */}
          <div className="hidden lg:block text-[11px] text-zinc-400 bg-zinc-900/60 px-2.5 py-1.5 rounded-xl border border-zinc-800">
            {isMobile ? 'iPhone 16 Pro' : 'iPad Pro 11"'} ({frameWidth} × {frameHeight})
          </div>
        </div>

        {/* Right: Exit to Fullscreen Computer */}
        <div className="flex items-center gap-2">
          <div className="text-[10px] text-amber-400 hidden xl:flex items-center gap-1 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/30">
            <Sparkles className="w-3 h-3" />
            <span>Mining Yield: +{readingEarningsBAA} BAA</span>
          </div>

          <button
            onClick={() => setViewMode('desktop')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition border border-zinc-700 shadow"
            title="Exit Simulator and return to Full Computer Desktop View"
          >
            <X className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline">Exit Simulator</span>
          </button>
        </div>
      </div>

      {/* Outer Studio Testing Environment */}
      <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-x-auto">
        
        {/* Hardware Device Chassis Frame */}
        <div
          className="transition-all duration-300 relative shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[10px] sm:border-[14px] border-zinc-800 rounded-[48px] sm:rounded-[56px] bg-black overflow-hidden ring-1 ring-zinc-700 flex flex-col"
          style={{
            width: frameWidth,
            height: `min(${frameHeight}, 88vh)`,
            transform: `scale(${scale})`,
            transformOrigin: 'top center'
          }}
        >
          {/* Top Notch / Dynamic Island / Status Bar */}
          <div className="w-full bg-black shrink-0 px-6 pt-3 pb-2 flex items-center justify-between text-[11px] font-mono text-zinc-300 select-none z-30 border-b border-zinc-900">
            
            {/* Left: Clock */}
            <div className="font-bold tracking-tight">9:41</div>

            {/* Center: Dynamic Island (Mobile) or Camera Bezel (iPad) */}
            {isMobile ? (
              <div className="w-24 h-5 bg-zinc-900 rounded-full flex items-center justify-end px-2.5 gap-1.5 shadow-inner border border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-blue-500/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70" />
              </div>
            )}

            {/* Right: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          {/* Inner Scrollable Screen Canvas */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative bg-black no-scrollbar overscroll-contain">
            {children}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-full bg-black py-2 flex justify-center shrink-0 border-t border-zinc-900 select-none">
            <div className="w-32 h-1 bg-zinc-600 rounded-full" />
          </div>
        </div>

      </div>

    </div>
  );
};
