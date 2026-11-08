export type SocialPlatform =
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'x_twitter'
  | 'threads'
  | 'twitch'
  | 'substack'
  | 'podcast_rss';

export type SocialContentType =
  | 'post'
  | 'video'
  | 'reel_short'
  | 'channel'
  | 'playlist'
  | 'creator_profile'
  | 'business_page'
  | 'public_article'
  | 'authorized_account';

export type SocialVerificationStatus =
  | 'verified_owner'
  | 'public_fair_use'
  | 'pending_authorization'
  | 'licensed_partner'
  | 'restricted';

export interface SocialAssetGenome {
  id: string; // e.g. SOC-YT-894101
  originalUrl: string;
  platform: SocialPlatform;
  contentType: SocialContentType;
  title: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatarUrl?: string;
  publishedAt?: string;
  description: string;
  transcriptSample?: string;
  thumbnailUrl?: string;
  topic: string;
  category: string;
  engagement: {
    views?: number;
    likes?: number;
    shares?: number;
    comments?: number;
    engagementRatePercent?: number;
  };
  ownershipDeclaration: {
    claimedBy: string;
    isAuthorizedAccount: boolean;
    verificationStatus: SocialVerificationStatus;
    declaredLicense: 'commercial_70_30' | 'editorial_only' | 'exclusive' | 'educational';
  };
  permissions: {
    allowKnowledgeExtraction: boolean;
    allowMultiplication: boolean;
    allowEnterpriseAssistant: boolean;
    allowAiTrainingDataset: boolean;
  };
  processingHistory: {
    minedAt: string;
    axiomsExtracted: number;
    derivativesCount: number;
    linkedContentGenomeId?: string;
  };
  metrics: {
    commercialValueUsd: number;
    commercialValueNgn: number;
    revenueRealizedUsd: number;
    creatorEarningsUsd: number;
    creatorEarningsNgn: number;
  };
  status: 'active_genome' | 'processing' | 'archived';
}

export type SocialDerivativeFormat =
  | 'article'
  | 'ebook'
  | 'course'
  | 'podcast'
  | 'video_lesson'
  | 'short_clips'
  | 'infographic'
  | 'presentation_slides'
  | 'translation'
  | 'research_summary'
  | 'qa_instruction_dataset'
  | 'ai_tutor_knowledge'
  | 'enterprise_knowledge_package'
  | 'ai_training_dataset';

export interface SocialDerivative {
  id: string;
  parentSocialAssetId: string;
  parentTitle: string;
  creatorAttribution: string;
  derivativeFormat: SocialDerivativeFormat;
  title: string;
  description: string;
  payloadSummary: string;
  priceUsd: number;
  priceNgn: number;
  commercialStatus: 'draft' | 'published' | 'licensed';
  salesCount: number;
  totalRevenueUsd: number;
  generatedAt: string;
}

export interface SocialMiningColony {
  id: string;
  name: string;
  division: string;
  description: string;
  iconName: string;
  status: 'active' | 'processing' | 'standby';
  tasksCompleted24h: number;
  efficiencyScore: number;
}

export interface EnterpriseKnowledgeProduct {
  id: string;
  domain: 'agriculture' | 'engineering' | 'fintech' | 'healthcare' | 'education' | 'tech_tutorials';
  title: string;
  description: string;
  sourceSocialAssetCount: number;
  featuredCreators: string[];
  productType: 'AI Assistant' | 'Interactive Training Pack' | 'Searchable Technical KB' | 'Business Intelligence Deck';
  licensePriceAnnualUsd: number;
  licensePriceAnnualNgn: number;
  activeEnterpriseClients: number;
  totalRevenueUsd: number;
  complianceReviewStatus: 'Reviewed & Certified' | 'In Review';
}

export interface SocialBuyerOpportunity {
  id: string;
  organizationName: string;
  buyerType:
    | 'Content Licensing'
    | 'Brand Sponsorship'
    | 'Publishing House'
    | 'AI Training Labs'
    | 'Enterprise Assistant'
    | 'Social Media Management';
  targetedPlatform: SocialPlatform;
  budgetUsd: number;
  budgetNgn: number;
  matchScore: number; // 0 - 100
  dealStage: 'Matched' | 'Proposal Sent' | 'In Negotiation' | 'Signed Agreement' | 'Settled via Paystack';
  matchedAssetId: string;
  matchedAssetTitle: string;
  lastAction: string;
}

export interface ConnectedSocialAccount {
  id: string;
  platform: SocialPlatform;
  accountHandle: string;
  accountName: string;
  avatarUrl: string;
  connectionStatus: 'connected' | 'reauth_required' | 'revoked';
  connectedAt: string;
  approvedScopes: string[];
  metrics: {
    followers: number;
    monthlyImpressions: number;
    avgEngagementRate: number;
    postsAnalyzedCount: number;
  };
}

export interface SocialRevenueChannel {
  channelId: string;
  name: string;
  category: 'direct_sales' | 'sponsorship' | 'licensing' | 'services';
  actualSettledUsd: number;
  actualSettledNgn: number;
  pendingInvoicesUsd: number;
  estimatedPipelineUsd: number;
  creatorShareUsd: number; // 70%
  creatorShareNgn: number;
}

export interface SocialHiveState {
  version: string;
  engineName: string;
  tagline: string;
  summaryStats: {
    totalRegisteredSocialAssets: number;
    connectedAccountsCount: number;
    processedSocialLinksCount: number;
    totalDerivativesCreated: number;
    enterpriseProductsCount: number;
    activeBuyerDeals: number;
    actualSettledRevenueUsd: number;
    actualSettledRevenueNgn: number;
    pendingRevenueUsd: number;
    estimatedPipelineUsd: number;
    creatorRoyaltiesPaidUsd: number;
    creatorRoyaltiesPaidNgn: number;
  };
  socialAssets: SocialAssetGenome[];
  derivatives: SocialDerivative[];
  colonies: SocialMiningColony[];
  enterpriseProducts: EnterpriseKnowledgeProduct[];
  buyerOpportunities: SocialBuyerOpportunity[];
  connectedAccounts: ConnectedSocialAccount[];
  revenueChannels: SocialRevenueChannel[];
  lastUpdated: string;
}
