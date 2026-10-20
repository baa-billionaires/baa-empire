import React from 'react';
import {
  ShieldCheck,
  Building2,
  MapPin,
  CheckCircle2,
  Users,
  Cpu,
  Coins,
  ArrowRight,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { FounderEcosystemShowcase } from '../components/FounderEcosystemShowcase';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#FFD700] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Campus Home</span>
        </button>

        {/* Hero Header */}
        <div className="border-b border-zinc-800 pb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-xs font-mono text-[#FFD700] font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Transparency &amp; CAC Verification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            ABOUT BAA-BILLIONAIRES ACADEMY
          </h1>

          <p className="text-lg sm:text-xl text-[#00FF88] font-medium leading-relaxed font-sans">
            BAA-BILLIONAIRES Academy is Africa's First Autonomous Data Center for Student Businesses.
          </p>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            We turn idle smartphones into earning machines while teaching real business skills. Our students don't just learn - they build, mine, and earn.
          </p>
        </div>

        {/* WHO WE ARE */}
        <section className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
            <span className="text-[#FFD700]">01.</span> WHO WE ARE
          </h2>

          <p className="text-sm text-zinc-300 leading-relaxed">
            BAA-BILLIONAIRES Academy is a flagship innovation project and a division of <strong>Mode Digital Creations Limited</strong> and <strong>Rossyst Enterprises Limited (BN: UY/009049)</strong> - both CAC-registered technology and enterprise companies in Nigeria.
          </p>

          <p className="text-sm text-zinc-300 leading-relaxed">
            All operations, payments, partnerships, and sponsorships are legally managed and receipted under Mode Digital Creations Limited and Rossyst Enterprises Limited.
          </p>

          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>We are not a new, unregistered project. We are an established enterprise building Africa's student economy.</span>
          </div>
        </section>

        {/* OUR MISSION */}
        <section className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
            <span className="text-[#00D4FF]">02.</span> OUR MISSION
          </h2>

          <p className="text-base text-zinc-200 font-medium leading-relaxed">
            To onboard 100,000 Nigerian students into business ownership by turning their data and idle phone CPU into capital.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-2xl font-black text-[#00FF88] block">100,000</span>
              <span className="text-xs text-zinc-400 font-mono">Students Targeted</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-2xl font-black text-[#FFD700] block">10x Networth</span>
              <span className="text-xs text-zinc-400 font-mono">BaaCoin Asset Allocation</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
              <span className="text-2xl font-black text-[#00D4FF] block">UADC Lab</span>
              <span className="text-xs text-zinc-400 font-mono">15 Monetization Engines</span>
            </div>
          </div>
        </section>

        {/* OUR LOCATION */}
        <section className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
            <span className="text-[#FFD700]">03.</span> OUR LOCATION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[#FFD700] font-mono text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Head Office</span>
              </div>
              <p className="text-sm text-white font-medium">
                No. 5 Ordu Street, Rumuola/Stadium Link Road, Port Harcourt, Rivers State, Nigeria.
              </p>
              <span className="text-[11px] font-mono text-zinc-400 block">Rivers State Administrative Hub</span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-[#00D4FF] font-mono text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" />
                <span>Lagos Operations</span>
              </div>
              <p className="text-sm text-white font-medium">
                12 Allen Avenue, Ikeja, Lagos (Partner Hub)
              </p>
              <span className="text-[11px] font-mono text-zinc-400 block">Commercial &amp; FinTech Integration</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 font-mono pt-1">
            We operate nationwide, with core teams in Port Harcourt and Lagos.
          </p>
        </section>

        {/* TRUST & SECURITY */}
        <section className="bg-zinc-950 rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>TRUST &amp; SECURITY</span>
            </h2>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              OFFICIALLY AUDITED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">CAC Registered</span>
                <span className="text-zinc-400">BN: UY/009049</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Payments Secured by Paystack</span>
                <span className="text-zinc-400">Verified Business Account under Mode Digital Creations Limited</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Data Security Infrastructure</span>
                <span className="text-zinc-400">Secured by Supabase &amp; Vercel Enterprise</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Verified Student Body</span>
                <span className="text-zinc-400">2,400+ Students Active &amp; Verified</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-300 leading-relaxed">
            All donor funds and sponsorships are legally bound under <strong>Mode Digital Creations Limited</strong> with official invoices and receipts.
          </div>
        </section>

        {/* EMMANUEL BASSEY JOE & 11 PLATFORMS ECOSYSTEM */}
        <section className="space-y-4">
          <FounderEcosystemShowcase />
        </section>

        {/* CTA to UADC Lab & Academy */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800">
          <button
            onClick={() => onNavigate('uadc-lab')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00FF88] to-emerald-500 text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <span>Launch UADC Lab (15 Engines)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('partners')}
            className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-mono text-xs hover:border-[#FFD700] transition"
          >
            View Legal Entity for Partnerships
          </button>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
