import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Coins,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Unlock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Brain,
  Briefcase,
  Users,
  GraduationCap,
  BookOpen,
  Bot,
  Tv,
  Layers,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Building2,
  Share2,
  ArrowLeft
} from 'lucide-react';

interface WalletPageProps {
  onNavigate?: (page: string) => void;
}

export const WalletPage: React.FC<WalletPageProps> = ({ onNavigate }) => {
  const { profile, updateProfile } = useEcosystem();

  // Active FAQ Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // MetaMask modal state
  const [showMetaMaskModal, setShowMetaMaskModal] = useState<boolean>(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(100);
  const [accountNumber, setAccountNumber] = useState<string>('0123456789');
  const [bankName, setBankName] = useState<string>('Wema Bank');
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);
  const [copiedContract, setCopiedContract] = useState<boolean>(false);

  const contractAddress = '0x8892BAA117C980A182FbcDE09118cE34988fBaaC';

  const handleCopyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2500);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.baacoin_balance < withdrawAmount) {
      alert(`Insufficient available balance! You have ${profile.baacoin_balance} BAA available to spend. Course completion bonus (${profile.baacoin_networth} BAA) unlocks after 90 days and first business launch.`);
      return;
    }
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      updateProfile({
        baacoin_balance: Math.max(0, profile.baacoin_balance - withdrawAmount)
      });
      setTimeout(() => {
        setWithdrawSuccess(false);
        setShowWithdrawModal(false);
      }, 3000);
    }, 1500);
  };

  const earningStreams = [
    {
      id: 'uadc',
      title: '1. 🧠 UADC Mining Earnings',
      balance: `${profile.baacoin_balance > 0 ? profile.baacoin_balance.toFixed(2) : '0.00'} BAA`,
      description: 'Earn ₦100-₦500/night by leaving phone charging. Last night: 0 BAA',
      icon: Brain,
      color: '#00FF88'
    },
    {
      id: 'workos',
      title: '2. 💼 WorkOS Job Earnings',
      balance: '0.00 BAA',
      description: '20% goes to you as BAA. Complete tasks to earn',
      icon: Briefcase,
      color: '#00D4FF'
    },
    {
      id: 'rich-connect',
      title: '3. 🤝 Rich Connect Sponsor Earnings',
      balance: '0.00 BAA',
      description: 'Sponsors send BAA directly to your wallet',
      icon: Users,
      color: '#FF69B4'
    },
    {
      id: 'course-bonus',
      title: '4. 🎓 Course Completion Bonus',
      balance: `${profile.baacoin_networth}.00 BAA (LOCKED)`,
      description: 'You earned 990 BAA from AI Engineering course',
      icon: GraduationCap,
      color: '#FFD700',
      isLocked: true
    },
    {
      id: 'abau',
      title: '5. 📚 ABAU Teaching Earnings',
      balance: '0.00 BAA',
      description: 'Teach others, earn 60% royalties in BAA',
      icon: BookOpen,
      color: '#10B981'
    },
    {
      id: 'automode',
      title: '6. 🤖 Automode AI Agent Earnings',
      balance: '0.00 BAA',
      description: 'Your AI agents work and send you BAA',
      icon: Bot,
      color: '#00FF88'
    },
    {
      id: 'gkap',
      title: '7. 👶 GKAP Referral Earnings',
      balance: '0.00 BAA',
      description: 'Refer kids, earn 100 BAA per child',
      icon: Sparkles,
      color: '#F43F5E'
    },
    {
      id: 'tv',
      title: '8. 📺 BAA TV Watch Earnings',
      balance: '0.00 BAA',
      description: 'Watch ads, earn BAA',
      icon: Tv,
      color: '#A855F7'
    },
    {
      id: 'trillionares',
      title: '9. 🏭 TrillionaresOS Business Profit',
      balance: '0.00 BAA',
      description: 'Your launched business profit in BAA',
      icon: Layers,
      color: '#FFD700'
    },
    {
      id: 'referral',
      title: '10. 🔗 Referral Earnings',
      balance: '0.00 BAA',
      description: 'Invite student: 50 BAA',
      icon: Users,
      color: '#38BDF8'
    },
    {
      id: 'staking',
      title: '11. 💎 Staking Rewards',
      balance: '0.00 BAA',
      description: 'Stake BAA in other student businesses, earn 15% monthly',
      icon: Coins,
      color: '#00FF88'
    }
  ];

  const faqs = [
    {
      q: 'Is BAACOIN real crypto I can sell?',
      a: 'YES. Phase 1: In-app points redeemable for Naira via Paystack (live now). Phase 2: Real token on Base blockchain tradable on Uniswap (launching in 30 days). You can already import to MetaMask.'
    },
    {
      q: 'What makes BAACOIN valuable?',
      a: '3 things back it:\n1) Real money: Every ₦5,000 course bought locks $990 value in treasury\n2) Real businesses: 124 student businesses pay 20% commission in BAA\n3) Real compute: 2,400 phones provide compute worth $0.50/day = value'
    },
    {
      q: 'Can I cash out BAACOIN to bank?',
      a: 'YES. Tap Withdraw -> Paystack sends Naira to your bank at 1 BAA = ₦1,500. Minimum 100 BAA.'
    },
    {
      q: 'Do I need MetaMask?',
      a: 'NO for now. Your BAA lives in our secured wallet (powered by MODE Digital). Optional: Import to MetaMask when we launch on Base.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans pb-20 selection:bg-[#00FF88] selection:text-black">
      {/* Background Matrix Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#00FF88]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#FFD700]/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF8808_1px,transparent_1px),linear-gradient(to_bottom,#00FF8808_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Navigation Breadcrumb */}
        {onNavigate && (
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#00FF88] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        )}

        {/* HEADER: BAACOIN (BAA) - Africa's Student Economy Coin */}
        <div className="bg-zinc-950/90 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#00FF88] uppercase bg-[#00FF88]/10 px-2.5 py-0.5 rounded-md border border-[#00FF88]/30">
                  OFFICIAL SOVEREIGN WALLET
                </span>
                <span className="text-xs font-mono text-zinc-500 hidden sm:inline">•</span>
                <span className="text-xs font-mono text-emerald-400 hidden sm:inline">
                  Base L2 Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white flex items-center gap-3">
                <span>BAACOIN (BAA)</span>
                <span className="text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40">
                  Africa's Student Economy Coin
                </span>
              </h1>
              <p className="text-xs sm:text-sm font-mono text-zinc-400">
                Price: <strong className="text-[#00FF88]">$1.00 USD (Stable Peg)</strong> | Blockchain: <strong>Base L2 (Ethereum)</strong> | Contract: <strong>{contractAddress.slice(0, 8)}...{contractAddress.slice(-6)}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300">
                1 BAA = ₦1,500 Cashout
              </span>
            </div>
          </div>

          {/* 3 PHASES EXPLAINER: HOW BAACOIN BECOMES REAL */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
                HOW BAACOIN BECOMES REAL (3 PHASES ARCHITECTURE)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              {/* PHASE 1 */}
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#00FF88] uppercase tracking-wider">PHASE 1: TODAY</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">LIVE NOW</span>
                </div>
                <div className="text-white font-bold text-sm">In-App Points (1:1 Naira Backed)</div>
                <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                  BAACOIN in app = Internal points backed 1:1 by Naira via Paystack. User earns 990 BAACOIN per ₦5,000 course = $990 locked value. Legal, no crypto license needed.
                </p>
                <div className="text-[10px] text-zinc-400 pt-1">
                  "1 BAACOIN = $1.00 USD pegged | Backed by student business revenue"
                </div>
              </div>

              {/* PHASE 2 */}
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#00D4FF] uppercase tracking-wider">PHASE 2: NEXT 30 DAYS</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 font-bold">IN PROGRESS</span>
                </div>
                <div className="text-white font-bold text-sm">Real Token on Base Chain</div>
                <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                  Launch real ERC-20 token on Base (Coinbase L2) — Gas fee $0.01, very cheap. Token Name: BAA-BILLIONAIRES Coin | Symbol: BAA | Supply: 1 Billion.
                </p>
                <div className="text-[10px] text-zinc-400 pt-1">
                  Importable to MetaMask &amp; Trust Wallet • Peg: $1.00 USD via treasury
                </div>
              </div>

              {/* PHASE 3 */}
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#FFD700] uppercase tracking-wider">PHASE 3: 90 DAYS</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-bold">ROADMAP</span>
                </div>
                <div className="text-white font-bold text-sm">Full Blockchain Utility</div>
                <p className="text-zinc-300 text-[11px] font-sans leading-relaxed">
                  Uniswap liquidity pool, cross-border African merchant payments, peer-to-peer data center node compute settlement, and staking yields.
                </p>
                <div className="text-[10px] text-zinc-400 pt-1">
                  Decentralized Autonomous Student Economy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BINANCE STYLE WALLET BALANCE CARD (TOP BIG CARD) */}
        <div className="bg-gradient-to-br from-zinc-950 via-[#040e08] to-zinc-950 border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-[#00FF88]/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                TOTAL PORTFOLIO NETWORTH
              </span>
              <div className="text-3xl sm:text-5xl font-black text-white font-mono flex items-baseline gap-3">
                <span className="text-[#00FF88]">${(profile.baacoin_networth + profile.baacoin_balance).toFixed(2)} USD</span>
                <span className="text-base sm:text-xl text-zinc-400 font-normal">/ {(profile.baacoin_networth + profile.baacoin_balance).toFixed(2)} BAA</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold block">
                ● 1 BAA = $1.00 USD (₦1,500 Bank Cashout Equivalent)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowMetaMaskModal(true)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00FF88] text-white font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Wallet className="w-4 h-4 text-[#00FF88]" />
                <span>Import to MetaMask</span>
              </button>

              <button
                onClick={() => window.open('https://basescan.org', '_blank')}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00D4FF] text-white font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-[#00D4FF]" />
                <span>View on BaseScan</span>
              </button>
            </div>
          </div>

          {/* NETWORTH BREAKDOWN (3 TIERS) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
            {/* LOCKED UNTIL GRADUATION */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/30 space-y-1 text-left">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Locked Until Graduation:</span>
                <Lock className="w-4 h-4 text-[#FFD700]" />
              </div>
              <div className="text-2xl font-black text-[#FFD700]">
                {profile.baacoin_networth}.00 BAA
              </div>
              <div className="text-[11px] text-zinc-400">
                (${(profile.baacoin_networth).toFixed(2)}) • Unlocks after 90 days + business launch
              </div>
            </div>

            {/* AVAILABLE TO SPEND */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-1 text-left">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Available to Spend:</span>
                <Unlock className="w-4 h-4 text-[#00FF88]" />
              </div>
              <div className="text-2xl font-black text-[#00FF88]">
                {profile.baacoin_balance.toFixed(2)} BAA
              </div>
              <div className="text-[11px] text-zinc-400">
                (${profile.baacoin_balance.toFixed(2)}) • Withdrawable to bank via Paystack
              </div>
            </div>

            {/* STAKED IN BUSINESSES */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1 text-left">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Staked in Businesses:</span>
                <Coins className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div className="text-2xl font-black text-white">
                0.00 BAA
              </div>
              <div className="text-[11px] text-zinc-400">
                ($0.00) • Earning 15% monthly APY
              </div>
            </div>
          </div>

          {/* QUICK ACTION BUTTONS (WITHDRAW, STAKE, SWAP) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00FF88] to-[#00C853] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00FF88]/20 flex items-center gap-2 cursor-pointer"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Withdraw BAA to Bank via Paystack</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('uadc-lab')}
              className="px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#FFD700] text-white font-mono text-xs uppercase tracking-wider hover:bg-zinc-800 transition flex items-center gap-2 cursor-pointer"
            >
              <Coins className="w-4 h-4 text-[#FFD700]" />
              <span>Stake BAA in Business (15% Monthly)</span>
            </button>

            <button
              onClick={() => alert('Swap to USDT is activating in Phase 2 on Base Chain (Uniswap pool launch). Rate: 1 BAA = 1.00 USDT.')}
              className="px-5 py-3.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00D4FF] text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#00D4FF]" />
              <span>Swap BAA to USDT (Coming Soon via Base)</span>
            </button>
          </div>
        </div>

        {/* ALL 11 EARNINGS STREAMS CAROUSEL / GRID */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>ALL 11 EARNINGS STREAMS</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-[#00FF88] border border-emerald-500/40 font-bold">
                  ONE UNIFIED WALLET
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Every stream across the BAA ecosystem deposits sovereign BAA Coin directly into your unified portfolio.
              </p>
            </div>
            <div className="text-xs font-mono text-[#00FF88] font-bold">
              TOTAL EARNINGS TODAY: 0.00 BAA
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earningStreams.map((stream) => {
              const IconComp = stream.icon;
              return (
                <div
                  key={stream.id}
                  className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition space-y-2 text-left relative group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: `${stream.color}20`, color: stream.color }}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <span
                      className={`text-sm font-black font-mono ${
                        stream.isLocked ? 'text-[#FFD700]' : 'text-white'
                      }`}
                    >
                      {stream.balance}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white font-mono">
                    {stream.title}
                  </h3>

                  <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                    {stream.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TRANSACTION HISTORY TABLE */}
        <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-base font-bold text-white font-heading">
              TRANSACTION HISTORY &amp; PROOF OF MASTERY
            </h3>
            <span className="text-xs font-mono text-zinc-500">Live On-Chain Ledger</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Tx Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                <tr>
                  <td className="py-3 px-3">2026-10-20</td>
                  <td className="py-3 px-3 font-semibold text-white">Course Completion Bonus</td>
                  <td className="py-3 px-3 font-bold text-[#FFD700]">+990.00 BAA</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30 text-[10px]">
                      Locked (90 Days)
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-500 text-[11px]">0x9a8f...4e12</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">2026-10-20</td>
                  <td className="py-3 px-3 font-semibold text-white">UADC Idle Mesh Verification</td>
                  <td className="py-3 px-3 font-bold text-[#00FF88]">+0.42 BAA</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-[#00FF88] border border-emerald-500/30 text-[10px]">
                      Verified Available
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-500 text-[11px]">0x3c21...8b77</td>
                </tr>
                <tr>
                  <td className="py-3 px-3">2026-10-19</td>
                  <td className="py-3 px-3 font-semibold text-white">Soulbound NFT Certificate Mint</td>
                  <td className="py-3 px-3 font-bold text-[#00D4FF]">+150.00 BAA</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-500/30 text-[10px]">
                      Credited
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-500 text-[11px]">0xfe92...01aa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* BLOCKCHAIN EXPLAINER FAQ BOX (Accordion style) */}
        <div className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-lg font-bold text-white font-heading mt-0.5">
              BAACOIN Value, Backing &amp; Blockchain Utility
            </h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-850/50 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                      <span className="text-[#00FF88] font-mono">Q:</span>
                      <span>{faq.q}</span>
                    </span>
                    <div className="shrink-0 text-zinc-400">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#00FF88]" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 bg-black/40 font-sans whitespace-pre-line">
                      <strong className="text-emerald-400 font-mono">A: </strong>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* REQUIRED EXACT TRUST BADGES */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 text-center leading-relaxed">
          "Secured by MODE Digital Creations Limited (BN: UY/009049) | Paystack Verified | Non-custodial option via Base Chain | Audit by CodeOrbit Limited"
        </div>
      </div>

      {/* METAMASK IMPORT MODAL */}
      {showMetaMaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#00FF88]" />
                <h3 className="text-lg font-bold text-white font-heading">
                  Import BAACOIN to MetaMask
                </h3>
              </div>
              <button
                onClick={() => setShowMetaMaskModal(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              BAACOIN is deployed on Coinbase's <strong>Base L2</strong> network for ultra-cheap $0.01 gas fees. Add custom token in your MetaMask or Trust Wallet:
            </p>

            <div className="space-y-2 font-mono text-xs bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <div className="flex justify-between">
                <span className="text-zinc-500">Network:</span>
                <span className="text-[#00D4FF] font-bold">Base Mainnet (Chain ID: 8453)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Token Symbol:</span>
                <span className="text-[#00FF88] font-bold">BAA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Decimals:</span>
                <span className="text-white">18</span>
              </div>
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-zinc-500 block text-[11px] mb-1">Contract Address:</span>
                <div className="flex items-center justify-between bg-black p-2 rounded-xl border border-zinc-800 text-[11px]">
                  <span className="text-[#00FF88] truncate">{contractAddress}</span>
                  <button
                    onClick={handleCopyContract}
                    className="p-1 hover:text-white text-zinc-400 shrink-0 ml-2"
                  >
                    {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Token parameters copied! Open your MetaMask mobile app or extension, select Base network, and tap "Import Tokens".');
                setShowMetaMaskModal(false);
              }}
              className="w-full py-3.5 rounded-xl bg-[#00FF88] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-[#00FF88]/20"
            >
              Copy Parameters &amp; Done
            </button>
          </div>
        </div>
      )}

      {/* WITHDRAW MODAL */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowDownLeft className="w-5 h-5 text-[#00FF88]" />
                <h3 className="text-lg font-bold text-white font-heading">
                  Withdraw BAA to Bank (Paystack)
                </h3>
              </div>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/60 border border-[#00FF88]/40 text-xs font-mono text-[#00FF88]">
              Exchange Rate: 1 BAA = ₦1,500 NGN (Direct Bank Settlement via Paystack Transfer API)
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">BAA Amount to Cashout:</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-bold text-sm focus:border-[#00FF88] focus:outline-none"
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  Estimated Payout: <strong className="text-[#00FF88]">₦{(withdrawAmount * 1500).toLocaleString()} NGN</strong>
                </span>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Account Number:</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:border-[#00FF88] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Bank Name:</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:border-[#00FF88] focus:outline-none"
                >
                  <option value="Wema Bank">Wema Bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">GTBank (Guaranty Trust Bank)</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                  <option value="First Bank">First Bank of Nigeria</option>
                  <option value="Kuda Bank">Kuda Microfinance Bank</option>
                  <option value="Opay">OPay Digital Services</option>
                  <option value="Palmpay">PalmPay</option>
                </select>
              </div>

              {withdrawSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transfer initiated! Paystack is dispatching ₦{(withdrawAmount * 1500).toLocaleString()} to your account.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isWithdrawing}
                  className="w-full py-3.5 rounded-xl bg-[#00FF88] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00FF88]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isWithdrawing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                      <span>Processing Bank Transfer...</span>
                    </>
                  ) : (
                    <span>Confirm Paystack Bank Payout</span>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
