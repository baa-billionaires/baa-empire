import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Coins,
  ShieldCheck,
  Building2,
  FileText,
  UserCheck
} from 'lucide-react';
import { MemberProjectProfile, OpportunityRecord } from '../../types/dealRoom';

interface MemberDealWorkspaceProps {
  projects: MemberProjectProfile[];
  opportunities: OpportunityRecord[];
  onNavigateToCourse?: (courseTitle: string) => void;
  onNavigateToLibrary?: () => void;
}

export const MemberDealWorkspace: React.FC<MemberDealWorkspaceProps> = ({
  projects,
  opportunities,
  onNavigateToCourse,
  onNavigateToLibrary
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const activeProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div className="space-y-6">
      {/* MEMBER ORIENTATION BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-950 via-slate-900 to-zinc-950 border border-zinc-800 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] text-xs font-mono font-bold">
            Member Opportunity & Funding Suite
          </span>
          <span className="text-xs text-zinc-400 font-mono">Student & Founder Workspace</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Unlock Institutional Grants, Cloud Credits & Project Financing
        </h2>
        <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
          Discover verified RFPs, non-dilutive innovation grants, and compute vouchers tailored to your BAA projects. Review eligibility gap audits and bridge qualification requirements through certified BAA academy modules.
        </p>
      </div>

      {activeProject ? (
        <div className="space-y-6">
          {/* Active Project Card */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                {activeProject.industry}
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5">{activeProject.projectName}</h3>
              <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{activeProject.description}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono shrink-0">
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase">Funding Ask</span>
                <span className="font-bold text-emerald-400">${activeProject.fundingRequirementUsd.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase">Stage</span>
                <span className="font-bold text-zinc-200">{activeProject.businessStage}</span>
              </div>
            </div>
          </div>

          {/* Matched Opportunities for Member */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFD700]" />
              <span>Recommended Non-Dilutive Grants & Credits</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProject.matchedOpportunities.map((match, idx) => {
                const opp = opportunities.find(o => o.id === match.opportunityId);
                if (!opp) return null;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-800 text-zinc-300">
                          {opp.providerType}
                        </span>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                          {match.matchScore}% Compatibility
                        </span>
                      </div>

                      <h4 className="font-bold text-white text-sm">{opp.title}</h4>
                      <p className="text-xs text-zinc-400">{opp.summary}</p>

                      <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono flex justify-between">
                        <span className="text-zinc-500">Max Value:</span>
                        <span className="text-emerald-400 font-bold">${opp.maxFundingUsd.toLocaleString()} {opp.currency}</span>
                      </div>

                      {/* Bridge Course Recommendation */}
                      {match.recommendedBaaCourses.length > 0 && (
                        <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1.5 text-xs">
                          <span className="text-[10px] font-mono uppercase text-[#FFD700] block font-semibold flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Recommended BAA Qualification Bridging Module:</span>
                          </span>
                          {match.recommendedBaaCourses.map((c, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => onNavigateToCourse ? onNavigateToCourse(c) : null}
                              className="w-full text-left p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-[11px] flex items-center justify-between transition cursor-pointer"
                            >
                              <span>{c}</span>
                              <ArrowRight className="w-3 h-3 text-[#FFD700]" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                      <span className="text-zinc-500 font-mono text-[11px]">Due {opp.deadline}</span>
                      <a
                        href={opp.officialSourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-xs"
                      >
                        <span>Official Notice</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <BookOpen className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No active project profile found</h3>
          <p className="text-xs text-zinc-400">
            Submit your student capstone or micro-startup to automatically receive institutional grant and compute vouchers matches.
          </p>
        </div>
      )}
    </div>
  );
};
