import React, { useState } from 'react';
import {
  Cpu,
  Wifi,
  FileSpreadsheet,
  BrainCircuit,
  Wrench,
  ShoppingBag,
  Network,
  GraduationCap,
  ShieldCheck,
  Server,
  Sparkles,
  Briefcase,
  Play,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Copy,
  Check,
  Send,
  Eye,
  Lock,
  Download,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';
import { CeColonyId, CeColonyMeta, CeColonyState, EngineerNode } from '../../types/ceColony';

interface CeColonyWorkspaceProps {
  colony: CeColonyMeta;
  state: CeColonyState | null;
  onRefreshState: () => void;
  onOpenLedger: () => void;
  onOpenInstaller: () => void;
}

export const CeColonyWorkspace: React.FC<CeColonyWorkspaceProps> = ({
  colony,
  state,
  onRefreshState,
  onOpenLedger,
  onOpenInstaller
}) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'spec' | 'telemetry'>('interactive');
  const [copiedScript, setCopiedScript] = useState(false);
  const [executingJob, setExecutingJob] = useState(false);
  const [jobLogs, setJobLogs] = useState<string[]>([]);
  const [jobSuccess, setJobSuccess] = useState<string | null>(null);

  // Connectivity probe state
  const [pingRunning, setPingRunning] = useState(false);
  const [pingResults, setPingResults] = useState([
    { host: 'Cloudflare Edge (1.1.1.1)', latency: 14, status: 'optimal', loss: '0%' },
    { host: 'Google Primary DNS (8.8.8.8)', latency: 19, status: 'optimal', loss: '0%' },
    { host: 'AWS Cape Town (af-south-1)', latency: 42, status: 'optimal', loss: '0%' },
    { host: 'Lagos IXPN Peering Hub', latency: 8, status: 'optimal', loss: '0%' }
  ]);

  // Data Refinery state
  const [ocrRunning, setOcrRunning] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [selectedDocType, setSelectedDocType] = useState('vendor_invoice');

  // Ghost Engineer state
  const [ghostQuery, setGhostQuery] = useState('');
  const [activeProcedure, setActiveProcedure] = useState<any>(null);
  const [ghostQueryRunning, setGhostQueryRunning] = useState(false);

  // Repair Intelligence state
  const [symptomInput, setSymptomInput] = useState('No power, 3.3V rail measures 1.2 ohms to ground');
  const [deviceModelInput, setDeviceModelInput] = useState('Dell Latitude 5420');
  const [diagRunning, setDiagRunning] = useState(false);
  const [diagResult, setDiagResult] = useState<any>(null);

  // Network Config state
  const [selectedRouterOs, setSelectedRouterOs] = useState('mikrotik');
  const [wanMode, setWanMode] = useState('dual_failover');
  const [vlanCount, setVlanCount] = useState('3');

  // Execute Compute Job
  const handleExecuteComputeJob = async () => {
    setExecutingJob(true);
    setJobSuccess(null);
    setJobLogs(['[SANDBOX_INIT] Spawning isolated WebAssembly/Docker compute container...']);

    setTimeout(() => {
      setJobLogs(prev => [
        ...prev,
        '[RESOURCE_CHECK] Allocating 16 CPU cores & 8GB VRAM (Host OS isolated)',
        '[OLLAMA_RUNTIME] Ingesting sharded Llama-3.3-70B Q4 tensor matrices...'
      ]);
    }, 600);

    setTimeout(() => {
      setJobLogs(prev => [
        ...prev,
        '[WORKLOAD_EXEC] Processing 1,024 batch inference tokens with zero-knowledge verification...',
        '[THERMAL_GUARD] Node GPU temp stable at 58°C (Threshold: 75°C)'
      ]);
    }, 1300);

    setTimeout(async () => {
      try {
        const res = await fetch('/api/ce-colony/jobs/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            colonyId: 'compute',
            title: 'Llama-3.3-70B Sharded High-Throughput Batch Job',
            customer: 'Autonomous Fintech Verification Engine (Lagos)',
            grossPaymentUsd: 45.0,
            nodeId: state?.nodes[0]?.id
          })
        });
        const data = await res.json();
        if (data.success) {
          setJobLogs(prev => [
            ...prev,
            `[VERIFIED] Cryptographic settlement hash: ${data.entry.txHash}`,
            `[PAYMENT_SETTLED] +$${data.entry.engineerNetUsd.toFixed(2)} USD credited to Engineer (70% split)!`
          ]);
          setJobSuccess(`Task complete! +$${data.entry.engineerNetUsd.toFixed(2)} USD earned.`);
          onRefreshState();
        }
      } catch (err) {
        console.error('Job error:', err);
      } finally {
        setExecutingJob(false);
      }
    }, 2200);
  };

  // Run Connectivity Ping Probes
  const handleRunPingProbes = () => {
    setPingRunning(true);
    setTimeout(() => {
      setPingResults([
        { host: 'Cloudflare Edge (1.1.1.1)', latency: Math.floor(12 + Math.random() * 6), status: 'optimal', loss: '0%' },
        { host: 'Google Primary DNS (8.8.8.8)', latency: Math.floor(17 + Math.random() * 5), status: 'optimal', loss: '0%' },
        { host: 'AWS Cape Town (af-south-1)', latency: Math.floor(38 + Math.random() * 8), status: 'optimal', loss: '0%' },
        { host: 'Lagos IXPN Peering Hub', latency: Math.floor(6 + Math.random() * 4), status: 'optimal', loss: '0%' }
      ]);
      setPingRunning(false);
    }, 1200);
  };

  // Run OCR & Data Refinery
  const handleRunOcrExtraction = async () => {
    setOcrRunning(true);
    try {
      const res = await fetch('/api/ce-colony/data-refinery/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName: 'Waybill_Electronics_Procurement_Scan.pdf',
          docType: selectedDocType,
          rawTextSnippet: 'Customer: Engr. Emeka (Phone: +2348039281726, emeka@gmail.com). Total: ₦264,000 for 4x Laptop Screens and 2x BGA Stencils.'
        })
      });
      const data = await res.json();
      if (data.success) {
        setExtractedData(data.record);
      }
    } catch (err) {
      console.error('OCR error:', err);
    } finally {
      setOcrRunning(false);
    }
  };

  // Run Ghost Engineer Query
  const handleGhostQuery = (queryText: string) => {
    setGhostQuery(queryText);
    setGhostQueryRunning(true);
    setTimeout(() => {
      if (queryText.toLowerCase().includes('dell') || queryText.toLowerCase().includes('3.3v')) {
        setActiveProcedure({
          title: 'Dell Latitude 5420: 3.3V_ALWAYS Shorted by Ceramic Filter Capacitor PC301',
          author: 'Engr. Babatunde Adeyemi (Master Micro-Soldering Tech, Ikeja)',
          steps: [
            '1. Connect bench power supply to motherboard DC-in set to 19.5V with 1.0A current limit.',
            '2. Check 3.3V_ALWAYS inductor PL301. If resistance to ground is < 5 ohms, do NOT inject 19V.',
            '3. Inject 1.0V DC at 2A directly onto PL301 with thermal camera or 99% isopropyl alcohol.',
            '4. Observe capacitor PC301 near audio codec evaporating alcohol immediately.',
            '5. Desolder PC301 using hot air at 380°C. Re-measure resistance to ground — should jump to > 40k ohms.'
          ],
          royalty: '$1.50 credited to author wallet'
        });
      } else if (queryText.toLowerCase().includes('macbook') || queryText.toLowerCase().includes('m1')) {
        setActiveProcedure({
          title: 'MacBook Air M1 A2337: CD3217 USB-C Controller Stuck at 5V 0.04A',
          author: 'Mwangi Kamau (Silicon Savannah Tech, Nairobi)',
          steps: [
            '1. Inspect both CD3217 Type-C controller ICs under microscope for corrosion or ESD pits.',
            '2. Measure PP3V3_UPC_XA_LDO on test point TP_CD1. If missing, CD3217 is burned or line shorted.',
            '3. Check T2/M1 communication clock and data lines (SMBUS_SMC_5_G3H_SCL).',
            '4. Swap faulty CD3217 with donor chip pre-balled with leaded solder at 350°C.',
            '5. Power on with 30W USB-C meter; confirm voltage negotiates from 5V to 20.0V 1.4A.'
          ],
          royalty: '$2.00 credited to author wallet'
        });
      } else {
        setActiveProcedure({
          title: 'Generic Power Rail Diagnostics & Short Hunting Protocol',
          author: 'BAA Master Technician Autonomous Consortium',
          steps: [
            '1. Check main power rail B+ / VIN before switching regulators.',
            '2. Verify 3V/5V standby PWM enable signals from Super I/O (EC chip).',
            '3. Ensure CPU VCore and VCCGT are not shorted before power button press.',
            '4. Inspect crystal oscillator 32.768 kHz RTC clock signal with oscilloscope.'
          ],
          royalty: '$0.50 credited to BAA Education Fund'
        });
      }
      setGhostQueryRunning(false);
    }, 700);
  };

  // Run Repair Intelligence Diagnostic
  const handleRunDiagnosis = async () => {
    setDiagRunning(true);
    try {
      const res = await fetch('/api/ce-colony/repair-intelligence/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceType: 'Laptop Workstation',
          brandModel: deviceModelInput,
          symptom: symptomInput,
          errorCodes: ['SHORT_CIRCUIT_PRIMARY_RAIL', 'CODE_NO_BOOT']
        })
      });
      const data = await res.json();
      if (data.success) {
        setDiagResult(data.diagnosis);
      }
    } catch (err) {
      console.error('Diag error:', err);
    } finally {
      setDiagRunning(false);
    }
  };

  const sampleMikroTikScript = `# BAA CE Colony V12 - Automated Hardened Router Script
# RouterOS v7 | Dual WAN Failover + VLANs + DDoS Guard
/interface vlan
add name=VLAN10_STAFF vlan-id=10 interface=bridge1
add name=VLAN20_GUEST vlan-id=20 interface=bridge1
add name=VLAN30_IOT_NODES vlan-id=30 interface=bridge1

/ip firewall filter
add chain=input action=accept protocol=icmp comment="Allow ICMP Telemetry"
add chain=input action=accept connection-state=established,related
add chain=input action=drop connection-state=invalid
add chain=input action=drop protocol=tcp dst-port=22,23,80 in-interface=ether1 comment="Drop WAN Management"

/ip firewall nat
add chain=srcnat out-interface=ether1 action=masquerade comment="Primary ISP NAT"
add chain=srcnat out-interface=ether2 action=masquerade comment="Failover ISP NAT"

/tool netwatch
add host=1.1.1.1 interval=10s up-script="" down-script=":log warning 'Primary WAN down! Auto-switching to WAN 2'"`;

  const copyScriptToClipboard = () => {
    navigator.clipboard.writeText(sampleMikroTikScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-orange-500/25 bg-zinc-950/90 backdrop-blur-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2.5 py-0.5 rounded border border-orange-500/30">
              DIVISION {String(colony.orderNumber).padStart(2, '0')} ACTIVE
            </span>
            <span className="text-xs font-mono text-zinc-500">•</span>
            <span className="text-xs font-mono text-[#FFD700] font-bold">{colony.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
            {colony.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-0.5">
            {colony.tagline}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'interactive'
                ? 'bg-orange-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Live Workbench
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'spec'
                ? 'bg-orange-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Engineering Spec
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
              activeTab === 'telemetry'
                ? 'bg-orange-500 text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Revenue Model
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE WORKBENCH PER COLONY */}
      {activeTab === 'interactive' && (
        <div className="space-y-6">
          {/* 1. COMPUTE COLONY */}
          {colony.id === 'compute' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        Sandboxed Workload Dispatch Console
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      OLLAMA & RAY ACTIVE
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300">
                    Execute verified customer inference tasks on your local GPU/CPU. Tasks run in an isolated
                    container sandbox — host operating system files and network credentials are strictly shielded.
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleExecuteComputeJob}
                      disabled={executingJob}
                      className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-orange-500/20"
                    >
                      {executingJob ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-black" />
                          <span>Executing Sandboxed Job...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 text-black fill-current" />
                          <span>Run Llama-3.3-70B Inference Job ($45.00 Gross)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={onOpenInstaller}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-mono text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition"
                    >
                      Download Local Node Daemon
                    </button>
                  </div>

                  {/* Terminal Execution Logs */}
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs space-y-1.5 min-h-[140px] text-zinc-300">
                    <div className="text-[10px] text-zinc-500 pb-1 border-b border-zinc-800/80 flex items-center justify-between">
                      <span>CONSOLE TELEMETRY STREAM</span>
                      <span>STATUS: {executingJob ? 'COMPUTING' : 'READY'}</span>
                    </div>
                    {jobLogs.length === 0 ? (
                      <div className="text-zinc-600 italic py-6 text-center">
                        Click "Run Llama-3.3-70B Inference Job" to initiate sandboxed workload and claim +$31.50 USD.
                      </div>
                    ) : (
                      jobLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className={
                            log.includes('VERIFIED') || log.includes('PAYMENT_SETTLED')
                              ? 'text-emerald-400 font-bold'
                              : log.includes('THERMAL')
                              ? 'text-amber-400'
                              : 'text-zinc-300'
                          }
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>

                  {jobSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{jobSuccess}</span>
                      </div>
                      <button
                        onClick={onOpenLedger}
                        className="text-xs underline text-emerald-300 hover:text-white"
                      >
                        View in Financial Ledger
                      </button>
                    </div>
                  )}
                </div>

                {/* Node hardware status */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-mono font-bold text-orange-400 uppercase">
                    Connected Node Hardware
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-black/60 rounded-xl border border-zinc-800">
                      <div className="text-zinc-400 text-[10px]">CURRENT NODE</div>
                      <div className="text-white font-bold">{state?.nodes[0]?.shopName ?? 'Ikeja High-Performance Lab'}</div>
                      <div className="text-zinc-500 text-[11px]">{state?.nodes[0]?.engineerName ?? 'Engr. Adeyemi'}</div>
                    </div>

                    <div className="p-2.5 bg-black/60 rounded-xl border border-zinc-800">
                      <div className="text-zinc-400 text-[10px]">GPU ACCELERATOR</div>
                      <div className="text-amber-300 font-bold">{state?.nodes[0]?.gpuModel ?? 'NVIDIA RTX 4090 24GB'}</div>
                      <div className="text-zinc-500 text-[11px]">Temp: 61°C (Limit: 75°C)</div>
                    </div>

                    <div className="p-2.5 bg-black/60 rounded-xl border border-zinc-800">
                      <div className="text-zinc-400 text-[10px]">CPU & MEMORY</div>
                      <div className="text-white">{state?.nodes[0]?.cpuModel ?? 'AMD Ryzen 9 7950X'}</div>
                      <div className="text-zinc-400">{state?.nodes[0]?.ramGb ?? 64} GB DDR5 RAM</div>
                    </div>

                    <div className="p-2.5 bg-black/60 rounded-xl border border-zinc-800 flex justify-between items-center">
                      <div>
                        <div className="text-zinc-400 text-[10px]">BENCHMARK SCORE</div>
                        <div className="text-emerald-400 font-bold">{state?.nodes[0]?.benchmarkScore ?? 96.4} / 100</div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                        TIER 1 ELIGIBLE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CONNECTIVITY COLONY */}
          {colony.id === 'connectivity' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-orange-400" />
                      <span>Commercial Network Telemetry & Latency Radar</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Routers execute lightweight HTTP/ICMP availability probes (&lt; 1MB/hr), earning fixed telemetry retainers.
                    </p>
                  </div>
                  <button
                    onClick={handleRunPingProbes}
                    disabled={pingRunning}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${pingRunning ? 'animate-spin' : ''}`} />
                    <span>{pingRunning ? 'Probing Network...' : 'Run Live Ping Probes'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {pingResults.map((probe, idx) => (
                    <div
                      key={idx}
                      className="bg-black/70 border border-zinc-800 rounded-xl p-4 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400 truncate">{probe.host.split(' ')[0]}</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {probe.status}
                        </span>
                      </div>
                      <div className="text-2xl font-black font-heading text-white">
                        {probe.latency} ms
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 flex justify-between">
                        <span>Packet Loss: {probe.loss}</span>
                        <span>SLA: 99.98%</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                  <div className="space-y-1">
                    <div className="text-orange-400 font-bold">ACTIVE TELEMETRY CONTRACT: CLOUDFLARE RADAR PARTNER</div>
                    <div className="text-zinc-300">
                      Your edge node provides real-time outage detection in West Africa. Retainer: $28.00/month.
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      await fetch('/api/ce-colony/jobs/execute', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          colonyId: 'connectivity',
                          title: '24h Network Availability & Jitter Telemetry Sync',
                          customer: 'Global CDN Telemetry Pool',
                          grossPaymentUsd: 28.0
                        })
                      });
                      onRefreshState();
                      alert('Network telemetry batch submitted! +$19.60 USD credited to your Engineer Ledger.');
                    }}
                    className="px-3.5 py-2 rounded-lg bg-orange-500 hover:bg-orange-400 text-black font-bold shrink-0 transition"
                  >
                    Claim Telemetry Reward ($19.60)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. DATA REFINERY COLONY */}
          {colony.id === 'data_refinery' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Physical Invoices & Logbooks to Structured JSON
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    GDPR / NDPR COMPLIANT PII SCRUBBER
                  </span>
                </div>

                <p className="text-xs text-zinc-300">
                  Digitize customer receipts, spare parts invoices, and workshop job cards into machine-readable datasets.
                  Customer names, phone numbers, and bank account numbers are automatically sanitized before export.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedDocType}
                    onChange={e => setSelectedDocType(e.target.value)}
                    className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-zinc-200"
                  >
                    <option value="vendor_invoice">Spare Parts Procurement Invoice</option>
                    <option value="repair_logbook">Technician Daily Repair Logbook</option>
                    <option value="logistics_waybill">Interstate Electronics Waybill</option>
                    <option value="cybercafe_receipt">Campus Cybercafé Printing Receipt</option>
                  </select>

                  <button
                    onClick={handleRunOcrExtraction}
                    disabled={ocrRunning}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${ocrRunning ? 'animate-spin' : ''}`} />
                    <span>{ocrRunning ? 'Running OCR & PII Redaction...' : 'Digitize & Strip PII ($35.00 Gross)'}</span>
                  </button>
                </div>

                {extractedData && (
                  <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-zinc-400">
                      <span className="text-orange-400 font-bold">STRUCTURED JSON DATASET PREVIEW</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        PII Redacted & Verified
                      </span>
                    </div>

                    <pre className="text-zinc-300 text-[11px] overflow-x-auto p-2 bg-zinc-950 rounded border border-zinc-800/80">
                      {JSON.stringify(extractedData.extractedEntities, null, 2)}
                    </pre>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] text-zinc-400">
                        Sanitized Summary: <span className="text-zinc-200">{extractedData.sanitizedSummary}</span>
                      </div>
                      <button
                        onClick={async () => {
                          await fetch('/api/ce-colony/jobs/execute', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              colonyId: 'data_refinery',
                              title: 'Waybill & Invoices OCR Dataset Batch (500 Records)',
                              customer: 'Trans-Sahara Logistics Intelligence',
                              grossPaymentUsd: 35.0
                            })
                          });
                          onRefreshState();
                          alert('Document exported! +$24.50 USD credited to your Engineer Ledger (70% split).');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                      >
                        Export & Credit +$24.50 USD
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. GHOST ENGINEER COLONY */}
          {colony.id === 'ghost_engineer' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">
                      Query the Cloned Senior Engineer Brain
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#FFD700] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    PERPETUAL ON-CHAIN ROYALTIES
                  </span>
                </div>

                <p className="text-xs text-zinc-300">
                  Technicians query master engineers' cloned diagnostic workflows. Authors earn royalties whenever
                  another engineer worldwide uses their diagnostic procedure to fix a board.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleGhostQuery('Dell Latitude 5420: 3.3V rail shorted')}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-orange-500 transition"
                  >
                    Dell Latitude 3.3V Short
                  </button>
                  <button
                    onClick={() => handleGhostQuery('MacBook Air M1 A2337: Stuck at 5V 0.04A on USB-C')}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-orange-500 transition"
                  >
                    MacBook M1 5V Loop
                  </button>
                  <button
                    onClick={() => handleGhostQuery('HP Pavilion Gaming: VRAM artifacting')}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 hover:border-orange-500 transition"
                  >
                    VRAM Diagnostic Protocol
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ghostQuery}
                    onChange={e => setGhostQuery(e.target.value)}
                    placeholder="Enter device model or broken symptom (e.g., ThinkPad T14 no power)..."
                    className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-100 focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={() => handleGhostQuery(ghostQuery || 'Dell Latitude')}
                    disabled={ghostQueryRunning}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center gap-1.5 transition disabled:opacity-50 shrink-0"
                  >
                    <span>{ghostQueryRunning ? 'Searching Brain...' : 'Consult Ghost AI'}</span>
                  </button>
                </div>

                {activeProcedure && (
                  <div className="bg-black/90 border border-orange-500/30 rounded-xl p-4 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <div>
                        <div className="text-orange-400 font-bold text-sm">{activeProcedure.title}</div>
                        <div className="text-[11px] text-zinc-400">Cloned by: {activeProcedure.author}</div>
                      </div>
                      <span className="text-emerald-400 text-[11px] font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {activeProcedure.royalty}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[11px] text-amber-300 font-bold">VERIFIED REPAIR STEPS:</div>
                      {activeProcedure.steps.map((step: string, i: number) => (
                        <div key={i} className="text-zinc-300 text-xs pl-2 border-l border-orange-500/40">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. REPAIR INTELLIGENCE COLONY */}
          {colony.id === 'repair_intelligence' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-mono font-bold text-white uppercase">
                        AI Motherboard Diagnostic Probe
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      MULTIMETER SIMULATOR
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        DEVICE BRAND & MODEL
                      </label>
                      <input
                        type="text"
                        value={deviceModelInput}
                        onChange={e => setDeviceModelInput(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                        REPORTED SYMPTOM OR RESISTANCE READINGS
                      </label>
                      <textarea
                        rows={2}
                        value={symptomInput}
                        onChange={e => setSymptomInput(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>

                    <button
                      onClick={handleRunDiagnosis}
                      disabled={diagRunning}
                      className="w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${diagRunning ? 'animate-spin' : ''}`} />
                      <span>{diagRunning ? 'Calculating Probability Matrix...' : 'Run Neural Diagnostic & Quote'}</span>
                    </button>
                  </div>
                </div>

                {/* Diagnostic Output & Customer Quote */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-orange-400 uppercase">FAILURE PROBABILITY BREAKDOWN</span>
                    <span className="text-zinc-500">97.4% ACCURACY</span>
                  </div>

                  {diagResult ? (
                    <div className="space-y-3 text-xs font-mono">
                      <div className="space-y-2">
                        {diagResult.probabilityBreakdown.map((item: any, i: number) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-zinc-300">{item.component}</span>
                              <span className="text-amber-300 font-bold">{item.probability}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-orange-500 to-[#FFD700] h-full rounded-full"
                                style={{ width: `${item.probability}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-black/80 rounded-xl border border-zinc-800 space-y-1.5">
                        <div className="text-emerald-400 font-bold text-xs">
                          AUTOMATED CLIENT QUOTATION GENERATOR
                        </div>
                        <div className="flex justify-between text-zinc-400 text-[11px]">
                          <span>Parts Cost:</span>
                          <span className="text-white">${diagResult.estimatedPartsCostUsd}.00</span>
                        </div>
                        <div className="flex justify-between text-zinc-400 text-[11px]">
                          <span>Labor (Master Tech):</span>
                          <span className="text-white">${diagResult.estimatedLaborCostUsd}.00</span>
                        </div>
                        <div className="flex justify-between border-t border-zinc-800 pt-1 text-sm font-bold">
                          <span className="text-orange-400">Total Quotation:</span>
                          <span className="text-[#FFD700]">
                            ${diagResult.totalQuotationUsd}.00 (₦{diagResult.totalQuotationNgn.toLocaleString()} NGN)
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Quotation generated and copied! Total: $${diagResult.totalQuotationUsd} USD. Send to client via WhatsApp or print intake card.`)}
                        className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition"
                      >
                        Dispatch Quote to Customer
                      </button>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-zinc-600 text-xs font-mono">
                      Enter hardware details and click "Run Neural Diagnostic" to see component failure probabilities and customer quotation.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 6. HARDWARE ASSET EXCHANGE */}
          {colony.id === 'hardware_exchange' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-orange-400" />
                      <span>Verified Refurbished Hardware Exchange</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Escrow-backed marketplace. Every item carries a cryptographic Hardware Passport verifying stress tests.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('New Hardware Listing Wizard: Upload stress test benchmark log (3DMark/MemTest) to mint cryptographic passport stamp.')}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black transition"
                  >
                    + List Refurbished Hardware
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      name: 'NVIDIA RTX 4090 24GB VRAM (Refurbished)',
                      priceUsd: 1450,
                      priceNgn: 2175000,
                      score: '98.8/100',
                      seller: 'Ikeja High-Performance Lab',
                      passport: '0x8f2a...91b'
                    },
                    {
                      name: 'Dell Precision 7760 Mobile Workstation (64GB RAM)',
                      priceUsd: 890,
                      priceNgn: 1335000,
                      score: '96.2/100',
                      seller: 'Silicon Savannah Tech Hub',
                      passport: '0x3c1d...48a'
                    },
                    {
                      name: 'MikroTik CCR2004 16G 2S+ Cloud Core Router',
                      priceUsd: 380,
                      priceNgn: 570000,
                      score: '99.4/100',
                      seller: 'Accra CyberOps Center',
                      passport: '0x9e4f...72c'
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/80 border border-zinc-800 rounded-xl p-4 space-y-3 relative group hover:border-orange-500/40 transition">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          PASSPORT VERIFIED
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-300">{item.score}</span>
                      </div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-200 transition">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        Seller: {item.seller}
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                        <div>
                          <div className="text-sm font-black text-[#FFD700]">${item.priceUsd} USD</div>
                          <div className="text-[10px] font-mono text-zinc-400">₦{item.priceNgn.toLocaleString()} NGN</div>
                        </div>
                        <button
                          onClick={() => alert(`Escrow order opened for ${item.name}! Funds held securely by Paystack until 48h benchmark burn-in passes.`)}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black transition"
                        >
                          Buy with Escrow
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. NETWORK SERVICES */}
          {colony.id === 'network_services' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Network className="w-4 h-4 text-orange-400" />
                      <span>Automated Hardened Router Config Generator</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      Generate enterprise configuration scripts for MikroTik, pfSense, Cisco, and Ubiquiti with VLANs and firewall rules.
                    </p>
                  </div>
                  <button
                    onClick={copyScriptToClipboard}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-orange-500 hover:bg-orange-400 text-black flex items-center gap-2 transition"
                  >
                    {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedScript ? 'Script Copied!' : 'Copy RouterOS Script'}</span>
                  </button>
                </div>

                <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto max-h-56">
                  <pre className="text-[11px] leading-relaxed text-amber-200/90">{sampleMikroTikScript}</pre>
                </div>

                <div className="p-3 bg-zinc-800/50 rounded-xl text-xs font-mono text-zinc-400 flex justify-between items-center">
                  <span>Remote Managed Router Retainers: 94 Commercial APs active across 28 local clients</span>
                  <span className="text-[#FFD700] font-bold">+$740.00 / month</span>
                </div>
              </div>
            </div>
          )}

          {/* 8. SKILL LICENSING */}
          {colony.id === 'skill_licensing' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-orange-400" />
                    <span>Institutional Curriculum & Masterclass Licensing</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    12 INSTITUTES ENROLLED
                  </span>
                </div>

                <p className="text-xs text-zinc-300">
                  Senior engineers publish hands-on lab manuals and boardview schematics licensed by polytechnics and technical colleges.
                  Graduating students receive Base L2 on-chain proof of competence.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      title: 'Micro-Soldering & BGA Reballing Master Curriculum',
                      duration: '6 Weeks · 18 Lab Sessions',
                      subscribers: '180 Students',
                      revenue: '$450/term'
                    },
                    {
                      title: 'Enterprise Router Hardening & Fiber Splicing Lab',
                      duration: '4 Weeks · 12 Lab Sessions',
                      subscribers: '160 Students',
                      revenue: '$410/term'
                    }
                  ].map((course, idx) => (
                    <div key={idx} className="bg-black/80 border border-zinc-800 rounded-xl p-4 space-y-2">
                      <div className="text-sm font-bold text-white">{course.title}</div>
                      <div className="text-[11px] font-mono text-zinc-400">{course.duration}</div>
                      <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-xs font-mono">
                        <span className="text-zinc-500">{course.subscribers}</span>
                        <span className="text-[#FFD700] font-bold">{course.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 9. MANAGED IT & CYBERSECURITY */}
          {colony.id === 'managed_it' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-400" />
                    <span>SME Endpoint SOC & Automated Patch Compliance</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    410 ENDPOINTS MONITORED
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { client: 'Apex Legal Chambers', endpoints: 18, patches: 'All Patched', backup: 'Verified Today' },
                    { client: 'St. Jude Specialist Clinic', endpoints: 34, patches: '1 CVE Pending', backup: 'Verified Today' },
                    { client: 'Trans-Sahara Logistics POS', endpoints: 42, patches: 'All Patched', backup: 'Verified Today' }
                  ].map((c, i) => (
                    <div key={i} className="bg-black/80 border border-zinc-800 rounded-xl p-3.5 space-y-2 text-xs font-mono">
                      <div className="font-bold text-white">{c.client}</div>
                      <div className="text-zinc-400 text-[11px]">{c.endpoints} Workstations</div>
                      <div className="text-emerald-400 flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {c.backup}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 10. EDGE AI APPLIANCE */}
          {colony.id === 'edge_ai' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-orange-400" />
                    <span>Air-Gapped Private LLM Appliance Configurator</span>
                  </h3>
                  <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                    ZERO CLOUD LEAKAGE
                  </span>
                </div>

                <p className="text-xs text-zinc-300">
                  Build and sell turnkey private AI appliances (Ollama + local vector database) for hospitals, legal chambers,
                  and schools that cannot legally upload patient or client documents to public cloud AI.
                </p>

                <div className="p-4 bg-black/80 border border-zinc-800 rounded-xl space-y-3 text-xs font-mono">
                  <div className="flex justify-between items-center text-sm font-bold text-orange-400">
                    <span>APPLIANCE SPEC: BAA CE-EDGE-RUGGED-01</span>
                    <span className="text-[#FFD700]">$850 Setup + $60/mo SLA</span>
                  </div>
                  <div className="text-zinc-300 space-y-1">
                    <div>• Hardware: Mini-PC AMD Ryzen 7 7735HS · 32GB DDR5 · 2TB NVMe SSD</div>
                    <div>• Runtimes: Offline Ollama (Llama-3.3-8B 4-bit) + Chroma Vector Store</div>
                    <div>• Privacy: Physical ethernet isolation switch · 0KB external internet required</div>
                  </div>
                  <button
                    onClick={() => alert('Appliance deployment manifest generated! Includes full Ansible playbook, Docker compose, and client SLA agreement.')}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold"
                  >
                    Generate Turnkey Appliance Manifest
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 11. RESEARCH & INNOVATION */}
          {colony.id === 'research_innovation' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span>Hardware Reverse Engineering Bounties & Tooling</span>
                  </h3>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    $8,400 IN ACTIVE BOUNTY POOL
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      title: 'Reverse-Engineer Lenovo ThinkPad T14 EC Power-On Sequence',
                      reward: '$1,200 USD',
                      submissions: '4 Technicians Competing'
                    },
                    {
                      title: 'Design Open-Source Low-Cost Thermal Camera Probe Adapter',
                      reward: '$850 USD',
                      submissions: '6 Hardware Hackers'
                    }
                  ].map((bounty, i) => (
                    <div key={i} className="bg-black/80 border border-zinc-800 rounded-xl p-4 space-y-2">
                      <div className="text-sm font-bold text-white">{bounty.title}</div>
                      <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-zinc-800">
                        <span className="text-zinc-500">{bounty.submissions}</span>
                        <span className="text-emerald-400 font-bold">{bounty.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 12. ENGINEER OPPORTUNITY */}
          {colony.id === 'engineer_opportunity' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-orange-400" />
                    <span>Commercial Contract Radar & Escrow Pipeline</span>
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    24 OPEN TENDERS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      client: 'Lagos State University Tech Lab Overhaul',
                      budget: '$4,500 USD (₦6.75M NGN)',
                      scope: 'Refurbish & network 120 desktop workstations + dual-WAN router'
                    },
                    {
                      client: 'Telehealth Clinic Air-Gapped Appliance Setup',
                      budget: '$2,800 USD (₦4.20M NGN)',
                      scope: 'Assemble & test 2 private edge AI servers with medical records RAG'
                    }
                  ].map((tender, i) => (
                    <div key={i} className="bg-black/80 border border-zinc-800 rounded-xl p-4 space-y-2">
                      <div className="text-sm font-bold text-white">{tender.client}</div>
                      <div className="text-xs text-zinc-400">{tender.scope}</div>
                      <div className="flex justify-between items-center pt-2 border-t border-zinc-800 text-xs font-mono">
                        <span className="text-amber-300 font-bold">{tender.budget}</span>
                        <button
                          onClick={() => alert(`AI Proposal generated for ${tender.client}! Milestone escrow contract prepared via Paystack.`)}
                          className="px-3 py-1 rounded bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs"
                        >
                          Generate AI Proposal
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DETAILED ENGINEERING SPECIFICATION */}
      {activeTab === 'spec' && (
        <div className="space-y-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 text-xs font-mono">
          <div className="text-sm font-bold text-orange-400 pb-2 border-b border-zinc-800">
            TECHNICAL ARCHITECTURE & SECURITY BOUNDARIES
          </div>
          <div className="space-y-2 text-zinc-300">
            <p className="leading-relaxed">
              <strong className="text-white">Zero Untrusted Execution:</strong> The CE Colony daemon strictly forbids executing
              arbitrary binaries or scripts on the host operating system. Compute jobs run inside sandboxed WebAssembly / OCI-compliant
              runtimes with pre-configured memory and instruction quotas.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Thermal & Hardware Protections:</strong> Automatic governors throttle workloads when GPU/CPU
              temperatures cross 75°C, or when the system detects active local repair benchmark tests running on the bench.
            </p>
            <p className="leading-relaxed">
              <strong className="text-white">Customer Data Quarantine:</strong> All customer invoices, receipts, and logbooks processed
              through the Data Refinery are encrypted in transit with AES-256 and purged from memory immediately following structured JSON export.
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: REVENUE MODEL */}
      {activeTab === 'telemetry' && (
        <div className="space-y-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 text-xs font-mono">
          <div className="text-sm font-bold text-[#FFD700] pb-2 border-b border-zinc-800">
            TRANSPARENT 70/30 REVENUE MODEL
          </div>
          <div className="space-y-3 text-zinc-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-black/60 rounded-xl border border-orange-500/30 space-y-1">
                <div className="text-orange-400 font-bold text-sm">70% Engineer Net Share</div>
                <div className="text-zinc-400">
                  Credited directly to the technician's withdrawable ledger in USD and NGN. Withdrawable via Paystack bank transfer
                  or BaaCoin on Base L2.
                </div>
              </div>
              <div className="p-4 bg-black/60 rounded-xl border border-zinc-800 space-y-1">
                <div className="text-zinc-400 font-bold text-sm">30% BAA Network Treasury</div>
                <div className="text-zinc-400">
                  Funds continuous protocol development, AI model fine-tuning, hardware escrow insurance, and community student scholarships.
                </div>
              </div>
            </div>
            <button
              onClick={onOpenLedger}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs"
            >
              Open Full Financial Ledger & Payout Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
