import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import {
  ShieldAlert,
  Lock,
  Unlock,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Sparkles,
  Layers,
  Radio
} from 'lucide-react';

interface AdminGateProps {
  onBackToPublic: () => void;
  onSuccess?: () => void;
  targetFeatureName?: string;
}

export const AdminGate: React.FC<AdminGateProps> = ({
  onBackToPublic,
  onSuccess,
  targetFeatureName = 'Autonomous Command Vault'
}) => {
  const { adminLogin } = useEcosystem();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('admin@billionairesai.academy');
  const [error, setError] = useState('');
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter sovereign access key');
      return;
    }
    const ok = adminLogin(email, password);
    if (ok) {
      setError('');
      if (onSuccess) onSuccess();
    } else {
      setError('Invalid key. Enter default "admin" or use 1-Click Sovereign Unlock below.');
    }
  };

  const handleInstantUnlock = () => {
    setIsBiometricScanning(true);
    setTimeout(() => {
      adminLogin('admin@billionairesai.academy', 'admin');
      setIsBiometricScanning(false);
      if (onSuccess) onSuccess();
    }, 700);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-red-950/20 text-center relative overflow-hidden">
        {/* Top Glow & Circuit Pattern */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-[#FFD700] to-red-500" />

        {/* Security Shield Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center mb-6">
          <ShieldAlert className="w-8 h-8 text-red-400 animate-pulse" />
        </div>

        <span className="text-xs font-mono text-red-400 font-bold tracking-widest uppercase bg-red-950/30 px-3 py-1 rounded-full border border-red-500/20">
          RESTRICTED ADMIN PROTOCOL
        </span>

        <h1 className="text-2xl sm:text-3xl font-heading font-black text-white mt-4">
          {targetFeatureName}
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md mx-auto leading-relaxed">
          You are currently in <strong className="text-emerald-400">Public Student Mode</strong>. This autonomous control suite manages multi-channel ad budgets, WhatsApp broadcasts, and database operations.
        </p>

        {/* Architecture Separation Map */}
        <div className="my-6 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-left text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-zinc-300 pb-2 border-b border-zinc-800">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" /> Public Campus (Unlocked for Everyone):
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 pl-2">
            100 Academy Courses • AI TV 24/7 • ₦150k Bounties • University • Data Center • Prompt Marketplace • AI Tools • Student Mining Portal
          </p>

          <div className="flex items-center justify-between text-zinc-300 pt-2 pb-1 border-b border-zinc-800">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Admin-Only Autonomous Engine (Protected):
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 pl-2">
            Marketing Command • Social Autopilot • WhatsApp AI Closer &amp; Broadcast • Bulk 100 Course Video Generator • Supabase SQL Vault
          </p>
        </div>

        {/* Unlock Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          <div className="relative">
            <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Enter Sovereign Admin Passkey (default: admin)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-[#FFD700] rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-zinc-500 outline-none font-mono"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 font-mono text-left">{error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#FFD700] hover:bg-[#e6c200] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-[#FFD700]/20"
            >
              <Unlock className="w-4 h-4" />
              <span>Verify &amp; Unlock Admin</span>
            </button>

            <button
              type="button"
              onClick={handleInstantUnlock}
              disabled={isBiometricScanning}
              className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 border border-[#00D4FF]/40 text-[#00D4FF] font-mono text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 animate-spin-slow" />
              <span>{isBiometricScanning ? 'Verifying...' : '1-Click Sovereign Demo Access'}</span>
            </button>
          </div>
        </form>

        {/* Back to Public Campus */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80">
          <button
            onClick={onBackToPublic}
            className="text-xs text-zinc-400 hover:text-white font-mono flex items-center justify-center gap-2 mx-auto transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Academy &amp; Campus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminGate;
