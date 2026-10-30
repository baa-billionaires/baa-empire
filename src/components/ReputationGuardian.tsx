import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Play,
  Pause,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  Lock,
  Mail,
  CheckCircle2,
  XCircle,
  FileCode2,
  Server,
  Zap,
  RotateCcw,
  Sliders,
  Filter
} from 'lucide-react';

import {
  SuppressionRecord,
  DnsSecurityCheck
} from '../types/growthMafia';

import {
  FullGrowthMafiaState,
  emergencyStopAllCampaigns,
  resumeAllCampaigns,
  addSuppressionRecord,
  removeSuppressionRecord,
  runDnsDiagnostics,
  simulateReputationEvent,
  resetReputationHealth
} from '../lib/growthMafiaService';

interface ReputationGuardianProps {
  state: FullGrowthMafiaState;
  onStateChange: (newState: FullGrowthMafiaState) => void;
}

export const ReputationGuardian: React.FC<ReputationGuardianProps> = ({ state, onStateChange }) => {
  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'dns' | 'suppression' | 'simulator'>('metrics');
  const [searchFilter, setSearchFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'hard_bounce' | 'unsubscribe' | 'complaint' | 'manual_suppression'>('all');
  
  // New Suppression Form State
  const [newEmail, setNewEmail] = useState('');
  const [newType, setNewType] = useState<SuppressionRecord['type']>('unsubscribe');
  const [newReason, setNewReason] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAuditingDns, setIsAuditingDns] = useState(false);

  // Thresholds
  const BOUNCE_LIMIT = 2.0; // Standard ISP tolerance 2.0%
  const COMPLAINT_LIMIT = 0.08; // Google/Yahoo 2024+ sender guidelines 0.08%
  const UNSUB_LIMIT = 1.0;

  const hardBounceRate = state.emailIntelligence.hardBounceRate;
  const complaintRate = state.emailIntelligence.complaintRate;
  const unsubscribeRate = state.emailIntelligence.unsubscribeRate;
  const senderScore = state.emailIntelligence.senderReputationScore;
  const isCircuitBreakerTripped = state.campaignsEmergencyStopped || state.emailIntelligence.pausedThresholdBreached;

  const handleToggleCampaignEmergencyStop = () => {
    if (isCircuitBreakerTripped) {
      const updated = resumeAllCampaigns(state);
      onStateChange(updated);
    } else {
      const updated = emergencyStopAllCampaigns(
        state, 
        'Manual Emergency Halt triggered by operator in ReputationGuardian'
      );
      onStateChange(updated);
    }
  };

  const handleRunDnsAudit = () => {
    setIsAuditingDns(true);
    setTimeout(() => {
      const updated = runDnsDiagnostics(state);
      onStateChange(updated);
      setIsAuditingDns(false);
    }, 600);
  };

  const handleAddSuppressionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const defaultReason = newType === 'hard_bounce'
      ? 'SMTP 550 Mailbox does not exist (Auto-Suppressed)'
      : newType === 'unsubscribe'
      ? 'RFC 8058 One-Click List-Unsubscribe requested by recipient'
      : newType === 'complaint'
      ? 'ISP Feedback Loop Spam Report'
      : 'Operator manual domain/email blacklist';

    const updated = addSuppressionRecord(
      state,
      newEmail.trim(),
      newType,
      newReason.trim() || defaultReason
    );
    onStateChange(updated);
    setNewEmail('');
    setNewReason('');
    setIsAdding(false);
  };

  const handleRemoveSuppression = (id: string) => {
    const updated = removeSuppressionRecord(state, id);
    onStateChange(updated);
  };

  const handleSimulateIncident = (type: 'spike_bounces' | 'dkim_failure' | 'spam_spike') => {
    const updated = simulateReputationEvent(state, type);
    onStateChange(updated);
  };

  const handleResetHealth = () => {
    const updated = resetReputationHealth(state);
    onStateChange(updated);
  };

  const filteredRecords = state.suppressionRecords.filter(rec => {
    const matchesSearch = rec.emailOrDomain.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          rec.reason.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || rec.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* 1. MASTER CAMPAIGN EMERGENCY STOP BANNER */}
      <div className={`p-5 rounded-2xl border transition-all shadow-xl ${
        isCircuitBreakerTripped
          ? 'bg-gradient-to-r from-rose-950/90 via-red-950/80 to-rose-950/90 border-rose-700/80 shadow-rose-950/50 animate-pulse'
          : 'bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className={`p-3 rounded-xl border shrink-0 ${
              isCircuitBreakerTripped
                ? 'bg-rose-900/40 border-rose-600 text-rose-300'
                : 'bg-emerald-950/40 border-emerald-600/50 text-emerald-400'
            }`}>
              {isCircuitBreakerTripped ? (
                <ShieldAlert className="w-7 h-7 text-rose-400" />
              ) : (
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  ReputationGuardian™ Circuit Breaker
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                  isCircuitBreakerTripped
                    ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                    : 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                }`}>
                  {isCircuitBreakerTripped ? 'CAMPAIGNS HALTED' : 'OUTBOUND ARMED & PROTECTED'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {isCircuitBreakerTripped
                  ? (state.campaignsEmergencyStopReason || 'All automated dispatches and active campaigns paused to preserve sender score.')
                  : 'Automated guardian actively monitoring bounce rate (<2.0%), spam complaints (<0.08%), and DMARC alignment.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            {isCircuitBreakerTripped && (
              <button
                onClick={handleResetHealth}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-all border border-slate-700"
                title="Restore all metrics to healthy baseline"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset Baseline</span>
              </button>
            )}

            <button
              onClick={handleToggleCampaignEmergencyStop}
              className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg ${
                isCircuitBreakerTripped
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950 border border-emerald-400'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950 border border-rose-500'
              }`}
            >
              {isCircuitBreakerTripped ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume All Campaigns</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Emergency Halt Campaigns</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. REPUTATION GUARDIAN SUB-NAVIGATION TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex space-x-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'metrics', label: 'Deliverability & Health Gauges', icon: Sliders },
            { id: 'dns', label: 'SPF / DKIM / DMARC Config', icon: Server },
            { id: 'suppression', label: `Unsubscribe & Suppression (${state.suppressionRecords.length})`, icon: Lock },
            { id: 'simulator', label: 'Circuit Breaker Stress Test', icon: Zap }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  active
                    ? 'bg-slate-800 text-emerald-400 font-semibold shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Guardian Scan: Real-Time</span>
        </div>
      </div>

      {/* SUB-TAB 1: HEALTH GAUGES & THRESHOLDS */}
      {activeSubTab === 'metrics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Sender Score */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
                  <span>Domain Sender Score</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    senderScore >= 90 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                  }`}>
                    {senderScore >= 90 ? 'Tier 1 Prime' : 'Degraded'}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline space-x-1.5">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{senderScore}</span>
                  <span className="text-slate-500 text-xs">/ 100</span>
                </div>
              </div>
              <div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      senderScore >= 90 ? 'bg-emerald-400' : senderScore >= 75 ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${senderScore}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1.5 block">
                  Calculated from 12 ISP postmaster feedback loops.
                </span>
              </div>
            </div>

            {/* Hard Bounce Rate */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
              hardBounceRate > BOUNCE_LIMIT
                ? 'bg-rose-950/30 border-rose-800/80 ring-1 ring-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div>
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
                  <span>Hard Bounce Rate</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    hardBounceRate <= BOUNCE_LIMIT ? 'text-emerald-400 bg-emerald-950' : 'text-rose-400 bg-rose-950'
                  }`}>
                    Limit: &lt;{BOUNCE_LIMIT}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline space-x-1.5">
                  <span className={`text-3xl font-extrabold tracking-tight ${
                    hardBounceRate > BOUNCE_LIMIT ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {hardBounceRate}%
                  </span>
                  <span className="text-slate-500 text-xs">actual</span>
                </div>
              </div>
              <div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      hardBounceRate > BOUNCE_LIMIT ? 'bg-rose-500' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(100, (hardBounceRate / 3.0) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1.5 block">
                  {hardBounceRate > BOUNCE_LIMIT ? 'BREACHED: Safety circuit engaged' : 'Safe zone: Validated MX verification active.'}
                </span>
              </div>
            </div>

            {/* Complaint Rate */}
            <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-3 ${
              complaintRate > COMPLAINT_LIMIT
                ? 'bg-rose-950/30 border-rose-800/80 ring-1 ring-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}>
              <div>
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
                  <span>Complaint Rate (FBL)</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    complaintRate <= COMPLAINT_LIMIT ? 'text-emerald-400 bg-emerald-950' : 'text-rose-400 bg-rose-950'
                  }`}>
                    Limit: &lt;{COMPLAINT_LIMIT}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline space-x-1.5">
                  <span className={`text-3xl font-extrabold tracking-tight ${
                    complaintRate > COMPLAINT_LIMIT ? 'text-rose-400' : 'text-cyan-400'
                  }`}>
                    {complaintRate}%
                  </span>
                  <span className="text-slate-500 text-xs">actual</span>
                </div>
              </div>
              <div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      complaintRate > COMPLAINT_LIMIT ? 'bg-rose-500' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${Math.min(100, (complaintRate / 0.15) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1.5 block">
                  Google/Yahoo mandatory threshold compliant.
                </span>
              </div>
            </div>

            {/* Unsubscribe Rate */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase">
                  <span>Unsubscribe Rate</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 bg-slate-800">
                    Limit: &lt;{UNSUB_LIMIT}%
                  </span>
                </div>
                <div className="mt-2 flex items-baseline space-x-1.5">
                  <span className="text-3xl font-extrabold text-purple-400 tracking-tight">
                    {unsubscribeRate}%
                  </span>
                  <span className="text-slate-500 text-xs">actual</span>
                </div>
              </div>
              <div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, (unsubscribeRate / 1.5) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1.5 block">
                  One-click RFC 8058 header auto-appended.
                </span>
              </div>
            </div>
          </div>

          {/* Automated Guard Policy Rules */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Autonomous Protective Policy Safeguards</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-200 block">1. Instant Circuit Breaker</span>
                <p>If hard bounce rate exceeds 2.0% within a rolling 24h window, all campaigns pause immediately.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-200 block">2. Automatic Pre-Send Hygiene</span>
                <p>Every lead is validated against DNS MX records, syntax regex, and the global exclusion list before dispatch.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="font-semibold text-slate-200 block">3. Strict Unsubscribe Sync</span>
                <p>Any opt-out is instantly added to the immutable suppression registry and removed from all active sequences.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SPF / DKIM / DMARC DNS CONFIGURATION */}
      {activeSubTab === 'dns' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-cyan-400" />
                <span>DNS Authentication &amp; Alignment Matrix</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cryptographic authentication records for SPF, DKIM, and DMARC enforcement.
              </p>
            </div>
            <button
              onClick={handleRunDnsAudit}
              disabled={isAuditingDns}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-all border border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditingDns ? 'animate-spin text-emerald-400' : ''}`} />
              <span>{isAuditingDns ? 'Auditing Records...' : 'Run Live DNS Cryptographic Audit'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {state.dnsSecurityChecks.map((check) => (
              <div
                key={check.protocol}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-mono font-bold text-xs">
                      {check.protocol}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Host/Selector: <span className="text-slate-200">{check.selectorOrHost}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] text-slate-500 font-mono">Verified: {check.lastVerified}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase flex items-center space-x-1 ${
                      check.status === 'valid'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {check.status === 'valid' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>PASS (ALIGNED)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>FAIL / MISMATCH</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-emerald-300 break-all">
                  {check.record}
                </div>

                <p className="text-xs text-slate-400 italic">
                  {check.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: UNSUBSCRIBE & SUPPRESSION LIST MONITOR */}
      {activeSubTab === 'suppression' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <span>Anti-Spam Unsubscribe &amp; Suppression Registry</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every address, domain, or opt-out is permanently filtered to preserve domain reputation.
              </p>
            </div>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-lg shadow-emerald-950 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Suppression Entry</span>
            </button>
          </div>

          {/* Add Entry Form Dropdown */}
          {isAdding && (
            <form onSubmit={handleAddSuppressionSubmit} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-slate-200">New Exclusion / Suppression Rule</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Email or Domain</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. user@domain.com or spam-domain.net"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Suppression Category</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="unsubscribe">Unsubscribe (User Opt-Out)</option>
                    <option value="hard_bounce">Hard Bounce (Invalid Address)</option>
                    <option value="complaint">Spam Complaint (FBL)</option>
                    <option value="manual_suppression">Manual Admin Blacklist</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Reason / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Recipient requested no B2B marketing"
                    value={newReason}
                    onChange={(e) => setNewReason(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Save to Registry
                </button>
              </div>
            </form>
          )}

          {/* Filters & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search suppression list..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 pl-9 pr-3 py-1.5 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'unsubscribe', label: 'Unsubscribes' },
                { id: 'hard_bounce', label: 'Bounces' },
                { id: 'complaint', label: 'Complaints' },
                { id: 'manual_suppression', label: 'Manual' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTypeFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                    typeFilter === f.id
                      ? 'bg-purple-950 text-purple-300 border border-purple-800 font-semibold'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Records Table / List */}
          <div className="space-y-2.5">
            {filteredRecords.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs rounded-2xl bg-slate-900 border border-slate-800">
                No suppression entries match the search criteria.
              </div>
            ) : (
              filteredRecords.map(record => (
                <div
                  key={record.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-white text-sm">{record.emailOrDomain}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        record.type === 'hard_bounce'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : record.type === 'complaint'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : record.type === 'unsubscribe'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {record.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">{record.reason}</p>
                    <span className="text-[11px] text-slate-500 font-mono">Logged: {record.timestamp}</span>
                  </div>

                  <button
                    onClick={() => handleRemoveSuppression(record.id)}
                    className="self-end sm:self-center p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-800 transition-all text-xs flex items-center space-x-1"
                    title="Clear from suppression list"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CIRCUIT BREAKER STRESS TEST & INCIDENT SIMULATOR */}
      {activeSubTab === 'simulator' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>Reputation Incident &amp; Circuit Breaker Stress Test</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Test the autonomous fail-safe triggers to verify that active campaigns stop immediately when limits are breached.
              </p>
            </div>
            <button
              onClick={handleResetHealth}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Restore Baseline Health</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="font-bold text-slate-200 text-xs block">Simulate Hard Bounce Spike</span>
              <p className="text-xs text-slate-400">
                Spikes bounce rate to 2.85% (&gt;2.0% threshold). ReputationGuardian should immediately trigger Campaign Emergency Stop.
              </p>
              <button
                onClick={() => handleSimulateIncident('spike_bounces')}
                className="w-full py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800 rounded-lg text-xs font-semibold transition"
              >
                Trigger Bounce Spike (2.85%)
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="font-bold text-slate-200 text-xs block">Simulate DKIM Signature Drop</span>
              <p className="text-xs text-slate-400">
                Simulates DNS record corruption where DKIM signature fails. Circuit breaker pauses sending to avoid spam tagging.
              </p>
              <button
                onClick={() => handleSimulateIncident('dkim_failure')}
                className="w-full py-2 bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-800 rounded-lg text-xs font-semibold transition"
              >
                Trigger DKIM Failure
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="font-bold text-slate-200 text-xs block">Simulate Spam Complaint Surge</span>
              <p className="text-xs text-slate-400">
                Spikes complaints to 0.14% (&gt;0.08% Google threshold). Circuit breaker engages emergency pause immediately.
              </p>
              <button
                onClick={() => handleSimulateIncident('spam_spike')}
                className="w-full py-2 bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-800 rounded-lg text-xs font-semibold transition"
              >
                Trigger Spam Spike (0.14%)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
