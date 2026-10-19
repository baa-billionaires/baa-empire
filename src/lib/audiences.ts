// 20 Preset Target Audiences for Social Media & Marketing Command

export interface TargetAudiencePreset {
  id: string;
  name: string;
  age_range: string;
  locations: string[];
  interests: string[];
  pain_points: string;
  hashtags: string[];
  best_platforms: string[];
}

export const AUDIENCE_PRESETS: TargetAudiencePreset[] = [
  {
    id: "global_students_18_25",
    name: "Global AI Students (18-25)",
    age_range: "18-25",
    locations: ["Nigeria", "Ghana", "Kenya", "UK", "US", "South Africa"],
    interests: ["ChatGPT", "Remote Work", "Upwork", "Coding", "Passive Income"],
    pain_points: "Unemployed or underpaid, seeking foreign currency income.",
    hashtags: ["#LearnAI", "#BillionairesAI", "#BaaCoin", "#TechTwitter", "#ChatGPT"],
    best_platforms: ["TikTok", "Twitter / X", "Instagram"]
  },
  {
    id: "investors_usa",
    name: "Tech & Sovereign Infrastructure Angels",
    age_range: "35-60",
    locations: ["London", "New York", "San Francisco", "Dubai", "Lagos"],
    interests: ["GPU Compute", "Renewable Energy", "African Venture", "IRR 24%"],
    pain_points: "Looking for high-yield, green sovereign data center allocations.",
    hashtags: ["#VentureCapital", "#AfricaTech", "#DataCenter", "#AIEnergy"],
    best_platforms: ["LinkedIn", "Twitter / X"]
  },
  {
    id: "lagos_smes",
    name: "Lagos SME Owners & Traders",
    age_range: "26-50",
    locations: ["Lagos", "Abuja", "Port Harcourt", "Ibadan"],
    interests: ["WhatsApp Sales Bot", "Naira Inflation Hedge", "E-commerce", "Paystack"],
    pain_points: "Losing customers due to slow replies and rising inflation.",
    hashtags: ["#NaijaBusiness", "#LagosSME", "#WhatsAppSales", "#GrowYourBusiness"],
    best_platforms: ["Facebook", "Instagram", "WhatsApp"]
  },
  {
    id: "church_leaders",
    name: "African Church & Ministry Leaders",
    age_range: "35-65",
    locations: ["Nigeria", "Ghana", "South Africa", "Kenya", "Diaspora"],
    interests: ["Church Automation", "Sermon Generator", "Tithe Tracking", "Member Care"],
    pain_points: "Time-consuming administration and sermon research.",
    hashtags: ["#ChurchTech", "#PastorLife", "#MinistryGrowth", "#FaithAndAI"],
    best_platforms: ["Facebook", "YouTube", "WhatsApp"]
  },
  {
    id: "university_admins",
    name: "University Deans & Polytechnic Leadership",
    age_range: "45-65",
    locations: ["Pan-Africa", "West Africa", "East Africa"],
    interests: ["Plug & Play AI Tutors", "Accreditation", "Faculty Scaling"],
    pain_points: "Lacking enough qualified professors for computer science students.",
    hashtags: ["#HigherEdAfrica", "#EdTech", "#UniversityInnovation", "#AITutors"],
    best_platforms: ["LinkedIn", "Direct Email"]
  },
  {
    id: "gen_z_tiktok",
    name: "Gen-Z Content Creators & Influencers",
    age_range: "16-24",
    locations: ["Global Africa", "UK", "US", "Canada"],
    interests: ["Faceless TikTok", "Video Factory", "CapCut", "Afrobeats AI"],
    pain_points: "Camera-shy but want to build massive monetized follower pages.",
    hashtags: ["#FacelessTiktok", "#VideoFactory", "#CreatorFund", "#AIHacks"],
    best_platforms: ["TikTok", "Instagram Reels", "YouTube Shorts"]
  },
  {
    id: "linkedin_ceos",
    name: "African Tech CEOs & Executives",
    age_range: "30-55",
    locations: ["Nairobi", "Lagos", "Kigali", "Cape Town"],
    interests: ["Autonomous Enterprise", "Zero-Employee Company", "Cost Reduction"],
    pain_points: "High staff overhead and manual operational bottlenecks.",
    hashtags: ["#AutonomousEnterprise", "#AfricanTech", "#Leadership", "#AIROI"],
    best_platforms: ["LinkedIn"]
  },
  {
    id: "mothers",
    name: "Educated Mothers & Home Guardians",
    age_range: "28-45",
    locations: ["Urban Africa", "Diaspora"],
    interests: ["Kids AI Math Tutor", "Child Safety", "Baby Monitor AI"],
    pain_points: "Want their children ahead of the global curriculum without expensive tutors.",
    hashtags: ["#AfricanMoms", "#KidsCoding", "#FutureReady", "#SmartParenting"],
    best_platforms: ["Instagram", "Facebook", "WhatsApp"]
  },
  {
    id: "secondary_school",
    name: "Secondary School Leavers & JAMB Students",
    age_range: "16-20",
    locations: ["Nigeria", "Ghana"],
    interests: ["Pass JAMB", "Learn Coding Fast", "Tech Scholarships"],
    pain_points: "University strikes and lack of practical tech education.",
    hashtags: ["#JAMB2026", "#LearnToMine", "#TechScholarship", "#FutureBillionaire"],
    best_platforms: ["TikTok", "Twitter / X"]
  },
  {
    id: "crypto_traders",
    name: "DeFi Yield Farmers & Crypto Airdrop Hunters",
    age_range: "20-35",
    locations: ["Nigeria", "Kenya", "Vietnam", "India"],
    interests: ["Smart Contract Sniper", "BaaCoin", "Solidity", "Memecoins"],
    pain_points: "Rug-pulls and high gas fees eating profits.",
    hashtags: ["#CryptoAfrica", "#SoliditySniper", "#AirdropHunter", "#DeFiYield"],
    best_platforms: ["Twitter / X", "Telegram", "Discord"]
  },
  {
    id: "nollywood_creatives",
    name: "Nollywood Filmmakers & Screenwriters",
    age_range: "24-45",
    locations: ["Lagos", "Enugu", "Asaba", "Accra"],
    interests: ["Nollywood Script Machine", "AI Voiceover", "Video Editing"],
    pain_points: "Expensive voice actors and long scriptwriting turnaround times.",
    hashtags: ["#NollywoodAI", "#AfricanCinema", "#FilmProduction", "#Screenwriting"],
    best_platforms: ["Instagram", "YouTube"]
  },
  {
    id: "freelancers_upwork",
    name: "Upwork & Fiverr Freelancers",
    age_range: "21-35",
    locations: ["Nigeria", "Pakistan", "Philippines", "Kenya"],
    interests: ["AI Proposal Writer", "Copywriting", "Client Closing"],
    pain_points: "Low contract conversion rates and proposal fatigue.",
    hashtags: ["#UpworkHustle", "#FreelanceAI", "#DigitalNomad", "#HighTicket"],
    best_platforms: ["Twitter / X", "LinkedIn", "Facebook Groups"]
  },
  {
    id: "lawyers_smes",
    name: "Legal Practitioners & SME Advocates",
    age_range: "28-55",
    locations: ["Abuja", "Lagos", "Johannesburg", "London"],
    interests: ["Legal Contract SME", "Land Registry Blockchain", "Contract Audit"],
    pain_points: "Drafting repetitive agreements and reviewing complex clauses.",
    hashtags: ["#LegalTech", "#SmartContracts", "#AfricanLaw", "#Compliance"],
    best_platforms: ["LinkedIn"]
  },
  {
    id: "farmers_agritech",
    name: "Modern Agricultural Co-ops & Agritech",
    age_range: "30-60",
    locations: ["Ogun", "Kaduna", "Rift Valley", "Accra"],
    interests: ["Drone Crop Inspection", "Supply Chain Blockchain", "Yield Boost"],
    pain_points: "Crop disease outbreaks and opaque supply chain middlemen.",
    hashtags: ["#AgriTechAfrica", "#SmartFarming", "#DroneAgriculture"],
    best_platforms: ["Facebook", "WhatsApp"]
  },
  {
    id: "afrobeats_musicians",
    name: "Afrobeats Producers & Songwriters",
    age_range: "18-32",
    locations: ["Lagos", "London", "Atlanta", "Johannesburg"],
    interests: ["Vocal Cloner", "Beat Maker", "AI Mastering", "Streaming Royalties"],
    pain_points: "Expensive studio time and vocal feature clearance fees.",
    hashtags: ["#AfrobeatsAI", "#MusicProduction", "#VocalClone", "#SoundEngineering"],
    best_platforms: ["Instagram", "TikTok", "YouTube"]
  },
  {
    id: "doctors_clinics",
    name: "Healthcare Centers & Rural Clinic Operators",
    age_range: "30-60",
    locations: ["Sub-Saharan Africa"],
    interests: ["Medical Assistant AI", "Patient Triage", "Diagnostic Prompts"],
    pain_points: "Doctor shortage leading to patient backlogs.",
    hashtags: ["#HealthTechAfrica", "#RuralHealth", "#TelemedicineAI"],
    best_platforms: ["LinkedIn", "Facebook"]
  },
  {
    id: "real_estate_agents",
    name: "Real Estate Brokers & Property Flippers",
    age_range: "28-50",
    locations: ["Lekki", "Ikoyi", "Abuja", "Westlands Nairobi"],
    interests: ["AI Real Estate Gold", "Land Title Verification", "Tokenized Property"],
    pain_points: "Fraudulent land titles and slow buyer acquisition.",
    hashtags: ["#LagosRealEstate", "#TokenizedProperty", "#PropTech"],
    best_platforms: ["Instagram", "LinkedIn", "WhatsApp"]
  },
  {
    id: "forex_crypto_traders",
    name: "Algorithmic Forex & Signal Traders",
    age_range: "20-38",
    locations: ["Nigeria", "South Africa", "Ghana"],
    interests: ["Forex Signal Bot", "MT5 Automation", "Risk Management"],
    pain_points: "Emotional trading leading to blown capital accounts.",
    hashtags: ["#ForexSignals", "#AlgoTrading", "#NaijaForex"],
    best_platforms: ["Telegram", "Twitter / X"]
  },
  {
    id: "wedding_event_planners",
    name: "Event Organizers & Wedding Planners",
    age_range: "24-42",
    locations: ["Lagos", "Nairobi", "Accra"],
    interests: ["AI Wedding Planner", "Speech Writing", "Budget Optimization"],
    pain_points: "Coordinating 50+ vendors and bride stress.",
    hashtags: ["#AfricanWeddings", "#EventPlanning", "#AIVendor"],
    best_platforms: ["Instagram", "Pinterest"]
  },
  {
    id: "government_civil_servants",
    name: "Public Sector Auditors & Policy Analysts",
    age_range: "35-65",
    locations: ["Abuja", "Pretoria", "Nairobi", "Addis Ababa"],
    interests: ["Budget Anomaly Detector", "Election Transparency", "Waste to Wealth"],
    pain_points: "Detecting corruption and auditing voluminous state accounts.",
    hashtags: ["#PublicTech", "#TransparencyAfrica", "#GovTech"],
    best_platforms: ["LinkedIn", "Twitter / X"]
  }
];
