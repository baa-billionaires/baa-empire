import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { INITIAL_MIND_HIVE_V20_STATE } from '../data/mindHiveV20InitialState';
import { INITIAL_MIND_HIVE_V22_STATE } from '../data/mindHiveV22InitialState';

const DATA_DIR = '/data';
const FALLBACK_DATA_DIR = './data';
const OUTREACH_LOG_FILE = path.join(DATA_DIR, 'leads_outreach_log.json');
const FALLBACK_LOG_FILE = path.join(FALLBACK_DATA_DIR, 'leads_outreach_log.json');

export interface OutreachMessageLog {
  id: string;
  leadId: string;
  leadName: string;
  leadSource: string;
  channel: 'whatsapp' | 'email' | 'linkedin' | 'twitter' | 'direct_dm';
  recipientHandle: string;
  messageBody: string;
  sentBy: string;
  sentAt: string;
  status: 'dispatched' | 'opened_external' | 'queued';
}

function ensureDirs(): string {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return OUTREACH_LOG_FILE;
  } catch {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    return FALLBACK_LOG_FILE;
  }
}

function loadOutreachLogs(): OutreachMessageLog[] {
  try {
    const file = ensureDirs();
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
    if (fs.existsSync(FALLBACK_LOG_FILE)) {
      return JSON.parse(fs.readFileSync(FALLBACK_LOG_FILE, 'utf-8'));
    }
  } catch {
    // ignore
  }
  return [];
}

function saveOutreachLogs(logs: OutreachMessageLog[]): void {
  try {
    const file = ensureDirs();
    fs.writeFileSync(file, JSON.stringify(logs, null, 2), 'utf-8');
    try {
      if (!fs.existsSync(FALLBACK_DATA_DIR)) fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
      fs.writeFileSync(FALLBACK_LOG_FILE, JSON.stringify(logs, null, 2), 'utf-8');
    } catch {
      // ignore
    }
  } catch {
    // ignore
  }
}

function readJsonOrFallback<T>(filename: string, fallback: T): T {
  try {
    const primary = path.join(DATA_DIR, filename);
    if (fs.existsSync(primary)) {
      return JSON.parse(fs.readFileSync(primary, 'utf-8')) as T;
    }
    const secondary = path.join(FALLBACK_DATA_DIR, filename);
    if (fs.existsSync(secondary)) {
      return JSON.parse(fs.readFileSync(secondary, 'utf-8')) as T;
    }
  } catch {
    // ignore
  }
  return fallback;
}

export function registerLeadsOutputRoutes(app: Express): void {
  console.log('[LEADS OUTPUT] Registering unified leads aggregation & outreach log routes...');

  app.get('/api/leads/unified', (_req: Request, res: Response) => {
    try {
      const v20State = readJsonOrFallback('mindhive_v20_state.json', INITIAL_MIND_HIVE_V20_STATE);
      const v22State = readJsonOrFallback('mindhive_v22_state.json', INITIAL_MIND_HIVE_V22_STATE);

      // Map Mind Hive V20 Buyer-Hunting Legions Leads
      const v20Leads = (v20State.buyerLeads || []).map((b: any) => ({
        id: `v20-${b.id}`,
        name: b.organizationName,
        title: b.legionName || 'Institutional Buyer',
        organization: b.organizationName,
        domain: `${b.organizationName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 14)}.com`,
        location: `${b.flag || ''} ${b.country || 'Global'}`.trim(),
        email: `procurement@${b.organizationName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 14)}.com`,
        phone_or_wa: '+2348025516793',
        linkedin_url: `https://linkedin.com/search/results/companies/?keywords=${encodeURIComponent(b.organizationName)}`,
        type: b.legionType === 'universities' ? 'institution' : 'client',
        source_platform: 'Mind Hive V20 Buyer Legion',
        origin_module: 'MIND HIVE V20 (Buyer-Hunting Legions)',
        origin_url: `https://microwork-ai-2-app-production.up.railway.app/#mindhive-v20`,
        status: b.dealStage === 'Contract Closed' ? 'converted' : b.dealStage === 'Negotiating' ? 'qualified' : 'contacted',
        lead_score: b.matchScore || 92,
        estimated_value: b.budgetUsd || 10000,
        intent_signal: `${b.targetedAssetCategory} — ${b.lastAction}`,
        skills_or_focus: [b.legionName, b.urgency || 'Active'],
        ai_message: `Hello ${b.organizationName} team! Our autonomous Mind Hive V20 Knowledge Exchange has verified assets matching "${b.targetedAssetCategory}". Ready for licensing settlement via Paystack / Escrow.`,
        converted: b.dealStage === 'Contract Closed',
        created_at: new Date().toISOString()
      }));

      // Map Mind Hive V22 KCX Buyer RFQs
      const v22Leads = (v22State.kcx?.buyerRequests || []).map((rfq: any) => ({
        id: `v22-${rfq.id}`,
        name: rfq.buyerName,
        title: `${rfq.buyerType.replace('_', ' ').toUpperCase()} Decision Maker`,
        organization: rfq.buyerOrg,
        domain: `${rfq.buyerOrg.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 14)}.org`,
        location: 'Global Exchange',
        email: `${rfq.buyerName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@${rfq.buyerOrg.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12)}.org`,
        phone_or_wa: '+2348025516793',
        linkedin_url: `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(rfq.buyerName + ' ' + rfq.buyerOrg)}`,
        type: rfq.buyerType === 'ai_lab' ? 'client' : rfq.buyerType === 'publisher' ? 'institution' : 'client',
        source_platform: 'KCX Buyer Exchange RFQ',
        origin_module: 'MIND HIVE V22 (Knowledge Capital Exchange)',
        origin_url: `https://microwork-ai-2-app-production.up.railway.app/#kcx`,
        status: rfq.status === 'negotiating' ? 'qualified' : 'discovered',
        lead_score: 96,
        estimated_value: rfq.budgetUsd || 30000,
        intent_signal: `RFQ: ${rfq.title} — ${rfq.description}`,
        skills_or_focus: [rfq.targetCategory, rfq.preferredLicense, `Urgency: ${rfq.urgency}`],
        ai_message: `Dear ${rfq.buyerName} (${rfq.buyerOrg}), we received your KCX RFQ for "${rfq.title}". Our verified Knowledge Capital Exchange datasets and 70/30 provenance-tracked corpus match your $${rfq.budgetUsd?.toLocaleString()} scope.`,
        converted: false,
        created_at: rfq.createdAt || new Date().toISOString()
      }));

      const outreachLogs = loadOutreachLogs();

      res.status(200).json({
        success: true,
        enterpriseLeads: [...v22Leads, ...v20Leads],
        outreachLogs: outreachLogs.slice(0, 100)
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.post('/api/leads/log-message', (req: Request, res: Response) => {
    try {
      const { leadId, leadName, leadSource, channel, recipientHandle, messageBody, sentBy, status } = req.body;
      if (!leadId || !messageBody) {
        return res.status(400).json({ success: false, error: 'leadId and messageBody are required' });
      }

      const logs = loadOutreachLogs();
      const entry: OutreachMessageLog = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        leadId,
        leadName: leadName || 'Lead Prospect',
        leadSource: leadSource || 'AI Recruiter Radar',
        channel: channel || 'whatsapp',
        recipientHandle: recipientHandle || 'N/A',
        messageBody,
        sentBy: sentBy || 'Admin Operator',
        sentAt: new Date().toISOString(),
        status: status || 'dispatched'
      };

      logs.unshift(entry);
      saveOutreachLogs(logs.slice(0, 500));

      res.status(200).json({
        success: true,
        entry,
        totalLogged: logs.length
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
}
