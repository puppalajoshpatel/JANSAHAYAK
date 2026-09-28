import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  MapPin, 
  User, 
  ShieldCheck, 
  Coins, 
  ChevronRight, 
  Send, 
  Calendar, 
  ThumbsUp, 
  FileText 
} from 'lucide-react';
import { GrievanceItem } from '../types';
import { CATEGORY_DETAILS } from '../data/mockData';

interface GrievanceTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  grievances: GrievanceItem[];
  initialGrievance?: GrievanceItem | null;
  onEndorse: (id: string) => void;
}

export const GrievanceTrackerModal: React.FC<GrievanceTrackerModalProps> = ({
  isOpen,
  onClose,
  grievances,
  initialGrievance,
  onEndorse
}) => {
  const [searchToken, setSearchToken] = useState(initialGrievance?.id || '');
  const [selectedGrievance, setSelectedGrievance] = useState<GrievanceItem | null>(initialGrievance || grievances[0] || null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [citizenRating, setCitizenRating] = useState<number | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  useEffect(() => {
    if (initialGrievance) {
      setSelectedGrievance(initialGrievance);
      setSearchToken(initialGrievance.id);
      setSearchError(null);
    } else if (grievances.length > 0 && !selectedGrievance) {
      setSelectedGrievance(grievances[0]);
    }
  }, [initialGrievance, isOpen, grievances]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const found = grievances.find(
      (g) => g.id.toLowerCase() === searchToken.trim().toLowerCase()
    );
    if (found) {
      setSelectedGrievance(found);
      setSearchError(null);
    } else {
      setSearchError(`No grievance token found matching "${searchToken}". Please check the token ID or select one from the recent list below.`);
    }
  };

  const handleSelectRecent = (g: GrievanceItem) => {
    setSelectedGrievance(g);
    setSearchToken(g.id);
    setSearchError(null);
  };

  const item = selectedGrievance;
  const cat = item ? (CATEGORY_DETAILS[item.category] || CATEGORY_DETAILS.roads) : null;

  const stages = [
    { title: 'Registered & PAN Verified', desc: 'Token generated & entered in National Database' },
    { title: 'AI Triage & Urgency Scoring', desc: 'Category and demand priority assessed' },
    { title: 'Routed to Nodal Department', desc: 'Jurisdiction assigned to Field Officer' },
    { title: 'Budget & Action Plan Sanction', desc: 'Financial sanction order issued' },
    { title: 'Ground Execution & Resolution', desc: 'Contractor deployed / works underway' }
  ];

  const getStageIndex = (status: string) => {
    if (status === 'submitted') return 1;
    if (status === 'verified') return 2;
    if (status === 'budget_sanctioned') return 3;
    if (status === 'work_in_progress') return 4;
    if (status === 'resolved') return 5;
    return 2;
  };

  const currentStage = item ? getStageIndex(item.status) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>Public Grievance Transparency Tracker</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-400/30">
                  Real-Time Audit
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Track nodal officer remarks, demand density, and ground resolution status
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Search Token Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchToken}
                onChange={(e) => {
                  setSearchToken(e.target.value.toUpperCase());
                  if (searchError) setSearchError(null);
                }}
                placeholder="Enter Token ID (e.g. CPG-2026-MH-4821)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Lookup Token
            </button>
          </form>

          {searchError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{searchError}</span>
            </div>
          )}

          {/* Quick Recent Tokens Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold shrink-0">Sample Tokens:</span>
            {grievances.slice(0, 4).map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => handleSelectRecent(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition shrink-0 ${
                  selectedGrievance?.id === g.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {g.id}
              </button>
            ))}
          </div>

          {/* Selected Grievance Audit Details */}
          {item && cat && (
            <div className="space-y-5 border-t border-slate-200 pt-4">
              
              {/* Top Details Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border ${cat.bg} ${cat.color} ${cat.border}`}>
                      {cat.label}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold uppercase border ${
                      item.demandTier === 'high' ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {item.demandTier} Demand Tier
                    </span>
                  </div>

                  <div className="text-xs font-mono">
                    <span className="text-slate-500">Token ID: </span>
                    <strong className="text-slate-900">{item.id}</strong>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/80 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Location</span>
                    <span className="font-semibold text-slate-800">{item.location.wardOrPanchayat}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Demand Density</span>
                    <span className="font-bold text-amber-800">{item.affectedMembersCount} / 100 Members</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Current Status</span>
                    <span className="font-bold text-emerald-700">{item.statusBadge}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Resolution SLA</span>
                    <span className="font-semibold text-slate-800">{item.resolutionSlaDays} Days</span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Tracker */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Administrative Workflow & Redressal Stages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {stages.map((stage, i) => {
                    const isPassed = i + 1 <= currentStage;
                    const isCurrent = i + 1 === currentStage;
                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-xs transition ${
                          isPassed
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            isPassed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {isPassed ? '✓' : i + 1}
                          </div>
                          <span className="font-bold text-[11px] truncate">{stage.title}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight">
                          {stage.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Official Nodal Officer Remarks Log */}
              {item.officialRemarks && item.officialRemarks.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    Official Department Remarks
                  </h4>
                  <div className="space-y-2">
                    {item.officialRemarks.map((remark, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 shadow-2xs">
                        <div className="flex items-center justify-between text-slate-500 text-[11px]">
                          <span className="font-bold text-slate-800">{remark.officer} ({remark.department})</span>
                          <span>{remark.date}</span>
                        </div>
                        <p className="text-slate-700 italic">
                          "{remark.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Budget Allocation Details if Available */}
              {item.budgetProject && item.budgetProject.isBudgetAllocated && (
                <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-amber-600" />
                      Sanctioned Scheme: {item.budgetProject.schemeName}
                    </span>
                    <span className="font-mono font-bold text-amber-800">
                      ₹{(item.budgetProject.allocatedAmountLakhs! / 100).toFixed(2)} Cr
                    </span>
                  </div>
                  <p className="text-slate-700 text-[11px]">
                    Contractor: <strong>{item.budgetProject.contractorName}</strong> | Department: <strong>{item.budgetProject.nodalDepartment}</strong>
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    Target Completion: <strong>{item.budgetProject.expectedCompletionDate}</strong>
                  </p>
                </div>
              )}

              {/* Citizen Rating & Closure Feedback */}
              <div className="pt-3 border-t border-slate-200 bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Rate Redressal Quality & Responsiveness</span>
                  <span className="text-[11px] text-slate-500">Citizen feedback directly impacts the Ward Officer appraisal score.</span>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setCitizenRating(star);
                        setFeedbackSuccess(true);
                      }}
                      className={`text-lg transition cursor-pointer ${
                        (citizenRating || 0) >= star ? 'text-amber-500 scale-110' : 'text-slate-300 hover:text-amber-400'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  {feedbackSuccess && (
                    <span className="text-[11px] text-emerald-700 font-bold ml-2">Rating Logged!</span>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
