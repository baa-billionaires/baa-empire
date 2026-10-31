import React, { useState, useMemo } from 'react';
import {
  Globe,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Building2,
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
  Download,
  Code,
  Shield,
  FileSpreadsheet,
  CheckCircle,
  Flag,
  ArrowRight,
  Sliders,
  DollarSign,
  Scale,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';
import { PolicyRecord, GovernanceJurisdiction, PolicyLegalStatus, AgentConstitution } from '../types/governance';
import {
  INITIAL_POLICY_RECORDS,
  INITIAL_CONSTITUTIONS,
  loadGovernanceData,
  saveGovernanceData
} from '../lib/governanceService';
import { AgentConstitutionCompiler } from '../components/governance/AgentConstitutionCompiler';

interface GlobalPolicyObservatoryPageProps {
  onNavigate?: (page: string) => void;
}

export const GlobalPolicyObservatoryPage: React.FC<GlobalPolicyObservatoryPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'observatory' | 'compiler' | 'matrix'>('observatory');
  const [policies, setPolicies] = useState<PolicyRecord[]>(() =>
    loadGovernanceData<PolicyRecord[]>('policies', INITIAL_POLICY_RECORDS)
  );
  const [constitutions, setConstitutions] = useState<AgentConstitution[]>(() =>
    loadGovernanceData<AgentConstitution[]>('constitutions', INITIAL_CONSTITUTIONS)
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedEffectiveHorizon, setSelectedEffectiveHorizon] = useState<'all' | 'in_force' | '2026' | '2027'>('all');

  // Modal / Detail Drawer
  const [inspectingPolicy, setInspectingPolicy] = useState<PolicyRecord | null>(null);

  // Pre-seed compiler with selected policy
  const [compilerPreloadPolicy, setCompilerPreloadPolicy] = useState<PolicyRecord | null>(null);

  const STATUS_CONFIG: Record<PolicyLegalStatus, { label: string; badgeClass: string }> = {
    enacted_law: {
      label: 'Enacted Law (Binding)',
      badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
    },
    proposed_legislation: {
      label: 'Proposed Bill',
      badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-700/60'
    },
    regulatory_guidance: {
      label: 'Regulatory Guidance',
      badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-700/60'
    },
    voluntary_standard: {
      label: 'Voluntary Standard',
      badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-700/60'
    },
    draft_standard: {
      label: 'Draft RFC Standard',
      badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60'
    },
    multilateral_treaty: {
      label: 'Intergovernmental Treaty',
      badgeClass: 'bg-rose-950/80 text-rose-300 border-rose-700/60'
    }
  };

  const CATEGORY_COLORS: Record<string, string> = {
    AI: 'bg-indigo-950/70 text-indigo-300 border-indigo-700/60',
    Blockchain: 'bg-amber-950/70 text-amber-300 border-amber-700/60',
    Web3: 'bg-cyan-950/70 text-cyan-300 border-cyan-700/60',
    'Autonomous Agents': 'bg-emerald-950/70 text-emerald-300 border-emerald-700/60',
    'Cross-Disciplinary': 'bg-fuchsia-950/70 text-fuchsia-300 border-fuchsia-700/60'
  };

  // Distinct countries/jurisdictions
  const countryList = useMemo(() => {
    const set = new Set<string>();
    policies.forEach(p => {
      if (p.country) set.add(p.country);
    });
    return ['All', ...Array.from(set)];
  }, [policies]);

  const categories = ['All', 'AI', 'Blockchain', 'Web3', 'Autonomous Agents', 'Cross-Disciplinary'];

  // Filtered dataset
  const filteredPolicies = useMemo(() => {
    return policies.filter(p => {
      if (selectedCountry !== 'All' && p.country !== selectedCountry) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && p.legalStatus !== selectedStatus) return false;

      const effDateStr = p.effectiveDate || '2026-01-01';
      if (selectedEffectiveHorizon === 'in_force') {
        const eff = new Date(effDateStr).getTime();
        const now = new Date('2026-10-31').getTime();
        if (eff > now) return false;
      } else if (selectedEffectiveHorizon === '2026') {
        if (!effDateStr.startsWith('2026') && !p.timelineMilestones?.some(m => m.date.startsWith('2026') && !m.isPast)) {
          return false;
        }
      } else if (selectedEffectiveHorizon === '2027') {
        const effYear = parseInt(effDateStr.slice(0, 4));
        const has2027Milestone = p.timelineMilestones?.some(m => parseInt(m.date.slice(0, 4)) >= 2027);
        if (effYear < 2027 && !has2027Milestone) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.issuingBody.toLowerCase().includes(q) ||
          p.jurisdiction.toLowerCase().includes(q) ||
          (p.country && p.country.toLowerCase().includes(q)) ||
          p.summary.toLowerCase().includes(q) ||
          (p.penaltyRisk && p.penaltyRisk.toLowerCase().includes(q)) ||
          p.keyRequirements.some(r => r.toLowerCase().includes(q)) ||
          p.affectedSectors.some(s => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [policies, selectedCountry, selectedCategory, selectedStatus, selectedEffectiveHorizon, searchQuery]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = policies.length;
    const enacted = policies.filter(p => p.legalStatus === 'enacted_law').length;
    const aiCount = policies.filter(p => p.category === 'AI').length;
    const blockchainWeb3Count = policies.filter(p => p.category === 'Blockchain' || p.category === 'Web3').length;
    const countriesCount = new Set(policies.map(p => p.country || p.jurisdiction)).size;
    return { total, enacted, aiCount, blockchainWeb3Count, countriesCount };
  }, [policies]);

  const handleSaveConstitution = (c: AgentConstitution) => {
    const updated = [c, ...constitutions.filter(existing => existing.id !== c.id)];
    setConstitutions(updated);
    saveGovernanceData('constitutions', updated);
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Regulation Title',
      'Country',
      'Jurisdiction',
      'Category',
      'Legal Status',
      'Issuing Body',
      'Publication Date',
      'Effective Date',
      'Penalty Risk',
      'Official Source URL'
    ];

    const rows = filteredPolicies.map(p => [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.country || p.jurisdiction}"`,
      `"${p.jurisdiction}"`,
      `"${p.category || 'AI'}"`,
      `"${p.legalStatus}"`,
      `"${p.issuingBody.replace(/"/g, '""')}"`,
      `"${p.publicationDate}"`,
      `"${p.effectiveDate}"`,
      `"${(p.penaltyRisk || '').replace(/"/g, '""')}"`,
      `"${p.officialSourceUrl}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `BAA_Global_Policy_Observatory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredPolicies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `BAA_Global_Policy_Observatory_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleTranslateToConstitution = (policy: PolicyRecord) => {
    setCompilerPreloadPolicy(policy);
    setInspectingPolicy(null);
    setActiveTab('compiler');
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-8 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/60 text-blue-300 text-xs font-mono font-bold tracking-wide">
                <Globe className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>BAA FLAGSHIP REGULATORY OBSERVATORY • REAL-WORLD LEGISLATION TRACKER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white">
                Global Policy Intelligence Observatory™
              </h1>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Autonomous international surveillance of AI governance frameworks, blockchain asset rules, stablecoin directives, and Web3 verifiable standards. Translate statutory obligations into machine-enforceable agent constitutions.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-zinc-400">
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold">
                  ✓ Verified Source Grounding
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#FFD700] font-semibold">
                  ✓ EU AI Act + MiCA + NIST + SEC Nigeria + VARA
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-cyan-400 font-semibold">
                  ✓ Direct Constitution Compiler
                </span>
              </div>
            </div>

            {/* Quick Actions & Navigation to Governance Lab */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('governance')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-[#FFD700] text-xs font-semibold text-zinc-200 hover:text-white transition cursor-pointer shadow"
                >
                  <Scale className="w-4 h-4 text-[#FFD700]" />
                  <span>Open Full Governance Institute (PVAIDC)</span>
                </button>
              )}
              {onNavigate && (
                <button
                  onClick={() => onNavigate('deal-room')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-[#00D4FF] text-xs font-semibold text-zinc-200 hover:text-white transition cursor-pointer shadow"
                >
                  <Building2 className="w-4 h-4 text-[#00D4FF]" />
                  <span>Institutional Deal Room &amp; Exchange</span>
                </button>
              )}
            </div>
          </div>

          {/* KEY METRICS DASHBOARD TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-800/80">
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">Monitored Frameworks</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-white">{stats.total}</span>
                <span className="text-xs font-mono text-emerald-400">100% active</span>
              </div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Live statutory gazettes</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">Sovereign Jurisdictions</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#FFD700]">{stats.countriesCount}</span>
                <span className="text-xs font-mono text-zinc-400">Blocs</span>
              </div>
              <span className="text-[11px] text-zinc-500 mt-1 block">EU, US, Pan-Africa, NG, SG, UK, UAE</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">Legally Binding Acts</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-emerald-400">{stats.enacted}</span>
                <span className="text-xs font-mono text-zinc-400">Enacted Laws</span>
              </div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Statutory fines enforceable</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider block">Compiled Constitutions</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl sm:text-3xl font-heading font-black text-[#00D4FF]">{constitutions.length}</span>
                <span className="text-xs font-mono text-cyan-400">Schemas</span>
              </div>
              <span className="text-[11px] text-zinc-500 mt-1 block">Machine-enforceable rules</span>
            </div>
          </div>
        </div>

        {/* TOP TAB NAVIGATOR */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('observatory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'observatory'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Policy Intelligence Table</span>
              <span className="px-1.5 py-0.2 rounded-md bg-white/20 text-[10px] font-mono">
                {filteredPolicies.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('compiler')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'compiler'
                  ? 'bg-[#FFD700] text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Agent Constitution Compiler™</span>
              <span className="px-1.5 py-0.2 rounded-md bg-black/20 text-[10px] font-mono">
                ACTIVE
              </span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Statutory Penalty &amp; Compliance Matrix</span>
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition cursor-pointer"
              title="Export filtered records as CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>CSV Export</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition cursor-pointer"
              title="Export filtered records as JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>JSON Schema</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OBSERVATORY DASHBOARD & TABULAR VIEW */}
        {activeTab === 'observatory' && (
          <div className="space-y-6">
            {/* FILTER & CATEGORIZATION CONTROLS */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search Bar */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by act title, country, issuing body, penalty risk, or keywords..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] text-xs text-white placeholder-zinc-500 outline-none transition font-sans"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Country / Jurisdiction Selector */}
                <div className="md:col-span-3">
                  <select
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                    aria-label="Filter by Country or Sovereign Jurisdiction"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-[#FFD700] cursor-pointer"
                  >
                    {countryList.map(c => (
                      <option key={c} value={c}>
                        {c === 'All' ? '🌐 All Countries & Jurisdictions' : `📍 ${c}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Selector */}
                <div className="md:col-span-2">
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    aria-label="Filter by Regulatory Category"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-[#FFD700] cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? '📂 All Categories' : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Selector */}
                <div className="md:col-span-2">
                  <select
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    aria-label="Filter by Legal Status"
                    className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white outline-none focus:border-[#FFD700] cursor-pointer"
                  >
                    <option value="All">⚖️ All Legal Statuses</option>
                    <option value="enacted_law">Enacted Law (Binding)</option>
                    <option value="regulatory_guidance">Regulatory Guidance</option>
                    <option value="voluntary_standard">Voluntary Standard</option>
                    <option value="multilateral_treaty">Multilateral Treaty</option>
                  </select>
                </div>
              </div>

              {/* QUICK PILL SELECTORS FOR EFFECTIVE DATE HORIZON */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-800/80 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-zinc-500 font-mono text-[11px] mr-1">Effective Date Horizon:</span>
                  <button
                    onClick={() => setSelectedEffectiveHorizon('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                      selectedEffectiveHorizon === 'all'
                        ? 'bg-zinc-100 text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    All Horizons ({policies.length})
                  </button>
                  <button
                    onClick={() => setSelectedEffectiveHorizon('in_force')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer flex items-center gap-1 ${
                      selectedEffectiveHorizon === 'in_force'
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-zinc-900 text-emerald-400 hover:text-white border border-emerald-900/50'
                    }`}
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>In-Force Now</span>
                  </button>
                  <button
                    onClick={() => setSelectedEffectiveHorizon('2026')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer flex items-center gap-1 ${
                      selectedEffectiveHorizon === '2026'
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-zinc-900 text-amber-400 hover:text-white border border-amber-900/50'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>2026 Mandates (High Risk)</span>
                  </button>
                  <button
                    onClick={() => setSelectedEffectiveHorizon('2027')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition cursor-pointer flex items-center gap-1 ${
                      selectedEffectiveHorizon === '2027'
                        ? 'bg-purple-500 text-white font-bold'
                        : 'bg-zinc-900 text-purple-400 hover:text-white border border-purple-900/50'
                    }`}
                  >
                    <Calendar className="w-3 h-3" />
                    <span>2027+ Horizons</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-zinc-500">
                  Showing <span className="text-[#FFD700] font-bold">{filteredPolicies.length}</span> of {policies.length} international instruments
                </div>
              </div>
            </div>

            {/* HIGH-DENSITY CLEAN TABULAR DASHBOARD */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/80 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      <th className="py-3.5 px-4 font-bold">Act / Standard Title</th>
                      <th className="py-3.5 px-3 font-bold">Country &amp; Flag</th>
                      <th className="py-3.5 px-3 font-bold">Jurisdiction</th>
                      <th className="py-3.5 px-3 font-bold">Category</th>
                      <th className="py-3.5 px-3 font-bold">Legal Status</th>
                      <th className="py-3.5 px-3 font-bold">Effective Date</th>
                      <th className="py-3.5 px-4 font-bold">Penalty Exposure</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 font-sans">
                    {filteredPolicies.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-zinc-500 font-mono text-xs">
                          No legislation matched the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredPolicies.map(policy => {
                        const statusObj = STATUS_CONFIG[policy.legalStatus] || {
                          label: policy.legalStatus,
                          badgeClass: 'bg-zinc-800 text-zinc-300'
                        };
                        const categoryClass = CATEGORY_COLORS[policy.category || 'AI'] || 'bg-zinc-800 text-zinc-300';
                        const isLive = new Date(policy.effectiveDate || '2026-01-01').getTime() <= new Date('2026-10-31').getTime();

                        return (
                          <tr
                            key={policy.id}
                            className="hover:bg-zinc-900/50 transition-colors group cursor-pointer"
                            onClick={() => setInspectingPolicy(policy)}
                          >
                            {/* Title & Issuing Body */}
                            <td className="py-3 px-4 max-w-xs">
                              <div className="font-semibold text-white group-hover:text-[#FFD700] transition line-clamp-2">
                                {policy.title}
                              </div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">
                                {policy.issuingBody}
                              </div>
                            </td>

                            {/* Country & Flag */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="text-base">{policy.flag || '🌐'}</span>
                                <span className="text-zinc-200 font-medium">{policy.country || policy.jurisdiction}</span>
                              </div>
                            </td>

                            {/* Jurisdiction */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="text-zinc-400 font-mono text-[11px]">
                                {policy.jurisdiction}
                              </span>
                            </td>

                            {/* Category Badge */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${categoryClass}`}>
                                {policy.category || 'AI'}
                              </span>
                            </td>

                            {/* Legal Status */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${statusObj.badgeClass}`}>
                                {statusObj.label}
                              </span>
                            </td>

                            {/* Effective Date */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="font-mono text-zinc-200">{policy.effectiveDate}</span>
                                <span className={`text-[9px] font-mono font-bold ${isLive ? 'text-emerald-400' : 'text-amber-400'}`}>
                                  {isLive ? '● Live In-Force' : '○ Pending Mandate'}
                                </span>
                              </div>
                            </td>

                            {/* Penalty Exposure */}
                            <td className="py-3 px-4 max-w-xs">
                              <div className="text-[11px] text-rose-300 font-mono line-clamp-2 leading-tight">
                                {policy.penaltyRisk || 'Statutory review & license constraints'}
                              </div>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setInspectingPolicy(policy)}
                                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition"
                                  title="Inspect full legal requirements"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleTranslateToConstitution(policy)}
                                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/40 font-mono text-[10px] font-bold transition"
                                  title="Compile into machine-readable Agent Constitution"
                                >
                                  <Code className="w-3 h-3" />
                                  <span>Compile</span>
                                </button>
                                <a
                                  href={policy.officialSourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-[#00D4FF] border border-zinc-800 transition"
                                  title="View official legal gazette"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SUMMARY STATS CARDS BY CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 font-bold uppercase">AI Safety &amp; Management</span>
                  <span className="text-xs font-mono text-zinc-500">{policies.filter(p => p.category === 'AI').length} Acts</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Includes EU AI Act risk categorizations, NIST AI RMF 1.0 trustworthy functions, and ISO/IEC 42001 certifiable systems.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">Blockchain &amp; Stablecoins</span>
                  <span className="text-xs font-mono text-zinc-500">{policies.filter(p => p.category === 'Blockchain').length} Acts</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Enforces EU MiCA CASP licensing, SEC Nigeria DAOP/DAX registrations, and US stablecoin liquidity reserve requirements.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Web3 Identity &amp; Agents</span>
                  <span className="text-xs font-mono text-zinc-500">{policies.filter(p => p.category === 'Web3' || p.category === 'Autonomous Agents').length} Acts</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Operationalizes W3C Verifiable Credentials 2.0, Dubai VARA rulebooks, and UK FCA algorithmic consumer protections.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AGENT CONSTITUTION COMPILER EMBED */}
        {activeTab === 'compiler' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-950 to-zinc-950 border border-[#FFD700]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 text-[#FFD700] text-[10px] font-mono font-bold">
                  <Code className="w-3 h-3" />
                  <span>INTEGRATED CONSTITUTION COMPILER ENGINE</span>
                </div>
                <h3 className="text-lg font-heading font-black text-white">
                  Translate Legal Legislation into Machine-Enforceable Agent Constitutions
                </h3>
                <p className="text-xs text-zinc-300 max-w-2xl">
                  {compilerPreloadPolicy ? (
                    <span>
                      Currently anchored to <strong className="text-[#FFD700]">{compilerPreloadPolicy.title}</strong> ({compilerPreloadPolicy.country}). All generated JSON-LD schemas include strict spend bounds, DID identity proofs, and human kill switches.
                    </span>
                  ) : (
                    <span>
                      Select an existing agent preset or craft custom permission boundaries, financial spend caps, and cryptographic verification schemas compliant with the Global Observatory.
                    </span>
                  )}
                </p>
              </div>

              {compilerPreloadPolicy && (
                <button
                  onClick={() => setCompilerPreloadPolicy(null)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white shrink-0"
                >
                  Clear Anchor Policy
                </button>
              )}
            </div>

            {/* Embedded Agent Constitution Compiler Component */}
            <AgentConstitutionCompiler
              constitutions={constitutions}
              onSaveConstitution={handleSaveConstitution}
            />
          </div>
        )}

        {/* TAB 3: STATUTORY PENALTY & COMPLIANCE MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-heading font-black text-white">
                    International Statutory Penalty &amp; Risk Matrix
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Comparative enforcement liabilities for algorithmic misconduct, unverified marketing, and autonomous financial breaches.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-950/60 border border-rose-700 text-rose-300 text-xs font-mono font-bold">
                  ENFORCEMENT AUDIT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {policies.map(p => (
                  <div key={p.id} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg">{p.flag || '🌐'}</span>
                        <span className="text-xs font-bold text-white">{p.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 shrink-0">{p.jurisdiction}</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/50">
                      <span className="text-[9px] font-mono uppercase text-rose-400 block font-bold">Statutory Penalty Risk</span>
                      <p className="text-xs text-rose-200 mt-0.5 font-sans leading-relaxed">
                        {p.penaltyRisk || 'Statutory sanctions, corrective measures, and exclusion from public procurement.'}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/60">
                      <span className="text-[9px] font-mono uppercase text-emerald-400 block font-bold">BAA Automated Safeguard</span>
                      <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                        {p.complianceReadinessNotes || 'Guarded via PVAIDC bounded autonomy spend caps and cryptographic logs.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DETAILED REGULATION INSPECTION DRAWER / MODAL */}
        {inspectingPolicy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{inspectingPolicy.flag || '🌐'}</span>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {inspectingPolicy.country || inspectingPolicy.jurisdiction} • {inspectingPolicy.jurisdiction}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${CATEGORY_COLORS[inspectingPolicy.category || 'AI'] || 'bg-zinc-800 text-zinc-300'}`}>
                      {inspectingPolicy.category || 'AI'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${STATUS_CONFIG[inspectingPolicy.legalStatus]?.badgeClass || 'bg-zinc-800 text-zinc-300'}`}>
                      {STATUS_CONFIG[inspectingPolicy.legalStatus]?.label || inspectingPolicy.legalStatus}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
                    {inspectingPolicy.title}
                  </h2>
                  <div className="text-xs text-zinc-400 font-mono">
                    Issuing Authority: <span className="text-zinc-200">{inspectingPolicy.issuingBody}</span>
                  </div>
                </div>

                <button
                  onClick={() => setInspectingPolicy(null)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* DATES & SOURCE */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Publication</span>
                  <span className="text-zinc-200 font-semibold">{inspectingPolicy.publicationDate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Effective Date</span>
                  <span className="text-emerald-400 font-semibold">{inspectingPolicy.effectiveDate}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Last Verified</span>
                  <span className="text-zinc-300">{inspectingPolicy.lastVerifiedAt}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] uppercase block">Official Gazette</span>
                  <a
                    href={inspectingPolicy.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00D4FF] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Text</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">Legislative Summary</h4>
                <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-850">
                  {inspectingPolicy.summary}
                </p>
              </div>

              {/* STATUTORY PENALTY EXPOSURE */}
              {inspectingPolicy.penaltyRisk && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 space-y-1">
                  <div className="flex items-center gap-2 text-rose-300 font-mono text-xs font-bold uppercase">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Statutory Penalty Exposure &amp; Enforcement Sanctions</span>
                  </div>
                  <p className="text-xs text-rose-200 leading-relaxed font-sans">
                    {inspectingPolicy.penaltyRisk}
                  </p>
                </div>
              )}

              {/* KEY REQUIREMENTS */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                  Core Compliance Obligations &amp; Technical Mandates
                </h4>
                <div className="space-y-2">
                  {inspectingPolicy.keyRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-800/80">
                      <span className="w-4 h-4 rounded-full bg-blue-950 text-blue-400 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TIMELINE MILESTONES */}
              {inspectingPolicy.timelineMilestones && inspectingPolicy.timelineMilestones.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                    Implementation Timeline &amp; Milestones
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {inspectingPolicy.timelineMilestones.map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-xs flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${m.isPast ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                        <div>
                          <span className="font-mono text-[10px] text-zinc-400 block">{m.date}</span>
                          <span className="text-zinc-200">{m.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACTION FOOTER */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800 flex-wrap gap-3">
                <a
                  href={inspectingPolicy.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white font-mono"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Official Document ({inspectingPolicy.issuingBody})</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInspectingPolicy(null)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleTranslateToConstitution(inspectingPolicy)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFD700] hover:bg-[#ffe234] text-black text-xs font-bold shadow-lg transition"
                  >
                    <Code className="w-4 h-4" />
                    <span>Compile into Agent Constitution</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
