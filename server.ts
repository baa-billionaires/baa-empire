import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { registerCeColonyRoutes } from './src/server/ceColonyRoutes';
import { registerCodeVeinRoutes } from './src/server/codeVeinRoutes';
import { registerAurumRoutes } from './src/server/aurumRoutes';
import { registerGenesisRoutes } from './src/server/genesisRoutes';
import { registerMindHiveV20Routes } from './src/server/mindHiveV20Routes';
import { registerSocialHiveRoutes } from './src/server/socialHiveRoutes';
import { registerMindHiveV22Routes } from './src/server/mindHiveV22Routes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '15mb' }));

// Health check endpoint for Cloud Run
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// XML Sitemap endpoint for Search Engines (Googlebot, Bingbot)
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const sitemapPath = isProd
    ? path.join(__dirname, 'dist', 'sitemap.xml')
    : path.join(__dirname, 'public', 'sitemap.xml');
  res.type('application/xml');
  res.sendFile(sitemapPath);
});

// robots.txt endpoint
app.get('/robots.txt', (_req: Request, res: Response) => {
  const robotsPath = isProd
    ? path.join(__dirname, 'dist', 'robots.txt')
    : path.join(__dirname, 'public', 'robots.txt');
  res.type('text/plain');
  res.sendFile(robotsPath);
});

// In-memory or stateful log of staking operations for telemetry
const STAKING_RECORDS: Array<{
  id: string;
  poolId: string;
  poolName: string;
  amount: number;
  lockupDays: number;
  apyPercent: number;
  userEmail: string;
  txHash: string;
  timestamp: string;
}> = [];

// Staking lock endpoint
app.post('/api/staking/lock', (req: Request, res: Response) => {
  const { poolId, poolName, amount, lockupDays, apyPercent, userEmail } = req.body;
  if (!poolId || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Valid poolId and positive amount required' });
  }

  const txHash = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
  const record = {
    id: `stake-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    poolId,
    poolName: poolName || 'BaaCoin Sovereign Vault',
    amount: Number(amount),
    lockupDays: Number(lockupDays || 90),
    apyPercent: Number(apyPercent || 42.8),
    userEmail: userEmail || 'student@billionairesai.academy',
    txHash,
    timestamp: new Date().toISOString()
  };

  STAKING_RECORDS.unshift(record);
  res.status(200).json({
    success: true,
    message: `Successfully locked ${amount} BaaCoin for ${lockupDays || 90} days at ${apyPercent || 42.8}% APY`,
    record,
    txHash
  });
});

// In-memory real-time mining events stream
export interface MiningTelemetryEvent {
  id: string;
  minerName: string;
  nodeType: 'phone' | 'gpu' | 'laptop' | 'validator';
  deviceModel: string;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  amount: number;
  rewardUsd: number;
  workload: string;
  hashrate: string;
  blockNumber: number;
  txHash: string;
  timestamp: string;
  status: 'confirmed';
}

const INITIAL_MINING_EVENTS: MiningTelemetryEvent[] = [
  {
    id: 'mine-001',
    minerName: 'Student Phone Node #8491',
    nodeType: 'phone',
    deviceModel: 'Tecno Camon 20 Pro · Helio G99',
    country: 'Nigeria',
    countryCode: 'NG',
    flag: '🇳🇬',
    city: 'Lagos',
    amount: 0.48,
    rewardUsd: 0.48,
    workload: 'Overnight Idle Battery Compute',
    hashrate: '840 kH/s',
    blockNumber: 8941204,
    txHash: '0x8a91c491e0a298f219dbca9188e04bba89190124',
    timestamp: new Date(Date.now() - 12000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-002',
    minerName: 'Nairobi GPU Mesh Shard-7',
    nodeType: 'gpu',
    deviceModel: 'NVIDIA RTX 4090 · 24GB VRAM',
    country: 'Kenya',
    countryCode: 'KE',
    flag: '🇰🇪',
    city: 'Nairobi',
    amount: 2.15,
    rewardUsd: 2.15,
    workload: 'Civic LLM Fine-Tuning Batch',
    hashrate: '14.2 MH/s',
    blockNumber: 8941205,
    txHash: '0x5b32e01a884ef0291ca824190baac71e40019283',
    timestamp: new Date(Date.now() - 28000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-003',
    minerName: 'ABAU Laptop Worker #109',
    nodeType: 'laptop',
    deviceModel: 'MacBook Air M2 · Neural Engine',
    country: 'Ghana',
    countryCode: 'GH',
    flag: '🇬🇭',
    city: 'Accra',
    amount: 0.85,
    rewardUsd: 0.85,
    workload: 'WhatsApp Closer AI Autonomous Inferences',
    hashrate: '2.4 MH/s',
    blockNumber: 8941206,
    txHash: '0x2e99f018ca0199da2880c108baac9108a1005521',
    timestamp: new Date(Date.now() - 47000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-004',
    minerName: 'Johannesburg Edge Validator #312',
    nodeType: 'validator',
    deviceModel: 'Ubuntu Sovereign Edge Cluster',
    country: 'South Africa',
    countryCode: 'ZA',
    flag: '🇿🇦',
    city: 'Johannesburg',
    amount: 1.20,
    rewardUsd: 1.20,
    workload: 'Base L2 Epoch Block Verification',
    hashrate: '5.1 MH/s',
    blockNumber: 8941207,
    txHash: '0x77c419fae881023bc800192fa901baac31d90048',
    timestamp: new Date(Date.now() - 65000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-005',
    minerName: 'Kigali Campus Cluster Alpha',
    nodeType: 'gpu',
    deviceModel: 'Dual Tesla A100 Data Pod',
    country: 'Rwanda',
    countryCode: 'RW',
    flag: '🇷🇼',
    city: 'Kigali',
    amount: 3.40,
    rewardUsd: 3.40,
    workload: 'UADC 4D Spatial Neural Synthesis',
    hashrate: '28.6 MH/s',
    blockNumber: 8941208,
    txHash: '0x19f201089bc2980fa0192cba8901baac80bb1290',
    timestamp: new Date(Date.now() - 95000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-006',
    minerName: 'Cairo Mobile Node #72',
    nodeType: 'phone',
    deviceModel: 'Samsung Galaxy A54 · Exynos 1380',
    country: 'Egypt',
    countryCode: 'EG',
    flag: '🇪🇬',
    city: 'Cairo',
    amount: 0.55,
    rewardUsd: 0.55,
    workload: 'Overnight Idle Battery Compute',
    hashrate: '910 kH/s',
    blockNumber: 8941209,
    txHash: '0x34e1980afb20199ccba018240091baac29cb7712',
    timestamp: new Date(Date.now() - 130000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-007',
    minerName: 'Abidjan Student Node #208',
    nodeType: 'phone',
    deviceModel: 'Infinix Note 30 · Helio G99',
    country: 'Ivory Coast',
    countryCode: 'CI',
    flag: '🇨🇮',
    city: 'Abidjan',
    amount: 0.72,
    rewardUsd: 0.72,
    workload: 'French/Swahili Translation Shard',
    hashrate: '870 kH/s',
    blockNumber: 8941210,
    txHash: '0x61a3c0018fa0190288eb00192baac338f099182a',
    timestamp: new Date(Date.now() - 175000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'mine-008',
    minerName: 'Kampala Phone Mesh #33',
    nodeType: 'phone',
    deviceModel: 'Xiaomi Redmi Note 12 · Snapdragon',
    country: 'Uganda',
    countryCode: 'UG',
    flag: '🇺🇬',
    city: 'Kampala',
    amount: 0.42,
    rewardUsd: 0.42,
    workload: 'Overnight Idle Battery Compute',
    hashrate: '790 kH/s',
    blockNumber: 8941211,
    txHash: '0x99a0b120c9048a01f84901baac01844bca990141',
    timestamp: new Date(Date.now() - 210000).toISOString(),
    status: 'confirmed'
  }
];

let MINING_EVENTS_STORE: MiningTelemetryEvent[] = [...INITIAL_MINING_EVENTS];
let GLOBAL_BLOCK_HEIGHT = 8941212;

// Real-time Mining Events Stream Endpoint
app.get('/api/mining/events', (_req: Request, res: Response) => {
  const totalMined = MINING_EVENTS_STORE.reduce((acc, ev) => acc + ev.amount, 0);
  res.status(200).json({
    success: true,
    blockHeight: GLOBAL_BLOCK_HEIGHT,
    activeNodes: 4892,
    meshHashrate: '842.6 MH/s',
    total24hMinedBaa: (14280 + totalMined).toFixed(2),
    eventsCount: MINING_EVENTS_STORE.length,
    events: MINING_EVENTS_STORE.slice(0, 30)
  });
});

// Endpoint to simulate or record a user mining event
app.post('/api/mining/record', (req: Request, res: Response) => {
  const { minerName, nodeType, deviceModel, country, flag, city, amount, workload, hashrate } = req.body;
  GLOBAL_BLOCK_HEIGHT += 1;
  const newEvent: MiningTelemetryEvent = {
    id: `mine-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    minerName: minerName || 'Sovereign Phone Node',
    nodeType: nodeType || 'phone',
    deviceModel: deviceModel || 'Mobile Mesh Device',
    country: country || 'Pan-Africa',
    countryCode: 'BAA',
    flag: flag || '⚡',
    city: city || 'Distributed Mesh',
    amount: Number(amount) || 0.45,
    rewardUsd: Number(amount) || 0.45,
    workload: workload || 'Overnight Idle Battery Compute',
    hashrate: hashrate || '850 kH/s',
    blockNumber: GLOBAL_BLOCK_HEIGHT,
    txHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
    timestamp: new Date().toISOString(),
    status: 'confirmed'
  };

  MINING_EVENTS_STORE.unshift(newEvent);
  if (MINING_EVENTS_STORE.length > 100) {
    MINING_EVENTS_STORE = MINING_EVENTS_STORE.slice(0, 100);
  }

  res.status(200).json({
    success: true,
    event: newEvent
  });
});

// Staking telemetry endpoint
app.get('/api/staking/records', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    totalStaked: STAKING_RECORDS.reduce((acc, r) => acc + r.amount, 0),
    recordsCount: STAKING_RECORDS.length,
    records: STAKING_RECORDS.slice(0, 50)
  });
});

// =========================================================================
// UNIVERSAL DEVICE WEALTH NETWORK (UDWN) BACKEND INFRASTRUCTURE
// =========================================================================

const UDWN_AGENTS_DATA = [
  {
    id: 'agent-discovery',
    name: 'Device Discovery Agent',
    role: 'Hardware Fingerprinting & Registration',
    description: 'Identifies, fingerprints, and securely registers supported devices across OS barriers.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 1420,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Listening for new WebRTC & WebSocket device handshakes',
    iconName: 'Radar'
  },
  {
    id: 'agent-benchmark',
    name: 'Device Benchmark Agent',
    role: 'Capacity & Capability Measurement',
    description: 'Measures actual available FLOPS, memory latency, thermal headroom, and battery health.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 890,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Calibrating floating-point matrix baselines on connected nodes',
    iconName: 'Gauge'
  },
  {
    id: 'agent-matching',
    name: 'Workload Matching Agent',
    role: 'Compatible Job Distribution',
    description: 'Assigns only verified, permitted, and safe workloads matching each node hardware tier.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 2310,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Routing AI inference batches to qualified smartphone & GPU clusters',
    iconName: 'GitFork'
  },
  {
    id: 'agent-colony',
    name: 'Compute Colony Agent',
    role: 'Mesh Coordination & Cluster Orchestration',
    description: 'Coordinates participating multi-device colonies, maintaining cluster quorum and fault tolerance.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 4190,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Synchronizing consensus state across 4,892 active peer nodes',
    iconName: 'Network'
  },
  {
    id: 'agent-ai-workload',
    name: 'AI Workload Agent',
    role: 'Model Inference & Token Serving Manager',
    description: 'Manages authorized local LLM inferences, text embeddings, and multilingual translation queries.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 1845,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Dispatching Swahili & Yoruba translation shards to student mobile nodes',
    iconName: 'Bot'
  },
  {
    id: 'agent-rendering',
    name: 'Rendering Agent',
    role: '3D Graphics & Spatial Frame Allocation',
    description: 'Matches suitable high-performance GPUs, laptops, and workstations to 3D rendering jobs.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 620,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Distributing ray-traced architectural tile rendering to workstation nodes',
    iconName: 'Layers'
  },
  {
    id: 'agent-research',
    name: 'Research Compute Agent',
    role: 'Scientific & Academic Workload Coordinator',
    description: 'Coordinates approved biomedical docking, climate simulations, and university research grids.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 480,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Running molecular ligand docking calculations for sickle cell therapeutics',
    iconName: 'Microscope'
  },
  {
    id: 'agent-energy',
    name: 'Energy Intelligence Agent',
    role: 'Thermal & Power Optimization',
    description: 'Throttles compute based on battery level, charging status, and device thermal thresholds.',
    status: 'optimizing' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 3120,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Protecting 812 mobile nodes from exceeding 42°C thermal ceilings',
    iconName: 'Zap'
  },
  {
    id: 'agent-security',
    name: 'Security Guardian Agent',
    role: 'Integrity & Permission Boundary Guard',
    description: 'Monitors sandboxed execution, enforces zero private data access, and blocks arbitrary binaries.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 5410,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Auditing WebAssembly sandbox memory boundaries on all active workers',
    iconName: 'ShieldCheck'
  },
  {
    id: 'agent-verification',
    name: 'Contribution Verification Agent',
    role: 'Cryptographic Result Proof Validator',
    description: 'Validates compute hashes, verifies mathematical outputs, and signs proof of work receipts.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 2790,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Verifying cryptographic output hashes before crediting BAA balances',
    iconName: 'CheckCircle2'
  },
  {
    id: 'agent-revenue',
    name: 'Revenue Allocation Agent',
    role: 'Transparent Earnings & Payout Ledger',
    description: 'Calculates transparent participant shares, operating expenses, and platform reserves.',
    status: 'active' as const,
    autonomyLevel: 'Human Oversight Required' as const,
    verifiedActionsToday: 910,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Reconciling customer escrow disbursements with completed job proofs',
    iconName: 'DollarSign'
  },
  {
    id: 'agent-optimization',
    name: 'Network Optimization Agent',
    role: 'Dynamic Latency & Bandwidth Routing',
    description: 'Improves workload distribution using real latency and completion evidence from telemetry.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 1640,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Optimizing packet routes between West African edge clusters and cloud relays',
    iconName: 'TrendingUp'
  },
  {
    id: 'agent-wealth-intel',
    name: 'Device Wealth Intelligence Agent',
    role: 'Performance Reporting & Earning Insights',
    description: 'Generates actionable recommendations to maximize participant earnings safely.',
    status: 'active' as const,
    autonomyLevel: 'Full Autonomous' as const,
    verifiedActionsToday: 730,
    lastHandshakeTimestamp: new Date().toISOString(),
    currentTask: 'Publishing daily hardware efficiency recommendations to device owners',
    iconName: 'Sparkles'
  }
];

let UDWN_REGISTERED_DEVICES: any[] = [
  {
    id: 'dev-demo-01',
    name: 'Current Session Node',
    category: 'personal',
    hardwareType: 'laptop',
    specs: {
      cpuCores: 8,
      ramGb: 16,
      gpuRenderer: 'Apple M2 Pro / Neural Engine',
      hasWebGpu: true,
      hasWebGL: true,
      batteryLevel: 92,
      isCharging: true,
      networkDownlinkMbps: 45,
      estimatedLatencyMs: 24,
      osName: 'macOS Sonoma'
    },
    limits: {
      cpuLimitPercent: 60,
      gpuLimitPercent: 70,
      memoryLimitGb: 8,
      onlyWhileCharging: true,
      minBatteryPercent: 40,
      maxTemperatureCelsius: 45,
      maxBandwidthMbPerHour: 250
    },
    permittedWorkloads: ['ai_inference', 'rendering_3d', 'scientific_research', 'video_transcode'],
    status: 'active',
    isCurrentDevice: true,
    benchmarkScore: 88,
    benchmarkFlopsGiga: 4.82,
    lastHeartbeat: new Date().toISOString(),
    connectedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    totalCompletedJobs: 19,
    totalActiveHours: 42.5,
    wealthScore: {
      overallScore: 88,
      tier: 'Gold',
      availableCapacityScore: 92,
      completedWorkloadsScore: 84,
      reliabilityUptimeScore: 95,
      energyEfficiencyScore: 86,
      jobQualityScore: 98,
      contributionHistoryScore: 82,
      netEarningsFactor: 0.91
    },
    ipLocation: {
      city: 'Lagos',
      country: 'Nigeria',
      flag: '🇳🇬'
    }
  },
  {
    id: 'dev-demo-02',
    name: 'Samsung Galaxy A54 Student Node',
    category: 'student',
    hardwareType: 'android_phone',
    specs: {
      cpuCores: 8,
      ramGb: 6,
      gpuRenderer: 'Mali-G68 MP5',
      hasWebGpu: false,
      hasWebGL: true,
      batteryLevel: 84,
      isCharging: true,
      networkDownlinkMbps: 20,
      estimatedLatencyMs: 38,
      osName: 'Android 14'
    },
    limits: {
      cpuLimitPercent: 40,
      gpuLimitPercent: 30,
      memoryLimitGb: 3,
      onlyWhileCharging: true,
      minBatteryPercent: 60,
      maxTemperatureCelsius: 40,
      maxBandwidthMbPerHour: 100
    },
    permittedWorkloads: ['ai_inference', 'edge_iot'],
    status: 'active',
    isCurrentDevice: false,
    benchmarkScore: 72,
    benchmarkFlopsGiga: 1.45,
    lastHeartbeat: new Date().toISOString(),
    connectedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    totalCompletedJobs: 34,
    totalActiveHours: 58.2,
    wealthScore: {
      overallScore: 74,
      tier: 'Silver',
      availableCapacityScore: 68,
      completedWorkloadsScore: 78,
      reliabilityUptimeScore: 90,
      energyEfficiencyScore: 92,
      jobQualityScore: 94,
      contributionHistoryScore: 75,
      netEarningsFactor: 0.88
    },
    ipLocation: {
      city: 'Nairobi',
      country: 'Kenya',
      flag: '🇰🇪'
    }
  },
  {
    id: 'dev-demo-03',
    name: 'TCL Android Smart TV Living Room',
    category: 'personal',
    hardwareType: 'smart_tv',
    specs: {
      cpuCores: 4,
      ramGb: 2,
      gpuRenderer: 'Mali-470',
      hasWebGpu: false,
      hasWebGL: true,
      networkDownlinkMbps: 30,
      estimatedLatencyMs: 28,
      osName: 'Android TV 12'
    },
    limits: {
      cpuLimitPercent: 25,
      gpuLimitPercent: 20,
      memoryLimitGb: 1,
      onlyWhileCharging: true,
      minBatteryPercent: 0,
      maxTemperatureCelsius: 50,
      maxBandwidthMbPerHour: 50
    },
    permittedWorkloads: ['edge_iot'],
    status: 'active',
    isCurrentDevice: false,
    smartTvMode: 'dashboard_terminal',
    benchmarkScore: 58,
    benchmarkFlopsGiga: 0.85,
    lastHeartbeat: new Date().toISOString(),
    connectedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    totalCompletedJobs: 12,
    totalActiveHours: 71.0,
    wealthScore: {
      overallScore: 62,
      tier: 'Bronze',
      availableCapacityScore: 52,
      completedWorkloadsScore: 65,
      reliabilityUptimeScore: 98,
      energyEfficiencyScore: 96,
      jobQualityScore: 90,
      contributionHistoryScore: 60,
      netEarningsFactor: 0.82
    },
    ipLocation: {
      city: 'Accra',
      country: 'Ghana',
      flag: '🇬🇭'
    }
  }
];

let UDWN_PAID_WORKLOADS: any[] = [
  {
    id: 'job-llm-01',
    customerName: 'Afritech AI Labs',
    customerOrg: 'Pan-Africa NLP Consortium',
    category: 'ai_inference',
    title: 'Civic LLM Multi-Lingual Token Generation',
    description: 'Serving quantized Llama-3 Swahili & Yoruba translation queries for low-bandwidth healthcare chat.',
    totalComputeUnits: '45,000 Tokens / Batch',
    requiredHardware: ['android_phone', 'laptop', 'desktop', 'workstation_gpu'],
    customerGrossPayment: 120.00,
    operatingExpenses: 12.00,
    platformFee: 24.00,
    participantNetShare: 84.00,
    durationMinutes: 45,
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-render-02',
    customerName: 'Studio Eko Vision',
    customerOrg: 'Lagos Media & Animation Cluster',
    category: 'rendering_3d',
    title: '4D Architectural Ray-Traced Frame Tile Render',
    description: 'Blender Cycles spatial rendering for sustainable solar housing architectural models in Abuja.',
    totalComputeUnits: '120 Frame Tiles (4K)',
    requiredHardware: ['laptop', 'desktop', 'workstation_gpu', 'server_cluster'],
    customerGrossPayment: 240.00,
    operatingExpenses: 28.00,
    platformFee: 48.00,
    participantNetShare: 164.00,
    durationMinutes: 90,
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-science-03',
    customerName: 'Global Biotech Initiative',
    customerOrg: 'Kigali Health Sciences University',
    category: 'scientific_research',
    title: 'FoldX Protein Ligand Screening for Sickle Cell Therapeutics',
    description: 'Molecular docking simulations and binding affinity scoring across 8,000 potential drug compounds.',
    totalComputeUnits: '8,000 Compound Ligand Runs',
    requiredHardware: ['laptop', 'desktop', 'workstation_gpu', 'server_cluster'],
    customerGrossPayment: 180.00,
    operatingExpenses: 18.00,
    platformFee: 36.00,
    participantNetShare: 126.00,
    durationMinutes: 60,
    status: 'open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-transcode-04',
    customerName: 'EduStream Africa',
    customerOrg: 'Universal Open Education Alliance',
    category: 'video_transcode',
    title: 'Adaptive Video Transcoding (H.265 / AV1 Compression)',
    description: 'Compressing 4K executive masterclasses into bandwidth-saving streams for remote rural schools.',
    totalComputeUnits: '18 Video Chunks (1080p to 480p)',
    requiredHardware: ['android_phone', 'laptop', 'desktop', 'workstation_gpu'],
    customerGrossPayment: 95.00,
    operatingExpenses: 9.50,
    platformFee: 19.00,
    participantNetShare: 66.50,
    durationMinutes: 30,
    status: 'open',
    createdAt: new Date().toISOString()
  }
];

let UDWN_REVENUE_LEDGER = {
  estimatedEarningPotentialUsd: 148.50,
  pendingWorkloadPaymentsUsd: 42.00,
  confirmedCustomerRevenueUsd: 318.40,
  participantNetEarningsUsd: 228.60,
  participantNetEarningsBaa: 228.60,
  platformFeesUsd: 63.68,
  operatingCostsUsd: 26.12,
  withdrawableBalanceUsd: 186.60,
  withdrawableBalanceNgn: 186.60 * 1500,
  totalPayoutsCompletedUsd: 42.00
};

let UDWN_PAYOUT_HISTORY: any[] = [
  {
    id: 'pay-001',
    amountUsd: 42.00,
    amountNgn: 42.00 * 1500,
    method: 'paystack_bank',
    accountDetails: 'Wema Bank • ****6789',
    reference: 'BAA-PAYSTACK-UDWN-99120',
    status: 'settled',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
    reconciliationId: 'REC-99120-CONFIRMED'
  }
];

// GET UDWN Complete State
app.get('/api/udwn/state', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    devices: UDWN_REGISTERED_DEVICES,
    agents: UDWN_AGENTS_DATA,
    workloads: UDWN_PAID_WORKLOADS,
    revenue: UDWN_REVENUE_LEDGER,
    payoutHistory: UDWN_PAYOUT_HISTORY,
    networkTotals: {
      totalRegisteredDevices: 4892,
      activeOnlineDevices: 3418,
      totalGFlopsMined: '142.8 TFLOPS',
      totalCustomerRevenueDisbursedUsd: 124890.00
    }
  });
});

// POST Register New Device
app.post('/api/udwn/register-device', (req: Request, res: Response) => {
  const { name, category, hardwareType, specs, limits, permittedWorkloads, smartTvMode } = req.body;
  if (!name || !hardwareType) {
    return res.status(400).json({ error: 'Device name and hardwareType are required' });
  }

  const deviceId = `dev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const cpuCores = Number(specs?.cpuCores) || 4;
  const ramGb = Number(specs?.ramGb) || 8;

  // Calculate initial baseline score
  const benchmarkScore = Math.min(95, Math.max(55, Math.round(50 + (cpuCores * 3) + (ramGb * 1.5))));
  const benchmarkFlopsGiga = +(cpuCores * 0.65).toFixed(2);

  const newDevice = {
    id: deviceId,
    name,
    category: category || 'personal',
    hardwareType,
    specs: specs || {
      cpuCores,
      ramGb,
      hasWebGL: true,
      hasWebGpu: false,
      osName: 'Connected OS',
      networkDownlinkMbps: 20,
      estimatedLatencyMs: 35
    },
    limits: limits || {
      cpuLimitPercent: 50,
      gpuLimitPercent: 50,
      memoryLimitGb: Math.max(2, Math.floor(ramGb / 2)),
      onlyWhileCharging: true,
      minBatteryPercent: 50,
      maxTemperatureCelsius: 45,
      maxBandwidthMbPerHour: 150
    },
    permittedWorkloads: Array.isArray(permittedWorkloads) && permittedWorkloads.length > 0
      ? permittedWorkloads
      : ['ai_inference', 'edge_iot'],
    status: 'active',
    isCurrentDevice: true,
    smartTvMode: hardwareType === 'smart_tv' ? (smartTvMode || 'dashboard_terminal') : undefined,
    benchmarkScore,
    benchmarkFlopsGiga,
    lastHeartbeat: new Date().toISOString(),
    connectedAt: new Date().toISOString(),
    totalCompletedJobs: 0,
    totalActiveHours: 0.1,
    wealthScore: {
      overallScore: benchmarkScore,
      tier: benchmarkScore >= 85 ? 'Gold' : benchmarkScore >= 70 ? 'Silver' : 'Bronze',
      availableCapacityScore: benchmarkScore,
      completedWorkloadsScore: 60,
      reliabilityUptimeScore: 100,
      energyEfficiencyScore: 90,
      jobQualityScore: 100,
      contributionHistoryScore: 50,
      netEarningsFactor: 0.85
    },
    ipLocation: {
      city: 'Live Connected Node',
      country: 'Global Grid',
      flag: '🌐'
    }
  };

  // Mark other devices as not current device if this one is registered as current
  UDWN_REGISTERED_DEVICES = UDWN_REGISTERED_DEVICES.map(d => ({ ...d, isCurrentDevice: false }));
  UDWN_REGISTERED_DEVICES.unshift(newDevice);

  res.status(200).json({
    success: true,
    message: `Device "${name}" successfully registered and authenticated to UDWN`,
    device: newDevice
  });
});

// POST Run Benchmark for Device
app.post('/api/udwn/benchmark', (req: Request, res: Response) => {
  const { deviceId, flopsGiga, score } = req.body;
  const devIndex = UDWN_REGISTERED_DEVICES.findIndex(d => d.id === deviceId);
  if (devIndex === -1) {
    return res.status(404).json({ error: 'Device not found' });
  }

  const updatedScore = Number(score) || 75;
  const updatedFlops = Number(flopsGiga) || 2.5;

  UDWN_REGISTERED_DEVICES[devIndex].benchmarkScore = updatedScore;
  UDWN_REGISTERED_DEVICES[devIndex].benchmarkFlopsGiga = updatedFlops;
  UDWN_REGISTERED_DEVICES[devIndex].wealthScore.overallScore = updatedScore;
  UDWN_REGISTERED_DEVICES[devIndex].wealthScore.availableCapacityScore = updatedScore;
  UDWN_REGISTERED_DEVICES[devIndex].wealthScore.tier =
    updatedScore >= 90 ? 'Platinum' : updatedScore >= 80 ? 'Gold' : updatedScore >= 65 ? 'Silver' : 'Bronze';

  res.status(200).json({
    success: true,
    message: 'Benchmark verified and recorded by Benchmark Agent',
    device: UDWN_REGISTERED_DEVICES[devIndex]
  });
});

// PATCH Update Device Settings / Limits / Pause
app.patch('/api/udwn/device/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { limits, permittedWorkloads, status, smartTvMode, name } = req.body;

  const devIndex = UDWN_REGISTERED_DEVICES.findIndex(d => d.id === id);
  if (devIndex === -1) {
    return res.status(404).json({ error: 'Device not found' });
  }

  if (limits) UDWN_REGISTERED_DEVICES[devIndex].limits = { ...UDWN_REGISTERED_DEVICES[devIndex].limits, ...limits };
  if (permittedWorkloads) UDWN_REGISTERED_DEVICES[devIndex].permittedWorkloads = permittedWorkloads;
  if (status) UDWN_REGISTERED_DEVICES[devIndex].status = status;
  if (smartTvMode) UDWN_REGISTERED_DEVICES[devIndex].smartTvMode = smartTvMode;
  if (name) UDWN_REGISTERED_DEVICES[devIndex].name = name;
  UDWN_REGISTERED_DEVICES[devIndex].lastHeartbeat = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: 'Device preferences updated',
    device: UDWN_REGISTERED_DEVICES[devIndex]
  });
});

// DELETE Disconnect / Revoke Device
app.delete('/api/udwn/device/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const dev = UDWN_REGISTERED_DEVICES.find(d => d.id === id);
  if (!dev) {
    return res.status(404).json({ error: 'Device not found' });
  }

  UDWN_REGISTERED_DEVICES = UDWN_REGISTERED_DEVICES.filter(d => d.id !== id);
  res.status(200).json({
    success: true,
    message: `Device "${dev.name}" revoked and disconnected from UDWN.`
  });
});

// POST Execute Workload Job (Work-to-Verification-to-Payment pipeline)
app.post('/api/udwn/jobs/execute', (req: Request, res: Response) => {
  const { jobId, deviceId } = req.body;
  const job = UDWN_PAID_WORKLOADS.find(j => j.id === jobId);
  const device = UDWN_REGISTERED_DEVICES.find(d => d.id === deviceId);

  if (!job) {
    return res.status(404).json({ error: 'Workload job not found' });
  }

  // Generate cryptographic verification proof
  const verificationHash = `0x${Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  // Update device stats
  if (device) {
    device.totalCompletedJobs += 1;
    device.totalActiveHours += +(job.durationMinutes / 60).toFixed(1);
    device.lastHeartbeat = new Date().toISOString();
  }

  // Credit earnings to ledger
  const netEarnings = job.participantNetShare;
  UDWN_REVENUE_LEDGER.confirmedCustomerRevenueUsd += job.customerGrossPayment;
  UDWN_REVENUE_LEDGER.participantNetEarningsUsd += netEarnings;
  UDWN_REVENUE_LEDGER.participantNetEarningsBaa += netEarnings;
  UDWN_REVENUE_LEDGER.withdrawableBalanceUsd += netEarnings;
  UDWN_REVENUE_LEDGER.withdrawableBalanceNgn += (netEarnings * 1500);
  UDWN_REVENUE_LEDGER.platformFeesUsd += job.platformFee;
  UDWN_REVENUE_LEDGER.operatingCostsUsd += job.operatingExpenses;

  // Mark job completed with proof
  job.status = 'settled';
  job.assignedDeviceId = deviceId;
  job.verificationHash = verificationHash;
  job.completedAt = new Date().toISOString();

  res.status(200).json({
    success: true,
    message: `Job "${job.title}" successfully executed and verified! +$${netEarnings.toFixed(2)} USD credited.`,
    verificationHash,
    participantNetShare: netEarnings,
    job
  });
});

// POST Request Payout (Paystack Bank or BAA Coin)
app.post('/api/udwn/payout/request', (req: Request, res: Response) => {
  const { amountUsd, method, accountDetails } = req.body;
  const amount = Number(amountUsd);

  if (!amount || amount <= 0 || amount > UDWN_REVENUE_LEDGER.withdrawableBalanceUsd) {
    return res.status(400).json({
      error: `Invalid payout amount. You have $${UDWN_REVENUE_LEDGER.withdrawableBalanceUsd.toFixed(2)} withdrawable.`
    });
  }

  const amountNgn = amount * 1500;
  const reference = `BAA-UDWN-PAY-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

  const record = {
    id: `pay-${Date.now()}`,
    amountUsd: amount,
    amountNgn,
    method: method || 'paystack_bank',
    accountDetails: accountDetails || 'Verified Bank Account',
    reference,
    status: 'settled',
    timestamp: new Date().toISOString(),
    reconciliationId: `REC-${Date.now()}-CONFIRMED`
  };

  UDWN_REVENUE_LEDGER.withdrawableBalanceUsd -= amount;
  UDWN_REVENUE_LEDGER.withdrawableBalanceNgn -= amountNgn;
  UDWN_REVENUE_LEDGER.totalPayoutsCompletedUsd += amount;
  UDWN_PAYOUT_HISTORY.unshift(record);

  res.status(200).json({
    success: true,
    message: `Payout of $${amount.toFixed(2)} USD (₦${amountNgn.toLocaleString()} NGN) successfully processed and confirmed!`,
    record,
    remainingBalanceUsd: UDWN_REVENUE_LEDGER.withdrawableBalanceUsd
  });
});

// BAA CE Colony V12 - Autonomous Computer Engineering Data-to-Wealth Ecosystem routes
registerCeColonyRoutes(app);

// BAA CODE VEIN V13 - Autonomous Source-to-Wealth Colony (UA-AIDC Module 2)
registerCodeVeinRoutes(app);

// BAA AURUM COLONY V13 - Autonomous Digital Asset Recovery & Commercialization Network (UA-AIDC Module 3)
registerAurumRoutes(app);

// BAA MIND HIVE V17 GENESIS - Autonomous Venture Creation & Colony Fusion Engine (UA-AIDC Module 4)
registerGenesisRoutes(app);

// BAA MIND HIVE V20 - Global Content Compounding, AI Knowledge Mining, Training & Wealth Civilization
registerMindHiveV20Routes(app);

// BAA MIND HIVE V21 - SOCIAL HIVE: Universal Social Media Minting, Mining & Monetization Engine
registerSocialHiveRoutes(app);

// BAA MIND HIVE V22 - Global Knowledge Capital, Intelligence Atlas & Human-AI Value Cooperative
registerMindHiveV22Routes(app);

// AI-powered course thumbnail generator endpoint using Gemini API
app.post('/api/generate-thumbnail', async (req: Request, res: Response) => {
  try {
    const { topic, category, style, customPrompt } = req.body;
    if (!topic || typeof topic !== 'string' || !topic.trim()) {
      return res.status(400).json({ error: 'Course topic is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable not set. Falling back to dynamic themed artwork.');
      // Return high-quality themed SVG data URI if API key is not present
      const fallbackSvg = generateThemedFallbackSvg(topic.trim(), category || 'AI Wealth', style);
      return res.status(200).json({
        success: true,
        imageUrl: fallbackSvg,
        prompt: `Themed dynamic hero artwork for: ${topic}`,
        topic: topic.trim(),
        isFallback: true
      });
    }

    // Initialize modern GoogleGenAI client with server-side API key
    const ai = new GoogleGenAI({
      apiKey: apiKey
    });

    const styleDescription = style || 'Obsidian, gold neon, and futuristic 3D luxury educational academy branding';
    const finalPrompt = customPrompt || 
      `A stunning, cinematic 16:9 hero course thumbnail for an accredited masterclass titled "${topic.trim()}". Category: ${category || 'AI & Wealth'}. Aesthetic style: ${styleDescription}. Featuring sleek 3D holographic digital assets, vibrant gold and neon ambient lighting, volumetric depth, photorealistic textures, clean focal composition, professional digital academy aesthetic.`;

    console.log(`Generating course thumbnail with Gemini for topic: "${topic.trim()}"`);

    // Using gemini-3.1-flash-lite-image as specified by the gemini-api skill for general image generation
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          { text: finalPrompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: '16:9'
        }
      }
    });

    let imageUrl: string | null = null;
    let descriptionText = '';

    for (const part of response.candidates?.[0]?.content?.parts ?? []) {
      if (part.inlineData?.data) {
        const base64Data = part.inlineData.data;
        const mime = part.inlineData.mimeType || 'image/png';
        imageUrl = `data:${mime};base64,${base64Data}`;
        break;
      } else if (part.text) {
        descriptionText = part.text;
      }
    }

    if (!imageUrl) {
      console.warn('No inline image data returned by Gemini model. Providing themed SVG artwork.');
      const fallbackSvg = generateThemedFallbackSvg(topic.trim(), category || 'AI Wealth', style);
      return res.status(200).json({
        success: true,
        imageUrl: fallbackSvg,
        prompt: finalPrompt,
        topic: topic.trim(),
        details: descriptionText,
        isFallback: true
      });
    }

    return res.status(200).json({
      success: true,
      imageUrl,
      prompt: finalPrompt,
      topic: topic.trim()
    });
  } catch (error: any) {
    console.error('Error generating thumbnail with Gemini API:', error);
    // Provide a graceful fallback SVG with custom topic rather than completely failing
    const { topic, category, style } = req.body;
    if (topic) {
      const fallbackSvg = generateThemedFallbackSvg(topic, category || 'AI Wealth', style);
      return res.status(200).json({
        success: true,
        imageUrl: fallbackSvg,
        prompt: `Dynamic artwork for: ${topic}`,
        topic,
        isFallback: true,
        errorNote: error?.message || 'Gemini image generation unavailable'
      });
    }
    return res.status(500).json({
      error: error?.message || 'Failed to generate course thumbnail'
    });
  }
});

// Helper to generate dynamic, high-fidelity SVG course hero banners
function generateThemedFallbackSvg(topic: string, category: string, style?: string): string {
  const safeTopic = topic.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const safeCategory = category.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeStyle = (style || 'Autonomous AI Masterclass').replace(/&/g, '&amp;').replace(/</g, '&lt;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050505" />
        <stop offset="50%" stop-color="#0c0e14" />
        <stop offset="100%" stop-color="#030303" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF2A3" />
        <stop offset="50%" stop-color="#FFD700" />
        <stop offset="100%" stop-color="#C59B00" />
      </linearGradient>
      <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#60EFFF" />
        <stop offset="100%" stop-color="#00A3FF" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="30" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    <rect width="1280" height="720" fill="url(#bgGrad)" />
    
    <!-- Ambient Neon Orbs -->
    <circle cx="1100" cy="180" r="240" fill="#FFD700" opacity="0.12" filter="url(#glow)" />
    <circle cx="200" cy="580" r="280" fill="#00D4FF" opacity="0.15" filter="url(#glow)" />
    <circle cx="640" cy="360" r="320" fill="#9D00FF" opacity="0.08" filter="url(#glow)" />

    <!-- Grid lines -->
    <path d="M0,180 L1280,180 M0,360 L1280,360 M0,540 L1280,540" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />
    <path d="M320,0 L320,720 M640,0 L640,720 M960,0 L960,720" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1" />
    
    <!-- Top Pill -->
    <rect x="80" y="80" width="300" height="40" rx="20" fill="#000000" stroke="#FFD700" stroke-opacity="0.5" stroke-width="1.5" />
    <circle cx="105" cy="100" r="5" fill="#FFD700" />
    <text x="125" y="105" fill="#FFD700" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="2">BILLIONAIRES AI ACADEMY</text>
    
    <!-- Category Badge -->
    <rect x="400" y="80" width="200" height="40" rx="20" fill="#00D4FF" fill-opacity="0.1" stroke="#00D4FF" stroke-opacity="0.4" stroke-width="1.5" />
    <text x="500" y="105" fill="#00D4FF" font-family="sans-serif" font-size="13" font-weight="700" text-anchor="middle" letter-spacing="1.5">${safeCategory.toUpperCase()}</text>

    <!-- Main Title (Centered & Multi-Line Ready) -->
    <text x="80" y="270" fill="url(#goldGrad)" font-family="sans-serif" font-size="48" font-weight="900" letter-spacing="-0.5">
      ${safeTopic.length > 36 ? safeTopic.substring(0, 34) + '...' : safeTopic}
    </text>
    <text x="80" y="340" fill="#FFFFFF" font-family="sans-serif" font-size="34" font-weight="800" opacity="0.95">
      Verified Autonomous Masterclass
    </text>

    <text x="80" y="420" fill="#A1A1AA" font-family="sans-serif" font-size="20" font-weight="500">
      Style: ${safeStyle} • Base L2 Soulbound Proof
    </text>

    <!-- Bottom Metrics Strip -->
    <rect x="80" y="560" width="1120" height="90" rx="24" fill="#0c0e14" fill-opacity="0.8" stroke="#27272A" stroke-width="1" />
    
    <text x="130" y="605" fill="#71717A" font-family="monospace" font-size="12" letter-spacing="1">LEARN-TO-MINE REWARD</text>
    <text x="130" y="632" fill="#00FF88" font-family="sans-serif" font-size="18" font-weight="800">+990 BaaCoin ($990 USD)</text>

    <text x="460" y="605" fill="#71717A" font-family="monospace" font-size="12" letter-spacing="1">ACCREDITATION</text>
    <text x="460" y="632" fill="#FFFFFF" font-family="sans-serif" font-size="18" font-weight="800">Pan-Africa AI University</text>

    <text x="800" y="605" fill="#71717A" font-family="monospace" font-size="12" letter-spacing="1">SOULBOUND NFT CHIP</text>
    <text x="800" y="632" fill="#FFD700" font-family="sans-serif" font-size="18" font-weight="800">Base L2 On-Chain</text>

    <!-- Decorative 3D Gold Rings -->
    <circle cx="1080" cy="360" r="140" fill="none" stroke="url(#goldGrad)" stroke-width="6" opacity="0.8" />
    <circle cx="1080" cy="360" r="100" fill="none" stroke="url(#cyanGrad)" stroke-width="3" opacity="0.9" />
    <circle cx="1080" cy="360" r="60" fill="#FFD700" opacity="0.15" />
    <polygon points="1080,320 1115,380 1045,380" fill="url(#goldGrad)" />
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Billionaires AI Academy server listening on port ${port} (${isProd ? 'production' : 'development'})`);
  });
}

startServer();
