import { CodeVeinColonyId } from '../types/codeVein';

export interface ColonyDefinition {
  id: CodeVeinColonyId;
  colonyNumber: number;
  name: string;
  tagline: string;
  description: string;
  category: 'Intelligence & Audit' | 'Refinery & Code Production' | 'Marketplace & Commercial' | 'Enterprise & Infrastructure';
  icon: string;
  accentColor: string;
  revenueModel: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  agentRole: string;
  pipelineStage: string;
  actions: string[];
}

export const CODE_VEIN_COLONIES: ColonyDefinition[] = [
  {
    id: 'github_miner',
    colonyNumber: 1,
    name: 'GitHub Asset Intelligence Miner',
    tagline: 'Autonomous Repository Radar & Commercial Suitability Valuator',
    description: 'Scans authorized public and personal repositories, analyzes dependency graphs, evaluates commercial demand, and surfaces high-value code assets.',
    category: 'Intelligence & Audit',
    icon: 'Search',
    accentColor: '#A855F7',
    revenueModel: 'Asset Discovery & Commercial Valuation Score',
    primaryMetricLabel: 'Repos Scanned',
    primaryMetricValue: '86 Verified',
    agentRole: 'Repository Discovery Agent',
    pipelineStage: 'AUTHORIZED SOURCE',
    actions: ['Scan Repository URL', 'Analyze Dependencies', 'Estimate Market Value']
  },
  {
    id: 'dna_registry',
    colonyNumber: 2,
    name: 'Code Asset DNA & Ownership Registry',
    tagline: 'Cryptographic Provenance, License Audit & Private Sandbox Quarantine',
    description: 'Verifies author attribution, guarantees zero leak for private developer code, audits open-source licenses (MIT, Apache, GPL), and assigns immutable fingerprints.',
    category: 'Intelligence & Audit',
    icon: 'ShieldCheck',
    accentColor: '#00FF88',
    revenueModel: 'Soulbound Ownership & Verified Provenance',
    primaryMetricLabel: 'DNA Certificates',
    primaryMetricValue: '74 Clean',
    agentRole: 'Code DNA & Ownership Guardian',
    pipelineStage: 'CODE DNA & PROVENANCE',
    actions: ['Verify Provenance', 'Enforce Zero-Leak Sandbox', 'Audit License Compliance']
  },
  {
    id: 'micro_api_refinery',
    colonyNumber: 3,
    name: 'Autonomous Micro-API Refinery',
    tagline: 'From Raw Code Snippet to Commercial Containerized REST/FastAPI Micro-Service',
    description: 'Synthesizes clean FastAPI and Express micro-services from repository functions with automated Pydantic validation, OpenAPI 3.0 specs, Dockerfiles, and quotas.',
    category: 'Refinery & Code Production',
    icon: 'Terminal',
    accentColor: '#00D4FF',
    revenueModel: 'Pay-per-Call Metered API Gateway ($0.002 - $0.005/req)',
    primaryMetricLabel: 'Active Micro-APIs',
    primaryMetricValue: '12 Live Clusters',
    agentRole: 'Micro-API Architect & Test Synthesis Swarm',
    pipelineStage: 'REFINERY & TESTING',
    actions: ['Synthesize FastAPI Service', 'Generate Docker Container', 'Run Sandboxed Tests']
  },
  {
    id: 'demand_hunter',
    colonyNumber: 4,
    name: 'Global Software Demand Hunter',
    tagline: 'Real-Time Enterprise RFP, Bounty & Developer Swarm Needs Radar',
    description: 'Crawls verified enterprise RFPs, Upwork high-ticket opportunities, and GitHub issues to match real paying customer needs with existing developer repositories.',
    category: 'Marketplace & Commercial',
    icon: 'TrendingUp',
    accentColor: '#FFD700',
    revenueModel: 'Direct Contract Matchmaking & Retainer Conversion',
    primaryMetricLabel: 'Matched Demand',
    primaryMetricValue: '$5,150 RFP Pool',
    agentRole: 'Demand Signal Hunter',
    pipelineStage: 'CUSTOMER DEMAND MATCH',
    actions: ['Discover High-Ticket RFPs', 'Match with Internal Repos', 'Estimate Project Scope']
  },
  {
    id: 'bounty_swarm',
    colonyNumber: 5,
    name: 'Bounty Hunter & Engineering Swarm',
    tagline: 'Autonomous GitHub Issue Triage, Surgical Patch Synthesis & Test Verification',
    description: 'Locates funded open-source cash bounties on GitHub, generates clean minimal surgical bug fixes with unit tests, and formats reviewable draft PRs with human approval.',
    category: 'Refinery & Code Production',
    icon: 'GitPullRequest',
    accentColor: '#F97316',
    revenueModel: 'Funded GitHub Bug Bounty Rewards ($200 - $1,500/issue)',
    primaryMetricLabel: 'Bounties Claimed',
    primaryMetricValue: '19 Settled ($8.2k)',
    agentRole: 'Bounty Matchmaker & Patch Synthesis Agent',
    pipelineStage: 'TESTING & HUMAN APPROVAL',
    actions: ['Inspect Active Bounties', 'Synthesize Surgical Patch', 'Submit Draft PR']
  },
  {
    id: 'code_revival',
    colonyNumber: 6,
    name: 'Code Revival & Modernization Engine',
    tagline: 'Legacy Codebase Transformation into Modern Async Micro-SaaS',
    description: 'Upgrades neglected Python 2/Flask, PHP 5, and raw script repositories into modern async FastAPI/Next.js/Docker architectures ready for commercial monetization.',
    category: 'Refinery & Code Production',
    icon: 'RefreshCw',
    accentColor: '#EC4899',
    revenueModel: 'Modernized SaaS Turnkey Licenses',
    primaryMetricLabel: 'Revived Repos',
    primaryMetricValue: '8 Modernized',
    agentRole: 'Modernization & Revival Agent',
    pipelineStage: 'REFINERY',
    actions: ['Analyze Legacy Tech Debt', 'Execute Modernization Pipeline', 'Export Docker Package']
  },
  {
    id: 'smart_contract_factory',
    colonyNumber: 7,
    name: 'Smart Contract & DApp Product Factory',
    tagline: 'Slither Static Security Audit, Gas Optimization & Testnet Deployment',
    description: 'Analyzes Solidity contracts, tests reentrancy and arithmetic safety, compiles to Base L2 Sepolia testnet, and packages turnkey audited Web3 smart contract assets.',
    category: 'Refinery & Code Production',
    icon: 'Lock',
    accentColor: '#6366F1',
    revenueModel: 'Pre-Audited Web3 Asset Sales & Royalties',
    primaryMetricLabel: 'Audited Contracts',
    primaryMetricValue: '14 Base L2 Verified',
    agentRole: 'Smart Contract Auditor & Deployer',
    pipelineStage: 'SECURITY REVIEW',
    actions: ['Run Slither Audit', 'Deploy to Base Testnet', 'Export Audited Bytecode']
  },
  {
    id: 'model_lora_forge',
    colonyNumber: 8,
    name: 'AI Model & LoRA Forge',
    tagline: 'GGUF/AWQ 4-Bit Quantization & Ollama Modelfile Packaging',
    description: 'Fine-tunes specialized LoRA weights, quantizes weights into GGUF-Q4_K_M formats, generates Ollama Modelfiles, and binds them to CE Colony V12 distributed GPU nodes.',
    category: 'Enterprise & Infrastructure',
    icon: 'Cpu',
    accentColor: '#8B5CF6',
    revenueModel: 'Specialized Local Inference Token Fees',
    primaryMetricLabel: 'Quantized Models',
    primaryMetricValue: '6 Ollama Ready',
    agentRole: 'LoRA & Quantization Specialist',
    pipelineStage: 'DEPLOYMENT & CE COMPUTE',
    actions: ['Quantize to 4-bit GGUF', 'Generate Ollama Modelfile', 'Bind to CE Colony Node']
  },
  {
    id: 'licensing_exchange',
    colonyNumber: 9,
    name: 'Developer Asset Licensing Exchange',
    tagline: 'Commercial IP Rights, White-Label Licenses & Paystack Checkout',
    description: 'Marketplace for enterprise developers to license verified code libraries, micro-APIs, and templates with clear legal rights, refund policies, and 70/30 developer splits.',
    category: 'Marketplace & Commercial',
    icon: 'DollarSign',
    accentColor: '#10B981',
    revenueModel: 'Direct Commercial Software Licenses ($99 - $999/seat)',
    primaryMetricLabel: 'Exchange Volume',
    primaryMetricValue: '$10,375 Gross',
    agentRole: 'Pricing & Licensing Optimizer',
    pipelineStage: 'CUSTOMER & PAYMENT',
    actions: ['Browse Licensed Assets', 'Buy Commercial License', 'Download Signed Archive']
  },
  {
    id: 'microsaas_factory',
    colonyNumber: 10,
    name: 'Micro-SaaS & Plugin Factory',
    tagline: 'Independent Web Apps, Browser Extensions & Automation Bots',
    description: 'Packages standalone developer utilities into subscription products (Chrome extensions, WhatsApp bots, Figma plugins) with working live demos and payment links.',
    category: 'Refinery & Code Production',
    icon: 'Boxes',
    accentColor: '#14B8A6',
    revenueModel: 'Monthly Recurring Revenue (MRR) Subscriptions',
    primaryMetricLabel: 'Active Micro-SaaS',
    primaryMetricValue: '$1,310 MRR',
    agentRole: 'Micro-SaaS Packaging Agent',
    pipelineStage: 'PRODUCT PACKAGING',
    actions: ['Inspect Micro-SaaS Demos', 'Export Distribution Bundle', 'Configure Stripe/Paystack']
  },
  {
    id: 'api_gateway',
    colonyNumber: 11,
    name: 'API Gateway & Usage Revenue Engine',
    tagline: 'Cryptographic API Key Management, Rate Quotas & Metered Cent Settlement',
    description: 'High-performance reverse proxy that meters live customer traffic, enforces rate tiers (Developer, Growth, Enterprise), and guarantees idempotent accounting.',
    category: 'Enterprise & Infrastructure',
    icon: 'Key',
    accentColor: '#3B82F6',
    revenueModel: 'Metered Usage Ledger (70% Developer / 30% Platform)',
    primaryMetricLabel: 'ApiCalls Metered',
    primaryMetricValue: '1.42M Calls',
    agentRole: 'API Gateway & Metering Sentinel',
    pipelineStage: 'DEPLOYMENT & BILLING',
    actions: ['Generate API Key', 'Inspect Tenant Traffic', 'Review Rate Quotas']
  },
  {
    id: 'client_hunter',
    colonyNumber: 12,
    name: 'Software Customer & Client Hunter',
    tagline: 'B2B Lead Discovery, Pain-Point Extraction & Tailored Proposal Synthesis',
    description: 'Identifies enterprise businesses in logistics, finance, and commerce needing software automation, drafts executive proposals, and tracks deal progression.',
    category: 'Marketplace & Commercial',
    icon: 'Users',
    accentColor: '#EAB308',
    revenueModel: 'Enterprise Retainers & Integration Bounties',
    primaryMetricLabel: 'Active Pipeline',
    primaryMetricValue: '$9,200 Potential',
    agentRole: 'Client Acquisition & Outreach Agent',
    pipelineStage: 'CUSTOMER OUTREACH',
    actions: ['Scan B2B Leads', 'Generate Executive Proposal', 'Track CRM Pipeline']
  },
  {
    id: 'ce_compute_bridge',
    colonyNumber: 13,
    name: 'CE COLONY Compute Bridge',
    tagline: 'Direct Integration with UA-AIDC CE Colony V12 Distributed Hardware Nodes',
    description: 'Dispatches model quantization, container compilation, and heavy load tests to registered CE Colony technician nodes with strict thermal limits and sandboxing.',
    category: 'Enterprise & Infrastructure',
    icon: 'Server',
    accentColor: '#00FF88',
    revenueModel: 'Bilateral Compute Settlement with CE Hardware Nodes',
    primaryMetricLabel: 'Bridged Compute',
    primaryMetricValue: '48.5 TFLOPS Active',
    agentRole: 'Distributed Compute Orchestrator',
    pipelineStage: 'CE HARDWARE COMPUTE',
    actions: ['Dispatch to CE GPU Node', 'Monitor Thermal Safeguards', 'Verify Compute Proof']
  },
  {
    id: 'portfolio_manager',
    colonyNumber: 14,
    name: 'Autonomous Software Portfolio Manager',
    tagline: 'Developer Asset Catalog, Sales Velocity & Real-Time Net Earnings HUD',
    description: 'Aggregates all active code products, micro-APIs, bounties, and micro-SaaS subscriptions owned by the developer into a unified wealth statement with transparent metrics.',
    category: 'Marketplace & Commercial',
    icon: 'Layers',
    accentColor: '#A855F7',
    revenueModel: 'Portfolio Valuation & Asset Management',
    primaryMetricLabel: 'Net Wealth Accrued',
    primaryMetricValue: '$17,395 USD',
    agentRole: 'Portfolio & Wealth Strategist',
    pipelineStage: 'DEVELOPER REVENUE',
    actions: ['Review Asset Portfolio', 'Inspect Net Earnings Split', 'Export Tax Statement']
  },
  {
    id: 'wealth_intelligence',
    colonyNumber: 15,
    name: 'Developer Opportunity & Wealth Intelligence',
    tagline: 'AI Synthesis of High-ROI Asset Conversions with Confidence Probabilities',
    description: 'Analyzes global software marketplace signals and provides evidence-backed recommendations on which repositories to convert into micro-APIs or pitch to clients.',
    category: 'Intelligence & Audit',
    icon: 'Sparkles',
    accentColor: '#FFD700',
    revenueModel: 'Strategic Optimization & Opportunity Sourcing',
    primaryMetricLabel: 'Top Opportunities',
    primaryMetricValue: '4 High ROI',
    agentRole: 'Portfolio & Wealth Strategist',
    pipelineStage: 'REVENUE STRATEGY',
    actions: ['Evaluate Market Opportunities', 'Simulate ROI Models', 'Trigger Autonomous Conversion']
  }
];

export const PIPELINE_STAGES = [
  { id: 'source', name: 'AUTHORIZED SOURCE', description: 'GitHub / GitLab Repositories & Local Assets' },
  { id: 'dna', name: 'CODE DNA & PROVENANCE', description: 'License Audits & Author Attribution' },
  { id: 'security', name: 'SECURITY REVIEW', description: 'Zero-Leak Quarantining & Static Analysis' },
  { id: 'refinery', name: 'REFINERY & PRODUCTION', description: 'FastAPI/Express Synthesis & Docker Packaging' },
  { id: 'testing', name: 'TESTING & SIMULATION', description: 'Automated Pytest/Jest Suites & Edge Checks' },
  { id: 'approval', name: 'HUMAN APPROVAL', description: 'Mandatory Consent for PRs, Deploys & Payouts' },
  { id: 'deployment', name: 'DEPLOYMENT & GATEWAY', description: 'Kubernetes Containers & API Gateway Keys' },
  { id: 'customer', name: 'CUSTOMER & DEMAND', description: 'RFPs, Enterprise Clients & Marketplace' },
  { id: 'payment', name: 'PAYMENT & SETTLEMENT', description: 'Paystack Gateway & 70/30 Ledger' },
  { id: 'revenue', name: 'DEVELOPER REVENUE', description: 'Direct NGN / USD Bank Settlement' }
];
