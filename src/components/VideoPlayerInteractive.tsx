import React, { useState, useRef, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Coins,
  Bot,
  CheckCircle,
  HelpCircle,
  FileText,
  Sparkles,
  Send,
  Zap,
  Check,
  ChevronRight
} from 'lucide-react';

interface VideoPlayerInteractiveProps {
  videoUrl?: string;
  courseId: string;
  courseTitle: string;
  moduleIndex?: number;
  onMilestonePassed?: () => void;
}

export const VideoPlayerInteractive: React.FC<VideoPlayerInteractiveProps> = ({
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  courseId,
  courseTitle,
  moduleIndex = 0,
  onMilestonePassed
}) => {
  const { recordInteraction } = useEcosystem();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isMuted, setIsMuted] = useState(false);

  // Overlay Quiz Checkpoint state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScoreEarned, setQuizScoreEarned] = useState(false);

  // Notes state (saved to interactions.prompt_data)
  const [studentNotes, setStudentNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);

  // Docked AI Tutor State
  const [dockedQuery, setDockedQuery] = useState('');
  const [dockedChat, setDockedChat] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: `Welcome to "${courseTitle}" interactive player. Watch the lecture, take notes, and complete the video checkpoint to mine BaaCoin.` }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Quiz details
  const quiz = {
    checkpointTime: 25, // Checkpoint timestamp in seconds (easy to reach)
    question: "How does the BaaCoin 10x Networth system protect your education capital?",
    options: [
      "By charging additional hidden fees",
      "By depositing 10x course price as locked BaaCoin collateral, unlocking 20% on graduation",
      "By converting tuition into paper certificates only",
      "By deferring all access until 2030"
    ],
    correctIndex: 1,
    reward: 5 // +5 BaaCoin
  };

  const transcript = [
    { start: 0, text: "Welcome scholars to this autonomous lecture." },
    { start: 10, text: "We are analyzing how tokenized incentives accelerate learning speed." },
    { start: 20, text: "Your interaction ticks mine live BaaCoin straight to your networth." },
    { start: 40, text: "Next, our prompt architecture converts your research into 60/40 marketplace assets." }
  ];

  // Video time tracking and Learn-to-Mine ticks
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      // Trigger quiz overlay when hitting checkpoint
      if (!quizAnswered && video.currentTime >= quiz.checkpointTime && video.currentTime <= quiz.checkpointTime + 2) {
        video.pause();
        setIsPlaying(false);
        setShowQuiz(true);
      }
    };

    const handleLoadedMetadata = () => {
      if (video.duration) setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [quizAnswered, quiz.checkpointTime]);

  // Learn to mine tick while video is playing
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        recordInteraction({
          courseId,
          type: 'video_watch',
          promptData: `Watched lecture minute on "${courseTitle}"`
        });
      }, 10000); // 10s tick = 0.5 BaaCoin
    }
    return () => clearInterval(interval);
  }, [isPlaying, courseId, courseTitle, recordInteraction]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedOption(index);
    if (index === quiz.correctIndex) {
      setQuizScoreEarned(true);
      setQuizAnswered(true);
      recordInteraction({
        courseId,
        type: 'assignment_complete',
        promptData: `Answered video quiz: ${quiz.question}`,
        customReward: { xp: 15, baacoin: quiz.reward }
      });
      setTimeout(() => {
        setShowQuiz(false);
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
        if (onMilestonePassed) onMilestonePassed();
      }, 1200);
    }
  };

  const handleSaveNotes = () => {
    if (!studentNotes.trim()) return;
    recordInteraction({
      courseId,
      type: 'research_submit',
      promptData: `STUDENT VIDEO NOTES [${courseTitle}]:\n${studentNotes}`
    });
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleSendDockedChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dockedQuery.trim() || isAiThinking) return;

    const userQ = dockedQuery;
    setDockedChat(prev => [...prev, { sender: 'user', text: userQ }]);
    setDockedQuery('');
    setIsAiThinking(true);

    setTimeout(() => {
      setDockedChat(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `[AI TUTOR]: Analyzing frame @ ${Math.floor(currentTime)}s. For "${userQ}", integrate the deterministic state hooks shown on screen to maximize 60/40 prompt royalties.`
        }
      ]);
      setIsAiThinking(false);
      recordInteraction({
        courseId,
        type: 'ai_tutor_query',
        promptData: `Q: ${userQ} during video @ ${Math.floor(currentTime)}s`
      });
    }, 600);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
      {/* Video & Controls Area (Left 8 Cols) */}
      <div className="flex-1 flex flex-col bg-black">
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            playsInline
            onClick={togglePlay}
          />

          {/* Overlay Quiz at Checkpoint */}
          {showQuiz && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-6 flex flex-col items-center justify-center z-30">
              <div className="w-full max-w-lg bg-zinc-900 border border-[#FFD700] p-6 rounded-2xl shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700] font-bold">
                    <HelpCircle className="w-4 h-4" />
                    <span>INTERACTIVE VIDEO QUIZ CHECKPOINT</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    +{quiz.reward} BAACOIN
                  </span>
                </div>

                <h4 className="text-sm font-heading font-bold text-white">
                  {quiz.question}
                </h4>

                <div className="space-y-2">
                  {quiz.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(i)}
                      className={`w-full p-3 rounded-xl text-left text-xs transition border flex items-center justify-between ${
                        selectedOption === i
                          ? i === quiz.correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-red-950 border-red-500 text-red-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-[#FFD700]'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedOption === i && i === quiz.correctIndex && (
                        <Check className="w-4 h-4 text-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>

                {quizScoreEarned && (
                  <div className="text-center text-xs font-mono text-emerald-400 font-bold animate-pulse">
                    ✓ Correct! +{quiz.reward} BaaCoin credited. Resuming lecture...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Center Play Button Overlay when paused */}
          {!isPlaying && !showQuiz && (
            <button
              onClick={togglePlay}
              className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition"
            >
              <Play className="w-7 h-7 fill-black translate-x-0.5" />
            </button>
          )}

          {/* Live Learn-to-Mine Indicator */}
          {isPlaying && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/50 text-[10px] font-mono text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>MINING +0.5 BAACOIN / MIN</span>
            </div>
          )}
        </div>

        {/* Video Control Bar */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex flex-col gap-2">
          {/* Progress Slider */}
          <input
            type="range"
            min={0}
            max={duration || 180}
            value={currentTime}
            onChange={handleSeek}
            className="w-full accent-[#FFD700] cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#FFD700] transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="text-zinc-400 hover:text-white transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#FFD700] font-bold text-[11px]">
                Interactive Checkpoint @ {quiz.checkpointTime}s
              </span>
            </div>
          </div>
        </div>

        {/* Note-Taking Section */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Student Research Notes (Auto-Compiled into 60/40 Prompt)</span>
            </span>
            <button
              onClick={handleSaveNotes}
              className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-[#FFD700] rounded-lg transition"
            >
              {notesSaved ? 'Notes Saved!' : 'Save Notes'}
            </button>
          </div>
          <textarea
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            rows={2}
            placeholder="Type code snippets, insights or prompts here..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-white font-mono outline-none focus:border-[#FFD700]"
          />
        </div>
      </div>

      {/* Docked AI Tutor & Transcript Sidebar (Right 4 Cols) */}
      <div className="w-full lg:w-80 bg-zinc-950 border-t lg:border-t-0 lg:border-l border-zinc-800 flex flex-col h-[520px]">
        <div className="p-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#00D4FF]" />
            <span className="text-xs font-mono font-bold text-white">Docked AI Mentor</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Live Context</span>
        </div>

        {/* Live Chat Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 text-xs">
          {dockedChat.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#00D4FF] text-black font-medium'
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className="text-[10px] font-mono text-zinc-500 animate-pulse">
              AI Tutor analyzing video timestamp...
            </div>
          )}
        </div>

        {/* Docked Query Input */}
        <form onSubmit={handleSendDockedChat} className="p-2.5 border-t border-zinc-800 bg-zinc-900/60 flex gap-2">
          <input
            type="text"
            value={dockedQuery}
            onChange={(e) => setDockedQuery(e.target.value)}
            placeholder="Ask mentor while watching..."
            className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-[#00D4FF]"
          />
          <button
            type="submit"
            disabled={!dockedQuery.trim() || isAiThinking}
            className="p-2 bg-[#00D4FF] text-black rounded-xl hover:brightness-110 active:scale-95 transition"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
export default VideoPlayerInteractive;
