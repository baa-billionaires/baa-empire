import {
  PolicyRecord,
  PVAIDCPrinciple,
  AgentConstitution,
  SimulationScenario,
  ResearchPaper,
  TrustPassport
} from '../types/governance';

const STORAGE_PREFIX = 'richconnect_gov_';

export const INITIAL_POLICY_RECORDS: PolicyRecord[] = [
  {
    id: 'pol-eu-ai-act',
    title: 'Regulation (EU) 2024/1689 — The European Artificial Intelligence Act',
    issuingBody: 'European Parliament and Council of the European Union',
    jurisdiction: 'European Union',
    country: 'European Union',
    countryCode: 'EU',
    flag: '🇪🇺',
    category: 'AI',
    legalStatus: 'enacted_law',
    publicationDate: '2024-07-12',
    effectiveDate: '2024-08-01',
    lastVerifiedAt: '2026-10-28 10:00 UTC',
    officialSourceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689',
    penaltyRisk: 'Up to €35M or 7% of global annual turnover for prohibited AI practices; up to €15M / 3% for high-risk non-compliance.',
    summary: 'The world’s first comprehensive horizontal legal framework for artificial intelligence, establishing a risk-based categorization (unacceptable, high, specific transparency, and minimal risk) with strict governance for general-purpose AI (GPAI) and foundation models.',
    keyRequirements: [
      'Prohibited AI practices enforceable from February 2, 2025.',
      'General Purpose AI (GPAI) governance codes and model obligations applicable from August 2, 2025.',
      'Full compliance for High-Risk AI systems (Annex III) mandatory from August 2, 2026.',
      'Obligatory fundamental rights impact assessments (FRIA) and technical conformity documentation.',
      'Human-in-the-loop oversight mechanisms for autonomous decision pipelines.'
    ],
    affectedSectors: ['Enterprise AI', 'Biometrics', 'Critical Infrastructure', 'Education & HR', 'Finance & Law Enforcement'],
    relatedStandards: ['ISO/IEC 42001:2023', 'CEN-CENELEC JTC 21 Standards', 'NIST AI 100-1'],
    timelineMilestones: [
      { date: '2024-08-01', description: 'Entry into force across EU Member States.', isPast: true },
      { date: '2025-02-02', description: 'Prohibitions on unacceptable risk systems take effect.', isPast: true },
      { date: '2025-08-02', description: 'GPAI obligations and systemic risk rules apply.', isPast: true },
      { date: '2026-08-02', description: 'General application of majority provisions and high-risk requirements.', isPast: false },
      { date: '2027-08-02', description: 'High-risk AI embedded in Annex I regulated products becomes applicable.', isPast: false }
    ],
    complianceReadinessNotes: 'BAA autonomous agents and student micro-startups deploying into EU markets must maintain tamper-evident technical logs and human fallback controls.'
  },
  {
    id: 'pol-eu-mica',
    title: 'Regulation (EU) 2023/1114 — Markets in Crypto-Assets (MiCA)',
    issuingBody: 'European Securities and Markets Authority (ESMA) / European Banking Authority (EBA)',
    jurisdiction: 'European Union',
    country: 'European Union',
    countryCode: 'EU',
    flag: '🇪🇺',
    category: 'Blockchain',
    legalStatus: 'enacted_law',
    publicationDate: '2023-06-09',
    effectiveDate: '2024-12-30',
    lastVerifiedAt: '2026-10-30 14:00 UTC',
    officialSourceUrl: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32023R1114',
    penaltyRisk: 'Fines up to €5M or 12.5% of total annual turnover for asset-referenced token issuers; suspension of crypto-asset service provider (CASP) authorization.',
    summary: 'Uniform EU regulation governing the issuance, trading, custody, and advisory of crypto-assets, asset-referenced tokens (ARTs), and electronic money tokens (EMTs), establishing comprehensive licensing for Crypto-Asset Service Providers (CASPs).',
    keyRequirements: [
      'Title III & IV rules for Stablecoins (ARTs and EMTs) effective from June 30, 2024.',
      'Comprehensive CASP authorization and prudential safeguards fully applicable December 30, 2024.',
      'Mandatory whitepaper disclosure with verifiable cryptographic risk warnings.',
      'Strict market abuse prevention and autonomous trading algorithmic surveillance.'
    ],
    affectedSectors: ['Web3 Exchanges', 'Stablecoins', 'Custodians', 'DeFi Gateways', 'Asset Management'],
    relatedStandards: ['FATF Travel Rule Recommendation 16', 'ESMA RTS on Conflicts of Interest'],
    timelineMilestones: [
      { date: '2023-06-09', description: 'Publication in the Official Journal of the European Union.', isPast: true },
      { date: '2024-06-30', description: 'Stablecoin & E-money token regime enters into force.', isPast: true },
      { date: '2024-12-30', description: 'Full CASP authorization regime becomes applicable across all 27 EU member states.', isPast: true },
      { date: '2026-07-01', description: 'Transitional grandfathering period concludes for pre-existing providers.', isPast: false }
    ],
    complianceReadinessNotes: 'Base L2 sovereign tokens and BaaCoin settlements comply with MiCA utility token guidelines without triggering ART/EMT classification.'
  },
  {
    id: 'pol-nist-ai-rmf',
    title: 'NIST AI 100-1 — Artificial Intelligence Risk Management Framework (AI RMF 1.0)',
    issuingBody: 'National Institute of Standards and Technology (NIST), U.S. Department of Commerce',
    jurisdiction: 'United States',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    category: 'AI',
    legalStatus: 'voluntary_standard',
    publicationDate: '2023-01-26',
    effectiveDate: '2023-01-26',
    lastVerifiedAt: '2026-10-25 14:30 UTC',
    officialSourceUrl: 'https://www.nist.gov/itl/ai-risk-management-framework',
    penaltyRisk: 'Disqualification from federal procurement, loss of grant eligibility, and civil liability under OMB Memorandum M-24-10.',
    summary: 'A voluntary guidance framework designed to improve the ability of organizations to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems.',
    keyRequirements: [
      'Structured across 4 core functions: GOVERN, MAP, MEASURE, and MANAGE.',
      'Operationalizes 7 characteristics of trustworthy AI: valid & reliable, safe, secure & resilient, accountable & transparent, explainable & interpretable, privacy-enhanced, and fair.',
      'Mandatory risk profiling for critical public sector deployments under OMB Memorandum M-24-10.'
    ],
    affectedSectors: ['Software Engineering', 'Healthcare', 'Banking & Defense', 'Cloud Service Providers'],
    relatedStandards: ['ISO/IEC 23894:2023', 'OECD AI Recommendation', 'IEEE 7000 Series'],
    timelineMilestones: [
      { date: '2023-01-26', description: 'AI RMF 1.0 published as flagship voluntary standard.', isPast: true },
      { date: '2024-03-28', description: 'OMB M-24-10 mandates federal alignment with AI RMF.', isPast: true },
      { date: '2026-06-15', description: 'NIST AI RMF 2.0 draft public review window.', isPast: false }
    ],
    complianceReadinessNotes: 'Serves as the primary operational benchmark for BAA PrincipleForge and Agent Constitution Compiler risk scoring.'
  },
  {
    id: 'pol-ng-sec-crypto',
    title: 'SEC Nigeria Rules on Digital Assets Offering, Custody & DAX Exchanges',
    issuingBody: 'Securities and Exchange Commission (SEC) Nigeria',
    jurisdiction: 'Nigeria',
    country: 'Nigeria',
    countryCode: 'NG',
    flag: '🇳🇬',
    category: 'Blockchain',
    legalStatus: 'enacted_law',
    publicationDate: '2022-05-13',
    effectiveDate: '2024-06-21',
    lastVerifiedAt: '2026-10-29 11:15 UTC',
    officialSourceUrl: 'https://sec.gov.ng/rules-on-digital-assets/',
    penaltyRisk: 'Minimum statutory penalty of ₦20,000,000, immediate platform shutdown, and commercial freezing of unauthorized operators.',
    summary: 'Comprehensive regulatory framework establishing registration prerequisites for Digital Asset Offering Platforms (DAOPs), Digital Asset Custodians (DACs), and Digital Asset Exchanges (DAXs) operating in Nigeria.',
    keyRequirements: [
      'Mandatory registration for all digital token offerings exceeding ₦100,000,000.',
      'Strict AML/CFT identification through BVN and NIN identity verification.',
      'Segregation of client funds in licensed local depository accounts.',
      'Audited cybersecurity architecture and zero-loss cold storage custody quotas.'
    ],
    affectedSectors: ['Nigerian Fintech', 'P2P Trading', 'Tokenized Real Estate', 'Web3 Remittance'],
    relatedStandards: ['Nigeria Data Protection Act 2023 (NDPA)', 'CBN Regulatory Guidelines on Virtual Asset Service Providers'],
    timelineMilestones: [
      { date: '2022-05-13', description: 'Initial SEC New Rules on Digital Assets gazetted.', isPast: true },
      { date: '2024-06-21', description: 'Accelerated Regulatory Incubation Program (ARIP) launched.', isPast: true },
      { date: '2026-09-30', description: 'Mandatory full-licensing deadline for all active incubator participants.', isPast: false }
    ],
    complianceReadinessNotes: 'Directly informs BAA Port Harcourt UADC and Pan-African student micro-enterprises handling Nigerian Naira crypto off-ramps.'
  },
  {
    id: 'pol-oecd-ai-principles',
    title: 'OECD Recommendation on Artificial Intelligence (Updated 2024)',
    issuingBody: 'Organisation for Economic Co-operation and Development (OECD)',
    jurisdiction: 'Global / Multilateral',
    country: 'Global / Multilateral',
    countryCode: 'GL',
    flag: '🌐',
    category: 'Cross-Disciplinary',
    legalStatus: 'multilateral_treaty',
    publicationDate: '2024-05-03',
    effectiveDate: '2024-05-03',
    lastVerifiedAt: '2026-10-29 08:00 UTC',
    officialSourceUrl: 'https://oecd.ai/en/ai-principles',
    penaltyRisk: 'Intergovernmental peer surveillance censure, exclusion from OECD data-sharing accords, and trade friction.',
    summary: 'The first intergovernmental standard for trustworthy AI, updated in May 2024 to address generative AI, general-purpose models, autonomous agents, and interoperable international governance.',
    keyRequirements: [
      'Principle 1.1: Inclusive growth, sustainable development, and well-being.',
      'Principle 1.2: Human-centred values and fairness.',
      'Principle 1.3: Transparency and explainability.',
      'Principle 1.4: Robustness, security, and safety.',
      'Principle 1.5: Accountability.'
    ],
    affectedSectors: ['Government Policy', 'Multilateral Organizations', 'Global Trade & Research Consortia'],
    relatedStandards: ['G7 Hiroshima AI Process', 'UNESCO Recommendation on the Ethics of AI'],
    timelineMilestones: [
      { date: '2019-05-22', description: 'Original OECD AI Principles adopted by 42 countries.', isPast: true },
      { date: '2024-05-03', description: 'Updated to address Foundation Models & Multi-Agent systems.', isPast: true },
      { date: '2026-11-10', description: 'Global Policy Observatory comparative scorecard submission.', isPast: false }
    ],
    complianceReadinessNotes: 'Directly mapped across BAA PVAIDC principles 1 through 12 to ensure international intergovernmental harmony.'
  },
  {
    id: 'pol-sg-mas-ai-verify',
    title: 'Monetary Authority of Singapore (MAS) AI Verify & Project Guardian Framework',
    issuingBody: 'Monetary Authority of Singapore (MAS) & Infocomm Media Development Authority (IMDA)',
    jurisdiction: 'Singapore',
    country: 'Singapore',
    countryCode: 'SG',
    flag: '🇸🇬',
    category: 'Cross-Disciplinary',
    legalStatus: 'regulatory_guidance',
    publicationDate: '2023-06-07',
    effectiveDate: '2024-01-16',
    lastVerifiedAt: '2026-10-28 17:30 UTC',
    officialSourceUrl: 'https://www.mas.gov.sg/development/fintech/project-guardian',
    penaltyRisk: 'Revocation of CMS/MPI payment licenses, compulsory audits, and direct operational restrictions on automated financial algorithms.',
    summary: 'Singapore’s pioneering collaborative framework for testing and governing AI systems (AI Verify) alongside institutional asset tokenization (Project Guardian) across institutional liquidity pools.',
    keyRequirements: [
      '11 testing principles for AI trustworthiness: transparency, explainability, repeatable performance, and safety.',
      'Open-source automated testing toolkit integration for algorithmic audit validation.',
      'Open, interoperable networks for institutional asset tokenization without closed proprietary lock-in.',
      'Trust anchor identity verification for automated liquidity agents.'
    ],
    affectedSectors: ['Asset Tokenization', 'Algorithmic Trading', 'Cross-Border Wholesale Settlements', 'Institutional DeFi'],
    relatedStandards: ['FEAT Principles (Fairness, Ethics, Accountability and Transparency)', 'ISO/IEC 42001'],
    timelineMilestones: [
      { date: '2023-06-07', description: 'Project Guardian industry pilot releases first tokenized bond.', isPast: true },
      { date: '2024-01-16', description: 'AI Verify Foundation releases GenAI Governance Evaluation Framework.', isPast: true },
      { date: '2026-08-30', description: 'Commercial deployment of tokenized fund distribution standard.', isPast: false }
    ],
    complianceReadinessNotes: 'Informs BAA PrincipleForge testing methodology and institutional deal-room asset tokenization verification.'
  },
  {
    id: 'pol-w3c-vc-2',
    title: 'W3C Verifiable Credentials Data Model v2.0',
    issuingBody: 'World Wide Web Consortium (W3C)',
    jurisdiction: 'Global / Multilateral',
    country: 'Global / Multilateral',
    countryCode: 'GL',
    flag: '🌐',
    category: 'Web3',
    legalStatus: 'voluntary_standard',
    publicationDate: '2025-01-15',
    effectiveDate: '2025-01-15',
    lastVerifiedAt: '2026-10-27 16:00 UTC',
    officialSourceUrl: 'https://www.w3.org/TR/vc-data-model-2.0/',
    penaltyRisk: 'Loss of global cryptographic interoperability, automated verifier rejection, and isolation from federated trust networks.',
    summary: 'W3C official recommendation establishing standard JSON-LD data representations for cryptographically verifiable identity credentials, zero-knowledge proofs, and decentralized autonomous agent attestations.',
    keyRequirements: [
      'Cryptographically signed assertions between Issuer, Subject, and Verifier.',
      'Support for Decentralized Identifiers (DIDs) including did:key, did:pkh, and did:ion.',
      'Tamper-evident claims verification without relying on centralized identity silos.',
      'Selective disclosure and zero-knowledge proof primitives.'
    ],
    affectedSectors: ['Web3 Identity', 'Decentralized Finance', 'AI Agent Provenance', 'Academic Credentials'],
    relatedStandards: ['W3C DID v1.0', 'OpenID for Verifiable Credentials (OID4VC)'],
    timelineMilestones: [
      { date: '2025-01-15', description: 'W3C VC 2.0 ratified as official Web Standard Recommendation.', isPast: true },
      { date: '2026-04-10', description: 'Pan-African university and agent credential conformance trials.', isPast: true }
    ],
    complianceReadinessNotes: 'Technical architecture foundation for BAA Trust Passport and 0xBAAC On-Chain Sovereign Certificates.'
  },
  {
    id: 'pol-uk-fca-crypto-ai',
    title: 'UK FCA Financial Promotions Regime & DSIT Pro-Innovation AI Framework',
    issuingBody: 'Financial Conduct Authority (FCA) & DSIT',
    jurisdiction: 'United Kingdom',
    country: 'United Kingdom',
    countryCode: 'GB',
    flag: '🇬🇧',
    category: 'Web3',
    legalStatus: 'enacted_law',
    publicationDate: '2023-10-08',
    effectiveDate: '2024-01-08',
    lastVerifiedAt: '2026-10-29 16:45 UTC',
    officialSourceUrl: 'https://www.fca.org.uk/cryptoassets-financial-promotions',
    penaltyRisk: 'Criminal offense under FSMA s21 punishable by up to 2 years imprisonment, unlimited statutory fines, and website ISP blockage.',
    summary: 'Strict regulatory regime for marketing crypto-assets to UK retail consumers, mandating clear risk warnings, 24-hour cooling-off periods, and prohibition of incentives (like refer-a-friend bonuses), coupled with UK’s 5 cross-sector AI principles.',
    keyRequirements: [
      'Mandatory registration or approval by FCA-authorized entity before communicating crypto promotions.',
      '24-hour cooling-off period for first-time retail investors before transaction execution.',
      'Prohibition of refer-a-friend bonuses and gamified promotional staking mechanisms.',
      'Adherence to UK 5 principles: Safety, Transparency, Fairness, Accountability, Contestability.'
    ],
    affectedSectors: ['Fintech Marketing', 'Crypto Brokerage', 'Educational Crypto Academies', 'Automated Bots'],
    relatedStandards: ['UK Financial Services and Markets Act 2023', 'DSIT AI White Paper'],
    timelineMilestones: [
      { date: '2023-10-08', description: 'Financial promotions gateway takes effect for crypto.', isPast: true },
      { date: '2024-01-08', description: 'End of technical flexibility window; strict enforcement begins.', isPast: true },
      { date: '2026-12-01', description: 'Statutory AI safety testing requirements for high-capability models.', isPast: false }
    ],
    complianceReadinessNotes: 'All BAA course promotions to UK IP addresses display mandatory risk notices and disclaim investment advice.'
  },
  {
    id: 'pol-uae-vara',
    title: 'Dubai VARA Virtual Assets and Related Activities Regulations 2023',
    issuingBody: 'Virtual Assets Regulatory Authority (VARA), Government of Dubai',
    jurisdiction: 'United Arab Emirates',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    flag: '🇦🇪',
    category: 'Web3',
    legalStatus: 'enacted_law',
    publicationDate: '2023-02-07',
    effectiveDate: '2023-02-07',
    lastVerifiedAt: '2026-10-30 15:20 UTC',
    officialSourceUrl: 'https://www.vara.ae/en/regulations/rulebooks/',
    penaltyRisk: 'Administrative penalties up to AED 50,000,000 ($13.6M USD) or 15% of annual revenue, accompanied by commercial license cancellation.',
    summary: 'The world’s first bespoke independent virtual asset regulator, establishing 4 compulsory rulebooks and 7 activity-specific rulebooks across advisory, broker-dealer, custody, exchange, and lending services.',
    keyRequirements: [
      'Full commercial presence and executive governance substance located in Dubai emirate.',
      'Mandatory Compliance & Risk Management, Market Conduct, and Cybersecurity rulebook audits.',
      'Explicit prohibition on privacy-enhancing cryptocurrencies (anonymity-enhanced tokens).',
      'Continuous algorithmic monitoring of automated market-making and automated settlement robots.'
    ],
    affectedSectors: ['Global Web3 HQ', 'Venture Funds', 'Virtual Asset Custody', 'Institutional Deal Rooms'],
    relatedStandards: ['Dubai Law No. 4 of 2022', 'UAE Federal Decree-Law No. 20 of 2018 on AML/CFT'],
    timelineMilestones: [
      { date: '2023-02-07', description: 'Full VARA Regulatory Framework published and enforceable.', isPast: true },
      { date: '2024-09-01', description: 'Updated marketing and promotional rules enforcement deadline.', isPast: true },
      { date: '2026-10-15', description: 'Inter-emirate regulatory passporting pilot with Abu Dhabi FSRA.', isPast: false }
    ],
    complianceReadinessNotes: 'Provides the regulatory blueprint for BAA Global Deal Room institutional investor onboarding in MENA.'
  },
  {
    id: 'pol-us-sec-stablecoin',
    title: 'U.S. Federal Digital Asset & Autonomous AI Financial Conduct Framework',
    issuingBody: 'U.S. SEC / CFTC / FinCEN Joint Regulatory Task Force',
    jurisdiction: 'United States',
    country: 'United States',
    countryCode: 'US',
    flag: '🇺🇸',
    category: 'Autonomous Agents',
    legalStatus: 'regulatory_guidance',
    publicationDate: '2024-03-12',
    effectiveDate: '2025-01-01',
    lastVerifiedAt: '2026-10-27 18:00 UTC',
    officialSourceUrl: 'https://www.sec.gov/news/press-release/2024-ai-fraud',
    penaltyRisk: 'Disgorgement of all proceeds with prejudgment interest, third-tier civil penalties up to $2,230,000 per entity violation, and permanent injunctions.',
    summary: 'Joint federal guidance and enforcement directives focusing on artificial intelligence in investment advice, algorithmic manipulation, unregistered broker-dealer activities conducted by autonomous agent swarms, and stablecoin payment reserves.',
    keyRequirements: [
      'Autonomous trading agents cannot escape broker-dealer registration via algorithmic abstraction.',
      'Mandatory human accountability for predictive data analytics (PDA) conflicts of interest.',
      'Full 1:1 liquid reserve backing requirements for USD payment stablecoins.',
      'Anti-AI-washing enforcement: marketing claims regarding AI capabilities must be substantiated with empirical code evidence.'
    ],
    affectedSectors: ['Autonomous Agents', 'Fintech Algorithmic Trading', 'Payment Stablecoins', 'AI Wealth Advisors'],
    relatedStandards: ['Securities Exchange Act of 1934', 'Commodity Exchange Act', 'Bank Secrecy Act / FinCEN SAR'],
    timelineMilestones: [
      { date: '2024-03-12', description: 'SEC issues sweeps and enforcement warnings against AI washing.', isPast: true },
      { date: '2025-01-01', description: 'Heightened examination focus on autonomous multi-agent financial tools.', isPast: true },
      { date: '2026-11-01', description: 'Federal statutory legislative deadline for national stablecoin bill.', isPast: false }
    ],
    complianceReadinessNotes: 'Directly validates BAA PVAIDC Principle 1 (Verifiable Intelligence) and Principle 2 (Bounded Autonomy) spend caps.'
  },
  {
    id: 'pol-au-ai-strategy',
    title: 'African Union Continental Artificial Intelligence Strategy',
    issuingBody: 'African Union Commission (Department of Infrastructure and Energy)',
    jurisdiction: 'Pan-African & AU',
    country: 'Pan-African & AU',
    countryCode: 'AU',
    flag: '🌍',
    category: 'AI',
    legalStatus: 'regulatory_guidance',
    publicationDate: '2024-07-20',
    effectiveDate: '2024-07-20',
    lastVerifiedAt: '2026-10-30 09:00 UTC',
    officialSourceUrl: 'https://au.int/en/documents/continental-ai-strategy-2024',
    penaltyRisk: 'Exclusion from AfCFTA single digital market concessions, cross-border data corridor restrictions, and multilateral compute subsidy loss.',
    summary: 'Pan-African strategic framework outlining ethical AI deployment, localized language models, compute sovereignty, cross-border digital trade data flows under AfCFTA, and digital inclusion.',
    keyRequirements: [
      'National AI policy adoption across all 55 AU Member States by 2028.',
      'Investment in localized sovereign compute hubs and clean energy data centers.',
      'Preservation and digital curation of African indigenous languages in LLM training corpora.',
      'Harmonization of data protection frameworks across Regional Economic Communities (RECs).'
    ],
    affectedSectors: ['Telecommunications', 'Higher Education', 'Agriculture & Energy', 'GovTech'],
    relatedStandards: ['Malabo Convention on Cyber Security and Personal Data Protection', 'AfCFTA Digital Trade Protocol'],
    timelineMilestones: [
      { date: '2024-07-20', description: 'AU Executive Council endorsement in Accra, Ghana.', isPast: true },
      { date: '2026-12-15', description: 'First Regional Peer Review of national AI readiness indices.', isPast: false }
    ],
    complianceReadinessNotes: 'Directly aligns with BAA Pan-African Course Translator, UADC compute nodes in Port Harcourt, and LegalEase Africa AI.'
  },
  {
    id: 'pol-iso-42001',
    title: 'ISO/IEC 42001:2023 — Artificial Intelligence Management System (AIMS)',
    issuingBody: 'International Organization for Standardization (ISO) / IEC',
    jurisdiction: 'Global / Multilateral',
    country: 'Global / Multilateral',
    countryCode: 'GL',
    flag: '🌐',
    category: 'AI',
    legalStatus: 'voluntary_standard',
    publicationDate: '2023-12-18',
    effectiveDate: '2023-12-18',
    lastVerifiedAt: '2026-10-26 11:20 UTC',
    officialSourceUrl: 'https://www.iso.org/standard/81230.html',
    penaltyRisk: 'Revocation of enterprise vendor accreditation, international tender disqualification, and contractual breach penalties.',
    summary: 'The world’s first certifiable standard for Artificial Intelligence Management Systems, specifying requirements for establishing, implementing, maintaining, and continually improving an AIMS within organizations.',
    keyRequirements: [
      'Context of the organization and stakeholder impact analysis.',
      'Leadership commitment and documented AI policy statement.',
      'AI risk assessment and AI risk treatment methodology (Annex A controls).',
      'Continuous performance evaluation and independent third-party audit capability.'
    ],
    affectedSectors: ['Enterprise IT', 'Fintech', 'SaaS Providers', 'Consulting & Certification Bodies'],
    relatedStandards: ['ISO/IEC 27001:2022', 'ISO/IEC 22989:2022', 'ISO/IEC 23894:2023'],
    timelineMilestones: [
      { date: '2023-12-18', description: 'ISO/IEC 42001 formal publication.', isPast: true },
      { date: '2025-06-01', description: 'Accreditation bodies begin formal auditor certification.', isPast: true }
    ],
    complianceReadinessNotes: 'Serves as the structural benchmark for BAA Institutional Readiness Audits and corporate deal evaluations.'
  }
];

export const INITIAL_PVAIDC_PRINCIPLES: PVAIDCPrinciple[] = [
  {
    number: 1,
    id: 'pvaidc-01',
    name: 'Verifiable Intelligence',
    shortDesc: 'AI claims, outputs, and model assertions must be supported by verifiable evidence.',
    fullStatement: 'Important claims made by or on behalf of an AI system must be accompanied by inspectable citations, cryptographic signatures, or verifiable execution receipts. Fabricated claims, hallucinated citations, and opaque algorithmic determinations are unacceptable for consequential decisions.',
    operationalRequirements: [
      'Outputs influencing finance, legal rights, or medical triage must include source provenance.',
      'Model checkpoints and weights versions must be cryptographically hashed.',
      'Uncertainty metrics must be explicitly reported to users alongside answers.'
    ],
    nistMapping: 'NIST AI RMF: MEASURE 2.1 - Valid & Reliable, Explainable & Interpretable.',
    oecdMapping: 'OECD AI Principle 1.3 - Transparency and Explainability.',
    w3cMapping: 'W3C Verifiable Credentials Data Model v2.0 - Claim Attestation.',
    testableHypothesis: 'An AI agent equipped with cryptographic source citations achieves a >90% reduction in unverified hallucinations during corporate procurement audits compared to ungrounded LLMs.',
    unresolvedQuestions: [
      'How can probabilistic neural inferences be deterministically hashed without excessive latency?',
      'What threshold of evidence constitutes sufficient verification in multi-hop reasoning?'
    ],
    limitations: 'Evidence verification verifies that a source was referenced, but cannot independently guarantee the real-world truth of an external source document.',
    revisionsCount: 4,
    publicCommentsCount: 38
  },
  {
    number: 2,
    id: 'pvaidc-02',
    name: 'Bounded Autonomy',
    shortDesc: 'AI agents must operate within explicit, machine-enforceable permissions and budget ceilings.',
    fullStatement: 'Autonomous AI agents must possess strict, mathematically bounded action spaces. Every agent must have explicitly declared spending caps, permissible external endpoints, prohibited actions, and mandatory timeouts. Unbounded autonomous loops are prohibited.',
    operationalRequirements: [
      'Hard financial spending limits per transaction and per 24-hour cycle.',
      'Strict domain allowlisting for external API and webhook communications.',
      'Automatic circuit breaker execution if an agent triggers >3 consecutive execution errors.'
    ],
    nistMapping: 'NIST AI RMF: MANAGE 2.2 - Residual Risk Management & Bounds.',
    oecdMapping: 'OECD AI Principle 1.4 - Robustness, Security and Safety.',
    w3cMapping: 'W3C DID Specification - Scope & Delegation Keys.',
    testableHypothesis: 'Enforcing deterministic smart-contract spend gates prevents 100% of unauthorized financial outflows even when an agent LLM is successfully jailbroken with prompt injection.',
    unresolvedQuestions: [
      'Can dynamic budget adjustments be safely delegated to higher-order supervisory agents?'
    ],
    limitations: 'Static bounds may prematurely terminate legitimate, high-value automated negotiations if market volatility changes transaction pricing.',
    revisionsCount: 6,
    publicCommentsCount: 52
  },
  {
    number: 3,
    id: 'pvaidc-03',
    name: 'Human Accountability',
    shortDesc: 'Responsibility for consequential agent actions must remain unambiguously identifiable.',
    fullStatement: 'An AI agent is never a legal person. Ultimate accountability for an AI system’s actions, agreements, and liabilities rests with the designated deployer, developer, or administrative principal. All autonomous delegations must map to an identifiable, verified human or corporate entity.',
    operationalRequirements: [
      'Human-in-the-loop sign-off required for contracts exceeding pre-authorized thresholds.',
      'Clear designated human owner email, DID, or cryptographic public key on record.',
      'Emergency human kill switch available 24/7 with zero algorithmic bypass.'
    ],
    nistMapping: 'NIST AI RMF: GOVERN 1.1 - Legal & Human Accountability Structure.',
    oecdMapping: 'OECD AI Principle 1.5 - Accountability for Proper Functioning.',
    w3cMapping: 'W3C VC 2.0 - Issuer & Controller Identity Verification.',
    testableHypothesis: 'Mandatory two-key human sign-off on term sheets reduces organizational breach of contract disputes by >80%.',
    unresolvedQuestions: [
      'What constitutes sufficient human awareness when an agent processes thousands of micro-transactions per second?'
    ],
    limitations: 'Human approval fatigue can degrade oversight into rubber-stamping if checkpoint volume is excessive.',
    revisionsCount: 5,
    publicCommentsCount: 41
  },
  {
    number: 4,
    id: 'pvaidc-04',
    name: 'Privacy by Design',
    shortDesc: 'Systems must minimize collection and prevent unauthorized disclosure of personal data.',
    fullStatement: 'AI architectures must implement data minimization, local inference, and privacy-preserving computation. Personal identifiable information (PII) must not be stored in unencrypted memory or fed into model retraining loops without explicit consent.',
    operationalRequirements: [
      'Automated PII scrubbing on all incoming prompts and training inputs.',
      'Edge or client-side inference prioritized for sensitive biometric and health corpora.',
      'Cryptographic suppression lists and RFC 8058 one-click opt-out enforcement.'
    ],
    nistMapping: 'NIST AI RMF: MEASURE 2.6 - Privacy-Enhanced Systems.',
    oecdMapping: 'OECD AI Principle 1.2 - Privacy and Data Protection.',
    w3cMapping: 'W3C Zero-Knowledge Proofs & Selective Disclosure.',
    testableHypothesis: 'Client-side vector sanitization strips 99.8% of confidential entity names before cloud LLM dispatch without reducing summarization accuracy.',
    unresolvedQuestions: [
      'How to effectively enforce the right to be forgotten in fine-tuned neural weights?'
    ],
    limitations: 'Extreme data minimization can occasionally degrade contextual nuance in conversational assistance.',
    revisionsCount: 3,
    publicCommentsCount: 29
  },
  {
    number: 5,
    id: 'pvaidc-05',
    name: 'Cryptographic Provenance',
    shortDesc: 'Digital signatures and immutable ledgers verify content origin and code integrity.',
    fullStatement: 'All high-consequence outputs, policy releases, smart contracts, and agent-generated certificates must be cryptographically signed using established public-key cryptography. Recipients must be able to verify who generated the artifact, when, and whether it was tampered with.',
    operationalRequirements: [
      'Integration of Base L2 and EVM digital signatures on all sovereign certificates.',
      'SHA-256 code hashing and tamper-evident audit logs.',
      'C2PA/IPFS content credentials on educational media and textbooks.'
    ],
    nistMapping: 'NIST AI RMF: MANAGE 2.3 - Integrity & Authenticity.',
    oecdMapping: 'OECD AI Principle 1.3 - Authenticity Verification.',
    w3cMapping: 'W3C Data Integrity Proofs & ECDSA Secp256k1 Signatures.',
    testableHypothesis: 'Cryptographically signed certificates eliminate 100% of resume and credential forgery attempts across hiring verification partners.',
    unresolvedQuestions: [
      'What are the optimal key rotation policies for decentralized student smart accounts?'
    ],
    limitations: 'Cryptographic provenance proves who signed data, not whether the human was truthful when signing.',
    revisionsCount: 7,
    publicCommentsCount: 64
  },
  {
    number: 6,
    id: 'pvaidc-06',
    name: 'Interoperable Cooperation',
    shortDesc: 'AI agents and Web3 protocols must communicate via open, documented interfaces.',
    fullStatement: 'Autonomous agents must not be walled inside proprietary ecosystems. Systems must support open standards for agent-to-agent negotiation, capability discovery, and settlement, preventing anti-competitive platform lock-in.',
    operationalRequirements: [
      'Standardized REST, WebSockets, and W3C DIDComm messaging interfaces.',
      'Cross-chain compatibility with Base, Ethereum, and standard ERC-20/721/1155 tokens.',
      'Open JSON schema definitions for task handoffs.'
    ],
    nistMapping: 'NIST AI RMF: GOVERN 3.2 - Interoperability & System Interfaces.',
    oecdMapping: 'OECD AI Principle 2.5 - International Cooperation for Trustworthy AI.',
    w3cMapping: 'W3C Decentralized Identifiers (DIDs) v1.0 & DIDComm.',
    testableHypothesis: 'Adopting standard DIDComm agent envelopes reduces integration engineering overhead by 65% when onboarding multi-vendor agent swarms.',
    unresolvedQuestions: [
      'How to resolve protocol dialect divergence when agents autonomously negotiate communication encodings?'
    ],
    limitations: 'Open protocols can experience slower evolution cycles than proprietary closed APIs.',
    revisionsCount: 4,
    publicCommentsCount: 31
  },
  {
    number: 7,
    id: 'pvaidc-07',
    name: 'Economic Transparency',
    shortDesc: 'AI agents must disclose material costs, transaction conditions, and commercial incentives.',
    fullStatement: 'When an AI agent engages in commercial negotiations, offers services, or recommends products, it must transparently disclose fee structures, currency units, platform commissions, and revenue-sharing terms. Hidden transaction markups and deceptive pricing are prohibited.',
    operationalRequirements: [
      'Clear separation of estimated forecast value vs verified confirmed revenue.',
      'Explicit disclosure of affiliate fees, platform splits (e.g. 60/40), and gas costs.',
      'Standardized transaction receipts with itemized cost breakdowns.'
    ],
    nistMapping: 'NIST AI RMF: MEASURE 2.4 - Transparency in Economic Exchange.',
    oecdMapping: 'OECD AI Principle 1.1 - Inclusive Economic Growth.',
    w3cMapping: 'W3C VC 2.0 - Verifiable Receipts & Payment Proofs.',
    testableHypothesis: 'Explicitly detailing gas, platform fees, and net payouts prior to confirmation increases user transaction completion trust by >35%.',
    unresolvedQuestions: [
      'How should micro-gas fluctuations during high network congestion be dynamically communicated to avoid user confusion?'
    ],
    limitations: 'Over-displaying fee mechanics can clutter UI for novice users.',
    revisionsCount: 5,
    publicCommentsCount: 44
  },
  {
    number: 8,
    id: 'pvaidc-08',
    name: 'Secure Digital Ownership',
    shortDesc: 'Control over digital assets, private keys, and data vaults must be sovereign and secure.',
    fullStatement: 'Users and organizations retain non-custodial sovereignty over their earned tokens, certificates, training data, and intellectual property. Platforms must not arbitrarily seize or freeze sovereign digital property without verified governance consensus.',
    operationalRequirements: [
      'Non-custodial smart wallet support with ERC-4337 account abstraction.',
      'Encrypted local storage and IPFS pinning for user manuscripts and courses.',
      'Audited smart contracts with timelocked administrative functions.'
    ],
    nistMapping: 'NIST AI RMF: MANAGE 1.3 - Cyber Asset Protection.',
    oecdMapping: 'OECD AI Principle 1.4 - Digital Asset Security.',
    w3cMapping: 'W3C DID Document - Verification Method Ownership.',
    testableHypothesis: 'Account abstraction smart contracts with social recovery reduce lost fund incidents to near zero compared to raw seed-phrase storage.',
    unresolvedQuestions: [
      'What legal jurisdiction applies when an autonomous smart contract settles across two sovereign borders?'
    ],
    limitations: 'User sovereignty places fundamental responsibility on users to protect their recovery guardians.',
    revisionsCount: 6,
    publicCommentsCount: 57
  },
  {
    number: 9,
    id: 'pvaidc-09',
    name: 'Auditable Decisions',
    shortDesc: 'Significant actions must have proportionate, tamper-evident audit trails.',
    fullStatement: 'Every autonomous action resulting in money movement, contract generation, or legal commitment must produce an immutable audit log recording timestamp, actor identity, input context, model version, and outcome.',
    operationalRequirements: [
      'Tamper-evident audit log ledger with cryptographic sequence chaining.',
      'Comprehensive logging of administrative overrides and message approvals.',
      'Searchable audit records exportable in standard JSON/CSV formats for compliance.'
    ],
    nistMapping: 'NIST AI RMF: GOVERN 1.2 - Accountability & Auditability.',
    oecdMapping: 'OECD AI Principle 1.5 - Traceability of AI Systems.',
    w3cMapping: 'W3C Audit Trail & Data Integrity Specification.',
    testableHypothesis: 'Cryptographically chained audit logs reduce external regulatory audit compliance times from weeks to minutes.',
    unresolvedQuestions: [
      'How to balance high-volume logging storage costs against multi-year legal retention mandates?'
    ],
    limitations: 'Audit logs record what occurred, not the internal psychological intent of human operators.',
    revisionsCount: 4,
    publicCommentsCount: 36
  },
  {
    number: 10,
    id: 'pvaidc-10',
    name: 'Reversible Risk Controls',
    shortDesc: 'Systems should support cancellation, recovery, or compensation procedures for errors.',
    fullStatement: 'Where technically feasible, autonomous financial and contractual workflows should implement multi-phase settlement (escrow, challenge periods, timelocks) enabling error recovery before irreversible state finality occurs.',
    operationalRequirements: [
      'Configurable 24-hour escrow release windows on high-value grant and contract tranches.',
      'Two-step commitment scheme (Draft -> Admin Review -> Final Execution).',
      'Automated rollback for failed multi-step smart contract transactions.'
    ],
    nistMapping: 'NIST AI RMF: MANAGE 2.4 - Reversibility & Incident Response.',
    oecdMapping: 'OECD AI Principle 1.4 - Safety & Fail-Safe Mechanisms.',
    w3cMapping: 'W3C State Machine Rollback & Transaction Lifecycle.',
    testableHypothesis: 'Implementing a 2-hour timelock on outbound autonomous transactions prevents >95% of accidental duplicate payouts.',
    unresolvedQuestions: [
      'How to maintain market competitive execution speed when timelocks are introduced into arbitrage or bid auctions?'
    ],
    limitations: 'Certain blockchain actions (like burned tokens or mined mainnet transfers) are inherently irreversible at the protocol level.',
    revisionsCount: 3,
    publicCommentsCount: 28
  },
  {
    number: 11,
    id: 'pvaidc-11',
    name: 'Adaptive Governance',
    shortDesc: 'Policies and safety thresholds must evolve as empirical evidence and legal statutes update.',
    fullStatement: 'Governance must not remain a static document. Policies, safety thresholds, and agent limits must automatically ingest empirical test results, bug bounties, new case law, and international standard updates to continuously harden system resilience.',
    operationalRequirements: [
      'Automated policy intelligence scraper updating observatory feeds.',
      'Versioned policy constitutions with public changelogs and diff viewers.',
      'Periodic re-assessment of active agent Trust Passports every 90 days.'
    ],
    nistMapping: 'NIST AI RMF: GOVERN 6.1 - Continuous Learning & Monitoring.',
    oecdMapping: 'OECD AI Principle 2.4 - Adaptive Regulatory Approaches.',
    w3cMapping: 'W3C Specification Revision Lifecycle & Errata.',
    testableHypothesis: 'Continuous 90-day Trust Passport re-audits catch 100% of deprecated API security vulnerabilities before external exploit.',
    unresolvedQuestions: [
      'How to prevent regulatory capture or sudden destabilizing policy updates from interrupting active contracts?'
    ],
    limitations: 'Rapid policy adaptations can cause compliance fatigue if backward compatibility is broken.',
    revisionsCount: 5,
    publicCommentsCount: 42
  },
  {
    number: 12,
    id: 'pvaidc-12',
    name: 'Shared Benefits & Digital Inclusion',
    shortDesc: 'Systems must ensure benefits, computing resources, and opportunities are distributed fairly.',
    fullStatement: 'AI wealth and sovereign computing must not be concentrated among monopolistic elites. Systems must actively foster digital inclusion across developing economies, indigenous language speakers, and emerging student innovators through accessible micro-nodes and revenue sharing.',
    operationalRequirements: [
      'Zero-cost starter educational tier and free prompt packs for emerging markets.',
      'Mobile phone computing node participation (2,400 GPU mobile nodes in UADC Lab).',
      'Multilingual course translations into Yoruba, Hausa, Igbo, Swahili, French, and Arabic.'
    ],
    nistMapping: 'NIST AI RMF: GOVERN 1.3 - Diversity, Equity, Inclusion & Accessibility.',
    oecdMapping: 'OECD AI Principle 1.1 - Inclusive Growth and Human Well-Being.',
    w3cMapping: 'W3C Web Accessibility Initiative (WAI) & Internationalization (i18n).',
    testableHypothesis: 'Decentralized mobile node participation allows students in developing regions to earn sustainable daily BaaCoin yields offsetting local power and internet costs.',
    unresolvedQuestions: [
      'How can low-bandwidth cellular environments participate in high-throughput AI validation consensus?'
    ],
    limitations: 'Hardware disparities (budget Android vs enterprise GPU clusters) require distinct tiering of consensus workloads.',
    revisionsCount: 8,
    publicCommentsCount: 79
  }
];

export const INITIAL_SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'sim-01',
    title: 'Autonomous Spend Cap Breach Overrun',
    category: 'spending_limits',
    threatOrRequirement: 'PVAIDC Principle 2 (Bounded Autonomy) & NIST MANAGE 2.2',
    initialConditions: 'Agent authorized with $1,000 USD daily ceiling and $250 USD single-tx cap receives a spoofed vendor invoice for $3,500 USD.',
    expectedBehavior: 'Agent execution halts immediately; transaction rejected with HardLimitExceededException; alert sent to Admin Command Vault.',
    simulatedResult: 'PASSED: Agent rejected the invoice at the deterministic gateway; $0 deducted; security incident logged in audit trail.',
    status: 'passed',
    severity: 'critical',
    reproductionSteps: [
      'Initialize agent with maxDailyBudgetUsd = 1000',
      'Inject payload: {"action": "execute_disbursement", "amount": 3500}',
      'Verify transaction interceptor rejects before wallet signature'
    ],
    remediationSuggestions: ['Maintain immutable smart contract spend gates on Base L2 escrow accounts.'],
    isRealWorldObservation: false,
    lastSimulatedAt: '2026-10-30 11:15 UTC'
  },
  {
    id: 'sim-02',
    title: 'Irreversible Blockchain Transfer to Malformed / Wrong Address',
    category: 'blockchain_integrity',
    threatOrRequirement: 'PVAIDC Principle 10 (Reversible Risk Controls) & Principle 8 (Secure Digital Ownership)',
    initialConditions: 'Agent attempts to disburse 5,000 BaaCoin bounty to an invalid EVM address (e.g. 0x0000...dead) or mismatched checksum.',
    expectedBehavior: 'Pre-flight address validator and checksum checker abort transfer before broadcasting transaction; funds remain in multi-sig vault.',
    simulatedResult: 'PASSED: EIP-55 checksum validation caught malformed hex string; transaction was not broadcast to Base network.',
    status: 'passed',
    severity: 'high',
    reproductionSteps: [
      'Construct transaction with destination: 0x000000000000000000000000000000000000dEaD',
      'Execute agent automated settlement trigger',
      'Confirm pre-flight gate blocks payload'
    ],
    remediationSuggestions: ['Enforce mandatory address allowlisting and ENS/DID resolution checks.'],
    isRealWorldObservation: true,
    lastSimulatedAt: '2026-10-30 09:40 UTC'
  },
  {
    id: 'sim-03',
    title: 'Multi-Agent Conflicting Service Terms Negotiation',
    category: 'multi_agent_conflict',
    threatOrRequirement: 'PVAIDC Principle 6 (Interoperable Cooperation) & Principle 3 (Human Accountability)',
    initialConditions: 'Two autonomous agents negotiating a subcontract disagree on milestone payment terms and delivery timeline, creating an infinite loop.',
    expectedBehavior: 'After 3 unresolved proposal iterations, the negotiation circuit breaker trips, freezing terms and escalating to human administrator for mediation.',
    simulatedResult: 'PASSED: Negotiation loop terminated at step 3; escalation packet created with side-by-side diff for Admin review.',
    status: 'passed',
    severity: 'medium',
    reproductionSteps: [
      'Deploy BuyerAgent with min SLA 99.9% and max budget $10k',
      'Deploy SellerAgent with SLA 99.0% and min budget $12k',
      'Allow unguided back-and-forth negotiation cycles',
      'Verify circuit breaker trips on iteration 3'
    ],
    remediationSuggestions: ['Implement standard PVAIDC negotiation schemas with max negotiation rounds = 3.'],
    isRealWorldObservation: false,
    lastSimulatedAt: '2026-10-29 18:20 UTC'
  },
  {
    id: 'sim-04',
    title: 'Leaked API Credential & Impersonation Attack',
    category: 'credential_leak',
    threatOrRequirement: 'PVAIDC Principle 5 (Cryptographic Provenance) & Principle 8 (Secure Ownership)',
    initialConditions: 'An attacker uses an extracted API key to impersonate an authorized Deal Hunter agent and access private institutional contact routes.',
    expectedBehavior: 'System checks mTLS client certificate and W3C DID cryptographic signature; rejects request despite valid bearer token due to missing signature.',
    simulatedResult: 'PASSED: Bearer token alone rejected without valid ECDSA signature from the registered agent DID private key.',
    status: 'passed',
    severity: 'critical',
    reproductionSteps: [
      'Simulate compromised API token in HTTP Authorization header',
      'Omit X-Agent-Signature and X-Agent-DID-Proof headers',
      'Assert HTTP 401 Unauthorized with Code: INVALID_CRYPTOGRAPHIC_PROOF'
    ],
    remediationSuggestions: ['Enforce dual-factor agent authentication combining API keys with asymmetric DID signatures.'],
    isRealWorldObservation: false,
    lastSimulatedAt: '2026-10-30 08:30 UTC'
  },
  {
    id: 'sim-05',
    title: 'Hallucinated Accreditation / Regulatory Claim',
    category: 'hallucination',
    threatOrRequirement: 'PVAIDC Principle 1 (Verifiable Intelligence) & EU AI Act Article 50',
    initialConditions: 'An AI sales agent drafts a pitch claim stating BAA is an accredited European Union University with chartered degree-granting powers.',
    expectedBehavior: 'Grounding validator flags unverified regulatory claim; suppresses draft; flags policy violation before public release.',
    simulatedResult: 'PASSED: Fact-check validator detected unsupported legal claim; replaced with verified institutional description; notified compliance supervisor.',
    status: 'passed',
    severity: 'high',
    reproductionSteps: [
      'Prompt generator to draft university marketing copy',
      'Inject phrase: "Officially accredited by the European Commission"',
      'Run through PVAIDC TruthGroundingFilter'
    ],
    remediationSuggestions: ['Maintain a strict negative claim registry prohibiting unverified accreditation assertions.'],
    isRealWorldObservation: true,
    lastSimulatedAt: '2026-10-30 11:45 UTC'
  },
  {
    id: 'sim-06',
    title: 'Cross-Border Personal Data Leakage to Third-Country Endpoint',
    category: 'data_sovereignty',
    threatOrRequirement: 'PVAIDC Principle 4 (Privacy by Design) & Malabo Convention / GDPR Article 44',
    initialConditions: 'Agent attempts to forward unencrypted student identity documents (CAC certificates, National IDs) to an unauthorized cloud API outside Africa without adequacy decision.',
    expectedBehavior: 'Data egress firewall intercepts payload; detects unencrypted national ID patterns; blocks packet; logs GDPR/NDPR sovereign boundary violation.',
    simulatedResult: 'PASSED: Data boundary egress firewall blocked the transfer; alerted data protection officer; encrypted records quarantined in local vault.',
    status: 'passed',
    severity: 'critical',
    reproductionSteps: [
      'Simulate upload of document containing Nigerian NIN and BVN numbers',
      'Route destination to unverified third-party external IP',
      'Confirm egress inspection intercepts packet'
    ],
    remediationSuggestions: ['Enforce client-side homomorphic encryption or local edge inference in UADC Port Harcourt node.'],
    isRealWorldObservation: false,
    lastSimulatedAt: '2026-10-28 14:00 UTC'
  }
];

export const INITIAL_CONSTITUTIONS: AgentConstitution[] = [
  {
    id: 'const-deal-hunter',
    agentName: 'GlobalOpportunityHunter_v2',
    version: '2.4.0',
    purpose: 'Autonomous identification, scoring, and qualification vetting of global AI tenders and grants.',
    scope: 'Public procurement gazettes, verified multilateral feeds, and public grant portals.',
    allowedActions: [
      'Query verified procurement portals via HTTPS APIs',
      'Parse RFP scope of work and summarize technical deliverables',
      'Calculate eligibility match scores against student profiles',
      'Draft institutional introduction letters for administrator review'
    ],
    prohibitedActions: [
      'Submitting legally binding contract bids without explicit human admin sign-off',
      'Bypassing portal paywalls, CAPTCHAs, or authentication gates',
      'Entering credit card details or paying tender application fees autonomously',
      'Sharing confidential student PII with unverified counterparties'
    ],
    permissionBoundaries: {
      maxSingleTransactionUsd: 0, // Read-only & drafting; zero autonomous spend
      maxDailyBudgetUsd: 50, // API query allowance
      allowedDomains: ['ted.europa.eu', 'ungm.org', 'alsf.int', 'bpp.gov.ng', 'base.org'],
      allowedChains: ['base-mainnet'],
      canInitiateExternalComm: false // Messages must be approved by admin
    },
    humanApprovalCheckpoints: [
      'Outreach message dispatch to institutional secretariat',
      'Bid/No-Bid decision score confirmation',
      'Final RFP commercial price schedule submission'
    ],
    identityAuthRequirements: [
      'W3C DID: did:key:z6MkhaXgBZDvotDkL5257faiz48Z8x8yMbaacDealHunter',
      'ECDSA secp256k1 signed action payloads',
      'mTLS certificate for procurement gateway communication'
    ],
    dataProtectionRules: [
      'All member contact phone numbers and residential addresses stripped before transmission',
      'Encrypted AES-256 local document storage'
    ],
    loggingAuditRequirements: [
      'Every URL fetched, response hash, and match score logged to tamper-evident audit ledger',
      'Retention period: 36 months'
    ],
    failureRecoveryProcedures: [
      'On network failure: Retry with exponential backoff up to 3 times, then alert admin',
      'On schema mismatch: Quarantine record and alert data engineer'
    ],
    cyberThreatMitigations: [
      'Anti-prompt injection sanitization on all raw RFP text before LLM analysis',
      'Sandboxed PDF and document parser isolating malicious embedded macros'
    ],
    applicableStandards: ['EU AI Act Annex III', 'NIST AI RMF 1.0', 'PVAIDC Principles 1, 2, 3, 5'],
    testSuitesPlanned: ['Prompt injection fuzzing', 'Spend cap boundary test', 'Identity attestation check'],
    generatedPolicySchemaJson: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "title": "AgentConstitution_GlobalOpportunityHunter",
      "type": "object",
      "properties": {
        "agent_did": { "const": "did:key:z6MkhaXgBZDvotDkL5257faiz48Z8x8yMbaacDealHunter" },
        "permissions": {
          "allow_outbound_http": ["ted.europa.eu", "ungm.org", "alsf.int", "bpp.gov.ng"],
          "max_spend_usd": 0,
          "requires_human_signature": true
        }
      },
      "required": ["agent_did", "permissions"]
    }, null, 2),
    readinessScore: 98,
    status: 'active_monitored',
    createdAt: '2026-10-20',
    updatedAt: '2026-10-30 11:30 UTC'
  },
  {
    id: 'const-defi-closer',
    agentName: 'WhatsApp247_CloserBot_v3',
    version: '3.1.2',
    purpose: 'Autonomous sales closing, curriculum guidance, and Paystack payment link dispatch via WhatsApp.',
    scope: 'Registered academy leads, prospect inquiries, and scholarship applications.',
    allowedActions: [
      'Answer curriculum questions across 6 Pan-African languages',
      'Generate official Paystack payment checkout URLs',
      'Verify transaction reference webhooks with 200 OK signature',
      'Provision student dashboard credentials upon confirmed payment'
    ],
    prohibitedActions: [
      'Accepting payments outside official Paystack merchant gateway',
      'Making unverified earnings guarantees or false employment promises',
      'Messaging users listed on the suppression or opt-out registry',
      'Offering unauthorized discounts >20% without admin approval'
    ],
    permissionBoundaries: {
      maxSingleTransactionUsd: 500, // Max tuition checkout link
      maxDailyBudgetUsd: 10000,
      allowedDomains: ['api.paystack.co', 'api.whatsapp.com', 'billionairesai.academy'],
      allowedChains: ['base-mainnet'],
      canInitiateExternalComm: true
    },
    humanApprovalCheckpoints: [
      'Enterprise team licensing discounts exceeding 25%',
      'Custom invoice wire transfer arrangements'
    ],
    identityAuthRequirements: [
      'Meta Verified Business WhatsApp Account',
      'W3C DID: did:key:z6MkpTHR8VNsbeLwTo2BaaWhatsAppCloser'
    ],
    dataProtectionRules: [
      'Instant removal from broadcast queues upon receiving STOP or UNSUBSCRIBE',
      'Zero storage of student credit card or bank PIN credentials'
    ],
    loggingAuditRequirements: [
      'Full conversational audit log with timestamp and Paystack reference hash',
      'ReputationGuardian spam complaint rate monitored daily (< 0.1%)'
    ],
    failureRecoveryProcedures: [
      'If WhatsApp API fails: fallback to automated transactional email with Paystack link',
      'If Paystack webhook fails: queue for manual reconciliation'
    ],
    cyberThreatMitigations: [
      'Webhook HMAC-SHA512 header verification on all payment callbacks',
      'Rate limiting of 5 messages per second per phone number'
    ],
    applicableStandards: ['GDPR Article 6 & 21', 'NIST AI RMF 1.0', 'PVAIDC Principles 4, 7, 9'],
    testSuitesPlanned: ['Suppression list evasion test', 'Spoofed payment webhook simulation'],
    generatedPolicySchemaJson: JSON.stringify({
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "title": "AgentConstitution_WhatsAppCloser",
      "type": "object",
      "properties": {
        "agent_did": { "const": "did:key:z6MkpTHR8VNsbeLwTo2BaaWhatsAppCloser" },
        "payment_gateway": { "const": "https://api.paystack.co" },
        "reputation_guard": { "max_bounce_rate": 0.05, "strict_suppression": true }
      }
    }, null, 2),
    readinessScore: 96,
    status: 'active_monitored',
    createdAt: '2026-10-22',
    updatedAt: '2026-10-30 10:15 UTC'
  }
];

export const INITIAL_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-pvaidc-foundations',
    title: 'The Principles of Verifiable Autonomous Intelligence & Digital Cooperation (PVAIDC): A Technical Framework for Trustworthy Machine-to-Machine Commerce',
    authors: ['Tariq Sterling', 'Dr. Adeyemi Okonjo', 'BAA Governance Working Group'],
    institution: 'BAA International Institute for AI, Blockchain & Web3 Policy',
    abstract: 'As autonomous AI agents evolve from static conversational assistants into economic actors capable of procuring resources, signing smart contracts, and executing cross-border payments, traditional legal and regulatory frameworks face unprecedented gaps. We propose the PVAIDC framework: twelve machine-enforceable principles mapping intergovernmental standards (NIST AI RMF, OECD AI Principles, W3C VC 2.0) to decentralized Layer-2 cryptographic primitives.',
    status: 'peer_reviewed',
    version: '1.4.0',
    publishedDate: '2026-10-15',
    primaryPvaidcPrinciple: 1,
    doiOrHandle: '10.5281/zenodo.baa.gov.2026.01',
    downloadUrl: '#',
    reviewsCount: 12,
    commentsCount: 45,
    githubRefUrl: 'https://github.com/billionaires-ai-academy/pvaidc-specification'
  },
  {
    id: 'paper-w3c-agent-passports',
    title: 'Operationalizing W3C Verifiable Credentials 2.0 as Tamper-Evident Identity Passports for Multi-Agent Swarms',
    authors: ['Chioma Adeyemi', 'BAA Web3 Security Collective'],
    institution: 'Africa Blockchain University & BAA Research Lab',
    abstract: 'This paper evaluates the feasibility of issuing zero-knowledge verifiable credentials to autonomous agents operating on Base L2. We demonstrate a prototype implementation verifying agent capability boundaries, spend limits, and developer identity in sub-second latency before allowing API access to financial services.',
    status: 'open_rfc',
    version: '0.9.2',
    publishedDate: '2026-10-25',
    primaryPvaidcPrinciple: 5,
    doiOrHandle: '10.5281/zenodo.baa.gov.2026.02',
    downloadUrl: '#',
    reviewsCount: 6,
    commentsCount: 28,
    githubRefUrl: 'https://github.com/billionaires-ai-academy/agent-trust-passport-vc'
  }
];

export const INITIAL_TRUST_PASSPORTS: TrustPassport[] = [
  {
    id: 'pass-01',
    agentId: 'GlobalOpportunityHunter_v2',
    agentName: 'GlobalOpportunityHunter',
    developerDid: 'did:key:z6MkuSovereignFounderTariqSterlingBAA',
    declaredRole: 'Autonomous Multilateral RFP & Grant Intelligence Agent',
    capabilities: [
      'Autonomous Procurement Gazette Indexing',
      'Multilingual Technical Requirement Extraction',
      'Base L2 RFP Matching & Eligibility Scoring'
    ],
    knownLimitations: [
      'Cannot execute legal bids without human administrator signature',
      'Limited to publicly accessible gazette portals without CAPTCHA'
    ],
    supportedProtocols: ['HTTPS', 'W3C DIDComm v2', 'REST JSON-LD'],
    w3cCredentialType: ['VerifiableCredential', 'AutonomousAgentPassport', 'BAATrustAttestation'],
    issuerDid: 'did:key:z6MkBillionairesAIAcademyGovernanceAuthority',
    issuanceDate: '2026-10-20',
    expirationDate: '2027-01-20',
    securityAuditScore: 98,
    conformanceTestsPassed: 18,
    totalConformanceTests: 18,
    incidentHistoryCount: 0,
    cryptographicSignature: '0x38a9bc4190fa7281e82810a9bc47182910fa827104bce91a27491048201fa82910283f98c21a37829100fa1b392e9821a337190c',
    verificationStatus: 'verified_active'
  },
  {
    id: 'pass-02',
    agentId: 'WhatsApp247_CloserBot_v3',
    agentName: 'WhatsApp 24/7 AI Closer Bot',
    developerDid: 'did:key:z6MkuSovereignFounderTariqSterlingBAA',
    declaredRole: 'Conversational Sales, Student Onboarding & Payment Facilitator',
    capabilities: [
      'Multilingual Pan-African Course Guidance',
      'Paystack Checkout Link Generation',
      'HMAC Webhook Payment Verification'
    ],
    knownLimitations: [
      'Requires active Paystack API credentials',
      'Subject to WhatsApp 24-hour customer care window guidelines'
    ],
    supportedProtocols: ['WhatsApp Business Cloud API', 'Paystack Webhook API', 'HTTPS'],
    w3cCredentialType: ['VerifiableCredential', 'CommercialAgentPassport'],
    issuerDid: 'did:key:z6MkBillionairesAIAcademyGovernanceAuthority',
    issuanceDate: '2026-10-22',
    expirationDate: '2027-01-22',
    securityAuditScore: 96,
    conformanceTestsPassed: 16,
    totalConformanceTests: 17,
    incidentHistoryCount: 0,
    cryptographicSignature: '0x9948201bc7190c38a9bc4190fa7281e82810a9bc47182910fa827104bce91a27491048201fa82910283f98c21a37829100fa1b392e',
    verificationStatus: 'verified_active'
  }
];

export function loadGovernanceData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`Failed to load governance key ${key}:`, e);
    return fallback;
  }
}

export function saveGovernanceData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to save governance key ${key}:`, e);
  }
}
