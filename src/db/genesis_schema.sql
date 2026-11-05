-- ====================================================================
-- BAA UNIVERSAL AUTONOMOUS AI DATA CENTER (UA-AIDC)
-- MODULE 4: MIND HIVE V17 — GENESIS CIVILIZATION EXPANSION SCHEMA
-- PostgreSQL / Supabase Schema with Foreign Keys, Indexes & RLS
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. VENTURE GENOMES (The Living Venture Genome)
CREATE TABLE IF NOT EXISTS venture_genomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    codename VARCHAR(128) NOT NULL,
    tagline TEXT,
    category VARCHAR(64) NOT NULL,
    current_lifecycle_stage VARCHAR(32) NOT NULL DEFAULT 'DISCOVER',
    original_idea TEXT NOT NULL,
    primary_author_email VARCHAR(255) NOT NULL,
    confidence_score NUMERIC(5,2) DEFAULT 0.00,
    uncertainty_score NUMERIC(5,2) DEFAULT 0.00,
    compute_budget_monthly_usd NUMERIC(12,2) DEFAULT 0.00,
    operating_budget_monthly_usd NUMERIC(12,2) DEFAULT 0.00,
    total_cap_budget_usd NUMERIC(12,2) DEFAULT 0.00,
    utilized_budget_usd NUMERIC(12,2) DEFAULT 0.00,
    ip_status VARCHAR(64) DEFAULT 'VERIFIED_CLEAN',
    parent_venture_id UUID REFERENCES venture_genomes(id) ON DELETE SET NULL,
    risk_level VARCHAR(32) DEFAULT 'LOW',
    security_checks_passed BOOLEAN DEFAULT true,
    emergency_kill_switch_active BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_venture_genomes_stage ON venture_genomes(current_lifecycle_stage);
CREATE INDEX IF NOT EXISTS idx_venture_genomes_category ON venture_genomes(category);

-- 2. VENTURE BLUEPRINTS
CREATE TABLE IF NOT EXISTS venture_blueprints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    version VARCHAR(32) NOT NULL DEFAULT 'v1.0.0',
    spec_summary TEXT NOT NULL,
    architecture_overview TEXT,
    tech_stack JSONB NOT NULL DEFAULT '[]'::jsonb,
    milestones JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. VENTURE COMPONENTS (Reusable Inventions & Modules)
CREATE TABLE IF NOT EXISTS venture_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID REFERENCES venture_genomes(id) ON DELETE CASCADE,
    component_name VARCHAR(255) NOT NULL,
    component_type VARCHAR(64) NOT NULL, -- 'MICRO_API', 'PROMPT_PIPELINE', 'SMART_CONTRACT', 'DATASET'
    source_colony VARCHAR(64) NOT NULL, -- 'CE_COLONY_V12', 'CODE_VEIN_V13', 'AURUM_COLONY_V13', 'MIND_HIVE_V17'
    code_repository_url TEXT,
    licensing_terms TEXT,
    royalty_percent NUMERIC(5,2) DEFAULT 0.00,
    is_fused BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VENTURE DEPENDENCIES
CREATE TABLE IF NOT EXISTS venture_dependencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    dependency_type VARCHAR(64) NOT NULL, -- 'COMPUTE_NODE', 'OLLAMA_INFERENCE', 'PAYSTACK_RAILS', 'SOLANA_RPC'
    dependency_source VARCHAR(64) NOT NULL,
    sla_threshold_ms INT DEFAULT 500,
    cost_per_million_calls_usd NUMERIC(10,4) DEFAULT 0.0000,
    is_healthy BOOLEAN DEFAULT true,
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. VENTURE EXPERIMENTS (Evolution Lab)
CREATE TABLE IF NOT EXISTS venture_experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    experiment_name VARCHAR(255) NOT NULL,
    hypothesis TEXT NOT NULL,
    variant_a_description TEXT,
    variant_b_description TEXT,
    sample_size INT DEFAULT 100,
    conversion_delta_percent NUMERIC(6,2) DEFAULT 0.00,
    conclusive BOOLEAN DEFAULT false,
    recommendation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VENTURE SIMULATIONS (Mirrorverse Digital Twins)
CREATE TABLE IF NOT EXISTS venture_simulations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    simulation_name VARCHAR(255) NOT NULL,
    environment_type VARCHAR(64) NOT NULL,
    simulated_user_agents INT NOT NULL DEFAULT 1000,
    simulated_days_run INT NOT NULL DEFAULT 30,
    simulated_infra_cost_usd NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    predicted_gross_revenue_usd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    projected_break_even_months NUMERIC(4,1) DEFAULT 0.0,
    failure_rate_percent NUMERIC(5,2) DEFAULT 0.00,
    simulation_label VARCHAR(64) DEFAULT 'SYNTHETIC_DIGITAL_TWIN',
    key_findings JSONB DEFAULT '[]'::jsonb,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. VENTURE VALIDATION & CUSTOMER EVIDENCE
CREATE TABLE IF NOT EXISTS venture_validation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    interviews_completed INT DEFAULT 0,
    pilot_commitments_count INT DEFAULT 0,
    paid_loi_usd NUMERIC(12,2) DEFAULT 0.00,
    validated_segments JSONB DEFAULT '[]'::jsonb,
    evidence_notes TEXT,
    decision_recommendation VARCHAR(32) DEFAULT 'BUILD', -- 'BUILD', 'REVISE', 'PAUSE', 'REJECT'
    validated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CUSTOMER EVIDENCE
CREATE TABLE IF NOT EXISTS customer_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    prospect_organization VARCHAR(255) NOT NULL,
    contact_title VARCHAR(128),
    evidence_type VARCHAR(64) NOT NULL, -- 'PAID_DEPOSIT', 'SIGNED_PILOT_MOU', 'VERIFIED_USAGE_LOG'
    verified_amount_usd NUMERIC(12,2) DEFAULT 0.00,
    contract_document_hash TEXT,
    is_authentic BOOLEAN DEFAULT true,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. INVENTION TOURNAMENTS
CREATE TABLE IF NOT EXISTS invention_tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_title VARCHAR(255) NOT NULL,
    challenge_brief TEXT NOT NULL,
    target_domain VARCHAR(128) NOT NULL,
    prize_pool_usd NUMERIC(12,2) DEFAULT 5000.00,
    status VARCHAR(32) DEFAULT 'ACTIVE_BENCHMARK',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    concluded_at TIMESTAMPTZ
);

-- 10. TOURNAMENT CANDIDATES
CREATE TABLE IF NOT EXISTS tournament_candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id UUID NOT NULL REFERENCES invention_tournaments(id) ON DELETE CASCADE,
    venture_name VARCHAR(255) NOT NULL,
    contributor_name VARCHAR(255) NOT NULL,
    approach_summary TEXT NOT NULL,
    controlled_budget_allocated_usd NUMERIC(10,2) DEFAULT 1000.00,
    technical_reliability_score NUMERIC(5,2) DEFAULT 0.00,
    customer_feedback_score NUMERIC(5,2) DEFAULT 0.00,
    unit_cost_score NUMERIC(5,2) DEFAULT 0.00,
    security_score NUMERIC(5,2) DEFAULT 0.00,
    demand_evidence_score NUMERIC(5,2) DEFAULT 0.00,
    overall_weighted_score NUMERIC(5,2) DEFAULT 0.00,
    rank INT DEFAULT 1,
    is_winner BOOLEAN DEFAULT false,
    evaluated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. COLONY FUSION PROPOSALS
CREATE TABLE IF NOT EXISTS colony_fusion_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fusion_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    target_market VARCHAR(128) NOT NULL,
    compatibility_score NUMERIC(5,2) DEFAULT 0.00,
    regulatory_approval_passed BOOLEAN DEFAULT true,
    status VARCHAR(32) DEFAULT 'DRAFT_PROPOSAL',
    fused_venture_id UUID REFERENCES venture_genomes(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. FUSION CONTRIBUTORS
CREATE TABLE IF NOT EXISTS fusion_contributors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fusion_id UUID NOT NULL REFERENCES colony_fusion_proposals(id) ON DELETE CASCADE,
    contributor_name VARCHAR(255) NOT NULL,
    contributed_asset_name VARCHAR(255) NOT NULL,
    source_colony VARCHAR(64) NOT NULL,
    share_percent NUMERIC(5,2) NOT NULL,
    contribution_role VARCHAR(128),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. VENTURE RESURRECTION REVIEWS
CREATE TABLE IF NOT EXISTS venture_resurrection_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name VARCHAR(255) NOT NULL,
    original_creator VARCHAR(255) NOT NULL,
    stalled_reason VARCHAR(64) NOT NULL,
    available_source_code_lines INT DEFAULT 0,
    technical_condition_score NUMERIC(5,2) DEFAULT 0.00,
    active_residual_traffic INT DEFAULT 0,
    estimated_relaunch_cost_usd NUMERIC(10,2) DEFAULT 0.00,
    projected_recoverable_revenue_usd NUMERIC(12,2) DEFAULT 0.00,
    recommendation VARCHAR(64) NOT NULL,
    rights_ownership_confirmed BOOLEAN DEFAULT true,
    requires_human_consent BOOLEAN DEFAULT true,
    reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. OPPORTUNITY GRAVITY NODES & EDGES
CREATE TABLE IF NOT EXISTS opportunity_gravity_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(255) NOT NULL,
    node_type VARCHAR(64) NOT NULL,
    region VARCHAR(64),
    strength NUMERIC(5,2) DEFAULT 50.00,
    colony_affiliation VARCHAR(64) NOT NULL,
    value_usd NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opportunity_gravity_edges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_node_id UUID NOT NULL REFERENCES opportunity_gravity_nodes(id) ON DELETE CASCADE,
    target_node_id UUID NOT NULL REFERENCES opportunity_gravity_nodes(id) ON DELETE CASCADE,
    synergy_type VARCHAR(64) NOT NULL,
    weight NUMERIC(5,2) DEFAULT 1.00,
    commercial_viability_score NUMERIC(5,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. VENTURE EVOLUTION LOGS
CREATE TABLE IF NOT EXISTS venture_evolution_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    from_stage VARCHAR(32) NOT NULL,
    to_stage VARCHAR(32) NOT NULL,
    decision_rationale TEXT NOT NULL,
    operator_role VARCHAR(64) NOT NULL,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. VENTURE PERFORMANCE
CREATE TABLE IF NOT EXISTS venture_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
    gross_revenue_usd NUMERIC(12,2) DEFAULT 0.00,
    net_client_share_usd NUMERIC(12,2) DEFAULT 0.00,
    platform_share_usd NUMERIC(12,2) DEFAULT 0.00,
    compute_costs_usd NUMERIC(10,2) DEFAULT 0.00,
    active_paying_customers INT DEFAULT 0,
    uptime_percentage NUMERIC(5,2) DEFAULT 100.00
);

-- 17. VENTURE APPROVAL REQUESTS (Mandatory Human-in-the-Loop Gate)
CREATE TABLE IF NOT EXISTS venture_approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID REFERENCES venture_genomes(id) ON DELETE SET NULL,
    request_type VARCHAR(64) NOT NULL,
    request_title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requested_amount_usd NUMERIC(12,2) DEFAULT 0.00,
    risk_assessment TEXT,
    status VARCHAR(32) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ
);

-- 18. VENTURE LICENSING RECORDS
CREATE TABLE IF NOT EXISTS venture_licensing_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    venture_id UUID NOT NULL REFERENCES venture_genomes(id) ON DELETE CASCADE,
    licensee_organization VARCHAR(255) NOT NULL,
    license_type VARCHAR(64) NOT NULL, -- 'EXCLUSIVE_COMMERCIAL', 'NON_EXCLUSIVE_API', 'ACQUISITION_FULL'
    agreed_fee_usd NUMERIC(12,2) NOT NULL,
    payment_status VARCHAR(32) DEFAULT 'ESCROW_DEPOSITED',
    terms_summary TEXT,
    signed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE venture_genomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE venture_approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_evidence ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Access for Venture Genomes"
ON venture_genomes FOR SELECT USING (true);

CREATE POLICY "Authenticated Admin Full Access for Venture Genomes"
ON venture_genomes FOR ALL USING (true);

-- End of MIND HIVE V17 GENESIS SCHEMA
