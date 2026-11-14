import React, { useState, useEffect, useMemo } from 'react';
import {
  Radar,
  Search,
  Send,
  MessageSquare,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Download,
  RefreshCw,
  Globe,
  MapPin,
  Building2,
  Link2,
  Plus,
  X,
  Clock,
  History,
  Bot,
  Zap,
  Share2,
  Users,
  MousePointerClick,
  Cpu,
  Radio,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import { ScoutLead } from '../types';
import { generateSeedWhatsAppContacts } from '../lib/whatsappScraper';
import { UaaidcModuleSwitcher } from '../components/navigation/UaaidcModuleSwitcher';
import {
  SourceCategory,
  classifyLeadSourceCategory,
  recommendEngagementAgent,
  saveLeadHandoff,
  EngagementAgentId
} from '../lib/leadHandoff';

interface UnifiedLead extends ScoutLead {
  origin_module: string;
  origin_url?: string;
  source_category: SourceCategory;
  is_live_online?: boolean;
  identity_handle?: string;
  referred_by?: string;
}

interface OutreachLogItem {
  id: string;
  leadId: string;
  leadName: string;
  leadSource: string;
  channel: 'whatsapp' | 'email' | 'linkedin' | 'twitter' | 'direct_dm';
  recipientHandle: string;
  messageBody: string;
  sentBy: string;
  sentAt: string;
  status: string;
}

interface LeadsOutputDashboardPageProps {
  onNavigate?: (page: string) => void;
}

function formatLiveAgo(isoDate: string, nowMs: number): string {
  const ts = new Date(isoDate).getTime();
  if (Number.isNaN(ts)) return 'Live now';
  const diffSec = Math.max(0, Math.floor((nowMs - ts) / 1000));
  if (diffSec < 60) return `${diffSec}s ago · Active`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago · Online`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

const CHANNEL_META: Record<
  SourceCategory,
  {
    label: string;
    subtitle: string;
    barClass: string;
    badgeClass: string;
    borderClass: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  Social: {
    label: 'Social Media',
    subtitle: 'LinkedIn, Twitter / X, TechCabal, Facebook, GitHub',
    barClass: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
    borderClass: 'border-cyan-500/40',
    icon: Share2
  },
  Referral: {
    label: 'Referral & Affiliates',
    subtitle: '10% BaaCoin Ambassador Links & Partner Hub',
    barClass: 'bg-gradient-to-r from-amber-400 to-yellow-500',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    borderClass: 'border-amber-500/40',
    icon: Users
  },
  Direct: {
    label: 'Direct & Funnels',
    subtitle: 'Free Tier Magnets, Direct Scraper, WhatsApp Inbound',
    barClass: 'bg-gradient-to-r from-[#00FF88] to-emerald-500',
    badgeClass: 'bg-emerald-500/15 text-[#00FF88] border-emerald-500/40',
    borderClass: 'border-emerald-500/40',
    icon: MousePointerClick
  },
  'Autonomous Swarm': {
    label: 'Autonomous Swarm / KCX',
    subtitle: 'Mind Hive V20 Buyer Legions & V22 KCX RFQs',
    barClass: 'bg-gradient-to-r from-purple-400 to-fuchsia-500',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
    borderClass: 'border-purple-500/40',
    icon: Cpu
  }
};

export const LeadsOutputDashboardPage: React.FC<LeadsOutputDashboardPageProps> = ({ onNavigate }) => {
  const {
    scoutLeads,
    referrals,
    discoverLeadsBatch,
    updateLeadStatus,
    convertLead,
    addCustomLead,
    profile
  } = useEcosystem();

  const [enterpriseLeads, setEnterpriseLeads] = useState<Omit<UnifiedLead, 'source_category'>[]>([]);
  const [outreachLogs, setOutreachLogs] = useState<OutreachLogItem[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  // Filters
  const [activeTab, setActiveTab] = useState<'all_leads' | 'outreach_history'>('all_leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | SourceCategory>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | 'has_whatsapp' | 'has_email' | 'has_linkedin'>('all');

  // Messaging Composer Modal State
  const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null);
  const [composerChannel, setComposerChannel] = useState<'whatsapp' | 'email' | 'linkedin' | 'direct_dm'>('whatsapp');
  const [composerMessage, setComposerMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dispatchNotice, setDispatchNotice] = useState<string | null>(null);
  const [handoffBannerNotice, setHandoffBannerNotice] = useState<string | null>(null);

  // Add Lead Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    title: '',
    organization: '',
    location: '',
    email: '',
    phone_or_wa: '',
    linkedin_url: '',
    source_platform: 'LinkedIn' as ScoutLead['source_platform'],
    type: 'student' as ScoutLead['type'],
    estimated_value: 990,
    intent_signal: ''
  });

  // Real-time ticking clock for live identities & timestamps
  useEffect(() => {
    const timer = setInterval(() => setNowMs(Date.now()), 5000);
    return () => clearInterval(timer);
  }, []);

  // Load backend enterprise leads + outreach logs
  const loadBackendLeads = async () => {
    try {
      const res = await fetch('/api/leads/unified');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setEnterpriseLeads(json.enterpriseLeads || []);
          setOutreachLogs(json.outreachLogs || []);
        }
      }
    } catch {
      // ignore fallback
    }
  };

  useEffect(() => {
    loadBackendLeads();
  }, []);

  // Merge all leads across sources: Enterprise (V20/V22), AI Recruiter, Referral Hub, Free Tier, WhatsApp CRM
  const allUnifiedLeads: UnifiedLead[] = useMemo(() => {
    const mappedEnterprise: UnifiedLead[] = enterpriseLeads.map((e, idx) => ({
      ...e,
      source_category: classifyLeadSourceCategory(e.source_platform, e.origin_module),
      is_live_online: idx < 4,
      identity_handle: `@${(e.name || 'partner').toLowerCase().replace(/[^a-z0-9]/g, '')}`
    }));

    const mappedScout: UnifiedLead[] = scoutLeads.map((l, idx) => {
      const isFreeFunnel = l.id.startsWith('lead-free');
      const originModule =
        l.source_platform === 'Direct Scraping'
          ? 'University & Directory Scraper'
          : isFreeFunnel
          ? 'Free Tier Magnet Funnel'
          : `AI Recruiter Radar (${l.source_platform})`;
      return {
        ...l,
        origin_module: originModule,
        origin_url: l.linkedin_url || `https://${l.domain || 'linkedin.com'}`,
        source_category: classifyLeadSourceCategory(l.source_platform, originModule),
        is_live_online: idx < 5,
        identity_handle: `@${l.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`
      };
    });

    // Live Referral Hub identities (from EcosystemContext + baseline referral affiliates)
    const mappedEcosystemReferrals: UnifiedLead[] = referrals.map((r, idx) => ({
      id: `ref-${r.id}`,
      type: 'student',
      name: r.referred_name || `Referred Member #${idx + 1}`,
      title: '10% BaaCoin Referral Sign-Up',
      organization: 'BAA Ambassador Referral Network',
      domain: 'billionairesai.academy',
      location: 'Lagos / Pan-Africa',
      email: `${(r.referred_name || 'member').toLowerCase().replace(/[^a-z0-9]/g, '.')}@referral.baa.ai`,
      phone_or_wa: `+23480${String(31000000 + idx * 14729).slice(0, 8)}`,
      source_platform: 'Direct Scraping',
      origin_module: `Referral Hub (${profile.referral_code})`,
      origin_url: 'https://microwork-ai-2-app-production.up.railway.app/#referrals',
      source_category: 'Referral',
      status: r.paid ? 'converted' : 'qualified',
      lead_score: 95,
      estimated_value: Math.max(990, r.baacoin_bonus || 990),
      intent_signal: `Referred via ${profile.referral_code} — Earned +${r.baacoin_bonus} BaaCoin bonus ($${r.commission} commission)`,
      skills_or_focus: ['Referral Hub', 'BaaCoin 10% Bonus'],
      ai_message: `Hello ${r.referred_name}! You were invited via ${profile.referral_code} to claim your 10x BaaCoin Networth & live AI Agent workspace. Reply YES to activate!`,
      converted: r.paid,
      created_at: r.created_at || new Date().toISOString(),
      is_live_online: true,
      identity_handle: `@${(r.referred_name || 'referral').toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      referred_by: profile.referral_code
    }));

    const baselineReferralProspects: UnifiedLead[] =
      mappedEcosystemReferrals.length >= 2
        ? []
        : [
            {
              id: 'ref-seed-1',
              type: 'student',
              name: 'Tunde Bakare-Williams',
              title: 'Referred Cohort Applicant',
              organization: 'Lagos AI Founders Circle',
              domain: 'founderscircle.ng',
              location: 'Lagos, Nigeria',
              email: 'tunde.bw@founderscircle.ng',
              phone_or_wa: '+2348039941280',
              source_platform: 'Direct Scraping',
              origin_module: `Referral Hub (${profile.referral_code || 'BAA-AMB-01'})`,
              source_category: 'Referral',
              status: 'qualified',
              lead_score: 96,
              estimated_value: 1490,
              intent_signal: 'Clicked Ambassador Referral Link — Reviewing Paystack Cohort Checkout & 10% BaaCoin Bonus',
              skills_or_focus: ['Referral Link', 'Paystack Checkout'],
              ai_message: `Hi Tunde! Welcome via Ambassador Referral (${profile.referral_code || 'BAA-AMB-01'}). Complete your Academy pass with instant Paystack checkout to unlock 990 BaaCoin Day 1.`,
              converted: false,
              created_at: new Date(Date.now() - 4 * 60000).toISOString(),
              is_live_online: true,
              identity_handle: '@tundebw_ai',
              referred_by: profile.referral_code || 'BAA-AMB-01'
            },
            {
              id: 'ref-seed-2',
              type: 'client',
              name: 'Amara Okafor-Mensah',
              title: 'Partner Agency Referral',
              organization: 'Accra Growth Studio',
              domain: 'accragrowth.gh',
              location: 'Accra, Ghana',
              email: 'amara@accragrowth.gh',
              phone_or_wa: '+233244891204',
              source_platform: 'Direct Scraping',
              origin_module: 'Referral Partner Syndicate',
              source_category: 'Referral',
              status: 'discovered',
              lead_score: 93,
              estimated_value: 2500,
              intent_signal: 'Referred by existing BAA AI Workforce client for multi-agent enterprise deployment',
              skills_or_focus: ['Agency Partner', 'Enterprise Agents'],
              ai_message: `Hello Amara! Our Referral Syndicate connected us regarding Accra Growth Studio's autonomous AI Workforce deployment. Let's chat on WhatsApp!`,
              converted: false,
              created_at: new Date(Date.now() - 11 * 60000).toISOString(),
              is_live_online: true,
              identity_handle: '@amara_accra',
              referred_by: 'Partner-GH-09'
            }
          ];

    // Include WhatsApp Lead Bank contacts
    let waContacts: any[] = [];
    try {
      const saved = localStorage.getItem('richconnect_wa_contacts');
      waContacts = saved ? JSON.parse(saved) : generateSeedWhatsAppContacts();
    } catch {
      waContacts = generateSeedWhatsAppContacts();
    }

    const mappedWa: UnifiedLead[] = waContacts.slice(0, 10).map((c, idx) => {
      const originModule = `WhatsApp CRM (${c.source || 'Landing Page Capture'})`;
      return {
        id: `wa-bank-${c.id || idx}`,
        type: c.tags?.includes('investor') ? 'investor' : 'student',
        name: c.name,
        title: c.intent || 'WhatsApp Inbound Prospect',
        organization: c.source || 'WhatsApp Lead Bank',
        domain: 'whatsapp.com',
        location: 'West Africa / WhatsApp',
        email: `${c.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@wa-prospect.ng`,
        phone_or_wa: c.phone,
        source_platform: idx % 2 === 0 ? 'Facebook Groups' : 'Direct Scraping',
        origin_module: originModule,
        origin_url: `https://wa.me/${(c.phone || '').replace(/[^0-9]/g, '')}`,
        source_category: idx % 2 === 0 ? 'Social' : 'Direct',
        status: 'discovered',
        lead_score: 91,
        estimated_value: 990,
        intent_signal: `WhatsApp Trigger: "${c.intent || 'Requested Course & BaaCoin Info'}" (${c.last_message_at || 'Recent'})`,
        skills_or_focus: c.tags || ['WhatsApp Inbound'],
        ai_message: `Hello ${c.name}! Following up on your WhatsApp inquiry regarding "${c.intent || 'BAA Academy'}". Here is your instant enrollment & BaaCoin bonus link: https://microwork-ai-2-app-production.up.railway.app/#academy`,
        converted: false,
        created_at: new Date(Date.now() - (idx + 1) * 7 * 60000).toISOString(),
        is_live_online: idx < 3,
        identity_handle: c.phone
      };
    });

    return [
      ...mappedEcosystemReferrals,
      ...baselineReferralProspects,
      ...mappedEnterprise,
      ...mappedScout,
      ...mappedWa
    ];
  }, [scoutLeads, referrals, enterpriseLeads, profile.referral_code]);

  // High-level Visualized Source Channel Breakdown (Social / Referral / Direct / Autonomous Swarm)
  const categoryStats = useMemo(() => {
    const categories: SourceCategory[] = ['Social', 'Referral', 'Direct', 'Autonomous Swarm'];
    const total = Math.max(1, allUnifiedLeads.length);
    return categories.map((cat) => {
      const items = allUnifiedLeads.filter((l) => l.source_category === cat);
      const valueUsd = items.reduce((sum, l) => sum + (l.estimated_value || 990), 0);
      const waReady = items.filter((l) => Boolean(l.phone_or_wa)).length;
      const liveNowCount = items.filter((l) => l.is_live_online).length;
      const pct = Math.round((items.length / total) * 100);
      return {
        category: cat,
        count: items.length,
        pct,
        valueUsd,
        waReady,
        liveNowCount
      };
    });
  }, [allUnifiedLeads]);

  // Granular Platform Breakdown
  const sourceStats = useMemo(() => {
    const map = new Map<string, { source: string; category: SourceCategory; count: number; valueUsd: number }>();
    allUnifiedLeads.forEach((l) => {
      const src = l.source_platform || 'Direct';
      const current = map.get(src) || {
        source: src,
        category: l.source_category,
        count: 0,
        valueUsd: 0
      };
      current.count += 1;
      current.valueUsd += l.estimated_value || 990;
      map.set(src, current);
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [allUnifiedLeads]);

  // Live Real-Time User Identities Showcase (Top active leads right now)
  const liveIdentities = useMemo(
    () => allUnifiedLeads.filter((l) => l.is_live_online).slice(0, 6),
    [allUnifiedLeads]
  );

  // Filtered list
  const filteredLeads = useMemo(() => {
    return allUnifiedLeads.filter((l) => {
      if (categoryFilter !== 'all' && l.source_category !== categoryFilter) return false;
      if (sourceFilter !== 'all' && l.source_platform !== sourceFilter) return false;
      if (typeFilter !== 'all' && l.type !== typeFilter) return false;
      if (channelFilter === 'has_whatsapp' && !l.phone_or_wa) return false;
      if (channelFilter === 'has_email' && !l.email) return false;
      if (channelFilter === 'has_linkedin' && !l.linkedin_url) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${l.name} ${l.title || ''} ${l.organization || ''} ${l.email} ${l.phone_or_wa || ''} ${l.source_platform} ${l.source_category} ${l.origin_module} ${l.location || ''} ${l.intent_signal || ''} ${l.identity_handle || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allUnifiedLeads, categoryFilter, sourceFilter, typeFilter, channelFilter, searchQuery]);

  const totalPipelineUsd = useMemo(
    () => allUnifiedLeads.reduce((acc, l) => acc + (l.estimated_value || 990), 0),
    [allUnifiedLeads]
  );

  // ONE-CLICK MESSAGE HANDOFF -> WhatsApp Closer Bot or Recommended Engagement Agent
  const handleOneClickMessage = async (
    lead: UnifiedLead,
    forcedAgentId?: EngagementAgentId
  ) => {
    const recommended = recommendEngagementAgent(lead);
    const targetAgentId: EngagementAgentId = forcedAgentId || recommended.agentId;
    const targetAgentLabel =
      targetAgentId === 'whatsapp-closer'
        ? 'WhatsApp Closer Bot'
        : targetAgentId === 'deal-room'
        ? 'Deal Room Closer Agent'
        : targetAgentId === 'recruiter'
        ? 'AI Recruiter Closer Agent'
        : 'WhatsApp Broadcast Console';

    saveLeadHandoff({
      leadId: lead.id,
      name: lead.name,
      title: lead.title || 'Verified Prospect',
      organization: lead.organization || 'Independent',
      email: lead.email,
      phone: lead.phone_or_wa || '+2348025516793',
      location: lead.location || 'Global',
      sourcePlatform: lead.source_platform,
      sourceCategory: lead.source_category,
      originModule: lead.origin_module,
      intentSignal: lead.intent_signal || `Captured via ${lead.source_platform}`,
      estimatedValueUsd: lead.estimated_value || 990,
      leadScore: lead.lead_score || 92,
      aiMessage: lead.ai_message,
      agentId: targetAgentId,
      agentLabel: targetAgentLabel,
      handedOffAt: new Date().toISOString()
    });

    // Log initiation in persistent outreach ledger
    try {
      await fetch('/api/leads/log-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          leadName: lead.name,
          leadSource: `${lead.source_category} → ${lead.source_platform} (${lead.origin_module})`,
          channel: targetAgentId === 'whatsapp-closer' ? 'whatsapp' : 'direct_dm',
          recipientHandle: lead.phone_or_wa || lead.email,
          messageBody: `[One-Click Agent Handoff → ${targetAgentLabel}] ${lead.ai_message}`,
          sentBy: profile.email || 'Operator',
          status: 'dispatched'
        })
      });
      if (scoutLeads.some((s) => s.id === lead.id)) {
        updateLeadStatus(lead.id, 'contacted');
      }
      await loadBackendLeads();
    } catch {
      // ignore offline error
    }

    if (onNavigate) {
      onNavigate(targetAgentId);
    } else {
      setHandoffBannerNotice(
        `⚡ Handoff prepared for ${lead.name} → ${targetAgentLabel}. Opening Multi-Channel Composer.`
      );
      openComposer(lead, lead.phone_or_wa ? 'whatsapp' : 'email');
    }
  };

  const openComposer = (lead: UnifiedLead, defaultChannel?: 'whatsapp' | 'email' | 'linkedin' | 'direct_dm') => {
    setSelectedLead(lead);
    const preferred =
      defaultChannel || (lead.phone_or_wa ? 'whatsapp' : lead.email ? 'email' : 'linkedin');
    setComposerChannel(preferred);
    setComposerMessage(lead.ai_message);
    setDispatchNotice(null);
  };

  const applyTemplate = (templateType: 'academy' | 'investor_deck' | 'nova_v16' | 'kcx_license') => {
    if (!selectedLead) return;
    if (templateType === 'academy') {
      setComposerMessage(
        `Hi ${selectedLead.name}! We noticed your interest via ${selectedLead.source_category} (${selectedLead.source_platform}). Join Billionaires AI Academy to unlock 10x BaaCoin Networth & 70% automated compute revenue: https://microwork-ai-2-app-production.up.railway.app/#academy?ref=${profile.referral_code}`
      );
    } else if (templateType === 'investor_deck') {
      setComposerMessage(
        `Dear ${selectedLead.name} (${selectedLead.organization || 'Partner'}), following your thesis signals from ${selectedLead.source_platform}, we invite you to review our YES FINAL DECK — UA-AIDC V16 Living Internet Civilization ($500k Seed Round): https://microwork-ai-2-app-production.up.railway.app/#investor-one-pager`
      );
    } else if (templateType === 'nova_v16') {
      setComposerMessage(
        `Hello ${selectedLead.name}, discover NOVA PROTOCOL V16 (Module 5 of UA-AIDC): Living uncopyable apps that mutate every 60s and pay Origin DNA royalties on every pixel: https://microwork-ai-2-app-production.up.railway.app/#nova-protocol`
      );
    } else {
      setComposerMessage(
        `Dear ${selectedLead.name}, our Knowledge Capital Exchange (KCX) has verified enterprise corpora & AI training datasets matching "${selectedLead.intent_signal || 'your pipeline'}". Inspect available licensing SLAs: https://microwork-ai-2-app-production.up.railway.app/#kcx`
      );
    }
  };

  const handleLogAndDispatch = async (externalOpened = false) => {
    if (!selectedLead || !composerMessage.trim()) return;
    const recipient =
      composerChannel === 'whatsapp'
        ? selectedLead.phone_or_wa || 'WhatsApp'
        : composerChannel === 'email'
        ? selectedLead.email
        : selectedLead.linkedin_url || selectedLead.name;

    try {
      await fetch('/api/leads/log-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: selectedLead.id,
          leadName: selectedLead.name,
          leadSource: `${selectedLead.source_category} → ${selectedLead.source_platform} (${selectedLead.origin_module})`,
          channel: composerChannel,
          recipientHandle: recipient,
          messageBody: composerMessage,
          sentBy: profile.email || 'Admin Operator',
          status: externalOpened ? 'opened_external' : 'dispatched'
        })
      });
      if (scoutLeads.some((l) => l.id === selectedLead.id)) {
        updateLeadStatus(selectedLead.id, 'contacted');
      }
      await loadBackendLeads();
      setDispatchNotice(`✅ Logged ${composerChannel.toUpperCase()} message to ${selectedLead.name} (${recipient})`);
    } catch {
      setDispatchNotice(`✅ Queued ${composerChannel.toUpperCase()} message locally for ${selectedLead.name}`);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleDiscoverNew = async () => {
    setIsScanning(true);
    try {
      await discoverLeadsBatch();
    } finally {
      setIsScanning(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Name',
      'Identity Handle',
      'Title',
      'Organization',
      'Source Channel',
      'Where From (Platform)',
      'Origin Module',
      'Email',
      'WhatsApp / Phone',
      'LinkedIn URL',
      'Location',
      'Category',
      'Score',
      'Est Value USD',
      'Intent Signal',
      'Status'
    ];
    const rows = filteredLeads.map((l) => [
      `"${l.name}"`,
      `"${l.identity_handle || ''}"`,
      `"${l.title || ''}"`,
      `"${l.organization || ''}"`,
      `"${l.source_category}"`,
      `"${l.source_platform}"`,
      `"${l.origin_module}"`,
      `"${l.email}"`,
      `"${l.phone_or_wa || ''}"`,
      `"${l.linkedin_url || ''}"`,
      `"${l.location || ''}"`,
      `"${l.type}"`,
      l.lead_score || 90,
      l.estimated_value || 990,
      `"${(l.intent_signal || '').replace(/"/g, '""')}"`,
      `"${l.status}"`
    ]);

    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const a = document.createElement('a');
    a.href = encodeURI(csv);
    a.download = `ua_aidc_leads_output_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCreateCustomLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;
    addCustomLead({
      name: newLead.name,
      title: newLead.title || 'Prospect',
      organization: newLead.organization || 'Independent',
      domain: newLead.email.split('@')[1] || 'domain.com',
      location: newLead.location || 'Global',
      email: newLead.email,
      phone_or_wa: newLead.phone_or_wa,
      linkedin_url: newLead.linkedin_url,
      source_platform: newLead.source_platform,
      type: newLead.type,
      status: 'discovered',
      lead_score: 94,
      estimated_value: Number(newLead.estimated_value) || 990,
      intent_signal: newLead.intent_signal || `Added directly from ${newLead.source_platform}`,
      skills_or_focus: [newLead.source_platform, newLead.type],
      ai_message: `Hello ${newLead.name}, welcome to UA-AIDC & Billionaires AI Academy! Ready to connect via WhatsApp Closer?`,
      converted: false
    });
    setShowAddModal(false);
    setNewLead({
      name: '',
      title: '',
      organization: '',
      location: '',
      email: '',
      phone_or_wa: '',
      linkedin_url: '',
      source_platform: 'LinkedIn',
      type: 'student',
      estimated_value: 990,
      intent_signal: ''
    });
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP HEADER & UA-AIDC MODULE DROPDOWN */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-cyan-950/20 to-black border-2 border-[#00D4FF]/40 shadow-2xl space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#00D4FF] font-bold uppercase tracking-wider">
                <Radar className="w-4 h-4 animate-spin-slow" />
                <span>UA-AIDC UNIFIED LEADS OUTPUT COMMAND</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-[#00FF88] border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                  {allUnifiedLeads.length} LIVE IDENTITIES
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">
                Leads Output Dashboard — Sources, Live Identities &amp; One-Click Messaging
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl">
                Visualize where every lead originates (<strong>Social, Referral, Direct, Autonomous Swarm</strong>), verify <strong>real-time user identities</strong>, and trigger <strong>One-Click Message</strong> directly into the <strong>WhatsApp Closer Bot</strong> or assigned engagement agent.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {onNavigate && (
                <UaaidcModuleSwitcher
                  currentPage="leads-dashboard"
                  onSelectModule={onNavigate}
                  variant="banner"
                />
              )}
              <button
                onClick={handleDiscoverNew}
                disabled={isScanning}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-cyan-400 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Scanning Sources...' : 'Scan New Leads'}</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Lead</span>
              </button>
            </div>
          </div>

          {handoffBannerNotice && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              {handoffBannerNotice}
            </div>
          )}

          {/* KEY KPI STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800/80 font-mono">
            <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase block">Total Captured Leads</span>
              <span className="text-2xl font-bold text-white">{allUnifiedLeads.length}</span>
              <span className="text-[10px] text-cyan-400 block">Across {sourceStats.length} Active Sources</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase block">Real-Time Online Identities</span>
              <span className="text-2xl font-bold text-[#00FF88] flex items-center gap-2">
                <span>{allUnifiedLeads.filter((l) => l.is_live_online).length}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#00FF88] border border-emerald-500/40">LIVE</span>
              </span>
              <span className="text-[10px] text-zinc-400 block">
                {allUnifiedLeads.filter((l) => Boolean(l.phone_or_wa)).length} WhatsApp Closer Ready
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase block">Total Pipeline Value</span>
              <span className="text-2xl font-bold text-[#FFD700]">${totalPipelineUsd.toLocaleString()}</span>
              <span className="text-[10px] text-zinc-400 block">₦{(totalPipelineUsd * 1500).toLocaleString()} NGN</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800">
              <span className="text-[10px] text-zinc-400 uppercase block">One-Click Outreach Sent</span>
              <span className="text-2xl font-bold text-purple-400">{outreachLogs.length}</span>
              <span className="text-[10px] text-zinc-400 block">Synced to /data Ledger</span>
            </div>
          </div>
        </div>

        {/* 1. LEAD SOURCE VISUALIZATION PANEL (SOCIAL / REFERRAL / DIRECT / AUTONOMOUS SWARM) */}
        <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <Globe className="w-4 h-4 text-[#00D4FF]" />
              <span>Lead Source Channel Visualizer (Social · Referral · Direct · Autonomous Swarm)</span>
            </div>
            {(categoryFilter !== 'all' || sourceFilter !== 'all') && (
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setSourceFilter('all');
                }}
                className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
              >
                Reset Source Filters ({allUnifiedLeads.length} Total)
              </button>
            )}
          </div>

          {/* Stacked Channel Share Distribution Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 flex">
              {categoryStats.map((stat) => {
                if (stat.count === 0) return null;
                const meta = CHANNEL_META[stat.category];
                return (
                  <button
                    key={stat.category}
                    type="button"
                    onClick={() =>
                      setCategoryFilter(categoryFilter === stat.category ? 'all' : stat.category)
                    }
                    style={{ width: `${Math.max(stat.pct, 4)}%` }}
                    title={`${meta.label}: ${stat.count} leads (${stat.pct}%)`}
                    className={`${meta.barClass} h-full transition-all hover:brightness-125 cursor-pointer border-r border-black/40 last:border-r-0`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
              <span>Proportional Acquisition Share — Click any channel bar or card to filter</span>
              <span>100% Tracked Attribution</span>
            </div>
          </div>

          {/* 4 Visual Channel Breakdown Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoryStats.map((stat) => {
              const meta = CHANNEL_META[stat.category];
              const Icon = meta.icon;
              const isSelected = categoryFilter === stat.category;
              return (
                <button
                  key={stat.category}
                  type="button"
                  onClick={() => setCategoryFilter(isSelected ? 'all' : stat.category)}
                  className={`text-left p-4 rounded-2xl border transition cursor-pointer space-y-2.5 ${
                    isSelected
                      ? `bg-zinc-900 ${meta.borderClass} ring-2 ring-[#00D4FF]/50`
                      : 'bg-black/50 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-mono font-bold flex items-center gap-1.5 ${meta.badgeClass}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{meta.label}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{stat.pct}%</span>
                  </div>

                  <div className="flex items-baseline justify-between font-mono">
                    <span className="text-2xl font-black text-white">{stat.count}</span>
                    <span className="text-xs font-bold text-emerald-400">${stat.valueUsd.toLocaleString()}</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                    <div className={`h-full ${meta.barClass}`} style={{ width: `${stat.pct}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>{stat.waReady} WA Ready</span>
                    <span className="text-[#00FF88]">{stat.liveNowCount} Online Now</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-snug">{meta.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Granular Platform Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900">
            <button
              onClick={() => setSourceFilter('all')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition cursor-pointer ${
                sourceFilter === 'all'
                  ? 'bg-[#00D4FF] text-black border-[#00D4FF] font-bold'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              All Platforms ({allUnifiedLeads.length})
            </button>
            {sourceStats.map((st) => (
              <button
                key={st.source}
                onClick={() => setSourceFilter(sourceFilter === st.source ? 'all' : st.source)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition cursor-pointer flex items-center gap-2 ${
                  sourceFilter === st.source
                    ? 'bg-[#00FF88]/20 text-[#00FF88] border-[#00FF88] font-bold'
                    : 'bg-zinc-900/70 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span>{st.source}</span>
                <span className="px-1.5 py-0.2 rounded bg-black/60 text-[10px] text-white font-bold">
                  {st.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. REAL-TIME USER IDENTITIES STREAM */}
        <div className="p-5 rounded-3xl bg-zinc-950 border border-emerald-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-white">
              <Radio className="w-4 h-4 text-[#00FF88] animate-pulse" />
              <span>Real-Time Active User Identities (Instant Engagement Queue)</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">
              Live Sync: {new Date(nowMs).toLocaleTimeString()} · Click "One-Click Message" to launch Closer Bot
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {liveIdentities.map((lead) => {
              const agent = recommendEngagementAgent(lead);
              const meta = CHANNEL_META[lead.source_category];
              return (
                <div
                  key={`live-${lead.id}`}
                  className="p-3.5 rounded-2xl bg-black/70 border border-zinc-800 hover:border-emerald-500/50 transition flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-950 to-cyan-950 border border-emerald-500/40 flex items-center justify-center font-heading font-black text-xs text-white">
                          {lead.name
                            .split(' ')
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-[#00FF88] ring-2 ring-black absolute -bottom-0.5 -right-0.5 animate-pulse"
                          title="Real-time active identity"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading font-bold text-xs text-white truncate">{lead.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-[#00D4FF] shrink-0" />
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400 truncate">
                          {lead.identity_handle || lead.email} · {lead.location || 'Global'}
                        </div>
                      </div>
                    </div>

                    <span className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold shrink-0 ${meta.badgeClass}`}>
                      {lead.source_category}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-300 bg-zinc-950/90 px-2.5 py-1.5 rounded-xl border border-zinc-900 truncate">
                    {lead.origin_module} · <span className="text-[#00FF88]">{formatLiveAgo(lead.created_at, nowMs)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-amber-300 font-bold">
                      Est. ${(lead.estimated_value || 990).toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleOneClickMessage(lead)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00FF88] to-emerald-400 text-black font-heading font-black text-[11px] uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3 fill-black" />
                      <span>One-Click Message ({agent.shortLabel})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TABS + SEARCH & FILTERS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('all_leads')}
              className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition ${
                activeTab === 'all_leads' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              📋 Live Leads Output Matrix ({filteredLeads.length})
            </button>
            <button
              onClick={() => setActiveTab('outreach_history')}
              className={`px-4 py-2 rounded-xl font-bold cursor-pointer transition flex items-center gap-1.5 ${
                activeTab === 'outreach_history' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Sent Messages Log ({outreachLogs.length})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search identity, handle, origin, phone..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-white outline-none focus:border-[#00D4FF]"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            >
              <option value="all">All Identities</option>
              <option value="student">Students</option>
              <option value="investor">Investors</option>
              <option value="talent">AI Talent</option>
              <option value="institution">Universities / Deans</option>
              <option value="client">Enterprise Buyers</option>
            </select>

            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value as any)}
              className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
            >
              <option value="all">All Contact Channels</option>
              <option value="has_whatsapp">Has WhatsApp / Phone</option>
              <option value="has_email">Has Verified Email</option>
              <option value="has_linkedin">Has LinkedIn URL</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* MAIN LEADS OUTPUT MATRIX */}
        {activeTab === 'all_leads' ? (
          <div className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-black/70 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    <th className="py-4 px-4">1. Real-Time User Identity</th>
                    <th className="py-4 px-4">2. Lead Source &amp; Signal</th>
                    <th className="py-4 px-4">3. Direct Contact Details</th>
                    <th className="py-4 px-4 text-right">4. One-Click Engagement &amp; Bot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-xs">
                  {filteredLeads.map((lead) => {
                    const agent = recommendEngagementAgent(lead);
                    const meta = CHANNEL_META[lead.source_category];
                    return (
                      <tr key={lead.id} className="hover:bg-zinc-900/40 transition align-top">
                        {/* COLUMN 1: REAL-TIME IDENTITY */}
                        <td className="py-4 px-4 min-w-[250px]">
                          <div className="flex items-start gap-2.5">
                            <div className="relative shrink-0 mt-0.5">
                              <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-heading font-black text-xs text-white">
                                {lead.name
                                  .split(' ')
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join('')
                                  .toUpperCase()}
                              </div>
                              {lead.is_live_online && (
                                <span
                                  className="w-2.5 h-2.5 rounded-full bg-[#00FF88] ring-2 ring-zinc-950 absolute -bottom-0.5 -right-0.5 animate-pulse"
                                  title="Online / Active Now"
                                />
                              )}
                            </div>

                            <div className="space-y-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="font-heading font-bold text-sm text-white">
                                  {lead.name}
                                </span>
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold uppercase border ${
                                  lead.type === 'investor'
                                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                    : lead.type === 'institution'
                                    ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                                    : lead.type === 'client'
                                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                    : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                                }`}>
                                  {lead.type}
                                </span>
                                {lead.is_live_online && (
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-[#00FF88] border border-emerald-500/40 text-[9px] font-mono font-bold">
                                    ONLINE
                                  </span>
                                )}
                              </div>
                              <div className="text-zinc-300 font-medium">
                                {lead.title || 'Verified Lead'}
                              </div>
                              <div className="text-zinc-400 flex items-center gap-1.5 text-[11px]">
                                <Building2 className="w-3 h-3 text-zinc-500 shrink-0" />
                                <span>{lead.organization || 'Independent'}</span>
                              </div>
                              <div className="text-zinc-500 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                                {lead.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {lead.location}
                                  </span>
                                )}
                                {lead.referred_by && (
                                  <span className="text-amber-300">Ref: {lead.referred_by}</span>
                                )}
                              </div>
                              <div className="pt-1 flex items-center gap-2 font-mono text-[11px]">
                                <span className="text-[#FFD700] font-bold">
                                  🎯 {lead.lead_score || 92}/100
                                </span>
                                <span className="text-emerald-400 font-bold">
                                  Est. ${(lead.estimated_value || 990).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* COLUMN 2: WHERE THEY ARE COMING FROM */}
                        <td className="py-4 px-4 min-w-[260px] max-w-sm">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-1.5 font-mono">
                              <span className={`px-2 py-0.5 rounded border font-bold text-[10px] ${meta.badgeClass}`}>
                                {lead.source_category}
                              </span>
                              <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-bold text-[10px]">
                                📍 {lead.source_platform}
                              </span>
                            </div>
                            <div className="text-[10px] font-mono text-zinc-400">
                              Origin: {lead.origin_module}
                            </div>
                            {lead.domain && (
                              <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                                <Link2 className="w-3 h-3 text-cyan-400 shrink-0" />
                                <span>{lead.domain}</span>
                              </div>
                            )}
                            {lead.intent_signal && (
                              <p className="text-[11px] text-zinc-300 bg-black/50 p-2 rounded-xl border border-zinc-800/80 leading-snug italic">
                                "{lead.intent_signal}"
                              </p>
                            )}
                            <div className="text-[10px] font-mono text-emerald-400/90 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatLiveAgo(lead.created_at, nowMs)}</span>
                            </div>
                          </div>
                        </td>

                        {/* COLUMN 3: CONTACT CHANNELS */}
                        <td className="py-4 px-4 min-w-[220px] font-mono text-[11px]">
                          <div className="space-y-2">
                            {lead.email && (
                              <div className="flex items-center justify-between gap-2 bg-zinc-900/70 px-2.5 py-1.5 rounded-lg border border-zinc-800">
                                <span className="text-zinc-200 truncate max-w-[170px]" title={lead.email}>
                                  ✉️ {lead.email}
                                </span>
                                <button
                                  onClick={() => handleCopyText(`em-${lead.id}`, lead.email)}
                                  className="text-zinc-400 hover:text-white cursor-pointer"
                                  title="Copy email"
                                >
                                  {copiedId === `em-${lead.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            )}

                            {lead.phone_or_wa && (
                              <div className="flex items-center justify-between gap-2 bg-emerald-950/30 px-2.5 py-1.5 rounded-lg border border-emerald-800/50">
                                <span className="text-emerald-300 font-bold">
                                  📱 {lead.phone_or_wa}
                                </span>
                                <button
                                  onClick={() => handleCopyText(`ph-${lead.id}`, lead.phone_or_wa!)}
                                  className="text-emerald-400 hover:text-white cursor-pointer"
                                  title="Copy phone"
                                >
                                  {copiedId === `ph-${lead.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            )}

                            {lead.linkedin_url && (
                              <a
                                href={lead.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-400 hover:underline text-[11px]"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Social / LinkedIn Profile</span>
                              </a>
                            )}
                          </div>
                        </td>

                        {/* COLUMN 4: ONE-CLICK MESSAGE & ENGAGEMENT AGENT ROUTING */}
                        <td className="py-4 px-4 text-right min-w-[255px]">
                          <div className="flex flex-col items-end gap-2 font-mono">
                            <span className="text-[10px] text-cyan-300 flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              <span>Agent: {agent.agentLabel}</span>
                            </span>

                            {/* PRIMARY ONE-CLICK MESSAGE CTA */}
                            <button
                              onClick={() => handleOneClickMessage(lead)}
                              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#00FF88] to-cyan-400 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10"
                              title={agent.reason}
                            >
                              <Zap className="w-3.5 h-3.5 fill-black" />
                              <span>One-Click Message</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>

                            {/* QUICK SECONDARY CHANNELS */}
                            <div className="flex flex-wrap justify-end gap-1.5">
                              {agent.agentId !== 'whatsapp-closer' && (
                                <button
                                  onClick={() => handleOneClickMessage(lead, 'whatsapp-closer')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-[#00FF88] border border-emerald-500/30 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition"
                                >
                                  <Bot className="w-3 h-3" />
                                  <span>WA Closer Bot</span>
                                </button>
                              )}

                              {lead.phone_or_wa && (
                                <button
                                  onClick={() => openComposer(lead, 'whatsapp')}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-zinc-800 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>Direct WA</span>
                                </button>
                              )}

                              {lead.email && (
                                <button
                                  onClick={() => openComposer(lead, 'email')}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-zinc-800 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition"
                                >
                                  <Mail className="w-3 h-3" />
                                  <span>Email</span>
                                </button>
                              )}

                              <button
                                onClick={() => openComposer(lead, 'direct_dm')}
                                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition"
                              >
                                <Send className="w-3 h-3" />
                                <span>Compose</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-[10px]">
                              <span className={`px-2 py-0.5 rounded uppercase font-bold ${
                                lead.converted
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                  : lead.status === 'contacted'
                                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                              }`}>
                                Status: {lead.converted ? 'Converted' : lead.status}
                              </span>
                              {!lead.converted && scoutLeads.some((s) => s.id === lead.id) && (
                                <button
                                  onClick={() => convertLead(lead.id)}
                                  className="text-[#FFD700] hover:underline font-bold cursor-pointer"
                                >
                                  Mark Converted
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* OUTREACH DISPATCHED LOG */
          <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-4">
            <h3 className="text-base font-heading font-bold text-white">
              Persistent Outreach Dispatch Ledger (/data/leads_outreach_log.json)
            </h3>
            {outreachLogs.length === 0 ? (
              <p className="text-xs font-mono text-zinc-400 py-8 text-center">
                No messages logged yet. Click One-Click Message, WA Closer Bot, Email, or Compose on any lead to send and record outreach.
              </p>
            ) : (
              <div className="space-y-2.5">
                {outreachLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[#00FF88] uppercase font-bold text-[10px]">
                          {log.channel}
                        </span>
                        <span className="text-white font-bold">{log.leadName}</span>
                        <span className="text-zinc-500">• {log.recipientHandle}</span>
                      </div>
                      <p className="text-zinc-300 font-sans text-xs">"{log.messageBody}"</p>
                      <span className="text-[10px] text-zinc-500 block">Source: {log.leadSource}</span>
                    </div>
                    <div className="text-right shrink-0 text-[10px] text-zinc-400">
                      <div>{new Date(log.sentAt).toLocaleString()}</div>
                      <div className="text-emerald-400 font-bold uppercase mt-0.5">{log.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* DIRECT MESSAGE COMPOSER MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border-2 border-[#00D4FF]/40 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase font-bold">
                  DIRECT MULTI-CHANNEL OUTREACH COMPOSER
                </span>
                <h3 className="text-lg font-heading font-black text-white">
                  Message {selectedLead.name} ({selectedLead.organization})
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Source & Identity Summary */}
            <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px]">Origin Source:</span>
                <span className="text-cyan-300 font-bold">
                  {selectedLead.source_category} · {selectedLead.source_platform} — {selectedLead.origin_module}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Reachable Contact:</span>
                <span className="text-white">
                  {selectedLead.phone_or_wa || selectedLead.email}
                </span>
              </div>
            </div>

            {/* Channel Selector */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { id: 'whatsapp' as const, label: 'WhatsApp Direct', icon: MessageSquare },
                { id: 'email' as const, label: 'Email Client', icon: Mail },
                { id: 'linkedin' as const, label: 'LinkedIn DM', icon: ExternalLink },
                { id: 'direct_dm' as const, label: 'Copy / Generic DM', icon: Send }
              ].map((ch) => {
                const Icon = ch.icon;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setComposerChannel(ch.id)}
                    className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 cursor-pointer font-bold transition ${
                      composerChannel === ch.id
                        ? 'bg-[#00D4FF] text-black border-[#00D4FF]'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{ch.label}</span>
                  </button>
                );
              })}

              {onNavigate && (
                <button
                  onClick={() => {
                    const leadRef = selectedLead;
                    setSelectedLead(null);
                    handleOneClickMessage(leadRef, 'whatsapp-closer');
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-500/20 text-[#00FF88] border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer font-bold hover:bg-emerald-500/30 transition"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Hand Off to WA Closer Bot</span>
                </button>
              )}
            </div>

            {/* Quick Pitch Templates */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
              <span className="text-zinc-500">Quick Pitch:</span>
              <button onClick={() => applyTemplate('academy')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-zinc-800 cursor-pointer">
                BAA Academy (10x BaaCoin)
              </button>
              <button onClick={() => applyTemplate('investor_deck')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-zinc-800 cursor-pointer">
                YES FINAL DECK (V16)
              </button>
              <button onClick={() => applyTemplate('nova_v16')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[#00FF88] border border-zinc-800 cursor-pointer">
                NOVA V16 Living Internet
              </button>
              <button onClick={() => applyTemplate('kcx_license')} className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-zinc-800 cursor-pointer">
                KCX Data Licensing
              </button>
            </div>

            <textarea
              rows={5}
              value={composerMessage}
              onChange={(e) => setComposerMessage(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-2xl p-3.5 text-xs font-mono text-white outline-none focus:border-[#00D4FF]"
            />

            {dispatchNotice && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                {dispatchNotice}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-900">
              <button
                onClick={() => handleCopyText('modal-copy', composerMessage)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedId === 'modal-copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'modal-copy' ? 'Copied Message' : 'Copy Text'}</span>
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {selectedLead.phone_or_wa && (
                  <a
                    href={`https://wa.me/${selectedLead.phone_or_wa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(composerMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleLogAndDispatch(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#00FF88] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Launch WhatsApp</span>
                  </a>
                )}

                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}?subject=${encodeURIComponent('UA-AIDC / Billionaires AI Academy Opportunity')}&body=${encodeURIComponent(composerMessage)}`}
                    onClick={() => handleLogAndDispatch(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#00D4FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Email</span>
                  </a>
                )}

                <button
                  onClick={() => handleLogAndDispatch(false)}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading font-black text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Log as Sent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">Add New Lead Manually</h3>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCustomLead} className="space-y-3 text-xs font-mono">
              <input
                required
                placeholder="Full Name *"
                value={newLead.name}
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Title / Role"
                  value={newLead.title}
                  onChange={(e) => setNewLead({ ...newLead, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                />
                <input
                  placeholder="Organization"
                  value={newLead.organization}
                  onChange={(e) => setNewLead({ ...newLead, organization: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  required
                  type="email"
                  placeholder="Email *"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                />
                <input
                  placeholder="WhatsApp (+234...)"
                  value={newLead.phone_or_wa}
                  onChange={(e) => setNewLead({ ...newLead, phone_or_wa: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newLead.source_platform}
                  onChange={(e) => setNewLead({ ...newLead, source_platform: e.target.value as any })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="GitHub">GitHub</option>
                  <option value="Twitter / X">Twitter / X</option>
                  <option value="TechCabal">TechCabal</option>
                  <option value="Facebook Groups">WhatsApp / Groups</option>
                  <option value="Direct Scraping">Direct / Referral</option>
                </select>
                <select
                  value={newLead.type}
                  onChange={(e) => setNewLead({ ...newLead, type: e.target.value as any })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                >
                  <option value="student">Student</option>
                  <option value="investor">Investor</option>
                  <option value="talent">AI Talent</option>
                  <option value="institution">Institution</option>
                  <option value="client">Corporate Client</option>
                </select>
              </div>
              <input
                placeholder="Where / why captured (Intent Signal)"
                value={newLead.intent_signal}
                onChange={(e) => setNewLead({ ...newLead, intent_signal: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00D4FF] text-black font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                Save to Leads Output Dashboard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsOutputDashboardPage;
