import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  PromptMarketplaceItem,
  AITutor,
  CertificateNFT,
  GeneralProductItem,
  ExternalMarketplaceBridge,
  ShopperGroupBuy,
  MerchantSponsoredAd
} from '../types';
import {
  INITIAL_GENERAL_PRODUCTS,
  INITIAL_MARKETPLACE_BRIDGES,
  INITIAL_SHOPPER_GROUP_BUYS,
  INITIAL_MERCHANT_ADS,
  COMMERCE_AGENT_PRESETS
} from '../lib/autonomousData';
import {
  Store,
  Sparkles,
  Bot,
  Award,
  Cpu,
  Coins,
  CheckCircle,
  Copy,
  Check,
  Search,
  ExternalLink,
  Code2,
  Share2,
  DollarSign,
  Car,
  ShoppingCart,
  Globe2,
  Users,
  Radio,
  ShieldCheck,
  Tag,
  ArrowRight,
  ArrowUpRight,
  Flame,
  Layers,
  MapPin,
  Plus,
  Filter,
  RefreshCw,
  TrendingUp,
  X
} from 'lucide-react';

interface MarketplacePageProps {
  onSelectTutor: (tutorId: string) => void;
  onSelectCertificate: (cert: CertificateNFT) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onSelectTutor,
  onSelectCertificate
}) => {
  const {
    marketplacePrompts,
    aiTutors,
    certificates,
    aiTools,
    buyPrompt,
    createCustomPrompt,
    baacoinPrice,
    profile
  } = useEcosystem();

  const [activeTab, setActiveTab] = useState<
    'general_products' | 'global_bridges' | 'shoppers_network' | 'sponsored_ads' | 'prompts' | 'tutors' | 'certificates' | 'tools'
  >('general_products');
  const [search, setSearch] = useState('');
  const [purchasedPromptId, setPurchasedPromptId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [selectedPromptToView, setSelectedPromptToView] = useState<PromptMarketplaceItem | null>(null);
  const [membershipTier, setMembershipTier] = useState<'free' | 'pro' | 'institutional'>('free');
  const [isSellerPortalOpen, setIsSellerPortalOpen] = useState(false);
  const [checkoutModalItem, setCheckoutModalItem] = useState<{ title: string; price: number; baaPrice: number } | null>(null);

  // General Products State
  const [generalProducts, setGeneralProducts] = useState<GeneralProductItem[]>(INITIAL_GENERAL_PRODUCTS);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('All');
  const [selectedGeneralProduct, setSelectedGeneralProduct] = useState<GeneralProductItem | null>(null);

  // External Marketplaces & Referral API Bridge State
  const [marketplaceBridges, setMarketplaceBridges] = useState<ExternalMarketplaceBridge[]>(INITIAL_MARKETPLACE_BRIDGES);
  const [selectedBridgeFilter, setSelectedBridgeFilter] = useState<string>('All');
  const [externalSearchQuery, setExternalSearchQuery] = useState<string>('');
  const [externalBridgeCheckoutResult, setExternalBridgeCheckoutResult] = useState<{
    itemTitle: string;
    marketplace: string;
    priceBaa: number;
    commissionEarned: number;
    serviceFee: number;
  } | null>(null);

  // Shoppers Network State
  const [groupBuys, setGroupBuys] = useState<ShopperGroupBuy[]>(INITIAL_SHOPPER_GROUP_BUYS);
  const [joinedGroupBuySuccess, setJoinedGroupBuySuccess] = useState<string | null>(null);
  const [marketplaceToast, setMarketplaceToast] = useState<string | null>(null);

  // Sponsored Merchant Ads State
  const [merchantAds, setMerchantAds] = useState<MerchantSponsoredAd[]>(INITIAL_MERCHANT_ADS);
  const [isAdBookingModalOpen, setIsAdBookingModalOpen] = useState<boolean>(false);
  const [adForm, setAdForm] = useState({
    sponsor_name: '',
    platform: 'Amazon Partner' as MerchantSponsoredAd['platform'],
    headline: '',
    offer_text: '',
    cta_text: 'Shop with BaaCoin',
    daily_budget_baacoin: 200
  });

  // Custom Seller Product State
  const [sellerForm, setSellerForm] = useState({
    title: '',
    category: 'AI Wealth Prompts',
    course_title: 'Sovereign AI Capstone',
    description: '',
    final_prompt: '',
    price: 49
  });

  const handleSellerFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerForm.title || !sellerForm.final_prompt) return;

    createCustomPrompt({
      user_id: profile.id,
      student_name: profile.full_name || 'Autonomous Student Creator',
      course_id: 'custom-capstone-01',
      course_title: sellerForm.course_title,
      title: sellerForm.title,
      description: sellerForm.description,
      final_prompt: sellerForm.final_prompt,
      price: Number(sellerForm.price) || 49,
      is_listed: true,
      category: sellerForm.category,
      tags: ['Autonomous', 'Verified', 'S2E']
    });

    setIsSellerPortalOpen(false);
    setMarketplaceToast(`Your product "${sellerForm.title}" is now live in the Global Dual Marketplace!`);
    setTimeout(() => setMarketplaceToast(null), 5000);
  };

  // Filter items
  const filteredPrompts = marketplacePrompts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.student_name.toLowerCase().includes(search.toLowerCase()) ||
    p.course_title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTutors = aiTutors.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGeneralProducts = generalProducts.filter(p => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedProductCategory === 'All' || p.category === selectedProductCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBuyPromptAction = (p: PromptMarketplaceItem) => {
    buyPrompt(p.id);
    setPurchasedPromptId(p.id);
    setSelectedPromptToView(p);
  };

  const handleCopyPromptText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleBridgeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalSearchQuery.trim()) return;
    const targetBridge =
      marketplaceBridges.find(b => b.name === selectedBridgeFilter) ||
      marketplaceBridges[0];
    const simulatedUsd = 150;
    const baaPrice = Math.round(simulatedUsd * 0.85); // 15% discount
    const commPct = parseFloat(targetBridge.commission_earned_percent) || 7.5;
    const feePct = parseFloat(targetBridge.baacoin_checkout_fee_percent) || 2.0;
    const commission = Number(((simulatedUsd * commPct) / 100).toFixed(2));
    const fee = Number(((simulatedUsd * feePct) / 100).toFixed(2));

    setExternalBridgeCheckoutResult({
      itemTitle: externalSearchQuery,
      marketplace: targetBridge.name,
      priceBaa: baaPrice,
      commissionEarned: commission,
      serviceFee: fee
    });
  };

  const handleJoinGroupBuy = (gb: ShopperGroupBuy) => {
    if (gb.joined_users.length >= gb.target_slots) {
      setMarketplaceToast('This syndicate pool is already filled!');
      setTimeout(() => setMarketplaceToast(null), 4000);
      return;
    }
    const updated = groupBuys.map(item => {
      if (item.id === gb.id) {
        return {
          ...item,
          joined_users: [
            ...item.joined_users,
            {
              name: profile.full_name || 'Autonomous Shopper',
              avatar:
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
              location: 'Port Harcourt Hub'
            }
          ]
        };
      }
      return item;
    });
    setGroupBuys(updated);
    setJoinedGroupBuySuccess(
      `Joined pool for "${gb.item_title}"! +${gb.cashback_baacoin} BAA referral cashback will be credited to your Earnings Pulse on pool maturity.`
    );
    setTimeout(() => setJoinedGroupBuySuccess(null), 5000);
  };

  const handleCreateAdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adForm.sponsor_name || !adForm.headline) return;

    const newAd: MerchantSponsoredAd = {
      id: `ad-${Date.now()}`,
      sponsor_name: adForm.sponsor_name,
      platform: adForm.platform,
      headline: adForm.headline,
      offer_text: adForm.offer_text,
      cta_text: adForm.cta_text || 'Shop with BaaCoin',
      daily_budget_baacoin: Number(adForm.daily_budget_baacoin) || 200,
      impressions: 120,
      clicks: 4,
      ctr: '3.3%'
    };

    setMerchantAds([newAd, ...merchantAds]);
    setIsAdBookingModalOpen(false);
    setMarketplaceToast(
      `Sponsored Campaign "${adForm.headline}" is now live on the BAA Autonomous Merchant Ad Mesh! Billed daily in BaaCoin.`
    );
    setTimeout(() => setMarketplaceToast(null), 5000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <Store className="w-4 h-4 text-[#00D4FF]" />
            Autonomous Decentralized Exchange
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            The 60/40 Autonomous Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Where student intelligence becomes perpetual digital assets. Buy tested student prompts (60% paid to author), hire autonomous AI Tutors for schools, or trade NFT certificates with embedded BaaCoin chips.
          </p>
        </div>

        {/* Tab Selector & Seller Portal CTA */}
        <div className="flex flex-wrap items-center gap-2 self-center sm:self-auto">
          <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl shrink-0 text-xs overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab('general_products')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'general_products'
                  ? 'bg-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>🚗 Cars, Solar &amp; Tech</span>
            </button>

            <button
              onClick={() => setActiveTab('global_bridges')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'global_bridges'
                  ? 'bg-[#00D4FF] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>🌐 Global Referral API</span>
            </button>

            <button
              onClick={() => setActiveTab('shoppers_network')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'shoppers_network'
                  ? 'bg-purple-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>👥 Shoppers Network</span>
            </button>

            <button
              onClick={() => setActiveTab('sponsored_ads')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'sponsored_ads'
                  ? 'bg-emerald-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>📡 Sponsored Ads</span>
            </button>

            <button
              onClick={() => setActiveTab('prompts')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'prompts'
                  ? 'bg-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompts (60/40)</span>
            </button>

            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'tutors'
                  ? 'bg-[#00D4FF] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Tutors</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'certificates'
                  ? 'bg-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>NFTs</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'tools'
                  ? 'bg-[#00D4FF] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Tools</span>
            </button>
          </div>

          <button
            onClick={() => { window.location.hash = 'general-marketplace'; }}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center gap-1.5 shrink-0"
          >
            <ShoppingCart className="w-4 h-4 text-black" />
            <span>Multi-Sector Market &amp; Calculator</span>
          </button>

          <button
            onClick={() => setIsSellerPortalOpen(true)}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2 shrink-0"
          >
            <span>⚡ Seller Portal</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Tiered Membership Filters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">MEMBERSHIP FILTER:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setMembershipTier('free')}
                className={`px-3 py-1 rounded-lg transition ${membershipTier === 'free' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Free (15% Commission)
              </button>
              <button
                onClick={() => setMembershipTier('pro')}
                className={`px-3 py-1 rounded-lg transition ${membershipTier === 'pro' ? 'bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Pro (5% Fee + Ad Swarm)
              </button>
              <button
                onClick={() => setMembershipTier('institutional')}
                className={`px-3 py-1 rounded-lg transition ${membershipTier === 'institutional' ? 'bg-[#FFD700]/20 text-[#FFD700] font-bold border border-[#FFD700]/40' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                Institutional (0% Fee)
              </button>
            </div>
          </div>

          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-[#FFD700]" />
            <span>1 BAA = $1.00 USD (15% 1-Click Discount Enabled)</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-[#FFD700] rounded-xl text-xs text-white placeholder-zinc-500 font-mono outline-none"
          />
        </div>

        {/* TAB 0A: GENERAL PRODUCTS (CARS, SOLAR, ESTATE, TECH) */}
        {activeTab === 'general_products' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                    <span>Autonomous Real-Asset & General Commerce Hub</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                      BaaCoin Escrow Enabled
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Acquire Luxury SUVs, Commercial Vehicles, Off-Grid Solar Power Systems, Prime Land, and Tech directly with BaaCoin (1 BAA = $1.00 USD baseline with -15% instant discount) or Escrow Naira via Paystack. Physical inspection & CAC verified.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSellerPortalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono font-bold transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>List Vehicle / Real Asset</span>
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500 text-[11px] uppercase tracking-wider mr-1">FILTER ASSETS:</span>
              {[
                'All',
                'Vehicles & Cars',
                'Real Estate & Land',
                'Solar & Energy',
                'Electronics & Tech',
                'Luxury & Lifestyle'
              ].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedProductCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    selectedProductCategory === cat
                      ? 'bg-[#FFD700] text-black font-bold shadow-md'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGeneralProducts.map(p => (
                <div
                  key={p.id}
                  className="bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-emerald-500/50 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden group"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={p.image_url}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                          {p.condition}
                        </span>
                        {p.is_group_buy_eligible && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-500/80 backdrop-blur-md text-[10px] font-mono text-white font-bold">
                            Save {p.group_buy_discount_percent}% Group-Buy
                          </span>
                        )}
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 flex items-center gap-1 border border-zinc-700">
                          <MapPin className="w-3 h-3 text-[#FFD700]" />
                          {p.location}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#00D4FF] font-bold">{p.category}</span>
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                          <span>{p.seller_name}</span>
                          {p.seller_verified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      </div>

                      <h3 className="font-heading font-black text-white text-base leading-snug line-clamp-1">
                        {p.title}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>

                      {/* Specs */}
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

                      {/* Price Section */}
                      <div className="pt-3 border-t border-zinc-900 flex items-end justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-zinc-500 line-through">
                            ${p.price_usd.toLocaleString()} USD
                          </div>
                          <div className="text-[#FFD700] font-mono font-black text-lg flex items-center gap-1">
                            <span>{p.price_baacoin.toLocaleString()} BAA</span>
                            <span className="text-[10px] font-bold text-emerald-400 font-sans px-1.5 py-0.2 bg-emerald-500/10 rounded border border-emerald-500/30">
                              -15% BAA Pay
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-[10px] font-mono text-zinc-400">
                          ₦{(p.price_usd * 1550).toLocaleString()} Naira
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedGeneralProduct(p)}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-bold text-zinc-200 transition text-center"
                    >
                      Inspect Specs
                    </button>
                    <button
                      onClick={() =>
                        setCheckoutModalItem({
                          title: p.title,
                          price: p.price_usd,
                          baaPrice: p.price_baacoin
                        })
                      }
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-xs font-heading font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition text-center shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1"
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>1-Click Escrow</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 0B: GLOBAL MARKETPLACES REFERRAL API BRIDGES */}
        {activeTab === 'global_bridges' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-sky-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-[#00D4FF] shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                    <span>Autonomous Multi-Platform Referral & Shopping Gateway</span>
                    <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-[#00D4FF] text-[10px] font-mono border border-sky-500/30">
                      Amazon • Alibaba • Konga • Jiji • AliExpress
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Shop on external e-commerce giants using your BaaCoin. Our autonomous AI router executes the purchase, secures your item, collects 4%–10% referral affiliate commissions, charges a 1.5%–2.5% BaaCoin settlement fee, and routes dividends into the student UBEI treasury pool.
                  </p>
                </div>
              </div>
            </div>

            {/* External URL & AI Search Converter Bar */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#00D4FF] font-bold flex items-center gap-1.5">
                  <ShoppingCart className="w-3.5 h-3.5" />
                  PASTE ANY EXTERNAL PRODUCT URL OR SEARCH KEYWORD:
                </span>
                <span className="text-emerald-400 font-bold text-[11px]">
                  ✓ 15% Instant BaaCoin Discount Automatically Calculated
                </span>
              </div>

              <form onSubmit={handleBridgeSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex gap-2">
                  <select
                    value={selectedBridgeFilter}
                    onChange={(e) => setSelectedBridgeFilter(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-mono text-white outline-none focus:border-[#00D4FF]"
                  >
                    <option value="All">All Platforms</option>
                    <option value="Amazon">Amazon.com</option>
                    <option value="Alibaba">Alibaba Global</option>
                    <option value="Konga">Konga Nigeria</option>
                    <option value="Jiji">Jiji Marketplace</option>
                  </select>

                  <input
                    type="text"
                    placeholder="e.g. https://www.amazon.com/dp/B0CX... or '10kVA Lithium Hybrid Inverter' or 'MacBook M3 Max'"
                    value={externalSearchQuery}
                    onChange={(e) => setExternalSearchQuery(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 outline-none focus:border-[#00D4FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shrink-0 shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                >
                  <span>Query AI Bridge &amp; Convert to BAA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Platform Bridge Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketplaceBridges.map(bridge => (
                <div
                  key={bridge.id}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-sky-500/40 transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-900 text-white font-heading font-bold text-xs border border-zinc-800">
                      {bridge.logo_badge}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                      ● {bridge.affiliate_api_status}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-heading font-black text-white text-sm">{bridge.name}</h5>
                    <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">{bridge.tagline}</p>
                  </div>

                  <div className="pt-2 border-t border-zinc-900 space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-zinc-400">
                      <span>Referral Commission:</span>
                      <span className="text-emerald-400 font-bold">{bridge.commission_earned_percent}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>BaaCoin Gateway Fee:</span>
                      <span className="text-[#00D4FF] font-bold">{bridge.baacoin_checkout_fee_percent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Curated External Deals */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  Trending Global Deals with BaaCoin Instant Settlement &amp; Commission Tracking
                </h4>
                <span className="text-xs font-mono text-zinc-500">Live API Arbitrage Feeds</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {marketplaceBridges
                  .flatMap(b =>
                    b.popular_deals.map(d => ({ ...d, bridgeName: b.name, bridgeComm: b.commission_earned_percent }))
                  )
                  .map(deal => (
                    <div
                      key={deal.id}
                      className="bg-zinc-950 rounded-2xl border border-zinc-800 p-5 flex flex-col justify-between hover:border-[#FFD700]/50 transition group"
                    >
                      <div className="space-y-3">
                        <div className="relative h-40 w-full rounded-xl overflow-hidden bg-zinc-900">
                          <img
                            src={deal.image_url}
                            alt={deal.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-sky-400 border border-sky-500/30">
                            {deal.bridgeName} API
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/80 backdrop-blur-md text-[10px] font-mono font-bold text-black">
                            +${deal.referral_commission_usd} AI Comm.
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-mono text-zinc-400">{deal.category}</div>
                          <h4 className="font-heading font-bold text-white text-sm line-clamp-2 mt-0.5">
                            {deal.title}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-zinc-900 flex items-end justify-between font-mono">
                          <div>
                            <span className="text-[10px] text-zinc-500 line-through block">
                              ${deal.original_price_usd} USD
                            </span>
                            <span className="text-lg font-black text-[#FFD700]">
                              {deal.price_baacoin.toLocaleString()} BAA
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                            -15% BAA Pay
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-zinc-900 flex gap-2">
                        <button
                          onClick={() =>
                            setExternalBridgeCheckoutResult({
                              itemTitle: deal.title,
                              marketplace: deal.bridgeName,
                              priceBaa: deal.price_baacoin,
                              commissionEarned: deal.referral_commission_usd,
                              serviceFee: Number((deal.price_usd * 0.02).toFixed(2))
                            })
                          }
                          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition text-center shadow-md shadow-sky-500/10 flex items-center justify-center gap-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Buy with BaaCoin</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 0C: SHOPPERS NETWORK (GROUP-BUYS & 5% CASHBACK) */}
        {activeTab === 'shoppers_network' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-purple-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                    <span>Autonomous Shoppers Network &amp; Syndicate Group-Buys</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                      25%–35% Wholesale Savings + 5% CashBack
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Team up with thousands of learners, auto-dealers, and verified buyers to unlock direct container factory pricing. Every participant also receives an instant 5% BaaCoin referral cashback on pool settlement.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                  👥 1,842 Active Syndicate Shoppers
                </span>
              </div>
            </div>

            {/* Success Toast */}
            {joinedGroupBuySuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{joinedGroupBuySuccess}</span>
              </div>
            )}

            {/* Shoppers Network Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">WEEKLY GROUP VOLUME</span>
                <div className="text-xl font-heading font-black text-white mt-1">₦28,450,000</div>
                <span className="text-[10px] font-mono text-emerald-400">↑ +34% vs last week</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">TOTAL MEMBER SAVINGS</span>
                <div className="text-xl font-heading font-black text-[#FFD700] mt-1">$19,400 USD</div>
                <span className="text-[10px] font-mono text-purple-400">Wholesale container splits</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">BAACOIN CASHBACK MINTED</span>
                <div className="text-xl font-heading font-black text-[#00D4FF] mt-1">14,250 BAA</div>
                <span className="text-[10px] font-mono text-emerald-400">5% referral rewards distributed</span>
              </div>
            </div>

            {/* Syndicate Pools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {groupBuys.map(gb => {
                const progressPct = Math.min(100, Math.round((gb.joined_users.length / gb.target_slots) * 100));
                const slotsLeft = gb.target_slots - gb.joined_users.length;

                return (
                  <div
                    key={gb.id}
                    className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 flex flex-col justify-between transition-all duration-300 shadow-xl"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] font-bold">
                          {gb.category}
                        </span>
                        <span className="text-emerald-400 font-bold text-[11px]">
                          Save {gb.savings_percent}%
                        </span>
                      </div>

                      <div>
                        <h4 className="font-heading font-bold text-white text-base leading-snug">
                          {gb.item_title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs font-mono">
                          <span className="text-zinc-500 line-through">${gb.original_price_usd} USD</span>
                          <span className="text-[#FFD700] font-black">{gb.group_price_baacoin.toLocaleString()} BAA</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between text-zinc-400 text-[11px]">
                          <span>Syndicate Progress: {progressPct}%</span>
                          <span className="text-purple-300">{slotsLeft} slots remaining</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>

                      {/* Joined Users Avatar Stack */}
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                        <div className="flex items-center -space-x-2">
                          {gb.joined_users.slice(0, 4).map((u, i) => (
                            <img
                              key={i}
                              src={u.avatar}
                              alt={u.name}
                              className="w-7 h-7 rounded-full border-2 border-zinc-950 object-cover"
                              title={`${u.name} (${u.location})`}
                            />
                          ))}
                          {gb.joined_users.length > 4 && (
                            <div className="w-7 h-7 rounded-full bg-purple-900 border-2 border-zinc-950 flex items-center justify-center text-[9px] font-bold text-white">
                              +{gb.joined_users.length - 4}
                            </div>
                          )}
                        </div>

                        <span className="text-amber-400 text-[10px]">⏱ Expires {gb.expires_in}</span>
                      </div>

                      {/* Cashback Callout */}
                      <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-[11px] font-mono text-purple-200 flex items-center justify-between">
                        <span>Referral CashBack:</span>
                        <span className="text-emerald-400 font-bold">+{gb.cashback_baacoin} BAA to Wallet</span>
                      </div>
                    </div>

                    <div className="pt-5 mt-3 border-t border-zinc-900">
                      <button
                        onClick={() => handleJoinGroupBuy(gb)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition text-center shadow-lg shadow-purple-500/20 flex items-center justify-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Join Syndicate Pool ({gb.group_price_baacoin.toLocaleString()} BAA)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 0D: SPONSORED ADS (MERCHANT AD MESH) */}
        {activeTab === 'sponsored_ads' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#FFD700] shrink-0">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                    <span>Autonomous Merchant Ad Mesh &amp; Sponsored Placements</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[#FFD700] text-[10px] font-mono border border-amber-500/30">
                      Pay Per Day in BaaCoin / Paystack
                    </span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    External platforms, auto-dealers, tech retailers, and Amazon/Alibaba partners broadcast sponsored campaigns directly to 2,400+ active student nodes and high-value buyers. Ad revenues automatically buy back BaaCoin from the open market.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAdBookingModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Book Sponsored Merchant Ad</span>
              </button>
            </div>

            {/* Ad Mesh Telemetry */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase">ACTIVE ADVERTISERS</span>
                <div className="text-xl font-heading font-black text-white mt-1">18 Brands</div>
                <span className="text-[10px] text-emerald-400">Paystack &amp; BaaCoin verified</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase">DAILY BAA BURN</span>
                <div className="text-xl font-heading font-black text-[#FFD700] mt-1">2,450 BAA/day</div>
                <span className="text-[10px] text-zinc-400">Treasury buyback pool</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase">TOTAL IMPRESSIONS</span>
                <div className="text-xl font-heading font-black text-[#00D4FF] mt-1">189,400</div>
                <span className="text-[10px] text-emerald-400">Across 2,400+ live nodes</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] text-zinc-500 uppercase">AVERAGE CTR</span>
                <div className="text-xl font-heading font-black text-emerald-400 mt-1">4.6%</div>
                <span className="text-[10px] text-zinc-400">High engagement student traffic</span>
              </div>
            </div>

            {/* Live Merchant Ads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {merchantAds.map(ad => (
                <div
                  key={ad.id}
                  className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700]/50 transition space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-bold">
                        {ad.sponsor_name}
                      </span>
                      <span className="text-zinc-500">• {ad.platform}</span>
                    </div>
                    <span className="text-[#FFD700] font-bold">
                      {ad.daily_budget_baacoin} BAA/day
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-heading font-black text-white">{ad.headline}</h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{ad.offer_text}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                    <div className="text-zinc-400">
                      <span>Impressions: </span>
                      <span className="text-white font-bold">{ad.impressions.toLocaleString()}</span>
                      <span className="mx-2">•</span>
                      <span>Clicks: </span>
                      <span className="text-emerald-400 font-bold">{ad.clicks}</span>
                      <span className="mx-2">•</span>
                      <span>CTR: </span>
                      <span className="text-[#00D4FF] font-bold">{ad.ctr}</span>
                    </div>

                    <button
                      onClick={() => alert(`Redirecting to ${ad.sponsor_name} portal with BaaCoin coupon applied!`)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 text-[11px] font-bold font-mono transition flex items-center gap-1"
                    >
                      <span>{ad.cta_text}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: PROMPTS (60/40) */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#FFD700]/30 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">
                    Autonomous 60/40 Royalty Contract Enforced
                  </h4>
                  <p className="text-xs text-zinc-400">
                    When you purchase a prompt: 60% of the price is instantly routed to the student graduate's wallet, and 40% to the university autonomous treasury.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((p) => {
                const isAuthor = p.user_id === profile.id;

                return (
                  <div
                    key={p.id}
                    className="bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#FFD700]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-[#00D4FF] font-bold">{p.category}</span>
                        <span className="text-[#FFD700] font-black text-sm">${p.price} USD</span>
                      </div>

                      <h3 className="font-heading font-bold text-white text-base leading-snug">
                        {p.title}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                        {p.description}
                      </p>

                      <div className="mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1.5 text-[11px] font-mono text-zinc-400">
                        <div className="flex justify-between">
                          <span>Author:</span>
                          <span className="text-white font-medium truncate max-w-[160px]">{p.student_name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Origin:</span>
                          <span className="text-zinc-300 truncate max-w-[160px]">{p.course_title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Student Share (60%):</span>
                          <span className="text-emerald-400 font-bold">${(p.price * 0.6).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform Share (40%):</span>
                          <span className="text-zinc-500">${(p.price * 0.4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-zinc-800 text-zinc-300">
                          <span>Total Sales:</span>
                          <span className="text-[#FFD700] font-bold">{p.sales} purchases</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-zinc-900 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            buyPrompt(p.id);
                            setPurchasedPromptId(p.id);
                            setCheckoutModalItem({
                              title: p.title,
                              price: p.price,
                              baaPrice: Math.round(p.price * 0.85)
                            });
                          }}
                          className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-[11px] uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1 shadow-md shadow-[#FFD700]/15"
                          title="1-Click checkout with 15% discount when paying in BaaCoin"
                        >
                          <Coins className="w-3.5 h-3.5" />
                          <span>1-Click ({Math.round(p.price * 0.85)} BAA)</span>
                        </button>

                        <button
                          onClick={() => handleBuyPromptAction(p)}
                          className="py-2.5 px-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white font-mono text-[11px] transition flex items-center justify-center gap-1"
                        >
                          <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                          <span>USD (${p.price})</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setSelectedPromptToView(p)}
                        className="w-full py-1.5 rounded-lg bg-black hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-[10px] font-mono transition text-center"
                      >
                        Inspect Full Prompt Directive
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: AI TUTORS (PLUG & PLAY) */}
        {activeTab === 'tutors' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#00D4FF]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#00D4FF] uppercase">
                  Plug &amp; Play Autonomous AI Tutors for Schools
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Schools and universities embed our AI professors via a 1-line iframe code for $99/mo. 24/7 student tutoring with autonomous billing verification.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-[#00D4FF]/50 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-zinc-800">
                      <img
                        src={tutor.avatar_url}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 px-2 py-0.5 rounded-full text-[9px] font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Active
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider block">
                      {tutor.subject}
                    </span>
                    <h3 className="font-heading font-bold text-white text-base mt-1">
                      {tutor.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {tutor.specialty}
                    </p>

                    <div className="mt-3 text-[11px] font-mono text-zinc-400">
                      <span>Hired by: </span>
                      <span className="text-white font-bold">{tutor.hired_by_schools} Institutions</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-900 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-zinc-500">School License:</span>
                      <span className="text-[#FFD700] font-bold">${tutor.price_monthly}/mo</span>
                    </div>

                    <button
                      onClick={() => onSelectTutor(tutor.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5 fill-black" />
                      <span>Get Embed Iframe Code</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATES NFT (TRADABLE) */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-[#FFD700]/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-mono font-bold text-[#FFD700] uppercase">
                  Verified On-Chain NFT Certificates with BaaCoin Chips
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Official certificates contain embedded BaaCoin collateral chips and lifetime 10% referral earning mechanisms.
                </p>
              </div>
            </div>

            {certificates.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono text-xs">
                No graduate certificates listed in secondary trading yet. Complete any course 100% in the Academy to mint your sovereign certificate!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-[#FFD700]/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-emerald-400 font-bold">VERIFIED ON-CHAIN</span>
                        <span className="text-[#FFD700] font-bold">{cert.baacoin_engraved} BAACOIN</span>
                      </div>

                      <h3 className="font-heading font-bold text-white text-base">
                        {cert.course_title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">
                        Graduate: {cert.student_name}
                      </p>

                      <div className="mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono space-y-1 text-zinc-400">
                        <div className="truncate">Token ID: {cert.nft_id}</div>
                        <div>Issued: {cert.issue_date}</div>
                        <div className="text-emerald-400">Embedded 10% Referral: Active</div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-zinc-900 flex gap-2">
                      <button
                        onClick={() => onSelectCertificate(cert)}
                        className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                      >
                        Inspect &amp; Verify
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TOOLS */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiTools.slice(0, 9).map((t) => (
              <div key={t.id} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-base font-bold text-white font-heading">{t.name}</h4>
                  <span className="text-xs font-mono text-[#00D4FF]">${t.price_monthly}/mo</span>
                </div>
                <p className="text-xs text-zinc-400">{t.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View Prompt Modal */}
      {selectedPromptToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-[#FFD700]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedPromptToView(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider">
                {selectedPromptToView.category} • {selectedPromptToView.course_title}
              </span>
              <h3 className="text-xl font-heading font-black text-white mt-1">
                {selectedPromptToView.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Author: {selectedPromptToView.student_name} (Receives 60% royalties on sales)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span>SYSTEM PROMPT DIRECTIVE</span>
                <button
                  onClick={() => handleCopyPromptText(selectedPromptToView.final_prompt, selectedPromptToView.id)}
                  className="flex items-center gap-1 text-[#FFD700] hover:underline"
                >
                  {copiedPromptId === selectedPromptToView.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-amber-200/90 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                {selectedPromptToView.final_prompt}
              </pre>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>Price: ${selectedPromptToView.price} USD</span>
              <span className="text-emerald-400">60% routed to student wallet</span>
            </div>
          </div>
        </div>
      )}

      {/* 1-Click BAA Checkout Confirmation Modal */}
      {checkoutModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-zinc-950 border border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                BASE L2 PROTOCOL CONFIRMED
              </span>
              <h3 className="text-xl font-heading font-black text-white mt-1">
                1-Click Sovereign Purchase Successful
              </h3>
              <p className="text-xs text-zinc-300 mt-2">
                You successfully acquired <span className="text-[#FFD700] font-bold">"{checkoutModalItem.title}"</span> for <span className="text-emerald-400 font-bold">{checkoutModalItem.baaPrice} BAA</span> (saving 15% vs ${checkoutModalItem.price} USD).
              </p>
            </div>

            <div className="p-3 bg-black rounded-xl border border-zinc-800 text-left font-mono text-[11px] text-zinc-400 space-y-1">
              <div className="flex justify-between">
                <span>Transaction Hash:</span>
                <span className="text-emerald-400">0x8892...BaaC</span>
              </div>
              <div className="flex justify-between">
                <span>Student Author Royalty:</span>
                <span className="text-[#FFD700]">60% Disbursed</span>
              </div>
              <div className="flex justify-between">
                <span>Ad Swarm Treasury Split:</span>
                <span className="text-zinc-300">15% Reinvested</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutModalItem(null)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition"
            >
              Access Digital Asset &amp; Prompts
            </button>
          </div>
        </div>
      )}

      {/* Interactive Seller Portal Modal */}
      {isSellerPortalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            <button
              onClick={() => setIsSellerPortalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                COMMUNITY CREATOR &amp; VENDOR PORTAL
              </span>
              <h2 className="text-2xl font-heading font-black text-white mt-1">
                List Product in Global Dual Marketplace
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Sell AI prompts, autonomous workflows, e-books, or hardware. Toggle your seller tier to configure platform commission.
              </p>
            </div>

            {/* Seller Tier Selector */}
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <div
                onClick={() => setMembershipTier('free')}
                className={`p-3 rounded-2xl border cursor-pointer transition ${
                  membershipTier === 'free' ? 'bg-zinc-900 border-[#FFD700] text-white' : 'bg-black border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="font-bold block text-white">Free Seller</span>
                <span className="text-[10px] text-zinc-500">15% Commission</span>
              </div>

              <div
                onClick={() => setMembershipTier('pro')}
                className={`p-3 rounded-2xl border cursor-pointer transition ${
                  membershipTier === 'pro' ? 'bg-emerald-950/40 border-emerald-400 text-white' : 'bg-black border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="font-bold block text-emerald-400">Pro Vendor</span>
                <span className="text-[10px] text-zinc-400">5% Fee + Ad Swarm</span>
              </div>

              <div
                onClick={() => setMembershipTier('institutional')}
                className={`p-3 rounded-2xl border cursor-pointer transition ${
                  membershipTier === 'institutional' ? 'bg-purple-950/40 border-purple-400 text-white' : 'bg-black border-zinc-800 text-zinc-400'
                }`}
              >
                <span className="font-bold block text-purple-300">Institutional</span>
                <span className="text-[10px] text-zinc-400">0% Fee (ABAU Partners)</span>
              </div>
            </div>

            <form onSubmit={handleSellerFormSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">PRODUCT / PROMPT TITLE</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Nollywood Subtitler Agent"
                    value={sellerForm.title}
                    onChange={(e) => setSellerForm({ ...sellerForm, title: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">CATEGORY</label>
                  <select
                    value={sellerForm.category}
                    onChange={(e) => setSellerForm({ ...sellerForm, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="AI Wealth Prompts">AI Wealth Prompts</option>
                    <option value="Autonomous Robotics">Autonomous Robotics</option>
                    <option value="Nollywood & Media">Nollywood &amp; Media</option>
                    <option value="FinTech & Lending">FinTech &amp; Lending</option>
                    <option value="Community Workflows">Community Workflows</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">DESCRIPTION</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explain what problem this prompt or asset solves..."
                  value={sellerForm.description}
                  onChange={(e) => setSellerForm({ ...sellerForm, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">PROMPT CODE / DIRECTIVE CONTENT</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter the complete autonomous prompt instructions..."
                  value={sellerForm.final_prompt}
                  onChange={(e) => setSellerForm({ ...sellerForm, final_prompt: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">PRICE (USD)</label>
                  <input
                    type="number"
                    min="5"
                    value={sellerForm.price}
                    onChange={(e) => setSellerForm({ ...sellerForm, price: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">1-CLICK BAA DISCOUNT PRICE</label>
                  <div className="py-2 px-3 bg-black rounded-xl border border-zinc-800 text-[#FFD700] font-bold">
                    {Math.round(sellerForm.price * 0.85)} BAA (-15%)
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsSellerPortalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition"
                >
                  Publish to Global Marketplace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: General Product Inspection & Escrow Modal */}
      {selectedGeneralProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            <button
              onClick={() => setSelectedGeneralProduct(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  {selectedGeneralProduct.condition}
                </span>
                <span className="text-zinc-400 text-xs font-mono">• {selectedGeneralProduct.category}</span>
                <span className="text-zinc-500 text-xs font-mono">• {selectedGeneralProduct.location}</span>
              </div>
              <h2 className="text-2xl font-heading font-black text-white">
                {selectedGeneralProduct.title}
              </h2>
            </div>

            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <img
                src={selectedGeneralProduct.image_url}
                alt={selectedGeneralProduct.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md border border-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Seller: {selectedGeneralProduct.seller_name}</span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedGeneralProduct.description}
            </p>

            {/* Comprehensive Technical Specs */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                VERIFIED INSPECTION SPECIFICATIONS:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedGeneralProduct.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 flex items-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Escrow Protection Notice */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1 text-xs font-mono">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>BAA Autonomous Escrow Guarantee</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                When you click Escrow Purchase, your BaaCoin or Naira is securely locked in the smart contract escrow. Funds are ONLY released to the merchant once the vehicle or asset passes your physical verification in Port Harcourt, Lagos, or Abuja.
              </p>
            </div>

            {/* Pricing Breakdown & Escrow Action */}
            <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-zinc-400 line-through">
                  ${selectedGeneralProduct.price_usd.toLocaleString()} USD (₦{(selectedGeneralProduct.price_usd * 1550).toLocaleString()})
                </div>
                <div className="text-xl font-heading font-black text-[#FFD700] flex items-center gap-2">
                  <span>{selectedGeneralProduct.price_baacoin.toLocaleString()} BAA</span>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                    15% BAA Discount Applied
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGeneralProduct(null)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs font-mono"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const item = selectedGeneralProduct;
                    setSelectedGeneralProduct(null);
                    setCheckoutModalItem({
                      title: item.title,
                      price: item.price_usd,
                      baaPrice: item.price_baacoin
                    });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>Lock in BaaCoin Escrow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: External Marketplace Referral Bridge Checkout Result */}
      {externalBridgeCheckoutResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-sky-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in">
            <button
              onClick={() => setExternalBridgeCheckoutResult(null)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-[#00D4FF] mx-auto">
              <Globe2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold">
                AUTONOMOUS REFERRAL API BRIDGE CONFIRMED
              </span>
              <h3 className="text-xl font-heading font-black text-white">
                {externalBridgeCheckoutResult.marketplace} Order Gateway
              </h3>
              <p className="text-xs text-zinc-400">
                Item: <span className="text-white font-bold">{externalBridgeCheckoutResult.itemTitle}</span>
              </p>
            </div>

            {/* Financial & Commission Telemetry */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 font-mono text-xs space-y-2.5">
              <div className="flex justify-between text-zinc-300">
                <span>Settlement Currency:</span>
                <span className="text-[#FFD700] font-black">{externalBridgeCheckoutResult.priceBaa.toLocaleString()} BAA (-15% Discount)</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Referral Commission Earned:</span>
                <span className="text-emerald-400 font-bold">+${externalBridgeCheckoutResult.commissionEarned} USD</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>BaaCoin Gateway Service Fee:</span>
                <span className="text-[#00D4FF] font-bold">${externalBridgeCheckoutResult.serviceFee} USD</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[11px] pt-2 border-t border-zinc-800">
                <span>Treasury Routing:</span>
                <span className="text-purple-300">Auto-allocated to UBEI Student Fund</span>
              </div>
              <div className="flex justify-between text-zinc-400 text-[11px]">
                <span>Webhook Status:</span>
                <span className="text-emerald-400 font-bold">200 OK (Cart Session Verified)</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/30 text-[11px] font-mono text-sky-200">
              💡 Our autonomous shopping agent will process fulfillment with {externalBridgeCheckoutResult.marketplace} logistics and update your Earnings Pulse with referral cashback.
            </div>

            <button
              onClick={() => {
                alert(`Order token for "${externalBridgeCheckoutResult.itemTitle}" dispatched! Dispatched via ${externalBridgeCheckoutResult.marketplace} Affiliate API.`);
                setExternalBridgeCheckoutResult(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-sky-500/20"
            >
              Confirm BaaCoin Payment &amp; Dispatch Order
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Book Sponsored Merchant Ad Modal */}
      {isAdBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-zinc-950 border border-[#FFD700]/50 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6">
            <button
              onClick={() => setIsAdBookingModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-widest font-bold">
                AUTONOMOUS MERCHANT AD MESH
              </span>
              <h2 className="text-2xl font-heading font-black text-white mt-1">
                Book Sponsored Campaign
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Target 2,400+ active student nodes, developers, and verified buyers across Port Harcourt, Lagos, and Africa. Pay daily in BaaCoin or Paystack.
              </p>
            </div>

            <form onSubmit={handleCreateAdSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">BRAND / SPONSOR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos Luxury Motors"
                    value={adForm.sponsor_name}
                    onChange={(e) => setAdForm({ ...adForm, sponsor_name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">PLATFORM / CHANNEL</label>
                  <select
                    value={adForm.platform}
                    onChange={(e) =>
                      setAdForm({ ...adForm, platform: e.target.value as MerchantSponsoredAd['platform'] })
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  >
                    <option value="Lagos Motors Hub">Lagos Motors Hub</option>
                    <option value="Amazon Partner">Amazon Partner</option>
                    <option value="Alibaba Gold">Alibaba Gold</option>
                    <option value="Konga Prime">Konga Prime</option>
                    <option value="Jiji Verified Dealer">Jiji Verified Dealer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">HEADLINE BANNER</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2024 Mercedes GLE 450 - Pay 100% in BaaCoin with 15% Off"
                  value={adForm.headline}
                  onChange={(e) => setAdForm({ ...adForm, headline: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">PROMOTIONAL OFFER TEXT</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Direct foreign used, customs duty paid in Lagos, physical inspection guaranteed at Victoria Island..."
                  value={adForm.offer_text}
                  onChange={(e) => setAdForm({ ...adForm, offer_text: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 block mb-1">CALL TO ACTION BUTTON</label>
                  <input
                    type="text"
                    value={adForm.cta_text}
                    onChange={(e) => setAdForm({ ...adForm, cta_text: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">DAILY BUDGET (BAACOIN)</label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={adForm.daily_budget_baacoin}
                    onChange={(e) => setAdForm({ ...adForm, daily_budget_baacoin: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#FFD700]"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="p-3.5 rounded-xl bg-black border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">LIVE BANNER PREVIEW:</span>
                <div className="text-white font-bold text-sm">{adForm.headline || 'Your Headline Here'}</div>
                <div className="text-zinc-400 text-[11px]">{adForm.offer_text || 'Your offer description will appear here...'}</div>
                <div className="pt-2 flex justify-between items-center text-[10px] text-emerald-400">
                  <span>Sponsored by {adForm.sponsor_name || 'Brand'}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20">{adForm.cta_text}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdBookingModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-[#FFD700]/20"
                >
                  Activate Sponsored Ad ({adForm.daily_budget_baacoin} BAA/day)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Marketplace Action Toast */}
      {marketplaceToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-zinc-950/95 backdrop-blur-xl border border-emerald-500/60 rounded-2xl p-4 shadow-2xl shadow-black/80 flex items-start gap-3 animate-fade-in font-mono text-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">MARKETPLACE TELEMETRY</span>
            <p className="text-zinc-200 mt-0.5 leading-snug">{marketplaceToast}</p>
          </div>
          <button
            onClick={() => setMarketplaceToast(null)}
            className="text-zinc-500 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
export default MarketplacePage;
