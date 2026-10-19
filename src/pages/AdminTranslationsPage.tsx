import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { SUPPORTED_LANGUAGES } from '../components/LanguageChip';
import { Globe2, Play, CheckCircle, Sparkles, ArrowLeft, Languages } from 'lucide-react';

export const AdminTranslationsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { courses } = useEcosystem();

  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(140);

  const startBatchTranslation = () => {
    setIsTranslating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setIsTranslating(false);
          setCompletedCount(courses.length * 7);
          return 100;
        }
        return next;
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Vault</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-[#FFD700] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-[#FFD700]" />
              7 Pan-African Languages
            </span>
            <h1 className="text-3xl font-heading font-black text-white mt-1">
              Neural Translation Engine
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Automated translation and indigenous voice synthesis for Yoruba, Igbo, Hausa, Swahili, French, English, and Pidgin.
            </p>
          </div>

          <button
            onClick={startBatchTranslation}
            disabled={isTranslating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/25 flex items-center gap-2 shrink-0"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>{isTranslating ? `Translating (${progress}%)...` : 'Auto-Translate All to 7 Languages'}</span>
          </button>
        </div>

        {/* Status Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Available Dialects</span>
            <span className="text-3xl font-heading font-black text-white block mt-1">7 Languages</span>
            <span className="text-[11px] text-[#00D4FF] font-mono">Indigenous Voice Synthesis</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Translated Course Modules</span>
            <span className="text-3xl font-heading font-black text-[#FFD700] block mt-1">
              {completedCount} / {courses.length * 7}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">Across 100 courses</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Language Chip Status</span>
            <span className="text-3xl font-heading font-black text-emerald-400 block mt-1">Global Active</span>
            <span className="text-[11px] text-emerald-300 font-mono">Realtime client switching</span>
          </div>
        </div>

        {/* Progress Bar when active */}
        {isTranslating && (
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-400">Multi-Model Batch Neural Progress:</span>
              <span className="text-[#FFD700] font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-[#FFD700] to-[#00D4FF] h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Languages Table */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Language &amp; Dialect</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Voice Engine</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {SUPPORTED_LANGUAGES.map(lang => (
                <tr key={lang.code} className="hover:bg-zinc-900/40">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name} ({lang.native})</span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">Pan-Africa / Diaspora</td>
                  <td className="py-3.5 px-4 text-[#00D4FF]">Neural Cloned Voice</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Synchronized
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminTranslationsPage;
