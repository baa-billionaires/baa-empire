import { GenesisModuleId, GenesisLifecycleStage } from '../types/mindHiveGenesis';

export interface GenesisModuleMetadata {
  id: GenesisModuleId;
  codeLetter: string;
  name: string;
  subtitle: string;
  tagline: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  heroImage: string;
  icon: string;
  description: string;
  capabilities: string[];
  evidenceRules: string[];
  targetColonies: string[];
  metricsPreview: { label: string; value: string };
}

export const GENESIS_MODULES_METADATA: Record<GenesisModuleId, GenesisModuleMetadata> = {
  oracle_colony: {
    id: 'oracle_colony',
    codeLetter: 'A',
    name: 'MODULE A — ORACLE COLONY',
    subtitle: 'Autonomous Problem & Demand Intelligence',
    tagline: 'Discovering emerging problems from authorized sources without ever presenting predictions as confirmed demand.',
    badge: 'DEMAND-FIRST',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    icon: 'Radio',
    description: 'Crawls authorized enterprise tenders, verified customer feedback, GitHub trend spikes, and regional service gaps. Matches needs with UA-AIDC colony capabilities with confidence and uncertainty scoring.',
    capabilities: [
      'Authorized tender and RFP parser: flags requirements matching CE, Code Vein, and Aurum capabilities',
      'Regional service gap mapper: isolates high-margin infrastructure deficiencies in emerging markets',
      'Confidence & Uncertainty calibration: mathematically separates signal strength from predictive ambiguity',
      'Demand-first validation gate: blocks development budgets before customer problem interviews occur'
    ],
    evidenceRules: [
      'Predictions are never labeled as confirmed customer commitments',
      'All demand signals require verifiable URLs or authenticated customer RFP identifiers'
    ],
    targetColonies: ['CE_COLONY_V12', 'CODE_VEIN_V13', 'AURUM_COLONY_V13'],
    metricsPreview: { label: 'Tracked Market Signals', value: '42 Tenders' }
  },
  evolution_lab: {
    id: 'evolution_lab',
    codeLetter: 'B',
    name: 'MODULE B — EVOLUTION LAB',
    subtitle: 'Controlled Prototype & A/B Experimentation',
    tagline: 'Competing product variations tested with real metrics, rollbacks and evaluation-backed improvements.',
    badge: 'CONTINUOUS A/B',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',
    icon: 'GitBranch',
    description: 'Runs controlled experiments comparing competing product prototypes. Measures reliability, feedback, retention, latency, and cost per task. Preserves full version history with instant rollback.',
    capabilities: [
      'Multi-variant product benchmarking: tests differing prompt pipelines, pricing tiers, and inference models',
      'Immutable version tree: maintains rollbacks for every micro-service, contract, and workflow',
      'Multi-dimensional scoring: evaluates reliability, customer retention, cost-to-serve, and revenue delta',
      'Anti-slop constraint: rejects updates that only optimize simulated metrics without real user verification'
    ],
    evidenceRules: [
      'Recommendations only trigger when supported by statistically significant evaluation',
      'Never optimize solely for simulated or hypothetical market metrics'
    ],
    targetColonies: ['CODE_VEIN_V13', 'CE_COLONY_V12'],
    metricsPreview: { label: 'Conducted Experiments', value: '118 Runs' }
  },
  symbiosis_colony: {
    id: 'symbiosis_colony',
    codeLetter: 'C',
    name: 'MODULE C — SYMBIOSIS COLONY',
    subtitle: 'Cross-Industry Invention & Compatibility Engine',
    tagline: 'Combining APIs, hardware, models and services across colonies with strict rights attribution.',
    badge: 'COLONY FUSION',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    icon: 'Network',
    description: 'Builds dependency and compatibility graphs across disparate software assets. Unlocks cross-industry combinations (e.g. Voice AI + Logistics + Payment Rails) while preserving contributor rights and royalty terms.',
    capabilities: [
      'Automated compatibility matrix: verifies API schema schemas, network latencies, and data formats',
      'Cross-industry synergy detector: matches agricultural IoT, computer vision, and healthcare diagnostics',
      'Fair-share revenue composer: drafts mathematically binding 70/30 contributor splits before deployment',
      'Zero-erasure preservation: ensures fused ventures never overwrite original parent attribution'
    ],
    evidenceRules: [
      'Never merge assets without verified cryptographic rights or explicit contributor consent',
      'All source assets retain independent lineage in the Provenance Vault'
    ],
    targetColonies: ['CE_COLONY_V12', 'CODE_VEIN_V13', 'AURUM_COLONY_V13', 'MIND_HIVE_V17'],
    metricsPreview: { label: 'Active Fused Ventures', value: '3 Swarms' }
  },
  mirrorverse: {
    id: 'mirrorverse',
    codeLetter: 'D',
    name: 'MODULE D — MIRRORVERSE',
    subtitle: 'Digital Twin Simulation & Stress Chambers',
    tagline: 'Testing user journeys, failovers, dynamic pricing and infrastructure costs in sandbox twins.',
    badge: 'DIGITAL TWIN',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    icon: 'Maximize2',
    description: 'Generates full synthetic digital twins of proposed products and operational environments. Simulates user concurrency, network partitions, cloud compute cost spikes, and pricing sensitivity before real-world capital deployment.',
    capabilities: [
      'Synthetic user agent swarms: simulates 1,000 to 50,000 concurrent user sessions with stochastic behavior',
      'Infra cost forecaster: models GPU inference costs and database scaling against projected subscription fees',
      'Chaos monkey stress testing: injects simulated API outages and tests automated fallback routes',
      'Clear simulation labeling: strictly isolates simulated figures from audited production revenue'
    ],
    evidenceRules: [
      'Every simulation output is watermarked as SYNTHETIC_DIGITAL_TWIN',
      'Simulation outcomes serve only as prioritization gates for physical real-world pilot tests'
    ],
    targetColonies: ['CE_COLONY_V12', 'CODE_VEIN_V13'],
    metricsPreview: { label: 'Simulations Executed', value: '38 Twins' }
  },
  nexus_memory: {
    id: 'nexus_memory',
    codeLetter: 'E',
    name: 'MODULE E — NEXUS MEMORY',
    subtitle: 'Shared Searchable Intelligence Archive',
    tagline: 'Preserving reusable architectures, workflows, post-mortems and technical blueprints.',
    badge: 'COLLECTIVE MEMORY',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    icon: 'Database',
    description: 'Searchable knowledge repository storing architectures, evaluation results, regulatory compliance blueprints, and post-mortems from both successful and failed ventures to accelerate future creation cycles.',
    capabilities: [
      'Cross-venture knowledge retrieval: semantic search across prompt pipelines, schemas, and contracts',
      'Post-mortem failure indexing: catalogs why previous prototypes failed to avoid repeating costly mistakes',
      'Privacy & license boundary enforcement: strictly segregates proprietary enterprise client data',
      'Living Venture Genome repository: indexes digital genomes as reusable blueprints for new ventures'
    ],
    evidenceRules: [
      'Private customer data is never trained on or shared without explicit cryptographic authorization',
      'Licensing restrictions travel permanently with archived code components'
    ],
    targetColonies: ['MIND_HIVE_V17', 'CODE_VEIN_V13'],
    metricsPreview: { label: 'Archived Blueprints', value: '240 Assets' }
  },
  swarm_foundry: {
    id: 'swarm_foundry',
    codeLetter: 'F',
    name: 'MODULE F — SWARM FOUNDRY',
    subtitle: 'Ephemeral Task-Specific Specialist Agent Factory',
    tagline: 'Spawning task-specific agents with budgets, credentials, permissions and automated retirement.',
    badge: 'EPHEMERAL AGENTS',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    icon: 'Bot',
    description: 'Dynamically creates temporary specialist agents when complex new tasks demand specialized domain expertise. Assigns scoped budgets, GPU hour allocations, and tool permissions, and revokes credentials upon task completion.',
    capabilities: [
      'Autonomous role synthesis: generates tailored system prompts and tool bindings for specific tasks',
      'Strict compute & spending caps: enforces hard GPU hour limits and dollar-denominated spending thresholds',
      'Credential auto-revocation: terminates API keys and database access upon project milestone sign-off',
      'Compute consumption telemetry: records exact kilowatt/GPU seconds consumed against task outcomes'
    ],
    evidenceRules: [
      'Newly spawned agents undergo sandboxed evaluation before receiving expanded network tools',
      'Unneeded agents are promptly retired to prevent stranded compute expenditure'
    ],
    targetColonies: ['CE_COLONY_V12', 'MIND_HIVE_V17'],
    metricsPreview: { label: 'Active Specialists', value: '16 Running' }
  },
  provenance_vault: {
    id: 'provenance_vault',
    codeLetter: 'G',
    name: 'MODULE G — PROVENANCE VAULT',
    subtitle: 'Cryptographic Attribution, Lineage & Royalties',
    tagline: 'Immutable invention ownership, parent-child lineages, contributor consent and royalty splits.',
    badge: 'VERIFIED LINEAGE',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
    icon: 'ShieldCheck',
    description: 'Maintains cryptographically signed records of original submissions, code contributions, dataset licenses, and royalty agreements. Tracks parent-child and merged venture lineages to guarantee transparent compensation.',
    capabilities: [
      'EIP-712 cryptographic signature stamping: binds human contributors to their idea submissions',
      'Parent-Child-Fusion lineage graph: tracks which venture originated from which predecessor assets',
      'Royalty reconciliation ledger: calculates 70/30 distribution across multi-contributor ventures',
      'Dispute resolution registry: holds disputed royalties in escrow pending human legal arbitration'
    ],
    evidenceRules: [
      'AI generation or parent-child hierarchy does not automatically grant sole ownership',
      'All commercial distributions require cryptographic signature verification'
    ],
    targetColonies: ['AURUM_COLONY_V13', 'MIND_HIVE_V17'],
    metricsPreview: { label: 'Attributed Records', value: '100% Signed' }
  },
  empire_exchange: {
    id: 'empire_exchange',
    codeLetter: 'H',
    name: 'MODULE H — EMPIRE EXCHANGE',
    subtitle: 'Approved Venture, API & Licensing Marketplace',
    tagline: 'Marketplace for verified software products, APIs, licenses and venture acquisitions.',
    badge: '70/30 PAYSTACK',
    accentColor: '#EAB308',
    glowColor: 'rgba(234, 179, 8, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    icon: 'TrendingUp',
    description: 'Commercial marketplace where validated ventures, micro-APIs, and digital software assets are licensed, commissioned, or acquired with automated milestone escrow and Paystack direct bank payouts.',
    capabilities: [
      'Comprehensive due-diligence dossiers: displays audited code health, customer evidence, and revenue',
      'Milestone payment escrow: funds release only upon confirmed customer acceptance testing',
      'Dual-currency settlement: prices assets in USD with instant NGN bank settlement via Paystack',
      'Enforced 70/30 split: 70% direct to inventor/developer, 30% to autonomous infrastructure reserve'
    ],
    evidenceRules: [
      'Unaccepted offers are never reported as completed acquisitions or partnerships',
      'All transactions reconcile against verifiable banking webhooks returning 200 OK'
    ],
    targetColonies: ['CODE_VEIN_V13', 'AURUM_COLONY_V13', 'MIND_HIVE_V17'],
    metricsPreview: { label: 'Total Volume', value: '$87.4K USD' }
  }
};

export interface LifecycleStageMeta {
  stage: GenesisLifecycleStage;
  stageNumber: number;
  label: string;
  shortDesc: string;
  verificationGate: string;
  primaryModule: GenesisModuleId;
}

export const GENESIS_LIFECYCLE_STAGES: LifecycleStageMeta[] = [
  {
    stage: 'DISCOVER',
    stageNumber: 1,
    label: 'DISCOVER',
    shortDesc: 'Scan authorized market RFPs, user feedback, and service gaps.',
    verificationGate: 'Documented problem source & confidence/uncertainty score.',
    primaryModule: 'oracle_colony'
  },
  {
    stage: 'DESIGN',
    stageNumber: 2,
    label: 'DESIGN',
    shortDesc: 'Synthesize architecture, target customers, and unit economics.',
    verificationGate: 'Venture DNA record initialized with defined contributor attribution.',
    primaryModule: 'symbiosis_colony'
  },
  {
    stage: 'ASSEMBLE',
    stageNumber: 3,
    label: 'ASSEMBLE',
    shortDesc: 'Gather APIs from Code Vein, compute from CE Colony, and assets from Aurum.',
    verificationGate: 'Dependency compatibility graph & licensing rights verified clean.',
    primaryModule: 'symbiosis_colony'
  },
  {
    stage: 'SIMULATE',
    stageNumber: 4,
    label: 'SIMULATE',
    shortDesc: 'Execute Mirrorverse digital twin stress tests, failovers, and cost models.',
    verificationGate: 'Break-even projection under 12 months & failure rate under 2%.',
    primaryModule: 'mirrorverse'
  },
  {
    stage: 'VALIDATE',
    stageNumber: 5,
    label: 'VALIDATE',
    shortDesc: 'Interview prospective customers, test pricing, and secure paid LOIs.',
    verificationGate: 'Real customer feedback recorded separate from predictions.',
    primaryModule: 'oracle_colony'
  },
  {
    stage: 'BUILD',
    stageNumber: 6,
    label: 'BUILD',
    shortDesc: 'Spawn specialized Swarm Foundry agents and compile production code.',
    verificationGate: 'Automated test suite passing and compute budget within allocated caps.',
    primaryModule: 'swarm_foundry'
  },
  {
    stage: 'APPROVE',
    stageNumber: 7,
    label: 'APPROVE',
    shortDesc: 'Mandatory human-in-the-loop governance checkpoint for budget & deployment.',
    verificationGate: 'Explicit human authorization click. Zero autonomous fund moves.',
    primaryModule: 'provenance_vault'
  },
  {
    stage: 'LAUNCH',
    stageNumber: 8,
    label: 'LAUNCH',
    shortDesc: 'Deploy to CE Colony nodes and publish to Empire Exchange marketplace.',
    verificationGate: 'Health check 200 OK & live payment gateway verification.',
    primaryModule: 'empire_exchange'
  },
  {
    stage: 'MEASURE',
    stageNumber: 9,
    label: 'MEASURE',
    shortDesc: 'Continuously track audited commercial revenue, compute costs, and uptime.',
    verificationGate: 'Mathematical reconciliation of bank receipts and 70/30 ledger splits.',
    primaryModule: 'empire_exchange'
  },
  {
    stage: 'EVOLVE',
    stageNumber: 10,
    label: 'EVOLVE',
    shortDesc: 'Conduct Evolution Lab A/B tests, fusion proposals, or business resurrection.',
    verificationGate: 'Evidence-backed metric improvements before code promotion.',
    primaryModule: 'evolution_lab'
  }
];

export const GENESIS_CONSTITUTIONAL_RULES = [
  {
    title: 'Separation of Predictions from Confirmed Demand',
    desc: 'The Oracle Colony forecasts market opportunities with explicit confidence and uncertainty scores. The system never presents automated predictions as signed customer demand.'
  },
  {
    title: 'Mandatory Demand-First Validation',
    desc: 'Before significant compute or development capital is deployed, ventures must gather real prospect feedback, pilot agreements, or paid letters of intent. We never fabricate customers, contracts, or revenue.'
  },
  {
    title: 'Synthetic Twin Separation in Mirrorverse',
    desc: 'All simulation chambers and digital twin outcomes are strictly labeled as SYNTHETIC. Simulations guide experimentation priority but never substitute for real production evidence.'
  },
  {
    title: 'Uncompromised Contributor Provenance & Lineage',
    desc: 'Original idea submitters, engineers, and colony contributors retain permanent cryptographic attribution in the Provenance Vault. Fusions create new venture identities without erasing parent rights.'
  },
  {
    title: 'Strict Human-in-the-Loop Governance Gate',
    desc: 'Stage 7 requires explicit human consent for any capital expenditure, live deployment, business acquisition, or financial payout. Emergency kill switches are instantly accessible.'
  },
  {
    title: 'Mathematical 70/30 Settlement via Paystack',
    desc: '70% of verified commercial revenues flow directly to inventors and participating engineers; 30% fuels autonomous infrastructure compute. All fiat payouts verify via Paystack 200 OK webhooks.'
  }
];
