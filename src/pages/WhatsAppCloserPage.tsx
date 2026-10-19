import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { generateSeedWhatsAppContacts, WhatsAppContact } from '../lib/whatsappScraper';
import { generateAiCloserReply, CLOSER_RULES, CloserRule } from '../lib/whatsappCloser';
import {
  MessageSquare,
  Bot,
  Send,
  Zap,
  CheckCircle,
  CreditCard,
  Flame,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Settings,
  PhoneCall,
  Check
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'contact' | 'agent' | 'ai';
  text: string;
  timestamp: string;
}

export const WhatsAppCloserPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [contacts] = useState<WhatsAppContact[]>(generateSeedWhatsAppContacts());
  const [selectedContact, setSelectedContact] = useState<WhatsAppContact>(contacts[0]);
  const [autopilotOn, setAutopilotOn] = useState(true);

  // Chat thread per selected contact
  const [chatHistory, setChatHistory] = useState<{ [contactId: string]: ChatMessage[] }>({
    [contacts[0].id]: [
      { id: '1', sender: 'contact', text: 'Hello, please how much is the ChatGPT ATM course?', timestamp: '12:15 PM' },
      { id: '2', sender: 'ai', text: 'Hello Babajide! The course is $99 (or ₦125,000), and you get 990 BaaCoin Networth ($990 value) on day 1!', timestamp: '12:16 PM' },
      { id: '3', sender: 'contact', text: 'Can I pay with Paystack card right now?', timestamp: '12:20 PM' }
    ]
  });

  const [suggestedReply, setSuggestedReply] = useState('');
  const [suggestedIntent, setSuggestedIntent] = useState('Ready to Buy');
  const [rules, setRules] = useState<CloserRule[]>(CLOSER_RULES);
  const [closedCount, setClosedCount] = useState(23);
  const [closedRevenue, setClosedRevenue] = useState(2277);

  // Update AI suggested reply when contact changes
  useEffect(() => {
    const thread = chatHistory[selectedContact.id] || [
      { id: '0', sender: 'contact', text: 'Is the 10x BaaCoin Networth real? How do I start?', timestamp: '12:30 PM' }
    ];
    const lastUserMsg = thread.filter(m => m.sender === 'contact').slice(-1)[0]?.text || 'Hello';
    const aiResult = generateAiCloserReply(lastUserMsg, selectedContact.name);
    setSuggestedReply(aiResult.replyText);
    setSuggestedIntent(aiResult.intent);
  }, [selectedContact, chatHistory]);

  const handleSendReply = (customText?: string) => {
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

    // If paystack link sent, simulate closure
    if (textToSend.includes('paystack') || textToSend.includes('academy')) {
      setClosedCount(prev => prev + 1);
      setClosedRevenue(prev => prev + 99);
    }
  };

  const handleSendPaystackLink = () => {
    handleSendReply(
      `Here is your private 1-click Paystack checkout link: https://billionairesai.academy/paystack?ref=${selectedContact.phone}. Complete payment to unlock 990 BaaCoin instantly!`
    );
  };

  const handleSendBountyLink = () => {
    handleSendReply(
      `Check out our active commercial developer bounties with payouts up to ₦250,000: https://billionairesai.academy/bounties`
    );
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Vault</span>
        </button>

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
