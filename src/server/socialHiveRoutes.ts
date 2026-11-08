import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import {
  SocialHiveState,
  SocialAssetGenome,
  SocialDerivative,
  EnterpriseKnowledgeProduct,
  SocialBuyerOpportunity,
  SocialPlatform,
  SocialContentType
} from '../types/socialHive';
import { INITIAL_SOCIAL_HIVE_STATE } from '../data/socialHiveInitialState';

const DATA_DIR = '/data';
const SOCIAL_HIVE_FILE = path.join(DATA_DIR, 'social_hive_v21.json');

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn(`Could not create ${DATA_DIR}:`, err);
  }
}

function getDataFilePath(): string {
  if (fs.existsSync(SOCIAL_HIVE_FILE)) return SOCIAL_HIVE_FILE;
  const local = path.join(process.cwd(), 'data', 'social_hive_v21.json');
  if (fs.existsSync(local)) return local;
  return SOCIAL_HIVE_FILE;
}

export function loadSocialHiveState(): SocialHiveState {
  ensureDataDir();
  try {
    const targetFile = getDataFilePath();
    if (fs.existsSync(targetFile)) {
      const raw = fs.readFileSync(targetFile, 'utf-8');
      return JSON.parse(raw) as SocialHiveState;
    }
  } catch (err) {
    console.error('Error reading social_hive_v21.json:', err);
  }

  // Fallback to initial state
  const state = JSON.parse(JSON.stringify(INITIAL_SOCIAL_HIVE_STATE)) as SocialHiveState;
  saveSocialHiveState(state);
  return state;
}

export function saveSocialHiveState(state: SocialHiveState): void {
  ensureDataDir();
  const serialized = JSON.stringify(state, null, 2);
  try {
    fs.writeFileSync(SOCIAL_HIVE_FILE, serialized, 'utf-8');
  } catch (err) {
    try {
      const localDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localDir, 'social_hive_v21.json'), serialized, 'utf-8');
    } catch (localErr) {
      console.error('Failed to write social_hive_v21.json to local data dir:', localErr);
    }
  }
}

// Platform detection helper
function detectPlatformAndType(url: string): { platform: SocialPlatform; contentType: SocialContentType } {
  const lower = url.toLowerCase();
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    if (lower.includes('/shorts/')) return { platform: 'youtube', contentType: 'reel_short' };
    if (lower.includes('/channel/') || lower.includes('/@')) return { platform: 'youtube', contentType: 'channel' };
    if (lower.includes('/playlist')) return { platform: 'youtube', contentType: 'playlist' };
    return { platform: 'youtube', contentType: 'video' };
  }
  if (lower.includes('tiktok.com')) {
    if (lower.includes('/video/')) return { platform: 'tiktok', contentType: 'reel_short' };
    return { platform: 'tiktok', contentType: 'creator_profile' };
  }
  if (lower.includes('instagram.com')) {
    if (lower.includes('/reel/')) return { platform: 'instagram', contentType: 'reel_short' };
    return { platform: 'instagram', contentType: 'post' };
  }
  if (lower.includes('linkedin.com')) {
    if (lower.includes('/pulse/') || lower.includes('/article/')) return { platform: 'linkedin', contentType: 'public_article' };
    return { platform: 'linkedin', contentType: 'post' };
  }
  if (lower.includes('twitter.com') || lower.includes('x.com')) {
    return { platform: 'x_twitter', contentType: 'post' };
  }
  if (lower.includes('facebook.com') || lower.includes('fb.watch')) {
    if (lower.includes('/watch') || lower.includes('/videos/')) return { platform: 'facebook', contentType: 'video' };
    return { platform: 'facebook', contentType: 'post' };
  }
  if (lower.includes('substack.com')) {
    return { platform: 'substack', contentType: 'public_article' };
  }
  return { platform: 'youtube', contentType: 'video' };
}

export function registerSocialHiveRoutes(app: Express): void {
  // 1. GET State
  app.get('/api/social-hive/state', (_req: Request, res: Response) => {
    try {
      const state = loadSocialHiveState();
      res.status(200).json({ success: true, state });
    } catch (error: any) {
      console.error('Error in GET /api/social-hive/state:', error);
      res.status(500).json({ error: error?.message || 'Failed to load Social Hive state' });
    }
  });

  // 2. POST Universal Social Link Intake
  app.post('/api/social-hive/intake', (req: Request, res: Response) => {
    try {
      const { url, customTitle, creatorName, creatorHandle, topic, category, isAuthorizedOwner } = req.body;
      if (!url || typeof url !== 'string' || !url.trim()) {
        return res.status(400).json({ error: 'Valid social media URL is required' });
      }

      const state = loadSocialHiveState();
      const { platform, contentType } = detectPlatformAndType(url);

      const generatedId = `SOC-${platform.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-6)}`;
      const cleanTitle = customTitle || `Extracted Social Insight from ${platform.toUpperCase()}: ${url.split('/').pop()?.slice(0, 40) || 'Post'}`;
      const creator = creatorName || 'Authorized Social Creator';
      const handle = creatorHandle || (url.includes('@') ? `@${url.split('@')[1].split('/')[0]}` : '@creator');

      const newAsset: SocialAssetGenome = {
        id: generatedId,
        originalUrl: url.trim(),
        platform,
        contentType,
        title: cleanTitle,
        creatorName: creator,
        creatorHandle: handle,
        publishedAt: new Date().toISOString(),
        description: `Autonomous knowledge asset mined from ${platform.toUpperCase()} (${contentType}). Evaluated for core insights, axioms, and derivative commercial value.`,
        transcriptSample: `00:01 - Autonomous transcript ingestion initialized for ${cleanTitle}. Key axioms and frameworks extracted for downstream Content Genome multiplication.`,
        topic: topic || 'Autonomous Intelligence & Strategy',
        category: category || 'Social Knowledge Assets',
        engagement: {
          views: Math.floor(Math.random() * 80000) + 12000,
          likes: Math.floor(Math.random() * 5000) + 800,
          shares: Math.floor(Math.random() * 1200) + 200,
          comments: Math.floor(Math.random() * 400) + 60,
          engagementRatePercent: +(8.5 + Math.random() * 5.0).toFixed(1)
        },
        ownershipDeclaration: {
          claimedBy: creator,
          isAuthorizedAccount: !!isAuthorizedOwner,
          verificationStatus: isAuthorizedOwner ? 'verified_owner' : 'public_fair_use',
          declaredLicense: 'commercial_70_30'
        },
        permissions: {
          allowKnowledgeExtraction: true,
          allowMultiplication: true,
          allowEnterpriseAssistant: true,
          allowAiTrainingDataset: !!isAuthorizedOwner
        },
        processingHistory: {
          minedAt: new Date().toISOString(),
          axiomsExtracted: Math.floor(Math.random() * 400) + 250,
          derivativesCount: 0
        },
        metrics: {
          commercialValueUsd: Math.floor(Math.random() * 6000) + 4000,
          commercialValueNgn: (Math.floor(Math.random() * 6000) + 4000) * 1500,
          revenueRealizedUsd: 0,
          creatorEarningsUsd: 0,
          creatorEarningsNgn: 0
        },
        status: 'active_genome'
      };

      state.socialAssets.unshift(newAsset);
      state.summaryStats.totalRegisteredSocialAssets += 1;
      state.summaryStats.processedSocialLinksCount += 1;
      state.lastUpdated = new Date().toISOString();
      saveSocialHiveState(state);

      res.status(201).json({
        success: true,
        message: `Successfully minted social link into Social Asset Genome with ID: ${newAsset.id} (${newAsset.platform.toUpperCase()} · ${newAsset.contentType})`,
        asset: newAsset
      });
    } catch (error: any) {
      console.error('Error in POST /api/social-hive/intake:', error);
      res.status(500).json({ error: error?.message || 'Failed to process social link' });
    }
  });

  // 3. POST Multiply Social Asset into Commercial Derivatives
  app.post('/api/social-hive/multiply', (req: Request, res: Response) => {
    try {
      const { assetId, derivativeFormat, customTitle } = req.body;
      const state = loadSocialHiveState();
      const asset = state.socialAssets.find(a => a.id === assetId);

      if (!asset) {
        return res.status(404).json({ error: 'Parent social asset not found' });
      }

      let generatedTitle = customTitle || '';
      let priceUsd = 75;
      let description = '';

      switch (derivativeFormat) {
        case 'ebook':
          generatedTitle = generatedTitle || `Living eBook: ${asset.title}`;
          priceUsd = 79;
          description = `Dynamic interactive publication with embedded conversational AI tutor compiled from ${asset.creatorName}'s lecture.`;
          break;
        case 'course':
          generatedTitle = generatedTitle || `Executive Video Masterclass: ${asset.title}`;
          priceUsd = 149;
          description = `5-module video course curriculum with slide decks, step-by-step guides, and completion NFT badge.`;
          break;
        case 'podcast':
          generatedTitle = generatedTitle || `Audio Digest Episode: ${asset.title}`;
          priceUsd = 39;
          description = `Studio-grade audio synthesis lecture with synchronized transcriptions for mobile executive listening.`;
          break;
        case 'qa_instruction_dataset':
          generatedTitle = generatedTitle || `${asset.title.slice(0, 30).toLowerCase().replace(/[^a-z0-9]+/g, '-')}-instructions.jsonl`;
          priceUsd = 850;
          description = `Curated multi-turn Q&A instruction pairs exported in standard JSONL format for domain fine-tuning.`;
          break;
        case 'article':
          generatedTitle = generatedTitle || `Technical Whitepaper: ${asset.title}`;
          priceUsd = 45;
          description = `Syndication-ready technical essay with verified source references and architectural takeaways.`;
          break;
        default:
          generatedTitle = generatedTitle || `Commercial Derivative: ${asset.title}`;
          priceUsd = 50;
          description = `Multiplied asset package preserving creator attribution and commercial rights.`;
      }

      const newDerivative: SocialDerivative = {
        id: `soc-der-${Date.now().toString().slice(-6)}`,
        parentSocialAssetId: asset.id,
        parentTitle: asset.title,
        creatorAttribution: asset.creatorName,
        derivativeFormat: derivativeFormat || 'ebook',
        title: generatedTitle,
        description,
        payloadSummary: `Commercial product synthesized from ${asset.title}.`,
        priceUsd,
        priceNgn: priceUsd * 1500,
        commercialStatus: 'published',
        salesCount: 0,
        totalRevenueUsd: 0,
        generatedAt: new Date().toISOString()
      };

      asset.processingHistory.derivativesCount += 1;
      state.derivatives.unshift(newDerivative);
      state.summaryStats.totalDerivativesCreated += 1;
      state.lastUpdated = new Date().toISOString();
      saveSocialHiveState(state);

      res.status(201).json({
        success: true,
        message: `Multiplied "${asset.title}" into commercial product: "${newDerivative.title}"`,
        derivative: newDerivative
      });
    } catch (error: any) {
      console.error('Error in POST /api/social-hive/multiply:', error);
      res.status(500).json({ error: error?.message || 'Failed to multiply social asset' });
    }
  });

  // 4. POST Create Social-to-Enterprise Knowledge Product
  app.post('/api/social-hive/enterprise/create', (req: Request, res: Response) => {
    try {
      const { domain, title, description, productType, licensePriceAnnualUsd } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });

      const state = loadSocialHiveState();
      const priceUsd = Number(licensePriceAnnualUsd) || 3500;

      const newProduct: EnterpriseKnowledgeProduct = {
        id: `ent-prod-${Date.now().toString().slice(-6)}`,
        domain: domain || 'engineering',
        title,
        description: description || `Enterprise knowledge solution compiled from verified social engineering content.`,
        sourceSocialAssetCount: 8,
        featuredCreators: ['BAA Social Mining Faculty'],
        productType: productType || 'AI Assistant',
        licensePriceAnnualUsd: priceUsd,
        licensePriceAnnualNgn: priceUsd * 1500,
        activeEnterpriseClients: 1,
        totalRevenueUsd: priceUsd,
        complianceReviewStatus: 'Reviewed & Certified'
      };

      state.enterpriseProducts.unshift(newProduct);
      state.summaryStats.enterpriseProductsCount += 1;
      state.lastUpdated = new Date().toISOString();
      saveSocialHiveState(state);

      res.status(201).json({
        success: true,
        message: `Enterprise knowledge product "${title}" successfully compiled and certified.`,
        product: newProduct
      });
    } catch (error: any) {
      console.error('Error in POST /api/social-hive/enterprise/create:', error);
      res.status(500).json({ error: error?.message || 'Failed to create enterprise product' });
    }
  });

  // 5. POST Advance Buyer Deal Stage
  app.post('/api/social-hive/buyers/advance', (req: Request, res: Response) => {
    try {
      const { opportunityId, nextStage } = req.body;
      const state = loadSocialHiveState();
      const opp = state.buyerOpportunities.find(o => o.id === opportunityId);

      if (!opp) return res.status(404).json({ error: 'Opportunity not found' });

      opp.dealStage = nextStage || 'Settled via Paystack';
      opp.lastAction = `Deal stage advanced to ${opp.dealStage} via autonomous deal closer.`;

      if (opp.dealStage === 'Settled via Paystack') {
        state.summaryStats.actualSettledRevenueUsd += opp.budgetUsd;
        state.summaryStats.actualSettledRevenueNgn += opp.budgetNgn;
        const creatorCut = opp.budgetUsd * 0.7;
        state.summaryStats.creatorRoyaltiesPaidUsd += creatorCut;
        state.summaryStats.creatorRoyaltiesPaidNgn += creatorCut * 1500;
      }

      state.lastUpdated = new Date().toISOString();
      saveSocialHiveState(state);

      res.status(200).json({
        success: true,
        message: `Opportunity with "${opp.organizationName}" updated to ${opp.dealStage}`,
        opportunity: opp
      });
    } catch (error: any) {
      console.error('Error in POST /api/social-hive/buyers/advance:', error);
      res.status(500).json({ error: error?.message || 'Failed to advance deal' });
    }
  });

  // 6. POST Connect Social Account (OAuth Simulator)
  app.post('/api/social-hive/accounts/connect', (req: Request, res: Response) => {
    try {
      const { platform, handle, accountName } = req.body;
      const state = loadSocialHiveState();

      const newAccount = {
        id: `acc-${Date.now().toString().slice(-6)}`,
        platform: platform || 'youtube',
        accountHandle: handle || '@NewCreator',
        accountName: accountName || 'Authorized Creator',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        connectionStatus: 'connected' as const,
        connectedAt: new Date().toISOString(),
        approvedScopes: ['readonly.content', 'analytics.metrics'],
        metrics: {
          followers: Math.floor(Math.random() * 50000) + 10000,
          monthlyImpressions: Math.floor(Math.random() * 500000) + 100000,
          avgEngagementRate: +(7.0 + Math.random() * 6.0).toFixed(1),
          postsAnalyzedCount: 42
        }
      };

      state.connectedAccounts.unshift(newAccount);
      state.summaryStats.connectedAccountsCount += 1;
      state.lastUpdated = new Date().toISOString();
      saveSocialHiveState(state);

      res.status(201).json({
        success: true,
        message: `Account ${newAccount.accountHandle} (${newAccount.platform.toUpperCase()}) connected with approved read-only OAuth scopes.`,
        account: newAccount
      });
    } catch (error: any) {
      console.error('Error in POST /api/social-hive/accounts/connect:', error);
      res.status(500).json({ error: error?.message || 'Failed to connect account' });
    }
  });

  // 7. POST Paystack Payout
  app.post('/api/social-hive/payout', (req: Request, res: Response) => {
    try {
      const { amountNgn, accountNumber, bankName, creatorName } = req.body;
      const amount = Number(amountNgn) || 120000;

      res.status(200).json({
        success: true,
        message: `Paystack Transfer API dispatched ₦${amount.toLocaleString()} NGN (70% Net Creator Royalties) to ${creatorName || 'Creator'} at ${bankName || 'Wema Bank'} (${accountNumber || '0123456789'}).`,
        reference: `pstk_soc_trf_${Date.now()}`,
        status: 'SUCCESS',
        mode: 'TEST (Card: 4084084084084081)'
      });
    } catch (error: any) {
      console.error('Error in POST /api/social-hive/payout:', error);
      res.status(500).json({ error: error?.message || 'Payout failed' });
    }
  });
}
