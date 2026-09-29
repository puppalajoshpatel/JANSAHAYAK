import React, { useState } from 'react';
import { 
  Lightbulb, 
  PlusCircle, 
  ThumbsUp, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Coins, 
  Users, 
  Flame, 
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { GrievanceItem, CitizenProfile } from '../types';
import { CATEGORY_DETAILS } from '../data/mockData';

interface DevelopmentRecommenderProps {
  grievances: GrievanceItem[];
  onEndorse: (id: string) => void;
  onOpenFormForRecommendation: () => void;
  userProfile: CitizenProfile | null;
  onOpenAuthModal: () => void;
  onSelectProjectForTimeline: (grievance: GrievanceItem) => void;
}

export const DevelopmentRecommender: React.FC<DevelopmentRecommenderProps> = ({
  grievances,
  onEndorse,
  onOpenFormForRecommendation,
  userProfile,
  onOpenAuthModal,
  onSelectProjectForTimeline
}) => {
  const recommendations = grievances.filter((g) => g.type === 'development_recommendation');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Banner */}
      <div className="bg-linear-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-widest flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                Citizen Participatory Budgeting
              </span>
              <span className="text-xs text-slate-300">
                Gram Sabha & Ward Committee Empowerment
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Area Development Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1">
              Indian citizens can propose vital civic upgrades: community health centers, digital reading libraries, solar streetlights, and parks. Proposals with high community demand are prioritized in the upcoming municipal budget.
            </p>
          </div>

          <button
            onClick={onOpenFormForRecommendation}
            className="px-5 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Propose New Area Development</span>
          </button>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {recommendations.map((item) => {
          const cat = CATEGORY_DETAILS[item.category] || CATEGORY_DETAILS.schools;
          const isSanctioned = item.budgetProject && item.budgetProject.isBudgetAllocated;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 sm:p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Category & Demand Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${cat.bg} ${cat.color} ${cat.border}`}>
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{cat.label}</span>
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide border ${
                    item.demandTier === 'high' 
                      ? 'bg-rose-100 text-rose-800 border-rose-300' 
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {item.demandTier} Demand
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Demand Metric: "X out of 100 members" */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-600" />
                      Citizen Demand Gravity:
                    </span>
                    <span className="font-bold text-slate-900 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                      <strong className="text-emerald-700">CPI {item.civicPriorityIndex || item.affectedMembersCount}</strong> / 100
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${item.civicPriorityIndex || item.affectedMembersCount}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{item.totalCommunityEndorsements} Verified Citizen Votes</span>
                    <span className="text-slate-500">Sanction Threshold: CPI 60</span>
                  </div>
                </div>

                {/* Budget Status */}
                {isSanctioned ? (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span className="flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-emerald-600" />
                        Approved in Municipal Budget:
                      </span>
                      <span className="font-mono text-emerald-800">
                        ₹{(item.budgetProject!.allocatedAmountLakhs! / 100).toFixed(2)} Cr
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-700">
                      Scheme: {item.budgetProject?.schemeName}
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-center justify-between">
                    <span>Budget Status: Under Review for Annual Budget</span>
                    <span className="text-[11px] font-bold text-amber-700">Vote to Fast-Track</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-slate-400">
                  {item.location.wardOrPanchayat}, {item.location.district}
                </span>

                <div className="flex items-center gap-2">
                  {isSanctioned && (
                    <button
                      onClick={() => onSelectProjectForTimeline(item)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold transition cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-slate-600" />
                      <span>Timeline</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onEndorse(item.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                      item.userHasEndorsed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${item.userHasEndorsed ? 'fill-current' : ''}`} />
                    <span>{item.userHasEndorsed ? 'Endorsed (+1)' : 'Vote For This Project'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
