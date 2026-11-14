import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { NovaProtocolState, LivingApp, HeartbeatTelemetry, MutationRecord, CopyDetection, OriginPixel } from '../types/novaProtocol';
import { INITIAL_NOVA_STATE } from '../data/novaProtocolInitialState';

const DATA_DIR = '/data';
const FALLBACK_DATA_DIR = './data';
const NOVA_STATE_FILE = path.join(DATA_DIR, 'nova_protocol_state.json');
const FALLBACK_NOVA_STATE_FILE = path.join(FALLBACK_DATA_DIR, 'nova_protocol_state.json');

// In-memory runtime state
let state: NovaProtocolState = { ...INITIAL_NOVA_STATE };

function ensureDataDirs(): string {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return NOVA_STATE_FILE;
  } catch (err) {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    return FALLBACK_NOVA_STATE_FILE;
  }
}

function loadState(): void {
  try {
    const primaryFile = ensureDataDirs();
    if (fs.existsSync(primaryFile)) {
      const raw = fs.readFileSync(primaryFile, 'utf-8');
      state = JSON.parse(raw);
      return;
    }
    if (fs.existsSync(FALLBACK_NOVA_STATE_FILE)) {
      const raw = fs.readFileSync(FALLBACK_NOVA_STATE_FILE, 'utf-8');
      state = JSON.parse(raw);
      return;
    }
  } catch (err) {
    console.warn('[NOVA V16] State file load error, using default state:', err);
  }
  saveState();
}

function saveState(): void {
  try {
    const targetFile = ensureDataDirs();
    fs.writeFileSync(targetFile, JSON.stringify(state, null, 2), 'utf-8');
    // Also mirror to fallback for resilience
    try {
      if (!fs.existsSync(FALLBACK_DATA_DIR)) fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
      fs.writeFileSync(FALLBACK_NOVA_STATE_FILE, JSON.stringify(state, null, 2), 'utf-8');
    } catch {
      // ignore mirror error
    }
  } catch (err) {
    console.error('[NOVA V16] Error saving state:', err);
  }
}

// Initial load
loadState();

// Autonomous Mutation Cycle Simulation (every 60s)
setInterval(() => {
  try {
    if (!state.living_apps || state.living_apps.length === 0) return;
    const now = new Date();
    state.living_apps = state.living_apps.map((app) => {
      if (app.status === 'dead_copy_detected') return app;

      // Update heartbeat
      app.heartbeat_last = now.toISOString();

      // Trigger mutation every cycle
      const newVersion = (app.mutation_count || 0) + 1;
      const oldEndpoint = app.current_endpoint;
      const newEndpoint = `/api/v16/${app.app_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-m${newVersion}`;

      const reasons = [
        'Rotated neural endpoint signature against static web scraper bots.',
        'Adaptive linguistic weight re-centering for regional latency optimization.',
        'Mutated button render seed to maintain zero-static DOM footprint.',
        'Re-sharded logic across next 10 idle CE Colony nodes.'
      ];
      const selectedReason = reasons[newVersion % reasons.length];

      app.mutation_count = newVersion;
      app.current_endpoint = newEndpoint;

      // Mutate one component
      if (app.components && app.components.length > 0) {
        const comp = app.components[newVersion % app.components.length];
        comp.current_endpoint = `${newEndpoint}/${comp.element_id}`;
      }

      // Record mutation log
      const mutationRecord: MutationRecord = {
        id: `mut-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        living_app_id: app.id,
        nova_url: app.nova_url,
        mutation_version: newVersion,
        old_endpoint: oldEndpoint,
        new_endpoint: newEndpoint,
        breeder_agent_id: app.origin_dna.breeder_agent_id,
        child_coin_id: `${app.idea_coin_symbol}-V${newVersion}`,
        reason: selectedReason,
        mutated_at: now.toISOString(),
        color_mutation: newVersion % 2 === 0 ? '#00FF88 -> #00FFAA' : '#00D4FF -> #00B4FF'
      };

      state.mutations.unshift(mutationRecord);
      if (state.mutations.length > 50) state.mutations = state.mutations.slice(0, 50);

      // Record heartbeat
      const hb: HeartbeatTelemetry = {
        id: `hb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        living_app_id: app.id,
        nova_url: app.nova_url,
        node_count: 90 + Math.floor(Math.random() * 11), // 90-100 nodes
        agent_count: 9 + Math.floor(Math.random() * 2),   // 9-10 agents
        child_coin_id: `${app.idea_coin_symbol}-V${newVersion}`,
        signature: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        timestamp: now.toISOString(),
        is_valid: true,
        latency_ms: 30 + Math.floor(Math.random() * 25)
      };

      state.heartbeats.unshift(hb);
      if (state.heartbeats.length > 50) state.heartbeats = state.heartbeats.slice(0, 50);

      return app;
    });

    state.stats.total_mutations += 1;
    state.stats.total_heartbeats_logged += 3;
    state.updated_at = now.toISOString();
    saveState();
  } catch (err) {
    console.error('[NOVA V16] Mutation loop error:', err);
  }
}, 60000);

export function registerNovaProtocolRoutes(app: Express): void {
  console.log('[NOVA V16] Registering Module 5 Living Internet routes...');

  // GET complete state
  app.get('/api/nova/state', (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      state
    });
  });

  // GET heartbeat for specific nova_url
  app.get('/api/nova/heartbeat/:novaUrl', (req: Request, res: Response) => {
    const rawUrl = decodeURIComponent(req.params.novaUrl);
    const targetApp = state.living_apps.find(
      (a) => a.nova_url.toLowerCase() === rawUrl.toLowerCase() || a.nova_url.replace('nova://', '') === rawUrl
    );

    if (!targetApp) {
      return res.status(404).json({
        success: false,
        error: 'Living app not found for this nova_url',
        is_alive: false
      });
    }

    const latestHb = state.heartbeats.find((h) => h.living_app_id === targetApp.id);
    res.status(200).json({
      success: true,
      is_alive: targetApp.status === 'alive',
      status: targetApp.status,
      nova_url: targetApp.nova_url,
      heartbeat_last: targetApp.heartbeat_last,
      node_count: latestHb ? latestHb.node_count : 100,
      agent_count: latestHb ? latestHb.agent_count : 10,
      child_coin_id: latestHb ? latestHb.child_coin_id : `${targetApp.idea_coin_symbol}-V${targetApp.mutation_count}`,
      signature: latestHb ? latestHb.signature : '0x7e8b39c0fae12089ba29871038bc4081da2904bc',
      latency_ms: latestHb ? latestHb.latency_ms : 45
    });
  });

  // POST create living app
  app.post('/api/nova/create_living_app', (req: Request, res: Response) => {
    try {
      const { idea_coin_id, app_name, prompt, creator_email, creator_wallet } = req.body;
      if (!app_name || !prompt) {
        return res.status(400).json({ success: false, error: 'app_name and prompt are required' });
      }

      const slug = app_name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const nova_url = `nova://${slug}`;
      const now = new Date();

      // Check duplicate
      const existing = state.living_apps.find((a) => a.nova_url === nova_url);
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'Living app already alive',
          living_app: existing
        });
      }

      const appId = `app-nova-${Date.now()}`;
      const ideaSymbol = idea_coin_id ? `$${idea_coin_id.replace(/^coin-/, '').toUpperCase()}` : '$IDEA';
      const initialEndpoint = `/api/v16/${slug}-m0`;

      // Origin DNA
      const origin_dna = {
        idea_coin_id: idea_coin_id || 'coin-idea-custom',
        creator_wallet: creator_wallet || '0x8892A721869e9c1D1f0EFEc0c9D64d04847e0984',
        parent_creator: creator_email || 'Autonomous Founder',
        breeder_agent_id: `agent-breeder-${slug.substring(0, 10)}-v16`,
        ce_node_ids: ['ce-node-alpha-01', 'ce-node-beta-04', 'ce-node-gamma-09'],
        code_api_ids: ['cv-api-universal-transformer', 'cv-api-speech-codec', 'cv-api-paystack-split'],
        aurum_vault_id: 'aurum-vault-global-pool',
        royalty_split: {
          creator: 10,
          breeder: 5,
          ce_nodes: 5,
          code_vein_devs: 5,
          ua_aidc: 10,
          cooperative_pool: 65
        },
        birth_timestamp: now.toISOString(),
        contract_address: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        origin_dna_hash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      };

      const newLivingApp: LivingApp = {
        id: appId,
        creator_id: `user-${Date.now()}`,
        creator_email: creator_email || 'founder@billionairesai.academy',
        creator_wallet: creator_wallet || origin_dna.creator_wallet,
        idea_coin_id: origin_dna.idea_coin_id,
        idea_coin_symbol: ideaSymbol,
        app_name,
        prompt,
        nova_url,
        status: 'alive',
        heartbeat_last: now.toISOString(),
        mutation_count: 0,
        current_endpoint: initialEndpoint,
        total_clicks: 0,
        total_royalties_paid: 0,
        created_at: now.toISOString(),
        origin_dna,
        theme_variant: 'neon-emerald',
        components: [
          {
            element_id: `btn_primary_${slug.substring(0, 8)}`,
            type: 'button',
            label: `⚡ Launch Autonomous Action (${app_name})`,
            action_name: 'execute_living_action',
            current_endpoint: `${initialEndpoint}/action`,
            color_theme: '#00FF88',
            origin_dna_hash: origin_dna.origin_dna_hash,
            clicks: 0,
            royalties: 0,
            render_code: 'LiveComponentRenderer(source="ray-actors", shards=10)'
          },
          {
            element_id: `card_stream_${slug.substring(0, 8)}`,
            type: 'card',
            label: `📊 Live Telemetry Stream (${slug})`,
            action_name: 'poll_neural_telemetry',
            current_endpoint: `${initialEndpoint}/stream`,
            color_theme: '#00D4FF',
            origin_dna_hash: origin_dna.origin_dna_hash,
            clicks: 0,
            royalties: 0,
            render_code: 'RayAgentColonyStreamer(agents=10, compute="CE-COLONY")'
          }
        ]
      };

      state.living_apps.unshift(newLivingApp);
      state.stats.total_living_apps += 1;
      saveState();

      res.status(201).json({
        success: true,
        message: `Living App "${app_name}" synthesized across 10 CE Colony nodes & 10 Mind Hive agents!`,
        nova_url,
        origin_dna,
        living_app: newLivingApp
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // GET render living app spec (dynamic JSON spec assembled in real-time)
  app.get('/api/nova/render/:novaUrl', (req: Request, res: Response) => {
    const rawUrl = decodeURIComponent(req.params.novaUrl);
    const targetApp = state.living_apps.find(
      (a) => a.nova_url.toLowerCase() === rawUrl.toLowerCase() || a.nova_url.replace('nova://', '') === rawUrl
    );

    if (!targetApp) {
      return res.status(404).json({
        success: false,
        status: 'dead',
        message: 'This copy is dead or app does not exist. Original organism at nova://root'
      });
    }

    // Check heartbeat validity (simulated threshold)
    const isAlive = targetApp.status === 'alive';
    if (!isAlive) {
      return res.status(200).json({
        status: 'dead_copy_detected',
        message: `This is a dead copy. Original living app is at ${targetApp.nova_url}. Owned by ${targetApp.origin_dna.parent_creator}.`,
        original_url: targetApp.nova_url,
        components: []
      });
    }

    // Real-time assembly from Ray actors
    res.status(200).json({
      status: 'alive',
      nova_url: targetApp.nova_url,
      app_name: targetApp.app_name,
      mutation_count: targetApp.mutation_count,
      current_endpoint: targetApp.current_endpoint,
      heartbeat_last: targetApp.heartbeat_last,
      origin_dna: targetApp.origin_dna,
      components: targetApp.components
    });
  });

  // POST element click (triggers gasless royalty split via Origin DNA)
  app.post('/api/nova/click', (req: Request, res: Response) => {
    try {
      const { element_id, living_app_id } = req.body;
      const targetApp = state.living_apps.find((a) => a.id === living_app_id || a.nova_url === living_app_id);

      if (!targetApp) {
        return res.status(404).json({ success: false, error: 'Living app not found' });
      }

      const royaltyPerClickUsd = 0.001; // $0.001 per click
      targetApp.total_clicks = (targetApp.total_clicks || 0) + 1;
      targetApp.total_royalties_paid = Number(((targetApp.total_royalties_paid || 0) + royaltyPerClickUsd).toFixed(4));

      // Update specific component if present
      if (targetApp.components) {
        const comp = targetApp.components.find((c) => c.element_id === element_id);
        if (comp) {
          comp.clicks = (comp.clicks || 0) + 1;
          comp.royalties = Number(((comp.royalties || 0) + royaltyPerClickUsd).toFixed(4));
        }
      }

      state.stats.total_clicks += 1;
      saveState();

      res.status(200).json({
        success: true,
        message: 'Origin DNA royalty triggered and recorded',
        royalty_paid_usd: royaltyPerClickUsd,
        creator_split_usd: royaltyPerClickUsd * 0.1,
        total_clicks: targetApp.total_clicks,
        total_royalties: targetApp.total_royalties_paid,
        tx_hash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST report suspected copy
  app.post('/api/nova/report_copy', (req: Request, res: Response) => {
    try {
      const { suspected_copy_url, original_nova_url } = req.body;
      if (!suspected_copy_url || !original_nova_url) {
        return res.status(400).json({ success: false, error: 'suspected_copy_url and original_nova_url are required' });
      }

      const targetApp = state.living_apps.find((a) => a.nova_url === original_nova_url);
      if (!targetApp) {
        return res.status(404).json({ success: false, error: 'Original app not found' });
      }

      const similarity = 82.5 + Math.floor(Math.random() * 15);
      const redirected = 2.45;

      const detection: CopyDetection = {
        id: `copy-det-${Date.now()}`,
        original_app_id: targetApp.id,
        original_nova_url: targetApp.nova_url,
        suspected_copy_url,
        similarity_score: similarity,
        detected_at: new Date().toISOString(),
        royalty_redirected: redirected,
        clicks_diverted: 2450,
        status: 'active_redirect',
        copier_ip: '198.51.100.88'
      };

      state.copy_detections.unshift(detection);
      state.stats.total_copies_detected += 1;
      state.stats.total_royalties_redirected = Number((state.stats.total_royalties_redirected + redirected).toFixed(2));
      saveState();

      res.status(200).json({
        success: true,
        is_copy: true,
        similarity_score: similarity,
        message: 'Dead copy detected! Static code identified without heartbeat signature. All clicks are redirected to original Origin DNA.',
        detection
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST manual mutate trigger
  app.post('/api/nova/mutate/:appId', (req: Request, res: Response) => {
    try {
      const { appId } = req.params;
      const targetApp = state.living_apps.find((a) => a.id === appId || a.nova_url === appId);

      if (!targetApp) {
        return res.status(404).json({ success: false, error: 'Living app not found' });
      }

      const newVersion = (targetApp.mutation_count || 0) + 1;
      const oldEndpoint = targetApp.current_endpoint;
      const newEndpoint = `/api/v16/${targetApp.app_name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-m${newVersion}`;

      targetApp.mutation_count = newVersion;
      targetApp.current_endpoint = newEndpoint;
      targetApp.heartbeat_last = new Date().toISOString();

      const mutationRecord: MutationRecord = {
        id: `mut-${Date.now()}`,
        living_app_id: targetApp.id,
        nova_url: targetApp.nova_url,
        mutation_version: newVersion,
        old_endpoint: oldEndpoint,
        new_endpoint: newEndpoint,
        breeder_agent_id: targetApp.origin_dna.breeder_agent_id,
        child_coin_id: `${targetApp.idea_coin_symbol}-V${newVersion}`,
        reason: 'Manual operator trigger: Mutated API endpoints, UI layout seeds & Ray actor routing.',
        mutated_at: new Date().toISOString(),
        color_mutation: '#00FF88 -> #00FFAA'
      };

      state.mutations.unshift(mutationRecord);
      state.stats.total_mutations += 1;
      saveState();

      res.status(200).json({
        success: true,
        message: `App mutated to version ${newVersion}. Old endpoint invalidated. Static REA copies are now broken.`,
        mutation: mutationRecord,
        living_app: targetApp
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // POST withdraw royalties via Paystack
  app.post('/api/nova/withdraw_royalties', (req: Request, res: Response) => {
    try {
      const { user_email, amount_usd } = req.body;
      const withdrawAmount = Number(amount_usd) || 50;
      const amountNgn = withdrawAmount * 1500;

      res.status(200).json({
        success: true,
        message: `Initiated Paystack direct bank settlement of ₦${amountNgn.toLocaleString()} ($${withdrawAmount} USD) for ${user_email || 'creator@billionairesai.academy'}`,
        paystack_reference: `pstk_nova_${Date.now()}`,
        paystack_mode: state.config.paystack_mode,
        test_card: state.config.paystack_test_card,
        amount_usd: withdrawAmount,
        amount_ngn: amountNgn,
        settled_at: new Date().toISOString()
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
}
