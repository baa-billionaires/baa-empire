import React, { useState } from 'react';
import { BAABook } from '../../types/library';
import { 
  X, 
  Download, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  Check, 
  ExternalLink, 
  FileCode, 
  Headphones, 
  Layers, 
  Sparkles,
  CreditCard,
  Coins
} from 'lucide-react';

interface BookDownloadModalProps {
  book: BAABook;
  onClose: () => void;
  onOpenReader?: () => void;
  onOpenCompanionCourse?: () => void;
}

export const BookDownloadModal: React.FC<BookDownloadModalProps> = ({
  book,
  onClose,
  onOpenReader,
  onOpenCompanionCourse
}) => {
  const [downloadFormat, setDownloadFormat] = useState<'epub' | 'pdf' | 'markdown'>('epub');
  const [downloadState, setDownloadState] = useState<'idle' | 'preparing' | 'completed'>('idle');
  const [activeTab, setActiveTab] = useState<'download' | 'verification'>('download');

  // Generate downloadable file
  const handleTriggerDownload = () => {
    setDownloadState('preparing');

    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = 'text/plain';

      if (downloadFormat === 'markdown') {
        filename = `${book.slug}_Monograph_Source.md`;
        mimeType = 'text/markdown;charset=utf-8';
        content = `---
title: "${book.title}"
subtitle: "${book.subtitle}"
author: "${book.authorName} (${book.authorAlias})"
contact: "${book.contactNumber}"
edition: "${book.frontCover.edition}"
isbn: "${book.isbn || '978-978-794-001-2'}"
base_l2_hash: "${book.baseL2Hash || '0xbaa77a94f10c49b01234'}"
publisher: "Billionaires AI Academy (BAA) Autonomous Publishing Empire"
website: "https://baa-empire.vercel.app"
date: "${book.publicationDate}"
---

# ${book.title}
## ${book.subtitle}

**Author:** ${book.authorName} — aka ${book.authorAlias}  
**Contact:** ${book.contactNumber}  
**Publisher:** ${book.backCover.publisherName}  
**ISBN:** ${book.isbn || '978-978-794-001-2'}  
**Base L2 Smart Contract Anchor:** \`${book.baseL2Hash || '0xbaa77a94f10c49b01234'}\`

---

## SYNOPSIS
${book.backCover.synopsis}

## CURRICULUM OUTCOMES
${book.backCover.learningOutcomes.map(item => `- ${item}`).join('\n')}

---

${book.chapters.map(ch => `
# Chapter ${ch.number}: ${ch.title}
*Estimated Study Time: ${ch.estimatedMinutes} minutes | Word Count: ${ch.wordCount} words*

> **Chapter Summary:** ${ch.summary}

${ch.content}

### Key Takeaways
${ch.keyTakeaways.map(t => `- ${t}`).join('\n')}

${ch.codeSnippets && ch.codeSnippets.length > 0 ? `
### Reference Implementation
\`\`\`${ch.codeSnippets[0].language}
${ch.codeSnippets[0].code}
\`\`\`
*Caption: ${ch.codeSnippets[0].caption}*
` : ''}

${ch.practicalExercises && ch.practicalExercises.length > 0 ? `
### Practical Exercises
${ch.practicalExercises.map(e => `1. ${e}`).join('\n')}
` : ''}
---
`).join('\n')}

## ABOUT THE AUTHOR
${book.backCover.authorBio}

Official Publisher: Billionaires AI Academy (BAA)  
Digital Infrastructure: https://baa-empire.vercel.app
`;
      } else if (downloadFormat === 'pdf') {
        filename = `${book.slug}_Print_Ready_Monograph.html`;
        mimeType = 'text/html;charset=utf-8';
        content = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${book.title} — BAA Monograph</title>
<style>
  @page { size: A4; margin: 20mm; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #111; max-width: 800px; margin: 0 auto; padding: 20px; }
  .cover { text-align: center; page-break-after: always; padding: 100px 20px 40px; border: 4px double #FFD700; border-radius: 8px; }
  h1 { font-size: 32px; color: #000; margin-bottom: 8px; }
  h2 { font-size: 18px; color: #555; font-weight: normal; margin-bottom: 24px; }
  .author { font-size: 20px; font-weight: bold; margin-top: 40px; }
  .alias { font-size: 16px; color: #d97706; }
  .meta { font-family: monospace; font-size: 12px; color: #666; margin-top: 20px; }
  .chapter { page-break-before: always; margin-top: 40px; }
  .chapter-num { font-family: monospace; font-weight: bold; color: #2563eb; font-size: 14px; }
  .takeaway { background: #f8fafc; border-left: 4px solid #10b981; padding: 12px 16px; margin: 20px 0; font-size: 14px; }
  pre { background: #0f172a; color: #f8fafc; padding: 16px; border-radius: 6px; overflow-x: auto; font-size: 13px; }
  .footer { border-top: 1px solid #ccc; font-size: 11px; text-align: center; color: #777; margin-top: 40px; padding-top: 10px; }
</style>
</head>
<body>
<div class="cover">
  <div style="font-family: monospace; font-weight: bold; letter-spacing: 2px; color: #2563eb; margin-bottom: 20px;">BILLIONAIRES AI ACADEMY (BAA) MONOGRAPH SERIES</div>
  <h1>${book.title}</h1>
  <h2>${book.subtitle}</h2>
  <div class="author">${book.authorName}</div>
  <div class="alias">${book.authorAlias}</div>
  <div class="meta">
    Direct Contact: ${book.contactNumber}<br>
    Edition: ${book.frontCover.edition} • ISBN: ${book.isbn || '978-978-794-001-2'}<br>
    Base L2 Contract Anchor: ${book.baseL2Hash || '0xbaa77a94f10c49b01234'}
  </div>
</div>

<div class="chapter">
  <h2>Synopsis &amp; Overview</h2>
  <p>${book.backCover.synopsis}</p>
  <h3>Key Learning Competencies</h3>
  <ul>
    ${book.backCover.learningOutcomes.map(item => `<li>${item}</li>`).join('')}
  </ul>
</div>

${book.chapters.map(ch => `
<div class="chapter">
  <div class="chapter-num">CHAPTER ${ch.number}</div>
  <h2>${ch.title}</h2>
  <p><em>Estimated Reading: ${ch.estimatedMinutes} mins • Word Count: ${ch.wordCount}</em></p>
  <div style="white-space: pre-line;">${ch.content}</div>
  <div class="takeaway">
    <strong>Key Takeaways:</strong>
    <ul>
      ${ch.keyTakeaways.map(t => `<li>${t}</li>`).join('')}
    </ul>
  </div>
  ${ch.codeSnippets && ch.codeSnippets.length > 0 ? `
    <pre><code>${ch.codeSnippets[0].code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  ` : ''}
</div>
`).join('')}

<div class="footer">
  Published by ${book.backCover.publisherName} • Author Contact: ${book.contactNumber} • https://baa-empire.vercel.app
</div>
</body>
</html>`;
      } else {
        // EPUB XHTML package format
        filename = `${book.slug}_Sovereign_Edition.html`;
        mimeType = 'text/html;charset=utf-8';
        content = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8" />
<title>${book.title}</title>
<meta name="author" content="${book.authorName} (${book.authorAlias})" />
<meta name="identifier" content="urn:isbn:${book.isbn || '978-978-794-001-2'}" />
<meta name="date" content="${book.publicationDate}" />
<meta name="generator" content="BAA Autonomous Publishing Swarm v2.0" />
<style>
  body { font-family: Georgia, serif; line-height: 1.8; color: #1a1a1a; max-width: 740px; margin: 40px auto; padding: 0 20px; }
  h1, h2, h3 { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-weight: bold; }
  .title-page { text-align: center; margin: 80px 0; }
  .subtitle { color: #666; font-size: 1.2em; }
  .author { font-size: 1.3em; margin-top: 30px; font-weight: bold; }
  .contact { font-family: monospace; font-size: 0.9em; color: #444; }
  .chapter-header { margin-top: 60px; border-top: 2px solid #eee; padding-top: 30px; }
  .summary { background: #f4f6f8; padding: 15px; border-radius: 6px; font-style: italic; }
  code { font-family: monospace; background: #eee; padding: 2px 5px; border-radius: 4px; }
  pre { background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 6px; overflow-x: auto; }
</style>
</head>
<body>
  <div class="title-page">
    <h1>${book.title}</h1>
    <div class="subtitle">${book.subtitle}</div>
    <div class="author">${book.authorName}</div>
    <div style="color: #b45309; font-weight: 600;">${book.authorAlias}</div>
    <div class="contact">Direct Line: ${book.contactNumber} • Base L2: ${book.baseL2Hash || '0xbaa77a94f10c49b01234'}</div>
  </div>

  <h2>Table of Contents</h2>
  <ol>
    ${book.chapters.map(c => `<li><a href="#ch-${c.number}">${c.title}</a> (${c.estimatedMinutes} mins)</li>`).join('\n')}
  </ol>

  ${book.chapters.map(c => `
    <div class="chapter-header" id="ch-${c.number}">
      <h3>Chapter ${c.number}: ${c.title}</h3>
      <div class="summary">${c.summary}</div>
      <div style="white-space: pre-line; margin-top: 20px;">${c.content}</div>
    </div>
  `).join('\n')}

  <div style="margin-top: 80px; border-top: 1px solid #ccc; padding-top: 20px; font-size: 0.85em; color: #666;">
    © 2026 ${book.backCover.publisherName}. All rights reserved. Registered with Base L2 Decentralized Autonomous Monograph Registry.
  </div>
</body>
</html>`;
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadState('completed');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#00D4FF]/20 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FFD700] uppercase font-bold tracking-wider">
                  Validated E-Book Download
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Publication
                </span>
              </div>
              <h3 className="text-base font-heading font-black text-white truncate max-w-sm sm:max-w-md">
                {book.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/40 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 bg-black/60 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('download')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'download' ? 'bg-[#FFD700] text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Format &amp; Download
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'verification' ? 'bg-[#FFD700] text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Smart Contract Proof
            </button>
          </div>

          <div className="text-[11px] text-zinc-400 font-mono">
            Direct Line: <strong>{book.contactNumber}</strong>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {activeTab === 'download' && (
            <div className="space-y-6">
              {/* Format Selection Cards */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">
                  SELECT YOUR PREFERRED EDITION
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* EPUB Option */}
                  <button
                    onClick={() => setDownloadFormat('epub')}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                      downloadFormat === 'epub'
                        ? 'bg-[#FFD700]/10 border-[#FFD700] text-white shadow-lg'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <BookOpen className={`w-5 h-5 ${downloadFormat === 'epub' ? 'text-[#FFD700]' : 'text-zinc-400'}`} />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">EPUB 3.0</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-white text-sm">Interactive E-Book</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        Full responsive flow for Apple Books, Kindle &amp; e-readers.
                      </p>
                    </div>
                  </button>

                  {/* Print-Ready PDF Option */}
                  <button
                    onClick={() => setDownloadFormat('pdf')}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                      downloadFormat === 'pdf'
                        ? 'bg-[#00D4FF]/10 border-[#00D4FF] text-white shadow-lg'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <FileText className={`w-5 h-5 ${downloadFormat === 'pdf' ? 'text-[#00D4FF]' : 'text-zinc-400'}`} />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">PDF / Print</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-white text-sm">Printable Monograph</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        Fixed A4 layout with page numbers and formal typography.
                      </p>
                    </div>
                  </button>

                  {/* Markdown Source */}
                  <button
                    onClick={() => setDownloadFormat('markdown')}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                      downloadFormat === 'markdown'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <FileCode className={`w-5 h-5 ${downloadFormat === 'markdown' ? 'text-emerald-400' : 'text-zinc-400'}`} />
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">MD / LaTeX</span>
                    </div>
                    <div>
                      <h4 className="font-heading font-black text-white text-sm">Obsidian Raw Pack</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        Raw markdown files, python code blocks and equations.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Book Metadata Snapshot */}
              <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Chapters Included:</span>
                  <span className="text-white font-bold">{book.chapters.length} Complete Chapters ({book.pages} pages)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Word Count:</span>
                  <span className="text-white font-bold">
                    {book.chapters.reduce((acc, c) => acc + c.wordCount, 0).toLocaleString()} words
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Official Author:</span>
                  <span className="text-[#FFD700] font-bold">{book.authorName}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Direct Contact:</span>
                  <span className="text-[#00D4FF] font-bold">{book.contactNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">ISBN:</span>
                  <span className="text-zinc-300">{book.isbn || '978-978-794-001-2'}</span>
                </div>
              </div>

              {/* Download Trigger Button */}
              <div className="space-y-3">
                <button
                  onClick={handleTriggerDownload}
                  disabled={downloadState === 'preparing'}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#E5A800] text-black font-heading font-black text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {downloadState === 'preparing' ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-black" />
                      <span>Generating Packaging Blob...</span>
                    </>
                  ) : downloadState === 'completed' ? (
                    <>
                      <Check className="w-4 h-4 text-black stroke-[3]" />
                      <span>Download Ready (Click to re-download)</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-black stroke-[2.5]" />
                      <span>Download {downloadFormat.toUpperCase()} Edition (Free BAA Access)</span>
                    </>
                  )}
                </button>

                {/* Additional Quick Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {onOpenReader && (
                    <button
                      onClick={() => { onClose(); onOpenReader(); }}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-mono font-bold flex items-center justify-center gap-2 transition"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#00D4FF]" />
                      <span>Open in Online Reader</span>
                    </button>
                  )}

                  {onOpenCompanionCourse && book.companionCourse && (
                    <button
                      onClick={() => { onClose(); onOpenCompanionCourse(); }}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-mono font-bold flex items-center justify-center gap-2 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Study Companion Course</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verification' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Base L2 Monograph Hash Proof</span>
                </div>
                <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                  Every published title in the Billionaires AI Academy Autonomous Publishing Empire is cryptographically anchored to ensure provenance, author royalty distribution, and unalterable manuscript verification.
                </p>

                <div className="space-y-1.5 pt-2">
                  <span className="text-zinc-500 text-[10px] uppercase">Smart Contract Transaction Hash</span>
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-emerald-400 break-all select-all">
                    {book.baseL2Hash || '0xbaa77a94f10c49b0123490928ff29028710928a7f9201928374619028374'}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-zinc-500 text-[10px] uppercase">Registered Author Identity</span>
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-[#FFD700]">
                    {book.authorName} — {book.authorAlias} (Direct: {book.contactNumber})
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-zinc-500 text-[10px] uppercase">Digital Rights &amp; Royalties Split</span>
                  <div className="bg-black p-2.5 rounded-xl border border-zinc-800 text-zinc-300 flex items-center justify-between">
                    <span>60% Author Sovereign Pool</span>
                    <span className="text-emerald-400">40% BAA Perpetual Treasury</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-zinc-400">
            Publishing Portal: <strong className="text-white">baa-empire.vercel.app</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
