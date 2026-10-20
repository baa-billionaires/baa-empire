import React, { useState } from 'react';
import { Logo } from './Logo';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Coins,
  Radar,
  Lock,
  Unlock,
  Shield,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Cpu,
  GraduationCap,
  Store,
  Compass,
  Gift,
  Radio,
  Briefcase,
  Brain
} from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  openAdminModal
}) => {
  const { profile, isAdmin, scoutStats, customLogoUrl } = useEcosystem();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'wallet', label: 'Wallet 🪙', icon: Coins, badge: 'BASE' },
    { id: 'uadc-lab', label: 'UADC Lab 🧠', icon: Brain, badge: 'NEW' },
    { id: 'investor-one-pager', label: 'Investor Deck', icon: Sparkles, badge: 'SEED' },
    { id: 'academy', label: 'Academy (100 Courses)', icon: BookOpen },
    { id: 'tv', label: 'AI TV', icon: Radio, badge: '24/7' },
    { id: 'bounties', label: 'Bounties', icon: Briefcase, badge: '₦150k' },
    { id: 'university', label: 'University', icon: GraduationCap },
    { id: 'datacenter', label: 'AI Data Center', icon: Cpu },
    { id: 'marketplace', label: 'Marketplace', icon: Store, badge: '60/40' },
    { id: 'tools', label: 'AI Tools', icon: Sparkles },
    { id: 'ebooks', label: 'Ebooks', icon: BookOpen },
    { id: 'free', label: 'Free Magnets', icon: Gift, badge: 'FREE' },
  ];

  const handleNav = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-zinc-800/80">
      {/* Top Autonomous Live Ticker Bar */}
      <div className="bg-gradient-to-r from-black via-zinc-950 to-black px-4 py-1.5 border-b border-zinc-800/60 text-[11px] font-mono flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
        {/* BaaCoin Ticker */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav('wallet')}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 font-bold hover:bg-[#FFD700]/20 transition cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5 text-[#FFD700] animate-spin-slow" />
            BAACOIN: $1.00 USD
          </button>
          <span className="text-zinc-500 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline">10x Tuition Networth Enforced</span>
        </div>

        {/* AI Scout Recruiter Live Count */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
            <Radar className="w-3.5 h-3.5 text-[#00D4FF] animate-pulse" />
            <span className="font-semibold">AI Scout Discovered:</span>
            <span className="text-white font-bold">{scoutStats.discovered.toLocaleString()}</span>
          </div>
          <span className="text-emerald-400 hidden md:inline font-semibold">
            ● Contacted {scoutStats.contacted}
          </span>
        </div>

        {/* Student Quick Networth Summary */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleNav('wallet')}
            className="flex items-center gap-1.5 hover:text-white transition text-zinc-300 cursor-pointer"
          >
            {profile.baacoin_locked ? (
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Lock className="w-3 h-3" /> Networth: {profile.baacoin_networth} BaaCoin (${profile.baacoin_networth})
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Unlock className="w-3 h-3" /> Balance: {profile.baacoin_balance} BaaCoin
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNav('home')}
          className="focus:outline-none transition hover:opacity-90 shrink-0"
        >
          <Logo size="md" variant="full" showText={true} customLogoUrl={customLogoUrl} />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`relative px-3 py-2 text-xs font-semibold tracking-wide rounded-lg transition flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#FFD700] bg-zinc-900 border border-[#FFD700]/30 shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00D4FF]/20 text-[#00D4FF] font-mono border border-[#00D4FF]/30 font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {/* Student Dashboard Button */}
          <button
            onClick={() => handleNav('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              currentPage === 'dashboard'
                ? 'bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black shadow-lg shadow-[#FFD700]/25'
                : 'bg-zinc-900 text-[#FFD700] hover:bg-zinc-800 border border-[#FFD700]/30'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span className="hidden sm:inline">Student Portal</span>
            <span className="sm:hidden">Dashboard</span>
          </button>

          {/* Admin Vault / SuperAdmin Badge & Quick Launcher */}
          {isAdmin ? (
            <div className="relative group">
              <button
                onClick={() => handleNav('admin')}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/80 transition shadow-lg shadow-emerald-950/40"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin Hub</span>
              </button>

              {/* Hover Dropdown for Admin Tools */}
              <div className="absolute right-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-2 hidden group-hover:block z-50 animate-fade-in font-mono text-xs">
                <div className="p-2 border-b border-zinc-800 text-[10px] text-zinc-400 uppercase tracking-wider font-bold flex items-center justify-between">
                  <span>Autonomous Engines</span>
                  <span className="text-emerald-400">ADMIN ONLY</span>
                </div>
                <div className="py-1 space-y-0.5">
                  <button
                    onClick={() => handleNav('admin')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>🏛️</span>
                    <span>Admin Vault &amp; SQL Schema</span>
                  </button>
                  <button
                    onClick={() => handleNav('marketing')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>🎯</span>
                    <span>Marketing Command (Ads)</span>
                  </button>
                  <button
                    onClick={() => handleNav('social')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>📡</span>
                    <span>Social Media Autopilot</span>
                  </button>
                  <button
                    onClick={() => handleNav('whatsapp-closer')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>🤖</span>
                    <span>WhatsApp AI Closer</span>
                  </button>
                  <button
                    onClick={() => handleNav('whatsapp-broadcast')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>💬</span>
                    <span>WhatsApp Broadcast</span>
                  </button>
                  <button
                    onClick={() => handleNav('course-studio')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>🎬</span>
                    <span>AI Course Video Studio</span>
                  </button>
                  <button
                    onClick={() => handleNav('bulk-videos')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>⚡</span>
                    <span>Bulk 100 Course Generator</span>
                  </button>
                  <button
                    onClick={() => handleNav('translations')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-zinc-900 text-white transition flex items-center gap-2"
                  >
                    <span>🌍</span>
                    <span>Pan-African Translations</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition border bg-zinc-900/90 border-zinc-700 hover:border-[#00D4FF]/50 text-zinc-300 hover:text-white"
              title="Admin Portal Login"
            >
              <Lock className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="hidden md:inline">Admin Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'text-[#FFD700] bg-zinc-900 border border-[#FFD700]/30'
                    : 'text-zinc-300 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-[#00D4FF]" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#00D4FF]/20 text-[#00D4FF] font-mono border border-[#00D4FF]/30">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-zinc-800/80 flex gap-2">
            <button
              onClick={() => handleNav('dashboard')}
              className="flex-1 py-2.5 bg-[#FFD700] text-black font-bold text-xs uppercase tracking-wider rounded-lg text-center"
            >
              Student Portal & Mining
            </button>
            <button
              onClick={() => {
                if (isAdmin) handleNav('admin');
                else openAdminModal();
              }}
              className="px-4 py-2.5 bg-zinc-900 border border-zinc-700 text-[#00D4FF] font-mono text-xs rounded-lg"
            >
              {isAdmin ? 'Vault' : 'Admin'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
