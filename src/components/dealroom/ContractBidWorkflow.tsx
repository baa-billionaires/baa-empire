import React, { useState } from 'react';
import {
  FileText,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Download,
  Calendar,
  Clock,
  Send,
  Building2,
  ShieldCheck,
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { OpportunityRecord, DealRecord } from '../../types/dealRoom';

interface ContractBidWorkflowProps {
  opportunities: OpportunityRecord[];
  deals: DealRecord[];
  onAdvanceDealStage: (dealId: string, nextStage: any) => void;
  isAdmin?: boolean;
}

export const ContractBidWorkflow: React.FC<ContractBidWorkflowProps> = ({
  opportunities,
  deals,
  onAdvanceDealStage,
  isAdmin = false
}) => {
  const contractOpportunities = opportunities.filter(o => o.category === 'ai_contracts');
  const [selectedContractId, setSelectedContractId] = useState<string>(contractOpportunities[0]?.id || '');

  // Bid / No-Bid Scoring State
  const [strategicFitScore, setStrategicFitScore] = useState<number>(9);
  const [technicalCapabilityScore, setTechnicalCapabilityScore] = useState<number>(8);
  const [marginProfitabilityScore, setMarginProfitabilityScore] = useState<number>(9);
  const [complianceFeasibilityScore, setComplianceFeasibilityScore] = useState<number>(8);

  // Proposal Checklist State
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'doc-0': true,
    'doc-1': true,
    'doc-2': false,
    'doc-3': true
  });

  const [generatedDraftSummary, setGeneratedDraftSummary] = useState<string | null>(null);

  const selectedContract = contractOpportunities.find(c => c.id === selectedContractId) || contractOpportunities[0];
  const relatedDeal = deals.find(d => d.opportunityId === selectedContract?.id);

  const totalBidScore = Math.round(
    ((strategicFitScore + technicalCapabilityScore + marginProfitabilityScore + complianceFeasibilityScore) / 40) * 100
  );

  const handleGenerateDraftProposal = () => {
    if (!selectedContract) return;

    setGeneratedDraftSummary(
      `EXECUTIVE TECHNICAL & COMMERCIAL PROPOSAL\n` +
      `PROJECT: ${selectedContract.title}\n` +
      `CLIENT: ${selectedContract.providerName}\n` +
      `SUBMISSION DEADLINE: ${selectedContract.deadline}\n\n` +
      `1. CONSORTIUM QUALIFICATION SUMMARY\n` +
      `Billionaire AI Academy (BAA) and sovereign student engineering swarms present a containerized, ISO-27001 sovereign architecture tailored for ${selectedContract.sector}.\n\n` +
      `2. METHODOLOGY & DELIVERABLES MATRIX\n` +
      `${selectedContract.scopeOfWork}\n\n` +
      `3. COMPLIANCE & PROVENANCE GUARANTEE\n` +
      `All underlying models undergo Base L2 cryptographic verification with tamper-evident checkpoints. Zero external model hallucination or unverified dependencies.\n\n` +
      `4. COMMERCIAL BID PRICING SCHEDULE\n` +
      `Total Bid Amount: $${selectedContract.minFundingUsd.toLocaleString()} - $${selectedContract.maxFundingUsd.toLocaleString()} ${selectedContract.currency}.\n` +
      `Payment Milestones: 30% Advance on mobilization, 40% on UAT validation, 30% upon final production deployment.`
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Global Contract Discovery & Bid Workflow
              </h2>
              <p className="text-xs text-zinc-400">
                End-to-end tender governance: bid/no-bid quantitative assessment, compliance matrix, and proposal generation.
              </p>
            </div>
          </div>
        </div>

        {/* Contract Switcher */}
        {contractOpportunities.length > 0 && (
          <select
            value={selectedContractId}
            onChange={(e) => {
              setSelectedContractId(e.target.value);
              setGeneratedDraftSummary(null);
            }}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#FFD700]"
          >
            {contractOpportunities.map(c => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedContract && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Tender Specifications & Bid/No-Bid Decision Engine (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Contract Notice Card */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                    Official Public Procurement RFP
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1.5">{selectedContract.title}</h3>
                  <p className="text-xs text-[#FFD700] font-semibold">{selectedContract.providerName}</p>
                </div>

                <a
                  href={selectedContract.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-400 text-xs font-mono flex items-center gap-1 shrink-0"
                >
                  <span>Source RFP</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Published Contract Value & Schedule */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Published Value</span>
                  <span className="text-sm font-bold text-emerald-400">
                    ${selectedContract.minFundingUsd.toLocaleString()} - ${selectedContract.maxFundingUsd.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Closing Deadline</span>
                  <span className="text-sm font-bold text-amber-400">{selectedContract.deadline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Sub. Channel</span>
                  <span className="text-xs font-bold text-zinc-300 capitalize">{selectedContract.applicationMethod.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-white block">Official Scope of Work & Deliverables:</span>
                <p className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 leading-relaxed font-sans">
                  {selectedContract.scopeOfWork}
                </p>
              </div>

              {/* Required Qualifications */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-white block">Mandatory Tender Qualifications:</span>
                <ul className="space-y-1.5 text-zinc-300">
                  {selectedContract.requiredQualifications.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* BID / NO-BID QUANTITATIVE MATRIX */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm">Bid / No-Bid Decision Matrix</h3>
                  <p className="text-xs text-zinc-400">Rate project viability on a 1-10 scale across 4 core vectors.</p>
                </div>
                <div className="text-right">
                  <span className={`text-base font-black font-mono px-3 py-1 rounded-xl border ${
                    totalBidScore >= 75
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : 'bg-amber-950 text-amber-400 border-amber-800'
                  }`}>
                    {totalBidScore}% {totalBidScore >= 75 ? 'RECOMMEND BID' : 'REVIEW MARGIN'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Strategic Fit</span>
                    <span className="font-mono text-white font-bold">{strategicFitScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={strategicFitScore}
                    onChange={(e) => setStrategicFitScore(Number(e.target.value))}
                    className="w-full accent-[#FFD700]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Technical Capability</span>
                    <span className="font-mono text-white font-bold">{technicalCapabilityScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={technicalCapabilityScore}
                    onChange={(e) => setTechnicalCapabilityScore(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Margin / Profitability</span>
                    <span className="font-mono text-white font-bold">{marginProfitabilityScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={marginProfitabilityScore}
                    onChange={(e) => setMarginProfitabilityScore(Number(e.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 mb-1">
                    <span>Compliance & Timeframe</span>
                    <span className="font-mono text-white font-bold">{complianceFeasibilityScore}/10</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={complianceFeasibilityScore}
                    onChange={(e) => setComplianceFeasibilityScore(Number(e.target.value))}
                    className="w-full accent-purple-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Document Readiness Checklist & Proposal Generator (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Document Checklist */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Proposal Preparation Checklist</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  {Object.values(checkedItems).filter(Boolean).length} / {selectedContract.requiredDocuments.length} Ready
                </span>
              </div>

              <div className="space-y-2">
                {selectedContract.requiredDocuments.map((doc, idx) => {
                  const key = `doc-${idx}`;
                  const isChecked = !!checkedItems[key];

                  return (
                    <label
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition cursor-pointer text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => setCheckedItems(prev => ({ ...prev, [key]: e.target.checked }))}
                          className="w-4 h-4 accent-emerald-500 rounded"
                        />
                        <span className={isChecked ? 'text-zinc-200 font-medium' : 'text-zinc-400'}>
                          {doc}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isChecked ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {isChecked ? 'Verified Attached' : 'Pending Document'}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Clarification & Procedure Notes */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Clarification & Submission Guidance:</span>
                <p>{selectedContract.questionsProcedure}</p>
              </div>

              {/* Trigger Proposal Generation */}
              <button
                onClick={handleGenerateDraftProposal}
                className="w-full py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-[#FFD700]/20 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Synthesize Proposal Dossier from Verified Specs</span>
              </button>
            </div>

            {/* Generated Proposal Output */}
            {generatedDraftSummary && (
              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 animate-fadeIn text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Synthesized Proposal Draft (Review & Portal Upload)</span>
                  </h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedDraftSummary);
                      alert('Proposal text copied to clipboard!');
                    }}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono"
                  >
                    Copy Proposal
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {generatedDraftSummary}
                </pre>

                {/* External Portal Submission Warning */}
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-300 text-[11px] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Authorized External Portal Guidance:</span> Submissions for this tender must be finalized directly on the official procurement portal. Use the generated compliant dossier to complete your bid entry.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
