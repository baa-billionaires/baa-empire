import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Briefcase,
  Landmark,
  Coins,
  Cpu,
  Handshake,
  Award,
  Bot,
  Kanban,
  FileText,
  Building2,
  ShieldCheck,
  Lock,
  ArrowRight,
  TrendingUp,
  LayoutDashboard,
  Users,
  Search,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  OpportunityRecord,
  DiscoveryAgent,
  DiscoveryAgentId,
  SourceConnector,
  InstitutionProfile,
  EngagementThread,
  MemberProjectProfile,
  DealRecord,
  AuditLogEntry,
  PipelineStage
} from '../types/dealRoom';
import {
  INITIAL_INSTITUTIONS,
  INITIAL_ENGAGEMENT_THREADS,
  INITIAL_MEMBER_PROJECTS,
  INITIAL_DEAL_RECORDS,
  INITIAL_AUDIT_LOGS,
  loadDealRoomData,
  saveDealRoomData,
  calculateDealRoomMetrics
} from '../lib/dealRoomService';

import { ThreePanelOpportunityExplorer } from '../components/dealroom/ThreePanelOpportunityExplorer';
import { DealRoomLiveDashboard } from '../components/dealroom/DealRoomLiveDashboard';
import { SixOpportunityEnginesRadar } from '../components/dealroom/SixOpportunityEnginesRadar';
import { InstitutionalCommandCentre } from '../components/dealroom/InstitutionalCommandCentre';
import { AIProjectFundingStudio } from '../components/dealroom/AIProjectFundingStudio';
import { ContractBidWorkflow } from '../components/dealroom/ContractBidWorkflow';
import { UnifiedDealPipelineCRM } from '../components/dealroom/UnifiedDealPipelineCRM';
import { AutonomousDiscoverySwarmConsole } from '../components/dealroom/AutonomousDiscoverySwarmConsole';
import { MemberDealWorkspace } from '../components/dealroom/MemberDealWorkspace';

interface GlobalDealRoomPageProps {
  onNavigate?: (tab: string) => void;
}

export const GlobalDealRoomPage: React.FC<GlobalDealRoomPageProps> = ({ onNavigate }) => {
  const {
    isAdmin,
    profile,
    discoveryAgents,
    dealOpportunities,
    sourceConnectors,
    isDiscoverySwarmRunning,
    runDiscoverySwarmCycle,
    runDiscoveryAgent
  } = useEcosystem();

  // Mapped directly to Autonomous Opportunity Discovery Swarm in EcosystemContext
  const agents = discoveryAgents;
  const opportunities = dealOpportunities;
  const connectors = sourceConnectors;
  const isSwarmRunning = isDiscoverySwarmRunning;

  // Local Persistent States for Deal Room pipeline & institutional threads
  const [institutions, setInstitutions] = useState<InstitutionProfile[]>(() =>
    loadDealRoomData('institutions', INITIAL_INSTITUTIONS)
  );
  const [threads, setThreads] = useState<EngagementThread[]>(() =>
    loadDealRoomData('threads', INITIAL_ENGAGEMENT_THREADS)
  );
  const [memberProjects, setMemberProjects] = useState<MemberProjectProfile[]>(() =>
    loadDealRoomData('member_projects', INITIAL_MEMBER_PROJECTS)
  );
  const [deals, setDeals] = useState<DealRecord[]>(() =>
    loadDealRoomData('deals', INITIAL_DEAL_RECORDS)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() =>
    loadDealRoomData('audit_logs', INITIAL_AUDIT_LOGS)
  );

  // Operating Context: Admin vs Member
  const [operatingContext, setOperatingContext] = useState<'admin_ops' | 'member_workspace'>(
    isAdmin ? 'admin_ops' : 'member_workspace'
  );

  // Active Tab: Base Three-Panel Explorer default
  const [activeTab, setActiveTab] = useState<
    'explorer' | 'dashboard' | 'engines' | 'command_centre' | 'funding_studio' | 'contract_bids' | 'deal_crm' | 'swarm_console' | 'member_workspace'
  >('explorer');

  // Save states to local storage
  useEffect(() => { saveDealRoomData('institutions', institutions); }, [institutions]);
  useEffect(() => { saveDealRoomData('threads', threads); }, [threads]);
  useEffect(() => { saveDealRoomData('member_projects', memberProjects); }, [memberProjects]);
  useEffect(() => { saveDealRoomData('deals', deals); }, [deals]);
  useEffect(() => { saveDealRoomData('audit_logs', auditLogs); }, [auditLogs]);

  const metrics = calculateDealRoomMetrics(opportunities, deals, threads, connectors);

  // Helper to log audit entries
  const addAuditLog = (actionType: AuditLogEntry['actionType'], details: string, targetId?: string) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
      actorName: profile?.full_name || (isAdmin ? 'BAA SuperAdmin' : 'Member Tariq'),
      actorRole: isAdmin ? 'admin' : 'member',
      actionType,
      details,
      targetId
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Swarm Cycle Trigger mapped to EcosystemContext
  const handleTriggerSwarmCycle = async () => {
    addAuditLog('opportunity_scanned', 'Initiated autonomous 12-agent multilateral scan cycle.');
    await runDiscoverySwarmCycle();
    addAuditLog('opportunity_scanned', 'Swarm cycle complete: Ingested verified notices from TED EU & Base grants.');
  };

  // Single Agent Execution mapped to EcosystemContext
  const handleTriggerAgentRun = async (agentId: string) => {
    addAuditLog('opportunity_scanned', `Executed single agent run: ${agentId}`);
    await runDiscoveryAgent(agentId as DiscoveryAgentId);
  };

  // Approval & Sending Message
  const handleApproveAndSendMessage = (threadId: string, messageId: string, adminName: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id !== threadId) return thread;

      return {
        ...thread,
        stage: 'admin_approved',
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        messages: thread.messages.map(msg => {
          if (msg.id !== messageId) return msg;
          return {
            ...msg,
            deliveryStatus: 'approved_ready',
            approvedByAdminName: adminName,
            approvalTimestamp: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
          };
        })
      };
    }));

    addAuditLog('message_approved', `Approved institutional message ${messageId} in thread ${threadId} by ${adminName}.`, threadId);
  };

  // Draft Creation
  const handleCreateDraft = (institutionId: string, subject: string, body: string, attachments: string[]) => {
    const newMsgId = `msg-${Date.now()}`;
    const newThreadId = `thread-${institutionId}-${Date.now().toString(36)}`;

    const newMsg = {
      id: newMsgId,
      threadId: newThreadId,
      senderRole: 'baa_admin' as const,
      senderName: profile?.full_name || 'BAA Institutional Board',
      senderEmail: 'admin@billionairesai.academy',
      recipientName: 'Secretariat',
      recipientRoute: institutions.find(i => i.id === institutionId)?.verifiedEmailOrRoute || 'secretariat@institution.org',
      subject,
      body,
      attachments,
      deliveryStatus: 'pending_approval' as const
    };

    const newThread = {
      id: newThreadId,
      institutionId,
      subject,
      stage: 'draft_prepared' as const,
      messages: [newMsg],
      proposalHistory: ['v1.0 Initial Draft'],
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
    };

    setThreads(prev => [newThread, ...prev]);
    addAuditLog('message_drafted', `Drafted institutional message to ${newMsg.recipientRoute}: "${subject}"`, newThreadId);
  };

  // Record Reply
  const handleRecordReply = (threadId: string, replyText: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id !== threadId) return thread;

      const replyMsg = {
        id: `msg-rep-${Date.now()}`,
        threadId,
        senderRole: 'institution_contact' as const,
        senderName: 'Institution Secretariat',
        senderEmail: institutions.find(i => i.id === thread.institutionId)?.verifiedEmailOrRoute || 'secretariat@institution.org',
        recipientName: 'BAA Institutional Board',
        recipientRoute: 'admin@billionairesai.academy',
        subject: `Re: ${thread.subject}`,
        body: replyText,
        attachments: [],
        deliveryStatus: 'delivered' as const,
        replyContent: replyText,
        replyReceivedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
      };

      return {
        ...thread,
        stage: 'reply_received',
        lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC',
        messages: [...thread.messages, replyMsg]
      };
    }));

    addAuditLog('message_sent', `Recorded incoming verified institutional reply in thread ${threadId}`, threadId);
  };

  // Stage Advancement in Pipeline
  const handleAdvanceDealStage = (dealId: string, nextStage: PipelineStage) => {
    setDeals(prev => prev.map(d => d.id === dealId ? {
      ...d,
      stage: nextStage,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
    } : d));

    addAuditLog('deal_stage_advanced', `Advanced deal ${dealId} to stage: ${nextStage}`, dealId);
  };

  // Actual Revenue Updating
  const handleUpdateActualRevenue = (dealId: string, amount: number, evidenceUrl?: string) => {
    setDeals(prev => prev.map(d => d.id === dealId ? {
      ...d,
      confirmedActualRevenueUsd: amount,
      verifiedEvidenceLink: evidenceUrl || d.verifiedEvidenceLink,
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
    } : d));

    addAuditLog('deal_stage_advanced', `Confirmed actual revenue of $${amount.toLocaleString()} for deal ${dealId}`, dealId);
  };

  // Member project saving
  const handleSaveProjectProfile = (project: MemberProjectProfile) => {
    setMemberProjects(prev => [project, ...prev.filter(p => p.id !== project.id)]);
    addAuditLog('project_assessed', `Created member project profile: ${project.projectName}`, project.id);
  };

  // Initiate Application from Studio
  const handleInitiateApplication = (projectId: string, opportunityId: string) => {
    const project = memberProjects.find(p => p.id === projectId);
    const opp = opportunities.find(o => o.id === opportunityId);
    if (!project || !opp) return;

    const newDeal: DealRecord = {
      id: `deal-${Date.now()}`,
      title: `${project.projectName} — ${opp.title}`,
      opportunityId,
      institutionId: institutions.find(i => opp.providerName.includes(i.name))?.id || institutions[0].id,
      opportunityCategory: opp.category,
      stage: 'proposal_in_progress',
      estimatedValueUsd: opp.maxFundingUsd,
      confirmedActualRevenueUsd: 0,
      currency: opp.currency,
      applicationCostUsd: 250,
      staffHoursLogged: 15,
      submissionDeadline: opp.deadline,
      nextActionDeadline: new Date(Date.now() + 86400000 * 5).toISOString().substring(0, 10),
      nextActionDescription: 'Assemble technical documentation and verified student capstone credentials.',
      contactHistoryCount: 1,
      documentsCount: project.supportingDocuments.length,
      isBaaInternalDeal: false,
      memberOwnerId: project.userId,
      createdAt: new Date().toISOString().substring(0, 10),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
    };

    setDeals(prev => [newDeal, ...prev]);
    setActiveTab('deal_crm');
    addAuditLog('deal_stage_advanced', `Initiated formal application dossier for ${project.projectName} against ${opp.title}`, newDeal.id);
  };

  // Add Deal to Pipeline from Three-Panel Explorer
  const handleAddDealToPipeline = (opp: OpportunityRecord) => {
    const existing = deals.find(d => d.opportunityId === opp.id);
    if (existing) {
      addAuditLog('deal_stage_advanced', `Found existing pipeline deal for: "${opp.title}"`, existing.id);
      setActiveTab('deal_crm');
      return;
    }

    const newDeal: DealRecord = {
      id: `deal-${Date.now()}`,
      title: opp.title,
      opportunityId: opp.id,
      institutionId: opp.providerName.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 15),
      opportunityCategory: opp.category,
      stage: 'discovered',
      estimatedValueUsd: opp.maxFundingUsd,
      confirmedActualRevenueUsd: 0,
      currency: opp.currency,
      applicationCostUsd: 0,
      staffHoursLogged: 4,
      submissionDeadline: opp.deadline,
      nextActionDeadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      nextActionDescription: `Initiate eligibility review and qualification audit for ${opp.title}`,
      contactHistoryCount: 1,
      documentsCount: 0,
      outcomeNotes: `Discovered and ingested via Autonomous Discovery Swarm.`,
      isBaaInternalDeal: operatingContext === 'admin_ops',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
    };

    setDeals(prev => [newDeal, ...prev]);
    addAuditLog('deal_stage_advanced', `Ingested new deal into 14-stage CRM pipeline: "${opp.title}"`, newDeal.id);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* OPERATING CONTEXT CONTROLLER (Admin Operations vs Member Workspace) */}
        <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400 uppercase font-semibold">
              Operating Context:
            </span>
            <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-md ${
              operatingContext === 'admin_ops'
                ? 'bg-[#FFD700] text-black'
                : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
            }`}>
              {operatingContext === 'admin_ops' ? 'BAA Administration Operations' : 'Member Funding Workspace'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setOperatingContext(operatingContext === 'admin_ops' ? 'member_workspace' : 'admin_ops')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition"
              >
                Switch to {operatingContext === 'admin_ops' ? 'Member Mode' : 'Admin Operations'}
              </button>
            )}

            {onNavigate && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-3 py-1.5 rounded-lg bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/30 text-xs font-bold transition"
              >
                Student Portal
              </button>
            )}
          </div>
        </div>

        {/* PRIMARY MODULE NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-zinc-800 pb-2 text-xs">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'explorer'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Opportunity Explorer (3-Panel)</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
              activeTab === 'explorer' ? 'bg-black/25 text-black' : 'bg-zinc-800 text-zinc-300'
            }`}>
              {opportunities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Executive Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('engines')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'engines'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Six Opportunity Engines ({opportunities.length})</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setActiveTab('command_centre')}
              className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'command_centre'
                  ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Institutional Command Centre</span>
              <span className="text-[10px] font-mono px-1 rounded bg-red-950 text-red-400 border border-red-800">
                ADMIN
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('funding_studio')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'funding_studio'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>AI Project Funding Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('contract_bids')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'contract_bids'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Contract Bid Workflow</span>
          </button>

          <button
            onClick={() => setActiveTab('deal_crm')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'deal_crm'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Deal Pipeline CRM ({deals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('swarm_console')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'swarm_console'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Discovery Swarm (12 Agents)</span>
          </button>

          <button
            onClick={() => setActiveTab('member_workspace')}
            className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'member_workspace'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Member Funding Suite</span>
          </button>
        </div>

        {/* ACTIVE TAB CONTENT */}
        {activeTab === 'explorer' && (
          <ThreePanelOpportunityExplorer
            opportunities={opportunities}
            agents={agents}
            connectors={connectors}
            isSwarmRunning={isSwarmRunning}
            onTriggerSwarmCycle={handleTriggerSwarmCycle}
            onSelectForOutreach={(opp) => {
              setActiveTab('command_centre');
            }}
            onSelectForFundingStudio={(opp) => {
              setActiveTab('funding_studio');
            }}
            onSelectForBidWorkflow={(opp) => {
              setActiveTab('contract_bids');
            }}
            onAddDealToPipeline={handleAddDealToPipeline}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'dashboard' && (
          <DealRoomLiveDashboard
            metrics={metrics}
            connectors={connectors}
            onTriggerSync={handleTriggerSwarmCycle}
            isSyncing={isSwarmRunning}
          />
        )}

        {activeTab === 'engines' && (
          <SixOpportunityEnginesRadar
            opportunities={opportunities}
            isAdmin={isAdmin}
            onSelectForOutreach={(opp) => {
              setActiveTab('command_centre');
            }}
            onSelectForFundingStudio={(opp) => {
              setActiveTab('funding_studio');
            }}
          />
        )}

        {activeTab === 'command_centre' && (
          isAdmin ? (
            <InstitutionalCommandCentre
              institutions={institutions}
              threads={threads}
              opportunities={opportunities}
              onApproveAndSendMessage={handleApproveAndSendMessage}
              onCreateDraft={handleCreateDraft}
              onRecordReply={handleRecordReply}
              onScheduleFollowUp={(threadId, date) => {
                setThreads(prev => prev.map(t => t.id === threadId ? { ...t, followUpDate: date } : t));
                addAuditLog('message_sent', `Scheduled follow-up for thread ${threadId} on ${date}`, threadId);
              }}
              onArchiveThread={(threadId) => {
                setThreads(prev => prev.map(t => t.id === threadId ? { ...t, stage: 'archived' } : t));
                addAuditLog('message_sent', `Archived thread ${threadId}`, threadId);
              }}
              auditLogs={auditLogs}
              currentAdminName={profile?.full_name || 'SuperAdmin Tariq'}
            />
          ) : (
            <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <Lock className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-white">Administrator Access Required</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Only authenticated BAA administrators may communicate externally with institutional secretariats on behalf of the Academy.
              </p>
              <button
                onClick={() => setActiveTab('member_workspace')}
                className="px-4 py-2 bg-[#FFD700] text-black font-bold rounded-xl text-xs"
              >
                Go to Member Funding Workspace
              </button>
            </div>
          )
        )}

        {activeTab === 'funding_studio' && (
          <AIProjectFundingStudio
            memberProjects={memberProjects}
            opportunities={opportunities}
            onSaveProjectProfile={handleSaveProjectProfile}
            onInitiateApplication={handleInitiateApplication}
            onNavigateToCourse={(courseTitle) => {
              if (onNavigate) onNavigate('academy');
            }}
          />
        )}

        {activeTab === 'contract_bids' && (
          <ContractBidWorkflow
            opportunities={opportunities}
            deals={deals}
            onAdvanceDealStage={handleAdvanceDealStage}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'deal_crm' && (
          <UnifiedDealPipelineCRM
            deals={deals}
            onAdvanceDealStage={handleAdvanceDealStage}
            onUpdateActualRevenue={handleUpdateActualRevenue}
            isAdmin={isAdmin}
          />
        )}

        {activeTab === 'swarm_console' && (
          <AutonomousDiscoverySwarmConsole
            agents={agents}
            connectors={connectors}
            onTriggerAgentRun={handleTriggerAgentRun}
            onTriggerSwarmCycle={handleTriggerSwarmCycle}
            isSwarmRunning={isSwarmRunning}
          />
        )}

        {activeTab === 'member_workspace' && (
          <MemberDealWorkspace
            projects={memberProjects}
            opportunities={opportunities}
            onNavigateToCourse={(courseTitle) => {
              if (onNavigate) onNavigate('academy');
            }}
            onNavigateToLibrary={() => {
              if (onNavigate) onNavigate('ebooks');
            }}
          />
        )}
      </div>
    </div>
  );
};
