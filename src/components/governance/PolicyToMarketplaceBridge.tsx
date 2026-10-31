import React from 'react';
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Building2,
  Cpu,
  Coins,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  DollarSign
} from 'lucide-react';

interface PolicyToMarketplaceBridgeProps {
  onNavigateToCourse?: (courseId: string) => void;
  onNavigateToDealRoom?: () => void;
  onNavigateToAcademy?: () => void;
}

export const PolicyToMarketplaceBridge: React.FC<PolicyToMarketplaceBridgeProps> = ({
  onNavigateToCourse,
  onNavigateToDealRoom,
  onNavigateToAcademy
}) => {
  const BRIDGES = [
    {
      regulation: 'EU AI Act Article 50 & High-Risk Obligations',
      solutionTitle: 'Smart Contract Security & Base L2 Fuzzing Capstone',
      category: 'BAA Academy Course',
      type: 'course',
      description: 'Hands-on curriculum teaching tamper-evident event logging, bounded state execution, and audit-trail generation on Base Layer 2.',
      linkText: 'Explore Course Module',
      target: 'course-sec-02',
      badge: 'VERIFIED CURRICULUM'
    },
    {
      regulation: 'W3C Verifiable Credentials 2.0 & Decentralized Identity',
      solutionTitle: 'AI Wealth & Sovereign Agent Architecture Capstone',
      category: 'BAA Flagship Certification',
      type: 'course',
      description: 'Deep dive into decentralized identifiers (DIDs), multi-agent handshakes, and cryptographic provenance for autonomous machine commerce.',
      linkText: 'View Degree Curriculum',
      target: 'course-1',
      badge: 'FLAGSHIP CAPSTONE'
    },
    {
      regulation: 'Pan-African Sovereign Data & Multilateral Procurement',
      solutionTitle: 'ALSF Multilingual Legal AI Tender ($120k - $350k USD)',
      category: 'BAA Global Deal Room',
      type: 'deal',
      description: 'Official RFP opportunity seeking sovereign multilingual neural translation and contract audit models for African commercial courts.',
      linkText: 'Inspect Tender in Deal Room',
      badge: 'ACTIVE RFP'
    },
    {
      regulation: 'NIST AI RMF 1.0 Measure & Manage Requirements',
      solutionTitle: 'AWS Activate & Anthropic AI Foundation Compute Grant',
      category: 'Cloud Infrastructure Credits',
      type: 'deal',
      description: '$25,000 - $100,000 non-cash credit allocation covering cloud GPU infrastructure, safety auditing, and serverless inference.',
      linkText: 'Apply in Deal Room',
      badge: 'COMPUTE CREDITS'
    }
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-[#FFD700]/30 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>MODULE 7 • POLICY-TO-MARKETPLACE INTELLIGENCE</span>
        </div>
        <h2 className="text-2xl font-heading font-black text-white">
          Connecting Principles to Commercial Readiness &amp; Funding
        </h2>
        <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
          Translate regulatory and technical governance requirements into actionable education, developer certifications, and funded contract opportunities available across the BAA ecosystem.
        </p>
      </div>

      {/* BRIDGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {BRIDGES.map((b, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700] transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">
                  {b.category}
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {b.badge}
                </span>
              </div>

              <span className="text-[11px] font-mono text-zinc-500 block">
                Requirement: <strong className="text-zinc-300">{b.regulation}</strong>
              </span>

              <h3 className="font-heading font-black text-white text-base">
                {b.solutionTitle}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {b.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800/80">
              {b.type === 'deal' && onNavigateToDealRoom ? (
                <button
                  onClick={onNavigateToDealRoom}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-amber-500 hover:brightness-110 text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <span>{b.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : onNavigateToAcademy ? (
                <button
                  onClick={onNavigateToAcademy}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-heading font-bold text-xs uppercase tracking-wider transition border border-zinc-700 flex items-center justify-center gap-2"
                >
                  <span>{b.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Disclaimer */}
      <p className="text-[10px] font-mono text-zinc-500 text-center">
        * Commercial Disclosure: BAA educational courses and marketplace opportunities support technical readiness; purchasing materials does not constitute formal legal certification or guarantee contract awards.
      </p>
    </div>
  );
};
