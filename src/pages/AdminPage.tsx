import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Shield,
  Radar,
  Users,
  BookOpen,
  DollarSign,
  Image as ImageIcon,
  Database,
  Play,
  RotateCcw,
  CheckCircle,
  Check,
  Copy,
  ExternalLink,
  Send,
  MessageCircle,
  Plus,
  Trash2,
  Lock,
  Layers,
  Sparkles,
  Download,
  Coins
} from 'lucide-react';
import { AdminCentralEarningsDashboard } from '../components/AdminCentralEarningsDashboard';

export interface AdminPageProps {
  onNavigate?: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
    isAdmin,
    adminLogout,
    courses,
    scoutLeads,
    scoutStats,
    runScoutCycle,
    convertLead,
    customLogoUrl,
    setCustomLogoUrl,
    resetAllSeedData,
    marketplacePrompts
  } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'scout' | 'revenue' | 'courses' | 'branding' | 'sql' | 'engines'>('engines');
  const [leadFilter, setLeadFilter] = useState<'all' | 'student' | 'investor' | 'institution'>('all');
  const [logoInputUrl, setLogoInputUrl] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [scoutRunningIndicator, setScoutRunningIndicator] = useState(false);

  // Revenue analytics
  const totalMarketRevenue = marketplacePrompts.reduce((acc, p) => acc + p.revenue, 0);
  const studentShareTotal = marketplacePrompts.reduce((acc, p) => acc + p.student_share, 0);
  const platformShareTotal = marketplacePrompts.reduce((acc, p) => acc + p.platform_share, 0);

  const filteredLeads = scoutLeads.filter(l => leadFilter === 'all' || l.type === leadFilter);

  const handleManualRunScout = () => {
    setScoutRunningIndicator(true);
    runScoutCycle();
    setTimeout(() => {
      setScoutRunningIndicator(false);
    }, 600);
  };

  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logoInputUrl.trim()) return;
    setCustomLogoUrl(logoInputUrl.trim());
    setLogoInputUrl('');
  };

  const handleResetLogo = () => {
    setCustomLogoUrl(null);
  };

  const supabaseSqlContent = `-- RUN THIS IN SUPABASE SQL EDITOR
-- BILLIONAIRES AI ACADEMY & AFRICA BLOCKCHAIN UNIVERSITY FULL SCHEMA

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text not null,
  role text default 'student',
  avatar_url text,
  baacoin_balance numeric default 0,
  baacoin_networth numeric default 0,
  baacoin_locked bool default true,
  referral_code text unique,
  referred_by text,
  level int default 1,
  xp int default 0,
  is_verified bool default false,
  created_at timestamp with time zone default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  baacoin_value numeric not null,
  level text default 'Beginner',
  category text default 'AI Wealth',
  thumbnail_url text,
  modules jsonb default '[]'::jsonb,
  instructor text,
  students_count int default 0,
  is_published bool default true,
  created_at timestamp with time zone default now()
);

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  progress int default 0,
  completed bool default false,
  total_mined numeric default 0,
  created_at timestamp with time zone default now()
);

create table if not exists interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  type text not null,
  xp_earned int default 0,
  baacoin_mined numeric default 0,
  prompt_data text,
  created_at timestamp with time zone default now()
);

create table if not exists prompts_marketplace (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  final_prompt text not null,
  price numeric default 49,
  sales int default 0,
  revenue numeric default 0,
  student_share numeric default 0,
  platform_share numeric default 0,
  is_listed bool default true,
  created_at timestamp with time zone default now()
);

create table if not exists certificates_nft (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  nft_id text unique not null,
  baacoin_engraved numeric not null,
  ipfs_url text,
  qr_data text,
  is_tradable bool default true,
  created_at timestamp with time zone default now()
);

create table if not exists scout_leads (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  name text not null,
  email text,
  source_url text,
  status text default 'discovered',
  ai_message text,
  converted bool default false,
  created_at timestamp with time zone default now()
);

create table if not exists wallets (
  user_id uuid primary key references profiles(id) on delete cascade,
  balance numeric default 0,
  total_earned numeric default 0,
  total_mined numeric default 0
);

-- PHASE 2 MONEY MACHINES TABLES
create table if not exists paystack_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  email text,
  authorization_code text,
  subscription_code text,
  plan_code text,
  tutor_id uuid references ai_tutors(id),
  status text default 'active',
  amount numeric,
  next_payment_date timestamp,
  created_at timestamp default now()
);

create table if not exists paystack_transactions (
  id uuid primary key default gen_random_uuid(),
  reference text unique,
  user_id uuid,
  email text,
  amount numeric,
  status text,
  type text,
  tutor_id uuid,
  verified bool default false,
  created_at timestamp default now()
);

create table if not exists bounties (
  id uuid primary key default gen_random_uuid(),
  company_name text,
  title text,
  description text,
  budget numeric,
  skills_required text[],
  posted_by uuid,
  claimed_by uuid,
  status text default 'open',
  deliverable_url text,
  approved bool default false,
  created_at timestamp default now()
);

create table if not exists data_center_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  shares numeric default 0,
  ownership_percent numeric default 0,
  daily_earning numeric default 0,
  total_earned numeric default 0,
  created_at timestamp default now()
);

create table if not exists ai_tv_channels (
  id uuid primary key default gen_random_uuid(),
  name text,
  slug text unique,
  description text,
  thumbnail_url text,
  is_live bool default false,
  current_show_id uuid,
  viewers int default 0,
  created_at timestamp default now()
);

create table if not exists ai_tv_shows (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid references ai_tv_channels(id),
  title text,
  description text,
  video_url text,
  thumbnail_url text,
  type text,
  ai_generated bool default true,
  created_by uuid,
  views int default 0,
  likes int default 0,
  baacoin_earned numeric default 0,
  status text default 'published',
  created_at timestamp default now()
);

create table if not exists ai_tv_schedule (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid,
  show_id uuid,
  start_time timestamp,
  end_time timestamp,
  is_ai_hosted bool default true
);

create table if not exists translations (
  id uuid primary key default gen_random_uuid(),
  course_id uuid,
  language text,
  translated_content jsonb,
  voice_url text,
  status text default 'pending'
);

create table if not exists white_labels (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid,
  domain text unique,
  school_name text,
  logo_url text,
  primary_color text,
  plan text default 'pro',
  platform_fee_percent int default 20,
  students_count int default 0,
  monthly_revenue numeric default 0,
  status text default 'active',
  created_at timestamp default now()
);

create table if not exists ai_governor_logs (
  id uuid primary key default gen_random_uuid(),
  action text,
  details jsonb,
  result text,
  baacoin_impact numeric default 0,
  created_at timestamp default now()
);

create table if not exists social_accounts (
  id uuid primary key default gen_random_uuid(),
  platform text,
  account_name text,
  access_token text,
  refresh_token text,
  is_connected bool default true,
  followers int default 0,
  created_at timestamp default now()
);

-- UADC LAB TABLES
create table if not exists uadc_earnings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  module text,
  engine_name text,
  amount numeric default 0,
  currency text default 'USD',
  details jsonb,
  created_at timestamp default now()
);

create table if not exists uadc_data_vault (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  vault_size_gb numeric default 2.3,
  earning_rate_hourly numeric default 0.42,
  total_dividends_earned numeric default 0,
  unclaimed_dividends numeric default 47.30,
  status text default 'active',
  created_at timestamp default now()
);

create table if not exists uadc_stakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  stake_amount numeric default 0,
  apy_percent numeric default 24,
  daily_yield numeric default 0,
  status text default 'active',
  created_at timestamp default now()
);

create table if not exists uadc_workers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  worker_name text,
  role text,
  is_active bool default true,
  today_earnings numeric default 0,
  tasks_completed int default 0,
  rental_price_monthly numeric default 29,
  created_at timestamp default now()
);

create table if not exists uadc_twins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  twin_name text,
  role text,
  avatar_url text,
  is_active bool default true,
  daily_revenue numeric default 0,
  monthly_fee numeric default 19,
  created_at timestamp default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table courses enable row level security;
alter table enrollments enable row level security;
alter table interactions enable row level security;
alter table prompts_marketplace enable row level security;
alter table certificates_nft enable row level security;
alter table scout_leads enable row level security;
alter table wallets enable row level security;
alter table paystack_subscriptions enable row level security;
alter table paystack_transactions enable row level security;
alter table bounties enable row level security;
alter table data_center_shares enable row level security;
alter table ai_tv_channels enable row level security;
alter table ai_tv_shows enable row level security;
alter table translations enable row level security;
alter table white_labels enable row level security;
alter table social_accounts enable row level security;
alter table uadc_earnings enable row level security;
alter table uadc_data_vault enable row level security;
alter table uadc_stakes enable row level security;
alter table uadc_workers enable row level security;
alter table uadc_twins enable row level security;

create policy "Allow all profiles" on profiles for all using (true) with check (true);
create policy "Allow all courses" on courses for all using (true) with check (true);
create policy "Allow all enrollments" on enrollments for all using (true) with check (true);
create policy "Allow all interactions" on interactions for all using (true) with check (true);
create policy "Allow all prompts_marketplace" on prompts_marketplace for all using (true) with check (true);
create policy "Allow all certificates_nft" on certificates_nft for all using (true) with check (true);
create policy "Allow all scout_leads" on scout_leads for all using (true) with check (true);
create policy "Allow all wallets" on wallets for all using (true) with check (true);
create policy "Allow all bounties" on bounties for all using (true) with check (true);
create policy "Allow all tv" on ai_tv_shows for all using (true) with check (true);
create policy "Allow all uadc_earnings" on uadc_earnings for all using (true) with check (true);
create policy "Allow all uadc_data_vault" on uadc_data_vault for all using (true) with check (true);
create policy "Allow all uadc_stakes" on uadc_stakes for all using (true) with check (true);
create policy "Allow all uadc_workers" on uadc_workers for all using (true) with check (true);
create policy "Allow all uadc_twins" on uadc_twins for all using (true) with check (true);`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(supabaseSqlContent);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Vault Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-black border-2 border-[#FFD700] flex items-center justify-center text-[#FFD700] shadow-lg shadow-[#FFD700]/20">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
                RICHCONNECT COMMAND VAULT
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-[10px] font-mono text-emerald-400 font-bold">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Auth: naijaukmusicalfusion@gmail.com • Token: richconnect_admin
            </p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('engines')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'engines'
                  ? 'bg-gradient-to-r from-[#FFD700] to-[#00D4FF] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Engines (10)</span>
            </button>

            <button
              onClick={() => setActiveTab('scout')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'scout'
                  ? 'bg-[#00D4FF] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>AI Scout Recruiter</span>
            </button>

            <button
              onClick={() => setActiveTab('revenue')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'revenue'
                  ? 'bg-emerald-400 text-black shadow-md font-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Central Earnings (7 Currencies)</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'courses'
                  ? 'bg-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Courses ({courses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('branding')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'branding'
                  ? 'bg-[#00D4FF] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Branding &amp; Logo</span>
            </button>

            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
                activeTab === 'sql'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Supabase SQL</span>
            </button>
          </div>

          <button
            onClick={adminLogout}
            className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-700 text-xs font-mono rounded-xl transition"
          >
            Lock Vault
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* TAB 0: AUTONOMOUS COMMAND ENGINES */}
        {activeTab === 'engines' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-[#FFD700]/30 shadow-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700] font-bold uppercase mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] animate-ping" />
                    <span>Autonomous Money Machines &amp; Ops Network</span>
                  </div>
                  <h2 className="text-2xl font-heading font-black text-white">
                    Autonomous Command Centers
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                    Full-stack autonomous operations engines for student recruitment, WhatsApp sales closing, course video rendering, marketing autopilot, and multi-language pan-African expansion.
                  </p>
                </div>
              </div>

              {/* Grid of Command Centers */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {/* 0. Flagship: Autonomous Growth OS + MAFIA™ */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 border-2 border-emerald-500/60 hover:border-emerald-400 transition flex flex-col justify-between group shadow-xl shadow-emerald-950/30">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/50">
                        MAFIA™ FLAGSHIP OS
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-emerald-400 transition">
                      Autonomous Growth OS + MAFIA™
                    </h3>
                    <p className="text-xs text-zinc-300">
                      13-Agent Advertising Colony, GeoTerritory discovery, 10-stage CRM, digital product factory, and verified Paystack webhook revenue loops.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('growth-mafia')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950"
                  >
                    <span>Launch MAFIA™ Command Center</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 1. Marketing Command */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#FFD700] transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-[#FFD700]/10 text-[#FFD700]">
                        <Sparkles className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        1-CLICK LAUNCH
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-[#FFD700] transition">
                      Marketing Command Center
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Single prompt campaign generator that creates creatives, targets 5 platforms, and drives revenue.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('marketing')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-[#FFD700] hover:text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Launch Campaign Engine</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Social Autopilot */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-[#00D4FF] transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF]">
                        <Send className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30">
                        24/7 AUTONOMOUS
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-[#00D4FF] transition">
                      Social Media Autopilot
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Simultaneously creates and publishes viral video hooks and carousels across TikTok, IG, X, and LinkedIn.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('social')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-[#00D4FF] hover:text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Open Social Publisher</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. WhatsApp AI Closer */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <MessageCircle className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        PAYSTACK READY
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-emerald-400 transition">
                      WhatsApp AI Closer Agent
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Autonomous sales agent that chats with prospective students, answers objections, and sends Paystack payment links.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('whatsapp-closer')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Open AI Closer</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. WhatsApp Mass Broadcast */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-400 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-emerald-400/10 text-emerald-300">
                        <Send className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                        10x NETWORTH HOOKS
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-emerald-300 transition">
                      WhatsApp Mass Broadcast
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Send personalized flash scholarship alerts with dynamic name, course title, and BaaCoin networth tokens.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('whatsapp-broadcast')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-emerald-400 hover:text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Create Broadcast</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 5. WhatsApp Contacts Scraper */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                        <Users className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                        CRM &amp; TAGS
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-emerald-400 transition">
                      WhatsApp Contacts &amp; Scraper
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Import WhatsApp chat logs, auto-extract phone numbers, and segment hot buyers from university groups.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('whatsapp-contacts')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-black font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Manage Contacts</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 6. AI Course Studio */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-400 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                        <Layers className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        SLIDES + AUDIO + VIDEO
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-purple-400 transition">
                      AI Course Studio
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Convert any course outline into automated video lessons, voiceovers, slides, and quizzes with 1-click publishing.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('course-studio')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-purple-500 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Open Course Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 7. Bulk Video Render Engine */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-pink-500 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
                        <Play className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30">
                        100 COURSES AT ONCE
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-pink-400 transition">
                      Bulk Video Render Engine
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Continuous batch video generation pipeline across all 100 courses powered by the Autonomous AI Data Center.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('bulk-videos')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-pink-500 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Run Bulk Render</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 8. Pan-African Translations */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-blue-400 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                        <Layers className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                        7 LANGUAGES
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-blue-400 transition">
                      Pan-African Translations
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Batch-translate all 100 courses into Yoruba, Igbo, Hausa, Swahili, Amharic, Zulu, and French.
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate && onNavigate('translations')}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-blue-500 hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Batch Translate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 9. 24/7 AI TV Broadcast Studio */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500 transition flex flex-col justify-between group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="p-2 rounded-xl bg-red-500/10 text-red-500">
                        <Play className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30">
                        LIVE 24/7 NETWORK
                      </span>
                    </div>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-red-400 transition">
                      AI TV Broadcast Network
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Autonomous human + AI media network broadcasting education, news, and prompt breakdowns with viewer rewards.
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onNavigate && onNavigate('tv')}
                      className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-red-600 hover:text-white font-heading font-bold text-[11px] uppercase tracking-wider transition text-center"
                    >
                      Watch TV
                    </button>
                    <button
                      onClick={() => onNavigate && onNavigate('tv-studio')}
                      className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-red-500 hover:text-white font-heading font-bold text-[11px] uppercase tracking-wider transition text-center"
                    >
                      TV Studio
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: AI RECRUITER SCOUT (AUTONOMOUS ENGINE) */}
        {activeTab === 'scout' && (
          <div className="space-y-6">
            {/* Autonomous Scout Status & Metrics */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-[#00D4FF]/40 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] font-bold uppercase mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Autonomous AI Recruiter Scout Engine</span>
                  </div>
                  <h2 className="text-2xl font-heading font-black text-white">
                    Crawling &amp; Pitching 24/7 Across Africa
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    Autonomous loop hunting students searching "want to learn AI", investors searching "AI data center Africa", and institutions seeking AI tutors.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleManualRunScout}
                    disabled={scoutRunningIndicator}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/25 flex items-center gap-2 shrink-0"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>{scoutRunningIndicator ? 'Executing Hunt Cycle...' : 'Run Scout Now'}</span>
                  </button>
                </div>
              </div>

              {/* Counter Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-center">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Total Discovered Leads</span>
                  <span className="text-3xl font-heading font-black text-white block mt-1">
                    {scoutStats.discovered.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">LinkedIn, Twitter, FB, Direct</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-center">
                  <span className="text-[10px] font-mono text-[#00D4FF] uppercase font-bold">Auto-Contacted with Pitch</span>
                  <span className="text-3xl font-heading font-black text-[#00D4FF] block mt-1">
                    {scoutStats.contacted.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono">AI Email &amp; WhatsApp Links Sent</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Enrolled / Converted</span>
                  <span className="text-3xl font-heading font-black text-emerald-400 block mt-1">
                    {scoutStats.converted.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-mono">Enrolled &amp; Generating Tuition</span>
                </div>
              </div>
            </div>

            {/* Filter Leads by Type */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-zinc-400">Filter Leads:</span>
                {(['all', 'student', 'investor', 'institution'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setLeadFilter(f)}
                    className={`px-3 py-1 rounded-lg capitalize transition ${
                      leadFilter === f
                        ? 'bg-[#00D4FF] text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-zinc-400">
                {filteredLeads.length} leads in current view
              </span>
            </div>

            {/* Leads Table */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-4">Lead Name &amp; Contact</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Personalized AI Pitch</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {filteredLeads.map((lead) => {
                      const waLink = `https://wa.me/${(lead.phone_or_wa || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(lead.ai_message)}`;

                      return (
                        <tr key={lead.id} className="hover:bg-zinc-900/40 transition">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white font-sans">{lead.name}</div>
                            <div className="text-[11px] text-zinc-400">{lead.email}</div>
                            {lead.phone_or_wa && (
                              <div className="text-[10px] text-zinc-500">{lead.phone_or_wa}</div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              lead.type === 'student'
                                ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                                : lead.type === 'investor'
                                ? 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30'
                                : 'bg-purple-950 text-purple-400 border border-purple-500/30'
                            }`}>
                              {lead.type}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-zinc-400">
                            {lead.source_platform}
                          </td>

                          <td className="py-3.5 px-4 max-w-sm">
                            <p className="text-[11px] text-zinc-300 line-clamp-2 italic font-sans">
                              "{lead.ai_message}"
                            </p>
                          </td>

                          <td className="py-3.5 px-4">
                            {lead.converted ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                                Converted
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-500/30 text-[10px]">
                                Contacted
                              </span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {lead.phone_or_wa && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30 transition"
                                  title="Send WhatsApp Direct Pitch"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                              )}

                              {!lead.converted && (
                                <button
                                  onClick={() => convertLead(lead.id)}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] border border-zinc-700 transition"
                                >
                                  Convert
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CENTRAL EARNINGS DASHBOARD (7 CURRENCIES) & 60/40 SPLIT VAULT */}
        {activeTab === 'revenue' && (
          <div className="space-y-8">
            {/* 7-CURRENCY CENTRAL EARNINGS DASHBOARD */}
            <AdminCentralEarningsDashboard />

            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-xl font-heading font-black text-white mb-4">
                Prompt Marketplace 60/40 Settlement Vault
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Gross Prompt Revenue</span>
                <span className="text-3xl font-heading font-black text-white block mt-1">
                  ${totalMarketRevenue.toLocaleString()} USD
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">From all student prompt sales</span>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-950 border border-[#00D4FF]/30">
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase font-bold">Student Payouts (60%)</span>
                <span className="text-3xl font-heading font-black text-[#00D4FF] block mt-1">
                  ${studentShareTotal.toLocaleString()} USD
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">Disbursed automatically to wallets</span>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-950 border border-[#FFD700]/30">
                <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">University Treasury (40%)</span>
                <span className="text-3xl font-heading font-black text-[#FFD700] block mt-1">
                  ${platformShareTotal.toLocaleString()} USD
                </span>
                <span className="text-[11px] text-amber-300 font-mono">Net operational university revenue</span>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-heading">Marketplace Autonomous Settlement Ledger</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="text-zinc-500 border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5">Prompt Package</th>
                      <th className="py-2.5">Student Author</th>
                      <th className="py-2.5">Sales</th>
                      <th className="py-2.5">Student Share (60%)</th>
                      <th className="py-2.5">Treasury (40%)</th>
                      <th className="py-2.5">Contract Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {marketplacePrompts.map(p => (
                      <tr key={p.id} className="text-zinc-300">
                        <td className="py-3 text-white font-medium">{p.title}</td>
                        <td className="py-3 text-zinc-400">{p.student_name}</td>
                        <td className="py-3 text-[#FFD700] font-bold">{p.sales} sales</td>
                        <td className="py-3 text-emerald-400 font-bold">${p.student_share.toFixed(2)}</td>
                        <td className="py-3 text-white font-bold">${p.platform_share.toFixed(2)}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] border border-emerald-500/30">
                            Settled On-Chain
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COURSES (100) */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-black text-white">Curriculum Management</h3>
                <span className="text-xs font-mono text-zinc-400">100 Seeded Courses Ready for Enrollment</span>
              </div>

              <button
                onClick={resetAllSeedData}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-amber-400 rounded-xl flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All to Pristine Seed</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.slice(0, 15).map(c => (
                <div key={c.id} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-[#00D4FF]">{c.category}</span>
                    <span className="text-[#FFD700] font-bold">${c.price} (${c.baacoin_value} Networth)</span>
                  </div>
                  <h4 className="font-bold text-white">{c.title}</h4>
                  <div className="text-zinc-500 font-mono text-[11px] truncate">{c.instructor}</div>
                </div>
              ))}
            </div>
            <div className="text-center font-mono text-xs text-zinc-500">
              Showing 15 of 100 courses. All 100 courses loaded in database state.
            </div>
          </div>
        )}

        {/* TAB 4: BRANDING & LOGO */}
        {activeTab === 'branding' && (
          <div className="max-w-2xl bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div>
              <h3 className="text-xl font-heading font-black text-white">Branding &amp; Logo Settings</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Customize the logo URL uploaded to bucket "branding" or provide an external SVG/PNG link.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
              <div className="text-xs font-mono text-zinc-400">Current Logo Preview:</div>
              <div className="p-3 bg-black rounded-lg border border-zinc-800">
                <img
                  src={customLogoUrl || '/logo.svg'}
                  alt="Logo"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="text-xs font-mono text-zinc-300">
                {customLogoUrl ? 'Custom Logo Active' : 'Default Official SVG (/logo.svg)'}
              </div>
            </div>

            <form onSubmit={handleSaveLogo} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Custom Logo URL (SVG / PNG / WebP)
                </label>
                <input
                  type="url"
                  placeholder="https://.../my_custom_logo.svg"
                  value={logoInputUrl}
                  onChange={(e) => setLogoInputUrl(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FFD700] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition"
                >
                  Save Logo
                </button>
                {customLogoUrl && (
                  <button
                    type="button"
                    onClick={handleResetLogo}
                    className="px-4 py-2.5 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-700 text-xs font-mono rounded-xl transition"
                  >
                    Reset to Default SVG
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: SUPABASE SQL */}
        {activeTab === 'sql' && (
          <div className="bg-zinc-950 rounded-3xl border border-purple-500/30 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-black text-white">
                  Supabase SQL Deployment Script
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Copy and run this inside your Supabase Project's SQL Editor to instantiate all 12 tables and RLS policies.
                </p>
              </div>

              <button
                onClick={handleCopySql}
                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs font-mono rounded-xl transition flex items-center gap-1.5"
              >
                {copiedSql ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Schema'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-purple-300 overflow-x-auto max-h-96 whitespace-pre-wrap leading-relaxed">
              {supabaseSqlContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminPage;
