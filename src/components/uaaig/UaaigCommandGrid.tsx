import React, { useState } from 'react';
import {
  Globe2,
  Server,
  Cpu,
  Zap,
  Activity,
  Layers,
  Shield,
  ShieldCheck,
  TrendingUp,
  Award,
  Sparkles,
  Bot,
  Brain,
  Sliders,
  DollarSign,
  Radio,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Copy,
  Check,
  RotateCw,
  Gauge,
  Network,
  GitFork,
  MapPin,
  Flame,
  ArrowRight,
  Smartphone,
  Tv,
  Laptop
} from 'lucide-react';
import { UaaigPlanetVisual } from './UaaigPlanetVisual';
import { UniversalComputePassport } from './UniversalComputePassport';
import { ByodcStep, ComputeMarketOrderBook, AutonomousGridAgent18 } from '../../types/uaaig';
import { RegisteredDevice } from '../../types/udwn';

const BYODC_STEPS: ByodcStep[] = [
  {
    stepNumber: 1,
    title: 'Hardware & Topology Discovery',
    subtitle: 'Zero-Touch Cluster Probing',
    description: 'Auto-detect host CPU architectures (x86_64, ARM64, Apple Silicon), GPU clusters (NVIDIA H100, A100, RTX 4090, Apple Metal), and VRAM topology.',
    protocol: 'PCIe / NVLink Direct',
    iconName: 'Cpu',
    exampleCommand: 'curl -sSL https://baa.grid/probe.sh | bash -s -- --json',
    verificationCheck: 'Hardware JSON signature generated with SHA-256 fingerprint'
  },
  {
    stepNumber: 2,
    title: 'Operating System & Hypervisor Attestation',
    subtitle: 'Kernel-Level Integrity Verification',
    description: 'Verifies Linux kernel version, Docker/containerd runtime, KVM/Proxmox hypervisor, and secure enclave availability (Intel SGX, AMD SEV).',
    protocol: 'TPM 2.0 / Secure Boot',
    iconName: 'Shield',
    exampleCommand: 'baa-grid-agent attest --strict-kernel-check',
    verificationCheck: 'Cryptographic attestation signed by TPM hardware root of trust'
  },
  {
    stepNumber: 3,
    title: 'Bandwidth & Latency Radar Benchmarking',
    subtitle: 'Global Mesh Throughput Mapping',
    description: 'Measures multi-gigabit throughput and sub-millisecond round-trip latency to nearest sovereign data center hubs in Lagos, London, Nairobi, and Frankfurt.',
    protocol: 'QUIC / BGP Anycast',
    iconName: 'Activity',
    exampleCommand: 'baa-grid-agent test-network --hub=auto --duration=10s',
    verificationCheck: 'Min 50 Mbps symmetric required for inference; 500 Mbps for training'
  },
  {
    stepNumber: 4,
    title: 'Sandboxed Compute Agent Deployment',
    subtitle: 'Isolated WebAssembly / OCI Container',
    description: 'Deploys stateless, micro-VM sandboxed worker daemon with hard resource caps, read-only root filesystems, and zero local data retention.',
    protocol: 'gVisor / Firecracker',
    iconName: 'Layers',
    exampleCommand: 'docker run -d --name baa-node --gpus all baa/worker:v2.0',
    verificationCheck: 'Zero-persistence guarantee passed: memory zeroed between jobs'
  },
  {
    stepNumber: 5,
    title: 'Thermal & Power Guard Calibration',
    subtitle: 'Automated Hardware Protection Loop',
    description: 'Sets hard thermal ceilings (e.g. 75°C), power throttling thresholds, and battery conservation policies for edge and consumer hardware.',
    protocol: 'IPMI / NVML / ACPI',
    iconName: 'Flame',
    exampleCommand: 'baa-grid-agent config --max-temp=78C --power-cap=80%',
    verificationCheck: 'Hardware sensors confirmed responsive at 200ms polling rate'
  },
  {
    stepNumber: 6,
    title: 'Workload Permissions & Whitelist Matrix',
    subtitle: 'Sovereign Contributor Control',
    description: 'Select permitted computation domains: LLM inference, 3D rendering, biomedical folding, or sovereign government workloads.',
    protocol: 'Role-Based Compute Policy',
    iconName: 'Sliders',
    exampleCommand: 'baa-grid-agent permit --add=ai_inference,rendering,research',
    verificationCheck: 'Access control token registered on Base L2 policy registry'
  },
  {
    stepNumber: 7,
    title: 'Universal Compute Passport Issuance',
    subtitle: 'On-Chain Cryptographic Identity',
    description: 'Mints verifiable digital passport with hardware profile, verification shield badge, and verifiable Base L2 NFT credential.',
    protocol: 'Base L2 ERC-721 Token',
    iconName: 'Award',
    exampleCommand: 'baa-grid-agent mint-passport --owner="0x889...e19"',
    verificationCheck: 'Passport active and listed on BAA Sovereign Infrastructure Ledger'
  },
  {
    stepNumber: 8,
    title: 'Live Workload Dispatch & Automated Settlement',
    subtitle: 'Commercial Revenue Streaming',
    description: 'Receives revenue-generating commercial jobs from the Autonomous Global Compute Exchange with instant settlement in BaaCoin and Naira/USD.',
    protocol: 'Smart Contract Micropayments',
    iconName: 'DollarSign',
    exampleCommand: 'baa-grid-agent start --listen --payout=instant',
    verificationCheck: 'Live telemetry verified; daily earnings pulse credited automatically'
  }
];

const COMPUTE_MARKETS: ComputeMarketOrderBook[] = [
  {
    marketId: 'm-llm-inf',
    name: 'Pan-African Multimodal LLM Inference',
    category: 'AI Inference',
    description: 'Low-latency token generation for conversational agents, translation, and coding assistants.',
    unitPriceUsdPerHour: 1.85,
    activeJobs: 1420,
    availableCapacityTFlops: 12400,
    fillRatePercent: 96,
    recommendedHardware: 'NVIDIA RTX 4090 / A100 / Apple M3 Max',
    settlementSpeed: 'Instant per 1,000 tokens'
  },
  {
    marketId: 'm-deepseek',
    name: 'DeepSeek / Llama 70B Distributed Matrix Serving',
    category: 'Large Model Serving',
    description: 'Pipeline-parallel tensor distribution across pooled cluster nodes.',
    unitPriceUsdPerHour: 4.20,
    activeJobs: 890,
    availableCapacityTFlops: 38900,
    fillRatePercent: 94,
    recommendedHardware: 'Dual/Quad GPU Server Clusters (48GB+ VRAM)',
    settlementSpeed: 'Hourly block settlement'
  },
  {
    marketId: 'm-3d-render',
    name: '3D Spatial & Architectural Photorealistic Rendering',
    category: 'Graphics & VFX',
    description: 'Raytracing, Blender Cycles, and Unreal Engine offline rendering chunks.',
    unitPriceUsdPerHour: 2.10,
    activeJobs: 640,
    availableCapacityTFlops: 8200,
    fillRatePercent: 88,
    recommendedHardware: 'Workstations, Gaming PCs, Dedicated GPUs',
    settlementSpeed: 'Per rendered frame verification'
  },
  {
    marketId: 'm-protein-fold',
    name: 'Scientific Protein & Bioinformatics Folding',
    category: 'Scientific Research',
    description: 'AlphaFold molecular simulations and genomic disease variant analysis.',
    unitPriceUsdPerHour: 1.45,
    activeJobs: 310,
    availableCapacityTFlops: 15600,
    fillRatePercent: 91,
    recommendedHardware: 'High-Thread CPUs & CUDA Compute Nodes',
    settlementSpeed: 'Per validated scientific fold batch'
  },
  {
    marketId: 'm-agent-swarm',
    name: 'Autonomous Multi-Agent Swarm Colony',
    category: 'Agent Execution',
    description: 'Continuous background execution of autonomous sales, research, and coding agents.',
    unitPriceUsdPerHour: 0.95,
    activeJobs: 2180,
    availableCapacityTFlops: 6400,
    fillRatePercent: 98,
    recommendedHardware: 'Laptops, Desktops, Mini PCs, Smart TVs',
    settlementSpeed: 'Real-time continuous pulse'
  },
  {
    marketId: 'm-video-transcode',
    name: 'Ultra-Low-Latency Edge Video Transcoding',
    category: 'Media & Streaming',
    description: 'Hardware accelerated AV1, HEVC, and H.264 video compression for streaming media.',
    unitPriceUsdPerHour: 1.20,
    activeJobs: 750,
    availableCapacityTFlops: 5100,
    fillRatePercent: 89,
    recommendedHardware: 'Apple Silicon / Intel QuickSync / NVENC GPUs',
    settlementSpeed: 'Per video segment transcode'
  },
  {
    marketId: 'm-govtech-sovereign',
    name: 'Sovereign National Identity & GovTech Indexing',
    category: 'Sovereign Data',
    description: 'Air-gapped and localized semantic search indexers for government and public archives.',
    unitPriceUsdPerHour: 3.50,
    activeJobs: 420,
    availableCapacityTFlops: 18200,
    fillRatePercent: 92,
    recommendedHardware: 'Sovereign Attested Data Center Racks',
    settlementSpeed: 'Monthly institutional contract'
  },
  {
    marketId: 'm-vision-drone',
    name: 'Computer Vision & Autonomous Drone Inspection',
    category: 'Edge Vision',
    description: 'Real-time edge analysis of drone footage for pipeline and agricultural monitoring.',
    unitPriceUsdPerHour: 2.80,
    activeJobs: 290,
    availableCapacityTFlops: 4300,
    fillRatePercent: 85,
    recommendedHardware: 'Jetson Orin, Edge TPU, High-end Smartphones',
    settlementSpeed: 'Per telemetry stream batch'
  },
  {
    marketId: 'm-agri-satellite',
    name: 'Agricultural Satellite Yield & Climate Prediction',
    category: 'Climate & Agritech',
    description: 'Multi-spectral satellite image processing predicting crop yields across Africa.',
    unitPriceUsdPerHour: 1.65,
    activeJobs: 510,
    availableCapacityTFlops: 7800,
    fillRatePercent: 93,
    recommendedHardware: 'Workstations, Server Nodes, University Clusters',
    settlementSpeed: 'Weekly verified batch'
  },
  {
    marketId: 'm-academic-grant',
    name: 'Academic Grant & Student Research Compute',
    category: 'Education & Grants',
    description: 'Subsidized compute pool for African universities, students, and open-source labs.',
    unitPriceUsdPerHour: 0.80,
    activeJobs: 820,
    availableCapacityTFlops: 9400,
    fillRatePercent: 99,
    recommendedHardware: 'Community Nodes, Student Laptops, Cybercafés',
    settlementSpeed: 'Sponsored by BAA Treasury'
  }
];

const GRID_AGENTS_18: AutonomousGridAgent18[] = [
  {
    id: 'ag-1',
    name: 'Device Discovery Agent',
    callsign: 'RECON-1',
    domain: 'Topology Probing',
    avatarIcon: 'Cpu',
    badgeColor: 'text-[#00FF88] border-[#00FF88]/40',
    description: 'Probes local network, identifies hardware architecture, and verifies compute eligibility.',
    activeHandshakes: 4890,
    status: 'active',
    lastTelemetryLog: 'Probed 142 new nodes in Lagos & Nairobi clusters'
  },
  {
    id: 'ag-2',
    name: 'Device Benchmark Agent',
    callsign: 'FLOPS-2',
    domain: 'Capacity Measurement',
    avatarIcon: 'Gauge',
    badgeColor: 'text-[#00D4FF] border-[#00D4FF]/40',
    description: 'Executes verifiable WebGL/WASM matrix multiplication benchmarks to assess actual TFLOPS.',
    activeHandshakes: 3120,
    status: 'active',
    lastTelemetryLog: 'Benchmarked M3 Max at 3.85 TFLOPS precision'
  },
  {
    id: 'ag-3',
    name: 'Workload Matching Agent',
    callsign: 'MATCH-3',
    domain: 'Dispatch Optimization',
    avatarIcon: 'GitFork',
    badgeColor: 'text-[#FFD700] border-[#FFD700]/40',
    description: 'Matches incoming commercial jobs with compatible hardware meeting thermal/memory caps.',
    activeHandshakes: 12450,
    status: 'active',
    lastTelemetryLog: 'Routed 240 LLM jobs to high-bandwidth cluster'
  },
  {
    id: 'ag-4',
    name: 'Compute Colony Coordinator',
    callsign: 'SWARM-4',
    domain: 'Distributed Consensus',
    avatarIcon: 'Layers',
    badgeColor: 'text-purple-400 border-purple-500/40',
    description: 'Synchronizes tens of thousands of consumer and server nodes into unified compute clusters.',
    activeHandshakes: 18900,
    status: 'active',
    lastTelemetryLog: 'Formed 14 sovereign virtual clusters'
  },
  {
    id: 'ag-5',
    name: 'AI Workload Agent',
    callsign: 'INFER-5',
    domain: 'Model Serving',
    avatarIcon: 'Brain',
    badgeColor: 'text-emerald-400 border-emerald-500/40',
    description: 'Orchestrates authorized LLM inference, embedding generation, and token streaming.',
    activeHandshakes: 8400,
    status: 'active',
    lastTelemetryLog: 'Serving DeepSeek 70B across 32 pooled nodes'
  },
  {
    id: 'ag-6',
    name: 'Rendering Agent',
    callsign: 'RENDER-6',
    domain: 'VFX & Raytracing',
    avatarIcon: 'Activity',
    badgeColor: 'text-amber-400 border-amber-500/40',
    description: 'Splits 3D rendering jobs into tile segments and distributes across participating GPUs.',
    activeHandshakes: 1850,
    status: 'active',
    lastTelemetryLog: 'Dispatched 4K architectural animation frames'
  },
  {
    id: 'ag-7',
    name: 'Research Compute Agent',
    callsign: 'SCIENCE-7',
    domain: 'Academic & Bio',
    avatarIcon: 'Sparkles',
    badgeColor: 'text-cyan-400 border-cyan-500/40',
    description: 'Coordinates scientific simulations, protein folding, and agricultural predictive models.',
    activeHandshakes: 2400,
    status: 'active',
    lastTelemetryLog: 'Validated genomic mutation prediction batch'
  },
  {
    id: 'ag-8',
    name: 'Energy Intelligence Agent',
    callsign: 'PUE-8',
    domain: 'Carbon & Power',
    avatarIcon: 'Zap',
    badgeColor: 'text-lime-400 border-lime-500/40',
    description: 'Monitors electricity rates and routes workloads to green solar, hydro, and geothermal nodes.',
    activeHandshakes: 7600,
    status: 'optimizing',
    lastTelemetryLog: 'Diverted 800kW compute to Nairobi Geothermal hub'
  },
  {
    id: 'ag-9',
    name: 'Security Guardian Agent',
    callsign: 'SHIELD-9',
    domain: 'Zero-Leakage Guard',
    avatarIcon: 'ShieldCheck',
    badgeColor: 'text-rose-400 border-rose-500/40',
    description: 'Audits memory sandboxes, enforces zero-data-at-rest policies, and blocks rogue attempts.',
    activeHandshakes: 15400,
    status: 'active',
    lastTelemetryLog: 'Passed 100% memory isolation audit on 12k nodes'
  },
  {
    id: 'ag-10',
    name: 'Contribution Verification Agent',
    callsign: 'VERIFY-10',
    domain: 'Proof of Compute',
    avatarIcon: 'FileCheck2',
    badgeColor: 'text-[#00FF88] border-[#00FF88]/40',
    description: 'Verifies cryptographic output hashes before crediting rewards to contributor balances.',
    activeHandshakes: 9200,
    status: 'active',
    lastTelemetryLog: 'Verified 8,920 output hashes on Base L2'
  },
  {
    id: 'ag-11',
    name: 'Revenue Allocation Agent',
    callsign: 'VAULT-11',
    domain: 'Smart Settlement',
    avatarIcon: 'DollarSign',
    badgeColor: 'text-[#FFD700] border-[#FFD700]/40',
    description: 'Calculates contributor revenue splits (80% contributor / 20% ecosystem treasury pool).',
    activeHandshakes: 6300,
    status: 'active',
    lastTelemetryLog: 'Distributed $14,820 USD equivalent today'
  },
  {
    id: 'ag-12',
    name: 'Network Optimization Agent',
    callsign: 'ROUTER-12',
    domain: 'Mesh Routing',
    avatarIcon: 'Network',
    badgeColor: 'text-blue-400 border-blue-500/40',
    description: 'Optimizes routing protocols, minimizes packet drop, and reroutes traffic around outages.',
    activeHandshakes: 11000,
    status: 'active',
    lastTelemetryLog: 'Reduced continental ping by 18% via BGP Mesh'
  },
  {
    id: 'ag-13',
    name: 'Device Wealth Intelligence Agent',
    callsign: 'WEALTH-13',
    domain: 'Financial Analytics',
    avatarIcon: 'TrendingUp',
    badgeColor: 'text-amber-300 border-amber-400/40',
    description: 'Generates earnings projections, ROI optimization tips, and hardware upgrade guides.',
    activeHandshakes: 4200,
    status: 'active',
    lastTelemetryLog: 'Generated 2,400 daily node wealth reports'
  },
  {
    id: 'ag-14',
    name: 'BYODC Gateway Agent',
    callsign: 'BYODC-14',
    domain: 'Data Center Bridge',
    avatarIcon: 'Server',
    badgeColor: 'text-indigo-400 border-indigo-500/40',
    description: 'Manages automated onboarding of third-party enterprise data centers and university clusters.',
    activeHandshakes: 1400,
    status: 'active',
    lastTelemetryLog: 'Connected new 64-GPU institutional server rack'
  },
  {
    id: 'ag-15',
    name: 'Capacity Rescue Agent',
    callsign: 'RESCUE-15',
    domain: 'Idle Silicon Recovery',
    avatarIcon: 'RotateCw',
    badgeColor: 'text-teal-400 border-teal-500/40',
    description: 'Discovers underutilized institutional compute capacity during night and weekend hours.',
    activeHandshakes: 5100,
    status: 'active',
    lastTelemetryLog: 'Rescued 18,400 idle CPU hours from cybercafés'
  },
  {
    id: 'ag-16',
    name: 'Sovereign Zone Agent',
    callsign: 'ZONES-16',
    domain: 'Data Residency',
    avatarIcon: 'MapPin',
    badgeColor: 'text-yellow-400 border-yellow-500/40',
    description: 'Enforces strict territorial data residency ensuring sovereign citizen data never leaves Africa.',
    activeHandshakes: 3800,
    status: 'active',
    lastTelemetryLog: 'Enforced Nigeria NDPR & African Union compliance'
  },
  {
    id: 'ag-17',
    name: 'PUE Climate & Carbon Agent',
    callsign: 'CLIMATE-17',
    domain: 'Emissions Accounting',
    avatarIcon: 'Globe2',
    badgeColor: 'text-emerald-400 border-emerald-500/40',
    description: 'Real-time telemetry on grid carbon intensity, maximizing renewable compute offsets.',
    activeHandshakes: 4900,
    status: 'optimizing',
    lastTelemetryLog: 'Offset 42.8 metric tons CO2 equivalent today'
  },
  {
    id: 'ag-18',
    name: 'Disaster Recovery & Failover Agent',
    callsign: 'RECOVERY-18',
    domain: 'Zero Downtime',
    avatarIcon: 'Bot',
    badgeColor: 'text-rose-400 border-rose-500/40',
    description: 'Instantly shifts live workloads to alternate resilient nodes in event of power or fiber cuts.',
    activeHandshakes: 8900,
    status: 'active',
    lastTelemetryLog: 'Seamlessly recovered 12 nodes during subsea fiber blip'
  }
];

interface UaaigCommandGridProps {
  onNavigate?: (page: string) => void;
  registeredDevices?: RegisteredDevice[];
}

export const UaaigCommandGrid: React.FC<UaaigCommandGridProps> = ({
  onNavigate,
  registeredDevices = []
}) => {
  const [activeTab, setActiveTab] = useState<
    'planet' | 'passport' | 'byodc' | 'exchange' | 'rescue' | 'agents' | 'story'
  >('planet');

  const [rescueHoursPerDay, setRescueHoursPerDay] = useState<number>(8);
  const [rescueDeviceCount, setRescueDeviceCount] = useState<number>(50);
  const [copiedCmd, setCopiedCmd] = useState<number | null>(null);

  // Fallback device if empty
  const defaultDevice: RegisteredDevice = {
    id: 'dev-master-1',
    name: 'Billionaire AI Workstation M3 Max',
    hardwareType: 'workstation_gpu',
    category: 'personal',
    specs: {
      cpuCores: 16,
      ramGb: 64,
      gpuRenderer: 'Apple M3 Max 40-Core GPU',
      hasWebGL: true,
      hasWebGpu: true,
      osName: 'macOS Sonoma',
      networkDownlinkMbps: 450
    },
    limits: {
      cpuLimitPercent: 70,
      gpuLimitPercent: 70,
      memoryLimitGb: 32,
      minBatteryPercent: 25,
      onlyWhileCharging: true,
      maxTemperatureCelsius: 75,
      maxBandwidthMbPerHour: 6000
    },
    permittedWorkloads: ['ai_inference', 'scientific_research', 'rendering_3d'],
    status: 'active',
    wealthScore: {
      overallScore: 96,
      tier: 'Platinum',
      availableCapacityScore: 98,
      completedWorkloadsScore: 95,
      reliabilityUptimeScore: 97,
      energyEfficiencyScore: 94,
      jobQualityScore: 96,
      contributionHistoryScore: 95,
      netEarningsFactor: 1.55
    },
    benchmarkFlopsGiga: 4200,
    totalCompletedJobs: 184,
    totalActiveHours: 184,
    lastHeartbeat: new Date().toISOString(),
    connectedAt: '2026-01-10T10:00:00.000Z',
    isCurrentDevice: true
  };

  const devicesList = registeredDevices.length > 0 ? registeredDevices : [defaultDevice];

  // Capacity rescue calculation
  const calculatedRescuedFlopsTflops = ((rescueDeviceCount * 0.45 * rescueHoursPerDay) / 24).toFixed(1);
  const calculatedMonthlyRevenueUsd = (rescueDeviceCount * (rescueHoursPerDay * 0.18) * 30).toFixed(0);

  const handleCopyCmd = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(idx);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* =========================================================================
          HERO BANNER: BAA UNIVERSAL AUTONOMOUS AI INFRASTRUCTURE GRID
         ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0c0d18] via-[#08080f] to-[#040408] border border-amber-500/40 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#FFD700] via-[#00FF88] to-[#00D4FF]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
              <span className="text-[10px] font-mono tracking-widest text-[#00FF88] uppercase font-bold">
                Ecosystem Master Integration • BAA Global Infrastructure
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
              BAA UNIVERSAL AUTONOMOUS AI INFRASTRUCTURE GRID
            </h1>
            <p className="text-base sm:text-lg font-heading font-bold text-amber-300">
              One Intelligence. Every Approved Compute Resource. One Connected Global AI Infrastructure.
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl font-sans leading-relaxed">
              Transforming traditional hyperscale data centers, university clusters, enterprise GPU farms, and everyday devices (smartphones, laptops, desktops, compatible smart TVs, and edge nodes) into an interconnected, commercial-grade sovereign compute fabric.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab('passport')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-yellow-500 text-black font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FFD700]/20 hover:opacity-95 transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-black" />
              <span>Universal Compute Passport</span>
            </button>

            <button
              onClick={() => setActiveTab('byodc')}
              className="px-5 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-750 text-white font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Server className="w-4 h-4 text-[#00FF88]" />
              <span>BYODC Connector (8 Steps)</span>
            </button>
          </div>
        </div>

        {/* 4 Sovereign Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-zinc-800">
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">CONNECTED CAPACITY</span>
            <span className="text-xl sm:text-2xl font-heading font-black text-[#00FF88] block mt-0.5">
              128.4 PFLOPS
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Distributed Global Matrix</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">SOVEREIGN NODES</span>
            <span className="text-xl sm:text-2xl font-heading font-black text-white block mt-0.5">
              142,680+
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Across 38 Countries</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">COMMERCIAL SETTLEMENT</span>
            <span className="text-xl sm:text-2xl font-heading font-black text-[#FFD700] block mt-0.5">
              $1.42M+ USD
            </span>
            <span className="text-[10px] font-mono text-amber-300">Paid to Device Contributors</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-850">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">INFRASTRUCTURE PUE</span>
            <span className="text-xl sm:text-2xl font-heading font-black text-[#00D4FF] block mt-0.5">
              1.08 PUE
            </span>
            <span className="text-[10px] font-mono text-cyan-400">Geothermal / Solar Hybrid</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODULE NAVIGATION TABS (7 MASTER MODULES)
         ========================================================================= */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        {[
          { key: 'planet', label: '🪐 Planetary Holographic Core', icon: Globe2, badge: 'VISUAL CENTER' },
          { key: 'passport', label: '🛡️ Universal Compute Passport', icon: Award, badge: 'IDENTITY' },
          { key: 'byodc', label: '🔌 BYODC Connector (8 Steps)', icon: Server, badge: 'ONBOARD' },
          { key: 'exchange', label: '📈 Global Compute Exchange', icon: TrendingUp, badge: '10 MARKETS' },
          { key: 'rescue', label: '⚡ Capacity Rescue & Green PUE', icon: Zap, badge: 'EFFICIENCY' },
          { key: 'agents', label: '🤖 18 Autonomous Grid Colony', icon: Bot, badge: 'AGENTS' },
          { key: 'story', label: '📖 Visual Storytelling & Vision', icon: Sparkles, badge: 'MANIFESTO' }
        ].map(t => {
          const IconComp = t.icon;
          const isActive = activeTab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#00FF88] text-black shadow-lg shadow-[#00FF88]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{t.label}</span>
              {t.badge && (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${isActive ? 'bg-black/30 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: 3D HOLOGRAPHIC PLANET VISUAL CENTERPIECE
         ========================================================================= */}
      {activeTab === 'planet' && (
        <div className="space-y-6">
          <UaaigPlanetVisual />

          {/* Quick Explainer Cards Below Planet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-2 text-left">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="font-heading font-black text-base text-white">
                Sovereign Digital Corridors
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Direct mesh connections route compute securely between African innovation hubs (Lagos, Kigali, Nairobi) and global financial centers without central gateway bottlenecks.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-2 text-left">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <h4 className="font-heading font-black text-base text-white">
                Multi-Tier Infrastructure
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Automated workload classifiers match massive model training to hyperscale racks while delegating inference and edge tasks to smartphones and workstations.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-2 text-left">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <h4 className="font-heading font-black text-base text-white">
                Green Power Routing
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Workload routing dynamically tracks green energy availability, routing high-intensity batches to geothermal and hydro nodes with low PUE ratings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: UNIVERSAL COMPUTE PASSPORT (THE USER REQUEST CENTERPIECE)
         ========================================================================= */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          <UniversalComputePassport
            allDevices={devicesList}
            device={devicesList[0]}
          />
        </div>
      )}

      {/* =========================================================================
          TAB 3: BYODC (BRING YOUR OWN DATA CENTER) 8-STEP CONNECTOR
         ========================================================================= */}
      {activeTab === 'byodc' && (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>BYODC: PLUG-AND-PLAY DATA CENTER CONNECTOR</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00FF88]">
                  8-STEP ENTERPRISE GATEWAY
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Connect external Kubernetes clusters, bare-metal servers, university GPU farms, and on-premises server rooms into the BAA commercial compute grid.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[10px] text-zinc-500">SUPPORTED PROTOCOLS:</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Docker</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Kubernetes</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Slurm</span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">Bare Metal</span>
            </div>
          </div>

          {/* 8-Step Interactive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {BYODC_STEPS.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-[#FFD700] border border-amber-500/40 font-mono font-bold text-xs flex items-center justify-center">
                      0{step.stepNumber}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {step.protocol}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-white">
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-mono text-amber-300 block">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-850">
                  <div className="p-2 rounded-xl bg-black border border-zinc-850 font-mono text-[10px] text-zinc-300 flex items-center justify-between">
                    <code className="truncate max-w-[190px]">{step.exampleCommand}</code>
                    <button
                      onClick={() => handleCopyCmd(step.exampleCommand, idx)}
                      className="text-zinc-500 hover:text-white transition cursor-pointer"
                    >
                      {copiedCmd === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{step.verificationCheck}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: AUTONOMOUS GLOBAL COMPUTE EXCHANGE (10 ORDER BOOKS)
         ========================================================================= */}
      {activeTab === 'exchange' && (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>AUTONOMOUS GLOBAL COMPUTE EXCHANGE</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#FFD700]">
                  10 SPECIALIZED ORDER BOOKS
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Real-time algorithmic spot and reservation markets connecting enterprise buyers with verified compute node providers.
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-xs text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Base L2 Settlement Engine Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPUTE_MARKETS.map(market => (
              <div
                key={market.marketId}
                className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#00FF88]/40 transition space-y-4"
              >
                <div className="flex items-start justify-between gap-2 border-b border-zinc-850 pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#00FF88] block">
                      {market.category}
                    </span>
                    <h4 className="font-heading font-black text-base text-white">
                      {market.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">MARKET RATE</span>
                    <span className="text-base font-mono font-black text-[#FFD700]">
                      ${market.unitPriceUsdPerHour.toFixed(2)} / hr
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {market.description}
                </p>

                <div className="grid grid-cols-3 gap-2 font-mono text-xs bg-zinc-900/60 p-3 rounded-2xl border border-zinc-850">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">ACTIVE JOBS:</span>
                    <span className="text-white font-bold">{market.activeJobs.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">POOL CAPACITY:</span>
                    <span className="text-[#00D4FF] font-bold">{market.availableCapacityTFlops.toLocaleString()} TFLOPS</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">FILL RATE:</span>
                    <span className="text-[#00FF88] font-bold">{market.fillRatePercent}%</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-zinc-400 border-t border-zinc-850 pt-3">
                  <div className="truncate max-w-[280px]">
                    <span className="text-zinc-500">Hardware: </span>
                    <span className="text-zinc-300 font-bold">{market.recommendedHardware}</span>
                  </div>
                  <span className="text-emerald-400 shrink-0 font-bold">{market.settlementSpeed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: CAPACITY RESCUE ENGINE & GREEN PUE
         ========================================================================= */}
      {activeTab === 'rescue' && (
        <div className="space-y-6 text-left">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#00FF88] uppercase font-bold block">
                Algorithmic Recovery of Stranded Computing Assets
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white mt-1">
                CAPACITY RESCUE ENGINE &amp; ENERGY INTELLIGENCE
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-1 max-w-2xl">
                Globally, over 70% of enterprise and institutional computing power sits completely idle during off-peak hours. The BAA Capacity Rescue Engine safely monetizes these dormant cycles without interrupting daily business operations.
              </p>
            </div>

            {/* Interactive Capacity Rescue Simulator */}
            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800 space-y-5">
              <h4 className="font-heading font-black text-base text-white flex items-center gap-2">
                <span>SIMULATE YOUR RESCUE CAPACITY</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00FF88]/20 text-[#00FF88]">
                  ROI CALCULATOR
                </span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-zinc-400">Number of Available Devices / Workstations:</span>
                      <span className="text-[#00FF88] font-bold">{rescueDeviceCount} Nodes</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="500"
                      step="5"
                      value={rescueDeviceCount}
                      onChange={(e) => setRescueDeviceCount(Number(e.target.value))}
                      className="w-full accent-[#00FF88] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-zinc-400">Idle Hours per Day (Night &amp; Weekends):</span>
                      <span className="text-[#FFD700] font-bold">{rescueHoursPerDay} Hours / Day</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="18"
                      step="1"
                      value={rescueHoursPerDay}
                      onChange={(e) => setRescueHoursPerDay(Number(e.target.value))}
                      className="w-full accent-[#FFD700] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-center space-y-3 font-mono">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">RESCUED COMPUTE CAPACITY</span>
                    <span className="text-2xl font-black text-[#00D4FF]">
                      {calculatedRescuedFlopsTflops} TFLOPS Sustained
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block">ESTIMATED RECOVERED MONTHLY REVENUE</span>
                    <span className="text-2xl font-black text-[#FFD700]">
                      ${calculatedMonthlyRevenueUsd} USD / Month
                    </span>
                    <span className="text-[10px] text-emerald-400">
                      ≈ ₦{(Number(calculatedMonthlyRevenueUsd) * 1500).toLocaleString()} Naira Monthly Passive
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* PUE & Sustainability Radar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">GLOBAL AVERAGE PUE</span>
                <span className="text-xl font-bold text-white block mt-1">1.08 PUE</span>
                <span className="text-[10px] text-emerald-400">Outperforms standard 1.45 legacy centers</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">RENEWABLE MIX</span>
                <span className="text-xl font-bold text-[#00FF88] block mt-1">84% Clean Power</span>
                <span className="text-[10px] text-zinc-400">Geothermal, Hydro, and Solar Microgrids</span>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] block">CARBON INTENSITY</span>
                <span className="text-xl font-bold text-[#00D4FF] block mt-1">42 gCO2 / kWh</span>
                <span className="text-[10px] text-cyan-400">Continuous emissions telemetry tracked</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: 18-AGENT AUTONOMOUS GRID COLONY
         ========================================================================= */}
      {activeTab === 'agents' && (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>18-AGENT AUTONOMOUS GRID COLONY</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00FF88]">
                  AUTONOMOUS WORKFORCE
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Specialized autonomous multi-agent systems collaborating seamlessly to discover, benchmark, secure, dispatch, and settle compute workloads.
              </p>
            </div>

            <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
              18 of 18 Agents Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GRID_AGENTS_18.map(agent => (
              <div
                key={agent.id}
                className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold uppercase ${agent.badgeColor}`}>
                      {agent.callsign}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">
                      {agent.domain}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-white">
                    {agent.name}
                  </h4>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {agent.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-zinc-850 font-mono text-[10px]">
                  <div className="flex items-center justify-between text-zinc-500">
                    <span>ACTIVE HANDSHAKES:</span>
                    <span className="text-white font-bold">{agent.activeHandshakes.toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-850 text-zinc-300 truncate">
                    <span className="text-emerald-400">Live: </span>
                    <span>{agent.lastTelemetryLog}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: VISUAL STORYTELLING & EXPLAINER
         ========================================================================= */}
      {activeTab === 'story' && (
        <div className="space-y-6 text-left">
          <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/30 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-widest font-bold">
                The Sovereign Compute Revolution
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-black text-white">
                FROM SILICON MONOPOLY TO SHARED DIGITAL WEALTH
              </h2>
              <p className="text-sm text-zinc-400 font-sans leading-relaxed max-w-3xl">
                For the past two decades, cloud computing and AI infrastructure have been monopolized by a handful of centralized Silicon Valley conglomerates. BAA Universal Autonomous AI Infrastructure Grid flips this model upside down.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <span className="text-xs font-mono text-rose-400 uppercase font-bold block">
                  01. The Old Monopolistic Model
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Trillions of dollars spent renting centralized server time from cloud giants. Consumers and developers pay exorbitant API fees while billions of dollars of local smartphones and computers sit dormant in pockets and on desks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <span className="text-xs font-mono text-[#FFD700] uppercase font-bold block">
                  02. The BAA Universal Grid
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Every consented phone, tablet, laptop, server rack, and Android TV becomes an authenticated compute node. Cryptographic sandboxing ensures 100% user privacy and tamper-proof security without any data retention.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
                <span className="text-xs font-mono text-[#00FF88] uppercase font-bold block">
                  03. Direct Sovereign Wealth
                </span>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Real commercial workloads pay real value. Contributors receive daily dividends in BaaCoin and fiat currencies (USD &amp; Naira via Paystack), creating a sustainable passive income engine for students, builders, and institutions.
                </p>
              </div>
            </div>

            {/* Navigation back to UDWN or Passport */}
            <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-zinc-400">
                Ready to contribute and earn? Issue your Universal Compute Passport today.
              </span>
              <button
                onClick={() => setActiveTab('passport')}
                className="px-6 py-2.5 rounded-xl bg-[#00FF88] text-black font-mono text-xs font-bold transition hover:opacity-90 cursor-pointer"
              >
                Open My Compute Passport 🛡️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
