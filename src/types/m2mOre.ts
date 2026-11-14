export type M2MWorkspaceId =
  | 'overview'
  | 'registry'
  | 'deploy-mother'
  | 'genealogy'
  | 'colonies'
  | 'job-board'
  | 'marketplace'
  | 'contracts'
  | 'ledger'
  | 'royalties'
  | 'ai-to-ai'
  | 'robot-miners'
  | 'discovery'
  | 'reputation'
  | 'economic-intel'
  | 'passports'
  | 'evolution'
  | 'resurrection'
  | 'acquisition'
  | 'workforce'
  | 'approvals'
  | 'security'
  | 'analytics'
  | 'settings';

export type MachineCategory =
  | 'Mother Bot'
  | 'Child Bot'
  | 'AI Agent Machine'
  | 'Robot Miner'
  | 'IoT Device'
  | 'Compute Machine'
  | 'Storage Machine'
  | 'Network Machine'
  | 'Sensor Machine'
  | 'Software Service Machine'
  | 'Industrial Robot'
  | 'Digital Twin'
  | 'Living Application Agent';

export type MachineOperationalStatus =
  | 'registered'
  | 'pending_verification'
  | 'online'
  | 'idle'
  | 'working'
  | 'busy'
  | 'breeding_requested'
  | 'scaling'
  | 'paused'
  | 'offline'
  | 'suspended'
  | 'failed'
  | 'retired';

export type GovernanceLevel = 1 | 2 | 3 | 4 | 5;

export type JobLifecycleStatus =
  | 'DISCOVERED'
  | 'VALIDATED'
  | 'OFFERED'
  | 'ACCEPTED'
  | 'FUNDED'
  | 'ASSIGNED'
  | 'EXECUTING'
  | 'SUBMITTED'
  | 'VERIFIED'
  | 'APPROVED'
  | 'SETTLED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'DISPUTED'
  | 'FAILED'
  | 'REFUNDED'
  | 'REVERSED';

export type PaymentAssetType = 'FIAT_USD' | 'FIAT_NGN' | 'PLATFORM_CREDIT' | 'IDEA_COIN' | 'USDC';

export interface MachineDigitalPassport {
  passportSerial: string;
  machineId: string;
  ownerEmail: string;
  softwareVersion: string;
  hardwareSpecs: string;
  certifications: string[];
  authorizedDataPermissions: string[];
  slaTargetAvailabilityPct: number;
  slaMaxResponseSec: number;
  securityStatus: 'compliant' | 'review_required' | 'suspended';
  verificationHash: string;
  issuedAt: string;
  lastVerifiedAt: string;
  maintenanceHistory: string[];
}

export interface M2MMachine {
  id: string;
  machineCode: string;
  ownerId: string;
  ownerEmail: string;
  name: string;
  category: MachineCategory;
  machineType: string;
  specialization: string;
  purpose: string;
  parentMachineId: string | null;
  colonyId: string | null;
  capabilities: string[];
  authorizedOperations: string[];
  apiIdentity: string;
  economicAccountId: string;
  reputationScore: number;
  reliabilityRating: number;
  verificationStatus: 'pending_verification' | 'verified' | 'certified' | 'revoked';
  availableResources: string;
  currentWorkloadPct: number;
  operationalStatus: MachineOperationalStatus;
  healthStatus: 'healthy' | 'degraded' | 'warning' | 'critical' | 'offline';
  governanceLevel: GovernanceLevel;
  operatingBudgetUsd: number;
  computeBudgetUsd: number;
  maxChildren: number;
  parentRoyaltyPct: number;
  creationCostUsd: number;
  provisioningCostUsd: number;
  totalEarningsUsd: number;
  operatingExpensesUsd: number;
  completedJobsCount: number;
  failedJobsCount: number;
  disputedJobsCount: number;
  approvedOperatingHours: string;
  riskLimitUsd: number;
  lastHeartbeat: string;
  createdAt: string;
  passport: MachineDigitalPassport;
}

export interface M2MSwarmColony {
  id: string;
  colonyCode: string;
  name: string;
  specialty: string;
  ownerEmail: string;
  motherMachineId: string | null;
  participatingMachineIds: string[];
  sharedCapabilities: string[];
  resourceBudgetUsd: number;
  maxSwarmSize: number;
  isPaused: boolean;
  operatingPolicy: string;
  createdAt: string;
}

export interface M2MServiceListing {
  id: string;
  providerMachineId: string;
  providerMachineName: string;
  serviceName: string;
  category: string;
  description: string;
  capabilities: string[];
  inputFormat: string;
  outputFormat: string;
  priceUsd: number;
  paymentAsset: PaymentAssetType;
  availability: 'available' | 'busy' | 'paused';
  slaDeliveryMinutes: number;
  reputationScore: number;
  verificationMethod: string;
  apiEndpoint: string;
  licenseTerms: string;
}

export interface M2MJob {
  id: string;
  jobCode: string;
  requestingMachineId: string;
  requestingMachineName: string;
  providerMachineId: string | null;
  providerMachineName: string | null;
  verifierMachineId: string | null;
  customerLabel: string;
  requesterOwnerEmail: string;
  sourceModule: 'M2M Direct' | 'MIND HIVE' | 'NOVA Living App' | 'CODE VEIN' | 'External Buyer';
  category: string;
  title: string;
  description: string;
  requiredCapabilities: string[];
  inputRequirements: string;
  expectedOutput: string;
  acceptanceCriteria: string;
  dataSensitivity: 'public' | 'partner_authorized' | 'anonymized_telemetry';
  proposedPriceUsd: number;
  paymentAsset: PaymentAssetType;
  minReputation: number;
  status: JobLifecycleStatus;
  escrowReserved: boolean;
  escrowMechanism: string;
  contractId: string | null;
  resultSummary?: string;
  resultEvidenceHash?: string;
  submittedAt?: string;
  verificationNotes?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  settledAt?: string;
  deadline: string;
  createdAt: string;
}

export interface M2MServiceContract {
  id: string;
  agreementCode: string;
  jobId: string;
  jobTitle: string;
  requestingMachineId: string;
  providerMachineId: string;
  principalOwner: string;
  agreedPriceUsd: number;
  paymentAsset: PaymentAssetType;
  deliveryDeadline: string;
  acceptanceCriteria: string;
  dataPermissions: string;
  disputeProcedure: string;
  royaltyAgreement: {
    providerPct: number;
    parentMachinePct: number;
    intellectualAssetPct: number;
    platformFeePct: number;
  };
  authorizationType: 'platform_native_agreement' | 'api_authorized' | 'smart_contract_pending';
  status: 'active' | 'fulfilled' | 'disputed' | 'cancelled';
  signedAt: string;
}

export interface M2MEconomicAccount {
  id: string;
  machineId: string;
  machineName: string;
  ownerEmail: string;
  fiatUsdBalance: number;
  platformCreditBalance: number;
  ideaCoinBalance: number;
  usdcBalance: number;
  reservedEscrowUsd: number;
  withdrawalLimitUsd: number;
  requireOwnerApprovalAboveUsd: number;
}

export interface M2MPaymentReservation {
  id: string;
  jobId: string;
  jobTitle: string;
  payerAccountId: string;
  amountUsd: number;
  paymentAsset: PaymentAssetType;
  escrowMechanism: string;
  status: 'reserved' | 'settled' | 'refunded' | 'disputed_hold';
  createdAt: string;
}

export interface M2MLedgerEntry {
  id: string;
  entryRef: string;
  jobId: string;
  debitAccount: string;
  creditAccount: string;
  category:
    | 'escrow_reservation'
    | 'provider_settlement'
    | 'parent_royalty'
    | 'idea_asset_royalty'
    | 'platform_fee'
    | 'operating_cost'
    | 'refund'
    | 'risk_reserve';
  amountUsd: number;
  assetType: PaymentAssetType;
  settlementState: 'settled' | 'reserved' | 'reversed' | 'pending';
  paymentReference: string;
  txHashNote: string | null;
  createdAt: string;
}

export interface M2MRobotMiner {
  id: string;
  machineId: string;
  deviceName: string;
  deviceType:
    | 'Smartphone'
    | 'Okada / Vehicle'
    | 'POS Terminal'
    | 'CCTV System'
    | 'Drone'
    | 'Smart Meter'
    | 'Environmental Sensor'
    | 'Edge Computer';
  ownerEmail: string;
  consentGranted: boolean;
  locationCollectionEnabled: boolean;
  authorizedSensors: string[];
  privacyNoticeAccepted: boolean;
  miningPaused: boolean;
  submittedBatches: number;
  acceptedBatches: number;
  rejectedBatches: number;
  pendingEarningsUsd: number;
  settledEarningsUsd: number;
  operatingCostUsd: number;
  dataQualityScore: number;
  lastSubmissionAt: string;
}

export interface M2MBreedingRequest {
  id: string;
  parentMachineId: string;
  parentMachineName: string;
  evolutionType:
    | 'Capacity Expansion'
    | 'Capability Expansion'
    | 'Specialization'
    | 'Colony Formation'
    | 'Service Replication';
  requestedSpecialization: string;
  verifiedDemandJobId: string;
  provisioningCostUsd: number;
  expectedOperatingCostUsd: number;
  evidenceSummary: string;
  status: 'pending_approval' | 'provisioned' | 'rejected';
  createdChildMachineId?: string;
  createdAt: string;
}

export interface M2MApprovalRequest {
  id: string;
  requestType: 'swarm_expansion' | 'high_value_job' | 'wallet_limit' | 'physical_device_policy';
  machineId: string;
  machineName: string;
  summary: string;
  financialExposureUsd: number;
  governanceLevel: GovernanceLevel;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface M2MAuditEvent {
  id: string;
  eventType:
    | 'machine_registered'
    | 'mother_bot_deployed'
    | 'job_created'
    | 'provider_matched'
    | 'result_submitted'
    | 'result_verified'
    | 'result_rejected'
    | 'payment_settled'
    | 'royalty_recorded'
    | 'machine_paused'
    | 'colony_expanded'
    | 'kill_switch_toggled'
    | 'approval_resolved'
    | 'consent_updated';
  actor: string;
  machineId?: string;
  jobId?: string;
  summary: string;
  timestamp: string;
}

export interface M2MRiskReserve {
  totalReserveUsd: number;
  jobFailureExposureUsd: number;
  disputeExposureUsd: number;
  reserveLabel: string;
  lastReconciledAt: string;
}

export interface M2MAcquisitionProspect {
  id: string;
  organization: string;
  sector: string;
  neededService: string;
  estimatedMonthlyUsd: number;
  qualificationStatus: 'discovered' | 'proposal_prepared' | 'human_approved_outreach' | 'converted';
  matchedMachineId: string;
}

export interface M2MKnowledgeEntry {
  id: string;
  sourceMachineName: string;
  topic: string;
  insight: string;
  sanitizedForSharing: boolean;
  recordedAt: string;
}

export interface M2MDigitalTwinRun {
  id: string;
  scenarioName: string;
  simulatedInstances: number;
  simulatedPriceUsd: number;
  projectedGrossUsd: number;
  projectedCostUsd: number;
  projectedNetUsd: number;
  label: 'SIMULATION ONLY — NOT REAL REVENUE';
  runAt: string;
}

export interface ModuleAdapterStatus {
  moduleId: string;
  moduleName: string;
  relationship: string;
  status: 'operational' | 'connected' | 'not_configured' | 'degraded' | 'service_unavailable';
  detail: string;
  lastCheckedAt: string;
}

export interface M2MOreState {
  pilotModeLabel: string;
  globalKillSwitchActive: boolean;
  maxPilotSwarmSize: number;
  machines: M2MMachine[];
  colonies: M2MSwarmColony[];
  serviceListings: M2MServiceListing[];
  jobs: M2MJob[];
  contracts: M2MServiceContract[];
  economicAccounts: M2MEconomicAccount[];
  reservations: M2MPaymentReservation[];
  ledgerEntries: M2MLedgerEntry[];
  robotMiners: M2MRobotMiner[];
  breedingRequests: M2MBreedingRequest[];
  approvalRequests: M2MApprovalRequest[];
  auditEvents: M2MAuditEvent[];
  riskReserve: M2MRiskReserve;
  acquisitionProspects: M2MAcquisitionProspect[];
  knowledgeExchange: M2MKnowledgeEntry[];
  digitalTwinRuns: M2MDigitalTwinRun[];
  adapters: ModuleAdapterStatus[];
  updatedAt: string;
}
