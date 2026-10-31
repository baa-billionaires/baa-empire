export type OpportunityCategory =
  | 'ai_contracts'
  | 'grants_innovation'
  | 'project_loans'
  | 'equity_vc'
  | 'compute_credits'
  | 'corporate_partnerships';

export type FundingType =
  | 'contract'
  | 'grant'
  | 'debt_loan'
  | 'equity'
  | 'non_cash_credit'
  | 'revenue_share_partnership';

export interface OpportunityRecord {
  id: string;
  title: string;
  category: OpportunityCategory;
  fundingType: FundingType;
  providerName: string;
  providerType: 'Government / Multilateral' | 'Technology Hyperscaler' | 'Venture Capital & Angels' | 'Commercial & DFI Bank' | 'Foundation & Research Council' | 'Enterprise Corporate';
  officialSourceUrl: string;
  publishedDate: string;
  deadline: string;
  lastVerifiedAt: string;
  isVerified: boolean;
  status: 'active' | 'under_review' | 'expired' | 'withdrawn';
  summary: string;
  scopeOfWork: string;
  eligibleCountries: string[];
  eligibleApplicantTypes: string[];
  sector: string;
  minFundingUsd: number;
  maxFundingUsd: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'NGN' | 'BaaCoin';
  applicationMethod: 'direct_portal' | 'procurement_portal' | 'institutional_email' | 'partner_intake';
  requiredQualifications: string[];
  requiredDocuments: string[];
  collateralOrEquityTerms?: string;
  interestOrFeeTerms?: string;
  questionsProcedure: string;
  bidAssessmentNotes: string;
  confidenceScore: number;
  featured?: boolean;
  originatingAgentId?: DiscoveryAgentId | string;
}

export type DiscoveryAgentId =
  | 'GlobalOpportunityScanner'
  | 'AIContractHunter'
  | 'GrantAndInnovationScout'
  | 'ProjectLoanFinder'
  | 'InvestorDiscoveryAgent'
  | 'ComputeCreditScout'
  | 'PartnershipHunter'
  | 'OpportunityVerificationAgent'
  | 'EligibilityMatchingAgent'
  | 'DeadlineMonitor'
  | 'ProposalPreparationAgent'
  | 'DealPipelineCoordinator';

export interface DiscoveryAgent {
  id: DiscoveryAgentId;
  name: string;
  role: string;
  purpose: string;
  approvedSources: string[];
  inputSchema: string;
  outputSchema: string;
  lastRunTimestamp: string;
  executionStatus: 'idle' | 'running' | 'completed' | 'paused' | 'error';
  itemsFoundCount: number;
  errorLog?: string;
}

export interface SourceConnector {
  id: string;
  name: string;
  category: OpportunityCategory;
  officialUrl: string;
  authType: 'public_api' | 'api_key_required' | 'portal_credential' | 'manual_feed' | 'open_data';
  connectionStatus: 'connected_live' | 'credentials_required' | 'syncing' | 'offline_manual';
  lastSyncTime: string;
  recordsIngested: number;
  requirementsNote: string;
}

export interface InstitutionProfile {
  id: string;
  name: string;
  type: 'corporate_buyer' | 'grant_foundation' | 'venture_capital' | 'commercial_bank' | 'cloud_hyperscaler' | 'accelerator';
  headquarters: string;
  officialWebsite: string;
  contactChannel: string;
  verifiedEmailOrRoute: string;
  contactVerificationStatus: 'verified_official' | 'pending_audit' | 'unverified';
  matchScore: number;
  matchedOpportunitiesCount: number;
  previousInteractionsCount: number;
  recommendedNextAction: string;
  overview: string;
  eligibleSectors: string[];
}

export interface EngagementMessage {
  id: string;
  threadId: string;
  senderRole: 'baa_admin' | 'institution_contact';
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientRoute: string;
  subject: string;
  body: string;
  attachments: string[];
  approvedByAdminName?: string;
  approvalTimestamp?: string;
  sentTimestamp?: string;
  deliveryStatus: 'draft' | 'pending_approval' | 'approved_ready' | 'submitted_verified' | 'delivered' | 'bounced';
  replyContent?: string;
  replyReceivedAt?: string;
  isCopyReadyFallback?: boolean;
}

export interface EngagementThread {
  id: string;
  institutionId: string;
  opportunityId?: string;
  subject: string;
  stage: 'lead_identified' | 'draft_prepared' | 'admin_approved' | 'sent' | 'reply_received' | 'follow_up_scheduled' | 'archived';
  messages: EngagementMessage[];
  proposalHistory: string[];
  lastUpdated: string;
  followUpDate?: string;
}

export interface MemberProjectProfile {
  id: string;
  userId: string;
  userName: string;
  projectName: string;
  description: string;
  country: string;
  industry: string;
  businessStage: 'Pre-Seed / Prototype' | 'MVP & Early Users' | 'Revenue Generating' | 'Scaling Enterprise';
  legalEntityStatus: 'Registered Limited Co. (RC/CAC)' | 'Unincorporated Team' | 'Cooperative / Joint Venture' | 'Non-Profit / NGO';
  fundingRequirementUsd: number;
  currency: 'USD' | 'NGN' | 'BaaCoin';
  intendedUseOfFunds: string;
  projectBudgetUsd: number;
  estimatedAnnualRevenueUsd: number;
  availableCollateralOrEquity: string;
  supportingDocuments: string[];
  matchedOpportunities: Array<{
    opportunityId: string;
    matchScore: number;
    matchReasons: string[];
    eligibilityGaps: string[];
    recommendedBaaCourses: string[];
    confidence: number;
  }>;
  createdAt: string;
}

export interface FundingReadinessAudit {
  id: string;
  projectId: string;
  financialModelReadinessScore: number;
  businessCaseScore: number;
  documentCompletenessScore: number;
  riskScore: number; // 0-100 where lower is better
  riskFactors: string[];
  auditFeedback: string;
  recommendedNextActions: string[];
  lastAuditedAt: string;
}

export type PipelineStage =
  | 'discovered'
  | 'source_verified'
  | 'eligibility_checked'
  | 'matched'
  | 'under_review'
  | 'contact_drafted'
  | 'approved'
  | 'contacted'
  | 'response_received'
  | 'proposal_in_progress'
  | 'submitted'
  | 'negotiation'
  | 'won'
  | 'lost'
  | 'rejected'
  | 'expired'
  | 'withdrawn';

export interface DealRecord {
  id: string;
  title: string;
  opportunityId: string;
  institutionId: string;
  opportunityCategory: OpportunityCategory;
  stage: PipelineStage;
  estimatedValueUsd: number;
  confirmedActualRevenueUsd: number; // Stored separately from estimated
  currency: 'USD' | 'EUR' | 'GBP' | 'NGN' | 'BaaCoin';
  applicationCostUsd: number;
  staffHoursLogged: number;
  submissionDeadline: string;
  nextActionDeadline: string;
  nextActionDescription: string;
  contactHistoryCount: number;
  documentsCount: number;
  outcomeNotes?: string;
  verifiedEvidenceLink?: string;
  isBaaInternalDeal: boolean;
  memberOwnerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DealRoomDashboardMetrics {
  newOpportunitiesDiscovered: number;
  opportunitiesVerified: number;
  potentialMatches: number;
  deadlinesApproaching: number;
  contractsUnderReview: number;
  fundingApplicationsInProgress: number;
  institutionalConversations: number;
  confirmedReplies: number;
  proposalsSubmitted: number;
  contractsWon: number;
  actualFundingSecuredUsd: number;
  actualRevenueEarnedUsd: number;
  activeConnectorsCount: number;
  lastSyncTimestamp: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: 'admin' | 'member' | 'agent';
  actionType: 'opportunity_scanned' | 'message_drafted' | 'message_approved' | 'message_sent' | 'deal_stage_advanced' | 'project_assessed';
  details: string;
  targetId?: string;
}
