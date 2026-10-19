import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Zap,
  Activity,
  ShieldCheck,
  Download,
  Server,
  TrendingUp,
  Globe2,
  HardDrive,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const DataCenterPage: React.FC = () => {
  const [activeRack, setActiveRack] = useState(1);
  const [computeReserved, setComputeReserved] = useState(false);
  const [gpuLoad, setGpuLoad] = useState(87.4);
  const [livePUE, setLivePUE] = useState(1.08);

  // Live telemetry pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setGpuLoad(prev => Number((85 + Math.random() * 6).toFixed(1)));
      setLivePUE(prev => Number((1.07 + Math.random() * 0.02).toFixed(2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadPitch = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `UNIVERSAL AUTONOMOUS AI DATA CENTER - EXECUTIVE TERM SHEET 2026\n\n` +
      `Sovereign African Green Compute Infrastructure\n` +
      `Location: Kainji Hydroelectric Corridor & Sahara Solar Ring, Nigeria\n` +
      `Power: 100% Renewable Hydropower & Utility-Scale Solar\n` +
      `PUE Ratio: ${livePUE} (World-Class Green Efficiency)\n` +
      `Capacity: 2,048 x NVIDIA H100 SXM5 & B200 Liquid-Cooled Clusters\n` +
      `Projected IRR: 24.8% per annum\n` +
      `Tokenized Settlement: BaaCoin & On-Chain GPU compute leasing\n` +
      `Chancellor: Dr. Chukwuma Sterling\n` +
      `Contact: naijaukmusicalfusion@gmail.com`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Universal_Autonomous_Data_Center_Pitch_Deck.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
        <div>
          <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase font-bold flex items-center gap-1.5 justify-center sm:justify-start">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Universal Autonomous AI Data Center (Kainji Hydro Hub)
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white mt-2">
            Africa's Sovereign AI Compute
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Ultra-low latency, self-healing H100/B200 GPU superclusters operating at <span className="text-emerald-400 font-bold">{livePUE} PUE</span> on 100% clean hydropower and desert solar arrays.
          </p>
        </div>

        {/* Executive Pitch Action */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadPitch}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Investor Pitch</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Real-time Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>ACTIVE CLUSTER LOAD</span>
              <Activity className="w-4 h-4 text-[#00D4FF]" />
            </div>
            <div className="text-3xl font-heading font-black text-white">{gpuLoad}%</div>
            <span className="text-[10px] text-emerald-400 font-mono">2,048 Nodes Online</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>PUE EFFICIENCY</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-heading font-black text-emerald-400">{livePUE}</div>
            <span className="text-[10px] text-zinc-500 font-mono">Industry avg: 1.58</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>RENEWABLE ENERGY</span>
              <Globe2 className="w-4 h-4 text-[#FFD700]" />
            </div>
            <div className="text-3xl font-heading font-black text-[#FFD700]">100%</div>
            <span className="text-[10px] text-zinc-400 font-mono">Hydro + Solar Microgrid</span>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
              <span>SELF-HEALING SYSTEM</span>
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-heading font-black text-purple-400">99.999%</div>
            <span className="text-[10px] text-zinc-400 font-mono">Autonomous Failover</span>
          </div>
        </div>

        {/* Interactive Server Racks Visualizer */}
        <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-heading font-black text-white">
                Live Sovereign Supercluster Telemetry (Pod Alpha-7)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Click server nodes to inspect GPU temperature, memory bus bandwidth, and self-healing status.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map(rack => (
                <button
                  key={rack}
                  onClick={() => setActiveRack(rack)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                    activeRack === rack
                      ? 'bg-[#00D4FF] text-black shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  Rack 0{rack}
                </button>
              ))}
            </div>
          </div>

          {/* Racks Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }, (_, i) => {
              const nodeNum = (activeRack - 1) * 8 + i + 1;
              const isSelected = i === 2;
              return (
                <div
                  key={i}
                  className={`p-4 rounded-xl border transition ${
                    isSelected
                      ? 'bg-zinc-900/90 border-[#00D4FF] shadow-lg shadow-[#00D4FF]/10'
                      : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-white font-bold">Node #H100-{nodeNum.toString().padStart(2, '0')}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-zinc-400">
                    <div>Temp: <span className="text-emerald-400">46°C (Liquid)</span></div>
                    <div>VRAM: <span className="text-white">80GB HBM3 (92%)</span></div>
                    <div>Bandwidth: <span className="text-[#00D4FF]">3.2 TB/s InfiniBand</span></div>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-3">
                    <div className="bg-[#00D4FF] h-full rounded-full" style={{ width: `${80 + (i * 2)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investor Pitch & Compute Reservation Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Investor Pitch Highlights (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-3xl border border-[#FFD700]/30 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700] font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Institutional Opportunity</span>
            </div>
            <h3 className="text-2xl font-heading font-black text-white">
              Why Global Investors Are Allocating to African Compute
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Global artificial intelligence inference requires gigawatts of low-cost, sovereign power. By leveraging abundant Nigerian hydroelectric capacity and Sahara solar irradiance, our data center reduces operational power expense by <span className="text-[#FFD700] font-bold">64% compared to European and North American facilities</span>.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Target Internal Rate (IRR)</span>
                <span className="text-2xl font-bold text-[#FFD700] block mt-1">24.8% Net</span>
                <span className="text-[10px] text-zinc-500">Contracted with pan-African fintechs</span>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Minimum Tranche</span>
                <span className="text-2xl font-bold text-white block mt-1">$50,000</span>
                <span className="text-[10px] text-zinc-500">Seed infrastructure notes</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadPitch}
                className="px-6 py-3 bg-[#FFD700] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Get Full Investor Prospectus</span>
              </button>
            </div>
          </div>

          {/* Direct Compute Reservation (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-lg font-heading font-black text-white">
              Reserve Sovereign GPU Compute
            </h3>
            <p className="text-xs text-zinc-400">
              For institutions, African universities, and enterprise builders needing dedicated H100 clusters.
            </p>

            {computeReserved ? (
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Compute Allocation Requested</h4>
                <p className="text-xs text-emerald-300">
                  Our infrastructure team will provision your dedicated cluster tunnel within 2 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setComputeReserved(true);
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Company / Institution</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lagos Tech Hub / University Portal"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Workload Scale</label>
                  <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 outline-none">
                    <option>Starter: 8x H100 SXM5 ($1,990/mo)</option>
                    <option>Scale: 32x H100 Supercluster ($7,450/mo)</option>
                    <option>Sovereign: 128x Node Dedicated Pod ($24,000/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="architect@domain.com"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition"
                >
                  Request Dedicated GPU Allocation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataCenterPage;
