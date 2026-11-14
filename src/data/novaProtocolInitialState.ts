import { NovaProtocolState, LivingApp } from '../types/novaProtocol';

export const INITIAL_NOVA_STATE: NovaProtocolState = {
  version: '16.0-LIVING-INTERNET',
  tagline: 'REA CAN COPY YOUR CODE. IT CANNOT COPY YOUR ORGANISM.',
  mission: 'Beat Reverse Engineering Anything (REA). REA copies static code. NOVA builds LIVING APPS with heartbeat proof-of-life from 10,000 human nodes, Origin DNA royalties on every pixel, and 60-second autonomous self-mutation.',
  updated_at: new Date().toISOString(),
  stats: {
    total_living_apps: 3,
    active_living_nodes: 10420,
    active_agents: 180,
    total_mutations: 432,
    total_heartbeats_logged: 1892040,
    total_copies_detected: 28,
    total_royalties_redirected: 148.65,
    total_clicks: 148650
  },
  config: {
    data_dir: '/data',
    paystack_mode: 'TEST',
    paystack_test_card: '4084084084084081',
    alchemy_aa_network: 'Base L2 (Foundry Account Abstraction)',
    heartbeat_interval_ms: 500,
    mutation_interval_s: 60,
    admin_login: 'cashscanai@gmail.com'
  },
  living_apps: [
    {
      id: 'app-nova-01',
      creator_id: 'user-adebayo-001',
      creator_email: 'adebayo.dev@billionairesai.academy',
      creator_wallet: '0x8892A721869e9c1D1f0EFEc0c9D64d04847e0984',
      idea_coin_id: 'coin-yroute-001',
      idea_coin_symbol: '$YROUTE',
      app_name: 'Okada WhatsApp Yoruba Voice Router',
      prompt: 'Build WhatsApp for Okada motorcycle commercial riders with Yoruba voice routes, offline speech sharding, and real-time fare settlements.',
      nova_url: 'nova://yoruba-route',
      status: 'alive',
      heartbeat_last: new Date().toISOString(),
      mutation_count: 14,
      current_endpoint: '/api/v16/route-m14-yoruba-fused',
      total_clicks: 84200,
      total_royalties_paid: 84.20,
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      origin_dna: {
        idea_coin_id: 'coin-yroute-001',
        creator_wallet: '0x8892A721869e9c1D1f0EFEc0c9D64d04847e0984',
        parent_creator: 'Adebayo Ogunlesi & Lagos AI Guild',
        breeder_agent_id: 'agent-breeder-yoruba-v16',
        ce_node_ids: ['ce-node-ikeja-01', 'ce-node-yaba-04', 'ce-node-ibadan-09', 'ce-node-surulere-12'],
        code_api_ids: ['cv-api-whisper-yoruba', 'cv-api-here-routing-lagos', 'cv-api-paystack-split'],
        aurum_vault_id: 'aurum-vault-dust-lagos',
        royalty_split: {
          creator: 10,
          breeder: 5,
          ce_nodes: 5,
          code_vein_devs: 5,
          ua_aidc: 10,
          cooperative_pool: 65
        },
        birth_timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        contract_address: '0x4D696E64486976654E4F564131364F726967696E',
        origin_dna_hash: '0x7e8b39c0fae12089ba29871038bc4081da2904bc'
      },
      theme_variant: 'neon-emerald',
      components: [
        {
          element_id: 'btn_voice_dispatch',
          type: 'button',
          label: '🎙️ Gbo Ohun / Yoruba Voice Dispatch',
          action_name: 'dispatch_yoruba_audio_stream',
          current_endpoint: '/api/v16/route-m14-yoruba-fused/dispatch',
          color_theme: '#00FF88',
          origin_dna_hash: '0x7e8b39c0fae12089ba29871038bc4081da2904bc',
          clicks: 34100,
          royalties: 34.10,
          render_code: 'VoiceStreamAudioPulseRenderer(codec="yoruba-neural-q4", latency="120ms")'
        },
        {
          element_id: 'card_okada_radar',
          type: 'card',
          label: '🗺️ Live Toll & Traffic Radar (Oshodi-Ikeja)',
          action_name: 'stream_traffic_tiles',
          current_endpoint: '/api/v16/route-m14-yoruba-fused/radar',
          color_theme: '#00D4FF',
          origin_dna_hash: '0x7e8b39c0fae12089ba29871038bc4081da2904bc',
          clicks: 29800,
          royalties: 29.80,
          render_code: 'DynamicVectorGridSharder(nodes=100, shards=10)'
        },
        {
          element_id: 'btn_instant_pay_split',
          type: 'button',
          label: '⚡ San Owo / Instant 70% Rider Payout',
          action_name: 'execute_paystack_micro_split',
          current_endpoint: '/api/v16/route-m14-yoruba-fused/pay',
          color_theme: '#FFD700',
          origin_dna_hash: '0x7e8b39c0fae12089ba29871038bc4081da2904bc',
          clicks: 20300,
          royalties: 20.30,
          render_code: 'PaystackZeroGasAARelay(contract="OriginDNA.sol", split="70/30")'
        }
      ]
    },
    {
      id: 'app-nova-02',
      creator_id: 'user-chioma-004',
      creator_email: 'chioma.agro@billionairesai.academy',
      creator_wallet: '0x27C14f3bA08126759E081e28b1239c5B3900Ac99',
      idea_coin_id: 'coin-cassava-002',
      idea_coin_symbol: '$CASSAVA',
      app_name: 'Cassava Blight Optical Classifier & Mobile Shard',
      prompt: 'Living mobile edge camera scanner that mutates neural weights every 60s against cassava leaf mosaic disease in Enugu and Anambra.',
      nova_url: 'nova://cassava-pulse',
      status: 'alive',
      heartbeat_last: new Date().toISOString(),
      mutation_count: 22,
      current_endpoint: '/api/v16/cassava-m22-spectral-morph',
      total_clicks: 41200,
      total_royalties_paid: 41.20,
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      origin_dna: {
        idea_coin_id: 'coin-cassava-002',
        creator_wallet: '0x27C14f3bA08126759E081e28b1239c5B3900Ac99',
        parent_creator: 'Dr. Chioma Eze & Eastern Agritech Guild',
        breeder_agent_id: 'agent-breeder-agro-v16',
        ce_node_ids: ['ce-node-enugu-01', 'ce-node-awka-03', 'ce-node-nsukka-07'],
        code_api_ids: ['cv-api-yolo11-leaf-edge', 'cv-api-weather-microclimate'],
        aurum_vault_id: 'aurum-vault-agro-yield',
        royalty_split: {
          creator: 10,
          breeder: 5,
          ce_nodes: 5,
          code_vein_devs: 5,
          ua_aidc: 10,
          cooperative_pool: 65
        },
        birth_timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        contract_address: '0x4D696E64486976654E4F564131364167726F4E46',
        origin_dna_hash: '0x3310f84bb0021cfa889201baac092810a90b41aa'
      },
      theme_variant: 'neon-cyan',
      components: [
        {
          element_id: 'scanner_lens_camera',
          type: 'input',
          label: '📷 Living Optical Shard (Multi-spectral leaf view)',
          action_name: 'process_leaf_spectral_tensor',
          current_endpoint: '/api/v16/cassava-m22-spectral-morph/scan',
          color_theme: '#00D4FF',
          origin_dna_hash: '0x3310f84bb0021cfa889201baac092810a90b41aa',
          clicks: 25400,
          royalties: 25.40,
          render_code: 'LiveOpticalNeuralSharder(weights="q4-mutating")'
        },
        {
          element_id: 'treatment_recommender',
          type: 'card',
          label: '🌿 Organic Bio-fungicide Dosage & Treatment Engine',
          action_name: 'get_localized_agro_prescription',
          current_endpoint: '/api/v16/cassava-m22-spectral-morph/prescribe',
          color_theme: '#00FF88',
          origin_dna_hash: '0x3310f84bb0021cfa889201baac092810a90b41aa',
          clicks: 15800,
          royalties: 15.80,
          render_code: 'DecentralizedPrescriptionLedger(sync="udwn-p2p")'
        }
      ]
    },
    {
      id: 'app-nova-03',
      creator_id: 'user-kwame-009',
      creator_email: 'kwame.accra@billionairesai.academy',
      creator_wallet: '0x992B10ac4819E02Bcda081baac77610480a12903',
      idea_coin_id: 'coin-ghana-solar',
      idea_coin_symbol: '$SOLARKW',
      app_name: 'Accra Peer-to-Peer Microgrid Power Swapper',
      prompt: 'Living smart inverter P2P energy exchange matching residential rooftop solar batteries across Greater Accra with automatic mobile money cedi settlement.',
      nova_url: 'nova://accra-solar-swap',
      status: 'alive',
      heartbeat_last: new Date().toISOString(),
      mutation_count: 8,
      current_endpoint: '/api/v16/accra-solar-m8-dynamic-watt',
      total_clicks: 23250,
      total_royalties_paid: 23.25,
      created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
      origin_dna: {
        idea_coin_id: 'coin-ghana-solar',
        creator_wallet: '0x992B10ac4819E02Bcda081baac77610480a12903',
        parent_creator: 'Kwame Mensah & Accra Energy Lab',
        breeder_agent_id: 'agent-breeder-energy-v16',
        ce_node_ids: ['ce-node-accra-central', 'ce-node-tema-02', 'ce-node-osu-05'],
        code_api_ids: ['cv-api-modbus-inverter', 'cv-api-momo-cedi-gateway'],
        aurum_vault_id: 'aurum-vault-solar-credits',
        royalty_split: {
          creator: 10,
          breeder: 5,
          ce_nodes: 5,
          code_vein_devs: 5,
          ua_aidc: 10,
          cooperative_pool: 65
        },
        birth_timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
        contract_address: '0x4D696E64486976654E4F56413136536F6C6172',
        origin_dna_hash: '0x1290baac481023ba7700192eab0912cb8491bb02'
      },
      theme_variant: 'neon-amber',
      components: [
        {
          element_id: 'btn_p2p_trade_kwh',
          type: 'button',
          label: '☀️ Trade 5.2 kWh Surplus @ ₦1,250 / Cedi Match',
          action_name: 'execute_p2p_inverter_dispatch',
          current_endpoint: '/api/v16/accra-solar-m8-dynamic-watt/swap',
          color_theme: '#FFD700',
          origin_dna_hash: '0x1290baac481023ba7700192eab0912cb8491bb02',
          clicks: 14200,
          royalties: 14.20,
          render_code: 'P2PEnergyMatchingEngine(latency="45ms", chain="Base-L2")'
        },
        {
          element_id: 'battery_telemetry_hud',
          type: 'card',
          label: '🔋 Living Battery Health & State-of-Charge (LiFePO4)',
          action_name: 'poll_bms_telemetry',
          current_endpoint: '/api/v16/accra-solar-m8-dynamic-watt/bms',
          color_theme: '#00FF88',
          origin_dna_hash: '0x1290baac481023ba7700192eab0912cb8491bb02',
          clicks: 9050,
          royalties: 9.05,
          render_code: 'TelemetryP2PMeshSocket(nodes=100)'
        }
      ]
    }
  ],
  heartbeats: [
    {
      id: 'hb-001',
      living_app_id: 'app-nova-01',
      nova_url: 'nova://yoruba-route',
      node_count: 100,
      agent_count: 10,
      child_coin_id: '$YROUTE-V14',
      signature: '0x9924baac881023bc800192fa901baac31d900481023ba7700192eab0912cb849',
      timestamp: new Date().toISOString(),
      is_valid: true,
      latency_ms: 42
    },
    {
      id: 'hb-002',
      living_app_id: 'app-nova-02',
      nova_url: 'nova://cassava-pulse',
      node_count: 98,
      agent_count: 10,
      child_coin_id: '$CASSAVA-V22',
      signature: '0x1023ba7700192eab0912cb8491bb028892A721869e9c1D1f0EFEc0c9D64d0484',
      timestamp: new Date().toISOString(),
      is_valid: true,
      latency_ms: 38
    },
    {
      id: 'hb-003',
      living_app_id: 'app-nova-03',
      nova_url: 'nova://accra-solar-swap',
      node_count: 95,
      agent_count: 9,
      child_coin_id: '$SOLARKW-V8',
      signature: '0x7e8b39c0fae12089ba29871038bc4081da2904bc4D696E64486976654E4F5641',
      timestamp: new Date().toISOString(),
      is_valid: true,
      latency_ms: 51
    }
  ],
  mutations: [
    {
      id: 'mut-01',
      living_app_id: 'app-nova-01',
      nova_url: 'nova://yoruba-route',
      mutation_version: 14,
      old_endpoint: '/api/v16/route-m13-yoruba-edge',
      new_endpoint: '/api/v16/route-m14-yoruba-fused',
      breeder_agent_id: 'agent-breeder-yoruba-v16',
      child_coin_id: '$YROUTE-V14',
      reason: 'Adaptive acoustic frequency shift for Lagos Oshodi engine background noise suppression.',
      mutated_at: new Date(Date.now() - 48000).toISOString(),
      color_mutation: '#00FF88 -> #00FFAA'
    },
    {
      id: 'mut-02',
      living_app_id: 'app-nova-02',
      nova_url: 'nova://cassava-pulse',
      mutation_version: 22,
      old_endpoint: '/api/v16/cassava-m21-optical-leaf',
      new_endpoint: '/api/v16/cassava-m22-spectral-morph',
      breeder_agent_id: 'agent-breeder-agro-v16',
      child_coin_id: '$CASSAVA-V22',
      reason: 'Recalibrated yellow pigment RGB bounds for early brown streak detection at noon sunlight.',
      mutated_at: new Date(Date.now() - 32000).toISOString(),
      color_mutation: '#00D4FF -> #00B4FF'
    }
  ],
  copy_detections: [
    {
      id: 'copy-det-01',
      original_app_id: 'app-nova-01',
      original_nova_url: 'nova://yoruba-route',
      suspected_copy_url: 'https://rea-scraper-demo-bot.net/clones/yoruba-voice-app',
      similarity_score: 91.4,
      detected_at: new Date(Date.now() - 7200000).toISOString(),
      royalty_redirected: 18.40,
      clicks_diverted: 18400,
      status: 'active_redirect',
      copier_ip: '198.51.100.42'
    },
    {
      id: 'copy-det-02',
      original_app_id: 'app-nova-02',
      original_nova_url: 'nova://cassava-pulse',
      suspected_copy_url: 'https://pirate-code-exchange.io/scraped/cassava-scanner',
      similarity_score: 87.8,
      detected_at: new Date(Date.now() - 14400000).toISOString(),
      royalty_redirected: 12.80,
      clicks_diverted: 12800,
      status: 'active_redirect',
      copier_ip: '203.0.113.119'
    }
  ],
  origin_pixels: [
    {
      id: 'px-001',
      living_app_id: 'app-nova-01',
      element_id: 'btn_voice_dispatch',
      element_type: 'button',
      origin_dna: {
        idea_coin_id: 'coin-yroute-001',
        creator_wallet: '0x8892A721869e9c1D1f0EFEc0c9D64d04847e0984',
        parent_creator: 'Adebayo Ogunlesi & Lagos AI Guild',
        breeder_agent_id: 'agent-breeder-yoruba-v16',
        ce_node_ids: ['ce-node-ikeja-01', 'ce-node-yaba-04'],
        code_api_ids: ['cv-api-whisper-yoruba'],
        aurum_vault_id: 'aurum-vault-dust-lagos',
        royalty_split: { creator: 10, breeder: 5, ce_nodes: 5, code_vein_devs: 5, ua_aidc: 10, cooperative_pool: 65 },
        birth_timestamp: new Date().toISOString()
      },
      clicks: 34100,
      royalties_generated: 34.10,
      created_at: new Date().toISOString()
    }
  ]
};
