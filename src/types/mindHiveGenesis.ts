// BAA UNIVERSAL AUTONOMOUS AI DATA CENTER (UA-AIDC)
// MODULE 4: MIND HIVE V17 — GENESIS CIVILIZATION EXPANSION
// AUTONOMOUS VENTURE CREATION, EVOLUTION & COLONY FUSION ENGINE

export type GenesisLifecycleStage =
  | 'DISCOVER'
  | 'DESIGN'
  | 'ASSEMBLE'
  | 'SIMULATE'
  | 'VALIDATE'
  | 'BUILD'
  | 'APPROVE'
  | 'LAUNCH'
  | 'MEASURE'
  | 'EVOLVE';

export type GenesisModuleId =
  | 'oracle_colony'
  | 'evolution_lab'
  | 'symbiosis_colony'
  | 'mirrorverse'
  | 'nexus_memory'
  | 'swarm_foundry'
  | 'provenance_vault'
  | 'empire_exchange';

export type UaidcColonyDependency =
  | 'CE_COLONY_V12'
  | 'CODE_VEIN_V13'
  | 'AURUM_COLONY_V13'
  | 'MIND_HIVE_V17';

export interface VentureDna {
  id: string;
  name: string;
  codename: string;
  tagline: string;
  category: 'AUTONOMOUS_SAAS' | 'DECENTRALIZED_INFRA' | 'HEALTH_AI' | 'AGRI_SUPPLY' | 'FINTECH_RAILS' | 'ROBOTICS_LOGISTICS';
  currentStage: GenesisLifecycleStage;
  
  // Contributors & Attribution
  originalIdea: string;
  primaryAuthor: string;
  contributors: { name: string; role: string; equityPercent: number; verifiedDate: string }[];
  
  // Problem & Market Evidence
  problemStatement: string;
  targetCustomers: string[];
  marketEvidenceSummary: string;
  confidenceScore: number; // 0-100%
  uncertaintyScore: number; // 0-100%
  
  // Technical Specifications & Architecture
  specSummary: string;
  techStack: string[];
  requiredApis: string[];
  requiredColonies: UaidcColonyDependency[];
  
  // Budgets & Resources
  computeBudgetMonthlyUsd: number;
  operatingBudgetMonthlyUsd: number;
  totalCapBudgetUsd: number;
  utilizedBudgetUsd: number;
  
  // IP, Licensing & Permissions
  ipStatus: 'PROVISIONAL_FILED' | 'VERIFIED_CLEAN' | 'NEEDS_RIGHTS_CLEARANCE' | 'OPEN_SOURCE_APACHE2';
  parentVentureId?: string;
  childVentureIds: string[];
  fusionComponentIds: string[];
  
  // Customer Validation Evidence (Separate from predictions)
  validationState: {
    interviewsCompleted: number;
    pilotCommitmentsCount: number;
    paidLetterOfIntentUsd: number;
    validatedCustomerSegments: string[];
    evidenceNotes: string;
  };
  
  // Performance & Commercial Financials
  financials: {
    grossRevenueUsd: number;
    netClientShareUsd: number; // 70%
    platformShareUsd: number; // 30%
    monthlyRecurringRevenueUsd: number;
    activeUsersCount: number;
    isProfitable: boolean;
  };
  
  // Risk & Security Controls
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  securityChecksPassed: boolean;
  emergencyKillSwitchActive: boolean;
  
  createdAt: string;
  updatedAt: string;
}

export interface OracleMarketSignal {
  id: string;
  title: string;
  domain: string;
  sourceType: 'AUTHORIZED_ENTERPRISE_TENDER' | 'GITHUB_TRENDS' | 'REGIONAL_SERVICE_GAP' | 'VERIFIED_USER_REQUEST' | 'API_FAILOVER_LOG';
  detectedProblem: string;
  unmetDemandEstimateUsd: number;
  evidenceLinks: string[];
  matchedColonyCapabilities: UaidcColonyDependency[];
  confidencePercent: number;
  uncertaintyPercent: number;
  isConfirmedCustomerDemand: boolean; // Must always be false for automated predictions
  recommendedVentureAngle: string;
  detectedAt: string;
}

export interface MirrorverseSimulation {
  id: string;
  ventureId: string;
  simulationName: string;
  environmentType: 'HIGH_CONCURRENCY_STRESS' | 'NETWORK_OUTAGE_FALLBACK' | 'DYNAMIC_PRICING_TEST' | 'INFRA_COST_SPIKE';
  simulatedUserAgents: number;
  simulatedDaysRun: number;
  simulatedInfraCostUsd: number;
  predictedGrossRevenueUsd: number;
  projectedBreakEvenMonths: number;
  failureRatePercent: number;
  simulationLabel: 'SYNTHETIC_DIGITAL_TWIN' | 'SANDBOX_STRESS_TEST'; // Explicit label separating from real data
  simulationKeyFindings: string[];
  runAt: string;
}

export interface InventionTournament {
  id: string;
  problemTitle: string;
  challengeBrief: string;
  targetDomain: string;
  prizePoolUsd: number;
  status: 'DISCOVERY' | 'ACTIVE_BENCHMARK' | 'COMMERCIAL_AUDIT' | 'CONCLUDED';
  candidates: TournamentCandidate[];
  createdAt: string;
  concludedAt?: string;
}

export interface TournamentCandidate {
  candidateId: string;
  ventureName: string;
  contributorName: string;
  approachSummary: string;
  controlledBudgetAllocatedUsd: number;
  technicalReliabilityScore: number; // 0-100
  customerFeedbackScore: number; // 0-100
  unitCostScore: number; // 0-100
  securityScore: number; // 0-100
  verifiedDemandEvidenceScore: number; // 0-100
  demandEvidenceScore?: number;
  overallWeightedScore: number;
  isWinner: boolean;
  rank: number;
}

export interface ColonyFusionProposal {
  id: string;
  fusionName: string;
  description: string;
  targetMarket: string;
  sourceCapabilities: {
    colony: UaidcColonyDependency;
    assetName: string;
    ownerName: string;
    originalVentureId?: string;
    verifiedRightsClean: boolean;
  }[];
  compatibilityScore: number; // 0-100
  revenueSharingAgreement: {
    partyName: string;
    sharePercent: number;
    contributionRole: string;
  }[];
  regulatoryApprovalPassed: boolean;
  status: 'DRAFT_PROPOSAL' | 'RIGHTS_CLEARING' | 'SIMULATING' | 'AWAITING_APPROVAL' | 'FUSED_ACTIVE';
  createdAt: string;
}

export interface BusinessResurrectionReview {
  id: string;
  assetName: string;
  originalCreator: string;
  stalledReason: 'MARKETING_DROPOFF' | 'HIGH_SERVER_COST' | 'MISSING_API_INTEGRATION' | 'UNPROFITABLE_UNIT_ECONOMICS';
  availableSourceCodeLines: number;
  technicalConditionScore: number; // 0-100
  activeResidualTraffic: number;
  estimatedRelaunchCostUsd: number;
  projectedRecoverableRevenueUsd: number;
  recommendation: 'REPAIR_AND_RELAUNCH' | 'CONVERT_TO_MICRO_API' | 'MERGE_INTO_COLONY_FUSION' | 'RETIRE_CLEANLY';
  rightsOwnershipConfirmed: boolean;
  requiresHumanAcquisitionConsent: boolean;
  requiresHumanConsent?: boolean;
  reviewedAt: string;
}

export interface OpportunityGravityNode {
  id: string;
  label: string;
  type: 'DEMAND' | 'COMPUTE' | 'SOFTWARE' | 'ASSET' | 'REGIONAL_GAP';
  region?: string;
  strength: number; // 1-100
  colonyAffiliation: UaidcColonyDependency;
  valueUsd: number;
  connectedEdgeCount: number;
}

export interface OpportunityGravityEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  synergyType: 'DATA_TO_COMPUTE' | 'DEMAND_TO_SOFTWARE' | 'ASSET_TO_MARKETPLACE' | 'REGIONAL_CROSS_COLONY';
  weight: number;
  commercialViabilityScore: number;
}

export interface SwarmFoundryAgent {
  id: string;
  agentName: string;
  assignedVentureId: string;
  specialistRole: string;
  allocatedComputeGpuHours: number;
  maxSpendingLimitUsd: number;
  actualComputeConsumedGpuHours: number;
  actualCostUsd: number;
  grantedTools: string[];
  credentialRevocationDate: string;
  status: 'ACTIVE_WORKING' | 'COMPLETED' | 'REVOKED_RETIRED' | 'SUSPENDED';
}

export interface ProvenanceRecord {
  id: string;
  ventureId: string;
  assetTitle: string;
  actionType: 'ORIGINAL_IDEA_REGISTERED' | 'CODE_MERGED' | 'MODEL_DEPENDENCY_LINKED' | 'DATASET_LICENSE_ATTESTED' | 'ROYALTY_SPLIT_SIGNED';
  authorSignature: string;
  timestamp: string;
  immutableContentHash: string;
  termsSummary: string;
}

export interface EmpireExchangeListing {
  id: string;
  ventureId: string;
  title: string;
  assetType: 'AUTONOMOUS_BUSINESS' | 'LICENSED_MICRO_API' | 'PATENT_BLUEPRINT' | 'CROSS_COLONY_INTEGRATION';
  askingPriceUsd: number;
  askingPriceNgn: number;
  monthlyRevenueRunRateUsd: number;
  verifiedDueDiligenceScore: number;
  sellerEntity: string;
  milestonePaymentEscrowAllowed: boolean;
  status: 'AVAILABLE' | 'UNDER_OFFER' | 'IN_DUE_DILIGENCE' | 'ACQUIRED';
  listedAt: string;
}

export interface GenesisApprovalRequest {
  id: string;
  requestType: 'CAPITAL_EXPENDITURE' | 'LIVE_DEPLOY' | 'COLONY_FUSION_MERGE' | 'IP_ACQUISITION' | 'PAYOUT_WITHDRAWAL';
  ventureId?: string;
  ventureName?: string;
  requestTitle: string;
  description: string;
  requestedAmountUsd?: number;
  riskAssessment: string;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface GenesisLedgerEntry {
  id: string;
  txRef: string;
  ventureId?: string;
  ventureName?: string;
  type: 'VENTURE_COMMISSION' | 'API_LICENSING' | 'EMPIRE_ACQUISITION' | 'PAYOUT_WITHDRAWAL';
  grossUsd: number;
  clientShareUsd: number; // 70%
  platformShareUsd: number; // 30%
  grossNgn: number;
  clientShareNgn: number;
  platformShareNgn: number;
  paymentMethod: 'PAYSTACK' | 'ON_CHAIN_SETTLED';
  status: 'CONFIRMED' | 'SETTLED' | 'PENDING';
  timestamp: string;
}

export interface MindHiveGenesisState {
  version: string;
  name: string;
  tagline: string;
  initializedAt: string;
  config: {
    dataDir: string;
    paystackMode: 'TEST' | 'LIVE';
    paystackPublicKey: string;
    clientSplitPercent: number; // 70
    platformSplitPercent: number; // 30
    adminEmail: string;
    ngnExchangeRate: number; // 1500
    emergencyMasterShutdown: boolean;
  };
  metrics: {
    totalActiveVentures: number;
    totalGrossCommercialRevenueUsd: number;
    clientNetEarningsUsd: number;
    platformNetEarningsUsd: number;
    totalWithdrawnUsd: number;
    availableWithdrawableUsd: number;
    availableWithdrawableNgn: number;
    totalTournamentsCompleted: number;
    totalFusionsActive: number;
    resurrectedBusinessesCount: number;
    totalSimulationsRun: number;
    activeSwarmAgentsCount: number;
    pendingApprovalsCount: number;
  };
  ventures: VentureDna[];
  oracleSignals: OracleMarketSignal[];
  simulations: MirrorverseSimulation[];
  tournaments: InventionTournament[];
  fusionProposals: ColonyFusionProposal[];
  resurrectionReviews: BusinessResurrectionReview[];
  gravityNodes: OpportunityGravityNode[];
  gravityEdges: OpportunityGravityEdge[];
  swarmAgents: SwarmFoundryAgent[];
  provenanceVault: ProvenanceRecord[];
  exchangeListings: EmpireExchangeListing[];
  approvals: GenesisApprovalRequest[];
  ledger: GenesisLedgerEntry[];
}
