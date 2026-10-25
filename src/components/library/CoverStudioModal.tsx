import React, { useState } from 'react';
import { BAABook } from '../../types/library';
import { X, RotateCw, Eye, Download, Check, Sparkles, Shield, Bookmark, ExternalLink, Printer, Clapperboard } from 'lucide-react';
import { AttractiveBookCover } from './AttractiveBookCover';
import { BookToVideoPlayerModal } from './BookToVideoPlayerModal';

interface CoverStudioModalProps {
  book: BAABook;
  onClose: () => void;
}

export const CoverStudioModal: React.FC<CoverStudioModalProps> = ({ book, onClose }) => {
  const [viewMode, setViewMode] = useState<'3d-flip' | 'print-jacket' | 'front-only' | 'back-only'>('3d-flip');
  const [isFlipped, setIsFlipped] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const front = book.frontCover;
  const back = book.backCover;

  const handleDownloadCoverAsset = (type: 'front' | 'back' | 'jacket') => {
    setDownloadSuccess(type);
    setTimeout(() => setDownloadSuccess(null), 2500);

    // Create SVG blob representing high-res printable cover
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1800" width="1200" height="1800">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#050811"/>
            <stop offset="50%" stop-color="#0a1224"/>
            <stop offset="100%" stop-color="#020408"/>
          </linearGradient>
          <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FFD700"/>
            <stop offset="100%" stop-color="#FFA500"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1800" fill="url(#bg)"/>
        <rect x="60" y="60" width="1080" height="1680" fill="none" stroke="#FFD700" stroke-width="4" stroke-opacity="0.6"/>
        
        <!-- Header Badge -->
        <rect x="120" y="140" width="960" height="60" rx="30" fill="#000000" stroke="#00D4FF" stroke-width="2"/>
        <text x="600" y="178" font-family="monospace" font-size="22" font-weight="bold" fill="#00D4FF" text-anchor="middle" letter-spacing="4">
          BILLIONAIRES AI ACADEMY • AUTONOMOUS PUBLISHING EMPIRE
        </text>

        <!-- Book Title -->
        <text x="600" y="440" font-family="sans-serif" font-size="56" font-weight="900" fill="#FFFFFF" text-anchor="middle">
          ${book.title.slice(0, 32)}
        </text>
        <text x="600" y="520" font-family="sans-serif" font-size="56" font-weight="900" fill="url(#gold)" text-anchor="middle">
          ${book.title.slice(32, 70) || ''}
        </text>

        <!-- Subtitle -->
        <text x="600" y="640" font-family="sans-serif" font-size="26" fill="#A1A1AA" text-anchor="middle" width="900">
          ${book.subtitle.slice(0, 60)}
        </text>

        <!-- Verified Seal -->
        <circle cx="600" cy="980" r="160" fill="#090E17" stroke="#FFD700" stroke-width="6"/>
        <circle cx="600" cy="980" r="140" fill="none" stroke="#00D4FF" stroke-dasharray="10 8" stroke-width="3"/>
        <text x="600" y="960" font-family="monospace" font-size="28" font-weight="bold" fill="#FFD700" text-anchor="middle">BAA VERIFIED</text>
        <text x="600" y="1000" font-family="monospace" font-size="18" fill="#10B981" text-anchor="middle">BASE L2 CONTRACT</text>
        <text x="600" y="1030" font-family="monospace" font-size="14" fill="#71717A" text-anchor="middle">ISBN: ${book.isbn || '978-978-794-001-2'}</text>

        <!-- Author Information -->
        <rect x="160" y="1320" width="880" height="180" rx="16" fill="#000000" stroke="#FFD700" stroke-opacity="0.4"/>
        <text x="600" y="1380" font-family="sans-serif" font-size="32" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
          ${book.authorName}
        </text>
        <text x="600" y="1425" font-family="sans-serif" font-size="24" fill="#FFD700" text-anchor="middle">
          ${book.authorAlias}
        </text>
        <text x="600" y="1465" font-family="monospace" font-size="20" fill="#00D4FF" text-anchor="middle">
          Direct Contact: ${book.contactNumber} • https://baa-empire.vercel.app
        </text>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.slug}_${type}_cover_hires.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/80 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FFD700] uppercase tracking-wider font-bold">
                  BAA Holographic Cover Studio
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Print Ready 300 DPI
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-heading font-black text-white truncate max-w-md sm:max-w-xl">
                {book.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              aria-label="Close Cover Studio"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-zinc-900/40 border-b border-zinc-800/80 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => { setViewMode('3d-flip'); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === '3d-flip' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              3D Interactive Flip
            </button>
            <button
              onClick={() => setViewMode('print-jacket')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'print-jacket' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Full-Wrap Jacket (Print)
            </button>
            <button
              onClick={() => { setViewMode('front-only'); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'front-only' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Front Cover
            </button>
            <button
              onClick={() => { setViewMode('back-only'); setIsFlipped(true); }}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'back-only' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Back Cover
            </button>
          </div>

          {viewMode === '3d-flip' && (
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 transition"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span>Flip to {isFlipped ? 'Front' : 'Back'}</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVideoModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-600/30 border border-red-500/50 text-amber-300 hover:text-white font-bold transition shadow"
              title="Watch book as a cinematic AI film"
            >
              <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
              <span>Watch Film</span>
            </button>

            <button
              onClick={() => handleDownloadCoverAsset(viewMode === 'print-jacket' ? 'jacket' : isFlipped ? 'back' : 'front')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold hover:brightness-110 active:scale-95 transition shadow"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-black" />
                  <span>Export SVG Vector</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Studio Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black">
          {/* 3D FLIP MODE */}
          {viewMode === '3d-flip' && (
            <div className="w-full flex flex-col items-center">
              <div 
                className="relative perspective-[1200px] cursor-pointer group"
                style={{ width: '340px', height: '510px', maxWidth: '100%' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div 
                  className="w-full h-full relative transition-transform duration-700 preserve-3d shadow-2xl rounded-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT SIDE - High-Fidelity Attractive Book Cover */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <AttractiveBookCover book={book} className="w-full h-full" />
                  </div>

                  {/* BACK SIDE */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-2xl border-2 border-[#00D4FF]/40 overflow-hidden flex flex-col justify-between p-6 shadow-2xl bg-gradient-to-br from-slate-950 via-zinc-950 to-black backface-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {/* Header */}
                    <div className="border-b border-zinc-800 pb-2">
                      <div className="text-[10px] font-mono text-[#00D4FF] font-bold uppercase tracking-wider">
                        BAA Autonomous Publishing Empire
                      </div>
                      <div className="text-sm font-heading font-black text-white mt-1">
                        Praise &amp; Synopsis
                      </div>
                    </div>

                    {/* Synopsis */}
                    <div className="space-y-3 overflow-hidden text-xs text-zinc-300 font-sans leading-relaxed">
                      <p className="line-clamp-4">
                        {back.synopsis}
                      </p>
                      
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold block">
                          Mastery Competencies:
                        </span>
                        <ul className="space-y-1 text-[11px] text-zinc-400">
                          {back.learningOutcomes.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start gap-1.5 truncate">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Author Bio Snippet */}
                    <div className="bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800 text-[10px] text-zinc-400 space-y-1">
                      <div className="font-bold text-white">{back.authorName} ({back.authorAlias})</div>
                      <p className="line-clamp-2">{back.authorBio}</p>
                    </div>

                    {/* Barcode & ISBN Footer */}
                    <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-[9px] font-mono text-zinc-400">ISBN: {book.isbn || '978-978-794-001-2'}</div>
                        <div className="text-[9px] font-mono text-zinc-500">Contact: {book.contactNumber}</div>
                      </div>
                      
                      {/* Barcode graphic */}
                      <div className="bg-white px-2 py-1 rounded border border-zinc-300 flex items-end gap-[2px] h-8">
                        {[4, 8, 2, 6, 8, 3, 7, 2, 9, 4, 8, 5, 2, 7, 9, 3, 6, 8].map((h, i) => (
                          <div 
                            key={i} 
                            className="bg-black w-[2px]" 
                            style={{ height: `${h * 2.5}px` }} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-4 flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 text-zinc-400" />
                Click card or use button to flip between Front and Back Cover
              </p>
            </div>
          )}

          {/* FULL WRAP PRINT JACKET */}
          {viewMode === 'print-jacket' && (
            <div className="w-full max-w-4xl overflow-x-auto pb-4">
              <div className="min-w-[760px] bg-zinc-950 p-6 rounded-2xl border-2 border-dashed border-zinc-700 relative">
                {/* Bleed outline guide label */}
                <div className="text-[10px] font-mono text-amber-400 mb-3 flex items-center justify-between">
                  <span>PRINT JACKET SPEC: 3mm BLEED • PERFECT BIND SPINE (18mm) • 300 DPI READY</span>
                  <span>PAPER: 130GSM SILK TEXT / 350GSM SOFT TOUCH LAMINATE COVER</span>
                </div>

                <div className="grid grid-cols-12 gap-0 border-2 border-zinc-800 rounded-xl overflow-hidden shadow-2xl bg-black">
                  {/* BACK COVER (5 cols) */}
                  <div className="col-span-5 p-5 bg-gradient-to-br from-zinc-950 to-slate-950 flex flex-col justify-between border-r border-zinc-800 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-[#00D4FF] font-bold">BACK COVER</span>
                      <h4 className="font-heading font-black text-white text-base mt-2">{book.title}</h4>
                      <p className="text-zinc-400 text-xs mt-3 leading-relaxed">{back.synopsis}</p>
                      
                      <div className="mt-4 space-y-1">
                        <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold">Key Takeaways</span>
                        {back.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                          <div key={idx} className="text-zinc-300 text-[11px] flex items-center gap-1.5">
                            <span className="text-emerald-400">✓</span> {outcome}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 mt-6 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-400">ISBN: {book.isbn || '978-978-794-001-2'}</div>
                        <div className="text-[9px] font-mono text-zinc-500">Contact: {book.contactNumber}</div>
                      </div>
                      <div className="bg-white px-2 py-1 rounded flex items-end gap-[1.5px] h-7">
                        {[4, 7, 3, 6, 8, 2, 5, 8, 3, 7, 9, 4, 6].map((h, i) => (
                          <div key={i} className="bg-black w-[2px]" style={{ height: `${h * 2.2}px` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SPINE (2 cols) */}
                  <div className="col-span-2 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between items-center py-6 px-1 text-center">
                    <span className="text-[9px] font-mono text-[#FFD700] font-bold">BAA</span>
                    <div 
                      className="text-xs font-mono font-bold text-white tracking-widest whitespace-nowrap"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {book.title.slice(0, 36)}...
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400">#001</span>
                  </div>

                  {/* FRONT COVER (5 cols) */}
                  <div className="col-span-5 p-5 bg-gradient-to-br from-slate-950 to-zinc-950 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#00D4FF] font-bold">{book.category}</span>
                        <span className="text-[10px] font-mono text-[#FFD700]">{front.edition}</span>
                      </div>
                      <h4 className="font-heading font-black text-white text-lg mt-3 leading-snug">{book.title}</h4>
                      <p className="text-zinc-400 text-xs mt-2">{book.subtitle}</p>
                    </div>

                    <div className="my-6 flex justify-center">
                      <div className="w-16 h-16 rounded-full border border-[#FFD700]/30 flex items-center justify-center bg-zinc-900/50">
                        <Sparkles className="w-6 h-6 text-[#FFD700]" />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 space-y-1">
                      <div className="font-bold text-white text-xs">{book.authorName}</div>
                      <div className="text-[10px] font-mono text-[#FFD700]">{book.authorAlias}</div>
                      <div className="text-[9px] font-mono text-zinc-400">Tel: {book.contactNumber}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FRONT ONLY MODE */}
          {viewMode === 'front-only' && (
            <div className="w-full max-w-[340px] h-[510px] rounded-2xl shadow-2xl flex flex-col items-center">
              <AttractiveBookCover book={book} className="w-full h-full" />
            </div>
          )}

          {/* BACK ONLY MODE */}
          {viewMode === 'back-only' && (
            <div className="w-full max-w-sm rounded-2xl border-2 border-[#00D4FF]/50 overflow-hidden shadow-2xl p-6 bg-gradient-to-br from-slate-950 to-zinc-950">
              <div className="space-y-4">
                <div className="border-b border-zinc-800 pb-2">
                  <div className="text-xs font-mono text-[#00D4FF] font-bold uppercase">
                    Back Cover Verification
                  </div>
                  <h3 className="text-lg font-heading font-black text-white mt-1">
                    {book.title}
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-zinc-300 leading-relaxed">
                  <p>{back.synopsis}</p>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs font-mono text-[#FFD700] uppercase font-bold block">
                    Curriculum Competencies:
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-400">
                    {back.learningOutcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-1">
                  <div className="font-bold text-white">{back.authorName} ({back.authorAlias})</div>
                  <p>{back.authorBio}</p>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-mono text-zinc-400">ISBN: {book.isbn || '978-978-794-001-2'}</div>
                    <div className="text-[10px] font-mono text-zinc-500">Contact: {book.contactNumber}</div>
                  </div>
                  <div className="bg-white px-2 py-1 rounded flex items-end gap-[2px] h-8">
                    {[4, 8, 2, 6, 8, 3, 7, 2, 9, 4, 8, 5, 2, 7, 9, 3, 6, 8].map((h, i) => (
                      <div key={i} className="bg-black w-[2px]" style={{ height: `${h * 2.5}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 text-zinc-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Official Author Identity: <strong>{book.authorName} — {book.authorAlias}</strong> ({book.contactNumber})</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDownloadCoverAsset('front')}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Front Vector</span>
            </button>
            <button
              onClick={() => handleDownloadCoverAsset('jacket')}
              className="px-3 py-1.5 rounded-xl bg-[#FFD700] hover:bg-[#E5A800] text-black font-bold transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Full Print Jacket (SVG)</span>
            </button>
          </div>
        </div>
      </div>

      {showVideoModal && (
        <BookToVideoPlayerModal book={book} onClose={() => setShowVideoModal(false)} />
      )}
    </div>
  );
};
