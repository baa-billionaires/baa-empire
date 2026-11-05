import React, { useState } from 'react';
import { X, FileCode, Copy, CheckCircle2, Download } from 'lucide-react';

interface GenesisSqlSchemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenesisSqlSchemaModal: React.FC<GenesisSqlSchemaModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const schemaSnippet = `-- BAA UNIVERSAL AUTONOMOUS AI DATA CENTER (UA-AIDC)
-- MODULE 4: MIND HIVE V17 — GENESIS CIVILIZATION EXPANSION SCHEMA
-- Tables: venture_genomes, venture_blueprints, venture_components,
-- venture_dependencies, venture_experiments, venture_simulations,
-- venture_validation, customer_evidence, invention_tournaments,
-- tournament_candidates, colony_fusion_proposals, fusion_contributors,
-- venture_resurrection_reviews, opportunity_gravity_nodes,
-- opportunity_gravity_edges, venture_evolution_logs,
-- venture_performance, venture_approval_requests, venture_licensing_records.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Full schema with indexes, foreign keys & RLS is maintained in /src/db/genesis_schema.sql`;

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">PostgreSQL / Supabase Schema DDL</h3>
              <p className="text-xs text-slate-400">19 tables supporting Genesis Engine, tournaments, and fusion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-4 flex-1 overflow-y-auto">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {schemaSnippet}
          </pre>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">Source: src/db/genesis_schema.sql</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard' : 'Copy SQL Schema'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
