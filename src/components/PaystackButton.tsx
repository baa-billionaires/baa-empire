import React, { useState, useEffect } from 'react';
import {
  initialize,
  verify,
  getSubscriptionStatus,
  PaystackSubscription
} from '../lib/paystack';
import { useEcosystem } from '../context/EcosystemContext';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Lock,
  X,
  Sparkles,
  Loader2,
  Coins,
  Repeat,
  Calendar,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface PaystackButtonProps {
  email?: string;
  amount: number;
  type: 'course_enroll' | 'tutor_hire' | 'white_label' | 'bounty_deposit' | string;
  courseId?: string;
  courseTitle?: string;
  tutorId?: string;
  tutorName?: string;
  label?: string;
  className?: string;
  onSuccess?: (reference: string, data?: any) => void;
  onCancel?: () => void;
}

export const PaystackButton: React.FC<PaystackButtonProps> = ({
  email: customEmail,
  amount,
  type,
  courseId,
  courseTitle,
  tutorId,
  tutorName,
  label,
  className = '',
  onSuccess,
  onCancel
}) => {
  const { profile, enrollInCourse, recordInteraction } = useEcosystem();

  const userEmail = customEmail || profile.email || 'student@billionaires.ai';

  // Subscription state
  const [activeSub, setActiveSub] = useState<PaystackSubscription | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Card payment fields
  const [cardNumber, setCardNumber] = useState('4084 0840 8408 4081');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('408');
  const [pin, setPin] = useState('3310');
  const [step, setStep] = useState<'card' | 'otp' | 'success'>('card');
  const [otp, setOtp] = useState('12345');

  // Currency breakdown
  const ngnEquivalent = Math.round(amount * 1350).toLocaleString();
  const baacoinAllocation = type === 'course_enroll' ? Math.round(amount * 10) : Math.round(amount * 5);

  // Check subscription status if tutor hire
  useEffect(() => {
    if (type === 'tutor_hire' && tutorId) {
      const { isSubscribed, subscription } = getSubscriptionStatus(tutorId, userEmail);
      if (isSubscribed && subscription) {
        setActiveSub(subscription);
      } else {
        setActiveSub(null);
      }
    }
  }, [type, tutorId, userEmail]);

  const startCheckout = async () => {
    setLoading(true);
    try {
      const init = await initialize({
        email: userEmail,
        amount,
        type,
        metadata: {
          courseId,
          courseTitle,
          tutorId,
          tutorName,
          studentName: profile.full_name,
          baacoinAllocation
        }
      });

      setReference(init.reference);
      setStep('card');
      setIsOpen(true);
    } catch (err) {
      console.error('Paystack initialization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate 3D-Secure Bank Authorization redirect / challenge
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await verify(reference);
      setVerificationResult(res);

      if (res.success) {
        // Trigger automated allocation inside Ecosystem Context
        if (type === 'course_enroll' && courseId) {
          enrollInCourse(courseId);
          try {
            confetti({
              particleCount: 120,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {
            // Ignore confetti fallback
          }
        } else if (type === 'tutor_hire' && tutorId) {
          if (res.subscription) {
            setActiveSub(res.subscription);
          }
          recordInteraction({
            courseId: 'tutor-hiring',
            type: 'research_submit',
            promptData: `HIRED AI TUTOR: ${tutorName || tutorId} ($${amount}/mo subscription)`,
            customReward: { xp: 100, baacoin: 50 }
          });
        }

        setStep('success');

        setTimeout(() => {
          setIsOpen(false);
          if (onSuccess) {
            onSuccess(reference, res);
          }
        }, 1500);
      }
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  // If already subscribed to this tutor, show active status badge
  if (type === 'tutor_hire' && activeSub && activeSub.status === 'active') {
    return (
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Subscription Active
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
            30-DAY PASS
          </span>
        </div>
        <p className="text-xs text-zinc-300">
          Your school has 24/7 autonomous access to {tutorName || 'this AI Tutor'}. Next billing cycle: {new Date(activeSub.next_payment_date).toLocaleDateString()}.
        </p>
        <button
          onClick={startCheckout}
          className="text-[11px] font-mono text-[#00D4FF] hover:underline flex items-center gap-1 pt-1"
        >
          <Repeat className="w-3 h-3" />
          <span>Renew or update payment method (${amount}/mo)</span>
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className={
          className ||
          "w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] via-[#00A3FF] to-[#0080FF] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 shadow-xl shadow-[#00D4FF]/25 cursor-pointer"
        }
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-black" />
        ) : (
          <CreditCard className="w-4 h-4" />
        )}
        <span>
          {label ||
            (type === 'course_enroll'
              ? `Pay $${amount} via Paystack • Instant 10x Networth`
              : type === 'tutor_hire'
              ? `Hire Tutor for $${amount}/mo via Paystack`
              : `Pay $${amount} via Paystack`)}
        </span>
      </button>

      {/* Paystack Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-zinc-950 border border-[#00D4FF]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setIsOpen(false);
                if (onCancel) onCancel();
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Paystack Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4FF]/10 flex items-center justify-center text-[#00D4FF] border border-[#00D4FF]/30">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm text-white tracking-wide flex items-center gap-1.5">
                    <span>PAYSTACK SECURE</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      LIVE
                    </span>
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-400">Ref: {reference}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400">Amount</span>
                <span className="text-lg font-black text-[#FFD700] block">${amount} USD</span>
                <span className="text-[10px] font-mono text-zinc-500 block">≈ ₦{ngnEquivalent}</span>
              </div>
            </div>

            {/* BaaCoin Allocation Incentive Banner */}
            <div className="mb-5 p-3 rounded-2xl bg-gradient-to-r from-[#FFD700]/10 via-[#00D4FF]/10 to-transparent border border-[#FFD700]/30 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700] shrink-0">
                <Coins className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#FFD700] uppercase tracking-wider font-mono">
                  +{baacoinAllocation} BaaCoin Networth Trigger
                </div>
                <div className="text-[11px] text-zinc-400">
                  {type === 'course_enroll'
                    ? '10x tuition networth locked to profile until course completion'
                    : '30-Day autonomous AI tutor access with automated status tracking'}
                </div>
              </div>
            </div>

            {/* STEP 1: CARD DETAILS */}
            {step === 'card' && (
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-300">
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-[#00D4FF]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Paystack Test Card Loaded:</span>
                  </div>
                  <div>Card: 4084 0840 8408 4081 • EXP: 12/28 • CVV: 408</div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    Cardholder Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-300 font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00D4FF] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00D4FF] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      CVV
                    </label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                      maxLength={4}
                      className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00D4FF] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                    Card PIN
                  </label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                    maxLength={4}
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-[#00D4FF] rounded-xl px-4 py-2.5 text-xs text-white font-mono outline-none text-center tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  <span>Authorize ${amount} (₦{ngnEquivalent})</span>
                </button>
              </form>
            )}

            {/* STEP 2: 3DS SECURE OTP */}
            {step === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h5 className="font-heading font-bold text-white text-base">
                    Enter 3D-Secure One-Time Passcode
                  </h5>
                  <p className="text-xs text-zinc-400 mt-1">
                    An authentication code was sent to your bank-registered mobile number.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-center tracking-[0.5em] text-white font-mono outline-none"
                  />
                  <div className="text-center text-[10px] text-zinc-500 font-mono mt-1">
                    Preloaded Test OTP: 12345
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>Confirm Payment &amp; Allocate BaaCoin</span>
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS CONFIRMATION */}
            {step === 'success' && (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-heading font-black text-white">
                  Payment Verified!
                </h4>
                <div className="p-3 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono font-bold">
                  +{baacoinAllocation} BaaCoin Networth Allocated!
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  {type === 'tutor_hire'
                    ? 'Subscription active for 30 days • Full AI tutor access unlocked'
                    : 'Course unlocked • Learn-to-Mine terminal ready'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaystackButton;
