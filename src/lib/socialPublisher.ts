// Social Publisher & Multi-Platform Syndication Engine

export interface SocialAccount {
  id: string;
  platform: 'TikTok' | 'Instagram' | 'Facebook' | 'LinkedIn' | 'Twitter' | 'YouTube';
  account_name: string;
  is_connected: boolean;
  followers: number;
}

export interface SocialPost {
  id: string;
  content: string;
  media_url?: string;
  platforms: string[];
  status: 'pending' | 'published';
  scheduled_at?: string;
  posted_at?: string;
  views: number;
  likes: number;
  shares: number;
  earnings: number;
  prompt_used: string;
  created_at: string;
}

const STORAGE_POSTS_KEY = 'richconnect_social_posts';
const STORAGE_ACCOUNTS_KEY = 'richconnect_social_accounts';

export const INITIAL_SOCIAL_ACCOUNTS: SocialAccount[] = [
  { id: "acc-1", platform: "TikTok", account_name: "@BillionairesAIAfrica", is_connected: true, followers: 84200 },
  { id: "acc-2", platform: "Instagram", account_name: "@BillionairesAI.Academy", is_connected: true, followers: 62400 },
  { id: "acc-3", platform: "LinkedIn", account_name: "Africa Blockchain & AI University", is_connected: true, followers: 41900 },
  { id: "acc-4", platform: "Twitter", account_name: "@BillionairesAIA", is_connected: true, followers: 53100 },
  { id: "acc-5", platform: "YouTube", account_name: "Billionaires AI Academy TV", is_connected: true, followers: 32000 },
  { id: "acc-6", platform: "Facebook", account_name: "Billionaires AI Academy Official", is_connected: true, followers: 91000 }
];

export function getStoredSocialPosts(): SocialPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_POSTS_KEY);
    return raw ? JSON.parse(raw) : [
      {
        id: "post-1",
        content: "Stop scrolling! Here is how our student Tunde turned 1 ChatGPT prompt into $9,016 in 14 days in Lagos. Enroll now & get 10x BaaCoin Networth ($990). #LearnAI #BillionairesAI #ChatGPT",
        platforms: ["TikTok", "Instagram", "Twitter"],
        status: "published",
        views: 24500,
        likes: 1840,
        shares: 420,
        earnings: 120,
        prompt_used: "Promote ChatGPT ATM course to Gen-Z students",
        posted_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        created_at: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ];
  } catch {
    return [];
  }
}

export function saveSocialPost(post: SocialPost): void {
  const current = getStoredSocialPosts();
  const updated = [post, ...current.filter(p => p.id !== post.id)];
  localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(updated));
}

export function generateContentFromPrompt(
  prompt: string,
  courseTitle?: string
): { caption: string; hashtags: string[]; hook: string; cta: string } {
  const subject = courseTitle || "AI Wealth Masterclass";

  const hooks = [
    `Want to earn in USD while living anywhere in Africa? Here is the secret...`,
    `Stop working for pennies. This 1 automated AI prompt replaced a full agency.`,
    `How to turn $99 into $990 Networth on day 1 with Learn-to-Mine.`,
    `The AI tool Lagos businesses are secretly using to close deals 24/7 on WhatsApp.`
  ];

  const chosenHook = hooks[Math.floor(Math.random() * hooks.length)];
  const hashtags = ["#BillionairesAI", "#BaaCoin", "#AfricaTech", "#ChatGPT", "#RemoteWork"];
  const cta = "Link in bio to claim your 10x BaaCoin Networth and start mining!";

  const caption = `${chosenHook}\n\nInside "${subject}", our students build zero-employee digital cashflows and sell their verified prompt packages in the 60/40 Marketplace.\n\n${cta}\n\n${hashtags.join(' ')}`;

  return {
    caption,
    hashtags,
    hook: chosenHook,
    cta
  };
}

export function publishPost(
  content: string,
  platforms: string[],
  promptUsed: string = "Manual Autopost"
): SocialPost {
  const newPost: SocialPost = {
    id: `post-${Date.now()}`,
    content,
    platforms,
    status: 'published',
    posted_at: new Date().toISOString(),
    views: Math.floor(Math.random() * 8000) + 1500,
    likes: Math.floor(Math.random() * 600) + 80,
    shares: Math.floor(Math.random() * 120) + 20,
    earnings: Math.floor(Math.random() * 45) + 15,
    prompt_used: promptUsed,
    created_at: new Date().toISOString()
  };

  saveSocialPost(newPost);
  return newPost;
}
