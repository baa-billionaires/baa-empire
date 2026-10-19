import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { PaystackButton } from '../components/PaystackButton';
import {
  ArrowLeft,
  Bot,
  Code2,
  Copy,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  School,
  ExternalLink
} from 'lucide-react';

interface TutorDetailPageProps {
  tutorId: string;
  onBack: () => void;
}

export const TutorDetailPage: React.FC<TutorDetailPageProps> = ({ tutorId, onBack }) => {
  const { aiTutors } = useEcosystem();
  const tutor = aiTutors.find(t => t.id === tutorId) || aiTutors[0];

  const [copied, setCopied] = useState(false);
  const [chat, setChat] = useState<Array<{ sender: 'user' | 'tutor'; text: string }>>([
    { sender: 'tutor', text: tutor.greeting }
  ]);
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [schoolSubscribed, setSchoolSubscribed] = useState(true);

  const embedCode = `<iframe src="https://billionairesai.academy/embed/tutor/${tutor.id}" width="100%" height="650" frameborder="0" allow="clipboard-write"></iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isThinking) return;

    const userText = query;
    setChat(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');
    setIsThinking(true);

    setTimeout(() => {
      setChat(prev => [
        ...prev,
        {
          sender: 'tutor',
          text: `[${tutor.name}]: Regarding "${userText}" — as structured in our Africa Blockchain & AI University curriculum, this requires establishing rigorous boundary constraints. Here is the operational architecture...`
        }
      ]);
      setIsThinking(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#00D4FF] transition font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Tutor Profile & Iframe Code Generator (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row gap-6">
            <img
              src={tutor.avatar_url}
              alt={tutor.name}
              className="w-32 h-32 rounded-2xl object-cover border border-zinc-700 shrink-0 mx-auto sm:mx-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono text-[#00D4FF] uppercase tracking-wider font-bold">
                {tutor.subject}
              </span>
              <h1 className="text-2xl font-heading font-black text-white">{tutor.name}</h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{tutor.description}</p>
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Online &amp; Active
                </span>
                <span className="text-zinc-400">• Hired by {tutor.hired_by_schools} schools</span>
              </div>
            </div>
          </div>

          {/* Embed Iframe Code Box */}
          <div className="bg-zinc-950 rounded-3xl border border-[#00D4FF]/30 p-6 sm:p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D4FF] font-bold">
                <Code2 className="w-4 h-4" />
                <span>PLUG &amp; PLAY IFRAME EMBED CODE</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 text-[#00D4FF] text-xs font-mono font-bold transition border border-[#00D4FF]/30"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Code Copied!' : 'Copy Iframe'}</span>
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Paste this snippet into any school, university portal, LMS (Moodle, Blackboard, Canvas) or custom website. The AI tutor runs autonomously 24/7.
            </p>

            <pre className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap">
              {embedCode}
            </pre>

            {/* Autonomous Billing Verification Notice */}
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Autonomous School License:</span>
                <span className="text-[#FFD700] font-bold">${tutor.price_monthly} USD / month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Paystack / Card Billing Check:</span>
                <span className="text-emerald-400 font-bold">
                  {schoolSubscribed ? 'Active (Auto-Renewing)' : 'Suspended'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-800/60">
                Full autonomy rule: If the school cancels or card fails, the tutor auto-stops serving queries until payment clears.
              </p>

              <div className="pt-2">
                <PaystackButton
                  amount={tutor.price_monthly}
                  type="tutor_hire"
                  tutorId={tutor.id}
                  tutorName={tutor.name}
                  label={`Hire ${tutor.name} ($${tutor.price_monthly}/mo Paystack Subscription)`}
                  onSuccess={() => {
                    setSchoolSubscribed(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat Simulation Preview (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 flex flex-col h-[580px] shadow-2xl">
          <div className="pb-3 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#00D4FF]" />
              <span className="text-xs font-bold text-white font-mono">Live Student View Simulator</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">100% Responsive</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 py-4 overflow-y-auto space-y-3 text-xs font-sans">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[9px] font-mono text-zinc-500 mb-0.5">
                  {msg.sender === 'user' ? 'Student' : tutor.name}
                </span>
                <div
                  className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#00D4FF] text-black font-medium'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="text-[11px] font-mono text-zinc-500 animate-pulse">
                {tutor.name} is formulating response...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="pt-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Test student query..."
              className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none"
            />
            <button
              type="submit"
              disabled={!query.trim() || isThinking}
              className="px-4 py-2 bg-[#00D4FF] text-black rounded-xl font-bold text-xs hover:brightness-110 active:scale-95 transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default TutorDetailPage;
