import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Cpu,
  Zap,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  RotateCw,
  Award,
  Layers,
  Activity,
  Globe2,
  Lock,
  ArrowRight,
  Sparkles,
  Server,
  Smartphone,
  Laptop,
  Tv,
  Check,
  Hash,
  FileCheck2,
  ChevronRight,
  X
} from 'lucide-react';
import { UniversalComputePassportData, ContributionHistoryEntry } from '../../types/uaaig';
import { RegisteredDevice } from '../../types/udwn';
import { generateComputePassport } from '../../utils/computePassportGenerator';

interface UniversalComputePassportProps {
  device?: RegisteredDevice;
  allDevices?: RegisteredDevice[];
  onSelectDevice?: (device: RegisteredDevice) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const UniversalComputePassport: React.FC<UniversalComputePassportProps> = ({
  device,
  allDevices = [],
  onSelectDevice,
  onClose,
  isModal = false
}) => {
  // If no device passed, create a default high-performance laptop node
  const [activeDevice, setActiveDevice] = useState<RegisteredDevice>(
    device || (allDevices.length > 0 ? allDevices[0] : {
      id: 'dev-primary-1',
      name: 'MacBook Pro M3 Max (Primary Lab Node)',
      hardwareType: 'laptop',
      category: 'personal',
      specs: {
        cpuCores: 16,
        ramGb: 64,
        gpuRenderer: 'Apple M3 Max 40-Core GPU',
        hasWebGL: true,
        hasWebGpu: true,
        osName: 'macOS Sonoma',
        networkDownlinkMbps: 350
      },
      limits: {
        cpuLimitPercent: 65,
        gpuLimitPercent: 70,
        memoryLimitGb: 32,
        minBatteryPercent: 30,
        onlyWhileCharging: true,
        maxTemperatureCelsius: 75,
        maxBandwidthMbPerHour: 5000
      },
      permittedWorkloads: ['ai_inference', 'scientific_research', 'rendering_3d'],
      status: 'active',
      wealthScore: {
        overallScore: 94,
        tier: 'Platinum',
        availableCapacityScore: 95,
        completedWorkloadsScore: 92,
        reliabilityUptimeScore: 96,
        energyEfficiencyScore: 93,
        jobQualityScore: 94,
        contributionHistoryScore: 91,
        netEarningsFactor: 1.45
      },
      benchmarkFlopsGiga: 3850,
      totalCompletedJobs: 128,
      totalActiveHours: 142,
      lastHeartbeat: new Date().toISOString(),
      connectedAt: '2026-02-15T10:00:00.000Z',
      isCurrentDevice: true
    })
  );

  const [cardSide, setCardSide] = useState<'front' | 'back' | 'history'>('front');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // Generate Passport Data from active device
  const passport: UniversalComputePassportData = React.useMemo(() => {
    return generateComputePassport(activeDevice, 'Dr. Sovereign Contributor');
  }, [activeDevice]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getHardwareIcon = (type: string) => {
    switch (type) {
      case 'smartphone': return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'laptop': return <Laptop className="w-5 h-5 text-emerald-400" />;
      case 'desktop':
      case 'workstation': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'server': return <Server className="w-5 h-5 text-indigo-400" />;
      case 'tv': return <Tv className="w-5 h-5 text-rose-400" />;
      default: return <Cpu className="w-5 h-5 text-[#00FF88]" />;
    }
  };

  const getShieldGradient = (level: string) => {
    switch (level) {
      case 'tier4_sovereign_institutional':
        return 'from-amber-400 via-[#FFD700] to-yellow-600 text-black';
      case 'tier3_cryptographic_node':
        return 'from-emerald-400 via-[#00FF88] to-teal-600 text-black';
      case 'tier2_matrix_verified':
        return 'from-cyan-400 via-[#00D4FF] to-blue-600 text-black';
      default:
        return 'from-zinc-300 via-zinc-100 to-zinc-400 text-black';
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#00FF88] uppercase font-bold">
              Universal Autonomous AI Infrastructure Grid
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
            <span>UNIVERSAL COMPUTE PASSPORT</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
              TAMPER-PROOF ID
            </span>
          </h2>
          <p className="text-xs text-zinc-400 max-w-xl font-sans mt-1">
            Official cryptographic identity document attesting verified silicon capability, thermal safety, and on-chain compute contribution rights across the global decentralized network.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {allDevices.length > 1 && (
            <select
              value={activeDevice.id}
              onChange={(e) => {
                const found = allDevices.find(d => d.id === e.target.value);
                if (found) {
                  setActiveDevice(found);
                  if (onSelectDevice) onSelectDevice(found);
                }
              }}
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-750 text-xs font-mono text-white focus:outline-none focus:border-[#00FF88]"
            >
              {allDevices.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.specs.osName})
                </option>
              ))}
            </select>
          )}

          {/* Flip Mode Buttons */}
          <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setCardSide('front')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                cardSide === 'front' ? 'bg-[#00FF88] text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Front Pass
            </button>
            <button
              onClick={() => setCardSide('back')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                cardSide === 'back' ? 'bg-[#00FF88] text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Silicon Profile
            </button>
            <button
              onClick={() => setCardSide('history')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                cardSide === 'history' ? 'bg-[#00FF88] text-black shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Verified Ledger
            </button>
          </div>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Passport Presentation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Holographic Luxury Physical Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Outer Border Glowing Card Wrapper */}
          <div className="w-full max-w-xl relative group">
            {/* Ambient luxury glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/30 via-[#00FF88]/20 to-[#00D4FF]/30 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            {/* The Physical Card Container */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0d14] via-[#08080c] to-[#040407] border border-amber-500/40 p-6 sm:p-8 text-white shadow-2xl space-y-6">
              {/* Card Holographic Watermark Background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-5 bg-repeat"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #FFD700 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Gold Geometric Security Guilloche Line Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#FFD700] via-[#00FF88] to-amber-500" />

              {/* FRONT VIEW */}
              {cardSide === 'front' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Top Row: Emblems & Passport Number */}
                  <div className="flex items-start justify-between gap-4 border-b border-amber-500/20 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-600/10 border border-amber-400/50 flex items-center justify-center p-2.5 shadow-inner">
                        <Award className="w-full h-full text-[#FFD700]" />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300/80 block">
                          FEDERAL SOVEREIGN COMPUTE EMPIRE
                        </span>
                        <h4 className="font-heading font-black text-base text-white tracking-wide">
                          BILLIONAIRE AI ACADEMY
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Autonomous Infrastructure Verification Authority
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase block">Passport No.</span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#FFD700] tracking-wider block">
                        {passport.passportNumber}
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        ACTIVE VALID
                      </span>
                    </div>
                  </div>

                  {/* Middle Section: Device Identity & Verification Shield */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Device Icon + Hardware Chip Avatar */}
                    <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-amber-400/30 flex items-center justify-center shadow-lg">
                        {getHardwareIcon(passport.hardwareType)}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">
                          NODE TYPE
                        </span>
                        <span className="text-xs font-mono font-bold text-white capitalize">
                          {passport.nodeCategory} Node
                        </span>
                      </div>
                      {/* Integrated Silicon Security Microchip Visual */}
                      <div className="w-8 h-6 rounded-sm bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/60 flex items-center justify-center shadow-sm">
                        <Cpu className="w-3.5 h-3.5 text-zinc-950" />
                      </div>
                    </div>

                    {/* Node Specifications & Identity (2 Cols) */}
                    <div className="sm:col-span-2 space-y-3">
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 block">
                          REGISTERED DEVICE NAME
                        </span>
                        <h3 className="font-heading font-black text-lg text-white truncate" title={passport.deviceName}>
                          {passport.deviceName}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div>
                          <span className="text-zinc-500 text-[9px] block">ISSUED TO:</span>
                          <span className="text-zinc-200 font-bold truncate block">{passport.issuedTo}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[9px] block">REGISTRATION:</span>
                          <span className="text-zinc-200 font-bold">{passport.registrationDate}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[9px] block">PROVEN POWER:</span>
                          <span className="text-[#00FF88] font-bold">{passport.profile.provenFlopsTFLOPS} TFLOPS</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 text-[9px] block">COMPLETED JOBS:</span>
                          <span className="text-white font-bold">{passport.totalJobsVerified} Verified</span>
                        </div>
                      </div>

                      {/* Verification Shield Pill */}
                      <div className={`p-2.5 rounded-xl bg-gradient-to-r ${getShieldGradient(passport.shield.level)} flex items-center justify-between gap-2 shadow-md`}>
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-current shrink-0" />
                          <div>
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider block leading-none">
                              {passport.shield.badgeTitle}
                            </span>
                            <span className="text-[9px] font-mono opacity-80 block mt-0.5">
                              Security Score: {passport.shield.score}/100 • Tamper-Proof
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-black/20 text-current">
                          {passport.shield.badgeCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strip: Cryptographic Signature & Base L2 QR Stamp */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs font-mono">
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[9px] text-zinc-500 uppercase block tracking-wider">
                        ON-CHAIN REGISTRY HASH ({passport.blockchainRegistry.network})
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-300 text-[10px] truncate max-w-[200px] sm:max-w-[280px]">
                          {passport.blockchainRegistry.txHash}
                        </span>
                        <button
                          onClick={() => handleCopy(passport.blockchainRegistry.txHash, 'txHash')}
                          className="text-zinc-400 hover:text-white transition cursor-pointer"
                          title="Copy Hash"
                        >
                          {copiedField === 'txHash' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-lg cursor-pointer hover:scale-105 transition" onClick={() => setShowVerifyModal(true)} title="Click to verify QR token">
                      <QrCode className="w-full h-full text-zinc-950" />
                    </div>
                  </div>

                  {/* Official Fine Print Footnote */}
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 border-t border-zinc-850 pt-2">
                    <span>SECURITY CHIP: AES-256 GCM SECURED</span>
                    <span>BASE L2 TOKEN: {passport.blockchainRegistry.tokenId}</span>
                  </div>
                </div>
              )}

              {/* BACK VIEW: SILICON & HARDWARE PROFILE */}
              {cardSide === 'back' && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-amber-400 block tracking-wider">
                        SILICON ATTESTATION PROFILE
                      </span>
                      <h4 className="font-heading font-black text-sm text-white">
                        HARDWARE CAPABILITY &amp; THERMAL METRICS
                      </h4>
                    </div>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00FF88]">
                      Verified Benchmark
                    </span>
                  </div>

                  {/* Technical Specs Matrix */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">CPU Architecture</span>
                      <span className="text-white font-bold block mt-0.5">{passport.profile.cpuModel}</span>
                      <span className="text-[10px] text-zinc-500">{passport.profile.logicalThreads} Threads ({passport.profile.physicalCores} Phys Cores)</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">System Memory (RAM)</span>
                      <span className="text-white font-bold block mt-0.5">{passport.profile.memoryGb} GB Unified RAM</span>
                      <span className="text-[10px] text-zinc-500">Bandwidth: {passport.profile.memoryBandwidthGbps} GB/s</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">GPU &amp; Neural Accelerator</span>
                      <span className="text-white font-bold block mt-0.5 truncate" title={passport.profile.gpuRenderer}>
                        {passport.profile.gpuRenderer}
                      </span>
                      <span className="text-[10px] text-emerald-400">
                        {passport.profile.webGpuSupported ? '⚡ WebGPU Active' : 'WebGL2 Accelerated'}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800">
                      <span className="text-[10px] text-zinc-400 block">Thermal &amp; Power Health</span>
                      <span className="text-white font-bold block mt-0.5">{passport.profile.thermalEfficiencyRating} Rating</span>
                      <span className="text-[10px] text-amber-400">{passport.profile.batteryPowerProfile}</span>
                    </div>
                  </div>

                  {/* Network Telemetry */}
                  <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                      Autonomous Network Latency &amp; Speed
                    </span>
                    <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                      <div>
                        <span className="text-zinc-500 text-[10px] block">Bandwidth:</span>
                        <span className="text-[#00D4FF] font-bold">{passport.profile.networkDownlinkMbps} Mbps</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block">Grid Ping:</span>
                        <span className="text-emerald-400 font-bold">{passport.profile.networkLatencyMs} ms</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-[10px] block">Audit Hash:</span>
                        <span className="text-zinc-300 font-bold truncate block">{passport.shield.auditHash.slice(0, 10)}...</span>
                      </div>
                    </div>
                  </div>

                  {/* Tamper-Proof Security Guarantees List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                      Enforced Silicon Security Protocols:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {passport.shield.securityFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-300">
                          <CheckCircle2 className="w-3 h-3 text-[#00FF88] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* HISTORY VIEW: VERIFIED CONTRIBUTION LEDGER */}
              {cardSide === 'history' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-amber-400 block tracking-wider">
                        ON-CHAIN VERIFIED RECORD
                      </span>
                      <h4 className="font-heading font-black text-sm text-white">
                        RECENT WORKLOAD EXECUTION LEDGER
                      </h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#00FF88]">
                      ${passport.totalEarningsUsd.toFixed(2)} Earned
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                    {passport.contributionHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition space-y-1 text-left"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-mono font-bold text-xs text-white truncate max-w-[200px]">
                              {item.jobName}
                            </h5>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {item.timestamp} • {item.durationMinutes} min • {item.computeCyclesGigaFlops} GFLOPS
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-[#00FF88] block">
                              +{item.rewardBaa.toFixed(1)} BAA
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500">
                              (${item.rewardUsd.toFixed(2)})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[9px] font-mono pt-1 border-t border-zinc-850 text-zinc-500">
                          <span className="truncate max-w-[200px]">Sig: {item.verificationSignature}</span>
                          <span className="text-emerald-400 font-bold uppercase">{item.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between font-mono text-xs">
                    <div>
                      <span className="text-zinc-500 text-[10px] block">TOTAL UPTIME:</span>
                      <span className="text-white font-bold">{passport.totalUptimeHours} Hours</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">DELIVERED COMPUTE:</span>
                      <span className="text-[#00D4FF] font-bold">{passport.cumulativeTFlopsHours} TFLOPS-Hr</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">TOTAL MINED BAA:</span>
                      <span className="text-[#FFD700] font-bold">+{passport.totalEarningsBaa.toFixed(0)} BAA</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Flip Button Helper */}
          <div className="flex items-center gap-3 mt-4 text-xs font-mono text-zinc-400">
            <button
              onClick={() => {
                setCardSide(prev => prev === 'front' ? 'back' : prev === 'back' ? 'history' : 'front');
              }}
              className="flex items-center gap-1.5 text-zinc-300 hover:text-[#00FF88] transition cursor-pointer px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate Card (Currently: {cardSide.toUpperCase()})</span>
            </button>
            <span>•</span>
            <span>Tamper-Proof NFC &amp; Web3 Token Enabled</span>
          </div>
        </div>

        {/* Right Column: Passport Verification & Management Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Passport Authority Box */}
          <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00FF88]" />
                <h3 className="font-heading font-black text-base text-white">
                  VERIFICATION AUTHORITY
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                100% Cryptographic
              </span>
            </div>

            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Every Universal Compute Passport issued on BAA is anchored on Base Layer 2 smart contracts with biometric and zero-knowledge silicon hardware proofs, assuring workload providers that your device operates securely without data leakage.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block">SMART CONTRACT:</span>
                  <span className="text-zinc-200 font-bold">{passport.blockchainRegistry.contractAddress.slice(0, 18)}...</span>
                </div>
                <button
                  onClick={() => handleCopy(passport.blockchainRegistry.contractAddress, 'contract')}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                >
                  {copiedField === 'contract' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-850 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block">BASE L2 TOKEN ID:</span>
                  <span className="text-[#FFD700] font-bold">{passport.blockchainRegistry.tokenId}</span>
                </div>
                <button
                  onClick={() => handleCopy(passport.blockchainRegistry.tokenId, 'token')}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                >
                  {copiedField === 'token' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowVerifyModal(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#00FF88] to-emerald-400 text-black font-mono text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#00FF88]/20 hover:opacity-95 transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Verify Token On-Chain (Base L2)</span>
              </button>

              <button
                onClick={() => {
                  const jsonStr = JSON.stringify(passport, null, 2);
                  const blob = new Blob([jsonStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${passport.passportNumber}.json`;
                  a.click();
                }}
                className="w-full py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-750 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-zinc-400" />
                <span>Export Passport Credential (JSON)</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Summary Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 grid grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">NODE WEALTH SCORE</span>
              <span className="text-2xl font-heading font-black text-[#FFD700] block mt-0.5">
                {activeDevice.wealthScore.overallScore}/100
              </span>
              <span className="text-[10px] font-mono text-amber-400">{activeDevice.wealthScore.tier} Tier</span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">PROVEN FLOPS</span>
              <span className="text-2xl font-heading font-black text-[#00D4FF] block mt-0.5">
                {passport.profile.provenFlopsTFLOPS}
              </span>
              <span className="text-[10px] font-mono text-cyan-400">Peak GFLOPS Mined</span>
            </div>
          </div>
        </div>
      </div>

      {/* On-Chain Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-zinc-950 border border-[#00FF88]/40 p-6 space-y-5 text-left relative shadow-2xl">
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00FF88]/20 border border-[#00FF88]/40 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#00FF88]" />
              </div>
              <div>
                <h4 className="font-heading font-black text-base text-white">
                  CRYPTOGRAPHIC ATTESTATION
                </h4>
                <span className="text-xs font-mono text-emerald-400">
                  Verified On-Chain • Base L2 Block #19842019
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs bg-zinc-900/70 p-4 rounded-2xl border border-zinc-800">
              <div>
                <span className="text-zinc-500 text-[10px] block">PASSPORT NUMBER:</span>
                <span className="text-white font-bold">{passport.passportNumber}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">ATTESTATION SHIELD:</span>
                <span className="text-[#FFD700] font-bold">{passport.shield.badgeTitle}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">HARDWARE FINGERPRINT:</span>
                <span className="text-zinc-300 break-all">{passport.shield.auditHash}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">EXPIRY DATE:</span>
                <span className="text-zinc-300">{new Date(passport.shield.expiresAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-sans">
              ✓ Hardware memory sandbox confirmed. Zero client identity leaks. Authorized for Commercial AI Workload Pipeline.
            </div>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#00FF88] text-black font-mono font-bold text-xs uppercase cursor-pointer"
            >
              Close Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="w-full max-w-5xl rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 relative my-8">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/60 border border-zinc-850">
      {content}
    </div>
  );
};
