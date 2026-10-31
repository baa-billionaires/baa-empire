export type PolicyLegalStatus =
  | 'enacted_law'
  | 'proposed_legislation'
  | 'regulatory_guidance'
  | 'voluntary_standard'
  | 'draft_standard'
  | 'multilateral_treaty';

export type GovernanceJurisdiction =
  | 'European Union'
  | 'United States'
  | 'Pan-African & AU'
  | 'Global / Multilateral'
  | 'United Kingdom'
  | 'Asia-Pacific'
  | 'Nigeria & ECOWAS';

export interface PolicyRecord {
  id: string;
  title: string;
  issuingBody: string;
  jurisdiction: GovernanceJurisdiction;
  legalStatus: PolicyLegalStatus;
  publicationDate: string;
  effectiveDate?: string;
  lastVerifiedAt: string;
  officialSourceUrl: string;
  summary: string;
  keyRequirements: string[];
  affectedSectors: string[];
  relatedStandards: string[];
  timelineMilestones: Array<{ date: string; description: string; isPast: boolean }>;
  complianceReadinessNotes: string;
  isStale?: boolean;
}

export interface PVAIDCPrinciple {
  number: number;
  id: string;
  name: string;
  shortDesc: string;
  fullStatement: string;
  operationalRequirements: string[];
  nistMapping: string;
  oecdMapping: string;
  w3cMapping: string;
  testableHypothesis: string;
  unresolvedQuestions: string[];
  limitations: string;
  revisionsCount: number;
  publicCommentsCount: number;
}

export interface AgentConstitution {
  id: string;
  agentName: string;
  version: string;
  purpose: string;
  scope: string;
  allowedActions: string[];
  prohibitedActions: string[];
  permissionBoundaries: {
    maxSingleTransactionUsd: number;
    maxDailyBudgetUsd: number;
    allowedDomains: string[];
    allowedChains: string[];
    canInitiateExternalComm: boolean;
  };
  humanApprovalCheckpoints: string[];
  identityAuthRequirements: string[];
  dataProtectionRules: string[];
  loggingAuditRequirements: string[];
  failureRecoveryProcedures: string[];
  cyberThreatMitigations: string[];
  applicableStandards: string[];
  testSuitesPlanned: string[];
  generatedPolicySchemaJson: string;
  readinessScore: number;
  status: 'draft' | 'under_review' | 'compiled_ready' | 'active_monitored';
  createdAt: string;
  updatedAt: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  category: 'spending_limits' | 'blockchain_integrity' | 'multi_agent_conflict' | 'credential_leak' | 'hallucination' | 'data_sovereignty';
  threatOrRequirement: string;
  initialConditions: string;
  expectedBehavior: string;
  simulatedResult: string;
  status: 'passed' | 'failed' | 'warning' | 'untested';
  severity: 'low' | 'medium' | 'high' | 'critical';
  reproductionSteps: string[];
  remediationSuggestions: string[];
  isRealWorldObservation: boolean;
  lastSimulatedAt: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  abstract: string;
  status: 'open_rfc' | 'peer_reviewed' | 'working_draft' | 'final_recommendation';
  version: string;
  publishedDate: string;
  primaryPvaidcPrinciple: number;
  doiOrHandle: string;
  downloadUrl?: string;
  reviewsCount: number;
  commentsCount: number;
  githubRefUrl?: string;
}

export interface TrustPassport {
  id: string;
  agentId: string;
  agentName: string;
  developerDid: string;
  declaredRole: string;
  capabilities: string[];
  knownLimitations: string[];
  supportedProtocols: string[];
  w3cCredentialType: string[];
  issuerDid: string;
  issuanceDate: string;
  expirationDate: string;
  securityAuditScore: number;
  conformanceTestsPassed: number;
  totalConformanceTests: number;
  incidentHistoryCount: number;
  cryptographicSignature: string;
  verificationStatus: 'verified_active' | 'pending_reassessment' | 'revoked';
}
