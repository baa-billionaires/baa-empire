import React, { useState, useMemo } from 'react';
import {
  Globe,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Building2,
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen
} from 'lucide-react';
import { PolicyRecord, GovernanceJurisdiction, PolicyLegalStatus } from '../../types/governance';

interface PolicyObservatoryProps {
  policies: PolicyRecord[];
  onSelectPolicyForAudit?: (policy: PolicyRecord) => void;
  onSelectForCourseBridge?: (policy: PolicyRecord) => void;
}

export const PolicyObservatory: React.FC<PolicyObservatoryProps> = ({
  policies,
  onSelectPolicyForAudit,
  onSelectForCourseBridge
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>(policies[0]?.id || null);

  const JURISDICTIONS: Array<GovernanceJurisdiction | 'All'> = [
    'All',
    'European Union',
    'United States',
    'Pan-African & AU',
    'Global / Multilateral',
    'United Kingdom',
    'Nigeria & ECOWAS'
  ];

  const STATUS_LABELS: Record<PolicyLegalStatus, { label: string; color: string }> = {
    enacted_law: { label: 'Enacted Law (Binding)', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' },
    proposed_legislation: { label: 'Proposed Bill', color: 'bg-amber-950/80 text-amber-300 border-amber-800' },
    regulatory_guidance: { label: 'Regulatory Guidance', color: 'bg-blue-950/80 text-blue-300 border-blue-800' },
    voluntary_standard: { label: 'Voluntary Standard', color: 'bg-purple-950/80 text-purple-300 border-purple-800' },
    draft_standard: { label: 'Draft Standard in RFC', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-800' },
    multilateral_treaty: { label: 'Intergovernmental Treaty', color: 'bg-rose-950/80 text-rose-300 border-rose-800' }
  };

  const filteredPolicies = useMemo(() => {
    return policies.filter(p => {
      if (selectedJurisdiction !== 'All' && p.jurisdiction !== selectedJurisdiction) return false;
      if (selectedStatus !== 'All' && p.legalStatus !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.issuingBody.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.keyRequirements.some(r => r.toLowerCase().includes(q)) ||
          p.affectedSectors.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [policies, selectedJurisdiction, selectedStatus, searchQuery]);

  return (
    <div className="space-y-6">
      {/* OBSERVATORY HEADER & SCOPE */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800 text-blue-400 text-xs font-mono font-bold mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>MODULE 1 • GLOBAL POLICY INTELLIGENCE OBSERVATORY</span>
            </div>
            <h2 className="text-2xl font-heading font-black text-white">
              International AI &amp; Web3 Regulatory Intelligence
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed mt-1">
              Live tracking of AI legislation, Web3 tokenization rules, W3C standards, and sovereign compute mandates. Distinguishes enacted laws from draft theories with traceable source documentation.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-right shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Monitored Legal Documents</span>
            <span className="text-xl font-heading font-black text-[#FFD700]">{policies.length} Global Records</span>
            <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">EU AI Act • NIST • OECD • AU</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-4 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search EU AI Act, NIST, smart contracts, biometrics..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
            />
          </div>

          {/* Jurisdiction Dropdown */}
          <div className="md:col-span-4">
            <select
              value={selectedJurisdiction}
              onChange={e => setSelectedJurisdiction(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#FFD700]"
            >
              {JURISDICTIONS.map(j => (
                <option key={j} value={j}>{j === 'All' ? 'All Jurisdictions' : j}</option>
              ))}
            </select>
          </div>

          {/* Legal Status Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#FFD700]"
            >
              <option value="All">All Legal Statuses</option>
              <option value="enacted_law">Enacted Law (Binding)</option>
              <option value="regulatory_guidance">Regulatory Guidance</option>
              <option value="voluntary_standard">Voluntary Standard</option>
              <option value="multilateral_treaty">Intergovernmental Treaty</option>
            </select>
          </div>
        </div>
      </div>

      {/* POLICY RECORDS FEED */}
      <div className="space-y-4">
        {filteredPolicies.map(policy => {
          const isExpanded = expandedPolicyId === policy.id;
          const statusInfo = STATUS_LABELS[policy.legalStatus] || { label: policy.legalStatus, color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };

          return (
            <div
              key={policy.id}
              className={`rounded-2xl border transition overflow-hidden ${
                isExpanded
                  ? 'bg-zinc-900 border-[#FFD700]/70 shadow-xl'
                  : 'bg-zinc-950/80 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Card Summary Header */}
              <div
                onClick={() => setExpandedPolicyId(isExpanded ? null : policy.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                      {policy.jurisdiction}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Verified: {policy.lastVerifiedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-heading font-black text-white hover:text-[#FFD700] transition">
                    {policy.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-mono">
                    Issuing Authority: <strong className="text-zinc-200">{policy.issuingBody}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={policy.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700] text-zinc-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
                    title="View official government / standards repository"
                  >
                    <span>Primary Source</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>

                  <button className="text-zinc-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Deep-Dive Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-zinc-800/80 space-y-5 text-xs">
                  {/* Summary */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                      Executive Summary &amp; Scope
                    </span>
                    <p className="text-zinc-300 leading-relaxed bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
                      {policy.summary}
                    </p>
                  </div>

                  {/* Key Requirements Grid */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                      Operational Compliance Mandates
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {policy.keyRequirements.map((req, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800 flex items-start gap-2 text-zinc-300">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Implementation Timeline */}
                  {policy.timelineMilestones.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                        Implementation Milestones &amp; Effective Deadlines
                      </span>
                      <div className="space-y-2">
                        {policy.timelineMilestones.map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs">
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${m.isPast ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                              <span className={m.isPast ? 'text-zinc-400' : 'text-amber-300 font-bold'}>{m.description}</span>
                            </div>
                            <span className="text-zinc-400 text-[11px] shrink-0 font-bold">{m.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Readiness Notes & BAA Bridges */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/30 to-purple-950/30 border border-blue-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                        BAA Architecture Advisory &amp; Next Steps
                      </span>
                      {onSelectForCourseBridge && (
                        <button
                          onClick={() => onSelectForCourseBridge(policy)}
                          className="text-[11px] font-mono font-bold text-[#FFD700] hover:underline flex items-center gap-1"
                        >
                          <span>Discover BAA Curriculum Bridge</span>
                          <BookOpen className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed">
                      {policy.complianceReadinessNotes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
