-- =========================================================================
-- UA-AIDC / MIND HIVE V22 SUPABASE / POSTGRESQL SCHEMA
-- THE GLOBAL KNOWLEDGE CAPITAL, INTELLIGENCE ATLAS & HUMAN–AI VALUE CIVILIZATION
-- =========================================================================

-- 1. KCX Knowledge Assets Table
create table if not exists kcx_knowledge_assets (
  id text primary key,
  title text not null,
  slug text not null,
  category text not null,
  author text not null,
  author_email text,
  organization text,
  summary text not null,
  content_hash_sha256 text not null,
  verification_status text default 'verified_owner',
  rights_declaration jsonb default '{}'::jsonb,
  valuation jsonb default '{}'::jsonb,
  metrics jsonb default '{"viewsCount": 0, "inquiriesCount": 0, "activeLicensesCount": 0, "settledRevenueUsd": 0, "pendingRevenueUsd": 0}'::jsonb,
  listing_price_usd numeric default 2500,
  listing_status text default 'active',
  sample_preview_text text,
  file_format text,
  file_size_bytes bigint,
  created_at timestamp with time zone default now()
);

-- 2. KCX Buyer Requests (RFQs)
create table if not exists kcx_buyer_requests (
  id text primary key,
  buyer_name text not null,
  buyer_org text not null,
  buyer_type text not null,
  title text not null,
  description text not null,
  target_category text not null,
  budget_usd numeric not null,
  preferred_license text not null,
  urgency text default 'medium',
  status text default 'open',
  proposals_count int default 0,
  created_at timestamp with time zone default now()
);

-- 3. KCX Offers & Term Sheets
create table if not exists kcx_offers (
  id text primary key,
  asset_id text references kcx_knowledge_assets(id) on delete cascade,
  asset_title text not null,
  buyer_id text not null,
  buyer_name text not null,
  buyer_org text not null,
  proposed_amount_usd numeric not null,
  proposed_license text not null,
  special_terms text,
  stage text default 'inquiry',
  platform_fee_usd numeric default 0,
  creator_earnings_usd numeric default 0,
  creator_earnings_ngn numeric default 0,
  created_at timestamp with time zone default now()
);

-- 4. KCX License Agreements & Escrow
create table if not exists kcx_license_agreements (
  id text primary key,
  agreement_code text unique not null,
  asset_id text references kcx_knowledge_assets(id),
  asset_title text not null,
  licensor_name text not null,
  licensee_name text not null,
  licensee_org text not null,
  license_type text not null,
  effective_date timestamp with time zone default now(),
  expiry_date timestamp with time zone,
  settled_amount_usd numeric not null,
  settled_amount_ngn numeric not null,
  royalty_split_percent jsonb default '{"creator": 70, "platform": 30}'::jsonb,
  escrow_status text default 'released_to_creator',
  signed_contract_hash_sha256 text not null,
  created_at timestamp with time zone default now()
);

-- 5. GKA Knowledge Gaps Table
create table if not exists gka_knowledge_gaps (
  id text primary key,
  territory_id text not null,
  title text not null,
  problem_statement text not null,
  evidence text,
  source_references jsonb default '[]'::jsonb,
  confidence_level int default 90,
  urgency text default 'high',
  target_geography text,
  target_industry text,
  recommended_asset_type text,
  estimated_dev_cost_usd numeric default 5000,
  potential_commercial_value_usd numeric default 50000,
  status text default 'discovered',
  created_at timestamp with time zone default now()
);

-- 6. GKA Language Resources Table
create table if not exists gka_language_resources (
  id text primary key,
  language_name text not null,
  region text not null,
  speakers_count_estimate bigint,
  resource_type text not null,
  dataset_size_summary text not null,
  licensing_status text default 'consented_commercial',
  commercial_demand_score int default 90,
  lead_contributor text,
  created_at timestamp with time zone default now()
);

-- 7. HAVC Contributor Profiles
create table if not exists havc_contributor_profiles (
  id text primary key,
  display_identity text not null,
  real_name_or_org text not null,
  role text not null,
  bio text,
  location text,
  verified_badges jsonb default '[]'::jsonb,
  skills jsonb default '[]'::jsonb,
  reputation_score int default 900,
  total_contributions int default 0,
  settled_earnings_usd numeric default 0,
  settled_earnings_ngn numeric default 0,
  pending_earnings_usd numeric default 0,
  privacy_setting text default 'public',
  joined_at timestamp with time zone default now()
);

-- 8. HAVC Contribution DNA Records
create table if not exists havc_contribution_dna (
  id text primary key,
  asset_or_project_id text not null,
  item_title text not null,
  contributor_id text not null,
  contributor_name text not null,
  contribution_role text not null,
  contribution_type text not null,
  contribution_percentage numeric not null,
  evidence_hash_sha256 text not null,
  agreed_share_percent numeric not null,
  approved_by_owner boolean default true,
  created_at timestamp with time zone default now()
);

-- 9. HAVC Collaborative Projects
create table if not exists havc_collaborative_projects (
  id text primary key,
  title text not null,
  category text not null,
  owner_id text not null,
  owner_name text not null,
  status text default 'recruiting',
  completion_percent int default 0,
  milestones_count int default 5,
  completed_milestones int default 0,
  target_completion_date timestamp with time zone,
  agreed_revenue_split jsonb default '{"contributors": 70, "cooperativePool": 10, "platformOperations": 20}'::jsonb,
  total_bounty_budget_usd numeric default 10000,
  participants jsonb default '[]'::jsonb,
  created_at timestamp with time zone default now()
);

-- 10. HAVC Shared Value Distributions
create table if not exists havc_shared_value_distributions (
  id text primary key,
  tx_reference text unique not null,
  source_product_title text not null,
  total_gross_payment_ngn numeric not null,
  total_gross_payment_usd numeric not null,
  platform_fee_ngn numeric not null,
  cooperative_pool_ngn numeric not null,
  contributor_payouts jsonb not null,
  status text default 'settled',
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table kcx_knowledge_assets enable row level security;
alter table kcx_buyer_requests enable row level security;
alter table kcx_offers enable row level security;
alter table kcx_license_agreements enable row level security;
alter table gka_knowledge_gaps enable row level security;
alter table gka_language_resources enable row level security;
alter table havc_contributor_profiles enable row level security;
alter table havc_contribution_dna enable row level security;
alter table havc_collaborative_projects enable row level security;
alter table havc_shared_value_distributions enable row level security;

-- Open policies for cooperative demo & verified access
create policy "Allow all kcx_knowledge_assets" on kcx_knowledge_assets for all using (true) with check (true);
create policy "Allow all kcx_buyer_requests" on kcx_buyer_requests for all using (true) with check (true);
create policy "Allow all kcx_offers" on kcx_offers for all using (true) with check (true);
create policy "Allow all kcx_license_agreements" on kcx_license_agreements for all using (true) with check (true);
create policy "Allow all gka_knowledge_gaps" on gka_knowledge_gaps for all using (true) with check (true);
create policy "Allow all gka_language_resources" on gka_language_resources for all using (true) with check (true);
create policy "Allow all havc_contributor_profiles" on havc_contributor_profiles for all using (true) with check (true);
create policy "Allow all havc_contribution_dna" on havc_contribution_dna for all using (true) with check (true);
create policy "Allow all havc_collaborative_projects" on havc_collaborative_projects for all using (true) with check (true);
create policy "Allow all havc_shared_value_distributions" on havc_shared_value_distributions for all using (true) with check (true);
