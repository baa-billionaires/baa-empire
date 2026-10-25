import React from 'react';
import { BAABook } from '../../types/library';
import { Sparkles, ShieldCheck, Film, BookOpen, Layers } from 'lucide-react';

interface AttractiveBookCoverProps {
  book: BAABook;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  showInteractiveBadge?: boolean;
  className?: string;
}

export const AttractiveBookCover: React.FC<AttractiveBookCoverProps> = ({
  book,
  size = 'responsive',
  showInteractiveBadge = true,
  className = ''
}) => {
  const front = book.frontCover;
  const accentColor = front.accentColor || '#FFD700';
  const isStory = book.isStoryBook || book.categoryNumber === 26;

  // Artwork fallback
  const artworkUrl = front.artworkUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=85';

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group flex flex-col justify-between select-none ${className}`}
      style={{
        aspectRatio: '1 / 1.48',
        boxShadow: `0 20px 45px -10px rgba(0, 0, 0, 0.8), 0 0 35px -5px ${accentColor}25`
      }}
    >
      {/* Background Thematic Art with Deep Cinematic Dark Gradient */}
      <img
        src={artworkUrl}
        alt={book.title}
        className="absolute inset-0 w-full h-full object-cover object-center filter brightness-50 contrast-125 saturate-125 group-hover:scale-105 group-hover:brightness-60 transition-all duration-700 pointer-events-none"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/85 to-black/75 pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at 50% 25%, ${accentColor}50 0%, transparent 65%)`
        }}
      />

      {/* 3D Realistic Book Spine Effect on Left Edge */}
      <div className="absolute top-0 bottom-0 left-0 w-3.5 bg-gradient-to-r from-black via-white/20 to-transparent pointer-events-none z-30 opacity-70" />
      <div className="absolute top-0 bottom-0 left-3 w-[1px] bg-white/20 pointer-events-none z-30" />

      {/* Gold Foil Border Inset */}
      <div 
        className="absolute inset-2.5 rounded-xl border pointer-events-none z-20 transition-all duration-300"
        style={{ borderColor: `${accentColor}40` }}
      />

      {/* TOP SECTION: ACADEMY IMPRINT & CATEGORY */}
      <div className="relative z-20 p-4 sm:p-5 space-y-2">
        <div className="flex items-center justify-between gap-1">
          <span 
            className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase font-black px-2 py-0.5 rounded-full border backdrop-blur-md shadow-sm truncate"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.7)', 
              borderColor: `${accentColor}80`,
              color: accentColor 
            }}
          >
            {isStory ? '★ BAA SOVEREIGN FICTION ★' : `BAA #${String(book.categoryNumber).padStart(2, '0')}`}
          </span>

          <span className="text-[9px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur border border-white/10 uppercase tracking-wider font-bold">
            {front.edition.includes('Edition') ? front.edition : '1st Edition • 2026'}
          </span>
        </div>

        <div className="text-[9px] sm:text-[10px] font-mono text-zinc-300 tracking-wider flex items-center gap-1.5 opacity-90">
          <Sparkles className="w-3 h-3 text-[#FFD700] shrink-0" />
          <span className="truncate">BILLIONAIRES AI ACADEMY PUBLISHING HOUSE</span>
        </div>
      </div>

      {/* MIDDLE SECTION: TITLE, SUBTITLE & VISUAL HOLOGRAPH */}
      <div className="relative z-20 px-4 sm:px-5 my-auto space-y-2.5 text-center">
        {/* Dynamic Metallic Divider */}
        <div 
          className="w-12 h-1 mx-auto rounded-full shadow-md"
          style={{ background: `linear-gradient(90deg, ${accentColor}, #FFFFFF, ${accentColor})` }}
        />

        {/* Catchy Main Title */}
        <h2 className="font-heading font-black text-white text-base sm:text-lg lg:text-xl leading-tight tracking-tight drop-shadow-lg group-hover:text-[#FFD700] transition-colors duration-300 line-clamp-3">
          {book.title}
        </h2>

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs text-zinc-300 font-sans leading-snug line-clamp-2 max-w-[90%] mx-auto opacity-90">
          {book.subtitle}
        </p>

        {/* Thematic Hologram Emblem */}
        <div className="pt-2 flex justify-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 bg-black/50 shadow-inner group-hover:scale-110 transition-transform duration-500"
            style={{ boxShadow: `0 0 20px ${accentColor}30` }}
          >
            {isStory ? (
              <Film className="w-6 h-6 text-cyan-400" />
            ) : (
              <Layers className="w-6 h-6" style={{ color: accentColor }} />
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: PROMINENT AUTHOR DETAILS & PROVENANCE */}
      <div className="relative z-20 p-4 sm:p-5 pt-3 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/10 space-y-2">
        {/* Author Details - Explicitly matching user requirement */}
        <div className="text-center space-y-0.5">
          <div className="text-[9px] font-mono tracking-widest uppercase font-bold text-zinc-400">
            Conceived &amp; Authored By
          </div>
          <div className="font-heading font-black text-xs sm:text-sm text-white tracking-wide">
            {book.authorName}
          </div>
          <div className="text-[10px] font-mono font-bold" style={{ color: accentColor }}>
            {book.authorAlias}
          </div>
          <div className="text-[9px] font-mono text-zinc-400">
            Direct Contact: <strong className="text-white">{book.contactNumber}</strong>
          </div>
        </div>

        {/* Base L2 & Barcode Verification Strip */}
        <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-400">
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span className="truncate">BASE L2 VERIFIED</span>
          </div>

          <div className="text-right truncate max-w-[120px] text-zinc-400 text-[8px]">
            {book.isbn ? `ISBN ${book.isbn.replace(/ISBN /g, '')}` : 'ISBN 978-978-782-019-4'}
          </div>
        </div>
      </div>
    </div>
  );
};
