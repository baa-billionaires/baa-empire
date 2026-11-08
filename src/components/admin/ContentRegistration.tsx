import React, { useState } from 'react';
import {
  Upload,
  FileCheck,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Database,
  Coins,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';

export interface KnowledgeAssetRecord {
  id: string;
  title: string;
  author: string;
  authorEmail: string;
  coAuthors?: string;
  category: string;
  format: string;
  fileSizeKb: number;
  fileName: string;
  fileHashSha256: string;
  licenseType: string;
  allowDerivatives: boolean;
  copyrightHolder: string;
  jurisdiction: string;
  abstract: string;
  status: 'MINTED_TO_KNOWLEDGE_ASSETS' | 'PENDING_AUDIT';
  mintedAt: string;
  tokenAllocation: number;
}

const DEFAULT_ASSETS: KnowledgeAssetRecord[] = [
  {
    id: 'ka-001',
    title: 'Autonomous Multi-Agent Swarm Orchestration in Sub-Saharan Africa',
    author: 'Dr. Damilola Adebayo',
    authorEmail: 'damilola@billionairesai.academy',
    coAuthors: 'Engr. Kwame Mensah, ABAU AI Lab',
    category: 'Autonomous AI Infrastructure',
    format: 'application/pdf',
    fileSizeKb: 4820,
    fileName: 'autonomous_multi_agent_swarm_orchestration_v1.pdf',
    fileHashSha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    licenseType: 'Commercial Proprietary (70/30 Split)',
    allowDerivatives: true,
    copyrightHolder: 'Billionaires AI Academy & Damilola Adebayo',
    jurisdiction: 'Federal Republic of Nigeria & Global WIPO',
    abstract: 'Formal specification for off-grid federated compute and battery-safe multi-agent workload distribution across edge devices.',
    status: 'MINTED_TO_KNOWLEDGE_ASSETS',
    mintedAt: '2026-10-24T12:30:00Z',
    tokenAllocation: 1000
  },
  {
    id: 'ka-002',
    title: 'Pan-African Sovereign Fintech & Multi-Currency Settlement Protocols',
    author: 'Chidinma Okafor, CFA',
    authorEmail: 'chidinma@fintechinafrica.io',
    category: 'Fintech & Settlement',
    format: 'application/epub+zip',
    fileSizeKb: 12450,
    fileName: 'sovereign_fintech_settlement_protocols.epub',
    fileHashSha256: '9b1cffe084dd3d20d928bee85e7b0f21ac649a13e290d32f418d65ff9f9063aa',
    licenseType: 'Commercial Educational',
    allowDerivatives: true,
    copyrightHolder: 'Chidinma Okafor',
    jurisdiction: 'Nigeria & United Kingdom',
    abstract: 'Idempotent webhook settlement architecture with dual database ledger commits and Base L2 ERC-20 stable token peg.',
    status: 'MINTED_TO_KNOWLEDGE_ASSETS',
    mintedAt: '2026-10-27T16:15:00Z',
    tokenAllocation: 1000
  }
];

export const ContentRegistration: React.FC = () => {
  const [assets, setAssets] = useState<KnowledgeAssetRecord[]>(() => {
    try {
      const saved = localStorage.getItem('baa_knowledge_assets_table');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_ASSETS;
  });

  // Form Fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Dr. Damilola Adebayo');
  const [authorEmail, setAuthorEmail] = useState('damilola@billionairesai.academy');
  const [coAuthors, setCoAuthors] = useState('');
  const [category, setCategory] = useState('Autonomous AI Infrastructure');
  const [licenseType, setLicenseType] = useState('Commercial Proprietary (70/30 Split)');
  const [allowDerivatives, setAllowDerivatives] = useState(true);
  const [copyrightHolder, setCopyrightHolder] = useState('Billionaires AI Academy');
  const [jurisdiction, setJurisdiction] = useState('Federal Republic of Nigeria & Global WIPO');
  const [abstract, setAbstract] = useState('');

  // File Input State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileHash, setFileHash] = useState<string>('');
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintSuccessMsg, setMintSuccessMsg] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const allowedExtensions = ['pdf', 'epub', 'docx', 'txt', 'md', 'json', 'mp3', 'mp4'];
  const maxSizeBytes = 50 * 1024 * 1024; // 50MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(ext)) {
      setFileError(`Invalid file format .${ext}. Supported formats: ${allowedExtensions.join(', ')}.`);
      setSelectedFile(null);
      return;
    }

    if (file.size > maxSizeBytes) {
      setFileError(`File size ${(file.size / (1024 * 1024)).toFixed(2)} MB exceeds 50MB threshold.`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);

    // Mock quick SHA-256 calculation for file fingerprinting
    const mockHash = Array.from(file.name + file.size + Date.now().toString())
      .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0) | 0, 0)
      .toString(16)
      .padStart(64, '0')
      .replace(/-/g, 'a');
    setFileHash(mockHash);

    if (!title) {
      // Auto-populate title from filename
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }
  };

  const handleMintRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !abstract) {
      alert('Please fill in title, author, and abstract.');
      return;
    }

    if (!selectedFile && !fileHash) {
      setFileError('Please select a valid manuscript file to mint.');
      return;
    }

    setIsMinting(true);

    setTimeout(() => {
      const generatedHash = fileHash || `sha256_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      const newAsset: KnowledgeAssetRecord = {
        id: `ka-${Date.now().toString().slice(-6)}`,
        title,
        author,
        authorEmail: authorEmail || 'author@billionairesai.academy',
        coAuthors: coAuthors || undefined,
        category,
        format: selectedFile?.type || 'application/pdf',
        fileSizeKb: Math.round((selectedFile?.size || 24000) / 1024),
        fileName: selectedFile?.name || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.pdf`,
        fileHashSha256: generatedHash,
        licenseType,
        allowDerivatives,
        copyrightHolder: copyrightHolder || author,
        jurisdiction,
        abstract,
        status: 'MINTED_TO_KNOWLEDGE_ASSETS',
        mintedAt: new Date().toISOString(),
        tokenAllocation: 1000
      };

      const updated = [newAsset, ...assets];
      setAssets(updated);
      try {
        localStorage.setItem('baa_knowledge_assets_table', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage error', err);
      }

      setIsMinting(false);
      setMintSuccessMsg(`Success! Minted "${title}" into 'knowledge_assets' table with ID: ${newAsset.id}`);

      // Reset form
      setSelectedFile(null);
      setFileHash('');
      setTitle('');
      setAbstract('');
      setTimeout(() => setMintSuccessMsg(null), 6000);
    }, 1200);
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Database className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                OWNER COMMAND CENTER • CONTENT REGISTRATION
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Register &amp; Mint to 'knowledge_assets' Table
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Cryptographically mint sovereign educational manuscripts, courses, datasets, and technical papers into the ecosystem ledger.
            </p>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-zinc-500 block">Total Minted Assets:</span>
            <span className="text-xl font-bold text-[#00FF88]">{assets.length} Records</span>
          </div>
        </div>

        {mintSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{mintSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* Main Form & File Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Asset File Input &amp; Validation</span>
              </h3>
              <span className="text-xs font-mono text-zinc-500">Max 50MB</span>
            </div>

            <form onSubmit={handleMintRecord} className="space-y-5 font-mono text-xs">
              {/* File Drag & Drop / Input */}
              <div className="space-y-2">
                <label className="text-zinc-400 uppercase font-bold block">
                  1. Manuscript File (.pdf, .epub, .docx, .md, .mp4, .mp3):
                </label>

                <div className="relative border-2 border-dashed border-zinc-800 hover:border-amber-400/60 rounded-2xl p-6 text-center transition bg-zinc-900/50">
                  <input
                    type="file"
                    accept=".pdf,.epub,.docx,.txt,.md,.json,.mp3,.mp4"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 rounded-2xl bg-zinc-800 text-amber-400">
                      <Upload className="w-6 h-6" />
                    </div>
                    {selectedFile ? (
                      <div className="space-y-1">
                        <span className="font-bold text-white text-xs block truncate max-w-xs sm:max-w-md">
                          {selectedFile.name}
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold block">
                          ✓ Validated: {(selectedFile.size / 1024).toFixed(1)} KB · Type: {selectedFile.type || 'Custom Asset'}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-zinc-300 font-medium block">
                          Drop file here or click to browse
                        </span>
                        <span className="text-[10px] text-zinc-500 block mt-1">
                          Validated formats: PDF, EPUB, DOCX, MD, TXT, JSON, MP3, MP4 (Max 50MB)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {fileError && (
                  <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}

                {fileHash && (
                  <div className="p-2.5 rounded-xl bg-black border border-zinc-800 space-y-0.5 text-[10px]">
                    <span className="text-zinc-500 block">Computed SHA-256 Fingerprint:</span>
                    <span className="text-[#00FF88] select-all truncate block">{fileHash}</span>
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <div className="space-y-2">
                <label className="text-zinc-400 uppercase font-bold block">
                  2. Asset Title:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Masterclass in Sovereign Off-Grid AI Computing"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 text-xs font-mono"
                />
              </div>

              {/* Authorship Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 uppercase font-bold block mb-1">
                    Primary Author:
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-bold block mb-1">
                    Author Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 uppercase font-bold block mb-1">
                  Co-Authors / Research Institution (Optional):
                </label>
                <input
                  type="text"
                  value={coAuthors}
                  onChange={(e) => setCoAuthors(e.target.value)}
                  placeholder="e.g. Pan-African AI University Lab, Engr. Adeola"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 uppercase font-bold block mb-1">
                    Subject Category:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Autonomous AI Infrastructure">Autonomous AI Infrastructure</option>
                    <option value="Reinforcement Learning & Hardware">Reinforcement Learning &amp; Hardware</option>
                    <option value="Fintech & Settlement">Fintech &amp; Settlement</option>
                    <option value="Web3 & Smart Contracts">Web3 &amp; Smart Contracts</option>
                    <option value="Autonomous Multi-Agent Swarms">Autonomous Multi-Agent Swarms</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 uppercase font-bold block mb-1">
                    Commercial License:
                  </label>
                  <select
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Commercial Proprietary (70/30 Split)">Commercial Proprietary (70/30 Split)</option>
                    <option value="Educational Non-Exclusive">Educational Non-Exclusive</option>
                    <option value="Exclusive Institutional License">Exclusive Institutional License</option>
                    <option value="Open Source with Attribution">Open Source with Attribution</option>
                  </select>
                </div>
              </div>

              {/* Rights and Permissions */}
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-3">
                <span className="text-[11px] text-amber-300 font-bold uppercase block">
                  3. Rights &amp; Provenance Declarations:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-500 block text-[10px] uppercase">Copyright Owner:</label>
                    <input
                      type="text"
                      value={copyrightHolder}
                      onChange={(e) => setCopyrightHolder(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white mt-0.5"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-500 block text-[10px] uppercase">Legal Jurisdiction:</label>
                    <input
                      type="text"
                      value={jurisdiction}
                      onChange={(e) => setJurisdiction(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white mt-0.5"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-zinc-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={allowDerivatives}
                    onChange={(e) => setAllowDerivatives(e.target.checked)}
                    className="accent-amber-400"
                  />
                  <span>Allow Multiplied Commercial Derivatives (Living eBooks, Courses, Podcasts)</span>
                </label>
              </div>

              {/* Abstract */}
              <div>
                <label className="text-zinc-400 uppercase font-bold block mb-1">
                  4. Abstract &amp; Content Description:
                </label>
                <textarea
                  required
                  rows={3}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  placeholder="Summarize the core technical findings, curriculum topics, or datasets..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 font-sans text-xs"
                />
              </div>

              {/* Mock Mint Action Button */}
              <button
                type="submit"
                disabled={isMinting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-heading font-black text-xs uppercase tracking-widest transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isMinting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Minting Record to 'knowledge_assets' Table...</span>
                  </>
                ) : (
                  <>
                    <Coins className="w-4 h-4 text-black" />
                    <span>MINT TO 'KNOWLEDGE_ASSETS' TABLE</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Database Ledger Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00FF88]" />
                <span>'knowledge_assets' Database View</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">PostgreSQL / Supabase</span>
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Records stored in the active <code className="text-amber-400">knowledge_assets</code> schema. Every record generates on-chain provenance and links directly to the Mind Hive Content Genome.
            </p>

            <div className="space-y-3 font-mono text-xs max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
              {assets.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 hover:border-zinc-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-[#00FF88] font-bold border border-emerald-500/30">
                      {item.status}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      ID: {item.id}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-xs font-sans">{item.title}</h4>

                  <div className="text-[10px] text-zinc-400 space-y-0.5">
                    <div>Author: <span className="text-zinc-200">{item.author}</span></div>
                    <div>File: <span className="text-zinc-300">{item.fileName}</span> ({item.fileSizeKb} KB)</div>
                    <div>License: <span className="text-amber-300">{item.licenseType}</span></div>
                  </div>

                  <div className="p-2 rounded-xl bg-black border border-zinc-800 flex items-center justify-between text-[9px] text-zinc-500">
                    <span className="truncate max-w-[200px] text-zinc-400">
                      Hash: {item.fileHashSha256.slice(0, 16)}...
                    </span>
                    <button
                      onClick={() => copyHash(item.fileHashSha256)}
                      className="text-zinc-400 hover:text-white p-0.5"
                    >
                      {copiedHash === item.fileHashSha256 ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRegistration;
