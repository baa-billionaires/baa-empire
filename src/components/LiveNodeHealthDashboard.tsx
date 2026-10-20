import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Thermometer,
  Wifi,
  Clock,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Smartphone,
  Sliders,
  AlertCircle
} from 'lucide-react';

interface LiveNodeHealthProps {
  className?: string;
}

export const LiveNodeHealthDashboard: React.FC<LiveNodeHealthProps> = ({ className = '' }) => {
  // Real-time simulated telemetry
  const [pingLatency, setPingLatency] = useState<number>(18);
  const [thermalTemp, setThermalTemp] = useState<number>(31.4);
  const [uptimePercent, setUptimePercent] = useState<number>(99.98);
  const [cpuUsage, setCpuUsage] = useState<number>(19.4);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState<boolean>(false);
  const [lastDiagnosticTime, setLastDiagnosticTime] = useState<string>('Just now');

  // Simulated live fluctuation (d3-style dynamics)
  useEffect(() => {
    const timer = setInterval(() => {
      setPingLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(12, Math.min(28, prev + delta));
      });
      setThermalTemp(prev => {
        const delta = (Math.random() * 0.4 - 0.2);
        return Number(Math.max(29.8, Math.min(34.2, prev + delta)).toFixed(1));
      });
      setCpuUsage(prev => {
        const delta = (Math.random() * 0.6 - 0.3);
        return Number(Math.max(18.0, Math.min(21.0, prev + delta)).toFixed(1));
      });
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const runDiagnostic = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      setLastDiagnosticTime(new Date().toLocaleTimeString());
      setPingLatency(16);
      setThermalTemp(30.8);
      setUptimePercent(99.99);
    }, 1400);
  };

  // Radial Bar Math for SVG D3.js-style visualization
  // Circumference = 2 * PI * R
  const createArc = (radius: number, percent: number) => {
    const c = 2 * Math.PI * radius;
    const strokeDashoffset = c - (percent / 100) * c;
    return { c, strokeDashoffset };
  };

  const uptimeArc = createArc(88, uptimePercent);
  const thermalArc = createArc(72, (thermalTemp / 50) * 100); // 50°C max scale
  const latencyArc = createArc(56, Math.max(10, 100 - (pingLatency / 60) * 100)); // lower latency is better
  const cpuArc = createArc(40, (cpuUsage / 30) * 100); // 30% cap

  return (
    <div className={`bg-zinc-950/90 border border-zinc-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden font-sans ${className}`}>
      {/* Background Matrix Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#00FF88]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#00D4FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#00FF88] uppercase tracking-wider">
              REAL-TIME UADC TELEMETRY
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
            <span>Live Node Health Dashboard</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              d3.js RADIAL
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            Continuous sub-millisecond heartbeat monitoring ping latency, thermal signature, and uptime for user-entangled phones.
          </p>
        </div>

        <button
          onClick={runDiagnostic}
          disabled={isDiagnosticRunning}
          className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-[#00FF88] text-white font-mono text-xs flex items-center gap-2 transition active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#00FF88] ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
          <span>{isDiagnosticRunning ? 'Running Ping...' : 'Run Diagnostics'}</span>
        </button>
      </div>

      {/* Main Grid: D3 Radial Chart on Left + Live Metric Telemetry Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: D3.js Simulated Multi-Track Radial Bar Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 200 200"
            >
              {/* Background Tracks */}
              <circle cx="100" cy="100" r="88" stroke="#1f2937" strokeWidth="7" fill="transparent" opacity="0.3" />
              <circle cx="100" cy="100" r="72" stroke="#1f2937" strokeWidth="7" fill="transparent" opacity="0.3" />
              <circle cx="100" cy="100" r="56" stroke="#1f2937" strokeWidth="7" fill="transparent" opacity="0.3" />
              <circle cx="100" cy="100" r="40" stroke="#1f2937" strokeWidth="7" fill="transparent" opacity="0.3" />

              {/* Uptime Radial Bar (Outer: #00FF88) */}
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="#00FF88"
                strokeWidth="7"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={uptimeArc.c}
                strokeDashoffset={uptimeArc.strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />

              {/* Thermal Radial Bar (#FFD700) */}
              <circle
                cx="100"
                cy="100"
                r="72"
                stroke="#FFD700"
                strokeWidth="7"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={thermalArc.c}
                strokeDashoffset={thermalArc.strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />

              {/* Latency Radial Bar (#00D4FF) */}
              <circle
                cx="100"
                cy="100"
                r="56"
                stroke="#00D4FF"
                strokeWidth="7"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={latencyArc.c}
                strokeDashoffset={latencyArc.strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />

              {/* CPU Throttle Cap Bar (#A855F7) */}
              <circle
                cx="100"
                cy="100"
                r="40"
                stroke="#A855F7"
                strokeWidth="7"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={cpuArc.c}
                strokeDashoffset={cpuArc.strokeDashoffset}
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Core HUD Readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono pointer-events-none">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">NODE HEALTH</span>
              <span className="text-2xl sm:text-3xl font-black text-white">99.8%</span>
              <span className="text-[10px] font-bold text-[#00FF88] flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3" /> OPTIMAL
              </span>
            </div>
          </div>

          {/* Radial Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-300 w-full max-w-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
              <span>Uptime: {uptimePercent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
              <span>Thermal: {thermalTemp}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00D4FF]" />
              <span>Ping: {pingLatency}ms</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
              <span>CPU: {cpuUsage}%</span>
            </div>
          </div>
        </div>

        {/* Right: Live Telemetry Cards & Active Device Node Profile */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Ping Latency Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                <span>Ping Latency</span>
                <Wifi className="w-4 h-4 text-[#00D4FF]" />
              </div>
              <div className="text-2xl font-black text-[#00D4FF] font-mono">
                {pingLatency} <span className="text-xs font-normal text-zinc-400">ms</span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Roundtrip Sub-25ms
              </div>
            </div>

            {/* Thermal Temperature Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                <span>Thermal Temp</span>
                <Thermometer className="w-4 h-4 text-[#FFD700]" />
              </div>
              <div className="text-2xl font-black text-[#FFD700] font-mono">
                {thermalTemp} <span className="text-xs font-normal text-zinc-400">°C</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Limit: 45°C (Cool &amp; Safe)
              </div>
            </div>

            {/* Uptime Card */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                <span>Continuous Uptime</span>
                <Clock className="w-4 h-4 text-[#00FF88]" />
              </div>
              <div className="text-2xl font-black text-[#00FF88] font-mono">
                {uptimePercent} <span className="text-xs font-normal text-zinc-400">%</span>
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Overnight Slot Guaranteed
              </div>
            </div>
          </div>

          {/* Active Node Detail Strip */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-zinc-800/90 space-y-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#00FF88]" />
                <span className="font-bold text-white">Current Connected Phone:</span>
                <span className="text-[#00FF88] font-bold">NODE-ID-NG-2417</span>
              </div>
              <span className="text-[10px] text-zinc-400">Last heartbeat: {lastDiagnosticTime}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div>
                <span className="text-zinc-500 block">CPU Allocated:</span>
                <span className="text-white font-bold">{cpuUsage}% (Capped @ 20%)</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Battery State:</span>
                <span className="text-emerald-400 font-bold">Charging • 89%</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Network:</span>
                <span className="text-white font-bold">WiFi High-Speed</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Auto-Cooling:</span>
                <span className="text-[#00FF88] font-bold">Active Sensor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveNodeHealthDashboard;
