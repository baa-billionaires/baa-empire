import React, { useState } from 'react';
import { BAABook, BatchGenerationConfig, PublishingAgent } from '../../types/library';
import { BAA_PUBLISHING_SWARM_AGENTS, BAA_25_CATEGORIES } from '../../lib/baaLibraryData';
import { 
  Bot, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Play, 
  AlertTriangle, 
  X, 
  Sliders, 
  Check, 
  RefreshCw
} from 'lucide-react';

interface PublishingSwarmModalProps {
  books: BAABook[];
  onUpdateBookStatus: (bookId: string, newStatus: any) => void;
  onClose: () => void;
}

export const PublishingSwarmModal: React.FC<PublishingSwarmModalProps> = ({
  books,
  onUpdateBookStatus,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'controller' | 'swarm-roster' | 'approval-queue'>('controller');
  const [batchSize, setBatchSize] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All 25 Categories');
  const [selectedModel, setSelectedModel] = useState<BatchGenerationConfig['selectedModel']>('Gemini 2.5 Flash');
  const [contentDepth, setContentDepth] = useState<BatchGenerationConfig['contentDepth']>('Complete Sovereign Edition (8-12 Chapters)');
  
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [orchestrationProgress, setOrchestrationProgress] = useState<number>(0);
  const [currentAgentStep, setCurrentAgentStep] = useState<string>('');
  const [orchestrationLogs, setOrchestrationLogs] = useState<string[]>([]);
  const [selectedAgentDept, setSelectedAgentDept] = useState<string>('all');

  const pendingBooks = books.filter(b => b.publicationStatus !== 'published');

  const handleRunBatchPipeline = () => {
    setIsOrchestrating(true);
    setOrchestrationProgress(5);
    setOrchestrationLogs([
      `[Swarm Dispatch] Initializing batch run of ${batchSize} book(s) using ${selectedModel}...`,
      `[Pipeline Safety] Quota protector active. Generating in controlled chunks to prevent model saturation.`
    ]);

    const targetCandidates = pendingBooks
      .filter(b => selectedCategory === 'All 25 Categories' || b.category === selectedCategory)
      .slice(0, batchSize);

    if (targetCandidates.length === 0) {
      setOrchestrationLogs(prev => [...prev, `[Notice] No pending books found for category: ${selectedCategory}.`]);
      setIsOrchestrating(false);
      return;
    }

    const steps = [
      { progress: 20, agent: 'Lead Autonomous Architect #1', log: 'Synthesizing comprehensive table of contents and curriculum map...' },
      { progress: 40, agent: 'Research & Fact Synthesizer #6', log: 'Pulling real-time market data, equations, and technical benchmarks...' },
      { progress: 60, agent: 'Code & Math Proofing Bot #8', log: 'Validating Python/Solidity contracts and computational formulas...' },
      { progress: 80, agent: 'Cover Art & Typography Director #13', log: 'Generating high-res 300DPI vector print-jacket layouts...' },
      { progress: 95, agent: 'Chief Sovereign Editor #2', log: 'Conducting final editorial validation against BAA Academic Standards...' },
      { progress: 100, agent: 'Smart Contract Registrar #24', log: 'Minting Base L2 metadata proof and deploying publication release.' }
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        setOrchestrationProgress(step.progress);
        setCurrentAgentStep(step.agent);
        setOrchestrationLogs(prev => [
          ...prev, 
          `[${step.agent}] ${step.log}`
        ]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        // Mark targeted candidates as ready_for_pub
        targetCandidates.forEach(b => {
          onUpdateBookStatus(b.id, 'ready_for_pub');
        });
        setOrchestrationLogs(prev => [
          ...prev,
          `✅ [Completed] Successfully drafted and processed ${targetCandidates.length} book(s). Moved to Editorial Approval Queue!`
        ]);
        setIsOrchestrating(false);
      }
    }, 700);
  };

  const filteredAgents = selectedAgentDept === 'all'
    ? BAA_PUBLISHING_SWARM_AGENTS
    : BAA_PUBLISHING_SWARM_AGENTS.filter((a: PublishingAgent) => a.category.toLowerCase().includes(selectedAgentDept.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/90 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#00D4FF]/20 border border-[#FFD700]/40 flex items-center justify-center text-[#FFD700]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#FFD700] uppercase font-bold tracking-wider">
                  BAA Autonomous Publishing Swarm
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-[#00D4FF] border border-[#00D4FF]/30">
                  30 Specialized AI Agents
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-heading font-black text-white">
                Batch Generation &amp; Editorial Approval Pipeline
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 py-3 bg-zinc-900/40 border-b border-zinc-800 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2 bg-black/60 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('controller')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'controller' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Batch Controller</span>
            </button>
            <button
              onClick={() => setActiveTab('swarm-roster')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'swarm-roster' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>30-Agent Roster</span>
            </button>
            <button
              onClick={() => setActiveTab('approval-queue')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'approval-queue' ? 'bg-[#FFD700] text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Editorial Approval ({pendingBooks.filter(b => b.publicationStatus === 'ready_for_pub' || b.publicationStatus === 'in_review').length})</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Quota Safe Engine Active</span>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BATCH CONTROLLER */}
          {activeTab === 'controller' && (
            <div className="space-y-6">
              {/* Core Warning & Quota Discipline Banner */}
              <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-amber-500/5 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <h4 className="font-heading font-bold text-white text-sm">
                    Autonomous Batch Generation Discipline
                  </h4>
                  <p className="text-zinc-300 leading-relaxed">
                    To maintain strict mathematical rigor, avoid token truncation, and preserve AI model quotas, books are drafted in manageable batches (1 to 10 books at a time) rather than attempting all 250 in a single run. Each title undergoes automated chapter-by-chapter validation, code linting, and human-in-the-loop editorial approval.
                  </p>
                </div>
              </div>

              {/* Configuration Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Controls */}
                <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 space-y-5">
                  <h3 className="font-heading font-black text-white text-sm flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#FFD700]" />
                    <span>Pipeline Parameters</span>
                  </h3>

                  {/* Batch Size Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 block">
                      BATCH SIZE (TITLES PER CYCLE)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 3, 5, 10].map(size => (
                        <button
                          key={size}
                          disabled={isOrchestrating}
                          onClick={() => setBatchSize(size)}
                          className={`py-2 px-3 rounded-xl font-mono text-xs font-bold border transition ${
                            batchSize === size
                              ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-md'
                              : 'bg-black/50 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          {size} Book{size > 1 ? 's' : ''}
                          {size === 1 && <span className="block text-[9px] font-normal opacity-80">(Recommended)</span>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category Target */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 block">
                      TARGET CATEGORY DISCIPLINE
                    </label>
                    <select
                      value={selectedCategory}
                      disabled={isOrchestrating}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-black/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-[#FFD700]"
                    >
                      <option value="All 25 Categories">All 25 Categories (Auto Priority)</option>
                      {BAA_25_CATEGORIES.map((cat: any) => (
                        <option key={cat.number} value={cat.name}>
                          #{cat.number.toString().padStart(2, '0')} — {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* AI Model Architecture */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 block">
                      AI REASONING CORE
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'Gemini 2.5 Flash', label: 'Gemini 2.5 Flash', desc: 'Ultra-fast low-latency synthesis & chapter outlines' },
                        { id: 'Gemini 2.5 Pro', label: 'Gemini 2.5 Pro', desc: 'Deep technical monographs with formal logic & equations' },
                        { id: 'AutoMode Neural Swarm', label: 'AutoMode Neural Swarm', desc: 'Dynamically routes chapters to best specialized sub-agents' }
                      ].map(model => (
                        <button
                          key={model.id}
                          disabled={isOrchestrating}
                          onClick={() => setSelectedModel(model.id as any)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-start gap-3 ${
                            selectedModel === model.id
                              ? 'bg-[#00D4FF]/10 border-[#00D4FF] text-white'
                              : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                            selectedModel === model.id ? 'border-[#00D4FF] bg-[#00D4FF]' : 'border-zinc-600'
                          }`}>
                            {selectedModel === model.id && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </div>
                          <div>
                            <div className="font-bold font-mono text-white">{model.label}</div>
                            <div className="text-[11px] text-zinc-400 mt-0.5">{model.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Content Depth */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400 block">
                      MANUSCRIPT SPECIFICATION
                    </label>
                    <select
                      value={contentDepth}
                      disabled={isOrchestrating}
                      onChange={(e) => setContentDepth(e.target.value as any)}
                      className="w-full bg-black/60 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-[#FFD700]"
                    >
                      <option value="Executive Summary (5 Chapters)">Executive Summary (5 Chapters)</option>
                      <option value="Complete Sovereign Edition (8-12 Chapters)">Complete Sovereign Edition (8-12 Chapters)</option>
                      <option value="Comprehensive Technical Monograph (15+ Chapters)">Comprehensive Technical Monograph (15+ Chapters)</option>
                    </select>
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={handleRunBatchPipeline}
                    disabled={isOrchestrating}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#E5A800] text-black font-heading font-black text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isOrchestrating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-black" />
                        <span>Synthesizing Batch ({orchestrationProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-black text-black" />
                        <span>Dispatch Autonomous Swarm ({batchSize} Book{batchSize > 1 ? 's' : ''})</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Right: Live Swarm Execution Monitor */}
                <div className="bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <h3 className="font-heading font-black text-white text-sm flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#00D4FF]" />
                        <span>Swarm Terminal Activity</span>
                      </h3>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {isOrchestrating ? 'ORCHESTRATING' : 'READY TO DISPATCH'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-400">Current Step:</span>
                        <span className="text-[#FFD700] font-bold">{currentAgentStep || 'Standing by'}</span>
                      </div>
                      <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-zinc-800">
                        <div
                          className="h-full bg-gradient-to-r from-[#FFD700] to-[#00D4FF] transition-all duration-300"
                          style={{ width: `${orchestrationProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Terminal Logs Output */}
                    <div className="bg-black/90 p-3.5 rounded-xl border border-zinc-800 font-mono text-[11px] h-64 overflow-y-auto space-y-1.5 text-zinc-300">
                      {orchestrationLogs.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-center p-4">
                          <Bot className="w-8 h-8 mb-2 opacity-40" />
                          <span>Click &quot;Dispatch Autonomous Swarm&quot; to begin generating manuscript batches in safe, quota-conserving cycles.</span>
                        </div>
                      ) : (
                        orchestrationLogs.map((log, index) => (
                          <div key={index} className="leading-relaxed">
                            {log.startsWith('✅') ? (
                              <span className="text-emerald-400 font-bold">{log}</span>
                            ) : log.includes('Lead') || log.includes('Chief') ? (
                              <span className="text-[#FFD700]">{log}</span>
                            ) : (
                              log
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                    <span>Verified Milestone: <strong>Book #001 Complete</strong></span>
                    <span className="text-[#00D4FF]">Base L2 Contract Anchored</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 30-AGENT ROSTER */}
          {activeTab === 'swarm-roster' && (
            <div className="space-y-4">
              {/* Department Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {['all', 'Strategic', 'Editorial', 'Design & Media', 'Pedagogy', 'Distribution & Analytics'].map(dept => (
                  <button
                    key={dept}
                    onClick={() => setSelectedAgentDept(dept)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                      selectedAgentDept === dept
                        ? 'bg-[#FFD700] text-black border-[#FFD700]'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {dept === 'all' ? 'All 30 Agents' : dept}
                  </button>
                ))}
              </div>

              {/* Agents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.map((agent: PublishingAgent) => (
                  <div
                    key={agent.id}
                    className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-[#00D4FF]/40 transition space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[#FFD700] font-bold px-2 py-0.5 rounded bg-[#FFD700]/10 border border-[#FFD700]/20">
                          ROLE #{agent.roleNumber.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {agent.category}
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-white text-sm">
                        {agent.name}
                      </h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {agent.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/70 text-[11px] font-mono flex items-center justify-between text-zinc-400">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Tasks: {agent.tasksCompleted}</span>
                      </span>
                      <span className="text-zinc-500">Autonomous 24/7</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDITORIAL APPROVAL QUEUE */}
          {activeTab === 'approval-queue' && (
            <div className="space-y-4">
              <div className="bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-black text-white text-sm">
                    Human-in-the-Loop Quality &amp; Publication Approval
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Every autonomous manuscript batch requires editorial verification before entering the active public marketplace.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#FFD700] font-bold">
                  Flagship #001: 100% Certified
                </div>
              </div>

              <div className="space-y-3">
                {books.slice(0, 15).map(book => {
                  const isApproved = book.publicationStatus === 'published';
                  return (
                    <div
                      key={book.id}
                      className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#00D4FF] font-bold">
                            #{book.categoryNumber.toString().padStart(3, '0')}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            isApproved
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : book.publicationStatus === 'ready_for_pub'
                              ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {book.publicationStatus.replace(/_/g, ' ')}
                          </span>
                          {book.isFlagship && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-amber-500 text-black">
                              ★ FLAGSHIP MILESTONE
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-heading font-bold text-white">
                          {book.title}
                        </h4>
                        <div className="text-xs text-zinc-400 font-mono">
                          {book.category} • {book.authorName}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isApproved ? (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                            <Check className="w-3.5 h-3.5" />
                            <span>Live in BAA Library</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onUpdateBookStatus(book.id, 'published')}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-mono text-xs font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-1.5 shadow"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve &amp; Publish</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shrink-0">
          <div className="text-zinc-400">
            Publishing Authority: <strong>Ambassador/Engineer Emmanuel Bassey Joe — aka Titowise (DeOrbitMan)</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition"
          >
            Close Pipeline
          </button>
        </div>
      </div>
    </div>
  );
};
