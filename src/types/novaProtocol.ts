/**
 * BAA UA-AIDC MODULE 5 — NOVA PROTOCOL V16
 * THE LIVING INTERNET — AUTONOMOUS ORGANISM ARCHITECTURE
 * Sits on top of Modules 1-4:
 *   Module 1 CE COLONY: Compute + Data + Human Proof
 *   Module 2 CODE VEIN: Micro-APIs + Models
 *   Module 3 AURUM COLONY: Liquidity + Yield
 *   Module 4 MIND HIVE: Idea-Coins + AI Agents
 *   Module 5 NOVA: Soul (Living Uncopyable Apps)
 */

export type LivingAppStatus = 'alive' | 'mutated' | 'dead_copy_detected';

export interface RoyaltySplit {
  creator: number;       // default 10%
  breeder: number;       // default 5%
  ce_nodes: number;      // default 5%
  code_vein_devs: number;// default 5%
  ua_aidc: number;       // default 10%
  cooperative_pool?: number; // 65% community pool / direct value
}

export interface OriginDNA {
  idea_coin_id: string;
  creator_wallet: string;
  parent_creator: string;
  breeder_agent_id: string;
  ce_node_ids: string[];
  code_api_ids: string[];
  aurum_vault_id: string;
  royalty_split: RoyaltySplit;
  birth_timestamp: string;
  contract_address?: string;
  origin_dna_hash?: string;
}

export interface OriginPixel {
  id: string;
  living_app_id: string;
  element_id: string;
  element_type: 'button' | 'input' | 'card' | 'function' | 'badge' | 'stream';
  origin_dna: OriginDNA;
  clicks: number;
  royalties_generated: number;
  created_at: string;
}

export interface LivingAppComponent {
  element_id: string;
  type: string;
  label: string;
  action_name: string;
  current_endpoint: string;
  color_theme: string;
  origin_dna_hash: string;
  clicks: number;
  royalties: number;
  render_code: string;
}

export interface LivingApp {
  id: string;
  creator_id: string;
  creator_email: string;
  creator_wallet: string;
  idea_coin_id: string;
  idea_coin_symbol: string;
  app_name: string;
  prompt: string;
  nova_url: string; // e.g. nova://yoruba-route
  status: LivingAppStatus;
  heartbeat_last: string;
  mutation_count: number;
  current_endpoint: string;
  total_clicks: number;
  total_royalties_paid: number;
  created_at: string;
  origin_dna: OriginDNA;
  components: LivingAppComponent[];
  theme_variant: string;
}

export interface HeartbeatTelemetry {
  id: string;
  living_app_id: string;
  nova_url: string;
  node_count: number; // e.g. 100 random CE Colony nodes (threshold >= 80)
  agent_count: number; // e.g. 10 Mind Hive agents (threshold >= 8)
  child_coin_id: string; // latest child coin minted in last 10s
  signature: string;
  timestamp: string;
  is_valid: boolean;
  latency_ms: number;
}

export interface MutationRecord {
  id: string;
  living_app_id: string;
  nova_url: string;
  mutation_version: number;
  old_endpoint: string;
  new_endpoint: string;
  breeder_agent_id: string;
  child_coin_id: string;
  reason: string;
  mutated_at: string;
  color_mutation: string;
}

export interface CopyDetection {
  id: string;
  original_app_id: string;
  original_nova_url: string;
  suspected_copy_url: string;
  similarity_score: number; // 0-100%
  detected_at: string;
  royalty_redirected: number;
  clicks_diverted: number;
  status: 'active_redirect' | 'provenance_badged' | 'mitigated';
  copier_ip?: string;
}

export interface NovaProtocolState {
  version: string;
  tagline: string;
  mission: string;
  updated_at: string;
  stats: {
    total_living_apps: number;
    active_living_nodes: number;
    active_agents: number;
    total_mutations: number;
    total_heartbeats_logged: number;
    total_copies_detected: number;
    total_royalties_redirected: number;
    total_clicks: number;
  };
  living_apps: LivingApp[];
  heartbeats: HeartbeatTelemetry[];
  mutations: MutationRecord[];
  copy_detections: CopyDetection[];
  origin_pixels: OriginPixel[];
  config: {
    data_dir: string;
    paystack_mode: 'TEST' | 'LIVE';
    paystack_test_card: string;
    alchemy_aa_network: string;
    heartbeat_interval_ms: number;
    mutation_interval_s: number;
    admin_login: string;
  };
}
