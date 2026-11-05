import { MindHiveGenesisState } from '../types/mindHiveGenesis';

export const INITIAL_GENESIS_STATE: MindHiveGenesisState = {
  version: '17.0.0',
  name: 'BAA Universal Autonomous AI Data Center LAB — MIND HIVE GENESIS V17',
  tagline: 'The Autonomous Venture Creation, Evolution & Colony Fusion Engine · Module 04',
  initializedAt: new Date().toISOString(),
  config: {
    dataDir: '/data',
    paystackMode: 'TEST',
    paystackPublicKey: 'pk_test_microwork_baa_genesis_2026',
    clientSplitPercent: 70,
    platformSplitPercent: 30,
    adminEmail: 'cashscanai@gmail.com',
    ngnExchangeRate: 1500,
    emergencyMasterShutdown: false
  },
  metrics: {
    totalActiveVentures: 6,
    totalGrossCommercialRevenueUsd: 87450.00,
    clientNetEarningsUsd: 61215.00,
    platformNetEarningsUsd: 26235.00,
    totalWithdrawnUsd: 28500.00,
    availableWithdrawableUsd: 32715.00,
    availableWithdrawableNgn: 49072500,
    totalTournamentsCompleted: 4,
    totalFusionsActive: 3,
    resurrectedBusinessesCount: 5,
    totalSimulationsRun: 38,
    activeSwarmAgentsCount: 16,
    pendingApprovalsCount: 3
  },
  ventures: [
    {
      id: 'ven-001',
      name: 'BioGrid Neural Compute',
      codename: 'PROJECT_HELIOS',
      tagline: 'Distributed GPU inference grid for molecular oncology research in developing clinics',
      category: 'HEALTH_AI',
      currentStage: 'LAUNCH',
      originalIdea: 'Harness idle mobile and workstation compute to process cancer biomarker datasets for regional university hospitals.',
      primaryAuthor: 'Dr. Adeyemi Thorne, Lagos Health Lab',
      contributors: [
        { name: 'Dr. Adeyemi Thorne', role: 'Clinical Biomarker Scientist', equityPercent: 45, verifiedDate: '2026-02-14' },
        { name: 'CE Colony Node Swarm #48', role: 'Compute Provisioning', equityPercent: 25, verifiedDate: '2026-03-01' },
        { name: 'Code Vein Bio-API Guild', role: 'Pipeline Optimization', equityPercent: 30, verifiedDate: '2026-03-12' }
      ],
      problemStatement: 'Sub-Saharan oncology centers face 4-week turnaround times waiting for cloud compute clusters in foreign regions.',
      targetCustomers: ['Regional Teaching Hospitals', 'Biotech Laboratories', 'African Genomics Consortium'],
      marketEvidenceSummary: 'Signed letters of intent from 3 diagnostic centers; 120,000 biological sequence runs completed.',
      confidenceScore: 94.5,
      uncertaintyScore: 12.0,
      specSummary: 'FastAPI microservices running on local Ollama clusters orchestrated via Ray with encrypted data sharding.',
      techStack: ['Python 3.11', 'FastAPI', 'Ollama', 'PyTorch Mobile', 'Docker', 'PostgreSQL'],
      requiredApis: ['BioPython', 'PubChem REST', 'Paystack Transfer API', 'Supabase Vector'],
      requiredColonies: ['CE_COLONY_V12', 'CODE_VEIN_V13'],
      computeBudgetMonthlyUsd: 850.00,
      operatingBudgetMonthlyUsd: 600.00,
      totalCapBudgetUsd: 15000.00,
      utilizedBudgetUsd: 8400.00,
      ipStatus: 'VERIFIED_CLEAN',
      childVentureIds: [],
      fusionComponentIds: ['comp-01', 'comp-02'],
      validationState: {
        interviewsCompleted: 24,
        pilotCommitmentsCount: 3,
        paidLetterOfIntentUsd: 18500.00,
        validatedCustomerSegments: ['Private Pathology Centers', 'Clinical Research Organizations'],
        evidenceNotes: 'Pilots actively running with 99.4% sequence fidelity.'
      },
      financials: {
        grossRevenueUsd: 34500.00,
        netClientShareUsd: 24150.00,
        platformShareUsd: 10350.00,
        monthlyRecurringRevenueUsd: 7200.00,
        activeUsersCount: 14,
        isProfitable: true
      },
      riskLevel: 'LOW',
      securityChecksPassed: true,
      emergencyKillSwitchActive: false,
      createdAt: '2026-02-15T08:30:00.000Z',
      updatedAt: '2026-04-18T14:10:00.000Z'
    },
    {
      id: 'ven-002',
      name: 'OmniFreight Voice Logistics',
      codename: 'PROJECT_HERMES',
      tagline: 'Multi-lingual voice AI orchestrating informal haulage truckers across West Africa',
      category: 'ROBOTICS_LOGISTICS',
      currentStage: 'BUILD',
      originalIdea: 'Audio-first dispatch agent conversing in Pidgin, Hausa, Yoruba and French to eliminate deadhead mileage.',
      primaryAuthor: 'Musa Abubakar & Transport Syndicate',
      contributors: [
        { name: 'Musa Abubakar', role: 'Freight Coordinator', equityPercent: 50, verifiedDate: '2026-03-02' },
        { name: 'Mind Hive Swarm Engineers', role: 'Real-Time Audio Model', equityPercent: 50, verifiedDate: '2026-03-15' }
      ],
      problemStatement: 'Over 65% of interstate trucks return empty due to lack of digital dispatch systems accessible to non-typist drivers.',
      targetCustomers: ['Interstate Logistics Syndicates', 'Agricultural Wholesalers', 'Fast-Moving Consumer Goods Distributors'],
      marketEvidenceSummary: 'Tested with 180 long-haul drivers across the Lagos-Kano corridor; 82% reported weekly booking acceleration.',
      confidenceScore: 89.0,
      uncertaintyScore: 18.5,
      specSummary: 'Twilio Voice + Deepgram audio transcription feeding Gemini Flash Live API with automated Paystack bank escrow.',
      techStack: ['Node.js', 'WebSockets', 'Whisper ASR', 'FastAPI', 'Paystack Transfer'],
      requiredApis: ['Twilio Voice', 'Google Maps Distance Matrix', 'Paystack Splits'],
      requiredColonies: ['CODE_VEIN_V13', 'MIND_HIVE_V17'],
      computeBudgetMonthlyUsd: 420.00,
      operatingBudgetMonthlyUsd: 350.00,
      totalCapBudgetUsd: 10000.00,
      utilizedBudgetUsd: 4200.00,
      ipStatus: 'PROVISIONAL_FILED',
      childVentureIds: [],
      fusionComponentIds: ['comp-03', 'comp-04'],
      validationState: {
        interviewsCompleted: 45,
        pilotCommitmentsCount: 8,
        paidLetterOfIntentUsd: 12000.00,
        validatedCustomerSegments: ['Grain Wholesalers', 'Dry Cargo Fleet Owners'],
        evidenceNotes: 'Demonstrated reduction in dispatch time from 18 hours to 4 minutes.'
      },
      financials: {
        grossRevenueUsd: 21800.00,
        netClientShareUsd: 15260.00,
        platformShareUsd: 6540.00,
        monthlyRecurringRevenueUsd: 4800.00,
        activeUsersCount: 180,
        isProfitable: true
      },
      riskLevel: 'MEDIUM',
      securityChecksPassed: true,
      emergencyKillSwitchActive: false,
      createdAt: '2026-03-01T10:00:00.000Z',
      updatedAt: '2026-04-19T11:45:00.000Z'
    },
    {
      id: 'ven-003',
      name: 'VaultSentry ERC-4907 Utility Broker',
      codename: 'PROJECT_AEGIS',
      tagline: 'Zero-collateral daily NFT utility rental protocol for Web3 gaming guilds',
      category: 'FINTECH_RAILS',
      currentStage: 'MEASURE',
      originalIdea: 'Allow holders of dormant gaming assets to lease utility without transferring token ownership.',
      primaryAuthor: 'Aurum Colony Guild & Devansh Ahuja',
      contributors: [
        { name: 'Aurum Colony V13', role: 'Smart Contract Architecture', equityPercent: 60, verifiedDate: '2026-03-20' },
        { name: 'Gaming Guild Alliance', role: 'Liquidity & Players', equityPercent: 40, verifiedDate: '2026-03-25' }
      ],
      problemStatement: 'Millions of dollars in Web3 gaming assets sit dormant while new players cannot afford upfront NFT purchase prices.',
      targetCustomers: ['Esports Gaming Guilds', 'Virtual World Builders', 'NFT Collectors'],
      marketEvidenceSummary: '1,420 daily active leases executed; zero collateral defaults through dual-role ERC-4907 standard.',
      confidenceScore: 96.0,
      uncertaintyScore: 8.0,
      specSummary: 'OpenZeppelin ERC-4907 deployed on Base L2 with automated fiat on-ramp via Paystack.',
      techStack: ['Solidity', 'Base L2', 'Hardhat', 'React', 'Ethers.js'],
      requiredApis: ['Basescan API', 'Paystack Checkout', 'The Graph Subgraph'],
      requiredColonies: ['AURUM_COLONY_V13', 'CODE_VEIN_V13'],
      computeBudgetMonthlyUsd: 150.00,
      operatingBudgetMonthlyUsd: 200.00,
      totalCapBudgetUsd: 8000.00,
      utilizedBudgetUsd: 3100.00,
      ipStatus: 'VERIFIED_CLEAN',
      childVentureIds: [],
      fusionComponentIds: ['comp-05'],
      validationState: {
        interviewsCompleted: 38,
        pilotCommitmentsCount: 5,
        paidLetterOfIntentUsd: 9500.00,
        validatedCustomerSegments: ['Web3 Gaming Guilds', 'Metaverse Tournaments'],
        evidenceNotes: 'Real player retention measured at 78% after 30-day lease cycle.'
      },
      financials: {
        grossRevenueUsd: 19400.00,
        netClientShareUsd: 13580.00,
        platformShareUsd: 5820.00,
        monthlyRecurringRevenueUsd: 5200.00,
        activeUsersCount: 420,
        isProfitable: true
      },
      riskLevel: 'LOW',
      securityChecksPassed: true,
      emergencyKillSwitchActive: false,
      createdAt: '2026-03-20T12:00:00.000Z',
      updatedAt: '2026-04-20T09:30:00.000Z'
    },
    {
      id: 'ven-004',
      name: 'AgriSense Crop Yield Swarm',
      codename: 'PROJECT_DEMETER',
      tagline: 'Computer vision and local micro-climate forecast node for cooperative farmers',
      category: 'AGRI_SUPPLY',
      currentStage: 'VALIDATE',
      originalIdea: 'Affordable mobile vision app diagnosing crop blight with local weather sensor fusion.',
      primaryAuthor: 'Fatima Sanusi & Agritech Cohort',
      contributors: [
        { name: 'Fatima Sanusi', role: 'Agronomist Lead', equityPercent: 55, verifiedDate: '2026-04-01' },
        { name: 'CE Colony IoT Team', role: 'Sensor Telemetry Nodes', equityPercent: 45, verifiedDate: '2026-04-05' }
      ],
      problemStatement: 'Pest infestations destroy up to 40% of smallholder cassava crops before field agronomists can visit.',
      targetCustomers: ['Cassava Farming Cooperatives', 'Agro-Allied Insurance Underwriters', 'Input Suppliers'],
      marketEvidenceSummary: 'Field tested across 12 farms in Ogun State; identified bacterial blight 14 days before visible leaf wilting.',
      confidenceScore: 88.5,
      uncertaintyScore: 22.0,
      specSummary: 'YOLOv11 nano model quantized for Android offline execution with sync to CE Colony local edge nodes.',
      techStack: ['PyTorch', 'ONNX Runtime', 'React Native', 'SQLite', 'LoRaWAN Gateway'],
      requiredApis: ['OpenWeatherMap API', 'PlantVillage Dataset', 'Paystack Micro-Insurance'],
      requiredColonies: ['CE_COLONY_V12', 'MIND_HIVE_V17'],
      computeBudgetMonthlyUsd: 300.00,
      operatingBudgetMonthlyUsd: 250.00,
      totalCapBudgetUsd: 6500.00,
      utilizedBudgetUsd: 1800.00,
      ipStatus: 'OPEN_SOURCE_APACHE2',
      childVentureIds: [],
      fusionComponentIds: [],
      validationState: {
        interviewsCompleted: 31,
        pilotCommitmentsCount: 2,
        paidLetterOfIntentUsd: 4500.00,
        validatedCustomerSegments: ['Agricultural Cooperatives'],
        evidenceNotes: 'Farmers verified willingness to pay ₦1,500/month for diagnostic alerts.'
      },
      financials: {
        grossRevenueUsd: 4500.00,
        netClientShareUsd: 3150.00,
        platformShareUsd: 1350.00,
        monthlyRecurringRevenueUsd: 1200.00,
        activeUsersCount: 84,
        isProfitable: true
      },
      riskLevel: 'LOW',
      securityChecksPassed: true,
      emergencyKillSwitchActive: false,
      createdAt: '2026-04-01T09:00:00.000Z',
      updatedAt: '2026-04-20T16:00:00.000Z'
    },
    {
      id: 'ven-005',
      name: 'OmniLedger Cross-Border FX Settlement',
      codename: 'PROJECT_NEXUS_FX',
      tagline: 'Automated stablecoin-to-fiat treasury router for Pan-African remote workers',
      category: 'FINTECH_RAILS',
      currentStage: 'SIMULATE',
      originalIdea: 'Instant zero-slippage settlement from USDC on Base L2 into Nigerian NGN bank accounts.',
      primaryAuthor: 'Chukwuebuka Obi & Fintech Syndicate',
      contributors: [
        { name: 'Chukwuebuka Obi', role: 'Treasury Engineer', equityPercent: 50, verifiedDate: '2026-04-08' },
        { name: 'Aurum Liquidity Providers', role: 'Liquidity Escrow', equityPercent: 50, verifiedDate: '2026-04-10' }
      ],
      problemStatement: 'Freelancers lose up to 8% in hidden FX spreads and wait 3 days for conventional SWIFT payouts.',
      targetCustomers: ['Remote Software Developers', 'Digital Media Agencies', 'African Exporters'],
      marketEvidenceSummary: 'Survey of 450 developers; 92% willing to switch for sub-1% transparent fee and instant settlement.',
      confidenceScore: 91.2,
      uncertaintyScore: 15.0,
      specSummary: 'Smart contracts on Base listening to USDC deposit events and triggering Paystack Transfer webhooks.',
      techStack: ['Solidity', 'Base L2', 'TypeScript', 'Express', 'Paystack Transfer API'],
      requiredApis: ['Paystack Transfers', 'CoinGecko FX Oracle', 'Alchemy RPC'],
      requiredColonies: ['AURUM_COLONY_V13', 'CODE_VEIN_V13'],
      computeBudgetMonthlyUsd: 200.00,
      operatingBudgetMonthlyUsd: 400.00,
      totalCapBudgetUsd: 9000.00,
      utilizedBudgetUsd: 2200.00,
      ipStatus: 'VERIFIED_CLEAN',
      childVentureIds: [],
      fusionComponentIds: [],
      validationState: {
        interviewsCompleted: 60,
        pilotCommitmentsCount: 12,
        paidLetterOfIntentUsd: 14000.00,
        validatedCustomerSegments: ['Tech Contractors', 'Design Agencies'],
        evidenceNotes: 'Tested 50 simulated transfer cycles in Mirrorverse with 100% reconciliation.'
      },
      financials: {
        grossRevenueUsd: 7250.00,
        netClientShareUsd: 5075.00,
        platformShareUsd: 2175.00,
        monthlyRecurringRevenueUsd: 2100.00,
        activeUsersCount: 65,
        isProfitable: true
      },
      riskLevel: 'MEDIUM',
      securityChecksPassed: true,
      emergencyKillSwitchActive: false,
      createdAt: '2026-04-08T11:20:00.000Z',
      updatedAt: '2026-04-21T10:15:00.000Z'
    },
    {
      id: 'ven-006',
      name: 'LegalMind Autonomous Compliance Agent',
      codename: 'PROJECT_LEX',
      tagline: 'Autonomous tender compliance and regulatory document screening for enterprise bids',
      category: 'AUTONOMOUS_SAAS',
      currentStage: 'DESIGN',
      originalIdea: 'AI agent that screens public procurement RFPs against company technical credentials.',
      primaryAuthor: 'Billionaire AI Academy Legal Lab',
      contributors: [
        { name: 'BAA Legal Council', role: 'Regulatory Guidance', equityPercent: 60, verifiedDate: '2026-04-12' },
        { name: 'Code Vein NLP Team', role: 'Document Parser', equityPercent: 40, verifiedDate: '2026-04-14' }
      ],
      problemStatement: 'SMEs miss out on public and multinational tenders because proposal preparation costs over $5,000 per submission.',
      targetCustomers: ['Engineering Contractors', 'IT Services Firms', 'Healthcare Suppliers'],
      marketEvidenceSummary: 'Analyzed 120 government tenders; detected 38 eligibility traps that disqualified applicants.',
      confidenceScore: 84.0,
      uncertaintyScore: 25.0,
      specSummary: 'Multi-agent evaluation pipeline with citation grounding, vector search over legal statutes, and automated gap report.',
      techStack: ['Python', 'LangChain', 'ChromaDB', 'Gemini 1.5 Pro', 'FastAPI'],
      requiredApis: ['Gemini API', 'PDFplumber', 'Supabase Vector'],
      requiredColonies: ['CODE_VEIN_V13', 'MIND_HIVE_V17'],
      computeBudgetMonthlyUsd: 250.00,
      operatingBudgetMonthlyUsd: 180.00,
      totalCapBudgetUsd: 5000.00,
      utilizedBudgetUsd: 900.00,
      ipStatus: 'VERIFIED_CLEAN',
      childVentureIds: [],
      fusionComponentIds: [],
      validationState: {
        interviewsCompleted: 15,
        pilotCommitmentsCount: 1,
        paidLetterOfIntentUsd: 3000.00,
        validatedCustomerSegments: ['Mid-Tier Construction & Engineering'],
        evidenceNotes: 'Initial feedback confirms 80% reduction in document drafting time.'
      },
      financials: {
        grossRevenueUsd: 0.00,
        netClientShareUsd: 0.00,
        platformShareUsd: 0.00,
        monthlyRecurringRevenueUsd: 0.00,
        activeUsersCount: 0,
        isProfitable: false
      },
      riskLevel: 'LOW',
      securityChecksPassed: true,
      emergencyKillSwitchActive: false,
      createdAt: '2026-04-12T14:00:00.000Z',
      updatedAt: '2026-04-21T18:00:00.000Z'
    }
  ],
  oracleSignals: [
    {
      id: 'sig-001',
      title: 'West African Power Grid Decentralization Tender',
      domain: 'Energy & Infrastructure',
      sourceType: 'AUTHORIZED_ENTERPRISE_TENDER',
      detectedProblem: 'Municipal distribution companies seek autonomous battery storage monitoring for micro-grids.',
      unmetDemandEstimateUsd: 140000.00,
      evidenceLinks: ['https://energy-commission.gov.ng/tenders/microgrid-monitoring-2026'],
      matchedColonyCapabilities: ['CE_COLONY_V12', 'CODE_VEIN_V13'],
      confidencePercent: 88.5,
      uncertaintyPercent: 21.0,
      isConfirmedCustomerDemand: false,
      recommendedVentureAngle: 'Deploy CE Colony edge nodes to local transformer stations with real-time anomaly alerts.',
      detectedAt: '2026-04-16T11:00:00.000Z'
    },
    {
      id: 'sig-002',
      title: 'Cross-Border B2B Supply Chain Escrow Gap',
      domain: 'Fintech & Logistics',
      sourceType: 'VERIFIED_USER_REQUEST',
      detectedProblem: 'Agro-exporters lose $30M annually due to payment delays between shipment departure and port arrival.',
      unmetDemandEstimateUsd: 320000.00,
      evidenceLinks: ['https://africancargo-alliance.org/research/port-escrow-delays-2026'],
      matchedColonyCapabilities: ['AURUM_COLONY_V13', 'CODE_VEIN_V13'],
      confidencePercent: 92.0,
      uncertaintyPercent: 14.0,
      isConfirmedCustomerDemand: false,
      recommendedVentureAngle: 'Automated IoT GPS milestone release triggering Paystack settlement upon container docking.',
      detectedAt: '2026-04-18T15:30:00.000Z'
    },
    {
      id: 'sig-003',
      title: 'Enterprise LLM Red-Teaming & Security Audits',
      domain: 'Cybersecurity & AI',
      sourceType: 'GITHUB_TRENDS',
      detectedProblem: 'Over 70 fintechs in emerging markets deploying AI bots without prompt-injection safeguards.',
      unmetDemandEstimateUsd: 85000.00,
      evidenceLinks: ['https://github.com/OWASP/www-project-top-10-for-large-language-model-applications'],
      matchedColonyCapabilities: ['CODE_VEIN_V13', 'MIND_HIVE_V17'],
      confidencePercent: 86.0,
      uncertaintyPercent: 19.5,
      isConfirmedCustomerDemand: false,
      recommendedVentureAngle: 'Automated vulnerability scanner for custom API endpoints and agent chat interfaces.',
      detectedAt: '2026-04-19T09:15:00.000Z'
    }
  ],
  simulations: [
    {
      id: 'sim-001',
      ventureId: 'ven-001',
      simulationName: 'BioGrid 100-Hospital Concurrency Spike',
      environmentType: 'HIGH_CONCURRENCY_STRESS',
      simulatedUserAgents: 2500,
      simulatedDaysRun: 60,
      simulatedInfraCostUsd: 1450.00,
      predictedGrossRevenueUsd: 48000.00,
      projectedBreakEvenMonths: 3.2,
      failureRatePercent: 0.12,
      simulationLabel: 'SYNTHETIC_DIGITAL_TWIN',
      simulationKeyFindings: [
        'Local Ray cluster handles up to 85 concurrent biomarker jobs before queuing.',
        'Network bandwidth on mobile edge nodes requires GZIP compression above 4MB batches.',
        'Unit cost per genomic sequence stabilizes at $0.038 USD.'
      ],
      runAt: '2026-04-14T16:00:00.000Z'
    },
    {
      id: 'sim-002',
      ventureId: 'ven-002',
      simulationName: 'OmniFreight French & Hausa Accents Stress Test',
      environmentType: 'DYNAMIC_PRICING_TEST',
      simulatedUserAgents: 1200,
      simulatedDaysRun: 30,
      simulatedInfraCostUsd: 580.00,
      predictedGrossRevenueUsd: 31000.00,
      projectedBreakEvenMonths: 2.1,
      failureRatePercent: 0.45,
      simulationLabel: 'SANDBOX_STRESS_TEST',
      simulationKeyFindings: [
        'Voice prompt fallback to SMS reduces abandonment from 14% to 1.8%.',
        'Dynamic surge pricing of 3% during harvest season doubles driver retention.',
        'Paystack webhook response verified at 99.98% reliability.'
      ],
      runAt: '2026-04-17T12:30:00.000Z'
    }
  ],
  tournaments: [
    {
      id: 'tourn-001',
      problemTitle: 'Sub-Zero Cold Chain Monitoring for Remote Vaccines',
      challengeBrief: 'Design an ultra-low-power telemetry tracker that transmits temperature alerts via LoRaWAN without cellular dependency.',
      targetDomain: 'HealthTech & Edge IoT',
      prizePoolUsd: 8000.00,
      status: 'ACTIVE_BENCHMARK',
      candidates: [
        {
          candidateId: 'cand-01',
          ventureName: 'CryoShield LoRa Node',
          contributorName: 'Ibrahim Bala (Kano Hardware Guild)',
          approachSummary: 'ESP32 solar-harvesting module with cryptographic temperature ledger.',
          controlledBudgetAllocatedUsd: 1500.00,
          technicalReliabilityScore: 94.2,
          customerFeedbackScore: 88.0,
          unitCostScore: 96.0,
          securityScore: 92.5,
          verifiedDemandEvidenceScore: 89.0,
          demandEvidenceScore: 89.0,
          overallWeightedScore: 92.1,
          isWinner: false,
          rank: 1
        },
        {
          candidateId: 'cand-02',
          ventureName: 'FrostWatch Mobile BLE Mesh',
          contributorName: 'Chiamaka Nnadi (Enugu Tech Hub)',
          approachSummary: 'Smartphone Bluetooth mesh network relaying data through nearby transport drivers.',
          controlledBudgetAllocatedUsd: 1500.00,
          technicalReliabilityScore: 86.5,
          customerFeedbackScore: 91.0,
          unitCostScore: 98.0,
          securityScore: 85.0,
          verifiedDemandEvidenceScore: 82.0,
          demandEvidenceScore: 82.0,
          overallWeightedScore: 88.3,
          isWinner: false,
          rank: 2
        }
      ],
      createdAt: '2026-04-10T10:00:00.000Z'
    }
  ],
  fusionProposals: [
    {
      id: 'fus-001',
      fusionName: 'BioFreight Cold-Pharma Swarm',
      description: 'Fusion of BioGrid molecular diagnostic intelligence with OmniFreight multi-lingual voice dispatch to deliver urgent anti-venom and chemotherapy drugs.',
      targetMarket: 'Specialized Medical Logistics & Emergency Pharmaceutical Supply',
      sourceCapabilities: [
        {
          colony: 'CE_COLONY_V12',
          assetName: 'Edge GPU Inference Nodes',
          ownerName: 'BioGrid Neural Compute Team',
          originalVentureId: 'ven-001',
          verifiedRightsClean: true
        },
        {
          colony: 'CODE_VEIN_V13',
          assetName: 'Voice Dispatch & SMS Gateway',
          ownerName: 'OmniFreight Syndicate',
          originalVentureId: 'ven-002',
          verifiedRightsClean: true
        },
        {
          colony: 'AURUM_COLONY_V13',
          assetName: 'Paystack Multi-Split Escrow',
          ownerName: 'VaultSentry Guild',
          originalVentureId: 'ven-003',
          verifiedRightsClean: true
        }
      ],
      compatibilityScore: 96.4,
      revenueSharingAgreement: [
        { partyName: 'BioGrid Labs', sharePercent: 35.0, contributionRole: 'Diagnostic Verification & Cold Packaging' },
        { partyName: 'OmniFreight Logistics', sharePercent: 35.0, contributionRole: 'Driver Network & Voice Routing' },
        { partyName: 'UA-AIDC Infrastructure Grid', sharePercent: 30.0, contributionRole: 'Edge Nodes, Security & Sovereign Ledger' }
      ],
      regulatoryApprovalPassed: true,
      status: 'AWAITING_APPROVAL',
      createdAt: '2026-04-18T13:45:00.000Z'
    }
  ],
  resurrectionReviews: [
    {
      id: 'res-001',
      assetName: 'AfriPay Micro-Invoicing Gateway (2023 Stalled)',
      originalCreator: 'Kolawole Digital Labs',
      stalledReason: 'HIGH_SERVER_COST',
      availableSourceCodeLines: 18450,
      technicalConditionScore: 84.0,
      activeResidualTraffic: 320,
      estimatedRelaunchCostUsd: 1200.00,
      projectedRecoverableRevenueUsd: 18000.00,
      recommendation: 'CONVERT_TO_MICRO_API',
      rightsOwnershipConfirmed: true,
      requiresHumanAcquisitionConsent: true,
      requiresHumanConsent: true,
      reviewedAt: '2026-04-15T14:20:00.000Z'
    },
    {
      id: 'res-002',
      assetName: 'EstateShield Visitor Access App (2022 Stalled)',
      originalCreator: 'UrbanTech Solutions',
      stalledReason: 'MARKETING_DROPOFF',
      availableSourceCodeLines: 32100,
      technicalConditionScore: 78.5,
      activeResidualTraffic: 1450,
      estimatedRelaunchCostUsd: 1800.00,
      projectedRecoverableRevenueUsd: 24000.00,
      recommendation: 'MERGE_INTO_COLONY_FUSION',
      rightsOwnershipConfirmed: true,
      requiresHumanAcquisitionConsent: true,
      requiresHumanConsent: true,
      reviewedAt: '2026-04-17T11:10:00.000Z'
    }
  ],
  gravityNodes: [
    { id: 'gn-01', label: 'Lagos Medical Tenders', type: 'DEMAND', region: 'Nigeria', strength: 92, colonyAffiliation: 'MIND_HIVE_V17', valueUsd: 185000, connectedEdgeCount: 3 },
    { id: 'gn-02', label: 'Kano-Kaduna Transit Corridor', type: 'REGIONAL_GAP', region: 'Northern Nigeria', strength: 88, colonyAffiliation: 'MIND_HIVE_V17', valueUsd: 120000, connectedEdgeCount: 2 },
    { id: 'gn-03', label: 'CE Colony 128 PFLOPS GPU Grid', type: 'COMPUTE', region: 'Pan-Africa', strength: 98, colonyAffiliation: 'CE_COLONY_V12', valueUsd: 340000, connectedEdgeCount: 4 },
    { id: 'gn-04', label: 'Code Vein Micro-API Registry', type: 'SOFTWARE', region: 'Global', strength: 95, colonyAffiliation: 'CODE_VEIN_V13', valueUsd: 210000, connectedEdgeCount: 4 },
    { id: 'gn-05', label: 'Aurum Multi-Split Treasury Vault', type: 'ASSET', region: 'Global', strength: 94, colonyAffiliation: 'AURUM_COLONY_V13', valueUsd: 450000, connectedEdgeCount: 3 }
  ],
  gravityEdges: [
    { id: 'ge-01', sourceNodeId: 'gn-01', targetNodeId: 'gn-03', synergyType: 'DEMAND_TO_SOFTWARE', weight: 4.8, commercialViabilityScore: 94.5 },
    { id: 'ge-02', sourceNodeId: 'gn-02', targetNodeId: 'gn-04', synergyType: 'DATA_TO_COMPUTE', weight: 4.2, commercialViabilityScore: 89.0 },
    { id: 'ge-03', sourceNodeId: 'gn-04', targetNodeId: 'gn-05', synergyType: 'ASSET_TO_MARKETPLACE', weight: 4.9, commercialViabilityScore: 96.0 },
    { id: 'ge-04', sourceNodeId: 'gn-03', targetNodeId: 'gn-05', synergyType: 'REGIONAL_CROSS_COLONY', weight: 4.6, commercialViabilityScore: 92.5 }
  ],
  swarmAgents: [
    {
      id: 'sw-01',
      agentName: 'GenomicsAstParserAgent',
      assignedVentureId: 'ven-001',
      specialistRole: 'FASTA Sequence Validation Specialist',
      allocatedComputeGpuHours: 120,
      maxSpendingLimitUsd: 250.00,
      actualComputeConsumedGpuHours: 84,
      actualCostUsd: 168.00,
      grantedTools: ['bio_seq_verify', 'ray_cluster_submit', 'ollama_inference'],
      credentialRevocationDate: '2026-05-01T00:00:00.000Z',
      status: 'ACTIVE_WORKING'
    },
    {
      id: 'sw-02',
      agentName: 'PidginVoiceSynthesisAgent',
      assignedVentureId: 'ven-002',
      specialistRole: 'Acoustic Dialect Synthesizer',
      allocatedComputeGpuHours: 80,
      maxSpendingLimitUsd: 180.00,
      actualComputeConsumedGpuHours: 62,
      actualCostUsd: 124.00,
      grantedTools: ['deepgram_tts', 'twilio_call_route', 'paystack_verify'],
      credentialRevocationDate: '2026-05-15T00:00:00.000Z',
      status: 'ACTIVE_WORKING'
    },
    {
      id: 'sw-03',
      agentName: 'Erc4907SafetyAuditorAgent',
      assignedVentureId: 'ven-003',
      specialistRole: 'Dual-Role Reentrancy Checker',
      allocatedComputeGpuHours: 40,
      maxSpendingLimitUsd: 100.00,
      actualComputeConsumedGpuHours: 38,
      actualCostUsd: 76.00,
      grantedTools: ['slither_ast_check', 'mythril_symbolic', 'hardhat_test'],
      credentialRevocationDate: '2026-04-30T00:00:00.000Z',
      status: 'COMPLETED'
    }
  ],
  provenanceVault: [
    {
      id: 'prov-001',
      ventureId: 'ven-001',
      assetTitle: 'BioGrid Genomic Neural Sharding Architecture',
      actionType: 'ORIGINAL_IDEA_REGISTERED',
      authorSignature: '0x8a92b01c34f9a01823901bca9012389102839012',
      timestamp: '2026-02-14T10:15:00.000Z',
      immutableContentHash: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
      termsSummary: 'Author retains 45% perpetual equity; CE Colony licensed for inference delivery.'
    },
    {
      id: 'prov-002',
      ventureId: 'ven-002',
      assetTitle: 'OmniFreight Dialect Acoustic Model v2.1',
      actionType: 'CODE_MERGED',
      authorSignature: '0x39a12c8402a11b88e1030e2f9d3f54817a299104',
      timestamp: '2026-03-12T16:40:00.000Z',
      immutableContentHash: 'bafybeihkoviema7g3gxyt6fv72x2w6y7efuylqabf3oclgtqy55fbcrypto',
      termsSummary: 'Apache 2.0 dual-licensing with 70/30 commercial royalty to syndicate.'
    }
  ],
  exchangeListings: [
    {
      id: 'ex-001',
      ventureId: 'ven-001',
      title: 'BioGrid Commercial Diagnostic License (West Africa Exclusive)',
      assetType: 'LICENSED_MICRO_API',
      askingPriceUsd: 25000.00,
      askingPriceNgn: 37500000,
      monthlyRevenueRunRateUsd: 7200.00,
      verifiedDueDiligenceScore: 94.0,
      sellerEntity: 'BioGrid Founding Laboratory',
      milestonePaymentEscrowAllowed: true,
      status: 'AVAILABLE',
      listedAt: '2026-04-10T12:00:00.000Z'
    },
    {
      id: 'ex-002',
      ventureId: 'ven-003',
      title: 'VaultSentry ERC-4907 Turnkey Protocol & Liquidity Integration',
      assetType: 'AUTONOMOUS_BUSINESS',
      askingPriceUsd: 45000.00,
      askingPriceNgn: 67500000,
      monthlyRevenueRunRateUsd: 5200.00,
      verifiedDueDiligenceScore: 96.5,
      sellerEntity: 'Aurum Colony Guild',
      milestonePaymentEscrowAllowed: true,
      status: 'AVAILABLE',
      listedAt: '2026-04-15T09:30:00.000Z'
    }
  ],
  approvals: [
    {
      id: 'appr-gen-001',
      requestType: 'COLONY_FUSION_MERGE',
      ventureId: 'ven-001',
      ventureName: 'BioGrid + OmniFreight',
      requestTitle: 'Authorize BioFreight Cold-Pharma Swarm Fusion',
      description: 'Merge BioGrid diagnostics and OmniFreight dispatch with 35/35/30 revenue split agreement. Required capital deployment: $2,500 USD from operating reserve.',
      requestedAmountUsd: 2500.00,
      riskAssessment: 'Low legal risk; contributor agreements signed and verified clean on-chain.',
      requestedAt: new Date(Date.now() - 3600000).toISOString(),
      status: 'PENDING'
    },
    {
      id: 'appr-gen-002',
      requestType: 'CAPITAL_EXPENDITURE',
      ventureId: 'ven-002',
      ventureName: 'OmniFreight Voice Logistics',
      requestTitle: 'Allocate $1,200 USD for Northern Corridor LoRa Relays',
      description: 'Expand physical radio relays along Kaduna-Zaria highway to maintain 100% voice connectivity in low-cellular zones.',
      requestedAmountUsd: 1200.00,
      riskAssessment: 'Hardware purchase with guaranteed buyback warranty from CE Colony shop partners.',
      requestedAt: new Date(Date.now() - 7200000).toISOString(),
      status: 'PENDING'
    },
    {
      id: 'appr-gen-003',
      requestType: 'PAYOUT_WITHDRAWAL',
      ventureName: 'BAA Genesis Treasury',
      requestTitle: 'Release $5,000 USD Net Venture Royalty via Paystack',
      description: 'Distribute verified April commercial profits (₦7,500,000 NGN) to participating engineers and founders under 70/30 contract terms.',
      requestedAmountUsd: 5000.00,
      riskAssessment: 'Zero leverage; 100% matched against verified customer receipts in Earnings Pulse.',
      requestedAt: new Date(Date.now() - 10800000).toISOString(),
      status: 'PENDING'
    }
  ],
  ledger: [
    {
      id: 'ledg-gen-001',
      txRef: 'GEN-REV-2026-101',
      ventureId: 'ven-001',
      ventureName: 'BioGrid Neural Compute',
      type: 'VENTURE_COMMISSION',
      grossUsd: 12000.00,
      clientShareUsd: 8400.00,
      platformShareUsd: 3600.00,
      grossNgn: 18000000,
      clientShareNgn: 12600000,
      platformShareNgn: 5400000,
      paymentMethod: 'PAYSTACK',
      status: 'SETTLED',
      timestamp: '2026-04-12T15:30:00.000Z'
    },
    {
      id: 'ledg-gen-002',
      txRef: 'GEN-REV-2026-102',
      ventureId: 'ven-002',
      ventureName: 'OmniFreight Voice Logistics',
      type: 'API_LICENSING',
      grossUsd: 6500.00,
      clientShareUsd: 4550.00,
      platformShareUsd: 1950.00,
      grossNgn: 9750000,
      clientShareNgn: 6825000,
      platformShareNgn: 2925000,
      paymentMethod: 'PAYSTACK',
      status: 'SETTLED',
      timestamp: '2026-04-15T11:20:00.000Z'
    },
    {
      id: 'ledg-gen-003',
      txRef: 'GEN-REV-2026-103',
      ventureId: 'ven-003',
      ventureName: 'VaultSentry Utility Broker',
      type: 'VENTURE_COMMISSION',
      grossUsd: 10000.00,
      clientShareUsd: 7000.00,
      platformShareUsd: 3000.00,
      grossNgn: 15000000,
      clientShareNgn: 10500000,
      platformShareNgn: 4500000,
      paymentMethod: 'ON_CHAIN_SETTLED',
      status: 'SETTLED',
      timestamp: '2026-04-18T17:45:00.000Z'
    }
  ]
};
