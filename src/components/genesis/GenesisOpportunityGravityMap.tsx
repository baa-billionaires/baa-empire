import React, { useState } from 'react';
import {
  Globe,
  Radio,
  Cpu,
  Layers,
  Coins,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { MindHiveGenesisState, OpportunityGravityNode, OpportunityGravityEdge } from '../../types/mindHiveGenesis';

interface GenesisOpportunityGravityMapProps {
  state: MindHiveGenesisState;
  onInitiateVentureFromIntersection?: (nodeA: OpportunityGravityNode, nodeB: OpportunityGravityNode) => void;
}

export const GenesisOpportunityGravityMap: React.FC<GenesisOpportunityGravityMapProps> = ({
  state,
  onInitiateVentureFromIntersection
}) => {
  const { gravityNodes, gravityEdges } = state;
  const [selectedNode, setSelectedNode] = useState<OpportunityGravityNode | null>(gravityNodes[0] || null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'DEMAND':
        return '#38BDF8'; // Sky blue
      case 'COMPUTE':
        return '#3B82F6'; // Blue
      case 'SOFTWARE':
        return '#A855F7'; // Purple
      case 'ASSET':
        return '#F59E0B'; // Amber
      case 'REGIONAL_GAP':
        return '#10B981'; // Emerald
      default:
        return '#06B6D4';
    }
  };

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-6 mb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Interactive Intelligence Map
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Cross-Colony Capability Intersections
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1">
            Opportunity Gravity Map
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Connecting real customer demand, CE Colony compute, Code Vein software, and Aurum Colony asset rails.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            Demand
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            Compute (CE)
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
            Code Vein
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            Aurum Assets
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Node Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Visual Simulated Gravity Network Graph */}
        <div className="lg:col-span-2 relative min-h-[340px] bg-slate-900/60 rounded-xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top Network Stats */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
            <span>Nodes: {gravityNodes.length} Active Gravity Hubs</span>
            <span>Synergy Edges: {gravityEdges.length} Verified Intersections</span>
          </div>

          {/* Visual Interactive Nodes */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4">
            {gravityNodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const color = getNodeColor(node.type);

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider text-slate-950"
                        style={{ backgroundColor: color }}
                      >
                        {node.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {node.colonyAffiliation.replace('_V12', '').replace('_V13', '').replace('_V17', '')}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-1">{node.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{node.region || 'Global Infrastructure'}</div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500">Value:</span>
                    <span className="text-cyan-300 font-bold">${(node.valueUsd / 1000).toFixed(0)}K USD</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Synergy Edges list */}
          <div className="relative z-10 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
            <span className="text-[11px] font-medium text-slate-300">Highest Synergy Edge:</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Code Vein APIs ⟷ Aurum Treasury Escrow (Score: 96.0)</span>
            </div>
          </div>
        </div>

        {/* Selected Node Detailed Inspector */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Gravity Hub Inspector
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedNode?.colonyAffiliation}
              </span>
            </div>

            {selectedNode ? (
              <>
                <h4 className="text-base font-bold text-white mb-1">{selectedNode.label}</h4>
                <div className="text-xs text-slate-400 mb-4">{selectedNode.region || 'Cross-Colony Network'}</div>

                <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Node Classification:</span>
                    <span className="font-bold text-white">{selectedNode.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Opportunity Value:</span>
                    <span className="font-bold text-cyan-300 font-mono">${selectedNode.valueUsd.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gravity Strength:</span>
                    <span className="font-bold text-emerald-400">{selectedNode.strength} / 100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Cross-Edges:</span>
                    <span className="font-bold text-purple-400">{selectedNode.connectedEdgeCount} Intersections</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
                  💡 This node represents a verified commercial intersection. Pairing this capability with CE Colony compute nodes can launch a new venture blueprint.
                </div>
              </>
            ) : (
              <div className="text-xs text-slate-500 italic py-8 text-center">Select a gravity node to view dossier</div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                if (selectedNode && onInitiateVentureFromIntersection) {
                  const partner = gravityNodes.find((n) => n.id !== selectedNode.id) || selectedNode;
                  onInitiateVentureFromIntersection(selectedNode, partner);
                }
              }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Synthesize Venture from Intersection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
