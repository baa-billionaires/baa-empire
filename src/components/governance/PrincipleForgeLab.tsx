import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Layers,
  CheckCircle,
  FileText,
  MessageSquare,
  Send,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Code,
  BookOpen
} from 'lucide-react';
import { PVAIDCPrinciple } from '../../types/governance';

interface PrincipleForgeLabProps {
  principles: PVAIDCPrinciple[];
  onSelectForConstitution?: (principle: PVAIDCPrinciple) => void;
}

export const PrincipleForgeLab: React.FC<PrincipleForgeLabProps> = ({
  principles,
  onSelectForConstitution
}) => {
  const [selectedPrinciple, setSelectedPrinciple] = useState<PVAIDCPrinciple>(principles[0]);
  const [activeSubTab, setActiveSubTab] = useState<'statement' | 'standards_mapping' | 'hypothesis' | 'comments'>('statement');
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentAffiliation, setCommentAffiliation] = useState('');
  const [submittedCommentAlert, setSubmittedCommentAlert] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmittedCommentAlert(true);
    setCommentText('');
    setTimeout(() => setSubmittedCommentAlert(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & FRAMEWORK DISCLOSURE */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-[#FFD700]/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MODULE 2 • PRINCIPLEFORGE RESEARCH LAB (PVAIDC)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Principles of Verifiable Autonomous Intelligence &amp; Digital Cooperation
            </h2>
            <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed mt-1">
              A proposed open research framework developed by Billionaires AI Academy to investigate machine-enforceable rules for multi-agent systems, Base L2 smart contracts, and decentralized economies.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-right shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Foundational Principles</span>
            <span className="text-2xl font-heading font-black text-[#FFD700]">12 Workstreams</span>
            <span className="text-[10px] font-mono text-cyan-400 block mt-0.5">NIST • OECD • W3C Mapped</span>
          </div>
        </div>

        {/* Clear Non-Endorsement Disclosure */}
        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-[11px] font-mono text-amber-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>Academic Research Disclosure:</strong> PVAIDC is a proposed framework developed by BAA for empirical testing and public consultation—not an existing intergovernmental standard or an officially recognized regulatory instrument.
          </span>
        </div>
      </div>

      {/* PRINCIPLES DIRECTORY & DEEP-DIVE SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* LEFT COLUMN: 12 PRINCIPLES ROSTER (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-mono uppercase text-zinc-400 block font-semibold px-1">
            PVAIDC Principles (12):
          </span>

          <div className="space-y-2 max-h-[640px] overflow-y-auto no-scrollbar pr-1">
            {principles.map(p => {
              const isSelected = selectedPrinciple.id === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPrinciple(p)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-zinc-900 border-[#FFD700] ring-1 ring-[#FFD700]/50 shadow-lg'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#FFD700]">
                      PRINCIPLE {p.number}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      v1.4 • {p.publicCommentsCount} Comments
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-white">
                    {p.name}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {p.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED PRINCIPLE WORKBENCH (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5">
            {/* Header */}
            <div className="border-b border-zinc-800 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30">
                  PVAIDC PRINCIPLE {selectedPrinciple.number}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {selectedPrinciple.revisionsCount} Revisions • Peer Review Active
                </span>
              </div>

              <h3 className="text-xl font-heading font-black text-white">
                {selectedPrinciple.name}
              </h3>
              <p className="text-xs text-zinc-300 font-mono">
                {selectedPrinciple.shortDesc}
              </p>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-mono">
              <button
                onClick={() => setActiveSubTab('statement')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeSubTab === 'statement'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                Statement &amp; Requirements
              </button>
              <button
                onClick={() => setActiveSubTab('standards_mapping')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeSubTab === 'standards_mapping'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                NIST / OECD / W3C Mapping
              </button>
              <button
                onClick={() => setActiveSubTab('hypothesis')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeSubTab === 'hypothesis'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                Testable Hypothesis
              </button>
              <button
                onClick={() => setActiveSubTab('comments')}
                className={`px-3 py-1.5 rounded-lg font-bold transition ${
                  activeSubTab === 'comments'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white'
                }`}
              >
                Public Consultation
              </button>
            </div>

            {/* Sub-Tab 1: Statement */}
            {activeSubTab === 'statement' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                    Full Normative Statement
                  </span>
                  <p className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 leading-relaxed">
                    {selectedPrinciple.fullStatement}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                    Operational Requirements in Code
                  </span>
                  <div className="space-y-1.5">
                    {selectedPrinciple.operationalRequirements.map((req, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-start gap-2 text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-zinc-800">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Technical Limitations &amp; Assumptions
                  </span>
                  <p className="text-zinc-400 leading-relaxed">
                    {selectedPrinciple.limitations}
                  </p>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Standards Mapping */}
            {activeSubTab === 'standards_mapping' && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                    NIST AI Risk Management Framework (NIST AI 100-1)
                  </span>
                  <p className="text-zinc-200">{selectedPrinciple.nistMapping}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                    OECD Recommendation on Artificial Intelligence (OECD.AI)
                  </span>
                  <p className="text-zinc-200">{selectedPrinciple.oecdMapping}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                    W3C Verifiable Credentials &amp; Decentralized Identifiers
                  </span>
                  <p className="text-zinc-200">{selectedPrinciple.w3cMapping}</p>
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Testable Hypothesis */}
            {activeSubTab === 'hypothesis' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    Empirical Laboratory Hypothesis
                  </span>
                  <p className="text-zinc-200 leading-relaxed font-mono">
                    "{selectedPrinciple.testableHypothesis}"
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                    Unresolved Research Questions
                  </span>
                  <div className="space-y-1.5">
                    {selectedPrinciple.unresolvedQuestions.map((q, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-2 text-zinc-300">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 4: Public Consultation & Comments */}
            {activeSubTab === 'comments' && (
              <div className="space-y-4 text-xs">
                {submittedCommentAlert && (
                  <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your comment and counterargument have been submitted for working group peer review.</span>
                  </div>
                )}

                <form onSubmit={handleCommentSubmit} className="space-y-3 p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-xs font-mono uppercase text-zinc-300 font-bold block">
                    Submit Peer Review / Counterargument for Principle {selectedPrinciple.number}
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={commentName}
                      onChange={e => setCommentName(e.target.value)}
                      placeholder="Your Name / Researcher ID"
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      required
                    />
                    <input
                      type="text"
                      value={commentAffiliation}
                      onChange={e => setCommentAffiliation(e.target.value)}
                      placeholder="Affiliation / University / Company"
                      className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Provide evidence, counter-evidence, or proposed technical refinements..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-xs text-white"
                    required
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold font-mono text-xs rounded-xl flex items-center gap-1.5 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit to Public Consultation Record</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
