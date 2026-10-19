// AI TV Network Seed Data

export interface TVChannel {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  is_live: boolean;
  viewers: number;
}

export interface TVShow {
  id: string;
  channel_id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  type: 'news' | 'education' | 'entertainment' | 'documentary';
  ai_generated: boolean;
  creator_name: string;
  views: number;
  likes: number;
  baacoin_earned: number;
  duration_minutes: number;
  status: 'published' | 'live';
  created_at: string;
}

export interface TVScheduleItem {
  id: string;
  channel_name: string;
  show_title: string;
  time_slot: string;
  is_ai_hosted: boolean;
}

export const INITIAL_TV_CHANNELS: TVChannel[] = [
  {
    id: "chan-1",
    name: "BAA TV (Billionaires Channel)",
    slug: "baa-tv",
    description: "24/7 sovereign wealth blueprints, billionaire interviews, and real-time autonomous data center revenue feeds.",
    thumbnail_url: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=80",
    is_live: true,
    viewers: 1420
  },
  {
    id: "chan-2",
    name: "Blockchain TV Africa",
    slug: "blockchain-tv",
    description: "Live memecoin sniper tracking, smart contract security audits, and Pan-African CBDC development roundtables.",
    thumbnail_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80",
    is_live: true,
    viewers: 940
  },
  {
    id: "chan-3",
    name: "Nollywood AI TV",
    slug: "nollywood-ai-tv",
    description: "AI-generated dramas, procedural African cinema, and indigenous sci-fi animations created by academy scholars.",
    thumbnail_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&auto=format&fit=crop&q=80",
    is_live: false,
    viewers: 610
  },
  {
    id: "chan-4",
    name: "Student AI TV",
    slug: "student-tv",
    description: "Graduate prompt reviews, real-time bounty demonstrations, and student success stories from across Africa.",
    thumbnail_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
    is_live: true,
    viewers: 820
  },
  {
    id: "chan-5",
    name: "Kids AI TV",
    slug: "kids-ai-tv",
    description: "Animated robotics tutorials, coding games, and mathematics stories for Africa's next trillion-dollar generation.",
    thumbnail_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    is_live: false,
    viewers: 430
  }
];

export const INITIAL_TV_SHOWS: TVShow[] = [
  {
    id: "show-1",
    channel_id: "chan-1",
    title: "AI Governor Live: The Trillion Dollar Sovereign Compute Shift",
    description: "Our autonomous AI Governor breaks down how African hydro data centers are outcompeting legacy Western cloud providers.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    type: "news",
    ai_generated: true,
    creator_name: "AI Governor Sovereign Node",
    views: 14890,
    likes: 1240,
    baacoin_earned: 420,
    duration_minutes: 24,
    status: "live",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "show-2",
    channel_id: "chan-1",
    title: "The $100M Prompt: How Tunde Scaled His Instagram Empire",
    description: "Graduate case study analyzing prompt chains that generated $9,016 in the 60/40 Marketplace in 14 days.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    type: "education",
    ai_generated: false,
    creator_name: "Tunde Bakare (Graduate #042)",
    views: 8920,
    likes: 780,
    baacoin_earned: 198,
    duration_minutes: 18,
    status: "published",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "show-3",
    channel_id: "chan-2",
    title: "Memecoin Sniper Warfare: Deconstructing Honeypots in 3 Seconds",
    description: "Live Solidity audit breakdown showing how to detect malicious mint hooks and claim bounty payouts.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80",
    type: "education",
    ai_generated: true,
    creator_name: "Prof. Adaeze AI",
    views: 12400,
    likes: 950,
    baacoin_earned: 310,
    duration_minutes: 32,
    status: "published",
    created_at: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: "show-4",
    channel_id: "chan-3",
    title: "Chief Adeleke's Digital Naira: An AI Nollywood Thriller",
    description: "The complete 20-minute generative episode crafted with Nollywood Script Machine and Afrobeats Vocal Cloner.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop&q=80",
    type: "entertainment",
    ai_generated: true,
    creator_name: "Nollywood AI Collective",
    views: 24100,
    likes: 2100,
    baacoin_earned: 890,
    duration_minutes: 20,
    status: "published",
    created_at: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    id: "show-5",
    channel_id: "chan-4",
    title: "From Non-Code to ₦250k Bounties: How Fatima Built Her Agency",
    description: "Watch Fatima demonstrate how she claims commercial bounties and automates customer deliverables.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    type: "documentary",
    ai_generated: false,
    creator_name: "Fatima Oumar",
    views: 7400,
    likes: 640,
    baacoin_earned: 150,
    duration_minutes: 15,
    status: "published",
    created_at: new Date(Date.now() - 3600000 * 40).toISOString()
  }
];

export const INITIAL_TV_SCHEDULE: TVScheduleItem[] = [
  { id: "sched-1", channel_name: "BAA TV", show_title: "AI Governor Live Sovereign Compute", time_slot: "NOW (12:00 - 13:00)", is_ai_hosted: true },
  { id: "sched-2", channel_name: "BAA TV", show_title: "Student Bounty Showcase & Payouts", time_slot: "NEXT (13:00 - 14:00)", is_ai_hosted: false },
  { id: "sched-3", channel_name: "Blockchain TV", show_title: "Smart Contract Sniper Audit Lab", time_slot: "NOW (12:00 - 12:45)", is_ai_hosted: true },
  { id: "sched-4", channel_name: "Nollywood AI", show_title: "Chief Adeleke's Digital Naira Ep. 1", time_slot: "NEXT (13:30 - 14:00)", is_ai_hosted: true }
];
