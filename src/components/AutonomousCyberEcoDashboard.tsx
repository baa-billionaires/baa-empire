import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { MULTILINGUAL_TUTOR_SCRIPTS } from '../lib/autonomousData';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from './LanguageChip';
import {
  Sparkles,
  Bot,
  GraduationCap,
  Store,
  Coins,
  Cpu,
  ShieldCheck,
  Send,
  Download,
  FileText,
  Play,
  CheckCircle,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  Globe2,
  RefreshCw,
  Search,
  ExternalLink,
  Flame,
  Layers,
  Check,
  Building,
  DollarSign
} from 'lucide-react';

interface AutonomousCyberEcoDashboardProps {
  onNavigate?: (page: string) => void;
}

export const AutonomousCyberEcoDashboard: React.FC<AutonomousCyberEcoDashboardProps> = ({ onNavigate }) => {
  const {
    profile,
    courses,
    marketplacePrompts,
    buyPrompt,
    language,
    setLanguage,
    baacoinPrice,
    microStartups,
    stakingPools
  } = useEcosystem();

  const [activePillarTab, setActivePillarTab] = useState<'tutor' | 'marketplace' | 'exchange' | 'subentities' | 'pok_ubei'>('tutor');

  // Pillar 1: AI Tutor State
  const [tutorMessages, setTutorMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([]);
  const [userInput, setUserInput] = useState('');
  const [selectedStreamLang, setSelectedStreamLang] = useState<string>('English');
  const [s2eCohortMonth, setS2eCohortMonth] = useState<number>(3); // 1-6 months

  // Pillar 2: Dual Marketplace State
  const [marketplaceFilter, setMarketplaceFilter] = useState<'all' | 'student_prompts' | 'community_items'>('all');
  const [membershipTier, setMembershipTier] = useState<'free' | 'pro' | 'institutional'>('free');
  const [purchasedItemModal, setPurchasedItemModal] = useState<string | null>(null);

  // Pillar 4: ABAU Degree Verifier State
  const [degreeHashInput, setDegreeHashInput] = useState('0x8892BAA117C980A182FbcDE09118cE34988fBaaC');
  const [verifiedStudentCert, setVerifiedStudentCert] = useState<{
    name: string;
    course: string;
    date: string;
    baacoinEngraved: number;
    status: string;
  } | null>(null);

  // Pillar 5: PoK NFT Minter State
  const [pokTitle, setPokTitle] = useState('');
  const [pokAbstract, setPokAbstract] = useState('');
  const [mintedNftResult, setMintedNftResult] = useState<{ id: string; tx: string; value: number } | null>(null);

  // Load initial AI Tutor greeting when language changes
  useEffect(() => {
    const scripts = MULTILINGUAL_TUTOR_SCRIPTS[language] || MULTILINGUAL_TUTOR_SCRIPTS.en;
    setTutorMessages([
      {
        sender: 'ai',
        text: scripts.welcome,
        time: 'Just now'
      },
      {
        sender: 'ai',
        text: scripts.s2e_explanation,
        time: 'Just now'
      }
    ]);
  }, [language]);

  const handleSendTutorMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMsg = { sender: 'user' as const, text: userInput, time: 'Now' };
    const scripts = MULTILINGUAL_TUTOR_SCRIPTS[language] || MULTILINGUAL_TUTOR_SCRIPTS.en;
    setTutorMessages(prev => [...prev, newMsg]);
    setUserInput('');

    setTimeout(() => {
      let reply = scripts.money_engine;
      if (userInput.toLowerCase().includes('trainer') || userInput.toLowerCase().includes('teacher') || userInput.toLowerCase().includes('school')) {
        reply = scripts.trainer_guidance;
      }
      setTutorMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: 'Just now'
        }
      ]);
    }, 700);
  };

  const handleVerifyDegree = (e: React.FormEvent) => {
    e.preventDefault();
    setVerifiedStudentCert({
      name: 'Tariq Sterling (Cohort 3)',
      course: 'B.Sc. Autonomous AI Agent Engineering & Decentralized Commerce',
      date: 'October 2026',
      baacoinEngraved: 990,
      status: 'Cryptographically Verified on Base L2 Blockchain'
    });
  };

  const handleMintPoK = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pokTitle) return;
    setMintedNftResult({
      id: `PoK-NFT-${Date.now().toString().slice(-6)}`,
      tx: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      value: 990
    });
  };

  return (
    <div className="bg-black text-slate-100 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-8 cyber-grid shadow-2xl">
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            5-Pillar Autonomous Educational Economy Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
            Cyber-Academy Sovereign Command Hub
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Where multi-lingual learning automatically mines cryptocurrency, compiles student research into tradeable marketplace prompts, and redistributes autonomous wealth.
          </p>
        </div>

        {/* Pillar Switcher Navigation */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto no-scrollbar gap-1 text-xs font-mono">
          <button
            onClick={() => setActivePillarTab('tutor')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activePillarTab === 'tutor' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>1. AI Tutors &amp; S2E</span>
          </button>

          <button
            onClick={() => setActivePillarTab('marketplace')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activePillarTab === 'marketplace' ? 'bg-[#00D4FF] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>2. Dual Marketplace</span>
          </button>

          <button
            onClick={() => setActivePillarTab('exchange')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activePillarTab === 'exchange' ? 'bg-emerald-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>3. BaaCoin Exchange</span>
          </button>

          <button
            onClick={() => setActivePillarTab('subentities')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activePillarTab === 'subentities' ? 'bg-purple-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>4. ABAU &amp; UAIDC</span>
          </button>

          <button
            onClick={() => setActivePillarTab('pok_ubei')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activePillarTab === 'pok_ubei' ? 'bg-rose-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>5. PoK &amp; UBEI Economy</span>
          </button>
        </div>
      </div>

      {/* PILLAR 1: ACADEMY & MULTI-LINGUAL AI TUTORS */}
      {activePillarTab === 'tutor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Multi-Lingual AI Tutor Chat */}
            <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      Sovereign Multi-Lingual AI Tutor
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400">
                      Fluent in 9 Pan-African &amp; Global Languages
                    </span>
                  </div>
                </div>

                {/* Quick Language Switcher */}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                  className="bg-zinc-900 border border-zinc-700 text-xs font-mono text-[#FFD700] px-2.5 py-1.5 rounded-xl focus:outline-none"
                >
                  {SUPPORTED_LANGUAGES.map(l => (
                    <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                  ))}
                </select>
              </div>

              {/* Chat Message Stream */}
              <div className="bg-black/80 border border-zinc-800 rounded-2xl p-4 h-64 overflow-y-auto space-y-3 font-sans text-xs">
                {tutorMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#FFD700] text-black font-semibold rounded-br-none'
                          : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-600 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendTutorMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder={`Ask anything in ${SUPPORTED_LANGUAGES.find(l => l.code === language)?.name || 'English'}...`}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#F3C200] text-black font-bold transition flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Right: Multi-Lingual Video Stream & Study-to-Earn (S2E) Tracker */}
            <div className="lg:col-span-5 space-y-6">
              {/* Multi-Lingual Video & Translated Audio Selector */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <Play className="w-4 h-4 text-[#00D4FF]" />
                    Multi-Lingual Video &amp; Audio Stream
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">9 Audio Tracks</span>
                </div>

                <div className="p-3 bg-zinc-900 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400">Selected Audio Stream:</span>
                    <select
                      value={selectedStreamLang}
                      onChange={(e) => setSelectedStreamLang(e.target.value)}
                      className="bg-black border border-zinc-700 text-xs text-[#00D4FF] px-2 py-1 rounded-lg"
                    >
                      <option value="English">English 🇬🇧</option>
                      <option value="Swahili">Swahili 🇰🇪</option>
                      <option value="French">Français 🇫🇷</option>
                      <option value="Spanish">Español 🇪🇸</option>
                      <option value="Mandarin">Mandarin 🇨🇳</option>
                      <option value="Yoruba">Yoruba 🇳🇬</option>
                      <option value="Arabic">Arabic 🇸🇦</option>
                      <option value="Hausa">Hausa 🇳🇬</option>
                      <option value="Portuguese">Português 🇵🇹</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => alert(`Downloading AI-Dubbed Audio Track (${selectedStreamLang})...`)}
                      className="flex-1 py-2 px-3 rounded-xl bg-black border border-zinc-700 hover:border-zinc-500 text-[11px] font-mono text-zinc-300 hover:text-white transition flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Download Audio</span>
                    </button>

                    <button
                      onClick={() => alert(`Downloading Synchronized Transcript in ${selectedStreamLang}...`)}
                      className="flex-1 py-2 px-3 rounded-xl bg-black border border-zinc-700 hover:border-zinc-500 text-[11px] font-mono text-zinc-300 hover:text-white transition flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Transcript PDF</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Study-to-Earn (S2E) Tracker */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#FFD700]" />
                    Study-to-Earn (S2E) 6-Month Cohort
                  </span>
                  <span className="text-emerald-400 font-bold">Month {s2eCohortMonth} of 6</span>
                </div>

                {/* Step Slider */}
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FFD700] to-emerald-400 h-full transition-all"
                    style={{ width: `${(s2eCohortMonth / 6) * 100}%` }}
                  />
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  As you complete coursework, our AI Neural Compiler automatically packages your research notes into commercial prompt modules listed in the Marketplace.
                </p>

                <div className="p-3 bg-black/60 rounded-xl border border-zinc-800 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">Mined Prompt Royalty Pool:</span>
                  <span className="text-[#FFD700] font-bold">4 Modules Listed (₦145,000 Mined)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 2: DUAL PROMPT & PRODUCT MARKETPLACE */}
      {activePillarTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-[#00D4FF]" />
                Dual Prompt &amp; Product Marketplace
              </h3>
              <p className="text-xs text-zinc-400">
                Filter between student AI-packaged prompts and verified community vendor workflows.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setMarketplaceFilter('all')}
                className={`px-3 py-1 rounded-xl transition ${marketplaceFilter === 'all' ? 'bg-[#FFD700] text-black font-bold' : 'bg-zinc-900 text-zinc-400'}`}
              >
                All Items
              </button>
              <button
                onClick={() => setMarketplaceFilter('student_prompts')}
                className={`px-3 py-1 rounded-xl transition ${marketplaceFilter === 'student_prompts' ? 'bg-[#00D4FF] text-black font-bold' : 'bg-zinc-900 text-zinc-400'}`}
              >
                Student Prompts (60/40)
              </button>
              <button
                onClick={() => setMarketplaceFilter('community_items')}
                className={`px-3 py-1 rounded-xl transition ${marketplaceFilter === 'community_items' ? 'bg-purple-400 text-black font-bold' : 'bg-zinc-900 text-zinc-400'}`}
              >
                Community Hardware &amp; Workflows
              </button>
            </div>
          </div>

          {/* Membership Tier Tabs */}
          <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-zinc-400">Membership Tier Filter:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setMembershipTier('free')}
                className={`px-3 py-1 rounded-lg ${membershipTier === 'free' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500'}`}
              >
                Free (15% Commission)
              </button>
              <button
                onClick={() => setMembershipTier('pro')}
                className={`px-3 py-1 rounded-lg ${membershipTier === 'pro' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-zinc-500'}`}
              >
                Pro (5% Fee + AI Traffic)
              </button>
              <button
                onClick={() => setMembershipTier('institutional')}
                className={`px-3 py-1 rounded-lg ${membershipTier === 'institutional' ? 'bg-[#FFD700]/20 text-[#FFD700] font-bold border border-[#FFD700]/40' : 'text-zinc-500'}`}
              >
                Institutional (0% Fee)
              </button>
            </div>
          </div>

          {/* Dual Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketplacePrompts.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300">
                      {item.category}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">
                      60% to {item.student_name}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">{item.title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-zinc-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">STANDARD PRICE</span>
                      <span className="text-white font-bold">${item.price} USD</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#FFD700] block font-bold">1-CLICK BAA DISCOUNT</span>
                      <span className="text-emerald-400 font-bold">
                        {(item.price * 0.85).toFixed(0)} BAA (-15%)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      buyPrompt(item.id);
                      setPurchasedItemModal(item.title);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 transition"
                  >
                    1-Click Buy with BAA
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Modal Confirmation */}
          {purchasedItemModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-md w-full p-6 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Purchase Confirmed!</h3>
                <p className="text-xs text-zinc-300">
                  You have unlocked <span className="text-[#FFD700] font-bold">"{purchasedItemModal}"</span> at the 15% $BAA discount. 60% of payment instantly transferred to the student author's wallet.
                </p>
                <button
                  onClick={() => setPurchasedItemModal(null)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs"
                >
                  Close &amp; Access Prompt File
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PILLAR 3: BAACOIN EXCHANGE PREVIEW */}
      {activePillarTab === 'exchange' && (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
                SOVEREIGN LIQUIDITY BRIDGE
              </span>
              <h3 className="text-2xl font-heading font-black text-white mt-1">
                BaaCoin Spot: ${(baacoinPrice || 1.02).toFixed(4)} USD (+12.4%)
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Backed by Base L2 smart contract and instant Paystack ₦1,500 bank redemption.
              </p>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('exchange')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-2"
              >
                <span>Open Full Trading Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">24H TRADING VOLUME</span>
              <span className="text-xl font-bold text-white mt-1 block">$482,900 USD</span>
              <span className="text-[10px] text-emerald-400 mt-1 block">99.8% Uniswap V3 + Base L2</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">PERPETUAL BUYBACK TREASURY</span>
              <span className="text-xl font-bold text-[#FFD700] mt-1 block">$184,250 USD</span>
              <span className="text-[10px] text-zinc-400 mt-1 block">Auto-buys &amp; burns on every fee</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">STAKING POOLS APY</span>
              <span className="text-xl font-bold text-emerald-400 mt-1 block">34.2% - 42.8%</span>
              <span className="text-[10px] text-zinc-400 mt-1 block">Distributed daily at midnight UTC</span>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 4: SUB-ENTITIES (ABAU DEGREE VERIFIER & UAIDC) */}
      {activePillarTab === 'subentities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ABAU On-Chain Degree Verifier */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold">
                  AFRICA BLOCKCHAIN &amp; AI UNIVERSITY
                </span>
                <h3 className="text-xl font-bold text-white mt-1">On-Chain Degree &amp; Credential Validator</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Verify authentic student degrees cryptographically on the Base L2 smart contract.
                </p>
              </div>

              <form onSubmit={handleVerifyDegree} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">ENTER STUDENT CERTIFICATE HASH</label>
                  <input
                    type="text"
                    value={degreeHashInput}
                    onChange={(e) => setDegreeHashInput(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-bold uppercase transition"
                >
                  Verify Cryptographic Degree
                </button>
              </form>

              {verifiedStudentCert && (
                <div className="p-4 rounded-2xl bg-black border border-purple-500/40 font-mono text-xs space-y-2 animate-fade-in">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{verifiedStudentCert.status}</span>
                  </div>
                  <div className="text-white font-bold">{verifiedStudentCert.name}</div>
                  <div className="text-zinc-400 text-[11px]">{verifiedStudentCert.course}</div>
                  <div className="text-[#FFD700] text-[11px]">
                    Engraved Capital: {verifiedStudentCert.baacoinEngraved} BaaCoin ($990 USD)
                  </div>
                </div>
              )}
            </div>

            {/* UAIDC Cluster GPU Telemetry */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  UNIVERSAL AUTONOMOUS AI DATA CENTER
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Live GPU Node Cluster Allocation</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Real-time compute telemetry across Port Harcourt, Lagos, and 2,400+ student phone nodes.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-zinc-900 rounded-xl flex justify-between">
                  <span className="text-zinc-400">Total Compute Nodes:</span>
                  <span className="text-white font-bold">2,412 Active</span>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl flex justify-between">
                  <span className="text-zinc-400">Total Compute Power:</span>
                  <span className="text-[#00D4FF] font-bold">14.8 PFLOPS (H100 + Phone Mesh)</span>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl flex justify-between">
                  <span className="text-zinc-400">Average Node Earnings:</span>
                  <span className="text-[#FFD700] font-bold">₦350 - ₦800 / night per node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PILLAR 5: PROOF-OF-KNOWLEDGE (PoK) NFT & UBEI VAULT */}
      {activePillarTab === 'pok_ubei' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Proof-of-Knowledge (PoK) NFT Minter */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold">
                  INTELLECTUAL PROPERTY TOKENIZATION
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Proof-of-Knowledge (PoK) Dynamic NFT Minter</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Convert student capstone research into tradeable IP NFTs on Base L2 blockchain.
                </p>
              </div>

              <form onSubmit={handleMintPoK} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1">RESEARCH / PROMPT TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Cocoa Bean Disease AI Vision"
                    value={pokTitle}
                    onChange={(e) => setPokTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">EXECUTIVE SUMMARY</label>
                  <textarea
                    rows={2}
                    placeholder="Brief methodology and prompt structure..."
                    value={pokAbstract}
                    onChange={(e) => setPokAbstract(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-rose-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-bold uppercase transition"
                >
                  Mint Proof-of-Knowledge NFT
                </button>
              </form>

              {mintedNftResult && (
                <div className="p-4 rounded-2xl bg-black border border-rose-500/40 font-mono text-xs space-y-2 animate-fade-in">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>IP NFT Successfully Minted!</span>
                  </div>
                  <div className="text-white">NFT ID: {mintedNftResult.id}</div>
                  <div className="text-zinc-500 text-[10px]">Tx: {mintedNftResult.tx}</div>
                  <div className="text-[#FFD700]">Locked Valuation: 990 BaaCoin ($990 USD)</div>
                </div>
              )}
            </div>

            {/* Universal Basic Education Income (UBEI) Vault */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-5">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  AUTONOMOUS FEE-REDISTRIBUTION ENGINE
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Universal Basic Education Income (UBEI) Vault</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  15% of all ecosystem revenues are autonomously redistributed to students who log in and learn daily.
                </p>
              </div>

              <div className="p-5 bg-zinc-900 rounded-2xl font-mono text-xs space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-zinc-500">Total UBEI Distributed:</span>
                  <span className="text-2xl font-black text-emerald-400">$1,428,500 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Active Daily Learners:</span>
                  <span className="text-white font-bold">2,400 Students</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Your Today's UBEI Share:</span>
                  <span className="text-[#FFD700] font-bold">+$12.50 USD (Credited to Wallet)</span>
                </div>
              </div>

              {/* AI Micro-Startup Swarm Showcase */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  INCUBATED MICRO-STARTUP SWARMS
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  {microStartups.map(s => (
                    <div key={s.id} className="p-2.5 rounded-xl bg-black border border-zinc-800 flex justify-between items-center">
                      <div>
                        <span className="text-white font-bold block">{s.name}</span>
                        <span className="text-[10px] text-zinc-500">{s.prompt_origin_title}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold block">${s.mrr_usd}/mo MRR</span>
                        <span className="text-[10px] text-zinc-400">{s.growth_rate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
