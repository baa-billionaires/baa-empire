import React, { useState } from 'react';
import {
  X,
  Download,
  Cpu,
  Shield,
  Sliders,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Server,
  Layers
} from 'lucide-react';
import { CeColonyId } from '../../types/ceColony';

interface CeNodeInstallerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNodeRegistered: () => void;
}

export const CeNodeInstallerModal: React.FC<CeNodeInstallerModalProps> = ({
  isOpen,
  onClose,
  onNodeRegistered
}) => {
  const [shopName, setShopName] = useState('Computer Village Lab #04');
  const [engineerName, setEngineerName] = useState('Engr. Chukwudi Okafor');
  const [location, setLocation] = useState('Lagos, Nigeria');
  const [nodeType, setNodeType] = useState<'workstation_cluster' | 'repair_lab_bench' | 'network_edge_router' | 'laptop_portable'>('repair_lab_bench');
  const [cpuModel, setCpuModel] = useState('Intel Core i7-13700K (16 Cores)');
  const [ramGb, setRamGb] = useState('32');
  const [gpuModel, setGpuModel] = useState('NVIDIA GeForce RTX 4070 12GB');
  const [bandwidthMbps, setBandwidthMbps] = useState('150');
  const [maxTemp, setMaxTemp] = useState('75');
  const [powerLimitWatts, setPowerLimitWatts] = useState('250');
  const [ollamaActive, setOllamaActive] = useState(true);
  const [rayActive, setRayActive] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAutoDetect = () => {
    // Detect browser concurrency and graphics renderer
    const logicalCores = navigator.hardwareConcurrency || 8;
    const canvas = document.createElement('canvas');
    let renderer = 'Dedicated GPU Compute Engine';
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || renderer;
        }
      }
    } catch {
      // ignore
    }

    setCpuModel(`Multi-Core Host (${logicalCores} Logical Threads)`);
    setGpuModel(renderer);
    alert(`Hardware Auto-Detected: ${logicalCores} CPU Cores · ${renderer}`);
  };

  const handleRegisterNode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setRegisteredSuccess(null);

    try {
      const res = await fetch('/api/ce-colony/nodes/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName,
          engineerName,
          location,
          nodeType,
          cpuModel,
          ramGb: Number(ramGb) || 32,
          gpuModel,
          storageGb: 2000,
          bandwidthMbps: Number(bandwidthMbps) || 100,
          ollamaRuntimeActive: ollamaActive,
          rayWorkerActive: rayActive,
          activeColonies: ['compute', 'connectivity', 'repair_intelligence', 'data_refinery'],
          powerLimitWatts: Number(powerLimitWatts) || 250
        })
      });

      const data = await res.json();
      if (data.success) {
        setRegisteredSuccess(data.message);
        onNodeRegistered();
        setTimeout(() => {
          onClose();
        }, 1800);
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-orange-500/40 bg-[#070B16] text-slate-100 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/40">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 bg-orange-500/15 px-2 py-0.5 rounded border border-orange-500/30">
                NODE SETUP WIZARD
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                Connect Shop Hardware Node
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4 text-xs font-mono text-zinc-300 space-y-1">
          <div className="text-orange-400 font-bold flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Zero Untrusted Host Execution Policy</span>
          </div>
          <p>
            The CE Colony daemon runs all customer jobs in sandboxed WebAssembly or container environments.
            Your shop files, BIOS, and personal accounts are 100% isolated.
          </p>
        </div>

        {registeredSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{registeredSuccess}</span>
          </div>
        )}

        <form onSubmit={handleRegisterNode} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 block mb-1">SHOP OR LAB NAME</label>
              <input
                type="text"
                required
                value={shopName}
                onChange={e => setShopName(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">LEAD ENGINEER NAME</label>
              <input
                type="text"
                required
                value={engineerName}
                onChange={e => setEngineerName(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 block mb-1">LOCATION (CITY, COUNTRY)</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="text-zinc-400 block mb-1">NODE DEPLOYMENT TYPE</label>
              <select
                value={nodeType}
                onChange={e => setNodeType(e.target.value as any)}
                className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="repair_lab_bench">Repair Lab Bench Station</option>
                <option value="workstation_cluster">High-Performance Workstation</option>
                <option value="network_edge_router">Network Edge Router Node</option>
                <option value="laptop_portable">Portable Field Laptop</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-black/60 rounded-2xl border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-orange-400 font-bold uppercase text-[11px]">HARDWARE CAPABILITIES</span>
              <button
                type="button"
                onClick={handleAutoDetect}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-[11px]"
              >
                Auto-Detect My Hardware
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-500 text-[10px] block mb-1">CPU MODEL</label>
                <input
                  type="text"
                  value={cpuModel}
                  onChange={e => setCpuModel(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-zinc-500 text-[10px] block mb-1">GPU ACCELERATOR</label>
                <input
                  type="text"
                  value={gpuModel}
                  onChange={e => setGpuModel(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-zinc-500 text-[10px] block mb-1">MEMORY (RAM GB)</label>
                <input
                  type="number"
                  value={ramGb}
                  onChange={e => setRamGb(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"
                />
              </div>

              <div>
                <label className="text-zinc-500 text-[10px] block mb-1">MAX TEMP CEILING (°C)</label>
                <input
                  type="number"
                  value={maxTemp}
                  onChange={e => setMaxTemp(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ollamaActive}
                  onChange={e => setOllamaActive(e.target.checked)}
                  className="rounded text-orange-500"
                />
                <span className="text-zinc-300 text-[11px]">Enable Local Ollama Worker</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rayActive}
                  onChange={e => setRayActive(e.target.checked)}
                  className="rounded text-orange-500"
                />
                <span className="text-zinc-300 text-[11px]">Enable Ray Distributed Agent</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-2xl text-xs font-mono font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-95 text-black flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-black" />
            <span>{submitting ? 'Registering Node to Grid...' : 'Register & Authenticate Node (70% Split)'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
