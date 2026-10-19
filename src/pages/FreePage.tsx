import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { INITIAL_LEAD_MAGNETS } from '../lib/seed';
import {
  Gift,
  Download,
  CheckCircle,
  Sparkles,
  Zap,
  Coins,
  Radar,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const FreePage: React.FC<{ onNavigateToAcademy: () => void }> = ({ onNavigateToAcademy }) => {
  const { addFreeLead } = useEcosystem();

  const [activeMagnet, setActiveMagnet] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleClaimMagnet = (magnet: any) => {
    setActiveMagnet(magnet);
    setDownloadSuccess(null);
  };

  const handleSubmitCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !activeMagnet) return;

    // Save directly to scout_leads autonomous engine!
    addFreeLead(email.trim(), name.trim(), activeMagnet.title);

    setDownloadSuccess(activeMagnet.id);

    // Trigger instant mock download
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `BILLIONAIRES AI ACADEMY - FREE WEALTH RESOURCE\n\n` +
        `Resource: ${activeMagnet.title}\n` +
        `Description: ${activeMagnet.description}\n` +
        `Recipient: ${name || email}\n` +
        `Date: ${new Date().toLocaleDateString()}\n\n` +
        `WELCOME SCHOLAR!\n` +
        `You have successfully captured Africa's premier autonomous intelligence framework.\n` +
        `To multiply this knowledge by 10 into real BaaCoin Networth ($990 value), join our full Academy:\n` +
        `https://billionairesai.academy/academy`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${activeMagnet.title.replace(/[^a-zA-Z0-9]/g, '_')}_FREE_PACK.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center max-w-3xl">
        <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center mb-2">
          <Gift className="w-4 h-4 text-emerald-400" />
          7 Free Sovereign Wealth Magnets
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
          Free AI &amp; Blockchain Blueprint Library
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
          Download our secret confidential playbooks, copy-paste ChatGPT ATM prompts, and testnet BaaCoin starter tokens with zero obligation.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* 7 Free Magnets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_LEAD_MAGNETS.map((magnet) => (
            <div
              key={magnet.id}
              className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-emerald-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold">
                    {magnet.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    {magnet.downloads.toLocaleString()} claims
                  </span>
                </div>

                <h3 className="text-base font-heading font-bold text-white leading-snug">
                  {magnet.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {magnet.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900">
                <button
                  onClick={() => handleClaimMagnet(magnet)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Claim Instant Download</span>
                </button>
              </div>
            </div>
          ))}

          {/* 7th Big Banner Card */}
          <div className="bg-gradient-to-br from-[#FFD700]/15 via-zinc-950 to-black rounded-2xl border border-[#FFD700]/40 p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 text-[10px] font-mono font-bold">
                10X BAACOIN NETWORTH
              </span>
              <h3 className="text-xl font-heading font-black text-white mt-3">
                Ready to Upgrade from Free to Sovereign Wealth?
              </h3>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                Enroll in any of our 100 master courses. Your $99 tuition automatically yields 990 BaaCoin Networth ($990 locked until graduation).
              </p>
            </div>

            <button
              onClick={onNavigateToAcademy}
              className="mt-6 w-full py-3 rounded-xl bg-[#FFD700] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>Explore 100 Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {activeMagnet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-zinc-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setActiveMagnet(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              ✕
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white">
                Download {activeMagnet.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Enter your details to receive immediate file delivery and your free scholar access pass.
              </p>
            </div>

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Your Download has Started!</h4>
                <p className="text-xs text-emerald-300">
                  We also routed your free scholar pass to your email. Check your downloads folder.
                </p>
                <button
                  onClick={() => setActiveMagnet(null)}
                  className="mt-2 text-xs font-mono text-white underline"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitCapture} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Babajide Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-400 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Send &amp; Download Free</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default FreePage;
