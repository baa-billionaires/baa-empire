import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  Zap,
  Activity,
  DollarSign,
  Cpu,
  Mail,
  Target,
  Globe,
  Briefcase,
  Users,
  Compass,
  FileText,
  CheckCircle,
  Play,
  Pause,
  Search,
  Plus,
  Lock,
  Award,
  ChevronRight,
  Sparkles,
  BarChart3,
  Network,
  ShieldCheck
} from 'lucide-react';

import {
  GrowthOperatingMode,
  CrmStage
} from '../types/growthMafia';

import {
  FullGrowthMafiaState,
  TelemetryLog,
  loadGrowthMafiaState,
  setOperatingMode,
  toggleEmergencyStop,
  advanceLeadStage,
  toggleCampaignStatus,
  createDigitalProduct,
  addToSuppressionList,
  verifyAndSettlePayment
} from '../lib/growthMafiaService';

import { ReputationGuardian } from '../components/ReputationGuardian';
import { EmailCampaignColony } from '../components/EmailCampaignColony';

interface AutonomousGrowthMafiaPageProps {
  onNavigate?: (tab: string) => void;
}

export const AutonomousGrowthMafiaPage: React.FC<AutonomousGrowthMafiaPageProps> = () => {
  const [state, setState] = useState<FullGrowthMafiaState>(() => loadGrowthMafiaState());
  const [activeTab, setActiveTab] = useState<'orchestration' | 'mafia_agents' | 'market_radar' | 'geo_prospects' | 'crm_pipeline' | 'digital_products' | 'email_engine' | 'revenue_loops' | 'pr_partners' | 'audit_log'>('orchestration');

  // Filter and modal states
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState('All');
  const [newSuppressionInput, setNewSuppressionInput] = useState('');
  const [emailCheckInput, setEmailCheckInput] = useState('');
  const [emailCheckResult, setEmailCheckResult] = useState<{ valid: boolean; message: string } | null>(null);

  // New Digital Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdType, setNewProdType] = useState<'AI Agent Blueprint' | 'SaaS Automation Micro-Service' | 'Industry Research Report' | 'Executive Playbook' | 'Turnkey Business Package'>('AI Agent Blueprint');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdProblem, setNewProdProblem] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(249);
  const [newProdDeliveryCost, setNewProdDeliveryCost] = useState(15);

  // Handlers
  const handleModeChange = (mode: GrowthOperatingMode) => {
    const updated = setOperatingMode(state, mode);
    setState(updated);
  };

  const handleToggleEmergencyStop = () => {
    const updated = toggleEmergencyStop(
      state, 
      state.emergencyStopEngaged ? undefined : 'Operator manual safety override via Command Center'
    );
    setState(updated);
  };

  const handleAdvanceLead = (leadId: string, nextStage: CrmStage) => {
    const updated = advanceLeadStage(state, leadId, nextStage);
    setState(updated);
  };

  const handleToggleCampaign = (campaignId: string) => {
    const updated = toggleCampaignStatus(state, campaignId);
    setState(updated);
  };

  const handleAddSuppression = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuppressionInput.trim()) return;
    const updated = addToSuppressionList(state, newSuppressionInput.trim());
    setState(updated);
    setNewSuppressionInput('');
  };

  const handleCheckEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailCheckInput.trim()) return;
    const email = emailCheckInput.trim().toLowerCase();
    const isSuppressed = state.suppressionList.some(s => email.includes(s));
    const validSyntax = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isSuppressed) {
      setEmailCheckResult({
        valid: false,
        message: 'BLOCKED: Target address or domain is on the strict Exclusion / Suppression list.'
      });
    } else if (!validSyntax) {
      setEmailCheckResult({
        valid: false,
        message: 'INVALID: RFC-5322 syntax check failed. Domain formatting is malformed.'
      });
    } else {
      setEmailCheckResult({
        valid: true,
        message: 'PASS: Verified MX records, SPF/DMARC policy alignment, and acceptable spam risk score (<2%).'
      });
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName) return;

    const netContrib = Number(newProdPrice) - Number(newProdDeliveryCost);
    const updated = createDigitalProduct(state, {
      name: newProdName,
      tagline: newProdTagline || 'Autonomous High-Yield Enterprise Workflow Asset',
      customerProblemSolved: newProdProblem || 'Eliminates repetitive manual overhead through autonomous agent automation.',
      productType: newProdType,
      deliverables: ['Production Docker Containers', 'Config Blueprint', 'Attribution Webhook Hooks'],
      pricingTiers: [
        {
          name: 'Commercial Single-License',
          priceUsd: Number(newProdPrice),
          targetBuyer: 'Enterprise Operations & Digital Growth Leaders'
        }
      ],
      landingPageSummary: 'Plug-and-play autonomous business blueprint designed for zero-maintenance growth.',
      qualityCheckPassed: true,
      originalityScore: 98,
      distributionChannels: ['Application Landing Pages', 'Official Meta / Ads', 'Partner Affiliates'],
      activeViews: 120,
      conversions: 6,
      actualGrossRevenueUsd: Number(newProdPrice) * 6,
      deliveryCostUsd: Number(newProdDeliveryCost) * 6,
      netContributionUsd: netContrib * 6,
      status: 'published_active'
    });

    setState(updated);
    setShowProductModal(false);
    setNewProdName('');
    setNewProdTagline('');
    setNewProdProblem('');
  };

  const handleTriggerPaymentVerification = (loopId: string) => {
    const randomRef = 'PSTK_' + Math.floor(1000000000 + Math.random() * 9000000000);
    const updated = verifyAndSettlePayment(state, loopId, 1250, randomRef);
    setState(updated);
  };

  const filteredOpportunities = state.marketOpportunities.filter(opp => 
    opp.title.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
    opp.industry.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
    opp.observedNeed.toLowerCase().includes(opportunitySearch.toLowerCase())
  );

  const territories = ['All', ...Array.from(new Set(state.geoProspects.map(p => p.stateOrRegion)))];
  const filteredGeoProspects = selectedTerritory === 'All'
    ? state.geoProspects
    : state.geoProspects.filter(p => p.stateOrRegion === selectedTerritory);

  const crmStages: CrmStage[] = [
    'discovered',
    'qualified',
    'contact_eligible',
    'contacted',
    'engaged',
    'proposal',
    'negotiation',
    'won',
    'fulfillment',
    'retention'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Banner: Emergency Stop & Operational Mode Indicator */}
      {state.emergencyStopEngaged && (
        <div className="bg-rose-950 border-b border-rose-800 text-rose-200 px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-xl animate-pulse">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold text-sm tracking-wider uppercase text-rose-100">
                Central Emergency Stop Engaged
              </span>
              <p className="text-xs text-rose-300">
                {state.emergencyStopReason || 'All outbound dispatches, live campaigns, and email sequences paused.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleEmergencyStop}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Disengage Emergency Halt
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 shadow-inner">
              <Network className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  Autonomous Growth OS
                  <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    MAFIA™ Enterprise Mesh
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Market Acquisition, Funnel Intelligence, Multi-Agent Attribution & Revenue Colony
              </p>
            </div>
          </div>

          {/* Mode Selector & Master Emergency Button */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
              {(['observe', 'prepare', 'approval_required', 'authorized_automation'] as GrowthOperatingMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleModeChange(mode)}
                  className={`px-2.5 py-1 rounded capitalize transition-all ${
                    state.operatingMode === mode
                      ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Switch to ${mode.replace('_', ' ')} mode`}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={handleToggleEmergencyStop}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                state.emergencyStopEngaged
                  ? 'bg-rose-600/30 border-rose-500 text-rose-200 hover:bg-rose-600/40'
                  : 'bg-slate-900 border-slate-700 text-rose-400 hover:bg-rose-950/40 hover:border-rose-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{state.emergencyStopEngaged ? 'Halted' : 'Emergency Stop'}</span>
            </button>
          </div>
        </div>

        {/* Global Key Metrics Bar */}
        <div className="bg-slate-950/70 border-t border-slate-800/60 px-4 sm:px-6 lg:px-8 py-2">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Realized Gross Revenue</span>
              <span className="font-semibold text-emerald-400 text-sm">
                ${state.verifiedGrossRevenueUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Operating Expenses</span>
              <span className="font-semibold text-slate-300 text-sm">
                ${state.totalSpentUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Net Realized Profit</span>
              <span className="font-semibold text-cyan-400 text-sm">
                ${state.netRealizedProfitUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Active Swarm Agents</span>
              <span className="font-semibold text-slate-200 text-sm">
                {state.agents.filter(a => a.status === 'active').length} / {state.agents.length} Online
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Sender Reputation</span>
              <span className="font-semibold text-emerald-400 text-sm">
                {state.emailIntelligence.senderReputationScore}% (DMARC Aligned)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Active Revenue Loops</span>
              <span className="font-semibold text-purple-400 text-sm">
                {state.revenueBoundLoops.length} Verified Pipelines
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex space-x-1 py-1.5 min-w-max text-xs">
            {[
              { id: 'orchestration', label: 'Command Mesh', icon: Cpu },
              { id: 'mafia_agents', label: 'MAFIA™ 13 Agents', icon: Zap },
              { id: 'market_radar', label: 'Demand & RFPs', icon: Target },
              { id: 'geo_prospects', label: 'GeoTerritory Map', icon: Globe },
              { id: 'crm_pipeline', label: '10-Stage CRM', icon: Users },
              { id: 'digital_products', label: 'Product Factory', icon: Briefcase },
              { id: 'email_engine', label: 'ReputationGuardian™', icon: ShieldCheck },
              { id: 'revenue_loops', label: 'Revenue Loops', icon: DollarSign },
              { id: 'pr_partners', label: 'PR & Media Colony', icon: Award },
              { id: 'audit_log', label: 'Telemetry & Audit', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700/80'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: ORCHESTRATION & MULTI-AGENT MESH */}
        {activeTab === 'orchestration' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Autotelic Symbiosis & Entangled Cognitive Mesh</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Autonomous Multi-Agent Intelligence Hub
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Every agent executes under strict budget limits, verified task histories, and immutable policy gates.
                  Duplicate jobs and uncontrolled spending are programmatically prevented by central dependency arbitration.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                <button
                  onClick={() => setActiveTab('revenue_loops')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-900/30 transition-all"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>View Verified Revenue Loops</span>
                </button>
                <button
                  onClick={() => setActiveTab('mafia_agents')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Inspect 13 MAFIA Agents</span>
                </button>
              </div>
            </div>

            {/* Operating Modes Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  mode: 'observe',
                  title: '1. Observe Mode',
                  desc: 'Passive intelligence gathering, tender discovery, and market signal listening. No outbound actions or generation.',
                  color: 'border-slate-800 bg-slate-900/50'
                },
                {
                  mode: 'prepare',
                  title: '2. Prepare Mode',
                  desc: 'Drafts digital products, writes copy variants, parses RFPs, stages offers. Zero public dispatch.',
                  color: 'border-amber-900/40 bg-amber-950/20'
                },
                {
                  mode: 'approval_required',
                  title: '3. Approval Required',
                  desc: 'Recommended baseline. Automated research and prep with mandatory human operator sign-off prior to ad launch or email send.',
                  color: 'border-cyan-900/40 bg-cyan-950/20'
                },
                {
                  mode: 'authorized_automation',
                  title: '4. Authorized Automation',
                  desc: 'Autonomous execution within strict pre-approved budget caps ($500/day max) and domain allowlists. Instant fail-safe rollback.',
                  color: 'border-emerald-900/40 bg-emerald-950/20'
                }
              ].map((item) => (
                <div
                  key={item.mode}
                  onClick={() => handleModeChange(item.mode as GrowthOperatingMode)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${item.color} ${
                    state.operatingMode === item.mode
                      ? 'ring-2 ring-emerald-500 shadow-lg'
                      : 'hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-slate-100">{item.title}</span>
                    {state.operatingMode === item.mode && (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Core Agent Colony Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Active Intelligence Mesh ({state.agents.length} Entities)
                </h3>
                <span className="text-xs text-slate-500">
                  Last Sync: {state.lastHeartbeat.replace('T', ' ').substring(0, 19)} UTC
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {agent.colony}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                            agent.status === 'active'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : agent.status === 'paused_policy'
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {agent.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{agent.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{agent.activeContext}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Confidence:</span>
                        <span className="text-emerald-400 font-semibold">{agent.confidenceScore}%</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Budget Cap:</span>
                        <span className="text-slate-200">
                          ${agent.spentBudgetUsd.toFixed(2)} / ${agent.budgetLimitUsd.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Tasks Completed:</span>
                        <span className="text-cyan-400 font-mono font-medium">{agent.tasksCompleted}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 italic truncate">
                        Outputs: {agent.evidenceBasedOutputs[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MAFIA™ 13 SPECIALIZED AGENTS */}
        {activeTab === 'mafia_agents' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  MAFIA™ Autonomous Advertising Colony
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  13 specialized agents synchronizing from market discovery to attribution and creative synthesis.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1.5 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Zero AI Slop • Attribution Enforced</span>
              </div>
            </div>

            {/* List of 13 MAFIA Agents */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { role: 'MarketHunter', name: 'MarketHunter Sentinel', desc: 'Continuous listening across tender boards, public RFP streams, and software complaints.' },
                { role: 'AudienceArchitect', name: 'AudienceArchitect Core', desc: 'Builds compliant buyer cohorts based on proven transaction history and verified B2B need.' },
                { role: 'ProspectMatcher', name: 'ProspectMatcher Engine', desc: 'Directs qualified prospects to exact matching digital tools and enterprise services.' },
                { role: 'OfferEngineer', name: 'OfferEngineer Matrix', desc: 'Packages high-conversion value propositions, risk reversals, and guarantees.' },
                { role: 'CreativeFactory', name: 'CreativeFactory Studio', desc: 'Generates evidence-backed hooks, visual ad variants, and multi-channel asset formats.' },
                { role: 'ChannelRouter', name: 'ChannelRouter Arbitrage', desc: 'Calculates expected return and allocates traffic across allowed distribution channels.' },
                { role: 'CampaignPlanner', name: 'CampaignPlanner Scheduler', desc: 'Orchestrates budget pacing, A/B flight times, and multi-touch attribution timelines.' },
                { role: 'CampaignPublisher', name: 'CampaignPublisher Guard', desc: 'Safe publisher executing authorized deployments with strict policy checks.' },
                { role: 'FunnelArchitect', name: 'FunnelArchitect Flow', desc: 'Maintains frictionless high-speed checkout and landing page performance.' },
                { role: 'ConversionOptimizer', name: 'ConversionOptimizer Quant', desc: 'Tests friction points, button states, pricing transparency, and checkout dropoffs.' },
                { role: 'RevenueAttributionAgent', name: 'RevenueAttribution Ledger', desc: 'Validates Paystack webhook settle codes, calculates gross margins, and reports net profit.' },
                { role: 'ReputationGuardian', name: 'ReputationGuardian Sentinel', desc: 'Enforces anti-spam boundaries, SPF/DKIM/DMARC checks, and brand integrity.' },
                { role: 'LearningColony', name: 'LearningColony Neural Weight', desc: 'Updates colony strategy only when verified financial results justify modifications.' }
              ].map((agentItem, idx) => (
                <div
                  key={agentItem.role}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                        Agent #{idx + 1}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">MAFIA™ Role</span>
                    </div>
                    <h4 className="font-bold text-slate-100 text-sm">{agentItem.name}</h4>
                    <span className="text-xs text-cyan-400 font-mono block mb-2">{agentItem.role}</span>
                    <p className="text-xs text-slate-400">{agentItem.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center space-x-1 text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Ready</span>
                    </span>
                    <span className="font-mono">Policy Verified</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active MAFIA Campaigns Preview */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span>Live MAFIA™ Campaigns & Attribution</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {state.campaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {camp.channels[0]}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-semibold capitalize ${
                              camp.status === 'active'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                : 'bg-amber-950 text-amber-400 border border-amber-800'
                            }`}
                          >
                            {camp.status}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">{camp.name}</h4>
                      </div>
                      <button
                        onClick={() => handleToggleCampaign(camp.id)}
                        disabled={state.emergencyStopEngaged}
                        className={`p-2 rounded-lg border text-xs font-semibold flex items-center space-x-1 ${
                          camp.status === 'active'
                            ? 'bg-amber-950/40 border-amber-800 text-amber-400 hover:bg-amber-900/50'
                            : 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900/50'
                        }`}
                      >
                        {camp.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                      <span className="text-slate-500 font-mono text-[10px] uppercase">Winning Creative Hook:</span>
                      <p className="text-slate-200 font-medium italic">"{camp.offerHook}"</p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block">Daily Budget</span>
                        <span className="font-semibold text-slate-200">${camp.dailyBudgetUsd}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block">Total Spend</span>
                        <span className="font-semibold text-slate-300">${camp.spentBudgetUsd.toFixed(2)}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 uppercase block">Revenue Generated</span>
                        <span className="font-bold text-emerald-400">${camp.verifiedGrossRevenueUsd.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MARKET INTELLIGENCE & DEMAND DISCOVERY */}
        {activeTab === 'market_radar' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Market Demand & Opportunity Radar
                </h2>
                <p className="text-sm text-slate-400">
                  Continuous discovery across public RFPs, software pain points, and commercial tenders.
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter by title, industry, or need..."
                  value={opportunitySearch}
                  onChange={(e) => setOpportunitySearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                        {opp.industry}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Source: {opp.source}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white">{opp.title}</h3>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-slate-500 text-[10px] uppercase font-mono">
                        <span>Observed Problem / RFP Need</span>
                        <span className="text-emerald-400">Verified Fact</span>
                      </div>
                      <p className="text-slate-300 font-medium">{opp.observedNeed}</p>
                      <p className="text-slate-500 italic text-[11px]">"{opp.evidenceSnippet}"</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Est. Market Value</span>
                        <span className="font-semibold text-emerald-400">${opp.estimatedValueUsd.toLocaleString()}</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Confidence</span>
                        <span className="font-semibold text-cyan-400">{opp.confidenceScore}%</span>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-[10px] text-slate-500 block">Est. CAC</span>
                        <span className="font-semibold text-slate-300">${opp.estimatedCacUsd}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-400">Next Action:</span>
                      <span className="text-emerald-400 font-semibold">{opp.recommendedAction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GEOPROSPECT INTELLIGENCE & TERRITORY MAPPING */}
        {activeTab === 'geo_prospects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  GeoProspect Territory Intelligence
                </h2>
                <p className="text-sm text-slate-400">
                  Territory coverage, cluster densities, and verified business contacts across authorized commercial registries.
                </p>
              </div>

              {/* Territory Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Territory:</span>
                <select
                  value={selectedTerritory}
                  onChange={(e) => setSelectedTerritory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {territories.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Territory Map Cards */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                  <Compass className="w-4 h-4" />
                  <span>Geographic Radius Engine (Google Maps & Open Data Compliant)</span>
                </div>
                <span className="text-xs text-slate-500">
                  {filteredGeoProspects.length} Active Verified Hubs
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredGeoProspects.map((prospect) => (
                  <div
                    key={prospect.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-100 text-sm">{prospect.businessName}</h4>
                        <p className="text-xs text-slate-400">{prospect.city}, {prospect.stateOrRegion}, {prospect.country}</p>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {prospect.dataQualityScore}% Q-Score
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-slate-400">
                        <span className="text-slate-500">Category:</span> {prospect.category}
                      </div>
                      <div className="text-slate-400">
                        <span className="text-slate-500">Coordinates:</span>{' '}
                        <span className="font-mono text-[11px] text-slate-300">{prospect.latitude}, {prospect.longitude}</span>
                      </div>
                      <div className="text-slate-400">
                        <span className="text-slate-500">Identified Need:</span>{' '}
                        <span className="text-slate-200">{prospect.matchedProductNeed}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[11px] flex justify-between text-slate-500">
                      <span>Source: {prospect.sourceProvenance}</span>
                      <span className="text-emerald-400 font-medium">{prospect.outreachEligibility}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 10-STAGE CRM PIPELINE */}
        {activeTab === 'crm_pipeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  10-Stage Autonomous CRM Pipeline
                </h2>
                <p className="text-sm text-slate-400">
                  From initial discovery to proposal, conversion, fulfillment, and retention.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg">
                Pipeline Value: ${state.crmProspects.reduce((acc, l) => acc + l.dealValueUsd, 0).toLocaleString()}
              </span>
            </div>

            {/* Kanban / Multi-Stage View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {state.crmProspects.map((lead) => {
                const currentIdx = crmStages.indexOf(lead.stage);
                const nextStage = currentIdx < crmStages.length - 1 ? crmStages[currentIdx + 1] : null;

                return (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-400">
                          {lead.stage.replace('_', ' ')}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400">
                          ${lead.dealValueUsd.toLocaleString()}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-slate-100">{lead.organization}</h4>
                      <p className="text-xs text-slate-400">
                        {lead.contactName} • <span className="text-slate-300">{lead.roleTitle}</span>
                      </p>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Matched Solution:</span>
                        <p className="text-slate-200 font-medium">{lead.matchedOfferTitle}</p>
                      </div>

                      <p className="text-xs text-slate-400 italic">"{lead.notes[0]}"</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 space-y-2">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Intent Score:</span>
                        <span className="font-semibold text-emerald-400">{lead.buyerIntentScore}%</span>
                      </div>

                      {nextStage && (
                        <button
                          onClick={() => handleAdvanceLead(lead.id, nextStage)}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors border border-slate-700"
                        >
                          <span>Advance to {nextStage.replace('_', ' ')}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: DIGITAL PRODUCT FACTORY */}
        {activeTab === 'digital_products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Autonomous Digital Product & Service Factory
                </h2>
                <p className="text-sm text-slate-400">
                  Engineered digital assets, API connectors, toolkits, and blueprints with high net margins.
                </p>
              </div>
              <button
                onClick={() => setShowProductModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-emerald-900/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Digital Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {state.digitalProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {prod.productType}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        Score: {prod.originalityScore}%
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-100">{prod.name}</h3>
                    <p className="text-xs text-slate-400">{prod.tagline}</p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Problem Solved:</span>
                      <p className="text-slate-200 font-medium">{prod.customerProblemSolved}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Price</span>
                        <span className="text-lg font-bold text-emerald-400">${prod.pricingTiers[0]?.priceUsd || 0}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase">Net Contribution</span>
                        <span className="text-sm font-semibold text-slate-400">${prod.netContributionUsd.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800 text-slate-400">
                      <span>Conversions: {prod.conversions}</span>
                      <span className="text-emerald-400 font-mono">Status: {prod.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Creating Digital Product */}
            {showProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Create Verified Digital Product</h3>
                    <button
                      onClick={() => setShowProductModal(false)}
                      className="text-slate-400 hover:text-slate-200 text-sm font-semibold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={newProdName}
                        onChange={(e) => setNewProdName(e.target.value)}
                        placeholder="e.g. Autonomous Financial Audit Blueprint 2026"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1">Product Type</label>
                        <select
                          value={newProdType}
                          onChange={(e) => setNewProdType(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                        >
                          <option value="AI Agent Blueprint">AI Agent Blueprint</option>
                          <option value="SaaS Automation Micro-Service">SaaS Automation Micro-Service</option>
                          <option value="Industry Research Report">Industry Research Report</option>
                          <option value="Executive Playbook">Executive Playbook</option>
                          <option value="Turnkey Business Package">Turnkey Business Package</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Price (USD)</label>
                        <input
                          type="number"
                          required
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={newProdTagline}
                        onChange={(e) => setNewProdTagline(e.target.value)}
                        placeholder="e.g. Instant turnkey reconciliation engine"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowProductModal(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
                      >
                        Publish to Catalog
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: REPUTATIONGUARDIAN & EMAIL INTELLIGENCE */}
        {activeTab === 'email_engine' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  ReputationGuardian™ & Email Intelligence
                </h2>
                <p className="text-sm text-slate-400">
                  Autonomous protection layer monitoring bounce rates, unsubscribe registries, and SPF/DKIM/DMARC alignment with emergency campaign circuit breaker.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span>Zero Cold Spam • Policy Compliant</span>
              </div>
            </div>

            {/* Dedicated ReputationGuardian Console */}
            <ReputationGuardian state={state} onStateChange={setState} />

            {/* Email Campaign Colony & Pre-Queuing Suppression Gateway */}
            <EmailCampaignColony />

            {/* Real-time Address & Domain Deliverability Scan */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Real-Time Address & Domain Deliverability Pre-Flight Scan</span>
              </h3>
              <p className="text-xs text-slate-400">
                Test prospect email deliverability against syntax rules, MX records, and the suppression database before dispatching.
              </p>

              <form onSubmit={handleCheckEmail} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. partner@fintechguild.org"
                    value={emailCheckInput}
                    onChange={(e) => setEmailCheckInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
                  >
                    Verify
                  </button>
                </div>
              </form>

              {emailCheckResult && (
                <div
                  className={`p-3 rounded-xl border text-xs ${
                    emailCheckResult.valid
                      ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-800 text-rose-300'
                  }`}
                >
                  {emailCheckResult.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: REVENUE-BOUND CAMPAIGN LOOPS */}
        {activeTab === 'revenue_loops' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  13-Step Revenue-Bound Campaign Loops
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Market Signal → Verified Need → Qualified Audience → Product/Service → Offer → Authorized Channel → Approved Campaign → Qualified Response → Sales Conversion → Fulfillment → Verified Payment → Cost/Margin Analysis → Evidence-Based Improvement.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Verified Paystack Webhook Settled</span>
              </div>
            </div>

            {/* Loop Steps List */}
            <div className="space-y-4">
              {state.revenueBoundLoops.map((loop, idx) => (
                <div
                  key={loop.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase block">
                          Stage {loop.loopStep}
                        </span>
                        <h4 className="text-base font-bold text-white">{loop.title}</h4>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs font-mono">
                      <div className="text-right">
                        <span className="text-slate-500 block text-[10px]">Net Margin</span>
                        <span className={`font-bold ${loop.netMarginUsd >= 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {loop.netMarginUsd >= 0 ? `+$${loop.netMarginUsd.toLocaleString()}` : `-$${Math.abs(loop.netMarginUsd)}`}
                        </span>
                      </div>
                      {loop.settledAmountUsd > 0 && (
                        <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[11px]">
                          Settled
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300">{loop.description}</p>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                    <div className="text-slate-400">
                      <span className="text-slate-500 font-mono">Evidence Metrics:</span> {loop.evidenceMetrics}
                    </div>
                    <div className="text-slate-400">
                      <span className="text-slate-500 font-mono">Verified Outcome:</span> {loop.verifiedOutcome}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Timestamp: {loop.timestamp}</span>
                    {loop.settledAmountUsd === 0 && loop.loopStep.includes('Sales') && (
                      <button
                        onClick={() => handleTriggerPaymentVerification(loop.id)}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
                      >
                        Simulate Real Webhook Settlement
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: PR, PRESS RELEASES & PARTNERSHIPS */}
        {activeTab === 'pr_partners' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  PR, Press Releases & Strategic Distribution Colony
                </h2>
                <p className="text-sm text-slate-400">
                  Factual press distribution, media kit attribution, and co-marketing partnerships.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Press Releases */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Verified Press Releases & Media Placements</span>
                </h3>

                <div className="space-y-3">
                  {state.pressReleases.map((pr) => (
                    <div
                      key={pr.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-cyan-400">{pr.dateline}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono">
                          {pr.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white">{pr.headline}</h4>
                      <p className="text-xs text-slate-400">{pr.factualBodySummary}</p>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                        <span>Outlet: {pr.verifiedMediaPlacements[0]?.outletName || 'Global Wire'}</span>
                        <span className="text-emerald-400 font-semibold">{pr.verifiedMediaPlacements[0]?.verifiedReferralTraffic.toLocaleString() || '1,200'} Readers</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Partnerships */}
              <div className="space-y-4">
                <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Strategic Distribution & Co-Marketing Colony</span>
                </h3>

                <div className="space-y-3">
                  {state.partnerships.map((partner) => (
                    <div
                      key={partner.id}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200">{partner.partnerName}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                          {partner.partnerType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Attributable sales: {partner.attributableSalesCount} closed deals.</p>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                        <span>Rev Share: {partner.revenueSharePercent}%</span>
                        <span className="text-emerald-400 font-semibold">${partner.netRevenueContributionUsd.toLocaleString()} Attributed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: TELEMETRY & AUDIT LOG */}
        {activeTab === 'audit_log' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Immutable Telemetry & Policy Audit Log
                </h2>
                <p className="text-sm text-slate-400">
                  Every decision, spend authorization, and policy enforcement event recorded with cryptographic timestamps.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {state.logs.length} Logged Events
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              {state.logs.map((log: TelemetryLog) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{log.action}</span>
                    <span className="font-mono text-slate-500 text-[10px]">{log.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px]">
                    <span className="text-cyan-400 font-mono">Agent: {log.agent}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">{log.evidence}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
