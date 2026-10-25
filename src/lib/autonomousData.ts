import {
  AIWorkforceAgent,
  OmniAdCampaign,
  StakingPool,
  MicroStartupSwarm,
  ProjectProposal,
  StudentSpotlight,
  TopStakerLeaderboardItem
} from '../types';

export const INITIAL_AI_WORKFORCE: AIWorkforceAgent[] = [
  {
    id: 'agent-closer-01',
    name: 'Executive Deal Closer Agent',
    tagline: 'Autonomous 24/7 B2B negotiation, contract drafting, and Paystack closing',
    category: 'Personal Assistants',
    description: 'Trained on 50,000+ enterprise sales conversations. Autonomously handles inbound inquiries, schedules meetings, negotiates discounts within your profit boundaries, and issues payment links.',
    hourly_rate_baacoin: 15,
    monthly_rate_usd: 29,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    capabilities: [
      'Autonomous WhatsApp & Email Negotiation',
      'Dynamic Pricing & Custom Contract Generation',
      'Instant Paystack / Stripe Invoicing',
      'Objection Handling in 9 Languages'
    ],
    autonomous_loop_preview: [
      '00:02:14 - Inbound lead detected from Lagos tech firm (CEO)',
      '00:02:18 - Analyzed budget & previous deal patterns via CRM',
      '00:02:24 - Dispatched tailored value proposal with 15% early-bird incentive',
      '00:02:40 - Client accepted; generated Paystack invoice ₦350,000',
      '00:03:01 - Payment confirmed; auto-provisioned client workspace & notified founder'
    ],
    active_deployments: 412,
    rating: 4.96,
    system_core: 'Gemini 2.5 Flash Enterprise + AutoMode Neural Protocol',
    creator_name: 'Emmanuel Bassey Joe & Automode AI Team',
    is_verified: true
  },
  {
    id: 'agent-fintech-02',
    name: 'FinTech Underwriter Swarm',
    tagline: 'Sub-second micro-loan credit scoring, bank statement parsing & fraud triage',
    category: 'Industry Swarms',
    description: 'Deploys a swarm of 5 micro-agents that cross-reference BVN, transaction velocity, utility bills, and social graphs to underwrite loans in 800 milliseconds.',
    hourly_rate_baacoin: 25,
    monthly_rate_usd: 49,
    avatar_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=80',
    capabilities: [
      'Multi-Bank Statement PDF Ingestion',
      'Algorithmic Default Risk Prediction',
      'Instant Fraud Blacklist Verification',
      'Direct Central Bank Compliance Auditing'
    ],
    autonomous_loop_preview: [
      '14:10:02 - Received loan application for ₦500k from Ibadan merchant',
      '14:10:03 - Extracted 12-month Mono bank statement; detected ₦2.1M monthly turnover',
      '14:10:04 - Risk score computed: 88/100 (Low default probability)',
      '14:10:05 - Loan approved; terms smart contract deployed on Base L2'
    ],
    active_deployments: 189,
    rating: 4.92,
    system_core: 'Autostack Multi-Agent Finance Kernel v4',
    creator_name: 'BAA Student Team FinMatrix',
    is_verified: true
  },
  {
    id: 'agent-pitch-03',
    name: 'Silicon Valley Pitch Crafter Legion',
    tagline: 'YC/Sequoia caliber deck drafting, financial modeling & investor matchmaker',
    category: 'Strategic Legions',
    description: 'Turns raw napkin ideas into institutional-grade pitch decks, complete with 3-year DCF models, TAM/SAM/SOM calculations, and direct RichConnect investor matching.',
    hourly_rate_baacoin: 35,
    monthly_rate_usd: 69,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    capabilities: [
      'Full 12-Slide Pitch Deck Generation',
      '3-Year P&L / Cash Flow Financial Projections',
      'Competitive Matrix & Moat Architecture',
      'Direct Matchmaking into RichConnect Angel Pool'
    ],
    autonomous_loop_preview: [
      '09:15:30 - Ingested student startup memo: "AgroSolar Cold Chain"',
      '09:16:02 - Synthesized market sizing: $4.2B African post-harvest loss TAM',
      '09:16:45 - Rendered 12 SVG slide visuals with high-converting typography',
      '09:17:10 - Connected deck to 3 vetted angel investors in RichConnect network'
    ],
    active_deployments: 340,
    rating: 4.98,
    system_core: 'TrillionaresOS Venture Engine',
    creator_name: 'BAA Venture Lab',
    is_verified: true
  },
  {
    id: 'agent-corp-04',
    name: 'Autonomous E-Commerce Colony',
    tagline: 'Self-driving dropshipping & product business running 100% on autopilot',
    category: 'Corporate Colonies',
    description: 'A complete corporate colony of 12 autonomous sub-agents: 1 Trend Hunter, 1 Supplier Negotiator, 3 Copywriters, 2 Ad Media Buyers, and 5 Customer Care bots operating around the clock.',
    hourly_rate_baacoin: 60,
    monthly_rate_usd: 120,
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    capabilities: [
      'Autonomous Trending Product Sourcing',
      'Supplier Auto-Ordering & Tracking',
      'Live TikTok/Meta Ad Optimization',
      'Full Customer Dispute Resolution'
    ],
    autonomous_loop_preview: [
      '03:00:12 - Trend Agent identified 400% surge in portable solar chargers',
      '03:01:40 - Colony spun up landing page and launched $50 test ad campaign',
      '04:30:15 - Generated 18 orders ($1,260 revenue); auto-ordered from supplier',
      '05:00:00 - Dispatched tracking numbers to buyers and balanced treasury'
    ],
    active_deployments: 95,
    rating: 4.89,
    system_core: 'WorkOS + Automode Corporate Kernel',
    creator_name: 'CodeOrbit & MODE Digital Labs',
    is_verified: true
  },
  {
    id: 'agent-tutor-trainer-05',
    name: 'Global Teacher & School Owner AI Trainer',
    tagline: 'Accredits global educators to deploy autonomous AI classrooms and curricula',
    category: 'Personal Assistants',
    description: 'Specialized autonomous mentor designed to train school owners, university lecturers, and corporate L&D leaders on how to integrate multi-lingual AI tutors, Study-to-Earn economies, and PoK certifications into their schools.',
    hourly_rate_baacoin: 20,
    monthly_rate_usd: 39,
    avatar_url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=300&auto=format&fit=crop&q=80',
    capabilities: [
      'Autonomous Teacher Lesson Plan Generation',
      'School AI Curriculum Alignment (STEM/Humanities)',
      'Multi-Lingual Student Assessment Automation',
      'ABAU Certified Master AI Educator Accreditation'
    ],
    autonomous_loop_preview: [
      '11:00:10 - Connected with principal of 1,200-student high school in Nairobi',
      '11:02:00 - Built customized 16-week Autonomous AI & Robotics syllabus',
      '11:03:30 - Provisioned 35 AI Tutor accounts with Swahili & English speech',
      '11:05:00 - Issued ABAU Certified Educational Institution seal'
    ],
    active_deployments: 280,
    rating: 4.95,
    system_core: 'Africa Blockchain & AI University (ABAU) Core',
    creator_name: 'BAA Faculty of Education',
    is_verified: true
  },
  {
    id: 'agent-crypto-06',
    name: 'DeFi Yield Harvester & Arbitrage Legion',
    tagline: 'Autonomous cross-DEX liquidity farming and flash loan yield balancer',
    category: 'Strategic Legions',
    description: 'Monitors Base L2, Uniswap, and local P2P remittance spreads to maximize APY on student staking pools while guaranteeing principal capital preservation.',
    hourly_rate_baacoin: 30,
    monthly_rate_usd: 59,
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    capabilities: [
      'Sub-Second DEX Price Discrepancy Execution',
      'Impermanent Loss Hedging Algorithms',
      'Automated Gas Optimization on Base L2',
      'Daily Compounding Yield Distribution'
    ],
    autonomous_loop_preview: [
      '07:22:01 - Detected 0.8% arbitrage between Uniswap Base pool and Binance P2P',
      '07:22:02 - Executed flash swap; captured $340 gross profit',
      '07:22:03 - Reinvested 75% into UBEI Student Vault and 25% to BAA buyback'
    ],
    active_deployments: 160,
    rating: 4.91,
    system_core: 'BaaCoin Sovereign Vault Protocol',
    creator_name: 'BAA Quant Labs',
    is_verified: true
  }
];

export const INITIAL_OMNI_AD_CAMPAIGNS: OmniAdCampaign[] = [
  {
    id: 'camp-seo-01',
    title: 'High-Intent Student Search & AI Overviews',
    channel: 'Google Search & SEO',
    status: 'scaling',
    daily_budget_usd: 350,
    impressions: 1420000,
    clicks: 68400,
    conversions: 4120,
    ctr: '4.82%',
    cpa_usd: 2.10,
    autonomous_trigger: 'Surge in "earn money with phone Africa" keyword velocity'
  },
  {
    id: 'camp-tiktok-02',
    title: 'Viral Auto-Clips & Student Millionaire Proofs',
    channel: 'TikTok & Reels Viral',
    status: 'active',
    daily_budget_usd: 500,
    impressions: 2890000,
    clicks: 142000,
    conversions: 8940,
    ctr: '4.91%',
    cpa_usd: 1.45,
    autonomous_trigger: 'Every student earning milestone auto-generates 15s viral video'
  },
  {
    id: 'camp-x-03',
    title: 'Autonomous Thought Leadership & Builder Swarm',
    channel: 'X / Twitter AI Bots',
    status: 'scaling',
    daily_budget_usd: 200,
    impressions: 890000,
    clicks: 42100,
    conversions: 2150,
    ctr: '4.73%',
    cpa_usd: 1.85,
    autonomous_trigger: 'Real-time trending tech discussions in Nigeria, Kenya, Ghana & South Africa'
  },
  {
    id: 'camp-meta-04',
    title: 'Parent & School Owner AI Transformation Pitch',
    channel: 'Meta & Instagram',
    status: 'optimizing',
    daily_budget_usd: 400,
    impressions: 1150000,
    clicks: 53200,
    conversions: 3410,
    ctr: '4.62%',
    cpa_usd: 2.34,
    autonomous_trigger: 'Targeting university alumni & private school administrators'
  },
  {
    id: 'camp-mesh-05',
    title: 'UADC Decentralized Node Lockscreen Ads',
    channel: 'Decentralized Ad Mesh',
    status: 'active',
    daily_budget_usd: 150,
    impressions: 640000,
    clicks: 39100,
    conversions: 2980,
    ctr: '6.11%',
    cpa_usd: 0.98,
    autonomous_trigger: 'Phone charging & idle node verification events'
  }
];

export const INITIAL_STAKING_POOLS: StakingPool[] = [
  {
    id: 'pool-h100',
    name: 'Universal Autonomous AI GPU Cluster Alpha',
    tier: 'Institutional / Pro',
    apy_percent: 42.8,
    total_staked_baacoin: 485000,
    lockup_days: 90,
    daily_yield_usd: 568.40,
    power_source: 'NVIDIA H100 Tensor Core GPU Cluster (UAIDC Lab)',
    status: 'active'
  },
  {
    id: 'pool-mesh',
    name: 'Decentralized Student Phone Node Mesh',
    tier: 'Community / Student',
    apy_percent: 34.2,
    total_staked_baacoin: 320000,
    lockup_days: 30,
    daily_yield_usd: 299.80,
    power_source: '2,400+ Active Charging Smartphone Nodes',
    status: 'active'
  },
  {
    id: 'pool-ubei',
    name: 'Universal Basic Education Income (UBEI) Vault',
    tier: 'Social Impact & High Yield',
    apy_percent: 28.6,
    total_staked_baacoin: 650000,
    lockup_days: 180,
    daily_yield_usd: 509.30,
    power_source: 'Autonomous 15% Platform Commission Redistribution',
    status: 'active'
  }
];

export const INITIAL_MICRO_STARTUPS: MicroStartupSwarm[] = [
  {
    id: 'startup-01',
    name: 'LegalEase Africa AI',
    prompt_origin_title: 'Corporate Tenancy & CAC Drafting Neural Prompt',
    student_creator: 'Chidubem Okoye (BAA Cohort 3)',
    valuation_usd: 140000,
    mrr_usd: 4800,
    growth_rate: '+34% MoM',
    agents_deployed: 6,
    autonomous_status: 'Self-serving 42 law firms in Lagos & Abuja',
    hub: 'Lagos & Abuja Hubs',
    hubs: ['Lagos Hub', 'Abuja Hub'],
    direct_url: 'https://legalease-ai.africa',
    dashboard_link: '#venture-dashboard-legalease',
    cac_number: 'RC: 1948201',
    wema_verified: true,
    equity_contract_address: '0x71c8a392b44c10283f98c21a37829100fa1b392e',
    backed_amount_baacoin: 21500,
    backed_amount_usd: 21930,
    angel_backers_count: 64,
    venture_capital_backers: ['Synergy African Angels', 'MicroWork Capital', 'Ventures Platform']
  },
  {
    id: 'startup-02',
    name: 'AgroScanner Vision & Drone Mesh',
    prompt_origin_title: 'Cassava Blight & Maize Pest Identification Model',
    student_creator: 'Amina Bello (BAA Cohort 2)',
    valuation_usd: 220000,
    mrr_usd: 7200,
    growth_rate: '+48% MoM',
    agents_deployed: 14,
    autonomous_status: 'Integrated with 18 cooperatives in Northern Nigeria & Rift Valley',
    hub: 'Nairobi & Abuja Hubs',
    hubs: ['Nairobi Hub', 'Abuja Hub', 'Accra Hub'],
    direct_url: 'https://agroscanner.vision',
    dashboard_link: '#venture-dashboard-agroscan',
    cac_number: 'BN: KD/384910',
    wema_verified: false,
    equity_contract_address: '0x3841fb20a94b8102d9a3857b291a4b8301ec9481',
    backed_amount_baacoin: 28000,
    backed_amount_usd: 28560,
    angel_backers_count: 92,
    venture_capital_backers: ['Pan-African Agritech Syndicate', 'East African Angel Network']
  },
  {
    id: 'startup-03',
    name: 'Nollywood & Pan-African Voice Studio',
    prompt_origin_title: 'Hyper-Realistic Multi-Lingual African Voice Clone',
    student_creator: 'Kofi Mensah (BAA Cohort 4)',
    valuation_usd: 350000,
    mrr_usd: 12500,
    growth_rate: '+62% MoM',
    agents_deployed: 22,
    autonomous_status: 'Dubbed 4 feature films on Netflix and YouTube across 9 languages',
    hub: 'Accra & Johannesburg Hubs',
    hubs: ['Accra Hub', 'Johannesburg Hub', 'Lagos Hub'],
    direct_url: 'https://nollywoodvoice.ai',
    dashboard_link: '#venture-dashboard-voice',
    cac_number: 'GH-CS/094821',
    wema_verified: false,
    equity_contract_address: '0x9482a17cb49a0293d8471b028471038491028371',
    backed_amount_baacoin: 9200,
    backed_amount_usd: 9384,
    angel_backers_count: 39,
    venture_capital_backers: ['AfroBeat Media Ventures', 'Base Ecosystem Innovation Fund']
  },
  {
    id: 'startup-04',
    name: 'Port Harcourt Hydro-Solar Compute Grid & UADC Node Mesh',
    prompt_origin_title: 'Universal Autonomous AI Data Center (2,400 Nodes)',
    student_creator: 'Emmanuel Bassey Joe (Cohort 1 Lead Fellow)',
    valuation_usd: 580000,
    mrr_usd: 21400,
    growth_rate: '+74% MoM',
    agents_deployed: 36,
    autonomous_status: '2,400+ charging smartphone nodes providing continuous off-grid inference',
    hub: 'Port Harcourt & Lagos Hubs',
    hubs: ['Port Harcourt Hub', 'Lagos Hub', 'Johannesburg Hub'],
    direct_url: 'https://billionairesai.academy/#uadc-lab',
    dashboard_link: '#venture-dashboard-uadc',
    cac_number: 'BN: UY/009049',
    wema_verified: true,
    equity_contract_address: '0xb44c91f4a9831002bf092837418291048201fa92',
    backed_amount_baacoin: 72000,
    backed_amount_usd: 73440,
    angel_backers_count: 148,
    venture_capital_backers: ['Rossyst Technical Guild', 'UAIDC Clean Power Labs', 'Wema ALAT Accelerator']
  }
];

// Multi-Lingual AI Tutor canned conversational responses in 9 languages
export const MULTILINGUAL_TUTOR_SCRIPTS: Record<string, {
  welcome: string;
  s2e_explanation: string;
  money_engine: string;
  trainer_guidance: string;
}> = {
  en: {
    welcome: 'Hello! I am your Autonomous Multi-Lingual AI Tutor. How can I accelerate your learning, prompt minting, or billionaire business today?',
    s2e_explanation: 'In our 6-month Study-to-Earn cohort, every lecture query you solve is distilled by our neural compiler into sellable prompt modules. You keep 60% of all marketplace sales!',
    money_engine: 'BaaCoin is pegged at $1.00 USD baseline with a perpetual buyback burn engine from 11 platforms. Your 10x tuition networth is locked safely until graduation.',
    trainer_guidance: 'For educators and school owners: We provide certified train-the-trainer pathways allowing you to deploy autonomous AI classrooms across your campus in 48 hours.'
  },
  sw: {
    welcome: 'Habari! Mimi ni Mkufunzi wako wa AI wa Lugha Nyingi. Je, ninawezaje kukusaidia kujifunza, kuchimba BaaCoin, na kujenga biashara yako leo?',
    s2e_explanation: 'Katika mfumo wetu wa Soma-Ili-Upate wa miezi 6, kila utafiti unaofanya unageuzwa kuwa moduli za kidijitali za kuuza. Unapata 60% ya mapato yote!',
    money_engine: 'BaaCoin ina thamani ya msingi ya $1.00 USD na thamani yake inaongezeka kila siku kupitia injini yetu ya kipekee ya ununuzi wa mapato ya miradi 11.',
    trainer_guidance: 'Kwa walimu na wamiliki wa shule: Tunatoa mafunzo ya kuidhinishwa ya kimataifa ili uweze kuanzisha darasa la AI katika shule yako ndani ya saa 48.'
  },
  fr: {
    welcome: 'Bonjour! Je suis votre tuteur IA autonome multilingue. Comment puis-je accélérer votre apprentissage, le minage de BaaCoin et votre entreprise aujourd\'hui?',
    s2e_explanation: 'Dans notre cohorte Étudier-pour-Gagner de 6 mois, vos recherches sont automatiquement compilées en modules de prompts vendables. Vous recevez 60% des ventes!',
    money_engine: 'Le BaaCoin est indexé à 1,00 $ USD de base avec un protocole de rachat perpétuel qui fait grimper sa valeur grâce aux bénéfices de nos 11 plateformes.',
    trainer_guidance: 'Pour les enseignants et directeurs d\'écoles: Nous certifions les formateurs pour déployer des classes autonomes d\'IA dans vos établissements en 48 heures.'
  },
  es: {
    welcome: '¡Hola! Soy tu tutor de IA multilingüe autónomo. ¿Cómo puedo ayudarte a aprender, minar BaaCoin y lanzar tu negocio hoy?',
    s2e_explanation: 'En nuestro programa Estudiar-para-Ganar de 6 meses, cada investigación se empaqueta en módulos de prompts comerciales. ¡Conservas el 60% de cada venta!',
    money_engine: 'BaaCoin está anclado a $1.00 USD de base con un motor de recompra perpetua respaldado por nuestras 11 plataformas africanas.',
    trainer_guidance: 'Para educadores y directores de instituciones: Ofrecemos certificación global para implementar aulas autónomas de IA en 48 horas.'
  },
  zh: {
    welcome: '您好！我是您的自主多语言AI导师。今天我能如何帮助您加速学习、铸造提示词并打造您的亿万业务？',
    s2e_explanation: '在我们为期6个月的“边学边赚”体系中，您的每一次研究都会被编译成可交易的数字资产提示词，您获得60%的销售收益！',
    money_engine: 'BaaCoin基准锚定1.00美元，并结合11个生态平台的代币回购销毁机制，推动代币长期稳步增值。',
    trainer_guidance: '针对教师与学校管理者：我们提供权威的“师资培训”认证体系，助力您在48小时内在学校部署自主AI课堂。'
  },
  yo: {
    welcome: 'Ẹ n lẹ o! Èmi ni Olùkọ́ AI Olódodo rẹ. Báwo ni mo ṣe lè ran ọ́ lọ́wọ́ láti kọ́ ẹ̀kọ́, ki o si kọ́ owó BaaCoin lónìí?',
    s2e_explanation: 'Ní inú oṣù mẹ́fà ti ẹ̀kọ́ wa, gbogbo iṣẹ́ ìwádìí rẹ ni a ń yí padà sí ohun ìní tí a lè tà lórí ọjà. Ìwọ ni ó ní 60% nínú owó tí a bá rí!',
    money_engine: 'BaaCoin wà ní $1.00 USD bí ìbẹ̀rẹ̀, ó sì ń pọ̀ sí i nípasẹ̀ owó tí àwọn pẹpẹ 11 wa ń wọlé ní ojoojúmọ́.',
    trainer_guidance: 'Fún àwọn olùkọ́ àti àwọn olówó ilé-ìwé: A ń kọ́ yín bí ẹ ṣe lè lo AI láti gbé ilé-ìwé yín ga láàárín wákàtí 48.'
  },
  ar: {
    welcome: 'مرحبًا! أنا معلم الذكاء الاصطناعي متعدد اللغات. كيف يمكنني تسريع تعلمك، وتعدين BaaCoin، وإطلاق مشروعك اليوم؟',
    s2e_explanation: 'في مجموعتنا "تعلم لتكسب" لمدة 6 أشهر، يتم تجميع كل أبحاثك تلقائيًا في حزم مطالبات ذكاء اصطناعي للبيع، وتحصل على 60% من المبيعات!',
    money_engine: 'يتم تثبيت عملة BaaCoin عند 1.00 دولار أمريكي كقاعدة أساسية، مع آلية حرق وإعادة شراء مستمرة تزيد من قيمتها السوقية باستمرار.',
    trainer_guidance: 'للمعلمين وأصحاب المدارس: نقدم برنامج تدريب المدربين المعتمد لنشر فصول دراسية ذكية تعمل بالذكاء الاصطناعي في مؤسستكم خلال 48 ساعة.'
  },
  ha: {
    welcome: 'Sannu! Ni ne Malamin AI mai magana da harsuna da yawa. Ta yaya zan taimake ka ka koya, ka hakar BaaCoin, ka kuma kafa kasuwancin ka a yau?',
    s2e_explanation: 'A cikin watanni 6 na tsarin "Koyi don Samun Kudi", duk binciken da ka yi ana mayar da shi kayan sayarwa a kasuwar mu. Za ka sami kashi 60% na kudin!',
    money_engine: 'BaaCoin yana da darajar farko ta $1.00 USD, kuma darajarsa na karuwa kowace rana ta hanyar tsarin mu na musamman da dandamali 11 ke tallafawa.',
    trainer_guidance: 'Ga malamai da masu makarantu: Muna ba da horo na musamman don ba ku damar fara amfani da AI a makarantunku cikin sa\'o\'i 48.'
  },
  pt: {
    welcome: 'Olá! Sou o seu Tutor IA Autónomo Multilíngue. Como posso acelerar o seu aprendizado, a mineração de BaaCoin e o seu negócio bilionário hoje?',
    s2e_explanation: 'Na nossa turma de 6 meses Aprenda-para-Ganhar, todas as suas pesquisas são convertidas em módulos de prompts vendáveis. Fica com 60% de todas as vendas!',
    money_engine: 'O BaaCoin está indexado a $1,00 USD base com um mecanismo perpétuo de recompra e queima impulsionado por 11 plataformas interligadas.',
    trainer_guidance: 'Para educadores e diretores de instituições: Oferecemos certificação global para implementar salas de aula com IA autónoma em 48 horas.'
  }
};

// ==========================================
// GENERAL MARKETPLACE PRODUCTS (CARS, TECH, REAL ESTATE)
// ==========================================
export const INITIAL_GENERAL_PRODUCTS = [
  {
    id: 'prod-car-01',
    title: '2024 Mercedes-Benz GLE 450 4MATIC (AMG Line)',
    category: 'Vehicles & Cars' as const,
    description: 'Customized luxury SUV with biometric ignition, panoramic roof, and autonomous driving assistance. Clean title, fully cleared with Nigeria Customs papers.',
    price_usd: 88000,
    price_baacoin: 74800, // 15% discount when paid with BaaCoin
    image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&auto=format&fit=crop&q=80',
    location: 'Victoria Island, Lagos / Stadium Link, Port Harcourt',
    seller_name: 'Rossyst Luxury Motors (BN: UY/009049 Verified)',
    seller_verified: true,
    condition: 'Brand New (0 Mileage)',
    specs: ['3.0L Turbo Inline-6 Hybrid (375 hp)', 'Burmester 3D Surround', 'Customized Air Suspension', 'Autonomous Smart Parking'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 18,
    group_buyers_count: 3,
    group_buyers_target: 5
  },
  {
    id: 'prod-car-02',
    title: '2023 Toyota Land Cruiser Prado TX-L V6',
    category: 'Vehicles & Cars' as const,
    description: 'Built for tough African terrains and executive escort. Full leather interior, bullet-resistant glass option, dual fuel tanks, and chilled console box.',
    price_usd: 65000,
    price_baacoin: 55250,
    image_url: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=600&auto=format&fit=crop&q=80',
    location: 'Central Business District, Abuja',
    seller_name: 'BAA Sovereign Fleet Partners',
    seller_verified: true,
    condition: 'Foreign Used (Pristine Grade A)',
    specs: ['4.0L Dual VVT-i V6', 'Full-Time 4WD with Torsen LSD', 'Dual Zone Climate', 'Rear Entertainment Screens'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 15,
    group_buyers_count: 2,
    group_buyers_target: 4
  },
  {
    id: 'prod-car-03',
    title: 'Innoson G80 Luxury Military-Grade SUV',
    category: 'Vehicles & Cars' as const,
    description: 'Proudly African engineered. Robust off-road chassis, executive massaging leather seats, and high-clearance suspension built for African roads.',
    price_usd: 52000,
    price_baacoin: 44200,
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80',
    location: 'Enugu / Port Harcourt / Lagos Hub',
    seller_name: 'Innoson Motors Direct BAA Channel',
    seller_verified: true,
    condition: 'Brand New Factory Direct',
    specs: ['2.4L Turbocharged Engine', 'Electronic 4WD Selector', 'Reinforced Body-on-Frame', 'Local 5-Year Warranty'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 20,
    group_buyers_count: 4,
    group_buyers_target: 6
  },
  {
    id: 'prod-solar-04',
    title: '10kVA Lithium-Iron Hybrid Smart Solar Power Plant',
    category: 'Solar & Energy' as const,
    description: 'Zero generator noise, 24/7 autonomous power for homes and offices. Includes 10kVA Pure Sine Inverter, 15kWh CATL LiFePO4 battery rack, and 16 Tier-1 bifacial panels.',
    price_usd: 6200,
    price_baacoin: 5270,
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    location: 'Nationwide Pan-African Installation Available',
    seller_name: 'UAIDC Clean Power Labs',
    seller_verified: true,
    condition: 'Brand New (10-Year Warranty)',
    specs: ['10kVA 48V Hybrid MPPT Inverter', '15kWh Lithium Battery Pack (6000+ Cycles)', '16x 550W Tier-1 Panels', 'IoT Real-Time Mobile App Monitoring'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 25,
    group_buyers_count: 8,
    group_buyers_target: 10
  },
  {
    id: 'prod-estate-05',
    title: '4-Bedroom Fully Detached Smart Duplex in Guzape',
    category: 'Real Estate & Land' as const,
    description: 'Autonomous smart villa with automated facial recognition gate, private rooftop swimming pool, solar power plant, and BAA Node high-speed connectivity.',
    price_usd: 195000,
    price_baacoin: 165750,
    image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
    location: 'Guzape Hills, Abuja, Nigeria',
    seller_name: 'Rossyst Enterprises Real Estate Trust',
    seller_verified: true,
    condition: 'Brand New Completed (C of O Title)',
    specs: ['4 En-Suite Bedrooms + BQ', 'Smart Home Lighting & CCTV', 'Solar Microgrid Installed', 'Deed of Assignment + C of O'],
    is_group_buy_eligible: false
  },
  {
    id: 'prod-tech-06',
    title: 'MacBook Pro 16" M3 Max (64GB RAM, 2TB SSD)',
    category: 'Electronics & Tech' as const,
    description: 'Ultimate workstation for training local AI models, 4D video rendering, and full-stack software compilation. Comes with sovereign protective case.',
    price_usd: 3800,
    price_baacoin: 3230,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    location: 'Express Air Courier to any African City',
    seller_name: 'CodeOrbit Hardware Depot',
    seller_verified: true,
    condition: 'Brand New Sealed in Box',
    specs: ['Apple M3 Max (16-core CPU, 40-core GPU)', '64GB Unified Memory', '2TB Ultra-Fast SSD', 'Liquid Retina XDR Display'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 20,
    group_buyers_count: 6,
    group_buyers_target: 8
  },
  {
    id: 'prod-mfg-07',
    title: '6kW High-Precision CNC Fiber Laser Metal Cutting Bed',
    category: 'Manufacturing' as const,
    description: 'Industrial heavy-gauge sheet metal and pipe fiber laser cutter. Capable of cutting up to 25mm carbon steel with sub-millimeter precision. Features dual exchange tables and AI autofocus head.',
    price_usd: 48000,
    price_baacoin: 40800,
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80',
    location: 'Ikeja Industrial Zone, Lagos / Port Harcourt Trans-Amadi',
    seller_name: 'Pan-African Industrial Machinery Consortium',
    seller_verified: true,
    condition: 'Brand New (Includes Engineer Setup & Training)',
    specs: ['6000W Raycus Fiber Laser Source', 'CypCut Industrial CNC Controller', '3000x1500mm Working Area', 'Dual Automatic Exchange Platform'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 15,
    group_buyers_count: 2,
    group_buyers_target: 3
  },
  {
    id: 'prod-mfg-08',
    title: 'High-Speed Automated SMT Pick-and-Place PCB Line',
    category: 'Manufacturing' as const,
    description: 'Precision automated electronics surface-mount assembly line for hardware startups and IoT device manufacturers. Mounts up to 28,000 components per hour with AI optical vision inspection.',
    price_usd: 34500,
    price_baacoin: 29325,
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    location: 'Aba Tech Hub / Yaba Silicon Lagoon',
    seller_name: 'Sovereign African Microchips Ltd',
    seller_verified: true,
    condition: 'Factory Direct with Calibration Warranty',
    specs: ['28,000 CPH Placement Speed', '0201 to 40mm QFP Component Range', 'Dual Flying Cameras Vision System', '80 Feeder Stations Support'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 18,
    group_buyers_count: 1,
    group_buyers_target: 3
  },
  {
    id: 'prod-agro-09',
    title: 'Autonomous Agro-Drone Spraying & Crop Mapping Fleet (50L)',
    category: 'Agriculture' as const,
    description: 'Autonomous dual-rotor heavy-payload hexacopter drone. Covers 40 hectares per hour with centimeter-level RTK GPS navigation, obstacle avoidance radar, and multispectral plant disease detection.',
    price_usd: 14500,
    price_baacoin: 12325,
    image_url: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=600&auto=format&fit=crop&q=80',
    location: 'Kaduna Agritech Depot / Ibadan Agro Corridor',
    seller_name: 'AgriSovereign Robotics Africa',
    seller_verified: true,
    condition: 'Brand New (Ready to Deploy)',
    specs: ['50L Spray Tank Capacity', 'Centimeter-Level RTK GPS Mesh', 'Omnidirectional Obstacle Radar', '4x Fast-Charging 30,000mAh Smart Packs'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 22,
    group_buyers_count: 5,
    group_buyers_target: 6
  },
  {
    id: 'prod-agro-10',
    title: '120kVA Solar Powered Center-Pivot Smart Irrigation Array',
    category: 'Agriculture' as const,
    description: 'Autonomous solar-pumped pivot system irrigating up to 50 hectares of farmland continuously. Integrated with soil moisture IoT telemetry and autonomous water distribution algorithms.',
    price_usd: 27000,
    price_baacoin: 22950,
    image_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    location: 'Benue River Basin / Kano Farm Valley',
    seller_name: 'Green Sahara Autonomous Hydro Works',
    seller_verified: true,
    condition: 'Custom Fabricated On-Site',
    specs: ['400-Meter Center Pivot Arm', '120kVA Grundfos Solar Deep-Well Pump', 'IoT Remote Pressure & Moisture Monitor', 'Galvanized Structural Framework'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 16,
    group_buyers_count: 2,
    group_buyers_target: 4
  },
  {
    id: 'prod-edu-11',
    title: 'Sovereign ABAU AI Engineering Lab Pod (10 Student Terminals)',
    category: 'Education' as const,
    description: 'Turnkey autonomous AI training laboratory for universities, secondary academies, and enterprise incubation hubs. Fully wired with GPU workstations, dual monitors, and preloaded neural frameworks.',
    price_usd: 18500,
    price_baacoin: 15725,
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
    location: 'Pan-African University Delivery & Setup',
    seller_name: 'Billionaires AI Academy Academic Hardware Division',
    seller_verified: true,
    condition: 'Brand New (Turnkey Installation)',
    specs: ['10x RTX 4080 AI Workstations', 'Local Llama & DeepSeek Neural Cache Server', 'Ergonomic Cyber Mesh Stations', '5-Year Sovereign Software License'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 20,
    group_buyers_count: 3,
    group_buyers_target: 5
  },
  {
    id: 'prod-edu-12',
    title: '86" 4K Interactive Holographic Smart Classroom Display',
    category: 'Education' as const,
    description: 'Commercial anti-glare interactive panel with 40-point multi-touch, built-in 4K AI presenter tracking camera, 8-microphone beamforming array, and dual-OS Android/Windows architecture.',
    price_usd: 4200,
    price_baacoin: 3570,
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    location: 'Lagos / Abuja / Port Harcourt / Accra',
    seller_name: 'Silicon Savannah EdTech Direct',
    seller_verified: true,
    condition: 'Brand New Factory Sealed',
    specs: ['86-Inch 4K UHD Zero-Bonding Display', '40-Point Infrared Touch Matrix', 'Built-in 48MP AI Auto-Framing Camera', 'Motorized Heavy-Duty Mobile Stand'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 25,
    group_buyers_count: 7,
    group_buyers_target: 10
  },
  {
    id: 'prod-life-13',
    title: 'Rolex Submariner Date 18k White Gold "Cookie Monster"',
    category: 'Lifestyle' as const,
    description: 'Iconic luxury Swiss chronometer in 18 ct white gold with royal blue Cerachrom ceramic bezel and black dial. Unworn with original box, warranty card, and international authenticity certificate.',
    price_usd: 41500,
    price_baacoin: 35275,
    image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
    location: 'Vault Storage, Eko Atlantic / Geneva Bonded Vault',
    seller_name: 'Rossyst Horology Vault (BN: UY/009049)',
    seller_verified: true,
    condition: 'Unworn Mint 2026 Collection',
    specs: ['41mm 18k White Gold Case', 'Blue Cerachrom Ceramic Bezel', 'Calibre 3235 Perpetual Movement', '300m / 1000ft Water Resistance'],
    is_group_buy_eligible: false
  },
  {
    id: 'prod-life-14',
    title: 'Bespoke Sovereign Royal African Couture & Gold Brocade Ensemble',
    category: 'Lifestyle' as const,
    description: 'Master artisan crafted traditional royal regalia featuring handwoven silk Aso-Oke, 18-karat gold gilded embroidery, and bespoke tailoring for high-state diplomatic events and galas.',
    price_usd: 3500,
    price_baacoin: 2975,
    image_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
    location: 'Atelier Victoria Island, Lagos / London Courier',
    seller_name: 'MODE Digital Creations Fashion House',
    seller_verified: true,
    condition: 'Custom Tailored to Buyer Measurements',
    specs: ['Pure Silk & Gold Thread Weave', 'Hand-Embroidered Filigree Accents', 'Complimentary Velvet Travel Garment Box', 'Matching Royal Cap & Stole'],
    is_group_buy_eligible: true,
    group_buy_discount_percent: 15,
    group_buyers_count: 4,
    group_buyers_target: 5
  },
  {
    id: 'prod-land-15',
    title: '2.5 Hectares Prime Commercial Land at Lekki Free Trade Zone',
    category: 'Real Estate' as const,
    description: 'Strategically positioned commercial logistics plot directly along the Lekki-Epe Expressway, adjacent to Dangote Refinery and Lekki Deep Sea Port. Full governor\'s consent and commercial zoning permit.',
    price_usd: 280000,
    price_baacoin: 238000,
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80',
    location: 'Lekki Coastal Corridor, Lagos, Nigeria',
    seller_name: 'Rossyst Enterprises Real Estate Trust',
    seller_verified: true,
    condition: 'Dry Land Ready for Development',
    specs: ['25,000 SQM (2.5 Hectares)', 'Governor\'s Consent + C of O', 'Direct Deep Sea Port Access Road', 'Uninterrupted Free Trade Zone Tax Exemptions'],
    is_group_buy_eligible: false
  }
];

// ==========================================
// GLOBAL MARKETPLACES REFERRAL API BRIDGES
// (Amazon, Alibaba, Konga, Jiji, Jumia, AliExpress)
// ==========================================
export const INITIAL_MARKETPLACE_BRIDGES = [
  {
    id: 'bridge-amazon',
    name: 'Amazon' as const,
    logo_badge: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    tagline: 'World\'s largest online retail catalog with global door-to-door delivery',
    commission_earned_percent: '8.5% Affiliate Referral',
    baacoin_checkout_fee_percent: '2.5% BaaCoin Gateway Fee',
    affiliate_api_status: 'Live Synced' as const,
    popular_deals: [
      {
        id: 'amz-01',
        title: 'Starlink Gen 3 Satellite Internet Kit with Ultra-Low Latency',
        price_usd: 599,
        price_baacoin: 509,
        original_price_usd: 699,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400&auto=format&fit=crop&q=80',
        category: 'Satellite Networking',
        referral_commission_usd: 50.91
      },
      {
        id: 'amz-02',
        title: 'Sony Alpha 7 IV Full-Frame Hybrid Mirrorless Camera',
        price_usd: 2498,
        price_baacoin: 2123,
        original_price_usd: 2798,
        rating: 4.8,
        image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80',
        category: 'Pro Media & Film',
        referral_commission_usd: 212.33
      }
    ]
  },
  {
    id: 'bridge-alibaba',
    name: 'Alibaba' as const,
    logo_badge: 'https://upload.wikimedia.org/wikipedia/en/8/80/Alibaba-Logo.png',
    tagline: 'Direct manufacturer sourcing & wholesale bulk group-buying engine',
    commission_earned_percent: '10.0% Wholesale Commission',
    baacoin_checkout_fee_percent: '2.0% Trade Escrow Fee',
    affiliate_api_status: 'Live Synced' as const,
    popular_deals: [
      {
        id: 'ali-01',
        title: 'Wholesale Solar Panels Grade-A Monocrystalline 550W (Pallet of 30)',
        price_usd: 2850,
        price_baacoin: 2422,
        original_price_usd: 3500,
        rating: 4.95,
        image_url: 'https://images.unsplash.com/photo-1508873696983-2df5293cbdaf?w=400&auto=format&fit=crop&q=80',
        category: 'Solar Equipment Wholesale',
        referral_commission_usd: 285.00
      },
      {
        id: 'ali-02',
        title: 'Industrial Heavy-Duty Drone for Agricultural Crop Health Mapping',
        price_usd: 4200,
        price_baacoin: 3570,
        original_price_usd: 5100,
        rating: 4.88,
        image_url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&auto=format&fit=crop&q=80',
        category: 'AgroTech Hardware',
        referral_commission_usd: 420.00
      }
    ]
  },
  {
    id: 'bridge-konga',
    name: 'Konga' as const,
    logo_badge: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Konga_Logo.png/640px-Konga_Logo.png',
    tagline: 'Nigeria\'s premier verified digital mall with instant Paystack/BaaCoin settlement',
    commission_earned_percent: '7.5% E-Commerce Referral',
    baacoin_checkout_fee_percent: '1.5% Settlement Fee',
    affiliate_api_status: 'Live Synced' as const,
    popular_deals: [
      {
        id: 'konga-01',
        title: 'iPhone 16 Pro Max 512GB (Titanium Black, Dual SIM)',
        price_usd: 1450,
        price_baacoin: 1232,
        original_price_usd: 1600,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400&auto=format&fit=crop&q=80',
        category: 'Smartphones',
        referral_commission_usd: 108.75
      },
      {
        id: 'konga-02',
        title: 'Hisense 75-Inch 4K UHD Smart QLED TV with Dolby Vision',
        price_usd: 950,
        price_baacoin: 807,
        original_price_usd: 1100,
        rating: 4.7,
        image_url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&auto=format&fit=crop&q=80',
        category: 'Home Appliances',
        referral_commission_usd: 71.25
      }
    ]
  },
  {
    id: 'bridge-jiji',
    name: 'Jiji' as const,
    logo_badge: 'https://jiji.ng/static/img/meta/jiji-preview-square.png',
    tagline: 'Africa\'s largest marketplace for verified automobiles, lands & commercial equipment',
    commission_earned_percent: '5.0% Brokerage Commission',
    baacoin_checkout_fee_percent: '2.0% Escrow Protection',
    affiliate_api_status: 'Live Synced' as const,
    popular_deals: [
      {
        id: 'jiji-01',
        title: '2021 Toyota RAV4 XLE Foreign Used (Lagos Cleared)',
        price_usd: 29500,
        price_baacoin: 25075,
        original_price_usd: 33000,
        rating: 4.85,
        image_url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&auto=format&fit=crop&q=80',
        category: 'Automobiles & Vehicles',
        referral_commission_usd: 1475.00
      },
      {
        id: 'jiji-02',
        title: 'Full Plot of Dry Land in Lekki Scheme 2 (Governor\'s Consent)',
        price_usd: 45000,
        price_baacoin: 38250,
        original_price_usd: 52000,
        rating: 4.9,
        image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&auto=format&fit=crop&q=80',
        category: 'Real Estate & Land',
        referral_commission_usd: 2250.00
      }
    ]
  }
];

// ==========================================
// SHOPPERS NETWORK GROUP-BUY POOLS
// ==========================================
export const INITIAL_SHOPPER_GROUP_BUYS = [
  {
    id: 'group-01',
    item_title: 'CATL 15kWh LiFePO4 Lithium Battery Wholesale Pool (Alibaba Direct)',
    category: 'Solar & Renewable Energy',
    original_price_usd: 3500,
    group_price_baacoin: 2450, // 30% savings
    savings_percent: 30,
    joined_users: [
      { name: 'Dr. Chika O.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', location: 'Port Harcourt' },
      { name: 'Ibrahim K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', location: 'Kano' },
      { name: 'Grace E.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', location: 'Lagos' }
    ],
    target_slots: 5,
    expires_in: '18h 42m',
    cashback_baacoin: 122.50
  },
  {
    id: 'group-02',
    item_title: 'Bulk Order: 10x Dell Latitude 7420 Core i7 Laptops for Student Teams',
    category: 'Student Tech & Hardware',
    original_price_usd: 750,
    group_price_baacoin: 560,
    savings_percent: 25,
    joined_users: [
      { name: 'Oluwaseun B.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', location: 'Ibadan' },
      { name: 'Aisha M.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100', location: 'Abuja' },
      { name: 'David N.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', location: 'Enugu' },
      { name: 'Femi A.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', location: 'Lagos' }
    ],
    target_slots: 6,
    expires_in: '09h 15m',
    cashback_baacoin: 28.00
  },
  {
    id: 'group-03',
    item_title: 'Container Bulk Sourcing: Toyota Genuine Brake Pads & Suspension Kits',
    category: 'Automotive Parts Wholesale',
    original_price_usd: 420,
    group_price_baacoin: 315,
    savings_percent: 25,
    joined_users: [
      { name: 'Chief Emeka', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', location: 'Onitsha' },
      { name: 'Alhaji Musa', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', location: 'Kaduna' }
    ],
    target_slots: 4,
    expires_in: '24h 00m',
    cashback_baacoin: 15.75
  }
];

// ==========================================
// MERCHANT SPONSORED ADS (Paying BaaCoin to display)
// ==========================================
export const INITIAL_MERCHANT_ADS = [
  {
    id: 'ad-01',
    sponsor_name: 'Lagos Island Auto Pavilion',
    platform: 'Jiji Verified Dealer' as const,
    headline: 'Pre-Order 2025 Lexus LX600 with 10% BaaCoin Discount',
    offer_text: 'Instant Paystack and BaaCoin escrow release upon vehicle delivery and test drive in Lagos or Abuja.',
    cta_text: 'Inspect Inventory with BaaCoin',
    daily_budget_baacoin: 250,
    impressions: 48900,
    clicks: 3410,
    ctr: '6.97%'
  },
  {
    id: 'ad-02',
    sponsor_name: 'Alibaba Verified Solar Gold Supplier',
    platform: 'Alibaba Gold' as const,
    headline: 'Factory Direct Tier-1 Solar Inverters & CATL Batteries',
    offer_text: 'Pay with $BAA Coin. Full trade assurance protection with door-to-door sea/air freight across Africa.',
    cta_text: 'Request Factory Quotation',
    daily_budget_baacoin: 400,
    impressions: 92400,
    clicks: 7210,
    ctr: '7.80%'
  },
  {
    id: 'ad-03',
    sponsor_name: 'Amazon Global Store Nigeria',
    platform: 'Amazon Partner' as const,
    headline: 'Shop Millions of Electronics & Books via BaaCoin API',
    offer_text: 'Zero foreign exchange fees. Settle in BaaCoin and let our autonomous AI handle import duties and customs clearing.',
    cta_text: 'Shop Amazon via BaaCoin',
    daily_budget_baacoin: 500,
    impressions: 112000,
    clicks: 8900,
    ctr: '7.94%'
  }
];

// ==========================================
// THREE SUGGESTED PRESETS (For Agent Builder & Commerce)
// ==========================================
export const COMMERCE_AGENT_PRESETS = [
  {
    id: 'preset-car-arbitrage',
    name: '🚗 Car Dealership & Auto Broker Arbitrage Legion',
    category: 'Strategic Legions' as const,
    tagline: 'Scrapes Jiji, Cars45, and Copart to find 20-30% undervalued cars, issues BaaCoin escrows, and closes buyer deals',
    description: 'Autonomous automotive trading agent. Constantly monitors vehicle listings in Lagos, Abuja, and US salvage auctions, cross-references customs duty tables, generates verified vehicle inspection memos, and closes sales with BaaCoin smart contracts.',
    hourly_rate_baacoin: 35,
    monthly_rate_usd: 69,
    capabilities: [
      'Multi-Platform Car Price Scraping (Jiji, Cars45, AutoTrader)',
      'Customs Duty & Freight Valuation Calculator',
      'Automated WhatsApp Car Inspection Report Generation',
      'BaaCoin 1-Click Escrow Contract Dispatch'
    ],
    system_core: 'Autostack Multi-Agent Vehicle Kernel v2',
    system_loop: 'Scrape Jiji/Cars45 -> Detect 20%+ price gap -> Validate VIN & accident record -> Dispatch buyer offer -> Lock BaaCoin escrow'
  },
  {
    id: 'preset-global-shopper',
    name: '🛍️ Global Cross-Platform Shopper & Affiliate Bot',
    category: 'Personal Assistants' as const,
    tagline: 'Autonomous purchasing bot that shops Amazon, Alibaba, Konga, and Jiji using BaaCoin while capturing 4-10% referral commissions',
    description: 'Enables users to paste any product link or search query from global marketplaces. Automatically converts BaaCoin to merchant currency via virtual cards, negotiates merchant bulk discounts, and credits affiliate commissions back to your BAA wallet.',
    hourly_rate_baacoin: 20,
    monthly_rate_usd: 39,
    capabilities: [
      'Real-Time Amazon & Alibaba Affiliate API Integration',
      'Autonomous Cross-Platform Price Comparison',
      'Instant BaaCoin to Fiat Settlement Gateway',
      'Automated Customs Clearing & Delivery Tracking'
    ],
    system_core: 'WorkOS Universal Commerce Router',
    system_loop: 'Receive product request -> Compare Amazon/Alibaba/Konga -> Route via highest affiliate commission -> Pay merchant with BaaCoin -> Track delivery'
  },
  {
    id: 'preset-group-buy',
    name: '👥 Shoppers Network Group-Buy & CashBack Legion',
    category: 'Industry Swarms' as const,
    tagline: 'Coordinates 5-20 buyers into wholesale bulk purchasing pools on Alibaba & Konga, splits 30% savings + 5% BaaCoin referral cashback',
    description: 'Swarm intelligence for collective buying power. Matches student founders and entrepreneurs who need similar hardware, solar gear, or vehicle parts into instant syndicate pools, securing wholesale factory prices and distributing cashback tokens.',
    hourly_rate_baacoin: 25,
    monthly_rate_usd: 49,
    capabilities: [
      'Automated Group-Buy Pool Creation & Slot Fill Tracker',
      'Wholesale Manufacturer Negotiation on Alibaba',
      '5% Referral Cashback Distribution in BaaCoin',
      'Sovereign P2P Delivery Coordination'
    ],
    system_core: 'BAA Shoppers Network Protocol',
    system_loop: 'Identify high-demand product -> Open Group-Buy Pool -> Recruit 5 buyers via Shoppers Network -> Execute wholesale order -> Disburse cashback'
  }
];

export const INITIAL_PROJECT_PROPOSALS: ProjectProposal[] = [
  {
    id: 'proj-01',
    title: 'LegalEase Africa AI — Autonomous SME Tenancy & CAC Engine',
    category: 'Autonomous AI',
    lead_student: 'Chidubem Okoye',
    student_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    team_members: ['Folake Adebisi', 'Tariro Moyo', 'Dr. Chike Obi (Advisor)'],
    description: 'Autonomous multi-agent system that ingests Nigerian CAC company secretarial filings, tenancy agreements, and debt-recovery briefs. Cuts legal paperwork turnaround from 14 days to 4 minutes.',
    problem_solved: '92% of Nigerian micro-businesses operate without legal contracts due to prohibitive legal fees (₦150k+ per document).',
    development_phase: 'Approved for Funding',
    funding_ask_usd: 25000,
    funding_ask_baacoin: 25000,
    total_funded_baacoin: 21500,
    equity_offered_percent: 8,
    milestones: [
      { title: 'CAC Corporate Affairs Commission API Integration', completed: true, target_date: 'Q1 2026' },
      { title: 'Multi-LLM Tenancy Agreement Contract Generator', completed: true, target_date: 'Q1 2026' },
      { title: 'Base L2 Document Fingerprint & Hash Inscription', completed: true, target_date: 'Q2 2026' },
      { title: 'Enterprise Law Firm Pilot in Lagos (42 firms)', completed: false, target_date: 'Q3 2026' }
    ],
    status: 'approved',
    backers_count: 64,
    created_at: '2026-03-12T10:00:00Z',
    demo_url: 'https://billionairesai.academy/#marketplace',
    github_url: 'https://github.com/mode-digital/legalease-ai-autonomous',
    cac_number: 'RC: 1948201',
    wema_verified: true,
    equity_contract_address: '0x71c8a392b44c10283f98c21a37829100fa1b392e',
    vc_backers: ['Synergy African Angels', 'MicroWork Capital', 'Ventures Platform'],
    hub_location: 'Lagos & Abuja Hubs'
  },
  {
    id: 'proj-02',
    title: 'AgroScanner Vision & Autonomous Solar Drone Fleet',
    category: 'AgroVision',
    lead_student: 'Amina Bello',
    student_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    team_members: ['Ibrahim Shehu', 'Kofi Mensah'],
    description: 'Neural edge-vision model deployed on solar-powered camera nodes and drones to detect early cassava bacterial blight and armyworm infestations across Northern Nigeria.',
    problem_solved: 'Smallholder farmers lose 38% of annual harvest to unspotted crop epidemics that could be contained within 48 hours.',
    development_phase: 'Node Compute Allocated',
    funding_ask_usd: 40000,
    funding_ask_baacoin: 40000,
    total_funded_baacoin: 28000,
    equity_offered_percent: 10,
    milestones: [
      { title: 'Edge-optimized Mobile Vision CNN Model (98.4% accuracy)', completed: true, target_date: 'Q1 2026' },
      { title: 'UADC Decentralized Compute Cluster Allocation (120 Nodes)', completed: true, target_date: 'Q2 2026' },
      { title: 'Field Trial with 18 Farmers Cooperatives in Kaduna', completed: true, target_date: 'Q2 2026' },
      { title: 'Commercial Autonomous Drone Payload Integration', completed: false, target_date: 'Q3 2026' }
    ],
    status: 'community_voting',
    backers_count: 92,
    created_at: '2026-03-24T14:30:00Z',
    demo_url: 'https://billionairesai.academy/#uadc-lab',
    cac_number: 'BN: KD/384910',
    wema_verified: false,
    equity_contract_address: '0x3841fb20a94b8102d9a3857b291a4b8301ec9481',
    vc_backers: ['Pan-African Agritech Syndicate', 'East African Angel Network'],
    hub_location: 'Nairobi & Abuja Hubs'
  },
  {
    id: 'proj-03',
    title: 'Port Harcourt Hydro-Solar Compute Cluster & Sovereign Node Grid',
    category: 'Clean Energy & Solar',
    lead_student: 'Emmanuel Bassey Joe',
    student_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    team_members: ['MODE Engineering Core', 'Rossyst Technical Guild'],
    description: '100% off-grid clean energy compute cluster powered by rooftop solar and battery storage at No. 5 Ordu Street, Port Harcourt, providing zero-carbon AI inference for 2,400+ smartphone nodes.',
    problem_solved: 'African AI developers face 12+ hours daily grid collapse and 300% diesel generator cost inflation.',
    development_phase: 'Security & CAC Audited',
    funding_ask_usd: 80000,
    funding_ask_baacoin: 80000,
    total_funded_baacoin: 72000,
    equity_offered_percent: 12,
    milestones: [
      { title: 'Land Facility & CAC Legal Title Verification (BN: UY/009049)', completed: true, target_date: 'Q1 2026' },
      { title: '10kVA Lithium Hybrid Battery & Solar Inverter Installation', completed: true, target_date: 'Q1 2026' },
      { title: '2,400+ Student Smartphone Node Mesh Entanglement Protocol', completed: true, target_date: 'Q2 2026' },
      { title: 'Commercial API Proxy & Paystack Direct Naira Revenue Ramp', completed: false, target_date: 'Q3 2026' }
    ],
    status: 'approved',
    backers_count: 148,
    created_at: '2026-02-15T09:00:00Z',
    demo_url: 'https://billionairesai.academy/#uadc-lab',
    cac_number: 'BN: UY/009049',
    wema_verified: true,
    equity_contract_address: '0xb44c91f4a9831002bf092837418291048201fa92',
    vc_backers: ['Rossyst Technical Guild', 'UAIDC Clean Power Labs', 'Wema ALAT Accelerator'],
    hub_location: 'Port Harcourt & Lagos Hubs'
  },
  {
    id: 'proj-04',
    title: 'Afrobeats Stem AI & Licensing Micro-Vault',
    category: 'Web3 & Identity',
    lead_student: 'Kofi Mensah',
    student_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    team_members: ['Folake Adebisi', 'David Mensah'],
    description: 'Autonomous audio demixing engine that isolates vocal stems, drum patterns, and guitar loops from Afrobeats recordings, mints intellectual property NFTs, and settles global sync licensing in BaaCoin.',
    problem_solved: 'African producers and musicians lose over $200M annually to unlicensed international sampling without digital attribution.',
    development_phase: 'AI Prototyping',
    funding_ask_usd: 18000,
    funding_ask_baacoin: 18000,
    total_funded_baacoin: 9200,
    equity_offered_percent: 7,
    milestones: [
      { title: 'Neural Stem Separation Audio Pipeline (Vocals, Drums, Bass)', completed: true, target_date: 'Q1 2026' },
      { title: 'Smart Audio Watermarking & On-Chain Timestamp Inscription', completed: true, target_date: 'Q2 2026' },
      { title: 'Marketplace Sync Licensing Escrow Engine', completed: false, target_date: 'Q3 2026' }
    ],
    status: 'community_voting',
    backers_count: 39,
    created_at: '2026-03-28T18:00:00Z',
    cac_number: 'GH-CS/094821',
    wema_verified: false,
    equity_contract_address: '0x9482a17cb49a0293d8471b028471038491028371',
    vc_backers: ['AfroBeat Media Ventures', 'Base Ecosystem Innovation Fund'],
    hub_location: 'Accra & Johannesburg Hubs'
  }
];

export const INITIAL_STUDENT_SPOTLIGHTS: StudentSpotlight[] = [
  {
    id: 'spotlight-chioma',
    name: 'Chioma Adeyemi',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    cohort: 'Cohort 3 (Rivers State / Port Harcourt Hub)',
    location: 'Port Harcourt, Nigeria',
    graduation_status: 'Graduated - Honors',
    scores: [
      { activity: 'Autonomous Agent Fuzzing', score: 98 },
      { activity: 'Smart Contract Security', score: 96 },
      { activity: 'Prompt Engineering Capstone', score: 100 }
    ],
    project_lead_title: 'Base L2 Smart Contract Auditor & Paystack Bug Bounty',
    baacoin_earned: 4850,
    quote: 'I joined the Academy with zero blockchain coding background. In 6 weeks, the AI Tutor guided me to build an audit agent that secured a ₦150,000 Paystack bounty and verified 42 smart contracts.',
    video_clip_url: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-with-headphones-on-a-laptop-42994-large.mp4',
    nft_certificate_id: '0xbaac-cert-chioma-092'
  },
  {
    id: 'spotlight-emmanuel',
    name: 'Emmanuel Bassey Joe',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    cohort: 'Cohort 1 (Lead Fellow)',
    location: 'Port Harcourt / Lagos Hub',
    graduation_status: 'Incubated Founder',
    scores: [
      { activity: 'Multi-Agent Orchestration', score: 99 },
      { activity: 'Autonomous Commerce Engines', score: 97 },
      { activity: 'GPU Cluster Architecture', score: 95 }
    ],
    project_lead_title: 'Universal Autonomous AI Data Center (UADC 2,400 Nodes)',
    baacoin_earned: 18400,
    quote: 'Our mission was simple: turn idle smartphones in Nigeria into decentralized AI compute nodes that pay everyday students daily passive income in BaaCoin while charging safely overnight.',
    video_clip_url: 'https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blinking-lights-and-cables-42777-large.mp4',
    nft_certificate_id: '0xbaac-cert-emmanuel-001'
  },
  {
    id: 'spotlight-babatunde',
    name: 'Babatunde Ogunlesi',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    cohort: 'Cohort 4 (Lagos Hub)',
    location: 'Lagos, Nigeria',
    graduation_status: 'In Progress - Capstone',
    scores: [
      { activity: 'Auto-Broker Arbitrage', score: 94 },
      { activity: 'WhatsApp Closer Bots', score: 98 },
      { activity: 'Multi-Platform Scraping', score: 92 }
    ],
    project_lead_title: 'Car Dealership & Luxury Vehicle BaaCoin Escrow Legion',
    baacoin_earned: 3200,
    quote: 'Using the Car Dealership Legion preset, I brokered a 2024 Mercedes GLE 450 sale with 1-click BaaCoin escrow, earning ₦420,000 in brokerage fees directly from my smartphone.',
    video_clip_url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-in-a-dark-room-43180-large.mp4',
    nft_certificate_id: '0xbaac-cert-babatunde-044'
  }
];

export const INITIAL_TOP_STAKERS: TopStakerLeaderboardItem[] = [
  {
    rank: 1,
    name: 'Chief Dr. Alistair Sterling',
    node_id: 'UADC-VAL-001',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    staked_baacoin: 85000,
    daily_yield_baacoin: 78.4,
    node_health: 'Optimal',
    uptime_percent: '99.98%',
    tier: 'Sovereign Whale'
  },
  {
    rank: 2,
    name: 'Chioma Adeyemi',
    node_id: 'NODE-PH-092 (Samsung S23)',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    staked_baacoin: 34200,
    daily_yield_baacoin: 31.8,
    node_health: 'Charging & Cool',
    uptime_percent: '99.82%',
    tier: 'Validator Node'
  },
  {
    rank: 3,
    name: 'MODE Tech Hub Nodes (12 Phones)',
    node_id: 'UADC-CLUSTER-07',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    staked_baacoin: 28500,
    daily_yield_baacoin: 26.3,
    node_health: 'Optimal',
    uptime_percent: '100.0%',
    tier: 'Validator Node'
  },
  {
    rank: 4,
    name: 'Emmanuel Bassey Joe',
    node_id: 'NODE-PH-001 (Redmi Note 12)',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    staked_baacoin: 22000,
    daily_yield_baacoin: 20.4,
    node_health: 'Charging & Cool',
    uptime_percent: '99.6%',
    tier: 'Mobile Compute Miner'
  },
  {
    rank: 5,
    name: 'Nairobi Angel Syndicate',
    node_id: 'VAL-KE-03 (Solar Server)',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    staked_baacoin: 19500,
    daily_yield_baacoin: 18.0,
    node_health: 'High Performance',
    uptime_percent: '99.4%',
    tier: 'Sovereign Whale'
  }
];

