import React, { useState, useEffect, useRef } from 'react';
import {
  Globe2,
  Server,
  Cpu,
  Zap,
  Activity,
  Layers,
  Shield,
  Wifi,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCw,
  Info
} from 'lucide-react';
import { UaaigGlobalNode } from '../../types/uaaig';

const GLOBAL_NODES: UaaigGlobalNode[] = [
  {
    id: 'node-lagos',
    name: 'Lagos Sovereign Hyper-Hub',
    city: 'Lagos',
    country: 'Nigeria',
    coordinates: { x: 380, y: 250, lat: 6.5244, lng: 3.3792 },
    tier: 'sovereign_hub',
    activeNodesCount: 14820,
    currentTFlops: 8420.5,
    pueEfficiency: 1.08,
    powerSource: 'Solar + Microgrid',
    latencyMs: 12,
    currentWorkload: 'Pan-African Multimodal LLM Inference & Dialect Training',
    status: 'optimal'
  },
  {
    id: 'node-nairobi',
    name: 'Nairobi Geothermal AI Core',
    city: 'Nairobi',
    country: 'Kenya',
    coordinates: { x: 440, y: 280, lat: -1.2921, lng: 36.8219 },
    tier: 'university_cluster',
    activeNodesCount: 6890,
    currentTFlops: 4210.0,
    pueEfficiency: 1.04,
    powerSource: '100% Geothermal',
    latencyMs: 16,
    currentWorkload: 'Fintech Fraud Radar & Agricultural Satellite Models',
    status: 'optimal'
  },
  {
    id: 'node-kigali',
    name: 'Kigali Sovereign Trust Node',
    city: 'Kigali',
    country: 'Rwanda',
    coordinates: { x: 415, y: 275, lat: -1.9441, lng: 30.0619 },
    tier: 'sovereign_hub',
    activeNodesCount: 4120,
    currentTFlops: 2840.0,
    pueEfficiency: 1.06,
    powerSource: 'Hydroelectric',
    latencyMs: 14,
    currentWorkload: 'Autonomous Government Document & Health AI Indexing',
    status: 'optimal'
  },
  {
    id: 'node-joburg',
    name: 'Johannesburg Research Foundry',
    city: 'Johannesburg',
    country: 'South Africa',
    coordinates: { x: 420, y: 350, lat: -26.2041, lng: 28.0473 },
    tier: 'enterprise_gpu',
    activeNodesCount: 11400,
    currentTFlops: 7900.2,
    pueEfficiency: 1.14,
    powerSource: 'Hybrid Grid',
    latencyMs: 22,
    currentWorkload: 'Bioinformatics Protein Folding & Financial Swarms',
    status: 'optimal'
  },
  {
    id: 'node-london',
    name: 'London Hyperscale Exchange',
    city: 'London',
    country: 'United Kingdom',
    coordinates: { x: 370, y: 140, lat: 51.5074, lng: -0.1278 },
    tier: 'hyperscale',
    activeNodesCount: 32400,
    currentTFlops: 24800.0,
    pueEfficiency: 1.11,
    powerSource: 'Nuclear',
    latencyMs: 8,
    currentWorkload: 'Autonomous High-Frequency Liquidity & Media Transcode',
    status: 'high_demand'
  },
  {
    id: 'node-frankfurt',
    name: 'Frankfurt Central GPU Matrix',
    city: 'Frankfurt',
    country: 'Germany',
    coordinates: { x: 400, y: 145, lat: 50.1109, lng: 8.6821 },
    tier: 'hyperscale',
    activeNodesCount: 29500,
    currentTFlops: 21900.5,
    pueEfficiency: 1.09,
    powerSource: 'Hybrid Grid',
    latencyMs: 9,
    currentWorkload: 'DeepSeek / Llama 70B Distributed Matrix Serving',
    status: 'optimal'
  },
  {
    id: 'node-sf',
    name: 'San Francisco AI Accelerator Grid',
    city: 'San Francisco',
    country: 'United States',
    coordinates: { x: 170, y: 170, lat: 37.7749, lng: -122.4194 },
    tier: 'enterprise_gpu',
    activeNodesCount: 48900,
    currentTFlops: 38200.0,
    pueEfficiency: 1.15,
    powerSource: 'Solar + Microgrid',
    latencyMs: 14,
    currentWorkload: 'Autonomous Multi-Agent Synthesis & 3D Spatial Rendering',
    status: 'high_demand'
  },
  {
    id: 'node-tokyo',
    name: 'Tokyo Quantum Edge Matrix',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { x: 620, y: 180, lat: 35.6762, lng: 139.6503 },
    tier: 'edge_federation',
    activeNodesCount: 26400,
    currentTFlops: 18450.0,
    pueEfficiency: 1.07,
    powerSource: 'Hydroelectric',
    latencyMs: 6,
    currentWorkload: 'Sub-Millisecond Edge Robotics & Vision Transformers',
    status: 'optimal'
  }
];

export const UaaigPlanetVisual: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<UaaigGlobalNode>(GLOBAL_NODES[0]);
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [pulseBeams, setPulseBeams] = useState<boolean>(true);

  // Auto-rotation animation loop
  useEffect(() => {
    if (!isRotating) return;
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isRotating]);

  // Filtered Nodes
  const filteredNodes = GLOBAL_NODES.filter(node => {
    if (tierFilter === 'all') return true;
    return node.tier === tierFilter;
  });

  const totalGridTFlops = GLOBAL_NODES.reduce((acc, n) => acc + n.currentTFlops, 0);
  const totalActiveNodes = GLOBAL_NODES.reduce((acc, n) => acc + n.activeNodesCount, 0);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#060812] via-[#090b18] to-[#04060b] border border-amber-500/30 p-6 sm:p-8 text-white shadow-2xl">
      {/* Background Starfield and Holographic Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #00FF88 0.5px, transparent 1px), radial-gradient(circle at 30% 70%, #FFD700 0.5px, transparent 1px)`,
          backgroundSize: '32px 32px, 48px 48px'
        }}
      />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
            <span className="text-[10px] font-mono tracking-widest text-[#00FF88] uppercase font-bold">
              Autonomous Holographic Planetary Core
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
            <span>UNIVERSAL AUTONOMOUS COMPUTING PLANET</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
              LIVE GRID
            </span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Interconnecting hyperscale data centers, sovereign national zones, university GPU clusters, smartphones, smart TVs, and edge devices.
          </p>
        </div>

        {/* Live Global Statistics Badges */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-750">
            <span className="text-zinc-500 text-[10px] block">GLOBAL CAPACITY:</span>
            <span className="text-[#00FF88] font-bold">{(totalGridTFlops / 1000).toFixed(1)} PFLOPS</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-750">
            <span className="text-zinc-500 text-[10px] block">ONLINE NODES:</span>
            <span className="text-[#FFD700] font-bold">{totalActiveNodes.toLocaleString()}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-750">
            <span className="text-zinc-500 text-[10px] block">AVG GRID PUE:</span>
            <span className="text-[#00D4FF] font-bold">1.08 (Ultra-Green)</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Orbit Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 pb-2">
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <span className="text-[10px] text-zinc-500 mr-1 uppercase">Filter Nodes:</span>
          {[
            { key: 'all', label: 'All Global Resources' },
            { key: 'sovereign_hub', label: '🏛️ Sovereign Hubs' },
            { key: 'hyperscale', label: '🏢 Hyperscale Centers' },
            { key: 'enterprise_gpu', label: '⚡ Enterprise GPUs' },
            { key: 'university_cluster', label: '🎓 University Clusters' },
            { key: 'edge_federation', label: '📱 Edge & Mobile' }
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setTierFilter(f.key)}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer text-[11px] ${
                tierFilter === f.key
                  ? 'bg-[#00FF88] text-black font-bold shadow-md shadow-[#00FF88]/20'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setIsRotating(prev => !prev)}
            className={`px-2.5 py-1 rounded-lg border transition flex items-center gap-1 cursor-pointer text-[11px] ${
              isRotating
                ? 'bg-zinc-900 border-[#00FF88]/50 text-[#00FF88]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{isRotating ? 'Auto Orbit ON' : 'Orbit Paused'}</span>
          </button>

          <button
            onClick={() => setPulseBeams(prev => !prev)}
            className={`px-2.5 py-1 rounded-lg border transition flex items-center gap-1 cursor-pointer text-[11px] ${
              pulseBeams
                ? 'bg-zinc-900 border-[#FFD700]/50 text-[#FFD700]'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beams {pulseBeams ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map & Hologram Stage */}
      <div className="relative mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Holographic Planet Sphere Visual (7 Cols) */}
        <div className="lg:col-span-8 relative flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
          {/* Subtle Ambient Globe Glow */}
          <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-[#0066FF]/20 via-[#00FF88]/15 to-[#FFD700]/10 blur-3xl pointer-events-none" />

          {/* SVG Planetary Hologram */}
          <svg
            viewBox="0 0 800 500"
            className="w-full h-auto max-h-[460px] select-none"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.15))' }}
          >
            <defs>
              {/* Planetary Gradient */}
              <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#1e2942" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#0b1120" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#030712" stopOpacity="1" />
              </radialGradient>

              {/* Glowing Line Gradients */}
              <linearGradient id="beamGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FF88" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Orbital Rings with 3D Tilt */}
            <ellipse
              cx="400"
              cy="250"
              rx="340"
              ry="110"
              fill="none"
              stroke="#00FF88"
              strokeWidth="0.8"
              strokeDasharray="4 8"
              opacity="0.3"
              transform={`rotate(${rotationAngle * 0.2} 400 250)`}
            />
            <ellipse
              cx="400"
              cy="250"
              rx="370"
              ry="140"
              fill="none"
              stroke="#FFD700"
              strokeWidth="0.6"
              strokeDasharray="2 12"
              opacity="0.25"
              transform={`rotate(-${rotationAngle * 0.15} 400 250)`}
            />

            {/* Central Globe Outline */}
            <circle
              cx="400"
              cy="250"
              r="190"
              fill="url(#globeGrad)"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />

            {/* Longitude / Latitude Coordinate Grid Web */}
            <path
              d="M 210,250 Q 400,160 590,250 Q 400,340 210,250"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.6"
              strokeOpacity="0.2"
            />
            <path
              d="M 230,180 Q 400,110 570,180"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
            <path
              d="M 230,320 Q 400,390 570,320"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeOpacity="0.15"
            />
            <ellipse
              cx="400"
              cy="250"
              rx="90"
              ry="190"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.6"
              strokeOpacity="0.2"
              transform={`rotate(${rotationAngle * 0.4} 400 250)`}
            />
            <ellipse
              cx="400"
              cy="250"
              rx="150"
              ry="190"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
              strokeOpacity="0.15"
              transform={`rotate(${rotationAngle * 0.4 + 45} 400 250)`}
            />

            {/* Animated Connection Beams between Main Nodes */}
            {pulseBeams && (
              <>
                {/* Lagos -> London */}
                <path
                  d="M 380,250 Q 360,190 370,140"
                  fill="none"
                  stroke="url(#beamGreen)"
                  strokeWidth="1.8"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
                {/* Lagos -> Nairobi */}
                <path
                  d="M 380,250 Q 410,260 440,280"
                  fill="none"
                  stroke="url(#beamGreen)"
                  strokeWidth="1.8"
                  strokeDasharray="6 4"
                />
                {/* London -> Frankfurt */}
                <path
                  d="M 370,140 Q 385,135 400,145"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                />
                {/* Frankfurt -> Tokyo */}
                <path
                  d="M 400,145 Q 510,130 620,180"
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="1.5"
                  strokeDasharray="8 6"
                />
                {/* SF -> Lagos */}
                <path
                  d="M 170,170 Q 260,180 380,250"
                  fill="none"
                  stroke="#00FF88"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                {/* Nairobi -> Johannesburg */}
                <path
                  d="M 440,280 Q 445,320 420,350"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </>
            )}

            {/* Global Node Markers */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode.id === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer transition-transform hover:scale-125"
                  transform={`translate(${node.coordinates.x}, ${node.coordinates.y})`}
                >
                  {/* Glowing Radar Rings */}
                  <circle
                    r={isSelected ? '16' : '10'}
                    fill={isSelected ? '#00FF88' : '#FFD700'}
                    fillOpacity={isSelected ? '0.25' : '0.15'}
                    className="animate-ping"
                    style={{ animationDuration: isSelected ? '1.8s' : '3s' }}
                  />
                  <circle
                    r={isSelected ? '9' : '6'}
                    fill={isSelected ? '#00FF88' : '#FFD700'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />

                  {/* Hub Label */}
                  <text
                    x="12"
                    y="4"
                    fill={isSelected ? '#00FF88' : '#e2e8f0'}
                    fontSize={isSelected ? '12' : '10'}
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
                  >
                    {node.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Hub Live Telemetry Card (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-4 text-left shadow-xl">
          <div className="flex items-start justify-between gap-2 border-b border-zinc-850 pb-3">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-[#00FF88] block">
                SELECTED SOVEREIGN CLUSTER
              </span>
              <h4 className="font-heading font-black text-lg text-white">
                {selectedNode.name}
              </h4>
              <span className="text-xs font-mono text-zinc-400">
                {selectedNode.city}, {selectedNode.country}
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase font-bold">
              {selectedNode.status}
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">ACTIVE NODES</span>
              <span className="text-white font-bold text-sm">{selectedNode.activeNodesCount.toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">CURRENT TFLOPS</span>
              <span className="text-[#00FF88] font-bold text-sm">{selectedNode.currentTFlops.toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">PUE EFFICIENCY</span>
              <span className="text-[#00D4FF] font-bold text-sm">{selectedNode.pueEfficiency}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 block">NETWORK LATENCY</span>
              <span className="text-[#FFD700] font-bold text-sm">{selectedNode.latencyMs} ms</span>
            </div>
          </div>

          {/* Clean Power Badge */}
          <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase">
              Power Grid &amp; Sustainability
            </span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white">{selectedNode.powerSource}</span>
            </div>
          </div>

          {/* Current Live Workload */}
          <div className="p-3 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono text-[#00FF88] block uppercase font-bold">
              Active Autonomous Workload
            </span>
            <p className="text-xs text-zinc-200 font-sans leading-snug">
              {selectedNode.currentWorkload}
            </p>
          </div>

          {/* Quick Node Switcher Pill List */}
          <div className="pt-1">
            <span className="text-[10px] font-mono text-zinc-500 block mb-1.5 uppercase">
              Jump to Global Hub:
            </span>
            <div className="flex flex-wrap gap-1">
              {GLOBAL_NODES.map(node => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-md transition cursor-pointer ${
                    selectedNode.id === node.id
                      ? 'bg-[#00FF88] text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {node.city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
