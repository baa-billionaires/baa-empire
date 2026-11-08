import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

export interface PageMetadata {
  id: string;
  title: string;
  shortTitle: string;
  category: 'core' | 'ai_autonomous' | 'web3_finance' | 'media' | 'admin_command' | 'community';
  categoryLabel: string;
  description: string;
  iconName: string;
  badge?: string;
  adminOnly?: boolean;
}

export const ALL_PAGES: PageMetadata[] = [
  // 1. CORE PORTALS & ACADEMY
  {
    id: 'home',
    title: 'Home & Sovereign Ecosystem',
    shortTitle: 'Home',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Autonomous multi-pillar ecosystem, real-time metrics, and live showcase.',
    iconName: 'Compass',
    badge: 'HQ'
  },
  {
    id: 'dashboard',
    title: 'Student Portal & Daily BaaCoin Mining',
    shortTitle: 'Dashboard',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Track daily mining target, sleeping hours passive cash flow, and course progress.',
    iconName: 'LayoutDashboard',
    badge: 'EARN BAA'
  },
  {
    id: 'academy',
    title: 'Billionaires AI Academy',
    shortTitle: 'Academy',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Accredited executive courses, sovereign agent curriculum, and NFT certifications.',
    iconName: 'GraduationCap'
  },
  {
    id: 'ebooks',
    title: 'BAA 4D Library & Manuscript Swarm',
    shortTitle: 'Library',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Autonomous book creator, rich covers, reading proof rewards, and video books.',
    iconName: 'BookOpen',
    badge: '4D EMPIRE'
  },
  {
    id: 'marketplace',
    title: 'AI Tutors & Prompt Marketplace',
    shortTitle: 'Marketplace',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: '60/40 revenue split prompt engineering store and specialized AI deans.',
    iconName: 'Store',
    badge: '60/40'
  },
  {
    id: 'general-marketplace',
    title: 'General Market (Cars, Tech, Real Estate)',
    shortTitle: 'General Market',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Verified physical & digital marketplace payable in Naira, USD, and BaaCoin.',
    iconName: 'ShoppingCart',
    badge: 'CARS/TECH'
  },
  {
    id: 'university',
    title: 'Pan-African AI University Program',
    shortTitle: 'University',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Degree-level deep research modules, dual-accreditation, and lab apprenticeships.',
    iconName: 'School'
  },
  {
    id: 'free',
    title: 'Free Starter Access & Orientation',
    shortTitle: 'Free Tier',
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Zero-cost starter packs, foundational prompts, and open orientation lectures.',
    iconName: 'Gift'
  },

  // 2. AUTONOMOUS AI & AGENTS
  {
    id: 'deal-room',
    title: 'BAA Global Deal Room & AI Funding Exchange™',
    shortTitle: 'Global Deal Room',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Finance',
    description: 'Autonomous opportunity discovery, direct institutional engagement, AI project finance & global contract intelligence.',
    iconName: 'Building2',
    badge: 'AI DEALS'
  },
  {
    id: 'observatory',
    title: 'BAA Global Policy Intelligence Observatory™',
    shortTitle: 'Policy Observatory',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Policy',
    description: 'International AI, blockchain, and Web3 legislation tracker, country categorizations, effective dates, and agent constitution compiler.',
    iconName: 'Globe',
    badge: 'LEGAL AI'
  },
  {
    id: 'governance',
    title: 'BAA Global AI & Web3 Governance Institute (PVAIDC)',
    shortTitle: 'Governance Institute',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Policy',
    description: 'Living international laboratory for AI principles, agent constitution compilation, and policy digital twin testing.',
    iconName: 'Scale',
    badge: 'PVAIDC LAB'
  },
  {
    id: 'recruiter',
    title: 'AI Recruiter Portal & Active Lead Radar',
    shortTitle: 'AI Recruiter',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous Recruitment',
    description: 'Autonomous multi-channel lead discovery radar across LinkedIn, GitHub, TechCabal, and Twitter/X with verified intent signals.',
    iconName: 'Radar',
    badge: 'LIVE RADAR'
  },
  {
    id: 'growth-mafia',
    title: 'Growth OS & MAFIA™ Multi-Agent Colony',
    shortTitle: 'Growth OS + MAFIA™',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI',
    description: '13-Agent intelligence colony, market discovery radar, and ReputationGuardian.',
    iconName: 'Zap',
    badge: '13-AGENTS'
  },
  {
    id: 'ai-workforce',
    title: 'Autonomous AI Workforce 24/7',
    shortTitle: 'AI Workforce',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI',
    description: 'Deploy, hire, and manage sovereign AI agents generating autonomous output.',
    iconName: 'Bot',
    badge: '24/7'
  },
  {
    id: 'uaaig',
    title: 'BAA Universal Autonomous AI Infrastructure Grid (UAAIG) & Compute Passport',
    shortTitle: 'UAAIG Master Grid',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Hardware Compute',
    description: 'One Intelligence. Every Approved Compute Resource. Universal Autonomous Computing Planet, Universal Compute Passport, BYODC Connector & 10 Compute Markets.',
    iconName: 'Globe',
    badge: '128 PFLOPS'
  },
  {
    id: 'ce-colony',
    title: 'BAA CE Colony V12 — Autonomous Computer Engineering Data-to-Wealth Ecosystem',
    shortTitle: 'CE Colony V12',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Hardware Compute',
    description: 'From Computer Repairer to Autonomous Data Infrastructure Entrepreneur. 12 Wealth Colonies, Orchestrator, Node Installer & 70/30 Paystack Ledger.',
    iconName: 'Wrench',
    badge: 'V12 WEALTH'
  },
  {
    id: 'code-vein',
    title: 'BAA CODE VEIN V13 — Autonomous Source-to-Wealth Colony (UA-AIDC Module 2)',
    shortTitle: 'CODE VEIN V13',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Software Asset Economy',
    description: 'Global Software Asset Refinery & Marketplace. 15 Colonies, 18 Autonomous Agents, Code Landlord Wealth OS & 70/30 Paystack Ledger.',
    iconName: 'Code2',
    badge: 'V13 WEALTH'
  },
  {
    id: 'aurum-colony',
    title: 'BAA AURUM COLONY V13 — Autonomous Digital Asset Recovery & Commercialization Network (UA-AIDC Module 3)',
    shortTitle: 'AURUM COLONY V13',
    category: 'web3_finance',
    categoryLabel: 'Autonomous AI & Digital Asset Economy',
    description: 'The Digital Asset Refinery. 8 Wealth Colonies, 24 Autonomous Agents, Wallet Dust Sweeper, Slither AST Audit, ERC-4907 NFT Rentals & Paystack Direct Bank Payouts.',
    iconName: 'Coins',
    badge: 'MODULE 3'
  },
  {
    id: 'genesis',
    title: 'BAA MIND HIVE V17 GENESIS — Autonomous Venture Creation, Evolution & Colony Fusion Engine (UA-AIDC Module 4)',
    shortTitle: 'MIND HIVE GENESIS',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Venture Studio',
    description: 'The Autonomous Venture Studio. 8 Intelligence Modules, 10-Stage Living Venture Genome, Opportunity Gravity Map, Invention Tournaments, Colony Fusion Reactor & Paystack Ledger.',
    iconName: 'Sparkles',
    badge: 'MODULE 4'
  },
  {
    id: 'mindhive-v20',
    title: 'BAA MIND HIVE V20 — Global Content Compounding, AI Knowledge Mining, Training & Wealth Civilization',
    shortTitle: 'MIND HIVE V20',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Knowledge Economy',
    description: 'Autonomous multi-agent knowledge civilization. 5 Connected Economies, Content Genome, Living eBook Studio, Knowledge Mining Reactor & 70/30 Paystack Ledger.',
    iconName: 'Brain',
    badge: 'MODULE 5'
  },
  {
    id: 'social-hive',
    title: 'BAA SOCIAL HIVE V21 — Universal Social Media Minting, Mining & Monetization Engine',
    shortTitle: 'SOCIAL HIVE V21',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Social Intelligence',
    description: 'Transform social media posts, videos, reels, channels & creator knowledge into minted digital assets, enterprise KBs, and 70/30 Paystack earnings.',
    iconName: 'Share2',
    badge: 'MODULE 6'
  },
  {
    id: 'uadc-lab',
    title: 'BAA Universal Autonomous Data Center LAB — Universal Device Wealth Network (UDWN)',
    shortTitle: 'UDWN Data Center LAB',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Hardware Compute',
    description: 'Turn Connected Devices into Verified Computing Infrastructure and Shared Digital Wealth. Multi-device fleet, 13-agent colony & paid workloads.',
    iconName: 'Cpu',
    badge: 'UDWN LAB'
  },
  {
    id: 'udwn',
    title: 'Universal Device Wealth Network (UDWN Command Center)',
    shortTitle: 'UDWN Command Center',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI & Hardware Compute',
    description: 'Register and benchmark smartphones, laptops, workstations, smart TVs and edge clusters for verified commercial revenue.',
    iconName: 'Globe',
    badge: 'NEW FLEET'
  },
  {
    id: 'datacenter',
    title: 'Universal Autonomous Data Center',
    shortTitle: 'Data Center',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI',
    description: 'High-yield GPU clusters, decentralized node grid, and revenue pulse streams.',
    iconName: 'Server'
  },
  {
    id: 'cyber-eco',
    title: 'Autonomous Cyber Ecosystem (5 Pillars)',
    shortTitle: 'Cyber Hub',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI',
    description: 'Autonomous commercial engine uniting 5 pillars of digital prosperity.',
    iconName: 'Layers',
    badge: '5-PILLARS'
  },
  {
    id: 'omni-ad-swarm',
    title: 'Omni-Ad Swarm Campaign Engine',
    shortTitle: 'Omni-Ad Swarm',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI',
    description: 'Autonomous multi-channel ad creation, budget optimizer, and programmatic reach.',
    iconName: 'Radio',
    badge: 'GROWTH'
  },
  {
    id: 'tools',
    title: 'AI Tools & Autonomous Utilities',
    shortTitle: 'AI Tools',
    category: 'ai_autonomous',
    categoryLabel: 'Autonomous AI',
    description: 'Curated suite of verified sovereign intelligence toolkits and connectors.',
    iconName: 'Wrench'
  },

  // 3. WEB3, DEFI & REVENUE
  {
    id: 'wallet',
    title: 'BaaCoin Web3 Wallet & Proof-of-Networth',
    shortTitle: 'Wallet',
    category: 'web3_finance',
    categoryLabel: 'Web3 & Finance',
    description: 'Base L2 ledger, locked networth certificates, spendable yield, and Paystack ramp.',
    iconName: 'Coins',
    badge: 'BASE'
  },
  {
    id: 'exchange',
    title: 'BaaCoin Exchange & Staking Yield Pools',
    shortTitle: 'Exchange & Pools',
    category: 'web3_finance',
    categoryLabel: 'Web3 & Finance',
    description: 'Pegged $1.00 USD base with scarcity ratchet, LP staking, and multi-currency swap.',
    iconName: 'TrendingUp',
    badge: 'DEFI'
  },
  {
    id: 'projects',
    title: 'Projects & Venture Funding Pipeline',
    shortTitle: 'Projects & Grants',
    category: 'web3_finance',
    categoryLabel: 'Web3 & Finance',
    description: 'Submit startups, micro-fund with BaaCoin, and unlock institutional capital.',
    iconName: 'Flame',
    badge: 'FUNDING'
  },
  {
    id: 'referrals',
    title: 'Referral Hub & 10% Cash Flow Multipliers',
    shortTitle: 'Referral Hub',
    category: 'web3_finance',
    categoryLabel: 'Web3 & Finance',
    description: 'Perpetual sign bonus (99 BAA), affiliate links, and automated commission payouts.',
    iconName: 'Users',
    badge: 'EARN BAA'
  },
  {
    id: 'investor-one-pager',
    title: 'Sovereign Investor Deck & Tokenomics',
    shortTitle: 'Investor Deck',
    category: 'web3_finance',
    categoryLabel: 'Web3 & Finance',
    description: 'Institutional thesis, financial models, valuation metrics, and roadmap.',
    iconName: 'FileText',
    badge: 'SEED'
  },
  {
    id: 'bounties',
    title: 'Learn-to-Own Bounties & Hackathons',
    shortTitle: 'Bounties',
    category: 'web3_finance',
    categoryLabel: 'Web3 & Finance',
    description: 'Earn BaaCoin for bug hunts, model evaluation, and open-source contributions.',
    iconName: 'Award'
  },

  // 4. MEDIA & ENTERTAINMENT
  {
    id: 'tv',
    title: 'BAA TV Network & Shows Broadcast',
    shortTitle: 'BAA TV',
    category: 'media',
    categoryLabel: 'Media Network',
    description: '24/7 sovereign AI streaming shows, billionaire keynotes, and student debates.',
    iconName: 'Tv'
  },
  {
    id: 'tv-live',
    title: 'BAA TV Live Interactive Studio',
    shortTitle: 'TV Live',
    category: 'media',
    categoryLabel: 'Media Network',
    description: 'Real-time studio feed with live audience chat, reactions, and dean commentary.',
    iconName: 'Video'
  },
  {
    id: 'tv-studio',
    title: 'AI TV Studio & Show Creator',
    shortTitle: 'TV Studio',
    category: 'media',
    categoryLabel: 'Media Network',
    description: 'Synthesize new shows, AI avatars, automated scripts, and broadcast pipelines.',
    iconName: 'Film'
  },

  // 5. ADMIN COMMAND & GROWTH
  {
    id: 'admin',
    title: 'Admin Command Vault & Central Multi-Currency Earnings',
    shortTitle: 'Admin Vault',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Multi-currency dashboard (₦, $, £, €, ETH, BTC, BAA), user management & catalog control.',
    iconName: 'Shield',
    adminOnly: true,
    badge: 'VAULT'
  },
  {
    id: 'marketing',
    title: 'Marketing Command Center (Multi-Platform Ads)',
    shortTitle: 'Marketing Command',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Google, Meta, TikTok, and X automated campaign generator and CAC telemetry.',
    iconName: 'Target',
    adminOnly: true
  },
  {
    id: 'social',
    title: 'Social Media Autopilot (Viral Content Swarm)',
    shortTitle: 'Social Autopilot',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Automated thread creator, viral meme synthesizer, and automated distributor.',
    iconName: 'Share2',
    adminOnly: true
  },
  {
    id: 'whatsapp-closer',
    title: 'WhatsApp 24/7 AI Closer Bot',
    shortTitle: 'WhatsApp Closer',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Automated conversational lead qualification and Paystack payment closing.',
    iconName: 'MessageSquare',
    adminOnly: true
  },
  {
    id: 'whatsapp-broadcast',
    title: 'WhatsApp Mass Broadcast Console',
    shortTitle: 'WhatsApp Broadcast',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Compliant template broadcast scheduler with verified opt-in controls.',
    iconName: 'Send',
    adminOnly: true
  },
  {
    id: 'whatsapp-contacts',
    title: 'WhatsApp Verified Scraper & CRM',
    shortTitle: 'WhatsApp CRM',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Targeted directory discovery, syntax verification, and contact segmentation.',
    iconName: 'Contact',
    adminOnly: true
  },
  {
    id: 'translations',
    title: 'Pan-African AI Course Translator',
    shortTitle: 'AI Translations',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Real-time neural translation across Yoruba, Hausa, Igbo, Swahili, French & more.',
    iconName: 'Globe',
    adminOnly: true
  },
  {
    id: 'course-studio',
    title: 'AI Video Course Studio',
    shortTitle: 'Course Studio',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'Prompt-to-complete video curriculum generator with dynamic slide decks.',
    iconName: 'PlaySquare',
    adminOnly: true
  },
  {
    id: 'bulk-videos',
    title: 'Bulk 100 Course Video Generator',
    shortTitle: 'Bulk 100 Studio',
    category: 'admin_command',
    categoryLabel: 'Admin & Governance',
    description: 'High-throughput catalog builder executing batch video synthesis.',
    iconName: 'Sparkles',
    adminOnly: true
  },

  // 6. ECOSYSTEM & COMMUNITY
  {
    id: 'about',
    title: 'About the Sovereign Autonomous Vision',
    shortTitle: 'About',
    category: 'community',
    categoryLabel: 'Ecosystem & Alliances',
    description: 'The mission, African sovereign tech thesis, and founding architecture.',
    iconName: 'Info'
  },
  {
    id: 'partners',
    title: 'Global Partners & Institutional Alliances',
    shortTitle: 'Partners',
    category: 'community',
    categoryLabel: 'Ecosystem & Alliances',
    description: 'Venture alliances, telecom node sponsors, and university partners.',
    iconName: 'Handshake'
  }
];

interface NavigationContextType {
  currentPage: string;
  navigateTo: (page: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  previousPage: PageMetadata | null;
  nextPage: PageMetadata | null;
  currentPageMeta: PageMetadata;
  history: string[];
  historyIndex: number;
  isAllPagesModalOpen: boolean;
  openAllPagesModal: () => void;
  closeAllPagesModal: () => void;
  allPages: PageMetadata[];
  goToDashboard: () => void;
  goToHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{
  children: ReactNode;
  initialPage?: string;
  onPageChange?: (page: string) => void;
}> = ({ children, initialPage = 'home', onPageChange }) => {
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [history, setHistory] = useState<string[]>([initialPage]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isAllPagesModalOpen, setIsAllPagesModalOpen] = useState<boolean>(false);

  // Sync when initialPage changes externally (e.g. from hash in AppContent)
  useEffect(() => {
    if (initialPage && initialPage !== currentPage) {
      setCurrentPage(initialPage);
      setHistory(prev => {
        // If the new page is already at current head or right after, adjust gracefully
        if (prev[historyIndex] === initialPage) return prev;
        const newStack = prev.slice(0, historyIndex + 1);
        newStack.push(initialPage);
        return newStack;
      });
      setHistoryIndex(prev => prev + 1);
    }
  }, [initialPage]);

  // Navigate to target page and append to history
  const navigateTo = useCallback((page: string) => {
    let targetPage = page;
    if (page === 'aurum') targetPage = 'aurum-colony';
    if (page === 'mind-hive' || page === 'genesis-engine' || page === 'colony-v17') targetPage = 'genesis';
    if (page === 'mindhive' || page === 'v20' || page === 'mind-hive-v20' || page === 'knowledge-economy') targetPage = 'mindhive-v20';
    if (page === 'social-hive' || page === 'socialhive' || page === 'v21' || page === 'social-mining') targetPage = 'social-hive';
    if (targetPage === currentPage) return;

    setCurrentPage(targetPage);
    setHistory(prev => {
      const truncated = prev.slice(0, historyIndex + 1);
      return [...truncated, targetPage];
    });
    setHistoryIndex(prev => prev + 1);

    if (onPageChange) {
      onPageChange(targetPage);
    } else {
      window.location.hash = targetPage;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, historyIndex, onPageChange]);

  // Go Back
  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const targetPage = history[prevIdx];
      setHistoryIndex(prevIdx);
      setCurrentPage(targetPage);

      if (onPageChange) {
        onPageChange(targetPage);
      } else {
        window.location.hash = targetPage;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Fallback: If no internal history yet, go to home or dashboard
      if (currentPage !== 'home') {
        navigateTo('home');
      }
    }
  }, [history, historyIndex, onPageChange, currentPage, navigateTo]);

  // Go Forward
  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      const targetPage = history[nextIdx];
      setHistoryIndex(nextIdx);
      setCurrentPage(targetPage);

      if (onPageChange) {
        onPageChange(targetPage);
      } else {
        window.location.hash = targetPage;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [history, historyIndex, onPageChange]);

  const goToDashboard = useCallback(() => {
    navigateTo('dashboard');
  }, [navigateTo]);

  const goToHome = useCallback(() => {
    navigateTo('home');
  }, [navigateTo]);

  const canGoBack = historyIndex > 0 || currentPage !== 'home';
  const canGoForward = historyIndex < history.length - 1;

  const previousPageId = historyIndex > 0 ? history[historyIndex - 1] : (currentPage !== 'home' ? 'home' : null);
  const nextPageId = historyIndex < history.length - 1 ? history[historyIndex + 1] : null;

  const previousPage = previousPageId ? (ALL_PAGES.find(p => p.id === previousPageId) || null) : null;
  const nextPage = nextPageId ? (ALL_PAGES.find(p => p.id === nextPageId) || null) : null;

  const currentPageMeta = ALL_PAGES.find(p => p.id === currentPage) || {
    id: currentPage,
    title: currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' '),
    shortTitle: currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' '),
    category: 'core',
    categoryLabel: 'Core Portals',
    description: 'Active ecosystem module',
    iconName: 'Compass'
  };

  const openAllPagesModal = useCallback(() => setIsAllPagesModalOpen(true), []);
  const closeAllPagesModal = useCallback(() => setIsAllPagesModalOpen(false), []);

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        navigateTo,
        goBack,
        goForward,
        canGoBack,
        canGoForward,
        previousPage,
        nextPage,
        currentPageMeta,
        history,
        historyIndex,
        isAllPagesModalOpen,
        openAllPagesModal,
        closeAllPagesModal,
        allPages: ALL_PAGES,
        goToDashboard,
        goToHome
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
