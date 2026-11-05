export type AurumColonyId =
  | 'dust_furnace'
  | 'graveyard_resurrection'
  | 'nft_landfill'
  | 'token_foundry'
  | 'asset_exchange'
  | 'defi_yield_risk'
  | 'rights_council'
  | 'demand_hunter';

export type SupportedChain = 'ethereum' | 'bsc' | 'base' | 'polygon' | 'solana';

export type RecoveryRecommendation = 'HOLD' | 'RECOVER' | 'SWAP' | 'CONSOLIDATE' | 'IGNORE' | 'REVIEW';

export interface WalletAsset {
  id: string;
  chain: SupportedChain;
  contractAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: string;
  balanceFormatted: number;
  estimatedPriceUsd: number;
  totalValueUsd: number;
  totalValueNgn: number;
  isDust: boolean;
  isLiquidityLocked: boolean;
  hasMarketLiquidity: boolean;
  estimatedGasFeeUsd: number;
  recoveryFeasibility: 'ECONOMIC' | 'UNECONOMIC' | 'ZERO_LIQUIDITY' | 'REQUIRES_REVIEW';
  recommendation: RecoveryRecommendation;
  tokenIcon?: string;
}

export interface DustRecoveryPlan {
  id: string;
  walletAddress: string;
  chain: SupportedChain;
  selectedAssetCount: number;
  grossValueUsd: number;
  estimatedNetworkFeeUsd: number;
  netEstimatedRecoveryUsd: number;
  isProfitable: boolean;
  suggestedAction: RecoveryRecommendation;
  targetConsolidationAsset: string; // e.g. 'ETH' or 'USDC'
  status: 'DRAFT' | 'SIMULATED' | 'AWAITING_APPROVAL' | 'EXECUTED';
}

export interface GraveyardToken {
  id: string;
  name: string;
  symbol: string;
  contractAddress: string;
  chain: SupportedChain;
  launchYear: number;
  holderCount: number;
  totalSupply: string;
  liquidityUsd: number;
  peakMarketCapUsd: number;
  currentMarketCapUsd: number;
  auditFindings: {
    isHoneypot: boolean;
    mintCallable: boolean;
    burnCallable: boolean;
    transferFeePercent: number;
    hasBlacklist: boolean;
    ownershipRenounced: boolean;
    securityScore: number; // 0-100
  };
  resurrectionOption: 'UTILITY_REBUILD' | 'LIQUIDITY_ASSESSMENT' | 'TREASURY_MANAGEMENT' | 'MIGRATION' | 'RESTART_MARKETPLACE';
  status: 'AUDITED' | 'UTILITY_DESIGNED' | 'MIGRATION_READY' | 'LISTED';
}

export interface NftAsset {
  id: string;
  collectionName: string;
  contractAddress: string;
  tokenId: string;
  chain: SupportedChain;
  name: string;
  imageUrl: string;
  metadataStatus: 'HEALTHY' | 'BROKEN_LINK' | 'RESTORED' | 'MISSING_ATTRIBUTES';
  provenanceVerified: boolean;
  commercialRightsIncluded: boolean;
  rentalAvailable: boolean;
  dailyRentalPriceUsd: number;
  estimatedFloorUsd: number;
}

export interface NftRentalListing {
  id: string;
  nftAssetId: string;
  collectionName: string;
  tokenId: string;
  ownerAddress: string;
  dailyPriceUsd: number;
  dailyPriceNgn: number;
  maxRentalDays: number;
  standard: 'ERC-4907' | 'Custom Safe Collateral';
  collateralRequiredUsd: number;
  activeRenter?: string;
  rentedUntil?: string;
  status: 'AVAILABLE' | 'RENTED' | 'EXPIRED';
}

export interface FoundryProject {
  id: string;
  projectName: string;
  tokenName: string;
  symbol: string;
  chain: SupportedChain;
  totalSupply: number;
  circulatingSupply: number;
  allocations: { category: string; percent: number; lockupMonths: number }[];
  vestingContractType: 'LINEAR_STREAM' | 'QUARTERLY_CLIFF' | 'MULTI_SIG_TIMELOCK';
  antiAbuseVerified: boolean;
  testnetAddress?: string;
  mainnetReady: boolean;
  status: 'DRAFT' | 'SIMULATED' | 'TESTNET_DEPLOYED' | 'AWAITING_APPROVAL';
}

export interface DeFiYieldProtocol {
  id: string;
  protocolName: string;
  chain: SupportedChain;
  assetSymbol: string;
  assetName: string;
  publishedApy: number;
  historical30dApy: number;
  protocolTvlUsd: number;
  smartContractRiskScore: 'A+' | 'A' | 'B' | 'C' | 'HIGH_RISK';
  liquidationRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  withdrawalLockupHours: number;
  providerFeePercent: number;
  netEstimatedApy: number;
  riskWarnings: string[];
}

export interface AssetOpportunity {
  id: string;
  title: string;
  category: 'RECOVERABLE_WALLET' | 'DORMANT_TOKEN' | 'NFT_INVENTORY' | 'SMART_CONTRACT' | 'WEB3_TOOL';
  assetName: string;
  chain: SupportedChain;
  verifiedOwner: string;
  marketEvidence: string;
  estimatedValuationUsd: number;
  riskClassification: 'LOW' | 'MODERATE' | 'SPECULATIVE' | 'HIGH';
  rightsVerified: boolean;
  status: 'VERIFIED' | 'UNDER_REVIEW' | 'ACQUIRED';
}

export interface RightsReviewCase {
  id: string;
  assetType: 'TOKEN_CONTRACT' | 'NFT_COLLECTION' | 'WALLET_CLAIM';
  assetIdentifier: string;
  claimantAddress: string;
  proofType: 'CRYPTOGRAPHIC_SIGNATURE' | 'DEPLOYER_WALLET' | 'OFFICIAL_DOMAIN';
  sanctionsScreeningPassed: boolean;
  legalReviewStatus: 'APPROVED' | 'IN_REVIEW' | 'ESCALATED_HUMAN' | 'REJECTED';
  notes: string;
  reviewedAt: string;
}

export interface Web3ClientLead {
  id: string;
  companyName: string;
  contactPerson: string;
  industry: string;
  serviceRequired: 'TOKEN_MIGRATION' | 'NFT_UTILITY' | 'WALLET_ANALYTICS' | 'SECURITY_REVIEW';
  estimatedBudgetUsd: number;
  proposalDraft: string;
  stage: 'DISCOVERED' | 'PROPOSAL_READY' | 'AWAITING_APPROVAL' | 'COMMITTED';
}

export interface AurumAgentRun {
  id: string;
  agentId: string;
  agentName: string;
  colonyId: AurumColonyId;
  role: string;
  currentTask: string;
  confidenceScore: number;
  requiresHumanConsent: boolean;
  status: 'RUNNING' | 'IDLE' | 'WAITING_APPROVAL' | 'COMPLETED';
  lastActive: string;
}

export interface AurumApprovalRequest {
  id: string;
  agentId: string;
  agentName: string;
  actionType: 'TRANSACTION_SIGN' | 'TOKEN_DEPLOY' | 'LIQUIDITY_ADD' | 'PAYOUT_WITHDRAWAL' | 'OUTREACH_SEND';
  targetResource: string;
  chain?: SupportedChain;
  details: string;
  estimatedFeeUsd?: number;
  payloadPreview?: string;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface AurumLedgerEntry {
  id: string;
  txRef: string;
  type: 'DUST_RECOVERY' | 'NFT_RENTAL' | 'FOUNDRY_SERVICE' | 'EXCHANGE_COMMISSION' | 'WITHDRAWAL_PAYOUT';
  description: string;
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

export interface AurumState {
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
  };
  metrics: {
    totalGrossRecoveredUsd: number;
    clientNetEarningsUsd: number;
    platformNetEarningsUsd: number;
    totalWithdrawnUsd: number;
    availableWithdrawableUsd: number;
    availableWithdrawableNgn: number;
    walletsScannedCount: number;
    dustTokensClassified: number;
    dormantTokensAudited: number;
    nftsRefinedCount: number;
    tokensLaunchedCount: number;
    activeAgentsCount: number;
    pendingApprovalsCount: number;
  };
  connectedWallets: {
    address: string;
    chain: SupportedChain;
    label: string;
    connectedAt: string;
    readOnly: boolean;
  }[];
  walletAssets: WalletAsset[];
  recoveryPlans: DustRecoveryPlan[];
  graveyardTokens: GraveyardToken[];
  nftAssets: NftAsset[];
  nftRentals: NftRentalListing[];
  foundryProjects: FoundryProject[];
  defiProtocols: DeFiYieldProtocol[];
  opportunities: AssetOpportunity[];
  rightsCases: RightsReviewCase[];
  clientLeads: Web3ClientLead[];
  agents: AurumAgentRun[];
  approvals: AurumApprovalRequest[];
  ledger: AurumLedgerEntry[];
}
