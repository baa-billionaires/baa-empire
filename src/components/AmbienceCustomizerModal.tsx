import React, { useState } from 'react';
import {
  useAmbience,
  THEME_PRESETS,
  ThemePreset,
  CanvasAnimationType,
  BackgroundType
} from '../context/AmbienceContext';
import {
  Palette,
  Sparkles,
  Sliders,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Check,
  RotateCcw,
  Clock,
  Sun,
  Moon,
  Layers,
  Monitor,
  Eye,
  Tv,
  Radio,
  Zap,
  Globe2
} from 'lucide-react';

export const AmbienceCustomizerModal: React.FC = () => {
  const {
    preset,
    primaryAccent,
    secondaryAccent,
    backgroundColor,
    cardOpacity,
    backgroundType,
    canvasAnimation,
    videoOpacity,
    isVideoPlaying,
    isVideoMuted,
    isTimeBasedAmbience,
    isAutoCycle,
    cycleIntervalSeconds,
    isThemeModalOpen,
    setPreset,
    setPrimaryAccent,
    setBackgroundColor,
    setCardOpacity,
    setBackgroundType,
    setCanvasAnimation,
    setVideoOpacity,
    toggleVideoPlay,
    toggleVideoMute,
    toggleTimeBasedAmbience,
    toggleAutoCycle,
    setCycleIntervalSeconds,
    openThemeModal,
    closeThemeModal,
    openLiveClass,
    resetDefaults
  } = useAmbience();

  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'backgrounds'>('presets');

  const presetList: ThemePreset[] = [
    'deep-space-gold',
    'cyber-neon-blue',
    'emerald-quantum',
    'solar-flare-orange',
    'royal-purple',
    'minimal-dark',
    'clean-light'
  ];

  const canvasOptions: { id: CanvasAnimationType; label: string; desc: string }[] = [
    { id: 'neural', label: 'Neural Network Nodes', desc: 'Floating interconnected neural synapses & synaptic pulses' },
    { id: 'matrix', label: 'AI Code Stream', desc: 'Cascading digital data rain & compiled bytecode' },
    { id: 'particles', label: 'Cyber Particles', desc: 'Floating radiant kinetic cyber particles' },
    { id: 'grid', label: 'Data Grid (3D)', desc: 'Perspective infinite cyber grid with horizon convergence' },
    { id: 'nebula', label: 'Cosmic Nebula', desc: 'Swirling celestial cosmic dust & twinkling orbital nodes' }
  ];

  const quickColorSwatches = [
    '#FFD700', // Gold
    '#00D4FF', // Cyan
    '#10B981', // Emerald
    '#FF6B00', // Solar Orange
    '#A855F7', // Royal Purple
    '#EC4899', // Hot Pink
    '#3B82F6', // Cobalt
    '#F59E0B'  // Amber
  ];

  const currentHour = new Date().getHours();
  const timePeriod =
    currentHour >= 5 && currentHour < 8
      ? 'Dawn (Solar Flare)'
      : currentHour >= 8 && currentHour < 17
      ? 'Daylight (Cyber Blue)'
      : currentHour >= 17 && currentHour < 20
      ? 'Twilight (Royal Purple)'
      : 'Midnight (Deep Space Gold)';

  return (
    <>
      {/* Floating Toolbar Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        <button
          onClick={openThemeModal}
          className="group px-4 py-2.5 rounded-2xl bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-[#FFD700]/70 text-white font-mono text-xs flex items-center gap-2.5 shadow-2xl backdrop-blur-xl transition hover:scale-105 active:scale-95"
          title="Customize Ambience & Color Control Hub"
          style={{ borderColor: primaryAccent }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: primaryAccent, boxShadow: `0 0 10px ${primaryAccent}` }}
          />
          <Palette className="w-4 h-4 text-zinc-300 group-hover:text-white transition" />
          <span className="font-bold hidden sm:inline">Ambience &amp; Theme</span>
        </button>

        <button
          onClick={openLiveClass}
          className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-xl shadow-red-900/30 transition hover:scale-105 active:scale-95"
          title="Open Global Live Class with AI Tutors & Deans"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <Tv className="w-4 h-4" />
          <span className="hidden sm:inline">Global Live Class</span>
        </button>
      </div>

      {/* Main Ambience Customizer Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8 font-mono text-xs">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-900 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5" style={{ color: primaryAccent }} />
                  <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: primaryAccent }}>
                    THEME &amp; AESTHETIC CONTROL HUB
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                  Customize Ambience, Colors &amp; Backgrounds
                </h3>
                <p className="text-zinc-400 font-sans text-xs">
                  Configure real-time neural themes, animated Canvas flows, video loops, and glassmorphism transparency for your sovereign learning experience.
                </p>
              </div>

              <button
                onClick={closeThemeModal}
                className="text-zinc-500 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex p-1 bg-zinc-900 rounded-2xl border border-zinc-800 gap-1 text-xs">
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'presets'
                    ? 'bg-zinc-800 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: primaryAccent }} />
                <span>1-Click Presets</span>
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'colors'
                    ? 'bg-zinc-800 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" style={{ color: primaryAccent }} />
                <span>Colors &amp; Opacity</span>
              </button>
              <button
                onClick={() => setActiveTab('backgrounds')}
                className={`flex-1 py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'backgrounds'
                    ? 'bg-zinc-800 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" style={{ color: primaryAccent }} />
                <span>Animated Canvas &amp; Video</span>
              </button>
            </div>

            {/* TAB 1: ONE-CLICK PRESETS */}
            {activeTab === 'presets' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {presetList.map((pKey) => {
                    const cfg = THEME_PRESETS[pKey];
                    const isSelected = preset === pKey;

                    return (
                      <div
                        key={pKey}
                        onClick={() => setPreset(pKey)}
                        className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between space-y-3 relative group ${
                          isSelected
                            ? 'bg-zinc-900 border-2'
                            : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                        }`}
                        style={{ borderColor: isSelected ? cfg.primaryAccent : undefined }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-xs">{cfg.name}</span>
                          {isSelected && (
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-black"
                              style={{ backgroundColor: cfg.primaryAccent }}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        {/* Color swatches preview */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-5 h-5 rounded-lg border border-black/40 shadow-sm"
                            style={{ backgroundColor: cfg.primaryAccent }}
                            title="Primary Accent"
                          />
                          <span
                            className="w-5 h-5 rounded-lg border border-black/40 shadow-sm"
                            style={{ backgroundColor: cfg.secondaryAccent }}
                            title="Secondary Accent"
                          />
                          <span
                            className="w-5 h-5 rounded-lg border border-zinc-700 shadow-sm"
                            style={{ backgroundColor: cfg.backgroundColor }}
                            title="Background Color"
                          />
                        </div>

                        <p className="text-[10px] text-zinc-400 line-clamp-2 font-sans">
                          {cfg.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Time-Based Dynamic Ambience & Auto-Cycle Controls */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FFD700]" />
                        <span className="font-bold text-white">Time-Based Circadian Ambience</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 font-sans">
                        Automatically shifts themes according to your real-world local solar time ({timePeriod}).
                      </p>
                    </div>

                    <button
                      onClick={toggleTimeBasedAmbience}
                      className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
                        isTimeBasedAmbience
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>{isTimeBasedAmbience ? 'Active (Auto-Syncing)' : 'Enable Solar Sync'}</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#00D4FF]" />
                        <span className="font-bold text-white">Auto-Cycle Theme Timer</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 font-sans">
                        Automatically rotates through all sovereign themes on a repeating timer.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={cycleIntervalSeconds}
                        onChange={(e) => setCycleIntervalSeconds(Number(e.target.value))}
                        disabled={!isAutoCycle}
                        className="px-2.5 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-white disabled:opacity-50"
                      >
                        <option value={30}>Every 30s</option>
                        <option value={60}>Every 1 min</option>
                        <option value={300}>Every 5 min</option>
                      </select>

                      <button
                        onClick={toggleAutoCycle}
                        className={`px-4 py-2 rounded-xl font-bold transition ${
                          isAutoCycle
                            ? 'bg-[#00D4FF] text-black shadow-lg shadow-cyan-500/20'
                            : 'bg-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span>{isAutoCycle ? 'Cycling On' : 'Start Cycle'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CUSTOM COLOR PALETTE & GLASSMORPHISM */}
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Primary Accent Picker */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                    <span className="text-zinc-300 font-bold block uppercase text-[10px]">
                      PRIMARY ACCENT COLOR
                    </span>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={primaryAccent}
                        onChange={(e) => setPrimaryAccent(e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input
                        type="text"
                        value={primaryAccent}
                        onChange={(e) => setPrimaryAccent(e.target.value)}
                        className="w-32 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-mono text-xs uppercase"
                      />
                    </div>

                    {/* Quick Swatches */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {quickColorSwatches.map((color) => (
                        <button
                          key={color}
                          onClick={() => setPrimaryAccent(color)}
                          className="w-7 h-7 rounded-lg border border-white/20 transition hover:scale-110 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Background Color Picker */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                    <span className="text-zinc-300 font-bold block uppercase text-[10px]">
                      CANVAS BACKGROUND COLOR
                    </span>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-32 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-mono text-xs uppercase"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {['#050505', '#030712', '#02120b', '#0d0502', '#090314', '#09090b', '#F8FAFC'].map(
                        (bg) => (
                          <button
                            key={bg}
                            onClick={() => setBackgroundColor(bg)}
                            className="w-7 h-7 rounded-lg border border-zinc-700 transition hover:scale-110 shadow-sm"
                            style={{ backgroundColor: bg }}
                            title={bg}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Glassmorphism Opacity Slider */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        Card Glassmorphism Opacity ({Math.round(cardOpacity * 100)}%)
                      </span>
                      <p className="text-[11px] text-zinc-400 font-sans">
                        Fine-tune dashboard card transparency to balance cyber background visibility with crisp typography.
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-white font-bold">
                      {cardOpacity.toFixed(2)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.30"
                    max="1.0"
                    step="0.05"
                    value={cardOpacity}
                    onChange={(e) => setCardOpacity(Number(e.target.value))}
                    className="w-full accent-[#FFD700] cursor-pointer"
                  />

                  {/* Live Glassmorphism Preview Card */}
                  <div
                    className="p-4 rounded-xl border border-zinc-800 backdrop-blur-md transition space-y-1"
                    style={{
                      backgroundColor: `rgba(18, 18, 24, ${cardOpacity})`,
                      borderColor: primaryAccent
                    }}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: primaryAccent }}>
                      LIVE READABILITY PREVIEW
                    </span>
                    <h5 className="text-white font-bold text-sm">
                      Billionaires AI Academy Sovereign Architecture
                    </h5>
                    <p className="text-zinc-300 text-xs font-sans">
                      This sample card demonstrates your chosen glassmorphism opacity against active animated background layers.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ANIMATED CANVAS & VIDEO BACKGROUNDS */}
            {activeTab === 'backgrounds' && (
              <div className="space-y-6">
                {/* Background Engine Selector */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <span className="text-zinc-300 font-bold block uppercase text-[10px]">
                    BACKGROUND ENGINE TYPE
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'canvas' as BackgroundType, label: 'Interactive Canvas' },
                      { id: 'video' as BackgroundType, label: 'Synthetic Video' },
                      { id: 'mesh' as BackgroundType, label: 'Cyber Mesh' },
                      { id: 'none' as BackgroundType, label: 'Solid Solid' }
                    ].map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBackgroundType(b.id)}
                        className={`p-3 rounded-xl font-bold transition text-center ${
                          backgroundType === b.id
                            ? 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-black shadow-md'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Canvas Animation Modes */}
                {backgroundType === 'canvas' && (
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                    <span className="text-zinc-300 font-bold block uppercase text-[10px]">
                      SELECT CANVAS ANIMATION
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {canvasOptions.map((c) => {
                        const isCurrent = canvasAnimation === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setCanvasAnimation(c.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition space-y-1 ${
                              isCurrent
                                ? 'bg-zinc-900 border-2'
                                : 'bg-black/50 border-zinc-800 hover:border-zinc-700'
                            }`}
                            style={{ borderColor: isCurrent ? primaryAccent : undefined }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-xs">{c.label}</span>
                              {isCurrent && <Check className="w-3.5 h-3.5" style={{ color: primaryAccent }} />}
                            </div>
                            <p className="text-[10px] text-zinc-400 font-sans">{c.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Video Loop Controls */}
                {backgroundType === 'video' && (
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-300 font-bold block uppercase text-[10px]">
                        SYNTHETIC HOLOGRAPHIC VIDEO CONTROLS
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleVideoPlay}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1.5 font-bold"
                        >
                          {isVideoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isVideoPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        <button
                          onClick={toggleVideoMute}
                          className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-1.5 font-bold"
                        >
                          {isVideoMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                          <span>{isVideoMuted ? 'Muted' : 'Sound'}</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
                        <span>Video Loop Opacity:</span>
                        <span className="text-white font-bold">{Math.round(videoOpacity * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.45"
                        step="0.02"
                        value={videoOpacity}
                        onChange={(e) => setVideoOpacity(Number(e.target.value))}
                        className="w-full accent-[#00D4FF] cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={resetDefaults}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold flex items-center gap-2 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <button
                onClick={closeThemeModal}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:brightness-110 text-black font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#FFD700]/20"
              >
                Apply &amp; Save Aesthetics
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AmbienceCustomizerModal;
