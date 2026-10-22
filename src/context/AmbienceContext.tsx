import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemePreset =
  | 'cyber-neon-blue'
  | 'deep-space-gold'
  | 'emerald-quantum'
  | 'solar-flare-orange'
  | 'royal-purple'
  | 'minimal-dark'
  | 'clean-light'
  | 'custom';

export type CanvasAnimationType =
  | 'neural'
  | 'matrix'
  | 'particles'
  | 'grid'
  | 'nebula';

export type BackgroundType = 'canvas' | 'video' | 'mesh' | 'none';

export type VideoLoopType = 'cyber-nexus' | 'ai-core' | 'quantum-waves';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  description: string;
  primaryAccent: string;
  secondaryAccent: string;
  accentGlow: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  isLight: boolean;
  recommendedCanvas: CanvasAnimationType;
}

export const THEME_PRESETS: Record<ThemePreset, ThemeConfig> = {
  'deep-space-gold': {
    id: 'deep-space-gold',
    name: 'Deep Space Gold',
    description: 'Iconic sovereign luxury with 24k gold neural accents and obsidian deep space',
    primaryAccent: '#FFD700',
    secondaryAccent: '#FFA500',
    accentGlow: 'rgba(255, 215, 0, 0.4)',
    backgroundColor: '#050505',
    cardBackground: 'rgba(15, 15, 18, 0.85)',
    textColor: '#F8FAFC',
    isLight: false,
    recommendedCanvas: 'neural'
  },
  'cyber-neon-blue': {
    id: 'cyber-neon-blue',
    name: 'Cyber Neon Blue',
    description: 'High-bandwidth quantum optics and holographic sovereign African data centers',
    primaryAccent: '#00D4FF',
    secondaryAccent: '#0066FF',
    accentGlow: 'rgba(0, 212, 255, 0.45)',
    backgroundColor: '#030712',
    cardBackground: 'rgba(10, 16, 30, 0.85)',
    textColor: '#F0F9FF',
    isLight: false,
    recommendedCanvas: 'neural'
  },
  'emerald-quantum': {
    id: 'emerald-quantum',
    name: 'Emerald Quantum',
    description: 'Zero-emission green hydro compute clusters and decentralized wealth protocols',
    primaryAccent: '#10B981',
    secondaryAccent: '#059669',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: '#02120b',
    cardBackground: 'rgba(6, 26, 18, 0.85)',
    textColor: '#ECFDF5',
    isLight: false,
    recommendedCanvas: 'matrix'
  },
  'solar-flare-orange': {
    id: 'solar-flare-orange',
    name: 'Solar Flare Orange',
    description: 'Sahara solar power generation and high-yield energetic decentralized mining',
    primaryAccent: '#FF6B00',
    secondaryAccent: '#FF3D00',
    accentGlow: 'rgba(255, 107, 0, 0.4)',
    backgroundColor: '#0d0502',
    cardBackground: 'rgba(24, 10, 5, 0.85)',
    textColor: '#FFF7ED',
    isLight: false,
    recommendedCanvas: 'particles'
  },
  'royal-purple': {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Imperial African monarchic sovereign dignity and high-altitude neural intelligence',
    primaryAccent: '#A855F7',
    secondaryAccent: '#7C3AED',
    accentGlow: 'rgba(168, 85, 247, 0.4)',
    backgroundColor: '#090314',
    cardBackground: 'rgba(20, 8, 32, 0.85)',
    textColor: '#FAF5FF',
    isLight: false,
    recommendedCanvas: 'nebula'
  },
  'minimal-dark': {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Sleek, distraction-free monochrome engineering aesthetic with cyan focal points',
    primaryAccent: '#E2E8F0',
    secondaryAccent: '#94A3B8',
    accentGlow: 'rgba(226, 232, 240, 0.3)',
    backgroundColor: '#09090b',
    cardBackground: 'rgba(18, 18, 22, 0.9)',
    textColor: '#F8FAFC',
    isLight: false,
    recommendedCanvas: 'grid'
  },
  'clean-light': {
    id: 'clean-light',
    name: 'Clean Light',
    description: 'High-contrast executive daytime presentation with pristine ivory and royal cobalt',
    primaryAccent: '#2563EB',
    secondaryAccent: '#1D4ED8',
    accentGlow: 'rgba(37, 99, 235, 0.25)',
    backgroundColor: '#F8FAFC',
    cardBackground: 'rgba(255, 255, 255, 0.92)',
    textColor: '#0F172A',
    isLight: true,
    recommendedCanvas: 'grid'
  },
  'custom': {
    id: 'custom',
    name: 'Custom Signature',
    description: 'User-configured custom accent and background palette tailored to your taste',
    primaryAccent: '#FFD700',
    secondaryAccent: '#00D4FF',
    accentGlow: 'rgba(255, 215, 0, 0.4)',
    backgroundColor: '#050505',
    cardBackground: 'rgba(15, 15, 18, 0.85)',
    textColor: '#F8FAFC',
    isLight: false,
    recommendedCanvas: 'neural'
  }
};

interface AmbienceContextType {
  preset: ThemePreset;
  currentConfig: ThemeConfig;
  primaryAccent: string;
  secondaryAccent: string;
  backgroundColor: string;
  cardOpacity: number;
  backgroundType: BackgroundType;
  canvasAnimation: CanvasAnimationType;
  videoLoopId: VideoLoopType;
  videoOpacity: number;
  isVideoPlaying: boolean;
  isVideoMuted: boolean;
  isTimeBasedAmbience: boolean;
  isAutoCycle: boolean;
  cycleIntervalSeconds: number;
  isThemeModalOpen: boolean;
  isLiveClassOpen: boolean;

  // Actions
  setPreset: (preset: ThemePreset) => void;
  setPrimaryAccent: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setCardOpacity: (opacity: number) => void;
  setBackgroundType: (type: BackgroundType) => void;
  setCanvasAnimation: (anim: CanvasAnimationType) => void;
  setVideoLoopId: (loop: VideoLoopType) => void;
  setVideoOpacity: (opacity: number) => void;
  toggleVideoPlay: () => void;
  toggleVideoMute: () => void;
  toggleTimeBasedAmbience: () => void;
  toggleAutoCycle: () => void;
  setCycleIntervalSeconds: (seconds: number) => void;
  openThemeModal: () => void;
  closeThemeModal: () => void;
  openLiveClass: () => void;
  closeLiveClass: () => void;
  resetDefaults: () => void;
}

const AmbienceContext = createContext<AmbienceContextType | undefined>(undefined);

export const AmbienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved settings from localStorage
  const savedSettings = (() => {
    try {
      const item = localStorage.getItem('baa_ambience_settings');
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  })();

  const [preset, setPresetState] = useState<ThemePreset>(savedSettings?.preset || 'deep-space-gold');
  const [primaryAccent, setPrimaryAccentState] = useState<string>(
    savedSettings?.primaryAccent || THEME_PRESETS['deep-space-gold'].primaryAccent
  );
  const [secondaryAccent, setSecondaryAccent] = useState<string>(
    savedSettings?.secondaryAccent || THEME_PRESETS['deep-space-gold'].secondaryAccent
  );
  const [backgroundColor, setBackgroundColorState] = useState<string>(
    savedSettings?.backgroundColor || THEME_PRESETS['deep-space-gold'].backgroundColor
  );
  const [cardOpacity, setCardOpacity] = useState<number>(savedSettings?.cardOpacity ?? 0.85);

  const [backgroundType, setBackgroundType] = useState<BackgroundType>(
    savedSettings?.backgroundType || 'canvas'
  );
  const [canvasAnimation, setCanvasAnimation] = useState<CanvasAnimationType>(
    savedSettings?.canvasAnimation || 'neural'
  );
  const [videoLoopId, setVideoLoopId] = useState<VideoLoopType>(
    savedSettings?.videoLoopId || 'cyber-nexus'
  );
  const [videoOpacity, setVideoOpacity] = useState<number>(savedSettings?.videoOpacity ?? 0.15);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(savedSettings?.isVideoPlaying ?? true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(savedSettings?.isVideoMuted ?? true);

  const [isTimeBasedAmbience, setIsTimeBasedAmbience] = useState<boolean>(
    savedSettings?.isTimeBasedAmbience ?? false
  );
  const [isAutoCycle, setIsAutoCycle] = useState<boolean>(savedSettings?.isAutoCycle ?? false);
  const [cycleIntervalSeconds, setCycleIntervalSeconds] = useState<number>(
    savedSettings?.cycleIntervalSeconds || 60
  );

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isLiveClassOpen, setIsLiveClassOpen] = useState(false);

  // Derive active configuration
  const currentConfig: ThemeConfig = {
    ...THEME_PRESETS[preset],
    primaryAccent,
    secondaryAccent,
    backgroundColor
  };

  // Helper to apply preset
  const setPreset = (newPreset: ThemePreset) => {
    setPresetState(newPreset);
    if (newPreset !== 'custom') {
      const cfg = THEME_PRESETS[newPreset];
      setPrimaryAccentState(cfg.primaryAccent);
      setSecondaryAccent(cfg.secondaryAccent);
      setBackgroundColorState(cfg.backgroundColor);
      setCanvasAnimation(cfg.recommendedCanvas);
    }
  };

  const setPrimaryAccent = (color: string) => {
    setPrimaryAccentState(color);
    setPresetState('custom');
  };

  const setBackgroundColor = (color: string) => {
    setBackgroundColorState(color);
    setPresetState('custom');
  };

  const toggleVideoPlay = () => setIsVideoPlaying((prev) => !prev);
  const toggleVideoMute = () => setIsVideoMuted((prev) => !prev);
  const toggleTimeBasedAmbience = () => setIsTimeBasedAmbience((prev) => !prev);
  const toggleAutoCycle = () => setIsAutoCycle((prev) => !prev);

  const openThemeModal = () => setIsThemeModalOpen(true);
  const closeThemeModal = () => setIsThemeModalOpen(false);
  const openLiveClass = () => setIsLiveClassOpen(true);
  const closeLiveClass = () => setIsLiveClassOpen(false);

  const resetDefaults = () => {
    setPreset('deep-space-gold');
    setBackgroundType('canvas');
    setCanvasAnimation('neural');
    setCardOpacity(0.85);
    setVideoOpacity(0.15);
    setIsVideoPlaying(true);
    setIsVideoMuted(true);
    setIsTimeBasedAmbience(false);
    setIsAutoCycle(false);
  };

  // Time-based Ambience evaluation
  useEffect(() => {
    if (!isTimeBasedAmbience) return;

    const evaluateTimeAmbience = () => {
      const hour = new Date().getHours();
      // 5am - 8am: Dawn (Solar Flare)
      if (hour >= 5 && hour < 8) {
        setPreset('solar-flare-orange');
      }
      // 8am - 5pm: Daylight (Cyber Neon Blue or Clean Light)
      else if (hour >= 8 && hour < 17) {
        setPreset('cyber-neon-blue');
      }
      // 5pm - 8pm: Twilight (Royal Purple / Emerald)
      else if (hour >= 17 && hour < 20) {
        setPreset('royal-purple');
      }
      // 8pm - 5am: Midnight (Deep Space Gold)
      else {
        setPreset('deep-space-gold');
      }
    };

    evaluateTimeAmbience();
    const interval = setInterval(evaluateTimeAmbience, 60000);
    return () => clearInterval(interval);
  }, [isTimeBasedAmbience]);

  // Auto-Cycle Timer
  useEffect(() => {
    if (!isAutoCycle || isTimeBasedAmbience) return;

    const cyclePresets: ThemePreset[] = [
      'deep-space-gold',
      'cyber-neon-blue',
      'emerald-quantum',
      'solar-flare-orange',
      'royal-purple',
      'minimal-dark'
    ];

    let currentIndex = cyclePresets.indexOf(preset);
    if (currentIndex === -1) currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % cyclePresets.length;
      setPreset(cyclePresets[currentIndex]);
    }, cycleIntervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [isAutoCycle, isTimeBasedAmbience, cycleIntervalSeconds, preset]);

  // Inject CSS Variables into Document Root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-accent', primaryAccent);
    root.style.setProperty('--secondary-accent', secondaryAccent);
    root.style.setProperty('--bg-color', backgroundColor);
    root.style.setProperty('--card-opacity', String(cardOpacity));
    root.style.setProperty(
      '--accent-glow',
      primaryAccent.startsWith('#')
        ? `${primaryAccent}4D`
        : 'rgba(255, 215, 0, 0.3)'
    );

    // Save to localStorage
    try {
      localStorage.setItem(
        'baa_ambience_settings',
        JSON.stringify({
          preset,
          primaryAccent,
          secondaryAccent,
          backgroundColor,
          cardOpacity,
          backgroundType,
          canvasAnimation,
          videoLoopId,
          videoOpacity,
          isVideoPlaying,
          isVideoMuted,
          isTimeBasedAmbience,
          isAutoCycle,
          cycleIntervalSeconds
        })
      );
    } catch {
      // Storage unavailable or blocked
    }
  }, [
    preset,
    primaryAccent,
    secondaryAccent,
    backgroundColor,
    cardOpacity,
    backgroundType,
    canvasAnimation,
    videoLoopId,
    videoOpacity,
    isVideoPlaying,
    isVideoMuted,
    isTimeBasedAmbience,
    isAutoCycle,
    cycleIntervalSeconds
  ]);

  return (
    <AmbienceContext.Provider
      value={{
        preset,
        currentConfig,
        primaryAccent,
        secondaryAccent,
        backgroundColor,
        cardOpacity,
        backgroundType,
        canvasAnimation,
        videoLoopId,
        videoOpacity,
        isVideoPlaying,
        isVideoMuted,
        isTimeBasedAmbience,
        isAutoCycle,
        cycleIntervalSeconds,
        isThemeModalOpen,
        isLiveClassOpen,
        setPreset,
        setPrimaryAccent,
        setBackgroundColor,
        setCardOpacity,
        setBackgroundType,
        setCanvasAnimation,
        setVideoLoopId,
        setVideoOpacity,
        toggleVideoPlay,
        toggleVideoMute,
        toggleTimeBasedAmbience,
        toggleAutoCycle,
        setCycleIntervalSeconds,
        openThemeModal,
        closeThemeModal,
        openLiveClass,
        closeLiveClass,
        resetDefaults
      }}
    >
      <div
        style={{
          backgroundColor,
          color: currentConfig.textColor,
          minHeight: '100vh',
          transition: 'background-color 0.4s ease, color 0.3s ease'
        }}
      >
        {children}
      </div>
    </AmbienceContext.Provider>
  );
};

export const useAmbience = (): AmbienceContextType => {
  const context = useContext(AmbienceContext);
  if (!context) {
    throw new Error('useAmbience must be used within an AmbienceProvider');
  }
  return context;
};
