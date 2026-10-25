import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  Coins,
  TrendingUp,
  Download,
  Filter,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Building2,
  Wallet,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

export type SupportedCurrency = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'ETH' | 'BAA' | 'BTC';

interface CurrencyRate {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  rateToUsd: number; // 1 USD = X Currency units (or 1 Unit = Y USD)
  isCrypto?: boolean;
}

export const CURRENCY_RATES: Record<SupportedCurrency, CurrencyRate> = {
  NGN: { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rateToUsd: 1550 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToUsd: 1 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToUsd: 0.785 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToUsd: 0.925 },
  ETH: { code: 'ETH', symbol: 'Ξ', name: 'Ethereum', rateToUsd: 0.0003205, isCrypto: true }, // ~$3,120/ETH
  BAA: { code: 'BAA', symbol: 'BAA', name: 'BaaCoin (Base L2)', rateToUsd: 1.0 },
  BTC: { code: 'BTC', symbol: '₿', name: 'Bitcoin', rateToUsd: 0.00001048, isCrypto: true } // ~$95,400/BTC
};

interface PlatformTransaction {
  id: string;
  timestamp: string;
  source: 'Academy Tuition' | 'UADC Compute & Phone Nodes' | 'BAA Library Monographs' | '60/40 Marketplace' | 'NFT Certificates' | 'Workforce Subscriptions';
  payer: string;
  currency: SupportedCurrency;
  amount: number;
  usdEquivalent: number;
  gateway: 'Paystack' | 'Base L2 Contract' | 'Bitcoin Lightning' | 'Stripe Wire' | 'Crypto Vault';
  txHash: string;
  status: 'settled' | 'pending';
}

const INITIAL_TRANSACTIONS: PlatformTransaction[] = [
  {
    id: 'tx-ngn-9901',
    timestamp: 'Just now',
    source: 'Academy Tuition',
    payer: 'Chief Olatunji Adebayo (Lagos)',
    currency: 'NGN',
    amount: 155000,
    usdEquivalent: 100,
    gateway: 'Paystack',
    txHash: 'pstk_live_98a7fbc412',
    status: 'settled'
  },
  {
    id: 'tx-btc-8802',
    timestamp: '8m ago',
    source: 'UADC Compute & Phone Nodes',
    payer: '0x39a...48b9 (Enterprise GPU Node)',
    currency: 'BTC',
    amount: 0.024,
    usdEquivalent: 2289.60,
    gateway: 'Bitcoin Lightning',
    txHash: 'btc_blk_89410294ab',
    status: 'settled'
  },
  {
    id: 'tx-usd-7703',
    timestamp: '22m ago',
    source: 'BAA Library Monographs',
    payer: 'Dr. Evelyn Sterling (London/Accra)',
    currency: 'USD',
    amount: 147,
    usdEquivalent: 147,
    gateway: 'Stripe Wire',
    txHash: 'ch_3N82ab91c490a',
    status: 'settled'
  },
  {
    id: 'tx-baa-6604',
    timestamp: '35m ago',
    source: '60/40 Marketplace',
    payer: 'Kofi Mensah (Ghana Node)',
    currency: 'BAA',
    amount: 450,
    usdEquivalent: 450,
    gateway: 'Base L2 Contract',
    txHash: '0xbaa8921cfb094812a4',
    status: 'settled'
  },
  {
    id: 'tx-eth-5505',
    timestamp: '1h ago',
    source: 'NFT Certificates',
    payer: 'Amina Bello (Kano Supernode)',
    currency: 'ETH',
    amount: 0.45,
    usdEquivalent: 1404,
    gateway: 'Base L2 Contract',
    txHash: '0xeth894a0219bf4490c',
    status: 'settled'
  },
  {
    id: 'tx-gbp-4406',
    timestamp: '2h ago',
    source: 'Workforce Subscriptions',
    payer: 'NaijaUK Musical Fusion Ltd',
    currency: 'GBP',
    amount: 785,
    usdEquivalent: 1000,
    gateway: 'Stripe Wire',
    txHash: 'ch_gbp_990142fa91',
    status: 'settled'
  },
  {
    id: 'tx-eur-3307',
    timestamp: '3h ago',
    source: 'BAA Library Monographs',
    payer: 'Institut Francophone IA (Dakar)',
    currency: 'EUR',
    amount: 370,
    usdEquivalent: 400,
    gateway: 'Stripe Wire',
    txHash: 'ch_eur_8812cfa098',
    status: 'settled'
  },
  {
    id: 'tx-ngn-2208',
    timestamp: '4h ago',
    source: 'UADC Compute & Phone Nodes',
    payer: 'Port Harcourt Phone Swarm (#2417 Nodes)',
    currency: 'NGN',
    amount: 852000,
    usdEquivalent: 549.68,
    gateway: 'Paystack',
    txHash: 'pstk_live_44901ba87c',
    status: 'settled'
  }
];

export const AdminCentralEarningsDashboard: React.FC = () => {
  const { wallet, profile, marketplacePrompts } = useEcosystem();

  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState<SupportedCurrency>('NGN');
  const [currencyFilter, setCurrencyFilter] = useState<'ALL' | SupportedCurrency>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month' | 'all'>('all');
  const [isSettlingBank, setIsSettlingBank] = useState(false);
  const [settleNotice, setSettleNotice] = useState<string | null>(null);

  // Consolidated Gross Treasury in USD
  const totalGrossUsd = useMemo(() => {
    // Base platform gross earnings ~$96,400 USD
    return 96420.50;
  }, []);

  // Convert USD to any currency
  const convertUsdTo = (usdAmount: number, target: SupportedCurrency): number => {
    const rateObj = CURRENCY_RATES[target];
    return usdAmount * rateObj.rateToUsd;
  };

  // Format currency display
  const formatCurrency = (amount: number, code: SupportedCurrency): string => {
    const rateObj = CURRENCY_RATES[code];
    if (code === 'BTC') {
      return `₿ ${amount.toFixed(4)}`;
    }
    if (code === 'ETH') {
      return `Ξ ${amount.toFixed(3)}`;
    }
    if (code === 'BAA') {
      return `${amount.toLocaleString(undefined, { maximumFractionDigits: 1 })} BAA`;
    }
    return `${rateObj.symbol} ${amount.toLocaleString(undefined, { maximumFractionDigits: code === 'NGN' ? 0 : 2 })}`;
  };

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(t => {
      const matchesCurr = currencyFilter === 'ALL' || t.currency === currencyFilter;
      const matchesSearch = 
        t.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.txHash.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCurr && matchesSearch;
    });
  }, [currencyFilter, searchTerm]);

  // Handle Nigerian Bank Instant Settlement via Paystack
  const handleSettleToBank = () => {
    setIsSettlingBank(true);
    setTimeout(() => {
      setIsSettlingBank(false);
      setSettleNotice('Successfully initiated Paystack auto-payout of ₦15,500,000 to MODE Digital / Rossyst Enterprises Bank Account. Settlement ref: PSTK_BATCH_2026_PH.');
      setTimeout(() => setSettleNotice(null), 6000);
    }, 1200);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* HEADER SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CENTRAL PLATFORM EARNINGS ENGINE
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-400 text-xs font-mono">7 Currencies Live</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">
              Sovereign Multi-Currency Treasury
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Consolidated financial command center tracking real-time platform revenue across Naira, Dollar, Pound, Euro, Ether, BaaCoin, and Bitcoin.
            </p>
          </div>

          {/* Quick Bank Settlement Action */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSettleToBank}
              disabled={isSettlingBank}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#00E676] hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#00C853]/30 flex items-center gap-2 cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>{isSettlingBank ? 'Dispatching Paystack Batch...' : 'Settle to Bank (Paystack NGN)'}</span>
            </button>
          </div>
        </div>

        {settleNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{settleNotice}</span>
          </div>
        )}
      </div>

      {/* CONSOLIDATED TREASURY SUMMARY WITH BASE CURRENCY TOGGLE */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
              Consolidated Networth View
            </span>
            <div className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">
              {formatCurrency(convertUsdTo(totalGrossUsd, selectedBaseCurrency), selectedBaseCurrency)}
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Total lifetime platform revenue across all operational modules
            </span>
          </div>

          {/* 7 Currencies Base Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase sm:text-right">
              View Total In:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl">
              {(['NGN', 'USD', 'GBP', 'EUR', 'ETH', 'BAA', 'BTC'] as SupportedCurrency[]).map(code => (
                <button
                  key={code}
                  onClick={() => setSelectedBaseCurrency(code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    selectedBaseCurrency === code
                      ? 'bg-[#FFD700] text-black shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 7 CURRENCIES TREASURY CARDS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {([
            { code: 'NGN', amount: totalGrossUsd * 1550, color: '#00FF88' },
            { code: 'USD', amount: totalGrossUsd, color: '#38BDF8' },
            { code: 'GBP', amount: totalGrossUsd * 0.785, color: '#C084FC' },
            { code: 'EUR', amount: totalGrossUsd * 0.925, color: '#60A5FA' },
            { code: 'ETH', amount: totalGrossUsd * 0.0003205, color: '#A78BFA' },
            { code: 'BAA', amount: totalGrossUsd, color: '#FFD700' },
            { code: 'BTC', amount: totalGrossUsd * 0.00001048, color: '#F59E0B' }
          ] as { code: SupportedCurrency; amount: number; color: string }[]).map((curr) => {
            const info = CURRENCY_RATES[curr.code];
            const isSelected = selectedBaseCurrency === curr.code;

            return (
              <div
                key={curr.code}
                onClick={() => setSelectedBaseCurrency(curr.code)}
                className={`p-3.5 rounded-2xl border transition text-left cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 border-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.15)]'
                    : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">{info.name}</span>
                  <span className="text-xs font-bold" style={{ color: curr.color }}>{info.symbol}</span>
                </div>
                <div className="text-sm sm:text-base font-heading font-black text-white mt-1 truncate">
                  {formatCurrency(curr.amount, curr.code)}
                </div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                  1 USD = {curr.code === 'USD' ? '1.0' : curr.code === 'NGN' ? '₦1,550' : curr.code === 'BTC' ? '0.0000105 ₿' : curr.code === 'ETH' ? '0.00032 Ξ' : `${info.rateToUsd} ${curr.code}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* REVENUE BY SOURCE CHANNELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Academy & Course Enrollments',
            naira: '₦58,400,000',
            usd: '$37,677 USD',
            desc: 'Tuition fees settled via Paystack (Debit card, USSD, Nigerian bank transfer) and crypto.',
            color: '#00FF88'
          },
          {
            title: 'UADC DePIN Computing & Nodes',
            naira: '₦34,250,000',
            usd: '$22,096 USD',
            desc: 'Overnight phone entanglement validation, DeepSeek AI sharding, and edge compute revenue.',
            color: '#00D4FF'
          },
          {
            title: 'BAA Library Monograph Publishing',
            naira: '₦24,100,000',
            usd: '$15,548 USD',
            desc: 'EPUB, PDF downloads, and hardcover monograph orders across 25 master categories.',
            color: '#FFD700'
          },
          {
            title: '60/40 Prompt Marketplace Share',
            naira: '₦12,800,000',
            usd: '$8,258 USD',
            desc: '40% university royalty share on high-throughput autonomous prompt packages.',
            color: '#A78BFA'
          },
          {
            title: 'Base L2 Staking & Protocol Liquidity',
            naira: '₦8,900,000',
            usd: '$5,741 USD',
            desc: 'Smart contract validator fees and automated market maker trading fees.',
            color: '#F472B6'
          },
          {
            title: 'Soulbound NFT Certificates',
            naira: '₦4,400,000',
            usd: '$2,838 USD',
            desc: 'On-chain graduation engraving and verifiable employer credential verification.',
            color: '#34D399'
          }
        ].map((channel, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase font-bold">{channel.title}</span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: channel.color }} />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-heading font-black text-white">
                {channel.naira}
              </div>
              <div className="text-xs font-mono text-[#FFD700]">
                {channel.usd}
              </div>
            </div>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              {channel.desc}
            </p>
          </div>
        ))}
      </div>

      {/* LIVE MULTI-CURRENCY TRANSACTION LEDGER */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-base font-heading font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD700]" />
              <span>Real-Time Multi-Currency Ledger</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Live settlement streams across Paystack, Base L2, Bitcoin Lightning &amp; Stripe Wire
            </p>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <div className="relative">
              <input
                type="text"
                placeholder="Search payer, TX..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-black border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
              {(['ALL', 'NGN', 'USD', 'BAA', 'BTC', 'ETH'] as ('ALL' | SupportedCurrency)[]).map(cur => (
                <button
                  key={cur}
                  onClick={() => setCurrencyFilter(cur)}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    currencyFilter === cur
                      ? 'bg-[#00FF88] text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left">
            <thead className="text-zinc-500 border-b border-zinc-800">
              <tr>
                <th className="py-2.5 px-3">TX / Time</th>
                <th className="py-2.5 px-3">Revenue Channel</th>
                <th className="py-2.5 px-3">Payer / Source</th>
                <th className="py-2.5 px-3">Currency &amp; Amount</th>
                <th className="py-2.5 px-3">USD Valuation</th>
                <th className="py-2.5 px-3">Gateway</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-zinc-900/40 transition">
                  <td className="py-3 px-3">
                    <div className="text-white font-bold">{tx.id}</div>
                    <div className="text-[10px] text-zinc-500">{tx.timestamp}</div>
                  </td>
                  <td className="py-3 px-3 text-zinc-300">
                    {tx.source}
                  </td>
                  <td className="py-3 px-3 text-zinc-400 max-w-xs truncate">
                    {tx.payer}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-[#00FF88]">
                      {formatCurrency(tx.amount, tx.currency)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-300 font-bold">
                    ${tx.usdEquivalent.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-black border border-zinc-800 text-[10px] text-zinc-300">
                      {tx.gateway}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      ✓ Settled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
