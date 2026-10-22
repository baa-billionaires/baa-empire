import React, { useState, useMemo } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { GeneralProductItem, ExternalMarketplaceBridge } from '../types';
import { INITIAL_GENERAL_PRODUCTS, INITIAL_MARKETPLACE_BRIDGES } from '../lib/autonomousData';
import {
  Car,
  Cpu,
  Building,
  Factory,
  Wheat,
  GraduationCap,
  Sparkles,
  Coins,
  ShieldCheck,
  Search,
  Check,
  Copy,
  ExternalLink,
  Calculator,
  ArrowRight,
  MapPin,
  Tag,
  DollarSign,
  TrendingUp,
  Globe2,
  Share2,
  CheckCircle,
  HelpCircle,
  X,
  Layers,
  ChevronRight,
  Filter,
  Eye,
  Lock,
  ArrowUpRight
} from 'lucide-react';

interface GeneralMarketplacePageProps {
  onNavigateToAcademy?: () => void;
  onNavigateToWallet?: () => void;
}

export const GeneralMarketplacePage: React.FC<GeneralMarketplacePageProps> = ({
  onNavigateToAcademy,
  onNavigateToWallet
}) => {
  const { profile, wallet, referrals } = useEcosystem();

  // Products & Bridges State
  const [products] = useState<GeneralProductItem[]>(INITIAL_GENERAL_PRODUCTS);
  const [bridges] = useState<ExternalMarketplaceBridge[]>(INITIAL_MARKETPLACE_BRIDGES);

  // Filter & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'savings'>('featured');

  // BaaCoin Payment Discount Toggle (15% Default Instant Discount)
  const [isBaaCoinDiscountActive, setIsBaaCoinDiscountActive] = useState<boolean>(true);

  // Active Modals & Inspected Items
  const [selectedProduct, setSelectedProduct] = useState<GeneralProductItem | null>(null);
  const [escrowModalItem, setEscrowModalItem] = useState<{
    item: GeneralProductItem;
    quantity: number;
  } | null>(null);

  // Interactive Service Fee Calculator State
  const [calcAmountUsd, setCalcAmountUsd] = useState<number>(1000);
  const [calcPaymentMethod, setCalcPaymentMethod] = useState<'baacoin' | 'fiat'>('baacoin');
  const [showFeeCalculatorModal, setShowFeeCalculatorModal] = useState<boolean>(false);

  // External Referral Bridge State
  const [selectedBridgeName, setSelectedBridgeName] = useState<string>('All');
  const [externalUrlInput, setExternalUrlInput] = useState<string>('');
  const [generatedReferralLink, setGeneratedReferralLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const categories = [
    { id: 'All', label: 'All Listings', icon: Layers, count: products.length },
    { id: 'Cars', label: 'Cars & Vehicles', icon: Car, count: products.filter(p => p.category === 'Vehicles & Cars' || p.category === 'Cars').length },
    { id: 'Tech', label: 'Tech & Electronics', icon: Cpu, count: products.filter(p => p.category === 'Electronics & Tech' || p.category === 'Tech').length },
    { id: 'Real Estate', label: 'Real Estate & Land', icon: Building, count: products.filter(p => p.category === 'Real Estate & Land' || p.category === 'Real Estate').length },
    { id: 'Manufacturing', label: 'Manufacturing & Industrial', icon: Factory, count: products.filter(p => p.category === 'Manufacturing & Industrial' || p.category === 'Manufacturing').length },
    { id: 'Agriculture', label: 'Agriculture & AgroTech', icon: Wheat, count: products.filter(p => p.category === 'Agriculture & AgroTech' || p.category === 'Agriculture').length },
    { id: 'Education', label: 'Education & Hardware', icon: GraduationCap, count: products.filter(p => p.category === 'Education & Hardware' || p.category === 'Education').length },
    { id: 'Lifestyle', label: 'Lifestyle & Luxury', icon: Sparkles, count: products.filter(p => p.category === 'Luxury & Lifestyle' || p.category === 'Lifestyle').length }
  ];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const cat = p.category;
      let matchesCat = true;
      if (selectedCategory === 'Cars') matchesCat = cat === 'Vehicles & Cars' || cat === 'Cars';
      else if (selectedCategory === 'Tech') matchesCat = cat === 'Electronics & Tech' || cat === 'Tech';
      else if (selectedCategory === 'Real Estate') matchesCat = cat === 'Real Estate & Land' || cat === 'Real Estate';
      else if (selectedCategory === 'Manufacturing') matchesCat = cat === 'Manufacturing & Industrial' || cat === 'Manufacturing';
      else if (selectedCategory === 'Agriculture') matchesCat = cat === 'Agriculture & AgroTech' || cat === 'Agriculture';
      else if (selectedCategory === 'Education') matchesCat = cat === 'Education & Hardware' || cat === 'Education';
      else if (selectedCategory === 'Lifestyle') matchesCat = cat === 'Luxury & Lifestyle' || cat === 'Lifestyle';

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.seller_name.toLowerCase().includes(q) ||
        p.specs.some(s => s.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price_usd - b.price_usd;
      if (sortBy === 'price-high') return b.price_usd - a.price_usd;
      if (sortBy === 'savings') {
        const savingsA = a.price_usd - a.price_baacoin;
        const savingsB = b.price_usd - b.price_baacoin;
        return savingsB - savingsA;
      }
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Fee calculation helper
  const calculateFeeBreakdown = (amountUsd: number, isBaa: boolean) => {
    if (isBaa) {
      const discountPercent = 15;
      const discountUsd = amountUsd * 0.15;
      const discountedBase = amountUsd - discountUsd;
      const serviceFeePercent = 2.0; // 2.0% BaaCoin fee vs 7.5% fiat/bank charges
      const serviceFeeUsd = discountedBase * 0.02;
      const referralRebateUsd = discountedBase * 0.05; // 5% cashback reward
      const totalPayableUsd = discountedBase + serviceFeeUsd;
      const totalPayableBaa = Math.round(totalPayableUsd); // 1:1 USD peg
      const netCustomerSavingsUsd = discountUsd + (amountUsd * 0.075 - serviceFeeUsd);

      return {
        isBaa: true,
        originalUsd: amountUsd,
        discountPercent,
        discountUsd,
        discountedBase,
        serviceFeePercent,
        serviceFeeUsd,
        referralRebateUsd,
        totalPayableUsd,
        totalPayableBaa,
        netCustomerSavingsUsd,
        nairaEquivalent: totalPayableUsd * 1550
      };
    } else {
      const serviceFeePercent = 7.5; // Traditional credit card & cross-border FX fee
      const serviceFeeUsd = amountUsd * 0.075;
      const totalPayableUsd = amountUsd + serviceFeeUsd;

      return {
        isBaa: false,
        originalUsd: amountUsd,
        discountPercent: 0,
        discountUsd: 0,
        discountedBase: amountUsd,
        serviceFeePercent,
        serviceFeeUsd,
        referralRebateUsd: 0,
        totalPayableUsd,
        totalPayableBaa: Math.round(totalPayableUsd),
        netCustomerSavingsUsd: 0,
        nairaEquivalent: totalPayableUsd * 1550
      };
    }
  };

  const activeCalcBreakdown = useMemo(() => {
    return calculateFeeBreakdown(calcAmountUsd, calcPaymentMethod === 'baacoin');
  }, [calcAmountUsd, calcPaymentMethod]);

  // Handle Affiliate URL Generation
  const handleGenerateAffiliateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalUrlInput.trim()) return;

    const ref = profile.referral_code || 'BAA-SOVEREIGN-2026';
    const cleanUrl = externalUrlInput.trim();
    const encoded = encodeURIComponent(cleanUrl);
    const bridgeLink = `https://microwork-ai-2-app-production.up.railway.app/bridge?target=${encodeURIComponent(selectedBridgeName)}&url=${encoded}&ref=${ref}&utm_source=baacoin_marketplace`;

    setGeneratedReferralLink(bridgeLink);
    showToast(`Affiliate link generated! You earn 4%–10% referral commission + BaaCoin service fees.`);
  };

  const handleCopyAffiliateLink = () => {
    if (!generatedReferralLink) return;
    navigator.clipboard.writeText(generatedReferralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
    showToast('Affiliate tracking link copied to clipboard!');
  };

  // Handle Escrow Reservation
  const handleConfirmEscrow = (item: GeneralProductItem) => {
    const cost = isBaaCoinDiscountActive ? item.price_baacoin : item.price_usd;
    setEscrowModalItem(null);
    showToast(
      `Smart Contract Escrow Lock Activated for "${item.title}". ${cost.toLocaleString()} BAA held in multi-sig vault. Seller notified for inspection & dispatch!`
    );
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ========================================================
            1. HERO & TELEMETRY HEADER
        ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#FFD700]/10 via-[#00D4FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold uppercase tracking-wider">
                <Coins className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Dual Sovereign Commerce &amp; Global Referral Clearinghouse</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white leading-tight">
                General Multi-Sector Marketplace
              </h1>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Buy luxury cars, industrial manufacturing machinery, agricultural drones, prime real estate, and enterprise tech directly using <span className="text-[#FFD700] font-bold">BaaCoin</span> to save 15%–25% in fees. Bridge seamlessly into <span className="text-[#00D4FF] font-bold">Amazon, Alibaba, Konga &amp; Jiji</span> with automated affiliate commissions and instant smart contract escrow.
              </p>

              {/* Quick Telemetry Chips */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                  <span className="text-zinc-500">BaaCoin Peg:</span>
                  <span className="text-[#FFD700] font-bold">$1.00 USD (Backed by Naira / Paystack)</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                  <span className="text-zinc-500">Your Spendable BAA:</span>
                  <span className="text-emerald-400 font-bold">{profile.baacoin_balance.toLocaleString()} BAA</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                  <span className="text-zinc-500">Platform Escrow Fee:</span>
                  <span className="text-[#00D4FF] font-bold">2.0% (vs 7.5% Card Gateways)</span>
                </div>
              </div>
            </div>

            {/* BaaCoin Payment Discount Toggle Card */}
            <div className="p-6 rounded-2xl bg-black/80 border border-[#FFD700]/40 lg:w-80 shrink-0 space-y-4 shadow-xl font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                <span className="text-xs uppercase font-bold text-zinc-400">PAYMENT ENGINE</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-zinc-300 block font-bold">
                  BaaCoin 15% Instant Discount
                </label>
                <div
                  onClick={() => setIsBaaCoinDiscountActive(!isBaaCoinDiscountActive)}
                  className={`w-full p-2.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    isBaaCoinDiscountActive
                      ? 'bg-[#FFD700]/15 border-[#FFD700] text-[#FFD700]'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#FFD700]" />
                    <span className="text-xs font-bold font-sans">
                      {isBaaCoinDiscountActive ? '15% Discount Applied' : 'Standard Fiat (Full Price)'}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-6 rounded-full transition p-1 flex items-center ${
                      isBaaCoinDiscountActive ? 'bg-[#FFD700] justify-end' : 'bg-zinc-800 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-black shadow-md" />
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1">
                <div className="flex justify-between">
                  <span>Settlement:</span>
                  <span className="text-white font-bold">1-Click Base L2</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span className="text-emerald-400 font-bold">2.0% Flat</span>
                </div>
              </div>

              <button
                onClick={() => setShowFeeCalculatorModal(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Open Fee Calculator</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. INTERACTIVE SERVICE FEE CALCULATOR WIDGET (EXPANDED)
        ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-black text-white">
                  BaaCoin Service Fee &amp; Arbitrage Calculator
                </h3>
                <p className="text-xs text-zinc-400">
                  Simulate any custom purchase amount to compare BaaCoin 15% discount + 2% service fee against legacy credit card gateways (7.5%).
                </p>
              </div>
            </div>

            <div className="flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-mono self-start sm:self-auto">
              <button
                onClick={() => setCalcPaymentMethod('baacoin')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                  calcPaymentMethod === 'baacoin'
                    ? 'bg-[#FFD700] text-black shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                <span>BaaCoin (-15%)</span>
              </button>
              <button
                onClick={() => setCalcPaymentMethod('fiat')}
                className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1 ${
                  calcPaymentMethod === 'fiat'
                    ? 'bg-zinc-700 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Fiat / Card (No Discount)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono">
            {/* Left: Input controls */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <div className="flex justify-between text-xs text-zinc-400 mb-2">
                  <span>Enter Purchase Amount (USD):</span>
                  <span className="text-[#FFD700] font-bold">${calcAmountUsd.toLocaleString()} USD</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">$</span>
                  <input
                    type="number"
                    min={10}
                    max={500000}
                    step={50}
                    value={calcAmountUsd}
                    onChange={(e) => setCalcAmountUsd(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
                <input
                  type="range"
                  min={100}
                  max={100000}
                  step={100}
                  value={calcAmountUsd}
                  onChange={(e) => setCalcAmountUsd(Number(e.target.value))}
                  className="w-full mt-3 accent-[#FFD700] cursor-pointer"
                />
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-zinc-500 py-1">Quick Presets:</span>
                {[500, 1500, 5000, 15000, 50000, 88000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCalcAmountUsd(preset)}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-[#FFD700] text-zinc-300 hover:text-[#FFD700] transition"
                  >
                    ${preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Live calculation breakdown result */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Base Catalog Value:</span>
                <span className="text-white font-bold">${activeCalcBreakdown.originalUsd.toLocaleString()} USD</span>
              </div>

              {activeCalcBreakdown.isBaa ? (
                <>
                  <div className="flex justify-between text-emerald-400">
                    <span>BaaCoin 15% Instant Member Discount:</span>
                    <span className="font-bold">-${activeCalcBreakdown.discountUsd.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-[#00D4FF]">
                    <span>BaaCoin Protocol Service Fee (2.0%):</span>
                    <span className="font-bold">+${activeCalcBreakdown.serviceFeeUsd.toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between text-purple-400">
                    <span>5% Referral Cashback Reward to Earnings Pulse:</span>
                    <span className="font-bold">+${activeCalcBreakdown.referralRebateUsd.toFixed(2)} USD</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-rose-400">
                  <span>Traditional Card / Bank FX Processing Fee (7.5%):</span>
                  <span className="font-bold">+${activeCalcBreakdown.serviceFeeUsd.toFixed(2)} USD</span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                <div>
                  <span className="text-zinc-400 block text-[10px] uppercase font-bold">TOTAL NET PAYABLE:</span>
                  <span className="text-[#FFD700] text-xl font-heading font-black">
                    {activeCalcBreakdown.isBaa
                      ? `${activeCalcBreakdown.totalPayableBaa.toLocaleString()} BAA`
                      : `$${activeCalcBreakdown.totalPayableUsd.toLocaleString()} USD`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block text-[10px]">Naira Equivalent:</span>
                  <span className="text-white font-bold">
                    ₦{activeCalcBreakdown.nairaEquivalent.toLocaleString()}
                  </span>
                </div>
              </div>

              {activeCalcBreakdown.isBaa && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-400 font-bold">
                  <span>Total Net Savings with BaaCoin:</span>
                  <span>${activeCalcBreakdown.netCustomerSavingsUsd.toLocaleString()} USD</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            3. CATEGORIES & PRODUCT LISTING SECTION
        ======================================================== */}
        <div className="space-y-6">
          {/* Controls Bar: Categories Tabs & Search */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl">
              {categories.map((c) => {
                const Icon = c.icon;
                const isActive = selectedCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
                      isActive
                        ? 'bg-[#FFD700] text-black shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{c.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-black/30 text-black' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search listings, specs, location..."
                  className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-300 focus:outline-none focus:border-[#FFD700]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="savings">Highest Savings</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs">
              <div className="text-zinc-400 font-bold">No products found matching your filter.</div>
              <p className="text-zinc-600">Try adjusting your category selection or clear your search query.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-[#FFD700] text-black font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const displayPriceUsd = p.price_usd;
                const displayPriceBaa = isBaaCoinDiscountActive ? p.price_baacoin : p.price_usd;
                const savingsUsd = displayPriceUsd - p.price_baacoin;

                return (
                  <div
                    key={p.id}
                    className="rounded-3xl bg-zinc-950 border border-zinc-800/90 hover:border-[#FFD700]/50 transition flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-black"
                  >
                    {/* Top Image Banner */}
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                            {p.condition}
                          </span>
                          {isBaaCoinDiscountActive && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#FFD700] to-amber-500 text-black text-[10px] font-mono font-black shadow-md">
                              -15% BAA DISCOUNT
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 flex items-center gap-1 border border-zinc-800">
                            <MapPin className="w-3 h-3 text-[#FFD700]" />
                            <span className="truncate max-w-[120px]">{p.location}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-[#00D4FF] font-bold uppercase tracking-wider text-[10px]">
                            {p.category}
                          </span>
                          <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                            <span>{p.seller_name}</span>
                            {p.seller_verified && (
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </div>
                        </div>

                        <h3 className="font-heading font-black text-white text-lg leading-snug line-clamp-1 group-hover:text-[#FFD700] transition">
                          {p.title}
                        </h3>

                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>

                        {/* Specs Pill List */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.specs.slice(0, 3).map((spec, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        {/* Pricing Details */}
                        <div className="pt-3 border-t border-zinc-900 flex items-end justify-between font-mono">
                          <div>
                            {isBaaCoinDiscountActive ? (
                              <>
                                <div className="text-[10px] text-zinc-500 line-through">
                                  ${displayPriceUsd.toLocaleString()} USD
                                </div>
                                <div className="text-[#FFD700] font-black text-xl flex items-center gap-1.5">
                                  <span>{displayPriceBaa.toLocaleString()} BAA</span>
                                </div>
                                <div className="text-[10px] text-emerald-400 font-bold">
                                  Save ${savingsUsd.toLocaleString()} with BaaCoin
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-white font-black text-xl">
                                  ${displayPriceUsd.toLocaleString()} USD
                                </div>
                                <div className="text-[10px] text-zinc-500">
                                  Switch to BaaCoin to save 15%
                                </div>
                              </>
                            )}
                          </div>

                          <div className="text-right">
                            <span className="text-zinc-500 text-[10px] block">Naira Settle:</span>
                            <span className="text-white text-xs font-bold">
                              ₦{(displayPriceBaa * 1550).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 pt-0 grid grid-cols-2 gap-2 font-mono">
                      <button
                        onClick={() => setSelectedProduct(p)}
                        className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-200 transition text-center flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Specs &amp; Title</span>
                      </button>

                      <button
                        onClick={() => setEscrowModalItem({ item: p, quantity: 1 })}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-heading font-black text-xs uppercase tracking-wider transition text-center shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>1-Click Escrow</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================
            4. EXTERNAL MARKETPLACES REFERRAL SYSTEM (AMAZON / ALIBABA)
        ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-sky-500/30 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-sky-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[#00D4FF] text-xs font-mono font-bold uppercase tracking-wider">
              <Globe2 className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Multi-Platform Referral API &amp; Automated Arbitrage</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
              Shop External Marketplaces with BaaCoin &amp; Earn Commissions
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Use your BaaCoin on external retail and wholesale giants like <span className="text-white font-bold">Amazon, Alibaba, Konga, Jiji, and AliExpress</span>. Our automated AI routing system assigns a 15% currency subsidy discount, collects a 2.0% BaaCoin service fee, and captures 4%–10% external affiliate referral commissions distributed into your personal referral ledger.
            </p>
          </div>

          {/* External Affiliate Link Entanglement Tool */}
          <div className="p-6 rounded-2xl bg-black border border-zinc-800 space-y-4 font-mono">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-zinc-900">
              <span className="text-zinc-300 font-bold flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#FFD700]" />
                <span>GENERATE AFFILIATE REFERRAL TRACKING LINK</span>
              </span>
              <span className="text-emerald-400 text-[10px]">4%–10% Commission Entangled</span>
            </div>

            <form onSubmit={handleGenerateAffiliateLink} className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedBridgeName}
                onChange={(e) => setSelectedBridgeName(e.target.value)}
                className="px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#00D4FF] shrink-0"
              >
                <option value="Amazon">Amazon.com Bridge (8.5% Comm)</option>
                <option value="Alibaba">Alibaba Wholesale (10.0% Comm)</option>
                <option value="Konga">Konga Prime (7.0% Comm)</option>
                <option value="Jiji">Jiji Classifieds (5.0% Comm)</option>
                <option value="AliExpress">AliExpress Direct (8.0% Comm)</option>
              </select>

              <input
                type="url"
                value={externalUrlInput}
                onChange={(e) => setExternalUrlInput(e.target.value)}
                placeholder="Paste any Amazon, Alibaba or Konga product URL here..."
                className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00D4FF]"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-[#00D4FF] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition shrink-0 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Entangled Link</span>
              </button>
            </form>

            {generatedReferralLink && (
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-[#00D4FF]/40 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Your Shareable Entangled Referral Link:</span>
                  <button
                    onClick={handleCopyAffiliateLink}
                    className="text-[#FFD700] hover:underline flex items-center gap-1 font-bold"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                </div>
                <div className="p-2 bg-black rounded-lg text-[10px] text-[#00D4FF] break-all border border-zinc-800">
                  {generatedReferralLink}
                </div>
                <div className="text-[10px] text-zinc-500">
                  Whenever any user buys through this link, your BaaCoin referral code ({profile.referral_code}) receives 50% of the platform referral commission directly.
                </div>
              </div>
            )}
          </div>

          {/* External Marketplace Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
            {bridges.map((bridge) => (
              <div
                key={bridge.id}
                className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-sky-500/40 transition flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-[#00D4FF] text-xs font-bold border border-sky-500/30">
                      {bridge.name} API
                    </span>
                    <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {bridge.affiliate_api_status}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {bridge.tagline}
                  </p>

                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Referral Commission:</span>
                      <span className="text-[#FFD700] font-bold">{bridge.commission_earned_percent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">BaaCoin Checkout Fee:</span>
                      <span className="text-emerald-400 font-bold">{bridge.baacoin_checkout_fee_percent}</span>
                    </div>
                  </div>

                  {/* Sample Popular Deals */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
                      FEATURED EXTERNAL DEALS:
                    </span>
                    {bridge.popular_deals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-2.5 rounded-xl bg-black border border-zinc-800/80 flex items-center justify-between text-xs hover:border-[#00D4FF]/40 transition"
                      >
                        <div className="pr-2 truncate">
                          <div className="text-zinc-200 font-bold truncate text-[11px]">{deal.title}</div>
                          <div className="text-[10px] text-zinc-500">
                            ${deal.price_usd} USD &bull; Comm: ${deal.referral_commission_usd}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setCalcAmountUsd(deal.price_usd);
                            setCalcPaymentMethod('baacoin');
                            setShowFeeCalculatorModal(true);
                          }}
                          className="px-2.5 py-1 rounded bg-[#FFD700]/15 hover:bg-[#FFD700]/30 text-[#FFD700] text-[10px] font-bold shrink-0"
                        >
                          {deal.price_baacoin} BAA
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedBridgeName(bridge.name);
                    setExternalUrlInput(`https://www.${bridge.name.toLowerCase()}.com`);
                    showToast(`Selected ${bridge.name} bridge! Generate your custom referral link above.`);
                  }}
                  className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Connect {bridge.name} Bridge</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ========================================================
          MODAL 1: PRODUCT SPECIFICATIONS & TITLE INSPECTION
      ======================================================== */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl my-8 font-mono">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] text-[10px] font-bold border border-[#00D4FF]/30">
                  {selectedProduct.category}
                </span>
                <span className="text-emerald-400 text-xs font-bold">{selectedProduct.condition}</span>
              </div>
              <h2 className="text-2xl font-heading font-black text-white">{selectedProduct.title}</h2>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{selectedProduct.description}</p>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-900">
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Specifications list */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-zinc-300 tracking-wider">
                CERTIFIED ENGINEERING SPECIFICATIONS:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedProduct.specs.map((spec, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-zinc-200">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller & Verification Details */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Verified Seller:</span>
                <span className="text-white font-bold">{selectedProduct.seller_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Physical Inspection Depot:</span>
                <span className="text-[#FFD700] font-bold">{selectedProduct.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Smart Contract Escrow:</span>
                <span className="text-emerald-400 font-bold">100% Protected (Base L2 Multi-sig)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900">
              <div>
                <span className="text-zinc-500 text-[10px] block">PAYABLE IN BAA COIN:</span>
                <span className="text-2xl font-heading font-black text-[#FFD700]">
                  {selectedProduct.price_baacoin.toLocaleString()} BAA
                </span>
                <span className="text-xs text-zinc-400 block">
                  (${selectedProduct.price_usd.toLocaleString()} USD &bull; Save ${(selectedProduct.price_usd - selectedProduct.price_baacoin).toLocaleString()})
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setCalcAmountUsd(selectedProduct.price_usd);
                    setShowFeeCalculatorModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-300"
                >
                  Calculate Fees
                </button>
                <button
                  onClick={() => {
                    const item = selectedProduct;
                    setSelectedProduct(null);
                    setEscrowModalItem({ item, quantity: 1 });
                  }}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-emerald-500/20"
                >
                  Initiate 1-Click Escrow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: 1-CLICK ESCROW CONFIRMATION
      ======================================================== */}
      {escrowModalItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl font-mono text-xs">
            <button
              onClick={() => setEscrowModalItem(null)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-black text-white">
                  Confirm 1-Click Escrow Lock
                </h3>
                <span className="text-emerald-400 text-[10px] font-bold">
                  BASE L2 SMART CONTRACT PROTOCOL
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <div className="text-white font-bold text-sm">{escrowModalItem.item.title}</div>
              <div className="flex justify-between text-zinc-400">
                <span>Category:</span>
                <span className="text-white">{escrowModalItem.item.category}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Item Price:</span>
                <span className="text-[#FFD700] font-bold">{escrowModalItem.item.price_baacoin.toLocaleString()} BAA</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>BaaCoin Escrow Fee (2.0%):</span>
                <span className="text-emerald-400 font-bold">{(escrowModalItem.item.price_baacoin * 0.02).toFixed(2)} BAA</span>
              </div>
              <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-white text-sm">
                <span>Total Escrow Lock:</span>
                <span className="text-[#FFD700]">{(escrowModalItem.item.price_baacoin * 1.02).toLocaleString()} BAA</span>
              </div>
            </div>

            <div className="p-3 bg-black rounded-xl border border-zinc-900 text-[10px] text-zinc-400 space-y-1">
              <div className="text-white font-bold">Buyer Protection Assurance:</div>
              <p>
                Funds are held in sovereign smart contract custody. The seller only receives payout upon your physical inspection confirmation or courier proof-of-delivery key.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEscrowModalItem(null)}
                className="flex-1 py-3 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmEscrow(escrowModalItem.item)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-emerald-500/20"
              >
                Authorize Escrow Lock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: STANDALONE SERVICE FEE CALCULATOR MODAL
      ======================================================== */}
      {showFeeCalculatorModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-[#FFD700]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl font-mono text-xs">
            <button
              onClick={() => setShowFeeCalculatorModal(false)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-black text-white">
                  BaaCoin Service Fee &amp; Arbitrage Engine
                </h3>
                <span className="text-zinc-500 text-[10px]">Real-Time Currency Conversion &amp; Rebate Simulator</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-zinc-400 block mb-1.5 font-bold">Purchase Amount (USD):</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">$</span>
                  <input
                    type="number"
                    value={calcAmountUsd}
                    onChange={(e) => setCalcAmountUsd(Math.max(1, Number(e.target.value) || 0))}
                    className="w-full pl-8 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white font-bold focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Gross Item Price:</span>
                  <span className="text-white font-bold">${activeCalcBreakdown.originalUsd.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>BaaCoin 15% Instant Discount:</span>
                  <span className="font-bold">-${activeCalcBreakdown.discountUsd.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-[#00D4FF]">
                  <span>Decentralized Service Fee (2.0%):</span>
                  <span className="font-bold">+${activeCalcBreakdown.serviceFeeUsd.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-purple-400">
                  <span>Affiliate Cashback Rebate (5.0%):</span>
                  <span className="font-bold">+${activeCalcBreakdown.referralRebateUsd.toFixed(2)} USD</span>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline font-bold">
                  <span className="text-white">Net Payable in BaaCoin:</span>
                  <span className="text-[#FFD700] text-lg font-black">
                    {activeCalcBreakdown.totalPayableBaa.toLocaleString()} BAA
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>Naira Equivalent:</span>
                  <span className="text-white font-bold">₦{activeCalcBreakdown.nairaEquivalent.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold flex justify-between items-center">
                <span>Net Savings Over Credit Card Gateways:</span>
                <span className="text-sm">${activeCalcBreakdown.netCustomerSavingsUsd.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={() => setShowFeeCalculatorModal(false)}
              className="w-full py-3 rounded-xl bg-[#FFD700] hover:bg-[#FFE234] text-black font-black text-xs uppercase tracking-wider transition"
            >
              Done / Return to Marketplace
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          TELEMETRY TOAST NOTIFICATION
      ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-zinc-950/95 backdrop-blur-xl border border-emerald-500/60 rounded-2xl p-4 shadow-2xl shadow-black/80 flex items-start gap-3 animate-fade-in font-mono text-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">
              MARKETPLACE TELEMETRY
            </span>
            <p className="text-zinc-200 mt-0.5 leading-snug">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-zinc-500 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};

export default GeneralMarketplacePage;
