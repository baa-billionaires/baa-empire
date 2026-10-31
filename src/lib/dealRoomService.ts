import {
  OpportunityRecord,
  DiscoveryAgent,
  SourceConnector,
  InstitutionProfile,
  EngagementThread,
  EngagementMessage,
  MemberProjectProfile,
  FundingReadinessAudit,
  DealRecord,
  DealRoomDashboardMetrics,
  AuditLogEntry,
  PipelineStage,
  OpportunityCategory
} from '../types/dealRoom';

const STORAGE_KEY_PREFIX = 'richconnect_dealroom_';

export const INITIAL_OPPORTUNITIES: OpportunityRecord[] = [
  // 1. AI CONTRACTS
  {
    id: 'opp-contract-01',
    title: 'Enterprise Multilingual Legal AI & Document Intelligence RFP',
    category: 'ai_contracts',
    fundingType: 'contract',
    providerName: 'African Legal Support Facility & Pan-African Commercial Court',
    providerType: 'Government / Multilateral',
    officialSourceUrl: 'https://alsf.int/procurement/rfp-legal-ai-2026',
    publishedDate: '2026-10-15',
    deadline: '2026-11-28',
    lastVerifiedAt: '2026-10-29 14:30 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Turnkey development of localized neural translation and contract audit models across English, French, Swahili, Hausa, and Yoruba legal corpora.',
    scopeOfWork: 'Deploy containerized LLM inference endpoints, legal precedent semantic vector database, ISO-27001 data sovereignty compliance, and offline courthouse cache.',
    eligibleCountries: ['Pan-African', 'Nigeria', 'Kenya', 'South Africa', 'Rwanda', 'Ghana', 'United Kingdom', 'EU'],
    eligibleApplicantTypes: ['Registered Technology Enterprises', 'AI Consortia with L2/Security Track Record'],
    sector: 'LegalTech & GovTech AI',
    minFundingUsd: 120000,
    maxFundingUsd: 350000,
    currency: 'USD',
    applicationMethod: 'procurement_portal',
    requiredQualifications: ['Registered Entity with CAC/Company House', 'Proven Multilingual LLM Deployments', 'GDPR/NDPR Data Protection Certification'],
    requiredDocuments: ['Commercial Proposal', 'Technical Architecture Blueprint', 'Key Personnel CVs', 'Tax Clearance Certificate', 'Past Performance Case Study'],
    questionsProcedure: 'Written clarification requests accepted via procurement portal until Nov 12, 2026.',
    bidAssessmentNotes: 'High strategic fit for BAA LegalEase Africa AI and autonomous student agent swarm. Strong margin profile.',
    confidenceScore: 96,
    featured: true
  },
  {
    id: 'opp-contract-02',
    title: 'Smart Decentralized Energy Grid Autonomous Load Balancing Checkpoint',
    category: 'ai_contracts',
    fundingType: 'contract',
    providerName: 'Federal Ministry of Power & Renewable Energy Agency',
    providerType: 'Government / Multilateral',
    officialSourceUrl: 'https://rea.gov.ng/tenders/grid-ai-load-balancer-2026',
    publishedDate: '2026-10-10',
    deadline: '2026-11-20',
    lastVerifiedAt: '2026-10-28 09:15 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Automated predictive microgrid allocation for 42 regional solar-hydro minigrids using real-time edge telemetry and mobile node validator consensus.',
    scopeOfWork: 'Integration with 2,400 solar inverter telemetry feeds, edge inference models predicting hourly demand, and Base L2 tamper-evident logging.',
    eligibleCountries: ['Nigeria', 'ECOWAS Member States'],
    eligibleApplicantTypes: ['CleanTech Companies', 'AI Infrastructure Providers'],
    sector: 'Clean Energy & Smart Infrastructure',
    minFundingUsd: 85000,
    maxFundingUsd: 220000,
    currency: 'USD',
    applicationMethod: 'procurement_portal',
    requiredQualifications: ['Registered Entity with CAC', 'COREN Certified Engineers on Team', 'IoT/Telemetry Experience'],
    requiredDocuments: ['Expression of Interest (EOI)', 'Technical Methodology', 'Audited Financials (2024-2025)', 'Equipment Specification Schedule'],
    questionsProcedure: 'Pre-bid virtual conference scheduled for Nov 04, 2026.',
    bidAssessmentNotes: 'Matches UADC Lab & Clean Power node architecture perfectly. Low delivery risk.',
    confidenceScore: 92
  },

  // 2. GRANTS & INNOVATION PROGRAMMES
  {
    id: 'opp-grant-01',
    title: 'Base Ecosystem Innovation & Decentralized AI Builders Grant',
    category: 'grants_innovation',
    fundingType: 'grant',
    providerName: 'Base Ecosystem Foundation & Coinbase Ventures',
    providerType: 'Technology Hyperscaler',
    officialSourceUrl: 'https://base.org/grants/builder-wave-q4-2026',
    publishedDate: '2026-10-01',
    deadline: '2026-12-15',
    lastVerifiedAt: '2026-10-30 08:00 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Non-dilutive milestone grant funding autonomous agentic economies, smart contract certificates, and mobile node validation on Base Layer 2.',
    scopeOfWork: 'Open-source or open-access toolkits deploying smart contracts, verifiable NFT credentials, and micro-transaction routing on Base L2 mainnet.',
    eligibleCountries: ['Global', 'Pan-African', 'North America', 'Europe', 'Asia-Pacific'],
    eligibleApplicantTypes: ['Independent Builders', 'Early-Stage AI Startups', 'Academic Swarms'],
    sector: 'Web3, Agentic Systems & Base L2',
    minFundingUsd: 15000,
    maxFundingUsd: 75000,
    currency: 'USD',
    applicationMethod: 'direct_portal',
    requiredQualifications: ['Live Smart Contract Deployed on Base Testnet or Mainnet', 'Public Github Repository or Demo Link'],
    requiredDocuments: ['Milestone Roadmap', 'Smart Contract Audit Report / Fuzzing Results', 'Project One-Pager'],
    questionsProcedure: 'Office hours conducted on Base Discord builder channels every Thursday.',
    bidAssessmentNotes: 'Direct synergy with BAA Certificate NFTs (0xBAAC) and BaaCoin Base ledger. Milestone 1 easily certifiable.',
    confidenceScore: 98,
    featured: true
  },
  {
    id: 'opp-grant-02',
    title: 'Horizon Europe Digital Health & AgroVision AI Innovation Grant',
    category: 'grants_innovation',
    fundingType: 'grant',
    providerName: 'European Innovation Council (EIC) Accelerator',
    providerType: 'Foundation & Research Council',
    officialSourceUrl: 'https://eic.ec.europa.eu/funding-opportunities/accelerator-2026_en',
    publishedDate: '2026-09-20',
    deadline: '2026-12-05',
    lastVerifiedAt: '2026-10-27 16:20 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Deep-tech grant and blended finance support for high-impact computer vision applications addressing food security and drone-based crop disease diagnosis.',
    scopeOfWork: 'Multi-spectral imaging model optimization, farmer mobile app deployment with offline neural network weights, and field trial validations.',
    eligibleCountries: ['EU Member States', 'Associated Countries', 'African Union Consortium Partners'],
    eligibleApplicantTypes: ['Startups (SMEs)', 'Joint Research Consortia'],
    sector: 'AgroVision & Computer Vision Hardware',
    minFundingUsd: 150000,
    maxFundingUsd: 500000,
    currency: 'EUR',
    applicationMethod: 'direct_portal',
    requiredQualifications: ['TRL Level 5 or higher prototype', 'Consortium Agreement between AU and EU entities'],
    requiredDocuments: ['Full 3-Part EIC Proposal', 'Pitch Deck', '3-Year Financial Forecast', 'Data Governance & Ethical AI Charter'],
    questionsProcedure: 'National Contact Points (NCP) hold weekly inquiry webinars.',
    bidAssessmentNotes: 'Substantial non-dilutive capital. Requires BAA partner in Europe or qualified consortium entity.',
    confidenceScore: 89
  },

  // 3. AI PROJECT LOANS & EQUIPMENT FINANCING
  {
    id: 'opp-loan-01',
    title: 'African Development Bank & Bank of Industry SME AI Hardware Financing Facility',
    category: 'project_loans',
    fundingType: 'debt_loan',
    providerName: 'Bank of Industry (BOI) in partnership with AfDB',
    providerType: 'Commercial & DFI Bank',
    officialSourceUrl: 'https://boi.ng/facilities/tech-equipment-ai-loan',
    publishedDate: '2026-09-15',
    deadline: '2026-12-31',
    lastVerifiedAt: '2026-10-28 11:45 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Low-interest concessionary working capital and GPU hardware equipment financing for high-throughput computing centers and AI engineering enterprises.',
    scopeOfWork: 'Procurement of server rack hardware, solar battery backups, and localized AI node compute deployment with flexible 36-month amortized repayment.',
    eligibleCountries: ['Nigeria'],
    eligibleApplicantTypes: ['Registered Limited Liability Companies (Min 1 Year Track Record)'],
    sector: 'AI Compute Infrastructure & Hardware',
    minFundingUsd: 50000,
    maxFundingUsd: 250000,
    currency: 'USD',
    applicationMethod: 'institutional_email',
    requiredQualifications: ['CAC Registration', 'Audited Accounts', 'Bank Verification Number (BVN) of Promoters', 'Valid Purchase Order / Pro-forma Invoice for Hardware'],
    requiredDocuments: ['Business Plan with Cashflow Projections', 'Hardware Vendor Quotation', 'Corporate Guarantee of Directors', 'Tax Clearance'],
    collateralOrEquityTerms: 'Lien on procured GPU/Server equipment plus corporate guarantee. Zero equity dilution.',
    interestOrFeeTerms: '9% concessionary annual interest rate in local currency equivalent with 6-month initial moratorium.',
    questionsProcedure: 'Corporate desk inquiries via dedicated tech-financing officer.',
    bidAssessmentNotes: 'Excellent terms for UADC GPU cluster expansion without diluting student or founder equity.',
    confidenceScore: 94
  },

  // 4. ANGEL INVESTMENT & VENTURE CAPITAL
  {
    id: 'opp-equity-01',
    title: 'Synergy African Angels Early-Stage Autonomous AI Pre-Seed Tranche',
    category: 'equity_vc',
    fundingType: 'equity',
    providerName: 'Synergy African Angels & Ventures Syndicate',
    providerType: 'Venture Capital & Angels',
    officialSourceUrl: 'https://synergyangels.africa/mandate-2026',
    publishedDate: '2026-10-05',
    deadline: '2026-11-30',
    lastVerifiedAt: '2026-10-30 07:15 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Direct institutional equity investment into vetted African AI micro-startups graduating from accredited AI academies with verified MRR and paying clients.',
    scopeOfWork: 'Equity co-sponsorship via standardized Base L2 SAFE (Simple Agreement for Future Equity) with fast-track 14-day diligence.',
    eligibleCountries: ['Nigeria', 'Kenya', 'Ghana', 'Rwanda', 'South Africa', 'Egypt'],
    eligibleApplicantTypes: ['Incorporated Startups with Active Product & Users'],
    sector: 'Sovereign AI, FinTech & Enterprise Automation',
    minFundingUsd: 25000,
    maxFundingUsd: 100000,
    currency: 'USD',
    applicationMethod: 'partner_intake',
    requiredQualifications: ['Proof of MVP with Paying Customers or Active Pilot', 'Founding Team with AI Academy Capstone'],
    requiredDocuments: ['Pitch Deck (12 Slides Max)', 'Cap Table Spreadsheet', 'Product Architecture Diagram', 'Customer Verification Letters'],
    collateralOrEquityTerms: '5% - 8% equity stake via post-money SAFE at agreed valuation cap ($1.5M - $3M).',
    questionsProcedure: 'Syndicate lead available on partner intake portal for scheduled 15-minute founder intro.',
    bidAssessmentNotes: 'Matches existing MicroStartupSwarm roster (LegalEase Africa AI, AgroScanner Vision). Direct access available.',
    confidenceScore: 97,
    featured: true
  },

  // 5. CLOUD COMPUTING CREDITS & AI ACCELERATORS
  {
    id: 'opp-compute-01',
    title: 'AWS Activate & Anthropic AI Foundation Compute Credit Grant',
    category: 'compute_credits',
    fundingType: 'non_cash_credit',
    providerName: 'Amazon Web Services (AWS) AI Startup Division',
    providerType: 'Technology Hyperscaler',
    officialSourceUrl: 'https://aws.amazon.com/activate/ai-credits-program',
    publishedDate: '2026-08-15',
    deadline: '2026-12-31',
    lastVerifiedAt: '2026-10-29 18:00 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Direct compute credits for cloud GPU instances (NVIDIA H100, A100, Trainium), Claude 3.5 Sonnet API vouchers, and dedicated architectural mentorship.',
    scopeOfWork: 'Model fine-tuning, vector database hosting, serverless inference, and multi-region failover infrastructure.',
    eligibleCountries: ['Global', 'Pan-African'],
    eligibleApplicantTypes: ['Affiliated Incubator Members', 'Self-Funded AI Startups'],
    sector: 'Cloud Infrastructure & Deep Learning Compute',
    minFundingUsd: 25000,
    maxFundingUsd: 100000,
    currency: 'USD',
    applicationMethod: 'direct_portal',
    requiredQualifications: ['Live Company Website', 'Institutional Affiliation Organization ID (BAA Partner Code)'],
    requiredDocuments: ['AWS Organization ID', 'Architecture Diagram', 'Estimated Monthly Cloud Bill Projection'],
    interestOrFeeTerms: '100% non-cash credit voucher valid for 12 months. Zero debt or equity obligations.',
    questionsProcedure: 'AWS Startup Advocate ticketing queue.',
    bidAssessmentNotes: 'Substantially reduces BAA and student GPU operating expenses. Immediate submission ready.',
    confidenceScore: 99
  },
  {
    id: 'opp-compute-02',
    title: 'Google for Startups Cloud AI & TPU Research Credit Programme',
    category: 'compute_credits',
    fundingType: 'non_cash_credit',
    providerName: 'Google for Startups Accelerator Africa',
    providerType: 'Technology Hyperscaler',
    officialSourceUrl: 'https://startup.google.com/programs/ai-credits',
    publishedDate: '2026-09-01',
    deadline: '2026-12-15',
    lastVerifiedAt: '2026-10-28 15:40 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Google Cloud Platform (GCP) and Vertex AI credit vouchers covering Gemini 1.5 Pro / Flash API consumption and TPU v5e clusters.',
    scopeOfWork: 'Agentic workflow scaling, real-time multimodal transcription, and localized mobile deployment.',
    eligibleCountries: ['Pan-African', 'Global'],
    eligibleApplicantTypes: ['AI Startups with Functional Prototype'],
    sector: 'Enterprise AI & Multimodal LLM Infrastructure',
    minFundingUsd: 30000,
    maxFundingUsd: 100000,
    currency: 'USD',
    applicationMethod: 'direct_portal',
    requiredQualifications: ['GCP Project Setup', 'Registered Business Entity'],
    requiredDocuments: ['Executive Summary', 'GCP Billing Account ID', 'Technical Architecture Documentation'],
    interestOrFeeTerms: 'Non-dilutive cloud credit grant. No repayment.',
    questionsProcedure: 'Google Africa Developer relations portal.',
    bidAssessmentNotes: 'Direct match for BAA AI workforce and live tutor translation backbones.',
    confidenceScore: 95
  },

  // 6. CORPORATE PARTNERSHIPS & REVENUE-SHARING
  {
    id: 'opp-partnership-01',
    title: 'Pan-African Telecom AI Value-Added Service (VAS) Revenue-Share Distribution',
    category: 'corporate_partnerships',
    fundingType: 'revenue_share_partnership',
    providerName: 'Major African Telecom Consortium (MTN & Airtel VAS Channels)',
    providerType: 'Enterprise Corporate',
    officialSourceUrl: 'https://vaspartners.telecom.africa/ai-education-tender',
    publishedDate: '2026-10-12',
    deadline: '2026-11-25',
    lastVerifiedAt: '2026-10-30 09:30 UTC',
    isVerified: true,
    status: 'active',
    summary: 'Commercial partnership offering nationwide mobile subscriber distribution for voice-enabled AI micro-tutoring and SMS homework solvers with 70/30 revenue split.',
    scopeOfWork: 'Integration with USSD gateway, direct carrier billing (DCB), automated audio stream generation across Nigerian languages, and high-availability endpoints.',
    eligibleCountries: ['Nigeria', 'Ghana', 'Kenya', 'Uganda'],
    eligibleApplicantTypes: ['Registered Content & VAS Aggregators', 'AI Education Providers'],
    sector: 'Telecommunications & EdTech VAS',
    minFundingUsd: 50000,
    maxFundingUsd: 300000,
    currency: 'USD',
    applicationMethod: 'partner_intake',
    requiredQualifications: ['NCC VAS License or Tier-1 Aggregator Sponsorship', 'Audited 99.9% Server Uptime SLA'],
    requiredDocuments: ['Carrier Integration Architecture', 'Content Curriculum Samples', 'Revenue Projection Model', 'Cybersecurity Audit Certificate'],
    collateralOrEquityTerms: 'Commercial joint venture agreement. 70% of gross carrier billings distributed monthly to content partner.',
    questionsProcedure: 'Enterprise partnership director email liaison.',
    bidAssessmentNotes: 'Enormous recurring revenue potential. Connects BAA Academy content directly to 70M+ mobile phone users.',
    confidenceScore: 93,
    featured: true
  }
];

export const INITIAL_DISCOVERY_AGENTS: DiscoveryAgent[] = [
  {
    id: 'GlobalOpportunityScanner',
    name: 'GlobalOpportunityScanner',
    role: 'Autonomous Multilateral Feed Ingestor',
    purpose: 'Continuously monitors UN, EU, World Bank, and national development procurement gazettes for high-value AI tenders.',
    approvedSources: ['ted.europa.eu', 'ungm.org', 'alsf.int', 'procurement-notices.undp.org'],
    inputSchema: '{"sectors": ["AI", "Software", "Compute"], "min_budget_usd": 25000, "active_only": true}',
    outputSchema: '{"records_parsed": number, "new_opportunities": OpportunityRecord[], "duplicate_count": number}',
    lastRunTimestamp: '2026-10-30 10:45 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 42
  },
  {
    id: 'AIContractHunter',
    name: 'AIContractHunter',
    role: 'Commercial & Government Contract Specialist',
    purpose: 'Discovers verified enterprise RFPs, government tech contracts, and e-governance AI initiatives.',
    approvedSources: ['sam.gov', 'etenders.gov.za', 'rea.gov.ng', 'bpp.gov.ng'],
    inputSchema: '{"keywords": ["artificial intelligence", "large language model", "smart grid"], "geography": ["Africa", "Global"]}',
    outputSchema: '{"verified_rfps": OpportunityRecord[], "qualification_criteria": string[]}',
    lastRunTimestamp: '2026-10-30 09:30 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 18
  },
  {
    id: 'GrantAndInnovationScout',
    name: 'GrantAndInnovationScout',
    role: 'Non-Dilutive Innovation Fund Finder',
    purpose: 'Scans philanthropic, research council, and blockchain ecosystem grants for Web3 and AI funding.',
    approvedSources: ['base.org/grants', 'eic.ec.europa.eu', 'gatesfoundation.org', 'wellcome.org'],
    inputSchema: '{"equity_free": true, "eligible_applicant": "startups_and_academic"}',
    outputSchema: '{"grant_opportunities": OpportunityRecord[], "deadlines_indexed": string[]}',
    lastRunTimestamp: '2026-10-30 08:15 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 29
  },
  {
    id: 'ProjectLoanFinder',
    name: 'ProjectLoanFinder',
    role: 'Concessionary Debt & Equipment Financing Analyst',
    purpose: 'Discovers low-interest credit lines, DFI guarantees, and working capital loans for tech infrastructure.',
    approvedSources: ['boi.ng', 'afdb.org', 'eib.org', 'dfid.gov.uk'],
    inputSchema: '{"facility_type": "debt", "interest_cap_percent": 12, "hardware_eligible": true}',
    outputSchema: '{"credit_lines": OpportunityRecord[], "collateral_requirements": string[]}',
    lastRunTimestamp: '2026-10-29 22:00 UTC',
    executionStatus: 'idle',
    itemsFoundCount: 11
  },
  {
    id: 'InvestorDiscoveryAgent',
    name: 'InvestorDiscoveryAgent',
    role: 'VC Syndicate & Angel Network Profiler',
    purpose: 'Monitors early-stage venture capital funds, angel syndicates, and family offices actively deploying into African tech.',
    approvedSources: ['synergyangels.africa', 'avca-africa.org', 'techstars.com', 'ycombinator.com'],
    inputSchema: '{"check_size_min": 25000, "check_size_max": 250000, "stage": "pre_seed_to_seed"}',
    outputSchema: '{"investor_profiles": InstitutionProfile[], "mandate_summaries": string[]}',
    lastRunTimestamp: '2026-10-30 11:15 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 34
  },
  {
    id: 'ComputeCreditScout',
    name: 'ComputeCreditScout',
    role: 'Cloud Hyperscaler Credit Optimizer',
    purpose: 'Tracks accelerator credits from AWS, Google Cloud, Microsoft Founders Hub, NVIDIA Inception, and OpenAI.',
    approvedSources: ['aws.amazon.com/activate', 'startup.google.com', 'microsoft.com/startups', 'nvidia.com/inception'],
    inputSchema: '{"credit_type": "non_cash_cloud_compute", "min_value_usd": 10000}',
    outputSchema: '{"credit_vouchers": OpportunityRecord[], "prerequisites": string[]}',
    lastRunTimestamp: '2026-10-30 07:00 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 16
  },
  {
    id: 'PartnershipHunter',
    name: 'PartnershipHunter',
    role: 'Corporate Joint Venture & Distribution Matcher',
    purpose: 'Identifies commercial telecom VAS tenders, enterprise distribution contracts, and API revenue-sharing models.',
    approvedSources: ['telecom.africa', 'gsma.com', 'corporate-partner-intakes.org'],
    inputSchema: '{"model": "revenue_share", "target_channels": ["telecom", "banking_apps"]}',
    outputSchema: '{"distribution_deals": OpportunityRecord[], "revenue_split_terms": string[]}',
    lastRunTimestamp: '2026-10-29 19:30 UTC',
    executionStatus: 'idle',
    itemsFoundCount: 12
  },
  {
    id: 'OpportunityVerificationAgent',
    name: 'OpportunityVerificationAgent',
    role: 'Integrity, Anti-Fraud & Provenance Auditor',
    purpose: 'Verifies official source domains, checks TLS certificates, checks for advance-fee red flags, and deduplicates records.',
    approvedSources: ['whois.iana.org', 'official_gazettes', 'public_procurement_registers'],
    inputSchema: '{"raw_records": OpportunityRecord[]}',
    outputSchema: '{"verified_records": OpportunityRecord[], "flagged_scams": string[], "deduped": number}',
    lastRunTimestamp: '2026-10-30 11:30 UTC',
    executionStatus: 'running',
    itemsFoundCount: 88
  },
  {
    id: 'EligibilityMatchingAgent',
    name: 'EligibilityMatchingAgent',
    role: 'Member & BAA Profile Compatibility Auditor',
    purpose: 'Cross-checks project readiness, company registration, and team skillsets against required RFP qualifications.',
    approvedSources: ['member_project_profiles', 'baa_academy_curriculum', 'opportunity_requirements'],
    inputSchema: '{"project_id": string, "opportunity_id": string}',
    outputSchema: '{"match_score": number, "met_criteria": string[], "eligibility_gaps": string[], "course_remedies": string[]}',
    lastRunTimestamp: '2026-10-30 11:40 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 57
  },
  {
    id: 'DeadlineMonitor',
    name: 'DeadlineMonitor',
    role: 'Tender Clock & Countdown Sentinel',
    purpose: 'Monitors submission cutoff dates across time zones, flags approaching deadlines (<14 days), and expires past listings.',
    approvedSources: ['system_clock', 'all_active_opportunities'],
    inputSchema: '{"warning_threshold_days": 14}',
    outputSchema: '{"approaching_deadlines": OpportunityRecord[], "expired_marked": number}',
    lastRunTimestamp: '2026-10-30 11:00 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 4
  },
  {
    id: 'ProposalPreparationAgent',
    name: 'ProposalPreparationAgent',
    role: 'Technical & Commercial Bid Drafter',
    purpose: 'Synthesizes verified organization credentials, past performance metrics, and BAA curriculum into tailored bid responses.',
    approvedSources: ['baa_verified_case_studies', 'project_technical_specs', 'rfp_document_checklists'],
    inputSchema: '{"opportunity_id": string, "applicant_id": string, "custom_notes": string}',
    outputSchema: '{"executive_summary": string, "methodology_draft": string, "compliance_matrix": object}',
    lastRunTimestamp: '2026-10-30 10:15 UTC',
    executionStatus: 'idle',
    itemsFoundCount: 9
  },
  {
    id: 'DealPipelineCoordinator',
    name: 'DealPipelineCoordinator',
    role: 'Unified CRM & Stage Lifecycle Orchestrator',
    purpose: 'Tracks deal status progression through 14 unified pipeline stages, calculates real vs estimated value, and logs audit entries.',
    approvedSources: ['engagement_threads', 'deal_records', 'admin_actions'],
    inputSchema: '{"action": "advance_stage" | "calculate_metrics" | "schedule_reminder"}',
    outputSchema: '{"metrics_updated": DealRoomDashboardMetrics, "audit_entry_created": boolean}',
    lastRunTimestamp: '2026-10-30 11:45 UTC',
    executionStatus: 'completed',
    itemsFoundCount: 15
  }
];

export const INITIAL_SOURCE_CONNECTORS: SourceConnector[] = [
  {
    id: 'conn-eu-ted',
    name: 'Tenders Electronic Daily (TED EU)',
    category: 'ai_contracts',
    officialUrl: 'https://ted.europa.eu',
    authType: 'public_api',
    connectionStatus: 'connected_live',
    lastSyncTime: '2026-10-30 10:45 UTC',
    recordsIngested: 38,
    requirementsNote: 'Public SPARQL API connected. Direct official procurement notices.'
  },
  {
    id: 'conn-undp-procure',
    name: 'United Nations Development Programme (UNDP)',
    category: 'ai_contracts',
    officialUrl: 'https://procurement-notices.undp.org',
    authType: 'open_data',
    connectionStatus: 'connected_live',
    lastSyncTime: '2026-10-30 09:20 UTC',
    recordsIngested: 14,
    requirementsNote: 'Official UNGM public notice feed verified.'
  },
  {
    id: 'conn-base-ecosystem',
    name: 'Base Layer 2 Ecosystem Foundation Grants',
    category: 'grants_innovation',
    officialUrl: 'https://base.org/grants',
    authType: 'public_api',
    connectionStatus: 'connected_live',
    lastSyncTime: '2026-10-30 08:00 UTC',
    recordsIngested: 22,
    requirementsNote: 'Base builder API & Discord announcement scraper verified.'
  },
  {
    id: 'conn-aws-activate',
    name: 'AWS Activate & Anthropic AI Credit Program',
    category: 'compute_credits',
    officialUrl: 'https://aws.amazon.com/activate',
    authType: 'portal_credential',
    connectionStatus: 'credentials_required',
    lastSyncTime: '2026-10-29 18:00 UTC',
    recordsIngested: 6,
    requirementsNote: 'Requires BAA Institutional Partner Organization Code for automated batch voucher provisioning.'
  },
  {
    id: 'conn-google-startups',
    name: 'Google for Startups Accelerator Africa',
    category: 'compute_credits',
    officialUrl: 'https://startup.google.com',
    authType: 'public_api',
    connectionStatus: 'connected_live',
    lastSyncTime: '2026-10-28 15:40 UTC',
    recordsIngested: 9,
    requirementsNote: 'Official Google Africa startups directory feed connected.'
  },
  {
    id: 'conn-boi-dfi',
    name: 'Bank of Industry & AfDB Tech Loan Desk',
    category: 'project_loans',
    officialUrl: 'https://boi.ng',
    authType: 'manual_feed',
    connectionStatus: 'offline_manual',
    lastSyncTime: '2026-10-28 11:45 UTC',
    recordsIngested: 5,
    requirementsNote: 'Manual intake and verified gazette synchronizer. Inquiries handled via designated credit officer.'
  }
];

export const INITIAL_INSTITUTIONS: InstitutionProfile[] = [
  {
    id: 'inst-alsf',
    name: 'African Legal Support Facility (ALSF)',
    type: 'corporate_buyer',
    headquarters: 'Abidjan, Côte d’Ivoire & Pretoria, South Africa',
    officialWebsite: 'https://alsf.int',
    contactChannel: 'Official Procurement Secretariat',
    verifiedEmailOrRoute: 'procurement@alsf.int',
    contactVerificationStatus: 'verified_official',
    matchScore: 94,
    matchedOpportunitiesCount: 2,
    previousInteractionsCount: 3,
    recommendedNextAction: 'Submit formal Clarification Note on Multilingual Yoruba/Hausa LLM Benchmarks.',
    overview: 'Public international organization hosted by the African Development Bank, providing technical and legal advisory services to African sovereign states.',
    eligibleSectors: ['GovTech', 'LegalTech AI', 'Public Finance Modeling']
  },
  {
    id: 'inst-base',
    name: 'Base Ecosystem Foundation',
    type: 'grant_foundation',
    headquarters: 'San Francisco, CA & Global Remote',
    officialWebsite: 'https://base.org',
    contactChannel: 'Ecosystem Grants Review Committee',
    verifiedEmailOrRoute: 'grants@base.org',
    contactVerificationStatus: 'verified_official',
    matchScore: 98,
    matchedOpportunitiesCount: 3,
    previousInteractionsCount: 5,
    recommendedNextAction: 'Finalize Milestone 1 Deliverable Report for BAA NFT Inscriber on Base L2.',
    overview: 'Coinbase-incubated Ethereum Layer 2 ecosystem fostering open-source public goods, smart contracts, and decentralized consumer applications.',
    eligibleSectors: ['Web3 Infrastructure', 'Autonomous AI Nodes', 'Smart Contracts']
  },
  {
    id: 'inst-synergy',
    name: 'Synergy African Angels & Ventures',
    type: 'venture_capital',
    headquarters: 'Lagos, Nigeria & London, UK',
    officialWebsite: 'https://synergyangels.africa',
    contactChannel: 'Investment Committee Secretariat',
    verifiedEmailOrRoute: 'deals@synergyangels.africa',
    contactVerificationStatus: 'verified_official',
    matchScore: 92,
    matchedOpportunitiesCount: 4,
    previousInteractionsCount: 7,
    recommendedNextAction: 'Review Term Sheet for LegalEase Africa AI $25k Seed Co-Sponsorship.',
    overview: 'Pan-African syndicate of verified high-net-worth investors and tech operators providing $25k - $100k checks to early-stage startups.',
    eligibleSectors: ['FinTech', 'Legal AI', 'Sovereign Swarms', 'EdTech']
  },
  {
    id: 'inst-aws',
    name: 'Amazon Web Services (AWS AI Startups)',
    type: 'cloud_hyperscaler',
    headquarters: 'Seattle, WA, USA',
    officialWebsite: 'https://aws.amazon.com',
    contactChannel: 'Africa Startup Business Development Lead',
    verifiedEmailOrRoute: 'aws-africa-startups@amazon.com',
    contactVerificationStatus: 'verified_official',
    matchScore: 96,
    matchedOpportunitiesCount: 2,
    previousInteractionsCount: 2,
    recommendedNextAction: 'Submit BAA Cohort batch registration for $100,000 GPU Activate tier.',
    overview: 'World leading cloud provider offering infrastructure, GPU clusters, and foundational model hosting.',
    eligibleSectors: ['AI Compute', 'Cloud Hosting', 'Machine Learning Infrastructure']
  }
];

export const INITIAL_ENGAGEMENT_THREADS: EngagementThread[] = [
  {
    id: 'thread-alsf-01',
    institutionId: 'inst-alsf',
    opportunityId: 'opp-contract-01',
    subject: 'BAA Academy Consortium — Formal Qualification Statement for Legal AI RFP',
    stage: 'draft_prepared',
    lastUpdated: '2026-10-30 11:20 UTC',
    followUpDate: '2026-11-04',
    proposalHistory: ['v1.0 Initial Draft Qualification Profile', 'v1.1 Security & ISO Appendix'],
    messages: [
      {
        id: 'msg-01',
        threadId: 'thread-alsf-01',
        senderRole: 'baa_admin',
        senderName: 'Chief Institutional Liaison Officer',
        senderEmail: 'admin@billionairesai.academy',
        recipientName: 'Procurement Secretariat',
        recipientRoute: 'procurement@alsf.int',
        subject: 'BAA Academy Consortium — Formal Qualification Statement for Legal AI RFP',
        body: 'Dear ALSF Procurement Committee,\n\nOn behalf of Billionaire AI Academy (BAA) and our enterprise technology partners, we formally submit our Expression of Interest regarding the Multilingual Legal AI & Document Intelligence RFP (Ref: ALSF-RFP-2026-04).\n\nOur specialized AI research labs have successfully engineered and benchmarked containerized legal models across Nigerian and Pan-African statutory jurisdictions, with demonstrated semantic search capabilities across English, Swahili, and Yoruba.\n\nAll data sovereignty requirements adhere to ISO-27001 standards with local sovereign storage endpoints.\n\nWe would welcome clarification on paragraph 4.2 regarding on-premise hardware caching.\n\nSincerely,\nBAA Institutional Relations Board',
        attachments: ['BAA_LegalEase_Technical_Spec_v1.pdf', 'Audited_Capabilities_Matrix_2026.pdf'],
        deliveryStatus: 'pending_approval',
        approvedByAdminName: undefined,
        isCopyReadyFallback: false
      }
    ]
  },
  {
    id: 'thread-synergy-01',
    institutionId: 'inst-synergy',
    opportunityId: 'opp-equity-01',
    subject: 'Synergy Syndicate / BAA MicroStartup Incubator Co-Investment Term Sheet Review',
    stage: 'admin_approved',
    lastUpdated: '2026-10-30 10:15 UTC',
    followUpDate: '2026-11-02',
    proposalHistory: ['Synergy Term Sheet Draft #091'],
    messages: [
      {
        id: 'msg-02',
        threadId: 'thread-synergy-01',
        senderRole: 'baa_admin',
        senderName: 'Venture Operations Director',
        senderEmail: 'admin@billionairesai.academy',
        recipientName: 'Investment Committee Lead',
        recipientRoute: 'deals@synergyangels.africa',
        subject: 'Synergy Syndicate / BAA MicroStartup Incubator Co-Investment Term Sheet Review',
        body: 'Dear Synergy Investment Board,\n\nFollowing the successful review of LegalEase Africa AI and its CAC registration (RC: 1948201) along with its Base L2 equity smart contract (0x71c8...392e), we have confirmed board approval for the $25,000 SAFE tranche.\n\nThe student founder Tariq Sterling and team have achieved verified monthly recurring revenue of $4,200 across 18 commercial law firms.\n\nPlease find the countersigned SAFE term sheet attached for final disbursement scheduling into the verified corporate settlement account.\n\nBest regards,\nBAA Venture Funding Desk',
        attachments: ['LegalEase_Signed_SAFE_TermSheet.pdf', 'CapTable_Q4_2026.xlsx'],
        deliveryStatus: 'approved_ready',
        approvedByAdminName: 'SuperAdmin Tariq',
        approvalTimestamp: '2026-10-30 09:45 UTC',
        isCopyReadyFallback: false
      }
    ]
  }
];

export const INITIAL_MEMBER_PROJECTS: MemberProjectProfile[] = [
  {
    id: 'proj-member-01',
    userId: 'usr-student-001',
    userName: 'Tariq Sterling',
    projectName: 'LegalEase Africa AI — Autonomous Multilingual Contract Auditing',
    description: 'Autonomous neural legal research and contract summarization platform for African corporate attorneys, reducing lease and commercial agreement drafting time by 80%.',
    country: 'Nigeria',
    industry: 'LegalTech & GovTech AI',
    businessStage: 'Revenue Generating',
    legalEntityStatus: 'Registered Limited Co. (RC/CAC)',
    fundingRequirementUsd: 50000,
    currency: 'USD',
    intendedUseOfFunds: 'Hire 2 senior NLP engineers, expand Swahili and French legal databases, and secure ISO-27001 data center certification.',
    projectBudgetUsd: 65000,
    estimatedAnnualRevenueUsd: 96000,
    availableCollateralOrEquity: '7% Preferred Equity via Base L2 SAFE contract',
    supportingDocuments: ['CAC Certificate of Incorporation', 'Product Architecture Diagram', 'Customer Pilot Agreements (3 Law Firms)', 'Monthly P&L Ledger'],
    matchedOpportunities: [
      {
        opportunityId: 'opp-contract-01',
        matchScore: 95,
        matchReasons: ['Direct category match in Multilingual Legal AI', 'Incorporated entity with CAC', 'Working prototype ready'],
        eligibilityGaps: ['ISO-27001 formal certificate in progress', 'Requires 3 years audited financials (currently 1 year)'],
        recommendedBaaCourses: ['Smart Contract Security & Base L2 Fuzzing Capstone', 'AI Sovereign Agent Architecture'],
        confidence: 94
      },
      {
        opportunityId: 'opp-equity-01',
        matchScore: 98,
        matchReasons: ['Synergy Angels actively deploying in LegalTech', 'Existing MRR > $3,000/mo', 'Founding team verified in BAA'],
        eligibilityGaps: [],
        recommendedBaaCourses: ['AI Wealth & Sovereign Agent Architecture Capstone'],
        confidence: 98
      }
    ],
    createdAt: '2026-10-18'
  },
  {
    id: 'proj-member-02',
    userId: 'usr-chioma-092',
    userName: 'Chioma Adeyemi',
    projectName: 'AgroScanner Vision — Drone & Edge AI Pest Detection',
    description: 'Edge-computing computer vision models running on low-cost Android phones mounted on field drones to detect cassava bacterial blight and maize streak virus in real time.',
    country: 'Nigeria',
    industry: 'AgroVision & Computer Vision Hardware',
    businessStage: 'MVP & Early Users',
    legalEntityStatus: 'Unincorporated Team',
    fundingRequirementUsd: 35000,
    currency: 'USD',
    intendedUseOfFunds: 'Procure 5 test drones, camera sensors, and incorporate business entity with Nigerian CAC.',
    projectBudgetUsd: 42000,
    estimatedAnnualRevenueUsd: 48000,
    availableCollateralOrEquity: '10% Common Equity upon incorporation',
    supportingDocuments: ['Technical Whitepaper', 'Field Trial Video Demo', 'Farmer Cooperative MOU'],
    matchedOpportunities: [
      {
        opportunityId: 'opp-grant-02',
        matchScore: 88,
        matchReasons: ['Direct match for Horizon Europe & AgroVision AI funding', 'High impact on African food security'],
        eligibilityGaps: ['Must complete legal incorporation (CAC)', 'Requires European consortium co-partner'],
        recommendedBaaCourses: ['Pan-African AI University Program — Module 4: Agritech Sensing'],
        confidence: 86
      },
      {
        opportunityId: 'opp-compute-02',
        matchScore: 92,
        matchReasons: ['Eligible for Google Cloud TPU research credits to train vision models'],
        eligibilityGaps: ['GCP Organization account setup'],
        recommendedBaaCourses: ['AI Tools & Autonomous Utilities'],
        confidence: 90
      }
    ],
    createdAt: '2026-10-22'
  }
];

export const INITIAL_DEAL_RECORDS: DealRecord[] = [
  {
    id: 'deal-01',
    title: 'ALSF Multilingual Legal AI Tender',
    opportunityId: 'opp-contract-01',
    institutionId: 'inst-alsf',
    opportunityCategory: 'ai_contracts',
    stage: 'contact_drafted',
    estimatedValueUsd: 250000,
    confirmedActualRevenueUsd: 0,
    currency: 'USD',
    applicationCostUsd: 1200,
    staffHoursLogged: 45,
    submissionDeadline: '2026-11-28',
    nextActionDeadline: '2026-11-04',
    nextActionDescription: 'Admin review and sign-off on Qualification Statement before portal upload.',
    contactHistoryCount: 3,
    documentsCount: 4,
    outcomeNotes: 'In active draft review. Strong competitive positioning.',
    isBaaInternalDeal: true,
    createdAt: '2026-10-16',
    updatedAt: '2026-10-30 11:20 UTC'
  },
  {
    id: 'deal-02',
    title: 'Base Ecosystem Foundation AI Builder Grant Wave 4',
    opportunityId: 'opp-grant-01',
    institutionId: 'inst-base',
    opportunityCategory: 'grants_innovation',
    stage: 'submitted',
    estimatedValueUsd: 45000,
    confirmedActualRevenueUsd: 0,
    currency: 'USD',
    applicationCostUsd: 350,
    staffHoursLogged: 28,
    submissionDeadline: '2026-12-15',
    nextActionDeadline: '2026-11-12',
    nextActionDescription: 'Attend Base Builder Office Hours demo session on Discord.',
    contactHistoryCount: 5,
    documentsCount: 3,
    outcomeNotes: 'Application submitted on Base developer portal. Confirmation ID: BASE-GR-2026-881.',
    verifiedEvidenceLink: 'https://base.org/grants/track/BASE-GR-2026-881',
    isBaaInternalDeal: true,
    createdAt: '2026-10-08',
    updatedAt: '2026-10-29 16:00 UTC'
  },
  {
    id: 'deal-03',
    title: 'LegalEase Africa AI Pre-Seed Tranche',
    opportunityId: 'opp-equity-01',
    institutionId: 'inst-synergy',
    opportunityCategory: 'equity_vc',
    stage: 'negotiation',
    estimatedValueUsd: 25000,
    confirmedActualRevenueUsd: 0,
    currency: 'USD',
    applicationCostUsd: 500,
    staffHoursLogged: 32,
    submissionDeadline: '2026-11-30',
    nextActionDeadline: '2026-11-02',
    nextActionDescription: 'Execute final countersignature on SAFE term sheet and initiate escrow release.',
    contactHistoryCount: 7,
    documentsCount: 6,
    outcomeNotes: 'Syndicate lead issued conditional term sheet at $2.2M valuation cap.',
    isBaaInternalDeal: false,
    memberOwnerId: 'usr-student-001',
    createdAt: '2026-10-12',
    updatedAt: '2026-10-30 10:15 UTC'
  },
  {
    id: 'deal-04',
    title: 'AWS Activate Cloud Compute Grant Batch 2026',
    opportunityId: 'opp-compute-01',
    institutionId: 'inst-aws',
    opportunityCategory: 'compute_credits',
    stage: 'won',
    estimatedValueUsd: 50000,
    confirmedActualRevenueUsd: 50000, // Non-cash credit verified
    currency: 'USD',
    applicationCostUsd: 0,
    staffHoursLogged: 12,
    submissionDeadline: '2026-12-31',
    nextActionDeadline: '2026-12-01',
    nextActionDescription: 'Disburse AWS account voucher keys to BAA student cohort compute nodes.',
    contactHistoryCount: 4,
    documentsCount: 2,
    outcomeNotes: 'Voucher code activated: AWS-ACT-BAA-50K-2026. Applied directly to BAA cloud billing account.',
    verifiedEvidenceLink: 'https://console.aws.amazon.com/billing/credits/AWS-ACT-BAA-50K',
    isBaaInternalDeal: true,
    createdAt: '2026-09-18',
    updatedAt: '2026-10-25 14:00 UTC'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-01',
    timestamp: '2026-10-30 11:45 UTC',
    actorName: 'DealPipelineCoordinator',
    actorRole: 'agent',
    actionType: 'opportunity_scanned',
    details: 'Ingested 42 multilateral and commercial RFP notices from TED EU and ALSF gazette.'
  },
  {
    id: 'log-02',
    timestamp: '2026-10-30 11:20 UTC',
    actorName: 'SuperAdmin Tariq',
    actorRole: 'admin',
    actionType: 'message_drafted',
    details: 'Drafted Formal Qualification Statement for ALSF Legal AI RFP with ISO-27001 appendix.'
  },
  {
    id: 'log-03',
    timestamp: '2026-10-30 09:45 UTC',
    actorName: 'SuperAdmin Tariq',
    actorRole: 'admin',
    actionType: 'message_approved',
    details: 'Reviewed and approved SAFE term sheet communication to Synergy African Angels for LegalEase Africa AI.'
  },
  {
    id: 'log-04',
    timestamp: '2026-10-25 14:00 UTC',
    actorName: 'ComputeCreditScout',
    actorRole: 'agent',
    actionType: 'deal_stage_advanced',
    details: 'Advanced deal-04 (AWS Activate Cloud Compute) to WON upon confirmation of $50,000 voucher code.'
  }
];

// Helper functions for storage
export function loadDealRoomData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`Failed to load ${key} from storage:`, err);
    return fallback;
  }
}

export function saveDealRoomData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to save ${key} to storage:`, err);
  }
}

export function calculateDealRoomMetrics(
  opportunities: OpportunityRecord[],
  deals: DealRecord[],
  threads: EngagementThread[],
  connectors: SourceConnector[]
): DealRoomDashboardMetrics {
  const newDiscovered = opportunities.filter(o => o.status === 'active').length;
  const verified = opportunities.filter(o => o.isVerified).length;
  
  // Count deadlines approaching in next 30 days
  const now = new Date();
  const thirtyDaysAhead = new Date();
  thirtyDaysAhead.setDate(now.getDate() + 30);
  
  const deadlinesApproaching = opportunities.filter(o => {
    if (!o.deadline) return false;
    const d = new Date(o.deadline);
    return d >= now && d <= thirtyDaysAhead;
  }).length;

  const contractsUnderReview = deals.filter(d => 
    d.opportunityCategory === 'ai_contracts' && ['under_review', 'proposal_in_progress', 'negotiation'].includes(d.stage)
  ).length;

  const fundingApplicationsInProgress = deals.filter(d =>
    ['grants_innovation', 'project_loans', 'equity_vc'].includes(d.opportunityCategory) &&
    ['contact_drafted', 'approved', 'contacted', 'response_received', 'proposal_in_progress', 'submitted', 'negotiation'].includes(d.stage)
  ).length;

  const institutionalConversations = threads.length;
  const confirmedReplies = threads.filter(t => t.stage === 'reply_received' || t.messages.some(m => !!m.replyContent)).length;
  const proposalsSubmitted = deals.filter(d => ['submitted', 'negotiation', 'won'].includes(d.stage)).length;
  const contractsWon = deals.filter(d => d.stage === 'won').length;

  // Real confirmed funding vs revenue
  const actualFundingSecured = deals
    .filter(d => d.stage === 'won' && ['grants_innovation', 'equity_vc', 'compute_credits', 'project_loans'].includes(d.opportunityCategory))
    .reduce((sum, d) => sum + d.confirmedActualRevenueUsd, 0);

  const actualRevenueEarned = deals
    .filter(d => d.stage === 'won' && ['ai_contracts', 'corporate_partnerships'].includes(d.opportunityCategory))
    .reduce((sum, d) => sum + d.confirmedActualRevenueUsd, 0);

  const activeConnectors = connectors.filter(c => c.connectionStatus === 'connected_live').length;

  return {
    newOpportunitiesDiscovered: newDiscovered,
    opportunitiesVerified: verified,
    potentialMatches: opportunities.length * 3, // Potential matches across projects
    deadlinesApproaching,
    contractsUnderReview,
    fundingApplicationsInProgress,
    institutionalConversations,
    confirmedReplies,
    proposalsSubmitted,
    contractsWon,
    actualFundingSecuredUsd: actualFundingSecured,
    actualRevenueEarnedUsd: actualRevenueEarned,
    activeConnectorsCount: activeConnectors,
    lastSyncTimestamp: '2026-10-30 11:45 UTC'
  };
}
