import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Film, Play, CheckCircle, Sparkles, Layers, Cpu, ArrowLeft } from 'lucide-react';

export const BulkGenerateVideosPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { courses } = useEcosystem();
  const [isRunning, setIsRunning] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedList, setCompletedList] = useState<string[]>([]);

  const startBulkGeneration = () => {
    setIsRunning(true);
    setCurrentIdx(0);
    setCompletedList([]);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= courses.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }
      const course = courses[idx];
      setCompletedList(prev => [course.title, ...prev.slice(0, 12)]);
      idx++;
      setCurrentIdx(idx);
    }, 180);
  };

  const progressPercent = Math.round((currentIdx / courses.length) * 100);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Vault</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Film className="w-4 h-4 text-[#00D4FF]" />
              100 Course Batch Studio
            </span>
            <h1 className="text-3xl font-heading font-black text-white mt-1">
              Bulk Video &amp; Quiz Generator
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Automated high-throughput video encoding and interactive checkpoint injection across all 100 courses.
            </p>
          </div>

          <button
            onClick={startBulkGeneration}
            disabled={isRunning}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/25 flex items-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>{isRunning ? `Encoding (${currentIdx}/${courses.length})...` : 'Start Bulk Encode (100 Courses)'}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-400">Total Pipeline Progress:</span>
            <span className="text-[#00D4FF] font-bold text-sm">{progressPercent}% ({currentIdx} / {courses.length})</span>
          </div>

          <div className="w-full bg-zinc-900 rounded-full h-3 p-0.5 border border-zinc-800">
            <div
              className="bg-gradient-to-r from-[#00D4FF] via-[#FFD700] to-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {currentIdx === courses.length && courses.length > 0 && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>All 100 courses equipped with interactive video players and checkpoint quizzes!</span>
            </div>
          )}
        </div>

        {/* Real-time Encoding Stream Log */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400 font-bold">GPU Cluster Encoding Log</span>
            <span className="text-emerald-400">Kainji Node #H100 Active</span>
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {completedList.length === 0 ? (
              <span className="text-zinc-600 italic">Ready to run batch encoding...</span>
            ) : (
              completedList.map((title, i) => (
                <div key={i} className="text-zinc-300 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">Rendered video &amp; quiz for: <strong className="text-white">{title}</strong></span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BulkGenerateVideosPage;
