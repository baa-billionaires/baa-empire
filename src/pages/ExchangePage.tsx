import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { StakingPool } from '../types';
import {
  TrendingUp,
  Coins,
  ArrowRightLeft,
  Flame,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Unlock,
  CheckCircle,
  ExternalLink,
  DollarSign,
  BarChart3,
  Layers,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

export const ExchangePage: React.FC = () => {
  const { baacoinPrice, baacoinPriceChange, stakingPools, stakeInPool, profile, wallet } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'swap' | 'pools' | 'ratchet'>('swap');
  const [fromAmount, setFromAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<'BAA' | 'USDT' | 'ETH' | 'NGN'>('USDT');
  const [toCurrency, setToCurrency] = useState<'BAA' | 'USDT' | 'ETH' | 'NGN'>('BAA');
  const [swapSuccessMessage, setSwapSuccessMessage] = useState<string | null>(null);

  // Staking Modal State
  const [selectedPoolForStake, setSelectedPoolForStake] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [stakeSuccessMessage, setStakeSuccessMessage] = useState<string | null>(null);

  // Simulated Order Book State
  const [orderBook, setOrderBook] = useState({
    asks: [
      { price: (baacoinPrice + 0.03).toFixed(4), amount: 14500, total: 14935 },
      { price: (baacoinPrice + 0.02).toFixed(4), amount: 28900, total: 29478 },
      { price: (baacoinPrice + 0.01).toFixed(4), amount: 54100, total: 54641 },
      { price: (baacoinPrice + 0.005).toFixed(4), amount: 92300, total: 92761 }
    ],
    bids: [
      { price: (baacoinPrice || 1.02).toFixed(4), amount: 120500, total: 122910 },
      { price: (baacoinPrice - 0.005).toFixed(4), amount: 84000, total: 85260 },
      { price: (baacoinPrice - 0.01).toFixed(4), amount: 165000, total: 166650 },
      { price: (baacoinPrice - 0.02).toFixed(4), amount: 310000, total: 310000 }
    ]
  });

  // Calculate swap output
  const calculateSwapResult = () => {
    const num = parseFloat(fromAmount) || 0;
    const currentPrice = baacoinPrice || 1.02;

    if (fromCurrency === 'USDT' && toCurrency === 'BAA') {
      return (num / currentPrice).toFixed(2);
    }
    if (fromCurrency === 'BAA' && toCurrency === 'USDT') {
      return (num * currentPrice).toFixed(2);
    }
    if (fromCurrency === 'NGN' && toCurrency === 'BAA') {
      return (num / (currentPrice * 1500)).toFixed(2);
    }
    if (fromCurrency === 'BAA' && toCurrency === 'NGN') {
      return (num * currentPrice * 1500).toLocaleString();
    }
    if (fromCurrency === 'ETH' && toCurrency === 'BAA') {
      return ((num * 3400) / currentPrice).toFixed(2);
    }
    return (num).toFixed(2);
  };

  const handleExecuteSwap = () => {
    setSwapSuccessMessage(`Successfully swapped ${fromAmount} ${fromCurrency} for ${calculateSwapResult()} ${toCurrency}! Base L2 Transaction finalized.`);
    setTimeout(() => setSwapSuccessMessage(null), 4000);
  };

  const handleStakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPoolForStake || stakeAmount <= 0) return;

    const res = stakeInPool(selectedPoolForStake.id, stakeAmount);
    setStakeSuccessMessage(res.message);
    setSelectedPoolForStake(null);
    setTimeout(() => setStakeSuccessMessage(null), 4500);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {(swapSuccessMessage || stakeSuccessMessage) && (
        <div className="fixed top-24 right-6 z-50 max-w-md bg-emerald-950 border border-emerald-500 rounded-2xl p-4 shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-emerald-200 font-mono">{swapSuccessMessage || stakeSuccessMessage}</p>
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-zinc-800 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold uppercase mb-3">
            <Coins className="w-3.5 h-3.5" />
            Sovereign Liquidity &amp; Compute Yield
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
            💱 BaaCoin Exchange &amp; DeFi Investment Pools
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            Pegged at a <span className="text-white font-bold">$1.00 USD baseline</span> with our world-first <span className="text-emerald-400 font-bold">Perpetual Scarcity Burn &amp; Buyback Ratchet</span>. 25% of all ecosystem revenues across 11 platforms auto-purchase and burn $BAA, causing relentless upward momentum.
          </p>
        </div>

        {/* Live Ratchet Price Pill */}
        <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 p-4 rounded-3xl shrink-0 font-mono">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">BAACOIN SPOT</span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black text-[#FFD700]">
                ${(baacoinPrice || 1.02).toFixed(4)}
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                {baacoinPriceChange || '+12.4%'}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Base L2: 0x8892...BaaC</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Tabs */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl w-fit text-xs font-mono">
          <button
            onClick={() => setActiveTab('swap')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'swap' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Trading Terminal &amp; Swap</span>
          </button>

          <button
            onClick={() => setActiveTab('pools')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'pools' ? 'bg-[#00D4FF] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>GPU Compute Staking (Up to 42.8% APY)</span>
          </button>

          <button
            onClick={() => setActiveTab('ratchet')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'ratchet' ? 'bg-emerald-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Why BAA Only Goes Up (Ratchet Protocol)</span>
          </button>
        </div>

        {/* TAB 1: SWAP & TRADING TERMINAL */}
        {activeTab === 'swap' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Instant Swap Box */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-[#FFD700]" />
                  Instant Sovereign Swap
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Zero Slippage Guarantee
                </span>
              </div>

              {/* From Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>YOU PAY</span>
                  <span>Wallet: {profile.baacoin_balance} BAA Available</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-2xl p-3">
                  <input
                    type="number"
                    min="1"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="w-full bg-transparent text-xl font-bold font-mono text-white focus:outline-none"
                  />
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value as any)}
                    className="bg-black border border-zinc-700 text-xs font-mono font-bold text-white px-3 py-2 rounded-xl focus:outline-none"
                  >
                    <option value="USDT">USDT</option>
                    <option value="BAA">BAA</option>
                    <option value="NGN">NGN (₦)</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div>

              {/* Switch Arrow */}
              <div className="flex justify-center -my-2">
                <button
                  onClick={() => {
                    const temp = fromCurrency;
                    setFromCurrency(toCurrency);
                    setToCurrency(temp);
                  }}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:border-[#FFD700] transition text-zinc-300"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 rotate-90" />
                </button>
              </div>

              {/* To Output */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>YOU RECEIVE (ESTIMATED)</span>
                  <span>Peg: $1.00 USD Base</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-2xl p-3">
                  <div className="w-full text-xl font-bold font-mono text-emerald-400">
                    {calculateSwapResult()}
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value as any)}
                    className="bg-black border border-zinc-700 text-xs font-mono font-bold text-white px-3 py-2 rounded-xl focus:outline-none"
                  >
                    <option value="BAA">BAA</option>
                    <option value="USDT">USDT</option>
                    <option value="NGN">NGN (₦)</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div>

              {/* Swap Details */}
              <div className="p-3 bg-black/60 rounded-xl border border-zinc-800/80 font-mono text-[11px] space-y-1.5 text-zinc-400">
                <div className="flex justify-between">
                  <span>Exchange Rate</span>
                  <span className="text-white">1 BAA = ${(baacoinPrice || 1.02).toFixed(4)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Base L2 Gas Fee</span>
                  <span className="text-emerald-400">&lt; $0.01 (Sub-Cent)</span>
                </div>
                <div className="flex justify-between">
                  <span>Routing Protocol</span>
                  <span className="text-white">Uniswap V3 + BaaCoin Sovereign Pool</span>
                </div>
              </div>

              <button
                onClick={handleExecuteSwap}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#F3C200] to-[#E5A800] text-black font-heading font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
              >
                Execute 1-Click Swap
              </button>
            </div>

            {/* Right: Live Candlestick Simulation & Order Book */}
            <div className="lg:col-span-7 space-y-6">
              {/* Chart Container */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white font-mono">BAA / USDT</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">+12.4% 24h</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-mono">
                    <span className="px-2 py-1 rounded bg-zinc-900 text-white font-bold">24H</span>
                    <span className="px-2 py-1 rounded text-zinc-500 hover:text-white cursor-pointer">7D</span>
                    <span className="px-2 py-1 rounded text-zinc-500 hover:text-white cursor-pointer">30D</span>
                    <span className="px-2 py-1 rounded text-zinc-500 hover:text-white cursor-pointer">ALL</span>
                  </div>
                </div>

                {/* SVG Price Chart */}
                <div className="h-44 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,130 Q50,125 100,120 T200,90 T300,75 T400,45 T500,20 L500,150 L0,150 Z"
                      fill="url(#chartGrad)"
                    />
                    <path
                      d="M0,130 Q50,125 100,120 T200,90 T300,75 T400,45 T500,20"
                      fill="none"
                      stroke="#00FF88"
                      strokeWidth="3"
                    />
                  </svg>
                  <div className="absolute top-2 right-2 text-right font-mono">
                    <span className="text-[10px] text-zinc-500 block">PERPETUAL ALL-TIME HIGH</span>
                    <span className="text-sm font-bold text-emerald-400">${(baacoinPrice || 1.02).toFixed(4)}</span>
                  </div>
                </div>
              </div>

              {/* Order Book Depth Ladder */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3 text-xs font-mono">
                  <span className="font-bold text-white">Live Sovereign Order Book</span>
                  <span className="text-zinc-500">2,400+ Node Bids</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                  {/* Asks (Sell) */}
                  <div className="space-y-1">
                    <span className="text-rose-400 text-[10px] font-bold block mb-1">ASKS (SELL ORDERS)</span>
                    {orderBook.asks.map((ask, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-400">
                        <span className="text-rose-400">${ask.price}</span>
                        <span>{ask.amount.toLocaleString()} BAA</span>
                      </div>
                    ))}
                  </div>

                  {/* Bids (Buy) */}
                  <div className="space-y-1">
                    <span className="text-emerald-400 text-[10px] font-bold block mb-1">BIDS (BUY ORDERS)</span>
                    {orderBook.bids.map((bid, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-400">
                        <span className="text-emerald-400">${bid.price}</span>
                        <span>{bid.amount.toLocaleString()} BAA</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GPU COMPUTE STAKING POOLS */}
        {activeTab === 'pools' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-black text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#00D4FF]" />
                  Autonomous AI GPU Staking Pools (Powered by UAIDC)
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Stake your BaaCoin to power decentralized African GPU clusters. Earn daily yields funded by enterprise compute clients.
                </p>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="text-zinc-500 block">TOTAL VALUE STAKED</span>
                <span className="text-base font-bold text-[#FFD700]">1,455,000 BAA ($1.48M USD)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stakingPools.map(pool => (
                <div
                  key={pool.id}
                  className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 flex flex-col justify-between space-y-5 hover:border-zinc-700 transition"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {pool.tier}
                      </span>
                      <div className="text-right font-mono">
                        <span className="text-xs text-zinc-500 block">APY</span>
                        <span className="text-xl font-black text-emerald-400">{pool.apy_percent}%</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">{pool.name}</h3>

                    <p className="text-xs text-zinc-400 font-mono">
                      Power Source: <span className="text-zinc-200">{pool.power_source}</span>
                    </p>

                    <div className="p-3 bg-zinc-900/80 rounded-2xl border border-zinc-800 font-mono text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Lockup Period:</span>
                        <span className="text-white font-bold">{pool.lockup_days} Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Total Staked:</span>
                        <span className="text-[#FFD700] font-bold">{pool.total_staked_baacoin.toLocaleString()} BAA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Daily Pool Yield:</span>
                        <span className="text-emerald-400 font-bold">${pool.daily_yield_usd}/day</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPoolForStake(pool)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/20"
                  >
                    Stake In Pool ({pool.apy_percent}% APY)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WHY BAA ONLY GOES UP (THE VALUE RATChET) */}
        {activeTab === 'ratchet' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-[#FFD700] font-bold uppercase tracking-widest block">
                WORLD-FIRST ECONOMIC INNOVATION
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
                The Perpetual Scarcity Burn &amp; Buyback Ratchet
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Most cryptocurrencies dump because they rely on speculative hype. <span className="text-[#FFD700] font-bold">BaaCoin is engineered differently: It is pegged to $1.00 USD baseline, but structurally impossible to drop below $1.00</span> because of a hard mathematical floor enforced by 11 revenue-generating businesses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center font-bold font-mono">
                  25%
                </div>
                <h4 className="text-base font-bold text-white">Automatic Revenue Buybacks</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Every time a client pays Automode AI ($29/mo), Autostack AI, or WorkOS microservices, 25% of net profit executes an autonomous buy order on Uniswap and burns the tokens forever.
                </p>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                  10x
                </div>
                <h4 className="text-base font-bold text-white">Tuition Capital Lockup</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Student 10x tuition bonuses ($990 BaaCoin) are locked cryptographically in smart contracts until graduation, preventing massive sell dumps and establishing huge illiquid demand.
                </p>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center font-bold font-mono">
                  P2P
                </div>
                <h4 className="text-base font-bold text-white">Paystack Naira Guarantee</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  In Nigeria, students and merchants can redeem 1 BAA for ₦1,500 instantaneously into any Nigerian bank account via our Paystack-backed liquidity reserve.
                </p>
              </div>
            </div>

            {/* CEX / DEX Listing Bridge */}
            <div className="pt-6 border-t border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white font-mono">Global Exchange Bridge Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">BINANCE FAST-TRACK</span>
                    <span className="text-white font-bold">Smart Contract Audited</span>
                  </div>
                  <span className="text-emerald-400 font-bold">● Tier 1 Ready</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">UNISWAP V3 BASE L2</span>
                    <span className="text-white font-bold">Pool 0x8892...BaaC</span>
                  </div>
                  <span className="text-emerald-400 font-bold">● Active</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 block text-[10px]">KUCOIN EXCHANGE</span>
                    <span className="text-white font-bold">Integration Stage 3</span>
                  </div>
                  <span className="text-[#00D4FF] font-bold">● Synced</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Staking Action Modal */}
      {selectedPoolForStake && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Stake in {selectedPoolForStake.name}</h3>
                <span className="text-xs font-mono text-emerald-400">{selectedPoolForStake.apy_percent}% APY • {selectedPoolForStake.lockup_days} Days Lock</span>
              </div>
              <button
                onClick={() => setSelectedPoolForStake(null)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStakeSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">STAKE AMOUNT (BAACOIN)</label>
                <input
                  type="number"
                  min="10"
                  max={profile.baacoin_balance || 1000}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#00D4FF] text-base font-bold"
                />
                <span className="text-[10px] text-zinc-500 mt-1 block">
                  Available in wallet: {profile.baacoin_balance} BAA
                </span>
              </div>

              <div className="p-3 bg-zinc-900 rounded-xl space-y-1 text-zinc-300">
                <div className="flex justify-between">
                  <span>Estimated Daily Yield:</span>
                  <span className="text-emerald-400 font-bold">
                    +${((stakeAmount * (selectedPoolForStake.apy_percent / 100)) / 365).toFixed(2)} / day
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total Return:</span>
                  <span className="text-white font-bold">
                    +{(stakeAmount * (selectedPoolForStake.apy_percent / 100) * (selectedPoolForStake.lockup_days / 365)).toFixed(1)} BAA
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition"
              >
                Confirm Lock &amp; Start Yield
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
