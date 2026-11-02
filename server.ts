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
