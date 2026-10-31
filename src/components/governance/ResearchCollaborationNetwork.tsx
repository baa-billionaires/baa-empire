import React, { useState } from 'react';
import {
  FileText,
  Users,
  MessageSquare,
  Sparkles,
  GitPullRequest,
  CheckCircle,
  ExternalLink,
  Download,
  BookOpen,
  Send,
  Plus
} from 'lucide-react';
import { ResearchPaper } from '../../types/governance';

interface ResearchCollaborationNetworkProps {
  papers: ResearchPaper[];
  onSelectPaper?: (paper: ResearchPaper) => void;
}

export const ResearchCollaborationNetwork: React.FC<ResearchCollaborationNetworkProps> = ({
  papers,
  onSelectPaper
}) => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper>(papers[0]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [rfcProposalText, setRfcProposalText] = useState('');
  const [rfcSuccessAlert, setRfcSuccessAlert] = useState(false);

  const handleRfcSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfcProposalText.trim()) return;
    setRfcSuccessAlert(true);
    setRfcProposalText('');
    setTimeout(() => {
      setRfcSuccessAlert(false);
      setIsSubmitModalOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>MODULE 5 • GLOBAL STANDARDS &amp; RESEARCH COLLABORATION NETWORK</span>
            </div>
            <h2 className="text-2xl font-heading font-black text-white">
              Peer-Reviewed Working Papers &amp; Open RFC Standards
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed mt-1">
              A collaborative academic and engineering forum for publishing technical proposals, peer review commentaries, and open-source PVAIDC reference architectures.
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold font-mono text-xs flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Working Draft / RFC</span>
          </button>
        </div>
      </div>

      {/* SUBMISSION MODAL */}
      {isSubmitModalOpen && (
        <div className="p-5 rounded-2xl bg-zinc-900 border border-[#FFD700]/50 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <GitPullRequest className="w-4 h-4 text-[#FFD700]" />
              <span>Submit New Working Proposal to BAA Governance Council</span>
            </h3>
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          {rfcSuccessAlert ? (
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Draft received. Assigned to the BAA Standards Working Group for peer review.</span>
            </div>
          ) : (
            <form onSubmit={handleRfcSubmit} className="space-y-3">
              <textarea
                rows={3}
                value={rfcProposalText}
                onChange={e => setRfcProposalText(e.target.value)}
                placeholder="Describe your proposed standard, architectural pattern, or revision to a PVAIDC principle..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#FFD700]"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold font-mono text-xs rounded-xl"
                >
                  Submit for Open Review
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* WORKING PAPERS FEED */}
      <div className="space-y-4">
        {papers.map(paper => (
          <div
            key={paper.id}
            className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                  paper.status === 'peer_reviewed'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : 'bg-cyan-950 text-cyan-400 border-cyan-800'
                }`}>
                  {paper.status === 'peer_reviewed' ? 'PEER REVIEWED' : 'OPEN RFC DRAFT'}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Version {paper.version} • Published: {paper.publishedDate}
                </span>
              </div>

              <span className="text-xs font-mono text-[#FFD700]">
                DOI: {paper.doiOrHandle}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-heading font-black text-white hover:text-[#FFD700] transition">
                {paper.title}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Authors: <strong className="text-zinc-200">{paper.authors.join(', ')}</strong> ({paper.institution})
              </p>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/60">
              {paper.abstract}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-4">
                <span>{paper.reviewsCount} Peer Reviews</span>
                <span>•</span>
                <span>{paper.commentsCount} Community RFC Comments</span>
              </div>

              <div className="flex items-center gap-3">
                {paper.githubRefUrl && (
                  <a
                    href={paper.githubRefUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-white flex items-center gap-1 transition"
                  >
                    <span>Reference Code</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
