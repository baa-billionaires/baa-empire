import React, { useState } from 'react';
import {
  X,
  Wallet,
  ShieldCheck,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { SupportedChain } from '../../types/aurum';

interface AurumWalletScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: () => void;
}

export const AurumWalletScanModal: React.FC<AurumWalletScanModalProps> = ({
  isOpen,
  onClose,
  onScanComplete
}) => {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState<SupportedChain>('ethereum');
  const [label, setLabel] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError('Please provide a public wallet address.');
      return;
    }
    setError(null);
    setIsScanning(true);

    try {
      const res = await fetch('/api/aurum/wallets/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address.trim(),
          chain,
          label: label.trim() || undefined
        })
      });
      const data = await res.json();
      if (data.success) {
        onScanComplete();
        onClose();
      } else {
        setError(data.error || 'Failed to scan wallet');
      }
    } catch (err: any) {
      setError(err.message || 'Scan error');
    } finally {
      setIsScanning(false);
    }
  };

  const handleUseSampleAddress = (sample: string, sampleChain: SupportedChain) => {
    setAddress(sample);
    setChain(sampleChain);
    setLabel(`Sample ${sampleChain.toUpperCase()} Cold Vault`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Read-Only Multi-Chain Wallet Scan</h3>
              <p className="text-xs text-slate-400">Discover residual dust and dormant digital assets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Zero Private Key Security Notice */}
        <div className="my-4 p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300">
            <span className="font-bold text-amber-300">Read-Only Guarantee:</span> AURUM never requests, stores, or handles private keys or seed phrases. All inquiries query public blockchain states directly.
          </div>
        </div>

        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Select Blockchain Network
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {(['ethereum', 'base', 'bsc', 'polygon', 'solana'] as SupportedChain[]).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setChain(c)}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border text-center uppercase transition-all cursor-pointer ${
                    chain === c
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Public Wallet Address
            </label>
            <input
              type="text"
              placeholder={chain === 'solana' ? 'Solana public base58 address...' : '0x...'}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Wallet Label (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. My Ledger Cold Storage"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Quick Sample Buttons */}
          <div className="pt-1">
            <span className="text-[11px] text-slate-400 block mb-1.5">Or try a sample wallet:</span>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  handleUseSampleAddress(
                    '0x71C8B227A8F3b5eB18129Fa483984E347aB9284F',
                    'ethereum'
                  )
                }
                className="text-[11px] px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-amber-500/50 cursor-pointer font-mono"
              >
                0x71C8... (Ethereum)
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUseSampleAddress(
                    '0x992B215E98F1Ca5B821A85859Db195E68C6aA691',
                    'base'
                  )
                }
                className="text-[11px] px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:border-amber-500/50 cursor-pointer font-mono"
              >
                0x992B... (Base L2)
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
              {error}
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isScanning}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              {isScanning ? 'Executing RPC Scan...' : 'Start Read-Only Scan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
