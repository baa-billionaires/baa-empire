import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  CheckCircle,
  Clock,
  ArrowLeft,
  Smartphone,
  Eye,
  RotateCcw,
  Plus
} from 'lucide-react';

interface BroadcastItem {
  id: string;
  name: string;
  template: string;
  sent: number;
  total: number;
  delivered: number;
  read: number;
  replied: number;
  converted: number;
  revenue: number;
  status: 'sent' | 'sending' | 'draft';
  created_at: string;
}

export const WhatsAppBroadcastPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [broadcastName, setBroadcastName] = useState('Weekend Flash Scholarship 10x Networth');
  const [template, setTemplate] = useState(
    'Hello {name}! 🚨 Flash Scholarship Alert: Enroll in {course_title} today for only {price} and immediately receive {baacoin} BaaCoin Networth ($990 value)! Over 1,400 scholars are already mining daily. Click here before midnight: {link}'
  );
  const [selectedTag, setSelectedTag] = useState('hot');
  const [isSending, setIsSending] = useState(false);
  const [broadcastSentSuccess, setBroadcastSentSuccess] = useState(false);

  const [broadcasts, setBroadcasts] = useState<BroadcastItem[]>([
    {
      id: "bc-1",
      name: "ChatGPT ATM ₦50k Discount Push",
      template: "Hello {name}, our ChatGPT ATM course is live...",
      sent: 2340,
      total: 2340,
      delivered: 2180,
      read: 1640,
      replied: 412,
      converted: 23,
      revenue: 2277,
      status: "sent",
      created_at: new Date(Date.now() - 3600000 * 8).toISOString()
    },
    {
      id: "bc-2",
      name: "Lagos FinTech Bounty Broadcast",
      template: "New ₦150,000 WhatsApp Sales Agent Bounty open...",
      sent: 1200,
      total: 1200,
      delivered: 1150,
      read: 980,
      replied: 290,
      converted: 14,
      revenue: 1386,
      status: "sent",
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    }
  ]);

  const insertVariable = (varName: string) => {
    setTemplate(prev => `${prev} {${varName}}`);
  };

  const previewMessage = template
    .replace('{name}', 'Babajide')
    .replace('{course_title}', 'AI Instagram Millionaire')
    .replace('{price}', '$99')
    .replace('{baacoin}', '990')
    .replace('{link}', 'https://billionairesai.academy/academy');

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setBroadcastSentSuccess(true);

      const newBc: BroadcastItem = {
        id: `bc-${Date.now()}`,
        name: broadcastName,
        template,
        sent: 1850,
        total: 1850,
        delivered: 1720,
        read: 1240,
        replied: 310,
        converted: 18,
        revenue: 1782,
        status: "sent",
        created_at: new Date().toISOString()
      };

      setBroadcasts(prev => [newBc, ...prev]);
      setTimeout(() => setBroadcastSentSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Vault</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Automated WhatsApp Broadcasting
            </span>
            <h1 className="text-3xl font-heading font-black text-white mt-1">
              WhatsApp Broadcast Engine
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Send bulk personalized WhatsApp messages with dynamic variables, tracked links, and automated 60% conversion hooks.
            </p>
          </div>
        </div>

        {/* Builder & Phone Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Composer (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-heading">Broadcast Campaign Composer</h3>

            <form onSubmit={handleSendBroadcast} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={broadcastName}
                  onChange={(e) => setBroadcastName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-zinc-400 uppercase">Message Template</label>
                  <span className="text-zinc-500 text-[10px]">Insert dynamic variable:</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {['name', 'course_title', 'price', 'link', 'baacoin'].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => insertVariable(v)}
                      className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-[#FFD700] border border-zinc-700 text-[10px]"
                    >
                      +{`{${v}}`}
                    </button>
                  ))}
                </div>

                <textarea
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  rows={5}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 resize-none font-sans"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">Audience Segment</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-emerald-500"
                >
                  <option value="hot">Hot Prospects (High Intent)</option>
                  <option value="student">Registered Students (Upsell)</option>
                  <option value="investor">Investors (Data Center Allocations)</option>
                  <option value="all">All Opted-In WhatsApp Contacts (2,340)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>{isSending ? 'Broadcasting to 2,340 Phones...' : 'Send Broadcast Now (2,340 Contacts)'}</span>
              </button>

              {broadcastSentSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-center font-bold">
                  ✓ Broadcast Sent Successfully! Delivered to 2,340 Nigerian WhatsApp numbers.
                </div>
              )}
            </form>
          </div>

          {/* Real-time Phone Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-72 bg-zinc-950 border-4 border-zinc-800 rounded-[36px] p-3 shadow-2xl flex flex-col justify-between">
              {/* Phone Header */}
              <div className="bg-emerald-950/90 border border-emerald-500/40 rounded-2xl p-3 flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center text-xs">
                  BA
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Billionaires AI</span>
                  <span className="text-[9px] font-mono text-emerald-400">Online 24/7</span>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="flex-1 bg-zinc-900/60 rounded-2xl p-3 border border-zinc-800 flex flex-col justify-end space-y-2">
                <div className="bg-emerald-900/40 border border-emerald-500/30 p-3 rounded-2xl text-xs text-white leading-relaxed font-sans shadow-md">
                  <p>{previewMessage}</p>
                  <span className="text-[9px] text-zinc-400 font-mono block text-right mt-1">12:30 PM ✓✓</span>
                </div>
              </div>

              {/* Phone Footer */}
              <div className="mt-3 text-center text-[10px] font-mono text-zinc-500">
                Live WhatsApp Web / Mobile Simulation
              </div>
            </div>
          </div>
        </div>

        {/* Past Broadcasts Report Table */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4 shadow-2xl">
          <h4 className="text-base font-bold text-white font-heading">Broadcast History &amp; Revenue Generated</h4>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Broadcast</th>
                  <th className="py-2.5 px-3">Delivered</th>
                  <th className="py-2.5 px-3">Read Rate</th>
                  <th className="py-2.5 px-3">Replies</th>
                  <th className="py-2.5 px-3">Direct Sales</th>
                  <th className="py-2.5 px-3">Revenue ($)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {broadcasts.map(b => (
                  <tr key={b.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-3 font-bold text-white font-sans">{b.name}</td>
                    <td className="py-3 px-3 text-zinc-300">{b.delivered} / {b.sent}</td>
                    <td className="py-3 px-3 text-[#00D4FF]">
                      {Math.round((b.read / b.delivered) * 100)}%
                    </td>
                    <td className="py-3 px-3 text-emerald-400">{b.replied} inbounds</td>
                    <td className="py-3 px-3 text-[#FFD700] font-bold">{b.converted} closed</td>
                    <td className="py-3 px-3 text-white font-bold">${b.revenue} USD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhatsAppBroadcastPage;
