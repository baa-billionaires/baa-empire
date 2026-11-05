import { CeColonyMeta, CeColonyId } from '../types/ceColony';

export const CE_COLONIES_METADATA: CeColonyMeta[] = [
  {
    id: 'compute',
    orderNumber: 1,
    name: 'Compute Colony',
    tagline: 'Distributed GPU/CPU Workloads & Local Ollama Runtimes',
    shortDesc: 'Monetize idle workshop PCs, test benches, and GPU servers by processing verified, sandboxed AI inference and rendering jobs.',
    longDesc: 'Turns repair-shop hardware, customer test rigs, and high-performance engineering workstations into nodes on a decentralized AI grid. Supports local Ollama runtimes, sharded Ray workers, and zero-trust sandboxing to guarantee host isolation.',
    iconName: 'Cpu',
    badge: 'HIGH YIELD',
    revenueModel: '70% to Node Engineer · $0.20–$1.80 / compute-hour',
    targetParticipants: 'Repair shops, hardware bench technicians, computer labs, GPU owners',
    primaryMetric: {
      label: 'Active Compute Capacity',
      value: '1.42 PFLOPS',
      change: '+18.4% this week'
    },
    features: [
      'Automatic hardware benchmarking & capability detection',
      'Local Ollama, vLLM & Ray distributed worker integration',
      'Sandboxed Docker/Wasm container execution (host protected)',
      'Real-time temperature and wattage limits (max 75°C)',
      'Automated job matching with instant cryptographic payout'
    ]
  },
  {
    id: 'connectivity',
    orderNumber: 2,
    name: 'Connectivity Colony',
    tagline: 'Network Telemetry, Latency Probes & Uptime Monitoring',
    shortDesc: 'Monetize shop Wi-Fi and edge routers by executing automated latency probes, ISP outage radars, and distributed uptime contracts.',
    longDesc: 'Enterprise cloud providers and CDNs pay for hyper-local latency and packet-loss telemetry from real African and global broadband connections. Shop routers run non-invasive ping and HTTP availability checks 24/7 without consuming significant bandwidth.',
    iconName: 'Wifi',
    badge: 'PASSIVE 24/7',
    revenueModel: 'Fixed telemetry contracts · $15–$65 / router / month',
    targetParticipants: 'Cybercafés, internet service shops, campus IT departments',
    primaryMetric: {
      label: 'Monitored Routes',
      value: '460 Endpoints',
      change: '99.98% SLA Uptime'
    },
    features: [
      'Distributed ping, DNS resolution, and TCP handshake telemetry',
      'Local ISP outage radar and bandwidth throttling detection',
      'Lightweight background probe (< 1MB data / hour)',
      'Commercial SLA contracts with Cloudflare and CDN networks',
      'Automated monthly retainers paid directly in NGN / USD'
    ]
  },
  {
    id: 'data_refinery',
    orderNumber: 3,
    name: 'Data Refinery Colony',
    tagline: 'Document Digitization, Receipt OCR & PII Sanitization',
    shortDesc: 'Convert physical paper invoices, repair logbooks, and waybills into structured, verified JSON datasets with strict privacy protection.',
    longDesc: 'Millions of African and emerging-market businesses operate on paper receipts, physical ledger books, and paper waybills. CE Data Refinery empowers engineers to scan, OCR, sanitize PII, and deliver machine-readable datasets to enterprise logistics and fintechs.',
    iconName: 'FileSpreadsheet',
    badge: 'ENTERPRISE',
    revenueModel: '$0.05–$0.25 per processed page / invoice',
    targetParticipants: 'Computer business centers, print shops, document processing hubs',
    primaryMetric: {
      label: 'Pages Processed',
      value: '14,850 Documents',
      change: '100% PII Sanitized'
    },
    features: [
      'Multimodal OCR engine tuned for handwritten African invoices',
      'Automatic PII redaction (names, phone numbers, bank details)',
      'Cryptographic customer consent receipt verification',
      'Permanent deletion option after batch export',
      'Exports to CSV, JSON, and QuickBooks-ready schemas'
    ]
  },
  {
    id: 'ghost_engineer',
    orderNumber: 4,
    name: 'Ghost Engineer Colony',
    tagline: 'AI Knowledge Cloning & Procedural Repair Vectorization',
    shortDesc: 'Senior engineers clone their diagnostic intuition into autonomous AI repair agents, earning royalties whenever other technicians query them.',
    longDesc: 'Captures the decades of intuition held by master technicians who diagnose broken boards by touch, sound, and thermal cues. Vectorizes step-by-step diagnostic workflows into an AI agent that junior engineers worldwide pay to consult during complex repairs.',
    iconName: 'BrainCircuit',
    badge: 'ROYALTY ASSET',
    revenueModel: 'Per-query micro-royalties · $0.50–$3.00 / query',
    targetParticipants: 'Veteran computer technicians, micro-soldering specialists, electrical engineers',
    primaryMetric: {
      label: 'Cloned Procedures',
      value: '86 Verified Trees',
      change: '420 queries this week'
    },
    features: [
      'Audio & video repair session transcription and extraction',
      'Procedural fault-tree vectorization into RAG knowledge bases',
      'Smart diagnostic branching: symptom -> test points -> fix',
      'Perpetual on-chain royalty attribution to the authoring engineer',
      'Interactive voice & chat assistant for workbench queries'
    ]
  },
  {
    id: 'repair_intelligence',
    orderNumber: 5,
    name: 'Repair Intelligence Colony',
    tagline: 'AI Motherboard Diagnostics & Automated Quotations',
    shortDesc: 'Interactive diagnostic neural net highlighting faulty power rails, shorted capacitors, and generating instant client repair quotes.',
    longDesc: 'Elevates everyday repair shops with aerospace-grade diagnostic AI. Technicians input symptoms, voltage readings, or error codes; the model calculates component failure probabilities, pinpoints test points on motherboard schematics, and generates client-facing quotes in seconds.',
    iconName: 'Wrench',
    badge: 'CORE TOOL',
    revenueModel: 'Higher shop repair throughput · +35% job margin',
    targetParticipants: 'Laptop repairers, smartphone technicians, electronics engineers',
    primaryMetric: {
      label: 'Diagnostics Run',
      value: '312 Boards',
      change: '97.4% accuracy'
    },
    features: [
      'Power rail schematic probe guidance (3.3V, 5V, VCore, PMIC)',
      'Blue screen (BSOD) minidump and kernel crash analyzer',
      'Automated parts + labor quotation generator with local NGN pricing',
      'Customer intake ticket and SMS/WhatsApp status dispatch',
      'Thermal imaging hot-spot correlation guidance'
    ]
  },
  {
    id: 'hardware_exchange',
    orderNumber: 6,
    name: 'Hardware Asset Exchange',
    tagline: 'Refurbished Hardware Marketplace & Escrow Verification',
    shortDesc: 'Trade certified refurbished laptops, tested GPUs, and harvested components with cryptographically verified benchmark passports.',
    longDesc: 'Replaces untrusted second-hand hardware trading with an escrow-backed exchange. Every listed motherboard, laptop, or GPU carries a verified hardware passport verifying stress test results, VRAM integrity, and battery cycle health before money leaves escrow.',
    iconName: 'ShoppingBag',
    badge: 'ESCROW BACKED',
    revenueModel: '5% escrow fee on hardware trades + commission',
    targetParticipants: 'Hardware traders, refurbishers, component recyclers, gamers',
    primaryMetric: {
      label: 'Escrow Volume',
      value: '$18,400 USD',
      change: '45 Active Listings'
    },
    features: [
      'Universal Hardware Passport cryptographic verification stamp',
      'Automated stress test score verification (3DMark, FurMark, MemTest)',
      'Escrow payment release upon buyer benchmark confirmation',
      'Salvage part harvesting calculator for dead motherboards',
      'Integrated Paystack card and bank checkout in NGN & USD'
    ]
  },
  {
    id: 'network_services',
    orderNumber: 7,
    name: 'Network Infrastructure Services',
    tagline: 'Automated Router Configs & Remote Managed Network SLAs',
    shortDesc: 'Generate hardened configs for MikroTik, pfSense, and Cisco routers, and offer managed network monitoring to local SMEs.',
    longDesc: 'Enables network technicians to provide enterprise-grade remote management to schools, hospitals, hotels, and retail stores. Includes an instant config generator for VLANs, firewall rules, bandwidth throttling, and captive portals.',
    iconName: 'Network',
    badge: 'SME RETAINERS',
    revenueModel: 'Monthly recurring network retainers · $80–$350 / client',
    targetParticipants: 'Network administrators, field technicians, IT consultants',
    primaryMetric: {
      label: 'Managed Routers',
      value: '94 Commercial APs',
      change: '28 Active Contracts'
    },
    features: [
      'One-click configuration generator (MikroTik RouterOS, pfSense, Cisco)',
      'VLAN isolation, bandwidth queues, and failover dual-WAN scripting',
      'Wi-Fi coverage heatmap analysis and channel optimizer',
      'Automated backup of router configuration scripts to cloud',
      'Security audit and brute-force protection hardening rules'
    ]
  },
  {
    id: 'skill_licensing',
    orderNumber: 8,
    name: 'Knowledge and Skill Licensing Colony',
    tagline: 'Institutional Curriculum, Masterclasses & Micro-Credentials',
    shortDesc: 'Publish hands-on micro-soldering and computer engineering courses licensed by vocational institutes, polytechnics, and cybercafés.',
    longDesc: 'Monetizes deep technical expertise through accredited curriculum packages. Senior engineers earn ongoing royalties when technical institutes and academies license their lab manuals, diagnostic schematics, and video masterclasses for student cohorts.',
    iconName: 'GraduationCap',
    badge: 'ACCREDITED',
    revenueModel: 'Institutional licensing subscriptions · $150–$500 / term',
    targetParticipants: 'Technical instructors, academy authors, master technicians',
    primaryMetric: {
      label: 'Licensed Learners',
      value: '340 Students',
      change: '12 Institutes'
    },
    features: [
      'Accredited curriculum modules (BGA reballing, schematics, boardview)',
      'Interactive quizzes and digital proof-of-competence certs',
      'Institutional dashboard for student grading and lab supervision',
      'Base L2 Soulbound NFT verification for graduating engineers',
      'Automated revenue share distribution between author and BAA'
    ]
  },
  {
    id: 'managed_it',
    orderNumber: 9,
    name: 'Managed IT and Cybersecurity Colony',
    tagline: 'SME Endpoint SOC, Patch Automation & Backup Compliance',
    shortDesc: 'Offer continuous cybersecurity monitoring, patch deployment, and automated backup audits to local legal, accounting, and retail firms.',
    longDesc: 'Gives computer engineers the tooling of a Fortune 500 Security Operations Center (SOC). Monitor client PCs, detect pending critical zero-day vulnerabilities, verify offsite backups, and bill recurring monthly retainers automatically.',
    iconName: 'ShieldCheck',
    badge: 'HIGH MARGIN',
    revenueModel: '$10–$25 / monitored endpoint / month',
    targetParticipants: 'IT support shops, managed service providers (MSPs), security techs',
    primaryMetric: {
      label: 'Protected Endpoints',
      value: '410 Workstations',
      change: '99.98% SLA Compliance'
    },
    features: [
      'Lightweight cross-platform telemetry agent for Windows, Linux, macOS',
      'Zero-day vulnerability CVE alert scanner with one-click patches',
      'Automated verification of daily local and cloud backups',
      'Branded monthly executive security reports for business owners',
      'Automated monthly invoice generator via Paystack'
    ]
  },
  {
    id: 'edge_ai',
    orderNumber: 10,
    name: 'Edge AI and Local Appliance Colony',
    tagline: 'Air-Gapped Private LLM Appliances for Clinics & Law Firms',
    shortDesc: 'Build, configure, and deploy private offline AI appliances running local LLMs and RAG vector search for confidential organizations.',
    longDesc: 'Clinics, law firms, and schools cannot legally upload patient or case records to public cloud AI. CE engineers assemble mini-PCs into private on-premise AI appliances that search thousands of internal documents locally with zero internet dependency.',
    iconName: 'Server',
    badge: 'PRIVATE & SAFE',
    revenueModel: 'Hardware setup fee ($450–$1,200) + $60/mo maintenance',
    targetParticipants: 'Custom PC builders, systems integrators, enterprise developers',
    primaryMetric: {
      label: 'Deployed Appliances',
      value: '18 Systems',
      change: '12,400 Private Queries'
    },
    features: [
      'Pre-configured Ollama + Qdrant / Chroma local vector store',
      'Air-gapped privacy assurance: zero data ever leaves the local LAN',
      'Domain-tuned models (Medical, Legal, Accounting, School Curricula)',
      'Turnkey web chat interface accessible across office Wi-Fi',
      'Remote health monitoring heartbeat and model update updater'
    ]
  },
  {
    id: 'research_innovation',
    orderNumber: 11,
    name: 'Engineering Research and Innovation Colony',
    tagline: 'Hardware Reverse Engineering, Diagnostic Tooling & Bounties',
    shortDesc: 'Collaborative engineering R&D solving impossible board repairs, designing 3D-printed workshop tools, and earning research bounties.',
    longDesc: 'Connects hardware hackers and researchers across the globe to reverse-engineer proprietary motherboard schematics, crack locked EC firmware, and pool resources for bulk electronic component imports from Shenzhen factories.',
    iconName: 'Sparkles',
    badge: 'BOUNTIES',
    revenueModel: 'Community bounties ($200–$3,500) + bulk component savings',
    targetParticipants: 'Hardware hackers, embedded systems designers, makers',
    primaryMetric: {
      label: 'Active Bounties',
      value: '9 Open Tasks',
      change: '$8,400 in Escrow'
    },
    features: [
      'Open hardware bounties for reverse engineering difficult chipsets',
      'Open-source repository of 3D printable test jigs and soldering aids',
      'Group-buying cooperative for genuine BGA chips and Mosfets',
      'Peer-reviewed schematic correction and boardview annotations',
      'Direct contribution rewards paid in BaaCoin and USD'
    ]
  },
  {
    id: 'engineer_opportunity',
    orderNumber: 12,
    name: 'Engineer Opportunity and Client Colony',
    tagline: 'Commercial Contract Radar, Automated Proposals & Escrow',
    shortDesc: 'Match certified computer engineers with lucrative corporate tenders, university lab overhauls, and remote IT service contracts.',
    longDesc: 'The definitive business development engine for computer engineers. AI scans commercial tenders across banks, government agencies, schools, and global companies, generates competitive proposal documents, and manages milestone escrow payments.',
    iconName: 'Briefcase',
    badge: 'CAREER & WEALTH',
    revenueModel: 'Direct contract value ($500–$15,000) with 5% escrow',
    targetParticipants: 'Contractors, engineering firms, freelance technicians',
    primaryMetric: {
      label: 'Active Tenders',
      value: '24 Verified Jobs',
      change: '38 Contracts Matched'
    },
    features: [
      'AI tender matching engine analyzing engineer node ratings and tools',
      'Automated technical proposal and SLA contract draft generator',
      'Milestone-locked Paystack escrow protecting technician compensation',
      'Client rating and verified work portfolio on Base L2 blockchain',
      'Dispute resolution and work verification consensus protocol'
    ]
  }
];
