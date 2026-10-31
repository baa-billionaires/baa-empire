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
  Sparkles
} from 'lucide-react';
import { OpportunityRecord, OpportunityCategory, FundingType } from '../../types/dealRoom';

interface SixOpportunityEnginesRadarProps {
  opportunities: OpportunityRecord[];
  onSelectForOutreach?: (opportunity: OpportunityRecord) => void;
  onSelectForFundingStudio?: (opportunity: OpportunityRecord) => void;
  isAdmin?: boolean;
}

export const SixOpportunityEnginesRadar: React.FC<SixOpportunityEnginesRadarProps> = ({
  opportunities,
  onSelectForOutreach,
  onSelectForFundingStudio,
  isAdmin = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all');
  const [selectedFundingType, setSelectedFundingType] = useState<FundingType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCurrency, setSelectedCurrency] = useState('All');
  const [activeModalOpportunity, setActiveModalOpportunity] = useState<OpportunityRecord | null>(null);

  const CATEGORY_TABS: Array<{ id: OpportunityCategory | 'all'; label: string; icon: React.FC<{ className?: string }>; countBadge: number }> = [
    { id: 'all', label: 'All Engines', icon: Sparkles, countBadge: opportunities.length },
    { id: 'ai_contracts', label: '1. AI Contracts', icon: Briefcase, countBadge: opportunities.filter(o => o.category === 'ai_contracts').length },
    { id: 'grants_innovation', label: '2. Grants & Innovation', icon: Award, countBadge: opportunities.filter(o => o.category === 'grants_innovation').length },
    { id: 'project_loans', label: '3. AI Project Loans', icon: Landmark, countBadge: opportunities.filter(o => o.category === 'project_loans').length },
    { id: 'equity_vc', label: '4. Equity & VC', icon: Coins, countBadge: opportunities.filter(o => o.category === 'equity_vc').length },
    { id: 'compute_credits', label: '5. Compute Credits', icon: Cpu, countBadge: opportunities.filter(o => o.category === 'compute_credits').length },
    { id: 'corporate_partnerships', label: '6. Corporate Deals', icon: Handshake, countBadge: opportunities.filter(o => o.category === 'corporate_partnerships').length }
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      const matchesCategory = selectedCategory === 'all' || opp.category === selectedCategory;
      const matchesType = selectedFundingType === 'all' || opp.fundingType === selectedFundingType;
      const matchesCurrency = selectedCurrency === 'All' || opp.currency === selectedCurrency;
      const matchesCountry = selectedCountry === 'All' || opp.eligibleCountries.some(c => c.toLowerCase().includes(selectedCountry.toLowerCase()) || c === 'Global' || c === 'Pan-African');
      
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        opp.title.toLowerCase().includes(q) ||
        opp.providerName.toLowerCase().includes(q) ||
        opp.sector.toLowerCase().includes(q) ||
        opp.summary.toLowerCase().includes(q);

      return matchesCategory && matchesType && matchesCurrency && matchesCountry && matchesSearch;
    });
  }, [opportunities, selectedCategory, selectedFundingType, selectedCurrency, selectedCountry, searchQuery]);

  const getFundingTypeBadge = (type: FundingType) => {
    switch (type) {
      case 'contract':
        return { label: 'Commercial Contract', bg: 'bg-blue-950/80 text-blue-400 border-blue-800' };
      case 'grant':
        return { label: 'Non-Dilutive Grant', bg: 'bg-emerald-950/80 text-emerald-400 border-emerald-800' };
      case 'debt_loan':
        return { label: 'Concessionary Debt / Loan', bg: 'bg-amber-950/80 text-amber-400 border-amber-800' };
      case 'equity':
        return { label: 'Strategic Equity / VC', bg: 'bg-purple-950/80 text-purple-400 border-purple-800' };
      case 'non_cash_credit':
        return { label: 'Non-Cash Cloud Credits', bg: 'bg-cyan-950/80 text-cyan-400 border-cyan-800' };
      case 'revenue_share_partnership':
        return { label: 'Revenue Share / VAS', bg: 'bg-rose-950/80 text-rose-400 border-rose-800' };
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & SIX CATEGORY TABS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Six Autonomous Opportunity Engines</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                {filteredOpportunities.length} Results
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Verified tenders, public procurement notices, DFI facilities, and venture capital syndicates.
            </p>
          </div>
        </div>

        {/* 6 Engine Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 p-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
          {CATEGORY_TABS.map(tab => {
            const Icon = tab.icon;
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-2 rounded-lg font-medium transition flex items-center justify-between gap-1.5 text-left ${
                  isSelected
                    ? 'bg-[#FFD700] text-black font-bold shadow-md shadow-[#FFD700]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-black text-[#FFD700] font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {tab.countBadge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search keywords, buyers, or sectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
          />
        </div>

        {/* Funding Type Filter */}
        <div>
          <select
            value={selectedFundingType}
            onChange={(e) => setSelectedFundingType(e.target.value as any)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
          >
            <option value="all">All Funding Types (Cash / Debt / Equity / Non-Cash)</option>
            <option value="contract">Commercial Contract</option>
            <option value="grant">Non-Dilutive Grant</option>
            <option value="debt_loan">Concessionary Debt / Loan</option>
            <option value="equity">Venture Capital / Equity</option>
            <option value="non_cash_credit">Cloud Compute Credit</option>
            <option value="revenue_share_partnership">Revenue Share Partnership</option>
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
          >
            <option value="All">All Eligible Regions (Pan-African & Global)</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
            <option value="Ghana">Ghana</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Global">Global Open</option>
          </select>
        </div>

        {/* Currency Filter */}
        <div>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
          >
            <option value="All">All Currencies (USD, EUR, NGN, BaaCoin)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="NGN">NGN (₦)</option>
            <option value="BaaCoin">BaaCoin ($BAA)</option>
          </select>
        </div>
      </div>

      {/* OPPORTUNITY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOpportunities.map(opp => {
          const typeBadge = getFundingTypeBadge(opp.fundingType);

          return (
            <div
              key={opp.id}
              className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Top Badges */}
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold border ${typeBadge.bg}`}>
                    {typeBadge.label}
                  </span>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Title & Provider */}
                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-[#FFD700] transition line-clamp-2">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-300">{opp.providerName}</span>
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {opp.summary}
                </p>

                {/* Key Metadata Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80">
                    <span className="text-zinc-500 block text-[9px] uppercase">Published Amount</span>
                    <span className="font-bold text-emerald-400">
                      {opp.fundingType === 'non_cash_credit' ? 'Voucher Up To ' : ''}
                      ${opp.maxFundingUsd.toLocaleString()} {opp.currency}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80">
                    <span className="text-zinc-500 block text-[9px] uppercase">Submission Deadline</span>
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{opp.deadline}</span>
                    </span>
                  </div>
                </div>

                {/* Geographic & Applicant Restrictions */}
                <div className="text-[11px] text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">Eligible: {opp.eligibleCountries.slice(0, 3).join(', ')} {opp.eligibleCountries.length > 3 ? `+${opp.eligibleCountries.length - 3} more` : ''}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500">
                    <span className="font-semibold text-zinc-400">Method:</span>{' '}
                    <span className="capitalize">{opp.applicationMethod.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalOpportunity(opp)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
                >
                  Inspect Notice
                </button>

                <div className="flex items-center gap-1.5">
                  {onSelectForFundingStudio && (
                    <button
                      onClick={() => onSelectForFundingStudio(opp)}
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-xs font-medium transition"
                      title="Match against a project in AI Funding Studio"
                    >
                      Match
                    </button>
                  )}

                  {isAdmin && onSelectForOutreach && (
                    <button
                      onClick={() => onSelectForOutreach(opp)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFD700] hover:bg-[#FFE033] text-black text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    >
                      <span>Engage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
          <AlertCircle className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No opportunities found matching these filters</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Try resetting the sector, country, or category tabs to view all multilateral and verified commercial RFPs.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedFundingType('all'); setSelectedCountry('All'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* DETAIL INSPECTION MODAL */}
      {activeModalOpportunity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="p-5 border-b border-zinc-800 bg-zinc-900/60 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getFundingTypeBadge(activeModalOpportunity.fundingType).bg}`}>
                    {getFundingTypeBadge(activeModalOpportunity.fundingType).label}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Official Gazette</span>
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Confidence: {activeModalOpportunity.confidenceScore}%
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{activeModalOpportunity.title}</h3>
                <p className="text-xs text-[#FFD700] font-semibold">{activeModalOpportunity.providerName} • {activeModalOpportunity.providerType}</p>
              </div>

              <button
                onClick={() => setActiveModalOpportunity(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
              {/* Financial & Terms Banner */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Published Amount</span>
                  <span className="text-sm font-bold text-emerald-400">
                    ${activeModalOpportunity.minFundingUsd.toLocaleString()} - ${activeModalOpportunity.maxFundingUsd.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Published Deadline</span>
                  <span className="text-sm font-bold text-amber-400">{activeModalOpportunity.deadline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Last Verified</span>
                  <span className="text-sm font-bold text-zinc-300">{activeModalOpportunity.lastVerifiedAt}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Method</span>
                  <span className="text-sm font-bold text-cyan-400 capitalize">{activeModalOpportunity.applicationMethod.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Scope of Work */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-white text-sm">Detailed Scope of Work & Deliverables</h4>
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 leading-relaxed">
                  {activeModalOpportunity.scopeOfWork}
                </div>
              </div>

              {/* Terms (Interest, Debt, Collateral, Equity) */}
              {(activeModalOpportunity.collateralOrEquityTerms || activeModalOpportunity.interestOrFeeTerms) && (
                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/50 space-y-2">
                  <h4 className="font-bold text-purple-300 text-xs flex items-center gap-1.5">
                    <Coins className="w-4 h-4" />
                    <span>Commercial & Financial Terms</span>
                  </h4>
                  {activeModalOpportunity.collateralOrEquityTerms && (
                    <p className="text-zinc-300">
                      <span className="font-semibold text-purple-200">Equity / Collateral:</span> {activeModalOpportunity.collateralOrEquityTerms}
                    </p>
                  )}
                  {activeModalOpportunity.interestOrFeeTerms && (
                    <p className="text-zinc-300">
                      <span className="font-semibold text-purple-200">Interest / Fees:</span> {activeModalOpportunity.interestOrFeeTerms}
                    </p>
                  )}
                </div>
              )}

              {/* Required Qualifications & Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-xs">Mandatory Qualifications</h4>
                  <ul className="space-y-1 text-zinc-300">
                    {activeModalOpportunity.requiredQualifications.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-xs">Required Submission Documents</h4>
                  <ul className="space-y-1 text-zinc-300">
                    {activeModalOpportunity.requiredDocuments.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Questions Procedure & Bid Notes */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <p className="text-zinc-400">
                  <span className="font-semibold text-zinc-200">Clarification & Question Procedure:</span> {activeModalOpportunity.questionsProcedure}
                </p>
                <p className="text-zinc-400">
                  <span className="font-semibold text-zinc-200">BAA Internal Bid Assessment:</span> {activeModalOpportunity.bidAssessmentNotes}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <a
                href={activeModalOpportunity.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
              >
                <span>View Official Source Tender Notice</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                {onSelectForFundingStudio && (
                  <button
                    onClick={() => {
                      onSelectForFundingStudio(activeModalOpportunity);
                      setActiveModalOpportunity(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold"
                  >
                    Assess Project Match
                  </button>
                )}

                {isAdmin && onSelectForOutreach && (
                  <button
                    onClick={() => {
                      onSelectForOutreach(activeModalOpportunity);
                      setActiveModalOpportunity(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20"
                  >
                    <span>Initiate Institutional Outreach</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
