import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { ProjectProposal } from '../types';
import {
  Flame,
  CheckCircle,
  Clock,
  Coins,
  Users,
  ShieldCheck,
  Plus,
  ArrowRight,
  Filter,
  DollarSign,
  TrendingUp,
  Cpu,
  Globe,
  ExternalLink,
  Github,
  Award,
  ChevronDown,
  X
} from 'lucide-react';

export const ProjectsFundingPage: React.FC = () => {
  const {
    projectProposals,
    backProjectWithBaaCoin,
    approveProjectFunding,
    submitProjectProposal,
    wallet,
    isAdmin
  } = useEcosystem();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [backingModalProject, setBackingModalProject] = useState<ProjectProposal | null>(null);
  const [backingAmount, setBackingAmount] = useState<number>(250);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // New project proposal form state
  const [form, setForm] = useState({
    title: '',
    category: 'Autonomous AI' as ProjectProposal['category'],
    lead_student: '',
    team_members: '',
    description: '',
    problem_solved: '',
    funding_ask_usd: 25000,
    equity_offered_percent: 10,
    milestone_1: 'AI Prototyping & Core Neural Prompt Compiler',
    milestone_2: 'UADC Decentralized Compute Node Mesh Entanglement',
    milestone_3: 'Base L2 Smart Contract & Paystack Settlement Audit',
    demo_url: '',
    github_url: ''
  });

  const categories = [
    'All',
    'Autonomous AI',
    'FinTech & Lending',
    'Clean Energy & Solar',
    'AgroVision',
    'Web3 & Identity'
  ];

  const phases = [
    'All',
    'Ideation & Spec',
    'AI Prototyping',
    'Node Compute Allocated',
    'Security & CAC Audited',
    'Approved for Funding',
    'Seed Funded & Scaling'
  ];

  const filteredProjects = projectProposals.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesPhase = selectedPhase === 'All' || p.development_phase === selectedPhase;
    return matchesCat && matchesPhase;
  });

  const totalFundedBaa = projectProposals.reduce((sum, p) => sum + p.total_funded_baacoin, 0);
  const totalBackers = projectProposals.reduce((sum, p) => sum + p.backers_count, 0);
  const approvedCount = projectProposals.filter((p) => p.status === 'approved' || p.status === 'funded').length;

  const handleBackProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!backingModalProject) return;

    const res = backProjectWithBaaCoin(backingModalProject.id, backingAmount);
    if (res.success) {
      setActionSuccessMsg(
        `Successfully staked ${backingAmount.toLocaleString()} BaaCoin into "${backingModalProject.title}"! You now hold an equity revenue claim.`
      );
      setBackingModalProject(null);
      setTimeout(() => setActionSuccessMsg(null), 6000);
    } else {
      setActionSuccessMsg(res.error || 'Unable to stake BaaCoin: please check your balance.');
      setTimeout(() => setActionSuccessMsg(null), 5000);
    }
  };

  const handleApprove = (projId: string, projTitle: string) => {
    approveProjectFunding(projId);
    setActionSuccessMsg(`Project "${projTitle}" has been formally approved for grant disbursement!`);
    setTimeout(() => setActionSuccessMsg(null), 5000);
  };

  const handleSubmitNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.lead_student || !form.description) return;

    submitProjectProposal({
      title: form.title,
      category: form.category,
      lead_student: form.lead_student,
      student_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      team_members: form.team_members.split(',').map((t) => t.trim()).filter(Boolean),
      description: form.description,
      problem_solved: form.problem_solved,
      development_phase: 'Ideation & Spec',
      funding_ask_usd: Number(form.funding_ask_usd) || 25000,
      funding_ask_baacoin: Number(form.funding_ask_usd) || 25000,
      equity_offered_percent: Number(form.equity_offered_percent) || 10,
      milestones: [
        { title: form.milestone_1, completed: true, target_date: 'Q1 2026' },
        { title: form.milestone_2, completed: false, target_date: 'Q2 2026' },
        { title: form.milestone_3, completed: false, target_date: 'Q3 2026' }
      ],
      demo_url: form.demo_url || undefined,
      github_url: form.github_url || undefined
    });

    setIsSubmitModalOpen(false);
    setActionSuccessMsg(`Your project "${form.title}" is now live in the community voting & funding pipeline!`);
    setTimeout(() => setActionSuccessMsg(null), 6000);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] text-xs font-mono font-bold mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>STUDENT VENTURE INCUBATOR &amp; SEED GRANTS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              Projects, Development &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-emerald-400 to-[#FFD700]">Funding Approvals</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
              Discover, back, and govern breakthrough autonomous AI startups created by Billionaires AI Academy graduates. Community members and angel investors back milestones in BaaCoin to receive equity royalties.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Project Proposal</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {actionSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fade-in shadow-xl">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Global Venture Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">VENTURE PIPELINE</span>
            <div className="text-2xl font-heading font-black text-white mt-1">
              {projectProposals.length} Micro-Startups
            </div>
            <span className="text-[10px] text-[#00D4FF]">Across 6 African hubs</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">CAPITAL BACKED</span>
            <div className="text-2xl font-heading font-black text-[#FFD700] mt-1">
              {totalFundedBaa.toLocaleString()} BAA
            </div>
            <span className="text-[10px] text-zinc-400">≈ ${(totalFundedBaa * 1.02).toLocaleString()} USD</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">COMMUNITY BACKERS</span>
            <div className="text-2xl font-heading font-black text-emerald-400 mt-1">
              {totalBackers} Angels
            </div>
            <span className="text-[10px] text-zinc-400">Direct equity smart contracts</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">FUNDING APPROVED</span>
            <div className="text-2xl font-heading font-black text-purple-400 mt-1">
              {approvedCount} Ventures
            </div>
            <span className="text-[10px] text-emerald-400">CAC &amp; Wema Bank Verified</span>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-zinc-500 text-[10px] uppercase mr-1">CATEGORY:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg transition ${
                  selectedCategory === c
                    ? 'bg-[#00D4FF] text-black font-bold'
                    : 'text-zinc-400 hover:text-white bg-zinc-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-[10px] uppercase">DEVELOPMENT PHASE:</span>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-white rounded-lg px-2.5 py-1 text-xs outline-none focus:border-[#00D4FF]"
            >
              {phases.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Proposals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((p) => {
            const fundedPct = Math.min(
              100,
              Math.round((p.total_funded_baacoin / p.funding_ask_baacoin) * 100)
            );
            const isApproved = p.status === 'approved' || p.status === 'funded';

            return (
              <div
                key={p.id}
                className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#00D4FF]/40 transition space-y-6 shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="px-3 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] font-bold border border-[#00D4FF]/30">
                      {p.category}
                    </span>

                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                        isApproved
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      }`}
                    >
                      ● {p.development_phase}
                    </span>
                  </div>

                  {/* Title & Founder Info */}
                  <div>
                    <h3 className="font-heading font-black text-white text-xl leading-snug">
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-2.5 mt-2">
                      <img
                        src={p.student_avatar}
                        alt={p.lead_student}
                        className="w-7 h-7 rounded-full object-cover border border-zinc-700"
                      />
                      <span className="text-xs font-mono text-zinc-300">
                        Lead: <strong className="text-white">{p.lead_student}</strong>
                      </span>
                      {p.team_members.length > 0 && (
                        <span className="text-[11px] font-mono text-zinc-500">
                          +{p.team_members.length} team members
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description & Problem Solved */}
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase block font-bold mb-0.5">
                      CRITICAL PROBLEM SOLVED:
                    </span>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">{p.problem_solved}</p>
                  </div>

                  {/* Funding Progress Bar */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Funded: <strong className="text-[#FFD700]">{p.total_funded_baacoin.toLocaleString()} BAA</strong></span>
                      <span>Ask: <strong className="text-white">${p.funding_ask_usd.toLocaleString()} USD</strong></span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-zinc-900 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#00D4FF] rounded-full transition-all duration-500"
                        style={{ width: `${fundedPct}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-zinc-500">
                      <span>{fundedPct}% Funded ({p.backers_count} Backers)</span>
                      <span className="text-emerald-400 font-bold">{p.equity_offered_percent}% Equity Offered</span>
                    </div>
                  </div>

                  {/* Milestones Accordion */}
                  <div className="space-y-1.5 pt-2 border-t border-zinc-900">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                      DEVELOPMENT MILESTONES:
                    </span>
                    <div className="space-y-1">
                      {p.milestones.map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-zinc-900 text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            {m.completed ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                            )}
                            <span className={m.completed ? 'text-zinc-200 line-through' : 'text-zinc-300'}>
                              {m.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-500">{m.target_date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-5 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    {p.github_url && (
                      <a
                        href={p.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {p.demo_url && (
                      <a
                        href={p.demo_url}
                        className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                        title="Live Prototype"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Admin or Community Approval Button */}
                    {!isApproved && (
                      <button
                        onClick={() => handleApprove(p.id, p.title)}
                        className="py-2.5 px-3 rounded-xl bg-purple-500/10 border border-purple-500/40 text-purple-300 hover:bg-purple-500/20 text-xs font-bold transition"
                      >
                        Approve Grant
                      </button>
                    )}

                    {/* Back with BaaCoin */}
                    <button
                      onClick={() => setBackingModalProject(p)}
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-blue-600 text-white font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-sky-500/20 flex items-center gap-1.5"
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>Back with BaaCoin</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Backing Modal */}
        {backingModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-zinc-950 border border-[#00D4FF]/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in font-mono text-xs">
              <button
                onClick={() => setBackingModalProject(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] mx-auto">
                <Coins className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <span className="text-[10px] text-[#00D4FF] uppercase tracking-widest font-bold">
                  AUTONOMOUS SEED GRANT BACKER
                </span>
                <h3 className="text-xl font-heading font-black text-white">
                  Back "{backingModalProject.title}"
                </h3>
                <p className="text-xs text-zinc-400">
                  Your stake unlocks proportional equity royalty rights settled in BaaCoin.
                </p>
              </div>

              <form onSubmit={handleBackProject} className="space-y-4">
                <div>
                  <label className="text-zinc-400 block mb-1">STAKE AMOUNT (BAACOIN)</label>
                  <input
                    type="number"
                    min="25"
                    step="25"
                    value={backingAmount}
                    onChange={(e) => setBackingAmount(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white font-bold outline-none focus:border-[#00D4FF]"
                  />
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 mt-1">
                    <span>Your Spendable Wallet: {wallet.balance} BAA</span>
                    <span>Pegged: ${backingAmount} USD</span>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1 text-[11px] text-zinc-300">
                  <div className="flex justify-between">
                    <span>Target Startup:</span>
                    <span className="text-white font-bold">{backingModalProject.lead_student}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equity Royalty Pool:</span>
                    <span className="text-emerald-400 font-bold">{backingModalProject.equity_offered_percent}% Total</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Smart Contract Escrow:</span>
                    <span className="text-[#00D4FF]">Base L2 Sovereign Vault</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20"
                >
                  Confirm {backingAmount} BAA Investment
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Submit Project Proposal Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  STUDENT FOUNDER INCUBATOR
                </span>
                <h2 className="text-2xl font-heading font-black text-white mt-1">
                  Submit Venture for Community Funding
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  List your AI capstone or autonomous robotics startup to receive seed capital, GPU compute node allocation, and investor backing.
                </p>
              </div>

              <form onSubmit={handleSubmitNewProject} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 block mb-1">PROJECT / VENTURE TITLE</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AgroDrone Autonomous Crop Scanner"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">CATEGORY</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                    >
                      <option value="Autonomous AI">Autonomous AI</option>
                      <option value="FinTech & Lending">FinTech &amp; Lending</option>
                      <option value="Clean Energy & Solar">Clean Energy &amp; Solar</option>
                      <option value="AgroVision">AgroVision</option>
                      <option value="Web3 & Identity">Web3 &amp; Identity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 block mb-1">LEAD STUDENT NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chioma Adeyemi"
                      value={form.lead_student}
                      onChange={(e) => setForm({ ...form, lead_student: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">TEAM CO-FOUNDERS (COMMA-SEPARATED)</label>
                    <input
                      type="text"
                      placeholder="e.g. Folake Adebisi, Kofi Mensah"
                      value={form.team_members}
                      onChange={(e) => setForm({ ...form, team_members: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">EXECUTIVE SUMMARY / DESCRIPTION</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Briefly explain what the product does and how it runs autonomously..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">CRITICAL PROBLEM SOLVED</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="What African or global economic bottleneck does this eliminate?"
                    value={form.problem_solved}
                    onChange={(e) => setForm({ ...form, problem_solved: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 block mb-1">FUNDING ASK (USD / BAACOIN)</label>
                    <input
                      type="number"
                      min="5000"
                      step="5000"
                      value={form.funding_ask_usd}
                      onChange={(e) => setForm({ ...form, funding_ask_usd: Number(e.target.value) })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">EQUITY &amp; REVENUE SHARE OFFERED (%)</label>
                    <input
                      type="number"
                      min="2"
                      max="30"
                      value={form.equity_offered_percent}
                      onChange={(e) => setForm({ ...form, equity_offered_percent: Number(e.target.value) })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition"
                  >
                    Submit Project for Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectsFundingPage;
