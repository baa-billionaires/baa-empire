import React, { useState, useEffect } from 'react';
import {
  Scale,
  Sparkles,
  Globe,
  Code,
  Activity,
  Award,
  Users,
  BookOpen,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sliders,
  CheckCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import {
  PolicyRecord,
  PVAIDCPrinciple,
  AgentConstitution,
  SimulationScenario,
  ResearchPaper,
  TrustPassport
} from '../types/governance';
import {
  INITIAL_POLICY_RECORDS,
  INITIAL_PVAIDC_PRINCIPLES,
  INITIAL_CONSTITUTIONS,
  INITIAL_SIMULATION_SCENARIOS,
  INITIAL_RESEARCH_PAPERS,
  INITIAL_TRUST_PASSPORTS,
  loadGovernanceData,
  saveGovernanceData
} from '../lib/governanceService';

import { PolicyObservatory } from '../components/governance/PolicyObservatory';
import { PrincipleForgeLab } from '../components/governance/PrincipleForgeLab';
import { AgentConstitutionCompiler } from '../components/governance/AgentConstitutionCompiler';
import { PolicyDigitalTwinLab } from '../components/governance/PolicyDigitalTwinLab';
import { TrustPassportViewer } from '../components/governance/TrustPassportViewer';
import { ResearchCollaborationNetwork } from '../components/governance/ResearchCollaborationNetwork';
import { PolicyToMarketplaceBridge } from '../components/governance/PolicyToMarketplaceBridge';

interface GlobalGovernanceInstitutePageProps {
  onNavigate?: (page: string) => void;
}

export const GlobalGovernanceInstitutePage: React.FC<GlobalGovernanceInstitutePageProps> = ({
  onNavigate
}) => {
  // Persistent States
  const [policies, setPolicies] = useState<PolicyRecord[]>(() =>
    loadGovernanceData('policies', INITIAL_POLICY_RECORDS)
  );
  const [principles] = useState<PVAIDCPrinciple[]>(INITIAL_PVAIDC_PRINCIPLES);
  const [constitutions, setConstitutions] = useState<AgentConstitution[]>(() =>
    loadGovernanceData('constitutions', INITIAL_CONSTITUTIONS)
  );
  const [scenarios, setScenarios] = useState<SimulationScenario[]>(() =>
    loadGovernanceData('scenarios', INITIAL_SIMULATION_SCENARIOS)
  );
  const [papers] = useState<ResearchPaper[]>(INITIAL_RESEARCH_PAPERS);
  const [passports] = useState<TrustPassport[]>(INITIAL_TRUST_PASSPORTS);

  // Active Division Module Tab
  const [activeTab, setActiveTab] = useState<
    'observatory' | 'principleforge' | 'compiler' | 'digital_twin' | 'passport' | 'research' | 'marketplace'
  >('principleforge');

  // Save states
  useEffect(() => { saveGovernanceData('policies', policies); }, [policies]);
  useEffect(() => { saveGovernanceData('constitutions', constitutions); }, [constitutions]);
  useEffect(() => { saveGovernanceData('scenarios', scenarios); }, [scenarios]);

  const handleSaveConstitution = (newConst: AgentConstitution) => {
    setConstitutions(prev => [newConst, ...prev.filter(c => c.id !== newConst.id)]);
  };

  const handleSendToDigitalTwin = (constItem: AgentConstitution) => {
    setActiveTab('digital_twin');
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP INSTITUTIONAL HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-[#FFD700]/40 p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 text-[#FFD700] text-xs font-mono font-bold">
                <Scale className="w-3.5 h-3.5" />
                <span>BAA INTERNATIONAL INSTITUTE FOR AI, BLOCKCHAIN &amp; WEB3 POLICY, PRINCIPLES AND PROTOCOLS</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-400">PVAIDC v1.4 • Live Research Lab</span>
              </div>
            </div>

            <div className="space-y-2 max-w-4xl">
              <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight leading-tight">
                From AI Principles to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#00D4FF]">New Operating System</span> for Trustworthy Autonomous Intelligence
              </h1>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Connect AI governance, autonomous multi-agent systems, blockchain verification, and machine-to-machine commerce. Discover emerging international policies, compile machine-enforceable agent constitutions, and stress-test rules in an empirical digital twin laboratory.
              </p>
            </div>

            {/* Flagship Core Cycle Indicator */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono">
              <span className="text-zinc-500 uppercase font-bold">Flagship Cycle:</span>
              <button
                onClick={() => setActiveTab('principleforge')}
                className={`px-3 py-1 rounded-lg border transition flex items-center gap-1.5 ${
                  activeTab === 'principleforge'
                    ? 'bg-[#FFD700] text-black font-bold border-[#FFD700]'
                    : 'bg-zinc-950 text-[#FFD700] border-[#FFD700]/30 hover:bg-zinc-900'
                }`}
              >
                <span>1. Discover Principles</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => setActiveTab('compiler')}
                className={`px-3 py-1 rounded-lg border transition flex items-center gap-1.5 ${
                  activeTab === 'compiler'
                    ? 'bg-cyan-500 text-black font-bold border-cyan-500'
                    : 'bg-zinc-950 text-cyan-400 border-cyan-800 hover:bg-zinc-900'
                }`}
              >
                <span>2. Compile Constitutions</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => setActiveTab('digital_twin')}
                className={`px-3 py-1 rounded-lg border transition flex items-center gap-1.5 ${
                  activeTab === 'digital_twin'
                    ? 'bg-purple-500 text-white font-bold border-purple-500'
                    : 'bg-zinc-950 text-purple-400 border-purple-800 hover:bg-zinc-900'
                }`}
              >
                <span>3. Stress-Test in Digital Twin</span>
              </button>
            </div>
          </div>
        </div>

        {/* PRIMARY DIVISION NAVIGATION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-zinc-800 pb-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('principleforge')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'principleforge'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>PrincipleForge (PVAIDC)</span>
            <span className={`text-[10px] font-mono px-1 rounded ${activeTab === 'principleforge' ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
              12
            </span>
          </button>

          <button
            onClick={() => setActiveTab('compiler')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'compiler'
                ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Constitution Compiler</span>
          </button>

          <button
            onClick={() => setActiveTab('digital_twin')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'digital_twin'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Policy Digital Twin Lab</span>
            <span className={`text-[10px] font-mono px-1 rounded ${activeTab === 'digital_twin' ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
              {scenarios.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('observatory')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'observatory'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Policy Observatory</span>
            <span className={`text-[10px] font-mono px-1 rounded ${activeTab === 'observatory' ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'}`}>
              {policies.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'passport'
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Trust Passport (W3C VC 2.0)</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'research'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Standards &amp; Research Network</span>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'marketplace'
                ? 'bg-[#FFD700] text-black shadow-md shadow-[#FFD700]/20'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Policy-to-Marketplace Bridge</span>
          </button>
        </div>

        {/* ACTIVE MODULE VIEW */}
        {activeTab === 'principleforge' && (
          <PrincipleForgeLab
            principles={principles}
            onSelectForConstitution={(principle) => {
              setActiveTab('compiler');
            }}
          />
        )}

        {activeTab === 'compiler' && (
          <AgentConstitutionCompiler
            constitutions={constitutions}
            onSaveConstitution={handleSaveConstitution}
            onSendToDigitalTwin={handleSendToDigitalTwin}
          />
        )}

        {activeTab === 'digital_twin' && (
          <PolicyDigitalTwinLab
            scenarios={scenarios}
            onUpdateScenario={(updated) => {
              setScenarios(prev => prev.map(s => s.id === updated.id ? updated : s));
            }}
          />
        )}

        {activeTab === 'observatory' && (
          <PolicyObservatory
            policies={policies}
            onSelectPolicyForAudit={(p) => {
              setActiveTab('compiler');
            }}
            onSelectForCourseBridge={(p) => {
              setActiveTab('marketplace');
            }}
          />
        )}

        {activeTab === 'passport' && (
          <TrustPassportViewer
            passports={passports}
          />
        )}

        {activeTab === 'research' && (
          <ResearchCollaborationNetwork
            papers={papers}
          />
        )}

        {activeTab === 'marketplace' && (
          <PolicyToMarketplaceBridge
            onNavigateToDealRoom={() => onNavigate && onNavigate('deal-room')}
            onNavigateToAcademy={() => onNavigate && onNavigate('academy')}
          />
        )}

      </div>
    </div>
  );
};
