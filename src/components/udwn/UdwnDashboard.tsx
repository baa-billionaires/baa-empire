import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  Shield,
  Layers,
  Sparkles,
  Bot,
  Brain,
  TrendingUp,
  RefreshCw,
  Coins,
  CheckCircle2,
  Copy,
  Sliders,
  DollarSign,
  Radio,
  Flame,
  Award,
  Globe2,
  Share2,
  ExternalLink,
  ChevronRight,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  Play,
  Pause,
  Clock,
  BatteryCharging,
  Users,
  Compass,
  ArrowRight,
  Check,
  Server,
  Tv,
  Smartphone,
  Laptop,
  Gauge,
  ShieldCheck,
  Microscope,
  Network,
  GitFork,
  X,
  SlidersHorizontal,
  FolderLock,
  FileCheck2,
  BarChart3,
  MapPin,
  HelpCircle
} from 'lucide-react';
import {
  RegisteredDevice,
  AutonomousColonyAgent,
  PaidWorkloadJob,
  RevenueLedgerSummary,
  PayoutTransactionRecord,
  NodeCategory,
  DeviceHardwareType,
  WorkloadPermission,
  DeviceResourceLimits
} from '../../types/udwn';
import { useDeviceHardwareDetection } from '../../hooks/useDeviceHardwareDetection';
import { useEcosystem } from '../../context/EcosystemContext';
import { UdwnOnboardingTourModal } from './UdwnOnboardingTourModal';
import { UniversalComputePassport } from '../uaaig/UniversalComputePassport';

interface UdwnDashboardProps {
  onNavigate?: (page: string) => void;
}

export const UdwnDashboard: React.FC<UdwnDashboardProps> = ({ onNavigate }) => {
  const { profile, updateProfile } = useEcosystem();
  const { specs: localSpecs, hardwareType: localHardwareType, runLiveBenchmark } = useDeviceHardwareDetection();

  // Navigation sub-tabs
  type TabKey = 'fleet' | 'agents' | 'workloads' | 'smart_tv' | 'wealth_engine' | 'revenue' | 'security' | 'global_map';
  const [activeTab, setActiveTab] = useState<TabKey>('fleet');

  // Onboarding tour modal state
  const [showTourModal, setShowTourModal] = useState<boolean>(false);

  // Auto-launch tour on first visit if not yet completed
  useEffect(() => {
    try {
      const completed = localStorage.getItem('udwn_onboarding_completed');
      if (!completed) {
        setShowTourModal(true);
      }
    } catch {}
  }, []);

  // Backend state
  const [devices, setDevices] = useState<RegisteredDevice[]>([]);
  const [agents, setAgents] = useState<AutonomousColonyAgent[]>([]);
  const [workloads, setWorkloads] = useState<PaidWorkloadJob[]>([]);
  const [revenue, setRevenue] = useState<RevenueLedgerSummary>({
    estimatedEarningPotentialUsd: 148.50,
    pendingWorkloadPaymentsUsd: 42.00,
    confirmedCustomerRevenueUsd: 318.40,
    participantNetEarningsUsd: 228.60,
    participantNetEarningsBaa: 228.60,
    platformFeesUsd: 63.68,
    operatingCostsUsd: 26.12,
    withdrawableBalanceUsd: 186.60,
    withdrawableBalanceNgn: 186.60 * 1500,
    totalPayoutsCompletedUsd: 42.00
  });
  const [payoutHistory, setPayoutHistory] = useState<PayoutTransactionRecord[]>([]);
  const [networkTotals, setNetworkTotals] = useState({
    totalRegisteredDevices: 4892,
    activeOnlineDevices: 3418,
    totalGFlopsMined: '142.8 TFLOPS',
    totalCustomerRevenueDisbursedUsd: 124890.00
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkResult, setBenchmarkResult] = useState<{ flopsGiga: number; score: number } | null>(null);

  // Modals & form state
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showLimitsModal, setShowLimitsModal] = useState<boolean>(false);
  const [selectedDeviceForLimits, setSelectedDeviceForLimits] = useState<RegisteredDevice | null>(null);
  const [showPassportModal, setShowPassportModal] = useState<boolean>(false);
  const [selectedDeviceForPassport, setSelectedDeviceForPassport] = useState<RegisteredDevice | null>(null);
  const [showPayoutModal, setShowPayoutModal] = useState<boolean>(false);
  const [selectedJobForExecution, setSelectedJobForExecution] = useState<PaidWorkloadJob | null>(null);
  const [isExecutingJob, setIsExecutingJob] = useState<boolean>(false);
  const [jobExecutionProgress, setJobExecutionProgress] = useState<number>(0);
  const [executionMessage, setExecutionMessage] = useState<string>('');
  const [copiedTxHash, setCopiedTxHash] = useState<string | null>(null);

  // New device registration form state
  const [regName, setRegName] = useState<string>('My Active Browser Device');
  const [regCategory, setRegCategory] = useState<NodeCategory>('personal');
  const [regHardwareType, setRegHardwareType] = useState<DeviceHardwareType>(localHardwareType);
  const [regCpuLimit, setRegCpuLimit] = useState<number>(60);
  const [regGpuLimit, setRegGpuLimit] = useState<number>(60);
  const [regMemLimit, setRegMemLimit] = useState<number>(Math.max(2, Math.floor(localSpecs.ramGb / 2)));
  const [regOnlyCharging, setRegOnlyCharging] = useState<boolean>(true);
  const [regMinBattery, setRegMinBattery] = useState<number>(50);
  const [regPermittedWorkloads, setRegPermittedWorkloads] = useState<WorkloadPermission[]>([
    'ai_inference',
    'scientific_research',
    'edge_iot'
  ]);
  const [regSmartTvMode, setRegSmartTvMode] = useState<'dashboard_terminal' | 'network_discovery' | 'companion_control' | 'lightweight_relay'>('dashboard_terminal');

  // Payout form
  const [payoutAmountUsd, setPayoutAmountUsd] = useState<number>(50);
  const [payoutBank, setPayoutBank] = useState<string>('Wema Bank');
  const [payoutAccount, setPayoutAccount] = useState<string>('0123456789');
  const [isRequestingPayout, setIsRequestingPayout] = useState<boolean>(false);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);

  // Fetch initial state from server
  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/udwn/state');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setDevices(data.devices || []);
          setAgents(data.agents || []);
          setWorkloads(data.workloads || []);
          if (data.revenue) setRevenue(data.revenue);
          if (data.payoutHistory) setPayoutHistory(data.payoutHistory);
          if (data.networkTotals) setNetworkTotals(data.networkTotals);
        }
      }
    } catch (err) {
      console.warn('UDWN API state load fallback', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 20000);
    return () => clearInterval(interval);
  }, [fetchState]);

  // Sync detected hardware type when available
  useEffect(() => {
    if (localHardwareType) {
      setRegHardwareType(localHardwareType);
    }
  }, [localHardwareType]);

  // Benchmark Handler
  const handleBenchmark = async (device: RegisteredDevice) => {
    setIsBenchmarking(true);
    try {
      const result = await runLiveBenchmark();
      setBenchmarkResult(result);

      // Save to server
      const res = await fetch('/api/udwn/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: device.id,
          flopsGiga: result.flopsGiga,
          score: result.score
        })
      });

      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error('Benchmark failed', e);
    } finally {
      setIsBenchmarking(false);
    }
  };

  // Register New Device
  const handleRegisterDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/udwn/register-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          category: regCategory,
          hardwareType: regHardwareType,
          specs: localSpecs,
          limits: {
            cpuLimitPercent: regCpuLimit,
            gpuLimitPercent: regGpuLimit,
            memoryLimitGb: regMemLimit,
            onlyWhileCharging: regOnlyCharging,
            minBatteryPercent: regMinBattery,
            maxTemperatureCelsius: 45,
            maxBandwidthMbPerHour: 200
          },
          permittedWorkloads: regPermittedWorkloads,
          smartTvMode: regHardwareType === 'smart_tv' ? regSmartTvMode : undefined
        })
      });

      if (res.ok) {
        setShowRegisterModal(false);
        await fetchState();
      }
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  // Toggle Device Status (Pause / Resume)
  const handleToggleDeviceStatus = async (device: RegisteredDevice) => {
    const nextStatus = device.status === 'active' ? 'paused' : 'active';
    try {
      await fetch(`/api/udwn/device/${device.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      await fetchState();
    } catch (err) {
      console.error('Failed to toggle status', err);
    }
  };

  // Disconnect / Revoke Device
  const handleRevokeDevice = async (device: RegisteredDevice) => {
    if (!confirm(`Are you sure you want to disconnect and revoke access for "${device.name}"?`)) return;
    try {
      await fetch(`/api/udwn/device/${device.id}`, {
        method: 'DELETE'
      });
      await fetchState();
    } catch (err) {
      console.error('Failed to revoke device', err);
    }
  };

  // Execute Workload Pipeline
  const handleExecuteJob = (job: PaidWorkloadJob) => {
    const compatibleDevice = devices.find(d => d.status === 'active' && d.permittedWorkloads.includes(job.category));
    if (!compatibleDevice) {
      alert(`No active device currently permits "${job.category}" workloads. Please enable this category in your device settings.`);
      return;
    }

    setSelectedJobForExecution(job);
    setIsExecutingJob(true);
    setJobExecutionProgress(5);
    setExecutionMessage('Workload Matching Agent: Handshaking with Sandboxed WebAssembly Worker...');

    const stages = [
      { progress: 25, msg: 'Security Guardian: Verified sandboxed isolate boundaries & memory lock' },
      { progress: 50, msg: 'Device Benchmark Agent: Dispatching chunk computation payload' },
      { progress: 75, msg: 'AI Workload Agent: Matrix multiplication verified (0 errors)' },
      { progress: 95, msg: 'Contribution Verification Agent: Generating cryptographic result hash...' }
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setJobExecutionProgress(stage.progress);
        setExecutionMessage(stage.msg);
      }, (idx + 1) * 700);
    });

    setTimeout(async () => {
      try {
        const res = await fetch('/api/udwn/jobs/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: job.id,
            deviceId: compatibleDevice.id
          })
        });

        if (res.ok) {
          const data = await res.json();
          setJobExecutionProgress(100);
          setExecutionMessage(`Customer Payment Escrow Confirmed! +$${data.participantNetShare.toFixed(2)} USD credited.`);

          // Update profile BAA balance in UI
          updateProfile({
            baacoin_balance: +(profile.baacoin_balance + data.participantNetShare).toFixed(2)
          });

          await fetchState();
          setTimeout(() => {
            setIsExecutingJob(false);
            setSelectedJobForExecution(null);
          }, 2000);
        }
      } catch (err) {
        console.error('Job execution failed', err);
        setIsExecutingJob(false);
      }
    }, 3500);
  };

  // Request Payout
  const handleRequestPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmountUsd > revenue.withdrawableBalanceUsd) {
      alert(`Insufficient balance. Max withdrawable is $${revenue.withdrawableBalanceUsd.toFixed(2)}.`);
      return;
    }

    setIsRequestingPayout(true);
    try {
      const res = await fetch('/api/udwn/payout/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUsd: payoutAmountUsd,
          method: 'paystack_bank',
          accountDetails: `${payoutBank} • ${payoutAccount}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPayoutSuccessMsg(data.message);
        await fetchState();
        setTimeout(() => {
          setPayoutSuccessMsg(null);
          setShowPayoutModal(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Payout failed', err);
    } finally {
      setIsRequestingPayout(false);
    }
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedTxHash(hash);
    setTimeout(() => setCopiedTxHash(null), 2000);
  };

  // Helper icons
  const getHardwareIcon = (type: DeviceHardwareType) => {
    switch (type) {
      case 'android_phone':
      case 'ios_phone':
        return <Smartphone className="w-4 h-4 text-[#00FF88]" />;
      case 'smart_tv':
        return <Tv className="w-4 h-4 text-purple-400" />;
      case 'desktop':
      case 'workstation_gpu':
        return <Cpu className="w-4 h-4 text-[#FFD700]" />;
      case 'server_cluster':
        return <Server className="w-4 h-4 text-cyan-400" />;
      default:
        return <Laptop className="w-4 h-4 text-[#00D4FF]" />;
    }
  };

  const getCategoryBadge = (category: NodeCategory) => {
    switch (category) {
      case 'student':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">Student Node</span>;
      case 'community':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">Community Node</span>;
      case 'institutional':
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-[#FFD700] border border-amber-500/30 font-bold">Institutional Node</span>;
      default:
        return <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-700">Personal Node</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. HERO HEADER: UDWN BRANDING & LIVE NETWORK TELEMETRY */}
      <div className="bg-gradient-to-br from-zinc-950 via-[#030a06] to-zinc-950 border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00FF88]/15 via-[#00D4FF]/10 to-transparent rounded-bl-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF88]" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#00FF88] uppercase bg-[#00FF88]/10 px-2.5 py-1 rounded-md border border-[#00FF88]/30">
                SOVEREIGN DATA CENTER LAB • UDWN CORE
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
                Verified Multi-Device Mesh Architecture
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight text-white leading-tight">
              <span>Universal Device Wealth Network</span>
              <span className="text-[#00FF88] block text-xl sm:text-2xl font-mono mt-1 font-bold">
                (UDWN) 🌐
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl font-sans leading-relaxed">
              <strong>Tagline:</strong> <em>Turn Connected Devices into Verified Computing Infrastructure and Shared Digital Wealth.</em> Connect smartphones, laptops, workstations, smart TVs, and edge clusters to execute qualified commercial workloads with mathematical proof.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowTourModal(true)}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-[#00D4FF]/60 hover:border-[#00D4FF] text-[#00D4FF] hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
              title="Interactive Onboarding Tour & Device Setup Guide"
            >
              <Compass className="w-4 h-4 text-[#00D4FF]" />
              <span>Onboarding Tour</span>
            </button>

            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#00FF88] to-[#00C853] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00FF88]/20 flex items-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>Connect &amp; Register Device</span>
            </button>

            <button
              onClick={() => setShowPayoutModal(true)}
              className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#FFD700] text-[#FFD700] font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition flex items-center gap-2 cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              <span>Cashout Revenue</span>
            </button>
          </div>
        </div>

        {/* 4 LIVE TELEMETRY TILES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
              Global Device Fleet
            </span>
            <div className="text-xl sm:text-3xl font-black text-white font-mono mt-1">
              {networkTotals.totalRegisteredDevices.toLocaleString()}
            </div>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {networkTotals.activeOnlineDevices.toLocaleString()} Nodes Online Now
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
              Aggregate Compute Mesh
            </span>
            <div className="text-xl sm:text-3xl font-black text-[#00D4FF] font-mono mt-1">
              {networkTotals.totalGFlopsMined}
            </div>
            <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
              Decentralized Floating Point Capacity
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-[#FFD700]/30 text-left">
            <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-wider font-bold block">
              Total Customer Revenue
            </span>
            <div className="text-xl sm:text-3xl font-black text-[#FFD700] font-mono mt-1">
              ${networkTotals.totalCustomerRevenueDisbursedUsd.toLocaleString()}
            </div>
            <span className="text-[10px] font-mono text-amber-300 mt-1 block">
              Escrow Verified &amp; Disbursed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-zinc-900 border border-[#00FF88]/40 text-left">
            <span className="text-[10px] font-mono text-[#00FF88] uppercase tracking-wider font-bold block">
              My Withdrawable Earnings
            </span>
            <div className="text-xl sm:text-3xl font-black text-[#00FF88] font-mono mt-1">
              ${revenue.withdrawableBalanceUsd.toFixed(2)}
            </div>
            <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
              (₦{revenue.withdrawableBalanceNgn.toLocaleString()} NGN via Paystack)
            </span>
          </div>
        </div>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-800 pb-3">
        {[
          { key: 'fleet', label: '🌐 Universal Device Fleet', icon: Smartphone },
          { key: 'agents', label: '🤖 13-Agent Colony', icon: Bot },
          { key: 'workloads', label: '💼 Real Paid Workloads', icon: BriefcaseIcon },
          { key: 'smart_tv', label: '📺 Smart TV & Limited Devices', icon: Tv },
          { key: 'wealth_engine', label: '📊 Device Wealth Engine', icon: Award },
          { key: 'revenue', label: '💰 Revenue & Payout Vault', icon: DollarSign },
          { key: 'security', label: '🛡️ Security & Privacy', icon: ShieldCheck },
          { key: 'global_map', label: '🌍 Global Network Map', icon: Globe2 }
        ].map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as TabKey)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#00FF88] text-black shadow-lg shadow-[#00FF88]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: UNIVERSAL DEVICE FLEET (REGISTER, BENCHMARK, LIMITS)
         ========================================================================= */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>REGISTERED COMPUTE NODES</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00FF88]">
                  {devices.length} Devices Registered
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Eligible devices contribute verified computing capacity within user-defined thermal, battery, and CPU limits.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto font-mono text-xs">
              <button
                onClick={() => {
                  setSelectedDeviceForPassport(devices[0] || null);
                  setShowPassportModal(true);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-600/10 border border-amber-500/50 hover:border-[#FFD700] text-[#FFD700] font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/10"
              >
                <Award className="w-4 h-4 text-[#FFD700]" />
                <span>Universal Compute Passport</span>
              </button>

              <button
                onClick={() => setShowRegisterModal(true)}
                className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00FF88] text-white font-bold transition flex items-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-[#00FF88]" />
                <span>Add Node</span>
              </button>
            </div>
          </div>

          {/* Connected Device Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {devices.map(device => {
              const isCurrent = device.isCurrentDevice;
              return (
                <div
                  key={device.id}
                  className={`p-5 rounded-3xl bg-zinc-950 border transition space-y-4 text-left relative shadow-xl ${
                    device.status === 'active'
                      ? 'border-zinc-800 hover:border-[#00FF88]/50'
                      : 'border-zinc-800/60 opacity-75'
                  }`}
                >
                  {/* Top Bar: Device Header & Status */}
                  <div className="flex items-start justify-between gap-2 border-b border-zinc-850 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        {getHardwareIcon(device.hardwareType)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-heading font-bold text-sm text-white truncate max-w-[170px]" title={device.name}>
                            {device.name}
                          </h3>
                          {isCurrent && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00FF88]/20 text-[#00FF88] font-bold">
                              THIS DEVICE
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                          <span>{device.specs.osName}</span>
                          <span>•</span>
                          <span>{device.ipLocation?.city || 'Decentralized Node'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {getCategoryBadge(device.category)}
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          device.status === 'active'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {device.status}
                      </span>
                    </div>
                  </div>

                  {/* Hardware Capability Metrics */}
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs bg-zinc-900/60 p-3 rounded-2xl border border-zinc-850">
                    <div>
                      <span className="text-zinc-500 text-[10px] block">CPU Cores &amp; RAM:</span>
                      <span className="text-white font-bold">{device.specs.cpuCores} Cores · {device.specs.ramGb} GB</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Wealth Score:</span>
                      <span className="text-[#FFD700] font-bold">
                        {device.wealthScore.overallScore}/100 ({device.wealthScore.tier})
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Benchmark FLOPS:</span>
                      <span className="text-[#00D4FF] font-bold">
                        {device.benchmarkFlopsGiga ? `${device.benchmarkFlopsGiga} GFLOPS` : 'Not Tested'}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-500 text-[10px] block">Completed Jobs:</span>
                      <span className="text-[#00FF88] font-bold">{device.totalCompletedJobs} Verified</span>
                    </div>
                  </div>

                  {/* Resource Limits Summary */}
                  <div className="space-y-1.5 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>CPU Cap:</span>
                      <span className="text-white font-bold">{device.limits.cpuLimitPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-[#00FF88] rounded-full"
                        style={{ width: `${device.limits.cpuLimitPercent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>Charging Only: {device.limits.onlyWhileCharging ? 'YES' : 'NO'}</span>
                      <span>Max Temp: {device.limits.maxTemperatureCelsius}°C</span>
                    </div>
                  </div>

                  {/* Permitted Workloads Pills */}
                  <div className="pt-1">
                    <span className="text-[10px] font-mono text-zinc-500 block mb-1">Permitted Workloads:</span>
                    <div className="flex flex-wrap gap-1">
                      {device.permittedWorkloads.map(w => (
                        <span key={w} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                          {w.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-2 border-t border-zinc-850 flex flex-wrap items-center justify-between gap-1.5 font-mono text-xs">
                    <button
                      onClick={() => {
                        setSelectedDeviceForPassport(device);
                        setShowPassportModal(true);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-amber-500/40 hover:border-[#FFD700] text-[#FFD700] font-bold text-[11px] transition flex items-center gap-1 cursor-pointer"
                      title="View Universal Compute Passport"
                    >
                      <Award className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Passport 🛡️</span>
                    </button>

                    <button
                      onClick={() => handleBenchmark(device)}
                      disabled={isBenchmarking}
                      className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00D4FF] text-[#00D4FF] font-bold text-[11px] transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <Gauge className="w-3.5 h-3.5" />
                      <span>{isBenchmarking ? 'Testing...' : 'Benchmark'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedDeviceForLimits(device);
                        setShowLimitsModal(true);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-[11px] transition flex items-center gap-1 cursor-pointer"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Limits</span>
                    </button>

                    <button
                      onClick={() => handleToggleDeviceStatus(device)}
                      className={`px-2.5 py-1.5 rounded-xl font-bold text-[11px] transition flex items-center gap-1 cursor-pointer ${
                        device.status === 'active'
                          ? 'bg-zinc-800 text-amber-300 hover:bg-zinc-700'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {device.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{device.status === 'active' ? 'Pause' : 'Resume'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: AUTONOMOUS 13-AGENT COLONY
         ========================================================================= */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>AUTONOMOUS MULTI-AGENT COMPUTE COLONY</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-[#00FF88] border border-emerald-500/40">
                13 Agents Operational
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Coordinated neural agent colony operating through authenticated task handshakes and human approval gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map(agent => (
              <div
                key={agent.id}
                className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-3 text-left relative shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#00FF88]">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-white">
                        {agent.name}
                      </h3>
                      <span className="text-[10px] font-mono text-zinc-500 block">
                        {agent.role}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      agent.status === 'active'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {agent.description}
                </p>

                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-850 space-y-1 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Current Handshake Task:</span>
                    <span className="text-[#00FF88] font-bold">Verified</span>
                  </div>
                  <span className="text-zinc-200 block truncate" title={agent.currentTask}>
                    {agent.currentTask}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-zinc-500 border-t border-zinc-850">
                  <span>Actions Today: <strong className="text-white">{agent.verifiedActionsToday.toLocaleString()}</strong></span>
                  <span className={agent.autonomyLevel === 'Human Oversight Required' ? 'text-amber-400 font-bold' : 'text-zinc-400'}>
                    {agent.autonomyLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PAID WORKLOAD MARKETPLACE & PIPELINE
         ========================================================================= */}
      {activeTab === 'workloads' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>REAL REVENUE-GENERATING WORKLOADS</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 font-bold">
                COMMERCIAL ESCROW
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Work-to-Verification-to-Payment pipeline. Only verified completed work generates earnings.
            </p>
          </div>

          {/* Pipeline Visual Flow */}
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-x-auto">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
              Work-to-Verification-to-Payment Pipeline Architecture
            </span>
            <div className="flex items-center gap-2 text-xs font-mono min-w-[700px]">
              {[
                'Opportunity Discovery',
                'Customer Qualification',
                'Workload Matching',
                'Participant Consent',
                'Secure Sandboxed Execution',
                'Result Verification',
                'Escrow Payment Confirmation',
                'Transparent Revenue Share'
              ].map((step, idx) => (
                <React.Fragment key={step}>
                  <div className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium shrink-0 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#00FF88]/20 text-[#00FF88] text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                  {idx < 7 && <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Workload Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {workloads.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition space-y-4 text-left relative shadow-xl"
              >
                <div className="flex items-start justify-between gap-3 border-b border-zinc-850 pb-3">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00D4FF] font-bold">
                      {job.category.toUpperCase().replace('_', ' ')}
                    </span>
                    <h3 className="font-heading font-black text-base text-white mt-1.5">
                      {job.title}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Customer: <strong className="text-zinc-200">{job.customerName}</strong> ({job.customerOrg})
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-zinc-400 block">Gross Escrow:</span>
                    <span className="text-lg font-black font-mono text-[#FFD700]">
                      ${job.customerGrossPayment.toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {job.description}
                </p>

                {/* Financial Transparency Breakdown */}
                <div className="grid grid-cols-3 gap-2 font-mono text-xs bg-zinc-900/80 p-3 rounded-2xl border border-zinc-850">
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Operating Expenses:</span>
                    <span className="text-zinc-300 font-bold">${job.operatingExpenses.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Platform Reserve:</span>
                    <span className="text-zinc-300 font-bold">${job.platformFee.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px] block">Participant Share:</span>
                    <span className="text-[#00FF88] font-bold text-sm">
                      +${job.participantNetShare.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                {/* Hardware compatibility & execution */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-zinc-850 text-xs font-mono">
                  <div className="text-zinc-400 text-[11px]">
                    <span>Eligible Nodes: </span>
                    <strong className="text-white">
                      {job.requiredHardware.map(h => h.replace('_', ' ')).join(', ')}
                    </strong>
                  </div>

                  {job.status === 'settled' ? (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed &amp; Paid</span>
                      </span>
                      {job.verificationHash && (
                        <button
                          onClick={() => copyHash(job.verificationHash!)}
                          className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                          title="Copy Cryptographic Verification Hash"
                        >
                          {copiedTxHash === job.verificationHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleExecuteJob(job)}
                      disabled={isExecutingJob}
                      className="px-5 py-2.5 rounded-xl bg-[#00FF88] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#00FF88]/20 disabled:opacity-50"
                    >
                      <Zap className="w-4 h-4 fill-black" />
                      <span>Execute on My Node</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: SMART TV & RESTRICTED DEVICE SUPPORT
         ========================================================================= */}
      {activeTab === 'smart_tv' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>SMART TV &amp; LIMITED-DEVICE COMPATIBILITY PATHWAY</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                LIVING ROOM HUB
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Operating-system honest compatibility. Where heavy background compute is unsupported, devices participate as monitoring terminals and discovery screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              {
                mode: 'dashboard_terminal',
                title: '1. Big-Screen TV Terminal',
                desc: 'Turn any Android TV, Fire TV, or smart display into an institutional command center displaying real-time cluster telemetry and earnings pulse.',
                icon: Tv,
                status: 'Supported (100% Native)'
              },
              {
                mode: 'network_discovery',
                title: '2. Network Discovery Terminal',
                desc: 'Discovers nearby smartphones and laptops on local Wi-Fi, orchestrating peer-to-peer compute handshakes without straining TV hardware.',
                icon: Radio,
                status: 'Supported'
              },
              {
                mode: 'companion_control',
                title: '3. Companion Screen Controller',
                desc: 'Control and monitor your high-end desktop workstation or server cluster from the comfort of the living room sofa via secure QR-code link.',
                icon: Laptop,
                status: 'Supported'
              },
              {
                mode: 'lightweight_relay',
                title: '4. Lightweight Edge Ping Node',
                desc: 'Runs zero-heat ping latency checks and WebRTC relay routing within lightweight memory boundaries (under 120MB RAM).',
                icon: Network,
                status: 'Supported (Under 10% CPU)'
              }
            ].map(item => {
              const IconComp = item.icon;
              return (
                <div key={item.mode} className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-sm text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-purple-300 block w-fit">
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-2 font-mono">
            <span className="text-amber-400 font-bold block">
              🛡️ Honest Architecture Notice regarding iOS &amp; Android Background Execution:
            </span>
            <p className="font-sans leading-relaxed">
              In accordance with BAA core principles, we never promise unauthorized background execution where iOS or Android operating-system restrictions prohibit it. Compute workloads run strictly in foreground browser contexts, while charging, or inside authorized progressive client applications with explicit user consent.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: DEVICE WEALTH ENGINE & TRANSPARENT SCORE
         ========================================================================= */}
      {activeTab === 'wealth_engine' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>DEVICE WEALTH SCORE &amp; REPUTATION ENGINE</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-zinc-900 text-[#FFD700] border border-[#FFD700]/30 font-bold">
                AUDITABLE FORMULA
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Transparent score calculated from verified hardware capacity, completed jobs, reliability uptime, and energy efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score Highlight Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-[#FFD700] space-y-4 text-center">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Fleet Composite Score
              </span>
              <div className="text-6xl font-black font-mono text-[#FFD700]">
                88<span className="text-2xl text-zinc-500 font-normal">/100</span>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 font-bold inline-block">
                GOLD TIER NODE
              </span>
              <p className="text-xs text-zinc-300 font-sans">
                Eligible for high-priority commercial AI inference contracts and premium 3D rendering jobs.
              </p>
            </div>

            {/* Score Factors Breakdown */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 text-left">
              <h3 className="font-heading font-bold text-sm text-white">
                Formula Factors &amp; Weightings
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Available Computing Capacity', val: '92%', score: '25% Weight', color: '#00FF88' },
                  { name: 'Actual Completed Workloads', val: '84%', score: '25% Weight', color: '#00D4FF' },
                  { name: 'Verified Reliability & Uptime', val: '95%', score: '20% Weight', color: '#FFD700' },
                  { name: 'Energy & Thermal Efficiency', val: '86%', score: '15% Weight', color: '#10B981' },
                  { name: 'Job Completion Quality & Accuracy', val: '98%', score: '15% Weight', color: '#A855F7' }
                ].map(factor => (
                  <div key={factor.name} className="space-y-1">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span>{factor.name} ({factor.score})</span>
                      <strong style={{ color: factor.color }}>{factor.val}</strong>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: factor.val, backgroundColor: factor.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 6: REVENUE & PAYOUT VAULT (PAYSTACK NGN + BAA WALLET)
         ========================================================================= */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
                <span>REVENUE ALLOCATION &amp; PAYOUT VAULT</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-[#00FF88] border border-emerald-500/40">
                  REAL ESCROW
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Every dollar accounted for: Customer payments, operating expenses, platform reserves, and participant net earnings.
              </p>
            </div>

            <button
              onClick={() => setShowPayoutModal(true)}
              className="px-5 py-2.5 rounded-xl bg-[#00FF88] text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition flex items-center gap-2 cursor-pointer shadow-lg shadow-[#00FF88]/20"
            >
              <DollarSign className="w-4 h-4" />
              <span>Withdraw to Bank via Paystack</span>
            </button>
          </div>

          {/* Revenue Ledger Breakdown Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Estimated Potential:</span>
              <span className="text-xl font-mono font-bold text-zinc-300 mt-1 block">
                ${revenue.estimatedEarningPotentialUsd.toFixed(2)}
              </span>
              <span className="text-[10px] text-zinc-500 font-sans">Projected based on capacity</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Pending Verification:</span>
              <span className="text-xl font-mono font-bold text-[#FFD700] mt-1 block">
                ${revenue.pendingWorkloadPaymentsUsd.toFixed(2)}
              </span>
              <span className="text-[10px] text-zinc-500 font-sans">Awaiting batch confirmation</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-left">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">Confirmed Customer Revenue:</span>
              <span className="text-xl font-mono font-bold text-white mt-1 block">
                ${revenue.confirmedCustomerRevenueUsd.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-400 font-sans">Escrow confirmed &amp; verified</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left">
              <span className="text-[10px] font-mono text-[#00FF88] uppercase font-bold block">Withdrawable Balance:</span>
              <span className="text-xl font-mono font-black text-[#00FF88] mt-1 block">
                ${revenue.withdrawableBalanceUsd.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-300 font-sans">
                ₦{revenue.withdrawableBalanceNgn.toLocaleString()} NGN ready to cashout
              </span>
            </div>
          </div>

          {/* Payout History Ledger */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-heading font-bold text-base text-white text-left">
              Confirmed Payout Ledger &amp; Reconciliation History
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500">
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">Method</th>
                    <th className="py-2 px-3">Amount (USD)</th>
                    <th className="py-2 px-3">Amount (NGN)</th>
                    <th className="py-2 px-3">Destination</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3">Reconciliation Ref</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {payoutHistory.map(record => (
                    <tr key={record.id}>
                      <td className="py-3 px-3">{new Date(record.timestamp).toLocaleDateString()}</td>
                      <td className="py-3 px-3 uppercase text-[#00D4FF] font-bold">{record.method.replace('_', ' ')}</td>
                      <td className="py-3 px-3 font-bold text-white">${record.amountUsd.toFixed(2)}</td>
                      <td className="py-3 px-3 font-bold text-[#00FF88]">₦{record.amountNgn.toLocaleString()}</td>
                      <td className="py-3 px-3 text-zinc-400">{record.accountDetails}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px]">
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-zinc-500 text-[11px]">{record.reconciliationId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 7: SECURITY, PRIVACY & DEVICE PROTECTION
         ========================================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>SECURITY, PRIVACY &amp; DEVICE INTEGRITY BOUNDARIES</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                AUDITED
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Foundational requirements: absolute device owner control, encrypted communications, and zero private file access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {[
              {
                title: '🔒 Sandboxed Isolate Execution',
                desc: 'All workloads execute inside strict Web Workers / WebAssembly micro-containers with isolated memory boundaries.',
                badge: 'Wasm Micro-Sandbox'
              },
              {
                title: '🚫 Zero Personal Data Access',
                desc: 'The network cannot access, read, or request access to photos, messages, contacts, passwords, browsing history, or local storage.',
                badge: 'Hardware Isolated'
              },
              {
                title: '🌡️ Strict Thermal & Battery Limits',
                desc: 'Computations automatically halt if temperature exceeds 45°C or battery drops below user set thresholds.',
                badge: 'Hardware Protection'
              },
              {
                title: '✍️ Signed Workload Binaries',
                desc: 'Only workloads cryptographically signed by verified enterprise customers and BAA consensus auditors can run.',
                badge: 'EVM Signature'
              },
              {
                title: '🛑 Instant 1-Click Disconnect',
                desc: 'Users retain 100% sovereign ownership. Disconnect, pause, or revoke device access instantly at any time.',
                badge: 'Sovereign Control'
              },
              {
                title: '📜 Open Audit Trail',
                desc: 'Every completed chunk computation is timestamped with verifiable hashes on the Base blockchain ledger.',
                badge: 'Base L2 Audited'
              }
            ].map(sec => (
              <div key={sec.title} className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[#00FF88] block w-fit">
                  {sec.badge}
                </span>
                <h3 className="font-heading font-bold text-sm text-white">
                  {sec.title}
                </h3>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 8: GLOBAL NETWORK COMMAND MAP
         ========================================================================= */}
      {activeTab === 'global_map' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <span>GLOBAL UNIVERSAL COMPUTE MESH MAP</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                LIVE MESH TELEMETRY
              </span>
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-0.5">
              Live interconnected nodes contributing compute across Africa, Europe, the Americas, and Asia.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 relative overflow-hidden">
            {/* World Grid Visualization */}
            <div className="h-64 sm:h-80 w-full rounded-2xl bg-[#030704] border border-zinc-800 relative flex items-center justify-center overflow-hidden cyber-grid">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00FF8815_0%,transparent_70%)]" />

              {/* Major Node Clusters */}
              {[
                { city: 'Lagos, NG', x: '48%', y: '56%', nodes: 1840, flag: '🇳🇬' },
                { city: 'Nairobi, KE', x: '58%', y: '58%', nodes: 920, flag: '🇰🇪' },
                { city: 'Accra, GH', x: '45%', y: '55%', nodes: 410, flag: '🇬🇭' },
                { city: 'Johannesburg, ZA', x: '54%', y: '78%', nodes: 520, flag: '🇿🇦' },
                { city: 'Cairo, EG', x: '55%', y: '38%', nodes: 310, flag: '🇪🇬' },
                { city: 'London, UK', x: '47%', y: '28%', nodes: 450, flag: '🇬🇧' },
                { city: 'New York, US', x: '26%', y: '36%', nodes: 280, flag: '🇺🇸' },
                { city: 'Kigali, RW', x: '56%', y: '61%', nodes: 162, flag: '🇷🇼' }
              ].map(node => (
                <div
                  key={node.city}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: node.x, top: node.y }}
                >
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00FF88]" />
                  </span>

                  <div className="absolute left-4 top-0 hidden group-hover:block z-20 whitespace-nowrap bg-zinc-950 border border-zinc-700 p-2 rounded-xl text-left font-mono text-[10px] shadow-xl">
                    <span className="text-white font-bold block">{node.flag} {node.city}</span>
                    <span className="text-emerald-400 font-bold">{node.nodes.toLocaleString()} Active Nodes</span>
                  </div>
                </div>
              ))}

              <div className="relative z-10 text-center space-y-1 pointer-events-none">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                  COORDINATED COMPUTE QUORUM
                </span>
                <span className="text-2xl sm:text-3xl font-heading font-black text-white">
                  3,418 Active Sovereign Nodes
                </span>
                <span className="text-xs font-mono text-emerald-400 block">
                  Zero Packet Loss • Consensus Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: CONNECT & REGISTER DEVICE
         ========================================================================= */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-[#00FF88] rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl relative text-left">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00FF88]" />
                <h3 className="font-heading font-black text-lg text-white">
                  Register New Compute Node
                </h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterDevice} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Device Name / Label:</label>
                <input
                  type="text"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold focus:border-[#00FF88] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1">Participation Tier:</label>
                  <select
                    value={regCategory}
                    onChange={e => setRegCategory(e.target.value as NodeCategory)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-[#00FF88] focus:outline-none"
                  >
                    <option value="personal">Personal Node</option>
                    <option value="student">Student Node (Protected)</option>
                    <option value="community">Community Node</option>
                    <option value="institutional">Institutional Node</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1">Hardware Form Factor:</label>
                  <select
                    value={regHardwareType}
                    onChange={e => setRegHardwareType(e.target.value as DeviceHardwareType)}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-[#00FF88] focus:outline-none"
                  >
                    <option value="laptop">Laptop / Notebook</option>
                    <option value="desktop">Desktop PC</option>
                    <option value="workstation_gpu">Workstation / GPU</option>
                    <option value="android_phone">Android Phone</option>
                    <option value="ios_phone">iPhone / iPad</option>
                    <option value="smart_tv">Smart TV / Android TV</option>
                    <option value="edge_mini_pc">Mini PC / Edge Node</option>
                    <option value="server_cluster">Server Cluster</option>
                  </select>
                </div>
              </div>

              {/* Resource Sliders */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block">
                  Resource Limits &amp; Protection
                </span>

                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>CPU Limit Cap:</span>
                    <strong className="text-[#00FF88]">{regCpuLimit}%</strong>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={regCpuLimit}
                    onChange={e => setRegCpuLimit(Number(e.target.value))}
                    className="w-full accent-[#00FF88]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-300 mb-1">
                    <span>Max Memory Allocated:</span>
                    <strong className="text-[#00D4FF]">{regMemLimit} GB</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={localSpecs.ramGb || 16}
                    value={regMemLimit}
                    onChange={e => setRegMemLimit(Number(e.target.value))}
                    className="w-full accent-[#00D4FF]"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="text-zinc-300 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regOnlyCharging}
                      onChange={e => setRegOnlyCharging(e.target.checked)}
                      className="accent-[#00FF88] w-4 h-4"
                    />
                    <span>Compute only while charging</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#00FF88] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00FF88]/20 cursor-pointer"
              >
                Authenticate &amp; Register Node
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: EXECUTE WORKLOAD MODAL
         ========================================================================= */}
      {isExecutingJob && selectedJobForExecution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#00FF88]/20 border border-[#00FF88]/40 flex items-center justify-center text-[#00FF88] mx-auto animate-pulse">
              <Zap className="w-6 h-6 fill-current" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Executing Commercial Workload
              </span>
              <h3 className="font-heading font-black text-lg text-white">
                {selectedJobForExecution.title}
              </h3>
            </div>

            <div className="space-y-2">
              <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00D4FF] to-[#00FF88] transition-all duration-500 rounded-full"
                  style={{ width: `${jobExecutionProgress}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-zinc-400 block min-h-[30px]">
                {executionMessage}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              Customer Payment: <strong className="text-[#FFD700]">${selectedJobForExecution.customerGrossPayment}</strong> · Your Net: <strong className="text-[#00FF88]">+${selectedJobForExecution.participantNetShare} USD</strong>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: CASHOUT PAYOUT (PAYSTACK / BANK)
         ========================================================================= */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-[#FFD700] rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-left shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#FFD700]" />
                <h3 className="font-heading font-black text-lg text-white">
                  Cashout Withdrawable Earnings
                </h3>
              </div>
              <button
                onClick={() => setShowPayoutModal(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/60 border border-[#FFD700]/30 text-xs font-mono text-[#FFD700]">
              Available to Cashout: <strong>${revenue.withdrawableBalanceUsd.toFixed(2)} USD</strong> (₦{revenue.withdrawableBalanceNgn.toLocaleString()} NGN)
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Amount to Cashout (USD):</label>
                <input
                  type="number"
                  min="5"
                  max={revenue.withdrawableBalanceUsd}
                  value={payoutAmountUsd}
                  onChange={e => setPayoutAmountUsd(Number(e.target.value))}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold text-sm focus:border-[#FFD700] focus:outline-none"
                  required
                />
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  You will receive: <strong className="text-[#00FF88]">₦{(payoutAmountUsd * 1500).toLocaleString()} NGN</strong> via Paystack Transfer API
                </span>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Bank Name:</label>
                <select
                  value={payoutBank}
                  onChange={e => setPayoutBank(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-[#FFD700] focus:outline-none"
                >
                  <option value="Wema Bank">Wema Bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="GTBank">GTBank</option>
                  <option value="Zenith Bank">Zenith Bank</option>
                  <option value="UBA">UBA (United Bank for Africa)</option>
                  <option value="First Bank">First Bank</option>
                  <option value="Kuda Bank">Kuda Microfinance</option>
                  <option value="Opay">OPay Digital</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Account Number:</label>
                <input
                  type="text"
                  value={payoutAccount}
                  onChange={e => setPayoutAccount(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-[#FFD700] focus:outline-none"
                  required
                />
              </div>

              {payoutSuccessMsg ? (
                <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{payoutSuccessMsg}</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isRequestingPayout}
                  className="w-full py-3.5 rounded-xl bg-[#FFD700] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 cursor-pointer disabled:opacity-50"
                >
                  {isRequestingPayout ? 'Dispatching Transfer via Paystack...' : 'Confirm Bank Cashout'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: CONFIGURE DEVICE LIMITS MODAL
         ========================================================================= */}
      {showLimitsModal && selectedDeviceForLimits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-left shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#00FF88]" />
                <h3 className="font-heading font-black text-lg text-white">
                  Configure Resource Limits
                </h3>
              </div>
              <button
                onClick={() => setShowLimitsModal(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>CPU Cap Percentage:</span>
                  <strong className="text-[#00FF88]">{selectedDeviceForLimits.limits.cpuLimitPercent}%</strong>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={selectedDeviceForLimits.limits.cpuLimitPercent}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setSelectedDeviceForLimits(prev => prev ? {
                      ...prev,
                      limits: { ...prev.limits, cpuLimitPercent: val }
                    } : null);
                  }}
                  className="w-full accent-[#00FF88]"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-300 mb-1">
                  <span>Max Temperature Limit:</span>
                  <strong className="text-[#FFD700]">{selectedDeviceForLimits.limits.maxTemperatureCelsius}°C</strong>
                </div>
                <input
                  type="range"
                  min="38"
                  max="60"
                  value={selectedDeviceForLimits.limits.maxTemperatureCelsius}
                  onChange={e => {
                    const val = Number(e.target.value);
                    setSelectedDeviceForLimits(prev => prev ? {
                      ...prev,
                      limits: { ...prev.limits, maxTemperatureCelsius: val }
                    } : null);
                  }}
                  className="w-full accent-[#FFD700]"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={async () => {
                    try {
                      await fetch(`/api/udwn/device/${selectedDeviceForLimits.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ limits: selectedDeviceForLimits.limits })
                      });
                      await fetchState();
                      setShowLimitsModal(false);
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                  className="w-full py-3.5 rounded-xl bg-[#00FF88] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00FF88]/20 cursor-pointer"
                >
                  Save Resource Limits
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE ONBOARDING TOUR MODAL */}
      <UdwnOnboardingTourModal
        isOpen={showTourModal}
        onClose={() => setShowTourModal(false)}
        onDeviceRegistered={fetchState}
        onNavigateTab={(tab) => setActiveTab(tab as any)}
      />

      {/* UNIVERSAL COMPUTE PASSPORT MODAL */}
      {showPassportModal && (
        <UniversalComputePassport
          isModal={true}
          device={selectedDeviceForPassport || undefined}
          allDevices={devices}
          onSelectDevice={(dev) => setSelectedDeviceForPassport(dev)}
          onClose={() => setShowPassportModal(false)}
        />
      )}
    </div>
  );
};

function BriefcaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

export default UdwnDashboard;
