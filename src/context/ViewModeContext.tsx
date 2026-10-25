import React, { createContext, useContext, useState, useEffect } from 'react';
import { BAABook } from '../types/library';
import { FLAGSHIP_BOOK, BAA_STORY_BOOKS } from '../lib/baaLibraryData';

export type ViewMode = 'desktop' | 'mobile' | 'tablet';
export type DeviceOrientation = 'portrait' | 'landscape';
export type AssistantTab = 'ai' | 'speed' | 'audio' | 'mining' | 'notes';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  orientation: DeviceOrientation;
  setOrientation: (orientation: DeviceOrientation) => void;
  toggleOrientation: () => void;
  scale: number;
  setScale: (scale: number) => void;
  // Computer Smart Reading Assistant state
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  toggleAssistant: () => void;
  assistantTab: AssistantTab;
  setAssistantTab: (tab: AssistantTab) => void;
  selectedBook: BAABook;
  setSelectedBook: (book: BAABook) => void;
  // Reading & Mining stats
  readingSeconds: number;
  readingEarningsBAA: number;
  autoScrollSpeed: number; // 0 = off, 1 = slow, 2 = normal, 3 = fast
  setAutoScrollSpeed: (speed: number) => void;
  // Speed Reader state
  speedWpm: number;
  setSpeedWpm: (wpm: number) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('baa_view_mode') as ViewMode;
    return saved === 'mobile' || saved === 'tablet' || saved === 'desktop' ? saved : 'desktop';
  });

  const [orientation, setOrientation] = useState<DeviceOrientation>('portrait');
  const [scale, setScale] = useState<number>(1);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantTab, setAssistantTab] = useState<AssistantTab>('ai');
  const [selectedBook, setSelectedBook] = useState<BAABook>(FLAGSHIP_BOOK);
  const [readingSeconds, setReadingSeconds] = useState<number>(0);
  const [readingEarningsBAA, setReadingEarningsBAA] = useState<number>(1.25);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState<number>(0);
  const [speedWpm, setSpeedWpm] = useState<number>(300);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem('baa_view_mode', mode);
    // If user switches to desktop, automatically open or suggest smart reading assistant
    if (mode === 'desktop') {
      setIsAssistantOpen(true);
    }
  };

  const toggleOrientation = () => {
    setOrientation(prev => (prev === 'portrait' ? 'landscape' : 'portrait'));
  };

  const toggleAssistant = () => {
    setIsAssistantOpen(prev => !prev);
  };

  // Reading Timer & Earnings Pulse (awards BaaCoins while user reads in computer assistant or active site)
  useEffect(() => {
    const interval = setInterval(() => {
      setReadingSeconds(prev => {
        const next = prev + 1;
        // Every 30 seconds of smart reading adds 0.025 BAA to Earnings Pulse
        if (next % 30 === 0) {
          setReadingEarningsBAA(e => +(e + 0.025).toFixed(3));
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ViewModeContext.Provider
      value={{
        viewMode,
        setViewMode,
        orientation,
        setOrientation,
        toggleOrientation,
        scale,
        setScale,
        isAssistantOpen,
        setIsAssistantOpen,
        toggleAssistant,
        assistantTab,
        setAssistantTab,
        selectedBook,
        setSelectedBook,
        readingSeconds,
        readingEarningsBAA,
        autoScrollSpeed,
        setAutoScrollSpeed,
        speedWpm,
        setSpeedWpm
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};
