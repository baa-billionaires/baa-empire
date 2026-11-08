import React, { useState } from 'react';
import {
  Link2,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  Share2,
  Youtube,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SocialPlatform, SocialContentType } from '../../types/socialHive';

interface UniversalSocialMiningPortalProps {
  onIntakeLink: (payload: {
    url: string;
    customTitle?: string;
    creatorName?: string;
    creatorHandle?: string;
    topic?: string;
    category?: string;
    isAuthorizedOwner: boolean;
  }) => Promise<void>;
}

export const UniversalSocialMiningPortal: React.FC<UniversalSocialMiningPortalProps> = ({
  onIntakeLink
}) => {
  const [url, setUrl] = useState('');
  const [batchUrls, setBatchUrls] = useState('');
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [topic, setTopic] = useState('Autonomous AI & Data Center Systems');
  const [category, setCategory] = useState('Engineering & Tech');
  const [isAuthorizedOwner, setIsAuthorizedOwner] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto-detect platform and content type from URL
  const detectedInfo = React.useMemo(() => {
    const lower = url.toLowerCase();
    let platform: SocialPlatform = 'youtube';
    let contentType: SocialContentType = 'video';
    let icon = Youtube;
    let color = 'text-red-500';

    if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
      platform = 'youtube';
      icon = Youtube;
      color = 'text-red-500';
      if (lower.includes('/shorts/')) contentType = 'reel_short';
      else if (lower.includes('/channel/') || lower.includes('/@')) contentType = 'channel';
      else if (lower.includes('/playlist')) contentType = 'playlist';
      else contentType = 'video';
    } else if (lower.includes('tiktok.com')) {
      platform = 'tiktok';
      color = 'text-cyan-400';
      if (lower.includes('/video/')) contentType = 'reel_short';
      else contentType = 'creator_profile';
    } else if (lower.includes('instagram.com')) {
      platform = 'instagram';
      icon = Instagram;
      color = 'text-pink-500';
      if (lower.includes('/reel/')) contentType = 'reel_short';
      else contentType = 'post';
    } else if (lower.includes('linkedin.com')) {
      platform = 'linkedin';
      icon = Linkedin;
      color = 'text-blue-500';
      if (lower.includes('/pulse/') || lower.includes('/article/')) contentType = 'public_article';
      else contentType = 'post';
    } else if (lower.includes('x.com') || lower.includes('twitter.com')) {
      platform = 'x_twitter';
      icon = Twitter;
      color = 'text-slate-200';
      contentType = 'post';
    } else if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
      platform = 'facebook';
      icon = Facebook;
      color = 'text-blue-600';
      contentType = lower.includes('/watch') ? 'video' : 'post';
    } else if (lower.includes('substack.com')) {
      platform = 'substack';
      color = 'text-orange-500';
      contentType = 'public_article';
    }

    return { platform, contentType, icon, color };
  }, [url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsProcessing(true);
    setSuccessMsg(null);
    try {
      await onIntakeLink({
        url: url.trim(),
        customTitle: customTitle.trim() || undefined,
        creatorName: creatorName.trim() || undefined,
        creatorHandle: creatorHandle.trim() || undefined,
        topic,
        category,
        isAuthorizedOwner
      });

      setSuccessMsg(`Minted link from ${detectedInfo.platform.toUpperCase()} (${detectedInfo.contentType}) to Social Asset Genome!`);
      setUrl('');
      setCustomTitle('');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Intake failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBatchSubmit = async () => {
    const lines = batchUrls.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    setIsProcessing(true);
    try {
      for (const line of lines) {
        await onIntakeLink({
          url: line,
          isAuthorizedOwner
        });
      }
      setSuccessMsg(`Batch processed: ${lines.length} social links successfully verified and minted!`);
      setBatchUrls('');
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Batch intake failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const supportedPlatforms = [
    { name: 'YouTube', type: 'Videos, Shorts, Playlists, Channels', icon: Youtube, color: 'text-red-500' },
    { name: 'TikTok', type: 'Short-form videos, Creator portfolios', icon: Share2, color: 'text-cyan-400' },
    { name: 'Instagram', type: 'Reels, Carousels, Creator posts', icon: Instagram, color: 'text-pink-500' },
    { name: 'LinkedIn', type: 'Public articles, Case studies, Posts', icon: Linkedin, color: 'text-blue-500' },
    { name: 'X (Twitter)', type: 'Threads, High-signal posts, Profiles', icon: Twitter, color: 'text-slate-300' },
    { name: 'Facebook', type: 'Watch videos, Public business pages', icon: Facebook, color: 'text-blue-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Universal Social Media Mining Portal Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Link2 className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/40">
                UNIVERSAL SOCIAL MEDIA MINING PORTAL
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Paste Any Social Link $\rightarrow$ Mint Knowledge Asset
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Autonomous multi-platform parser detecting content type, transcripts, axioms, and commercial licensing terms.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBatchMode(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                !isBatchMode ? 'bg-cyan-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              Single Link
            </button>
            <button
              onClick={() => setIsBatchMode(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                isBatchMode ? 'bg-cyan-500 text-black' : 'bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              Batch URLs (Multi-Link)
            </button>
          </div>
        </div>

        {/* Strict Compliance Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider block">
              STRICT COMPLIANCE &amp; RIGHTS CHARTER:
            </span>
            <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
              "A link must never be treated as permission to access private account data. Social Hive operates strictly on public fair-use knowledge extraction and authorized creator-owned accounts using least-privilege OAuth scopes."
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Single Link Mode Form */}
        {!isBatchMode ? (
          <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
            {/* URL Input with Live Detection */}
            <div className="space-y-2">
              <label className="text-zinc-400 uppercase font-bold block">
                1. Paste Social Media URL (YouTube, TikTok, Instagram, LinkedIn, X, Facebook, Substack):
              </label>

              <div className="relative">
                <Link2 className="w-5 h-5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or https://tiktok.com/@creator/video/..."
                  className="w-full pl-11 pr-32 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-white outline-none focus:border-cyan-400 text-xs font-mono"
                />

                {url.trim() && (
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black border border-zinc-800 text-[10px]">
                    <span className="text-zinc-400 uppercase font-bold">{detectedInfo.platform}</span>
                    <span className="text-cyan-400 font-bold">({detectedInfo.contentType})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Optional Title & Creator Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-zinc-400 uppercase font-bold block mb-1">
                  Custom Asset Title (Optional):
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Leave empty for auto-title"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-bold block mb-1">
                  Creator Name / Handle:
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder="e.g. Engr. Damilola"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-bold block mb-1">
                  Content Domain:
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="Autonomous AI & Data Center Systems">Autonomous AI &amp; Data Centers</option>
                  <option value="Edge Compute & Battery Scheduling">Edge Compute &amp; Battery Scheduling</option>
                  <option value="Fintech & Webhook Pipelines">Fintech &amp; Webhook Pipelines</option>
                  <option value="Precision Agronomy & Smart Farming">Precision Agronomy &amp; Smart Farming</option>
                  <option value="Mobile Wealth Architecture">Mobile Wealth Architecture</option>
                </select>
              </div>
            </div>

            {/* Ownership & Authorization Checklist */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <span className="text-[11px] text-zinc-400 font-bold uppercase block">
                2. Rights &amp; Provenance Declarations:
              </span>
              <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAuthorizedOwner}
                  onChange={(e) => setIsAuthorizedOwner(e.target.checked)}
                  className="accent-cyan-400"
                />
                <span>
                  I am the authorized creator/owner of this content OR analyzing public content under fair-use educational synthesis
                </span>
              </label>
            </div>

            {/* Mint to Social Asset Genome Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-widest transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Parsing Video Captions &amp; Minting Genome...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>MINT TO SOCIAL ASSET GENOME</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Batch URLs Mode */
          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-zinc-400 uppercase font-bold block mb-1">
                Paste Batch Social URLs (One Per Line):
              </label>
              <textarea
                rows={5}
                value={batchUrls}
                onChange={(e) => setBatchUrls(e.target.value)}
                placeholder="https://youtube.com/watch?v=...&#10;https://tiktok.com/@creator/video/...&#10;https://linkedin.com/pulse/..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-4 text-white outline-none focus:border-cyan-400 font-mono text-xs"
              />
            </div>

            <button
              onClick={handleBatchSubmit}
              disabled={isProcessing || !batchUrls.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-widest transition shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Processing Batch Links...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Process Batch Social Links</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Supported Platforms Strip */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
          Supported Platform Adapters &amp; Content Formats
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {supportedPlatforms.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${p.color}`} />
                  <span className="text-xs font-bold text-white font-sans">{p.name}</span>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono leading-tight">{p.type}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
