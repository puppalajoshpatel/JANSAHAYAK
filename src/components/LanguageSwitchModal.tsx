import React from 'react';
import { X, Languages, Globe, Check, Sparkles } from 'lucide-react';
import { ALL_INDIAN_STATE_LANGUAGES, IndianLanguage } from '../data/indianLanguages';

interface LanguageSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (langCode: string) => void;
  isFullRegionalUI: boolean;
  onToggleFullRegionalUI: (enabled: boolean) => void;
}

export const LanguageSwitchModal: React.FC<LanguageSwitchModalProps> = ({
  isOpen,
  onClose,
  selectedLanguage,
  onSelectLanguage,
  isFullRegionalUI,
  onToggleFullRegionalUI
}) => {
  if (!isOpen) return null;

  const currentLang = ALL_INDIAN_STATE_LANGUAGES.find(l => l.code === selectedLanguage) || ALL_INDIAN_STATE_LANGUAGES[0];

  const regions = ['All', 'North', 'South', 'East', 'West', 'Northeast'] as const;
  const [selectedRegion, setSelectedRegion] = React.useState<string>('All');

  const filteredLanguages = ALL_INDIAN_STATE_LANGUAGES.filter(
    l => selectedRegion === 'All' || l.region === selectedRegion || (selectedRegion === 'North' && l.region === 'Pan-India')
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  Multilingual India • बहुभाषी भारत
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Choose Your State Language / अपनी राज्य भाषा चुनें
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Full Regional Mode Banner Toggle */}
        <div className="p-4 bg-amber-50 border-b border-amber-200 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Full Regional UI Mode (पूरी वेबसाइट अपनी भाषा में देखें)</span>
            </div>
            <p className="text-[11px] text-amber-800/90 mt-0.5">
              Translates all navigation tabs, category labels, buttons, and stats directly into your native state language.
            </p>
          </div>

          <label className="flex items-center gap-2 self-start sm:self-auto cursor-pointer">
            <span className="text-xs font-bold text-slate-700">
              {isFullRegionalUI ? 'Enabled' : 'Bilingual'}
            </span>
            <input
              type="checkbox"
              checked={isFullRegionalUI}
              onChange={(e) => onToggleFullRegionalUI(e.target.checked)}
              className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
            />
          </label>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 p-3 bg-slate-100 border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-xs font-bold text-slate-600 mr-1 shrink-0">Region:</span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Language Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition cursor-pointer ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {lang.native}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      ({lang.label})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {lang.statesCovered}
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-600">
            Selected: <strong className="text-slate-900">{currentLang.native} ({currentLang.label})</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition cursor-pointer"
          >
            Apply & Close
          </button>
        </div>

      </div>
    </div>
  );
};
