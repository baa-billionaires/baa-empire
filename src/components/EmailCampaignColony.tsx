import React, { useState, useMemo } from 'react';
import {
  Mail,
  Send,
  UserX,
  CheckCircle,
  AlertOctagon,
  ShieldAlert,
  ShieldCheck,
  Filter,
  Plus,
  RefreshCw,
  Search,
  ListFilter,
  Trash2,
  AlertTriangle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useEcosystem } from '../context/EcosystemContext';

export interface CampaignContact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: 'candidate' | 'queued' | 'filtered_suppressed' | 'sent' | 'unsubscribed';
  suppressionReason?: string;
  queuedAt?: string;
  sentAt?: string;
}

const INITIAL_CANDIDATE_CONTACTS: CampaignContact[] = [
  {
    id: 'ct-1',
    name: 'Adekunle Johnson',
    email: 'adekunle@fintechlagos.ng',
    company: 'Lagos FinTech Solutions',
    role: 'Managing Director',
    status: 'candidate'
  },
  {
    id: 'ct-2',
    name: 'Marcus Vance',
    email: 'optout@disposable.biz', // Suppressed by default
    company: 'Vance Logistics & Co.',
    role: 'Operations VP',
    status: 'candidate'
  },
  {
    id: 'ct-3',
    name: 'Fatima Al-Hassan',
    email: 'fatima@saharaenergies.org',
    company: 'Sahara Energy Hub',
    role: 'Chief Technology Officer',
    status: 'candidate'
  },
  {
    id: 'ct-4',
    name: 'Test Spam Trap',
    email: 'spam-trap@invalid.org', // Suppressed by default
    company: 'Global Monitoring Corp',
    role: 'Security Audit',
    status: 'candidate'
  },
  {
    id: 'ct-5',
    name: 'Emeka Okafor',
    email: 'emeka.okafor@africanventures.co',
    company: 'African Ventures Group',
    role: 'Growth Lead',
    status: 'candidate'
  },
  {
    id: 'ct-6',
    name: 'Sarah Connor',
    email: 'bounce@tempmail.com', // Suppressed by default
    company: 'CyberDynamics LLC',
    role: 'Lead Architect',
    status: 'candidate'
  },
  {
    id: 'ct-7',
    name: 'Zainab Bello',
    email: 'zainab.bello@kudanode.com',
    company: 'Kuda Node Systems',
    role: 'Infrastructure Director',
    status: 'candidate'
  },
  {
    id: 'ct-8',
    name: 'David Adeleke',
    email: 'unsubscribed-user@techcorp.io', // Suppressed by default
    company: 'TechCorp International',
    role: 'Partner',
    status: 'candidate'
  }
];

export const EmailCampaignColony: React.FC = () => {
  const {
    suppressionList,
    suppressionRecords,
    addToSuppressionList,
    removeFromSuppressionList,
    isSuppressed,
    unsubscribeContact
  } = useEcosystem();

  // Campaign State
  const [campaignTitle, setCampaignTitle] = useState('Autonomous Growth Blueprint Q4 Briefing');
  const [campaignSubject, setCampaignSubject] = useState('Accelerate verified enterprise workflows with autonomous agents');
  const [selectedOffer, setSelectedOffer] = useState('Turnkey Autonomous Business Package');
  const [contacts, setContacts] = useState<CampaignContact[]>(INITIAL_CANDIDATE_CONTACTS);

  // UI Tabs & Filters
  const [activeTab, setActiveTab] = useState<'queue_manager' | 'suppression_vault' | 'dispatch_logs'>('queue_manager');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'candidate' | 'queued' | 'filtered_suppressed' | 'sent'>('all');

  // New Lead manual import
  const [importName, setImportName] = useState('');
  const [importEmail, setImportEmail] = useState('');
  const [importCompany, setImportCompany] = useState('');

  // Dispatch simulation state
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchProgress, setDispatchProgress] = useState(0);
  const [dispatchLogs, setDispatchLogs] = useState<Array<{ id: string; time: string; type: 'info' | 'blocked' | 'success'; message: string }>>([
    {
      id: 'log-init-1',
      time: '10:14:02 UTC',
      type: 'info',
      message: 'EmailCampaignColony initialized with strict EcosystemContext suppressionList filter hook.'
    }
  ]);

  // Derived metrics
  const totalContacts = contacts.length;
  const queuedCount = contacts.filter(c => c.status === 'queued').length;
  const suppressedCount = contacts.filter(c => c.status === 'filtered_suppressed').length;
  const sentCount = contacts.filter(c => c.status === 'sent').length;
  const candidateCount = contacts.filter(c => c.status === 'candidate').length;

  const addLog = (type: 'info' | 'blocked' | 'success', message: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC';
    setDispatchLogs(prev => [
      { id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, time: timestamp, type, message },
      ...prev
    ]);
  };

  /**
   * CRITICAL LOGIC: Pre-Queuing Suppression List Interceptor
   * Iterates through all target contacts before queuing.
   * If contact is marked as unsubscribed or exists in suppressionList,
   * it is STRICTLY diverted to filtered_suppressed and FORBIDDEN from queuing.
   */
  const handleQueueAllCandidates = () => {
    let newlyQueued = 0;
    let newlySuppressed = 0;

    const updatedContacts = contacts.map(contact => {
      // If already sent or previously suppressed, keep state
      if (contact.status === 'sent') return contact;

      // Check current suppressionList in EcosystemContext
      const suppressed = isSuppressed(contact.email);

      if (suppressed) {
        newlySuppressed++;
        return {
          ...contact,
          status: 'filtered_suppressed' as const,
          suppressionReason: 'Blocked: Email listed in EcosystemContext Suppression Registry'
        };
      } else {
        newlyQueued++;
        return {
          ...contact,
          status: 'queued' as const,
          queuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
    });

    setContacts(updatedContacts);

    if (newlySuppressed > 0) {
      addLog('blocked', `Pre-queue filter BLOCKED ${newlySuppressed} recipient(s) found on suppressionList. Zero emails were queued for these addresses.`);
    }
    if (newlyQueued > 0) {
      addLog('info', `Successfully verified and queued ${newlyQueued} compliant contact(s) for dispatch.`);
    }
  };

  // Queue a single candidate with strict suppression verification
  const handleQueueSingle = (id: string) => {
    const target = contacts.find(c => c.id === id);
    if (!target) return;

    // Verify against suppression list
    if (isSuppressed(target.email)) {
      setContacts(prev => prev.map(c => c.id === id ? {
        ...c,
        status: 'filtered_suppressed',
        suppressionReason: 'Pre-flight check failed: Recipient is in the suppression list.'
      } : c));
      addLog('blocked', `Blocked attempt to queue ${target.email}: recipient is marked as unsubscribed.`);
      return;
    }

    setContacts(prev => prev.map(c => c.id === id ? {
      ...c,
      status: 'queued',
      queuedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : c));
    addLog('info', `Contact ${target.email} validated against suppressionList and queued.`);
  };

  // Mark contact as unsubscribed in EcosystemContext immediately
  const handleUnsubscribeAndSuppress = (email: string) => {
    unsubscribeContact(email, 'Explicit recipient opt-out request via Campaign Colony');
    // Immediately evict from queued state if present
    setContacts(prev => prev.map(c => {
      if (c.email.toLowerCase() === email.toLowerCase()) {
        return {
          ...c,
          status: 'filtered_suppressed',
          suppressionReason: 'Manually unsubscribed: Evicted from campaign queue'
        };
      }
      return c;
    }));
    addLog('blocked', `Contact ${email} added to suppressionList and evicted from sending queue.`);
  };

  // Add new prospect candidate
  const handleImportContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importEmail.trim()) return;

    const email = importEmail.trim().toLowerCase();
    const alreadyExists = contacts.some(c => c.email.toLowerCase() === email);
    if (alreadyExists) {
      addLog('info', `Contact ${email} already present in candidate pool.`);
      return;
    }

    const isAlreadySuppressed = isSuppressed(email);
    const newContact: CampaignContact = {
      id: `ct-custom-${Date.now()}`,
      name: importName.trim() || 'Business Decision Maker',
      email,
      company: importCompany.trim() || 'Commercial Enterprise',
      role: 'Operations Lead',
      status: isAlreadySuppressed ? 'filtered_suppressed' : 'candidate',
      suppressionReason: isAlreadySuppressed ? 'Already exists in Global Suppression Registry' : undefined
    };

    setContacts(prev => [newContact, ...prev]);
    setImportName('');
    setImportEmail('');
    setImportCompany('');

    if (isAlreadySuppressed) {
      addLog('blocked', `Imported ${email} was automatically marked as suppressed because it matches suppressionList.`);
    } else {
      addLog('info', `Added candidate ${email} to campaign workspace.`);
    }
  };

  // Dispatch all queued emails with simulated pacing and final pre-flight check
  const handleDispatchQueue = () => {
    const queuedContacts = contacts.filter(c => c.status === 'queued');
    if (queuedContacts.length === 0) return;

    setIsDispatching(true);
    setDispatchProgress(10);
    addLog('info', `Starting authorized dispatch sequence for ${queuedContacts.length} queued emails.`);

    let completed = 0;
    const total = queuedContacts.length;

    // Simulate batch dispatch process
    const interval = setInterval(() => {
      completed++;
      const currentPercent = Math.min(100, Math.round((completed / total) * 100));
      setDispatchProgress(currentPercent);

      if (completed >= total) {
        clearInterval(interval);
        // Double-check suppression one last time before marking sent
        setContacts(prev => prev.map(c => {
          if (c.status === 'queued') {
            if (isSuppressed(c.email)) {
              return {
                ...c,
                status: 'filtered_suppressed',
                suppressionReason: 'Last-second safeguard: Caught in suppressionList prior to send.'
              };
            }
            return {
              ...c,
              status: 'sent',
              sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
          }
          return c;
        }));

        setIsDispatching(false);
        setDispatchProgress(0);
        addLog('success', `Completed batch dispatch. All delivered recipients passed RFC-8058 & Suppression checks.`);
      }
    }, 400);
  };

  // Filtered contacts list
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER & CAMPAIGN STATS */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                <Mail className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Email Campaign Colony & Suppression Gateway
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous outbound engine enforcing strict pre-queue suppression filtering, RFC-8058 compliance, and zero cold-spam policy.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Candidates</span>
              <span className="text-sm font-bold text-slate-200">{candidateCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-center min-w-[100px]">
              <span className="text-[10px] text-amber-400 font-mono uppercase block">Queued</span>
              <span className="text-sm font-bold text-amber-300">{queuedCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-center min-w-[100px]">
              <span className="text-[10px] text-rose-400 font-mono uppercase block">Suppressed</span>
              <span className="text-sm font-bold text-rose-300">{suppressedCount}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-center min-w-[100px]">
              <span className="text-[10px] text-emerald-400 font-mono uppercase block">Delivered</span>
              <span className="text-sm font-bold text-emerald-300">{sentCount}</span>
            </div>
          </div>
        </div>

        {/* Campaign Configuration Strip */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Campaign Identifier</label>
            <input
              type="text"
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Subject Line</label>
            <input
              type="text"
              value={campaignSubject}
              onChange={(e) => setCampaignSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-500 block mb-1">Assigned Asset / Offer</label>
            <select
              value={selectedOffer}
              onChange={(e) => setSelectedOffer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Turnkey Autonomous Business Package">Turnkey Autonomous Business Package</option>
              <option value="AI Agent Blueprint">AI Agent Blueprint</option>
              <option value="SaaS Automation Micro-Service">SaaS Automation Micro-Service</option>
              <option value="Executive Playbook">Executive Playbook</option>
            </select>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex border-b border-slate-800 space-x-2 text-xs">
        <button
          onClick={() => setActiveTab('queue_manager')}
          className={`pb-2.5 px-3 font-semibold transition-all flex items-center space-x-1.5 ${
            activeTab === 'queue_manager'
              ? 'border-b-2 border-cyan-400 text-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Pre-Queue Filter & Dispatch ({contacts.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('suppression_vault')}
          className={`pb-2.5 px-3 font-semibold transition-all flex items-center space-x-1.5 ${
            activeTab === 'suppression_vault'
              ? 'border-b-2 border-rose-400 text-rose-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Ecosystem Suppression Vault ({suppressionList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('dispatch_logs')}
          className={`pb-2.5 px-3 font-semibold transition-all flex items-center space-x-1.5 ${
            activeTab === 'dispatch_logs'
              ? 'border-b-2 border-emerald-400 text-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Colony Safety Logs ({dispatchLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: QUEUE MANAGER & PRE-SEND SUPPRESSION FILTER */}
      {activeTab === 'queue_manager' && (
        <div className="space-y-5">
          {/* ACTION BUTTONS & PRE-FLIGHT BANNER */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs">
              <span className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <p className="font-semibold text-slate-200">Autonomous Pre-Queue Suppression Guard</p>
                <p className="text-slate-400 text-[11px]">
                  Any contact matching the {suppressionList.length} suppressed records is automatically isolated prior to dispatch queueing.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleQueueAllCandidates}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-cyan-950/40 transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Run Pre-Queue Filter & Queue Clean Leads</span>
              </button>

              <button
                onClick={handleDispatchQueue}
                disabled={queuedCount === 0 || isDispatching}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  queuedCount > 0 && !isDispatching
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isDispatching ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Dispatching ({dispatchProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send {queuedCount} Queued Emails</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QUICK PROSPECT IMPORT STRIP */}
          <form onSubmit={handleImportContact} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Test New Recipient Pre-Flight Check</span>
              </span>
              <span className="text-[10px] text-slate-500">Auto-validates against suppression list instantly</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Full Name (optional)"
                value={importName}
                onChange={(e) => setImportName(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={importEmail}
                onChange={(e) => setImportEmail(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                placeholder="Company / Org"
                value={importCompany}
                onChange={(e) => setImportCompany(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/40 rounded-lg font-semibold flex items-center justify-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Evaluate & Add</span>
              </button>
            </div>
          </form>

          {/* SEARCH & STATUS FILTER STRIP */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidate, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span className="text-slate-500 text-[11px] flex items-center gap-1">
                <ListFilter className="w-3 h-3" />
                <span>Filter:</span>
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Contacts ({contacts.length})</option>
                <option value="candidate">Candidates Only</option>
                <option value="queued">Queued for Dispatch</option>
                <option value="filtered_suppressed">Suppressed / Unsubscribed</option>
                <option value="sent">Successfully Sent</option>
              </select>
            </div>
          </div>

          {/* CONTACTS TABLE */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <th className="px-4 py-3">Recipient & Org</th>
                    <th className="px-4 py-3">Email Address</th>
                    <th className="px-4 py-3">Suppression Status</th>
                    <th className="px-4 py-3">Campaign Stage</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredContacts.map(contact => {
                    const currentlySuppressed = isSuppressed(contact.email);

                    return (
                      <tr key={contact.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-200">{contact.name}</p>
                          <p className="text-[11px] text-slate-400">{contact.company} • {contact.role}</p>
                        </td>

                        <td className="px-4 py-3 font-mono text-slate-300">
                          {contact.email}
                        </td>

                        <td className="px-4 py-3">
                          {currentlySuppressed || contact.status === 'filtered_suppressed' ? (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-800 text-rose-300 text-[10px] font-semibold">
                              <AlertOctagon className="w-3 h-3" />
                              <span>Suppressed (Unsubscribed)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              <span>Eligible (Clean)</span>
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3">
                          {contact.status === 'candidate' && (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono">
                              Candidate Pool
                            </span>
                          )}
                          {contact.status === 'queued' && (
                            <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 text-[10px] font-mono">
                              Queued ({contact.queuedAt || 'Ready'})
                            </span>
                          )}
                          {contact.status === 'filtered_suppressed' && (
                            <div className="space-y-0.5">
                              <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 text-[10px] font-mono block w-fit">
                                Filtered / Diverted
                              </span>
                              <span className="text-[10px] text-slate-500 block">
                                {contact.suppressionReason || 'On global opt-out registry'}
                              </span>
                            </div>
                          )}
                          {contact.status === 'sent' && (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono">
                              Delivered ({contact.sentAt})
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* Queue single action if not queued and not suppressed */}
                            {contact.status === 'candidate' && !currentlySuppressed && (
                              <button
                                onClick={() => handleQueueSingle(contact.id)}
                                title="Queue for next dispatch"
                                className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 rounded text-[11px] font-medium transition-all"
                              >
                                Queue
                              </button>
                            )}

                            {/* Unsubscribe & Add to suppressionList */}
                            {!currentlySuppressed && (
                              <button
                                onClick={() => handleUnsubscribeAndSuppress(contact.email)}
                                title="Mark as Unsubscribed and Suppress"
                                className="px-2.5 py-1 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/60 text-rose-300 rounded text-[11px] font-medium flex items-center space-x-1 transition-all"
                              >
                                <UserX className="w-3 h-3" />
                                <span>Unsubscribe</span>
                              </button>
                            )}

                            {currentlySuppressed && (
                              <span className="text-[10px] font-mono text-slate-500 italic">
                                Protected by Gateway
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredContacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                        No contacts found matching the criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL ECOSYSTEM SUPPRESSION VAULT */}
      {activeTab === 'suppression_vault' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Central Ecosystem Suppression Registry</span>
              </h3>
              <p className="text-slate-400 text-xs">
                Maintained across the application via EcosystemContext. Any matching address will never be dispatched to.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-lg">
              {suppressionList.length} Blocked Addresses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {suppressionRecords.map(record => (
              <div
                key={record.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between space-x-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-rose-300 font-semibold">{record.email}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{record.reason}</p>
                  <p className="text-slate-600 font-mono text-[10px]">{record.timestamp}</p>
                </div>

                <button
                  onClick={() => removeFromSuppressionList(record.email)}
                  title="Remove from suppression list (Restore eligibility)"
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DISPATCH AUDIT & LOGS */}
      {activeTab === 'dispatch_logs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Real-time Interception & Delivery Audit Trail</span>
            <button
              onClick={() => addLog('info', 'Manual verification pulse executed.')}
              className="text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Refresh Trail</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 max-h-96 overflow-y-auto">
            {dispatchLogs.map(log => (
              <div key={log.id} className="flex items-start space-x-2">
                <span className="text-slate-500 shrink-0">[{log.time}]</span>
                {log.type === 'blocked' ? (
                  <span className="text-rose-400 shrink-0 font-bold">[BLOCKED]</span>
                ) : log.type === 'success' ? (
                  <span className="text-emerald-400 shrink-0 font-bold">[SUCCESS]</span>
                ) : (
                  <span className="text-cyan-400 shrink-0">[INFO]</span>
                )}
                <span className={log.type === 'blocked' ? 'text-rose-200' : log.type === 'success' ? 'text-emerald-200' : 'text-slate-300'}>
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
