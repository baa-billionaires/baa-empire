import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Share2,
  Copy,
  Check,
  Coins,
  Users,
  QrCode,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
  Gift,
  Award,
  DollarSign,
  Cpu,
  Layers,
  Zap,
  Globe,
  Radio,
  CheckCircle,
  HelpCircle,
  Clock
} from 'lucide-react';

export const ReferralHubPage: React.FC = () => {
  const { profile, wallet, referrals, addReferralSignBonus, claimReferralBonuses } = useEcosystem();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'links' | 'stats' | 'campaigns' | 'simulator'>('links');
  const [customTag, setCustomTag] = useState('campus-ambassador');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedQrUrl, setSelectedQrUrl] = useState('');
  const [claimSuccessMessage, setClaimSuccessMessage] = useState<string | null>(null);

  // Simulator state
  const [simName, setSimName] = useState('Chidera Nwosu');
  const [simTarget, setSimTarget] = useState<'academy' | 'marketplace' | 'node'>('academy');
  const [simChannel, setSimChannel] = useState('WhatsApp Broadcast');
  const [simFeedback, setSimFeedback] = useState<string | null>(null);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://billionairesai.academy';
  const refCode = profile.referral_code || 'BAA-SOVEREIGN-2026';

  const shareLinks = {
    academy: `${baseUrl}/#academy?ref=${refCode}`,
    marketplace: `${baseUrl}/#marketplace?ref=${refCode}`,
    nodeLab: `${baseUrl}/#uadc-lab?ref=${refCode}`,
    wallet: `${baseUrl}/#wallet?ref=${refCode}`,
    custom: `${baseUrl}/#academy?ref=${refCode}&source=${customTag}`
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleShareWhatsApp = (url: string, title: string) => {
    const text = encodeURIComponent(
      `🚀 Join me at Billionaires AI Academy! Unlock 10x your course price in BaaCoin ($990 USD Networth) and learn autonomous AI agent commerce. Click here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = (url: string) => {
    const text = encodeURIComponent(
      `Mint sovereign intelligence with Billionaires AI Academy and turn idle phone CPU into money nodes on UADC Base L2 protocol! #BaaCoin #AIAfrica\n\n${url}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareTelegram = (url: string) => {
    const text = encodeURIComponent(`Billionaires AI Academy — Sovereign African AI & BaaCoin Ecosystem:`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  };

  const totalReferrals = referrals.length;
  const unpaidReferrals = referrals.filter(r => !r.paid);
  const pendingBaaBonuses = unpaidReferrals.reduce((sum, r) => sum + (r.baacoin_bonus || 0), 0);
  const totalEarnedBaa = referrals.reduce((sum, r) => sum + (r.baacoin_bonus || 0), 0);

  const handleClaim = () => {
    const res = claimReferralBonuses();
    if (res.success) {
      setClaimSuccessMessage(`Successfully claimed ${res.claimedAmount} BAA directly into your spendable wallet!`);
      setTimeout(() => setClaimSuccessMessage(null), 6000);
    } else {
      setClaimSuccessMessage('All earned referral bonuses have already been claimed to your wallet.');
      setTimeout(() => setClaimSuccessMessage(null), 4000);
    }
  };

  const handleRunSimulator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName.trim()) return;

    const res = addReferralSignBonus(simName, simChannel, simTarget);
    setSimFeedback(
      `Verified new sign-up: "${simName}" via ${simChannel}! +${res.bonusBaa} BaaCoin bonus generated and added to your referral ledger.`
    );
    setTimeout(() => setSimFeedback(null), 6000);
    setSimName('');
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold mb-3">
              <Gift className="w-3.5 h-3.5" />
              <span>SOVEREIGN MULTI-TIER REFERRAL HUB</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Refer &amp; Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-amber-300 to-emerald-400">BaaCoin Dividends</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
              Generate unique sharing links for the Academy, Marketplace, and UADC Phone Mining. Automatically track sign-ups, node entanglements, and claim instant BaaCoin bonuses.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-6 font-mono text-xs shrink-0">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">YOUR REFERRAL ID</span>
              <span className="text-white font-bold text-sm text-[#FFD700]">{refCode}</span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block">PENDING BONUSES</span>
              <span className="text-emerald-400 font-bold text-sm">+{pendingBaaBonuses} BAA</span>
            </div>
          </div>
        </div>

        {/* Claim Alert Banner */}
        {claimSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fade-in shadow-xl">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{claimSuccessMessage}</span>
          </div>
        )}

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">TOTAL INVITED FRIENDS</span>
            <div className="text-2xl font-heading font-black text-white">{totalReferrals} Students</div>
            <span className="text-[10px] font-mono text-emerald-400">● 100% On-chain Verified</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">LIFETIME BAA BONUS</span>
            <div className="text-2xl font-heading font-black text-[#FFD700]">{totalEarnedBaa.toLocaleString()} BAA</div>
            <span className="text-[10px] font-mono text-zinc-400">≈ ${(totalEarnedBaa * 1.02).toFixed(2)} USD</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">UNCLAIMED REWARDS</span>
            <div className="text-2xl font-heading font-black text-emerald-400">{pendingBaaBonuses} BAA</div>
            <span className="text-[10px] font-mono text-zinc-400">Available to unlock immediately</span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-zinc-950 border border-emerald-500/40 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">INSTANT WALLET PAYOUT</span>
            <button
              onClick={handleClaim}
              disabled={pendingBaaBonuses === 0}
              className={`w-full py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition ${
                pendingBaaBonuses > 0
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:brightness-110 shadow-lg shadow-emerald-500/20 active:scale-95'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              Claim {pendingBaaBonuses} BAA to Wallet
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 gap-2 overflow-x-auto no-scrollbar font-mono text-xs">
          <button
            onClick={() => setActiveTab('links')}
            className={`pb-3 px-4 font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'links'
                ? 'border-[#FFD700] text-[#FFD700]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Unique Sharing Links</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 px-4 font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-[#00D4FF] text-[#00D4FF]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3-Tier Reward Structure</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`pb-3 px-4 font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'campaigns'
                ? 'border-purple-400 text-purple-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Custom Campaign Links</span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`pb-3 px-4 font-bold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>🧪 Sign-up Simulator Tool</span>
          </button>
        </div>

        {/* TAB 1: UNIQUE SHARING LINKS */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Academy Sharing Link */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700]/50 transition space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">Academy &amp; 100 AI Courses</h3>
                      <span className="text-[10px] font-mono text-zinc-500">Student Onboarding + 10x Networth</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    +50 BAA per Student
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Direct friends to enroll in 100 AI courses. They get $990 USD in locked BaaCoin networth, and you instantly receive 50 BAA + 10% of their networth unlock!
                </p>

                <div className="p-3 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 truncate">
                  {shareLinks.academy}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => copyToClipboard(shareLinks.academy, 'academy')}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-white transition flex items-center justify-center gap-1.5"
                  >
                    {copiedKey === 'academy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'academy' ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQrUrl(shareLinks.academy);
                      setIsQrModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 transition"
                    title="Show QR Code"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(shareLinks.academy, 'Academy')}
                    className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleShareTwitter(shareLinks.academy)}
                    className="py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/40 text-xs font-bold transition"
                  >
                    <span>X</span>
                  </button>
                </div>
              </div>

              {/* Marketplace Sharing Link */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#00D4FF]/50 transition space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">Global Dual Marketplace</h3>
                      <span className="text-[10px] font-mono text-zinc-500">Cars, Solar, Amazon Bridge &amp; Prompts</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[10px] font-mono font-bold border border-[#00D4FF]/30">
                    5% Perpetual CashBack
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Share the marketplace where users buy cars, off-grid solar, and products from Amazon/Alibaba using BaaCoin at 15% discount. You earn 5% cashback on all checkouts!
                </p>

                <div className="p-3 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 truncate">
                  {shareLinks.marketplace}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => copyToClipboard(shareLinks.marketplace, 'marketplace')}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-white transition flex items-center justify-center gap-1.5"
                  >
                    {copiedKey === 'marketplace' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'marketplace' ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQrUrl(shareLinks.marketplace);
                      setIsQrModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 transition"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(shareLinks.marketplace, 'Marketplace')}
                    className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleShareTwitter(shareLinks.marketplace)}
                    className="py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/40 text-xs font-bold transition"
                  >
                    <span>X</span>
                  </button>
                </div>
              </div>

              {/* UADC Phone Mining Link */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 transition space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">UADC Phone Mining Lab 🧠</h3>
                      <span className="text-[10px] font-mono text-zinc-500">Idle Smartphone Compute Node Entangle</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-mono font-bold border border-purple-500/30">
                    5 BAA / Node Day
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Invite friends to plug their smartphones into our decentralized data center overnight. They earn ₦100–₦500/night while you get 5 BAA daily per entangled node!
                </p>

                <div className="p-3 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 truncate">
                  {shareLinks.nodeLab}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => copyToClipboard(shareLinks.nodeLab, 'nodeLab')}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-white transition flex items-center justify-center gap-1.5"
                  >
                    {copiedKey === 'nodeLab' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'nodeLab' ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQrUrl(shareLinks.nodeLab);
                      setIsQrModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 transition"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShareWhatsApp(shareLinks.nodeLab, 'UADC Mining')}
                    className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Web3 Sovereign Wallet Link */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/50 transition space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base">BaaCoin Base L2 Wallet</h3>
                      <span className="text-[10px] font-mono text-zinc-500">1:1 Naira Backed + $1.00 Peg</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    Direct Fiat Onramp
                  </span>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Share the wallet interface for users to deposit or withdraw via Paystack Wema Bank, participate in Base L2 staking pools, and track networth unlocks.
                </p>

                <div className="p-3 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 truncate">
                  {shareLinks.wallet}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => copyToClipboard(shareLinks.wallet, 'wallet')}
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-white transition flex items-center justify-center gap-1.5"
                  >
                    {copiedKey === 'wallet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'wallet' ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQrUrl(shareLinks.wallet);
                      setIsQrModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 transition"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleShareTelegram(shareLinks.wallet)}
                    className="py-2 px-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/40 text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Telegram</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Real-Time Referral Log Table */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-white text-base">Your Active Referral Ledger</h3>
                  <p className="text-xs text-zinc-400">Live verified sign-ups attributed to your unique referral code</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{referrals.length} Total Records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                      <th className="py-2 px-3">Student Name</th>
                      <th className="py-2 px-3">Referred ID</th>
                      <th className="py-2 px-3">BaaCoin Bonus</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {referrals.map((r) => (
                      <tr key={r.id} className="hover:bg-zinc-900/40 transition">
                        <td className="py-3 px-3 text-white font-bold">{r.referred_name}</td>
                        <td className="py-3 px-3 text-zinc-500">{r.referred_id}</td>
                        <td className="py-3 px-3 text-[#FFD700] font-black">+{r.baacoin_bonus} BAA</td>
                        <td className="py-3 px-3">
                          {r.paid ? (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/30">
                              Claimed
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] border border-amber-500/30 animate-pulse">
                              Pending Claim
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-zinc-400 text-[11px]">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 3-TIER REWARD STRUCTURE */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-emerald-500/40 space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-black font-black text-[10px] font-mono rounded-bl-xl uppercase">
                  Tier 1 Direct
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-white">Student Enrollment</h3>
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span>Instant Bounty:</span>
                    <span className="text-[#FFD700] font-bold">50 BAA ($50 USD)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span>Networth Share:</span>
                    <span className="text-emerald-400 font-bold">10% of their $990</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Qualification:</span>
                    <span className="text-zinc-400">Any enrolled student</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                  When your referral enrolls, they unlock 10x tuition in BaaCoin Networth ($990 value), and you receive 50 BAA immediately into your ledger.
                </p>
              </div>

              {/* Tier 2 */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-[#00D4FF]/40 space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-[#00D4FF] text-black font-black text-[10px] font-mono rounded-bl-xl uppercase">
                  Tier 2 Commerce
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-white">Marketplace &amp; Bridges</h3>
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span>Cashback Rate:</span>
                    <span className="text-emerald-400 font-bold">5.0% on Checkout</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span>Amazon/Alibaba Bridge:</span>
                    <span className="text-[#00D4FF] font-bold">Commission Split</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Auto Escrow Deals:</span>
                    <span className="text-zinc-400">Cars &amp; Solar Plants</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                  Every time your referred shopper buys a vehicle, off-grid solar system, prompt package, or external Amazon order with BaaCoin, you earn 5% perpetual cashback.
                </p>
              </div>

              {/* Tier 3 */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-purple-500/40 space-y-4 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500 text-white font-black text-[10px] font-mono rounded-bl-xl uppercase">
                  Tier 3 Node Mesh
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-black text-white">UADC Compute Nodes</h3>
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span>Daily Node Bounty:</span>
                    <span className="text-[#FFD700] font-bold">5 BAA / day</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-900">
                    <span>Uptime Required:</span>
                    <span className="text-zinc-400">&gt; 6 hrs charging overnight</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Max Nodes Per User:</span>
                    <span className="text-purple-300">Up to 3 phones</span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed pt-2">
                  When your friends entangle their smartphones in the UADC cluster at night, you collect 5 BAA daily for each phone actively validating transactions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOM CAMPAIGN LINKS */}
        {activeTab === 'campaigns' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
            <div>
              <h3 className="text-xl font-heading font-black text-white">Create Tagged Campaign Tracking Links</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Customize referral sources for specific events, university campuses, TikTok bio links, or WhatsApp broadcast groups.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">CAMPAIGN SOURCE TAG</label>
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white outline-none focus:border-[#FFD700]"
                  placeholder="e.g. uniport-campus or lagos-car-club"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">GENERATED CAMPAIGN LINK</label>
                <div className="p-2.5 bg-black rounded-xl border border-zinc-800 font-mono text-xs text-[#FFD700] truncate">
                  {shareLinks.custom}
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => copyToClipboard(shareLinks.custom, 'custom')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
              >
                {copiedKey === 'custom' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'custom' ? 'Copied Campaign Link!' : 'Copy Campaign Link'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SIGN-UP SIMULATOR TESTING TOOL */}
        {activeTab === 'simulator' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-emerald-500/50 space-y-6 shadow-2xl">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold mb-2">
                <Zap className="w-3 h-3" />
                <span>INTERACTIVE REFERRAL TEST ENGINE</span>
              </div>
              <h3 className="text-xl font-heading font-black text-white">Simulate a New Sign-Up via Your Link</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Test the autonomous referral tracking and see your BaaCoin bonuses credit directly into your ledger in real-time.
              </p>
            </div>

            {simFeedback && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{simFeedback}</span>
              </div>
            )}

            <form onSubmit={handleRunSimulator} className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">STUDENT / FRIEND NAME</label>
                <input
                  type="text"
                  required
                  value={simName}
                  onChange={(e) => setSimName(e.target.value)}
                  placeholder="e.g. Joy Okafor"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">CONVERSION TARGET</label>
                <select
                  value={simTarget}
                  onChange={(e) => setSimTarget(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-emerald-500"
                >
                  <option value="academy">Academy Enrollment (+50 BAA)</option>
                  <option value="marketplace">Marketplace Buyer (+35 BAA)</option>
                  <option value="node">UADC Compute Phone Node (+25 BAA)</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">ACQUISITION CHANNEL</label>
                <select
                  value={simChannel}
                  onChange={(e) => setSimChannel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-emerald-500"
                >
                  <option value="WhatsApp Broadcast">WhatsApp Broadcast</option>
                  <option value="X / Twitter Post">X / Twitter Post</option>
                  <option value="Campus Flyer QR">Campus Flyer QR</option>
                  <option value="Direct Word of Mouth">Direct Word of Mouth</option>
                </select>
              </div>

              <div className="sm:col-span-3 pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Execute Simulated Conversion &amp; Mint Bonus</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* QR Code Modal */}
        {isQrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-700 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
              >
                ✕
              </button>

              <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] mx-auto">
                <QrCode className="w-6 h-6" />
              </div>

              <h3 className="font-heading font-black text-white text-lg">Your Unique Referral QR Code</h3>
              <p className="text-xs text-zinc-400">
                Scan with any smartphone camera to open your referral link instantly.
              </p>

              {/* High Contrast Simulated QR Visual */}
              <div className="p-4 bg-white rounded-2xl mx-auto w-48 h-48 flex flex-col items-center justify-center shadow-lg">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 || i % 7 === 0 || i < 8 || i > 28) ? 'bg-black' : 'bg-zinc-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-[10px] font-mono text-zinc-500 break-all px-2">
                {selectedQrUrl}
              </div>

              <button
                onClick={() => copyToClipboard(selectedQrUrl, 'modalQr')}
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                {copiedKey === 'modalQr' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'modalQr' ? 'Copied URL!' : 'Copy Destination URL'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ReferralHubPage;
