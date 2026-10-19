import React from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { PaystackButton } from '../components/PaystackButton';
import {
  ArrowLeft,
  Coins,
  CheckCircle,
  Play,
  Cpu,
  Award,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  Clock,
  Layers
} from 'lucide-react';

interface CourseDetailPageProps {
  courseId: string;
  onBack: () => void;
  onStartLearning: (courseId: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onBack,
  onStartLearning
}) => {
  const { courses, enrollments, enrollInCourse, profile } = useEcosystem();
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const isEnrolled = enrollments.some((e) => e.course_id === course.id);

  const handleEnrollAndStart = () => {
    enrollInCourse(course.id);
    onStartLearning(course.id);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#FFD700] transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Course Media & Syllabus (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 sm:p-8 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/40 text-xs font-mono mb-3 w-fit">
                <span>{course.category}</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-mono">
                Taught by {course.instructor}
              </p>
            </div>
          </div>

          {/* Overview & Learn-to-Mine Architecture */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-heading font-bold text-white">Course Architecture</h2>
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              {course.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-800/80">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFD700] mb-1 font-bold">
                  <Coins className="w-4 h-4" />
                  <span>Tuition 10x Collateral</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Enrolling deposits <span className="text-white font-bold">{course.baacoin_value} BaaCoin</span> (${course.baacoin_value} value) locked into your student networth ledger.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] mb-1 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>60/40 Marketplace Asset</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Your graduation prompts are compiled and listed in the Marketplace. You receive 60% royalties on every public sale forever.
                </p>
              </div>
            </div>
          </div>

          {/* Modules & Lessons */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#FFD700]" />
              <span>Full Curriculum &amp; Mining Milestones</span>
            </h2>

            <div className="space-y-4">
              {course.modules.map((m, mIdx) => (
                <div key={m.id} className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-white font-heading">{m.title}</h3>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {m.duration_minutes} Mins
                    </span>
                  </div>

                  <div className="space-y-2">
                    {m.lessons.map((les) => (
                      <div
                        key={les.id}
                        className="p-3 rounded-lg bg-zinc-950 border border-zinc-800/60 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <Play className="w-3.5 h-3.5 text-[#00D4FF]" />
                          <span className="text-zinc-200 font-medium">{les.title}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-[#FFD700]">+{les.baacoin_reward} BaaCoin</span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">+{les.xp_reward} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Enrollment Card (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 bg-zinc-950 rounded-3xl border border-[#FFD700]/30 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-baseline justify-between border-b border-zinc-800/80 pb-4">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase">Tuition Fee</span>
                <span className="text-3xl font-heading font-black text-white block mt-0.5">
                  ${course.price} <span className="text-xs font-normal text-zinc-400">USD</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-[#FFD700] uppercase font-bold">10x Networth</span>
                <span className="text-xl font-mono font-bold text-[#FFD700] block mt-0.5">
                  +{course.baacoin_value} BaaCoin
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant {course.baacoin_value} BaaCoin Networth added to profile</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Learn-to-Mine terminal unlocks during lecture playback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Tutor assigned 24/7 for code testing &amp; mining</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NFT Certificate with physical/digital chip on graduation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Auto-compiled 60/40 Prompt Marketplace listing</span>
              </div>
            </div>

            {isEnrolled ? (
              <button
                onClick={handleEnrollAndStart}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 text-black font-heading font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Open Learn-to-Mine Portal</span>
              </button>
            ) : (
              <div className="space-y-3">
                <PaystackButton
                  email={profile.email}
                  amount={course.price}
                  type="course_enroll"
                  courseId={course.id}
                  courseTitle={course.title}
                  label={`Pay $${course.price} with Paystack • Unlock ${course.baacoin_value} BaaCoin`}
                  onSuccess={() => {
                    handleEnrollAndStart();
                  }}
                />

                <button
                  type="button"
                  onClick={handleEnrollAndStart}
                  className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-[11px] transition flex items-center justify-center gap-1.5"
                >
                  <Coins className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>Instant Demo Enroll (10x Networth Simulator)</span>
                </button>
              </div>
            )}

            <div className="text-center font-mono text-[10px] text-zinc-500">
              100% On-Chain Verifiable • Instant Lifetime Access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetailPage;
