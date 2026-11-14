import React, { useState } from 'react';
import { GitBranch, Cpu, Code2, Coins, Brain, Sparkles, CopyCheck, ArrowDown } from 'lucide-react';
import { LivingApp, CopyDetection } from '../../types/novaProtocol';

interface OriginDnaTreeProps {
  app: LivingApp;
  copies: CopyDetection[];
}

export const OriginDnaTree: React.FC<OriginDnaTreeProps> = ({ app, copies }) => {
  const [selectedNode, setSelectedNode] = useState<'idea' | 'breeder' | 'ce' | 'code' | 'app' | 'copies'>('app');

  const appCopies = copies.filter(c => c.original_app_id === app.id);
  const split = app.origin_dna.royalty_split;

  const nodes = [
    {
      id: 'idea' as const,
      title: `Root Idea Coin (${app.idea_coin_symbol})`,
      subtitle: `Creator: ${app.origin_dna.parent_creator}`,
      royalty: `${split.creator}% Royalty`,
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
      icon: Coins,
      detail: `Wallet ${app.origin_dna.creator_wallet.slice(0, 12)}... receives ${split.creator}% of all original & redirected dead-copy clicks.`
    },
    {
      id: 'breeder' as const,
      title: `Mind Hive Breeder (${app.origin_dna.breeder_agent_id})`,
      subtitle: `Mints child coins every 60s mutation`,
      royalty: `${split.breeder}% Royalty`,
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
      icon: Brain,
      detail: `Autonomous Mind Hive agent mutating endpoints & visual DNA every 60s.`
    },
    {
      id: 'ce' as const,
      title: `CE Colony Shards (${app.origin_dna.ce_node_ids.length} Active Nodes)`,
      subtitle: app.origin_dna.ce_node_ids.slice(0, 2).join(', '),
      royalty: `${split.ce_nodes}% Royalty`,
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
      icon: Cpu,
      detail: `Hardware proof-of-life quorum: requires >=80/100 live signatures every 500ms.`
    },
    {
      id: 'code' as const,
      title: `Code Vein Micro-APIs (${app.origin_dna.code_api_ids.length} Shards)`,
      subtitle: app.origin_dna.code_api_ids.slice(0, 2).join(', '),
      royalty: `${split.code_vein_devs}% Royalty`,
      color: 'border-blue-500/50 bg-blue-950/20 text-blue-300',
      icon: Code2,
      detail: `Modular endpoints dynamically rotated across Code Vein repository memory.`
    },
    {
      id: 'app' as const,
      title: `Living App (${app.nova_url})`,
      subtitle: `Mutation V${app.mutation_count} • ${app.total_clicks.toLocaleString()} clicks`,
      royalty: `UA-AIDC ${split.ua_aidc}%`,
      color: 'border-emerald-400 bg-emerald-950/30 text-[#00FF88]',
      icon: Sparkles,
      detail: `Contract ${app.origin_dna.contract_address?.slice(0, 14)}... verifies pixel provenance via OriginDNA.sol.`
    },
    {
      id: 'copies' as const,
      title: `Dead REA Copies (${appCopies.length} Detected)`,
      subtitle: `Diverting traffic & royalties back to Origin`,
      royalty: `$${appCopies.reduce((a, b) => a + b.royalty_redirected, 0).toFixed(2)} Recovered`,
      color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
      icon: CopyCheck,
      detail: `Scraped static HTML fails 500ms heartbeat, shows Dead Copy notice, and routes click royalties home.`
    }
  ];

  const activeDetail = nodes.find(n => n.id === selectedNode) || nodes[4];

  return (
    <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-[#00FF88]" />
            <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider">
              Origin DNA Lineage Tree
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">Click node to inspect</span>
        </div>

        {/* Visual Flow Lineage */}
        <div className="space-y-1.5">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNode === node.id;
            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNode(node.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between gap-2 ${
                    node.color
                  } ${isSelected ? 'ring-2 ring-white/40 scale-[1.01]' : 'opacity-85 hover:opacity-100'}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{node.title}</div>
                      <div className="text-[10px] font-mono text-zinc-400 truncate">{node.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10 shrink-0">
                    {node.royalty}
                  </span>
                </button>
                {index < nodes.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-3 h-3 text-zinc-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Provenance Inspector */}
      <div className="p-3.5 rounded-2xl bg-black/70 border border-zinc-800 space-y-1.5 font-mono text-xs">
        <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          Provenance &amp; Royalty Inspector
        </div>
        <div className="text-white font-bold">{activeDetail.title}</div>
        <p className="text-[11px] text-zinc-400 leading-relaxed">{activeDetail.detail}</p>
      </div>
    </div>
  );
};
