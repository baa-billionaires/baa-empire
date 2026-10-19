import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { BountyItem, calculateShares } from '../lib/baacoin';
import {
  Briefcase,
  DollarSign,
  Cpu,
  Coins,
  CheckCircle,
  Plus,
  Send,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  X
} from 'lucide-react';

export const BountiesPage: React.FC = () => {
  const { profile, wallet, recordInteraction } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'open' | 'my'>('open');
  const [bounties, setBounties] = useState<BountyItem[]>(() => {
    try {
      const saved = localStorage.getItem('richconnect_bounties');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Post Bounty Modal State
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newBudgetNgn, setNewBudgetNgn] = useState(150000);
  const [newDesc, setNewDesc] = useState('');
  const [newSkills, setNewSkills] = useState('AI Agents, Prompt Engineering, React');

  // Submit Deliverable Modal State
  const [selectedBountyForDelivery, setSelectedBountyForDelivery] = useState<BountyItem | null>(null);
  const [deliverableUrl, setDeliverableUrl] = useState('');

  // Learn-to-Own Data Center shares calculation
  const dataCenterEquity = calculateShares(wallet.total_mined || 240);

  // Save bounties to storage
  const saveBountiesState = (items: BountyItem[]) => {
    setBounties(items);
    localStorage.setItem('richconnect_bounties', JSON.stringify(items));
  };

  const handleClaim = (bountyId: string) => {
    const updated = bounties.map(b => {
      if (b.id === bountyId) {
        return {
          ...b,
          claimed_by: profile.id,
          status: 'claimed' as const
        };
      }
      return b;
    });
    saveBountiesState(updated);
  };

  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBountyForDelivery || !deliverableUrl.trim()) return;

    const updated = bounties.map(b => {
      if (b.id === selectedBountyForDelivery.id) {
        return {
          ...b,
          deliverable_url: deliverableUrl,
          status: 'delivered' as const
        };
      }
      return b;
    });
    saveBountiesState(updated);
    setSelectedBountyForDelivery(null);
    setDeliverableUrl('');
  };

  const handleApproveBounty = (bounty: BountyItem) => {
    // 60% student / 40% platform split
    const studentShareNgn = Math.round(bounty.budget_ngn * 0.6);
    const updated = bounties.map(b => {
      if (b.id === bounty.id) {
        return {
          ...b,
          status: 'approved' as const,
          approved: true
        };
      }
      return b;
    });
    saveBountiesState(updated);

    // Reward student with XP + BaaCoin
    recordInteraction({
      courseId: 'bounty-reward',
      type: 'assignment_complete',
      promptData: `COMPLETED BOUNTY: ${bounty.title} for ${bounty.company_name}. Payout: ₦${studentShareNgn.toLocaleString()}`,
      customReward: { xp: 100, baacoin: 20 }
    });
  };

  const handleCreateBounty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const newB: BountyItem = {
      id: `bounty-${Date.now()}`,
      company_name: newCompany,
      title: newTitle,
      description: newDesc,
      budget_ngn: newBudgetNgn,
      budget_usd: Math.round(newBudgetNgn / 1250),
      skills_required: newSkills.split(',').map(s => s.trim()),
      posted_by: profile.id,
      status: 'open',
      approved: false,
      created_at: new Date().toISOString()
    };

    saveBountiesState([newB, ...bounties]);
    setIsPosting(false);
    setNewTitle('');
    setNewCompany('');
    setNewDesc('');
  };

  const openBounties = bounties.filter(b => b.status === 'open');
  const myClaimedBounties = bounties.filter(b => b.claimed_by === profile.id);

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#FFD700] tracking-widest uppercase font-bold flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-[#FFD700]" />
            Commercial Freelance Bounties &amp; Learn-to-Own
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            Paid AI &amp; Web3 Bounties
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Solve real-world commercial challenges posted by African companies and global sponsors. 60% payouts paid directly in Naira or USD, plus <span className="text-[#FFD700] font-bold">+20 BaaCoin</span> and data center equity shares on approval!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsPosting(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Bounty</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top 2 Highlight Cards: Earned & Learn-to-Own Equity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Monthly Student Bounty Earnings */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-emerald-500/40 relative shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  Verified Monthly Bounty Payouts
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px]">
                  Paystack Verified
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-heading font-black text-white mt-1">
                ₦150,000 <span className="text-base font-normal text-zinc-400 font-mono">($120 USD)</span>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                60% of bounty budgets are instantly credited to your student wallet balance, plus +100 XP and +20 BaaCoin mining bonus per deliverable approved.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-900 text-xs font-mono text-emerald-400">
              ● 5 Active Commercial Bounties Open for Claim
            </div>
          </div>

          {/* Card 2: Learn-to-Own Data Center Equity */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-[#00D4FF]/40 relative shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#00D4FF] font-bold uppercase tracking-wider">
                  Learn-to-Own Sovereign Data Center Equity
                </span>
                <Cpu className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
                You Own <span className="text-[#FFD700]">{dataCenterEquity.ownershipPercent}%</span> of Ikeja Data Center
              </div>
              <div className="text-xs font-mono text-cyan-300 mt-1">
                Yielding <strong className="text-white">${dataCenterEquity.dailyEarning}/day</strong> from sovereign GPU compute leases
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Every 1,000 BaaCoin you mine converts into 1 physical share of our African AI Data Center. Learn and build equity simultaneously!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between text-xs font-mono text-zinc-400">
              <span>Total Equity Accumulated:</span>
              <span className="text-[#FFD700] font-bold">${dataCenterEquity.totalEarned} USD</span>
            </div>
          </div>
        </div>

        {/* Tab Controls: Open Bounties / My Claimed Bounties */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl w-fit text-xs font-mono">
          <button
            onClick={() => setActiveTab('open')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'open' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Open Bounties ({openBounties.length})
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'my' ? 'bg-[#00D4FF] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Claimed Bounties ({myClaimedBounties.length})
          </button>
        </div>

        {/* Bounties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'open' ? openBounties : myClaimedBounties).map(bounty => (
            <div
              key={bounty.id}
              className="bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-[#FFD700]/50 p-6 flex flex-col justify-between transition shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-zinc-400 font-bold truncate max-w-[160px]">{bounty.company_name}</span>
                  <span className="text-[#FFD700] font-black text-sm">
                    ₦{bounty.budget_ngn.toLocaleString()}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-base leading-snug">
                  {bounty.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                  {bounty.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {bounty.skills_required.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-cyan-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 space-y-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span>Student 60% Payout:</span>
                  <span className="text-emerald-400 font-bold">₦{(bounty.budget_ngn * 0.6).toLocaleString()}</span>
                </div>

                {bounty.status === 'open' && (
                  <button
                    onClick={() => handleClaim(bounty.id)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition"
                  >
                    Claim Bounty
                  </button>
                )}

                {bounty.status === 'claimed' && (
                  <button
                    onClick={() => setSelectedBountyForDelivery(bounty)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Deliverable URL</span>
                  </button>
                )}

                {bounty.status === 'delivered' && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-amber-300 text-center">
                      Deliverable submitted • Awaiting Sponsor Review
                    </div>
                    <button
                      onClick={() => handleApproveBounty(bounty)}
                      className="w-full py-2 rounded-xl bg-emerald-950 border border-emerald-500/50 hover:bg-emerald-900 text-emerald-300 font-mono text-xs font-bold transition"
                    >
                      (Admin / Sponsor) Approve &amp; Release Payout
                    </button>
                  </div>
                )}

                {bounty.status === 'approved' && (
                  <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center text-xs font-mono text-emerald-400 font-bold">
                    ✓ Approved! ₦{(bounty.budget_ngn * 0.6).toLocaleString()} +20 BaaCoin Released
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Post Bounty Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-[#FFD700]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setIsPosting(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-heading font-black text-white">Post Commercial Bounty</h3>
            <p className="text-xs text-zinc-400">Hire top scholars from Africa Blockchain &amp; AI University.</p>

            <form onSubmit={handleCreateBounty} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Company / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lagos Tech Ventures"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Bounty Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Need WhatsApp Closer Bot with Paystack"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Budget in Naira (₦ NGN)</label>
                <input
                  type="number"
                  required
                  value={newBudgetNgn}
                  onChange={(e) => setNewBudgetNgn(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Deliverable Requirements</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Describe what the student must deliver..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white outline-none focus:border-[#FFD700] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-[#FFD700]/20"
              >
                Deposit &amp; Publish Bounty (₦{newBudgetNgn.toLocaleString()})
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Submit Deliverable Modal */}
      {selectedBountyForDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-zinc-950 border border-[#00D4FF]/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedBountyForDelivery(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-heading font-bold text-white">Submit Bounty Deliverable</h3>
            <p className="text-xs text-zinc-400">
              Provide your GitHub repository, live URL, or contract address for "{selectedBountyForDelivery.title}".
            </p>

            <form onSubmit={handleSubmitDeliverable} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Deliverable URL or Artifact Link</label>
                <input
                  type="text"
                  required
                  placeholder="https://github.com/... or https://deployed-bot.app"
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00D4FF] text-black font-bold uppercase tracking-wider hover:brightness-110 transition"
              >
                Send for Approval
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default BountiesPage;
