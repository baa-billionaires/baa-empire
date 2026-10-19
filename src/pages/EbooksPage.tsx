import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Ebook } from '../types';
import { BookOpen, Search, Download, Star, CheckCircle, X, ExternalLink } from 'lucide-react';

export const EbooksPage: React.FC = () => {
  const { ebooks } = useEcosystem();
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Ebook | null>(null);
  const [purchasedBookId, setPurchasedBookId] = useState<string | null>(null);

  const filteredEbooks = ebooks.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.description.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleBuyEbook = (b: Ebook) => {
    setPurchasedBookId(b.id);
    setTimeout(() => {
      // Simulate download
      const element = document.createElement('a');
      const file = new Blob([
        `BILLIONAIRES AI ACADEMY - EBOOK EDITION\n\nTitle: ${b.title}\nCategory: ${b.category}\nPages: ${b.pages}\n\nTABLE OF CONTENTS\nChapter 1: The Sovereign Autonomous Blueprint\nChapter 2: Learn-to-Mine & BaaCoin 10x Tokenomics\nChapter 3: High-Ticket African & Global Market Arbitrage\nChapter 4: Scalable Multi-Agent Automation\nChapter 5: 60/40 Marketplace Distribution\n\nFull edition certified by Billionaires AI Academy.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${b.title.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Ebook.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#FFD700] tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <BookOpen className="w-4 h-4 text-[#FFD700]" />
            50 Sovereign Playbooks
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            AI &amp; Web3 Ebooks Vault
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Written by top autonomous architects, crypto traders, and Silicon Savannah founders. Instant download upon purchase with BaaCoin or Paystack.
          </p>
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search 50 ebooks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 focus:border-[#FFD700] rounded-xl text-xs text-white placeholder-zinc-500 font-mono outline-none"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEbooks.map((b) => (
            <div
              key={b.id}
              className="group bg-zinc-950 rounded-2xl border border-zinc-800/80 hover:border-[#FFD700]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900">
                <img
                  src={b.cover_url}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono text-zinc-300">
                  {b.pages} Pages
                </div>
                <div className="absolute top-3 right-3 bg-[#FFD700] text-black px-2.5 py-1 rounded-full font-mono font-bold text-xs shadow-md">
                  ${b.price}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider block">
                    {b.category}
                  </span>
                  <h3 className="font-heading font-bold text-white text-sm mt-1 leading-snug group-hover:text-[#FFD700] transition">
                    {b.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-900 flex gap-2">
                  <button
                    onClick={() => handleBuyEbook(b)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{purchasedBookId === b.id ? 'Downloaded!' : 'Buy & Download'}</span>
                  </button>

                  <button
                    onClick={() => setSelectedBook(b)}
                    className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Preview Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-950 border border-[#FFD700]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4">
              <img
                src={selectedBook.cover_url}
                alt={selectedBook.title}
                className="w-24 aspect-[3/4] object-cover rounded-xl border border-zinc-700 shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider block">
                  {selectedBook.category} • {selectedBook.pages} Pages
                </span>
                <h3 className="text-lg font-heading font-bold text-white mt-1">
                  {selectedBook.title}
                </h3>
                <span className="text-base font-bold text-[#FFD700] block mt-1">
                  ${selectedBook.price} USD
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedBook.description}
            </p>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs font-mono text-zinc-400">
              <div className="text-white font-bold">Included Inside:</div>
              <div>• 5 Practical Implementation Chapters</div>
              <div>• Copy-Paste System Prompts &amp; Workflows</div>
              <div>• BaaCoin Staking Discount Voucher</div>
            </div>

            <button
              onClick={() => {
                handleBuyEbook(selectedBook);
                setSelectedBook(null);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition"
            >
              Buy &amp; Instant Download (${selectedBook.price})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EbooksPage;
