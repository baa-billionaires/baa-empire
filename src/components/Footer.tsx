import React from 'react';
import { Logo } from './Logo';
import { useEcosystem } from '../context/EcosystemContext';
import { Coins, Cpu, GraduationCap, ShieldCheck, Heart, Sparkles, Terminal } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, openAdminModal }) => {
  const { customLogoUrl, scoutStats } = useEcosystem();

  return (
    <footer className="w-full bg-black border-t border-zinc-800 text-zinc-400 text-sm">
      {/* Top Banner with Autonomous Ecosystem Summary */}
      <div className="border-b border-zinc-900 bg-zinc-950/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700] shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">BaaCoin 10x Networth</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Every $99 course automatically yields 990 BaaCoin networth ($990 locked until graduation).</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">60/40 Prompt Marketplace</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Graduates' learning prompts are compiled into marketplace assets earning 60% perpetual royalties.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3.5 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Autonomous Data Center</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Self-healing African GPU clusters powered by 100% renewable solar &amp; hydro energy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" variant="full" showText={true} customLogoUrl={customLogoUrl} />
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Billionaires AI Academy, Africa Blockchain &amp; AI University, and Universal Autonomous AI Data Center form Africa's premier trillion-dollar autonomous knowledge and infrastructure engine.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                AI Scout Active: {scoutStats.discovered.toLocaleString()} Leads
              </span>
            </div>
          </div>

          {/* Academy & Courses */}
          <div>
            <h5 className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider mb-3">Pillars &amp; Academy</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('academy')} className="hover:text-white transition">
                  100 Master Courses
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('tv')} className="text-red-400 hover:text-red-300 font-semibold transition">
                  AI TV Network (24/7 Live)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('bounties')} className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                  ₦150k Bounties &amp; Shares
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('university')} className="hover:text-white transition">
                  Africa Blockchain University
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('datacenter')} className="hover:text-white transition">
                  Autonomous AI Data Center
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('free')} className="text-amber-400 hover:text-amber-300 font-semibold transition">
                  7 Free Wealth Magnets
                </button>
              </li>
            </ul>
          </div>

          {/* Marketplace & Tools */}
          <div>
            <h5 className="text-xs font-mono font-bold text-[#00D4FF] uppercase tracking-wider mb-3">Marketplace &amp; Tech</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('marketplace')} className="hover:text-white transition">
                  Prompt Marketplace (60/40)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('marketplace')} className="hover:text-white transition">
                  Plug &amp; Play AI Tutors
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('marketplace')} className="hover:text-white transition">
                  Tradable NFT Certificates
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('tools')} className="hover:text-white transition">
                  30 AI Tools Library
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('ebooks')} className="hover:text-white transition">
                  50 Ebooks Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Student & Admin Portal */}
          <div>
            <h5 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-3">Portals &amp; Vault</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('dashboard')} className="hover:text-white text-[#FFD700] font-medium transition">
                  Student Portal &amp; Mining
                </button>
              </li>
              <li>
                <button onClick={openAdminModal} className="hover:text-white flex items-center gap-1.5 transition">
                  <span>RichConnect Vault Login</span>
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('marketing')} className="text-zinc-400 hover:text-white transition">
                  Marketing Command
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('whatsapp-closer')} className="text-zinc-400 hover:text-white transition">
                  WhatsApp AI Closer
                </button>
              </li>
              <li className="pt-2">
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Admin: naijaukmusicalfusion@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Billionaires AI Academy &amp; Africa Blockchain University. Sovereign Intellectual Property.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Solidity • React • Supabase • Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
