import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { NFTCertificatePreviewModal } from '../components/NFTCertificatePreviewModal';
import { CertificateNFT } from '../types';
import {
  GraduationCap,
  MapPin,
  Building,
  Award,
  Globe2,
  Cpu,
  Layers,
  ChevronRight,
  BookOpen,
  CheckCircle,
  FileText,
  Search,
  ShieldCheck,
  Terminal,
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const UniversityPage: React.FC<{ onNavigateToAcademy: () => void }> = ({ onNavigateToAcademy }) => {
  const { certificates } = useEcosystem();
  const [activeTab, setActiveTab] = useState<'programs' | 'map' | 'faculty' | 'validator'>('programs');
  const [selectedCampusNode, setSelectedCampusNode] = useState<string>('node-1');
  const [validatorQuery, setValidatorQuery] = useState<string>('0xBAAC-990-SOVEREIGN-MASTER-2026');
  const [previewCert, setPreviewCert] = useState<CertificateNFT | null>(null);

  const campusNodes = [
    {
      id: 'node-1',
      title: 'Turing-Fela Cyber Innovation Hall',
      desc: 'Central lecture amphitheater with holographic AI tutor pods and high-bandwidth neural terminals.',
      x: '30%',
      y: '35%',
      type: 'Academic Hub'
    },
    {
      id: 'node-2',
      title: 'Kainji Green Hydro Compute Nexus',
      desc: 'Zero-emission sovereign AI server racks powered by hydro turbines, housing student training clusters.',
      x: '65%',
      y: '25%',
      type: 'Autonomous Data Center'
    },
    {
      id: 'node-3',
      title: 'Zainab Bello Cryptography Institute',
      desc: 'Auditing smart contracts, zero-knowledge proofs, and sovereign African central bank currencies.',
      x: '48%',
      y: '60%',
      type: 'Research Lab'
    },
    {
      id: 'node-4',
      title: 'Silicon Savannah Student Residencies',
      desc: 'Modern collaborative living quarters equipped with fiber-optic mesh and decentralized solar microgrids.',
      x: '75%',
      y: '70%',
      type: 'Residential'
    },
    {
      id: 'node-5',
      title: 'Chancellor Sterling Sovereign Tower',
      desc: 'Administrative command center, autonomous scout operations room, and institutional partnership vault.',
      x: '20%',
      y: '75%',
      type: 'Administration'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* University Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <GraduationCap className="w-4 h-4 text-[#00D4FF]" />
            Africa Blockchain &amp; AI University (ABAU)
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            The Sovereign African Institution
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Pioneering autonomous curriculum, EVM blockchain infrastructure, and sovereign African machine intelligence. Offering accredited undergraduate, master's, and doctoral fellowships.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl self-center sm:self-auto shrink-0 text-xs gap-1">
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'programs'
                ? 'bg-[#FFD700] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Academic Programs
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'map'
                ? 'bg-[#00D4FF] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Virtual Campus Map
          </button>
          <button
            onClick={() => setActiveTab('faculty')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'faculty'
                ? 'bg-[#FFD700] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Faculty Deans
          </button>
          <button
            onClick={() => setActiveTab('validator')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'validator'
                ? 'bg-gradient-to-r from-emerald-400 to-[#00D4FF] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NFT Credential Validator</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* PROGRAMS TAB */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Degree 1 */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700]/50 transition flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-[10px] font-mono text-[#FFD700] uppercase font-bold tracking-wider">
                  4-Year Undergraduate Degree
                </span>
                <h3 className="text-xl font-heading font-black text-white mt-2">
                  B.Sc. in Autonomous Intelligence &amp; Robotics
                </h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Focuses on building self-healing agentic systems, agricultural computer vision drones, and commercial neural prompt matrixes.
                </p>
                <div className="mt-6 space-y-2 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Includes 10,000 BaaCoin Student Grant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Mandatory H100 GPU Cluster Lab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>60/40 Marketplace Graduation Listing</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <button
                  onClick={onNavigateToAcademy}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                >
                  Apply For Cohort 2026
                </button>
              </div>
            </div>

            {/* Degree 2 */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#00D4FF]/50 transition flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-[10px] font-mono text-[#00D4FF] uppercase font-bold tracking-wider">
                  2-Year Master's Degree
                </span>
                <h3 className="text-xl font-heading font-black text-white mt-2">
                  M.Sc. in Decentralized Systems &amp; Cryptography
                </h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Advanced zero-knowledge proof protocols, cross-border African settlement networks, and algorithmic stablecoin engineering.
                </p>
                <div className="mt-6 space-y-2 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Auditing Real-World Smart Contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CBDC Interoperability Research</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Tradable NFT Diploma with Engraved Chip</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <button
                  onClick={onNavigateToAcademy}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
                >
                  Apply For Master's
                </button>
              </div>
            </div>

            {/* Degree 3 */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-purple-500/50 transition flex flex-col justify-between shadow-2xl">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider">
                  3-Year Doctoral Fellowship
                </span>
                <h3 className="text-xl font-heading font-black text-white mt-2">
                  Ph.D. in Autonomous Sovereign Computing
                </h3>
                <p className="text-xs text-zinc-400 mt-3 leading-relaxed">
                  Doctoral defense in ultra-low latency compute clustering, indigenous African NLP language tokenization, and energy grid optimization.
                </p>
                <div className="mt-6 space-y-2 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fully Funded Fellowship ($50k/year)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Access to Hydro Data Center</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Patents Managed by University DAO</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900">
                <button
                  onClick={onNavigateToAcademy}
                  className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-bold text-xs uppercase tracking-wider transition"
                >
                  Submit Research Proposal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CAMPUS MAP TAB */}
        {activeTab === 'map' && (
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-10 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-heading font-black text-white">
                Interactive Sovereign Campus Map
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Explore the 500-hectare autonomous research campus spanning Abuja &amp; Kainji hydro corridors. Click any node to inspect facilities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Virtual Map Canvas / Graphic (8 Cols) */}
              <div className="lg:col-span-8 relative aspect-[16/10] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 cyber-grid">
                {/* Background decorative satellite contours */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full bg-[radial-gradient(#00D4FF_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                {/* Campus River & Green Hydro Canal */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d="M 0 45 Q 35 25 60 55 T 100 40"
                    stroke="#00D4FF"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M 20 0 L 20 100"
                    stroke="#FFD700"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    opacity="0.2"
                  />
                  <path
                    d="M 70 0 L 70 100"
                    stroke="#FFD700"
                    strokeWidth="0.5"
                    strokeDasharray="2 2"
                    opacity="0.2"
                  />
                </svg>

                {/* Campus Interactive Nodes */}
                {campusNodes.map((node) => {
                  const isSelected = selectedCampusNode === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedCampusNode(node.id)}
                      style={{ left: node.x, top: node.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all duration-300 flex items-center gap-2 group ${
                        isSelected
                          ? 'bg-[#FFD700] text-black scale-110 shadow-xl shadow-[#FFD700]/30 z-20'
                          : 'bg-black/85 text-white border border-zinc-700 hover:border-[#00D4FF] z-10'
                      }`}
                    >
                      <Building className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-[#00D4FF]'}`} />
                      <span className="text-[11px] font-mono font-bold whitespace-nowrap hidden sm:inline">
                        {node.title.split(' ')[0]} {node.title.split(' ')[1]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Details (4 Cols) */}
              <div className="lg:col-span-4 bg-zinc-900/60 rounded-2xl border border-zinc-800 p-6 space-y-4">
                {(() => {
                  const current = campusNodes.find((n) => n.id === selectedCampusNode) || campusNodes[0];
                  return (
                    <>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#00D4FF] font-bold uppercase">{current.type}</span>
                        <MapPin className="w-4 h-4 text-[#FFD700]" />
                      </div>
                      <h4 className="text-lg font-heading font-black text-white">{current.title}</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">{current.desc}</p>
                      <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs font-mono text-zinc-400">
                        <div>Status: <span className="text-emerald-400 font-bold">Operational (100% Uptime)</span></div>
                        <div>Connectivity: <span className="text-white">100 Gbps Subsea Fiber</span></div>
                        <div>Power: <span className="text-emerald-400">Solar-Hydro Hybrid Grid</span></div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* FACULTY DEANS TAB */}
        {activeTab === 'faculty' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                alt="Prof. Adaeze Obi"
                className="w-full aspect-square rounded-xl object-cover mb-4"
              />
              <h4 className="text-base font-bold text-white font-heading">Prof. Adaeze Obi</h4>
              <span className="text-xs text-[#00D4FF] font-mono block">Dean of Cryptography &amp; EVM</span>
              <p className="text-xs text-zinc-400 mt-2">
                Former research scientist at MIT Blockchain Lab. Pioneer of zero-knowledge proofs for Pan-African cross-border trade.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                alt="Dr. Chukwuma Sterling"
                className="w-full aspect-square rounded-xl object-cover mb-4"
              />
              <h4 className="text-base font-bold text-white font-heading">Dr. Chukwuma Sterling</h4>
              <span className="text-xs text-[#FFD700] font-mono block">Chancellor &amp; AI Systems Architect</span>
              <p className="text-xs text-zinc-400 mt-2">
                Architect of the BaaCoin 10x Networth mechanism and autonomous prompt monetization pipelines across Africa.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                alt="Tariq Al-Mansoor"
                className="w-full aspect-square rounded-xl object-cover mb-4"
              />
              <h4 className="text-base font-bold text-white font-heading">Tariq Al-Mansoor</h4>
              <span className="text-xs text-emerald-400 font-mono block">Dean of Sovereign Infrastructure</span>
              <p className="text-xs text-zinc-400 mt-2">
                Designed high-density liquid-cooled GPU facilities across the Middle East and sub-Saharan Africa with 1.08 PUE.
              </p>
            </div>
          </div>
        )}

        {/* ON-CHAIN NFT CREDENTIAL VALIDATOR TAB */}
        {activeTab === 'validator' && (
          <div className="space-y-8">
            {/* Header & Verification Query Bar */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 via-[#00D4FF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Base L2 Soulbound On-Chain Credential Registry</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-heading font-black text-white mt-2">
                  Institutional Degree &amp; Fellowship Verification
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                  Every Africa Blockchain &amp; AI University degree is permanently engraved onto the Base Layer-2 Ethereum Mainnet. Soulbound ERC-721 tokens feature immutable proof of work, an integrated 990 BAA BaaCoin chip, and cryptographic signatures from Academic Deans.
                </p>

                {/* Search Bar */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={validatorQuery}
                      onChange={(e) => setValidatorQuery(e.target.value)}
                      placeholder="Enter Token ID (e.g. 0xBAAC-990-SOVEREIGN...) or Student Name..."
                      className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const matched = certificates.find(
                        (c) =>
                          c.nft_id.toLowerCase().includes(validatorQuery.trim().toLowerCase()) ||
                          c.student_name.toLowerCase().includes(validatorQuery.trim().toLowerCase()) ||
                          c.course_title.toLowerCase().includes(validatorQuery.trim().toLowerCase())
                      );
                      if (matched) {
                        setPreviewCert(matched);
                      } else if (certificates.length > 0) {
                        setPreviewCert(certificates[0]);
                      }
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-[#00D4FF] hover:from-emerald-300 hover:to-[#5ee7df] text-black font-black text-xs rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
                  >
                    <Search className="w-4 h-4" />
                    <span>Verify &amp; Preview</span>
                  </button>
                </div>

                {/* Preset Fast Lookups */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono text-zinc-400">
                  <span className="text-zinc-500">Sample Registry Tokens:</span>
                  <button
                    onClick={() => {
                      setValidatorQuery('0xBAAC-990-SOVEREIGN-MASTER-2026');
                      const found = certificates.find((c) => c.nft_id.includes('MASTER'));
                      if (found) setPreviewCert(found);
                    }}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-emerald-400 text-emerald-400 transition"
                  >
                    Tariq Sterling (Chancellor Fellow)
                  </button>
                  <button
                    onClick={() => {
                      setValidatorQuery('0xBAAC-990-SOVEREIGN-GRAD-2026');
                      const found = certificates.find((c) => c.nft_id.includes('GRAD'));
                      if (found) setPreviewCert(found);
                    }}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 hover:border-[#00D4FF] text-[#00D4FF] transition"
                  >
                    Chioma Adeyemi (Valedictorian)
                  </button>
                </div>
              </div>
            </div>

            {/* Live On-Chain Telemetry & Verified Certificate Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Telemetry Box */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <span className="text-zinc-400 uppercase font-bold text-[10px]">SMART CONTRACT TELEMETRY</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    SYNCED (Block #24,910,211)
                  </span>
                </div>

                <div className="space-y-2 text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Network:</span>
                    <span className="text-white font-bold">Base L2 Mainnet (8453)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Contract:</span>
                    <span className="text-[#00D4FF] font-bold">0x8892BAAC...CertRegistry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Token Standard:</span>
                    <span className="text-white font-bold">ERC-721 Soulbound</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Integrated Chip:</span>
                    <span className="text-[#FFD700] font-bold">990 BAA ($990.00 USD)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Peg Backing:</span>
                    <span className="text-emerald-400 font-bold">100% Naira / Paystack Escrow</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Metadata Storage:</span>
                    <span className="text-zinc-300">IPFS + Arweave Mirror</span>
                  </div>
                </div>

                <div className="p-3 bg-black/60 rounded-xl border border-zinc-900 text-[10px] space-y-1 text-zinc-400">
                  <div className="text-zinc-300 font-bold">Sovereign Validation Rule:</div>
                  <p>
                    Transfers are blocked by smart contract code. Credential authenticity is verified by consensus among ABAU Faculty Dean multisig keys.
                  </p>
                </div>
              </div>

              {/* Verified Certificates List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white font-bold">RECENT INSTITUTIONAL GRADUATES ({certificates.length})</span>
                  <span className="text-zinc-500 text-[10px]">Real-time Base RPC Sync</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-[#FFD700]/50 transition flex flex-col justify-between space-y-4 group shadow-xl"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                            VERIFIED HONORS
                          </span>
                          <span className="text-[10px] font-mono text-[#FFD700] font-bold">
                            {cert.baacoin_engraved} BAA CHIP
                          </span>
                        </div>

                        <h4 className="font-heading font-black text-white text-base group-hover:text-[#FFD700] transition">
                          {cert.student_name}
                        </h4>
                        <p className="text-xs text-zinc-300 font-medium">
                          {cert.course_title}
                        </p>
                        <div className="text-[10px] font-mono text-zinc-500 truncate">
                          ID: {cert.nft_id}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400">{cert.issue_date}</span>
                        <button
                          onClick={() => setPreviewCert(cert)}
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] hover:from-[#FFE234] hover:to-[#FFB733] text-black text-xs font-bold font-mono flex items-center gap-1.5 transition shadow-md"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Preview NFT Certificate</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* High-Resolution NFT Certificate Preview Modal */}
      <NFTCertificatePreviewModal
        certificate={previewCert}
        isOpen={!!previewCert}
        onClose={() => setPreviewCert(null)}
      />
    </div>
  );
};
export default UniversityPage;
