import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { MindHiveV20State } from '../types/mindHiveV20';
import { INITIAL_MIND_HIVE_V20_STATE } from '../data/mindHiveV20InitialState';
import { MindHiveV20Header } from '../components/mindhive-v20/MindHiveV20Header';
import { MindHiveV20Overview } from '../components/mindhive-v20/MindHiveV20Overview';
import { ContentGenomeSection } from '../components/mindhive-v20/ContentGenomeSection';
import { ContentMultiplierSection } from '../components/mindhive-v20/ContentMultiplierSection';
import { KnowledgeMiningSection } from '../components/mindhive-v20/KnowledgeMiningSection';
import { GlobalAiTrainingSection } from '../components/mindhive-v20/GlobalAiTrainingSection';
import { ModelForgeSection } from '../components/mindhive-v20/ModelForgeSection';
import { BuyerLegionsSection } from '../components/mindhive-v20/BuyerLegionsSection';
import { RoyaltyLedgerSection } from '../components/mindhive-v20/RoyaltyLedgerSection';
import { ContentRegistrationForm } from '../components/mindhive-v20/ContentRegistrationForm';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface MindHiveV20PageProps {
  onNavigate?: (page: string) => void;
}

export const MindHiveV20Page: React.FC<MindHiveV20PageProps> = ({ onNavigate }) => {
  const { navigateTo } = useNavigation();
  const [state, setState] = useState<MindHiveV20State>(INITIAL_MIND_HIVE_V20_STATE);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch state on mount
  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch('/api/mindhive-v20/state');
        if (res.ok) {
          const data = await res.json();
          if (data?.state) {
            setState(data.state);
          }
        }
      } catch (err) {
        console.warn('Failed to load remote V20 state, using local initial state:', err);
      } finally {
        setLoading(false);
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

  // Action: Register Asset
  const handleRegisterAsset = async (assetData: any) => {
    try {
      const res = await fetch('/api/mindhive-v20/assets/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assetData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register asset');

      setState((prev) => ({
        ...prev,
        assets: [data.asset, ...prev.assets],
        stats: {
          ...prev.stats,
          totalRegisteredAssets: prev.stats.totalRegisteredAssets + 1
        }
      }));
      showNotification('success', data.message || 'Asset successfully minted into Content Genome!');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to register asset');
      throw err;
    }
  };

  // Action: Multiply Asset
  const handleGenerateDerivative = async (assetId: string, type: any, title?: string) => {
    try {
      const res = await fetch('/api/mindhive-v20/multiply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId, derivativeType: type, customTitle: title })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to multiply asset');

      setState((prev) => ({
        ...prev,
        derivatives: [data.derivative, ...prev.derivatives],
        stats: {
          ...prev.stats,
          totalDerivativesCreated: prev.stats.totalDerivativesCreated + 1
        }
      }));
      showNotification('success', data.message || 'Multiplication swarm completed successfully!');
    } catch (err: any) {
      showNotification('error', err.message || 'Multiplication failed');
      throw err;
    }
  };

  // Action: Mine Knowledge
  const handleTriggerMining = async (assetId: string) => {
    try {
      const res = await fetch('/api/mindhive-v20/mine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to mine knowledge');

      setState((prev) => ({
        ...prev,
        miningJobs: [data.job, ...prev.miningJobs],
        stats: {
          ...prev.stats,
          totalMinedQaPairs: prev.stats.totalMinedQaPairs + data.job.qaPairsCount
        }
      }));
      showNotification('success', data.message || 'Knowledge extraction & JSONL generation complete!');
    } catch (err: any) {
      showNotification('error', err.message || 'Knowledge mining failed');
      throw err;
    }
  };

  // Action: Distribute to Global AI Training Engine
  const handleDistributeToGlobalEngine = async (assetId: string) => {
    try {
      const res = await fetch('/api/mindhive-v20/distribute-training', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to distribute to AI training engine');

      setState((prev) => {
        const updatedAssets = prev.assets.map((a) =>
          a.id === assetId
            ? {
                ...a,
                aiTrainingPermissions: {
                  ...a.aiTrainingPermissions,
                  distributedToGlobalEngine: true
                }
              }
            : a
        );

        const existingListingIdx = prev.trainingListings.findIndex((l) => l.assetId === assetId);
        let updatedListings = [...prev.trainingListings];
        if (existingListingIdx >= 0) {
          updatedListings[existingListingIdx] = data.listing;
        } else {
          updatedListings = [data.listing, ...updatedListings];
        }

        return {
          ...prev,
          assets: updatedAssets,
          trainingListings: updatedListings
        };
      });

      showNotification('success', data.message || 'Asset distributed to Global AI Training Engine!');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to distribute asset');
      throw err;
    }
  };

  // Action: Create Model Forge Project
  const handleCreateModelProject = async (projectData: any) => {
    try {
      const res = await fetch('/api/mindhive-v20/model-forge/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create model project');

      setState((prev) => ({
        ...prev,
        modelForgeProjects: [data.project, ...prev.modelForgeProjects]
      }));
      showNotification('success', data.message || 'Model project deployed successfully!');
    } catch (err: any) {
      showNotification('error', err.message || 'Model forge project failed');
      throw err;
    }
  };

  // Action: Advance Buyer Deal
  const handleAdvanceBuyerDeal = async (leadId: string, nextStage: string) => {
    try {
      const res = await fetch('/api/mindhive-v20/buyers/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, nextStage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update deal stage');

      setState((prev) => {
        const updatedLeads = prev.buyerLeads.map((l) => (l.id === leadId ? data.lead : l));
        return {
          ...prev,
          buyerLeads: updatedLeads
        };
      });

      showNotification('success', data.message || `Deal updated to ${nextStage}`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to advance deal');
      throw err;
    }
  };

  // Action: Creator Bank Payout via Paystack
  const handleInitiatePayout = async (payoutData: any) => {
    try {
      const res = await fetch('/api/mindhive-v20/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payoutData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payout failed');
      showNotification('success', data.message || 'Payout transfer dispatched via Paystack!');
      return data;
    } catch (err: any) {
      showNotification('error', err.message || 'Payout failed');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans pb-24 selection:bg-amber-400 selection:text-black">
      {/* Background Matrix Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#00FF88]/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFD70008_1px,transparent_1px),linear-gradient(to_bottom,#FFD70008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Notifications Bar */}
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

        {/* Global Header & HUD Telemetry */}
        <MindHiveV20Header
          state={state}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNavigateToColony={handleColonyJump}
        />

        {/* Tab 1: Overview HUD */}
        {activeTab === 'overview' && (
          <MindHiveV20Overview state={state} onNavigateTab={setActiveTab} />
        )}

        {/* Tab 2: Content Genome Registry */}
        {activeTab === 'genome' && (
          <ContentGenomeSection
            assets={state.assets}
            onRegisterAsset={handleRegisterAsset}
            onDistributeToGlobalEngine={handleDistributeToGlobalEngine}
            onTriggerMultiply={(assetId) => {
              setActiveTab('multiplier');
            }}
            onTriggerMining={(assetId) => {
              setActiveTab('mining');
            }}
          />
        )}

        {/* Tab: Content Registration Form (knowledge_assets Table Mint) */}
        {activeTab === 'register' && (
          <ContentRegistrationForm
            onAssetRegistered={handleRegisterAsset}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Tab 3: Content Multiplication Factory */}
        {activeTab === 'multiplier' && (
          <ContentMultiplierSection
            assets={state.assets}
            derivatives={state.derivatives}
            onGenerateDerivative={handleGenerateDerivative}
          />
        )}

        {/* Tab 4: Knowledge Mining Reactor (JSONL) */}
        {activeTab === 'mining' && (
          <KnowledgeMiningSection
            assets={state.assets}
            miningJobs={state.miningJobs}
            onTriggerMining={handleTriggerMining}
          />
        )}

        {/* Tab 5: Global AI Training Engine */}
        {activeTab === 'training' && (
          <GlobalAiTrainingSection
            listings={state.trainingListings}
            onLicenseDataset={(id) => {
              showNotification('success', `Dataset licensed! Added to your active AI fine-tuning pipeline.`);
            }}
          />
        )}

        {/* Tab 6: Model Forge (Levels 1–6) */}
        {activeTab === 'forge' && (
          <ModelForgeSection
            projects={state.modelForgeProjects}
            onCreateProject={handleCreateModelProject}
          />
        )}

        {/* Tab 7: 8 Buyer-Hunting Legions */}
        {activeTab === 'buyers' && (
          <BuyerLegionsSection
            buyerLeads={state.buyerLeads}
            onAdvanceDeal={handleAdvanceBuyerDeal}
          />
        )}

        {/* Tab 8: 70/30 Royalty Ledger & Paystack Settlement */}
        {activeTab === 'royalties' && (
          <RoyaltyLedgerSection
            transactions={state.royaltyTransactions}
            totalEarningsUsd={state.stats.totalRevenueUsd}
            totalEarningsNgn={state.stats.totalRevenueNgn}
            creatorEarningsUsd={state.stats.creatorRoyaltiesPaidUsd}
            creatorEarningsNgn={state.stats.creatorRoyaltiesPaidNgn}
            onInitiatePayout={handleInitiatePayout}
          />
        )}
      </div>
    </div>
  );
};

export default MindHiveV20Page;
