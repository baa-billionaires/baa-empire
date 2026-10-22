import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  Radio,
  Sparkles,
  TrendingUp,
  Share2,
  Globe2,
  Video,
  DollarSign,
  Users,
  CheckCircle,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Play,
  RotateCw
} from 'lucide-react';

export const OmniAdGrowthPage: React.FC = () => {
  const { omniAdCampaigns, profile } = useEcosystem();

  const [activeTab, setActiveTab] = useState<'campaigns' | 'adpool' | 'trainers'>('campaigns');
  const [selectedChannel, setSelectedChannel] = useState<string>('All');
  const [trainerSchoolName, setTrainerSchoolName] = useState('');
  const [trainerRole, setTrainerRole] = useState('School Principal / Owner');
  const [trainerCountry, setTrainerCountry] = useState('Nigeria');
  const [certificateIssued, setCertificateIssued] = useState(false);

  // Quick stats calculation
  const totalReach = omniAdCampaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalConversions = omniAdCampaigns.reduce((acc, c) => acc + c.conversions, 0);
  const totalDailyBudget = omniAdCampaigns.reduce((acc, c) => acc + c.daily_budget_usd, 0);

  const filteredCampaigns = selectedChannel === 'All'
    ? omniAdCampaigns
    : omniAdCampaigns.filter(c => c.channel.toLowerCase().includes(selectedChannel.toLowerCase()));

  const handleIssueTrainerCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainerSchoolName) return;
    setCertificateIssued(true);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-zinc-800 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Autonomous Self-Promotion &amp; Traffic Engine
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
            📡 Autonomous Omni-Ad Growth Swarm
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-3xl leading-relaxed">
            The world's first self-driving marketing swarm that autonomously promotes BAA student prompts, AI tools, and courses across Google, TikTok, X, and Decentralized phone nodes. Funded automatically through our Platform Revenue Share Ad Pool.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl shrink-0 text-xs font-mono overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'campaigns'
                ? 'bg-[#FFD700] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Live Omni-Ad Channels</span>
          </button>

          <button
            onClick={() => setActiveTab('adpool')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'adpool'
                ? 'bg-emerald-400 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Revenue Share Ad Pool</span>
          </button>

          <button
            onClick={() => setActiveTab('trainers')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeTab === 'trainers'
                ? 'bg-[#00D4FF] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Train-the-Trainers AI Hub</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Real-Time Live Campaign Telemetry Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">GLOBAL OMNI REACH</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                {(totalReach / 1000000).toFixed(2)}M
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">+24.5%</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">Live Impressions across 5 Channels</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">AUTONOMOUS CONVERSIONS</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-[#FFD700] font-mono">
                {totalConversions.toLocaleString()}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">100% Organic</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">Students &amp; Prompt Buyers Acquired</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">VIRAL CONTENT ENGINE</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-[#00D4FF] font-mono">
                84 Clips
              </span>
              <span className="text-xs text-purple-400 font-mono font-bold">Today</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">Auto-Rendered for TikTok &amp; YouTube Shorts</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-5">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">AD SWARM BUDGET</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                ${totalDailyBudget.toLocaleString()}
              </span>
              <span className="text-xs text-zinc-500 font-mono">/day</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1 block">Autonomously Funded from Commissions</span>
          </div>
        </div>

        {/* TAB 1: LIVE CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-400" />
                Live Multi-Channel Autonomous Ad Deployment
              </h2>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Auto-Bidding Engine Active</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map(camp => (
                <div
                  key={camp.id}
                  className="bg-zinc-950 border border-zinc-800/90 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {camp.channel}
                      </span>
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                        camp.status === 'scaling' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                        camp.status === 'active' ? 'bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        ● {camp.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">{camp.title}</h3>

                    <div className="p-3 bg-black/60 rounded-xl border border-zinc-800/80 font-mono text-[11px] text-zinc-400 space-y-1">
                      <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">AUTONOMOUS TRIGGER</span>
                      <p className="text-zinc-300">{camp.autonomous_trigger}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-3 font-mono text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-zinc-500 block">IMPRESSIONS</span>
                        <span className="text-white font-bold">{camp.impressions.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">CLICKS</span>
                        <span className="text-white font-bold">{camp.clicks.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">CTR</span>
                        <span className="text-emerald-400 font-bold">{camp.ctr}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block">AVG CPA</span>
                        <span className="text-[#FFD700] font-bold">${camp.cpa_usd.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400">Daily Allocation</span>
                      <span className="text-sm font-bold text-white">${camp.daily_budget_usd}/day</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PLATFORM REVENUE SHARE AD POOL */}
        {activeTab === 'adpool' && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                PERPETUAL FLYWHEEL ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
                How Platform Commissions Autonomously Fuel Free Student Traffic
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Traditional platforms keep 100% of marketplace fees as corporate profit. In the BAA Autonomous Educational Economy, <span className="text-[#FFD700] font-bold">15% of all marketplace transaction fees and enrollment fees are automatically locked into the Self-Driving Ad Pool</span>.
              </p>
            </div>

            {/* Visual Flywheel Flowchart */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center font-bold font-mono">1</div>
                <h4 className="text-sm font-bold text-white">Student Launches Prompt</h4>
                <p className="text-[11px] text-zinc-400">Student completes course capstone, packaging AI prompts into $49 listings (60% to student).</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center font-bold font-mono">2</div>
                <h4 className="text-sm font-bold text-white">Commission Inflow</h4>
                <p className="text-[11px] text-zinc-400">Platform receives 40% commission. 15% is autonomously redirected into the Ad Swarm Treasury.</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold font-mono">3</div>
                <h4 className="text-sm font-bold text-white">AI Bids Across Web</h4>
                <p className="text-[11px] text-zinc-400">Autonomous bidding bots purchase micro-ads on Google, TikTok, and X targeting buyers who need that exact prompt.</p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">4</div>
                <h4 className="text-sm font-bold text-white">Buyer Purchases &amp; Loops</h4>
                <p className="text-[11px] text-zinc-400">External buyers buy the student prompt. Student gets paid instantly in BaaCoin ($1.00 USD baseline).</p>
              </div>
            </div>

            {/* Live Pool Balance Box */}
            <div className="p-6 rounded-2xl bg-black border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  CURRENT AUTONOMOUS AD POOL TREASURY
                </span>
                <div className="text-3xl font-black text-emerald-400 font-mono">$184,250.00 USD</div>
                <span className="text-xs text-zinc-400">Disbursed over last 30 days: $48,000 across 124 student prompt campaigns</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert('Your student prompts are automatically enrolled in the Omni-Ad Promotion Pool!')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-black text-xs uppercase tracking-wider transition"
                >
                  Verify My Prompts In Ad Pool
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRAIN THE TRAINERS AI HUB */}
        {activeTab === 'trainers' && (
          <div className="space-y-8">
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-mono text-[#00D4FF] font-bold uppercase tracking-widest block">
                  GLOBAL TEACHER &amp; SCHOOL OWNER ACCREDITATION
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
                  🎓 Train-the-Trainers: Empowering Global Educators
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Our Multi-Lingual AI Tutors don't just teach students; they actively train school proprietors, college deans, and secondary school educators on how to integrate autonomous AI, Study-to-Earn student accounts, and Proof-of-Knowledge credentials into their own schools.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">1. Autonomous Curriculum</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    AI generates complete 16-week accredited syllabi tailored for African primary, secondary, or tertiary institutions.
                  </p>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 text-[#FFD700] flex items-center justify-center">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">2. Multi-Lingual AI Tutors</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Deploy 24/7 AI teaching assistants that converse fluently in English, Swahili, French, Yoruba, Hausa, Arabic, Spanish, Mandarin, and Portuguese.
                  </p>
                </div>

                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">3. ABAU Institution Seal</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Schools earn an on-chain Africa Blockchain &amp; AI University (ABAU) accreditation badge, increasing student enrollment value 10x.
                  </p>
                </div>
              </div>

              {/* Interactive School Accreditation Form */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-4">Request School Accreditation &amp; AI Faculty Onboarding</h3>
                <form onSubmit={handleIssueTrainerCertification} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-zinc-400 block mb-1">INSTITUTION / SCHOOL NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Greenwood Academy, Lagos"
                      value={trainerSchoolName}
                      onChange={(e) => setTrainerSchoolName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFD700]"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">YOUR ROLE</label>
                    <select
                      value={trainerRole}
                      onChange={(e) => setTrainerRole(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFD700]"
                    >
                      <option value="School Principal / Owner">School Principal / Owner</option>
                      <option value="University Dean / HOD">University Dean / HOD</option>
                      <option value="STEM / ICT Teacher">STEM / ICT Teacher</option>
                      <option value="Curriculum Director">Curriculum Director</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-400 block mb-1">COUNTRY</label>
                    <select
                      value={trainerCountry}
                      onChange={(e) => setTrainerCountry(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFD700]"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-[#00D4FF]/20"
                    >
                      Issue ABAU Accredited Educator License
                    </button>
                  </div>
                </form>

                {/* Certificate Preview on Submission */}
                {certificateIssued && (
                  <div className="mt-6 p-6 rounded-3xl bg-zinc-900 border-2 border-[#FFD700] text-center space-y-4 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] font-mono text-xs font-bold uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      ABAU Accredited Educational Institution
                    </div>
                    <h3 className="text-2xl font-heading font-black text-white">
                      {trainerSchoolName}
                    </h3>
                    <p className="text-xs text-zinc-300 max-w-lg mx-auto">
                      Certified to deploy the Billionaires AI Academy autonomous curriculum, Multi-Lingual AI Tutors, and Study-to-Earn (S2E) student accounts.
                    </p>
                    <div className="text-[11px] font-mono text-zinc-400 flex items-center justify-center gap-4">
                      <span>Accreditation ID: ABAU-INST-{Date.now().toString().slice(-6)}</span>
                      <span>•</span>
                      <span>Country: {trainerCountry}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">Status: Active &amp; Verified</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
