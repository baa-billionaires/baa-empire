import React, { useRef, useEffect, useState } from 'react';
import { CertificateNFT } from '../types';
import { Download, ShieldCheck, Share2, ExternalLink, Cpu, Copy, Check } from 'lucide-react';

interface CertificateProps {
  certificate: CertificateNFT;
  showActions?: boolean;
}

export const Certificate: React.FC<CertificateProps> = ({ certificate, showActions = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Render high-fidelity certificate on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 820;
    canvas.width = width;
    canvas.height = height;

    // 1. Background - Deep obsidian with subtle vignette
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 80, width / 2, height / 2, 700);
    bgGrad.addColorStop(0, '#0d0d14');
    bgGrad.addColorStop(0.65, '#060609');
    bgGrad.addColorStop(1, '#020203');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Cyber Grid & Neural Nodes
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 40; x < width - 40; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 40);
      ctx.lineTo(x, height - 40);
      ctx.stroke();
    }
    for (let y = 40; y < height - 40; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(width - 40, y);
      ctx.stroke();
    }

    // 3. Ornate Double Gold Borders
    const goldGrad = ctx.createLinearGradient(40, 40, width - 40, height - 40);
    goldGrad.addColorStop(0, '#FFF275');
    goldGrad.addColorStop(0.25, '#FFD700');
    goldGrad.addColorStop(0.5, '#D4AF37');
    goldGrad.addColorStop(0.75, '#FFD700');
    goldGrad.addColorStop(1, '#996515');

    // Outer border
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 5;
    ctx.strokeRect(36, 36, width - 72, height - 72);

    // Inner thin border
    ctx.strokeStyle = '#00D4FF';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(46, 46, width - 92, height - 92);

    // Corner Ornaments
    const drawCorner = (cx: number, cy: number, rot: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(24, 0);
      ctx.lineTo(0, 24);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#00D4FF';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(8, 8, 14, 0, Math.PI * 0.5);
      ctx.stroke();
      ctx.restore();
    };

    drawCorner(46, 46, 0);
    drawCorner(width - 46, 46, Math.PI * 0.5);
    drawCorner(width - 46, height - 46, Math.PI);
    drawCorner(46, height - 46, Math.PI * 1.5);

    // 4. Header: Institution Logos & Titles
    ctx.textAlign = 'center';

    // Top Emblem Badge
    ctx.fillStyle = 'rgba(255, 215, 0, 0.12)';
    ctx.beginPath();
    ctx.arc(width / 2, 100, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Small Crest Symbol inside badge
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 24px "Space Grotesk", sans-serif';
    ctx.fillText('⚡', width / 2, 108);

    // Institution Name
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('BILLIONAIRES AI ACADEMY', width / 2, 155);

    ctx.fillStyle = '#00D4FF';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.letterSpacing = '5px';
    ctx.fillText('& AFRICA BLOCKCHAIN UNIVERSITY', width / 2, 178);

    // Subtitle Line
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 220, 195);
    ctx.lineTo(width / 2 + 220, 195);
    ctx.stroke();

    // "AUTONOMOUS PROOF OF MASTERY & TOKENIZED CHIP"
    ctx.fillStyle = '#A1A1AA';
    ctx.font = '500 12px "JetBrains Mono", monospace';
    ctx.letterSpacing = '2px';
    ctx.fillText('OFFICIAL ON-CHAIN SOVEREIGN CERTIFICATE OF MASTERY', width / 2, 222);

    // "This certifies that"
    ctx.fillStyle = '#71717A';
    ctx.font = 'italic 16px "Plus Jakarta Sans", serif';
    ctx.fillText('This is to officially certify that the distinguished scholar', width / 2, 260);

    // Student Name (Large Gold Calligraphy/Sans)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px "Space Grotesk", sans-serif';
    ctx.fillText(certificate.student_name, width / 2, 315);

    // Underline for name
    const nameUnderlineGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
    nameUnderlineGrad.addColorStop(0, 'transparent');
    nameUnderlineGrad.addColorStop(0.5, '#FFD700');
    nameUnderlineGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nameUnderlineGrad;
    ctx.fillRect(width / 2 - 250, 330, 500, 2);

    // "Has successfully mastered and completed the autonomous curriculum"
    ctx.fillStyle = '#D4D4D8';
    ctx.font = '400 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('has satisfactorily fulfilled all academic requirements, autonomous neural labs and graduated in', width / 2, 365);

    // Course Title
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 26px "Space Grotesk", sans-serif';
    ctx.fillText(`"${certificate.course_title}"`, width / 2, 410);

    // 5. THE BAACOIN PHYSICAL/DIGITAL CHIP (Holographic Cyber Chip Component)
    const chipX = width / 2 - 260;
    const chipY = 445;
    const chipW = 520;
    const chipH = 100;

    // Chip container box
    ctx.fillStyle = 'rgba(15, 17, 23, 0.9)';
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.roundRect(chipX, chipY, chipW, chipH, 8);
    ctx.fill();
    ctx.stroke();

    // Metallic Hologram Chip Icon
    const chipIconX = chipX + 30;
    const chipIconY = chipY + 22;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(chipIconX, chipIconY, 56, 56);
    ctx.fillStyle = '#060609';
    ctx.fillRect(chipIconX + 6, chipIconY + 6, 44, 44);

    // Chip internal circuit lines
    ctx.strokeStyle = '#00D4FF';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(chipIconX + 14, chipIconY + 14, 28, 28);
    ctx.beginPath();
    ctx.moveTo(chipIconX + 28, chipIconY + 6);
    ctx.lineTo(chipIconX + 28, chipIconY + 14);
    ctx.moveTo(chipIconX + 28, chipIconY + 42);
    ctx.lineTo(chipIconX + 28, chipIconY + 50);
    ctx.moveTo(chipIconX + 6, chipIconY + 28);
    ctx.lineTo(chipIconX + 14, chipIconY + 28);
    ctx.moveTo(chipIconX + 42, chipIconY + 28);
    ctx.lineTo(chipIconX + 50, chipIconY + 28);
    ctx.stroke();

    // Engraved Text inside chip container
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 18px "Space Grotesk", sans-serif';
    ctx.fillText(`EMBEDDED BAACOIN CHIP: ${certificate.baacoin_engraved.toLocaleString()} BAACOIN`, chipX + 105, chipY + 42);

    ctx.fillStyle = '#00D4FF';
    ctx.font = '600 13px "JetBrains Mono", monospace';
    ctx.fillText('✓ This Certificate contains 990 BaaCoin Chip - Tradable for Life', chipX + 105, chipY + 66);

    ctx.fillStyle = '#A1A1AA';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(`NFT TOKEN ID: ${certificate.nft_id} | STATUS: TRADABLE`, chipX + 105, chipY + 84);

    // 6. BOTTOM ROW: Signatures, QR Code & Referral Engine
    // QR Code Box (Drawn procedurally)
    const qrX = 100;
    const qrY = 575;
    const qrSize = 135;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.strokeRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

    // Procedural QR matrix pattern based on NFT ID & Referral Code
    ctx.fillStyle = '#000000';
    const seed = certificate.nft_id + certificate.referral_code;
    const cells = 15;
    const cellSize = qrSize / cells;

    // Corner QR squares
    const drawQrEye = (gx: number, gy: number) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(qrX + gx * cellSize, qrY + gy * cellSize, 4 * cellSize, 4 * cellSize);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(qrX + (gx + 1) * cellSize, qrY + (gy + 1) * cellSize, 2 * cellSize, 2 * cellSize);
      ctx.fillStyle = '#000000';
      ctx.fillRect(qrX + (gx + 1.4) * cellSize, qrY + (gy + 1.4) * cellSize, 1.2 * cellSize, 1.2 * cellSize);
    };
    drawQrEye(0, 0);
    drawQrEye(cells - 4, 0);
    drawQrEye(0, cells - 4);

    // Body QR modules
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        if ((r < 5 && c < 5) || (r < 5 && c >= cells - 5) || (r >= cells - 5 && c < 5)) continue;
        const charCode = seed.charCodeAt((r * cells + c) % seed.length);
        if (charCode % 2 === 0) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(qrX + c * cellSize, qrY + r * cellSize, cellSize, cellSize);
        }
      }
    }

    // QR Label
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 11px "Space Grotesk", sans-serif';
    ctx.fillText('SCAN TO VERIFY & EARN 10%', qrX, qrY + qrSize + 20);

    ctx.fillStyle = '#71717A';
    ctx.font = '9px "JetBrains Mono", monospace';
    ctx.fillText(`REF: ${certificate.referral_code}`, qrX, qrY + qrSize + 34);

    // Middle metadata: Date, Issuer, Hash
    ctx.textAlign = 'center';
    ctx.fillStyle = '#A1A1AA';
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(`ISSUED DATE: ${certificate.issue_date.toUpperCase()}`, width / 2, 595);

    ctx.fillStyle = '#52525B';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`IPFS HASH: ${certificate.ipfs_url}`, width / 2, 618);
    ctx.fillText(`TX HASH: ${certificate.transaction_hash}`, width / 2, 634);

    // Official Gold Seal in Center-Bottom
    const sealX = width / 2;
    const sealY = 690;
    ctx.fillStyle = 'rgba(255, 215, 0, 0.15)';
    ctx.beginPath();
    ctx.arc(sealX, sealY, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 10px "Space Grotesk", sans-serif';
    ctx.fillText('VERIFIED NFT', sealX, sealY - 6);
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = '#00D4FF';
    ctx.fillText('BAACOIN 10X', sealX, sealY + 10);
    ctx.fillText('SOVEREIGN SEAL', sealX, sealY + 22);

    // Right side: Signatures
    const sigX = width - 150;
    const sigY = 640;

    // Chancellor Signature line
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sigX - 100, sigY);
    ctx.lineTo(sigX + 100, sigY);
    ctx.stroke();

    // Calligraphic Signature squiggle
    ctx.strokeStyle = '#00D4FF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sigX - 80, sigY - 22);
    ctx.bezierCurveTo(sigX - 40, sigY - 45, sigX - 10, sigY - 5, sigX + 15, sigY - 25);
    ctx.bezierCurveTo(sigX + 35, sigY - 45, sigX + 60, sigY - 10, sigX + 80, sigY - 20);
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 13px "Space Grotesk", sans-serif';
    ctx.fillText('Dr. Chukwuma Sterling', sigX, sigY + 20);

    ctx.fillStyle = '#A1A1AA';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('Chancellor & Founder', sigX, sigY + 35);
    ctx.fillStyle = '#71717A';
    ctx.fillText('Billionaires AI Academy', sigX, sigY + 48);

  }, [certificate]);

  // Download high-resolution PNG
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDownloading(true);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `BillionairesAI_Certificate_${certificate.nft_id.substring(0, 8)}.png`;
    link.href = dataUrl;
    link.click();
    setTimeout(() => setDownloading(false), 800);
  };

  // Print as PDF
  const handlePrintPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Billionaires AI Academy Certificate - ${certificate.student_name}</title>
          <style>
            body { margin: 0; background: #000; display: flex; align-items: center; justify-content: center; height: 100vh; }
            img { max-width: 100%; max-height: 100%; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print();window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const copyVerifyLink = () => {
    navigator.clipboard.writeText(certificate.qr_data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      {/* Canvas Wrapper */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-950 p-2 sm:p-4 border border-[#FFD700]/30 shadow-2xl shadow-[#FFD700]/10">
        <canvas
          ref={canvasRef}
          className="w-full h-auto block rounded-lg shadow-inner bg-black"
          style={{ aspectRatio: '1200 / 820' }}
        />

        {/* Live Tradable Badge */}
        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#00D4FF]/60 text-xs font-mono text-[#00D4FF]">
          <Cpu className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>{certificate.baacoin_engraved} BAACOIN CHIP</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Action Controls */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 w-full mt-6 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
          <div className="flex flex-col text-left">
            <span className="text-xs text-zinc-400 font-mono">NFT TOKEN ID</span>
            <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
              {certificate.nft_id}
              <button
                onClick={copyVerifyLink}
                className="text-zinc-400 hover:text-[#FFD700] transition"
                title="Copy verification link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPNG}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD700] to-[#E5A800] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#FFD700]/20"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Exporting...' : 'Download PNG'}</span>
            </button>

            <button
              onClick={handlePrintPDF}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition border border-zinc-700"
            >
              <span>Print / PDF</span>
            </button>

            <button
              onClick={copyVerifyLink}
              className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] font-semibold text-xs uppercase tracking-wider rounded-lg transition border border-[#00D4FF]/30"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Link Copied!' : 'Share & 10% Ref'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Certificate;
