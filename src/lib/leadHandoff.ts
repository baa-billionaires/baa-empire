import { ScoutLead } from '../types';

export type SourceCategory = 'Social' | 'Referral' | 'Direct' | 'Autonomous Swarm';

export type EngagementAgentId =
  | 'whatsapp-closer'
  | 'deal-room'
  | 'recruiter'
  | 'whatsapp-broadcast';

export interface LeadHandoffPayload {
  leadId: string;
  name: string;
  title: string;
  organization: string;
  email: string;
  phone: string;
  location: string;
  sourcePlatform: string;
  sourceCategory: SourceCategory;
  originModule: string;
  intentSignal: string;
  estimatedValueUsd: number;
  leadScore: number;
  aiMessage: string;
  agentId: EngagementAgentId;
  agentLabel: string;
  handedOffAt: string;
}

export const LEAD_HANDOFF_STORAGE_KEY = 'baa_closer_lead_handoff';

export function classifyLeadSourceCategory(
  sourcePlatform: string = '',
  originModule: string = ''
): SourceCategory {
  const combined = `${sourcePlatform} ${originModule}`.toLowerCase();

  if (
    combined.includes('referral') ||
    combined.includes('affiliate') ||
    combined.includes('ambassador') ||
    combined.includes('partner')
  ) {
    return 'Referral';
  }

  if (
    combined.includes('v20') ||
    combined.includes('v22') ||
    combined.includes('kcx') ||
    combined.includes('buyer legion') ||
    combined.includes('rfq') ||
    combined.includes('swarm')
  ) {
    return 'Autonomous Swarm';
  }

  if (
    combined.includes('linkedin') ||
    combined.includes('twitter') ||
    combined.includes('facebook') ||
    combined.includes('techcabal') ||
    combined.includes('producthunt') ||
    combined.includes('github') ||
    combined.includes('angellist') ||
    combined.includes('social')
  ) {
    return 'Social';
  }

  return 'Direct';
}

export function recommendEngagementAgent(lead: {
  type?: ScoutLead['type'];
  phone_or_wa?: string;
  source_platform?: string;
  origin_module?: string;
}): {
  agentId: EngagementAgentId;
  agentLabel: string;
  shortLabel: string;
  reason: string;
} {
  const src = `${lead.source_platform || ''} ${lead.origin_module || ''}`.toLowerCase();

  if (lead.type === 'talent' || src.includes('github')) {
    return {
      agentId: 'recruiter',
      agentLabel: 'AI Recruiter Closer Agent',
      shortLabel: 'AI Recruiter',
      reason: 'Technical / GitHub talent matched for Academy & Bounties'
    };
  }

  if (
    (lead.type === 'investor' || lead.type === 'institution' || src.includes('kcx') || src.includes('v20')) &&
    !src.includes('whatsapp')
  ) {
    return {
      agentId: 'deal-room',
      agentLabel: 'Deal Room Institutional Agent',
      shortLabel: 'Deal Room Bot',
      reason: 'High-ticket enterprise / investor thesis routed to Deal Room'
    };
  }

  return {
    agentId: 'whatsapp-closer',
    agentLabel: 'WhatsApp Closer Bot',
    shortLabel: 'WA Closer Bot',
    reason: lead.phone_or_wa
      ? 'Direct WhatsApp identity verified for instant autonomous closing'
      : 'Routed to 24/7 WhatsApp Closer queue for multi-channel conversion'
  };
}

export function saveLeadHandoff(payload: LeadHandoffPayload): void {
  try {
    localStorage.setItem(LEAD_HANDOFF_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage errors
  }
}

export function peekLeadHandoff(): LeadHandoffPayload | null {
  try {
    const raw = localStorage.getItem(LEAD_HANDOFF_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LeadHandoffPayload;
  } catch {
    return null;
  }
}

export function clearLeadHandoff(): void {
  try {
    localStorage.removeItem(LEAD_HANDOFF_STORAGE_KEY);
  } catch {
    // ignore
  }
}
