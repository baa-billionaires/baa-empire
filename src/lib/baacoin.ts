// BaaCoin Tokenomics, Learn-to-Own Data Center Shares & AI Governor Engine

export interface DataCenterShareholding {
  shares: number;
  ownershipPercent: number; // e.g. 0.05%
  dailyEarning: number;     // e.g. $2.30/day
  totalEarned: number;
}

export interface BountyItem {
  id: string;
  company_name: string;
  title: string;
  description: string;
  budget_ngn: number;
  budget_usd: number;
  skills_required: string[];
  posted_by: string;
  claimed_by?: string;
  status: 'open' | 'claimed' | 'delivered' | 'approved';
  deliverable_url?: string;
  approved: boolean;
  created_at: string;
}

export interface GovernorLog {
  id: string;
  action: string;
  details: string;
  result: string;
  baacoin_impact: number;
  created_at: string;
}

/**
 * Learn-to-Own Calculation:
 * Every 1,000 BaaCoin mined = 1 Share (0.001% equity in the Data Center).
 * Ikeja Data Center generates $1,000/day distributed to shareholders.
 */
export function calculateShares(baacoinMined: number): DataCenterShareholding {
  const shares = Math.floor(baacoinMined / 1000) + (baacoinMined > 0 ? (baacoinMined % 1000) / 1000 : 0);
  const ownershipPercent = Number((shares * 0.001).toFixed(4));
  const dailyPool = 1000; // $1,000 daily GPU compute dividend
  const dailyEarning = Number(((ownershipPercent / 100) * dailyPool).toFixed(2));
  const totalEarned = Number((dailyEarning * 14).toFixed(2)); // estimated 2 weeks accumulation

  return {
    shares: Number(shares.toFixed(3)),
    ownershipPercent,
    dailyEarning,
    totalEarned
  };
}

export const INITIAL_BOUNTIES: BountyItem[] = [
  {
    id: "bounty-1",
    company_name: "Sterling FinTech Lagos",
    title: "Need Autonomous WhatsApp Sales Bot for Naira Loans",
    description: "Develop and deploy an AI closer agent that handles customer inquiries, calculates micro-loan interest, and returns Paystack authorization URLs.",
    budget_ngn: 150000,
    budget_usd: 120,
    skills_required: ["WhatsApp API", "FastAPI / Node", "Paystack", "Prompt Engineering"],
    posted_by: "Sterling FinTech",
    status: "open",
    approved: false,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "bounty-2",
    company_name: "Nollywood AI Studios",
    title: "Afrobeats Voice Cloner & Speech Sync for 3 Episodes",
    description: "Create realistic vocal stems and sync Pidgin/Yoruba dialogue to 3 completed video scenes using our audio tools.",
    budget_ngn: 250000,
    budget_usd: 200,
    skills_required: ["ElevenLabs / RVC", "Audio Editing", "Yoruba/Pidgin Nuance"],
    posted_by: "Nollywood AI",
    status: "open",
    approved: false,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "bounty-3",
    company_name: "Pan-Africa DAO",
    title: "Solidity Smart Contract Honeypot Audit & Gas Optimization",
    description: "Audit our treasury voting contract on Polygon and optimize gas execution by at least 25%. Provide markdown audit report.",
    budget_ngn: 180000,
    budget_usd: 145,
    skills_required: ["Solidity", "Hardhat", "Security Audit"],
    posted_by: "Pan-Africa DAO",
    status: "open",
    approved: false,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "bounty-4",
    company_name: "Kainji Solar Grid",
    title: "Telemetry Dashboard Component for GPU Rack Temperatures",
    description: "Build an interactive React dashboard component that displays live PUE, wattage draw, and liquid thermal status.",
    budget_ngn: 100000,
    budget_usd: 80,
    skills_required: ["React", "Tailwind", "Canvas / Charts"],
    posted_by: "Kainji Data Center",
    status: "open",
    approved: false,
    created_at: new Date(Date.now() - 3600000 * 36).toISOString()
  },
  {
    id: "bounty-5",
    company_name: "Savannah E-Commerce",
    title: "Generate 50 High-Converting AI Dropshipping Product Copy",
    description: "Utilize our Prompt Refinery Matrix to generate 50 product descriptions and TikTok hooks for African fashion merchandise.",
    budget_ngn: 75000,
    budget_usd: 60,
    skills_required: ["Copywriting", "ChatGPT Prompts", "E-commerce"],
    posted_by: "Savannah Goods",
    status: "open",
    approved: false,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const INITIAL_GOVERNOR_LOGS: GovernorLog[] = [
  {
    id: "gov-1",
    action: "Autonomous GPU Dividend Distribution",
    details: "Distributed $1,000 daily compute revenue across 84 Learn-to-Own student shareholders.",
    result: "SUCCESS (Batch TX #0x7fa2...)",
    baacoin_impact: 1000,
    created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString()
  },
  {
    id: "gov-2",
    action: "Autonomous AI Recruiter Scout Cycle",
    details: "Discovered 14 new student leads on LinkedIn searching 'AI Course Nigeria'. Dispatched personalized pitches.",
    result: "14 Leads Added",
    baacoin_impact: 140,
    created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString()
  },
  {
    id: "gov-3",
    action: "AI TV Channel Program Scheduling",
    details: "Synthesized 'Billionaires Daily News' breaking episode on student bounty payouts. Scheduled for 12:00 UTC.",
    result: "Show Published to BAA TV",
    baacoin_impact: 50,
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  }
];
