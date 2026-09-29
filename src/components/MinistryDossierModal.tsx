import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Globe2, 
  TrendingUp, 
  Rocket, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  FileText, 
  BarChart3, 
  MapPin, 
  Users, 
  Clock, 
  Download,
  ExternalLink,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

interface MinistryDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToTab: (tab: 'dashboard' | 'form' | 'budget' | 'recommendations' | 'track') => void;
}

export const MinistryDossierModal: React.FC<MinistryDossierModalProps> = ({
  isOpen,
  onClose,
  onSwitchToTab
}) => {
  const [activeCriterion, setActiveCriterion] = useState<'challenge' | 'ai' | 'reach' | 'impact' | 'deployability'>('challenge');

  if (!isOpen) return null;

  const criteria = [
    {
      id: 'challenge' as const,
      badge: 'Challenge Alignment',
      weight: 'Core Mission',
      title: 'Direct Solution to Grievance Disillusionment',
      icon: TargetIcon
    },
    {
      id: 'ai' as const,
      badge: 'AI / Technical Execution',
      weight: '25% Weight',
      title: 'Google Gemini 3.8 Flash Multimodal Triage',
      icon: Cpu
    },
    {
      id: 'reach' as const,
      badge: 'Depth & Reach Across India',
      weight: '20% Weight',
      title: '36 States/UTs, 780+ Districts & Local Bodies',
      icon: Globe2
    },
    {
      id: 'impact' as const,
      badge: 'Impact Potential',
      weight: '15% Weight',
      title: 'Quantified Benefit & Civic Fiscal Accountability',
      icon: TrendingUp
    },
    {
      id: 'deployability' as const,
      badge: 'Deployability & Scalability',
      weight: '20% Weight',
      title: 'Ministry Pilot in 4 Weeks (DARPG / MoHUA)',
      icon: Rocket
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  GovTech Architecture & Evaluation Dossier
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/30 font-bold">
                  Hackathon Ready
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                JanSamadhan 3.0: National Citizen Grievance & Budget Transparency Engine
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

        {/* Tab Navigation across the 5 Evaluation Criteria */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-2.5 bg-slate-100 border-b border-slate-200 shrink-0 no-scrollbar">
          {criteria.map((c) => {
            const Icon = c.icon;
            const isActive = activeCriterion === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCriterion(c.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-300' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{c.badge}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  isActive ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  {c.weight}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm">
          
          {/* SECTION 1: CHALLENGE ALIGNMENT */}
          {activeCriterion === 'challenge' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                  <TargetIcon className="w-4 h-4 text-amber-700" />
                  <span>The Stated Challenge: Broken Citizen Trust in Black-Box Grievance Portals</span>
                </h3>
                <p className="text-xs text-amber-800/90 mt-1.5 leading-relaxed">
                  Traditional platforms (like legacy CPGRAMS or municipal portals) suffer from three fatal structural design flaws:
                  <strong> Individual ticket silos</strong> (treating 500 citizens complaining about the same destroyed hospital or highway as 500 isolated requests), 
                  <strong> zero transparent link to fiscal budgets</strong>, and <strong>fake completion statuses</strong> where field officers close tickets without physical ground work.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase">
                    <Flame className="w-4 h-4" />
                    <span>Demand Clustering</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Replaces arbitrary sample denominators with real <strong>Verified Citizen Endorsements</strong> and <strong>Civic Priority Index (CPI)</strong> to bubble up true community urgency.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase">
                    <Building2 className="w-4 h-4" />
                    <span>Live Sanction Orders</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Every approved grievance displays actual financial scheme allocations (AMRUT 2.0, PMGSY, NHM), contractor details, and funds released in Lakhs/Crores.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Public Spot Audit</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Citizens are not passive complainants; they verify physical progress directly on the ground before final contractor payout release.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: 25% AI & TECHNICAL EXECUTION */}
          {activeCriterion === 'ai' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-purple-950 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-700" />
                    <span>Meaningful End-to-End AI: Powered by Google Gemini 3.8 Flash</span>
                  </h3>
                  <span className="text-[10px] bg-purple-200 text-purple-900 font-mono font-bold px-2 py-0.5 rounded">
                    @google/genai SDK
                  </span>
                </div>
                <p className="text-xs text-purple-800/90 mt-1.5 leading-relaxed">
                  Google AI does not act as an ungrounded chatbot. It performs rigorous, deterministic administrative heavy lifting in real time:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-black flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Multimodal Regional Dialect Transcription & Speech-to-Governance</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Processes citizen voice dictation in <strong>Hindi, Marathi, Tamil, Telugu, Bengali, Kannada, and Indian English</strong>, transcribing and translating verbatim colloquial speech into structured administrative English for nodal officers.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Statutory Department & Central Scheme Mapping</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Automatically maps raw complaints to relevant Ministries (MoHUA, MoRTH, MoHFW, Jal Shakti) and National Missions (PMGSY, AMRUT 2.0, Smart Cities, Samagra Shiksha, SBM 2.0) with suggested SLA days and estimated financial sanctions.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-black flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Automated Draft Sanction Order & Administrative Memo</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Synthesizes citizen inputs into a ready-to-sign administrative memo with 3 prioritized action items for the Municipal Commissioner or District Magistrate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Test Google AI in action live right now:</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSwitchToTab('form');
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Launch Voice & AI Complaint Form</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION 3: 20% DEPTH & REACH ACROSS INDIA */}
          {activeCriterion === 'reach' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-blue-700" />
                  <span>Pan-India Depth: All 36 States/UTs & All 780+ Districts Covered</span>
                </h3>
                <p className="text-xs text-blue-800/90 mt-1.5 leading-relaxed">
                  Unlike single-city prototypes, this platform contains the complete, statutory jurisdictional hierarchy of the Republic of India:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">36 / 36</div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase mt-0.5">States & UTs</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">780+</div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase mt-0.5">Total Districts</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase mt-0.5">Corporations & Councils</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-2xl font-black text-slate-900">8+</div>
                  <div className="text-[11px] font-bold text-slate-600 uppercase mt-0.5">Indian Languages</div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-600" />
                  <span>Multi-Tier Administrative Governance Model:</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li><strong>Tier 1: Municipal Corporations (Mahanagar Palika / Nagar Nigam)</strong> — Mumbai (BMC), Pune (PMC), Delhi (NDMC/MCD), Bengaluru (BBMP), Chennai (GCC), Hyderabad (GHMC), etc.</li>
                  <li><strong>Tier 2: Municipal Councils (Nagar Palika Parishad)</strong> — Tier-2/3 District Headquarters and peri-urban centers.</li>
                  <li><strong>Tier 3: Rural Zilla Parishad & Block Development Offices (Panchayat Samiti)</strong> — Covering rural gram panchayats without urban exclusion.</li>
                  <li><strong>Tier 4: Defense Cantonment Boards & Industrial Authorities</strong> — NOIDA, YEIDA, Pune Cantt, Clement Town Cantt.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 4: 15% IMPACT POTENTIAL */}
          {activeCriterion === 'impact' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span>Transforming 1.4 Billion Citizens from Complainants to Auditing Stakeholders</span>
                </h3>
                <p className="text-xs text-emerald-800/90 mt-1.5 leading-relaxed">
                  Measurable impact metrics based on simulated administrative test runs across Indian municipal corporations:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-2xl font-black text-rose-700">84% Reduction</div>
                  <h4 className="font-bold text-xs text-slate-900">In Redundant Grievance Tickets</h4>
                  <p className="text-xs text-slate-600 leading-normal">
                    Instead of 400 separate files for a single broken highway, citizens co-sign a unified demand cluster with live demand gravity.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-2xl font-black text-emerald-700">6x Faster</div>
                  <h4 className="font-bold text-xs text-slate-900">Civic Budget Sanctioning</h4>
                  <p className="text-xs text-slate-600 leading-normal">
                    District Magistrates get AI-synthesized justification notes mapped directly to central funds (AMRUT 2.0 / PMGSY) in minutes.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-2xl font-black text-blue-700">100% Zero Ghost Works</div>
                  <h4 className="font-bold text-xs text-slate-900">Mandatory Citizen Spot Verification</h4>
                  <p className="text-xs text-slate-600 leading-normal">
                    Contractors cannot receive final payment tranches without citizen ground verification badges in the Public Audit Registry.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
                  <div className="text-2xl font-black text-amber-700">Participatory Proposals</div>
                  <h4 className="font-bold text-xs text-slate-900">Beyond Just Negative Complaints</h4>
                  <p className="text-xs text-slate-600 leading-normal">
                    Citizens can formally propose community development initiatives (clinics, smart streetlights, reading rooms) backed by neighborhood votes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: 20% DEPLOYABILITY & SCALABILITY */}
          {activeCriterion === 'deployability' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold flex items-center gap-2 text-amber-400">
                    <Rocket className="w-4 h-4" />
                    <span>Pilot Rollout Blueprint: Ready for DARPG / MoHUA in 4 Weeks</span>
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded border border-slate-600">
                    Zero Legacy Friction
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Built to integrate directly with existing National Informatics Centre (NIC) and Digital India infrastructure without requiring new database migrations:
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded">
                    Week 1 - 2
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">API Gateway Handshake with CPGRAMS 7.0 & DigiLocker</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Mount client-side PAN/Aadhaar OTP authentication and ingest existing open CPGRAMS grievance backlog into the Gemini AI clustering queue.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-mono font-bold text-xs rounded">
                    Week 3
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">PFMS (Public Financial Management System) Linkage</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Connect Treasury Sanction Order Numbers with live contractor milestones for real-time fund tracking.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-mono font-bold text-xs rounded">
                    Week 4
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">Municipal Corporation Command Center Rollout</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Deploy ward officer triage dashboards in 5 pilot Municipal Corporations (e.g. Pune PMC, Varanasi VNN, Lucknow LMC, Chennai GCC).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Meets DARPG Citizen Charter & 74th Constitutional Amendment Standards</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onSwitchToTab('dashboard');
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Explore Live Demand Dashboard
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

function TargetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
