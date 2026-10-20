-- BILLIONAIRES AI ACADEMY & AFRICA BLOCKCHAIN & AI UNIVERSITY
-- FULL AUTONOMOUS ECOSYSTEM DATABASE SCHEMA
-- RUN IN SUPABASE SQL EDITOR

-- 1. PROFILES & BAACOIN NETWORTH
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

-- 2. COURSES (100 TITLES)
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

-- 3. ENROLLMENTS (LEARN-TO-MINE TRACKER)
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  progress int default 0,
  completed bool default false,
  total_mined numeric default 0,
  created_at timestamp with time zone default now()
);

-- 4. INTERACTIONS (LEARNING ACTIONS = MINING TRANSACTIONS)
create table if not exists interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  course_id uuid references courses(id) on delete cascade,
  type text not null, -- 'video_watch', 'ai_tutor_query', 'assignment_complete', 'research_submit'
  xp_earned int default 0,
  baacoin_mined numeric default 0,
  prompt_data text,
  created_at timestamp with time zone default now()
);

-- 5. PROMPT MARKETPLACE (60% STUDENT / 40% PLATFORM SPLIT)
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

-- 6. CERTIFICATES NFT (WITH BAACOIN CHIP & QR REFERRAL)
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

-- 7. EBOOKS
create table if not exists ebooks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price numeric not null,
  cover_url text,
  pdf_url text,
  sales int default 0,
  created_at timestamp with time zone default now()
);

-- 8. AI TOOLS
create table if not exists ai_tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price_monthly numeric default 29,
  icon text,
  is_active bool default true,
  created_at timestamp with time zone default now()
);

-- 9. AI TUTORS (PLUG & PLAY EMBEDDABLE)
create table if not exists ai_tutors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  description text,
  avatar_url text,
  price_monthly numeric default 99,
  embed_code text,
  hired_by_schools int default 0,
  is_active bool default true,
  created_at timestamp with time zone default now()
);

-- 10. SCOUT LEADS (AUTONOMOUS AI RECRUITER)
create table if not exists scout_leads (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- 'student', 'investor', 'institution'
  name text not null,
  email text,
  source_url text,
  status text default 'discovered', -- 'discovered', 'contacted', 'converted'
  ai_message text,
  converted bool default false,
  created_at timestamp with time zone default now()
);

-- 11. REFERRALS (10% BONUS FROM NEW STUDENT NETWORTH)
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references profiles(id) on delete cascade,
  referred_id uuid references profiles(id) on delete cascade,
  commission numeric default 0,
  baacoin_bonus numeric default 0,
  paid bool default false,
  created_at timestamp with time zone default now()
);

-- 12. WALLETS
create table if not exists wallets (
  user_id uuid primary key references profiles(id) on delete cascade,
  balance numeric default 0,
  total_earned numeric default 0,
  total_mined numeric default 0
);

-- PHASE 2 MONEY MACHINES TABLES (IF NOT EXISTS)
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
  is_connected bool default false,
  followers int default 0,
  created_at timestamp default now()
);

create table if not exists social_posts (
  id uuid primary key default gen_random_uuid(),
  content text,
  media_url text,
  platforms text[],
  status text default 'pending',
  scheduled_at timestamp,
  posted_at timestamp,
  views int default 0,
  likes int default 0,
  shares int default 0,
  earnings numeric default 0,
  prompt_used text,
  course_id uuid,
  show_id uuid,
  created_at timestamp default now()
);

create table if not exists marketing_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text,
  objective text,
  prompt text,
  target_audience text,
  platforms text[],
  courses text[],
  budget numeric,
  revenue_target numeric,
  revenue_actual numeric default 0,
  status text default 'running',
  hashtags text[],
  preset_audience jsonb,
  ai_generated bool default true,
  created_at timestamp default now()
);

create table if not exists ad_creatives (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references marketing_campaigns(id),
  type text,
  content text,
  media_url text,
  cta text,
  clicks int default 0,
  conversions int default 0,
  created_at timestamp default now()
);

create table if not exists internal_ads (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  image_url text,
  link text,
  position text,
  impressions int default 0,
  clicks int default 0,
  is_active bool default true,
  created_at timestamp default now()
);

create table if not exists whatsapp_contacts (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text unique,
  source text,
  tags text[],
  is_valid bool default true,
  opted_in bool default true,
  last_message_at timestamp,
  created_at timestamp default now()
);

create table if not exists whatsapp_broadcasts (
  id uuid primary key default gen_random_uuid(),
  name text,
  message_template text,
  media_url text,
  audience_tags text[],
  total_contacts int default 0,
  sent int default 0,
  delivered int default 0,
  read int default 0,
  replied int default 0,
  converted int default 0,
  revenue numeric default 0,
  status text default 'draft',
  scheduled_at timestamp,
  created_at timestamp default now()
);

create table if not exists whatsapp_conversations (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references whatsapp_contacts(id),
  phone text,
  direction text,
  message text,
  ai_generated bool default false,
  intent text,
  created_at timestamp default now()
);

create table if not exists whatsapp_closer_rules (
  id uuid primary key default gen_random_uuid(),
  trigger_keyword text,
  response_template text,
  action text,
  course_id uuid,
  bounty_id uuid,
  is_active bool default true
);

-- ENABLE ROW LEVEL SECURITY ON ALL TABLES (PERMISSIVE)
alter table profiles enable row level security;
alter table courses enable row level security;
alter table enrollments enable row level security;
alter table interactions enable row level security;
alter table prompts_marketplace enable row level security;
alter table certificates_nft enable row level security;
alter table ebooks enable row level security;
alter table ai_tools enable row level security;
alter table ai_tutors enable row level security;
alter table scout_leads enable row level security;
alter table referrals enable row level security;
alter table wallets enable row level security;
alter table paystack_subscriptions enable row level security;
alter table paystack_transactions enable row level security;
alter table bounties enable row level security;
alter table data_center_shares enable row level security;
alter table ai_tv_channels enable row level security;
alter table ai_tv_shows enable row level security;
alter table marketing_campaigns enable row level security;
alter table whatsapp_contacts enable row level security;
alter table whatsapp_broadcasts enable row level security;

create policy "Allow all profiles" on profiles for all using (true) with check (true);
create policy "Allow all courses" on courses for all using (true) with check (true);
create policy "Allow all enrollments" on enrollments for all using (true) with check (true);
create policy "Allow all interactions" on interactions for all using (true) with check (true);
create policy "Allow all prompts_marketplace" on prompts_marketplace for all using (true) with check (true);
create policy "Allow all certificates_nft" on certificates_nft for all using (true) with check (true);
create policy "Allow all ebooks" on ebooks for all using (true) with check (true);
create policy "Allow all ai_tools" on ai_tools for all using (true) with check (true);
create policy "Allow all ai_tutors" on ai_tutors for all using (true) with check (true);
create policy "Allow all scout_leads" on scout_leads for all using (true) with check (true);
create policy "Allow all referrals" on referrals for all using (true) with check (true);
create policy "Allow all wallets" on wallets for all using (true) with check (true);
create policy "Allow all paystack_subscriptions" on paystack_subscriptions for all using (true) with check (true);
create policy "Allow all paystack_transactions" on paystack_transactions for all using (true) with check (true);
create policy "Allow all bounties" on bounties for all using (true) with check (true);
create policy "Allow all data_center_shares" on data_center_shares for all using (true) with check (true);
create policy "Allow all ai_tv_channels" on ai_tv_channels for all using (true) with check (true);
create policy "Allow all ai_tv_shows" on ai_tv_shows for all using (true) with check (true);
create policy "Allow all marketing_campaigns" on marketing_campaigns for all using (true) with check (true);
create policy "Allow all whatsapp_contacts" on whatsapp_contacts for all using (true) with check (true);
create policy "Allow all whatsapp_broadcasts" on whatsapp_broadcasts for all using (true) with check (true);

-- ============================================================================
-- UADC LAB (UNIVERSAL AUTONOMOUS DATA CENTER) TABLES
-- ============================================================================
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

alter table uadc_earnings enable row level security;
alter table uadc_data_vault enable row level security;
alter table uadc_stakes enable row level security;
alter table uadc_workers enable row level security;
alter table uadc_twins enable row level security;

create policy "Allow all uadc_earnings" on uadc_earnings for all using (true) with check (true);
create policy "Allow all uadc_data_vault" on uadc_data_vault for all using (true) with check (true);
create policy "Allow all uadc_stakes" on uadc_stakes for all using (true) with check (true);
create policy "Allow all uadc_workers" on uadc_workers for all using (true) with check (true);
create policy "Allow all uadc_twins" on uadc_twins for all using (true) with check (true);

