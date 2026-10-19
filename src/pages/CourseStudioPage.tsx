import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Film,
  Sparkles,
  Mic,
  FileText,
  HelpCircle,
  Play,
  CheckCircle,
  Upload,
  ArrowRight,
  Layers,
  Zap
} from 'lucide-react';

export const CourseStudioPage: React.FC = () => {
  const { courses } = useEcosystem();

  const [title, setTitle] = useState('Autonomous TikTok Cash Machine: 100 Short-Form Videos/Day');
  const [outline, setOutline] = useState(
    '1. Architecture of viral audio hooks\n2. Automated batch rendering via GPU data centers\n3. Affiliate commissions & 60/40 prompt monetization'
  );
  const [price, setPrice] = useState(99);
  const [category, setCategory] = useState('AI Wealth');
  const [isGeneratingSlides, setIsGeneratingSlides] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [quizQuestion, setQuizQuestion] = useState('What is the optimal video duration for short-form automation?');
  const [published, setPublished] = useState(false);

  const handleGenerateSlides = () => {
    setIsGeneratingSlides(true);
    setTimeout(() => setIsGeneratingSlides(false), 900);
  };

  const handleGenerateVoice = () => {
    setIsGeneratingVoice(true);
    setTimeout(() => setIsGeneratingVoice(false), 1100);
  };

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    setTimeout(() => {
      setIsGeneratingVideo(false);
      setGeneratedVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    }, 1400);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-mono text-[#FFD700] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Film className="w-4 h-4 text-[#FFD700]" />
            Autonomous Course Studio
          </span>
          <h1 className="text-3xl font-heading font-black text-white mt-1">
            AI Video &amp; Interactive Curriculum Studio
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Generate slides, synthesize ElevenLabs voiceover, render video modules, and add interactive quiz checkpoints.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Studio Form (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-5 shadow-2xl">
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Course Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Tuition ($ USD)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                />
                <span className="text-[10px] text-[#FFD700] font-mono mt-0.5 block">
                  Networth: {price * 10} BaaCoin
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                >
                  <option>AI Wealth</option>
                  <option>Blockchain &amp; DeFi</option>
                  <option>Autonomous Robotics</option>
                  <option>Africa AI Impact</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Course Syllabus Outline</label>
              <textarea
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl p-3 text-xs text-white font-mono outline-none resize-none"
              />
            </div>

            {/* AI Generation Triggers */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <span className="text-xs font-mono text-zinc-400 block font-bold">1-Click AI Generation Engines</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleGenerateSlides}
                  disabled={isGeneratingSlides}
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-[11px] font-mono text-zinc-300 flex flex-col items-center gap-1 transition"
                >
                  <FileText className="w-4 h-4 text-[#00D4FF]" />
                  <span>{isGeneratingSlides ? 'Rendering...' : 'Gen Slides'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateVoice}
                  disabled={isGeneratingVoice}
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-[11px] font-mono text-zinc-300 flex flex-col items-center gap-1 transition"
                >
                  <Mic className="w-4 h-4 text-[#FFD700]" />
                  <span>{isGeneratingVoice ? 'Synthesizing...' : 'Gen Voice'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-[11px] font-mono text-zinc-300 flex flex-col items-center gap-1 transition"
                >
                  <Film className="w-4 h-4 text-emerald-400" />
                  <span>{isGeneratingVideo ? 'Encoding...' : 'Gen Video'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Quiz Checkpoint Editor */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">Checkpoint Quiz Question</label>
              <input
                type="text"
                value={quizQuestion}
                onChange={(e) => setQuizQuestion(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handlePublish}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Publish Course &amp; Add to 100 Seed List</span>
            </button>

            {published && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 text-center animate-pulse">
                ✓ Course Published! Interactive video player and BaaCoin mining parameters configured.
              </div>
            )}
          </div>

          {/* Preview Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">Live Artifact Preview</span>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center">
                {generatedVideoUrl ? (
                  <video src={generatedVideoUrl} controls className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Film className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <span className="text-xs font-mono text-zinc-500">Click "Gen Video" to render MP4 artifact</span>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-bold text-white font-heading">{title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2">{outline}</p>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-900">
                  <span className="text-zinc-500">Price: ${price}</span>
                  <span className="text-[#FFD700] font-bold">Networth: +{price * 10} BaaCoin</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              Interactive Quiz: <span className="text-white">Active @ 2 mins</span>
              <br />
              Learn-to-Mine: <span className="text-emerald-400">+0.5 BaaCoin/min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseStudioPage;
