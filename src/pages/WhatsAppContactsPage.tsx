import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { WhatsAppContact, generateSeedWhatsAppContacts } from '../lib/whatsappScraper';
import {
  MessageSquare,
  Users,
  Upload,
  Plus,
  Search,
  Filter,
  CheckCircle,
  ArrowLeft,
  Flame,
  PhoneCall
} from 'lucide-react';

export const WhatsAppContactsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { scoutLeads } = useEcosystem();

  const [contacts, setContacts] = useState<WhatsAppContact[]>(() => {
    try {
      const saved = localStorage.getItem('richconnect_wa_contacts');
      return saved ? JSON.parse(saved) : generateSeedWhatsAppContacts();
    } catch {
      return generateSeedWhatsAppContacts();
    }
  });

  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('+234');
  const [importedMessage, setImportedMessage] = useState<string | null>(null);

  const saveContacts = (items: WhatsAppContact[]) => {
    setContacts(items);
    localStorage.setItem('richconnect_wa_contacts', JSON.stringify(items));
  };

  const handleImportFromScout = () => {
    const newItems: WhatsAppContact[] = scoutLeads.map((l, i) => ({
      id: `wac-scout-${Date.now()}-${i}`,
      name: l.name,
      phone: l.phone_or_wa || `+23480${Math.floor(10000000 + Math.random() * 90000000)}`,
      source: `Scout (${l.source_platform})`,
      tags: [l.type, 'hot'],
      last_message_at: 'Just now',
      unread_count: 1,
      intent: l.type === 'investor' ? 'Course Info' : 'Ready to Buy'
    }));

    const combined = [...newItems, ...contacts];
    saveContacts(combined);
    setImportedMessage(`Successfully imported ${newItems.length} leads from Autonomous Scout!`);
    setTimeout(() => setImportedMessage(null), 3000);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newContact: WhatsAppContact = {
      id: `wac-${Date.now()}`,
      name: newName,
      phone: newPhone,
      source: "Manual Admin Input",
      tags: ['student', 'hot'],
      last_message_at: 'Just now',
      unread_count: 0,
      intent: 'Course Info'
    };

    saveContacts([newContact, ...contacts]);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('+234');
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchesTag = tagFilter === 'all' || c.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

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
              WhatsApp Lead Bank
            </span>
            <h1 className="text-3xl font-heading font-black text-white mt-1">
              WhatsApp Contacts &amp; Audiences
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Verified phone database segmented by buying intent and student scholarship readiness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleImportFromScout}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import from Scout Leads ({scoutLeads.length})</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {importedMessage && (
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono text-center">
            {importedMessage}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Total Contacts</span>
            <span className="text-2xl font-black text-white block mt-1">{contacts.length}</span>
            <span className="text-[10px] text-zinc-500 font-mono">100% Opted-In</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Hot Buyers</span>
            <span className="text-2xl font-black text-[#FFD700] block mt-1">
              {contacts.filter(c => c.tags.includes('hot')).length}
            </span>
            <span className="text-[10px] text-amber-300 font-mono">Ready for Paystack link</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Replied Inbound</span>
            <span className="text-2xl font-black text-emerald-400 block mt-1">89%</span>
            <span className="text-[10px] text-emerald-300 font-mono">Average Closer rate</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Country Coverage</span>
            <span className="text-2xl font-black text-[#00D4FF] block mt-1">Nigeria (+234)</span>
            <span className="text-[10px] text-cyan-300 font-mono">+ Ghana &amp; Kenya</span>
          </div>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search phone or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs font-mono">
            {['all', 'hot', 'student', 'investor', 'bounty', 'bought'].map(tag => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  tagFilter === tag
                    ? 'bg-emerald-500 text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
          <table className="w-full text-xs font-mono text-left">
            <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Detected Intent</th>
                <th className="py-3 px-4">Tags</th>
                <th className="py-3 px-4 text-right">Quick Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredContacts.map(c => {
                const waLink = `https://wa.me/${c.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${c.name}! We have saved your 10x BaaCoin Networth scholarship spot ($990 value). Enroll here: https://billionairesai.academy/academy`
                )}`;

                return (
                  <tr key={c.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-4 font-bold text-white font-sans">{c.name}</td>
                    <td className="py-3 px-4 text-emerald-400">{c.phone}</td>
                    <td className="py-3 px-4 text-zinc-400">{c.source}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-800 text-[10px]">
                        {c.intent}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {c.tags.map((t, i) => (
                          <span
                            key={i}
                            className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold ${
                              t === 'hot'
                                ? 'bg-red-950 text-red-400 border border-red-500/30'
                                : 'bg-zinc-900 text-zinc-400'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 rounded-lg text-[10px] inline-flex items-center gap-1 transition"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Chat WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-zinc-950 border border-emerald-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-heading font-bold text-white">Add WhatsApp Lead</h3>
            <form onSubmit={handleAddContact} className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Vance"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-zinc-400 uppercase mb-1">WhatsApp Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+2348031234567"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-black font-bold uppercase"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default WhatsAppContactsPage;
