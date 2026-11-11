import React, { useState } from 'react';
import {
  Coins,
  Database,
  ShieldCheck,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Clock,
  Sparkles,
  Lock,
  Download,
  Copy,
  Check,
  RefreshCw,
  Layers,
  Landmark,
  Scale,
  Brain,
  Sliders,
  DollarSign,
  HelpCircle
} from 'lucide-react';
import {
  MindHiveV22State,
  KcxKnowledgeAsset,
  KcxBuyerRequest,
  KcxOffer,
  KcxLicenseAgreement,
  KcxLicenseModel
} from '../../../types/mindHiveV22';

interface KcxDashboardProps {
  state: MindHiveV22State;
  onRegisterAsset: (asset: any) => Promise<void>;
  onSubmitOffer: (offer: any) => Promise<void>;
  onAdvanceOffer: (offerId: string, nextStage: string) => Promise<void>;
  onComputeValuation: (data: any) => Promise<any>;
  onBackToMaster: () => void;
}

export const KcxDashboard: React.FC<KcxDashboardProps> = ({
  state,
  onRegisterAsset,
  onSubmitOffer,
  onAdvanceOffer,
  onComputeValuation,
  onBackToMaster
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'my-assets'
    | 'valuation'
    | 'marketplace'
    | 'buyers'
    | 'buyer-requests'
    | 'offers'
    | 'licenses'
    | 'royalties'
    | 'agents'
    | 'analytics'
    | 'settings'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedAssetForOffer, setSelectedAssetForOffer] = useState<KcxKnowledgeAsset | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Valuation Form State
  const [valTitle, setValTitle] = useState('');
  const [valCategory, setValCategory] = useState('research_whitepaper');
  const [valWordCount, setValWordCount] = useState(6500);
  const [valHasPeerReview, setValHasPeerReview] = useState(true);
  const [valHasDataset, setValHasDataset] = useState(true);
  const [valLanguage, setValLanguage] = useState('English & Yoruba');
  const [valResult, setValResult] = useState<any>(null);
  const [isValuating, setIsValuating] = useState(false);

  // Offer Submission Form State
  const [offerBuyerName, setOfferBuyerName] = useState('Dr. Julian Vane');
  const [offerBuyerOrg, setOfferBuyerOrg] = useState('Aetheria Foundation AI Lab');
  const [offerAmount, setOfferAmount] = useState(12000);
  const [offerLicense, setOfferLicense] = useState<KcxLicenseModel>('enterprise_unlimited_sla');
  const [offerTerms, setOfferTerms] = useState('Standard 12-month commercial SLA with quarterly updates.');
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false);
  const [offerSuccessMsg, setOfferSuccessMsg] = useState<string | null>(null);

  // New Asset Registration Form State
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('Dr. Damilola Adebayo');
  const [newCategory, setNewCategory] = useState('research_whitepaper');
  const [newPrice, setNewPrice] = useState(4500);
  const [newSummary, setNewSummary] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Royalty Withdrawal State
  const [payoutBankName, setPayoutBankName] = useState('Access Bank Nigeria');
  const [payoutAccountNumber, setPayoutAccountNumber] = useState('0123456789');
  const [payoutAmountNgn, setPayoutAmountNgn] = useState(15000000); // ₦15M NGN
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<string | null>(null);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleRunValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valTitle) return;
    setIsValuating(true);
    try {
      const res = await onComputeValuation({
        title: valTitle,
        category: valCategory,
        wordCount: valWordCount,
        hasPeerReview: valHasPeerReview,
        hasDataset: valHasDataset,
        language: valLanguage
      });
      if (res?.valuation) {
        setValResult(res.valuation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsValuating(false);
    }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetForOffer) return;
    setIsSubmittingOffer(true);
    try {
      await onSubmitOffer({
        assetId: selectedAssetForOffer.id,
        buyerName: offerBuyerName,
        buyerOrg: offerBuyerOrg,
        proposedAmountUsd: offerAmount,
        proposedLicense: offerLicense,
        specialTerms: offerTerms
      });
      setOfferSuccessMsg(`Offer of $${offerAmount.toLocaleString()} USD submitted successfully!`);
      setTimeout(() => {
        setOfferSuccessMsg(null);
        setSelectedAssetForOffer(null);
        setActiveTab('offers');
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingOffer(false);
    }
  };

  const handleRegisterNewAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSummary) return;
    setIsRegistering(true);
    try {
      await onRegisterAsset({
        title: newTitle,
        author: newAuthor,
        category: newCategory,
        listingPriceUsd: newPrice,
        summary: newSummary
      });
      setShowRegisterModal(false);
      setNewTitle('');
      setNewSummary('');
      setActiveTab('my-assets');
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSimulatePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawalSuccess(`Dispatched ₦${payoutAmountNgn.toLocaleString()} NGN via Paystack Direct Transfer to ${payoutBankName} (Acc: ${payoutAccountNumber}). Webhook returned 200 OK.`);
      setTimeout(() => setWithdrawalSuccess(null), 8000);
    }, 1500);
  };

  const filteredAssets = state.kcx.assets.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || a.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* KCX Division Navigation Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950 border-2 border-amber-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-xl">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                SYSTEM 1
              </span>
              <span className="text-xs font-mono text-zinc-500">•</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                ${(state.summaryMetrics.totalSettledRevenueUsd).toLocaleString()} Settled (70% Creator Royalties)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
              Knowledge Capital Exchange (KCX)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
          >
            <span>+ Mint &amp; List Knowledge Asset</span>
          </button>
          <button
            onClick={onBackToMaster}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700 transition cursor-pointer"
          >
            &larr; Master Hub
          </button>
        </div>
      </div>

      {/* 2.6 Working Navigation Menu (12 Tabs) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'my-assets', label: `My Assets (${state.kcx.assets.length})`, icon: Database },
          { id: 'valuation', label: 'Asset Valuation Engine', icon: Sliders },
          { id: 'marketplace', label: 'Licensing Marketplace', icon: Coins },
          { id: 'buyers', label: 'Global Buyers', icon: Building2 },
          { id: 'buyer-requests', label: `Buyer RFQs (${state.kcx.buyerRequests.length})`, icon: Clock },
          { id: 'offers', label: `Offers (${state.kcx.offers.length})`, icon: Sparkles },
          { id: 'licenses', label: `License Agreements (${state.kcx.agreements.length})`, icon: ShieldCheck },
          { id: 'royalties', label: 'Royalties & Earnings', icon: Landmark },
          { id: 'agents', label: `AI Agents (10)`, icon: Brain },
          { id: 'analytics', label: 'Analytics & Reports', icon: Layers },
          { id: 'settings', label: 'Settings', icon: Lock }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Registered Assets</span>
              <div className="text-2xl font-bold text-white font-mono">{state.kcx.assets.length}</div>
              <span className="text-[10px] font-mono text-emerald-400">100% Rights Verified</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Active License SLAs</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">{state.kcx.agreements.length}</div>
              <span className="text-[10px] font-mono text-zinc-400">Enterprise &amp; Academic</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Settled Revenue</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                ${(state.summaryMetrics.totalSettledRevenueUsd).toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-emerald-400">₦{(state.summaryMetrics.totalSettledRevenueNgn).toLocaleString()} NGN</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Buyer Requests</span>
              <div className="text-2xl font-bold text-cyan-300 font-mono">{state.kcx.buyerRequests.length}</div>
              <span className="text-[10px] font-mono text-cyan-400">AI Labs &amp; Publishers</span>
            </div>
          </div>

          {/* Recent Licensing Events & Offers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Recent Settled License Agreements</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">RELEASED ESCROW</span>
              </div>
              <div className="space-y-3">
                {state.kcx.agreements.map((agr) => (
                  <div key={agr.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-white">{agr.assetTitle}</div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          Licensee: <span className="text-zinc-200">{agr.licenseeName}</span> ({agr.licenseeOrg})
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ${agr.settledAmountUsd.toLocaleString()} USD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-800">
                      <span>Code: {agr.agreementCode}</span>
                      <span className="text-amber-400">70% (${(agr.settledAmountUsd * 0.7).toLocaleString()}) to Creator</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Pending Offers &amp; Negotiations</span>
                </h3>
                <span className="text-[10px] font-mono text-amber-400 font-bold">{state.kcx.offers.length} Active</span>
              </div>
              <div className="space-y-3">
                {state.kcx.offers.map((offer) => (
                  <div key={offer.id} className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-white">{offer.assetTitle}</div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          Offered by: <span className="text-zinc-200">{offer.buyerName}</span> ({offer.buyerOrg})
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        ${offer.proposedAmountUsd.toLocaleString()} USD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-zinc-800">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase">
                        Stage: {offer.stage.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => setActiveTab('offers')}
                        className="text-amber-400 hover:text-white underline cursor-pointer"
                      >
                        Review Term Sheet &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY KNOWLEDGE ASSETS */}
      {activeTab === 'my-assets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div>
              <h2 className="text-base font-heading font-black text-white">Registered Knowledge Assets</h2>
              <p className="text-xs text-zinc-400">Assets owned by you or authorized under your creator account</p>
            </div>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              + Mint New Knowledge Asset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {state.kcx.assets.map((asset) => (
              <div key={asset.id} className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-4 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{asset.verificationStatus.replace('_', ' ').toUpperCase()}</span>
                    </span>
                    <span className="text-zinc-500 uppercase">{asset.category.replace('_', ' ')}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-heading">{asset.title}</h3>
                    <p className="text-[11px] font-mono text-zinc-400 mt-0.5">Author: {asset.author}</p>
                  </div>

                  <p className="text-xs text-zinc-300 line-clamp-3 font-sans leading-relaxed">
                    {asset.summary}
                  </p>

                  <div className="p-2.5 rounded-xl bg-black border border-zinc-800 font-mono text-[10px] flex items-center justify-between gap-2">
                    <span className="text-zinc-500 truncate">SHA-256: {asset.contentHashSha256}</span>
                    <button onClick={() => copyHash(asset.contentHashSha256)} className="text-zinc-400 hover:text-white shrink-0 cursor-pointer">
                      {copiedHash === asset.contentHashSha256 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Listing Price</span>
                    <span className="text-sm font-bold text-amber-300">${asset.listingPriceUsd.toLocaleString()} USD</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedAssetForOffer(asset);
                      setActiveTab('marketplace');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs transition cursor-pointer"
                  >
                    View in Marketplace &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ASSET VALUATION ENGINE */}
      {activeTab === 'valuation' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-heading font-black text-white">AI Knowledge Asset Valuation Engine</h2>
              </div>
              <p className="text-xs text-zinc-400 max-w-3xl mt-1">
                Multi-factor evaluation model assessing originality, completeness, research depth, dataset structure, and empirical market demand signals. Produces estimated valuation ranges, quality scores, and potential buyer matching.
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-200 mt-2 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Strict Charter:</strong> Algorithmic valuations are market-informed estimates and are never presented as a guaranteed selling price or confirmed market liquidity.
                </span>
              </div>
            </div>

            <form onSubmit={handleRunValuation} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
              <div className="space-y-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Asset Title</label>
                  <input
                    type="text"
                    value={valTitle}
                    onChange={(e) => setValTitle(e.target.value)}
                    placeholder="e.g. Distributed Inverter Firmware Reverse Engineering"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Category</label>
                    <select
                      value={valCategory}
                      onChange={(e) => setValCategory(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    >
                      <option value="research_whitepaper">Research Whitepaper</option>
                      <option value="ai_training_dataset">AI Training Dataset</option>
                      <option value="language_speech_corpus">Speech Corpus</option>
                      <option value="technical_specification">Technical Spec</option>
                      <option value="educational_curriculum">Curriculum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Estimated Word Count</label>
                    <input
                      type="number"
                      value={valWordCount}
                      onChange={(e) => setValWordCount(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Language &amp; Region</label>
                  <input
                    type="text"
                    value={valLanguage}
                    onChange={(e) => setValLanguage(e.target.value)}
                    placeholder="e.g. English, Yoruba & Hausa"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valHasPeerReview}
                      onChange={(e) => setValHasPeerReview(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Peer-Reviewed or Field-Tested</span>
                  </label>

                  <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={valHasDataset}
                      onChange={(e) => setValHasDataset(e.target.checked)}
                      className="accent-amber-400"
                    />
                    <span>Includes Structured Dataset (JSONL/CSV)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isValuating}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black font-bold uppercase transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {isValuating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Computing Algorithmic Valuation...</span>
                    </>
                  ) : (
                    <span>Compute Valuation Range &rarr;</span>
                  )}
                </button>
              </div>

              {/* Valuation Output Display */}
              <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Engine Evaluation Report</span>
                {valResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">Estimated Valuation Range</span>
                        <div className="text-xl font-bold text-amber-300">
                          ${valResult.estimatedMinUsd.toLocaleString()} – ${valResult.estimatedMaxUsd.toLocaleString()} USD
                        </div>
                        <span className="text-[10px] text-emerald-400">
                          ₦{(valResult.estimatedMinUsd * 1500).toLocaleString()} – ₦{(valResult.estimatedMaxUsd * 1500).toLocaleString()} NGN
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 block">Quality &amp; Demand</span>
                        <div className="text-sm font-bold text-white">
                          QS: {valResult.qualityScore}/100 • DS: {valResult.demandScore}/100
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block font-bold">Factor Breakdown:</span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Originality:</span>
                          <span className="text-white">{valResult.factors.originality}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Completeness:</span>
                          <span className="text-white">{valResult.factors.completeness}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Research Value:</span>
                          <span className="text-white">{valResult.factors.researchValue}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Market Demand:</span>
                          <span className="text-white">{valResult.factors.marketDemand}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block font-bold">Recommended Licensing:</span>
                      <div className="flex flex-wrap gap-1">
                        {valResult.recommendedLicensing.map((lic: string) => (
                          <span key={lic} className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300">
                            {lic.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-center text-zinc-500 space-y-2">
                    <Sliders className="w-8 h-8 opacity-40" />
                    <span>Enter knowledge asset parameters to run multi-factor valuation</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: LICENSING MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search licensable assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-white outline-none focus:border-amber-400 w-64"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="all">All 10 Categories</option>
                <option value="research_whitepaper">Research Whitepapers</option>
                <option value="technical_specification">Technical Specs</option>
                <option value="language_speech_corpus">Speech Corpora</option>
                <option value="ai_training_dataset">AI Datasets</option>
                <option value="educational_curriculum">Curricula</option>
              </select>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              Showing {filteredAssets.length} Verified Licensable Products
            </span>
          </div>

          {/* Asset Marketplace Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                      {asset.category.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">${asset.listingPriceUsd.toLocaleString()} USD</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-heading">{asset.title}</h3>
                    <p className="text-[11px] font-mono text-zinc-400">By {asset.author} ({asset.organization})</p>
                  </div>

                  <p className="text-xs text-zinc-300 line-clamp-3 font-sans leading-relaxed">
                    {asset.summary}
                  </p>

                  <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Valuation Score:</span>
                      <span className="text-emerald-400 font-bold">{asset.valuation.qualityScore}/100</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Est. Market Range:</span>
                      <span className="text-amber-300 font-bold">${asset.valuation.estimatedMinUsd.toLocaleString()} – ${asset.valuation.estimatedMaxUsd.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono text-zinc-500">{asset.fileFormat}</span>
                  <button
                    onClick={() => setSelectedAssetForOffer(asset)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
                  >
                    <span>Request Quotation / Submit Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Section for Submitting Offer */}
          {selectedAssetForOffer && (
            <div className="p-6 rounded-3xl bg-zinc-950 border-2 border-amber-500/50 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-sm font-heading font-black text-white">
                    Submit Commercial Offer for: <span className="text-amber-300">{selectedAssetForOffer.title}</span>
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-400">
                    Listing Price: ${selectedAssetForOffer.listingPriceUsd.toLocaleString()} USD • 70% Creator / 30% Platform Split
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAssetForOffer(null)}
                  className="text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {offerSuccessMsg ? (
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{offerSuccessMsg}</span>
                </div>
              ) : (
                <form onSubmit={handleCreateOffer} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">Buyer / Representative Name</label>
                    <input
                      type="text"
                      value={offerBuyerName}
                      onChange={(e) => setOfferBuyerName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Purchasing Organization</label>
                    <input
                      type="text"
                      value={offerBuyerOrg}
                      onChange={(e) => setOfferBuyerOrg(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Proposed Purchase Amount ($ USD)</label>
                    <input
                      type="number"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                      required
                    />
                    <span className="text-[10px] text-emerald-400 block mt-1">
                      ₦{(offerAmount * 1500).toLocaleString()} NGN (Paystack Settlement Ready)
                    </span>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Requested License Model</label>
                    <select
                      value={offerLicense}
                      onChange={(e) => setOfferLicense(e.target.value as KcxLicenseModel)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    >
                      <option value="enterprise_unlimited_sla">Enterprise Unlimited SLA ($6,000/yr)</option>
                      <option value="non_exclusive_commercial">Non-Exclusive Commercial</option>
                      <option value="academic_research_only">Academic Research Only</option>
                      <option value="exclusive_commercial">Exclusive Commercial Rights</option>
                      <option value="api_programmatic_access">API Programmatic Access</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-400 mb-1">Special Terms &amp; Scope of Use</label>
                    <textarea
                      value={offerTerms}
                      onChange={(e) => setOfferTerms(e.target.value)}
                      rows={2}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAssetForOffer(null)}
                      className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingOffer}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-black font-bold uppercase transition flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmittingOffer ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                          <span>Dispatching Offer to Creator...</span>
                        </>
                      ) : (
                        <span>Submit Term Sheet Offer &rarr;</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: GLOBAL BUYERS & BUYER REQUESTS (RFQs) */}
      {(activeTab === 'buyers' || activeTab === 'buyer-requests') && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Global Buyer Exchange &amp; Verified RFQs</span>
                </h2>
                <p className="text-xs text-zinc-400">Institutional buyers actively seeking licensed knowledge capital</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {state.kcx.buyerRequests.length} Active Demands
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {state.kcx.buyerRequests.map((rfq) => (
                <div key={rfq.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 uppercase">
                        {rfq.buyerType.replace(/_/g, ' ')}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                        rfq.urgency === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {rfq.urgency} Urgency
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{rfq.title}</h3>
                    <div className="text-[11px] font-mono text-cyan-400">{rfq.buyerName} • {rfq.buyerOrg}</div>

                    <p className="text-xs text-zinc-300 line-clamp-3 font-sans">
                      {rfq.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Allocated Budget:</span>
                      <span className="text-emerald-400 font-bold">${rfq.budgetUsd.toLocaleString()} USD</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAssetForOffer(state.kcx.assets[0]);
                        setActiveTab('marketplace');
                      }}
                      className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Match Asset to this RFQ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: OFFERS & NEGOTIATIONS */}
      {activeTab === 'offers' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Commercial Offers &amp; Deal Stage Progression</span>
                </h2>
                <p className="text-xs text-zinc-400">Advance negotiations from initial inquiry to term sheet, contract and escrow release</p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {state.kcx.offers.length} Pending Negotiations
              </span>
            </div>

            <div className="space-y-4">
              {state.kcx.offers.map((offer) => (
                <div key={offer.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400 uppercase">{offer.id}</span>
                        <span className="text-xs font-mono text-zinc-500">•</span>
                        <span className="text-xs font-bold text-white">{offer.assetTitle}</span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        Buyer: <span className="text-white">{offer.buyerName}</span> ({offer.buyerOrg})
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-base font-bold text-emerald-400">${offer.proposedAmountUsd.toLocaleString()} USD</div>
                      <div className="text-[10px] text-zinc-400">Creator: ${(offer.creatorEarningsUsd).toLocaleString()} (70%)</div>
                    </div>
                  </div>

                  {/* Stage Progress Tracker */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-mono">
                    {['inquiry', 'term_sheet', 'contract_review', 'escrow_pending', 'settled'].map((st, idx) => {
                      const stages = ['inquiry', 'term_sheet', 'contract_review', 'escrow_pending', 'settled'];
                      const currentIdx = stages.indexOf(offer.stage);
                      const isPast = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div
                          key={st}
                          className={`p-2 rounded-xl border transition ${
                            isCurrent
                              ? 'bg-amber-400 text-black font-bold border-amber-300'
                              : isPast
                              ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                              : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                          }`}
                        >
                          <div>Step {idx + 1}</div>
                          <div className="uppercase">{st.replace(/_/g, ' ')}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-zinc-800 text-xs font-mono">
                    <span className="text-zinc-400 text-[11px]">Terms: {offer.specialTerms}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {offer.stage !== 'settled' && (
                        <button
                          onClick={() => {
                            const stages = ['inquiry', 'term_sheet', 'contract_review', 'escrow_pending', 'settled'];
                            const next = stages[stages.indexOf(offer.stage) + 1] || 'settled';
                            onAdvanceOffer(offer.id, next);
                          }}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>Advance to Next Stage &rarr;</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: ROYALTIES & SETTLEMENT */}
      {activeTab === 'royalties' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Settled Creator Earnings (70%)</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">
                ${(state.summaryMetrics.totalSettledRevenueUsd * 0.7).toLocaleString()} USD
              </div>
              <span className="text-xs font-mono text-emerald-400 block font-bold">
                ₦{(state.summaryMetrics.totalSettledRevenueNgn * 0.7).toLocaleString()} NGN
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Platform Infrastructure (30%)</span>
              <div className="text-2xl font-bold text-zinc-300 font-mono">
                ${(state.summaryMetrics.totalSettledRevenueUsd * 0.3).toLocaleString()} USD
              </div>
              <span className="text-xs font-mono text-zinc-500 block">
                ₦{(state.summaryMetrics.totalSettledRevenueNgn * 0.3).toLocaleString()} NGN (Server &amp; Escrow)
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Exchange Rate Peg</span>
              <div className="text-2xl font-bold text-white font-mono">$1.00 = ₦1,500 NGN</div>
              <span className="text-xs font-mono text-cyan-400 block font-bold">Paystack Automated Transfer</span>
            </div>
          </div>

          {/* Paystack Creator Bank Payout Console */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-heading font-black text-white">
                  Paystack Creator Bank Withdrawal Console
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                TEST MODE • TEST CARD 4084084084084081
              </span>
            </div>

            {withdrawalSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{withdrawalSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSimulatePayout} className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Destination Bank (Nigeria)</label>
                <select
                  value={payoutBankName}
                  onChange={(e) => setPayoutBankName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                >
                  <option value="Access Bank Nigeria">Access Bank Nigeria</option>
                  <option value="First Bank of Nigeria">First Bank of Nigeria</option>
                  <option value="Guaranty Trust Bank (GTB)">Guaranty Trust Bank (GTB)</option>
                  <option value="Zenith Bank Plc">Zenith Bank Plc</option>
                  <option value="Moniepoint Microfinance">Moniepoint Microfinance</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">10-Digit NUBAN Account Number</label>
                <input
                  type="text"
                  maxLength={10}
                  value={payoutAccountNumber}
                  onChange={(e) => setPayoutAccountNumber(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Disbursement Amount (₦ NGN)</label>
                <input
                  type="number"
                  step={500000}
                  value={payoutAmountNgn}
                  onChange={(e) => setPayoutAmountNgn(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400 font-bold text-amber-300"
                />
              </div>

              <div className="sm:col-span-3 flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isWithdrawing}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:brightness-110 text-white font-bold uppercase transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  {isWithdrawing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                      <span>Transacting via Paystack Switch...</span>
                    </>
                  ) : (
                    <span>Initiate Paystack Instant Bank Transfer &rarr;</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 8: AI AGENTS (10 KCX SPECIALISTS) */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span>Knowledge Capital Autonomous AI Agents (10 Specialists)</span>
                </h2>
                <p className="text-xs text-zinc-400">Autonomous systems scouting demand, calculating valuations, and reconciling royalty ledgers</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">10/10 Online</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.kcx.agents.map((agent) => (
                <div key={agent.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{agent.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      agent.status === 'executing' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-zinc-400">{agent.role}</p>
                  <p className="text-xs text-zinc-300 font-sans">{agent.currentTask}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-zinc-800 text-zinc-500">
                    <span>Actions Today: {agent.verifiedActionsToday}</span>
                    <span>Budget Spent: ${agent.budgetSpentUsd} / ${agent.budgetAllocatedUsd}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MINT & LIST ASSET */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Mint &amp; List Asset in Knowledge Capital Exchange</span>
              </h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-zinc-400 hover:text-white text-xs cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterNewAsset} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 mb-1">Asset Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Tropical Agriculture Computer Vision Dataset"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Listing Price ($ USD)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400"
                >
                  <option value="research_whitepaper">Research Whitepaper</option>
                  <option value="technical_specification">Technical Spec</option>
                  <option value="language_speech_corpus">Speech Corpus</option>
                  <option value="ai_training_dataset">AI Dataset</option>
                  <option value="educational_curriculum">Curriculum</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1">Summary / Abstract</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  rows={3}
                  placeholder="Provide an overview of the intellectual contribution..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400 font-sans"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRegistering}
                  className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase transition flex items-center gap-2 cursor-pointer"
                >
                  {isRegistering ? <span>Minting SHA-256...</span> : <span>Mint &amp; Publish &rarr;</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
