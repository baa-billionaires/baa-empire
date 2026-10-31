import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldCheck,
  Clock,
  ExternalLink,
  ChevronRight,
  DollarSign,
  Briefcase,
  Award,
  Cpu,
  Handshake,
  Landmark,
  Coins,
  CheckCircle,
  AlertCircle,
  Calendar,
  Globe2,
  FileText,
  X,
  Sparkles,
  Bot,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Check,
  Copy,
  ArrowRight,
  Zap,
  BookmarkPlus
} from 'lucide-react';
import {
  OpportunityRecord,
  OpportunityCategory,
  FundingType,
  DiscoveryAgent,
  DiscoveryAgentId,
  SourceConnector
} from '../../types/dealRoom';

interface ThreePanelOpportunityExplorerProps {
  opportunities: OpportunityRecord[];
  agents: DiscoveryAgent[];
  connectors: SourceConnector[];
  isSwarmRunning?: boolean;
  onTriggerSwarmCycle: () => void;
  onSelectForOutreach?: (opportunity: OpportunityRecord) => void;
  onSelectForFundingStudio?: (opportunity: OpportunityRecord) => void;
  onSelectForBidWorkflow?: (opportunity: OpportunityRecord) => void;
  onAddDealToPipeline?: (opportunity: OpportunityRecord) => void;
  isAdmin?: boolean;
}

export const ThreePanelOpportunityExplorer: React.FC<ThreePanelOpportunityExplorerProps> = ({
  opportunities,
  agents,
  connectors,
  isSwarmRunning = false,
  onTriggerSwarmCycle,
  onSelectForOutreach,
  onSelectForFundingStudio,
  onSelectForBidWorkflow,
  onAddDealToPipeline,
  isAdmin = false
}) => {
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedFundingType, setSelectedFundingType] = useState<FundingType | 'all'>('all');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedFundingRange, setSelectedFundingRange] = useState<'all' | 'under_50k' | '50k_150k' | '150k_350k' | 'over_350k'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [urgentDeadlinesOnly, setUrgentDeadlinesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'funding_desc' | 'deadline_asc' | 'confidence_desc' | 'newest'>('confidence_desc');

  // Selected Opportunity for Detail View
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedDealSuccess, setAddedDealSuccess] = useState(false);

  // Category Configuration
  const CATEGORIES: Array<{ id: OpportunityCategory | 'all'; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'all', label: 'All Engines', icon: Sparkles },
    { id: 'ai_contracts', label: '1. AI Contracts', icon: Briefcase },
    { id: 'grants_innovation', label: '2. Grants & Innovation', icon: Award },
    { id: 'project_loans', label: '3. AI Project Loans', icon: Landmark },
    { id: 'equity_vc', label: '4. Equity & VC', icon: Coins },
    { id: 'compute_credits', label: '5. Compute Credits', icon: Cpu },
    { id: 'corporate_partnerships', label: '6. Corporate Deals', icon: Handshake }
  ];

  // Infer originating agent helper if not explicitly set
  const getAgentForOpportunity = (opp: OpportunityRecord): string => {
    if (opp.originatingAgentId) return opp.originatingAgentId;
    switch (opp.category) {
      case 'ai_contracts':
        return opp.fundingType === 'contract' ? 'AIContractHunter' : 'GlobalOpportunityScanner';
      case 'grants_innovation':
        return 'GrantAndInnovationScout';
      case 'project_loans':
        return 'ProjectLoanFinder';
      case 'equity_vc':
        return 'InvestorDiscoveryAgent';
      case 'compute_credits':
        return 'ComputeCreditScout';
      case 'corporate_partnerships':
        return 'PartnershipHunter';
      default:
        return 'GlobalOpportunityScanner';
    }
  };

  // Filtered Opportunities
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      // Category
      if (selectedCategory !== 'all' && opp.category !== selectedCategory) return false;
      // Funding Type
      if (selectedFundingType !== 'all' && opp.fundingType !== selectedFundingType) return false;
      // Agent
      if (selectedAgent !== 'all') {
        const agentName = getAgentForOpportunity(opp);
        if (agentName !== selectedAgent) return false;
      }
      // Country
      if (selectedCountry !== 'All') {
        const matchesCountry = opp.eligibleCountries.some(
          c => c.toLowerCase().includes(selectedCountry.toLowerCase()) || c === 'Global' || c === 'Pan-African'
        );
        if (!matchesCountry) return false;
      }
      // Funding Range
      if (selectedFundingRange === 'under_50k' && opp.maxFundingUsd >= 50000) return false;
      if (selectedFundingRange === '50k_150k' && (opp.maxFundingUsd < 50000 || opp.maxFundingUsd > 150000)) return false;
      if (selectedFundingRange === '150k_350k' && (opp.maxFundingUsd < 150000 || opp.maxFundingUsd > 350000)) return false;
      if (selectedFundingRange === 'over_350k' && opp.maxFundingUsd <= 350000) return false;
      // Verified Only
      if (verifiedOnly && !opp.isVerified) return false;
      // Urgent Deadlines (< 30 days)
      if (urgentDeadlinesOnly) {
        if (!opp.deadline) return false;
        const diffDays = Math.ceil((new Date(opp.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
        if (diffDays < 0 || diffDays > 30) return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          opp.title.toLowerCase().includes(q) ||
          opp.providerName.toLowerCase().includes(q) ||
          opp.sector.toLowerCase().includes(q) ||
          opp.summary.toLowerCase().includes(q) ||
          opp.scopeOfWork.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'funding_desc') return b.maxFundingUsd - a.maxFundingUsd;
      if (sortBy === 'deadline_asc') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === 'newest') return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      return b.confidenceScore - a.confidenceScore;
    });
  }, [
    opportunities,
    selectedCategory,
    selectedFundingType,
    selectedAgent,
    selectedCountry,
    selectedFundingRange,
    verifiedOnly,
    urgentDeadlinesOnly,
    searchQuery,
    sortBy
  ]);

  // Active Opportunity currently selected
  const activeOpportunity = useMemo(() => {
    return (
      opportunities.find(o => o.id === selectedOppId) ||
      filteredOpportunities[0] ||
      opportunities[0]
    );
  }, [opportunities, filteredOpportunities, selectedOppId]);

  const getFundingTypeBadge = (type: FundingType) => {
    switch (type) {
      case 'contract':
        return { label: 'Commercial Contract', bg: 'bg-blue-950/80 text-blue-300 border-blue-800' };
      case 'grant':
        return { label: 'Non-Dilutive Grant', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800' };
      case 'debt_loan':
        return { label: 'Concessionary Debt', bg: 'bg-amber-950/80 text-amber-300 border-amber-800' };
      case 'equity':
        return { label: 'Strategic Equity / VC', bg: 'bg-purple-950/80 text-purple-300 border-purple-800' };
      case 'non_cash_credit':
        return { label: 'Cloud Compute Credit', bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-800' };
      case 'revenue_share_partnership':
        return { label: 'Revenue Share / VAS', bg: 'bg-rose-950/80 text-rose-300 border-rose-800' };
    }
  };

  const getDaysRemaining = (deadlineStr: string) => {
    if (!deadlineStr) return null;
    const diff = new Date(deadlineStr).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  const handleCopyLink = () => {
    if (!activeOpportunity) return;
    navigator.clipboard.writeText(activeOpportunity.officialSourceUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToPipeline = () => {
    if (!activeOpportunity) return;
    if (onAddDealToPipeline) {
      onAddDealToPipeline(activeOpportunity);
    }
    setAddedDealSuccess(true);
    setTimeout(() => setAddedDealSuccess(false), 2500);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFundingType('all');
    setSelectedAgent('all');
    setSelectedCountry('All');
    setSelectedFundingRange('all');
    setVerifiedOnly(false);
    setUrgentDeadlinesOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'all' ||
    selectedFundingType !== 'all' ||
    selectedAgent !== 'all' ||
    selectedCountry !== 'All' ||
    selectedFundingRange !== 'all' ||
    verifiedOnly ||
    urgentDeadlinesOnly;

  return (
    <div className="space-y-4">
      {/* SWARM STATUS TICKER */}
      <div className="px-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-wrap items-center justify-between text-xs font-mono gap-2 text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-zinc-200 font-bold">Autonomous Swarm Live</span>
          <span className="text-zinc-500">•</span>
          <span>12 Cooperating Agents</span>
          <span className="text-zinc-500">•</span>
          <span>{opportunities.length} Verified Notices Ingested</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-zinc-500">
            Connected: TED EU, UNGM, Base Grants, BoI, AWS Activate, MTN VAS
          </span>
          <button
            onClick={onTriggerSwarmCycle}
            disabled={isSwarmRunning}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 transition text-[11px] font-bold"
          >
            <RefreshCw className={`w-3 h-3 ${isSwarmRunning ? 'animate-spin' : ''}`} />
            <span>{isSwarmRunning ? 'Scanning...' : 'Run Swarm Cycle'}</span>
          </button>
        </div>
      </div>

      {/* THREE-PANEL INTERFACE CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[780px]">
        
        {/* ======================================================== */}
        {/* PANEL 1: FILTERING SIDEBAR (3 cols on desktop)          */}
        {/* ======================================================== */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
            
            {/* Header with clear button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-300 font-bold">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Filters &amp; Swarm Radar</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-mono text-[#FFD700] hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search contracts, RFPs, grants..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Engine Categories */}
            <div className="space-y-1 pt-1">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Opportunity Engines ({CATEGORIES.length - 1})
              </label>
              <div className="space-y-1">
                {CATEGORIES.map(cat => {
                  const count = cat.id === 'all'
                    ? opportunities.length
                    : opportunities.filter(o => o.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;
                  const Icon = cat.icon;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                        isSelected
                          ? 'bg-[#FFD700] text-black font-bold shadow-sm'
                          : 'text-zinc-400 hover:text-white hover:bg-zinc-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{cat.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Harvesting Discovery Agent Filter */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold flex items-center justify-between">
                <span>Discovered By Agent</span>
                <span className="text-[9px] text-[#FFD700]">Swarm Origin</span>
              </label>
              <select
                value={selectedAgent}
                onChange={e => setSelectedAgent(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-[#FFD700]"
              >
                <option value="all">All 12 Swarm Agents</option>
                <option value="GlobalOpportunityScanner">🌐 GlobalOpportunityScanner (Gazette)</option>
                <option value="AIContractHunter">🤖 AIContractHunter (RFPs &amp; Contracts)</option>
                <option value="GrantAndInnovationScout">🌱 GrantAndInnovationScout (Grants)</option>
                <option value="ProjectLoanFinder">🏦 ProjectLoanFinder (Debt/Loans)</option>
                <option value="InvestorDiscoveryAgent">💎 InvestorDiscoveryAgent (VC/Angels)</option>
                <option value="ComputeCreditScout">⚡ ComputeCreditScout (GPU Credits)</option>
                <option value="PartnershipHunter">🤝 PartnershipHunter (Distribution)</option>
              </select>
            </div>

            {/* Funding Instrument Type */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Funding Instrument
              </label>
              <select
                value={selectedFundingType}
                onChange={e => setSelectedFundingType(e.target.value as FundingType | 'all')}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-[#FFD700]"
              >
                <option value="all">All Instruments</option>
                <option value="contract">Commercial Contract</option>
                <option value="grant">Non-Dilutive Grant</option>
                <option value="debt_loan">Concessionary Debt / Loan</option>
                <option value="equity">Strategic Equity / VC</option>
                <option value="non_cash_credit">Non-Cash Cloud Credits</option>
                <option value="revenue_share_partnership">Revenue Share Partnership</option>
              </select>
            </div>

            {/* Funding Range */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Funding Amount
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                {[
                  { id: 'all', label: 'Any Amount' },
                  { id: 'under_50k', label: '< $50k' },
                  { id: '50k_150k', label: '$50k - $150k' },
                  { id: '150k_350k', label: '$150k - $350k' },
                  { id: 'over_350k', label: '$350k+' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedFundingRange(r.id as any)}
                    className={`px-2 py-1 rounded text-center transition ${
                      selectedFundingRange === r.id
                        ? 'bg-zinc-700 text-[#FFD700] font-bold border border-[#FFD700]/50'
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Geographic Eligibility */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-800">
              <label className="text-[10px] font-mono uppercase text-zinc-400 block font-semibold">
                Geographic Scope
              </label>
              <select
                value={selectedCountry}
                onChange={e => setSelectedCountry(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-[#FFD700]"
              >
                <option value="All">All Regions (Global &amp; African)</option>
                <option value="Pan-African">Pan-African</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Global">Global / International</option>
                <option value="EU">European Union / UK</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-zinc-400 group-hover:text-zinc-200">Verified Official Only</span>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={e => setVerifiedOnly(e.target.checked)}
                  className="rounded bg-zinc-950 border-zinc-700 text-[#FFD700] focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-zinc-400 group-hover:text-zinc-200">Urgent Cutoffs (&lt; 30d)</span>
                <input
                  type="checkbox"
                  checked={urgentDeadlinesOnly}
                  onChange={e => setUrgentDeadlinesOnly(e.target.checked)}
                  className="rounded bg-zinc-950 border-zinc-700 text-[#FFD700] focus:ring-0"
                />
              </label>
            </div>

          </div>
        </aside>

        {/* ======================================================== */}
        {/* PANEL 2: OPPORTUNITY FEED (4 cols on desktop)           */}
        {/* ======================================================== */}
        <section className="lg:col-span-4 space-y-3 flex flex-col">
          {/* Feed Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-zinc-300 font-bold">
                Opportunity Feed
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300">
                {filteredOpportunities.length} Available
              </span>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-[11px] font-mono text-zinc-300 focus:outline-none"
            >
              <option value="confidence_desc">Best Match</option>
              <option value="funding_desc">Highest Funding</option>
              <option value="deadline_asc">Closest Deadline</option>
              <option value="newest">Newest Published</option>
            </select>
          </div>

          {/* Cards Scrollable Stream */}
          <div className="space-y-3 overflow-y-auto max-h-[750px] pr-1 no-scrollbar flex-1">
            {filteredOpportunities.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3">
                <Bot className="w-8 h-8 text-zinc-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">No Matching Notices</h4>
                <p className="text-xs text-zinc-400">
                  Try widening your filters or run an autonomous swarm cycle to harvest fresh notices.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 rounded-lg bg-[#FFD700] text-black font-mono text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredOpportunities.map(opp => {
                const isSelected = activeOpportunity?.id === opp.id;
                const typeBadge = getFundingTypeBadge(opp.fundingType);
                const agentName = getAgentForOpportunity(opp);
                const daysRemaining = getDaysRemaining(opp.deadline);
                const isUrgent = daysRemaining !== null && daysRemaining <= 14 && daysRemaining >= 0;

                return (
                  <div
                    key={opp.id}
                    onClick={() => setSelectedOppId(opp.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 relative group ${
                      isSelected
                        ? 'bg-zinc-900 border-[#FFD700] ring-1 ring-[#FFD700]/50 shadow-xl shadow-[#FFD700]/5'
                        : 'bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    {/* Originating Swarm Agent Header Pill */}
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Bot className="w-3.5 h-3.5 text-[#FFD700]" />
                        <span className="text-[#FFD700] font-semibold">{agentName}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] border font-bold ${typeBadge.bg}`}>
                        {typeBadge.label}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-heading font-black text-sm text-white group-hover:text-[#FFD700] transition line-clamp-2 leading-snug">
                        {opp.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                        <span className="font-medium truncate">{opp.providerName}</span>
                        {opp.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Funding and Deadline Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/70 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block">Max Value</span>
                        <span className="font-bold text-emerald-400 text-sm">
                          ${opp.maxFundingUsd.toLocaleString()}{' '}
                          <span className="text-[10px] text-zinc-400 font-normal">{opp.currency}</span>
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 uppercase block">Deadline</span>
                        <span className={`text-xs font-bold ${
                          isUrgent ? 'text-amber-400 animate-pulse' : 'text-zinc-300'
                        }`}>
                          {daysRemaining !== null
                            ? daysRemaining < 0
                              ? 'Expired'
                              : `${daysRemaining}d remaining`
                            : 'Open Rolling'}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Metadata Badges */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span className="truncate max-w-[180px]">
                        {opp.eligibleCountries.slice(0, 2).join(', ')}
                        {opp.eligibleCountries.length > 2 ? ` +${opp.eligibleCountries.length - 2}` : ''}
                      </span>
                      <span className="text-cyan-400 font-bold">
                        {opp.confidenceScore}% Match
                      </span>
                    </div>

                    {/* Active Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FFD700]" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* PANEL 3: DETAIL-VIEW CONTAINER (5 cols on desktop)      */}
        {/* ======================================================== */}
        <main className="lg:col-span-5 space-y-4">
          {activeOpportunity ? (
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5 sticky top-24 max-h-[820px] overflow-y-auto no-scrollbar">
              
              {/* Header */}
              <div className="space-y-2 border-b border-zinc-800 pb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getFundingTypeBadge(activeOpportunity.fundingType).bg}`}>
                    {getFundingTypeBadge(activeOpportunity.fundingType).label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{activeOpportunity.confidenceScore}% Swarm Score</span>
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-heading font-black text-white leading-tight">
                  {activeOpportunity.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono">
                  <span className="text-zinc-200 font-bold flex items-center gap-1">
                    <span>{activeOpportunity.providerName}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </span>
                  <span>•</span>
                  <span>{activeOpportunity.providerType}</span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {isAdmin ? (
                  <button
                    onClick={() => onSelectForOutreach && onSelectForOutreach(activeOpportunity)}
                    className="p-2.5 rounded-xl bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold flex items-center justify-center gap-1.5 transition shadow-md shadow-[#FFD700]/20"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>Engage Secretariat</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectForFundingStudio && onSelectForFundingStudio(activeOpportunity)}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-500/20"
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Funding Studio Audit</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectForBidWorkflow && onSelectForBidWorkflow(activeOpportunity)}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold flex items-center justify-center gap-1.5 transition border border-zinc-700"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Bid Assessment</span>
                </button>
              </div>

              {/* Quick Pipeline and Link Actions */}
              <div className="flex items-center justify-between text-xs font-mono border-y border-zinc-800/80 py-2.5 px-1">
                <button
                  onClick={handleAddToPipeline}
                  className="text-zinc-400 hover:text-[#FFD700] transition flex items-center gap-1.5"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>{addedDealSuccess ? '✓ Tracked in Pipeline' : 'Track Deal in CRM'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="text-zinc-400 hover:text-white transition flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied' : 'Copy Notice'}</span>
                  </button>
                  <a
                    href={activeOpportunity.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 font-bold"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Financial Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Funding Range</span>
                  <span className="font-bold text-white text-xs">
                    ${activeOpportunity.minFundingUsd.toLocaleString()} - ${activeOpportunity.maxFundingUsd.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Currency</span>
                  <span className="font-bold text-emerald-400 text-xs">{activeOpportunity.currency}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Submission Cutoff</span>
                  <span className="font-bold text-zinc-300 text-xs">{activeOpportunity.deadline || 'Rolling Intake'}</span>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase text-[#FFD700] font-bold">
                  Summary &amp; Project Scope
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                  {activeOpportunity.summary}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/40">
                  <strong className="text-zinc-200 block text-[11px] mb-1 font-mono uppercase">Scope of Deliverables:</strong>
                  {activeOpportunity.scopeOfWork}
                </p>
              </div>

              {/* Qualifications & Documents Checklist */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#FFD700] font-bold">
                  Mandatory Qualifications &amp; Required Documents
                </h4>
                <div className="space-y-1.5 text-xs">
                  {activeOpportunity.requiredQualifications.map((q, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-zinc-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                  {activeOpportunity.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-zinc-400">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commercial or Loan/Equity Terms (if present) */}
              {(activeOpportunity.collateralOrEquityTerms || activeOpportunity.interestOrFeeTerms) && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                    Financial &amp; Equity Terms
                  </span>
                  <p className="text-zinc-300">
                    {activeOpportunity.collateralOrEquityTerms || activeOpportunity.interestOrFeeTerms}
                  </p>
                </div>
              )}

              {/* Bid Assessment Notes */}
              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                  AI Swarm Strategic Assessment
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  {activeOpportunity.bidAssessmentNotes}
                </p>
              </div>

              {/* Provenance & Verification Audit Trail */}
              <div className="pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 space-y-1">
                <div className="flex justify-between">
                  <span>Harvesting Swarm Agent:</span>
                  <span className="text-zinc-300 font-bold">{getAgentForOpportunity(activeOpportunity)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Gazette Verification:</span>
                  <span className="text-zinc-300">{activeOpportunity.lastVerifiedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Application Procedure:</span>
                  <span className="text-zinc-300 uppercase">{activeOpportunity.applicationMethod.replace('_', ' ')}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-zinc-500">
              <Sparkles className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="text-xs">Select an opportunity from the feed to inspect its full dossier.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};
