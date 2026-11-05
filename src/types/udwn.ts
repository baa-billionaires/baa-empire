// Types and interfaces for the Universal Device Wealth Network (UDWN)

export type NodeCategory = 'personal' | 'student' | 'community' | 'institutional';

export type DeviceHardwareType =
  | 'android_phone'
  | 'ios_phone'
  | 'laptop'
  | 'desktop'
  | 'workstation_gpu'
  | 'smart_tv'
  | 'edge_mini_pc'
  | 'server_cluster';

export type WorkloadPermission =
  | 'ai_inference'
  | 'ai_evaluation'
  | 'rendering_3d'
  | 'video_transcode'
  | 'scientific_research'
  | 'data_processing'
  | 'edge_iot'
  | 'enterprise_contract'
  | 'distributed_storage'
  | 'blockchain_infrastructure';

export interface DeviceHardwareSpecs {
  cpuCores: number;
  cpuModel?: string;
  ramGb: number;
  gpuRenderer?: string;
  hasWebGpu: boolean;
  hasWebGL: boolean;
  batteryLevel?: number;
  isCharging?: boolean;
  networkDownlinkMbps?: number;
  estimatedLatencyMs?: number;
  osName: string;
  screenResolution?: string;
}

export interface DeviceResourceLimits {
  cpuLimitPercent: number; // 20 - 90%
  gpuLimitPercent: number; // 20 - 90%
  memoryLimitGb: number;
  onlyWhileCharging: boolean;
  minBatteryPercent: number; // e.g. 50%
  maxTemperatureCelsius: number; // e.g. 45°C
  maxBandwidthMbPerHour: number;
}

export interface DeviceWealthScoreBreakdown {
  overallScore: number; // 0 - 100
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Institutional Sovereign';
  availableCapacityScore: number;
  completedWorkloadsScore: number;
  reliabilityUptimeScore: number;
  energyEfficiencyScore: number;
  jobQualityScore: number;
  contributionHistoryScore: number;
  netEarningsFactor: number;
}

export interface RegisteredDevice {
  id: string;
  name: string;
  category: NodeCategory;
  hardwareType: DeviceHardwareType;
  specs: DeviceHardwareSpecs;
  limits: DeviceResourceLimits;
  permittedWorkloads: WorkloadPermission[];
  status: 'active' | 'paused' | 'benchmarking' | 'disconnected';
  isCurrentDevice: boolean;
  benchmarkScore?: number;
  benchmarkFlopsGiga?: number;
  lastHeartbeat: string;
  connectedAt: string;
  totalCompletedJobs: number;
  totalActiveHours: number;
  wealthScore: DeviceWealthScoreBreakdown;
  ipLocation?: {
    city: string;
    country: string;
    flag: string;
  };
  smartTvMode?: 'dashboard_terminal' | 'network_discovery' | 'companion_control' | 'lightweight_relay';
}

export interface AutonomousColonyAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'active' | 'optimizing' | 'idle' | 'awaiting_approval';
  autonomyLevel: 'Full Autonomous' | 'Human Oversight Required';
  verifiedActionsToday: number;
  lastHandshakeTimestamp: string;
  currentTask?: string;
  iconName: string;
}

export interface PaidWorkloadJob {
  id: string;
  customerName: string;
  customerOrg: string;
  category: WorkloadPermission;
  title: string;
  description: string;
  totalComputeUnits: string;
  requiredHardware: DeviceHardwareType[];
  customerGrossPayment: number; // in USD
  operatingExpenses: number; // electricity / cloud relays
  platformFee: number; // BAA protocol reserve
  participantNetShare: number; // What the device owner receives
  durationMinutes: number;
  status: 'open' | 'matching' | 'in_progress' | 'verifying' | 'completed' | 'settled';
  assignedDeviceId?: string;
  verificationHash?: string;
  createdAt: string;
  completedAt?: string;
}

export interface RevenueLedgerSummary {
  estimatedEarningPotentialUsd: number;
  pendingWorkloadPaymentsUsd: number;
  confirmedCustomerRevenueUsd: number;
  participantNetEarningsUsd: number;
  participantNetEarningsBaa: number;
  platformFeesUsd: number;
  operatingCostsUsd: number;
  withdrawableBalanceUsd: number;
  withdrawableBalanceNgn: number;
  totalPayoutsCompletedUsd: number;
}

export interface PayoutTransactionRecord {
  id: string;
  amountUsd: number;
  amountNgn: number;
  method: 'paystack_bank' | 'baacoin_wallet' | 'usdc_base';
  accountDetails: string;
  reference: string;
  status: 'pending' | 'processing' | 'settled' | 'failed';
  timestamp: string;
  reconciliationId: string;
}
