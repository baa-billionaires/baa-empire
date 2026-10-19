import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Shield, KeyRound, AlertCircle, CheckCircle2, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { adminLogin } = useEcosystem();
  const [email, setEmail] = useState('naijaukmusicalfusion@gmail.com');
  const [password, setPassword] = useState('RichConnectVault2026!Secure');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      const ok = adminLogin(email, password);
      setLoading(false);
      if (ok) {
        onSuccess();
        onClose();
      } else {
        setError('Invalid administrative vault credentials. Verify email & master passkey.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('naijaukmusicalfusion@gmail.com');
    setPassword('RichConnectVault2026!Secure');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-zinc-950 border border-[#FFD700]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-[#FFD700]/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vault Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-black border border-[#FFD700] flex items-center justify-center mb-3">
            <Shield className="w-7 h-7 text-[#FFD700]" />
          </div>
          <h3 className="text-xl font-heading font-black text-white tracking-tight">
            RICHCONNECT VAULT ACCESS
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Autonomous Command, AI Scout Engine &amp; 60/40 Revenue Control
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-zinc-500 transition outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
              Master Vault Passkey
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] rounded-xl px-4 py-2.5 text-sm text-white font-mono placeholder-zinc-500 transition outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition shadow-lg shadow-[#FFD700]/20 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{loading ? 'Authenticating Vault...' : 'Unlock Admin Vault'}</span>
            </button>
          </div>
        </form>

        {/* Demo Quick-Fill Helper */}
        <div className="mt-4 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span>Auth: naijaukmusicalfusion</span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[#00D4FF] hover:underline flex items-center gap-1"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-fill Preset
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminLoginModal;
