import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
  Paperclip,
  ExternalLink,
  Plus,
  Search,
  Check,
  Calendar,
  Archive,
  RefreshCw,
  Copy,
  UserCheck,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Lock,
  ArrowRight
} from 'lucide-react';
import {
  InstitutionProfile,
  EngagementThread,
  EngagementMessage,
  OpportunityRecord,
  AuditLogEntry
} from '../../types/dealRoom';

interface InstitutionalCommandCentreProps {
  institutions: InstitutionProfile[];
  threads: EngagementThread[];
  opportunities: OpportunityRecord[];
  onApproveAndSendMessage: (threadId: string, messageId: string, adminName: string) => void;
  onCreateDraft: (institutionId: string, subject: string, body: string, attachments: string[]) => void;
  onRecordReply: (threadId: string, replyText: string) => void;
  onScheduleFollowUp: (threadId: string, followUpDate: string) => void;
  onArchiveThread: (threadId: string) => void;
  auditLogs: AuditLogEntry[];
  currentAdminName?: string;
}

export const InstitutionalCommandCentre: React.FC<InstitutionalCommandCentreProps> = ({
  institutions,
  threads,
  opportunities,
  onApproveAndSendMessage,
  onCreateDraft,
  onRecordReply,
  onScheduleFollowUp,
  onArchiveThread,
  auditLogs,
  currentAdminName = 'SuperAdmin Tariq'
}) => {
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>(institutions[0]?.id || '');
  const [selectedThreadId, setSelectedThreadId] = useState<string>(threads[0]?.id || '');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Draft Form State
  const [isComposing, setIsComposing] = useState(false);
  const [draftSubject, setDraftSubject] = useState('');
  const [draftBody, setDraftBody] = useState('');
  const [draftAttachments, setDraftAttachments] = useState<string[]>(['BAA_Enterprise_Capabilities_Brief_2026.pdf']);
  const [newAttachmentInput, setNewAttachmentInput] = useState('');

  // Reply Recording State
  const [replyInput, setReplyInput] = useState('');
  const [isRecordingReply, setIsRecordingReply] = useState(false);

  // Follow-up Date State
  const [followUpDateInput, setFollowUpDateInput] = useState('');
  const [isSchedulingFollowUp, setIsSchedulingFollowUp] = useState(false);

  // Copy-ready toast
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const selectedInstitution = institutions.find(i => i.id === selectedInstitutionId) || institutions[0];
  const activeThread = threads.find(t => t.id === selectedThreadId) || threads.find(t => t.institutionId === selectedInstitution?.id) || threads[0];

  // Relevant opportunities for selected institution
  const relevantOpportunities = opportunities.filter(o => 
    o.providerName.toLowerCase().includes(selectedInstitution?.name.toLowerCase()) ||
    selectedInstitution?.eligibleSectors.some(s => o.sector.toLowerCase().includes(s.toLowerCase()))
  );

  const filteredInstitutions = institutions.filter(inst => {
    const matchesType = filterType === 'all' || inst.type === filterType;
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inst.headquarters.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopyReady = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftSubject.trim() || !draftBody.trim()) return;

    onCreateDraft(selectedInstitution.id, draftSubject.trim(), draftBody.trim(), draftAttachments);
    setIsComposing(false);
    setDraftSubject('');
    setDraftBody('');
  };

  const handleAddAttachment = () => {
    if (!newAttachmentInput.trim()) return;
    setDraftAttachments(prev => [...prev, newAttachmentInput.trim()]);
    setNewAttachmentInput('');
  };

  const handlePreloadTemplate = (type: 'enquiry' | 'proposal' | 'funding_request') => {
    if (type === 'enquiry') {
      setDraftSubject(`Formal Pre-Qualification Inquiry — ${selectedInstitution.name} BAA Consortium`);
      setDraftBody(`Dear ${selectedInstitution.name} Secretariat,\n\nWe are writing on behalf of Billionaire AI Academy (BAA) and our autonomous technology consortium. We have reviewed your published procurement notices and request formal guidelines on pre-qualification procedures for multilingual AI infrastructure.\n\nOur verified technical teams possess audited track records across Pan-African jurisdictions.\n\nWe look forward to your confirmation.\n\nSincerely,\nBAA Institutional Engagement Board`);
    } else if (type === 'proposal') {
      setDraftSubject(`Commercial Partnership & AI Distribution Proposal — BAA Academy`);
      setDraftBody(`Dear Partnership Committee at ${selectedInstitution.name},\n\nBAA proposes a strategic AI technology and educational content partnership to distribute localized neural tutoring tools and smart node infrastructure to your constituent enterprise network.\n\nAttached is our technical specification and revenue-sharing framework for review.\n\nWarm regards,\nBAA Venture Operations Director`);
    } else {
      setDraftSubject(`Grant Milestone & AI Research Facility Application — ${selectedInstitution.name}`);
      setDraftBody(`Dear Grants Board,\n\nWe hereby submit the formal grant allocation proposal for our sovereign AI mobile node cluster and student research incubator.\n\nAll prerequisite technical deliverables and smart contract verifications have been completed.\n\nRespectfully,\nBAA Principal Investigator`);
    }
  };

  return (
    <div className="space-y-4">
      {/* SECURITY & ADMIN ROLE NOTICE */}
      <div className="p-3.5 rounded-xl bg-zinc-950 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-emerald-400">
          <Lock className="w-4 h-4" />
          <span className="font-bold">ADMINISTRATIVE OUTREACH GATEWAY</span>
          <span className="text-zinc-500">• Operator: {currentAdminName}</span>
        </div>
        <div className="text-zinc-400 text-[11px] hidden sm:block">
          All external institutional communications require explicit review & two-party audit logging
        </div>
      </div>

      {/* THREE-PANEL MESSAGING WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[680px]">
        {/* ======================================================== */}
        {/* LEFT PANEL: ORGANISATIONS & CONVERSATION QUEUE (3.5 cols) */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
          {/* Header & Filter */}
          <div className="p-4 border-b border-zinc-800 space-y-3 bg-zinc-950/60">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#FFD700]" />
                <span>Institutions & Providers</span>
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                {institutions.length}
              </span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search organisations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar text-[10px]">
              {['all', 'corporate_buyer', 'grant_foundation', 'venture_capital', 'cloud_hyperscaler'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2 py-1 rounded whitespace-nowrap transition font-mono ${
                    filterType === t
                      ? 'bg-[#FFD700] text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Directory List */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/60 p-2 space-y-1">
            {filteredInstitutions.map(inst => {
              const isSelected = selectedInstitutionId === inst.id;
              const thread = threads.find(t => t.institutionId === inst.id);

              return (
                <button
                  key={inst.id}
                  onClick={() => {
                    setSelectedInstitutionId(inst.id);
                    if (thread) setSelectedThreadId(thread.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-zinc-800/90 border border-[#FFD700]/50 ring-1 ring-[#FFD700]/30'
                      : 'hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-xs text-zinc-100 line-clamp-1">{inst.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                      {inst.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-1">{inst.headquarters}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-zinc-500">
                    <span className="capitalize">{inst.type.replace('_', ' ')}</span>
                    {thread && (
                      <span className={`px-1.5 py-0.2 rounded ${
                        thread.stage === 'admin_approved' ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {thread.stage.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* CENTRE PANEL: CONVERSATION THREADS & COMPOSER (5.5 cols) */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden">
          {/* Thread Header */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-white text-sm line-clamp-1">
                {activeThread?.subject || `Direct Dialogue with ${selectedInstitution.name}`}
              </h3>
              <p className="text-xs text-zinc-400">
                To: <span className="font-mono text-[#FFD700]">{selectedInstitution.verifiedEmailOrRoute}</span>
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsComposing(true)}
                className="px-2.5 py-1.5 rounded-lg bg-[#FFD700] hover:bg-[#FFE033] text-black text-xs font-bold transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Draft</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeThread && activeThread.messages.length > 0 ? (
              activeThread.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-xl border space-y-3 ${
                    msg.senderRole === 'baa_admin'
                      ? 'bg-zinc-950/90 border-zinc-800 ml-4'
                      : 'bg-blue-950/20 border-blue-800/60 mr-4'
                  }`}
                >
                  {/* Message Header */}
                  <div className="flex items-start justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-white">{msg.senderName}</span>
                      <span className="text-[11px] text-zinc-400 block font-mono">{msg.senderEmail}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        msg.deliveryStatus === 'approved_ready'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : msg.deliveryStatus === 'submitted_verified'
                          ? 'bg-blue-950 text-blue-400 border-blue-800'
                          : 'bg-amber-950 text-amber-400 border-amber-800'
                      }`}>
                        Status: {msg.deliveryStatus.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-sans bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60">
                    {msg.body}
                  </div>

                  {/* Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase block">Verified Attachments:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.attachments.map((att, idx) => (
                          <span key={idx} className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono flex items-center gap-1">
                            <Paperclip className="w-3 h-3 text-[#FFD700]" />
                            <span>{att}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Approval & Action Bar */}
                  <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    {msg.approvedByAdminName ? (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Signed by {msg.approvedByAdminName} ({msg.approvalTimestamp})</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>Requires Administrator Approval</span>
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {/* Copy-Ready Route Fallback Button */}
                      <button
                        onClick={() => handleCopyReady(`${msg.subject}\n\n${msg.body}`, msg.id)}
                        className="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono flex items-center gap-1 transition"
                        title="Copy message text for official portal intake"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedId === msg.id ? 'Copied!' : 'Copy Text'}</span>
                      </button>

                      {/* Approval Trigger */}
                      {msg.deliveryStatus === 'pending_approval' && (
                        <button
                          onClick={() => onApproveAndSendMessage(activeThread.id, msg.id, currentAdminName)}
                          className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Authorize</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3 text-zinc-500">
                <MessageSquare className="w-10 h-10 mx-auto text-zinc-700" />
                <p className="text-xs">No active conversation threads with {selectedInstitution.name} yet.</p>
                <button
                  onClick={() => setIsComposing(true)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
                >
                  Draft First Institutional Inquiry
                </button>
              </div>
            )}
          </div>

          {/* Action Footer: Follow-up & Record Reply */}
          <div className="p-3 border-t border-zinc-800 bg-zinc-950/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecordingReply(!isRecordingReply)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Record Incoming Reply
              </button>

              <button
                onClick={() => setIsSchedulingFollowUp(!isSchedulingFollowUp)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium"
              >
                Schedule Follow-up
              </button>
            </div>

            {activeThread && (
              <button
                onClick={() => onArchiveThread(activeThread.id)}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono flex items-center gap-1"
              >
                <Archive className="w-3 h-3" />
                <span>Archive</span>
              </button>
            )}
          </div>

          {/* INCOMING REPLY RECORDER POPUP */}
          {isRecordingReply && (
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 space-y-2 text-xs">
              <span className="font-bold text-white block">Log Verified Response from {selectedInstitution.name}:</span>
              <textarea
                rows={3}
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder="Paste verbatim reply received via email or procurement portal..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FFD700]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsRecordingReply(false)}
                  className="px-3 py-1.5 bg-zinc-800 text-zinc-400 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (replyInput.trim() && activeThread) {
                      onRecordReply(activeThread.id, replyInput.trim());
                      setReplyInput('');
                      setIsRecordingReply(false);
                    }
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
                >
                  Save to Audit Trail
                </button>
              </div>
            </div>
          )}

          {/* DRAFT COMPOSER MODAL / OVERLAY */}
          {isComposing && (
            <div className="p-4 border-t border-zinc-800 bg-zinc-950 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Compose New Institutional Outreach</span>
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  <span className="text-zinc-500">Templates:</span>
                  <button onClick={() => handlePreloadTemplate('enquiry')} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white">Enquiry</button>
                  <button onClick={() => handlePreloadTemplate('proposal')} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white">Proposal</button>
                  <button onClick={() => handlePreloadTemplate('funding_request')} className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:text-white">Grant</button>
                </div>
              </div>

              <form onSubmit={handleSendDraft} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={draftSubject}
                    onChange={(e) => setDraftSubject(e.target.value)}
                    placeholder="e.g. Formal RFP Pre-Qualification Statement"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Message Content</label>
                  <textarea
                    rows={6}
                    required
                    value={draftBody}
                    onChange={(e) => setDraftBody(e.target.value)}
                    placeholder="Draft official communications without fabricated claims..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-[#FFD700]"
                  />
                </div>

                {/* Attachments Picker */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Add Attachment</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAttachmentInput}
                      onChange={(e) => setNewAttachmentInput(e.target.value)}
                      placeholder="e.g. BAA_Consortium_ISO_Report.pdf"
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"
                    />
                    <button
                      type="button"
                      onClick={handleAddAttachment}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg"
                    >
                      Attach
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {draftAttachments.map((att, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono flex items-center gap-1">
                        <span>{att}</span>
                        <button type="button" onClick={() => setDraftAttachments(prev => prev.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-300">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="px-3 py-1.5 bg-zinc-800 text-zinc-400 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold rounded-lg"
                  >
                    Save as Draft for Review
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL: INSTITUTION PROFILE & EVIDENCE (3.0 cols)   */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col overflow-hidden text-xs">
          <div className="p-4 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Provider Dossier</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              {selectedInstitution.contactVerificationStatus}
            </span>
          </div>

          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Overview */}
            <div className="space-y-1">
              <h4 className="font-bold text-white">{selectedInstitution.name}</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                {selectedInstitution.overview}
              </p>
            </div>

            {/* Official Channel & Website */}
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 font-mono text-[11px]">
              <div>
                <span className="text-zinc-500 uppercase text-[9px] block">Official Website</span>
                <a
                  href={selectedInstitution.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>{selectedInstitution.officialWebsite}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <span className="text-zinc-500 uppercase text-[9px] block">Public Contact Channel</span>
                <span className="text-zinc-200">{selectedInstitution.contactChannel}</span>
              </div>

              <div>
                <span className="text-zinc-500 uppercase text-[9px] block">Verified Intake Route</span>
                <span className="text-[#FFD700]">{selectedInstitution.verifiedEmailOrRoute}</span>
              </div>
            </div>

            {/* Match Score & Next Steps */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Recommended Next Action:</span>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-[11px]">
                {selectedInstitution.recommendedNextAction}
              </div>
            </div>

            {/* Relevant Opportunities */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                Matched Opportunities ({relevantOpportunities.length}):
              </span>
              <div className="space-y-2">
                {relevantOpportunities.map(opp => (
                  <div key={opp.id} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] space-y-1">
                    <span className="font-bold text-zinc-200 line-clamp-1">{opp.title}</span>
                    <div className="flex justify-between text-zinc-400 font-mono text-[10px]">
                      <span>${opp.maxFundingUsd.toLocaleString()} {opp.currency}</span>
                      <span className="text-amber-400">Due {opp.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two-Party Audit Log Snapshot */}
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-500 block">Engagement Audit Trail:</span>
              <div className="space-y-1.5 font-mono text-[10px] text-zinc-400 max-h-36 overflow-y-auto">
                {auditLogs.slice(0, 4).map(log => (
                  <div key={log.id} className="p-1.5 rounded bg-zinc-950/80 border border-zinc-800/60 space-y-0.5">
                    <div className="flex justify-between text-zinc-500">
                      <span>[{log.timestamp}]</span>
                      <span className="text-cyan-400">{log.actorName}</span>
                    </div>
                    <p className="text-zinc-300">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
