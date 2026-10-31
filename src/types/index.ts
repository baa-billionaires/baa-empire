export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: 'student' | 'admin' | 'instructor';
  avatar_url?: string;
  baacoin_balance: number;       // Unlocked, spendable/tradable BaaCoin
  baacoin_networth: number;      // Total networth = course price * 10 (locked until graduation)
  baacoin_locked: boolean;       // True until graduation
  referral_code: string;
  referred_by?: string;
  level: number;
  xp: number;
  is_verified: boolean;
  created_at: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration_minutes: number;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'prompt_lab' | 'assignment' | 'research';
    xp_reward: number;
    baacoin_reward: number;
    completed?: boolean;
    content?: string;
  }[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;                 // e.g. 99 USD
  baacoin_value: number;         // e.g. 990 BaaCoin (10x price)
  level: 'Beginner' | 'Intermediate' | 'Mastery' | 'Executive';
  category: 'AI Wealth' | 'Blockchain & DeFi' | 'Prompts & Automation' | 'Autonomous Robotics' | 'Africa AI Impact' | 'Autonomous Enterprise';
  thumbnail_url: string;
  modules: CourseModule[];
  instructor: string;
  students_count: number;
  is_published: boolean;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;              // 0 to 100%
  completed: boolean;
  total_mined: number;           // BaaCoin mined through learning
  created_at: string;
  course?: Course;
}

export interface Interaction {
  id: string;
  user_id: string;
  course_id: string;
  type: 'video_watch' | 'ai_tutor_query' | 'assignment_complete' | 'research_submit';
  xp_earned: number;
  baacoin_mined: number;
  prompt_data: string;
  created_at: string;
}

export interface PromptMarketplaceItem {
  id: string;
  user_id: string;
  student_name: string;
  course_id: string;
  course_title: string;
  title: string;
  description: string;
  final_prompt: string;
  price: number;                 // e.g. $49
  sales: number;
  revenue: number;
  student_share: number;         // 60%
  platform_share: number;        // 40%
  is_listed: boolean;
  category: string;
  tags: string[];
  created_at: string;
}

export interface CertificateNFT {
  id: string;
  user_id: string;
  student_name: string;
  course_id: string;
  course_title: string;
  nft_id: string;                // 0x...
  baacoin_engraved: number;      // e.g. 990 BaaCoin
  ipfs_url: string;              // ipfs://...
  qr_data: string;               // verification & referral URL
  is_tradable: boolean;
  issue_date: string;
  transaction_hash: string;
  referral_code: string;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  cover_url: string;
  pdf_url?: string;
  sales: number;
  pages: number;
  category: string;
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_monthly: number;
  icon: string;
  category: string;
  features: string[];
  is_active: boolean;
  demo_output: string;
}

export interface AITutor {
  id: string;
  name: string;
  subject: string;
  specialty: string;
  description: string;
  avatar_url: string;
  price_monthly: number;         // e.g. $99/mo for schools
  embed_code: string;
  hired_by_schools: number;
  is_active: boolean;
  greeting: string;
  system_prompt: string;
}

export interface ScoutLead {
  id: string;
  type: 'student' | 'investor' | 'institution' | 'talent' | 'client';
  name: string;
  title?: string;
  organization?: string;
  domain?: string;
  location?: string;
  email: string;
  phone_or_wa?: string;
  linkedin_url?: string;
  source_platform: 'LinkedIn' | 'Twitter / X' | 'Facebook Groups' | 'TechCabal' | 'Direct Scraping' | 'GitHub' | 'AngelList' | 'ProductHunt';
  status: 'discovered' | 'contacted' | 'qualified' | 'converted';
  lead_score?: number; // 0 - 100
  estimated_value?: number; // USD
  intent_signal?: string;
  skills_or_focus?: string[];
  ai_message: string;
  converted: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referred_name: string;
  commission: number;
  baacoin_bonus: number;         // 10% of new student's networth
  paid: boolean;
  created_at: string;
}

export interface Wallet {
  user_id: string;
  balance: number;               // Spendable BaaCoin
  total_earned: number;          // From prompt sales (60%) & referrals
  total_mined: number;           // Mined from learning interactions
}

export type EcosystemLanguage = 'en' | 'sw' | 'fr' | 'es' | 'zh' | 'yo' | 'ar' | 'ha' | 'pt';

export interface AIWorkforceAgent {
  id: string;
  name: string;
  tagline: string;
  category: 'Personal Assistants' | 'Industry Swarms' | 'Strategic Legions' | 'Corporate Colonies';
  description: string;
  hourly_rate_baacoin: number;
  monthly_rate_usd: number;
  avatar_url: string;
  capabilities: string[];
  autonomous_loop_preview: string[];
  active_deployments: number;
  rating: number;
  system_core: string;
  creator_name: string;
  is_verified: boolean;
}

export interface OmniAdCampaign {
  id: string;
  title: string;
  channel: 'Google Search & SEO' | 'TikTok & Reels Viral' | 'X / Twitter AI Bots' | 'Meta & Instagram' | 'Decentralized Ad Mesh';
  status: 'active' | 'scaling' | 'optimizing';
  daily_budget_usd: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: string;
  cpa_usd: number;
  autonomous_trigger: string;
}

export interface StakingPool {
  id: string;
  name: string;
  tier: string;
  apy_percent: number;
  total_staked_baacoin: number;
  lockup_days: number;
  daily_yield_usd: number;
  power_source: string;
  status: 'active' | 'filled';
}

export interface MicroStartupSwarm {
  id: string;
  name: string;
  prompt_origin_title: string;
  student_creator: string;
  valuation_usd: number;
  mrr_usd: number;
  growth_rate: string;
  agents_deployed: number;
  autonomous_status: string;
  hub?: string;
  hubs?: string[];
  direct_url?: string;
  cac_number?: string;
  wema_verified?: boolean;
  equity_contract_address?: string;
  backed_amount_baacoin?: number;
  backed_amount_usd?: number;
  angel_backers_count?: number;
  dashboard_link?: string;
  venture_capital_backers?: string[];
}

export interface GeneralProductItem {
  id: string;
  title: string;
  category:
    | 'Cars'
    | 'Tech'
    | 'Real Estate'
    | 'Manufacturing'
    | 'Agriculture'
    | 'Education'
    | 'Lifestyle'
    | 'Vehicles & Cars'
    | 'Electronics & Tech'
    | 'Real Estate & Land'
    | 'Solar & Energy'
    | 'Luxury & Lifestyle'
    | 'Manufacturing & Industrial'
    | 'Agriculture & AgroTech'
    | 'Education & Hardware';
  description: string;
  price_usd: number;
  price_baacoin: number;
  image_url: string;
  location: string;
  seller_name: string;
  seller_verified: boolean;
  condition: string;
  specs: string[];
  is_group_buy_eligible: boolean;
  group_buy_discount_percent?: number;
  group_buyers_count?: number;
  group_buyers_target?: number;
}

export interface ExternalMarketplaceBridge {
  id: string;
  name: 'Amazon' | 'Alibaba' | 'Konga' | 'Jiji' | 'Jumia' | 'AliExpress';
  logo_badge: string;
  tagline: string;
  commission_earned_percent: string;
  baacoin_checkout_fee_percent: string;
  affiliate_api_status: 'Connected' | 'Live Synced' | 'Arbitrage Active';
  popular_deals: {
    id: string;
    title: string;
    price_usd: number;
    price_baacoin: number;
    original_price_usd: number;
    rating: number;
    image_url: string;
    category: string;
    referral_commission_usd: number;
  }[];
}

export interface ShopperGroupBuy {
  id: string;
  item_title: string;
  category: string;
  original_price_usd: number;
  group_price_baacoin: number;
  savings_percent: number;
  joined_users: { name: string; avatar: string; location: string }[];
  target_slots: number;
  expires_in: string;
  cashback_baacoin: number;
}

export interface MerchantSponsoredAd {
  id: string;
  sponsor_name: string;
  platform: 'Amazon Partner' | 'Alibaba Gold' | 'Konga Prime' | 'Jiji Verified Dealer' | 'Lagos Motors Hub';
  headline: string;
  offer_text: string;
  cta_text: string;
  daily_budget_baacoin: number;
  impressions: number;
  clicks: number;
  ctr: string;
}

export interface ProjectProposal {
  id: string;
  title: string;
  category: 'Autonomous AI' | 'FinTech & Lending' | 'Clean Energy & Solar' | 'HealthTech' | 'AgroVision' | 'Web3 & Identity';
  lead_student: string;
  student_avatar: string;
  team_members: string[];
  description: string;
  problem_solved: string;
  development_phase: 'Ideation & Spec' | 'AI Prototyping' | 'Node Compute Allocated' | 'Security & CAC Audited' | 'Approved for Funding' | 'Seed Funded & Scaling';
  funding_ask_usd: number;
  funding_ask_baacoin: number;
  total_funded_baacoin: number;
  equity_offered_percent: number;
  milestones: { title: string; completed: boolean; target_date: string }[];
  status: 'under_review' | 'community_voting' | 'approved' | 'funded';
  backers_count: number;
  created_at: string;
  demo_url?: string;
  github_url?: string;
  cac_number?: string;
  wema_verified?: boolean;
  equity_contract_address?: string;
  vc_backers?: string[];
  hub_location?: string;
}

export interface StudentSpotlight {
  id: string;
  name: string;
  avatar_url: string;
  cohort: string;
  location: string;
  graduation_status: 'Graduated - Honors' | 'In Progress - Capstone' | 'Incubated Founder';
  scores: { activity: string; score: number }[];
  project_lead_title: string;
  baacoin_earned: number;
  quote: string;
  video_clip_url?: string;
  nft_certificate_id: string;
}

export interface TopStakerLeaderboardItem {
  rank: number;
  name: string;
  node_id: string;
  avatar_url: string;
  staked_baacoin: number;
  daily_yield_baacoin: number;
  node_health: 'Optimal' | 'Charging & Cool' | 'High Performance';
  uptime_percent: string;
  tier: 'Sovereign Whale' | 'Validator Node' | 'Mobile Compute Miner';
}

