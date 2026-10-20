import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Cpu,
  Coins,
  ShieldCheck,
  Zap,
  Flame,
  ArrowUpRight,
  Filter,
  UserCheck,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  city: string;
  country: string;
  vaultSizeGB: number;
  computeStakeUSD: number;
  totalDividendsUSD: number;
  dailyVelocityUSD: number;
  badge: string;
  isCurrentUser?: boolean;
}

const TOP_10_BILLIONAIRES: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Dr. Ifeanyi Okonjo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    city: 'Port Harcourt',
    country: 'Nigeria',
    vaultSizeGB: 34.2,
    computeStakeUSD: 8500,
    totalDividendsUSD: 24890.40,
    dailyVelocityUSD: 48.20,
    badge: '👑 Sovereign Apex Whale'
  },
  {
    rank: 2,
    name: 'Fatima Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    city: 'Lagos',
    country: 'Nigeria',
    vaultSizeGB: 28.5,
    computeStakeUSD: 6400,
    totalDividendsUSD: 19420.15,
    dailyVelocityUSD: 39.50,
    badge: '⚡ AI Mesh Empress'
  },
  {
    rank: 3,
    name: 'Tunde Bakare',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    city: 'Ibadan',
    country: 'Nigeria',
    vaultSizeGB: 22.0,
    computeStakeUSD: 5200,
    totalDividendsUSD: 16810.00,
    dailyVelocityUSD: 33.10,
    badge: '🏆 High-Yield Pioneer'
  },
  {
    rank: 4,
    name: 'Chioma Adeyemi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    city: 'Enugu',
    country: 'Nigeria',
    vaultSizeGB: 19.4,
    computeStakeUSD: 4800,
    totalDividendsUSD: 14250.80,
    dailyVelocityUSD: 28.90,
    badge: '⭐ Auditor Champion'
  },
  {
    rank: 5,
    name: 'Kwame Mensah',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    city: 'Accra',
    country: 'Ghana',
    vaultSizeGB: 17.6,
    computeStakeUSD: 4100,
    totalDividendsUSD: 12980.50,
    dailyVelocityUSD: 24.60,
    badge: '💎 Gold Node Master'
  },
  {
    rank: 6,
    name: 'Zola Mthembu',
    avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80',
    city: 'Johannesburg',
    country: 'South Africa',
    vaultSizeGB: 16.0,
    computeStakeUSD: 3900,
    totalDividendsUSD: 11430.20,
    dailyVelocityUSD: 21.80,
    badge: '🔥 Solar Edge Miner'
  },
  {
    rank: 7,
    name: 'Amina Bello',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    city: 'Abuja',
    country: 'Nigeria',
    vaultSizeGB: 14.8,
    computeStakeUSD: 3500,
    totalDividendsUSD: 9840.90,
    dailyVelocityUSD: 18.70,
    badge: '🛰️ Swarm Commander'
  },
  {
    rank: 8,
    name: 'Tariq Sterling (You)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    city: 'Lagos / London',
    country: 'UK / NG',
    vaultSizeGB: 13.5,
    computeStakeUSD: 3100,
    totalDividendsUSD: 8910.30,
    dailyVelocityUSD: 16.40,
    badge: '🚀 Verified Prodigy',
    isCurrentUser: true
  },
  {
    rank: 9,
    name: 'Nneka Eze',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    city: 'Kano',
    country: 'Nigeria',
    vaultSizeGB: 11.2,
    computeStakeUSD: 2800,
    totalDividendsUSD: 7620.00,
    dailyVelocityUSD: 14.20,
    badge: '🔮 Algorithm Staker'
  },
  {
    rank: 10,
    name: 'David Adeleke',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    city: 'Calabar',
    country: 'Nigeria',
    vaultSizeGB: 9.8,
    computeStakeUSD: 2400,
    totalDividendsUSD: 6480.75,
    dailyVelocityUSD: 12.10,
    badge: '🛡️ Mesh Operator'
  }
];

export const UADCLeaderboard: React.FC = () => {
  const [sortBy, setSortBy] = useState<'dividends' | 'stake' | 'vault'>('dividends');

  const sortedUsers = [...TOP_10_BILLIONAIRES].sort((a, b) => {
    if (sortBy === 'dividends') return b.totalDividendsUSD - a.totalDividendsUSD;
    if (sortBy === 'stake') return b.computeStakeUSD - a.computeStakeUSD;
    return b.vaultSizeGB - a.vaultSizeGB;
  });

  return (
    <div className="bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
      {/* Background Neon Halo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00FF88]/15 via-[#FFD700]/10 to-transparent rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#FFD700]" />
            <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
              REAL-TIME ON-CHAIN CONSENSUS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
            Top Billionaires UADC Earnings Leaderboard
          </h2>
          <p className="text-xs text-zinc-400 font-sans">
            Ranked by total data dividend mining yields and compute stake values across the Universal Autonomous Data Center.
          </p>
        </div>

        {/* Sort Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono">
          <button
            onClick={() => setSortBy('dividends')}
            className={`px-3 py-1.5 rounded-lg transition ${
              sortBy === 'dividends'
                ? 'bg-[#00FF88] text-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Total Mined
          </button>
          <button
            onClick={() => setSortBy('stake')}
            className={`px-3 py-1.5 rounded-lg transition ${
              sortBy === 'stake'
                ? 'bg-[#FFD700] text-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Compute Stake
          </button>
          <button
            onClick={() => setSortBy('vault')}
            className={`px-3 py-1.5 rounded-lg transition ${
              sortBy === 'vault'
                ? 'bg-[#00D4FF] text-black font-bold'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Data Vault
          </button>
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-wider">
              <th className="pb-3 pl-2">Rank</th>
              <th className="pb-3">Shareholder</th>
              <th className="pb-3">Location</th>
              <th className="pb-3">Data Vault</th>
              <th className="pb-3">Compute Staked</th>
              <th className="pb-3 text-right">Daily Yield</th>
              <th className="pb-3 pr-2 text-right">Total Mined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {sortedUsers.map((user, idx) => {
              const isTop3 = idx < 3;
              return (
                <tr
                  key={user.rank}
                  className={`transition-colors ${
                    user.isCurrentUser
                      ? 'bg-gradient-to-r from-[#00FF88]/15 via-zinc-900/60 to-transparent border-l-4 border-l-[#00FF88]'
                      : 'hover:bg-zinc-900/40'
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      {idx === 0 && <span className="text-lg">🥇</span>}
                      {idx === 1 && <span className="text-lg">🥈</span>}
                      {idx === 2 && <span className="text-lg">🥉</span>}
                      {idx > 2 && (
                        <span className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 text-xs">
                          #{idx + 1}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Shareholder Column */}
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={`w-9 h-9 rounded-xl object-cover border ${
                          isTop3 ? 'border-[#FFD700]' : 'border-zinc-700'
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-sans">
                          <span className="font-bold text-white text-xs">
                            {user.name}
                          </span>
                          {user.isCurrentUser && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00FF88] text-black font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 block font-mono">
                          {user.badge}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location Column */}
                  <td className="py-3.5 text-zinc-300">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-[#00D4FF]" />
                      <span>{user.city}, {user.country}</span>
                    </div>
                  </td>

                  {/* Data Vault Column */}
                  <td className="py-3.5">
                    <span className="font-bold text-cyan-300">{user.vaultSizeGB} GB</span>
                    <span className="text-[10px] text-zinc-500 block">Staked Mesh</span>
                  </td>

                  {/* Compute Staked Column */}
                  <td className="py-3.5">
                    <span className="font-bold text-[#FFD700]">${user.computeStakeUSD.toLocaleString()}</span>
                    <span className="text-[10px] text-zinc-500 block">BAA-COMPUTE</span>
                  </td>

                  {/* Daily Velocity Column */}
                  <td className="py-3.5 text-right font-bold text-emerald-400">
                    +${user.dailyVelocityUSD.toFixed(2)}/day
                  </td>

                  {/* Total Mined Column */}
                  <td className="py-3.5 pr-2 text-right">
                    <span className="text-sm font-black text-[#00FF88] block">
                      ${user.totalDividendsUSD.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-zinc-500 block">
                      ≈ {(user.totalDividendsUSD * 10).toLocaleString()} BaaCoin
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Action Strip */}
      <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Calculated automatically via `uadc_earnings` smart contracts</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">Your Rank: <strong className="text-[#00FF88]">#8 of 4,892 Nodes</strong></span>
          <button
            onClick={() => alert('Boost Hashrate: Stake an extra 5.0 GB or rent an AI Worker to climb the leaderboard!')}
            className="px-4 py-2 rounded-xl bg-[#00FF88] hover:bg-[#00e67a] text-black font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-[#00FF88]/20 flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Boost My Hashrate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default UADCLeaderboard;
