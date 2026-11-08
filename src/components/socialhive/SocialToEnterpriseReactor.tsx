import React, { useState } from 'react';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Plus,
  RefreshCw,
  Award,
  Users,
  ExternalLink
} from 'lucide-react';
import { EnterpriseKnowledgeProduct } from '../../types/socialHive';

interface SocialToEnterpriseReactorProps {
  products: EnterpriseKnowledgeProduct[];
  onCreateEnterpriseProduct: (payload: any) => Promise<void>;
}

export const SocialToEnterpriseReactor: React.FC<SocialToEnterpriseReactorProps> = ({
  products,
  onCreateEnterpriseProduct
}) => {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [domain, setDomain] = useState<'agriculture' | 'engineering' | 'fintech' | 'healthcare' | 'education' | 'tech_tutorials'>('engineering');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState<'AI Assistant' | 'Interactive Training Pack' | 'Searchable Technical KB' | 'Business Intelligence Deck'>('AI Assistant');
  const [licensePriceAnnualUsd, setLicensePriceAnnualUsd] = useState(4500);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsSubmitting(true);
    try {
      await onCreateEnterpriseProduct({
        domain,
        title,
        description,
        productType,
        licensePriceAnnualUsd
      });
      setShowCreateModal(false);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      alert(err.message || 'Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Building2 className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/40">
                SOCIAL-TO-ENTERPRISE REACTOR
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-heading font-black text-white mt-2">
              Commercial Enterprise Knowledge Products
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              Transforms creator videos into high-margin B2B AI assistants, training packages, and certified knowledge bases.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-black font-mono font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Package New Enterprise Solution</span>
          </button>
        </div>

        {/* 6 Industry Transformations Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 font-mono text-[10px]">
          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <span className="text-emerald-400 font-bold block">1. AGRICULTURE</span>
            <div className="font-bold text-white">Agronomy Assistants</div>
            <p className="text-zinc-500 font-sans leading-tight">Soil, climate, crop yields.</p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <span className="text-cyan-400 font-bold block">2. ENGINEERING</span>
            <div className="font-bold text-white">Technical Training</div>
            <p className="text-zinc-500 font-sans leading-tight">Solar, hardware, cooling.</p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <span className="text-amber-400 font-bold block">3. FINTECH</span>
            <div className="font-bold text-white">Payment Intel Decks</div>
            <p className="text-zinc-500 font-sans leading-tight">Webhooks, settlement, APIs.</p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <span className="text-purple-400 font-bold block">4. HEALTHCARE</span>
            <div className="font-bold text-white">Reviewed Health KB</div>
            <p className="text-zinc-500 font-sans leading-tight">Peer-reviewed protocol kits.</p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <span className="text-blue-400 font-bold block">5. EDUCATION</span>
            <div className="font-bold text-white">Tutoring Products</div>
            <p className="text-zinc-500 font-sans leading-tight">Institutional curricula.</p>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <span className="text-pink-400 font-bold block">6. TECH TUTORIALS</span>
            <div className="font-bold text-white">Searchable KBs</div>
            <p className="text-zinc-500 font-sans leading-tight">Developer onboarding tools.</p>
          </div>
        </div>
      </div>

      {/* Enterprise Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <span>Active Enterprise Knowledge Suites ({products.length})</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">B2B Annual Subscription Contracts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-mono text-xs">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {item.domain}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-[#00FF88] text-[10px] font-bold">
                    ✓ {item.complianceReviewStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-white font-sans">{item.title}</h4>
                  <span className="text-[11px] text-cyan-400 font-mono block mt-1">
                    Product Type: {item.productType}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {item.description}
                </p>

                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1.5 text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Source Assets:</span>
                    <span className="text-white font-bold">{item.sourceSocialAssetCount} Videos/Articles</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Active Corporate Clients:</span>
                    <span className="text-emerald-400 font-bold">{item.activeEnterpriseClients} Enterprises</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Annual License Fee:</span>
                    <span className="text-white font-bold">${item.licensePriceAnnualUsd.toLocaleString()} USD</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400">Total B2B Revenue:</span>
                  <span className="font-bold text-white">
                    ${item.totalRevenueUsd.toLocaleString()} USD (₦{(item.totalRevenueUsd * 1500).toLocaleString()} NGN)
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <button
                  onClick={() => alert(`Enterprise Licensing Packet generated for "${item.title}". Contacting sales desk.`)}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Corporate Trial / SLA</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Create Enterprise Product */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-heading font-black text-white">
                  Package Enterprise Knowledge Solution
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Solution Title:</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Solar Infrastructure Assistant"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase font-bold">Domain:</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="engineering">Engineering</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="fintech">Fintech</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="tech_tutorials">Tech Tutorials</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 uppercase font-bold">Product Type:</label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="AI Assistant">AI Assistant</option>
                    <option value="Interactive Training Pack">Interactive Training Pack</option>
                    <option value="Searchable Technical KB">Searchable Technical KB</option>
                    <option value="Business Intelligence Deck">Business Intelligence Deck</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Annual License Fee ($ USD):</label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={licensePriceAnnualUsd}
                  onChange={(e) => setLicensePriceAnnualUsd(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1 uppercase font-bold">Description:</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the enterprise scope, knowledge sources, and target workflows..."
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white outline-none focus:border-amber-400 font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 active:scale-95 text-black font-bold uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Compiling Knowledge Suite...</span>
                  </>
                ) : (
                  <span>Certify &amp; Publish Enterprise Solution</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
