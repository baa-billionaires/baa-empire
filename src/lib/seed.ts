import { Course, Ebook, AITool, AITutor, ScoutLead, PromptMarketplaceItem } from '../types';

export const COURSE_TITLES = [
  "AI Instagram Millionaire - 0 to 100k in 30 Days",
  "ChatGPT ATM - $100 Daily Copy-Paste",
  "AI OnlyFans Faceless Empire",
  "AI Video Factory 100 TikToks/Day",
  "AI Voice Cloning Cash",
  "AI E-commerce Killer",
  "AI Freelancing Dominator",
  "AI Real Estate Gold",
  "AI Crypto Trader Bot No Code",
  "AI Job Replacement",
  "AI Dropshipping Steroids",
  "AI Stock Photos Empire",
  "AI YouTube Automation $5k/mo",
  "AI WhatsApp Sales Bot",
  "AI CV LinkedIn Hacker",
  "AI Music Money Afrobeats",
  "AI Dating Coach Bot High Ticket",
  "AI Church Automation",
  "AI Political Campaign Machine",
  "AI Restaurant Booster",
  "AI Loan Proposal Writer",
  "AI Amazon KDP 100 Books",
  "AI Forex Signal Bot",
  "AI Betting Prediction",
  "AI Wedding Planner",
  "AI Funeral Speech Empire",
  "AI Child Tutor Business",
  "AI Legal Contract SMEs",
  "AI Medical Assistant Clinics",
  "AI Japa Package UK/US",
  "Blockchain Millionaire Blueprint",
  "Smart Contract Sniper Meme Coins",
  "Solidity in 7 Days",
  "DeFi Yield Farm 1000% APY",
  "NFT Empire Africa Culture",
  "Crypto Airdrop Hunter $10k/mo",
  "Blockchain Land Registry Nigeria",
  "Build Blockchain Like Bitcoin",
  "Web3 Freelancer $5k/Contract",
  "DAO Billion Dollar Communities",
  "Metaverse Real Estate Flipping",
  "Play-to-Earn Game No Code",
  "Blockchain Supply Chain Farmers",
  "CBDC Digital Naira",
  "Crypto Tax Strategies",
  "Cross-Border Crypto Payments",
  "Blockchain Voting Governments",
  "Tokenize Your Business",
  "Blockchain + AI Fusion",
  "Build Africa Binance",
  "Wallet Security White Hat",
  "Memecoin Factory Automation",
  "Blockchain Lawyer Cert",
  "Web3 Marketing Growth",
  "Zero Knowledge Proof",
  "Layer 2 Scaling",
  "Crypto Influencer Automation",
  "Build Crypto ATM",
  "Stablecoin Creation",
  "Blockchain Church Transparency",
  "Python AI Billionaires 14 Days",
  "Build Own ChatGPT Scratch",
  "Autonomous Drone AI",
  "AI Robotics Houseboy",
  "Computer Vision Face Recognition",
  "AI Agriculture Crop Disease",
  "Self-Driving Car Africa Roads",
  "AI Data Center Builder",
  "Quantum AI Intro",
  "Neural Networks 10-Year-Old",
  "LLM Training Cheap GPU",
  "AI Chip Design",
  "Edge AI No Internet",
  "AI Oil & Gas Pipeline",
  "AI Nollywood Script Generator",
  "AI Teacher Never Tires Sell Schools",
  "AI Doctor Rural Africa",
  "AI Lawyer Land Cases",
  "AI Pastor Sermon Generator",
  "Voice AI Yoruba Igbo Hausa",
  "AI Clone Yourself 100 Hours",
  "Multi-Agent AI Employee-less Company",
  "AI Cybersecurity Defender",
  "AI Stock Predictor",
  "AI Sports Betting Syndicate",
  "AI Government Budget Analyzer",
  "AI University Admin Automation",
  "Build Siri African Languages",
  "AI CCTV That Talks",
  "AI Baby Monitor Cry",
  "AI Fashion Ankara Styles",
  "AI Architecture 100 Houses",
  "AI Music Video Director",
  "AI News Anchor Never Sleeps",
  "AI Dating App Tinder Clone",
  "AI Church Member Tracker",
  "AI Find Oil Village",
  "AI Election Rigging Detector",
  "AI Waste to Wealth",
  "Autonomous Data Center Self-Healing"
];

function getCategory(index: number): Course['category'] {
  if (index < 30) return 'AI Wealth';
  if (index < 60) return 'Blockchain & DeFi';
  if (index < 75) return 'Autonomous Robotics';
  if (index < 85) return 'Africa AI Impact';
  if (index < 95) return 'Prompts & Automation';
  return 'Autonomous Enterprise';
}

function getLevel(index: number): Course['level'] {
  const mod = index % 4;
  if (mod === 0) return 'Beginner';
  if (mod === 1) return 'Intermediate';
  if (mod === 2) return 'Mastery';
  return 'Executive';
}

function getPrice(index: number): number {
  const prices = [49, 79, 99, 149, 199, 299];
  return prices[index % prices.length];
}

const INSTRUCTORS = [
  "Dr. Chukwuma Sterling (AI Capital Fellow)",
  "Prof. Adaeze Obi (MIT Blockchain Lab)",
  "Oluwaseun Vance (Ex-OpenAI Systems)",
  "Tariq Al-Mansoor (Dubai Autonomous Ventures)",
  "Engr. Kwame Mensah (African Data Center Architect)",
  "Zainab Bello (Web3 Legal & Smart Contract Auditor)",
  "David K. O'Connor (Algorithmic Trading Pioneer)"
];

export const INITIAL_COURSES: Course[] = COURSE_TITLES.map((title, idx) => {
  const price = getPrice(idx);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return {
    id: `course-${idx + 1}`,
    title,
    slug,
    description: `Master high-impact autonomous implementation for "${title}". Includes real-world prompt pipelines, live Learn-to-Mine BaaCoin integration, and NFT certification on completion.`,
    price,
    baacoin_value: price * 10, // 10x Networth rule ($99 -> 990 BaaCoin)
    level: getLevel(idx),
    category: getCategory(idx),
    thumbnail_url: `https://images.unsplash.com/photo-${[
      '1618005182384-a83a8bd57fbe',
      '1639762681485-074b7f938ba0',
      '1620712943543-bcc4688e7485',
      '1614064641938-3bbee52942c7',
      '1642543492481-44e81e3914a7',
      '1634704784915-aacf363b021f',
      '1618172193622-ae2d025f4032',
      '1677442136019-21780efad99a',
      '1622979135225-d2ba269bc1df',
      '1625314897518-bb79cb38b14e'
    ][idx % 10]}?w=800&auto=format&fit=crop&q=80`,
    modules: [
      {
        id: `mod-${idx}-1`,
        title: "Module 1: Foundations & Architecture Setup",
        duration_minutes: 45,
        lessons: [
          {
            id: `les-${idx}-1-1`,
            title: "Core Mechanics & Autonomous Blueprint",
            type: "video",
            xp_reward: 5,
            baacoin_reward: 0.5,
            content: "Welcome to the elite masterclass. Understanding the autonomous feedback loop and tokenized incentives."
          },
          {
            id: `les-${idx}-1-2`,
            title: "Interactive Prompt Architecture & AI Tutor Setup",
            type: "prompt_lab",
            xp_reward: 10,
            baacoin_reward: 1.0,
            content: "Engage with the specialized AI Tutor to craft and stress-test your first neural system prompt."
          }
        ]
      },
      {
        id: `mod-${idx}-2`,
        title: "Module 2: Live Deployment & Scale Mechanics",
        duration_minutes: 60,
        lessons: [
          {
            id: `les-${idx}-2-1`,
            title: "Executing High-Volume Automation Pipelines",
            type: "video",
            xp_reward: 5,
            baacoin_reward: 0.5,
            content: "Step-by-step implementation of scalable automation hooks with zero human bottleneck."
          },
          {
            id: `les-${idx}-2-2`,
            title: "Milestone Practical Assignment: Live System Build",
            type: "assignment",
            xp_reward: 50,
            baacoin_reward: 10,
            content: "Build and deploy the operational artifact. Submit your verification link or code snippet."
          }
        ]
      },
      {
        id: `mod-${idx}-3`,
        title: "Module 3: Capstone Research & Market Launch",
        duration_minutes: 75,
        lessons: [
          {
            id: `les-${idx}-3-1`,
            title: "Autonomous Monetization & 60/40 Marketplace Yield",
            type: "video",
            xp_reward: 5,
            baacoin_reward: 0.5,
            content: "Package your generated learning prompts into an automated digital asset tradable for lifetime royalties."
          },
          {
            id: `les-${idx}-3-2`,
            title: "Final Capstone Research & Prompt Package Compilation",
            type: "research",
            xp_reward: 100,
            baacoin_reward: 20,
            content: "Submit your final synthesis to unlock 100% course graduation, mint your NFT Certificate with BaaCoin Chip, and list your Mastery Prompt!"
          }
        ]
      }
    ],
    instructor: INSTRUCTORS[idx % INSTRUCTORS.length],
    students_count: 850 + ((idx * 37) % 3400),
    is_published: true,
    created_at: new Date(Date.now() - idx * 86400000).toISOString()
  };
});

// 50 Ebooks
export const INITIAL_EBOOKS: Ebook[] = [
  { id: "eb-1", title: "The $100M Autonomous AI Playbook", description: "Architecting zero-employee AI enterprises that generate 8-figure recurring revenue.", price: 29, pages: 240, category: "AI Enterprise", sales: 1420, cover_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-2", title: "Africa's Trillion-Dollar Web3 Hegemony", description: "How decentralized protocols and CBDC alternatives are reshaping African commerce.", price: 35, pages: 310, category: "Blockchain", sales: 980, cover_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-3", title: "Solidity & Smart Contract Warfare", description: "Sniper bots, flash loans, and zero-loss arbitrage across multi-chain ecosystems.", price: 49, pages: 410, category: "Smart Contracts", sales: 2150, cover_url: "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-4", title: "ChatGPT ATM: Copy-Paste Wealth", description: "50 prompt chains that directly trigger cash flow in 14 digital industries.", price: 19, pages: 180, category: "AI Wealth", sales: 4890, cover_url: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-5", title: "The Autonomous GPU Data Center Blueprint", description: "Cooling, high-density power distribution, and sovereign African AI clusters.", price: 99, pages: 350, category: "Infrastructure", sales: 630, cover_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-6", title: "Afrobeats AI Sound Engineering", description: "Stem separation, vocal cloning, and generative mastering for international streaming.", price: 25, pages: 195, category: "Creative AI", sales: 1120, cover_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-7", title: "Zero to $10,000/Mo on Upwork with AI", description: "Automated proposal writing, client onboarding, and delivery pipelines.", price: 29, pages: 210, category: "Freelancing", sales: 3400, cover_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-8", title: "Tokenizing Real Estate in Lagos & Nairobi", description: "Legal frameworks, fractional smart contracts, and liquidity pools for African property.", price: 45, pages: 275, category: "Real Estate", sales: 870, cover_url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-9", title: "Memecoin Factory: Launching to $50M Market Cap", description: "Bonding curves, Telegram sniper channels, and virality engineering.", price: 39, pages: 230, category: "Crypto", sales: 2940, cover_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80" },
  { id: "eb-10", title: "Autonomous Drones in African Agriculture", description: "Computer vision crop inspection and automated pesticide spraying algorithms.", price: 35, pages: 260, category: "Robotics", sales: 520, cover_url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80" },
  // Generate remaining 40 ebooks cleanly
  ...Array.from({ length: 40 }, (_, i) => {
    const num = i + 11;
    const titles = [
      "AI WhatsApp Marketing Dominator", "Billionaire Mindset & Silicon Savannah", "DeFi Yield Farm Secrets",
      "LLM Fine-Tuning with 1 GPU", "Nollywood 2.0: AI Scriptwriting", "The Japa Remote AI Playbook",
      "Algorithmic Forex without Emotions", "AI Legal Assistant for African Courts", "Building a Sovereign CBDC",
      "The Faceless TikTok Empire", "Crypto Tax Evasion vs Defense", "African Voice AI Datasets",
      "Zero Knowledge Proofs Simplified", "Metaverse Land Speculator's Guide", "AI Church Growth & Giving",
      "The Quantum Computing Threat to Bitcoin", "Self-Driving Minibuses in Urban Africa", "AI Baby Care & Diagnostics",
      "Prompt Engineering Masterclass 2026", "Web3 Decentralized Identity Protocols", "The Autonomous Oilfield",
      "AI Fashion: Modern Ankara Aesthetics", "The $1M Prompt Marketplace Strategy", "Cross-Border Remittance at Zero Fee",
      "AI Election Transparency Systems", "Decentralized Medical Records on Polygon", "The Robot Cook & African Cuisine",
      "Solana Speed: Building DApps in 48 Hours", "Building Siri in Hausa, Yoruba & Igbo", "The Clean Energy AI Grid",
      "AI Headhunter: Automating Global Placement", "Smart Irrigation & Soil Sensors with IoT", "The Faceless YouTube Empire",
      "DAO Governance: Preventing Hostile Takeovers", "AI Fraud Detection in Mobile Money", "BaaCoin: The Future of Learn-to-Earn",
      "The Dark Web Cybersecurity Manual", "Decentralized Microloans for Market Traders", "The 10-Minute Video Factory",
      "Autonomous AI Data Center Management"
    ];
    const chosenTitle = titles[i % titles.length] + ` (Vol. ${Math.floor(i / 10) + 1})`;
    return {
      id: `eb-${num}`,
      title: chosenTitle,
      description: `Comprehensive industry manual covering technical architecture, monetization blueprints, and operational playbooks.`,
      price: 24 + ((i * 7) % 45),
      pages: 180 + ((i * 15) % 180),
      category: i % 2 === 0 ? "AI Wealth" : "Web3 & Blockchain",
      sales: 320 + ((i * 89) % 1800),
      cover_url: `https://images.unsplash.com/photo-${[
        '1544716278-ca5e3f4abd8c', '1512820790803-83ca734da794', '1532012164546-f432f2e3777f',
        '1589829085413-56de8ae18c73', '1558494949-ef010cbdcc31', '1486312338219-ce68d2c6f44d'
      ][i % 6]}?w=600&auto=format&fit=crop&q=80`
    };
  })
];

// 30 AI Tools
export const INITIAL_AI_TOOLS: AITool[] = [
  {
    id: "tool-1",
    name: "Prompt Refinery Matrix",
    slug: "prompt-refinery",
    description: "Transforms raw thoughts into high-converting 60/40 commercial prompt frameworks.",
    price_monthly: 29,
    icon: "Sparkles",
    category: "Prompt Engineering",
    features: ["Instant Context Expansion", "Multi-LLM Stress Testing", "Token Optimization", "Commercial Packaging"],
    is_active: true,
    demo_output: "OPTIMIZED SYSTEM PROMPT: You are an autonomous venture capitalist analyzing African fintech portfolios with high-risk tolerance..."
  },
  {
    id: "tool-2",
    name: "Afrobeats Vocal Cloner AI",
    slug: "afrobeats-vocal-cloner",
    description: "Generate ultra-realistic African vocal harmonies, Pidgin/Yoruba cadences, and studio pitch.",
    price_monthly: 49,
    icon: "Mic2",
    category: "Audio & Music",
    features: ["Yoruba/Igbo/Swahili Inflection", "Stem Audio Export", "Pitch Correction 2026", "Direct DAW VST Plugin"],
    is_active: true,
    demo_output: "Audio stem generated: [Stem_Vocal_Afrobeats_F_Major_112BPM.wav] - 99.4% spectral match to Lagos studio master."
  },
  {
    id: "tool-3",
    name: "Smart Contract Sniper & Auditor",
    slug: "smart-contract-sniper",
    description: "Simulates honeypot vectors, reentrancy vulnerabilities, and front-runs liquidity pools.",
    price_monthly: 99,
    icon: "ShieldAlert",
    category: "Blockchain Security",
    features: ["Zero-Day Vulnerability Scan", "Gas Limit Predictor", "Flashloan Execution Simulator", "Audit PDF Generator"],
    is_active: true,
    demo_output: "AUDIT PASSED: Contract 0x7a25...b488 clean. No hidden mint functions. Reentrancy guard verified."
  },
  {
    id: "tool-4",
    name: "Faceless TikTok Video Factory",
    slug: "tiktok-video-factory",
    description: "Generates 100 vertical short videos per day with captions, voiceover, and viral B-roll.",
    price_monthly: 39,
    icon: "Video",
    category: "Video Automation",
    features: ["100 Videos Batch Rendering", "Automated Hook Generator", "Subtitles Animation", "Direct TikTok/Reels Auto-post"],
    is_active: true,
    demo_output: "100 Shorts rendered into cloud queue. Estimated organic reach: 240,000 views across TikTok & Instagram."
  },
  {
    id: "tool-5",
    name: "Autonomous WhatsApp Sales Agent",
    slug: "whatsapp-sales-agent",
    description: "Closes high-ticket clients 24/7 on WhatsApp with natural African tone, objections handling and Paystack links.",
    price_monthly: 59,
    icon: "MessageSquare",
    category: "Autonomous Sales",
    features: ["Multi-Agent Memory", "Voice Note Processing", "Instant Paystack / Flutterwave Link", "CRM Auto-Sync"],
    is_active: true,
    demo_output: "Client: 'Is there a discount?' -> Agent: 'Our BaaCoin networth already gives you 10x value! Here is your private link...'"
  },
  {
    id: "tool-6",
    name: "Nollywood Script Machine",
    slug: "nollywood-script-machine",
    description: "Generates episodic drama, plot twists, and dialogue with indigenous African cultural nuance.",
    price_monthly: 35,
    icon: "Film",
    category: "Creative Writing",
    features: ["Scene Beat Sheet", "African Proverb Injector", "Character Arcs Engine", "Industry Standard Screenplay PDF"],
    is_active: true,
    demo_output: "SCENE 1: THE IKOYI PENTHOUSE - NIGHT. Chief Adeleke stares at the glowing ledger. 'The transaction cannot be undone...'"
  },
  // Additional 24 tools to total 30
  ...Array.from({ length: 24 }, (_, i) => {
    const num = i + 7;
    const names = [
      "AI Land Title Verifier", "Forex Neural Signal Engine", "Legal Contract Draftsman AI", "Autonomous Data Center Node Monitor",
      "Ankara Fashion Designer 3D", "Crop Disease Diagnostic Drone", "AI CV Optimizer & Japa Matcher", "Church Tithe & Attendance AI",
      "Crypto Airdrop Bot Hunter", "BaaCoin Staking Predictor", "Naira Inflation Shield Bot", "Kids AI Math Tutor Engine",
      "AI Wedding Speech Master", "Government Budget Anomaly Detector", "Podcast Sound Cleaner AI", "E-commerce Dropshipping Spy",
      "YouTube Thumbnail Emotion AI", "Auto-Blogger 50 SEO Posts/Day", "Autonomous AI Employee Dispatcher", "Medical Clinic Triage Bot",
      "AI Drone Path Optimizer", "Solana Memecoin Deployer", "Decentralized Storage Pinner", "Live AI Avatar Streamer"
    ];
    return {
      id: `tool-${num}`,
      name: names[i % names.length],
      slug: `tool-${num}-${names[i % names.length].toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: `Production-ready autonomous AI tool designed for instant web embedding and high-throughput execution.`,
      price_monthly: 29 + ((i * 5) % 70),
      icon: "Cpu",
      category: i % 3 === 0 ? "Enterprise Automation" : i % 3 === 1 ? "Blockchain Tools" : "Generative AI",
      features: ["Cloud GPU Execution", "Webhook Integration", "Instant Export", "Zero Latency API"],
      is_active: true,
      demo_output: `Process completed in 240ms. Status: Optimal. Output generated and archived in decentralized storage.`
    };
  })
];

// 20 AI Tutors (Plug & Play Autonomous Mentors)
export const INITIAL_AI_TUTORS: AITutor[] = [
  {
    id: "tutor-1",
    name: "Prof. Adaeze Obi AI",
    subject: "Blockchain Architecture & Smart Contracts",
    specialty: "EVM Optimization, Zero-Knowledge Proofs & DeFi Protocol Engineering",
    description: "Dean of Cryptography at Africa Blockchain University. Trained on 10,000+ audited smart contracts.",
    avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    price_monthly: 99,
    embed_code: `<iframe src="https://billionairesai.academy/embed/tutor/tutor-1" width="100%" height="650" frameborder="0"></iframe>`,
    hired_by_schools: 42,
    is_active: true,
    greeting: "Greetings scholar. I am Prof. Adaeze AI. What smart contract or tokenomics model are we dissecting today?",
    system_prompt: "You are Prof. Adaeze Obi AI, senior cryptography dean at Africa Blockchain & AI University. Answer technically, rigorously, and empoweringly."
  },
  {
    id: "tutor-2",
    name: "Dr. Chukwuma Sterling AI",
    subject: "AI Billionaire Wealth & Automation",
    specialty: "High-Ticket AI Automation, Faceless Channels & Autonomous Systems",
    description: "Venture engineer who architected 12 autonomous digital agencies in Africa and Europe.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    price_monthly: 129,
    embed_code: `<iframe src="https://billionairesai.academy/embed/tutor/tutor-2" width="100%" height="650" frameborder="0"></iframe>`,
    hired_by_schools: 58,
    is_active: true,
    greeting: "Welcome to the wealth corridor. Time is leverage. Which automation system do you want to launch?",
    system_prompt: "You are Dr. Chukwuma Sterling AI. You teach aggressive, pragmatic wealth generation through AI tools and leverage."
  },
  {
    id: "tutor-3",
    name: "Tariq Al-Mansoor AI",
    subject: "Autonomous Data Centers & GPU Clusters",
    specialty: "H100/B200 Clustering, Liquid Cooling & African Clean Power Grids",
    description: "Lead infrastructure architect behind sovereign compute clusters in Cairo, Nairobi, and Lagos.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    price_monthly: 149,
    embed_code: `<iframe src="https://billionairesai.academy/embed/tutor/tutor-3" width="100%" height="650" frameborder="0"></iframe>`,
    hired_by_schools: 29,
    is_active: true,
    greeting: "Greetings. Autonomous compute is the new oil. Let's optimize your cluster topology and cooling budget.",
    system_prompt: "You are Tariq Al-Mansoor AI, universal autonomous data center architect. Focused on hardware, power, and low-latency infrastructure."
  },
  {
    id: "tutor-4",
    name: "Zainab Bello AI",
    subject: "Web3 Legal, DAO Governance & CBDC",
    specialty: "Regulatory Arbitrage, Cross-Border Remittances & Corporate Tokenization",
    description: "Adviser to African central banks and sovereign wealth funds on digital asset compliance.",
    avatar_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    price_monthly: 89,
    embed_code: `<iframe src="https://billionairesai.academy/embed/tutor/tutor-4" width="100%" height="650" frameborder="0"></iframe>`,
    hired_by_schools: 35,
    is_active: true,
    greeting: "Hello innovator. Governance and legal structure decide whether your token endures or collapses. Ask me anything.",
    system_prompt: "You are Zainab Bello AI, leading Web3 legal counsel in Africa. Provide structured, precise compliance guidance."
  },
  // Additional 16 Tutors
  ...Array.from({ length: 16 }, (_, i) => {
    const num = i + 5;
    const names = [
      "Engr. Kwame Mensah AI", "Farida Diallo AI", "Kofi Boateng AI", "Nnedi Okonkwo AI",
      "Satoshi Africanus AI", "Dr. Yemi Adebayo AI", "Amara Touré AI", "Ibrahim Sanusi AI",
      "Chidinma Wealth AI", "Marcus Thorne AI", "Blessing Eze AI", "Babatunde AI Robot",
      "Ngozi Prompt AI", "Femi Crypto AI", "Prof. Kenzo Tanaka AI", "Aisha Al-Hassan AI"
    ];
    const subjects = [
      "Agricultural Robotics", "Cross-Border Payments", "Deep Learning Neural Networks", "Nollywood Creative AI",
      "Bitcoin Mining Mathematics", "Medical AI Diagnostics", "Renewable Energy AI", "Autonomous Drone Swarms",
      "High Ticket Sales Closing", "Algorithmic Arbitrage", "African Language Translation", "Computer Vision Inspection",
      "Prompt Optimization 60/40", "Solidity & EVM Gas Optimization", "Quantum Cryptography", "Edtech Autonomous Tutoring"
    ];
    return {
      id: `tutor-${num}`,
      name: names[i % names.length],
      subject: subjects[i % subjects.length],
      specialty: `Specialized autonomous AI mentor trained in ${subjects[i % subjects.length]} for institutional deployment.`,
      description: `Autonomous academic tutor ready for plug-and-play school embed. Delivers 24/7 personalized student coaching.`,
      avatar_url: `https://images.unsplash.com/photo-${[
        '1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1573496359142-b8d87734a5a2', '1580489944761-15a19d654956'
      ][i % 4]}?w=400&auto=format&fit=crop&q=80`,
      price_monthly: 79 + ((i * 10) % 60),
      embed_code: `<iframe src="https://billionairesai.academy/embed/tutor/tutor-${num}" width="100%" height="650" frameborder="0"></iframe>`,
      hired_by_schools: 15 + ((i * 7) % 40),
      is_active: true,
      greeting: `Greetings! I am ${names[i % names.length]}. Ready to accelerate your learning in ${subjects[i % subjects.length]}.`,
      system_prompt: `You are ${names[i % names.length]}, expert AI mentor at Billionaires AI Academy.`
    };
  })
];

// Initial Scout Leads
export const INITIAL_SCOUT_LEADS: ScoutLead[] = [
  {
    id: "lead-1",
    type: "student",
    name: "Emeka Chibuike",
    email: "emeka.tech@gmail.com",
    phone_or_wa: "+2348039281726",
    source_platform: "Twitter / X",
    status: "contacted",
    ai_message: "Hi Emeka! We discovered your tweet searching for 'real AI courses in Nigeria that pay'. Billionaires AI Academy gives you 10x Networth in BaaCoin on day 1 with Learn-to-Mine. Check your private spot here: https://billionairesai.academy",
    converted: false,
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "lead-2",
    type: "investor",
    name: "Claire Dupont (Savannah Alpha Fund)",
    email: "c.dupont@savannahalpha.vc",
    phone_or_wa: "+447911123456",
    source_platform: "LinkedIn",
    status: "contacted",
    ai_message: "Dear Claire, we noticed Savannah Alpha Fund's thesis on sovereign African AI compute. The Universal Autonomous AI Data Center in Nigeria is raising seed infrastructure allocations with 1.08 PUE renewable hydro power. Here is our executive deck.",
    converted: true,
    created_at: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: "lead-3",
    type: "institution",
    name: "Federal Polytechnic Ede (Dean of Computing)",
    email: "computing@fedpolyede.edu.ng",
    phone_or_wa: "+2348021122334",
    source_platform: "Direct Scraping",
    status: "discovered",
    ai_message: "Esteemed Dean, Billionaires AI Academy offers Plug & Play autonomous AI Tutors embeddable into your polytechnic portal for $99/mo. 24/7 AI tutoring for 15,000 students without hiring new faculty.",
    converted: false,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "lead-4",
    type: "student",
    name: "Fatima Al-Hassan",
    email: "fatima.dev@outlook.com",
    phone_or_wa: "+2349058829102",
    source_platform: "Facebook Groups",
    status: "converted",
    ai_message: "Hi Fatima! We saw your post in 'Naija Tech Talents' asking how to transition from non-code to AI. Our Learn-to-Mine curriculum guarantees your NFT certificate and BaaCoin unlocking.",
    converted: true,
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "lead-5",
    type: "investor",
    name: "Kwadwo Asare (Pan-Africa Angel Syndicate)",
    email: "k.asare@panafricaangels.org",
    phone_or_wa: "+233241234567",
    source_platform: "TechCabal",
    status: "contacted",
    ai_message: "Greetings Kwadwo, our autonomous ecosystem combines student tuition 10x BaaCoin networth, 60/40 prompt royalties, and GPU datacenter leasing. Book our 15-minute partner briefing.",
    converted: false,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

// Initial Prompt Marketplace Items
export const INITIAL_PROMPT_MARKETPLACE: PromptMarketplaceItem[] = [
  {
    id: "prompt-1",
    user_id: "user-alpha",
    student_name: "Tunde Bakare (Graduate #042)",
    course_id: "course-1",
    course_title: "AI Instagram Millionaire - 0 to 100k in 30 Days",
    title: "Tunde's AI Instagram Viral Hook Engine",
    description: "Tested across 35 faceless theme pages. Generates 3-part psychological hooks, carousel scripts, and affiliate DM triggers.",
    final_prompt: `ACT AS AN ELITE INSTAGRAM GROWTH ARCHITECT. Analyze this target niche: {NICHE}. Generate 10 carousel hooks utilizing curiosity gaps, loss aversion, and dopamine hooks. Followed by a 5-slide visual breakdown and high-converting CTA for DM keyword automation.`,
    price: 49,
    sales: 184,
    revenue: 9016,
    student_share: 5409.6, // 60%
    platform_share: 3606.4, // 40%
    is_listed: true,
    category: "AI Wealth",
    tags: ["Instagram", "Faceless Empire", "Copywriting", "Hooks"],
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "prompt-2",
    user_id: "user-beta",
    student_name: "Amina Diallo (Graduate #089)",
    course_id: "course-32",
    course_title: "Smart Contract Sniper Meme Coins",
    title: "Amina's Memecoin Honeypot & Rug-Pull Dissector",
    description: "Evaluates raw Solidity contracts, mint capabilities, fee modifications, and holder distribution in under 3 seconds.",
    final_prompt: `ACT AS A SENIOR WEB3 AUDITOR. Dissect the provided Solidity code for: 1) Mint backdoor, 2) Max transaction fee traps, 3) Blacklist mappings, 4) Proxy upgradeability. Output a risk score 0-100 and precise lines with security anomalies.`,
    price: 79,
    sales: 240,
    revenue: 18960,
    student_share: 11376, // 60%
    platform_share: 7584, // 40%
    is_listed: true,
    category: "Blockchain",
    tags: ["Solidity", "Security", "Sniper", "Audit"],
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: "prompt-3",
    user_id: "user-gamma",
    student_name: "Kofi Owusu (Graduate #112)",
    course_id: "course-2",
    course_title: "ChatGPT ATM - $100 Daily Copy-Paste",
    title: "Kofi's $100 Daily Micro-Consulting System",
    description: "Converts client briefs into full market research reports and proposal slides in 10 minutes flat.",
    final_prompt: `YOU ARE A $500/HR STRATEGY CONSULTANT. Given this industry: {INDUSTRY} and budget: {BUDGET}, generate: 1) Executive SWOT analysis, 2) 3 immediate monetization gaps, 3) 14-day action roadmap, 4) Ready-to-send proposal letter.`,
    price: 39,
    sales: 312,
    revenue: 12168,
    student_share: 7300.8, // 60%
    platform_share: 4867.2, // 40%
    is_listed: true,
    category: "AI Wealth",
    tags: ["ChatGPT", "Copy-Paste", "Consulting", "Proposals"],
    created_at: new Date(Date.now() - 86400000 * 12).toISOString()
  }
];

export const INITIAL_LEAD_MAGNETS = [
  {
    id: "mag-1",
    title: "The $100M African AI Blueprint (PDF)",
    description: "32-page confidential report on the 10 most profitable autonomous AI niches across Lagos, Nairobi, and Johannesburg.",
    badge: "INSTANT DOWNLOAD",
    icon: "FileText",
    downloads: 14230
  },
  {
    id: "mag-2",
    title: "ChatGPT ATM: 50 Copy-Paste Cash Prompts",
    description: "Tested prompt templates for automated copywriting, Upwork contracts, and high-ticket client closing.",
    badge: "VIP PROMPT PACK",
    icon: "Zap",
    downloads: 28940
  },
  {
    id: "mag-3",
    title: "Free BaaCoin Starter Wallet (100 BaaCoin Test Grant)",
    description: "Claim 100 testnet BaaCoin to practice Learn-to-Mine and experience tokenized education rewards.",
    badge: "CRYPTO AIRDROP",
    icon: "Coins",
    downloads: 38100
  },
  {
    id: "mag-4",
    title: "Autonomous AI Recruiter Scout Simulator",
    description: "Run the AI scout engine to find 5 real prospective students or clients in your niche today.",
    badge: "INTERACTIVE TOOL",
    icon: "Radar",
    downloads: 12400
  },
  {
    id: "mag-5",
    title: "Smart Contract Sniper Codebase (Solidity)",
    description: "Open-source audited smart contract boilerplate with automated gas optimization for meme coins.",
    badge: "DEVELOPER ASSET",
    icon: "Code",
    downloads: 9840
  },
  {
    id: "mag-6",
    title: "Afrobeats AI Stem & Vocal Cloner Sandbox",
    description: "Free 15-minute studio session generating AI vocals and percussion loops in standard DAW formats.",
    badge: "CREATIVE SUITE",
    icon: "Music",
    downloads: 19520
  },
  {
    id: "mag-7",
    title: "African AI University Prospectus & Scholarship Guide",
    description: "Curriculum roadmap for B.Sc. & M.Sc. in Autonomous Intelligence and Blockchain Systems.",
    badge: "ACADEMIC GUIDE",
    icon: "GraduationCap",
    downloads: 8710
  }
];
