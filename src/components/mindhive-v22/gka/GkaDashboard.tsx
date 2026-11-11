import React, { useState } from 'react';
import {
  Globe,
  Compass,
  Search,
  Filter,
  Brain,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Languages,
  Zap,
  Activity,
  Bookmark,
  Plus,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Share2
} from 'lucide-react';
import {
  MindHiveV22State,
  GkaTerritory,
  GkaKnowledgeGap,
  GkaGravityNode,
  GkaLanguageResource
} from '../../../types/mindHiveV22';

interface GkaDashboardProps {
  state: MindHiveV22State;
  onDiscoverGap: (gapData: any) => Promise<void>;
  onBackToMaster: () => void;
}

export const GkaDashboard: React.FC<GkaDashboardProps> = ({
  state,
  onDiscoverGap,
  onBackToMaster
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'interactive-map'
    | 'territories'
    | 'languages'
    | 'knowledge-gaps'
    | 'research-intel'
    | 'gravity-map'
    | 'innovations'
    | 'connections'
    | 'agents'
    | 'saved-opportunities'
    | 'reports'
    | 'settings'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerritory, setSelectedTerritory] = useState<GkaTerritory | null>(state.gka.territories[0]);
  const [selectedGravityFilter, setSelectedGravityFilter] = useState<string>('all');
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(['gka-gap-001', 'gka-gap-003']);

  // Propose New Gap Form State
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [gapTitle, setGapTitle] = useState('');
  const [gapTerritory, setGapTerritory] = useState('culture_languages');
  const [gapProblem, setGapProblem] = useState('');
  const [gapEvidence, setGapEvidence] = useState('');
  const [gapGeography, setGapGeography] = useState('West Africa');
  const [gapIndustry, setGapIndustry] = useState('AI & Language Technology');
  const [gapDevCost, setGapDevCost] = useState(15000);
  const [gapPotentialValue, setGapPotentialValue] = useState(250000);
  const [isSubmittingGap, setIsSubmittingGap] = useState(false);
  const [gapSuccessMsg, setGapSuccessMsg] = useState<string | null>(null);

  const toggleSaveOpportunity = (gapId: string) => {
    if (savedOpportunities.includes(gapId)) {
      setSavedOpportunities(savedOpportunities.filter((id) => id !== gapId));
    } else {
      setSavedOpportunities([...savedOpportunities, gapId]);
    }
  };

  const handleProposeGap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gapTitle || !gapProblem) return;
    setIsSubmittingGap(true);
    try {
      await onDiscoverGap({
        territoryId: gapTerritory,
        title: gapTitle,
        problemStatement: gapProblem,
        evidence: gapEvidence,
        targetGeography: gapGeography,
        targetIndustry: gapIndustry,
        estimatedDevCostUsd: gapDevCost,
        potentialCommercialValueUsd: gapPotentialValue
      });
      setGapSuccessMsg(`Knowledge Gap "${gapTitle}" successfully recorded!`);
      setTimeout(() => {
        setGapSuccessMsg(null);
        setShowProposeModal(false);
        setGapTitle('');
        setGapProblem('');
        setActiveTab('knowledge-gaps');
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingGap(false);
    }
  };

  const filteredTerritories = state.gka.territories.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* GKA Division Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-950 border-2 border-cyan-500/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                SYSTEM 2
              </span>
              <span className="text-xs font-mono text-zinc-500">•</span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                20 Living Knowledge Territories • {state.gka.knowledgeGaps.length} Verified Discoveries
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
              Global Knowledge Atlas (GKA)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowProposeModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 hover:brightness-110 text-black text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <span>+ Propose Knowledge Gap</span>
          </button>
          <button
            onClick={onBackToMaster}
            className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-700 transition cursor-pointer"
          >
            &larr; Master Hub
          </button>
        </div>
      </div>

      {/* 3.7 Working Navigation Menu (13 Items) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'overview', label: 'Atlas Overview', icon: Compass },
          { id: 'interactive-map', label: 'Interactive 20-Territory Map', icon: Globe },
          { id: 'territories', label: 'Industry Territories', icon: Layers },
          { id: 'languages', label: 'Language Intelligence', icon: Languages },
          { id: 'knowledge-gaps', label: `Knowledge Gaps (${state.gka.knowledgeGaps.length})`, icon: Activity },
          { id: 'research-intel', label: 'Research Intelligence', icon: FileText },
          { id: 'gravity-map', label: 'Opportunity Gravity Map', icon: Zap },
          { id: 'innovations', label: 'Innovation Discoveries', icon: Sparkles },
          { id: 'connections', label: 'Knowledge Connections', icon: Share2 },
          { id: 'agents', label: 'Research Agents (10)', icon: Brain },
          { id: 'saved-opportunities', label: `Saved (${savedOpportunities.length})`, icon: Bookmark },
          { id: 'reports', label: 'Reports', icon: TrendingUp },
          { id: 'settings', label: 'Settings', icon: Sliders }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: ATLAS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Territories Mapped</span>
              <div className="text-2xl font-bold text-cyan-300 font-mono">20 / 20</div>
              <span className="text-[10px] font-mono text-zinc-400">100% African &amp; Global Scope</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Identified Gaps</span>
              <div className="text-2xl font-bold text-amber-300 font-mono">{state.gka.knowledgeGaps.length} Active</div>
              <span className="text-[10px] font-mono text-amber-400">High Evidence Grounding</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Gravity Nodes</span>
              <div className="text-2xl font-bold text-purple-300 font-mono">{state.gka.gravityNodes.length} Synergies</div>
              <span className="text-[10px] font-mono text-purple-400">Multi-Node Correlation</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Research Agents</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono">10 Autonomous</div>
              <span className="text-[10px] font-mono text-emerald-400">388 Scans Today</span>
            </div>
          </div>

          {/* Territories Preview Strip */}
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-heading font-black text-white">20 Sovereign Knowledge Territories</h3>
                <p className="text-xs text-zinc-400">Select any territory to enter its deep intelligence workspace</p>
              </div>
              <button onClick={() => setActiveTab('interactive-map')} className="text-xs font-mono text-cyan-400 hover:text-white underline cursor-pointer">
                View Full Map &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {state.gka.territories.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTerritory(t);
                    setActiveTab('territories');
                  }}
                  className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-400/50 transition cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.colorHex }} />
                    <span className="text-[10px] font-mono text-zinc-500">{t.coverageScorePercent}% Covered</span>
                  </div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400">
                    {t.registeredAssetsCount} Assets • {t.identifiedGapsCount} Gaps
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 & 3: INTERACTIVE GLOBAL MAP & TERRITORIES */}
      {(activeTab === 'interactive-map' || activeTab === 'territories') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Territory List / Selector (4 Cols) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <input
                  type="text"
                  placeholder="Filter 20 territories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
                {filteredTerritories.map((t) => {
                  const isSelected = selectedTerritory?.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTerritory(t)}
                      className={`p-3.5 rounded-2xl border transition cursor-pointer space-y-1.5 ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-950/40'
                          : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-heading">{t.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-cyan-300">
                          {t.coverageScorePercent}%
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{t.tagline}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Territory Detailed Workspace (8 Cols) */}
            <div className="lg:col-span-8">
              {selectedTerritory ? (
                <div className="p-6 sm:p-7 rounded-3xl bg-zinc-950 border-2 border-cyan-500/40 space-y-6 shadow-2xl">
                  <div className="space-y-2 border-b border-zinc-800 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                        TERRITORY WORKSPACE: {selectedTerritory.id.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300">
                        Est. Territory Capital: ${(selectedTerritory.totalMarketValueEstimateUsd).toLocaleString()} USD
                      </span>
                    </div>

                    <h2 className="text-2xl font-heading font-black text-white">{selectedTerritory.name}</h2>
                    <p className="text-xs font-mono text-cyan-300">{selectedTerritory.tagline}</p>
                    <p className="text-xs text-zinc-300 font-sans leading-relaxed pt-1">{selectedTerritory.summary}</p>
                  </div>

                  {/* Problems & Innovation Opportunities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-[11px] font-mono text-red-400 font-bold uppercase block flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Key Unresolved Industry Problems:</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                        {selectedTerritory.keyProblems.map((prob, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">•</span>
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Innovation Opportunities:</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                        {selectedTerritory.innovationOpportunities.map((opp, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 mt-0.5">&rarr;</span>
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Solutions & Potential Buyers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold">Existing Solutions / Products:</span>
                      <div className="space-y-1 text-zinc-300">
                        {selectedTerritory.existingSolutions.map((sol, idx) => (
                          <div key={idx} className="p-1.5 rounded bg-zinc-950 border border-zinc-800 text-[11px]">
                            {sol}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold">Target Institutional Buyers:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTerritory.potentialBuyers.map((buyer, idx) => (
                          <span key={idx} className="px-2 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-[10px]">
                            {buyer}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-500">Assigned Agents: {selectedTerritory.assignedAgents.join(', ')}</span>
                    <button
                      onClick={() => setShowProposeModal(true)}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold transition cursor-pointer"
                    >
                      Propose Knowledge Gap in this Territory &rarr;
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-zinc-500 text-xs font-mono">
                  Select a territory to enter its detailed intelligence workspace
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GLOBAL LANGUAGE INTELLIGENCE */}
      {activeTab === 'languages' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Languages className="w-5 h-5 text-amber-400" />
                  <span>Global Language Intelligence &amp; African Voice Corpora</span>
                </h2>
                <p className="text-xs text-zinc-400">Preserving indigenous languages and commercializing high-demand tonal speech datasets</p>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">Consented &amp; Licensed</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {state.gka.languages.map((lang) => (
                <div key={lang.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white font-heading">{lang.languageName}</h3>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Demand Score: {lang.commercialDemandScore}/100</span>
                  </div>

                  <div className="text-[11px] font-mono text-zinc-400">
                    Region: <span className="text-zinc-200">{lang.region}</span> • ~{(lang.speakersCountEstimate / 1000000).toFixed(0)}M Native Speakers
                  </div>

                  <p className="text-xs text-zinc-300 font-sans">{lang.datasetSizeSummary}</p>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Resource Type:</span>
                      <span className="text-cyan-300 uppercase">{lang.resourceType.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Lead Contributor:</span>
                      <span className="text-white">{lang.leadContributor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KNOWLEDGE GAPS EXPLORER */}
      {activeTab === 'knowledge-gaps' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>Knowledge Gap Discovery Engine</span>
                </h2>
                <p className="text-xs text-zinc-400">Verified evidence-linked deficits across industries and geographies</p>
              </div>
              <button
                onClick={() => setShowProposeModal(true)}
                className="px-3 py-1.5 rounded-xl bg-cyan-400 text-black text-xs font-mono font-bold cursor-pointer"
              >
                + Propose New Gap
              </button>
            </div>

            <div className="space-y-4">
              {state.gka.knowledgeGaps.map((gap) => (
                <div key={gap.id} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{gap.id}</span>
                      <span className="text-xs font-mono text-zinc-500">•</span>
                      <h3 className="text-sm font-bold text-white">{gap.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">
                        {gap.confidenceLevel}% Confidence
                      </span>
                      <button
                        onClick={() => toggleSaveOpportunity(gap.id)}
                        className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                          savedOpportunities.includes(gap.id)
                            ? 'bg-amber-400 text-black border-amber-300'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 font-sans">{gap.problemStatement}</p>

                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono space-y-1">
                    <div className="text-[11px] text-zinc-400">
                      <span className="text-zinc-500 font-bold">EVIDENCE: </span>
                      <span>{gap.evidence}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 pt-1">
                      <span>Sources: {gap.sourceReferences.join(', ')}</span>
                      <span className="text-amber-400 font-bold">Est. Dev Cost: ${gap.estimatedDevCostUsd.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: OPPORTUNITY GRAVITY MAP */}
      {activeTab === 'gravity-map' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span>Opportunity Gravity Engine (Multi-Node Correlation)</span>
                </h2>
                <p className="text-xs text-zinc-400">Visual intelligence graph connecting knowledge gaps, datasets, AI models, and commercial buyers</p>
              </div>
              <span className="text-xs font-mono text-purple-300">{state.gka.gravityNodes.length} Nodes Interconnected</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {state.gka.gravityNodes.map((node) => (
                <div key={node.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 uppercase">{node.type}</span>
                    <span className="text-zinc-500">Gravity: {node.importance}/10</span>
                  </div>
                  <div className="text-xs font-bold text-white">{node.label}</div>
                  <div className="text-[10px] font-mono text-zinc-400">{node.metricsSummary}</div>
                  <div className="text-[9px] font-mono text-zinc-500 pt-1 border-t border-zinc-800">
                    Linked to {node.connections.length} Nodes
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: 10 GLOBAL RESEARCH AGENTS */}
      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div>
                <h2 className="text-base font-heading font-black text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" />
                  <span>Global Research Autonomous AI Agents (10 Specialists)</span>
                </h2>
                <p className="text-xs text-zinc-400">Continuous telemetry scanning 20 territories for emerging problems and knowledge deficits</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">10/10 Online</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.gka.agents.map((agent) => (
                <div key={agent.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{agent.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 uppercase">
                      {agent.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">{agent.role} ({agent.focusTerritory})</div>
                  <p className="text-xs text-zinc-300 font-sans">{agent.currentInvestigation}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-zinc-800 text-zinc-500">
                    <span>Findings Today: {agent.findingsCountToday}</span>
                    <span>Threshold: {agent.confidenceThreshold}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PROPOSE GAP MODAL */}
      {showProposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-heading font-black text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Propose Knowledge Gap to Global Atlas</span>
              </h3>
              <button onClick={() => setShowProposeModal(false)} className="text-zinc-400 hover:text-white text-xs cursor-pointer">
                ✕
              </button>
            </div>

            {gapSuccessMsg ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{gapSuccessMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleProposeGap} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Gap Opportunity Title</label>
                  <input
                    type="text"
                    value={gapTitle}
                    onChange={(e) => setGapTitle(e.target.value)}
                    placeholder="e.g. Tonal Diacritic Speech Synthesis for Hausa Audiobooks"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Territory</label>
                    <select
                      value={gapTerritory}
                      onChange={(e) => setGapTerritory(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="culture_languages">Culture &amp; Languages</option>
                      <option value="agriculture">Agriculture &amp; Agronomy</option>
                      <option value="engineering">Hardware Engineering</option>
                      <option value="healthcare">Healthcare &amp; Medicine</option>
                      <option value="finance">Fintech &amp; Payments</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Target Geography</label>
                    <input
                      type="text"
                      value={gapGeography}
                      onChange={(e) => setGapGeography(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Problem Statement &amp; Deficit Evidence</label>
                  <textarea
                    value={gapProblem}
                    onChange={(e) => setGapProblem(e.target.value)}
                    rows={3}
                    placeholder="Describe why current models or literature fail and cite field findings..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400 font-sans"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Estimated Dev Cost ($)</label>
                    <input
                      type="number"
                      value={gapDevCost}
                      onChange={(e) => setGapDevCost(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Potential Commercial Value ($)</label>
                    <input
                      type="number"
                      value={gapPotentialValue}
                      onChange={(e) => setGapPotentialValue(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setShowProposeModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingGap}
                    className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold uppercase transition flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmittingGap ? <span>Submitting...</span> : <span>Propose Opportunity &rarr;</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
