import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Profile,
  Course,
  Enrollment,
  Interaction,
  PromptMarketplaceItem,
  CertificateNFT,
  Ebook,
  AITool,
  AITutor,
  ScoutLead,
  Referral,
  Wallet,
  EcosystemLanguage,
  AIWorkforceAgent,
  OmniAdCampaign,
  StakingPool,
  MicroStartupSwarm,
  ProjectProposal,
  StudentSpotlight,
  TopStakerLeaderboardItem
} from '../types';
import {
  INITIAL_COURSES,
  INITIAL_EBOOKS,
  INITIAL_AI_TOOLS,
  INITIAL_AI_TUTORS,
  INITIAL_SCOUT_LEADS,
  INITIAL_PROMPT_MARKETPLACE
} from '../lib/seed';
import {
  INITIAL_AI_WORKFORCE,
  INITIAL_OMNI_AD_CAMPAIGNS,
  INITIAL_STAKING_POOLS,
  INITIAL_MICRO_STARTUPS,
  INITIAL_PROJECT_PROPOSALS,
  INITIAL_STUDENT_SPOTLIGHTS,
  INITIAL_TOP_STAKERS
} from '../lib/autonomousData';


interface MiningBlock {
  hash: string;
  nonce: number;
  reward: number;
  timestamp: string;
  courseTitle: string;
}

interface EcosystemContextType {
  // Profile & Auth
  profile: Profile;
  isAdmin: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  updateProfile: (updates: Partial<Profile>) => void;

  // Data
  courses: Course[];
  enrollments: Enrollment[];
  interactions: Interaction[];
  marketplacePrompts: PromptMarketplaceItem[];
  certificates: CertificateNFT[];
  ebooks: Ebook[];
  aiTools: AITool[];
  aiTutors: AITutor[];
  scoutLeads: ScoutLead[];
  referrals: Referral[];
  wallet: Wallet;

  // Branding
  customLogoUrl: string | null;
  setCustomLogoUrl: (url: string | null) => void;

  // Actions
  enrollInCourse: (courseId: string) => { success: boolean; networthEarned: number; error?: string };
  recordInteraction: (params: {
    courseId: string;
    type: 'video_watch' | 'ai_tutor_query' | 'assignment_complete' | 'research_submit';
    promptData?: string;
    customReward?: { xp: number; baacoin: number };
  }) => { xp: number; baacoin: number; block: MiningBlock };
  completeCourse: (courseId: string) => CertificateNFT;
  buyPrompt: (promptId: string) => { success: boolean; error?: string };
  createCustomPrompt: (prompt: Omit<PromptMarketplaceItem, 'id' | 'sales' | 'revenue' | 'student_share' | 'platform_share' | 'created_at'>) => void;
  
  // AI Recruiter Scout
  isScoutRunning: boolean;
  scoutStats: { discovered: number; contacted: number; converted: number };
  runScoutCycle: () => void;
  convertLead: (leadId: string) => void;
  addFreeLead: (email: string, name?: string, magnetTitle?: string) => void;

  // Recent mining block
  latestMiningBlock: MiningBlock | null;
  resetAllSeedData: () => void;

  // AI Tutor Lecture Mining & Minting
  mintLectureNFTAndMine: (params: {
    tutorId: string;
    tutorName: string;
    topic: string;
    summary: string;
    baacoinReward?: number;
  }) => {
    nftId: string;
    baacoinAwarded: number;
    blockHash: string;
    timestamp: string;
    certificate: CertificateNFT;
  };

  // Autonomous Multi-Lingual & Cyber Ecosystem Upgrades
  language: EcosystemLanguage;
  setLanguage: (lang: EcosystemLanguage) => void;
  baacoinPrice: number;
  baacoinPriceChange: string;
  aiWorkforce: AIWorkforceAgent[];
  hireAgent: (agentId: string) => { success: boolean; message: string };
  createAgent: (agent: Omit<AIWorkforceAgent, 'id' | 'active_deployments' | 'rating' | 'is_verified'>) => void;
  omniAdCampaigns: OmniAdCampaign[];
  stakingPools: StakingPool[];
  stakeInPool: (poolId: string, amount: number) => { success: boolean; message: string };
  microStartups: MicroStartupSwarm[];

  // Projects & Venture Funding Pipeline
  projectProposals: ProjectProposal[];
  submitProjectProposal: (project: Omit<ProjectProposal, 'id' | 'created_at' | 'total_funded_baacoin' | 'status' | 'backers_count'>) => void;
  backProjectWithBaaCoin: (projectId: string, amountBaacoin: number) => { success: boolean; error?: string };
  approveProjectFunding: (projectId: string) => void;

  // Student Spotlight Stories & Leaderboard
  studentSpotlights: StudentSpotlight[];
  topStakers: TopStakerLeaderboardItem[];

  // Referral Hub Dynamic Engine
  addReferralSignBonus: (referredName: string, channel: string, targetType?: 'academy' | 'marketplace' | 'node') => { success: boolean; bonusBaa: number };
  claimReferralBonuses: () => { success: boolean; claimedAmount: number };

  // Manuscript Reading Proof & BaaCoin Rewards
  claimReadingReward: (bookId: string, bookTitle: string, baacoinReward?: number) => { success: boolean; rewardAmount: number; alreadyClaimed?: boolean; message: string };
}

const DEFAULT_PROFILE: Profile = {
  id: 'usr-student-001',
  email: 'student@billionairesai.academy',
  full_name: 'Tariq Sterling',
  role: 'student',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  baacoin_balance: 198, // spendable unlocked
  baacoin_networth: 990, // locked
  baacoin_locked: true,
  referral_code: 'BILLIONAIRE-AFRICA-2026',
  level: 2,
  xp: 340,
  is_verified: true,
  created_at: new Date(Date.now() - 86400000 * 5).toISOString()
};

const DEFAULT_WALLET: Wallet = {
  user_id: 'usr-student-001',
  balance: 198,
  total_earned: 420,
  total_mined: 84.5
};

const DEFAULT_CERTIFICATES: CertificateNFT[] = [
  {
    id: 'cert-default-1',
    user_id: DEFAULT_PROFILE.id,
    student_name: DEFAULT_PROFILE.full_name,
    course_id: INITIAL_COURSES[0].id,
    course_title: 'AI Wealth & Sovereign Agent Architecture Capstone',
    nft_id: '0xBAAC-990-SOVEREIGN-MASTER-2026',
    baacoin_engraved: 990,
    ipfs_url: 'ipfs://bafybeictariqsterlingsovereignmastery990baa/certificate.json',
    qr_data: `https://billionairesai.academy/verify/0xBAAC-990-SOVEREIGN-MASTER-2026?ref=${DEFAULT_PROFILE.referral_code}`,
    is_tradable: true,
    issue_date: 'March 28, 2026',
    transaction_hash: '0x8892baac7f4902189012a98f01bda4821a337190c',
    referral_code: DEFAULT_PROFILE.referral_code
  },
  {
    id: 'cert-default-2',
    user_id: 'usr-chioma-092',
    student_name: 'Chioma Adeyemi',
    course_id: 'course-sec-02',
    course_title: 'Smart Contract Security & Base L2 Fuzzing Capstone',
    nft_id: '0xBAAC-CHIOMA-PAYSTACK-BOUNTY-092',
    baacoin_engraved: 990,
    ipfs_url: 'ipfs://bafybeicchiomaadeyemibugbounty/certificate.json',
    qr_data: 'https://billionairesai.academy/verify/0xBAAC-CHIOMA-PAYSTACK-BOUNTY-092?ref=BAA-CHIOMA-PH',
    is_tradable: true,
    issue_date: 'April 4, 2026',
    transaction_hash: '0x7a30baac990812301824abced0192418a990141f',
    referral_code: 'BAA-CHIOMA-PH'
  }
];

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined);


const LOCAL_STORAGE_PREFIX = 'richconnect_eco_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (err) {
    console.warn('Storage save failed:', err);
  }
}

export const EcosystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Profiles & State
  const [profile, setProfile] = useState<Profile>(() => loadFromStorage('profile', DEFAULT_PROFILE));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return !!localStorage.getItem('richconnect_admin');
  });
  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(() => {
    return localStorage.getItem('richconnect_custom_logo') || null;
  });

  // Entities
  const [courses, setCourses] = useState<Course[]>(() => loadFromStorage('courses', INITIAL_COURSES));
  const [ebooks, setEbooks] = useState<Ebook[]>(() => loadFromStorage('ebooks', INITIAL_EBOOKS));
  const [aiTools, setAiTools] = useState<AITool[]>(() => loadFromStorage('tools', INITIAL_AI_TOOLS));
  const [aiTutors, setAiTutors] = useState<AITutor[]>(() => loadFromStorage('tutors', INITIAL_AI_TUTORS));
  const [scoutLeads, setScoutLeads] = useState<ScoutLead[]>(() => loadFromStorage('scout_leads', INITIAL_SCOUT_LEADS));
  const [marketplacePrompts, setMarketplacePrompts] = useState<PromptMarketplaceItem[]>(() =>
    loadFromStorage('marketplace_prompts', INITIAL_PROMPT_MARKETPLACE)
  );

  // Enrollments & Interactions
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    const saved = loadFromStorage<Enrollment[]>('enrollments', []);
    if (saved.length > 0) return saved;
    // Default initial enrollment for demo instant access
    return [
      {
        id: 'enr-demo-1',
        user_id: DEFAULT_PROFILE.id,
        course_id: INITIAL_COURSES[0].id,
        progress: 35,
        completed: false,
        total_mined: 32.5,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ];
  });

  const [interactions, setInteractions] = useState<Interaction[]>(() => loadFromStorage('interactions', []));
  const [certificates, setCertificates] = useState<CertificateNFT[]>(() => loadFromStorage('certificates', DEFAULT_CERTIFICATES));
  const [referrals, setReferrals] = useState<Referral[]>(() => loadFromStorage('referrals', [
    {
      id: 'ref-1',
      referrer_id: DEFAULT_PROFILE.id,
      referred_id: 'usr-new-092',
      referred_name: 'Babajide Vance',
      commission: 9.9,
      baacoin_bonus: 99, // 10% of new student's 990 BaaCoin networth
      paid: true,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]));
  const [wallet, setWallet] = useState<Wallet>(() => loadFromStorage('wallet', DEFAULT_WALLET));

  // Autonomous Multi-Lingual & Cyber Ecosystem Upgrades
  const [language, setLanguageState] = useState<EcosystemLanguage>(() => {
    return (localStorage.getItem('richconnect_lang') as EcosystemLanguage) || 'en';
  });
  const [baacoinPrice, setBaacoinPrice] = useState<number>(() => loadFromStorage('baacoin_price', 1.02));
  const [baacoinPriceChange] = useState<string>('+12.4%');
  const [aiWorkforce, setAiWorkforce] = useState<AIWorkforceAgent[]>(() => loadFromStorage('ai_workforce', INITIAL_AI_WORKFORCE));
  const [omniAdCampaigns, setOmniAdCampaigns] = useState<OmniAdCampaign[]>(() => loadFromStorage('omni_ads', INITIAL_OMNI_AD_CAMPAIGNS));
  const [stakingPools, setStakingPools] = useState<StakingPool[]>(() => loadFromStorage('staking_pools', INITIAL_STAKING_POOLS));
  const [microStartups] = useState<MicroStartupSwarm[]>(INITIAL_MICRO_STARTUPS);

  // Projects & Venture Funding Pipeline
  const [projectProposals, setProjectProposals] = useState<ProjectProposal[]>(() =>
    loadFromStorage('project_proposals', INITIAL_PROJECT_PROPOSALS)
  );

  // Student Spotlights & Top Stakers Leaderboard
  const [studentSpotlights] = useState<StudentSpotlight[]>(INITIAL_STUDENT_SPOTLIGHTS);
  const [topStakers] = useState<TopStakerLeaderboardItem[]>(INITIAL_TOP_STAKERS);

  const setLanguage = (lang: EcosystemLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('richconnect_lang', lang);
    window.dispatchEvent(new CustomEvent('language_changed', { detail: { lang } }));
  };

  // Mining Animation Indicator
  const [latestMiningBlock, setLatestMiningBlock] = useState<MiningBlock | null>(null);
  const [isScoutRunning, setIsScoutRunning] = useState<boolean>(true);

  // Save states automatically
  useEffect(() => { saveToStorage('profile', profile); }, [profile]);
  useEffect(() => { saveToStorage('courses', courses); }, [courses]);
  useEffect(() => { saveToStorage('enrollments', enrollments); }, [enrollments]);
  useEffect(() => { saveToStorage('interactions', interactions); }, [interactions]);
  useEffect(() => { saveToStorage('marketplace_prompts', marketplacePrompts); }, [marketplacePrompts]);
  useEffect(() => { saveToStorage('certificates', certificates); }, [certificates]);
  useEffect(() => { saveToStorage('wallet', wallet); }, [wallet]);
  useEffect(() => { saveToStorage('scout_leads', scoutLeads); }, [scoutLeads]);
  useEffect(() => { saveToStorage('referrals', referrals); }, [referrals]);
  useEffect(() => { saveToStorage('ai_workforce', aiWorkforce); }, [aiWorkforce]);
  useEffect(() => { saveToStorage('omni_ads', omniAdCampaigns); }, [omniAdCampaigns]);
  useEffect(() => { saveToStorage('staking_pools', stakingPools); }, [stakingPools]);
  useEffect(() => { saveToStorage('baacoin_price', baacoinPrice); }, [baacoinPrice]);
  useEffect(() => { saveToStorage('project_proposals', projectProposals); }, [projectProposals]);


  // Set custom logo helper
  const setCustomLogoUrl = (url: string | null) => {
    setCustomLogoUrlState(url);
    if (url) {
      localStorage.setItem('richconnect_custom_logo', url);
    } else {
      localStorage.removeItem('richconnect_custom_logo');
    }
  };

  // Admin login check
  const adminLogin = (email: string, pass: string): boolean => {
    if (email === 'naijaukmusicalfusion@gmail.com' && pass === 'RichConnectVault2026!Secure') {
      localStorage.setItem('richconnect_admin', 'token_vault_2026_super_admin');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    localStorage.removeItem('richconnect_admin');
    setIsAdmin(false);
  };

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  // 1. BAACOIN 10X NETWORTH SYSTEM ON ENROLLMENT
  const enrollInCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return { success: false, networthEarned: 0, error: 'Course not found' };

    const existing = enrollments.find(e => e.course_id === courseId);
    if (existing) {
      return { success: true, networthEarned: course.baacoin_value };
    }

    const networthGain = course.baacoin_value; // e.g. $99 course -> 990 BaaCoin (10x price)
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user_id: profile.id,
      course_id: courseId,
      progress: 0,
      completed: false,
      total_mined: 0,
      created_at: new Date().toISOString()
    };

    setEnrollments(prev => [...prev, newEnrollment]);

    // Update student networth: locked until graduation
    setProfile(prev => ({
      ...prev,
      baacoin_networth: prev.baacoin_networth + networthGain,
      baacoin_locked: true
    }));

    return { success: true, networthEarned: networthGain };
  };

  // 2. LEARN-TO-MINE SYSTEM (Interactions = Mining)
  const recordInteraction = ({
    courseId,
    type,
    promptData = '',
    customReward
  }: {
    courseId: string;
    type: 'video_watch' | 'ai_tutor_query' | 'assignment_complete' | 'research_submit';
    promptData?: string;
    customReward?: { xp: number; baacoin: number };
  }) => {
    let xpGain = 5;
    let baacoinGain = 0.5;

    if (customReward) {
      xpGain = customReward.xp;
      baacoinGain = customReward.baacoin;
    } else {
      switch (type) {
        case 'video_watch':
          xpGain = 5;
          baacoinGain = 0.5;
          break;
        case 'ai_tutor_query':
          xpGain = 10;
          baacoinGain = 1.0;
          break;
        case 'assignment_complete':
          xpGain = 50;
          baacoinGain = 10.0;
          break;
        case 'research_submit':
          xpGain = 100;
          baacoinGain = 20.0;
          break;
      }
    }

    const newInteraction: Interaction = {
      id: `int-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      user_id: profile.id,
      course_id: courseId,
      type,
      xp_earned: xpGain,
      baacoin_mined: baacoinGain,
      prompt_data: promptData,
      created_at: new Date().toISOString()
    };

    setInteractions(prev => [newInteraction, ...prev]);

    // Update Enrollment progress & mined
    setEnrollments(prev =>
      prev.map(enr => {
        if (enr.course_id === courseId) {
          const progressIncrement = type === 'research_submit' ? 35 : type === 'assignment_complete' ? 25 : 10;
          const newProgress = Math.min(100, enr.progress + progressIncrement);
          const isDone = newProgress >= 100;
          return {
            ...enr,
            progress: newProgress,
            completed: isDone,
            total_mined: Number((enr.total_mined + baacoinGain).toFixed(2))
          };
        }
        return enr;
      })
    );

    // Update Profile XP & level
    setProfile(prev => {
      const newXp = prev.xp + xpGain;
      const newLevel = Math.floor(newXp / 250) + 1;
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });

    // Update Wallet
    setWallet(prev => ({
      ...prev,
      total_mined: Number((prev.total_mined + baacoinGain).toFixed(2))
    }));

    // Mining cryptographic block representation
    const courseObj = courses.find(c => c.id === courseId);
    const mockHash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const block: MiningBlock = {
      hash: mockHash,
      nonce: Math.floor(Math.random() * 900000) + 100000,
      reward: baacoinGain,
      timestamp: new Date().toLocaleTimeString(),
      courseTitle: courseObj ? courseObj.title : 'AI Autonomous Mastery'
    };
    setLatestMiningBlock(block);

    return { xp: xpGain, baacoin: baacoinGain, block };
  };

  // 2.5 AI TUTOR LECTURE MINING & NFT MINTING
  const mintLectureNFTAndMine = (params: {
    tutorId: string;
    tutorName: string;
    topic: string;
    summary: string;
    baacoinReward?: number;
  }) => {
    const baacoinGain = params.baacoinReward || 150;
    const xpGain = 250;

    // 1. Credit student's wallet and unlocked spendable balance
    setProfile(prev => ({
      ...prev,
      baacoin_balance: Number((prev.baacoin_balance + baacoinGain).toFixed(2)),
      xp: prev.xp + xpGain
    }));

    setWallet(prev => ({
      ...prev,
      balance: Number((prev.balance + baacoinGain).toFixed(2)),
      total_earned: Number((prev.total_earned + baacoinGain).toFixed(2)),
      total_mined: Number((prev.total_mined + baacoinGain).toFixed(2))
    }));

    // 2. Mine cryptographic ledger block
    const blockHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newBlock: MiningBlock = {
      hash: blockHash,
      nonce: Math.floor(Math.random() * 900000) + 100000,
      reward: baacoinGain,
      timestamp: new Date().toLocaleTimeString(),
      courseTitle: `Lecture: ${params.topic} (${params.tutorName})`
    };
    setLatestMiningBlock(newBlock);

    // 3. Mint on-chain verified lecture NFT certificate
    const nftId = '0xlec' + Array.from({ length: 20 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const lectureCert: CertificateNFT = {
      id: `cert-lec-${Date.now()}`,
      user_id: profile.id,
      student_name: profile.full_name,
      course_id: params.tutorId,
      course_title: `Live Lecture: ${params.topic} by ${params.tutorName}`,
      nft_id: nftId,
      baacoin_engraved: baacoinGain,
      ipfs_url: `ipfs://bafybeilec${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}/lecture-nft.json`,
      qr_data: `https://billionairesai.academy/verify/${nftId}?tutor=${encodeURIComponent(params.tutorName)}&ref=${profile.referral_code}`,
      is_tradable: true,
      issue_date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      transaction_hash: '0xbaalecture' + Array.from({ length: 28 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      referral_code: profile.referral_code
    };

    setCertificates(prev => [lectureCert, ...prev]);

    return {
      nftId,
      baacoinAwarded: baacoinGain,
      blockHash,
      timestamp: newBlock.timestamp,
      certificate: lectureCert
    };
  };

  // 3. GRADUATION & BAACOIN UNLOCKING + PROMPT 60/40 COMPILATION + NFT CERTIFICATE
  const completeCourse = (courseId: string): CertificateNFT => {
    const course = courses.find(c => c.id === courseId);
    const courseTitle = course ? course.title : 'AI Autonomous Mastery';
    const courseValue = course ? course.baacoin_value : 990;

    // 1. Mark enrollment as 100% completed
    setEnrollments(prev =>
      prev.map(enr => (enr.course_id === courseId ? { ...enr, progress: 100, completed: true } : enr))
    );

    // 2. UNLOCK BAACOIN NETWORTH:
    // When enrollment.progress = 100% -> baacoin_locked = false,
    // move 20% to balance instantly, rest vest daily!
    const instantUnlockedPortion = Number((courseValue * 0.2).toFixed(2));
    setProfile(prev => ({
      ...prev,
      baacoin_locked: false,
      baacoin_balance: Number((prev.baacoin_balance + instantUnlockedPortion).toFixed(2))
    }));

    setWallet(prev => ({
      ...prev,
      balance: Number((prev.balance + instantUnlockedPortion).toFixed(2))
    }));

    // 3. PROMPT MARKETPLACE 60/40 COMPILATION
    // Gather all prompt interactions for this course
    const courseInteractions = interactions.filter(i => i.course_id === courseId && i.prompt_data);
    const synthesizedPromptData = courseInteractions.map(i => i.prompt_data).filter(Boolean).join('\n---\n') ||
      `SYSTEM DIRECTIVE: Autonomous High-Yield Production Model trained on ${courseTitle}. Execute zero-shot synthesis with multi-agent consensus.`;

    const compiledPrompt: PromptMarketplaceItem = {
      id: `prompt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user_id: profile.id,
      student_name: profile.full_name,
      course_id: courseId,
      course_title: courseTitle,
      title: `${profile.full_name}'s ${courseTitle} Mastery Prompt`,
      description: `Official compiled mastery framework generated during 100% capstone completion of ${courseTitle}. High-throughput prompt package.`,
      final_prompt: `[EXPERT PROMPT PACKAGE - BILLIONAIRES AI ACADEMY]\nRole: Senior Autonomous Architect\nDomain: ${courseTitle}\n\n${synthesizedPromptData}\n\nConstraints: Enforce 100% fidelity, zero token waste, strict JSON output and scalable API hook execution.`,
      price: 49,
      sales: 0,
      revenue: 0,
      student_share: 0, // 60% upon sales
      platform_share: 0, // 40%
      is_listed: true,
      category: course ? course.category : 'AI Wealth',
      tags: ['Graduation Prompt', 'Mastery', 'Autonomous', '60/40 Royalty'],
      created_at: new Date().toISOString()
    };

    setMarketplacePrompts(prev => [compiledPrompt, ...prev]);

    // 4. NFT CERTIFICATE WITH BAACOIN CHIP & QR CODE REFERRAL
    const nftId = '0x' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newCert: CertificateNFT = {
      id: `cert-${Date.now()}`,
      user_id: profile.id,
      student_name: profile.full_name,
      course_id: courseId,
      course_title: courseTitle,
      nft_id: nftId,
      baacoin_engraved: courseValue, // e.g. 990 BaaCoin chip
      ipfs_url: `ipfs://bafybeic${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}/certificate.json`,
      qr_data: `https://billionairesai.academy/verify/${nftId}?ref=${profile.referral_code}`,
      is_tradable: true,
      issue_date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      transaction_hash: '0xbaacoin' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      referral_code: profile.referral_code
    };

    setCertificates(prev => [newCert, ...prev]);

    return newCert;
  };

  // BUY PROMPT (60% to Student, 40% to Platform)
  const buyPrompt = (promptId: string) => {
    const item = marketplacePrompts.find(p => p.id === promptId);
    if (!item) return { success: false, error: 'Prompt not found' };

    const price = item.price;
    const studentShare = Number((price * 0.6).toFixed(2));
    const platformShare = Number((price * 0.4).toFixed(2));

    setMarketplacePrompts(prev =>
      prev.map(p => {
        if (p.id === promptId) {
          return {
            ...p,
            sales: p.sales + 1,
            revenue: p.revenue + price,
            student_share: p.student_share + studentShare,
            platform_share: p.platform_share + platformShare
          };
        }
        return p;
      })
    );

    // If current user is the author, update their wallet earnings
    if (item.user_id === profile.id) {
      setWallet(prev => ({
        ...prev,
        balance: prev.balance + studentShare,
        total_earned: prev.total_earned + studentShare
      }));
    }

    return { success: true };
  };

  const createCustomPrompt = (prompt: Omit<PromptMarketplaceItem, 'id' | 'sales' | 'revenue' | 'student_share' | 'platform_share' | 'created_at'>) => {
    const newPrompt: PromptMarketplaceItem = {
      ...prompt,
      id: `prompt-${Date.now()}`,
      sales: 0,
      revenue: 0,
      student_share: 0,
      platform_share: 0,
      created_at: new Date().toISOString()
    };
    setMarketplacePrompts(prev => [newPrompt, ...prev]);
  };

  // 5. AUTONOMOUS AI RECRUITER SCOUT ENGINE
  const scoutStats = {
    discovered: 1245 + scoutLeads.length * 12,
    contacted: 340 + scoutLeads.filter(l => l.status === 'contacted' || l.status === 'converted').length * 4,
    converted: 45 + scoutLeads.filter(l => l.converted).length
  };

  const runScoutCycle = () => {
    // Generates high-value realistic prospect leads across 3 pillars
    const names = [
      { name: "Folake Adebisi", loc: "Lagos, Nigeria", type: "student" as const, query: "need AI course to earn dollars" },
      { name: "David Mensah", loc: "Accra, Ghana", type: "student" as const, query: "best prompt engineering academy Africa" },
      { name: "Sir Alistair Sterling", loc: "London, UK", type: "investor" as const, query: "Africa clean energy AI data center seed" },
      { name: "Maseru Technical University", loc: "Maseru, Lesotho", type: "institution" as const, query: "AI tutors for engineering students" },
      { name: "Nairobi Angel Syndicate", loc: "Nairobi, Kenya", type: "investor" as const, query: "blockchain education tokenization" }
    ];

    const pick = names[Math.floor(Math.random() * names.length)];
    const platforms: ScoutLead['source_platform'][] = ['LinkedIn', 'Twitter / X', 'Facebook Groups', 'TechCabal'];
    const chosenPlatform = platforms[Math.floor(Math.random() * platforms.length)];

    let pitch = "";
    if (pick.type === "student") {
      pitch = `Hi ${pick.name}! Our AI Scout discovered your interest in: "${pick.query}". At Billionaires AI Academy, enrollment unlocks 10x your course price in BaaCoin Networth ($990 value) + Learn-to-Mine rewards. Claim your scholarship spot today: https://billionairesai.academy/academy`;
    } else if (pick.type === "investor") {
      pitch = `Greetings ${pick.name}, our autonomous scout identified your capital criteria on "${pick.query}". Universal Autonomous AI Data Center in Africa achieves 1.08 PUE with 100% hydro-solar power. View our executive term sheet: https://billionairesai.academy/datacenter`;
    } else {
      pitch = `Esteemed Leadership at ${pick.name}, embed autonomous AI Tutors in your portal for $99/mo. 24/7 student mentorship without increasing university overhead. Schedule integration: https://billionairesai.academy/marketplace`;
    }

    const newLead: ScoutLead = {
      id: `lead-${Date.now()}`,
      type: pick.type,
      name: pick.name,
      email: `${pick.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@scouted.io`,
      phone_or_wa: `+23480${Math.floor(10000000 + Math.random() * 90000000)}`,
      source_platform: chosenPlatform,
      status: 'contacted',
      ai_message: pitch,
      converted: Math.random() > 0.65,
      created_at: new Date().toISOString()
    };

    setScoutLeads(prev => [newLead, ...prev]);
  };

  const convertLead = (leadId: string) => {
    setScoutLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, converted: true, status: 'converted' } : l))
    );
  };

  const addFreeLead = (email: string, name?: string, magnetTitle?: string) => {
    const leadName = name || email.split('@')[0];
    const newLead: ScoutLead = {
      id: `lead-free-${Date.now()}`,
      type: 'student',
      name: leadName,
      email: email,
      source_platform: 'Direct Scraping',
      status: 'contacted',
      ai_message: `Welcome ${leadName}! Your free resource "${magnetTitle || 'VIP Wealth Pack'}" is delivered. Unlock 10x BaaCoin Networth by joining our premier academy.`,
      converted: false,
      created_at: new Date().toISOString()
    };
    setScoutLeads(prev => [newLead, ...prev]);
  };

  // Background Autonomous Scout Loop (Runs periodically)
  useEffect(() => {
    if (!isScoutRunning) return;
    const interval = setInterval(() => {
      runScoutCycle();
    }, 45000); // autonomous discovery tick
    return () => clearInterval(interval);
  }, [isScoutRunning]);

  // Reset to pristine seed data
  const resetAllSeedData = () => {
    localStorage.clear();
    setProfile(DEFAULT_PROFILE);
    setCourses(INITIAL_COURSES);
    setEbooks(INITIAL_EBOOKS);
    setAiTools(INITIAL_AI_TOOLS);
    setAiTutors(INITIAL_AI_TUTORS);
    setScoutLeads(INITIAL_SCOUT_LEADS);
    setMarketplacePrompts(INITIAL_PROMPT_MARKETPLACE);
    setEnrollments([]);
    setInteractions([]);
    setCertificates([]);
    setWallet(DEFAULT_WALLET);
    setCustomLogoUrlState(null);
  };

  // Autonomous Agent Hiring & Deployment
  const hireAgent = (agentId: string) => {
    const agent = aiWorkforce.find(a => a.id === agentId);
    if (!agent) return { success: false, message: 'Agent not found' };

    // Increment active deployments and ratchet token price slightly
    setAiWorkforce(prev => prev.map(a => a.id === agentId ? { ...a, active_deployments: a.active_deployments + 1 } : a));
    setBaacoinPrice(prev => +(prev + 0.002).toFixed(4));

    // Deduct spendable BaaCoin if available
    if (profile.baacoin_balance >= agent.hourly_rate_baacoin) {
      setProfile(prev => ({
        ...prev,
        baacoin_balance: Math.max(0, prev.baacoin_balance - agent.hourly_rate_baacoin)
      }));
      setWallet(prev => ({
        ...prev,
        balance: Math.max(0, prev.balance - agent.hourly_rate_baacoin)
      }));
    }

    return {
      success: true,
      message: `Successfully provisioned ${agent.name}! 24/7 terminal loop active on sovereign node cluster.`
    };
  };

  const createAgent = (agentData: Omit<AIWorkforceAgent, 'id' | 'active_deployments' | 'rating' | 'is_verified'>) => {
    const newAgent: AIWorkforceAgent = {
      ...agentData,
      id: `agent-custom-${Date.now()}`,
      active_deployments: 1,
      rating: 5.0,
      is_verified: true
    };
    setAiWorkforce(prev => [newAgent, ...prev]);
    setBaacoinPrice(prev => +(prev + 0.005).toFixed(4));
  };

  const stakeInPool = (poolId: string, amount: number) => {
    const pool = stakingPools.find(p => p.id === poolId);
    if (!pool) return { success: false, message: 'Staking pool not found' };

    setStakingPools(prev => prev.map(p => p.id === poolId ? {
      ...p,
      total_staked_baacoin: p.total_staked_baacoin + amount,
      daily_yield_usd: +(p.daily_yield_usd + (amount * (p.apy_percent / 100) / 365)).toFixed(2)
    } : p));

    setBaacoinPrice(prev => +(prev + 0.003).toFixed(4));

    return {
      success: true,
      message: `Successfully locked ${amount.toLocaleString()} BaaCoin into ${pool.name} at ${pool.apy_percent}% APY!`
    };
  };

  // 6. PROJECTS & VENTURE FUNDING METHODS
  const submitProjectProposal = (
    projectData: Omit<ProjectProposal, 'id' | 'created_at' | 'total_funded_baacoin' | 'status' | 'backers_count'>
  ) => {
    const newProject: ProjectProposal = {
      ...projectData,
      id: `proj-${Date.now()}`,
      created_at: new Date().toISOString(),
      total_funded_baacoin: 0,
      status: 'community_voting',
      backers_count: 1
    };
    setProjectProposals(prev => [newProject, ...prev]);
  };

  const backProjectWithBaaCoin = (projectId: string, amountBaacoin: number) => {
    if (wallet.balance < amountBaacoin) {
      return {
        success: false,
        error: `Insufficient spendable BaaCoin balance. You have ${wallet.balance} BAA, but need ${amountBaacoin} BAA.`
      };
    }

    // Deduct from wallet & profile
    setWallet(prev => ({
      ...prev,
      balance: Number((prev.balance - amountBaacoin).toFixed(2))
    }));

    setProfile(prev => ({
      ...prev,
      baacoin_balance: Number((prev.baacoin_balance - amountBaacoin).toFixed(2))
    }));

    // Update project funding
    setProjectProposals(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          const updatedFunding = p.total_funded_baacoin + amountBaacoin;
          const isFunded = updatedFunding >= p.funding_ask_baacoin;
          return {
            ...p,
            total_funded_baacoin: updatedFunding,
            backers_count: p.backers_count + 1,
            status: isFunded ? 'funded' : p.status,
            development_phase: isFunded ? 'Seed Funded & Scaling' : p.development_phase
          };
        }
        return p;
      })
    );

    return { success: true };
  };

  const approveProjectFunding = (projectId: string) => {
    setProjectProposals(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            status: 'approved',
            development_phase: 'Approved for Funding'
          };
        }
        return p;
      })
    );
  };

  // 7. REFERRAL HUB DYNAMIC SIGN-UP & BONUS SYSTEM
  const addReferralSignBonus = (
    referredName: string,
    channel: string,
    targetType: 'academy' | 'marketplace' | 'node' = 'academy'
  ) => {
    const bonus = targetType === 'marketplace' ? 35 : targetType === 'node' ? 25 : 50;
    const newRef: Referral = {
      id: `ref-${Date.now()}`,
      referrer_id: profile.id,
      referred_id: `usr-${Date.now().toString(36)}`,
      referred_name: referredName,
      commission: Number((bonus * 0.1).toFixed(2)),
      baacoin_bonus: bonus,
      paid: false,
      created_at: new Date().toISOString()
    };

    setReferrals(prev => [newRef, ...prev]);

    return { success: true, bonusBaa: bonus };
  };

  const claimReferralBonuses = () => {
    const unpaid = referrals.filter(r => !r.paid);
    if (unpaid.length === 0) {
      return { success: false, claimedAmount: 0 };
    }

    const totalBonus = unpaid.reduce((acc, r) => acc + (r.baacoin_bonus || 0), 0);

    // Mark paid
    setReferrals(prev => prev.map(r => ({ ...r, paid: true })));

    // Credit to spendable wallet and profile
    setWallet(prev => ({
      ...prev,
      balance: Number((prev.balance + totalBonus).toFixed(2)),
      total_earned: Number((prev.total_earned + totalBonus).toFixed(2))
    }));

    setProfile(prev => ({
      ...prev,
      baacoin_balance: Number((prev.baacoin_balance + totalBonus).toFixed(2))
    }));

    return { success: true, claimedAmount: totalBonus };
  };

  // 4. MANUSCRIPT READING PROOF & REWARD CLAIM
  const claimReadingReward = (bookId: string, bookTitle: string, baacoinReward: number = 100) => {
    const claimKey = `baa_reward_claimed_${bookId}_${profile.id}`;
    if (localStorage.getItem(claimKey)) {
      return {
        success: false,
        alreadyClaimed: true,
        rewardAmount: 0,
        message: `Reward for "${bookTitle}" has already been claimed and credited to your wallet.`
      };
    }

    const reward = baacoinReward;

    // Credit to spendable wallet and profile
    setWallet(prev => ({
      ...prev,
      balance: Number((prev.balance + reward).toFixed(2)),
      total_earned: Number((prev.total_earned + reward).toFixed(2)),
      total_mined: Number((prev.total_mined + reward).toFixed(2))
    }));

    setProfile(prev => {
      const newXp = prev.xp + 250;
      const newLevel = Math.floor(newXp / 250) + 1;
      return {
        ...prev,
        baacoin_balance: Number((prev.baacoin_balance + reward).toFixed(2)),
        xp: newXp,
        level: newLevel
      };
    });

    // Record interaction in ledger
    const newInteraction: Interaction = {
      id: `int-read-${Date.now()}`,
      user_id: profile.id,
      course_id: bookId,
      type: 'research_submit',
      xp_earned: 250,
      baacoin_mined: reward,
      prompt_data: `100% Manuscript Mastery & Proof of Read: ${bookTitle}`,
      created_at: new Date().toISOString()
    };
    setInteractions(prev => [newInteraction, ...prev]);

    // Record Mining Block
    const blockHash = '0xbaaread' + Array.from({ length: 28 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newBlock: MiningBlock = {
      hash: blockHash,
      nonce: Math.floor(Math.random() * 9999999),
      reward,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      courseTitle: `Manuscript Proof: ${bookTitle}`
    };
    setLatestMiningBlock(newBlock);

    try {
      localStorage.setItem(claimKey, new Date().toISOString());
    } catch (e) {
      console.warn('Could not store claim state', e);
    }

    return {
      success: true,
      alreadyClaimed: false,
      rewardAmount: reward,
      message: `Congratulations! +${reward} BaaCoin has been credited directly to your active spendable wallet.`
    };
  };

  return (
    <EcosystemContext.Provider
      value={{
        profile,
        isAdmin,
        adminLogin,
        adminLogout,
        updateProfile,
        courses,
        enrollments,
        interactions,
        marketplacePrompts,
        certificates,
        ebooks,
        aiTools,
        aiTutors,
        scoutLeads,
        referrals,
        wallet,
        customLogoUrl,
        setCustomLogoUrl,
        enrollInCourse,
        recordInteraction,
        completeCourse,
        buyPrompt,
        createCustomPrompt,
        isScoutRunning,
        scoutStats,
        runScoutCycle,
        convertLead,
        addFreeLead,
        latestMiningBlock,
        resetAllSeedData,
        mintLectureNFTAndMine,
        language,
        setLanguage,
        baacoinPrice,
        baacoinPriceChange,
        aiWorkforce,
        hireAgent,
        createAgent,
        omniAdCampaigns,
        stakingPools,
        stakeInPool,
        microStartups,
        projectProposals,
        submitProjectProposal,
        backProjectWithBaaCoin,
        approveProjectFunding,
        studentSpotlights,
        topStakers,
        addReferralSignBonus,
        claimReferralBonuses,
        claimReadingReward
      }}
    >
      {children}
    </EcosystemContext.Provider>
  );
};

export const useEcosystem = () => {
  const context = useContext(EcosystemContext);
  if (!context) {
    throw new Error('useEcosystem must be used within an EcosystemProvider');
  }
  return context;
};
