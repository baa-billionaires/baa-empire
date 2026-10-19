import React, { useState } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { Bot, Send, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';

interface TutorEmbedPageProps {
  tutorId?: string;
}

export const TutorEmbedPage: React.FC<TutorEmbedPageProps> = ({ tutorId }) => {
  const { aiTutors } = useEcosystem();
  const tutor = aiTutors.find(t => t.id === tutorId) || aiTutors[0];

  const [chat, setChat] = useState<Array<{ sender: 'user' | 'tutor'; text: string }>>([
    { sender: 'tutor', text: tutor.greeting }
  ]);
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
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
          text: `[${tutor.name}]: Regarding "${userText}" — as structured in our Africa Blockchain & AI University curriculum, here is the verified breakdown and optimal execution approach.`
        }
      ]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col p-4 font-sans select-none border border-zinc-800">
      {/* Embed Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={tutor.avatar_url}
            alt={tutor.name}
            className="w-10 h-10 rounded-xl object-cover border border-[#00D4FF]"
          />
          <div>
            <h3 className="text-sm font-bold font-heading text-white">{tutor.name}</h3>
            <span className="text-[10px] text-[#00D4FF] font-mono block">{tutor.subject}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>School License Verified</span>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 py-4 overflow-y-auto space-y-3 text-xs">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[9px] font-mono text-zinc-500 mb-0.5">
              {msg.sender === 'user' ? 'Student' : tutor.name}
            </span>
            <div
              className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#00D4FF] text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-200 border border-zinc-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="text-[11px] font-mono text-zinc-400 animate-pulse flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-[#00D4FF]" />
            <span>{tutor.name} is computing response...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="pt-3 border-t border-zinc-800 flex gap-2 shrink-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Ask ${tutor.name} any question...`}
          className="flex-1 bg-zinc-900 border border-zinc-800 focus:border-[#00D4FF] rounded-xl px-3 py-2 text-xs text-white outline-none"
        />
        <button
          type="submit"
          disabled={!query.trim() || isThinking}
          className="px-4 py-2 bg-[#00D4FF] text-black font-bold text-xs rounded-xl hover:brightness-110 active:scale-95 transition"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Powered by Watermark */}
      <div className="pt-2 text-center text-[9px] font-mono text-zinc-600">
        Powered by Billionaires AI Academy • Plug &amp; Play Autonomous Mentor
      </div>
    </div>
  );
};
export default TutorEmbedPage;
