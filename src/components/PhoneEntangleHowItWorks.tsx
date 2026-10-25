import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  BatteryCharging,
  Cpu,
  Coins,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Wifi,
  Lock,
  DollarSign,
  Activity,
  Layers,
  Radio,
  Server,
  Flame,
  Check,
  Calculator,
  TrendingUp
} from 'lucide-react';
import { UADCMonetizationModels } from './UADCMonetizationModels';

interface PhoneEntangleHowItWorksProps {
  onEntangleClick?: () => void;
}

export const PhoneEntangleHowItWorks: React.FC<PhoneEntangleHowItWorksProps> = ({
  onEntangleClick
}) => {
  // Live fluctuating active phone counter
  const [livePhonesCount, setLivePhonesCount] = useState<number>(2417);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isEntangling, setIsEntangling] = useState<boolean>(false);
  const [entangledSuccess, setEntangledSuccess] = useState<boolean>(false);
  const [generatedNodeId, setGeneratedNodeId] = useState<string>('');

  // Interactive Sleep Yield Calculator State
  const [calcPhones, setCalcPhones] = useState<number>(1);
  const [calcRamTier, setCalcRamTier] = useState<'standard' | 'high' | 'super'>('standard');

  const calculatedYield = React.useMemo(() => {
    // Standard: ₦500 - ₦2,000 / night per phone
    // High (6-8GB RAM): ₦2,500 - ₦5,500 / night
    // Super (12GB+ / NPU): ₦5,000 - ₦8,500 / night
    let baseNightly = 1250; // midpoint of ₦500 - ₦2,000
    let minNightly = 500;
    let maxNightly = 2000;

    if (calcRamTier === 'high') {
      baseNightly = 4000;
      minNightly = 2500;
      maxNightly = 5500;
    } else if (calcRamTier === 'super') {
      baseNightly = 6750;
      minNightly = 5000;
      maxNightly = 8500;
    }

    const nightlyTotalMin = minNightly * calcPhones;
    const nightlyTotalMax = maxNightly * calcPhones;
    const monthlyTotalMin = nightlyTotalMin * 30;
    const monthlyTotalMax = nightlyTotalMax * 30;
    const baacoinMonthly = Math.round((monthlyTotalMin + monthlyTotalMax) / (2 * 1550));

    return {
      nightlyText: `₦${nightlyTotalMin.toLocaleString()} - ₦${nightlyTotalMax.toLocaleString()}`,
      monthlyText: `₦${monthlyTotalMin.toLocaleString()} - ₦${monthlyTotalMax.toLocaleString()}`,
      baacoinMonthly
    };
  }, [calcPhones, calcRamTier]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePhonesCount(prev => prev + (Math.random() > 0.45 ? 1 : -1));
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handleEntangleNow = () => {
    setIsEntangling(true);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const nodeId = `UADC-NODE-NG-${randomSuffix}`;
    setGeneratedNodeId(nodeId);

    setTimeout(() => {
      setIsEntangling(false);
      setEntangledSuccess(true);
      if (onEntangleClick) onEntangleClick();
    }, 1200);
  };

  const faqs = [
    {
      q: 'Do I need to bring my phone to Port Harcourt?',
      a: 'NO! 100% remote. Your phone stays with you. You just leave our app open at night while charging. No shipping, no USB cable to a computer.'
    },
    {
      q: 'Will it spoil my phone / battery?',
      a: 'NO. We use only 15-20% of idle CPU when phone is plugged into its charger and cool. Similar to playing low-resolution background audio. The app auto-pauses computation if your battery reaches 38°C.'
    },
    {
      q: 'What kind of phone can plug?',
      a: 'Any Android 8+ or iPhone with 3GB RAM and above. The stronger your processor, the higher your nightly reward. You can entangle 1 to 3 family phones on the same account to multiply your earnings 3x!'
    },
    {
      q: 'How do I withdraw my earnings?',
      a: 'Every morning at 6:00 AM, your validated computations convert into spendable BaaCoin. You can instantly withdraw cash straight to your Nigerian bank account via Paystack, or reinvest into autonomous swarm startups.'
    }
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-b from-zinc-950 via-zinc-900 to-black border-2 border-emerald-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-10">
      {/* Subtle Matrix Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D4FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: EXACT REQUESTED EARNINGS UPGRADE */}
      <div className="relative z-10 space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-emerald-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#00FF88]/15 border border-[#00FF88]/40 flex items-center justify-center shrink-0 relative">
              <Smartphone className="w-7 h-7 text-[#00FF88]" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400/40 animate-ping pointer-events-none" />
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40 text-[10px] font-mono font-bold uppercase tracking-wider">
                  GRASS.IO + PI NETWORK + DEEPSEEK ARCHITECTURE
                </span>
                <span className="text-zinc-500 text-xs hidden sm:inline">•</span>
                <span className="text-zinc-400 text-xs hidden sm:inline font-mono">100% Safe Background Protocol</span>
              </div>

              {/* EXACT REQUESTED HEADLINE */}
              <h3 className="text-xl sm:text-2xl font-heading font-black text-white">
                Turn Your Sleeping Hours into Passive Cash Flow
              </h3>

              {/* EXACT REQUESTED COPY */}
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                While you sleep, your idle smartphone validates encrypted student micro-transactions and AI model checkpoints. Zero battery degradation.
              </p>
            </div>
          </div>

          {/* EXACT REQUESTED STAT BADGES (ELEVATED) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 text-center font-mono">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/80 border border-emerald-500/40 shadow-[0_0_20px_rgba(0,255,136,0.15)] min-w-[150px]">
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-semibold">
                Nightly Yield
              </span>
              <span className="text-lg sm:text-2xl font-heading font-black text-[#00FF88] block mt-0.5">
                ₦500 - ₦2,000
              </span>
              <span className="text-[10px] text-zinc-500 block">Up to ₦8,500 on Supernodes</span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-black/80 border border-zinc-800 min-w-[120px]">
              <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-semibold">
                Data Usage
              </span>
              <span className="text-lg sm:text-2xl font-heading font-black text-[#FFD700] block mt-0.5">
                ~200 MB
              </span>
              <span className="text-[10px] text-zinc-500 block">Compressed Edge Protocol</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE SLEEPING YIELD CALCULATOR */}
        <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#00FF88]" />
              <h4 className="text-xs sm:text-sm font-heading font-bold text-white uppercase tracking-wider">
                Live Sleep Yield Calculator
              </h4>
              <span className="text-[11px] font-mono text-zinc-400">
                (Real-World Nigerian Naira Payout)
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-zinc-400">Phones Connected:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => setCalcPhones(num)}
                    className={`px-3 py-1 rounded-lg border font-bold transition cursor-pointer ${
                      calcPhones === num
                        ? 'bg-[#00FF88] text-black border-[#00FF88]'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {num} {num === 1 ? 'Phone' : 'Phones'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {[
              { id: 'standard', label: 'Standard Phone (3-4GB RAM)', yieldNote: '₦500 - ₦2,000 / night per phone' },
              { id: 'high', label: 'High-Throughput (6-8GB RAM)', yieldNote: '₦2,500 - ₦5,500 / night per phone' },
              { id: 'super', label: 'Flagship AI Supernode (12GB+ / NPU)', yieldNote: '₦5,000 - ₦8,500 / night per phone' }
            ].map(tier => (
              <button
                key={tier.id}
                onClick={() => setCalcRamTier(tier.id as any)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  calcRamTier === tier.id
                    ? 'bg-zinc-900 border-[#00FF88] text-white shadow-lg'
                    : 'bg-black/40 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white">{tier.label}</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{tier.yieldNote}</div>
              </button>
            ))}
          </div>

          {/* Calculator Output Banner */}
          <div className="p-4 rounded-xl bg-black/80 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-zinc-400 block text-[11px]">Calculated Nightly Passive Payout:</span>
              <span className="text-lg font-heading font-black text-[#00FF88]">
                {calculatedYield.nightlyText} / night
              </span>
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-zinc-800 pt-2 sm:pt-0 sm:pl-4">
              <span className="text-zinc-400 block text-[11px]">Monthly Passive Income:</span>
              <span className="text-base sm:text-lg font-heading font-black text-[#FFD700]">
                {calculatedYield.monthlyText} / month
              </span>
              <span className="text-[10px] text-zinc-400 ml-1">
                (≈ {calculatedYield.baacoinMonthly} BaaCoin)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 STEP CARDS IN A ROW WITH PHONE ICONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
        {/* STEP 1 */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-[#00FF88]/60 transition rounded-2xl p-5 space-y-3 relative group shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/40 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5 text-[#00FF88]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase block">
              STEP 1
            </span>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>🟢 TAP "ENTANGLE MY PHONE"</span>
            </h3>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Click the big green button on your dashboard. We generate your unique <strong>Node ID</strong> — This is your phone's passport in our sovereign Data Center.
          </p>

          <div className="pt-2">
            <span className="inline-block px-2 py-1 rounded-md bg-black/60 border border-zinc-800 font-mono text-[10px] text-zinc-400">
              Pass: NODE-ID-{livePhonesCount}
            </span>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-[#FFD700]/60 transition rounded-2xl p-5 space-y-3 relative group shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40 flex items-center justify-center font-bold">
            <BatteryCharging className="w-5 h-5 text-[#FFD700]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-400 tracking-wider uppercase block">
              STEP 2
            </span>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>🔋 LEAVE APP OPEN + CHARGING AT NIGHT</span>
            </h3>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Go to BAA Dashboard &gt; Click "Start Mining" &gt; Leave phone plugged to charger + connected to WiFi + screen on overnight. Your idle CPU becomes a money node.
          </p>

          <div className="pt-2">
            <span className="inline-block px-2 py-1 rounded-md bg-black/60 border border-zinc-800 font-mono text-[10px] text-amber-300">
              Only 20% CPU • Cool Temp
            </span>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-[#00D4FF]/60 transition rounded-2xl p-5 space-y-3 relative group shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/15 text-[#00D4FF] border border-[#00D4FF]/40 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5 text-[#00D4FF]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase block">
              STEP 3
            </span>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>📊 WATCH YOUR PHONE BECOME A WORKER</span>
            </h3>
          </div>

          <div className="text-xs text-zinc-300 leading-relaxed font-sans space-y-1">
            <p className="font-semibold text-white">Your phone executes sovereign UADC tasks:</p>
            <ul className="space-y-1 text-[11px] text-zinc-300">
              <li className="flex items-start gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Distributed DeepSeek-R1 AI Sharding &amp; local translation</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Zero-knowledge Base L2 student payment proof relay</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Mines verified BaaCoin directly to wallet</span>
              </li>
            </ul>
            <p className="text-[11px] font-bold text-[#00FF88] pt-1">
              Earn ₦500 - ₦2,000/night base (High-compute clusters earn up to ₦8,500 - ₦22,000)
            </p>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="bg-zinc-900/90 border border-zinc-800 hover:border-emerald-400/60 transition rounded-2xl p-5 space-y-3 relative group shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold">
            <Coins className="w-5 h-5 text-emerald-400" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase block">
              STEP 4
            </span>
            <h3 className="text-sm font-black text-white flex items-center gap-1.5">
              <span>💰 WITHDRAW OR STAKE</span>
            </h3>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            Morning: Tap "Stop &amp; Claim" -&gt; Your earnings go straight to your active BAA Wallet.
          </p>

          <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-1">
            <span className="text-white font-bold block">Instant Options:</span>
            <div className="text-emerald-400">1. Withdraw to bank via Paystack</div>
            <div className="text-[#FFD700]">2. Stake in TrillionaresOS Startups</div>
          </div>
        </div>
      </div>

      {/* NEW UADC SOVEREIGN MONETIZATION MODELS SHOWCASE */}
      <div className="pt-4 relative z-10">
        <UADCMonetizationModels />
      </div>

      {/* ACCORDION STYLE FAQ BOX RIGHT UNDER STEPS */}
      <div className="mt-8 space-y-3 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
            FREQUENTLY ASKED QUESTIONS — PHONE PLUG &amp; SAFETY
          </span>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-800/90 bg-zinc-900/70 overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-850/50 transition cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-[#00FF88] font-mono">Q:</span>
                    <span>{faq.q.replace(/^Q:\s*/, '')}</span>
                  </span>
                  <div className="shrink-0 text-zinc-400">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#00FF88]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 bg-black/40 font-sans">
                    <strong className="text-emerald-400 font-mono">A: </strong>
                    {faq.a.replace(/^A:\s*/, '')}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BIG GREEN CTA BUTTON AFTER FAQ */}
      <div className="mt-8 pt-4 flex flex-col items-center justify-center text-center relative z-10 space-y-3">
        <button
          onClick={handleEntangleNow}
          disabled={isEntangling}
          className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-[#00C853] via-[#00E676] to-[#00C853] hover:brightness-110 active:scale-95 text-black font-heading font-black text-sm sm:text-base uppercase tracking-wider transition shadow-2xl shadow-[#00C853]/40 flex items-center justify-center gap-3 cursor-pointer"
        >
          {isEntangling ? (
            <>
              <Activity className="w-5 h-5 text-black animate-spin" />
              <span>GENERATING NODE PASSPORT...</span>
            </>
          ) : entangledSuccess ? (
            <>
              <Check className="w-5 h-5 text-black font-black" />
              <span>PHONE ENTANGLED! {generatedNodeId} ACTIVE</span>
            </>
          ) : (
            <>
              <span>🚀 ENTANGLE MY PHONE NOW - START EARNING TONIGHT</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </>
          )}
        </button>

        {/* REQUIRED EXACT TRUST LINE UNDER BUTTON */}
        <p className="text-[11px] sm:text-xs font-mono text-zinc-400 max-w-2xl leading-relaxed text-center">
          "Secured by MODE Digital Creations Limited &amp; Rossyst Enterprises Limited (BN: UY/009049) | 2,400 Nodes Live | No. 5 Ordu Street, PH"
        </p>

        {entangledSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Success: Your phone is provisioned on Node {generatedNodeId}. Leave your phone connected to WiFi &amp; charging tonight to accumulate ₦500 - ₦2,000+ into your BAA Wallet.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneEntangleHowItWorks;
