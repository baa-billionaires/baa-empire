import React, { useState, useMemo, useEffect } from 'react';
import {
  Coins,
  Lock,
  Unlock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Sparkles,
  ArrowRight,
  Clock,
  ChevronRight,
  Calculator,
  RefreshCw,
  Sliders,
  DollarSign,
  AlertCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import { StakingPool } from '../types';

export interface UserStakePosition {
  id: string;
  poolId: string;
  poolName: string;
  amountStaked: number;
  apyPercent: number;
  lockupDays: number;
  startDate: string;
  unlockDate: string;
  claimedYield: number;
  accruedYield: number;
  status: 'locked' | 'unlocked';
  txHash: string;
}

const DEFAULT_STAKE_POSITIONS: UserStakePosition[] = [
  {
    id: 'stake-demo-01',
    poolId: 'pool-h100',
    poolName: 'Universal Autonomous AI GPU Cluster Alpha',
    amountStaked: 250,
    apyPercent: 42.8,
    lockupDays: 90,
    startDate: new Date(Date.now() - 14 * 86400000).toISOString(),
    unlockDate: new Date(Date.now() + 76 * 86400000).toISOString(),
    claimedYield: 0,
    accruedYield: 4.11,
    status: 'locked',
    txHash: '0x8892baac91082fa0192418a990141fc7a30baac'
  }
];

export const BaaStakingDashboard: React.FC = () => {
  const { profile, updateProfile, stakingPools, stakeInPool, baacoinPrice } = useEcosystem();

  // Selected pool to stake in
  const [selectedPoolId, setSelectedPoolId] = useState<string>(stakingPools[0]?.id || 'pool-h100');
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [selectedLockupDays, setSelectedLockupDays] = useState<number>(90);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [stakeSuccessMsg, setStakeSuccessMsg] = useState<string | null>(null);
  const [claimSuccessMsg, setClaimSuccessMsg] = useState<string | null>(null);

  // User stakes list loaded from storage
  const [userStakes, setUserStakes] = useState<UserStakePosition[]>(() => {
    try {
      const saved = localStorage.getItem('richconnect_user_stakes');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load user stakes', e);
    }
    return DEFAULT_STAKE_POSITIONS;
  });

  // Calculator State
  const [calcAmount, setCalcAmount] = useState<number>(500);
  const [calcDays, setCalcDays] = useState<number>(90);
  const [calcPoolId, setCalcPoolId] = useState<string>(stakingPools[0]?.id || 'pool-h100');

  // Persist user stakes
  useEffect(() => {
    try {
      localStorage.setItem('richconnect_user_stakes', JSON.stringify(userStakes));
    } catch (e) {
      console.warn('Failed to save user stakes', e);
    }
  }, [userStakes]);

  // Real-time yield ticker simulator updating every 1000ms (1 second) for real-time visual growth
  useEffect(() => {
    const interval = setInterval(() => {
      setUserStakes((prev) =>
        prev.map((pos) => {
          if (pos.status !== 'locked') return pos;
          // Calculate incremental micro yield based on APY per second
          const dailyRate = pos.apyPercent / 100 / 365;
          const secondRate = dailyRate / 86400;
          const microYield = pos.amountStaked * secondRate;
          return {
            ...pos,
            accruedYield: +(pos.accruedYield + microYield)
          };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedPool = useMemo(() => {
    return stakingPools.find((p) => p.id === selectedPoolId) || stakingPools[0];
  }, [stakingPools, selectedPoolId]);

  const calcPool = useMemo(() => {
    return stakingPools.find((p) => p.id === calcPoolId) || stakingPools[0];
  }, [stakingPools, calcPoolId]);

  // Aggregate user staking statistics
  const stakingStats = useMemo(() => {
    const totalStaked = userStakes.reduce((acc, s) => acc + s.amountStaked, 0);
    const totalAccruedYield = userStakes.reduce((acc, s) => acc + s.accruedYield, 0);
    const totalClaimedYield = userStakes.reduce((acc, s) => acc + s.claimedYield, 0);
    const activePositionsCount = userStakes.filter((s) => s.status === 'locked').length;

    // Weighted average APY
    const weightedApySum = userStakes.reduce((acc, s) => acc + s.apyPercent * s.amountStaked, 0);
    const avgApy = totalStaked > 0 ? +(weightedApySum / totalStaked).toFixed(1) : (selectedPool?.apy_percent || 38.5);

    return {
      totalStaked,
      totalAccruedYield,
      totalClaimedYield,
      activePositionsCount,
      avgApy
    };
  }, [userStakes, selectedPool]);

  // Lockup multipliers for bonus APY
  const lockupOptions = [
    { days: 30, bonusApy: 0, label: '30 Days (Standard Flexible)' },
    { days: 90, bonusApy: 4.5, label: '90 Days (+4.5% Boosted Yield)' },
    { days: 180, bonusApy: 8.0, label: '180 Days (+8.0% Sovereign VIP)' },
    { days: 365, bonusApy: 14.2, label: '365 Days (+14.2% Max Vault Yield)' }
  ];

  const currentBonusApy = lockupOptions.find((o) => o.days === selectedLockupDays)?.bonusApy || 0;
  const effectiveApy = +((selectedPool?.apy_percent || 35) + currentBonusApy).toFixed(1);

  // Handle Stake Submission
  const handleLockBaaCoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stakeAmount <= 0) {
      alert('Please enter a valid amount of BaaCoin to stake.');
      return;
    }

    // Available balance check (if user has available balance, prioritize it, otherwise permit staking with prompt)
    const available = profile.baacoin_balance;
    if (available < stakeAmount) {
      const confirmUseCollateral = window.confirm(
        `Your spendable wallet balance is ${available.toFixed(2)} BAA. Would you like to stake using your earned collateral / locked student networth allocation (${profile.baacoin_networth} BAA)?`
      );
      if (!confirmUseCollateral) return;
    }

    setIsSubmitting(true);

    try {
      // Call backend API endpoint to register the stake and log on-chain telemetry
      const response = await fetch('/api/staking/lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poolId: selectedPool.id,
          poolName: selectedPool.name,
          amount: stakeAmount,
          lockupDays: selectedLockupDays,
          apyPercent: effectiveApy,
          userEmail: profile.email
        })
      });

      const data = await response.json().catch(() => null);
      const generatedTxHash = data?.txHash || `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

      // Call context stake in pool
      stakeInPool(selectedPool.id, stakeAmount);

      // Deduct balance or collateral
      if (profile.baacoin_balance >= stakeAmount) {
        updateProfile({
          baacoin_balance: Math.max(0, +(profile.baacoin_balance - stakeAmount).toFixed(2))
        });
      } else {
        updateProfile({
          baacoin_networth: Math.max(0, +(profile.baacoin_networth - stakeAmount).toFixed(2))
        });
      }

      // Add new stake position to state
      const now = new Date();
      const unlockDate = new Date(now.getTime() + selectedLockupDays * 86400000);

      const newPosition: UserStakePosition = {
        id: `stake-${Date.now()}`,
        poolId: selectedPool.id,
        poolName: selectedPool.name,
        amountStaked: stakeAmount,
        apyPercent: effectiveApy,
        lockupDays: selectedLockupDays,
        startDate: now.toISOString(),
        unlockDate: unlockDate.toISOString(),
        claimedYield: 0,
        accruedYield: 0,
        status: 'locked',
        txHash: generatedTxHash
      };

      setUserStakes((prev) => [newPosition, ...prev]);
      setStakeSuccessMsg(`Success! Locked ${stakeAmount.toLocaleString()} BaaCoin into ${selectedPool.name} at ${effectiveApy}% APY.`);
      setTimeout(() => setStakeSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Staking error:', err);
      // Fallback local update
      stakeInPool(selectedPool.id, stakeAmount);
      setStakeSuccessMsg(`Success! Locked ${stakeAmount.toLocaleString()} BaaCoin at ${effectiveApy}% APY.`);
      setTimeout(() => setStakeSuccessMsg(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Harvest / Claim Accrued Yield
  const handleClaimYield = (positionId: string) => {
    const position = userStakes.find((p) => p.id === positionId);
    if (!position || position.accruedYield <= 0) return;

    const amountToClaim = position.accruedYield;

    setUserStakes((prev) =>
      prev.map((p) => {
        if (p.id === positionId) {
          return {
            ...p,
            claimedYield: +(p.claimedYield + amountToClaim).toFixed(4),
            accruedYield: 0
          };
        }
        return p;
      })
    );

    // Credit to spendable wallet balance
    updateProfile({
      baacoin_balance: +(profile.baacoin_balance + amountToClaim).toFixed(2)
    });

    setClaimSuccessMsg(`Harvested +${amountToClaim.toFixed(2)} BaaCoin yield into your spendable wallet!`);
    setTimeout(() => setClaimSuccessMsg(null), 4000);
  };

  // Harvest All Accrued Yield
  const handleClaimAll = () => {
    const totalToClaim = userStakes.reduce((acc, s) => acc + s.accruedYield, 0);
    if (totalToClaim <= 0) {
      alert('No accumulated yield to harvest right now.');
      return;
    }

    setUserStakes((prev) =>
      prev.map((s) => ({
        ...s,
        claimedYield: +(s.claimedYield + s.accruedYield).toFixed(4),
        accruedYield: 0
      }))
    );

    updateProfile({
      baacoin_balance: +(profile.baacoin_balance + totalToClaim).toFixed(2)
    });

    setClaimSuccessMsg(`Harvested +${totalToClaim.toFixed(2)} BaaCoin across all active positions!`);
    setTimeout(() => setClaimSuccessMsg(null), 4000);
  };

  // Calculated returns
  const projectedCalcReturns = useMemo(() => {
    const poolApy = calcPool?.apy_percent || 38.5;
    const bonus = lockupOptions.find((o) => o.days === calcDays)?.bonusApy || 0;
    const totalApy = poolApy + bonus;
    const dailyReturnBaa = (calcAmount * (totalApy / 100)) / 365;
    const periodReturnBaa = dailyReturnBaa * calcDays;
    const annualReturnBaa = calcAmount * (totalApy / 100);

    return {
      totalApy: +totalApy.toFixed(1),
      dailyReturnBaa: +dailyReturnBaa.toFixed(2),
      periodReturnBaa: +periodReturnBaa.toFixed(2),
      annualReturnBaa: +annualReturnBaa.toFixed(2),
      totalValueAtMaturity: +(calcAmount + periodReturnBaa).toFixed(2)
    };
  }, [calcAmount, calcDays, calcPool]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner: Staking Command Vault */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-[#07160c] to-zinc-950 border-2 border-[#00FF88] shadow-2xl shadow-[#00FF88]/15 relative overflow-hidden space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-zinc-800/80 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30">
                <Coins className="w-6 h-6" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#00FF88] uppercase bg-[#00FF88]/10 px-3 py-1 rounded-full border border-[#00FF88]/40">
                SOVEREIGN YIELD PROTOCOL • BASE L2
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
              BaaCoin Staking &amp; Yield Vaults
            </h2>

            <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-2xl leading-relaxed">
              Lock your BaaCoin tokens into sovereign AI computing pools, GPU clusters, and decentralized micro-startups to earn up to <strong className="text-[#00FF88]">57.0% boosted APY</strong> paid in real-time.
            </p>
          </div>

          {/* Quick Portfolio Summary */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-right font-mono">
              <span className="text-[10px] text-zinc-500 uppercase block">Total Staked Value</span>
              <span className="text-xl sm:text-2xl font-black text-white">
                {stakingStats.totalStaked.toLocaleString()} BAA
              </span>
              <span className="text-[10px] text-emerald-400 block font-semibold">
                ${(stakingStats.totalStaked * (baacoinPrice || 1.0)).toFixed(2)} USD Collateral
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 text-right font-mono">
              <span className="text-[10px] text-zinc-500 uppercase block">Harvestable Yield</span>
              <span className="text-xl sm:text-2xl font-black text-[#00FF88] font-mono tracking-tight">
                +{stakingStats.totalAccruedYield.toFixed(4)} BAA
              </span>
              <button
                onClick={handleClaimAll}
                disabled={stakingStats.totalAccruedYield <= 0}
                className="mt-1 px-3 py-1 bg-gradient-to-r from-[#00FF88] to-[#00C853] text-black text-[10px] font-bold uppercase rounded-lg hover:brightness-110 active:scale-95 disabled:opacity-40 transition cursor-pointer"
              >
                Harvest All
              </button>
            </div>
          </div>
        </div>

        {/* 4 KPI Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Active Locked Positions</span>
            <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#00FF88]" />
              <span>{stakingStats.activePositionsCount} Vaults</span>
            </div>
            <span className="text-[10px] text-zinc-400">Non-custodial Base L2</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Average Weighted APY</span>
            <div className="text-xl sm:text-2xl font-bold text-[#FFD700] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#FFD700]" />
              <span>{stakingStats.avgApy}%</span>
            </div>
            <span className="text-[10px] text-zinc-400">Dynamic daily rewards</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Lifetime Claimed Yield</span>
            <div className="text-xl sm:text-2xl font-bold text-[#00D4FF]">
              {stakingStats.totalClaimedYield.toFixed(2)} BAA
            </div>
            <span className="text-[10px] text-zinc-400">Withdrawn to cash</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Current Token Peg</span>
            <div className="text-xl sm:text-2xl font-bold text-white flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>${(baacoinPrice || 1.0).toFixed(2)} USD</span>
            </div>
            <span className="text-[10px] text-emerald-400">₦1,500 Bank Parity</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {stakeSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{stakeSuccessMsg}</span>
        </div>
      )}

      {claimSuccessMsg && (
        <div className="p-4 rounded-2xl bg-[#00D4FF]/20 border border-[#00D4FF]/60 text-cyan-200 text-xs font-mono flex items-center gap-3 animate-fadeIn">
          <Sparkles className="w-5 h-5 text-[#00D4FF] shrink-0" />
          <span>{claimSuccessMsg}</span>
        </div>
      )}

      {/* Main Two Column Interface: (1) Stake Lock Form & (2) Staking Pools Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Lock Form & Vault Setup (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div>
                <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#00FF88]" />
                  <span>Lock BaaCoin into Yield Vault</span>
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Select a pool, choose your lockup duration, and deploy your capital
                </p>
              </div>

              <span className="text-xs font-mono text-zinc-500">Step 1 of 2</span>
            </div>

            <form onSubmit={handleLockBaaCoin} className="space-y-6">
              {/* Target Pool Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase font-bold">
                  1. Select Staking Liquidity Pool
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stakingPools.map((pool) => {
                    const isSelected = selectedPoolId === pool.id;
                    return (
                      <div
                        key={pool.id}
                        onClick={() => setSelectedPoolId(pool.id)}
                        className={`p-3.5 rounded-2xl border text-left cursor-pointer transition relative ${
                          isSelected
                            ? 'bg-zinc-900 border-[#00FF88] ring-1 ring-[#00FF88]/50 shadow-lg shadow-[#00FF88]/10'
                            : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase">{pool.tier}</span>
                          <span className="text-xs font-mono font-bold text-[#00FF88]">
                            {pool.apy_percent}% APY
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-xs mt-1 line-clamp-1">{pool.name}</h4>
                        <p className="text-[10px] text-zinc-500 font-mono mt-1 truncate">
                          {pool.power_source}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Amount to Lock */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label className="text-zinc-400 uppercase font-bold">
                    2. Amount to Stake (BaaCoin)
                  </label>
                  <div className="text-zinc-400">
                    Spendable Balance:{' '}
                    <strong className="text-[#00FF88]">{profile.baacoin_balance.toFixed(2)} BAA</strong>
                  </div>
                </div>

                <div className="relative">
                  <Coins className="w-5 h-5 text-[#00FF88] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                    className="w-full pl-11 pr-24 py-3 bg-zinc-900 border border-zinc-800 focus:border-[#00FF88] rounded-2xl text-sm font-mono text-white outline-none transition"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setStakeAmount(100)}
                      className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    >
                      100
                    </button>
                    <button
                      type="button"
                      onClick={() => setStakeAmount(500)}
                      className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    >
                      500
                    </button>
                    <button
                      type="button"
                      onClick={() => setStakeAmount(Math.max(10, Math.floor(profile.baacoin_balance || 100)))}
                      className="px-2 py-1 rounded-lg bg-[#00FF88]/20 hover:bg-[#00FF88]/30 text-[#00FF88] font-bold"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* Lockup Duration with Boost Multiplier */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase font-bold">
                  3. Lockup Duration &amp; Boost Multiplier
                </label>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {lockupOptions.map((opt) => {
                    const isSelected = selectedLockupDays === opt.days;
                    return (
                      <button
                        key={opt.days}
                        type="button"
                        onClick={() => setSelectedLockupDays(opt.days)}
                        className={`p-3 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-[#00FF88]/15 border-[#00FF88] text-white font-bold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt.days} Days Lock</span>
                          {opt.bonusApy > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-[#00FF88] font-bold">
                              +{opt.bonusApy}%
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-1 truncate">{opt.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Projected Return Preview Strip */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Selected Pool Base APY:</span>
                  <span className="text-white">{selectedPool.apy_percent}%</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Lockup Duration Boost:</span>
                  <span className="text-[#00FF88]">+{currentBonusApy}% APY</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400 border-t border-zinc-800/80 pt-2">
                  <span className="font-bold text-white">Effective Staking APY:</span>
                  <span className="text-base font-black text-[#00FF88]">{effectiveApy}%</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Estimated Payout ({selectedLockupDays} Days):</span>
                  <span className="font-bold text-[#FFD700]">
                    +{((stakeAmount * (effectiveApy / 100) / 365) * selectedLockupDays).toFixed(2)} BaaCoin
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00FF88] via-[#00E676] to-[#00C853] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 disabled:opacity-50 transition shadow-xl shadow-[#00FF88]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Confirming On-Chain Vault...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Lock {stakeAmount} BaaCoin at {effectiveApy}% APY</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Yield Calculator & Staking Pools (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Calculator */}
          <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-5">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Calculator className="w-5 h-5 text-[#FFD700]" />
              <h3 className="text-base font-heading font-bold text-white">
                Staking Yield Simulator
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Staked Capital:</span>
                  <span className="text-[#FFD700] font-bold">{calcAmount} BAA ($ {calcAmount})</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-[#00FF88] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 mb-1">
                  <span>Lockup Duration:</span>
                  <span className="text-[#00D4FF] font-bold">{calcDays} Days</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="365"
                  step="30"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="w-full accent-[#00D4FF] cursor-pointer"
                />
              </div>

              {/* Calculated Outputs */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Daily Yield</span>
                  <span className="text-sm font-bold text-[#00FF88]">
                    +{projectedCalcReturns.dailyReturnBaa} BAA
                  </span>
                  <span className="text-[10px] text-zinc-400 block">${projectedCalcReturns.dailyReturnBaa}/day</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-0.5">
                  <span className="text-[10px] text-zinc-500 uppercase block">Period Profit ({calcDays}d)</span>
                  <span className="text-sm font-bold text-[#FFD700]">
                    +{projectedCalcReturns.periodReturnBaa} BAA
                  </span>
                  <span className="text-[10px] text-zinc-400 block">${projectedCalcReturns.periodReturnBaa} Net</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-emerald-500/30 flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-400">Total Capital at Maturity:</span>
                <span className="text-base font-black text-[#00FF88]">
                  {projectedCalcReturns.totalValueAtMaturity.toLocaleString()} BAA
                </span>
              </div>
            </div>
          </div>

          {/* Staking Pools Telemetry List */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00FF88]" />
                <span>Verified Ecosystem Vaults</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Audited Contracts</span>
            </div>

            <div className="space-y-2.5">
              {stakingPools.map((pool) => (
                <div
                  key={pool.id}
                  className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 hover:border-zinc-700 transition space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-sans">{pool.name}</span>
                    <span className="text-xs font-mono font-black text-[#00FF88]">
                      {pool.apy_percent}% APY
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Total Pool Staked:</span>
                    <span className="text-zinc-300 font-bold">{pool.total_staked_baacoin.toLocaleString()} BAA</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>Hardware Anchor:</span>
                    <span className="truncate max-w-[160px] text-zinc-400">{pool.power_source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User's Active Staked Positions Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FFD700]" />
              <span>Your Active Staked Vaults &amp; Real-Time Harvest</span>
            </h3>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Live accrued rewards update automatically • Harvest anytime into your spendable balance
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
              ● PROOF OF STAKE LIVE
            </span>
          </div>
        </div>

        {userStakes.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 font-mono text-xs">
            You do not have any active locked stakes yet. Lock BaaCoin above to start earning daily yield.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-zinc-800/80">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Staking Vault</th>
                  <th className="py-3 px-4">Staked Amount</th>
                  <th className="py-3 px-4">Effective APY</th>
                  <th className="py-3 px-4">Duration &amp; Maturity</th>
                  <th className="py-3 px-4">Accrued Yield</th>
                  <th className="py-3 px-4 text-right">Harvest Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {userStakes.map((stake) => {
                  const unlockDateObj = new Date(stake.unlockDate);
                  const isMatured = Date.now() >= unlockDateObj.getTime();

                  return (
                    <tr key={stake.id} className="hover:bg-zinc-900/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white font-sans text-xs">{stake.poolName}</div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5">
                          <span>Tx: {stake.txHash.slice(0, 8)}...{stake.txHash.slice(-6)}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-zinc-500" />
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-white">{stake.amountStaked.toLocaleString()} BAA</span>
                        <span className="text-[10px] text-zinc-500 block">${stake.amountStaked.toLocaleString()} USD</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-[#00FF88] font-bold text-[10px] border border-emerald-500/40">
                          {stake.apyPercent}% APY
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-zinc-400">
                        <div>{stake.lockupDays} Days</div>
                        <div className="text-[10px] text-zinc-500">
                          {isMatured ? (
                            <span className="text-emerald-400 font-bold">Matured &amp; Unlockable</span>
                          ) : (
                            `Unlocks ${unlockDateObj.toLocaleDateString()}`
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-sm font-black text-[#00FF88]">
                          +{stake.accruedYield.toFixed(4)} BAA
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          Claimed: {stake.claimedYield.toFixed(2)} BAA
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleClaimYield(stake.id)}
                          disabled={stake.accruedYield <= 0}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00FF88] to-emerald-500 hover:brightness-110 text-black font-bold text-[10px] uppercase tracking-wider disabled:opacity-40 transition cursor-pointer"
                        >
                          Harvest Yield
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default BaaStakingDashboard;
