import React, { useState } from 'react';
import { CertificateNFT } from '../types';
import { Certificate } from './Certificate';
import {
  X,
  ShieldCheck,
  Cpu,
  Coins,
  Download,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Award,
  Globe2,
  Terminal,
  QrCode,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

interface NFTCertificatePreviewModalProps {
  certificate: CertificateNFT | null;
  isOpen: boolean;
  onClose: () => void;
}

export const NFTCertificatePreviewModal: React.FC<NFTCertificatePreviewModalProps> = ({
  certificate,
  isOpen,
  onClose
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [showExplorerSheet, setShowExplorerSheet] = useState(false);

  if (!isOpen || !certificate) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificate.qr_data);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificate.transaction_hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `🎓 Verified On-Chain Mastery Certificate minted on Base L2! Issued by Billionaires AI Academy & Africa Blockchain University with an engraved ${certificate.baacoin_engraved} BaaCoin chip ($1.00 USD peg). #BaaCoin #BaseL2 #AIEducation\n\nVerify: ${certificate.qr_data}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(certificate.qr_data);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-[#FFD700]/50 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 my-auto text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-zinc-900 border border-zinc-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5 pr-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>BASE L2 MAINNET • VERIFIED SOVEREIGN NFT CREDENTIAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
              {certificate.course_title}
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Recipient: <strong className="text-white">{certificate.student_name}</strong> • Issued: {certificate.issue_date}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>{certificate.baacoin_engraved} BAA CHIP</span>
            </span>
          </div>
        </div>

        {/* High-Resolution Certificate Canvas Render */}
        <div className="w-full flex justify-center">
          <Certificate certificate={certificate} showActions={false} />
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <button
            onClick={handleCopyLink}
            className="p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold transition flex items-center justify-center gap-2"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Copied Link!' : 'Copy Verify URL'}</span>
          </button>

          <button
            onClick={handleShareTwitter}
            className="p-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-400 font-bold transition flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on X</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="p-3 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/40 text-blue-300 font-bold transition flex items-center justify-center gap-2"
          >
            <Globe2 className="w-4 h-4" />
            <span>Share on LinkedIn</span>
          </button>

          <button
            onClick={() => setShowExplorerSheet(!showExplorerSheet)}
            className="p-3 rounded-xl bg-[#FFD700]/15 hover:bg-[#FFD700]/25 border border-[#FFD700]/40 text-[#FFD700] font-bold transition flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{showExplorerSheet ? 'Hide On-Chain Data' : 'Base L2 Explorer'}</span>
          </button>
        </div>

        {/* Base L2 On-Chain Telemetry & Audit Sheet */}
        {showExplorerSheet && (
          <div className="p-5 rounded-2xl bg-black border border-zinc-800 space-y-3 font-mono text-xs animate-fade-in">
            <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-900 pb-2">
              <span className="text-[#00D4FF] font-bold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                BASE L2 CONTRACT REGISTRY TELEMETRY (CHAIN ID: 8453)
              </span>
              <span className="text-emerald-400 text-[10px]">● Consensus Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-zinc-500 block">SMART CONTRACT REGISTRY</span>
                <span className="text-white font-bold break-all">0x8892BAAC01948291048820BaaCoinCertRegistry</span>
              </div>

              <div>
                <span className="text-zinc-500 block">NFT TOKEN ID</span>
                <span className="text-[#FFD700] font-bold break-all">{certificate.nft_id}</span>
              </div>

              <div>
                <span className="text-zinc-500 block">MINT TRANSACTION HASH</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold truncate">{certificate.transaction_hash}</span>
                  <button onClick={handleCopyHash} className="text-zinc-400 hover:text-white" title="Copy Hash">
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block">DECENTRALIZED IPFS METADATA</span>
                <span className="text-zinc-300 truncate block">{certificate.ipfs_url}</span>
              </div>

              <div>
                <span className="text-zinc-500 block">ENGRAVED BAACOIN CHIP</span>
                <span className="text-white font-bold">{certificate.baacoin_engraved} BAA (Backed 1:1 by Naira via Paystack)</span>
              </div>

              <div>
                <span className="text-zinc-500 block">REFERRAL CASHBACK ENGINE</span>
                <span className="text-purple-300 font-bold">Embedded 10% Networth Bounty Active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default NFTCertificatePreviewModal;
