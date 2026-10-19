import React, { useState, useEffect } from 'react';
import { useEcosystem } from '../context/EcosystemContext';
import { AUDIENCE_PRESETS } from '../lib/audiences';
import {
  INITIAL_SOCIAL_ACCOUNTS,
  getStoredSocialPosts,
  saveSocialPost,
  publishPost,
  generateContentFromPrompt,
  SocialAccount,
  SocialPost
} from '../lib/socialPublisher';
import {
  Share2,
  CheckCircle,
  Plus,
  Radio,
  Send,
  Sparkles,
  Calendar,
  Eye,
  Heart,
  TrendingUp,
  ArrowLeft,
  DollarSign
} from 'lucide-react';

export const SocialCommandPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { courses } = useEcosystem();

  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_SOCIAL_ACCOUNTS);
  const [posts, setPosts] = useState<SocialPost[]>(() => getStoredSocialPosts());
  const [promptInput, setPromptInput] = useState('Market the ChatGPT ATM course to Gen-Z students in Lagos and Nairobi');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['TikTok', 'Instagram', 'Twitter']);
  const [selectedAudience, setSelectedAudience] = useState<string>(AUDIENCE_PRESETS[0].id);
  const [autopilotOn, setAutopilotOn] = useState(true);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [previewStats, setPreviewStats] = useState<{ estReach: number; hashtags: string[] }>({
    estReach: 45000,
    hashtags: ['#BillionairesAI', '#BaaCoin', '#ChatGPT', '#RemoteWork']
  });

  // Autopilot loop simulation
  useEffect(() => {
    let interval: any;
    if (autopilotOn) {
      interval = setInterval(() => {
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        const generated = generateContentFromPrompt("Autopilot syndicated post", randomCourse?.title);
        const newPost = publishPost(generated.caption, ['TikTok', 'Instagram', 'Twitter'], "Autopilot Agent");
        setPosts(prev => [newPost, ...prev.slice(0, 15)]);
      }, 40000); // 40s autopilot post tick
    }
    return () => clearInterval(interval);
  }, [autopilotOn, courses]);

  const handleGeneratePreview = () => {
    const audience = AUDIENCE_PRESETS.find(a => a.id === selectedAudience);
    const content = generateContentFromPrompt(promptInput, "AI Instagram Millionaire");
    setPreviewContent(content.caption);
    setPreviewStats({
      estReach: 12000 + Math.floor(Math.random() * 60000),
      hashtags: audience ? audience.hashtags : content.hashtags
    });
  };

  const handlePostNow = () => {
    if (!previewContent) {
      handleGeneratePreview();
    }
    const finalContent = previewContent || generateContentFromPrompt(promptInput).caption;
    const post = publishPost(finalContent, selectedPlatforms, promptInput);
    setPosts(prev => [post, ...prev]);
    setPreviewContent('');
  };

  const toggleConnectAccount = (id: string) => {
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, is_connected: !a.is_connected } : a));
  };

  const togglePlatform = (plat: string) => {
    if (selectedPlatforms.includes(plat)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== plat));
    } else {
      setSelectedPlatforms([...selectedPlatforms, plat]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Vault</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <span className="text-xs font-mono text-[#00D4FF] uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-[#00D4FF]" />
              Multi-Platform Syndication Command
            </span>
            <h1 className="text-3xl font-heading font-black text-white mt-1">
              Social Media Autopost Center
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Connect accounts, generate viral hooks with 20 preset audiences, and auto-syndicate 10x daily.
            </p>
          </div>

          {/* Autopilot Master Switch */}
          <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 p-2.5 px-4 rounded-2xl">
            <span className="text-xs font-mono text-zinc-400">Autopilot 10x Daily:</span>
            <button
              onClick={() => setAutopilotOn(!autopilotOn)}
              className={`px-4 py-1.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 ${
                autopilotOn
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/50 shadow-md'
                  : 'bg-zinc-900 text-zinc-500'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autopilotOn ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
              <span>{autopilotOn ? 'AUTOPILOT ON' : 'PAUSED'}</span>
            </button>
          </div>
        </div>

        {/* Connected Social Accounts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {accounts.map(acc => (
            <div
              key={acc.id}
              onClick={() => toggleConnectAccount(acc.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition text-center space-y-1 ${
                acc.is_connected
                  ? 'bg-zinc-950 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : 'bg-zinc-950 border-zinc-800 opacity-60'
              }`}
            >
              <div className="text-xs font-bold font-mono text-white">{acc.platform}</div>
              <div className="text-[10px] text-zinc-400 font-mono truncate">{acc.account_name}</div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full inline-block ${
                acc.is_connected ? 'bg-emerald-950 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {acc.is_connected ? `${acc.followers.toLocaleString()} fllwrs` : 'Disconnected'}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Post Creator & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Creator Form (7 Cols) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white font-heading">AI Content Composer</h3>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Post Prompt / Marketing Objective
              </label>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-xs text-white font-mono outline-none focus:border-[#00D4FF] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1">
                Target Audience Preset (20 Preloaded)
              </label>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono outline-none focus:border-[#00D4FF]"
              >
                {AUDIENCE_PRESETS.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.age_range} • {a.locations.slice(0, 2).join(', ')})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Platforms Checkboxes */}
            <div>
              <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
                Target Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {['TikTok', 'Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube'].map(plat => {
                  const isChecked = selectedPlatforms.includes(plat);
                  return (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => togglePlatform(plat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border ${
                        isChecked
                          ? 'bg-[#00D4FF] text-black font-bold border-[#00D4FF]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {plat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleGeneratePreview}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>Generate Preview</span>
              </button>

              <button
                type="button"
                onClick={handlePostNow}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0080FF] text-black font-heading font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-lg shadow-[#00D4FF]/25 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>Publish Now</span>
              </button>
            </div>
          </div>

          {/* Post Preview & Estimated Reach (5 Cols) */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">Live Multi-Platform Preview</span>

              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FFD700] text-black font-bold text-xs flex items-center justify-center">
                    BA
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Billionaires AI Academy</span>
                    <span className="text-[9px] font-mono text-zinc-500">Sponsored • Just now</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-200 whitespace-pre-wrap font-sans leading-relaxed">
                  {previewContent || "Click 'Generate Preview' to synthesize full viral copy, hashtags and psychological CTA hooks tailored to your selected audience preset."}
                </p>

                <div className="flex flex-wrap gap-1 text-[10px] font-mono text-[#00D4FF]">
                  {previewStats.hashtags.map((tag, i) => (
                    <span key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between text-xs font-mono">
              <span className="text-zinc-400">Estimated Reach:</span>
              <span className="text-emerald-400 font-bold">{previewStats.estReach.toLocaleString()} Impressions</span>
            </div>
          </div>
        </div>

        {/* Live Published Feed */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white font-heading">Syndicated Posts &amp; Viral Analytics</h4>
            <span className="text-xs font-mono text-zinc-400">{posts.length} Posts Archived</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-3">Post Content</th>
                  <th className="py-2.5 px-3">Platforms</th>
                  <th className="py-2.5 px-3">Views</th>
                  <th className="py-2.5 px-3">Likes</th>
                  <th className="py-2.5 px-3">Direct Earnings</th>
                  <th className="py-2.5 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {posts.map(p => (
                  <tr key={p.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-3 max-w-sm truncate text-zinc-300 font-sans">{p.content}</td>
                    <td className="py-3 px-3 text-[#00D4FF]">{p.platforms.join(', ')}</td>
                    <td className="py-3 px-3 text-white font-bold">{p.views.toLocaleString()}</td>
                    <td className="py-3 px-3 text-red-400">{p.likes}</td>
                    <td className="py-3 px-3 text-[#FFD700] font-bold">+${p.earnings}</td>
                    <td className="py-3 px-3 text-zinc-500">{new Date(p.created_at).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SocialCommandPage;
