import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Layers,
  Cpu,
  ArrowLeftRight,
  TrendingUp,
  ShieldCheck,
  Target,
  CheckCircle2,
  AlertTriangle,
  Play,
  Plus,
  RefreshCw,
  Search,
  ExternalLink,
  Lock,
  ArrowUpRight,
  DollarSign,
  HelpCircle,
  Clock,
  Shield
} from 'lucide-react';
import {
  AurumColonyId,
  AurumState,
  WalletAsset,
  SupportedChain
} from '../../types/aurum';
import { AURUM_COLONIES_METADATA } from '../../data/aurumData';

interface AurumWorkspaceProps {
  colonyId: AurumColonyId;
  state: AurumState;
  onRefreshState: () => void;
  onOpenApprovalModal: () => void;
  onOpenLedgerModal: () => void;
}

export const AurumWorkspace: React.FC<AurumWorkspaceProps> = ({
  colonyId,
  state,
  onRefreshState,
  onOpenApprovalModal,
  onOpenLedgerModal
}) => {
  const metadata = AURUM_COLONIES_METADATA[colonyId];

  // Local state for interactive tools
  const [selectedDustAssetIds, setSelectedDustAssetIds] = useState<string[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [auditContractAddress, setAuditContractAddress] = useState('');
  const [auditTokenName, setAuditTokenName] = useState('');
  const [auditSymbol, setAuditSymbol] = useState('');
  const [auditChain, setAuditChain] = useState<SupportedChain>('ethereum');
  const [isAuditing, setIsAuditing] = useState(false);

  // NFT Rental form
  const [rentalNftId, setRentalNftId] = useState(state.nftAssets[0]?.id || '');
  const [rentalDailyPrice, setRentalDailyPrice] = useState('3.50');
  const [rentalMaxDays, setRentalMaxDays] = useState('14');
  const [rentalCollateral, setRentalCollateral] = useState('20.00');
  const [isListingRental, setIsListingRental] = useState(false);

  // Token Foundry form
  const [foundryProjectName, setFoundryProjectName] = useState('');
  const [foundryTokenName, setFoundryTokenName] = useState('');
  const [foundrySymbol, setFoundrySymbol] = useState('');
  const [foundrySupply, setFoundrySupply] = useState('100000000');
  const [foundryChain, setFoundryChain] = useState<SupportedChain>('base');
  const [isCreatingToken, setIsCreatingToken] = useState(false);

  // Rights verification form
  const [rightsAssetId, setRightsAssetId] = useState('');
  const [rightsClaimant, setRightsClaimant] = useState('');
  const [isSubmittingRights, setIsSubmittingRights] = useState(false);

  // Toggle asset in dust list
  const toggleDustAsset = (id: string) => {
    setSelectedDustAssetIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 1. Dust Consolidation Plan Generator
  const handleGenerateDustPlan = async () => {
    if (selectedDustAssetIds.length === 0) {
      alert('Please select at least one asset to consolidate.');
      return;
    }
    setIsGeneratingPlan(true);
    try {
      const res = await fetch('/api/aurum/dust/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: state.connectedWallets[0]?.address,
          chain: 'ethereum',
          assetIds: selectedDustAssetIds,
          targetAsset: 'ETH'
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefreshState();
        setSelectedDustAssetIds([]);
        onOpenApprovalModal();
      } else {
        alert(data.error || 'Failed to generate consolidation plan');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // 2. Graveyard Audit Run
  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditContractAddress || !auditTokenName) {
      alert('Please enter token name and contract address.');
      return;
    }
    setIsAuditing(true);
    try {
      const res = await fetch('/api/aurum/graveyard/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: auditTokenName,
          symbol: auditSymbol || 'TKN',
          contractAddress: auditContractAddress,
          chain: auditChain
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefreshState();
        setAuditContractAddress('');
        setAuditTokenName('');
        setAuditSymbol('');
      } else {
        alert(data.error || 'Audit failed');
      }
    } catch (err: any) {
      alert(err.message || 'Audit request failed');
    } finally {
      setIsAuditing(false);
    }
  };

  // 3. List NFT for ERC-4907 Rental
  const handleListRental = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rentalNftId) {
      alert('Please select an NFT to list.');
      return;
    }
    setIsListingRental(true);
    try {
      const res = await fetch('/api/aurum/nft/list-rental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nftAssetId: rentalNftId,
          dailyPriceUsd: rentalDailyPrice,
          maxDays: rentalMaxDays,
          collateralUsd: rentalCollateral
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefreshState();
      } else {
        alert(data.error || 'Listing failed');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to list rental');
    } finally {
      setIsListingRental(false);
    }
  };

  // 4. Token Foundry Creator
  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foundryProjectName || !foundryTokenName || !foundrySymbol) {
      alert('Please fill out all token parameters.');
      return;
    }
    setIsCreatingToken(true);
    try {
      const res = await fetch('/api/aurum/foundry/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: foundryProjectName,
          tokenName: foundryTokenName,
          symbol: foundrySymbol,
          chain: foundryChain,
          totalSupply: foundrySupply
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefreshState();
        setFoundryProjectName('');
        setFoundryTokenName('');
        setFoundrySymbol('');
        onOpenApprovalModal();
      } else {
        alert(data.error || 'Token creation failed');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsCreatingToken(false);
    }
  };

  // 5. Rights Verification Submission
  const handleSubmitRights = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rightsAssetId || !rightsClaimant) {
      alert('Asset identifier and claimant address are required');
      return;
    }
    setIsSubmittingRights(true);
    try {
      const res = await fetch('/api/aurum/rights/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetType: 'TOKEN_CONTRACT',
          assetIdentifier: rightsAssetId,
          claimantAddress: rightsClaimant,
          proofType: 'CRYPTOGRAPHIC_SIGNATURE'
        })
      });
      const data = await res.json();
      if (data.success) {
        onRefreshState();
        setRightsAssetId('');
        setRightsClaimant('');
      } else {
        alert(data.error || 'Verification submission failed');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    } finally {
      setIsSubmittingRights(false);
    }
  };

  return (
    <div className="rounded-2xl bg-slate-950/90 border border-slate-800/80 p-6 relative overflow-hidden mb-8">
      {/* Colony Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider text-slate-950"
              style={{ backgroundColor: metadata.accentColor }}
            >
              Colony {metadata.numericCode} Workbench
            </span>
            <span className="text-xs text-slate-400 font-semibold">{metadata.subtitle}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">{metadata.name}</h2>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">{metadata.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Autonomous Agents</div>
            <div className="text-sm font-bold text-white">
              {metadata.agentIds.length} Operating
            </div>
          </div>
          <button
            onClick={onRefreshState}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
            title="Refresh State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Colony Features & Revenue Model Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Key Engineering Capabilities
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {metadata.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            Revenue Model (70% Client / 30% Platform)
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {metadata.revenueMechanisms.map((rev, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{rev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SUB-COLONY SPECIFIC INTERACTIVE WORKBENCHES */}

      {/* 1. DUST FURNACE WORKBENCH */}
      {colonyId === 'dust_furnace' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Discovered Residual & Dust Balances
              </h3>
              <p className="text-xs text-slate-400">
                Select viable tokens to build an optimized Multicall3 consolidation batch.
              </p>
            </div>
            <button
              onClick={handleGenerateDustPlan}
              disabled={isGeneratingPlan || selectedDustAssetIds.length === 0}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs shadow-md disabled:opacity-50 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              {isGeneratingPlan ? 'Packaging Multicall...' : `Consolidate Selected (${selectedDustAssetIds.length})`}
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3 w-10">Select</th>
                  <th className="p-3">Asset</th>
                  <th className="p-3">Chain</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Value (USD)</th>
                  <th className="p-3">Est. Gas</th>
                  <th className="p-3">Feasibility</th>
                  <th className="p-3">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                {state.walletAssets.map((asset) => {
                  const isSelected = selectedDustAssetIds.includes(asset.id);
                  const isEconomic = asset.recoveryFeasibility === 'ECONOMIC';

                  return (
                    <tr
                      key={asset.id}
                      onClick={() => toggleDustAsset(asset.id)}
                      className={`hover:bg-slate-900/50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-amber-500/10' : ''
                      }`}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="rounded border-slate-700 text-amber-500 focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-amber-400 font-bold">
                            {asset.symbol.slice(0, 2)}
                          </span>
                          <div>
                            <div>{asset.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {asset.contractAddress.slice(0, 8)}...{asset.contractAddress.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 uppercase text-slate-300 font-medium">{asset.chain}</td>
                      <td className="p-3 font-mono text-slate-300">
                        {asset.balanceFormatted} {asset.symbol}
                      </td>
                      <td className="p-3 font-bold text-amber-300 font-mono">
                        ${asset.totalValueUsd.toFixed(2)}
                      </td>
                      <td className="p-3 font-mono text-slate-400">
                        ${asset.estimatedGasFeeUsd.toFixed(2)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isEconomic
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {asset.recoveryFeasibility}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                          {asset.recommendation}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. GRAVEYARD RESURRECTION WORKBENCH */}
      {colonyId === 'graveyard_resurrection' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/30">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Slither AST Static Bytecode Audit Tool
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter any dormant token contract to scan for hidden honeypot logic, transfer tax backdoors, and mint abuse.
            </p>

            <form onSubmit={handleRunAudit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Token Name</label>
                <input
                  type="text"
                  placeholder="e.g. CyberApeDAO"
                  value={auditTokenName}
                  onChange={(e) => setAuditTokenName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Symbol</label>
                <input
                  type="text"
                  placeholder="e.g. CADAO"
                  value={auditSymbol}
                  onChange={(e) => setAuditSymbol(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1">Contract Address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={auditContractAddress}
                  onChange={(e) => setAuditContractAddress(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isAuditing}
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  {isAuditing ? 'Auditing AST...' : 'Run Security Audit'}
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.graveyardTokens.map((token) => (
              <div
                key={token.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{token.name} ({token.symbol})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Score: {token.auditFindings.securityScore}/100
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mb-3 truncate">
                    {token.contractAddress}
                  </div>

                  <div className="space-y-1.5 text-xs border-t border-slate-800/80 pt-2 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Honeypot Trap:</span>
                      <span className={token.auditFindings.isHoneypot ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {token.auditFindings.isHoneypot ? 'YES (RISKY)' : 'PASSED (CLEAN)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Transfer Tax:</span>
                      <span>{token.auditFindings.transferFeePercent}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mint Callable:</span>
                      <span>{token.auditFindings.mintCallable ? 'Yes' : 'No (Renounced)'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Holders:</span>
                      <span>{token.holderCount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {token.resurrectionOption.replace('_', ' ')}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                    {token.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. NFT LANDFILL WORKBENCH */}
      {colonyId === 'nft_landfill' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* List for Rental Form */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                ERC-4907 Utility Rental Engine
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                List refined NFT utility for gaming or metaverse access without transferring underlying ownership.
              </p>

              <form onSubmit={handleListRental} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Select NFT</label>
                  <select
                    value={rentalNftId}
                    onChange={(e) => setRentalNftId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {state.nftAssets.map((nft) => (
                      <option key={nft.id} value={nft.id}>
                        {nft.collectionName} {nft.tokenId} (${nft.estimatedFloorUsd} Floor)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Daily Price ($)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={rentalDailyPrice}
                      onChange={(e) => setRentalDailyPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Max Days</label>
                    <input
                      type="number"
                      value={rentalMaxDays}
                      onChange={(e) => setRentalMaxDays(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isListingRental}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {isListingRental ? 'Publishing Listing...' : 'Publish ERC-4907 Rental'}
                </button>
              </form>
            </div>

            {/* Refined NFTs List */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {state.nftAssets.map((nft) => (
                <div key={nft.id} className="rounded-xl bg-slate-900/60 border border-slate-800 overflow-hidden flex flex-col">
                  <div className="h-32 w-full bg-slate-950 relative overflow-hidden">
                    <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-emerald-300 border border-emerald-500/30">
                      {nft.metadataStatus}
                    </span>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-white truncate">{nft.name}</div>
                      <div className="text-[10px] text-slate-400">{nft.collectionName}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Daily Utility:</span>
                      <span className="font-bold text-amber-300">
                        {nft.rentalAvailable ? `$${nft.dailyRentalPriceUsd.toFixed(2)} / day` : 'Not Listed'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TOKEN FOUNDRY WORKBENCH */}
      {colonyId === 'token_foundry' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-500/30">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-400" />
                OpenZeppelin V5 Token Architect
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Deploy mathematically sound ERC-20 utility tokens with linear vesting and anti-whale controls.
              </p>

              <form onSubmit={handleCreateToken} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Project Name</label>
                  <input
                    type="text"
                    placeholder="e.g. BioGrid Compute Network"
                    value={foundryProjectName}
                    onChange={(e) => setFoundryProjectName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Token Name</label>
                    <input
                      type="text"
                      placeholder="BioGrid Token"
                      value={foundryTokenName}
                      onChange={(e) => setFoundryTokenName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Symbol</label>
                    <input
                      type="text"
                      placeholder="BIOGRID"
                      value={foundrySymbol}
                      onChange={(e) => setFoundrySymbol(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Chain</label>
                    <select
                      value={foundryChain}
                      onChange={(e) => setFoundryChain(e.target.value as SupportedChain)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="base">Base L2 (Recommended)</option>
                      <option value="polygon">Polygon POS</option>
                      <option value="ethereum">Ethereum L1</option>
                      <option value="bsc">BNB Chain</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">Total Supply</label>
                    <input
                      type="number"
                      value={foundrySupply}
                      onChange={(e) => setFoundrySupply(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingToken}
                  className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  {isCreatingToken ? 'Compiling Contracts...' : 'Generate & Simulate Deployment'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              {state.foundryProjects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.projectName}</h4>
                      <p className="text-xs text-amber-400 font-mono">{p.tokenName} ({p.symbol}) on {p.chain.toUpperCase()}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
                    <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400">Total Supply:</span>
                      <div className="font-bold text-white">{p.totalSupply.toLocaleString()}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400">Circulating:</span>
                      <div className="font-bold text-emerald-400">{p.circulatingSupply.toLocaleString()}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400">Vesting Type:</span>
                      <div className="font-bold text-purple-400">{p.vestingContractType}</div>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800/80">
                      <span className="text-[10px] text-slate-400">Anti-Abuse:</span>
                      <div className="font-bold text-emerald-400">Verified V5</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. ASSET EXCHANGE WORKBENCH */}
      {colonyId === 'asset_exchange' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-blue-400" />
              Verified Secondary Market & Escrow Settlement
            </h3>
            <span className="text-xs text-slate-400">70% Client / 30% Platform Settlement Enforced</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.opportunities.map((opp) => (
              <div key={opp.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {opp.category}
                    </span>
                    <span className="text-xs font-mono uppercase text-slate-400">{opp.chain}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{opp.title}</h4>
                  <p className="text-xs text-slate-400 mb-3">{opp.marketEvidence}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">Valuation:</div>
                    <div className="font-bold text-emerald-400">${opp.estimatedValuationUsd.toLocaleString()} USD</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    {opp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. DEFI YIELD & RISK WORKBENCH */}
      {colonyId === 'defi_yield_risk' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Real Yield vs Dilution Intelligence
            </h3>
            <span className="text-xs text-slate-400">Only mathematically backed borrow-fee vaults approved</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {state.defiProtocols.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{p.protocolName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Grade: {p.smartContractRiskScore}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mb-3">{p.assetName}</div>

                  <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Published APY:</span>
                      <span className="font-mono text-white">{p.publishedApy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Net Real Yield:</span>
                      <span className="font-mono font-bold text-emerald-400">{p.netEstimatedApy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">TVL:</span>
                      <span className="font-mono text-slate-300">${(p.protocolTvlUsd / 1e6).toFixed(0)}M USD</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-amber-400/80">
                  ⚠️ {p.riskWarnings[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. RIGHTS COUNCIL WORKBENCH */}
      {colonyId === 'rights_council' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/30">
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                Cryptographic Provenance Check
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Verify asset deployer keys and screen claimant addresses against global sanctions lists.
              </p>

              <form onSubmit={handleSubmitRights} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Asset Identifier / Address</label>
                  <input
                    type="text"
                    placeholder="0x... or Collection ID"
                    value={rightsAssetId}
                    onChange={(e) => setRightsAssetId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Claimant Public Address</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={rightsClaimant}
                    onChange={(e) => setRightsClaimant(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRights}
                  className="w-full py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  {isSubmittingRights ? 'Verifying...' : 'Submit for Compliance Clearance'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-3">
              {state.rightsCases.map((rc) => (
                <div key={rc.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{rc.assetIdentifier}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {rc.legalReviewStatus}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">Claimant: {rc.claimantAddress}</div>
                  <p className="text-xs text-slate-300 mt-2 bg-slate-950/60 p-2 rounded border border-slate-800/80">
                    {rc.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. DEMAND HUNTER WORKBENCH */}
      {colonyId === 'demand_hunter' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Enterprise Web3 Demand & Buyer Pipeline
            </h3>
            <span className="text-xs text-slate-400">Autonomous outreach requires human approval</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.clientLeads.map((lead) => (
              <div key={lead.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">{lead.companyName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {lead.stage}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">Contact: {lead.contactPerson} · {lead.industry}</div>
                  <div className="text-xs font-bold text-amber-400 mb-2">Budget: ${lead.estimatedBudgetUsd.toLocaleString()} USD</div>
                  <p className="text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
                    {lead.proposalDraft}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Requires Stage 7 Human Gate</span>
                  <button
                    onClick={onOpenApprovalModal}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    View in Approvals Gate <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
