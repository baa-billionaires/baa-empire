import React, { useState, useEffect } from 'react';
import { generateSeedWhatsAppContacts, WhatsAppContact } from '../lib/whatsappScraper';
import { generateAiCloserReply, CLOSER_RULES, CloserRule } from '../lib/whatsappCloser';
import { peekLeadHandoff, clearLeadHandoff, LeadHandoffPayload } from '../lib/leadHandoff';
import {
  Bot,
  Send,
  CreditCard,
  ArrowLeft,
  ExternalLink,
  Radar,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'contact' | 'agent' | 'ai';
  text: string;
  timestamp: string;
}

interface WhatsAppCloserPageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

export const WhatsAppCloserPage: React.FC<WhatsAppCloserPageProps> = ({ onBack, onNavigate }) => {
  const [activeHandoff, setActiveHandoff] = useState<LeadHandoffPayload | null>(() => peekLeadHandoff());

  const [contacts, setContacts] = useState<WhatsAppContact[]>(() => {
    const seeded = generateSeedWhatsAppContacts();
    const handoff = peekLeadHandoff();
    if (!handoff) return seeded;
    const handoffContact: WhatsAppContact = {
      id: handoff.leadId,
      name: handoff.name,
      phone: handoff.phone || '+2348025516793',
      source: `${handoff.sourceCategory} · ${handoff.sourcePlatform}`,
      tags: ['hot', 'handoff', handoff.sourceCategory.toLowerCase()],
      last_message_at: 'Live Now',
      unread_count: 1,
      intent: 'Ready to Buy'
    };
    return [handoffContact, ...seeded.filter((c) => c.id !== handoff.leadId)];
  });

  const [selectedContact, setSelectedContact] = useState<WhatsAppContact>(() => {
    const handoff = peekLeadHandoff();
    if (handoff) {
      return {
        id: handoff.leadId,
        name: handoff.name,
        phone: handoff.phone || '+2348025516793',
        source: `${handoff.sourceCategory} · ${handoff.sourcePlatform}`,
        tags: ['hot', 'handoff'],
        last_message_at: 'Live Now',
        unread_count: 1,
        intent: 'Ready to Buy'
      };
    }
    return generateSeedWhatsAppContacts()[0];
  });

  const [autopilotOn, setAutopilotOn] = useState(true);

  // Chat thread per selected contact
  const [chatHistory, setChatHistory] = useState<{ [contactId: string]: ChatMessage[] }>(() => {
    const seeded = generateSeedWhatsAppContacts();
    const handoff = peekLeadHandoff();
    const initial: { [contactId: string]: ChatMessage[] } = {
      [seeded[0].id]: [
        { id: '1', sender: 'contact', text: 'Hello, please how much is the ChatGPT ATM course?', timestamp: '12:15 PM' },
        { id: '2', sender: 'ai', text: 'Hello Babajide! The course is $99 (or ₦125,000), and you get 990 BaaCoin Networth ($990 value) on day 1!', timestamp: '12:16 PM' },
        { id: '3', sender: 'contact', text: 'Can I pay with Paystack card right now?', timestamp: '12:20 PM' }
      ]
    };
    if (handoff) {
      initial[handoff.leadId] = [
        {
          id: `ho-1-${handoff.leadId}`,
          sender: 'contact',
          text: `[${handoff.sourceCategory} → ${handoff.sourcePlatform}] ${handoff.intentSignal || `Interested in ${handoff.originModule}`}`,
          timestamp: 'Just now'
        },
        {
          id: `ho-2-${handoff.leadId}`,
          sender: 'ai',
          text: `Identity Verified: ${handoff.name} (${handoff.title || 'Prospect'} @ ${handoff.organization || 'Independent'}) • Est. $${handoff.estimatedValueUsd.toLocaleString()} • AI Closer ready to engage.`,
          timestamp: 'Live'
        }
      ];
    }
    return initial;
  });

  const [suggestedReply, setSuggestedReply] = useState(() => peekLeadHandoff()?.aiMessage || '');
  const [suggestedIntent, setSuggestedIntent] = useState('Ready to Buy');
  const [rules] = useState<CloserRule[]>(CLOSER_RULES);
  const [closedCount, setClosedCount] = useState(23);
  const [closedRevenue, setClosedRevenue] = useState(2277);
  const [dispatchSavedNotice, setDispatchSavedNotice] = useState<string | null>(null);

  // Sync if a fresh handoff exists on mount
  useEffect(() => {
    const handoff = peekLeadHandoff();
    if (handoff) {
      setActiveHandoff(handoff);
      const handoffContact: WhatsAppContact = {
        id: handoff.leadId,
        name: handoff.name,
        phone: handoff.phone || '+2348025516793',
        source: `${handoff.sourceCategory} · ${handoff.sourcePlatform}`,
        tags: ['hot', 'handoff'],
        last_message_at: 'Live Now',
        unread_count: 1,
        intent: 'Ready to Buy'
      };
      setContacts((prev) => [handoffContact, ...prev.filter((c) => c.id !== handoff.leadId)]);
      setSelectedContact(handoffContact);
      setSuggestedReply(handoff.aiMessage);
    }
  }, []);

  // Update AI suggested reply when contact changes
  useEffect(() => {
    if (activeHandoff && selectedContact.id === activeHandoff.leadId && activeHandoff.aiMessage) {
      setSuggestedReply(activeHandoff.aiMessage);
      setSuggestedIntent('One-Click Closer Handoff');
      return;
    }
    const thread = chatHistory[selectedContact.id] || [
      { id: '0', sender: 'contact', text: 'Is the 10x BaaCoin Networth real? How do I start?', timestamp: '12:30 PM' }
    ];
    const lastUserMsg = thread.filter(m => m.sender === 'contact').slice(-1)[0]?.text || 'Hello';
    const aiResult = generateAiCloserReply(lastUserMsg, selectedContact.name);
    setSuggestedReply(aiResult.replyText);
    setSuggestedIntent(aiResult.intent);
  }, [selectedContact, chatHistory, activeHandoff]);

  const handleSendReply = async (customText?: string) => {
    const textToSend = customText || suggestedReply;
    if (!textToSend.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
    }));

    // Persist outreach to unified leads ledger
    try {
      await fetch('/api/leads/log-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: selectedContact.id,
          leadName: selectedContact.name,
          leadSource: selectedContact.source || 'WhatsApp Closer Bot',
          channel: 'whatsapp',
          recipientHandle: selectedContact.phone,
          messageBody: textToSend,
          sentBy: 'WhatsApp AI Closer Bot',
          status: 'dispatched'
        })
      });
      setDispatchSavedNotice(`✅ Message sent & logged to Outreach Ledger for ${selectedContact.name}`);
      setTimeout(() => setDispatchSavedNotice(null), 4000);
    } catch {
      // ignore offline error
    }

    // If paystack link sent, simulate closure
    if (textToSend.includes('paystack') || textToSend.includes('academy')) {
      setClosedCount(prev => prev + 1);
      setClosedRevenue(prev => prev + 99);
    }
  };

  const handleSendPaystackLink = () => {
    handleSendReply(
      `Here is your private 1-click Paystack checkout link: https://microwork-ai-2-app-production.up.railway.app/#academy?ref=${encodeURIComponent(selectedContact.phone)}. Complete payment with test card or bank transfer to unlock 990 BaaCoin instantly!`
    );
  };

  const handleSendBountyLink = () => {
    handleSendReply(
      `Check out our active commercial developer bounties with payouts up to ₦250,000: https://microwork-ai-2-app-production.up.railway.app/#bounties`
    );
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Command Vault</span>
            </button>
            {onNavigate && (
              <button
                onClick={() => onNavigate('leads-dashboard')}
                className="flex items-center gap-1.5 text-xs font-mono text-[#00D4FF] hover:underline transition cursor-pointer"
              >
                <Radar className="w-3.5 h-3.5" />
                <span>Leads Output Dashboard</span>
              </button>
            )}
          </div>

          {activeHandoff && (
            <button
              onClick={() => {
                clearLeadHandoff();
                setActiveHandoff(null);
              }}
              className="text-[11px] font-mono text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Clear Handoff Banner
            </button>
          )}
        </div>

        {/* Active One-Click Handoff Banner */}
        {activeHandoff && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-cyan-950/60 to-zinc-950 border-2 border-[#00FF88]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#00FF88] font-bold uppercase">
                <Sparkles className="w-4 h-4" />
                <span>One-Click Message Handoff Active</span>
                <span className="px-2 py-0.5 rounded bg-black/60 text-cyan-300 border border-cyan-500/40">
                  Source: {activeHandoff.sourceCategory} ({activeHandoff.sourcePlatform})
                </span>
              </div>
              <div className="text-sm font-heading font-bold text-white flex flex-wrap items-center gap-2">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>{activeHandoff.name}</span>
                <span className="text-xs font-mono text-zinc-300 font-normal">
                  · {activeHandoff.title} @ {activeHandoff.organization} · {activeHandoff.phone || activeHandoff.email}
                </span>
              </div>
              <p className="text-xs text-zinc-300 font-mono">
                Signal: "{activeHandoff.intentSignal}"
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href={`https://wa.me/${(activeHandoff.phone || selectedContact.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(suggestedReply)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#00FF88] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Live WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {dispatchSavedNotice && (
          <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
            {dispatchSavedNotice}
          </div>
        )}

        {/* Top Header & Closer Metrics */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-[#00D4FF]" />
              Autonomous Nigerian AI Closer (WhatsApp Web Engine)
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mt-1">
              WhatsApp Sales Closer
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl font-mono text-xs">
              <span className="text-zinc-400">Autopilot Closer:</span>
              <button
                onClick={() => setAutopilotOn(!autopilotOn)}
                className={`px-3 py-0.5 rounded-lg text-xs font-bold transition ${
                  autopilotOn ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {autopilotOn ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/40">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">AI Closed Today</span>
            <span className="text-2xl font-heading font-black text-white block mt-1">{closedCount} Sales (${closedRevenue} USD)</span>
            <span className="text-[10px] text-zinc-500 font-mono">10x BaaCoin Networth Allocated</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Average Response Speed</span>
            <span className="text-2xl font-heading font-black text-[#00D4FF] block mt-1">3.2 Seconds</span>
            <span className="text-[10px] text-zinc-500 font-mono">Zero Customer Fatigue</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Objection Conversion Rate</span>
            <span className="text-2xl font-heading font-black text-[#FFD700] block mt-1">89%</span>
            <span className="text-[10px] text-amber-300 font-mono">Nigerian Urgency Framework</span>
          </div>
        </div>

        {/* WhatsApp Web Style 2-Column Workspace */}
        <div className="bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          {/* Left Contacts List (4 Cols) */}
          <div className="md:col-span-4 border-r border-zinc-800 flex flex-col bg-zinc-950">
            <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white">Active WhatsApp Inbounds</span>
              <span className="text-[10px] font-mono text-emerald-400">{contacts.length} Queued</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-zinc-900">
              {contacts.map(c => {
                const isSelected = selectedContact.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedContact(c)}
                    className={`p-3.5 cursor-pointer transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-zinc-900 border-l-4 border-emerald-500'
                        : 'hover:bg-zinc-900/40'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="font-bold text-xs text-white truncate font-sans">{c.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400">{c.phone}</div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded inline-block ${
                        c.intent === 'Ready to Buy'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-zinc-900 text-[#00D4FF]'
                      }`}>
                        {c.intent}
                      </span>
                    </div>

                    <div className="text-right text-[10px] font-mono text-zinc-500 shrink-0">
                      <div>{c.last_message_at}</div>
                      {c.unread_count > 0 && (
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-[9px] mt-1 ml-auto">
                          {c.unread_count}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Chat & AI Closer Assistant (8 Cols) */}
          <div className="md:col-span-8 flex flex-col justify-between bg-black">
            {/* Chat Header */}
            <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/50 flex items-center justify-center font-bold text-xs">
                  {selectedContact.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">{selectedContact.name}</h4>
                  <span className="text-[10px] font-mono text-emerald-400">{selectedContact.phone} • WhatsApp</span>
                </div>
              </div>

              <span className="text-xs font-mono text-[#FFD700] bg-[#FFD700]/10 px-2.5 py-0.5 rounded-full border border-[#FFD700]/30 font-bold">
                Intent: {suggestedIntent}
              </span>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-sans">
              {(chatHistory[selectedContact.id] || []).map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'contact' ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      m.sender === 'contact'
                        ? 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                        : 'bg-emerald-950/90 text-white border border-emerald-500/40'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="text-[9px] text-zinc-400 font-mono block text-right mt-1">
                      {m.timestamp} {m.sender !== 'contact' && '✓✓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Suggested Reply Box & 1-Click Action Buttons */}
            <div className="p-4 bg-zinc-950 border-t border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#00D4FF] font-bold flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Suggested Closer Reply (Nigerian Urgency Rule)</span>
                </span>
                <span className="text-[10px] text-zinc-500">Editable before sending</span>
              </div>

              <textarea
                value={suggestedReply}
                onChange={(e) => setSuggestedReply(e.target.value)}
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-2.5 text-xs text-white font-sans outline-none focus:border-emerald-500 resize-none"
              />

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendPaystackLink}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[#FFD700] text-[11px] font-mono flex items-center gap-1"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Send Paystack Link</span>
                  </button>

                  <button
                    onClick={handleSendBountyLink}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-cyan-300 text-[11px] font-mono"
                  >
                    Send ₦150k Bounty Offer
                  </button>
                </div>

                <button
                  onClick={() => handleSendReply()}
                  className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 fill-black" />
                  <span>Approve &amp; Send Reply</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Closer Rules Manager */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4">
          <h4 className="text-base font-bold text-white font-heading">Active Automated Closing Rules</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rules.map(r => (
              <div key={r.id} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono space-y-1.5">
                <div className="text-[#FFD700] font-bold">Trigger: "{r.trigger_keyword}"</div>
                <p className="text-zinc-400 text-[11px] line-clamp-2 italic font-sans">{r.response_template}</p>
                <div className="text-[10px] text-emerald-400 uppercase font-bold">Action: {r.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhatsAppCloserPage;
