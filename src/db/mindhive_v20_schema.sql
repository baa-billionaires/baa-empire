-- MIND HIVE V20 — AUTONOMOUS MULTI-AGENT KNOWLEDGE ECONOMY & AI TRAINING CIVILIZATION
-- SQL SCHEMA FOR POSTGRESQL / SUPABASE & LOCAL RUNTIMES

CREATE TABLE IF NOT EXISTS mindhive_v20_assets (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  author VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  format VARCHAR(64) NOT NULL,
  category VARCHAR(128) NOT NULL,
  summary TEXT NOT NULL,
  content_hash_sha256 VARCHAR(64) NOT NULL,
  registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  word_count INT DEFAULT 0,
  verification_shield VARCHAR(64) NOT NULL,
  rights_license_type VARCHAR(64) NOT NULL,
  rights_allow_derivatives BOOLEAN DEFAULT TRUE,
  rights_copyright_owner VARCHAR(255) NOT NULL,
  ai_rag_allowed BOOLEAN DEFAULT TRUE,
  ai_finetuning_allowed BOOLEAN DEFAULT TRUE,
  ai_pretraining_allowed BOOLEAN DEFAULT FALSE,
  distributed_to_global_engine BOOLEAN DEFAULT FALSE,
  base_price_usd NUMERIC(12, 2) DEFAULT 0.00,
  base_price_ngn NUMERIC(14, 2) DEFAULT 0.00,
  status VARCHAR(32) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS mindhive_v20_derivatives (
  id VARCHAR(64) PRIMARY KEY,
  parent_asset_id VARCHAR(64) REFERENCES mindhive_v20_assets(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  derivative_type VARCHAR(64) NOT NULL,
  item_count INT DEFAULT 1,
  description TEXT,
  content_payload TEXT,
  commercial_status VARCHAR(32) DEFAULT 'draft',
  sales_price_usd NUMERIC(12, 2) DEFAULT 0.00,
  sales_price_ngn NUMERIC(14, 2) DEFAULT 0.00,
  revenue_generated_usd NUMERIC(12, 2) DEFAULT 0.00,
  generated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mindhive_v20_mining_jobs (
  id VARCHAR(64) PRIMARY KEY,
  asset_id VARCHAR(64) REFERENCES mindhive_v20_assets(id) ON DELETE CASCADE,
  status VARCHAR(32) DEFAULT 'queued',
  extracted_facts_count INT DEFAULT 0,
  qa_pairs_count INT DEFAULT 0,
  multi_turn_instructions_count INT DEFAULT 0,
  semantic_density_score NUMERIC(5, 2) DEFAULT 0.00,
  hallucination_risk VARCHAR(64) DEFAULT 'Ultra-Low (<0.1%)',
  dedup_index NUMERIC(5, 2) DEFAULT 100.00,
  dataset_format VARCHAR(32) DEFAULT 'jsonl',
  dataset_size_bytes BIGINT DEFAULT 0,
  jsonl_sample TEXT,
  completed_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS mindhive_v20_training_listings (
  id VARCHAR(64) PRIMARY KEY,
  asset_id VARCHAR(64) REFERENCES mindhive_v20_assets(id) ON DELETE CASCADE,
  dataset_name VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  total_tokens_approx BIGINT DEFAULT 0,
  sample_rows_count INT DEFAULT 0,
  license_fee_usd NUMERIC(12, 2) DEFAULT 0.00,
  license_fee_ngn NUMERIC(14, 2) DEFAULT 0.00,
  creator_share_percent NUMERIC(5, 2) DEFAULT 70.00,
  platform_share_percent NUMERIC(5, 2) DEFAULT 30.00,
  active_subscribers_count INT DEFAULT 0,
  total_earnings_usd NUMERIC(12, 2) DEFAULT 0.00,
  compliance_checked BOOLEAN DEFAULT TRUE,
  distributed_to_global_engine BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS mindhive_v20_model_forge_projects (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  target_level INT NOT NULL,
  level_name VARCHAR(128) NOT NULL,
  base_foundation_model VARCHAR(128) NOT NULL,
  training_dataset_id VARCHAR(64),
  compute_node_cluster VARCHAR(128),
  status VARCHAR(32) DEFAULT 'queued',
  eval_accuracy_score NUMERIC(5, 2) DEFAULT 0.00,
  latency_ms INT DEFAULT 0,
  cost_per_hour_usd NUMERIC(8, 2) DEFAULT 0.00,
  deployed_endpoint VARCHAR(255),
  description TEXT
);

CREATE TABLE IF NOT EXISTS mindhive_v20_buyer_leads (
  id VARCHAR(64) PRIMARY KEY,
  legion_type VARCHAR(64) NOT NULL,
  legion_name VARCHAR(128) NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  country VARCHAR(64) NOT NULL,
  flag VARCHAR(8) NOT NULL,
  targeted_asset_category VARCHAR(128) NOT NULL,
  budget_usd NUMERIC(12, 2) DEFAULT 0.00,
  budget_ngn NUMERIC(14, 2) DEFAULT 0.00,
  match_score INT DEFAULT 0,
  urgency VARCHAR(32) DEFAULT 'Next 30 Days',
  deal_stage VARCHAR(64) DEFAULT 'Matched',
  last_action TEXT
);

CREATE TABLE IF NOT EXISTS mindhive_v20_royalty_transactions (
  id VARCHAR(64) PRIMARY KEY,
  asset_id VARCHAR(64) REFERENCES mindhive_v20_assets(id),
  asset_title VARCHAR(255) NOT NULL,
  buyer_name VARCHAR(255) NOT NULL,
  license_type VARCHAR(128) NOT NULL,
  currency VARCHAR(8) DEFAULT 'USD',
  gross_amount_usd NUMERIC(12, 2) DEFAULT 0.00,
  gross_amount_ngn NUMERIC(14, 2) DEFAULT 0.00,
  creator_share_usd NUMERIC(12, 2) DEFAULT 0.00, -- 70%
  creator_share_ngn NUMERIC(14, 2) DEFAULT 0.00,
  platform_share_usd NUMERIC(12, 2) DEFAULT 0.00, -- 30%
  platform_share_ngn NUMERIC(14, 2) DEFAULT 0.00,
  paystack_ref VARCHAR(128) NOT NULL,
  payout_status VARCHAR(32) DEFAULT 'settled_bank',
  timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
