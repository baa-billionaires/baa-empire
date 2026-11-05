export type CodeVeinColonyId =
  | 'github_miner'
  | 'dna_registry'
  | 'micro_api_refinery'
  | 'demand_hunter'
  | 'bounty_swarm'
  | 'code_revival'
  | 'smart_contract_factory'
  | 'model_lora_forge'
  | 'licensing_exchange'
  | 'microsaas_factory'
  | 'api_gateway'
  | 'client_hunter'
  | 'ce_compute_bridge'
  | 'portfolio_manager'
  | 'wealth_intelligence';

export type MicroApiLifecycle =
  | 'DRAFT'
  | 'BUILDING'
  | 'TESTING'
  | 'APPROVAL_REQUIRED'
  | 'DEPLOYING'
  | 'LIVE'
  | 'FAILED';

export interface RepoAsset {
  id: string;
  name: string;
  owner: string;
  repoUrl: string;
  isPrivate: boolean;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  license: string;
  commercialSuitabilityScore: number;
  monetizationPath: 'micro_api' | 'saas_template' | 'bounty_target' | 'model_adapter' | 'revival';
  estimatedCommercialValueUsd: number;
  dnaVerified: boolean;
  analyzedAt: string;
  tags: string[];
}

export interface CodeDnaRecord {
  id: string;
  repoAssetId: string;
  repoName: string;
  commitHash: string;
  authorIdentity: string;
  licensePermissions: {
    canCommercialize: boolean;
    requiresAttribution: boolean;
    copyleftRestrictions: boolean;
    patentGrant: boolean;
  };
  securityAuditScore: number;
  vulnerabilitiesFound: number;
  criticalIssues: string[];
  provenanceVerified: boolean;
  quarantineStatus: 'CLEAN' | 'SANDBOXED' | 'RESTRICTED';
  fingerprintHash: string;
}

export interface MicroApiService {
  id: string;
  name: string;
  slug: string;
  description: string;
  framework: 'fastapi' | 'express';
  category: string;
  endpointCount: number;
  baseCode: string;
  openApiSpec: string;
  dockerfile: string;
  pricingPerCallUsd: number;
  monthlyCalls: number;
  monthlyRevenueUsd: number;
  latencyAvgMs: number;
  uptimePercent: number;
  lifecycleStatus: MicroApiLifecycle;
  humanApproved: boolean;
  lastTestedAt: string;
  version: string;
}

export interface DemandSignal {
  id: string;
  title: string;
  source: 'Enterprise RFP' | 'GitHub Issue' | 'Upwork High-Ticket' | 'Discord Dev Swarm';
  budgetUsd: number;
  budgetNgn: number;
  technicalRequirements: string[];
  matchedAssetId?: string;
  matchedAssetName?: string;
  matchConfidence: number;
  urgency: 'HIGH' | 'MEDIUM' | 'NORMAL';
  status: 'OPEN' | 'MATCHED' | 'FULFILLED';
  postedAt: string;
}

export interface BountyOpportunity {
  id: string;
  repoName: string;
  issueNumber: number;
  issueTitle: string;
  issueUrl: string;
  rewardUsd: number;
  rewardNgn: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  languages: string[];
  patchGenerated: boolean;
  patchCode?: string;
  testSuiteStatus: 'PASSED' | 'TESTING' | 'PENDING' | 'FAILED';
  prDraftUrl?: string;
  humanApprovalRequired: boolean;
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  settled: boolean;
}

export interface RevivalProject {
  id: string;
  legacyRepoName: string;
  legacyStack: string;
  targetModernStack: string;
  lastCommitYear: number;
  saasPotentialScore: number;
  upgradeChecklist: { step: string; done: boolean }[];
  diffPreview: string;
  status: 'ANALYZED' | 'UPGRADING' | 'MODERNIZED' | 'DEPLOYED';
}

export interface SmartContractAsset {
  id: string;
  name: string;
  standard: 'ERC-20' | 'ERC-721' | 'ERC-1155' | 'Custom Defi Vault';
  network: string;
  solidityVersion: string;
  slitherScore: number;
  gasEfficiencyRating: 'A+' | 'A' | 'B' | 'C';
  securityIssuesCount: number;
  testnetDeployTx?: string;
  testnetNetwork?: string;
  licensePriceUsd: number;
  status: 'AUDITED' | 'TESTNET_DEPLOYED' | 'MAINNET_READY';
}

export interface ModelAsset {
  id: string;
  name: string;
  baseModel: string;
  hfUrl: string;
  loraTarget: string;
  quantizationFormat: 'GGUF-Q4_K_M' | 'EXL2' | 'AWQ' | 'FP16';
  sizeGb: number;
  ollamaModelfile: string;
  ceColonyNodeId?: string;
  ceColonyNodeName?: string;
  inferenceSpeedTokensPerSec: number;
  status: 'CONVERTED' | 'BOUND_TO_CE_NODE' | 'SERVING_LIVE';
}

export interface ProductListing {
  id: string;
  title: string;
  category: 'api' | 'saas_license' | 'template' | 'smart_contract' | 'model';
  authorName: string;
  priceUsd: number;
  priceNgn: number;
  salesCount: number;
  revenueGeneratedUsd: number;
  rating: number;
  licenseTerms: string;
  refundPolicy: string;
  status: 'ACTIVE' | 'PENDING_REVIEW' | 'ARCHIVED';
}

export interface MicroSaasProduct {
  id: string;
  name: string;
  productType: 'webapp' | 'extension' | 'plugin' | 'automation_bot';
  description: string;
  monthlyRecurringUsd: number;
  activeUsers: number;
  liveDemoUrl: string;
  downloadPackageUrl: string;
  status: 'LIVE' | 'BETA' | 'PACKAGING';
}

export interface ApiGatewayKey {
  id: string;
  name: string;
  keyPrefix: string;
  tier: 'developer' | 'growth' | 'enterprise';
  quotaRequestsPerMin: number;
  totalCalls: number;
  rateLimitedCalls: number;
  revenueAccruedUsd: number;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
}

export interface ClientOpportunity {
  id: string;
  companyName: string;
  contactPerson: string;
  industry: string;
  painPoint: string;
  proposedSolution: string;
  estimatedDealValueUsd: number;
  proposalDraft: string;
  leadStatus: 'DISCOVERED' | 'PROPOSAL_GENERATED' | 'OUTREACH_PENDING' | 'CLOSED_WON';
}

export interface CeComputeJob {
  id: string;
  jobTitle: string;
  targetColony: 'Colony 8 Model Forge' | 'Colony 3 API Sandbox' | 'Colony 7 Contract Testnet';
  ceNodeId: string;
  ceNodeName: string;
  hardwareSpecs: string;
  vramAllocatedGb: number;
  computeCostUsd: number;
  thermalReadingCelsius: number;
  status: 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'PAUSED';
}

export interface AgentRun {
  id: string;
  agentId: string;
  agentName: string;
  colonyId: CodeVeinColonyId;
  role: string;
  currentAction: string;
  confidenceScore: number;
  requiresHumanConsent: boolean;
  status: 'RUNNING' | 'WAITING_APPROVAL' | 'IDLE' | 'COMPLETED';
  lastActive: string;
}

export interface ApprovalRequest {
  id: string;
  agentId: string;
  agentName: string;
  actionType: 'GITHUB_PR' | 'PRODUCTION_DEPLOY' | 'BANK_WITHDRAWAL' | 'LICENSE_PUBLISH';
  targetResource: string;
  details: string;
  diffOrPayload?: string;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CodeVeinLedgerEntry {
  id: string;
  txRef: string;
  type: 'API_CALL_METERED' | 'PRODUCT_SALE' | 'BOUNTY_SETTLED' | 'WITHDRAWAL_PAYOUT';
  description: string;
  grossUsd: number;
  developerShareUsd: number;
  platformShareUsd: number;
  grossNgn: number;
  developerShareNgn: number;
  platformShareNgn: number;
  paymentGateway: 'PAYSTACK' | 'BAA_COIN_VAULT';
  status: 'CONFIRMED' | 'SETTLED' | 'PROCESSING';
  timestamp: string;
}

export interface CodeVeinState {
  version: string;
  name: string;
  tagline: string;
  initializedAt: string;
  config: {
    dataDir: string;
    paystackMode: 'TEST' | 'LIVE';
    paystackPublicKey: string;
    developerSplitPercent: number;
    platformSplitPercent: number;
    adminEmail: string;
    ngnExchangeRate: number;
  };
  metrics: {
    totalGrossRevenueUsd: number;
    developerNetEarningsUsd: number;
    platformNetEarningsUsd: number;
    totalWithdrawnUsd: number;
    availableWithdrawableUsd: number;
    availableWithdrawableNgn: number;
    totalReposScanned: number;
    totalDnaVerified: number;
    totalActiveMicroApis: number;
    totalBountiesClaimed: number;
    totalApiCallsMetered: number;
    activeAgentsCount: number;
    pendingApprovalsCount: number;
  };
  repos: RepoAsset[];
  dnaRecords: CodeDnaRecord[];
  microApis: MicroApiService[];
  demandSignals: DemandSignal[];
  bounties: BountyOpportunity[];
  revivalProjects: RevivalProject[];
  smartContracts: SmartContractAsset[];
  models: ModelAsset[];
  products: ProductListing[];
  microSaas: MicroSaasProduct[];
  apiKeys: ApiGatewayKey[];
  clients: ClientOpportunity[];
  ceComputeJobs: CeComputeJob[];
  agents: AgentRun[];
  approvals: ApprovalRequest[];
  ledger: CodeVeinLedgerEntry[];
}
