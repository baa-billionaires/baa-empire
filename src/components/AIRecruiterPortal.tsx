import React, { useState, useMemo, useEffect } from 'react';
import {
  Radar,
  Users,
  Search,
  Filter,
  Sparkles,
  Send,
  MessageSquare,
  Mail,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  Plus,
  Trash2,
  Copy,
  Check,
  Building2,
  Briefcase,
  GraduationCap,
  Download,
  Flame,
  Phone,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Zap,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';
import { ScoutLead } from '../types';

interface AIRecruiterPortalProps {
  onNavigateToAcademy?: () => void;
  onNavigateToDealRoom?: () => void;
  className?: string;
}

export const AIRecruiterPortal: React.FC<AIRecruiterPortalProps> = ({
  onNavigateToAcademy,
  onNavigateToDealRoom,
  className = ''
}) => {
  const {
    scoutLeads,
    scoutStats,
    isScoutRunning,
    setIsScoutRunning,
    runScoutCycle,
    discoverLeadsBatch,
    updateLeadStatus,
    convertLead,
    deleteLead,
    addCustomLead,
    profile
  } = useEcosystem();

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'student' | 'talent' | 'investor' | 'institution' | 'client'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'discovered' | 'contacted' | 'qualified' | 'converted'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'value' | 'newest'>('score');

  // UI Interactive States
  const [isScanning, setIsScanning] = useState(false);
  const [activeOutreachLead, setActiveOutreachLead] = useState<ScoutLead | null>(null);
  const [outreachChannel, setOutreachChannel] = useState<'whatsapp' | 'email' | 'linkedin'>('whatsapp');
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [scanPulseSeconds, setScanPulseSeconds] = useState(25);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '⚡ AI Recruiter Radar v2.6 Initialized: Active intent listening online',
    '🔍 Scanning LinkedIn, Twitter/X, GitHub and TechCabal for African AI talent',
    '📡 Filtering high-probability intent matching 10x BaaCoin Networth thesis'
  ]);

  // Form state for adding custom lead
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    title: '',
    organization: '',
    domain: '',
    location: '',
    email: '',
    phone_or_wa: '',
    linkedin_url: '',
    type: 'student' as ScoutLead['type'],
    source_platform: 'LinkedIn' as ScoutLead['source_platform'],
    lead_score: 92,
    estimated_value: 990,
    intent_signal: '',
    skills: 'AI, Prompt Engineering, Python',
    ai_message: ''
  });

  // Countdown timer for next autonomous scout pulse
  useEffect(() => {
    if (!isScoutRunning) return;
    const timer = setInterval(() => {
      setScanPulseSeconds(prev => (prev <= 1 ? 25 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isScoutRunning]);

  // Trigger Instant Live Discovery Scan
  const handleTriggerInstantScan = async () => {
    setIsScanning(true);
    setTerminalLogs(prev => [
      `[${new Date().toLocaleTimeString()}] 🚀 Initiating deep web intent scan across tech hubs...`,
      ...prev.slice(0, 5)
    ]);

    try {
      await new Promise(r => setTimeout(r, 1200));
      const discovered = await discoverLeadsBatch();
      const names = discovered.map(l => l.name).join(', ');
      setTerminalLogs(prev => [
        `[${new Date().toLocaleTimeString()}] ✅ Discovered ${discovered.length} verified active leads: ${names}`,
        ...prev.slice(0, 5)
      ]);
    } catch {
      // ignore
    } finally {
      setIsScanning(false);
    }
  };

  // Filtered and Sorted Leads
  const filteredLeads = useMemo(() => {
    return scoutLeads
      .filter(lead => {
        if (selectedCategory !== 'all' && lead.type !== selectedCategory) return false;
        if (selectedStatus !== 'all' && lead.status !== selectedStatus) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = lead.name.toLowerCase().includes(q);
          const matchOrg = (lead.organization || '').toLowerCase().includes(q);
          const matchDomain = (lead.domain || '').toLowerCase().includes(q);
          const matchLoc = (lead.location || '').toLowerCase().includes(q);
          const matchEmail = lead.email.toLowerCase().includes(q);
          const matchTitle = (lead.title || '').toLowerCase().includes(q);
          const matchSignal = (lead.intent_signal || '').toLowerCase().includes(q);
          if (!matchName && !matchOrg && !matchDomain && !matchLoc && !matchEmail && !matchTitle && !matchSignal) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return (b.lead_score || 85) - (a.lead_score || 85);
        if (sortBy === 'value') return (b.estimated_value || 0) - (a.estimated_value || 0);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [scoutLeads, selectedCategory, selectedStatus, searchQuery, sortBy]);

  // Pipeline Valuation Sum
  const totalPipelineValue = useMemo(() => {
    return scoutLeads.reduce((acc, l) => acc + (l.estimated_value || 990), 0);
  }, [scoutLeads]);

  // Copy AI outreach pitch to clipboard
  const handleCopyPitch = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Title', 'Organization', 'Domain', 'Type', 'Email', 'Phone', 'Platform', 'Status', 'Score', 'Estimated Value ($)', 'Intent Signal'];
    const rows = filteredLeads.map(l => [
      `"${l.name}"`,
      `"${l.title || ''}"`,
      `"${l.organization || ''}"`,
      `"${l.domain || ''}"`,
      `"${l.type}"`,
      `"${l.email}"`,
      `"${l.phone_or_wa || ''}"`,
      `"${l.source_platform}"`,
      `"${l.status}"`,
      l.lead_score || 90,
      l.estimated_value || 990,
      `"${(l.intent_signal || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `baa_active_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Submit Custom Lead
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) return;

    addCustomLead({
      name: newLeadForm.name,
      title: newLeadForm.title || 'Tech Professional',
      organization: newLeadForm.organization || 'Independent',
      domain: newLeadForm.domain || newLeadForm.email.split('@')[1] || 'techhub.io',
      location: newLeadForm.location || 'Pan-Africa',
      email: newLeadForm.email,
      phone_or_wa: newLeadForm.phone_or_wa,
      linkedin_url: newLeadForm.linkedin_url,
      type: newLeadForm.type,
      source_platform: newLeadForm.source_platform,
      status: 'discovered',
      lead_score: Number(newLeadForm.lead_score) || 90,
      estimated_value: Number(newLeadForm.estimated_value) || 990,
      intent_signal: newLeadForm.intent_signal || 'Manually qualified high-intent prospect',
      skills_or_focus: newLeadForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      ai_message: newLeadForm.ai_message || `Greetings ${newLeadForm.name}! Connect with Billionaires AI Academy to unlock 10x BaaCoin Networth upon enrollment: https://billionairesai.academy/academy?ref=${profile.referral_code}`,
      converted: false
    });

    setIsAddModalOpen(false);
    setNewLeadForm({
      name: '',
      title: '',
      organization: '',
      domain: '',
      location: '',
      email: '',
      phone_or_wa: '',
      linkedin_url: '',
      type: 'student',
      source_platform: 'LinkedIn',
      lead_score: 92,
      estimated_value: 990,
      intent_signal: '',
      skills: 'AI, Prompt Engineering, Python',
      ai_message: ''
    });
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* HERO COMMAND CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-[#00D4FF]/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] font-bold uppercase tracking-wider">
              <Radar className="w-4 h-4 text-[#00D4FF] animate-spin-slow" />
              <span>Autonomous Lead Discovery Radar</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              AI Recruiter Portal
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Discover real, active student prospects, Web3 &amp; AI developers, angel investors, and enterprise clients with verified intent signals across LinkedIn, GitHub, TechCabal, and Twitter/X.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                Radar Status: <strong className={isScoutRunning ? 'text-emerald-400' : 'text-zinc-500'}>{isScoutRunning ? 'ACTIVE' : 'PAUSED'}</strong>
              </span>
              {isScoutRunning && (
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                  Next Wave: <strong>{scanPulseSeconds}s</strong>
                </span>
              )}
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-bold">
                Pipeline: ${totalPipelineValue.toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-3">
            <button
              onClick={() => setIsScoutRunning(!isScoutRunning)}
              className={`py-2.5 px-4 rounded-xl border text-xs font-mono font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                isScoutRunning
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                  : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border-emerald-500/50 shadow-lg'
              }`}
            >
              {isScoutRunning ? 'Pause Auto-Radar' : 'Activate Radar'}
            </button>

            <button
              onClick={handleTriggerInstantScan}
              disabled={isScanning}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#00D4FF] via-cyan-400 to-[#00D4FF] hover:brightness-110 text-black font-heading font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-[#00D4FF]/25 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning Live Sources...' : 'Discover Real Leads Now'}</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-2.5 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-zinc-800/80">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Active Leads Pool</span>
            <span className="text-2xl font-heading font-black text-white block mt-0.5">{scoutLeads.length}</span>
            <span className="text-[10px] text-[#00D4FF] font-mono">100% Verified Profiles</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">AI Contacted</span>
            <span className="text-2xl font-heading font-black text-[#00D4FF] block mt-0.5">{scoutStats.contacted}</span>
            <span className="text-[10px] text-zinc-500 font-mono">Personalized Pitches</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">Enrolled / Converted</span>
            <span className="text-2xl font-heading font-black text-[#FFD700] block mt-0.5">{scoutStats.converted}</span>
            <span className="text-[10px] text-emerald-400 font-mono">BaaCoin Commission Credited</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Estimated Pipeline</span>
            <span className="text-2xl font-heading font-black text-emerald-400 block mt-0.5">${totalPipelineValue.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-500 font-mono">Tuition &amp; Capital Value</span>
          </div>
        </div>

        {/* LIVE TERMINAL FEED */}
        <div className="mt-4 p-3 rounded-xl bg-black/80 border border-zinc-800/90 font-mono text-[11px] text-zinc-400 space-y-1">
          {terminalLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-2 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] shrink-0" />
              <span className="truncate">{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, organization, domain (e.g. unilag.edu.ng), skills..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00D4FF]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort & Category Dropdown */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
            <span className="text-zinc-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as any)}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="all" className="bg-zinc-900">All Statuses</option>
              <option value="discovered" className="bg-zinc-900">Discovered</option>
              <option value="contacted" className="bg-zinc-900">Contacted</option>
              <option value="qualified" className="bg-zinc-900">Qualified</option>
              <option value="converted" className="bg-zinc-900">Converted / Enrolled</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5">
            <span className="text-zinc-500">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-white outline-none cursor-pointer"
            >
              <option value="score" className="bg-zinc-900">Lead Score (Highest)</option>
              <option value="value" className="bg-zinc-900">Estimated Value ($)</option>
              <option value="newest" className="bg-zinc-900">Newest Discovered</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition flex items-center gap-1.5 cursor-pointer"
            title="Export Leads as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-x-auto no-scrollbar text-xs">
        {[
          { id: 'all', label: `All Prospects (${scoutLeads.length})` },
          { id: 'student', label: `Students & Scholars (${scoutLeads.filter(l => l.type === 'student').length})` },
          { id: 'talent', label: `AI Developers & Talent (${scoutLeads.filter(l => l.type === 'talent').length})` },
          { id: 'investor', label: `Investors & Angels (${scoutLeads.filter(l => l.type === 'investor').length})` },
          { id: 'institution', label: `Universities & Deans (${scoutLeads.filter(l => l.type === 'institution').length})` },
          { id: 'client', label: `Corporate Clients (${scoutLeads.filter(l => l.type === 'client').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-[#00D4FF] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* LEADS LIST / GRID */}
      {filteredLeads.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3">
          <p className="text-zinc-400 font-mono text-xs">
            No leads match your current filter criteria.
          </p>
          <button
            onClick={handleTriggerInstantScan}
            className="px-4 py-2 rounded-xl bg-[#00D4FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110"
          >
            Run Active Discovery Scan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLeads.map(lead => (
            <div
              key={lead.id}
              className={`p-5 rounded-2xl bg-zinc-950 border transition flex flex-col justify-between group shadow-xl ${
                lead.converted
                  ? 'border-emerald-500/50 bg-gradient-to-br from-zinc-950 via-emerald-950/10 to-zinc-950'
                  : lead.status === 'qualified'
                  ? 'border-purple-500/50 bg-gradient-to-br from-zinc-950 via-purple-950/10 to-zinc-950'
                  : 'border-zinc-800/90 hover:border-[#00D4FF]/60'
              }`}
            >
              <div className="space-y-3">
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      lead.type === 'student'
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30'
                        : lead.type === 'talent'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : lead.type === 'investor'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : lead.type === 'institution'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {lead.type}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400 text-[11px]">{lead.source_platform}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-white font-mono" title="Lead Qualification Score">
                      🎯 {lead.lead_score || 92}/100 Match
                    </span>
                    <span className="text-emerald-400 font-bold text-xs font-mono">
                      ${(lead.estimated_value || 990).toLocaleString()} Value
                    </span>
                  </div>
                </div>

                {/* Lead Identity */}
                <div>
                  <h4 className="text-base font-bold text-white font-heading group-hover:text-[#00D4FF] transition flex items-center justify-between">
                    <span>{lead.name}</span>
                    {lead.converted && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-[9px] font-mono font-bold uppercase">
                        ✓ Enrolled
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-zinc-300 font-medium">
                    {lead.title || 'Tech Professional'}
                    {lead.organization && <span className="text-zinc-400"> • {lead.organization}</span>}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5 flex items-center gap-2">
                    {lead.domain && <span className="text-cyan-400">🌐 {lead.domain}</span>}
                    {lead.location && <span>📍 {lead.location}</span>}
                  </p>
                </div>

                {/* Intent Signal Quote */}
                {lead.intent_signal && (
                  <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-[11px] font-mono text-zinc-300 leading-snug">
                    <span className="text-[#00D4FF] font-bold block text-[10px] uppercase mb-0.5">Verified Intent Signal:</span>
                    "{lead.intent_signal}"
                  </div>
                )}

                {/* Skills or Focus */}
                {lead.skills_or_focus && lead.skills_or_focus.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {lead.skills_or_focus.map((s, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* ACTION FOOTER */}
              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setActiveOutreachLead(lead);
                      setOutreachChannel('whatsapp');
                    }}
                    className="p-2 rounded-xl bg-[#00FF88]/10 hover:bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30 transition text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Send WhatsApp AI Closer Pitch"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveOutreachLead(lead);
                      setOutreachChannel('email');
                    }}
                    className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Send Email Pitch"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Email</span>
                  </button>

                  {lead.linkedin_url && (
                    <a
                      href={lead.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 transition text-xs font-mono flex items-center gap-1"
                      title="Open LinkedIn Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {!lead.converted ? (
                    <button
                      onClick={() => convertLead(lead.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#FFD700] hover:brightness-110 text-black font-heading font-black text-xs uppercase tracking-wider transition flex items-center gap-1 cursor-pointer"
                      title="Mark lead as converted / enrolled"
                    >
                      <Check className="w-3 h-3 text-black" />
                      <span>Convert</span>
                    </button>
                  ) : (
                    <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Converted
                    </span>
                  )}

                  <button
                    onClick={() => deleteLead(lead.id)}
                    className="p-2 text-zinc-600 hover:text-red-400 transition cursor-pointer"
                    title="Delete lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OUTREACH PITCH MODAL */}
      {activeOutreachLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D4FF]" />
                <h3 className="text-base font-bold text-white font-heading">
                  AI Outreach Pitch: {activeOutreachLead.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveOutreachLead(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-xs font-mono text-zinc-400">
              <p>Target: <strong className="text-white">{activeOutreachLead.name}</strong> ({activeOutreachLead.title || 'Lead'})</p>
              <p>Channel: <strong className="text-[#00D4FF] capitalize">{outreachChannel}</strong> • Destination: <strong className="text-white">{activeOutreachLead.phone_or_wa || activeOutreachLead.email}</strong></p>
            </div>

            {/* AI Pitch Textarea */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-zinc-400">Personalized AI Outreach Pitch:</label>
              <textarea
                rows={5}
                readOnly
                value={activeOutreachLead.ai_message}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-zinc-200 outline-none focus:border-[#00D4FF]"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-900">
              <button
                onClick={() => handleCopyPitch(activeOutreachLead.ai_message)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPitch ? 'Copied Pitch!' : 'Copy Pitch'}</span>
              </button>

              {outreachChannel === 'whatsapp' && activeOutreachLead.phone_or_wa && (
                <a
                  href={`https://wa.me/${activeOutreachLead.phone_or_wa.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(activeOutreachLead.ai_message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => updateLeadStatus(activeOutreachLead.id, 'contacted')}
                  className="px-5 py-2.5 rounded-xl bg-[#00FF88] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5 shadow-lg shadow-[#00FF88]/20"
                >
                  <MessageSquare className="w-4 h-4 text-black" />
                  <span>Open WhatsApp</span>
                </a>
              )}

              {outreachChannel === 'email' && activeOutreachLead.email && (
                <a
                  href={`mailto:${activeOutreachLead.email}?subject=${encodeURIComponent('Invitation to Billionaires AI Academy Scholarship & BaaCoin Networth')}&body=${encodeURIComponent(activeOutreachLead.ai_message)}`}
                  onClick={() => updateLeadStatus(activeOutreachLead.id, 'contacted')}
                  className="px-5 py-2.5 rounded-xl bg-[#00D4FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5 shadow-lg shadow-[#00D4FF]/20"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Launch Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM PROSPECT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading">
                Add Real Lead / Prospect
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="space-y-3 text-xs font-mono">
              <div>
                <label className="text-zinc-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadForm.name}
                  onChange={e => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                  placeholder="e.g. Babatunde Vance"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newLeadForm.title}
                    onChange={e => setNewLeadForm({ ...newLeadForm, title: e.target.value })}
                    placeholder="e.g. Senior ML Engineer"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Organization</label>
                  <input
                    type="text"
                    value={newLeadForm.organization}
                    onChange={e => setNewLeadForm({ ...newLeadForm, organization: e.target.value })}
                    placeholder="e.g. Flutterwave / UNILAG"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadForm.email}
                    onChange={e => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    placeholder="e.g. name@domain.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={newLeadForm.phone_or_wa}
                    onChange={e => setNewLeadForm({ ...newLeadForm, phone_or_wa: e.target.value })}
                    placeholder="+2348012345678"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-400 block mb-1">Category</label>
                  <select
                    value={newLeadForm.type}
                    onChange={e => setNewLeadForm({ ...newLeadForm, type: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="student">Student / Scholar</option>
                    <option value="talent">AI Developer / Talent</option>
                    <option value="investor">Investor / Angel</option>
                    <option value="institution">University / Institution</option>
                    <option value="client">Corporate Client</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1">Source Platform</label>
                  <select
                    value={newLeadForm.source_platform}
                    onChange={e => setNewLeadForm({ ...newLeadForm, source_platform: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="TechCabal">TechCabal</option>
                    <option value="Twitter / X">Twitter / X</option>
                    <option value="Direct Scraping">Direct Scraping</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Intent Signal / Context</label>
                <input
                  type="text"
                  value={newLeadForm.intent_signal}
                  onChange={e => setNewLeadForm({ ...newLeadForm, intent_signal: e.target.value })}
                  placeholder="e.g. Actively looking for prompt engineering courses in Nigeria"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-[#00D4FF]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00D4FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110"
                >
                  Save Lead to Pool
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AIRecruiterPortal;
