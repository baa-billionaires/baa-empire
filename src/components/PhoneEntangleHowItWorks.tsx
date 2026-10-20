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
  Check
} from 'lucide-react';

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
      a: 'NO! 100% remote. Your phone stays with you. You just leave our app open at night. No shipping, no USB.'
    },
    {
      q: 'Will it spoil my phone / battery?',
      a: 'NO. We use only 20% of idle CPU when phone is charging + cool. Like watching YouTube. We auto-stop if phone heats up. 2,400 phones already running safely.'
    },
    {
      q: 'What kind of phone can plug?',
      a: 'Any Android 8+ or iPhone with 3GB RAM and above. The stronger the phone, the more you earn. You can plug 1-3 phones per account (use family phones to earn 3x!).'
    },
    {
      q: 'Do I need data?',
      a: 'Yes, small data - WiFi is best. Uses ~200MB per night (less than TikTok). We pay you 10x the data cost back.'
    },
    {
      q: 'Is this crypto mining that police will arrest?',
      a: 'NO. This is legal AI compute + data processing under MODE Digital Creations Limited (BN: UY/009049). CAC registered, Paystack verified. Not Bitcoin mining. We process real AI tasks for our own platforms (WorkOS, Automode AI).'
    }
  ];

  return (
    <div className="w-full my-8 bg-gradient-to-b from-zinc-950 via-[#030a06] to-zinc-950 border-2 border-[#00FF88]/40 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#00FF88]/10 relative overflow-hidden font-sans">
      {/* Background Pi Network / Grass.io Cyber Grid Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF88]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP LIVE STATUS BAR: Pi Network + Grass.io Style Live Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-[#00FF88] animate-ping" />
          <span className="text-sm sm:text-base font-mono font-black text-white">
            <span className="text-[#00FF88]">{livePhonesCount.toLocaleString()}</span> Phones Plugged In Right Now — Earning
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-[#00FF88]/40 text-[#00FF88] font-bold flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>0 CABLE REQUIRED</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hidden md:inline">
            Overnight Idle Mining
          </span>
        </div>
      </div>

      {/* REQUIRED EXACT SUB-HEADLINE: BOLD WHITE TEXT ON GREEN BACKGROUND */}
      <div className="my-6 relative z-10">
        <div className="inline-block w-full text-center sm:text-left">
          <div className="bg-[#00C853] text-white font-extrabold text-sm sm:text-lg uppercase tracking-wide px-4 sm:px-6 py-3 rounded-2xl shadow-lg shadow-[#00C853]/25 flex items-center justify-center sm:justify-start gap-2">
            <span>👇</span>
            <span>HOW TO PLUG YOUR PHONE IN 60 SECONDS (NO CABLE NEEDED)</span>
          </div>
        </div>
      </div>

      {/* PHONE MINING VISUAL GRAPHIC: Grass / Pi Network Glowing Node Animation */}
      <div className="mb-8 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          {/* Animated Glowing Phone Mockup */}
          <div className="relative shrink-0">
            <div className="w-14 h-24 sm:w-16 sm:h-28 rounded-2xl bg-black border-2 border-[#00FF88] p-1 shadow-lg shadow-[#00FF88]/30 flex flex-col items-center justify-between relative overflow-hidden">
              <div className="w-5 h-1 bg-zinc-800 rounded-full" />
              <div className="w-full flex-1 flex flex-col items-center justify-center space-y-1">
                <BatteryCharging className="w-5 h-5 text-[#00FF88] animate-pulse" />
                <span className="text-[8px] font-mono text-emerald-400 font-bold">20% CPU</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping mb-0.5" />

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00FF88]/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Glowing wireless waves */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
          </div>

          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/40 text-[10px] font-mono font-bold uppercase">
                GRASS.IO + PI NETWORK ARCHITECTURE
              </span>
              <span className="text-zinc-500 text-xs hidden sm:inline">•</span>
              <span className="text-zinc-400 text-xs hidden sm:inline font-mono">100% Safe Background Protocol</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white">
              Turn Your Sleeping Hours into Passive Cash Flow
            </h4>
            <p className="text-xs text-zinc-400 max-w-xl">
              While you sleep, your idle smartphone validates encrypted student micro-transactions and AI model checkpoints. Zero battery degradation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-center font-mono">
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase">Nightly Yield</span>
            <span className="text-base sm:text-lg font-black text-[#00FF88]">₦100 - ₦500</span>
          </div>
          <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
            <span className="text-[10px] text-zinc-400 block uppercase">Data Usage</span>
            <span className="text-base sm:text-lg font-black text-[#FFD700]">~200 MB</span>
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
            Click the big green button on your dashboard. We generate your unique <strong>Node ID</strong> — This is your phone's passport in our Data Center.
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
            Go to BAA Dashboard &gt; Click "Start Mining" &gt; Leave phone plugged to charger + connected to WiFi + screen on overnight. That's it. Your idle CPU becomes a money node.
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
            <p className="font-semibold text-white">Your phone is now part of UADC Protocol:</p>
            <ul className="space-y-1 text-[11px] text-zinc-300">
              <li className="flex items-start gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Processes small AI tasks (CAPTCHA, data labeling, model training)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Validates student business transactions</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#00D4FF]">•</span>
                <span>Mines our BAA Coin</span>
              </li>
            </ul>
            <p className="text-[11px] font-bold text-[#00FF88] pt-1">
              Earn ₦100-₦500 per night per phone (depends on RAM &amp; time left on)
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
            Morning: Tap "Stop &amp; Claim" -&gt; Your earnings go to your BAA Wallet.
          </p>

          <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 text-[11px] font-mono text-zinc-300 space-y-1">
            <span className="text-white font-bold block">You can:</span>
            <div className="text-emerald-400">1. Withdraw to bank via Paystack</div>
            <div className="text-[#FFD700]">2. Stake to start business in TrillionaresOS</div>
          </div>
        </div>
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
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs font-mono text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Success: Your phone is provisioned on Node {generatedNodeId}. Leave your phone connected to WiFi &amp; charging tonight to accumulate ₦100-₦500.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneEntangleHowItWorks;
