// Universal Autonomous Growth & Revenue Intelligence OS + MAFIA™ Colony Types

export type GrowthOperatingMode = 'observe' | 'prepare' | 'approval_required' | 'authorized_automation';

export type AgentRole = 
  | 'Autonomous Multi-Agent Intelligence'
  | 'Autotelic Symbiosis AI'
  | 'Entangled Cognitive AI'
  | 'Catalytic AI'
  | 'Economic AI'
  | 'Enzymic AI'
  | 'Regenerative AI'
  | 'MarketHunter'
  | 'AudienceArchitect'
  | 'ProspectMatcher'
  | 'OfferEngineer'
  | 'CreativeFactory'
  | 'ChannelRouter'
  | 'CampaignPlanner'
  | 'CampaignPublisher'
  | 'FunnelArchitect'
  | 'ConversionOptimizer'
  | 'RevenueAttributionAgent'
  | 'ReputationGuardian'
  | 'LearningColony'
  | 'EmailIntelligenceAgent'
  | 'PermissionReputationAgent'
  | 'PrPublicityAgent'
  | 'PartnershipAgent';

export interface GrowthAgent {
  id: string;
  name: string;
  role: AgentRole;
  colony: 'Core Intelligence' | 'MAFIA Advertising' | 'Market & GeoProspect' | 'Email & PR' | 'Revenue & Sales';
  status: 'active' | 'evaluating' | 'idle' | 'paused_policy';
  budgetLimitUsd: number;
  spentBudgetUsd: number;
  tasksCompleted: number;
  confidenceScore: number; // 0-100%
  lastHandshake: string;
  activeContext: string;
  evidenceBasedOutputs: string[];
}

export interface MarketOpportunity {
  id: string;
  title: string;
  industry: string;
  source: string;
  discoveryTime: string;
  observedNeed: string;
  evidenceSnippet: string;
  estimatedValueUsd: number;
  confidenceScore: number; // 0-100%
  competitionLevel: 'Low' | 'Moderate' | 'Intense';
  estimatedCacUsd: number;
  recommendedAction: string;
  verifiedFact: boolean;
  status: 'identified' | 'analyzing' | 'offer_engineered' | 'actioned';
}

export interface GeoProspect {
  id: string;
  businessName: string;
  category: string;
  country: string;
  stateOrRegion: string;
  city: string;
  addressSnippet: string;
  latitude: number;
  longitude: number;
  domain: string;
  verifiedWebsite: boolean;
  sourceProvenance: string;
  lastVerificationDate: string;
  dataQualityScore: number; // 0-100%
  matchedProductNeed: string;
  territoryCluster: string;
  outreachEligibility: 'Eligible' | 'Needs Approval' | 'Restricted';
}

export type CrmStage = 
  | 'discovered' 
  | 'qualified' 
  | 'contact_eligible' 
  | 'contacted' 
  | 'engaged' 
  | 'proposal' 
  | 'negotiation' 
  | 'won' 
  | 'lost' 
  | 'fulfillment' 
  | 'retention';

export interface CrmProspectLead {
  id: string;
  contactName: string;
  roleTitle: string;
  organization: string;
  email: string;
  phone?: string;
  source: string;
  collectionDate: string;
  permittedBasis: 'Legitimate Interest (B2B)' | 'Informed Consent' | 'Public Commercial Registry';
  verificationStatus: 'Domain & Syntax Verified' | 'Deep MX Checked' | 'Unverified';
  stage: CrmStage;
  leadScore: number; // 0-100
  buyerIntentScore: number; // 0-100
  matchedOfferId: string;
  matchedOfferTitle: string;
  dealValueUsd: number;
  notes: string[];
  lastActionTimestamp: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  tagline: string;
  customerProblemSolved: string;
  productType: 'AI Agent Blueprint' | 'SaaS Automation Micro-Service' | 'Industry Research Report' | 'Executive Playbook' | 'Turnkey Business Package';
  deliverables: string[];
  pricingTiers: {
    name: string;
    priceUsd: number;
    targetBuyer: string;
  }[];
  landingPageSummary: string;
  qualityCheckPassed: boolean;
  originalityScore: number;
  distributionChannels: string[];
  activeViews: number;
  conversions: number;
  actualGrossRevenueUsd: number;
  deliveryCostUsd: number;
  netContributionUsd: number;
  status: 'in_design' | 'testing' | 'published_active' | 'paused';
}

export interface MafiaCampaign {
  id: string;
  name: string;
  objective: string;
  targetAudienceSegment: string;
  assignedProduct: string;
  offerHook: string;
  channels: Array<'Application Landing Pages' | 'Email Outreach' | 'YouTube & Video' | 'LinkedIn & X' | 'Official Meta / Ads' | 'Partner Affiliates' | 'Business Directories'>;
  dailyBudgetUsd: number;
  spentBudgetUsd: number;
  impressions: number;
  clicks: number;
  qualifiedResponses: number;
  salesConversions: number;
  verifiedGrossRevenueUsd: number;
  acquisitionCostUsd: number;
  netMarginUsd: number;
  reputationHealthScore: number; // 0-100
  complianceStatus: 'Fully Approved' | 'Pending Review' | 'Auto-Paused Safeguard';
  status: 'active' | 'draft' | 'completed' | 'paused';
  createdAt: string;
}

export interface EmailIntelligence {
  totalScanned: number;
  syntaxValidCount: number;
  domainConfiguredCount: number;
  spfDkimDmarcReady: boolean;
  suppressionCount: number;
  hardBounceRate: number; // e.g. 0.4%
  complaintRate: number; // e.g. 0.02%
  unsubscribeRate: number; // e.g. 0.3%
  senderReputationScore: number; // 0-100
  pausedThresholdBreached: boolean;
  recentSequences: {
    name: string;
    type: 'Welcome Sequence' | 'Authorized B2B Assessment' | 'Educational Newsletter' | 'Client Proposal Follow-up';
    openRate: number;
    replyRate: number;
    interestedLeadsDetected: number;
    status: 'Running' | 'Scheduled' | 'Approval Required';
  }[];
}

export interface SuppressionRecord {
  id: string;
  emailOrDomain: string;
  type: 'hard_bounce' | 'unsubscribe' | 'complaint' | 'manual_suppression';
  reason: string;
  timestamp: string;
}

export interface DnsSecurityCheck {
  protocol: 'SPF' | 'DKIM' | 'DMARC';
  status: 'valid' | 'warning' | 'failed';
  record: string;
  selectorOrHost: string;
  lastVerified: string;
  details: string;
}

export interface PressReleaseItem {
  id: string;
  headline: string;
  category: 'Company Milestone' | 'Technology Breakthrough' | 'Case Study' | 'Market Research';
  dateline: string;
  factualBodySummary: string;
  targetPublications: string[];
  verifiedMediaPlacements: {
    outletName: string;
    status: 'Confirmed Published' | 'Pitch Submitted' | 'Under Editorial Review';
    attributionUrl?: string;
    verifiedReferralTraffic: number;
  }[];
  status: 'approved_ready' | 'pitching' | 'published_verified';
}

export interface PartnershipItem {
  id: string;
  partnerName: string;
  partnerType: 'Affiliate Network' | 'Reseller / Distributor' | 'Co-Marketing Partner' | 'Strategic Ecosystem';
  status: 'proposal_sent' | 'negotiating' | 'active_agreement' | 'completed';
  revenueSharePercent: number;
  attributableSalesCount: number;
  totalCommissionsPaidUsd: number;
  netRevenueContributionUsd: number;
}

export interface RevenueBoundLoop {
  id: string;
  loopStep: 
    | '1_MarketSignal' 
    | '2_VerifiedNeed' 
    | '3_QualifiedAudience' 
    | '4_ProductService' 
    | '5_OfferEngineering' 
    | '6_AuthorizedChannel' 
    | '7_ApprovedCampaign' 
    | '8_QualifiedResponse' 
    | '9_SalesConversion' 
    | '10_Fulfillment' 
    | '11_VerifiedPayment' 
    | '12_CostMarginAnalysis' 
    | '13_EvidenceImprovement';
  title: string;
  description: string;
  evidenceMetrics: string;
  verifiedOutcome: string;
  settledAmountUsd: number;
  operationalCostUsd: number;
  netMarginUsd: number;
  timestamp: string;
}

export interface MafiaSystemState {
  operatingMode: GrowthOperatingMode;
  emergencyStopEngaged: boolean;
  totalBudgetCapUsd: number;
  totalSpentUsd: number;
  verifiedGrossRevenueUsd: number;
  netRealizedProfitUsd: number;
  roiMultiplier: number;
  agents: GrowthAgent[];
  marketOpportunities: MarketOpportunity[];
  geoProspects: GeoProspect[];
  crmProspects: CrmProspectLead[];
  digitalProducts: DigitalProduct[];
  campaigns: MafiaCampaign[];
  emailIntelligence: EmailIntelligence;
  pressReleases: PressReleaseItem[];
  partnerships: PartnershipItem[];
  revenueBoundLoops: RevenueBoundLoop[];
}
