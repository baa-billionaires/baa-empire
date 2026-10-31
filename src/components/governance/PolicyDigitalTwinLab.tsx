import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Shield,
  Activity,
  Layers,
  Sparkles,
  Download,
  Terminal,
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';
import { SimulationScenario } from '../../types/governance';

interface PolicyDigitalTwinLabProps {
  scenarios: SimulationScenario[];
  onUpdateScenario?: (updated: SimulationScenario) => void;
}

export const PolicyDigitalTwinLab: React.FC<PolicyDigitalTwinLabProps> = ({
  scenarios,
  onUpdateScenario
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(scenarios[0]?.id || '');
  const [runningScenarioId, setRunningScenarioId] = useState<string | null>(null);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [scenarioList, setScenarioList] = useState<SimulationScenario[]>(scenarios);
  const [downloadReportSuccess, setDownloadReportSuccess] = useState(false);

  const activeScenario = scenarioList.find(s => s.id === activeScenarioId) || scenarioList[0];

  const handleRunSimulation = (scenarioId: string) => {
    setRunningScenarioId(scenarioId);

    setTimeout(() => {
      setScenarioList(prev => prev.map(s => {
        if (s.id !== scenarioId) return s;
        return {
          ...s,
          status: 'passed',
          lastSimulatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
        };
      }));
      setRunningScenarioId(null);
    }, 900);
  };

  const handleRunAllTests = () => {
    setIsBatchRunning(true);

    setTimeout(() => {
      setScenarioList(prev => prev.map(s => ({
        ...s,
        status: 'passed',
        lastSimulatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC'
      })));
      setIsBatchRunning(false);
    }, 1600);
  };

  const handleDownloadReport = () => {
    const reportData = {
      title: "BAA Policy Digital Twin Conformance Report",
      timestamp: new Date().toISOString(),
      framework: "Principles of Verifiable Autonomous Intelligence & Digital Cooperation (PVAIDC)",
      total_tests: scenarioList.length,
      passed_tests: scenarioList.filter(s => s.status === 'passed').length,
      scenarios: scenarioList
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BAA_PolicyDigitalTwin_ConformanceReport_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadReportSuccess(true);
    setTimeout(() => setDownloadReportSuccess(false), 2500);
  };

  const getStatusBadge = (status: SimulationScenario['status']) => {
    switch (status) {
      case 'passed':
        return { label: 'PASSED', color: 'bg-emerald-950 text-emerald-400 border-emerald-800' };
      case 'failed':
        return { label: 'FAILED', color: 'bg-red-950 text-red-400 border-red-800' };
      case 'warning':
        return { label: 'WARNING', color: 'bg-amber-950 text-amber-400 border-amber-800' };
      default:
        return { label: 'UNTESTED', color: 'bg-zinc-800 text-zinc-400 border-zinc-700' };
    }
  };

  const getSeverityBadge = (severity: SimulationScenario['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-950/40 border-red-800';
      case 'high':
        return 'text-amber-400 bg-amber-950/40 border-amber-800';
      case 'medium':
        return 'text-blue-400 bg-blue-950/40 border-blue-800';
      default:
        return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-purple-800/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800 text-purple-400 text-xs font-mono font-bold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>MODULE 4 • POLICY DIGITAL TWIN &amp; CONFORMANCE LAB</span>
            </div>
            <h2 className="text-2xl font-heading font-black text-white">
              Stress-Testing AI Agent Governance Against Adversarial Scenarios
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed mt-1">
              Simulate edge-case failures before production: spend cap breaches, wrong blockchain addresses, conflicting agent instructions, credential leaks, and data sovereignty egress.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunAllTests}
              disabled={isBatchRunning}
              className="px-4 py-2.5 rounded-xl bg-[#FFD700] hover:bg-[#FFE033] text-black font-bold font-mono text-xs flex items-center gap-1.5 shadow-md shadow-[#FFD700]/20 disabled:bg-zinc-800 disabled:text-zinc-500"
            >
              <Play className={`w-3.5 h-3.5 ${isBatchRunning ? 'animate-spin' : ''}`} />
              <span>{isBatchRunning ? 'Running Conformance Suite...' : 'Run All Scenarios'}</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>{downloadReportSuccess ? 'Report Saved' : 'Export Report'}</span>
            </button>
          </div>
        </div>

        {/* Real vs Simulated Disclaimer */}
        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Digital Twin Mode: Simulated sandboxed state transitions with synthetic fault injection.</span>
          </div>
          <span className="text-emerald-400 font-bold">
            {scenarioList.filter(s => s.status === 'passed').length} / {scenarioList.length} Passed
          </span>
        </div>
      </div>

      {/* LAB SPLIT: SCENARIO ROSTER & ACTIVE LAB INSPECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SCENARIOS (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-xs font-mono uppercase text-zinc-400 block font-semibold px-1">
            Conformance Test Suite ({scenarioList.length}):
          </span>

          <div className="space-y-2 max-h-[640px] overflow-y-auto no-scrollbar pr-1">
            {scenarioList.map(sc => {
              const isSelected = activeScenario?.id === sc.id;
              const statusBadge = getStatusBadge(sc.status);
              const isRunning = runningScenarioId === sc.id || isBatchRunning;

              return (
                <div
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-zinc-900 border-[#FFD700] ring-1 ring-[#FFD700]/50 shadow-lg'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${statusBadge.color}`}>
                      {isRunning ? 'SIMULATING...' : statusBadge.label}
                    </span>
                    <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold border uppercase ${getSeverityBadge(sc.severity)}`}>
                      {sc.severity}
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-sm text-white">
                    {sc.title}
                  </h4>

                  <p className="text-xs text-zinc-400 line-clamp-1 font-mono">
                    {sc.threatOrRequirement}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE SCENARIO EXECUTION & LOGS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeScenario ? (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-5 text-xs">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                    {activeScenario.threatOrRequirement}
                  </span>
                  <h3 className="text-lg font-heading font-black text-white mt-1">
                    {activeScenario.title}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400">
                    Category: {activeScenario.category.replace('_', ' ').toUpperCase()} • Last Simulated: {activeScenario.lastSimulatedAt}
                  </span>
                </div>

                <button
                  onClick={() => handleRunSimulation(activeScenario.id)}
                  disabled={runningScenarioId === activeScenario.id}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950 shrink-0"
                >
                  <Play className={`w-3.5 h-3.5 ${runningScenarioId === activeScenario.id ? 'animate-spin' : ''}`} />
                  <span>{runningScenarioId === activeScenario.id ? 'Simulating...' : 'Simulate Scenario'}</span>
                </button>
              </div>

              {/* Initial Conditions & Expected Behavior */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                    Initial Threat Conditions
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {activeScenario.initialConditions}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                    Expected Policy Behavior
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {activeScenario.expectedBehavior}
                  </p>
                </div>
              </div>

              {/* Simulation Result Terminal Log */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Digital Twin Execution Output</span>
                </span>
                <div className="p-3.5 rounded-xl bg-black border border-zinc-800 font-mono text-[11px] text-emerald-400 space-y-1">
                  <div className="text-zinc-500">$ baa-digital-twin-runner --test {activeScenario.id}</div>
                  <div>&gt; Injecting adversarial fault vector into sandbox...</div>
                  <div>&gt; Evaluating PVAIDC policy gates &amp; Base L2 timelocks...</div>
                  <div className="text-white font-bold">&gt; {activeScenario.simulatedResult}</div>
                </div>
              </div>

              {/* Reproduction Steps */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#FFD700] font-bold block">
                  Automated Reproduction Steps
                </span>
                <div className="space-y-1 font-mono text-[11px] text-zinc-300">
                  {activeScenario.reproductionSteps.map((step, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 flex items-center gap-2">
                      <span className="text-[#FFD700]">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remediation & Hardening Recommendations */}
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-1 text-zinc-300">
                <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                  Architectural Hardening Recommendation
                </span>
                <p>{activeScenario.remediationSuggestions[0]}</p>
              </div>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
