import { RegisteredDevice, WorkloadPermission, NodeCategory, DeviceHardwareType } from './udwn';

export type VerificationShieldLevel = 
  | 'tier1_local_attested'
  | 'tier2_matrix_verified'
  | 'tier3_cryptographic_node'
  | 'tier4_sovereign_institutional';

export interface VerificationShield {
  level: VerificationShieldLevel;
  badgeTitle: string;
  badgeCode: string;
  issuingAuthority: string;
  auditHash: string;
  verifiedAt: string;
  expiresAt: string;
  isTamperProof: boolean;
  score: number; // 0 - 100
  securityFeatures: string[];
}

export interface ContributionHistoryEntry {
  id: string;
  timestamp: string;
  jobName: string;
  category: WorkloadPermission;
  durationMinutes: number;
  computeCyclesGigaFlops: number;
  verificationSignature: string;
  rewardBaa: number;
  rewardUsd: number;
  status: 'verified' | 'auditing' | 'settled';
}

export interface HardwarePassportProfile {
  deviceModel: string;
  osArchitecture: string;
  cpuModel: string;
  physicalCores: number;
  logicalThreads: number;
  memoryGb: number;
  memoryBandwidthGbps?: number;
  gpuRenderer: string;
  gpuVendor: string;
  webGlSupported: boolean;
  webGpuSupported: boolean;
  thermalEfficiencyRating: 'A+' | 'A' | 'B' | 'C';
  batteryPowerProfile: 'Mains AC Constant' | 'Battery Guarded' | 'Solar Edge Microgrid';
  networkDownlinkMbps: number;
  networkLatencyMs: number;
  provenFlopsTFLOPS: number;
}

export interface UniversalComputePassportData {
  passportId: string;
  passportNumber: string;
  deviceId: string;
  deviceName: string;
  nodeCategory: NodeCategory;
  hardwareType: DeviceHardwareType;
  issuedTo: string;
  registrationDate: string;
  lastAttestationDate: string;
  status: 'active_valid' | 'renewal_due' | 'suspended';
  shield: VerificationShield;
  profile: HardwarePassportProfile;
  totalJobsVerified: number;
  totalUptimeHours: number;
  cumulativeTFlopsHours: number;
  totalEarningsUsd: number;
  totalEarningsBaa: number;
  blockchainRegistry: {
    network: 'Base L2' | 'Ethereum Mainnet' | 'Solana Node Ledger';
    contractAddress: string;
    tokenId: string;
    txHash: string;
    qrTokenData: string;
  };
  contributionHistory: ContributionHistoryEntry[];
}

export interface UaaigGlobalNode {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  tier: 'hyperscale' | 'sovereign_hub' | 'university_cluster' | 'enterprise_gpu' | 'edge_federation';
  activeNodesCount: number;
  currentTFlops: number;
  pueEfficiency: number;
  powerSource: '100% Geothermal' | 'Hydroelectric' | 'Solar + Microgrid' | 'Nuclear' | 'Hybrid Grid';
  latencyMs: number;
  currentWorkload: string;
  status: 'optimal' | 'high_demand' | 'maintenance';
}

export interface ByodcStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  protocol: string;
  iconName: string;
  exampleCommand: string;
  verificationCheck: string;
}

export interface ComputeMarketOrderBook {
  marketId: string;
  name: string;
  category: string;
  description: string;
  unitPriceUsdPerHour: number;
  activeJobs: number;
  availableCapacityTFlops: number;
  fillRatePercent: number;
  recommendedHardware: string;
  settlementSpeed: string;
}

export interface AutonomousGridAgent18 {
  id: string;
  name: string;
  callsign: string;
  domain: string;
  avatarIcon: string;
  badgeColor: string;
  description: string;
  activeHandshakes: number;
  status: 'active' | 'syncing' | 'optimizing';
  lastTelemetryLog: string;
}
