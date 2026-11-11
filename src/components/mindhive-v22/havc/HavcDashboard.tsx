import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  Scale,
  Brain,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Landmark,
  Coins,
  Copy,
  Check,
  Plus,
  RefreshCw,
  FileText,
  Lock,
  GitBranch,
  Bot,
  HelpCircle,
  Eye,
  Sliders
} from 'lucide-react';
import {
  MindHiveV22State,
  HavcContributorProfile,
  HavcContributionDnaRecord,
  HavcCollaborativeProject,
  HavcSharedValueDistribution,
  HavcDisputeRecord
} from '../../../types/mindHiveV22';

interface HavcDashboardProps {
  state: MindHiveV22State;
  onCreateProject: (proj: any) => Promise<void>;
  onAddContributionDna: (dna: any) => Promise<void>;
  onSettleDistribution: (dist: any) => Promise<void>;
  onFileDispute: (disp: any) => Promise<void>;
  onBackToMaster: () => void;
}

export const HavcDashboard: React.FC<HavcDashboardProps> = ({
  state,
  onCreateProject,
  onAddContributionDna,
  onSettleDistribution,
  onFileDispute,
  onBackToMaster
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'profile'
    | 'contribution-dna'
    | 'projects'
    | 'workspace'
    | 'my-contributions'
    | 'attribution'
    | 'revenue-sharing'
    | 'royalties'
    | 'marketplace'
    | 'governance'
    | 'disputes'
    | 'analytics'
    | 'settings'
  >('overview');

  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // New Collaborative Project Form State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState('technical_specification');
  const [projOwner, setProjOwner] = useState('Dr. Damilola Adebayo');
  const [projBudget, setProjBudget] = useState(15000);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // Contribution DNA Add Form State
  const [showDnaModal, setShowDnaModal] = useState(false);
  const [dnaItemTitle, setDnaItemTitle] = useState('Autonomous Multi-Agent Swarm Orchestration');
  const [dnaContributorName, setDnaContributorName] = useState('Chidinma Okafor, CFA');
  const [dnaRole, setDnaRole] = useState('Financial Protocol Co-Author');
  const [dnaType, setDnaType] = useState('human_intellectual');
  const [dnaPercent, setDnaPercent] = useState(25);
  const [isAddingDna, setIsAddingDna] = useState(false);
  const [dnaSuccessMsg, setDnaSuccessMsg] = useState<string | null>(null);

  // Shared Value Distribution Simulator State
  const [simGrossNgn, setSimGrossNgn] = useState(1000000); // ₦1M NGN
  const [simProductTitle, setSimProductTitle] = useState('Pan-African Sovereign Fintech License');
  const [isDistributing, setIsDistributing] = useState(false);
  const [distSuccessMsg, setDistSuccessMsg] = useState<string | null>(null);

  // Dispute Filing State
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeTitle, setDisputeTitle] = useState('');
  const [disputeClaimant, setDisputeClaimant] = useState('Dr. Aisha Bello');
  const [disputeRespondent, setDisputeRespondent] = useState('Kano Studio Recording Guild');
  const [disputeReason, setDisputeReason] = useState('');
  const [isFilingDispute, setIsFilingDispute] = useState(false);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleCreateNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle) return;
    setIsCreatingProject(true);
    try {
      await onCreateProject({
        title: projTitle,
        category: projCategory,
        ownerName: projOwner,
        totalBountyBudgetUsd: projBudget
      });
      setShowProjectModal(false);
      setProjTitle('');
      setActiveTab('projects');
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreatingProject(false);
    }
  };

  const handleAddDna = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dnaItemTitle || !dnaContributorName) return;
    setIsAddingDna(true);
    try {
      await onAddContributionDna({
        itemTitle: dnaItemTitle,
        contributorName: dnaContributorName,
        contributionRole: dnaRole,
        contributionType: dnaType,
        contributionPercentage: dnaPercent,
        agreedSharePercent: dnaPercent
      });
      setDnaSuccessMsg(`Contribution DNA recorded for "${dnaContributorName}"!`);
      setTimeout(() => {
        setDnaSuccessMsg(null);
        setShowDnaModal(false);
        setActiveTab('contribution-dna');
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAddingDna(false);
    }
  };

  const handleExecuteDistribution = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDistributing(true);
    try {
      await onSettleDistribution({
        sourceProductTitle: simProductTitle,
        grossPaymentNgn: simGrossNgn
      });
      setDistSuccessMsg(`Shared value payment of ₦${simGrossNgn.toLocaleString()} NGN settled via Paystack across contributors (70/30 split).`);
      setTimeout(() => setDistSuccessMsg(null), 6000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDistributing(false);
    }
  };

  const handleFileNewDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeTitle || !disputeReason) return;
    setIsFilingDispute(true);
    try {
      await onFileDispute({
        title: disputeTitle,
        claimantName: disputeClaimant,
        respondentName: disputeRespondent,
        reason: disputeReason
      });
      setShowDisputeModal(false);
      setDisputeTitle('');
      setDisputeReason('');
      setActiveTab('disputes');
    } catch (err) {
      console.error(err);
    } finally {
      setIsFilingDispute(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HAVC Division Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950 border-2 border-purple-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center font-bold text-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                SYSTEM 3
              </span>
              <span className="text-xs font-mono text-zinc-500">•</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                70% Creator / Contributor Shared Value Distribution
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
              Human–AI Value Cooperative (HAVC)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowProjectModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-500 hover:brightness-110 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-md shadow-purple-500/20 cursor-pointer"
          >
            <span>+ Launch Collaborative Project</span>
          </button>
          <button
            onClick={onBackToMaster}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700 transition cursor-pointer"
          >
            &larr; Master Hub
          </button>
        </div>
      </div>

      {/* 4.8 Working Navigation Menu (14 Items) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Cooperative Overview', icon: Users },
          { id: 'profile', label: 'My Contributor Profile', icon: ShieldCheck },
          { id: 'contribution-dna', label: `Contribution DNA (${state.havc.dnaRecords.length})`, icon: GitBranch },
          { id: 'projects', label: `Collaborative Projects (${state.havc.projects.length})`, icon: Layers },
          { id: 'workspace', label: 'Human–AI Workspace', icon: Bot },
          { id: 'revenue-sharing', label: 'Shared Value Engine (Paystack)', icon: Landmark },
          { id: 'royalties', label: 'Royalties & Distributions', icon: Coins },
          { id: 'marketplace', label: 'Cooperative Marketplace', icon: FileText },
          { id: 'governance', label: 'Governance & Constitution', icon: Scale },
          { id: 'disputes', label: `Disputes & Arbitration (${state.havc.disputes.length})`, icon: AlertCircle },
          { id: 'analytics', label: 'Community Analytics', icon: Brain },
          { id: 'settings', label: 'Settings', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COOPERATIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Verified Contributors</span>
              <div className="text-2xl font-bold text-white font-mono">{state.havc.contributors.length}</div>
              <span className="text-[10px] font-mono text-purple-400">Researchers, Authors &amp; Devs</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Projects</span>
              <div className="text-2xl font-bold text-purple-300 font-mono">{state.havc.projects.length}</div>
              <span className="text-[10px] font-mono text-zinc-400">Books, Datasets &amp; APIs</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">DNA Provenance Trees</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">{state.havc.dnaRecords.length}</div>
              <span className="text-[10px] font-mono text-amber-400">Cryptographically Recorded</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Settled Distributions</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono">{state.havc.distributions.length}</div>
              <span className="text-[10px] font-mono text-emerald-400">100% Paystack Reconciled</span>
            </div>
          </div>

          {/* Legal Charter Notice */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-3 text-xs font-mono text-zinc-400">
            <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-bold block mb-0.5">COOPERATIVE REGULATORY CHARTER:</span>
              <span>
                The Human–AI Value Cooperative is a contractual IP attribution and shared royalty distribution network. It does not operate as a licensed bank, investment fund, deposit-taking institution or collective investment scheme. All participant allocations originate from executed commercial licenses and verified commercial client receipts.
              </span>
            </div>
          </div>

          {/* Active Collaborations & Contribution DNA Snapshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Active Collaborative Projects</span>
                </h3>
                <span className="text-[10px] font-mono text-purple-300">70/10/20 Contractual Split</span>
              </div>

              <div className="space-y-3">
                {state.havc.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{proj.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">
                        {proj.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400">Lead: {proj.ownerName} • {proj.participants.length} Collaborators</div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${proj.completionPercent}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>Progress: {proj.completionPercent}% ({proj.completedMilestones}/{proj.milestonesCount} Milestones)</span>
                      <span className="text-emerald-400 font-bold">Bounty: ${proj.totalBountyBudgetUsd.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-amber-400" />
                  <span>Recent Contribution DNA Records</span>
                </h3>
                <button
                  onClick={() => setShowDnaModal(true)}
                  className="text-xs font-mono text-amber-400 hover:text-white underline cursor-pointer"
                >
                  + Add DNA Attribution
                </button>
              </div>

              <div className="space-y-3">
                {state.havc.dnaRecords.map((dna) => (
                  <div key={dna.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{dna.contributorName}</span>
                      <span className="text-xs font-mono font-bold text-amber-300">{dna.agreedSharePercent}% Agreed Share</span>
                    </div>
                    <div className="text-[11px] font-mono text-zinc-400">Role: {dna.contributionRole} ({dna.contributionType.replace(/_/g, ' ')})</div>
                    <div className="text-[10px] font-mono text-zinc-500 truncate">
                      SHA-256: {dna.evidenceHashSha256}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY CONTRIBUTOR PROFILE */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {state.havc.contributors.map((contrib) => (
              <div key={contrib.id} className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">{contrib.displayIdentity}</h3>
                    <div className="text-[11px] font-mono text-zinc-400">{contrib.location} • Role: {contrib.role.toUpperCase()}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                    Reputation: {contrib.reputationScore}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">{contrib.bio}</p>

                <div className="flex flex-wrap gap-1.5">
                  {contrib.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Settled Earnings</span>
                    <span className="text-sm font-bold text-emerald-400">${contrib.settledEarningsUsd.toLocaleString()}</span>
                    <span className="text-[10px] text-zinc-400 block">₦{(contrib.settledEarningsNgn).toLocaleString()} NGN</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Contributions</span>
                    <span className="text-sm font-bold text-white">{contrib.totalContributions} Verified</span>
                    <span className="text-[10px] text-zinc-400 block">Status: {contrib.privacySetting}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTRIBUTION DNA ENGINE */}
      {activeTab === 'contribution-dna' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-amber-400" />
                  <span>Contribution DNA Provenance &amp; Attribution Engine</span>
                </h2>
                <p className="text-xs text-zinc-400">Tracking multi-party authorship, research evidence, and agreed percentage splits</p>
              </div>
              <button
                onClick={() => setShowDnaModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                + Record Contribution DNA
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                    <th className="py-2.5 px-3">DNA ID</th>
                    <th className="py-2.5 px-3">Contributor</th>
                    <th className="py-2.5 px-3">Knowledge Asset / Project</th>
                    <th className="py-2.5 px-3">Role &amp; Contribution Type</th>
                    <th className="py-2.5 px-3">Agreed Share</th>
                    <th className="py-2.5 px-3">Cryptographic Evidence</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {state.havc.dnaRecords.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/50 transition">
                      <td className="py-3 px-3 text-amber-400 font-bold">{item.id}</td>
                      <td className="py-3 px-3 text-white font-bold">{item.contributorName}</td>
                      <td className="py-3 px-3 max-w-xs truncate text-zinc-300">{item.itemTitle}</td>
                      <td className="py-3 px-3 text-zinc-400">
                        <div>{item.contributionRole}</div>
                        <div className="text-[10px] text-zinc-500">{item.contributionType}</div>
                      </td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{item.agreedSharePercent}%</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-zinc-500 truncate max-w-[100px]">{item.evidenceHashSha256}</span>
                          <button onClick={() => copyHash(item.evidenceHashSha256)} className="text-zinc-400 hover:text-white cursor-pointer">
                            {copiedHash === item.evidenceHashSha256 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          APPROVED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HUMAN–AI WORKSPACE */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>Human–AI Collaborative Production Workspace</span>
                </h2>
                <p className="text-xs text-zinc-400">Multi-agent and human co-creation canvas separating human and AI contribution records</p>
              </div>
              <span className="text-xs font-mono text-purple-300">Roles Configured: 6 Specialists</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">1. Researcher (Human)</span>
                <p className="text-xs text-zinc-300">Provides raw verified field data, oscilloscope readings, and mathematical theorems.</p>
                <div className="text-[10px] text-emerald-400 font-bold">Assigned: Dr. Damilola Adebayo</div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">2. Structuring Agent (AI)</span>
                <p className="text-xs text-zinc-300">Cleans markdown syntax, formats equations, generates Q&amp;A instruction pairs and LaTeX tables.</p>
                <div className="text-[10px] text-purple-400 font-bold">Assigned: Model Forge AI (Level 4)</div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">3. Language Specialist (Human)</span>
                <p className="text-xs text-zinc-300">Translates technical abstract into Yoruba and Hausa, verifying tonal diacritic fidelity.</p>
                <div className="text-[10px] text-cyan-400 font-bold">Assigned: Dr. Aisha Bello</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Workflow: Researcher &rarr; AI Structuring &rarr; Translation &rarr; Owner Approval &rarr; KCX Publishing</span>
              <button
                onClick={() => setActiveTab('projects')}
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold transition cursor-pointer"
              >
                Join Collaborative Pipeline &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SHARED VALUE DISTRIBUTION ENGINE (PAYSTACK) */}
      {activeTab === 'revenue-sharing' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-emerald-400" />
                  <span>Contractual Shared Value Distribution Simulator (Paystack)</span>
                </h2>
                <p className="text-xs text-zinc-400">Automatic revenue apportionment: 70% Contributors, 10% Cooperative Pool, 20% Platform</p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                PAYSTACK NGN DIRECT ROUTING
              </span>
            </div>

            {distSuccessMsg && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{distSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleExecuteDistribution} className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="sm:col-span-2">
                <label className="block text-zinc-400 mb-1">Knowledge Product / License Source</label>
                <input
                  type="text"
                  value={simProductTitle}
                  onChange={(e) => setSimProductTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Gross Payment (₦ NGN)</label>
                <input
                  type="number"
                  step={100000}
                  value={simGrossNgn}
                  onChange={(e) => setSimGrossNgn(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400 font-bold text-amber-300"
                  required
                />
              </div>

              {/* Simulation Breakdown Preview */}
              <div className="sm:col-span-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Contributors Pool (70%)</span>
                  <span className="text-base font-bold text-emerald-400">₦{(simGrossNgn * 0.7).toLocaleString()} NGN</span>
                  <span className="text-[10px] text-zinc-400 block">${Math.round((simGrossNgn * 0.7) / 1500).toLocaleString()} USD</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Cooperative Pool (10%)</span>
                  <span className="text-base font-bold text-purple-300">₦{(simGrossNgn * 0.1).toLocaleString()} NGN</span>
                  <span className="text-[10px] text-zinc-400 block">${Math.round((simGrossNgn * 0.1) / 1500).toLocaleString()} USD</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Platform Operations (20%)</span>
                  <span className="text-base font-bold text-zinc-300">₦{(simGrossNgn * 0.2).toLocaleString()} NGN</span>
                  <span className="text-[10px] text-zinc-400 block">${Math.round((simGrossNgn * 0.2) / 1500).toLocaleString()} USD</span>
                </div>
              </div>

              <div className="sm:col-span-3 flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isDistributing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white font-bold uppercase transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  {isDistributing ? <span>Executing Paystack Split...</span> : <span>Execute Contractual Distribution &rarr;</span>}
                </button>
              </div>
            </form>

            {/* Historical Distribution Records */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <span className="text-xs font-mono text-zinc-400 font-bold block">Historical Reconciled Distributions:</span>
              {state.havc.distributions.map((d) => (
                <div key={d.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{d.sourceProductTitle}</span>
                    <span className="font-bold text-emerald-400">₦{d.totalGrossPaymentNgn.toLocaleString()} NGN</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>Tx Ref: {d.txReference}</span>
                    <span>Status: {d.status.toUpperCase()} (Paystack Verified)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: DISPUTES & ARBITRATION */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-amber-400" />
                  <span>Cooperative Governance &amp; Dispute Arbitration</span>
                </h2>
                <p className="text-xs text-zinc-400">Transparent dispute resolution, attribution challenges, and formal mediation audit</p>
              </div>
              <button
                onClick={() => setShowDisputeModal(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold cursor-pointer"
              >
                + File Attribution Challenge
              </button>
            </div>

            <div className="space-y-4">
              {state.havc.disputes.map((disp) => (
                <div key={disp.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white">{disp.title}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/20 text-amber-300">
                      {disp.status}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400">
                    Claimant: <span className="text-white">{disp.claimantName}</span> vs Respondent: <span className="text-white">{disp.respondentName}</span>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans">{disp.reason}</p>

                  {disp.resolutionSummary && (
                    <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-emerald-300">
                      <strong>Resolution Status: </strong>{disp.resolutionSummary}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW COLLABORATIVE PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Launch New Collaborative Knowledge Project</span>
              </h3>
              <button onClick={() => setShowProjectModal(false)} className="text-zinc-400 hover:text-white text-xs cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Project Title</label>
                <input
                  type="text"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. Open Pan-African Soil Microbiome Dataset"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Category</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                  >
                    <option value="technical_specification">Technical Spec</option>
                    <option value="language_speech_corpus">Speech Corpus</option>
                    <option value="research_whitepaper">Research Whitepaper</option>
                    <option value="ai_training_dataset">AI Dataset</option>
                    <option value="educational_curriculum">Curriculum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Project Owner</label>
                  <input
                    type="text"
                    value={projOwner}
                    onChange={(e) => setProjOwner(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Bounty Budget ($ USD)</label>
                <input
                  type="number"
                  value={projBudget}
                  onChange={(e) => setProjBudget(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingProject}
                  className="px-6 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold uppercase transition flex items-center gap-2 cursor-pointer"
                >
                  {isCreatingProject ? <span>Launching...</span> : <span>Launch Project &rarr;</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RECORD CONTRIBUTION DNA */}
      {showDnaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-amber-400" />
                <span>Record Granular Contribution DNA</span>
              </h3>
              <button onClick={() => setShowDnaModal(false)} className="text-zinc-400 hover:text-white text-xs cursor-pointer">
                ✕
              </button>
            </div>

            {dnaSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{dnaSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleAddDna} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Knowledge Asset / Project</label>
                  <input
                    type="text"
                    value={dnaItemTitle}
                    onChange={(e) => setDnaItemTitle(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Contributor Name</label>
                    <input
                      type="text"
                      value={dnaContributorName}
                      onChange={(e) => setDnaContributorName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Contribution Role</label>
                    <input
                      type="text"
                      value={dnaRole}
                      onChange={(e) => setDnaRole(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Contribution Type</label>
                    <select
                      value={dnaType}
                      onChange={(e) => setDnaType(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    >
                      <option value="human_intellectual">Human Intellectual</option>
                      <option value="ai_assisted_structuring">AI-Assisted Structuring</option>
                      <option value="peer_review">Peer Review</option>
                      <option value="translation">Translation</option>
                      <option value="dataset_collection">Dataset Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Agreed Share Percent (%)</label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={dnaPercent}
                      onChange={(e) => setDnaPercent(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400 font-bold text-amber-300"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowDnaModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingDna}
                    className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase transition flex items-center gap-2 cursor-pointer"
                  >
                    {isAddingDna ? <span>Recording SHA-256...</span> : <span>Record DNA &rarr;</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: FILE DISPUTE */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>File Attribution &amp; Royalty Challenge</span>
              </h3>
              <button onClick={() => setShowDisputeModal(false)} className="text-zinc-400 hover:text-white text-xs cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleFileNewDispute} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Dispute Subject</label>
                <input
                  type="text"
                  value={disputeTitle}
                  onChange={(e) => setDisputeTitle(e.target.value)}
                  placeholder="e.g. Allocation share discrepancy on Yoruba Speech Stem #4"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Claimant</label>
                  <input
                    type="text"
                    value={disputeClaimant}
                    onChange={(e) => setDisputeClaimant(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Respondent</label>
                  <input
                    type="text"
                    value={disputeRespondent}
                    onChange={(e) => setDisputeRespondent(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Reason &amp; Evidentiary Basis</label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  rows={3}
                  placeholder="State the factual basis for the attribution adjustment..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400 font-sans"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isFilingDispute}
                  className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase transition flex items-center gap-2 cursor-pointer"
                >
                  {isFilingDispute ? <span>Submitting...</span> : <span>File for Arbitration &rarr;</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
