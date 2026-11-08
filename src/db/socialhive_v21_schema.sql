-- MIND HIVE V21 EXTENSION — SOCIAL HIVE
-- THE UNIVERSAL SOCIAL MEDIA MINTING, MINING, INTELLIGENCE & MONETIZATION ENGINE
-- SQL SCHEMA FOR POSTGRESQL / SUPABASE

CREATE TABLE IF NOT EXISTS social_asset_genome (
  id VARCHAR(64) PRIMARY KEY,
  original_url TEXT NOT NULL,
  platform VARCHAR(32) NOT NULL,
  content_type VARCHAR(32) NOT NULL,
  title VARCHAR(255) NOT NULL,
  creator_name VARCHAR(255) NOT NULL,
  creator_handle VARCHAR(128) NOT NULL,
  creator_avatar_url TEXT,
  published_at TIMESTAMPTZ,
  description TEXT,
  transcript_sample TEXT,
  topic VARCHAR(128),
  category VARCHAR(128),
  views BIGINT DEFAULT 0,
  likes BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  engagement_rate_percent NUMERIC(5, 2) DEFAULT 0.0,
  claimed_by VARCHAR(255),
  is_authorized_account BOOLEAN DEFAULT FALSE,
  verification_status VARCHAR(64) DEFAULT 'public_fair_use',
  declared_license VARCHAR(64) DEFAULT 'commercial_70_30',
  allow_knowledge_extraction BOOLEAN DEFAULT TRUE,
  allow_multiplication BOOLEAN DEFAULT TRUE,
  allow_enterprise_assistant BOOLEAN DEFAULT TRUE,
  allow_ai_training_dataset BOOLEAN DEFAULT TRUE,
  commercial_value_usd NUMERIC(12, 2) DEFAULT 0.0,
  revenue_realized_usd NUMERIC(12, 2) DEFAULT 0.0,
  creator_earnings_usd NUMERIC(12, 2) DEFAULT 0.0,
  status VARCHAR(32) DEFAULT 'active_genome',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_derivatives (
  id VARCHAR(64) PRIMARY KEY,
  parent_social_asset_id VARCHAR(64) REFERENCES social_asset_genome(id) ON DELETE CASCADE,
  derivative_format VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  payload_summary TEXT,
  price_usd NUMERIC(12, 2) DEFAULT 0.0,
  price_ngn NUMERIC(14, 2) DEFAULT 0.0,
  commercial_status VARCHAR(32) DEFAULT 'draft',
  sales_count INT DEFAULT 0,
  total_revenue_usd NUMERIC(12, 2) DEFAULT 0.0,
  generated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_enterprise_products (
  id VARCHAR(64) PRIMARY KEY,
  domain VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  source_social_asset_count INT DEFAULT 1,
  product_type VARCHAR(64) NOT NULL,
  license_price_annual_usd NUMERIC(12, 2) DEFAULT 0.0,
  license_price_annual_ngn NUMERIC(14, 2) DEFAULT 0.0,
  active_enterprise_clients INT DEFAULT 0,
  total_revenue_usd NUMERIC(12, 2) DEFAULT 0.0,
  compliance_review_status VARCHAR(64) DEFAULT 'Reviewed & Certified',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_buyer_opportunities (
  id VARCHAR(64) PRIMARY KEY,
  organization_name VARCHAR(255) NOT NULL,
  buyer_type VARCHAR(64) NOT NULL,
  targeted_platform VARCHAR(32) NOT NULL,
  budget_usd NUMERIC(12, 2) DEFAULT 0.0,
  budget_ngn NUMERIC(14, 2) DEFAULT 0.0,
  match_score INT DEFAULT 0,
  deal_stage VARCHAR(64) DEFAULT 'Matched',
  matched_asset_id VARCHAR(64),
  last_action TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS connected_social_accounts (
  id VARCHAR(64) PRIMARY KEY,
  platform VARCHAR(32) NOT NULL,
  account_handle VARCHAR(128) NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  connection_status VARCHAR(32) DEFAULT 'connected',
  approved_scopes TEXT[],
  followers BIGINT DEFAULT 0,
  monthly_impressions BIGINT DEFAULT 0,
  avg_engagement_rate NUMERIC(5, 2) DEFAULT 0.0,
  connected_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
