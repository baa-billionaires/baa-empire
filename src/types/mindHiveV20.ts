export type AiTrainingPermissionType = 'none' | 'rag_only' | 'fine_tuning' | 'pretraining_full';

export type ContentFormat = 'ebook' | 'video_course' | 'audio_lecture' | 'research_paper' | 'dataset' | 'prompt_library' | 'code_repo';

export type VerificationShieldTier = 'human_expert' | 'institutional' | 'synthetic_lab' | 'academy_certified';

export interface ContentGenomeAsset {
  id: string;
  title: string;
  slug: string;
  author: string;
  authorEmail: string;
  format: ContentFormat;
  category: string;
  summary: string;
  contentHashSha256: string;
  registeredAt: string;
  wordCount: number;
  verificationShield: VerificationShieldTier;
  rightsDeclaration: {
    licenseType: 'commercial' | 'educational' | 'exclusive' | 'open_source';
    allowDerivatives: boolean;
    copyrightOwner: string;
    registeredJurisdiction: string;
  };
  aiTrainingPermissions: {
    ragAllowed: boolean;
    fineTuningAllowed: boolean;
    preTrainingAllowed: boolean;
    distributedToGlobalEngine: boolean;
    distributionTimestamp?: string;
    basePriceUsd: number;
    basePriceNgn: number;
  };
  metrics: {
    multiplicationCount: number;
    trainingUsageCount: number;
    buyerInquiries: number;
    totalGrossUsd: number;
    creatorEarningsUsd: number;
    creatorEarningsNgn: number;
  };
  status: 'active' | 'processing' | 'archived';
  rawTextSample?: string;
}

export type DerivativeType = 'article_series' | 'living_ebook' | 'modular_course' | 'podcast_audio' | 'battlecard_memo' | 'qa_instruction_set';

export interface ContentDerivative {
  id: string;
  parentAssetId: string;
  parentAssetTitle: string;
  title: string;
  derivativeType: DerivativeType;
  generatedAt: string;
  itemCount: number; // e.g. 10 articles, 6 modules, etc.
  description: string;
  contentPayload: string;
  commercialStatus: 'draft' | 'published' | 'licensed';
  salesPriceUsd: number;
  salesPriceNgn: number;
  revenueGeneratedUsd: number;
}

export interface MiningJob {
  id: string;
  assetId: string;
  assetTitle: string;
  status: 'completed' | 'mining' | 'queued';
  extractedFactsCount: number;
  qaPairsCount: number;
  multiTurnInstructionsCount: number;
  semanticDensityScore: number; // 0 - 100
  hallucinationRisk: 'Ultra-Low (<0.1%)' | 'Low (<1%)' | 'Moderate (<3%)';
  dedupIndex: number; // % unique
  datasetFormat: 'jsonl' | 'parquet' | 'csv';
  datasetSizeBytes: number;
  jsonlSample: string;
  completedAt: string;
}

export interface TrainingExchangeListing {
  id: string;
  assetId: string;
  assetTitle: string;
  datasetName: string;
  category: string;
  permittedUses: string[];
  totalTokensApprox: number;
  sampleRowsCount: number;
  licenseFeeUsd: number;
  licenseFeeNgn: number;
  creatorSharePercent: number; // 70
  platformSharePercent: number; // 30
  activeSubscribersCount: number;
  totalEarningsUsd: number;
  complianceChecked: boolean;
  distributedToGlobalEngine: boolean;
}

export interface ModelForgeProject {
  id: string;
  name: string;
  targetLevel: 1 | 2 | 3 | 4 | 5 | 6;
  levelName: string;
  baseFoundationModel: string;
  trainingDatasetId: string;
  datasetName: string;
  computeNodeCluster: string;
  status: 'active_serving' | 'training' | 'queued' | 'evaluating';
  evalAccuracyScore: number;
  latencyMs: number;
  costPerHourUsd: number;
  deployedEndpoint: string;
  description: string;
}

export type BuyerLegionType =
  | 'ai_labs'
  | 'enterprise_training'
  | 'universities'
  | 'publishing'
  | 'think_tanks'
  | 'advisory_consulting'
  | 'edtech'
  | 'autonomous_procurement';

export interface BuyerLeadProspect {
  id: string;
  legionType: BuyerLegionType;
  legionName: string;
  organizationName: string;
  country: string;
  flag: string;
  targetedAssetCategory: string;
  budgetUsd: number;
  budgetNgn: number;
  matchScore: number; // 0 - 100
  urgency: 'Immediate' | 'Next 14 Days' | 'Next 30 Days';
  dealStage: 'Matched' | 'Pitch Sent' | 'Negotiating' | 'Contract Closed' | 'Escrow Funded';
  lastAction: string;
}

export interface RoyaltyLedgerTransaction {
  id: string;
  assetId: string;
  assetTitle: string;
  buyerName: string;
  licenseType: string;
  currency: 'USD' | 'NGN';
  grossAmountUsd: number;
  grossAmountNgn: number;
  creatorShareUsd: number;
  creatorShareNgn: number; // 70%
  platformShareUsd: number;
  platformShareNgn: number; // 30%
  timestamp: string;
  paystackRef: string;
  payoutStatus: 'settled_bank' | 'escrow_holding' | 'processing';
}

export interface MindHiveV20Agent {
  id: string;
  name: string;
  role: string;
  division: 'Acquisition & Rights' | 'Content Multiplication' | 'Knowledge Mining' | 'AI Training & Forge' | 'Buyer Hunting' | 'Governance & Royalties';
  status: 'active' | 'processing' | 'idle';
  actionsCompleted24h: number;
  efficiencyScore: number;
}

export interface MindHiveV20State {
  version: string;
  civilizationName: string;
  tagline: string;
  activeAgentsCount: number;
  stats: {
    totalRegisteredAssets: number;
    totalDerivativesCreated: number;
    totalMinedQaPairs: number;
    totalTokensTrained: number;
    totalRevenueUsd: number;
    totalRevenueNgn: number;
    creatorRoyaltiesPaidUsd: number;
    creatorRoyaltiesPaidNgn: number;
    activeBuyerLeads: number;
    dealsClosedCount: number;
  };
  assets: ContentGenomeAsset[];
  derivatives: ContentDerivative[];
  miningJobs: MiningJob[];
  trainingListings: TrainingExchangeListing[];
  modelForgeProjects: ModelForgeProject[];
  buyerLeads: BuyerLeadProspect[];
  royaltyTransactions: RoyaltyLedgerTransaction[];
  agents: MindHiveV20Agent[];
  lastUpdated: string;
}
