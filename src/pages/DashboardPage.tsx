import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Certificate } from '../components/Certificate';
import { NFTCertificatePreviewModal } from '../components/NFTCertificatePreviewModal';
import { CertificateNFT } from '../types';
import { InternalAdRenderer } from '../components/InternalAdRenderer';
import { DailyMiningTargetWidget } from '../components/DailyMiningTargetWidget';
import { LearnToMineWidget } from '../components/LearnToMineWidget';
import { AIRecruiterPortal } from '../components/AIRecruiterPortal';
import {
  getStoredSubscriptions,
  getStoredTransactions,
  disableSubscription,
  PaystackSubscription,
  PaystackTransaction
} from '../lib/paystack';
import {
  Coins,
  Lock,
  Unlock,
  TrendingUp,
  Award,
  Sparkles,
  BookOpen,
  Share2,
  Copy,
  Check,
  Bot,
  Cpu,
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Users,
  Send,
  Zap,
  Terminal,
  CreditCard,
  Repeat,
  Calendar,
  Clock,
  Radar
} from 'lucide-react';

interface DashboardPageProps {
  onContinueCourse: (courseId: string) => void;
  onNavigateToAcademy: () => void;
  onNavigateToMarketplace: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onContinueCourse,
  onNavigateToAcademy,
  onNavigateToMarketplace
}) => {
  const {
    profile,
    wallet,
    enrollments,
    courses,
    marketplacePrompts,
    certificates,
    referrals,
    scoutLeads,
    latestMiningBlock
  } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'overview' | 'learning' | 'prompts' | 'certificates' | 'referrals' | 'tutor' | 'subscriptions' | 'recruiter'>('overview');
  const [previewCert, setPreviewCert] = useState<CertificateNFT | null>(null);
  const [subscriptionsList, setSubscriptionsList] = useState<PaystackSubscription[]>(() => getStoredSubscriptions());

  const [transactionsList, setTransactionsList] = useState<PaystackTransaction[]>(() => getStoredTransactions());
  const [copiedRef, setCopiedRef] = useState(false);
  const [tutorChat, setTutorChat] = useState<Array<{ sender: 'user' | 'tutor'; text: string }>>([
    { sender: 'tutor', text: `Welcome back, ${profile.full_name}! Your BaaCoin networth is currently active. Ready to continue mining today?` }
  ]);
  const [tutorQuery, setTutorQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // My prompts listed in 60/40 marketplace
  const myPrompts = marketplacePrompts.filter(p => p.user_id === profile.id);
  const totalPromptSales = myPrompts.reduce((acc, p) => acc + p.sales, 0);
  const totalPromptRevenue = myPrompts.reduce((acc, p) => acc + p.student_share, 0);

  // Enrolled courses with data
  const enrolledCoursesData = enrollments.map(enr => {
    const course = courses.find(c => c.id === enr.course_id);
    return { ...enr, course };
  });

  const refUrl = `https://billionairesai.academy/academy?ref=${profile.referral_code}`;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(refUrl);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutorQuery.trim() || isThinking) return;

    const userText = tutorQuery;
    setTutorChat(prev => [...prev, { sender: 'user', text: userText }]);
    setTutorQuery('');
    setIsThinking(true);

    setTimeout(() => {
      setTutorChat(prev => [
        ...prev,
        {
          sender: 'tutor',
          text: `[ADVISOR AI]: Excellent inquiry regarding "${userText}". To optimize your BaaCoin mining throughput, focus on completing the practical assignments in your active modules. You will hit 100% capstone soon!`
        }
      ]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Internal Promotional Banner */}
      <div className="max-w-7xl mx-auto mb-6">
        <InternalAdRenderer
          position="dashboard_banner"
          onCtaClick={onNavigateToAcademy}
        />
      </div>

      {/* Student Welcome Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar_url}
            alt={profile.full_name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#FFD700] shadow-lg shadow-[#FFD700]/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
                {profile.full_name}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold">
                STUDENT LEVEL {profile.level}
              </span>
              {certificates.length > 0 && (
                <button
                  onClick={() => setPreviewCert(certificates[0])}
                  className="px-2.5 py-0.5 rounded-full bg-[#FFD700]/15 hover:bg-[#FFD700]/25 text-[#FFD700] border border-[#FFD700]/40 text-[10px] font-mono font-bold transition flex items-center gap-1 active:scale-95"
                  title="Inspect Base L2 Soulbound Certificate"
                >
                  <Award className="w-3 h-3" />
                  <span>Preview NFT Certificate</span>
                </button>
              )}
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Member ID: {profile.id} • Ref: {profile.referral_code}
            </p>
          </div>
        </div>


        {/* Navigation Tabs */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'overview', label: 'Overview & Networth' },
            { id: 'recruiter', label: `🎯 AI Recruiter (${scoutLeads.length} Leads)` },
            { id: 'learning', label: `My Courses (${enrollments.length})` },
            { id: 'prompts', label: '60/40 Prompts' },
            { id: 'certificates', label: `NFTs (${certificates.length})` },
            { id: 'referrals', label: 'Referrals & Bonus' },
            { id: 'tutor', label: 'AI Mentor' },
            { id: 'subscriptions', label: `Subscriptions (${subscriptionsList.filter(s => s.status === 'active').length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#FFD700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* TAB 1: OVERVIEW & 10X NETWORTH SYSTEM */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* LEARN-TO-MINE BAACOIN REAL-TIME ACCUMULATOR WIDGET */}
            <LearnToMineWidget
              onNavigateToAcademy={onNavigateToAcademy}
              onNavigateToWallet={() => {
                window.location.hash = 'wallet';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* DAILY MINING TARGET WIDGET */}
            <DailyMiningTargetWidget
              onOpenReader={() => {
                window.location.hash = 'library';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToUADC={() => {
                window.location.hash = 'uadc-lab';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: BaaCoin 10x Networth (Locked/Unlocked) */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-[#FFD700]/40 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#FFD700] font-bold uppercase tracking-wider">
                    Total BaaCoin Networth
                  </span>
                  {profile.baacoin_locked ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      <Unlock className="w-3 h-3" /> Unlocked
                    </span>
                  )}
                </div>

                <div className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">
                  {profile.baacoin_networth.toLocaleString()}{' '}
                  <span className="text-lg font-mono text-[#FFD700]">BaaCoin</span>
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  Collateral Valuation: <span className="text-white font-bold">${profile.baacoin_networth.toLocaleString()} USD</span>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 text-xs text-zinc-400 leading-relaxed font-sans flex flex-col gap-2">
                  <p>
                    {profile.baacoin_locked
                      ? 'Locked until capstone graduation (100% progress). Once completed, 20% moves to spendable balance instantly, rest vests daily.'
                      : 'Congratulations! Your networth has unlocked. 20% liquid balance credited.'}
                  </p>
                  <button
                    onClick={() => {
                      window.location.hash = 'wallet';
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-[#00FF88]/15 hover:bg-[#00FF88]/25 text-[#00FF88] border border-[#00FF88]/40 font-mono text-[11px] font-bold uppercase transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Open Full BAACOIN Wallet (Base L2)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2: Spendable Wallet & Mined */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 relative shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#00D4FF] font-bold uppercase tracking-wider">
                    Spendable Liquid Balance
                  </span>
                  <Coins className="w-4 h-4 text-[#00D4FF]" />
                </div>

                <div className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">
                  {profile.baacoin_balance.toLocaleString()}{' '}
                  <span className="text-lg font-mono text-[#00D4FF]">BaaCoin</span>
                </div>
                <div className="text-xs font-mono text-emerald-400 mt-1">
                  Spendable in Marketplace or Trade via NFT
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between text-xs font-mono text-zinc-400">
                  <span>Learn-to-Mine Total:</span>
                  <span className="text-[#FFD700] font-bold">+{wallet.total_mined} BaaCoin</span>
                </div>
              </div>

              {/* Card 3: Experience & Hash Power */}
              <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 relative shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                    Student XP &amp; Hashrate
                  </span>
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>

                <div className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">
                  {profile.xp.toLocaleString()}{' '}
                  <span className="text-lg font-mono text-purple-400">XP</span>
                </div>
                <div className="text-xs font-mono text-zinc-400 mt-1">
                  PoW-Learn Hashrate: <span className="text-white font-bold">42.8 MH/s</span>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between text-xs font-mono text-zinc-400">
                  <span>Next Level ({profile.level + 1}):</span>
                  <span className="text-emerald-400">{250 * profile.level - profile.xp} XP to level up</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Active Learn-to-Mine Session
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Every minute spent watching lectures or submitting code mines live cryptocurrency for your wallet.
                </p>
              </div>

              <div className="flex gap-3">
                {enrolledCoursesData.length > 0 ? (
                  <button
                    onClick={() => onContinueCourse(enrolledCoursesData[0].course_id)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-2"
                  >
                    <span>Resume Learning &amp; Mining</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onNavigateToAcademy}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                  >
                    Enroll in Your First Course
                  </button>
                )}
              </div>
            </div>

            {/* Active Enrolled Courses Snapshot */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold text-white">Current Enrolled Courses</h3>
                <button
                  onClick={onNavigateToAcademy}
                  className="text-xs font-mono text-[#00D4FF] hover:underline flex items-center gap-1"
                >
                  Browse More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCoursesData.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-[#00D4FF]">{item.course?.category || 'AI Masterclass'}</span>
                        <span className="text-[#FFD700] font-bold">
                          Mined: {item.total_mined} BaaCoin
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white font-heading">
                        {item.course?.title || 'Enrolled Course'}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {item.course?.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400">Graduation Progress:</span>
                        <span className="text-white font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-zinc-900 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#FFD700] to-[#00D4FF] h-full rounded-full transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onContinueCourse(item.course_id)}
                      className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>{item.progress >= 100 ? 'View Certificate' : 'Open Learn & Mine'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY LEARNING */}
        {activeTab === 'learning' && (
          <div className="space-y-6">
            <h3 className="text-xl font-heading font-black text-white">Enrolled Masterclasses</h3>
            {enrolledCoursesData.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-400">
                You haven't enrolled in any courses yet. Enroll now to unlock your 10x BaaCoin networth!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCoursesData.map(item => (
                  <div key={item.id} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">Progress: {item.progress}%</span>
                      <h4 className="text-base font-bold text-white mt-1">{item.course?.title}</h4>
                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{item.course?.description}</p>
                    </div>

                    <div className="pt-4 border-t border-zinc-900">
                      <button
                        onClick={() => onContinueCourse(item.course_id)}
                        className="w-full py-2.5 rounded-xl bg-[#FFD700] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                      >
                        Enter Learning Terminal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: 60/40 PROMPTS & EARNINGS */}
        {activeTab === 'prompts' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-950 border border-[#FFD700]/30 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xl">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">My Listed Prompts</span>
                <span className="text-3xl font-heading font-black text-white block mt-1">{myPrompts.length}</span>
                <span className="text-[11px] text-zinc-500 font-mono">Compiled from graduations</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Total Sales Generated</span>
                <span className="text-3xl font-heading font-black text-[#00D4FF] block mt-1">{totalPromptSales}</span>
                <span className="text-[11px] text-zinc-500 font-mono">Purchased by other students</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">My 60% Royalties</span>
                <span className="text-3xl font-heading font-black text-[#FFD700] block mt-1">${totalPromptRevenue.toFixed(2)} USD</span>
                <span className="text-[11px] text-emerald-400 font-mono">Auto-credited to spendable wallet</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-heading font-bold text-white">Prompt Inventory &amp; Performance</h4>
              {myPrompts.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono text-xs">
                  You have not graduated from any course yet. Reach 100% in any course to auto-compile and list your prompt package in the 60/40 Marketplace!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myPrompts.map(p => (
                    <div key={p.id} className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#00D4FF] font-bold">{p.category}</span>
                        <span className="text-[#FFD700] font-bold">${p.price} Price</span>
                      </div>
                      <h5 className="text-base font-bold text-white">{p.title}</h5>
                      <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
                      <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between text-xs font-mono">
                        <span>Sales: <span className="text-white font-bold">{p.sales}</span></span>
                        <span>Your 60% Yield: <span className="text-emerald-400 font-bold">${p.student_share.toFixed(2)}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MY CERTIFICATES NFT WITH CHIP */}
        {activeTab === 'certificates' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-xl font-heading font-black text-white">
                  My On-Chain NFT Certificates &amp; BaaCoin Chips
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Base L2 Soulbound Proof of Knowledge with engraved spendable BaaCoin chips and embedded referral bounties.
                </p>
              </div>

              {certificates.length > 0 && (
                <button
                  onClick={() => setPreviewCert(certificates[0])}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center gap-1.5 shrink-0"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Preview NFT Certificate</span>
                </button>
              )}
            </div>

            {certificates.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-500 font-mono text-xs">
                No certificates minted yet. Complete your first course 100% in the Academy to generate your gold certificate with engraved BaaCoin chip!
              </div>
            ) : (
              certificates.map(cert => (
                <div key={cert.id} className="p-6 rounded-3xl bg-zinc-950 border border-[#FFD700]/30 shadow-2xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs border-b border-zinc-900 pb-3">
                    <div>
                      <span className="text-[#00D4FF] font-bold block">{cert.course_title}</span>
                      <span className="text-zinc-500 text-[10px]">Token ID: {cert.nft_id}</span>
                    </div>

                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30 font-bold transition flex items-center gap-1.5 shrink-0"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Open Full On-Chain Inspector</span>
                    </button>
                  </div>

                  <Certificate certificate={cert} showActions={true} />
                </div>
              ))
            )}
          </div>
        )}


        {/* TAB 5: REFERRALS & 10% NETWORTH BONUS */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-[#FFD700]/40 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700] font-bold uppercase">
                <Share2 className="w-4 h-4" />
                <span>10% Networth Referral Engine</span>
              </div>
              <h3 className="text-2xl font-heading font-black text-white">
                Earn 10% of Every Student's BaaCoin Networth
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
                When a new student signs up or scans your NFT Certificate QR code with your referral code, they receive 990 BaaCoin Networth and you instantly receive <span className="text-[#FFD700] font-bold">99 BaaCoin ($99 value) as cash commission</span>!
              </p>

              {/* Referral Link Box */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <input
                    type="text"
                    readOnly
                    value={refUrl}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-xs font-mono text-white outline-none"
                  />
                  <button
                    onClick={handleCopyRef}
                    className="px-6 py-3 bg-[#FFD700] text-black font-heading font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 shrink-0"
                  >
                    {copiedRef ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedRef ? 'Copied!' : 'Copy Referral Link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Referrals History Table */}
            <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4">
              <h4 className="text-base font-bold text-white font-heading">Referred Scholars &amp; Payouts</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="text-zinc-500 border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5">Student Name</th>
                      <th className="py-2.5">BaaCoin Bonus (10%)</th>
                      <th className="py-2.5">Cash Commission</th>
                      <th className="py-2.5">Status</th>
                      <th className="py-2.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900">
                    {referrals.map(ref => (
                      <tr key={ref.id} className="text-zinc-300">
                        <td className="py-3 text-white font-medium">{ref.referred_name}</td>
                        <td className="py-3 text-[#FFD700] font-bold">+{ref.baacoin_bonus} BaaCoin</td>
                        <td className="py-3 text-emerald-400 font-bold">${ref.commission}</td>
                        <td className="py-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px]">
                            Paid
                          </span>
                        </td>
                        <td className="py-3 text-zinc-500">{new Date(ref.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AI MENTOR CHAT */}
        {activeTab === 'tutor' && (
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 h-[560px] flex flex-col shadow-2xl">
            <div className="pb-3 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#FFD700]" />
                <h3 className="text-sm font-bold text-white font-mono">Personal AI Academic Advisor</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">Connected to Kainji Cluster</span>
            </div>

            <div className="flex-1 py-4 overflow-y-auto space-y-3 text-xs">
              {tutorChat.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-mono text-zinc-500 mb-0.5">
                    {m.sender === 'user' ? profile.full_name : 'Advisor AI'}
                  </span>
                  <div
                    className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      m.sender === 'user' ? 'bg-[#FFD700] text-black font-medium' : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isThinking && <div className="text-xs font-mono text-zinc-500 animate-pulse">Analyzing student trajectory...</div>}
            </div>

            <form onSubmit={handleSendChat} className="pt-3 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                value={tutorQuery}
                onChange={(e) => setTutorQuery(e.target.value)}
                placeholder="Ask advice on your curriculum or BaaCoin vesting..."
                className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
              <button
                type="submit"
                disabled={!tutorQuery.trim() || isThinking}
                className="px-5 py-2.5 bg-[#FFD700] text-black font-bold rounded-xl text-xs hover:brightness-110 active:scale-95 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 7: PAYSTACK SUBSCRIPTIONS & TRANSACTIONS TRACKING */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-8">
            {/* Top Summary Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-[#00D4FF]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] font-bold uppercase">
                  <CreditCard className="w-4 h-4" />
                  <span>PAYSTACK AUTONOMOUS BILLING &amp; ALLOCATION REGISTRY</span>
                </div>
                <h3 className="text-2xl font-heading font-black text-white">
                  Subscriptions &amp; Payment Ledger
                </h3>
                <p className="text-xs text-zinc-400 max-w-xl">
                  Automated allocation of BaaCoin networth (10x tuition) and continuous 30-day AI Tutor recurring subscription tracking.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">ACTIVE SUBS</span>
                  <span className="text-lg font-bold text-emerald-400">
                    {subscriptionsList.filter(s => s.status === 'active').length}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
                  <span className="text-zinc-500 block text-[10px]">TOTAL TRANSACTIONS</span>
                  <span className="text-lg font-bold text-[#FFD700]">
                    {transactionsList.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Subscriptions Section */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Repeat className="w-5 h-5 text-emerald-400" />
                <span>Active 30-Day Subscriptions</span>
              </h4>

              {subscriptionsList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-3">
                  <p className="text-xs text-zinc-400">No active AI Tutor or recurring subscriptions found.</p>
                  <button
                    onClick={onNavigateToMarketplace}
                    className="px-4 py-2 rounded-xl bg-[#00D4FF] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                  >
                    Browse AI Tutors to Hire
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subscriptionsList.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-4 shadow-lg"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            sub.status === 'active'
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            ● {sub.status}
                          </span>
                          <span className="text-xs font-mono font-bold text-[#FFD700]">
                            ${sub.amount} USD / mo
                          </span>
                        </div>

                        <h5 className="text-base font-bold text-white font-heading">
                          {sub.tutor_name || 'Autonomous AI Tutor'}
                        </h5>
                        <p className="text-xs text-zinc-400 font-mono">
                          Code: {sub.subscription_code} • Auth: {sub.authorization_code}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-zinc-900 text-xs font-mono text-zinc-400">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-500">
                            <Calendar className="w-3.5 h-3.5" /> Next Renewal Date:
                          </span>
                          <span className="text-white font-bold">
                            {new Date(sub.next_payment_date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-zinc-500">
                            <Coins className="w-3.5 h-3.5 text-[#FFD700]" /> Monthly Reward:
                          </span>
                          <span className="text-[#FFD700] font-bold">
                            +{sub.baacoin_reward_monthly || 50} BaaCoin
                          </span>
                        </div>
                      </div>

                      {sub.status === 'active' && (
                        <button
                          onClick={async () => {
                            await disableSubscription(sub.subscription_code);
                            setSubscriptionsList(getStoredSubscriptions());
                          }}
                          className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-800 text-xs font-mono transition"
                        >
                          Cancel Auto-Renewal
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Paystack Transactions Ledger */}
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#00D4FF]" />
                <span>Verified Paystack Transaction Ledger</span>
              </h4>

              {transactionsList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center text-xs text-zinc-400">
                  No transactions recorded yet. Complete a course enrollment or tutor hire to generate verified payment records.
                </div>
              ) : (
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-900/60 text-zinc-400 border-b border-zinc-800">
                        <tr>
                          <th className="p-3.5">Reference</th>
                          <th className="p-3.5">Type</th>
                          <th className="p-3.5">Amount</th>
                          <th className="p-3.5">BaaCoin Networth</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {transactionsList.map((tx) => (
                          <tr key={tx.reference} className="hover:bg-zinc-900/30 transition">
                            <td className="p-3.5 font-bold text-white">{tx.reference}</td>
                            <td className="p-3.5 capitalize text-zinc-300">
                              {tx.type.replace('_', ' ')}
                            </td>
                            <td className="p-3.5 text-[#00D4FF] font-bold">${tx.amount} USD</td>
                            <td className="p-3.5 text-[#FFD700] font-bold">
                              +{tx.baacoin_allocated || (tx.type === 'course_enroll' ? tx.amount * 10 : tx.amount * 5)} BaaCoin
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold uppercase">
                                Verified
                              </span>
                            </td>
                            <td className="p-3.5 text-zinc-500">
                              {new Date(tx.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 8: AI RECRUITER PORTAL */}
        {activeTab === 'recruiter' && (
          <AIRecruiterPortal
            onNavigateToAcademy={onNavigateToAcademy}
            onNavigateToDealRoom={() => {
              window.location.hash = 'deal-room';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>

      {/* Full-Screen On-Chain NFT Certificate Inspector Modal */}
      <NFTCertificatePreviewModal
        certificate={previewCert}
        isOpen={!!previewCert}
        onClose={() => setPreviewCert(null)}
      />
    </div>
  );
};

export default DashboardPage;
