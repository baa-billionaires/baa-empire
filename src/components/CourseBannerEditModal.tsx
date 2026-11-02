import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link,
  Sparkles,
  Check,
  RefreshCw,
  Image as ImageIcon,
  Zap,
  Eye,
  Sliders,
  Palette
} from 'lucide-react';
import { Course } from '../types';

interface CourseBannerEditModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveBanner: (courseId: string, newThumbnailUrl: string) => void;
}

// Curated 4K Luxury Tech & Thematic Art Presets
const THEMATIC_PRESETS = [
  {
    label: 'Autonomous SaaS & Cloud Factory',
    category: 'Autonomous Enterprise',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Medical Assistant Clinics & AI Health',
    category: 'Healthcare & Biotech',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Autonomous Grant & Global Tender Hunter',
    category: 'Autonomous Enterprise',
    url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'AI Political Campaign Machine',
    category: 'AI Wealth & Influence',
    url: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Gold Cyber Luxury & DeFi Vault',
    category: 'Blockchain & DeFi',
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Neural Quantum AI & Deep Systems',
    category: 'AI Wealth',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Humanoid Robotics & Cyber Swarms',
    category: 'Autonomous Robotics',
    url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'African Sovereign Tech & Green Microgrids',
    category: 'Africa AI Impact',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Algorithmic High-Frequency Trading Bot',
    category: 'Blockchain & DeFi',
    url: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&auto=format&fit=crop&q=80'
  },
  {
    label: 'Sovereign AI Data Center Core',
    category: 'Autonomous Enterprise',
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80'
  }
];

export const CourseBannerEditModal: React.FC<CourseBannerEditModalProps> = ({
  course,
  isOpen,
  onClose,
  onSaveBanner
}) => {
  if (!isOpen || !course) return null;

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('presets');
  const [customUrl, setCustomUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>(course.thumbnail_url);
  const [animationStyle, setAnimationStyle] = useState<'neon_pulse' | 'gold_hologram' | 'scanline_cyber'>('gold_hologram');
  const [isSavedCelebration, setIsSavedCelebration] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP, GIF)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    setPreviewUrl(customUrl.trim());
  };

  const handleSelectPreset = (url: string) => {
    setPreviewUrl(url);
  };

  const handleSave = () => {
    onSaveBanner(course.id, previewUrl);
    setIsSavedCelebration(true);
    setTimeout(() => {
      setIsSavedCelebration(false);
      onClose();
    }, 900);
  };

  const handleResetToDefault = () => {
    const fallbackUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80`;
    setPreviewUrl(fallbackUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 font-semibold uppercase">
                  {course.category}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Course #{course.id}</span>
              </div>
              <h2 className="text-base sm:text-lg font-heading font-black text-white line-clamp-1 mt-0.5">
                Edit Course Banner Photo
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Targeted Course Title */}
          <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800/70 text-xs">
            <span className="text-zinc-500 font-mono block text-[10px] uppercase tracking-wider mb-0.5">
              Course Title
            </span>
            <span className="font-heading font-bold text-white text-sm">{course.title}</span>
          </div>

          {/* Animated Live Preview Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-400 flex items-center gap-1.5 font-bold uppercase text-[11px]">
                <Eye className="w-3.5 h-3.5 text-[#00D4FF]" />
                Live Animated Display Preview
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setAnimationStyle('gold_hologram')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
                    animationStyle === 'gold_hologram'
                      ? 'bg-[#FFD700] text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Gold Hologram
                </button>
                <button
                  type="button"
                  onClick={() => setAnimationStyle('neon_pulse')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
                    animationStyle === 'neon_pulse'
                      ? 'bg-[#00D4FF] text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Cyan Neon
                </button>
                <button
                  type="button"
                  onClick={() => setAnimationStyle('scanline_cyber')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono transition ${
                    animationStyle === 'scanline_cyber'
                      ? 'bg-purple-500 text-white font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Cyber Scan
                </button>
              </div>
            </div>

            {/* Simulated Live Card Container */}
            <div
              className={`relative rounded-2xl overflow-hidden aspect-video border transition-all duration-500 shadow-2xl group ${
                animationStyle === 'gold_hologram'
                  ? 'border-[#FFD700]/70 shadow-[0_0_35px_rgba(255,215,0,0.25)] ring-1 ring-[#FFD700]/50'
                  : animationStyle === 'neon_pulse'
                  ? 'border-[#00D4FF]/70 shadow-[0_0_35px_rgba(0,212,255,0.25)] ring-1 ring-[#00D4FF]/50'
                  : 'border-purple-500/70 shadow-[0_0_35px_rgba(168,85,247,0.25)] ring-1 ring-purple-500/50'
              }`}
            >
              {/* Image with zoom and smooth shine */}
              <img
                src={previewUrl}
                alt="Banner Preview"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Animated Light Sweep / Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-amber-500/10 pointer-events-none" />

              {/* Animated Cyber Glow Scanline */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent opacity-60 animate-pulse pointer-events-none" />

              {/* Animated Top Badges */}
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{course.level}</span>
              </div>

              <div className="absolute top-3 right-3 bg-gradient-to-r from-[#FFD700] to-amber-400 text-black px-3 py-1 rounded-full font-mono font-black text-xs shadow-lg">
                ${course.price} USD
              </div>

              {/* Live Mine Ready Indicator */}
              <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#FFD700]/40 text-[10px] font-mono text-[#FFD700] flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[#FFD700] animate-bounce" />
                <span>MINE-READY: +{course.baacoin_value} BaaCoin</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs for Photo Source */}
          <div className="flex border-b border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('presets')}
              className={`pb-2.5 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Thematic Presets (10)</span>
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2.5 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local Photo</span>
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`pb-2.5 px-4 font-bold border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'url'
                  ? 'border-[#FFD700] text-[#FFD700]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Link className="w-3.5 h-3.5" />
              <span>Direct Photo URL</span>
            </button>
          </div>

          {/* Tab 1: Curated Thematic Presets */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 font-mono">
                Select an eye-catching, high-converting banner perfectly matched to your course title:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {THEMATIC_PRESETS.map((preset, idx) => {
                  const isSelected = previewUrl === preset.url;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPreset(preset.url)}
                      className={`group relative rounded-xl overflow-hidden border text-left p-1.5 transition ${
                        isSelected
                          ? 'border-[#FFD700] bg-zinc-900 shadow-md shadow-[#FFD700]/20 ring-1 ring-[#FFD700]'
                          : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
                      }`}
                    >
                      <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                        <img
                          src={preset.url}
                          alt={preset.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="p-1 rounded-full bg-[#FFD700] text-black">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5">
                        <div className="text-[11px] font-bold text-white line-clamp-1">{preset.label}</div>
                        <div className="text-[9px] font-mono text-[#00D4FF] truncate">{preset.category}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Upload Local File */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-zinc-800 hover:border-[#FFD700] rounded-2xl p-8 text-center cursor-pointer bg-zinc-900/30 hover:bg-zinc-900/60 transition group"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 group-hover:bg-[#FFD700]/20 text-zinc-400 group-hover:text-[#FFD700] flex items-center justify-center mx-auto mb-3 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="font-bold text-white text-sm">Click to select an image from your device</div>
                <p className="text-xs text-zinc-500 mt-1">Supports PNG, JPG, WebP, GIF (high resolution recommended)</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 rounded-xl transition"
                >
                  Browse Files
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Custom URL */}
          {activeTab === 'url' && (
            <form onSubmit={handleApplyCustomUrl} className="space-y-3">
              <label className="block text-xs font-mono text-zinc-400 uppercase">
                Paste Image Address / URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-... or your CDN link"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl font-mono transition"
                >
                  Load Preview
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">
                Works with Unsplash, Midjourney output links, Google Cloud Storage, IPFS, or any public image URL.
              </p>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 border-t border-zinc-800 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-mono flex items-center justify-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default Art</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg ${
                isSavedCelebration
                  ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-black hover:brightness-110 shadow-[#FFD700]/20'
              }`}
            >
              {isSavedCelebration ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Banner Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save &amp; Apply Banner</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseBannerEditModal;
