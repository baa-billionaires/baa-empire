import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, ExternalLink, Coins } from 'lucide-react';

interface InternalAdRendererProps {
  position: 'homepage_hero' | 'dashboard_banner' | 'tv_interstitial';
  onCtaClick?: () => void;
}

export const InternalAdRenderer: React.FC<InternalAdRendererProps> = ({ position, onCtaClick }) => {
  const [dismissed, setDismissed] = useState(false);
  const [clicks, setClicks] = useState(142);

  if (dismissed) return null;

  const adsByPosition = {
    homepage_hero: {
      title: "EXCLUSIVE SCHOLARSHIP: 10X BAACOIN NETWORTH ENFORCED",
      description: "Enroll in any of the 100 mastercourses today and immediately claim up to 2,990 BaaCoin in locked networth collateral.",
      badge: "LIMITED COHORT 2026",
      cta: "Claim 10x Networth",
      gradient: "from-[#FFD700]/20 via-zinc-950 to-black",
      border: "border-[#FFD700]/40"
    },
    dashboard_banner: {
      title: "SPONSOR BOUNTY: ₦150,000 WhatsApp Closer Agent",
      description: "Sterling FinTech Lagos has an active commercial bounty open. Build a WhatsApp closer bot and claim 60% cash payout instantly.",
      badge: "PAID BOUNTY",
      cta: "Inspect Bounty",
      gradient: "from-emerald-950/40 via-zinc-950 to-black",
      border: "border-emerald-500/40"
    },
    tv_interstitial: {
      title: "HIRE PROF. ADAEZE AI FOR YOUR SCHOOL PORTAL",
      description: "Over 42 universities have embedded Prof. Adaeze AI for $99/mo. Deliver 24/7 autonomous computer science tutoring to 10,000 students.",
      badge: "INSTITUTIONAL AI",
      cta: "Get Iframe Code",
      gradient: "from-[#00D4FF]/20 via-zinc-950 to-black",
      border: "border-[#00D4FF]/40"
    }
  };

  const ad = adsByPosition[position];

  const handleClick = () => {
    setClicks(clicks + 1);
    if (onCtaClick) onCtaClick();
  };

  return (
    <div className={`relative w-full rounded-2xl bg-gradient-to-r ${ad.gradient} border ${ad.border} p-4 sm:p-5 shadow-xl my-4 text-slate-100`}>
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 text-zinc-500 hover:text-white p-1 rounded-lg transition"
        title="Dismiss ad"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-[9px] font-mono font-bold tracking-wider">
              {ad.badge}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">Sponsored Internal Ad</span>
          </div>
          <h4 className="font-heading font-black text-sm text-white sm:text-base">
            {ad.title}
          </h4>
          <p className="text-xs text-zinc-300 max-w-2xl font-sans">
            {ad.description}
          </p>
        </div>

        <button
          onClick={handleClick}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 shrink-0 shadow-md shadow-[#FFD700]/20"
        >
          <span>{ad.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default InternalAdRenderer;
