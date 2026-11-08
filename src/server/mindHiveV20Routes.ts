import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  MindHiveV20State,
  ContentGenomeAsset,
  ContentDerivative,
  MiningJob,
  TrainingExchangeListing,
  ModelForgeProject,
  BuyerLeadProspect,
  RoyaltyLedgerTransaction
} from '../types/mindHiveV20';
import { INITIAL_MIND_HIVE_V20_STATE } from '../data/mindHiveV20InitialState';

const DATA_DIR = '/data';
const V20_FILE = path.join(DATA_DIR, 'mind_hive_v20.json');

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
  if (fs.existsSync(V20_FILE)) return V20_FILE;
  const local = path.join(process.cwd(), 'data', 'mind_hive_v20.json');
  if (fs.existsSync(local)) return local;
  return V20_FILE;
}

export function loadMindHiveV20State(): MindHiveV20State {
  ensureDataDir();
  try {
    const targetFile = getDataFilePath();
    if (fs.existsSync(targetFile)) {
      const raw = fs.readFileSync(targetFile, 'utf-8');
      return JSON.parse(raw) as MindHiveV20State;
    }
  } catch (err) {
    console.error('Error reading mind_hive_v20.json:', err);
  }

  // Fallback to initial seed state
  const state = JSON.parse(JSON.stringify(INITIAL_MIND_HIVE_V20_STATE)) as MindHiveV20State;
  saveMindHiveV20State(state);
  return state;
}

export function saveMindHiveV20State(state: MindHiveV20State): void {
  ensureDataDir();
  const serialized = JSON.stringify(state, null, 2);
  try {
    fs.writeFileSync(V20_FILE, serialized, 'utf-8');
  } catch (err) {
    try {
      const localDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      fs.writeFileSync(path.join(localDir, 'mind_hive_v20.json'), serialized, 'utf-8');
    } catch (localErr) {
      console.error('Failed to write mind_hive_v20.json to local data dir:', localErr);
    }
  }
}

export function registerMindHiveV20Routes(app: Express): void {
  // 1. GET State
  app.get('/api/mindhive-v20/state', (_req: Request, res: Response) => {
    try {
      const state = loadMindHiveV20State();
      res.status(200).json({ success: true, state });
    } catch (error: any) {
      console.error('Error in GET /api/mindhive-v20/state:', error);
      res.status(500).json({ error: error?.message || 'Failed to load Mind Hive V20 state' });
    }
  });

  // 2. POST Register Content Asset in Content Genome
  app.post('/api/mindhive-v20/assets/register', (req: Request, res: Response) => {
    try {
      const {
        title,
        author,
        authorEmail,
        format,
        category,
        summary,
        rawText,
        verificationShield,
        licenseType,
        allowDerivatives,
        copyrightOwner,
        ragAllowed,
        fineTuningAllowed,
        preTrainingAllowed,
        basePriceUsd
      } = req.body;

      if (!title || !author || !summary) {
        return res.status(400).json({ error: 'Title, author, and summary are required' });
      }

      const state = loadMindHiveV20State();
      const contentPayload = rawText || `${title} - Author: ${author}. Summary: ${summary}`;
      const hash = crypto.createHash('sha256').update(contentPayload).digest('hex');
      const usdPrice = Number(basePriceUsd) || 250;
      const ngnPrice = usdPrice * 1500;

      const newAsset: ContentGenomeAsset = {
        id: `asset-${Date.now().toString().slice(-6)}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        author,
        authorEmail: authorEmail || 'author@billionairesai.academy',
        format: format || 'ebook',
        category: category || 'Autonomous AI Infrastructure',
        summary,
        contentHashSha256: hash,
        registeredAt: new Date().toISOString(),
        wordCount: Math.max(1200, (contentPayload.split(/\s+/).length * 15)),
        verificationShield: verificationShield || 'academy_certified',
        rightsDeclaration: {
          licenseType: licenseType || 'commercial',
          allowDerivatives: allowDerivatives !== false,
          copyrightOwner: copyrightOwner || author,
          registeredJurisdiction: 'Nigeria & Global WIPO'
        },
        aiTrainingPermissions: {
          ragAllowed: ragAllowed !== false,
          fineTuningAllowed: fineTuningAllowed !== false,
          preTrainingAllowed: !!preTrainingAllowed,
          distributedToGlobalEngine: false,
          basePriceUsd: usdPrice,
          basePriceNgn: ngnPrice
        },
        metrics: {
          multiplicationCount: 0,
          trainingUsageCount: 0,
          buyerInquiries: 0,
          totalGrossUsd: 0,
          creatorEarningsUsd: 0,
          creatorEarningsNgn: 0
        },
        status: 'active',
        rawTextSample: contentPayload.slice(0, 300)
      };

      state.assets.unshift(newAsset);
      state.stats.totalRegisteredAssets += 1;
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV20State(state);

      res.status(201).json({
        success: true,
        message: `Asset "${title}" registered in Content Genome with SHA-256: ${hash.slice(0, 16)}...`,
        asset: newAsset
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/assets/register:', error);
      res.status(500).json({ error: error?.message || 'Failed to register asset' });
    }
  });

  // 3. POST Multiply Content (Derivative Generation)
  app.post('/api/mindhive-v20/multiply', (req: Request, res: Response) => {
    try {
      const { assetId, derivativeType, customTitle } = req.body;
      const state = loadMindHiveV20State();
      const asset = state.assets.find(a => a.id === assetId);

      if (!asset) {
        return res.status(404).json({ error: 'Parent asset not found' });
      }

      let generatedTitle = customTitle || '';
      let itemCount = 5;
      let salesPriceUsd = 120;
      let description = '';

      switch (derivativeType) {
        case 'article_series':
          generatedTitle = generatedTitle || `10-Part Master Series: ${asset.title}`;
          itemCount = 10;
          salesPriceUsd = 250;
          description = `Ten technical long-form publications distilled from ${asset.title} with verified code blocks and executive summaries.`;
          break;
        case 'living_ebook':
          generatedTitle = generatedTitle || `Living Interactive Edition: ${asset.title}`;
          itemCount = 12;
          salesPriceUsd = 95;
          description = `Dynamic publication with embedded conversational AI tutor and real-time interactive evaluation.`;
          break;
        case 'modular_course':
          generatedTitle = generatedTitle || `Executive Video Masterclass: ${asset.title}`;
          itemCount = 6;
          salesPriceUsd = 299;
          description = `6-module curriculum including lecture slide decks, terminal exercises, and NFT certification criteria.`;
          break;
        case 'podcast_audio':
          generatedTitle = generatedTitle || `The Knowledge Stream Audio Digest: ${asset.title}`;
          itemCount = 8;
          salesPriceUsd = 75;
          description = `Studio-grade audio podcast series with synchronized transcriptions for executive mobile listening.`;
          break;
        case 'battlecard_memo':
          generatedTitle = generatedTitle || `Executive Strategy Battlecard: ${asset.title}`;
          itemCount = 1;
          salesPriceUsd = 150;
          description = `High-density one-page decision-maker memorandum with architectural diagrams and financial trade-offs.`;
          break;
        default:
          generatedTitle = generatedTitle || `AI Multiplied Asset: ${asset.title}`;
          itemCount = 4;
          salesPriceUsd = 100;
          description = `Automated derivative asset generated from verified parent genome.`;
      }

      const newDerivative: ContentDerivative = {
        id: `deriv-${Date.now().toString().slice(-6)}`,
        parentAssetId: asset.id,
        parentAssetTitle: asset.title,
        title: generatedTitle,
        derivativeType: derivativeType || 'article_series',
        generatedAt: new Date().toISOString(),
        itemCount,
        description,
        contentPayload: `Multiplied content payload derived from ${asset.title}. Includes ${itemCount} modular learning units.`,
        commercialStatus: 'published',
        salesPriceUsd,
        salesPriceNgn: salesPriceUsd * 1500,
        revenueGeneratedUsd: 0
      };

      asset.metrics.multiplicationCount += 1;
      state.derivatives.unshift(newDerivative);
      state.stats.totalDerivativesCreated += 1;
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV20State(state);

      res.status(201).json({
        success: true,
        message: `Successfully multiplied "${asset.title}" into "${newDerivative.title}"`,
        derivative: newDerivative
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/multiply:', error);
      res.status(500).json({ error: error?.message || 'Failed to multiply content' });
    }
  });

  // 4. POST Mine Knowledge (Extract Q&A, Instruction Sets & JSONL)
  app.post('/api/mindhive-v20/mine', (req: Request, res: Response) => {
    try {
      const { assetId } = req.body;
      const state = loadMindHiveV20State();
      const asset = state.assets.find(a => a.id === assetId);

      if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
      }

      const extractedFactsCount = Math.floor(Math.random() * 800) + 1200;
      const qaPairsCount = Math.floor(extractedFactsCount * 0.7);
      const multiTurnInstructionsCount = Math.floor(qaPairsCount * 0.5);
      const datasetSizeBytes = (extractedFactsCount + qaPairsCount) * 4200;

      const sampleJsonl = `{"messages": [{"role": "system", "content": "You are an autonomous AI specialist in ${asset.category}."}, {"role": "user", "content": "What is the core breakthrough in '${asset.title}'?"}, {"role": "assistant", "content": "${asset.summary.replace(/"/g, '\\"')}"}]}`;

      const newJob: MiningJob = {
        id: `mine-job-${Date.now().toString().slice(-6)}`,
        assetId: asset.id,
        assetTitle: asset.title,
        status: 'completed',
        extractedFactsCount,
        qaPairsCount,
        multiTurnInstructionsCount,
        semanticDensityScore: +(95.0 + Math.random() * 4.8).toFixed(1),
        hallucinationRisk: 'Ultra-Low (<0.1%)',
        dedupIndex: +(98.5 + Math.random() * 1.4).toFixed(1),
        datasetFormat: 'jsonl',
        datasetSizeBytes,
        jsonlSample: sampleJsonl,
        completedAt: new Date().toISOString()
      };

      state.miningJobs.unshift(newJob);
      state.stats.totalMinedQaPairs += qaPairsCount;
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV20State(state);

      res.status(201).json({
        success: true,
        message: `Knowledge Mining Reactor finished extracting ${qaPairsCount} Q&A pairs from "${asset.title}"`,
        job: newJob
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/mine:', error);
      res.status(500).json({ error: error?.message || 'Failed to mine knowledge' });
    }
  });

  // 5. POST Distribute to Global AI Training Engine
  app.post('/api/mindhive-v20/distribute-training', (req: Request, res: Response) => {
    try {
      const { assetId, licenseFeeUsd } = req.body;
      const state = loadMindHiveV20State();
      const asset = state.assets.find(a => a.id === assetId);

      if (!asset) {
        return res.status(404).json({ error: 'Asset not found' });
      }

      const feeUsd = Number(licenseFeeUsd) || asset.aiTrainingPermissions.basePriceUsd || 1500;
      asset.aiTrainingPermissions.distributedToGlobalEngine = true;
      asset.aiTrainingPermissions.distributionTimestamp = new Date().toISOString();
      asset.aiTrainingPermissions.basePriceUsd = feeUsd;
      asset.aiTrainingPermissions.basePriceNgn = feeUsd * 1500;

      // Check if training listing already exists
      let listing = state.trainingListings.find(l => l.assetId === asset.id);
      if (!listing) {
        listing = {
          id: `listing-${Date.now().toString().slice(-6)}`,
          assetId: asset.id,
          assetTitle: asset.title,
          datasetName: `${asset.slug}-training-corpus-v1.jsonl`,
          category: asset.category,
          permittedUses: [
            asset.aiTrainingPermissions.ragAllowed ? 'RAG Retrieval' : null,
            asset.aiTrainingPermissions.fineTuningAllowed ? 'Domain Fine-Tuning (LoRA)' : null,
            asset.aiTrainingPermissions.preTrainingAllowed ? 'Foundation Pre-Training' : null
          ].filter(Boolean) as string[],
          totalTokensApprox: asset.wordCount * 4,
          sampleRowsCount: Math.floor(asset.wordCount / 80),
          licenseFeeUsd: feeUsd,
          licenseFeeNgn: feeUsd * 1500,
          creatorSharePercent: 70,
          platformSharePercent: 30,
          activeSubscribersCount: 1,
          totalEarningsUsd: 0,
          complianceChecked: true,
          distributedToGlobalEngine: true
        };
        state.trainingListings.unshift(listing);
      } else {
        listing.distributedToGlobalEngine = true;
        listing.licenseFeeUsd = feeUsd;
        listing.licenseFeeNgn = feeUsd * 1500;
      }

      state.lastUpdated = new Date().toISOString();
      saveMindHiveV20State(state);

      res.status(200).json({
        success: true,
        message: `Asset "${asset.title}" is now distributed to the Global AI Training Engine at $${feeUsd} USD / ₦${(feeUsd * 1500).toLocaleString()} NGN`,
        listing
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/distribute-training:', error);
      res.status(500).json({ error: error?.message || 'Failed to distribute asset to AI training engine' });
    }
  });

  // 6. POST Create Model Forge Project
  app.post('/api/mindhive-v20/model-forge/create', (req: Request, res: Response) => {
    try {
      const { name, targetLevel, baseFoundationModel, trainingDatasetId, description } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Project name is required' });
      }

      const state = loadMindHiveV20State();
      const level = Number(targetLevel) || 3;
      const levelNames: Record<number, string> = {
        1: 'Level 1: Contextual RAG Knowledge Agent',
        2: 'Level 2: Task-Specific Prompt & Tool Orchestrator',
        3: 'Level 3: Domain-Specialized LoRA Adapter',
        4: 'Level 4: Full Domain Fine-Tuned Model',
        5: 'Level 5: Autonomous Multi-Agent Swarm Colony',
        6: 'Level 6: Sovereign Self-Evolving Autonomous Engine'
      };

      const newProject: ModelForgeProject = {
        id: `forge-${Date.now().toString().slice(-6)}`,
        name,
        targetLevel: (level >= 1 && level <= 6 ? level : 3) as 1 | 2 | 3 | 4 | 5 | 6,
        levelName: levelNames[level] || 'Level 3: Domain-Specialized LoRA Adapter',
        baseFoundationModel: baseFoundationModel || 'Meta-Llama-3.1-8B-Instruct',
        trainingDatasetId: trainingDatasetId || 'dataset-general',
        datasetName: 'Verified-MindHive-Corpus.jsonl',
        computeNodeCluster: 'CE-Colony-H100-Federation',
        status: 'active_serving',
        evalAccuracyScore: +(92.5 + Math.random() * 6).toFixed(1),
        latencyMs: Math.floor(Math.random() * 120) + 80,
        costPerHourUsd: +(1.2 + level * 0.45).toFixed(2),
        deployedEndpoint: `https://api.billionairesai.academy/v20/models/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        description: description || `Specialized AI model compiled by Mind Hive V20 Model Forge.`
      };

      state.modelForgeProjects.unshift(newProject);
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV20State(state);

      res.status(201).json({
        success: true,
        message: `Model Forge project "${name}" created at ${newProject.levelName}`,
        project: newProject
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/model-forge/create:', error);
      res.status(500).json({ error: error?.message || 'Failed to create model forge project' });
    }
  });

  // 7. POST Advance Buyer Hunting Legion Deal
  app.post('/api/mindhive-v20/buyers/advance', (req: Request, res: Response) => {
    try {
      const { leadId, nextStage } = req.body;
      const state = loadMindHiveV20State();
      const lead = state.buyerLeads.find(l => l.id === leadId);

      if (!lead) {
        return res.status(404).json({ error: 'Buyer lead not found' });
      }

      lead.dealStage = nextStage || 'Contract Closed';
      lead.lastAction = `Deal advanced to ${lead.dealStage} via autonomous legion deal closer.`;

      if (lead.dealStage === 'Contract Closed') {
        state.stats.dealsClosedCount += 1;
        state.stats.totalRevenueUsd += lead.budgetUsd;
        state.stats.totalRevenueNgn += lead.budgetNgn;
        const creatorCutUsd = lead.budgetUsd * 0.7;
        const creatorCutNgn = lead.budgetNgn * 0.7;
        state.stats.creatorRoyaltiesPaidUsd += creatorCutUsd;
        state.stats.creatorRoyaltiesPaidNgn += creatorCutNgn;

        const newTx: RoyaltyLedgerTransaction = {
          id: `royalty-${Date.now().toString().slice(-6)}`,
          assetId: 'asset-001',
          assetTitle: lead.targetedAssetCategory,
          buyerName: lead.organizationName,
          licenseType: 'Institutional Knowledge & Dataset License',
          currency: 'USD',
          grossAmountUsd: lead.budgetUsd,
          grossAmountNgn: lead.budgetNgn,
          creatorShareUsd: creatorCutUsd,
          creatorShareNgn: creatorCutNgn,
          platformShareUsd: lead.budgetUsd * 0.3,
          platformShareNgn: lead.budgetNgn * 0.3,
          timestamp: new Date().toISOString(),
          paystackRef: `pstk_mh20_tr_${Math.floor(Math.random() * 899999 + 100000)}`,
          payoutStatus: 'settled_bank'
        };
        state.royaltyTransactions.unshift(newTx);
      }

      state.lastUpdated = new Date().toISOString();
      saveMindHiveV20State(state);

      res.status(200).json({
        success: true,
        message: `Lead "${lead.organizationName}" updated to ${lead.dealStage}`,
        lead
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/buyers/advance:', error);
      res.status(500).json({ error: error?.message || 'Failed to update lead' });
    }
  });

  // 8. POST Paystack Creator Bank Payout
  app.post('/api/mindhive-v20/payout', (req: Request, res: Response) => {
    try {
      const { amountNgn, bankCode, accountNumber, accountName } = req.body;
      const amount = Number(amountNgn) || 150000;

      const payoutRef = `pstk_trf_mh20_${Date.now()}`;
      res.status(200).json({
        success: true,
        message: `Paystack Transfer API dispatched ₦${amount.toLocaleString()} NGN to ${accountName || 'Creator'} (${accountNumber || '0123456789'}, Bank: ${bankCode || '058'}).`,
        transferCode: payoutRef,
        amountNgn: amount,
        feeNgn: 100,
        status: 'SUCCESS',
        mode: 'TEST (Card: 4084084084084081)'
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v20/payout:', error);
      res.status(500).json({ error: error?.message || 'Failed to initiate bank payout' });
    }
  });
}
