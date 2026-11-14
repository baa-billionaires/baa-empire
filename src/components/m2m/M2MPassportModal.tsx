import React from 'react';
import { X, ShieldCheck, Pause, Play, Ban, Cpu } from 'lucide-react';
import { M2MMachine, M2MEconomicAccount } from '../../types/m2mOre';

interface M2MPassportModalProps {
  machine: M2MMachine | null;
  account?: M2MEconomicAccount;
  parentMachine?: M2MMachine | null;
  onClose: () => void;
  onUpdateStatus: (machineId: string, status: M2MMachine['operationalStatus']) => void;
}

export const M2MPassportModal: React.FC<M2MPassportModalProps> = ({
  machine,
  account,
  parentMachine,
  onClose,
  onUpdateStatus
}) => {
  if (!machine) return null;

  const isPaused = machine.operationalStatus === 'paused';
  const isRetired = machine.operationalStatus === 'retired';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Machine Digital Passport · {machine.passport.passportSerial}</span>
            </div>
            <h3 className="text-xl font-heading font-bold text-white">{machine.name}</h3>
            <div className="text-xs font-mono text-zinc-400">
              {machine.machineCode} · {machine.category} · Owner: {machine.ownerEmail}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
            aria-label="Close Digital Passport"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Operational Status & Quick Owner Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-zinc-900">
          <div className="text-xs font-mono text-zinc-300 space-y-0.5">
            <div>
              Status:{' '}
              <span
                className={
                  machine.operationalStatus === 'paused' || machine.operationalStatus === 'retired'
                    ? 'text-amber-400 font-semibold uppercase'
                    : 'text-emerald-400 font-semibold uppercase'
                }
              >
                {machine.operationalStatus}
              </span>{' '}
              · Health: <span className="text-white">{machine.healthStatus}</span> · Governance: Level {machine.governanceLevel}
            </div>
            <div className="text-zinc-500">
              API Identity: {machine.apiIdentity} · Last Heartbeat: {new Date(machine.lastHeartbeat).toLocaleTimeString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isRetired && (
              <button
                onClick={() => onUpdateStatus(machine.id, isPaused ? 'idle' : 'paused')}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-white flex items-center gap-1.5 cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isPaused ? 'Resume' : 'Pause Machine'}</span>
              </button>
            )}
            {!isRetired && (
              <button
                onClick={() => onUpdateStatus(machine.id, 'retired')}
                className="px-3 py-1.5 rounded-lg bg-red-950/50 hover:bg-red-900/60 border border-red-800/60 text-xs font-mono text-red-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Ban className="w-3.5 h-3.5" />
                <span>Retire</span>
              </button>
            )}
          </div>
        </div>

        {/* Verification & Performance Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs tabular-nums">
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Reputation</span>
            <span className="text-lg font-bold text-white">{machine.reputationScore}/100</span>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Completed Jobs</span>
            <span className="text-lg font-bold text-emerald-400">{machine.completedJobsCount}</span>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Verified Earnings</span>
            <span className="text-lg font-bold text-white">${machine.totalEarningsUsd.toFixed(2)}</span>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">Operating Costs</span>
            <span className="text-lg font-bold text-zinc-300">${machine.operatingExpensesUsd.toFixed(2)}</span>
          </div>
        </div>

        {/* Capabilities, Hardware & Genealogy */}
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="font-mono text-zinc-500 uppercase text-[10px]">Registered Capabilities</div>
              <div className="text-zinc-200 font-mono">{machine.capabilities.join(' · ')}</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-zinc-500 uppercase text-[10px]">Authorized Operations</div>
              <div className="text-zinc-200 font-mono">{machine.authorizedOperations.join(' · ')}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-900">
            <div className="space-y-1">
              <div className="font-mono text-zinc-500 uppercase text-[10px]">Hardware & Software Version</div>
              <div className="text-zinc-300 font-mono flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{machine.passport.softwareVersion} · {machine.passport.hardwareSpecs}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-zinc-500 uppercase text-[10px]">Lineage & SLA Commitment</div>
              <div className="text-zinc-300 font-mono">
                Parent: {parentMachine ? `${parentMachine.machineCode} (${parentMachine.name})` : 'Root / Independent'} · SLA {machine.passport.slaTargetAvailabilityPct}% (&le;{machine.passport.slaMaxResponseSec}s)
              </div>
            </div>
          </div>

          {account && (
            <div className="pt-2 border-t border-zinc-900 space-y-1">
              <div className="font-mono text-zinc-500 uppercase text-[10px]">Segregated Economic Account Balances</div>
              <div className="text-xs font-mono text-zinc-300 tabular-nums">
                Platform Credits: ${account.platformCreditBalance.toFixed(2)} · Fiat USD: ${account.fiatUsdBalance.toFixed(2)} · Reserved Escrow: ${account.reservedEscrowUsd.toFixed(2)} · Idea Coins: {account.ideaCoinBalance.toFixed(2)} · USDC: {account.usdcBalance.toFixed(4)}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-zinc-900 space-y-1">
            <div className="font-mono text-zinc-500 uppercase text-[10px]">Cryptographic Attestation & Maintenance History</div>
            <div className="text-[11px] font-mono text-cyan-300 break-all">{machine.passport.verificationHash}</div>
            <ul className="space-y-1 text-zinc-400 font-mono text-[11px] pt-1">
              {machine.passport.maintenanceHistory.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
