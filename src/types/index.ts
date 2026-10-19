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
  type: 'student' | 'investor' | 'institution';
  name: string;
  email: string;
  phone_or_wa?: string;
  source_platform: 'LinkedIn' | 'Twitter / X' | 'Facebook Groups' | 'TechCabal' | 'Direct Scraping';
  status: 'discovered' | 'contacted' | 'converted';
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
