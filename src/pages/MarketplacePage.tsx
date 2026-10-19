import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { PromptMarketplaceItem, AITutor, CertificateNFT } from '../types';
import {
  Store,
  Sparkles,
  Bot,
  Award,
  Cpu,
  Coins,
  CheckCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  Code2,
  Share2,
  DollarSign
} from 'lucide-react';

interface MarketplacePageProps {
  onSelectTutor: (tutorId: string) => void;
  onSelectCertificate: (cert: CertificateNFT) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onSelectTutor,
  onSelectCertificate
}) => {
  const {
    marketplacePrompts,
    aiTutors,
    certificates,
    aiTools,
    buyPrompt,
    profile
  } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'prompts' | 'tutors' | 'certificates' | 'tools'>('prompts');
  const [search, setSearch] = useState('');
  const [purchasedPromptId, setPurchasedPromptId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [selectedPromptToView, setSelectedPromptToView] = useState<PromptMarketplaceItem | null>(null);

  // Filter items
  const filteredPrompts = marketplacePrompts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.student_name.toLowerCase().includes(search.toLowerCase()) ||
    p.course_title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTutors = aiTutors.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyPromptAction = (p: PromptMarketplaceItem) => {
    buyPrompt(p.id);
    setPurchasedPromptId(p.id);
    setSelectedPromptToView(p);
  };

  const handleCopyPromptText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <Store className="w-4 h-4 text-[#00D4FF]" />
            Autonomous Decentralized Exchange
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            The 60/40 Autonomous Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Where student intelligence becomes perpetual digital assets. Buy tested student prompts (60% paid to author), hire autonomous AI Tutors for schools, or trade NFT certificates with embedded BaaCoin chips.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl self-center sm:self-auto shrink-0 text-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'prompts'
                ? 'bg-[#FFD700] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompts (60/40)</span>
          </button>

          <button
            onClick={() => setActiveTab('tutors')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'tutors'
                ? 'bg-[#00D4FF] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Tutors</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'certificates'
                ? 'bg-[#FFD700] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Certificates NFT</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'tools'
                ? 'bg-[#00D4FF] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Tools</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-[#FFD700] rounded-xl text-xs text-white placeholder-zinc-500 font-mono outline-none"
          />
        </div>

        {/* TAB 1: PROMPTS (60/40) */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#FFD700]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">
                    Autonomous 60/40 Royalty Contract Enforced
                  </h4>
                  <p className="text-xs text-zinc-400">
                    When you purchase a prompt: 60% of the price is instantly routed to the student graduate's wallet, and 40% to the university autonomous treasury.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((p) => {
                const isAuthor = p.user_id === profile.id;

                return (
                  <div
                    key={p.id}
                    className="bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#FFD700]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-[#00D4FF] font-bold">{p.category}</span>
                        <span className="text-[#FFD700] font-black text-sm">${p.price} USD</span>
                      </div>

                      <h3 className="font-heading font-bold text-white text-base leading-snug">
                        {p.title}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5 text-[11px] font-mono text-zinc-400">
                        <div className="flex justify-between">
                          <span>Author:</span>
                          <span className="text-white font-medium truncate max-w-[160px]">{p.student_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Origin:</span>
                          <span className="text-zinc-300 truncate max-w-[160px]">{p.course_title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Student Share (60%):</span>
                          <span className="text-emerald-400 font-bold">${(p.price * 0.6).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Share (40%):</span>
                          <span className="text-zinc-500">${(p.price * 0.4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-zinc-800 text-zinc-300">
                          <span>Total Sales:</span>
                          <span className="text-[#FFD700] font-bold">{p.sales} purchases</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-900 flex gap-2">
                      <button
                        onClick={() => handleBuyPromptAction(p)}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5"
                      >
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Buy Prompt (${p.price})</span>
                      </button>

                      <button
                        onClick={() => setSelectedPromptToView(p)}
                        className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: AI TUTORS (PLUG & PLAY) */}
        {activeTab === 'tutors' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#00D4FF]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase">
                  Plug &amp; Play Autonomous AI Tutors for Schools
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Schools and universities embed our AI professors via a 1-line iframe code for $99/mo. 24/7 student tutoring with autonomous billing verification.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-[#00D4FF]/50 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-zinc-800">
                      <img
                        src={tutor.avatar_url}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Active
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider block">
                      {tutor.subject}
                    </span>
                    <h3 className="font-heading font-bold text-white text-base mt-1">
                      {tutor.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {tutor.specialty}
                    </p>

                    <div className="mt-3 text-[11px] font-mono text-zinc-400">
                      <span>Hired by: </span>
                      <span className="text-white font-bold">{tutor.hired_by_schools} Institutions</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-900 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">School License:</span>
                      <span className="text-[#FFD700] font-bold">${tutor.price_monthly}/mo</span>
                    </div>

                    <button
                      onClick={() => onSelectTutor(tutor.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5 fill-black" />
                      <span>Get Embed Iframe Code</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATES NFT (TRADABLE) */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#FFD700]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FFD700] uppercase">
                  Verified On-Chain NFT Certificates with BaaCoin Chips
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Official certificates contain embedded BaaCoin collateral chips and lifetime 10% referral earning mechanisms.
                </p>
              </div>
            </div>

            {certificates.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono text-xs">
                No graduate certificates listed in secondary trading yet. Complete any course 100% in the Academy to mint your sovereign certificate!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-[#FFD700]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN</span>
                        <span className="text-[#FFD700] font-bold">{cert.baacoin_engraved} BAACOIN</span>
                      </div>

                      <h3 className="font-heading font-bold text-white text-base">
                        {cert.course_title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">
                        Graduate: {cert.student_name}
                      </p>

                      <div className="mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono space-y-1 text-zinc-400">
                        <div className="truncate">Token ID: {cert.nft_id}</div>
                        <div>Issued: {cert.issue_date}</div>
                        <div className="text-emerald-400">Embedded 10% Referral: Active</div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-zinc-900 flex gap-2">
                      <button
                        onClick={() => onSelectCertificate(cert)}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                      >
                        Inspect &amp; Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TOOLS */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiTools.slice(0, 9).map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-base font-bold text-white font-heading">{t.name}</h4>
                  <span className="text-xs font-mono text-[#00D4FF]">${t.price_monthly}/mo</span>
                </div>
                <p className="text-xs text-zinc-400">{t.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Prompt Modal */}
      {selectedPromptToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-[#FFD700]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedPromptToView(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider">
                {selectedPromptToView.category} • {selectedPromptToView.course_title}
              </span>
              <h3 className="text-xl font-heading font-black text-white mt-1">
                {selectedPromptToView.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Author: {selectedPromptToView.student_name} (Receives 60% royalties on sales)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>SYSTEM PROMPT DIRECTIVE</span>
                <button
                  onClick={() => handleCopyPromptText(selectedPromptToView.final_prompt, selectedPromptToView.id)}
                  className="flex items-center gap-1 text-[#FFD700] hover:underline"
                >
                  {copiedPromptId === selectedPromptToView.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-amber-200/90 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                {selectedPromptToView.final_prompt}
              </pre>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>Price: ${selectedPromptToView.price} USD</span>
              <span className="text-emerald-400">60% routed to student wallet</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MarketplacePage;
