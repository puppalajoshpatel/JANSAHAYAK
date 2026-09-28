import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  FileText,
  Coins,
  Lightbulb,
  Heart
} from 'lucide-react';
import { GrievanceItem, CitizenProfile, SubmissionType } from './types';
import { INITIAL_GRIEVANCES, DEMO_USER_PROFILE } from './data/mockData';
import { Header } from './components/Header';
import { RealTimeDemandDashboard } from './components/RealTimeDemandDashboard';
import { ComplaintForm } from './components/ComplaintForm';
import { BudgetProjectTracker } from './components/BudgetProjectTracker';
import { DevelopmentRecommender } from './components/DevelopmentRecommender';
import { PanAuthModal } from './components/PanAuthModal';
import { GrievanceTrackerModal } from './components/GrievanceTrackerModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'form' | 'budget' | 'recommendations' | 'track'>('dashboard');
  const [formInitialType, setFormInitialType] = useState<SubmissionType>('complaint');
  const [grievances, setGrievances] = useState<GrievanceItem[]>(() => {
    const saved = localStorage.getItem('janvichar_grievances_v1') || localStorage.getItem('jansamadhan_grievances_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved grievances:', e);
      }
    }
    return INITIAL_GRIEVANCES;
  });

  const [userProfile, setUserProfile] = useState<CitizenProfile | null>(() => {
    const saved = localStorage.getItem('janvichar_citizen_profile_v1') || localStorage.getItem('jansamadhan_citizen_profile_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved citizen profile:', e);
      }
    }
    // Default to authenticated demo citizen for an immediate, delightful experience
    return DEMO_USER_PROFILE;
  });

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [selectedProjectForTimeline, setSelectedProjectForTimeline] = useState<GrievanceItem | null>(null);
  const [selectedGrievanceForDetail, setSelectedGrievanceForDetail] = useState<GrievanceItem | null>(null);

  // Sync grievances to localStorage
  useEffect(() => {
    localStorage.setItem('janvichar_grievances_v1', JSON.stringify(grievances));
  }, [grievances]);

  // Sync userProfile to localStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('janvichar_citizen_profile_v1', JSON.stringify(userProfile));
    } else {
      localStorage.removeItem('janvichar_citizen_profile_v1');
    }
  }, [userProfile]);

  // Add new complaint or recommendation
  const handleAddNewGrievance = (newGrievance: GrievanceItem) => {
    setGrievances((prev) => [newGrievance, ...prev]);
  };

  // Endorse grievance (+1 Me Too) -> Dynamic demand ratio recalculation
  const handleEndorse = (id: string) => {
    if (!userProfile) {
      setIsAuthModalOpen(true);
      return;
    }

    setGrievances((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const already = g.userHasEndorsed;
          const newAffected = already ? g.affectedMembersCount - 1 : g.affectedMembersCount + 1;
          const newEndorsements = already ? g.totalCommunityEndorsements - 1 : g.totalCommunityEndorsements + 1;
          
          // Dynamic tier promotion: >= 35 out of 100 members -> high demand
          const newDemandTier = newAffected >= 35 ? 'high' : newAffected >= 15 ? 'mid' : 'low';

          return {
            ...g,
            userHasEndorsed: !already,
            affectedMembersCount: Math.min(100, Math.max(1, newAffected)),
            totalCommunityEndorsements: newEndorsements,
            demandTier: newDemandTier
          };
        }
        return g;
      })
    );
  };

  const handleLogout = () => {
    setUserProfile(null);
  };

  const handleOpenTimelineForProject = (item: GrievanceItem) => {
    setSelectedProjectForTimeline(item);
    setCurrentTab('budget');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGrievanceDetail = (item: GrievanceItem) => {
    setSelectedGrievanceForDetail(item);
    setIsTrackModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'form') {
            setFormInitialType('complaint');
          }
          setCurrentTab(tab);
        }}
        userProfile={userProfile}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        selectedLanguage={selectedLanguage}
        onChangeLanguage={setSelectedLanguage}
        onOpenTrackModal={() => {
          setSelectedGrievanceForDetail(null);
          setIsTrackModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'dashboard' && (
          <RealTimeDemandDashboard
            grievances={grievances}
            onEndorseGrievance={handleEndorse}
            onSelectProjectForTimeline={handleOpenTimelineForProject}
            userProfile={userProfile}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSelectGrievanceDetail={handleOpenGrievanceDetail}
          />
        )}

        {currentTab === 'form' && (
          <ComplaintForm
            userProfile={userProfile}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSubmitGrievance={handleAddNewGrievance}
            selectedLanguage={selectedLanguage}
            initialSubmissionType={formInitialType}
          />
        )}

        {currentTab === 'budget' && (
          <BudgetProjectTracker
            grievances={grievances}
            selectedProjectGrievance={selectedProjectForTimeline}
            onClearSelectedProject={() => setSelectedProjectForTimeline(null)}
            onSelectProject={(g) => setSelectedProjectForTimeline(g)}
          />
        )}

        {currentTab === 'recommendations' && (
          <DevelopmentRecommender
            grievances={grievances}
            onEndorse={handleEndorse}
            onOpenFormForRecommendation={() => {
              setFormInitialType('development_recommendation');
              setCurrentTab('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            userProfile={userProfile}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSelectProjectForTimeline={handleOpenTimelineForProject}
          />
        )}
      </main>

      {/* PAN & OTP Login Modal */}
      <PanAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(profile) => {
          setUserProfile(profile);
          setIsAuthModalOpen(false);
        }}
      />

      {/* Public Grievance Tracker & Audit Modal */}
      <GrievanceTrackerModal
        isOpen={isTrackModalOpen}
        onClose={() => {
          setIsTrackModalOpen(false);
          setSelectedGrievanceForDetail(null);
        }}
        grievances={grievances}
        initialGrievance={selectedGrievanceForDetail}
        onEndorse={handleEndorse}
      />

      {/* Official Government Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-12">
        {/* Tricolor Bottom Strip */}
        <div className="h-1 w-full bg-linear-to-r from-amber-500 via-white to-emerald-600 flex">
          <div className="w-1/3 bg-amber-500"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-emerald-600"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding Column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-black text-sm">
                  JV
                </div>
                <span>JanVichar</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                National Citizen Redressal and Area Development Intelligence Platform. Integrated with CPGRAMS, Municipal GIS, and Public Financial Management System (PFMS).
              </p>
              <div className="flex items-center gap-2 text-[11px] text-amber-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Income Tax & NSDL PAN Verified Protocol</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Government Portals
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://pgportal.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    <span>CPGRAMS Redressal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://mygov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    <span>MyGov India</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    <span>National Portal of India</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://pmgsy.nic.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
                    <span>Pradhan Mantri Gram Sadak</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Citizen Helplines */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Citizen Emergency Lines
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>National Grievance Toll-Free: <strong>1800-11-4000</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>Emergency Response Support: <strong>112</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Jal Jeevan Mission Helpline: <strong>1800-180-1551</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>support@janvichar.gov.in</span>
                </li>
              </ul>
            </div>

            {/* Service Level Agreement */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Charter & Standards
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                As per the Citizens Charter of India, all verified grievances are subject to strict SLA timeframes: 7 days for drinking water contamination, 14 days for road repair, and 28 days for civil works.
              </p>
              <div className="mt-3 p-2 bg-slate-800 rounded-lg text-[11px] text-slate-300">
                Current App Status: <span className="text-emerald-400 font-bold">Real-Time Aggregated Engine Active</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              © 2026 Government of India. Designed for the Citizens of the Republic of India.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer">Hyperlink Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
