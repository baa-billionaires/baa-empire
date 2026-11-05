export type CeColonyId =
  | 'compute'
  | 'connectivity'
  | 'data_refinery'
  | 'ghost_engineer'
  | 'repair_intelligence'
  | 'hardware_exchange'
  | 'network_services'
  | 'skill_licensing'
  | 'managed_it'
  | 'edge_ai'
  | 'research_innovation'
  | 'engineer_opportunity';

export interface CeColonyMeta {
  id: CeColonyId;
  orderNumber: number;
  name: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  badge: string;
  revenueModel: string;
  targetParticipants: string;
  primaryMetric: {
    label: string;
    value: string;
    change: string;
  };
  features: string[];
}

export interface EngineerNode {
  id: string;
  shopName: string;
  engineerName: string;
  location: string;
  nodeType: 'workstation_cluster' | 'repair_lab_bench' | 'network_edge_router' | 'laptop_portable' | 'server_rack';
  cpuModel: string;
  ramGb: number;
  gpuModel: string;
  storageGb: number;
  bandwidthMbps: number;
  ollamaRuntimeActive: boolean;
  rayWorkerActive: boolean;
  status: 'online' | 'busy' | 'standby' | 'paused' | 'offline';
  activeColonies: CeColonyId[];
  benchmarkScore: number;
  temperatureCelsius: number;
  powerLimitWatts: number;
  totalJobsCompleted: number;
  uptimePercent: number;
  registeredAt: string;
  lastHeartbeat: string;
}

export interface ComputeJob {
  id: string;
  colonyId: CeColonyId;
  title: string;
  customer: string;
  category: 'llm_inference' | 'rendering_3d' | 'audio_transcribe' | 'code_compilation' | 'model_fine_tune';
  workloadModel: string;
  durationSeconds: number;
  grossRevenueUsd: number;
  engineerShareUsd: number;
  platformShareUsd: number;
  status: 'available' | 'running' | 'completed' | 'settled';
  assignedNodeId?: string;
  verificationHash?: string;
  sandboxed: boolean;
  timestamp: string;
}

export interface ConnectivityProbe {
  id: string;
  targetHost: string;
  targetLabel: string;
  latencyMs: number;
  packetLossPercent: number;
  jitterMs: number;
  bandwidthDownMbps: number;
  ispName: string;
  status: 'optimal' | 'congested' | 'degraded' | 'outage';
  region: string;
  lastChecked: string;
}

export interface DataRefineryJob {
  id: string;
  customerName: string;
  documentType: 'physical_receipt' | 'repair_logbook' | 'vendor_invoice' | 'service_waybill';
  pageCount: number;
  extractedFields: Record<string, any>;
  piiSanitized: boolean;
  consentSigned: boolean;
  grossFeeUsd: number;
  engineerNetUsd: number;
  status: 'extracted' | 'verified' | 'exported';
  timestamp: string;
}

export interface GhostSkillProcedure {
  id: string;
  title: string;
  category: 'motherboard_repair' | 'bga_soldering' | 'power_rail' | 'bios_recovery' | 'network_vlan';
  authorName: string;
  authorShop: string;
  deviceTarget: string;
  difficulty: 'intermediate' | 'advanced' | 'master';
  steps: string[];
  diagnosticTriggers: string[];
  audioTranscriptSnippet: string;
  totalQueries: number;
  rating: number;
  royaltyRatePerQueryUsd: number;
  totalRoyaltiesEarnedUsd: number;
}

export interface RepairDiagnosisCase {
  id: string;
  customerDevice: string;
  symptom: string;
  errorCodes: string[];
  aiAnalysis: string;
  probabilityBreakdown: { component: string; probability: number }[];
  suggestedSteps: string[];
  estimatedPartsCostUsd: number;
  estimatedLaborCostUsd: number;
  turnaroundHours: number;
  quotationStatus: 'draft' | 'quote_sent' | 'client_approved' | 'repair_in_progress' | 'completed';
}

export interface HardwareListing {
  id: string;
  title: string;
  category: 'gpu' | 'laptop' | 'ram' | 'server' | 'networking' | 'spare_parts';
  condition: 'refurbished_tested' | 'new_oem' | 'salvage_tested';
  priceUsd: number;
  priceNgn: number;
  benchmarkScore: number;
  warrantyDays: number;
  verifiedPassportHash: string;
  sellerShopName: string;
  sellerLocation: string;
  stockCount: number;
  specsSummary: string;
}

export interface ManagedItEndpoint {
  id: string;
  clientOrganization: string;
  endpointName: string;
  osType: string;
  healthScore: number;
  patchStatus: 'up_to_date' | 'patches_pending' | 'critical_cve_alert';
  backupStatus: 'verified_today' | 'backup_in_progress' | 'backup_warning';
  monthlyFeeUsd: number;
  lastTelemetry: string;
}

export interface EdgeApplianceDeployment {
  id: string;
  clientOrg: string;
  facilityType: 'clinic_hospital' | 'law_firm' | 'secondary_school' | 'microfinance_bank';
  applianceHardware: string;
  localModelName: string;
  onPremDocumentsIndexed: number;
  avgQueryLatencyMs: number;
  slaUptimePercent: number;
  monthlyRetainerUsd: number;
  status: 'online_isolated' | 'syncing';
}

export interface ResearchInnovationBounty {
  id: string;
  title: string;
  sponsor: string;
  rewardUsd: number;
  category: 'reverse_engineering' | 'custom_tester' | 'cooling_hack' | 'firmware_patch';
  deadline: string;
  submissionsCount: number;
  specRequirement: string;
}

export interface OpportunityTender {
  id: string;
  title: string;
  client: string;
  budgetUsd: number;
  budgetNgn: number;
  location: string;
  deadline: string;
  proposalsCount: number;
  scopeSummary: string;
  requiredCertifications: string[];
}

export interface CeLedgerEntry {
  id: string;
  colonyId: CeColonyId;
  title: string;
  customer: string;
  nodeId: string;
  grossPaymentUsd: number;
  engineerNetUsd: number;
  platformShareUsd: number;
  status: 'settled' | 'pending';
  txHash: string;
  timestamp: string;
}

export interface CeOrchestratorState {
  status: 'active' | 'optimizing' | 'idle';
  activeSubAgents: number;
  lastOptimizationCycle: string;
  dispatchedJobsLast24h: number;
  queuedJobs: number;
  matchedNodeRatePercent: number;
  averageHourlyRevenueUsd: number;
  recommendations: string[];
}

export interface CeColonyState {
  version: string;
  name: string;
  initializedAt: string;
  config: {
    dataDir: string;
    paystackMode: string;
    engineerRevenueSplitPercent: number;
    platformSplitPercent: number;
    adminEmail: string;
  };
  nodes: EngineerNode[];
  orchestrator: CeOrchestratorState;
  ledger: {
    totalGrossRevenueUsd: number;
    totalEngineerEarningsUsd: number;
    totalPlatformShareUsd: number;
    totalWithdrawnUsd: number;
    currentPendingBalanceUsd: number;
    currentPendingBalanceNgn: number;
    currencyRateNgnPerUsd: number;
    entries: CeLedgerEntry[];
  };
  coloniesSummary: Record<CeColonyId, Record<string, any>>;
}
