import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Cpu,
  Code2,
  Coins,
  Brain,
  Sparkles,
  Server,
  Globe,
  Wrench,
  Share2,
  Layers,
  Radar,
  FileText,
  Activity,
  Bot
} from 'lucide-react';

export interface UaaidcModuleItem {
  id: string;
  moduleTag: string;
  title: string;
  subtitle: string;
  anatomy: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const UAAIDC_MODULES: UaaidcModuleItem[] = [
  {
    id: 'uadc-lab',
    moduleTag: 'CORE GRID',
    title: 'UADC Lab & UDWN Fleet',
    subtitle: 'Device Wealth Network & Live Telemetry',
    anatomy: 'Nervous System',
    color: 'text-[#00FF88]',
    icon: Cpu
  },
  {
    id: 'uaaig',
    moduleTag: 'PASSPORT',
    title: 'UAAIG Compute Passport',
    subtitle: 'Universal Autonomous AI Infrastructure Grid',
    anatomy: 'Global Grid',
    color: 'text-[#00D4FF]',
    icon: Globe
  },
  {
    id: 'datacenter',
    moduleTag: 'SUPERCLUSTER',
    title: 'Kainji Hydro Data Center',
    subtitle: 'H100 / B200 Green Sovereign Clusters',
    anatomy: 'Power Plant',
    color: 'text-emerald-400',
    icon: Server
  },
  {
    id: 'ce-colony',
    moduleTag: 'MODULE 1',
    title: 'CE Colony V12 (Engineering)',
    subtitle: 'Compute + Data + Human Node Proof',
    anatomy: 'Body (Compute)',
    color: 'text-amber-400',
    icon: Wrench
  },
  {
    id: 'code-vein',
    moduleTag: 'MODULE 2',
    title: 'Code Vein V13 (Software)',
    subtitle: 'Micro-APIs, Models & Dead Repo Refinery',
    anatomy: 'Hands (Code)',
    color: 'text-cyan-400',
    icon: Code2
  },
  {
    id: 'aurum-colony',
    moduleTag: 'MODULE 3',
    title: 'Aurum Colony V13 (Assets)',
    subtitle: 'Wallet Dust Recovery, NFTs & DeFi Yield',
    anatomy: 'Blood (Coins)',
    color: 'text-[#FFD700]',
    icon: Coins
  },
  {
    id: 'genesis',
    moduleTag: 'MODULE 4A',
    title: 'Mind Hive Genesis V17',
    subtitle: 'Autonomous Venture Studio & Colony Fusion',
    anatomy: 'Brain (Ventures)',
    color: 'text-purple-400',
    icon: Sparkles
  },
  {
    id: 'mindhive-v20',
    moduleTag: 'MODULE 4B',
    title: 'Mind Hive V20 (Knowledge)',
    subtitle: 'Content Compounding & AI Model Forge',
    anatomy: 'Brain (Knowledge)',
    color: 'text-amber-300',
    icon: Brain
  },
  {
    id: 'social-hive',
    moduleTag: 'MODULE 4C',
    title: 'Social Hive V21 (Social)',
    subtitle: 'Social Media Minting, Mining & Licensing',
    anatomy: 'Brain (Media)',
    color: 'text-pink-400',
    icon: Share2
  },
  {
    id: 'mindhive-v22',
    moduleTag: 'MODULE 4D',
    title: 'Mind Hive V22 (KCX · GKA · HAVC)',
    subtitle: 'Knowledge Exchange, 20-Territory Atlas & Co-op',
    anatomy: 'Brain (Capital)',
    color: 'text-emerald-300',
    icon: Layers
  },
  {
    id: 'nova-protocol',
    moduleTag: 'MODULE 5 • CROWN',
    title: 'NOVA PROTOCOL V16',
    subtitle: 'Living Uncopyable Apps & Origin DNA Royalties',
    anatomy: 'Soul (Living Web)',
    color: 'text-[#00FF88]',
    icon: Activity
  },
  {
    id: 'm2m-ore',
    moduleTag: 'MODULE 6 • SWARM',
    title: 'M2M ORE PROTOCOL V18',
    subtitle: 'Machine Passports, Service Escrow & Swarm Economy',
    anatomy: 'Swarm (Machine Economy)',
    color: 'text-emerald-400',
    icon: Bot
  },
  {
    id: 'leads-dashboard',
    moduleTag: 'LEADS COMMAND',
    title: 'Leads Output Dashboard',
    subtitle: 'Unified Sources, Identity & Direct Outreach',
    anatomy: 'Growth Radar',
    color: 'text-[#00D4FF]',
    icon: Radar
  },
  {
    id: 'investor-one-pager',
    moduleTag: 'YES FINAL DECK',
    title: 'BAA Investor + Student Deck V16',
    subtitle: 'UA-AIDC Living Internet Civilization Memo',
    anatomy: 'Capital Deck',
    color: 'text-[#00C853]',
    icon: FileText
  }
];

interface Props {
  currentPage: string;
  onSelectModule: (pageId: string) => void;
  variant?: 'navbar' | 'banner';
}

export const UaaidcModuleSwitcher: React.FC<Props> = ({
  currentPage,
  onSelectModule,
  variant = 'banner'
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeModule =
    UAAIDC_MODULES.find((m) => m.id === currentPage) || UAAIDC_MODULES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAnyModuleActive = UAAIDC_MODULES.some((m) => m.id === currentPage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-xl border font-mono text-xs font-bold transition cursor-pointer ${
          variant === 'navbar'
            ? isAnyModuleActive
              ? 'px-3 py-2 bg-emerald-950/60 border-emerald-500/60 text-[#00FF88] shadow-md'
              : 'px-3 py-2 bg-zinc-900 border-zinc-700 hover:border-[#00FF88]/60 text-zinc-200 hover:text-white'
            : 'px-4 py-2.5 bg-zinc-950 border-emerald-500/40 hover:border-emerald-400 text-white shadow-lg'
        }`}
      >
        <Layers className="w-4 h-4 text-[#00FF88] shrink-0" />
        <span className="truncate max-w-[190px]">
          {variant === 'navbar'
            ? isAnyModuleActive
              ? `UA-AIDC: ${activeModule.title.split(' (')[0]}`
              : 'UA-AIDC Modules (6)'
            : `Switch UA-AIDC Dashboard: ${activeModule.title}`}
        </span>
        <span className="px-1.5 py-0.5 rounded bg-[#00FF88]/15 text-[#00FF88] text-[9px] border border-[#00FF88]/30">
          {UAAIDC_MODULES.length}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute ${
            variant === 'navbar' ? 'left-0 mt-2 w-[380px] sm:w-[440px]' : 'right-0 mt-2 w-[340px] sm:w-[420px]'
          } max-h-[75vh] overflow-y-auto bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1`}
        >
          <div className="px-3 py-2 border-b border-zinc-800/80 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                Universal Autonomous AI Data Center
              </div>
              <div className="text-xs text-zinc-300 font-semibold">
                Separate Dedicated Module Dashboards (1 Living Organism)
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1 pt-1">
            {UAAIDC_MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = currentPage === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => {
                    onSelectModule(mod.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 border-emerald-400/70 text-white'
                      : 'bg-zinc-900/40 hover:bg-zinc-900 border-transparent hover:border-zinc-800 text-zinc-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 ${mod.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 ${mod.color}`}>
                          {mod.moduleTag}
                        </span>
                        <span className="text-xs font-bold text-white truncate">
                          {mod.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                        {mod.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-zinc-500 shrink-0 hidden sm:inline">
                    {mod.anatomy}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
