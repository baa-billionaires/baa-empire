// =========================================================================
// UA-AIDC / MIND HIVE V22 TYPES
// THE GLOBAL KNOWLEDGE CAPITAL, INTELLIGENCE ATLAS & HUMAN–AI VALUE CIVILIZATION
// =========================================================================

// -------------------------------------------------------------------------
// 1. KNOWLEDGE CAPITAL EXCHANGE (KCX) TYPES
// -------------------------------------------------------------------------

export type KcxLicenseModel =
  | 'free_open_access'
  | 'paid_download'
  | 'non_exclusive_commercial'
  | 'exclusive_commercial'
  | 'time_limited_subscription'
  | 'academic_research_only'
  | 'enterprise_unlimited_sla'
  | 'api_programmatic_access'
  | 'usage_based_inference'
  | 'commissioned_production';

export type KcxAssetCategory =
  | 'book_manuscript'
  | 'research_whitepaper'
  | 'educational_curriculum'
  | 'audio_library'
  | 'video_masterclass'
  | 'ai_training_dataset'
  | 'industry_intelligence_report'
  | 'language_speech_corpus'
  | 'technical_specification'
  | 'software_code_api'
  | 'specialized_knowledge_collection';

export interface KcxKnowledgeAsset {
  id: string;
  title: string;
  slug: string;
  category: KcxAssetCategory;
  author: string;
  authorEmail: string;
  coAuthors?: string[];
  organization?: string;
  summary: string;
  contentHashSha256: string;
  registeredAt: string;
  verificationStatus: 'verified_owner' | 'verified_licensee' | 'pending_verification' | 'disputed';
  rightsDeclaration: {
    copyrightOwner: string;
    jurisdiction: string;
    allowDerivatives: boolean;
    licenseModelsAllowed: KcxLicenseModel[];
  };
  valuation: {
    estimatedMinUsd: number;
    estimatedMaxUsd: number;
    qualityScore: number; // 0 - 100
    demandScore: number; // 0 - 100
    valuationDate: string;
    factors: {
      originality: number;
      completeness: number;
      researchValue: number;
      marketDemand: number;
      structureQuality: number;
    };
    recommendedLicensing: KcxLicenseModel[];
    potentialBuyers: string[];
  };
  metrics: {
    viewsCount: number;
    inquiriesCount: number;
    activeLicensesCount: number;
    settledRevenueUsd: number;
    pendingRevenueUsd: number;
  };
  listingPriceUsd: number;
  listingStatus: 'active' | 'draft' | 'under_review' | 'licensed_exclusive' | 'archived';
  samplePreviewText?: string;
  fileFormat: string;
  fileSizeBytes: number;
}

export interface KcxBuyerRequest {
  id: string;
  buyerName: string;
  buyerOrg: string;
  buyerType:
    | 'ai_lab'
    | 'ai_developer'
    | 'research_university'
    | 'publisher'
    | 'media_corp'
    | 'enterprise_buyer'
    | 'edtech_institution'
    | 'language_tech_co';
  title: string;
  description: string;
  targetCategory: KcxAssetCategory;
  budgetUsd: number;
  preferredLicense: KcxLicenseModel;
  urgency: 'high' | 'medium' | 'low';
  createdAt: string;
  status: 'open' | 'negotiating' | 'fulfilled' | 'closed';
  proposalsCount: number;
}

export interface KcxOffer {
  id: string;
  assetId: string;
  assetTitle: string;
  buyerId: string;
  buyerName: string;
  buyerOrg: string;
  proposedAmountUsd: number;
  proposedLicense: KcxLicenseModel;
  durationMonths?: number;
  specialTerms: string;
  submittedAt: string;
  stage: 'inquiry' | 'quote_prepared' | 'term_sheet' | 'contract_review' | 'escrow_pending' | 'settled';
  platformFeeUsd: number;
  creatorEarningsUsd: number;
  creatorEarningsNgn: number;
}

export interface KcxLicenseAgreement {
  id: string;
  agreementCode: string;
  assetId: string;
  assetTitle: string;
  licensorName: string;
  licenseeName: string;
  licenseeOrg: string;
  licenseType: KcxLicenseModel;
  effectiveDate: string;
  expiryDate?: string;
  settledAmountUsd: number;
  settledAmountNgn: number;
  royaltySplitPercent: {
    creator: number; // e.g. 70
    platform: number; // e.g. 30
  };
  escrowStatus: 'released_to_creator' | 'held_in_escrow' | 'pending_verification';
  signedContractHashSha256: string;
}

export interface KcxAgentRecord {
  id: string;
  name: string;
  role: string;
  category: 'valuation' | 'demand_hunting' | 'buyer_discovery' | 'matching' | 'contract' | 'quality' | 'royalty';
  status: 'idle' | 'executing' | 'awaiting_approval';
  autonomyLevel: 'Assisted' | 'Supervised' | 'Autonomous';
  currentTask: string;
  verifiedActionsToday: number;
  budgetAllocatedUsd: number;
  budgetSpentUsd: number;
  lastExecutionTimestamp: string;
  approvalRequired: boolean;
  historySummary: string;
}

// -------------------------------------------------------------------------
// 2. GLOBAL KNOWLEDGE ATLAS (GKA) TYPES
// -------------------------------------------------------------------------

export type GkaTerritoryId =
  | 'education'
  | 'agriculture'
  | 'healthcare'
  | 'engineering'
  | 'artificial_intelligence'
  | 'blockchain'
  | 'finance'
  | 'manufacturing'
  | 'energy'
  | 'transportation'
  | 'real_estate'
  | 'climate_environment'
  | 'marine_ocean'
  | 'space_science'
  | 'governance_public'
  | 'culture_languages'
  | 'media_entertainment'
  | 'business_entrepreneurship'
  | 'cybersecurity'
  | 'robotics_automation';

export interface GkaTerritory {
  id: GkaTerritoryId;
  name: string;
  tagline: string;
  colorHex: string;
  iconName: string;
  coverageScorePercent: number; // 0 - 100
  registeredAssetsCount: number;
  identifiedGapsCount: number;
  activeOpportunitiesCount: number;
  totalMarketValueEstimateUsd: number;
  keyProblems: string[];
  innovationOpportunities: string[];
  existingSolutions: string[];
  potentialBuyers: string[];
  assignedAgents: string[];
  summary: string;
}

export interface GkaKnowledgeGap {
  id: string;
  territoryId: GkaTerritoryId;
  title: string;
  problemStatement: string;
  evidence: string;
  sourceReferences: string[];
  confidenceLevel: number; // 0 - 100
  urgency: 'critical' | 'high' | 'medium';
  targetGeography: string;
  targetIndustry: string;
  recommendedAssetType: KcxAssetCategory;
  estimatedDevCostUsd: number;
  potentialCommercialValueUsd: number;
  status: 'discovered' | 'validating' | 'in_development' | 'resolved';
  discoveredAt: string;
}

export interface GkaGravityNode {
  id: string;
  label: string;
  type: 'gap' | 'asset' | 'dataset' | 'ai_model' | 'buyer' | 'opportunity';
  territoryId: GkaTerritoryId;
  importance: number; // 1 - 10
  connections: string[]; // Node IDs
  metricsSummary: string;
}

export interface GkaLanguageResource {
  id: string;
  languageName: string;
  region: string;
  speakersCountEstimate: number;
  resourceType: 'speech_corpus' | 'parallel_translation' | 'cultural_folklore' | 'technical_glossary' | 'audio_dialogue';
  datasetSizeSummary: string;
  licensingStatus: 'open_licensed' | 'consented_commercial' | 'in_gathering';
  commercialDemandScore: number;
  leadContributor: string;
}

export interface GkaAgentRecord {
  id: string;
  name: string;
  role: string;
  focusTerritory: string;
  status: 'scanning' | 'synthesizing' | 'idle';
  findingsCountToday: number;
  currentInvestigation: string;
  confidenceThreshold: number;
  lastUpdated: string;
}

// -------------------------------------------------------------------------
// 3. HUMAN–AI VALUE COOPERATIVE (HAVC) TYPES
// -------------------------------------------------------------------------

export interface HavcContributorProfile {
  id: string;
  displayIdentity: string;
  realNameOrOrg: string;
  role: 'author' | 'researcher' | 'developer' | 'translator' | 'data_specialist' | 'educator' | 'ai_trainer';
  bio: string;
  location: string;
  verifiedBadges: string[];
  skills: string[];
  reputationScore: number; // 0 - 1000
  totalContributions: number;
  settledEarningsUsd: number;
  settledEarningsNgn: number;
  pendingEarningsUsd: number;
  privacySetting: 'public' | 'pseudonymous' | 'private_audit_only';
  joinedAt: string;
}

export interface HavcContributionDnaRecord {
  id: string;
  assetOrProjectId: string;
  itemTitle: string;
  contributorId: string;
  contributorName: string;
  contributionRole: string;
  contributionType: 'human_intellectual' | 'ai_assisted_structuring' | 'peer_review' | 'translation' | 'dataset_collection';
  contributionPercentage: number;
  evidenceHashSha256: string;
  timestamp: string;
  agreedSharePercent: number;
  approvedByOwner: boolean;
}

export interface HavcCollaborativeProject {
  id: string;
  title: string;
  category: KcxAssetCategory;
  ownerId: string;
  ownerName: string;
  status: 'recruiting' | 'in_progress' | 'review' | 'published' | 'commercialized';
  completionPercent: number;
  milestonesCount: number;
  completedMilestones: number;
  targetCompletionDate: string;
  agreedRevenueSplit: {
    contributors: number; // e.g. 70
    cooperativePool: number; // e.g. 10
    platformOperations: number; // e.g. 20
  };
  totalBountyBudgetUsd: number;
  participants: Array<{
    userId: string;
    name: string;
    role: string;
    sharePercent: number;
  }>;
}

export interface HavcSharedValueDistribution {
  id: string;
  txReference: string;
  sourceProductTitle: string;
  totalGrossPaymentNgn: number;
  totalGrossPaymentUsd: number;
  platformFeeNgn: number;
  cooperativePoolNgn: number;
  contributorPayouts: Array<{
    contributorId: string;
    contributorName: string;
    role: string;
    entitledPercent: number;
    payoutNgn: number;
    payoutUsd: number;
    status: 'settled_paystack' | 'queued' | 'held_dispute';
    settledTimestamp?: string;
  }>;
  status: 'settled' | 'processing' | 'reconciled';
  createdAt: string;
}

export interface HavcDisputeRecord {
  id: string;
  title: string;
  projectId: string;
  claimantName: string;
  respondentName: string;
  reason: string;
  status: 'open' | 'arbitration' | 'resolved' | 'dismissed';
  filedAt: string;
  resolutionSummary?: string;
}

// -------------------------------------------------------------------------
// 4. OVERALL MIND HIVE V22 STATE
// -------------------------------------------------------------------------

export interface MindHiveV22State {
  version: '22.0-GLOBAL-KNOWLEDGE-CAPITAL';
  platformIdentity: 'UA-AIDC / MIND HIVE V22';
  tagline: string;
  summaryMetrics: {
    totalKnowledgeCapitalValueUsd: number;
    totalRegisteredAssets: number;
    activeLicensesCount: number;
    totalSettledRevenueUsd: number;
    totalSettledRevenueNgn: number;
    verifiedContributorsCount: number;
    activeBuyerRequestsCount: number;
    globalTerritoriesCount: number;
    identifiedKnowledgeGapsCount: number;
    cooperativeProjectsCount: number;
  };
  kcx: {
    assets: KcxKnowledgeAsset[];
    buyerRequests: KcxBuyerRequest[];
    offers: KcxOffer[];
    agreements: KcxLicenseAgreement[];
    agents: KcxAgentRecord[];
  };
  gka: {
    territories: GkaTerritory[];
    knowledgeGaps: GkaKnowledgeGap[];
    gravityNodes: GkaGravityNode[];
    languages: GkaLanguageResource[];
    agents: GkaAgentRecord[];
  };
  havc: {
    contributors: HavcContributorProfile[];
    dnaRecords: HavcContributionDnaRecord[];
    projects: HavcCollaborativeProject[];
    distributions: HavcSharedValueDistribution[];
    disputes: HavcDisputeRecord[];
  };
  lastUpdated: string;
}
