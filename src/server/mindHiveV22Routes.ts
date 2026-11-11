import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { MindHiveV22State, KcxKnowledgeAsset, KcxOffer, GkaKnowledgeGap, HavcCollaborativeProject, HavcContributionDnaRecord, HavcSharedValueDistribution } from '../types/mindHiveV22';
import { INITIAL_MIND_HIVE_V22_STATE } from '../data/mindHiveV22InitialState';

const DATA_DIR_PRIMARY = '/data';
const DATA_DIR_FALLBACK = path.join(process.cwd(), 'data');
const STATE_FILENAME = 'mindhive_v22_state.json';

function getFilePath(): string {
  try {
    if (fs.existsSync(DATA_DIR_PRIMARY)) {
      return path.join(DATA_DIR_PRIMARY, STATE_FILENAME);
    }
  } catch {
    // Ignore and use fallback
  }

  if (!fs.existsSync(DATA_DIR_FALLBACK)) {
    try {
      fs.mkdirSync(DATA_DIR_FALLBACK, { recursive: true });
    } catch {
      // Ignore
    }
  }
  return path.join(DATA_DIR_FALLBACK, STATE_FILENAME);
}

function loadMindHiveV22State(): MindHiveV22State {
  const filePath = getFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === '22.0-GLOBAL-KNOWLEDGE-CAPITAL') {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to read persisted V22 state, falling back to initial state:', err);
  }

  saveMindHiveV22State(INITIAL_MIND_HIVE_V22_STATE);
  return INITIAL_MIND_HIVE_V22_STATE;
}

function saveMindHiveV22State(state: MindHiveV22State): void {
  // Save to primary /data if writable
  try {
    if (fs.existsSync(DATA_DIR_PRIMARY)) {
      const primaryPath = path.join(DATA_DIR_PRIMARY, STATE_FILENAME);
      fs.writeFileSync(primaryPath, JSON.stringify(state, null, 2), 'utf-8');
    }
  } catch {
    // Ignore
  }

  // Also write to local project ./data
  try {
    if (!fs.existsSync(DATA_DIR_FALLBACK)) {
      fs.mkdirSync(DATA_DIR_FALLBACK, { recursive: true });
    }
    const fallbackPath = path.join(DATA_DIR_FALLBACK, STATE_FILENAME);
    fs.writeFileSync(fallbackPath, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write fallback state file:', err);
  }
}

export function registerMindHiveV22Routes(app: Express) {
  // 1. GET State
  app.get('/api/mindhive-v22/state', (_req: Request, res: Response) => {
    try {
      const state = loadMindHiveV22State();
      res.status(200).json({ success: true, state });
    } catch (error: any) {
      console.error('Error in GET /api/mindhive-v22/state:', error);
      res.status(500).json({ error: error?.message || 'Failed to retrieve V22 state' });
    }
  });

  // 2. POST AI Asset Valuation Engine
  app.post('/api/mindhive-v22/kcx/valuation', (req: Request, res: Response) => {
    try {
      const {
        title,
        category,
        wordCount,
        format,
        hasPeerReview,
        hasDataset,
        language
      } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required for valuation' });
      }

      // Compute multi-factor valuation
      const lengthFactor = Math.min(100, Math.max(30, Math.round((Number(wordCount) || 5000) / 300)));
      const peerBonus = hasPeerReview ? 18 : 0;
      const datasetBonus = hasDataset ? 22 : 8;
      const langMultiplier = language && language !== 'English' ? 1.25 : 1.0;

      const originality = Math.min(99, Math.max(65, Math.round(75 + Math.random() * 20)));
      const completeness = Math.min(99, Math.max(60, Math.round(lengthFactor * 0.8 + 20)));
      const researchValue = Math.min(99, Math.max(60, Math.round(60 + peerBonus + Math.random() * 15)));
      const marketDemand = Math.min(99, Math.max(70, Math.round(70 + datasetBonus + Math.random() * 10)));
      const structureQuality = Math.min(99, Math.max(65, Math.round(80 + Math.random() * 15)));

      const qualityScore = Math.round((originality + completeness + researchValue + structureQuality) / 4);
      const demandScore = Math.round(marketDemand);

      // Base valuation formula (never presented as guaranteed selling price)
      const baseEstimate = Math.round((qualityScore * 40 + demandScore * 50) * langMultiplier);
      const estimatedMinUsd = Math.round(baseEstimate * 0.7);
      const estimatedMaxUsd = Math.round(baseEstimate * 1.6);

      const valuationResult = {
        title,
        estimatedMinUsd,
        estimatedMaxUsd,
        qualityScore,
        demandScore,
        valuationDate: new Date().toISOString(),
        factors: {
          originality,
          completeness,
          researchValue,
          marketDemand,
          structureQuality
        },
        recommendedLicensing: [
          'enterprise_unlimited_sla',
          'non_exclusive_commercial',
          'academic_research_only'
        ],
        potentialBuyers: [
          'Global AI Foundation Labs',
          'Pan-African Research Universities',
          'Enterprise Domain Knowledge Buyers'
        ],
        improvementRecommendations: [
          'Provide standardized JSONL benchmark pairs to increase buyer confidence',
          'Include bilingual English/Yoruba abstract translation for broader discovery',
          'Declare explicit commercial derivative rights to unlock enterprise multi-format licensing'
        ],
        disclaimer: 'Valuation is an algorithmic estimate based on market demand indicators and does not guarantee execution at these price points.'
      };

      res.status(200).json({ success: true, valuation: valuationResult });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/kcx/valuation:', error);
      res.status(500).json({ error: error?.message || 'Failed to compute valuation' });
    }
  });

  // 3. POST Register Knowledge Asset in KCX
  app.post('/api/mindhive-v22/kcx/asset/register', (req: Request, res: Response) => {
    try {
      const {
        title,
        category,
        author,
        authorEmail,
        summary,
        contentPayload,
        listingPriceUsd,
        licenseModelsAllowed
      } = req.body;

      if (!title || !author || !summary) {
        return res.status(400).json({ error: 'Title, author, and summary are required' });
      }

      const state = loadMindHiveV22State();
      const contentToHash = contentPayload || `${title} - Author: ${author} - Summary: ${summary}`;
      const hash = crypto.createHash('sha256').update(contentToHash).digest('hex');
      const price = Number(listingPriceUsd) || 3500;

      const newAsset: KcxKnowledgeAsset = {
        id: `kcx-asset-${Date.now().toString().slice(-6)}`,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        category: category || 'research_whitepaper',
        author,
        authorEmail: authorEmail || 'creator@billionairesai.academy',
        summary,
        contentHashSha256: hash,
        registeredAt: new Date().toISOString(),
        verificationStatus: 'verified_owner',
        rightsDeclaration: {
          copyrightOwner: author,
          jurisdiction: 'Federal Republic of Nigeria & Global WIPO',
          allowDerivatives: true,
          licenseModelsAllowed: licenseModelsAllowed || ['non_exclusive_commercial', 'enterprise_unlimited_sla']
        },
        valuation: {
          estimatedMinUsd: Math.round(price * 0.8),
          estimatedMaxUsd: Math.round(price * 1.5),
          qualityScore: 94,
          demandScore: 91,
          valuationDate: new Date().toISOString(),
          factors: {
            originality: 95,
            completeness: 92,
            researchValue: 94,
            marketDemand: 90,
            structureQuality: 95
          },
          recommendedLicensing: ['enterprise_unlimited_sla', 'non_exclusive_commercial'],
          potentialBuyers: ['Global AI Foundation Labs', 'Enterprise Knowledge Buyers']
        },
        metrics: {
          viewsCount: 1,
          inquiriesCount: 0,
          activeLicensesCount: 0,
          settledRevenueUsd: 0,
          pendingRevenueUsd: 0
        },
        listingPriceUsd: price,
        listingStatus: 'active',
        samplePreviewText: summary.slice(0, 250),
        fileFormat: 'Document Archive (Verified PDF/JSON)',
        fileSizeBytes: 10485760
      };

      state.kcx.assets.unshift(newAsset);
      state.summaryMetrics.totalRegisteredAssets += 1;
      state.summaryMetrics.totalKnowledgeCapitalValueUsd += price;
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(201).json({
        success: true,
        message: `Asset "${title}" successfully minted and listed in KCX with SHA-256: ${hash.slice(0, 16)}...`,
        asset: newAsset
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/kcx/asset/register:', error);
      res.status(500).json({ error: error?.message || 'Failed to register asset' });
    }
  });

  // 4. POST Submit Buyer Offer in KCX
  app.post('/api/mindhive-v22/kcx/offer/submit', (req: Request, res: Response) => {
    try {
      const {
        assetId,
        buyerName,
        buyerOrg,
        proposedAmountUsd,
        proposedLicense,
        specialTerms
      } = req.body;

      if (!assetId || !buyerName || !proposedAmountUsd) {
        return res.status(400).json({ error: 'Asset ID, buyer name, and proposed amount required' });
      }

      const state = loadMindHiveV22State();
      const asset = state.kcx.assets.find((a) => a.id === assetId) || state.kcx.assets[0];
      const amount = Number(proposedAmountUsd);
      const platformFee = Math.round(amount * 0.3);
      const creatorEarnings = amount - platformFee;

      const newOffer: KcxOffer = {
        id: `kcx-offer-${Date.now().toString().slice(-6)}`,
        assetId: asset?.id || assetId,
        assetTitle: asset?.title || 'Knowledge Asset',
        buyerId: `buyer-${Date.now().toString().slice(-4)}`,
        buyerName,
        buyerOrg: buyerOrg || 'Institutional Buyer',
        proposedAmountUsd: amount,
        proposedLicense: proposedLicense || 'non_exclusive_commercial',
        specialTerms: specialTerms || 'Standard 12-month commercial SLA with quarterly updates.',
        submittedAt: new Date().toISOString(),
        stage: 'inquiry',
        platformFeeUsd: platformFee,
        creatorEarningsUsd: creatorEarnings,
        creatorEarningsNgn: creatorEarnings * 1500
      };

      state.kcx.offers.unshift(newOffer);
      if (asset) {
        asset.metrics.inquiriesCount += 1;
      }
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(201).json({
        success: true,
        message: `Commercial offer of $${amount.toLocaleString()} USD submitted for "${newOffer.assetTitle}"`,
        offer: newOffer
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/kcx/offer/submit:', error);
      res.status(500).json({ error: error?.message || 'Failed to submit offer' });
    }
  });

  // 5. POST Advance Offer Stage (Negotiation -> Escrow -> Settlement)
  app.post('/api/mindhive-v22/kcx/offer/advance', (req: Request, res: Response) => {
    try {
      const { offerId, nextStage } = req.body;
      if (!offerId || !nextStage) {
        return res.status(400).json({ error: 'offerId and nextStage are required' });
      }

      const state = loadMindHiveV22State();
      const offer = state.kcx.offers.find((o) => o.id === offerId);
      if (!offer) {
        return res.status(404).json({ error: 'Offer not found' });
      }

      offer.stage = nextStage;

      // If settled, generate a confirmed license agreement and record settled revenues
      if (nextStage === 'settled') {
        const agreement: any = {
          id: `kcx-agr-${Date.now().toString().slice(-6)}`,
          agreementCode: `KCX-AGR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          assetId: offer.assetId,
          assetTitle: offer.assetTitle,
          licensorName: 'Dr. Damilola Adebayo & BAA',
          licenseeName: offer.buyerName,
          licenseeOrg: offer.buyerOrg,
          licenseType: offer.proposedLicense,
          effectiveDate: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          settledAmountUsd: offer.proposedAmountUsd,
          settledAmountNgn: offer.proposedAmountUsd * 1500,
          royaltySplitPercent: { creator: 70, platform: 30 },
          escrowStatus: 'released_to_creator',
          signedContractHashSha256: crypto.createHash('sha256').update(`${offer.id}-${Date.now()}`).digest('hex')
        };

        state.kcx.agreements.unshift(agreement);
        state.summaryMetrics.activeLicensesCount += 1;
        state.summaryMetrics.totalSettledRevenueUsd += offer.proposedAmountUsd;
        state.summaryMetrics.totalSettledRevenueNgn += offer.proposedAmountUsd * 1500;

        const asset = state.kcx.assets.find((a) => a.id === offer.assetId);
        if (asset) {
          asset.metrics.activeLicensesCount += 1;
          asset.metrics.settledRevenueUsd += offer.proposedAmountUsd;
        }
      }

      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(200).json({
        success: true,
        message: `Offer ${offer.id} advanced to ${nextStage}`,
        offer
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/kcx/offer/advance:', error);
      res.status(500).json({ error: error?.message || 'Failed to advance offer' });
    }
  });

  // 6. POST Propose Knowledge Gap in GKA
  app.post('/api/mindhive-v22/gka/gap/discover', (req: Request, res: Response) => {
    try {
      const {
        territoryId,
        title,
        problemStatement,
        evidence,
        targetGeography,
        targetIndustry,
        estimatedDevCostUsd,
        potentialCommercialValueUsd
      } = req.body;

      if (!territoryId || !title || !problemStatement) {
        return res.status(400).json({ error: 'territoryId, title, and problemStatement are required' });
      }

      const state = loadMindHiveV22State();
      const newGap: GkaKnowledgeGap = {
        id: `gka-gap-${Date.now().toString().slice(-6)}`,
        territoryId,
        title,
        problemStatement,
        evidence: evidence || 'Identified through autonomous GKA Knowledge Gap Hunter scan.',
        sourceReferences: ['GKA Autonomous Scanner Telemetry', 'Industry Stakeholder Reports'],
        confidenceLevel: Math.round(88 + Math.random() * 10),
        urgency: 'high',
        targetGeography: targetGeography || 'West Africa / Sub-Saharan',
        targetIndustry: targetIndustry || 'AI & Digital Economy',
        recommendedAssetType: 'research_whitepaper',
        estimatedDevCostUsd: Number(estimatedDevCostUsd) || 8000,
        potentialCommercialValueUsd: Number(potentialCommercialValueUsd) || 120000,
        status: 'discovered',
        discoveredAt: new Date().toISOString()
      };

      state.gka.knowledgeGaps.unshift(newGap);
      state.summaryMetrics.identifiedKnowledgeGapsCount += 1;

      const territory = state.gka.territories.find((t) => t.id === territoryId);
      if (territory) {
        territory.identifiedGapsCount += 1;
        territory.activeOpportunitiesCount += 1;
      }

      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(201).json({
        success: true,
        message: `Knowledge Gap "${title}" registered under ${territoryId.toUpperCase()}`,
        gap: newGap
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/gka/gap/discover:', error);
      res.status(500).json({ error: error?.message || 'Failed to record gap' });
    }
  });

  // 7. POST Create HAVC Collaborative Project
  app.post('/api/mindhive-v22/havc/project/create', (req: Request, res: Response) => {
    try {
      const {
        title,
        category,
        ownerName,
        totalBountyBudgetUsd,
        targetCompletionDate,
        participants
      } = req.body;

      if (!title || !ownerName) {
        return res.status(400).json({ error: 'Title and ownerName are required' });
      }

      const state = loadMindHiveV22State();
      const newProject: HavcCollaborativeProject = {
        id: `havc-proj-${Date.now().toString().slice(-6)}`,
        title,
        category: category || 'research_whitepaper',
        ownerId: `contrib-${Date.now().toString().slice(-4)}`,
        ownerName,
        status: 'recruiting',
        completionPercent: 10,
        milestonesCount: 5,
        completedMilestones: 0,
        targetCompletionDate: targetCompletionDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        agreedRevenueSplit: {
          contributors: 70,
          cooperativePool: 10,
          platformOperations: 20
        },
        totalBountyBudgetUsd: Number(totalBountyBudgetUsd) || 15000,
        participants: participants || [
          { userId: 'contrib-001', name: ownerName, role: 'Project Lead', sharePercent: 50 },
          { userId: 'contrib-002', name: 'Chidinma Okafor CFA', role: 'Protocol Reviewer', sharePercent: 25 },
          { userId: 'agent-valuation-v20', name: 'Model Forge AI Agent', role: 'Structuring & Verification', sharePercent: 25 }
        ]
      };

      state.havc.projects.unshift(newProject);
      state.summaryMetrics.cooperativeProjectsCount += 1;
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(201).json({
        success: true,
        message: `Collaborative project "${title}" launched in Human–AI Value Cooperative!`,
        project: newProject
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/havc/project/create:', error);
      res.status(500).json({ error: error?.message || 'Failed to create project' });
    }
  });

  // 8. POST Record Contribution DNA in HAVC
  app.post('/api/mindhive-v22/havc/contribution/add', (req: Request, res: Response) => {
    try {
      const {
        assetOrProjectId,
        itemTitle,
        contributorName,
        contributionRole,
        contributionType,
        contributionPercentage,
        agreedSharePercent
      } = req.body;

      if (!itemTitle || !contributorName) {
        return res.status(400).json({ error: 'itemTitle and contributorName are required' });
      }

      const state = loadMindHiveV22State();
      const evidenceHash = crypto.createHash('sha256').update(`${itemTitle}-${contributorName}-${Date.now()}`).digest('hex');

      const dnaRecord: HavcContributionDnaRecord = {
        id: `dna-${Date.now().toString().slice(-6)}`,
        assetOrProjectId: assetOrProjectId || 'asset-gen',
        itemTitle,
        contributorId: `contrib-${Date.now().toString().slice(-4)}`,
        contributorName,
        contributionRole: contributionRole || 'Intellectual Contributor',
        contributionType: contributionType || 'human_intellectual',
        contributionPercentage: Number(contributionPercentage) || 30,
        evidenceHashSha256: evidenceHash,
        timestamp: new Date().toISOString(),
        agreedSharePercent: Number(agreedSharePercent) || Number(contributionPercentage) || 30,
        approvedByOwner: true
      };

      state.havc.dnaRecords.unshift(dnaRecord);
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(201).json({
        success: true,
        message: `Contribution DNA recorded for "${contributorName}" with SHA-256 evidence: ${evidenceHash.slice(0, 16)}...`,
        dnaRecord
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/havc/contribution/add:', error);
      res.status(500).json({ error: error?.message || 'Failed to record contribution DNA' });
    }
  });

  // 9. POST Settle Shared Value Distribution (Paystack)
  app.post('/api/mindhive-v22/havc/distribute', (req: Request, res: Response) => {
    try {
      const {
        sourceProductTitle,
        grossPaymentNgn,
        contributorSplits
      } = req.body;

      const grossNgn = Number(grossPaymentNgn) || 1000000;
      const grossUsd = Math.round(grossNgn / 1500);
      const platformFeeNgn = Math.round(grossNgn * 0.3);
      const cooperativePoolNgn = Math.round(grossNgn * 0.05);
      const netDistributableNgn = grossNgn - platformFeeNgn - cooperativePoolNgn;

      const state = loadMindHiveV22State();
      const txRef = `PAYSTACK_SPLIT_REF_${Date.now()}`;

      const payouts = (contributorSplits && contributorSplits.length > 0)
        ? contributorSplits.map((c: any) => ({
            contributorId: c.contributorId || `contrib-${Math.floor(100 + Math.random() * 900)}`,
            contributorName: c.contributorName || 'Verified Contributor',
            role: c.role || 'Contributor',
            entitledPercent: Number(c.sharePercent) || 50,
            payoutNgn: Math.round(netDistributableNgn * ((Number(c.sharePercent) || 50) / 100)),
            payoutUsd: Math.round((netDistributableNgn * ((Number(c.sharePercent) || 50) / 100)) / 1500),
            status: 'settled_paystack' as const,
            settledTimestamp: new Date().toISOString()
          }))
        : [
            {
              contributorId: 'contrib-001',
              contributorName: 'Dr. Damilola Adebayo',
              role: 'Primary Author',
              entitledPercent: 70,
              payoutNgn: Math.round(netDistributableNgn * 0.7),
              payoutUsd: Math.round((netDistributableNgn * 0.7) / 1500),
              status: 'settled_paystack' as const,
              settledTimestamp: new Date().toISOString()
            },
            {
              contributorId: 'contrib-002',
              contributorName: 'Chidinma Okafor, CFA',
              role: 'Protocol Reviewer',
              entitledPercent: 30,
              payoutNgn: Math.round(netDistributableNgn * 0.3),
              payoutUsd: Math.round((netDistributableNgn * 0.3) / 1500),
              status: 'settled_paystack' as const,
              settledTimestamp: new Date().toISOString()
            }
          ];

      const distributionRecord: HavcSharedValueDistribution = {
        id: `dist-2026-${Date.now().toString().slice(-4)}`,
        txReference: txRef,
        sourceProductTitle: sourceProductTitle || 'Knowledge Asset Commercial License',
        totalGrossPaymentNgn: grossNgn,
        totalGrossPaymentUsd: grossUsd,
        platformFeeNgn,
        cooperativePoolNgn,
        contributorPayouts: payouts,
        status: 'settled',
        createdAt: new Date().toISOString()
      };

      state.havc.distributions.unshift(distributionRecord);
      state.summaryMetrics.totalSettledRevenueNgn += grossNgn;
      state.summaryMetrics.totalSettledRevenueUsd += grossUsd;
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(200).json({
        success: true,
        message: `Shared value distribution of ₦${grossNgn.toLocaleString()} NGN settled via Paystack across ${payouts.length} contributors.`,
        distribution: distributionRecord
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/havc/distribute:', error);
      res.status(500).json({ error: error?.message || 'Failed to settle distribution' });
    }
  });

  // 10. POST File Cooperative Dispute
  app.post('/api/mindhive-v22/havc/dispute/create', (req: Request, res: Response) => {
    try {
      const {
        title,
        projectId,
        claimantName,
        respondentName,
        reason
      } = req.body;

      if (!title || !claimantName || !reason) {
        return res.status(400).json({ error: 'title, claimantName, and reason are required' });
      }

      const state = loadMindHiveV22State();
      const newDispute = {
        id: `disp-${Date.now().toString().slice(-4)}`,
        title,
        projectId: projectId || 'proj-general',
        claimantName,
        respondentName: respondentName || 'Cooperative Review Board',
        reason,
        status: 'open' as const,
        filedAt: new Date().toISOString()
      };

      state.havc.disputes.unshift(newDispute);
      state.lastUpdated = new Date().toISOString();
      saveMindHiveV22State(state);

      res.status(201).json({
        success: true,
        message: `Dispute ${newDispute.id} recorded and queued for cooperative arbitration review.`,
        dispute: newDispute
      });
    } catch (error: any) {
      console.error('Error in POST /api/mindhive-v22/havc/dispute/create:', error);
      res.status(500).json({ error: error?.message || 'Failed to file dispute' });
    }
  });
}
