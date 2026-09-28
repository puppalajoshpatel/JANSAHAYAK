import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  LogIn, 
  LogOut, 
  BarChart3, 
  FileText, 
  Coins, 
  Search, 
  Globe2, 
  Sparkles,
  PhoneCall,
  Lightbulb
} from 'lucide-react';
import { CitizenProfile } from '../types';

interface HeaderProps {
  currentTab: 'dashboard' | 'form' | 'budget' | 'recommendations' | 'track';
  setCurrentTab: (tab: 'dashboard' | 'form' | 'budget' | 'recommendations' | 'track') => void;
  userProfile: CitizenProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  selectedLanguage: string;
  onChangeLanguage: (lang: string) => void;
  onOpenTrackModal: () => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
];

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  userProfile,
  onOpenAuthModal,
  onLogout,
  selectedLanguage,
  onChangeLanguage,
  onOpenTrackModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Gov Tricolor & Accessibility Strip */}
      <div className="h-1.5 w-full bg-linear-to-r from-amber-500 via-white to-emerald-600 flex">
        <div className="w-1/3 bg-amber-500"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-emerald-600"></div>
      </div>

      {/* Official Government of India Header Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white tracking-wide">भारत सरकार | Government of India</span>
            <span className="hidden md:inline text-slate-400">| Ministry of Housing & Urban Affairs & DARPG</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="hidden sm:flex items-center gap-1.5 text-amber-300">
              <PhoneCall className="w-3 h-3" />
              <span>National Grievance Toll-Free: <strong>1800-11-4000</strong></span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-700">
              <Globe2 className="w-3 h-3 text-amber-400" />
              <select 
                value={selectedLanguage}
                onChange={(e) => onChangeLanguage(e.target.value)}
                className="bg-transparent text-white text-xs border-none outline-hidden cursor-pointer"
                aria-label="Select Language"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.native} ({lang.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & National Title */}
          <div className="flex items-center gap-3.5">
            {/* Ashoka Emblem Motif */}
            <div className="w-11 h-11 rounded-lg bg-linear-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-600/20 ring-2 ring-amber-400/40 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Jan</span><span className="text-amber-600 font-black">Vichar</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                    जनविचार
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                National Citizen Redressal & Public Demand Intelligence Portal
              </p>
            </div>
          </div>

          {/* User PAN Status & Action CTA */}
          <div className="flex items-center gap-2.5 self-end md:self-center">
            {userProfile ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300/80 px-3 py-1.5 rounded-lg shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <div className="text-left text-xs">
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <span>{userProfile.name}</span>
                    <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      PAN: {userProfile.panNumber.substring(0, 5)}****{userProfile.panNumber.slice(-1)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate max-w-[180px]">
                    {userProfile.ward}, {userProfile.district}
                  </p>
                </div>
                <button
                  onClick={onLogout}
                  title="Logout from PAN Session"
                  className="ml-1 p-1 hover:bg-emerald-100 rounded text-slate-500 hover:text-slate-800 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-sm transition border border-slate-700 hover:border-slate-600"
              >
                <LogIn className="w-4 h-4 text-amber-400" />
                <span>Login with PAN Card & OTP</span>
              </button>
            )}

            <button
              onClick={onOpenTrackModal}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 shadow-2xs transition"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Track Token</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-4 pt-2 border-t border-slate-100 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Real-Time Demand Dashboard</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              currentTab === 'dashboard' ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-700'
            }`}>
              Live
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('form')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              currentTab === 'form'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Apply for Grievance / Voice & Text</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              currentTab === 'form' ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-700'
            }`}>
              Form
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('budget')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              currentTab === 'budget'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Budget & Timeline Tracker</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              currentTab === 'budget' ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-700'
            }`}>
              ₹ Sanctioned
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('recommendations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
              currentTab === 'recommendations'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-300" />
            <span>Citizen Area Recommendations</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
