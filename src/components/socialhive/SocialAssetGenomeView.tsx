import React, { useState } from 'react';
import {
  Database,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Layers,
  Brain,
  Building2,
  DollarSign,
  Coins,
  Youtube,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Search,
  Eye,
  Heart,
  Share2,
  MessageSquare
} from 'lucide-react';
import { SocialAssetGenome, SocialPlatform } from '../../types/socialHive';

interface SocialAssetGenomeViewProps {
  assets: SocialAssetGenome[];
  onTriggerMultiply: (assetId: string) => void;
  onTriggerEnterprise: (assetId: string) => void;
}

export const SocialAssetGenomeView: React.FC<SocialAssetGenomeViewProps> = ({
  assets,
  onTriggerMultiply,
  onTriggerEnterprise
}) => {
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.title.toLowerCase().includes(search.toLowerCase()) ||
      asset.creatorName.toLowerCase().includes(search.toLowerCase()) ||
      asset.topic.toLowerCase().includes(search.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || asset.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4 text-blue-500" />;
      case 'x_twitter':
        return <Twitter className="w-4 h-4 text-slate-200" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      default:
        return <Share2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified_owner':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Verified Owner (70% Net)</span>
          </span>
        );
      case 'licensed_partner':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Licensed Partner</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            Public Fair-Use Analysis
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950 border border-zinc-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search social asset genome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-white outline-none focus:border-cyan-400 w-64 sm:w-80"
            />
          </div>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="all">All Platforms</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="x_twitter">X (Twitter)</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>

        <span className="text-xs font-mono text-zinc-400">
          Showing <strong className="text-white">{filteredAssets.length}</strong> Social Assets
        </span>
      </div>

      {/* Social Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition relative group shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold text-white">
                  {getPlatformIcon(asset.platform)}
                  <span className="capitalize">{asset.platform}</span>
                  <span className="text-zinc-500 font-normal">· {asset.contentType}</span>
                </div>

                {getVerificationBadge(asset.ownershipDeclaration.verificationStatus)}
              </div>

              {/* ID & Title */}
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  {asset.id}
                </span>
                <h3 className="text-sm font-heading font-black text-white line-clamp-2 mt-0.5">
                  {asset.title}
                </h3>
                <p className="text-xs font-mono text-amber-300 mt-1">
                  By {asset.creatorName} ({asset.creatorHandle})
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-300 line-clamp-2 font-sans leading-relaxed">
                {asset.description}
              </p>

              {/* Engagement Stats Strip */}
              {asset.engagement.views && (
                <div className="grid grid-cols-4 gap-1 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-center font-mono text-[10px]">
                  <div>
                    <span className="text-zinc-500 block">Views</span>
                    <span className="text-white font-bold">{asset.engagement.views.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Likes</span>
                    <span className="text-pink-400 font-bold">{asset.engagement.likes?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Shares</span>
                    <span className="text-cyan-400 font-bold">{asset.engagement.shares?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Eng. Rate</span>
                    <span className="text-emerald-400 font-bold">{asset.engagement.engagementRatePercent}%</span>
                  </div>
                </div>
              )}

              {/* Transcript Snippet */}
              {asset.transcriptSample && (
                <div className="p-2.5 rounded-xl bg-black border border-zinc-800 text-[10px] font-mono text-zinc-400 leading-relaxed line-clamp-2">
                  <span className="text-cyan-400 font-bold">Transcript: </span>
                  {asset.transcriptSample}
                </div>
              )}

              {/* Commercial Valuation */}
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Estimated Asset Value</span>
                  <span className="text-white font-bold">
                    ${asset.metrics.commercialValueUsd.toLocaleString()} USD
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 block font-bold">Creator 70% Cut</span>
                  <span className="text-emerald-300 font-bold">
                    ₦{(asset.metrics.commercialValueUsd * 0.7 * 1500).toLocaleString()} NGN
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  onClick={() => onTriggerMultiply(asset.id)}
                  className="py-2 px-3 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Multiply (1→10)</span>
                </button>

                <button
                  onClick={() => onTriggerEnterprise(asset.id)}
                  className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>To Enterprise</span>
                </button>
              </div>

              <a
                href={asset.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-1.5 text-center text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition flex items-center justify-center gap-1"
              >
                <span>View Original Source</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
