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
  X,
  Building2,
  Landmark,
  CheckCheck,
  Lock,
  MessageSquare,
  Send,
  Eye
} from 'lucide-react';
import { MicroStartupSwarm } from '../types';
import { useNavigation } from '../context/NavigationContext';

export const ProjectsFundingPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const {
    projectProposals,
    backProjectWithBaaCoin,
    approveProjectFunding,
    submitProjectProposal,
    wallet,
    isAdmin,
    microStartups,
    profile
  } = useEcosystem();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhase, setSelectedPhase] = useState<string>('All');
  const [selectedHub, setSelectedHub] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [backingModalProject, setBackingModalProject] = useState<ProjectProposal | null>(null);
  const [backingAmount, setBackingAmount] = useState<number>(250);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Venture Dashboard & Direct Message Pipeline Modal State
  const [dashboardStartup, setDashboardStartup] = useState<MicroStartupSwarm | null>(null);
  const [messagingTarget, setMessagingTarget] = useState<{
    id: string;
    name: string;
    type: 'startup' | 'proposal';
    founder: string;
    hub?: string;
    isVerified?: boolean;
    cacNumber?: string;
  } | null>(null);

  const [messageForm, setMessageForm] = useState({
    senderName: profile?.full_name || 'Verified Investor',
    senderEmail: profile?.email || 'investor@billionairesai.academy',
    subject: '',
    proposalType: isAdmin ? 'Official Admin Term Sheet & Tranche Disbursement' : 'Angel Investment & Co-Sponsorship Proposal',
    trancheAmountUsd: 25000,
    messageBody: ''
  });

  const [isAngelNetworkModalOpen, setIsAngelNetworkModalOpen] = useState(false);
  const [isSmartContractModalOpen, setIsSmartContractModalOpen] = useState(false);

  const AFRICAN_HUBS = [
    'All',
    'Lagos Hub',
    'Port Harcourt Hub',
    'Abuja Hub',
    'Nairobi Hub',
    'Accra Hub',
    'Johannesburg Hub'
  ];

  const ANGEL_NETWORKS = [
    {
      name: 'Synergy African Angels & Ventures Platform',
      hub: 'Lagos & London',
      membersCount: 84,
      avgCheck: '$25,000 - $100,000',
      focus: 'Autonomous Legal AI & FinTech Underwriting',
      directUrl: 'https://synergyangels.africa',
      verifiedPortfolio: ['LegalEase Africa AI', 'Paystack Ecosystem Swarms']
    },
    {
      name: 'RichConnect Angel Syndicate',
      hub: 'Pan-African & Diaspora',
      membersCount: 68,
      avgCheck: '$15,000 - $75,000',
      focus: 'Multi-Lingual NLP & Global Trade Escrows',
      directUrl: 'https://richconnect.angels/portfolio',
      verifiedPortfolio: ['Nollywood Voice Studio', 'BAA Shoppers Network']
    },
    {
      name: 'Base L2 Ecosystem Innovation Syndicate',
      hub: 'Global Web3 & Base Chain',
      membersCount: 64,
      avgCheck: '$50,000 - $250,000',
      focus: 'Decentralized Compute & Smart Contracts',
      directUrl: 'https://base.org/ecosystem',
      verifiedPortfolio: ['UADC Sovereign Node Mesh', 'Base L2 Cert Inscriber']
    },
    {
      name: 'East African Tech Angel Network',
      hub: 'Nairobi & Kigali',
      membersCount: 52,
      avgCheck: '$20,000 - $60,000',
      focus: 'AgroVision & Computer Vision Hardware',
      directUrl: 'https://eastafricanangels.org',
      verifiedPortfolio: ['AgroScanner Vision & Drone Mesh']
    },
    {
      name: 'UAIDC Clean Power & Compute Guild',
      hub: 'Port Harcourt & South-South',
      membersCount: 45,
      avgCheck: '$30,000 - $120,000',
      focus: 'Clean Solar Energy & 2,400 GPU Phone Nodes',
      directUrl: 'https://billionairesai.academy/#uadc-lab',
      verifiedPortfolio: ['Port Harcourt Hydro-Solar Compute Grid']
    },
    {
      name: 'Southern African Diaspora Angel Collective',
      hub: 'Johannesburg & Cape Town',
      membersCount: 30,
      avgCheck: '$25,000 - $80,000',
      focus: 'Autonomous Micro-Startups & EdTech',
      directUrl: 'https://africaninvestors.network',
      verifiedPortfolio: ['ABAU Global Tutors', 'Enterprise Deal Closers']
    }
  ];

  const EQUITY_SMART_CONTRACTS = [
    {
      venture: 'LegalEase Africa AI',
      contractAddress: '0x71c8a392b44c10283f98c21a37829100fa1b392e',
      network: 'Base L2 Mainnet (ChainID: 8453)',
      cacNumber: 'RC: 1948201',
      wemaStatus: 'Verified Corporate Settlement Account (Acct: 0284910283)',
      equityRoyalty: '8% On-Chain Auto-Royalty',
      status: 'Audited & Active'
    },
    {
      venture: 'Port Harcourt Hydro-Solar Compute Grid & UADC Mesh',
      contractAddress: '0xb44c91f4a9831002bf092837418291048201fa92',
      network: 'Base L2 Mainnet (ChainID: 8453)',
      cacNumber: 'BN: UY/009049',
      wemaStatus: 'Verified Merchant Vault (Acct: 0129482711)',
      equityRoyalty: '12% On-Chain Auto-Royalty',
      status: 'Audited & Active'
    },
    {
      venture: 'AgroScanner Vision & Drone Mesh',
      contractAddress: '0x3841fb20a94b8102d9a3857b291a4b8301ec9481',
      network: 'Base L2 Mainnet (ChainID: 8453)',
      cacNumber: 'BN: KD/384910',
      wemaStatus: 'Escrow Under Review',
      equityRoyalty: '10% On-Chain Auto-Royalty',
      status: 'Testnet Deployed'
    },
    {
      venture: 'Nollywood & Pan-African Voice Studio',
      contractAddress: '0x9482a17cb49a0293d8471b028471038491028371',
      network: 'Base L2 Mainnet (ChainID: 8453)',
      cacNumber: 'GH-CS/094821',
      wemaStatus: 'Cross-Border Escrow',
      equityRoyalty: '7% On-Chain Auto-Royalty',
      status: 'Testnet Deployed'
    }
  ];

  // Handler for direct message & proposal submission
  const handleSendMessageOrProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messagingTarget || !messageForm.subject || !messageForm.messageBody) return;

    if (isAdmin) {
      setActionSuccessMsg(
        `🏛️ [ADMIN DISPATCH AUTHORIZED]: Official Term Sheet & Grant Proposal for $${messageForm.trancheAmountUsd.toLocaleString()} USD successfully routed to ${messagingTarget.name} executive board and logged to CAC & Wema Bank audit registry.`
      );
    } else {
      setActionSuccessMsg(
        `✉️ Proposal & Direct Message for "${messagingTarget.name}" has been securely transmitted to founder (${messagingTarget.founder}). Official institutional funding release is forwarded to Academy Admin for final seal.`
      );
    }

    setMessagingTarget(null);
    setMessageForm({
      senderName: profile?.full_name || 'Verified Investor',
      senderEmail: profile?.email || 'investor@billionairesai.academy',
      subject: '',
      proposalType: isAdmin ? 'Official Admin Term Sheet & Tranche Disbursement' : 'Angel Investment & Co-Sponsorship Proposal',
      trancheAmountUsd: 25000,
      messageBody: ''
    });

    setTimeout(() => setActionSuccessMsg(null), 7000);
  };

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

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('deal-room')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#00D4FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>BAA Global Deal Room &amp; AI Funding Exchange™</span>
            </button>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Project Proposal</span>
            </button>
          </div>
        </div>

        {/* Global Deal Room & Funding Exchange Announcement Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-[#FFD700]/30 p-6 md:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold">
                <Landmark className="w-3.5 h-3.5" />
                <span>NEW SOVEREIGN MODULE • BAA GLOBAL DEAL ROOM &amp; AI FUNDING EXCHANGE™</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
                Discover Opportunities. Build Relationships. <span className="text-[#FFD700]">Secure Real Deals.</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Connect your AI venture to 6 unified opportunity engines: Global AI &amp; Software Contracts, Grants &amp; Innovation Programmes, Equipment &amp; Project Loans, Angel &amp; VC Equity, Cloud &amp; Compute Credits, and Corporate Partnerships. Backed by a 12-agent Autonomous Discovery Swarm.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => navigateTo('deal-room')}
                className="px-6 py-3.5 rounded-2xl bg-[#FFD700] hover:bg-amber-400 text-black font-heading font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#FFD700]/25 flex items-center justify-center gap-2 group"
              >
                <span>Enter Deal Room</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
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
          <div
            onClick={() => setSelectedHub('All')}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#00D4FF]/60 transition cursor-pointer group"
          >
            <span className="text-[10px] text-zinc-500 uppercase flex items-center justify-between">
              <span>VENTURE PIPELINE</span>
              <span className="text-[#00D4FF] group-hover:underline">6 Hubs →</span>
            </span>
            <div className="text-2xl font-heading font-black text-white mt-1">
              4 Micro-Startups
            </div>
            <span className="text-[10px] text-[#00D4FF]">Across 6 African hubs</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">CAPITAL BACKED</span>
            <div className="text-2xl font-heading font-black text-[#FFD700] mt-1">
              130,700 BAA
            </div>
            <span className="text-[10px] text-zinc-300">≈ $133,314 USD</span>
          </div>

          <div
            onClick={() => setIsAngelNetworkModalOpen(true)}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-emerald-500/60 transition cursor-pointer group"
          >
            <span className="text-[10px] text-zinc-500 uppercase flex items-center justify-between">
              <span>COMMUNITY BACKERS</span>
              <span className="text-emerald-400 group-hover:underline">View 343 →</span>
            </span>
            <div className="text-2xl font-heading font-black text-emerald-400 mt-1">
              343 Angels
            </div>
            <span className="text-[10px] text-zinc-400">Direct link to their network &amp; others</span>
          </div>

          <div
            onClick={() => setIsSmartContractModalOpen(true)}
            className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/60 transition cursor-pointer group"
          >
            <span className="text-[10px] text-zinc-500 uppercase flex items-center justify-between">
              <span>FUNDING APPROVED</span>
              <span className="text-purple-400 group-hover:underline">Inspect On-Chain →</span>
            </span>
            <div className="text-2xl font-heading font-black text-purple-400 mt-1">
              2 Ventures
            </div>
            <span className="text-[10px] text-emerald-400">CAC &amp; Wema Bank Verified</span>
          </div>
        </div>

        {/* 4 Micro-Startups Across 6 African Hubs Showcase */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950 border border-zinc-800 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>4 MICRO-STARTUPS ACROSS 6 AFRICAN HUBS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                Direct Venture Links, Verified Pipelines &amp; Autonomous Dashboards
              </h2>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Lagos • Port Harcourt • Abuja • Nairobi • Accra • Johannesburg — Capital Backed: <strong className="text-[#FFD700]">130,700 BAA</strong> (≈ <strong className="text-white">$133,314 USD</strong>) with <strong className="text-emerald-400">343 Angels</strong> &amp; Direct Equity Smart Contracts.
              </p>
            </div>

            {/* Hub Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="text-[10px] text-zinc-500 uppercase mr-1">HUB:</span>
              {AFRICAN_HUBS.map(hub => (
                <button
                  key={hub}
                  onClick={() => setSelectedHub(hub)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                    selectedHub === hub
                      ? 'bg-[#00D4FF] text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {hub.replace(' Hub', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Micro-Startups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {microStartups
              .filter(s => selectedHub === 'All' || s.hub?.includes(selectedHub) || s.hubs?.includes(selectedHub))
              .map((startup) => {
                const isApprovedVenture = startup.wema_verified && startup.cac_number;

                return (
                  <div
                    key={startup.id}
                    className="p-6 rounded-2xl bg-black/60 border border-zinc-800 hover:border-[#00D4FF]/40 transition space-y-5 flex flex-col justify-between group shadow-xl"
                  >
                    <div className="space-y-3">
                      {/* Hub Badge & Verification Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30 font-bold flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {startup.hub || 'Pan-African Hub'}
                        </span>

                        {isApprovedVenture ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            CAC &amp; Wema Bank Verified
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                            Base L2 Smart Contract Deployed
                          </span>
                        )}
                      </div>

                      {/* Startup Name & Origin */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading font-black text-white text-lg group-hover:text-[#00D4FF] transition">
                            {startup.name}
                          </h3>
                          {startup.direct_url && (
                            <a
                              href={startup.direct_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-400 hover:text-[#00D4FF] p-1.5 rounded-lg bg-zinc-900 transition flex items-center gap-1 text-[11px] font-mono"
                              title="Direct External Link"
                            >
                              <span>Direct Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs font-mono text-zinc-400 mt-1">
                          Founder: <strong className="text-zinc-200">{startup.student_creator}</strong>
                        </p>
                        <p className="text-[11px] font-mono text-zinc-500 mt-0.5 italic">
                          "{startup.prompt_origin_title}"
                        </p>
                      </div>

                      {/* Operational Telemetry Matrix */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 font-mono text-xs">
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase block">VALUATION</span>
                          <span className="font-bold text-white">${startup.valuation_usd.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase block">MRR</span>
                          <span className="font-bold text-emerald-400">${startup.mrr_usd.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase block">GROWTH</span>
                          <span className="font-bold text-[#FFD700]">{startup.growth_rate}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-zinc-500 uppercase block">AGENTS</span>
                          <span className="font-bold text-[#00D4FF]">{startup.agents_deployed} Swarm</span>
                        </div>
                      </div>

                      {/* Autonomous Status & CAC */}
                      <div className="p-3 bg-black/40 rounded-xl border border-zinc-900 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-500">Autonomous Status:</span>
                          <span className="text-zinc-300 font-semibold">{startup.autonomous_status}</span>
                        </div>
                        {startup.cac_number && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-500">Corporate Registration:</span>
                            <span className="text-emerald-400 font-bold">{startup.cac_number}</span>
                          </div>
                        )}
                        {startup.equity_contract_address && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-zinc-500">Equity Smart Contract:</span>
                            <span className="text-purple-400 font-mono">
                              {startup.equity_contract_address.slice(0, 8)}...{startup.equity_contract_address.slice(-6)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Pipeline: Dashboards & Direct Messaging */}
                    <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-2.5 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        {/* Clickable Venture Dashboard */}
                        <button
                          type="button"
                          onClick={() => setDashboardStartup(startup)}
                          className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition flex items-center gap-1.5 border border-zinc-700"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#00D4FF]" />
                          <span>Venture Dashboard</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Direct Message & Proposal Dispatch */}
                        <button
                          type="button"
                          onClick={() => setMessagingTarget({
                            id: startup.id,
                            name: startup.name,
                            type: 'startup',
                            founder: startup.student_creator,
                            hub: startup.hub,
                            isVerified: startup.wema_verified,
                            cacNumber: startup.cac_number
                          })}
                          className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 text-xs shadow-md ${
                            isAdmin
                              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{isAdmin ? 'Admin Term Sheet' : 'Direct Message'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-[#00D4FF]/10 text-[#00D4FF] font-bold border border-[#00D4FF]/30">
                        {p.category}
                      </span>
                      {p.hub_location && (
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px]">
                          {p.hub_location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {p.cac_number && p.wema_verified && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          CAC &amp; Wema Verified
                        </span>
                      )}
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-bold ${
                          isApproved
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        ● {p.development_phase}
                      </span>
                    </div>
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
                    {/* Direct Message & Proposal Dispatch */}
                    <button
                      type="button"
                      onClick={() => setMessagingTarget({
                        id: p.id,
                        name: p.title,
                        type: 'proposal',
                        founder: p.lead_student,
                        hub: p.hub_location,
                        isVerified: p.wema_verified,
                        cacNumber: p.cac_number
                      })}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition flex items-center gap-1.5 text-xs font-bold"
                      title="Direct Message / Submit Proposal"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#00D4FF]" />
                      <span>{isAdmin ? 'Admin Term Sheet' : 'Direct Message'}</span>
                    </button>

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

        {/* Venture Dashboard Modal */}
        {dashboardStartup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-zinc-950 border border-[#00D4FF]/60 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6 animate-fade-in font-mono text-xs">
              <button
                type="button"
                onClick={() => setDashboardStartup(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF]">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-[#00D4FF] uppercase tracking-widest font-bold">
                      AUTONOMOUS VENTURE DASHBOARD
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 text-[10px]">
                      {dashboardStartup.hub || 'Pan-African Hub'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-heading font-black text-white">
                    {dashboardStartup.name}
                  </h2>
                </div>
              </div>

              {/* Verified CAC & Wema Bank Compliance Strip */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                    LEGAL &amp; BANKING VERIFICATION:
                  </span>
                  {dashboardStartup.wema_verified ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      CAC &amp; Wema Bank Verified
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                      Base L2 Smart Contract Inscribed
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300 pt-1">
                  <div>
                    <span className="text-zinc-500">CAC Number: </span>
                    <strong className="text-white">{dashboardStartup.cac_number || 'Corporate Filing Pending'}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500">Settlement Vault: </span>
                    <strong className="text-emerald-400">
                      {dashboardStartup.wema_verified ? 'Wema Bank ALAT Corporate Vault' : 'Base L2 Multi-Sig'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Core Financial & Swarm Telemetry */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-[9px] text-zinc-500 uppercase block">VALUATION</span>
                  <div className="text-lg font-bold text-white mt-0.5">
                    ${dashboardStartup.valuation_usd.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-[9px] text-zinc-500 uppercase block">MONTHLY MRR</span>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">
                    ${dashboardStartup.mrr_usd.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-[9px] text-zinc-500 uppercase block">GROWTH RATE</span>
                  <div className="text-lg font-bold text-[#FFD700] mt-0.5">
                    {dashboardStartup.growth_rate}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/60 border border-zinc-800">
                  <span className="text-[9px] text-zinc-500 uppercase block">ACTIVE AGENTS</span>
                  <div className="text-lg font-bold text-[#00D4FF] mt-0.5">
                    {dashboardStartup.agents_deployed} Swarm
                  </div>
                </div>
              </div>

              {/* Operations & Equity Smart Contract */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-black/40 border border-zinc-900">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">
                    AUTONOMOUS SYSTEM STATUS:
                  </span>
                  <p className="text-xs text-zinc-200">
                    {dashboardStartup.autonomous_status}
                  </p>
                </div>

                {dashboardStartup.equity_contract_address && (
                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-purple-400 uppercase font-bold block">
                        DIRECT EQUITY SMART CONTRACT (BASE L2):
                      </span>
                      <span className="text-xs text-white font-mono">
                        {dashboardStartup.equity_contract_address}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(dashboardStartup.equity_contract_address || '');
                        setActionSuccessMsg(`Contract address copied: ${dashboardStartup.equity_contract_address}`);
                        setTimeout(() => setActionSuccessMsg(null), 3000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-[10px] font-bold"
                    >
                      Copy
                    </button>
                  </div>
                )}

                {/* Backers & VC Syndicates */}
                {dashboardStartup.venture_capital_backers && (
                  <div className="p-3 rounded-xl bg-black/40 border border-zinc-900 space-y-1.5">
                    <span className="text-[10px] text-zinc-500 uppercase block">
                      VENTURE CAPITAL &amp; ANGEL SYNDICATE BACKERS ({dashboardStartup.angel_backers_count || 64} Angels):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dashboardStartup.venture_capital_backers.map((vc, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-300 text-[10px] border border-zinc-800"
                        >
                          {vc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                {dashboardStartup.direct_url && (
                  <a
                    href={dashboardStartup.direct_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition flex items-center gap-1.5"
                  >
                    <span>Visit Live Venture Link</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#00D4FF]" />
                  </a>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const st = dashboardStartup;
                      setDashboardStartup(null);
                      setMessagingTarget({
                        id: st.id,
                        name: st.name,
                        type: 'startup',
                        founder: st.student_creator,
                        hub: st.hub,
                        isVerified: st.wema_verified,
                        cacNumber: st.cac_number
                      });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Message &amp; Proposal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Direct Message & Proposal Dispatch Modal */}
        {messagingTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-xl bg-zinc-950 border border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6 animate-fade-in font-mono text-xs">
              <button
                type="button"
                onClick={() => setMessagingTarget(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isAdmin ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300' : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                }`}>
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${
                    isAdmin ? 'text-purple-400' : 'text-emerald-400'
                  }`}>
                    {isAdmin ? 'ADMIN OFFICIAL DISPATCH PIPELINE' : 'DIRECT VENTURE PIPELINE'}
                  </span>
                  <h3 className="text-xl font-heading font-black text-white">
                    Send to: {messagingTarget.name}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Founder: {messagingTarget.founder} {messagingTarget.hub && `• ${messagingTarget.hub}`}
                  </p>
                </div>
              </div>

              {/* Admin vs Community Notification */}
              {isAdmin ? (
                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-purple-200 text-[11px] leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-purple-300">
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Admin Grant Tranche Authorization Active</span>
                  </div>
                  <p>
                    As Academy Administrator, your dispatched proposal transmits verified term sheets and automatically prepares CAC filing documentation and Wema Bank settlement release.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] leading-relaxed space-y-1">
                  <p>
                    Note: Direct proposals and messages are transmitted to the venture founding team. Formal institutional funding approvals and official bank tranche releases are executed only by the Administrator.
                  </p>
                </div>
              )}

              <form onSubmit={handleSendMessageOrProposal} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 block mb-1">YOUR IDENTITY / SENDER</label>
                    <input
                      type="text"
                      required
                      value={messageForm.senderName}
                      onChange={e => setMessageForm({ ...messageForm, senderName: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">PROPOSAL CATEGORY</label>
                    <select
                      value={messageForm.proposalType}
                      onChange={e => setMessageForm({ ...messageForm, proposalType: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-400"
                    >
                      {isAdmin ? (
                        <>
                          <option value="Official Admin Term Sheet & Tranche Disbursement">
                            Official Admin Term Sheet &amp; Tranche Disbursement
                          </option>
                          <option value="CAC & Wema Bank Compliance Audit Notice">
                            CAC &amp; Wema Bank Compliance Audit Notice
                          </option>
                          <option value="Grant Milestone Completion Certification">
                            Grant Milestone Completion Certification
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="Angel Investment & Co-Sponsorship Proposal">
                            Angel Investment &amp; Co-Sponsorship Proposal
                          </option>
                          <option value="Commercial Enterprise Pilot Inquiry">
                            Commercial Enterprise Pilot Inquiry
                          </option>
                          <option value="Strategic Advisory & Mentorship Offer">
                            Strategic Advisory &amp; Mentorship Offer
                          </option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 block mb-1">PROPOSAL SUBJECT</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seed Grant Milestone 1 Disbursement Notice"
                      value={messageForm.subject}
                      onChange={e => setMessageForm({ ...messageForm, subject: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">PROPOSED TRANCHE (USD)</label>
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      value={messageForm.trancheAmountUsd}
                      onChange={e => setMessageForm({ ...messageForm, trancheAmountUsd: Number(e.target.value) })}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">PROPOSAL TERMS / DIRECT MESSAGE BODY</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify the milestone requirements, Base L2 escrow hash, or partnership terms..."
                    value={messageForm.messageBody}
                    onChange={e => setMessageForm({ ...messageForm, messageBody: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white outline-none focus:border-emerald-400 font-mono text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setMessagingTarget(null)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 shadow-lg ${
                      isAdmin
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-emerald-500/20'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAdmin ? 'Dispatch Admin Proposal' : 'Transmit Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 343 Angels Community Backers Network Modal */}
        {isAngelNetworkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-zinc-950 border border-emerald-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6 animate-fade-in font-mono text-xs">
              <button
                type="button"
                onClick={() => setIsAngelNetworkModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                    COMMUNITY ANGEL SYNDICATE DIRECTORY
                  </span>
                  <h3 className="text-2xl font-heading font-black text-white">
                    343 Angels with Direct Links to Their Networks
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Capital Backed: <strong className="text-[#FFD700]">130,700 BAA</strong> (≈ <strong className="text-white">$133,314 USD</strong>) via Direct Equity Smart Contracts on Base L2.
                  </p>
                </div>
              </div>

              {/* Angel Syndicates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
                {ANGEL_NETWORKS.map((net, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm">{net.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        {net.membersCount} Angels
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-zinc-300">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Hub:</span>
                        <span>{net.hub}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Check Size:</span>
                        <span className="text-[#FFD700] font-bold">{net.avgCheck}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Focus:</span>
                        <span className="text-[#00D4FF]">{net.focus}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500">
                        {net.verifiedPortfolio.join(', ')}
                      </span>
                      <a
                        href={net.directUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold transition flex items-center gap-1"
                      >
                        <span>Direct Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsAngelNetworkModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Direct Equity Smart Contracts Registry Modal */}
        {isSmartContractModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-zinc-950 border border-purple-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 space-y-6 animate-fade-in font-mono text-xs">
              <button
                type="button"
                onClick={() => setIsSmartContractModalOpen(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                    ON-CHAIN VENTURE REGISTRY
                  </span>
                  <h3 className="text-2xl font-heading font-black text-white">
                    Direct Equity Smart Contracts (Base L2)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    2 Ventures with Funding Approved • CAC &amp; Wema Bank Verified • Immutable Revenue Shares
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                {EQUITY_SMART_CONTRACTS.map((contract, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">{contract.venture}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          {contract.cacNumber}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                        {contract.status}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 font-mono text-[11px] text-purple-300 flex items-center justify-between">
                      <span>Contract: {contract.contractAddress}</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(contract.contractAddress);
                          setActionSuccessMsg(`Copied address for ${contract.venture}`);
                          setTimeout(() => setActionSuccessMsg(null), 3000);
                        }}
                        className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white text-[10px]"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-zinc-400">
                      <div>
                        <span className="text-zinc-500 block text-[10px]">NETWORK:</span>
                        <span className="text-zinc-200">{contract.network}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">ROYALTY SHARE:</span>
                        <span className="text-emerald-400 font-bold">{contract.equityRoyalty}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">SETTLEMENT:</span>
                        <span className="text-white">{contract.wemaStatus}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsSmartContractModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectsFundingPage;
