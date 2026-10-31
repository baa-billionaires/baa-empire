import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Coins,
  Cpu,
  FileText,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Plus,
  RefreshCw,
  Sliders,
  DollarSign
} from 'lucide-react';
import {
  MemberProjectProfile,
  OpportunityRecord,
  FundingReadinessAudit
} from '../../types/dealRoom';

interface AIProjectFundingStudioProps {
  memberProjects: MemberProjectProfile[];
  opportunities: OpportunityRecord[];
  onSaveProjectProfile: (project: MemberProjectProfile) => void;
  onInitiateApplication: (projectId: string, opportunityId: string) => void;
  onNavigateToCourse?: (courseTitle: string) => void;
}

export const AIProjectFundingStudio: React.FC<AIProjectFundingStudioProps> = ({
  memberProjects,
  opportunities,
  onSaveProjectProfile,
  onInitiateApplication,
  onNavigateToCourse
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(memberProjects[0]?.id || '');
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // New Project Form State
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCountry, setFormCountry] = useState('Nigeria');
  const [formIndustry, setFormIndustry] = useState('Autonomous AI & Enterprise Automation');
  const [formStage, setFormStage] = useState<MemberProjectProfile['businessStage']>('MVP & Early Users');
  const [formLegalStatus, setFormLegalStatus] = useState<MemberProjectProfile['legalEntityStatus']>('Registered Limited Co. (RC/CAC)');
  const [formFundingAsk, setFormFundingAsk] = useState<number>(50000);
  const [formCurrency, setFormCurrency] = useState<'USD' | 'NGN' | 'BaaCoin'>('USD');
  const [formIntendedUse, setFormIntendedUse] = useState('');
  const [formBudget, setFormBudget] = useState<number>(65000);
  const [formEstRevenue, setFormEstRevenue] = useState<number>(80000);
  const [formCollateralEquity, setFormCollateralEquity] = useState('5% Preferred Equity via SAFE');
  const [formDocuments, setFormDocuments] = useState<string[]>(['Executive Pitch Deck', 'Technical Architecture Blueprint']);
  const [newDocName, setNewDocName] = useState('');

  // Active Selected Project
  const activeProject = memberProjects.find(p => p.id === selectedProjectId) || memberProjects[0];

  // 8-Agent Dynamic Readiness Audit Engine
  const calculateReadinessAudit = (project: MemberProjectProfile): FundingReadinessAudit => {
    let financialScore = 65;
    let businessCaseScore = 70;
    let docScore = Math.min(100, (project.supportingDocuments.length / 5) * 100);
    const riskFactors: string[] = [];

    if (project.legalEntityStatus === 'Registered Limited Co. (RC/CAC)') {
      businessCaseScore += 15;
    } else {
      riskFactors.push('Unincorporated entity status limits eligibility for institutional debt and procurement tenders.');
    }

    if (project.estimatedAnnualRevenueUsd > 20000) {
      financialScore += 20;
    } else {
      riskFactors.push('Early pre-revenue phase; grants or angel equity are recommended over commercial debt.');
    }

    if (project.fundingRequirementUsd > project.projectBudgetUsd * 2) {
      riskFactors.push('Funding ask exceeds 200% of validated annual budget; justification schedule required.');
    }

    const avgScore = Math.round((financialScore + businessCaseScore + docScore) / 3);
    const riskScore = Math.max(10, 100 - avgScore);

    return {
      id: `audit-${project.id}`,
      projectId: project.id,
      financialModelReadinessScore: Math.min(100, financialScore),
      businessCaseScore: Math.min(100, businessCaseScore),
      documentCompletenessScore: Math.round(docScore),
      riskScore,
      riskFactors,
      auditFeedback: avgScore > 75
        ? 'High institutional readiness. Project meets requirements for Base grants and angel equity syndicates.'
        : 'Moderate readiness. Strengthen audited financial forecasts and incorporate legal entity before bank debt intake.',
      recommendedNextActions: [
        'Complete BAA Smart Contract Security & Fuzzing Capstone to certify code sovereignty.',
        'Upload Tax Clearance or CAC Incorporation Certificate for procurement tenders.',
        'Generate 3-Year Pro-Forma Cashflow Projection.'
      ],
      lastAuditedAt: '2026-10-30 11:40 UTC'
    };
  };

  const currentAudit = activeProject ? calculateReadinessAudit(activeProject) : null;

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    // Run dynamic matching against opportunities
    const matched = opportunities.slice(0, 3).map((opp, idx) => ({
      opportunityId: opp.id,
      matchScore: 90 - idx * 6,
      matchReasons: [
        `Aligned with ${formIndustry}`,
        `Eligible for ${formCountry}`,
        `Funding ask within ${opp.currency} range`
      ],
      eligibilityGaps: idx === 0 ? [] : ['Requires formal 2-year tax certificate', 'Consortium co-sponsor recommended'],
      recommendedBaaCourses: ['AI Wealth & Sovereign Agent Architecture Capstone', 'Pan-African AI University Program'],
      confidence: 92 - idx * 4
    }));

    const newProject: MemberProjectProfile = {
      id: `proj-custom-${Date.now()}`,
      userId: 'usr-student-001',
      userName: 'Tariq Sterling',
      projectName: formName.trim(),
      description: formDescription.trim(),
      country: formCountry,
      industry: formIndustry,
      businessStage: formStage,
      legalEntityStatus: formLegalStatus,
      fundingRequirementUsd: Number(formFundingAsk),
      currency: formCurrency,
      intendedUseOfFunds: formIntendedUse.trim(),
      projectBudgetUsd: Number(formBudget),
      estimatedAnnualRevenueUsd: Number(formEstRevenue),
      availableCollateralOrEquity: formCollateralEquity.trim(),
      supportingDocuments: formDocuments,
      matchedOpportunities: matched,
      createdAt: new Date().toISOString().substring(0, 10)
    };

    onSaveProjectProfile(newProject);
    setSelectedProjectId(newProject.id);
    setIsCreatingProject(false);
  };

  return (
    <div className="space-y-6">
      {/* HEADER & PROJECT SELECTOR */}
      <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
              <Landmark className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                AI Project Loan & Funding Studio
              </h2>
              <p className="text-xs text-zinc-400">
                Eight-agent institutional qualification studio: audit eligibility, model cashflows, and package funding proposals.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Project Switcher */}
          {memberProjects.length > 0 && (
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-[#FFD700]"
            >
              {memberProjects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.projectName}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setIsCreatingProject(true)}
            className="px-3.5 py-2 rounded-xl bg-[#FFD700] hover:bg-[#FFE033] text-black text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Profile New Project</span>
          </button>
        </div>
      </div>

      {/* 8-AGENT EVALUATION BANNER */}
      <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs">
        <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-2 font-semibold">
          Autonomous 8-Agent Swarm In Loop:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-[10px]">
          {[
            'ProjectProfiler',
            'FundingMatcher',
            'EligibilityAuditor',
            'FinancialModelAgent',
            'BusinessCaseAgent',
            'DocumentReadinessAgent',
            'ApplicationCoordinator',
            'FundingRiskAnalyst'
          ].map((agent, idx) => (
            <div key={idx} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">{agent}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIVE PROJECT DETAILS & READINESS AUDIT */}
      {activeProject && currentAudit && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Project Overview & Readiness Score (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                  {activeProject.industry}
                </span>
                <h3 className="text-lg font-bold text-white mt-2">{activeProject.projectName}</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{activeProject.description}</p>
              </div>

              {/* Financial Snapshot */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Funding Ask</span>
                  <span className="text-base font-bold text-emerald-400">
                    ${activeProject.fundingRequirementUsd.toLocaleString()} {activeProject.currency}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Est. Annual Revenue</span>
                  <span className="text-base font-bold text-white">
                    ${activeProject.estimatedAnnualRevenueUsd.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Stage</span>
                  <span className="text-xs font-bold text-zinc-200">{activeProject.businessStage}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 block">Entity Status</span>
                  <span className="text-xs font-bold text-zinc-200">{activeProject.legalEntityStatus}</span>
                </div>
              </div>

              {/* Collateral / Equity Term */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
                <span className="text-[10px] font-mono text-zinc-500 uppercase block">Available Collateral / Equity:</span>
                <p className="text-zinc-200 font-medium mt-0.5">{activeProject.availableCollateralOrEquity}</p>
              </div>

              {/* READINESS AUDIT SCORES */}
              <div className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>FundingReadinessAudit™ Summary</span>
                  </h4>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Risk Score: {currentAudit.riskScore}/100
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span>Financial Model Readiness</span>
                      <span className="font-mono text-emerald-400">{currentAudit.financialModelReadinessScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${currentAudit.financialModelReadinessScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span>Business Case & Registration</span>
                      <span className="font-mono text-cyan-400">{currentAudit.businessCaseScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${currentAudit.businessCaseScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-zinc-400 mb-1">
                      <span>Documentation Completeness</span>
                      <span className="font-mono text-purple-400">{currentAudit.documentCompletenessScore}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: `${currentAudit.documentCompletenessScore}%` }} />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed pt-1 border-t border-zinc-800">
                  {currentAudit.auditFeedback}
                </p>

                {currentAudit.riskFactors.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-[11px] text-amber-300 space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Identified Diligence Risks:</span>
                    </span>
                    <ul className="list-disc list-inside space-y-0.5 text-zinc-300">
                      {currentAudit.riskFactors.map((rf, idx) => (
                        <li key={idx}>{rf}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Matched Opportunities & BAA Eligibility Bridge (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>Matched Institutional Opportunities ({activeProject.matchedOpportunities.length})</span>
              </h3>
              <span className="text-xs font-mono text-zinc-400">
                Sorted by Confidence
              </span>
            </div>

            <div className="space-y-4">
              {activeProject.matchedOpportunities.map((match, idx) => {
                const opp = opportunities.find(o => o.id === match.opportunityId);
                if (!opp) return null;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition space-y-4"
                  >
                    {/* Top Match Bar */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {opp.providerType}
                        </span>
                        <h4 className="font-bold text-white text-base mt-1">{opp.title}</h4>
                        <p className="text-xs text-[#FFD700] font-semibold">{opp.providerName}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold block">
                          {match.matchScore}% Compatibility
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                          Confidence: {match.confidence}%
                        </span>
                      </div>
                    </div>

                    {/* Published Amount & Terms */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Published Value</span>
                        <span className="font-bold text-emerald-400">
                          ${opp.maxFundingUsd.toLocaleString()} {opp.currency}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Deadline</span>
                        <span className="font-bold text-amber-400">{opp.deadline}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Method</span>
                        <span className="font-bold text-zinc-300 capitalize">{opp.applicationMethod.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {/* Match Reasons */}
                    <div className="space-y-1.5 text-xs">
                      <span className="text-[10px] font-mono uppercase text-zinc-500 block font-semibold">Match Rationale:</span>
                      <ul className="space-y-1 text-zinc-300">
                        {match.matchReasons.map((reason, rIdx) => (
                          <li key={rIdx} className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* BAA ELIGIBILITY GAP BRIDGE & COURSE REMEDIES */}
                    {match.eligibilityGaps.length > 0 && (
                      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-300 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span>Identified Eligibility Gaps & Requirements:</span>
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">Action Required Before Submit</span>
                        </div>

                        <ul className="list-disc list-inside space-y-1 text-zinc-300">
                          {match.eligibilityGaps.map((gap, gIdx) => (
                            <li key={gIdx}>{gap}</li>
                          ))}
                        </ul>

                        {/* Recommend BAA Academy Courses & Books to Bridge Gap */}
                        {match.recommendedBaaCourses.length > 0 && (
                          <div className="pt-2 border-t border-amber-800/40 space-y-2">
                            <span className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                              Recommended BAA Academy Bridging Modules:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {match.recommendedBaaCourses.map((course, cIdx) => (
                                <button
                                  key={cIdx}
                                  onClick={() => onNavigateToCourse ? onNavigateToCourse(course) : null}
                                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 transition text-left cursor-pointer"
                                >
                                  <GraduationCap className="w-3.5 h-3.5 text-[#FFD700]" />
                                  <span>{course}</span>
                                  <ArrowRight className="w-3 h-3 text-zinc-500" />
                                </button>
                              ))}
                            </div>
                            <p className="text-[10px] text-zinc-500 italic">
                              Note: BAA courses enhance technical readiness and bid competence; completion does not guarantee external institutional awards.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Bar: Initiate Application */}
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <a
                        href={opp.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <span>Official Notice</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => onInitiateApplication(activeProject.id, opp.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition cursor-pointer"
                      >
                        <span>Prepare Application Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT PROFILE MODAL */}
      {isCreatingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
            <div className="p-5 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Profile New Project for Institutional Matching</h3>
                <p className="text-xs text-zinc-400">Collects essential parameters for 8-agent eligibility and financial model readiness.</p>
              </div>
              <button
                onClick={() => setIsCreatingProject(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Lagos Solar Microgrid Predictive AI Telemetry"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Project Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Summarize the core technical solution and customer problem solved..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Country / Jurisdiction *</label>
                  <input
                    type="text"
                    required
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Industry Sector</label>
                  <select
                    value={formIndustry}
                    onChange={(e) => setFormIndustry(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Autonomous AI & Enterprise Automation">Autonomous AI & Enterprise Automation</option>
                    <option value="LegalTech & GovTech AI">LegalTech & GovTech AI</option>
                    <option value="Clean Energy & Smart Infrastructure">Clean Energy & Smart Infrastructure</option>
                    <option value="FinTech & Decentralized Lending">FinTech & Decentralized Lending</option>
                    <option value="AgroVision & Computer Vision">AgroVision & Computer Vision</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Business Stage</label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Pre-Seed / Prototype">Pre-Seed / Prototype</option>
                    <option value="MVP & Early Users">MVP & Early Users</option>
                    <option value="Revenue Generating">Revenue Generating</option>
                    <option value="Scaling Enterprise">Scaling Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Legal Entity Status</label>
                  <select
                    value={formLegalStatus}
                    onChange={(e) => setFormLegalStatus(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Registered Limited Co. (RC/CAC)">Registered Limited Co. (RC/CAC)</option>
                    <option value="Unincorporated Team">Unincorporated Team</option>
                    <option value="Cooperative / Joint Venture">Cooperative / Joint Venture</option>
                    <option value="Non-Profit / NGO">Non-Profit / NGO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Funding Ask ($)</label>
                  <input
                    type="number"
                    required
                    value={formFundingAsk}
                    onChange={(e) => setFormFundingAsk(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Annual Budget ($)</label>
                  <input
                    type="number"
                    required
                    value={formBudget}
                    onChange={(e) => setFormBudget(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Est. Annual Rev ($)</label>
                  <input
                    type="number"
                    required
                    value={formEstRevenue}
                    onChange={(e) => setFormEstRevenue(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Intended Use of Funds *</label>
                <input
                  type="text"
                  required
                  value={formIntendedUse}
                  onChange={(e) => setFormIntendedUse(e.target.value)}
                  placeholder="e.g. Server hardware procurement, engineer salaries, ISO certification..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsCreatingProject(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold rounded-lg shadow-md shadow-[#FFD700]/20"
                >
                  Analyze & Match Opportunities
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
