import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

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
      server: { middlewareMode: true },
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
