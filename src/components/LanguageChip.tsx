import React, { useState, useEffect } from 'react';
import { Globe2, Check, Sparkles } from 'lucide-react';

export type SupportedLanguage = 'en' | 'yo' | 'ig' | 'ha' | 'sw' | 'fr' | 'pcm';

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  native: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'yo', name: 'Yoruba', native: 'Èdè Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', native: 'Harshen Hausa', flag: '🇳🇬' },
  { code: 'pcm', name: 'Pidgin', native: 'Naija Pidgin', flag: '🇳🇬' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili', flag: '🇰🇪' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
];

export const LanguageChip: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('richconnect_lang') as SupportedLanguage) || 'en';
  });

  const selectLanguage = (code: SupportedLanguage) => {
    setCurrentLang(code);
    localStorage.setItem('richconnect_lang', code);
    setIsOpen(false);
    // Emit global event for components
    window.dispatchEvent(new CustomEvent('language_changed', { detail: { lang: code } }));
  };

  const activeObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-zinc-950/90 border border-[#FFD700]/50 hover:border-[#FFD700] text-xs font-mono text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
        title="Change Sovereign African Language"
      >
        <span className="text-base">{activeObj.flag}</span>
        <span className="font-bold text-[#FFD700]">{activeObj.name}</span>
        <Globe2 className="w-3.5 h-3.5 text-[#00D4FF]" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-60 bg-zinc-950 border border-zinc-800 rounded-2xl p-2 shadow-2xl space-y-1 backdrop-blur-xl">
          <div className="px-3 py-1.5 border-b border-zinc-800/80 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
            <span>PAN-AFRICAN NEURAL CHIP</span>
            <Sparkles className="w-3 h-3 text-[#FFD700]" />
          </div>

          {SUPPORTED_LANGUAGES.map(lang => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                  isSelected
                    ? 'bg-[#FFD700] text-black font-bold'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{lang.flag}</span>
                  <div className="text-left leading-tight">
                    <span className="block font-medium">{lang.name}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-black/80' : 'text-zinc-500'}`}>
                      {lang.native}
                    </span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-black" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default LanguageChip;
