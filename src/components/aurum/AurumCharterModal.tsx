import React from 'react';
import { X, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AURUM_ETHICAL_RULES } from '../../data/aurumData';

interface AurumCharterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AurumCharterModal: React.FC<AurumCharterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AURUM COLONY V13 — Core Charter & Principles</h3>
              <p className="text-xs text-slate-400">Autonomous Digital Asset Refinery Security Constitution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
            &ldquo;DISCOVER THE ASSET. VERIFY THE RIGHTS. ASSESS THE RISK. CREATE REAL UTILITY. CONNECT IT TO DEMAND. RECORD REAL REVENUE.&rdquo;
          </div>

          <div className="space-y-3">
            {AURUM_ETHICAL_RULES.map((rule, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{rule.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-5.5">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Understood & Confirmed
          </button>
        </div>
      </div>
    </div>
  );
};
