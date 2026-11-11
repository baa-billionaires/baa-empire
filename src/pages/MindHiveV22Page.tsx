import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { MindHiveV22State } from '../types/mindHiveV22';
import { INITIAL_MIND_HIVE_V22_STATE } from '../data/mindHiveV22InitialState';
import { MindHiveV22MasterHub } from '../components/mindhive-v22/MindHiveV22MasterHub';
import { KcxDashboard } from '../components/mindhive-v22/kcx/KcxDashboard';
import { GkaDashboard } from '../components/mindhive-v22/gka/GkaDashboard';
import { HavcDashboard } from '../components/mindhive-v22/havc/HavcDashboard';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface MindHiveV22PageProps {
  initialSystem?: 'hub' | 'kcx' | 'gka' | 'havc';
  onNavigate?: (page: string) => void;
}

export const MindHiveV22Page: React.FC<MindHiveV22PageProps> = ({
  initialSystem = 'hub',
  onNavigate
}) => {
  const { navigateTo } = useNavigation();
  const [state, setState] = useState<MindHiveV22State>(INITIAL_MIND_HIVE_V22_STATE);
  const [activeSystem, setActiveSystem] = useState<'hub' | 'kcx' | 'gka' | 'havc'>(initialSystem);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Sync initialSystem prop if it changes
  useEffect(() => {
    if (initialSystem) {
      setActiveSystem(initialSystem);
    }
  }, [initialSystem]);

  // Fetch state on mount from backend
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch('/api/mindhive-v22/state');
        if (res.ok) {
          const data = await res.json();
          if (data?.state) {
            setState(data.state);
          }
        }
      } catch (err) {
        console.warn('Failed to load remote V22 state, using local initial state:', err);
      }
    };
    fetchState();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleColonyJump = (colony: string) => {
    if (onNavigate) {
      onNavigate(colony);
    } else {
      navigateTo(colony);
    }
  };

  // KCX API Actions
  const handleRegisterAsset = async (assetData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/kcx/asset/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register asset');

      setState((prev) => ({
        ...prev,
        kcx: {
          ...prev.kcx,
          assets: [data.asset, ...prev.kcx.assets]
        },
        summaryMetrics: {
          ...prev.summaryMetrics,
          totalRegisteredAssets: prev.summaryMetrics.totalRegisteredAssets + 1,
          totalKnowledgeCapitalValueUsd: prev.summaryMetrics.totalKnowledgeCapitalValueUsd + (data.asset.listingPriceUsd || 3500)
        }
      }));
      showNotification('success', data.message || 'Asset registered and listed in KCX!');
    } catch (err: any) {
      showNotification('error', err.message || 'Registration failed');
      throw err;
    }
  };

  const handleSubmitOffer = async (offerData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/kcx/offer/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(offerData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit offer');

      setState((prev) => ({
        ...prev,
        kcx: {
          ...prev.kcx,
          offers: [data.offer, ...prev.kcx.offers]
        }
      }));
      showNotification('success', data.message || 'Offer submitted successfully!');
    } catch (err: any) {
      showNotification('error', err.message || 'Offer submission failed');
      throw err;
    }
  };

  const handleAdvanceOffer = async (offerId: string, nextStage: string) => {
    try {
      const res = await fetch('/api/mindhive-v22/kcx/offer/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ offerId, nextStage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to advance offer');

      setState((prev) => {
        const updatedOffers = prev.kcx.offers.map((o) => (o.id === offerId ? data.offer : o));
        return {
          ...prev,
          kcx: {
            ...prev.kcx,
            offers: updatedOffers
          }
        };
      });
      showNotification('success', data.message || `Offer advanced to ${nextStage}`);
    } catch (err: any) {
      showNotification('error', err.message || 'Stage advance failed');
      throw err;
    }
  };

  const handleComputeValuation = async (valData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/kcx/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Valuation failed');
      return data;
    } catch (err: any) {
      showNotification('error', err.message || 'Valuation computation failed');
      throw err;
    }
  };

  // GKA API Actions
  const handleDiscoverGap = async (gapData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/gka/gap/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gapData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to record gap');

      setState((prev) => ({
        ...prev,
        gka: {
          ...prev.gka,
          knowledgeGaps: [data.gap, ...prev.gka.knowledgeGaps]
        },
        summaryMetrics: {
          ...prev.summaryMetrics,
          identifiedKnowledgeGapsCount: prev.summaryMetrics.identifiedKnowledgeGapsCount + 1
        }
      }));
      showNotification('success', data.message || 'Knowledge gap recorded!');
    } catch (err: any) {
      showNotification('error', err.message || 'Gap recording failed');
      throw err;
    }
  };

  // HAVC API Actions
  const handleCreateProject = async (projData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/havc/project/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create project');

      setState((prev) => ({
        ...prev,
        havc: {
          ...prev.havc,
          projects: [data.project, ...prev.havc.projects]
        },
        summaryMetrics: {
          ...prev.summaryMetrics,
          cooperativeProjectsCount: prev.summaryMetrics.cooperativeProjectsCount + 1
        }
      }));
      showNotification('success', data.message || 'Collaborative project launched!');
    } catch (err: any) {
      showNotification('error', err.message || 'Project creation failed');
      throw err;
    }
  };

  const handleAddContributionDna = async (dnaData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/havc/contribution/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dnaData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add DNA record');

      setState((prev) => ({
        ...prev,
        havc: {
          ...prev.havc,
          dnaRecords: [data.dnaRecord, ...prev.havc.dnaRecords]
        }
      }));
      showNotification('success', data.message || 'Contribution DNA recorded!');
    } catch (err: any) {
      showNotification('error', err.message || 'DNA recording failed');
      throw err;
    }
  };

  const handleSettleDistribution = async (distData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/havc/distribute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(distData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Distribution failed');

      setState((prev) => ({
        ...prev,
        havc: {
          ...prev.havc,
          distributions: [data.distribution, ...prev.havc.distributions]
        },
        summaryMetrics: {
          ...prev.summaryMetrics,
          totalSettledRevenueNgn: prev.summaryMetrics.totalSettledRevenueNgn + (data.distribution.totalGrossPaymentNgn || 0),
          totalSettledRevenueUsd: prev.summaryMetrics.totalSettledRevenueUsd + (data.distribution.totalGrossPaymentUsd || 0)
        }
      }));
      showNotification('success', data.message || 'Shared value distribution executed!');
    } catch (err: any) {
      showNotification('error', err.message || 'Distribution execution failed');
      throw err;
    }
  };

  const handleFileDispute = async (dispData: any) => {
    try {
      const res = await fetch('/api/mindhive-v22/havc/dispute/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dispData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Dispute filing failed');

      setState((prev) => ({
        ...prev,
        havc: {
          ...prev.havc,
          disputes: [data.dispute, ...prev.havc.disputes]
        }
      }));
      showNotification('success', data.message || 'Dispute queued for arbitration!');
    } catch (err: any) {
      showNotification('error', err.message || 'Dispute filing failed');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans pb-24 selection:bg-indigo-500 selection:text-white">
      {/* Background Matrix Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366F108_1px,transparent_1px),linear-gradient(to_bottom,#6366F108_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Toast Notification Bar */}
        {notification && (
          <div
            className={`p-4 rounded-2xl border text-xs font-mono flex items-center justify-between gap-3 animate-fadeIn ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300'
                : 'bg-rose-950/90 border-rose-500 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-zinc-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Master Hub (Always visible or rendered when activeSystem === 'hub') */}
        {activeSystem === 'hub' && (
          <MindHiveV22MasterHub
            state={state}
            activeSystem={activeSystem}
            onSelectSystem={setActiveSystem}
            onNavigateToColony={handleColonyJump}
          />
        )}

        {/* System 1: Knowledge Capital Exchange (KCX) */}
        {activeSystem === 'kcx' && (
          <KcxDashboard
            state={state}
            onRegisterAsset={handleRegisterAsset}
            onSubmitOffer={handleSubmitOffer}
            onAdvanceOffer={handleAdvanceOffer}
            onComputeValuation={handleComputeValuation}
            onBackToMaster={() => setActiveSystem('hub')}
          />
        )}

        {/* System 2: Global Knowledge Atlas (GKA) */}
        {activeSystem === 'gka' && (
          <GkaDashboard
            state={state}
            onDiscoverGap={handleDiscoverGap}
            onBackToMaster={() => setActiveSystem('hub')}
          />
        )}

        {/* System 3: Human–AI Value Cooperative (HAVC) */}
        {activeSystem === 'havc' && (
          <HavcDashboard
            state={state}
            onCreateProject={handleCreateProject}
            onAddContributionDna={handleAddContributionDna}
            onSettleDistribution={handleSettleDistribution}
            onFileDispute={handleFileDispute}
            onBackToMaster={() => setActiveSystem('hub')}
          />
        )}
      </div>
    </div>
  );
};

export default MindHiveV22Page;
