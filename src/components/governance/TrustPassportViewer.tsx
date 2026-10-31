import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Key,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  FileCheck,
  Sparkles,
  Lock,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TrustPassport } from '../../types/governance';

interface TrustPassportViewerProps {
  passports: TrustPassport[];
  onSelectForVerification?: (passport: TrustPassport) => void;
}

export const TrustPassportViewer: React.FC<TrustPassportViewerProps> = ({
  passports,
  onSelectForVerification
}) => {
  const [selectedPassportId, setSelectedPassportId] = useState<string>(passports[0]?.id || '');
  const [copiedSignature, setCopiedSignature] = useState(false);

  const activePassport = passports.find(p => p.id === selectedPassportId) || passports[0];

  const handleCopySig = () => {
    if (!activePassport) return;
    navigator.clipboard.writeText(activePassport.cryptographicSignature);
    setCopiedSignature(true);
    setTimeout(() => setCopiedSignature(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-emerald-800/40 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-mono font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>MODULE 6 • BAA TRUST PASSPORT FOR AI AGENTS &amp; WEB3 APPS</span>
            </div>
            <h2 className="text-2xl font-heading font-black text-white">
              W3C Verifiable Credential Trust Passports
            </h2>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed mt-1">
              Privacy-conscious profiles recording cryptographically verifiable claims: developer identity, declared capabilities, security assessments, and test coverage conforming to W3C VC 2.0.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-right shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Active Certified Passports</span>
            <span className="text-xl font-heading font-black text-emerald-400">{passports.length} Verified Agents</span>
            <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">W3C VC 2.0 • Base L2 Attested</span>
          </div>
        </div>
      </div>

      {/* PASSPORTS SHOWCASE SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: PASSPORT ROSTER (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono uppercase text-zinc-400 block font-semibold px-1">
            Registered Agent Passports ({passports.length}):
          </span>

          <div className="space-y-2">
            {passports.map(pass => {
              const isSelected = activePassport?.id === pass.id;

              return (
                <div
                  key={pass.id}
                  onClick={() => setSelectedPassportId(pass.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-zinc-900 border-emerald-500 ring-1 ring-emerald-500/50 shadow-xl'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      SCORE: {pass.securityAuditScore}%
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {pass.conformanceTestsPassed}/{pass.totalConformanceTests} Tests
                    </span>
                  </div>

                  <h4 className="font-heading font-black text-white text-sm">
                    {pass.agentName}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {pass.declaredRole}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: CRYPTOGRAPHIC PASSPORT CARD (8 cols) */}
        <div className="lg:col-span-8">
          {activePassport ? (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-emerald-500/60 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Passport Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      W3C VC 2.0 CERTIFIED
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      Valid Until: {activePassport.expirationDate}
                    </span>
                  </div>
                  <h3 className="text-2xl font-heading font-black text-white mt-1">
                    {activePassport.agentName}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Subject DID: <strong className="text-zinc-200">{activePassport.developerDid}</strong>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-black border border-emerald-500/40 text-center shrink-0">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">Security Rating</span>
                  <span className="text-2xl font-heading font-black text-emerald-400">{activePassport.securityAuditScore}/100</span>
                  <span className="text-[10px] font-mono text-emerald-500 block">Verified Active</span>
                </div>
              </div>

              {/* Declared Capabilities & Known Limitations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Declared Capabilities</span>
                  </span>
                  <ul className="space-y-1 text-zinc-300">
                    {activePassport.capabilities.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Enforced Technical Limitations</span>
                  </span>
                  <ul className="space-y-1 text-zinc-400">
                    {activePassport.knownLimitations.map((l, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Conformance and Protocols Schedule */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Conformance Tests</span>
                  <span className="text-white font-bold">{activePassport.conformanceTestsPassed} of {activePassport.totalConformanceTests} Passed</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Incident Disclosures</span>
                  <span className="text-emerald-400 font-bold">{activePassport.incidentHistoryCount} Security Incidents</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Credential Type</span>
                  <span className="text-zinc-300 font-bold">W3C VC 2.0</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Issuing Authority</span>
                  <span className="text-[#FFD700] font-bold">BAA Institute</span>
                </div>
              </div>

              {/* Cryptographic Signature & Attestation Proof */}
              <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Cryptographic Signature Proof (ECDSA Secp256k1)</span>
                  </span>

                  <button
                    onClick={handleCopySig}
                    className="text-[11px] font-mono text-[#FFD700] hover:underline flex items-center gap-1"
                  >
                    {copiedSignature ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSignature ? 'Signature Copied' : 'Copy Proof Hash'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-black border border-zinc-800 font-mono text-[11px] text-zinc-400 break-all">
                  {activePassport.cryptographicSignature}
                </div>
              </div>

              {/* Non-Government License Disclaimer */}
              <p className="text-[10px] font-mono text-zinc-500 text-center">
                * Note: A BAA Trust Passport communicates empirical test evidence and declared limitations; it is not a government regulatory license or commercial financial endorsement.
              </p>

            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
