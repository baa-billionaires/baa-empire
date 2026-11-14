import { Express, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  M2MOreState,
  M2MMachine,
  M2MJob,
  M2MServiceContract,
  M2MLedgerEntry,
  M2MRobotMiner,
  ModuleAdapterStatus
} from '../types/m2mOre';
import { INITIAL_M2M_ORE_STATE } from '../data/m2mOreInitialState';

const DATA_DIR = '/data';
const FALLBACK_DATA_DIR = './data';
const STATE_FILENAME = 'm2m_ore_state.json';

let state: M2MOreState = JSON.parse(JSON.stringify(INITIAL_M2M_ORE_STATE));

function resolveStateFilePath(): string {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    return path.join(DATA_DIR, STATE_FILENAME);
  } catch {
    if (!fs.existsSync(FALLBACK_DATA_DIR)) {
      fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
    }
    return path.join(FALLBACK_DATA_DIR, STATE_FILENAME);
  }
}

function loadState(): void {
  try {
    const primary = resolveStateFilePath();
    if (fs.existsSync(primary)) {
      state = JSON.parse(fs.readFileSync(primary, 'utf-8')) as M2MOreState;
      return;
    }
    const fallback = path.join(FALLBACK_DATA_DIR, STATE_FILENAME);
    if (fs.existsSync(fallback)) {
      state = JSON.parse(fs.readFileSync(fallback, 'utf-8')) as M2MOreState;
      return;
    }
  } catch (err) {
    console.warn('[M2M ORE V18] Failed to read state file, initializing pilot defaults:', err);
  }
  saveState();
}

function saveState(): void {
  state.updatedAt = new Date().toISOString();
  try {
    const primary = resolveStateFilePath();
    fs.writeFileSync(primary, JSON.stringify(state, null, 2), 'utf-8');
    try {
      if (!fs.existsSync(FALLBACK_DATA_DIR)) fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
      fs.writeFileSync(path.join(FALLBACK_DATA_DIR, STATE_FILENAME), JSON.stringify(state, null, 2), 'utf-8');
    } catch {
      // ignore mirror failure
    }
  } catch (err) {
    console.error('[M2M ORE V18] Error persisting state:', err);
  }
}

function checkModuleStateExists(filename: string): boolean {
  return (
    fs.existsSync(path.join(DATA_DIR, filename)) ||
    fs.existsSync(path.join(FALLBACK_DATA_DIR, filename))
  );
}

function probeLiveAdapters(): ModuleAdapterStatus[] {
  const now = new Date().toISOString();
  const hasPaystack = Boolean(process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.includes('...'));
  const hasBaseRpc = Boolean(process.env.BASE_RPC_URL && process.env.ALCHEMY_AA_KEY);

  return [
    {
      moduleId: 'ce-colony',
      moduleName: 'Module 1 — CE COLONY',
      relationship: 'Supplies authorized compute, storage, networking & hardware nodes',
      status: 'operational',
      detail: checkModuleStateExists('ce_colony_state.json')
        ? 'Express routes & /data/ce_colony_state.json verified'
        : 'Express routes mounted (/api/ce-colony/state)',
      lastCheckedAt: now
    },
    {
      moduleId: 'code-vein',
      moduleName: 'Module 2 — CODE VEIN',
      relationship: 'Supplies software services, APIs & developer tools',
      status: 'operational',
      detail: checkModuleStateExists('code_vein_state.json')
        ? 'Express routes & /data/code_vein_state.json verified'
        : 'Express routes mounted (/api/code-vein/state)',
      lastCheckedAt: now
    },
    {
      moduleId: 'aurum-colony',
      moduleName: 'Module 3 — AURUM COLONY',
      relationship: 'Digital asset & vault integrations',
      status: 'operational',
      detail: checkModuleStateExists('aurum_state.json')
        ? 'Express routes & /data/aurum_state.json verified'
        : 'Express routes mounted (/api/aurum/state)',
      lastCheckedAt: now
    },
    {
      moduleId: 'mindhive-v22',
      moduleName: 'Module 4 — MIND HIVE',
      relationship: 'AI agents, knowledge capital & colony intelligence',
      status: 'operational',
      detail: checkModuleStateExists('mindhive_v22_state.json')
        ? 'Express routes & /data/mindhive_v22_state.json verified'
        : 'Express routes mounted (/api/mindhive-v22/state)',
      lastCheckedAt: now
    },
    {
      moduleId: 'nova-protocol',
      moduleName: 'Module 5 — NOVA',
      relationship: 'Living applications generating real-time service demand',
      status: 'operational',
      detail: checkModuleStateExists('nova_protocol_state.json')
        ? 'Express routes & /data/nova_protocol_state.json verified'
        : 'Express routes mounted (/api/nova/state)',
      lastCheckedAt: now
    },
    {
      moduleId: 'paystack-fiat',
      moduleName: 'Fiat Settlement — Paystack',
      relationship: 'Nigerian NGN/USD fiat checkout & webhook verification',
      status: hasPaystack ? 'connected' : 'not_configured',
      detail: hasPaystack
        ? 'PAYSTACK_SECRET_KEY configured (TEST/LIVE webhook adapter ready)'
        : 'Not configured on server env (PAYSTACK_SECRET_KEY missing; fiat card flow unavailable here)',
      lastCheckedAt: now
    },
    {
      moduleId: 'base-l2-usdc',
      moduleName: 'Base L2 / USDC Smart Accounts',
      relationship: 'On-chain USDC escrow & AA gas sponsorship',
      status: hasBaseRpc ? 'connected' : 'not_configured',
      detail: hasBaseRpc
        ? 'Base RPC + AA signer active'
        : 'Not configured (BASE_RPC_URL / ALCHEMY_AA_KEY not set — zero mock tx hashes emitted)',
      lastCheckedAt: now
    }
  ];
}

function addAudit(
  eventType: M2MOreState['auditEvents'][number]['eventType'],
  actor: string,
  summary: string,
  machineId?: string,
  jobId?: string
): void {
  state.auditEvents.unshift({
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    eventType,
    actor,
    machineId,
    jobId,
    summary,
    timestamp: new Date().toISOString()
  });
  if (state.auditEvents.length > 200) {
    state.auditEvents = state.auditEvents.slice(0, 200);
  }
}

function sha256Hex(input: string): string {
  return `sha256:${crypto.createHash('sha256').update(input).digest('hex').slice(0, 36)}`;
}

loadState();

export function registerM2MOreRoutes(app: Express): void {
  console.log('[M2M ORE V18] Registering Module 6 Machine-to-Machine Service Economy routes...');

  // GET full state + real-time adapter probes
  app.get('/api/m2m/state', (_req: Request, res: Response) => {
    state.adapters = probeLiveAdapters();
    res.status(200).json({
      success: true,
      state
    });
  });

  // POST Reset Pilot Demo (explicit user action)
  app.post('/api/m2m/pilot/reset', (_req: Request, res: Response) => {
    state = JSON.parse(JSON.stringify(INITIAL_M2M_ORE_STATE));
    state.adapters = probeLiveAdapters();
    saveState();
    res.status(200).json({ success: true, message: 'Reset to baseline 1 Mother Bot + 3 Child Pilot state', state });
  });

  // 1. REGISTER MACHINE + DIGITAL PASSPORT
  app.post('/api/m2m/machines/register', (req: Request, res: Response) => {
    const {
      name,
      ownerEmail,
      category,
      machineType,
      specialization,
      purpose,
      capabilities,
      operatingBudgetUsd,
      computeBudgetUsd,
      hardwareSpecs
    } = req.body;

    if (!name || !ownerEmail || !category) {
      return res.status(400).json({ success: false, error: 'name, ownerEmail, and category are required' });
    }

    const id = `m2m-mach-${Date.now().toString(36)}`;
    const code = `M2M-${category === 'Mother Bot' ? 'MB' : 'AG'}-${String(state.machines.length + 1).padStart(2, '0')}`;
    const acctId = `acct-${id}`;
    const caps: string[] = Array.isArray(capabilities)
      ? capabilities
      : String(capabilities || 'general_service')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

    const now = new Date().toISOString();
    const machine: M2MMachine = {
      id,
      machineCode: code,
      ownerId: `owner-${ownerEmail.split('@')[0]}`,
      ownerEmail,
      name: String(name).trim(),
      category,
      machineType: machineType || category,
      specialization: specialization || 'General Specialist',
      purpose: purpose || 'Registered authorized M2M service node',
      parentMachineId: null,
      colonyId: state.colonies[0]?.id || null,
      capabilities: caps,
      authorizedOperations: ['accept_job', 'submit_verified_output'],
      apiIdentity: `m2m_api_${id}`,
      economicAccountId: acctId,
      reputationScore: 75,
      reliabilityRating: 100,
      verificationStatus: 'verified',
      availableResources: hardwareSpecs || '2 vCPU · 4 GB RAM · Sandbox Node',
      currentWorkloadPct: 0,
      operationalStatus: 'online',
      healthStatus: 'healthy',
      governanceLevel: 3,
      operatingBudgetUsd: Math.max(0, Number(operatingBudgetUsd) || 100),
      computeBudgetUsd: Math.max(0, Number(computeBudgetUsd) || 30),
      maxChildren: category === 'Mother Bot' ? 10 : 0,
      parentRoyaltyPct: 10,
      creationCostUsd: 0,
      provisioningCostUsd: 0,
      totalEarningsUsd: 0,
      operatingExpensesUsd: 0,
      completedJobsCount: 0,
      failedJobsCount: 0,
      disputedJobsCount: 0,
      approvedOperatingHours: '24/7 Authorized',
      riskLimitUsd: 100,
      lastHeartbeat: now,
      createdAt: now,
      passport: {
        passportSerial: `PASSPORT-${code}-V18`,
        machineId: id,
        ownerEmail,
        softwareVersion: 'm2m-agent/18.0.0',
        hardwareSpecs: hardwareSpecs || 'Standard UA-AIDC Sandboxed Container',
        certifications: ['Owner-Verified Registration', 'Capabilities Attested'],
        authorizedDataPermissions: ['job_scoped_inputs_only'],
        slaTargetAvailabilityPct: 98.0,
        slaMaxResponseSec: 15,
        securityStatus: 'compliant',
        verificationHash: sha256Hex(`${id}:${ownerEmail}:${caps.join(',')}:${now}`),
        issuedAt: now,
        lastVerifiedAt: now,
        maintenanceHistory: [`Registered by ${ownerEmail}`]
      }
    };

    state.machines.push(machine);
    state.economicAccounts.push({
      id: acctId,
      machineId: id,
      machineName: machine.name,
      ownerEmail,
      fiatUsdBalance: 0,
      platformCreditBalance: machine.operatingBudgetUsd,
      ideaCoinBalance: 0,
      usdcBalance: 0,
      reservedEscrowUsd: 0,
      withdrawalLimitUsd: 100,
      requireOwnerApprovalAboveUsd: 50
    });

    addAudit('machine_registered', ownerEmail, `Registered ${code} (${machine.name}) & issued ${machine.passport.passportSerial}`, id);
    saveState();
    res.status(201).json({ success: true, machine, state });
  });

  // 2. MOTHER BOT FACTORY — DEPLOY MOTHER BOT
  app.post('/api/m2m/mother-bot/deploy', (req: Request, res: Response) => {
    if (state.globalKillSwitchActive) {
      return res.status(403).json({ success: false, error: 'Global Kill Switch is active. Disable emergency halt before deploying.' });
    }

    const {
      ownerEmail,
      name,
      specialization,
      purpose,
      capabilities,
      operatingBudgetUsd,
      computeBudgetUsd,
      maxChildren,
      parentRoyaltyPct,
      approvedOperatingHours,
      riskLimitUsd
    } = req.body;

    if (!ownerEmail || !name || !specialization) {
      return res.status(400).json({ success: false, error: 'ownerEmail, name, and specialization are required' });
    }

    const budget = Number(operatingBudgetUsd);
    if (Number.isNaN(budget) || budget < 25) {
      return res.status(400).json({ success: false, error: 'Minimum approved operating budget of $25.00 USD required to deploy Mother Bot' });
    }

    const motherCount = state.machines.filter((m) => m.category === 'Mother Bot').length;
    const id = `m2m-mb-${String(motherCount + 1).padStart(2, '0')}-${Date.now().toString(36).slice(-4)}`;
    const code = `M2M-MB-${String(motherCount + 1).padStart(2, '0')}`;
    const acctId = `acct-${id}`;
    const caps: string[] = Array.isArray(capabilities)
      ? capabilities
      : String(capabilities || 'job_discovery,capability_matching,swarm_governance')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
    const now = new Date().toISOString();

    const motherBot: M2MMachine = {
      id,
      machineCode: code,
      ownerId: `owner-${ownerEmail.split('@')[0]}`,
      ownerEmail,
      name: String(name).trim(),
      category: 'Mother Bot',
      machineType: 'Autonomous Parent Coordinator',
      specialization,
      purpose: purpose || `Owner-authorized parent machine for ${specialization}`,
      parentMachineId: null,
      colonyId: state.colonies[0]?.id || null,
      capabilities: caps,
      authorizedOperations: ['create_job', 'match_provider', 'request_child_breeding'],
      apiIdentity: `m2m_api_${id}`,
      economicAccountId: acctId,
      reputationScore: 85,
      reliabilityRating: 100,
      verificationStatus: 'verified',
      availableResources: '4 vCPU · 8 GB RAM · CE Colony Pool',
      currentWorkloadPct: 10,
      operationalStatus: 'online',
      healthStatus: 'healthy',
      governanceLevel: 3,
      operatingBudgetUsd: budget,
      computeBudgetUsd: Math.max(10, Number(computeBudgetUsd) || 50),
      maxChildren: Math.min(25, Math.max(1, Number(maxChildren) || 10)),
      parentRoyaltyPct: Math.min(25, Math.max(0, Number(parentRoyaltyPct) ?? 10)),
      creationCostUsd: 25,
      provisioningCostUsd: 15,
      totalEarningsUsd: 0,
      operatingExpensesUsd: 0,
      completedJobsCount: 0,
      failedJobsCount: 0,
      disputedJobsCount: 0,
      approvedOperatingHours: approvedOperatingHours || '24/7 Authorized',
      riskLimitUsd: Math.max(25, Number(riskLimitUsd) || 200),
      lastHeartbeat: now,
      createdAt: now,
      passport: {
        passportSerial: `PASSPORT-${code}-V18`,
        machineId: id,
        ownerEmail,
        softwareVersion: 'mother-coordinator/18.1.0',
        hardwareSpecs: 'CE Colony Orchestrator Node · 4 vCPU / 8 GB RAM',
        certifications: ['Owner-Authorized Parent Bot', 'Swarm Limit Cap Enforced'],
        authorizedDataPermissions: ['job_metadata', 'child_telemetry'],
        slaTargetAvailabilityPct: 99.0,
        slaMaxResponseSec: 8,
        securityStatus: 'compliant',
        verificationHash: sha256Hex(`${id}:${ownerEmail}:mother:${now}`),
        issuedAt: now,
        lastVerifiedAt: now,
        maintenanceHistory: [`Deployed Mother Bot under ${ownerEmail} with cap=${Number(maxChildren) || 10}`]
      }
    };

    state.machines.push(motherBot);
    state.economicAccounts.push({
      id: acctId,
      machineId: id,
      machineName: motherBot.name,
      ownerEmail,
      fiatUsdBalance: 0,
      platformCreditBalance: budget,
      ideaCoinBalance: 0,
      usdcBalance: 0,
      reservedEscrowUsd: 0,
      withdrawalLimitUsd: motherBot.riskLimitUsd,
      requireOwnerApprovalAboveUsd: Math.round(motherBot.riskLimitUsd * 0.5)
    });

    addAudit('mother_bot_deployed', ownerEmail, `Deployed Mother Bot ${code} (${motherBot.name}) with budget $${budget} & maxChildren=${motherBot.maxChildren}`, id);
    saveState();
    res.status(201).json({ success: true, machine: motherBot, state });
  });

  // 3. EVIDENCE-BASED MACHINE BREEDING / CHILD REQUEST
  app.post('/api/m2m/breeding/request', (req: Request, res: Response) => {
    if (state.globalKillSwitchActive) {
      return res.status(403).json({ success: false, error: 'Blocked: Global Kill Switch is active.' });
    }

    const {
      parentMachineId,
      requestedSpecialization,
      evolutionType,
      verifiedDemandJobId,
      provisioningCostUsd,
      expectedOperatingCostUsd,
      evidenceSummary,
      requireOwnerApproval
    } = req.body;

    const parent = state.machines.find((m) => m.id === parentMachineId);
    if (!parent) {
      return res.status(404).json({ success: false, error: 'Parent machine not found' });
    }
    if (parent.operationalStatus === 'paused' || parent.operationalStatus === 'suspended' || parent.operationalStatus === 'retired') {
      return res.status(400).json({ success: false, error: `Parent machine ${parent.machineCode} is ${parent.operationalStatus} and cannot breed.` });
    }

    const existingChildren = state.machines.filter((m) => m.parentMachineId === parent.id && m.operationalStatus !== 'retired');
    if (existingChildren.length >= parent.maxChildren) {
      return res.status(400).json({
        success: false,
        error: `Swarm limit reached: ${parent.machineCode} already has ${existingChildren.length}/${parent.maxChildren} active child machines.`
      });
    }

    const provCost = Math.max(5, Number(provisioningCostUsd) || 12);
    const opCost = Math.max(5, Number(expectedOperatingCostUsd) || 15);
    const parentAcct = state.economicAccounts.find((a) => a.machineId === parent.id);
    if (!parentAcct || parentAcct.platformCreditBalance < provCost + opCost) {
      return res.status(400).json({
        success: false,
        error: `Insufficient operating budget on ${parent.machineCode}: requires $${(provCost + opCost).toFixed(2)} for provisioning + initial operating reserve.`
      });
    }

    if (!evidenceSummary || String(evidenceSummary).trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Evidence-based breeding requires verified customer/workload demand justification.'
      });
    }

    const reqId = `breed-${Date.now().toString(36)}`;

    // Level 4 owner approval check if requested or above risk limit
    if (requireOwnerApproval || provCost + opCost > parent.riskLimitUsd * 0.4) {
      state.breedingRequests.unshift({
        id: reqId,
        parentMachineId: parent.id,
        parentMachineName: parent.name,
        evolutionType: evolutionType || 'Capacity Expansion',
        requestedSpecialization: requestedSpecialization || 'Specialist Child Bot',
        verifiedDemandJobId: verifiedDemandJobId || state.jobs[0]?.id || 'demand-verified',
        provisioningCostUsd: provCost,
        expectedOperatingCostUsd: opCost,
        evidenceSummary,
        status: 'pending_approval',
        createdAt: new Date().toISOString()
      });

      state.approvalRequests.unshift({
        id: `appr-${Date.now().toString(36)}`,
        requestType: 'swarm_expansion',
        machineId: parent.id,
        machineName: parent.name,
        summary: `Approve spawning "${requestedSpecialization}" child under ${parent.machineCode} ($${(provCost + opCost).toFixed(2)}) — ${evidenceSummary}`,
        financialExposureUsd: provCost + opCost,
        governanceLevel: 4,
        status: 'pending',
        requestedAt: new Date().toISOString()
      });

      addAudit('colony_expanded', parent.ownerEmail, `Queued Level 4 Owner Approval for child machine "${requestedSpecialization}" under ${parent.machineCode}`, parent.id);
      saveState();
      return res.status(202).json({
        success: true,
        pendingApproval: true,
        message: 'Queued in Level 4 Owner Approval Center before provisioning child resources.',
        state
      });
    }

    // Direct authorized child provisioning
    const childId = `m2m-cb-${Date.now().toString(36).slice(-5)}`;
    const childCode = `M2M-CB-${String(state.machines.filter((m) => m.category === 'Child Bot').length + 1).padStart(2, '0')}`;
    const childAcctId = `acct-${childId}`;
    const now = new Date().toISOString();

    parentAcct.platformCreditBalance = +(parentAcct.platformCreditBalance - provCost).toFixed(2);
    parent.operatingExpensesUsd = +(parent.operatingExpensesUsd + provCost).toFixed(2);

    const specKey = String(requestedSpecialization || 'specialist_task')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_');

    const childMachine: M2MMachine = {
      id: childId,
      machineCode: childCode,
      ownerId: parent.ownerId,
      ownerEmail: parent.ownerEmail,
      name: `${requestedSpecialization} (${childCode})`,
      category: 'Child Bot',
      machineType: 'Specialist Worker',
      specialization: requestedSpecialization || 'Specialist Bot',
      purpose: `Evidence-provisioned child under ${parent.machineCode}: ${evidenceSummary}`,
      parentMachineId: parent.id,
      colonyId: parent.colonyId,
      capabilities: [specKey, 'data_verification'],
      authorizedOperations: ['accept_job', 'submit_verified_output'],
      apiIdentity: `m2m_api_${childId}`,
      economicAccountId: childAcctId,
      reputationScore: 80,
      reliabilityRating: 100,
      verificationStatus: 'verified',
      availableResources: '2 vCPU · 4 GB RAM · CE Colony Sandbox',
      currentWorkloadPct: 0,
      operationalStatus: 'idle',
      healthStatus: 'healthy',
      governanceLevel: 3,
      operatingBudgetUsd: opCost,
      computeBudgetUsd: provCost,
      maxChildren: 0,
      parentRoyaltyPct: parent.parentRoyaltyPct,
      creationCostUsd: provCost,
      provisioningCostUsd: provCost,
      totalEarningsUsd: 0,
      operatingExpensesUsd: 0,
      completedJobsCount: 0,
      failedJobsCount: 0,
      disputedJobsCount: 0,
      approvedOperatingHours: parent.approvedOperatingHours,
      riskLimitUsd: Math.min(100, parent.riskLimitUsd),
      lastHeartbeat: now,
      createdAt: now,
      passport: {
        passportSerial: `PASSPORT-${childCode}-V18`,
        machineId: childId,
        ownerEmail: parent.ownerEmail,
        softwareVersion: 'child-worker/18.0.0',
        hardwareSpecs: 'CE Colony Worker · 2 vCPU / 4 GB RAM',
        certifications: [`Lineage: ${parent.machineCode}`, 'Evidence-Based Provision'],
        authorizedDataPermissions: ['job_scoped_inputs_only'],
        slaTargetAvailabilityPct: 98.5,
        slaMaxResponseSec: 12,
        securityStatus: 'compliant',
        verificationHash: sha256Hex(`${childId}:${parent.id}:${now}`),
        issuedAt: now,
        lastVerifiedAt: now,
        maintenanceHistory: [`Provisioned from verified demand under ${parent.machineCode}`]
      }
    };

    state.machines.push(childMachine);
    state.economicAccounts.push({
      id: childAcctId,
      machineId: childId,
      machineName: childMachine.name,
      ownerEmail: parent.ownerEmail,
      fiatUsdBalance: 0,
      platformCreditBalance: opCost,
      ideaCoinBalance: 0,
      usdcBalance: 0,
      reservedEscrowUsd: 0,
      withdrawalLimitUsd: 50,
      requireOwnerApprovalAboveUsd: 40
    });

    if (parent.colonyId) {
      const col = state.colonies.find((c) => c.id === parent.colonyId);
      if (col) col.participatingMachineIds.push(childId);
    }

    state.breedingRequests.unshift({
      id: reqId,
      parentMachineId: parent.id,
      parentMachineName: parent.name,
      evolutionType: evolutionType || 'Capacity Expansion',
      requestedSpecialization: requestedSpecialization || 'Specialist Bot',
      verifiedDemandJobId: verifiedDemandJobId || state.jobs[0]?.id || 'demand-verified',
      provisioningCostUsd: provCost,
      expectedOperatingCostUsd: opCost,
      evidenceSummary,
      status: 'provisioned',
      createdChildMachineId: childId,
      createdAt: now
    });

    addAudit('colony_expanded', parent.ownerEmail, `Provisioned child ${childCode} under ${parent.machineCode} (cost $${provCost})`, childId);
    saveState();
    res.status(201).json({ success: true, childMachine, state });
  });

  // 4. UPDATE MACHINE STATUS (PAUSE / RESUME / RETIRE)
  app.patch('/api/m2m/machines/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { operationalStatus, actor } = req.body;
    const machine = state.machines.find((m) => m.id === id);
    if (!machine) return res.status(404).json({ success: false, error: 'Machine not found' });

    if (state.globalKillSwitchActive && (operationalStatus === 'online' || operationalStatus === 'idle' || operationalStatus === 'working')) {
      return res.status(403).json({ success: false, error: 'Cannot activate machine while Global Kill Switch is active.' });
    }

    machine.operationalStatus = operationalStatus;
    machine.lastHeartbeat = new Date().toISOString();
    addAudit('machine_paused', actor || machine.ownerEmail, `Changed ${machine.machineCode} status to ${operationalStatus}`, machine.id);
    saveState();
    res.status(200).json({ success: true, machine, state });
  });

  // 5. CREATE JOB + CHECK FUNDS + RESERVE ESCROW
  app.post('/api/m2m/jobs/create', (req: Request, res: Response) => {
    if (state.globalKillSwitchActive) {
      return res.status(403).json({ success: false, error: 'Global Kill Switch active. New job execution halted.' });
    }

    const {
      requestingMachineId,
      customerLabel,
      sourceModule,
      category,
      title,
      description,
      requiredCapabilities,
      acceptanceCriteria,
      proposedPriceUsd,
      paymentAsset,
      minReputation
    } = req.body;

    const reqMachine = state.machines.find((m) => m.id === requestingMachineId);
    if (!reqMachine) {
      return res.status(404).json({ success: false, error: 'Requesting machine not found' });
    }
    if (reqMachine.operationalStatus === 'paused' || reqMachine.operationalStatus === 'retired' || reqMachine.operationalStatus === 'suspended') {
      return res.status(400).json({ success: false, error: `Requesting machine ${reqMachine.machineCode} is ${reqMachine.operationalStatus}` });
    }

    const price = Number(proposedPriceUsd);
    if (Number.isNaN(price) || price <= 0) {
      return res.status(400).json({ success: false, error: 'Valid positive proposedPriceUsd is required' });
    }

    const asset = paymentAsset || 'PLATFORM_CREDIT';
    const adapters = probeLiveAdapters();
    if (asset === 'USDC') {
      const baseAdapter = adapters.find((a) => a.moduleId === 'base-l2-usdc');
      if (baseAdapter?.status !== 'connected') {
        return res.status(400).json({
          success: false,
          error: 'USDC on-chain escrow is not configured (BASE_RPC_URL / ALCHEMY_AA_KEY unavailable). Select PLATFORM_CREDIT or FIAT_USD.'
        });
      }
    }

    const acct = state.economicAccounts.find((a) => a.machineId === reqMachine.id);
    if (!acct) {
      return res.status(400).json({ success: false, error: 'Requester has no configured economic account' });
    }

    // Balance enforcement per asset type (strict separation of accounting!)
    const available =
      asset === 'IDEA_COIN'
        ? acct.ideaCoinBalance
        : asset === 'FIAT_USD'
        ? acct.fiatUsdBalance
        : acct.platformCreditBalance;

    if (available < price) {
      return res.status(400).json({
        success: false,
        error: `Insufficient ${asset} balance ($${available.toFixed(2)}) for $${price.toFixed(2)} job escrow reservation.`
      });
    }

    // Deduct available & hold in escrow
    if (asset === 'IDEA_COIN') acct.ideaCoinBalance = +(acct.ideaCoinBalance - price).toFixed(2);
    else if (asset === 'FIAT_USD') acct.fiatUsdBalance = +(acct.fiatUsdBalance - price).toFixed(2);
    else acct.platformCreditBalance = +(acct.platformCreditBalance - price).toFixed(2);

    acct.reservedEscrowUsd = +(acct.reservedEscrowUsd + price).toFixed(2);

    const jobId = `job-${Date.now().toString(36)}`;
    const jobCode = `JOB-M2M-${String(state.jobs.length + 1).padStart(3, '0')}`;
    const caps: string[] = Array.isArray(requiredCapabilities)
      ? requiredCapabilities
      : String(requiredCapabilities || category || 'general_service')
          .toLowerCase()
          .split(',')
          .map((s) => s.trim().replace(/\s+/g, '_'))
          .filter(Boolean);

    const now = new Date().toISOString();
    const job: M2MJob = {
      id: jobId,
      jobCode,
      requestingMachineId: reqMachine.id,
      requestingMachineName: reqMachine.name,
      providerMachineId: null,
      providerMachineName: null,
      verifierMachineId: state.machines.find((m) => m.capabilities.includes('data_verification') && m.id !== reqMachine.id)?.id || null,
      customerLabel: customerLabel || `${reqMachine.name} (${sourceModule || 'M2M Direct'})`,
      requesterOwnerEmail: reqMachine.ownerEmail,
      sourceModule: sourceModule || 'M2M Direct',
      category: category || 'AI services',
      title: String(title || 'M2M Service Request').trim(),
      description: String(description || 'Authorized machine service contract'),
      requiredCapabilities: caps,
      inputRequirements: 'Authorized structured JSON payload',
      expectedOutput: 'Verified deliverable + SHA-256 provenance digest',
      acceptanceCriteria: acceptanceCriteria || '100% completeness, schema valid, non-empty output',
      dataSensitivity: 'partner_authorized',
      proposedPriceUsd: price,
      paymentAsset: asset,
      minReputation: Math.max(50, Number(minReputation) || 75),
      status: 'FUNDED',
      escrowReserved: true,
      escrowMechanism: 'Internal Double-Entry Escrow Ledger',
      contractId: null,
      deadline: new Date(Date.now() + 86400000).toISOString(),
      createdAt: now
    };

    state.jobs.unshift(job);
    state.reservations.unshift({
      id: `res-${Date.now().toString(36)}`,
      jobId,
      jobTitle: job.title,
      payerAccountId: acct.id,
      amountUsd: price,
      paymentAsset: asset,
      escrowMechanism: 'Internal Double-Entry Escrow Ledger',
      status: 'reserved',
      createdAt: now
    });

    state.ledgerEntries.unshift({
      id: `led-${Date.now().toString(36)}`,
      entryRef: `M2M-ESC-${jobCode}`,
      jobId,
      debitAccount: `${acct.id} (${asset})`,
      creditAccount: 'm2m-escrow-hold',
      category: 'escrow_reservation',
      amountUsd: price,
      assetType: asset,
      settlementState: 'reserved',
      paymentReference: `ESC-${jobCode}`,
      txHashNote: null,
      createdAt: now
    });

    state.riskReserve.jobFailureExposureUsd = +(state.riskReserve.jobFailureExposureUsd + price).toFixed(2);
    addAudit('job_created', reqMachine.ownerEmail, `Created & reserved escrow ($${price.toFixed(2)} ${asset}) for ${jobCode}: ${job.title}`, reqMachine.id, jobId);
    saveState();

    res.status(201).json({ success: true, job, state });
  });

  // 6. INTELLIGENT MATCH & SERVICE AGREEMENT CREATION
  app.post('/api/m2m/jobs/:id/match', (req: Request, res: Response) => {
    if (state.globalKillSwitchActive) {
      return res.status(403).json({ success: false, error: 'Global Kill Switch active.' });
    }

    const { id } = req.params;
    const { preferredProviderId } = req.body;
    const job = state.jobs.find((j) => j.id === id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

    if (job.status !== 'FUNDED' && job.status !== 'DISCOVERED' && job.status !== 'VALIDATED') {
      return res.status(400).json({ success: false, error: `Job ${job.jobCode} is already ${job.status}` });
    }

    // Filter eligible providers: unpaused, not retired, not requesting machine (prevent self-dealing!), meets min reputation
    const candidates = state.machines.filter((m) => {
      if (m.id === job.requestingMachineId) return false;
      if (m.operationalStatus === 'paused' || m.operationalStatus === 'offline' || m.operationalStatus === 'retired' || m.operationalStatus === 'suspended') {
        return false;
      }
      if (m.reputationScore < job.minReputation) return false;
      if (preferredProviderId && m.id === preferredProviderId) return true;
      const capOverlap = job.requiredCapabilities.some((cap) =>
        m.capabilities.some((mc) => mc.toLowerCase().includes(cap.toLowerCase()) || cap.toLowerCase().includes(mc.toLowerCase()))
      );
      return capOverlap || m.category === 'Child Bot' || m.category === 'AI Agent Machine';
    });

    const chosen = preferredProviderId
      ? candidates.find((c) => c.id === preferredProviderId)
      : candidates.sort((a, b) => b.reputationScore - a.reputationScore)[0];

    if (!chosen) {
      return res.status(400).json({
        success: false,
        error: 'No eligible unpaused specialist machine matched capabilities and reputation constraints.'
      });
    }

    const contractId = `ctr-${Date.now().toString(36)}`;
    const agreementCode = `M2M-SA-${String(state.contracts.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const contract: M2MServiceContract = {
      id: contractId,
      agreementCode,
      jobId: job.id,
      jobTitle: job.title,
      requestingMachineId: job.requestingMachineId,
      providerMachineId: chosen.id,
      principalOwner: job.requesterOwnerEmail,
      agreedPriceUsd: job.proposedPriceUsd,
      paymentAsset: job.paymentAsset,
      deliveryDeadline: job.deadline,
      acceptanceCriteria: job.acceptanceCriteria,
      dataPermissions: `Scoped solely to ${job.dataSensitivity}`,
      disputeProcedure: 'Settlement held until Independent Verifier approves output',
      royaltyAgreement: {
        providerPct: 70,
        parentMachinePct: chosen.parentMachineId ? 10 : 0,
        intellectualAssetPct: 10,
        platformFeePct: chosen.parentMachineId ? 10 : 20
      },
      authorizationType: 'platform_native_agreement',
      status: 'active',
      signedAt: now
    };

    state.contracts.unshift(contract);
    job.providerMachineId = chosen.id;
    job.providerMachineName = chosen.name;
    job.contractId = contractId;
    job.status = 'ASSIGNED';
    chosen.operationalStatus = 'working';
    chosen.currentWorkloadPct = Math.min(95, chosen.currentWorkloadPct + 25);

    addAudit('provider_matched', 'Matching Engine', `Matched ${chosen.machineCode} to ${job.jobCode} & signed Service Agreement ${agreementCode}`, chosen.id, job.id);
    saveState();
    res.status(200).json({ success: true, job, contract, state });
  });

  // 7. SUBMIT EXECUTION RESULT
  app.post('/api/m2m/jobs/:id/submit', (req: Request, res: Response) => {
    const { id } = req.params;
    const { resultSummary, executeFailureTest } = req.body;
    const job = state.jobs.find((j) => j.id === id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

    if (job.status !== 'ASSIGNED' && job.status !== 'EXECUTING') {
      return res.status(400).json({ success: false, error: `Job ${job.jobCode} cannot accept submission in status ${job.status}` });
    }

    const provider = state.machines.find((m) => m.id === job.providerMachineId);
    if (provider?.operationalStatus === 'paused') {
      return res.status(400).json({ success: false, error: `Provider ${provider.machineCode} is paused.` });
    }

    const now = new Date().toISOString();
    const summaryText = executeFailureTest
      ? ''
      : String(resultSummary || `Verified service execution output delivered by ${provider?.name || 'Specialist Machine'}.`).trim();

    job.resultSummary = summaryText;
    job.resultEvidenceHash = summaryText ? sha256Hex(`${job.id}:${summaryText}:${now}`) : '';
    job.submittedAt = now;
    job.status = 'SUBMITTED';

    if (provider) {
      provider.operationalStatus = 'idle';
      provider.currentWorkloadPct = Math.max(0, provider.currentWorkloadPct - 20);
      provider.lastHeartbeat = now;
    }

    addAudit('result_submitted', provider?.machineCode || 'Provider', `Submitted work evidence for ${job.jobCode}`, provider?.id, job.id);
    saveState();
    res.status(200).json({ success: true, job, state });
  });

  // 8. INDEPENDENT VERIFICATION GATE (PASS OR REJECT / DISPUTE)
  app.post('/api/m2m/jobs/:id/verify', (req: Request, res: Response) => {
    const { id } = req.params;
    const { approve, notes, verifierLabel } = req.body;
    const job = state.jobs.find((j) => j.id === id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

    if (job.status !== 'SUBMITTED') {
      return res.status(400).json({ success: false, error: `Job ${job.jobCode} must be SUBMITTED before verification (current: ${job.status}).` });
    }

    // Strict check: empty/missing result cannot pass verification
    const hasEvidence = Boolean(job.resultSummary && job.resultSummary.trim().length >= 5 && job.resultEvidenceHash);
    const shouldPass = approve !== false && hasEvidence;
    const now = new Date().toISOString();

    if (!shouldPass) {
      job.status = approve === false && hasEvidence ? 'DISPUTED' : 'REJECTED';
      job.verificationNotes =
        notes || (hasEvidence ? 'Output disputed by verifier/owner review — settlement blocked.' : 'Rejected: empty or incomplete submission failed acceptance criteria.');
      job.verifiedBy = verifierLabel || 'M2M-CB-03 (Independent Verifier)';
      job.verifiedAt = now;

      const provider = state.machines.find((m) => m.id === job.providerMachineId);
      if (provider) {
        if (job.status === 'DISPUTED') provider.disputedJobsCount += 1;
        else provider.failedJobsCount += 1;
        provider.reputationScore = Math.max(10, +(provider.reputationScore - 2.5).toFixed(1));
      }

      if (job.contractId) {
        const ctr = state.contracts.find((c) => c.id === job.contractId);
        if (ctr && job.status === 'DISPUTED') ctr.status = 'disputed';
      }

      state.riskReserve.disputeExposureUsd = +(state.riskReserve.disputeExposureUsd + job.proposedPriceUsd).toFixed(2);
      addAudit('result_rejected', job.verifiedBy || 'Verifier', `${job.status} ${job.jobCode}: ${job.verificationNotes}`, provider?.id, job.id);
      saveState();
      return res.status(200).json({ success: true, verified: false, job, state });
    }

    // Passed verification
    job.status = 'VERIFIED';
    job.verificationNotes = notes || `All acceptance criteria met (${job.acceptanceCriteria}). Anti-self-dealing check passed.`;
    const verifiedByActor = verifierLabel || 'M2M-CB-03 (Independent Verifier)';
    job.verifiedBy = verifiedByActor;
    job.verifiedAt = now;

    addAudit('result_verified', verifiedByActor, `Verified ${job.jobCode} evidence (${job.resultEvidenceHash?.slice(0, 18)}...)`, job.verifierMachineId || undefined, job.id);
    saveState();
    res.status(200).json({ success: true, verified: true, job, state });
  });

  // 9. SETTLE VERIFIED JOB (DOUBLE-ENTRY LEDGER + ROYALTY SPLITS)
  app.post('/api/m2m/jobs/:id/settle', (req: Request, res: Response) => {
    const { id } = req.params;
    const job = state.jobs.find((j) => j.id === id);
    if (!job) return res.status(404).json({ success: false, error: 'Job not found' });

    if (job.status === 'SETTLED') {
      return res.status(409).json({ success: false, error: `Duplicate settlement blocked: ${job.jobCode} is already settled.` });
    }

    if (job.status !== 'VERIFIED' && job.status !== 'APPROVED') {
      return res.status(400).json({
        success: false,
        error: `JOB FIRST, VERIFICATION SECOND, SETTLEMENT THIRD: ${job.jobCode} is ${job.status} and cannot be settled.`
      });
    }

    const provider = state.machines.find((m) => m.id === job.providerMachineId);
    if (!provider) return res.status(400).json({ success: false, error: 'No assigned provider machine found.' });
    if (provider.id === job.requestingMachineId) {
      return res.status(400).json({ success: false, error: 'Anti-self-dealing violation: requester and provider cannot be identical.' });
    }

    const contract = state.contracts.find((c) => c.id === job.contractId);
    const split = contract?.royaltyAgreement || {
      providerPct: 70,
      parentMachinePct: provider.parentMachineId ? 10 : 0,
      intellectualAssetPct: 10,
      platformFeePct: provider.parentMachineId ? 10 : 20
    };

    const gross = job.proposedPriceUsd;
    const providerAmt = +((gross * split.providerPct) / 100).toFixed(2);
    const parentAmt = +((gross * split.parentMachinePct) / 100).toFixed(2);
    const assetAmt = +((gross * split.intellectualAssetPct) / 100).toFixed(2);
    const platformAmt = +(gross - providerAmt - parentAmt - assetAmt).toFixed(2);

    const now = new Date().toISOString();

    // Update payer reserved escrow
    const payerAcct = state.economicAccounts.find((a) => a.machineId === job.requestingMachineId);
    if (payerAcct) {
      payerAcct.reservedEscrowUsd = Math.max(0, +(payerAcct.reservedEscrowUsd - gross).toFixed(2));
    }

    // Credit provider economic account
    const providerAcct = state.economicAccounts.find((a) => a.machineId === provider.id);
    if (providerAcct) {
      if (job.paymentAsset === 'IDEA_COIN') providerAcct.ideaCoinBalance = +(providerAcct.ideaCoinBalance + providerAmt).toFixed(2);
      else if (job.paymentAsset === 'FIAT_USD') providerAcct.fiatUsdBalance = +(providerAcct.fiatUsdBalance + providerAmt).toFixed(2);
      else providerAcct.platformCreditBalance = +(providerAcct.platformCreditBalance + providerAmt).toFixed(2);
    }

    provider.totalEarningsUsd = +(provider.totalEarningsUsd + providerAmt).toFixed(2);
    provider.completedJobsCount += 1;
    provider.reputationScore = Math.min(100, +(provider.reputationScore + 0.6).toFixed(1));

    // Credit parent machine royalty if applicable
    const parentMachine = provider.parentMachineId ? state.machines.find((m) => m.id === provider.parentMachineId) : null;
    if (parentMachine && parentAmt > 0) {
      const parentAcct = state.economicAccounts.find((a) => a.machineId === parentMachine.id);
      if (parentAcct) {
        parentAcct.platformCreditBalance = +(parentAcct.platformCreditBalance + parentAmt).toFixed(2);
      }
      parentMachine.totalEarningsUsd = +(parentMachine.totalEarningsUsd + parentAmt).toFixed(2);
    }

    const baseRef = `SET-${job.jobCode}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
    const newEntries: M2MLedgerEntry[] = [
      {
        id: `led-${Date.now()}-p`,
        entryRef: `${baseRef}-PROV`,
        jobId: job.id,
        debitAccount: 'm2m-escrow-hold',
        creditAccount: `${provider.machineCode} (${split.providerPct}%)`,
        category: 'provider_settlement',
        amountUsd: providerAmt,
        assetType: job.paymentAsset,
        settlementState: 'settled',
        paymentReference: baseRef,
        txHashNote: null,
        createdAt: now
      },
      {
        id: `led-${Date.now()}-f`,
        entryRef: `${baseRef}-FEE`,
        jobId: job.id,
        debitAccount: 'm2m-escrow-hold',
        creditAccount: `ua-aidc-platform-treasury (${split.platformFeePct}%)`,
        category: 'platform_fee',
        amountUsd: platformAmt,
        assetType: job.paymentAsset,
        settlementState: 'settled',
        paymentReference: baseRef,
        txHashNote: null,
        createdAt: now
      }
    ];

    if (parentAmt > 0 && parentMachine) {
      newEntries.push({
        id: `led-${Date.now()}-r`,
        entryRef: `${baseRef}-PAR`,
        jobId: job.id,
        debitAccount: 'm2m-escrow-hold',
        creditAccount: `${parentMachine.machineCode} Parent Royalty (${split.parentMachinePct}%)`,
        category: 'parent_royalty',
        amountUsd: parentAmt,
        assetType: job.paymentAsset,
        settlementState: 'settled',
        paymentReference: baseRef,
        txHashNote: null,
        createdAt: now
      });
    }

    if (assetAmt > 0) {
      newEntries.push({
        id: `led-${Date.now()}-a`,
        entryRef: `${baseRef}-AST`,
        jobId: job.id,
        debitAccount: 'm2m-escrow-hold',
        creditAccount: `licensed-asset-royalty (${split.intellectualAssetPct}%)`,
        category: 'idea_asset_royalty',
        amountUsd: assetAmt,
        assetType: job.paymentAsset,
        settlementState: 'settled',
        paymentReference: baseRef,
        txHashNote: null,
        createdAt: now
      });
    }

    state.ledgerEntries.unshift(...newEntries);
    const reservation = state.reservations.find((r) => r.jobId === job.id);
    if (reservation) reservation.status = 'settled';
    if (contract) contract.status = 'fulfilled';

    job.escrowReserved = false;
    job.status = 'SETTLED';
    job.settledAt = now;
    state.riskReserve.jobFailureExposureUsd = Math.max(0, +(state.riskReserve.jobFailureExposureUsd - gross).toFixed(2));

    addAudit(
      'payment_settled',
      'Escrow Settlement Engine',
      `Settled ${job.jobCode} ($${gross.toFixed(2)} ${job.paymentAsset}): Provider $${providerAmt}, Parent Royalty $${parentAmt}, Asset $${assetAmt}, Platform $${platformAmt}`,
      provider.id,
      job.id
    );
    saveState();
    res.status(200).json({ success: true, job, ledgerEntries: newEntries, state });
  });

  // 10. ROBOT MINER NETWORK (CONSENT, PRIVACY & SENSOR BATCHES)
  app.post('/api/m2m/robot-miners/register', (req: Request, res: Response) => {
    const { deviceName, deviceType, ownerEmail, authorizedSensors, consentGranted } = req.body;
    if (!deviceName || !deviceType || !ownerEmail) {
      return res.status(400).json({ success: false, error: 'deviceName, deviceType, and ownerEmail are required' });
    }
    if (!consentGranted) {
      return res.status(400).json({ success: false, error: 'Explicit device owner consent is mandatory before registration.' });
    }

    const sensors: string[] = Array.isArray(authorizedSensors)
      ? authorizedSensors
      : ['ambient_telemetry'];
    const machineId = `m2m-rm-${Date.now().toString(36).slice(-5)}`;
    const code = `M2M-RM-${String(state.robotMiners.length + 1).padStart(2, '0')}`;
    const now = new Date().toISOString();

    const machine: M2MMachine = {
      id: machineId,
      machineCode: code,
      ownerId: `owner-${ownerEmail.split('@')[0]}`,
      ownerEmail,
      name: String(deviceName).trim(),
      category: 'Robot Miner',
      machineType: deviceType,
      specialization: `${deviceType} Telemetry`,
      purpose: 'Owner-consented edge telemetry & real-world sensor intelligence',
      parentMachineId: null,
      colonyId: state.colonies[0]?.id || null,
      capabilities: ['sensor_data_processing', ...sensors],
      authorizedOperations: ['submit_consented_batch'],
      apiIdentity: `m2m_api_${machineId}`,
      economicAccountId: `acct-${machineId}`,
      reputationScore: 85,
      reliabilityRating: 100,
      verificationStatus: 'verified',
      availableResources: `${deviceType} Edge Device`,
      currentWorkloadPct: 5,
      operationalStatus: 'idle',
      healthStatus: 'healthy',
      governanceLevel: 3,
      operatingBudgetUsd: 10,
      computeBudgetUsd: 5,
      maxChildren: 0,
      parentRoyaltyPct: 0,
      creationCostUsd: 0,
      provisioningCostUsd: 0,
      totalEarningsUsd: 0,
      operatingExpensesUsd: 0,
      completedJobsCount: 0,
      failedJobsCount: 0,
      disputedJobsCount: 0,
      approvedOperatingHours: 'Owner Controlled',
      riskLimitUsd: 25,
      lastHeartbeat: now,
      createdAt: now,
      passport: {
        passportSerial: `PASSPORT-${code}-V18`,
        machineId,
        ownerEmail,
        softwareVersion: 'robot-miner-pwa/18.0',
        hardwareSpecs: `${deviceType} · Location OFF by default`,
        certifications: ['Consent Verified', 'PII-Stripped Telemetry'],
        authorizedDataPermissions: sensors,
        slaTargetAvailabilityPct: 85,
        slaMaxResponseSec: 30,
        securityStatus: 'compliant',
        verificationHash: sha256Hex(`${machineId}:${ownerEmail}:${now}`),
        issuedAt: now,
        lastVerifiedAt: now,
        maintenanceHistory: ['Registered with explicit consent; GPS location disabled by default']
      }
    };

    const miner: M2MRobotMiner = {
      id: `rm-${Date.now().toString(36)}`,
      machineId,
      deviceName: machine.name,
      deviceType,
      ownerEmail,
      consentGranted: true,
      locationCollectionEnabled: false, // Mandatory privacy default OFF
      authorizedSensors: sensors,
      privacyNoticeAccepted: true,
      miningPaused: false,
      submittedBatches: 0,
      acceptedBatches: 0,
      rejectedBatches: 0,
      pendingEarningsUsd: 0,
      settledEarningsUsd: 0,
      operatingCostUsd: 0,
      dataQualityScore: 95,
      lastSubmissionAt: now
    };

    state.machines.push(machine);
    state.robotMiners.unshift(miner);
    state.economicAccounts.push({
      id: `acct-${machineId}`,
      machineId,
      machineName: machine.name,
      ownerEmail,
      fiatUsdBalance: 0,
      platformCreditBalance: 0,
      ideaCoinBalance: 0,
      usdcBalance: 0,
      reservedEscrowUsd: 0,
      withdrawalLimitUsd: 25,
      requireOwnerApprovalAboveUsd: 25
    });

    addAudit('consent_updated', ownerEmail, `Registered Robot Miner ${code} (${deviceType}) with GPS Location OFF default`, machineId);
    saveState();
    res.status(201).json({ success: true, miner, state });
  });

  app.patch('/api/m2m/robot-miners/:id/consent', (req: Request, res: Response) => {
    const { id } = req.params;
    const { miningPaused, locationCollectionEnabled, consentGranted } = req.body;
    const miner = state.robotMiners.find((r) => r.id === id);
    if (!miner) return res.status(404).json({ success: false, error: 'Robot miner not found' });

    if (typeof miningPaused === 'boolean') miner.miningPaused = miningPaused;
    if (typeof locationCollectionEnabled === 'boolean') miner.locationCollectionEnabled = locationCollectionEnabled;
    if (typeof consentGranted === 'boolean') miner.consentGranted = consentGranted;

    const machine = state.machines.find((m) => m.id === miner.machineId);
    if (machine && typeof miningPaused === 'boolean') {
      machine.operationalStatus = miningPaused ? 'paused' : 'idle';
    }

    addAudit('consent_updated', miner.ownerEmail, `Updated privacy/pause controls on ${miner.deviceName} (paused=${miner.miningPaused}, gps=${miner.locationCollectionEnabled})`, miner.machineId);
    saveState();
    res.status(200).json({ success: true, miner, state });
  });

  app.post('/api/m2m/robot-miners/:id/submit-data', (req: Request, res: Response) => {
    const { id } = req.params;
    const { sensorType, containsRawPii } = req.body;
    const miner = state.robotMiners.find((r) => r.id === id);
    if (!miner) return res.status(404).json({ success: false, error: 'Robot miner not found' });
    if (miner.miningPaused || !miner.consentGranted) {
      return res.status(400).json({ success: false, error: 'Submission blocked: device is paused or owner consent withdrawn.' });
    }
    if (containsRawPii) {
      miner.rejectedBatches += 1;
      saveState();
      return res.status(400).json({ success: false, error: 'Rejected by Privacy Gate: raw PII / PIN / card / facial identity prohibited.' });
    }
    if (sensorType && !miner.authorizedSensors.includes(sensorType)) {
      return res.status(403).json({ success: false, error: `Unauthorized sensor access rejected: ${sensorType} is not in owner consent profile.` });
    }

    miner.submittedBatches += 1;
    miner.acceptedBatches += 1;
    miner.lastSubmissionAt = new Date().toISOString();
    addAudit('result_submitted', miner.ownerEmail, `Accepted minimized telemetry batch from ${miner.deviceName} (sensor=${sensorType || 'default'})`, miner.machineId);
    saveState();
    res.status(200).json({ success: true, miner, state });
  });

  // 11. OWNER APPROVAL QUEUE & GLOBAL KILL SWITCH
  app.post('/api/m2m/approvals/:id/resolve', (req: Request, res: Response) => {
    const { id } = req.params;
    const { approved, resolvedBy } = req.body;
    const reqItem = state.approvalRequests.find((a) => a.id === id);
    if (!reqItem) return res.status(404).json({ success: false, error: 'Approval request not found' });
    if (reqItem.status !== 'pending') return res.status(400).json({ success: false, error: 'Already resolved' });

    reqItem.status = approved ? 'approved' : 'rejected';
    reqItem.resolvedBy = resolvedBy || 'cashscanai@gmail.com';
    reqItem.resolvedAt = new Date().toISOString();

    const breedReq = state.breedingRequests.find(
      (b) => b.parentMachineId === reqItem.machineId && b.status === 'pending_approval'
    );
    if (breedReq) {
      if (approved) {
        const parent = state.machines.find((m) => m.id === breedReq.parentMachineId);
        const parentAcct = parent ? state.economicAccounts.find((a) => a.machineId === parent.id) : undefined;
        if (parent && parentAcct && parentAcct.platformCreditBalance >= breedReq.provisioningCostUsd) {
          parentAcct.platformCreditBalance = +(parentAcct.platformCreditBalance - breedReq.provisioningCostUsd).toFixed(2);
          parent.operatingExpensesUsd = +(parent.operatingExpensesUsd + breedReq.provisioningCostUsd).toFixed(2);

          const childId = `m2m-cb-${Date.now().toString(36).slice(-5)}`;
          const childCode = `M2M-CB-${String(state.machines.filter((m) => m.category === 'Child Bot').length + 1).padStart(2, '0')}`;
          const childAcctId = `acct-${childId}`;
          const now = new Date().toISOString();
          const specKey = breedReq.requestedSpecialization.toLowerCase().replace(/[^a-z0-9]+/g, '_');

          const childMachine: M2MMachine = {
            id: childId,
            machineCode: childCode,
            ownerId: parent.ownerId,
            ownerEmail: parent.ownerEmail,
            name: `${breedReq.requestedSpecialization} (${childCode})`,
            category: 'Child Bot',
            machineType: 'Specialist Worker',
            specialization: breedReq.requestedSpecialization,
            purpose: `Level 4 owner-approved child under ${parent.machineCode}: ${breedReq.evidenceSummary}`,
            parentMachineId: parent.id,
            colonyId: parent.colonyId,
            capabilities: [specKey, 'data_verification'],
            authorizedOperations: ['accept_job', 'submit_verified_output'],
            apiIdentity: `m2m_api_${childId}`,
            economicAccountId: childAcctId,
            reputationScore: 80,
            reliabilityRating: 100,
            verificationStatus: 'verified',
            availableResources: '2 vCPU · 4 GB RAM · CE Colony Sandbox',
            currentWorkloadPct: 0,
            operationalStatus: 'idle',
            healthStatus: 'healthy',
            governanceLevel: 3,
            operatingBudgetUsd: breedReq.expectedOperatingCostUsd,
            computeBudgetUsd: breedReq.provisioningCostUsd,
            maxChildren: 0,
            parentRoyaltyPct: parent.parentRoyaltyPct,
            creationCostUsd: breedReq.provisioningCostUsd,
            provisioningCostUsd: breedReq.provisioningCostUsd,
            totalEarningsUsd: 0,
            operatingExpensesUsd: 0,
            completedJobsCount: 0,
            failedJobsCount: 0,
            disputedJobsCount: 0,
            approvedOperatingHours: parent.approvedOperatingHours,
            riskLimitUsd: Math.min(100, parent.riskLimitUsd),
            lastHeartbeat: now,
            createdAt: now,
            passport: {
              passportSerial: `PASSPORT-${childCode}-V18`,
              machineId: childId,
              ownerEmail: parent.ownerEmail,
              softwareVersion: 'child-worker/18.0.0',
              hardwareSpecs: 'CE Colony Worker · 2 vCPU / 4 GB RAM',
              certifications: [`Lineage: ${parent.machineCode}`, 'Level 4 Owner-Approved Spawn'],
              authorizedDataPermissions: ['job_scoped_inputs_only'],
              slaTargetAvailabilityPct: 98.5,
              slaMaxResponseSec: 12,
              securityStatus: 'compliant',
              verificationHash: sha256Hex(`${childId}:${parent.id}:${now}`),
              issuedAt: now,
              lastVerifiedAt: now,
              maintenanceHistory: [`Provisioned upon Level 4 Owner Approval under ${parent.machineCode}`]
            }
          };

          state.machines.push(childMachine);
          state.economicAccounts.push({
            id: childAcctId,
            machineId: childId,
            machineName: childMachine.name,
            ownerEmail: parent.ownerEmail,
            fiatUsdBalance: 0,
            platformCreditBalance: breedReq.expectedOperatingCostUsd,
            ideaCoinBalance: 0,
            usdcBalance: 0,
            reservedEscrowUsd: 0,
            withdrawalLimitUsd: 50,
            requireOwnerApprovalAboveUsd: 40
          });
          if (parent.colonyId) {
            const col = state.colonies.find((c) => c.id === parent.colonyId);
            if (col) col.participatingMachineIds.push(childId);
          }
          breedReq.createdChildMachineId = childId;
        }
        breedReq.status = 'provisioned';
      } else {
        breedReq.status = 'rejected';
      }
    }

    addAudit('approval_resolved', reqItem.resolvedBy || 'cashscanai@gmail.com', `${approved ? 'Approved' : 'Rejected'} Level 4 request: ${reqItem.summary}`, reqItem.machineId);
    saveState();
    res.status(200).json({ success: true, approval: reqItem, state });
  });

  // CREATE SWARM COLONY
  app.post('/api/m2m/colonies/create', (req: Request, res: Response) => {
    const { name, specialty, ownerEmail, motherMachineId, resourceBudgetUsd, maxSwarmSize, operatingPolicy } = req.body;
    if (!name || !specialty || !ownerEmail) {
      return res.status(400).json({ success: false, error: 'name, specialty, and ownerEmail are required' });
    }
    const now = new Date().toISOString();
    const colonyId = `col-${Date.now().toString(36)}`;
    const colonyCode = `COL-${String(state.colonies.length + 1).padStart(2, '0')}`;
    const colony = {
      id: colonyId,
      colonyCode,
      name: String(name).trim(),
      specialty: String(specialty).trim(),
      ownerEmail: String(ownerEmail).trim(),
      motherMachineId: motherMachineId || null,
      participatingMachineIds: motherMachineId ? [String(motherMachineId)] : [],
      sharedCapabilities: String(specialty)
        .toLowerCase()
        .split(/[\s,/]+/)
        .filter(Boolean),
      resourceBudgetUsd: Math.max(25, Number(resourceBudgetUsd) || 100),
      maxSwarmSize: Math.min(25, Math.max(2, Number(maxSwarmSize) || 10)),
      isPaused: false,
      operatingPolicy: operatingPolicy || 'Evidence-based expansion, anti-self-dealing & Level 4 owner budget cap enforced',
      createdAt: now
    };
    state.colonies.unshift(colony);
    addAudit('colony_expanded', String(ownerEmail), `Created Swarm Colony ${colonyCode} (${colony.name})`, motherMachineId || undefined);
    saveState();
    res.status(201).json({ success: true, colony, state });
  });

  app.post('/api/m2m/governance/kill-switch', (req: Request, res: Response) => {
    const { active, actor, reason } = req.body;
    state.globalKillSwitchActive = Boolean(active);

    if (state.globalKillSwitchActive) {
      state.machines = state.machines.map((m) =>
        m.operationalStatus !== 'retired' ? { ...m, operationalStatus: 'paused' } : m
      );
      state.colonies = state.colonies.map((c) => ({ ...c, isPaused: true }));
    } else {
      state.machines = state.machines.map((m) =>
        m.operationalStatus === 'paused' ? { ...m, operationalStatus: 'idle' } : m
      );
      state.colonies = state.colonies.map((c) => ({ ...c, isPaused: false }));
    }

    addAudit(
      'kill_switch_toggled',
      actor || 'cashscanai@gmail.com',
      `Global Kill Switch ${state.globalKillSwitchActive ? 'ACTIVATED' : 'RELEASED'}: ${reason || 'Owner Governance Command'}`
    );
    saveState();
    res.status(200).json({ success: true, globalKillSwitchActive: state.globalKillSwitchActive, state });
  });

  // 12. ECONOMIC DIGITAL TWIN SIMULATION (STRICTLY LABELED, NEVER REAL REVENUE)
  app.post('/api/m2m/economic-twin/simulate', (req: Request, res: Response) => {
    const { scenarioName, simulatedInstances, simulatedPriceUsd } = req.body;
    const instances = Math.max(1, Math.min(50, Number(simulatedInstances) || 3));
    const price = Math.max(1, Number(simulatedPriceUsd) || 35);
    const gross = +(instances * price * 4).toFixed(2);
    const cost = +(gross * 0.18).toFixed(2);
    const net = +(gross - cost).toFixed(2);

    const run = {
      id: `sim-${Date.now().toString(36)}`,
      scenarioName: scenarioName || `Swarm Scenario (${instances} nodes)`,
      simulatedInstances: instances,
      simulatedPriceUsd: price,
      projectedGrossUsd: gross,
      projectedCostUsd: cost,
      projectedNetUsd: net,
      label: 'SIMULATION ONLY — NOT REAL REVENUE' as const,
      runAt: new Date().toISOString()
    };
    state.digitalTwinRuns.unshift(run);
    saveState();
    res.status(200).json({ success: true, run, state });
  });

  // 13. GLOBAL MACHINE DISCOVERY PROTOCOL API (External Developer & Machine Interface)
  app.get('/api/m2m/discovery/services', (req: Request, res: Response) => {
    const category = typeof req.query.category === 'string' ? req.query.category.toLowerCase() : '';
    const capability = typeof req.query.capability === 'string' ? req.query.capability.toLowerCase() : '';

    const filtered = state.serviceListings.filter((s) => {
      if (category && !s.category.toLowerCase().includes(category)) return false;
      if (capability && !s.capabilities.some((c) => c.toLowerCase().includes(capability))) return false;
      return true;
    });

    res.status(200).json({
      protocol: 'M2M-ORE-DISCOVERY-V18',
      rateLimitPolicy: '60 req/min per API identity',
      killSwitchActive: state.globalKillSwitchActive,
      count: filtered.length,
      services: filtered
    });
  });

  app.post('/api/m2m/discovery/register', (req: Request, res: Response) => {
    const apiKey = req.headers['x-m2m-api-key'];
    if (!apiKey || String(apiKey).length < 8) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required: provide valid X-M2M-API-KEY header (minimum 8 chars) to register external machine capabilities.'
      });
    }

    const { machineName, ownerEmail, capabilityKey, endpointUrl, priceUsd } = req.body;
    if (!machineName || !ownerEmail || !capabilityKey) {
      return res.status(400).json({ success: false, error: 'machineName, ownerEmail, and capabilityKey required' });
    }

    const listingId = `svc-ext-${Date.now().toString(36)}`;
    state.serviceListings.unshift({
      id: listingId,
      providerMachineId: 'external-partner',
      providerMachineName: String(machineName),
      serviceName: `${machineName} · ${capabilityKey}`,
      category: 'API execution',
      description: `External authorized machine registered via Global Machine Discovery Protocol (${ownerEmail})`,
      capabilities: [String(capabilityKey)],
      inputFormat: 'application/json',
      outputFormat: 'application/json + signed hash',
      priceUsd: Math.max(1, Number(priceUsd) || 15),
      paymentAsset: 'PLATFORM_CREDIT',
      availability: 'available',
      slaDeliveryMinutes: 15,
      reputationScore: 80,
      verificationMethod: 'External API Response Hash + Owner Review',
      apiEndpoint: endpointUrl || `/api/m2m/discovery/services/${listingId}`,
      licenseTerms: 'Scoped External Machine Agreement'
    });

    addAudit('machine_registered', String(ownerEmail), `External machine service "${machineName}" registered via Global Discovery API`, undefined);
    saveState();
    res.status(201).json({ success: true, listingId, state });
  });
}
