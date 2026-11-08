import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { SocialHiveState } from '../types/socialHive';
import { INITIAL_SOCIAL_HIVE_STATE } from '../data/socialHiveInitialState';
import { SocialHiveHeader } from '../components/socialhive/SocialHiveHeader';
import { UniversalSocialMiningPortal } from '../components/socialhive/UniversalSocialMiningPortal';
import { SocialAssetGenomeView } from '../components/socialhive/SocialAssetGenomeView';
import { SocialMiningColoniesGrid } from '../components/socialhive/SocialMiningColoniesGrid';
import { SocialMultiplicationReactor } from '../components/socialhive/SocialMultiplicationReactor';
import { SocialToEnterpriseReactor } from '../components/socialhive/SocialToEnterpriseReactor';
import { SocialBuyerHuntingView } from '../components/socialhive/SocialBuyerHuntingView';
import { SocialAccountIntelligence } from '../components/socialhive/SocialAccountIntelligence';
import { SocialRevenueEngineView } from '../components/socialhive/SocialRevenueEngineView';
import { CheckCircle2, AlertCircle, Sparkles, Layers, Building2, Globe, Radio, Coins, Database, Share2 } from 'lucide-react';

interface SocialHivePageProps {
  onNavigate?: (page: string) => void;
}

export const SocialHivePage: React.FC<SocialHivePageProps> = ({ onNavigate }) => {
  const { navigateTo } = useNavigation();
  const [state, setState] = useState<SocialHiveState>(INITIAL_SOCIAL_HIVE_STATE);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const res = await fetch('/api/social-hive/state');
        if (res.ok) {
          const data = await res.json();
          if (data?.state) {
            setState(data.state);
          }
        }
      } catch (err) {
        console.warn('Failed to load remote Social Hive state, using local:', err);
      }
    };
    fetchState();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleColonyJump = (colony: string) => {
    if (onNavigate) onNavigate(colony);
    else navigateTo(colony);
  };

  // Action: Intake Link
  const handleIntakeLink = async (payload: any) => {
    try {
      const res = await fetch('/api/social-hive/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Intake failed');

      setState((prev) => ({
        ...prev,
        socialAssets: [data.asset, ...prev.socialAssets],
        summaryStats: {
          ...prev.summaryStats,
          totalRegisteredSocialAssets: prev.summaryStats.totalRegisteredSocialAssets + 1,
          processedSocialLinksCount: prev.summaryStats.processedSocialLinksCount + 1
        }
      }));
      showNotification('success', data.message);
    } catch (err: any) {
      showNotification('error', err.message || 'Intake failed');
      throw err;
    }
  };

  // Action: Multiply
  const handleMultiplyAsset = async (assetId: string, format: any, title?: string) => {
    try {
      const res = await fetch('/api/social-hive/multiply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetId, derivativeFormat: format, customTitle: title })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Multiplication failed');

      setState((prev) => ({
        ...prev,
        derivatives: [data.derivative, ...prev.derivatives],
        summaryStats: {
          ...prev.summaryStats,
          totalDerivativesCreated: prev.summaryStats.totalDerivativesCreated + 1
        }
      }));
      showNotification('success', data.message);
    } catch (err: any) {
      showNotification('error', err.message || 'Multiplication failed');
      throw err;
    }
  };

  // Action: Enterprise Product
  const handleCreateEnterpriseProduct = async (payload: any) => {
    try {
      const res = await fetch('/api/social-hive/enterprise/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Enterprise solution creation failed');

      setState((prev) => ({
        ...prev,
        enterpriseProducts: [data.product, ...prev.enterpriseProducts],
        summaryStats: {
          ...prev.summaryStats,
          enterpriseProductsCount: prev.summaryStats.enterpriseProductsCount + 1
        }
      }));
      showNotification('success', data.message);
    } catch (err: any) {
      showNotification('error', err.message || 'Error creating product');
      throw err;
    }
  };

  // Action: Advance Buyer Deal
  const handleAdvanceBuyerDeal = async (opportunityId: string, nextStage: string) => {
    try {
      const res = await fetch('/api/social-hive/buyers/advance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunityId, nextStage })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Deal update failed');

      setState((prev) => {
        const updated = prev.buyerOpportunities.map(o => o.id === opportunityId ? data.opportunity : o);
        return {
          ...prev,
          buyerOpportunities: updated
        };
      });
      showNotification('success', data.message);
    } catch (err: any) {
      showNotification('error', err.message || 'Error updating deal');
      throw err;
    }
  };

  // Action: Connect Social Account
  const handleConnectAccount = async (payload: any) => {
    try {
      const res = await fetch('/api/social-hive/accounts/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to connect account');

      setState((prev) => ({
        ...prev,
        connectedAccounts: [data.account, ...prev.connectedAccounts],
        summaryStats: {
          ...prev.summaryStats,
          connectedAccountsCount: prev.summaryStats.connectedAccountsCount + 1
        }
      }));
      showNotification('success', data.message);
    } catch (err: any) {
      showNotification('error', err.message || 'Account connection failed');
      throw err;
    }
  };

  // Action: Payout
  const handleInitiatePayout = async (payload: any) => {
    try {
      const res = await fetch('/api/social-hive/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payout failed');
      showNotification('success', data.message);
      return data;
    } catch (err: any) {
      showNotification('error', err.message || 'Payout failed');
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans pb-24 selection:bg-cyan-400 selection:text-black">
      {/* Background Matrix Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff08_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
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

        {/* Global Header */}
        <SocialHiveHeader
          state={state}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onNavigateToColony={handleColonyJump}
        />

        {/* Tab 0: Overview HUD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Actions Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
              <div
                onClick={() => setActiveTab('intake')}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-cyan-400 cursor-pointer transition space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    <Database className="w-5 h-5" />
                  </span>
                  <span className="text-cyan-400 text-[10px] font-bold">STAGE 1</span>
                </div>
                <h3 className="text-base font-bold text-white font-sans">
                  Universal Social Intake
                </h3>
                <p className="text-zinc-400 text-xs font-sans">
                  Paste YouTube, TikTok, Instagram, LinkedIn, or X links to automatically detect platform and mint into the Social Asset Genome.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('multiplication')}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-400 cursor-pointer transition space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Layers className="w-5 h-5" />
                  </span>
                  <span className="text-amber-400 text-[10px] font-bold">STAGE 2</span>
                </div>
                <h3 className="text-base font-bold text-white font-sans">
                  Multiplication Reactor
                </h3>
                <p className="text-zinc-400 text-xs font-sans">
                  Turn single social videos into 14 distinct commercial products: Living eBooks, video courses, podcasts, and AI training datasets.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('enterprise')}
                className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-emerald-400 cursor-pointer transition space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Building2 className="w-5 h-5" />
                  </span>
                  <span className="text-emerald-400 text-[10px] font-bold">STAGE 3</span>
                </div>
                <h3 className="text-base font-bold text-white font-sans">
                  Social-to-Enterprise B2B
                </h3>
                <p className="text-zinc-400 text-xs font-sans">
                  Package field knowledge into high-margin annual enterprise AI assistants and training packs ($3,200 – $6,000/yr).
                </p>
              </div>
            </div>

            {/* In-Line Intake Portal */}
            <UniversalSocialMiningPortal onIntakeLink={handleIntakeLink} />

            {/* Social Colonies Summary */}
            <SocialMiningColoniesGrid colonies={state.colonies} />
          </div>
        )}

        {/* Tab 1: Universal Social Mining Portal */}
        {activeTab === 'intake' && (
          <UniversalSocialMiningPortal onIntakeLink={handleIntakeLink} />
        )}

        {/* Tab 2: Social Asset Genome */}
        {activeTab === 'genome' && (
          <SocialAssetGenomeView
            assets={state.socialAssets}
            onTriggerMultiply={(id) => setActiveTab('multiplication')}
            onTriggerEnterprise={(id) => setActiveTab('enterprise')}
          />
        )}

        {/* Tab 3: 14 Social Mining Colonies */}
        {activeTab === 'colonies' && (
          <SocialMiningColoniesGrid colonies={state.colonies} />
        )}

        {/* Tab 4: Multiplication Reactor */}
        {activeTab === 'multiplication' && (
          <SocialMultiplicationReactor
            assets={state.socialAssets}
            derivatives={state.derivatives}
            onMultiplyAsset={handleMultiplyAsset}
          />
        )}

        {/* Tab 5: Social-to-Enterprise Reactor */}
        {activeTab === 'enterprise' && (
          <SocialToEnterpriseReactor
            products={state.enterpriseProducts}
            onCreateEnterpriseProduct={handleCreateEnterpriseProduct}
          />
        )}

        {/* Tab 6: Buyer-Hunting Legions */}
        {activeTab === 'buyers' && (
          <SocialBuyerHuntingView
            opportunities={state.buyerOpportunities}
            onAdvanceDeal={handleAdvanceBuyerDeal}
          />
        )}

        {/* Tab 7: Connected Accounts & OAuth */}
        {activeTab === 'accounts' && (
          <SocialAccountIntelligence
            accounts={state.connectedAccounts}
            onConnectAccount={handleConnectAccount}
          />
        )}

        {/* Tab 8: 12 Revenue Channels & Paystack */}
        {activeTab === 'revenue' && (
          <SocialRevenueEngineView
            channels={state.revenueChannels}
            actualSettledUsd={state.summaryStats.actualSettledRevenueUsd}
            actualSettledNgn={state.summaryStats.actualSettledRevenueNgn}
            pendingUsd={state.summaryStats.pendingRevenueUsd}
            estimatedUsd={state.summaryStats.estimatedPipelineUsd}
            creatorEarningsUsd={state.summaryStats.creatorRoyaltiesPaidUsd}
            creatorEarningsNgn={state.summaryStats.creatorRoyaltiesPaidNgn}
            onInitiatePayout={handleInitiatePayout}
          />
        )}
      </div>
    </div>
  );
};

export default SocialHivePage;
