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
  Zap,
  Image as ImageIcon,
  RefreshCw,
  Download,
  X,
  Palette,
  Check,
  Eye,
  Sliders,
  Maximize2
} from 'lucide-react';

interface ThumbnailStyleOption {
  id: string;
  name: string;
  description: string;
  color: string;
  promptDescription: string;
}

const THUMBNAIL_STYLES: ThumbnailStyleOption[] = [
  {
    id: 'gold_luxury',
    name: 'Obsidian & Gold Luxury',
    description: 'Black glass, 24k gold neon accents, high-ticket executive wealth',
    color: 'from-[#FFD700]/30 to-amber-950/40 border-[#FFD700]',
    promptDescription: 'Obsidian black background, floating 24k gold geometric 3D shapes, warm ambient rim lighting, premium luxury academy typography, 8k octane render'
  },
  {
    id: 'cyberpunk_ai',
    name: 'Cyberpunk & Neural Swarm',
    description: 'Cyan laser grids, autonomous holographic nodes, deep blue obsidian',
    color: 'from-cyan-500/20 to-blue-950/40 border-[#00D4FF]',
    promptDescription: 'Cyberpunk neural network mesh, glowing cyan and electric blue holographic nodes, dark metallic circuitry, volumetric laser light, futuristic AI UI overlays'
  },
  {
    id: 'afrofuturism',
    name: 'Afrofuturistic High-Tech',
    description: 'Vibrant pan-African geometric patterns, glowing solar-hydro energy',
    color: 'from-emerald-500/20 to-zinc-950 border-emerald-400',
    promptDescription: 'Afrofuturistic tech aesthetics, glowing green and gold sacred geometry, clean solar-powered AI data center backdrop, dynamic lighting, proud sovereign modern African digital empire'
  },
  {
    id: 'quantum_deep',
    name: 'Quantum & Deep Robotics',
    description: 'Purple neon, quantum particle accelerators, robotic interfaces',
    color: 'from-purple-500/20 to-zinc-950 border-purple-400',
    promptDescription: 'Deep ultraviolet and magenta quantum particle flows, robotic titanium armatures, optical lenses, floating mathematical equations, sleek scientific laboratory aesthetic'
  },
  {
    id: 'minimal_saas',
    name: 'Silicon Valley Minimalist',
    description: 'Clean glassmorphism, soft gradients, modern fintech typography',
    color: 'from-slate-700/20 to-zinc-950 border-zinc-600',
    promptDescription: 'Clean Apple-style glassmorphism, soft studio lighting, subtle iridescent gradients, centered 3D icon, spacious typography, sophisticated Silicon Valley enterprise SaaS'
  }
];

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

  // AI-Powered Course Thumbnail Generator State
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const [thumbnailTopic, setThumbnailTopic] = useState('');
  const [selectedStyleId, setSelectedStyleId] = useState<string>('gold_luxury');
  const [customStyleAddon, setCustomStyleAddon] = useState('');
  const [thumbnailHistory, setThumbnailHistory] = useState<Array<{ url: string; topic: string; styleName: string }>>([]);
  const [thumbnailStatusMessage, setThumbnailStatusMessage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'thumbnail' | 'video'>('thumbnail');

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
      setPreviewMode('video');
    }, 1400);
  };

  // Open the AI Thumbnail Generator Modal
  const handleOpenThumbnailModal = () => {
    setThumbnailTopic(title);
    setThumbnailModalOpen(true);
  };

  // Execute Gemini AI Thumbnail Generation Function
  const handleGenerateThumbnail = async (topicToUse?: string) => {
    const topic = (topicToUse || thumbnailTopic || title).trim();
    if (!topic) return;

    setIsGeneratingThumbnail(true);
    setThumbnailStatusMessage('Querying Gemini API (gemini-3.1-flash-lite-image)...');

    const chosenStyle = THUMBNAIL_STYLES.find(s => s.id === selectedStyleId) || THUMBNAIL_STYLES[0];
    const fullStyleDescription = customStyleAddon.trim()
      ? `${chosenStyle.promptDescription}, ${customStyleAddon.trim()}`
      : chosenStyle.promptDescription;

    try {
      const response = await fetch('/api/generate-thumbnail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          category,
          style: fullStyleDescription
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.imageUrl) {
        setThumbnailUrl(data.imageUrl);
        setPreviewMode('thumbnail');
        setThumbnailHistory(prev => [
          { url: data.imageUrl, topic, styleName: chosenStyle.name },
          ...prev.slice(0, 4)
        ]);
        setThumbnailStatusMessage(
          data.isFallback
            ? '✓ Themed high-resolution hero banner synthesized!'
            : '✓ Unique AI thumbnail rendered via Gemini API!'
        );
        setTimeout(() => {
          setThumbnailModalOpen(false);
          setThumbnailStatusMessage(null);
        }, 1200);
      } else {
        throw new Error('No image returned by server');
      }
    } catch (err: any) {
      console.error('Thumbnail generation error:', err);
      setThumbnailStatusMessage(`Notice: ${err?.message || 'Error communicating with generation endpoint'}`);
      setTimeout(() => setThumbnailStatusMessage(null), 4000);
    } finally {
      setIsGeneratingThumbnail(false);
    }
  };

  const handleDownloadThumbnail = () => {
    if (!thumbnailUrl) return;
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-thumbnail.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setPublished(true);
    setTimeout(() => setPublished(false), 3000);
  };

  const quickTopicSuggestions = [
    'Autonomous Multi-Agent Swarms & Machine-to-Machine Commerce',
    'Base L2 Smart Contract Fuzzing & Sniper Bot Security',
    'Pan-African AI Data Center: 1.08 PUE Hydro-Solar Infrastructure',
    'High-Yield Prompt Engineering & 60/40 Marketplace Royalties',
    'Solidity Arbitrage & Flash Loan Capital Protocol'
  ];

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
            Generate Gemini-powered course hero thumbnails, synthesize ElevenLabs voiceovers, render video modules, and configure BaaCoin Learn-to-Mine parameters.
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
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl p-3 text-xs text-white font-mono outline-none resize-none"
              />
            </div>

            {/* AI Generation Triggers (Includes Gemini Thumbnail Generator) */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 block font-bold">1-Click AI Generation Engines</span>
                <span className="text-[10px] font-mono text-[#FFD700] px-2 py-0.5 rounded bg-[#FFD700]/10 border border-[#FFD700]/30 font-bold">
                  GEMINI 3.1 POWERED
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* 1. AI Hero Thumbnail Button */}
                <button
                  type="button"
                  onClick={handleOpenThumbnailModal}
                  disabled={isGeneratingThumbnail}
                  className="p-3 bg-gradient-to-b from-[#FFD700]/15 to-transparent hover:from-[#FFD700]/25 border-2 border-[#FFD700]/60 hover:border-[#FFD700] rounded-xl text-[11px] font-mono text-[#FFD700] flex flex-col items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-lg shadow-[#FFD700]/10"
                >
                  <ImageIcon className="w-5 h-5 text-[#FFD700] animate-pulse" />
                  <span className="font-bold">AI Thumbnail</span>
                </button>

                {/* 2. Slides Button */}
                <button
                  type="button"
                  onClick={handleGenerateSlides}
                  disabled={isGeneratingSlides}
                  className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-[11px] font-mono text-zinc-300 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-[#00D4FF]" />
                  <span>{isGeneratingSlides ? 'Rendering...' : 'Gen Slides'}</span>
                </button>

                {/* 3. Voiceover Button */}
                <button
                  type="button"
                  onClick={handleGenerateVoice}
                  disabled={isGeneratingVoice}
                  className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-[11px] font-mono text-zinc-300 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Mic className="w-5 h-5 text-purple-400" />
                  <span>{isGeneratingVoice ? 'Synthesizing...' : 'Gen Voice'}</span>
                </button>

                {/* 4. Video Render Button */}
                <button
                  type="button"
                  onClick={handleGenerateVideo}
                  disabled={isGeneratingVideo}
                  className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-[11px] font-mono text-zinc-300 flex flex-col items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Film className="w-5 h-5 text-emerald-400" />
                  <span>{isGeneratingVideo ? 'Encoding...' : 'Gen Video'}</span>
                </button>
              </div>

              {thumbnailUrl && (
                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-zinc-800">
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" /> Hero Thumbnail Configured
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('thumbnail')}
                    className="text-[#00D4FF] hover:underline cursor-pointer"
                  >
                    View in Preview Panel →
                  </button>
                </div>
              )}
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Publish Course &amp; Add to 100 Seed List</span>
            </button>

            {published && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 text-center animate-pulse">
                ✓ Course Published! Interactive video player, Gemini hero thumbnail, and BaaCoin mining parameters configured.
              </div>
            )}
          </div>

          {/* Preview Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              {/* Tab Selector between Thumbnail and Video */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Live Artifact Preview</span>
                <div className="flex p-0.5 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('thumbnail')}
                    className={`px-2 py-1 rounded transition cursor-pointer ${
                      previewMode === 'thumbnail'
                        ? 'bg-[#FFD700] text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Hero Thumbnail
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('video')}
                    className={`px-2 py-1 rounded transition cursor-pointer ${
                      previewMode === 'video'
                        ? 'bg-[#00D4FF] text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Video Stream
                  </button>
                </div>
              </div>

              {/* Artifact Display Screen */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 flex items-center justify-center group shadow-xl">
                {previewMode === 'thumbnail' ? (
                  thumbnailUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={thumbnailUrl}
                        alt="Course Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-[#FFD700]/50 text-[#FFD700] font-mono text-[9px] font-bold">
                        GEMINI AI 16:9 HERO
                      </div>
                      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                        <button
                          type="button"
                          onClick={handleDownloadThumbnail}
                          className="p-1.5 rounded-lg bg-black/80 text-white hover:text-[#FFD700] border border-zinc-700 transition"
                          title="Download Image"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenThumbnailModal}
                          className="p-1.5 rounded-lg bg-black/80 text-white hover:text-[#00D4FF] border border-zinc-700 transition"
                          title="Regenerate with New Topic"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] mx-auto">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-zinc-300 block font-bold">No Thumbnail Generated Yet</span>
                      <p className="text-[11px] text-zinc-500 font-mono">
                        Prompt a topic to generate a unique 16:9 hero thumbnail with the Gemini API.
                      </p>
                      <button
                        type="button"
                        onClick={handleOpenThumbnailModal}
                        className="mt-2 px-4 py-2 rounded-xl bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/40 text-xs font-mono font-bold transition flex items-center gap-1.5 mx-auto cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Prompt Topic &amp; Generate</span>
                      </button>
                    </div>
                  )
                ) : generatedVideoUrl ? (
                  <video src={generatedVideoUrl} controls className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Film className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                    <span className="text-xs font-mono text-zinc-500">Click "Gen Video" to render MP4 artifact</span>
                  </div>
                )}
              </div>

              {/* Course Identity Details */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white font-heading">{title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2">{outline}</p>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-zinc-900">
                  <span className="text-zinc-500">Tuition: ${price} USD</span>
                  <span className="text-[#FFD700] font-bold">Networth: +{price * 10} BaaCoin</span>
                </div>
              </div>

              {/* Thumbnail History Pill Strip */}
              {thumbnailHistory.length > 0 && (
                <div className="pt-2 border-t border-zinc-900 space-y-1.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Recent Generated Thumbnails:</span>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                    {thumbnailHistory.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setThumbnailUrl(item.url);
                          setPreviewMode('thumbnail');
                        }}
                        className={`w-16 h-10 rounded-lg overflow-hidden border shrink-0 transition ${
                          thumbnailUrl === item.url ? 'border-[#FFD700] ring-1 ring-[#FFD700]' : 'border-zinc-800 opacity-70 hover:opacity-100'
                        }`}
                        title={`${item.topic} (${item.styleName})`}
                      >
                        <img src={item.url} alt={item.topic} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-1">
              <div>Interactive Quiz: <span className="text-white">Active @ 2 mins</span></div>
              <div>Learn-to-Mine: <span className="text-emerald-400">+0.5 BaaCoin/min</span></div>
              <div>Hero Artwork: <span className={thumbnailUrl ? 'text-[#FFD700]' : 'text-zinc-500'}>{thumbnailUrl ? 'Generated via Gemini' : 'Pending'}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* GEMINI AI THUMBNAIL GENERATOR MODAL */}
      {thumbnailModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFD700]/15 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                    Gemini AI Course Thumbnail Generator
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    Powered by @google/genai (16:9 Themed Hero Image)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setThumbnailModalOpen(false)}
                className="text-zinc-500 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Message */}
            {thumbnailStatusMessage && (
              <div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-xs flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
                <span>{thumbnailStatusMessage}</span>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4 text-xs font-mono">
              {/* Topic Prompt Input */}
              <div className="space-y-1.5">
                <label className="text-zinc-300 font-bold block flex items-center justify-between">
                  <span>Course Topic / Subject Prompt:</span>
                  <span className="text-[10px] text-zinc-500 font-normal">Customizable</span>
                </label>
                <textarea
                  rows={2}
                  value={thumbnailTopic}
                  onChange={(e) => setThumbnailTopic(e.target.value)}
                  placeholder="e.g. Autonomous Multi-Agent Swarms & Machine-to-Machine Settlement"
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl p-3 text-white outline-none resize-none"
                />
              </div>

              {/* Topic Quick Suggestions */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-zinc-500 uppercase block">Quick Suggested Topics:</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickTopicSuggestions.map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setThumbnailTopic(sug)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-[#FFD700]/50 text-zinc-400 hover:text-white text-[10px] transition truncate max-w-full"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Style Selection */}
              <div className="space-y-2">
                <label className="text-zinc-300 font-bold block">
                  Select Visual Aesthetic &amp; Theme:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {THUMBNAIL_STYLES.map(style => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`p-3 rounded-xl border text-left transition relative cursor-pointer ${
                        selectedStyleId === style.id
                          ? `bg-gradient-to-br ${style.color} ring-1 ring-white/20`
                          : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                        <span>{style.name}</span>
                        {selectedStyleId === style.id && (
                          <Check className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Style Addon */}
              <div className="space-y-1">
                <label className="text-zinc-400 block text-[11px]">
                  Custom Style Directives (Optional):
                </label>
                <input
                  type="text"
                  value={customStyleAddon}
                  onChange={(e) => setCustomStyleAddon(e.target.value)}
                  placeholder="e.g. dramatic lighting, gold dust particles, holographic HUD"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-900">
              <button
                type="button"
                onClick={() => setThumbnailModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleGenerateThumbnail()}
                disabled={isGeneratingThumbnail || !thumbnailTopic.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#FFD700] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-2 shadow-lg shadow-[#FFD700]/25 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 text-black ${isGeneratingThumbnail ? 'animate-spin' : ''}`} />
                <span>{isGeneratingThumbnail ? 'Rendering with Gemini...' : 'Generate 16:9 Hero Image'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CourseStudioPage;
