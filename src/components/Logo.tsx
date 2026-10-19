import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'full' | 'icon' | 'badge';
  showText?: boolean;
  className?: string;
  customLogoUrl?: string | null;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showText = true,
  className = '',
  customLogoUrl = null,
}) => {
  const pixelSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 28
      : size === 'md'
      ? 40
      : size === 'lg'
      ? 56
      : 72;

  // If user uploaded a custom logo via /admin/settings branding
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Billionaires AI Academy Logo"
          style={{ width: pixelSize, height: pixelSize }}
          className="object-contain drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
        />
        {showText && variant !== 'icon' && (
          <div className="flex flex-col text-left leading-tight">
            <span className="font-heading font-black tracking-tight text-white flex items-center gap-1.5 text-base md:text-lg">
              <span className="text-[#FFD700]">BILLIONAIRES</span>
              <span className="text-[#00D4FF]">AI</span>
            </span>
            <span className="text-[10px] tracking-widest font-mono text-zinc-400 uppercase">
              AFRICA BLOCKCHAIN &amp; DATA CENTER
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon: Fusion of Golden Falcon / Pyramid, African Shield, AI Neural Node, and Blockchain Hexagon */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: pixelSize, height: pixelSize }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_16px_rgba(255,215,0,0.35)]"
        >
          <defs>
            {/* Gold Gradient */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="80%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>

            {/* Electric Blue Gradient */}
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="60%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#0080FF" />
            </linearGradient>

            {/* Obsidian Core Gradient */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#00D4FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#050508" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Core Glow */}
          <circle cx="50" cy="50" r="45" fill="url(#coreGlow)" />

          {/* Blockchain Outer Hexagon with Circuit Nodes */}
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Circuit Hex Inner Lines */}
          <polygon
            points="50,16 80,33 80,67 50,84 20,67 20,33"
            stroke="url(#blueGrad)"
            strokeWidth="1.8"
            strokeDasharray="4 2"
            opacity="0.8"
          />

          {/* African Diamond/Pyramid Chevron Crest (Billionaires Crown) */}
          <path
            d="M50 18 L70 42 L50 36 L30 42 Z"
            fill="url(#goldGrad)"
          />

          {/* Central AI BaaCoin Chip Core */}
          <rect
            x="36"
            y="40"
            width="28"
            height="28"
            rx="5"
            fill="#09090D"
            stroke="url(#goldGrad)"
            strokeWidth="2"
          />

          {/* Chip Connectors */}
          <line x1="50" y1="36" x2="50" y2="40" stroke="#00D4FF" strokeWidth="2" />
          <line x1="50" y1="68" x2="50" y2="72" stroke="#00D4FF" strokeWidth="2" />
          <line x1="32" y1="54" x2="36" y2="54" stroke="#00D4FF" strokeWidth="2" />
          <line x1="64" y1="54" x2="68" y2="54" stroke="#00D4FF" strokeWidth="2" />

          {/* Golden Letter 'B' & Alpha Neural Symbol inside chip */}
          <path
            d="M44 46 H51 C54 46 56 48 56 50 C56 51.8 54.5 53.2 52.5 53.5 C55 54 56.5 55.5 56.5 58 C56.5 60.5 54 62 50.5 62 H44 V46 Z M47.5 49 V52.5 H50.5 C52 52.5 53 51.5 53 50.5 C53 49.5 52 49 50.5 49 H47.5 Z M47.5 55.5 V59 H51 C52.5 59 53.5 58 53.5 57 C53.5 56 52.5 55.5 51 55.5 H47.5 Z"
            fill="url(#goldGrad)"
          />

          {/* Quantum Orbit Ellipses */}
          <ellipse
            cx="50"
            cy="54"
            rx="38"
            ry="14"
            stroke="url(#blueGrad)"
            strokeWidth="1.2"
            transform="rotate(-25 50 54)"
            opacity="0.65"
          />

          {/* Glowing Neural Micro-nodes */}
          <circle cx="50" cy="6" r="3" fill="#FFD700" />
          <circle cx="88" cy="28" r="3" fill="#00D4FF" />
          <circle cx="88" cy="72" r="3" fill="#FFD700" />
          <circle cx="50" cy="94" r="3" fill="#00D4FF" />
          <circle cx="12" cy="72" r="3" fill="#FFD700" />
          <circle cx="12" cy="28" r="3" fill="#00D4FF" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && variant !== 'icon' && (
        <div className="flex flex-col text-left leading-tight">
          <div className="flex items-center gap-1.5 font-heading font-black tracking-tight text-base md:text-xl">
            <span className="bg-gradient-to-r from-[#FFF275] via-[#FFD700] to-[#E5A800] bg-clip-text text-transparent">
              BILLIONAIRES
            </span>
            <span className="bg-gradient-to-r from-[#00F0FF] to-[#00A3FF] bg-clip-text text-transparent">
              AI
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] tracking-[0.16em] font-mono text-zinc-400 font-semibold uppercase">
            <span className="text-[#FFD700]/90">ACADEMY</span>
            <span className="text-zinc-600">•</span>
            <span className="text-[#00D4FF]/90">AFRICA BLOCKCHAIN</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Logo;
