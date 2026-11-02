import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Coins,
  Award,
  Cpu,
  Search,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface FaqItem {
  id: string;
  category: 'baacoin' | 'nft' | 'uadc' | 'general';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  highlightText?: string;
  actionText?: string;
  actionPage?: string;
}

export const BAA_FAQS: FaqItem[] = [
  {
    id: 'faq-baacoin-1',
    category: 'baacoin',
    categoryLabel: 'BaaCoin Mining',
    question: 'How does the Learn-to-Mine BaaCoin protocol work?',
    shortAnswer: 'Every student interaction—watching lectures, querying AI Tutors, and completing prompt labs—acts as a proof-of-work mining node that mints real BaaCoin.',
    detailedAnswer: 'Unlike passive video platforms where tuition is a sunk cost, Billionaires AI Academy turns student engagement into verifiable on-chain mining. When you watch video masterclasses, submit prompt architecture in our neural sandbox, or stress-test specialized AI Tutors, our autonomous smart contract issues verified mining blocks directly to your BAA Web3 Wallet. Rewards range from +0.5 BaaCoin for lectures to +10.0 BaaCoin for automated assignment completions.',
    highlightText: 'Every prompt submission and video lecture mines verifiable BaaCoin directly into your balance sheet.',
    actionText: 'Explore Learn-to-Mine Curriculum',
    actionPage: 'academy'
  },
  {
    id: 'faq-baacoin-2',
    category: 'baacoin',
    categoryLabel: 'BaaCoin Mining',
    question: 'What is the 10x BaaCoin Networth rule and when does it unlock?',
    shortAnswer: 'Enrolling in any course instantly multiplies tuition 10x into BaaCoin held as locked collateral; 20% unlocks immediately upon NFT graduation.',
    detailedAnswer: 'Under the BAA Sovereign Wealth Protocol, tuition is treated as balance sheet equity rather than an expense. When you enroll in a $99 masterclass, your account is immediately credited with 990 BaaCoin ($990 USD asset value) in locked student collateral. Upon passing your final project and minting your NFT Certificate, 20% unlocks automatically for staking, prompt purchasing, or on-chain withdrawal, while the remaining 80% vests as perpetual collateral for micro-startup staking.',
    highlightText: '$99 Tuition = 990 BaaCoin ($990 Networth) deposited instantly.',
    actionText: 'Calculate Your 10x Networth',
    actionPage: 'academy'
  },
  {
    id: 'faq-baacoin-3',
    category: 'baacoin',
    categoryLabel: 'BaaCoin Mining',
    question: 'How can I stake, trade, or withdraw my mined BaaCoin?',
    shortAnswer: 'BaaCoin can be staked in high-yield liquidity pools (up to 45% APY), exchanged in our Central Deal Room, or bridged to Base L2.',
    detailedAnswer: 'BaaCoin powers the entire decentralized autonomous ecosystem. Unlocked tokens can be staked across 6 liquidity pools—including the UADC GPU Compute Pool (45% APY), Sovereign Micro-Startup Incubator (38% APY), and AI Prompt Royalty Pool. Additionally, students can use BaaCoin to hire autonomous AI employee swarms, co-own data center GPU shares, or exchange tokens via peer-to-peer Base L2 liquidity vaults.',
    highlightText: 'Earn up to 45% APY in decentralized staking pools backed by physical GPU revenue.',
    actionText: 'Inspect Staking Pools & Wallet',
    actionPage: 'wallet'
  },
  {
    id: 'faq-baacoin-4',
    category: 'baacoin',
    categoryLabel: 'BaaCoin Mining',
    question: 'How does the 60/40 Prompt Marketplace royalty system work for graduates?',
    shortAnswer: 'Your course graduation prompts are packaged and published to our global marketplace; you earn 60% royalties in perpetuity.',
    detailedAnswer: 'During your course, you build battle-tested prompt systems and multi-agent workflows. Upon graduation, your highest-converting prompt architectures are autonomously compiled and listed on the BAA Prompt Marketplace. Whenever an enterprise, agency, or student purchases your prompt package, 60% of the revenue is disbursed instantly to your wallet in BaaCoin/USD, creating hands-free perpetual royalties.',
    highlightText: '60% creator royalty paid instantly on every sale forever.',
    actionText: 'Browse Prompt Marketplace',
    actionPage: 'marketplace'
  },
  {
    id: 'faq-nft-1',
    category: 'nft',
    categoryLabel: 'NFT Certificates',
    question: 'What makes BAA NFT Certificates unique compared to regular certificates?',
    shortAnswer: 'Each certificate is an on-chain canvas-rendered NFT featuring an engraved BaaCoin Chip, IPFS provenance hash, and soulbound verification.',
    detailedAnswer: 'Traditional PDF certificates are easily forged. BAA certificates are rendered client-side onto an HTML5 canvas and minted as cryptographic NFTs on Base L2. Each diploma features an embedded, engraved cryptographic BaaCoin chip containing your exact student graduation ID, total mined tokens, course verification hash, and permanent IPFS metadata storage that can never be modified or revoked.',
    highlightText: 'Base L2 cryptographic proof + IPFS immutable provenance + engraved hardware chip.',
    actionText: 'View Sample NFT Certificate',
    actionPage: 'university'
  },
  {
    id: 'faq-nft-2',
    category: 'nft',
    categoryLabel: 'NFT Certificates',
    question: 'How does the lifetime 10% referral commission embedded in the NFT certificate work?',
    shortAnswer: 'Your personal referral code and dynamic QR verification link are permanently engraved on your NFT, paying 10% on every downstream enrollment.',
    detailedAnswer: 'Every graduate becomes an on-chain stakeholder. Your NFT Certificate displays a dynamic QR code and hardcoded referral hash. Whenever a prospect, peer, or client scans your certificate and enrolls in any BAA or Africa Blockchain University degree, 10% of their tuition fee is credited instantly to your wallet, with zero expiration date.',
    highlightText: 'Every time someone verifies your diploma and enrolls, you receive a 10% commission automatically.',
    actionText: 'Explore Africa Blockchain University',
    actionPage: 'university'
  },
  {
    id: 'faq-nft-3',
    category: 'nft',
    categoryLabel: 'NFT Certificates',
    question: 'How do employers, universities, and clients verify my credentials?',
    shortAnswer: 'Anyone can verify your degree in seconds via the on-chain QR code or public verification portal without contacting a registrar.',
    detailedAnswer: 'Employers do not need to wait weeks for university transcripts. Scanning the QR code on your NFT or entering your transaction hash on our public validator resolves your credential against the Base L2 smart contract. It displays your completion timestamp, instructor signature, audited prompt artifacts, and W3C Verifiable Credential 2.0 conformance report.',
    highlightText: 'Instant, trustless verification compliant with global W3C VC 2.0 standards.',
    actionText: 'View Governance & Trust Passports',
    actionPage: 'governance'
  },
  {
    id: 'faq-uadc-1',
    category: 'uadc',
    categoryLabel: 'UADC Infrastructure',
    question: 'What is the Universal Autonomous AI Data Center (UADC)?',
    shortAnswer: 'UADC is Africa’s first sovereign green AI infrastructure, running self-healing H100 and B200 GPU clusters on 100% solar and hydroelectric power.',
    detailedAnswer: 'The Universal Autonomous AI Data Center (UADC) is a continental sovereign computing network engineered to free Africa and emerging markets from centralized Western cloud monopolies. Co-located with the Kainji hydroelectric dam and Sahara high-irradiance solar corridors, UADC operates at an ultra-low Power Usage Effectiveness (PUE) of 1.08, providing low-latency, low-cost intelligence processing across the continent.',
    highlightText: '100% green renewable power • 1.08 PUE efficiency • Sovereign African compute.',
    actionText: 'Inspect Data Center Telemetry',
    actionPage: 'datacenter'
  },
  {
    id: 'faq-uadc-2',
    category: 'uadc',
    categoryLabel: 'UADC Infrastructure',
    question: 'How do students and investors co-own or lease UADC compute capacity?',
    shortAnswer: 'You can co-own fractional GPU clusters with projected 24% IRR or connect idle phone CPUs to earn daily compute micro-rewards.',
    detailedAnswer: 'UADC democratizes infrastructure ownership. Institutional and retail builders can acquire tokenized data center shares backed by physical server racks, generating quarterly compute leasing yields. Concurrently, our mobile mesh client allows over 2,400+ connected phones to contribute idle processing cycles to distributed training swarms, earning daily BaaCoin compute royalties.',
    highlightText: 'Fractional GPU co-ownership offering projected 24% IRR backed by physical infrastructure.',
    actionText: 'Co-Own Data Center Shares',
    actionPage: 'datacenter'
  },
  {
    id: 'faq-uadc-3',
    category: 'uadc',
    categoryLabel: 'UADC Infrastructure',
    question: 'Why is sovereign domestic compute essential for African multilingual AI models?',
    shortAnswer: 'Local GPU clusters ensure native training for Yoruba, Hausa, Igbo, Swahili, and Zulu without high latency or foreign data surveillance.',
    detailedAnswer: 'Language and culture cannot be outsourced to foreign hyperscalers. Foreign LLMs frequently hallucinate or misrepresent African legal, medical, and linguistic nuances. By manufacturing compute domestically at UADC, researchers and students train foundation models tailored for pan-African dialects, regional agricultural diagnosis, and cross-border fintech compliance with zero data leakage.',
    highlightText: 'Native foundation models trained domestically in Yoruba, Swahili, Hausa, Igbo, Zulu, and Arabic.',
    actionText: 'Launch Autonomous AI Workforce',
    actionPage: 'ai-workforce'
  }
];

interface BaaFaqAccordionProps {
  onNavigate?: (page: string) => void;
}

export const BaaFaqAccordion: React.FC<BaaFaqAccordionProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'baacoin' | 'nft' | 'uadc'>('all');
  const [openFaqIds, setOpenFaqIds] = useState<Set<string>>(new Set(['faq-baacoin-1', 'faq-uadc-1']));
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle single FAQ
  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Expand / Collapse all
  const expandAll = () => {
    setOpenFaqIds(new Set(filteredFaqs.map((f) => f.id)));
  };

  const collapseAll = () => {
    setOpenFaqIds(new Set());
  };

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return BAA_FAQS.filter((faq) => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.shortAnswer.toLowerCase().includes(q) ||
        faq.detailedAnswer.toLowerCase().includes(q) ||
        faq.categoryLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Schema.org FAQPage JSON-LD generation for search engine rich snippets
  const faqSchemaJson = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: BAA_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${faq.shortAnswer} ${faq.detailedAnswer}`
        }
      }))
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-gradient-to-b from-black via-zinc-950 to-black relative">
      {/* Dynamic SEO JSON-LD injection for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaJson) }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-xs font-mono text-[#FFD700]">
            <HelpCircle className="w-4 h-4 text-[#FFD700]" />
            <span>KNOWLEDGE BASE &amp; ARCHITECTURE FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Learn-to-Mine BaaCoin, soulbound NFT Certificates with engraved chips, and the Universal Autonomous AI Data Center (UADC) infrastructure.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-black shadow-md shadow-[#FFD700]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>All Questions ({BAA_FAQS.length})</span>
            </button>

            <button
              onClick={() => setActiveCategory('baacoin')}
              className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'baacoin'
                  ? 'bg-[#FFD700] text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>BaaCoin Mining</span>
            </button>

            <button
              onClick={() => setActiveCategory('nft')}
              className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'nft'
                  ? 'bg-[#00D4FF] text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>NFT Certificates</span>
            </button>

            <button
              onClick={() => setActiveCategory('uadc')}
              className={`px-3.5 py-2 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'uadc'
                  ? 'bg-emerald-400 text-black shadow-md font-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>UADC Infrastructure</span>
            </button>
          </div>

          {/* Search Input & Expand/Collapse Toggle */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search FAQ keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl text-xs text-white placeholder-zinc-500 font-mono outline-none transition"
              />
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <button
                onClick={expandAll}
                className="px-2.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
              >
                Expand
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Items List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-400 font-mono text-xs">
              No matching questions found for "{searchQuery}". Try searching for "mining", "10x networth", "chip", or "UADC".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqIds.has(faq.id);

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-xl ${
                    isOpen
                      ? 'bg-zinc-950 border-[#FFD700]/60 ring-1 ring-[#FFD700]/30 shadow-[#FFD700]/5'
                      : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <div className="space-y-1.5 flex-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            faq.category === 'baacoin'
                              ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                              : faq.category === 'nft'
                              ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          {faq.categoryLabel}
                        </span>

                        <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                          Verified Protocol Architecture
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-heading font-black text-white group-hover:text-[#FFD700] transition">
                        {faq.question}
                      </h3>

                      {!isOpen && (
                        <p className="text-xs text-zinc-400 line-clamp-1 font-sans">
                          {faq.shortAnswer}
                        </p>
                      )}
                    </div>

                    {/* Animated Chevron Indicator */}
                    <div
                      className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#FFD700] text-black rotate-180 shadow-md shadow-[#FFD700]/20'
                          : 'bg-zinc-900 text-zinc-400 group-hover:text-white border border-zinc-800'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {/* Accordion Expandable Body */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-zinc-900/80 space-y-4 animate-fadeIn">
                      {/* Short Executive Summary Callout */}
                      <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3">
                        <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-sans text-zinc-200 leading-relaxed">
                          <strong className="text-white font-semibold">Key Takeaway: </strong>
                          {faq.shortAnswer}
                        </div>
                      </div>

                      {/* Detailed Architectural Explanation */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {faq.detailedAnswer}
                      </p>

                      {/* Highlighted Metric Badge */}
                      {faq.highlightText && (
                        <div className="p-3 rounded-xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-[#FFD700]/30 flex items-center gap-2.5 text-xs font-mono">
                          <Zap className="w-4 h-4 text-[#FFD700] shrink-0 animate-pulse" />
                          <span className="text-[#FFD700] font-bold">
                            {faq.highlightText}
                          </span>
                        </div>
                      )}

                      {/* Action Link Button */}
                      {faq.actionText && (
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onNavigate && onNavigate(faq.actionPage || 'academy')}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00D4FF] hover:text-[#FFD700] hover:underline transition"
                          >
                            <span>{faq.actionText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions? Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-heading font-black text-white">
              Still Have Technical or Curriculum Questions?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Our autonomous AI professors are available 24/7 inside the Academy to guide you through prompt engineering, smart contract security, and UADC compute deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate && onNavigate('academy')}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
            >
              Explore 100 Courses
            </button>

            <button
              onClick={() => onNavigate && onNavigate('datacenter')}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition"
            >
              Inspect UADC Compute Grid
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BaaFaqAccordion;
