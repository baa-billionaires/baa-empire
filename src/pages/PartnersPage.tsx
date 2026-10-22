import React from 'react';
import {
  ShieldCheck,
  Building,
  FileCheck,
  Handshake,
  CheckCircle2,
  Mail,
  ArrowLeft,
  Coins,
  Cpu,
  GraduationCap
} from 'lucide-react';

interface PartnersPageProps {
  onNavigate: (page: string) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#FFD700] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus Home</span>
        </button>

        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 space-y-3">
          <span className="text-xs font-mono text-[#00FF88] uppercase tracking-wider font-bold">
            INSTITUTIONAL &amp; ENTERPRISE ALLIANCE
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white">
            Partnerships &amp; Sponsor Trust
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Partner with BAA-BILLIONAIRES Academy and Africa Blockchain &amp; AI University to sponsor student businesses, integrate enterprise AI micro-workforces, and co-own decentralized data center infrastructure.
          </p>
        </div>

        {/* EXACT REQUIRED TRUST BADGE BOX */}
        <div className="bg-zinc-950 rounded-3xl border-2 border-[#FFD700] p-6 sm:p-8 space-y-4 shadow-2xl shadow-[#FFD700]/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-black text-white tracking-wide">
                LEGAL ENTITY FOR PARTNERSHIPS
              </h2>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                CAC Registered • Official Corporate Receipting
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-200 leading-relaxed font-sans">
            All funding partnerships, sponsorships, and invoices are issued by <strong>Mode Digital Creations Limited</strong> &amp; <strong>Rossyst Enterprises Limited (BN: UY/009049)</strong>. CAC Registered. Paystack Verified. Official receipts and MOU available. Address: No. 5 Ordu Street, Rumuola/Stadium Link Road, Port Harcourt, Rivers State.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
              <span className="text-zinc-400 block">Registration:</span>
              <span className="text-[#FFD700] font-bold">BN: UY/009049</span>
            </div>
            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
              <span className="text-zinc-400 block">Billing Partner:</span>
              <span className="text-emerald-400 font-bold">Paystack Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
              <span className="text-zinc-400 block">Agreement Format:</span>
              <span className="text-white font-bold">Formal MOU &amp; Invoice</span>
            </div>
          </div>
        </div>

        {/* Partnership Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              Student Business Sponsorship
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Fund cohorts of 10 to 1,000 Nigerian students. Each student receives full access to 100 courses, 10x BaaCoin networth seed capital, and idle phone data dividend earning setup.
            </p>
          </div>

          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              UADC Data Center &amp; Mesh Node Deployment
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Deploy branded BAA Solar AI Boxes across salons, campuses, and tech hubs. Sell clean compute, generate carbon credits, and power local edge inference.
            </p>
          </div>
        </div>

        {/* Contact Form & MOU Request */}
        <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#FFD700]" />
            <span>Request Institutional MOU &amp; Invoice</span>
          </h3>
          <p className="text-xs text-zinc-400 font-sans">
            Direct institutional contact: <a href="mailto:autonomousagentscommerce@gmail.com" className="text-[#FFD700] font-mono font-bold underline">autonomousagentscommerce@gmail.com</a> | Phone: <a href="tel:+2348025516793" className="text-white font-mono font-bold">+2348025516793</a> or visit our Port Harcourt Head Office at No. 5 Ordu Street, Rumuola/Stadium Link Road.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('uadc-lab')}
              className="px-6 py-3 rounded-xl bg-[#00FF88] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition"
            >
              Explore UADC Lab (15 Monetization Engines)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PartnersPage;
