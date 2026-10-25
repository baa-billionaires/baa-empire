import React, { useState, useEffect, useRef } from 'react';
import { BAABook, BookFilmScene } from '../../types/library';
import { generateFilmScenesForBook } from '../../lib/bookVideoGenerator';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipForward,
  SkipBack,
  Maximize2,
  Minimize2,
  BookOpen,
  Music,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Clapperboard,
  Tv
} from 'lucide-react';

interface BookToVideoPlayerModalProps {
  book: BAABook;
  onClose: () => void;
  onSwitchToReader?: () => void;
}

export const BookToVideoPlayerModal: React.FC<BookToVideoPlayerModalProps> = ({
  book,
  onClose,
  onSwitchToReader
}) => {
  // Generate or load 5 cinematic film scenes for this book
  const scenes: BookFilmScene[] = React.useMemo(() => {
    return generateFilmScenesForBook(book);
  }, [book]);

  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isNarrationMuted, setIsNarrationMuted] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 100%
  const [showSceneList, setShowSceneList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [subtitleMode, setSubtitleMode] = useState<'full' | 'quote' | 'off'>('full');

  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<OscillatorNode | null>(null);
  const ambientGainRef = useRef<GainNode | null>(null);

  const activeScene = scenes[currentSceneIndex] || scenes[0];

  // Ambient Cinematic Synth Drone using Web Audio API
  useEffect(() => {
    if (!isMusicEnabled) {
      if (ambientGainRef.current) {
        ambientGainRef.current.gain.setValueAtTime(0, audioContextRef.current?.currentTime || 0);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (!ambientOscillatorRef.current) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A note (55 Hz cinematic drone)

        gain.gain.setValueAtTime(0.035, ctx.currentTime); // Gentle ambient level
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        ambientOscillatorRef.current = osc;
        ambientGainRef.current = gain;
      } else if (ambientGainRef.current) {
        ambientGainRef.current.gain.setValueAtTime(0.035, ctx.currentTime);
      }
    } catch (e) {
      console.warn('Web Audio Ambient sound not initialized:', e);
    }

    return () => {
      if (ambientGainRef.current && audioContextRef.current) {
        ambientGainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      }
    };
  }, [isMusicEnabled]);

  // Voiceover Narration via SpeechSynthesis
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    if (!isPlaying || isNarrationMuted) return;

    const textToRead = `${activeScene.title}. ${activeScene.narrativeScript}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.pitch = 0.98;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Arthur'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      // Advance to next scene if available
      if (currentSceneIndex < scenes.length - 1) {
        setCurrentSceneIndex(prev => prev + 1);
        setSceneProgress(0);
      } else {
        setIsPlaying(false);
      }
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentSceneIndex, isPlaying, isNarrationMuted, speechRate, activeScene]);

  // Scene Progress Timer
  useEffect(() => {
    if (!isPlaying) return;

    const duration = activeScene.durationSeconds * 1000;
    const intervalTime = 100;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setSceneProgress(prev => {
        if (prev >= 100) {
          if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex(idx => idx + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeScene, currentSceneIndex, scenes.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        goToNextScene();
      } else if (e.key === 'ArrowLeft') {
        goToPrevScene();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsNarrationMuted(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSceneIndex]);

  const goToNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
      setSceneProgress(0);
    }
  };

  const goToPrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
      setSceneProgress(0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.warn(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalRunTime = scenes.reduce((acc, s) => acc + s.durationSeconds, 0);
  const currentElapsed = scenes.slice(0, currentSceneIndex).reduce((acc, s) => acc + s.durationSeconds, 0) + 
    (sceneProgress / 100) * activeScene.durationSeconds;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 overflow-hidden">
      {/* CINEMATIC THEATER CONTAINER */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl sm:rounded-3xl border border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between select-none"
      >
        {/* DYNAMIC SCENE VISUAL (WITH CINEMATIC KEN BURNS MOTION) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            key={activeScene.id}
            src={activeScene.artworkUrl}
            alt={activeScene.title}
            className={`w-full h-full object-cover filter brightness-[0.55] contrast-125 transition-transform duration-[22000ms] ease-out pointer-events-none scale-100 ${
              activeScene.cameraMovement === 'zoom-in' ? 'animate-pulse scale-110' :
              activeScene.cameraMovement === 'pan-right' ? 'translate-x-3 scale-105' :
              'scale-105'
            }`}
          />
          {/* Cinematic Letterbox Gradient & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/85 pointer-events-none" />
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 mix-blend-multiply" />
        </div>

        {/* TOP FILM HEADER / STATUS BAR */}
        <div className="relative z-20 flex items-center justify-between p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#FFD700] text-black font-mono font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
              <Clapperboard className="w-3.5 h-3.5 fill-black" />
              <span>BAA CINEMATIC FILM ADAPTATION</span>
            </div>

            <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 bg-black/60 px-2.5 py-1 rounded-lg border border-zinc-800">
              Scene {currentSceneIndex + 1} of {scenes.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Switch to Online Paginated Reader */}
            {onSwitchToReader && (
              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  onSwitchToReader();
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold transition flex items-center gap-1.5"
                title="Switch back to reading manuscript"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#00D4FF]" />
                <span className="hidden md:inline">Read Book (Online)</span>
              </button>
            )}

            {/* Close Film Player */}
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                onClose();
              }}
              className="p-2 rounded-xl bg-black/60 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition"
              title="Close Film Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CENTER MOVIE EXPERIENCE: TITLE & CINEMATIC SUBTITLES */}
        <div className="relative z-20 px-6 sm:px-12 my-auto max-w-4xl mx-auto text-center space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#FFD700] font-bold">
              {book.title}
            </span>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-heading font-black text-white leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              {activeScene.title}
            </h1>
          </div>

          {/* Clean Subtitle / Teleprompter Display */}
          {subtitleMode !== 'off' && (
            <div className="bg-black/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-zinc-800 shadow-2xl max-w-3xl mx-auto space-y-2">
              <p className="text-sm sm:text-base lg:text-lg text-zinc-100 font-sans leading-relaxed tracking-wide">
                {subtitleMode === 'quote' && activeScene.keyQuote 
                  ? activeScene.keyQuote 
                  : activeScene.narrativeScript}
              </p>

              {activeScene.keyQuote && subtitleMode === 'full' && (
                <div className="pt-2 border-t border-zinc-800/80 text-xs sm:text-sm font-mono text-[#FFD700] italic">
                  {activeScene.keyQuote}
                </div>
              )}
            </div>
          )}

          {/* Author Credits Badge */}
          <div className="text-[11px] font-mono text-zinc-400">
            Conceived &amp; Authored by <strong>{book.authorName}</strong> ({book.authorAlias})
          </div>
        </div>

        {/* BOTTOM CINEMA CONTROLS BAR */}
        <div className="relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black via-black/95 to-transparent space-y-3">
          {/* Video Scrub / Progress Bar */}
          <div className="space-y-1">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="h-full bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#00D4FF] rounded-full transition-all duration-100"
                style={{ width: `${sceneProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>{formatTime(currentElapsed)}</span>
              <span className="text-[#00D4FF] font-bold">
                Scene {currentSceneIndex + 1}: {activeScene.title}
              </span>
              <span>{formatTime(totalRunTime)}</span>
            </div>
          </div>

          {/* Media Action Buttons */}
          <div className="flex items-center justify-between gap-2">
            {/* Left Controls: Prev, Play/Pause, Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevScene}
                disabled={currentSceneIndex === 0}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 transition"
                title="Previous Scene (Left Arrow)"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-black hover:brightness-110 active:scale-95 shadow-xl transition"
                title="Play / Pause (Space)"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black" />}
              </button>

              <button
                onClick={goToNextScene}
                disabled={currentSceneIndex === scenes.length - 1}
                className="p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 transition"
                title="Next Scene (Right Arrow)"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentSceneIndex(0);
                  setSceneProgress(0);
                  setIsPlaying(true);
                }}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition hidden sm:inline-flex"
                title="Replay from Scene 1"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Right Controls: Audio Narration, Music, Subtitles, Speed, Fullscreen */}
            <div className="flex items-center gap-2">
              {/* Narration Voiceover Toggle */}
              <button
                onClick={() => setIsNarrationMuted(!isNarrationMuted)}
                className={`p-2 rounded-xl border text-xs font-mono transition flex items-center gap-1.5 ${
                  isNarrationMuted 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-500' 
                    : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-bold'
                }`}
                title="Toggle Voiceover Narration (M)"
              >
                {isNarrationMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden md:inline">Voiceover</span>
              </button>

              {/* Ambient Cinematic Soundtrack Toggle */}
              <button
                onClick={() => setIsMusicEnabled(!isMusicEnabled)}
                className={`p-2 rounded-xl border text-xs font-mono transition flex items-center gap-1.5 ${
                  !isMusicEnabled 
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-500' 
                    : 'bg-[#00D4FF]/20 border-[#00D4FF]/40 text-[#00D4FF] font-bold'
                }`}
                title="Toggle Cinematic Ambient Score"
              >
                <Music className="w-4 h-4" />
                <span className="hidden md:inline">Score</span>
              </button>

              {/* Subtitles Mode */}
              <button
                onClick={() => setSubtitleMode(prev => prev === 'full' ? 'quote' : prev === 'quote' ? 'off' : 'full')}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition"
                title="Cycle Subtitles: Full, Quote, Off"
              >
                CC: {subtitleMode.toUpperCase()}
              </button>

              {/* Speed rate */}
              <button
                onClick={() => setSpeechRate(prev => prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1)}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition"
                title="Playback Speed"
              >
                {speechRate}x
              </button>

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
