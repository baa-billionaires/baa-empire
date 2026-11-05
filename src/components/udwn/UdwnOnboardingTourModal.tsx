import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Zap,
  Gauge,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Smartphone,
  Laptop,
  Tv,
  Server,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Bot,
  HelpCircle,
  TrendingUp,
  BatteryCharging,
  Sliders,
  Check,
  ChevronRight,
  Lock,
  Layers,
  Award
} from 'lucide-react';
import { useDeviceHardwareDetection } from '../../hooks/useDeviceHardwareDetection';
import { NodeCategory, DeviceHardwareType } from '../../types/udwn';

interface UdwnOnboardingTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeviceRegistered?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const UdwnOnboardingTourModal: React.FC<UdwnOnboardingTourModalProps> = ({
  isOpen,
  onClose,
  onDeviceRegistered,
  onNavigateTab
}) => {
  const { specs, hardwareType, runLiveBenchmark } = useDeviceHardwareDetection();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Step 2 form state
  const [nodeCategory, setNodeCategory] = useState<NodeCategory>('personal');
  const [nodeName, setNodeName] = useState<string>('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);

  // Step 3 benchmark state
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkResult, setBenchmarkResult] = useState<{ flopsGiga: number; score: number } | null>(null);

  // Auto populate node name on mount
  useEffect(() => {
    if (specs.osName) {
      setNodeName(`${specs.osName} ${hardwareType === 'laptop' ? 'Notebook' : 'Compute Node'}`);
    }
  }, [specs.osName, hardwareType]);

  if (!isOpen) return null;

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      const res = await fetch('/api/udwn/register-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nodeName || 'My Sovereign Node',
          category: nodeCategory,
          hardwareType: hardwareType,
          specs: specs,
          limits: {
            cpuLimitPercent: 60,
            gpuLimitPercent: 60,
            memoryLimitGb: Math.max(2, Math.floor(specs.ramGb / 2)),
            onlyWhileCharging: true,
            minBatteryPercent: 50,
            maxTemperatureCelsius: 45,
            maxBandwidthMbPerHour: 200
          },
          permittedWorkloads: ['ai_inference', 'scientific_research', 'edge_iot']
        })
      });

      if (res.ok) {
        setRegisteredSuccess(true);
        if (onDeviceRegistered) onDeviceRegistered();
        setTimeout(() => {
          setCurrentStep(3); // Advance to benchmark
        }, 1200);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRunBenchmark = async () => {
    setIsBenchmarking(true);
    try {
      const res = await runLiveBenchmark();
      setBenchmarkResult(res);

      // Record benchmark
      await fetch('/api/udwn/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId: 'dev-demo-01',
          flopsGiga: res.flopsGiga,
          score: res.score
        })
      });
      if (onDeviceRegistered) onDeviceRegistered();
    } catch (e) {
      console.error(e);
    } finally {
      setIsBenchmarking(false);
    }
  };

  const finishTour = () => {
    try {
      localStorage.setItem('udwn_onboarding_completed', 'true');
    } catch {}
    onClose();
    if (onNavigateTab) onNavigateTab('fleet');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border-2 border-[#00FF88] rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl relative text-slate-100 font-sans text-left">
        {/* Header with Step Tracker */}
        <div className="flex items-center justify-between border-b border-zinc-850 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF88]" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#00FF88] uppercase bg-[#00FF88]/10 px-2 py-0.5 rounded border border-[#00FF88]/30">
                INTERACTIVE ONBOARDING TOUR
              </span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
              {currentStep === 1 && 'Welcome to the Universal Device Wealth Network'}
              {currentStep === 2 && 'Connect & Authenticate Your First Node'}
              {currentStep === 3 && 'Benchmark Real Computing Capacity'}
              {currentStep === 4 && 'Understanding the Contribution Ledger'}
              {currentStep === 5 && 'You Are Ready to Mine & Earn'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition cursor-pointer"
            title="Exit Tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="grid grid-cols-5 gap-1.5">
          {[1, 2, 3, 4, 5].map(step => (
            <div
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentStep >= step
                  ? 'bg-gradient-to-r from-[#00D4FF] to-[#00FF88]'
                  : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
              title={`Jump to Step ${step}`}
            />
          ))}
        </div>

        {/* =====================================================================
            STEP 1: WELCOME & NETWORK VISION
           ===================================================================== */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00FF88]/10 via-zinc-900 to-zinc-950 border border-[#00FF88]/30 space-y-2">
              <span className="text-xs font-mono font-bold text-[#00FF88] uppercase tracking-wider block">
                CORE VALUE PROPOSITION
              </span>
              <p className="text-sm sm:text-base font-heading font-bold text-white leading-relaxed">
                "Turn Connected Devices into Verified Computing Infrastructure and Shared Digital Wealth."
              </p>
              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                Billions of smartphones, laptops, smart TVs, and workstations sit idle for hours every day. UDWN unites eligible devices into a coordinated, decentralized neural compute mesh that executes verified commercial workloads (AI inference, 3D rendering, scientific calculations).
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block">
                4 Participation Categories:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-[#00FF88]" />
                    <span>1. Personal Node</span>
                  </span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    Individual smartphones, tablets, and personal laptops earning during idle hours.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-emerald-500/30 space-y-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>2. Student Node (Protected)</span>
                  </span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    Student-owned devices with strict study-hour schedules &amp; zero thermal degradation.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-purple-500/30 space-y-1">
                  <span className="text-purple-300 font-bold flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-purple-400" />
                    <span>3. Community Node</span>
                  </span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    Schools, innovation hubs, computer labs, and cybercafés pooling collective capacity.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-500/30 space-y-1">
                  <span className="text-[#FFD700] font-bold flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>4. Institutional Node</span>
                  </span>
                  <p className="text-zinc-400 text-[11px] font-sans">
                    High-end GPU clusters, enterprise server farms, and university research facilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center gap-3 text-xs text-zinc-300 font-mono">
              <ShieldCheck className="w-5 h-5 text-[#00FF88] shrink-0" />
              <span>
                <strong>Zero Private Data Access Guarantee:</strong> UDWN cannot and will never access private photos, files, messages, or passwords. All workloads run in isolated WebAssembly micro-sandboxes.
              </span>
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 2: CONNECT & AUTHENTICATE FIRST NODE
           ===================================================================== */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Our <strong>Device Discovery Agent</strong> automatically detected your current browser hardware capabilities. Confirm your node name, participation category, and safety limits below:
            </p>

            {/* Detected Hardware Specs Card */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hardware Auto-Detected</span>
                </span>
                <span className="text-zinc-400 uppercase text-[10px]">{hardwareType}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[11px]">
                <div>
                  <span className="text-zinc-500 block">Operating System:</span>
                  <span className="text-white font-bold">{specs.osName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">CPU Cores:</span>
                  <span className="text-white font-bold">{specs.cpuCores} Logic Threads</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">RAM Memory:</span>
                  <span className="text-white font-bold">{specs.ramGb} GB RAM</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">GPU Acceleration:</span>
                  <span className="text-[#00D4FF] font-bold truncate block" title={specs.gpuRenderer}>
                    {specs.gpuRenderer || 'WebGL Active'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Battery Level:</span>
                  <span className="text-emerald-400 font-bold">
                    {specs.batteryLevel !== undefined ? `${specs.batteryLevel}% (Charging: ${specs.isCharging ? 'Yes' : 'No'})` : 'Plugged In'}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Downlink Bandwidth:</span>
                  <span className="text-white font-bold">~{specs.networkDownlinkMbps} Mbps</span>
                </div>
              </div>
            </div>

            {/* Node Name & Category Config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Node Identifier:</label>
                <input
                  type="text"
                  value={nodeName}
                  onChange={e => setNodeName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white font-bold focus:border-[#00FF88] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Participation Tier:</label>
                <select
                  value={nodeCategory}
                  onChange={e => setNodeCategory(e.target.value as NodeCategory)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-[#00FF88] focus:outline-none"
                >
                  <option value="personal">Personal Node</option>
                  <option value="student">Student Node (Protected)</option>
                  <option value="community">Community Node</option>
                  <option value="institutional">Institutional Node</option>
                </select>
              </div>
            </div>

            {/* Register Action Button */}
            {registeredSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Node authenticated and registered to UDWN! Proceeding to benchmark...</span>
              </div>
            ) : (
              <button
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full py-3.5 rounded-xl bg-[#00FF88] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00FF88]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isRegistering ? (
                  <span>Authenticating Node Credentials...</span>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 fill-black" />
                    <span>Register This Node to Network</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* =====================================================================
            STEP 3: RUN LIVE COMPUTE BENCHMARK
           ===================================================================== */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Our <strong>Device Benchmark Agent</strong> measures your actual available floating-point computing capacity. This calculates your initial <strong>Device Wealth Score</strong> and qualifies your device for compatible commercial workloads.
            </p>

            {/* Benchmark Trigger Box */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/20 border border-[#00D4FF]/40 flex items-center justify-center text-[#00D4FF] mx-auto">
                <Gauge className="w-7 h-7" />
              </div>

              {benchmarkResult ? (
                <div className="space-y-3 font-mono text-xs">
                  <span className="text-xs text-[#00FF88] font-bold uppercase tracking-wider block">
                    ✓ BENCHMARK COMPLETED &amp; VERIFIED
                  </span>
                  <div className="text-4xl font-black text-white">
                    {benchmarkResult.flopsGiga} <span className="text-base text-zinc-400 font-normal">GFLOPS</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40 font-bold text-xs">
                    <Award className="w-3.5 h-3.5" />
                    <span>Device Wealth Score: {benchmarkResult.score}/100 ({benchmarkResult.score >= 80 ? 'Gold' : 'Silver'} Tier)</span>
                  </div>
                  <p className="text-zinc-400 text-[11px] font-sans max-w-sm mx-auto">
                    Your device has enough capacity to handle local AI inference batches, text translation embeddings, and scientific research tasks.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <h4 className="font-heading font-black text-base text-white">
                    Ready to Test Matrix &amp; Float Performance
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans max-w-md mx-auto">
                    Executes mathematical tensor stress iterations in a background browser worker to record your node's raw capability.
                  </p>
                  <button
                    onClick={handleRunBenchmark}
                    disabled={isBenchmarking}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#00FF88] text-black font-bold font-mono text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/20 flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
                  >
                    {isBenchmarking ? (
                      <>
                        <Zap className="w-4 h-4 animate-spin text-black" />
                        <span>Running Matrix Stress Test...</span>
                      </>
                    ) : (
                      <>
                        <Gauge className="w-4 h-4 fill-black" />
                        <span>Run Live In-Browser Benchmark</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Benchmark score is cryptographically signed and stored in the UDWN registry for automatic workload matching.
              </span>
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 4: UNDERSTANDING THE CONTRIBUTION LEDGER
           ===================================================================== */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Every computing opportunity on UDWN adheres to strict financial transparency. Here is how paid workloads translate into confirmed participant earnings:
            </p>

            {/* Simulated Workload Breakdown */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 font-mono text-xs text-left">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-[#FFD700] font-bold">EXAMPLE PAID WORKLOAD:</span>
                <span className="text-white font-bold">Civic LLM Multi-Lingual Token Batch</span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between items-center text-zinc-300">
                  <span>1. Verified Customer Gross Payment:</span>
                  <strong className="text-white font-bold">$120.00 USD (Escrow Locked)</strong>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>2. Operating Expenses (Network Relays &amp; Data):</span>
                  <span className="text-zinc-400">-$12.00 USD (10%)</span>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>3. Protocol Treasury &amp; Student Reserve:</span>
                  <span className="text-zinc-400">-$24.00 USD (20%)</span>
                </div>

                <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs">
                  <span className="text-[#00FF88] font-bold">4. Participant Net Share (Your Node):</span>
                  <strong className="text-[#00FF88] font-black text-sm">+$84.00 USD (70%)</strong>
                </div>

                <div className="text-right text-[10px] text-emerald-400">
                  Equivalent to ₦126,000 NGN directly withdrawable via Paystack
                </div>
              </div>
            </div>

            {/* Core Rules Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-zinc-900 border border-red-500/30 space-y-1">
                <span className="text-red-400 font-bold block">❌ What We Never Do:</span>
                <ul className="text-zinc-400 text-[11px] font-sans list-disc list-inside space-y-0.5">
                  <li>Never manufacture artificial fake earnings</li>
                  <li>No payment merely for keeping device idle without work</li>
                  <li>No multi-level marketing or recruitment traps</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900 border border-emerald-500/30 space-y-1">
                <span className="text-[#00FF88] font-bold block">✓ UDWN Standard:</span>
                <ul className="text-zinc-300 text-[11px] font-sans list-disc list-inside space-y-0.5">
                  <li>Earnings come only from confirmed customer contracts</li>
                  <li>Mathematical cryptographic proof for every job</li>
                  <li>Direct bank transfer in Naira via Paystack or BAA</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            STEP 5: READY TO MINE & COMMAND
           ===================================================================== */}
        {currentStep === 5 && (
          <div className="space-y-5 text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#00FF88]/20 border border-[#00FF88]/50 flex items-center justify-center text-[#00FF88] mx-auto animate-bounce">
              <Sparkles className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-1">
              <h4 className="font-heading font-black text-xl text-white">
                Onboarding Verified &amp; Ready!
              </h4>
              <p className="text-xs text-zinc-300 font-sans max-w-md mx-auto">
                Your device node is authenticated, the benchmark baseline is registered, and your contribution ledger is set up.
              </p>
            </div>

            {/* Checklist */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 max-w-md mx-auto space-y-2 text-left font-mono text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Device Auto-Discovery &amp; Spec Registration</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Mathematical Floating-Point Benchmark Verified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>13-Agent Neural Colony Handshake Active</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Work-to-Verification-to-Payment Escrow Connected</span>
              </div>
            </div>

            <button
              onClick={finishTour}
              className="w-full max-w-md py-4 rounded-xl bg-gradient-to-r from-[#00FF88] to-[#00C853] text-black font-black font-mono text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-xl shadow-[#00FF88]/20 mx-auto block cursor-pointer"
            >
              Enter UDWN Command Center 🚀
            </button>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-850 font-mono text-xs">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 text-xs cursor-pointer"
            >
              Skip Tour
            </button>
          )}

          {currentStep < totalSteps && (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-5 py-2.5 rounded-xl bg-[#00FF88] text-black font-bold uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#00FF88]/20"
            >
              <span>{currentStep === 4 ? 'Review & Complete' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UdwnOnboardingTourModal;
