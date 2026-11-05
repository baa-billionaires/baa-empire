import React, { useState } from 'react';
import { X, Sparkles, Plus, AlertCircle } from 'lucide-react';
import { MindHiveGenesisState } from '../../types/mindHiveGenesis';

interface GenesisNewVentureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

export const GenesisNewVentureModal: React.FC<GenesisNewVentureModalProps> = ({
  isOpen,
  onClose,
  onRefresh
}) => {
  const [name, setName] = useState('');
  const [codename, setCodename] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<'AUTONOMOUS_SAAS' | 'DECENTRALIZED_INFRA' | 'HEALTH_AI' | 'AGRI_SUPPLY' | 'FINTECH_RAILS' | 'ROBOTICS_LOGISTICS'>('AUTONOMOUS_SAAS');
  const [problemStatement, setProblemStatement] = useState('');
  const [primaryAuthor, setPrimaryAuthor] = useState('');
  const [computeBudget, setComputeBudget] = useState('350');
  const [operatingBudget, setOperatingBudget] = useState('250');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !problemStatement.trim()) {
      setError('Please provide venture name and problem statement.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/genesis/ventures/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          codename: codename.trim(),
          tagline: tagline.trim(),
          category,
          problemStatement: problemStatement.trim(),
          primaryAuthor: primaryAuthor.trim(),
          computeBudgetMonthlyUsd: computeBudget,
          operatingBudgetMonthlyUsd: operatingBudget
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefresh();
        onClose();
      } else {
        setError(data.error || 'Failed to create venture');
      }
    } catch (err: any) {
      setError(err.message || 'Creation error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Genesis Venture Creation Wizard</h3>
              <p className="text-xs text-slate-400">Initialize a new venture into the 10-stage lifecycle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 my-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Venture Name</label>
              <input
                type="text"
                placeholder="e.g. BioGrid Diagnostics"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Codename</label>
              <input
                type="text"
                placeholder="e.g. PROJECT_HELIOS"
                value={codename}
                onChange={(e) => setCodename(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="AUTONOMOUS_SAAS">Autonomous SaaS & Enterprise APIs</option>
              <option value="DECENTRALIZED_INFRA">Decentralized Infrastructure (CE Colony)</option>
              <option value="HEALTH_AI">Health AI & Biological Computing</option>
              <option value="AGRI_SUPPLY">Agri-Supply & Rural IoT</option>
              <option value="FINTECH_RAILS">Fintech Rails & Treasury Settlement</option>
              <option value="ROBOTICS_LOGISTICS">Robotics & Voice Logistics</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Problem Statement</label>
            <textarea
              rows={3}
              placeholder="What urgent customer problem does this venture solve?..."
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              placeholder="One-sentence commercial hook..."
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Monthly Compute ($)</label>
              <input
                type="number"
                value={computeBudget}
                onChange={(e) => setComputeBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Operating Budget ($)</label>
              <input
                type="number"
                value={operatingBudget}
                onChange={(e) => setOperatingBudget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {isSubmitting ? 'Initializing...' : 'Synthesize Venture DNA'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
