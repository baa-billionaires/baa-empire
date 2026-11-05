import { AurumColonyId } from '../types/aurum';

export interface ColonyMetadata {
  id: AurumColonyId;
  numericCode: string;
  name: string;
  subtitle: string;
  tagline: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  heroImage: string;
  icon: string;
  description: string;
  keyFeatures: string[];
  revenueMechanisms: string[];
  agentIds: string[];
  supportedChains: string[];
  metricsPreview: { label: string; value: string };
}

export const AURUM_COLONIES_METADATA: Record<AurumColonyId, ColonyMetadata> = {
  dust_furnace: {
    id: 'dust_furnace',
    numericCode: '01',
    name: 'DUST FURNACE COLONY',
    subtitle: 'Autonomous Dust Sweeper & Consolidator',
    tagline: 'Sweeping micro-balances, eliminating stranded capital, calculating profitability with precision.',
    badge: 'FEE-ARBITRAGED',
    accentColor: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=80',
    icon: 'Flame',
    description: 'Scans connected EVM and Solana wallets for micro-balances under $50. Calculates real gas fees vs asset value, rejecting uneconomic swaps and packaging profitable batch transactions.',
    keyFeatures: [
      'Multi-chain micro-balance discovery across Ethereum, Base, BSC, Polygon & Solana',
      'Gas-versus-value threshold engine: blocks trades where gas > 30% of recovered value',
      'Batch-transaction optimizer: consolidates 5-20 dust tokens into USDC/ETH via Multicall3',
      'Anti-dust phishing shield: flags honeypot dust tokens and malicious approval drainers'
    ],
    revenueMechanisms: [
      '30% platform protocol performance fee on successfully recovered profitable dust',
      'Batch gas optimization rebate shared between client and platform'
    ],
    agentIds: ['ag-dust-scout', 'ag-gas-profit', 'ag-batch-exec'],
    supportedChains: ['Ethereum', 'Base', 'BSC', 'Polygon', 'Solana'],
    metricsPreview: { label: 'Scanned Micro-Assets', value: '318 Tokens' }
  },
  graveyard_resurrection: {
    id: 'graveyard_resurrection',
    numericCode: '02',
    name: 'GRAVEYARD RESURRECTION COLONY',
    subtitle: 'Autonomous Dormant Token Resurrection Engine',
    tagline: 'Turning abandoned contracts into renewed utility, audited and verified.',
    badge: 'SECURITY-AUDITED',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    icon: 'Sparkles',
    description: 'Analyzes dead or illiquid tokens from previous market cycles. Executes static bytecode security audits (Slither AST), verifies mint/burn ownership, and generates executable utility revival blueprints.',
    keyFeatures: [
      'Static bytecode audit: detects honeypots, transfer fees, blacklists, and owner privileges',
      'Community & holder distribution analyzer: verifies dormant wallet concentration',
      'Utility blueprint generation: creates micro-staking, fee-discount, and utility roadmaps',
      'Automated migration packager: produces audited upgrade contracts with verifiable timelocks'
    ],
    revenueMechanisms: [
      'Token revival engineering and security audit retainer ($1,500 - $10,000 USD)',
      '10% ongoing share of secondary utility transaction fees upon revival'
    ],
    agentIds: ['ag-contract-audit', 'ag-utility-arch', 'ag-liquidity-rebuild'],
    supportedChains: ['Ethereum', 'Base', 'BSC', 'Polygon'],
    metricsPreview: { label: 'Audited Dormant Assets', value: '47 Contracts' }
  },
  nft_landfill: {
    id: 'nft_landfill',
    numericCode: '03',
    name: 'NFT LANDFILL COLONY',
    subtitle: 'Autonomous NFT Utility & Liquidity Refinery',
    tagline: 'Restoring forgotten collections, commercializing IP, enabling zero-collateral rentals.',
    badge: 'ERC-4907 READY',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
    icon: 'Layers',
    description: 'Refurbishes unsold, illiquid, or broken NFT collections. Verifies metadata persistence on IPFS/Arweave, extracts commercial IP rights, and lists assets on the autonomous ERC-4907 rental market.',
    keyFeatures: [
      'Metadata healing engine: fixes broken IPFS gateways and pins artwork redundantly',
      'Commercial copyright extraction: determines whether holder owns commercial usage rights',
      'ERC-4907 dual-role rental engine: user rents utility without transferring asset ownership',
      'Fractionalization blueprint generator: prepares verified ERC-20 staking vaults'
    ],
    revenueMechanisms: [
      '15% commission on peer-to-peer NFT daily utility rentals (Paystack or crypto)',
      'IP licensing facilitation fees for metaverse, gaming, and brand integration'
    ],
    agentIds: ['ag-meta-restore', 'ag-rights-extract', 'ag-rental-broker'],
    supportedChains: ['Ethereum', 'Base', 'Solana', 'Polygon'],
    metricsPreview: { label: 'Refined NFT Inventories', value: '68 Collections' }
  },
  token_foundry: {
    id: 'token_foundry',
    numericCode: '04',
    name: 'TOKEN FOUNDRY COLONY',
    subtitle: 'Autonomous Token Engineering & Launch Refinery',
    tagline: 'Mathematically sound tokenomics, OpenZeppelin security, transparent vesting.',
    badge: 'OPENZEPPELIN V5',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80',
    icon: 'Cpu',
    description: 'Autonomous token factory that designs mathematical supply models, deflationary mechanics, multi-sig vesting schedules, and compiles audited Solidity contracts ready for Base L2 or Polygon deployment.',
    keyFeatures: [
      'Algorithmic tokenomics builder: calculates inflation curves, staking yields, and market depth',
      'Production Solidity code generator: implements OpenZeppelin ERC-20, Votes, and Timelock',
      'Vesting schedule manager: linear streams or quarterly cliff smart contracts',
      'Anti-bot & anti-whale limits: protects public liquidity events with hard transaction limits'
    ],
    revenueMechanisms: [
      'Foundry deployment & verification service fee (₦750,000 - ₦3,500,000 NGN via Paystack)',
      '2% reserved protocol token allocation for sovereign autonomous treasury'
    ],
    agentIds: ['ag-tokenomics', 'ag-contract-compile', 'ag-vesting-guard'],
    supportedChains: ['Base', 'Ethereum', 'Polygon', 'BSC'],
    metricsPreview: { label: 'Deployed Projects', value: '9 Tokens' }
  },
  asset_exchange: {
    id: 'asset_exchange',
    numericCode: '05',
    name: 'ASSET EXCHANGE COLONY',
    subtitle: 'Autonomous Secondary Digital Asset Exchange',
    tagline: 'Peer-to-peer verified marketplace for dormant crypto assets and OTC blocks.',
    badge: 'ESCROW PROTECTED',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    icon: 'ArrowLeftRight',
    description: 'Decentralized secondary exchange where verified dormant tokens, NFT bundles, and intellectual property licenses are traded peer-to-peer with automated escrow and instant fiat payouts via Paystack.',
    keyFeatures: [
      'Zero-custody escrow: smart contracts hold assets until payment or on-chain settlement verifies',
      'Liquidity-discounted valuation model: prices illiquid tokens based on real order book depth',
      'Multi-currency settlement: supports USDC, USDT, ETH, and direct NGN bank transfer',
      'Transparent 70/30 earnings split automatically enforced on all marketplace deals'
    ],
    revenueMechanisms: [
      '30% platform commission on secondary marketplace OTC settlements',
      'Escrow facilitation and dispute mediation micro-fees'
    ],
    agentIds: ['ag-escrow-arb', 'ag-valuation-mod', 'ag-settlement-audit'],
    supportedChains: ['Base', 'Ethereum', 'BSC', 'Polygon', 'Solana'],
    metricsPreview: { label: 'OTC Settlements', value: '$6,500 Gross' }
  },
  defi_yield_risk: {
    id: 'defi_yield_risk',
    numericCode: '06',
    name: 'DEFI YIELD & RISK COLONY',
    subtitle: 'Autonomous DeFi Risk & Real-Yield Intelligence',
    tagline: 'Filtering out predatory Ponzi tokenomics; isolating mathematically verified real yield.',
    badge: 'REAL YIELD ONLY',
    accentColor: '#00FF88',
    glowColor: 'rgba(0, 255, 136, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?w=800&auto=format&fit=crop&q=80',
    icon: 'TrendingUp',
    description: 'Continuously monitors decentralized money markets and vaults across Base, Polygon, and Ethereum. Distinguishes sustainable borrower-fee yields from hyper-inflationary token incentive traps.',
    keyFeatures: [
      'Real-yield vs farm-token audit: separates genuine interest revenue from governance dilution',
      'Smart contract safety scoring (A+ to F): evaluates audit history, TVL duration, and timelocks',
      'Impermanent loss simulation: calculates net returns on Uniswap V3 concentrated positions',
      'Liquidation alarm monitor: monitors collateral health factors in real-time'
    ],
    revenueMechanisms: [
      'Autonomous yield optimization performance fee (10% of net yield above benchmark)',
      'Enterprise institutional risk reporting subscriptions'
    ],
    agentIds: ['ag-yield-scout', 'ag-risk-mod', 'ag-protocol-audit'],
    supportedChains: ['Base', 'Polygon', 'Ethereum'],
    metricsPreview: { label: 'Monitored Protocols', value: '18 Vaults' }
  },
  rights_council: {
    id: 'rights_council',
    numericCode: '07',
    name: 'RIGHTS & COMPLIANCE COUNCIL',
    subtitle: 'Autonomous Digital Rights & Compliance Council',
    tagline: 'Strict cryptographic provenance, OFAC sanctions filtering, zero legal liability.',
    badge: 'VERIFIED CUSTODY',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    icon: 'ShieldCheck',
    description: 'Guarantees compliance and ownership authenticity before any asset is commercialized. Enforces OFAC sanctions checks, validates deployer signatures, and provides human-in-the-loop review for disputed claims.',
    keyFeatures: [
      'Cryptographic provenance proof: requires EIP-191 / EIP-712 deployer wallet signatures',
      'OFAC and anti-money laundering screening: blocks wallets associated with illicit flows',
      'Copyright & trademark infringement sentinel: screens digital artwork against known trademarks',
      'Multi-sig legal escalation workflow: routes complex disputes to human compliance officers'
    ],
    revenueMechanisms: [
      'On-chain Rights Verification Certificate issuance fee ($150 - $500 USD)',
      'Escrow compliance clearance stamp for institutional trades'
    ],
    agentIds: ['ag-sanctions-scan', 'ag-custody-verif', 'ag-copyright-sent'],
    supportedChains: ['Ethereum', 'Base', 'Solana', 'Polygon'],
    metricsPreview: { label: 'Verified Cases', value: '100% Passed' }
  },
  demand_hunter: {
    id: 'demand_hunter',
    numericCode: '08',
    name: 'DEMAND HUNTER COLONY',
    subtitle: 'Autonomous Web3 Customer & Buyer Hunter',
    tagline: 'Crawling Web3 ecosystems to find real corporate and protocol buyers with cash.',
    badge: 'ACTIVE OUTREACH',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    icon: 'Target',
    description: 'Autonomous multi-agent crawler that indexes GitHub repos, Web3 job boards, Discord dev servers, and venture ecosystems. Matches verified dormant assets and technical services with paying enterprise clients.',
    keyFeatures: [
      'Demand signal crawler: finds protocols seeking liquidity, NFT utility, or smart contract audits',
      'Automated proposal composer: drafts tailored commercial proposals with pricing & SLA models',
      'Human approval gate: guarantees no email or message is sent without explicit user sign-off',
      'Pipeline tracker: monitors deals from initial lead to closed contract and Paystack settlement'
    ],
    revenueMechanisms: [
      '15% finders commission on closed enterprise Web3 consulting and asset acquisition deals',
      'Direct client retainer payment processing via Paystack'
    ],
    agentIds: ['ag-lead-crawler', 'ag-proposal-draft', 'ag-deal-nego'],
    supportedChains: ['Cross-Chain', 'Web3 Enterprise'],
    metricsPreview: { label: 'Active Pipeline', value: '$37,000 USD' }
  }
};

export interface ValueChainStage {
  stage: number;
  name: string;
  code: string;
  description: string;
  responsibleAgents: string[];
  verificationGate: string;
  statusText: string;
}

export const AURUM_VALUE_CHAIN_STAGES: ValueChainStage[] = [
  {
    stage: 1,
    name: 'WALLET DISCOVERY',
    code: 'DISCOVER',
    description: 'Read-only multi-chain scan of connected public addresses. Identifies tokens, LP positions, NFTs, and micro-balances without accessing private keys.',
    responsibleAgents: ['DustScout Agent', 'YieldScout Agent'],
    verificationGate: 'Read-only public RPC queries only. Zero private key exposure.',
    statusText: '142 Wallets Scanned'
  },
  {
    stage: 2,
    name: 'ASSET VERIFICATION',
    code: 'VERIFY',
    description: 'Checks on-chain balances, token standards (ERC-20, ERC-721, SPL), decimals, and verifies token contract addresses against verified explorer registries.',
    responsibleAgents: ['ContractAuditor Agent', 'MetadataRestorer Agent'],
    verificationGate: 'Verified bytecode existence on Etherscan/Basescan/Solscan.',
    statusText: '365 Assets Verified'
  },
  {
    stage: 3,
    name: 'RISK ASSESSMENT',
    code: 'RISK_EVAL',
    description: 'Evaluates honeypots, transfer fees, liquidity lock duration, and impermanent loss risk. Distinguishes viable assets from valueless or malicious tokens.',
    responsibleAgents: ['GasProfitability Agent', 'RiskModeling Agent'],
    verificationGate: 'Automated Slither AST scan and DEX liquidity pool check.',
    statusText: '47 Tokens Screened'
  },
  {
    stage: 4,
    name: 'RIGHTS CHECK',
    code: 'RIGHTS',
    description: 'Confirms claimant is the legitimate deployer or holder. Executes OFAC sanctions screening and ensures no active trademark or intellectual property violations.',
    responsibleAgents: ['SanctionsScanner Agent', 'CustodyVerifier Agent'],
    verificationGate: 'Cryptographic signature verification & Sanctions list clearance.',
    statusText: '100% OFAC Passed'
  },
  {
    stage: 5,
    name: 'RECOVERY OR REFINEMENT',
    code: 'REFINE',
    description: 'Applies automated engineering: consolidates dust via multicall, restores broken NFT metadata, designs token utility, or fixes broken smart contracts.',
    responsibleAgents: ['UtilityArchitect Agent', 'TokenomicsArchitect Agent'],
    verificationGate: 'OpenZeppelin V5 security baseline testnet simulation.',
    statusText: '68 Assets Refined'
  },
  {
    stage: 6,
    name: 'CUSTOMER DEMAND',
    code: 'DEMAND',
    description: 'Identifies paying buyers, gamers, collectors, or protocols needing the refined asset or engineering service. Drafts customized commercial proposals.',
    responsibleAgents: ['Web3LeadCrawler Agent', 'ProposalDrafter Agent'],
    verificationGate: 'Verified enterprise requirement or active marketplace order book.',
    statusText: '$37K Pipeline Identified'
  },
  {
    stage: 7,
    name: 'APPROVAL GATE',
    code: 'APPROVAL',
    description: 'MANDATORY HUMAN-IN-THE-LOOP CHECKPOINT. Presents simulated gas, fees, counterparty, and expected proceeds for explicit human review and authorization.',
    responsibleAgents: ['DealNegotiator Agent', 'BatchExecution Agent'],
    verificationGate: 'Explicit human button click required. No autonomous fund movements.',
    statusText: '4 Approvals Pending'
  },
  {
    stage: 8,
    name: 'TRANSACTION',
    code: 'TRANSACT',
    description: 'Upon human authorization, broadcasts the transaction to the blockchain or dispatches finalized contracts. Monitors block inclusion and confirmations.',
    responsibleAgents: ['BatchExecution Agent', 'RentalBroker Agent'],
    verificationGate: 'On-chain receipt with confirmed transaction hash.',
    statusText: '38 Transactions Broadcast'
  },
  {
    stage: 9,
    name: 'SETTLEMENT',
    code: 'SETTLE',
    description: 'Escrow settlement executes. Automatically enforces the transparent 70% client net / 30% platform split into the sovereign ledger.',
    responsibleAgents: ['SettlementAuditor Agent', 'EscrowArbitrage Agent'],
    verificationGate: 'Mathematical balance reconciliation against ledger state.',
    statusText: '100% Reconciled'
  },
  {
    stage: 10,
    name: 'VERIFIED REVENUE',
    code: 'REVENUE',
    description: 'Earnings become withdrawable. Engineers can execute Paystack Direct Bank Payouts in NGN or settle in on-chain USDC/ETH.',
    responsibleAgents: ['SettlementAuditor Agent'],
    verificationGate: 'Paystack Test Webhook 200 OK / On-chain receipt verification.',
    statusText: '₦22,611,525 NGN Available'
  }
];

export const AURUM_ETHICAL_RULES = [
  {
    title: 'Zero Private Key Exposure',
    desc: 'AURUM connects exclusively in read-only mode using public RPC endpoints and wallet standards. The platform never asks for, stores, or transmits private keys or seed phrases.'
  },
  {
    title: 'Honest Value Classification',
    desc: 'Assets with zero liquidity or economic recovery barriers are honestly labeled as UNECONOMIC or ZERO LIQUIDITY. AURUM never promises that worthless tokens automatically become money.'
  },
  {
    title: 'Mandatory Human Approval Gate',
    desc: 'No transaction, token deployment, liquidity addition, or outreach email is executed autonomously without explicit human authorization in the UI.'
  },
  {
    title: 'Transparent 70/30 Revenue Split',
    desc: '70% of all recovered asset proceeds, rental fees, and consulting services belong to the client/engineer. 30% powers the autonomous infrastructure grid.'
  },
  {
    title: 'Paystack Test Verification',
    desc: 'All fiat withdrawals and payments are processed and validated via Paystack Test Gateway with full 200 OK webhook audit logging.'
  }
];
