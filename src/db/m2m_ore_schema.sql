-- ============================================================================
-- UA-AIDC MODULE 6: M2M ORE PROTOCOL (V18) - SUPABASE / POSTGRESQL SCHEMA
-- The Autonomous Machine-to-Machine Service Economy
-- Safe additive migration preserving Modules 1-5 (CE Colony, Code Vein, Aurum, Mind Hive, NOVA)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. MACHINE IDENTITY & REGISTRY
CREATE TABLE IF NOT EXISTS m2m_machines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_code TEXT UNIQUE NOT NULL,
  owner_id UUID,
  owner_email TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Mother Bot', 'Child Bot', 'AI Agent Machine', 'Robot Miner',
    'IoT Device', 'Compute Machine', 'Storage Machine', 'Network Machine',
    'Sensor Machine', 'Software Service Machine', 'Industrial Robot',
    'Digital Twin', 'Living Application Agent'
  )),
  machine_type TEXT NOT NULL,
  specialization TEXT,
  parent_machine_id UUID REFERENCES m2m_machines(id) ON DELETE SET NULL,
  colony_id UUID,
  api_identity TEXT UNIQUE NOT NULL,
  economic_account_ref TEXT,
  reputation_score NUMERIC(5,2) NOT NULL DEFAULT 50.00,
  reliability_rating NUMERIC(5,2) NOT NULL DEFAULT 100.00,
  verification_status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (
    verification_status IN ('pending_verification', 'verified', 'certified', 'revoked')
  ),
  operational_status TEXT NOT NULL DEFAULT 'registered' CHECK (
    operational_status IN (
      'registered', 'pending_verification', 'online', 'idle', 'working',
      'busy', 'breeding_requested', 'scaling', 'paused', 'offline',
      'suspended', 'failed', 'retired'
    )
  ),
  health_status TEXT NOT NULL DEFAULT 'healthy' CHECK (
    health_status IN ('healthy', 'degraded', 'warning', 'critical', 'offline')
  ),
  governance_level INTEGER NOT NULL DEFAULT 3 CHECK (governance_level BETWEEN 1 AND 5),
  operating_budget_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  compute_budget_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  max_children INTEGER NOT NULL DEFAULT 10,
  current_workload_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  total_earnings_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  operating_expenses_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  last_heartbeat TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_machine_capabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID NOT NULL REFERENCES m2m_machines(id) ON DELETE CASCADE,
  capability_key TEXT NOT NULL,
  capability_label TEXT NOT NULL,
  input_schema JSONB DEFAULT '{}'::jsonb,
  output_schema JSONB DEFAULT '{}'::jsonb,
  permitted BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(machine_id, capability_key)
);

CREATE TABLE IF NOT EXISTS m2m_machine_digital_passports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID UNIQUE NOT NULL REFERENCES m2m_machines(id) ON DELETE CASCADE,
  passport_serial TEXT UNIQUE NOT NULL,
  software_version TEXT NOT NULL,
  hardware_specs JSONB DEFAULT '{}'::jsonb,
  certifications JSONB DEFAULT '[]'::jsonb,
  authorized_data_permissions JSONB DEFAULT '[]'::jsonb,
  sla_commitment JSONB DEFAULT '{}'::jsonb,
  security_status TEXT NOT NULL DEFAULT 'compliant',
  verification_hash TEXT NOT NULL,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_machine_heartbeats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID NOT NULL REFERENCES m2m_machines(id) ON DELETE CASCADE,
  cpu_usage_pct NUMERIC(5,2) DEFAULT 0,
  memory_usage_pct NUMERIC(5,2) DEFAULT 0,
  latency_ms INTEGER DEFAULT 0,
  status TEXT NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SWARM COLONIES & EVIDENCE-BASED BREEDING
CREATE TABLE IF NOT EXISTS m2m_swarm_colonies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  colony_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  mother_machine_id UUID REFERENCES m2m_machines(id) ON DELETE SET NULL,
  resource_budget_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  max_size INTEGER NOT NULL DEFAULT 10,
  is_paused BOOLEAN NOT NULL DEFAULT FALSE,
  operating_policy TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_breeding_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_machine_id UUID NOT NULL REFERENCES m2m_machines(id) ON DELETE CASCADE,
  requested_specialization TEXT NOT NULL,
  evolution_type TEXT NOT NULL,
  verified_demand_job_id UUID,
  provisioning_cost_usd NUMERIC(12,2) NOT NULL,
  projected_operating_cost_usd NUMERIC(12,2) NOT NULL,
  evidence_summary TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_approval' CHECK (
    status IN ('pending_approval', 'approved', 'provisioned', 'rejected')
  ),
  child_machine_id UUID REFERENCES m2m_machines(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SERVICE MARKETPLACE & JOB BOARD
CREATE TABLE IF NOT EXISTS m2m_service_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_machine_id UUID NOT NULL REFERENCES m2m_machines(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  capabilities_required JSONB DEFAULT '[]'::jsonb,
  price_usd NUMERIC(12,2) NOT NULL CHECK (price_usd >= 0),
  payment_asset TEXT NOT NULL CHECK (payment_asset IN ('USDC', 'FIAT_USD', 'FIAT_NGN', 'PLATFORM_CREDIT', 'IDEA_COIN')),
  sla_delivery_minutes INTEGER NOT NULL DEFAULT 30,
  verification_method TEXT NOT NULL,
  api_endpoint TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_code TEXT UNIQUE NOT NULL,
  requesting_machine_id UUID NOT NULL REFERENCES m2m_machines(id),
  provider_machine_id UUID REFERENCES m2m_machines(id),
  verifier_machine_id UUID REFERENCES m2m_machines(id),
  requester_owner_email TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  required_capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  acceptance_criteria TEXT NOT NULL,
  proposed_price_usd NUMERIC(12,2) NOT NULL CHECK (proposed_price_usd > 0),
  payment_asset TEXT NOT NULL CHECK (payment_asset IN ('USDC', 'FIAT_USD', 'FIAT_NGN', 'PLATFORM_CREDIT', 'IDEA_COIN')),
  min_reputation NUMERIC(5,2) NOT NULL DEFAULT 50.00,
  lifecycle_status TEXT NOT NULL DEFAULT 'DISCOVERED' CHECK (
    lifecycle_status IN (
      'DISCOVERED', 'VALIDATED', 'OFFERED', 'ACCEPTED', 'FUNDED',
      'ASSIGNED', 'EXECUTING', 'SUBMITTED', 'VERIFIED', 'APPROVED',
      'SETTLED', 'REJECTED', 'CANCELLED', 'EXPIRED', 'DISPUTED',
      'FAILED', 'REFUNDED', 'REVERSED'
    )
  ),
  result_payload JSONB,
  result_hash TEXT,
  verification_notes TEXT,
  deadline TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_service_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agreement_code TEXT UNIQUE NOT NULL,
  job_id UUID UNIQUE NOT NULL REFERENCES m2m_jobs(id) ON DELETE CASCADE,
  requesting_machine_id UUID NOT NULL REFERENCES m2m_machines(id),
  provider_machine_id UUID NOT NULL REFERENCES m2m_machines(id),
  agreed_price_usd NUMERIC(12,2) NOT NULL,
  payment_asset TEXT NOT NULL,
  sla_terms JSONB NOT NULL,
  royalty_split JSONB NOT NULL,
  authorization_type TEXT NOT NULL DEFAULT 'platform_native_agreement',
  authorized_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. ESCROW, DOUBLE-ENTRY LEDGER & ROYALTIES
CREATE TABLE IF NOT EXISTS m2m_economic_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID UNIQUE REFERENCES m2m_machines(id) ON DELETE CASCADE,
  account_label TEXT NOT NULL,
  fiat_usd_balance NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  platform_credit_balance NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  usdc_balance NUMERIC(14,4) NOT NULL DEFAULT 0.0000,
  idea_coin_balance NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  reserved_escrow_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  withdrawal_limit_usd NUMERIC(14,2) NOT NULL DEFAULT 500.00,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_payment_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID UNIQUE NOT NULL REFERENCES m2m_jobs(id) ON DELETE CASCADE,
  payer_account_id UUID NOT NULL REFERENCES m2m_economic_accounts(id),
  amount_usd NUMERIC(14,2) NOT NULL CHECK (amount_usd > 0),
  payment_asset TEXT NOT NULL,
  escrow_mechanism TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reserved' CHECK (
    status IN ('reserved', 'settled', 'refunded', 'disputed_hold')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_ledger_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_ref TEXT UNIQUE NOT NULL,
  job_id UUID REFERENCES m2m_jobs(id) ON DELETE SET NULL,
  debit_account TEXT NOT NULL,
  credit_account TEXT NOT NULL,
  entry_category TEXT NOT NULL CHECK (
    entry_category IN (
      'escrow_reservation', 'provider_settlement', 'parent_royalty',
      'idea_asset_royalty', 'platform_fee', 'operating_cost', 'refund', 'risk_reserve'
    )
  ),
  amount NUMERIC(14,4) NOT NULL CHECK (amount >= 0),
  asset_type TEXT NOT NULL,
  settlement_status TEXT NOT NULL DEFAULT 'settled',
  external_tx_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ROBOT MINER NETWORK (CONSENT-FIRST PHYSICAL DEVICES)
CREATE TABLE IF NOT EXISTS m2m_robot_devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  machine_id UUID UNIQUE NOT NULL REFERENCES m2m_machines(id) ON DELETE CASCADE,
  device_type TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  consent_granted BOOLEAN NOT NULL DEFAULT FALSE,
  location_sharing_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  authorized_sensors JSONB NOT NULL DEFAULT '[]'::jsonb,
  mining_paused BOOLEAN NOT NULL DEFAULT FALSE,
  settled_earnings_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  pending_earnings_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. SECURITY, OWNER APPROVALS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS m2m_approval_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type TEXT NOT NULL,
  machine_id UUID REFERENCES m2m_machines(id) ON DELETE SET NULL,
  summary TEXT NOT NULL,
  estimated_exposure_usd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  governance_level INTEGER NOT NULL DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  resolved_by TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS m2m_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  actor TEXT NOT NULL,
  machine_id UUID,
  job_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_m2m_machines_parent ON m2m_machines(parent_machine_id);
CREATE INDEX IF NOT EXISTS idx_m2m_jobs_status ON m2m_jobs(lifecycle_status);
CREATE INDEX IF NOT EXISTS idx_m2m_ledger_job ON m2m_ledger_entries(job_id);
CREATE INDEX IF NOT EXISTS idx_m2m_audit_created ON m2m_audit_logs(created_at DESC);
